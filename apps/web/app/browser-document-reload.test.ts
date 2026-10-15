import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source=readFileSync(new URL('../../../scripts/web-browser-journey-e2e.cjs',import.meta.url),'utf8');
const start=source.indexOf('async function until('),end=source.indexOf('\nasync function click(',start);
assert.ok(start>=0&&end>start,'Actual browser helper source required');

function fixture(mode:'delayed'|'same-document'|'incomplete'|'command-error'){
 let clock=0,origin=100,state='complete',sleeps=0,reloads=0;
 const context=vm.createContext({
  networkViolation:undefined,Date:{now:()=>clock},
  sleep:async()=>{clock+=100;sleeps++;if(mode==='delayed'){origin=200;state=sleeps===1?'loading':'complete';}},
  evaluate:async(expression:string)=>vm.runInNewContext(expression,{performance:{timeOrigin:origin},document:{readyState:state}}),
  cdp:async(method:string,params:{ignoreCache:boolean})=>{assert.equal(method,'Page.reload');assert.equal(params.ignoreCache,true);assert.equal(Object.keys(params).join(','),'ignoreCache');reloads++;if(mode==='command-error')throw Error('reload-command-failed');if(mode==='incomplete'){origin=200;state='loading';}return{};},
 });
 const reload=vm.runInContext(source.slice(start,end)+'\nreloadDocument',context) as ()=>Promise<{previousTimeOrigin:number;currentTimeOrigin:number}>;
 return{reload,metrics:()=>({sleeps,reloads})};
}

test('real browser reload helper waits past old complete DOM and new incomplete DOM',async()=>{
 const f=fixture('delayed');const r=await f.reload();
 assert.equal(r.previousTimeOrigin,100);assert.equal(r.currentTimeOrigin,200);
 assert.deepEqual(f.metrics(),{sleeps:2,reloads:1});
});
test('real browser reload helper rejects a command ACK without document change',async()=>{
 const f=fixture('same-document');await assert.rejects(f.reload(),/new complete reload document/);
 assert.equal(f.metrics().reloads,1);
});
test('real browser reload helper rejects new document that never completes',async()=>{
 const f=fixture('incomplete');await assert.rejects(f.reload(),/new complete reload document/);
 assert.equal(f.metrics().reloads,1);
});
test('real browser reload helper propagates command failure without retry',async()=>{
 const f=fixture('command-error');await assert.rejects(f.reload(),/reload-command-failed/);
 assert.deepEqual(f.metrics(),{sleeps:0,reloads:1});
});

const observerSource=source.slice(source.indexOf('function observeNativeFetch('),source.indexOf('\nasync function click('));
function nativeFixture(nativeFetch:(...args:any[])=>Promise<any>,binding?:(value:string)=>void){
 const events:any[]=[];
 const context=vm.createContext({fetch:nativeFetch,URL,location:{href:'http://127.0.0.1:3001/'},Date,mlivreFixtureFetchTrace:binding||((value:string)=>events.push(JSON.parse(value)))});
 vm.runInContext(observerSource+'\nobserveNativeFetch("http://127.0.0.1:3002","mlivreFixtureFetchTrace")',context);
 return{fetch:vm.runInContext('fetch',context),events};
}
test('native fetch observer preserves exact promise arguments receiver and unread body',async()=>{
 const secret='NEVER_LOG_THIS',url='http://127.0.0.1:3002/v1/company/jobs?secret='+secret,options={headers:{authorization:secret},body:secret},receiver={fixture:true};let calls=0;
 const response={status:200,type:'cors',json(){throw Error('Observer must not read body');}},promise=Promise.resolve(response);
 const f=nativeFixture(function(this:unknown,input:unknown,init:unknown){calls++;assert.equal(this,receiver);assert.equal(input,url);assert.equal(init,options);return promise;});
 assert.equal(f.fetch.call(receiver,url,options),promise);assert.equal(await promise,response);assert.equal(calls,1);
 assert.equal(f.events[0].path,'/v1/company/jobs');assert.equal(f.events[0].status,200);assert.ok(!JSON.stringify(f.events).includes(secret));
});
test('native fetch observer preserves original rejection and redacts unclassified messages',async()=>{
 const error=TypeError('Bearer NEVER_LOG_THIS invalid header'),promise=Promise.reject(error),f=nativeFixture(()=>promise);
 assert.equal(f.fetch('http://127.0.0.1:3002/v1/company/jobs'),promise);await assert.rejects(promise,(x:unknown)=>x===error);
 assert.equal(f.events[0].name,'TypeError');assert.equal(f.events[0].message,'[unclassified native fetch error]');assert.ok(!JSON.stringify(f.events).includes('NEVER_LOG_THIS'));
});
test('native fetch observer binding failure cannot alter transport result',async()=>{
 const promise=Promise.resolve({status:201,type:'cors'}),f=nativeFixture(()=>promise,()=>{throw Error('Observer unavailable');});
 assert.equal(f.fetch('http://127.0.0.1:3002/v1/company/teams'),promise);assert.equal((await promise).status,201);await Promise.resolve();
});
test('native fetch observer does not record unrelated origins',async()=>{
 const promise=Promise.resolve({status:200,type:'basic'}),f=nativeFixture(()=>promise);assert.equal(f.fetch('http://127.0.0.1:3001/'),promise);await promise;assert.deepEqual(f.events,[]);
});
