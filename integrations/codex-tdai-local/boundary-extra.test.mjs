import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createDatabase, startServer, toolCall } from "./test-support.mjs";

function fixture(t) {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),"memory-extra-"));
  createDatabase(path.join(dir,"vectors.db")).close();
  fs.mkdirSync(path.join(dir,"scene_blocks"));
  t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
  return dir;
}
test("COS refuses an allowed filename that hardlinks a non-allowlisted file",async(t)=>{
  const dir=fixture(t), external=path.join(dir,"private.txt");
  fs.writeFileSync(external,"PRIVATE_FIXTURE_MUST_NOT_ESCAPE");
  fs.linkSync(external,path.join(dir,"scene_blocks","alias.md"));
  const client=startServer(dir);
  try{
    const response=await toolCall(client,11,"tdai_read_cos",{path:"scene_blocks/alias.md"});
    assert.equal(response.result.isError,true);
    assert.ok(!JSON.stringify(response).includes("PRIVATE_FIXTURE_MUST_NOT_ESCAPE"));
  }finally{await client.close()}
});
test("oversized MCP input is rejected and the following request still works",async(t)=>{
  const dir=fixture(t), client=startServer(dir);
  try{
    const response=await client.request({jsonrpc:"2.0",id:12,method:"tools/call",params:{name:"tdai_memory_search",arguments:{query:"x".repeat(300*1024)}}});
    assert.equal(response.error?.code,-32600);
    const ping=await client.request({jsonrpc:"2.0",id:13,method:"ping"});
    assert.equal(ping.id,13);assert.deepEqual(ping.result,{});
  }finally{await client.close()}
});
test("test client correlates asynchronous MCP replies by id",async(t)=>{
  const dir=fixture(t);fs.writeFileSync(path.join(dir,"persona.md"),"fixture experience");
  const client=startServer(dir);
  try{
    const [read,ping]=await Promise.all([
      toolCall(client,21,"tdai_read_cos",{path:"persona.md"}),
      client.request({jsonrpc:"2.0",id:22,method:"ping"})
    ]);
    assert.equal(read.id,21);assert.equal(ping.id,22);
    assert.match(read.result.content[0].text,/fixture experience/);
  }finally{await client.close()}
});

test("fallback ranks lexical coverage before its bounded candidate cutoff",async(t)=>{
  const dir=fixture(t),db=new (await import("node:sqlite")).DatabaseSync(path.join(dir,"vectors.db"));
  const put1=db.prepare("INSERT INTO l1_records(record_id,content,session_key,priority,updated_time) VALUES(?,?,?,?,?)");
  const put0=db.prepare("INSERT INTO l0_conversations(record_id,session_key,message_text,timestamp) VALUES(?,?,?,?)");
  put1.run("target","uniqueidentifier uses telemetry port 4321","fixture",1,"2020");
  put0.run("target","fixture","uniqueidentifier uses telemetry port 4321",1);
  for(let n=0;n<200;n++){put1.run("noise"+n,"telemetry port keepalive","fixture",100,"2026");put0.run("noise"+n,"fixture","telemetry port keepalive",100+n)}
  db.exec("DROP TABLE l1_fts; DROP TABLE l0_fts");db.close();
  const client=startServer(dir);
  try{for(const tool of ["tdai_memory_search","tdai_conversation_search"]){
    const response=await toolCall(client,31,tool,{query:"uniqueidentifier telemetry port"});
    assert.ok(response.result.structuredContent.results.some(r=>r.id==="target"));
  }}finally{await client.close()}
});
test("scene candidate cutoff retains the best term coverage when FTS also matches",async(t)=>{
  const dir=fixture(t),db=new (await import("node:sqlite")).DatabaseSync(path.join(dir,"vectors.db"));
  const put=db.prepare("INSERT INTO l1_records(record_id,content,scene_name,session_key,priority) VALUES(?,?,?,?,?)"),fts=db.prepare("INSERT INTO l1_fts(content,record_id) VALUES(?,?)");
  put.run("target","The confirmed fixture decision","uniqueidentifier telemetry port","fixture",1);
  fts.run("The confirmed fixture decision","target");
  for(let n=0;n<200;n++){put.run("noise"+n,"telemetry port keepalive","telemetry port","fixture",100);fts.run("telemetry port keepalive","noise"+n)}
  db.close();const client=startServer(dir);
  try{const response=await toolCall(client,32,"tdai_memory_search",{query:"uniqueidentifier telemetry port"});assert.ok(response.result.structuredContent.results.some(r=>r.id==="target"))}
  finally{await client.close()}
});
