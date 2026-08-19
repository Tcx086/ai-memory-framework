# AI Memory Quick Reference

> Version 1.2 · 2026-08-19

## Two Stores

| Store | Contains | Authority |
|---|---|---|
| AI-Memory Git Markdown | Current rules, facts, state, architecture, decisions, issues, and verified lessons | Source of truth within each file's responsibility |
| Experience Memory | Conversations, attempts, extracted memories, scenes, and personas | Historical evidence only |

**Rule:** establish the present from authoritative Markdown, then consult history only when useful.

## What to Read

| Need | Source |
|---|---|
| User background | `memory/universal-memory.md` |
| Project location | `memory/projects.md` |
| Current project state | Project `STATUS.md` or `PROJECT.md` |
| Design | `ARCHITECTURE.md` and `DECISIONS.md` |
| Known issue | `BUGS.md` |
| Verified project lesson | `LESSONS.md` |

## Workspace Files

| File | Purpose |
|---|---|
| `AGENTS.md` | Supplementary workspace instructions |
| `IDENTITY.md` | Agent display identity |
| `SOUL.md` | Persona, tone, and boundaries |
| `USER.md` | Small workspace profile; stable facts defer to `universal-memory.md` |
| `TOOLS.md` | Local tool notes |
| `MEMORY.md` | Optional non-authoritative bootstrap cache |

For loading rules, query limits, update flow, priority hierarchy, and safety boundaries, see the external `AGENTS.md` and `memory/memory-policy.md`.
