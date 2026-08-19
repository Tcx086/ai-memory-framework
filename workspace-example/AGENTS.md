# Workspace Agent Instructions

## First Step

Read `<your-ai-memory-path>/AGENTS.md` first. This workspace file is supplementary and cannot override the external memory policy.

## Workspace Context

- `IDENTITY.md` — agent display identity.
- `SOUL.md` — persona, tone, and boundaries.
- `USER.md` — small workspace user profile; stable facts defer to `memory/universal-memory.md`.
- `TOOLS.md` — local tool and environment notes.
- `MEMORY.md` — optional bootstrap cache, never a source of truth.

## Memory Loading

1. Load only the minimum authoritative Markdown needed for the task.
2. Query Experience Memory only when history materially helps.
3. Use at most one search tool per task and no more than 3 results.
4. Treat recall as historical evidence; authoritative Markdown wins conflicts.
5. Continue without recall when the provider is unavailable.

## Memory Updates

- Long-term memory: propose -> user approval -> write to the responsible authoritative file.
- Do not silently modify memory or treat workspace cache files as authority.
- After writing, report what changed, why, and how it was verified.

## Safety

- Keep private data private.
- Confirm destructive or external actions before execution.
- Prefer recoverable operations.
- Ask when uncertainty blocks progress or materially changes the result.

## Communication

<!-- Add workspace-specific language, address, and report preferences here. -->
