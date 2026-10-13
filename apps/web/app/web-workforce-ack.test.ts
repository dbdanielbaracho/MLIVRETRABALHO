import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {stripTypeScriptTypes} from 'node:module';
import {confirmsCandidateAssignment,confirmsTalentAddition,confirmsTalentRemoval} from './workforce-ack.ts';
import {isAdminRole,isCompanyRole,tenantHeaders} from './web-contract.ts';
const JOB='11111111-2222-4333-8444-555555555555',PRO='abcdef12-2222-4333-8444-777777777777',ASSIGNMENT='99999999-8888-4777-8666-555555555555',TENANT='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
const source=fs.readFileSync(new URL('./page.tsx',import.meta.url),'utf8'),prefix=source.slice(0,source.indexOf('  if(!session)return <main')).replace(/^import .*;\n/gm,'').replace('export default function Home(){','function Home(){');
const js=stripTypeScriptTypes(prefix+'\nreturn {confirmCandidate,addTalentPool,removeTalentPool};\n}\nHome();',{mode:'strip'});
async function invoke(handler:string,ack:unknown,ok=true,status=201,failure?:'network'|'json'){
const values:any[]=[],calls:any[]=[];let cursor=0;
const session={accessToken:'token',identity:{id:'identity'},memberships:[{tenantId:TENANT,role:'owner'}]};
class Data{get(name:string){return name==='professionalId'?PRO:name==='pool'?'preferred':null}}
const useState=(initial:any)=>{const index=cursor++;const v=index===0?session:index===1?TENANT:index===7?JOB:initial;values[index]=v;return[v,(next:any)=>values[index]=typeof next==='function'?next(values[index]):next];};
const h=vm.runInNewContext(js,{useState,useRef:(initial:any)=>({current:initial}),useLayoutEffect:(fn:()=>unknown)=>fn(),useMemo:(fn:()=>unknown)=>fn(),useEffect(){},setTimeout,clearTimeout,FormData:Data,confirmsCandidateAssignment,confirmsTalentAddition,confirmsTalentRemoval,isAdminRole,isCompanyRole,tenantHeaders,process:{env:{}},fetch:async(url:string,options:any)=>{calls.push({url,options});if(failure==='network')throw new Error('lost transport');return{ok,status,json:async()=>{if(failure==='json')throw new Error('lost JSON');return ack}}}});
await(handler==='addTalentPool'?h[handler]({preventDefault(){},currentTarget:{}}):handler==='removeTalentPool'?h[handler]('preferred',PRO):h[handler](PRO));return{values,calls};}
const assignmentAck={id:ASSIGNMENT,jobId:JOB,professionalId:PRO,tenantId:TENANT,status:'confirmed',confirmedAt:'2026-10-12T12:00:00Z'};
test('Web candidate confirmation cannot refresh on fabricated or mismatched assignment ACK',async()=>{
for(const ack of [{},{...assignmentAck,id:'fake'},{...assignmentAck,jobId:'other'},{...assignmentAck,professionalId:'other'},{...assignmentAck,tenantId:'other'},{...assignmentAck,status:'cancelled'}]){
const h=await invoke('confirmCandidate',ack);assert.equal(h.values[23],0);assert.match(h.values[21],/não foi confirmada/);assert.equal(h.calls.length,1);assert.equal(h.values[7],JOB);
}});
test('Web talent pool addition requires exact professional and pool ACK',async()=>{
for(const ack of [{},{professionalId:'other',pool:'preferred'},{professionalId:PRO,pool:'network'},null,[]]){
const h=await invoke('addTalentPool',ack);assert.equal(h.values[23],0);assert.match(h.values[21],/não foi confirmada/);assert.equal(h.calls.length,1);
}});
test('Web talent pool removal cannot refresh without removed true ACK',async()=>{
for(const ack of [{},{removed:false},{removed:'true'},null,[]]){
const h=await invoke('removeTalentPool',ack,true,200);assert.equal(h.values[23],0);assert.match(h.values[21],/não foi confirmada/);assert.equal(h.calls.length,1);
}});
test('Web legitimate candidate confirmation and talent pool operations preserve payload headers methods and one refresh',async()=>{
for(const [handler,ack,method]of [['confirmCandidate',assignmentAck,'POST'],['addTalentPool',{professionalId:PRO,pool:'preferred'},'POST'],['removeTalentPool',{removed:true},'DELETE']] as const){
const h=await invoke(handler,ack);assert.equal(h.values[23],1);assert.equal(h.values[21],'');assert.equal(h.calls.length,1);assert.equal(h.calls[0].options.method,method);assert.equal(h.calls[0].options.headers['x-tenant-id'],TENANT);assert.equal(h.calls[0].options.headers.Authorization,'Bearer token');
if(method==='POST')assert.deepEqual(JSON.parse(h.calls[0].options.body),handler==='addTalentPool'?{professionalId:PRO,pool:'preferred'}:{professionalId:PRO});
}});

test('workforce ACKs preserve idempotent canonical responses and reject malformed UUIDs or fields',()=>{
assert.equal(confirmsCandidateAssignment(assignmentAck,JOB,PRO,TENANT),true);
assert.equal(confirmsCandidateAssignment({...assignmentAck,id:'fake'},JOB,PRO,TENANT),false);
assert.equal(confirmsTalentAddition({professionalId:PRO,pool:'preferred'},PRO,'preferred'),true);
assert.equal(confirmsTalentAddition({professionalId:'fake',pool:'preferred'},'fake','preferred'),false);
assert.equal(confirmsTalentRemoval({removed:true}),true);
for(const ack of [null,[],{},true]){assert.equal(confirmsCandidateAssignment(ack,JOB,PRO,TENANT),false);assert.equal(confirmsTalentAddition(ack,PRO,'preferred'),false);assert.equal(confirmsTalentRemoval(ack),false);}
});
test('workforce HTTP errors preserve explicit status with one call and no refresh',async()=>{
for(const handler of ['confirmCandidate','addTalentPool','removeTalentPool'])for(const status of [400,401,403,404,409,429,500]){
const h=await invoke(handler,{},false,status);assert.equal(h.values[23],0);assert.equal(h.values[21],'HTTP '+status);assert.equal(h.calls.length,1);
}});
test('workforce transport and JSON loss stay uncertain without refresh or retry',async()=>{
for(const handler of ['confirmCandidate','addTalentPool','removeTalentPool'])for(const failure of ['network','json'] as const){
const h=await invoke(handler,{},true,201,failure);assert.equal(h.values[23],0);assert.ok(h.values[21]);assert.equal(h.calls.length,1);assert.equal(h.values[22],false);
}});

