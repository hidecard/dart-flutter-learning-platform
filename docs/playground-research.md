# Browser Dart Playground Research

The official Dart documentation identifies DartPad as an open-source browser tool for interactively running Dart. It provides an editor, console output, formatting, diagnostics, and support for Dart core libraries. It is therefore the appropriate execution environment for untrusted learner code rather than running code on this application server.

The current DartPad embedding guide states that its previously documented dynamic embedding form is no longer supported. It allows a normal iframe only for a pre-existing DartPad gist, which cannot safely receive arbitrary lesson code at runtime. The learning platform will therefore provide an embedded DartPad workspace for direct editing and execution, plus a clear copy/reset workflow for the current lesson code. This avoids accepting or executing learner code on the Turso-backed application server.

## Sources

1. [DartPad documentation](https://dart.dev/tools/dartpad)
2. [DartPad embedding guide](https://github.com/dart-lang/dart-pad/wiki/Embedding-Guide)
