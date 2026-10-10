import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveStartupRoute} from '../lib/startup-route.ts';
import {createSessionQueue,persistVerifiedSession} from '../lib/session-transaction.ts';
test('stable paired startup snapshots preserve existing company/professional navigation and ignore orphan tenant when signed out',async()=>{
 for(const [headers,result]of [[{Authorization:'Bearer fixture','x-tenant-id':'company'},{status:'ready',route:'/empresa-inicio'}],[{Authorization:'Bearer fixture'},{status:'ready',route:'/profissional-inicio'}],[{'x-tenant-id':'orphan'},{status:'signed_out'}],[{},{status:'signed_out'}]]){
  assert.deepEqual(await resolveStartupRoute(async()=>({...headers}),()=>true),result);
 }
});
test('a login interleaved between real queued startup reads cannot redirect with an old token and new tenant',async()=>{
 const queue=createSessionQueue();let state={token:'old',tenantId:'old-company'},reads=0;
 const adapter={read:async()=>({...state}),write:async next=>{state={...next}}};
 const read=async()=>{const h=await queue.run(async()=>{const p=await adapter.read();return {Authorization:'Bearer '+p.token,'x-tenant-id':p.tenantId};});if(++reads===1)assert.equal(await queue.run(()=>persistVerifiedSession(adapter,{token:'new',tenantId:null},'old',()=>true)),'saved');return h;};
 assert.deepEqual(await resolveStartupRoute(read,()=>true),{status:'stale'});
 assert.deepEqual(state,{token:'new',tenantId:null});
 assert.deepEqual(await resolveStartupRoute(read,()=>true),{status:'ready',route:'/profissional-inicio'});
});
test('startup rejects a tenant selection change even if authorization is unchanged, including selecting the first tenant',async()=>{
 for(const first of [{Authorization:'Bearer fixture','x-tenant-id':'old'},{Authorization:'Bearer fixture'}]){
  let reads=0;
  assert.deepEqual(await resolveStartupRoute(async()=>++reads===1?first:{Authorization:'Bearer fixture','x-tenant-id':'new'},()=>true),{status:'stale'});
 }
});
test('blur or read failure never yields a startup route and a focused retry can recover',async()=>{
 let active=true,calls=0;
 assert.deepEqual(await resolveStartupRoute(async()=>{calls++;active=false;return {Authorization:'Bearer fixture'};},()=>active),{status:'stale'});assert.equal(calls,1);
 assert.deepEqual(await resolveStartupRoute(async()=>{throw Error('storage');},()=>true),{status:'error'});
 assert.deepEqual(await resolveStartupRoute(async()=>({Authorization:'Bearer fixture'}),()=>true),{status:'ready',route:'/profissional-inicio'});
});
