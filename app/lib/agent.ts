import { readMeta, writeMeta, projectDir } from "./projects";
import { executeTool, TOOL_DEFS } from "./tools";
import { buildProject } from "./build";
import { commitAll } from "./git";

export type TurnEvent =
  | { type: "status"; text: string }
  | { type: "plan"; steps: string[] }
  | { type: "tool_call"; id: string; name: string; args: unknown }
  | { type: "tool_result"; id: string; name: string; ok: boolean; result: unknown }
  | { type: "file_edited"; path: string }
  | { type: "build_started" }
  | { type: "build_completed"; ok: boolean; ms: number; buildId: string; errors: unknown[] }
  | { type: "assistant"; text: string }
  | { type: "version"; sha: string | null }
  | { type: "error"; message: string }
  | { type: "done"; provider: string; steps: number };

const SYSTEM = `You are the build agent inside an AI app builder (an original product, not a clone of any vendor).

## The runtime you control
The project is a client-side React 19 app compiled by esbuild into static assets.
\`index.html\` and \`src/main.jsx\` already exist and must NOT be edited:
- index.html loads \`assets/app.js\` and \`assets/app.css\`.
- src/main.jsx mounts \`<App />\` from src/App.jsx and imports src/style.css.
Everything else is up to you: src/App.jsx is the root component, src/style.css holds all styles,
and you may add more .jsx/.css modules under src/ and import them.

## Hard constraints
- No Tailwind, no CSS frameworks, no npm packages beyond react/react-dom. No network requests, no fonts from CDNs.
- Write plain, hand-crafted CSS (custom properties, flex/grid). Never use utility-class soup.
- Every file you write must be complete and self-consistent: no placeholders, no "TODO", no truncated code.
- Aim for a visually finished product: real spacing, typography scale, hover/focus states, responsive layout down to 390px.

## How to work
1. Read what exists (\`list_files\`, \`read_file\`) when it matters.
2. For a change request, edit only the files that need to change and preserve the rest.
3. Use \`write_file\` with the FULL file content (not diffs).
4. Always finish with \`run_build\`. If the build reports errors, fix the exact lines it cites and build again.
5. End with one short paragraph describing what you built and which files changed.`;

type Msg =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: ToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };

type ToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

const MAX_STEPS = 14;

export function providerName() {
  if (process.env.AGENT_PROVIDER === "mock") return "mock";
  if (!process.env.DEEPSEEK_API_KEY) return "mock";
  return "deepseek";
}

export async function runTurn(
  projectId: string,
  message: string,
  emit: (event: TurnEvent) => void,
): Promise<void> {
  const provider = providerName();
  let steps = 0;
  let built = false;

  try {
    if (provider === "mock") {
      steps = await runMock(projectId, message, emit, () => (built = true));
    } else {
      steps = await runDeepSeek(projectId, message, emit, () => (built = true));
    }

    if (!built) {
      emit({ type: "build_started" });
      const result = await buildProject(projectId);
      emit({
        type: "build_completed",
        ok: result.ok,
        ms: result.ms,
        buildId: result.buildId,
        errors: result.errors,
      });
      built = true;
    }

    const sha = await commitAll(projectId, message.slice(0, 72) || "agent edit");
    const meta = await readMeta(projectId);
    const lastBuild = await buildProject(projectId);
    const { listVersions } = await import("./git");
    const versions = (await listVersions(projectId, 200)).length;
    await writeMeta(projectId, {
      ...meta,
      updatedAt: new Date().toISOString(),
      buildId: lastBuild.buildId,
      lastBuildOk: lastBuild.ok,
      lastBuildMs: lastBuild.ms,
      lastError: lastBuild.ok ? null : JSON.stringify(lastBuild.errors).slice(0, 2000),
      lastCommit: sha ?? meta.lastCommit,
      versions,
    });
    emit({ type: "version", sha });
    emit({ type: "done", provider, steps });
  } catch (err) {
    emit({ type: "error", message: (err as Error).message });
    emit({ type: "done", provider, steps });
  }
}

async function runDeepSeek(
  projectId: string,
  message: string,
  emit: (event: TurnEvent) => void,
  markBuilt: () => void,
): Promise<number> {
  const base = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";
  const key = process.env.DEEPSEEK_API_KEY!;

  const messages: Msg[] = [
    { role: "system", content: SYSTEM },
    { role: "user", content: message },
  ];

  let steps = 0;
  let finalText: string | null = null;

  for (; steps < MAX_STEPS; steps++) {
    emit({ type: "status", text: steps === 0 ? "Thinking..." : "Working..." });

    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages,
        tools: TOOL_DEFS,
        tool_choice: "auto",
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      throw new Error(`model call failed: ${res.status} ${await res.text()}`);
    }
    const json = (await res.json()) as {
      choices?: { message?: { content?: string | null; tool_calls?: ToolCall[] } }[];
    };
    const msg = json.choices?.[0]?.message;
    if (!msg) throw new Error("model returned no message");

    const calls = msg.tool_calls ?? [];
    if (calls.length === 0) {
      finalText = msg.content ?? "";
      break;
    }

    messages.push({ role: "assistant", content: msg.content ?? null, tool_calls: calls });

    for (const call of calls) {
      let args: Record<string, unknown> = {};
      try {
        args = JSON.parse(call.function.arguments || "{}");
      } catch {
        args = {};
      }
      emit({ type: "tool_call", id: call.id, name: call.function.name, args });
      if (call.function.name === "run_build") emit({ type: "build_started" });

      const outcome = await executeTool(projectId, call.function.name, args);

      if (outcome.editedPath) emit({ type: "file_edited", path: outcome.editedPath });
      if (call.function.name === "run_build") {
        const r = outcome.result as {
          ok?: boolean;
          ms?: number;
          buildId?: string;
          errors?: unknown[];
        };
        emit({
          type: "build_completed",
          ok: !!(r.ok ?? outcome.ok),
          ms: r.ms ?? 0,
          buildId: r.buildId ?? "",
          errors: r.errors ?? [],
        });
        markBuilt();
      }
      emit({
        type: "tool_result",
        id: call.id,
        name: call.function.name,
        ok: outcome.ok,
        result: outcome.result,
      });

      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(outcome.result).slice(0, 12000),
      });
    }
  }

  if (finalText) emit({ type: "assistant", text: finalText });
  return steps;
}

/* ------------------------------------------------------------------ *
 * Deterministic offline provider: proves the whole pipeline (prompt ->
 * files -> build -> preview -> version) without any API key.
 * ------------------------------------------------------------------ */
async function runMock(
  projectId: string,
  message: string,
  emit: (event: TurnEvent) => void,
  markBuilt: () => void,
): Promise<number> {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const { readFile } = await import("node:fs/promises");
  const path = await import("node:path");

  const existing = await readFile(path.join(projectDir(projectId), "src", "App.jsx"), "utf8").catch(
    () => "",
  );
  const isEdit = existing.includes('className="page"') && /<h1>/.test(existing);
  const title = isEdit
    ? existing.match(/<h1>([^<]*)<\/h1>/)?.[1] ?? mockTitle(message)
    : mockTitle(message);
  const copy = isEdit ? editCopy(message) : mockCopy(message);

  emit({ type: "status", text: "Thinking..." });
  await sleep(120);
  emit({
    type: "plan",
    steps: isEdit
      ? [
          "Read the existing project files",
          "Apply the change to the hero copy",
          "Rebuild and verify",
        ]
      : [
          "Read the existing project files",
          "Write src/App.jsx and src/style.css",
          "Build and verify the bundle",
        ],
  });

  emit({ type: "tool_call", id: "m1", name: "list_files", args: {} });
  const listed = await executeTool(projectId, "list_files", {});
  emit({ type: "tool_result", id: "m1", name: "list_files", ok: true, result: listed.result });
  await sleep(80);

  if (isEdit) {
    emit({ type: "tool_call", id: "m1b", name: "read_file", args: { path: "src/App.jsx" } });
    await executeTool(projectId, "read_file", { path: "src/App.jsx" });
    emit({
      type: "tool_result",
      id: "m1b",
      name: "read_file",
      ok: true,
      result: { bytes: existing.length },
    });
  }

  const app = mockApp(title, copy, isEdit);
  emit({ type: "tool_call", id: "m2", name: "write_file", args: { path: "src/App.jsx" } });
  await executeTool(projectId, "write_file", { path: "src/App.jsx", content: app.jsx });
  emit({ type: "file_edited", path: "src/App.jsx" });

  if (!isEdit) {
    emit({ type: "tool_call", id: "m3", name: "write_file", args: { path: "src/style.css" } });
    await executeTool(projectId, "write_file", { path: "src/style.css", content: app.css });
    emit({ type: "file_edited", path: "src/style.css" });
  }
  await sleep(120);

  emit({ type: "tool_call", id: "m4", name: "run_build", args: {} });
  emit({ type: "build_started" });
  emit({ type: "status", text: "Building..." });
  const result = await buildProject(projectId);
  emit({
    type: "build_completed",
    ok: result.ok,
    ms: result.ms,
    buildId: result.buildId,
    errors: result.errors,
  });
  markBuilt();

  emit({
    type: "assistant",
    text: isEdit
      ? `Updated the hero copy on ${title}. Changed src/App.jsx; the bundle compiled in ${result.ms}ms.`
      : `Built the ${title} landing page. Changed src/App.jsx and src/style.css; the bundle compiled in ${result.ms}ms.`,
  });
  return isEdit ? 3 : 4;
}

/** Turn an instruction into user-facing copy: "change the hero to mention X" -> "X". */
function editCopy(message: string) {
  const quoted = message.match(/["“'']([^"”'']{4,140})["”'']/);
  if (quoted) return quoted[1].trim();

  const trimmed = message.trim().replace(/[.\s]+$/, "");
  const afterTo = trimmed.match(/\bto\s+(?:say|read|mention|use|show|make it)?\s*(.+)$/i);
  let text = afterTo ? afterTo[1] : trimmed;
  text = text
    .replace(/^(change|update|edit|rewrite|replace|set|adjust|tweak|make|turn)\s+/i, "")
    .replace(/^the\s+/i, "")
    .replace(/^(hero|heading|title|subtitle|paragraph|copy|text|button)\s+/i, "")
    .replace(/^(to|so it says|that says)\s+/i, "")
    .trim();
  if (!text) text = trimmed;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** First-turn copy: keep the user's own words, minus instruction noise. */
function mockCopy(message: string) {
  return message
    .replace(/^(build|create|make|design|generate)\s+(me\s+)?(a|an|the)?\s*/i, "")
    .replace(/\s+/g, " ")
    .slice(0, 160)
    .replace(/[<>{}]/g, "")
    .trim();
}

function mockTitle(message: string) {
  const quoted = message.match(/["“'']([^"”'']{2,40})["”'']/);
  if (quoted) return quoted[1].trim();

  const named = message.match(
    /\b(?:called|named|for|about)\s+((?:[A-Z][\w&'-]*)(?:\s+(?:of|the|and|&|[A-Z][\w&'-]*)){0,4})/,
  );
  if (named) {
    const candidate = named[1].trim().replace(/[.,;:!?]+$/, "");
    // "for a coffee subscription" is not a name: require an uppercase start.
    if (/^[A-Z]/.test(candidate)) return candidate;
  }

  const cleaned = message
    .replace(/^(build|create|make|design|generate)\s+(me\s+)?(a|an|the)?\s*/i, "")
    .replace(/[.\n].*$/s, "")
    .trim();
  const words = cleaned.split(/\s+/).slice(0, 5).join(" ");
  return (words || "Product").replace(/[<>]/g, "").replace(/^\w/, (c) => c.toUpperCase());
}

function mockApp(title: string, lede: string, isEdit = false) {
  const jsx = `import "./style.css";

const features = [
  { title: "Ship in minutes", body: "Describe the product once and get a working interface you can iterate on." },
  { title: "Own the code", body: "Every change is a plain file plus a commit, so nothing is locked away." },
  { title: "Live preview", body: "The sandbox rebuilds in place and the preview reloads without leaving the chat." },
];

export default function App() {
  return (
    <div className="page">
      <header className="nav">
        <span className="mark" />
        <strong>${title}</strong>
        <nav className="links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a className="cta" href="#start">Start free</a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Built from a prompt</p>
        <h1>${title}</h1>
        <p className="lede">
          ${lede.slice(0, 160).replace(/[<>{}]/g, "").replace(/\s+/g, " ").trim()}
        </p>
        <div className="actions">
          <a className="primary" href="#start">Open the app</a>
          <a className="ghost" href="#features">See how it works</a>
        </div>
      </section>

      <section id="features" className="grid">
        {features.map((f) => (
          <article key={f.title} className="card">
            <h2>{f.title}</h2>
            <p>{f.body}</p>
          </article>
        ))}
      </section>

      <footer className="foot">
        <span>${title.replace(/[<>{}]/g, "")}</span>
        <span>Offline demo build</span>
      </footer>
    </div>
  );
}
`;

  const css = `:root {
  --bg: #0a0a0d;
  --panel: #121218;
  --line: rgba(255, 255, 255, 0.08);
  --fg: #f6f6f8;
  --muted: #9a9aa8;
  --accent: #7c6cff;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
.page { max-width: 1080px; margin: 0 auto; padding: 0 24px 64px; }
.nav { display: flex; align-items: center; gap: 12px; height: 64px; border-bottom: 1px solid var(--line); }
.mark { width: 22px; height: 22px; border-radius: 7px; background: linear-gradient(140deg, #ff7a45, #7c6cff); }
.links { margin-left: auto; display: flex; align-items: center; gap: 20px; }
.links a { color: var(--muted); text-decoration: none; font-size: 14px; }
.links a:hover { color: var(--fg); }
.links .cta { color: var(--fg); border: 1px solid var(--line); padding: 8px 14px; border-radius: 8px; }
.hero { padding: 96px 0 64px; max-width: 720px; }
.eyebrow { text-transform: uppercase; letter-spacing: 0.14em; font-size: 12px; color: var(--muted); margin: 0 0 16px; }
.hero h1 { font-size: clamp(40px, 6vw, 64px); line-height: 1.04; letter-spacing: -0.03em; margin: 0 0 20px; }
.lede { font-size: 18px; line-height: 1.55; color: var(--muted); margin: 0 0 32px; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.primary, .ghost { text-decoration: none; font-size: 15px; padding: 12px 20px; border-radius: 10px; }
.primary { background: var(--accent); color: white; }
.ghost { border: 1px solid var(--line); color: var(--fg); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; padding: 32px 0; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 24px; }
.card h2 { font-size: 17px; margin: 0 0 8px; }
.card p { margin: 0; color: var(--muted); line-height: 1.5; font-size: 14px; }
.foot { display: flex; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 24px; color: var(--muted); font-size: 13px; }
@media (max-width: 480px) {
  .hero { padding: 64px 0 40px; }
  .links a:not(.cta) { display: none; }
}
`;
  void isEdit;
  return { jsx, css };
}
