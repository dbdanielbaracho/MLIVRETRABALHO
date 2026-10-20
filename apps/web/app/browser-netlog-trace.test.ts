import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
const {createNetLogTrace}=createRequire(import.meta.url)('../../../scripts/web-browser-netlog-trace.cjs');
const apiOrigin='http://127.0.0.1:3002';
const batch=(...value:any[])=>({method:'Tracing.dataCollected',params:{value}});
test('Chromium NetLog export is allowlisted before retention, with only exact public fixture paths and numeric errors',()=>{
 const t=createNetLogTrace({apiOrigin}),secret='SECRET_FIXTURE';
 const params:any={url:apiOrigin+'/v1/company/teams',method:'GET',net_error:-3,source_dependency:{id:7,type:2}};
 for(const key of ['headers','body','cookies','authorization','stack','source_start_time'])Object.defineProperty(params,key,{get(){throw Error('Forbidden raw data access');}});
 t.observe(batch({cat:'netlog',name:'URL_REQUEST_START_JOB',ph:'b',id2:{local:'0xab'},pid:12,tid:34,ts:100,args:{params}}));
 t.observe(batch({cat:'netlog',name:secret,ph:secret,id:secret,ts:NaN,args:{params:{net_error:-3,url:apiOrigin+'/v1/company/teams?token='+secret,method:secret,source_dependency:{id:secret,type:secret}}}}));
 t.observe(batch({cat:'disabled-by-default-netlog.sensitive',name:'FAILED',args:{params:{net_error:-3}}}));
 const s=t.snapshot();assert.equal(s.events.length,2);
 assert.deepEqual(s.events[0],{sequence:1,name:'URL_REQUEST_START_JOB',phase:'b',traceMicroseconds:100,pid:12,tid:34,id:'0xab',netError:-3,path:'/v1/company/teams',method:'GET',sourceDependencyId:7,sourceDependencyType:2});
 assert.equal(s.events[1].name,'[other-error]');assert.equal(s.events[1].path,null);assert.equal(s.events[1].method,null);assert.equal(s.events[1].id,null);assert.ok(!JSON.stringify(s).includes(secret));
 for(const url of ['http://localhost:3002/v1/company/teams',apiOrigin+'/v1/company/teams/foreign',apiOrigin+'.evil/v1/company/teams']){
  t.observe(batch({cat:'netlog',name:'FAILED',args:{params:{url,net_error:-3}}}));assert.equal(t.snapshot().events.at(-1).path,null);
 }
});
test('NetLog ring exposes retention loss, ignores unselected payloads, and detached snapshots cannot rewrite evidence',()=>{
 const t=createNetLogTrace({apiOrigin,maxEvents:2});
 for(let n=0;n<4;n++)t.observe(batch({cat:'netlog',name:'FAILED',ts:n,args:{params:{net_error:-3}}}));
 const s=t.snapshot();assert.equal(s.received,4);assert.equal(s.droppedEvents,2);assert.deepEqual(s.events.map((e:any)=>e.sequence),[3,4]);
 s.events[0].netError=0;s.events.pop();assert.equal(t.snapshot().events[0].netError,-3);assert.equal(t.snapshot().events.length,2);
 t.observe(batch({cat:'netlog',name:'UNSELECTED',args:{params:{url:'SECRET'}}}));assert.equal(t.snapshot().received,5);assert.equal(t.snapshot().events.length,2);
 for(const maxEvents of [0,-1,1.5,NaN,65537])assert.throws(()=>createNetLogTrace({apiOrigin,maxEvents}),/bound/);
 for(const apiOrigin of ['https://127.0.0.1:3002','http://example.test:3002','http://127.0.0.1:3002/','http://user:password@127.0.0.1:3002'])assert.throws(()=>createNetLogTrace({apiOrigin}),/loopback/);
 assert.match(t.snapshot().scope,/no inferred CDP request binding or root cause/);
});
test('Tracing is passive browser-level metadata only; completion and data loss cannot silently become capture success',async()=>{
 for(const dataLossOccurred of [false,true]){
  const calls:any[]=[],timers=new Map(),t=createNetLogTrace({apiOrigin,clock:{setTimeout(fn:any,ms:number){assert.equal(ms,15000);timers.set(1,fn);return 1;},clearTimeout(id:number){timers.delete(id);}}});
  const cdp=async(method:string,params:object,target:boolean)=>{
   calls.push({method,params,target});
   if(method==='Tracing.end')t.observe({method:'Tracing.tracingComplete',params:{dataLossOccurred}});
   return{};
  };
  await t.start(cdp);
  assert.deepEqual(calls[0],{method:'Tracing.start',params:{transferMode:'ReportEvents',traceConfig:{recordMode:'recordContinuously',traceBufferSizeInKb:16384,includedCategories:['netlog'],excludedCategories:['*']}},target:false});
  if(dataLossOccurred)await assert.rejects(t.stop(cdp),/data loss/);else await t.stop(cdp);
  assert.equal(timers.size,0);assert.equal(t.snapshot().completed,true);assert.equal(t.snapshot().dataLossOccurred,dataLossOccurred);
  assert.deepEqual(calls.map(x=>x.method),['Tracing.start','Tracing.end']);
 }
 const timers=new Map(),t=createNetLogTrace({apiOrigin,clock:{setTimeout(fn:any,ms:number){assert.equal(ms,15000);timers.set(1,fn);return 1;},clearTimeout(id:number){timers.delete(id);}}});
 const calls:string[]=[];await t.start(async(method:string)=>{calls.push(method);return{};});
 const stopping=assert.rejects(t.stop(async(method:string)=>{calls.push(method);return{};}),/completion timeout/);
 await Promise.resolve();assert.equal(timers.size,1);timers.get(1)();await stopping;assert.equal(timers.size,0);assert.equal(t.snapshot().completed,false);assert.deepEqual(calls,['Tracing.start','Tracing.end']);
});
test('NetLog integration preserves the existing guarded dispatcher and sticky twelve-case plus canonical gate',()=>{
 const probe=fs.readFileSync(new URL('../../../scripts/web-browser-transport-probe.cjs',import.meta.url),'utf8');
 assert.match(probe,/netLogTrace.observe\(m\)/);assert.match(probe,/await netLogTrace.start\(cdp\)/);assert.match(probe,/await netLogTrace.stop\(cdp\)/);
 assert.match(probe,/WEB_BROWSER_NETLOG_CAPTURE_FAILED'\);process.exitCode=1/);
 assert.match(probe,/dispatchContinuation\(allowed\?'Fetch.continueRequest':'Fetch.failRequest'/);
 assert.match(probe,/requestStage:'Request'/);assert.match(probe,/No insecure-context or permission override is allowed/);
 const shell=fs.readFileSync(new URL('../../../scripts/web-browser-journey-e2e.sh',import.meta.url),'utf8');
 assert.match(shell,/BROWSER_MATRIX_STATUS=1/);assert.match(shell,/exit "\$BROWSER_MATRIX_STATUS"/);
 assert.match(shell,/for browser_diagnostic_case in baseline log-only native-only instrumented/);
 assert.match(shell,/for browser_continuation in concurrent serial/);
 assert.match(shell,/node scripts\/web-browser-journey-e2e.cjs/);
});

test('default and maximum NetLog export remain below 64 KiB for a large explicit trace fixture, reporting every discarded row',()=>{
 for(const options of [{},{maxEvents:128}]){
  const t=createNetLogTrace({apiOrigin,...options});
  for(let n=0;n<8192;n++)t.observe(batch({cat:'netlog',name:'URL_REQUEST_DELEGATE_RESPONSE_STARTED',ph:'b',id2:{local:'0x'+'f'.repeat(32)},pid:2147483647,tid:2147483647,ts:9999999999999,args:{params:{net_error:-3,url:apiOrigin+'/v1/company/payment-events/reconciliation',method:'OPTIONS',source_dependency:{id:2147483647,type:2147483647}}}}));
  const s=t.snapshot();assert.equal(s.received,8192);assert.equal(s.events.length,128);assert.equal(s.droppedEvents,8064);
  assert.ok(Buffer.byteLength(JSON.stringify(s),'utf8')<=65536,'Diagnostic metadata export must fit the 64 KiB per-case budget');
 }
 assert.throws(()=>createNetLogTrace({apiOrigin,maxEvents:129}),/bound/);
});
