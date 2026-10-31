import fs from "node:fs/promises";
import path from "node:path";
import { projectDir, readMeta, writeMeta } from "@/lib/projects";
import { listVersions } from "@/lib/git";

export const dynamic = "force-dynamic";

async function walk(dir: string, base = ""): Promise<{ path: string; size: number }[]> {
  const out: { path: string; size: number }[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (["dist", "node_modules", ".git"].includes(entry.name)) continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(abs, rel)));
    else out.push({ path: rel, size: (await fs.stat(abs)).size });
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const meta = await readMeta(id);
    const files = await walk(projectDir(id));
    const versions = await listVersions(id, 20);
    return Response.json({ meta, files, versions });
  } catch {
    return Response.json({ error: "project not found" }, { status: 404 });
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const meta = await readMeta(id);
  const name = String(body?.name ?? meta.name).slice(0, 120);
  await writeMeta(id, { ...meta, name, updatedAt: new Date().toISOString() });
  return Response.json({ meta: { ...meta, name } });
}
