# Working Conventions

These are stable collaboration and engineering conventions. Memory authority, admission, and permission rules are defined in `memory/memory-policy.md`.

## Task Workflow

Use a workflow proportional to task complexity and risk:

1. Identify the goal, constraints, and expected deliverable.
2. Load only the minimum relevant Governance and Authoritative Memory.
3. Retrieve a small Experience Memory result set only when history materially helps.
4. Separate confirmed facts, historical evidence, inferences, and unknowns.
5. Ask only about unknowns that block progress, materially change the result, or require a user decision.
6. Make the smallest relevant change within the authorized scope.
7. Verify the result in proportion to risk.
8. Report the outcome, verification, and remaining uncertainty.
9. Propose any reusable memory update and wait for approval before writing.

## Communication

- Lead with the outcome, then explain the reasoning and important trade-offs.
- Use plain language and enough technical detail for the audience.
- State unknowns and assumptions explicitly.
- Prefer concrete recommendations, commands, and examples over abstract advice.
- Keep routine reports concise; expand when risk, ambiguity, or learning value warrants it.

## Coding

Prefer:

- Minimal, focused changes.
- Clear interfaces and existing architecture preservation.
- Maintainable solutions over temporary patches.
- Root-cause understanding before modification.

Avoid:

- Unapproved broad rewrites.
- Unrelated changes.
- Removing behavior before understanding its purpose.
- Changing several diagnostic variables at once.

## Debugging

For non-trivial failures:

1. Load current `PROJECT.md` or `STATUS.md` context.
2. Check `BUGS.md` for confirmed known issues.
3. Retrieve historical experience only if it could add useful evidence.
4. Reproduce and describe the observed behavior.
5. Form a hypothesis and verify it.
6. Apply the smallest effective fix.
7. Test the result and record only confirmed reusable conclusions.

For a simple issue with an obvious verified cause, skip unnecessary ceremony and fix it directly.

## Engineering Documentation

Record important confirmed information in the project file responsible for it:

| Information | Source |
|---|---|
| Current state and blockers | `STATUS.md` |
| System design and interfaces | `ARCHITECTURE.md` |
| Decisions and rejected alternatives | `DECISIONS.md` |
| Confirmed issues | `BUGS.md` |
| Verified reusable lessons | `LESSONS.md` |
| Small combined project | `PROJECT.md` |

## High-Risk Work

Approval requirements are defined in `AGENTS.md` and the memory policy. Before an authorized high-risk action, confirm the exact target and configuration, consider failure modes, and keep a rollback path when practical.

## Skill Review

Prefer reusing an existing skill. Before an authorized skill installation or update, inspect its instructions and source for arbitrary execution, sensitive-path access, data exfiltration, and unsupported claims.

## Extending These Conventions

Add only confirmed, stable, cross-project conventions. Keep project-specific lessons in the project that verified them.
