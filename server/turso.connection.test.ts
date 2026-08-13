import { createClient } from "@libsql/client";
import { describe, expect, it } from "vitest";
import { getDb } from "./db";

describe("Turso database connection", () => {
  it("authenticates with the configured secrets and executes a read-only query", async () => {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    expect(url).toMatch(/^libsql:\/\//);
    expect(authToken).toBeTruthy();

    const client = createClient({ url: url!, authToken: authToken! });
    const result = await client.execute("SELECT 1 AS connected");

    expect(result.rows[0]?.connected).toBe(1);

    const tables = await client.execute("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name");
    const tableNames = tables.rows.map((row) => String(row.name));
    expect(tableNames).toEqual(expect.arrayContaining(["users", "chapterProgress", "lessonContent"]));

    const counts = await client.execute(`
      SELECT 'users' AS name, COUNT(*) AS total FROM users
      UNION ALL
      SELECT 'chapterProgress' AS name, COUNT(*) AS total FROM chapterProgress
    `);
    const countByTable = new Map(counts.rows.map((row) => [String(row.name), Number(row.total)]));
    expect(countByTable.get("users")).toBeGreaterThanOrEqual(1);
    expect(countByTable.get("chapterProgress")).toBeGreaterThanOrEqual(1);

    const runtimeDatabase = await getDb();
    const runtimeUsers = await runtimeDatabase.execute("SELECT COUNT(*) AS total FROM users");
    expect(Number(runtimeUsers.rows[0]?.total)).toBeGreaterThanOrEqual(1);
  }, 45_000);
});
