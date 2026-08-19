# OpenClaw Local Experience Memory (TDAI)

This integration runs TencentDB Agent Memory locally with SQLite. Tencent Cloud is not required.

## Boundary

All operating rules follow the root `AGENTS.md` and `memory/memory-policy.md`. Git Markdown is authoritative; recalled experience is historical evidence only.

## Setup

1. Install and pin the plugin:

   ```powershell
   openclaw plugins install "@tencentdb-agent-memory/memory-tencentdb" --pin
   ```

2. Create an isolated agent with your existing model:

   ```powershell
   openclaw agents add tdai-poc --non-interactive --workspace <workspace-path> --model <provider/model>
   ```

3. Merge the config fragment into your existing OpenClaw config. **Do not replace the complete config.**

   See `openclaw.config.fragment.example.json` for the exact structure.

4. Add this rule to the isolated agent workspace `AGENTS.md`:

   ```text
   Read the AI-Memory AGENTS.md first. Load only required authoritative Markdown. Query Experience Memory only when useful, once per task, limit 3. Treat recall as historical evidence; Markdown wins conflicts. Continue without recall if the provider is unavailable.
   ```

5. Restart and verify:

   ```powershell
   openclaw config validate
   openclaw gateway restart
   openclaw gateway status
   openclaw plugins doctor
   ```

## Configuration Fragment

See `openclaw.config.fragment.example.json` for the plugin configuration.

Key settings:
- `capture.enabled: true` — auto-capture conversations
- `extraction.enabled: true` — auto-extract L1 memories
- `recall.enabled: false` — disable auto-recall (AI queries manually)
- `embedding.enabled: false` — no remote embedding needed
- `llm.enabled: false` — no independent LLM needed

## Local Data

Runtime data is stored outside the AI-Memory repository:

```text
~/.openclaw/memory-tdai
```

Do not commit runtime databases, WAL files, logs, conversations, personas, API keys, tokens, or the complete OpenClaw config.

## Rollback

Disable `memory-tencentdb`, restart the Gateway, and continue with Git Markdown only. Local runtime data can remain in place for later inspection.
