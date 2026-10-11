import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {interpretRequest} from '../lib/copilot-response.ts';
import {runForSession} from '../lib/session-context.ts';
// Real pre-JSX screen handlers and interpretation/session helpers; explicit hooks/clock/auth/fetch.
// No native render, paid model invocation or critical action execution.
const suggestion={accountType:'professional',intent:'show_schedule',confidence:0.88,reasons:['Fixture received'],suggestedRoute:'/agenda',mode:'assisted',executionAllowed:false,requiresHumanConfirmation:true,provider:'deterministic_baseline',providerConfigured:false,disclaimer:'Fixture assisted'};
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function panel(){
 const source=fs.readFileSync(new URL('../app/copilot.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Copilot('),end=source.indexOf('\n  return (');assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default function','function')+'\nreturn {interpret,nextStep};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','useRouter','authHeaders','apiUrl','interpretRequest','runForSession','fetch','setTimeout','clearTimeout',prefix+'\nreturn Copilot();');
 const state=[],refs=[],calls=[],routes=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,nextTimer=0,authorization='Bearer fixture',armed=null;const held=[];
 function hold(value){const old=armed;armed=null;old.value=value;held.push(old);return old.gate.promise;}
 const headers=async()=>{const value={Authorization:authorization};if(armed?.authReads&&--armed.authReads===0)return hold(value);return value;};
 const fetch=async(path,options)=>{calls.push({path,options});const response={ok:true,json:async()=>armed?.phase==='json'?hold(suggestion):suggestion};return armed?.phase==='fetch'?hold(response):response;};
 const dependencies=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},()=>({push:route=>routes.push(route)}),headers,p=>p,interpretRequest,runForSession,fetch,cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...dependencies);}
 render();cleanup=focus();state[0]='Fixture pedido';render();
 return {state,refs,calls,routes,render,interpret:()=>handlers.interpret(),next:()=>handlers.nextStep(),pump:()=>new Promise(setImmediate),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},owner:value=>{authorization=value},arm:phase=>{armed={phase,authReads:{auth:1,'origin-auth':2,'final-auth':3}[phase],gate:deferred()};},timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);return cb;},release:()=>{assert.ok(held.length,'fixture must reach its distinct phase');const old=held.shift();old.gate.resolve(old.value);},get blocked(){return held.length;}};
}
for(const phase of ['auth','origin-auth','fetch','json','final-auth'])test(`interpretation deadline immediately releases busy during ${phase} and rejects late suggestions`,async()=>{
 const h=panel();h.arm(phase);const pending=h.interpret();await h.pump();assert.equal(h.blocked,1);assert.equal(h.state[3],true);h.timer()();assert.equal(h.state[3],false);assert.equal(h.refs[0].current,false);assert.equal(h.state[1],null);assert.match(h.state[2],/15 segundos/);
 if(phase==='auth'||phase==='origin-auth')assert.equal(h.calls.length,0);h.release();await pending;assert.equal(h.state[1],null);assert.match(h.state[2],/15 segundos/);assert.equal(h.routes.length,0);assert.equal(h.state[0],'Fixture pedido');h.blur();
});
test('only an explicit manual retry sends another assisted interpretation and old completion cannot erase it',async()=>{
 const h=panel();h.arm('json');const old=h.interpret();await h.pump();h.timer()();assert.equal(h.calls.length,1);await h.pump();assert.equal(h.calls.length,1);h.render();await h.interpret();assert.deepEqual(h.state[1],suggestion);h.release();await old;assert.deepEqual(h.state[1],suggestion);assert.equal(h.state[3],false);assert.equal(h.calls.length,2);assert.ok(h.calls.every(c=>c.path==='/copilot/interpret'&&c.options.method==='POST'&&JSON.parse(c.options.body).mode==='assisted'));assert.equal(h.routes.length,0);h.blur();
});
test('late finally of an expired interpretation cannot release the busy lock of a newer pending interpretation',async()=>{
 const h=panel();h.arm('json');const old=h.interpret();await h.pump();h.timer()();h.render();h.arm('json');const next=h.interpret();await h.pump();assert.equal(h.blocked,2);h.release();await old;assert.equal(h.state[3],true);assert.equal(h.refs[0].current,true);assert.equal(h.state[1],null);const calls=h.calls.length;await h.interpret();assert.equal(h.calls.length,calls);h.release();await next;assert.deepEqual(h.state[1],suggestion);assert.equal(h.state[3],false);h.blur();
});
test('obsolete timer cannot clear a newer received interpretation or unlock its pending operation',async()=>{
 const h=panel();h.arm('json');const old=h.interpret();await h.pump();const expire=h.timer();expire();h.render();await h.interpret();expire();assert.deepEqual(h.state[1],suggestion);assert.equal(h.state[2],'');h.release();await old;assert.deepEqual(h.state[1],suggestion);h.blur();
});
test('blur/refocus invalidates an old pending authentication and its deadline without an old POST',async()=>{
 const h=panel();h.arm('auth');const old=h.interpret();await h.pump();const expire=h.timer();h.blur();h.refocus();h.render();await h.interpret();expire();h.release();await old;assert.deepEqual(h.state[1],suggestion);assert.equal(h.calls.length,1);assert.equal(h.routes.length,0);h.blur();
});
test('identity replacement after transport never supplies an actionable suggestion',async()=>{
 const h=panel();h.arm('json');const pending=h.interpret();await h.pump();h.owner('Bearer other');h.release();await pending;assert.equal(h.state[1],null);assert.equal(h.refs[4].current,undefined);assert.equal(h.state[3],false);h.render();await h.next();assert.equal(h.routes.length,0);h.blur();
});
test('received critical-language guidance retains human confirmation; navigation is explicit and checks current authorization',async()=>{
 const h=panel();await h.interpret();assert.deepEqual(h.state[1],suggestion);assert.equal(h.state[1].executionAllowed,false);assert.equal(h.state[1].requiresHumanConfirmation,true);assert.equal(h.routes.length,0);h.render();await h.next();assert.deepEqual(h.routes,['/agenda']);assert.equal(h.calls.length,1);h.owner('Bearer other');await h.next();assert.equal(h.state[1],null);assert.deepEqual(h.routes,['/agenda']);h.blur();
});
