import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadAgenda,assignmentState,submitAgendaAction} from '../lib/agenda.ts';
const a={id:'bbbbbbbb-cccc-dddd-eeee-ffffffffffff',tenantId:'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',status:'in_progress',title:'Trabalho A real'},b={...a,tenantId:'cccccccc-dddd-eeee-ffff-aaaaaaaaaaaa',title:'Trabalho B real'};
const deferred=()=>{let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};};
// Execute actual Agenda pre-JSX handlers; React/router/auth/timers are explicit fixtures.
function screen(){
 const source=fs.readFileSync(new URL('../app/agenda.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Agenda('),end=source.indexOf('\n return <SafeAreaView');
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default function','function')+'\nreturn {load,openSupport};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','loadAgenda','assignmentState','submitAgendaAction','optionalCoordinates','router','fetch','setTimeout','clearTimeout',prefix+'\nreturn Agenda();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,timerId=0,auth='Bearer fixture',gate=null,reads=0;
 const read=async()=>{reads++;return gate?gate.promise:{Authorization:auth,'x-tenant-id':'default-not-selected'};};
 const fetch=async(path,options)=>{calls.push({path,options});return {ok:true,json:async()=>[a,b]};};
 const deps=[v=>{const i=si++;if(!(i in state))state[i]=v;return[state[i],next=>{state[i]=next}];},v=>{const i=ri++;return refs[i]??(refs[i]={current:v});},cb=>cb,cb=>{focus=cb},read,p=>p,loadAgenda,assignmentState,submitAgendaAction,async()=>null,{push:()=>{throw Error('unexpected_navigation')}},fetch,cb=>{const id=++timerId;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...deps);}
 render();cleanup=focus();
 return {state,calls,render,pump:()=>new Promise(setImmediate),open:value=>handlers.openSupport(value),load:()=>handlers.load(),blur:()=>cleanup(),setAuth:v=>{auth=v;},pause:()=>{gate=deferred();return gate;},resume:()=>{const old=gate;gate=null;old.resolve({Authorization:auth})},expire:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);cb();},reads:()=>reads};
}
test('context help selects the actual approved row rather than caller-provided tenant/title/status, without POST or navigation',async()=>{
 const h=screen();await h.pump();h.render();const before=h.reads();await h.open({...a,tenantId:'injected'});assert.equal(h.reads(),before);assert.equal(h.state[2],null);
 await h.open({...b,title:'invented',status:'fake'});assert.deepEqual(h.state[2],b);assert.equal(h.calls.length,1);assert.equal(h.calls.every(c=>c.options.method!=='POST'),true);h.blur();
});
test('session change before opening help clears old selection/data and requires reloading real works',async()=>{
 const h=screen();await h.pump();h.render();h.setAuth('Bearer other');await h.open(a);assert.equal(h.state[2],null);assert.deepEqual(h.state[0],{status:'error'});assert.match(h.state[1],/A sessão mudou/);assert.equal(h.calls.length,1);h.blur();
});
test('deadline during help authentication cannot open a panel using expired context',async()=>{
 const h=screen();await h.pump();h.render();h.pause();const opening=h.open(a);await h.pump();h.expire();h.resume();await opening;
 assert.equal(h.state[2],null);assert.match(h.state[1],/a tempo/);assert.equal(h.calls.length,1);h.blur();
});
test('switching tenant with the same assignment id rejects late previous help selection',async()=>{
 const h=screen();await h.pump();h.render();h.pause();const old=h.open(a);await h.pump();h.resume();const next=h.open(b);await Promise.all([old,next]);assert.deepEqual(h.state[2],b);assert.equal(h.calls.length,1);h.blur();
});
test('closing the visible panel invalidates a previous delayed opening rather than reopening another work',async()=>{
 const h=screen();await h.pump();h.render();await h.open(a);h.render();h.pause();const previous=h.open(b);await h.pump();await h.open(a);assert.equal(h.state[2],null);h.resume();await previous;assert.equal(h.state[2],null);h.blur();
});
test('blur cancels in-flight context opening and clears help without creating a support request',async()=>{
 const h=screen();await h.pump();h.render();h.pause();const pending=h.open(a);await h.pump();h.blur();h.resume();await pending;assert.equal(h.state[2],null);assert.deepEqual(h.state[0],{status:'loading'});assert.equal(h.calls.length,1);
});
test('reloading assignment facts closes help and invalidates its prior context while preserving lifecycle loading',async()=>{
 const h=screen();await h.pump();h.render();await h.open(b);h.render();assert.deepEqual(h.state[2],b);await h.load();h.render();assert.equal(h.state[2],null);assert.equal(h.state[0].status,'ready');assert.equal(h.calls.length,2);h.blur();
});
