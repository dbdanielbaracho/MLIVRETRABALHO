import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadPrivacyRequests} from '../lib/privacy-requests.ts';
import {createPrivacyRequest,deactivatePrivacyAccount,exportPrivacyData,samePrivacySession} from '../lib/privacy-actions.ts';

// Actual pre-JSX screen; explicit hooks, transport, local-clear callbacks and timers.
// No React Native render, HTTP service, account mutation or SecureStore execution.
const pump=()=>new Promise(setImmediate);
function deferred(){let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};}
const exportFixture={requestId:'fixture-access',generatedAt:'2026-10-18T00:00:00Z',identity:{id:'fixture-identity',email:'fixture@example.invalid',createdAt:'2026-01-01T00:00:00Z'},memberships:[],professionalProfile:null,availability:[],assignments:[],earnings:[],verifications:[],notifications:[],authoredMessages:[],ratingsReceived:[],ratingsAuthored:[],trustEvents:[],safetyReports:[],safetyRelated:[],appeals:[],privacyRequests:[],notice:{scope:'fixture authenticated identity',redaction:'fixture',excludes:['session tokens']}};
function screen(action='create',fixture={}){
 const src=fs.readFileSync(new URL('../app/privacidade.tsx',import.meta.url),'utf8');
 const start=src.indexOf('export default function Privacidade('),end=src.indexOf('\n  return <',start);assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn {load,createRequest,exportData,deactivate};\n}',{mode:'strip'});
 const state=[],refs=[],calls=[],timers=new Map(),clears=[],routes=[];let si=0,ri=0,timerId=0,focus,cleanup,h,plan,unknownResponse=false,authorization='Bearer explicit-fixture',clearGate;
 const auth=async()=>{if(plan){const active=plan,n=++active.auth;if(active.stage==='auth'&&n===1||active.stage==='final-auth'&&n===2||active.stage==='refresh-auth'&&n===3||active.stage==='refresh-final-auth'&&n===4)await active.gate.promise;}return {Authorization:authorization};};
 const fetch=async(path,options)=>{
  calls.push({path,options});const active=plan;
  if(options.method==='POST'||path==='/privacy/export'){
   assert.equal(path,{create:'/privacy/requests',export:'/privacy/export',deactivate:'/privacy/deactivate'}[action]);assert.equal(options.method,action==='export'?'GET':'POST');
   if(action==='create')assert.deepEqual(JSON.parse(options.body),{requestType:'portability'});else assert.equal(options.body,undefined);
   if(active?.stage==='fetch')await active.gate.promise;
   return {ok:true,status:action==='create'?201:200,json:async()=>{if(active?.stage==='json')await active.gate.promise;return unknownResponse?null:action==='export'?(fixture.copy??exportFixture):action==='deactivate'?{requestId:'fixture-deactivated',deactivated:true,deactivatedAt:fixture.date??'2026-10-18T00:00:00Z'}:{requestId:'fixture-created',requestType:'portability',status:'submitted'};}};
  }
  assert.equal(path,'/privacy/requests');if(active?.stage==='refresh-fetch')await active.gate.promise;return {ok:true,status:200,json:async()=>{if(active?.stage==='refresh-json')await active.gate.promise;return fixture.requests??[];}};
 };
 const env={useState:initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return [state[n],value=>{state[n]=typeof value==='function'?value(state[n]):value;}];},useRef:initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial});},useCallback:x=>x,useFocusEffect:x=>focus=x,authHeaders:auth,apiUrl:x=>x,fetch,loadPrivacyRequests,createPrivacyRequest,deactivatePrivacyAccount,exportPrivacyData,samePrivacySession,setTimeout:(fn,ms)=>{assert.equal(ms,15000);const id=++timerId;timers.set(id,fn);return id;},clearTimeout:id=>timers.delete(id),clearSessionForAuthorization:async value=>{clears.push(value);if(clearGate)await clearGate.promise;return 'cleared';},router:{replace:path=>routes.push(path)},Alert:{alert:()=>{throw Error('No native Alert invocation in this explicit-handler fixture');}}};
 const make=new Function(...Object.keys(env),code+'\nreturn Privacidade();');
 function render(){si=ri=0;h=make(...Object.values(env));}render();
 return {state,refs,calls,clears,routes,async mount(expected='ready'){cleanup=focus();await pump();render();assert.equal(state[0].status,expected);},arm(stage){const ownPlan={stage,auth:0,gate:deferred()};plan=ownPlan;return ()=>ownPlan.gate.resolve();},create:()=>action==='create'?h.createRequest('portability'):action==='export'?h.exportData():h.deactivate(refs[7].current),retry:()=>h.load(true),owner(){authorization='Bearer another-fixture';},blockClear(){const gate=deferred();clearGate=gate;return ()=>gate.resolve();},uncertainResponse(){unknownResponse=true;},timer:()=>[...timers.entries()].at(-1),expire(timer=[...timers.entries()].at(-1)){const [id,fn]=timer;timers.delete(id);fn();},blur:()=>cleanup(),async refocus(){cleanup();render();cleanup=focus();await pump();render();},actions:()=>calls.filter(x=>x.options.method==='POST'||x.path==='/privacy/export'),posts:()=>calls.filter(x=>x.options.method==='POST')};
}

const impossible=['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00'];
const requestRow={id:'fixture-request',requestType:'access',status:'completed',createdAt:'2024-02-29T00:00:00Z',completedAt:null};
for(const date of impossible)test('screen invalid deactivation calendar '+date+' never authorizes local clear or navigation',async()=>{
 const h=screen('deactivate',{date});await h.mount();await h.create();assert.equal(h.posts().length,1);assert.deepEqual(h.clears,[]);assert.deepEqual(h.routes,[]);assert.equal(h.state[4],false);assert.equal(h.state[5],true);assert.doesNotMatch(h.state[1],/^Conta desativada/);await h.create();assert.equal(h.posts().length,1);await h.refocus();await h.create();assert.equal(h.posts().length,1);assert.equal(h.state[5],true);await h.retry();assert.equal(h.state[5],false);assert.equal(h.posts().length,1);h.blur();
});
for(const field of ['generatedAt','identity.createdAt','privacyRequests.createdAt'])test('screen withholds incompatible export '+field+' and retains unknown barrier without another access GET',async()=>{
 const copy=structuredClone(exportFixture);copy.privacyRequests=[{...requestRow}];if(field==='generatedAt')copy.generatedAt=impossible[0];else if(field==='identity.createdAt')copy.identity.createdAt=impossible[1];else copy.privacyRequests[0].createdAt=impossible[2];
 const h=screen('export',{copy});await h.mount();await h.create();assert.equal(h.actions().length,1);assert.equal(h.posts().length,0);assert.equal(h.state[3],'');assert.equal(h.state[4],false);assert.equal(h.state[5],true);assert.doesNotMatch(h.state[1],/^Cópia gerada/);await h.create();assert.equal(h.actions().length,1);assert.deepEqual(h.clears,[]);assert.deepEqual(h.routes,[]);h.blur();
});
for(const createdAt of impossible)test('screen invalid request calendar '+createdAt+' withholds snapshot and all mutations',async()=>{
 const h=screen('deactivate',{requests:[{...requestRow,createdAt}]});await h.mount('error');assert.equal(h.refs[7].current,null);await h.create();assert.equal(h.posts().length,0);assert.equal(h.calls.length,1);assert.deepEqual(h.clears,[]);assert.deepEqual(h.routes,[]);h.blur();
});
test('screen valid leapday deactivation keeps one bodyless POST followed by verified clear callback and navigation',async()=>{
 const h=screen('deactivate',{date:'2024-02-29T12:00:00-03:00'});await h.mount();await h.create();assert.equal(h.posts().length,1);assert.equal(h.posts()[0].options.body,undefined);assert.deepEqual(h.clears,['Bearer explicit-fixture']);assert.deepEqual(h.routes,['/']);h.blur();
});
test('screen compatible offset export is displayed unchanged after exactly one access GET and explicit list refresh',async()=>{
 const copy=structuredClone(exportFixture);copy.generatedAt='2026-10-17T23:30:00-03:00';const h=screen('export',{copy});await h.mount();await h.create();assert.deepEqual(JSON.parse(h.state[3]),copy);assert.equal(h.actions().length,1);assert.equal(h.calls.length,3);assert.equal(h.state[5],false);assert.deepEqual(h.clears,[]);h.blur();
});
test('screen compatible epoch list preserves optional null completion and keeps verified action authority',async()=>{
 const requests=[{...requestRow,createdAt:'1970-01-01T00:00:00.000Z'}];const h=screen('create',{requests});await h.mount();assert.deepEqual(h.state[0],{status:'ready',data:requests});assert.ok(h.refs[7].current);await h.create();assert.equal(h.posts().length,1);assert.match(h.state[1],/Pedido registrado/);h.blur();
});
