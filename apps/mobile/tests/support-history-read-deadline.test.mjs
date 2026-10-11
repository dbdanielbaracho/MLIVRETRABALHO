import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadAgenda} from '../lib/agenda.ts';
import {loadSupportCases} from '../lib/professional-support.ts';
// Real pre-JSX handlers and read parsers, with explicit hooks/auth/network/clock fixtures.
// No native render, external support submission or physical device acceptance.
const a={id:'same-assignment',tenantId:'tenant-a',status:'completed',title:'Fixture A'},b={...a,tenantId:'tenant-b',title:'Fixture B'};
const ticket=tenant=>({id:tenant+'-case',assignmentId:a.id,category:'schedule',priority:'normal',status:'open',description:tenant,resolutionNote:null,createdAt:'2026-10-11T04:00:00Z'});
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function panel(){
 const source=fs.readFileSync(new URL('../components/SupportHistory.tsx',import.meta.url),'utf8');
 const start=source.indexOf('export function SupportHistory('),end=source.indexOf('\n return <View');assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export function','function')+'\nreturn {loadWork,selectWork};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','loadAgenda','loadSupportCases','fetch','setTimeout','clearTimeout',prefix+'\nreturn SupportHistory();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,nextTimer=0,authorization='Bearer fixture',armed=null,blocked=null;
 function hold(value){blocked=armed;armed=null;blocked.value=value;return blocked.gate.promise;}
 const headers=async()=>{const value={Authorization:authorization};if(armed&&(armed.phase==='auth'||armed.phase==='final-auth')&&--armed.authReads===0)return hold(value);return value;};
 const fetch=async(path,options)=>{calls.push({path,options});const data=path==='/assignments/mine'?[a,b]:[ticket(options.headers['x-tenant-id'])];const response={ok:true,json:async()=>armed?.phase==='json'?hold(data):data};return armed?.phase==='fetch'?hold(response):response;};
 const dependencies=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},headers,p=>p,loadAgenda,loadSupportCases,fetch,cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...dependencies);}
 render();cleanup=focus();
 return {state,refs,calls,render,pump:()=>new Promise(setImmediate),load:()=>handlers.loadWork(),select:row=>handlers.selectWork(row),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},owner:value=>{authorization=value},arm:phase=>{armed={phase,authReads:phase==='final-auth'?2:1,gate:deferred()};blocked=null;},timer:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback);return callback;},release:()=>{assert.ok(blocked,'fixture must reach its distinct pending phase');const old=blocked;blocked=null;old.gate.resolve(old.value);},get blocked(){return !!blocked;}};
}
async function ready(){const h=panel();await h.pump();h.render();assert.equal(h.state[0].status,'ready');return h;}
for(const kind of ['work','cases']){
 const index=kind==='work'?0:2;
 const invoke=h=>kind==='work'?h.load():h.select(a);
 for(const phase of ['auth','fetch','json','final-auth'])test(`${kind}: deadline exposes error immediately during ${phase} and rejects late facts`,async()=>{
  const h=await ready(),before=h.calls.length;h.arm(phase);const pending=invoke(h);await h.pump();assert.ok(h.blocked);assert.equal(h.state[index].status,'loading');h.timer()();assert.deepEqual(h.state[index],{status:'error'});
  if(phase==='auth')assert.equal(h.calls.length,before);h.release();await pending;assert.deepEqual(h.state[index],{status:'error'});assert.ok(h.calls.every(c=>c.options.method==='GET'&&!c.options.body));h.blur();
 });
 test(`${kind}: explicit retry completes with received data while an older response is still pending`,async()=>{
  const h=await ready();h.arm('json');const old=invoke(h);await h.pump();h.timer()();assert.deepEqual(h.state[index],{status:'error'});h.render();await invoke(h);const expected=kind==='work'?[a,b]:[ticket(a.tenantId)];assert.deepEqual(h.state[index],{status:'ready',data:expected});h.release();await old;assert.deepEqual(h.state[index],{status:'ready',data:expected});h.blur();
 });
 test(`${kind}: obsolete timer and late response cannot overwrite a newer read`,async()=>{
  const h=await ready();h.arm('json');const old=invoke(h);await h.pump();const expire=h.timer();await invoke(h);const expected=kind==='work'?[a,b]:[ticket(a.tenantId)];expire();assert.deepEqual(h.state[index],{status:'ready',data:expected});h.release();await old;assert.deepEqual(h.state[index],{status:'ready',data:expected});h.blur();
 });
 test(`${kind}: blur/refocus invalidates old timers and pending authentication without an old GET`,async()=>{
  const h=await ready();h.arm('auth');const old=invoke(h);await h.pump();const expire=h.timer(),before=h.calls.length;h.blur();h.refocus();await h.pump();h.render();expire();assert.deepEqual(h.state[0],{status:'ready',data:[a,b]});assert.equal(h.state[1],null);assert.deepEqual(h.state[2],{status:'loading'});h.release();await old;assert.equal(h.calls.length,before+1);h.blur();
 });
 test(`${kind}: owner changes during final authentication clear the previous owner snapshot`,async()=>{
  const h=await ready();h.arm('json');const old=invoke(h);await h.pump();h.owner('Bearer replacement');h.release();await old;assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.state[1],null);assert.deepEqual(h.state[2],{status:'error'});assert.equal(h.refs[3].current,null);h.blur();
 });
}
test('a late timeout for the same assignment id in another tenant cannot erase the selected tenant cases',async()=>{
 const h=await ready();h.arm('json');const old=h.select(a);await h.pump();const expire=h.timer();await h.select(b);expire();assert.equal(h.state[1].tenantId,b.tenantId);assert.deepEqual(h.state[2],{status:'ready',data:[ticket(b.tenantId)]});h.release();await old;assert.deepEqual(h.state[2],{status:'ready',data:[ticket(b.tenantId)]});assert.equal(h.calls.at(-1).options.headers['x-tenant-id'],b.tenantId);h.blur();
});
