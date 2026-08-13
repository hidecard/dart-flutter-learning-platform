import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { parse } from "cookie";
import type { Request, Response } from "express";
import { getSessionCookieOptions } from "./_core/cookies";
import { getDb } from "./db";

const scrypt = promisify(scryptCallback);
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
export const LOCAL_SESSION_COOKIE = "dfl_local_session";

export type LocalAuthenticatedUser = {
  id: number;
  openId: string;
  email: string;
  name: string | null;
  loginMethod: "local";
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
};

function asNumber(value: unknown) {
  return typeof value === "number" ? value : Number(value ?? 0);
}

function mapUser(row: Record<string, unknown>): LocalAuthenticatedUser {
  return {
    id: asNumber(row.id),
    openId: String(row.openId),
    email: String(row.email),
    name: row.name == null ? null : String(row.name),
    loginMethod: "local",
    role: row.role === "admin" ? "admin" : "user",
    createdAt: new Date(asNumber(row.createdAt)),
    updatedAt: new Date(asNumber(row.updatedAt)),
    lastSignedIn: new Date(asNumber(row.lastSignedIn)),
  };
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt}$${hash.toString("hex")}`;
}

async function verifyPassword(password: string, encoded: string) {
  const [algorithm, salt, savedHash] = encoded.split("$");
  if (algorithm !== "scrypt" || !salt || !savedHash) return false;
  const candidate = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(savedHash, "hex");
  return expected.length === candidate.length && timingSafeEqual(expected, candidate);
}

function sessionCookieOptions(req: Request) {
  return { ...getSessionCookieOptions(req), sameSite: "lax" as const, maxAge: SESSION_DURATION_MS };
}

export function readLocalSessionToken(req: Request) {
  return parse(req.headers.cookie ?? "")[LOCAL_SESSION_COOKIE];
}

export async function createLocalAccount(input: { name?: string; email: string; password: string }) {
  const database = await getDb();
  const email = input.email.trim().toLowerCase();
  const existing = await database.execute({ sql: "SELECT id FROM users WHERE email = ? LIMIT 1", args: [email] });
  if (existing.rows[0]) throw new Error("ဒီအီးမေးလ်ဖြင့် account ဖွင့်ထားပြီးဖြစ်ပါသည်။");

  const passwordHash = await hashPassword(input.password);
  const localAccountCount = await database.execute("SELECT COUNT(*) AS total FROM users WHERE passwordHash IS NOT NULL");
  const role = Number(localAccountCount.rows[0]?.total ?? 0) === 0 ? "admin" : "user";
  const now = Date.now();
  const openId = `local_${randomBytes(18).toString("hex")}`;

  await database.execute({
    sql: `INSERT INTO users (openId, name, email, loginMethod, role, passwordHash, createdAt, updatedAt, lastSignedIn)
          VALUES (?, ?, ?, 'local', ?, ?, ?, ?, ?)`,
    args: [openId, input.name?.trim() || null, email, role, passwordHash, now, now, now],
  });
  const saved = await database.execute({ sql: "SELECT * FROM users WHERE openId = ? LIMIT 1", args: [openId] });
  return mapUser(saved.rows[0] as Record<string, unknown>);
}

export async function authenticateLocalAccount(emailInput: string, password: string) {
  const database = await getDb();
  const email = emailInput.trim().toLowerCase();
  const result = await database.execute({ sql: "SELECT * FROM users WHERE email = ? LIMIT 1", args: [email] });
  const row = result.rows[0] as Record<string, unknown> | undefined;
  if (!row?.passwordHash || !(await verifyPassword(password, String(row.passwordHash)))) {
    throw new Error("အီးမေးလ် သို့မဟုတ် စကားဝှက်မမှန်ပါ။");
  }
  const now = Date.now();
  await database.execute({ sql: "UPDATE users SET lastSignedIn = ?, updatedAt = ? WHERE id = ?", args: [now, now, asNumber(row.id)] });
  return { ...mapUser(row), lastSignedIn: new Date(now), updatedAt: new Date(now) };
}

export async function createLocalSession(userId: number) {
  const database = await getDb();
  const token = randomBytes(32).toString("base64url");
  const now = Date.now();
  await database.execute({
    sql: "INSERT INTO localSessions (tokenHash, userId, expiresAt, createdAt) VALUES (?, ?, ?, ?)",
    args: [tokenHash(token), userId, now + SESSION_DURATION_MS, now],
  });
  await database.execute({ sql: "DELETE FROM localSessions WHERE expiresAt < ?", args: [now] });
  return token;
}

export async function getLocalSessionUser(token: string | undefined): Promise<LocalAuthenticatedUser | null> {
  if (!token) return null;
  const database = await getDb();
  const result = await database.execute({
    sql: `SELECT users.* FROM localSessions
          JOIN users ON users.id = localSessions.userId
          WHERE localSessions.tokenHash = ? AND localSessions.expiresAt > ? LIMIT 1`,
    args: [tokenHash(token), Date.now()],
  });
  return result.rows[0] ? mapUser(result.rows[0] as Record<string, unknown>) : null;
}

export async function deleteLocalSession(token: string | undefined) {
  if (!token) return;
  const database = await getDb();
  await database.execute({ sql: "DELETE FROM localSessions WHERE tokenHash = ?", args: [tokenHash(token)] });
}

export function setLocalSessionCookie(res: Response, req: Request, token: string) {
  res.cookie(LOCAL_SESSION_COOKIE, token, sessionCookieOptions(req));
}

export function clearLocalSessionCookie(res: Response, req: Request) {
  res.clearCookie(LOCAL_SESSION_COOKIE, { ...sessionCookieOptions(req), maxAge: -1 });
}
