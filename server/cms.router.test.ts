import { beforeEach, describe, expect, it, vi } from "vitest";
import { allChapters, toEditableLessonContent } from "../shared/courseCatalog";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  deleteLessonContentOverride: vi.fn(),
  getChapterProgressForUser: vi.fn(),
  getLessonContentOverrides: vi.fn(),
  setChapterProgress: vi.fn(),
  upsertLessonContentOverride: vi.fn(),
}));

vi.mock("./db", () => dbMocks);

import { appRouter } from "./routers";

function contextFor(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: role === "admin" ? 9 : 10,
      openId: `${role}-user`,
      email: `${role}@example.com`,
      name: role === "admin" ? "စီမံခန့်ခွဲသူ" : "သင်ယူသူ",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("CMS router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dbMocks.getLessonContentOverrides.mockResolvedValue([]);
  });

  it("allows an admin to load the complete editable catalog", async () => {
    const caller = appRouter.createCaller(contextFor("admin"));
    const catalog = await caller.cms.catalog();

    expect(catalog).toHaveLength(20);
    expect(catalog[0]?.title).toBe(allChapters[0]?.title);
  });

  it("stores validated lesson content with the admin identity", async () => {
    dbMocks.upsertLessonContentOverride.mockResolvedValue({ chapterId: 1 });
    const caller = appRouter.createCaller(contextFor("admin"));
    const content = toEditableLessonContent(allChapters[0]!);

    await caller.cms.saveLesson({ chapterId: 1, content });

    expect(dbMocks.upsertLessonContentOverride).toHaveBeenCalledWith(
      1,
      JSON.stringify(content),
      9,
    );
  });

  it("rejects CMS requests from a signed-in non-admin", async () => {
    const caller = appRouter.createCaller(contextFor("user"));

    await expect(caller.cms.catalog()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
