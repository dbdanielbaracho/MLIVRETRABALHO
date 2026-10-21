import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {routeId,loadMessages,sendMessage} from '../lib/conversation.ts';
import {runForSession} from '../lib/session-context.ts';

const assignment='11111111-2222-4333-8444-555555555555',tenant='33333333-4444-4555-8666-777777777777';
const messages=[{id:'fixture-message',body:'Existing fixture',senderIdentityId:'fixture-person',createdAt:'2026-10-11T00:00:00Z'}];
// Actual pre-JSX handlers and real helpers. Explicit hooks/auth/transport/timers:
// this checks owned registry cleanup, not React Native, native storage or a heap leak.
function screen(){
 const source=fs.readFileSync(new URL('../app/conversa.tsx',import.meta.url),'utf8');
 const start=source.indexOf('export default function Conversa()'),end=source.indexOf('\n const blocked=',start);assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {send,load};\n}',{mode:'strip'});
 const make=new Function('useState','useRef','useCallback','useFocusEffect','useLocalSearchParams','authHeaders','apiUrl','fetch','runForSession','routeId','loadMessages','sendMessage','setTimeout','clearTimeout',code+'\nreturn Conversa();');
 const state=[],refs=[],calls=[],timers=new Map(),held=[];let si=0,ri=0,focus,cleanup,handlers,authReads=0,timerId=0,armed=null;
 function hold(value){armed=null;let resolve;const promise=new Promise(r=>{resolve=r});held.push(()=>resolve(value));return promise;}
 const auth=async()=>{const value={Authorization:'Bearer fixture-owner'},phase={1:'auth',2:'final-auth',3:'reload-auth',4:'reload-final-auth'}[++authReads];return armed===phase?hold(value):value;};
 const fetch=async(path,options)=>{calls.push({path,options});const post=options.method==='POST',value=post?{id:'sent-fixture',body:JSON.parse(options.body).body,createdAt:'2026-10-11T00:00:01Z'}:messages;
  const response={ok:true,status:200,json:async()=>armed===(post?'json':armed?.startsWith('reload-')?'reload-json':'json')?hold(value):value};
  return armed===(post?'fetch':armed?.startsWith('reload-')?'reload-fetch':'fetch')?hold(response):response;
 };
 function render(){si=ri=0;handlers=make(initial=>{const n=si++;if(!(n in state))state[n]=initial;return[state[n],v=>{state[n]=v}]},initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial})},x=>x,x=>{focus=x},()=>({assignmentId:assignment,tenantId:tenant}),auth,x=>x,fetch,runForSession,routeId,loadMessages,sendMessage,fn=>{const id=++timerId;timers.set(id,fn);return id},id=>timers.delete(id));}
 render();cleanup=focus();
 return {state,refs,calls,timers,pump:()=>new Promise(setImmediate),arm:phase=>{armed=phase;authReads=0},edit:value=>{state[1]=value;render()},load:()=>handlers.load(true),send:()=>handlers.send(),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},release:()=>{assert.ok(held.length);held.shift()()},get blocked(){return held.length},get posts(){return calls.filter(x=>x.options.method==='POST')},expire:()=>{assert.ok(timers.size);const callbacks=[...timers.values()];for(const fn of callbacks)fn();return callbacks;}};
}
async function ready(){const h=screen();await h.pump();h.edit(' Fixture draft ');return h;}
function drained(h){assert.equal(h.refs[4].current.size,0,'expired/settled controllers must leave the registry');assert.equal(h.timers.size,0,'expired/settled timer handles must be cleared');}

test('timely verified read and send finish all owned handles without changing request shape',async()=>{
 const h=await ready();drained(h);await h.send();drained(h);assert.equal(h.refs[6].current,null);assert.equal(h.posts.length,1);assert.deepEqual(JSON.parse(h.posts[0].options.body),{body:'Fixture draft'});assert.equal(h.posts[0].options.headers['x-tenant-id'],tenant);assert.equal(h.state[1],'');assert.match(h.state[2],/Mensagem enviada/);h.blur();
});
for(const phase of ['auth','fetch','json','final-auth']){
 test('read deadline drains its own handle before unresolved '+phase+' returns',async()=>{
  const h=await ready();h.arm(phase);const pending=h.load();await h.pump();assert.equal(h.blocked,1);assert.equal(h.refs[4].current.size,1);const [controller]=h.refs[4].current;h.expire();assert.equal(controller.signal.aborted,true);drained(h);assert.equal(h.state[0].status,'error');assert.equal(h.refs[5].current,null);h.release();await pending;drained(h);assert.equal(h.state[0].status,'error');assert.equal(h.posts.length,0);h.blur();
 });
 test('send deadline retires its owned registry and reference before unresolved '+phase+' returns',async()=>{
  const h=await ready();h.arm(phase);const pending=h.send();await h.pump();assert.equal(h.blocked,1);const controller=h.refs[6].current;h.expire();assert.equal(controller.signal.aborted,true);drained(h);assert.equal(h.refs[6].current,null);assert.equal(h.state[3],false);assert.equal(h.state[1],' Fixture draft ');assert.equal(h.refs[5].current,null);h.release();await pending;drained(h);assert.equal(h.state[0].status,'error');assert.equal(h.posts.length,phase==='auth'?0:1);h.blur();
 });
}
for(const phase of ['reload-auth','reload-fetch','reload-json','reload-final-auth'])test('known ACK and child read '+phase+' drain independently without losing server confirmation',async()=>{
 const h=await ready();h.arm(phase);const pending=h.send();await h.pump();assert.equal(h.blocked,1);assert.equal(h.refs[4].current.size,2);assert.equal(h.state[1],'');assert.match(h.state[2],/Mensagem enviada/);h.expire();drained(h);assert.equal(h.refs[6].current,null);assert.equal(h.state[3],false);assert.match(h.state[2],/Mensagem enviada/);h.release();await pending;drained(h);assert.equal(h.posts.length,1);assert.equal(h.state[0].status,'error');assert.equal(h.state[1],'');h.blur();
});
test('twenty explicit expired reads stay bounded while all twenty dependencies are unresolved',async()=>{
 const h=await ready(),pending=[];for(let i=0;i<20;i++){h.arm('fetch');pending.push(h.load());await h.pump();assert.equal(h.refs[4].current.size,1);h.expire();drained(h);}assert.equal(h.blocked,20);assert.equal(h.posts.length,0);for(let i=0;i<20;i++)h.release();await Promise.all(pending);drained(h);assert.equal(h.state[0].status,'error');h.blur();
});
test('late read finally and old timer cannot retire a newer read in the same focus',async()=>{
 const h=await ready();h.arm('fetch');const old=h.load();await h.pump();const callbacks=h.expire();h.arm('fetch');const next=h.load();await h.pump();const [current]=h.refs[4].current;h.release();await old;for(const fn of callbacks)fn();assert.equal(h.refs[4].current.size,1);assert.equal(current.signal.aborted,false);assert.equal(h.timers.size,1);h.release();await next;drained(h);assert.equal(h.state[0].status,'ready');h.blur();
});
test('late send finally and duplicate old timer cannot retire a newer explicit send',async()=>{
 const h=await ready();h.arm('fetch');const old=h.send();await h.pump();const callbacks=h.expire();await h.load();h.edit(' New draft ');h.arm('fetch');const next=h.send();await h.pump();const current=h.refs[6].current;h.release();await old;for(const fn of callbacks)fn();assert.equal(h.refs[6].current,current);assert.equal(current.signal.aborted,false);assert.equal(h.refs[4].current.size,1);assert.equal(h.timers.size,1);assert.equal(h.state[3],true);h.release();await next;drained(h);assert.equal(h.posts.length,2);h.blur();
});
test('child read timer and late parent finally cannot retire a newer explicit send',async()=>{
 const h=await ready();h.arm('reload-fetch');const old=h.send();await h.pump();const callbacks=h.expire();await h.load();h.edit(' New draft ');h.arm('fetch');const next=h.send();await h.pump();const current=h.refs[6].current;h.release();await old;for(const fn of callbacks)fn();assert.equal(h.refs[6].current,current);assert.equal(current.signal.aborted,false);assert.equal(h.state[3],true);assert.equal(h.refs[4].current.size,1);h.release();await next;drained(h);assert.equal(h.posts.length,2);h.blur();
});
test('blur retires the old send reference; old timer and ACK do not affect new focus',async()=>{
 const h=await ready();h.arm('fetch');const old=h.send();await h.pump();const callbacks=[...h.timers.values()];h.blur();assert.equal(h.refs[6].current,null);assert.equal(h.refs[4].current.size,0);h.refocus();await h.pump();h.edit(' New focus draft ');for(const fn of callbacks)fn();h.release();await old;drained(h);assert.equal(h.state[1],' New focus draft ');assert.equal(h.state[0].status,'ready');assert.equal(h.posts.length,1);h.blur();
});
