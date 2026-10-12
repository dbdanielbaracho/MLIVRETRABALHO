import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const workflow=fs.readFileSync(new URL('../../.github/workflows/project-activity-watch.yml',import.meta.url),'utf8');
const script=workflow.split('          script: |\n')[1].split('\n').map(l=>l.startsWith('            ')?l.slice(12):l).join('\n');
const title='[Activity Watch] Sem commit por mais de 15 minutos';
const sha='0123456789abcdef0123456789abcdef01234567';
const now=Date.parse('2026-10-12T03:00:00Z');
async function run({age=20,issues=[],active=[],failRead=false,observedCalls=[],observedSummary=[]}={}){
 const calls=observedCalls,summary=observedSummary;
 const issueList=async({page=1,per_page=100})=>({data:issues.slice((page-1)*per_page,page*per_page)});
 const github={rest:{
  repos:{getCommit:async()=>{if(failRead)throw Error('API unavailable');return {data:{sha,commit:{committer:{date:new Date(now-age*60000).toISOString()}}}}}},
  pulls:{list:async()=>({data:[]})},
  actions:{listWorkflowRunsForRepo:async()=>({data:{workflow_runs:active}})},
  issues:{listForRepo:issueList,create:async args=>{calls.push(['create',args]);return {data:{number:999}}},createComment:async args=>{calls.push(['comment',args]);return {}},update:async args=>{calls.push(['update',args]);return {}}}
 },paginate:async(method,args)=>{const all=[];for(let page=1;;page++){const r=await method({...args,page});all.push(...r.data);if(r.data.length<args.per_page)return all}}};
 class Clock extends Date {static now(){return now}}
 const core={summary:{addRaw(text){summary.push(text);return this},async write(){}}};
 await new vm.Script('(async()=>{'+script+'})()').runInNewContext({github,core,context:{repo:{owner:'fixture',repo:'MLIVRETRABALHO'},runId:7},Date:Clock});
 return {calls,summary:summary.join('\n')};
}
test('watch smoke opens one stale-commit alert with factual summary and no claim of an active developer',async()=>{
 const r=await run();assert.deepEqual(r.calls.map(c=>c[0]),['create']);assert.match(r.summary,/SEM NOVO COMMIT/);assert.match(r.summary,/não comprova/);assert.match(r.summary,new RegExp(sha));assert.match(r.calls[0][1].body,/não um diagnóstico definitivo/);
});
test('watch smoke avoids repeating an existing stale-commit alert',async()=>{
 const r=await run({issues:[{title,number:19}]});assert.equal(r.calls.length,0);
});
test('watch smoke closes an existing alert only after a recent commit and preserves its exact issue identity',async()=>{
 const r=await run({age:2,issues:[{title,number:19}]});assert.deepEqual(r.calls.map(c=>[c[0],c[1].issue_number]),[['comment',19],['update',19]]);assert.equal(r.calls[1][1].state,'closed');
});
test('watch smoke excludes itself, reports active Actions honestly and keeps stale-commit warning independent',async()=>{
 const r=await run({active:[{id:7,name:'watch',status:'in_progress'},{id:8,name:'CI',status:'queued'}]});assert.match(r.summary,/GitHub Actions ativos: 1/);assert.match(r.summary,/CI\/ACTIONS EM EXECUÇÃO/);assert.match(r.summary,/CI \(queued\)/);assert.equal(r.calls[0][0],'create');
});
test('watch smoke never converts an API read failure into an issue write or successful summary',async()=>{
 const observedCalls=[],observedSummary=[];
 await assert.rejects(run({failRead:true,observedCalls,observedSummary}),/API unavailable/);
 assert.equal(observedCalls.length,0);assert.equal(observedSummary.length,0);
});
test('watch checks all issue pages before creating or closing its single alert',async()=>{
 const issues=Array.from({length:100},(_,i)=>({number:i+1,title:'Other issue '+i})).concat({number:101,title});
 const stale=await run({issues});assert.equal(stale.calls.length,0,'existing alert on page two must prevent duplicate');
 const recent=await run({issues,age:2});assert.deepEqual(recent.calls.map(c=>[c[0],c[1].issue_number]),[['comment',101],['update',101]]);
});
