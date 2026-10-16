# Follow-up: project isolation, free answers and endurance

This is a follow-up to the [original comprehensive campaign](../2026-10-16-comprehensive/README.md). All data are fictional fixtures. Host source/workspaces remain unchanged; code, runtime state and reports stay in Docker volumes.

## Completed checks

- New default deployment: independent Compose project, state/workspace/configuration volumes and network per trust boundary; random per-project Gateway token, no host/socket mounts or published host ports, non-root read-only Gateway, bounded CPU/memory. An offline bootstrap owns only its own config volume. Actual generated bundles were built and run, including the required official OpenClaw build-time lifecycle and private cache tmpfs. TDAI's postinstall patch is never run.
- Both projects captured real L0 and L1 through OpenClaw 2026.10.4 / TDAI 1.0.3 / DeepSeek Flash. Native memory and conversation queries pass local positive and peer negative checks in both directions. Native object-storage persona/scene sentinel reads are isolated too. Mount and resource inspection is archived.
- Final local unit suite: 48 passed, zero failed/skipped. Original benchmark and 10,000-record FTS5/LIKE/concurrent-write/locking/corruption/promotion recovery suite passed again.
- A dedicated 64 MiB tmpfs was filled until actual ENOSPC. SQLite writes failed safely; deleting the owned synthetic filler restored successful writes in the same MCP process.
- Frozen free-answer evaluation: 24 distinct authored scenarios, identical actual scoped MCP retrieval and Markdown evidence for baseline/policy, six requests, 48 answers. Both conditions: exact answer value 23/24; combined exact answer/status/citation score 22/24; invented citations zero. No measured accuracy uplift.

## Interpreting the two scoring deductions

Both conditions correctly report uncertainty for OPAL's unconfirmed old retention suggestion, but cite the old source to explain that uncertainty. The predeclared exact citation-set label expects no citation, so this is a strict scoring deduction, not evidence that the model adopted the old fact.

Both conditions fail the end-to-end semantic case: the fixed lexical query “restore deployment” does not retrieve “rollback succeeded with revision flint-r4”. They abstain rather than invent the revision. No synonym special case or labels were added after evaluation. This framework's lexical adapter does not promise semantic search; an actual host can choose an appropriate paraphrase query, or a separately validated semantic retriever is required.

The 24 questions were authored by the implementer and are now public. This is a new frozen test, not private independent expert validation. A single paired trial does not establish general accuracy gains.

## Initial failures retained

The first explicitly fictional capture wording reached L0 but was filtered to zero L1 by the native extractor. The raw ACK turn is retained; a subsequent explicit confirmed engineering fixture produced L1. This is not counted as a successful first extraction.

The first native object-file probe wrote fixtures at the pipeline root, while native read_cos resolves the distinct cos-storage root. The corrected storage-isolation fixture uses both actual roots. It does not prove native read_cos consumes pipeline-generated profiles. The framework MCP adapter remains the supported reader for those profiles; no symlink bridge or vendor patch was introduced.

## Genuine 72-hour campaign

Status: **pending** until both project checkpoints report complete, passed and at least 259,200 observed seconds. The final machine-readable status lives in endurance-status.json when archived. No multi-day pass is claimed by this initial report.

A 120-observed-second preflight first exercises repeated forced Gateway process-group kills and MCP restarts. Each project then runs health/native positive-and-negative retrieval, scoped synthetic MCP write/search, authority-hash stability and periodic SQLite/FTS integrity checks. Recovery occurs every six observed hours. At days one and two a bounded real Agent turn must persist fresh L0/L1. Whole-container cgroup memory samples and OOM counters are retained. No model retry is automatic after an interrupted checkpoint.

Long pauses and planned recovery do not count toward healthy observed duration; completion may be later than 72 wall-clock hours. Keep Docker Desktop and the machine running. A local monitor will collect final results, verify source/artifact hashes, update the existing PR and stop the testing services. Ordinary CI performs no paid or long-running tests.

This tests a single Linux Docker host and idle/retrieval recovery; it does not establish real-user accuracy, multi-host/ARM support, native Windows Gateway ACL behavior or guaranteed recovery of every possible model extraction interruption.

## Budget and evidence

The previous cumulative ledger is preserved: starting calls 302, reservation 81.94567 RMB, one old interrupted request without usage. This follow-up allows at most 24 additional calls (326 cumulative), retains the 90 RMB conservative reservation ceiling below the user's 100 RMB authorization, and renews only expiry for this campaign. Proxy and model containers have no real key in their configuration; the private proxy UID/volume retains it.

Reservation is not spending. The dated token-based estimate, missing-usage allowance and software/container/artifact identities are recorded in the machine-readable evidence. No account bill or balance is inferred.

See [reproduction and interpretation](../../tests/comprehensive/FOLLOWUP.md) and [deployment guide](../../integrations/openclaw-tdai-local/PROJECT-ISOLATION.md). Initial and final artifacts are accompanied by a SHA-256 manifest.
