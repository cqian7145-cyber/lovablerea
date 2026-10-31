# Foundry — a small, original AI app builder

A minimal but complete "prompt → files → build → live preview → version" loop, built as a
self-contained Next.js app. It is **not** a clone of any commercial product: no vendor assets,
no vendor code, no proprietary prompts. It exists to prove the architecture in
`../05_ARCHITECTURE_PROPOSAL.md` end to end on one machine.

```
┌──────────────┐   POST /api/turns (SSE)   ┌───────────────┐
│  Workspace   │ ────────────────────────► │  Agent loop   │
│  (React 19)  │ ◄──────────────────────── │  (lib/agent)  │
└──────┬───────┘   events as they happen   └──────┬────────┘
       │ iframe src=/api/preview/<id>             │ tool calls
       ▼                                          ▼
┌──────────────┐                          ┌───────────────┐
│  Preview     │ ◄── dist/assets/*.js ─── │   Sandbox     │
│  (sandboxed) │                          │ D:\foundry-…  │
└──────────────┘                          └───────────────┘
```

## What it does

1. **Create a project** — a fresh directory is scaffolded with `index.html`, `src/main.jsx`,
   `src/App.jsx`, `src/style.css`, plus a private git repository.
2. **Send a prompt** — `POST /api/turns` streams Server-Sent Events back to the browser:
   `status → plan → tool_call → tool_result → file_edited → build_started → build_completed →
   assistant → version → done`.
3. **The agent edits files** through a small tool surface (`list_files`, `read_file`,
   `write_file`, `delete_file`, `run_build`). Paths are resolved with a normalisation +
   containment check, and `dist/` and `node_modules/` are off limits.
4. **Every turn is built** — esbuild compiles `src/main.jsx` → `dist/assets/app.js` and
   `src/style.css` → `dist/assets/app.css`. Build errors come back as data, not as a crash, so
   the agent can read them and try again.
5. **The preview reloads** — the iframe points at `/api/preview/<id>/` and is re-keyed after a
   successful build.
6. **Every turn is a version** — the sandbox is a git repo; the Versions tab lists commits and
   can revert the working tree to any of them.

## Run it

```bash
cd app
npm install          # deps are installed from the registry configured in .npmrc
npm run dev          # http://127.0.0.1:3100
```

No API key is required: without `DEEPSEEK_API_KEY` the agent runs a **deterministic mock
provider** that writes a real landing page, so the whole pipeline is demoable offline.

### Using DeepSeek for real turns

```bash
# app/.env.local
DEEPSEEK_API_KEY=sk-...
DEEPSEEK_MODEL=deepseek-chat          # optional
DEEPSEEK_BASE_URL=https://api.deepseek.com   # optional
AGENT_PROVIDER=deepseek               # force the real provider even if the key is set to mock
```

The agent sends the tool schema in OpenAI-compatible form, executes every `tool_call`, feeds the
result back as a `tool` message, and stops when the model answers without tool calls or when
`MAX_STEPS` (14) is reached. It always finishes with a `run_build`.

## Configuration

| Env var | Default | Meaning |
| --- | --- | --- |
| `PROJECTS_ROOT` | `D:\foundry-projects` (`<repo>/../..`) | Where sandboxes live. **Must stay outside any git repo**, otherwise a project `git init` would attach to the parent repository. |
| `DEEPSEEK_API_KEY` | — | Enables the real provider. |
| `DEEPSEEK_MODEL` | `deepseek-chat` | Model name. |
| `DEEPSEEK_BASE_URL` | `https://api.deepseek.com` | Any OpenAI-compatible endpoint. |
| `AGENT_PROVIDER` | `auto` | `mock` forces the offline provider. |

## Safety model (deliberately small)

- Sandboxes live outside the app directory and are **not** reachable from the preview URL
  except through the whitelist in `app/api/preview/[id]/[[...path]]/route.ts`.
- Only the five tools above exist; there is no shell tool, so generated code cannot run
  arbitrary commands on the host.
- Writes are confined to the project directory: `..` segments are normalised away and the
  resolved path must stay inside the sandbox root.
- The build is a pure function of the sandbox files (`esbuild`, no network, no postinstall).
- The preview iframe uses `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"`,
  so preview code cannot navigate the workspace.

This is a *demonstration* sandbox: `allow-same-origin` means preview code shares an origin with
the preview route itself. A production build should serve previews from a separate origin (a
subdomain per project) and run the build in a container or microVM — see
`../05_ARCHITECTURE_PROPOSAL.md` §5.

## Verify it

```bash
node scripts/smoke.mjs                 # create → prompt → build → assets 200
node tools/drive.mjs <projectId> "Change the hero paragraph to mention single-origin beans."
node tools/check_versions.mjs <projectId>
```

`tools/*.mjs` drive a real Chrome over CDP (`--remote-debugging-port=9333`) so the checks
exercise the UI, not just the API. Screenshots land in `evidence/`.

## Known limits (on purpose)

- One file tree, no collections/uploads, no database, no auth, no deploy targets.
- The mock provider is a fixture, not a model; it edits the hero copy to demonstrate iteration.
- No Monaco editor: the Files tab is a read-only viewer.
- Concurrency is per-process; two simultaneous turns on one project would race.

Next steps are listed in `../06_MVP_ROADMAP.md` and `../REA-AGENT/06_IMPLEMENTATION_TASKS.md`.
