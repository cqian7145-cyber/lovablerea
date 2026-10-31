# REA 复刻 Lovable：环境包与复刻蓝图

本目录记录方案 B（"用 REA 复刻 Lovable"）的实测结果。REA = Reverse Engineer Anything v6.8.0，
通过 `npx -y rea-agents@6.8.0` 调用（本会话 REA MCP 未连接，见文末"为什么用 CLI 而不是 MCP"）。

## 1. 已经跑通什么

| 环节 | 命令 | 结果 |
| --- | --- | --- |
| 环境自检 | `rea doctor --json` | node/win32 healthy；`registration:dsh` = aligned；分析引擎（Ghidra/IDA/JADX…）missing，Web 逆向不需要 |
| 录制：自家沙箱 | `rea capture-browser-scenario rea-capture/foundry-env.json --json` | 成功，153 KB Evidence，`predicate_type: rea.browser-scenario-capture` |
| 录制：Lovable 编辑器 | `rea capture-browser-scenario rea-capture/lovable-editor.json --json`（connect 到 9333） | 成功，2.7 MB Evidence，1024 条网络事务 |
| 环境生成 | `rea environment-build <evidence>.clean.json <outDir> --name ... --json` | **成功**：`status: built`，5 个工具，state 服务 1 条读、4 条 replay，0 条写（只读录制） |

生成物 `env-foundry/`：`envs/foundry-app/{Dockerfile,manifest.json,evidence.json}` + `tasks/smoke.json` +
`artifacts/.../verify.py` + README，运行入口是 `agent-env run`（需 AgentEnv framework + Docker）。

**运行验证（本机已完成）**：`agent-env` 在 Windows 上不可用（`os.O_NONBLOCK` 不存在，POSIX-only），
Docker 拉 `node:24.22.1-bookworm-slim` 被网络挡（`registry-1.docker.io` EOF）。绕过容器直接跑环境服务：

```powershell
cd D:\lovable-research\REA-AGENT\env-foundry\envs\foundry-app
$env:MCP_PORT="18765"; npx -y rea-agents@6.8.0 environment-serve manifest.json --evidence evidence.json
# 另开一个窗口：POST http://127.0.0.1:18765/mcp（streamable HTTP，需 Mcp-Session-Id）
```

实测 MCP 服务返回 `serverInfo.name = "127-0-0-1-3100"`（按录制来源命名）、`protocolVersion 2025-06-18`、
5 个工具（`get_preview_prj_...`、`get_preview_prj_..._2`、…），`tools/call` 返回录制内容并附 provenance：

```json
{"status":200,"content_type":"text/html; charset=utf-8","body":"<!doctype html>…",
 "replay":{"record_ordinal":7,"exact_match":true,"recorded_path":"/api/preview/prj_6e04481c5136",
           "recorded_query":"?v=0","evidence_id":"ev_fa4543…"},
 "state":{"source":"recording","reason":"body-unusable"}}
```

即：**AgentEnv 环境包可独立服务**，读请求按录制精确回放并声明来源；写入类工具因录制未确认而未被服务。

## 2. REA 的能力边界（实测，不是宣传语）

- **录制的是浏览器可见事实**：URL/DOM/accessibility/截图/console/page-errors/network（可选 body 与 header 值）。
  它不读服务器源码、不读内存、不注入 token。
- **环境是"录制的 replay + 状态投影"**，不是可运行的应用副本。读工具优先从投影状态回答，否则回放录制；
  写工具只有在"后续读确认了效果"时才被服务。
- **捕获预算硬限制**：默认 1024 网络事务、64 KiB/事务 body、1 MiB 保留 header 值、16 MiB 事件。Lovable 编辑器
  一次加载就超了事务预算 → `completeness.status = incomplete`、`missing_sections = ["events"]`。
- **connect 模式要求 loopback 显式端口 + target_id**，且默认 `service_workers: "block"`；现代 SPA 已注册
  service worker 时会直接 `execution_failure`，必须显式 `"allow"`。
- **权限继承**：connect 到已登录 Chrome 即带着该登录态录制；所以录制产物里会出现 `authorization` 头名与
  `__lovable_receipt` 一类票据。REA 自己只记录**头名**，不记录头值，除非显式请求 `header_values`。

## 3. Lovable 编辑器的录制里读到的结构（VERIFIED，`rea-capture/capture-lovable.json`）

一次"打开项目 → 切到 Files"的录制里出现的关键调用（均为 `api.lovable.dev`）：

- `GET /user/workspaces`、`GET /user/organizations`、`GET /user/project-invitations`
- `GET /projects/{id}` 系：`/workspace`、`/drafts`、`/artifacts`、`/sandbox/url`、`/publish-approval?visibility=public`、
  `/security/hvt-status`、`/cloud/config`
- `GET /workspaces/{ws}/projects/{id}/published-access`、`/gitsync`
- `POST /projects/{id}/sandbox-editor/lovable.editor.v1.EditorService/Open` → **400**（Connect/gRPC 服务，
  说明"打开沙箱编辑器"是独立 RPC，且当前额度/状态下被拒）
- 请求头：`authorization`、`x-browser-session-id`、`x-client-git-sha`、`x-lov-platform`、`x-lovable-read-after`、
  `connect-protocol-version` → 协议是 **REST + Connect(protobuf) 混用**
- 页面标记 `[perf] measure editor:preview:nav-to-visible: 8056.7ms`：编辑器把"预览可见"当性能指标上报

这些与我此前 RE-003（预览架构）、RE-001（Agent 执行）报告里的结论一致，这里是**独立通道（REA 录制）复现**。

## 4. 复刻蓝图：把 Lovable 的分层映射到 Foundry

| Lovable 层 | 证据 | Foundry 现状 | 下一步 |
| --- | --- | --- | --- |
| 工作台外壳（rail/chat/preview 三栏） | 编辑器 DOM、`editor-panel-resize-handle` | 已实现（248px rail + chat + preview） | 加 Monaco 代码 tab、面板拖拽 |
| 预览域（独立 origin + 票据） | `id-preview--<id>.lovable.app/?__lovable_receipt=…` | `/api/preview/<id>/?v=` 同源 iframe | 换独立端口/子域 + 短时票据 |
| 构建（服务端，产物化） | 无 `@vite/client`、hash 产物、`x-deployment-id` | esbuild 产物化（47–66ms） | 加错误面板与失败重试 |
| Agent 回合（SSE 事件流） | `text/event-stream` + `X-Browser-Session-ID` + 事件序列 | 已实现（status/plan/tool_call/…/done） | 接 DeepSeek 真实工具调用 |
| 工具执行 | `project_edit` / `run_build` / 子代理 | 5 个工具（list/read/write/delete/run_build） | 加 `apply_patch`、命令白名单 |
| 版本与回滚 | `revert_edit_started`、版本=提交 | git commit + `Revert` 按钮 | 加"回到此版本"预览比对 |
| 沙箱隔离 | 独立 Linux 环境、只读文件系统投影 | 磁盘隔离目录 + 路径越界检查 | 容器化 + 资源配额 |
| 计费/额度 | credits、`Build/Run` 分类 | 无 | 用量表 + 配额 |

## 5. 为什么用 CLI 而不是 MCP

`rea doctor` 显示 `registration:dsh` 已经是 `aligned`（配置写进了 `C:\Users\29644\.dsh\cordis.patch.yml`），
但**本会话的 MCP 客户端还没有加载该 server**，所以 `capture_browser_scenario` 等工具在会话里不可见。
重启 DSH 后即可在会话内直接调用 MCP 版（同样的输入 JSON）。CLI 与 MCP 共用同一实现，产出的 Evidence 等价。

## 6. 复现命令

```powershell
# 1) 录制（自家沙箱，launch 模式，headless）
npx -y rea-agents@6.8.0 capture-browser-scenario rea-capture\foundry-env.json --json |
  Out-File rea-capture\capture-foundry.json -Encoding utf8
# 2) 生成环境（先去掉 PowerShell 写入的 BOM）
node tools\evidence_summary.mjs rea-capture\capture-foundry.json --strip
npx -y rea-agents@6.8.0 environment-build rea-capture\capture-foundry.clean.json `
  D:\lovable-research\REA-AGENT\env-foundry --name foundry-app --json
# 3) 运行（需 AgentEnv framework + Docker）
agent-env run D:\lovable-research\REA-AGENT\env-foundry
```

## 7. 已知限制

1. Lovable 编辑器的录制是**只读快照**：没有 Agent 回合、没有写操作，因此生成的环境只有读工具。
   要拿到写工具，需要一次真实的 agent 回合录制（会消耗 credits，需用户授权）。
2. 捕获事务预算（1024）不足以覆盖编辑器全量加载，`events` 段被截断；要完整需要分层录制（按 view 分段）。
3. 产物中含有账号相关的 URL/头名，**不要直接公开**；如需分享，先按 `docs` 的 secret 声明重录。
4. AgentEnv 的 `agent-env run` 需要 Docker 镜像与 Python 3.12（本机是 3.14，若失败需建 3.12 venv）。
