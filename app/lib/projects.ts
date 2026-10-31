import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const APP_ROOT = process.cwd();
// Sandboxes must live OUTSIDE any enclosing git repository, otherwise a
// project-level `git init` would resolve to the parent repo and commit the
// agent's edits into it.
export const PROJECTS_ROOT =
  process.env.PROJECTS_ROOT ?? path.resolve(APP_ROOT, "..", "..", "foundry-projects");

export type ProjectMeta = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  buildId: string | null;
  lastBuildOk: boolean | null;
  lastBuildMs: number | null;
  lastError: string | null;
  lastCommit: string | null;
  versions: number;
};

export function projectDir(id: string) {
  return path.join(PROJECTS_ROOT, id);
}

export function newId() {
  return "prj_" + crypto.randomBytes(6).toString("hex");
}

export async function ensureRoot() {
  await fs.mkdir(PROJECTS_ROOT, { recursive: true });
}

export async function readMeta(id: string): Promise<ProjectMeta> {
  const raw = await fs.readFile(path.join(projectDir(id), "meta.json"), "utf8");
  return JSON.parse(raw) as ProjectMeta;
}

export async function writeMeta(id: string, meta: ProjectMeta) {
  await fs.writeFile(
    path.join(projectDir(id), "meta.json"),
    JSON.stringify(meta, null, 2),
    "utf8",
  );
}

export async function listProjects(): Promise<ProjectMeta[]> {
  await ensureRoot();
  const entries = await fs.readdir(PROJECTS_ROOT, { withFileTypes: true });
  const out: ProjectMeta[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    try {
      out.push(await readMeta(e.name));
    } catch {
      /* ignore broken project dirs */
    }
  }
  return out.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

const TEMPLATE_MAIN = `import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

createRoot(document.getElementById("root")).render(<App />);
`;

const TEMPLATE_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>App</title>
    <link rel="stylesheet" href="assets/app.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="assets/app.js"></script>
  </body>
</html>
`;

const TEMPLATE_APP = `export default function App() {
  return (
    <main className="shell">
      <h1>Empty project</h1>
      <p>Ask the agent to build something.</p>
    </main>
  );
}
`;

const TEMPLATE_CSS = `:root { color-scheme: dark; }
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  background: #0b0b0f;
  color: #f5f5f7;
}
.shell { max-width: 960px; margin: 0 auto; padding: 48px 24px; }
`;

export async function createProject(name: string): Promise<ProjectMeta> {
  await ensureRoot();
  const id = newId();
  const dir = projectDir(id);
  await fs.mkdir(path.join(dir, "src"), { recursive: true });
  await fs.mkdir(path.join(dir, "dist", "assets"), { recursive: true });
  await fs.writeFile(path.join(dir, "index.html"), TEMPLATE_HTML, "utf8");
  await fs.writeFile(path.join(dir, "src", "main.jsx"), TEMPLATE_MAIN, "utf8");
  await fs.writeFile(path.join(dir, "src", "App.jsx"), TEMPLATE_APP, "utf8");
  await fs.writeFile(path.join(dir, "src", "style.css"), TEMPLATE_CSS, "utf8");

  const now = new Date().toISOString();
  const meta: ProjectMeta = {
    id,
    name: name?.trim() || "Untitled project",
    createdAt: now,
    updatedAt: now,
    buildId: null,
    lastBuildOk: null,
    lastBuildMs: null,
    lastError: null,
    lastCommit: null,
    versions: 0,
  };
  await writeMeta(id, meta);
  return meta;
}
