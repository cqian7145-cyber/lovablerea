// Drive a real second turn through the UI: type, send, wait for build, verify preview changed.
import fs from "node:fs/promises";
import { Chrome } from "../../tools/cdp.mjs";

const OUT = "D:/lovablerea/app/evidence";
const [projectId, prompt] = process.argv.slice(2);
if (!projectId || !prompt) {
  console.error("usage: node tools/drive.mjs <projectId> <prompt>");
  process.exit(1);
}

const chrome = await Chrome.attach({ port: 9333 });
const page = await chrome.newPage({ width: 1440, height: 900 });
await page.goto(`http://127.0.0.1:3100/p/${projectId}`, { settle: 2000 });

const before = await page.evaluate(
  `document.querySelector('iframe[title="Project preview"]')?.contentDocument?.body?.innerText?.slice(0, 400) ?? ''`,
);

await page.click("textarea");
await page.chrome.send("Input.insertText", { text: prompt }, page.sessionId);
await new Promise((r) => setTimeout(r, 300));

const clicked = await page.evaluate(`(() => {
  const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Send');
  if (!btn) return 'no-send-button';
  btn.click();
  return 'clicked';
})()`);
console.log("send:", clicked);

let ok = false;
for (let i = 0; i < 60; i++) {
  await new Promise((r) => setTimeout(r, 500));
  const text = await page.evaluate(`document.querySelector('.timeline')?.innerText ?? ''`);
  if (text.includes("Build ok") && text.includes("turn complete")) {
    ok = true;
    break;
  }
  if (text.includes("Build failed")) break;
}
console.log("turn finished:", ok);

const after = await page.evaluate(
  `document.querySelector('iframe[title="Project preview"]')?.contentDocument?.body?.innerText?.slice(0, 400) ?? ''`,
);

console.log("preview changed:", before !== after);
console.log("before:", before.replace(/\s+/g, " ").slice(0, 160));
console.log("after :", after.replace(/\s+/g, " ").slice(0, 160));

await page.screenshot(`${OUT}/workspace-after-turn.png`);
await fs.writeFile(
  `${OUT}/drive-result.json`,
  JSON.stringify({ projectId, prompt, ok, changed: before !== after, before, after }, null, 2),
  "utf8",
);

await page.close();
await chrome.close();
