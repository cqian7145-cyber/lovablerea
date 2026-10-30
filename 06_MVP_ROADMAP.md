# 06 · 低成本 MVP 实施路线（DeepSeek API 版）

> 目标：用 6–8 周、1–2 人、月成本 < ¥500（不含域名/服务器弹性部分）做出「对话即出可运行 Web 应用」的最小闭环。
> 依据：`04_TECHNICAL_EVIDENCE.md` 的可复现部分 + `05_ARCHITECTURE_PROPOSAL.md` 的原创架构。
> **明确不做**：不做 Lovable 的云数据库、连接器市场、企业治理、多模型路由、移动端 App 生成。

---

## 0. 范围定义（先砍到能跑）

| 做 | 不做（v1） |
|---|---|
| 单页/多页 React + TS + Tailwind 应用生成 | 后端 API/数据库生成 |
| 沙箱内 `npm install` + 构建 + 预览 | 预览与生产共享数据 |
| 文件树浏览 + 代码只读/编辑 + diff | 多人实时协作 |
| 版本快照 + 回滚 | Git 同步、连接器、MCP |
| 一键发布到 `*.yourdomain.app` | 自定义域购买、SSL 自助 |
| 用量计费（credits）与限额 | 组织/SSO/审计 |

**MVP 的一句话验收**：新用户输入「做一个番茄钟落地页，有开始/暂停/重置」，90 秒内在右侧看到可交互页面，代码树出现在左侧，改动一句话后页面更新，刷新浏览器后项目还在，点发布得到一个公开 URL。

---

## 1. 技术选型（与原产品对齐但独立实现）

| 层 | 选择 | 理由 | 风险 |
|---|---|---|---|
| 前端框架 | **Next.js 15 (App Router) + TS + Tailwind + shadcn/ui** | 团队熟悉、部署生态最好 | 与 Lovable 的 TanStack 不同，但**生成物**不受影响 |
| 编辑器 | **Monaco** | 成熟、diff 视图现成 | 体积大 → 动态 import |
| 执行沙箱 | **WebContainers**（MVP）→ 容器/microVM（生产） | 浏览器内 Node，无需服务器执行用户代码，安全边界天然 | 需 COOP/COEP；Safari 支持一般 |
| 构建 | Vite（沙箱内）+ 产物快照 | 与 WebContainers 匹配 | 依赖安装慢（可预热 npm 缓存） |
| 模型 | **DeepSeek `deepseek-chat`**（V3.x），可切 `deepseek-reasoner` | 便宜、function calling 稳定、中文好 | 长上下文成本；需自己做上下文裁剪 |
| 数据库 | **Postgres（Supabase 或 Neon）** | 托管、RLS、便宜 | 冷启动 |
| 对象存储 | **Cloudflare R2** | 出网免费、S3 兼容 | — |
| 版本控制 | 自建 `versions` 表 + 文件快照（MVP 不上 git） | 简单 | 大仓库膨胀 → 增量快照 |
| 实时通道 | **SSE**（`text/event-stream`） | 单向、易穿透代理、可断线续传 | 需心跳与 Last-Event-ID |
| 发布 | **Cloudflare Pages**（直传静态产物） | 免费额度大、API 简单 | 动态 SSR 需 Workers |
| 认证 | Supabase Auth（邮箱 + GitHub OAuth） | 省 2 周 | — |
| 计费 | 自建 credits 表 + Stripe（后期） | MVP 先免费额度 | — |
| 可观测 | Sentry + 自建 turn 事件表 | 定位 Agent 失败 | — |

---

## 2. 分阶段计划

### Phase 0 · 骨架（第 1 周，约 5 人日）

**交付**
- Next.js 应用 + Supabase Auth + 项目表（`projects`、`turns`、`messages`）。
- 工作台首页：项目列表 + 中央 composer（仅存消息，不生成）。
- DeepSeek 流式对话（无工具）：验证 SSE 管道与 token 计费。

**验收**：登录 → 建项目 → 发消息 → 看到流式回复 → 刷新后历史还在。
**产出文件**：`app/(app)/dashboard/page.tsx`、`app/api/turns/route.ts`（SSE）、`lib/deepseek.ts`、`db/schema.sql`。

### Phase 1 · 第一个可运行页面（第 2–3 周，约 10 人日）

**交付**
- 虚拟文件系统（内存 + 快照落库）：`files(path, content, version_id)`。
- Agent 工具：`write_file`、`read_file`、`list_files`、`run_build`（4 个就够）。
- 沙箱：WebContainers 启动 Vite + React 模板，`write_file` → 触发热更新。
- 预览 iframe + 刷新 + 设备切换（桌面/移动）。
- 代码面板（Monaco 只读）+ 文件树。
- 首个模板：`vite-react-ts-tailwind`（约 12 个文件，控制上下文体积）。

**验收**：一句话生成可交互页面；手改一个文件后预览更新；页面在 20 秒内出现首屏。
**关键指标**：首字节 < 3s，首次可交互 < 60s，单回合 token < 40k。

### Phase 2 · 迭代闭环（第 4–5 周，约 10 人日）

**交付**
- 回合状态机 + 活动流（`thought` / `ran_command` / `edited_file` / `error`），前端按事件渲染。
- diff 视图（Monaco DiffEditor）+ `Changes` tab。
- 版本快照 + 历史列表 + 回滚（`revert` 只回滚文件，不回滚数据）。
- 自动修复：构建失败 → 把 stderr 回灌模型，最多 2 次。
- 计费：每回合记录 `prompt_tokens/completion_tokens/credits`。

**验收**：一次失败注入（故意写错 import）能被自动修复并说明原因；回滚后预览恢复上一版。

### Phase 3 · 发布（第 6 周，约 5 人日）

**交付**
- `POST /api/projects/:id/publish`：构建产物 → R2 → Cloudflare Pages 部署 → 返回 `<slug>.yourdomain.app`。
- 发布前轻量扫描：`package.json` 依赖审计（`npm audit --json`）+ 硬编码密钥正则。
- 发布弹窗（域名、可见性、扫描结果）。
- 未发布/已发布状态徽标。

**验收**：发布后公网可访问、HTTPS 正常、10 秒内可用；再次发布覆盖同域。

### Phase 4 · 打磨与限额（第 7–8 周，约 8 人日）

- 免费额度（如 5 credits/天）+ 用尽态 UI（对齐实测的 `Add credits to keep going` 模式）。
- 错误分类与重试；SSE 断线重连（`Last-Event-ID`）。
- 成本看板（每项目 token/credits）；异常回合告警。
- 安全：上传大小限制、输出目录白名单、禁止 `postinstall` 脚本、网络出口白名单。
- 埋点：回合时长、编辑文件数、构建失败率、留存。

---

## 3. 成本模型（估算，需按官方价目复核）

单回合成本（DeepSeek，按「输入 ¥2/M、输出 ¥8/M、缓存命中 ¥0.5/M」量级估算，**以官网为准**）：

| 项 | 量级 | 成本 |
|---|---|---|
| 系统提示 + 项目摘要 + 文件索引（缓存命中部分） | 8k tokens | ≈ ¥0.004 |
| 用户消息 + 相关文件全文 | 12k tokens | ≈ ¥0.024 |
| 模型输出（含工具参数） | 5k tokens | ≈ ¥0.040 |
| 构建失败重试（平均 0.3 次） | +30% | ≈ ¥0.02 |
| **单回合合计** | | **≈ ¥0.07–0.12** |
| 单项目从 0 到可用（约 6 回合） | | **≈ ¥0.5–0.8** |

基础设施：Supabase 免费档 / Neon $19、R2 <$1、Cloudflare Pages 免费、Vercel Hobby 免费、域名 $12/年。
→ **月成本 ≈ ¥200–400（含 3000 回合）**，符合「低成本」目标。

---

## 4. 差异化（不复制 Lovable）

1. **中文优先 + 国内可访问部署**（Lovable 在中国大陆访问受限）。
2. **代码可导出为 git 仓库**（MIT 许可的模板），而非锁定在平台。
3. **成本透明**：每回合显示 token 与费用（Lovable 只显示 credits）。
4. **本地优先模式**：可选「本地执行」（用户机器跑 `vite`），规避云端沙箱成本。
5. **不做数据库/连接器**，专注「前端应用生成」这一条线。

---

## 5. 风险与缓解

| 风险 | 影响 | 缓解 |
|---|---|---|
| DeepSeek 长上下文成本失控 | 毛利为负 | 文件摘要 + 相关文件检索（只喂命中的 3–5 个文件）；硬上限 60k tokens/回合 |
| WebContainers 兼容性（Safari/COOP） | 部分用户不可用 | 检测失败时降级为「服务端 esbuild 打包 + iframe srcdoc」 |
| 生成代码质量差 | 留存低 | 严格模板 + 类型检查 + 自动修复循环；把 `AGENTS.md` 约定注入系统提示 |
| npm 安装慢/失败 | 首屏慢 | 预置依赖锁文件 + 本地 registry 镜像 + 预热容器 |
| 用户生成恶意代码 | 安全 | WebContainers 沙箱；发布前扫描；禁止 `postinstall`；出口白名单 |
| 版权/品牌风险 | 法务 | 全部 UI 令牌自建；模板原创；不使用 Lovable 商标与截图 |

---

## 6. 可直接交给 Codex 的任务清单（按依赖排序）

1. `db/schema.sql`：`projects / files / versions / turns / turn_events / messages / deployments / usage`（参考 05 §7）。
2. `lib/sandbox/`：`WebContainerHost.ts`（boot、mount、write、spawn dev server、监听 `server-ready`）。
3. `lib/agent/tools.ts`：`list_files / read_file / write_file / delete_file / run_build`，JSON Schema + 执行器。
4. `lib/agent/loop.ts`：ReAct 循环（max 12 steps）、tool 结果裁剪、失败重试 2 次、事件发射。
5. `app/api/turns/route.ts`：SSE，事件 `turn_started|thought|tool_call|tool_result|file_written|build_result|turn_finished|error`，心跳 15s，支持 `Last-Event-ID`。
6. `app/projects/[id]/page.tsx`：三栏布局（chat 420 / 预览弹性 / 文件树抽屉），URL 状态 `?view=preview|files|code`。
7. `components/preview/PreviewFrame.tsx`：iframe + 刷新 + 设备切换 + 错误覆盖层。
8. `app/api/projects/[id]/publish/route.ts`：构建 → R2 上传 → Cloudflare Pages API → 写 `deployments`。
9. `lib/credits.ts` + 用尽态 UI。
10. `tests/`：回合状态机单测、SSE 事件序列快照、发布失败回滚。

---

## 7. 里程碑与验收（给项目管理用）

| 周 | 里程碑 | 可演示内容 |
|---|---|---|
| 1 | 骨架通 | 登录、建项目、流式聊天 |
| 3 | 首次生成 | 一句话 → 可交互页面（沙箱内） |
| 5 | 迭代闭环 | 改需求 → diff → 版本回滚 |
| 6 | 发布 | 公网 URL + 扫描结果 |
| 8 | 限额与打磨 | 免费额度、成本看板、错误恢复 |

**Go/No-Go 指标**（第 5 周评估）：首屏可交互 ≤60s、单回合成本 ≤¥0.15、生成成功率（无人工干预可运行）≥80%。
