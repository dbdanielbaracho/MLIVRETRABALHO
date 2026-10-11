import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {createSessionQueue,clearExpectedSession,persistVerifiedSession} from '../lib/session-transaction.ts';
import {loadProfessionalProfile,loadWorkPassport} from '../lib/professional-profile.ts';
import {submitProfile} from '../lib/profile-submit.ts';
// Real pre-JSX screen handlers and shared queue/session clear protocol, with explicit fixtures.
// Native storage, native render, token revocation on a real server and physical E2E remain unproved.
const original={token:'old-token',tenantId:'old-company'},profile={id:'fixture-professional',displayName:'Fixture',homeCity:null,primaryRole:null},passport={displayName:'Fixture',completedWorkCount:0,averageRating:null,ratingCount:0};
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function panel(screen){
 const company=screen==='company',name=company?'EmpresaConta':'Perfil',path=company?'empresa-conta':'perfil';
 const source=fs.readFileSync(new URL('../app/'+path+'.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function '+name+'('),end=source.indexOf(company?'\n const row=':'\n const rows=');assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default function','function')+'\nreturn {signout};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','authHeaders','clearSessionForAuthorization','apiUrl','fetch','router','setTimeout','clearTimeout','loadProfessionalProfile','loadWorkPassport','submitProfile',prefix+'\nreturn '+name+'();');
 const state=[],refs=[],calls=[],routes=[],clears=[],timers=new Map(),queue=createSessionQueue(),held=[];let si=0,ri=0,focus,cleanup,handlers,nextTimer=0,armed=null,pair={...original},reads=0,failWrite=false;
 function hold(value){armed=null;const old={value,gate:deferred()};held.push(old);return old.gate.promise;}
 const adapter={read:async()=>{const value={...pair},phase={1:'auth',2:'clear-read',3:'clear-verify'}[++reads];return armed===phase?hold(value):value;},write:async next=>{if(failWrite){failWrite=false;throw Error('fixture storage failure');}if(armed==='clear-write'){pair={token:next.token,tenantId:pair.tenantId};await hold(undefined);}pair={...next};}};
 const headers=()=>queue.run(async()=>{const value=await adapter.read();return {...(value.token?{Authorization:'Bearer '+value.token}:{}),...(company&&value.tenantId?{'x-tenant-id':value.tenantId}:{})};});
 const clear=authorization=>{clears.push(authorization);return queue.run(()=>clearExpectedSession(adapter,authorization?.slice(7)||null));};
 const fetch=async(path,options)=>{calls.push({path,options});if(path==='/auth/signout')return armed==='fetch'?hold({ok:true}):{ok:true};return {ok:true,status:200,json:async()=>path==='/professional-profile'?profile:passport};};
 const deps=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},headers,headers,clear,p=>p,fetch,{replace:route=>routes.push(route)},cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id),loadProfessionalProfile,loadWorkPassport,submitProfile];
 function render(){si=0;ri=0;handlers=create(...deps);}
 render();cleanup=focus();return {state,refs,calls,routes,clears,render,signout:()=>handlers.signout(),pump:()=>new Promise(setImmediate),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},arm:phase=>{reads=0;armed=phase},failStorage:()=>{failWrite=true},pair:()=>queue.run(adapter.read),login:next=>queue.run(async()=>{const current=await adapter.read();return persistVerifiedSession(adapter,next,current.token,()=>true);}),timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);return cb;},release:()=>{assert.ok(held.length,'fixture must reach its distinct pending phase');const old=held.shift();old.gate.resolve(old.value);},get blocked(){return held.length;},get busy(){return state[company?0:8]},get message(){return state[company?1:6]}};
}
async function ready(screen){const h=panel(screen);await h.pump();await h.pump();h.render();return h;}
for(const screen of ['company','professional']){
 for(const phase of ['auth','clear-read','clear-write','clear-verify'])test(`${screen}: deadline during ${phase} releases busy without falsely confirming local signout`,async()=>{
  const h=await ready(screen);h.arm(phase);const pending=h.signout();await h.pump();assert.equal(h.blocked,1);assert.equal(h.busy,true);h.timer()();assert.equal(h.busy,false);assert.match(h.message,/15 segundos/);assert.deepEqual(h.routes,[]);if(phase==='auth'){assert.equal(h.clears.length,0);assert.equal(h.calls.filter(c=>c.path==='/auth/signout').length,0);}h.release();await pending;if(phase==='auth'){assert.deepEqual(await h.pair(),original);assert.deepEqual(h.routes,[]);}else{assert.deepEqual(await h.pair(),{token:null,tenantId:null});assert.deepEqual(h.routes,['/']);}h.blur();
 });
 test(`${screen}: a network promise ignoring abort cannot postpone the requested local signout beyond deadline`,async()=>{
  const h=await ready(screen);h.arm('fetch');const pending=h.signout();let done=false;void pending.then(()=>{done=true});await h.pump();assert.equal(h.blocked,1);h.timer()();await h.pump();assert.equal(done,true,'local cleanup must finish without waiting for the server response');assert.equal(h.busy,false);assert.deepEqual(await h.pair(),{token:null,tenantId:null});assert.deepEqual(h.routes,['/']);assert.deepEqual(h.clears,['Bearer old-token']);h.release();await pending;await h.pump();assert.equal(h.clears.length,1);assert.equal(h.calls.filter(c=>c.path==='/auth/signout').length,1);h.blur();
 });
 test(`${screen}: a newer queued login survives old transport, old clear and old focus deadline`,async()=>{
  const h=await ready(screen);h.arm('fetch');const old=h.signout();await h.pump();const expire=h.timer();h.blur();const next={token:'new-token',tenantId:'new-company'};assert.equal(await h.login(next),'saved');h.refocus();await h.pump();expire();await h.pump();h.release();await old;assert.deepEqual(await h.pair(),next);assert.deepEqual(h.routes,[]);assert.deepEqual(h.clears,['Bearer old-token']);assert.equal(h.calls.find(c=>c.path==='/auth/signout').options.headers.Authorization,'Bearer old-token');h.blur();
 });
 test(`${screen}: a storage failure never claims cleared or navigates away`,async()=>{
  const h=await ready(screen);h.arm(null);h.failStorage();await h.signout();assert.deepEqual(await h.pair(),original);assert.deepEqual(h.routes,[]);assert.equal(h.busy,false);assert.ok(h.message);h.blur();
 });
 test(`${screen}: timely local verification preserves existing signout route and original-token authority`,async()=>{
  const h=await ready(screen);h.arm(null);await h.signout();assert.deepEqual(await h.pair(),{token:null,tenantId:null});assert.deepEqual(h.routes,['/']);assert.deepEqual(h.clears,['Bearer old-token']);assert.equal(h.busy,false);assert.equal(h.calls.filter(c=>c.path==='/auth/signout').length,1);h.blur();
 });
 test(`${screen}: old finally cannot unlock or route a newer pending attempt queued behind local cleanup`,async()=>{
  const h=await ready(screen);h.arm('clear-write');const old=h.signout();await h.pump();const expire=h.timer();expire();h.render();h.arm('fetch');const next=h.signout();await h.pump();assert.equal(h.calls.filter(c=>c.path==='/auth/signout').length,1);h.release();await old;await h.pump();assert.equal(h.blocked,1);assert.equal(h.busy,true);assert.deepEqual(h.routes,[]);expire();assert.equal(h.busy,true);h.release();await next;assert.deepEqual(await h.pair(),{token:null,tenantId:null});assert.deepEqual(h.routes,['/']);assert.equal(h.clears.length,2);h.blur();
 });
}
