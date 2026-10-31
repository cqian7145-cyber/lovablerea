import fs from "node:fs";
const f = "D:/lovable-research/RE-003-LIVE-PREVIEW/evidence/cdn_lovable.txt";
const s = fs.readFileSync(f, "utf8");
console.log("LEN", s.length);
const pats = [/postMessage\([^)]{0,120}/g, /"(lovable|select|hover|element|highlight)[:_.-][a-zA-Z_.:-]{2,40}"/g, /data-lovable-[a-z-]+/g, /__lovable[A-Za-z]+/g, /"type"\s*:\s*"[a-z:_-]{3,40}"/g];
for (const p of pats) {
  const m = [...new Set((s.match(p) || []).map(x => x.slice(0, 120)))].slice(0, 40);
  console.log("\n== " + p + " ==");
  console.log(m.join("\n"));
}
