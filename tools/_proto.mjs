import fs from "node:fs";
const s = fs.readFileSync("D:/lovable-research/RE-003-LIVE-PREVIEW/evidence/cdn_lovable.txt", "utf8");
const set = new Set([...s.matchAll(/type:"([A-Z][A-Z0-9_]{3,40})"/g)].map(m => m[1]));
const arr = [...set].sort();
console.log("COUNT", arr.length);
console.log(arr.join("\n"));
