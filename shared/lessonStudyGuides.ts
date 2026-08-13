export type StudyGuide = {
  objectives: string[];
  codeWalkthrough: string[];
  commonMistakes: { mistake: string; fix: string }[];
  practiceSteps: string[];
};

export const fallbackStudyGuide: StudyGuide = {
  objectives: ["Concept ကိုမိမိစကားဖြင့်ရှင်းပြနိုင်ရန်", "နမူနာ code ကိုပြင်ပြီးရလဒ်ပြောင်းလဲပုံကိုမြင်ရန်", "လက်တွေ့ challenge ကိုသေးသေးလေးမှစတင်ဖြေရှင်းရန်"],
  codeWalkthrough: ["Code ကိုအပေါ်မှအောက်သို့ဖတ်ပြီး input၊ process နှင့် output ကိုခွဲမှတ်ပါ။", "တစ်ကြောင်းစီကိုပြင်ပြီး run လုပ်ကာ ဘာပြောင်းသွားသလဲကိုမှတ်စုရေးပါ။", "မမှန်သော input တစ်ခုဖြင့်စမ်းပြီး error ကိုဘယ်နေရာကတားသလဲကြည့်ပါ။"],
  commonMistakes: [{ mistake: "Code ကိုကူးထည့်ရုံဖြင့်နားလည်ပြီဟုယူဆခြင်း", fix: "variable အမည်၊ input နှင့် condition တစ်ခုကိုပြောင်းပြီးရလဒ်ကိုကိုယ်တိုင်စစ်ပါ။" }],
  practiceSteps: ["နမူနာကို run လုပ်ပါ။", "အချက်တစ်ခုကိုပြောင်းပြီး result ကိုမှတ်ပါ။", "Challenge ကိုမကြည့်ဘဲကိုယ်တိုင်ပြန်ရေးပါ။"],
};

export const lessonStudyGuides: Record<number, StudyGuide> = {
  1: {
    objectives: ["Dart သည် logic ကိုရေးပြီး Flutter သည် UI ကိုဆောက်ပေးသည့်ဆက်နွယ်မှုကိုရှင်းပြနိုင်ရန်", "`main()` မှစတင်သည့် program flow ကိုဖတ်တတ်ရန်", "SDK, framework နှင့် package တို့၏ကွာခြားချက်ကိုနားလည်ရန်"],
    codeWalkthrough: ["`void main()` သည် program စတင်ရာ function ဖြစ်သည်။ `void` ဆိုသည်မှာ caller ထံတန်ဖိုးပြန်မပို့ဟုဆိုလိုသည်။", "`const courseName` သည် compile time တွင်သတ်မှတ်ပြီးနောက်မပြောင်းရမည့် text တန်ဖိုးဖြစ်သည်။", "`print('$courseName ...')` တွင် `$courseName` ကို string interpolation ဟုခေါ်ပြီး variable တန်ဖိုးကိုစာသားထဲထည့်ပေးသည်။"],
    commonMistakes: [{ mistake: "`main` ကိုစာလုံးကြီးဖြင့်ရေးခြင်း သို့မဟုတ် parentheses မထည့်ခြင်း", fix: "Dart entry point ကို `void main() {}` အတိအကျပုံစံဖြင့်စတင်ရေးပါ။" }, { mistake: "Dart နှင့် Flutter ကိုတူညီသောအရာဟုထင်ခြင်း", fix: "Dart သည် language၊ Flutter သည် Dart ကိုသုံးသော UI framework ဟုခွဲမှတ်ပါ။" }],
    practiceSteps: ["မိမိအမည်ကို `const learnerName` ဖြင့်သတ်မှတ်ပါ။", "`print` တစ်ကြောင်းတွင် course name နှင့် learner name ကိုတွဲပြပါ။", "`const` ကို `var` ပြောင်းပြီးနောက်တန်ဖိုးပြန်သတ်မှတ်ကာကွာခြားချက်ကိုမှတ်ပါ။"],
  },
  2: {
    objectives: ["`var`, `final`, `const`, `late` တို့ကိုတန်ဖိုးဘဝစက်ဝန်းအလိုက်ရွေးတတ်ရန်", "nullable (`String?`) နှင့် non-nullable (`String`) type ကိုခွဲတတ်ရန်", "null ဖြစ်နိုင်သောတန်ဖိုးကို `??` ဖြင့်လုံခြုံစွာကိုင်တွယ်တတ်ရန်"],
    codeWalkthrough: ["`final String userId` သည် object ဖန်တီးချိန်တွင်တစ်ကြိမ်ပေးပြီးနောက်reference မပြောင်းနိုင်သော field ဖြစ်သည်။", "`late final displayName` သည် constructor အချိန်မဟုတ်ဘဲနောက်မှတစ်ကြိမ်ပေးမည်ဟုကတိပေးခြင်းဖြစ်သည်။", "`avatarUrl ?? 'ပုံမရှိသေးပါ'` သည် avatar URL မရှိလျှင် fallback စာသားကိုပြသည်။"],
    commonMistakes: [{ mistake: "nullable တန်ဖိုးပေါ် `!` ကိုအမြဲသုံးခြင်း", fix: "`??`, `if (value != null)` သို့မဟုတ် `?.` ဖြင့်အရင်စစ်ပြီးမှအသုံးပြုပါ။" }, { mistake: "`late` ကို initialization မသေချာဘဲသုံးခြင်း", fix: "အသုံးမပြုမီတန်ဖိုးပေးနိုင်ကြောင်းသေချာမှ `late` ကိုသုံးပါ။" }],
    practiceSteps: ["`Profile` ထဲသို့ `String? phoneNumber` field ထည့်ပါ။", "phone number ရှိ/မရှိအလိုက် fallback စာသားပြပါ။", "`final` field ကိုပြန်ပြောင်းကြည့်ပြီး compiler error ကိုဖတ်ပါ။"],
  },
  3: {
    objectives: ["Function ကို input၊ validation နှင့် output contract အဖြစ်ရေးတတ်ရန်", "`if` နှင့် `switch` ကိုရွေးသုံးတတ်ရန်", "invalid data ကိုအစောပိုင်းတွင်တားတတ်ရန်"],
    codeWalkthrough: ["`normalizeTitle` ၏ parameter `rawTitle` သည် function သို့ဝင်လာသောမသန့်ရှင်းသေးသည့် data ဖြစ်သည်။", "`trim()` သည်အစနှင့်အဆုံးရှိspace များကိုဖယ်ပြီး consistent title တစ်ခုရစေသည်။", "title အလွတ်ဖြစ်လျှင် `throw ArgumentError` ဖြင့်လုပ်ငန်းစဉ်ကိုချက်ချင်းရပ်တန့်ပြီး caller ကိုအမှားသတင်းပို့သည်။"],
    commonMistakes: [{ mistake: "function ကအရာများစွာလုပ်နေခြင်း", fix: "validation၊ calculation နှင့် UI update ကိုသေးသော function များအဖြစ်ခွဲပါ။" }, { mistake: "error ဖြစ်နိုင်သော input ကိုမစစ်ခြင်း", fix: "empty, null, range မမှန်သည့်input များကိုentry point တွင်စစ်ပါ။" }],
    practiceSteps: ["`normalizeEmail` function တစ်ခုရေး၍ lower case နှင့် trim လုပ်ပါ။", "အလွတ်email တွင် `ArgumentError` ပစ်ပါ။", "Priority enum ကို `switch` ဖြင့်စာသားပြန်ပေးပါ။"],
  },
  4: {
    objectives: ["Class ကိုdata နှင့် behavior စုစည်းရာmodel အဖြစ်မြင်တတ်ရန်", "constructor, `required`, `final`, enum တို့ကိုတွဲသုံးတတ်ရန်", "immutable object ၏အားသာချက်ကိုနားလည်ရန်"],
    codeWalkthrough: ["`Priority` enum သည်စာသားအမှားမဖြစ်စေရန်ရွေးချယ်စရာသုံးခုကိုသာကန့်သတ်ပေးသည်။", "`const Task` constructor သည် input အားလုံးcompile-time constants ဖြစ်လျှင်object ကိုပြန်သုံးနိုင်စေသည်။", "`required this.title` သည် Task ဖန်တီးသူက title ပေးရန်မဖြစ်မနေလိုအပ်ကြောင်းtype system တွင်ဖော်ပြသည်။"],
    commonMistakes: [{ mistake: "model field များကိုpublic mutable အဖြစ်အကုန်ဖွင့်ထားခြင်း", fix: "ပြောင်းမလိုသောdata ကို `final` ဖြင့်ကာကွယ်ပြီး ပြောင်းလဲမှုအတွက်method သို့မဟုတ် copy pattern သုံးပါ။" }, { mistake: "enum အစား magic string သုံးခြင်း", fix: "`'high'` ကဲ့သို့စာသားများအစား `Priority.high` ကိုသုံးပါ။" }],
    practiceSteps: ["`Task` ထဲသို့ `bool isDone` ထည့်ပါ။", "`copyWith` method ရေးပြီး title သို့မဟုတ် isDone တစ်ခုတည်းပြောင်းနိုင်အောင်လုပ်ပါ။", "Task နှစ်ခုကိုမတူညီသော priority ဖြင့်ဖန်တီးပြီး print လုပ်ပါ။"],
  },
  5: {
    objectives: ["`Future` သည်နောက်မှရောက်လာမည့်result ကိုကိုယ်စားပြုသည်ကိုနားလည်ရန်", "`async`/`await` နှင့် `try`/`catch` ကိုတွဲသုံးတတ်ရန်", "success, loading, error flow များကိုခွဲစဉ်းစားတတ်ရန်"],
    codeWalkthrough: ["`Future<String>` သည် function ကချက်ချင်း String မပြန်ဘဲနောက်မှ String တစ်ခုရမည်ဟုဖော်ပြသည်။", "`await Future.delayed` တွင်လက်ရှိfunction စောင့်နေပေမယ့် app တစ်ခုလုံးမရပ်ပါ။", "`try` block အတွင်းကasync error ကို `catch` ကဖမ်းပြီး user ကိုသင့်တော်သောmessage ပြနိုင်သည်။"],
    commonMistakes: [{ mistake: "`await` မထည့်ဘဲ Future ကိုတန်ဖိုးလိုသုံးခြင်း", fix: "result လိုသည့်နေရာတွင် `await` သုံးပြီး parent function ကို `async` လုပ်ပါ။" }, { mistake: "network error အားလုံးကိုတူညီသောmessage ပြခြင်း", fix: "timeout, permission, parsing error တို့ကိုခွဲ၍ပြန်လည်လုပ်ဆောင်နိုင်သည့်action ပေးပါ။" }],
    practiceSteps: ["1 second နောက် `List<String>` ပြန်ပေးသော Future ရေးပါ။", "loading စတင်/ပြီးဆုံးချိန်ကို print ဖြင့်မှတ်ပါ။", "error ပစ်သောversion တစ်ခုရေးပြီး catch message ပြပါ။"],
  },
  6: {
    objectives: ["Flutter project ၏entry point နှင့် `runApp` flow ကိုနားလည်ရန်", "`MaterialApp` ၏app-level တာဝန်ကိုသိရန်", "file structure ကိုfeature အလိုက်စီစဉ်တတ်ရန်"],
    codeWalkthrough: ["`main()` ကFlutter engine စတင်ပြီး `runApp` ထံroot widget ပေးသည်။", "`const MasterclassApp()` သည်root widget configuration မပြောင်းလဲသည့်အတွက်const အဖြစ်ဖန်တီးထားခြင်းဖြစ်သည်။", "`MaterialApp(home: ...)` သည်default navigation, theme နှင့်material behavior များကိုစုစည်းပေးသည်။"],
    commonMistakes: [{ mistake: "widget class ထဲတွင်business logic အားလုံးရေးခြင်း", fix: "UI, state နှင့်data access ကိုတဖြည်းဖြည်းခွဲထားသောfile structure သုံးပါ။" }, { mistake: "`pubspec.yaml` ပြင်ပြီး package get မလုပ်ခြင်း", fix: "dependency ပြင်တိုင်း `flutter pub get` လုပ်ပြီးimport များကိုစစ်ပါ။" }],
    practiceSteps: ["`Scaffold` နှင့် `AppBar` ပါသောhome screen တည်ဆောက်ပါ။", "app title ကိုconstant တစ်ခုထဲသို့ရွှေ့ပါ။", "`features/course` folder အောက်တွင်page file တစ်ခုစီစဉ်ပါ။"],
  },
  7: {
    objectives: ["Flutter constraint flow ကို parent→child→parent အဖြစ်နားလည်ရန်", "Row/Column အတွင်း `Expanded` ကိုသင့်တော်စွာသုံးတတ်ရန်", "small screen overflow ကိုကြိုတင်ကာကွယ်တတ်ရန်"],
    codeWalkthrough: ["`Row` သည်children များကိုအလျားလိုက်စီသည်၊ `SizedBox` ကicon နှင့်text ကြားအကွာအဝေးကိုတိတိကျကျပေးသည်။", "`Expanded` ကtext အားကျန်ရှိသောwidth အတွင်းသာနေစေပြီး Row overflow မဖြစ်စေသည်။", "`maxLines` နှင့် `ellipsis` ကtitle ရှည်လျှင်စာကိုအလှပျက်မသွားစေဘဲကန့်သတ်ပေးသည်။"],
    commonMistakes: [{ mistake: "Row ထဲရှိစာရှည်ကို Expanded မထည့်ခြင်း", fix: "flexible child သို့မဟုတ် Expanded ဖြင့်text width ကိုကန့်သတ်ပါ။" }, { mistake: "အရွယ်တိုင်းအတွက်fixed pixel width သုံးခြင်း", fix: "constraint၊ padding နှင့်responsive layout ကိုအခြေခံစဉ်းစားပါ။" }],
    practiceSteps: ["Icon, title, subtitle ပါသောcourse tile တည်ဆောက်ပါ။", "title ကိုစာရှည်တစ်ခုဖြင့်စမ်းပြီးoverflow မဖြစ်ကြောင်းစစ်ပါ။", "phone width နှင့်tablet width တွင်screenshot နှိုင်းယှဉ်ပါ။"],
  },
  8: {
    objectives: ["StatefulWidget ကိုပြောင်းလဲနေသောscreen data အတွက်ရွေးတတ်ရန်", "`initState` နှင့် `dispose` ၏တာဝန်ကိုခွဲတတ်ရန်", "Form validation ကိုsubmit မတိုင်မီလုပ်တတ်ရန်"],
    codeWalkthrough: ["`formKey` သည်FormState ကိုပြန်ရယူပြီးvalidator များကိုတစ်စုတည်းစစ်နိုင်စေသည်။", "`initState` တွင်controller ကိုတစ်ကြိမ်သာဖန်တီးထား၍build ပြန်ခေါ်တိုင်းအသစ်မဖြစ်စေပါ။", "`dispose` တွင်controller ကိုပိတ်ခြင်းကmemory နှင့်listener leak မဖြစ်စေပါ။"],
    commonMistakes: [{ mistake: "TextEditingController ကိုbuild ထဲဖန်တီးခြင်း", fix: "State field အဖြစ်ထားပြီး initState/dispose အတွဲလိုက်သုံးပါ။" }, { mistake: "validation fail သော်လည်းsubmit ဆက်လုပ်ခြင်း", fix: "`formKey.currentState!.validate()` true ဖြစ်မှsave လုပ်ပါ။" }],
    practiceSteps: ["title နှင့်description ပါသောForm တစ်ခုရေးပါ။", "title အလွတ်ဖြစ်လျှင်မြန်မာလိုerror ပြပါ။", "submit အောင်မြင်လျှင်controller ကိုclear လုပ်ပြီးdispose ပါထည့်ပါ။"],
  },
  9: {
    objectives: ["reusable UI component ကိုရွေးထုတ်တတ်ရန်", "empty, loading, error state ကိုမတူညီစွာဒီဇိုင်းတတ်ရန်", "callback ဖြင့်parent နှင့်child ကိုချိတ်တတ်ရန်"],
    codeWalkthrough: ["`EmptyTasksView` သည်data state ကိုမပိုင်ဘဲမည်သည့်UI ပြမည်ကိုသာတာဝန်ယူသည်။", "`VoidCallback onCreate` ဖြင့်button နှိပ်ချိန်ဘာလုပ်မည်ကိုparent ကinject လုပ်ပေးသည်။", "`FilledButton(onPressed: onCreate)` ကchild UI ကိုparent action နှင့်ချိတ်ပေးသည်။"],
    commonMistakes: [{ mistake: "empty state ကိုerror state ကဲ့သို့ကြောက်စရာပြခြင်း", fix: "data မရှိသေးခြင်းတွင်နောက်တစ်ဆင့် action ကိုရှင်းရှင်းပြပါ။" }, { mistake: "တူညီသောtile UI ကိုscreen တိုင်းcopy/paste လုပ်ခြင်း", fix: "TaskTile ကဲ့သို့component တစ်ခုထုတ်ပြီးparameters ဖြင့်ပြောင်းလဲပါ။" }],
    practiceSteps: ["TaskTile component တစ်ခုထုတ်ပါ။", "empty list အတွက်create CTA ထည့်ပါ။", "loading နှင့်error view ကိုempty view မှခွဲရေးပါ။"],
  },
  10: {
    objectives: ["route သို့data ပို့ပြီးresult ပြန်ယူတတ်ရန်", "`BuildContext.mounted` စစ်ရသည့်အကြောင်းနားလည်ရန်", "back stack policy ကိုuser flow အလိုက်စီမံတတ်ရန်"],
    codeWalkthrough: ["`Navigator.push<Task>` သည်edit screen ပြန်ပေးမည့်result type ကိုTask ဟုကန့်သတ်ထားသည်။", "`await` ပြီးနောက်user ကscreen ပိတ်သွားနိုင်သောကြောင့် `context.mounted` စစ်သည်။", "result null ဖြစ်လျှင်user ကcancel လုပ်သည်ဟုယူဆပြီးsave မလုပ်ဘဲreturn လုပ်သည်။"],
    commonMistakes: [{ mistake: "async navigation ပြီးနောက်unmounted context သုံးခြင်း", fix: "Navigator result ပြီးနောက် `if (!context.mounted) return;` ကိုထားပါ။" }, { mistake: "login ပြီးနောက် back နှိပ်လျှင်login screen သို့ပြန်ရောက်ခြင်း", fix: "replace/remove-until policy ကိုauth flow တစ်ခုလုံးအတွက်သတ်မှတ်ပါ။" }],
    practiceSteps: ["list screen မှdetails screen သို့Task ပို့ပါ။", "details မှedited Task ပြန်ပို့ပါ။", "cancel လုပ်ချိန်တွင်list မပြောင်းကြောင်းစစ်ပါ။"],
  },
  11: {
    objectives: ["Material 3 theme ကိုsemantic color များဖြင့်သုံးတတ်ရန်", "screen width အလိုက်layout ပြောင်းတတ်ရန်", "accessibility နှင့်text scale ကိုစစ်တတ်ရန်"],
    codeWalkthrough: ["`LayoutBuilder` ကparent ကပေးသောmaxWidth ကိုreader ထံပို့ပေးသည်။", "720 ထက်နည်းလျှင်single pane ပြပြီးကျယ်လျှင်list-detail layout ပြောင်းသည်။", "`Expanded` ကdetail panel ကိုကျန်သောနေရာအပြည့်ယူစေသည်။"],
    commonMistakes: [{ mistake: "breakpoint မရှိဘဲdesktop layout ကိုphone တွင်ပေးခြင်း", fix: "constraint အလိုက်column/row ကိုပြောင်းပြီးtouch target များကိုကြီးကြီးထားပါ။" }, { mistake: "brand color ကိုtext contrast မစစ်ဘဲသုံးခြင်း", fix: "ColorScheme ၏ onPrimary/onSurface pairing ကိုသုံးပြီးdark mode ကိုစစ်ပါ။" }],
    practiceSteps: ["ColorScheme.fromSeed ဖြင့်theme တစ်ခုဖန်တီးပါ။", "720 breakpoint တွင်layout ပြောင်းပါ။", "system text scale 1.3 ဖြင့်screen ကိုစမ်းပါ။"],
  },
  12: {
    objectives: ["local, feature နှင့်server state ကိုခွဲတတ်ရန်", "explicit state model ဖြင့်impossible state လျှော့တတ်ရန်", "state management tool ကိုပြဿနာအရွယ်အစားအလိုက်ရွေးတတ်ရန်"],
    codeWalkthrough: ["`sealed class TasksState` ကဖြစ်နိုင်သောscreen state များကိုစုစည်းသတ်မှတ်သည်။", "`TasksReady` ထဲတွင်သာtasks list ရှိသဖြင့်loading state မှာdata ရှိနေသည့်မမှန်ကန်သောstate မဖြစ်စေပါ။", "UI သည်switch/pattern matching ဖြင့်state အားလုံးကိုhandle လုပ်ရန်အလွယ်တကူစစ်နိုင်သည်။"],
    commonMistakes: [{ mistake: "`isLoading`, `hasError`, `tasks` boolean များကိုအလွန်များစွာတွဲသုံးခြင်း", fix: "sealed/union state ဖြင့်state တစ်ခုပြီးတစ်ခုသာဖြစ်နိုင်အောင်ရေးပါ။" }, { mistake: "server data ကိုlocal UI state ကဲ့သို့သိမ်းခြင်း", fix: "refresh, cache, retry rules ပါသောserver-state layer ကိုသီးခြားစဉ်းစားပါ။" }],
    practiceSteps: ["Task screen state လေးမျိုးကိုclass များဖြင့်ရေးပါ။", "state တစ်မျိုးစီအတွက်widget တစ်ခုစီပြပါ။", "loading မှready သို့ပြောင်းသည့်test ကိုရေးပါ။"],
  },
  13: {
    objectives: ["HTTP request lifecycle ကိုအစမှအဆုံးနားလည်ရန်", "JSON ကိုtyped model အဖြစ်ပြောင်းတတ်ရန်", "status code အလိုက်user action ခွဲတတ်ရန်"],
    codeWalkthrough: ["`client.get(uri)` သည်HTTP request စတင်ပြီး `timeout` ကအဆုံးမရှိစောင့်ရခြင်းကိုတားသည်။", "status 200 မဟုတ်လျှင်UI သို့မပို့မီerror အဖြစ်map လုပ်သည်။", "`jsonDecode` ရလဒ်ကို`Task.fromJson` ဖြင့်domain model အဖြစ်ပြောင်းပြီးမှapp ထဲသို့သွင်းသည်။"],
    commonMistakes: [{ mistake: "API JSON ကိုdynamic Map အဖြစ်UI တစ်လျှောက်သုံးခြင်း", fix: "repository boundary တွင်typed model သို့ပြောင်းပါ။" }, { mistake: "POST/DELETE ကိုအလိုအလျောက်အကြိမ်များစွာretry လုပ်ခြင်း", fix: "idempotent ဖြစ်မဖြစ်စစ်ပြီးuser confirmation ပါသောretry policy သုံးပါ။" }],
    practiceSteps: ["Task JSON sample တစ်ခုရေးပါ။", "`Task.fromJson` နှင့်invalid field validation ထည့်ပါ။", "401, 429, 500 အတွက်message နှင့်action table ရေးပါ။"],
  },
  14: {
    objectives: ["preference, secret နှင့်offline data အတွက်storage ကိုရွေးတတ်ရန်", "cache ၏fresh/stale state ကိုနားလည်ရန်", "versioned key ဖြင့်migration ကိုစဉ်းစားတတ်ရန်"],
    codeWalkthrough: ["`getString('theme_mode_v1')` သည်persisted preference ကိုဖတ်သည်။", "switch expression ကdark/light/system စာသားများကိုThemeMode အဖြစ်လုံခြုံစွာmap လုပ်သည်။", "မသိသောvalue သို့မဟုတ်null တွင်system theme ကိုfallback ပေးထားသည်။"],
    commonMistakes: [{ mistake: "access token ကိုSharedPreferences တွင်သိမ်းခြင်း", fix: "secret အတွက်secure storage သို့မဟုတ်server session solution ကိုသုံးပါ။" }, { mistake: "cache ရှိလျှင်အမြဲfresh ဟုယူဆခြင်း", fix: "updated time, refresh rule နှင့်stale UI indicator ထည့်ပါ။" }],
    practiceSteps: ["theme mode ကိုsave/load လုပ်ပါ။", "key ကိုv2 သို့ပြောင်း၍migration plan ရေးပါ။", "offline cache အတွက်fresh/stale/failed UI ကိုရေးပါ။"],
  },
  15: {
    objectives: ["animation ကိုstate feedback အတွက်သုံးတတ်ရန်", "permission edge cases များကိုကြိုတင်စဉ်းစားတတ်ရန်", "reduced-motion user များကိုလေးစားတတ်ရန်"],
    codeWalkthrough: ["`AnimatedContainer` ကproperty ပြောင်းလဲမှုနှစ်ခုကြားကိုautomatically animate လုပ်ပေးသည်။", "`isDone` ပြောင်းချိန်တွင်background color နှင့်label တစ်ပြိုင်နက်ပြောင်းကာအခြေအနေကိုမြင်သာစေသည်။", "180ms duration သည်feedback ရှိပေမယ့်လုပ်ဆောင်မှုကိုမနှေးစေသောသင့်တော်သည့်အချိန်ဖြစ်သည်။"],
    commonMistakes: [{ mistake: "animation ဖြင့်network loading ကြာနေမှုကိုဖုံးကွယ်ခြင်း", fix: "progress/state message ကိုရိုးရိုးရှင်းရှင်းပြပြီးmotion ကိုmeaningful transition အတွက်သာသုံးပါ။" }, { mistake: "permission denied တစ်မျိုးတည်းကိုသာhandle လုပ်ခြင်း", fix: "denied, permanently denied, unsupported, cancelled အားလုံးအတွက်action များပြပါ။" }],
    practiceSteps: ["done toggle ပါသောAnimatedContainer ရေးပါ။", "permission denied message နှင့်settings action ထည့်ပါ။", "reduced motion preference ရှိလျှင်animation လျှော့ပါ။"],
  },
  16: {
    objectives: ["Future ကိုbuild အပြင်တွင်တည်ဆောက်ရသည့်အကြောင်းနားလည်ရန်", "loading, error, empty, data UI ကိုခွဲတတ်ရန်", "retry action သည်request အသစ်စတင်စေတတ်ရန်"],
    codeWalkthrough: ["`late Future<List<Task>> futureTasks` သည်State အသက်ရှင်သရွေ့အသုံးပြုမည့်future reference ဖြစ်သည်။", "`initState` တွင်repository fetch ကိုတစ်ကြိမ်စတင်သောကြောင့်build ပြန်ခေါ်တိုင်းrequest မပွားပါ။", "`FutureBuilder` ကsnapshot state အလိုက်UI builder ကိုခေါ်ပေးသည်။"],
    commonMistakes: [{ mistake: "`repository.fetchTasks()` ကိုbuild parameter ထဲတန်းထည့်ခြင်း", fix: "future ကိုState field တွင်သိမ်းပြီးretry နှိပ်ချိန်တွင်သာပြန်သတ်မှတ်ပါ။" }, { mistake: "empty result ကိုerror ဟုယူဆခြင်း", fix: "request အောင်မြင်ပြီးlist အလွတ်ဖြစ်သောstate ကိုသီးခြား empty UI ပြပါ။" }],
    practiceSteps: ["FutureBuilder ဖြင့်task list ပြပါ။", "empty list အတွက်CTA ထည့်ပါ။", "Retry button နှိပ်မှသာfuture အသစ်ဖန်တီးပါ။"],
  },
  17: {
    objectives: ["Supabase client/service credential ကွာခြားချက်ကိုသိရန်", "RLS ကိုdatabase security policy အဖြစ်နားလည်ရန်", "cross-user data access test များရေးတတ်ရန်"],
    codeWalkthrough: ["policy name သည်rule ၏ရည်ရွယ်ချက်ကိုဖော်ပြသဖြင့်နောက်ပိုင်းaudit လုပ်ရလွယ်စေသည်။", "`to authenticated` သည်logged-in user များအတွက်သာpolicy သက်ရောက်စေသည်။", "`auth.uid() = user_id` ကrequest user နှင့်row owner တူမှသာaccess ပေးသည်။"],
    commonMistakes: [{ mistake: "service role key ကိုFlutter app ထဲထည့်ခြင်း", fix: "service key ကိုserver-side secret အဖြစ်သာထားပြီးclient တွင်publishable key သာသုံးပါ။" }, { mistake: "UI filter ရှိလျှင်security ပြီးပြီဟုယူဆခြင်း", fix: "RLS policy နှင့်database constraint တို့တွင်အမှန်တကယ်ကာကွယ်မှုထားပါ။" }],
    practiceSteps: ["tasks table တွင်user_id ထည့်ပါ။", "select/insert/update policy ကိုသီးခြားရေးပါ။", "user A/B ဖြင့်မိမိပိုင်row သာမြင်ရကြောင်းစမ်းပါ။"],
  },
  18: {
    objectives: ["clean architecture ကိုfolder name မဟုတ် dependency direction အဖြစ်နားလည်ရန်", "repository contract ဖြင့်data source ကိုဖုံးကွယ်တတ်ရန်", "fake dependency ဖြင့်use case စမ်းတတ်ရန်"],
    codeWalkthrough: ["`TaskRepository` interface သည်domain ကလိုအပ်သောcapability ကိုသာဖော်ပြပြီးSupabase/SQLite မသိစေပါ။", "`CreateTask` သည်constructor မှrepository လက်ခံသောကြောင့်production implementation သို့မဟုတ်fake ကိုလဲနိုင်သည်။", "`call` method သည်business action ကိုအသုံးပြုရာနေရာတွင်စာဖတ်ရလွယ်စေသည်။"],
    commonMistakes: [{ mistake: "domain layer ကpackage-specific model များကိုimport လုပ်ခြင်း", fix: "domain ကိုplain Dart contract များသာသိစေပြီးdata layer တွင်mapping လုပ်ပါ။" }, { mistake: "global singleton အားလုံးသုံးခြင်း", fix: "constructor injection ဖြင့်dependency ကိုထင်ရှားစွာပေးပါ။" }],
    practiceSteps: ["TaskRepository fake တစ်ခုရေးပါ။", "CreateTask success/failure unit test နှစ်ခုရေးပါ။", "SQLite implementation တစ်ခုကိုနောက်မှထည့်ပြီးinterface မပြောင်းကြောင်းစစ်ပါ။"],
  },
  19: {
    objectives: ["unit, widget, integration test အကွာအဝေးကိုရွေးတတ်ရန်", "test တစ်ခုသည်မျှော်လင့်ထားသောbehavior တစ်ခုကိုသက်သေပြရမည်ကိုနားလည်ရန်", "performance ကိုတိုင်းပြီးမှပြင်တတ်ရန်"],
    codeWalkthrough: ["`test(...)` သည်တစ်ခုတည်းသောbehavior ကိုအမည်နားလည်လွယ်စွာဖော်ပြသည်။", "Fake repository သည်real database မလိုဘဲuse case rule ကိုစစ်နိုင်စေသည်။", "`expect` သည်actual result နှင့်expected result ကိုနှိုင်းယှဉ်ပြီးregression ဖမ်းပေးသည်။"],
    commonMistakes: [{ mistake: "implementation detail ကိုသာtest လုပ်ခြင်း", fix: "user/business မှမြင်ရသောinput-output behavior ကိုအဓိကစစ်ပါ။" }, { mistake: "profile data မရှိဘဲperformance optimization လုပ်ခြင်း", fix: "DevTools timeline, memory နှင့်rebuild evidence ကိုအရင်ယူပါ။" }],
    practiceSteps: ["trim validation အတွက်unit test ရေးပါ။", "form error စာသားပေါ်လာမှုကိုwidget test ရေးပါ။", "login မှtask save အထိintegration flow စာရင်းရေးပါ။"],
  },
  20: {
    objectives: ["release readiness သည်build အောင်မြင်ခြင်းထက်ပိုသည်ကိုနားလည်ရန်", "CI ကိုquality gate အဖြစ်စီစဉ်တတ်ရန်", "signing, privacy, monitoring နှင့်rollback ကိုrelease plan ထဲထည့်တတ်ရန်"],
    codeWalkthrough: ["GitHub Actions workflow သည်pull request ဖြစ်တိုင်းquality job ကိုစတင်ပေးသည်။", "`flutter analyze` ကstatic issue များကို၊ `flutter test` ကbehavior regression များကိုစစ်သည်။", "debug app bundle build သည်Android build pipeline မပျက်ကြောင်းကြိုတင်သက်သေပြပေးသည်။"],
    commonMistakes: [{ mistake: "signing key ကိုrepository ထဲသိမ်းခြင်း", fix: "CI secret store သို့မဟုတ်secure key management ကိုသုံးပြီးrotation owner သတ်မှတ်ပါ။" }, { mistake: "store submission မတိုင်မီreal-device test မလုပ်ခြင်း", fix: "network loss, permission deny, old device နှင့်update scenario များကိုrelease checklist တွင်ထည့်ပါ။" }],
    practiceSteps: ["format/analyze/test/build ပါသောCI workflow ရေးပါ။", "release checklist ကိုowner နှင့်deadline ပါအောင်ရေးပါ။", "crash monitoring နှင့်rollback decision rule သတ်မှတ်ပါ။"],
  },
};
