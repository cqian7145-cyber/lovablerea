# 03 · UI 设计语言与组件规范（可用于原创产品的 Design System）

> 证据等级：**VERIFIED** = 从真实 DOM/CSS 计算样式或截图测得；**INFERRED** = 由证据推断；**UNKNOWN** = 未取到。
> 原始证据：`evidence/raw/design_tokens.json`（226 个 CSS 变量）、`dash.json`、`editor_struct.json`、截图 `after-login.png`、`editor_struct-viewport.png`、`step_more2.jpg`、`flow_*.jpg`、`page-login.png`。
> 注意：**不复制** Lovable 的商标、插画、渐变海报与专有文案。下文给出的是可独立实现的"同构设计语言"，品牌层需替换。

---

## 0. 三张皮（这是产品结构的第一性事实）

| 面 | 主题 | 底色 | 布局 | 证据 |
|---|---|---|---|---|
| 营销站 | 浅色 | `oklch(96.99% 0 107)` ≈ `#F5F5F4` | 居中容器 + 大留白 + 超大标题 | 主页 body 计算样式 |
| 登录页 | 深色 | `#0B0B0C` 级近黑 + 渐变插画面板（右 50%） | 左右 50/50 | `page-login.png` |
| 工作台/编辑器 | 深色 | 近黑 + **动态渐变画布** | 全宽 shell + 可拖拽 rail + 分栏面板 | `after-login.png` |

> 设计要点：同一个产品在三张皮之间**只换主题令牌与密度，不换组件 API**。登录页是营销站与工作台之间的"过渡皮"（深色 + 品牌渐变），这是很值得抄的结构决策。

---

## 1. 色彩系统

### 1.1 令牌命名（VERIFIED，实测 226 个变量）

命名规则：`--{用途}-{角色}`，用途 ∈ `bg | fg | border | glow | code-syntax`，角色 ∈ `base | primary | secondary | tertiary | quaternary | accent | special | positive | attention | destructive | highlight | focus`。

核心值（oklch，`/α` 为透明度）：

| 令牌 | 值 | 语义 |
|---|---|---|
| `--bg-base` | `oklch(96.99% 0 107)` | 页面底 |
| `--bg-primary` | `oklch(98.51% 0 107)` | 卡片/浮层底 |
| `--bg-accent` | `oklch(52.43% .2396 264.41)` | 主操作（蓝紫） |
| `--bg-special` | `oklch(58.99% .2523 294.88)` | 品牌紫（Upgrade/Publish 按钮） |
| `--bg-positive` | `oklch(54.42% .1689 138.23)` | 成功 |
| `--bg-attention` | `oklch(58.01% .1819 40.04)` | 警告（琥珀） |
| `--bg-destructive` | `oklch(58.53% .2203 26.56)` | 危险 |
| `--bg-highlight` | `oklch(59.06% .2244 359.16)` | 高亮（洋红） |
| `--fg-primary` | `oklch(10% 0 0)` | 主文字 |
| `--fg-secondary` | `oklch(30% 0 0)` | 次要文字 |
| `--fg-tertiary` | `oklch(50% 0 0)` | 辅助文字/占位 |
| `--fg-quaternary` | `oklch(69% 0 0)` | 禁用/最弱 |
| `--border-base` | `oklch(83.6% 0 107 / .4)` | 默认描边（40% 透明） |
| `--border-focus` | `var(--border-accent)` | 聚焦环 |
| `--border-default` | `1px` | 默认线宽 |

深色面上的推导（INFERRED，由截图取色 + 语义反推）：`bg-base ≈ #0C0C0D`、`bg-primary ≈ #161617`、`bg-secondary ≈ #1E1E20`、`border ≈ rgba(255,255,255,.08~.12)`、`fg-primary ≈ #F5F5F5`、`fg-tertiary ≈ #8A8A8F`。

### 1.2 用色规则（从界面反推）

1. **中性色占 90%**：界面几乎只有黑/白/灰，彩色只用于"动作"和"状态"。
2. **紫=付费/升级**（Upgrade、Publish、Add credits），**蓝=常规主操作**（Send、Continue），**绿=已发布/成功**，**琥珀=警告/额度**。
3. **描边而非阴影**做层级：卡片用 1px `border` + 极浅 `bg-primary`，只有浮层才加阴影。
4. 渐变是**产品叙事层**（hero、登录右屏、dashboard 背景），不进入组件层。

---

## 2. 字体与排版（VERIFIED）

| 用途 | 字体 | 字号/行高 | 字重 | 字距 |
|---|---|---|---|---|
| 正文/UI | `"Camera Plain Variable", ui-sans-serif, system-ui` | 16px / 24px | 400 | 0 |
| 段落 | 同上 | 18px / 24px | 400 | 0 |
| 按钮 | 同上 | 14px / 21px | 500 | 0 |
| H2（营销） | 同上 | 48px / 52.8px | 600 | **-1.92px（-0.04em）** |
| 代码 | `"Roboto Mono Variable", ui-monospace` | 13–14px / 20px | 400 | 0 |
| 微型标签 | 同上 | 11–12px / 16px | 500 | +0.01em |

- 可变字体（`Variable`）用于连续字重；中文回退到系统字体栈（**生成产物**里由用户 prompt 决定，Lovable 自己的界面主要英文）。
- 大标题字距收紧到 -0.04em 是"高密度现代 SaaS"的典型手法，值得保留。

---

## 3. 间距、圆角、栅格

| 维度 | 取值 | 证据 |
|---|---|---|
| 基准单位 | 4px | 实测 padding/gap 均为 4 的倍数 |
| 常用间距 | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 | 同上 |
| 圆角 | 6（小徽标）/ 8（按钮、输入）/ 12（卡片）/ 16–20（composer）/ 999（胶囊） | 按钮 8px 实测；其余截图量取（INFERRED） |
| 侧栏宽 | 256px（dashboard）/ 可拖拽（`rail-edge-drag-handle`） | 实测 rect |
| 聊天列 | 429px（编辑器，可拖拽 `editor-panel-resize-handle`） | 实测 rect |
| 预览面板 | 1002px @1440 视口 | 实测 rect |
| 顶栏高 | 48px | 实测 rect |
| 营销容器 | 桌面约 1200–1280px 内容宽，左右留白 ≥ 80px | 截图量取（INFERRED） |

**栅格策略**：营销站用 12 列居中容器；产品区**不用栅格**，用「固定 rail + 可拖拽分栏 + 弹性主区」，分栏比例由用户拖动并持久化（`editor-panel-resize-handle` + localStorage）。

---

## 4. 组件规范

### 4.1 按钮

| 变体 | 样式 | 用途 |
|---|---|---|
| Primary | `bg-special/紫` 实心、白字、radius 8、h 36 | Publish、Upgrade、Add credits |
| Accent | `bg-accent/蓝` 实心 | 发送、Continue |
| Secondary | 透明底 + `border-base` 1px | Share、Cancel、工具条 |
| Ghost | 无底无边，hover 出现 `bg-secondary` | 图标按钮、侧栏项 |
| Pill | `radius:999`、h 32、`border` + 图标 | 模式选择（Build⌄）、顶部横幅 |
| Destructive | `bg-destructive` | 删除项目/回收站 |

- 尺寸：`sm 28 / md 32 / lg 36 / xl 44`；图标按钮 32×32。
- 状态：hover 提升 4–6% 亮度；active 下沉 1px；focus 用 `2px var(--border-focus)` 外环；disabled 用 `fg-quaternary` + 40% 不透明。

### 4.2 Composer（本产品的"心脏"组件）

```
┌──────────────────────────────────────────────────────────────┐
│  富文本编辑区（contenteditable, 16/24, min-h 56, max-h ~40vh）  │
│  附件卡：图标 + 文件名 + Text · N lines + [Show more]           │
│ ─────────────────────────────────────────────────────────── │
│  [+]  [Build ⌄]  ···  [🎤]  [↑]                                │
└──────────────────────────────────────────────────────────────┘
  外层：radius 16–20、1px 描边、focus 时 glow halo（径向渐变 + blur）
```

- 尺寸：dashboard 583×? 居中；编辑器内为列宽 -32。
- **光晕（`composer-glow-halo`）**：focus/输入时出现柔和彩色光斑，是最强的"AI 在场感"信号，成本极低（CSS radial-gradient + blur），值得复用。
- 提交键随内容启用；空态 placeholder 是"任务示例"而非"输入提示"。

### 4.3 侧栏（rail）

- 结构：`logo → workspace 切换器 → 主操作(New) → 搜索 → 分组(Projects/Connectors/Chats) → 项目列表 → 底部(Upgrade/Referral/账户)`。
- 项目条目：16px 图标 + 名称 + 悬浮 `⋯`（actions）；选中态用 `bg-secondary` + 左侧 2px 指示条（INFERRED）。
- 可折叠为 icon rail，`rail-peek-logo` 在悬停时浮出 logo（编辑器内）。

### 4.4 卡片

- 项目卡：封面 16:10（模板截图）+ 标题 + `Edited x ago` + `Published` 绿点；hover 上浮 2px + 描边变亮。
- 计费卡（`Add credits to keep going`）：标题 14/600 + 说明 13/二级 + 两个按钮（`Finish up` ghost、`Add credits` primary）。
- 回合状态卡（`Paused`）：单行 + 右侧 chevron，点击展开详情。

### 4.5 浮层

| 类型 | 规格 |
|---|---|
| Dialog | 宽 480–560、radius 12、`bg-primary`、1px border、遮罩 `rgba(0,0,0,.5)` + 4px blur |
| Dropdown/Menu | 宽 200–260、item h 32、图标 16、右侧快捷键；`shadow-lg` + border |
| Tooltip | 深底浅字、12px/16、radius 6、延迟 300ms、单行优先 |
| Toast | 右下角、宽 320、自动 4s、可撤销操作 |
| 全屏浮层（More） | 覆盖主区（不含 rail）、左侧 220px 二级导航 + 右侧内容、右上关闭 |

### 4.6 图标

- 线性风格、1.5px 描边、16/20 两档；语义固定（`+` 新建、`🔍` 搜索、`🕘` 历史、`⇤` 折叠、`⤢` 新标签、`🎤` 语音、`↑` 发送）。
- 实际图标库 **UNKNOWN**（未取到 SVG source 归属；`INFERRED`：lucide 体系的视觉特征）。

---

## 5. 状态与反馈

| 状态 | 表现 | 备注 |
|---|---|---|
| Loading（首屏） | 骨架屏（`editor-fallback-*`、`mobile-chat-skeleton`、`glasshouse-*-pending`）——**结构与真实布局同构**，不是灰色方块堆 | 值得抄：骨架即布局 |
| Streaming | 活动卡逐条插入 + 计时器（`Thought for 12s`）+ 打字光标 | — |
| 长任务 | 顶栏 `Working for 3m 12s`、`Credits used 4.2` | 让等待可计量 |
| 空态 | 明确动作（`No files or collections` → `Upload files` / `Create collection`） | 空态即引导 |
| 阻塞态 | 计费卡（额度耗尽）+ 明确恢复时间（`5 free credits arrive in 6 hours`） | 可预期的等待 > 模糊报错 |
| 错误 | 活动卡红色 + `Retry`；全局 `Something went wrong` + 复制 request id | INFERRED |
| 成功 | 轻量 toast / 徽标变化（`Published`） | 不用大弹窗 |

---

## 6. 动效与过渡

| 场景 | 时长/曲线 | 说明 |
|---|---|---|
| 面板/浮层进出 | 150–200ms `cubic-bezier(.2,.8,.2,1)` | 位移 8px + 淡入 |
| 侧栏折叠 | 200ms | 宽度过渡，内容 fade |
| 视图切换（Preview/Files/Code/More） | 120ms 交叉淡入 | 不滑动，避免方向歧义 |
| composer 光晕 | 输入时 300ms 渐显 | 呼吸感，不循环闪烁 |
| 后台渐变 | 极慢（>20s）色彩漂移 | 营造"活着"的氛围 |
| 骨架 → 内容 | 150ms 淡出骨架 | 高度保持，避免跳动 |

- 必须尊重 `prefers-reduced-motion`（关闭漂移与光晕动画）。
- 禁止：弹窗缩放弹跳、列表逐项错峰入场（在产品区会拖慢感知）。

---

## 7. 响应式

| 断点 | 布局 |
|---|---|
| ≥1280 | dashboard 256 rail + 主区；编辑器三栏（rail 折叠 / 聊天 429 / 预览弹性） |
| 1024–1279 | rail 收为 icon；聊天列 360；预览可切 tab |
| 768–1023 | 单栏 + 底部 tab（Chat / Preview）；preview 全屏化 |
| <768（390 基准） | 移动模式：底部 composer 固定；预览全屏 + 返回；`dashboard-mobile-back-home` 出现；侧栏变抽屉 |

- 移动端编辑器：`mobile-chat-skeleton` 说明移动端聊天是独立渲染路径（不是简单缩放）。
- 触摸目标 ≥44px；composer 在移动端贴底 + 安全区 inset。

---

## 8. 可直接落地的令牌表（原创实现建议）

```css
:root {
  /* 亮色面（营销/文档） */
  --bg-base:#F5F5F4; --bg-primary:#FCFCFB; --bg-secondary:#EFEFEE;
  --fg-primary:#0A0A0A; --fg-secondary:#3D3D3D; --fg-tertiary:#77777A; --fg-quaternary:#B0B0B2;
  --border-base:rgba(10,10,10,.12); --border-strong:rgba(10,10,10,.20);
  --accent:#3B5BDB; --special:#7C3AED; --positive:#128A4B; --attention:#B45309; --destructive:#C0392B;
  --radius-sm:6px; --radius-md:8px; --radius-lg:12px; --radius-xl:18px; --radius-full:999px;
  --space:4px;
  --font-sans:"Inter Variable",ui-sans-serif,system-ui,"Noto Sans SC",sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;
  --shadow-1:0 1px 2px rgba(0,0,0,.06); --shadow-2:0 8px 24px rgba(0,0,0,.12);
}
.dark {
  --bg-base:#0C0C0D; --bg-primary:#161617; --bg-secondary:#1E1E20;
  --fg-primary:#F5F5F5; --fg-secondary:#C9C9CC; --fg-tertiary:#8A8A8F; --fg-quaternary:#5C5C61;
  --border-base:rgba(255,255,255,.10); --border-strong:rgba(255,255,255,.18);
  --accent:#6E8BFF; --special:#A78BFA; --positive:#34D399; --attention:#FBBF24; --destructive:#F87171;
}
```

> 与 Lovable 的差异说明：Lovable 用 oklch + 226 个语义变量 + `--bg-*` 前缀；上面给的是**等价能力的最小集合**，命名与色值均为原创换算，不含其品牌资产。

---

## 9. 设计系统检查清单（交付给前端）

- [ ] 三主题（light / dark-marketing / dark-app）共用组件 API，仅切 `data-theme`
- [ ] 令牌只放语义层（`--fg-tertiary`），禁止组件里写死 hex
- [ ] composer 是独立组件，dashboard 与 editor 共用
- [ ] 骨架屏与真实布局同构
- [ ] 所有等待态都可计量（时长/credits/步骤）
- [ ] 空态必须给"下一步动作"
- [ ] 移动端底部 composer + 安全区
- [ ] `prefers-reduced-motion` 全覆盖
- [ ] 焦点环 2px、对比度 ≥4.5:1（正文）/3:1（大字）
