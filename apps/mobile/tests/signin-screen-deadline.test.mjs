import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {signinAccount} from '../lib/signin.ts';
import {createSessionQueue,persistVerifiedSession} from '../lib/session-transaction.ts';
// Real screen signin handler, parser, shared queue and rollback protocol.
// Storage/auth/hooks/network/clock/router are explicit fixtures, not SecureStore/native/physical proof.
const original={token:'old-token',tenantId:'old-company'};
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function panel(phase=null,company=true){
 const source=fs.readFileSync(new URL('../app/entrar.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Entrar('),end=source.indexOf('\n  return (');assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default function','function')+'\nreturn {signin};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','signinAccount','getSession','saveVerifiedSignin','apiUrl','fetch','router','setTimeout','clearTimeout',prefix+'\nreturn Entrar();');
 const state=[],refs=[],calls=[],routes=[],timers=new Map(),queue=createSessionQueue(),held=[];let si=0,ri=0,focus,cleanup,handlers,nextTimer=0,armed=phase,pair={...original},reads=0,postStatus=200;
 function hold(value){armed=null;const old={value,gate:deferred()};held.push(old);return old.gate.promise;}
 const adapter={read:async()=>{const value={...pair};const phase={1:'session-read',2:'persist-read',3:'verify-read'}[++reads];return armed===phase?hold(value):value;},write:async next=>{if(armed==='persist-write'){pair={token:next.token,tenantId:null};await hold(undefined);}pair={...next};}};
 const getSession=()=>queue.run(async()=>(await adapter.read()).token);
 const saveVerifiedSignin=(next,expected,isCurrent)=>queue.run(()=>persistVerifiedSession(adapter,next,expected,isCurrent));
 const fetch=async(path,options)=>{calls.push({path,options});const body=JSON.parse(options.body),data={accessToken:'fixture-token-'+calls.length,identity:{id:'fixture-identity',email:body.email},memberships:company?[{tenant_id:'fixture-company',role:'owner'}]:[]};const response={ok:postStatus===200,status:postStatus,json:async()=>armed==='json'?hold(data):data};return armed==='fetch'?hold(response):response;};
 const deps=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},signinAccount,getSession,saveVerifiedSignin,p=>p,fetch,{replace:route=>routes.push(route)},cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...deps);}
 render();cleanup=focus();state.splice(0,2,'fixture@example.test','Fixture123!');render();
 return {state,refs,calls,routes,render,signin:()=>handlers.signin(),pump:()=>new Promise(setImmediate),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},arm:phase=>{armed=phase},status:value=>{postStatus=value},pair:()=>queue.run(adapter.read),replacePair:next=>queue.run(()=>adapter.write(next)),timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);return cb;},release:()=>{assert.ok(held.length,'fixture must reach the distinct pending phase');const old=held.shift();old.gate.resolve(old.value);},get blocked(){return held.length;}};
}
for(const phase of ['session-read','fetch','json','persist-read','persist-write','verify-read'])test(`signin deadline releases busy during ${phase} without late routing or unverified persisted access`,async()=>{
 const h=panel(phase);const pending=h.signin();await h.pump();assert.equal(h.blocked,1);assert.equal(h.state[3],true);h.timer()();assert.equal(h.state[3],false);assert.equal(h.refs[0].current,false);assert.match(h.state[2],/15 segundos/);assert.equal(h.state[1],'Fixture123!');assert.deepEqual(h.routes,[]);const message=h.state[2],count=h.calls.length;await h.pump();assert.equal(h.calls.length,count);h.release();await pending;assert.deepEqual(await h.pair(),original);assert.deepEqual(h.routes,[]);assert.equal(h.state[2],message);if(phase==='session-read')assert.equal(h.calls.length,0);h.blur();
});
test('expired partial persistence rolls back within the real queue before a later login, and old finally cannot release its new busy lock',async()=>{
 const h=panel('persist-write');const old=h.signin();await h.pump();const expire=h.timer();expire();h.render();h.arm('json');const next=h.signin();await h.pump();assert.equal(h.blocked,1);assert.equal(h.calls.length,1,'new login must stay behind old storage write');assert.equal(h.state[3],true);h.release();await old;await h.pump();assert.equal(h.blocked,1);assert.equal(h.calls.length,2);assert.equal(h.state[3],true);assert.equal(h.refs[0].current,true);assert.deepEqual(await h.pair(),original,'rollback precedes new signin transport');expire();assert.equal(h.state[3],true);await h.signin();assert.equal(h.calls.length,2);h.release();await next;assert.deepEqual(await h.pair(),{token:'fixture-token-2',tenantId:'fixture-company'});assert.deepEqual(h.routes,['/empresa-inicio']);assert.equal(h.state[3],false);h.blur();
});
test('a changed queued session rejects stale expected token and preserves a different completed login',async()=>{
 const h=panel('json');const pending=h.signin();await h.pump();const other={token:'other-token',tenantId:'other-company'};await h.replacePair(other);h.release();await pending;assert.deepEqual(await h.pair(),other);assert.deepEqual(h.routes,[]);assert.match(h.state[2],/sessão mudou/);h.blur();
});
test('blur/refocus cannot transport an old pending session snapshot or route with its old timer',async()=>{
 const h=panel('session-read');const old=h.signin();await h.pump();const expire=h.timer();h.blur();h.refocus();h.state[1]='Fixture123!';h.render();const next=h.signin();h.release();await old;await next;expire();assert.equal(h.calls.length,1);assert.deepEqual(h.routes,['/empresa-inicio']);assert.deepEqual(await h.pair(),{token:'fixture-token-1',tenantId:'fixture-company'});h.blur();
});
test('timely login persists the verified pair before existing company/professional routing and password clearing',async()=>{
 for(const company of [true,false]){const h=panel(null,company);await h.signin();assert.deepEqual(await h.pair(),{token:'fixture-token-1',tenantId:company?'fixture-company':null});assert.deepEqual(h.routes,[company?'/empresa-inicio':'/trabalhos']);assert.equal(h.state[1],'');assert.equal(h.state[3],false);h.blur();}
});
test('a timely rate limit remains distinct and leaves the existing persisted session intact without retries',async()=>{
 const h=panel();h.status(429);await h.signin();assert.match(h.state[2],/Muitas tentativas/);assert.deepEqual(await h.pair(),original);assert.deepEqual(h.routes,[]);assert.equal(h.calls.length,1);assert.equal(h.state[3],false);h.blur();
});
