import fs from "node:fs";
import path from "node:path";
const dir = "D:/lovable-research/evidence/raw";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));
const needles = ["tsd-source", "lovable:editor-ready", "element_not_found", "lovable:connection-closed", "data-lovable", "selectedElement", "selectElement", "inlineText", "domToSource", "jsxSource"];
for (const f of files) {
  const p = path.join(dir, f);
  if (fs.statSync(p).size > 6_000_000) continue;
  const s = fs.readFileSync(p, "utf8");
  const hits = needles.map(n => [n, s.split(n).length - 1]).filter(([, c]) => c > 0);
  if (hits.length) console.log(f, JSON.stringify(hits));
}
