# AI Memory System Manual

> Last updated: 2026-08-18 (V1.0)
> Audience: End user

---

## 1. System Overview

The memory system has **two stores**, each with a clear role:

| | Authoritative Memory (AI-Memory) | Experience Memory (TDAI) |
|---|---|---|
| **Location** | `<your-ai-memory-path>/` | `~/.openclaw/memory-tdai/` |
| **Format** | Git Markdown (human-readable) | SQLite DB + JSONL + Markdown |
| **Stores** | Current facts, rules, architecture, decisions | Conversation history, lessons, evolution |
| **Who writes** | You + AI (after confirmation) | TDAI (automatic extraction) |
| **Can you edit directly** | ✅ Yes, anytime | ❌ Binary DB |
| **Authority** | ✅ Source of truth | ❌ Historical evidence, may be stale |
| **How AI reads** | Reads files as needed for the task | Queries when history might help |

**One line**: AI-Memory tells the AI *what is true now*; TDAI tells it *what happened before*. Confirm the present, then reference the past.

---

## 2. Authoritative Memory (AI-Memory)

### 2.1 File Structure

```
<your-ai-memory-path>/
├── memory/
│   ├── universal-memory.md    # User identity, preferences, communication
│   ├── projects.md            # Project index (location, status snapshot)
│   ├── conventions.md         # Coding standards, debugging workflow, collaboration rules
│   ├── memory-policy.md       # Complete memory management rules (authoritative)
│   └── changelog.md           # Change log
├── templates/                 # Project templates
└── integrations/              # Integration configs
```

### 2.2 Priority Chain

```
Current User Instruction > Governance Memory (AGENTS.md, memory-policy.md) > AI-Memory > TDAI > Raw Conversation
```

### 2.3 When to Read

| Scenario | Read |
|----------|------|
| New session startup | AI-Memory `AGENTS.md` first; `universal-memory.md` only if task needs user background |
| Starting a project | `projects.md` (locate) → project STATUS.md |
| Modifying code | Project `ARCHITECTURE.md`, `DECISIONS.md` |
| Debugging | Project `BUGS.md` |
| Defining conventions | `conventions.md` |

---

## 3. Experience Memory (TDAI)

### 3.1 What It Is

TDAI is an experience memory plugin with **automatic capture, controlled recall**:

- Conversations → automatically stored as L0 (raw)
- Key lessons → automatically extracted as L1 (structured)
- Topics → automatically aggregated as L2 (scene_blocks)
- User profile → automatically updated as L3 (persona.md)
- Auto-extracted results are still candidates, not confirmed facts
- Auto-recall is OFF; AI only queries when history genuinely helps, max 3 results

### 3.2 Where Data Lives

```
~/.openclaw/memory-tdai/
├── conversations/       # L0: raw conversations (daily JSONL)
├── records/             # L1: structured memory (daily JSONL)
├── scene_blocks/        # L2: TDAI-generated scene narratives
├── persona.md           # L3: user profile
├── .metadata/
│   ├── experience_contract.json  # Protected authority boundary contract
│   └── scene_index.json          # Scene index with authority labels
├── vectors.db           # Vector index
└── .backup/             # Automatic backups
```

### 3.3 AI Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `tdai_memory_search` | Search L1 structured memory | When historical experience helps (preferred) |
| `tdai_conversation_search` | Search L0 raw conversations | When you need exact quotes or timeline |
| `tdai_read_cos` | Read L2/L3 files | When you need full scene narrative |

**One search tool per task, max 3 results.** `tdai_read_cos` reads already-located files only.

---

## 4. Flow

### 4.1 What Happens When You Speak

```
You speak
  │
  ├─ TDAI auto-captures: L0 stored, L1/L2/L3 extracted asynchronously
  │
  ├─ AI reads authoritative files needed for the task
  │
  ├─ AI decides if history would help
  │   ├─ No → just work
  │   └─ Yes → one query (tdai_memory_search or tdai_conversation_search)
  │
  ├─ AI validates recall: time, scope, supersession, conflicts
  │
  └─ If long-term candidate found: validate → user auth → write to AI-Memory
```

### 4.2 Conflict Resolution

When TDAI recall conflicts with AI-Memory:

- **Current facts** (project status, architecture, approach) → AI-Memory wins
- **Historical facts** (when something happened, debugging process) → TDAI as historical evidence; verify key conclusions
- **User preferences** → `universal-memory.md` wins

---

## 5. Workspace Files

| File | Purpose | Authoritative? |
|------|---------|----------------|
| `MEMORY.md` | Minimal startup context per session | ❌ Local summary, defer to AI-Memory |
| `memory/YYYY-MM-DD.md` | Daily log | ❌ Disposable |
| `AGENTS.md` | Local agent instructions | ✅ Local governance, defers to memory-policy.md |
| `SOUL.md` | Personality / tone | ✅ Read every session |

---

## 6. Common Scenarios

### Scenario 1: "What did I say about X?"

AI checks if this is a current fact or historical question. For history, uses `tdai_memory_search`.

### Scenario 2: You made a technical decision

TDAI auto-extracts → L1 candidate → AI validates → proposes target file → you approve → written to authoritative memory.

### Scenario 3: "Where is Project X?"

Read `projects.md` → locate project → read project `STATUS.md` for current state.

### Scenario 4: New session startup

AI reads `AGENTS.md` → reads `MEMORY.md` as minimal summary → reads authoritative files as needed → optionally queries TDAI.

---

## 7. Security Rules

- **Never share passwords, API keys, or tokens in conversation**
- TDAI L0 stores raw conversation — cannot rely on auto-filtering
- AI-Memory also must not store credentials

---

_AI-Memory manages the present, TDAI recalls the past. Authority first, history second, validate before promoting._
