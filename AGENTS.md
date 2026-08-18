# AGENTS.md

## Purpose

This repository contains long-term AI collaboration memory and workflow rules.

The goal is to provide stable context for AI assistants working with the user.

## Memory Architecture

AI-Memory uses three layers:

- Layer 1 — Governance Memory: AGENTS.md, memory/memory-policy.md, and memory/conventions.md define behavior, permissions, loading, and conflict rules.
- Layer 2 — Authoritative Memory: confirmed Git Markdown records user facts, project facts, current state, known issues, architecture, and decisions within each file's defined responsibility.
- Layer 3 — Experience Memory: an optional external recall layer for conversations, attempts, historical experience, and automatically extracted candidates.

Git Markdown remains the source of truth for governance and current authoritative facts. Experience Memory is historical evidence, not current fact. It cannot override or directly modify Governance or Authoritative Memory.

TencentDB Agent Memory (TDAI) is the first optional Experience Memory Provider. Local SQLite adapters are available for OpenClaw and Codex; other hosts continue with Git Markdown only when no provider is available.

### Controlled Collaboration Flow

The two stores collaborate without becoming equal authorities:

1. Load this repository's governance and the minimum relevant Authoritative Memory first.
2. Use Experience Memory only when historical context materially helps; retrieve one focused Top-K set with at most 3 results.
3. Validate recalled history against current authoritative files and label unresolved conflicts as uncertain.
4. Let an authorized host capture and extract Experience Memory automatically, but never treat capture as confirmation.
5. Promote a useful Experience Memory candidate only after validation and user authorization.

Automatic capture does not authorize automatic recall for every task or automatic writes to Authoritative Memory.

---

## Memory Loading Rules

Memory loading follows a tiered strategy.
Reference: memory/memory-policy.md is the authoritative source for memory management rules.

### Bootstrap

These files are loaded for every task:

- AGENTS.md

### Default

No files at this level.

### Conditional

Load only when the task requires it:

If the task involves modifying, reviewing, or resolving conflicts in memory:
- memory/memory-policy.md

If the task needs understanding user background:
- memory/universal-memory.md

If the task needs understanding collaboration conventions:
- memory/conventions.md

If the task involves a specific project:
- Read memory/projects.md only when needed to locate or identify the project.
- Read only the project documentation relevant to the current task.

### Loading Principles

- Only load information required for the current task.
- Avoid loading all memory files by default.
- Start small, expand when needed.
- Establish current facts from Authoritative Memory before consulting Experience Memory.
- Query an available Experience Memory Provider only when historical experience is useful, retrieve only a small relevant Top-K set, and validate it against Authoritative Memory.
- When uncertain, load Bootstrap first, then expand on demand.

---

## Core Behavior Rules

These rules are the always-loaded summary for every task.
memory/memory-policy.md is the authoritative source for definitions, exceptions, and update procedures.

- Do not invent missing facts or present assumptions as confirmed information.
- Distinguish confirmed facts, inferences, and unknowns.
- If information cannot be verified, explicitly say what is unknown.
- Ask the user when an unknown is blocking, materially changes the result, or requires a user decision.
- If a non-blocking assumption is necessary, state it and use the safest reasonable option.
- A one-time request or repeated observation is not automatically a long-term user preference.
- When information may be useful as memory, propose an update; do not write it automatically.
- Treat recalled Experience Memory as potentially stale or incorrect. If its relationship to current Authoritative Memory cannot be determined, mark it uncertain.
- Local integration may expose `tdai_memory_search`, `tdai_conversation_search`, and `tdai_read_cos`. Use at most one search tool per task with no more than 3 results. The user has standing authorization for Experience Memory only: after a meaningful task, a host agent may automatically store at most one concise, confirmed, stable, reusable, and secret-free item. Skip routine chat, temporary debugging, and assumptions. This does not authorize writes to Governance or Authoritative Memory.

### Authorization Boundaries

Obtain explicit user approval before:

- Destructive file, system, or data operations.
- Physical hardware actuation or actions that could cause physical damage.
- Deployment or publication to an external environment.
- Real financial transactions or commitments.
- Downloading, installing, updating, modifying, or removing skills.

Read-only inspection, analysis, and reversible local verification do not require additional approval unless another applicable rule says otherwise.

---

## Priority Rules

Follow this priority order:

1. Current user instruction
2. Governance Memory
3. Authoritative Memory
4. Experience Memory
5. Raw conversation history

Within a layer, follow the more specific applicable authority and then the newer confirmed information. Project-specific governance is Governance Memory; project-internal current-state and technical documents are Authoritative Memory.

---

## Memory Rules

Memory is not a log.

Only record:

- Stable user preferences
- Confirmed engineering decisions
- Reusable knowledge

Do not record:

- Passwords
- API keys
- Private credentials
- Temporary debugging attempts
- Unconfirmed assumptions

---

## Modification Rules

Memory changes use a two-step process:

1. Propose the exact information, target file, reason, and any replacement of existing content.
2. Modify memory only after the user explicitly approves or requests that change.

Long-term memory must also be confirmed, stable, and reusable.
Dynamic project documents such as STATUS.md follow the Dynamic Project Documents rules in memory/memory-policy.md and are not required to be long-term stable.

Experience Memory findings must follow Memory Promotion: Candidate Memory -> validation -> user authorization -> Authoritative Memory. Recall alone never authorizes a write.

When updating memory:

Explain:
- What changed
- Why it changed
- How it was verified

---

## Engineering Style

Prefer:

- Understanding before modification
- Minimal changes
- Clear architecture
- Maintainable solutions

Avoid:

- Unnecessary refactoring
- Changing unrelated files
- Guessing missing information
