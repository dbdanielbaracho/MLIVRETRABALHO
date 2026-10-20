import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
const {createLifecycleTrace}=createRequire(import.meta.url)('../../../scripts/web-browser-lifecycle-trace.cjs');
const msg=(method:string,params:object={},sessionId='session-A')=>({method,params,sessionId});
test('CDP collector joins each failed request to its own frame and loader without assuming document replacement caused it',()=>{
 const t=createLifecycleTrace({now:()=>1000});
 t.observe(msg('Network.requestWillBeSent',{requestId:'1.1',frameId:'frame-A',loaderId:'loader-A',timestamp:3,wallTime:10}),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'1.2',frameId:'frame-B',loaderId:'loader-B',timestamp:4,wallTime:11}),'session-A');
 t.observe(msg('Page.frameNavigated',{frame:{id:'frame-A',loaderId:'loader-new'}}),'session-A');
 t.observe(msg('Network.loadingFailed',{requestId:'1.1',timestamp:5,canceled:true,errorText:'net::ERR_ABORTED'}),'session-A');
 t.observe(msg('Network.loadingFinished',{requestId:'1.2',timestamp:6}),'session-A');
 const s=t.snapshot(),a=s.events[3],b=s.events[4];assert.equal(a.loaderId,'loader-A');assert.equal(a.frameId,'frame-A');assert.equal(a.canceled,true);assert.equal(b.frameId,'frame-B');assert.equal(b.loaderId,'loader-B');assert.equal(s.pendingRequests,0);assert.deepEqual(s.events.map((x:any)=>x.sequence),[1,2,3,4,5]);assert.match(s.scope,/not causal/);
});
test('CDP receive clock, browser monotonic clock and browser wall clock remain explicit distinct domains',()=>{
 let host=5000;const t=createLifecycleTrace({now:()=>host--});
 for(const timestamp of [9,8])t.observe(msg('Page.lifecycleEvent',{frameId:'frame-A',loaderId:'loader-A',name:'load',timestamp}),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'1',timestamp:7,wallTime:1700000000,loaderId:''}),'session-A');
 const s=t.snapshot();assert.deepEqual(s.events.map((x:any)=>x.cdpMonotonicSeconds),[9,8,7]);assert.deepEqual(s.events.map((x:any)=>x.receivedAtMs),[5000,4999,4998]);assert.equal(s.events[2].loaderId,'');assert.equal(s.events[2].cdpWallSeconds,1700000000);assert.equal(s.events[0].cdpWallSeconds,undefined);assert.match(s.clockDomains.cdpMonotonicSeconds,/monotonic/);
});
test('CDP collector ignores browser messages, other sessions and unrelated methods; failed request without binding stays unknown',()=>{
 const t=createLifecycleTrace();t.observe(msg('Network.requestWillBeSent',{requestId:'1'},'other'),'session-A');t.observe(msg('Page.frameDetached',{frameId:'x'}),'');t.observe({method:'Runtime.executionContextsCleared'},'session-A');t.observe(msg('Fetch.requestPaused',{requestId:'secret'}),'session-A');
 t.observe(msg('Network.loadingFailed',{requestId:'1',timestamp:2}),'session-A');const s=t.snapshot();assert.equal(s.events.length,1);assert.equal(s.events[0].requestBindingObserved,false);assert.equal(s.events[0].frameId,null);assert.equal(s.events[0].canceled,null);
});
test('CDP context destruction and clear retain frame correlation without confusing reused numeric context IDs',()=>{
 const t=createLifecycleTrace();t.observe(msg('Runtime.executionContextCreated',{context:{id:4,uniqueId:'new-context',auxData:{frameId:'frame-A',isDefault:true}}}),'session-A');
 t.observe(msg('Runtime.executionContextDestroyed',{executionContextId:4,executionContextUniqueId:'old-context'}),'session-A');assert.equal(t.snapshot().events[1].contextBindingObserved,false);assert.equal(t.snapshot().knownContexts,1);
 t.observe(msg('Runtime.executionContextDestroyed',{executionContextId:4,executionContextUniqueId:'new-context'}),'session-A');assert.equal(t.snapshot().events[2].frameId,'frame-A');assert.equal(t.snapshot().knownContexts,0);
 t.observe(msg('Runtime.executionContextCreated',{context:{id:5,auxData:{frameId:'frame-B'}}}),'session-A');t.observe(msg('Runtime.executionContextsCleared'),'session-A');assert.equal(t.snapshot().events[4].knownContexts,1);assert.equal(t.snapshot().knownContexts,0);
});
test('CDP trace allowlist excludes URLs, origins, headers, bodies, stacks and arbitrary error or lifecycle text',()=>{
 const t=createLifecycleTrace(),secret='SECRET_FIXTURE';
 t.observe(msg('Network.requestWillBeSent',{requestId:'1',frameId:'frame-A',loaderId:'loader-A',request:{url:'https://'+secret,headers:{authorization:secret},postData:secret},initiator:{stack:secret},documentURL:secret}),'session-A');
 t.observe(msg('Page.frameNavigated',{frame:{id:'frame-A',loaderId:'loader-A',url:secret,name:secret,securityOrigin:secret}}),'session-A');
 t.observe(msg('Page.lifecycleEvent',{frameId:'frame-A',name:secret,timestamp:NaN}),'session-A');
 t.observe(msg('Network.loadingFailed',{requestId:'1',errorText:secret,blockedReason:secret,corsErrorStatus:{failedParameter:secret}}),'session-A');
 assert.ok(!JSON.stringify(t.snapshot()).includes(secret));assert.equal(t.snapshot().events[2].name,'[other]');assert.equal(t.snapshot().events[2].cdpMonotonicSeconds,null);assert.equal(t.snapshot().events[3].hasCorsError,true);
});
test('CDP trace bounds expose event loss and evicted request/context bindings rather than claiming absence',()=>{
 const t=createLifecycleTrace({maxEvents:2,maxRequests:1,maxContexts:1});
 for(const id of ['1','2'])t.observe(msg('Network.requestWillBeSent',{requestId:id,frameId:id,loaderId:id}),'session-A');
 for(const id of [1,2])t.observe(msg('Runtime.executionContextCreated',{context:{id}}),'session-A');
 t.observe(msg('Network.loadingFailed',{requestId:'1',canceled:true}),'session-A');
 const s=t.snapshot();assert.equal(s.droppedEvents,3);assert.equal(s.evictedRequests,1);assert.equal(s.evictedContexts,1);assert.equal(s.events[1].sequence,5);assert.equal(s.events[1].requestBindingObserved,false);
 for(const maxEvents of [0,-1,NaN,65537,1.5])assert.throws(()=>createLifecycleTrace({maxEvents}),/bound/);
});
test('CDP snapshot is detached from collector state and malformed metadata cannot fabricate IDs or timestamps',()=>{
 const t=createLifecycleTrace({now:()=>Infinity});t.observe(msg('Page.frameDetached',{frameId:'bad/id?token',reason:'arbitrary'}),'session-A');
 const s=t.snapshot();assert.equal(s.events[0].frameId,null);assert.equal(s.events[0].reason,null);assert.equal(s.events[0].receivedAtMs,null);s.events[0].frameId='mutated';s.events.pop();assert.equal(t.snapshot().events.length,1);assert.equal(t.snapshot().events[0].frameId,null);
});
test('probe integration is passive and old guarded continuation, deadlines and sticky matrix failure remain present',()=>{
 const source=fs.readFileSync(new URL('../../../scripts/web-browser-transport-probe.cjs',import.meta.url),'utf8');
 assert.match(source,/lifecycleTrace\.observe\(m,sessionId\)/);assert.match(source,/Page\.setLifecycleEventsEnabled',\{enabled:true\}/);assert.match(source,/WEB_BROWSER_LIFECYCLE_DIAGNOSTIC/);
 assert.match(source,/dispatchContinuation\(allowed\?'Fetch\.continueRequest':'Fetch\.failRequest'/);assert.match(source,/process\.exitCode=1/);assert.match(source,/Browser condition timeout/);
 const shell=fs.readFileSync(new URL('../../../scripts/web-browser-journey-e2e.sh',import.meta.url),'utf8');assert.match(shell,/BROWSER_MATRIX_STATUS=1/);assert.match(shell,/exit "\$BROWSER_MATRIX_STATUS"/);
});

// Initiator fixtures are explicit CDP-shaped metadata, not real preflight/RCA proof.
test('passive preflight link retains the explicit triggering request ID without borrowing its frame or loader',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'get.1',frameId:'frame-get',loaderId:'loader-get',initiator:{type:'script'}}),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'preflight.1',frameId:'frame-options',loaderId:'',initiator:{type:'preflight',requestId:'get.1'}}),'session-A');
 const row=t.snapshot().events[1];assert.equal(row.initiatorType,'preflight');assert.equal(row.initiatorRequestId,'get.1');
 assert.equal(row.requestId,'preflight.1');assert.equal(row.frameId,'frame-options');assert.equal(row.loaderId,'');
});
test('concurrent preflights retain distinct explicit trigger IDs and failed binding is not reassigned to another request',()=>{
 const t=createLifecycleTrace();
 for(const n of [1,2])t.observe(msg('Network.requestWillBeSent',{requestId:'preflight.'+n,frameId:'frame-'+n,loaderId:'loader-'+n,initiator:{type:'preflight',requestId:'get.'+n}}),'session-A');
 for(const n of [2,1])t.observe(msg('Network.loadingFailed',{requestId:'preflight.'+n,errorText:'net::ERR_ABORTED',canceled:true}),'session-A');
 const s=t.snapshot();assert.deepEqual(s.events.slice(2).map((e:any)=>[e.initiatorType,e.initiatorRequestId,e.frameId]),[['preflight','get.2','frame-2'],['preflight','get.1','frame-1']]);assert.equal(s.pendingRequests,0);
});
test('successful preflight settlement retains metadata but cannot fabricate a completed GET or server ACK',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId:'get'}}),'session-A');
 t.observe(msg('Network.loadingFinished',{requestId:'options',timestamp:2}),'session-A');
 const s=t.snapshot(),row=s.events[1];assert.equal(row.initiatorType,'preflight');assert.equal(row.initiatorRequestId,'get');
 assert.equal(row.event,'Network.loadingFinished');assert.equal(row.requestId,'options');assert.equal(s.events.length,2);assert.equal(s.pendingRequests,0);assert.equal('status' in row,false);
});
test('explicit preflight link remains a reference even when the triggering request was not observed',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId:'unobserved.get'}}),'session-A');
 const row=t.snapshot().events[0];assert.equal(row.initiatorRequestId,'unobserved.get');assert.equal(row.frameId,null);assert.equal(row.loaderId,null);assert.equal(t.snapshot().pendingRequests,1);assert.match(t.snapshot().scope,/no absence or root-cause/);
});
test('initiator type is allowlisted and only an explicit preflight may retain a trigger reference',()=>{
 const t=createLifecycleTrace(),types=['parser','script','preload','SignedExchange','preflight','FedCM','other'];
 for(const [i,type] of types.entries())t.observe(msg('Network.requestWillBeSent',{requestId:String(i),initiator:{type,requestId:'get'}}),'session-A');
 assert.deepEqual(t.snapshot().events.map((r:any)=>[r.initiatorType,r.initiatorRequestId]),types.map(type=>[type,type==='preflight'?'get':null]));
 for(const type of ['constructor','__proto__','SECRET?token','PREFLIGHT',null,3,{}]){
  t.observe(msg('Network.requestWillBeSent',{requestId:'bad',initiator:{type,requestId:'get'}}),'session-A');const r=t.snapshot().events.at(-1);assert.equal(r.initiatorType,null);assert.equal(r.initiatorRequestId,null);
 }
});
test('preflight trigger IDs reject empty overlong non-string URL/query/header-shaped values without logging them',()=>{
 const t=createLifecycleTrace();
 for(const requestId of ['', 'x'.repeat(129),3,{},null,'https://SECRET.invalid','id?token=SECRET','Bearer SECRET','id\nSECRET']){
  t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId}}),'session-A');
  assert.equal(t.snapshot().events.at(-1).initiatorRequestId,null);
 }
 t.observe(msg('Network.requestWillBeSent',{requestId:'valid',initiator:{type:'preflight',requestId:'x'.repeat(128)}}),'session-A');
 assert.equal(t.snapshot().events.at(-1).initiatorRequestId.length,128);assert.ok(!JSON.stringify(t.snapshot()).includes('SECRET'));
});
test('other sessions and missing initiators cannot supply a trigger binding to the expected session',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'same',initiator:{type:'preflight',requestId:'foreign'}},'session-B'),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'same'}),'session-A');
 t.observe(msg('Network.loadingFailed',{requestId:'same'}),'session-A');
 const s=t.snapshot();assert.equal(s.events.length,2);for(const r of s.events){assert.equal(r.initiatorType,null);assert.equal(r.initiatorRequestId,null);}assert.ok(!JSON.stringify(s).includes('foreign'));
});
test('collector never reads initiator URL/stack or transport data and does not mutate frozen input metadata',()=>{
 const t=createLifecycleTrace(),initiator:any={type:'preflight',requestId:'get'};
 for(const key of ['url','stack','lineNumber','columnNumber'])Object.defineProperty(initiator,key,{get(){throw Error('Forbidden data access');},enumerable:true});
 Object.freeze(initiator);const params=Object.freeze({requestId:'options',initiator});
 assert.doesNotThrow(()=>t.observe(msg('Network.requestWillBeSent',params),'session-A'));
 const row=t.snapshot().events[0];assert.equal(row.initiatorRequestId,'get');assert.equal(row.initiatorType,'preflight');assert.equal('url' in row,false);assert.equal('stack' in row,false);assert.equal('initiator' in row,false);
});
test('request-ID reuse overwrites an old initiator binding instead of attaching it to a redirected request',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'reused',frameId:'old',initiator:{type:'preflight',requestId:'old.get'}}),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'reused',frameId:'new',initiator:{type:'script'},redirectResponse:{url:'SECRET'}}),'session-A');
 t.observe(msg('Network.loadingFinished',{requestId:'reused'}),'session-A');
 const row=t.snapshot().events[2];assert.equal(row.frameId,'new');assert.equal(row.initiatorType,'script');assert.equal(row.initiatorRequestId,null);assert.equal(t.snapshot().events[1].redirect,true);
});
test('trigger settlement before preflight failure does not delete the preflight-owned reference',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'get',initiator:{type:'script'}}),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId:'get'}}),'session-A');
 t.observe(msg('Network.loadingFinished',{requestId:'get'}),'session-A');t.observe(msg('Network.loadingFailed',{requestId:'options'}),'session-A');
 assert.equal(t.snapshot().events[3].initiatorRequestId,'get');assert.equal(t.snapshot().pendingRequests,0);
});
test('initiator snapshots are detached and cannot rewrite pending request metadata',()=>{
 const t=createLifecycleTrace();t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId:'get'}}),'session-A');
 const copy=t.snapshot();copy.events[0].initiatorRequestId='forged';copy.events[0].initiatorType='other';
 t.observe(msg('Network.loadingFinished',{requestId:'options'}),'session-A');
 const row=t.snapshot().events[1];assert.equal(row.initiatorType,'preflight');assert.equal(row.initiatorRequestId,'get');
});
test('bounded request eviction reports unknown initiator rather than borrowing a surviving preflight reference',()=>{
 const t=createLifecycleTrace({maxEvents:2,maxRequests:1,maxContexts:1});
 for(const n of [1,2])t.observe(msg('Network.requestWillBeSent',{requestId:'options.'+n,initiator:{type:'preflight',requestId:'get.'+n}}),'session-A');
 t.observe(msg('Network.loadingFailed',{requestId:'options.1'}),'session-A');
 let s=t.snapshot(),row=s.events.at(-1);assert.equal(s.evictedRequests,1);assert.equal(s.droppedEvents,1);assert.equal(row.requestBindingObserved,false);assert.equal(row.initiatorType,null);assert.equal(row.initiatorRequestId,null);
 t.observe(msg('Network.loadingFinished',{requestId:'options.2'}),'session-A');s=t.snapshot();assert.equal(s.events.at(-1).initiatorRequestId,'get.2');assert.equal(s.pendingRequests,0);assert.equal(s.events.length,2);assert.equal(s.droppedEvents,2);
});
