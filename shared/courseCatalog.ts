import { fallbackStudyGuide, lessonStudyGuides, type StudyGuide } from "./lessonStudyGuides";

export type CodeExample = {
  language: string;
  code: string;
  annotations: { label: string; detail: string }[];
};

export type LessonSection = {
  heading: string;
  paragraphs: string[];
};

export type GuidedStep = {
  label: string;
  title: string;
  instruction: string;
  expected: string;
};

export type Chapter = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  duration: string;
  level: string;
  topics: string[];
  sections: LessonSection[];
  guidedSteps: GuidedStep[];
  code: CodeExample;
  studyGuide: StudyGuide;
  challenge: string;
  checklist: string[];
};

export type EditableLessonContent = Pick<
  Chapter,
  "title" | "summary" | "duration" | "level" | "topics" | "sections" | "code" | "challenge" | "checklist"
>;

export type CoursePart = {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
};

function createGuidedSteps(title: string, summary: string, firstHeading: string, first: string, secondHeading: string, second: string): GuidedStep[] {
  return [
    { label: "STEP 1", title: "ဘာကိုလေ့လာမလဲ", instruction: summary, expected: `“${title}” အခန်း၏ရည်ရွယ်ချက်ကိုမိမိစကားဖြင့်တစ်ကြောင်းရှင်းပြနိုင်ပါသည်။` },
    { label: "STEP 2", title: firstHeading, instruction: first, expected: "Concept အသစ်သည်မည်သည့်ပြဿနာကိုဖြေရှင်းပေးသည်ကိုသိလာပါသည်။" },
    { label: "STEP 3", title: "နမူနာ Code ကိုရေးပါ", instruction: "အောက်ရှိ code ကိုကိုယ်တိုင်ရိုက်ထည့်ပြီး run လုပ်ပါ။ ကူးထည့်ရုံမလုပ်ဘဲ bracket, semicolon နှင့် variable name တစ်ခုချင်းကိုကြည့်ပါ။", expected: "Code သည်error မရှိဘဲ run ပြီး မျှော်လင့်ထားသောresult ကိုမြင်ရပါမည်။" },
    { label: "STEP 4", title: secondHeading, instruction: second, expected: "Code ထဲရှိ အရေးကြီးသောline တစ်ကြောင်းကိုဘာကြောင့်ရေးထားသည်ဟုရှင်းပြနိုင်ပါသည်။" },
    { label: "STEP 5", title: "ကိုယ်တိုင်ပြောင်းစမ်းပါ", instruction: "Variable value၊ text သို့မဟုတ် condition တစ်ခုကိုပြောင်းပြီး result ကွာခြားပုံကိုမှတ်စုရေးပါ။", expected: "မူရင်းနမူနာနှင့်ကိုယ်ပြင်ထားသောresult ကွာခြားချက်ကိုရှင်းပြနိုင်ပါသည်။" },
  ];
}

const lesson = (
  id: number,
  slug: string,
  title: string,
  summary: string,
  duration: string,
  topics: string[],
  firstHeading: string,
  first: string,
  secondHeading: string,
  second: string,
  code: string,
  annotations: { label: string; detail: string }[],
  challenge: string,
  checklist: string[],
): Chapter => ({
  id,
  slug,
  title,
  summary,
  duration,
  level: id <= 5 ? "အစပြုသူ" : id <= 16 ? "လက်တွေ့တည်ဆောက်သူ" : "Production အဆင့်",
  topics,
  guidedSteps: createGuidedSteps(title, summary, firstHeading, first, secondHeading, second),
  sections: [
    {
      heading: firstHeading,
      paragraphs: [
        first,
        "ဒီအခန်းကိုဖတ်ရာတွင် syntax ကိုသာအလွတ်ကျက်ရန်မလိုပါ။ တန်ဖိုးတစ်ခုဘယ်ကလာသည်၊ ဘယ်အချိန်ပြောင်းသည်၊ မမှန်လျှင်ဘယ်နေရာတွင်တားမည်ကိုဆက်တိုက်စဉ်းစားပါ။ ဒီအလေ့အကျင့်က နောက်ပိုင်း project ကြီးများတွင် error ရှာရာ၌အထောက်အကူဖြစ်စေပါမည်။",
      ],
    },
    {
      heading: secondHeading,
      paragraphs: [
        second,
        "စာဖတ်သူအနေဖြင့် code ကိုတစ်ခါ run ပြီး output ကိုကြည့်ပါ။ ထို့နောက် variable အမည်တစ်ခု သို့မဟုတ် condition တစ်ခုကိုပြောင်းကြည့်ပါ။ အပြောင်းအလဲရလဒ်ကိုရေးမှတ်ခြင်းက concept ကိုရှင်းလင်းစွာနားလည်စေသောအကောင်းဆုံးနည်းတစ်ခုဖြစ်သည်။",
      ],
    },
  ],
  code: { language: "dart", code, annotations },
  studyGuide: lessonStudyGuides[id] ?? fallbackStudyGuide,
  challenge,
  checklist,
});

export const courseParts: CoursePart[] = [
  {
    id: "dart-fundamentals",
    title: "Dart အခြေခံအယူအဆများ",
    description: "Program စတင်ပုံမှ asynchronous code အထိ Dart ကိုအခြေခံခိုင်မာစွာတည်ဆောက်မည့်အပိုင်း။",
    chapters: [
      lesson(1, "dart-flutter-introduction", "Dart နှင့် Flutter ကိုမိတ်ဆက်ခြင်း", "Dart language နှင့် Flutter framework တို့အတူအလုပ်လုပ်ပုံကိုစတင်နားလည်ပါ။", "၁၈ မိနစ်", ["Dart", "Flutter", "main", "SDK"], "Dart ကဘာလုပ်ပေးသလဲ", "Dart သည် Flutter application ၏ logic, state နှင့် data flow ကိုရေးသားရာတွင်သုံးသော programming language ဖြစ်သည်။ Flutter ကအဲဒီ Dart code ကိုအသုံးပြုပြီး screen ပေါ်ရှိ user interface ကိုဖန်တီးပေးသည်။", "ပထမဆုံး program ကိုrun မယ်", "Program တစ်ခုအတွက် main function သည်စတင်ရာတံခါးပေါက်ဖြစ်သည်။ Statement များကိုအပေါ်မှအောက်သို့လုပ်ဆောင်သွားမည်။", "void main() {\n  const courseName = 'Dart နှင့် Flutter Masterclass';\n  print('$courseName ကိုစတင်နေပါသည်');\n}", [{ label: "main", detail: "Dart program စတင်လုပ်ဆောင်သည့် function ဖြစ်သည်။" }, { label: "const", detail: "ပြောင်းလဲရန်မလိုသော compile-time တန်ဖိုးအတွက်သုံးသည်။" }], "Console တွင် မိမိအမည်နှင့် သင်ယူမည့် course အမည်ကိုပြသသော program တစ်ခုရေးပါ။", ["main function ပါဝင်သည်", "const နှင့် var ကွာခြားချက်ကိုပြောနိုင်သည်", "console output ကိုမြင်ခဲ့သည်"]),
      lesson(2, "variables-null-safety", "Variables, Types နှင့် Null Safety", "var, final, const, late နှင့် nullable type များကို data contract အဖြစ်အသုံးပြုပါ။", "၃၂ မိနစ်", ["var", "final", "const", "late", "null safety"], "Variable သည်ဘယ်လိုကတိပေးသလဲ", "Variable declaration တစ်ခုကတန်ဖိုးတစ်ခုရှိသည်ဟုသာမဟုတ်ဘဲ ပြောင်းနိုင်ခြင်း၊ မရှိနိုင်ခြင်းနှင့် type မျိုးကိုပါ compiler သို့ပြောပြနေခြင်းဖြစ်သည်။", "Null ကိုလုံခြုံစွာကိုင်တွယ်မယ်", "Value မရှိခြင်းကပုံမှန် state ဖြစ်နိုင်လျှင် nullable type ကိုသုံးပါ။ မရှိနိုင်သည့်တန်ဖိုးကို ! ဖြင့်အတင်းဖွင့်ခြင်းမပြုမီ အမှန်တကယ်ရှိကြောင်းသေချာပါစေ။", "class Profile {\n  Profile(this.userId);\n\n  final String userId;\n  late final String displayName;\n  String? avatarUrl;\n}\n\nvoid main() {\n  final profile = Profile('u-101');\n  profile.displayName = 'မောင်မောင်';\n  print(profile.avatarUrl ?? 'ပုံမရှိသေးပါ');\n}", [{ label: "final", detail: "reference ကိုတစ်ကြိမ်သာသတ်မှတ်နိုင်သည်။" }, { label: "late final", detail: "နောက်မှတစ်ကြိမ်သတ်မှတ်မည်ဟုကတိပေးသည်။" }, { label: "??", detail: "null ဖြစ်လျှင် fallback တန်ဖိုးပေးသည်။" }], "User profile တစ်ခုတွင် အမည်မဖြစ်မနေပါပြီး ဖုန်းနံပါတ်မရှိနိုင်သော class တစ်ခုရေးပါ။", ["nullable type ကိုသုံးနိုင်သည်", "late ကိုဘယ်အခါသုံးရမလဲသိသည်", "?? fallback ကိုစမ်းခဲ့သည်"]),
      lesson(3, "functions-control-flow", "Functions နှင့် Control Flow", "Function input/output contract, condition နှင့် loop တို့ဖြင့် logic ကိုရှင်းလင်းအောင်ရေးပါ။", "၃၀ မိနစ်", ["functions", "if", "switch", "loop", "records"], "Function ကဘာကိုကာကွယ်ပေးသလဲ", "Function တစ်ခုတွင် input, အလုပ်လုပ်ပုံနှင့် output ကိုခွဲထားခြင်းက code ကိုပြန်သုံးရလွယ်စေပြီး စမ်းသပ်ရလွယ်စေသည်။", "Validation ကိုအစောကတည်းကလုပ်မယ်", "Invalid input ကို database သို့မရောက်မီတားခြင်းသည် user experience နှင့် data quality နှစ်ခုလုံးအတွက်အရေးကြီးသည်။", "String normalizeTitle(String rawTitle) {\n  final title = rawTitle.trim();\n  if (title.isEmpty) {\n    throw ArgumentError('ခေါင်းစဉ်ထည့်ပါ');\n  }\n  return title;\n}\n\nvoid main() {\n  print(normalizeTitle('  Dart ကိုလေ့လာမယ်  '));\n}", [{ label: "trim", detail: "အစနှင့်အဆုံးရှိ မလိုအပ်သော space ကိုဖယ်ရှားသည်။" }, { label: "throw", detail: "မမှန်သော input ကိုချက်ချင်းတားသည်။" }], "Priority အလိုက် Low, Normal, High စာသားပြန်ပေးသော switch function ရေးပါ။", ["return type ရေးနိုင်သည်", "if condition ဖြင့် validation လုပ်နိုင်သည်", "function ကိုပြန်ခေါ်စမ်းခဲ့သည်"]),
      lesson(4, "object-oriented-dart", "Object-Oriented Dart", "Class, constructor, encapsulation နှင့် model design ဖြင့် real-world data ကိုကိုယ်စားပြုပါ။", "၃၅ မိနစ်", ["class", "constructor", "encapsulation", "enum", "model"], "Class ကိုdata contract လို့မြင်မယ်", "Task class သည် task တစ်ခုအတွက်လိုအပ်သော data နှင့်အဲဒီdata ပေါ်တွင်လုပ်နိုင်သော behavior ကိုစုစည်းထားသည့်model ဖြစ်သည်။", "Immutable data ကဘာကြောင့်ကောင်းသလဲ", "Final field များအသုံးပြုခြင်းက object တစ်ခုကိုဖန်တီးပြီးနောက်မတော်တဆပြောင်းသွားခြင်းကိုလျှော့ချပေးသည်။", "enum Priority { low, normal, high }\n\nclass Task {\n  const Task({required this.id, required this.title, required this.priority});\n\n  final String id;\n  final String title;\n  final Priority priority;\n}\n\nvoid main() {\n  const task = Task(id: 't-1', title: 'Widget လေ့လာရန်', priority: Priority.high);\n  print(task.title);\n}", [{ label: "enum", detail: "ကန့်သတ်ထားသောရွေးချယ်စရာများကို type-safe အဖြစ်ကိုယ်စားပြုသည်။" }, { label: "required", detail: "constructor ခေါ်သူကမဖြစ်မနေတန်ဖိုးပေးရသည်။" }], "isDone field နှင့် copyWith method ပါသော Task model တစ်ခုဖန်တီးပါ။", ["class နှင့်constructor ကိုရေးနိုင်သည်", "enum ကိုသုံးနိုင်သည်", "immutable field ၏အကျိုးကျေးဇူးကိုသိသည်"]),
      lesson(5, "asynchronous-dart", "Asynchronous Dart", "Future, async, await နှင့် error flow များကို UI မပိတ်ဘဲအသုံးပြုပါ။", "၃၈ မိနစ်", ["Future", "async", "await", "try catch", "Stream"], "await ကြားမှာဘာဖြစ်သလဲ", "await ရောက်သည့်အခါ program တစ်ခုလုံးမရပ်ဘဲ လက်ရှိ function ကိုစောင့်ဆိုင်းနေသည့်အခြေအနေသို့ပို့ပေးသည်။ UI application များတွင် animation နှင့် user interaction မပိတ်စေရန်အရေးကြီးသည်။", "Error ကိုuser နှင့်developer အတွက်ခွဲမယ်", "Network failure, validation failure နှင့် permission failure များကိုတစ်မျိုးတည်းမပြဘဲ စနစ်တကျmap လုပ်ပါ။", "Future<String> loadGreeting() async {\n  await Future<void>.delayed(const Duration(milliseconds: 500));\n  return 'ပြန်လည်ကြိုဆိုပါသည်';\n}\n\nFuture<void> main() async {\n  try {\n    print(await loadGreeting());\n  } catch (error) {\n    print('အမှားဖြစ်ခဲ့သည်: $error');\n  }\n}", [{ label: "Future", detail: "နောက်မှရောက်လာမည့်တန်ဖိုးကိုကိုယ်စားပြုသည်။" }, { label: "try/catch", detail: "အမှားကိုဖမ်းပြီး သင့်တော်သောလမ်းကြောင်းသို့ပို့သည်။" }], "၃ စက္ကန့်နောက် task list ပြန်ပေးသော Future function ရေးပြီး loading/error state ကိုစာဖြင့်မှတ်ပါ။", ["async/await ကိုသုံးနိုင်သည်", "try/catch အကြောင်းနားလည်သည်", "Future အချိန်လိုင်းကိုရှင်းပြနိုင်သည်"]),
    ],
  },
  {
    id: "flutter-ui",
    title: "Flutter UI တည်ဆောက်ခြင်း",
    description: "Flutter project, widget tree, layout, form နှင့် UI lifecycle ကိုလက်တွေ့တည်ဆောက်မည့်အပိုင်း။",
    chapters: [
      lesson(6, "flutter-project-foundation", "Flutter Project Foundation", "Flutter project structure, pubspec နှင့် app entry point ကိုဖတ်တတ်အောင်လေ့လာပါ။", "၂၅ မိနစ်", ["Flutter project", "pubspec", "MaterialApp", "runApp"], "runApp မှscreen အထိ", "Flutter app တွင် main ကrunApp ကိုခေါ်ပြီး root widget ကိုframework ထံပေးသည်။ MaterialApp ကtheme, route နှင့် app-level configuration များကိုစုပေးသည်။", "Project file များကိုနေရာမှန်ထားမယ်", "Feature အလိုက် file structure ခွဲထားခြင်းကlesson များနှင့်project ကြီးလာသောအခါရှာဖွေရလွယ်စေသည်။", "void main() {\n  runApp(const MasterclassApp());\n}\n\nclass MasterclassApp extends StatelessWidget {\n  const MasterclassApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return const MaterialApp(home: CourseHomePage());\n  }\n}", [{ label: "runApp", detail: "root widget ကိုFlutter rendering system သို့ပို့သည်။" }, { label: "StatelessWidget", detail: "ကိုယ်ပိုင်ပြောင်းလဲနေသောstate မရှိသော UI အတွက်သုံးသည်။" }], "MaterialApp, Scaffold, AppBar ပါသော empty screen တစ်ခုတည်ဆောက်ပါ။", ["runApp လုပ်ဆောင်ပုံသိသည်", "StatelessWidget ရေးနိုင်သည်", "pubspec ၏တာဝန်ကိုသိသည်"]),
      lesson(7, "widgets-layout", "Widgets နှင့် Layout", "Constraint, Row, Column, Expanded နှင့် scrollable list များဖြင့် responsive UI တည်ဆောက်ပါ။", "၄၀ မိနစ်", ["widgets", "Row", "Column", "Expanded", "ListView"], "Constraint ကိုနားလည်မယ်", "Flutter layout တွင်parent ကconstraint ပေးပြီး child ကsize ရွေးကာ parent ကိုlayout result ပြန်ပေးသည်။ Overflow ကိုpadding လျှော့ရုံဖြင့်မပြင်ဘဲ constraint ကိုသိစွာစီမံပါ။", "စာရှည်သော UI ကိုမပေါက်ကြားစေမယ်", "Row ထဲကtext သည်လိုသလောက်အကျယ်ယူချင်နိုင်သည်။ Expanded နှင့် maxLines သုံးပြီးကျန်နေရာအတွင်းတင်ပြရန်ကန့်သတ်ပါ။", "Row(\n  children: [\n    const Icon(Icons.menu_book_outlined),\n    const SizedBox(width: 12),\n    Expanded(\n      child: Text(\n        'Dart အခြေခံအယူအဆများကိုလေ့လာမယ်',\n        maxLines: 2,\n        overflow: TextOverflow.ellipsis,\n      ),\n    ),\n  ],\n)", [{ label: "Expanded", detail: "Row ထဲတွင်ကျန်အကျယ်ကို child အားပေးသည်။" }, { label: "ellipsis", detail: "နေရာမလောက်လျှင်စာကိုညှပ်ပြီး … ပြသည်။" }], "Chapter card ကိုIcon, title, duration နှင့်progress တို့ဖြင့်တည်ဆောက်ပါ။", ["Row/Column ကွာခြားချက်သိသည်", "Expanded သုံးနိုင်သည်", "overflow အကြောင်းရှင်းပြနိုင်သည်"]),
      lesson(8, "stateful-forms", "Stateful Widgets နှင့် Forms", "TextEditingController, Form validation နှင့် widget lifecycle ကိုသေချာအသုံးပြုပါ။", "၄၂ မိနစ်", ["StatefulWidget", "initState", "dispose", "Form", "validator"], "State ကိုဘယ်သူပိုင်သလဲ", "Text field ၏စာသား၊ loading state နှင့် selected value များသည်screen အသက်ရှင်နေသရွေ့ပြောင်းနိုင်သော state များဖြစ်သည်။ StatefulWidget ၏ State object ကထိုstate ကိုပိုင်ဆိုင်သင့်သည်။", "dispose ကိုမမေ့ပါနှင့်", "Controller, focus node နှင့် subscription များကိုdispose မလုပ်လျှင်screen ပိတ်ပြီးနောက် resource ကျန်နိုင်သည်။", "class CreateTaskPageState extends State<CreateTaskPage> {\n  final formKey = GlobalKey<FormState>();\n  late final TextEditingController titleController;\n\n  @override\n  void initState() {\n    super.initState();\n    titleController = TextEditingController();\n  }\n\n  @override\n  void dispose() {\n    titleController.dispose();\n    super.dispose();\n  }\n}", [{ label: "initState", detail: "State object ပထမဖန်တီးချိန်တွင်resource စတင်ရာနေရာ။" }, { label: "dispose", detail: "State ပျက်စီးမီresource ကိုသန့်ရှင်းပိတ်သိမ်းရာနေရာ။" }], "Required title validator ပါသော task form တစ်ခုရေးပြီး dispose ကိုထည့်ပါ။", ["StatefulWidget ကိုအသုံးပြုနိုင်သည်", "initState/dispose ကိုခွဲပြနိုင်သည်", "Form validator ရေးနိုင်သည်"]),
      lesson(9, "focusflow-ui-build", "FocusFlow UI ကိုတည်ဆောက်ခြင်း", "Task manager lesson project ဖြင့် design system, list state နှင့် reusable component များကိုပေါင်းစပ်ပါ။", "၄၅ မိနစ်", ["FocusFlow", "design system", "components", "empty state"], "Reusable component ကိုဘယ်လိုရွေးမလဲ", "Task tile, section heading နှင့်progress badge ကအကြိမ်များစွာပြန်သုံးမည့် UI ဖြစ်လျှင်component အဖြစ်ခွဲထားခြင်းကstyle consistency ကိုကာကွယ်ပေးသည်။", "Empty state သည်error မဟုတ်", "Task မရှိသေးခြင်းကအောင်မြင်စွာload ပြီးသည့်အခြေအနေတစ်ခုဖြစ်သည်။ User အားနောက်တစ်ဆင့်ဘာလုပ်ရမလဲကိုရှင်းရှင်းပြပါ။", "class EmptyTasksView extends StatelessWidget {\n  const EmptyTasksView({super.key, required this.onCreate});\n  final VoidCallback onCreate;\n\n  @override\n  Widget build(BuildContext context) {\n    return Center(\n      child: FilledButton(onPressed: onCreate, child: const Text('ပထမဆုံး Task ဖန်တီးပါ')),\n    );\n  }\n}", [{ label: "VoidCallback", detail: "parameter မယူဘဲUI action တစ်ခုလုပ်မည့် function type ဖြစ်သည်။" }, { label: "required this.onCreate", detail: "parent ကaction ကိုပေးပြီး child ကUI သာပြသည်။" }], "Task list အလွတ်ဖြစ်လျှင် create action ပြသော empty state တစ်ခုတည်ဆောက်ပါ။", ["reusable widget ကိုခွဲနိုင်သည်", "empty/error state ကွာခြားချက်သိသည်", "callback ကိုသုံးနိုင်သည်"]),
    ],
  },
  {
    id: "navigation-state",
    title: "Navigation နှင့် State စီမံခန့်ခွဲမှု",
    description: "Screen များကြားသွားလာမှု၊ responsive design နှင့် application state ကိုစနစ်တကျကိုင်တွယ်မည့်အပိုင်း။",
    chapters: [
      lesson(10, "navigation-routing", "Navigation နှင့် Routing", "Route result, deep link နှင့် authentication-aware navigation ကိုနားလည်ပါ။", "၃၈ မိနစ်", ["Navigator", "GoRouter", "routes", "deep links"], "Route result ကိုမှန်ကန်စွာယူမယ်", "Edit screen ကပြန်ပေးသော Task draft သည် database save ပြီးကြောင်းမဟုတ်သေးပါ။ Parent controller ကတစ်ဆင့် validation နှင့် persistence လုပ်သင့်သည်။", "Back stack policy ကိုသတ်မှတ်မယ်", "Login အောင်ပြီးနောက်back နှိပ်လျှင်login screen သို့ပြန်မရောက်စေရန်နှင့် deep link အတွက်redirect policy ရှင်းလင်းစွာသတ်မှတ်ပါ။", "Future<void> openEditor(BuildContext context, Task task) async {\n  final updated = await Navigator.of(context).push<Task>(\n    MaterialPageRoute(builder: (_) => EditTaskPage(task: task)),\n  );\n  if (!context.mounted || updated == null) return;\n  await saveTask(updated);\n}", [{ label: "push<Task>", detail: "route result အမျိုးအစားကိုtype-safe ဖြစ်စေသည်။" }, { label: "mounted", detail: "await ကြားတွင်screen ပျက်သွားခြင်းကိုကာကွယ်သည်။" }], "Task details → edit → list update flow ကိုdiagram ဆွဲပြီးရေးပါ။", ["route result ကိုhandle လုပ်နိုင်သည်", "mounted စစ်ရသည့်အကြောင်းသိသည်", "back stack ကိုစဉ်းစားနိုင်သည်"]),
      lesson(11, "material-responsive", "Material Design နှင့် Responsive UI", "ColorScheme, ThemeData နှင့် LayoutBuilder ဖြင့် device အမျိုးမျိုးအတွက်တည်ဆောက်ပါ။", "၃၅ မိနစ်", ["Material 3", "ThemeData", "ColorScheme", "LayoutBuilder"], "Theme ကိုsemantic contract လို့မြင်မယ်", "ColorScheme ၏ primary နှင့် onPrimary ကိုတွဲသုံးခြင်းက dark mode နှင့် contrast ပြောင်းလဲမှုတွင်စာဖတ်ရလွယ်စေသည်။", "Screen width အလိုက်အပြင်အဆင်ပြောင်းမယ်", "Phone တွင်list တစ်ကော်လံ၊ wide screen တွင်list-detail နှစ်ကော်လံပြောင်းရန် parent constraint ကိုLayoutBuilder ဖြင့်ဖတ်ပါ။", "LayoutBuilder(\n  builder: (_, constraints) {\n    if (constraints.maxWidth < 720) return TaskList();\n    return Row(children: [SizedBox(width: 360, child: TaskList()), const VerticalDivider(), const Expanded(child: TaskDetail())]);\n  },\n)", [{ label: "LayoutBuilder", detail: "parent ပေးသောavailable width ကိုသိစေသည်။" }, { label: "720", detail: "design decision အဖြစ်ရွေးသောbreakpoint ဖြစ်သည်။" }], "Phone နှင့်tablet အတွက်chapter reader အပြင်အဆင်နှစ်မျိုးရေးပါ။", ["ColorScheme သုံးနိုင်သည်", "responsive breakpoint ထည့်နိုင်သည်", "text scale ကိုစစ်ရမည်သိသည်"]),
      lesson(12, "state-management", "State Management Foundations", "Local state, feature state နှင့် server state ကိုခွဲပြီး Provider/Riverpod/BLoC ကိုရွေးပါ။", "၄၅ မိနစ်", ["state", "Provider", "Riverpod", "BLoC", "controller"], "State အမျိုးအစားကိုခွဲမယ်", "Password visibility ကlocal state ဖြစ်ပြီး authenticated session ကapp state ဖြစ်သည်။ Task list query ကserver state ဖြစ်သည်။ အားလုံးကိုwidget တစ်ခုထဲမထည့်ပါနှင့်။", "Loading နှင့် error ကိုstate contract လုပ်မယ်", "Boolean များစွာအစား explicit state class များသုံးခြင်းက impossible state များကိုလျှော့ချပေးသည်။", "sealed class TasksState { const TasksState(); }\nclass TasksLoading extends TasksState { const TasksLoading(); }\nclass TasksReady extends TasksState { const TasksReady(this.tasks); final List<Task> tasks; }\nclass TasksFailed extends TasksState { const TasksFailed(this.message); final String message; }", [{ label: "sealed", detail: "ဖြစ်နိုင်သောstate များကိုကန့်သတ်ပြီးexhaustive handling လုပ်နိုင်စေသည်။" }, { label: "TasksReady", detail: "data အောင်မြင်စွာရောက်လာသောstate ဖြစ်သည်။" }], "Loading, empty, data, error state လေးမျိုးပါသော task screen state model ရေးပါ။", ["state scope ခွဲနိုင်သည်", "loading/error policy သိသည်", "sealed state ၏အကျိုးကိုပြောနိုင်သည်"]),
    ],
  },
  {
    id: "data-backend",
    title: "Data နှင့် Backend ချိတ်ဆက်ခြင်း",
    description: "REST API, local storage, caching, animation နှင့် asynchronous UI ကိုproduction thinking ဖြင့်လေ့လာမည့်အပိုင်း။",
    chapters: [
      lesson(13, "networking-rest", "Networking နှင့် REST API", "HTTP lifecycle, JSON parsing, timeout နှင့် retry policy များကိုနားလည်ပါ။", "၄၅ မိနစ်", ["HTTP", "REST", "JSON", "Dio", "timeout"], "Network request သည်တစ်ကြောင်းမဟုတ်", "Request တစ်ခုတွင်URL, header, token, timeout, status mapping, JSON parsing နှင့်error handling တို့ပါဝင်သည်။ Response JSON ကိုUI သို့တိုက်ရိုက်မပို့ပါနှင့်။", "Status code ကိုအဓိပ္ပာယ်ဖြင့်ကိုင်မယ်", "401 သည်session policy, 429 သည်backoff policy, 500 သည်server failure policy လိုအပ်သည်။", "Future<List<Task>> fetchTasks(http.Client client, Uri uri) async {\n  final response = await client.get(uri).timeout(const Duration(seconds: 15));\n  if (response.statusCode != 200) throw Exception('Request မအောင်မြင်ပါ');\n  final decoded = jsonDecode(response.body) as List;\n  return decoded.map((row) => Task.fromJson(row as Map<String, Object?>)).toList();\n}", [{ label: "timeout", detail: "အဆုံးမရှိစောင့်နေရခြင်းကိုတားသည်။" }, { label: "fromJson", detail: "untrusted JSON ကိုtyped model အဖြစ်ပြောင်းသည်။" }], "401, 429, 500 အတွက်user message နှင့်retry rule ကိုtable တစ်ခုဖြင့်ရေးပါ။", ["HTTP response ကိုhandle လုပ်နိုင်သည်", "JSON boundary ကိုနားလည်သည်", "retry မသင့်သောoperation ကိုသိသည်"]),
      lesson(14, "local-storage-cache", "Local Storage, Database နှင့် Caching", "Preferences, secure storage, local database နှင့် cache invalidation တို့ကိုရွေးတတ်အောင်လေ့လာပါ။", "၄၀ မိနစ်", ["shared_preferences", "secure storage", "SQLite", "cache"], "Data ကိုအားလုံးတစ်နေရာမသိမ်းပါနှင့်", "Theme preference, credential, offline task data နှင့်server source of truth တို့တွင် sensitivity နှင့်query requirement မတူသောကြောင့်storage မျိုးကွဲရွေးရသည်။", "Cache ရှိခြင်းကfresh data မဟုတ်", "Cached list ကိုပြနေချိန်network failure ရှိလျှင် stale state နှင့်retry action ကိုပေးပါ။", "Future<ThemeMode> loadTheme(SharedPreferences prefs) async {\n  return switch (prefs.getString('theme_mode_v1')) {\n    'dark' => ThemeMode.dark,\n    'light' => ThemeMode.light,\n    _ => ThemeMode.system,\n  };\n}", [{ label: "theme_mode_v1", detail: "versioned key သုံးခြင်းကနောက်ပိုင်းmigration အတွက်ကူညီသည်။" }, { label: "ThemeMode.system", detail: "OS preference ကိုdefault အဖြစ်လေးစားသည်။" }], "Offline task cache အတွက်fresh/stale/failed state rule သတ်မှတ်ပါ။", ["storage type ရွေးနိုင်သည်", "secret ကိုpreferences မသိမ်းရကြောင်းသိသည်", "cache invalidation ကိုစဉ်းစားနိုင်သည်"]),
      lesson(15, "animations-native", "Animations နှင့် Native Features", "Motion, Hero, permission နှင့် platform feature များကိုaccessibility နှင့်တကွအသုံးပြုပါ။", "၃၅ မိနစ်", ["animation", "Hero", "permission", "camera", "location"], "Animation ကိုရည်ရွယ်ချက်ဖြင့်သုံးမယ်", "Task ပြီးမြောက်ခြင်းကဲ့သို့state change ကိုမျက်စိနှင့်လိုက်နိုင်အောင်ပြခြင်းကကောင်းသောmotion ဖြစ်သည်။ Loading ကြာနေမှုကိုဖုံးရန်သုံးခြင်းမဟုတ်ပါ။", "Permission ကိုအခြေအနေအားလုံးနှင့်စဉ်းစားမယ်", "Granted တစ်မျိုးတည်းမဟုတ်ဘဲ denied, permanently denied, cancelled နှင့်unsupported device များအတွက်UI state ရှိရမည်။", "AnimatedContainer(\n  duration: const Duration(milliseconds: 180),\n  curve: Curves.easeOut,\n  color: isDone ? Colors.green.shade100 : Colors.grey.shade100,\n  child: Text(isDone ? 'ပြီးပါပြီ' : 'လုပ်ဆောင်နေသည်'),\n)", [{ label: "duration", detail: "motion ကအလွန်ကြာမနေစေရန်အချိန်ကိုသတ်မှတ်သည်။" }, { label: "isDone", detail: "UI animation ကိုdomain state နှင့်ချိတ်ထားသည်။" }], "Permission denied ဖြစ်လျှင်settings သို့သွားရန်action ပါသော UI state တစ်ခုဒီဇိုင်းဆွဲပါ။", ["implicit animation သုံးနိုင်သည်", "permission edge cases သိသည်", "reduced motion ကိုစဉ်းစားနိုင်သည်"]),
      lesson(16, "async-ui", "Asynchronous UI Building", "FutureBuilder, StreamBuilder နှင့် stable async source များဖြင့် loading/error/empty/data state ကိုပြပါ။", "၄၂ မိနစ်", ["FutureBuilder", "StreamBuilder", "loading", "error", "empty"], "Future ကိုbuild ထဲမဖန်တီးပါနှင့်", "Build သည်theme, keyboard နှင့်parent state အပါအဝင်အကြောင်းများစွာကြောင့်ပြန်ခေါ်နိုင်သည်။ Build ထဲမှာfetch ခေါ်လျှင်request အကြိမ်များစွာဖြစ်နိုင်သည်။", "UI state လေးမျိုးကိုခွဲမယ်", "Waiting, error, empty success နှင့်data success တို့သည်user အတွက်မတူသောအခြေအနေများဖြစ်သည်။", "late Future<List<Task>> futureTasks;\n\n@override\nvoid initState() {\n  super.initState();\n  futureTasks = repository.fetchTasks();\n}\n\n@override\nWidget build(BuildContext context) {\n  return FutureBuilder<List<Task>>(future: futureTasks, builder: buildTaskState);\n}", [{ label: "late Future", detail: "future ကိုState lifecycle အစတွင်တစ်ကြိမ်တည်ဆောက်ထားသည်။" }, { label: "FutureBuilder", detail: "async result အလိုက် UI state ကိုrender ပေးသည်။" }], "Retry button နှိပ်မှသာfuture အသစ်စသောtask list screen တစ်ခုရေးပါ။", ["build lifecycle သိသည်", "loading/error/empty/data ခွဲနိုင်သည်", "FutureBuilder ကိုမှန်ကန်စွာသုံးနိုင်သည်"]),
    ],
  },
  {
    id: "supabase-architecture",
    title: "Supabase နှင့် Architecture",
    description: "Authentication, RLS, realtime data, clean architecture နှင့် dependency injection ကိုproduction စံနှုန်းဖြင့်လေ့လာမည့်အပိုင်း။",
    chapters: [
      lesson(17, "supabase-backend", "Supabase Backend Integration", "Auth, CRUD, Row Level Security, realtime နှင့်storage ကိုclient/server boundary အဖြစ်နားလည်ပါ။", "၅၀ မိနစ်", ["Supabase", "auth", "RLS", "Postgres", "realtime"], "Client key နှင့်secret key ကိုမရောပါနှင့်", "Flutter client တွင်publishable key သာပါနိုင်သည်။ Service role key နှင့်database password ကိုapp binary ထဲမထည့်ရပါ။ Data access ကိုRLS policy ကserver-side မှဆုံးဖြတ်ရမည်။", "RLS သည်UI filter မဟုတ်", "User A ကUser B data ကိုdirect API ဖြင့်မဖတ်နိုင်ရန်database policy တွင်select, insert, update, delete rule တစ်ခုချင်းသတ်မှတ်ပါ။", "create policy \"task_select_own\"\non public.tasks for select\nto authenticated\nusing ((select auth.uid()) = user_id);\n\ncreate policy \"task_insert_own\"\non public.tasks for insert\nto authenticated\nwith check ((select auth.uid()) = user_id);", [{ label: "auth.uid()", detail: "လက်ရှိauthenticated user ၏identifier ကိုယူသည်။" }, { label: "using / with check", detail: "ရှိပြီးသားrow နှင့်ရေးမည့်row နှစ်ခုလုံးအတွက်ownership စစ်သည်။" }], "User A နှင့်User B ဖြင့်cross-user select/update မအောင်မြင်ကြောင်းစစ်မည့် test cases ရေးပါ။", ["service key မသုံးရကြောင်းသိသည်", "RLS ၏တာဝန်သိသည်", "CRUD policy ကိုခွဲနိုင်သည်"]),
      lesson(18, "clean-architecture", "Clean Architecture နှင့် Platform Integration", "Presentation, domain, data layer နှင့် dependency injection ဖြင့်ပြောင်းလဲလွယ်သော app တည်ဆောက်ပါ။", "၄၈ မိနစ်", ["clean architecture", "repository", "use case", "dependency injection", "MethodChannel"], "Folder မဟုတ် dependency direction", "Domain layer ကFlutter, Supabase, SQLite ကိုမသိသင့်ပါ။ Data layer ကdomain contract ကိုအကောင်အထည်ဖော်ပြီး presentation ကuse case ကိုခေါ်ကာUI state ပြသသင့်သည်။", "Use case ကိုtestable ဖြစ်အောင်ရေးမယ်", "Clock, ID generator နှင့်repository ကိုconstructor ကနေပေးလျှင်business rule ကိုdatabase/UI မလိုဘဲစမ်းသပ်နိုင်သည်။", "abstract interface class TaskRepository {\n  Future<void> save(Task task);\n}\n\nclass CreateTask {\n  CreateTask(this.repository);\n  final TaskRepository repository;\n\n  Future<void> call(Task task) => repository.save(task);\n}", [{ label: "abstract interface", detail: "implementation မဟုတ်ဘဲcontract ကိုdomain ကသိစေသည်။" }, { label: "constructor injection", detail: "dependency ကိုအပြင်ကပေး၍test override လုပ်နိုင်သည်။" }], "TaskRepository fake တစ်ခုရေးပြီးCreateTask ကိုunit test တစ်ခုရေးပါ။", ["layer တာဝန်ခွဲနိုင်သည်", "repository contract နားလည်သည်", "dependency injection ကိုသုံးနိုင်သည်"]),
    ],
  },
  {
    id: "testing-deployment",
    title: "စမ်းသပ်ခြင်းနှင့် ဖြန့်ချိခြင်း",
    description: "Testing pyramid, performance diagnostics, CI/CD, Android/iOS release နှင့် launch readiness ကိုပြီးစီးစေမည့်အပိုင်း။",
    chapters: [
      lesson(19, "testing-debugging", "Testing, Optimization နှင့် Debugging", "Unit, widget, integration test များနှင့်DevTools evidence ဖြင့်quality ကိုတိုင်းတာပါ။", "၅၀ မိနစ်", ["unit test", "widget test", "integration test", "DevTools", "performance"], "Test တစ်ခုကဘာကိုသက်သေပြသလဲ", "Unit test ကbusiness rule တစ်ခုကိုမြန်မြန်စစ်သည်။ Widget test ကrendered UI interaction ကိုစစ်သည်။ Integration test ကlogin မှtask save အထိflow အကြီးကိုစစ်သည်။", "Performance ကိုမှန်းမပြင်ပါနှင့်", "Jank, memory, rebuild နှင့်network bottleneck တို့ကိုDevTools နှင့်real device profiling ဖြင့်တိုင်းပြီးမှပြင်ပါ။", "test('title ကိုtrim လုပ်ပြီးသိမ်းသည်', () async {\n  final repository = FakeTaskRepository();\n  final useCase = CreateTask(repository);\n  await useCase(Task(id: 't-1', title: '  Test ရေးရန်  ', priority: Priority.normal));\n  expect(repository.saved.single.title.trim(), 'Test ရေးရန်');\n});", [{ label: "FakeTaskRepository", detail: "external database မလိုဘဲtest အတွက်တုပထားသောrepository ဖြစ်သည်။" }, { label: "expect", detail: "မျှော်လင့်ရလဒ်ကိုassert လုပ်သည်။" }], "Task title မရှိလျှင်error ပြန်ရကြောင်းunit test တစ်ခုနှင့် form error widget test တစ်ခုရေးပါ။", ["test အမျိုးအစားခွဲနိုင်သည်", "fake dependency သုံးနိုင်သည်", "profile မတိုင်းဘဲoptimize မလုပ်ရကြောင်းသိသည်"]),
      lesson(20, "cicd-release", "CI/CD, Build နှင့် Store Deployment", "Versioning, signing, flavors, CI gates နှင့်store launch checklist ဖြင့်release-ready ဖြစ်အောင်လုပ်ပါ။", "၅၅ မိနစ်", ["CI/CD", "GitHub Actions", "Android", "iOS", "signing"], "Build အောင်ခြင်းကlaunch ready မဟုတ်", "Release တစ်ခုတွင်version code, signing, permissions, privacy disclosure, real-device test, crash monitoring နှင့်rollback owner တို့ပါဝင်သည်။", "CI ကိုquality gate လိုသုံးမယ်", "Format, analyze, test နှင့်build step များကိုpull request တိုင်းrun စေခြင်းကregression များကိုmerge မတိုင်မီဖမ်းနိုင်သည်။", "name: Flutter CI\non: [pull_request]\njobs:\n  quality:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: flutter analyze\n      - run: flutter test\n      - run: flutter build appbundle --debug", [{ label: "flutter analyze", detail: "static type နှင့်lint issue များကိုဖမ်းသည်။" }, { label: "flutter test", detail: "မျှော်လင့်ထားသောbehavior မပြောင်းကြောင်းစစ်သည်။" }], "Release day checklist တစ်ခုရေးပြီးnetwork ပိတ်ခြင်း၊session expired နှင့်app update scenario တို့ကိုစမ်းပါ။", ["CI quality gates သိသည်", "signing secret ကိုကာကွယ်ရကြောင်းသိသည်", "launch checklist ရေးနိုင်သည်"]),
    ],
  },
  {
    id: "step-by-step-foundations",
    title: "Step-by-Step အခြေခံ ထပ်ဖြည့်သင်ခန်းစာများ",
    description: "Dart နှင့် Flutter စတင်သူများမကျန်ရစ်စေရန် setup, syntax, collections, errors, packages, widget lifecycle နှင့် mini app ကိုအဆင့်လိုက်လေ့ကျင့်မည့်အပိုင်း။",
    chapters: [
      lesson(21, "setup-dart-flutter", "Dart နှင့် Flutter Setup ကိုအဆင့်လိုက်လုပ်မယ်", "SDK, editor, project creation နှင့် run command ကိုမရှုပ်ထွေးဘဲတစ်ဆင့်ချင်းစတင်ပါ။", "၃၅ မိနစ်", ["Flutter SDK", "Dart SDK", "VS Code", "flutter doctor", "DartPad"], "STEP 1 — Development environment ဆိုတာဘာလဲ", "Flutter app ရေးရန် Flutter SDK, Dart SDK, editor နှင့်device/emulator တို့လိုအပ်သည်။ စတင်သူအတွက် command အားလုံးမမှတ်မိသေးလည်းရသည်။ ပထမဆုံးရည်ရွယ်ချက်က `flutter doctor` တွင်လိုအပ်ချက်များကိုမြင်ပြီးတစ်ခုချင်းပြင်ရန်ဖြစ်သည်။", "STEP 2 — ပထမ project ကိုဖန်တီးမယ်", "Project folder တစ်ခုသည် code, packages, Android/iOS configuration နှင့်test file များကိုစနစ်တကျစုထားသောအိမ်တစ်လုံးကဲ့သို့ဖြစ်သည်။ Terminal ကိုproject folder အပြင်တွင်ဖွင့်ပြီး create command လုပ်ပါ။", "flutter doctor\nflutter create hello_flutter\ncd hello_flutter\nflutter run", [{ label: "flutter doctor", detail: "SDK, editor, device setup တွင်မပြည့်စုံသေးသောအချက်များကိုစစ်ပေးသည်။" }, { label: "flutter create", detail: "Flutter project structure အပြည့်အစုံကိုဖန်တီးပေးသည်။" }, { label: "flutter run", detail: "ရွေးထားသောdevice သို့app ကိုbuild/run လုပ်သည်။" }], "DartPad တွင် `print('Hello Dart')` ကိုစမ်းပြီး၊ ထို့နောက် Flutter project တစ်ခုဖန်တီးရန်လိုအပ်သည့်tool များကိုကိုယ်စက်တွင်checklist လုပ်ပါ။", ["DartPad နှင့်Flutter project ကွာခြားချက်ကိုသိသည်", "flutter doctor ကိုrun နိုင်သည်", "project create/run command ကိုသိသည်"]),
      lesson(22, "dart-values-operators", "Dart Values, Strings, Operators နှင့် Comments", "String, int, double, bool, operators နှင့် comment များကိုအသုံးပြုပြီး data တွက်ချက်ပုံကိုအဆင့်လိုက်လေ့လာပါ။", "၄၀ မိနစ်", ["String", "int", "double", "bool", "operators", "comments"], "STEP 1 — Data type ကိုတန်ဖိုးပုံစံလိုမြင်မယ်", "`String` သည်စာသား၊ `int` သည်ဒဿမမပါသောဂဏန်း၊ `double` သည်ဒဿမပါသောဂဏန်းနှင့် `bool` သည် true/false အခြေအနေကိုကိုယ်စားပြုသည်။ Type မှန်မှသာ compiler ကမမှန်သောအသုံးပြုမှုကိုစောစောဖမ်းပေးနိုင်သည်။", "STEP 2 — Operator ကvalue ကိုဘယ်လိုပြောင်းသလဲ", "`+`, `-`, `*`, `/` သည်တွက်ချက်မှုအတွက်ဖြစ်ပြီး `==`, `>`, `<` တို့သည်အဖြေမှန်/မမှန်ကိုစစ်ရန်ဖြစ်သည်။ `//` comment သည်program run ချိန်တွင်မပါဝင်ဘဲစာရေးသူ၏မှတ်ချက်အတွက်ဖြစ်သည်။", "void main() {\n  final String learner = 'Aung Aung';\n  final int completed = 3;\n  final double score = 8.5;\n  final bool canContinue = completed >= 3 && score >= 8;\n\n  // စာသားနှင့်value ကိုတွဲပြသည်။\n  print('$learner: $canContinue');\n}", [{ label: "final", detail: "တစ်ကြိမ်သတ်မှတ်ပြီးနောက်မပြောင်းမည့်value အတွက်သုံးသည်။" }, { label: "&&", detail: "condition နှစ်ခုလုံး true ဖြစ်မှtrue ပြန်ပေးသော logical AND ဖြစ်သည်။" }, { label: "//", detail: "code ဖတ်သူအတွက်ရှင်းပြချက်ရေးသောsingle-line comment ဖြစ်သည်။" }], "မိမိအမည်၊ ပြီးစီးသည့်lesson အရေအတွက်နှင့်score ကိုvariable များဖြင့်ရေးပြီး score 5 ထက်ကြီးလျှင် `true` ထွက်အောင် condition တစ်ခုရေးပါ။", ["basic types လေးမျိုးကိုခွဲနိုင်သည်", "comparison နှင့်logical operator ကိုသုံးနိုင်သည်", "comment ရေးရသည့်အကြောင်းသိသည်"]),
      lesson(23, "dart-collections", "List, Set နှင့် Map ကိုလက်တွေ့သုံးမယ်", "Collection သုံးမျိုးကို data ပုံစံအလိုက်ရွေးပြီး add, read, update ကိုအဆင့်လိုက်စမ်းပါ။", "၄၅ မိနစ်", ["List", "Set", "Map", "for-in", "collection"], "STEP 1 — Collection သုံးမျိုးကိုရွေးမယ်", "အစီအစဉ်လိုသောitems များအတွက် `List`၊ ထပ်နေခြင်းမလိုသောitems များအတွက် `Set` နှင့် key တစ်ခုဖြင့်value ကိုရှာလိုသောအခါ `Map` ကိုသုံးပါ။ ဥပမာ chapter list, unique tags နှင့်user profile တို့သည်မတူသောcollection လိုအပ်သည်။", "STEP 2 — အချက်အလက်ကိုလှည့်ဖတ်မယ်", "`for (final item in items)` သည်collection အတွင်းရှိitem တစ်ခုစီကိုအလှည့်ကျဖတ်ပေးသည်။ Index လိုအပ်မှသာ traditional for loop ကိုသုံးပါ။", "void main() {\n  final chapters = ['Variables', 'Functions', 'Widgets'];\n  final tags = <String>{'dart', 'flutter', 'dart'};\n  final profile = <String, Object>{'name': 'Su Su', 'level': 1};\n\n  for (final chapter in chapters) {\n    print(chapter);\n  }\n  print(tags);\n  print(profile['name']);\n}", [{ label: "List", detail: "အစီအစဉ်ရှိပြီးduplicate item များကိုလက်ခံနိုင်သည်။" }, { label: "Set", detail: "တူညီသောvalue ကိုတစ်ကြိမ်သာထားသည်။" }, { label: "Map", detail: "key:value pair ဖြင့်data ကိုသိမ်းပြီးkey ဖြင့်ပြန်ရှာနိုင်သည်။" }], "သင်ကြိုက်နှစ်သက်သောDart topic သုံးခုပါList၊ ထပ်နေသောtag ပါSet နှင့်name/age ပါMap တစ်ခုစီရေးပြီးprint လုပ်ပါ။", ["List/Set/Map ကိုရွေးနိုင်သည်", "for-in loop သုံးနိုင်သည်", "Map key ဖြင့်value ဖတ်နိုင်သည်"]),
      lesson(24, "dart-errors-exceptions", "Error, Exception နှင့် Debugging အခြေခံ", "Program မအောင်မြင်သည့်အချိန်တွင် error message ဖတ်ခြင်း၊ exception ဖမ်းခြင်းနှင့် input စစ်ခြင်းကိုလေ့လာပါ။", "၄၀ မိနစ်", ["Exception", "try", "catch", "finally", "debugging"], "STEP 1 — Error သည်သင်ယူရန်အချက်အလက်", "Error message တွင်အများအားဖြင့်ဘာအမှားဖြစ်သည်၊ file ဘယ်နေရာနှင့်line ဘယ်နံပါတ်ရှိသည်ကိုပြထားသည်။ စတင်သူအတွက်message အကုန်နားမလည်သေးလည်းအရေးမကြီးပါ။ ပထမဆုံးအနီရောင်error ၏နောက်ဆုံးအဓိပ္ပာယ်ရှိသောline ကိုဖတ်ရန်လေ့ကျင့်ပါ။", "STEP 2 — Exception ကိုသိစွာဖမ်းမယ်", "User input သို့မဟုတ်network အဖြေကမမှန်နိုင်လျှင် `try/catch` ဖြင့်app မပျက်စေဘဲသင့်တော်သောmessage ပြနိုင်သည်။ `finally` တွင်loading ပိတ်ခြင်းကဲ့သို့မဖြစ်မနေလုပ်ရမည့်အလုပ်ကိုထားနိုင်သည်။", "int parseAge(String raw) {\n  try {\n    final age = int.parse(raw);\n    if (age < 0) throw ArgumentError('Age must be positive');\n    return age;\n  } on FormatException {\n    throw ArgumentError('ဂဏန်းသာထည့်ပါ');\n  }\n}\n\nvoid main() {\n  print(parseAge('18'));\n}", [{ label: "int.parse", detail: "စာသားကိုinteger အဖြစ်ပြောင်းရန်ကြိုးစားပြီးမရလျှင်FormatException ပစ်သည်။" }, { label: "on FormatException", detail: "သတ်မှတ်ထားသောerror type ကိုသာဖမ်းပေးသည်။" }, { label: "throw", detail: "မမှန်သောdata ကိုသိသာသောerror အဖြစ်caller ထံပြန်ပို့သည်။" }], "`parseAge('abc')` ကိုစမ်းပြီးerror ကိုဖတ်ပါ။ ထို့နောက် empty string အတွက်လည်းသင့်တော်သောmessage ပြန်ပေးအောင်ပြင်ပါ။", ["error message မှline ရှာနိုင်သည်", "try/catch ကိုသုံးနိုင်သည်", "input validation လုပ်နိုင်သည်"]),
      lesson(25, "dart-imports-packages", "Imports, Packages နှင့် pubspec.yaml", "Dart file များနှင့် third-party package များကိုလုံခြုံစွာချိတ်ဆက်ပြီး dependency တစ်ခုကိုအသုံးပြုတတ်အောင်လေ့လာပါ။", "၄၅ မိနစ်", ["import", "package", "pubspec.yaml", "dependencies", "version"], "STEP 1 — Import သည်ဘာကိုခေါ်လာသလဲ", "Dart file တစ်ခုသည်အခြားlibrary ထဲကclass/function ကိုမမြင်နိုင်သေးပါ။ `import` ကလိုအပ်သောAPI ကိုအကြောင်းကြားပြီးသုံးခွင့်ပေးသည်။ မလိုအပ်သောimport များမထည့်ဘဲအသုံးပြုမည့်အရာကိုသာရွေးပါ။", "STEP 2 — Package ကိုdependency လိုစီမံမယ်", "Flutter package များကို `pubspec.yaml` တွင်version နှင့်ရေးပြီး `flutter pub get` လုပ်သည်။ Package documentation တွင်installation, platform setup နှင့်security note များကိုအရင်ဖတ်ရသည်။", "import 'dart:math';\n\nvoid main() {\n  final radius = 4.0;\n  final area = pi * radius * radius;\n  print(area);\n}\n\n// pubspec.yaml ထဲတွင်\n// dependencies:\n//   http: ^1.2.0", [{ label: "dart:math", detail: "Dart SDK ပါပြီးသားmath library ကိုimport လုပ်ထားခြင်းဖြစ်သည်။" }, { label: "pi", detail: "math library ကပေးသောconstant ဖြစ်သည်။" }, { label: "dependencies", detail: "project ကလိုအပ်သောexternal package များစာရင်းဖြစ်သည်။" }], "`dart:math` ကိုသုံးပြီးsquare root သို့မဟုတ်random number တစ်ခုထုတ်ပါ။ ထို့နောက်အသုံးပြုချင်သည့်Flutter package တစ်ခုကိုရွေးပြီးdocumentation တွင်လိုအပ်သောsetup ကိုမှတ်စုရေးပါ။", ["SDK import နှင့်package dependency ကွာခြားချက်သိသည်", "pubspec.yaml ၏တာဝန်သိသည်", "package documentation ဖတ်တတ်သည်"]),
      lesson(26, "dart-oop-advanced", "Inheritance, Mixins, Interfaces နှင့် Abstract Classes", "Class တစ်ခုကိုအခြားclass ပေါ်တည်ဆောက်ခြင်းနှင့်shared behavior ပြန်သုံးခြင်းကိုreal-world model ဖြင့်လေ့လာပါ။", "၅၀ မိနစ်", ["extends", "mixin", "implements", "abstract", "override"], "STEP 1 — extends နှင့် with ကိုမရောပါနှင့်", "`extends` သည်parent class တစ်ခုမှidentity နှင့်behavior ကိုအမွေဆက်ခံခြင်းဖြစ်သည်။ `with` သည်class hierarchy မပြောင်းဘဲcapability တစ်ခုထပ်ပေးရန်mixin သုံးခြင်းဖြစ်သည်။", "STEP 2 — Contract ကိုabstract class ဖြင့်ရေးမယ်", "Abstract class သည်ကလေးclass များမဖြစ်မနေလုပ်ရမည့်method contract ကိုသတ်မှတ်ပေးသည်။ UI မပါဘဲbusiness rule ကိုစမ်းသပ်လိုသောအခါinterface/abstract contract ကအထောက်အကူဖြစ်သည်။", "abstract class ProgressReporter {\n  void reportProgress();\n}\n\nmixin Timestamped {\n  DateTime get createdAt => DateTime.now();\n}\n\nclass CourseProgress with Timestamped implements ProgressReporter {\n  @override\n  void reportProgress() => print('Progress saved at $createdAt');\n}", [{ label: "abstract", detail: "တိုက်ရိုက်object မဖန်တီးဘဲcontract အဖြစ်အသုံးပြုမည့်class ကိုဖော်ပြသည်။" }, { label: "with", detail: "mixin capability တစ်ခုကိုclass ထဲထည့်သည်။" }, { label: "implements", detail: "interface ၏method အားလုံးကိုကိုယ်တိုင်အကောင်အထည်ဖော်ရမည်ဟုဆိုလိုသည်။" }], "`Printable` abstract class တစ်ခုဖန်တီးပြီး `CourseCertificate` class တွင်implements လုပ်ပါ။ ထို့နောက်timestamp ပါသောmixin ကိုထည့်ပါ။", ["extends/with/implements ကွာခြားချက်သိသည်", "abstract contract ရေးနိုင်သည်", "@override ကိုသုံးနိုင်သည်"]),
      lesson(27, "flutter-widget-tree-build", "Flutter Widget Tree နှင့် build() ကိုနားလည်မယ်", "Widget tree, BuildContext နှင့် rebuild ဖြစ်ပုံကိုမြင်အောင်ရိုးရှင်းသောscreen တစ်ခုတည်ဆောက်ပါ။", "၄၅ မိနစ်", ["widget tree", "BuildContext", "build", "Scaffold", "const"], "STEP 1 — Screen သည်widget အပင်တစ်ပင်", "Flutter UI တွင်AppBar, body, text, button အားလုံးသည်widget များဖြစ်ပြီးparent-child tree အဖြစ်စီထားသည်။ Parent widget ပြောင်းလျှင်child widget များကိုပြန်တည်ဆောက်ရနိုင်သောကြောင့်tree ကိုသေးသေးလေးများအဖြစ်ခွဲထားခြင်းကဖတ်ရလွယ်စေသည်။", "STEP 2 — build method ကိုpure လိုထားမယ်", "`build` ကိုအကြိမ်များစွာခေါ်နိုင်သောကြောင့်network request သို့မဟုတ်controller အသစ်ဖန်တီးခြင်းကိုbuild ထဲမလုပ်ပါနှင့်။ build သည်လက်ရှိstate အရဘယ်UI ပြမည်ကိုသာပြန်ပေးသင့်သည်။", "class WelcomePage extends StatelessWidget {\n  const WelcomePage({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('My First App')),\n      body: const Center(child: Text('Hello Flutter')),\n    );\n  }\n}", [{ label: "StatelessWidget", detail: "ကိုယ်ပိုင်ပြောင်းလဲနေသောstate မလိုသောUI အတွက်သုံးသည်။" }, { label: "BuildContext", detail: "widget tree ထဲရှိcurrent location နှင့်theme/navigation စသည့်inherited data ကိုရယူရာတွင်သုံးသည်။" }, { label: "const", detail: "မပြောင်းမည့်widget ကိုconst လုပ်ထားလျှင်rebuild cost လျော့စေသည်။" }], "Scaffold, AppBar, Center, Text ပါသောscreen တစ်ခုရေးပြီးwidget tree ကိုစာရွက်ပေါ်တွင်indent ဖြင့်ဆွဲပါ။", ["widget tree ကိုဖတ်နိုင်သည်", "build method တာဝန်ကိုသိသည်", "const widget ရေးနိုင်သည်"]),
      lesson(28, "flutter-buttons-gestures", "Buttons, Gestures နှင့် setState()", "User နှိပ်သည့်action ကိုstate ပြောင်းလဲမှုနှင့်ချိတ်ပြီးcounter mini app ဖြင့်အဆင့်လိုက်လေ့လာပါ။", "၅၀ မိနစ်", ["setState", "FilledButton", "onPressed", "GestureDetector", "state"], "STEP 1 — User action နှင့်state", "Button နှိပ်ခြင်းသည်event ဖြစ်ပြီး counter value ပြောင်းခြင်းသည်state change ဖြစ်သည်။ Flutter သည်state ပြောင်းကြောင်းမသိလျှင်UI အသစ်မဆွဲနိုင်သောကြောင့်state owner ကframework ကိုအသိပေးရသည်။", "STEP 2 — setState ကဘာလုပ်သလဲ", "`setState` ထဲတွင်data ကိုပြောင်းလဲပြီး Flutter ကိုဒီwidget area ပြန်build လုပ်ရန်အသိပေးသည်။ setState ထဲတွင်ကြာမြင့်သောnetwork request မလုပ်ဘဲvalue update သာထားပါ။", "class CounterPage extends StatefulWidget {\n  const CounterPage({super.key});\n  @override\n  State<CounterPage> createState() => _CounterPageState();\n}\n\nclass _CounterPageState extends State<CounterPage> {\n  int count = 0;\n  void increment() => setState(() => count++);\n\n  @override\n  Widget build(BuildContext context) => Center(\n    child: FilledButton(onPressed: increment, child: Text('Count: $count')),\n  );\n}", [{ label: "State<CounterPage>", detail: "ပြောင်းလဲနေသောcount ကိုပိုင်ဆိုင်သည့်object ဖြစ်သည်။" }, { label: "setState", detail: "state ပြောင်းပြီးနောက်UI ပြန်build လုပ်ရန်Flutter ကိုအသိပေးသည်။" }, { label: "onPressed", detail: "button နှိပ်ချိန်ခေါ်မည့်callback ဖြစ်သည်။" }], "Increment နှင့်Reset button နှစ်ခုထည့်ပါ။ ထို့နောက် count 10 ရောက်လျှင်congratulation text ပြပါ။", ["event နှင့်state change ကွာခြားချက်သိသည်", "setState သုံးနိုင်သည်", "button callback ရေးနိုင်သည်"]),
      lesson(29, "flutter-lists-keys", "Dynamic Lists, Keys နှင့် Reusable Task Tile", "ListView.builder, item identity နှင့်reusable widget ကိုသုံးပြီးdata များသောUI ကိုတည်ဆောက်ပါ။", "၅၀ မိနစ်", ["ListView.builder", "Key", "reusable widget", "items", "dismiss"], "STEP 1 — Dynamic list ကိုbuilder ဖြင့်ဆောက်မယ်", "Item အရေအတွက်များလာနိုင်လျှင်children အားလုံးကိုတစ်ကြိမ်တည်းမဆောက်ဘဲ `ListView.builder` ကိုသုံးပါ။ ၎င်းကscreen တွင်မြင်ရသောitem အနီးအနားကိုလိုသလိုတည်ဆောက်ပေးသည်။", "STEP 2 — Key သည်item ၏နာမည်ပန်းကန်", "List ထဲတွင်item ထည့်/ဖျက်/reorder လုပ်သည့်အခါFlutter ကဘယ်widget သည်ဘယ်data နှင့်ဆိုင်သည်ကိုသိရန်stable key လိုသည်။ Index ကိုkey အဖြစ်သုံးခြင်းထက်database id ကဲ့သို့မပြောင်းသောidentifier သုံးပါ။", "ListView.builder(\n  itemCount: tasks.length,\n  itemBuilder: (context, index) {\n    final task = tasks[index];\n    return ListTile(\n      key: ValueKey(task.id),\n      title: Text(task.title),\n      trailing: Checkbox(value: task.isDone, onChanged: (_) {}),\n    );\n  },\n)", [{ label: "itemCount", detail: "builder ကဘယ်နှစ်item ဆောက်ရမည်ကိုသိစေသည်။" }, { label: "ValueKey(task.id)", detail: "data item ၏မပြောင်းသောidentity ကိုFlutter ထံပေးသည်။" }, { label: "ListTile", detail: "title, subtitle, leading, trailing စသည့်common list row layout ကိုလွယ်ကူစေသည်။" }], "Task model သုံးခုဖြင့်ListView.builder ရေးပါ။ Task တစ်ခုဖျက်ပြီးနောက်အခြားcheckbox များstate မလွဲကြောင်းစစ်ပါ။", ["ListView.builder သုံးနိုင်သည်", "stable key အရေးကြီးပုံသိသည်", "reusable tile ကိုဖန်တီးနိုင်သည်"]),
      lesson(30, "flutter-mini-project-step-by-step", "Mini Project — Step-by-Step Study Planner", "အရင်သင်ခန်းစာများကိုပေါင်းစပ်ပြီးadd, complete, empty state နှင့်local UI state ပါသောStudy Planner mini app ကိုတည်ဆောက်ပါ။", "၆၀ မိနစ်", ["mini project", "TextField", "ListView", "setState", "empty state"], "STEP 1 — အရင်ဆုံးအသေးဆုံးအလုပ်လုပ်သောversion", "App ကြီးကိုတစ်ခါတည်းမတည်ဆောက်ပါနှင့်။ ပထမဆုံးscreen, text input, add button နှင့်plain list တို့သာလုပ်ပါ။ ထို့နောက်complete toggle နှင့်empty state ကိုတစ်ဆင့်စီထည့်ပါ။", "STEP 2 — Feature တစ်ခုစီပြီးတိုင်းစမ်းမယ်", "Add feature ပြီးလျှင်blank input, duplicate title နှင့်စာရှည်title ဖြင့်စမ်းပါ။ Complete feature ပြီးလျှင်item အစီအစဉ်မလွဲကြောင်းနှင့်UI ကိုပြန်ဖွင့်ရင်ဘာဖြစ်မလဲကိုမှတ်ထားပါ။", "class StudyTask {\n  StudyTask({required this.id, required this.title, this.done = false});\n  final String id;\n  final String title;\n  bool done;\n}\n\nvoid addTask(String title) {\n  if (title.trim().isEmpty) return;\n  tasks.add(StudyTask(id: DateTime.now().toIso8601String(), title: title.trim()));\n}", [{ label: "StudyTask", detail: "mini app အတွင်းသုံးမည့်data model ဖြစ်သည်။" }, { label: "trim().isEmpty", detail: "အလွတ် သို့မဟုတ်space သာပါသောinput ကိုမသိမ်းစေသည်။" }, { label: "id", detail: "list item ကိုခွဲခြားရန်unique identity အဖြစ်သုံးသည်။" }], "Study Planner ကိုအဆင့် ၄ ဆင့်ဖြင့်လုပ်ပါ — 1) task add, 2) list display, 3) complete toggle, 4) empty state။ အဆင့်တစ်ခုစီပြီးလျှင်screenshot သို့မဟုတ်note တစ်ခုမှတ်ပါ။", ["smallest working version ကိုစတင်နိုင်သည်", "feature တစ်ခုစီစမ်းသပ်တတ်သည်", "mini project ကိုအဆင့်လိုက်တည်ဆောက်နိုင်သည်"]),
    ],
  },
];

export const allChapters = courseParts.flatMap((part) =>
  part.chapters.map((chapter) => ({ ...chapter, partId: part.id, partTitle: part.title })),
);

export function toEditableLessonContent(chapter: Chapter): EditableLessonContent {
  return {
    title: chapter.title,
    summary: chapter.summary,
    duration: chapter.duration,
    level: chapter.level,
    topics: chapter.topics,
    sections: chapter.sections,
    code: chapter.code,
    challenge: chapter.challenge,
    checklist: chapter.checklist,
  };
}

export function mergeEditableLessonContent(overrides: { chapterId: number; content: EditableLessonContent }[]) {
  const overridesByChapter = new Map(overrides.map((override) => [override.chapterId, override.content]));
  return allChapters.map((chapter) => {
    const override = overridesByChapter.get(chapter.id);
    return override ? { ...chapter, ...override } : chapter;
  });
}

export const glossaryTerms = [
  { term: "Widget", definition: "Flutter UI ကိုဖော်ပြသော immutable building block ဖြစ်သည်။" },
  { term: "State", definition: "Screen သို့မဟုတ် application တစ်ခု၏အချိန်နှင့်အမျှပြောင်းနိုင်သောအခြေအနေဖြစ်သည်။" },
  { term: "Future", definition: "နောက်မှရောက်လာမည့်တန်ဖိုး သို့မဟုတ် error ကိုကိုယ်စားပြုသော Dart object ဖြစ်သည်။" },
  { term: "Null Safety", definition: "မရှိနိုင်သောတန်ဖိုးကိုtype system အတွင်းထင်ရှားစွာဖော်ပြပေးသော Dart စနစ်ဖြစ်သည်။" },
  { term: "Repository", definition: "Data source မျိုးစုံကိုဖုံးကွယ်ပြီး domain အတွက်တစ်ခုတည်းသော data contract ပေးသောlayer ဖြစ်သည်။" },
  { term: "RLS", definition: "Row Level Security; user တစ်ဦးချင်းစီ၏ database row access ကိုserver-side တွင်ကန့်သတ်သောpolicy စနစ်ဖြစ်သည်။" },
  { term: "Deep Link", definition: "Application အတွင်းရှိscreen တစ်ခုသို့တိုက်ရိုက်ခေါ်ဆောင်သွားသောURL link ဖြစ်သည်။" },
  { term: "CI/CD", definition: "Code quality စစ်ဆေးခြင်းနှင့်build/release လုပ်ငန်းစဉ်ကိုအလိုအလျောက်ပြုလုပ်သောworkflow ဖြစ်သည်။" },
];

export function searchCourse(query: string, chapters = allChapters) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return [];

  return chapters.filter((chapter) => {
    const searchableText = [
      chapter.title,
      chapter.summary,
      chapter.partTitle,
      ...chapter.topics,
      ...chapter.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
      chapter.code.code,
      ...chapter.code.annotations.flatMap((annotation) => [annotation.label, annotation.detail]),
      ...chapter.studyGuide.objectives,
      ...chapter.studyGuide.codeWalkthrough,
      ...chapter.studyGuide.commonMistakes.flatMap((item) => [item.mistake, item.fix]),
      ...chapter.studyGuide.practiceSteps,
      chapter.challenge,
      ...chapter.checklist,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return searchableText.includes(normalized);
  });
}
