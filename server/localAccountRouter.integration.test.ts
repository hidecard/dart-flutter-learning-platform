import { afterEach, describe, expect, it } from "vitest";
import { allChapters, toEditableLessonContent } from "../shared/courseCatalog";
import { createContext, type TrpcContext } from "./_core/context";
import { getDb } from "./db";
import { LOCAL_SESSION_COOKIE, getLocalSessionUser } from "./localAuth";
import { appRouter } from "./routers";

const emailsToCleanup: string[] = [];

function responseRecorder() {
  const cookies: { name: string; value: string; options: Record<string, unknown> }[] = [];
  return {
    cookies,
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => cookies.push({ name, value, options }),
      clearCookie: () => undefined,
    } as unknown as TrpcContext["res"],
  };
}

async function contextFromToken(token: string, res: TrpcContext["res"]) {
  return createContext({
    req: { protocol: "https", headers: { cookie: `${LOCAL_SESSION_COOKIE}=${token}` } } as TrpcContext["req"],
    res,
    info: {} as never,
  });
}

afterEach(async () => {
  const database = await getDb();
  for (const email of emailsToCleanup.splice(0)) {
    await database.execute({ sql: "DELETE FROM users WHERE email = ?", args: [email] });
  }
});

describe("local account router integration", () => {
  it("uses a Turso local account session for auth, progress, admin CMS, and logout", async () => {
    const email = `router-local-${Date.now()}@example.test`;
    emailsToCleanup.push(email);
    const password = "Router-Local-Account-Password-2026";
    const signupResponse = responseRecorder();
    const anonymousCtx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: signupResponse.res,
    };

    const signedUp = await appRouter.createCaller(anonymousCtx).auth.signUp({ name: "Router စမ်းသပ်သူ", email, password });
    const token = signupResponse.cookies.find((cookie) => cookie.name === LOCAL_SESSION_COOKIE)?.value;
    expect(token).toBeTruthy();
    expect((await getLocalSessionUser(token))?.email).toBe(email);

    const database = await getDb();
    await database.execute({ sql: "UPDATE users SET role = 'admin' WHERE id = ?", args: [signedUp.id] });
    const secureResponse = responseRecorder();
    const secureCtx = await contextFromToken(token!, secureResponse.res);
    expect(secureCtx.user?.role).toBe("admin");
    const caller = appRouter.createCaller(secureCtx);
    await expect(caller.auth.me()).resolves.toMatchObject({ email });

    await caller.progress.setCompleted({ chapterId: 20, completed: true });
    await expect(caller.progress.list()).resolves.toEqual(expect.arrayContaining([expect.objectContaining({ chapterId: 20, completed: true })]));

    const previous = await database.execute({ sql: "SELECT contentJson, updatedByUserId, updatedAt FROM lessonContent WHERE chapterId = 20 LIMIT 1" });
    const changedContent = { ...toEditableLessonContent(allChapters[19]!), title: "Turso Local Admin Verification" };
    await caller.cms.saveLesson({ chapterId: 20, content: changedContent });
    await expect(caller.cms.lesson({ chapterId: 20 })).resolves.toMatchObject({ title: "Turso Local Admin Verification" });
    if (previous.rows[0]) {
      const old = previous.rows[0];
      await database.execute({ sql: "UPDATE lessonContent SET contentJson = ?, updatedByUserId = ?, updatedAt = ? WHERE chapterId = 20", args: [String(old.contentJson), Number(old.updatedByUserId), Number(old.updatedAt)] });
    } else {
      await caller.cms.resetLesson({ chapterId: 20 });
    }

    await caller.auth.logout();
    await expect(getLocalSessionUser(token)).resolves.toBeNull();
  }, 90_000);
});
