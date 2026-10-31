import fs from "node:fs/promises";
import path from "node:path";
import * as esbuild from "esbuild";
import { APP_ROOT, projectDir } from "./projects";

export type BuildError = {
  text: string;
  file?: string;
  line?: number;
  column?: number;
  lineText?: string;
};

export type BuildResult = {
  ok: boolean;
  buildId: string;
  ms: number;
  errors: BuildError[];
  warnings: BuildError[];
  files: string[];
};

function toBuildError(e: esbuild.Message): BuildError {
  return {
    text: e.text,
    file: e.location?.file,
    line: e.location?.line,
    column: e.location?.column,
    lineText: e.location?.lineText,
  };
}

export async function buildProject(id: string): Promise<BuildResult> {
  const started = Date.now();
  const dir = projectDir(id);
  const srcDir = path.join(dir, "src");
  const distDir = path.join(dir, "dist");
  const assetsDir = path.join(distDir, "assets");
  const buildId = String(Date.now());

  await fs.mkdir(assetsDir, { recursive: true });

  const errors: BuildError[] = [];
  const warnings: BuildError[] = [];

  const resolveOptions = {
    absWorkingDir: dir,
    // Sandboxes live outside the app directory, so resolve bare imports
    // (react, react-dom) from the builder's own node_modules.
    nodePaths: [path.join(APP_ROOT, "node_modules")],
    bundle: true,
    write: true,
    logLevel: "silent" as const,
  };

  try {
    const js = await esbuild.build({
      ...resolveOptions,
      entryPoints: [path.join(srcDir, "main.jsx")],
      outfile: path.join(assetsDir, "app.js"),
      platform: "browser",
      format: "iife",
      target: ["es2020"],
      jsx: "automatic",
      loader: { ".jsx": "jsx", ".js": "jsx" },
      define: { "process.env.NODE_ENV": '"production"' },
      metafile: true,
      sourcemap: false,
    });
    warnings.push(...(js.warnings || []).map(toBuildError));
  } catch (err) {
    const e = err as esbuild.BuildFailure;
    errors.push(...(e.errors || []).map(toBuildError));
  }

  try {
    await esbuild.build({
      ...resolveOptions,
      entryPoints: [path.join(srcDir, "style.css")],
      outfile: path.join(assetsDir, "app.css"),
    });
  } catch {
    /* css is optional; missing styles must not fail the build */
  }

  try {
    const html = await fs.readFile(path.join(dir, "index.html"), "utf8");
    await fs.writeFile(path.join(distDir, "index.html"), html, "utf8");
  } catch {
    errors.push({ text: "index.html is missing from the project root" });
  }

  const files = await fs.readdir(assetsDir).catch(() => [] as string[]);
  return {
    ok: errors.length === 0,
    buildId,
    ms: Date.now() - started,
    errors,
    warnings,
    files,
  };
}
