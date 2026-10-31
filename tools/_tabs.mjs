import { Chrome } from "./cdp.mjs";
const c = await Chrome.attach({ port: 9333 });
const t = await c.listTargets();
console.log(t.map(x => x.type + " | " + String(x.url).slice(0, 110)).join("\n"));

