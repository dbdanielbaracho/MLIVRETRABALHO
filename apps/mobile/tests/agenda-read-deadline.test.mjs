import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadAgenda,assignmentState,submitAgendaAction} from '../lib/agenda.ts';
const a={id:'bbbbbbbb-cccc-dddd-eeee-ffffffffffff',tenantId:'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',status:'in_progress',title:'Actual work A'},b={...a,tenantId:'cccccccc-dddd-eeee-ffff-aaaaaaaaaaaa',title:'Actual work B'};
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
// Actual pre-JSX handlers and read parser; hooks/auth/fetch/timer are explicit fixtures.
function screen(stage='none'){
 const src=fs.readFileSync(new URL('../app/agenda.tsx',import.meta.url),'utf8'),start=src.indexOf('export default function Agenda('),end=src.indexOf('\n return <SafeAreaView',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn {load,openSupport,displayedAuthorization};\n}',{mode:'strip'});
 const keys=['useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','loadAgenda','assignmentState','submitAgendaAction','optionalCoordinates','router','fetch','setTimeout','clearTimeout'];
 const create=new Function(...keys,prefix+'\nreturn Agenda();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,h,id=0,reads=0,paused=true,gate=deferred(),authorization='Bearer actual-owner';
 const auth=async()=>{reads++;if(paused&&((stage==='auth'&&reads===1)||(stage==='final-auth'&&reads===2)||stage==='help-auth'))return gate.promise;return {Authorization:authorization}};
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&stage==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&stage==='json')await gate.promise;return [a,b]}}};
 function render(){si=0;ri=0;h=create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],v=>{state[i]=v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,x=>x,loadAgenda,assignmentState,submitAgendaAction,async()=>{throw Error('unexpected_geolocation')},{push:()=>{throw Error('unexpected_navigation')}},fetch,callback=>{const n=++id;timers.set(n,callback);return n},n=>timers.delete(n));}
 render();cleanup=focus();
 return {state,calls,render,pump:()=>new Promise(setImmediate),timer:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback);return callback},resume:()=>{paused=false;gate.resolve({Authorization:authorization})},pauseHelp:()=>{stage='help-auth';paused=true;gate=deferred()},blur:()=>cleanup(),refocus:()=>{cleanup();render();cleanup=focus()},load:()=>h.load(),open:item=>h.openSupport(item),ownerChange:()=>{authorization='Bearer other-owner'},authorization:()=>h.displayedAuthorization.current};
}
for(const stage of ['auth','fetch','json','final-auth'])test('Agenda read deadline leaves loading while '+stage+' is unresolved and withholds late facts',async()=>{
 const h=screen(stage);await h.pump();h.timer()();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.authorization(),null);h.resume();await h.pump();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.calls.length,stage==='auth'?0:1);assert.ok(h.calls.every(x=>x.options.method!=='POST'));h.blur();
});
test('old Agenda response and deadline after blur cannot replace new focused work facts',async()=>{
 const h=screen('fetch');await h.pump();const old=h.timer();h.blur();h.resume();h.refocus();await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:[a,b]});old();assert.deepEqual(h.state[0],{status:'ready',data:[a,b]});h.blur();
});
test('Agenda explicit read retry after deadline can restore real works',async()=>{
 const h=screen('json');await h.pump();h.timer()();assert.deepEqual(h.state[0],{status:'error'});h.resume();await h.load();assert.deepEqual(h.state[0],{status:'ready',data:[a,b]});h.blur();
});
test('Agenda owner change during read does not display another owner snapshot',async()=>{
 const h=screen('fetch');await h.pump();h.ownerChange();h.resume();await h.pump();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.authorization(),null);h.blur();
});
test('help credential deadline reports failure immediately without awaiting credential resolution or sending support',async()=>{
 const h=screen();await h.pump();h.render();h.pauseHelp();const opening=h.open(a);await h.pump();h.timer()();assert.equal(h.state[2],null);assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.authorization(),null);assert.match(h.state[1],/a tempo/);h.resume();await opening;assert.equal(h.state[2],null);assert.equal(h.calls.length,1);h.blur();
});
test('old help deadline cannot close a newer selected real work context',async()=>{
 const h=screen();await h.pump();h.render();h.pauseHelp();const oldOpening=h.open(a);await h.pump();const oldTimer=h.timer();h.resume();const newer=h.open(b);await Promise.all([oldOpening,newer]);assert.deepEqual(h.state[2],b);oldTimer();assert.deepEqual(h.state[2],b);assert.equal(h.state[0].status,'ready');assert.equal(h.calls.length,1);h.blur();
});
