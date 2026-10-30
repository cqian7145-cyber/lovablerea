const m = await import('node:fs');
let s = m.readFileSync('tools/ui_step.mjs','utf8');
s = s.replace("try { await page.screenshot(`${OUT}/${name}.png`); } catch (e) { console.error('shot fail', e.message); }",
`try {
  const r = await page.chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 55, fromSurface: true, captureBeyondViewport: false }, page.sessionId);
  m.writeFileSync(\`\${OUT}/\${name}.jpg\`, Buffer.from(r.data, 'base64'));
} catch (e) { console.error('shot fail', e.message); }`);
m.writeFileSync('tools/ui_step.mjs', s);
console.log('patched', s.includes('captureScreenshot'));
