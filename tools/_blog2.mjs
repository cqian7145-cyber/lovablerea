import fs from "node:fs";
const p = "D:/lovable-research/RE-002-VISUAL-EDITS/evidence/blog-introducing.html";
const h = fs.readFileSync(p, "utf8");
const body = h.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
const text = body.replace(/<[^>]+>/g, "\n").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/[ \t]+/g," ").replace(/\n{2,}/g,"\n").trim();
fs.writeFileSync("D:/lovable-research/RE-002-VISUAL-EDITS/evidence/blog-introducing.txt", text);
console.log("CHARS", text.length);
const i = text.indexOf("Visual Edits");
console.log(text.slice(Math.max(0,i-200), i+4000));
