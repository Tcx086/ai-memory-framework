# AI-Memory Framework Roadmap

> **Positioning: Multi-Agent Memory Governance Framework**
> 
> Agents can remember independently, but projects need one truth.

---

## Core Capabilities

1. **Authority Model** — Priority-based trust hierarchy (P0-P5)
2. **Cross-Agent** — Agent-agnostic, Git Markdown as single source of truth
3. **Memory Lifecycle** — Candidate → Active → Deprecated → Superseded → Rejected
4. **Conflict Resolution** — Auto-detect, auto-overwrite, or require human confirmation
5. **Context Router** — Task-type-based selective memory loading
6. **Handoff Protocol** — Standardized inter-agent task transfer format

---

## Version Plan

### V1.4 — Authority Layer ✅
- [x] Define P0-P5 priority system in `memory/authority.md`
- [x] Add authority levels to `memory/memory-policy.md`
- [x] Update `AGENTS.md` with authority rules
- [x] Update `README.md` with Authority section
- [x] Conflict detection and resolution rules

### V1.5 — Memory Lifecycle
- [ ] Memory states: Candidate / Active / Deprecated / Superseded / Rejected
- [ ] State transition rules and triggers
- [ ] Candidate promotion flow (validate → authorize → write)
- [ ] Stale memory auto-flagging

### V1.6 — Context Router
- [ ] Task-type → required-files mapping
- [ ] Minimal context loading strategy
- [ ] Router rules documentation

### V1.7 — Handoff Protocol
- [ ] Standard handoff format (JSON/Markdown)
- [ ] Fields: Task / Goal / Current State / Constraints / Changed Files / Tests / Known Issues / Memory Candidates
- [ ] Handoff template
- [ ] Post-handoff memory writeback flow

### V1.8 — Adapter Layer
- [ ] OpenClaw adapter (refine existing)
- [ ] Codex adapter (refine existing)
- [ ] Claude Code adapter
- [ ] Gemini adapter
- [ ] Unified API/CLI entry point

---

## Not Doing

- ❌ Custom Vector DB
- ❌ Custom Embedding model
- ❌ Custom RAG pipeline
- ❌ Training memory models
- ❌ Building another Mem0/TDAI

---

## Current Status

- **Version:** V1.3
- **Implemented:** Dual-store architecture (Git Markdown authoritative + TDAI experience), basic governance rules
- **Next:** V1.4 Authority Layer

---

_Created: 2026-08-20_
