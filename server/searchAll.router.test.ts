import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  getLessonContentOverrides: vi.fn(),
  getCertificateForUser: vi.fn(),
  getChapterProgressForUser: vi.fn(),
  getCompletionSummary: vi.fn(),
  setChapterProgress: vi.fn(),
  issueCertificateForUser: vi.fn(),
  deleteLessonContentOverride: vi.fn(),
  upsertLessonContentOverride: vi.fn(),
}));

vi.mock("./db", () => dbMocks);

import { appRouter } from "./routers";

function publicContext(): TrpcContext {
  return {
    user: undefined,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("course.searchAll router", () => {
  it("returns existing chapters and micro-lessons through the public procedure", async () => {
    dbMocks.getLessonContentOverrides.mockResolvedValue([]);
    const caller = appRouter.createCaller(publicContext());
    const result = await caller.course.searchAll({ query: "Dart" });

    expect(result.chapters.length).toBeGreaterThan(0);
    expect(result.microLessons.length).toBeGreaterThan(0);
    expect(result.microLessons[0]).toMatchObject({ id: expect.any(Number), title: expect.any(String), example: expect.any(String) });
  });
});
