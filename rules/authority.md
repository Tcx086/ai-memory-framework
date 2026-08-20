# Memory Authority

## Purpose

This document defines the priority of different information sources. When conflicts happen, higher authority sources override lower authority sources.

## Authority Levels

### Level 0 — User Instruction（用户当前指令）

Highest priority. The user's current explicit instruction overrides everything.

Examples:
- User explicitly changes a decision
- User overrides previous architecture
- "Change database from SQLite to PostgreSQL" → immediately overrides previous decisions

### Level 1 — Project Memory（项目记忆）

Source: Project docs — `STATUS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, `BUGS.md`, `PROJECT.md`

Layer: Project Memory (`project/` + per-project docs)

Purpose: Current verified project knowledge.

Contains:
- Current architecture
- Confirmed bugs
- Accepted decisions
- Verified project state

### Level 2 — Personal Memory + Agent Rules（个人记忆 + Agent规则）

Source: `personal/universal-memory.md`, `rules/conventions.md`

Layer: Personal Memory (`personal/`) + Agent Rules (`rules/`)

Purpose: User preferences and cross-project rules.

Contains:
- User info and preferences
- Coding style
- Workflow conventions
- Cross-project rules

### Level 3 — Verified Experience（验证经验）

Source: TDAI, experiment logs, test results

Purpose: Historical evidence. Must be verified before becoming authoritative.

Contains:
- Past attempts and outcomes
- Extracted lessons (unverified)
- Experimental results

### Level 4 — Agent Memory（Agent 自身记忆）

Source: ChatGPT memory, Codex memory, Claude memory

Purpose: Helpful context only. Cannot override project documents.

Contains:
- Agent-specific context
- Conversation history
- Unverified recollections

### Level 5 — Raw History（原始历史）

Source: Old conversations, logs

Lowest priority. Raw unprocessed historical data.

## Conflict Handling

When two sources disagree:

1. **Detect**: Identify which levels are in conflict
2. **Apply**: Higher level wins automatically
3. **Report**: Log the conflict when it involves Level 0-2
4. **Escalate**: Ask user when Level 0 conflicts with Level 1, or when conflict is ambiguous

Example:
```
PROJECT.md (Level 1):    Python 3.12
Agent Memory (Level 4):  Python 3.11

→ Conflict detected
→ Keep PROJECT.md as truth
→ Report conflict to user if relevant
```

## Rules

1. Authoritative Memory represents current project truth.
2. Experience Memory provides evidence, not truth.
3. Agent Memory provides hints, not decisions.
4. Conflicts must be reported, not silently resolved.
5. Never overwrite Level 0-2 memory without explicit user confirmation.
