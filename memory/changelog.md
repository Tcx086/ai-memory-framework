# Memory Changelog


This file records important changes to the AI memory system.


Purpose:

- Track why memory structure changes.
- Keep memory evolution understandable.
- Avoid unexplained modifications.


---


# Changes


---


## 2026-08-18 V1.0 Framework Release

Initial release of the AI-Memory dual-store collaboration framework.

Changes:

- Defined three-layer architecture: Governance, Authoritative, and Experience Memory.
- Established controlled collaboration flow with authoritative-first loading.
- Added bounded on-demand historical recall (Top-K 3, one search per task).
- Created memory policy, conventions, project templates, and integration guides.
- Added workspace example files for OpenClaw integration.
- Added TDAI example structure with experience contract and scene blocks.

Reason:

Provide a reusable framework for long-term AI-human collaboration memory, combining Git Markdown authority with optional experience memory.

Impact:

Agents must establish current facts from Governance and Authoritative Memory before optional historical recall. Recalled experience cannot override or directly update authoritative files.


---


# Format


For future updates:


## YYYY-MM-DD


Change:

What was modified?


Reason:

Why was this change needed?


Impact:

What behavior or workflow does this affect?
