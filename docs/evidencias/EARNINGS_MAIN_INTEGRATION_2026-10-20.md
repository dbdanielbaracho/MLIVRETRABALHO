# Ganhos: integração funcional da main e aposentadoria de recursos próprios

## EARNINGS_MAIN_INTEGRATION — 2026-10-20T06:48Z

Entrega funcional no MESMO PR584, integração normal (pais ordenados old584 90cca9dafa3067f65b3ebacc36edceffa86628c9, MAIN d961990d1c55ccc50be094772371c10ca4ff7c1c), sem force/PR duplicada. Preserva correção Ganhos79ae7e2b6225da08eac0d100ee71ab8639165755 e 18 regressões6cbf6645bfd2b7e36eda1e260c67a9ec1905f43f BYTE EXATAS. Traz dependências funcionais atuais: matching570, DatabaseService575, testes586/587, Web590 e inicialização Chrome592 já integrados; NÃO introduz nova mudança registry/flags/workflows. Nenhum código de outros drafts importado. ALL11openPRfiles auditados: só584 altera Ganhos/teste alvo.
Requisito áreas6/1/11/13: ao expirar15s leitura Ganhos, aposentar SOMENTE controller/listener próprios antes da dependência auth/fetch/JSON/authfinal resolver; erro e — já eram exibidos corretamente. Não alegar busy travado, heap exhaustion, tenant leak, cancelamento SQL/servidor ou defeito financeiro. Fix de88chars já existente no PR, finally idempotente/guards/headers/payload/deadline/JSX/totais/parser intactos. Fonte MAINd08f4f9f9f10709130a1ab4af8a49f8367657fdd vs18testes hoje2PASS16FAIL; candidato18GREEN/54focalPASS/1059FULLmobilePASS UTC e America/Sao_Paulo, zero fail/skip/cancel, Node24.19.0. FULL163mobileblobs atuais fetched:162 locais BYTE EXATOS (Ganhos candidato no único delta), tsconfig LOCAL sem extends Expo somente para execução strip-types, NÃO publicado; teste18também BYTE EXATO. Testes pré-JSX/helpers reais+hooks/auth/fetchJSON/timers explícitos, NÃO RN render/SecureStore/HTTPPG/native/ledger/RLS enforcement. Typecheck local/deps Expo ausentes, CI obrigatório.
CI/APK NOVO HEAD PENDENTES nesta preparação,1705=[146Web1059mobile486API3CLI11monitor] somenteESPERADO, não executado. APK APLICÁVEL por delta móvel; fullCI SUCCESS+APK SUCCESS próprios+freshmain/head/base/todospathsmodos antes ready/expectedSHAmerge uma vez; depois CI/APK reais no merge. Não emprestar APK90cc nem repetir seu CI: única retry infra90cc consumida em2026-10-18. Se browser/produto falhar, não rerun para verde; registrar e avançar frente independente.
MAINfresh d961 pós-CI39356876276/job118413583593 attempt1FAIL2026-10-20T02:07:54.2398752Z loaded dashboard após1687unitPASS=[146/1041/486/3/11],types/build/export/migrations/privacyPASS. Estado12GETERR_ABORTED/canceledtrue/corsnull após47GET200+1GET503controlado/3POST201+1POST401esperado/52OPTIONS204; UI12unavailable/—. ProductionTruth posterior não executado. Chrome155.0.8059.39/protocol1.3/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34. #592 ajustes startup não resolvem esse aborto; hipótese de onda de releitura permanece observação, NÃO causaAPI/CORS/vendor/framework comprovada. Sem emprestartrace5580Nav. Nenhum rerun d961/oldmain para verde.
Recibo570 reconciliado: JÁMERGED e06b3428c7a502f9a64103ca361daf4fdb6ec909. POSTCI39216769481attempt2/job117942615337 checkoutLITERALe06b07:34:46.9621753Z,1686unitPASS(145/1041/486/3/11), fullCIRED loaded dashboard07:38:28.5626570Z:71GET200+1controlled503/5POST201+1expected401/88OPTIONS204 e12GETabort na outra identidade após signout201/signin201. Não inferir isolamentoB concluído nem ProductionTruthposterior; retryA1infra consumida, ZERO rerun de produto. Próprio570GREEN anterior não é pósGREEN.
POSTAPK57039216769289/job117942346484attempt1SUCCESS, checkoutLITERALe06b07:33:46.5643042Z/buildSUCCESS07:44:14.6257343Z/installSuccess07:45:31.4896561Z/DEVICE_SMOKE_OK07:45:44.0320350ZsemMetro. Artifact12170313147 expires2026-11-02T07:45:45Z: REALZIP28913424bytes SHA2565bbbc054598b6ec063d757a14ef8136460ecb24ef0cb9ca8920c6abaa33303ff=API; APKindividual66162584bytes SHA256239c39bb7ce46a59fa0a730260aea5342e2c194ca57256d4bf9e559a643d971f=SHA256SUMS. BUILD_INFOliteral e06b/release/fixedpackage/metrofalse/build07:44:15Z. Primeira transferência parcial25829376bytes rejeitada apesar exit0; ordinaryHTTPRangecontinue completou e hash/tamanho API conferidos. ZIP≠APK/installlaunch≠forms/SecureStore/físico/VisualTruth/prod. Último MAIN standalone medido e06b; d961 não recebeu APK próprio porque posteriores590/592fora mobile; não afirmar APK literald961.
6FULLoriginais584PREFIXINPLACE+FULLMAINmissingtail desde fronteira de linha comum; manifesto na nota reconstrói FULLMAIN BYTE EXATO, não alegar MAIN prefixo contíguo quando divergiu. FULL584FINAL18273 e FULL570premerge11336 preservados na nota; PR570 terminalreceipt agora reconciliado acima sem reescrever body histórico. Nenhum status/selfref/image/Activitycommit; resultado terminal só PRmetadata e próxima entrega funcional.
Aceite delegado pelo usuário já FULL no MAIN tail preservado: assistente verifica/aceita internamente sem aprovação humana/CONTINUAR. Só área10 técnico interno;12semaceiteintegral, não%code. Limpeza recursos não aceita ledger/split/rollback/reembolso/saldo negativo nem área6 inteira. External gates215/219/220/224/228 separados. Preservados React19.1.4/RN0.81.6/depslock/tenantRLS/ACLprivacidade/autenticação/SQL/API/sessionqueue/segurançaCDPFetchguardCORSsandboxLNA/prazos/asserts. Sem produção/serviços/custos/PSP/credenciais/root/grants/RLSdisable. Única rotina sem mudanças, nenhuma nova automação.
Próximo: novoHEAD ownCI/APK e checkout/árvore sintética literal, artefato bytes e revisão completa; bloqueio→frente independente imediata. PreparaçãoPENDING é registro histórico, não PASS antecipado.

## Manifesto de preservação integral
```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "oldSHA": "39e52c21a6134cc801c19b0595af3e46579d4d0e",
    "mainSHA": "ca68ed1d3ccf65a7eba3a44db5221d1c4b335f2a",
    "oldChars": 1092965,
    "mainChars": 1675110,
    "commonChars": 606904,
    "tailStart": 1093105,
    "tailChars": 1068206,
    "newChars": 2166671
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "oldSHA": "09657d60b4ef831ca33df08ce923f020e971d443",
    "mainSHA": "a711a3e772b17f865140180ef3f3c500b354c7eb",
    "oldChars": 1425537,
    "mainChars": 2007684,
    "commonChars": 939474,
    "tailStart": 1425677,
    "tailChars": 1068210,
    "newChars": 2499247
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "oldSHA": "c1f3fde1f6103583387edb7dae2522aba5d97f49",
    "mainSHA": "ce6b3d3fcc04342c4ae80c62bc81880cc75aeca1",
    "oldChars": 1083197,
    "mainChars": 1665322,
    "commonChars": 597156,
    "tailStart": 1083327,
    "tailChars": 1068166,
    "newChars": 2156853
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "oldSHA": "ab4e1c7db55747495d2e94574be7be973078976b",
    "mainSHA": "ff763bbe2dd6521058f4681c1a262e975e446e07",
    "oldChars": 1078016,
    "mainChars": 1660155,
    "commonChars": 591961,
    "tailStart": 1078153,
    "tailChars": 1068194,
    "newChars": 2151707
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "oldSHA": "87204207e875cf47b1eb961c0bcc1b0117bba452",
    "mainSHA": "2d332200b7072075c37f065f1f4ba3cbc1068ae1",
    "oldChars": 1079108,
    "mainChars": 1661213,
    "commonChars": 593087,
    "tailStart": 1079228,
    "tailChars": 1068126,
    "newChars": 2152714
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "oldSHA": "23338b92f9be7ac5382e7f565f08fc15599ed89e",
    "mainSHA": "80c5d64d2a2d604d7e2a1eeb833f3fc993a5f29a",
    "oldChars": 675813,
    "mainChars": 1257958,
    "commonChars": 189752,
    "tailStart": 675953,
    "tailChars": 1068206,
    "newChars": 1749519
  }
]
```
## FULL PR584 FINAL anterior (18273chars)

## Retry584 encerrada — verificado2026-10-18T20:10UTC

A UMA retry específica CI39156391666 job117760377495 foi emitida20:06UTC somente após nova prova de recuperação do pull ECR noCI585: postgres17 Downloaded newer image19:55:08.9959503Z econtainersSUCCESS. Attempt2/job117776552563COMPLETEDFAILURE, mesmaquotaECRpostgres17toomanyrequestsDataLimit20:07:02.7835949Z/07.7892588Z/15.1058454Z/Dockerpullfailed20:07:15.1164034Z ANTEScheckout. Checkout+TODOSprodutosSKIPPED. Initial+ONEretryconsumidos,nãooutrorerun90cc/registryworkflowcredentialbypass/ready/merge584. Evidência justificou apenas uma tentativa, NÃOquotaGLOBALresolvida.1521CIunit584NÃOexecutado/nãoemprestar5851531. APK584ownSUCCESSverificadobytespermanece, nãoautorizaCIRED. MAIN75105inalterada/FULLCIRED582POSTquota/standalonetécnico582POST75105. PENDING584A2 abaixo é histórico supersedido por estes fatos, preservado integralmente.

---

## APK final verificado — 2026-10-18T19:49UTC — supersede somente APK pending

OWNAPK39156391656/job117760377578attempt1 COMPLETED SUCCESS/ZEROretry. Actualcheckoutcedf110d819e78f53de4068c1a64a660215faaf9 primary18:55:43.2093817Z SINTÉTICO orderedparents[75105d42c873ca56b58fa1aa73cc4a682359e5c1,90cca9dafa3067f65b3ebacc36edceffa86628c9]/treed16d039ba48e5c5ccc379b75e48ade07fcc0a87f igualcandidate, Gitconfirmado NÃOliteralHEAD. Build19:04:41.9710947Z/installSuccess19:06:23.4992537Z/DEVICE_SMOKE_OK19:06:35.8548384ZwithoutMetro. Artifact12147238228/expires2026-11-01T19:06:36Z REALdownloadZIP28913017bytes/SHA256d58c7b27b6b264a7a4a5919fccca504f7e11fb9618bd44f43baa278076b68ca6=API;individualAPK66162212bytes/SHA256553c3b89981c4909e6b5e8ab052fc90e8efa68b401304ea74a79df75fe9bd77e=SHA256SUMS. BUILD_INFOcedf/release/fixedpackage/metrofalse/build2026-10-18T19:04:42Z. Staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠Ganhosform/financeiro/SecureStore/nativequeue/físico/VisualTruth/prod. APK N/A FALSE. NÃOMAIN584APK.
OwnCI39156391666attempt1FAILquotaANTEScheckout/ZEROretrycontinua; nenhumCIunit1521observado. PR584DRAFTNOTMERGED/head90cc/MAIN75105inalterados, ZEROready/merge/rerun/cancel. CIREDproíbemergeapesarAPKgreen. MAINfullCIRED582POSTquota e standalone técnico582POST75105 permanecem; sóárea10técnicainterna,12pending.
FINAL584FULLprecedente15839chars preservado abaixo e próximo registrofuncional, semGitstatus/autoref/image/activitycommit.

---

## FINAL de rodada — verificado2026-10-18T18:59UTC — DRAFT, NÃO MERGED

HEAD90cca9dafa3067f65b3ebacc36edceffa86628c9/treed16d039ba48e5c5ccc379b75e48ade07fcc0a87f/parentMAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1. ALL9diffpaths/mode100644/SHAexact; todos9generatedUTF8blobsFULLfetch_blobreadbackEXACT;1252blobs existentesMAIN fora7modificados byte/mode iguais. Seis FULLoriginais prefixos INPLACE+append; FINAL582 integral16635chars na nota nova. Não copiar outros drafts/não publicar tsconfigLOCAL.

### Gates próprios reais
- [CI39156391666](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39156391666)/job117760377495 attempt1 COMPLETED FAILURE/ZEROretry: ECRpostgres17 toomanyrequests Data limit exceeded18:55:36.4501679Z/43.4943406Z/53.3231549Z, Dockerpullfailed18:55:53.3326733Z ANTEScheckout. Checkout+TODOSprodutosSKIPPED. Nenhum actualcheckoutCI/unit/typecheck/HTTPPG/Chrome/ProductionTruth executado aqui;1521 é ESPERADO, não executado.931mobile são LOCAL. Nenhum novo12GETabort/PNG nesta execução. Não emprestar own5821503/GREEN/558zeroNav. Não rerun desteSHA: quota acaba de persistir na única retryPOST582 e não há evidência nova de recuperação da infraestrutura desde então. Sem alteraçãoregistry/workflow/credenciais/bypass. Browserroot continuaUNRESOLVED, controlesintactos.
- [APK39156391656](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39156391656)/job117760377578 attempt1 IN_PROGRESS, BuildstandaloneAPK na consulta18:57UTC. Sem falha observada; não buildfinal/install/DEVICE_SMOKE/artifact/bytes/actualcheckoutprimário atribuídos. APK N/A FALSE. Não cancelar/rerunrunning/ready/merge comCIRED, ainda queAPKpasse. Próxima consulta prioritária: finalAPK+actualcheckoutGitparents/tree+REALZIPAPIbytes/hash vsindividualAPK/SUMS/BUILDINFO/expiry. CurrentMAINstandalone técnico permanece582POST75105, não584candidate.

### Evidência local e sensibilidade
18novos baseline2PASS16FAIL→18GREEN;54focal(36oldintactos),18TZSãoPaulo eFULL931mobilePASS913MAIN+18new/0fail-skip-cancel. Reversefull5693MAINchars→5781candidate somente88chars no callback. Mutantes SOMENTELOCAL/inmemory/readFileoverride (não publicados/nãoCIcount): retirar apenas registryretirement4PASS14FAIL; retirar apenas listenerremoval10PASS8FAIL. Não diminui asserts/guards/request/segurança/JSX/styles/API/SQL/RLS/ACL/deps/lock/workflows/buildsmoke.

### Após bloqueio: frente independente LOCAL, sem segundo patch
Trabalhos.interest actualscreen a0f7fab92434aa1d7e8d8fb22e8766991b5f04d4/helper54d0814ace6e91565e0fa9c8722ea734594b015f/sessioncontext8a23f577cf222016694d6995822b632c0a71434f/JobsController185be30435f34dc270461fefce284a37ac7a3b5e freshread.6actualpreJSX+realhelpermodels LOCAL2positivePASS4deadlineFAIL. Em auth/fetch/JSON/finalauth aos15s pendingIds ainda contémjob e ENVIANDO permanece;0POSTauth/1outros. Somente após dependênciaresolver pendingIds limpa e erro não-confirmado aparece;lateACKnão afirma sucesso, POSTcountigual/noautoGETPOST. Positivosinterested/confirmed onebodylessPOST eprofileID/jobUUIDfixturesválidos;34controlesexistentesprimary+jobsPASS intactos. NÃO produtoTrabalhospatch/PR/CI/RNrender/HTTPPG/native/aceite/parte18/931/1521. Código reproduzível integral do audit abaixo, foraAPPtestglob.
APIoriginária tem ONCONFLICT(job_id,professional_id) preservando statusconfirmed, exigeprofile/jobUUID/marketplacejobopen; GETinterest autenticado disponível. Não inventar idempotência durável/cancelamento servidor/autoPOST/barreira definitiva. PróximoFUNCIONAL freshnorms/MAIN/dupereview e auditar recuperação manual/ACK confirmado versus incerteza ANTESfix; ownership poroperação/perjob eoldtimer-finallyNÃOremovemNEWinterest mesmojob/mesmoepoch, retirementANTESunlock/authorityinvalidation+blur/context guards/requestsoriginals. Não duplicar568calendar/582confirmation/584Ganhos.

Rodada não estagnou:fixreal18regressões+54focal931local+PR584 e6newindependentmodels. Nenhuma novaárea integralmente aceita; só10técnicainterna,12pendentes/não%code. Externos215219220224228OPEN/Watch569CLOSEDcompletedfresh. MAINfullCIREDinfra582POST; noexternalactionblockexigindo usuário agora. Nunca status/autoref/image/activitycommit; consolidar FINAL nos6originais somentepróximaentregafuncional.

### AuditLOCAL integral (não suíteCI)
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadJobs,sendInterest} from '../apps/mobile/lib/jobs.ts';
import {runForSession} from '../apps/mobile/lib/session-context.ts';
// Audit only: actual Trabalhos pre-JSX and real helpers, explicit hook/auth/JSON/timer fixtures.
const job={id:'00000000-0000-4000-8000-000000000001',title:'Actual work',payCents:1200},headers={Authorization:'Bearer actual-professional'};
function screen(pause,ack='interested'){
 const source=fs.readFileSync(new URL('../apps/mobile/app/trabalhos.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Trabalhos('),end=source.indexOf('\n return <SafeAreaView',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {interest};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','runForSession','loadJobs','sendInterest','setTimeout','clearTimeout','fetch',prefix+'\nreturn Trabalhos();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,tid=0,active=false,reads=0,resolve;const gate=new Promise(r=>{resolve=r});
 const auth=async()=>{if(active){reads++;if((pause==='auth'&&reads===1)||(pause==='final-auth'&&reads===2))await gate;}return {...headers}};
 const fetch=async(path,options)=>{calls.push({path,options});if(options.method==='POST'&&pause==='fetch')await gate;return {ok:true,json:async()=>{if(options.method==='POST'&&pause==='json')await gate;return options.method==='POST'?{jobId:job.id,professionalId:'00000000-0000-4000-8000-000000000002',status:ack}:[job]}}};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=typeof initial==='function'?initial():initial;return[state[i],v=>{state[i]=typeof v==='function'?v(state[i]):v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,x=>x,runForSession,loadJobs,sendInterest,(callback,ms)=>{assert.equal(ms,15000);const id=++tid;timers.set(id,callback);return id},id=>timers.delete(id),fetch);}
 render();cleanup=focus();
 return {state,calls,refs,pump:()=>new Promise(setImmediate),start:()=>{render();active=true;return handlers.interest(job.id)},expire:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback);callback()},resume:()=>{pause='none';resolve()},blur:()=>cleanup()};
}
for(const ack of ['interested','confirmed'])test('interest actual handler timely '+ack+' ACK uses one bodyless POST',async()=>{
 const h=screen('none',ack);await h.pump();await h.start();assert.deepEqual(h.state[5],[]);assert.equal(h.calls.length,2);const post=h.calls[1];assert.equal(post.path,'/jobs/'+job.id+'/interest');assert.equal(post.options.method,'POST');assert.equal(post.options.body,undefined);assert.deepEqual(post.options.headers,headers);assert.match(h.state[2],ack==='interested'?/Interesse enviado/:/já está confirmado/);h.blur();
});
for(const stage of ['auth','fetch','json','final-auth'])test('interest deadline releases visible pending state before '+stage+' settles',async()=>{
 const h=screen(stage);await h.pump();const pending=h.start();await h.pump();assert.deepEqual(h.state[5],[job.id]);h.expire();const expired={pending:[...h.state[5]],message:h.state[2]};assert.equal(h.calls.filter(c=>c.options.method==='POST').length,stage==='auth'?0:1);h.resume();await pending;assert.deepEqual(h.state[5],[]);assert.match(h.state[2],/Não foi possível confirmar/);assert.equal(h.calls.filter(c=>c.options.method==='POST').length,stage==='auth'?0:1);h.blur();assert.deepEqual(expired.pending,[]);assert.match(expired.message,/Não foi possível confirmar/);
});
```

---
## Preparação preservada INTEGRAL (PENDING abaixo é histórico)

## Ganhos: limpeza de recursos próprios no deadline existente

HEAD 90cca9dafa3067f65b3ebacc36edceffa86628c9 / tree d16d039ba48e5c5ccc379b75e48ade07fcc0a87f / parent MAIN 75105d42c873ca56b58fa1aa73cc4a682359e5c1.

18 novas regressões reais pré-JSX + helpers reais, baseline2PASS16FAIL →18GREEN;54focal(36controles anteriores intactos),18TZSãoPaulo,931mobileLOCALPASS. Apenas88chars no timeout de Ganhos: delete do controller capturado e remove do listener capturado; finally original idempotente. Reverse FULL5693chars MAIN exatos. Sem mudança de prazo, GET/headers, sessão/owner, parser/calendário/totais, retry manual, JSX/styles, API/SQL/RLS/ACL/deps/lock/workflows/build/smoke. Não RNrender/SecureStore/native/HTTPPG/heap/tenantleak/financeiro/produção proof. APK N/A FALSE.

Os seis normativos originais FULL preservados como prefixos INPLACE + apêndice; nota EARNINGS_CONTROLLER_CLEANUP_2026-10-18.md preserva FINAL582 completo16635chars. ALL9generatedblobs FULLremoteUTF8readbackEXACT/mode100644. Nenhum outro draftcopiado; tsconfigLOCALnão publicado.

OWNCI/APK PENDENTES:1521 esperados(145Web931mobile431API3CLI11monitor), não observados. Nenhum ready/merge até ownCI+APKSUCCESS no contexto correto, freshhead/base/diffreview e expectedSHA; pós-mergeCI/APK reais obrigatórios. Não CI rerun de produto porverde.

MAIN582JÁMERGED75105, POSTCI39143803021attempt2FAIL ECRquotaANTEScheckout (initial+UMA específica retryconsumida, não outra); POSTAPK39143802991SUCCESScheckoutLITERAL75105+verifiedZIP/individualAPK/BUILDINFO. MAINfullCIRED; rootbrowserintermitente não resolvido. Sóárea10técnicainternaaceita,12pendentes,não%code. Semprodução/custos/serviços/credenciais/provider/PSP/root/grants/RLSdisable/Activitymanualwrites.

### Registro funcional integral


---

## Ganhos — limpeza dos recursos próprios no prazo — 2026-10-18 18:55 UTC

Entrega funcional exclusiva dbdanielbaracho/MLIVRETRABALHO, base MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1/treecfac8574100022a5b576efade556920a7e282f0c. PR582 JÁ MERGED16:10:28Z; não repetir ready/merge. Recibo FINAL582 integral preservado em docs/evidencias/EARNINGS_CONTROLLER_CLEANUP_2026-10-18.md junto desta entrega; histórico normativo original permanece prefixo FULL no lugar, apêndice apenas.

Requisito→código→prova: área6 leitura Ganhos e áreas1/11/13 contexto/recursos/gates. O prazo de leitura15s já mostrava ERROR/— corretamente, mas controller expirado e listener próprio do focusSignal ficavam registrados até auth/fetch/JSON/auth final resolver. Não afirmar busy/loading eterno, heap exhaustion, vazamento tenant ou defeito financeiro/SQL. Nova regressão executa handler REAL Ganhos pré-JSX e helpers REAIS loadEarnings/runForSession, com hooks/auth/fetchJSON/clock e wrapper de AbortController/AbortSignal Node EXPLÍCITOS para observar listeners. Não render RN/native/SecureStore/HTTPPG/conta ou dinheiro real.

Antes18novos=2PASS16FAIL na fonte d08f4f9f9f10709130a1ab4af8a49f8367657fdd. Fix APENAS apps/mobile/app/ganhos.tsx acrescenta controllers.current.delete(controller) e focusSignal?.removeEventListener('abort',cancel) no callback do prazo existente após abort. Identidade controller/cancel capturada na closure; finally original permanece idempotente. Nenhum clear global ou aposentadoria de controller de outra leitura. Reverse FULL removendo somente88chars adicionados reconstrói5693chars MAIN byte-exatos (candidate5781chars). Nenhuma mudança em 15s, UI/JSX/styles, handlers de foco, guards requestId/generation/owner, parser/helper/date/totais/status, GET /earnings/mine/headers, política retry manual, API, SQL/RLS/ACL, sessionqueue, React19.1.4/RN0.81.6/deps/lock/workflows/build/smoke.

Nova apps/mobile/tests/earnings-controller-cleanup.test.mjs:18GREEN,54focal=[18new+28primary-read-deadline+8earnings]PASS,18TZAmerica/Sao_PauloPASS. FULL931mobile LOCAL=[913MAIN+18new]PASS/0fail-skip-cancel/Node24.19.0. Cobertura4stages ainda pendentes, listener e registry zerados antes da dependência resolver;2positivos JSONvazio/payable;4oldfinally vsNEWREAD mesmo foco;4oldtimer repetido vsNEWREAD/success mesmo foco;2blur/refocus;20tentativas EXPLÍCITAS transportependente, registry/listener bounded;1trocaowner/JSONtardio. ZeroPOST/retryautomático. Fixtures de callbacks antigos são adversariais, não evento RN/servidor real. Métodos e asserções dos36controles antigos byte-exatos. Nenhum código/fixture de drafts568574581575573571558572 copiado. Isolamento LOCAL restaurou7helpers MAIN e retirou6 cópias scratch de testes568 do glob (recuperáveis no PR568/next-audit/Git), não arquivos do repositório: primeira tentativa full local contaminada foi rejeitada; somente931 posterior atribuído. Tsconfig LOCAL adaptado não publicado.157de159blobs mobile existentes iguais exceto Ganhos e tsconfigLOCAL; este último não entra no commit.

Estado CI/APK da NOVA entrega PENDENTE nesta preparação.1521=[145Web931mobile431API3CLI11monitor]é apenas esperado, NÃO observado. APK N/A FALSE mobilealterado; ownCI+APKSUCCESS/headbasefresh/allpathsreview/expectedSHAONLY antes de merge, depois CI/APK REAIS no merge. Sem PASS emprestado. Falha infra/browser→primáriolog e frente independente, não rerun porverde. FINAL posterior no PRbody e próxima entrega funcional, nunca commit só status/autorreferência/imagens/atividade.

MAIN582 POST: CI39143803021 attempt2/job117759295057 FAILURE ECRquotaANTEScheckout18:50:43.1176973Z/52.6021549Z/58.7999293Z, Dockerpullfailed18:50:58.8101634Z. Initialattempt1/job117723430111 mesmaquota16:10:35.4776235Z/38.0780919Z/39.8340248Z; UMA retry específica já consumida, não outra. Todos produtosSKIPPED/semcheckoutCI/Chrome/HTTPPG/ProductionTruth/unitPOST, não emprestar own1503GREEN. POSTAPK39143802991/job117723429927 attempt1SUCCESS/actualcheckoutLITERAL75105 primary16:10:39.3955535Z/build16:21:09.7501762Z/installSuccess16:22:34.1093158Z/DEVICE_SMOKE_OK16:22:46.7334253ZwithoutMetro. Artifact12142183907/expires2026-11-01T16:22:47Z REALZIP28913032bytes/SHA2562d954eb6866fa782dedfc9fd5f74a18131ff1be942ea0151c99045b8078e93afAPIexact;individualAPK66162152bytes/SHA2568bd6c326090ea6bdaceb30f851cba9cddc6f1ffcd85e806be5a367f821c9af17/SHA256SUMSexact;BUILD_INFOliteral75105/releasefixedpackage/metrofalse/build16:21:10Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠matching/Ganhosform/SecureStore/physical/VisualTruth/prod. Mainstandalone técnico atual582POST75105 MAS MAIN FULLCIRED.

Browser: root intermitente558ERR_ABORTED NÃO resolvido; POST582 não executou Chrome, não observar novos aborts onde houve SKIP. Evidência568a563 primária anterior observou POSTjobsabort com24GET200 eZEROGETfalho, não restringir causa aos12GET nem inferir CORS/API/vendor/framework; nenhuma instrumentação558/zeroNav emprestada. Controles CDP/Fetchguard/CORS/sandbox/LNA/flags/prazos/asserts/images originais intactos.

Matriz: apenas área10Androidstandalone técnica interna aceita,12semaceiteintegral; não percentual código. Fechamento da área6 exige ledger/split/rollback/reembolso/saldo negativo+CI/evidências completos, NÃO satisfeito por limpeza UI. Externos215219220224228OPENfresh;Watch569CLOSEDcompleted,semmanualActivityissuewrites. Outros11drafts581575574573572571570568565560558preservados, ownCIred e APKsescopados, não rerunoldSHA/novaPRduplicada. Rotina únicaenabled/scheduleinalterados/novaautomação0/nãodesativarparcialtransientfimrodada. SemprodRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable. Próximo passo técnico: novoHEAD ownCI/APK e revisão completa; se bloqueado, auditar recurso de leitura independente com contrato/RED, não atividade artificial.


## FULL PR570 body anterior (11336chars, premerge histórico)

# PR570 — revisão pré-merge aprovada (2026-10-19T07:33UTC)

OWNAPK39215521357/job117938343951attempt1COMPLETESUCCESS/ZEROretry. Actualcheckout5f18dc792033e7425b5b0ef57f59a11f3b0fd544primary2026-10-19T07:22:10.7320009ZSINTÉTICOorderedparents[0e94,14421]/tree26dcigualcandidateGitconfirmed,NÃOHEADliteral. BUILD SUCCESSFUL07:30:07.7587549Z/installSuccess07:31:19.0914950Z/DEVICE_SMOKE_OK07:31:32.4098612ZwithoutMetro. Artifact12170070491expires2026-11-02T07:31:33Z REALdownloadZIP28913417bytes/SHA256e57cc0c89098bd335c72f7c6ff9ce087137b5523fc1689e89568567555ac53b1=APIexact/curlnormalexit0. APKindividual66162584bytes/SHA256cdd6401767447687b7ff2b640e8bdc0dc76d119b2a044976f788c61cc9e7c751=SHA256SUMS;BUILDINFOliteral5f18/release/packagefixo/metrofalse/build07:30:08Z. ActualmanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480IGUALbaselineidentificado(min24target36);não reinterpretação binária nova de SDK. ZIP≠APK/installlaunch≠Substituicoesform/SecureStore/nativequeue/physical/VisualTruth/prod.170inputsidenticalold6ebNÃOautorizouemprestaroldAPK;NOVOgateeNOVOSbytesverificados.

OWNCI39215521464attempt1SUCCESS1686+HTTPPG/browser8journey/ProductionTruthPASS07:25:56.9436350Z. Freshmain/base0e94/head14421/ALL23pathsSHAmode100644+2checksSUCCESS;APKAPLICÁVELcomsucesso próprio acima. Pronto paraREADYONCE/MERGEEXPECTED14421ONCE;PÓS-MERGEaindaNÃOobservado nesta preparação. Sem novo aceite integral de área5/7/11,nenhumroot558fixalegado.

## FULL CI/LOCAL/preparação históricos preservados

# PR570 — CI aprovado, APK pendente (2026-10-19T07:28UTC)

Own CI39215521464/job117938343953attempt1COMPLETEDSUCCESS/ZEROretry.1686=[145Web1041mobile486API3CLI11monitor]0fail-skip-cancel/typecheck/build/exportAndroid/migrationrunner2x/privacyretentionlegalhold/HTTPAPI+PG/ProductionTruthPASS2026-10-19T07:25:56.9436350Z.4newcanônicoscompiledok303..30607:23:54.5451715Z..5455148Z. Actualcheckout5f18dc792033e7425b5b0ef57f59a11f3b0fd544primary07:22:29.2836451ZSINTÉTICOorderedparents[main0e94,14421]/tree26dc4e7a59ad4123fcd8f0175ca4e9ba827aaaa4IGUALcandidateGitconfirmed,NÃOliteralHEAD. ECRRECOVERY07:22:21.4456986ZnãoquotaGLOBALresolvida.
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34primary07:25:02.2196538Z;503CONTROLADOconsumido+11realGET→human12NEWGET/team1/zeroextraPOSTPASS07:25:05.0863075Z;8journeyPASS07:25:05.6690258Zinclnewdocreload/signout201/revokedbrowser401/otherSAMEidentityvalid/Bisolated. Comparado à BASE MAIN0e94, web/APIruntime/config de segurança são idênticos; comparado ao PAI6eb,14421trazDatabaseService371c via integração MAIN;essePASSnãoresolveROOT558 e NÃOemprestaPASSàMAIN0e94POSTRED.5capturessómetadata/log,nãovisuaisGit/nãoVisualTruth/nativeproof;nenhumaguardaCORS/CDPFetch/sandbox/LNA/deadline/assertenfraquecida.
APK39215521357/job117938343951attempt1aindaBuildIN_PROGRESSnestaobservação07:28UTC. Nenhumfinalbuild/install/DEVICE_SMOKE/artifactbytes/actualAPKcheckoutatribuído.APKN/AfalsePRcumulativamobilealterada.Provaexata: 170insumoscanonicalAPK(SHA/modos)IGUAISold6eb,masNÃOfingeAPKbyteigual,nãoemprestaoldCI/APK,nãopulaNOVOrun. CIgreenNÃOautorizamergeantesAPKSUCCESS+artifactreceipt. Nenhumready/merge/rerun/cancel.

## FULL intermediário/preparação preservados

# PR570 — candidato em validação, 2026-10-19T07:25Z

CI39215521464/job117938343953attempt1 em execução: typecheck/build/export/unit/migration/privacy stepsSUCCESS, HTTPjourney/ProductionTruthaindarunning.1686continua apenasESPERADO até logs terminais observados. Nenhumretry/cancel/ready/merge. APK39215521357/job117938343951attempt1Buildstandaloneinprogress,8smokegateunit≠install/nativePASS;semartifact/BUILDINFO/checkoutAPKatribuidosnestecheckpoint. APKA aplicável;nãoemprestar6eb.

## Provas locais adicionais, fora da contagemCI

FULLmobile1041PASS agoraUTC eSaoPaulo,zero fail/skip/cancel;141focalUTC/SP. API23focalUTC/SP. MutanteLOCALapenasdisableclientdiscard preservaerroprimário:19oldPASS/23expanded20PASS3FAIL;provaoráculoextra para resourceownership, não produto publicado. Runner reproduzível LOCAL, arquivoapi-sources.json na notaGit:

```js
const fs=require('node:fs');const read=fs.readFileSync;fs.readFileSync=function(path,...args){const value=read.call(this,path,...args);if(String(path).endsWith('/api-sources.json')){const raw=JSON.parse(String(value));raw.db=raw.db.replaceAll('client.release(true)','client.release()');return JSON.stringify(raw);}return value;};require('./run-api.cjs');

```

node --test run-discard-mutant.cjs (20PASS3FAILesperados). Não alteraDBruntimeGit/19oldbodies/asserts.

## Frente independente Ganhos — reaproveitamento identificado, não testes novos

```json
{
  "scope": "LOCAL isolated independent area6 read resource ownership; reused existing draft584 test, NOT new test/CI count/copy into570",
  "main": "0e94fcc9c9442a36d51844881ce236e6e3edd537",
  "mainSources": [
    {
      "path": "apps/mobile/app/ganhos.tsx",
      "sha": "d08f4f9f9f10709130a1ab4af8a49f8367657fdd"
    },
    {
      "path": "apps/mobile/lib/earnings.ts",
      "sha": "9afe1a24109c42ad4825eeda40ff1dcef164e84c"
    },
    {
      "path": "apps/mobile/lib/session-context.ts",
      "sha": "8a23f577cf222016694d6995822b632c0a71434f"
    }
  ],
  "candidateApp": "79ae7e2b6225da08eac0d100ee71ab8639165755",
  "test": "6cbf6645bfd2b7e36eda1e260c67a9ec1905f43f",
  "mainResult": "2PASS16FAIL",
  "draft584Result": "18PASS",
  "notClaims": [
    "UIbusywasstuck",
    "heapexhaustion",
    "financialSQL",
    "native",
    "SecureStore",
    "HTTPPG"
  ]
}
```

Reexecutou18testesexistentes584emdoisdiretóriosisolados com appMAIN vs app584,actualpréJSX+REALloadEarnings/runForSession/hooks/timers/auth/fetchJSON+trackedAbortSignal. MAINcontinuaERROR/—corretos masretémcontroller/listeneratédependênciaresolver;candidate584liberaambosnoexisting15s.Semnovoappfixnessaauditoria;NÃOpublish/CIcount/não18parte1041/486/1686. Copiarquatroarquivosidentificadosparacadafixtureerodar node --test tests/earnings-controller-cleanup.test.mjs;2PASS16FAILMAIN/18PASS584. Guardar escoposeparado, não contaminar glob570. PR584éfrentefuncionalexistenteparapróximaintegração legítima,se570gatesbloquearem;nãonovaPRduplicada/nãorepetirCIold90ccbudgetconsumido.

## FULL preparação publicada preservada

# Integração funcional: substituições + transação atual

## REPLACEMENT_MAIN_TRANSACTION_INTEGRATION — 2026-10-19T07:21Z
Entrega funcional no MESMO PR570: integração normal de MAIN0e94fcc9c9442a36d51844881ce236e6e3edd537 no HEAD6eb1b7aad525069474447139f11fa873a2692049 (pais ordenados old570,MAIN; semforce/novaPR), trazendo DatabaseService371c1615e95271f5484de3e8bca883481d4e845f jáintegrado575. Runtime570Substituicoes e2cf5a9af0d4cfc6755fd857cf6de91f30c45b80/helper7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6. Escopo preciso:8paths herdados não-docs = APIreplacement-input19casos+appSubstituicoes+helper+company-replacements13casos+4screenfiles27MATCH/36CREATE/40SELECT/23READ, TODOS blobs BYTE EXATOS antigos570, sem nova mudança de tela/helper/parser. Old570SÓcalendarvalidator+2testes,nãotenant/ACKfix; correção histórica preservada.
Requisito áreas5/7/11: não perder erro primário nem fabricar ACKmatched se INSERTassignment/INSERTnotification/COMMITfalha e ROLLBACKtambémfalha.4NEWcanônicos apps/api/src/replacement-transaction-boundary.controller.test.ts (3faultstages+1COMMITsuccesscontrol), actualFULLReplacementController809c27f1551c103adc9e6950f79555eb42d3b7db +actualDatabaseService.tenant371c; tenant SQL/roles/contextparams/trustedrecipient preservados. SAMEError/ACKundefined/1connect/release(true)uma vez/onlyROLLBACKdepoisfailure/noretryautomatic;successACKbindingssóapósCOMMIT+releaseordinary. OldDB8df2bf19d7cf60c0b92889d7b1a3fc8a12e51f9c do570baseline1PASS3FAIL→newDB4GREEN.23focalAPI LOCALPASSUTC/SP=[19old+4new],zero fail/skip/cancel. Imports/decoratorsNestremovidosSÓadaptadorLOCAL+FixtureExceptions+UnusedPool, candidato usa importsREAIS. Não LOCALcanonicaltypecheck/NestHTTP/PGpool/RLSenforcement/SQLrollback/notificationdelivery/provider/nativeproof. Controller+SQL+DBserviceprodutoNÃOalteradosporhipótese;novoTESTEcompostoprova dependência real da integração575.
Mobileisolado163pathsFULLGitfetched; scratchtransportacrescentou1LFemcadaarquivo, verifierremoveSÓesseLFemmemória e comprova163GitSHAsBYTEEXATOS. NenhumLFscratch/tsconfigadaptadopublicado;FULL1041LOCALPASS[913MAIN+128570]/82canonicaltestpaths,141focalPASSUTC/SP[13helper+2ACKUUID+27MATCH+36CREATE+40SELECT+23READ]. ScopepréJSX/hooks/helpers/auth/fetchJSON/timersexplícitos, NÃOReactRNrender/SecureStore/HTTPPG/native/heap/leak/prod. Nenhumdraft568/584/585produto/testcopiado.
CI completo obrigatório novo HEAD PENDING nesta preparação; esperado1686=[145Web1041mobile486API3CLI11monitor] apenasESPERADO,nãoexecutado. APK APLICÁVEL integral por app/helper mobile cumulativos; filtroStandalone+canonicalExpo mobile→Gradleinalterado, exigirsucesso/checkoutexato/artifactREALZIPvsAPK/SHA256SUMS/BUILDINFO/installDEVICE_SMOKEsemMetro no NOVO HEAD. NuncaemprestarAPK6eb(39178536098SUCCESS). Não ready/merge enquantoCI/APKpending/red.
MAIN0e94POST39207199782a1FAILbrowser após1549unitPASS,12GETabortnaatualizaçãomanualAPÓS503controladoconsumido+11GET200/47GET200total,ANTESreload. ZEROretryproduct,nãorerun0e94/old6ebparaverde. Own57539206661234a2SUCCESS1549+fullHTTPPG/browser/ProductionTruth;ONEinfraretryconsumidaHISTÓRIA,nãorepetirmerge575/586/587/576/578/579/582. FullFINAL57563789chars e FULLold57018155chars preservados INTEGRAIS nota nova docs/evidencias/REPLACEMENT_MAIN_TRANSACTION_INTEGRATION_2026-10-19.md. PrepPENDINGhistória, resultados terminais emPRmetadata+próximaentregaFUNCIONAL, semstatus/selfref/image/activitycommit.
6FULLoriginais570prefixINPLACE+FULLMAINmissingtailappenddesdeúltimocomumendline;manifestoffsets/SHAs comprova FULLMAINreconstruívelBYTEEXATO,prefixMAINnãocontíguoquandodivergiu. DelegaçãoaceiteusuáriojáFULLnoMAINtail preservada6norms; semesperarhumano/CONTINUAR. Só10AndroidstandaloneTÉCNICAINTERNOaceita12pending,não%code/nenhumaceitenovo porcontagem.
MantidosReact19.1.4/RN0.81.6/depslock/workflows/buildsmoke/tenantRLS/ACLprivacidade/SQL/payload/UUIDACK/manualpolicy/segurançaCDPFetchguardCORSsandboxLNAflagsdeadlinesasserts. Semprodução/serviçoscustos/RailwayNeon/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable.
Próximo: publicarFFnormalexpected6eb,não duplicarPR;observarCI/APKprópriosactualcheckoutliteral/sintético+Gitparents/tree;seALLSUCCESSreviewfreshMAIN/base/head/ALLpathsSHAmodos e mergeexpectedSHAONCE+POSTCIAPKreais. Sebloqueado,registrologprimário e avançaoutroitemindependente,não rerunproduct/browser paraverde. Correlacionarnovas12GETfalhas comfaseexata sem inferircausaAPI/CORS/vendor/framework/ausênciaCOMMIT/root nememprestartrace5580Nav.

## Publicado

HEAD `14421f0c0ee76f5ed24684aa53c39b776f774269`; tree `26dc4e7a59ad4123fcd8f0175ca4e9ba827aaaa4`; orderedparents `6eb1b7aad525069474447139f11fa873a2692049`,`0e94fcc9c9442a36d51844881ce236e6e3edd537`. 23pathsSHA100644revistos;8novosFULLUTF8blobsremote/readbackEXACT+15herdados570reutilizados. 1257/1267existingMAINblobs+modesiguais;497/501existingMAINnon-docsiguaisfora4paths (3mobile/code-test+1APItest). DatabaseService+ReplacementController/MainAPI/RLS/deps/workflowsintactos. CI/APK próprioPENDING, nenhumready/merge/rerun. APK6ebnãoéAPKnovoHEAD.


## Manifesto mobile atual usado nos testes locais
```json
[
  {
    "path": "apps/mobile/app.json",
    "mode": "100644",
    "type": "blob",
    "sha": "77f1007b792ee4fa2d10dd5e5a8316762467ef8e",
    "size": 565,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/77f1007b792ee4fa2d10dd5e5a8316762467ef8e"
  },
  {
    "path": "apps/mobile/app/_layout.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "d75f4a26218d1c1fdfacef46b08fd2d2babaa05a",
    "size": 138,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d75f4a26218d1c1fdfacef46b08fd2d2babaa05a"
  },
  {
    "path": "apps/mobile/app/agenda.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "764dcb964bdf79ae0337d6ae5a59cdc030e48a77",
    "size": 13290,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/764dcb964bdf79ae0337d6ae5a59cdc030e48a77"
  },
  {
    "path": "apps/mobile/app/analytics.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "aff479659db2976acd7b3e0923e991b36273fce7",
    "size": 4707,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/aff479659db2976acd7b3e0923e991b36273fce7"
  },
  {
    "path": "apps/mobile/app/candidatos.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "e5f68ec17a307d71d0c115e191c3be480e24cd6b",
    "size": 11617,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e5f68ec17a307d71d0c115e191c3be480e24cd6b"
  },
  {
    "path": "apps/mobile/app/casos-seguranca.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "b4e3ccafaa50d4cfad34733f12820008289b68ec",
    "size": 10560,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b4e3ccafaa50d4cfad34733f12820008289b68ec"
  },
  {
    "path": "apps/mobile/app/conversa.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "a299f0221c79b7b1b4166b90ef7e18c2a729eb3b",
    "size": 7932,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/a299f0221c79b7b1b4166b90ef7e18c2a729eb3b"
  },
  {
    "path": "apps/mobile/app/copilot.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "ecc9ca4ecafbdd5131c30e130ba0075c6d8d5526",
    "size": 6196,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ecc9ca4ecafbdd5131c30e130ba0075c6d8d5526"
  },
  {
    "path": "apps/mobile/app/criar-conta.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "fba0cb3416b9cb538867fd7d542d3b9c118ce169",
    "size": 7110,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/fba0cb3416b9cb538867fd7d542d3b9c118ce169"
  },
  {
    "path": "apps/mobile/app/disponibilidade.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "b4eb4736896148baec684b1b4ea6a5009919696e",
    "size": 5532,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b4eb4736896148baec684b1b4ea6a5009919696e"
  },
  {
    "path": "apps/mobile/app/empresa-conta.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "20c37cc92957e7bdb245e494d240dfcd40ebab80",
    "size": 4539,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/20c37cc92957e7bdb245e494d240dfcd40ebab80"
  },
  {
    "path": "apps/mobile/app/empresa-inicio.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "714095ed78b6669a42750d0ac54fbb861e354501",
    "size": 15680,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/714095ed78b6669a42750d0ac54fbb861e354501"
  },
  {
    "path": "apps/mobile/app/empresa-notificacoes.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "f42c24a684a943e4b3f07dfa0e6c7c533aa36b11",
    "size": 157,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/f42c24a684a943e4b3f07dfa0e6c7c533aa36b11"
  },
  {
    "path": "apps/mobile/app/empresa.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "b34777148cfab0b167f1d4d6b61777e44a087900",
    "size": 10136,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b34777148cfab0b167f1d4d6b61777e44a087900"
  },
  {
    "path": "apps/mobile/app/entrar.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "ec7c7914f5f2f310e905bff8b81103c4be433357",
    "size": 4877,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ec7c7914f5f2f310e905bff8b81103c4be433357"
  },
  {
    "path": "apps/mobile/app/equipes.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "f7c6eacb4d951d37487473fc6572271ccefd31cb",
    "size": 18136,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/f7c6eacb4d951d37487473fc6572271ccefd31cb"
  },
  {
    "path": "apps/mobile/app/ganhos.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "d08f4f9f9f10709130a1ab4af8a49f8367657fdd",
    "size": 5710,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d08f4f9f9f10709130a1ab4af8a49f8367657fdd"
  },
  {
    "path": "apps/mobile/app/index.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "51d033d5ece17312b141da28ead40ecdfdf56705",
    "size": 2857,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/51d033d5ece17312b141da28ead40ecdfdf56705"
  },
  {
    "path": "apps/mobile/app/membros.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "4b6140a7349049dd704bbb079f16de06d6be7589",
    "size": 15544,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/4b6140a7349049dd704bbb079f16de06d6be7589"
  },
  {
    "path": "apps/mobile/app/notificacoes.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "5b92e71991bfa02a0be73bfd3dd1debf31a446c1",
    "size": 142,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/5b92e71991bfa02a0be73bfd3dd1debf31a446c1"
  },
  {
    "path": "apps/mobile/app/pagamentos.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "e2b3b16937945d11c0d45c31c9eff13a2cf0b96f",
    "size": 3628,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e2b3b16937945d11c0d45c31c9eff13a2cf0b96f"
  },
  {
    "path": "apps/mobile/app/perfil.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "c492039ee8542f513e6a148ba18a94671f54332c",
    "size": 14545,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/c492039ee8542f513e6a148ba18a94671f54332c"
  },
  {
    "path": "apps/mobile/app/planejamento.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "356460ad4b0a546fbd6b7ca5cf9650568e973c02",
    "size": 4582,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/356460ad4b0a546fbd6b7ca5cf9650568e973c02"
  },
  {
    "path": "apps/mobile/app/privacidade.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "c3ac45ef5005aac68491f117e48b9af104748fa9",
    "size": 13445,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/c3ac45ef5005aac68491f117e48b9af104748fa9"
  },
  {
    "path": "apps/mobile/app/profissional-inicio.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "a71b7c6ba11bf4cd35a6996448dda71ee598e731",
    "size": 9732,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/a71b7c6ba11bf4cd35a6996448dda71ee598e731"
  },
  {
    "path": "apps/mobile/app/seguranca.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "bbd76fdb4dfa7d764b4e29942b47d58368be2223",
    "size": 14035,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/bbd76fdb4dfa7d764b4e29942b47d58368be2223"
  },
  {
    "path": "apps/mobile/app/substituicoes.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "e2cf5a9af0d4cfc6755fd857cf6de91f30c45b80",
    "size": 11800,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e2cf5a9af0d4cfc6755fd857cf6de91f30c45b80"
  },
  {
    "path": "apps/mobile/app/talentos.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "87872556f34ee09519f739c33a404322f1e677db",
    "size": 5838,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/87872556f34ee09519f739c33a404322f1e677db"
  },
  {
    "path": "apps/mobile/app/trabalhos.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "a0f7fab92434aa1d7e8d8fb22e8766991b5f04d4",
    "size": 8273,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/a0f7fab92434aa1d7e8d8fb22e8766991b5f04d4"
  },
  {
    "path": "apps/mobile/components/CompanyNav.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "8f54ab81505b317b8d64a7d1ea301d4c8ee2cc12",
    "size": 1191,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/8f54ab81505b317b8d64a7d1ea301d4c8ee2cc12"
  },
  {
    "path": "apps/mobile/components/DeclaredCapabilities.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "8086dc0d623e6d1137fb821c9f5f9c1a07c70b67",
    "size": 3509,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/8086dc0d623e6d1137fb821c9f5f9c1a07c70b67"
  },
  {
    "path": "apps/mobile/components/GeneralSupport.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "344b2d82c2172af1f164649fdf2c9fa69400e265",
    "size": 6914,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/344b2d82c2172af1f164649fdf2c9fa69400e265"
  },
  {
    "path": "apps/mobile/components/NotificationsScreen.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "ea7dd8efc958c28730675ad8d6cc2bddc45067f2",
    "size": 5969,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ea7dd8efc958c28730675ad8d6cc2bddc45067f2"
  },
  {
    "path": "apps/mobile/components/ProfessionalNav.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "5c09010eea757e92c7dfc42bd7adeff1119c7380",
    "size": 1201,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/5c09010eea757e92c7dfc42bd7adeff1119c7380"
  },
  {
    "path": "apps/mobile/components/SupportHistory.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "e99f37d6bdda66825e346f23b2f2c2fa2f6ee0f8",
    "size": 7189,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e99f37d6bdda66825e346f23b2f2c2fa2f6ee0f8"
  },
  {
    "path": "apps/mobile/components/SupportRecovery.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "919d24e9a2548703d4991f5c68a437ed9041e219",
    "size": 2357,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/919d24e9a2548703d4991f5c68a437ed9041e219"
  },
  {
    "path": "apps/mobile/components/SupportRequest.tsx",
    "mode": "100644",
    "type": "blob",
    "sha": "73827cddcfb0192f5fbd38f6b215cfc9c32f47bd",
    "size": 10250,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/73827cddcfb0192f5fbd38f6b215cfc9c32f47bd"
  },
  {
    "path": "apps/mobile/eas.json",
    "mode": "100644",
    "type": "blob",
    "sha": "fb64fcbd42deff7361ad26d1b7cd2fd06fd6a15f",
    "size": 277,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/fb64fcbd42deff7361ad26d1b7cd2fd06fd6a15f"
  },
  {
    "path": "apps/mobile/lib/agenda.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "48d3e08ae4e5ac1f4948c20549a330cc042a01ce",
    "size": 5155,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/48d3e08ae4e5ac1f4948c20549a330cc042a01ce"
  },
  {
    "path": "apps/mobile/lib/api.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "46cf48a5fb37257af90aceb816b3791e6b1c3c7a",
    "size": 315,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/46cf48a5fb37257af90aceb816b3791e6b1c3c7a"
  },
  {
    "path": "apps/mobile/lib/availability-submit.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "439c05f2810b43d067ad04f5ad504d48956ef9bf",
    "size": 1727,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/439c05f2810b43d067ad04f5ad504d48956ef9bf"
  },
  {
    "path": "apps/mobile/lib/availability-window.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "7b46379568f19b2c13b32df292685af647463534",
    "size": 885,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/7b46379568f19b2c13b32df292685af647463534"
  },
  {
    "path": "apps/mobile/lib/bootstrap.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "7aaecdbc168f9486500afc91d045b5ca881806fd",
    "size": 358,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/7aaecdbc168f9486500afc91d045b5ca881806fd"
  },
  {
    "path": "apps/mobile/lib/company-analytics.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "28f59c89ccf1d35e114daa93cb3ef39da418c6a9",
    "size": 1708,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/28f59c89ccf1d35e114daa93cb3ef39da418c6a9"
  },
  {
    "path": "apps/mobile/lib/company-candidates.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "d042f8221b70cca7c984138d941f185d94c89ba5",
    "size": 3709,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d042f8221b70cca7c984138d941f185d94c89ba5"
  },
  {
    "path": "apps/mobile/lib/company-dashboard-actions.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "42419db9d1971ba02b46047a572c79b3f8eef041",
    "size": 2434,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/42419db9d1971ba02b46047a572c79b3f8eef041"
  },
  {
    "path": "apps/mobile/lib/company-dashboard.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "a865a546c903520964a807f488a5ec4114e9bbe8",
    "size": 3204,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/a865a546c903520964a807f488a5ec4114e9bbe8"
  },
  {
    "path": "apps/mobile/lib/company-job-publication.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "64adbe75cb72f51a27916de73dbe55f5e3467cf0",
    "size": 1169,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/64adbe75cb72f51a27916de73dbe55f5e3467cf0"
  },
  {
    "path": "apps/mobile/lib/company-members.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "55d431da21ae03722ec210e15ed1128f0dffdd8d",
    "size": 4101,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/55d431da21ae03722ec210e15ed1128f0dffdd8d"
  },
  {
    "path": "apps/mobile/lib/company-readonly.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "4ec7f5151134f4ea11b09f2ce55dfd2a5cdd22d0",
    "size": 2964,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/4ec7f5151134f4ea11b09f2ce55dfd2a5cdd22d0"
  },
  {
    "path": "apps/mobile/lib/company-replacements.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6",
    "size": 5099,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6"
  },
  {
    "path": "apps/mobile/lib/company-safety.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "5ab736715ffd3dc5ff83decc0739bf8c95276089",
    "size": 3960,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/5ab736715ffd3dc5ff83decc0739bf8c95276089"
  },
  {
    "path": "apps/mobile/lib/company-talents.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "55f07c1e950a5f13036238ac6e1579e971a6aaba",
    "size": 1611,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/55f07c1e950a5f13036238ac6e1579e971a6aaba"
  },
  {
    "path": "apps/mobile/lib/conversation.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "2f938939e2bbe3dd9f4445da57818fb3a7bf307c",
    "size": 2157,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/2f938939e2bbe3dd9f4445da57818fb3a7bf307c"
  },
  {
    "path": "apps/mobile/lib/copilot-response.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "856d4d5210972be202e7502f6c9c3281b50adc43",
    "size": 2426,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/856d4d5210972be202e7502f6c9c3281b50adc43"
  },
  {
    "path": "apps/mobile/lib/earnings.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "9afe1a24109c42ad4825eeda40ff1dcef164e84c",
    "size": 1998,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/9afe1a24109c42ad4825eeda40ff1dcef164e84c"
  },
  {
    "path": "apps/mobile/lib/home-cards.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "d6e4ccf9d71ab072e01e3b2915558a6586edec36",
    "size": 2403,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d6e4ccf9d71ab072e01e3b2915558a6586edec36"
  },
  {
    "path": "apps/mobile/lib/jobs.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "54d0814ace6e91565e0fa9c8722ea734594b015f",
    "size": 1792,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/54d0814ace6e91565e0fa9c8722ea734594b015f"
  },
  {
    "path": "apps/mobile/lib/notifications.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "3928db3607370a459eca506a1610671d6c655bee",
    "size": 2808,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/3928db3607370a459eca506a1610671d6c655bee"
  },
  {
    "path": "apps/mobile/lib/passport-history.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "e72f0ce1df88d4624ba78295b87ff861493fdda6",
    "size": 939,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e72f0ce1df88d4624ba78295b87ff861493fdda6"
  },
  {
    "path": "apps/mobile/lib/privacy-actions.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "e116dec3da68da1e41b666c7d3e8739a6d4ac5a7",
    "size": 4483,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e116dec3da68da1e41b666c7d3e8739a6d4ac5a7"
  },
  {
    "path": "apps/mobile/lib/privacy-requests.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "3f69d87acd77d803bc0394ce412b3e85213d8b97",
    "size": 1654,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/3f69d87acd77d803bc0394ce412b3e85213d8b97"
  },
  {
    "path": "apps/mobile/lib/professional-capabilities.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "e3ef307eaaa4a3755eda2f9f30b652bca1d5550b",
    "size": 1799,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e3ef307eaaa4a3755eda2f9f30b652bca1d5550b"
  },
  {
    "path": "apps/mobile/lib/professional-home.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "ca9e396fceec67ad5b9fe99965a1479bc9a9d0f0",
    "size": 6193,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ca9e396fceec67ad5b9fe99965a1479bc9a9d0f0"
  },
  {
    "path": "apps/mobile/lib/professional-profile.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "c33dce25b0de5ab42512c846b2418895b92178de",
    "size": 3509,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/c33dce25b0de5ab42512c846b2418895b92178de"
  },
  {
    "path": "apps/mobile/lib/professional-safety.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "123e637dc1019e9fece11a64d5f5257bb4d6e3c9",
    "size": 5109,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/123e637dc1019e9fece11a64d5f5257bb4d6e3c9"
  },
  {
    "path": "apps/mobile/lib/professional-support.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "9d658302262fb48ff56e7e80dbf5bbd660c08f7d",
    "size": 1756,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/9d658302262fb48ff56e7e80dbf5bbd660c08f7d"
  },
  {
    "path": "apps/mobile/lib/profile-submit.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "7ff33c6e83c858577f6d0a31aa1fd6914b4cd609",
    "size": 1462,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/7ff33c6e83c858577f6d0a31aa1fd6914b4cd609"
  },
  {
    "path": "apps/mobile/lib/session-context.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "8a23f577cf222016694d6995822b632c0a71434f",
    "size": 1301,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/8a23f577cf222016694d6995822b632c0a71434f"
  },
  {
    "path": "apps/mobile/lib/session-transaction.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "d10eb3b0ce05326947aa216d30db2571d1501dc8",
    "size": 2312,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d10eb3b0ce05326947aa216d30db2571d1501dc8"
  },
  {
    "path": "apps/mobile/lib/session.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "d99f5ad3cf53331aa55be0a2d38ac9a2fc4004a7",
    "size": 3378,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d99f5ad3cf53331aa55be0a2d38ac9a2fc4004a7"
  },
  {
    "path": "apps/mobile/lib/signin.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "453de55dfc31d983fc8e279b8c91104913a927b0",
    "size": 1555,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/453de55dfc31d983fc8e279b8c91104913a927b0"
  },
  {
    "path": "apps/mobile/lib/signup.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "800faeb27d041108ab7c1c9018f749c32d2a0010",
    "size": 2419,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/800faeb27d041108ab7c1c9018f749c32d2a0010"
  },
  {
    "path": "apps/mobile/lib/startup-route.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "b8cbb6fcbb50b3d592d077b5c31db3f155ec8fff",
    "size": 909,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b8cbb6fcbb50b3d592d077b5c31db3f155ec8fff"
  },
  {
    "path": "apps/mobile/lib/support-contexts.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "61df65a69aca6acae2d1575304f5ed4191470ca7",
    "size": 1269,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/61df65a69aca6acae2d1575304f5ed4191470ca7"
  },
  {
    "path": "apps/mobile/lib/support-intent-storage.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "b266454649a7658b5231207edaec7e269e9da8b9",
    "size": 614,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b266454649a7658b5231207edaec7e269e9da8b9"
  },
  {
    "path": "apps/mobile/lib/support-intent.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "b354782179a81e90a9662167aafb8704564334af",
    "size": 6576,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b354782179a81e90a9662167aafb8704564334af"
  },
  {
    "path": "apps/mobile/lib/support-submission.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "be61cef11a2033fc0bca2899b518efcd56022839",
    "size": 7414,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/be61cef11a2033fc0bca2899b518efcd56022839"
  },
  {
    "path": "apps/mobile/lib/teams.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "eeeab168bfb62c62f2552d28bd6600ae23adada1",
    "size": 5185,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/eeeab168bfb62c62f2552d28bd6600ae23adada1"
  },
  {
    "path": "apps/mobile/package.json",
    "mode": "100644",
    "type": "blob",
    "sha": "e1646b540a738daa81828a71f00617a7714fad6f",
    "size": 753,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e1646b540a738daa81828a71f00617a7714fad6f"
  },
  {
    "path": "apps/mobile/tests/agenda-actions.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "1e1964cc18cbabe419c8b70a5b4e9c8f2a9ed366",
    "size": 6121,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/1e1964cc18cbabe419c8b70a5b4e9c8f2a9ed366"
  },
  {
    "path": "apps/mobile/tests/agenda-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "9419980016590846a43daeb7c9ebc719ed8231e9",
    "size": 5156,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/9419980016590846a43daeb7c9ebc719ed8231e9"
  },
  {
    "path": "apps/mobile/tests/agenda-support-screen.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "ff7f91eb8ae8d15aa440707a6909ae9c97a3308d",
    "size": 5050,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ff7f91eb8ae8d15aa440707a6909ae9c97a3308d"
  },
  {
    "path": "apps/mobile/tests/agenda.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "934aa0350620a8e0b85fc63db9bbed110c2b4854",
    "size": 3871,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/934aa0350620a8e0b85fc63db9bbed110c2b4854"
  },
  {
    "path": "apps/mobile/tests/availability-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "0f5607ef3750c788a7657dbac299bc6afd3e8777",
    "size": 8018,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/0f5607ef3750c788a7657dbac299bc6afd3e8777"
  },
  {
    "path": "apps/mobile/tests/availability-submit.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "340ceb0dbb8a7f5e0e502514279997df0fc9cc9c",
    "size": 4672,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/340ceb0dbb8a7f5e0e502514279997df0fc9cc9c"
  },
  {
    "path": "apps/mobile/tests/availability-window.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "8796c551a1db8fc8ea9687e6cab57542ec750d73",
    "size": 1315,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/8796c551a1db8fc8ea9687e6cab57542ec750d73"
  },
  {
    "path": "apps/mobile/tests/candidate-confirm-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "1da09eeb72786d7553c2caf8828f6ef4d56bd108",
    "size": 10489,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/1da09eeb72786d7553c2caf8828f6ef4d56bd108"
  },
  {
    "path": "apps/mobile/tests/candidate-confirm-session-guard.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "81e44156aa9630e3842b92af33428a686b1a7928",
    "size": 6458,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/81e44156aa9630e3842b92af33428a686b1a7928"
  },
  {
    "path": "apps/mobile/tests/candidates-expired-read.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "6ea6740b371d48521829c2b3c003bfa7887b9391",
    "size": 4677,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/6ea6740b371d48521829c2b3c003bfa7887b9391"
  },
  {
    "path": "apps/mobile/tests/candidates-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "0bc2846acc7dad856994cdfdacf583b07b5d8f89",
    "size": 6830,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/0bc2846acc7dad856994cdfdacf583b07b5d8f89"
  },
  {
    "path": "apps/mobile/tests/company-analytics.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "1ea2952808f7aa44731918bca8f4554ac26fee5a",
    "size": 2650,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/1ea2952808f7aa44731918bca8f4554ac26fee5a"
  },
  {
    "path": "apps/mobile/tests/company-candidates.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "e37d04a92b8df9999369d2c984419141541c762b",
    "size": 4614,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e37d04a92b8df9999369d2c984419141541c762b"
  },
  {
    "path": "apps/mobile/tests/company-dashboard-actions.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "01cd94d601274d78940c7cc30003830ca9ca8a53",
    "size": 5351,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/01cd94d601274d78940c7cc30003830ca9ca8a53"
  },
  {
    "path": "apps/mobile/tests/company-dashboard.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "6c5a7a3c1dc0df2bc505756a88991e7ad4e6ac9a",
    "size": 6929,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/6c5a7a3c1dc0df2bc505756a88991e7ad4e6ac9a"
  },
  {
    "path": "apps/mobile/tests/company-job-publication.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "0f4437a3555309b6599976aec9c31a5b692d97b0",
    "size": 3398,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/0f4437a3555309b6599976aec9c31a5b692d97b0"
  },
  {
    "path": "apps/mobile/tests/company-members.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "9897a83bd52a3a19c3bdf4f940a787edc397253a",
    "size": 6685,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/9897a83bd52a3a19c3bdf4f940a787edc397253a"
  },
  {
    "path": "apps/mobile/tests/company-publication-context-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "010543d05c7716ad3cb4cfc48567f220086c4ae3",
    "size": 4391,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/010543d05c7716ad3cb4cfc48567f220086c4ae3"
  },
  {
    "path": "apps/mobile/tests/company-readonly.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "1b1d09278a6b6321a90852bccd20582037e7b2ed",
    "size": 5571,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/1b1d09278a6b6321a90852bccd20582037e7b2ed"
  },
  {
    "path": "apps/mobile/tests/company-replacement-ack-uuid.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "a53cd57ec830d2c6faf7667c954c5dbf267f7776",
    "size": 2498,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/a53cd57ec830d2c6faf7667c954c5dbf267f7776"
  },
  {
    "path": "apps/mobile/tests/company-replacements.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "456bdc4dd6a3ca86e36e7289b1d39eb960342833",
    "size": 8677,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/456bdc4dd6a3ca86e36e7289b1d39eb960342833"
  },
  {
    "path": "apps/mobile/tests/company-safety.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "570bea7965d597a837a1cf1835a93f4fc87f1f19",
    "size": 4813,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/570bea7965d597a837a1cf1835a93f4fc87f1f19"
  },
  {
    "path": "apps/mobile/tests/company-talents.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "155d414d3aef54db23dc8eedb7c854d8a45e0525",
    "size": 3036,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/155d414d3aef54db23dc8eedb7c854d8a45e0525"
  },
  {
    "path": "apps/mobile/tests/conversation-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "fd83e07ff77f5c4ef84f4eca771fe81df99e435c",
    "size": 5539,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/fd83e07ff77f5c4ef84f4eca771fe81df99e435c"
  },
  {
    "path": "apps/mobile/tests/conversation-send-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "580ab20f9914bf4d6ca8f1adf9beb0fe4cd43eb6",
    "size": 7667,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/580ab20f9914bf4d6ca8f1adf9beb0fe4cd43eb6"
  },
  {
    "path": "apps/mobile/tests/conversation.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "457e155044d518faaee0650cef135468a02838e6",
    "size": 6102,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/457e155044d518faaee0650cef135468a02838e6"
  },
  {
    "path": "apps/mobile/tests/copilot-response.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "ed2136aee8c40a466a8dc51530a104015ef4b2b7",
    "size": 4493,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ed2136aee8c40a466a8dc51530a104015ef4b2b7"
  },
  {
    "path": "apps/mobile/tests/copilot-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "fc55d439d39f25d1ed3bbc76c2a8ae6b1e736850",
    "size": 6934,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/fc55d439d39f25d1ed3bbc76c2a8ae6b1e736850"
  },
  {
    "path": "apps/mobile/tests/declared-capabilities.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "81be22f88f1842ea449589b88b4545a27dbc009b",
    "size": 6991,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/81be22f88f1842ea449589b88b4545a27dbc009b"
  },
  {
    "path": "apps/mobile/tests/earnings.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "d886827477cf1a7e111eb7cb4ad24a3f3c1394cd",
    "size": 3470,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d886827477cf1a7e111eb7cb4ad24a3f3c1394cd"
  },
  {
    "path": "apps/mobile/tests/general-support.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "97073823b6ea06ab8a72a8f72b9fe7eb68b88dcb",
    "size": 8596,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/97073823b6ea06ab8a72a8f72b9fe7eb68b88dcb"
  },
  {
    "path": "apps/mobile/tests/home-cards.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "d60371e0bcb12e97b8af1d2c50a4cd3944241d56",
    "size": 3926,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d60371e0bcb12e97b8af1d2c50a4cd3944241d56"
  },
  {
    "path": "apps/mobile/tests/invitation-accept-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "b276e85f116dccca5fb6f800d9a4cb7e2e5a9ade",
    "size": 11189,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b276e85f116dccca5fb6f800d9a4cb7e2e5a9ade"
  },
  {
    "path": "apps/mobile/tests/invitation-create-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "52973e05433b4f4cdb602d0fbbbfd8d02b982265",
    "size": 9476,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/52973e05433b4f4cdb602d0fbbbfd8d02b982265"
  },
  {
    "path": "apps/mobile/tests/jobs.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "5ed8e51d785af4c54de11e3a61bca09426b7a95e",
    "size": 2815,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/5ed8e51d785af4c54de11e3a61bca09426b7a95e"
  },
  {
    "path": "apps/mobile/tests/notifications-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "508bb7c7778d868a2c21b7059dd10c10bc0ae86f",
    "size": 5414,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/508bb7c7778d868a2c21b7059dd10c10bc0ae86f"
  },
  {
    "path": "apps/mobile/tests/notifications-write-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "ffcd9625f56d5af2a394db0da37f1a993b80a6de",
    "size": 11276,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ffcd9625f56d5af2a394db0da37f1a993b80a6de"
  },
  {
    "path": "apps/mobile/tests/notifications.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "bd21ae0efa3fa6c8f99a1e573490f745de48b98e",
    "size": 5729,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/bd21ae0efa3fa6c8f99a1e573490f745de48b98e"
  },
  {
    "path": "apps/mobile/tests/operations-deadline-screen.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "ddadf21ddd0895fe35d9c4df9d6ccfe8d3b53710",
    "size": 4957,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ddadf21ddd0895fe35d9c4df9d6ccfe8d3b53710"
  },
  {
    "path": "apps/mobile/tests/passport-history.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "67c1c472ef9292e984bdbfb716813068473af5de",
    "size": 1566,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/67c1c472ef9292e984bdbfb716813068473af5de"
  },
  {
    "path": "apps/mobile/tests/passport-safety-calendar.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "5ad0bde5ee19381be2115ba5687c428585580e85",
    "size": 6338,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/5ad0bde5ee19381be2115ba5687c428585580e85"
  },
  {
    "path": "apps/mobile/tests/planner-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "5bb08d09cc4af4b37c37a63de68273719a2c43a2",
    "size": 3661,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/5bb08d09cc4af4b37c37a63de68273719a2c43a2"
  },
  {
    "path": "apps/mobile/tests/primary-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "ee297621b25e80f12f203837c1d2b42f23df242d",
    "size": 6206,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ee297621b25e80f12f203837c1d2b42f23df242d"
  },
  {
    "path": "apps/mobile/tests/privacy-actions.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "0a69cc2358b1ed13b87f84baf11b8a8eab9447e4",
    "size": 6261,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/0a69cc2358b1ed13b87f84baf11b8a8eab9447e4"
  },
  {
    "path": "apps/mobile/tests/privacy-requests.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "e5095d9047542a5414519422efd5e891e906fcd2",
    "size": 1856,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e5095d9047542a5414519422efd5e891e906fcd2"
  },
  {
    "path": "apps/mobile/tests/privacy-write-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "f9783551999b68589bdbbff2d9f03db6a9d6808d",
    "size": 13388,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/f9783551999b68589bdbbff2d9f03db6a9d6808d"
  },
  {
    "path": "apps/mobile/tests/professional-home.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "d87761c9e81a48a6a3bb89f72563efee514a4ad4",
    "size": 7988,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d87761c9e81a48a6a3bb89f72563efee514a4ad4"
  },
  {
    "path": "apps/mobile/tests/professional-profile.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "7898ada26ea546fc3137a688e86478fb10332430",
    "size": 5360,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/7898ada26ea546fc3137a688e86478fb10332430"
  },
  {
    "path": "apps/mobile/tests/professional-safety.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "8fc94c9216dbad9b5fc483e0837f5d69a1881443",
    "size": 6434,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/8fc94c9216dbad9b5fc483e0837f5d69a1881443"
  },
  {
    "path": "apps/mobile/tests/professional-support.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "b2c5967bf7e4cdc270d68205b2d0e96009b4109c",
    "size": 3183,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b2c5967bf7e4cdc270d68205b2d0e96009b4109c"
  },
  {
    "path": "apps/mobile/tests/profile-analytics-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "2df00828279c9660a8ed365f1a3be149169cae7e",
    "size": 4546,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/2df00828279c9660a8ed365f1a3be149169cae7e"
  },
  {
    "path": "apps/mobile/tests/profile-save-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "bb11da6d351fa2026fba12eec293e63e42b103cd",
    "size": 9188,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/bb11da6d351fa2026fba12eec293e63e42b103cd"
  },
  {
    "path": "apps/mobile/tests/profile-submit.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "3e3dd073d8c642ffabbd325cc34350bac8d33164",
    "size": 4608,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/3e3dd073d8c642ffabbd325cc34350bac8d33164"
  },
  {
    "path": "apps/mobile/tests/publication-screen-uncertain-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "9d11388afedbbe01e6ac15be0d9558e5d5328513",
    "size": 7601,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/9d11388afedbbe01e6ac15be0d9558e5d5328513"
  },
  {
    "path": "apps/mobile/tests/replacement-create-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "d0423c9b93767886251470009fede3a8ad0e34c3",
    "size": 11881,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/d0423c9b93767886251470009fede3a8ad0e34c3"
  },
  {
    "path": "apps/mobile/tests/replacement-match-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "a297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76",
    "size": 10099,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/a297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76"
  },
  {
    "path": "apps/mobile/tests/replacement-read-controller-cleanup.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "3a0f44b631e6a0cce8cb74e22ea7607e4db87a3c",
    "size": 10160,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/3a0f44b631e6a0cce8cb74e22ea7607e4db87a3c"
  },
  {
    "path": "apps/mobile/tests/replacement-select-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "747753e9f044c02377a149a815211e5117ea58bc",
    "size": 11888,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/747753e9f044c02377a149a815211e5117ea58bc"
  },
  {
    "path": "apps/mobile/tests/response-calendar-contract.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "630e26b4037cd59c17713451c2d34aa98b4917ba",
    "size": 4624,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/630e26b4037cd59c17713451c2d34aa98b4917ba"
  },
  {
    "path": "apps/mobile/tests/revoke-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "a64a7963d655e4e1d706f3455ee5d96f92fc2849",
    "size": 7246,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/a64a7963d655e4e1d706f3455ee5d96f92fc2849"
  },
  {
    "path": "apps/mobile/tests/secondary-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "cc641c6180ad8ce624220e41bb5da3f980f2b466",
    "size": 8759,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/cc641c6180ad8ce624220e41bb5da3f980f2b466"
  },
  {
    "path": "apps/mobile/tests/session-clear.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "ac626a1e1e2b3f5873da15c129e0b5f7101ad454",
    "size": 1490,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ac626a1e1e2b3f5873da15c129e0b5f7101ad454"
  },
  {
    "path": "apps/mobile/tests/session-context.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "f36b32432e8cd4654954445e1359812c4ed098af",
    "size": 4770,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/f36b32432e8cd4654954445e1359812c4ed098af"
  },
  {
    "path": "apps/mobile/tests/session-tenant.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "e40e2d1932c825cd61c8ebe489fc05e317293813",
    "size": 3362,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/e40e2d1932c825cd61c8ebe489fc05e317293813"
  },
  {
    "path": "apps/mobile/tests/session-transaction.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "6b60b6e08030e12a55ea002996caee7929341ae6",
    "size": 3254,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/6b60b6e08030e12a55ea002996caee7929341ae6"
  },
  {
    "path": "apps/mobile/tests/signin-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "3d188e71b180978bf900edcff96b32c4df1de41b",
    "size": 7083,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/3d188e71b180978bf900edcff96b32c4df1de41b"
  },
  {
    "path": "apps/mobile/tests/signin.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "a580a51b608116701024ff5c102d76b0bb1712a4",
    "size": 2642,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/a580a51b608116701024ff5c102d76b0bb1712a4"
  },
  {
    "path": "apps/mobile/tests/signout-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "07f5b11eb3dfeea58a271c8caf027aade76ed359",
    "size": 8962,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/07f5b11eb3dfeea58a271c8caf027aade76ed359"
  },
  {
    "path": "apps/mobile/tests/signup-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "4f92e840adb8dfa6eb1c6fb941fd8061c1257093",
    "size": 5470,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/4f92e840adb8dfa6eb1c6fb941fd8061c1257093"
  },
  {
    "path": "apps/mobile/tests/signup-screen.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "eace3ff93514dd1d182006e598136a057d352509",
    "size": 4863,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/eace3ff93514dd1d182006e598136a057d352509"
  },
  {
    "path": "apps/mobile/tests/signup.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "483ace20f18b2cd7053be06a50c91004ec15545f",
    "size": 7127,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/483ace20f18b2cd7053be06a50c91004ec15545f"
  },
  {
    "path": "apps/mobile/tests/startup-route.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "242d7516e9c090a817ad8ae88a6daf9497e77a8b",
    "size": 2555,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/242d7516e9c090a817ad8ae88a6daf9497e77a8b"
  },
  {
    "path": "apps/mobile/tests/startup-screen-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "ae28131f4a72e5c71a6603d5ba31464c9f3e988b",
    "size": 3818,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/ae28131f4a72e5c71a6603d5ba31464c9f3e988b"
  },
  {
    "path": "apps/mobile/tests/support-history-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "408c4a5458e3baa4b23554cc2bfde807071db8cd",
    "size": 6455,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/408c4a5458e3baa4b23554cc2bfde807071db8cd"
  },
  {
    "path": "apps/mobile/tests/support-history-screen.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "537f3e97b1cbcfbe8ac9efaf7a90adcb6ecc685f",
    "size": 6233,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/537f3e97b1cbcfbe8ac9efaf7a90adcb6ecc685f"
  },
  {
    "path": "apps/mobile/tests/support-intent.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "bce844ae4c40f452c4d9db3961beaccff97d2108",
    "size": 10735,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/bce844ae4c40f452c4d9db3961beaccff97d2108"
  },
  {
    "path": "apps/mobile/tests/support-recovery-screen.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "9c041fff637ecf15064c828805cef36dad133786",
    "size": 3448,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/9c041fff637ecf15064c828805cef36dad133786"
  },
  {
    "path": "apps/mobile/tests/support-request-screen.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "c833939e03e63a17abbd9b195f631c6675871e64",
    "size": 10179,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/c833939e03e63a17abbd9b195f631c6675871e64"
  },
  {
    "path": "apps/mobile/tests/support-submission.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "35845a334a6e271a976fd8ea1dc935833dc8ad58",
    "size": 14931,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/35845a334a6e271a976fd8ea1dc935833dc8ad58"
  },
  {
    "path": "apps/mobile/tests/talents-safety-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "547ae928eda25b2ab28ac64f90b3028d275fe653",
    "size": 5841,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/547ae928eda25b2ab28ac64f90b3028d275fe653"
  },
  {
    "path": "apps/mobile/tests/teams-read-deadline.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "fa39a5639095d53b0e9f6491c4a926e47eeb9236",
    "size": 4823,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/fa39a5639095d53b0e9f6491c4a926e47eeb9236"
  },
  {
    "path": "apps/mobile/tests/teams.test.mjs",
    "mode": "100644",
    "type": "blob",
    "sha": "b202b682a7fbd4977fd99d49156bb7802aadb2f7",
    "size": 5726,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/b202b682a7fbd4977fd99d49156bb7802aadb2f7"
  },
  {
    "path": "apps/mobile/tsconfig.json",
    "mode": "100644",
    "type": "blob",
    "sha": "aee4c01aa16c5c63c241fe3d76cbff8d020081ca",
    "size": 154,
    "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/git/blobs/aee4c01aa16c5c63c241fe3d76cbff8d020081ca"
  }
]
```
