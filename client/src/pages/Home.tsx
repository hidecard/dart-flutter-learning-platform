import { LessonReader } from "@/components/LessonReader";
import { LessonSidebar } from "@/components/LessonSidebar";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { allChapters, courseParts } from "@shared/courseCatalog";
import { flutterPdfCoverage } from "@shared/flutterPdfCoverage";
import { Award, BookOpen, CheckCircle2, ChevronRight, CircleHelp, Command, GraduationCap, Library, Menu, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

function LearningProgress({ completedIds, parts }: { completedIds: Set<number>; parts: typeof courseParts }) {
  const totalChapters = parts.flatMap((part) => part.chapters).length;
  const overall = Math.round((completedIds.size / totalChapters) * 100);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-end justify-between"><div><p className="text-sm font-bold text-slate-900">သင်ယူမှုတိုးတက်မှု</p><p className="mt-1 text-xs text-slate-500">သင်ပြီးစီးထားသောအခန်းများ</p></div><strong className="text-2xl font-extrabold text-teal-700">{overall}%</strong></div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${overall}%` }} /></div>
      <div className="mt-5 space-y-3">
        {parts.map((part) => {
          const count = part.chapters.filter((chapter) => completedIds.has(chapter.id)).length;
          const percent = Math.round((count / part.chapters.length) * 100);
          return <div key={part.id}><div className="mb-1.5 flex justify-between gap-3 text-[11px] font-semibold text-slate-500"><span className="truncate">{part.title}</span><span>{count}/{part.chapters.length}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-400" style={{ width: `${percent}%` }} /></div></div>;
        })}
      </div>
    </section>
  );
}

function CertificateProgressCard({ isAuthenticated, completedChapters, totalChapters, eligible, hasCertificate }: { isAuthenticated: boolean; completedChapters: number; totalChapters: number; eligible: boolean; hasCertificate: boolean }) {
  return <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><Award className="h-5 w-5" /></span><div><p className="text-sm font-extrabold text-amber-950">သင်ယူမှုပြီးစီးလက်မှတ်</p><p className="mt-1 text-xs leading-5 text-amber-900">{isAuthenticated ? hasCertificate ? "Certificate ထုတ်ပေးပြီးပါပြီ။" : eligible ? "အခန်းအားလုံးပြီးစီးပါပြီ။ Certificate ထုတ်နိုင်ပါသည်။" : `${completedChapters}/${totalChapters} အခန်းပြီးစီးမှ Certificate ရယူနိုင်ပါသည်။` : "ပြီးစီးမှုကိုသိမ်းရန်နှင့် Certificate ရယူရန် ဝင်ရောက်ပါ။"}</p></div></div>{isAuthenticated ? <Link href="/certificate" className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-amber-700 px-3 py-2 text-xs font-bold text-white hover:bg-amber-800">{hasCertificate ? "Certificate ကြည့်မည်" : "ပြီးစီးမှုနှင့် Certificate ကြည့်မည်"}</Link> : <Link href="/signin?redirect=%2Fcertificate" className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-amber-700 px-3 py-2 text-xs font-bold text-white hover:bg-amber-800">ဝင်ရောက်မည်</Link>}</section>;
}

function LandingPage({ onStart, completedIds, parts }: { onStart: () => void; completedIds: Set<number>; parts: typeof courseParts }) {
  const totalChapters = parts.flatMap((part) => part.chapters).length;
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f6] text-slate-950">
          <header className="border-b border-slate-200/80 bg-[#f7f8f6]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <button onClick={onStart} className="flex items-center gap-3 text-left"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-teal-300"><BookOpen className="h-5 w-5" /></span><span><strong className="block text-sm">Dart & Flutter</strong><span className="block text-xs text-slate-500">Masterclass</span></span></button>
          <div className="flex items-center gap-4"><Link href="/playground" className="hidden text-sm font-semibold text-slate-600 hover:text-teal-700 md:block">Dart Playground</Link><Link href="/glossary" className="hidden text-sm font-semibold text-slate-600 hover:text-teal-700 sm:block">ဝေါဟာရစာအုပ်</Link><button onClick={onStart} className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800">သင်ခန်းစာစတင်မည်</button></div>
        </div>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:pb-24 lg:pt-24">
          <div className="relative z-10"><div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800"><Sparkles className="h-3.5 w-3.5" /> မြန်မာဘာသာဖြင့် နက်နက်ရှိုင်းရှိုင်းလေ့လာရန်</div><h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.14] tracking-tight sm:text-5xl lg:text-6xl">Dart နှင့် Flutter ကို<br /><span className="text-teal-700">လက်တွေ့တည်ဆောက်ရင်း</span><br />နက်နက်ရှိုင်းရှိုင်းသင်ယူပါ</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">အခန်း {totalChapters} ခန်း၊ အပိုင်း {parts.length} ပိုင်းဖြင့် Dart အခြေခံမှ Supabase, architecture, testing နှင့် app deployment အထိ မြန်မာဘာသာဖြင့် concept, code အလုပ်လုပ်ပုံနှင့်အသုံးချနည်းတို့ကိုနားလည်အောင်လေ့လာနိုင်သော masterclass ဖြစ်ပါသည်။</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={onStart} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 active:scale-[.98]">သင်ခန်းစာစတင်မည် <ChevronRight className="h-4 w-4" /></button><Link href="/glossary" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800"><Library className="h-4 w-4" /> ဝေါဟာရကြည့်မည်</Link></div><div className="mt-9 flex flex-wrap gap-6 text-sm text-slate-600"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-700" /> Code အလုပ်လုပ်ပုံရှင်းလင်းချက်</span><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-700" /> လက်တွေ့စိန်ခေါ်မှုများ</span></div></div>
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7"><div className="absolute -right-5 -top-5 hidden h-28 w-28 rounded-full bg-teal-200/70 blur-2xl sm:block" /><div className="relative flex items-center justify-between border-b border-slate-100 pb-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><GraduationCap className="h-5 w-5" /></span><div><p className="text-sm font-bold">သင်ယူမှုလမ်းကြောင်း</p><p className="text-xs text-slate-500">အစပြုသူမှ production အထိ</p></div></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{totalChapters} အခန်း</span></div><div className="mt-5 space-y-3">{parts.slice(0, 4).map((part, index) => <div key={part.id} className="flex items-center gap-4 rounded-xl bg-slate-50 p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-teal-700 shadow-sm">{index + 1}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">{part.title}</p><p className="mt-0.5 text-xs text-slate-500">{part.chapters.length} အခန်း</p></div><div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-teal-600" style={{ width: `${part.chapters.filter((chapter) => completedIds.has(chapter.id)).length / part.chapters.length * 100}%` }} /></div></div>)}</div><button onClick={onStart} className="mt-6 flex w-full items-center justify-between rounded-xl bg-slate-950 px-4 py-3.5 text-left text-sm font-bold text-white"><span>အခန်း ၁ — Dart နှင့် Flutter ကိုမိတ်ဆက်ခြင်း</span><ChevronRight className="h-4 w-4" /></button></div>
        </section>

        <section className="border-y border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="max-w-2xl"><p className="text-xs font-bold tracking-[0.16em] text-teal-700">အခန်းစဉ်</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight">အခန်းစဉ်များကို ရှင်းလင်းစွာစီစဉ်ထားပါသည်</h2><p className="mt-4 leading-7 text-slate-600">အပိုင်းတစ်ခုစီသည်အရင်အပိုင်းပေါ်အခြေခံထားသောကြောင့် စတင်သူတစ်ဦးလည်းလမ်းမပျောက်ဘဲလိုက်နိုင်ပါသည်။</p></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{parts.map((part, index) => <button key={part.id} onClick={onStart} className="group rounded-2xl border border-slate-200 p-5 text-left transition hover:-translate-y-0.5 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-950/5"><div className="flex items-start justify-between gap-4"><span className="text-sm font-extrabold text-teal-700">အပိုင်း {index + 1}</span><ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-teal-700" /></div><h3 className="mt-6 text-lg font-bold">{part.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{part.description}</p><p className="mt-5 text-xs font-bold text-slate-500">{part.chapters.length} အခန်း</p></button>)}</div></div></section>
        <section className="border-t border-slate-200 bg-[#f7f8f6]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="max-w-3xl"><p className="text-xs font-bold tracking-[0.16em] text-teal-700">PDF အကြောင်းအရာလမ်းညွှန်</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight">ပေးထားသော Flutter စာအုပ်၏ topic အစဉ်အတိုင်း</h2><p className="mt-4 leading-7 text-slate-600">ပေးထားသော PDF ၏ chapter နှင့် subtopic အစဉ်ကို မူရင်းမြန်မာရှင်းပြချက်များ၊ code လေ့ကျင့်ခန်းများနှင့် လက်ရှိ ၅၆ ခန်းထဲတွင် ပြန်လည်ချိတ်ဆက်ထားပါသည်။ မူရင်းစာအုပ်စာသားကို တိုက်ရိုက်ကူးယူခြင်းမပြုဘဲ concept နှင့် project flow ကို ကိုယ်ပိုင်စာအုပ်ဟန်ဖြင့် ပြန်ရေးထားပါသည်။</p></div><div className="mt-10 grid gap-4 md:grid-cols-2">{flutterPdfCoverage.map((entry) => <article key={entry.order} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-extrabold text-teal-800">{entry.order}</span><div className="min-w-0"><h3 className="text-base font-extrabold text-slate-900">{entry.BurmeseTitle}</h3><p className="mt-1 text-xs text-slate-500">{entry.title}</p></div></div><p className="mt-4 text-sm leading-7 text-slate-600">{entry.originalCoverage}</p><div className="mt-4 flex flex-wrap gap-1.5">{entry.sourceTopics.map((topic) => <span key={topic} className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">{topic}</span>)}</div><p className="mt-4 text-xs font-bold text-teal-700">ချိတ်ဆက်ထားသော အခန်းများ — {entry.mappedChapterIds.join(", ")}</p></article>)}</div></div></section>
      </main>
    </div>
  );
}

export default function Home() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const previewChapterId = Number(new URLSearchParams(window.location.search).get("chapter"));
  const hasPreviewChapter = Number.isInteger(previewChapterId) && allChapters.some((chapter) => chapter.id === previewChapterId);
  const [activeChapterId, setActiveChapterId] = useState(hasPreviewChapter ? previewChapterId : 1);
  const [isLearning, setIsLearning] = useState(hasPreviewChapter);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const utils = trpc.useUtils();
  const catalogQuery = trpc.course.catalog.useQuery();
  const progressQuery = trpc.progress.list.useQuery(undefined, { enabled: isAuthenticated });
  const certificateStatusQuery = trpc.certificate.status.useQuery(undefined, { enabled: isAuthenticated });
  const searchQuery = trpc.course.search.useQuery({ query: searchTerm }, { enabled: searchTerm.trim().length > 1 });
  const saveProgress = trpc.progress.setCompleted.useMutation({
    onSuccess: () => { utils.progress.list.invalidate(); utils.certificate.status.invalidate(); },
    onError: () => toast.error("ပြီးစီးမှုကိုမသိမ်းဆည်းနိုင်သေးပါ။ ထပ်စမ်းကြည့်ပါ။"),
  });
  const completedIds = useMemo(() => new Set((progressQuery.data ?? []).filter((item) => item.completed).map((item) => item.chapterId)), [progressQuery.data]);
  const catalogChapters = catalogQuery.data ?? allChapters;
  const learningParts = useMemo(() => courseParts.map((part) => ({ ...part, chapters: catalogChapters.filter((chapter) => chapter.partId === part.id) })), [catalogChapters]);
  const activeChapter = catalogChapters.find((chapter) => chapter.id === activeChapterId) ?? catalogChapters[0];
  const activePart = learningParts.find((part) => part.id === activeChapter.partId) ?? learningParts[0];

  function selectChapter(id: number) { setActiveChapterId(id); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function handleCompletion() {
    if (!isAuthenticated) { window.location.assign(`/signin?redirect=${encodeURIComponent(`/?chapter=${activeChapter.id}`)}`); return; }
    saveProgress.mutate({ chapterId: activeChapter.id, completed: !completedIds.has(activeChapter.id) });
  }

  if (!isLearning) return <LandingPage onStart={() => setIsLearning(true)} completedIds={completedIds} parts={learningParts} />;

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur"><div className="flex h-16 items-center gap-3 px-4 sm:px-6"><button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="သင်ခန်းစာမီနူးဖွင့်ရန်"><Menu className="h-5 w-5" /></button><button onClick={() => setIsLearning(false)} className="flex min-w-0 items-center gap-2 text-left"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-teal-300"><BookOpen className="h-4 w-4" /></span><span className="hidden min-w-0 sm:block"><strong className="block truncate text-sm">Dart & Flutter Masterclass</strong><span className="block text-[11px] text-slate-500">မြန်မာဘာသာသင်ခန်းစာ</span></span></button><div className="ml-auto flex items-center gap-2"><button onClick={() => setSearchOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-teal-600 hover:text-teal-800"><Search className="h-4 w-4" /><span className="hidden sm:inline">စာအုပ်တစ်လျှောက်ရှာရန်</span><Command className="hidden h-3.5 w-3.5 text-slate-400 lg:block" /></button><Link href="/glossary" className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100" aria-label="ဝေါဟာရစာအုပ်"><CircleHelp className="h-5 w-5" /></Link>{user?.role === "admin" ? <Link href="/admin" className="hidden rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-800 sm:inline">CMS စီမံရန်</Link> : null}{isAuthenticated ? <span className="hidden rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800 sm:inline">{user?.name ?? "သင်ယူသူ"}</span> : <Link href="/signin" className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white">ဝင်ရောက်မည်</Link>}</div></div></header>

      <div className="flex min-h-[calc(100vh-64px)]">
        <div className="hidden shrink-0 lg:block"><LessonSidebar parts={learningParts} activeChapterId={activeChapterId} completedIds={completedIds} onSelect={selectChapter} /></div>
        <main className="min-w-0 flex-1"><LessonReader chapter={activeChapter} part={activePart} completed={completedIds.has(activeChapter.id)} onToggleCompletion={handleCompletion} isSaving={saveProgress.isPending || authLoading} isAuthenticated={isAuthenticated} /></main>
        <aside className="hidden w-[312px] shrink-0 border-l border-slate-200 bg-white p-5 xl:block">
          <LearningProgress completedIds={completedIds} parts={learningParts} />
          <CertificateProgressCard isAuthenticated={isAuthenticated} completedChapters={certificateStatusQuery.data?.completedChapters ?? completedIds.size} totalChapters={certificateStatusQuery.data?.totalChapters ?? learningParts.flatMap((part) => part.chapters).length} eligible={certificateStatusQuery.data?.eligible ?? false} hasCertificate={Boolean(certificateStatusQuery.data?.certificate)} />
          <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white"><p className="text-sm font-bold">သင်ယူမှုအကြံပြုချက်</p><p className="mt-2 text-sm leading-6 text-slate-300">Code ကိုကိုယ်တိုင်run ပြီး challenge အပြီးလုပ်မှ နောက်အခန်းသို့သွားပါ။</p></div>
        </aside>
      </div>

      {sidebarOpen ? <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-slate-950/35" onClick={() => setSidebarOpen(false)} aria-label="မီနူးပိတ်ရန်" /><div className="relative h-full w-[min(88vw,330px)] shadow-2xl"><LessonSidebar parts={learningParts} activeChapterId={activeChapterId} completedIds={completedIds} onSelect={selectChapter} onClose={() => setSidebarOpen(false)} /></div></div> : null}
      {searchOpen ? <div className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-950/45 px-4 pt-[10vh] backdrop-blur-sm"><div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"><div className="flex items-center border-b border-slate-200 px-4"><Search className="h-5 w-5 text-slate-400" /><input autoFocus value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="အခန်း၊ ခေါင်းစဉ်၊ topic သို့မဟုတ် code keyword ရှာရန်" className="h-14 min-w-0 flex-1 px-3 text-sm outline-none placeholder:text-slate-400" /><button onClick={() => { setSearchOpen(false); setSearchTerm(""); }} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-4 w-4" /></button></div><div className="max-h-[55vh] overflow-y-auto p-2">{searchTerm.trim().length < 2 ? <p className="px-4 py-8 text-center text-sm text-slate-500">အနည်းဆုံးစာလုံး ၂ လုံးရိုက်ထည့်ပြီး စာအုပ်တစ်လျှောက်ရှာနိုင်ပါသည်။</p> : searchQuery.isLoading ? <p className="px-4 py-8 text-center text-sm text-slate-500">ရှာဖွေနေသည်…</p> : (searchQuery.data ?? []).length ? (searchQuery.data ?? []).map((chapter) => <button key={chapter.id} onClick={() => { selectChapter(chapter.id); setSearchOpen(false); setSearchTerm(""); }} className="block w-full rounded-xl px-4 py-3 text-left hover:bg-teal-50"><p className="text-xs font-bold text-teal-700">{chapter.partTitle} · အခန်း {chapter.id}</p><p className="mt-1 text-sm font-bold text-slate-800">{chapter.title}</p><p className="mt-1 line-clamp-1 text-xs text-slate-500">{chapter.summary}</p></button>) : <p className="px-4 py-8 text-center text-sm text-slate-500">ကိုက်ညီသောသင်ခန်းစာမတွေ့ပါ။ အခြားစကားလုံးဖြင့်စမ်းကြည့်ပါ။</p>}</div></div></div> : null}
    </div>
  );
}
