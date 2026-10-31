import fs from "node:fs";
const s = fs.readFileSync("D:/lovable-research/RE-003-LIVE-PREVIEW/evidence/cdn_lovable.txt", "utf8");
for (const needle of ["tsd", "jsx", "sourceFile", "fileName", "lineNumber", "reactSource", "_debugSource", "__source"]) {
  const idx = []; let i = -1;
  while ((i = s.indexOf(needle, i + 1)) !== -1 && idx.length < 3) idx.push(i);
  if (idx.length) {
    console.log("\n===== " + needle + " (" + (s.split(needle).length - 1) + " occurrences)");
    for (const j of idx) console.log("..." + s.slice(Math.max(0, j - 320), j + 260).replace(/\s+/g, " "));
  } else console.log("\n===== " + needle + " : none");
}
