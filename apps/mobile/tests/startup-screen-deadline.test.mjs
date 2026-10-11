import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {resolveStartupRoute} from '../lib/startup-route.ts';
// Real focus handler and paired startup resolver; explicit auth/hook/timer/router fixtures.
// No SecureStore, native render, actual navigation or physical launch acceptance.
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function panel(headers,pause=0){
 const source=fs.readFileSync(new URL('../app/index.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Home('),end=source.indexOf('\n  return (');assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default function','function')+'\n}',{mode:'strip'});
 const create=new Function('useState','useCallback','useFocusEffect','authenticatedTenantHeaders','resolveStartupRoute','router','setTimeout','clearTimeout',prefix+'\nreturn Home();');
 const state=[],routes=[],timers=new Map();let si=0,focus,cleanup,reads=0,nextTimer=0,held=null,authorization={...headers};
 const read=async()=>{const value={...authorization};if(++reads===pause){held={gate:deferred(),value};return held.gate.promise;}return value;};
 const deps=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=value}];},cb=>cb,cb=>{focus=cb},read,resolveStartupRoute,{replace:route=>routes.push(route)},cb=>{const id=++nextTimer;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;create(...deps);}
 render();cleanup=focus();return {state,routes,pump:()=>new Promise(setImmediate),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},headers:value=>{authorization={...value}},timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb,'focus read must have a deadline');return cb;},release:()=>{assert.ok(held,'fixture must reach the distinct pending snapshot');const old=held;held=null;old.gate.resolve(old.value);},get reads(){return reads;},get blocked(){return !!held;}};
}
for(const account of ['professional','company'])for(const phase of [1,2])test(`${account}: startup deadline reveals entry actions before pending snapshot ${phase} resolves and prevents late routing`,async()=>{
 const headers={Authorization:'Bearer fixture',...(account==='company'?{'x-tenant-id':'tenant-fixture'}:{})};const h=panel(headers,phase);await h.pump();assert.equal(h.blocked,true);assert.equal(h.state[0],true);h.timer()();assert.equal(h.state[0],false);assert.deepEqual(h.routes,[]);h.release();await h.pump();assert.equal(h.state[0],false);assert.deepEqual(h.routes,[]);assert.equal(h.reads,phase);h.blur();
});
test('a prior timer and late snapshot cannot affect refocused startup with a new paired identity/tenant',async()=>{
 const h=panel({Authorization:'Bearer old','x-tenant-id':'tenant-old'},1);await h.pump();const expire=h.timer();h.blur();h.headers({Authorization:'Bearer new'});h.refocus();await h.pump();expire();h.release();await h.pump();assert.deepEqual(h.routes,['/profissional-inicio']);assert.equal(h.reads,3);h.blur();
});
test('timely paired snapshots retain real account routing and dispose their deadline',async()=>{
 for(const [headers,route]of [[{Authorization:'Bearer fixture'},'/profissional-inicio'],[{Authorization:'Bearer fixture','x-tenant-id':'tenant-fixture'},'/empresa-inicio']]){const h=panel(headers);await h.pump();assert.deepEqual(h.routes,[route]);assert.equal(h.reads,2);h.blur();}
});
test('signed-out snapshot with orphan tenant shows entry actions without inventing a company route',async()=>{
 const h=panel({'x-tenant-id':'orphan'});await h.pump();assert.equal(h.state[0],false);assert.deepEqual(h.routes,[]);assert.equal(h.reads,2);h.blur();
});
