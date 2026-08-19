# Memory Changelog

This file records version-level governance and framework changes. Git history holds line-level detail.

## 2026-08-19 V1.2 Documentation Simplification

Changes:

- Reduced `memory/memory-policy.md` from 618 lines to a compact authoritative policy.
- Reduced `AGENTS.md` to an always-loaded behavior summary.
- Removed repeated governance text from conventions, templates, and workspace documentation.
- Removed the private standing-write assumption from the public Experience Memory defaults.
- Replaced the one-query-per-task rule with user-controlled retrieval rounds: one search tool, at most 3 results, present every result, then ask before continuing.
- Aligned the OpenClaw workspace example with current bootstrap files and explicit authority boundaries.
- Moved provider-generated samples under `examples/tdai/`.

Reason: lower onboarding and context cost without changing the framework's authority model.

Impact: users and agents can find operational rules faster while detailed examples remain available at their point of use.

## 2026-08-18 V1.1 Codex TDAI Adapter

Changes:

- Added `tdai_experience_store` for authorized Experience Memory writes.
- Added FTS5 search with a LIKE fallback.
- Added path traversal and sensitive-content checks.
- Added integration tests and the Node.js 22.5+ requirement.

Reason: improve Codex search quality, security, and testability.

Impact: Codex can search and store bounded authorized experience through the local adapter.

## 2026-08-18 V1.0 Framework Release

Changes:

- Defined Governance, Authoritative, and Experience Memory.
- Established authoritative-first loading and bounded historical recall.
- Added policy, conventions, project templates, workspace examples, and integration guides.

Reason: provide a reusable dual-store framework for long-term AI-human collaboration.

Impact: recalled history cannot override or directly update authoritative files.

## Entry Format

Use `## YYYY-MM-DD Version — Title`, followed by concise **Changes**, **Reason**, and **Impact** sections.
