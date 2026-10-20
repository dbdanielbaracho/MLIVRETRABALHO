import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseService} from './database.service';

const tenantId='00000000-0000-4000-8000-000000000001';
const roleSQL='SET LOCAL ROLE app_runtime';
const tenantSQL="SELECT set_config('app.tenant_id',$1,true)";
type Method='transaction'|'tenant';
type Options={fail?:string;rollbackFails?:boolean;connectFails?:boolean;rollbackWait?:Promise<void>;onRollback?:()=>void};
function fixture(options:Options={}){
 const primary=Error('fixture_primary'),secondary=Error('fixture_rollback');
 const trace={connects:0,callbacks:0,queries:[] as {text:string;values:unknown[]|undefined}[],releases:[] as unknown[]};
 const value={unchanged:true};
 const client={query:async(text:string,values?:unknown[])=>{
  trace.queries.push({text,values});
  if(text==='ROLLBACK'){options.onRollback?.();await options.rollbackWait;if(options.rollbackFails)throw secondary;}
  else if(text===options.fail)throw primary;
  return{rows:[]};
 },release:(destroy?:unknown)=>{trace.releases.push(destroy);}};
 const service=Object.create(DatabaseService.prototype) as DatabaseService;
 Object.defineProperty(service,'pool',{value:{connect:async()=>{trace.connects++;if(options.connectFails)throw primary;return client;}}});
 const work=async(actual:unknown)=>{assert.equal(actual,client);trace.callbacks++;if(options.fail==='WORK')throw primary;return value;};
 const invoke=(method:Method)=>method==='tenant'?service.tenant(tenantId,work):service.transaction(work);
 return{service,client,trace,primary,secondary,value,invoke};
}
for(const method of ['transaction','tenant'] as Method[]){
 const setup=method==='tenant'?['BEGIN',roleSQL,tenantSQL]:['BEGIN'];
 test(method+' commits once and returns callback value with normal release',async()=>{
  const f=fixture();assert.equal(await f.invoke(method),f.value);
  assert.deepEqual(f.trace.queries.map(q=>q.text),[...setup,'COMMIT']);assert.equal(f.trace.callbacks,1);assert.equal(f.trace.connects,1);assert.deepEqual(f.trace.releases,[undefined]);
  if(method==='tenant')assert.deepEqual(f.trace.queries[2]!.values,[tenantId]);
 });
 test(method+' connect rejection does not query invoke work or release a missing client',async()=>{
  const f=fixture({connectFails:true});await assert.rejects(f.invoke(method),e=>e===f.primary);
  assert.equal(f.trace.connects,1);assert.equal(f.trace.callbacks,0);assert.deepEqual(f.trace.queries,[]);assert.deepEqual(f.trace.releases,[]);
 });
 for(const stage of ['BEGIN','WORK','COMMIT'])for(const rollbackFails of [false,true])test(method+' '+stage+' failure with rollback '+(rollbackFails?'failure discards client':'success reuses client'),async()=>{
  const f=fixture({fail:stage,rollbackFails});let caught:unknown;
  try{await f.invoke(method);}catch(e){caught=e;}
  assert.equal(caught,f.primary,'Rollback must not replace primary transaction error');
  const before=stage==='BEGIN'?['BEGIN']:stage==='COMMIT'?[...setup,'COMMIT']:setup;
  assert.deepEqual(f.trace.queries.map(q=>q.text),[...before,'ROLLBACK']);
  assert.equal(f.trace.callbacks,stage==='BEGIN'?0:1);assert.equal(f.trace.connects,1);
  assert.deepEqual(f.trace.releases,[rollbackFails?true:undefined],'Exactly one release, discard only after failed rollback');
  if(method==='tenant'&&stage!=='BEGIN')assert.deepEqual(f.trace.queries[2]!.values,[tenantId]);
 });
 test(method+' awaits rollback before releasing and never retries callback',async()=>{
  let unblock!:()=>void,entered!:()=>void;
  const wait=new Promise<void>(resolve=>{unblock=resolve;}),started=new Promise<void>(resolve=>{entered=resolve;});
  const f=fixture({fail:'WORK',rollbackWait:wait,onRollback:entered});
  const pending=assert.rejects(f.invoke(method),e=>e===f.primary);await started;
  assert.deepEqual(f.trace.releases,[]);assert.equal(f.trace.callbacks,1);unblock();await pending;
  assert.deepEqual(f.trace.releases,[undefined]);assert.equal(f.trace.callbacks,1);
 });
 test(method+' preserves a non-Error thrown value and discards after failed rollback',async()=>{
  const f=fixture({rollbackFails:true}),primary={fixture:'non-error-primary'};let caught:unknown;
  const work=async()=>{throw primary;};
  try{if(method==='tenant')await f.service.tenant(tenantId,work);else await f.service.transaction(work);}catch(e){caught=e;}
  assert.equal(caught,primary);assert.deepEqual(f.trace.releases,[true]);assert.equal(f.trace.queries.at(-1)?.text,'ROLLBACK');
 });
}
for(const stage of [roleSQL,tenantSQL])for(const rollbackFails of [false,true])test('tenant setup failure at '+stage+' rollbackFails='+rollbackFails,async()=>{
 const f=fixture({fail:stage,rollbackFails});let caught:unknown;
 try{await f.invoke('tenant');}catch(e){caught=e;}
 assert.equal(caught,f.primary);assert.equal(f.trace.callbacks,0);assert.equal(f.trace.connects,1);
 assert.deepEqual(f.trace.queries.map(q=>q.text),stage===roleSQL?['BEGIN',roleSQL,'ROLLBACK']:['BEGIN',roleSQL,tenantSQL,'ROLLBACK']);
 if(stage===tenantSQL)assert.deepEqual(f.trace.queries[2]!.values,[tenantId]);
 assert.deepEqual(f.trace.releases,[rollbackFails?true:undefined]);
});
