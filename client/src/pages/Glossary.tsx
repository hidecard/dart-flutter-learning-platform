import { glossaryTerms } from "@shared/courseCatalog";
import { ArrowLeft, BookOpenText, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

export default function Glossary() {
  const [query, setQuery] = useState("");
  const terms = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return glossaryTerms;
    return glossaryTerms.filter(({ term, definition }) => `${term} ${definition}`.toLocaleLowerCase().includes(normalized));
  }, [query]);

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 transition hover:text-teal-700"><ArrowLeft className="h-4 w-4" /> စာသင်ခန်းသို့ပြန်သွားမည်</Link>
          <div className="hidden items-center gap-2 text-sm font-bold text-teal-800 sm:flex"><BookOpenText className="h-4 w-4" /> ဝေါဟာရစာအုပ်</div>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-xs font-bold tracking-[0.16em] text-teal-700">DART & FLUTTER MASTERCLASS</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">အဓိက ဝေါဟာရများ</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">သင်ခန်းစာဖတ်နေစဉ်တွေ့ရမည့် Dart နှင့် Flutter အဓိကအခေါ်အဝေါ်များကို မြန်မြန်ပြန်လည်ရှာဖွေနိုင်ရန်စုစည်းထားပါသည်။</p>
        <label className="relative mt-8 block max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ဝေါဟာရ သို့မဟုတ်အဓိပ္ပာယ် ရှာရန်" className="h-13 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100" />
        </label>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {terms.map((item) => <article key={item.term} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-mono text-base font-bold text-teal-800">{item.term}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{item.definition}</p></article>)}
        </div>
        <section className="mt-14 border-t border-slate-200 pt-10">
          <p className="text-xs font-bold tracking-[0.16em] text-teal-700">ကိုးကားလေ့လာရန်</p>
          <h2 className="mt-3 text-2xl font-extrabold">တရားဝင်နည်းပညာအရင်းအမြစ်များ</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">ဒီသင်တန်းအတွင်းလေ့လာထားသောအကြောင်းအရာများကိုပိုမိုနက်ရှိုင်းစွာဆက်လက်ဖတ်ရှုရန်အတွက် အောက်ပါတရားဝင်စာတမ်းများကိုအသုံးပြုနိုင်ပါသည်။</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href="https://dart.dev/guides" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800">Dart လမ်းညွှန်စာတမ်း <span className="mt-1 block text-xs font-normal text-slate-500">Dart language နှင့် asynchronous programming ကိုလေ့လာရန်</span></a>
            <a href="https://docs.flutter.dev/" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800">Flutter လမ်းညွှန်စာတမ်း <span className="mt-1 block text-xs font-normal text-slate-500">Widget, architecture, testing နှင့် deployment အတွက်</span></a>
            <a href="https://supabase.com/docs/guides/getting-started/quickstarts/flutter" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800">Supabase Flutter လမ်းညွှန် <span className="mt-1 block text-xs font-normal text-slate-500">Authentication, database နှင့် storage ချိတ်ဆက်ရန်</span></a>
            <a href="https://docs.flutter.dev/testing" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 transition hover:border-teal-600 hover:text-teal-800">Flutter စမ်းသပ်ခြင်းလမ်းညွှန် <span className="mt-1 block text-xs font-normal text-slate-500">Unit, widget နှင့် integration test များအတွက်</span></a>
          </div>
        </section>
      </section>
    </main>
  );
}
