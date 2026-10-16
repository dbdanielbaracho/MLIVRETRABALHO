import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {stripTypeScriptTypes} from 'node:module';
import {readSettledSection,failedSectionCount} from './independent-reads.ts';
import {isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders} from './web-contract.ts';

// Execute the actual Home pre-JSX code and its actual JSX count/empty expressions.
// Hooks/transport/timers are explicit fixtures; this is NOT a browser or React render proof.
const source=fs.readFileSync(new URL('./page.tsx',import.meta.url),'utf8');
const prefix=source.slice(0,source.indexOf('  if(!session)return <main')).replace(/^import .*;\n/gm,'').replace('export default function Home(){','function Home(){');
const names=[...prefix.matchAll(/const \[([^,]+),[^\]]+\]=useState/g)].map(x=>x[1]);
const labels=['Equipes visíveis: ','Solicitações: ','Registros: ','Eventos de reconciliação: ','Casos autorizados visíveis: ',' · Recursos: '];
const counterExpressions=labels.map(label=>{
 const start=source.indexOf(label+'<b>{');assert.ok(start>=0,label);
 return source.slice(start+label.length+4,source.indexOf('}</b>',start));
});
const rateExpressions=['Interesse → confirmação: ','Taxa de conclusão: '].map(label=>{
 const start=source.indexOf(label+'<b>{');assert.ok(start>=0,label);
 return source.slice(start+label.length+4,source.indexOf('}</b>',start));
});
const tables=['Vagas','Assignments ativos','Substituições','Concluídos recentes','Planner'];
const emptyExpressions=tables.map(title=>{
 const marker='<section className="card tableCard"><h2>'+title+'</h2>{';
 const start=source.indexOf(marker);assert.ok(start>=0,title);
 const text=source.slice(start+marker.length),split=text.indexOf('?<p className="muted">');assert.ok(split>=0,title);
 const condition=text.slice(0,split),body=text.slice(split+'?<p className="muted">'.length,text.indexOf('</p>:',split));
 const message=body.startsWith('{')?body.slice(1,-1):JSON.stringify(body);
 return '(('+condition+')?('+message+'):"__rows__")';
});
const executable=stripTypeScriptTypes(prefix+'\nreturn {counts:['+counterExpressions.join(',')+'],rates:['+rateExpressions.join(',')+'],empty:['+emptyExpressions.join(',')+']};\n}\nHome();',{mode:'strip'});
const flush=()=>new Promise<void>(resolve=>setImmediate(resolve));
type Pending={path:string;options:any;resolve:(value:any)=>void};
function harness(){
 const values:any[]=[],refs:any[]=[],timers=new Map<number,()=>void>();let nextTimer=0,cursor=0,refCursor=0;
 function network(){
  const pending:Pending[]=[];
  return {pending,fetch:(url:string,options:any)=>new Promise(resolve=>pending.push({path:new URL(url).pathname,options,resolve})),
   settle(failed:number[]=[],empty=false,label='fixture',rates:{interestToConfirmationRate:number|null;assignmentCompletionRate:number|null}={interestToConfirmationRate:null,assignmentCompletionRate:null}){
    pending.forEach((p,i)=>p.resolve(failed.includes(i)?{ok:false,status:503}:{ok:true,json:async()=>i===0?{openJobs:1,confirmedWorkers:0,activeWorkers:0,completedAssignments:0}:i===1?{jobsWithInterest:0,jobsWithConfirmation:0,completedAssignments:0,cancelledAssignments:0,...rates}:empty?[]:[{id:label,professionalId:'professional',status:'open',name:label,title:label}]}));
   },pendingJson(){pending.forEach(p=>p.resolve({ok:true,json:()=>new Promise(()=>{})}));}};
 }
 function render(net:ReturnType<typeof network>,tenant='tenant-a',role='owner',identity='identity-a'){
  cursor=0;refCursor=0;const effects:(()=>unknown)[]=[];
  const session={accessToken:'token-'+identity,identity:{id:identity,email:'fixture@example.test'},memberships:[{tenantId:tenant,role}]};
  const useState=(initial:any)=>{
   const index=cursor++;if(!(index in values))values[index]=typeof initial==='function'?initial():initial;
   if(names[index]==='session')values[index]=session;if(names[index]==='tenantId')values[index]=tenant;
   return [values[index],(value:any)=>{values[index]=typeof value==='function'?value(values[index]):value;}];
  };
  const result=vm.runInNewContext(executable,{useState,useRef:(initial:any)=>{const index=refCursor++;return refs[index]??(refs[index]={current:initial});},
   useMemo:(fn:()=>unknown)=>fn(),useLayoutEffect:(fn:()=>unknown)=>fn(),useEffect:(fn:()=>unknown)=>effects.push(fn),fetch:net.fetch,
   setTimeout:(fn:()=>void,ms:number)=>{assert.equal(ms,15000);const id=++nextTimer;timers.set(id,fn);return id;},clearTimeout:(id:number)=>timers.delete(id),
   process:{env:{}},sessionStorage:{getItem:()=>null,removeItem(){}},isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders,readSettledSection,failedSectionCount});
  return {counts:Array.from(result.counts as Iterable<number|string>),rates:Array.from(result.rates as Iterable<string>),empty:Array.from(result.empty as Iterable<string>),effects};
 }
 const value=(name:string)=>values[names.indexOf(name)];
 return {network,render,value,timers,refresh(){const i=names.indexOf('revision');values[i]++;},expire(){const f=[...timers.values()];timers.clear();f.forEach(x=>x());}};
}
const clean=(x:unknown)=>{if(typeof x==='function')x();};

test('pending dashboard reads expose unknown counters and loading instead of zero or factual empty lists',()=>{
 const h=harness(),n=h.network();h.render(n).effects[1]();const r=h.render(n);
 assert.deepEqual(r.counts,['—','—','—','—','—','—']);r.empty.forEach(x=>assert.match(x,/Carregando/i));
 assert.equal(n.pending.length,12);n.pending.forEach(p=>{assert.equal(p.options.method,undefined);assert.equal(p.options.cache,'no-store');assert.equal(p.options.headers['x-tenant-id'],'tenant-a');});
});
test('one failed team read cannot turn a prior real team into zero while other fulfilled sections stay visible',async()=>{
 const h=harness(),first=h.network();const cleanup=h.render(first).effects[1]();first.settle([],false,'real-team');await flush();
 assert.deepEqual(h.render(first).counts,[1,1,1,1,1,1]);
 clean(cleanup);h.refresh();const n=h.network();h.render(n).effects[1]();n.settle([6],false,'verified-other');await flush();
 const r=h.render(n);assert.deepEqual(r.counts,['—',1,1,1,1,1]);assert.deepEqual(r.empty,['__rows__','__rows__','__rows__','__rows__','__rows__']);
 assert.match(h.value('error'),/^1 seção/);assert.equal(h.value('loading'),false);
});
test('only fulfilled empty arrays establish zero or factual empty messages, independently per section',async()=>{
 for(const [index,counter] of [[6,0],[7,1],[8,2],[9,3],[10,4],[11,5]]){
  const h=harness(),n=h.network();const cleanup=h.render(n).effects[1]();n.settle([],true);await flush();assert.deepEqual(h.render(n).counts,[0,0,0,0,0,0]);
  clean(cleanup);h.refresh();const failed=h.network();h.render(failed).effects[1]();failed.settle([index],true);await flush();
  assert.equal(h.render(failed).counts[counter],'—');
 }
 for(const [index,empty] of [[3,0],[4,1],[7,2],[5,3],[2,4]]){
  const h=harness(),n=h.network();h.render(n).effects[1]();n.settle([index],true);await flush();
  assert.match(h.render(n).empty[empty],/Não foi possível carregar/i);
 }
});
test('read timeout covers pending fetch or JSON and ignores late results without inventing zero',async()=>{
 for(const json of [false,true]){
  const h=harness(),n=h.network();h.render(n).effects[1]();if(json){n.pendingJson();await flush();}h.expire();await flush();
  const r=h.render(n);assert.deepEqual(r.counts,['—','—','—','—','—','—']);r.empty.forEach(x=>assert.match(x,/Não foi possível carregar/i));
  n.settle([],false,'too-late');await flush();assert.deepEqual(h.render(n).counts,r.counts);assert.equal(h.value('loading'),false);
 }
});
test('new identity tenant role or explicit refresh cannot reuse previous successful count metadata before effects run',async()=>{
 for(const context of [['tenant-b','owner','identity-a'],['tenant-a','owner','identity-b'],['tenant-a','manager','identity-a']]){
  const h=harness(),n=h.network();clean(h.render(n).effects[1]());const old=h.network();h.render(old).effects[1]();old.settle([],false);await flush();assert.equal(h.render(old).counts[0],1);
  const r=h.render(h.network(),...context);assert.deepEqual(r.counts,['—','—','—','—','—','—']);r.empty.forEach(x=>assert.match(x,/Carregando/i));
 }
 const h=harness(),n=h.network();h.render(n).effects[1]();n.settle([],false);await flush();h.refresh();assert.deepEqual(h.render(n).counts,['—','—','—','—','—','—']);
});
test('admin-only reads deliberately not requested for manager are unknown, not fabricated empty counts',async()=>{
 const h=harness(),n=h.network();h.render(n,'tenant-a','manager').effects[1]();assert.equal(n.pending.length,9);n.settle([],true);await flush();
 assert.deepEqual(h.render(n,'tenant-a','manager').counts,[0,0,0,'—','—','—']);
 assert.ok(!n.pending.some(p=>/payment-events|safety/.test(p.path)));
});
test('only an explicit new read recovers unavailable sections and old completion cannot replace its status',async()=>{
 const h=harness(),n=h.network();const cleanup=h.render(n).effects[1]();n.settle([6]);await flush();assert.equal(h.render(n).counts[0],'—');
 clean(cleanup);h.refresh();const fresh=h.network();h.render(fresh).effects[1]();assert.equal(h.render(fresh).counts[0],'—');
 fresh.settle([],false,'recovered-team');await flush();assert.deepEqual(h.render(fresh).counts,[1,1,1,1,1,1]);assert.equal(h.value('error'),'');assert.equal(h.timers.size,0);
 const old=h.network();h.refresh();const oldCleanup=h.render(old).effects[1]();clean(oldCleanup);
 h.refresh();const newest=h.network();h.render(newest).effects[1]();newest.settle([],false,'newest-team');await flush();
 old.settle([6],true);await flush();assert.deepEqual(h.render(newest).counts,[1,1,1,1,1,1]);assert.equal(h.value('error'),'');
});
test('unread analytics cannot assert no denominator or reuse prior percentages across a refresh',async()=>{
 const h=harness(),first=h.network();assert.deepEqual(h.render(first).rates,['—','—']);
 const cleanup=h.render(first).effects[1]();first.settle([],false,'known',{interestToConfirmationRate:37.5,assignmentCompletionRate:0});await flush();
 assert.deepEqual(h.render(first).rates,['37.5%','0%']);clean(cleanup);h.refresh();const failed=h.network();
 assert.deepEqual(h.render(failed).rates,['—','—']);h.render(failed).effects[1]();failed.settle([1]);await flush();assert.deepEqual(h.render(failed).rates,['—','—']);
});
test('only fulfilled analytics null rates establish no denominator and a measured zero stays zero percent',async()=>{
 const h=harness(),n=h.network();const cleanup=h.render(n).effects[1]();n.settle();await flush();assert.deepEqual(h.render(n).rates,['Sem denominador','Sem denominador']);
 clean(cleanup);h.refresh();const zero=h.network();h.render(zero).effects[1]();zero.settle([],false,'known',{interestToConfirmationRate:0,assignmentCompletionRate:0});await flush();assert.deepEqual(h.render(zero).rates,['0%','0%']);
});
