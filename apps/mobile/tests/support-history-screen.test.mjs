import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadAgenda} from '../lib/agenda.ts';
import {loadSupportCases} from '../lib/professional-support.ts';
// Execute the component's real pre-JSX handlers with explicit hook/auth/fetch/timer fixtures.
// This does not render React Native or prove physical visual acceptance.
const a={id:'same-id',tenantId:'company-a',status:'completed',title:'Actual A'},b={...a,tenantId:'company-b',title:'Actual B'};
const ticket=(tenant)=>({id:tenant+'-ticket',assignmentId:'same-id',category:'schedule',priority:'normal',status:'open',description:tenant,resolutionNote:null,createdAt:'2026-10-10T10:00:00Z'});
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function panel(pauseWork=false){
 const source=fs.readFileSync(new URL('../components/SupportHistory.tsx',import.meta.url),'utf8');
 const start=source.indexOf('export function SupportHistory('),end=source.indexOf('\n return <View');
 assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export function','function')+'\nreturn {loadWork,selectWork};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','loadAgenda','loadSupportCases','fetch','setTimeout','clearTimeout',prefix+'\nreturn SupportHistory();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,nextTimer=0,authorization='Bearer fixture',authGate=null,jsonGate=null;
 const headers=async()=>authGate?authGate.promise:{Authorization:authorization};
 const fetch=async(path,options)=>{calls.push({path,options});return {ok:true,json:async()=>{if(path==='/assignments/mine'){if(pauseWork){authGate=deferred();pauseWork=false;}return [a,b];}return jsonGate?jsonGate.promise:[ticket(options.headers['x-tenant-id'])];}};};
 const dependencies=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=value}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},headers,p=>p,loadAgenda,loadSupportCases,fetch,cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...dependencies);}
 render();cleanup=focus();
 return {state,calls,render,pump:()=>new Promise(setImmediate),select:choice=>handlers.selectWork(choice),load:()=>handlers.loadWork(),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},setAuthorization:value=>{authorization=value},pauseAuth:()=>{authGate=deferred();return authGate},resumeAuth:()=>{const gate=authGate;authGate=null;gate.resolve({Authorization:authorization})},pauseJSON:()=>{jsonGate=deferred();return jsonGate},resumeJSON:()=>{const gate=jsonGate;jsonGate=null;gate.resolve([ticket('late-old')])},expire:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);cb();}};
}
test('support requires human selection from the authenticated work list and uses its actual tenant, only GET',async()=>{
 const h=panel();await h.pump();h.render();assert.equal(h.state[0].status,'ready');assert.equal(h.calls.length,1);
 await h.select({...a,tenantId:'injected'});assert.equal(h.calls.length,1);
 await h.select(b);assert.equal(h.calls.length,2);assert.equal(h.calls[1].options.headers['x-tenant-id'],'company-b');assert.equal(h.calls[1].options.headers.Authorization,'Bearer fixture');assert.deepEqual(h.state[2],{status:'ready',data:[ticket('company-b')]});
 assert.ok(h.calls.every(c=>c.options.method==='GET'&&!c.options.body));h.blur();
});
test('switching work discards a late previous-tenant response with the same assignment id',async()=>{
 const h=panel();await h.pump();h.render();h.pauseJSON();const old=h.select(a);await h.pump();h.resumeJSON();const next=h.select(b);await Promise.all([old,next]);h.render();
 assert.equal(h.state[1].tenantId,'company-b');assert.deepEqual(h.state[2],{status:'ready',data:[ticket('company-b')]});h.blur();
});
test('support does not fetch with a new identity and clears the previous identity choices',async()=>{
 const h=panel();await h.pump();h.render();h.setAuthorization('Bearer replacement');await h.select(a);
 assert.equal(h.calls.length,1);assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.state[1],null);assert.deepEqual(h.state[2],{status:'error'});h.blur();
});
test('support cannot expose a ready snapshot if its final authentication read crosses deadline',async()=>{
 const h=panel();await h.pump();h.render();const gate=h.pauseJSON();const pending=h.select(a);await h.pump();h.pauseAuth();gate.resolve([ticket('company-a')]);await h.pump();h.expire();h.resumeAuth();await pending;
 assert.deepEqual(h.state[2],{status:'error'});assert.equal(h.calls.length,2);h.blur();
});
test('blur discards in-flight support data and refocus needs a new selection',async()=>{
 const h=panel();await h.pump();h.render();h.pauseJSON();const pending=h.select(a);await h.pump();h.blur();h.resumeJSON();await pending;
 assert.equal(h.state[1],null);assert.deepEqual(h.state[0],{status:'loading'});assert.deepEqual(h.state[2],{status:'loading'});
 h.refocus();await h.pump();h.render();assert.equal(h.state[0].status,'ready');assert.equal(h.state[1],null);assert.equal(h.calls.filter(c=>c.path==='/support-cases/mine').length,1);h.blur();
});
test('deadline during initial authorization produces an error without transporting a support request',async()=>{
 const h=panel();await h.pump();h.render();h.pauseAuth();const pending=h.select(a);await h.pump();h.expire();h.resumeAuth();await pending;
 assert.deepEqual(h.state[2],{status:'error'});assert.equal(h.calls.length,1);h.blur();
});
test('support work choices are hidden if the final authentication read changes identity or exceeds deadline',async()=>{
 for(const expire of [false,true]){
  const h=panel(true);await h.pump();assert.deepEqual(h.state[0],{status:'loading'});
  if(expire)h.expire();else h.setAuthorization('Bearer replacement');
  h.resumeAuth();await h.pump();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.state[1],null);assert.equal(h.calls.length,1);h.blur();
 }
});

