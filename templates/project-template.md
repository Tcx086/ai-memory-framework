# Project Template Group

This template generates separated files for a project.
Create these files inside the project repository:

- STATUS.md — current status, goals, blockers
- ARCHITECTURE.md — system design, technology stack
- DECISIONS.md — important design decisions with rationale
- BUGS.md — known issues and verified bug information
- LESSONS.md — reusable knowledge and pitfalls

These files are Layer 2 Authoritative Memory within their assigned responsibilities. Do not copy recalled Experience Memory into them without validation and user-authorized Memory Promotion.

---

# STATUS.md Template

```markdown
# Project Status

## Current Status

<!-- Planning / Development / Testing / Completed / Archived -->

## Last Update

YYYY-MM-DD

## Current Goal

<!-- What is the next concrete objective? -->

## Blockers

<!-- Any blocking issues? -->

## Recent Changes

<!-- Brief list of recent significant changes -->
```

---

# ARCHITECTURE.md Template

```markdown
# Architecture

## System Overview

<!-- Brief description of the system structure -->

## Technology Stack

Hardware:
Software:
Frameworks:

## Key Components

<!-- List major modules/components and their roles -->

## Interfaces

<!-- How components communicate (UART, SPI, API, etc.) -->

## Pin Mapping / Resource Allocation

<!-- Hardware resource assignments, if applicable -->
```

---

# DECISIONS.md Template

```markdown
# Decisions

## Decision: [Title]

Date: YYYY-MM-DD

Context:
<!-- What problem or situation led to this decision? -->

Decision:
<!-- What was decided? -->

Alternatives Considered:
<!-- What other options were evaluated? -->

Reason:
<!-- Why was this option chosen? -->

Status:
<!-- Active / Superseded / Deprecated -->

Supersedes / Replaced By:
<!-- Link the related decision when status changes -->
```

Decision lifecycle is governed by the AI-Memory policy.

---

# BUGS.md Template

```markdown
# Known Issues

<!-- BUGS.md is the authority for confirmed known issues. Keep unverified recall or hypotheses outside this file until validated. -->

## [Issue Title]

Status:
<!-- Open / Investigating / Resolved / Won't Fix -->

Symptoms:
<!-- What observable behavior identifies the issue? -->

Confirmed Cause:
<!-- Leave blank until verified; do not record speculation as fact. -->

Workaround:
<!-- Temporary mitigation, if one exists -->

Resolution:
<!-- Final fix, once verified -->

Last Verified:
YYYY-MM-DD
```

---

# LESSONS.md Template

```markdown
# Lessons Learned

## [Topic]

Context:
<!-- When/where was this lesson learned? -->

Evidence:
<!-- Test result, authoritative source, or repeated verified observation -->

Lesson:
<!-- Record only a conclusion supported by the evidence above -->

Action:
<!-- What should be done differently next time? -->

Verification Status:
<!-- Confirmed / Needs Verification -->

Last Verified:
YYYY-MM-DD
```

Lesson verification and authority are governed by the AI-Memory policy.

---

# Usage

For small projects, a single `PROJECT.md` combining all sections is acceptable.

For larger projects, use separated files for better maintainability and selective loading.

When an Experience Memory result suggests an update, first record it as a Candidate Memory proposal with evidence, validation status, and an exact target file. Apply it only after the policy admission requirements are satisfied.
