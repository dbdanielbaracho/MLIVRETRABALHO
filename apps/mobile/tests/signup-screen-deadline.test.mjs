import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {signupAccount} from '../lib/signup.ts';
// Real screen signup handler/parser; explicit hooks/network/clock/router fixtures.
// No account/workspace creation, native render or physical acceptance.
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function panel(accountType='professional',phase=null,rejected=false){
 const source=fs.readFileSync(new URL('../app/criar-conta.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function CriarConta('),end=source.indexOf('\n  return (');assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default function','function')+'\nreturn {signup};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','signupAccount','apiUrl','fetch','router','setTimeout','clearTimeout',prefix+'\nreturn CriarConta();');
 const state=[],refs=[],calls=[],routes=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,nextTimer=0,armed=phase,held=null;
 function hold(value){armed=null;held={value,gate:deferred()};return held.gate.promise;}
 const fetch=async(path,options)=>{calls.push({path,options});const body=JSON.parse(options.body),data=rejected?{message:'email_in_use'}:{id:'aaaaaaaa-1111-4222-8333-444444444444',email:body.email,accountType:body.accountType,...(body.accountType==='company'?{tenantId:'bbbbbbbb-1111-4222-8333-444444444444',role:'owner'}:{})};const response={ok:!rejected,status:rejected?401:201,json:async()=>armed==='json'?hold(data):data};return armed==='fetch'?hold(response):response;};
 const deps=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},signupAccount,p=>p,fetch,{replace:route=>routes.push(route)},cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...deps);}
 render();cleanup=focus();state.splice(0,4,'fixture@example.test','Fixture123!',accountType,'Fixture company');render();
 return {state,refs,calls,routes,render,signup:()=>handlers.signup(),pump:()=>new Promise(setImmediate),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);return cb;},release:()=>{assert.ok(held,'fixture must reach pending fetch or real response.json');const old=held;held=null;old.gate.resolve(old.value);},get blocked(){return !!held;}};
}
for(const account of ['professional','company']){
 for(const phase of ['fetch','json'])test(`${account}: pending ${phase} deadline immediately reveals uncertain recovery and never permits another signup`,async()=>{
  const h=panel(account,phase);const pending=h.signup();await h.pump();assert.ok(h.blocked);assert.equal(h.state[5],true);h.timer()();assert.equal(h.state[5],false);assert.equal(h.state[6],true);assert.equal(h.refs[0].current,false);assert.equal(h.refs[2].current,true);assert.match(h.state[4],/Tente entrar/);assert.equal(h.state[1],'Fixture123!');assert.deepEqual(h.routes,[]);const message=h.state[4];h.render();await h.signup();assert.equal(h.calls.length,1);h.release();await pending;assert.equal(h.state[4],message);assert.equal(h.state[6],true);assert.equal(h.refs[2].current,true);assert.equal(h.state[1],'Fixture123!');assert.deepEqual(h.routes,[]);h.blur();
 });
 test(`${account}: rejection JSON decoded after deadline stays uncertain and cannot unlock duplicate account/workspace creation`,async()=>{
  const h=panel(account,'json',true);const pending=h.signup();await h.pump();h.timer()();assert.equal(h.state[6],true);assert.equal(h.state[5],false);h.release();await pending;assert.equal(h.refs[2].current,true);assert.equal(h.state[6],true);h.render();await h.signup();assert.equal(h.calls.length,1);assert.deepEqual(h.routes,[]);h.blur();
 });
}
test('blur/refocus retains the non-idempotent pending guard and ignores a late created acknowledgement',async()=>{
 const h=panel('company','json');const pending=h.signup();await h.pump();const expire=h.timer();h.blur();h.refocus();expire();assert.equal(h.state[6],true);h.release();await pending;h.render();await h.signup();assert.equal(h.calls.length,1);assert.equal(h.refs[2].current,true);assert.deepEqual(h.routes,[]);h.blur();
});
test('a timely acknowledgement retains real creation routing and clears password without a later obsolete timeout',async()=>{
 for(const account of ['professional','company']){const h=panel(account);const pending=h.signup();const expire=h.timer();await pending;expire();assert.deepEqual(h.routes,['/entrar']);assert.equal(h.state[1],'');assert.equal(h.state[6],false);assert.equal(h.refs[2].current,false);assert.equal(h.state[5],false);assert.equal(h.calls.length,1);h.blur();}
});
test('a timely email-in-use rejection remains confirmed and distinct from an unknown outcome',async()=>{
 const h=panel('professional',null,true);await h.signup();assert.equal(h.state[4],'Este e-mail já está cadastrado. Entre com sua conta.');assert.equal(h.state[6],false);assert.equal(h.refs[2].current,false);assert.equal(h.state[5],false);assert.equal(h.state[1],'Fixture123!');assert.deepEqual(h.routes,[]);h.blur();
});
