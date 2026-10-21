import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {submitAvailability} from '../lib/availability-submit.ts';
import {availabilityWindow} from '../lib/availability-window.ts';
// Real screen save handler/window/submission parser; explicit hooks/auth/network/timer fixtures.
// No database write, native render, SecureStore or physical E2E acceptance.
const defaultDraft=['02/03/2027','09:00','10:00'];
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function panel(draft=defaultDraft,rewrite=x=>x){
 const source=fs.readFileSync(new URL('../app/disponibilidade.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Disponibilidade('),end=source.indexOf('\n return <SafeAreaView');assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default function','function')+'\nreturn {save};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','submitAvailability','availabilityWindow','fetch','setTimeout','clearTimeout',prefix+'\nreturn Disponibilidade();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,nextTimer=0,authorization='Bearer fixture',armed=null,responseKind='saved';const held=[];
 function hold(value){const old=armed;armed=null;old.value=value;held.push(old);return old.gate.promise;}
 const headers=async()=>{const value={Authorization:authorization};if(armed?.authReads&&--armed.authReads===0)return hold(value);return value;};
 const fetch=async(path,options)=>{calls.push({path,options});const window=JSON.parse(options.body),kind=responseKind;const response={ok:kind==='saved'||kind==='malformed-id',status:kind==='saved'||kind==='malformed-id'?201:400,json:async()=>{const data=kind==='saved'||kind==='malformed-id'?{id:kind==='malformed-id'?'fixture-availability':'bbbbbbbb-1111-4222-8333-444444444444',...rewrite(window)}:{message:'professional_profile_required'};return armed?.phase==='json'?hold(data):data;}};return armed?.phase==='fetch'?hold(response):response;};
 const dependencies=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},headers,p=>p,submitAvailability,availabilityWindow,fetch,cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...dependencies);}
 render();cleanup=focus();state.splice(0,3,...draft);render();
 return {state,refs,calls,render,save:()=>handlers.save(),pump:()=>new Promise(setImmediate),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},owner:value=>{authorization=value},response:kind=>{responseKind=kind},arm:phase=>{armed={phase,authReads:{auth:1,'final-auth':2}[phase],gate:deferred()};},timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);return cb;},release:()=>{assert.ok(held.length,'fixture must reach its distinct pending phase');const old=held.shift();old.gate.resolve(old.value);},get blocked(){return held.length;}};
}

const scenarios=[['02/03/2027','2027-03-02','2027-02-30'],['01/05/2027','2027-05-01','2027-04-31'],['01/12/2026','2026-12-01','2026-11-31']];
for(const [day,valid,invalid] of scenarios)for(const field of ['startsAt','endsAt'])test('availability screen refuses normalized impossible '+field+' '+invalid+' without erasing the future draft',async()=>{
 const draft=[day,'09:00','10:00'],h=panel(draft,x=>({...x,[field]:x[field].replace(valid,invalid)}));await h.save();assert.equal(h.calls.length,1);assert.equal(h.calls[0].options.method,'POST');assert.deepEqual(JSON.parse(h.calls[0].options.body),availabilityWindow(...draft));assert.deepEqual(h.state.slice(0,3),draft);assert.equal(h.state[6],true);assert.equal(h.state[4],false);assert.doesNotMatch(h.state[3],/Disponibilidade salva/);await h.pump();assert.equal(h.calls.length,1);h.blur();
});
for(const [day] of scenarios)test('availability screen future valid window '+day+' still confirms only the verified matching ACK',async()=>{
 const draft=[day,'09:00','10:00'],h=panel(draft);await h.save();assert.equal(h.calls.length,1);assert.equal(h.calls[0].options.headers.Authorization,'Bearer fixture');assert.deepEqual(JSON.parse(h.calls[0].options.body),availabilityWindow(...draft));assert.deepEqual(h.state.slice(0,3),['','','']);assert.equal(h.state[3],'Disponibilidade salva.');assert.equal(h.state[6],false);h.blur();
});
test('incompatible calendar ACK preserves the original explicit manual retry policy and exact same window',async()=>{
 let incompatible=true;const draft=['02/03/2027','09:00','10:00'],h=panel(draft,x=>incompatible?{...x,startsAt:x.startsAt.replace('2027-03-02','2027-02-30')}:x);await h.save();assert.deepEqual(h.state.slice(0,3),draft);assert.equal(h.state[6],true);await h.pump();assert.equal(h.calls.length,1);incompatible=false;h.render();await h.save();assert.equal(h.calls.length,2);assert.deepEqual(JSON.parse(h.calls[0].options.body),JSON.parse(h.calls[1].options.body));assert.equal(h.state[3],'Disponibilidade salva.');assert.deepEqual(h.state.slice(0,3),['','','']);h.blur();
});
test('calendar-incompatible ACK from a previous identity never clears its still visible draft or claims saved',async()=>{
 const draft=['02/03/2027','09:00','10:00'],h=panel(draft,x=>({...x,endsAt:x.endsAt.replace('2027-03-02','2027-02-30')}));h.arm('json');const work=h.save();await h.pump();h.owner('Bearer replacement');h.release();await work;assert.deepEqual(h.state.slice(0,3),draft);assert.doesNotMatch(h.state[3],/Disponibilidade salva/);assert.equal(h.calls.length,1);h.blur();
});
test('calendar-incompatible late ACK cannot replace an expired current-operation result or issue an automatic POST',async()=>{
 const draft=['02/03/2027','09:00','10:00'],h=panel(draft,x=>({...x,startsAt:x.startsAt.replace('2027-03-02','2027-02-30')}));h.arm('json');const work=h.save();await h.pump();h.timer()();const message=h.state[3];h.release();await work;assert.deepEqual(h.state.slice(0,3),draft);assert.equal(h.state[3],message);assert.equal(h.state[6],true);assert.equal(h.calls.length,1);h.blur();
});
