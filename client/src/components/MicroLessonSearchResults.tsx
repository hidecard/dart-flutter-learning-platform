import { Link } from "wouter";
import type { MicroLesson } from "@shared/microLessons";
import { microLessonSearchHref, microLessonSearchLabel } from "@shared/searchResultLinks";

export function MicroLessonSearchResults({ microLessons, onClose }: { microLessons: MicroLesson[]; onClose?: () => void }) {
  return <>{microLessons.map((lesson) => <Link key={`micro-${lesson.id}`} href={microLessonSearchHref(lesson.id)} onClick={onClose} className="block w-full rounded-xl px-4 py-3 text-left hover:bg-cyan-50"><p className="text-xs font-bold text-cyan-700">{microLessonSearchLabel(lesson.sequence, lesson.moduleTitle)}</p><p className="mt-1 text-sm font-bold text-slate-800">{lesson.title}</p><p className="mt-1 line-clamp-1 text-xs text-slate-500">{lesson.objective}</p></Link>)}</>;
}
