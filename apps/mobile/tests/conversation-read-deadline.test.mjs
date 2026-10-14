import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {routeId,loadMessages,sendMessage} from '../lib/conversation.ts';
import {runForSession} from '../lib/session-context.ts';
const ASSIGNMENT_A='11111111-2222-3333-4444-555555555555',ASSIGNMENT_B='22222222-3333-4444-8555-666666666666';
const messages=id=>[{id:'message-'+id,body:'Fixture message '+id,senderIdentityId:'fixture-person',createdAt:'2026-10-11T00:00:00Z'}];
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function screen(stage,autoFocus=true){
 const src=fs.readFileSync(new URL('../app/conversa.tsx',import.meta.url),'utf8');
 const start=src.indexOf('export default function Conversa()'),end=src.indexOf('\n const blocked=',start);assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn {load};\n}',{mode:'strip'});
 const make=new Function('useLocalSearchParams','useState','useRef','useFocusEffect','useCallback','authHeaders','apiUrl','runForSession','routeId','loadMessages','sendMessage','fetch','setTimeout','clearTimeout',code+'\nreturn Conversa();');
 const state=[],refs=[],timers=new Map(),calls=[],gate=deferred();let si=0,ri=0,timerId=0,focus,cleanup,h,paused=true,reads=0,authorization='Bearer fixture-a',params={assignmentId:ASSIGNMENT_A,tenantId:'tenant-a'};
 const auth=async()=>{const n=++reads;if(stage==='auth-reject')throw Error('fixture credential unavailable');if(paused&&((stage==='auth'&&n===1)||(stage==='final-auth'&&n===2)))return gate.promise;return {Authorization:authorization};};
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&stage==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&stage==='json')await gate.promise;return messages(path.includes(ASSIGNMENT_A)?ASSIGNMENT_A:ASSIGNMENT_B);}};};
 function render(){si=ri=0;h=make(()=>params,initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return[state[n],v=>{state[n]=typeof v==='function'?v(state[n]):v}]},initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial})},callback=>{focus=callback},x=>x,auth,x=>x,runForSession,routeId,loadMessages,sendMessage,fetch,fn=>{const n=++timerId;timers.set(n,fn);return n},n=>timers.delete(n));}
 render();if(autoFocus)cleanup=focus();
 return {state,refs,calls,pump:()=>new Promise(setImmediate),timer:()=>{const fn=[...timers.values()].at(-1);assert.ok(fn);return fn;},resume:()=>{paused=false;gate.resolve({Authorization:authorization})},load:()=>h.load(true),blur:()=>cleanup?.(),refocus:()=>{cleanup?.();reads=0;render();cleanup=focus();},changeOwner:()=>{authorization='Bearer fixture-b'},changeRoute:()=>{params={assignmentId:ASSIGNMENT_B,tenantId:'tenant-b'}}};
}
for(const stage of ['auth','fetch','json','final-auth']){
 test('conversation read deadline exits loading while '+stage+' is unresolved and withholds late messages',async()=>{
  const t=screen(stage);await t.pump();t.timer()();assert.equal(t.state[0].status,'error');assert.equal(t.refs[5].current,null);t.resume();await t.pump();assert.equal(t.state[0].status,'error');assert.equal(t.calls.length,stage==='auth'?0:1);assert.ok(t.calls.every(x=>x.options.method==='GET'));t.blur();
 });
 test('old conversation deadline and response after blur cannot replace current focus during '+stage,async()=>{
  const t=screen(stage);await t.pump();const old=t.timer();t.resume();t.refocus();await t.pump();assert.deepEqual(t.state[0],{status:'ready',data:messages(ASSIGNMENT_A)});old();assert.equal(t.state[0].status,'ready');t.blur();
 });
}
test('conversation explicit read retry recovers real messages after deadline',async()=>{
 const t=screen('json');await t.pump();t.timer()();assert.equal(t.state[0].status,'error');t.resume();await t.pump();await t.load();assert.deepEqual(t.state[0],{status:'ready',data:messages(ASSIGNMENT_A)});t.blur();
});
test('conversation owner change during transport withholds old private messages',async()=>{
 const t=screen('fetch');await t.pump();t.changeOwner();t.resume();await t.pump();assert.equal(t.state[0].status,'error');assert.equal(t.refs[5].current,null);t.blur();
});
test('conversation previous assignment/tenant deadline cannot replace newly routed messages',async()=>{
 const t=screen('json');await t.pump();const old=t.timer();t.resume();t.changeRoute();t.refocus();await t.pump();assert.deepEqual(t.state[0],{status:'ready',data:messages(ASSIGNMENT_B)});old();assert.deepEqual(t.state[0],{status:'ready',data:messages(ASSIGNMENT_B)});assert.equal(t.refs[5].current.tenantId,'tenant-b');t.blur();
});
test('conversation credential fallback rejection becomes a read error rather than escaping load',async()=>{
 const t=screen('auth-reject',false);await assert.doesNotReject(t.load());assert.equal(t.state[0].status,'error');assert.equal(t.refs[5].current,null);
});
test('conversation read timeout preserves an existing draft while withholding send authority',async()=>{
 const t=screen('fetch');t.state[1]='Fixture unsent draft';await t.pump();t.timer()();assert.equal(t.state[0].status,'error');assert.equal(t.state[1],'Fixture unsent draft');assert.equal(t.refs[5].current,null);t.resume();await t.pump();assert.equal(t.state[1],'Fixture unsent draft');assert.ok(t.calls.every(x=>x.options.method==='GET'));t.blur();
});
