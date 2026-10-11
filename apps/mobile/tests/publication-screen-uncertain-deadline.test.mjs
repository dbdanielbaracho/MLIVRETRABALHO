import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {runForSession} from '../lib/session-context.ts';
import {publishJob} from '../lib/company-job-publication.ts';
import {sameCompanyContext} from '../lib/company-dashboard-actions.ts';
// Actual Empresa handlers/date parser and production publication/session protocol; fixtures only.
const original={Authorization:'Bearer first-owner','x-tenant-id':'first-company'},draft=['Fixture shift','Fixture place','Fixture city','12/10/2026','18:00','23:00','120,50'];
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function screen(){
 const source=fs.readFileSync(new URL('../app/empresa.tsx',import.meta.url),'utf8'),start=source.indexOf('function shiftWindow('),end=source.indexOf('\n return <',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {create,loadContext};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','sameCompanyContext','apiUrl','fetch','runForSession','publishJob','setTimeout','clearTimeout',prefix+'\nreturn Empresa();');
 const state=[],refs=[],calls=[],timers=new Map(),held=[];let si=0,ri=0,focus,cleanup,handlers,reads=0,id=0,armed=null,current={...original},kind='created';
 function hold(value){armed=null;const gate=deferred();held.push({gate,value});return gate.promise;}
 const auth=async()=>{const value={...current},stage=++reads===1?'auth':'final-auth';return armed===stage?hold(value):value;};
 const fetch=async(path,options)=>{calls.push({path,options});const payload=JSON.parse(options.body),data={...payload,id:'fixture-job',status:'open',title:payload.title.trim(),workCity:payload.workCity.trim(),location:payload.location.trim()||null};const response={ok:kind!=='rejected',status:kind==='rejected'?400:200,json:async()=>armed==='json'?hold(data):kind==='unknown'?{}:data};return armed==='fetch'?hold(response):response;};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],v=>{state[i]=v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},cb=>cb,cb=>{focus=cb},auth,sameCompanyContext,p=>p,fetch,runForSession,publishJob,cb=>{const n=++id;timers.set(n,cb);return n},n=>timers.delete(n));}
 render();cleanup=focus();return {state,refs,calls,render,pump:()=>new Promise(setImmediate),edit:()=>{draft.forEach((v,i)=>{state[i]=v});render()},create:()=>handlers.create(),refresh:()=>handlers.loadContext(),arm:stage=>{reads=0;armed=stage},response:value=>{kind=value},owner:value=>{current={...value}},blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);return cb},release:()=>{assert.ok(held.length);const x=held.shift();x.gate.resolve(x.value)},get busy(){return state[9]},get uncertain(){return refs[7].current},get message(){return state[7]},get context(){return refs[5].current},get blocked(){return held.length}};
}
async function ready(){const h=screen();await h.pump();h.edit();return h;}
for(const phase of ['auth','fetch','json','final-auth'])test('publication deadline during '+phase+' releases UI, keeps draft and does not acknowledge late creation',async()=>{
 const h=await ready();h.arm(phase);const pending=h.create();await h.pump();assert.equal(h.blocked,1);assert.equal(h.busy,true);h.timer()();assert.equal(h.busy,false);assert.match(h.message,/15 segundos/);assert.deepEqual(h.state.slice(0,7),draft);assert.equal(h.context,null);assert.equal(h.uncertain,phase!=='auth');h.release();await pending;assert.deepEqual(h.state.slice(0,7),draft);assert.doesNotMatch(h.message,/Trabalho publicado/);assert.equal(h.calls.length,phase==='auth'?0:1);h.blur();
});
test('uncertain completed response and manual same-company refresh cannot authorize another non-idempotent POST',async()=>{
 const h=await ready();h.response('unknown');h.arm(null);await h.create();assert.equal(h.calls.length,1);assert.equal(h.uncertain,true);h.render();await h.refresh();h.render();await h.create();assert.equal(h.calls.length,1,'unknown publication must not be resent');assert.deepEqual(h.state.slice(0,7),draft);assert.match(h.message,/Planejamento/);h.blur();
});
test('expired dispatched creation keeps its unknown guard through focus and context refresh',async()=>{
 const h=await ready();h.arm('fetch');const old=h.create();await h.pump();h.timer()();h.blur();h.refocus();await h.pump();h.render();await h.create();assert.equal(h.calls.length,1);assert.equal(h.uncertain,true);h.release();await old;assert.deepEqual(h.state.slice(0,7),draft);assert.equal(h.calls.length,1);h.blur();
});
test('pre-dispatch expiry permits explicit context verification and one new current attempt without old finally unlocking it',async()=>{
 const h=await ready();h.arm('auth');const old=h.create();await h.pump();const expire=h.timer();expire();await h.refresh();h.render();h.arm('fetch');const next=h.create();await h.pump();assert.equal(h.calls.length,1);h.release();await old;assert.equal(h.busy,true);expire();assert.equal(h.busy,true);h.release();await next;assert.equal(h.busy,false);assert.equal(h.uncertain,false);assert.equal(h.message,'Trabalho publicado.');assert.deepEqual(h.state.slice(0,7),Array(7).fill(''));h.blur();
});
test('changed owner clears previous draft under the existing context boundary; old response cannot clear the new draft',async()=>{
 const h=await ready();h.arm('fetch');const old=h.create();await h.pump();const expire=h.timer();h.blur();h.owner({Authorization:'Bearer other-owner','x-tenant-id':'other-company'});h.refocus();await h.pump();assert.deepEqual(h.state.slice(0,7),Array(7).fill(''));assert.equal(h.uncertain,false);h.edit();expire();h.release();await old;assert.deepEqual(h.state.slice(0,7),draft);assert.equal(h.calls.length,1);h.blur();
});
test('timely rejected publication preserves the draft and permits a new explicit attempt',async()=>{
 const h=await ready();h.response('rejected');h.arm(null);await h.create();assert.equal(h.calls.length,1);assert.equal(h.uncertain,false);assert.deepEqual(h.state.slice(0,7),draft);assert.equal(h.busy,false);h.response('created');h.render();await h.create();assert.equal(h.calls.length,2);assert.equal(h.message,'Trabalho publicado.');h.blur();
});
test('different company within the same account before publication sends no POST',async()=>{
 const h=await ready();h.owner({...original,'x-tenant-id':'different-company'});h.arm(null);await h.create();assert.equal(h.calls.length,0);assert.deepEqual(h.state.slice(0,7),draft);assert.equal(h.uncertain,false);assert.equal(h.busy,false);h.blur();
});
