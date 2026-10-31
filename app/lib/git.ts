import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { projectDir } from "./projects";

const run = promisify(execFile);

const GIT_ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: "agent-builder",
  GIT_AUTHOR_EMAIL: "agent@builder.local",
  GIT_COMMITTER_NAME: "agent-builder",
  GIT_COMMITTER_EMAIL: "agent@builder.local",
};

async function git(id: string, args: string[], timeout = 15000) {
  const dir = projectDir(id);
  const { stdout } = await run("git", args, {
    cwd: dir,
    env: {
      ...GIT_ENV,
      // Never let git walk up into an enclosing repository.
      GIT_CEILING_DIRECTORIES: path.dirname(dir),
    },
    timeout,
    maxBuffer: 8 * 1024 * 1024,
    windowsHide: true,
  });
  return stdout.trim();
}

export async function ensureRepo(id: string) {
  const dir = projectDir(id);
  const { mkdir, writeFile, access } = await import("node:fs/promises");
  await mkdir(dir, { recursive: true });

  let hasRepo = true;
  try {
    await access(path.join(dir, ".git"));
  } catch {
    hasRepo = false;
  }

  if (!hasRepo) {
    await git(id, ["init", "-q", "--initial-branch=main"]);
    await git(id, ["config", "user.name", "agent-builder"]);
    await git(id, ["config", "user.email", "agent@builder.local"]);
  }

  // dist/ is derived output; keep history only for sources.
  await writeFile(path.join(dir, ".gitignore"), "dist/\nnode_modules/\n", "utf8");
}

export async function commitAll(id: string, message: string): Promise<string | null> {
  await ensureRepo(id);
  await git(id, ["add", "-A"]);
  const status = await git(id, ["status", "--porcelain"]);
  if (!status) return null;
  await git(id, ["commit", "-q", "-m", message], 20000);
  return await git(id, ["rev-parse", "--short", "HEAD"]);
}

export async function listVersions(id: string, limit = 30) {
  await ensureRepo(id);
  const out = await git(id, [
    "log",
    `--max-count=${limit}`,
    "--pretty=format:%h%x1f%ad%x1f%s",
    "--date=iso-strict",
  ]);
  if (!out) return [];
  return out.split("\n").map((line) => {
    const [sha, date, subject] = line.split("\x1f");
    return { sha, date, subject };
  });
}

export async function revertTo(id: string, sha: string) {
  await ensureRepo(id);
  await git(id, ["checkout", sha, "--", "."], 20000);
  return true;
}
