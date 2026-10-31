import fs from "node:fs/promises";
import path from "node:path";
import { projectDir } from "@/lib/projects";

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string; path?: string[] }> },
) {
  const { id, path: parts } = await ctx.params;
  const distDir = path.join(projectDir(id), "dist");
  const rel = (parts ?? []).join("/") || "index.html";
  const abs = path.resolve(distDir, rel);

  if (!abs.startsWith(path.resolve(distDir))) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await fs.readFile(abs);
    const ext = path.extname(abs).toLowerCase();

    // The viewer is mounted at /api/preview/<id>/ — but Next strips the
    // trailing slash, so relative "assets/..." would resolve one level too
    // high. Rewrite asset references to absolute paths for the preview mount.
    if (ext === ".html") {
      const html = data
        .toString("utf8")
        .replace(/(src|href)="assets\//g, `$1="/api/preview/${id}/assets/`);
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
      });
    }

    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": TYPES[ext] ?? "application/octet-stream",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
