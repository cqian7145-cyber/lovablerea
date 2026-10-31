import fs from "node:fs";
const p = "D:/lovable-research/RE-002-VISUAL-EDITS/evidence/blog-visual-edits.html";
let h = fs.readFileSync(p, "utf8");
// crude article extraction: strip scripts/styles, collapse tags
const body = h.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
const text = body.replace(/<[^>]+>/g, "\n").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/[ \t]+/g, " ").replace(/\n{2,}/g, "\n").trim();
fs.writeFileSync("D:/lovable-research/RE-002-VISUAL-EDITS/evidence/blog-visual-edits.txt", text);
console.log("CHARS", text.length);
const kw = ["Vite","vite","JSX","jsx","AST","babel","Babel","source map","sourceMap","data-","attribute","attribute","component","Tailwind","plugin","plugin"];
const lines = text.split("\n").filter(l => /vite|jsx|ast|babel|source ?map|data-|attribute|plugin|tailwind|transform/i.test(l));
console.log(lines.slice(0, 80).join("\n"));
