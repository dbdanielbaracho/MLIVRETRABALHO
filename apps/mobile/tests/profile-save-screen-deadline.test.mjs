import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadProfessionalProfile,loadWorkPassport} from '../lib/professional-profile.ts';
import {submitProfile} from '../lib/profile-submit.ts';
// Actual pre-JSX Perfil handlers and production parsers; explicit hooks/auth/transport fixtures.
// This does not render RN, run SecureStore, or prove cancellation of a dispatched server write.
const identity='Bearer owner',initial={id:'fixture-profile',displayName:'Before',homeCity:null,primaryRole:null},draft={displayName:' Edited ',homeCity:' City ',primaryRole:' Role '},saved={id:initial.id,displayName:'Edited',homeCity:'City',primaryRole:'Role'};
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:value=>resolve(value)};};
function screen(){
 const source=fs.readFileSync(new URL('../app/perfil.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Perfil('),end=source.indexOf('\n const rows=',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {saveProfile,load};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','fetch','router','setTimeout','clearTimeout','loadProfessionalProfile','loadWorkPassport','submitProfile',prefix+'\nreturn Perfil();');
 const state=[],refs=[],calls=[],routes=[],timers=new Map(),held=[];let si=0,ri=0,focus,cleanup,handlers,timerId=0,reads=0,armed=null,owner=identity,ack=saved,stored=initial,ok=true;
 function hold(value){armed=null;const gate=deferred();held.push({gate,value});return gate.promise;}
 const auth=async()=>{const value={Authorization:owner};const stage=++reads===1?'auth':'final-auth';return armed===stage?hold(value):value;};
 const fetch=async(path,options)=>{calls.push({path,options});if(options.method!=='PUT')return {ok:true,json:async()=>path==='/professional-profile'?stored:{displayName:stored?.displayName||'',completedWorkCount:0,averageRating:null,ratingCount:0}};
  const data=ack,response={ok,status:ok?200:400,json:async()=>armed==='json'?hold(data):data};return armed==='fetch'?hold(response):response;
 };
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return [state[i],value=>{state[i]=value}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},cb=>cb,cb=>{focus=cb},auth,p=>p,fetch,{replace:p=>routes.push(p)},cb=>{const id=++timerId;timers.set(id,cb);return id},id=>timers.delete(id),loadProfessionalProfile,loadWorkPassport,submitProfile);}
 render();cleanup=focus();return {state,refs,calls,routes,render,pump:()=>new Promise(setImmediate),edit:(value=draft)=>{state[2]=value.displayName;state[3]=value.homeCity;state[4]=value.primaryRole;refs[0].current=true;render()},save:()=>handlers.saveProfile(),arm:stage=>{armed=stage;reads=0},response:(data=saved,accepted=true)=>{ack=data;ok=accepted},owner:value=>{owner=value},profile:value=>{stored=value},blur:()=>cleanup(),refocus:()=>{render();cleanup=focus()},timer:()=>{const cb=[...timers.values()].at(-1);assert.ok(cb);return cb},release:()=>{assert.ok(held.length,'must reach the named pending phase');const x=held.shift();x.gate.resolve(x.value)},get blocked(){return held.length},get puts(){return calls.filter(c=>c.options.method==='PUT')},get busy(){return state[7]},get message(){return state[6]}};
}
async function ready(){const h=screen();await h.pump();await h.pump();h.edit();return h;}
for(const phase of ['auth','fetch','json','final-auth'])test('profile save deadline during '+phase+' releases busy, preserves draft and refuses late acknowledgement',async()=>{
 const h=await ready();h.arm(phase);const pending=h.save();await h.pump();assert.equal(h.blocked,1);assert.equal(h.busy,true);h.timer()();assert.equal(h.busy,false);assert.match(h.message,/15 segundos/);assert.deepEqual(h.state.slice(2,5),[draft.displayName,draft.homeCity,draft.primaryRole]);assert.equal(h.refs[0].current,true);if(phase==='auth')assert.equal(h.puts.length,0);h.release();await pending;await h.pump();assert.equal(h.busy,false);assert.deepEqual(h.state[0],{status:'ready',data:initial});assert.deepEqual(h.state.slice(2,5),[draft.displayName,draft.homeCity,draft.primaryRole]);assert.equal(h.refs[0].current,true);assert.doesNotMatch(h.message,/Dados salvos/);assert.equal(h.puts.length,phase==='auth'?0:1);assert.deepEqual(h.routes,[]);h.blur();
});
test('explicit retry retains the exact trimmed upsert body and old finally cannot unlock a newer pending save',async()=>{
 const h=await ready();h.arm('fetch');const old=h.save();await h.pump();const expire=h.timer();expire();h.render();h.arm('json');const next=h.save();await h.pump();assert.equal(h.puts.length,2);assert.equal(h.blocked,2);h.release();await old;assert.equal(h.busy,true);expire();assert.equal(h.busy,true);h.profile(saved);h.release();await next;await h.pump();assert.deepEqual(h.state[0],{status:'ready',data:saved});assert.equal(h.busy,false);assert.equal(h.refs[0].current,false);assert.equal(h.message,'Dados salvos.');assert.deepEqual(h.puts.map(c=>JSON.parse(c.options.body)),[saved,saved].map(({id,...body})=>body));assert.ok(h.puts.every(c=>c.options.headers.Authorization===identity&&c.path==='/professional-profile'));h.blur();
});
test('focus and owner change preserve the new identity snapshot against old response, finally and timer',async()=>{
 const h=await ready();h.arm('fetch');const old=h.save();await h.pump();const expire=h.timer();h.blur();h.owner('Bearer newer-owner');const actual={...initial,id:'new-profile',displayName:'New owner'};h.profile(actual);h.refocus();await h.pump();h.render();expire();h.release();await old;assert.deepEqual(h.state[0],{status:'ready',data:actual});assert.equal(h.state[2],'New owner');assert.equal(h.refs[0].current,false);assert.equal(h.busy,false);assert.equal(h.puts.length,1);assert.deepEqual(h.routes,[]);h.blur();
});
test('changed authorization before dispatch refuses PUT and clears the previous owner draft',async()=>{
 const h=await ready();h.arm(null);h.owner('Bearer another-owner');await h.save();assert.equal(h.puts.length,0);assert.deepEqual(h.state.slice(2,5),['','','']);assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.busy,false);assert.match(h.message,/sessão mudou/);h.blur();
});
test('wrong profile ID in a timely successful response cannot clear the draft or report saved',async()=>{
 const h=await ready();h.arm(null);h.response({...saved,id:'other-profile'});await h.save();assert.deepEqual(h.state.slice(2,5),[draft.displayName,draft.homeCity,draft.primaryRole]);assert.equal(h.refs[0].current,true);assert.doesNotMatch(h.message,/Dados salvos/);assert.equal(h.busy,false);h.blur();
});
test('timely profile creation verifies the real new ID and optional backend nulls',async()=>{
 const h=await ready();h.blur();h.profile(null);h.refocus();await h.pump();const input={displayName:' Created ',homeCity:' ',primaryRole:''},data={id:'new-profile',displayName:'Created',homeCity:null,primaryRole:null};h.edit(input);h.arm(null);h.response(data);h.profile(data);await h.save();await h.pump();assert.deepEqual(h.state[0],{status:'ready',data});assert.deepEqual(h.state.slice(2,5),['Created','','']);assert.equal(h.refs[0].current,false);assert.equal(h.message,'Dados salvos.');h.blur();
});
test('a timely rejected PUT retains the draft and never retries or reports saved',async()=>{
 const h=await ready();h.arm(null);h.response({},false);await h.save();assert.equal(h.puts.length,1);assert.equal(h.busy,false);assert.deepEqual(h.state.slice(2,5),[draft.displayName,draft.homeCity,draft.primaryRole]);assert.equal(h.refs[0].current,true);assert.doesNotMatch(h.message,/Dados salvos/);h.blur();
});
test('empty edited name prevents any PUT without claiming a successful save',async()=>{
 const h=await ready();h.edit({...draft,displayName:' '});h.arm(null);await h.save();assert.equal(h.puts.length,0);assert.equal(h.busy,false);assert.match(h.message,/Informe seu nome/);assert.equal(h.refs[0].current,true);h.blur();
});
