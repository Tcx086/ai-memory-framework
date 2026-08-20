# AI-Memory Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/hczxy05/ai-memory-framework?style=social)](https://github.com/hczxy05/ai-memory-framework)
[![GitHub issues](https://img.shields.io/github/issues/hczxy05/ai-memory-framework)](https://github.com/hczxy05/ai-memory-framework/issues)

English | **[中文](README.zh-CN.md)**

A dual-store memory architecture for AI assistants: **authoritative Git Markdown** + **optional experience memory (TDAI)**.

> AI-Memory manages "what is true right now." Experience memory helps recall "what happened before." Confirm the present, then consult the past.

## Quick Start (30 seconds)

```bash
git clone https://github.com/hczxy05/ai-memory-framework.git ~/ai-memory
```

1. Fill in `memory/universal-memory.md` with stable user info and preferences.
2. Add your projects to `memory/projects.md`; adjust `memory/conventions.md` as needed.
3. Tell your Agent to read `~/ai-memory/AGENTS.md` at the start of every task.

That's it — Git Markdown memory works standalone. TDAI experience memory is an optional enhancement.

## The Problem

AI assistants lose context between sessions. Worse, they can mistake stale conversations for current facts. This framework separates two fundamentally different kinds of information:

- **Authoritative memory** — confirmed rules, facts, status, architecture, and decisions. Human-readable, Git-tracked.
- **Experience memory** — conversations, attempts, extracted lessons, and profiles. For historical reference only; may be outdated or wrong.

Both stores collaborate, but they are not equal.

## Architecture

```text
Incoming user instruction
    ↓
Governance: AGENTS.md · memory-policy.md · conventions.md
    ↓
Authoritative memory: user info · project status · architecture · decisions · bugs · lessons
    ↓
Experience memory (optional): conversations · attempts · scenarios · profiles
```

**Priority**: current instruction > governance > authoritative > experience > raw history

### Authority Levels

When multiple agents produce conflicting information, the authority system determines what to trust:

| Level | Source | Rule |
|---|---|---|
| 0 | User Instruction | Highest — overrides everything |
| 1 | Project Docs (`STATUS.md`, `ARCHITECTURE.md`, `DECISIONS.md`) | Current verified truth |
| 2 | Global Memory (`universal-memory.md`, `conventions.md`) | Cross-project rules |
| 3 | Verified Experience (TDAI, test results) | Evidence only, verify first |
| 4 | Agent Memory (ChatGPT/Codex/Claude) | Hints, not decisions |
| 5 | Raw History | Lowest priority |

Conflicts are reported, not silently resolved. See `memory/authority.md` for full rules.

### Memory Promotion

Experience cannot directly write to authoritative memory. Information must pass through a lifecycle:

```text
Observation → Experience → Candidate → Verified → Authoritative
```

Promotion requires all five: **Stable**, **Reusable**, **Verified**, **Relevant**, **Authorized**.

Example (STM32 PWM bug):

| Stage | Content |
|---|---|
| Observation | "TIM2 has no PWM output after restart" |
| Experience | "Suspect HAL_TIM_PWM_Stop causes the issue" |
| Candidate | "Stop clears CCER register, restart doesn't restore it" |
| Verified | "Modified to use CCER control — PWM works correctly" |
| Authoritative | Written to `BUGS.md` as confirmed root cause |

See `governance/memory-promotion.md` for full rules.

## Repository Layout

```text
ai-memory-framework/
├── AGENTS.md                    # Behaviour summary loaded at every task
├── governance/
│   └── memory-promotion.md    # Memory states and promotion lifecycle
├── memory/
│   ├── authority.md             # Authority level definitions (P0-P5)
│   ├── memory-policy.md         # Full authoritative specification
│   ├── conventions.md           # Stable collaboration conventions
│   ├── universal-memory.md      # User info template
│   ├── projects.md              # Project index template
│   └── changelog.md
├── templates/
│   ├── project-template.md
│   ├── task-template.md
│   └── report-template.md
├── integrations/
│   ├── openclaw-tdai-local/
│   └── codex-tdai-local/
├── workspace-example/           # OpenClaw workspace example
│   ├── AGENTS.md
│   ├── IDENTITY.md
│   ├── SOUL.md
│   ├── USER.md
│   ├── TOOLS.md
│   ├── MEMORY.md
│   └── memory-manual.md         # One-page quick reference
└── examples/tdai/               # Provider-generated content examples
    ├── persona.md
    ├── .metadata/experience_contract.json
    └── scene_blocks/example-scene.md
```

## How It Works

### Building Context

```text
Load AGENTS.md
  → Read only the authoritative memory needed for this task
  → Optionally run one round of experience retrieval (1 search tool, max 3 results)
  → Show each item with source, date, scope, and conflict notes
  → Let the user decide whether to continue
  → Distinguish confirmed facts, historical evidence, inferences, and unknowns
```

### Updating Memory

```text
Candidate content → validate → propose specific changes and target file → user authorizes → write to authoritative memory
```

Experience memory cannot directly modify governance or authoritative files.

## Configuring Experience Memory (Optional)

- [OpenClaw + local TDAI](integrations/openclaw-tdai-local/README.md)
- [Codex + local TDAI](integrations/codex-tdai-local/README.md)

No experience memory provider available? Just keep using Git Markdown — it works fine on its own.

## Configuring Your Agent Workspace

Add this bootstrap rule to your workspace `AGENTS.md`:

```markdown
Read <ai-memory-path>/AGENTS.md at the start of every task, and follow its loading, retrieval, and writing rules.
```

OpenClaw users can copy `workspace-example/` and fill in identity, user, and tool details. `USER.md` and `MEMORY.md` are workspace context only; stable facts still live in the AI-Memory file responsible for that information.

## Core Principles

| Principle | Meaning |
|---|---|
| Minimal context | Load only what the task needs |
| Layered authority | Historical evidence cannot override current facts |
| Controlled writes | Long-term memory must be confirmed, stable, reusable, and user-authorized |
| Honest uncertainty | Clearly distinguish facts, inferences, and unknowns |
| Human control | High-risk, destructive, or external actions require confirmation first |

## Adding Projects

1. Use `templates/project-template.md` to create a `STATUS.md` or modular `PROJECT.md` in your project repo.
2. For larger projects, add `ARCHITECTURE.md`, `DECISIONS.md`, `BUGS.md`, `LESSONS.md` as needed.
3. Register the project path in `memory/projects.md`.

## Compatible Platforms

- **OpenClaw** — supports local TDAI integration.
- **Codex** — access experience memory via local MCP adapter.
- **Other AI assistants** — any tool that reads Markdown can use the authoritative memory layer.

## Security

- Never store passwords, API keys, tokens, or private keys in memory.
- Never commit runtime databases, raw conversations, or full tool configurations to this repo.
- Deployment, destructive operations, financial actions, and physical control require explicit authorization first.

## License

[MIT](LICENSE)

## Credits

Built through iterative human-AI collaboration across real engineering workflows.
