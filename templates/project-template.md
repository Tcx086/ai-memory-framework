# Project Documentation Templates

Use separate files for selective loading, or combine the same sections into `PROJECT.md` for a small project. Each file is authoritative only for its assigned responsibility.

## STATUS.md

```markdown
# Project Status

- **State:** Planning / Development / Testing / Completed / Archived
- **Last updated:** YYYY-MM-DD
- **Current goal:**
- **Blockers:**

## Recent Changes

-
```

## ARCHITECTURE.md

```markdown
# Architecture

## Overview

<!-- Describe the system and its boundaries. -->

## Technology

- Hardware:
- Software:
- Frameworks:

## Components

| Component | Responsibility |
|---|---|
| | |

## Interfaces and Resources

<!-- APIs, protocols, pin mappings, ports, or other allocations. -->
```

## DECISIONS.md

```markdown
# Decisions

## [Decision title]

- **Date:** YYYY-MM-DD
- **Status:** Active / Superseded / Deprecated
- **Context:**
- **Decision:**
- **Reason:**
- **Alternatives considered:**
- **Supersedes / replaced by:**
```

When a decision changes, preserve the history and link its replacement.

## BUGS.md

```markdown
# Known Issues

## [Issue title]

- **Status:** Open / Investigating / Resolved / Won't Fix
- **Symptoms:**
- **Confirmed cause:** <!-- Leave blank until verified. -->
- **Workaround:**
- **Resolution:**
- **Last verified:** YYYY-MM-DD
```

Keep unverified symptoms and hypotheses outside `BUGS.md` until validated.

## LESSONS.md

```markdown
# Lessons Learned

## [Topic]

- **Context:**
- **Evidence:**
- **Lesson:**
- **Action:**
- **Verification:** Confirmed / Needs Verification
- **Last verified:** YYYY-MM-DD
```

Only confirmed lessons are authoritative. A recalled Experience Memory item must pass validation and user-authorized promotion before entering any project file.
