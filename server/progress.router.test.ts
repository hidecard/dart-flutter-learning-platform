import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  getChapterProgressForUser: vi.fn(),
  setChapterProgress: vi.fn(),
}));

vi.mock("./db", () => ({
  getChapterProgressForUser: dbMocks.getChapterProgressForUser,
  setChapterProgress: dbMocks.setChapterProgress,
}));

import { appRouter } from "./routers";

const authenticatedUser = {
  id: 42,
  openId: "learner-42",
  email: "learner@example.com",
  name: "သင်ယူသူ",
  loginMethod: "manus",
  role: "user" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

function contextWithUser(): TrpcContext {
  return {
    user: authenticatedUser,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("progress router", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads only the authenticated learner's progress", async () => {
    dbMocks.getChapterProgressForUser.mockResolvedValue([{ chapterId: 2, completed: true }]);
    const caller = appRouter.createCaller(contextWithUser());

    await expect(caller.progress.list()).resolves.toEqual([{ chapterId: 2, completed: true }]);
    expect(dbMocks.getChapterProgressForUser).toHaveBeenCalledWith(42);
  });

  it("persists an authenticated learner's chapter completion", async () => {
    dbMocks.setChapterProgress.mockResolvedValue({ chapterId: 5, completed: true });
    const caller = appRouter.createCaller(contextWithUser());

    await expect(caller.progress.setCompleted({ chapterId: 5, completed: true })).resolves.toEqual({ chapterId: 5, completed: true });
    expect(dbMocks.setChapterProgress).toHaveBeenCalledWith(42, 5, true);
  });
});
