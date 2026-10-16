import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EventEmitter} from 'node:events';

// Actual startup helper; child/streams/clock/port-file are explicit fixtures, NOT Chrome.
const source=fs.readFileSync(new URL('../../../scripts/web-browser-journey-e2e.cjs',import.meta.url),'utf8');
const start=source.indexOf('function waitForBrowserEndpoint('),end=source.indexOf('async function apiCall(',start);
assert.ok(start>=0&&end>start);
const wait=vm.runInNewContext('('+source.slice(start,end).trim()+')',{URL,Buffer});
function harness(portText?:string){
 const child:any=new EventEmitter();Object.assign(child,{stderr:new EventEmitter(),stdout:new EventEmitter(),spawnfile:'/usr/bin/google-chrome',pid:123,exitCode:null,signalCode:null,killed:false});
 const timers=new Map<number,()=>void>();let elapsed=0,id=0;const diagnostics:any[]=[];
 const promise=wait(child,'fixture-profile',(d:any)=>diagnostics.push(JSON.parse(JSON.stringify(d))),{clock:{now:()=>elapsed,setTimeout:(fn:()=>void,ms:number)=>{assert.equal(ms,15000);timers.set(++id,fn);return id;},clearTimeout:(key:number)=>timers.delete(key)},readPort:()=>{if(portText===undefined)throw Error('absent');return portText;}});
 return{child,promise,timers,diagnostics,expire(){elapsed=15000;for(const callback of [...timers.values()])callback();},assertClean(){assert.equal(timers.size,0);for(const event of ['spawn','error','exit'])assert.equal(child.listenerCount(event),0);assert.equal(child.stderr.listenerCount('data'),0);assert.equal(child.stdout.listenerCount('data'),0);}};
}
test('empty-stderr startup timeout still records alive child metadata and fails at the unchanged 15 second deadline',async()=>{
 const h=harness();h.child.emit('spawn');const failed=assert.rejects(h.promise,/Browser startup timeout/);h.expire();await failed;
 assert.equal(h.diagnostics.length,1);const d=h.diagnostics[0];assert.equal(d.pid,123);assert.equal(d.spawnObserved,true);assert.equal(d.exitObserved,false);assert.equal(d.exitCode,null);assert.equal(d.stderrBytes,0);assert.equal(d.stdoutBytes,0);assert.equal(d.elapsedMs,15000);assert.equal(d.timeoutMs,15000);assert.deepEqual(d.portFile,{exists:false,valid:false});h.assertClean();
});
test('fragmented real loopback stderr endpoint resolves and removes all startup listeners without delayed failure',async()=>{
 const h=harness();h.child.emit('spawn');h.child.stderr.emit('data','DevTools listen');h.child.stderr.emit('data','ing on ws://127.0.0.1:9222/devtools/browser/fixture-id\n');
 assert.equal(await h.promise,'ws://127.0.0.1:9222/devtools/browser/fixture-id');h.assertClean();h.expire();assert.equal(h.diagnostics.length,0);
});
test('stdout port-file and non-loopback endpoints are diagnostics only, cannot substitute for readiness, and reveal no raw stream data',async()=>{
 const h=harness('9222\n/devtools/browser/fixture-id\n');h.child.emit('spawn');h.child.stdout.emit('data','DevTools listening on ws://127.0.0.1:9222/devtools/browser/fixture-id\n');h.child.stderr.emit('data','DevTools listening on ws://example.invalid:9222/devtools/browser/foreign\nBearer SECRET_FIXTURE_VALUE');
 const failed=assert.rejects(h.promise,/startup timeout/);h.expire();await failed;const d=h.diagnostics[0];assert.deepEqual(d.portFile,{exists:true,valid:true});assert.equal(d.stdoutEndpointSeen,true);assert.equal(d.stderrEndpointSeen,false);assert.ok(d.stderrBytes>0&&d.stdoutBytes>0);assert.equal(d.binary,'google-chrome');assert.ok(!JSON.stringify(d).match(/SECRET|Bearer|fixture-id|example.invalid|fixture-profile|\/usr\/bin/));h.assertClean();
});
test('spawn errors and early exits fail immediately with sanitized status and clear the deadline',async()=>{
 for(const kind of ['error','exit']){
  const h=harness(),failed=assert.rejects(h.promise,kind==='error'?/spawn failed/:/exited before debugger/);
  if(kind==='error'){h.child.pid=undefined;h.child.emit('error',{code:'ENOENT',message:'SECRET_FIXTURE_VALUE'});}else{h.child.exitCode=23;h.child.signalCode='SIGABRT';h.child.emit('exit',23,'SIGABRT');}
  await failed;const d=h.diagnostics[0];assert.equal(d.elapsedMs,0);assert.equal(d.spawnErrorCode,kind==='error'?'ENOENT':null);assert.equal(d.exitObserved,kind==='exit');assert.ok(!JSON.stringify(d).includes('SECRET'));h.assertClean();
 }
});
