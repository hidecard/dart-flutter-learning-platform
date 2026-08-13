import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Award, BookOpen, CheckCircle2, LockKeyhole, Printer, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

function formatIssuedAt(value: Date | string) {
  return new Intl.DateTimeFormat("my-MM", { dateStyle: "long" }).format(new Date(value));
}

export default function Certificate() {
  const { user, isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();
  const statusQuery = trpc.certificate.status.useQuery(undefined, { enabled: isAuthenticated });
  const issueCertificate = trpc.certificate.issue.useMutation({
    onSuccess: () => {
      utils.certificate.status.invalidate();
      toast.success("Certificate ကိုထုတ်ပေးပြီးပါပြီ။ Print/Save PDF လုပ်နိုင်ပါသည်။");
    },
    onError: () => toast.error("Certificate ထုတ်ပေးရန်မဖြစ်သေးပါ။ ပြီးစီးမှုကိုစစ်ပြီး ထပ်စမ်းပါ။"),
  });

  if (loading) return <main className="grid min-h-screen place-items-center bg-[#f7f8f6] text-sm text-slate-500">အကောင့်အခြေအနေစစ်ဆေးနေသည်…</main>;

  if (!isAuthenticated) {
    return <main className="grid min-h-screen place-items-center bg-[#f7f8f6] p-5"><section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-950/5"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-teal-300"><LockKeyhole className="h-6 w-6" /></span><h1 className="mt-5 text-2xl font-extrabold text-slate-950">Certificate ကြည့်ရန်ဝင်ရောက်ပါ</h1><p className="mt-3 text-sm leading-7 text-slate-600">ပြီးစီးမှုနှင့်certificate record များကို မိမိ Turso-backed account နှင့်သာချိတ်ဆက်ထားပါသည်။</p><Link href="/signin?redirect=%2Fcertificate" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white hover:bg-teal-800">ဝင်ရောက်မည်</Link></section></main>;
  }

  const status = statusQuery.data;
  const certificate = status?.certificate;
  const percentage = status?.percentage ?? 0;

  return <main className="min-h-screen bg-[#f7f8f6] px-4 py-8 sm:px-8 sm:py-12"><style>{`@media print { body { background: white !important; } .no-print { display: none !important; } .certificate-sheet { box-shadow: none !important; border-color: #0f172a !important; margin: 0 !important; max-width: none !important; } }`}</style><div className="no-print mx-auto mb-7 flex max-w-5xl items-center justify-between gap-4"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-teal-700"><BookOpen className="h-4 w-4" /> သင်ခန်းစာသို့ပြန်မည်</Link>{certificate ? <button onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800"><Printer className="h-4 w-4" /> Print / Save PDF</button> : null}</div>

    <section className="certificate-sheet mx-auto max-w-5xl overflow-hidden rounded-[2rem] border-2 border-slate-900 bg-white shadow-2xl shadow-slate-950/10">
      <div className="border-b border-teal-100 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 px-7 py-8 text-white sm:px-12 sm:py-11"><div className="flex items-start justify-between gap-5"><div><p className="text-xs font-extrabold tracking-[0.18em] text-teal-200">DART & FLUTTER MASTERCLASS</p><h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">သင်ယူမှုပြီးစီးလက်မှတ်</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">Dart နှင့် Flutter ကိုမြန်မာဘာသာဖြင့်နက်နက်ရှိုင်းရှိုင်းလေ့လာပြီးသောlearner များအတွက် ထုတ်ပေးသည့်digital certificate ဖြစ်ပါသည်။</p></div><Award className="h-12 w-12 shrink-0 text-amber-300 sm:h-16 sm:w-16" /></div></div>

      <div className="p-7 sm:p-12">
        {statusQuery.isLoading ? <p className="text-sm text-slate-500">ပြီးစီးမှုကိုစစ်ဆေးနေသည်…</p> : certificate ? <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">This certifies that</p><h2 className="mt-5 font-serif text-4xl font-bold text-slate-950 sm:text-6xl">{certificate.recipientName}</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600">သည် <strong className="text-slate-900">{certificate.totalChapters} ခန်း</strong> ပါဝင်သော Dart & Flutter Masterclass ကို အောင်မြင်စွာပြီးစီးခဲ့ကြောင်း အတည်ပြုပါသည်။</p><div className="mx-auto mt-10 grid max-w-2xl gap-4 border-y border-slate-200 py-6 text-left sm:grid-cols-3"><div><p className="text-xs font-bold text-slate-400">ISSUED ON</p><p className="mt-2 text-sm font-bold text-slate-800">{formatIssuedAt(certificate.issuedAt)}</p></div><div><p className="text-xs font-bold text-slate-400">COURSE</p><p className="mt-2 text-sm font-bold text-slate-800">{certificate.courseVersion}</p></div><div><p className="text-xs font-bold text-slate-400">CERTIFICATE NO.</p><p className="mt-2 font-mono text-xs font-bold text-slate-800">{certificate.certificateCode}</p></div></div><div className="mt-9 flex items-center justify-center gap-2 text-sm font-bold text-teal-800"><CheckCircle2 className="h-5 w-5" /> ပြီးစီးမှုကို Turso database record ဖြင့်အတည်ပြုထားပါသည်</div></div> : <div><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700"><Sparkles className="h-6 w-6" /></span><div><h2 className="text-2xl font-extrabold text-slate-950">Certificate ရယူရန်ပြီးစီးမှု</h2><p className="mt-1 text-sm text-slate-600">အခန်းအားလုံးကိုမိမိအကောင့်ဖြင့်ပြီးစီးဟုမှတ်ပြီးမှသာ ထုတ်ပေးနိုင်ပါသည်။</p></div></div><div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold text-slate-900">သင်ယူမှုပြီးစီးမှု</p><p className="mt-1 text-sm text-slate-500">{status?.completedChapters ?? 0} / {status?.totalChapters ?? 56} အခန်း</p></div><strong className="text-3xl font-extrabold text-teal-700">{percentage}%</strong></div><div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${percentage}%` }} /></div></div>{status?.eligible ? <button disabled={issueCertificate.isPending} onClick={() => issueCertificate.mutate()} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-wait disabled:opacity-70"><Award className="h-5 w-5" /> {issueCertificate.isPending ? "Certificate ထုတ်နေသည်…" : "Certificate ထုတ်မည်"}</button> : <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">Certificate ထုတ်ရန်ကျန်ရှိသေးသောအခန်းများကိုပြီးစီးဟုမှတ်ပါ။ စာအုပ်တစ်အုပ်လုံးကိုနားလည်စွာဖတ်ပြီးမှအတည်ပြုရန်ရည်ရွယ်ထားပါသည်။</p>}</div>}
      </div>
    </section>
  </main>;
}
