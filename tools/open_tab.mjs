import { Chrome } from "./cdp.mjs";

const url = process.argv[2];
const chrome = await Chrome.attach({ port: 9333 });
const page = await chrome.newPage({ width: 1440, height: 900 });
await page.goto(url, { settle: 4000 });
const targets = await chrome.listTargets();
for (const t of targets) {
  if (t.type === "page") console.log(t.targetId, t.url.slice(0, 120));
}
console.log("TITLE", await page.evaluate("document.title"));
