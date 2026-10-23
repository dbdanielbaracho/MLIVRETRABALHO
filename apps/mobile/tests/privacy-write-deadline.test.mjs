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
function screen(action='create'){
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
   return {ok:true,status:action==='create'?201:200,json:async()=>{if(active?.stage==='json')await active.gate.promise;return unknownResponse?null:action==='export'?exportFixture:action==='deactivate'?{requestId:'fixture-deactivated',deactivated:true,deactivatedAt:'2026-10-18T00:00:00Z'}:{requestId:'fixture-created',requestType:'portability',status:'submitted'};}};
  }
  assert.equal(path,'/privacy/requests');if(active?.stage==='refresh-fetch')await active.gate.promise;return {ok:true,status:200,json:async()=>{if(active?.stage==='refresh-json')await active.gate.promise;return [];}};
 };
 const env={useState:initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return [state[n],value=>{state[n]=typeof value==='function'?value(state[n]):value;}];},useRef:initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial});},useCallback:x=>x,useFocusEffect:x=>focus=x,authHeaders:auth,apiUrl:x=>x,fetch,loadPrivacyRequests,createPrivacyRequest,deactivatePrivacyAccount,exportPrivacyData,samePrivacySession,setTimeout:(fn,ms)=>{assert.equal(ms,15000);const id=++timerId;timers.set(id,fn);return id;},clearTimeout:id=>timers.delete(id),clearSessionForAuthorization:async value=>{clears.push(value);if(clearGate)await clearGate.promise;return 'cleared';},router:{replace:path=>routes.push(path)},Alert:{alert:()=>{throw Error('No native Alert invocation in this explicit-handler fixture');}}};
 const make=new Function(...Object.keys(env),code+'\nreturn Privacidade();');
 function render(){si=ri=0;h=make(...Object.values(env));}render();
 return {state,refs,calls,clears,routes,async mount(){cleanup=focus();await pump();render();assert.equal(state[0].status,'ready');},arm(stage){const ownPlan={stage,auth:0,gate:deferred()};plan=ownPlan;return ()=>ownPlan.gate.resolve();},create:()=>action==='create'?h.createRequest('portability'):action==='export'?h.exportData():h.deactivate(refs[7].current),retry:()=>h.load(true),owner(){authorization='Bearer another-fixture';},blockClear(){const gate=deferred();clearGate=gate;return ()=>gate.resolve();},uncertainResponse(){unknownResponse=true;},timer:()=>[...timers.entries()].at(-1),expire(timer=[...timers.entries()].at(-1)){const [id,fn]=timer;timers.delete(id);fn();},blur:()=>cleanup(),async refocus(){cleanup();render();cleanup=focus();await pump();render();},actions:()=>calls.filter(x=>x.options.method==='POST'||x.path==='/privacy/export'),posts:()=>calls.filter(x=>x.options.method==='POST')};
}
test('actual privacy create positive control makes one explicit POST and refreshes once',async()=>{
 const h=screen();await h.mount();await h.create();assert.equal(h.state[4],false);assert.equal(h.state[5],false);assert.deepEqual(h.calls.map(x=>x.options.method||'GET'),['GET','POST','GET']);assert.match(h.state[1],/Pedido registrado/);h.blur();
});
for(const stage of ['auth','fetch','json','final-auth'])test('actual privacy write deadline must settle unresolved '+stage+' without a second mutation',async()=>{
 const h=screen();await h.mount();const resume=h.arm(stage),work=h.create();await pump();assert.equal(h.state[4],true);const actionController=[...h.refs[3].current][0];h.expire();
 const observed={busy:h.state[4],pending:Boolean(h.refs[4].current),uncertain:h.state[5],posts:h.posts().length};
 assert.equal(actionController.signal.aborted,true);assert.equal(h.refs[3].current.size,0);await h.create();assert.equal(h.posts().length,stage==='auth'?0:1);assert.equal(h.calls.filter(x=>!x.options.method).length,1);
 resume();await work;
 assert.equal(h.posts().length,stage==='auth'?0:1);assert.equal(observed.posts,stage==='auth'?0:1);
 assert.equal(h.state[4],false);assert.equal(Boolean(h.refs[4].current),false);assert.equal(h.state[5],stage!=='auth');
 assert.equal(observed.busy,false,JSON.stringify(observed));assert.equal(observed.pending,false);
 assert.equal(observed.uncertain,stage!=='auth','A possibly-sent mutation must retain the explicit reconciliation barrier');h.blur();
});
for(const action of ['export','deactivate']){
 test('actual '+action+' explicit-handler positive control verifies ACK before local side effects',async()=>{
  const h=screen(action);await h.mount();await h.create();assert.equal(h.state[4],false);assert.equal(h.state[5],false);assert.equal(h.actions().length,1);
  if(action==='export'){assert.deepEqual(JSON.parse(h.state[3]),exportFixture);assert.deepEqual(h.clears,[]);assert.deepEqual(h.routes,[]);assert.equal(h.calls.length,3);}else{assert.deepEqual(h.clears,['Bearer explicit-fixture']);assert.deepEqual(h.routes,['/']);assert.equal(h.calls.length,2);}h.blur();
 });
 for(const stage of ['auth','fetch','json','final-auth'])test('actual '+action+' deadline settles unresolved '+stage+' without repeating access DSAR or clearing session from a late ACK',async()=>{
  const h=screen(action);await h.mount();const resume=h.arm(stage),work=h.create();await pump();h.expire();const observed={busy:h.state[4],pending:Boolean(h.refs[4].current),uncertain:h.state[5],actions:h.actions().length};await h.create();assert.equal(h.actions().length,stage==='auth'?0:1);resume();await work;
  assert.equal(h.actions().length,stage==='auth'?0:1);assert.equal(h.state[3],'');assert.deepEqual(h.clears,[]);assert.deepEqual(h.routes,[]);assert.equal(h.state[4],false);assert.equal(h.state[5],stage!=='auth');assert.equal(observed.busy,false,JSON.stringify(observed));assert.equal(observed.pending,false);assert.equal(observed.uncertain,stage!=='auth');h.blur();
 });
}
test('unknown ACK keeps the mutation barrier until explicit successful request reconciliation',async()=>{
 const h=screen();await h.mount();h.uncertainResponse();await h.create();assert.equal(h.state[4],false);assert.equal(h.state[5],true);assert.equal(h.refs[6].current,true);await h.create();assert.equal(h.posts().length,1);assert.equal(h.calls.length,2);await h.retry();assert.equal(h.state[5],false);assert.equal(h.refs[6].current,false);assert.equal(h.posts().length,1);assert.equal(h.calls.length,3);h.blur();
});
test('blur and ordinary focus reload preserve an unknown mutation barrier without automatic retry',async()=>{
 const h=screen();await h.mount();h.uncertainResponse();await h.create();await h.refocus();assert.equal(h.state[0].status,'ready');assert.equal(h.state[5],true);assert.equal(h.refs[6].current,true);await h.create();assert.equal(h.posts().length,1);assert.equal(h.calls.length,3);h.blur();
});
for(const action of ['create','export','deactivate']){
 for(const stage of ['auth','json'])test(action+' old '+stage+' finally and timer cannot clear a newer operation after explicit reconciliation in the same epoch',async()=>{
  const h=screen(action);await h.mount();const oldResume=h.arm(stage),oldWork=h.create();await pump();const oldTimer=h.timer();h.expire(oldTimer);await h.retry();assert.equal(h.state[5],false);const newResume=h.arm('json'),newWork=h.create();await pump();
  const expected=stage==='auth'?1:2;assert.equal(h.actions().length,expected,'Explicit successful reconciliation should permit only the new human action');assert.equal(h.state[4],true);const currentPending=h.refs[4].current;oldResume();await oldWork;h.expire(oldTimer);assert.equal(h.state[4],true);assert.equal(h.refs[4].current,currentPending);assert.equal(h.state[5],false);assert.equal(h.actions().length,expected);newResume();await newWork;assert.equal(h.state[4],false);h.blur();
 });
 test(action+' queued timer from a completed action cannot expire a later same-focus operation',async()=>{
  const h=screen(action);await h.mount();const resume=h.arm('json'),work=h.create();await pump();const oldTimer=h.timer();resume();await work;await h.retry();const newResume=h.arm('json'),newWork=h.create();await pump();const currentPending=h.refs[4].current;h.expire(oldTimer);assert.equal(h.state[4],true);assert.equal(h.refs[4].current,currentPending);assert.equal(h.state[5],false);assert.equal(h.actions().length,2);newResume();await newWork;h.blur();
 });
}
for(const action of ['create','export'])for(const stage of ['refresh-auth','refresh-fetch','refresh-json','refresh-final-auth'])test(action+' confirmed ACK survives unresolved '+stage+' without relabeling the server action unknown or repeating it',async()=>{
 const h=screen(action);await h.mount();const resume=h.arm(stage),work=h.create(),timer=h.timer();await pump();const message=h.state[1],copy=h.state[3];assert.match(message,action==='create'?/Pedido registrado: fixture-created/:/Cópia gerada. Pedido: fixture-access/);assert.equal(h.state[4],true);
 h.expire(timer);assert.equal(h.state[4],false);assert.equal(h.state[5],true);assert.equal(h.state[0].status,'error');assert.equal(h.refs[7].current,null);assert.ok(h.state[1].startsWith(message));assert.doesNotMatch(h.state[1],/Não foi possível confirmar o resultado/);assert.equal(h.state[3],copy);await h.create();assert.equal(h.actions().length,1);resume();await work;assert.equal(h.state[0].status,'error');assert.equal(h.state[5],true);assert.equal(h.actions().length,1);h.blur();
});
test('verified deactivation with unresolved local clear keeps known server ACK, settles busy and rejects late navigation',async()=>{
 const h=screen('deactivate');await h.mount();const resume=h.blockClear(),work=h.create(),timer=h.timer();await pump();assert.deepEqual(h.clears,['Bearer explicit-fixture']);h.expire(timer);assert.equal(h.state[4],false);assert.equal(h.state[5],true);assert.match(h.state[1],/^Conta desativada\./);assert.doesNotMatch(h.state[1],/Não foi possível confirmar o resultado/);await h.create();assert.equal(h.actions().length,1);resume();await work;assert.deepEqual(h.routes,[]);assert.equal(h.actions().length,1);h.blur();
});
for(const action of ['create','export','deactivate']){
 test(action+' late ACK after identity change cannot display export or clear/navigate the new account',async()=>{
  const h=screen(action);await h.mount();const resume=h.arm('json'),work=h.create();await pump();h.owner();resume();await work;assert.equal(h.state[0].status,'error');assert.equal(h.refs[7].current,null);assert.equal(h.state[5],true);assert.equal(h.state[3],'');assert.deepEqual(h.clears,[]);assert.deepEqual(h.routes,[]);assert.equal(h.actions().length,1);h.blur();
 });
 test(action+' stale focus timer and completion cannot replace a new focused reconciliation',async()=>{
  const h=screen(action);await h.mount();const resume=h.arm('json'),work=h.create();await pump();const oldTimer=h.timer();await h.refocus();const currentState=h.state[0],currentSnapshot=h.refs[7].current;h.expire(oldTimer);resume();await work;assert.equal(h.state[0],currentState);assert.equal(h.refs[7].current,currentSnapshot);assert.equal(h.state[5],true);assert.deepEqual(h.clears,[]);assert.deepEqual(h.routes,[]);assert.equal(h.actions().length,1);h.blur();
 });
}

