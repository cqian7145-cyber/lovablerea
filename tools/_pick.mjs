import fs from "node:fs";
const s = fs.readFileSync("D:/lovable-research/RE-003-LIVE-PREVIEW/evidence/cdn_lovable.txt", "utf8");
for (const n of ["elementFromPoint", "composedPath", "mousemove", "pointermove", "outline", "boxShadow", "getBoundingClientRect", "OBSERVER", "MutationObserver", "attachShadow"]) {
  const c = s.split(n).length - 1;
  console.log(n.padEnd(20), c);
}
const i = s.indexOf("elementFromPoint");
console.log("\nCTX:", s.slice(Math.max(0,i-500), i+400).replace(/\s+/g," "));
