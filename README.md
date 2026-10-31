# Lovable.dev 逆向研究（研究阶段，非仿制实现）

本仓库是对 https://lovable.dev/ 的**公开界面技术研究**产物，包含七份报告、原始证据（DOM/网络/截图/资源计时 JSON）与自研取证工具。

## 目录

| 文件 | 内容 |
|---|---|
| `01_SITE_STRUCTURE.md` | 网站页面与功能清单、域名拓扑、登录前后路由、工作台/编辑器结构、功能矩阵 |
| `02_INTERACTION_FLOWS.md` | 端到端交互流程、Prompt 输入、Agent 回合、编辑器/预览、项目管理、观测到的 API |
| `03_UI_DESIGN_SYSTEM.md` | 三套主题面、色彩/字体/间距令牌、组件规范、状态与动效、响应式、可落地 CSS 令牌表 |
| `04_TECHNICAL_EVIDENCE.md` | 可验证的前端技术与网络行为：TanStack Start、API 端点、Connect/protobuf、SSE、预览/发布拓扑、第三方 |
| `05_ARCHITECTURE_PROPOSAL.md` | 原创 AI App Builder 候选架构（Next.js + DeepSeek + WebContainers + Postgres/R2） |
| `06_MVP_ROADMAP.md` | 6–8 周低成本 MVP 分阶段计划、成本模型、风险、可交 Codex 的任务清单 |
| `07_LIMITATIONS.md` | 不可验证项、置信度分级、合规边界、后续研究动作 |
| `notes/` | 公开文档（322 页 Markdown）整理出的 Workflow / Platform / API 笔记 |
| `evidence/raw/` | 原始证据 JSON（DOM 结构、资源计时、网络记录）与截图 |
| `tools/` | 零依赖 CDP 取证工具（Node 24 内置 WebSocket/fetch） |
| `app/` | **可运行的原创 MVP**：Foundry，一个 Next.js AI 应用构建器（prompt → 文件 → 构建 → 实时预览 → 版本回滚），见 `app/README.md` |

## 可运行 MVP（app/Foundry）

`app/` 是把 `05_ARCHITECTURE_PROPOSAL.md` 落地的最小实现，可离线跑通完整闭环：

```powershell
cd app
npm install
npm run dev          # http://127.0.0.1:3100
node scripts/smoke.mjs                                   # 建项目 → 一轮对话 → 构建 → 资源 200
node tools/drive.mjs <projectId> "Change the hero paragraph to mention single-origin beans."
```

- 无 `DEEPSEEK_API_KEY` 时使用确定性 mock provider（写真实落地页），有 key 时走 DeepSeek function calling。
- 沙箱在 `D:\foundry-projects\<prj_id>`，独立 git 仓库；每次回合 = 一次提交；Versions 可回滚。
- 截图证据：`app/evidence/workspace.png`、`workspace-after-turn.png`、`versions-tab.png`。
- 安全边界与已知限制见 `app/README.md`（无 shell 工具、路径白名单、预览 iframe sandbox）。

## 证据分级约定

- **VERIFIED**：真实浏览器会话直接测得（DOM/CSS/网络/截图）
- **INFERRED**：由多项证据推断，文中标注
- **UNKNOWN**：无法观察（见 `07_LIMITATIONS.md`）

## 合规声明

研究仅限公开页面与本人账号的界面观察；未读取或导出任何 Cookie 值、令牌、账号凭据；未扫描私有端点、未绕过认证、未做接口重放或高频探测；未获取隐藏系统提示词或服务器源码。
报告中不包含 Lovable 的商标、原创插画或品牌资产，设计令牌为独立换算的等价实现。第三方脚本与整页 HTML 转储未入库（仅保留结构与截图证据）。

## 工具使用

```powershell
# 启动独立 Chrome（CDP 9333，独立 profile）
node tools/ensure.mjs
# 抓取任一页面结构
node tools/snap.mjs <name> [url]
```

> 若需要浏览器观察的 REA 环境变量，请参考报告中的 Phase 0 章节自行配置；本仓库不包含任何凭据。
