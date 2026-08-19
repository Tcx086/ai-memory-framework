# AI-Memory Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/hczxy05/ai-memory-framework?style=social)](https://github.com/hczxy05/ai-memory-framework)
[![GitHub issues](https://img.shields.io/github/issues/hczxy05/ai-memory-framework)](https://github.com/hczxy05/ai-memory-framework/issues)

双库 AI 记忆架构：**Git Markdown 权威记忆** + **经验记忆**，实现长期 AI-人类协作。

> **一句话**：AI-Memory 管理*现在的事实*；TDAI 回忆*过去发生过什么*。先确认当下，再参考历史。

---

## 为什么做这个

AI 助手在会话之间丢失上下文。本框架用两个互补的存储解决这个问题：

1. **权威记忆（Git Markdown）** — 已确认的事实、规则、架构、决策。人类可读、版本控制，永远是真相源。
2. **经验记忆（TDAI）** — 自动捕获的对话、提取的教训、场景叙事、用户画像。历史证据，可能过时。

两个存储协同工作，但不等权。

---

## 架构

```
┌─────────────────────────────────────────────────────┐
│                    用户指令                          │
└──────────────────────────┬──────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────┐
│              治理记忆 (L1)                           │
│   AGENTS.md · memory-policy.md · conventions.md     │
└──────────────────────────┬──────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────┐
│              权威记忆 (L2)                           │
│   universal-memory.md · projects.md                  │
│   项目: STATUS · ARCHITECTURE · DECISIONS · BUGS     │
└──────────────────────────┬──────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────┐
│            经验记忆 (L3) — 可选                      │
│   TDAI: 对话 · 结构化记忆                            │
│         场景块 · 用户画像                            │
└─────────────────────────────────────────────────────┘
```

**优先级**：当前指令 > 治理 > 权威 > 经验 > 原始历史

---

## 仓库结构

```
ai-memory-framework/
├── AGENTS.md                    # 引导规则（每次必须加载）
├── README.md                    # 本文件
│
├── memory/
│   ├── memory-policy.md         # 权威记忆管理规范
│   ├── conventions.md           # 协作约定
│   ├── universal-memory.md      # 用户画像模板（自行填写）
│   ├── projects.md              # 项目索引模板
│   └── changelog.md             # 框架变更日志
│
├── templates/
│   ├── project-template.md      # STATUS / ARCHITECTURE / DECISIONS / BUGS / LESSONS
│   ├── task-template.md         # 任务跟踪模板
│   └── report-template.md       # 任务完成报告模板
│
├── integrations/
│   ├── openclaw-tdai-local/     # OpenClaw + 本地 SQLite TDAI 配置
│   └── codex-tdai-local/        # Codex + 本地 SQLite TDAI 适配器
│
├── workspace-example/           # OpenClaw 工作区示例文件
│   ├── AGENTS.md                # 工作区级 agent 指令
│   ├── MEMORY.md                # 最小引导缓存
│   ├── SOUL.md                  # 人格 / 语气
│   ├── USER.md                  # 用户信息模板
│   └── memory-manual.md         # 面向用户的记忆系统手册
│
└── tdai-example/                # TDAI 数据结构示例
    ├── persona.md               # 用户画像示例 (L3)
    ├── .metadata/
    │   └── experience_contract.json
    └── scene_blocks/
        └── example-scene.md     # 场景块示例 (L2)
```

---

## 快速开始

### 1. 克隆权威记忆库

```bash
git clone <this-repo> ~/ai-memory
```

编辑 `memory/` 下的文件以匹配你的信息：
- `universal-memory.md` — 身份、偏好、沟通风格
- `projects.md` — 项目索引
- `conventions.md` — 工程约定

### 2. 配置经验记忆（可选）

参考 `integrations/openclaw-tdai-local/README.md` 为 OpenClaw 安装 TDAI 插件，或参考 `integrations/codex-tdai-local/README.md` 为 Codex 配置。

### 3. 配置你的 Agent

在 agent 工作区的 `AGENTS.md` 中添加：

```markdown
先读 <你的 ai-memory 路径>/AGENTS.md。
只加载当前任务需要的权威 Markdown。
仅在有帮助时查询经验记忆，每次任务最多一次，最多 3 条。
召回内容视为历史证据；冲突时以 Markdown 为准。
```

### 4. 设置工作区文件

将 `workspace-example/` 下的文件复制到 agent 工作区并自定义：
- `MEMORY.md` — 最小引导上下文（不是真相源）
- `USER.md` — 你的信息
- `SOUL.md` — agent 人格

---

## 核心原则

### 小上下文
只加载当前任务需要的内容。从小开始，按需扩展。

### 分层权威
治理规则 > 权威事实 > 经验证据。没有例外。

### 受控记忆
记忆更新必须稳定、可复用、已确认、经用户授权。永远不存密钥。

### 诚实不确定
区分已确认事实、推断和未知。遇到未知就说未知，不猜。

### 人类控制
破坏性操作、部署、财务行为和记忆修改前必须询问。

---

## 实际运作

### 会话启动
```
Agent 加载 AGENTS.md（引导）
  → 读取当前任务所需的最小权威记忆
  → 可选查询经验记忆（Top-K 3）
  → 将召回内容与权威记忆交叉验证
  → 以已确认事实工作，标记历史证据
```

### 记忆更新流程
```
发现候选内容
  → 提议：具体内容、目标文件、理由
  → 用户批准
  → 写入权威记忆
  → 报告：改了什么、为什么改、如何验证
```

### 经验记忆晋升
```
TDAI 召回 → 候选记忆 → 验证 → 用户授权 → 权威记忆
```

---

## 自定义

### 添加新项目
1. 在项目仓库中使用 `templates/` 下的模板创建 `STATUS.md`（可选 `ARCHITECTURE.md`、`DECISIONS.md`、`BUGS.md`、`LESSONS.md`）。
2. 在 `memory/projects.md` 中添加条目。

### 添加约定
编辑 `memory/conventions.md`。遵循准入规则：稳定、可复用、已确认、经用户授权。

### 修改治理规则
编辑 `AGENTS.md` 或 `memory/memory-policy.md`。治理变更需要用户明确授权。

---

## 兼容平台

- **OpenClaw** — 通过 TDAI 插件完整集成
- **Codex** — MCP 适配器接入本地 TDAI
- **任意 AI 助手** — Git Markdown 治理可独立使用，无需 TDAI

---

## 许可证

MIT — 将此框架作为你自己的 AI 记忆系统的起点。

---

## 致谢

通过迭代的人机协作构建。框架源自嵌入式系统、机器人、计算机视觉和脑成像项目的真实工程实践。
