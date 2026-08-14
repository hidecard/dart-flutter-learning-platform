export type MicroLesson = {
  id: number;
  slug: string;
  sequence: number;
  moduleId: string;
  moduleTitle: string;
  partId: string;
  chapterId: number;
  title: string;
  level: "အစပြုသူ" | "အလယ်အလတ်" | "အဆင့်မြင့်" | "Production";
  prerequisites: string[];
  objective: string;
  whyItMatters: string;
  concept: string;
  syntax: string;
  example: string;
  lineByLine: string[];
  expectedOutput: string;
  commonMistakes: { mistake: string; fix: string }[];
  exercise: string;
};

type CurriculumModule = {
  id: string;
  title: string;
  level: MicroLesson["level"];
  focus: string;
  topics: string[];
};

const topicProgression = [
  "အဓိပ္ပာယ်နှင့် vocabulary", "ဘာကြောင့်လိုအပ်သလဲ", "ပထမဆုံး syntax", "အလုပ်လုပ်ပုံ", "type နှင့် data contract",
  "တစ်ကြောင်းချင်းဖတ်နည်း", "အခြေခံ code နမူနာ", "output ကိုစစ်နည်း", "မှားယွင်းမှုဖမ်းနည်း", "ပြင်ဆင်နည်း",
  "function နှင့်ချိတ်ဆက်ခြင်း", "input နှင့် output", "state ပြောင်းလဲမှု", "လက်တွေ့ project ထဲအသုံးပြုခြင်း", "refactor လုပ်နည်း",
  "test ရေးနည်း", "edge case စစ်နည်း", "performance အမြင်", "accessibility အမြင်", "security အမြင်",
  "debugging လေ့ကျင့်ခန်း", "ပြဿနာဖြေရှင်းခန်း", "mini-project အပိုင်း", "ကိုယ်တိုင်ပြောင်းစမ်းခြင်း", "ပြန်လည်သုံးသပ်ခြင်း",
];

const curriculumMappings = [
  { partId: "dart-fundamentals", chapterId: 1 }, { partId: "dart-fundamentals", chapterId: 2 }, { partId: "dart-fundamentals", chapterId: 3 }, { partId: "dart-fundamentals", chapterId: 4 }, { partId: "dart-fundamentals", chapterId: 5 },
  { partId: "flutter-ui", chapterId: 6 }, { partId: "flutter-ui", chapterId: 7 }, { partId: "flutter-ui", chapterId: 8 },
  { partId: "navigation-state", chapterId: 10 }, { partId: "navigation-state", chapterId: 11 },
  { partId: "data-backend", chapterId: 13 }, { partId: "data-backend", chapterId: 15 },
  { partId: "supabase-architecture", chapterId: 17 },
  { partId: "testing-deployment", chapterId: 19 }, { partId: "testing-deployment", chapterId: 20 },
  { partId: "step-by-step-foundations", chapterId: 21 }, { partId: "step-by-step-foundations", chapterId: 22 },
  { partId: "flutter-application-path", chapterId: 31 }, { partId: "flutter-application-path", chapterId: 32 }, { partId: "flutter-application-path", chapterId: 33 },
  { partId: "flutter-platform-engineering", chapterId: 47 }, { partId: "flutter-platform-engineering", chapterId: 48 }, { partId: "flutter-platform-engineering", chapterId: 49 },
];

const modules: CurriculumModule[] = [
  { id: "dart-orientation", title: "Dart နှင့် Programming အခြေခံမိတ်ဆက်", level: "အစပြုသူ", focus: "Dart ဆိုတာဘာလဲ၊ program ဘယ်လိုစတင်ပြီး source code က output ဖြစ်လာပုံ", topics: ["Dart language ဆိုတာဘာလဲ", "Programming ဆိုတာဘာလဲ", "Compiler နှင့် runtime", "main function", "print နှင့် console", "statement နှင့် expression", "comment ရေးနည်း", "identifier naming", "သင်ယူမှု workflow", "error message ဖတ်နည်း"] },
  { id: "dart-setup", title: "Dart SDK နှင့် Development Setup", level: "အစပြုသူ", focus: "Dart SDK, editor, terminal, PATH နှင့် ပထမဆုံး Dart project setup", topics: ["Dart SDK install", "dart --version", "PATH environment", "VS Code setup", "Android Studio အခြေခံ", "dart create", "pubspec.yaml", "dart run", "dart format", "dart analyze"] },
  { id: "dart-values", title: "Dart Variables, Types နှင့် Constants", level: "အစပြုသူ", focus: "var, explicit type, final, const, late နှင့် nullable data ကို အကြောင်းပြချက်ဖြင့်သုံးနည်း", topics: ["variable ကြေညာခြင်း", "var အလုပ်လုပ်ပုံ", "explicit type", "String", "int နှင့် double", "bool", "final", "const", "late", "dynamic နှင့် Object", "null", "nullable type", "non-nullable type", "? operator", "! operator", "?? operator", "??= operator", "type inference", "ကောင်းမွန်သော naming", "constant configuration"] },
  { id: "dart-collections", title: "Dart Collections နှင့် Data Transformation", level: "အစပြုသူ", focus: "List, Set, Map နှင့် collection methods ဖြင့် data ကိုဖတ်၊ပြင်၊ပြောင်းနည်း", topics: ["List ဖန်တီးခြင်း", "List index", "List add/remove", "List iteration", "Set နှင့် unique data", "Map key/value", "Map lookup", "where", "map", "reduce", "fold", "any နှင့် every", "firstWhere", "spread operator", "collection if", "collection for", "immutable collection", "sort", "grouping", "data transformation"] },
  { id: "dart-control", title: "Dart Functions နှင့် Control Flow", level: "အစပြုသူ", focus: "function contract, condition, loop, pattern နှင့် reusable logic", topics: ["function declaration", "return value", "optional positional parameter", "named parameter", "required parameter", "default value", "arrow function", "if else", "switch", "for loop", "for in", "while", "do while", "break", "continue", "guard clause", "ternary operator", "pattern matching", "records", "typedef"] },
  { id: "dart-oop", title: "Object-Oriented Dart နှင့် Model Design", level: "အစပြုသူ", focus: "class, constructor, encapsulation, inheritance, mixin နှင့် immutable model", topics: ["class ဆိုတာဘာလဲ", "field", "method", "constructor", "named constructor", "this", "private member", "getter", "setter", "static", "enum", "abstract class", "extends", "implements", "mixin", "factory constructor", "copyWith", "equality", "toString", "model validation"] },
  { id: "dart-errors", title: "Dart Errors, Exceptions နှင့် Testing Basics", level: "အလယ်အလတ်", focus: "error အမျိုးအစားများ၊ try/catch၊ validation နှင့် unit test အခြေခံ", topics: ["compile-time error", "runtime error", "logic error", "throw", "try catch", "finally", "custom exception", "ArgumentError", "StateError", "assert", "error message", "stack trace", "input validation", "boundary validation", "unit test", "expect", "test group", "edge case", "testable function", "refactor from error"] },
  { id: "dart-async", title: "Dart Async, Future နှင့် Stream", level: "အလယ်အလတ်", focus: "Future, async/await, event loop, Stream နှင့် cancellation စဉ်းစားပုံ", topics: ["synchronous flow", "asynchronous flow", "Future", "async function", "await", "Future.wait", "then and catchError", "timeout", "retry", "event loop", "microtask", "Stream", "listen", "StreamBuilder concept", "broadcast stream", "subscription", "cancel", "debounce", "throttle", "async error boundary"] },
  { id: "flutter-orientation", title: "Flutter ဆိုတာဘာလဲနှင့် Framework အခြေခံ", level: "အစပြုသူ", focus: "Flutter framework, Dart engine, widget tree, rendering နှင့် declarative UI", topics: ["Flutter ဆိုတာဘာလဲ", "framework နှင့် SDK", "Dart နှင့် Flutter ဆက်စပ်ပုံ", "widget ဆိုတာဘာလဲ", "widget tree", "declarative UI", "build method", "BuildContext", "MaterialApp", "CupertinoApp"] },
  { id: "flutter-setup", title: "Flutter SDK Setup နှင့် ပထမဆုံး Project", level: "အစပြုသူ", focus: "Flutter SDK install, flutter doctor, emulator/device, project create နှင့် run", topics: ["Flutter SDK install", "flutter --version", "flutter doctor", "Android toolchain", "iOS toolchain", "VS Code Flutter extension", "Android Studio plugin", "flutter create", "lib/main.dart", "pubspec.yaml", "flutter run", "hot reload", "hot restart", "device selection", "emulator", "physical device", "debug console", "flutter clean", "flutter pub get", "ပထမဆုံး screen"] },
  { id: "flutter-widgets", title: "Flutter Core Widgets တစ်ခုချင်းစီ", level: "အစပြုသူ", focus: "Text, Icon, Image, Container, Padding, Center, SizedBox နှင့် common widgets", topics: ["Text", "TextStyle", "Icon", "Image", "Asset image", "Network image", "Container", "Padding", "Margin", "Center", "Align", "SizedBox", "Card", "Divider", "DecoratedBox", "SafeArea", "Placeholder", "Visibility", "Expanded", "Flexible"] },
  { id: "flutter-layout", title: "Flutter Layout, Constraints နှင့် Responsive UI", level: "အစပြုသူ", focus: "Row, Column, Stack, constraints, flex နှင့် screen အရွယ်အစားအလိုက် layout", topics: ["constraints", "size", "parent data", "Row", "Column", "mainAxisAlignment", "crossAxisAlignment", "MainAxisSize", "Expanded", "Flexible", "Wrap", "Stack", "Positioned", "LayoutBuilder", "MediaQuery", "Orientation", "breakpoint", "responsive card", "overflow", "scrollable layout"] },
  { id: "flutter-input", title: "Flutter Input, Form နှင့် Button", level: "အစပြုသူ", focus: "TextField, TextFormField, Form, validator, button callback နှင့် keyboard flow", topics: ["TextField", "TextEditingController", "FocusNode", "obscureText", "keyboardType", "TextFormField", "Form", "GlobalKey", "validator", "onSaved", "FilledButton", "ElevatedButton", "OutlinedButton", "TextButton", "IconButton", "onPressed", "disabled state", "loading button", "submit flow", "form reset"] },
  { id: "flutter-navigation", title: "Flutter Navigation နှင့် Screen Flow", level: "အလယ်အလတ်", focus: "Navigator, routes, arguments, deep links နှင့် back stack", topics: ["Navigator", "push", "pop", "pushReplacement", "named route", "route arguments", "return result", "AppBar back", "Drawer navigation", "BottomNavigationBar", "TabBar", "nested navigation", "deep link", "unknown route", "route guard", "auth redirect", "navigation state", "URL strategy", "screen transition", "navigation test"] },
  { id: "flutter-state", title: "Flutter State နှင့် Lifecycle", level: "အလယ်အလတ်", focus: "StatefulWidget, setState, lifecycle, immutable UI state နှင့် state ownership", topics: ["StatelessWidget", "StatefulWidget", "State object", "initState", "build", "didUpdateWidget", "didChangeDependencies", "dispose", "setState", "mounted", "state ownership", "local state", "derived state", "loading state", "error state", "empty state", "form state", "selection state", "state lifting", "rebuild reasoning"] },
  { id: "flutter-architecture", title: "Flutter Architecture နှင့် State Management", level: "အလယ်အလတ်", focus: "feature folders, repository, controller, provider patterns နှင့် maintainable app structure", topics: ["separation of concerns", "feature-first folders", "presentation layer", "domain layer", "data layer", "repository", "service", "controller", "view model", "dependency injection", "InheritedWidget", "Provider concept", "Riverpod concept", "Bloc concept", "state notifier", "immutable state", "event action", "async state", "cache state", "architecture decision"] },
  { id: "flutter-data", title: "Flutter Data, HTTP နှင့် Persistence", level: "အလယ်အလတ်", focus: "JSON, REST, request anatomy, parsing, local storage နှင့် database boundaries", topics: ["JSON object", "jsonDecode", "jsonEncode", "model fromJson", "model toJson", "HTTP method", "URL", "headers", "body", "status code", "query parameter", "path parameter", "request error", "loading state", "pagination", "infinite scroll", "shared preferences concept", "SQLite concept", "secure storage concept", "offline cache"] },
  { id: "flutter-media", title: "Flutter Media, Animation နှင့် Interaction", level: "အလယ်အလတ်", focus: "assets, audio/video concepts, gesture, animation controller နှင့် accessible interaction", topics: ["asset declaration", "font asset", "audio source", "play pause", "duration", "position", "seek", "video surface", "GestureDetector", "InkWell", "drag", "swipe", "AnimationController", "Tween", "CurvedAnimation", "Hero", "AnimatedContainer", "implicit animation", "accessibility semantics", "reduced motion"] },
  { id: "flutter-platform", title: "Flutter Platform Integration", level: "အဆင့်မြင့်", focus: "Android/iOS permissions, platform channels, notifications, deep links နှင့် device APIs", topics: ["Android manifest", "iOS Info.plist", "runtime permission", "camera", "location", "contacts", "platform channel", "MethodChannel", "EventChannel", "native callback", "deep link", "push notification", "background task", "app lifecycle", "clipboard", "share sheet", "biometric auth", "file picker", "URL launcher", "platform testing"] },
  { id: "flutter-quality", title: "Flutter Testing, Debugging နှင့် Performance", level: "အဆင့်မြင့်", focus: "unit/widget/integration test, DevTools, profiling, memory နှင့် frame performance", topics: ["unit test", "widget test", "integration test", "test pump", "find text", "find widget", "mock repository", "golden test", "debug assertion", "breakpoint", "DevTools inspector", "logging", "network timeline", "frame rendering", "jank", "rebuild profiling", "memory leak", "image optimization", "list optimization", "performance budget"] },
  { id: "flutter-security", title: "Flutter Security, Accessibility နှင့် Localization", level: "အဆင့်မြင့်", focus: "secrets, auth boundary, input safety, semantics, Burmese localization နှင့် inclusive UI", topics: ["secret handling", "token storage", "auth boundary", "authorization", "input sanitization", "secure API", "TLS concept", "privacy", "Semantics", "screen reader", "contrast", "text scale", "keyboard navigation", "localization", "ARB", "Intl", "date format", "pluralization", "RTL concept", "accessibility audit"] },
  { id: "flutter-delivery", title: "Flutter Build, CI/CD နှင့် Store Release", level: "Production", focus: "flavors, signing, build modes, CI pipeline, store metadata နှင့် rollout", topics: ["debug/profile/release", "build flavor", "environment config", "Android signing", "app bundle", "iOS signing", "archive", "versioning", "build number", "CI basics", "GitHub Actions", "automated test", "artifact upload", "store listing", "privacy disclosure", "permissions review", "beta release", "staged rollout", "crash monitoring", "rollback plan"] },
  { id: "flutter-projects", title: "Flutter Project-Based Mastery", level: "Production", focus: "စာအုပ်ဖတ်ပြီးလိုက်လုပ်နိုင်သော project များဖြင့် concepts အားလုံးကို ပေါင်းစပ်ခြင်း", topics: ["counter app", "todo app", "notes app", "expense tracker", "weather app", "news reader", "name generator", "login app", "song player", "chat app", "ecommerce catalog", "cart flow", "booking app", "map app", "course app", "admin dashboard", "offline-first app", "multi-platform app", "capstone architecture", "production capstone"] },
];

const levelFor = (level: MicroLesson["level"], sequence: number): MicroLesson["level"] => {
  if (sequence <= 125) return "အစပြုသူ";
  if (sequence <= 325) return level === "အစပြုသူ" ? "အလယ်အလတ်" : level;
  return level === "အစပြုသူ" || level === "အလယ်အလတ်" ? "အဆင့်မြင့်" : level;
};

function makeMicroLesson(module: CurriculumModule, topic: string, progression: string, sequence: number, topicIndex: number, mapping: { partId: string; chapterId: number }): MicroLesson {
  const title = `${module.title}: ${topic} — ${progression}`;
  const safeSlug = `${sequence}-${module.id}-${topicIndex + 1}`;
  const variable = `lessonValue${sequence}`;
  const code = `void main() {\n  final ${variable} = '${topic}';\n  print(${variable});\n}`;
  return {
    id: sequence,
    slug: safeSlug,
    sequence,
    moduleId: module.id,
    moduleTitle: module.title,
    partId: mapping.partId,
    chapterId: mapping.chapterId,
    title,
    level: levelFor(module.level, sequence),
    prerequisites: sequence === 1 ? [] : [`lesson-${sequence - 1}`],
    objective: `ဒီ lesson ပြီးလျှင် “${topic}” ကို ${progression} အမြင်ဖြင့် မိမိစကားဖြင့်ရှင်းပြပြီး Dart/Flutter project ထဲတွင် စတင်အသုံးချနိုင်ရပါမည်။`,
    whyItMatters: `${module.focus} ကိုနားလည်ရန် “${topic}” သည်အရေးကြီးပါသည်။ Syntax ကိုအလွတ်ကျက်ခြင်းထက် မည်သည့်ပြဿနာကိုဖြေရှင်းသည်၊ မည်သည့်အချိန်တွင် state/data/UI ပြောင်းသည်နှင့် မှားလျှင်ဘယ်လိုရှာမည်ကို သင်ယူရပါမည်။`,
    concept: `“${topic}” ၏အဓိကအယူအဆမှာ concept ကို သီးခြားစဉ်းစားပြီး input → processing → output လမ်းကြောင်းကိုမြင်နိုင်ရန်ဖြစ်သည်။ ${progression} အဆင့်တွင် reader သည် code ကို တစ်ကြောင်းချင်းဖတ်၊ တန်ဖိုးကိုခန့်မှန်း၊ run ပြီး output နှင့်တိုက်စစ်ရပါမည်။`,
    syntax: `// ${topic}\nfinal value = ...;`,
    example: code,
    lineByLine: [
      `main() သည် program သို့မဟုတ် နမူနာ code စတင်အလုပ်လုပ်မည့်နေရာဖြစ်သည်။`,
      `${variable} သည် “${topic}” ကို စမ်းသပ်ရန် value တစ်ခုအဖြစ်သိမ်းထားသည်။`,
      `print() သည် value ကို console output အဖြစ်ပြပြီး မိမိခန့်မှန်းထားသည့် result နှင့်တိုက်စစ်နိုင်စေသည်။`,
    ],
    expectedOutput: topic,
    commonMistakes: [
      { mistake: `“${topic}” ကို အမည်သိရုံဖြင့် အလုပ်လုပ်ပုံမစစ်ခြင်း`, fix: "Code ကိုတိုက်ရိုက်ရိုက်၊ run၊ output မှတ်ပြီး value တစ်ခုကိုပြောင်းစမ်းပါ။" },
      { mistake: "အမှားဖြစ်သောအခါ error message မဖတ်ဘဲ code အားလုံးကိုတစ်ပြိုင်နက်ပြောင်းခြင်း", fix: "ပထမဆုံး error line, type, expected value နှင့် actual value ကိုခွဲဖတ်ပါ။" },
    ],
    exercise: `“${topic}” ကိုသုံးပြီး ကိုယ်ပိုင်နမူနာတစ်ခုရေးပါ။ မူရင်း code မှ value တစ်ခုကိုပြောင်း၊ output ကိုခန့်မှန်း၊ DartPad/terminal တွင် run ပြီး မိမိတွေ့ရှိချက်ကို စာကြောင်းသုံးကြောင်းရေးပါ။`,
  };
}

export const microLessons: MicroLesson[] = modules.flatMap((module, moduleIndex) =>
  topicProgression.map((progression, progressionIndex) => {
    const topicIndex = progressionIndex % module.topics.length;
    const topic = module.topics[topicIndex];
    const sequence = moduleIndex * topicProgression.length + progressionIndex + 1;
    return makeMicroLesson(module, topic, progression, sequence, topicIndex, curriculumMappings[moduleIndex]);
  }),
);

export const microLessonModules = modules;
export const microLessonCount = microLessons.length;

export function microLessonById(id: number): MicroLesson | undefined {
  return microLessons.find((lesson) => lesson.id === id);
}

export function searchMicroLessons(query: string): MicroLesson[] {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return [];
  return microLessons.filter((lesson) => [lesson.title, lesson.moduleTitle, lesson.objective, lesson.concept, lesson.exercise].join(" ").toLocaleLowerCase().includes(normalized));
}
