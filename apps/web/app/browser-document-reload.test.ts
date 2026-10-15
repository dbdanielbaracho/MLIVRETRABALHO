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
