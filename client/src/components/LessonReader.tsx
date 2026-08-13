import type { Chapter, CoursePart } from "@shared/courseCatalog";
import { Check, CheckCircle2, Clipboard, ClipboardCheck, Lightbulb, ListChecks, ListOrdered, PlayCircle, Target, TriangleAlert } from "lucide-react";
import { useState } from "react";

type LessonReaderProps = {
  chapter: Chapter;
  part: CoursePart;
  completed: boolean;
  onToggleCompletion: () => void;
  isSaving: boolean;
  isAuthenticated: boolean;
};

const dartKeywords = new Set([
  "abstract", "async", "await", "bool", "catch", "class", "const", "else", "enum", "extends", "final", "for", "Future", "if", "late", "required", "return", "sealed", "String", "switch", "throw", "try", "void", "with",
]);

function HighlightedCode({ code }: { code: string }) {
  return (
    <code>
      {code.split("\n").map((line, lineIndex) => {
        const tokens = line.split(/(\b[A-Za-z_][A-Za-z0-9_]*\b|'[^']*'|\b\d+\b)/g);
        return (
          <span key={`${line}-${lineIndex}`}>
            {tokens.map((token, tokenIndex) => {
              const className = dartKeywords.has(token)
                ? "text-fuchsia-300"
                : token.startsWith("'")
                  ? "text-amber-300"
                  : /^\d+$/.test(token)
                    ? "text-sky-300"
                    : "text-slate-100";
              return <span key={`${token}-${tokenIndex}`} className={className}>{token}</span>;
            })}
            {lineIndex < code.split("\n").length - 1 ? "\n" : null}
          </span>
        );
      })}
    </code>
  );
}

export function LessonReader({ chapter, part, completed, onToggleCompletion, isSaving, isAuthenticated }: LessonReaderProps) {
  const [copied, setCopied] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  async function copyCode() {
    await navigator.clipboard.writeText(chapter.code.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <article className="mx-auto w-full max-w-4xl px-5 py-9 sm:px-8 lg:px-12 lg:py-12">
      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-teal-50 px-3 py-1.5 text-teal-800">{part.title}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">အခန်း {chapter.id}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">{chapter.duration}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">{chapter.level}</span>
      </div>

      <div className="border-b border-slate-200 pb-9">
        <p className="mb-3 text-sm font-bold tracking-[0.15em] text-teal-700">DART နှင့် FLUTTER လေ့လာရေး</p>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{chapter.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{chapter.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {chapter.topics.map((topic) => (
            <span key={topic} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600">#{topic}</span>
          ))}
        </div>
      </div>

      <div className="lesson-prose mt-10 space-y-10">
        {chapter.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        <section className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 sm:p-6" aria-labelledby="goals-heading">
          <div className="flex items-center gap-2 text-sky-950"><Target className="h-5 w-5" /><h2 id="goals-heading" className="!mb-0 !text-xl">ဒီအခန်းပြီးလျှင် လုပ်နိုင်ရမည့်အရာများ</h2></div>
          <p className="mt-3 text-sm leading-6 text-slate-600">အောက်ပါအချက်များကို မိမိစကားဖြင့်ရှင်းပြနိုင်ပြီး code ထဲတွင်အသုံးချနိုင်လျှင် အခန်း၏အခြေခံကိုပိုင်နိုင်ပါပြီ။</p>
          <ul className="mt-4 space-y-3">{chapter.studyGuide.objectives.map((goal) => <li key={goal} className="flex gap-3 rounded-xl bg-white/90 p-3 text-sm leading-6 text-slate-700 ring-1 ring-sky-100"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" /><span>{goal}</span></li>)}</ul>
        </section>

        <section aria-labelledby="code-example-heading">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-teal-700">လက်တွေ့ CODE</p>
              <h2 id="code-example-heading" className="mt-1">လက်တွေ့ Code နမူနာ</h2>
            </div>
            <button onClick={copyCode} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800" aria-label="Code ကိုကူးယူရန်">
              {copied ? <ClipboardCheck className="h-4 w-4 text-teal-600" /> : <Clipboard className="h-4 w-4" />}
              {copied ? "ကူးယူပြီး" : "Code ကူးယူရန်"}
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl bg-slate-950 shadow-xl shadow-slate-950/10">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <span className="font-mono text-xs text-teal-300">{chapter.code.language}</span>
              <span className="text-xs text-slate-400">အခန်း {chapter.id} နမူနာ</span>
            </div>
            <pre className="overflow-x-auto p-5 text-[13px] leading-7 text-slate-100"><HighlightedCode code={chapter.code.code} /></pre>
          </div>
        </section>

        <section className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5 sm:p-6" aria-labelledby="annotation-heading">
          <div className="mb-4 flex items-center gap-2 text-teal-900">
            <Lightbulb className="h-5 w-5" />
            <h2 id="annotation-heading" className="!mb-0 !text-xl">Code မှတ်ချက်များ</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {chapter.code.annotations.map((annotation) => (
              <div key={annotation.label} className="rounded-xl bg-white/90 p-4 ring-1 ring-teal-100">
                <code className="text-sm font-bold text-teal-800">{annotation.label}</code>
                <p className="mt-2 text-sm leading-6 text-slate-600">{annotation.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 sm:p-6" aria-labelledby="walkthrough-heading">
          <div className="flex items-center gap-2 text-indigo-950"><ListOrdered className="h-5 w-5" /><h2 id="walkthrough-heading" className="!mb-0 !text-xl">Code ကိုတစ်ဆင့်ချင်းဖတ်မယ်</h2></div>
          <ol className="mt-4 space-y-3">{chapter.studyGuide.codeWalkthrough.map((step, index) => <li key={step} className="flex gap-3 rounded-xl bg-white/90 p-4 text-sm leading-6 text-slate-700 ring-1 ring-indigo-100"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-xs font-extrabold text-white">{index + 1}</span><span>{step}</span></li>)}</ol>
        </section>

        <section className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5 sm:p-6" aria-labelledby="mistakes-heading">
          <div className="flex items-center gap-2 text-rose-950"><TriangleAlert className="h-5 w-5" /><h2 id="mistakes-heading" className="!mb-0 !text-xl">စတင်သူများ မကြာခဏကြုံရသောအမှားများ</h2></div>
          <div className="mt-4 space-y-3">{chapter.studyGuide.commonMistakes.map((item) => <div key={item.mistake} className="rounded-xl bg-white/90 p-4 ring-1 ring-rose-100"><p className="text-sm font-bold leading-6 text-rose-900">သတိထားရန် — {item.mistake}</p><p className="mt-2 text-sm leading-6 text-slate-600"><strong className="text-slate-800">ပြင်ဆင်နည်း — </strong>{item.fix}</p></div>)}</div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6" aria-labelledby="challenge-heading">
          <div className="flex items-center gap-2 text-amber-900">
            <PlayCircle className="h-5 w-5" />
            <h2 id="challenge-heading" className="!mb-0 !text-xl">လက်တွေ့စိန်ခေါ်မှု</h2>
          </div>
          <p className="mt-4 text-base leading-7 text-amber-950">{chapter.challenge}</p>
        </section>

        <section className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5 sm:p-6" aria-labelledby="practice-heading">
          <div className="flex items-center gap-2 text-violet-950"><PlayCircle className="h-5 w-5" /><h2 id="practice-heading" className="!mb-0 !text-xl">လက်တွေ့လေ့ကျင့်မှု အဆင့်လိုက်</h2></div>
          <p className="mt-3 text-sm leading-6 text-slate-600">Challenge ကိုတစ်ခါတည်းမဖြေဘဲ အောက်ပါအစဉ်အတိုင်းလုပ်ဆောင်ပါက concept ကိုပိုမှတ်မိပါမည်။</p>
          <ol className="mt-4 space-y-3">{chapter.studyGuide.practiceSteps.map((step, index) => <li key={step} className="flex gap-3 rounded-xl bg-white/90 p-4 text-sm leading-6 text-slate-700 ring-1 ring-violet-100"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-700 text-xs font-extrabold text-white">{index + 1}</span><span>{step}</span></li>)}</ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="self-check-heading">
          <div className="flex items-center gap-2 text-slate-900">
            <ListChecks className="h-5 w-5 text-teal-700" />
            <h2 id="self-check-heading" className="!mb-0 !text-xl">ကိုယ်တိုင်စစ်ဆေးရန်</h2>
          </div>
          <div className="mt-4 space-y-3">
            {chapter.checklist.map((item) => (
              <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-1 text-sm leading-6 text-slate-700 hover:bg-slate-50">
                <input type="checkbox" checked={Boolean(checks[item])} onChange={(event) => setChecks((previous) => ({ ...previous, [item]: event.target.checked }))} className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-2xl bg-slate-950 p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div>
          <div className="flex items-center gap-2 text-teal-300"><CheckCircle2 className="h-5 w-5" /><span className="text-sm font-bold">သင်ခန်းစာပြီးစီးမှု</span></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{isAuthenticated ? "ဒီအခန်းကိုပြီးစီးဟုမှတ်လျှင် သင်၏account တွင်အမြဲသိမ်းဆည်းထားပါမည်။" : "ပြီးစီးမှုကိုသိမ်းဆည်းရန် မိမိaccount ဖြင့်ဝင်ရောက်ပါ။"}</p>
        </div>
        <button disabled={isSaving} onClick={onToggleCompletion} className={`mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition sm:mt-0 ${completed ? "bg-white text-slate-950 hover:bg-slate-100" : "bg-teal-400 text-slate-950 hover:bg-teal-300"} disabled:cursor-wait disabled:opacity-70`}>
          {completed ? <Check className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
          {isSaving ? "သိမ်းဆည်းနေသည်" : completed ? "ပြီးစီးထားပြီး" : "အခန်းပြီးစီးဟုမှတ်မည်"}
        </button>
      </div>
    </article>
  );
}
