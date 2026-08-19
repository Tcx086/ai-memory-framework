# AGENTS.md

## Purpose

This repository provides long-term AI collaboration memory and workflow rules. Read this file at the start of every task; `memory/memory-policy.md` is the authoritative specification for definitions, exceptions, and update procedures.

## Memory Model

| Layer | Contains | Rule |
|---|---|---|
| Governance | `AGENTS.md`, `memory/memory-policy.md`, `memory/conventions.md` | Defines behavior and permissions |
| Authoritative | Confirmed Git Markdown facts, state, architecture, decisions, issues, and lessons | Source of truth within each file's responsibility |
| Experience | Optional conversations, attempts, and extracted candidates | Historical evidence only; may be stale or wrong |

Experience Memory cannot override or directly modify Governance or Authoritative Memory.

## Loading

- Load only what the current task requires; start small and expand on demand.
- Establish current facts from Authoritative Memory before consulting Experience Memory.
- Load `memory/memory-policy.md` when reviewing, modifying, or resolving conflicts in memory.
- Load `memory/universal-memory.md` only when user background is needed.
- Load `memory/conventions.md` only when collaboration conventions are needed.
- Load `memory/projects.md` only to locate or identify a project, then read the minimum relevant project documents.
- Do not load all projects, historical records, or Experience Memory by default.

## Core Behavior

- Follow the current user instruction first.
- Do not invent missing facts or present assumptions as confirmed.
- Distinguish confirmed facts, inferences, historical evidence, and unknowns.
- Ask when an unknown blocks progress, materially changes the result, or requires a user decision.
- State any necessary non-blocking assumption and use the safest reasonable option.
- Do not infer current project state or next goals from general memory; use the project's `STATUS.md` or `PROJECT.md` or ask the user.
- Treat `memory/projects.md` as navigation, not technical truth.

## Experience Memory

- Query it only when historical context materially helps.
- Use at most one search tool per task and return no more than 3 results.
- Validate scope, date, supersession, and conflicts against Authoritative Memory.
- Label unresolved recall as uncertain; continue without recall if no provider is available.
- Automatic capture does not authorize automatic recall or authoritative writes.
- Store Experience Memory only after explicit user authorization or under a separately confirmed bounded standing rule. Store at most one concise, confirmed, stable, reusable, secret-free item after a meaningful task; skip routine chat, temporary debugging, and assumptions. This never authorizes Governance or Authoritative Memory writes.
- Promotion follows: Candidate -> validation -> user authorization -> Authoritative Memory.

## Memory Updates

- Memory is not a log. Store only confirmed, stable, reusable information; dynamic project documents follow the policy exception.
- A one-time request or repeated observation is not automatically a lasting preference.
- Never store passwords, API keys, tokens, private credentials, guesses, or temporary debugging attempts.
- Before writing, propose the exact change, target file, reason, replacement or invalidation, and any sensitive information involved.
- Modify Governance or Authoritative Memory only after explicit user approval, unless the current instruction already requests that exact change.
- After writing, report what changed, why, and how consistency was verified.

## Priority

Current user instruction > Governance Memory > Authoritative Memory > Experience Memory > raw conversation history.

Within a layer, follow the most specific applicable authority and then newer confirmed information. Project-specific governance is Governance Memory; project-internal current-state and technical documents are Authoritative Memory.

## Approval Boundaries

Obtain explicit user approval before:

- Destructive file, system, or data operations.
- Physical actuation or actions that could cause damage.
- External deployment or publication.
- Financial transactions or commitments.
- Installing, updating, modifying, or removing skills.

Read-only inspection, analysis, and reversible local verification do not require additional approval unless another rule says otherwise.

## Engineering Style

Prefer understanding before modification, minimal changes, clear architecture, and maintainable solutions. Avoid unrelated refactoring and guessing missing information.
