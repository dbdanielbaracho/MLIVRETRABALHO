import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadDeclaredCapabilities,capabilityLabel} from '../lib/professional-capabilities.ts';
import {runForSession} from '../lib/session-context.ts';
const row={roleId:'hospitality.bartender',vertical:'hospitality',family:'beverage',role:'bartender',skills:['drink_preparation'],certifications:['Actual certificate'],provenLevel:'proven'};
const ok=data=>({ok:true,status:200,json:async()=>data});
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
test('capability read retains exact catalog text ids, literal declarations and actual empty list',async()=>{
 assert.deepEqual(await loadDeclaredCapabilities(async()=>ok([row])),{status:'ready',data:[row]});
 assert.deepEqual(await loadDeclaredCapabilities(async()=>ok([])),{status:'ready',data:[]});assert.equal(capabilityLabel(row.skills[0]),'drink preparation');assert.equal(row.skills[0],'drink_preparation');
});
test('malformed capability facts or duplicate role rows cannot become partial or invented declarations',async()=>{
 for(const value of [null,{},[null],[row,row],[{...row,roleId:' '}],[{...row,vertical:null}],[{...row,skills:[1]}],[{...row,certifications:null}],[{...row,provenLevel:'certified'}]])assert.deepEqual(await loadDeclaredCapabilities(async()=>ok(value)),{status:'error'});
});
test('documented missing professional profile is distinct from empty declarations and failed authorization',async()=>{
 assert.deepEqual(await loadDeclaredCapabilities(async()=>({ok:false,status:400,json:async()=>({message:'professional_profile_required'})})),{status:'profile_required'});
 for(const status of [401,403,404,500])assert.deepEqual(await loadDeclaredCapabilities(async()=>({ok:false,status,json:async()=>({message:'professional_profile_required'})})),{status:'error'});
});
test('transport, rejected response or malformed JSON cannot confirm absence of declarations',async()=>{
 for(const request of [async()=>{throw Error('offline')},async()=>({ok:false,status:400,json:async()=>({message:'other_error'})}),async()=>({ok:true,json:async()=>{throw Error('bad-json')}})])assert.deepEqual(await loadDeclaredCapabilities(request),{status:'error'});
});
test('expired capability context cannot start GET or apply late JSON',async()=>{
 let calls=0;assert.deepEqual(await loadDeclaredCapabilities(async()=>{calls++;return ok([row])},()=>false),{status:'error'});assert.equal(calls,0);
 let current=true;assert.deepEqual(await loadDeclaredCapabilities(async()=>({ok:true,json:async()=>{current=false;return [row]}}),()=>current),{status:'error'});
});
// Actual pre-JSX handlers with explicit hooks/auth/transport/timer fixtures; no RN render.
function panel(){
 const source=fs.readFileSync(new URL('../components/DeclaredCapabilities.tsx',import.meta.url),'utf8'),start=source.indexOf('export function DeclaredCapabilities('),end=source.indexOf('\n const items=',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export function','function')+'\n return {load};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','runForSession','loadDeclaredCapabilities','fetch','setTimeout','clearTimeout',prefix+'\nreturn DeclaredCapabilities();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,timerId=0,authorization='Bearer actual-owner',read=async()=>({Authorization:authorization,'x-tenant-id':'must-not-use-default'}),transport=async()=>ok([row]);
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=value}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},()=>read(),x=>x,runForSession,loadDeclaredCapabilities,async(path,options)=>{calls.push({path,options});return transport(path,options)},callback=>{const id=++timerId;timers.set(id,callback);return id},id=>timers.delete(id));}
 render();cleanup=focus();
 return {state,calls,render,pump:()=>new Promise(setImmediate),reload:()=>handlers.load(),blur:()=>cleanup(),setAuth:x=>{authorization=x},setAuthRead:x=>{read=x},setTransport:x=>{transport=x},expire:()=>{for(const callback of [...timers.values()])callback()}};
}
test('opening declarations only reads the authenticated profile without a default tenant or writes',async()=>{
 const h=panel();await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:[row]});assert.deepEqual(h.calls.map(x=>[x.path,x.options.method,x.options.headers]),[['/professional-capabilities','GET',{Authorization:'Bearer actual-owner'}]]);h.blur();
});
test('changing identity after JSON rejects the prior user declarations',async()=>{
 const h=panel();h.setTransport(async()=>({ok:true,json:async()=>{h.setAuth('Bearer other-owner');return [row]}}));await h.pump();assert.deepEqual(h.state[0],{status:'error'});h.blur();
});
test('a blurred capability panel cannot apply late data',async()=>{
 const h=panel(),gate=deferred();h.setTransport(async()=>gate.promise);await h.pump();h.blur();gate.resolve(ok([row]));await h.pump();assert.deepEqual(h.state[0],{status:'loading'});
});
test('capability deadline resolves UI while initial auth is pending and forbids late GET',async()=>{
 const h=panel(),gate=deferred();h.setAuthRead(async()=>gate.promise);await h.pump();h.expire();assert.deepEqual(h.state[0],{status:'error'});gate.resolve({Authorization:'Bearer actual-owner'});await h.pump();assert.equal(h.calls.length,0);assert.deepEqual(h.state[0],{status:'error'});h.blur();
});
for(const stage of ['fetch','json'])test('capability deadline rejects late '+stage+' that ignores abort',async()=>{
 const h=panel(),gate=deferred();h.setTransport(async()=>stage==='fetch'?gate.promise:{ok:true,json:()=>gate.promise});await h.pump();h.expire();assert.deepEqual(h.state[0],{status:'error'});gate.resolve(stage==='fetch'?ok([row]):[row]);await h.pump();assert.deepEqual(h.state[0],{status:'error'});h.blur();
});
test('capability final auth read crossing deadline cannot acknowledge a ready snapshot',async()=>{
 const h=panel(),gate=deferred();h.setTransport(async()=>({ok:true,json:async()=>{h.setAuthRead(async()=>gate.promise);return [row]}}));await h.pump();h.expire();assert.deepEqual(h.state[0],{status:'error'});gate.resolve({Authorization:'Bearer actual-owner'});await h.pump();assert.deepEqual(h.state[0],{status:'error'});h.blur();
});
test('retry applies only the current real response and supersedes an unresolved previous read',async()=>{
 const h=panel(),gate=deferred();h.setTransport(async()=>gate.promise);await h.pump();h.expire();h.setTransport(async()=>ok([]));await h.reload();assert.deepEqual(h.state[0],{status:'ready',data:[]});gate.resolve(ok([row]));await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:[]});h.blur();
});
