import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const authorization='Bearer actual-session',deferred=()=>{let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};};
// Actual source/session handlers with explicit hooks/router/timers, no Native render or server calls.
function panel(){
 const source=fs.readFileSync(new URL('../components/SupportRecovery.tsx',import.meta.url),'utf8'),start=source.indexOf('export function SupportRecovery('),end=source.indexOf('\n return <View');
 assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export function','function')+'\nreturn {load};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','setTimeout','clearTimeout',prefix+'\nreturn SupportRecovery();');
 const state=[],refs=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,reader=async()=>({Authorization:authorization}),reads=0;
 const deps=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],v=>{state[i]=v}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},cb=>cb,cb=>{focus=cb},()=>{reads++;return reader()},cb=>{const id=timers.size+1;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...deps);}
 render();cleanup=focus();
 return {state,render,pump:()=>new Promise(setImmediate),load:()=>handlers.load(),blur:()=>cleanup(),reader:v=>{reader=v},reads:()=>reads,expire:()=>{for(const cb of [...timers.values()])cb()}};
}
test('recovery source uses the current session without any work or membership selection',async()=>{
 const h=panel();await h.pump();assert.deepEqual(h.state[0],{status:'ready',authorization,generation:1});assert.equal(h.reads(),1);h.blur();
});
test('absent, malformed and failed session reads cannot authorize reading the preserved identity slot',async()=>{
 for(const reader of [async()=>({}),async()=>({Authorization:'invalid'}),async()=>({Authorization:'Bearer '}),async()=>{throw Error('storage_offline')}]){
  const h=panel();await h.pump();h.reader(reader);await h.load();assert.deepEqual(h.state[0],{status:'error'});h.blur();
 }
});
test('recovery source deadline exits loading and late session values cannot revive its authorization',async()=>{
 const h=panel();await h.pump();const late=deferred();h.reader(()=>late.promise);const result=h.load();h.expire();assert.deepEqual(h.state[0],{status:'error'});
 late.resolve({Authorization:authorization});await result;assert.deepEqual(h.state[0],{status:'error'});h.blur();
});
test('recovery blur clears visible session and rejects a late previous focus read',async()=>{
 const h=panel();await h.pump();const late=deferred();h.reader(()=>late.promise);const result=h.load();h.blur();late.resolve({Authorization:authorization});await result;
 assert.deepEqual(h.state[0],{status:'loading'});
});
test('a newer session reload wins over a late prior source and mounts a new generation',async()=>{
 const h=panel();await h.pump();const late=deferred();h.reader(()=>late.promise);const first=h.load();h.reader(async()=>({Authorization:'Bearer newer-session'}));await h.load();
 late.resolve({Authorization:authorization});await first;assert.deepEqual(h.state[0],{status:'ready',authorization:'Bearer newer-session',generation:3});h.blur();
});
