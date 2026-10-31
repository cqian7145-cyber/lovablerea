import fs from "node:fs/promises";

const file = process.argv[2];
const raw = await fs.readFile(file, "utf8");
const clean = raw.replace(/^\uFEFF/, "");
const root = JSON.parse(clean);
const ev = root.evidence ?? root;

if (process.argv.includes("--strip")) {
  const out = file.replace(/\.json$/, ".clean.json");
  await fs.writeFile(out, JSON.stringify(root), "utf8");
  console.log("wrote " + out + " (" + JSON.stringify(root).length + " chars)");
}

const steps = ev.steps ?? [];
const events = ev.events ?? {};
const counts = {};
for (const fam of Object.keys(events)) {
  const v = events[fam];
  counts[fam] = Array.isArray(v) ? v.length : typeof v;
}

const apiCalls = new Map();
for (const n of Array.isArray(events.network) ? events.network : []) {
  if (n.kind !== "request-finished" || !n.url?.url) continue;
  const u = new URL(n.url.url);
  if (!u.hostname.endsWith("lovable.dev") || u.pathname.startsWith("/assets/")) continue;
  const key = `${n.method} ${u.pathname}`;
  apiCalls.set(key, (apiCalls.get(key) ?? 0) + 1);
}

const topKeys = Object.keys(ev);
console.log(
  JSON.stringify(
    {
      rootKeys: Object.keys(root),
      evidenceKeys: topKeys,
      completeness: ev.completeness,
      steps: steps.map((s) => ({ id: s.step_id, action: s.action, status: s.status })),
      eventCounts: counts,
      apiCalls: [...apiCalls.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40),
    },
    null,
    2,
  ),
);
