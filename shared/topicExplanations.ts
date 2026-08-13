export type TopicExplanation = {
  name: string;
  category: "Dart" | "Flutter";
  purpose: string;
  syntax: string;
  howItWorks: string;
  example: string;
  output: string;
  lineByLine: string[];
  mistakes: { mistake: string; fix: string }[];
  practicalUse: string;
};

const dartDeclarations: TopicExplanation[] = [
  {
    name: "var — တန်ဖိုးသတ်မှတ်ပြီး type ကို compiler ထံအပ်ခြင်း",
    category: "Dart",
    purpose: "တန်ဖိုးတစ်ခုကို နာမည်ပေးသိမ်းထားပြီး နောက်ပိုင်းတွင် ထိုတန်ဖိုးကို ဖတ်ရန်၊ function သို့ပို့ရန် သို့မဟုတ် တွက်ချက်မှုတွင် ပြန်သုံးရန် variable declaration ကိုသုံးပါသည်။ var သည် variable ဖြစ်သောကြောင့် တန်ဖိုးပြောင်းနိုင်သော်လည်း ပထမဆုံးထည့်သောတန်ဖိုးမှ type ကို Dart က ခန့်မှန်းထားပါသည်။",
    syntax: "var variableName = initialValue;",
    howItWorks: "`var score = 80;` ကို compiler က `score` သည် int ဖြစ်သည်ဟု နားလည်ပါသည်။ နောက်တစ်ကြောင်းတွင် `score = 95;` သည် int အတွင်းဖြစ်သောကြောင့်ရပြီး `score = 'A';` သည် type မတူသောကြောင့် compile-time error ဖြစ်ပါသည်။ var က type မရှိခြင်းမဟုတ်ဘဲ type ကို စာဖြင့်မရေးဘဲ compiler က infer လုပ်ပေးခြင်းဖြစ်ပါသည်။",
    example: "void main() {\n  var score = 80;\n  score = 95;\n  print(score);\n}",
    output: "95",
    lineByLine: ["`var score = 80;` သည် score အမည်ရှိ variable ကိုဖန်တီးပြီး 80 ကိုသိမ်းသည်။", "`score = 95;` သည် variable တစ်ခုတည်း၏တန်ဖိုးကိုပြန်ပြောင်းသည်။ type သည် int အတိုင်းပင်ဖြစ်သည်။", "`print(score);` သည်လက်ရှိတန်ဖိုး 95 ကို console တွင်ပြသည်။"],
    mistakes: [{ mistake: "var သုံးလျှင် မည်သည့် type မဆို ထည့်နိုင်သည်ဟုယူဆခြင်း", fix: "var သည် inferred type ရှိသော variable ဖြစ်ပါသည်။ Type ပြောင်းလိုလျှင် `Object` သို့မဟုတ် သင့်တော်သော parent type ကိုတိတိကျကျရေးပါ။" }, { mistake: "ပြောင်းရန်မလိုသည့်တန်ဖိုးတိုင်းကို var သုံးခြင်း", fix: "မပြောင်းရမည့်တန်ဖိုးများအတွက် final သို့မဟုတ် const ကိုရွေးပါ။" }],
    practicalUse: "Form ထဲမှ လက်ရှိစာသား၊ counter တန်ဖိုး၊ filter ရလဒ်ကဲ့သို့ အချိန်နှင့်အမျှပြောင်းနိုင်သော data များတွင် var သုံးနိုင်ပါသည်။"
  },
  {
    name: "final — တစ်ကြိမ်သတ်မှတ်ပြီး ပြန်မပြောင်းနိုင်သော reference",
    category: "Dart",
    purpose: "Object တစ်ခုကိုရရှိပြီးနောက် ထို variable ကို အခြား object သို့ပြန်ညွှန်းမသွားစေရန် final ကိုသုံးပါသည်။ runtime တွင် တန်ဖိုးရလာနိုင်သော်လည်း သတ်မှတ်ပြီးနောက် တစ်ကြိမ်ထပ်မပြောင်းနိုင်ပါ။",
    syntax: "final Type name = value;",
    howItWorks: "`final userId = fetchUserId();` ကဲ့သို့ function ပြီးမှရလာသောတန်ဖိုးကို final ဖြင့်သိမ်းနိုင်ပါသည်။ final သည် compile-time constant မဟုတ်သောကြောင့် runtime result ကိုလက်ခံနိုင်သည်။ သို့သော် variable ကိုအခြားတန်ဖိုးသို့ပြန် assign လုပ်လျှင် compiler ကတားပါသည်။",
    example: "void main() {\n  final createdAt = DateTime.now();\n  print(createdAt);\n  // createdAt = DateTime.now(); // Error\n}",
    output: "လက်ရှိအချိန်တစ်ခု၊ ဥပမာ 2026-08-14 10:30:00.000",
    lineByLine: ["`DateTime.now()` သည် program run ချိန်တွင်မှ အချိန်ကိုတွက်ပေးသော runtime expression ဖြစ်သည်။", "final ကြောင့် createdAt ကို အချိန်ရပြီးနောက် တစ်ကြိမ်သာသတ်မှတ်နိုင်သည်။", "Comment ထဲရှိ ပြန် assign လုပ်မှုကို ဖွင့်လိုက်လျှင် final variable ကိုပြန်ပြောင်းသည့် error ရမည်။"],
    mistakes: [{ mistake: "final object ထဲရှိ field အားလုံးမပြောင်းနိုင်ဟုယူဆခြင်း", fix: "final သည် variable reference ကိုကာကွယ်ခြင်းဖြစ်သည်။ Mutable List ၏အတွင်း item များပြောင်းနိုင်သေးသည်။ မပြောင်းစေချင်လျှင် unmodifiable collection သုံးပါ။" }],
    practicalUse: "User id, API response ရလာချိန်၊ controller reference နှင့် screen တစ်ခု၏ immutable configuration များတွင် final ကိုအသုံးများပါသည်။"
  },
  {
    name: "const — compile-time constant",
    category: "Dart",
    purpose: "Program မ run မီ compile လုပ်ချိန်တွင် တန်ဖိုးကိုသိပြီး မည်သည့်အချိန်တွင်မဆိုမပြောင်းရမည့် constant အတွက် const ကိုသုံးပါသည်။ Flutter တွင် const widget သည် မလိုအပ်ဘဲပြန်ဖန်တီးမှုကိုလျှော့ချနိုင်ပါသည်။",
    syntax: "const Type name = constantExpression;",
    howItWorks: "const expression အတွင်း runtime data မပါရပါ။ `const greeting = 'Hello';` သည် compile-time တွင်သိနိုင်သော်လည်း `const now = DateTime.now();` သည် လက်ရှိအချိန်ကို run ချိန်မှသိရသောကြောင့်မရပါ။ const object များကို Dart က canonicalize လုပ်နိုင်သဖြင့် တူညီသော constant instance ကိုပြန်သုံးနိုင်ပါသည်။",
    example: "const appName = 'Dart & Flutter Masterclass';\n\nvoid main() {\n  const maxLessons = 56;\n  print('$appName — $maxLessons chapters');\n}",
    output: "Dart & Flutter Masterclass — 56 chapters",
    lineByLine: ["`appName` နှင့် `maxLessons` တို့သည် run မတိုင်မီတန်ဖိုးသိပြီးသားဖြစ်သည်။", "String interpolation ဖြင့် constant နှစ်ခုကို စာသားတစ်ကြောင်းထဲပေါင်းသည်။", "`const DateTime.now()` ကဲ့သို့ runtime value ကို const ဖြင့်မသတ်မှတ်နိုင်ပါ။"],
    mistakes: [{ mistake: "final နှင့် const ကိုတူသည်ဟုထင်ခြင်း", fix: "final သည် runtime တွင်တစ်ကြိမ်သတ်မှတ်နိုင်ပြီး const သည် compile-time တွင်သိရမည့်တန်ဖိုးဖြစ်သည်။" }, { mistake: "const ကို widget နေရာတိုင်းတွင်အတင်းထည့်ခြင်း", fix: "constructor နှင့် data သည် constant ဖြစ်နိုင်သည့်နေရာတွင်သာသုံးပါ။" }],
    practicalUse: "App name, spacing constant, static label, immutable Flutter widget နှင့် theme configuration များတွင် const သုံးပါ။"
  },
  {
    name: "late — နောက်မှ initialize လုပ်မည့် non-nullable variable",
    category: "Dart",
    purpose: "တန်ဖိုးသည် ချက်ချင်းမရသေးသော်လည်း အသုံးမပြုမီ မဖြစ်မနေ initialize လုပ်မည်ဟု Dart ကိုကတိပေးလိုသောအခါ late ကိုသုံးပါသည်။",
    syntax: "late Type name;\nname = value;",
    howItWorks: "late variable ကို declaration ချိန်တွင်တန်ဖိုးမပေးသေးနိုင်ပါသည်။ သို့သော် read မလုပ်မီ value မပေးထားလျှင် LateInitializationError ဖြစ်ပါသည်။ `late final` ဆိုလျှင် နောက်မှတစ်ကြိမ်သာပေးပြီး ပြန်မပြောင်းနိုင်ပါ။",
    example: "class Profile {\n  late final String displayName;\n\n  void load() {\n    displayName = 'မောင်မောင်';\n  }\n}\n\nvoid main() {\n  final profile = Profile();\n  profile.load();\n  print(profile.displayName);\n}",
    output: "မောင်မောင်",
    lineByLine: ["Profile ဖန်တီးချိန်တွင် displayName မရသေးသောကြောင့် late ဖြင့်ကြေညာသည်။", "load() က data ရလာသည့်အချိန်တွင် displayName ကိုသတ်မှတ်သည်။", "load() ပြီးမှဖတ်သောကြောင့် error မဖြစ်ပါ။"],
    mistakes: [{ mistake: "late ကိုသုံးပြီး initialization flow မစီစဉ်ခြင်း", fix: "အသုံးပြုမည့်အချိန်မတိုင်မီ value သတ်မှတ်မည်ကို lifecycle ဖြင့်သေချာစီစဉ်ပါ။ မသေချာလျှင် nullable type သုံးပါ။" }],
    practicalUse: "Flutter State ၏ controller, animation controller နှင့် initState အတွင်းမှသာဖန်တီးနိုင်သည့် object များတွင် late ကိုတွေ့ရပါသည်။"
  }
];

const flutterWidgets: TopicExplanation[] = [
  {
    name: "Text() — စာသားကို screen ပေါ်ပြသခြင်း",
    category: "Flutter",
    purpose: "Text widget သည် string တန်ဖိုးကို Flutter widget tree ထဲတွင် ထည့်ပြီး screen ပေါ်တွင်ဖတ်ရှုနိုင်သောစာသားအဖြစ် render လုပ်ပေးပါသည်။",
    syntax: "Text('စာသား', style: TextStyle(...), maxLines: 1, overflow: TextOverflow.ellipsis)",
    howItWorks: "Text ကို build method ထဲတွင်ပြန်ပေးသောအခါ Flutter က text data, style, direction နှင့် constraints ကိုယူပြီး layout အရွယ်အစားတွက်ပါသည်။ Parent ကပေးသော width မလုံလောက်လျှင် maxLines နှင့် overflow မသတ်မှတ်ထားပါက စာကြောင်းကျော်ခြင်းဖြစ်နိုင်ပါသည်။",
    example: "class Greeting extends StatelessWidget {\n  const Greeting({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return const Text(\n      'မင်္ဂလာပါ Flutter',\n      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),\n    );\n  }\n}",
    output: "screen ပေါ်တွင် 24px အရွယ် bold ဖြင့် “မင်္ဂလာပါ Flutter” ဟုပေါ်မည်။",
    lineByLine: ["StatelessWidget သည် input မပြောင်းလျှင် UI behavior မပြောင်းသော widget ဖြစ်သည်။", "Text ၏ပထမ argument သည် screen တွင်ပြမည့် string ဖြစ်သည်။", "TextStyle က font size နှင့် weight ကိုသတ်မှတ်သည်။ const သုံးနိုင်ခြင်းမှာ input များ compile-time constant ဖြစ်သောကြောင့်ဖြစ်သည်။"],
    mistakes: [{ mistake: "စာရှည်ကို Text တွင် maxLines/overflow မစဉ်းစားခြင်း", fix: "လိုအပ်ပါက maxLines နှင့် TextOverflow.ellipsis ထည့်ပြီး parent constraints ကိုစစ်ပါ။" }, { mistake: "Text ထဲတွင် data logic အများကြီးထည့်ခြင်း", fix: "စာသားကို အရင်တွက်ပြီး Text သို့ရလဒ်ပေးပါ။ UI widget ကို display တာဝန်အဓိကထားပါ။" }],
    practicalUse: "ခေါင်းစဉ်၊ label, error message, empty state, button စာသားနှင့် user-generated content ပြသရာတွင် Text ကိုသုံးပါသည်။"
  },
  {
    name: "Column() — children များကို အပေါ်မှအောက် စီပေးခြင်း",
    category: "Flutter",
    purpose: "Column သည် widget များကို vertical axis အတိုင်းတန်းစီရန်သုံးပါသည်။ Form, detail page နှင့် settings screen များတွင် အခြေခံအကျဆုံး layout ဖြစ်သည်။",
    syntax: "Column(mainAxisAlignment: ..., crossAxisAlignment: ..., children: <Widget>[...])",
    howItWorks: "Column ၏ main axis သည် vertical ဖြစ်ပြီး cross axis သည် horizontal ဖြစ်ပါသည်။ mainAxisAlignment က အပေါ်/အလယ်/အောက်နေရာချထားပုံကို၊ crossAxisAlignment က ဘယ်/အလယ်/ညာ alignment ကိုဆုံးဖြတ်ပါသည်။ children များ၏စုစုပေါင်းအမြင့် parent ကပေးနိုင်သည့်အမြင့်ထက်ကျော်လျှင် overflow ဖြစ်နိုင်ပါသည်။",
    example: "Column(\n  crossAxisAlignment: CrossAxisAlignment.start,\n  children: const [\n    Text('အမည်'),\n    SizedBox(height: 8),\n    Text('Arkar Yan'),\n  ],\n)",
    output: "အမည်စာသားနှင့် Arkar Yan စာသားသည် အပေါ်မှအောက် 8px အကွာဖြင့် ဘယ်ဘက်ညှိပေါ်မည်။",
    lineByLine: ["children list ထဲရှိ widget များကို အစဉ်လိုက် vertical အတိုင်းစီသည်။", "crossAxisAlignment.start က Column ၏ဘယ်ဘက်စွန်းတွင်ညှိသည်။", "SizedBox က widget နှစ်ခုကြား fixed gap တစ်ခုဖန်တီးသည်။"],
    mistakes: [{ mistake: "အမြင့်မကန့်သတ်သော Column ကို scroll မလုပ်နိုင်သောနေရာတွင်သုံးခြင်း", fix: "စာများနိုင်ပါက SingleChildScrollView သို့မဟုတ် ListView ကိုစဉ်းစားပါ။" }, { mistake: "Column ထဲတွင် Expanded ကိုမသင့်တော်သောနေရာတွင်ထည့်ခြင်း", fix: "Expanded သည် bounded main-axis constraint ရှိသော Row/Column အတွင်းမှာသာသုံးပါ။" }],
    practicalUse: "Login form, profile detail, lesson content, settings menu နှင့် vertical card layout များတွင် Column ကိုအသုံးပြုပါသည်။"
  },
  {
    name: "Row() — children များကို ဘယ်မှညာ စီပေးခြင်း",
    category: "Flutter",
    purpose: "Row သည် icon, title, trailing action ကဲ့သို့ widget များကို horizontal axis အတိုင်းတန်းစီရန်သုံးပါသည်။",
    syntax: "Row(mainAxisAlignment: ..., crossAxisAlignment: ..., children: <Widget>[...])",
    howItWorks: "Row ၏ main axis သည် horizontal ဖြစ်သည်။ Parent width ထဲတွင် children အားလုံးမဆံ့လျှင် overflow ဖြစ်နိုင်သဖြင့် စာသားကဲ့သို့ flexible child ကို Expanded သို့မဟုတ် Flexible ဖြင့် wrap လုပ်ရပါသည်။",
    example: "Row(\n  children: [\n    const Icon(Icons.book),\n    const SizedBox(width: 8),\n    const Expanded(child: Text('Dart နှင့် Flutter Masterclass')),\n    IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert)),\n  ],\n)",
    output: "စာအုပ် icon၊ ကျန်နေရာယူသော title နှင့် ညာဘက် menu button တို့ တစ်တန်းတည်းပေါ်မည်။",
    lineByLine: ["Icon သည် visual symbol တစ်ခုကိုပြသည်။", "SizedBox က icon နှင့်စာကြား horizontal gap ပေးသည်။", "Expanded က title ကိုကျန် width ထဲတွင်ထားပြီး menu button အတွက်နေရာချန်ထားသည်။"],
    mistakes: [{ mistake: "Row ထဲတွင်ရှည်သော Text ကို Expanded မသုံးခြင်း", fix: "Text ကို Expanded/Flexible ဖြင့် wrap လုပ်ပြီး overflow မဖြစ်အောင်လုပ်ပါ။" }, { mistake: "Row/Column axis ကိုပြောင်းပြန်မှတ်ခြင်း", fix: "Row = horizontal, Column = vertical ဟုအမြဲမှတ်ထားပါ။" }],
    practicalUse: "List tile, toolbar, card header, icon-label pair နှင့် action bar များတွင် Row ကိုသုံးပါသည်။"
  },
  {
    name: "Container() — padding, margin, color နှင့် decoration စုပေါင်းပေးခြင်း",
    category: "Flutter",
    purpose: "Container သည် child widget ကို padding, alignment, size, color, border နှင့် decoration တို့ဖြင့်အလှဆင်ပြီး layout ထဲတွင်နေရာချရန်သုံးသော convenience widget ဖြစ်သည်။",
    syntax: "Container(padding: ..., margin: ..., decoration: ..., child: Widget)",
    howItWorks: "Container သည် အတွင်းမှ child ကို padding ဖြင့်ဝန်းရံပြီး အပြင်ဘက်မှ margin ဖြင့်အကွာပေးနိုင်ပါသည်။ color နှင့် decoration ကိုတစ်ပြိုင်နက်မသတ်မှတ်ရပါ။ border radius လိုပါက BoxDecoration ကိုအသုံးပြုပါ။",
    example: "Container(\n  margin: const EdgeInsets.all(16),\n  padding: const EdgeInsets.all(20),\n  decoration: BoxDecoration(\n    color: Colors.teal.shade50,\n    borderRadius: BorderRadius.circular(16),\n  ),\n  child: const Text('သင်ခန်းစာ card'),\n)",
    output: "အစိမ်းဖျော့နောက်ခံ၊ rounded corners၊ အတွင်း padding 20 နှင့် အပြင် margin 16 ပါသော card ပေါ်မည်။",
    lineByLine: ["margin သည် Container အပြင်ဘက်ရှိ sibling များနှင့်အကွာဖြစ်သည်။", "padding သည် Container border နှင့် child ကြားအကွာဖြစ်သည်။", "BoxDecoration က color နှင့် rounded border အပါအဝင် decoration များကိုစုပေါင်းပေးသည်။"],
    mistakes: [{ mistake: "padding နှင့် margin ကိုတူသည်ဟုထင်ခြင်း", fix: "padding = အတွင်းအကွာ၊ margin = အပြင်အကွာ ဟုခွဲမှတ်ပါ။" }, { mistake: "Container ကို layout problem တိုင်းအတွက်အလွယ်သုံးခြင်း", fix: "အရောင်မလိုလျှင် Padding, SizedBox, Align ကဲ့သို့ ရည်ရွယ်ချက်တိကျသော widget သုံးပါ။" }],
    practicalUse: "Card, alert, badge, section background နှင့် lesson information block များတွင် Container ကိုသုံးပါသည်။"
  },
  {
    name: "Scaffold() — screen တစ်ခု၏ Material အခြေခံဖွဲ့စည်းပုံ",
    category: "Flutter",
    purpose: "Scaffold သည် AppBar, body, Drawer, FloatingActionButton, bottomNavigationBar နှင့် SnackBar တို့ကို screen တစ်ခုအတွင်း စနစ်တကျနေရာချရန် Material layout structure ပေးပါသည်။",
    syntax: "Scaffold(appBar: AppBar(...), body: Widget, drawer: Drawer(...))",
    howItWorks: "Scaffold သည် screen ၏အဓိက slot များကိုသတ်မှတ်ပေးပြီး MediaQuery/Material behavior နှင့်အညီ layout ချိန်ညှိပေးပါသည်။ Scaffold တစ်ခုထဲတွင် Scaffold ထပ်ထည့်ခြင်းက မလိုအပ်ဘဲ navigation နှင့် SnackBar context ပြဿနာဖြစ်စေနိုင်ပါသည်။",
    example: "Scaffold(\n  appBar: AppBar(title: const Text('သင်ခန်းစာ')),\n  body: const Center(child: Text('ဖတ်ရှုရန်')),\n  floatingActionButton: FloatingActionButton(\n    onPressed: () {},\n    child: const Icon(Icons.add),\n  ),\n)",
    output: "အပေါ်တွင် AppBar၊ အလယ်တွင် content နှင့် ညာအောက်တွင် add floating button ပေါ်မည်။",
    lineByLine: ["appBar slot သည် screen ထိပ်ရှိ app navigation/title နေရာဖြစ်သည်။", "body သည် screen ၏အဓိက content နေရာဖြစ်သည်။", "floatingActionButton သည် အဓိက action တစ်ခုကို ထင်ရှားစွာပြသည်။"],
    mistakes: [{ mistake: "body အတွင်း SafeArea မစဉ်းစားခြင်း", fix: "notch/status bar နှင့် home indicator အောက်မဝင်စေရန် SafeArea သို့မဟုတ် Scaffold behavior ကိုစစ်ပါ။" }, { mistake: "screen တစ်ခုတွင် Scaffold အများကြီးထည့်ခြင်း", fix: "ပုံမှန်အားဖြင့် page တစ်ခုတွင် Scaffold တစ်ခုထားပြီး child widget များကို body ထဲတွင်စီပါ။" }],
    practicalUse: "Flutter app ၏ page တစ်ခုချင်းစီတွင် app bar, body, drawer နှင့် actions ကိုတည်ဆောက်ရာ၌ Scaffold သည်အခြေခံအုတ်မြစ်ဖြစ်ပါသည်။"
  },
  {
    name: "Drawer() — ဘေးမှဖွင့်သော navigation panel",
    category: "Flutter",
    purpose: "Drawer သည် screen ဘယ်ဘက်မှ slide လုပ်ဖွင့်နိုင်သော navigation panel ဖြစ်ပြီး menu item များ၊ account information နှင့် section switching အတွက်အသုံးပြုပါသည်။",
    syntax: "Scaffold(drawer: Drawer(child: ListView(children: [...])));",
    howItWorks: "Scaffold ၏ drawer property ထဲ Drawer ထည့်ထားလျှင် AppBar ၏ leading menu icon နှိပ်ခြင်းဖြင့် Flutter က drawer ကိုဖွင့်ပေးပါသည်။ ListTile တစ်ခုရွေးပြီးနောက် `Navigator.pop(context)` ဖြင့် drawer ကိုအရင်ပိတ်ပြီး route သို့သွားခြင်းသည် ပုံမှန် flow ဖြစ်ပါသည်။",
    example: "Scaffold(\n  drawer: Drawer(\n    child: ListView(\n      padding: EdgeInsets.zero,\n      children: [\n        const DrawerHeader(child: Text('Menu')),\n        ListTile(\n          leading: const Icon(Icons.home),\n          title: const Text('ပင်မစာမျက်နှာ'),\n          onTap: () => Navigator.pop(context),\n        ),\n      ],\n    ),\n  ),\n)",
    output: "menu icon နှိပ်လျှင် ဘေးမှ panel ပေါ်လာပြီး ပင်မစာမျက်နှာ item ကိုရွေးနိုင်မည်။",
    lineByLine: ["Drawer ကို Scaffold ၏drawer slot ထဲတွင်ထည့်သည်။", "ListView သည် menu item များများလာလျှင် scroll လုပ်နိုင်စေသည်။", "Navigator.pop(context) သည် လက်ရှိဖွင့်ထားသော drawer route ကိုပိတ်သည်။"],
    mistakes: [{ mistake: "Drawer item နှိပ်ပြီး drawer မပိတ်ခြင်း", fix: "route ပြောင်းမီ `Navigator.pop(context)` ဖြင့် drawer ကိုပိတ်ပါ။" }, { mistake: "menu item အားလုံးတွင်တူညီသောactive state ထားခြင်း", fix: "လက်ရှိ route/section ကို state တစ်ခုတည်းမှတွက်ပြီး selected state ပြပါ။" }],
    practicalUse: "စာအုပ်အခန်းများ၊ account settings, help, logout နှင့် app sections များကို mobile navigation အဖြစ်ပြရာတွင် Drawer ကိုသုံးပါသည်။"
  },
  {
    name: "Button — user action ကို callback နှင့်ချိတ်ခြင်း",
    category: "Flutter",
    purpose: "Button widget များသည် user ၏ tap action ကို callback function တစ်ခုနှင့်ချိတ်ပြီး state ပြောင်းခြင်း၊ navigation သွားခြင်း သို့မဟုတ် data save လုပ်ခြင်းကိုစတင်စေပါသည်။",
    syntax: "FilledButton(onPressed: callback, child: Text('သိမ်းမည်'))",
    howItWorks: "`onPressed` ထဲကို function reference ပေးထားလျှင် button နှိပ်ချိန်တွင် Flutter ကထို function ကိုခေါ်ပါသည်။ `onPressed: null` ဖြစ်လျှင် button disabled ဖြစ်သည်။ callback ထဲတွင် state ပြောင်းမည်ဆိုလျှင် StatefulWidget ၏ setState သို့မဟုတ် state management action ကိုသုံးရပါသည်။",
    example: "class SaveButton extends StatelessWidget {\n  const SaveButton({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return FilledButton(\n      onPressed: () => ScaffoldMessenger.of(context).showSnackBar(\n        const SnackBar(content: Text('သိမ်းပြီးပါပြီ')),\n      ),\n      child: const Text('သိမ်းမည်'),\n    );\n  }\n}",
    output: "သိမ်းမည်ကိုနှိပ်လျှင် screen အောက်ခြေတွင် သိမ်းပြီးပါပြီ ဟူသော SnackBar ပေါ်မည်။",
    lineByLine: ["FilledButton သည် primary action ကိုထင်ရှားစွာပြသော Material button ဖြစ်သည်။", "onPressed တွင် arrow function ဖြင့် tap ဖြစ်ချိန်လုပ်ရမည့်အလုပ်ကိုပေးသည်။", "SnackBar သည်ခဏတာ feedback message ကို Scaffold အပေါ်ပြသည်။"],
    mistakes: [{ mistake: "function ကိုချက်ချင်းခေါ်ပြီး ရလဒ်ကို onPressed သို့ပေးခြင်း (`onPressed: save()`)၊", fix: "function reference သို့မဟုတ် callback ပေးပါ (`onPressed: save` သို့မဟုတ် `() => save()`)။" }, { mistake: "loading အချိန်တွင် button မပိတ်ခြင်း", fix: "request လုပ်နေချိန် `onPressed: null` သို့မဟုတ် loading state ဖြင့် double-submit ကာကွယ်ပါ။" }],
    practicalUse: "Save, submit, login, next lesson, retry နှင့် destructive action confirmation များတွင် button callback ကိုသုံးပါသည်။"
  }
];

const pdfProjectTopics: TopicExplanation[] = [
  {
    name: "HTTP Request Anatomy — method, URL, header, body နှင့် status",
    category: "Flutter",
    purpose: "Network feature တစ်ခုကို ရေးရာမှာ request တစ်ခုထဲတွင် ဘာတွေပါဝင်သည်ကို သိမှ API error ကို မှန်ကန်စွာရှာနိုင်ပါသည်။ URL က ဘယ် resource ကိုသွားမည်၊ method က ဘာလုပ်မည်၊ header က metadata/authorization ကိုသယ်မည်၊ body ကပို့မည့် data ဖြစ်ပြီး status code က server ရလဒ်ကိုပြပါသည်။",
    syntax: "final response = await client.get(Uri.parse(url), headers: headers);",
    howItWorks: "Dart ၏ await သည် network response ပြန်ရောက်သည်အထိ function flow ကို ခဏရပ်ထားသော်လည်း UI thread ကို မပိတ်ပါ။ Response ရောက်လာလျှင် statusCode ကိုစစ်ပြီး 200 range ကို success, 400 range ကို client input problem, 500 range ကို server problem အဖြစ် UI state သို့ map လုပ်ရပါသည်။",
    example: "Future<String> loadGreeting(http.Client client) async {\n  final uri = Uri.parse('https://example.com/greeting');\n  final response = await client.get(\n    uri,\n    headers: {'Accept': 'application/json'},\n  );\n\n  if (response.statusCode != 200) {\n    throw Exception('Request failed: ${response.statusCode}');\n  }\n  return response.body;\n}",
    output: "statusCode 200 ရလျှင် response.body ကို UI model သို့ parse လုပ်နိုင်ပြီး error status ဖြစ်လျှင် error state သို့ပြောင်းနိုင်သည်။",
    lineByLine: ["Uri.parse သည် string URL ကို Dart ၏ Uri object အဖြစ်ပြောင်းသည်။", "await client.get သည် GET request ပို့ပြီး response မရမချင်း Future ကိုစောင့်သည်။", "Accept header က server ထံမှ မျှော်မှန်းသော response format ကိုပြသည်။", "statusCode စစ်ခြင်းမရှိဘဲ body ကိုအသုံးပြုလျှင် error JSON ကို success data ဟုမှားဖတ်နိုင်သည်။"],
    mistakes: [{ mistake: "API key ကို Flutter client ထဲ hardcode လုပ်ခြင်း", fix: "လျှို့ဝှက် key နှင့် authorization decision ကို server boundary နောက်တွင်ထားပါ။" }, { mistake: "loading/error state မပြဘဲ request တစ်ခုတည်းကို screen build ထဲခေါ်ခြင်း", fix: "initState, controller သို့မဟုတ် state management flow ထဲတွင် တစ်ကြိမ်စီစီမံပြီး loading, success, error state သုံးမျိုးပြပါ။" }],
    practicalUse: "Login, product list, chat messages, profile update နှင့် remote configuration feature များတွင် request anatomy ကို ဒီပုံစံဖြင့်ဖတ်ပါ။"
  },
  {
    name: "Audio Progress — duration နှင့် position ကို UI နှင့်ချိတ်ခြင်း",
    category: "Flutter",
    purpose: "Song player တွင် play/pause ခလုတ်တင်မကဘဲ သီချင်းဘယ်လောက်ကြာသည်၊ လက်ရှိဘယ်နေရာရောက်သည်နှင့် user က ဘယ်နေရာသို့ seek လုပ်လိုသည်ကို ပြသရန် duration နှင့် position state လိုအပ်ပါသည်။",
    syntax: "StreamBuilder<Duration>(stream: positionStream, builder: (_, snapshot) => Slider(value: seconds, onChanged: seek));",
    howItWorks: "Audio engine က position update များကို stream ဖြင့်ပို့နိုင်ပါသည်။ Widget က stream ကိုနားထောင်ပြီး snapshot data ပြောင်းတိုင်း rebuild လုပ်သည်။ Slider value သည် 0 နှင့် duration ကြားတွင်သာရှိရပြီး duration မရသေးချိန်တွင် division by zero နှင့် invalid value မဖြစ်အောင် guard လုပ်ရပါသည်။",
    example: "class SongProgress extends StatelessWidget {\n  const SongProgress({required this.position, required this.duration, super.key});\n  final Duration position;\n  final Duration duration;\n\n  @override\n  Widget build(BuildContext context) {\n    final max = duration.inMilliseconds.toDouble();\n    final value = max == 0\n        ? 0.0\n        : position.inMilliseconds.clamp(0, duration.inMilliseconds).toDouble();\n    return Slider(value: value, max: max == 0 ? 1 : max, onChanged: (_) {});\n  }\n}",
    output: "သီချင်းဖွင့်နေစဉ် slider thumb သည် လက်ရှိ position အတိုင်းရွေ့ပြီး duration မရသေးချိန်တွင် crash မဖြစ်ပါ။",
    lineByLine: ["position နှင့် duration ကို widget input အဖြစ်ခွဲထားခြင်းသည် player engine နှင့် UI ကိုမရောစေပါ။", "max သည် slider ၏အဆုံးတန်ဖိုးဖြစ်သည်။", "clamp သည် server/player မှရလာသောတန်ဖိုးကို valid range အတွင်းကာကွယ်သည်။", "duration သုညဖြစ်လျှင် max ကို 1 သတ်မှတ်ခြင်းက Slider assertion ကိုရှောင်သည်။"],
    mistakes: [{ mistake: "duration သုညဖြစ်နိုင်သည်ကို မစစ်ခြင်း", fix: "metadata မရသေးချိန်တွင် fallback max/value ထားပါ။" }, { mistake: "controller ကို dispose မလုပ်ခြင်း", fix: "StatefulWidget ၏ dispose ထဲတွင် audio controller နှင့် stream subscription ကိုပိတ်ပါ။" }],
    practicalUse: "Music app, podcast, audiobook နှင့် video player များတွင် progress UI တည်ဆောက်ရာ၌သုံးပါ။"
  },
  {
    name: "Infinite ListView — စာရင်းရှည်ကို page အလိုက်တင်ခြင်း",
    category: "Flutter",
    purpose: "Data အားလုံးကို တစ်ခါတည်း download မလုပ်ဘဲ user scroll နီးလာချိန်တွင် နောက်ထပ် page တစ်ခုတောင်းခြင်းက memory, startup time နှင့် network cost ကိုလျှော့စေပါသည်။",
    syntax: "if (controller.position.pixels >= controller.position.maxScrollExtent - 240) loadNextPage();",
    howItWorks: "ScrollController သည် scroll position ကိုသိစေပါသည်။ maxScrollExtent အနီးရောက်လျှင် loading flag ကိုစစ်ပြီး page number တိုးကာ API request ပို့ရပါသည်။ loading flag မထားလျှင် scroll event များကြောင့် request အများကြီးထပ်ပို့နိုင်ပါသည်။",
    example: "void onScroll() {\n  final nearBottom = controller.position.pixels >=\n      controller.position.maxScrollExtent - 240;\n  if (nearBottom && !isLoading && hasMore) {\n    loadNextPage();\n  }\n}",
    output: "စာရင်းအောက်ဆုံးမရောက်မီ နောက်ထပ် data တက်လာပြီး request များ ထပ်ခါတလဲလဲ မပို့ပါ။",
    lineByLine: ["pixels သည် လက်ရှိ scroll offset ဖြစ်သည်။", "maxScrollExtent သည် scroll ရနိုင်သောအဆုံးကိုပြသည်။", "240 သည် ကြိုတင်တင်ရန် threshold ဖြစ်သည်။", "isLoading နှင့် hasMore သည် duplicate request နှင့် data ကုန်ပြီးနောက် request ကိုကာကွယ်သည်။"],
    mistakes: [{ mistake: "ListView item key မပေးခြင်း", fix: "ပြောင်းလဲနိုင်သော list တွင် stable Key သုံးပြီး state မလွဲစေပါနှင့်။" }, { mistake: "scroll listener ကို dispose မလုပ်ခြင်း", fix: "dispose ထဲတွင် controller.removeListener နှင့် controller.dispose ကိုလုပ်ပါ။" }],
    practicalUse: "Name generator, product catalog, social feed, search result နှင့် admin table များတွင်သုံးပါ။"
  },
  {
    name: "Debug Assertion — error ကို အစောဆုံးဖမ်းခြင်း",
    category: "Flutter",
    purpose: "Assertion သည် developer က မဖြစ်သင့်ဟုသတ်မှတ်ထားသော condition ကို debug mode တွင်စစ်ပြီး data မမှန်လျှင် error ကို အစောဆုံးပြစေပါသည်။ UI ပျက်ပြီးနောက်မှ ခန့်မှန်းခြင်းထက် invalid state ကို boundary မှာဖမ်းနိုင်ပါသည်။",
    syntax: "assert(items.isNotEmpty, 'items must not be empty');",
    howItWorks: "Debug mode တွင် condition false ဖြစ်လျှင် assertion error ထွက်ပြီး stack trace က code နေရာကိုပြပါသည်။ Release mode တွင် assertion များကို မမှီခိုသင့်သောကြောင့် user input validation သို့မဟုတ် security check အစား မသုံးရပါ။",
    example: "class ProductList extends StatelessWidget {\n  const ProductList({required this.items, super.key});\n  final List<String> items;\n\n  @override\n  Widget build(BuildContext context) {\n    assert(items.isNotEmpty, 'Product list cannot be empty here');\n    return ListView(children: items.map(Text.new).toList());\n  }\n}",
    output: "Debug run တွင် items အလွတ်ဖြစ်ပါက stack trace နှင့် ရှင်းလင်းသော message ရမည်။",
    lineByLine: ["items သည် widget ထံရောက်လာသော input list ဖြစ်သည်။", "assert က developer contract ကိုစစ်သည်။", "map(Text.new) က item တစ်ခုချင်းကို Text widget အဖြစ်ပြောင်းသည်။", "Empty state လိုအပ်သော screen များတွင် assertion အစား UI empty state ကိုပြပါ။"],
    mistakes: [{ mistake: "assert ကို security validation အဖြစ်သုံးခြင်း", fix: "server validation, permission check နှင့် user-facing validation ကို သီးခြားလုပ်ပါ။" }, { mistake: "production တွင် assertion အမြဲ run မည်ဟုယူဆခြင်း", fix: "release behavior အတွက်လည်း သင့်တော်သော error handling ထည့်ပါ။" }],
    practicalUse: "Widget contract, model invariant, debugging workflow နှင့် regression စမ်းသပ်မှုများတွင် assertion သုံးပါ။"
  },
  {
    name: "Flutter Doctor — development environment ကို အထောက်အထားဖြင့်စစ်ခြင်း",
    category: "Flutter",
    purpose: "Flutter SDK တင်ပြီးသည်ဟုထင်ရုံနှင့် project မ run နိုင်သေးပါ။ flutter doctor သည် SDK, Android toolchain, connected device နှင့် editor integration တို့၏အခြေအနေကို စုစည်းပြသသော diagnostic command ဖြစ်သည်။",
    syntax: "flutter doctor -v\nflutter devices\nflutter run",
    howItWorks: "Doctor output ထဲရှိ check mark, warning နှင့် error ကို အုပ်စုခွဲဖတ်ရပါသည်။ Warning အားလုံးကို အတင်းဖျောက်ရန်မဟုတ်ဘဲ ကိုယ်တည်ဆောက်မည့် platform အတွက်လိုအပ်သော toolchain ကို အရင်ပြင်ရပါသည်။ `-v` သည် version/path အသေးစိတ်ကို ထုတ်ပေးပြီး PATH သို့မဟုတ် license error ရှာရာတွင်အထောက်အကူဖြစ်သည်။",
    example: "# Terminal\nflutter --version\nflutter doctor -v\nflutter devices\nflutter run",
    output: "Flutter version, doctor checklist, ရှာတွေ့သော emulator/device နှင့် app run log ကို အဆင့်လိုက်တွေ့ရမည်။",
    lineByLine: ["flutter --version သည် SDK ကို shell ကတွေ့နိုင်ကြောင်းစစ်သည်။", "doctor -v သည် platform toolchain ၏အသေးစိတ်ကိုပြသည်။", "devices သည် run မည့် target ရှိ/မရှိစစ်သည်။", "run သည်ရွေးထားသော device ပေါ်တွင် app ကိုတည်ဆောက်ပြီးဖွင့်သည်။"],
    mistakes: [{ mistake: "warning/error စာကိုမဖတ်ဘဲ command ထပ်ခေါ်ခြင်း", fix: "လိုအပ်သော Android SDK, license, PATH သို့မဟုတ် device permission ကို output အတိုင်း ပြင်ပါ။" }],
    practicalUse: "Team member အသစ် setup, CI runner စစ်ဆေးမှုနှင့် release မတိုင်မီ environment diagnosis တွင်သုံးပါ။"
  },
  {
    name: "Login Form — controller, validator နှင့် submit state",
    category: "Flutter",
    purpose: "Login UI သည် input box နှစ်ခုထားခြင်းထက် user input ကိုဖတ်ခြင်း၊ မှားလျှင်ချက်ချင်းပြခြင်း၊ request လုပ်နေချိန် double-submit မဖြစ်စေခြင်းနှင့် success/error ကိုပြခြင်းတို့ပါဝင်သော state flow ဖြစ်သည်။",
    syntax: "Form(key: formKey, child: TextFormField(validator: validateEmail, onSaved: saveEmail))",
    howItWorks: "FormState က field validators များကို စုစည်းထားပါသည်။ submit ချိန်တွင် validate() ခေါ်ပြီး false ဖြစ်လျှင် request မပို့ရပါ။ true ဖြစ်မှ controller value ကို trim လုပ်ကာ server သို့ပို့ပြီး submitting state ဖြင့် button ကိုခဏပိတ်ရပါသည်။",
    example: "final formKey = GlobalKey<FormState>();\nfinal emailController = TextEditingController();\n\nForm(\n  key: formKey,\n  child: TextFormField(\n    controller: emailController,\n    validator: (value) => value == null || !value.contains('@')\n        ? 'Email မှန်ကန်စွာထည့်ပါ'\n        : null,\n  ),\n)",
    output: "Email မမှန်လျှင် field အောက်တွင် error ပြပြီး valid ဖြစ်မှ login request flow သို့ဆက်သွားမည်။",
    lineByLine: ["GlobalKey သည် FormState ကိုနောက်မှရယူရန် reference ဖြစ်သည်။", "controller သည် input text ကိုဖတ်ရန်အသုံးပြုသည်။", "validator သည် error message သို့မဟုတ် null ကိုပြန်ပေးသည်။", "server-side validation ကိုလည်း မဖြစ်မနေထပ်လုပ်ရသည်။"],
    mistakes: [{ mistake: "controller မည်သူ dispose လုပ်မည်မစီစဉ်ခြင်း", fix: "StatefulWidget dispose ထဲတွင် controller.dispose() ခေါ်ပါ။" }, { mistake: "client validator ကို security boundary ထင်ခြင်း", fix: "server တွင် credential, rate limit နှင့် authorization ကိုထပ်စစ်ပါ။" }],
    practicalUse: "Login, signup, password reset, checkout address နှင့် admin forms များတွင်သုံးပါ။"
  },
  {
    name: "Cart State — product list ကို order တန်ဖိုးအဖြစ်တွက်ခြင်း",
    category: "Flutter",
    purpose: "Ecommerce cart သည် UI မှာ item ပြခြင်းတင်မဟုတ်ဘဲ product id, quantity, price နှင့် subtotal ကို တစ်နေရာတည်းတွင် စနစ်တကျထိန်းရန်လိုသော domain state ဖြစ်သည်။",
    syntax: "final total = items.fold<double>(0, (sum, item) => sum + item.price * item.quantity);",
    howItWorks: "Cart action တစ်ခုဖြစ်တိုင်း immutable state အသစ်ဖန်တီးပြီး provider/controller မှ UI ကိုအသိပေးရပါသည်။ Total တွက်ရာတွင် server price ကိုယုံကြည်မထားဘဲ checkout ချိန်တွင် server က final amount ပြန်တွက်ရပါသည်။",
    example: "class CartLine {\n  const CartLine(this.price, this.quantity);\n  final double price;\n  final int quantity;\n}\n\ndouble cartTotal(List<CartLine> lines) =>\n    lines.fold(0, (sum, line) => sum + line.price * line.quantity);",
    output: "price နှင့် quantity တစ်ကြောင်းချင်းမြှောက်ပြီး cart total တစ်ခုတည်းပြန်ရမည်။",
    lineByLine: ["CartLine သည် product တစ်ကြောင်း၏ data model ဖြစ်သည်။", "final fields သည် line object ဖန်တီးပြီးနောက် မပြောင်းစေရန်ကာကွယ်သည်။", "fold သည် list အားလုံးကို accumulator တစ်ခုအဖြစ်စုသည်။", "checkout ချိန်တွင် server က stock နှင့် price ကိုပြန်စစ်ရမည်။"],
    mistakes: [{ mistake: "UI total ကို final payment amount အဖြစ်ယုံကြည်ခြင်း", fix: "client total သည် display အတွက်သာဖြစ်ပြီး server က authoritative total ပြန်တွက်ပါ။" }],
    practicalUse: "Product catalog, cart drawer, checkout summary နှင့် order history တို့တွင်သုံးပါ။"
  },
  {
    name: "Chat Composer — message state နှင့် realtime update",
    category: "Flutter",
    purpose: "Chat screen တွင် message input, send action, optimistic pending state, failure retry နှင့် realtime incoming message တို့ကို မရှုပ်ထွေးအောင် ခွဲစီမံရန်လိုပါသည်။",
    syntax: "final text = controller.text.trim();\nif (text.isNotEmpty && !isSending) sendMessage(text);",
    howItWorks: "User က send နှိပ်လျှင် input ကို trim လုပ်၊ pending message ထည့်၊ server request ပို့ပြီး success ဖြစ်လျှင် delivered အဖြစ်ပြောင်းပါသည်။ failure ဖြစ်လျှင် retry action ပြရပါသည်။ Realtime event ရောက်လာသော message ကို လက်ရှိ conversation id နှင့်ကိုက်မှသာ list ထဲထည့်ရပါသည်။",
    example: "Future<void> submit() async {\n  final text = composer.text.trim();\n  if (text.isEmpty || isSending) return;\n  setState(() => isSending = true);\n  try {\n    await repository.sendMessage(text);\n    composer.clear();\n  } finally {\n    if (mounted) setState(() => isSending = false);\n  }\n}",
    output: "စာမရှိလျှင် request မပို့၊ request လုပ်နေစဉ် duplicate send မဖြစ်ဘဲ ပြီးလျှင် composer ရှင်းသွားမည်။",
    lineByLine: ["trim သည် whitespace-only message ကိုဖယ်ရှားသည်။", "isSending သည် duplicate request ကာကွယ်သည်။", "repository က UI မှ network implementation ကိုခွဲပေးသည်။", "mounted စစ်ခြင်းက screen ပျက်ပြီးနောက် setState ခေါ်မိခြင်းကိုရှောင်သည်။"],
    mistakes: [{ mistake: "realtime message အားလုံးကို လက်ရှိ room ထဲထည့်ခြင်း", fix: "conversation id နှင့် membership/permission ကိုစစ်ပြီးမှ render လုပ်ပါ။" }],
    practicalUse: "Support chat, group chat, notification inbox နှင့် collaborative comments တွင်သုံးပါ။"
  },
  {
    name: "Responsive Pricing Scroll — card layout နှင့် scroll constraints",
    category: "Flutter",
    purpose: "Pricing card များကို screen width မတူသော်လည်း ဖတ်ရလွယ်၊ scroll လုပ်ရလွယ်အောင် row/scroll behavior နှင့် responsive constraints ကို ခွဲစဉ်းစားရပါသည်။",
    syntax: "SingleChildScrollView(scrollDirection: Axis.horizontal, child: Row(children: cards))",
    howItWorks: "SingleChildScrollView က parent width ထက်ကျော်သော child ကို scrollable viewport ထဲတွင်ထားပေးသည်။ Card တစ်ခုချင်း၏ width ကို MediaQuery သို့မဟုတ် LayoutBuilder ဖြင့်တွက်ပြီး mobile တွင် horizontal scroll, desktop တွင် grid/row အဖြစ်ပြောင်းနိုင်သည်။",
    example: "LayoutBuilder(\n  builder: (context, constraints) {\n    final cardWidth = constraints.maxWidth < 700 ? 280.0 : 320.0;\n    return SingleChildScrollView(\n      scrollDirection: Axis.horizontal,\n      child: Row(\n        children: plans.map((plan) => SizedBox(\n          width: cardWidth,\n          child: PricingCard(plan: plan),\n        )).toList(),\n      ),\n    );\n  },\n)",
    output: "ဖုန်းတွင် card များကို ဘယ်ညာ scroll လုပ်နိုင်ပြီး width ကြီးသော screen တွင် card အရွယ်အစား ပိုသင့်တော်လာမည်။",
    lineByLine: ["LayoutBuilder သည် parent constraints ကိုဖတ်ပေးသည်။", "cardWidth သည် screen အရွယ်အစားအလိုက်ပြောင်းသည်။", "SingleChildScrollView သည် horizontal overflow ကို user gesture ဖြင့်ဖတ်နိုင်စေသည်။", "PricingCard ကို reusable widget အဖြစ်ခွဲထားခြင်းက data နှင့် layout ကိုသီးခြားစီမံစေသည်။"],
    mistakes: [{ mistake: "horizontal scroll ထဲတွင် unconstrained width ချန်ထားခြင်း", fix: "card တစ်ခုချင်းကို SizedBox/ConstrainedBox ဖြင့် width သတ်မှတ်ပါ။" }],
    practicalUse: "Pricing page, feature comparison, onboarding cards နှင့် FlutterFlow မှ code-based responsive UI ပြောင်းရာတွင်သုံးပါ။"
  },
  {
    name: "Release Build — iOS/Android ထုတ်ဝေမှု၏ အဓိကအဆင့်များ",
    category: "Flutter",
    purpose: "App ကို run လုပ်နိုင်ခြင်းနှင့် store သို့ publish လုပ်နိုင်ခြင်းသည် မတူပါ။ Release build တွင် app identity, signing, environment config, platform permission, artifact နှင့် store metadata တို့အားလုံးကို စစ်ရပါသည်။",
    syntax: "flutter build appbundle --release\nflutter build ipa --release",
    howItWorks: "Release mode သည် debugging အစား optimized artifact ထုတ်ပေးပါသည်။ Android တွင် app bundle/signing, iOS တွင် archive/signing နှင့် provisioning ကို platform rules အတိုင်းပြင်ရသည်။ Secret များကို source code ထဲမထည့်ဘဲ deployment environment မှ inject လုပ်ရပါသည်။",
    example: "# Android\nflutter clean\nflutter pub get\nflutter test\nflutter build appbundle --release\n\n# iOS (macOS runner)\nflutter build ipa --release",
    output: "Store တင်နိုင်သော signed Android App Bundle သို့မဟုတ် iOS archive artifact ရမည်။",
    lineByLine: ["clean သည် stale build output ကိုဖယ်ရှားသည်။", "pub get သည် lockfile အတိုင်း package များပြင်ဆင်သည်။", "test သည် release မတိုင်မီ regression ကိုဖမ်းသည်။", "build command က store-oriented release artifact ထုတ်သည်။"],
    mistakes: [{ mistake: "debug key နှင့် production secret ကိုရောသုံးခြင်း", fix: "environment ခွဲပြီး signing credential ကို secret manager/CI ထဲတွင်ထားပါ။" }, { mistake: "release build ကို real device မစမ်းခြင်း", fix: "permissions, deep links, notifications နှင့် crash behavior ကို release-like device build ဖြင့်စမ်းပါ။" }],
    practicalUse: "Store submission, internal beta, staged rollout, rollback နှင့် production monitoring တို့တွင်သုံးပါ။"
  }
];

const byChapter: Record<number, TopicExplanation[]> = {
  2: dartDeclarations,
  6: [flutterWidgets[4]],
  7: [flutterWidgets[0], flutterWidgets[1], flutterWidgets[2], flutterWidgets[3]],
  8: [flutterWidgets[6], pdfProjectTopics[5]],
  10: [flutterWidgets[6]],
  11: [flutterWidgets[5], pdfProjectTopics[9]],
  28: [flutterWidgets[6]],
  32: [flutterWidgets[4], flutterWidgets[0]],
  13: [pdfProjectTopics[0]],
  15: [pdfProjectTopics[1]],
  19: [pdfProjectTopics[3]],
  29: [pdfProjectTopics[2]],
  12: [pdfProjectTopics[7]],
  20: [pdfProjectTopics[8]],
  21: [pdfProjectTopics[4]],
  30: [pdfProjectTopics[6]],
  35: [flutterWidgets[1], flutterWidgets[2], flutterWidgets[3]],
};

export function topicExplanationsForChapter(chapterId: number): TopicExplanation[] {
  return byChapter[chapterId] ?? [];
}
