# Dart Playground Implementation

The learning platform provides an editable, lesson-aware Dart code editor. Learners can select any lesson, modify its code, restore the original lesson sample, and choose **Code ကူးပြီး DartPad တွင် Run မည်**. The action writes the learner's code to the browser clipboard and opens DartPad in a new browser tab, where the learner pastes it and uses DartPad's Run control to see console output and compilation diagnostics.

The platform deliberately does **not** execute learner code on its own server. This protects account, Turso database, and application infrastructure from untrusted learner programs. A fully embedded DartPad runner was assessed but is not used because the current official embedding guidance only supports pre-created gist iframes and does not support injecting arbitrary lesson code dynamically. The external DartPad tab is the reliable, browser-native execution environment for this version.

## Learner Flow

1. Open a lesson and choose **Browser Playground တွင် စမ်းမည်**.
2. Edit the lesson code or restore the original code.
3. Choose **Code ကူးပြီး DartPad တွင် Run မည်**.
4. Paste into DartPad and select **Run**.
5. Read output or compiler diagnostics inside DartPad, then return to the lesson to continue.

## References

1. [DartPad documentation](https://dart.dev/tools/dartpad)
2. [DartPad embedding guide](https://github.com/dart-lang/dart-pad/wiki/Embedding-Guide)
