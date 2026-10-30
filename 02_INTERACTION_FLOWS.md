# 02 · 交互流程与状态流转

> 目标站点：https://lovable.dev/ ｜ 观测时间：2026-10-30/31（Asia/Shanghai）
> 证据等级：**VERIFIED** = 本人实测截图/DOM/网络记录；**INFERRED** = 由证据推断；**UNKNOWN** = 无法观察。
> 主要原始证据：`evidence/raw/{dash.json, editor_struct.json, c_c0_chat.json, c_c1_paused.json, c_c2_history.json, dom_a1_files.json, dom_a2_code.json, dom_*.json, flow_*.json, views_probe.json, tab_files.json}`，截图 `after-login.png`、`editor_struct-viewport.png`、`step_more2.jpg`。
> 免责：本文只记录**公开界面可观察到的行为**；不包含任何隐藏提示词、服务器源码或私有接口探测。

---

## 0. 端到端旅程总览

```
匿名访问 ──► 营销站(/home /templates /pricing …)          VERIFIED
   │  点 composer 或 New
   ▼
登录（Google/GitHub/Apple/Email/SSO）                     VERIFIED
   │
   ▼
Dashboard（Glasshouse 外壳）                              VERIFIED
   │  ① 中央 composer 输入自然语言  ② 或选模板 Remix  ③ 或导入仓库
   ▼
POST 创建项目 → /projects/<uuid>（编辑器三栏）             VERIFIED（路由与界面）
   │
   ├─ Agent 回合：Thought → Ran command → Edited <file> ×N ──► 文件落盘      VERIFIED（活动流水）
   │        └─ 回合中：预览自动刷新、状态行计时、credits 计费               VERIFIED（4m12s / 6.20）
   │
   ├─ 可视化微调：选元素 / 改文案 / 画标注 / 评论                            VERIFIED（工具条）
   ├─ Code 视图：只读（免费）→ Upgrade 后可编辑                              VERIFIED
   ├─ Files 视图：文件库/集合（上传文件、建集合）                             VERIFIED
   ├─ More 视图：Analytics/Database/Security/Settings/Domains/Usage…         VERIFIED
   ├─ History：版本列表 + Bookmarks + Revert                                VERIFIED
   └─ Publish：发布弹窗（安全扫描结果 + 域名）→ *.lovable.app               VERIFIED
```

---

## 1. A · Prompt 输入

### 1.1 组件解剖（VERIFIED）

| 层 | 元素 | 证据 |
|---|---|---|
| 容器 | `chat-composer`（带 `composer-glow-halo` 光晕） | testid + CSS |
| 编辑区 | Tiptap/ProseMirror `contenteditable`，`aria-label="Chat input"`，`.tiptap.ProseMirror`，16px/24px | `design_tokens` 实测 |
| 左按钮 | `+`（`chat-input-action-menu-trigger` / `create-form-plus-menu-trigger`）：附件、图片、导入等 | testid |
| 模式 | `Build ⌄`（`chat-input-mode-selector` / `create-form-chat-mode`）：Build / Plan / Chat | testid + 文档 |
| 语音 | 麦克风（`chat-input-voice-record`，提示 "Transcribe"） | testid |
| 发送 | ↑（`chat-input-send`） | testid |
| 附件卡 | 用户消息里显示 `Text · 109 lines`、`Show more`（长文档折叠） | 截图 `editor_struct-viewport.png` |

- 输入框为**富文本**而非 textarea：可见 `Text · N lines` 附件卡、多段粘贴、图片附件（localStorage 有 `has_seen_attach_image_modal`，说明存在"首次贴图"引导弹窗）。
- Dashboard 与编辑器复用同一套 composer 组件（同 testid），只是布局与光晕不同 → 组件级复用（INFERRED）。

### 1.2 提交与状态（VERIFIED / INFERRED）

| 阶段 | 可观察表现 | 等级 |
|---|---|---|
| 空态 | placeholder `Ask Lovable to build a landing page for my...` / `Tell Lovable what to do instead...` | VERIFIED |
| 有内容 | 发送箭头由灰变实心（`chat-input-send` 可点） | VERIFIED（截图对比） |
| 提交后 | 用户气泡立即上屏；AI 侧出现活动卡流 | VERIFIED（既有回合） |
| 额度不足 | 发送被拦：不产生新回合，出现 `Add credits to keep going` 卡 + `Your work is paused because you're out of credits. 5 free credits arrive in 6 hours.` | VERIFIED |
| 回合进行中再输入 | 输入框仍可用，消息进入队列（文档：`Runs after the current task` 灰显） | INFERRED（文档 + 本次未实测排队） |
| 出错/重试 | 消息级 `Retry`、`Revert and resend` | INFERRED（文档 + 活动卡 `More actions`） |

> ⚠️ 本次账号 **0 credits**（`g3` 发送测试未产生新回合，弹层提示 6 小时后到账 5 credits），因此"提交 → 流式生成"的真实网络流未被观测到（见 07_LIMITATIONS）。这是唯一因授权边界而缺失的关键环节，不得凭空补写。

### 1.3 会话历史（VERIFIED）

- Dashboard 左侧 `Recent chats`（空态 `No chats yet`）；项目内聊天列保留完整历史，长消息折叠为 `Show more`。
- 每条 AI 消息有 `Reference`（引用到下一轮）、`Copy message link`、`Chat actions` 菜单（testid 与按钮文案实测）。

---

## 2. B · Agent 工作流（公开界面可见部分）

### 2.1 活动流水（VERIFIED，`c_c2_history.json`）

真实观测到的一个完整回合（4m12s / 6.20 credits）的活动序列：

```
Thought for 8s
Ran command
Thought for 19s
Edited styles.css
Edited types.ts
Edited mock-data.ts
Edited repository.ts
Edited experiences.ts
Edited ui.tsx
Edited SubmitForm.tsx
Thought for 6s
Ran command
Edited index.tsx
Edited m.$venueSlug.index.tsx
Edited m.$venueSlug.stories.index.tsx
Edited m.$venueSlug.stories.$storyId.tsx
Edited m.$venueSlug.write.tsx
Edited m.$venueSlug.letters.tsx
Thought for 31s
Edited m.$venueSlug.experiences.$type.tsx
Edited account.memories.tsx
Edited studio.tsx
Edited studio.index.tsx
Edited studio.review.tsx
Edited studio.curation.tsx
Edited studio.settings.tsx
```

由此可确证（VERIFIED）：
1. **ReAct 式循环**：推理块（`Thought for Ns`）与工具块（`Ran command`）与编辑块（`Edited <file>`）交替，一轮内多次迭代。
2. **文件级增量编辑**：逐个文件 `Edited`，不是整仓重写；先建类型/数据/仓储层（`types.ts`/`mock-data.ts`/`repository.ts`/`ui.tsx`），再铺路由页面。
3. **路由生成遵循框架约定**：`m.$venueSlug.stories.$storyId.tsx` 是 TanStack Start（文件式路由，`$` = 动态段）。
4. **思考耗时可见**：8s / 19s / 6s / 31s —— 推理与工具交替的节奏被产品化为可读 UI。
5. 用户 prompt 的架构要求（service/repository 分层、mock adapter）被真实执行 → Agent 会遵守项目内约定文件（`AGENTS.md`/Instructions，见 04 文档）。

### 2.2 回合 UI 状态机

```
idle ──submit──► queued ──► running ──┬──► done ──► idle
                              │        ├──► error ──► (Retry | Revert and resend)
                              │        └──► paused（额度耗尽/中断）──► Finish up | Add credits
                              └── 用户可 Undo latest edit / Revert to this version
```

| 状态 | 界面表现 | 等级 |
|---|---|---|
| running | 活动卡逐条追加、`Working for …`、预览刷新、`Credits used` 累加 | VERIFIED（历史回合回放）+ 文档 |
| done | 折叠为一行摘要 + `Worked for …` | VERIFIED |
| paused | 独立 `Paused` 卡（可展开）+ `Add credits to keep going` 计费卡 | VERIFIED |
| error | 活动卡红色状态 + `Try to fix` | INFERRED（文档 `10 free Try-to-fix`） |
| 中断恢复 | `Finish up`（用剩余/补足额度收尾） | VERIFIED（按钮存在） |

### 2.3 Details / Timeline / Changes（VERIFIED）

- 入口：回合内活动卡 → `Details`；头部展示 `Back to latest · 4m 12s · 6.20`。
- tabs：`Timeline`（活动流水）、`Changes`（文件 diff 列表，逐文件 `+/-`）。
- 每个 activity card 操作：`More actions`、`Revert`、`Bookmark in history`；顶部 `Expand all`。
- 文档补充（INFERRED）：Changes 支持逐文件展开 diff；回滚只回滚代码，不回滚数据、不退 credits。

### 2.4 多轮上下文与记忆（文档 + 弱证据）

- `Reference` 按钮把某条 AI 消息显式纳入下一轮上下文 → 上下文是**可选引用 + 隐式历史**的组合。
- Instructions 双轨（工作区级 + 项目级，项目级优先，单条上限 10000 字符），并写入仓库 `AGENTS.md`（文档）。
- 项目记忆：Agent 把长期事实写进 `AGENTS.md`；`Settings → AI app context` 记录 90 天 AI 日志（文档）。

### 2.5 未观测到的部分（UNKNOWN / 不计入结论）

- 系统的规划格式（是否有显式 plan JSON）、工具调用协议、上下文裁剪策略、并行子代理的调度方式。
- 推理文本内容本身（`Thought for Ns` 卡片是否可展开显示自然语言推理）——本次未成功展开。

---

## 3. C · 编辑器与预览

### 3.1 视图切换（VERIFIED）

顶栏中间是 4 态 segmented control：`Preview` / `Files` / `Code` / `More`，切换写入 URL query（`?view=files|codeEditor|more`），因此**视图状态可分享/可刷新恢复**。

| 视图 | 内容 | 等级 |
|---|---|---|
| Preview | 右侧 1002px 面板内 iframe 渲染产物；URL 栏可切页面、切设备、刷新、新标签打开 | VERIFIED |
| Files | 项目文件库：`No files or collections` / `Upload files` / `Create collection` | VERIFIED |
| Code | 代码面板；免费账户 `Read only` + `Upgrade` | VERIFIED |
| More | 项目后台浮层（13 个服务） | VERIFIED |

### 3.2 预览机制（VERIFIED 关键）

- iframe 源：`https://<project-uuid>.lovableproject.com/?__lovable_load_id=<uuid>`（每次加载带新 load id）。
- 预览 URL 栏显示应用内路径（`/ Homepage`、`/studio/settings`），并支持 `preview-path` query 直达（实测 `/projects/<id>?preview-path=%2Fstudio%2Fsettings`）。
- 设备切换存在独立按钮（Desktop/Mobile，`preview-url-bar-device-toggle`）。
- 预览与已发布版本**共享后端与数据**（文档：staging），但**域名不同**：预览走 `*.lovableproject.com`，发布走 `*.lovable.app`。
- 刷新机制：Agent 编辑文件后预览自动重建（活动卡 `Edited` 后预览内容更新）；手动刷新按钮存在。底层实现（HMR/整页 reload/构建队列）**UNKNOWN**。

### 3.3 可视化修改（VERIFIED 工具条，交互细节部分 UNKNOWN）

工具条：`⌖ Select elements`、`T Edit text inline`、`✎ Draw annotation`、`💬 Add a comment`、`Toolbar options`、`Minimize toolbar`；另有 `Undo` / `Redo`。

- 选择元素 → 针对该元素发消息（文档：把 DOM 元素上下文带给 Agent）。
- 改文案 → 直接内联编辑（文档：100 次免费 inline 文本编辑/账号、2000/24h/工作区上限；生产构建会去掉编辑脚本）。
- 画标注/评论 → 生成可视化标注图层；评论线程发送计 credits、查看免费。
- 本次未实际执行元素选择（避免产生修改与 credits 消耗）→ 具体交互细节 **UNKNOWN**。

### 3.4 项目后台（More，VERIFIED）

| 服务 | 实测内容 | 说明 |
|---|---|---|
| Analytics | Visits 3,512→3,599、渠道 All/SEO& AEO/Social/Referral/Direct/Ads、未发布提示 | 内建流量分析 |
| Database | `Save your app's data …` + `Enable` | Cloud 数据库开关（未启用） |
| Users | 认证用户列表（未启用时为空态） | Cloud Auth |
| Storage | 对象存储 | — |
| AI | AI 应用上下文/日志 | 文档：90 天 |
| Payments / Emails | 支付与邮件服务 | 未启用 |
| Domains | 买域（Pro）/ 连域（Pro）/ lovable 地址 | 子域 `slug-4hex.lovable.app` |
| Connectors | 连接器目录（180+，OAuth 托管） | 文档 |
| Security | Quick scan（发布时自动）/ Deep scan（4 分钟）/ 依赖 52 包含 12 个已知问题 | — |
| SEO & AI search | SEO 元信息与 AI 搜索优化 | — |
| Usage | `5 credits covered by free allowance in last 30 days`，Build/Run 分类 | 计费可见 |
| Settings | Project name / URL subdomain / Owner / Messages count 1 / AI edits count 1 / Credit usage 5 | 项目级遥测 |

---

## 4. D · 项目管理

| 流程 | 实测行为 | 等级 |
|---|---|---|
| 新建 | Dashboard `+ New` 或中央 composer；提交后进入 `/projects/<uuid>` | VERIFIED |
| 草稿 | 项目菜单显示 `New draft`；文档：空草稿 24h 删除、名字 ≤80 字符 | VERIFIED/文档 |
| 项目列表 | 侧栏分组 + 卡片（封面/名称/Edited/Published）+ `See all projects` + 搜索 `Filter projects` | VERIFIED |
| 导入 | `/projects/import`（`Import codebase`），支持 GitHub/ZIP/Replit/Bolt/v0/Base44 | VERIFIED（路由）/文档 |
| 模板 | `/templates` 228 条；模板详情 `Remix` → 生成新项目（模板含 `project_id` + 已发布 `url`） | VERIFIED |
| Share | `Invite` / `Invite link(disabled)` / `Workspace access: Can edit` / `Share a preview link` | VERIFIED |
| 发布 | 弹窗：`Not published / Website URL / Add domain(Pro) / <sub>.lovable.app / Visible to anyone with the link / No security issues found / Publish` | VERIFIED |
| 版本 | History 列表（Agent 命名的版本，如 `Fixed user challenge coupling`）+ Bookmarks + Revert | VERIFIED |
| GitHub 同步 | 项目菜单/设置内（本次未进入）；文档：只导出不导入、新私有仓、`lovable-sync` 分支、24h 恢复 | INFERRED |
| 部署后状态 | 发布后 `Published` 徽标出现在 dashboard 卡片 | VERIFIED（Pixel Perfect Replica 卡片） |

---

## 5. 观测到的 API 调用（VERIFIED，资源计时记录）

编辑器首屏可见的 `api.lovable.dev` 调用（`editor_struct.json` 的 `perf` 字段，均为 fetch/XHR）：

| 方法+路径 | 用途推断 |
|---|---|
| `POST /lovable.freebuildhour.v1.FreeBuildHourService/GetStatus` | **Connect-RPC 风格**服务：免费构建小时活动状态 |
| `POST /lovable.workspaceclaims.v1.WorkspaceClaimNoticeService/GetPendingClaim` | 同上，工作区认领提示 |
| `GET /user/workspaces` · `GET /user/organizations` · `GET /user/project-invitations` | 当前用户上下文 |
| `GET /projects/<id>/workspace` | 项目归属 |
| `GET /projects/<id>/drafts` · `?include_merged=true` · `GET /projects/<id>/artifacts` | 草稿与产物树 |
| `GET /projects/<id>/sandbox/url` | **沙箱/预览环境地址获取** |
| `GET /workspaces/<ws>/projects/<id>/gitsync` | Git 同步状态 |
| `GET /workspaces/<ws>/chats?filter=all&sort=latest&limit=8\|32&offset=0[&include_resources=true]` | 聊天列表（分页 + 资源内联） |
| `GET /workspaces/<ws>/memberships/search?status=active&limit=1` | 成员搜索 |
| `GET /workspaces/<ws>/enterprise-self-serve-offer` · `/auto-topup/status` · `/contract-status` | 商业/计费状态 |
| `GET /banners/active?workspace_id=<ws>` · `/registrar-domains/viewer-verification-banner` | 运营位 |
| `GET /workspaces/<ws>/enterprise-self-serve-offer` | 同上 |

> 结论：客户端**不是单一 REST**，而是 **REST + Connect/Protobuf 服务（`<pkg>.<Service>/<Method>`）混合**；`vendor-protobuf` chunk 与 `*Service/GetStatus` 命名互为证据。全部为读操作，本次未触发写操作（无额度）。

---

## 6. 状态与持久化（客户端）

| 类型 | 键（仅键名，未取值） | 含义 |
|---|---|---|
| cookie | `lovable-workspace-id` / `lovable-workspace-plan` / `lovable-flag-plan` | 当前工作区与计划（服务端可读，SSR 用） |
| cookie | `lovable_consent_v1` | 同意管理 |
| localStorage | `editor-store-create-form` / `editor-mode-store:last` | 新建表单草稿 + 上次编辑器模式（zustand persist 命名风格） |
| localStorage | `lovable:sidebar-projects-filter` / `lovable:sidebar-has-starred:<ws>` / `lovable:removed-recent-projects:<uid>:<ws>` | 侧栏个性化 |
| localStorage | `chat-mode-coachmark-dismissed` / `launch_card_state_*` / `news_read_status_*` | 引导与运营已读 |
| localStorage | `report-dialog-draft` / `has_seen_attach_image_modal` | 表单草稿与引导 |
| session | `_cltk` / `active-workspace-offer-visit` / `tsr-scroll-restoration-v1_3` | 会话级；`tsr-` 前缀 = TanStack Router 滚动恢复 |

→ **INFERRED**：前端状态用 Zustand（`*Store` + persist 键命名）+ TanStack Router（`tsr-` scroll restoration key）+ TanStack Query 类缓存；服务端状态不落 localStorage。
