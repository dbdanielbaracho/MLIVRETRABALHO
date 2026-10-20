'use strict';
// Full internal authentication journey. Real disposable HTTP/PostgreSQL and actual mobile core.
// Storage is an explicit in-memory SessionAdapter, NOT native SecureStore or a physical device.
const fs=require('node:fs');
const {resolve}=require('node:path');
const {createRequire}=require('node:module');
const {randomUUID,createHash}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
const mobileRequire=createRequire(resolve('apps/mobile/package.json'));
const ts=mobileRequire('typescript');
const hashes={};
function mobile(name){
 const file=resolve('apps/mobile/lib/'+name+'.ts'),raw=fs.readFileSync(file,'utf8'),module={exports:{}};
 hashes[name]=createHash('sha1').update('blob '+Buffer.byteLength(raw)+'\0').update(raw).digest('hex');
 const compiled=ts.transpileModule(raw,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function('exports','require','module',compiled)(module.exports,mobileRequire,module);
 return module.exports;
}
const {signupAccount}=mobile('signup'),{signinAccount}=mobile('signin');
const {generateInvitation,acceptInvitation,revokeInvitation,loadManagement}=mobile('company-members');
const {createSessionQueue,persistVerifiedSession,persistExpectedTenant,clearExpectedSession}=mobile('session-transaction');
function check(value,label){if(!value)throw Error(label);}
let stage='configuration';
async function main(){
 const config=localConfiguration(process.env),{Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl,connectionTimeoutMillis:5000});
 await db.connect();
 try{
  const server=(await db.query('SELECT current_database() name,inet_server_addr()::text address')).rows[0];
  requireLocalDatabasePeer(server,db.connection.stream.remoteAddress);
  const stamp=randomUUID(),password='AuthJourney-'+randomUUID()+'!',tokens=new Set();let httpCalls=0;
  async function response(path,{method='GET',token,tenant,body}={}){
   check(path.startsWith('/v1/'),'local_route_required');httpCalls++;
   return fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(token?{authorization:'Bearer '+token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
  }
  async function call(path,options={},expected=200){
   const r=await response(path,options);if(r.status!==expected){const e=Error('unexpected_http_status');e.safeStatus=r.status;e.safeRoute=path;throw e;}return r.json();
  }
  const clientRequest=(path,body)=>response('/v1'+path,{method:'POST',body});
  async function signup(label,type){
   const email='auth-acceptance-'+label+'-'+stamp+'@example.test';
   const result=await signupAccount(clientRequest,{email:' '+email.toUpperCase()+' ',password,accountType:type,workspaceName:type==='company'?'Auth '+label:''});
   check(result.status==='created','real_signup_ack_required');return{email,id:result.id,tenant:result.tenantId};
  }
  async function signin(account){
   const result=await signinAccount(clientRequest,account.email,password);
   check(result.status==='ready','real_signin_ack_required');tokens.add(result.data.accessToken);return result.data;
  }
  stage='signup-and-validation';
  const a=await signup('company-a','company'),b=await signup('company-b','company'),p=await signup('professional','professional'),q=await signup('expiry-target','professional');
  check(a.tenant&&b.tenant&&a.tenant!==b.tenant&&!p.tenant&&!q.tenant,'signup_authority_binding');
  const duplicate=await signupAccount(clientRequest,{email:a.email,password,accountType:'company',workspaceName:'Duplicate fixture'});
  check(duplicate.status==='rejected'&&duplicate.emailInUse===true,'duplicate_rejection_required');
  const beforeInvalid=httpCalls,invalid=await signupAccount(clientRequest,{email:'bad',password:'short',accountType:'professional',workspaceName:''});
  check(invalid.status==='invalid'&&httpCalls===beforeInvalid,'invalid_client_must_not_post');
  const badPassword=await signinAccount(clientRequest,a.email,'explicit-wrong-password');
  check(badPassword.status==='rejected','wrong_password_must_reject');
  const sa=await signin(a),sb=await signin(b),sp=await signin(p),sq=await signin(q);
  check(sa.tenantId===a.tenant&&sb.tenantId===b.tenant&&sp.tenantId===null&&sq.tenantId===null,'signin_tenant_binding');
  const meA=await call('/v1/me',{token:sa.accessToken});
  check(meA.id===a.id&&meA.memberships.some(m=>m.tenant_id===a.tenant&&m.role==='owner'),'actual_owner_required');
  stage='verified-client-session-and-cross-tenant-denial';
  let state={token:null,tenantId:null};const adapter={read:async()=>({...state}),write:async next=>{state={...next};}},queue=createSessionQueue();
  check(await queue.run(()=>persistVerifiedSession(adapter,{token:sa.accessToken,tenantId:sa.tenantId},null,()=>true))==='saved','company_session_not_saved');
  await call('/v1/company/jobs',{token:state.token,tenant:state.tenantId});
  await call('/v1/company/jobs',{token:state.token,tenant:b.tenant},401);
  check(await queue.run(()=>persistVerifiedSession(adapter,{token:sp.accessToken,tenantId:sp.tenantId},sa.accessToken,()=>true))==='saved','professional_session_not_saved');
  stage='email-bound-invites-and-two-company-context';
  const memberRequest=(session,tenant)=>(path,body,method)=>response('/v1'+path,{method:method||'POST',token:session.accessToken,tenant,body});
  async function invite(owner,session,target){
   const result=await generateInvitation(memberRequest(session,owner.tenant),owner.tenant,target.email,'manager');
   check(result.status==='created','client_invitation_generation_ack');
   const management=await loadManagement((path)=>response('/v1'+path,{token:session.accessToken,tenant:owner.tenant}));
   check(management.members.status==='ready'&&management.invitations.status==='ready','client_management_real_lists');
   const row=management.invitations.data.find(x=>x.email===target.email&&!x.acceptedAt&&!x.revokedAt);
   check(row&&row.role==='manager','client_invitation_list_binding');return{invitationId:row.id,inviteCode:result.inviteCode};
  }
  const accept=(session,code)=>acceptInvitation(memberRequest(session,undefined),code);
  const ia=await invite(a,sa,p);
  await call('/v1/company/members/invitations/accept',{method:'POST',token:sb.accessToken,body:{inviteCode:ia.inviteCode}},403);
  const acceptA=await accept(sp,ia.inviteCode);
  check(acceptA.status==='accepted'&&acceptA.tenantId===a.tenant&&acceptA.role==='manager','invite_a_binding');
  await call('/v1/company/members/invitations/accept',{method:'POST',token:sp.accessToken,body:{inviteCode:ia.inviteCode}},400);
  const ib=await invite(b,sb,p),acceptB=await accept(sp,ib.inviteCode);
  check(acceptB.status==='accepted'&&acceptB.tenantId===b.tenant&&acceptB.role==='manager','invite_b_binding');
  const startsAt=new Date(Date.now()+86400000).toISOString(),endsAt=new Date(Date.now()+90000000).toISOString(),jobs=[];
  for(const [company,session]of [[a,sa],[b,sb]])jobs.push(await call('/v1/company/jobs',{method:'POST',token:session.accessToken,tenant:company.tenant,body:{title:'Auth context '+company.tenant,requiredRole:'Bartender',workCity:'Auth fixture',startsAt,endsAt,payCents:10000}},201));
  check(await queue.run(()=>persistExpectedTenant(adapter,a.tenant,{token:sp.accessToken,tenantId:null},()=>true))==='saved','context_a_not_saved');
  let rows=await call('/v1/company/jobs',{token:state.token,tenant:state.tenantId});check(rows.some(x=>x.id===jobs[0].id)&&!rows.some(x=>x.id===jobs[1].id),'context_a_leak');
  const oldContext={...state};
  check(await queue.run(()=>persistExpectedTenant(adapter,b.tenant,oldContext,()=>true))==='saved','context_b_not_saved');
  rows=await call('/v1/company/jobs',{token:state.token,tenant:state.tenantId});check(rows.some(x=>x.id===jobs[1].id)&&!rows.some(x=>x.id===jobs[0].id),'context_b_leak');
  check(await queue.run(()=>persistExpectedTenant(adapter,a.tenant,oldContext,()=>true))==='stale'&&state.tenantId===b.tenant,'stale_context_replaced_new');
  stage='actual-expiry-and-renewal';
  const revokedInvite=await invite(a,sa,q);
  check(await revokeInvitation(memberRequest(sa,a.tenant),revokedInvite.invitationId),'client_invitation_revoke_ack');
  await call('/v1/company/members/invitations/accept',{method:'POST',token:sq.accessToken,body:{inviteCode:revokedInvite.inviteCode}},400);
  check((await accept(sq,revokedInvite.inviteCode)).status==='error','client_revoked_invitation_not_rejected');
  const expiredInvite=await invite(a,sa,q);
  check((await db.query("UPDATE company_member_invitations SET created_at=now()-interval '2 days',expires_at=now()-interval '1 day' WHERE id=$1 AND tenant_id=$2 AND invited_by_identity_id=$3 AND email=$4 AND accepted_at IS NULL AND revoked_at IS NULL",[expiredInvite.invitationId,a.tenant,a.id,q.email])).rowCount===1,'owned_invitation_expiry_binding');
  await call('/v1/company/members/invitations/accept',{method:'POST',token:sq.accessToken,body:{inviteCode:expiredInvite.inviteCode}},400);
  check((await accept(sq,expiredInvite.inviteCode)).status==='error','client_expired_invitation_not_rejected');
  check((await db.query('SELECT count(*)::int n FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2',[a.tenant,q.id])).rows[0].n===0,'expired_invite_created_membership');
  const renewed=await invite(a,sa,q);check(renewed.invitationId!==expiredInvite.invitationId,'renewal_id_must_change');
  const acceptedQ=await accept(sq,renewed.inviteCode);
  check(acceptedQ.status==='accepted'&&acceptedQ.tenantId===a.tenant,'renewed_invitation_not_accepted');
  stage='new-login-versus-stale-clear';
  const second=await signin(p),previous={...state};
  check([a.tenant,b.tenant].includes(second.tenantId),'second_signin_membership_missing');
  check(await queue.run(()=>persistVerifiedSession(adapter,{token:second.accessToken,tenantId:second.tenantId},previous.token,()=>true))==='saved','second_session_not_saved');
  await call('/v1/auth/signout',{method:'POST',token:sp.accessToken,body:{}},201);tokens.delete(sp.accessToken);
  await call('/v1/me',{token:sp.accessToken},401);
  check(await queue.run(()=>clearExpectedSession(adapter,sp.accessToken))==='stale'&&state.token===second.accessToken,'old_logout_erased_new_session');
  await call('/v1/me',{token:state.token});
  const expiredSession=await signin(p),hash=createHash('sha256').update(expiredSession.accessToken).digest('hex');
  check((await db.query("UPDATE sessions SET created_at=now()-interval '2 days',expires_at=now()-interval '1 day' WHERE token_hash=$1 AND identity_id=$2",[hash,p.id])).rowCount===1,'owned_session_expiry_binding');
  await call('/v1/me',{token:expiredSession.accessToken},401);tokens.delete(expiredSession.accessToken);
  await call('/v1/me',{token:second.accessToken});
  stage='remote-revocation-and-verified-client-clear';
  const ack=await call('/v1/auth/signout',{method:'POST',token:second.accessToken,body:{}},201);check(ack.ok===true,'remote_signout_ack_required');tokens.delete(second.accessToken);
  await call('/v1/me',{token:second.accessToken},401);
  check(await queue.run(()=>clearExpectedSession(adapter,second.accessToken))==='cleared'&&state.token===null&&state.tenantId===null,'verified_clear_required');
  await call('/v1/me',{},401);
  for(const token of tokens)await call('/v1/auth/signout',{method:'POST',token,body:{}},201);
  console.log('AUTHENTICATION_ACCEPTANCE_JOURNEY_PASS '+JSON.stringify({signupCompanyAndProfessional:true,normalizedAndDuplicateEmail:true,invalidClientNoPOST:true,wrongPasswordRejected:true,actualOwnerAndMemberships:true,crossTenantDenied:true,twoCompanyClientContext:true,emailBoundSingleUseInvites:true,revokedInviteRejectedByClientAndAPI:true,expiredInviteRejectedAndRenewed:true,expiredSessionRejected:true,oldLogoutCannotClearNewLogin:true,remoteRevocation401:true,verifiedClientClear:true,mobileCoreBlobs:hashes,realHTTPPostgres:true,storage:'explicit in-memory adapter; NOT native SecureStore',physicalDevice:false,production:false}));
 }finally{await db.end();}
}
main().catch(error=>{console.error('AUTHENTICATION_ACCEPTANCE_JOURNEY_FAIL '+JSON.stringify({stage,status:Number.isInteger(error.safeStatus)?error.safeStatus:null,route:typeof error.safeRoute==='string'?error.safeRoute:null,kind:typeof error.code==='string'&&/^[A-Z0-9]{5}$/.test(error.code)?error.code:'assertion-or-transport'}));process.exitCode=1;});
