import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be configured before migration.");
}

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    openId TEXT NOT NULL UNIQUE,
    name TEXT,
    email TEXT,
    loginMethod TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
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
];

const client = createClient({ url, authToken });
await client.execute("PRAGMA foreign_keys = ON");
for (const statement of schemaStatements) await client.execute(statement);

console.log("Turso schema is ready: users, chapterProgress, lessonContent.");
