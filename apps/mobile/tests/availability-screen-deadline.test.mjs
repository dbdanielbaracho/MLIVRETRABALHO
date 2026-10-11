import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {submitAvailability} from '../lib/availability-submit.ts';
import {availabilityWindow} from '../lib/availability-window.ts';
// Real screen save handler/window/submission parser; explicit hooks/auth/network/timer fixtures.
// No database write, native render, SecureStore or physical E2E acceptance.
const draft=['12/10/2026','22:00','06:00'];
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function panel(){
 const source=fs.readFileSync(new URL('../app/disponibilidade.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Disponibilidade('),end=source.indexOf('\n return <SafeAreaView');assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default function','function')+'\nreturn {save};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','submitAvailability','availabilityWindow','fetch','setTimeout','clearTimeout',prefix+'\nreturn Disponibilidade();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,nextTimer=0,authorization='Bearer fixture',armed=null,responseKind='saved';const held=[];
 function hold(value){const old=armed;armed=null;old.value=value;held.push(old);return old.gate.promise;}
 const headers=async()=>{const value={Authorization:authorization};if(armed?.authReads&&--armed.authReads===0)return hold(value);return value;};
 const fetch=async(path,options)=>{calls.push({path,options});const window=JSON.parse(options.body),kind=responseKind;const response={ok:kind==='saved'||kind==='malformed-id',status:kind==='saved'||kind==='malformed-id'?201:400,json:async()=>{const data=kind==='saved'||kind==='malformed-id'?{id:kind==='malformed-id'?'fixture-availability':'bbbbbbbb-1111-4222-8333-444444444444',...window}:{message:'professional_profile_required'};return armed?.phase==='json'?hold(data):data;}};return armed?.phase==='fetch'?hold(response):response;};
 const dependencies=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},headers,p=>p,submitAvailability,availabilityWindow,fetch,cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...dependencies);}
 render();cleanup=focus();state.splice(0,3,...draft);render();
 return {state,refs,calls,render,save:()=>handlers.save(),pump:()=>new Promise(setImmediate),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},owner:value=>{authorization=value},response:kind=>{responseKind=kind},arm:phase=>{armed={phase,authReads:{auth:1,'final-auth':2}[phase],gate:deferred()};},timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);return cb;},release:()=>{assert.ok(held.length,'fixture must reach its distinct pending phase');const old=held.shift();old.gate.resolve(old.value);},get blocked(){return held.length;}};
}
for(const phase of ['auth','fetch','json','final-auth'])test(`save deadline releases busy immediately during ${phase}, preserves draft, and marks only dispatched writes uncertain`,async()=>{
 const h=panel();h.arm(phase);const pending=h.save();await h.pump();assert.equal(h.blocked,1);assert.equal(h.state[4],true);h.timer()();assert.equal(h.state[4],false);assert.equal(h.refs[0].current,false);assert.deepEqual(h.state.slice(0,3),draft);assert.equal(h.state[6],phase!=='auth');assert.ok(h.state[3]);assert.notEqual(h.state[3],'Disponibilidade salva.');const message=h.state[3],calls=h.calls.length;await h.pump();assert.equal(h.calls.length,calls);h.release();await pending;assert.equal(h.state[3],message);assert.deepEqual(h.state.slice(0,3),draft);assert.equal(h.state[6],phase!=='auth');if(phase==='auth')assert.equal(h.calls.length,0);h.blur();
});
test('explicit retry retains the exact original window and late prior acknowledgement cannot erase the newer draft/result',async()=>{
 const h=panel();h.arm('json');const old=h.save();await h.pump();h.timer()();assert.equal(h.calls.length,1);assert.equal(h.state[6],true);h.render();await h.save();assert.equal(h.calls.length,2);assert.deepEqual(JSON.parse(h.calls[0].options.body),JSON.parse(h.calls[1].options.body));assert.ok(h.calls.every(c=>c.path==='/availability/mine'&&c.options.method==='POST'&&c.options.headers.Authorization==='Bearer fixture'));assert.equal(h.state[3],'Disponibilidade salva.');assert.deepEqual(h.state.slice(0,3),['','','']);h.release();await old;assert.equal(h.state[3],'Disponibilidade salva.');assert.deepEqual(h.state.slice(0,3),['','','']);h.blur();
});
test('a late finally cannot release a newer pending save or allow a third concurrent submission',async()=>{
 const h=panel();h.arm('json');const old=h.save();await h.pump();h.timer()();h.render();h.arm('json');const next=h.save();await h.pump();assert.equal(h.blocked,2);h.release();await old;assert.equal(h.state[4],true);assert.equal(h.refs[0].current,true);const count=h.calls.length;await h.save();assert.equal(h.calls.length,count);h.release();await next;assert.equal(h.state[4],false);assert.equal(h.state[3],'Disponibilidade salva.');h.blur();
});
test('an obsolete timer cannot replace a newer acknowledgement with an uncertain outcome',async()=>{
 const h=panel();h.arm('json');const old=h.save();await h.pump();const expire=h.timer();expire();h.render();await h.save();expire();assert.equal(h.state[3],'Disponibilidade salva.');assert.equal(h.state[6],false);h.release();await old;assert.equal(h.state[3],'Disponibilidade salva.');assert.equal(h.state[6],false);h.blur();
});
test('blur/refocus rejects late old authorization without an old POST and protects the new acknowledgement',async()=>{
 const h=panel();h.arm('auth');const old=h.save();await h.pump();const expire=h.timer();h.blur();h.refocus();h.render();await h.save();expire();h.release();await old;assert.equal(h.calls.length,1);assert.equal(h.state[3],'Disponibilidade salva.');assert.deepEqual(h.state.slice(0,3),['','','']);h.blur();
});
test('owner changes after transport do not clear draft or claim saved for the replacement session',async()=>{
 const h=panel();h.arm('json');const pending=h.save();await h.pump();h.owner('Bearer other');h.release();await pending;assert.deepEqual(h.state.slice(0,3),draft);assert.match(h.state[3],/sessão mudou/);assert.equal(h.state[4],false);assert.equal(h.calls.length,1);h.blur();
});
test('profile-required acknowledgement after deadline stays uncertain and does not masquerade as a confirmed rejection',async()=>{
 const h=panel();h.response('profile');h.arm('json');const pending=h.save();await h.pump();h.timer()();assert.equal(h.state[6],true);h.release();await pending;assert.equal(h.state[5],false);assert.equal(h.state[6],true);assert.deepEqual(h.state.slice(0,3),draft);assert.equal(h.calls.length,1);h.blur();
});
test('timely profile-required rejection preserves draft and offers the actual profile requirement',async()=>{
 const h=panel();h.response('profile');await h.save();assert.equal(h.state[5],true);assert.equal(h.state[6],false);assert.deepEqual(h.state.slice(0,3),draft);assert.equal(h.state[4],false);h.blur();
});

test('timely malformed availability UUID preserves the real draft and displays uncertainty rather than saved',async()=>{
 const h=panel();h.response('malformed-id');await h.save();assert.equal(h.calls.length,1);assert.equal(h.state[6],true);assert.equal(h.state[5],false);assert.deepEqual(h.state.slice(0,3),draft);assert.equal(h.state[4],false);assert.equal(h.refs[0].current,false);assert.match(h.state[3],/Não foi possível confirmar/);assert.doesNotMatch(h.state[3],/Disponibilidade salva/);await h.pump();assert.equal(h.calls.length,1);h.blur();
});
