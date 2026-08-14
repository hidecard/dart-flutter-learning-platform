export function microLessonSearchHref(lessonId: number) {
  return `/lessons?lesson=${lessonId}`;
}

export function microLessonSearchLabel(sequence: number, moduleTitle: string) {
  return `Micro-lesson ${sequence} · ${moduleTitle}`;
}
