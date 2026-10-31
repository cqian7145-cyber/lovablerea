// Open the workspace, switch to the Versions tab, and screenshot it.
import fs from "node:fs/promises";
import { Chrome } from "../../tools/cdp.mjs";

const [projectId] = process.argv.slice(2);
const chrome = await Chrome.attach({ port: 9333 });
const page = await chrome.newPage({ width: 1440, height: 900 });
await page.goto(`http://127.0.0.1:3100/p/${projectId}`, { settle: 1800 });

const clicked = await page.evaluate(`(() => {
  const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Versions');
  if (!btn) return 'no-tab';
  btn.click();
  return 'clicked';
})()`);

await new Promise((r) => setTimeout(r, 900));
const text = await page.evaluate(`document.querySelector('.panel-body')?.innerText?.slice(0, 600) ?? document.body.innerText.slice(0, 600)`);
const rows = await page.evaluate(`document.querySelectorAll('.version').length`);

await page.screenshot("D:/lovablerea/app/evidence/versions-tab.png");
await fs.writeFile(
  "D:/lovablerea/app/evidence/versions-tab.json",
  JSON.stringify({ projectId, clicked, rows, text }, null, 2),
  "utf8",
);
console.log(clicked, "rows:", rows);
console.log(text.replace(/\s+/g, " ").slice(0, 300));

await page.close();
await chrome.close();

