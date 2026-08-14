import type { MicroLesson } from "./microLessons";

/**
 * Micro-lessons are authored source content rather than database rows. The existing
 * admin CMS edits the mapped 56 chapter records, while micro-lessons remain a
 * stable, reviewable curriculum inventory. This avoids creating two competing
 * editable copies of the same lesson and keeps certificate/progress records tied
 * to the existing chapter IDs.
 */
export const microLessonCmsStrategy = {
  editableInAdminCms: false,
  sourceOfTruth: "shared/microLessons.ts",
  overrideBoundary: "chapter",
  progressBoundary: "micro-lesson-local-and-chapter-server",
} as const;

export function cmsContextForMicroLesson(lesson: MicroLesson) {
  return {
    microLessonId: lesson.id,
    mappedChapterId: lesson.chapterId,
    mappedPartId: lesson.partId,
    editableByExistingChapterCms: false,
    reason: "Micro-lesson content is source-controlled; mapped chapter overrides remain available through the existing admin CMS.",
  } as const;
}
