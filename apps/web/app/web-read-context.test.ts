import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {stripTypeScriptTypes} from 'node:module';
import {isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders} from './web-contract.ts';

const source=fs.readFileSync(new URL('./page.tsx',import.meta.url),'utf8');
const beforeJsx=source.slice(0,source.indexOf('  if(!session)return <main')).replace(/^import .*;\n/gm,'').replace('export default function Home(){','function Home(){');
const executable=stripTypeScriptTypes(beforeJsx+'\n return null;\n}\nHome();',{mode:'strip'});
type Pending={resolve:(value:unknown)=>void;reject:(reason:unknown)=>void;path:string;headers:Record<string,string>};
function harness(){
 const values:any[]=[],refs:{current:any}[]=[];let cursor=0,refCursor=0;
 const timers=new Map<number,()=>void>();let timerId=0;
 const setTimeout=(callback:()=>void,ms:number)=>{assert.equal(ms,15000);const id=++timerId;timers.set(id,callback);return id;};
 const clearTimeout=(id:number)=>{timers.delete(id)};
 const expire=()=>{const callbacks=[...timers.values()];timers.clear();for(const callback of callbacks)callback()};
 const base={accessToken:'token',identity:{id:'identity',email:'fixture'},memberships:[{tenantId:'tenant-a',role:'owner'},{tenantId:'tenant-b',role:'owner'}]};
 const transport=()=>{
  const pending:Pending[]=[];
  const fetch=(url:string,options:any)=>new Promise((resolve,reject)=>pending.push({path:new URL(url).pathname,headers:options.headers,resolve,reject}));
  return {pending,fetch,pendingJson(){for(const p of pending)p.resolve({ok:true,json:()=>new Promise(()=>{})});},success(label:string){for(const p of pending)p.resolve({ok:true,json:async()=>p.path==='/v1/company/dashboard'?{openJobs:label}:p.path==='/v1/company/analytics'?{jobsCreated:label}:[{id:label,professionalId:label,displayName:label}]});},fail(){for(const p of pending)p.resolve({ok:false,status:500})}};
 };
 function render(tenant:string|null,network:ReturnType<typeof transport>,selected={job:'job',team:'team',replacement:'request'}){
  cursor=0;refCursor=0;const effects:(()=>unknown)[]=[];
  const useState=(initial:any)=>{const index=cursor++;if(!(index in values))values[index]=initial;return [index===0?(tenant?base:null):index===1?(tenant??''):index===7?selected.job:index===12?selected.team:index===15?selected.replacement:values[index],(next:any)=>{values[index]=typeof next==='function'?next(values[index]):next}];};
  const useRef=(initial:any)=>{const index=refCursor++;return refs[index]??(refs[index]={current:initial})};
  vm.runInNewContext(executable,{useState,useRef,useLayoutEffect:(fn:()=>unknown)=>fn(),useMemo:(fn:()=>unknown)=>fn(),useEffect:(fn:()=>unknown)=>effects.push(fn),fetch:network.fetch,setTimeout,clearTimeout,process:{env:{}},sessionStorage:{getItem:()=>null,removeItem(){}},isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders,readSettledSection:(results:any[],index:number,fallback:any)=>{const result=results[index];return result?.status==='fulfilled'?result.value:fallback;},failedSectionCount:(results:any[])=>results.filter(result=>result.status==='rejected').length});
  return effects;
 }
 return {values,transport,render,timers,expire};
}
const flush=()=>new Promise<void>(resolve=>setImmediate(resolve));
const targets=[{effect:1,index:2,empty:null},{effect:2,index:8,empty:[]},{effect:3,index:13,empty:[]},{effect:4,index:16,empty:[]}];
const clean=(cleanup:unknown)=>{if(typeof cleanup==='function')cleanup()};
test('late successful Web reads cannot overwrite records after company or selection context changes',async()=>{
 for(const target of targets){
  const h=harness(),old=h.transport(),fresh=h.transport();
  const cleanup=h.render('tenant-a',old)[target.effect]();clean(cleanup);
  h.render('tenant-b',fresh)[target.effect]();fresh.success('current');await flush();
  const current=h.values[target.index];
  assert.ok(fresh.pending.length>0);for(const p of fresh.pending)assert.equal(p.headers['x-tenant-id'],'tenant-b');
  old.success('stale');await flush();assert.equal(h.values[target.index],current);
 }
});
test('late Web read failures cannot change the current error or end a newer dashboard loading state',async()=>{
 for(const target of targets){
  const h=harness(),old=h.transport(),fresh=h.transport();
  clean(h.render('tenant-a',old)[target.effect]());
  h.render('tenant-b',fresh)[target.effect]();old.fail();await flush();
  assert.equal(h.values[21],'');if(target.effect===1)assert.equal(h.values[22],true);
  fresh.success('current');await flush();if(target.effect===1)assert.equal(h.values[22],false);
 }
});
test('late Web reads cannot repopulate data after signout',async()=>{
 for(const target of targets){
  const h=harness(),old=h.transport();
  clean(h.render('tenant-a',old)[target.effect]());
  h.render(null,h.transport())[target.effect]();old.success('stale');await flush();
  assert.equal(JSON.stringify(h.values[target.index]),JSON.stringify(target.empty));
 }
});
test('new Web reads clear previous records, report current failure and recover only on an explicit new load',async()=>{
 for(const target of targets){
  const h=harness(),first=h.transport();h.values[target.index]={id:'previous'};
  h.render('tenant-b',first)[target.effect]();assert.equal(JSON.stringify(h.values[target.index]),JSON.stringify(target.empty));
  first.fail();await flush();if(target.effect===1)assert.match(h.values[21],/12 seção\(ões\) da operação não puderam ser carregadas/i);else if(target.effect===2)assert.match(h.values[21],/2 consulta\(s\) de candidatos ou recomendações falharam/i);else assert.equal(h.values[21],'HTTP 500');
  const retry=h.transport();h.render('tenant-b',retry)[target.effect]();retry.success('verified');await flush();
  assert.notDeepEqual(h.values[target.index],target.empty);
 }
});

test('late Web candidate, member and substitute reads cannot overwrite a newer selection in the same company',async()=>{
 for(const target of targets.slice(1)){
  const h=harness(),old=h.transport(),fresh=h.transport();
  clean(h.render('tenant-a',old)[target.effect]());
  h.render('tenant-a',fresh,{job:'job-new',team:'team-new',replacement:'request-new'})[target.effect]();
  fresh.success('current-selection');await flush();const current=h.values[target.index];
  assert.ok(fresh.pending.every(p=>p.path.includes('-new')));
  old.success('old-selection');await flush();assert.equal(h.values[target.index],current);
 }
});

test('all four Web reads leave a pending fetch after the deadline and ignore late success',async()=>{
 for(const target of targets){
  const h=harness(),network=h.transport();h.render('tenant-a',network)[target.effect]();
  assert.equal(h.timers.size,1);h.expire();await flush();
  assert.match(h.values[21],/tempo.*Atualizar dados/i);
  assert.equal(JSON.stringify(h.values[target.index]),JSON.stringify(target.empty));
  if(target.effect===1)assert.equal(h.values[22],false);
  network.success('late');await flush();
  assert.equal(JSON.stringify(h.values[target.index]),JSON.stringify(target.empty));
 }
});
test('the Web read deadline also covers response JSON that never settles',async()=>{
 for(const target of targets){
  const h=harness(),network=h.transport();h.render('tenant-a',network)[target.effect]();
  network.pendingJson();await flush();h.expire();await flush();
  assert.match(h.values[21],/tempo.*Atualizar dados/i);
  assert.equal(JSON.stringify(h.values[target.index]),JSON.stringify(target.empty));
  if(target.effect===1)assert.equal(h.values[22],false);
 }
});
test('expired Web reads ignore late errors and recover through an explicit fresh read',async()=>{
 for(const target of targets){
  const h=harness(),old=h.transport();h.render('tenant-a',old)[target.effect]();h.expire();
  const fresh=h.transport();h.render('tenant-a',fresh)[target.effect]();
  old.fail();await flush();assert.equal(h.values[21],'');
  if(target.effect===1)assert.equal(h.values[22],true);
  fresh.success('verified');await flush();assert.equal(h.values[21],'');
  assert.notDeepEqual(h.values[target.index],target.empty);assert.equal(h.timers.size,0);
  h.expire();assert.equal(h.values[21],'');
 }
});
test('cleaned up Web read timers cannot publish into another company, selection or signed out context',async()=>{
 for(const target of targets){
  for(const tenant of ['tenant-b',null]){
   const h=harness(),old=h.transport();const cleanup=h.render('tenant-a',old)[target.effect]();
   assert.equal(h.timers.size,1);const late=[...h.timers.values()][0];clean(cleanup);assert.equal(h.timers.size,0);
   const fresh=h.transport();h.render(tenant,fresh,{job:'job-new',team:'team-new',replacement:'request-new'})[target.effect]();
   const loading=h.values[22];late();assert.equal(h.values[21],'');assert.equal(h.values[22],loading);
   if(tenant){fresh.success('current');await flush();assert.equal(h.timers.size,0);}
  }
 }
});
test('successful and failed Web reads clear their timers without introducing a later timeout',async()=>{
 for(const target of targets){
  for(const outcome of ['success','fail']){
   const h=harness(),network=h.transport();h.render('tenant-a',network)[target.effect]();
   assert.equal(h.timers.size,1);
   if(outcome==='success')network.success('verified');else network.fail();
   await flush();assert.equal(h.timers.size,0);
   const error=h.values[21],records=h.values[target.index];h.expire();
   assert.equal(h.values[21],error);assert.equal(h.values[target.index],records);
  }
 }
});
