import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  getCertificateForUser: vi.fn(),
  getChapterProgressForUser: vi.fn(),
  getCompletionSummary: vi.fn(),
  setChapterProgress: vi.fn(),
  issueCertificateForUser: vi.fn(),
}));

vi.mock("./db", () => ({
  getCertificateForUser: dbMocks.getCertificateForUser,
  getChapterProgressForUser: dbMocks.getChapterProgressForUser,
  getCompletionSummary: dbMocks.getCompletionSummary,
  issueCertificateForUser: dbMocks.issueCertificateForUser,
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

  it("returns the authenticated learner's certificate eligibility and issued record", async () => {
    dbMocks.getCompletionSummary.mockResolvedValue({ completedChapters: 56, totalChapters: 56, percentage: 100, eligible: true });
    dbMocks.getCertificateForUser.mockResolvedValue({ certificateCode: "DFM-ABC123", recipientName: "သင်ယူသူ" });
    const caller = appRouter.createCaller(contextWithUser());

    await expect(caller.certificate.status()).resolves.toMatchObject({
      completedChapters: 56,
      eligible: true,
      certificate: { certificateCode: "DFM-ABC123" },
    });
    expect(dbMocks.getCompletionSummary).toHaveBeenCalledWith(42, 56);
    expect(dbMocks.getCertificateForUser).toHaveBeenCalledWith(42);
  });

  it("issues a certificate only in the authenticated learner's identity", async () => {
    dbMocks.issueCertificateForUser.mockResolvedValue({ certificateCode: "DFM-ABC123", recipientName: "သင်ယူသူ" });
    const caller = appRouter.createCaller(contextWithUser());

    await expect(caller.certificate.issue()).resolves.toMatchObject({ certificateCode: "DFM-ABC123" });
    expect(dbMocks.issueCertificateForUser).toHaveBeenCalledWith({
      userId: 42,
      recipientName: "သင်ယူသူ",
      totalChapters: 56,
      courseVersion: "Dart & Flutter Masterclass · 56 chapters",
    });
  });
});
