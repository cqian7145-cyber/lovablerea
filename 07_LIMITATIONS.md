# 07 · 局限、不可验证项与风险

> 本文件是全部报告的**可信度边界**。任何结论若与此冲突，以此为准。
> 观测窗口：2026-10-30 22:00 → 2026-10-31 02:30（Asia/Shanghai）；账号：免费档、0 credits。

---

## 1. 方法论与证据强度

| 手段 | 覆盖 | 强度 |
|---|---|---|
| 真实 Chrome（CDP 自研驱动）访问公开页 | 18 个公开页、模板页、docs | 强（可复现） |
| 登录态 DOM/CSS/资源计时抓取 | dashboard、编辑器、More 六个子页、四个弹窗 | 强（有 JSON 原始记录） |
| bundle 静态字符串扫描 | 入口 + 10 个 chunk（无 source map） | 中（字符串可作证据，语义靠推断） |
| 公开文档（docs.lovable.dev，322 页 Markdown） | 产品行为、限制、计费、云、Git、API | 中（厂商自述，未经实测） |
| 纯 HTTP 抓取 | ❌ 被 Cloudflare 拦截 | 无 |
| 主动网络探测/接口重放 | ❌ 未做（合规） | 无 |

---

## 2. 因授权/额度而缺失的关键观测

| 缺失项 | 原因 | 影响 | 补救方式 |
|---|---|---|---|
| **真实生成回合的 SSE 帧** | 账号 0 credits，发送被拦（`5 free credits arrive in 6 hours`） | 无法确证事件类型名、分片粒度、心跳间隔、断线续传；只能靠 bundle 字符串（`text/event-stream`、`X-Browser-Session-ID`、`/app/ws`）推断 | 充值或等额度到账后重跑 `tools/flowH.mjs`（待写：注入 `addInitScript` 钩 `EventSource`/`fetch` 记录帧） |
| 消息排队（`Runs after the current task`） | 同 | 只能引用文档 | 同上 |
| 构建失败 → 自动修复链路 | 同 | 未见错误卡与 `Try to fix` | 同上 |
| 多轮上下文裁剪策略 | 同 | 只能推断（摘要 + 文件检索） | 同上 |

> 结论：**"Agent 回合内部协议"是本报告最薄弱的一环**，凡涉及事件名/协议细节的表述均已在 02/05 标注 INFERRED。

---

## 3. 因产品分层而不可见的部分

| 项 | 状态 | 说明 |
|---|---|---|
| 代码编辑器实现（Monaco/CodeMirror/自研） | UNKNOWN | 免费账号 Code 只读，未触发编辑器内部渲染特征；bundle 未检出 `monaco`/`codemirror`/`xterm` 字符串 |
| 可视化编辑（选元素/改文案）的真实交互 | UNKNOWN | 未执行（避免产生修改与 credits）；仅有工具条存在性证据 |
| Files 视图的集合/上传行为 | 部分 | 只见空态，未上传文件（避免写入） |
| GitHub 同步 UI 全流程 | UNKNOWN | 未连接仓库（会产生外部副作用） |
| 导入（ZIP/仓库）流程 | UNKNOWN | 未执行（消耗额度） |
| 模板 Remix 流程 | UNKNOWN | 需创建项目（消耗额度） |
| 自定义域购买/连接 | UNKNOWN | 付费流程，未进入 |
| 多人协作/评论 | UNKNOWN | 单账号 |
| 组织/企业治理、SSO、审计日志 | UNKNOWN | 无企业账号 |
| 发布后的 CDN/回源行为 | 部分 | 只见域名与 `x-deployment-id` 头 |
| 移动端编辑器 | 部分 | 仅见 `mobile-chat-skeleton` 骨架，未在 390px 下逐页验证（营销页已双视口验证） |

---

## 4. 服务端黑盒（浏览器原理上拿不到）

1. **沙箱技术**：`GET /projects/{id}/sandbox/url` 证明存在"沙箱实例"概念，但隔离方式（容器/microVM/WebContainers）未知。文档只说"隔离 Linux 沙箱"用于 `generate-files`。
2. **模型与路由**：文档从不点名厂商；bundle 里出现过 `gpt-5.6-luna-low|medium|high`、`gpt-6-astra-*` 之类**别名**，属模型选择器的内部标识，**不能据此断定后端模型**（可能是别名映射，也可能是灰度实验）。企业版文档提到 Claude→Vertex AI(EU)、GPT→Azure AI Foundry(EU)、Gemini→Vertex，说明**多供应商**。
3. **编排引擎**：`Deployment.status = unknown`（"workflow state has no recognized public mapping"）暗示内部有持久化工作流引擎（Temporal 类），UNKNOWN。
4. **数据库/存储**：Cloud 基于 Supabase OSS（文档），但版本、扩展、存储后端未知。
5. **构建流水线**：文档说 Nitro `node-server`、Bun、Node 22、端口 3000；实际执行环境未观测。
6. **限流阈值**：文档只给"1000 请求/10s"（免费档）等业务级数字，API 级 RPM 未知。
7. **加密/KMS/SLA**：无公开细节。

---

## 5. 推断的置信度分级

| 结论 | 置信度 | 依据 |
|---|---|---|
| 营销站与产品用 TanStack Start | 高（95%） | `/_serverFn` + vendor-tanstack + `tsr-` 存储键 + 文档 + 产物文件路由 |
| 后端部分用 Connect/protobuf | 中高（80%） | `pkg.Service/Method` 路径 + vendor-protobuf chunk |
| Agent 回合走 SSE | 中（70%） | `Accept: text/event-stream`、`X-Browser-Session-ID` 字符串；未观测到帧 |
| 存在 WebSocket 通道（`/app/ws`） | 中（60%） | bundle 拼接 URL；未观测连接 |
| 预览/发布分域 | 高（99%） | iframe `lovableproject.com` + 发布 `lovable.app` |
| 前端状态用 Zustand + TanStack Router | 中（70%） | 存储键命名 + `tsr-scroll-restoration` |
| 后端语言为 Go | 中（60%） | `404 page not found` 默认体（Go net/http 特征） |
| Cloud 为 Supabase 底座 | 高（90%） | 官方文档明确 |

---

## 6. 合规与伦理边界（本次实际执行）

**做了**：公开页访问、登录后本人账号的界面观察、公开 bundle 字符串扫描、公开文档抓取、本人账号的只读接口观察（浏览器正常浏览产生）。
**没做**：不读 Cookie 值/令牌/凭据；不导出个人数据；不扫私有端点；不做认证绕过；不做接口重放；不高频探测；不获取隐藏系统提示词；不下载或复用其商标与专有素材；不创建消耗额度的项目（发送被额度拦下，非主动规避）。
**仍需注意**：① Lovable ToS 可能限制"自动化抓取/逆向"，本报告仅用于学习与原创设计参考，不用于复制产品；② 报告中出现的第三方名称（Sentry/RudderStack/FullStory 等）仅作技术说明；③ 生成物路由名（如 `m.$venueSlug.stories.tsx`）来自**用户自己的项目**，不含他人隐私。

---

## 7. 产品/商业风险（对复刻者的提醒）

| 风险 | 说明 |
|---|---|
| 单位经济 | 单回合 ¥0.1 量级，但失败重试、长上下文、构建时间会把成本放大 3–5 倍；免费额度必须有硬闸 |
| 生成质量期望管理 | "一句话出应用"在复杂需求上必然失败，产品必须能优雅地"部分完成 + 说明"（Lovable 的 `Paused/Finish up` 就是这种设计） |
| 安全责任 | 用户生成的应用若被发布，平台要承担扫描与下架责任（Lovable 用 Quick/Deep scan + 发布前阻断） |
| 平台依赖 | 依赖单一模型供应商会有价格/可用性风险；架构上必须留 provider 抽象 |
| 差异化 | 纯"克隆"无出路；本报告建议的差异点是中文/国内可达/代码可导出/成本透明 |

---

## 8. 若要继续研究，下一步最小动作

1. 等免费额度到账（或购买最小额度）后，跑一次真实生成，用 `addInitScript` 拦截 `EventSource` 与 `fetch`，记录 **完整 SSE 帧序列**（事件名、字段、分片大小、心跳）。
2. 用 390×844 视口重跑编辑器与 More 页，补齐移动端证据。
3. 连接一个测试 GitHub 仓库（可撤销），记录 GitSync 的分支/commit/PR 行为。
4. 上传一个 1MB ZIP 到 Files，观察集合与上传流程。
5. 发布一个空白项目，抓 `*.lovable.app` 的响应头、缓存策略、TLS 与 `x-deployment-id` 变化规律。

以上 5 项均不涉及绕过认证或读取他人数据，属正常产品使用范围内的观察。
