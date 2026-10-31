import fs from "node:fs";
const files = [
  "D:/lovable-research/evidence/raw/editor_struct-dom.html",
  "D:/lovable-research/RE-003-LIVE-PREVIEW/evidence/editor-ws-and-iframe.json",
];
const R = /eyJ[A-Za-z0-9_-]{10,}(\.[A-Za-z0-9_-]{5,}){0,2}/g;
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  const n = (t.match(R) || []).length;
  fs.writeFileSync(f, t.replace(R, "<REDACTED_JWT>"));
  console.log(f, "replaced", n);
}
