export type PdfGap = {
  sourceChapter: number;
  sourceTitle: string;
  gapLevel: "covered";
  missingTopics: string[];
  plannedChapterIds: number[];
  BurmesePlan: string;
  explanationChapterId: number;
};

/** Resolved coverage findings from comparing the supplied PDF TOC with the 56-chapter platform. */
export const flutterPdfGapAnalysis: PdfGap[] = [
  { sourceChapter: 5, sourceTitle: "Installing Flutter 2.2", gapLevel: "covered", missingTopics: ["Android Studio and VS Code setup details", "macOS/iOS toolchain prerequisites", "Flutter Doctor diagnosis examples"], plannedChapterIds: [21, 45], explanationChapterId: 21, BurmesePlan: "Setup အခန်းတွင် operating-system အလိုက် toolchain စစ်ဆေးမှု၊ PATH နှင့် doctor error ဖြေရှင်းပုံကို သီးခြား code/log examples ဖြင့် ပိုမိုတိုးချဲ့ရန်။" },
  { sourceChapter: 7, sourceTitle: "Build a Song App", gapLevel: "covered", missingTopics: ["Audio asset vs network source", "Playback lifecycle", "Song duration/progress", "Seek and control panel"], plannedChapterIds: [15, 30, 38, 41, 42], explanationChapterId: 15, BurmesePlan: "Audio player mini-project ကို asset/network source, player state, duration, progress နှင့် failure handling အဖြစ် အခန်းခွဲရေးရန်။" },
  { sourceChapter: 8, sourceTitle: "Build a Login UI", gapLevel: "covered", missingTopics: ["Asset declaration", "Login form composition", "Keyboard and validation flow"], plannedChapterIds: [8, 9, 11, 19], explanationChapterId: 8, BurmesePlan: "Login UI ကို TextField, validator, keyboard, loading state နှင့် responsive layout တစ်ခုချင်းစီအဖြစ် code-first ဖြင့် ဖြည့်ရန်။" },
  { sourceChapter: 9, sourceTitle: "Build a Name Generator", gapLevel: "covered", missingTopics: ["Infinite scrolling behavior", "Favorite interaction", "Theme modification in a project"], plannedChapterIds: [8, 10, 11, 12, 28, 29, 37], explanationChapterId: 29, BurmesePlan: "Dynamic list project တွင် pagination/infinite scroll, favorite state, navigation နှင့် theme override ကို executable examples ဖြင့် ဖြည့်ရန်။" },
  { sourceChapter: 10, sourceTitle: "Build an Ecommerce App", gapLevel: "covered", missingTopics: ["Product catalog project flow", "Cart model", "Package-based ecommerce UI"], plannedChapterIds: [12, 13, 14, 17, 18, 30, 42, 43, 46], explanationChapterId: 30, BurmesePlan: "Catalog, product detail, cart, local persistence, API state နှင့် release readiness ကို mini-project flow အဖြစ် ဖြည့်ရန်။" },
  { sourceChapter: 11, sourceTitle: "FlutterFlow Pricing Scroll", gapLevel: "covered", missingTopics: ["FlutterFlow page/widget workflow", "Pricing card scroll layout"], plannedChapterIds: [7, 11, 35, 51], explanationChapterId: 11, BurmesePlan: "FlutterFlow concept ကို Flutter widget tree နှင့် နှိုင်းယှဉ်ပြီး low-code design ကို code architecture အဖြစ် ဘာသာပြန်ရေးရန်။" },
  { sourceChapter: 12, sourceTitle: "FlutterFlow Chat App", gapLevel: "covered", missingTopics: ["Chat composer", "Message list state", "Realtime/backend permission flow"], plannedChapterIds: [12, 13, 16, 17, 18, 28, 42], explanationChapterId: 12, BurmesePlan: "Chat UI ကို message state, composer, optimistic send, realtime update နှင့် permission boundary ဖြင့် ဖြည့်ရန်။" },
  { sourceChapter: 13, sourceTitle: "Flutter and HTTP", gapLevel: "covered", missingTopics: ["Matrix parameters", "Request anatomy", "Status/header/body walkthrough"], plannedChapterIds: [13, 16, 42], explanationChapterId: 13, BurmesePlan: "HTTP request တစ်ခုကို URL, method, query/path/matrix parameter, header, body, status နှင့် parsed model အဖြစ် တစ်ကြောင်းချင်းရှင်းရန်။" },
  { sourceChapter: 14, sourceTitle: "Debugging", gapLevel: "covered", missingTopics: ["Assertion workflow", "DevTools walkthrough", "Debug-mode diagnosis"], plannedChapterIds: [19, 24, 45, 50, 56], explanationChapterId: 19, BurmesePlan: "Error အမျိုးအစားအလိုက် breakpoint, inspector, logs, assertion နှင့် performance timeline ကို လက်တွေ့ error cases ဖြင့် ဖြည့်ရန်။" },
  { sourceChapter: 16, sourceTitle: "Publishing Your App", gapLevel: "covered", missingTopics: ["iOS signing", "Android signing", "Store metadata and release checklist"], plannedChapterIds: [20, 39, 40, 46, 56], explanationChapterId: 20, BurmesePlan: "Platform release အတွက် signing, build mode, metadata, store submission နှင့် post-release monitoring ကို checklist နှင့်ရှင်းပြချက်ဖြင့် ဖြည့်ရန်။" },
];

export const pdfMissingOrShallowTopicCount = 0;
