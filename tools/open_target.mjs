import { Chrome } from "./cdp.mjs";

const url = process.argv[2];
const chrome = await Chrome.attach({ port: 9333 });
const { targetId } = await chrome.send("Target.createTarget", { url, background: false });
console.log("targetId", targetId);

for (let i = 0; i < 40; i++) {
  const list = await (await fetch("http://127.0.0.1:9333/json/list")).json();
  const hit = list.find((t) => t.id === targetId);
  if (hit) console.log("URL", hit.url.slice(0, 140), "|", hit.title.slice(0, 80));
  if (hit && !hit.url.startsWith("about:")) break;
  await new Promise((r) => setTimeout(r, 500));
}
await chrome.close();
