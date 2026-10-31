# REA-AGENT — 用 REA 复刻 Lovable（方案 B 产物）

本目录是方案 B 的交付物：**用 REA v6.8.0 录制 Lovable 会话、生成 AgentEnv 环境包，并给出复刻蓝图**。

| 文件 | 内容 |
| --- | --- |
| `REPLICATION_BLUEPRINT.md` | 实测结论 + Lovable 分层 → Foundry 的复刻映射表 + 复现命令 |
| `env-foundry/` | REA 从一次真实录制生成的可运行环境包（5 个工具，Dockerfile + manifest + 录制） |

**已验证可运行**：`rea environment-serve` 直接托管该包，MCP `initialize/tools/list/tools/call` 全部通过，
响应带 `replay.exact_match` 与 `evidence_id` 溯源（详见 `REPLICATION_BLUEPRINT.md` §1）。
`agent-env run` 与 Docker 镜像在本机的两条阻塞也已记录（POSIX-only、registry 不可达）。

录制原始 Evidence 在仓库外：`D:\lovablerea\rea-capture\`（`capture-foundry*.json`、`capture-lovable*.json`）。
**没有入 git**：它们含账号相关的 URL、头名与项目内容，属于个人数据，不适合推到公开仓库。

## 一句话结论

REA 能把"浏览器里看见的一次会话"变成**可回放的 Agent 环境**（读工具从投影状态回答，写工具只在录制里被后续读确认过才服务），
并把当时的网络事实（端点、头名、耗时、控制台错误）完整留档；它**不是**把应用源码或服务器逻辑复制出来的工具。
对 Lovable 这种"服务端长驻 Agent + 独立预览域"的产品，REA 的价值是**独立通道验证架构假设**，而不是克隆实现。

## 复刻路径（与 REPLICATION_BLUEPRINT.md 对应）

1. 用 Foundry（`D:\lovablerea\app`）承接"工作台 + Agent + 沙箱 + 预览 + 版本"闭环 —— 已完成并推送。
2. 用 REA 录制 Lovable 编辑器，把端点/头/时序固化成可比对的事实基线 —— 已完成。
3. 按映射表逐层升级 Foundry：独立预览域与票据、Monaco、`apply_patch`、容器隔离、额度计量。
4. 每次升级后用同一套录制脚本回归，比较"我们的实现"与"Lovable 的行为"是否同构。
