import fs from "node:fs";
const s = fs.readFileSync("D:/lovable-research/RE-003-LIVE-PREVIEW/evidence/cdn_lovable.txt", "utf8");
for (const n of ["getComputedStyle", "borderRadius", "fontSize", "paddingTop", "marginTop", "backgroundColor", "tailwind", "classList", "setAttribute", "textContent"]) {
  console.log(n.padEnd(18), s.split(n).length - 1);
}
const i = s.indexOf("function ls(");
console.log("\nLS:", i > 0 ? s.slice(i, i + 900).replace(/\s+/g, " ") : "not found");
