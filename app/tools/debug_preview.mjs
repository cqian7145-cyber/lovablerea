import { Chrome } from "../../tools/cdp.mjs";

const url = process.argv[2];
const c = await Chrome.attach({ port: 9333 });
const p = await c.newPage({ width: 1200, height: 800 });
await p.goto(url, { settle: 2500 });
console.log("TEXT:", await p.evaluate("document.body.innerText.slice(0,200)"));
console.log("HTML:", (await p.evaluate("document.body.innerHTML")).slice(0, 400));
console.log("CONSOLE:", JSON.stringify((p.console ?? []).slice(0, 10)));
console.log("ERRORS:", JSON.stringify((p.errors ?? []).slice(0, 6)));
await p.close();
await c.close();
