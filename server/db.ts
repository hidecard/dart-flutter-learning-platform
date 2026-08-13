import { createClient, type Client, type InValue, type Row } from "@libsql/client";
import { ENV } from "./_core/env";

type UserRole = "admin" | "user";
type UserRecord = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
};

type UserInput = {
  openId: string;
  name?: string | null;
  email?: string | null;
  loginMethod?: string | null;
  role?: UserRole;
  lastSignedIn?: Date;
};

type ProgressRecord = {
  id: number;
  userId: number;
  chapterId: number;
  completed: boolean;
  completedAt: Date | null;
  updatedAt: Date;
};

type LessonOverrideRecord = {
  id: number;
  chapterId: number;
  contentJson: string;
  updatedByUserId: number;
  updatedAt: Date;
};

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    openId TEXT NOT NULL UNIQUE,
    name TEXT,
    email TEXT,
    loginMethod TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    passwordHash TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    lastSignedIn INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS chapterProgress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    chapterId INTEGER NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    completedAt INTEGER,
    updatedAt INTEGER NOT NULL,
    UNIQUE (userId, chapterId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS lessonContent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chapterId INTEGER NOT NULL UNIQUE,
    contentJson TEXT NOT NULL,
    updatedByUserId INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    FOREIGN KEY (updatedByUserId) REFERENCES users(id) ON DELETE RESTRICT
  )`,
  `CREATE TABLE IF NOT EXISTS localSessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tokenHash TEXT NOT NULL UNIQUE,
    userId INTEGER NOT NULL,
    expiresAt INTEGER NOT NULL,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )`,
];

let client: Client | null = null;
let schemaPromise: Promise<void> | null = null;

function numberValue(value: InValue | undefined) {
  return typeof value === "number" ? value : Number(value ?? 0);
}

function textValue(value: InValue | undefined) {
  return value == null ? null : String(value);
}

function dateValue(value: InValue | undefined) {
  return new Date(numberValue(value));
}

function mapUser(row: Row): UserRecord {
  return {
    id: numberValue(row.id),
    openId: String(row.openId),
    name: textValue(row.name),
    email: textValue(row.email),
    loginMethod: textValue(row.loginMethod),
    role: row.role === "admin" ? "admin" : "user",
    createdAt: dateValue(row.createdAt),
    updatedAt: dateValue(row.updatedAt),
    lastSignedIn: dateValue(row.lastSignedIn),
  };
}

function mapProgress(row: Row): ProgressRecord {
  return {
    id: numberValue(row.id),
    userId: numberValue(row.userId),
    chapterId: numberValue(row.chapterId),
    completed: Boolean(numberValue(row.completed)),
    completedAt: row.completedAt == null ? null : dateValue(row.completedAt),
    updatedAt: dateValue(row.updatedAt),
  };
}

function mapLessonOverride(row: Row): LessonOverrideRecord {
  return {
    id: numberValue(row.id),
    chapterId: numberValue(row.chapterId),
    contentJson: String(row.contentJson),
    updatedByUserId: numberValue(row.updatedByUserId),
    updatedAt: dateValue(row.updatedAt),
  };
}

async function ensureSchema(database: Client) {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await database.execute("PRAGMA foreign_keys = ON");
      for (const statement of schemaStatements) await database.execute(statement);
      const columns = await database.execute("PRAGMA table_info(users)");
      if (!columns.rows.some((column) => String(column.name) === "passwordHash")) {
        await database.execute("ALTER TABLE users ADD COLUMN passwordHash TEXT");
      }
      await database.execute("CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email) WHERE email IS NOT NULL");
    })();
  }
  return schemaPromise;
}

/** Returns the remote Turso/libSQL client after ensuring the application tables exist. */
export async function getDb() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (!url || !authToken) throw new Error("Turso database secrets are not configured");
    client = createClient({ url, authToken });
  }
  await ensureSchema(client);
  return client;
}

export async function upsertUser(user: UserInput): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");

  const database = await getDb();
  const existing = await getUserByOpenId(user.openId);
  const now = Date.now();
  const role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : existing?.role ?? "user");
  const lastSignedIn = user.lastSignedIn?.getTime() ?? now;

  await database.execute({
    sql: `INSERT INTO users (openId, name, email, loginMethod, role, createdAt, updatedAt, lastSignedIn)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(openId) DO UPDATE SET
            name = excluded.name,
            email = excluded.email,
            loginMethod = excluded.loginMethod,
            role = excluded.role,
            updatedAt = excluded.updatedAt,
            lastSignedIn = excluded.lastSignedIn`,
    args: [
      user.openId,
      user.name ?? existing?.name ?? null,
      user.email ?? existing?.email ?? null,
      user.loginMethod ?? existing?.loginMethod ?? null,
      role,
      existing?.createdAt.getTime() ?? now,
      now,
      lastSignedIn,
    ],
  });
}

export async function getUserByOpenId(openId: string): Promise<UserRecord | undefined> {
  const database = await getDb();
  const result = await database.execute({ sql: "SELECT * FROM users WHERE openId = ? LIMIT 1", args: [openId] });
  return result.rows[0] ? mapUser(result.rows[0]) : undefined;
}

export async function getChapterProgressForUser(userId: number): Promise<ProgressRecord[]> {
  const database = await getDb();
  const result = await database.execute({ sql: "SELECT * FROM chapterProgress WHERE userId = ? ORDER BY chapterId", args: [userId] });
  return result.rows.map(mapProgress);
}

export async function setChapterProgress(userId: number, chapterId: number, completed: boolean): Promise<ProgressRecord | undefined> {
  const database = await getDb();
  const now = Date.now();
  await database.execute({
    sql: `INSERT INTO chapterProgress (userId, chapterId, completed, completedAt, updatedAt)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(userId, chapterId) DO UPDATE SET
            completed = excluded.completed,
            completedAt = excluded.completedAt,
            updatedAt = excluded.updatedAt`,
    args: [userId, chapterId, completed ? 1 : 0, completed ? now : null, now],
  });
  const result = await database.execute({ sql: "SELECT * FROM chapterProgress WHERE userId = ? AND chapterId = ? LIMIT 1", args: [userId, chapterId] });
  return result.rows[0] ? mapProgress(result.rows[0]) : undefined;
}

export async function getLessonContentOverrides(): Promise<LessonOverrideRecord[]> {
  const database = await getDb();
  const result = await database.execute("SELECT * FROM lessonContent ORDER BY chapterId");
  return result.rows.map(mapLessonOverride);
}

export async function upsertLessonContentOverride(chapterId: number, contentJson: string, updatedByUserId: number): Promise<LessonOverrideRecord | undefined> {
  const database = await getDb();
  const now = Date.now();
  await database.execute({
    sql: `INSERT INTO lessonContent (chapterId, contentJson, updatedByUserId, updatedAt)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(chapterId) DO UPDATE SET
            contentJson = excluded.contentJson,
            updatedByUserId = excluded.updatedByUserId,
            updatedAt = excluded.updatedAt`,
    args: [chapterId, contentJson, updatedByUserId, now],
  });
  const result = await database.execute({ sql: "SELECT * FROM lessonContent WHERE chapterId = ? LIMIT 1", args: [chapterId] });
  return result.rows[0] ? mapLessonOverride(result.rows[0]) : undefined;
}

export async function deleteLessonContentOverride(chapterId: number): Promise<void> {
  const database = await getDb();
  await database.execute({ sql: "DELETE FROM lessonContent WHERE chapterId = ?", args: [chapterId] });
}
