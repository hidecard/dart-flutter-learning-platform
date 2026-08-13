import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) throw new Error("Turso secrets are required for runtime write verification.");

const client = createClient({ url, authToken });
const users = await client.execute("SELECT id FROM users ORDER BY id LIMIT 1");
const userId = Number(users.rows[0]?.id);
if (!userId) throw new Error("A migrated user is required for Turso write verification.");

const progressRows = await client.execute({ sql: "SELECT * FROM chapterProgress WHERE userId = ? ORDER BY chapterId LIMIT 1", args: [userId] });
const originalProgress = progressRows.rows[0];
if (!originalProgress) throw new Error("A migrated progress row is required for Turso write verification.");

const chapterId = Number(originalProgress.chapterId);
const originalCompleted = Number(originalProgress.completed);
const now = Date.now();
const toggledCompletion = originalCompleted ? 0 : 1;
await client.execute({
  sql: "UPDATE chapterProgress SET completed = ?, completedAt = ?, updatedAt = ? WHERE userId = ? AND chapterId = ?",
  args: [toggledCompletion, toggledCompletion ? now : null, now, userId, chapterId],
});
const toggledProgress = await client.execute({ sql: "SELECT completed FROM chapterProgress WHERE userId = ? AND chapterId = ?", args: [userId, chapterId] });
if (Number(toggledProgress.rows[0]?.completed) !== toggledCompletion) throw new Error("Turso progress write could not be read back.");
await client.execute({
  sql: "UPDATE chapterProgress SET completed = ?, completedAt = ?, updatedAt = ? WHERE userId = ? AND chapterId = ?",
  args: [originalCompleted, originalProgress.completedAt ?? null, Number(originalProgress.updatedAt), userId, chapterId],
});

const cmsChapterId = 1;
const existingContent = await client.execute({ sql: "SELECT * FROM lessonContent WHERE chapterId = ? LIMIT 1", args: [cmsChapterId] });
const previous = existingContent.rows[0];
const verificationContent = JSON.stringify({
  title: "Turso CMS Verification",
  summary: "Turso write/read verification for the admin CMS.",
  duration: "1 minute",
  level: "verification",
  topics: ["Turso"],
  sections: [{ heading: "Verification", paragraphs: ["This temporary record proves the Turso CMS write path."] }],
  code: { language: "dart", code: "void main() {}", annotations: [] },
  challenge: "Verify the record is read back.",
  checklist: ["Turso CMS write passed"],
});
await client.execute({
  sql: `INSERT INTO lessonContent (chapterId, contentJson, updatedByUserId, updatedAt)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(chapterId) DO UPDATE SET contentJson = excluded.contentJson, updatedByUserId = excluded.updatedByUserId, updatedAt = excluded.updatedAt`,
  args: [cmsChapterId, verificationContent, userId, now],
});
const savedContent = await client.execute({ sql: "SELECT contentJson FROM lessonContent WHERE chapterId = ?", args: [cmsChapterId] });
if (!String(savedContent.rows[0]?.contentJson).includes("Turso CMS Verification")) throw new Error("Turso CMS write could not be read back.");

if (previous) {
  await client.execute({
    sql: "UPDATE lessonContent SET contentJson = ?, updatedByUserId = ?, updatedAt = ? WHERE chapterId = ?",
    args: [String(previous.contentJson), Number(previous.updatedByUserId), Number(previous.updatedAt), cmsChapterId],
  });
} else {
  await client.execute({ sql: "DELETE FROM lessonContent WHERE chapterId = ?", args: [cmsChapterId] });
}

client.close();
console.log("Turso runtime write verification succeeded; progress and CMS state were restored.");
process.exit(0);
