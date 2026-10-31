import fs from "node:fs";
import path from "node:path";
const dir = "D:/lovable-research/RE-002-VISUAL-EDITS/evidence";
let n = 0; const report = [];
for (const f of fs.readdirSync(dir)) {
  if (!/\.(json|txt|md)$/.test(f)) continue;
  const p = path.join(dir, f);
  const s = fs.readFileSync(p, "utf8");
  if (!/__lovable_receipt=mat_|__lovable_receipt=/.test(s)) continue;
  const next = s.replace(/(__lovable_receipt=)[A-Za-z0-9_-]+/g, "$1<REDACTED>");
  if (next !== s) { fs.writeFileSync(p, next); n++; report.push(f); }
}
fs.writeFileSync(path.join(dir, "sanitization-report.json"), JSON.stringify({ at: new Date().toISOString(), files: report, note: "preview receipts replaced with <REDACTED>" }, null, 2));
console.log("sanitized", n, report.join(", "));
