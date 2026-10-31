import { Chrome } from "./cdp.mjs";

const url = process.argv[2];
const chrome = await Chrome.attach({ port: 9333 });
const { targetId } = await chrome.send("Target.createTarget", { url, background: false });
console.log(JSON.stringify({ targetId }));
process.exit(0);
