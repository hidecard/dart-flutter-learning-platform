import { createClient } from "@libsql/client";
import mysql from "mysql2/promise";

const legacyUrl = process.env.DATABASE_URL;
const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!legacyUrl) {
  console.log("No legacy DATABASE_URL is configured; no data import is required.");
  process.exit(0);
}
if (!tursoUrl || !tursoAuthToken) throw new Error("Turso secrets are required for the legacy import.");

const legacy = await mysql.createConnection(legacyUrl);
const turso = createClient({ url: tursoUrl, authToken: tursoAuthToken });
await turso.execute("PRAGMA foreign_keys = ON");

const asMillis = (value) => {
  if (typeof value === "number") return value;
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : Date.now();
};

const getTursoUserId = async (legacyUser) => {
  const existing = await turso.execute({ sql: "SELECT id FROM users WHERE openId = ? LIMIT 1", args: [legacyUser.openId] });
  if (existing.rows[0]?.id != null) return Number(existing.rows[0].id);

  await turso.execute({
    sql: `INSERT INTO users (openId, name, email, loginMethod, role, createdAt, updatedAt, lastSignedIn)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      legacyUser.openId,
      legacyUser.name ?? null,
      legacyUser.email ?? null,
      legacyUser.loginMethod ?? null,
      legacyUser.role === "admin" ? "admin" : "user",
      asMillis(legacyUser.createdAt),
      asMillis(legacyUser.updatedAt),
      asMillis(legacyUser.lastSignedIn),
    ],
  });
  const inserted = await turso.execute({ sql: "SELECT id FROM users WHERE openId = ? LIMIT 1", args: [legacyUser.openId] });
  return Number(inserted.rows[0]?.id);
};

try {
  const [users] = await legacy.query("SELECT * FROM users");
  const [progressRows] = await legacy.query("SELECT * FROM chapterProgress");
  const [contentRows] = await legacy.query("SELECT * FROM lessonContent");
  const userIdMap = new Map();

  for (const user of users) userIdMap.set(Number(user.id), await getTursoUserId(user));

  for (const progress of progressRows) {
    const userId = userIdMap.get(Number(progress.userId));
    if (!userId) continue;
    await turso.execute({
      sql: `INSERT INTO chapterProgress (userId, chapterId, completed, completedAt, updatedAt)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(userId, chapterId) DO UPDATE SET
              completed = excluded.completed,
              completedAt = excluded.completedAt,
              updatedAt = excluded.updatedAt`,
      args: [userId, Number(progress.chapterId), progress.completed ? 1 : 0, progress.completedAt ? asMillis(progress.completedAt) : null, asMillis(progress.updatedAt)],
    });
  }

  for (const content of contentRows) {
    const editorId = userIdMap.get(Number(content.updatedByUserId));
    if (!editorId) continue;
    await turso.execute({
      sql: `INSERT INTO lessonContent (chapterId, contentJson, updatedByUserId, updatedAt)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(chapterId) DO UPDATE SET
              contentJson = excluded.contentJson,
              updatedByUserId = excluded.updatedByUserId,
              updatedAt = excluded.updatedAt`,
      args: [Number(content.chapterId), String(content.contentJson), editorId, asMillis(content.updatedAt)],
    });
  }

  console.log(`Legacy import complete: ${users.length} users, ${progressRows.length} progress records, ${contentRows.length} CMS overrides.`);
} finally {
  await legacy.end();
  turso.close();
}

// The import is a finite CLI job; explicitly end any SDK transport handles after all writes settle.
process.exit(0);
