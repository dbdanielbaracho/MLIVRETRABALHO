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
