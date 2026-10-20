# Jornada completa de cadastro/autenticação — pacote de aceite interno #571



## Pacote de aceite interno por jornada — cadastro/autenticação — 2026-10-20T18:00Z

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Prioridade expressa do usuário em20/10: reduzir áreas pendentes por prova de jornadas completas, não acumular microcorreções/PRs. Delegação “voce da o aceite eu nao” permanece válida; não se aguarda aprovação humana. Este apêndice NÃO antecipa aceite.

Reconciliação: #596 já integrado uma única vez em MAIN0fc45026d217db4ff9ac1c229fb4db52045424e5/tree7ef3d403383f51c1ba09a0a3cbee9ae4f6783c8d após CI39443161901SUCCESS1783. POST39468684723a1/job118786705960FAILbrowser, checkout literal0fc17:44:48.3572196Z,1783unitPASS/typebuildexportmigrationprivacyPASS;8minimalPASS,2journeyFAIL,canônico recuperaçãoFAIL17:48:25.8128404Z/MATRIX1/laterProductionTruthNÃOexecuted. Canônico47GET200+1controlled503 precedem12GETERR_ABORTED/canceledtrue/corsnull. ZEROretry, NÃO rerun0fc para verde. Paridade de recursos596 não prova reparo/causa do transporte.

Entrega integrada no PR EXISTENTE#571, não novaPR: incorporar MAIN normal, pais[85e9c992b6e7a1568b8ea865e43da63477c5f3a0,0fc45026d217db4ff9ac1c229fb4db52045424e5], semforce. Preservar BYTEEXATOS13testes invitation-atomicity718463b713f57492d7d0fd78b91b0a5856a0648b e script3f7107855c1e60de59e3c3fbf53b2e780f889c07. Todos seus apêndices/notas/imagens já existem em MAIN com mesmosblobs; não duplicar. NOVO scripts/authentication-acceptance-e2e.cjs usa signup/signin/company-members/session-transaction REAIS do cliente contra HTTP+PostgreSQL descartáveis:2empresas+2profissionais/cadastro normalizado+duplicado/invalidsemPOST/senhaerrada/owner+memberships/cross-tenant401/conviteemailbinding+singleuse/gerar+listar+aceitar+revogarporhelpercliente/expiração+renovação/2tenantscomvagasisoladas/contextoantigonãoreverte/novologinvslogoutantigo/sessãoexpirada/revogaçãoremota401+limpezaverificada. SessionAdapter INMEMORY explícito, NÃO SecureStore nativo/aparelho/renderRN. ClockfixturealteraSÓtimestamps deconvite e sessão comid/tenant/ator/emailouhash vinculados aos fixturesHTTP, semgrant/policy/produção. Script não loga credenciais/códigos/tokens/headers/corpos, não reenvia negócio automaticamente.

Invocação obrigatória adicionada em scripts/http-journey-e2e.sh atual, ANTES do navegador, preservando integralmente todos os asserts/gates originais. Mantém13guards e3falhasSQLtardias reais571 para renovação/aceitação/promoção. Fixtures antigas têm SECURITYDEFINER localowned/search_pathfixo/EXECUTEPUBLICrevogado com snapshotsRLS/ACL ecleanup; não concedeprivilegios nem altera produto/policies. NOVAjornada não criaDDL/hooks/grants. API/controladores/migrações/React19.1.4RN0.81.6/lock/native/workflows/browserflags/CDPFetchguard/CORS/sandbox/LNA/deadlines/assertions inalterados.

Critério2 da matriz: signup/convite/expiração/revogação/troca de tenant por API e cliente, sem inferir permissão. Crosswalk completo e scripts complementares rate-limit/cap/deactivation/convitesconcurrentes/WebDOM em [AUTHENTICATION_ACCEPTANCE_JOURNEY_2026-10-20.md](../evidencias/AUTHENTICATION_ACCEPTANCE_JOURNEY_2026-10-20.md). Resultado desta preparação: somente inspeção decontratos+syntaxpreflightJS; ambiente local indisponível, NENHUM teste funcionalLOCAL alegado. Novo CI próprio COMPLETO, markers reais da jornada+3rollback, revisãofreshdiff ePOST literal completos são OBRIGATÓRIOS e PENDENTES.1796=[212Web1069mobile501API3CLI11monitor] é SÓ contagem esperada, NÃO execução. APK N/A por identidade integral dos insumosnative/mobile/depslock/workflows/buildsmoke+filtro, não por APKemprestado/ausênciaderun.

Estado de aceite: área2 PENDENTE até evidência completa incluindoCI/pós-gates; só10AndroidstandaloneTÉCNICOINTERNO aceito,12pendentes,não%decódigo. Financeira6 tem lacunas INTERNAS específicas splitteórico/saldonegativo alémdePSPexterno; não ocultar sobdependênciaexterna. Externos215/219/220/224/228 separados. Próximo: observar novoSHA571, executar a jornada real, corrigir somente causacomprovada; integrar sófullownSUCCESS e depois validarPOST real, semrerunproduto para verde/semnovoPR/semcommitsartificiais/semActivitymanual.


## Critérios e provas obrigatórias

| Critério da área2 | Implementação real | Prova integrada exigida neste SHA |
|---|---|---|
| Signup empresa/profissional, normalização, duplicata, validação | AuthController/signup800fa; identidade+owner+tenant transacionais | Novo marker AUTHENTICATION_ACCEPTANCE_JOURNEY_PASS; helpers reais+HTTP/PG, nenhuma autoridade inferida |
| Login identidade, senha, sessão e autorização | AuthController c432/AuthService ab715/signin453de | Credenciais reais, senhaerrada,relaçãoowner/me,token+tenant,401forgedtenant; rate-limitHTTPcap10 complementar |
| Convites criar/listar/aceitar/revogar | CompanyMembers b63/company-members55d | Novo helpercliente→HTTP→PG,code vinculadoaoemail,consumido400,revogado400,roleACKexato |
| Convite expirado/renovação | SQL expires_at>now(),created/expiryCHECK,memberships | Clockfixturepróprio,400+nãomembership,novoid+aceitação;3latewritefaultsdo571 comprovamrollback completo |
| Troca entre duas empresas | AuthService memberships+companyjobcontext+session-transactiond10 | Pcom2managerack;empresaA/Bpublicamvagas;clienteA/Blistaisolada;contextoobsoletonãoreverte |
| Sessão expirada | AuthService sessões hash+expiry/deactivation | Clockfixture próprio hash+identity,401real eoutrasessão200 |
| Logout/revogação/concorrência comnovologin | AuthController signout+clearExpectedSession/persistVerifiedSession | Remoto201ok→401;logoutP1nãolimpaP2;clearP2readbacknull;uninformedcaller401 |
| Cliente real e autorização no servidor | Helpers mobile inalterados carregados viaTypeScriptworkspace;WebDOMgates originais | Marker incluiGitblobs;adaptadorstorageEXPLÍCITOinmemory. Browser8+matrix12+ProductionTruth continuamobrigatórios; NÃO OS/physical/SecureStore |

Complementos já obrigatórios no CI original: scripts/http-company-onboarding-e2e.sh;http-company-members-e2e.sh;http-company-invitation-concurrency-e2e.sh;auth-db-invariants-e2e.sh;http-auth-rate-limit-e2e.sh;http-account-deactivation-e2e.sh;web-browser-journey-e2e.sh. PASS anterior de outro SHA não é transferido: todos devem executar novamente viaCI completo, incluindo12matrix/DOM8/ProductionTruth. Não há timeout/segurança/assertion relaxation.

## Manifesto de preservação integral

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "old571": "ba614481015ada22d0845267042597a5af066ad0",
    "oldChars": 646592,
    "main0fc": "80a0f1df564af95db6c26943bb0bc231436f38bc",
    "mainChars": 3510396,
    "commonChars": 606903,
    "mainTailChars": 2903493,
    "fullReconstructionExact": true,
    "oldFullPrefixExact": true
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "old571": "7f1909342710b53d052fe6533ddca897e152d7d0",
    "oldChars": 979162,
    "main0fc": "1a73c1cf503a2eef270497aadfac25cbb96eed97",
    "mainChars": 3844041,
    "commonChars": 939473,
    "mainTailChars": 2904568,
    "fullReconstructionExact": true,
    "oldFullPrefixExact": true
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "old571": "602126f597f778338792f2b0ea728394e6704764",
    "oldChars": 636844,
    "main0fc": "aa335e34f708dc2eeb1537be23757808154e8909",
    "mainChars": 3500538,
    "commonChars": 597155,
    "mainTailChars": 2903383,
    "fullReconstructionExact": true,
    "oldFullPrefixExact": true
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "old571": "a04fc9d701ac17618dfb295ad7f10f61e14f42d3",
    "oldChars": 631649,
    "main0fc": "bb8d8a4d9d4acca4f8d2675c9429d9669db85203",
    "mainChars": 3495420,
    "commonChars": 591960,
    "mainTailChars": 2903460,
    "fullReconstructionExact": true,
    "oldFullPrefixExact": true
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "old571": "d599eaad32d12c2159f768cfe6b550dd1d8fbb14",
    "oldChars": 632775,
    "main0fc": "fd886cea5de90559103a2e76ef716b886fbc85a6",
    "mainChars": 3496359,
    "commonChars": 593086,
    "mainTailChars": 2903273,
    "fullReconstructionExact": true,
    "oldFullPrefixExact": true
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "old571": "029cc92523568cc6f0dd7c682dbafce1bdcdf4fb",
    "oldChars": 229440,
    "main0fc": "a05f9909b4649fb70e32ca63fc6e451dcfd60f04",
    "mainChars": 3093244,
    "commonChars": 189751,
    "mainTailChars": 2903493,
    "fullReconstructionExact": true,
    "oldFullPrefixExact": true
  }
]
```

## Novo script integral (fonte reproduzível, execução PENDENTE)

```js
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

```

## FINAL596 integral — histórico primário preservado

## #596 integrado — 2026-10-20
MAIN0fc45026d217db4ff9ac1c229fb4db52045424e5/tree7ef3d403383f51c1ba09a0a3cbee9ae4f6783c8d/parents[4e5c9dfde1cd1c7abcfc8a9622702fe3e51d888e,f200bee42695ae9638a34e7151177c77157836b2]. READYONCE/MERGEexpectedHEADf200ONCE apósfreshmain/base/head/checkfoundationSUCCESS/FULL9pathsSHA100644review/6FULLnormprefixpreservados/1283blobsiguaisfora8modified/ALL164mobile+native/depslock/workflowsbuildsmokeiguais eAPKN/Aintegral. NenhumAPKnovo/emprestado.
OWNCI39443161901/job118698040665/a1SUCCESS1783=[212Web1069mobile488API3CLI11monitor]0fail-skip-cancel/typebuildexportAndroidmigrationprivacyHTTPPG12matrix+canonical/ProductionTruthPASS14:56:36.0694922Z. Actualcheckout2046b2b26c992e9673b8fd8fef65a82ce095c5ab14:52:37.0307755ZSINTÉTICO[4e5c,f200]/tree7efigualcandidateGitconfirmed,NÃOliteralHEADf200. Matrix12PASS14:55:17.7409050Z..14:55:37.4695921Z/canonicalPASS14:55:39.7208056Z/MATRIX0 14:55:39.7208401Z. Preservadoscontrols/deadlines/security; nãoRCAdeERR_ABORTED/startupglobalresolvido. Pós-mergeCIrealPENDENTE, nãoemprestarownGREEN.
Prioridadeusuário20/10alterada: medirfechamentoáreasejornadascompletas, nãocontarmicroPRscomoprogresso. Próximaavaliaçãoárea6ganhos/ledger+PR584/573existentes,semnovoPRmicro/NÃOaceiteantecipado. Decisãotécnicainternaassistenteconformedelegação, semesperahumana. TerminaisPENDINGabaixoHISTÓRIApreservada;consolidarnopróximopacotefuncional/aceitelegítimo,nãostatuscommit.


## Histórico integral preservado

# Paridade de recursos do probe Chrome — gates novos pendentes

HEAD`f200bee42695ae9638a34e7151177c77157836b2`/tree`7ef3d403383f51c1ba09a0a3cbee9ae4f6783c8d`/parentúnicoMAIN`4e5c9dfde1cd1c7abcfc8a9622702fe3e51d888e`. ALL9pathsSHA/mode100644review,9FULLUTF8remotecreate/readbackEXACT. 1283existingblobs+modesinalteradosfora8modified/510non-docsfora2alvosiguais/ALL164mobileblobsiguais. APK N/A INTEGRALporinsumos/workflowfilter/canonicalentrypointinalterados,semAPKnovoemprestado. CI1783SÓESPERADO,ownfullCIaindapendente; semready/mergeatéALLSUCCESS+freshdiff/HEADbase+POSTreal.

## APÊNDICE — Paridade de recursos na inicialização do probe Chrome — 2026-10-20
Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base MAIN4e5c9dfde1cd1c7abcfc8a9622702fe3e51d888e/tree4ee38daf72224e5d9ec7fac9caa651c09c95e294. CI MAIN39430100713/job118652598268a1FULLSUCCESS1777/typebuildexportAndroidmigrationprivacyHTTPPG12matrix+canonicalProductionTruth13:28:52.8664252Z; não emprestar essePASS ao novoHEAD. PR595 permaneceDRAFTd4a9/ownCI39430871015a1FAILSTARTUP(1786unitPASS)/ownAPK39430870833a1SUCCESS; nenhumrerun/ready/merge repetido.
Requisito/controlereproduzido: comparação probe↔canônico deve manter política de recursos de lançamento equivalente, sem enfraquecer segurança/readiness. No próprio595, primeirocasominimal/baseline/concurrent falhou13:33:01.1663008Z/15000ms/elapsed15001/spawntrue/exitObservedfalse/stderr0/stdout0/semendpoint/portfile antesCDP/Page; outros11matrix+canônicoPASS eMATRIX1preservouFAIL. NenhumGET/ERR_ABORTED atribuído ao caso que não abriuCDP. MAIN4e5c passousemessasflagsnoprobeeoutros11também; portantoNÃOprova de causa/fix do startup, D-Bus, versão, CORS, API ou vendor.
Entrega SÓscripts/web-browser-transport-probe.cjs: acrescentar --disable-dev-shm-usage e --disable-gpu após --disable-component-update; já canônicos desdePR592. Delta42chars30816→30858; removerúnicaadição reconstróiFULLdd4e145cce98e40e18b23be256bc86fcd00389b4BYTEEXATO. Candidatee77474dff0e3a33336c0440450447ed4d03de60b. Canonical0abdd11f9e91c9d4b3e9b4ca1febb67243d5f698+helperstartup2871charsBYTEidêntico+shell2bc65cb412013add901893966832b228e150a14b permanecemFULLBYTEEXATOS. NÃO novohelper/probe/matriz/tentativaparaverde.
6NEWcanônicos noEXISTENTE apps/web/app/browser-startup-diagnostic.test.ts60067e59cde14ceb0b12b16bf152e98fd07c86d1/9183chars: doisassertsdeactualspawnVM(fullargv/options/paridade/helperBYTE/exatamente1resourceflag/loopback/semnandboxbypass) e quatrocenáriosdehelperREALprobe(no-outputtimeout15s,stderrfragmentado,stdoutportfilediagnostic-only/redaçãoPII,spawnerror/earlyexitcleanup). Harnessjáexistente recebeoptionalwaitForEndpointdefaultwait; quatrooldbodies/asserts íntegros9b1a36dd36260502fee8feb9bf698b36f01fb2c1/4338chars viareverse2fixturechanges+removeappend. Baseline10=8PASS2FAILConfigParityGap(não reprodução de falhaChrome)→10GREEN. FULL212WebLOCALUTC/SPPASS[206MAIN+6]0fail-skip-cancelNode24.19.0/19canonicaltestpaths/41FULLsourceSHAsexatosantes/depois. Todas35WebblobsforaúnicotestBYTEexatos; fontesoriginaisGitsemnormalização. Fixtures explícitaschildstreamsclock/VM,nãoChromeREAL/CDPnetwork/browserstartupRCA/render/SecureStore/native/HTTPPGproof. Nenhum tsc/Nest/depsLOCALPASS alegado; CI completo obrigatório.
Preservados15s/endpointstderrvalidado/diagnósticosredigidos/noautorRetry/FetchguardCDP/CORS/sandboxLNA/networkallowlist/12casosmatrix(8minimal+4journey)+canônicoobrigatório/STICKYFAILED/controlled503+humanrecovery/asserts/sessãoauth/revogaçãoremota. Não serializar global/descartarFAILED/aceitar stdout ouportfilecomo readiness. React19.1.4/RN0.81.6/API SQLRLSACL/mobile/depslock/workflows/buildsmoke invariantes. Nova branch offMAIN, nenhum produto/teste de595/584/ououtrodraft copiado. Fresh10PRfiles+635branchessemalvoconflitante.
APK N/A INTEGRALporidentidade de TODOSinsumos mobile/native/rootdepslock/workflows/buildsmoke/canonicalExpo mobile→Gradleentrypoint5f4f95c64a8c43f9744b1bfd5fbb9ec1180a2f42+Standalonepathfilter(arquivo/probeWebtest/docsfora). NãoAPKnovo/emprestado/Gradleprebuild/installsmokealegado nesteSHA. ÚltimoMAINstandaloneMEDIDOliteral94aPOST58539427472933a1SUCCESS; current4e5cdocs-onlynãoAPKliteral4e5c. APK595synthb1cbnãoMAIN.
CI novoHEADPENDENTE na preparação;1783=[212Web1069mobile488API3CLI11monitor]SÓESPERADO,nãoexecutado, NÃO1786incluindo9mobile595unmerged. OwnfullCIALLSUCCESS+freshMAIN/base/head/ALLpaths/modes/foundationSUCCESS+APKN/Aaindaválida antesreadyONCE/mergeexpectedSHAONCE;POSTCIrealobrigatório. SeCIred registrarprimáriaeavançarfrenteindependente;NÃOrerunSAMESHAparaverde. Novoresultado não resolve root558 por si só.
Preservação: seisFULLoriginaisMAINprefixINPLACEappend (memória5239b0ceincluiFULLconversa20outubro); newnotecontémFULLFINAL59526945+testcanônico/runner/manifests. Nenhumcommitstatus/selfref/image/Activity; terminais emmetadataepróximaFUNCIONAL. MAINoriginais não são resumo da automação. DelegaçãoaceiteusuáriojáFULL6norms,nãoesperarhumano/CONTINUAR. Sóárea10AndroidstandaloneTÉCNICAINTERNOaceita12pending/não%code;paridadedecontrole8/13maispróxima,nãoaceiteintegralnovo.
Recibo595 consolidado SEMproduto595nesta branch: HEADd4a9/treed0c9/parent4e5c/DRAFTNOTMERGED;ownCI39430871015/job118655296774a1FAILstartup13:33:01.1663008Z/1786unitPASS/11matrix+canonicalPASS/MATRIX1 13:33:42.3979377Z/laterProductionTruthNOTexecuted/ZEROretry. Actualcheckoutb1cb2da6f6c00bee27b63f1b883042b77be36589SINTÉTICO[4e5c,d4a9]/treed0c9. OwnAPK39430870833/job118655297360a1SUCCESSactualb1cb/build13:40:05.3715213Z/install13:41:34.6077155Z/smoke13:41:47.0289750ZsemMetro. Artifact12267714582expiresNov3T13:41:48ZREALZIP28913566SHA256d7594024d4b94b1fc1c2cbee1a4eae9efc6b9739896a3489066b27a52d6004b9=APIhashsize/APK66162576SHA2563410561c3ae891b3567447d61ae2bbcdcd75ef07d1c56c652aaa0fb7f3738ddb=SUMS/BUILDINFOb1cbmetrofalse;FULLFINALmetadata26945archived. NãoemprestarAPK ao controlebrowser/não merge595red.
ÚltimoMAINstandaloneMEDIDO94aPOST585APK39427472933a1SUCCESS/DEVICE_SMOKE13:18:27.0818603Z/REALZIP28913550SHA256bc5081d6013f44f33016c4f87c88d4c12fed7b2c5fffb97c0650aaf43c46a8ce/APK66162560SHA182e1cfa1d1dfa5c7b6272ff884220986ffd92cd37719dcc4d4627d28679804c/BUILDINFOliteral94ametrofalse. ZIP≠APK/installlaunch≠forms/RNrender/SecureStore/physical/VisualTruth/prod. POSTCI94a39427473097FAILstartup, nunca declararPOST94aGREEN;MAIN4e5cCI realGREEN emoutroSHAlegítimodocumentalcomcódigomesmo.
Externos215219220224228OPEN/569CLOSEDcompletedfreshsemActivitymanualwrites. SemproduçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/rootgrantsRLSdisable. Únicarotinaexistenteenabled/scheduleinalterados/nenhumanovaautomação. Próximo: ownCI exactcheckoutGitparents/tree+browsermatrix/logs; somenteallgatesfreshmergeonce+POSTreais. Se bloqueado, avançar requisito funcional independente existente sem encalhar microtestes/status.


FULLFINAL59526945+FULLtest/runner/manifests preservados na nota `docs/evidencias/CHROME_PROBE_RESOURCE_PARITY_2026-10-20.md` (49298chars/blobba67a4f0072e50cf60b96fdbe5ce6a07edf98cef). Pré-publicação: primeira leitura da memória foi REJEITADA por readback mismatch; duas leiturasFULL posteriores do mesmo blob1a73c1cf503a2eef270497aadfac25cbb96eed97 iguais ao candidato, só essas atribuídas. Nenhuma branch/commit publicado antes de todos9readbacks confirmados; não inferir causa do erro de leitura. Somente teste/configuração, nãoRCAdeChrome.

## Oráculos adversariais LOCAL — não alterações publicadas
ActualFULLtest60067/probee774/canonical0abdd, Node24.19.0. Semmutante10PASS; removerapenasGPU8PASS2FAIL; acrescentar--no-sandbox8PASS2FAIL; trocarSÓtimerstartup15000→30000nocallbackprobe5PASS5FAIL. São mutantes LOCALonlyinmemory rejeitados, não proposta de bypass/timeout/não parte6novos/212Web/1783CI/nãoRCAChromereal. FULL41sources da candidata mantidos exatos no disco, nenhum runtime/CIpatch adicional. Reprodução abaixo lê diretamente os três arquivos reais; originais são os blobs desseHEAD, sem depender de arquivo temporário.
```js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),{EventEmitter}=require('node:events'),{stripTypeScriptTypes}=require('node:module'),{spawnSync}=require('node:child_process'),{pathToFileURL}=require('node:url');const raw={probe:fs.readFileSync(__dirname+'/scripts/web-browser-transport-probe.cjs','utf8'),canonical:fs.readFileSync(__dirname+'/scripts/web-browser-journey-e2e.cjs','utf8'),test:fs.readFileSync(__dirname+'/apps/web/app/browser-startup-diagnostic.test.ts','utf8')};if(process.env.LAUNCH_MUTANT_WORKER==='1'){
 let probe=raw.probe;const mode=process.env.LAUNCH_MUTANT;
 if(mode==='drop-gpu')probe=probe.replace("'--disable-gpu',",'');if(mode==='sandbox')probe=probe.replace("'--headless=new',","'--headless=new','--no-sandbox',");if(mode==='deadline')probe=probe.replace("clock.setTimeout(()=>fail('Browser startup timeout'),15000)","clock.setTimeout(()=>fail('Browser startup timeout'),30000)");
 const fixtureFs={readFileSync(url,encoding){return String(url).endsWith('/web-browser-transport-probe.cjs')?probe:fs.readFileSync(url,encoding)}};
 const source=raw.test.replace(/^import .*;\n/gm,'').replaceAll('import.meta.url',JSON.stringify(pathToFileURL(__dirname+'/apps/web/app/browser-startup-diagnostic.test.ts').href));
 new Function('test','assert','fs','vm','EventEmitter','URL','Buffer',stripTypeScriptTypes(source,{mode:'transform'}))(require('node:test'),assert,fixtureFs,vm,EventEmitter,URL,Buffer);
}else for(const mode of ['none','drop-gpu','sandbox','deadline']){const r=spawnSync(process.execPath,['--test','--test-reporter=tap',__filename],{env:{...process.env,LAUNCH_MUTANT_WORKER:'1',LAUNCH_MUTANT:mode},encoding:'utf8',maxBuffer:8e6});const n=k=>Number(new RegExp('^# '+k+' (\\d+)$','m').exec(r.stdout)?.[1]);console.log(JSON.stringify({mode,pass:n('pass'),fail:n('fail'),skip:n('skipped'),cancel:n('cancelled'),exit:r.status}));if((mode==='none'&&r.status)||(mode!=='none'&&(!r.status||!n('fail')))||n('skipped')||n('cancelled')){console.log(r.stdout+r.stderr);throw Error('mutant result unexpected');}}

```


## Final post-merge receipt — 2026-10-20T17:58Z
PR #596 is merged once as literal main 0fc45026d217db4ff9ac1c229fb4db52045424e5, tree 7ef3d403383f51c1ba09a0a3cbee9ae4f6783c8d. Own full CI 39443161901 SUCCESS (1783 units) authorized merge; post-merge CI 39468684723/job118786705960 attempt 1 is FAILURE, ZERO retries. Actual literal checkout 17:44:48.3572196Z. All 1783 units/type/build/export/migration/privacy passed. All 8 minimal matrix cases passed; journey baseline and native-only failed; log-only and instrumented passed. Canonical failed explicit recovery 17:48:25.8128404Z: 47 GET 200 + one controlled 503 preceded 12 GET ERR_ABORTED/canceled=true/corsError=null. MATRIX=1 17:48:25.9766109Z; later Production Truth NOT executed. Chrome 155.0.8059.39/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34. No startup failure in this run. Probe resource parity is not proof of transport root cause or repair. Do not rerun this SHA for green. APK N/A by unchanged native inputs, not an APK build. No whole area newly accepted.
Next package: reuse existing #571 for integrated signup/invitation/expiry/two-tenant/session revocation proof with actual mobile core and real disposable HTTP/PostgreSQL. In-memory SessionAdapter is explicit, not native SecureStore/physical evidence. Acceptance remains pending full requirements and own/post CI. User delegation preserved; no human acceptance wait.


## FULL571 original PR body — histórico, não status corrente

# FINAL factual — promoção preparada, infraestrutura impediu prova PostgreSQL — 2026-10-18 UTC

PR571 DRAFT/NOTMERGED. HEAD `85e9c992b6e7a1568b8ea865e43da63477c5f3a0`, tree `ca88187efb97fbf1f9312ec6494b136a88e57b43`, parent `007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb`, branch test/invitation-insert-rollback-20261017. MAIN/base `3e098cd51cd2fd84f21e144a600a814a2cb1a150`, tree66f89c3ef2902dad6d1d59e0210be7229c3a857c/pais[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. Ahead3behind0/mergebase3e. Nenhumready/merge/pós571/rerun/cancel/PRduplicado.

## CI próprio: não executou produto

[Run39091663600](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39091663600)/[job117569533700](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39091663600/job/117569533700), attempt1 COMPLETEFAILURE, **ZEROretry**.
Pull public.ecr.aws/docker/library/postgres:17 → `toomanyrequests: Data limit exceeded` primários02:53:19.2135623Z/02:53:25.8915359Z/02:53:29.4210800Z; Dockerpullfailed02:53:29.4290824Z. São3tentativas internas doDocker, NÃO rerun doagente.
InitializecontainersFAIL; Checkout/Node/install/typecheck/build/mobileexport/tests/migrations/privacy/HTTPPG/browser/ProductionTruth **TODOSSKIPPED**.
**NenhumcheckoutACTUAL foi observado**; não atribuir execução a HEADliteral ou syntheticmergeref. NenhumChrome/DOM/PNG/HTTPPG/INVITATION_*PASS novo observado nesteHEAD. **1368=[145Web,765mobile,444API,3CLI,11monitor] SÓESPERADO**, nãoCIcount/PASS. Os dois markersPROMOTION e também os casos antigos NÃOexecutados neste run.
Não retry desteSHA: quota primária já persistia em573, embora575tenha iniciado semmudança; semworkflow/registro/credencial/serviço/custo/bypass para verde. Browserroot antigo não foi observado aqui. Não emprestar007/575/567PASS/frames.

## Entrega real / teste local

CJSexisting571 ganhou caso de promoção EXISTENTEmanager→owner APÓS todosoldcalls/asserts/markers. Targetmanager estabelecido porHTTP na faseanterior; ownerAemite conviteownerporHTTP. UUIDscopephasepromote/priorRoleEXATOmanager/namespaceinv_promote. Binding antesDDL liga convite/id/tenant/ator/email/roleowner/hash/ativo eUMA membershipmanager/subject/identitytenant exatos. HookownedAFTERUPDATEaccepted_at precisa verUMowner+UMconviteaceito na transação antessequence1eHTTP500; snapshotsCOMPLETOS2tabelas2tenants+ACLpoliciesRLSdevemrestaurarmanager/conviteativo. Cleanup eUMAaçãoexplícitaMESMOcódigo201→SÓrole+acceptedpair/semnovamembership;replay400semnovadelta/oldrowsBintactos/hookausente. Tudo isso é PROVAEXIGIDA, ainda **NÃOEXECUTADA em PG**.

4guardmodelsnovos reais(scope/binding/SQLboundedwitness/cleanupnames+flags),9oldbodiesbyteexatos excetoimport→**13PASSlocal/zeroFAILSKIPCANCEL**, NativeTSstrip+Function; node--checkPASS eCLI CI=0 recusouantespgHTTP. NãoProdutoREDinventado, nãoSQLproof. Controller/DatabaseService/prodSQL/auth/roles/migrações/grants/policies intactos. ExistingUPDATEgrantmigrations0001/0004/0039/0047lidos, nenhumaampliaçãodeautoridade/seedrole/root/RLSdisable/CASCADE/ORREPLACE/historydelete. SOMENTEmanager→owner; adminPGpath NÃOcoberto.

Reverse-substitution reconstruiu TODOsourceparent007 BYTEEXATO fora extensão, incluindowhitespacefinal. OldHTTPshell e todosoldcalls/asserts/deadlines/browser/CDP/Fetchguard/CORS/sandbox/LNA/flags/images preservados. Falfutura éexit1sticky,semremovergate/auto businessretry. Semprodução/provider/PSP/dinheiroreal.

## Revisão / APK / documentos

22PRpaths ALLremoteUTF8oubase64normalized BYTEEXATOS, HTTPshell100755/rest100644.19newcyclechanges(8modified11new);1167of1175parentblobs+modesidênticos.1164of1171existingmainblobsiguais/493of494existingnon-docsforaHTTPshelliguais.249protectedmobile/packages/rootdeps/lock/workflows/build/smoke sameSHA/mode+freshcanonicalexpo-mobileprebuild→Gradlegraphunchanged→**APK N/AINTEGRAL**, não[]/ausênciaruns/APK575emprestado. NenhumAPK571construídoatribuído.

Fullmain+571+573+574+575prefix5originais/matriz preservados NO LUGAR porapêndice.6notashistóricas sameblobs (duas jáparent+quatronovas), SEMDatabaseService575/códigosoutrosdrafts. NovaINVITATION_OWNER_PROMOTION_ROLLBACK_2026-10-18.md preserva integralrecibo575FINAL12344 e571007FINAL19179, não apenasresumos. PreparaçãoGitPENDING éHISTÓRIA; esteFINAL seráconsolidado SÓpróximo cicloFUNCIONAL,semmetadataautoref/status/image/activityGitcommit.

5OWN575desktopPNGs+PR575_OWN_PROMOTION_CYCLE_PROVENANCE.json agoraGit desta branch em docs/evidencias/web-browser-2026-10-18/pr575-own-*.png. FonteHEAD89f799914fdcadaa75f7569b78c8483953829295/treed9ca8e85f8f2410474c18c73d85e99adbec66b72/actualcheckoutd3447a773881d73bf358476b2235882d789bcde8SINTÉTICO[main3e,89f799]/run39090990507job117567517336attempt1FAIL. Logs575reobtidosneste ciclo; normalizedbase64readbackremotoexato +PNGsignatureSHAbytes1365x900/Pillowverifynociclofonte. NÃOvisualinspected/NÃO571frames/NÃOAndroid/physical/native/fullaceite. Proveniência individualtimestampSHAbyteslabels noJSON. Semimage-onlycommit.

## Avanço independente após o bloqueio

Não é rodada apenasstatus: fixture nova+4novosPASSlocais+19pathsmodificados/commit85publicados, masPGacceptancependente. DepoisinfraFAIL avançouLOCAL para hipóteseespecífica dos12GETERR_ABORTED:
- Source mainapps/web/app/page.tsx REALapi helper recuperado: fetch(url,{headers,cache:'no-store'}) não recebe signal; componente tem0AbortController/0.abort/0signaloption. Seu prazo de leitura altera estado/current/ignorarespostastardias; não chamaabort.
-4testesLOCAL dafunçãoapiREAL viaNativeTSstrip/Function+callbacks explícitos PASS: formatoGET/headers/cache semsignal;12calls semsignal/retry;HTTP503 rejeitaapós1requestsemJSONfalso;rejeiçãonativa propagadasemretry. Headersfixtureexplícitos, nãoauthreal/HTTP/Chrome/segurançaextra. NÃOparte13/444CI/NÃOpublicados.
- Probe558879lido: jáobservaresposta/rejeiçãonativefetch, NetworkExtraInfo/clientSecurityState econtinue-session/response/errors; isso nãoidentificacausa. BrowserChrome/Chromiumnãoencontrado nos4nomesPATHlocal; nãoalegarprovaBrowsernova.
- **Conclusãolimitada**: hipótese de AbortController explícito destehelper/componente causando12cancelamentos não tem suporte nessa fonte. NÃOexclui browser/framework/frame lifecycle/rede/navegador; nenhumroot/fixprovado. Não alterarFetchguard/CDP/CORS/sandbox/LNA/deadlines/images/flagsporhipótese.
ArquivosLOCALinvitation-promotion-local/next-audit/{web-page.tsx,web-api-request-shape.test.cjs}. Próximo diagnóstico seguro possível: lercontratosCDPprimários antes de estender558 EXISTENTE com somenteobservaçãoordenada/lifecycle/frame-loader/networkid+timestamps, semheaders/tokens/body/relaxamento; distinguircancelamentode contexto de sinalJS em cenáriosjáguardados. Ainda NÃOimplementado/executado/causaprovada; não criarPRduplicado/nãorerun879ou85sóverde.

Main3einalterada.57589f799DRAFT own1379unitPASS/typesetcPASS/browserFAIL pósrecovery/reload,rootUNRESOLVED;DBfix575NÃOintegrado/copiadocurrente.573dfb2infraantescheckout;574/572/570/568/565/560/558separados. Externals215219220224228OPEN. Só10TÉCNICAINTERNAaceita12pendentes,não%decódigo. NenhumActivitymanualwrite/produção/serviço/custo/credencial/provider/PSP/contrato/dinheiroreal/novaautomação. Manterrutinaúnicaenabled/scheduleinalterados,semparcial/transientedisable.

---

## Preparação e recibo anterior integral (HISTÓRIA, NÃO PASS desteHEAD)

# Atualização funcional — rollback de promoção manager→owner — 2026-10-18 UTC

DRAFT/NOTMERGED. NovoHEAD `85e9c992b6e7a1568b8ea865e43da63477c5f3a0`, tree `ca88187efb97fbf1f9312ec6494b136a88e57b43`, parent `007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb`, baseMAIN`3e098cd51cd2fd84f21e144a600a814a2cb1a150`.

Depois de TODOS os casos antigos intactos, novo caso cria ownerinvitation por ownerHTTP real para manager já criado por aceiteHTTP. HookownedAFTERUPDATEaccepted_at deve ver membershipowner+conviteaceito na transação, sequence1+HTTP500; snapshots integrais2tenants devem preservar manager/conviteativo. Cleanup→UMAaçãoexplícita MESMOcódigo201 alteraSÓrole+acceptedpair/replay400semnovamembership. Não seedrole/newgrant/RLSdisable/produtofix inventado. SOMENTEmanager→owner, nãoadminPGproof.

4guardmodelsnovos+9oldbyteidênticos=13PASSlocal/zeroFAILSKIPCANCEL;syntaxPASS/CLI CI=0refusedantespgHTTP. Reverse-substitution sourceparent integral BYTEEXATO fora extensão, TODOSoldHTTPcalls/asserts/browsergates preservados. NovoHTTPPGreal/CI **PENDENTES**, markersINVITATION_PROMOTION_UPDATE_ROLLBACK_PASS/INVITATION_PROMOTION_ATOMICITY_HTTP_PG_PASS nãoPASSemprestado. Esperado1368=[145Web,765mobile,444API,3CLI,11monitor], não resultado.

22PRpathsALLremoteUTF8/base64normalizedbyteexact/modesHTTPshell100755rest100644;19newcyclechanges(8modified11new)/1167otherparentblobs+modesiguais.1164of1171existingmainblobs/493of494mainnon-docsforaHTTPshellsame.249protectedinputs+freshcanonicalAPKgraphsame→APKN/AINTEGRAL/nenhumAPK571atribuído. Fullmain+571+573+574+575prefixoriginais/matrizpreservadosNO LUGAR. 6notashistóricassameblobsSEMDBservice575/códigooutrosdrafts.5OWN575desktopPNGs+manifestagoraGitcomfonte89f799/d344/treed9ca/run39090990507job117567517336attempt1FAIL;NÃOframes571/nativo/VisualTruth/PASS.

Recibosintegrais575FINAL12344chars/571007FINAL19179chars preservados na nova evidência INVITATION_OWNER_PROMOTION_ROLLBACK_2026-10-18.md. MergeONLYfullCIownSUCCESS/reviewfreshHEAD/expectedSHA+pósreal,nenhumready/merge/retrycego. Apenas10TÉCNICAINTERNAaceita12pendentes. Semprod/PSP/serviços/custos/credenciais/grants/root/securityweakening/Activitymanualwrites.

---

## Recibo anterior integral571007 — HISTÓRIA, não resultado do novoHEAD

## FINAL próprio — aceite com falha tardia — 2026-10-17 UTC

PR571 DRAFT/NOTMERGED. HEAD `007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb`, tree `49f043f544cf0a9bae2299bb686ece458a8293b1`, parent `67e3b8fc389162a186c4899d4c0b117a906c2d42`, base MAIN `3e098cd51cd2fd84f21e144a600a814a2cb1a150`. ZEROready/merge/post571/rerun/cancel. Nova fase funcional, não repetição do mesmo SHA para verde. API/controller/DatabaseService/SQLproduto NÃOalterados; nenhum defeito transacional inventado.

### Nova prova REAL HTTP/Postgres PASS

[OwnCI39072426685/job117512606508](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39072426685/job/117512606508), attempt1:

**INVITATION_ACCEPT_UPDATE_ROLLBACK_PASS2026-10-17T21:50:13.4912912Z**: AFTER UPDATE accepted_at observou UMA membershipmanager/subject=identity e UM convite aceito por identidade exata simultaneamente antes da sequência própria não transacional avançar1 e gerarHTTP500. Snapshots completos invitations/memberships de DOIS tenants exatamente iguais ao pré-aceite; convite continuou ativo via GET autorizado; ACL/policies/RLS intactos.

**INVITATION_ACCEPT_ATOMICITY_HTTP_PG_PASS21:50:13.5048641Z**: apóscleanup, UMA ação EXPLÍCITA usando MESMO código201 criou exatamenteuma membershipmanager; somenteaccepted_at/by mudou no convite. Replaycódigoconsumido400 não criou vínculo. Demaislinhas/tenantestrangeiro intactos; ausência dos DOIS conjuntos trigger/function/sequence consultada emPG.

Prova original renovação executada novamente NO NOVO HEAD: INVITATION_INSERT_ROLLBACK_PASS21:50:13.4679747Z / INVITATION_ATOMICITY_HTTP_PG_PASS21:50:13.5051887Z. Sem PASSemprestado.

Rastreabilidade: CompanyMembersController.accept + DatabaseService.tenant BEGIN/SETLOCALapp_runtime/tenant/COMMIT/catchROLLBACK →membershipINSERT+accepted_atUPDATE →500/snapshotigual/conviteativo →recuperaçãoexplícita201/replay400 →scripts/invitation-atomicity-e2e.cjs →markers próprios acima. SOMENTEINSERTmembershipnova, NÃO promoçãoadmin/manager→owner; nãoAndroid/SecureStore/email/provider/produção/retentativaautomática.

### CI geral FAILURE, não verde

Own39072426685/job117512606508attempt1COMPLETEFAILURE, ZEROretry.
**1364=[145Web,765mobile,440API,3CLI,11monitor]PASS/fail-skip-cancel0**. Typecheck/build/mobileexport/migrationrunner2x/privacyPASS. HTTPbrowserFAIL/PostSetupNodeSKIPPED/laterProductionTruthNOTexecuted. UnitGREEN+SQLproofGREEN≠CIGREEN.

Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual21:50:52.8196851Z. Fail21:51:15.4245332Zcreatedteamrendered: teamPOST201real seguido12GETERR_ABORTED/canceledTRUE/corsnull. UI12unavailable/counts/rates—correta, nãofalsezero. Job/vaga/503/recovery/reload/logout/B/fulljourneyNOTcompleted. NãoECR/startup/novapermissiondenial/causaAPI-CORS-vendorprovada. RootantigoUNRESOLVED. Nenhumflag/imagem/security/driver/Fetchguard/CDP/CORS/sandbox/LNA/deadline/assertalterado. NÃO rerun007 para verde.

### Checkout e capturas próprias

Primarycheckout2026-10-17T21:48:00.6701256Z `e364e571a9d208be2c6ed215d12cfd8847ccd739` SINTÉTICO orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb`], tree `49f043f544cf0a9bae2299bb686ece458a8293b1` igualcandidata, NÃOHEADliteral. Gitcommit/pais/treeconfirmados. Nenhummerge/pós571existe.

DuasPNGdesktop próprias, independentemente decodificadasPNGsignature/SHA/bytes/dims1365x900PASS, NÃOvisualmenteinspecionadas/nãonativas/nãoGitassets:
- login: 75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686bytes
- failure: 4d25511d5a01f3afb096a28244556f342892651e61005c07d37745797459e6f9/133250bytes
Fonte39072426685attempt1/job117512606508FAIL/HEAD007/checkoute364/tree49f; scratchinvitation-atomicity-local/571-007-own-captures.json. Nãoemprestarframes/PASSanteriores.

### Review integral / APK N/A

ALL11PRpathsremoteUTF8byteexact/modes100755HTTPshell100644rest:9novociclo(CJS/APItest/5originais+matrizappend/evidênciaINVITATION_ACCEPT_UPDATE_ROLLBACK_2026-10-17.md)+2priorinalterados. PrefixosINTEGRAISmain3e e predecessor67e dos5originais+matrizintactos NO LUGAR. Recibo67eFINALconsolidado no apêndicefuncional, preparaçõesPENDINGhistóricas preservadas.
1166outrospriorblobs/modesintactos;492of493existingmainnon-docsforaHTTPshelliguais/READMEinalterado. **249protected inputs** na seleção integral mobile/packages/rootmetadata/deps/lock/workflows/build/smoke sameSHA/mode; canonicalexpo prebuild→GradleassembleReleaseinalterado. NovosfixtureAPItestforaAndroiddependency/import/buildgraph. **APK N/AINTEGRAL**, NÃOausênciaruns/[]/APKemprestado; NENHUMAPK571construído/atribuído. Ahead2behind0mergebasemain3e, parent67e.

9guardmodels locaisPASS(5originais+4novos), incluídos440APIown. Primeira execução diretaNodeTS local falhou por require emESmodule; NativeTSstrip+Function comrequirecontext passou9/9, não produtoRED. CLI CI=0refusedantespg/HTTP/node--checkPASS. Old5testbodiesbyteidentical; HTTPshell571inalterado e todosoldgatesmantidos.
CI/localAPIexplicitport/PGexactmlivretrabalho_http/socketloopbackantesDDL; HTTPPGid/actor/tenant/email/targetUUID/hash/noPriorMembershipbinding. Scopeacceptseparado. HookSECURITYDEFINER sówitnessbounded/search_pathfixo/schemaqualified/EXECUTEPUBLICrevogado; semapp_runtimegrant/CASCADE/ORREPLACE/root/RLSdisable/prod. Cleanupownership/nomesrevalidados/flags/falhasticky.

### Fecho / próxima frente independente

Entrega REAL:4novosguardtests+provaSQLHTTPde500/rollback/conviteativo/201explícito/replay400;9arquivosnociclo/commit007/semnovaPRduplicada. Áreas4/7/11 maispróximas doaceite, nenhumafechada; apenas10AndroidstandaloneTÉCNICAINTERNOaceita/12pendentes. CIred impedeintegração; manterDRAFT.

Apósbloqueio passou-se à auditoriaREADONLY independente da área6ledgerSIMULADO: WorkAssignmentsController.complete alteraassignment/completed_at e insereearnings_ledger na MESMAtransaction. Testeslifecycle/work-assignments-input cobremfiltros/ACK/SQL/errogenérico; HTTPfinance cobreHMAC/replay/recipient/totais, não demonstrafalhaSQLtardiaINSERTledger comstatusvisible. Migrations0007/0044/0065exigemRLS/noDELETEruntime/FKassignmenttenant. Próximaprovapequena possível: erroLOCALescopadoAFTERINSERTledgercomwitnesscompleted+ledger/snapshots2tenants/HTTP500 eUMAconclusãoexplícita+ledgerúnico. SOMENTElacunaidentificada, NÃOimplementado/provado/defeitofinanceiro/provider. Revalidarfreshcontratos/testesantesdeagir, semseedpapel/grant/policy/dinheiroreal.

#572infraregistry separadoDRAFTCIred,nãointegrado/copiadona571; #568/#570/#565/#560/#558preservados/ext215219220224228OPEN. SemmanualActivitywrites/commitatividade/produção/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal. GitprepPENDINGéHISTÓRIA; consolidar esteFINALsóPRÓXIMOCICLOFUNCIONAL, semautorefmetadata/image/statuscommit.


---
## Recibos e preparação anteriores (HISTÓRIA, não resultado do HEAD007)

## FINAL own evidence — DRAFT / NOTMERGED — 2026-10-17 UTC

HEAD `67e3b8fc389162a186c4899d4c0b117a906c2d42`, tree `c431b86c2e9876a788b74745348801bcdccd9020`, ordered parent/base main`3e098cd51cd2fd84f21e144a600a814a2cb1a150`. Prova nova de atomicidade, NÃO correção de defeito presumido no produto. Sem ready/merge/post571/rerun/cancel. Não emprestar qualquer PASS568/570/567.

### Resultado próprio: CI FAILURE; 1360 unidades PASS
[CI39068354509/job117500598324](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39068354509/job/117500598324), attempt1 COMPLETEFAILURE, ZEROretry.
1360=[145Web,765mobile,436API,3CLI,11monitor]PASS/fail-skip-cancel0; types/build/mobileexport/migrationrunner2x/privacyPASS. HTTP/browserFAIL, PostSetupNodeSKIPPED/laterProductionTruthNOTexecuted. UnitPASS não é CIGREEN.

### Prova nova REAL HTTP/PostgreSQL, independente do navegador
**INVITATION_INSERT_ROLLBACK_PASS20:52:28.3424395Z**: HTTP500 real, witness AFTERINSERT exigiu ver simultaneamente antigo convite revogado e novo convite inserido dentro da transação. Sequência própria não transacional avançou exatamente1 antes da exceção. Após resposta500, snapshots completos de invitations/memberships dos DOIS tenants eram exatamente os anteriores; policies/ACL/RLS intactos. Convite antigo continuou ativo, sem aceitação ou revogação indevida. Não é estado simulado de banco.

**INVITATION_ATOMICITY_HTTP_PG_PASS20:52:28.3603093Z**: após cleanup do hook próprio, UMA solicitação explícita de recuperação retornou201, criou exatamenteumconvite e revogou anterior. Código antigo400, novo201aceito; membershipmanager real única, registros anteriores e tenant estrangeiro intactos. Sequência/função/trigger próprios removidos e ausência consultada; nenhum histórico de aplicação apagado. Não é retry automático/outbox/provider/emailentregue/nativeUI/produção.

Ligação requisito→código→estado→teste→CI: CompanyMembersController.invite + DatabaseService.tenant BEGIN/SETLOCALapp_runtime/tenant/COMMIT/catchROLLBACK → anteriorativo/renovação500/snapshotidêntico/recuperação201/aceitação → scripts/invitation-atomicity-e2e.cjs → dois markers primários acima. API e DatabaseService NÃO mudaram. Testes prévios de concorrência só provavam renovações bem-sucedidas; esta entrega fecha uma lacuna de observação do erro SQL, sem afirmar defeito transacional existente ou aceite integral.

### Bloqueio geral de navegador
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 real20:53:04.2812605Z.
FAIL20:53:25.1342704Z created-team-rendered: teamPOST201 observado, seguido12GETnetERR_ABORTED/canceledTRUE/corsErrorNULL. UI12unavailable/—, não falsozero. Criação/render de vaga, 503/recovery/reload/logout/B/fulljourney NÃO concluídos nesta execução. Não é startup/ECR, não causa API/CORS/vendor provada. Nenhuma flag/imagem/prazo/Fetchguard/CDP/CORS/sandbox/LNA/assertiva reduzida. Não repetir mesmoSHA para verde.

Duas capturas desktop do próprio job (não Android), independentlydecodedPNGsignature/SHA/bytes1365x900/PillowverifyPASS; não inspecionadas visualmente nesta rodada e NÃO publicadas como novo asset Git:
- login 75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc / 33686bytes
- failure 178df4a248a9756ef86c81af4e35ef1150574322413c5b095f3b8d807f46b11d / 133442bytes
Scratchinvitation-atomicity-local/571-own-captures.json; fonte run39068354509attempt1/job117500598324FAIL/HEAD67e3/checkoutcec5/treec431. Não usar como prova de UI nativa ou prova visual aprovada.

### Checkout, review, APK applicability
Primarycheckout20:50:06.9014017Z `cec5e3e46cebfa29e8dcc9e6f56531c87aacb7b6` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`67e3b8fc389162a186c4899d4c0b117a906c2d42`], treec431b86c2e9876a788b74745348801bcdccd9020 exactlycandidate, NOTliteralHEAD. Gitcommit/parents/tree reread.

ALL10remoteUTF8filesbyteEXACT, modes100755HTTPshell+100644rest; full5originaldocs+matrixmainprefix preserved INPLACE byappend.492of493existingmainnon-docblobs outsideHTTPshell unchanged. All246protected mobile/sharedpackages/rootdeps/lock/workflows/build/smoke inputs sameSHA/mode; all other oldblobs unchanged, no deletion. CanonicalAPKentry remains pnpm --filter @mlivretrabalho/mobile expo prebuild→apps/mobile/android Gradle assembleRelease. NewAPItest and localCJSfixture are outside that dependency/import/build graph; existingrootworkspace and allmodules unchanged. **APK N/A por identidade integral dos insumos/grafo**, NÃO por ausência de runs/[]/APK emprestado. Nenhum APK foi construído ou atribuído a571. Ahead1behind0/mergebasemain3e.

Cinco guardmodels novos executam funções reais de scope/binding/cleanup: local5PASS e incluídos436API emCI, não SQL/HTTP. Probe CLI CI=0 saiu1 com CI disposable fixture only antes de pg/HTTP. Segurança fixture: CI/localexplicitports/exactDB/socketloopback; UUID/email/HTTPPGbindingantesDDL; SECURITYDEFINER SOMENTE witness limitado, search_pathfixo/objetoqualificado/EXECUTEPUBLICrevogado; sem grant/RLS/policy/runtimealterados, nunca productiontrigger/migração. Ownershipflags impedem cleanup de objetos preexistentes/forjados e falha permanece sticky.

### Fecho e próxima frente
Alterados fixtureCJS,5guardtestsAPI,UMAinvocaçãoHTTPshell, cincooriginais+matrizappend, evidência INVITATION_RENEWAL_INSERT_ROLLBACK_2026-10-17.md. Áreas4/7/11: nova prova de rollback e recuperação observada; integração e aceite integral continuam pendentes pelo CIfalhado. Sóárea10técnica interna aceita, outras12pendentes; externos215219220224228separados. Semprodução/custos/serviços/credenciais/provider/contratos/PSP/dinheiroreal.

Conforme anti-estagnação, passou-se imediatamente a outra operação: auditoria READONLY do consumo de convite em CompanyMembersController.accept. Escreve membership INSERT/upgrade e depois accepted_at; testes atuais cobrem entradas/auth/ACK e propagação genérica de erro, não uma falha SQL tardia com rollback real da membership. Próxima entrega delimitada: fixture LOCAL/guardada de falha no UPDATE accepted_at após INSERTmembership, provar rollback integral e código ainda utilizável, sem novo papel por seed/grant/policy e sem repetir571/browser. É lacuna identificada, NÃO bug/rollback provado ainda. Nenhum patch extra ou teste dessa futura operação foi alegado.

Preparações PENDING abaixo são história; resultado final é este recibo e logs próprios. Consolidar o final em novo ciclo funcional por apêndice, sem commit autorreferente/artificial de status. Continuar trabalho autorizado; não desligar rotina por bloqueio parcial.

---

## Preparação histórica deste ciclo — anterior à execução própria
Prova independente da atomicidade de renovação de convite: falha AFTER INSERT deve desfazer tanto o novo convite quanto a revogação anterior. Não é correção de defeito transacional presumido. Fixtures HTTP/PG locais guardadas, witness não transacional antes de erro500, snapshots de dois tenants/policies/ACL e cleanup de objetos próprios. Recuperação explícita201/código antigo400/novoaceito201/membershipmanager única requerida. Nenhum app/controller/SQL/migração/grant/runtime alterado.

HEAD 67e3b8fc389162a186c4899d4c0b117a906c2d42 / tree c431b86c2e9876a788b74745348801bcdccd9020 / parent main3e098cd51cd2fd84f21e144a600a814a2cb1a150. 5guardmodelsPASS local; CI esperado1360=[145Web,765mobile,436API,3CLI,11monitor] PENDENTE. Markers SQL/HTTP aindaNÃOEXECUTADOS, não PASS. Todos gates antigos incluindobrowser mantidos; sem CORS/Fetchguard/CDP/sandbox/deadline relaxados. APK N/A requer conferência integral de inputs, não ausência de run.

Cinco originais+matriz preservados por apêndice, evidência docs/evidencias/INVITATION_RENEWAL_INSERT_ROLLBACK_2026-10-17.md. DRAFT até ownCIcompletoSUCCESS+revisãofresh/expectedSHA, pósrealobrigatório. Bloqueios568/570datas e browser independentes sem rerun cego. Sóárea10técnica aceita;12pendentes. Semprodução/provider/PSP/serviços/custos/dinheiroreal.


---

## Entrega funcional — atomicidade da renovação de convites — 2026-10-17

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. Originais completos mantidos NO LUGAR como prefixos integrais. Área4equipes/convites, área7RLS/tenant e área11API ficam mais próximas do aceite; nenhuma área é declarada concluída.

Lacuna comprovada por leitura dos testes existentes: http-company-invitation-concurrency-e2e.sh comprova serialização de duas renovações bem-sucedidas e aceitação de apenas um código; http-company-members-e2e.sh cobre papéis/criação/aceitação/revogação. Nenhum injeta falha SQL no INSERT posterior à revogação do convite anterior. Controller.invite executa ambas as escritas dentro de DatabaseService.tenant BEGIN/SET LOCAL app_runtime/tenant/COMMIT/catchROLLBACK. Não foi reproduzido defeito no produto; a entrega é prova adicional do contrato transacional, sem alterar controller/SQL/runtime.

Novo scripts/invitation-atomicity-e2e.cjs: guarda CI+APIlocalhostHTTPporta explícita+PGlocalhostporta/DBEXATOmlivretrabalho_http; carrega pg somente após guarda e exige socket REALloopback antes de criar fixtures/DDL. Identidades/duasempresas/profissional/convites são criados por HTTP real, IDs/tenant/ator/email/role/expiry/tokenhash vinculados ao PG antes do hook. Nenhuma credencial/código de convite é logado, nenhuma requisição externa/prod/provider.

Uma sequência e função/trigger AFTER INSERT com nomes derivados de UUID próprio são criados APENAS no banco descartável. Função SECURITYDEFINER com search_path fixo/tabela+sequência qualificadas/EXECUTE PUBLIC revogado limita-se ao tenant/email/ator próprios. Exige ver os dois fatos dentro da transação (convite anterior revogado + novo inserido) antes de avançar sequência não transacional e levantar erro controlado. HTTP deve retornar500, witness deve ser1, snapshots integrais das invitations/memberships dos dois tenants devem ser exatamente iguais aos anteriores, RLS/policies/ACL intactos.

Cleanup remove SOMENTE objetos criados com flags próprias, em ordem trigger/function/sequence, não sobrescreve objetos existentes nem usa CASCADE. Guardas contra nomes forjados e cleanup parcial com falha têm teste real. Depois, uma solicitação explícita de recuperação201 deve criar exatamenteumconvite e revogar anterior; código antigo400/novo201aceito e exatamenteuma membershipmanager nova, demaisregistros/tenantestrangeiro intactos. Não é retry automático de negócio, outbox, email entregue ou prova Android/produção. Markers INVITATION_INSERT_ROLLBACK_PASS e INVITATION_ATOMICITY_HTTP_PG_PASS só serão aceitos por logs novos; nesta preparação PENDENTES.

Cinco guardmodels novos em apps/api/src/invitation-atomicity.test.ts PASS5/5 local via NativeTSstrip e funções reais, sem pg/HTTP local. Cobrem IDs/email do escopo, vinculação do registro, recusa de cleanup não próprio/forjado, ordem/flags e drenagem após falha. Não são prova SQL/HTTP. CI esperado1360=[145Web,765mobile,436API,3CLI,11monitor], ainda PENDENTE. Uma invocação foi adicionada antes do navegador no HTTPjourney; TODOS asserts/gates antigos/navegador/CORS/Fetchguard/CDP/sandbox/LNA/deadlines preservados. Nenhum app/controller/migração/dependência/lock/workflow/build/smoke/native alterado. APK N/A somente após revisão integral da árvore de insumos nativos; não por ausência de run ou APK emprestado.

Revalidação inicial: #568b7ef e #5702205 são DRAFT e CIbrowserFAIL/APKSUCCESS, sem merge/retry cego nesta rodada; os snapshots PENDING dos corpos não são PASS. Não duplicar reparo de datas já abrangido nesses PRs. #558/#560/#565 mantêm bloqueios independentes. Apenas área10Androidstandalone TÉCNICO interno aceita, demais12pendentes; externos215/219/220/224/228abertos. Sem produção/serviços/custos/providers/PSP/credenciais/contratos/dinheiroreal. Nenhum commit artificial/alerta manual.

Fecho desta preparação: código fixture+guardtests/documentação/evidência acima preparados, 5modelsPASS, execuçãoCI/HTTPPG/revisão/merge/pós-gates PENDENTES. Próximo passo: conferir bytes/modes/ancestrais e log primário próprio; manter DRAFT se qualquer gate falhar e avançar em item independente em vez de rerun de falha de produto. Recibo final será vinculado ao PR e consolidado em novo ciclo funcional sem commit autorreferente de status.



