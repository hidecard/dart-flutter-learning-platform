# Project TODO

- [x] Define a 20-chapter Burmese course catalog grouped under the 6 required parts.
- [x] Add database tables for authenticated user chapter progress and progress persistence helpers.
- [x] Implement protected progress and course search procedures with validation.
- [x] Build an elegant Burmese-first landing page with course overview, chapter preview, and start-learning call-to-action.
- [x] Build responsive chapter navigation with 6 parts, 20 chapters, and a mobile collapsible sidebar.
- [x] Build the chapter lesson reader with Burmese instructional text, highlighted code blocks, annotations, and explanation tables.
- [x] Add authenticated completion controls, overall percentage, and per-part progress bars.
- [x] Add copy-to-clipboard controls for code examples and accessible success feedback.
- [x] Add practice challenges and self-check checklists to each chapter lesson.
- [x] Add full-book search across chapter titles, topics, content, and code keywords.
- [x] Build glossary and references pages for core Dart and Flutter terms.
- [x] Write or update Vitest coverage for course catalog, search behavior, and authenticated progress persistence.
- [x] Verify the interface visually on desktop and mobile, then save a final project checkpoint.
- [x] Define the admin CMS lesson content model and secure admin-only access workflow.
- [x] Add editable lesson-content persistence, validation, and admin-only server procedures.
- [x] Build a browser-based admin dashboard with lesson listing, search, editor, preview, and save actions.
- [x] Build a browser-based admin dashboard with lesson listing, search, editor, preview, and save actions.
- [x] Add admin authorization and lesson-update tests, then visually verify the CMS on desktop and mobile.
- [x] Add an admin lesson preview that opens the selected chapter in the learner reader after saving.
- [x] Review the current database and authentication dependencies for Turso/libSQL compatibility.
- [x] Add secure Turso environment variables and migrate persisted course progress and CMS content to libSQL.
- [x] Validate the configured Turso secrets with a read-only connection test.
- [x] Run the one-time safe import of existing managed-database users, progress, and CMS content into Turso.
- [x] Verify remote Turso table availability and imported user/progress row counts.
- [x] Rewire database helpers and tests to use the Turso-compatible data access layer.
- [x] Verify the Turso-backed platform and create a private GitHub repository with the complete source code.
- [x] Verify reversible authenticated progress and CMS write/read flows against Turso, then restore the original records.
- [x] Review the current Manus OAuth dependencies and define a Turso-only local account security model.
- [x] Add Turso tables and secure server-side password hash/session storage for local accounts.
- [x] Test Turso-backed password hashing, local sign-in, opaque sessions, and session revocation.
- [x] Replace Manus login UI and API dependencies with local sign-up, sign-in, logout, and session handling.
- [x] Replace Manus login UI and API dependencies with local sign-up, sign-in, logout, and session handling.
- [x] Preserve admin-only CMS access and authenticated progress persistence under local Turso accounts.
- [x] Verify local authentication, Turso persistence, and account authorization with tests and responsive UI review.
- [x] Run real local-account router integration coverage for sign-up, session cookie, progress, admin CMS, and logout.
- [x] Add and validate a Vercel-compatible serverless entrypoint and production build configuration.
- [x] Package the production source tree and deploy the public learning platform to Vercel.
- [x] Resolve the failed Vercel dependency-installation attempt and verify a successful production deployment.
- [x] Prevent the Vercel serverless handler from loading the development-only Vite module at startup, then verify the live tRPC API.
- [x] Bundle the Vercel serverless handler so all local server imports resolve at runtime, then verify the live tRPC API.
- [x] Confirm and complete the GitHub public-visibility change and Vercel deployment.
- [x] Fix the managed-preview Vite HMR WebSocket connection failure without affecting the Vercel production deployment.
- [x] Commit and push the verified Vercel deployment and managed-preview WebSocket fixes to the public GitHub repository.
- [x] Expand all Dart and Flutter lessons with deeper beginner-friendly explanations, code walkthroughs, practical examples, common mistakes, and structured practice.
- [x] Restructure the curriculum into W3-style step-by-step lessons and add missing Dart and Flutter beginner-to-intermediate topics.
- [x] Add a browser-based Dart playground with editable lesson code, reset controls, and a safe copy-and-run workflow that opens official DartPad in a browser tab for execution and output.
- [x] Create an original Burmese step-by-step Flutter curriculum aligned to the Tutorialspoint topic sequence, then push and deploy the completed update.
- [x] Push the original 46-chapter Burmese Flutter curriculum update to the public GitHub repository.
- [x] Redeploy the updated public learning platform to Vercel after the GitHub source update is confirmed.
- [x] Replace W3-style lesson roadmaps with detailed book-like Burmese Flutter explanations and broaden advanced Flutter topic coverage.
- [x] Add Turso-backed full-course completion tracking, certificate eligibility checks, and secure certificate issuance.
- [x] Build a learner progress dashboard with clear overall/part progress bars and a printable completion certificate.
- [x] Test, publish, and verify the enhanced curriculum, progress, and certificate experience.
- [x] Verify the live Vercel learner route renders the updated 56-chapter advanced Flutter content after the latest deployment.
- [x] Defer authenticated production progress and certificate eligibility verification because this delivery is explicitly GitHub-only and must not rely on Vercel.
- [x] Remove the remaining visible Step-by-Step wording from legacy lesson titles before the final production verification.
- [x] Add topic-by-topic Burmese explanations for Dart declarations and Flutter widgets, including purpose, syntax, execution behavior, annotated examples, output, mistakes, and practical usage.
- [x] Render the topic explanation sections in the learner reader and keep lesson code/playground links compatible.
- [x] Test, checkpoint, push, and deploy the topic-level detailed curriculum update.

စီမံချက်မှတ်ချက်: User requested book-like explanations for topics such as var, final, const, variable declarations, Text, Drawer, Column, and buttons, including why they are used, how they work, code examples, output, and common mistakes.

### Plan: Topic-level Dart and Flutter explanation expansion
- [x] Audit current catalog and detailed-study model for topic-level gaps.
- [x] Design reusable topic explanation structure.
- [x] Write and integrate detailed Burmese Dart and Flutter topic content.
- [x] Render topic explanations in the learner reader and preserve playground compatibility.
- [x] Run tests/build, save checkpoint, push GitHub, deploy Vercel, and verify the update.

### User-provided Flutter-Coding PDF integration
- [x] Review the 256-page PDF in order and preserve its topic sequence in a source inventory.
- [x] Compare every PDF chapter/topic with the existing 56-chapter curriculum and identify missing or shallow coverage.
- [x] Add original Burmese explanations and code-focused lessons for missing PDF topics without reproducing the book's protected prose verbatim.
- [x] Integrate the expanded topic inventory with chapter search, reader rendering, CMS-safe content, progress tracking, and playground links.
- [x] Validate coverage completeness, tests, build, visual rendering, checkpoint, and GitHub sync; production status is intentionally excluded by the GitHub-only delivery constraint.

Source PDF: https://content.gitbook.com/content/egsIWleSdyH9rMLJ8ShI/blobs/xxfDEN1b4KipvOxna4wP/Flutter-Coding.pdf
Source metadata: "Coding Projects in Flutter: A Hands-On, Project-Based Introduction to Mobile App Development" by Edward Thornton; 256 pages; 2021.

### GitHub-only delivery constraint
- [x] Push and verify the latest validated PDF-derived curriculum on public GitHub `main` only; do not trigger or rely on Vercel deployment for this delivery.

### 500-lesson Burmese Dart & Flutter expansion
- [x] Design a sequential approximately 500-lesson architecture from Dart/Flutter definitions and setup through production engineering.
- [x] Create the complete ordered lesson inventory with lesson IDs, titles, prerequisites, part/chapter mapping, and practice outcomes.
- [x] Write original detailed Burmese lesson content in batches, including concepts, syntax, code, line-by-line explanation, output, mistakes, exercises, and diagrams where useful.
- [x] Integrate lesson units with search, learner navigation, CMS-safe existing chapter mappings, browser-local micro-lesson progress, certificate-compatible chapter mappings, and Dart Playground links.
- [x] Add automated lesson-count, ordering, content-shape, mapping, and focused regression tests; run production build and responsive verification. The broader suite's two Turso-auth tests currently hit a remote ConnectTimeout, while 18 non-remote tests pass.
- [x] Save checkpoints after major batches and push the validated 500-lesson curriculum to public GitHub.

### 500-lesson quality and platform integration follow-ups
- [x] Replace repetitive generated examples with genuinely topic-specific Burmese content and unique Dart/Flutter code for the first authored lesson batches, then extend the same authoring pattern across the inventory.
- [x] Add diagram-capable lesson fields and render at least the key execution, widget-tree, layout-constraint, async, and release diagrams in the learner browser.
- [x] Integrate micro-lessons into the actual global course search procedure and learner search UI, with regression coverage.
- [x] Define and test the CMS strategy for micro-lessons: either add safe editable micro-lesson overrides or explicitly document and test a deliberate non-editable source architecture.

### Authored coverage and end-to-end search validation
- [x] Extend authored micro-lesson overrides across additional Dart variables, Flutter widgets/layout, state, API, testing, and release batches with topic-specific code and Burmese walkthroughs.
- [x] Add regression assertions proving the authored override count and representative code samples are not the generic print template.
- [x] Add direct tRPC router coverage for course.searchAll and a learner-search result rendering assertion for micro-lesson results.

### Final authored/search UI verification
- [x] Add regression assertions for non-contiguous authored Dart, Flutter widget/layout, state, API, testing, and release lesson IDs with unique non-template examples.
- [x] Add a learner UI test for the Home search modal that verifies micro-lesson results render and link to `/lessons?lesson=...`; the extracted `MicroLessonSearchResults` component is rendered with React server markup and its href is asserted.

### Learner visibility fix
- [x] Remove the learner-facing CMS management header action while preserving admin route access for authorized users.
- [x] Make the 575-lesson library visibly reachable from the homepage and verify the `/lessons` route renders the full inventory and selected lesson.
- [ ] Validate the fix with tests, production build, responsive screenshots, checkpoint, and GitHub sync.
