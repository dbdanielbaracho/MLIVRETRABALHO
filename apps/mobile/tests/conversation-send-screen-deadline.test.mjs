import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {routeId,loadMessages,sendMessage} from '../lib/conversation.ts';
import {runForSession} from '../lib/session-context.ts';
// Production pre-JSX send/load and parsers with explicit hook/route/auth/transport/timer fixtures.
const draft=' Fixture draft ',messages=[{id:'message-fixture',body:'Existing fixture',senderIdentityId:'fixture-person',createdAt:'2026-10-11T00:00:00Z'}];
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function screen(){
 const source=fs.readFileSync(new URL('../app/conversa.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Conversa()'),end=source.indexOf('\n const blocked=',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {send,load};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','useLocalSearchParams','authHeaders','apiUrl','fetch','runForSession','routeId','loadMessages','sendMessage','setTimeout','clearTimeout',prefix+'\nreturn Conversa();');
 const state=[],refs=[],calls=[],timers=new Map(),held=[];let si=0,ri=0,focus,cleanup,handlers,reads=0,id=0,armed=null,owner='Bearer fixture-owner',kind='sent',params={assignmentId:'fixture-assignment',tenantId:'fixture-tenant'};
 function hold(value){armed=null;const gate=deferred();held.push({gate,value});return gate.promise;}
 const auth=async()=>{const value={Authorization:owner},phase={1:'auth',2:'final-auth',3:'reload-auth',4:'reload-final-auth'}[++reads];return armed===phase?hold(value):value;};
 const fetch=async(path,options)=>{calls.push({path,options});const post=options.method==='POST',payload=post?JSON.parse(options.body):null,data=post?{id:'sent-fixture',body:payload.body,createdAt:'2026-10-11T00:00:01Z'}:messages;
  const response={ok:!post||kind!=='rejected',status:post&&kind==='rejected'?403:200,json:async()=>armed===(post?'json':'reload-json')?hold(data):post&&kind==='unknown'?{}:data};return armed===(post?'fetch':'reload-fetch')?hold(response):response;
 };
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],v=>{state[i]=v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},cb=>cb,cb=>{focus=cb},()=>params,auth,p=>p,fetch,runForSession,routeId,loadMessages,sendMessage,cb=>{const n=++id;timers.set(n,cb);return n},n=>timers.delete(n));}
 render();cleanup=focus();return {state,refs,calls,render,pump:()=>new Promise(setImmediate),edit:(body=draft)=>{state[1]=body;render()},send:()=>handlers.send(),load:()=>handlers.load(true),arm:phase=>{armed=phase;reads=0},response:value=>{kind=value},owner:value=>{owner=value},route:value=>{params={...value}},blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},timer:()=>{const cb=[...timers.values()][0];assert.ok(cb);return cb},release:()=>{assert.ok(held.length,'must reach its pending phase');const x=held.shift();x.gate.resolve(x.value)},get blocked(){return held.length},get busy(){return state[3]},get message(){return state[2]},get posts(){return calls.filter(c=>c.options.method==='POST')}};
}
async function ready(){const h=screen();await h.pump();h.edit();return h;}
for(const phase of ['auth','fetch','json','final-auth'])test('message send deadline during '+phase+' releases UI and refuses late ACK without erasing draft',async()=>{
 const h=await ready();h.arm(phase);const pending=h.send();await h.pump();assert.equal(h.blocked,1);assert.equal(h.busy,true);h.timer()();assert.equal(h.busy,false);assert.match(h.message,/15 segundos/);assert.equal(h.state[0].status,'error');assert.equal(h.refs[5].current,null);assert.equal(h.state[1],draft);h.release();await pending;assert.equal(h.state[1],draft);assert.equal(h.state[0].status,'error');assert.equal(h.posts.length,phase==='auth'?0:1);assert.doesNotMatch(h.message,/Mensagem enviada/);h.blur();
});
for(const phase of ['reload-auth','reload-fetch','reload-json','reload-final-auth'])test('known sent ACK remains known when subsequent conversation reload stalls during '+phase,async()=>{
 const h=await ready();h.arm(phase);const pending=h.send();await h.pump();assert.equal(h.blocked,1);assert.equal(h.busy,true);assert.equal(h.state[1],'');h.timer()();assert.equal(h.busy,false);assert.match(h.message,/Mensagem enviada/);assert.equal(h.state[0].status,'error');assert.equal(h.refs[5].current,null);h.release();await pending;assert.equal(h.state[1],'');assert.equal(h.state[0].status,'error');assert.equal(h.refs[5].current,null);assert.equal(h.posts.length,1);h.blur();
});
test('manual inspection reload does not resend; old finally and timer cannot unlock the next explicit pending send',async()=>{
 const h=await ready();h.arm('fetch');const old=h.send();await h.pump();const expire=h.timer();expire();await h.load();h.edit(' New fixture draft ');h.arm('fetch');const next=h.send();await h.pump();assert.equal(h.posts.length,2);h.release();await old;assert.equal(h.busy,true);assert.equal(h.state[1],' New fixture draft ');expire();assert.equal(h.busy,true);h.release();await next;assert.equal(h.busy,false);assert.equal(h.state[1],'');assert.equal(h.posts[0].options.headers['x-tenant-id'],'fixture-tenant');assert.deepEqual(JSON.parse(h.posts[0].options.body),{body:'Fixture draft'});assert.deepEqual(JSON.parse(h.posts[1].options.body),{body:'New fixture draft'});h.blur();
});
test('new identity and route after blur keep their current conversation against old send ACK and timer',async()=>{
 const h=await ready();h.arm('fetch');const old=h.send();await h.pump();const expire=h.timer();h.blur();h.owner('Bearer new-owner');h.route({assignmentId:'new-assignment',tenantId:'new-tenant'});h.refocus();await h.pump();h.edit('New owner draft');expire();h.release();await old;assert.equal(h.state[1],'New owner draft');assert.deepEqual(h.state[0],{status:'ready',data:messages});assert.equal(h.refs[5].current.tenantId,'new-tenant');assert.equal(h.posts.length,1);assert.equal(h.busy,false);h.blur();
});
test('finite unknown response keeps the text and reloads solely for inspection without an automatic POST',async()=>{
 const h=await ready();h.arm(null);h.response('unknown');await h.send();assert.equal(h.state[1],draft);assert.equal(h.posts.length,1);assert.equal(h.busy,false);assert.doesNotMatch(h.message,/Mensagem enviada/);assert.deepEqual(h.state[0],{status:'ready',data:messages});h.blur();
});
test('timely rejected send preserves text without an automatic resend or fake ACK',async()=>{
 const h=await ready();h.arm(null);h.response('rejected');await h.send();assert.equal(h.state[1],draft);assert.equal(h.posts.length,1);assert.equal(h.busy,false);assert.match(h.message,/Não foi possível enviar/);h.blur();
});
test('empty draft never sends POST or claims confirmation',async()=>{
 const h=await ready();h.edit(' ');h.arm(null);await h.send();assert.equal(h.posts.length,0);assert.equal(h.busy,false);assert.doesNotMatch(h.message,/Mensagem enviada/);h.blur();
});
test('changed displayed owner before send does not dispatch with the new token',async()=>{
 const h=await ready();h.owner('Bearer new-owner');h.arm(null);await h.send();assert.equal(h.posts.length,0);assert.equal(h.state[1],'');assert.equal(h.state[0].status,'error');assert.equal(h.busy,false);h.blur();
});
