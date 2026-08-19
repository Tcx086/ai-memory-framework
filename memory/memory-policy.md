# Memory Policy

## Authority and Purpose

This document is the authoritative specification for memory management in AI-Memory. If another file conflicts with it on memory management, this policy wins.

The system should preserve useful confirmed context, load only what a task needs, and prevent guesses, stale history, or secrets from becoming current truth.

## Memory Architecture

| Layer | Role | Typical sources | Authority |
|---|---|---|---|
| 1. Governance Memory | Behavior, permissions, loading, promotion, and conflict rules | `AGENTS.md`, this policy, `memory/conventions.md` | Highest stored authority; changes require user authorization |
| 2. Authoritative Memory | Confirmed current facts within each file's assigned responsibility | `memory/universal-memory.md`, `memory/projects.md`, project `STATUS.md`, `ARCHITECTURE.md`, `DECISIONS.md`, `BUGS.md`, `LESSONS.md`, or `PROJECT.md` | Source of truth for current facts |
| 3. Experience Memory | Conversations, attempts, historical paths, and extracted candidates | An optional Experience Memory Provider such as TDAI | Historical evidence only; may be stale, incomplete, or wrong |

Git Markdown remains the source of truth for governance and current authoritative facts. A file is authoritative only for its defined responsibility; its existence does not make unverified or out-of-scope content authoritative.

Experience Memory must not define current state, override higher layers, or directly modify Governance or Authoritative Memory. The core policy uses the abstract term Experience Memory Provider so providers can be replaced; provider-specific installation, storage, schemas, and tools stay outside it.

## Controlled Store Collaboration

1. Establish current truth from Governance and the minimum relevant Authoritative Memory.
2. Retrieve Experience Memory only when historical context materially helps.
3. Check recalled evidence for scope, date, supersession, and conflict.
4. Label unresolved recall as uncertain and do not use it to update current state.
5. Promote a reusable candidate only after validation and user authorization.

Automatic capture and automatic recall are separate permissions. Enabling capture does not authorize querying or injecting history into every task. A workspace `MEMORY.md` may cache small bootstrap context, but it must declare its boundary and defer to the responsible authoritative file.

## Scope and Source Responsibilities

| Source | Responsibility | Must not be used for |
|---|---|---|
| `memory/universal-memory.md` | Confirmed stable user information and preferences | Temporary tasks or project details |
| `memory/conventions.md` | Stable cross-project collaboration and engineering conventions | Project-only lessons or unverified pitfalls |
| `memory/projects.md` | Project locations, navigation, and dated summary snapshots | Detailed implementation or current technical truth |
| Project `STATUS.md` | Confirmed current state, configuration, and next goal | Undated assumptions |
| `ARCHITECTURE.md` | Current system design | Raw design speculation |
| `DECISIONS.md` | Confirmed decisions and rationale | Unresolved options |
| `BUGS.md` | Confirmed known issues and status | Unverified symptoms |
| `LESSONS.md` | Verified reusable project knowledge | Unverified attempts |
| `PROJECT.md` | Combined authoritative source for a small project | Unrelated projects |

A confirmed decision starts as Active. Mark it Superseded and link its replacement when replaced, or Deprecated when it should no longer be used without a direct replacement. Preserve decision history unless removal is approved.

A lesson must include evidence, verification status, and verification date. Only Confirmed lessons are authoritative; unverified lessons must not guide high-risk work or be promoted.

Support files are non-authoritative: `README.md` is human-facing orientation, `memory/changelog.md` is a governance change summary, and `templates/` contains scaffolding. Templates must follow this policy.

## Loading Rules

Always load `AGENTS.md`. Do not load every project, historical record, unrelated document, or Experience Memory by default.

Load conditionally:

| Need | Load |
|---|---|
| Review or modify memory | This policy |
| User background | `memory/universal-memory.md` |
| Collaboration conventions | `memory/conventions.md` |
| Locate a project | `memory/projects.md` |
| Current project state | Project `PROJECT.md` or `STATUS.md` |
| Design work | `ARCHITECTURE.md` and relevant `DECISIONS.md` |
| Debugging | `PROJECT.md` or `STATUS.md`, then `BUGS.md`; add `LESSONS.md` only when useful |

Build context in this order:

1. Load `AGENTS.md` and identify the task and project.
2. Load the minimum relevant Authoritative Memory.
3. Decide whether historical experience is needed.
4. If useful and available, retrieve one small, focused result set.
5. Validate it against current authoritative sources.
6. Label confirmed facts, historical evidence, inferences, and unknowns before acting.

## Information and Writing Rules

Classify information before using or storing it:

- **Confirmed** — supported by an authoritative file, verification result, or explicit user statement.
- **Inferred** — reasoned from evidence and clearly labeled as inference.
- **Unknown** — not supported well enough; state what is missing instead of guessing.

Never write inferred or unknown information as confirmed memory. Long-term memory must be user-authorized, confirmed, stable, reusable, and secret-free.

Suitable long-term entries include explicit user preferences, final decisions, and verified general lessons. Do not store guesses, credentials, temporary debugging attempts, or failed experiments without reusable value.

A one-time request or repeated observation is not automatically a lasting preference. Record a preference only when the user states that it applies in the future or confirms an agent's proposal; add a confirmation date when useful.

Project lessons stay in their source project by default. Promote one to `memory/conventions.md` only when it is confirmed, cross-project, stable, reusable, and user-approved. Verify an adapted lesson in each target project, and prefer referencing a promoted convention over copying it.

Cross-project technical pitfalls must be confirmed and environment- or tool-wide. Review them after relevant convention or major tool changes, when conflicts or duplicates appear, or on user request. Reclassification or removal requires approval.

## Experience Memory Promotion

Promotion follows:

`Experience Memory -> Candidate Memory -> Validation -> User Authorization -> Authoritative Memory`

A proposal must identify:

- Target scope and authoritative file.
- Exact proposed fact, preference, decision, issue, or lesson.
- Existing authoritative value and any replacement or invalidation.
- Evidence, source date, project or environment, validation status, and remaining uncertainty.

Repeated recall is evidence, not confirmation. Keep a candidate outside Authoritative Memory until promotion is complete.

## Dynamic Project Information

Current status, next goals, and temporary priorities are dynamic. They may be stored in the appropriate project `STATUS.md` or `PROJECT.md` when confirmed, authorized, and dated; they do not need long-term stability or cross-task reusability.

Use only the project's own authoritative document or an explicit user instruction. Do not infer current state from general memory, project-index snapshots, or recalled history.

## Modification Permission

Before modifying Governance or Authoritative Memory, present:

- The exact addition, change, consolidation, or removal.
- The target file and reason.
- Any content replaced, invalidated, archived, or removed.
- Any personal, private, or sensitive information involved.

Then obtain explicit user approval unless the current instruction already requests that exact change. Never modify memory silently.

After writing, report what changed, why it changed, and how consistency was verified.

Separate approval is also required before destructive file or data operations, physical actuation, external deployment or publication, financial commitments, and skill installation, update, or removal.

## Lifecycle and Maintenance

Review memory when the user requests cleanup, confirmed information conflicts, dated content may be stale, a project changes lifecycle, or a file becomes repetitive or too large.

Allowed lifecycle actions:

- **Correct** inaccurate information with newer confirmed information and record the reason.
- **Supersede** retained historical decisions and link their replacements.
- **Archive** inactive summaries while preserving authoritative project history.
- **Remove** content only when incorrect, useless, duplicated, sensitive, or explicitly requested.

Present exact cleanup, consolidation, archival, or deletion changes and obtain approval first.

For a completed or archived project, update its dated `STATUS.md` or `PROJECT.md`, then update `memory/projects.md` only as an index summary. Preserve decisions and confirmed lessons unless removal is explicitly approved.

Keep `memory/changelog.md` concise because Git holds line-level history. When it exceeds 10 version entries or 300 lines, propose an annual consolidation without losing important rationale.

## Conflict Resolution

Use this priority order:

1. Current user instruction.
2. Governance Memory.
3. Authoritative Memory.
4. Experience Memory.
5. Raw conversation history.

Within Governance Memory, use the most specific applicable rule; this policy controls memory-management matters. Within Authoritative Memory, use the file assigned to the fact, then newer confirmed information.

Project-internal documents beat `memory/projects.md`. Experience Memory remains historical evidence even when it is newer; recency alone never promotes it.

## Efficiency Principle

Prefer summaries over logs, indexes over full documents, and relevant context over complete history: maximize useful information while minimizing context.
