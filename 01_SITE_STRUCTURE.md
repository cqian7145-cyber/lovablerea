# 01 · Lovable.dev 网站结构与功能清单

> 研究时间：2026-10-30 / 31（Asia/Shanghai）
> 研究者：DSH 逆向工程会话（真实 Chrome + CDP + 公开 bundle 静态分析 + 公开文档镜像）
> 证据等级：**VERIFIED**=本人实测/实抓；**INFERRED**=有证据的推断；**UNKNOWN**=无法观察
> 证据原始文件：`D:\lovable-research\evidence\raw\`、`evidence\assets\`、`evidence\docs\`、`notes\`

---

## 0. 一句话定位

Lovable 是一个「对话式全栈应用生成平台」：用户在 chat composer 里用自然语言描述需求 → 云端 Agent 在隔离环境中读写一个真实代码仓库 → 实时构建并渲染预览 → 一键发布到 `*.lovable.app` 或自定义域名，并可选接入内置后端（Lovable Cloud = Supabase 系）、GitHub 同步、连接器（Gmail/Notion/Linear/…）与安全扫描。

产品面由三层组成，三者技术上互相独立：

| 层 | 域 | 技术 | 证据 |
|---|---|---|---|
| 营销/内容站 | `lovable.dev` | TanStack Start SSR + Vite/Rolldown | `/_serverFn/*` 调用、`vendor-tanstack`、`rolldown-runtime`（VERIFIED） |
| 应用工作台（Dashboard/Editor） | `lovable.dev/app` 路由族 | 同上，登录墙后 | 路由表存在于 bundle（VERIFIED），页面内容需登录（见 §5） |
| 生成产物（用户应用） | `*.lovable.app`、自定义域 | 服务端渲染 HTML + 内容寻址静态资源 | 响应头 + `/__l5e/assets-v1/<uuid>/...`（VERIFIED） |

---

## 1. 域名与服务拓扑（VERIFIED）

| 域名 | 角色 | 证据 |
|---|---|---|
| `lovable.dev` | 主站（营销 + 工作台），Cloudflare 前置 | 响应头 `server: cloudflare`、`x-deployment-id: ba514912142f9ae5…` |
| `api.lovable.dev` | 业务 API（REST v1 + 内部接口） | bundle 常量 `https://api.lovable.dev`；`GET /health` → `{"status":"ok","version":"c51145af…"}`；`GET /` → `404 page not found`（Go `net/http` 默认 404 体） |
| `api-internal.lovable.net` | 内部 API（仅内部构建/管理员链路） | bundle 常量 `https://api-internal.lovable.net` |
| `*.lovable.app` | 生成应用托管 | `server: cloudflare` + `x-deployment-id: psr2.<uuid>.<ts>.<sig>` |
| `*.lovableproject.com` / `*.lovable.dev` | 备用托管域（文档记载） | `[features/publish.md]` |
| `docs.lovable.dev` | 文档（Mintlify） | `/_mintlify/assistant/siteconfig`、`llms.txt` 索引 |
| `rs.lovable.dev` | 分析/实验数据面（RudderStack） | bundle `dataPlaneUrl`、`/sourceConfig?writeKey=30uiF44drV1UnRmUEUVhfQ2L500` |
| `screenshot2.lovable.dev` | 截图服务（项目缩略图） | bundle host 列表 |
| `mcp.lovable.dev` | MCP 服务器（Streamable HTTP） | `[integrations/lovable-mcp-server.md]` |
| `status.lovable.dev` / `trust.lovable.dev` | 状态页 / 信任中心 | 页脚链接 + bundle 常量 |
| `lovable.grafana.net` | 可观测性（Grafana） | bundle host 列表 |
| `pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev` | 公共 R2 桶（静态资源/CDN） | bundle host 列表 |
| `castle.io` / `fullstory.com` / `posthog.com` | 反欺诈 / 会话回放 / 产品分析 | bundle 中 SDK 引用 |

CDN/边缘：全部走 Cloudflare（`cf-ray`、`__cf_bm`、`alt-svc: h3`）。Vercel 在 bundle 中仅作为静态环境变量残留（`NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA`），**不构成 Lovable 用 Vercel 的证据**（INFERRED：属模板/遗留代码气味）。

---

## 2. 信息架构（导航树，VERIFIED 实测）

```
lovable.dev
├── Solutions ▾        /build/*（14 个场景页）、/for-work、/use-cases/ai-apps、/enterprise-landing
├── Resources ▾        /blog、/guides、/videos、/reviews、/templates、/changelog、/support、/docs(→docs.lovable.dev)
├── Community ▾        /community、/community-code-of-conduct、/students、/careers、/brand、/partners(/affiliates,/experts)
├── Enterprise         /enterprise-landing、/security、/trust-center、/legal*、/platform-rules、/abuse
├── Pricing            /pricing
├── Security           /security、/security-issues、/security.txt
├── Log in             /login（Google/GitHub/Apple/Email/SSO）
└── Get started        /signup → /projects/new（登录后）
```

本地化：`/sitemap.xml` 只列出 11 个语言子 sitemap（`en, pt-br, de, fr, es, it, hi, id, th, ko, ja`），页面路径带语言前缀（如 `/pt-br/templates`）。实现为 Paraglide i18n（VERIFIED：bundle 含 `paraglidejs` 与 `/assets/i18n-fn/*`）。

---

## 3. 公开页面清单（VERIFIED，2026-10-30 实测 200）

| 路径 | 用途 | 关键 UI 元素 | 证据 |
|---|---|---|---|
| `/` `/home` | 首页，含 hero composer | Tiptap 输入框（`aria-label="Chat input"`）、`data-testid=chat-composer`、`composer-glow-halo`、模板卡片、底部 CTA composer | 截图 `evidence/raw/home-composer-desktop.png` |
| `/login` | 登录 | Google/GitHub/Apple OAuth 按钮、Email + Continue、`SSO available on Business and Enterprise plans`、右侧渐变面板 | 截图 `page-login.png` |
| `/pricing` | 定价 | Free $0 / Pro $25 / Business $50 / Enterprise 平台费；月付年付切换（年付 2 个月免费） | `sweep.json#pricing` |
| `/templates` | 模板库 | 228 条结果，分类 Websites/Apps + 20 子类 + 15 Persona 过滤 | `sweep.json#templates` |
| `/templates/<slug>` | 模板详情 | 预览截图、`Remix`、原始项目 UUID | `evidence/assets/tpl-to-do-list-app.json` |
| `/connect` | 连接器营销页 | Gmail/Calendar/Docs/Drive/Sheets/Slides 等 | `sweep.json#connect` |
| `/mcp` | MCP 营销页 | 示例 agent 轨迹：`create_project` → `send_message` → `read_file` → `execute_sql` → `Preview ready at xxx.lovable.app` | `sweep.json#mcp` |
| `/build/<场景>` | 14 个 SEO 着陆页 | app/website/android/ios/mobile/chatbot/dashboard/database/landing/no-code/online-store/portfolio/saas/web-app builder | bundle 路由表 |
| `/security` `/trust-center` `/security-issues` | 安全与信任 | SOC 2 Type II、ISO 27001:2022、AIUC-1（文档） | `/security` + `[features/security.md]` |
| `/blog` `/guides` `/videos` `/reviews` `/changelog` `/support` `/faq` | 内容 | — | 导航实测 |
| `/invite/<code>` | 邀请落地页 | 标题 `Claim your invite and earn 10 credits` | `access-probe` |
| `/share-preview/<projectId>` | 公开分享预览壳 | 首屏 `Loading...`（SPA） | `access-probe` |
| `/agent-browser/login` | 「Add a saved login」（浏览器测试用的凭据保存页） | — | `access-probe` |
| `*.lovable.app` | 已发布应用 | SSR HTML + 内容寻址资源 | 响应头 + HTML |

---

## 4. 登录墙后的路由清单（VERIFIED：路由存在于 bundle；页面内容见 §5）

来源：`evidence/raw/bundle-path-scan.txt`（从 6 个 bundle 提取的 364 条路径字面量）。

| 分类 | 路由（节选） |
|---|---|
| 工作台 | `/dashboard`、`/dashboard/projects`、`/projects`、`/projects/new`、`/projects/empty`、`/projects/import`、`/projects/featured`、`/projects/$projectId`、`/projects/$projectId/settings`、`/projects/$projectId/remix`、`/projects/$projectId/improve` |
| 对话 | `/chats`、`/chats/new`、`/chats/$chatId`、`/chats/cofounder`、`/chat-files`、`/chat-files/…` |
| 预览/分享 | `/preview/$`、`/preview/expo/$token`、`/share-preview/$projectId`、`/canvas-screenshot/$projectId`、`/u/$workspaceId/$token` |
| 工作区/组织 | `/workspaces/$workspaceId`、`/workspaces/new`、`/workspaces/{id}/cloud/auth-settings`、`/workspaces/{id}/folders`、`/organization/$orgId/$tab`、`/organization/$orgId/workspaces/$workspaceId` |
| 集成 | `/connectors/$connectorId/connect`、`/connectors/mcp/$connectorId/connect`、`/connectors/google/connect`、`/supabase/callback`、`/github/callback`、`/figma/auth-complete`、`/linkedin/oauth/callback`、`/mcp/$connectionId/oauth/callback` |
| Git 同步 | `/gitsync/$projectId/activity`、`/gitsync/$projectId/graph`、`/lovable-admin/gitsync/…` |
| 设置 | `/settings/authorized-apps`、`/settings/recently-deleted-projects`、`/settings/workspace-domains/$domainId`、`/tokens`(404 实测，疑为旧路由) |
| 域名 | `/workspace-domains/$domainId`、`/verified-domains`、`/verify-domain-email`、`/domain-registration-terms` |
| Agent 浏览器 | `/agent-browser`、`/agent-browser/login`、`/agent-browser/session/$sessionId`、`/dev_/agent-browser-handoff` |
| 内部/灰度 | `/dev/*`（约 25 个 feature-flag 预览页）、`/lovable-admin/*`、`/ailpbuilder`、`/free-build-hour`、`/freecreditstest` |

### 4.1 匿名访问行为（VERIFIED，`tools/access_probe.mjs`）

| 路由 | 状态 | 落点 |
|---|---|---|
| `/dashboard` | 307 | `/login?redirect=%2Fdashboard` |
| `/projects` | 307 | `/dashboard`（二次跳登录） |
| `/chats`、`/chats/new`、`/settings*`、`/organization`、`/chats/cofounder` | 307 | `/login?redirect=…` |
| `/projects/new`、`/projects/empty`、`/projects/import` | 200（服务端渲染） | 真实浏览器中由客户端守卫重定向到 `/login` |
| `/projects/<uuid>` | 403 | 存在性隐藏（不区分"不存在/无权限"） |
| `/preview/<uuid>`、`/tokens`、`/workspaces/new`、`/cofounder` | 404 | — |

**结论**：产品区在客户端路由守卫后，服务端仍会渲染骨架（说明 SSR 与鉴权分离），因此"页面存在性"可从路由表验证，但"页面内容"必须登录。

---

## 5. 工作台/编辑器结构（VERIFIED，登录后实测）

> 证据：`evidence/raw/dash.json`、`editor_struct.json`、`flow_*.json`、`c_c2_history.json`、`d_*.json`、截图 `after-login.png`、`editor_struct-viewport.png`、`step_more2.jpg`、`flow_*.jpg`。
> 内部代号：工作台外壳的 pending 骨架 testid 为 `glasshouse-root-pending` / `glasshouse-connectors-pending` / `glasshouse-composer-pending` → **INFERRED**：dashboard 外壳代号 "Glasshouse"。

### 5.1 Dashboard（1440×900）

```
┌ 256px rail ─────────────┬ 主区（全屏渐变 canvas + 中央 composer）──────────────┐
│ logo                    │  [AI apps 胶囊横幅]                                  │
│ workspace 切换器 ▾       │                                                      │
│ + New                   │            Got an idea, <名>?                        │
│ 🔍 Search  Ctrl K        │   ┌──────────────────────────────────────┐          │
│ ▦ Projects              │   │ + Ask Lovable to build a landing…  Build▾ 🎤 ⏎│   │
│ ⚡ Connectors            │   └──────────────────────────────────────┘          │
│ Projects(分组+项目+⋯)     │                                                      │
│ See all projects        │   ┌ [Search] My projects │ Recently viewed │ Templates ┐│
│ Recent chats            │   │ 项目卡片（封面 + 名称 + Edited x ago + Published 徽标）│
│ ── Upgrade to Pro       │   └ Browse all →                                     │
│ ── Share Lovable(推荐)   │                                                      │
│ 👤 账户菜单              │                                                      │
└─────────────────────────┴──────────────────────────────────────────────────────┘
```

- 交互入口（testid 可直接定位）：`workspace-menu-trigger`、`sidebar-nav-home/search`、`sidebar-rail-projects/connectors/chats`、`sidebar-project-item`(+`-actions`)、`sidebar-recent-chats-new-chat`、`create-form-plus-menu-trigger`、`create-form-chat-mode`（Build 模式下拉）、`chat-composer-editor`、`dashboard-projects-browse-all`、`rail-edge-drag-handle`（侧栏宽度可拖拽）、`dashboard-mobile-back-home`。
- 结构特征：**背景层与内容层分离**（`dashboard-layout-background` + `background-frame` + `composer-glow-halo`），composer 是页面主角，项目列表以"底部抽屉"形式出现（不是传统表格页）。
- 侧栏内项目条目支持 `Project actions`（置顶/更多），项目卡片带 `Edited …` 时间与 `Published` 徽标。

### 5.2 项目编辑器（`/projects/<uuid>`）

```
┌ 顶栏 48px ───────────────────────────────────────────────────────────────────┐
│ ☰  项目名 ▾   🕘(history)  ⇤(sidebar)   [Preview|Files|Code|More]   Share Upgrade Publish │
├ 聊天列 429px ───────────┬ 预览面板 1002px ────────────────────────────────────┤
│ 气泡：用户消息(附件卡)    │  URL 栏: [🌐] / Homepage ▾   ⌂ 📱 ↻ ↗              │
│ 「Paused」回合卡          │  iframe: <uuid>.lovableproject.com/?__lovable_load_id=…│
│ 「Add credits」计费卡     │  …                                                 │
│ composer: + | Build▾ | 🎤 | ⏎ │  底部浮动工具条: ⌖ 选择元素  T 改文案  ✎ 画标注  💬 评论 │
└─────────────────────────┴────────────────────────────────────────────────────┘
```

- 顶栏：`editor-nav-project-menu`（项目名下拉：`Unpublished project` / `N credits left` / `New draft`）、`editor-nav-history-toggle`（History）、`editor-nav-sidebar-toggle`、视图切换 `view-switcher-preview|files|codeEditor|more`、`collaboration-invite-trigger`(Share)、`upgrade-button`、Publish。
- 聊天列：`chat-timeline` > `chat-scroll-container` > `chat-item-user_message`(429×184) / `chat-item-ai_message`(429×64) ；回合状态卡（**Paused**）、计费卡（`Add credits to keep going`）、`chat-composer-area` / `chat-composer-pending-area` / `chat-nudge-overlay` / `chat-input-mode-selector` / `chat-input-action-menu-trigger` / `chat-input-voice-record` / `chat-input-send`。
- 预览面板：`preview-url-bar-page-trigger`（页面/路由选择器，实测下拉仅 `/`）、`preview-url-bar-device-toggle`（Desktop/Mobile）、`preview-url-bar-refresh`、`preview-url-bar-open-new-tab`；可视化工具条 `preview-toolbar-mode-selection|text|drawing|comment`、`preview-toolbar-options`、`preview-toolbar-minimize-button`。**iframe 独立子域**：`https://<project-uuid>.lovableproject.com/?__lovable_load_id=<uuid>`。
- **Files ≠ 源码树**：Files 视图是"项目文件库/集合"（空态文案 `No files or collections` / `Upload files` / `Create collection`），对应文档里的 collections（≤100/项目）与附件；源码只能在 Code 视图看。
- **Code 视图对免费账户只读**：面板文案 `Read only` + `Upgrade` 按钮（`evidence/raw/dom_a2_code.json`）→ 代码编辑器本身存在（未检出 Monaco/CodeMirror 特征，判断为自研/封装编辑器，**INFERRED**），但写权限属于付费能力。
- **More 视图（项目后台）**：全屏浮层，左侧服务导航 13 项 —— `Analytics`、`Database`、`Users`、`Storage`、`AI`、`Payments`、`Emails`、`Domains`、`Connectors`、`Security`、`SEO & AI search`、`Usage`、`Settings`；URL 子路由 `?view=more&subview=newAnalytics|database|security|settings-general|settings-domains|usage`，testid `more-view` + `services-sidebar-*`。实测内容：
  - Database：`Save your app's data — Orders, posts, reservations — stored and ready to show back.` + `Enable`（未启用）；
  - Security：Quick scan「Runs automatically on every publish. Free · Last scan 1 minute ago · Up to date · No issues found」；Deep scan「Free · Not scanned yet · 约 4 分钟」；`Project dependencies 52 packages • 12 known issues`；
  - Settings：`Project name / URL subdomain / Owner / Messages count 1 / AI edits count 1 / Credit usage 5 credits`；
  - Domains：`Find and buy a domain (Pro)` / `Connect a domain you own (Pro)` / `Lovable address · <sub>.lovable.app`；
  - Usage：`5 credits covered by free allowance in last 30 days`，按 `Build` / `Run` 分类的堆叠柱图；
  - Analytics：`Visits 3,512→3,599`、按 `All/SEO & AEO/Social/Referral/Direct/Ads` 分渠道、未发布时显示 `Publish your app to start tracking visits`。

### 5.3 回合详情（Details）与版本历史（VERIFIED，`c_c2_history.json`）

- History 面板：`History` + `Bookmarks` 两个分组；版本条目形如 `Fixed user challenge coupling · Oct 30, 2:25 PM`（**版本名是 Agent 生成的自然语言摘要**，不是 v1/v2）。
- 回合详情头部：`Back to latest` · `4m 12s` · `6.20`（时长 + 消耗 credits）· tabs `Details / Timeline / Changes` · `History / Bookmarks` · `Expand all`。
- **活动流水（这是本项目最有价值的证据）**：`Thought for 8s` → `Ran command` → `Thought for 19s` → `Edited styles.css` → `Edited types.ts` → `Edited mock-data.ts` → `Edited repository.ts` → `Edited experiences.ts` → `Edited ui.tsx` → `Edited SubmitForm.tsx` → `Thought for 6s` → `Ran command` → `Edited index.tsx` → `Edited m.$venueSlug.index.tsx` → `Edited m.$venueSlug.stories.index.tsx` → `Edited m.$venueSlug.stories.$storyId.tsx` → `Edited m.$venueSlug.write.tsx` → `Edited m.$venueSlug.letters.tsx` → `Thought for 31s` → `Edited m.$venueSlug.experiences.$type.tsx` → `Edited account.memories.tsx` → `Edited studio.tsx` / `studio.index.tsx` / `studio.review.tsx` / `studio.curation.tsx` / `studio.settings.tsx`。
  → 直接印证：① 推理与工具调用交织的 ReAct 循环；② 文件级编辑（非整仓覆盖）；③ 生成物是 **TanStack Start 文件式路由**（`m.$venueSlug.stories.$storyId.tsx`）；④ 用户 prompt 里要求的分层（`repository.ts`/`mock-data.ts`/`types.ts`/`ui.tsx`）被真实落地。
- 每个 activity card 都有 `More actions` / `Revert` / `Bookmark in history`；版本条目有 `Revert to this version`。

### 5.4 Share / Publish（实测弹窗原文）

- Share：`Share project / Invite / Invite link (disabled) / <我> Owner / Workspace access: <workspace> Can edit / Share a preview link`。
- Publish：`Not published / Website URL / Add domain (Pro) / <slug>-<4hex>.lovable.app / Visible to anyone with the link / No security issues found / Publish`。
  → 发布前安全扫描结果直接嵌在发布弹窗里（与文档"每次发布自动 quick scan"一致），子域名为 `slug+4位十六进制`（如 `pixel-perfect-picture-0038`），与模板 JSON 里的 `url` 命名规则一致。

---

## 6. 功能矩阵（结论 1）

| 能力域 | 功能 | 状态 | 证据 |
|---|---|---|---|
| 创建 | 自然语言创建项目 | 有 | composer + 文档 |
| 创建 | 模板库（228 条）Remix | 有 | `/templates` 实测 |
| 创建 | 导入（Replit/Manus/Bolt/Base44/v0/ZIP/GitHub） | 有 | `[features/projects/import-project.md]` |
| 创建 | Build with URL（从网址/参考图起手） | 有 | `[integrations/build-with-url.md]` |
| 创建 | 多入口：Desktop / Mobile / Slack / Telegram / ChatGPT / MCP | 有 | `[integrations/*]`、`/chatgpt-app` 路由 |
| Agent | Build / Plan / Chat 三模式 | 有 | `[features/agent-mode.md]` `[features/plan-mode.md]` `[features/chat-mode.md]` |
| Agent | 子代理（只读并行，Explore 型） | 有 | `[features/subagents.md]` |
| Agent | 浏览器测试（真浏览器截图/控制台/网络） | 有 | `[features/browser-testing.md]` |
| Agent | 文件生成沙箱（Python/Node/Bun/Deno，30+ 格式） | 有 | `[features/generate-files.md]` |
| Agent | Skills（`/` 调用）与 Memory/Instructions | 有（滚动发布） | `[features/skills.md]` `[features/memory.md]` `[features/knowledge.md]` |
| Agent | Goal runs（`/goal`，最长 10h）与 Jobs（定时任务） | 有 | `[features/goal-runs.md]` `[features/jobs.md]` |
| 编辑 | Code 面板（Monaco 类编辑器，付费版可写） | 有 | `[features/code-mode.md]` `[features/projects/editor.md]` |
| 编辑 | 可视化：选元素/改文案/画标注/评论 | 有 | `[features/preview-toolbar.md]` |
| 编辑 | 设计系统 / 设计模板（Business+） | 有 | `[features/design-systems.md]` |
| 版本 | 自动版本 + 回滚 + Remix | 有 | `[features/projects/history.md]` |
| 后端 | Lovable Cloud（DB/Auth/Storage/Edge Functions/Secrets） | 有 | `[features/cloud.md]` |
| 后端 | 外部 Supabase / Neon 集成 | 有 | `[integrations/supabase.md]` `[integrations/neon.md]` |
| 集成 | GitHub/GitLab/Bitbucket 同步（仅导出） | 有 | `[integrations/git-sync-overview.md]` |
| 集成 | 180+ 连接器（OAuth 网关托管凭据） | 有 | `[integrations/introduction.md]` |
| 发布 | `*.lovable.app` 发布、自定义域、SSL、unpublish、embed URL | 有 | `[features/publish.md]` `[features/custom-domain.md]` |
| 安全 | 发布前 Quick scan、按需 Deep scan、PII 扫描 | 有 | `[features/security.md]` `[features/sensitive-data-scanning.md]` |
| 协作 | 多人实时编辑、评论、分享权限、组织/工作区 | 有 | `[features/collaboration.md]` `[features/share-project.md]` |
| 计费 | Credits 制（Free 5/天、Pro/Business 100/月、Enterprise 平台费） | 有 | `/pricing` + `[introduction/credits-and-usage.md]` |
| 开放接口 | REST `/v1`（Business+）、MCP 服务器、Webhooks/Hooks | 有 | `[api-reference/*]` `[integrations/lovable-mcp-server.md]` |
| 企业 | SSO/SAML、SCIM、审计日志、发布策略、EU 推理 | 有 | `/pricing` + `[features/business/*]` |

---

## 7. 明确 UNKNOWN（本文件范围内）

1. Code 视图的具体编辑器实现（未检出 Monaco/CodeMirror/xterm 特征；自研或按需懒加载，UNKNOWN）。
2. `psr2` 部署 ID 中 `psr2` 的完整语义（推测为 "project static render v2"，UNKNOWN）。
3. Cloudflare 之后的 origin 云厂商（AWS/GCP/Azure）——仅能从 EU 推理文档间接看到 Vertex/Bedrock/Azure AI Foundry，hosting origin 未暴露。
4. `api.lovable.dev` 内部未公开路由（仅 `/v1` 公开文档 + `/health` 实测）；登录态可见的 ~40 条内部 REST/RPC 已记录在 04 号文件。
5. `x-deployment-id` 的签名算法与部署版本寻址机制。
6. 五个项目服务（Database/Users/Storage/Payments/Emails）的真实后端实现（UI 已见，后端被 Cloud 抽象，UNKNOWN）。
