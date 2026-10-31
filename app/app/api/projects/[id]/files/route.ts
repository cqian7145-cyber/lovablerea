import { NextRequest } from "next/server";
import fs from "node:fs/promises";
import { safePath } from "@/lib/tools";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const rel = new URL(req.url).searchParams.get("path") ?? "";
  try {
    const abs = safePath(id, rel);
    const content = await fs.readFile(abs, "utf8");
    return Response.json({ path: rel, content });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
