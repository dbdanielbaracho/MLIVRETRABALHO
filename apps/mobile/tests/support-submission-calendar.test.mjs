// Actual submission/store with explicit auth, transport and in-memory storage fixtures.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const asModule=source=>'data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source,{mode:'strip'})).toString('base64');
const intentURL=asModule(readFileSync(new URL('../lib/support-intent.ts',import.meta.url),'utf8'));
const {createSupportIntentStore,pendingSupportIntent}=await import(intentURL);
const {createSupportSubmission}=await import(asModule(readFileSync(new URL('../lib/support-submission.ts',import.meta.url),'utf8').replaceAll("'./support-intent'",JSON.stringify(intentURL))));
const identity='00000000-0000-4000-8000-000000000001',tenant='00000000-0000-4000-8000-000000000002',key='00000000-0000-4000-8000-000000000003',id='00000000-0000-4000-8000-000000000004',assignment='00000000-0000-4000-8000-000000000005';
const auth='Bearer local-fixture',payload={assignmentId:assignment,category:'schedule',priority:'normal',description:'Fixture'};
function fixture(createdAt){
 let raw=null,deletions=0;const calls=[];
 const store=createSupportIntentStore({read:async()=>raw,write:async(_,v)=>{raw=v;},remove:async()=>{deletions++;raw=null;}});
 const flow=createSupportSubmission({store,getHeaders:async()=>({Authorization:auth,'x-tenant-id':'ignored-default'}),isCurrent:()=>true,transport:async(path,options)=>{calls.push({path,options});return {ok:true,json:async()=>path==='/me'?{id:identity}:path==='/support-cases/intent'?{requestKey:key,reporterIdentityId:identity}:{id,category:payload.category,priority:payload.priority,status:'open',createdAt}};}});
 return {flow,store,calls,raw:()=>raw,deletions:()=>deletions};
}
for(const createdAt of ['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00'])test('actual support flow keeps impossible ACK unknown/pending '+createdAt,async()=>{
 const f=fixture(createdAt),result=await f.flow.sendNew(tenant,assignment,payload,auth);assert.deepEqual(result,{status:'unknown'});
 assert.deepEqual(f.calls.map(x=>x.path),['/me','/support-cases/intent','/support-cases']);
 const post=f.calls[2];assert.equal(post.options.headers['x-tenant-id'],tenant);assert.equal(post.options.headers['idempotency-key'],key);assert.deepEqual(JSON.parse(post.options.body),payload);
 assert.deepEqual((await f.store.load(identity)).record,pendingSupportIntent(identity,tenant,key,payload));
 assert.equal((await f.flow.sendNew(tenant,assignment,payload,auth)).status,'pending');assert.equal(f.calls.filter(x=>x.path==='/support-cases').length,1);assert.equal(f.calls.filter(x=>x.path==='/support-cases/intent').length,1);
 assert.deepEqual(await f.flow.releaseConfirmed(key,auth),{status:'error'});assert.equal(f.deletions(),0);assert.equal(JSON.parse(f.raw()).phase,'pending');
});
test('actual support flow preserves valid leapday confirmation and explicit release',async()=>{const f=fixture('2024-02-29T23:30:00-03:00');assert.equal((await f.flow.sendNew(tenant,assignment,payload,auth)).status,'confirmed');assert.equal((await f.flow.releaseConfirmed(key,auth)).status,'empty');assert.equal(f.deletions(),1);});
