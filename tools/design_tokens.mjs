// Extract the create-form composer + design tokens from the logged-out home page.
import fs from 'node:fs';
import { Chrome, sleep } from './cdp.mjs';

const OUT = 'D:/lovable-research/evidence/raw';
fs.mkdirSync(OUT, { recursive: true });

let chrome;
try { chrome = await Chrome.attach({ port: 9333 }); }
catch { chrome = await Chrome.launch({ port: 9333, profile: '.cdp-profile', headless: false }); }

const page = await chrome.newPage({ width: 1440, height: 900 });
await page.goto('https://lovable.dev/home', { settle: 4000 });

const viewport = await page.evaluate(`(() => {
  const txt = (e) => (e.innerText || e.value || '').trim().replace(/\\s+/g, ' ').slice(0, 200);
  const composer = [...document.querySelectorAll('textarea, [contenteditable="true"], input[type=text]')].map(e => ({
    tag: e.tagName, placeholder: e.getAttribute('placeholder'), aria: e.getAttribute('aria-label'),
    dataTestId: e.getAttribute('data-testid'), cls: (e.className||'').toString().slice(0,200),
    rect: (r => ({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}))(e.getBoundingClientRect()),
    style: (s => ({fontSize:s.fontSize, lineHeight:s.lineHeight, color:s.color, bg:s.backgroundColor, border:s.border, radius:s.borderRadius, padding:s.padding}))(getComputedStyle(e))
  }));
  const buttons = [...document.querySelectorAll('button, a[role=button]')].map(e => ({
    text: txt(e), aria: e.getAttribute('aria-label'), testId: e.getAttribute('data-testid'),
    rect: (r => ({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}))(e.getBoundingClientRect()),
    style: (s => ({bg:s.backgroundColor,color:s.color,radius:s.borderRadius,h:s.height,fontSize:s.fontSize,fontWeight:s.fontWeight,padding:s.padding,border:s.border}))(getComputedStyle(e))
  })).filter(b => b.rect.w > 0);
  const testIds = [...document.querySelectorAll('[data-testid]')].slice(0,120).map(e => e.getAttribute('data-testid'));
  const header = document.querySelector('header');
  return {
    title: document.title,
    text: document.body.innerText.slice(0, 2500),
    composer, buttons: buttons.slice(0, 40), testIds,
    header: header ? { text: header.innerText.replace(/\\s+/g,' ').slice(0,400), rect: (r=>({x:r.x,y:r.y,w:r.width,h:r.height}))(header.getBoundingClientRect()), style: (s=>({bg:s.backgroundColor,position:s.position,borderBottom:s.borderBottom}))(getComputedStyle(header)) } : null,
    scrollHeight: document.documentElement.scrollHeight,
  };
})()`);

const tokens = await page.evaluate(`(() => {
  const root = getComputedStyle(document.documentElement);
  const vars = {};
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.style && rule.selectorText && /:root|\\*/.test(rule.selectorText)) {
          for (const p of rule.style) if (p.startsWith('--')) vars[p] = rule.style.getPropertyValue(p).trim();
        }
      }
    } catch {}
  }
  const probe = (sel, pseudo) => {
    const el = document.querySelector(sel); if (!el) return null;
    const s = getComputedStyle(el, pseudo || undefined);
    return { fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
      color: s.color, bg: s.backgroundColor, radius: s.borderRadius, padding: s.padding, border: s.border,
      font: s.fontFamily, shadow: s.boxShadow, height: s.height, transition: s.transition, gap: s.gap, display: s.display };
  };
  return {
    vars,
    samples: {
      h1: probe('h1'), h2: probe('h2'), p: probe('p'), a: probe('a'), button: probe('button'),
      header: probe('header'), nav: probe('nav'), body: probe('body'),
    },
    rootFontSize: root.fontSize,
    bodyFamily: getComputedStyle(document.body).fontFamily,
    breakpointsHint: { innerWidth: innerWidth, dpr: devicePixelRatio },
  };
})()`);

await page.screenshot(`${OUT}/home-composer-desktop.png`);
fs.writeFileSync(`${OUT}/home-composer.json`, JSON.stringify({ viewport, tokens }, null, 2));

// narrow viewport, same desktop UA (avoid Cloudflare re-challenge)
await page.setViewport({ width: 390, height: 844, mobile: false });
await sleep(2500);
const narrow = await page.evaluate(`(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  return {
    navVisible: !!document.querySelector('nav') && [...document.querySelectorAll('nav')].some(n => vis(n) && n.getBoundingClientRect().width > 300),
    headerText: document.querySelector('header')?.innerText.replace(/\\s+/g,' ').slice(0,300),
    menuButton: [...document.querySelectorAll('button')].map(b=>b.getAttribute('aria-label')).filter(Boolean).slice(0,10),
    scrollWidth: document.documentElement.scrollWidth, innerWidth,
    composerRects: [...document.querySelectorAll('textarea,[contenteditable="true"]')].map(e => (r=>({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}))(e.getBoundingClientRect())),
  };
})()`);
await page.screenshot(`${OUT}/home-composer-mobile390.png`);
fs.writeFileSync(`${OUT}/home-composer-mobile.json`, JSON.stringify(narrow, null, 2));
console.log('composer entries:', viewport.composer.length, 'buttons:', viewport.buttons.length);
console.log('css vars:', Object.keys(tokens.vars).length);
await page.close();
chrome.close();
