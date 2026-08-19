# AI Memory Quick Reference

> Version 1.2 · 2026-08-19

## Two Stores

| Store | Contains | Authority |
|---|---|---|
| AI-Memory Git Markdown | Current rules, facts, state, architecture, decisions, issues, and verified lessons | Source of truth within each file's responsibility |
| Experience Memory | Conversations, attempts, extracted memories, scenes, and personas | Historical evidence only |

**Rule:** establish the present from authoritative Markdown, then consult history only when useful.

## Start a Task

1. Read the external AI-Memory `AGENTS.md`.
2. Identify the task and project.
3. Load only the authoritative files the task needs.
4. Query at most one Experience Memory search tool, with no more than 3 results, only when history materially helps.
5. Validate recalled evidence for scope, date, supersession, and conflicts.

## What to Read

| Need | Source |
|---|---|
| User background | `memory/universal-memory.md` |
| Project location | `memory/projects.md` |
| Current project state | Project `STATUS.md` or `PROJECT.md` |
| Design | `ARCHITECTURE.md` and `DECISIONS.md` |
| Known issue | `BUGS.md` |
| Verified project lesson | `LESSONS.md` |

## Update Memory

`Candidate -> validation -> user authorization -> responsible authoritative file`

Before writing, state the exact content, target, reason, replacement or invalidation, evidence, and any sensitive information. Never promote recalled history directly.

## Workspace Files

| File | Purpose |
|---|---|
| `AGENTS.md` | Supplementary workspace instructions |
| `IDENTITY.md` | Agent display identity |
| `SOUL.md` | Persona, tone, and boundaries |
| `USER.md` | Small workspace profile; stable facts defer to `universal-memory.md` |
| `TOOLS.md` | Local tool notes |
| `MEMORY.md` | Optional non-authoritative bootstrap cache |

## Safety

- Never store passwords, API keys, tokens, or private credentials.
- Confirm destructive, external, physical, financial, and skill-management actions.
- When sources conflict: current user instruction > Governance > Authoritative > Experience > raw history.
