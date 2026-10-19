import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseService} from './database.service';

type Method='transaction'|'tenant';
function deferred(){
 let release!:()=>void;
 const promise=new Promise<void>(resolve=>{release=resolve;});
 return{promise,release};
}
for(const failedMethod of ['transaction','tenant'] as Method[])for(const first of ['failed','healthy'] as const)test(failedMethod+' failed rollback owns its discard while '+first+' settles first across concurrent wrappers',async()=>{
 const primary=Error('explicit failed operation'),secondary=Error('explicit rollback failure'),value={healthy:true};
 const rollback=deferred(),commit=deferred(),rollbackEntered=deferred(),commitEntered=deferred();
 const queries:Array<Array<{text:string;values:unknown[]|undefined}>>=[[],[]],releases:unknown[][]=[[],[]];
 let connects=0,failedCalls=0,healthyCalls=0;
 const clients=[0,1].map(index=>({
  query:async(text:string,values?:unknown[])=>{
   queries[index]!.push({text,values});
   if(index===0&&text==='ROLLBACK'){rollbackEntered.release();await rollback.promise;throw secondary;}
   if(index===1&&text==='COMMIT'){commitEntered.release();await commit.promise;}
   return{rows:[]};
  },
  release:(destroy?:unknown)=>{releases[index]!.push(destroy);}
 }));
 const service=Object.create(DatabaseService.prototype) as DatabaseService;
 Object.defineProperty(service,'pool',{value:{connect:async()=>{const client=clients[connects++];assert.ok(client,'exactly two explicit clients');return client;}}});
 const tenantA='00000000-0000-4000-8000-000000000001',tenantB='00000000-0000-4000-8000-000000000002';
 const healthyMethod:Method=failedMethod==='transaction'?'tenant':'transaction';
 const invoke=(method:Method,tenant:string,work:(client:unknown)=>Promise<unknown>)=>method==='tenant'?service.tenant(tenant,work):service.transaction(work);
 const failed=invoke(failedMethod,tenantA,async client=>{assert.equal(client,clients[0]);failedCalls++;throw primary;});
 // Attach the rejection observer immediately, before either controlled operation settles.
 let caught:unknown;
 const rejected=failed.then(()=>assert.fail('failed operation must not acknowledge'),error=>{caught=error;});
 const healthy=invoke(healthyMethod,tenantB,async client=>{assert.equal(client,clients[1]);healthyCalls++;return value;});
 try{
 await Promise.all([rollbackEntered.promise,commitEntered.promise]);
 assert.deepEqual(releases,[[],[]],'neither client may be released while its own settlement waits');
 assert.equal(connects,2);assert.equal(failedCalls,1);assert.equal(healthyCalls,1);
 if(first==='failed'){
  rollback.release();await rejected;
  assert.deepEqual(releases,[[true],[]],'failed rollback discards only its own client');
  commit.release();assert.strictEqual(await healthy,value);
 }else{
  commit.release();assert.strictEqual(await healthy,value);
  assert.deepEqual(releases,[[],[undefined]],'healthy commit cannot retire the pending rollback client');
  rollback.release();await rejected;
 }
 assert.strictEqual(caught,primary,'rollback rejection cannot mask the original operation error');
 assert.deepEqual(releases,[[true],[undefined]],'one discard and one ordinary release, each exactly once');
 assert.equal(connects,2);assert.equal(failedCalls,1);assert.equal(healthyCalls,1,'no automatic callback retry');
 const expected=(method:Method,end:string)=>method==='tenant'?['BEGIN','SET LOCAL ROLE app_runtime',"SELECT set_config('app.tenant_id',$1,true)",end]:['BEGIN',end];
 assert.deepEqual(queries[0]!.map(q=>q.text),expected(failedMethod,'ROLLBACK'));
 assert.deepEqual(queries[1]!.map(q=>q.text),expected(healthyMethod,'COMMIT'));
 if(failedMethod==='tenant')assert.deepEqual(queries[0]![2]!.values,[tenantA]);
 if(healthyMethod==='tenant')assert.deepEqual(queries[1]![2]!.values,[tenantB]);
 }finally{
  rollback.release();commit.release();await Promise.allSettled([failed,healthy]);
 }
 // Explicit pool/client scheduling fixture; this is not live PostgreSQL pool reuse or RLS proof.
});
