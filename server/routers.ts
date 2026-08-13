import { allChapters, EditableLessonContent, mergeEditableLessonContent, searchCourse } from "@shared/courseCatalog";
import { z } from "zod";
import { deleteLessonContentOverride, getCertificateForUser, getChapterProgressForUser, getCompletionSummary, getLessonContentOverrides, issueCertificateForUser, setChapterProgress, upsertLessonContentOverride } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { authenticateLocalAccount, clearLocalSessionCookie, createLocalAccount, createLocalSession, deleteLocalSession, readLocalSessionToken, setLocalSessionCookie } from "./localAuth";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";

const editableLessonContentSchema = z.object({
  title: z.string().trim().min(1).max(200),
  summary: z.string().trim().min(1).max(2000),
  duration: z.string().trim().min(1).max(50),
  level: z.string().trim().min(1).max(80),
  topics: z.array(z.string().trim().min(1).max(60)).min(1).max(12),
  sections: z.array(z.object({
    heading: z.string().trim().min(1).max(200),
    paragraphs: z.array(z.string().trim().min(1).max(6000)).min(1).max(12),
  })).min(1).max(12),
  code: z.object({
    language: z.string().trim().min(1).max(40),
    code: z.string().min(1).max(30000),
    annotations: z.array(z.object({
      label: z.string().trim().min(1).max(100),
      detail: z.string().trim().min(1).max(1000),
    })).max(20),
  }),
  challenge: z.string().trim().min(1).max(3000),
  checklist: z.array(z.string().trim().min(1).max(500)).min(1).max(12),
});

async function getMergedCatalog() {
  const rows = await getLessonContentOverrides();
  const overrides = rows.flatMap((row) => {
    try {
      return [{ chapterId: row.chapterId, content: editableLessonContentSchema.parse(JSON.parse(row.contentJson)) as EditableLessonContent }];
    } catch {
      console.error(`[CMS] Ignoring malformed lesson override for chapter ${row.chapterId}`);
      return [];
    }
  });
  return mergeEditableLessonContent(overrides);
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    signUp: publicProcedure
      .input(z.object({ name: z.string().trim().min(2).max(100).optional(), email: z.string().trim().email().max(320), password: z.string().min(10).max(128) }))
      .mutation(async ({ ctx, input }) => {
        const user = await createLocalAccount(input);
        const token = await createLocalSession(user.id);
        setLocalSessionCookie(ctx.res, ctx.req, token);
        return user;
      }),
    signIn: publicProcedure
      .input(z.object({ email: z.string().trim().email().max(320), password: z.string().min(1).max(128) }))
      .mutation(async ({ ctx, input }) => {
        const user = await authenticateLocalAccount(input.email, input.password);
        const token = await createLocalSession(user.id);
        setLocalSessionCookie(ctx.res, ctx.req, token);
        return user;
      }),
    logout: publicProcedure.mutation(async ({ ctx }) => {
      await deleteLocalSession(readLocalSessionToken(ctx.req));
      clearLocalSessionCookie(ctx.res, ctx.req);
      return {
        success: true,
      } as const;
    }),
  }),
  course: router({
    catalog: publicProcedure.query(() => getMergedCatalog()),
    search: publicProcedure
      .input(z.object({ query: z.string().trim().max(100) }))
      .query(async ({ input }) => searchCourse(input.query, await getMergedCatalog())),
  }),
  progress: router({
    list: protectedProcedure.query(({ ctx }) => getChapterProgressForUser(ctx.user.id)),
    setCompleted: protectedProcedure
      .input(z.object({ chapterId: z.number().int().min(1).max(allChapters.length), completed: z.boolean() }))
      .mutation(({ ctx, input }) => setChapterProgress(ctx.user.id, input.chapterId, input.completed)),
  }),
  certificate: router({
    status: protectedProcedure.query(async ({ ctx }) => {
      const [summary, certificate] = await Promise.all([
        getCompletionSummary(ctx.user.id, allChapters.length),
        getCertificateForUser(ctx.user.id),
      ]);
      return { ...summary, certificate };
    }),
    issue: protectedProcedure.mutation(({ ctx }) => issueCertificateForUser({
      userId: ctx.user.id,
      recipientName: ctx.user.name?.trim() || ctx.user.email || "သင်ယူသူ",
      totalChapters: allChapters.length,
      courseVersion: "Dart & Flutter Masterclass · 56 chapters",
    })),
  }),
  cms: router({
    catalog: adminProcedure.query(() => getMergedCatalog()),
    lesson: adminProcedure
      .input(z.object({ chapterId: z.number().int().min(1).max(allChapters.length) }))
      .query(async ({ input }) => {
        const chapter = (await getMergedCatalog()).find((item) => item.id === input.chapterId);
        if (!chapter) throw new Error("Lesson was not found");
        return chapter;
      }),
    saveLesson: adminProcedure
      .input(z.object({ chapterId: z.number().int().min(1).max(allChapters.length), content: editableLessonContentSchema }))
      .mutation(async ({ ctx, input }) => {
        if (!allChapters.some((chapter) => chapter.id === input.chapterId)) throw new Error("Lesson was not found");
        return upsertLessonContentOverride(input.chapterId, JSON.stringify(input.content), ctx.user.id);
      }),
    resetLesson: adminProcedure
      .input(z.object({ chapterId: z.number().int().min(1).max(allChapters.length) }))
      .mutation(({ input }) => deleteLessonContentOverride(input.chapterId)),
  }),
});

export type AppRouter = typeof appRouter;
