# Memory Changelog

This file records version-level governance and framework changes. Git history holds line-level detail.

## 2026-08-19 V1.2 Documentation Simplification

Changes:

- Reduced `memory/memory-policy.md` from 618 lines to a compact authoritative policy.
- Reduced `AGENTS.md` to an always-loaded behavior summary.
- Removed repeated governance text from conventions, templates, and workspace documentation.
- Removed the private standing-write assumption from the public Experience Memory defaults.
- Replaced the one-query-per-task rule with user-controlled retrieval rounds: one search tool, at most 3 results, present every result, then ask before continuing.
- Added purpose-aware file routing: preserve each new memory file's declared purpose and verify that purpose before every write.
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

## 2026-08-20 V1.7 Authority Refinement + Rule Convergence

Changes:

- Adjusted authority levels: Rules (Level 1) > Project (Level 2) > Personal (Level 3)
- Rules are governance, not preference — user preference cannot bypass safety rules
- Converged AGENTS.md: removed duplicated rules, kept as lean entry point
- AGENTS.md now ~80 lines (was ~120), all details point to memory-policy.md
- Updated all authority references across memory-policy.md, README.md, memory-manual.md

Reason: Rules and Personal were at the same level, but they have different natures. Rules = governance ("confirm before delete"), Personal = preference ("I like fast action"). Governance must win. Also, AGENTS.md and memory-policy.md had significant overlap — new agents were reading the same rules twice.

Impact: Cleaner authority hierarchy. AGENTS.md is now a true entry point: read it to understand the system, follow links for details.

## 2026-08-20 V1.6.1 Project Index Template

Changes:

- Added `INDEX.md` template to `templates/project-template.md`
- Each project now has a two-level index: `projects.md` → `INDEX.md` → per-file loading
- Updated `rules/memory-policy.md` Loading Rules to include "Understand a project → Project INDEX.md"

Reason: AI cannot "see" file directories — it must query and read text. Without a project-level index, agents waste tokens trying files blindly or miss relevant documents entirely.

Impact: AI loads 2 small index files to locate exactly what it needs, instead of guessing or reading everything. Token-efficient and predictable.

## 2026-08-20 V1.6 Three-Layer Memory Architecture

Changes:

- Reorganized directory structure into three clear layers:
  - `personal/` — Personal Memory (user info, preferences)
  - `project/` — Project Memory (project index, per-project docs)
  - `rules/` — Agent Rules (authority, policy, promotion, conventions)
- Moved files from `memory/` and `governance/` to new layer-based locations
- Updated all path references across AGENTS.md, README.md, memory-policy.md, authority.md
- Updated README.md with clear Memory Layers table and new repository layout

Reason: The three concepts (Personal/Project/Agent Rules) already existed in the framework but were not explicitly separated. Without clear layering, Authority, Promotion, and Handoff rules become ambiguous about what they apply to.

Impact: Every memory file now belongs to exactly one layer. Authority levels map cleanly to layers (Level 1 = Project, Level 2 = Personal + Rules). Future Handoff Protocol can reference layers instead of individual files.

## 2026-08-20 V1.5 Memory Promotion

Changes:

- Added `rules/memory-promotion.md` with memory states, promotion flow, requirements, and demotion rules
- Added Memory Promotion section to README.md with lifecycle diagram and STM32 example
- Updated `rules/memory-policy.md` with memory states table, promotion requirements, and demotion rules

Reason: V1.4 defined what to trust; V1.5 defines when experience can become authoritative. Without this, agents either write unverified claims to project docs or valuable lessons stay buried in chat history.

Impact: Knowledge now has a lifecycle — Observation → Experience → Candidate → Verified → Authoritative. Promotion requires all five conditions: Stable, Reusable, Verified, Relevant, Authorized.

## 2026-08-20 V1.4 Authority System

Changes:

- Added `rules/authority.md` with P0-P5 priority levels and conflict handling rules
- Added Authority Levels section to `rules/memory-policy.md`
- Updated `AGENTS.md` with authority loading and conflict rules
- Updated `README.md` with Authority section and repository layout

Reason: Establish the foundation for memory governance — define what information can be trusted when multiple agents produce conflicting data.

Impact: Agents now have a clear hierarchy for resolving information conflicts. Higher authority sources automatically override lower ones. Conflicts are reported, not silently resolved.

## 2026-08-20 V1.3 Strategic Repositioning — Memory Governance

Changes:

- Repositioned from "AI Memory Framework" to "Multi-Agent Memory Governance Framework"
- Defined six core capabilities: Authority Model, Cross-Agent, Memory Lifecycle, Conflict Resolution, Context Router, Handoff Protocol
- Added ROADMAP.md with V1.4-V1.8 version plan
- New tagline: "Agents can remember independently, but projects need one truth."

Reason: The memory storage/retrieval space is crowded (Mem0, TDAI, built-in agent memories). The real value is governance — ensuring multiple agents share one authoritative truth, not each maintaining their own potentially conflicting memory.

Impact: Framework direction shifts from "help AI remember more" to "help projects maintain single source of truth across agents." Technical implementation stays Git Markdown-based, but adds formal protocols for authority, lifecycle, routing, and handoff.

## Entry Format

Use `## YYYY-MM-DD Version — Title`, followed by concise **Changes**, **Reason**, and **Impact** sections.
