import { NextRequest } from "next/server";
import { readMeta, writeMeta } from "@/lib/projects";
import { revertTo } from "@/lib/git";
import { buildProject } from "@/lib/build";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const sha = String(body?.sha ?? "");
  if (!sha) return Response.json({ error: "sha is required" }, { status: 400 });

  try {
    await revertTo(id, sha);
    const build = await buildProject(id);
    const meta = await readMeta(id);
    await writeMeta(id, {
      ...meta,
      buildId: build.buildId,
      lastBuildOk: build.ok,
      lastBuildMs: build.ms,
      lastError: build.ok ? null : JSON.stringify(build.errors).slice(0, 2000),
      updatedAt: new Date().toISOString(),
    });
    return Response.json({ ok: true, build });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
