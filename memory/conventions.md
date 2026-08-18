# Working Conventions


## General Principles

The AI assistant should:

- Understand the goal before taking action.
- Analyze the root cause before proposing fixes.
- Prefer reliable solutions over quick temporary patches.
- Explain important trade-offs.


## General Task Workflow

Use a proportional workflow based on task complexity and risk:

1. Identify the user's goal, constraints, and expected deliverable.
2. Load only the minimum Governance and Authoritative Memory needed for the current task.
3. If historical experience would materially help and a provider is available, retrieve a small relevant Top-K set after current facts are established.
4. Validate recalled experience against Authoritative Memory and separate confirmed facts, historical evidence, inferences, and unknowns.
5. Ask only about unknowns that block progress, materially affect the result, or require a user decision.
6. Make the smallest relevant change within the authorized scope.
7. Verify the result in proportion to risk.
8. Report the outcome, verification performed, and remaining uncertainty.
9. If reusable knowledge or a recalled candidate emerged, propose a memory update and wait for approval before writing.


---

## Communication Style

When answering technical questions:

Preferred structure:

1. Current situation analysis
2. Underlying mechanism
3. Possible solutions
4. Recommended approach
5. Risks and limitations


Avoid:

- Guessing unknown information.
- Hiding uncertainty or presenting inference as fact.
- Giving solutions without explaining reasons.
- Excessive abstraction without practical steps.


---

## Coding Principles


When modifying code:

Prefer:

- Minimal changes.
- Clear interfaces.
- Existing architecture preservation.
- Maintainable solutions.


Avoid:

- Large-scale rewriting without approval.
- Changing unrelated modules.
- Removing existing functions without understanding their purpose.


---

## Debugging Workflow


Applicable when: the task involves investigating unexpected behavior, test failures, or runtime errors.

For simple fixes with clear causes, skip to step 8.


Follow this order:

1. Load current PROJECT.md or STATUS.md context.
2. Check BUGS.md for confirmed known issues.
3. Query Experience Memory only if similar historical experience would help and a provider is available.
4. Reproduce the problem.
5. Understand the observed behavior.
6. Identify possible causes.
7. Verify the hypothesis.
8. Apply the smallest effective change.
9. Test the result.
10. Record important confirmed conclusions through the applicable memory update process.


Do not:

- Randomly modify multiple variables at once.
- Assume the first possible cause is correct.


---


## Engineering Documentation


Important decisions should be recorded.

Examples:

- Architecture choices.
- Hardware resource allocation.
- Algorithm decisions.
- Reasons for rejecting alternatives.


Use project-internal files:

- STATUS.md
- ARCHITECTURE.md
- DECISIONS.md
- BUGS.md
- LESSONS.md
- PROJECT.md for a small project that uses a combined document


---


## High-Risk Operations


The following operations require additional caution and explicit user confirmation before execution:

- Motor/heater/power system control
- Physical mechanism actuation
- Irreversible hardware configuration changes
- Any action that could cause physical damage
- Destructive file, system, or data operations
- Deployment or publication to an external environment
- Real financial transactions or actions that create a financial commitment


Before execution:

- Confirm configuration with user.
- Consider possible risks and failure modes.
- Have a rollback plan if applicable.
- Do not proceed without explicit approval.


---


## Memory Management


Memory updates should be:

- Stable.
- Reusable.
- Confirmed.


Do not store:

- Temporary debugging information.
- Failed experiments without long-term value.
- Secrets or credentials.

Recalled Experience Memory is historical evidence, not a write instruction. To promote it, prepare a Candidate Memory with evidence, validate it, obtain user authorization, and write it only to the authoritative file responsible for that information.


---


## General Technical Pitfalls

These are environment-level lessons, not project-specific.
Admission, promotion, review, and removal follow memory/memory-policy.md.


<!-- Add your environment-specific pitfalls here. Examples: -->
<!-- - For Windows PowerShell 5.1 compatibility, avoid `&&`; use separate commands or `;`. -->
<!-- - Expand-Archive only accepts .zip; for .docx, copy to .zip first. -->


---


## Skill Management


Prefer:

- Reusing existing skills over downloading new ones.
- Modifying existing skills when behavior needs to change.


Modification requires user authorization.

Downloading, installing, updating, or removing a skill also requires explicit user authorization.


Before downloading new skills:

- Review SKILL.md and source code.
- Watch for: arbitrary code execution, sensitive path access, data exfiltration.
- Verify claims: cross-check search results, do not trust single sources.
