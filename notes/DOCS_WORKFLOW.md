# Lovable — Build/Creation Workflow & Editor UX (from public docs)

Scope: facts extracted from the local doc mirror (`D:\lovable-research\evidence\docs\`, 322 pages). Every bullet is sourced with the relative doc path. UI labels/status strings are quoted verbatim in `backticks`. Anything the docs do not state is marked `UNKNOWN`.

Reading note: all 32 assigned pages were read. `prompting/prompting-library.md` is a 520-line prompt catalog; only its framing rules and plan-gated constraints are cited here (lines 1–180 read + keyword sweep).

---

## 1. Creation entry points

### 1.1 In-product entry points

| Entry point | What it produces | Source |
| - | - | - |
| Dashboard prompt box | New project + first build; label on the empty box reads `Ask Lovable to create…`; first version "takes a few minutes" | [introduction/getting-started.md] |
| Dashboard prompt + mode picker set to `Build` ("Make changes directly") | New project built immediately; `Build` is the default and the choice is remembered per browser | [introduction/dashboard-overview.md] |
| Dashboard prompt + mode picker set to `Plan` ("Detailed spec for complex builds") | New project that starts in Plan mode, so Lovable "investigates and writes a plan without changing code" | [introduction/dashboard-overview.md] |
| Dashboard prompt + mode picker set to `Chat` ("Ask anything, explore ideas") | A chat *outside* any project; project options are hidden; send button reads `Chat for free` while the workspace daily chat allowance lasts; waveform button starts a voice conversation | [introduction/dashboard-overview.md] |
| Sidebar `New` / `Recent chats` `+` → `New chat` | Reopens the dashboard prompt box and keeps the last used mode | [introduction/dashboard-overview.md] |
| `+` menu → `Import project to Lovable` | New project rebuilt from a ZIP or another builder's export | [introduction/dashboard-overview.md] |
| `+` menu → `Design` | Starts from a design template library (Business/Enterprise) or applies a design system (all paid plans); a workspace default design system is pre-selected | [introduction/dashboard-overview.md] |
| `+` menu → `Attach` | Upload images/files or capture a screenshot as first-prompt context | [introduction/dashboard-overview.md] |
| `+` menu → `Connectors` | Attaches chat connectors (MCP servers) for build-time context | [introduction/dashboard-overview.md] |
| `+` menu → `Databases` | Wires the built-in backend or Supabase into the new project | [introduction/dashboard-overview.md] |
| Import an existing website by URL | Lovable "rebuilds it as a project" from the URL of a site you own | [features/projects/overview.md] |
| Remix (own project, remixable project, Lovable template) | Independent copy; remixing a template is allowed on any plan | [features/projects/overview.md] |
| From Chats | Approve the `Create a new project?` card after describing the app | [features/projects/overview.md] |
| `Build with URL` | Generates a project from a shareable link that carries a prompt (for an embeddable "Build with Lovable" button) | [features/projects/overview.md] |
| Dashboard `Lovable templates` tab / `lovable.dev/templates` | Pre-made app to remix, any plan | [introduction/dashboard-overview.md] |

- Dictation: the prompt input has a microphone; the same microphone lives in the project chat with `Option+V` / `Alt+V` and inserts a live transcript with filler words removed (`check` inserts, `X` discards) [introduction/dashboard-overview.md] [features/projects/chat.md]
- The prompt typed on the homepage survives sign-up; sign-up methods are email, Google, GitHub, Apple [introduction/getting-started.md]
- Project access defaults to **workspace** on all plans and can be changed from the `Share` button in the top bar; on Business/Enterprise the access level can be set *before* the project exists [introduction/dashboard-overview.md]
- Free plan includes 5 build credits per day, up to 30 per month (creation-time constraint, see §5) [introduction/getting-started.md]

### 1.2 Non-browser surfaces (all produce/edit the same projects)

- Desktop app, mobile app, ChatGPT app, Lovable in Slack, Telegram bot, and the Lovable MCP server [features/projects/overview.md]
- Mobile layout differences: the sidebar groups projects into `Owned by me` / `Shared with me`; the editor uses swipeable views instead of side-by-side panes [introduction/dashboard-overview.md] [features/projects/editor.md]

### 1.3 What a project contains

- One app per project; a project belongs to exactly one workspace, has exactly one owner, and holds the project chat, preview, code, version history, and settings [features/projects/overview.md]
- No save button: "every edit it makes becomes a version in your project's version history" [features/projects/overview.md]
- Publishing is a snapshot: after publish, later changes stay unpublished until `Publish` → `Publish changes` is used again [introduction/getting-started.md]
- First publish suggests a `lovable.app` subdomain and deploys on `Publish`; the subdomain is editable later under `Project settings` → `URL subdomain` and a rename does **not** change the URL [introduction/getting-started.md] [features/projects/overview.md]

---

## 2. Chat turn lifecycle

### 2.1 Turn execution model

- The chat panel is the left pane of the editor. The agent loop is documented as: gather context → take an action with tools → check the result → repeat [features/projects/chat.md]
- Build mode ("previously Agent mode") executes autonomously: implement features, fix bugs, refactor across files, coordinate frontend/backend/config, debug, inspect logs and network, fetch external docs/assets, generate or edit images and videos, and verify results; changes surface as file diffs plus a summary [features/agent-mode.md]
- Build mode runs up to **10 hours** on a single message; the final half hour is spent wrapping up and summarizing. The long-run allowance applies only to Build mode messages and goals [features/agent-mode.md]
- Work continues server-side: closing the browser does not stop a request [features/projects/chat.md]
- Verification tools available during a turn: browser testing, frontend tests, edge-function verification — "most run only when you ask" [features/agent-mode.md]

### 2.2 What the UI shows during a turn

| UI element | Behavior / exact labels | Source |
| - | - | - |
| Activity cards | One card per action: file edits, commands, web searches, browser tests, delegated subagents | [features/projects/chat.md] |
| Build-mode task list | On bigger Build requests Lovable shows the tasks it is working through | [features/projects/chat.md] |
| Live status line | Current step, files being modified, tools in use (search, web fetch, image generation), progress | [features/agent-mode.md] |
| `Details` / Details view | Opens *where the preview usually appears*; `Timeline` tab (every step incl. tool calls) and `Changes` tab (file changes); `Hide details` returns to the preview | [features/agent-mode.md] |
| Timer + spend | `Working for` and `Credits used` while running; labels flip to `Worked for` and `Credits used` when finished; both live in the response's `More options` menu | [features/projects/chat.md] |
| Credit check-in | Pauses the turn; the `More options` menu is hidden while paused; the check-in card states the cost so far | [features/projects/chat.md] |
| `stop button` | Stops immediately; completed work is kept and the message is still charged for work done; a new message then starts fresh | [features/projects/chat.md] |
| Follow-up messages | Typed while working, shown grayed out until picked up at the next natural stopping point; direction changes are absorbed without losing completed work | [features/projects/chat.md] |
| `Runs after the current task` | Badge on messages that always execute as a separate request: `Try to fix` and other one-click fixes, inline text edits and comment threads sent from the preview toolbar, anything sent while a free fix is running | [features/projects/chat.md] |
| Question card | Up to four questions with selectable options or free text; `Skip` / `Skip all`; answers steer the *current* run; drafts survive a page refresh | [features/projects/chat.md] |
| `Try to fix` | Appears on the activity card when a build error occurs; scans logs and attempts a fix | [features/projects/chat.md] |
| Browser-test evidence | Details view shows steps, screenshots, URLs, and results plus a summary | [features/browser-testing.md] |
| Preview states | `Starting live preview…`; `Still building?` with `Keep building`; errors `Live preview couldn't start`, `Live preview lost connection`, `Live preview stopped responding`, each with `Try again` | [features/projects/preview.md] |
| Notifications | Desktop may offer browser notifications when a task finishes or needs input | [features/projects/chat.md] |

### 2.3 Message and response structure

- A turn = user message + optional attachments + streamed activity cards + final assistant response + a row of actions [features/projects/chat.md]
- Finished-response actions: `Undo latest edit` (confirm with `Undo`), `Revert to this version` (earlier responses), `Copy`, `Helpful` / `Not helpful` [features/projects/chat.md]
- `More options` on a response: `Copy message link`, `Preview` (see the app as it was after that message without reverting), `Worked for`, `Credits used` [features/projects/chat.md]
- `Bookmark in history` toggle on a finished activity card saves that version as a bookmark [features/projects/chat.md] [features/projects/history.md]
- Own past text-only messages can be rewritten: `Edit message` → `Revert and resend` (project returns to the pre-message state, new prompt runs) [features/projects/chat.md]
- Suggestion chips after a response prefill the prompt box; disable via `Chat suggestions` [features/projects/chat.md]
- Out of credits mid-turn: the message pauses (does not end) and the card offers `Add credits` to resume or `Finish up` to stop cleanly [features/projects/chat.md]

### 2.4 Attachments / images as turn input

- Accepted types: images, PDF, Word, Excel, PowerPoint, audio recordings, plus `.fig` Figma files [features/projects/chat.md]
- Size caps: 20 MB per file (Free), 256 MB (paid), 1 GB (Enterprise); up to 10 files per message; images capped at 15 MB total per message and auto-compressed [features/projects/chat.md]
- Attachment previews are type-specific: code (syntax highlighted, language named), Markdown (`Preview` / `Source`), CSV/TSV table capped at 500 rows × 50 columns, ZIP listing capped at the first 100 files (listing only, nothing extracted), PDF inline (mobile shows `Open PDF`); text files over 1 MB cannot be previewed but still work as context [features/projects/chat.md]
- Image viewer supports zoom, pan, `Draw` → `Save` (annotated image is sent with the message) and `Add to chat` for images already in the conversation, e.g. Lovable's own screenshots [features/projects/chat.md]

### 2.5 Mode differences

| | `Build` (formerly Agent mode) | `Chat` | `Plan` | Manual code editing (`Code` tab) |
| - | - | - | - | - |
| Shipped by | Changes code directly | Discussion only | Writes a plan, never code | User edits files |
| Can edit files | Yes | **No** — never creates/edits project files | **No** | Yes (paid plans) |
| Can touch backend | Yes | **No** — no DB changes/migrations, no image/video generation, no backend/auth/email enablement, no publish | No | No |
| Output artifact | File diffs + summary | Answer + optional `Start building` card | Plan in Plan view, saved to `.lovable/plan.md` | Saved file version |
| Pricing | Usage-based on work completed | Priced on work, "typically a fraction of a credit", covered first by daily chat allowance | One credit plus subagent research | No credits |
| Switching | Approving a plan switches to Build | `Build` on the card → `Switched to Build mode`; `Skip` → `Kept Chat mode` | `Approve` implements immediately | n/a |
| Source | [features/agent-mode.md] | [features/chat-mode.md] | [features/plan-mode.md] | [features/code-mode.md] |

- Mode picker cycles Build → Chat → Plan with `Option+P` / `Alt+P`; the conversation carries across modes [features/projects/chat.md]
- In Plan mode, the plan view supports inline `Edit`, `Highlight` a section to request a change, and `Approve`; the chat-side plan card offers `Approve` / `Skip` [features/plan-mode.md]
- Plan revisions are themselves Plan-mode messages (one credit + research each): select text → `Comment` → `Describe the change...` → Enter [features/plan-mode.md]
- Plan versioning: undo/redo arrows, banner `Viewing version 2 of 3`, read-only older versions, `Back to latest`; with unsaved edits `Approve` becomes `Save & approve`; a saved plan awaiting approval shows the label `Updated plan` [features/plan-mode.md]
- Plan persistence: in-progress plan lives at `.lovable/plan.md`; on approval it moves to a dated file inside `.lovable/plan/` and `.lovable/plan.md` starts fresh [features/plan-mode.md]
- Other Chat→Build gates: non-card build buttons ask `Switch to Build mode?` with `Continue` / `Cancel`; the `Start building` card is marked `(Uses credits)` [features/chat-mode.md]

---

## 3. Agent capability list

| Capability | Summary (1–2 sentences) | Doc |
| - | - | - |
| Planning (Plan mode) | Investigates files/logs and produces an editable, versioned plan without changing code; approving the plan hands off to Build mode and implements immediately. | [features/plan-mode.md] |
| Subagents | Temporary **read-only** agents with fresh context that run independently (several in parallel) and report findings; they cannot change the project — every file change comes from the main agent. Two kinds: generic (findings in a requested shape) and `Explore` (traceable evidence, uses the most capable model). | [features/subagents.md] |
| Skills | Workspace-level reusable playbooks with a name, trigger description, and Markdown instructions, packaged as portable `SKILL.md`; invoked as a `/` command or applied automatically when the task matches. | [features/skills.md] |
| Memory | Automatically captures durable preferences/decisions from chat; project memory is per project (shared with editors) and personal memory is per user per workspace, with project memory winning on conflict. | [features/memory.md] |
| Instructions / Knowledge | Two levels (workspace + project) of plain-text rules, each up to 10,000 characters, always included in context; project instructions outrank workspace instructions on conflict. | [features/knowledge.md] |
| Goal runs | `/goal` (or the `Goal` skill) marks one message as a goal that keeps working until achieved, up to 10 hours, always in Build mode, without pausing to ask questions. | [features/goal-runs.md] |
| Jobs | Scheduled background tasks in the built-in backend, reviewable at `More` → `Database` → `Manage` → `Jobs`, with run history statuses `Succeeded` / `Failed` / `Running`. | [features/jobs.md] |
| Generate files | Writes and runs scripts in an isolated Linux sandbox (Python/Node/Bun/Deno/Bash + pandas, NumPy, SciPy, DuckDB, matplotlib, Pillow, psql) to produce artifacts like PDFs, CSVs, charts, decks, and diagrams without touching project source. | [features/generate-files.md] |
| Browser testing | Drives a real browser in a remote virtual environment to click, fill forms, navigate, screenshot, and read console/network output while testing the current project's preview. | [features/browser-testing.md] |
| Logs | Searchable built-in backend logs across server, edge functions, auth, PostgreSQL, realtime, and storage, with time-range and status filters, plus a paste-into-chat workflow for fixes. | [features/logs.md] |
| Design guidance | Asks up to four pre-build design questions (palette swatches, font pairs, layout wireframes) or builds directly when the direction is already specified. | [features/design-guidance.md] |
| Cross-project referencing | Read-only reuse of another workspace project's code, patterns, assets, and chat history via `@` mentions; referenced projects are never modified. | [features/cross-project-referencing.md] |
| Drafts | Branch-like copies with their own chat and preview, merged back with `Accept` and rebased with `Update`. | [features/drafts.md] |
| Preview toolbar edits | `Select elements`, `Edit text inline`, `Draw annotation`, `Add a comment` — element-scoped instructions instead of whole-page re-prompts. | [features/preview-toolbar.md] |
| Comment threads | Pinned, resolvable feedback threads on preview elements that can be sent to Lovable as structured context. | [features/project-comments.md] |

---

## 4. Editor & preview

### 4.1 Layout and navigation

- Desktop browser layout: project chat on the left, preview on the right; everything else lives in the top bar [features/projects/editor.md]
- Top bar: project name (opens the draft switcher; in a draft the name is shown with the draft name beside it), `History` toggle, `Hide chat panel` / `Show chat panel` (`Cmd+B` / `Ctrl+B`) [features/projects/editor.md]
- In-project sidebar mirrors the dashboard sidebar; the menu icon top-left opens it on hover (temporary) or pins it on click; `[` toggles; the workspace switcher shows the credit bar and `Personal usage` / `Personal credits` [features/projects/editor.md]
- Project toolbar tabs: `Preview` (home), `Files` (generated + uploaded deliverables, collections), `Code`, `More` [features/projects/editor.md]
- `More` panel entries: `Analytics`, `Database` (+ `Manage` → SQL editor, scheduled jobs, edge functions, backups, access policies, settings), `Users`, `Storage`, `AI`, `AI` → `Agent integrations`, `Payments`, `Emails`, `Connectors`, `Security`, `Security` → `Sensitive data`, `SEO & AI search`, `Usage` (with `Build` / `Run` filters), `Settings` (`General`, `Instructions`, `Domains`, `Git`, plus `Secrets` / `Logs` on backend projects); with your own Supabase the backend entries are replaced [features/projects/editor.md]
- Top-right controls above the preview: preview-toolbar button, `Comments` (shown when the toolbar is hidden), collaborator avatars, `Share`, `Publish` [features/projects/editor.md]
- Command palette `Cmd+K` / `Ctrl+K` finds projects, folders, settings; its `Drafts` group lists `Main preview` plus every draft [features/projects/editor.md] [features/drafts.md]

### 4.2 Preview

- The preview is a staging environment that shares the published app's backend and data; each draft gets its own preview at its own address [features/projects/preview.md]
- Controls bar: device toggle `Desktop view` / `Tablet view` / `Mobile view`; page selector ("Find page or enter path") whose hover cards offer `Social` and `Search` previews and `Ask Lovable to edit`; `Refresh`, where **Shift+click restarts the preview environment**; `Open in new tab` (requires being logged in to Lovable with project access) [features/projects/preview.md]
- Idle behavior: a `Still building?` prompt pauses the environment, `Keep building` resumes it, and the published site is unaffected [features/projects/preview.md]
- With `Live preview` disabled (`Project settings` → `General` → `Preview`), the preview shows the last completed version, version switching does not restart the environment, and it never pauses [features/projects/preview.md]
- Sharing: `Share` → `Share a preview link` creates view-only, account-less links (multiple, individually named); guest comments optional; Free/Pro links expire after 7 days; Business/Enterprise add a password and expiry of 24 h / 7 days / 30 days / never; Enterprise can disable the feature [features/projects/preview.md]

### 4.3 Preview toolbar (all plans)

| Mode | Shortcut | Behavior | Cost |
| - | - | - | - |
| `Select elements` | `S` | Click an element to attach it as a reference; `Cmd`/`Ctrl`+click adds more; describe the change and send | Standard build usage |
| `Edit text inline` | `T` | Edit text in place and press `Send` | First 100 edits per account free (each recharges after 24 h), shared workspace cap of 2,000 free edits per 24 h, then standard build usage |
| `Draw annotation` | `D` | Freehand or lines/arrows/rectangles/ellipses; rough shapes are auto-cleaned; sketch is sent as an annotation | Build usage |
| `Add a comment` | `C` | Pin a thread on an element; replies notify participants | Commenting free; sending the thread to Lovable costs build usage |

- Toolbar chrome: `Dock`, `Minimize`, `Hide`; starts docked bottom-center, is draggable with corner snapping, minimizes to an edge tab, and restores via the preview-toolbar icon in the top-right controls; it remembers state/position; theme `Auto` / `Light` / `Dark` [features/preview-toolbar.md]
- The toolbar replaced the older `Visual edits` feature; element selection, inline text editing, annotation, and comments were consolidated into these four modes [features/preview-toolbar.md]

### 4.4 Code view

- File panel with `Expand all` / `Collapse all`, open files as reorderable tabs, right-click menu `Open` / `Reference in chat`; search via `Search code` or `Cmd+Shift+F` / `Ctrl+Shift+F` (results grouped `Files` / `In files`); `Cmd+F` searches within a file, replace is paid-plan only [features/code-mode.md]
- File toolbar: `Preview markdown` (eye icon for `.md`), `Copy file content`, `Download` (all plans) [features/code-mode.md]
- Editing is paid-plan only; Free shows `Read only` plus `Upgrade`; `Save` / `Cmd+S` or `Discard`; every save creates a version; `Save` is disabled while Lovable is working; manual edits are not reviewed by Lovable [features/code-mode.md]
- Line references: hover a line number for a `+` chip, drag for a range, `Cmd+Shift+L` / `Ctrl+Shift+L` for the cursor line or selection; references appear as pills such as `Button.tsx:42` [features/code-mode.md]
- `Download codebase` (paid, edit access) exports a `.zip`; also available from `Project settings` → `Git`; Enterprise can restrict downloads to admins/owners; code edits spend no credits [features/code-mode.md]
- File referencing in chat: type `@` and pick a file, or use `Reference file in chat` in the code editor, e.g. `@src/components/UserProfile.tsx add a loading state here` [features/agent-mode.md]

### 4.5 Version history, revert, bookmarks

- Every change is a version; there is no save button; the panel has `History` and `Bookmarks` tabs and opens from the `History` toggle or `+` → `Project` → `History` [features/projects/history.md]
- Clicking a version shows that snapshot with `Back to latest`; per-version `More actions` offers `Open preview in new tab`, `View code changes` (diff), `Go to message in chat`; `Revert` tooltip is `Revert to this version`; `Bookmark` saves it; a `Published` badge marks the live version [features/projects/history.md]
- Revert is confirmed in a dialog showing the date, with `Revert` or `View in chat`; it restores **code only** (plus redeploying edge functions) and never restores database data; chat history is preserved [features/projects/history.md]
- Revert is disabled when already on that version, for versions from before a remix of a built-in-backend project, or when the version is very old (tooltip `Cannot revert this far back in history`); reverting is "all or nothing per version" and does not refund credits [features/projects/history.md]
- Accepted drafts appear in history as their own named group and cannot be reverted edit-by-edit [features/projects/history.md]

### 4.6 Drafts (branch workflow)

- Vocabulary: `Main`, `Draft`, `Update`, `Accept`, `Delete`, `Publish`; a draft has its own chat, preview, and edits; `Accept` merges into the project's unpublished changes and `Delete` discards, and only `Main` can be published [features/drafts.md]
- Entry: click the project name → draft switcher → `New draft`; the draft is named `Draft 1` then renamed from the first prompt; rename via the draft's `⋮` → `Rename`, max 80 characters [features/drafts.md]
- `Accept` is available in the top-right where `Publish` normally sits, at the bottom of the switcher, and in the `⋮` menu; before accepting Lovable shows a one-line summary then the edits; the summary is kept as `Draft summary` on the accepted change in chat and history [features/drafts.md]
- Draft status indicators: spinning circle (with a label such as `Updating draft` / `Accepting draft`), gray dot `Updates available`, blue dot `New changes`, orange question mark `Lovable needs your input`, red triangle `Operation failed` / `Update failed`; the main row shows `Changes ready to publish` (with a count), `Everything is published`, or `Unpublished project` [features/drafts.md]
- Team behavior: everyone with edit access sees the same drafts, drafts show who is working in them, `All drafts` / `My drafts` tabs appear when someone else has a draft, and simultaneous accepts queue behind an `Accepting drafts` card that can be reordered [features/drafts.md]

### 4.7 Remix / fork

- Remix creates an independent copy; `Public remixing` lives in `Project settings` → `Sharing` and is off by default (not available on Enterprise) [features/projects/remix.md]
- Entry points: editor sidebar `⋯` → `Remix`, `Project settings` → `Project actions` → `Remix`, dashboard card menu `Remix`, template card `⋯` → `Remix` or `Preview` → `Use template` [features/projects/remix.md]
- Dialog fields: `Project name` (prefilled `Remix of <name>`), `Target workspace` (only with more than one), `Target folder`, `Include project history`, `Copy project files to new project`, `Include custom knowledge`; templates add a security acknowledgment button `Acknowledge and remix` [features/projects/remix.md]
- Carried over: code, database structure (tables/schema, not records), and — only when switched on — chat history, Files, and instructions; not carried: database data, version history (unless enabled), secrets, custom domains, publish state (copy starts unpublished), collaborators, Git sync/connectors; new API keys are issued [features/projects/remix.md]
- A non-member visitor sees only the latest-version preview and a `Remix` button; a logged-in non-member also sees the project and creator names; anonymous users hit `Log in to remix` [features/projects/remix.md]

### 4.8 Collaboration and comments

- Invite paths: `Share` in the editor for a specific project (email invite), `Workspace settings` → `People` for the workspace; collaborators spend the project owner's workspace credits [features/collaboration.md]
- Project roles: `Owner` (exactly one), `Admin` (paid), `Editor` (default, all plans), `Viewer` (paid); the permission matrix grants publishing to editors and above, while `Transfer project`, `Delete project`, and `Restore deleted project` are owner-only and `Disconnect Supabase` needs admin [features/collaboration.md]
- Workspace roles add owner-only `Add Owner` / `Remove Owner`, with `View usage`, `Manage plans & billing`, `Manage SSO`, and `Manage Integrations` restricted to admins and owners; free plans have no admin role [features/collaboration.md]
- Comments: `Add a comment` (or `C`) → click an element → type → `Send`; pins are anchored to the element, appear only in comment mode, and show a lost-reference indicator if the element moves or disappears [features/project-comments.md]
- Thread actions: reply, `Resolve` / unresolve, `Edit`, `Delete` (deleted comments render as `[Deleted]`), emoji reactions, `@Lovable` mention or `Send to chat` to hand the whole thread (page + element + comments) to Lovable as structured feedback [features/project-comments.md]
- Comments sidebar: browse open/resolved threads, search by text or author, sort by date or read status, unread highlighting, click to jump to the pin [features/project-comments.md]
- Guest comments come only from shared preview links with `Allow comments` enabled (default on, per link), never from the published app URL; an expired link shows `This preview link has expired` [features/project-comments.md]

---

## 5. Model & cost

### 5.1 Model choice

- No user-facing model picker for the build agent is documented in the assigned pages: `UNKNOWN` [features/agent-mode.md] [features/chat-mode.md]
- Documented model *routing* exists for subagents: `Explore` subagents use the most capable model, while routine research is routed to lighter models [features/subagents.md]
- Enterprise `EU inference` (outside the assigned set) governs which model endpoints serve build and app requests and notes Claude models among providers; it does not expose a per-message model choice [features/eu-inference.md]

### 5.2 Credits per action

| Action | Documented cost | Source |
| - | - | - |
| Build mode message | Usage-based on files modified, logic complexity, codebase exploration, and tools used; no upfront estimate; many small requests stay under 1 credit | [features/agent-mode.md] [features/projects/chat.md] |
| Chat mode message | Priced on the work needed, "typically a fraction of a credit", covered first by the workspace daily chat allowance; `Credits used` reads `Free` when covered | [features/chat-mode.md] [features/projects/chat.md] |
| Plan mode message | One credit plus subagent research | [features/plan-mode.md] |
| Goal run | Build-mode pricing for the whole run, potentially "a large number of credits" | [features/goal-runs.md] |
| `Try to fix` | 10 free fixes per account shared with Security-view fixes, each recharging 24 h after use; afterwards standard build usage; security scans themselves are always free | [features/projects/chat.md] |
| Inline text edits | 100 free per account (24 h recharge), workspace cap 2,000 free per 24 h, then build usage | [features/preview-toolbar.md] |
| `Select elements` / `Draw annotation` | Standard build usage | [features/preview-toolbar.md] |
| Comments | Free to create; sending a thread to Lovable costs build usage | [features/project-comments.md] |
| Image / video generation | Build credits; appear as `Image generation` and `Video generation` in usage details | [features/projects/chat.md] |
| Manual code edits | No credits | [features/code-mode.md] |
| Draft create / update / accept / delete | No credits; messages inside a draft cost the same as in main | [features/drafts.md] |
| First import build | First build of the first import is free (one free import shared with website imports, per account and workspace, consumed on project creation even if the import fails); later messages are standard build usage | [features/projects/import-project.md] |
| Scheduled job run | Consumes Cloud usage per run | [features/jobs.md] |
| Design questions | Part of the message, no extra credits | [features/design-guidance.md] |

### 5.3 Allowances, limits, and controls

- Free plan: 5 build credits per day, up to 30 per month [introduction/getting-started.md]
- Chat allowance: per workspace (Free/Pro/Business), resets at 00:00 UTC, does not roll over, then daily build credits, then general credits; Enterprise has no chat allowance; the picker shows a `Free` badge; the pricing model is described as applying through **October 31, 2026** (temporary) [features/chat-mode.md]
- Credit check-in: a configurable threshold, default **20 credits** (beta), pauses a long Build run for approval [features/agent-mode.md]
- Pausing/resuming: running out mid-turn offers `Add credits` (resume) or `Finish up` (stop cleanly); paused work waits indefinitely [features/projects/chat.md]
- Documented ways to control spend: narrow the scope, plan first, use check-ins, use the stop button, inspect the Details view, check the balance in `Workspace settings` → `Plans & credit usage`, and be deliberate with goals [features/agent-mode.md]
- Remix, revert, and deletion refund semantics: revert does not refund credits [features/projects/history.md]; remix pricing is `UNKNOWN` in the docs [features/projects/remix.md]

---

## 6. Notable constraints & gotchas (as stated)

### 6.1 What the agent cannot do

- Chat mode never creates or edits project files, changes the database or runs migrations, generates/edits images or videos, enables backend/auth/email, publishes, or produces a Plan-view plan [features/chat-mode.md]
- Subagents cannot modify the project; all edits come from the main agent [features/subagents.md]
- Browser testing cannot interact with canvas/drawing tools, is unreliable for custom file-upload widgets, drag-and-drop (vs clicks), clipboard/text selection, subtle visual or color differences, and icon-only buttons; signed-in testing requires the built-in backend [features/browser-testing.md]
- Backend testing on external Supabase (or another auth provider) covers only signed-out pages; signing in as a specific person requires approval and an admin/owner role [features/browser-testing.md]
- Goals do not pause to ask clarifying questions (only for credit check-ins) and cannot be started while Lovable is working on a regular message [features/goal-runs.md]
- `Try to fix` is blocked from the Publish dialog only by an unresolved build failure; publishing itself is blocked while the latest build fails [features/projects/chat.md]

### 6.2 Hard size/number limits

| Limit | Value | Source |
| - | - | - |
| Attachment size | 20 MB Free / 256 MB paid / 1 GB Enterprise; 10 files per message; 15 MB total images per message | [features/projects/chat.md] |
| Attachment preview | CSV shows max 500 rows × 50 columns; ZIP lists max 100 files; text over 1 MB not previewable (still usable as context) | [features/projects/chat.md] |
| Repo file size | 10 MB per-file commit limit; error text `The following file(s) exceed the 10 MB per-file commit limit`, fixable by migrating to CDN; files pushed via Git can be larger but cannot be changed afterwards | [features/projects/chat.md] |
| Import ZIP | 250 MB max; exclude `.env`, `node_modules`, build output | [features/projects/import-project.md] |
| Data import | CSV/JSON, 2 MB per file, 10 files / 25 MB per message, no single SQL dump | [features/projects/import-project.md] |
| Instructions | 10,000 characters each for project and workspace instructions | [features/knowledge.md] |
| Skill package | `SKILL.md` ≤ 100,000 characters; bundled files ≤ 1 MB each, ≤ 200 files, ≤ 10 MB total; ZIP upload ≤ 50 MB | [features/skills.md] |
| Skill name | 1–64 chars, lowercase letters/numbers/hyphens, no leading/trailing/double hyphens, immutable, `goal` reserved | [features/skills.md] |
| Files collections | 100 collections per project, 500 files per collection | [features/generate-files.md] |
| Draft name | 80 characters | [features/drafts.md] |
| Build run length | 10 hours max per message, final half hour wraps up | [features/agent-mode.md] |
| Goal run length | 10 hours max | [features/goal-runs.md] |
| Logs retention | Relative ranges up to 5 days, plus absolute ranges; not live, requires `Refresh` | [features/logs.md] |
| Preview links | Free/Pro expire after 7 days; Business/Enterprise configurable 24 h / 7 d / 30 d / never | [features/projects/preview.md] |

### 6.3 Behavioral gotchas

- Autosave ≠ auto-organized: every change is a version, so the docs advise one meaningful change at a time, bookmarking known-good states, and previewing before risky redesigns [prompting/prompting-one.md]
- Broad prompts degrade results (`Nothing works, fix it!` is called out as an anti-pattern); specify symptom, location, expectation, and attach a screenshot or exact error [prompting/prompting-debugging.md]
- Without explicit scope guardrails a small request "can ripple into parts of the app that already work"; name what must stay untouched [prompting/prompting-one.md]
- After one or two failed blind fixes the docs recommend switching to Plan mode for root-cause analysis instead of retrying [prompting/prompting-debugging.md]
- Revert restores code only and never database data; it is all-or-nothing, can be unavailable for old versions, and cannot be applied per-edit to accepted drafts [features/projects/history.md] [features/drafts.md]
- Drafts share the real backend and data: edits and deletions made while testing are real, and deleting a draft does not undo them [features/drafts.md]
- Drafts cannot change sign-in methods, secrets, backend functions, file-storage settings, AI enablement, payments, email sending, or enable the built-in backend — those must be done in `Main` [features/drafts.md]
- Drafts can only *add* tables/columns/rules; removals or renames are achieved additively and otherwise deferred to the SQL editor; pages reading a not-yet-created table error in the draft preview until the draft is accepted [features/drafts.md]
- Drafts do not support Git sync (no branch appears in the repository), a draft preview may require signing in again, and an editless draft is removed after 24 hours [features/drafts.md]
- Accepting a draft does not publish it, and a draft has no `Publish` button [features/drafts.md]
- Remix is refused when the project uses an external Supabase project you lack edit access to, when public remixing is disabled, when an Enterprise cross-workspace permission is missing, when payments are enabled, when a Shopify store is connected, or when the app sends email from its own domain [features/projects/remix.md]
- Import cannot carry passwords or sessions; users must re-verify email and set a new password; the code export contains no records, users, or uploaded files [features/projects/import-project.md]
- Cross-project referencing is same-workspace only, read-only, excludes database records, and can be disabled at workspace or project level; large files or results may be truncated [features/cross-project-referencing.md]
- Memory excludes anything readable in code, per-request detail, and secret-shaped values; turning memory off does not delete saved memory or change `AGENTS.md`; a remix into another workspace starts with no project memory [features/memory.md]
- Instructions are always in context but "in very long conversations instructions may not be followed consistently" [features/knowledge.md]
- Built-in Lovable skills are read-only (cannot be edited, deleted, or downloaded), and skills are not available in Chats [features/skills.md]
- Comment pins can lose their anchor when layout changes, and guest comments exist only on preview links, not on the published app [features/project-comments.md]
- The message queue is deprecated in favor of follow-ups; queued messages that remain can be repeated up to 50 times [features/projects/chat.md]
- Design questions are skipped for templates, design systems, purely functional requests, and app types with standard defaults (dashboards, admin panels) [features/design-guidance.md]
- `Open in new tab` for the preview requires a Lovable login that has access to the project [features/projects/preview.md]
- Logs return `Rate limit reached` when requested too frequently [features/logs.md]
- App emails require a paid plan plus a verified domain; built-in payments require Pro or higher and admin/owner setup [prompting/prompting-library.md]

### 6.4 Unknowns

- Build-agent model names, versions, and any user-selectable model tier: `UNKNOWN` in the reviewed pages [features/agent-mode.md]
- Exact credit prices per model call and per generated image/video: `UNKNOWN` (docs only describe the pricing dimensions) [features/agent-mode.md] [features/projects/chat.md]
- Remix credit cost: `UNKNOWN` [features/projects/remix.md]
- Seats/plan mapping for large workspaces: no numeric project cap is documented — plans are priced by credits rather than seats, and every project lives in exactly one workspace [features/projects/overview.md]
