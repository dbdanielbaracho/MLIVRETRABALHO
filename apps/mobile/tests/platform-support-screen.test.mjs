import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {createPlatformIntentStore,createPlatformSupportFlow,platformInput} from '../lib/platform-support.ts';
// Executes real pre-JSX handlers. This does not assert rendered/native layout.
const a='11111111-1111-4111-8111-111111111111',b='22222222-2222-4222-8222-222222222222',key='33333333-3333-4333-8333-333333333333';
const ack={id:key,category:'other',status:'open',createdAt:'2026-10-25T12:00:00.000Z'},prepared={requestKey:key,expiresAt:'2099-01-01T00:00:00.000Z'},empty={items:[],nextCursor:null,acceptingRequests:true};
const response=(data,status=200)=>({ok:status>=200&&status<300,status,json:async()=>data});
function harness(timeoutMs=50){
 const source=fs.readFileSync(new URL('../app/ajuda-plataforma.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function AjudaPlataforma('),end=source.indexOf('\n const pending=',start);
 const navigation=source.match(/onPress=\{(.*?)\}><Text style=\{s.action\}>Voltar(?: ao perfil)?<\/Text>/)[1];
 const code=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {load:()=>act(()=>flow.load()),send,retry,navigateBack:('+navigation+'),inspect:id=>act(()=>flow.detail(id))};\n}',{mode:'strip'});
 const states=[],refs=[],calls=[],routes=[],storage=new Map();let si=0,ri=0,memo,focus,actor=a,authorization='Bearer a',handler=async()=>response(empty),fontScale=1;
 const platformIntentStore=createPlatformIntentStore({read:async id=>storage.get(id)??null,write:async(id,s)=>storage.set(id,s),remove:async id=>storage.delete(id)});
 const make=new Function('useState','useRef','useMemo','useCallback','useFocusEffect','createPlatformSupportFlow','platformIntentStore','authHeaders','apiUrl','fetch','platformInput','router','useWindowDimensions',code+';return AjudaPlataforma();');
 const render=()=>{si=0;ri=0;return make(initial=>{const i=si++;if(!(i in states))states[i]=initial;return[states[i],x=>{states[i]=typeof x==='function'?x(states[i]):x;}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},fn=>memo??(memo=fn()),fn=>fn,fn=>{focus=fn;},opts=>createPlatformSupportFlow({...opts,timeoutMs}),platformIntentStore,async()=>authorization?{Authorization:authorization}:{},x=>x,async(path,init)=>{calls.push({path,init});return path==='/me'?response({id:actor}):handler(path,init);},platformInput,{replace:route=>routes.push(route),back:()=>routes.push('previous-history-entry')},()=>({fontScale}));};
 return {states,refs,calls,routes,storage,render,scale:value=>{fontScale=value;return render();},activate:()=>{render();refs[0].current=true;},edit:msg=>{states[4]=msg;render();},handler:fn=>{handler=fn;},identity:id=>{actor=id;authorization='Bearer '+id;},blur:()=>{refs[0].current=false;++refs[1].current;memo.cancel();refs[2].current=false;},focus:()=>{render();return focus();}};
}
async function ready(h,available=true){h.activate();h.handler(()=>response({...empty,acceptingRequests:available}));await h.render().load();assert.equal(h.states[0].status,'ready');}
test('screen loads without profile/tenant and disabled capability blocks send while preserving draft',async()=>{
 const h=harness();await ready(h,false);h.edit('Keep draft');await h.render().send();assert.equal(h.calls.some(x=>x.init.method==='POST'),false);assert.equal(h.states[4],'Keep draft');
});
test('screen confirms only a matching ACK and clears message after persisted success',async()=>{
 const h=harness();await ready(h);h.edit('Private draft');h.handler((p,i)=>p.endsWith('/intent')?response(prepared,201):response(ack,201));await h.render().send();assert.equal(h.states[0].status,'confirmed');assert.equal(h.states[1],null,'confirmed write invalidates previously loaded history');assert.equal(h.states[4],'');assert.equal(h.states[6],false);
});
test('unknown result keeps draft, prevents another send and GET recovery confirms without automatic POST',async()=>{
 const h=harness();await ready(h);h.edit('Keep me');h.handler((p,i)=>p.endsWith('/intent')?response(prepared,201):Promise.reject(Error('lost')));await h.render().send();assert.equal(h.states[0].status,'unknown');assert.equal(h.states[4],'Keep me');const n=h.calls.filter(x=>x.init.method==='POST').length;await h.render().send();assert.equal(h.calls.filter(x=>x.init.method==='POST').length,n);h.handler(()=>response(ack));await h.render().load();assert.equal(h.states[0].status,'confirmed');assert.equal(h.calls.filter(x=>x.init.method==='POST').length,n);
});
test('session switch before send erases draft and produces no mutation for another identity',async()=>{
 const h=harness();await ready(h);h.edit('Old secret');h.identity(b);await h.render().send();assert.equal(h.states[0].status,'session');assert.equal(h.states[4],'');assert.equal(h.states[1],null);assert.equal(h.calls.some(x=>x.init.method==='POST'),false);
});
test('new account load clears old account data before applying its authorized page',async()=>{
 const h=harness();await ready(h);h.edit('Old secret');h.identity(b);await h.render().load();assert.equal(h.states[4],'');assert.equal(h.states[0].identityId,b);
});
test('deadline releases busy state, leaves uncertain write blocked and ignores late ACK',async()=>{
 const h=harness(8);await ready(h);h.edit('Late');let release;h.handler((p,i)=>p.endsWith('/intent')?response(prepared,201):new Promise(r=>{release=r;}));const p=h.render().send();await p;assert.equal(h.states[0].status,'unknown');assert.equal(h.states[6],false);release(response(ack,201));await new Promise(r=>setImmediate(r));assert.equal(h.states[0].status,'unknown');
});
test('blur/cancel suppresses old detail and immediate refocus obtains current account state',async()=>{
 const h=harness();await ready(h);let release;h.handler(()=>new Promise(r=>{release=r;}));const old=h.render().inspect(key);await new Promise(r=>setImmediate(r));h.blur();h.identity(b);h.handler(()=>response(empty));h.activate();await h.render().load();release(response({...ack,updatedAt:ack.createdAt,closedAt:null,description:'Old secret',responses:[]}));await old;assert.equal(h.states[0].status,'ready');assert.equal(h.states[0].identityId,b);assert.equal(h.states[2],null);
});
test('profile has unconditional platform entry and preserves both tenant-support components',()=>{
 const source=fs.readFileSync(new URL('../app/perfil.tsx',import.meta.url),'utf8');assert.match(source,/router.push\('\/ajuda-plataforma'\)/);assert.match(source,/<GeneralSupport\/>/);assert.match(source,/<SupportHistory\/>/);
});

test('return to profile is deterministic after deep links and session switches',async()=>{
 const h=harness();await ready(h);h.identity(b);await h.render().load();h.render().navigateBack();assert.deepEqual(h.routes,['/perfil']);assert.equal(h.calls.some(c=>c.init.method==='POST'),false);
});
test('font scale re-render preserves bound identity, draft and pending descriptor without resending',async()=>{
 const h=harness();await ready(h);h.edit('Preserve draft');h.handler((p,i)=>p.endsWith('/intent')?response(prepared,201):Promise.reject(Error('lost')));await h.render().send();const stored=[...h.storage.entries()],calls=h.calls.length;h.scale(1.3);assert.equal(h.states[4],'Preserve draft');assert.equal(h.states[0].status,'unknown');assert.deepEqual([...h.storage.entries()],stored);assert.equal(h.calls.length,calls);h.scale(1);assert.equal(h.states[0].identityId,a);
});
