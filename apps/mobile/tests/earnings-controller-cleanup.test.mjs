import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadEarnings} from '../lib/earnings.ts';
import {runForSession} from '../lib/session-context.ts';
// Actual Ganhos pre-JSX code and real helpers. Hooks, clock, auth and JSON transport
// are explicit fixtures; tracked native AbortSignals expose only listener ownership.
const rows=[{id:'actual-entry',tenantId:'actual-company',title:'Actual work',amountCents:1200,status:'payable',createdAt:'2026-10-18T12:00:00Z'}];
const stages=['auth','fetch','json','final-auth'];
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function screen(stage='none',data=rows){
 const source=fs.readFileSync(new URL('../app/ganhos.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Ganhos('),end=source.indexOf('\n const items=',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {load};\n}',{mode:'strip'});
 const keys=['useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','runForSession','loadEarnings','setTimeout','clearTimeout','fetch','AbortController'];
 const create=new Function(...keys,prefix+'\nreturn Ganhos();');
 const state=[],refs=[],timers=new Map(),signals=[],calls=[];let si=0,ri=0,focus,cleanup,handlers,tid=0,headers={Authorization:'Bearer actual-owner'};
 const slot=pause=>({stage:pause,gate:deferred(),auth:0,blocked:false});let current=slot(stage);
 class TrackedController extends AbortController{
  constructor(){super();const listeners=new Set(),add=this.signal.addEventListener.bind(this.signal),remove=this.signal.removeEventListener.bind(this.signal);this.signal.addEventListener=(type,callback,...rest)=>{if(type==='abort')listeners.add(callback);return add(type,callback,...rest)};this.signal.removeEventListener=(type,callback,...rest)=>{if(type==='abort')listeners.delete(callback);return remove(type,callback,...rest)};signals.push({signal:this.signal,listeners});}
 }
 const wait=async(s,at)=>{if(s.stage===at){s.blocked=true;await s.gate.promise;}};
 const auth=async()=>{const s=current;s.auth++;await wait(s,s.auth===1?'auth':'final-auth');return {...headers}};
 const fetch=async(path,options)=>{const s=current;calls.push({path,options});await wait(s,'fetch');return {ok:true,json:async()=>{await wait(s,'json');return data}}};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=typeof initial==='function'?initial():initial;return[state[i],v=>{state[i]=typeof v==='function'?v(state[i]):v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,x=>x,runForSession,loadEarnings,(callback,ms)=>{assert.equal(ms,15000);const id=++tid;timers.set(id,callback);return id},id=>timers.delete(id),fetch,TrackedController);}
 render();cleanup=focus();
 return {state,calls,signals,refs,timers,pump:()=>new Promise(setImmediate),registry:()=>refs[2].current,
  timer:()=>{const entry=[...timers.entries()].at(-1);assert.ok(entry);return ()=>{timers.delete(entry[0]);entry[1]()};},
  pending:()=>current,release:s=>{s.stage='none';s.gate.resolve()},
  retry:pause=>{current=slot(pause);void handlers.load();return current},
  blur:()=>cleanup(),refocus:pause=>{cleanup();current=slot(pause);render();cleanup=focus();return current},
  changeOwner:()=>{headers={Authorization:'Bearer other-owner'}}};
}
function onlyReads(h,count){assert.equal(h.calls.length,count);for(const c of h.calls){assert.equal(c.path,'/earnings/mine');assert.ok(!c.options.method||c.options.method==='GET');assert.equal(c.options.headers.Authorization,'Bearer actual-owner');}}
for(const stage of stages)test('earnings deadline retires its controller and focus listener before '+stage+' settles',async()=>{
 const h=screen(stage),old=h.pending();await h.pump();assert.equal(old.blocked,true);assert.equal(h.registry().size,1);assert.equal(h.signals[0].listeners.size,1);
 h.timer()();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.registry().size,0);assert.equal(h.signals[0].listeners.size,0);assert.equal(h.signals[1].signal.aborted,true);
 h.release(old);await h.pump();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.registry().size,0);onlyReads(h,stage==='auth'?0:1);h.blur();
});
for(const data of [[],rows])test('earnings timely '+(data.length?'payable JSON':'empty JSON')+' is ready and cleans its own resources',async()=>{
 const h=screen('none',data);await h.pump();assert.deepEqual(h.state[0],{status:'ready',data});assert.equal(h.registry().size,0);assert.equal(h.signals[0].listeners.size,0);assert.equal(h.timers.size,0);onlyReads(h,1);h.blur();
});
for(const stage of stages)test('earnings old finally cannot retire a new explicit read in the same focus after '+stage+' expiry',async()=>{
 const h=screen(stage),old=h.pending();await h.pump();h.timer()();const fresh=h.retry('fetch');await h.pump();assert.equal(h.registry().size,1);const controller=[...h.registry()][0];assert.equal(controller.signal.aborted,false);
 h.release(old);await h.pump();assert.equal(h.registry().size,1);assert.equal(h.registry().has(controller),true);assert.deepEqual(h.state[0],{status:'loading'});assert.equal(controller.signal.aborted,false);
 h.release(fresh);await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:rows});assert.equal(h.registry().size,0);assert.equal(h.signals[0].listeners.size,0);onlyReads(h,stage==='auth'?1:2);h.blur();
});
for(const stage of stages)test('earnings repeated old timer cannot affect a newer same-focus read after '+stage,async()=>{
 const h=screen(stage),old=h.pending();await h.pump();const timer=h.timer();timer();const fresh=h.retry('fetch');await h.pump();const controller=[...h.registry()].at(-1);timer();assert.equal(h.registry().size,1);assert.equal(h.registry().has(controller),true);assert.equal(controller.signal.aborted,false);assert.deepEqual(h.state[0],{status:'loading'});
 h.release(fresh);await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:rows});timer();assert.deepEqual(h.state[0],{status:'ready',data:rows});h.release(old);await h.pump();assert.equal(h.registry().size,0);assert.equal(h.signals[0].listeners.size,0);h.blur();
});
for(const stage of ['auth','json'])test('earnings expired listener and late '+stage+' cannot affect a new focused read',async()=>{
 const h=screen(stage),old=h.pending();await h.pump();const timer=h.timer();timer();assert.equal(h.signals[0].listeners.size,0);h.refocus('fetch');await h.pump();const controller=[...h.registry()].at(-1);timer();h.release(old);await h.pump();assert.equal(h.registry().size,1);assert.equal(controller.signal.aborted,false);assert.deepEqual(h.state[0],{status:'loading'});h.release(h.pending());await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:rows});assert.equal(h.registry().size,0);assert.equal(h.signals[2].listeners.size,0);h.blur();
});
test('earnings twenty human read retries do not retain expired controllers while transports remain pending',async()=>{
 const h=screen('fetch');for(let n=0;n<20;n++){await h.pump();h.timer()();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.registry().size,0);assert.equal(h.signals[0].listeners.size,0);assert.equal(h.timers.size,0);if(n<19)h.retry('fetch');}onlyReads(h,20);h.blur();
});
test('earnings changed identity and expired JSON cannot publish old ledger facts',async()=>{
 const h=screen('json'),old=h.pending();await h.pump();h.changeOwner();h.timer()();assert.equal(h.registry().size,0);assert.equal(h.signals[0].listeners.size,0);h.release(old);await h.pump();assert.deepEqual(h.state[0],{status:'error'});onlyReads(h,1);h.blur();
});
