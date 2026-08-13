import type { CoursePart } from "@shared/courseCatalog";
import { BookOpen, CheckCircle2, ChevronDown, LockKeyhole, X } from "lucide-react";

type LessonSidebarProps = {
  parts: CoursePart[];
  activeChapterId: number;
  completedIds: Set<number>;
  onSelect: (chapterId: number) => void;
  onClose?: () => void;
  className?: string;
};

export function LessonSidebar({
  parts,
  activeChapterId,
  completedIds,
  onSelect,
  onClose,
  className = "",
}: LessonSidebarProps) {
  return (
    <aside className={`flex h-full w-[292px] flex-col border-r border-slate-200 bg-white ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-teal-700">သင်ယူမှုလမ်းကြောင်း</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">သင်ခန်းစာများ</p>
        </div>
        {onClose ? (
          <button onClick={onClose} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="ဘေးမီနူးပိတ်ရန်">
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4" aria-label="သင်ခန်းစာများ">
        {parts.map((part, index) => {
          const completedInPart = part.chapters.filter((chapter) => completedIds.has(chapter.id)).length;
          return (
            <section key={part.id} className="mb-5">
              <div className="mb-2 flex items-start gap-3 px-2">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[11px] font-bold text-teal-700">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold leading-5 text-slate-700">{part.title}</p>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">{completedInPart}/{part.chapters.length} ပြီးစီး</p>
                </div>
              </div>

              <div className="space-y-1">
                {part.chapters.map((chapter) => {
                  const isActive = chapter.id === activeChapterId;
                  const isComplete = completedIds.has(chapter.id);
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => onSelect(chapter.id)}
                      className={`group flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        isActive ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        isActive ? "bg-teal-400 text-slate-950" : isComplete ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        {isComplete ? <CheckCircle2 className="h-3.5 w-3.5" /> : chapter.id}
                      </span>
                      <span className="min-w-0 flex-1 text-[13px] font-medium leading-5">{chapter.title}</span>
                      {!isActive && !isComplete ? <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-50" /> : null}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-900">
          <LockKeyhole className="h-4 w-4 shrink-0 text-amber-700" />
          <span>ပြီးစီးမှုကိုသိမ်းရန် ဝင်ရောက်ထားရန်လိုပါသည်။</span>
        </div>
      </div>
    </aside>
  );
}
