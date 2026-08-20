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
- "This time skip confirmation, just delete" → overrides Rules for this action only

### Level 1 — Agent Rules（Agent规则）

Source: `rules/` — `authority.md`, `memory-policy.md`, `memory-promotion.md`, `conventions.md`

Layer: Agent Rules (`rules/`)

Purpose: Governance — how agents must behave. Safety, confirmation, workflow.

Contains:
- Authority and conflict rules
- Memory loading and writing rules
- Promotion lifecycle
- Collaboration conventions

Why above Personal: Rules are governance, not preference. User preference "just fix it" cannot override rule "confirm before deleting database".

### Level 2 — Project Memory（项目记忆）

Source: Project docs — `STATUS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, `BUGS.md`, `PROJECT.md`

Layer: Project Memory (`project/` + per-project docs)

Purpose: Current verified project knowledge.

Contains:
- Current architecture
- Confirmed bugs
- Accepted decisions
- Verified project state

### Level 3 — Personal Memory（个人记忆）

Source: `personal/universal-memory.md`

Layer: Personal Memory (`personal/`)

Purpose: User preferences and background.

Contains:
- User info and preferences
- Communication style
- Technical background

Why below Project: Project facts override user preferences. If user prefers Python but project uses C, project wins.

### Level 4 — Verified Experience（验证经验）

Source: TDAI, experiment logs, test results

Purpose: Historical evidence. Must be verified before becoming authoritative.

Contains:
- Past attempts and outcomes
- Extracted lessons (unverified)
- Experimental results

### Level 5 — Agent Memory（Agent 自身记忆）

Source: ChatGPT memory, Codex memory, Claude memory

Purpose: Helpful context only. Cannot override project documents.

Contains:
- Agent-specific context
- Conversation history
- Unverified recollections

### Level 6 — Raw History（原始历史）

Source: Old conversations, logs

Lowest priority. Raw unprocessed historical data.

## Conflict Handling

When two sources disagree:

1. **Detect**: Identify which levels are in conflict
2. **Apply**: Higher level wins automatically
3. **Report**: Log the conflict when it involves Level 0-3
4. **Escalate**: Ask user when Level 0 conflicts with Level 1, or when conflict is ambiguous

Example:
```
Rules (Level 1):         Must confirm before deleting
Personal (Level 3):      User prefers fast action

→ Rules win
→ Ask user for explicit override if needed
```

Example:
```
PROJECT.md (Level 2):    Python 3.12
Agent Memory (Level 5):  Python 3.11

→ Conflict detected
→ Keep PROJECT.md as truth
→ Report conflict to user if relevant
```

## Rules

1. User Instruction overrides everything.
2. Rules govern agent behavior — preferences cannot bypass safety.
3. Project Memory is source of truth for project facts.
4. Personal Memory provides context, not authority.
5. Experience provides evidence, not truth.
6. Conflicts must be reported, not silently resolved.
7. Never overwrite Level 0-3 memory without explicit user confirmation.
