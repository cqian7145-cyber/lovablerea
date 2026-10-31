import fs from "node:fs";
const s = fs.readFileSync("D:/lovable-research/RE-003-LIVE-PREVIEW/evidence/cdn_lovable.txt", "utf8");
for (const needle of ["lovable:editor-ready", "element_not_found", "lovable:connection-closed"]) {
  let i = -1; let n = 0;
  while ((i = s.indexOf(needle, i + 1)) !== -1 && n < 2) {
    console.log("\n#### " + needle + " @" + i + "\n" + s.slice(Math.max(0, i - 700), i + 500).replace(/\s+/g, " "));
    n++;
  }
}
const pm = [...s.matchAll(/postMessage/g)].slice(0, 6).map(m => s.slice(Math.max(0, m.index - 300), m.index + 200).replace(/\s+/g, " "));
console.log("\n#### postMessage samples\n" + pm.join("\n---\n"));
