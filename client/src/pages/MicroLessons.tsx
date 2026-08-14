import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, CheckCircle2, Code2, PlayCircle, Search, Target } from "lucide-react";
import { detailedMicroLessons, detailedMicroLessonModules, microLessonCount, type MicroLesson } from "@shared/courseCatalog";

function LessonCard({ lesson, selected, onSelect }: { lesson: MicroLesson; selected: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className={`w-full rounded-xl border p-4 text-left transition ${selected ? "border-teal-600 bg-teal-50 shadow-sm" : "border-slate-200 bg-white hover:border-teal-300"}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">{lesson.sequence}</span>
        <span className="min-w-0">
          <span className="block text-sm font-extrabold leading-6 text-slate-900">{lesson.title}</span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">{lesson.level} · {lesson.moduleTitle}</span>
        </span>
      </div>
    </button>
  );
}

export default function MicroLessons() {
  const requestedLessonId = Number(new URLSearchParams(window.location.search).get("lesson"));
  const [query, setQuery] = useState("");
  const [moduleId, setModuleId] = useState("all");
  const [selectedId, setSelectedId] = useState(Number.isInteger(requestedLessonId) && requestedLessonId > 0 ? requestedLessonId : 1);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  useEffect(() => {
    try { setCompletedIds(JSON.parse(window.localStorage.getItem("micro-lesson-completed") ?? "[]")); } catch { setCompletedIds([]); }
  }, []);
  function toggleCompleted() {
    const next = completedIds.includes(selected.id) ? completedIds.filter((id) => id !== selected.id) : [...completedIds, selected.id];
    setCompletedIds(next);
    window.localStorage.setItem("micro-lesson-completed", JSON.stringify(next));
  }
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return detailedMicroLessons.filter((lesson) => {
      const moduleMatch = moduleId === "all" || lesson.moduleId === moduleId;
      const textMatch = !normalized || [lesson.title, lesson.moduleTitle, lesson.objective, lesson.concept, lesson.exercise].join(" ").toLocaleLowerCase().includes(normalized);
      return moduleMatch && textMatch;
    });
  }, [moduleId, query]);
  const selected = detailedMicroLessons.find((lesson) => lesson.id === selectedId) ?? detailedMicroLessons[0];

  return (
    <div className="min-h-screen bg-[#f7faf9] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-teal-700"><ArrowLeft className="h-4 w-4" /> မူလစာမျက်နှာ</Link>
          <div className="text-right"><p className="text-sm font-extrabold">Dart & Flutter Masterclass</p><p className="text-xs text-slate-500">အသေးစိတ် Micro-Lesson Library</p></div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        <div className="mb-8 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
          <p className="text-xs font-bold tracking-[0.18em] text-teal-300">SEQUENTIAL LEARNING LIBRARY</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">Dart အခြေခံမှ Flutter Production အထိ Lesson {microLessonCount} ခန့်</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">Dart ဆိုတာဘာလဲ၊ Flutter က widget tree ကိုဘယ်လိုတည်ဆောက်သလဲ၊ setup ကနေ testing၊ API၊ platform integration နှင့် release အထိ topic တစ်ခုချင်းစီကို အစဉ်လိုက်ဖတ်နိုင်ပါသည်။</p>
          <div className="mt-6 max-w-xl"><div className="flex justify-between text-xs font-bold text-slate-300"><span>ကိုယ်ပိုင်ဖတ်ရှုမှု</span><span>{completedIds.length}/{microLessonCount}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${(completedIds.length / microLessonCount) * 100}%` }} /></div></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:overflow-hidden">
            <div className="relative"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Lesson / topic ရှာရန်" className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-teal-600" /></div>
            <select value={moduleId} onChange={(event) => setModuleId(event.target.value)} className="mt-3 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-600"><option value="all">Module အားလုံး ({microLessonCount})</option>{detailedMicroLessonModules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}</select>
            <p className="mt-4 text-xs font-bold text-slate-500">ပြသနေသော lesson {filtered.length} ခု</p>
            <div className="mt-3 space-y-2 overflow-y-auto lg:h-[calc(100%-105px)]">{filtered.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} selected={lesson.id === selected.id} onSelect={() => setSelectedId(lesson.id)} />)}</div>
          </aside>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold"><span className="rounded-full bg-teal-100 px-3 py-1 text-teal-900">Lesson {selected.sequence}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{selected.level}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{selected.moduleTitle}</span></div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950">{selected.title}</h2>
            <section className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-xl bg-sky-50 p-5"><div className="flex items-center gap-2 font-extrabold text-sky-950"><Target className="h-4 w-4" /> ဒီ lesson ပြီးလျှင်</div><p className="mt-3 text-sm leading-7 text-slate-700">{selected.objective}</p></div><div className="rounded-xl bg-amber-50 p-5"><div className="flex items-center gap-2 font-extrabold text-amber-950"><BookOpen className="h-4 w-4" /> ဘာကြောင့်လေ့လာရသလဲ</div><p className="mt-3 text-sm leading-7 text-slate-700">{selected.whyItMatters}</p></div></section>
            <section className="mt-8"><h3 className="text-xl font-black">အယူအဆကို နားလည်မယ်</h3><p className="mt-3 text-base leading-8 text-slate-700">{selected.concept}</p></section>
            {selected.diagram && <section className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-5"><h3 className="text-xl font-black text-cyan-950">Diagram — {selected.diagram.title}</h3><div className="mt-4 flex flex-wrap items-center gap-2">{selected.diagram.nodes.map((node, index) => <span key={node} className="flex items-center gap-2"><span className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-cyan-950 shadow-sm ring-1 ring-cyan-100">{node}</span>{index < selected.diagram!.nodes.length - 1 && <span className="text-cyan-700">→</span>}</span>)}</div></section>}
            <section className="mt-8"><h3 className="flex items-center gap-2 text-xl font-black"><Code2 className="h-5 w-5 text-teal-700" /> Syntax နှင့် Code</h3><pre className="mt-3 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-amber-200"><code>{selected.syntax}\n\n{selected.example}</code></pre></section>
            <section className="mt-8"><h3 className="text-xl font-black">Code ကို တစ်ကြောင်းချင်းဖတ်မယ်</h3><ol className="mt-3 space-y-3">{selected.lineByLine.map((line, index) => <li key={line} className="flex gap-3 text-sm leading-7 text-slate-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">{index + 1}</span><span>{line}</span></li>)}</ol></section>
            <section className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-xl bg-emerald-50 p-5"><h3 className="font-black text-emerald-950">မျှော်မှန်းရလဒ်</h3><p className="mt-3 text-sm leading-7 text-emerald-950">{selected.expectedOutput}</p></div><div className="rounded-xl bg-rose-50 p-5"><h3 className="font-black text-rose-950">မကြာခဏမှားတတ်သောအချက်</h3>{selected.commonMistakes.map((item) => <p key={item.mistake} className="mt-3 text-sm leading-7 text-slate-700"><strong>{item.mistake}</strong><br />ပြင်ဆင်နည်း — {item.fix}</p>)}</div></section>
            <section className="mt-8 rounded-2xl border border-violet-100 bg-violet-50 p-5"><div className="flex items-center gap-2 font-black text-violet-950"><CheckCircle2 className="h-5 w-5" /> လက်တွေ့လေ့ကျင့်ခန်း</div><p className="mt-3 text-sm leading-7 text-violet-950">{selected.exercise}</p></section>
            <div className="mt-6 flex flex-wrap gap-3"><button onClick={toggleCompleted} className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white ${completedIds.includes(selected.id) ? "bg-emerald-700" : "bg-slate-950"}`}><CheckCircle2 className="h-4 w-4" />{completedIds.includes(selected.id) ? "ဒီ lesson ပြီးစီးပြီး" : "ပြီးစီးကြောင်းမှတ်မည်"}</button><Link href={`/playground?microLesson=${selected.id}&chapter=${selected.chapterId}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-teal-300 bg-white px-4 py-2.5 text-sm font-bold text-teal-800"><PlayCircle className="h-4 w-4" />ဒီ lesson code စမ်းမည်</Link></div>
          </article>
        </div>
      </main>
    </div>
  );
}
