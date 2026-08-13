import { afterEach, describe, expect, it } from "vitest";
import { authenticateLocalAccount, createLocalAccount, createLocalSession, deleteLocalSession, getLocalSessionUser } from "./localAuth";
import { getDb } from "./db";

const emailsToCleanup: string[] = [];

afterEach(async () => {
  const database = await getDb();
  for (const email of emailsToCleanup.splice(0)) {
    await database.execute({ sql: "DELETE FROM users WHERE email = ?", args: [email] });
  }
});

describe("local Turso authentication", () => {
  it("stores only a scrypt hash, authenticates credentials, and revokes an opaque session", async () => {
    const email = `local-auth-${Date.now()}@example.test`;
    const password = "စာအုပ်လေ့လာရန်-Strong-Password-2026";
    emailsToCleanup.push(email);

    const account = await createLocalAccount({ name: "စမ်းသပ်သင်ယူသူ", email, password });
    expect(account.email).toBe(email);

    const database = await getDb();
    const row = await database.execute({ sql: "SELECT passwordHash FROM users WHERE id = ?", args: [account.id] });
    expect(String(row.rows[0]?.passwordHash)).toMatch(/^scrypt\$/);
    expect(String(row.rows[0]?.passwordHash)).not.toContain(password);

    await expect(authenticateLocalAccount(email, "မမှန်သော-password")).rejects.toThrow("စကားဝှက်မမှန်");
    const signedIn = await authenticateLocalAccount(email, password);
    const token = await createLocalSession(signedIn.id);
    expect((await getLocalSessionUser(token))?.id).toBe(signedIn.id);

    await deleteLocalSession(token);
    await expect(getLocalSessionUser(token)).resolves.toBeNull();
  }, 45_000);
});
