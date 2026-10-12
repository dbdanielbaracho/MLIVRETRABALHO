import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {publishCompanyTeam} from './team-publication.ts';
import {publishCompanyJob} from './job-publication.ts';
import {stripTypeScriptTypes} from 'node:module';
import {isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders} from './web-contract.ts';
const source=fs.readFileSync(new URL('./page.tsx',import.meta.url),'utf8');
const prefix=source.slice(0,source.indexOf('  if(!session)return <main')).replace(/^import .*;\n/gm,'').replace('export default function Home(){','function Home(){');
const js=stripTypeScriptTypes(prefix+'\n return {createJob,createTeam,updateSafetyCase,updateSafetyAppeal};\n}\nHome();',{mode:'strip'});
async function invoke(handler:string,ok=true,ackOverride?:unknown){
 const values:any[]=[],pending:any[]=[],calls:any[]=[];let cursor=0,resets=0;
 const session={accessToken:'token',identity:{id:'identity',email:'fixture'},memberships:[{tenantId:'tenant',role:'owner'}]};
 const fields:Record<string,string>={title:'Fixture',requiredRole:'waiter',name:'Fixture team',location:'Fixture',workCity:'Fixture',startsAt:'2026-10-20T12:00',endsAt:'2026-10-20T16:00',payReais:'12.34',caseId:'case',appealId:'appeal',status:'reviewing',note:'Fixture note'};
 const form={reset(){resets++}};
 class Data{constructor(target:unknown){assert.equal(target,form)}get(key:string){return fields[key]??null}}
 const useState=(initial:any)=>{const index=cursor++;values[index]=initial;return [index===0?session:index===1?'tenant':initial,(value:any)=>{values[index]=typeof value==='function'?value(values[index]):value}];};
 const handlers=vm.runInNewContext(js,{useState,useMemo:(fn:()=>unknown)=>fn(),useEffect(){},fetch:(url:string,options:any)=>{calls.push({url,options});return new Promise(resolve=>pending.push(resolve))},FormData:Data,process:{env:{}},publishCompanyJob,publishCompanyTeam,isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders});
 const event:{currentTarget:unknown;preventDefault:()=>void}={currentTarget:form,preventDefault(){}};
 const done=handlers[handler](event);
 // The React19.1.4 dispatcher clears currentTarget immediately after listener(event) returns.
 event.currentTarget=null;
 assert.equal(pending.length,1);
 pending[0]({ok,status:ok?201:500,json:async()=>ackOverride??(handler==='createJob'?{id:'abcdef12-2222-4333-8444-555555555555',...JSON.parse(calls[0].options.body),status:'open',engagementModality:'gig'} :handler==='createTeam'?{id:'abcdef12-2222-4333-8444-555555555555',name:'Fixture team'}:{id:'fixture-ack'})});
 await done;
 return {values,calls,resets};
}
for(const [handler,path] of [['createJob','/v1/company/jobs'],['createTeam','/v1/company/teams'],['updateSafetyCase','/v1/company/safety-cases/case/status'],['updateSafetyAppeal','/v1/company/safety-appeals/appeal/status']]){
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
