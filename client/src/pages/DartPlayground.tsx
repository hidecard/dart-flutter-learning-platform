import { allChapters, detailedMicroLessons } from "@shared/courseCatalog";
import { dartPadWorkspaceUrl } from "@shared/playground";
import { ArrowLeft, CheckCircle2, Clipboard, ClipboardCheck, ExternalLink, Play, RefreshCcw, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

export default function DartPlayground() {
  const params = new URLSearchParams(window.location.search);
  const requestedChapterId = Number(params.get("chapter"));
  const requestedMicroLessonId = Number(params.get("microLesson"));
  const initialMicroLesson = useMemo(() => detailedMicroLessons.find((lesson) => lesson.id === requestedMicroLessonId), [requestedMicroLessonId]);
  const initialChapter = useMemo(
    () => allChapters.find((chapter) => chapter.id === requestedChapterId) ?? allChapters[0]!,
    [requestedChapterId],
  );
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapter.id);
  const selectedChapter = allChapters.find((chapter) => chapter.id === selectedChapterId) ?? initialChapter;
  const [code, setCode] = useState(initialMicroLesson?.example ?? selectedChapter.code.code);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(selectedChapter.id === initialChapter.id && initialMicroLesson ? initialMicroLesson.example : selectedChapter.code.code);
    setCopied(false);
  }, [initialChapter.id, initialMicroLesson, selectedChapter.id]);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function openDartPad() {
    void navigator.clipboard.writeText(code);
    window.open(dartPadWorkspaceUrl, "_blank", "noopener,noreferrer");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-950">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href={`/?chapter=${selectedChapter.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 transition hover:text-teal-700"><ArrowLeft className="h-4 w-4" /> သင်ခန်းစာသို့ပြန်မည်</Link>
          <span className="hidden rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800 sm:inline">Browser-based Dart Playground</span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.16em] text-teal-700">PRACTICE IN YOUR BROWSER</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Dart Code Playground</h1>{initialMicroLesson && <p className="mt-2 text-sm font-bold text-teal-700">Micro-lesson {initialMicroLesson.sequence}: {initialMicroLesson.title}</p>}
          <p className="mt-4 text-base leading-8 text-slate-600">ဒီနေရာတွင် lesson code ကိုပြင်ပြီး DartPad တွင်run လုပ်ကာ output နှင့်error ကိုချက်ချင်းကြည့်နိုင်ပါသည်။ သင်၏code ကိုဤwebsite server သို့မပို့ဘဲ DartPad browser workspace တွင်သာrun လုပ်ပါသည်။</p>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="lesson-code-heading">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-xs font-bold tracking-[0.14em] text-teal-700">STEP 1 — CODE ကိုရွေးပါ</p><h2 id="lesson-code-heading" className="mt-1 text-xl font-extrabold">Lesson Code ကိုပြင်မယ်</h2></div>
              <select value={selectedChapterId} onChange={(event) => setSelectedChapterId(Number(event.target.value))} className="max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" aria-label="သင်ခန်းစာရွေးရန်">
                {allChapters.map((chapter) => <option key={chapter.id} value={chapter.id}>အခန်း {chapter.id} — {chapter.title}</option>)}
              </select>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">လက်ရှိအခန်း — <strong className="text-slate-900">{selectedChapter.title}</strong></p>
            <textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} className="mt-5 min-h-[360px] w-full resize-y rounded-xl bg-slate-950 p-4 font-mono text-[13px] leading-6 text-slate-100 outline-none ring-1 ring-slate-800 focus:ring-2 focus:ring-teal-400" aria-label="ပြင်ဆင်နိုင်သော Dart code" />
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={copyCode} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800">{copied ? <ClipboardCheck className="h-4 w-4 text-teal-700" /> : <Clipboard className="h-4 w-4" />}{copied ? "Code ကူးယူပြီး" : "STEP 2 — Code ကူးယူမည်"}</button>
              <button onClick={() => setCode(selectedChapter.code.code)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800"><RefreshCcw className="h-4 w-4" />မူရင်း Code ပြန်ထားမည်</button>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="dartpad-heading">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
              <div><p className="text-xs font-bold tracking-[0.14em] text-teal-700">STEP 3 — PASTE & RUN</p><h2 id="dartpad-heading" className="mt-1 text-xl font-extrabold">DartPad Workspace ကိုဖွင့်မယ်</h2></div>
              <button onClick={openDartPad} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"><ExternalLink className="h-3.5 w-3.5" />DartPad ဖွင့်မည်</button>
            </div>
            <div className="p-5 sm:p-6">
              <div className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8"><p className="text-xs font-bold tracking-[0.15em] text-teal-300">YOUR CODE IS READY</p><h3 className="mt-3 text-2xl font-extrabold">Code ကိုကူးပြီး DartPad တွင်ချက်ချင်း Run ပါ</h3><p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">Button ကိုနှိပ်လျှင် သင်ပြင်ထားသောcode ကိုclipboard ထဲအလိုအလျောက်ကူးယူပြီး DartPad ကိုbrowser tab အသစ်တွင်ဖွင့်ပေးပါသည်။ DartPad editor ထဲတွင် paste လုပ်ကာ <strong className="text-white">Run</strong> ကိုနှိပ်ပါ။</p><button onClick={openDartPad} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-teal-300"><Play className="h-4 w-4" />Code ကူးပြီး DartPad တွင် Run မည်</button></div>
              <ol className="mt-6 space-y-4">{["ဘယ်ဘက် editor တွင်code ကိုပြင်ပါ။", "“Code ကူးပြီး DartPad တွင် Run မည်” ကိုနှိပ်ပါ။", "ဖွင့်လာသော DartPad ထဲတွင် Ctrl/⌘ + V ဖြင့်paste လုပ်ပါ။", "အပြာရောင် Run button ကိုနှိပ်ပြီး console output သို့မဟုတ်error ကိုဖတ်ပါ။"].map((step, index) => <li key={step} className="flex gap-3 rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-extrabold text-white">{index + 1}</span><span>{step}</span></li>)}</ol>
              <div className="mt-6 flex gap-3 rounded-xl border border-teal-100 bg-teal-50 p-4 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" /><p><strong className="text-slate-900">Browser တွင်တိုက်ရိုက် run လုပ်နိုင်ပါသည်။</strong> DartPad သည်Dart code editor, formatter, diagnostics နှင့်console output ပါသောofficial browser workspace ဖြစ်ပါသည်။</p></div>
            </div>
            <div className="flex gap-3 bg-slate-50 px-5 py-4 text-xs leading-5 text-slate-600 sm:px-6"><ShieldCheck className="h-4 w-4 shrink-0 text-teal-700" /><p>Code execution ကိုDartPad ကbrowser environment တွင်လုပ်ဆောင်ပေးပါသည်။ ဒီ learning platform ၏database၊account သို့မဟုတ်server ပေါ်တွင် learner code ကိုမrun ပါ။</p></div>
          </section>
        </div>

        <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 p-5 text-sm leading-7 text-slate-700"><div className="flex gap-3"><Play className="mt-1 h-5 w-5 shrink-0 text-teal-700" /><p><strong className="text-slate-900">လက်တွေ့လေ့ကျင့်ပါ။</strong> Variable value တစ်ခုကိုပြောင်းပြီး Run လုပ်ပါ။ ပြီးလျှင် error တစ်ခုကိုရည်ရွယ်ချက်ရှိရှိထည့်ကြည့်ပြီး DartPad ပြသသောmessage မှ file/line နှင့်အကြောင်းရင်းကိုဖတ်ကြည့်ပါ။</p></div></div>
      </section>
    </main>
  );
}
