import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadingManagement,loadManagement,sameManagementContext} from '../lib/company-members.ts';
import {loadingReplacements,loadReplacements,replaceable,sameReplacementContext} from '../lib/company-replacements.ts';
import {loadingSafety,loadSafety,sameSafetyContext} from '../lib/company-safety.ts';
import {loadReconciliation} from '../lib/company-readonly.ts';
import {loadPrivacyRequests} from '../lib/privacy-requests.ts';
import {samePrivacySession} from '../lib/privacy-actions.ts';
import {runForSession} from '../lib/session-context.ts';
const names={members:'Membros',replacements:'Substituicoes',safety:'CasosSeguranca',payments:'Pagamentos',privacy:'Privacidade'};
const WORK='11111111-2222-3333-4444-555555555555',REPL='66666666-7777-4888-8999-000000000000';
const files={members:'membros',replacements:'substituicoes',safety:'casos-seguranca',payments:'pagamentos',privacy:'privacidade'};
const ends={members:'\n async function createInvite(',replacements:'\n async function action(',safety:'\n async function update(',payments:'\n  return (\n',privacy:'\n  async function operate'};
const parts={members:['members','invitations'],replacements:['assignments','replacements'],safety:['cases','appeals']};
const at='2026-10-11T00:00:00Z',facts={
 '/company/members':[{identityId:'fixture-owner',email:'fixture@example.invalid',role:'owner',createdAt:at}],
 '/company/members/invitations':[{id:'fixture-invitation',email:'fixture@example.invalid',role:'manager',expiresAt:at}],
 '/company/dashboard/assignments':[{id:WORK,status:'confirmed',title:'Fixture work',professionalName:'Fixture person',replacementOpen:false}],
 '/company/replacements':[{id:REPL,assignmentId:WORK,status:'open'}],
 '/company/safety-cases':[{id:'fixture-case',category:'other',description:'Fixture report',status:'open',createdAt:at}],
 '/company/safety-appeals':[{id:'fixture-appeal',safetyCaseId:'fixture-case',appellantIdentityId:'fixture-person',reason:'Fixture reason',status:'submitted',createdAt:at}],
 '/company/payment-events/reconciliation':[{assignmentId:WORK,title:'Fixture work',professionalName:'Fixture person',payableCents:null,capturedCents:0,refundedCents:0,paidOutCents:0,reconciliationStatus:'no_earning'}],
 '/privacy/requests':[{id:'fixture-request',requestType:'correction',status:'submitted',createdAt:at}]
};
const errors=kind=>parts[kind]?Object.fromEntries(parts[kind].map(p=>[p,{status:'error'}])):{status:'error'};
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function screen(kind,stage){
 const src=fs.readFileSync(new URL('../app/'+files[kind]+'.tsx',import.meta.url),'utf8'),name=names[kind];
 const start=src.indexOf('export default function '+name+'('),end=src.indexOf(ends[kind],start);assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn '+(kind==='payments'?'{}':'{load}')+';\n}',{mode:'strip'});
 const bindings={loadingManagement,loadManagement,sameManagementContext,loadingReplacements,loadReplacements,replaceable,sameReplacementContext,loadingSafety,loadSafety,sameSafetyContext,loadReconciliation,loadPrivacyRequests,samePrivacySession,runForSession};
 const state=[],refs=[],timers=new Map(),calls=[],gate=deferred();let si=0,ri=0,timerId=0,focus,cleanup,h,reads=0,paused=true,headers={Authorization:'Bearer fixture-owner','x-tenant-id':'tenant-a'};
 const auth=async()=>{const n=++reads;if(paused&&((stage==='auth'&&n===1)||(stage==='final-auth'&&n===(kind==='payments'?3:2))))return gate.promise;return {...headers};};
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&stage==='fetch')await gate.promise;return {ok:true,status:200,json:async()=>{if(paused&&stage==='json')await gate.promise;assert.ok(path in facts,'fixture supplies the actual read endpoint');return facts[path]}};};
 const env={...bindings,useState:initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return[state[n],v=>{state[n]=typeof v==='function'?v(state[n]):v}]},useRef:initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial})},useCallback:x=>x,useFocusEffect:x=>{focus=x},authHeaders:auth,authenticatedTenantHeaders:auth,apiUrl:x=>x,fetch,setTimeout:fn=>{const n=++timerId;timers.set(n,fn);return n},clearTimeout:n=>timers.delete(n)};
 const make=new Function(...Object.keys(env),code+'\nreturn '+name+'();');
 function render(){si=ri=0;h=make(...Object.values(env));}render();cleanup=focus();
 return {state,calls,pump:()=>new Promise(setImmediate),timer:()=>{const fn=[...timers.values()].at(-1);assert.ok(fn);return fn;},resume:()=>{paused=false;gate.resolve({...headers})},blur:()=>cleanup(),refocus:()=>{cleanup();reads=0;render();cleanup=focus()},retry:()=>kind==='payments'?Promise.resolve((cleanup(),reads=0,render(),cleanup=focus())):h.load(true),changeOwner:()=>{headers={Authorization:'Bearer different-owner','x-tenant-id':'tenant-b'}}};
}
function checkReady(t,kind){
 const paths={members:['/company/members','/company/members/invitations'],replacements:['/company/dashboard/assignments','/company/replacements'],safety:['/company/safety-cases','/company/safety-appeals'],payments:['/company/payment-events/reconciliation'],privacy:['/privacy/requests']}[kind];
 if(parts[kind])parts[kind].forEach((p,i)=>assert.deepEqual(t.state[0][p],{status:'ready',data:facts[paths[i]]}));else assert.deepEqual(t.state[0],{status:'ready',data:facts[paths[0]]});
}
for(const kind of Object.keys(names)){
 for(const stage of ['auth','fetch','json','final-auth'])test(kind+' read deadline exits loading during unresolved '+stage+' and rejects late data',async()=>{
  const t=screen(kind,stage);await t.pump();t.timer()();assert.deepEqual(t.state[0],errors(kind));t.resume();await t.pump();assert.deepEqual(t.state[0],errors(kind));assert.equal(t.calls.length,stage==='auth'?0:parts[kind]?2:1);assert.ok(t.calls.every(c=>!c.options.method||c.options.method==='GET'));t.blur();
 });
 test(kind+' previous deadline and response cannot alter new focused data',async()=>{
  const t=screen(kind,'json');await t.pump();const old=t.timer();t.resume();t.refocus();await t.pump();checkReady(t,kind);const next=structuredClone(t.state[0]);old();assert.deepEqual(t.state[0],next);t.blur();
 });
 test(kind+' explicit retry recovers validated API data after deadline',async()=>{
  const t=screen(kind,'fetch');await t.pump();t.timer()();assert.deepEqual(t.state[0],errors(kind));t.resume();await t.pump();await t.retry();await t.pump();checkReady(t,kind);t.blur();
 });
 test(kind+' previous deadline cannot replace a newer read in current focus',async()=>{
  const t=screen(kind,'fetch');await t.pump();const old=t.timer();t.resume();await t.retry();await t.pump();checkReady(t,kind);const next=structuredClone(t.state[0]);old();assert.deepEqual(t.state[0],next);t.blur();
 });
 test(kind+' changed identity/company withholds previous context response',async()=>{
  const t=screen(kind,'fetch');await t.pump();t.changeOwner();t.resume();await t.pump();assert.deepEqual(t.state[0],errors(kind));t.blur();
 });
}
test('members read deadline preserves draft and unknown invitation state without a new invitation POST',async()=>{
 const t=screen('members','auth');t.state[1]='fixture@example.invalid';t.state[3]='fixture-invite-code';t.state[7]=true;await t.pump();t.timer()();assert.deepEqual(t.state[0],errors('members'));assert.equal(t.state[1],'fixture@example.invalid');assert.equal(t.state[3],'fixture-invite-code');assert.equal(t.state[7],true);t.resume();await t.pump();assert.equal(t.state[7],true);assert.equal(t.calls.length,0);t.blur();
});
test('replacement read deadline preserves typed reasons without creating or selecting a replacement',async()=>{
 const t=screen('replacements','auth');t.state[1]={WORK:'Fixture draft reason'};await t.pump();t.timer()();assert.deepEqual(t.state[0],errors('replacements'));assert.deepEqual(t.state[1],{WORK:'Fixture draft reason'});t.resume();await t.pump();assert.deepEqual(t.state[1],{WORK:'Fixture draft reason'});assert.equal(t.calls.length,0);t.blur();
});
test('privacy read deadline preserves draft and uncertain action guard without another privacy action',async()=>{
 const t=screen('privacy','auth');t.state[2]='Fixture private draft';t.state[5]=true;await t.pump();t.timer()();assert.deepEqual(t.state[0],errors('privacy'));assert.equal(t.state[2],'Fixture private draft');assert.equal(t.state[5],true);t.resume();await t.pump();assert.equal(t.state[2],'Fixture private draft');assert.equal(t.state[5],true);assert.equal(t.calls.length,0);t.blur();
});
