import { COOKIE_NAME } from "@shared/const";
import { allChapters, searchCourse } from "@shared/courseCatalog";
import { z } from "zod";
import { getChapterProgressForUser, setChapterProgress } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  course: router({
    catalog: publicProcedure.query(() => allChapters),
    search: publicProcedure
      .input(z.object({ query: z.string().trim().max(100) }))
      .query(({ input }) => searchCourse(input.query)),
  }),
  progress: router({
    list: protectedProcedure.query(({ ctx }) => getChapterProgressForUser(ctx.user.id)),
    setCompleted: protectedProcedure
      .input(z.object({ chapterId: z.number().int().min(1).max(20), completed: z.boolean() }))
      .mutation(({ ctx, input }) => setChapterProgress(ctx.user.id, input.chapterId, input.completed)),
  }),
});

export type AppRouter = typeof appRouter;
