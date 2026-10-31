// Zero-dependency Chrome DevTools Protocol driver (Node 24+, built-in WebSocket/fetch).
// Used for observing lovable.dev with a real Chrome instance and an isolated profile.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function httpJson(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return await r.json();
    } catch { /* not up yet */ }
    await sleep(250);
  }
  throw new Error('CDP endpoint not reachable: ' + url);
}

export class Chrome {
  constructor(ws, port) {
    this.ws = ws;
    this.port = port;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Set();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message + ' ' + JSON.stringify(msg.error.data ?? '')));
        else resolve(msg.result);
      } else if (msg.method) {
        for (const fn of this.listeners) fn(msg);
      }
    });
  }

  static async launch({ port = 9333, profile, headless = false, extraArgs = [] } = {}) {
    const args = [
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-features=Translate',
      '--window-size=1440,900',
      ...(headless ? ['--headless=new'] : []),
      ...extraArgs,
      'about:blank',
    ];
    const child = spawn(CHROME, args, { detached: true, stdio: 'ignore' });
    child.unref();
    const info = await httpJson(`http://127.0.0.1:${port}/json/version`);
    const ws = new WebSocket(info.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener('open', res, { once: true });
      ws.addEventListener('error', rej, { once: true });
    });
    const c = new Chrome(ws, port);
    c.version = info;
    c.pid = child.pid;
    return c;
  }

  static async attach({ port = 9333 } = {}) {
    const info = await httpJson(`http://127.0.0.1:${port}/json/version`);
    const ws = new WebSocket(info.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener('open', res, { once: true });
      ws.addEventListener('error', rej, { once: true });
    });
    const c = new Chrome(ws, port);
    c.version = info;
    return c;
  }

  send(method, params = {}, sessionId) {
    const id = ++this.id;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 120000);
    });
  }

  async newPage({ width = 1440, height = 900, mobile = false, scale = 1 } = {}) {
    const { targetId } = await this.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await this.send('Target.attachToTarget', { targetId, flatten: true });
    const page = new Page(this, targetId, sessionId);
    await page.init({ width, height, mobile, scale });
    return page;
  }

  // Attach to an already-open tab (e.g. the one a human logged into).
  async attachToTarget(targetId, { width = 1440, height = 900, mobile = false, scale = 1, noViewport = false } = {}) {
    const { sessionId } = await this.send('Target.attachToTarget', { targetId, flatten: true });
    const page = new Page(this, targetId, sessionId);
    if (!noViewport) {
      try {
        await page.init({ width, height, mobile, scale });
      } catch (e) {
        // iframe / OOPIF targets reject Emulation + Page domain commands; DOM access still works
        page.viewportError = String(e && e.message || e);
      }
    }
    return page;
  }

  async listTargets() {
    const { targetInfos } = await this.send('Target.getTargets');
    return targetInfos;
  }


  close() {
    try { this.ws.close(); } catch { /* noop */ }
  }
}

export class Page {
  constructor(chrome, targetId, sessionId) {
    this.chrome = chrome;
    this.targetId = targetId;
    this.sessionId = sessionId;
    this.requests = [];
    this.console = [];
    this.errors = [];
    this.frames = [];
    this.sse = [];
    this.wsFrames = [];
    this._waiters = new Set();
    chrome.listeners.add((msg) => this._onEvent(msg));
  }

  _emit(evt) {
    for (const w of this._waiters) w(evt);
  }

  _onEvent(msg) {
    if (msg.sessionId !== this.sessionId) return;
    const { method, params } = msg;
    if (method === 'Network.requestWillBeSent') {
      const r = {
        id: params.requestId,
        url: params.request.url,
        method: params.request.method,
        type: params.type,
        initiator: params.initiator?.type,
        ts: params.timestamp,
      };
      this.requests.push(r);
    } else if (method === 'Network.webSocketCreated') {
      this.wsUrls = this.wsUrls || new Map();
      this.wsUrls.set(params.requestId, params.url);
      this.requests.push({ id: 'ws:' + params.requestId, url: params.url, method: 'WS', type: 'WebSocket' });
    } else if (method === 'Network.webSocketFrameReceived' || method === 'Network.webSocketFrameSent') {
      const url = this.wsUrls?.get(params.requestId) || '';
      this.wsFrames.push({
        dir: method.includes('Received') ? 'in' : 'out',
        op: params.response.opcode,
        url,
        data: String(params.response.payloadData || '').slice(0, 4000),
      });
    } else if (method === 'Network.responseReceived') {
      const r = this.requests.find((x) => x.id === params.requestId);
      if (r) {
        r.status = params.response.status;
        r.mime = params.response.mimeType;
        r.fromCache = params.response.fromDiskCache || params.response.fromPrefetchCache;
        r.remoteIP = params.response.remoteIPAddress;
        r.protocol = params.response.protocol;
        r.headers = params.response.headers;
      }
    } else if (method === 'Network.loadingFinished') {
      const r = this.requests.find((x) => x.id === params.requestId);
      if (r) r.size = params.encodedDataLength;
    } else if (method === 'Network.loadingFailed') {
      const r = this.requests.find((x) => x.id === params.requestId);
      if (r) { r.failed = params.errorText; r.status = r.status ?? 'FAILED'; }
    } else if (method === 'Runtime.consoleAPICalled') {
      this.console.push({ type: params.type, args: params.args.map((a) => a.value ?? a.description ?? a.type) });
    } else if (method === 'Runtime.exceptionThrown') {
      this.errors.push(params.exceptionDetails?.exception?.description || params.exceptionDetails?.text);
    } else if (method === 'Network.eventSourceMessageReceived') {
      this.sse.push({ url: params.url, ts: params.timestamp, event: params.eventName, data: String(params.data || '').slice(0, 4000) });
    } else if (method === 'Network.webSocketFrameReceived') {
      this.wsFrames.push({ dir: 'in', op: params.response.opcode, data: String(params.response.payloadData || '').slice(0, 4000) });
    } else if (method === 'Network.webSocketFrameSent') {
      this.wsFrames.push({ dir: 'out', op: params.response.opcode, data: String(params.response.payloadData || '').slice(0, 4000) });
    } else if (method === 'Network.webSocketCreated') {
      this.requests.push({ id: 'ws:' + params.requestId, url: params.url, method: 'WS', type: 'WebSocket' });
    } else if (method === 'Page.javascriptDialogOpening') {
      this.chrome.send('Page.handleJavaScriptDialog', { accept: true }, this.sessionId).catch(() => {});
    } else if (method === 'Page.frameNavigated' && !params.frame.parentId) {
      this.frames.push(params.frame.url);
    }
    this._emit(msg);
  }

  waitFor(method, timeout = 60000) {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => { this._waiters.delete(fn); reject(new Error('wait ' + method)); }, timeout);
      const fn = (m) => {
        if (m.method === method && m.sessionId === this.sessionId) {
          clearTimeout(t); this._waiters.delete(fn); resolve(m.params);
        }
      };
      this._waiters.add(fn);
    });
  }

  async init({ width, height, mobile, scale }) {
    await this.chrome.send('Page.enable', {}, this.sessionId);
    await this.chrome.send('Runtime.enable', {}, this.sessionId);
    await this.chrome.send('Network.enable', { maxTotalBufferSize: 100000000 }, this.sessionId);
    await this.chrome.send('Network.setCacheDisabled', { cacheDisabled: false }, this.sessionId);
    await this.chrome.send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: scale, mobile,
    }, this.sessionId);
    if (mobile) {
      await this.chrome.send('Emulation.setUserAgentOverride', {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
        platform: 'iPhone',
      }, this.sessionId);
      await this.chrome.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }, this.sessionId);
    }
  }

  async setViewport({ width, height, mobile = false }) {
    await this.chrome.send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: 1, mobile,
    }, this.sessionId);
    if (!mobile) {
      await this.chrome.send('Emulation.setUserAgentOverride', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36',
        platform: 'Win32',
      }, this.sessionId);
    }
  }

  async goto(url, { timeout = 90000, settle = 2500 } = {}) {
    const loaded = this.waitFor('Page.loadEventFired', timeout).catch(() => null);
    await this.chrome.send('Page.navigate', { url }, this.sessionId);
    await loaded;
    await sleep(settle);
  }

  async evaluate(expression, { awaitPromise = true } = {}) {
    const r = await this.chrome.send('Runtime.evaluate', {
      expression, returnByValue: true, awaitPromise, userGesture: true,
    }, this.sessionId);
    if (r.exceptionDetails) {
      throw new Error('eval error: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    }
    return r.result?.value;
  }

  async html() {
    return this.evaluate('document.documentElement.outerHTML');
  }

  async addInitScript(source) {
    const r = await this.chrome.send('Page.addScriptToEvaluateOnNewDocument', { source }, this.sessionId);
    this._scripts = this._scripts || [];
    this._scripts.push(r.identifier);
    return r.identifier;
  }

  async removeInitScript(id) {
    await this.chrome.send('Page.removeScriptToEvaluateOnNewDocument', { identifier: id }, this.sessionId).catch(() => {});
  }

  async key(type, key, code, keyCode) {
    await this.chrome.send('Input.dispatchKeyEvent', { type, key, code, windowsVirtualKeyCode: keyCode }, this.sessionId);
  }

  async pressEnter() {
    await this.key('rawKeyDown', 'Enter', 'Enter', 13);
    await this.key('keyUp', 'Enter', 'Enter', 13);
    await sleep(200);
  }

  async screenshot(file, { fullPage = false } = {}) {
    let params = { format: 'png', fromSurface: true };
    if (fullPage) {
      const m = await this.chrome.send('Page.getLayoutMetrics', {}, this.sessionId);
      const cs = m.cssContentSize || m.contentSize;
      params.clip = { x: 0, y: 0, width: Math.ceil(cs.width), height: Math.min(Math.ceil(cs.height), 16000), scale: 1 };
      params.captureBeyondViewport = true;
    }
    const { data } = await this.chrome.send('Page.captureScreenshot', params, this.sessionId);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
    return file;
  }

  async click(selector) {
    const box = await this.evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return null;
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    })()`);
    if (!box) throw new Error('selector not clickable: ' + selector);
    for (const type of ['mousePressed', 'mouseReleased']) {
      await this.chrome.send('Input.dispatchMouseEvent', {
        type, x: box.x, y: box.y, button: 'left', clickCount: 1,
      }, this.sessionId);
    }
    await sleep(500);
  }

  async type(text, { delay = 30 } = {}) {
    for (const ch of text) {
      await this.chrome.send('Input.dispatchKeyEvent', { type: 'char', text: ch }, this.sessionId);
      if (delay) await sleep(delay);
    }
  }

  async cookies() {
    const { cookies } = await this.chrome.send('Network.getCookies', {}, this.sessionId);
    return cookies;
  }

  async close() {
    await this.chrome.send('Target.closeTarget', { targetId: this.targetId }).catch(() => {});
  }
}

export { sleep };

// ---------- CLI ----------
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  const cmd = process.argv[2];
  const profile = path.resolve('.cdp-profile');
  if (cmd === 'launch') {
    const c = await Chrome.launch({ port: 9333, profile, headless: false });
    console.log('launched', c.version.Browser, 'pid', c.pid);
    c.close();
  } else if (cmd === 'tabs') {
    const list = await (await fetch('http://127.0.0.1:9333/json/list')).json();
    for (const t of list) console.log(t.type, t.id, t.url);
  } else {
    console.log('usage: node cdp.mjs launch|tabs');
  }
}
