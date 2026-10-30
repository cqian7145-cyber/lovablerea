# 04 · 可验证的前端技术与网络行为

> 证据等级：**VERIFIED** = 真实浏览器会话直接测得（DOM/CSS/网络/资源计时/响应头）；**INFERRED** = 由多项证据推断；**UNKNOWN** = 未观测到。
> 方法：自研零依赖 CDP 驱动（`tools/cdp.mjs`、`probe.mjs`、`sweep.mjs`、`snap.mjs`、`editor_probe.mjs`、`flow*.mjs`、`fetch_assets.mjs`、`scan_bundle.mjs`），Node 24 + 系统 Chrome 156，独立 profile（不触碰用户已登录浏览器）。
> 原始证据目录：`D:\lovable-research\evidence\raw\`（`sweep.json`、`dash.json`、`editor_struct.json`、`c_*.json`、`d_*.json`、`g_*.json`、`bundle-scan.txt`、`bundle-path-scan.txt`、`assets/`）。
> 声明：未读取/导出任何 Cookie 值、令牌、账号凭据或隐私数据；未探测私有端点、未做认证绕过、未做接口重放或高频请求。

---

## 1. 边缘与传输层

| 观察 | 值 | 等级 |
|---|---|---|
| 纯 HTTP 客户端（curl/Invoke-WebRequest，真 UA） | **403 + Cloudflare 挑战页**（`Just a moment...`） | VERIFIED |
| 真实 Chrome | 直接 200，`challengeAfterMs = 0` | VERIFIED |
| 响应头 | `server: cloudflare`、`__cf_bm` cookie、`cf-ray` | VERIFIED |
| 静态资源 | `assets.lovable.dev`（独立资源域，与主站分离） | VERIFIED |
| 文档站 | `docs.lovable.dev` = **Mintlify**（`/_mintlify/*`） | VERIFIED |
| 博客/帮助 | `/blog`、`/support` 同域 SSR | VERIFIED |
| 部署 ID 头（伙伴站） | `x-deployment-id: psr2.<uuid>.<ts>.<sig>` | VERIFIED |

**结论**：反爬/机器人防护在边缘（Cloudflare）完成，应用层不重复做 UA 判断；营销站与产品区同域但资源域分离（便于缓存与 CSP）。

---

## 2. 应用外壳：TanStack Start（VERIFIED 多证据）

| 证据 | 内容 |
|---|---|
| RPC 调用形状 | `GET /_serverFn/<sha256>`（3 个固定 hash：`1c038d93…`、`1cfa5e99…`、`e92a63b6…`）—— TanStack Start **Server Functions** 的编译产物形态 |
| 预载 chunk | `rolldown-runtime`、`vendor-tanstack`、`index-DaWAvAnJ.js`（377B 入口）、`app-boot-*.js` |
| Router 痕迹 | sessionStorage `tsr-scroll-restoration-v1_3`；路由状态在 URL query（`?view=…&subview=…`） |
| 文件式路由（生成物） | 项目产物路径 `m.$venueSlug.stories.$storyId.tsx`、`studio.index.tsx` |
| 文档自述 | 2026-05-13 起默认 **TanStack Start**（Enterprise 2026-06-22 前需申请），明确拒绝 Next.js；检测点 `@tanstack/react-start` |
| 构建链 | rolldown（Vite 7 / Rolldown 变体）+ Nitro preset，产物 `.output/server/index.mjs`（文档） |

**打包结构（VERIFIED 体积）**：`app-boot 438KB`、`app-shared 1.45MB`、`dashboard-boot-shared 245KB`、`app-lazy-surfaces 131KB`、`editor-leaves 18KB`、`vendor-protobuf 90KB`。
→ **INFERRED**：按「启动 / 外壳共享 / 懒加载界面 / 编辑器叶子」四层切包；`editor-leaves` 说明编辑器内部还有二级 code-split。

其他前端栈信号：Tailwind（`--tw-` 变量规则）、Radix + Base UI（`vendor-radix`、`vendor-base-ui`，UNKNOWN 具体用量）、`vendor-motion`（Framer Motion 类）、FullStory SDK、Castle（`castle.umd.js`，反欺诈）、Sentry browser SDK 10.70.0、RudderStack（`rs.lovable.dev`，writeKey `30uiF44drV1UnRmUEUVhfQ2L500`）、Firebase（`gpt-engineer-dev`/`gpt-engineer-390607`）。

---

## 3. 域名与服务拓扑

| 域 | 角色 | 证据 |
|---|---|---|
| `lovable.dev` | 营销站 + 产品 SPA/SSR shell | VERIFIED |
| `assets.lovable.dev` | 静态资源 CDN | VERIFIED |
| `api.lovable.dev` | **业务 API**（REST + Connect RPC） | VERIFIED |
| `api-internal.lovable.net` | 内部 API（bundle 字符串，公网未调） | VERIFIED（字符串） |
| `rs.lovable.dev` | RudderStack 数据管道 | VERIFIED |
| `*.lovable.app` | **发布产物**（用户应用） | VERIFIED（模板 URL、发布弹窗） |
| `*.lovableproject.com` | **预览产物**（编辑器 iframe） | VERIFIED（iframe src） |
| `*.lovable.dev` | 文档/伙伴/学院等子站（`trust.`、`docs.`、`academy.lovable.app`、`screenshot2.`） | VERIFIED |
| `mcp.lovable.dev` | MCP 服务器（OAuth，文档） | 文档 |
| `status.lovable.dev` | 状态页 | VERIFIED（链接） |

---

## 4. 业务 API 观测（登录态，VERIFIED）

### 4.1 健康与版本

```
GET https://api.lovable.dev/            → 404 page not found        （Go net/http 默认体，INFERRED Go）
GET https://api.lovable.dev/health      → {"status":"ok","version":"c51145af44fe6ffdb28a0efe8cf3c3c9f42294af"}
```

### 4.2 Connect / gRPC-Web 风格服务（关键发现）

```
POST /lovable.freebuildhour.v1.FreeBuildHourService/GetStatus
POST /lovable.workspaceclaims.v1.WorkspaceClaimNoticeService/GetPendingClaim
```

- 命名遵循 `<package>.<Service>/<Method>`（protobuf 服务全名）；
- 与 `vendor-protobuf` chunk 互为证据；
- → **INFERRED**：后端用 Connect（或 gRPC-Web/grpc-gateway）暴露一部分服务，客户端用 protobuf 编解码；其余业务仍是普通 REST（见下）。

### 4.3 REST 端点（登录后首屏实测，全部读操作）

| 端点 | 用途 |
|---|---|
| `GET /user/workspaces` / `/user/organizations` / `/user/project-invitations` | 用户上下文 |
| `GET /projects/{id}/workspace` | 项目归属 |
| `GET /projects/{id}/drafts`、`/drafts?include_merged=true`、`/artifacts` | 草稿与产物树 |
| `GET /projects/{id}/sandbox/url` | **沙箱/预览地址** |
| `GET /workspaces/{ws}/projects/{id}/gitsync` | Git 同步状态 |
| `GET /workspaces/{ws}/chats?filter=all&sort=latest&limit=8\|32&offset=0[&include_resources=true]` | 聊天分页 |
| `GET /workspaces/{ws}/memberships/search?status=active&limit=1` | 成员搜索 |
| `GET /workspaces/{ws}/{auto-topup/status,contract-status,enterprise-self-serve-offer}` | 计费与合同 |
| `GET /banners/active?workspace_id={ws}`、`/registrar-domains/viewer-verification-banner` | 运营位 |

公开文档另有 `/v1` 稳定 API（`Lovable-API-Key`、`Lovable-Version: 2026-09-11`、25 个端点、错误包络 6 字段、`Deployment.status ∈ running|completed|error|unknown`、webhook 走 Standard Webhooks 签名）——见 `notes/DOCS_API.md`。

### 4.4 流式通道（bundle 字符串级证据）

- `Accept: text/event-stream` + 自定义头 `X-Browser-Session-ID`；
- 认证后用 `${baseUrl}/app/ws?...token` 拼接的 URL；
- → **INFERRED**：Agent 回合事件走 **SSE over HTTP**（编辑器聊天），另有 WebSocket 通道用于协作/预览同步（`/app/ws`）。本次**未捕获到真实 SSE 帧**（账号 0 credits，无法启动新回合）。

---

## 5. 预览与发布拓扑（VERIFIED）

```
编辑器 iframe：
https://<project-uuid>.lovableproject.com/?__lovable_load_id=<uuid-v4>
                              ↑ 每次加载新 id（缓存击穿 + 会话关联）

发布产物：
https://<slug>-<4hex>.lovable.app          （如 pixel-perfect-picture-0038.lovable.app）
自定义域：A 185.158.133.1 + TXT _lovable / lovable_verify=…  （文档）
```

- 预览 URL 栏可显示/切换应用内路径（`/ Homepage`、`/studio/settings`），并支持 `?preview-path=%2Fstudio%2Fsettings` 直达。
- 未发布时 Analytics 显示 `Publish your app to start tracking visits`（发布后才埋点统计）。
- → **INFERRED**：每个项目一个「预览实例」（staging）+ 发布快照（production），预览域名与产物域名分离以避免 cookie/缓存污染。

---

## 6. 客户端存储与身份

| 项 | 观测（仅键名） | 等级 |
|---|---|---|
| cookie | `lovable-workspace-id`、`lovable-workspace-plan`、`lovable-flag-plan`、`lovable_consent_v1`、`USER_COUNTRY/USER_CURRENCY/LOCALE`、`__cuid`、`__dpl` | VERIFIED |
| 广告/分析 cookie | `_ga*`、`_fbp`、`_rdt_*`、`_uet*`、`IR_*`、`__hstc/hubspotutk/…`、`_cltk`、`__spdt` | VERIFIED |
| localStorage | `editor-store-create-form`、`editor-mode-store:last`、`lovable:sidebar-*`、`lovable:removed-recent-*`、`chat-mode-coachmark-dismissed`、`launch_card_state_*`、`news_read_status_*`、`report-dialog-draft`、`has_seen_attach_image_modal`、`lovable-use-tailscale` | VERIFIED |
| sessionStorage | `tsr-scroll-restoration-v1_3`、`active-workspace-offer-visit`、`_rdt_cfg`、`__spdt` | VERIFIED |
| 登录方式 | Google / GitHub / Apple OAuth + Email + SSO（Business/Enterprise） | VERIFIED（登录页） |
| 认证底座 | Firebase SDK（`vendor-firebase`）+ 自有 `api.lovable.dev`（`lastUsedAuthMethod`、`lastUsedSSOProviderId`） | INFERRED |

**未做**：未读取任何 cookie 值、未导出 localStorage 内容、未拦截/重放带凭据的请求。

---

## 7. 第三方与可观测性

| 第三方 | 用途 | 证据 |
|---|---|---|
| Sentry（`o4506071217143808.ingest.us.sentry.io`，browser SDK 10.70.0） | 错误监控 | 网络 |
| RudderStack（`rs.lovable.dev`，`/sourceConfig`、`/v1/batch`） | 产品分析总线 | 网络 |
| FullStory | 会话回放 | bundle chunk |
| Castle | 风控/反欺诈 | `castle.umd.js` |
| HubSpot / GA4 / Meta / Reddit / Bing UET / Trade Desk / Impact | 营销归因 | cookie 名 + iframe `insight.adsrvr.org` |
| Grafana（`lovable.grafana.net`） | 内部可观测性（字符串） | bundle |
| Cloudflare R2（`pub-*.r2.dev`） | 公共对象存储（模板截图等） | bundle/host |

---

## 8. 静态资源与源码可得性

| 项 | 结论 |
|---|---|
| 入口脚本 | `https://lovable.dev/assets/index-DaWAvAnJ.js`（377B，仅 import 图） |
| Source map | **全部 404**（无公开 source map） |
| 资源哈希 | 内容寻址（`app-shared-Db1aCW-1.js` 等），长缓存 |
| i18n | Paraglide 风格：`/assets/i18n-fn/<page>-<hash>.js`，11 语言（en/pt-br/de/fr/es/it/hi/id/th/ko/ja） |
| 模板数据 | `/assets/tpl-<slug>-<hash>.json`（含 `project_id`、`url`、`highlights`、`contentHtml`） |
| 代码高亮主题 | `data-code-theme-scope="pulse-code-theme-<hex>"` + `--code-syntax-{light,dark}-*` 变量族 |

---

## 9. 路由与产品能力（路由字面量，VERIFIED）

- 工作台：`/dashboard`、`/dashboard/projects`、`/chats`、`/chats/new`、`/settings`、`/settings/authorized-apps`、`/settings/recently-deleted-projects`、`/organization/{orgId}/{tab}`、`/workspaces/{id}/folders`、`/workspaces/{id}/cloud/auth-settings`、`/workspace-domains/{domainId}`、`/tokens`（404）。
- 项目：`/projects/{id}`（`?view=files|codeEditor|more&subview=…`、`?preview-path=`）、`/projects/new|empty|import|featured|settings|remix|improve`、`/projects/{id}/drafts`、`/gitsync/{id}/activity|graph`、`/canvas-screenshot/{id}`、`/share-preview/{id}`、`/preview/{id}`（404）、`/preview/expo/{token}`。
- 企业/开发：`/lovable-admin/*`、`/dev/*`（约 25 个灰度页：credits、discounts-v2、model picker 等）。
- API：`/api/auth/{custom-token,session-v2,desktop-callback}`、`/api/domain/{verify-contact,verify-email}`、`/api/preview-auth`、`/api/email-preview`、`/api/templates/stats/{id}`、`/connectors/{p}/oauth/callback`、`/api/gcp-marketplace/signup`、`/api/microsoft-marketplace/signup`、`/api/figma/oauth/callback`。

---

## 10. 推断的内部架构（明确标注）

```
浏览器 (TanStack Start SSR shell + SPA)
   │  REST + Connect/protobuf  ──────────────► api.lovable.dev  (Go 系, 边缘 Cloudflare)
   │  SSE (text/event-stream) ───────────────► Agent 回合事件流
   │  WebSocket (/app/ws) ───────────────────► 协作 / 预览同步
   ▼
Build/Agent 编排（Connect 服务 + 状态机; Deployment.status=unknown 暴露内部工作流引擎）
   ├─ 沙箱：GET /projects/{id}/sandbox/url 换取实例地址（技术未知）
   ├─ 产物：/projects/{id}/artifacts（文件树）+ drafts（草稿版本）
   ├─ 构建：Nitro `node-server` 输出 `/output/server/index.mjs`（文档）
   └─ 发布：快照 → *.lovable.app + x-deployment-id 签名寻址
```
**UNKNOWN（不可由浏览器获得）**：沙箱/容器技术、模型厂商与路由、编排引擎、Postgres 版本与扩展、CDN PoP、加密/KMS、限流阈值。

---

## 11. 证据索引（claim → 文件）

| 结论 | 证据文件 |
|---|---|
| 12 个公开页可达、host 集合稳定 | `evidence/raw/sweep.json` |
| dashboard/编辑器 DOM 与 testid | `dash.json`、`editor_struct.json`、`*-dom.html` |
| 回合活动流水（Thought/Ran command/Edited） | `c_c2_history.json` |
| 各服务面板文案（Analytics/Database/Security/Settings/Domains/Usage） | `dom_b*.json`、`views_probe.json` |
| 预览 iframe 与 load id | `editor1.json`、`editor_struct.json` |
| API 端点清单 | `editor_struct.json` → `info.perf` |
| 设计令牌（226 变量） | `design_tokens.json` |
| bundle 字符串（API base、SSE 头、模型名） | `bundle-scan.txt`、`bundle-path-scan.txt` |
| 文档侧（REST/MCP/Cloud/Git/安全） | `notes/DOCS_API.md`、`DOCS_PLATFORM.md`、`DOCS_WORKFLOW.md` |
