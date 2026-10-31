// Capture browser console/errors for the workspace page (dev overlay diagnostics).
import { Chrome } from "../../tools/cdp.mjs";

const [projectId] = process.argv.slice(2);
const chrome = await Chrome.attach({ port: 9333 });
const page = await chrome.newPage({ width: 1440, height: 900 });
await page.goto(`http://127.0.0.1:3100/p/${projectId}`, { settle: 2500 });

const overlay = await page.evaluate(`(() => {
  const btn = [...document.querySelectorAll('button')].find(b => /Issue/i.test(b.textContent));
  if (!btn) return null;
  btn.click();
  return btn.textContent.trim();
})()`);
await new Promise((r) => setTimeout(r, 1200));
const text = await page.evaluate(`document.body.innerText.slice(0, 1200)`);

console.log("overlay button:", overlay);
console.log("console:", JSON.stringify(page.console?.slice?.(-12) ?? [], null, 1).slice(0, 2000));
console.log("errors:", JSON.stringify(page.errors?.slice?.(-5) ?? [], null, 1).slice(0, 1200));
console.log("body:", text.replace(/\s+/g, " ").slice(0, 500));

await page.close();
await chrome.close();
