import { trpc } from "@/lib/trpc";
import { BookOpen, KeyRound, Loader2, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

function redirectTarget() {
  const target = new URLSearchParams(window.location.search).get("redirect");
  return target?.startsWith("/") ? target : "/";
}

export default function SignIn() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const utils = trpc.useUtils();
  const destination = useMemo(redirectTarget, []);
  const complete = async (user: unknown) => {
    utils.auth.me.setData(undefined, user as never);
    await utils.auth.me.invalidate();
    window.location.assign(destination);
  };
  const signIn = trpc.auth.signIn.useMutation({ onSuccess: complete, onError: (error) => toast.error(error.message) });
  const signUp = trpc.auth.signUp.useMutation({ onSuccess: complete, onError: (error) => toast.error(error.message) });
  const submitting = signIn.isPending || signUp.isPending;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (mode === "signup") {
      if (password.length < 10) { toast.error("စကားဝှက်သည် အနည်းဆုံးစာလုံး ၁၀ လုံးရှိရပါမည်။"); return; }
      signUp.mutate({ name: name || undefined, email, password });
    } else {
      signIn.mutate({ email, password });
    }
  }

  return <main className="min-h-screen bg-[#f7f8f6] px-5 py-10 text-slate-950 sm:py-16"><div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 lg:grid-cols-[.9fr_1.1fr]"><section className="bg-slate-950 p-8 text-white sm:p-12"><Link href="/" className="inline-flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400 text-slate-950"><BookOpen className="h-5 w-5" /></span><span className="text-sm font-bold">Dart & Flutter<br />Masterclass</span></Link><div className="mt-16"><p className="text-xs font-bold tracking-[.16em] text-teal-300">TURSO-ONLY ACCOUNT</p><h1 className="mt-4 text-3xl font-extrabold leading-tight">သင်ယူမှု progress ကို<br />မိမိ account ဖြင့်သိမ်းပါ</h1><p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">စကားဝှက်ကို Turso database တွင် scrypt hash အဖြစ်သာသိမ်းဆည်းထားပြီး၊ session သည် browser cookie နှင့် Turso တွင်သာစီမံထားပါသည်။</p></div><div className="mt-12 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />Manus OAuth မသုံးဘဲ local account ဖြင့်ဝင်ရောက်နိုင်ပါသည်။</div></section><section className="p-8 sm:p-12"><div className="flex rounded-xl bg-slate-100 p-1"><button onClick={() => setMode("signin")} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${mode === "signin" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>ဝင်ရောက်မည်</button><button onClick={() => setMode("signup")} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${mode === "signup" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>Account ဖွင့်မည်</button></div><div className="mt-8"><h2 className="text-2xl font-extrabold">{mode === "signin" ? "ပြန်လည်ကြိုဆိုပါသည်" : "သင်ယူသူ account ဖွင့်မည်"}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{mode === "signin" ? "အီးမေးလ်နှင့်စကားဝှက်ဖြင့်ဝင်ရောက်ပါ။" : "ပထမဆုံး local account ကို admin အဖြစ်ဖွင့်ပေးပါမည်။"}</p></div><form onSubmit={submit} className="mt-8 space-y-5">{mode === "signup" ? <label className="block"><span className="mb-2 block text-xs font-bold text-slate-700">အမည် (မဖြည့်လည်းရပါသည်)</span><div className="relative"><UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={name} onChange={(event) => setName(event.target.value)} className="h-12 w-full rounded-xl border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder="သင်၏အမည်" /></div></label> : null}<label className="block"><span className="mb-2 block text-xs font-bold text-slate-700">အီးမေးလ်</span><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 w-full rounded-xl border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder="name@example.com" /></div></label><label className="block"><span className="mb-2 block text-xs font-bold text-slate-700">စကားဝှက်</span><div className="relative"><KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 w-full rounded-xl border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100" placeholder={mode === "signup" ? "အနည်းဆုံးစာလုံး ၁၀ လုံး" : "စကားဝှက်"} /></div></label><button disabled={submitting} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 text-sm font-bold text-white transition hover:bg-teal-800 disabled:opacity-60">{submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}{mode === "signin" ? "ဝင်ရောက်မည်" : "Account ဖွင့်ပြီး စတင်မည်"}</button></form><Link href="/" className="mt-6 block text-center text-sm font-semibold text-slate-500 hover:text-teal-700">စာသင်ခန်းသို့ပြန်သွားမည်</Link></section></div></main>;
}
