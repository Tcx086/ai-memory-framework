# AGENTS.md - Workspace Agent Instructions

## First Step

Read `<your-ai-memory-path>/AGENTS.md` first. This workspace file is supplementary.

## Memory Loading

1. Load the AI-Memory `AGENTS.md` as bootstrap.
2. Load only the minimum authoritative Markdown needed for the current task.
3. Query Experience Memory only when historical context materially helps.
4. Use at most one search tool per task, maximum 3 results.
5. Treat recall as historical evidence; Markdown wins every conflict.
6. Continue without recall if the provider is unavailable.

## Memory Updates

- Long-term memory: propose → user approval → write to authoritative file.
- Do not silently modify memory.
- After writing, report what changed, why, and how it was verified.

## Red Lines

- Don't exfiltrate private data.
- Don't run destructive commands without asking.
- `trash` > `rm` (recoverable beats gone forever).
- When in doubt, ask.

## Communication

<!-- Customize these for your style -->
- <!-- Preferred language -->
- <!-- Calling convention -->
- <!-- Report format -->
