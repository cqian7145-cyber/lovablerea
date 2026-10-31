import fs from 'node:fs';
import path from 'node:path';
import { Chrome, sleep } from './cdp.mjs';

const OUT = 'D:/lovable-research/RE-002-VISUAL-EDITS/evidence';
fs.mkdirSync(OUT, { recursive: true });
const PROJECT = '053a133e-76d8-4c7c-b418-2ab5f486a673';

const chrome = await Chrome.attach({ port: 9333 }).catch(() => Chrome.launch({ port: 9333, headless: false }));
let page = chrome.pages?.find?.(p => p.url?.includes('lovable.dev/projects')) || null;
if (!page) {
  page = await chrome.newPage({ width: 1440, height: 900 });
  await page.goto(`https://lovable.dev/projects/${PROJECT}`, { settle: 6000, timeout: 45000 }).catch(() => {});
}
await sleep(6000);

const targets = await chrome.listTargets();
const iframeT = targets.find(t => t.type === 'iframe' && /id-preview--/.test(t.url || ''));
const out = { at: new Date().toISOString(), editorUrl: page.url, iframeTarget: iframeT ? { id: iframeT.targetId, url: iframeT.url } : null, attrs: null, samples: [], reactKeys: null, error: null };

if (iframeT) {
  try {
    const ip = await chrome.attachToTarget(iframeT.targetId, { noViewport: true });
    const res = await ip.evaluate(`(() => {
      const all = [...document.querySelectorAll('*')];
      const attrNames = new Map();
      let withFiber = 0, withId = 0;
      const samples = [];
      for (const el of all) {
        for (const a of el.attributes || []) attrNames.set(a.name, (attrNames.get(a.name) || 0) + 1);
        const keys = Object.getOwnPropertyNames(el);
        const fiber = keys.filter(k => k.startsWith('__reactFiber$') || k.startsWith('__reactProps$') || k.startsWith('__reactContainer$'));
        if (fiber.length) withFiber++;
        if (el.id) withId++;
        if (samples.length < 25) samples.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          cls: (el.getAttribute('class') || '').slice(0, 120),
          data: [...(el.attributes || [])].filter(a => a.name.startsWith('data-') || a.name.startsWith('aria-')).map(a => a.name + '=' + a.value.slice(0, 60)),
          fiberKeys: fiber,
          text: (el.textContent || '').trim().slice(0, 40),
        });
      }
      return {
        total: all.length,
        withFiber, withId,
        attrNames: [...attrNames.entries()].sort((a,b)=>b[1]-a[1]).slice(0, 40),
        samples,
        hasSourceMarkers: all.some(el => [...el.attributes].some(a => /source|jsx|tsx|lovable|src-file|file-path/i.test(a.name + '=' + a.value))),
      };
    })()`);
    out.attrs = { total: res.total, withFiber: res.withFiber, withId: res.withId, hasSourceMarkers: res.hasSourceMarkers, attrNames: res.attrNames };
    out.samples = res.samples;
    await ip.evaluate('1').catch(() => {});
  } catch (e) { out.error = String(e && e.message || e).slice(0, 300); }
}

fs.writeFileSync(path.join(OUT, 'preview-dom-attrs.json'), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2).slice(0, 4500));
