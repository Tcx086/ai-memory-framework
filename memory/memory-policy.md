# Memory Policy


## Authority

This document is the authoritative specification for memory management in the AI-Memory system.

Other files (AGENTS.md, README.md, etc.) may reference memory loading principles, but this file defines the complete rules.

In case of conflict, this file takes precedence for memory management matters.


## Purpose

This document defines how AI memory should be managed.

The goal is:

- Keep memory useful.
- Avoid unnecessary context loading.
- Prevent incorrect information accumulation.


---


# Memory Architecture


## Layer 1: Governance Memory

Governance Memory defines:

- Agent behavior and authorization boundaries.
- Memory admission, loading, promotion, and lifecycle rules.
- Conflict priority and source-of-truth responsibilities.

Primary files:

- AGENTS.md — minimum bootstrap summary.
- memory/memory-policy.md — authoritative memory-management specification.
- memory/conventions.md — stable collaboration and execution conventions.

Governance changes require explicit user authorization. Neither Authoritative Memory nor Experience Memory may override Governance Memory.


## Layer 2: Authoritative Memory

Authoritative Memory stores confirmed information within an explicitly assigned responsibility.

Examples:

- memory/universal-memory.md — confirmed stable user information.
- memory/projects.md — project navigation metadata and dated summary snapshots.
- Project STATUS.md or PROJECT.md — current project state and configuration.
- ARCHITECTURE.md — current system design.
- DECISIONS.md — confirmed decisions and their lifecycle.
- BUGS.md — confirmed known issues and their status.
- Confirmed entries in LESSONS.md — verified reusable project knowledge.

Git Markdown is the source of truth for governance and current authoritative facts. A Markdown file is authoritative only for its defined responsibility; its existence does not make guesses, unverified candidates, or out-of-scope summaries authoritative.

Long-term entries must satisfy user authorization, confirmation, stability, and reusability. Dynamic project documents use the Dynamic Project Documents exception defined below.


## Layer 3: Experience Memory

Experience Memory is an optional external recall and reasoning layer. It may contain:

- Conversation history.
- Debugging attempts and failed approaches.
- Historical solution paths and scene experience.
- Automatically extracted facts, preferences, and persona candidates.

Experience Memory may be generated automatically, but it is not authoritative. Treat every recalled item as Historical Evidence that may be stale, incomplete, incorrect, or superseded.

An Experience Memory Provider must not:

- Define current project state, configuration, architecture, decisions, or bug status.
- Override Governance or Authoritative Memory.
- Directly modify Governance or Authoritative Memory.
- Be queried by default for every task.

The first provider is TencentDB Agent Memory (TDAI), with L0 Conversation, L1 Structured or Atomic Memory, L2 Scene or Experience, and L3 Persona capabilities. Provider-specific installation, configuration, services, schemas, and code remain outside the core policy.

The core policy uses the abstract term Experience Memory Provider so a provider can be replaced without changing governance. Future adapters may expose capabilities equivalent to `tdai_memory_search` and `tdai_conversation_search`, but those names are not core-policy interfaces.


## Controlled Dual-Store Collaboration

AI-Memory and an Experience Memory Provider cooperate through an asymmetric flow:

1. Governance and the minimum relevant Authoritative Memory establish current truth.
2. Experience Memory supplies optional historical evidence when it materially helps the task.
3. Recalled evidence is checked for project scope, recency, supersession, and conflict.
4. Authorized hosts may automatically capture and extract Experience Memory without changing its non-authoritative status.
5. A reusable candidate reaches Authoritative Memory only through Memory Promotion and user authorization.

Automatic capture is separate from retrieval. Enabling capture does not authorize querying or injecting Experience Memory for every task. Automatic or manual retrieval must remain bounded and subordinate to Authoritative Memory.

Workspace summaries such as `MEMORY.md` may cache a small amount of bootstrap context, but they are not another source of truth. They must identify their authority boundary and defer to the authoritative file responsible for each fact.


---


# Memory Scope


## Scope 1: Universal Memory

Location:

memory/universal-memory.md


Purpose:

Store stable user-related information.


Examples:

- Long-term interests.
- Working preferences.
- Communication style.


Should not contain:

- Temporary tasks.
- Project-specific details.
- Debug logs.



---


## Scope 2: Working Conventions

Location:

memory/conventions.md


Purpose:

Store stable collaboration rules.


Examples:

- Coding preferences.
- Debugging workflow.
- Documentation habits.



---


## Scope 3: Project Index

Location:

memory/projects.md


Purpose:

Store project locations and summaries.


Should not contain:

- Source code.
- Detailed implementation.
- Temporary problems.



---


## Scope 4: Project Memory

Location:

Inside each project repository.


Examples:

- STATUS.md
- ARCHITECTURE.md
- DECISIONS.md
- BUGS.md
- LESSONS.md


Contains:

- Technical decisions.
- Design history.
- Debugging conclusions.
- Bug tracking.

Note:

For small projects, a single PROJECT.md combining status, architecture, decisions, and lessons is acceptable.
BUGS.md is an authoritative source for known issues and should be consulted before debugging.

Project knowledge quality:

- A confirmed decision starts as Active. When replaced, mark it Superseded and link the replacement; use Deprecated when it should no longer be used without a direct replacement. Preserve decision history unless removal is explicitly approved.
- A lesson must include evidence, verification status, and a verification date. Only Confirmed lessons are authoritative; unverified lessons must not guide high-risk work or be promoted as general knowledge.


---


# Repository Support Files

These files support the memory system but are not user or project memory scopes:

- AGENTS.md — bootstrap rules. Always load it. It summarizes critical behavior but does not override this policy.
- README.md — human-facing overview. Read it for repository orientation; it is not a normative authority.
- memory/memory-policy.md — authoritative memory-management specification. Read it when reviewing, modifying, or resolving conflicts in memory.
- memory/changelog.md — governance change summary. Read it only when auditing history or updating the memory-system structure.
- templates/ — non-authoritative scaffolding. Read only the template needed when creating or reviewing a corresponding artifact.

Templates must remain consistent with this policy. If a template conflicts with an authoritative rule, follow this policy and report the mismatch.


---


# Memory Loading Rules


## Default Loading

Always load:

- AGENTS.md

AGENTS.md must retain the minimum cross-platform behavior and authorization summary. Moving that summary elsewhere requires policy review and user approval.


Do not load:

- All projects.
- All historical records.
- Unrelated documents.
- Experience Memory by default.



## Project Tasks

When working on a project:

Load on demand:

1. projects.md (to locate the project)
2. Project STATUS.md (to understand current state), if the project uses separated documents
3. Additional documents only when the task requires them:
   - ARCHITECTURE.md — when modifying system design
   - DECISIONS.md — when evaluating design trade-offs
   - LESSONS.md — when debugging or avoiding known pitfalls
   - BUGS.md — when investigating known issues

For a small project that uses PROJECT.md, read the relevant sections of PROJECT.md instead of requiring the separated documents.

Do not load all project documents upfront.


## Context Building Flow

Build task context in this order:

1. Load AGENTS.md.
2. Identify the current task and project.
3. Load the minimum relevant Authoritative Memory.
4. Decide whether historical experience is needed.
5. If needed and a provider is available, query Experience Memory.
6. Retrieve only a small relevant Top-K result set.
7. Check recency, project scope, supersession, and conflicts against Authoritative Memory.
8. Build a final context that labels confirmed facts, historical evidence, inferences, and unknowns.
9. Provide that context to the reasoning or execution agent.

Do not inject all project documents, all conversation history, or a large unfiltered recall set.


## Experience Memory Retrieval

Use Experience Memory only when it materially helps, such as locating a prior attempt, a similar failure, or historical rationale that is absent from current authoritative documents.

For every recalled item, consider:

- Timestamp and recency.
- Project and environment identity.
- Whether a later decision or status update superseded it.
- Whether it conflicts with the current authoritative file.

If a conflict exists, Authoritative Memory wins unconditionally for current facts. Preserve the recalled item only as historical background when useful. If authority or supersession cannot be determined, label the item uncertain and do not use it to update current state.


---


# Memory Writing Rules


## Information States

Classify information before using or storing it:

- Confirmed — supported by an authoritative file, a verification result, or an explicit user statement.
- Inferred — a reasoned conclusion from available evidence; label it as an inference.
- Unknown — insufficient evidence; state what is unknown instead of guessing.

Inferred and unknown information must not be written as confirmed memory.


## Long-Term Memory Admission


Memory should only be updated when information is:

- Stable.
- Reusable.
- Confirmed.


Allowed:

- User preferences.
- Final design decisions.
- General engineering lessons.


Not allowed:

- Guesses.
- Temporary debugging attempts.
- Failed experiments without long-term value.
- Secrets.


One-time requests, temporary choices, and repeated observations are not automatically long-term preferences.

A preference may be recorded only when:

- The user explicitly states that it should apply in the future; or
- The agent proposes the observed pattern and the user confirms it as a long-term preference.

For behavior-affecting preferences, record a short confirmation date when useful for later review.


## General and Cross-Project Knowledge

A project lesson may be promoted to conventions.md only when it is confirmed, stable, reusable beyond one project, and approved by the user.

Do not copy project lessons between projects by default. Keep project-specific knowledge in its source project; if another project needs an adapted lesson, verify it in that project and cite the source. Prefer referencing a promoted convention over duplicating it.

General Technical Pitfalls in conventions.md must be confirmed and environment- or tool-wide. Review them when conventions change, a relevant tool has a major version change, a conflict or duplicate appears, or the user requests an audit. Reclassification or removal requires user approval.


## Memory Promotion

Experience Memory cannot be copied directly into Authoritative Memory. Promotion follows:

Experience Memory -> Candidate Memory -> Validation -> User Authorization -> Authoritative Memory

A Candidate Memory proposal must identify:

- Target project or scope.
- Proposed fact, preference, decision, issue, or lesson.
- Existing authoritative value, if any.
- Proposed replacement or addition.
- Evidence, source date, and relevant project or environment.
- Validation status and remaining uncertainty.
- Exact target authoritative file.

Promotion requires the same admission rules as a direct memory update. Long-term information requires authorization, confirmation, stability, and reusability. Dynamic project information requires authorization, confirmation, an appropriate authoritative project file, and an update date.

Repeated recall results are evidence, not confirmation by themselves. Until promotion completes, keep the candidate outside Authoritative Memory.


## Dynamic Project Documents

The stability and reusability requirement applies to long-term memory.

Dynamic project documents such as STATUS.md may contain current information when it is confirmed, authorized, dated, and stored in the appropriate project repository.



---


# Dynamic Information Rule


## Definition

The following information is classified as dynamic:

- Current project status
- Next goal
- Temporary priorities


## Source Requirement

Dynamic information must come from authoritative sources only:

- The project's own STATUS.md file
- Explicit user instructions


## Prohibited Behavior

Do not:

- Infer current project status from general memory
- Automatically assume next goals
- Treat outdated memory entries as current state


## Example

Wrong:

"universal-memory.md says the user works on ProjectX, so the current task is probably ProjectX-related."

Right:

"Read the project STATUS.md to determine current status, or ask the user."


---


# Modification Permission


## Two-Phase Update Protocol

Before modifying memory, the agent must present:

- The exact information to add, change, or remove.
- The target file.
- Why the information is worth storing.
- Whether existing content will be replaced or invalidated.
- Any personal, private, or sensitive information involved.

Then ask the user for explicit approval unless the user's current instruction already explicitly requests that exact change.


## Permission Requirements

Long-term memory modification requires ALL of the following:

1. User authorization — user explicitly requests or confirms the change.
2. Information confirmation — the information is verified and not speculative.
3. Stability and reusability — the information has long-term value beyond the current task.


AI should not silently modify memory.

If any condition is not met, do not write to memory.

After writing, report what changed, why it changed, and how consistency was checked.


---


# Memory Lifecycle and Maintenance

Memory must be reviewed as well as added. Review is appropriate when:

- The user requests an audit or cleanup.
- New confirmed information conflicts with an existing entry.
- A dated entry may no longer represent the current situation.
- A project is completed, paused indefinitely, moved, or archived.
- A file has become repetitive or too large for efficient selective loading.

Lifecycle actions:

- Correct — replace inaccurate information with newer confirmed information and record the reason.
- Supersede — retain important historical decisions but mark them as replaced and link the replacement.
- Archive — move inactive project information out of active summaries while preserving its authoritative project history.
- Remove — delete information only when it is incorrect, no longer useful, duplicated, sensitive, or explicitly requested for deletion.

Before cleanup, archival, consolidation, or deletion, present the exact proposed changes and obtain user approval.

Project lifecycle:

- Update the project's STATUS.md or PROJECT.md with a dated state such as Completed or Archived.
- Update projects.md only as a historical index summary; do not infer the project state.
- Preserve DECISIONS.md and LESSONS.md unless the user explicitly approves removal.

Repository lifecycle:

- Keep changelog.md as a concise version-level governance summary; Git history holds line-by-line detail.
- When changelog.md exceeds 10 version entries or 300 lines, propose consolidating older entries into an annual summary; do not consolidate without user approval or lose important rationale.
- Review conventions using the triggers defined under General and Cross-Project Knowledge.
- Prefer marking a rule superseded during review before removing it when historical context remains useful.


---


# Conflict Resolution


Priority order:


1. Current user instruction.

2. Governance Memory.

3. Authoritative Memory.

4. Experience Memory.

5. Raw conversation history.


Within Governance Memory, use the most specific applicable governance rule; memory/memory-policy.md remains authoritative for memory-management matters. Within Authoritative Memory, use the file assigned to the fact and then newer confirmed information.


Newer confirmed information replaces older information.

Experience Memory is Historical Evidence even when newer than an authoritative file. Recency alone does not promote it or make it current fact.



---


# Project Information Authority


## Navigation vs Source of Truth

memory/projects.md serves as:

- A navigation index
- A summary of project metadata
- A quick reference for project location and direction

It is NOT the authoritative source for technical facts.


## Authoritative Project Sources

The following files inside each project repository are the authoritative sources:

- STATUS.md — current project status
- ARCHITECTURE.md — system design
- DECISIONS.md — design decisions and rationale
- BUGS.md — known issues and verified bug information
- LESSONS.md — accumulated knowledge
- PROJECT.md — combined authoritative source for small projects

BUGS.md is the confirmed known-issue authority. Unverified symptoms or recalled debugging attempts must remain labeled as candidates or historical evidence until confirmed.


## Project Index Conflict Resolution

When information in projects.md conflicts with project-internal documents:

Project-internal documents take precedence.


## Debugging Context Order

For debugging tasks, load context in this order and only as needed:

1. PROJECT.md or STATUS.md — current state and configuration.
2. BUGS.md — confirmed known issues and status.
3. Experience Memory search — similar historical problems or attempts, if a provider is available and recall is useful.

Experience results cannot change BUGS.md without validation and Memory Promotion.


## Example

Wrong:

"projects.md says the ProjectX status is Active, so I will assume the current task is ProjectX-related."

Right:

"projects.md indicates ProjectX exists. Read the project STATUS.md for current status."


---


# Token Efficiency Rules


Prefer:

- Summaries over raw logs.
- Indexes over full documents.
- Relevant context over complete history.


The objective is:

Maximum useful information with minimum context size.
