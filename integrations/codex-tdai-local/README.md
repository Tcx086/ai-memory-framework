# Codex Local Experience Memory (TDAI)

This adapter exposes the local TDAI SQLite store to Codex through a STDIO MCP server. No background service required.

## Tools

- `tdai_memory_search` — searches structured L1 experience, maximum 3 results.
- `tdai_conversation_search` — searches raw L0 conversation history, maximum 3 results.
- `tdai_read_cos` — reads L2/L3 scene blocks and persona files.

All recalled content is historical evidence. Git Markdown remains authoritative and wins every conflict.

## Codex Configuration

Register the local server in `~/.codex/config.toml`:

```toml
[mcp_servers.tdai_memory]
command = 'node'
args = ['<ai-memory-framework>/integrations/codex-tdai-local/server.mjs']
startup_timeout_sec = 10
tool_timeout_sec = 15

[mcp_servers.tdai_memory.env]
TDAI_DATA_DIR = '<home>/.openclaw/memory-tdai'
```

Restart the local Codex client or start a new session after changing MCP configuration.

## Operating Rule

1. Load `AGENTS.md` and the minimum relevant authoritative Markdown.
2. Query one TDAI search tool only when historical experience materially helps; request at most 3 results.
3. Treat every result as potentially stale and validate it against authoritative Markdown.
4. Continue with Markdown if the adapter is unavailable or no memory matches.

## Server Implementation

See `server.mjs` for the MCP server implementation. It wraps the local SQLite database and exposes the three tools above.

## Requirements

- Node.js 18+
- `@tencentdb-agent-memory/memory-tencentdb` plugin installed (for the SQLite database)
- TDAI data directory with at least L0/L1 data

## Verification

Run the integration test:

```powershell
node --test .\server.integration.test.mjs
```
