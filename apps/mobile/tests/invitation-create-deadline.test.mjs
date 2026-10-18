import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadingManagement,loadManagement,sameManagementContext,generateInvitation,acceptInvitation,revokeInvitation} from '../lib/company-members.ts';

// Actual pre-JSX handlers and actual helper; explicit hooks/auth/transport/timers.
// This does not execute React Native, SecureStore, PostgreSQL or invitation delivery.
const tenant='407053f1-f363-4cd9-a47e-c1d5f32b1a9b',otherTenant='460eac25-f18c-46e5-81c8-6d8c487d6770',at='2026-10-18T00:00:00Z',email='invitee@example.invalid',invitationId='fixture-invitation';
const errors={members:{status:'error'},invitations:{status:'error'}},pump=()=>new Promise(setImmediate);
function deferred(){let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};}
function screen(initialStage='none'){
 const src=fs.readFileSync(new URL('../app/membros.tsx',import.meta.url),'utf8'),start=src.indexOf('export default function Membros('),end=src.indexOf('\n  return <SafeAreaView',start);assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn{load,createInvite,acceptInvite,revoke};\n}',{mode:'strip'});
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,id=0,focus,cleanup,h,active=false,reads=0,stage=initialStage,gate=deferred(),outcome='confirmed',hold;
 let headers={Authorization:'Bearer explicit-fixture','x-tenant-id':tenant};
 const auth=async()=>{if(active){const n=++reads;if(hold){const wait=hold;hold=null;wait.started=true;await wait.promise;}if(stage==='auth'&&n===1||stage==='final-auth'&&n===2||stage==='secret-auth'&&n===3||stage==='reload-auth'&&n===4||stage==='reload-final-auth'&&n===5)await gate.promise;}return {...headers};};
 const fetch=async(path,options)=>{
  calls.push({path,options});
  if(options.method==='POST'){
   if(path==='/company/members/invitations'){
    assert.deepEqual(JSON.parse(options.body),{email,role:'manager'});assert.equal(options.headers['x-tenant-id'],tenant);
    if(stage==='fetch')await gate.promise;
    return {ok:outcome!=='rejected',status:outcome==='rejected'?403:201,json:async()=>{if(stage==='json')await gate.promise;return outcome==='unknown'?null:{invitationId,inviteCode:tenant+'.fixture-secret',email,role:'manager',expiresAt:at};}};
   }
   if(path.endsWith('/revoke'))return {ok:true,json:async()=>({revoked:true,invitationId})};
   assert.equal(path,'/company/members/invitations/accept');return {ok:false,status:403,json:async()=>({message:'invitation_email_mismatch'})};
  }
  assert.ok(['/company/members','/company/members/invitations'].includes(path));
  if(active&&stage==='reload-fetch')await gate.promise;
  return {ok:true,status:200,json:async()=>{if(active&&stage==='reload-json')await gate.promise;return path==='/company/members'?[{identityId:'fixture-owner',email:'owner@example.invalid',role:'owner',createdAt:at}]:[{id:invitationId,email,role:'manager',expiresAt:at}];}};
 };
 const env={loadingManagement,loadManagement,sameManagementContext,generateInvitation,acceptInvitation,revokeInvitation,useState:initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return [state[n],v=>state[n]=typeof v==='function'?v(state[n]):v];},useRef:initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial});},useCallback:x=>x,useFocusEffect:fn=>focus=fn,authenticatedTenantHeaders:auth,saveTenantForContext:()=>{throw Error('No verified acceptance: local tenant must not be written');},router:{replace:()=>{throw Error('No navigation authorized');}},apiUrl:x=>x,fetch,setTimeout:(fn,ms)=>{assert.equal(ms,15000);const n=++id;timers.set(n,fn);return n;},clearTimeout:n=>timers.delete(n)};
 const make=new Function(...Object.keys(env),code+'\nreturn Membros();');function render(){si=ri=0;h=make(...Object.values(env));}render();
 return {state,refs,calls,render,timers,async mount(){cleanup=focus();await pump();assert.equal(state[0].members.status,'ready');state[1]=email;state[3]=tenant+'.accept-input';render();active=true;reads=0;},create:()=>h.createInvite(),accept:()=>h.acceptInvite(),revoke:()=>h.revoke(invitationId),owner(){headers={...headers,Authorization:'Bearer another-fixture'};},company(){headers={...headers,'x-tenant-id':otherTenant};},outcome:value=>outcome=value,timer:()=>{const fn=[...timers.values()][0];assert.ok(fn);return fn;},resume:()=>gate.resolve(),posts:()=>calls.filter(x=>x.options.method==='POST'),blur:()=>cleanup(),holdAuth(){const d=deferred();hold=d;return d;},async refresh(){active=false;await h.load(true);render();active=true;reads=0;},async refocus(){cleanup();active=false;render();cleanup=focus();await pump();render();active=true;reads=0;},next(){stage='none';reads=0;}};
}
test('one scoped creation POST exposes only the verified secret and refreshes two reads',async()=>{const h=screen();await h.mount();await h.create();assert.equal(h.state[6],false);assert.equal(h.state[7],false);assert.equal(h.state[4],tenant+'.fixture-secret');assert.equal(h.posts().length,1);assert.deepEqual(h.calls.map(x=>x.options.method),['GET','GET','POST','GET','GET']);assert.equal(h.refs[5].current.size,0);h.blur();});
for(const stage of ['auth','fetch','json','final-auth','secret-auth'])test('creation '+stage+' deadline releases UI, preserves drafts and suppresses late facts',async()=>{
 const h=screen(stage);await h.mount();const work=h.create();await pump();const timer=h.timer(),controller=[...h.refs[5].current][0];assert.equal(h.state[6],true);timer();
 const observed=structuredClone(h.state);assert.equal(controller.signal.aborted,true);h.resume();await work;
 assert.equal(observed[6],false);assert.equal(h.refs[3].current,false);assert.deepEqual(observed[0],errors);assert.equal(observed[1],email);assert.equal(observed[3],tenant+'.accept-input');assert.equal(observed[7],stage!=='auth');assert.equal(observed[4],'');assert.deepEqual(h.state,observed);assert.equal(h.refs[5].current.size,0);assert.equal(h.posts().length,stage==='auth'?0:1);h.blur();
});
for(const stage of ['reload-auth','reload-fetch','reload-json','reload-final-auth'])test('verified secret survives '+stage+' deadline without reclassifying server success',async()=>{
 const h=screen(stage);await h.mount();const work=h.create();await pump();assert.equal(h.state[4],tenant+'.fixture-secret');const timer=h.timer();timer();const observed=structuredClone(h.state);h.resume();await work;
 assert.equal(observed[6],false);assert.equal(observed[7],false);assert.equal(observed[4],tenant+'.fixture-secret');assert.match(observed[5],/Convite criado/);assert.deepEqual(observed[0],errors);assert.deepEqual(h.state,observed);assert.equal(h.posts().length,1);assert.equal(h.refs[5].current.size,0);await h.refresh();assert.equal(h.state[4],tenant+'.fixture-secret');assert.equal(h.posts().length,1);h.blur();
});
for(const change of ['owner','company'])for(const stage of ['auth','json','secret-auth'])test(change+' change during '+stage+' cannot expose an invitation secret',async()=>{const h=screen(stage);await h.mount();const work=h.create();await pump();h[change]();h.resume();await work;assert.equal(h.state[4],'');assert.equal(h.posts().length,stage==='auth'?0:1);assert.equal(h.state[6],false);h.blur();});
for(const stage of ['json','reload-fetch'])test('blur/new focus retires '+stage+' completion and queued timer',async()=>{const h=screen(stage);await h.mount();const work=h.create();await pump();const timer=h.timer();await h.refocus();const observed=structuredClone(h.state);timer();h.resume();await work;assert.deepEqual(h.state,observed);assert.equal(h.state[4],'');assert.equal(h.posts().length,1);h.blur();});
test('unknown creation requires successful explicit reconciliation, not another click or focus',async()=>{const h=screen();await h.mount();h.outcome('unknown');await h.create();h.render();await h.create();assert.equal(h.posts().length,1);assert.equal(h.calls.length,3);assert.equal(h.state[7],true);await h.refocus();assert.equal(h.state[7],true);await h.create();assert.equal(h.posts().length,1);await h.refresh();assert.equal(h.state[7],false);h.outcome('confirmed');await h.create();assert.equal(h.posts().length,2);h.blur();});
test('explicit role rejection makes no secret, retry or automatic reload',async()=>{const h=screen();await h.mount();h.outcome('rejected');await h.create();assert.equal(h.state[7],false);assert.equal(h.state[4],'');assert.equal(h.posts().length,1);assert.equal(h.calls.length,3);h.blur();});
for(const action of ['create','accept','revoke'])for(const stale of ['timer','finally'])test('expired creation '+stale+' cannot unlock a new '+action+' in the same focus',async()=>{
 const h=screen('json');await h.mount();const old=h.create();await pump();const timer=h.timer();timer();await h.refresh();h.next();const wait=h.holdAuth(),next=h[action]();await pump();assert.equal(wait.started,true,'new action must actually reach its own authentication');assert.equal(h.state[6],true);assert.equal(h.refs[3].current,true);
 const observed=structuredClone(h.state);if(stale==='timer')timer();else{h.resume();await old;}assert.deepEqual(h.state,observed);assert.equal(h.refs[3].current,true);assert.equal(h.state[6],true);
 wait.resolve();await next;if(stale==='timer'){h.resume();await old;}assert.equal(h.state[6],false);assert.equal(h.refs[3].current,false);assert.equal(h.posts().length,2);h.blur();
});
