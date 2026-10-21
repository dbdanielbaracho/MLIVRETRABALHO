import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Actual canonical cdp() and message observer. WebSocket/clock are explicit fixtures, NOT Chrome.
const source=fs.readFileSync(new URL('../../../scripts/web-browser-journey-e2e.cjs',import.meta.url),'utf8');
const commandStart=source.indexOf('function cdp(method,'),commandEnd=source.indexOf('\nasync function evaluate',commandStart);
const observerStart=source.indexOf("ws.addEventListener('message',event=>{"),observerEnd=source.indexOf('\n });',observerStart);
assert.ok(commandStart>=0&&commandEnd>commandStart&&observerStart>=0&&observerEnd>observerStart);
function fixture(){
 const commands:any[]=[],logs:string[]=[],timers=new Map<number,()=>void>();let callback:(event:any)=>void=()=>{},nextTimer=0;
 const context=vm.createContext({
  URL,Promise,Number,Error,JSON,Set,Map,
  api:new URL('http://127.0.0.1:3002'),web:new URL('http://127.0.0.1:3001'),
  sessionId:'session-fixture',commandId:0,networkViolation:undefined,continuationFailureReported:false,
  pending:new Map(),responses:[],captures:[],requestMethods:new Map(),apiPostRequests:[],teamReadFault:null,requestMetadata:new Map(),readFailures:[],
  setTimeout:(fn:()=>void,ms:number)=>{assert.equal(ms,15000);timers.set(++nextTimer,fn);return nextTimer;},
  clearTimeout:(id:number)=>timers.delete(id),
  console:{error:(...parts:unknown[])=>logs.push(parts.join(' '))},
  ws:{send:(data:string)=>commands.push(JSON.parse(data)),addEventListener:(name:string,fn:(event:any)=>void)=>{assert.equal(name,'message');callback=fn;}},
 });
 vm.runInContext(source.slice(commandStart,commandEnd)+'\n'+source.slice(observerStart,observerEnd+'\n });'.length),context);
 const receive=(message:object)=>callback({data:JSON.stringify(message)});
 return{context,commands,logs,timers,receive,
  pause(method='GET',url='http://127.0.0.1:3002/v1/company/jobs?secret=PRIVATE_FIXTURE'){
   receive({method:'Fetch.requestPaused',params:{requestId:'PRIVATE_REQUEST_ID',request:{method,url,headers:{authorization:'PRIVATE_FIXTURE'},postData:'PRIVATE_FIXTURE'}}});
  },
  reply(command:any,error?:object){receive({id:command.id,...(error?{error}:{result:{}})});},
  violation:()=>vm.runInContext('networkViolation',context),
  pending:()=>vm.runInContext('pending.size',context),
 };
}
const settle=async()=>{await Promise.resolve();await Promise.resolve();};
const diagnostic=(h:ReturnType<typeof fixture>)=>{
 assert.equal(h.logs.length,1);
 assert.ok(h.logs[0].startsWith('WEB_BROWSER_CDP_CONTINUATION_FAILURE '));
 return JSON.parse(h.logs[0].slice('WEB_BROWSER_CDP_CONTINUATION_FAILURE '.length));
};
for(const method of ['GET','POST']){
 test('canonical guarded '+method+' success preserves one continuation and leaves no failure',async()=>{
  const h=fixture();h.pause(method);assert.equal(h.commands.length,1);
  assert.equal(h.commands[0].method,'Fetch.continueRequest');assert.equal(h.commands[0].sessionId,'session-fixture');
  assert.equal(h.commands[0].params.requestId,'PRIVATE_REQUEST_ID');h.reply(h.commands[0]);await settle();
  assert.equal(h.violation(),undefined);assert.deepEqual(h.logs,[]);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);
 });
 test('canonical guarded '+method+' protocol rejection fails closed with sanitized code and no retry',async()=>{
  const h=fixture();h.pause(method);h.reply(h.commands[0],{code:-32000,message:'PRIVATE_FIXTURE token=PRIVATE_FIXTURE',data:{headers:'PRIVATE_FIXTURE'}});await settle();
  assert.equal(h.violation(),'CDP guarded request continuation failed');
  assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method,code:-32000});
  assert.ok(!JSON.stringify(h.logs).includes('PRIVATE'));assert.equal(h.commands.length,1);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);
 });
}
for(const code of [null,'PRIVATE_FIXTURE',1.5,Number.MAX_SAFE_INTEGER+1]){
 test('untrusted protocol code is reduced to null: '+String(code),async()=>{
  const h=fixture();h.pause('PRIVATE_FIXTURE');h.reply(h.commands[0],{code,message:'PRIVATE_FIXTURE'});await settle();
  assert.equal(h.violation(),'CDP guarded request continuation failed');
  assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method:'[other]',code:null});
 });
}
test('canonical continuation deadline stays 15000ms and timeout fails closed without retry',async()=>{
 const h=fixture();h.pause();assert.equal(h.timers.size,1);
 for(const callback of [...h.timers.values()])callback();await settle();
 assert.equal(h.violation(),'CDP guarded request continuation failed');
 assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method:'GET',code:null});assert.equal(h.pending(),0);assert.equal(h.commands.length,1);
});
test('first primary network violation survives a subsequent continuation rejection',async()=>{
 const h=fixture();vm.runInContext('networkViolation="Existing primary failure"',h.context);
 h.pause();h.reply(h.commands[0],{code:-1,message:'PRIVATE_FIXTURE'});await settle();
 assert.equal(h.violation(),'Existing primary failure');assert.equal(diagnostic(h).code,-1);
});
test('error storm emits one bounded first diagnostic while every pending command drains',async()=>{
 const h=fixture();for(let i=0;i<64;i++)h.pause(i===0?'POST':'GET');
 for(const [i,c] of h.commands.entries())h.reply(c,{code:-32000-i,message:'PRIVATE_FIXTURE'.repeat(10000)});await settle();
 assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method:'POST',code:-32000});
 assert.ok(h.logs[0].length<200);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);assert.equal(h.commands.length,64);
});
for(const reject of [false,true]){
 test('external origin remains blocked without continue or retry, rejection='+reject,async()=>{
  const h=fixture();h.pause('POST','https://outside.invalid/v1/write?secret=PRIVATE_FIXTURE');
  assert.equal(h.commands[0].method,'Fetch.failRequest');assert.equal(h.commands[0].params.errorReason,'BlockedByClient');
  const primary=h.violation();assert.match(primary,/Non-local application request blocked/);
  h.reply(h.commands[0],reject?{code:-32000,message:'PRIVATE_FIXTURE'}:undefined);await settle();
  assert.equal(h.violation(),primary);assert.equal(h.commands.length,1);assert.equal(h.pending(),0);
  if(reject)assert.deepEqual(diagnostic(h),{command:'Fetch.failRequest',method:'POST',code:-32000});else assert.deepEqual(h.logs,[]);
 });
}
test('controlled one-read fault remains held for explicit fulfillment, not continued or silently failed',async()=>{
 const h=fixture();vm.runInContext('teamReadFault={}',h.context);
 h.pause('GET','http://127.0.0.1:3002/v1/company/teams');await settle();
 assert.equal(h.commands.length,0);assert.equal(h.violation(),undefined);assert.deepEqual(h.logs,[]);
 assert.equal(vm.runInContext('teamReadFault.requestId',h.context),'PRIVATE_REQUEST_ID');
});
test('actual cdp rejects generic error with numeric code only and consumes its pending timer',async()=>{
 const h=fixture(),promise=vm.runInContext('cdp("Fixture.command",{},false)',h.context) as Promise<unknown>;
 const failed=assert.rejects(promise,(error:any)=>error.message==='CDP command failed'&&error.code===-32001&&!JSON.stringify(error).includes('PRIVATE'));
 h.reply(h.commands[0],{code:-32001,message:'PRIVATE_FIXTURE',data:'PRIVATE_FIXTURE'});await failed;
 assert.equal(h.commands[0].sessionId,undefined);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);assert.deepEqual(h.logs,[]);
});
