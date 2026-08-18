# AI-Memory Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/hczxy05/ai-memory-framework?style=social)](https://github.com/hczxy05/ai-memory-framework)
[![GitHub issues](https://img.shields.io/github/issues/hczxy05/ai-memory-framework)](https://github.com/hczxy05/ai-memory-framework/issues)

A dual-store AI memory architecture combining **authoritative Git Markdown** with **experience memory** for long-term AI-human collaboration.

> **One line**: AI-Memory manages *what is true now*; TDAI recalls *what happened before*. Confirm the present, then reference the past.

---

## Why This Exists

AI assistants lose context between sessions. This framework solves that with two complementary stores:

1. **Authoritative Memory (Git Markdown)** — confirmed facts, rules, architecture, decisions. Human-readable, version-controlled, always the source of truth.
2. **Experience Memory (TDAI)** — automatically captured conversations, extracted lessons, scene narratives, and persona profiles. Historical evidence that may be stale.

The two stores collaborate without becoming equal authorities.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Instruction                   │
└──────────────────────────┬──────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────┐
│              Governance Memory (L1)                  │
│   AGENTS.md · memory-policy.md · conventions.md     │
└──────────────────────────┬──────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────┐
│           Authoritative Memory (L2)                  │
│   universal-memory.md · projects.md                  │
│   Project: STATUS · ARCHITECTURE · DECISIONS · BUGS  │
└──────────────────────────┬──────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────┐
│            Experience Memory (L3) — Optional         │
│   TDAI: conversations · structured memory            │
│         scene_blocks · persona                       │
└─────────────────────────────────────────────────────┘
```

**Priority**: Current Instruction > Governance > Authoritative > Experience > Raw History

---

## Repository Structure

```
ai-memory-framework/
├── AGENTS.md                    # Bootstrap rules (always load first)
├── README.md                    # This file
│
├── memory/
│   ├── memory-policy.md         # Authoritative memory management spec
│   ├── conventions.md           # Collaboration conventions
│   ├── universal-memory.md      # User profile template (fill your own)
│   ├── projects.md              # Project index template
│   └── changelog.md             # Framework changelog
│
├── templates/
│   ├── project-template.md      # STATUS / ARCHITECTURE / DECISIONS / BUGS / LESSONS
│   ├── task-template.md         # Task tracking template
│   └── report-template.md       # Task completion report template
│
├── integrations/
│   ├── openclaw-tdai-local/     # OpenClaw + local SQLite TDAI setup
│   └── codex-tdai-local/        # Codex + local SQLite TDAI adapter
│
├── workspace-example/           # Example OpenClaw workspace files
│   ├── AGENTS.md                # Workspace-level agent instructions
│   ├── MEMORY.md                # Minimal bootstrap cache
│   ├── SOUL.md                  # Persona / tone
│   ├── USER.md                  # User info template
│   └── memory-manual.md         # User-facing memory system manual
│
└── tdai-example/                # Example TDAI data structure
    ├── persona.md               # Example persona (L3)
    ├── .metadata/
    │   └── experience_contract.json
    └── scene_blocks/
        └── example-scene.md     # Example scene block (L2)
```

---

## Quick Start

### 1. Copy the Authoritative Store

```bash
git clone <this-repo> ~/ai-memory
```

Edit the files in `memory/` to match your profile:
- `universal-memory.md` — your identity, preferences, communication style
- `projects.md` — your project index
- `conventions.md` — your engineering conventions

### 2. Set Up Experience Memory (Optional)

Follow `integrations/openclaw-tdai-local/README.md` to install the TDAI plugin for OpenClaw, or `integrations/codex-tdai-local/README.md` for Codex.

### 3. Configure Your Agent

Add to your agent's workspace `AGENTS.md`:

```markdown
Read <your-ai-memory-path>/AGENTS.md first.
Load only required authoritative Markdown.
Query Experience Memory only when useful, once per task, limit 3.
Treat recall as historical evidence; Markdown wins conflicts.
```

### 4. Set Up Workspace Files

Copy `workspace-example/` files to your agent workspace and customize:
- `MEMORY.md` — minimal bootstrap context (not a source of truth)
- `USER.md` — your info
- `SOUL.md` — agent personality

---

## Core Principles

### Small Context
Only load what the current task requires. Start small, expand on demand.

### Layered Authority
Governance rules > Authoritative facts > Experience evidence. No exceptions.

### Controlled Memory
Memory updates must be stable, reusable, confirmed, and user-authorized. Never store secrets.

### Honest Uncertainty
Distinguish confirmed facts, inferences, and unknowns. State unknowns instead of guessing.

### Human Control
Ask before destructive operations, deployments, financial actions, and memory modifications.

---

## How It Works in Practice

### Session Startup
```
Agent loads AGENTS.md (bootstrap)
  → Reads minimum Authoritative Memory for the task
  → Optionally queries Experience Memory (Top-K 3)
  → Validates recall against Authoritative Memory
  → Works with confirmed facts, labels historical evidence
```

### Memory Update Flow
```
Candidate identified
  → Propose: exact content, target file, reason
  → User approves
  → Write to Authoritative Memory
  → Report: what changed, why, how verified
```

### Experience Memory Promotion
```
TDAI recall → Candidate Memory → Validation → User Authorization → Authoritative Memory
```

---

## Customization

### Adding a New Project
1. Create `STATUS.md` (and optionally `ARCHITECTURE.md`, `DECISIONS.md`, `BUGS.md`, `LESSONS.md`) inside the project repo using templates from `templates/`.
2. Add an entry to `memory/projects.md`.

### Adding Conventions
Edit `memory/conventions.md`. Follow the admission rules: stable, reusable, confirmed, user-authorized.

### Changing Governance
Edit `AGENTS.md` or `memory/memory-policy.md`. Governance changes require explicit user authorization.

---

## Compatible Platforms

- **OpenClaw** — full integration with TDAI plugin
- **Codex** — MCP adapter for local TDAI access
- **Any AI assistant** — the Git Markdown governance works standalone without TDAI

---

## License

MIT — Use this framework as a starting point for your own AI memory system.

---

## Credits

Built through iterative human-AI collaboration. The framework evolved from real engineering work across embedded systems, robotics, computer vision, and brain imaging projects.
