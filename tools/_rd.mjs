import fs from "node:fs";
const j = JSON.parse(fs.readFileSync("D:/lovable-research/RE-002-VISUAL-EDITS/evidence/select-probe.json","utf8"));
console.log("MODE", JSON.stringify(j.data.modeInfo));
console.log("HOVER", JSON.stringify(j.data.hover).slice(0,1500));
console.log("SHOT", JSON.stringify(j.data.shot), j.data.shotErr || "");
