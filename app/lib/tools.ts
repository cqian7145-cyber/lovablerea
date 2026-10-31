import fs from "node:fs/promises";
import path from "node:path";
import { projectDir } from "./projects";
import { buildProject } from "./build";

export type ToolName =
  | "list_files"
  | "read_file"
  | "write_file"
  | "delete_file"
  | "run_build";

export const TOOL_DEFS = [
  {
    type: "function" as const,
    function: {
      name: "list_files",
      description: "List every source file in the project with its byte size.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "read_file",
      description: "Read one file of the project. Paths are relative to the project root.",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "write_file",
      description:
        "Create or overwrite a file. Provide the complete file content. Use src/App.jsx for UI and src/style.css for styles.",
      parameters: {
        type: "object",
        properties: { path: { type: "string" }, content: { type: "string" } },
        required: ["path", "content"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "delete_file",
      description: "Delete one file of the project.",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "run_build",
      description:
        "Bundle the project and report compile errors. Always call this after editing files.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
];

/** Resolve a model-supplied path and refuse anything outside the project root. */
export function safePath(projectId: string, relPath: string): string {
  const root = projectDir(projectId);
  const normalized = path
    .normalize(String(relPath || ""))
    .replace(/^([/\\])+/, "")
    .replace(/\\/g, "/");
  if (!normalized || normalized.includes("\0")) throw new Error("empty path");
  const abs = path.resolve(root, normalized);
  const rel = path.relative(root, abs);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`path escapes the project sandbox: ${relPath}`);
  }
  if (rel.split("/")[0] === "dist" || rel.split("/")[0] === "node_modules") {
    throw new Error(`path is generated output: ${relPath}`);
  }
  return abs;
}

async function walk(dir: string, base = ""): Promise<{ path: string; size: number }[]> {
  const out: { path: string; size: number }[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.name === ".git" || entry.name === "dist" || entry.name === "node_modules") continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(abs, rel)));
    else {
      const st = await fs.stat(abs);
      out.push({ path: rel, size: st.size });
    }
  }
  return out;
}

export type ToolOutcome = {
  tool: string;
  ok: boolean;
  result: unknown;
  editedPath?: string;
};

export async function executeTool(
  projectId: string,
  tool: string,
  args: Record<string, unknown>,
): Promise<ToolOutcome> {
  try {
    switch (tool) {
      case "list_files": {
        const files = await walk(projectDir(projectId));
        return { tool, ok: true, result: { files } };
      }
      case "read_file": {
        const abs = safePath(projectId, String(args.path ?? ""));
        const content = await fs.readFile(abs, "utf8");
        return { tool, ok: true, result: { path: args.path, content, bytes: content.length } };
      }
      case "write_file": {
        const abs = safePath(projectId, String(args.path ?? ""));
        const content = String(args.content ?? "");
        await fs.mkdir(path.dirname(abs), { recursive: true });
        await fs.writeFile(abs, content, "utf8");
        return {
          tool,
          ok: true,
          result: { path: args.path, bytes: content.length },
          editedPath: String(args.path ?? ""),
        };
      }
      case "delete_file": {
        const abs = safePath(projectId, String(args.path ?? ""));
        await fs.unlink(abs);
        return {
          tool,
          ok: true,
          result: { path: args.path, deleted: true },
          editedPath: String(args.path ?? ""),
        };
      }
      case "run_build": {
        const result = await buildProject(projectId);
        return { tool, ok: result.ok, result };
      }
      default:
        return { tool, ok: false, result: { error: `unknown tool: ${tool}` } };
    }
  } catch (err) {
    return { tool, ok: false, result: { error: (err as Error).message } };
  }
}
