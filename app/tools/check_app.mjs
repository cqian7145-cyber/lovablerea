// Verify the built MVP in a real browser: workspace layout, preview iframe content, screenshots.
import fs from "node:fs/promises";
import { Chrome } from "../../tools/cdp.mjs";

const OUT = "D:/lovablerea/app/evidence";
await fs.mkdir(OUT, { recursive: true });

const projectId = process.argv[2];
if (!projectId) {
  console.error("usage: node tools/check_app.mjs <projectId>");
  process.exit(1);
}

const chrome = await Chrome.attach({ port: 9333 });
const page = await chrome.newPage({ width: 1440, height: 900 });
await page.goto(`http://127.0.0.1:3100/p/${projectId}`, { settle: 2500 });

const info = await page.evaluate(`(() => {
  const f = document.querySelector('iframe[title="Project preview"]');
  let inner = null;
  try {
    const d = f && f.contentDocument;
    inner = d ? { title: d.title, text: (d.body.innerText || '').slice(0, 300), nodes: d.querySelectorAll('*').length } : null;
  } catch (e) { inner = { error: String(e) }; }
  return {
    url: location.href,
    title: document.title,
    iframe: f ? { src: f.getAttribute('src'), w: f.clientWidth, h: f.clientHeight, sandbox: f.getAttribute('sandbox') } : null,
    inner,
    tabs: [...document.querySelectorAll('.tab')].map((b) => b.textContent),
    topbar: document.querySelector('.topbar')?.innerText,
  };
})()`);

console.log(JSON.stringify(info, null, 2));
await page.screenshot(`${OUT}/workspace.png`);
await fs.writeFile(`${OUT}/workspace.json`, JSON.stringify(info, null, 2), "utf8");

await page.goto(`http://127.0.0.1:3100/`, { settle: 1500 });
await page.screenshot(`${OUT}/dashboard.png`);

await page.close();
await chrome.close();
console.log("screenshots written to", OUT);
