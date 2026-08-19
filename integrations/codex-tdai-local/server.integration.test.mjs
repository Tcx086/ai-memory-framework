import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { spawn } from "node:child_process";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

const SERVER_PATH = path.join(import.meta.dirname, "server.mjs");

function createFixture() {
  const dataDir = mkdtempSync(path.join(import.meta.dirname, "tdai-test-"));
  const dbPath = path.join(dataDir, "vectors.db");
  const db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE l1_records (
      record_id TEXT PRIMARY KEY, content TEXT NOT NULL, type TEXT DEFAULT '', priority INTEGER DEFAULT 50,
      scene_name TEXT DEFAULT '', session_key TEXT DEFAULT '', session_id TEXT DEFAULT '', timestamp_str TEXT DEFAULT '',
      timestamp_start TEXT DEFAULT '', timestamp_end TEXT DEFAULT '', created_time TEXT DEFAULT '', updated_time TEXT DEFAULT '',
      metadata_json TEXT DEFAULT '{}'
    );
    CREATE VIRTUAL TABLE l1_fts USING fts5(
      content, content_original UNINDEXED, record_id UNINDEXED, type UNINDEXED, priority UNINDEXED,
      scene_name UNINDEXED, session_key UNINDEXED, session_id UNINDEXED, timestamp_str UNINDEXED,
      timestamp_start UNINDEXED, timestamp_end UNINDEXED, metadata_json UNINDEXED
    );
    CREATE TABLE l0_conversations (
      record_id TEXT PRIMARY KEY, session_key TEXT NOT NULL, session_id TEXT DEFAULT '', role TEXT NOT NULL DEFAULT '',
      message_text TEXT NOT NULL, recorded_at TEXT DEFAULT '', timestamp INTEGER DEFAULT 0
    );
    CREATE VIRTUAL TABLE l0_fts USING fts5(
      message_text, message_text_original UNINDEXED, record_id UNINDEXED, session_key UNINDEXED,
      session_id UNINDEXED, role UNINDEXED, recorded_at UNINDEXED, timestamp UNINDEXED
    );
  `);

  const insertL1 = db.prepare(`INSERT INTO l1_records (
    record_id, content, type, priority, scene_name, session_key, session_id, timestamp_str,
    timestamp_start, timestamp_end, created_time, updated_time, metadata_json
  ) VALUES (?, ?, ?, ?, ?, 'fixture', 'fixture', ?, ?, ?, ?, ?, '{}')`);
  const insertL1Fts = db.prepare(`INSERT INTO l1_fts (
    content, content_original, record_id, type, priority, scene_name, session_key, session_id,
    timestamp_str, timestamp_start, timestamp_end, metadata_json
  ) VALUES (?, ?, ?, ?, ?, ?, 'fixture', 'fixture', ?, ?, ?, '{}')`);
  const insertL0 = db.prepare("INSERT INTO l0_conversations VALUES (?, 'fixture', 'fixture', 'user', ?, ?, ?)");
  const insertL0Fts = db.prepare("INSERT INTO l0_fts VALUES (?, ?, ?, 'fixture', 'fixture', 'user', ?, ?)");

  function addL1(id, content, scene, stamp, type = "episodic", priority = 60) {
    insertL1.run(id, content, type, priority, scene, stamp, stamp, stamp, stamp, stamp);
    insertL1Fts.run(content, content, id, type, priority, scene, stamp, stamp, stamp);
  }

  function addL0(id, content, stamp, timestamp) {
    insertL0.run(id, content, stamp, timestamp);
    insertL0Fts.run(content, content, id, stamp, timestamp);
  }

  addL1("seed-memory", "SCARA STM32 test memory", "fixture", "2026-01-01");
  addL0("seed-conversation", "SCARA STM32 test conversation", "2026-01-01", 1);
  addL1("old-exact-memory", "alpha beta", "ranking fixture", "2020-01-01");
  addL0("old-exact-conversation", "alpha beta", "2020-01-01", 0);
  addL1("global-instruction", "global coding rule required", "priority fixture", "2020-01-01", "instruction", -1);
  addL1("ordinary-instruction", "global coding rule optional", "priority fixture", "2026-01-01", "instruction", 100);

  for (let index = 0; index < 101; index++) {
    const stamp = `2026-01-01T00:${String(index).padStart(3, "0")}:00Z`;
    addL1(`recent-partial-memory-${index}`, `alpha filler ${index}`, "ranking fixture", stamp);
    addL0(`recent-partial-conversation-${index}`, `alpha filler ${index}`, stamp, index + 100);
  }
  db.close();
  return { dataDir, dbPath };
}

function startServer(dataDir) {
  const child = spawn(process.execPath, [SERVER_PATH], {
    env: { ...process.env, TDAI_DATA_DIR: dataDir },
    stdio: ["pipe", "pipe", "pipe"],
  });
  const lines = readline.createInterface({ input: child.stdout, crlfDelay: Infinity });
  const pending = [];
  let stderr = "";
  child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
  lines.on("line", (line) => pending.shift()?.resolve(JSON.parse(line)));

  return {
    request(message) {
      return new Promise((resolve) => {
        pending.push({ resolve });
        child.stdin.write(`${JSON.stringify(message)}\n`);
      });
    },
    async close() {
      child.stdin.end();
      await new Promise((resolve) => child.once("exit", resolve));
      assert.equal(stderr.trim(), "", "server should produce no stderr output");
    },
  };
}

function toolCall(client, id, name, args) {
  return client.request({ jsonrpc: "2.0", id, method: "tools/call", params: { name, arguments: args } });
}

// ── Tests ────────────────────────────────────────────────────────────────────

test("initialize returns correct protocol version and server info", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const init = await client.request({
      jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "1900-01-01" },
    });
    assert.equal(init.result.protocolVersion, "2025-03-26");
    assert.equal(init.result.serverInfo.name, "tdai-memory-local");
    assert.equal(init.result.serverInfo.version, "1.1.0");
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tools/list returns all 4 tools", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const list = await client.request({ jsonrpc: "2.0", id: 2, method: "tools/list" });
    const names = list.result.tools.map((t) => t.name);
    assert.ok(names.includes("tdai_memory_search"));
    assert.ok(names.includes("tdai_conversation_search"));
    assert.ok(names.includes("tdai_read_cos"));
    assert.ok(names.includes("tdai_experience_store"));
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tdai_memory_search returns real results from SQLite", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const res = await toolCall(client, 3, "tdai_memory_search", { query: "SCARA STM32", limit: 3 });
    assert.ok(res.result.structuredContent.results.length > 0, "should return results");
    assert.equal(res.result.structuredContent.results[0].id, "seed-memory");
    assert.equal(res.result.structuredContent.retrieval, "fts5");
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tdai_conversation_search returns real results from SQLite", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const res = await toolCall(client, 4, "tdai_conversation_search", { query: "SCARA STM32", limit: 3 });
    assert.ok(res.result.structuredContent.results.length > 0, "should return results");
    assert.equal(res.result.structuredContent.results[0].id, "seed-conversation");
    assert.equal(res.result.structuredContent.retrieval, "fts5");
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("search ranking: exact match scores higher", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const mem = await toolCall(client, 5, "tdai_memory_search", { query: "alpha beta", limit: 3 });
    assert.equal(mem.result.structuredContent.results[0].id, "old-exact-memory");

    const conv = await toolCall(client, 6, "tdai_conversation_search", { query: "alpha beta", limit: 3 });
    assert.equal(conv.result.structuredContent.results[0].id, "old-exact-conversation");
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("priority -1 (global instruction) gets a boost", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const res = await toolCall(client, 12, "tdai_memory_search", { query: "global coding rule", limit: 3 });
    assert.equal(res.result.structuredContent.results[0].id, "global-instruction");
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tdai_experience_store rejects without authorization flags", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const res = await toolCall(client, 7, "tdai_experience_store", { content: "Confirmed reusable test memory." });
    assert.equal(res.result.isError, true);
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tdai_experience_store rejects sensitive content", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const admission = { user_authorized: true, confirmed: true, stable: true, reusable: true };
    const res = await toolCall(client, 8, "tdai_experience_store", {
      ...admission,
      content: "Fake github_pat_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA must never persist.",
    });
    assert.equal(res.result.isError, true);
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tdai_experience_store rejects sensitive scene_name", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const admission = { user_authorized: true, confirmed: true, stable: true, reusable: true };
    const res = await toolCall(client, 9, "tdai_experience_store", {
      ...admission,
      content: "This otherwise safe reusable memory has enough text.",
      scene_name: "password=abcdefghijk",
    });
    assert.equal(res.result.isError, true);
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tdai_experience_store stores valid experience and detects duplicates", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const admission = { user_authorized: true, confirmed: true, stable: true, reusable: true };
    const valid = {
      ...admission,
      content: "Confirmed stable reusable integration fixture memory.",
      scene_name: "integration fixture",
    };
    const stored = await toolCall(client, 10, "tdai_experience_store", valid);
    assert.equal(stored.result.structuredContent.stored, true);

    const duplicate = await toolCall(client, 11, "tdai_experience_store", valid);
    assert.equal(duplicate.result.structuredContent.duplicate, true);

    const verify = new DatabaseSync(fixture.dbPath, { readOnly: true });
    assert.equal(verify.prepare("SELECT COUNT(*) AS n FROM l1_records WHERE scene_name = 'integration fixture'").get().n, 1);
    assert.equal(verify.prepare("SELECT COUNT(*) AS n FROM l1_fts WHERE scene_name = 'integration fixture'").get().n, 1);
    verify.close();
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tdai_read_cos rejects absolute paths", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const res = await toolCall(client, 20, "tdai_read_cos", { path: "/etc/passwd" });
    assert.equal(res.result.isError, true);
    assert.ok(res.result.content[0].text.includes("Access denied"));
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("tdai_read_cos rejects '..' traversal", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const res = await toolCall(client, 21, "tdai_read_cos", { path: "../../../etc/passwd" });
    assert.equal(res.result.isError, true);
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("unknown method returns error, does not crash", async () => {
  const fixture = createFixture();
  const client = startServer(fixture.dataDir);
  try {
    const res = await client.request({ jsonrpc: "2.0", id: 99, method: "nonexistent/method" });
    assert.equal(res.error.code, -32601);
  } finally {
    await client.close();
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});

test("malformed JSON does not crash the server", async () => {
  const fixture = createFixture();
  const child = spawn(process.execPath, [SERVER_PATH], {
    env: { ...process.env, TDAI_DATA_DIR: fixture.dataDir },
    stdio: ["pipe", "pipe", "pipe"],
  });
  const lines = readline.createInterface({ input: child.stdout, crlfDelay: Infinity });
  let stderr = "";
  child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

  try {
    // Send malformed JSON — server should reply with parse error, not crash
    child.stdin.write("not valid json\n");

    // Collect both responses: first is parse error, second is ping
    const responses = [];
    const onLine = new Promise((resolve) => {
      lines.on("line", (line) => {
        responses.push(JSON.parse(line));
        if (responses.length >= 2) resolve();
      });
    });
    child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id: 1, method: "ping" })}\n`);
    await onLine;

    assert.equal(responses[0].error.code, -32700, "first response should be parse error");
    assert.deepEqual(responses[1].result, {}, "second response should be ping result");
  } finally {
    child.stdin.end();
    await new Promise((resolve) => child.once("exit", resolve));
    assert.equal(stderr.trim(), "", "server should produce no stderr output");
    rmSync(fixture.dataDir, { recursive: true, force: true });
  }
});
