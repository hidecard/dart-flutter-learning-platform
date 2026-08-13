import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout, { type DashboardMenuItem } from "@/components/DashboardLayout";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { toEditableLessonContent, type EditableLessonContent } from "@shared/courseCatalog";
import { AlertTriangle, ArrowLeft, BookOpenCheck, ClipboardPenLine, Eye, FileText, GraduationCap, Plus, RotateCcw, Save, Search, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const adminMenu: DashboardMenuItem[] = [
  { icon: ClipboardPenLine, label: "သင်ခန်းစာတည်းဖြတ်ရန်", path: "/admin" },
  { icon: BookOpenCheck, label: "စာဖတ်သူမြင်ကွင်း", path: "/" },
];

function deepCopy(content: EditableLessonContent) {
  return JSON.parse(JSON.stringify(content)) as EditableLessonContent;
}

export default function AdminCms() {
  const { user, loading, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";
  const utils = trpc.useUtils();
  const catalogQuery = trpc.cms.catalog.useQuery(undefined, { enabled: isAdmin });
  const [selectedChapterId, setSelectedChapterId] = useState(1);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<EditableLessonContent | null>(null);

  const selectedLesson = useMemo(
    () => (catalogQuery.data ?? []).find((lesson) => lesson.id === selectedChapterId),
    [catalogQuery.data, selectedChapterId],
  );

  useEffect(() => {
    if (!catalogQuery.data?.length) return;
    const lesson = catalogQuery.data.find((item) => item.id === selectedChapterId) ?? catalogQuery.data[0];
    if (lesson) {
      setSelectedChapterId(lesson.id);
      setDraft(deepCopy(toEditableLessonContent(lesson)));
    }
  }, [catalogQuery.data, selectedChapterId]);

  const saveLesson = trpc.cms.saveLesson.useMutation({
    onSuccess: () => {
      utils.cms.catalog.invalidate();
      utils.course.catalog.invalidate();
      toast.success("သင်ခန်းစာအပြောင်းအလဲများကိုသိမ်းဆည်းပြီးပါပြီ။");
    },
    onError: (error) => toast.error(error.message || "သင်ခန်းစာကိုမသိမ်းဆည်းနိုင်သေးပါ။"),
  });
  const resetLesson = trpc.cms.resetLesson.useMutation({
    onSuccess: () => {
      utils.cms.catalog.invalidate();
      utils.course.catalog.invalidate();
      toast.success("မူလသင်ခန်းစာစာသားသို့ပြန်လည်ထားပြီးပါပြီ။");
    },
    onError: () => toast.error("မူလစာသားသို့မပြန်နိုင်သေးပါ။"),
  });

  const visibleLessons = (catalogQuery.data ?? []).filter((lesson) => {
    const term = query.trim().toLocaleLowerCase();
    return !term || `${lesson.id} ${lesson.title} ${lesson.partTitle}`.toLocaleLowerCase().includes(term);
  });

  function selectLesson(chapterId: number) {
    const lesson = (catalogQuery.data ?? []).find((item) => item.id === chapterId);
    if (!lesson) return;
    setSelectedChapterId(chapterId);
    setDraft(deepCopy(toEditableLessonContent(lesson)));
  }

  function updateDraft(patch: Partial<EditableLessonContent>) {
    setDraft((current) => (current ? { ...current, ...patch } : current));
  }

  function save() {
    if (!draft) return;
    saveLesson.mutate({ chapterId: selectedChapterId, content: draft });
  }

  if (loading) return <div className="min-h-screen bg-slate-50" />;
  if (!isAuthenticated) {
    return <AccessNotice title="CMS ကိုအသုံးပြုရန် ဝင်ရောက်ပါ" text="သင်ခန်းစာစာသားကိုပြင်ဆင်ရန် စီမံခန့်ခွဲသူ account ဖြင့်ဝင်ရောက်ထားရန်လိုပါသည်။" action="ဝင်ရောက်မည်" onAction={startLogin} />;
  }
  if (!isAdmin) {
    return <AccessNotice title="CMS အသုံးပြုခွင့်မရှိပါ" text="ဒီနေရာသည် administrator များအတွက်သာဖြစ်သည်။ စာဖတ်သူမြင်ကွင်းသို့ပြန်သွားပြီး သင်ခန်းစာများကိုဆက်လက်လေ့လာနိုင်ပါသည်။" action="စာဖတ်သူမြင်ကွင်းသို့ပြန်မည်" href="/" />;
  }

  return (
    <DashboardLayout menuItems={adminMenu} title="သင်ခန်းစာ CMS">
      <div className="mx-auto max-w-[1600px] px-2 pb-10 pt-2 sm:px-4">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-teal-700">ADMIN CMS</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">သင်ခန်းစာစာသား တည်းဖြတ်ရန်</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">ခေါင်းစဉ်၊ ရှင်းပြချက်၊ code, annotation, challenge နှင့် checklist များကိုပြင်ပြီး သိမ်းဆည်းလိုက်သည်နှင့်စာဖတ်သူများမြင်ရမည့်သင်ခန်းစာတွင်အသစ်ပြောင်းလဲသွားပါမည်။</p>
          </div>
          <a href={`/?chapter=${selectedChapterId}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800"><Eye className="h-4 w-4" /> ရွေးထားသောအခန်းကိုကြည့်မည်</a>
        </div>

        <div className="grid gap-5 xl:grid-cols-[310px_minmax(0,1fr)_300px]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm xl:sticky xl:top-6 xl:h-[calc(100vh-7rem)]">
            <label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="အခန်းရှာရန်" className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" /></label>
            <div className="mt-3 max-h-[58vh] space-y-1 overflow-y-auto xl:max-h-[calc(100vh-12rem)]">
              {visibleLessons.map((lesson) => <button key={lesson.id} onClick={() => selectLesson(lesson.id)} className={`w-full rounded-xl px-3 py-3 text-left transition ${lesson.id === selectedChapterId ? "bg-slate-950 text-white" : "hover:bg-slate-50"}`}><p className={`text-[11px] font-bold ${lesson.id === selectedChapterId ? "text-teal-300" : "text-teal-700"}`}>{lesson.partTitle} · အခန်း {lesson.id}</p><p className="mt-1 text-sm font-bold leading-5">{lesson.title}</p></button>)}
            </div>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            {catalogQuery.isLoading || !draft || !selectedLesson ? <div className="py-20 text-center text-sm text-slate-500">သင်ခန်းစာကိုဖွင့်နေသည်…</div> : <LessonEditor draft={draft} onChange={updateDraft} />}
          </section>

          <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/10"><div className="flex items-center gap-2 text-teal-300"><ShieldCheck className="h-5 w-5" /><p className="text-sm font-bold">လုံခြုံသောပြင်ဆင်မှု</p></div><p className="mt-3 text-sm leading-7 text-slate-300">Administrator role ရှိသူသာသင်ခန်းစာအကြောင်းအရာကိုserver-side permission ဖြင့်သိမ်းဆည်းနိုင်ပါသည်။</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-bold text-slate-900">လက်ရှိအခန်း</p><p className="mt-2 text-sm leading-6 text-slate-600">အခန်း {selectedChapterId} — {selectedLesson?.title}</p><div className="mt-5 space-y-3"><button disabled={saveLesson.isPending || !draft} onClick={save} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 disabled:opacity-60"><Save className="h-4 w-4" />{saveLesson.isPending ? "သိမ်းဆည်းနေသည်" : "အပြောင်းအလဲများသိမ်းမည်"}</button><a href={`/?chapter=${selectedChapterId}`} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800 transition hover:border-teal-500"><Eye className="h-4 w-4" /> သိမ်းထားသောအခန်းကို Preview ကြည့်မည်</a><button disabled={resetLesson.isPending} onClick={() => { if (window.confirm("ဒီအခန်းကိုမူလစာသားသို့ပြန်ထားမည်လား။ လက်ရှိပြင်ဆင်မှုများပျောက်သွားပါမည်။")) resetLesson.mutate({ chapterId: selectedChapterId }); }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-rose-300 hover:text-rose-700 disabled:opacity-60"><RotateCcw className="h-4 w-4" /> မူလစာသားသို့ပြန်မည်</button></div></div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

function LessonEditor({ draft, onChange }: { draft: EditableLessonContent; onChange: (patch: Partial<EditableLessonContent>) => void }) {
  function updateSection(index: number, patch: Partial<EditableLessonContent["sections"][number]>) {
    onChange({ sections: draft.sections.map((section, itemIndex) => itemIndex === index ? { ...section, ...patch } : section) });
  }
  function updateAnnotation(index: number, patch: Partial<EditableLessonContent["code"]["annotations"][number]>) {
    onChange({ code: { ...draft.code, annotations: draft.code.annotations.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item) } });
  }

  return <div className="space-y-8">
    <EditorTitle icon={<FileText className="h-5 w-5" />} title="အခြေခံအချက်အလက်" detail="စာဖတ်သူမြင်ရမည့်အခန်း၏မိတ်ဆက်အချက်အလက်များ" />
    <div className="grid gap-5 sm:grid-cols-2"><Field label="အခန်းခေါင်းစဉ်" value={draft.title} onChange={(value) => onChange({ title: value })} className="sm:col-span-2" /><Field label="ကြာချိန်" value={draft.duration} onChange={(value) => onChange({ duration: value })} /><Field label="သင်ယူမှုအဆင့်" value={draft.level} onChange={(value) => onChange({ level: value })} /><TextField label="အကျဉ်းချုပ်" value={draft.summary} onChange={(value) => onChange({ summary: value })} className="sm:col-span-2" rows={3} /><Field label="Topics (ကော်မာဖြင့်ခွဲပါ)" value={draft.topics.join(", ")} onChange={(value) => onChange({ topics: value.split(",").map((item) => item.trim()).filter(Boolean) })} className="sm:col-span-2" /></div>

    <div className="border-t border-slate-200 pt-8"><EditorTitle icon={<GraduationCap className="h-5 w-5" />} title="ရှင်းပြချက်အပိုင်းများ" detail="Heading နှင့်paragraph များကိုစာဖတ်သူနားလည်လွယ်အောင်ရေးပါ" />{draft.sections.map((section, index) => <div key={`${section.heading}-${index}`} className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4"><div className="flex items-center justify-between gap-3"><p className="text-xs font-bold text-teal-700">အပိုင်း {index + 1}</p>{draft.sections.length > 1 ? <button onClick={() => onChange({ sections: draft.sections.filter((_, itemIndex) => itemIndex !== index) })} className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="အပိုင်းဖျက်ရန်"><Trash2 className="h-4 w-4" /></button> : null}</div><div className="mt-3 space-y-3"><Field label="Heading" value={section.heading} onChange={(value) => updateSection(index, { heading: value })} /><TextField label="Paragraphs (အပိုဒ်ခွဲလိုလျှင်လိုင်းဗလာတစ်လိုင်းထားပါ)" value={section.paragraphs.join("\n\n")} onChange={(value) => updateSection(index, { paragraphs: value.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean) })} rows={7} /></div></div>)}<button onClick={() => onChange({ sections: [...draft.sections, { heading: "အပိုင်းခေါင်းစဉ်အသစ်", paragraphs: ["ရှင်းပြချက်ကိုဤနေရာတွင်ရေးပါ။"] }] })} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-teal-500 px-3 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50"><Plus className="h-4 w-4" /> ရှင်းပြချက်အပိုင်းထပ်ထည့်မည်</button></div>

    <div className="border-t border-slate-200 pt-8"><EditorTitle icon={<ClipboardPenLine className="h-5 w-5" />} title="Code နှင့် မှတ်ချက်များ" detail="Code lab နှင့်စာကြောင်းအလိုက်ရှင်းလင်းချက်များ" /><div className="mt-5 grid gap-5"><Field label="Code language" value={draft.code.language} onChange={(value) => onChange({ code: { ...draft.code, language: value } })} /><TextField label="Code" value={draft.code.code} onChange={(value) => onChange({ code: { ...draft.code, code: value } })} rows={12} mono />{draft.code.annotations.map((annotation, index) => <div key={`${annotation.label}-${index}`} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[180px_1fr_auto]"><Field label="Label" value={annotation.label} onChange={(value) => updateAnnotation(index, { label: value })} /><TextField label="ရှင်းလင်းချက်" value={annotation.detail} onChange={(value) => updateAnnotation(index, { detail: value })} rows={2} /><button onClick={() => onChange({ code: { ...draft.code, annotations: draft.code.annotations.filter((_, itemIndex) => itemIndex !== index) } })} className="self-end rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="မှတ်ချက်ဖျက်ရန်"><Trash2 className="h-4 w-4" /></button></div>)}<button onClick={() => onChange({ code: { ...draft.code, annotations: [...draft.code.annotations, { label: "မှတ်ချက်", detail: "Code ရှင်းလင်းချက်ကိုဤနေရာတွင်ရေးပါ။" }] } })} className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-teal-500 px-3 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50"><Plus className="h-4 w-4" /> Code မှတ်ချက်ထပ်ထည့်မည်</button></div></div>

    <div className="border-t border-slate-200 pt-8"><EditorTitle icon={<BookOpenCheck className="h-5 w-5" />} title="လက်တွေ့လေ့ကျင့်မှု" detail="စိန်ခေါ်မှုနှင့်ကိုယ်တိုင်စစ်ဆေးရန်အချက်များ" /><div className="mt-5 space-y-5"><TextField label="လက်တွေ့စိန်ခေါ်မှု" value={draft.challenge} onChange={(value) => onChange({ challenge: value })} rows={4} /><TextField label="Self-check checklist (တစ်လိုင်းလျှင်တစ်ချက်)" value={draft.checklist.join("\n")} onChange={(value) => onChange({ checklist: value.split("\n").map((item) => item.trim()).filter(Boolean) })} rows={5} /></div></div>
  </div>;
}

function EditorTitle({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) { return <div className="flex gap-3"><span className="mt-0.5 text-teal-700">{icon}</span><div><h2 className="text-lg font-extrabold text-slate-900">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{detail}</p></div></div>; }
function Field({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (value: string) => void; className?: string }) { return <label className={`block ${className}`}><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100" /></label>; }
function TextField({ label, value, onChange, rows, mono = false, className = "" }: { label: string; value: string; onChange: (value: string) => void; rows: number; mono?: boolean; className?: string }) { return <label className={`block ${className}`}><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-7 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100 ${mono ? "font-mono" : ""}`} /></label>; }
function AccessNotice({ title, text, action, onAction, href }: { title: string; text: string; action: string; onAction?: () => void; href?: string }) { return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5"><div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-950/5"><AlertTriangle className="mx-auto h-9 w-9 text-amber-600" /><h1 className="mt-5 text-2xl font-extrabold text-slate-950">{title}</h1><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>{href ? <Link href={href} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white"><ArrowLeft className="h-4 w-4" />{action}</Link> : <button onClick={onAction} className="mt-6 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">{action}</button>}</div></main>; }
