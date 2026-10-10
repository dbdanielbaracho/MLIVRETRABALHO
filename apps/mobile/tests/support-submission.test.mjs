import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const asModule=source=>'data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source,{mode:'strip'})).toString('base64');
const intentURL=asModule(readFileSync(new URL('../lib/support-intent.ts',import.meta.url),'utf8'));
const {createSupportIntentStore,pendingSupportIntent}=await import(intentURL);
const {createSupportSubmission}=await import(asModule(readFileSync(new URL('../lib/support-submission.ts',import.meta.url),'utf8').replaceAll("'./support-intent'",JSON.stringify(intentURL))));
const identity='11111111-2222-3333-4444-555555555555',other='22222222-3333-4444-5555-666666666666',tenant='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',assignment='bbbbbbbb-cccc-dddd-eeee-ffffffffffff',key='cccccccc-dddd-4eee-8fff-aaaaaaaaaaaa',caseId='eeeeeeee-ffff-aaaa-bbbb-cccccccccccc';
const authorization='Bearer session-a',payload={assignmentId:assignment,category:'schedule',description:'Fixture real',priority:'normal'};
const ack={id:caseId,category:'schedule',priority:'normal',status:'open',createdAt:'2026-10-10T12:00:00Z'};
const ok=value=>({ok:true,json:async()=>value}),deferred=()=>{let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};};
function fixture(timeoutMs=15000){
 const values=new Map(),events=[],calls=[];let auth=authorization,current=true,owner=identity;
 const adapter={read:async id=>{events.push('read');return values.get(id)??null;},write:async(id,value)=>{events.push('write');values.set(id,value);},remove:async id=>{events.push('remove');values.delete(id);}};
 const store=createSupportIntentStore(adapter);
 let handler=async path=>ok(path==='/me'?{id:owner}:path==='/support-cases/intent'?{requestKey:key,reporterIdentityId:owner}:ack);
 const options={getHeaders:async()=>({Authorization:auth,'x-tenant-id':'must-not-use-default'}),transport:async(path,opts)=>{calls.push({path,opts});events.push(path);return handler(path,opts);},store,isCurrent:()=>current,timeoutMs};
 const flow=createSupportSubmission(options);
 return {values,events,calls,adapter,store,flow,options,setAuth:v=>{auth=v;},setOwner:v=>{owner=v;},setCurrent:v=>{current=v;},setHandler:h=>{handler=h;}};
}
const pending=()=>pendingSupportIntent(identity,tenant,key,payload);
const newSend=f=>f.flow.sendNew(tenant,assignment,payload,authorization);
test('new human intent verifies identity, prepares once, persists before POST, and confirms durable real ACK',async()=>{
 const f=fixture();const result=await newSend(f);assert.equal(result.status,'confirmed');assert.equal(result.record.requestKey,key);
 assert.deepEqual(f.calls.map(c=>c.path),['/me','/support-cases/intent','/support-cases']);
 const post=f.calls[2];assert.equal(post.opts.headers.Authorization,authorization);assert.equal(post.opts.headers['x-tenant-id'],tenant);assert.equal(post.opts.headers['idempotency-key'],key);assert.deepEqual(JSON.parse(post.opts.body),payload);
 assert.deepEqual(f.calls[0].opts.headers,{Authorization:authorization});assert.ok(f.events.indexOf('write')<f.events.indexOf('/support-cases'));
 const stored=await f.store.load(identity);assert.equal(stored.record.phase,'confirmed');assert.equal(stored.record.acknowledgement.id,caseId);
});
test('empty inspection is confirmed only by valid authenticated identity and successful storage read',async()=>{
 const f=fixture();assert.deepEqual(await f.flow.inspect(authorization),{status:'empty',authorization});assert.deepEqual(f.calls.map(c=>c.path),['/me']);
 for(const me of [null,{}, {id:'opaque-id'}]){f.setHandler(async()=>ok(me));assert.deepEqual(await f.flow.inspect(authorization),{status:'error'});}
});
test('invalid body/context cannot prepare or post, with Unicode limit and assignment equality enforced',async()=>{
 const f=fixture();for(const [t,a,body] of [['bad',assignment,payload],[tenant,'bad',payload],[tenant,undefined,payload],[tenant,assignment,{...payload,assignmentId:other}],[tenant,assignment,{...payload,description:' '}],[tenant,assignment,{...payload,description:'😀'.repeat(4001)}]]){
  assert.deepEqual(await f.flow.sendNew(t,a,body,authorization),{status:'invalid'});
 }
 assert.equal(f.calls.length,0);assert.equal(f.values.size,0);
});
test('missing or switched session and expired focus cannot read identity or start support',async()=>{
 const f=fixture();f.setAuth('Bearer new-user');assert.deepEqual(await newSend(f),{status:'stale'});f.setAuth('');assert.deepEqual(await newSend(f),{status:'stale'});f.setAuth(authorization);f.setCurrent(false);assert.deepEqual(await newSend(f),{status:'stale'});
 assert.equal(f.calls.length,0);assert.equal(f.values.size,0);
});
test('unauthorized/offline/me JSON errors never prepare support or produce a pending draft',async()=>{
 for(const handler of [async()=>({ok:false,json:async()=>({})}),async()=>{throw Error('offline');},async()=>({ok:true,json:async()=>{throw Error('bad-json');}})]){
  const f=fixture();f.setHandler(handler);assert.deepEqual(await newSend(f),{status:'error'});assert.equal(f.calls.length,1);assert.equal(f.values.size,0);
 }
});
test('preparation failures, noncryptographic keys and wrong reporter never persist or create a case',async()=>{
 for(const preparation of [null,{}, {requestKey:'bad',reporterIdentityId:identity},{requestKey:key,reporterIdentityId:other},{requestKey:'cccccccc-dddd-1eee-8fff-aaaaaaaaaaaa',reporterIdentityId:identity}]){
  const f=fixture();f.setHandler(async path=>ok(path==='/me'?{id:identity}:preparation));assert.deepEqual(await newSend(f),{status:'error'});assert.equal(f.calls.some(c=>c.path==='/support-cases'),false);assert.equal(f.values.size,0);
 }
 const f=fixture();f.setHandler(async path=>path==='/me'?ok({id:identity}):{ok:false,json:async()=>({})});assert.deepEqual(await newSend(f),{status:'error'});assert.equal(f.values.size,0);
});
test('storage failure and corrupt slot cannot become a fresh POST or a silently replaced key',async()=>{
 const f=fixture();f.values.set(identity,'corrupt');assert.deepEqual(await newSend(f),{status:'error'});assert.deepEqual(f.calls.map(c=>c.path),['/me']);assert.equal(f.values.get(identity),'corrupt');
 const g=fixture();const flow=createSupportSubmission({...g.options,store:createSupportIntentStore({...g.adapter,write:async()=>{throw Error('storage_failed');}})});
 assert.deepEqual(await flow.sendNew(tenant,assignment,payload,authorization),{status:'error'});assert.equal(g.calls.some(c=>c.path==='/support-cases'),false);
});
test('existing pending or confirmed intent is recovered without key preparation or implicit retry',async()=>{
 const f=fixture();await f.store.stage(pending());const result=await f.flow.sendNew(other,assignment,{...payload,description:'Different'},authorization);assert.equal(result.status,'pending');assert.deepEqual(result.record,pending());assert.deepEqual(f.calls.map(c=>c.path),['/me']);
 await f.store.confirm(identity,key,ack);f.calls.length=0;assert.equal((await newSend(f)).status,'confirmed');assert.deepEqual(f.calls.map(c=>c.path),['/me']);
});
test('offline, non-2xx, invalid ACK and JSON failures after POST retain pending and report unknown',async()=>{
 for(const response of [async()=>{throw Error('offline');},async()=>({ok:false,json:async()=>({})}),async()=>ok({...ack,id:'bad-id'}),async()=>ok({...ack,category:'other'}),async()=>({ok:true,json:async()=>{throw Error('bad-json');}})]){
  const f=fixture();f.setHandler(async path=>path==='/me'?ok({id:identity}):path==='/support-cases/intent'?ok({requestKey:key,reporterIdentityId:identity}):response());
  assert.deepEqual(await newSend(f),{status:'unknown'});assert.deepEqual((await f.store.load(identity)).record,pending());
 }
});
test('explicit retry reuses immutable original tenant/payload/key, including after restart and relogin',async()=>{
 const f=fixture();await f.store.stage(pending());f.setAuth('Bearer relogin');
 const flow=createSupportSubmission({...f.options});const result=await flow.retry(key,'Bearer relogin');assert.equal(result.status,'confirmed');assert.deepEqual(f.calls.map(c=>c.path),['/me','/support-cases']);
 const request=f.calls[1];assert.equal(request.opts.headers['x-tenant-id'],tenant);assert.equal(request.opts.headers['idempotency-key'],key);assert.deepEqual(JSON.parse(request.opts.body),payload);
});
test('retry of wrong key, absent slot or another identity cannot send the previous user intent',async()=>{
 const f=fixture();await f.store.stage(pending());assert.deepEqual(await f.flow.retry(other,authorization),{status:'error'});f.setOwner(other);assert.deepEqual(await f.flow.retry(key,authorization),{status:'error'});
 assert.equal(f.calls.some(c=>c.path==='/support-cases'||c.path==='/support-cases/intent'),false);assert.deepEqual((await f.store.load(identity)).record,pending());
});
test('session change during preparation JSON prevents persistence and POST',async()=>{
 const f=fixture(),late=deferred();f.setHandler(async path=>path==='/me'?ok({id:identity}):{ok:true,json:()=>late.promise});
 const result=newSend(f);while(!f.calls.some(c=>c.path==='/support-cases/intent'))await new Promise(r=>setImmediate(r));
 f.setAuth('Bearer other');late.resolve({requestKey:key,reporterIdentityId:identity});assert.deepEqual(await result,{status:'stale'});assert.equal(f.values.size,0);assert.equal(f.calls.some(c=>c.path==='/support-cases'),false);
});
test('session change while persisting keeps the old-owner barrier but never starts transport',async()=>{
 const f=fixture(),late=deferred();const store=createSupportIntentStore({...f.adapter,write:async(id,value)=>{await f.adapter.write(id,value);await late.promise;}});
 const flow=createSupportSubmission({...f.options,store}),result=flow.sendNew(tenant,assignment,payload,authorization);
 while(f.values.size===0)await new Promise(r=>setImmediate(r));f.setAuth('Bearer other');late.resolve();assert.deepEqual(await result,{status:'stale'});assert.equal(f.calls.some(c=>c.path==='/support-cases'),false);assert.deepEqual((await store.load(identity)).record,pending());
});
test('late POST acknowledgement after logout/focus loss cannot confirm or display the old user result',async()=>{
 for(const switchContext of [f=>f.setAuth('Bearer other'),f=>f.setCurrent(false)]){
  const f=fixture(),late=deferred();f.setHandler(async path=>path==='/me'?ok({id:identity}):path==='/support-cases/intent'?ok({requestKey:key,reporterIdentityId:identity}):{ok:true,json:()=>late.promise});
  const result=newSend(f);while(!f.calls.some(c=>c.path==='/support-cases'))await new Promise(r=>setImmediate(r));switchContext(f);late.resolve(ack);
  assert.deepEqual(await result,{status:'stale'});assert.deepEqual((await f.store.load(identity)).record,pending());
 }
});
test('post deadline aborts even ignored transport and late ACK cannot confirm the pending barrier',async()=>{
 const f=fixture(10),late=deferred();f.setHandler(async path=>path==='/me'?ok({id:identity}):path==='/support-cases/intent'?ok({requestKey:key,reporterIdentityId:identity}):late.promise);
 const result=await newSend(f);assert.deepEqual(result,{status:'unknown'});assert.equal(f.calls[2].opts.signal.aborted,true);late.resolve(ok(ack));await new Promise(r=>setImmediate(r));assert.deepEqual((await f.store.load(identity)).record,pending());
});
test('preparation deadline creates no POST even when its late response ignores abort',async()=>{
 const f=fixture(10),late=deferred();f.setHandler(async path=>path==='/me'?ok({id:identity}):late.promise);
 assert.deepEqual(await newSend(f),{status:'error'});late.resolve(ok({requestKey:key,reporterIdentityId:identity}));await new Promise(r=>setImmediate(r));assert.equal(f.values.size,0);assert.equal(f.calls.some(c=>c.path==='/support-cases'),false);
});
test('double action is busy while active, and explicit cancellation retains an uncertain sent attempt',async()=>{
 const f=fixture(),late=deferred();f.setHandler(async path=>path==='/me'?ok({id:identity}):path==='/support-cases/intent'?ok({requestKey:key,reporterIdentityId:identity}):late.promise);
 const first=newSend(f);while(!f.calls.some(c=>c.path==='/support-cases'))await new Promise(r=>setImmediate(r));assert.deepEqual(await newSend(f),{status:'busy'});f.flow.cancel();assert.deepEqual(await first,{status:'stale'});
 late.resolve(ok(ack));await new Promise(r=>setImmediate(r));assert.deepEqual((await f.store.load(identity)).record,pending());assert.equal(f.calls.filter(c=>c.path==='/support-cases').length,1);
});
test('failed confirmation storage keeps unknown; a later retry recovers the same server case',async()=>{
 const f=fixture();let writes=0;const store=createSupportIntentStore({...f.adapter,write:async(id,value)=>{writes++;if(writes===2)throw Error('confirm_failed');await f.adapter.write(id,value);}});
 const flow=createSupportSubmission({...f.options,store});assert.deepEqual(await flow.sendNew(tenant,assignment,payload,authorization),{status:'unknown'});assert.equal((await store.load(identity)).record.phase,'pending');
 assert.equal((await flow.retry(key,authorization)).status,'confirmed');assert.equal(f.calls.filter(c=>c.path==='/support-cases/intent').length,1);assert.equal(f.calls.filter(c=>c.path==='/support-cases').length,2);
});
test('release authenticates current owner and only clears a confirmed exact-key slot',async()=>{
 const f=fixture();await f.store.stage(pending());assert.deepEqual(await f.flow.releaseConfirmed(key,authorization),{status:'error'});await f.store.confirm(identity,key,ack);
 f.setOwner(other);assert.deepEqual(await f.flow.releaseConfirmed(key,authorization),{status:'error'});f.setOwner(identity);assert.deepEqual(await f.flow.releaseConfirmed(key,authorization),{status:'empty',authorization});assert.equal(f.calls.every(c=>c.path==='/me'),true);
});
