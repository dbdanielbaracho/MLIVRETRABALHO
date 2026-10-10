import test from 'node:test';
import assert from 'node:assert/strict';
import {createSupportIntentStore,pendingSupportIntent,supportPayload,supportAcknowledgement} from '../lib/support-intent.ts';
const identity='11111111-2222-3333-4444-555555555555',other='22222222-3333-4444-5555-666666666666',tenant='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',assignment='bbbbbbbb-cccc-dddd-eeee-ffffffffffff';
const key='cccccccc-dddd-eeee-ffff-aaaaaaaaaaaa',nextKey='dddddddd-eeee-ffff-aaaa-bbbbbbbbbbbb',caseId='eeeeeeee-ffff-aaaa-bbbb-cccccccccccc';
const payload={assignmentId:assignment,category:'schedule',description:'Fixture real',priority:'normal'};
const candidate=()=>pendingSupportIntent(identity,tenant,key,payload);
const ack={id:caseId,category:'schedule',priority:'normal',status:'open',createdAt:'2026-10-10T12:00:00Z'};
function fixture(){
 const values=new Map(),events=[];
 const adapter={read:async id=>{events.push(['read',id]);return values.get(id)??null;},write:async(id,value)=>{events.push(['write',id]);values.set(id,value);},remove:async id=>{events.push(['remove',id]);values.delete(id);}};
 return {values,events,adapter,store:createSupportIntentStore(adapter)};
}
const recordOf=result=>{assert.ok(result.status==='saved'||result.status==='existing');return result.record;};
test('support draft follows the real enum/default/trim and 4000 Unicode codepoint contract',()=>{
 assert.deepEqual(supportPayload({...payload,assignmentId:assignment.toUpperCase(),description:' fixture ',priority:undefined}),{...payload,description:'fixture'});
 assert.equal(supportPayload({...payload,description:'😀'.repeat(4000)}).description.length,8000);
 for(const value of [null,[],{...payload,category:'constructor'},{...payload,category:'technical'},{...payload,priority:'future'},{...payload,description:' '},{...payload,description:'😀'.repeat(4001)},{...payload,assignmentId:'bad-id'}])assert.equal(supportPayload(value),null);
 assert.equal(supportPayload({category:'other',description:'General'}).assignmentId,null);
});
test('invalid storage candidate never starts a write or fabricates a persisted barrier',async()=>{
 const f=fixture();for(const value of [null,{}, {...candidate(),reporterIdentityId:'bad-id'},{...candidate(),tenantId:' '},{...candidate(),requestKey:'bad-id'},{...candidate(),phase:'confirmed'},{...candidate(),payload:{...payload,description:' '}}])assert.deepEqual(await f.store.stage(value),{status:'failed'});
 assert.equal(f.events.filter(e=>e[0]==='write').length,0);
});
test('stage persists and reads back the full pending intent before claiming saved, excluding tokens and caller extras',async()=>{
 const f=fixture();const result=await f.store.stage({...candidate(),Authorization:'secret',extra:'ignored'});
 const record=recordOf(result);assert.equal(result.status,'saved');assert.deepEqual(record,candidate());
 assert.deepEqual(f.events.map(e=>e[0]),['read','write','read']);assert.doesNotMatch(f.values.get(identity),/secret|Authorization|extra/);
});
test('a pending attempt blocks replacement across keys, payloads, assignments and tenants',async()=>{
 const f=fixture();await f.store.stage(candidate());
 const replacement=pendingSupportIntent(identity,other,nextKey,{...payload,assignmentId:other,description:'Another request'});
 const result=await f.store.stage(replacement);assert.equal(result.status,'existing');assert.deepEqual(recordOf(result),candidate());
 assert.equal(f.events.filter(e=>e[0]==='write').length,1);
});
test('restart and relogin of the same identity preserve the exact key/content instead of starting a new intent',async()=>{
 const f=fixture();await f.store.stage(candidate());const restarted=createSupportIntentStore(f.adapter);
 assert.deepEqual(recordOf(await restarted.load(identity.toUpperCase())),candidate());
 const replacement=pendingSupportIntent(identity,tenant,nextKey,payload);assert.deepEqual(recordOf(await restarted.stage(replacement)),candidate());
});
test('identity slots are separate and switching users never overwrites or exposes the previous slot',async()=>{
 const f=fixture();await f.store.stage(candidate());assert.deepEqual(await f.store.load(other),{status:'empty'});
 const next=pendingSupportIntent(other,tenant,nextKey,payload);assert.deepEqual(recordOf(await f.store.stage(next)),next);
 assert.deepEqual(recordOf(await f.store.load(identity)),candidate());assert.equal(f.values.size,2);
});
test('corrupt, unsupported and misowned storage remain failures without deletion or replacement',async()=>{
 const f=fixture();
 for(const raw of ['not-json','null','{}',JSON.stringify({...candidate(),version:2}),JSON.stringify({...candidate(),reporterIdentityId:other}),JSON.stringify({...candidate(),phase:'new'}),JSON.stringify({...candidate(),payload:{...payload,description:' padded '}}),JSON.stringify({...candidate(),phase:'confirmed',acknowledgement:{...ack,id:'bad'}})]){
  f.values.set(identity,raw);assert.deepEqual(await f.store.load(identity),{status:'failed'});assert.deepEqual(await f.store.stage(candidate()),{status:'failed'});assert.equal(f.values.get(identity),raw);
 }
 assert.equal(f.events.some(e=>e[0]==='write'||e[0]==='remove'),false);
});
test('read failure is not interpreted as an empty slot that could create a duplicate',async()=>{
 let writes=0;const store=createSupportIntentStore({read:async()=>{throw Error('storage_unavailable');},write:async()=>{writes++;},remove:async()=>{}});
 assert.deepEqual(await store.load(identity),{status:'failed'});assert.deepEqual(await store.stage(candidate()),{status:'failed'});assert.equal(writes,0);
});
test('a write that persists then throws is unconfirmed, and the next attempt recovers the same barrier',async()=>{
 const f=fixture();let failed=true;const store=createSupportIntentStore({...f.adapter,write:async(id,value)=>{await f.adapter.write(id,value);if(failed){failed=false;throw Error('lost_storage_ack');}}});
 assert.deepEqual(await store.stage(candidate()),{status:'failed'});const result=await store.stage(pendingSupportIntent(identity,tenant,nextKey,{...payload,description:'Different'}));
 assert.equal(result.status,'existing');assert.deepEqual(recordOf(result),candidate());assert.equal(f.events.filter(e=>e[0]==='write').length,1);
});
test('readback mismatch prevents saved even when the write promise resolves',async()=>{
 const store=createSupportIntentStore({read:async()=>null,write:async()=>{},remove:async()=>{}});
 assert.deepEqual(await store.stage(candidate()),{status:'failed'});
});
test('simultaneous first staging is serialized into one persisted intent',async()=>{
 const f=fixture();const results=await Promise.all([f.store.stage(candidate()),f.store.stage(pendingSupportIntent(identity,tenant,nextKey,{...payload,description:'Different'}))]);
 assert.deepEqual(results.map(r=>r.status),['saved','existing']);for(const result of results)assert.deepEqual(recordOf(result),candidate());
 assert.equal(f.events.filter(e=>e[0]==='write').length,1);
});
test('acknowledgement requires real id, matching category/priority, literal nonblank status and valid date',()=>{
 assert.deepEqual(supportAcknowledgement({...ack,status:'future-status',privateHash:'excluded'},payload),{...ack,status:'future-status'});
 for(const value of [null,{...ack,id:'bad'},{...ack,category:'other'},{...ack,priority:'high'},{...ack,status:' '},{...ack,createdAt:'bad-date'}])assert.equal(supportAcknowledgement(value,payload),null);
});
test('confirmation is persisted/read back with a real matching acknowledgement and preserves immutable intent',async()=>{
 const f=fixture();await f.store.stage(candidate());const result=await f.store.confirm(identity,key,{...ack,status:'reviewing'});
 const confirmed=recordOf(result);assert.equal(result.status,'saved');assert.deepEqual(confirmed,{...candidate(),phase:'confirmed',acknowledgement:{...ack,status:'reviewing'}});
 assert.deepEqual(recordOf(await createSupportIntentStore(f.adapter).load(identity)),confirmed);
});
test('bad, foreign and mismatched acknowledgements cannot release the pending barrier',async()=>{
 const f=fixture();await f.store.stage(candidate());
 for(const [owner,k,value] of [[other,key,ack],[identity,nextKey,ack],[identity,key,{...ack,id:'bad'}],[identity,key,{...ack,category:'other'}],[identity,key,{...ack,createdAt:'bad'}]])assert.deepEqual(await f.store.confirm(owner,k,value),{status:'failed'});
 assert.deepEqual(recordOf(await f.store.load(identity)),candidate());assert.equal(f.events.filter(e=>e[0]==='write').length,1);
});
test('confirmation storage failure retains the pending barrier and never claims confirmed',async()=>{
 const f=fixture();await f.store.stage(candidate());const store=createSupportIntentStore({...f.adapter,write:async()=>{throw Error('storage_failed');}});
 assert.deepEqual(await store.confirm(identity,key,ack),{status:'failed'});assert.deepEqual(recordOf(await store.load(identity)),candidate());
});
test('a confirmed barrier still blocks a new intent until explicit release, and cannot change case identity',async()=>{
 const f=fixture();await f.store.stage(candidate());const confirmed=recordOf(await f.store.confirm(identity,key,ack));
 assert.deepEqual(recordOf(await f.store.stage(pendingSupportIntent(identity,tenant,nextKey,payload))),confirmed);
 assert.deepEqual(await f.store.confirm(identity,key,{...ack,id:other}),{status:'failed'});
 assert.equal((await f.store.confirm(identity,key,{...ack,status:'reviewing'})).status,'existing');
});
test('pending or wrong-key records cannot be discarded, while explicit confirmed release verifies deletion',async()=>{
 const f=fixture();await f.store.stage(candidate());assert.deepEqual(await f.store.releaseConfirmed(identity,key),{status:'failed'});assert.equal(f.events.some(e=>e[0]==='remove'),false);
 await f.store.confirm(identity,key,ack);assert.deepEqual(await f.store.releaseConfirmed(identity,nextKey),{status:'failed'});assert.deepEqual(await f.store.releaseConfirmed(identity,key),{status:'empty'});
 assert.deepEqual(await f.store.load(identity),{status:'empty'});assert.equal((await f.store.stage(pendingSupportIntent(identity,tenant,nextKey,payload))).status,'saved');
});
test('failed deletion or undeleted readback never claims that a confirmed slot is free',async()=>{
 const f=fixture();await f.store.stage(candidate());await f.store.confirm(identity,key,ack);
 const failed=createSupportIntentStore({...f.adapter,remove:async()=>{throw Error('delete_failed');}}),ignored=createSupportIntentStore({...f.adapter,remove:async()=>{}});
 assert.deepEqual(await failed.releaseConfirmed(identity,key),{status:'failed'});assert.deepEqual(await ignored.releaseConfirmed(identity,key),{status:'failed'});
 assert.equal(recordOf(await f.store.load(identity)).phase,'confirmed');
});
