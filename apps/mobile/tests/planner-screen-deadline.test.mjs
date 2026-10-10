import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {runForSession} from '../lib/session-context.ts';
import {loadPlanner} from '../lib/company-readonly.ts';
// Actual pre-JSX handlers; explicit hooks/auth/fetch/timer fixtures, not RN rendering.
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
const origin={Authorization:'Bearer fixture','x-tenant-id':'actual-company'};
const row={id:'real-job',title:'Fixture job',jobStatus:'open',interestCount:0,confirmedCount:0,activeCount:0,completedCount:0,cancelledCount:0};
function screen(pause){
 const source=fs.readFileSync(new URL('../app/planejamento.tsx',import.meta.url),'utf8');
 const start=source.indexOf('export default function Planejamento('),end=source.indexOf('\n  return (\n    <SafeAreaView',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\n return {};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','runForSession','loadPlanner','apiUrl','fetch','setTimeout','clearTimeout',prefix+'\nreturn Planejamento();');
 const state=[],refs=[],calls=[],timers=new Map(),gate=deferred();let si=0,ri=0,focus,cleanup,headersRead=0,timerId=0,paused=true;
 const read=async()=>{headersRead++;if(paused&&((pause==='auth'&&headersRead===1)||(pause==='final-auth'&&headersRead===3)))return gate.promise;return {...origin};};
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&pause==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&pause==='json')await gate.promise;return [row];}}};
 function render(){si=0;ri=0;create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},read,runForSession,loadPlanner,x=>x,fetch,callback=>{const id=++timerId;timers.set(id,callback);return id},id=>timers.delete(id));}
 render();cleanup=focus();
 return {state,calls,pump:()=>new Promise(setImmediate),timer:()=>{const fn=[...timers.values()].at(-1);assert.ok(fn);return fn},resume:()=>{paused=false;gate.resolve({...origin})},blur:()=>cleanup(),refocus:()=>{cleanup();render();cleanup=focus()}};
}
for(const pause of ['auth','fetch','json','final-auth'])test('planner deadline exposes retryable error when '+pause+' ignores abort and rejects late ready data',async()=>{
 const h=screen(pause);await h.pump();assert.equal(h.state[0].status,'loading');h.timer()();assert.deepEqual(h.state[0],{status:'error'});
 h.resume();await h.pump();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.calls.length,pause==='auth'?0:1);h.blur();
});
test('planner deadline and late completion from a blurred focus cannot alter the next focus',async()=>{
 const h=screen('fetch');await h.pump();const oldTimer=h.timer();h.blur();oldTimer();assert.deepEqual(h.state[0],{status:'loading'});
 h.resume();h.refocus();await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:[row]});h.blur();
});
test('planner can load real data again after timeout without an old request overwriting it',async()=>{
 const h=screen('json');await h.pump();const oldTimer=h.timer();oldTimer();assert.deepEqual(h.state[0],{status:'error'});
 h.refocus();h.resume();await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:[row]});oldTimer();assert.deepEqual(h.state[0],{status:'ready',data:[row]});h.blur();
});
