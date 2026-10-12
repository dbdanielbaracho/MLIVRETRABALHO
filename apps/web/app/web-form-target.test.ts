import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {confirmSafetyStatus} from './safety-status-ack.ts';
import {publishCompanyTeam} from './team-publication.ts';
import {publishCompanyJob} from './job-publication.ts';
import {stripTypeScriptTypes} from 'node:module';
import {isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders} from './web-contract.ts';
const source=fs.readFileSync(new URL('./page.tsx',import.meta.url),'utf8');
const prefix=source.slice(0,source.indexOf('  if(!session)return <main')).replace(/^import .*;\n/gm,'').replace('export default function Home(){','function Home(){');
const js=stripTypeScriptTypes(prefix+'\n return {createJob,createTeam,addTeamMember,removeTeamMember,confirmCandidate,updateSafetyCase,updateSafetyAppeal,requestReplacement,selectReplacement,addTalentPool,removeTalentPool};\n}\nHome();',{mode:'strip'});
async function invoke(handler:string,ok=true,ackOverride?:unknown){
 const values:any[]=[],pending:any[]=[],calls:any[]=[];let cursor=0,resets=0;
 const session={accessToken:'token',identity:{id:'identity',email:'fixture'},memberships:[{tenantId:'tenant',role:'owner'}]};
 const fields:Record<string,string>={title:'Fixture',requiredRole:'waiter',name:'Fixture team',location:'Fixture',workCity:'Fixture',startsAt:'2026-10-20T12:00',endsAt:'2026-10-20T16:00',payReais:'12.34',caseId:'abcdef12-2222-4333-8444-555555555555',appealId:'abcdef12-2222-4333-8444-555555555555',status:'reviewing',note:'Fixture note',professionalId:'abcdef12-2222-4333-8444-777777777777',pool:'priority'};
 const form={reset(){resets++}};
 class Data{constructor(target:unknown){assert.equal(target,form)}get(key:string){return fields[key]??null}}
 const useState=(initial:any)=>{const index=cursor++;values[index]=initial;return [index===0?session:index===1?'tenant':initial,(value:any)=>{values[index]=typeof value==='function'?value(values[index]):value}];};
 const handlers=vm.runInNewContext(js,{useState,useRef:(initial:unknown)=>({current:initial}),useLayoutEffect:(fn:()=>unknown)=>fn(),useMemo:(fn:()=>unknown)=>fn(),useEffect(){},fetch:(url:string,options:any)=>{calls.push({url,options});return new Promise(resolve=>pending.push(resolve))},FormData:Data,process:{env:{}},publishCompanyJob,publishCompanyTeam,confirmSafetyStatus,isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders});
 const event:{currentTarget:unknown;preventDefault:()=>void}={currentTarget:form,preventDefault(){}};
 const done=handlers[handler](event);
 // The React19.1.4 dispatcher clears currentTarget immediately after listener(event) returns.
 event.currentTarget=null;
 assert.equal(pending.length,1);
 pending[0]({ok,status:ok?201:500,json:async()=>ackOverride??(handler==='createJob'?{id:'abcdef12-2222-4333-8444-555555555555',...JSON.parse(calls[0].options.body),status:'open',engagementModality:'gig'} :handler==='createTeam'?{id:'abcdef12-2222-4333-8444-555555555555',name:'Fixture team'}:{id:'abcdef12-2222-4333-8444-555555555555',status:'reviewing',changed:true})});
 await done;
 return {values,calls,resets};
}
for(const [handler,path] of [['createJob','/v1/company/jobs'],['createTeam','/v1/company/teams'],['updateSafetyCase','/v1/company/safety-cases/abcdef12-2222-4333-8444-555555555555/status'],['updateSafetyAppeal','/v1/company/safety-appeals/abcdef12-2222-4333-8444-555555555555/status']]){
 test(handler+' captures the submitted form before await; a successful API response resets once and refreshes instead of reporting failure',async()=>{
  const r=await invoke(handler);assert.equal(r.resets,1);assert.equal(r.values[21],'');assert.equal(r.values[22],false);assert.equal(r.values[23],1);assert.equal(r.calls.length,1);assert.ok(r.calls[0].url.endsWith(path));assert.equal(r.calls[0].options.method,'POST');assert.equal(r.calls[0].options.headers['x-tenant-id'],'tenant');
  const fail=await invoke(handler,false);assert.equal(fail.resets,0);assert.equal(fail.values[23],0);assert.equal(fail.values[21],'HTTP 500');assert.equal(fail.calls.length,1);
 });
}

test('createJob preserves the form and reports an unconfirmed result when HTTP201 does not acknowledge the submitted job',async()=>{
 for(const ack of [{id:'fake'}, {id:'abcdef12-2222-4333-8444-555555555555',title:'Other'}]){
  const r=await invoke('createJob',true,ack);assert.equal(r.resets,0);assert.equal(r.values[23],0);assert.match(r.values[21],/não foi confirmada/);assert.equal(r.calls.length,1);
 }
});

test('createTeam preserves the form when HTTP201 has no canonical team ACK',async()=>{
 for(const ack of [{id:'fake'}, {id:'abcdef12-2222-4333-8444-555555555555',name:'Other'}]){
  const r=await invoke('createTeam',true,ack);assert.equal(r.resets,0);assert.equal(r.values[23],0);assert.match(r.values[21],/não foi confirmada/);assert.equal(r.calls.length,1);
 }
});

for(const handler of ['updateSafetyCase','updateSafetyAppeal']){
 test(handler+' preserves the review form when HTTP201 does not confirm the requested safety status',async()=>{
  for(const ack of [{id:'fake'},{id:'abcdef12-2222-4333-8444-555555555555',status:'Other',changed:true}]){
   const r=await invoke(handler,true,ack);assert.equal(r.resets,0);assert.equal(r.values[23],0);assert.match(r.values[21],/não foi confirmada/);assert.equal(r.calls.length,1);
  }
 });
}

function contextHarness(){
 const values:any[]=[],refs:{current:any}[]=[],pending:any[]=[],calls:any[]=[];let stateCursor=0,refCursor=0,resets=0,tenant='tenant-a',role='owner',token='token-a',signedIn=true,layoutCleanup:unknown,layoutSetup:(()=>unknown)|undefined;
 const fields:Record<string,string>={title:'Fixture',requiredRole:'waiter',name:'Fixture team',location:'Fixture',workCity:'Fixture',startsAt:'2026-10-20T12:00',endsAt:'2026-10-20T16:00',payReais:'12.34',caseId:'abcdef12-2222-4333-8444-555555555555',appealId:'abcdef12-2222-4333-8444-555555555555',status:'reviewing',note:'Fixture note',professionalId:'abcdef12-2222-4333-8444-777777777777',pool:'priority'};
 const form={reset(){resets++}};
 class Data{constructor(target:unknown){assert.equal(target,form)}get(key:string){return fields[key]??null}}
 const effects:(()=>unknown)[]=[];
 const render=()=>{
  stateCursor=0;refCursor=0;effects.length=0;
  const session=signedIn?{accessToken:token,identity:{id:'identity',email:'fixture'},memberships:[{tenantId:tenant,role}]}:null;
  const useState=(initial:any)=>{const index=stateCursor++;if(!(index in values))values[index]=initial;return [index===0?session:index===1?(signedIn?tenant:''):index===7?'job-id':index===12?'team-id':index===15?'replacement-id':values[index],(value:any)=>{values[index]=typeof value==='function'?value(values[index]):value}];};
  const useRef=(initial:any)=>{const index=refCursor++;return refs[index]??(refs[index]={current:initial})};
  const layouts:(()=>unknown)[]=[];
  const handlers=vm.runInNewContext(js,{useState,useRef,useLayoutEffect:(fn:()=>unknown)=>layouts.push(fn),useMemo:(fn:()=>unknown)=>fn(),useEffect:(fn:()=>unknown)=>effects.push(fn),fetch:(url:string,options:any)=>{calls.push({url,options});return new Promise(resolve=>pending.push(resolve))},FormData:Data,process:{env:{}},publishCompanyJob,publishCompanyTeam,confirmSafetyStatus,isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders});
  if(typeof layoutCleanup==='function')layoutCleanup();layoutSetup=layouts[0];layoutCleanup=layoutSetup?.();
  return handlers;
 };
 const start=(handler:string)=>{const handlers=render();const event={currentTarget:form,preventDefault(){}};const done=handler==='removeTeamMember'?handlers[handler]('abcdef12-2222-4333-8444-777777777777'):handler==='confirmCandidate'||handler==='selectReplacement'?handlers[handler]('abcdef12-2222-4333-8444-777777777777'):handler==='requestReplacement'?handlers[handler]('assignment-id'):handler==='removeTalentPool'?handlers[handler]('priority','abcdef12-2222-4333-8444-777777777777'):handlers[handler](event);assert.equal(pending.length,1);return done};
 const resolve=(handler:string,ok:boolean)=>pending.shift()({ok,status:ok?201:500,json:async()=>handler==='createJob'?{id:'abcdef12-2222-4333-8444-555555555555',...JSON.parse(calls[0].options.body),status:'open',engagementModality:'gig'}:handler==='createTeam'?{id:'abcdef12-2222-4333-8444-555555555555',name:'Fixture team'}:handler==='requestReplacement'?{id:'replacement-ack'}:{id:'abcdef12-2222-4333-8444-555555555555',status:'reviewing',changed:true}});
 return {values,calls,effects,render,start,resolve,setTenant(value:string){tenant=value},setRole(value:string){role=value},setToken(value:string){token=value},signout(){signedIn=false},strictReplay(){if(typeof layoutCleanup==='function')layoutCleanup();layoutCleanup=layoutSetup?.()},unmount(){if(typeof layoutCleanup==='function')layoutCleanup()},resets:()=>resets};
}

for(const handler of ['addTeamMember','removeTeamMember','confirmCandidate','requestReplacement','selectReplacement','addTalentPool','removeTalentPool']){
 test(handler+' ignores late failure from another company without changing current feedback or loading',async()=>{
  const h=contextHarness(),done=h.start(handler);h.setTenant('tenant-b');h.render();h.values[21]='current feedback';h.values[22]=true;h.resolve(handler,false);await done;
  assert.equal(h.calls[0].options.headers['x-tenant-id'],'tenant-a');assert.equal(h.values[21],'current feedback');assert.equal(h.values[22],true);assert.equal(h.values[23],0);
 });
 test(handler+' ignores late success after company change without publishing selection or refresh',async()=>{
  const h=contextHarness(),done=h.start(handler);h.setTenant('tenant-b');h.render();h.values[21]='current feedback';h.values[22]=true;const replacementBefore=h.values[15];h.resolve(handler,true);await done;
  assert.equal(h.values[21],'current feedback');assert.equal(h.values[22],true);assert.equal(h.values[23],0);assert.equal(h.values[15],replacementBefore);
 });
}

test('mutation context remains current through a Strict Mode layout-effect cleanup and setup replay',async()=>{
 for(const handler of ['createJob','createTeam','updateSafetyCase','updateSafetyAppeal']){
  const h=contextHarness(),done=h.start(handler);h.strictReplay();h.resolve(handler,true);await done;
  assert.equal(h.values[21],'');assert.equal(h.values[22],false);assert.equal(h.values[23],1);assert.equal(h.resets(),1);
 }
});

for(const handler of ['createJob','createTeam','updateSafetyCase','updateSafetyAppeal']){
 test(handler+' ignores late failure from a different company without changing its feedback or loading',async()=>{
  const h=contextHarness(),done=h.start(handler);h.setTenant('tenant-b');h.render();h.values[21]='feedback from current company';h.values[22]=true;
  h.resolve(handler,false);await done;
  assert.equal(h.calls[0].options.headers['x-tenant-id'],'tenant-a');assert.equal(h.values[21],'feedback from current company');assert.equal(h.values[22],true);assert.equal(h.values[23],0);assert.equal(h.resets(),0);
 });
 test(handler+' ignores late success after company, token or role changes without resetting or refreshing',async()=>{
  for(const change of ['tenant','token','role']){
   const h=contextHarness(),done=h.start(handler);
   if(change==='tenant')h.setTenant('tenant-b');else if(change==='token')h.setToken('token-b');else h.setRole('admin');
   h.render();h.values[21]='current feedback';h.values[22]=true;h.resolve(handler,true);await done;
   assert.equal(h.values[21],'current feedback');assert.equal(h.values[22],true);assert.equal(h.values[23],0);assert.equal(h.resets(),0);
  }
 });
 test(handler+' ignores late completion after signout or unmount',async()=>{
  for(const transition of ['signout','unmount']){
   const h=contextHarness(),done=h.start(handler);
   assert.equal(h.calls.length,1);
   if(transition==='signout'){h.signout();h.render()}else h.unmount();
   h.values[21]='current feedback';h.values[22]=true;h.resolve(handler,false);await done;
   assert.equal(h.values[21],'current feedback');assert.equal(h.values[22],true);assert.equal(h.values[23],0);
  }
 });
}
