# PR570 — prazo da busca de substituto e integração preservada


## 2026-10-18 — PR #570: prazo/ownership da busca de substituto (preparação funcional)

Requisito → código → teste: área de substituições/matching; a busca explícita de recomendação precisa encerrar a espera local aos 15 s, invalidar autoridade expirada e não afetar a próxima ação. MAIN de referência 75105d42c873ca56b58fa1aa73cc4a682359e5c1; integração normal no PR #570 existente, antigo HEAD 2205e2dcef0aa79e3ce9a96c4a0dd1eee649eb3a. Sem force, nova PR duplicada ou rerun do SHA antigo.

Entrega real: apps/mobile/app/substituicoes.tsx recebe actionController após as seis refs existentes, ownership generation+controller, retirada da ref ANTES de pending/busy e callback SOMENTE para action('match') no prazo original de 15000 ms. Callback invalida snapshot/sequence/dados/recomendações, conserva motivos digitados, drena operação própria e não envia GET/POST. Atualização manual explícita e validada recupera autoridade. Timer/finally antigos não liberam nova busca, criação ou seleção no mesmo foco; blur aposenta ownership. Guardas posteriores preservam contexto e origem do snapshot. Criação/seleção mantêm timeout abort-only anterior: esta entrega NÃO corrige nem aceita seus prazos. Nenhum novo parser, retry automático ou alteração de payload/ACK/API/SQL/RLS/ACL/React/RN/lockfile/workflows/Chrome/CORS/Fetch guard/CDP/deadlines.

Correção factual de histórico: o #570 original altera SOMENTE validador de datas calendáricas e acrescenta dois testes. NÃO altera tenantId no ACK/select. Preservados byte a byte helper 7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6 e teste 456bdc4dd6a3ca86e36e7289b1d39eb960342833; os 11 testes anteriores permanecem prefixo integral e os dois calendáricos permanecem integrais. Metadados #585 corrigidos sem apagar histórico; recibo completo na nota vinculada.

Prova local nova: apps/mobile/tests/replacement-match-screen-deadline.test.mjs, 27 modelos do handler pré-JSX REAL + helper REAL, hooks/auth/fetch/JSON/timers explícitos. Baseline MAIN+helper570: 16 PASS/11 FAIL → 27 PASS após fix. Quatro awaits (auth/fetch/JSON/auth final), casos positivos ready/empty bodyless POST, timers/finally antigos vs NEWmatch/CREATE/SELECT no mesmo foco, blur/refocus, contexto tenant, ACKs incompatíveis, atualização manual, vinte buscas pendentes explicitamente iniciadas. Snapshot novo SAMEepoch é fixture explícita, não prova de API/render. Focais 42 PASS = 27 novos +13 helper570 +2 ACKUUID; fuso São Paulo 42 PASS. Full móvel canônico 942 PASS = 913 MAIN +2 calendáricos570 +27 novos, UTC e America/Sao_Paulo, 0 fail/skip/cancel. 79 caminhos explícitos; cópias scratch não canônicas excluídas, nenhum teste MAIN omitido. Verificador: 155 blobs móveis existentes iguais; diferenças APENAS Substituicoes/helper570/test570 e tsconfig LOCAL adaptado, este último NÃO PUBLICADO. Fora cinco regiões do app, reversão reconstrói 10967 caracteres MAIN byte exatos; candidato 11455 caracteres. Typecheck local indisponível (tsc/dependência ausente), NÃO PASS; CI obrigatório preservado.

Limites: modelos Node/adapter fixtures não são RN render, SecureStore, HTTP/PostgreSQL, dispositivo físico, cancelamento no servidor, garantia de memória ou aceite integral. API auto-match é ranking sem escrita/seleção; create/select são contratos distintos intactos. Somente área 10 standalone tecnicamente aceita internamente; 12 áreas pendentes, sem percentual de código.

Gates novos deste HEAD: CI/APK próprios PENDENTES neste apêndice histórico de preparação. 1532 testes agregados apenas ESPERADOS [145 Web,942 mobile,431 API,3 CLI,11 monitor], não executados ainda em CI. APK N/A FALSE. Não ready/merge antes de CI completo SUCCESS + APK SUCCESS e revisão fresh HEAD/base/todos paths/modes; após merge verificar CI/APK reais do merge. Não emprestar PASS antigo2205, 584 ou585. MAIN full CI continua RED582POST quota antescheckout; APK standalone MAIN validado582POST75105.

Histórico recente: #585 f3e3 CI39160905472a1 FAIL HTTP/browser após 1531 unidades PASS; signout POST ERR_ABORTED após OPTIONS204, 71 GET200+1 GET503 controlado e zero GETfailed; sem ACK201/revogação remota/B/full8/ProductionTruth. APK39160905491a1 SUCCESS com bytes e checkout sintético68082. #58490cc CI39156391666a2 quota antescheckout após UMA retry justificada pelo pull postgres17 novo do #585; orçamento consumido, sem outro rerun. APK584 SUCCESS sintéticocedf. Recibos FULL nas notas/PRs. Root browser permanece NÃO resolvido, segurança intacta. Sem produção, serviços, custos, PSP, contratos ou dinheiro real.

Próximo passo técnico: observar primários CI/APK deste novo HEAD; se produto/browser falhar, registrar log e seguir auditoria independente sem rerun cego. Consolidar FINAL em metadados do PR e somente próxima entrega FUNCIONAL nos normativos, sem commit de status/selfref/imagens/atividade.

## Manifesto de preservação integral

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "old570Blob": "a6b42ca1debb8b20ec5761a6224d9c667eb7aae8",
    "latest585Blob": "975b2ec8a2fcbabf5ff128963fb974d374728770",
    "old570Chars": 606902,
    "latest585Chars": 1099908,
    "commonChars": 606902,
    "missingTailChars": 493006,
    "newChars": 1104837,
    "reconstructLatest585": true,
    "old570PrefixExact": true
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "old570Blob": "4f4ea91e75a968e86eff52678b54d30bf59afa63",
    "latest585Blob": "e313d7764e2152008a87098a9527c82679be542e",
    "old570Chars": 939472,
    "latest585Chars": 1432480,
    "commonChars": 939472,
    "missingTailChars": 493008,
    "newChars": 1437409,
    "reconstructLatest585": true,
    "old570PrefixExact": true
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "old570Blob": "0ca0d836914b5ce7c39a9979085b87cef3032d17",
    "latest585Blob": "b663312ffba3e2bd4e53a8f022e0599227758928",
    "old570Chars": 597154,
    "latest585Chars": 1090140,
    "commonChars": 597154,
    "missingTailChars": 492986,
    "newChars": 1095069,
    "reconstructLatest585": true,
    "old570PrefixExact": true
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "old570Blob": "337508538ec4a6610a938754852d7e402c5f5125",
    "latest585Blob": "ba61166d31a516e4817ad66941394eb468f8ad0b",
    "old570Chars": 591959,
    "latest585Chars": 1084959,
    "commonChars": 591959,
    "missingTailChars": 493000,
    "newChars": 1089888,
    "reconstructLatest585": true,
    "old570PrefixExact": true
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "old570Blob": "dd37ce4c3424c9f6bf528c5195cee4ae8fd54d00",
    "latest585Blob": "4b1284a26d11af50feb9334419512039b268f1ef",
    "old570Chars": 593085,
    "latest585Chars": 1086051,
    "commonChars": 593085,
    "missingTailChars": 492966,
    "newChars": 1090980,
    "reconstructLatest585": true,
    "old570PrefixExact": true
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "old570Blob": "2704bdac508eeaf84331f148bdac914666decbcf",
    "latest585Blob": "aa6e79094d5e873dc25144fe01142e73bd478039",
    "old570Chars": 189750,
    "latest585Chars": 682756,
    "commonChars": 189750,
    "missingTailChars": 493006,
    "newChars": 687685,
    "reconstructLatest585": true,
    "old570PrefixExact": true
  }
]
```

Cada original570 permanece prefixo integral no próprio caminho. Prefixo comum do original570 + tail integral585 reconstrói FULL585 byte exato; este já preserva FULLMAIN e584. NÃO alegar FULLMAIN prefixo contíguo quando históricos divergiram. Blobs Git imutáveis acima identificam cada entrada.

## Recibo PR585 corrigido integral (26798 caracteres)

## Correção factual de histórico570 — 2026-10-18T20:13UTC

Releitura FULL do PR570/head2205/helper7f52/test456bdc confirma: sua mudança anterior é APENAS predicado de calendário real para startsAt/endsAt em assignments e DOIS testes adicionais. NÃO muda tenantId/ACKselect. A referência anterior nesta metadata/audit 'tenant no ACKselect' foi erro de identificação do resumo e fica expressamente CORRIGIDA por este primário. Os contratos select/tenant/UUID continuam originais. Nenhum código570 foi alterado nesta correção metadata; histórico anterior integral preservado abaixo, futuroregistrofuncional repetirá correção explícita.

---

## Retry584 encerrada — verificado2026-10-18T20:10UTC

A UMA retry específica CI39156391666 job117760377495 foi emitida20:06UTC somente após nova prova de recuperação do pull ECR noCI585: postgres17 Downloaded newer image19:55:08.9959503Z econtainersSUCCESS. Attempt2/job117776552563COMPLETEDFAILURE, mesmaquotaECRpostgres17toomanyrequestsDataLimit20:07:02.7835949Z/07.7892588Z/15.1058454Z/Dockerpullfailed20:07:15.1164034Z ANTEScheckout. Checkout+TODOSprodutosSKIPPED. Initial+ONEretryconsumidos,nãooutrorerun90cc/registryworkflowcredentialbypass/ready/merge584. Evidência justificou apenas uma tentativa, NÃOquotaGLOBALresolvida.1521CIunit584NÃOexecutado/nãoemprestar5851531. APK584ownSUCCESSverificadobytespermanece, nãoautorizaCIRED. MAIN75105inalterada/FULLCIRED582POSTquota/standalonetécnico582POST75105. PENDING584A2 abaixo é histórico supersedido por estes fatos, preservado integralmente.

---

## FINAL585 — APK verificado2026-10-18T20:06UTC — supersede somente APK pending

PR585 DRAFTNOTMERGED HEADf3e3d9f1b43968edebc888a1a86866ff0ced0163/tree76d9db2ab29fcc2d2f1951c0cdb1d51ab8c8fd7e/parentMAIN75105. ZEROready/merge585/rerunproduto/cancel.
OWNAPK39160905491/job117773820400attempt1COMPLETEDSUCCESS/ZEROretry. Actualcheckout68082d0e20dd10bcf688a71e632805ed779d4b1c primary19:54:59.0544804Z SINTÉTICO orderedparents[75105d42c873ca56b58fa1aa73cc4a682359e5c1,f3e3d9f1b43968edebc888a1a86866ff0ced0163]/tree76d9igualcandidate, GitconfirmadoNÃOliteralHEAD. Build20:03:02.6038818Z/installSuccess20:04:21.0214751Z/DEVICE_SMOKE_OK20:04:33.3926407ZwithoutMetro. Artifact12148872920expires2026-11-01T20:04:34Z REALdownloadZIP28913188bytes/SHA25602c75484f976222052f5e79491cf012a93e1883f54a08a129c98e132d90ba091=API;individualAPK66162124bytes/SHA256fd86804ab230311fa0458152ec41a493f0e937bc95aae13472525f889dd46be2=SHA256SUMS. BUILD_INFO68082/releasefixedpackage/metrofalse/build2026-10-18T20:03:03Z. Staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠QUEROTRABALHARform/keyboard/ACK/SecureStore/nativequeue/físico/VisualTruth/prod. APK N/A FALSE, NÃO585MAINAPK. CI39160905472a1FAILbrowserPOSTsignoutabort apesar1531unitPASS, proíbe merge. Sem outro585retry, root12GET/ChromeUNRESOLVED/controlesintactos. MAINstandalone técnico582POST75105 atéoutroPOSTreal.

NOVO fato infraestrutura separado:585InitializecontainersSUCCESS compullpostgres17 executado apósquota584; primário no log585. Com584CI39156391666 aindaattempt1failed-completedANTEScheckout eAPK584SUCCESSbyteverified, foi emitida UMA retry específica job117760377495 MESMO90cc às20:06UTC. Não585productrerun/nãoquotaGLOBALresolvida/nãoloopregistryworkflowcredentialsbypass. 584A2PENDENTE, nãoPASS/merge; próximo verificaractualfinal/log/tree antesdecisão, nãoemitirsegunda retry. 582POSTONEretryjáconsumida/nãooutra. 584regates não são novos testes ou novoaceite585.

Histórico INTERMEDIATE23079charsINTEGRAL abaixo, preparaçãoPENDINGé histórico. ConsolidarFINALnos6originaisAPENASpróximaentregafuncional,semstatus/autoref/image/activitycommit.

---

## CI final e avanço independente — verificado2026-10-18T20:02UTC — DRAFTNOTMERGED

PR585 HEADf3e3d9f1b43968edebc888a1a86866ff0ced0163/tree76d9db2ab29fcc2d2f1951c0cdb1d51ab8c8fd7e/parentMAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1. Fresh10diffpathsSHA100644exatos;9novosblobsFULLUTF8fetch_blobreadbackEXACT+1nota584reusedFULLread;1252existingMAINblobs/modesiguaisfora7modificados. Seis FULLprefix584 que preservam FULLmainINPLACE+append; zero outros produtos/copieddraftfixtures/localtsconfig.

### OWNCI primário
[39160905472](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39160905472)/job117773820306attempt1 COMPLETED FAILURE/ZEROretry. Actualcheckout68082d0e20dd10bcf688a71e632805ed779d4b1c primary19:55:18.0626029Z SINTÉTICOorderedparents[75105,f3e3]/tree76d9igualcandidateGitconfirmado,NÃOliteralHEAD.1531=[145Web941mobile431API3CLI11monitor]PASS0fail-skip-cancel.28newactualcompiledok309..336 primary19:56:43.2483169Z..2519994Z. Typecheck/build/mobileexport/migrationrunner2x/privacyretentionPASS. HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNÃOexecutado. NãoFULLCIGREEN/merge permitido; não rerunf3e3porverde, ECR iniciou neste contexto sem registry/workflowchanges/nãoquotaGLOBALresolvida.941mobile exatos, não inflar com auditsa seguir. LOCAL941UTC+941TZSãoPauloPASS,62focal e28TZPASS; mutanteLOCAL20PASS8FAIL, nãoCIcount.

### NOVA evidência browser — não confundir com12GETaborts
ActualChrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34primary19:57:59.6410333Z. ActualONEteams503 CONSUMED+11otherrealreads→human12NEWGET/team1/ZEROextraPOST PASS19:58:02.3049500Z. Não sóCDPaccepted(19:58:01.9521458Z). Depoisfalhou19:58:22.3453707Z 'Actual POST201 signout required; OPTIONS204 is not an ACK'. Failurestate19:58:22.3508018Z:71GET200+1GET503fixture, ZEROGETloadingFailed; umPOST/v1/auth/signoutERR_ABORTED/canceledTRUE/corsErrorNULL apósOPTIONS204, semACK201. TelaLOGIN/localclearedvisualmentecomprovada, NÃOrevogaçãoremota. Signin201/teams201/jobs201 e leituras/refresh/reload atingidos; revokedbrowser401/otherSAMEidentityvalid/Bisolated/full8/laterProductionTruth NÃO concluídos. Nãoemprestar582/579pass/558zeroNav. Essecancelamento é POSTauthsaída, NÃOwave12GETindisponíveis/nãorepetirerroneamentemetric—. RootcontinuaUNRESOLVED/nãoAPI-CORS-vendor-frameworkcausa provada/semweakeningCDPFetchguardCORSsandboxLNAdeadlineflagsassertsimages.

5OWNdesktopPNGsignature/SHA/bytes/PillowverifyPASS/dims1365x900, provenancef3e3/68082/tree76d9/run39160905472a1/job117773820306FAIL. Somentefailure/login-pixelsSHA75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686 VISUALMENTEinspecionada;outras4nãovisual/nãonative/nãoGitcurrentassets. next-audit/585-own-captures.jsonfullbase64/provenance;persistirAPENASpróximaentregafuncionalseusar,nãoimagecommit.

### APK
[39160905491](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39160905491)/job117773820400attempt1 aindaIN_PROGRESS Build na consulta20:00UTC. Nenhumfinalbuild/install/DEVICE_SMOKE/artifactbytes/actualcheckoutAPKatribuído. APK N/A FALSE. Não rerun/cancelrunning/ready/mergeCIredmesmoAPKGREEN. CurrentMAINstandalone técnico582POST75105, não585candidate;MAINfullCIREDquota582POST. Logs/bytes do584ownSUCCESS integralna nota, nãoemprestar.

### Apósbloqueio: independenteLOCAL, semsegundopatch
Substituicoes.action('match') app e83074d6e02c97426932bf68dd075a3b5f3ebd67/helper3349b7e10e9de2477bc21c5f3f2db42c0ba783b7/API809c27f1551c103adc9e6950f79555eb42d3b7db freshread:10actualpreJSX+REALhelpersLOCAL6PASS4FAIL.4stagesauth/fetch/JSON/finalauthbusy/pendingTRUEat15satédependencyresume,0POSTauth/1outros/semrecomendaçãoACKtardianemautoPOST.2positivosrecommendation eHTTP400no_replacement_available,4novosafterblockcontexttenantchange/blurguardsPASS,13oldhelper/ACKUUIDtestsPASSintactos. AutoMatchAPIbodylessPOST é ranking/readtenantnãoescreve/seleciona; create/select sãooutroscontratos, não generalizar semauditoria. NÃOproduto/PR/CI/RNrender/HTTPPG/native/prod/parte28/941/1531.
PR570jáexisteDRAFT2205somentehelperselectACKtenant+tests,APPsemdeadlinefix. Próximaentregapequenapodeestender570COERENTE apósfreshmain/norms/dupe econtrato: APENASmatchdeadline+ownref/retireANTESunlock,oldtimer/finallyNÃOafetaNEWmatch/create/selectSAMEepoch,invalidatesnapshot/recommendation,manualreload/empty/currentowner/context;create/selectprazosemextensãoporevidênciadeoutrohandler. Não parser568duplicado/PRduplicada/fixsemRED/nativeclaim.
Browserindependente3LOCALmodelos atualhandlerWebsignout(pageMAIN): dispatchpending/resolve/rejectPASS mostraONEPOSTsemoptions.signal/semretry eclearLOCALantesdereadinessremota. Narrowhipótese 'essePOSTfoicanceladopeloAbortControllerexplícitodohandler' NÃO sustentada:request nãolevaAbortSignal. Não prova ausência de cancelamento browser/framework/net, nem causa dos12GET oufix. Erroinicialdeescape no harnessSyntaxErrorfoi corrigido eNÃOcontadocomoREDproduto. Webnenhumaplicativopatch/publicação/CI/Chromeextra. Todos13auditmodels foraAPPglob/nãocountCI.

Rodadarealfix28regressões+1531CIunit+novoHTTPChromeobservation+independent10+3models, nãoestagnada. Sóárea10técnicainternaaceita,12pending/não%code/semnovofullaceite/semexternalactionblockexigindousuário. CIREDimpedemerge585;ZEROready/merge/rerun. FINALmetadata e próximoFUNCTIONALnormsappend somente, semstatus/autoref/image/activitycommit. Externos215219220224228OPEN/Watch569CLOSEDcompletedfresh;rotinaúnicaenabledscheduleinalterados,novaautomação0,semparcialtransientdisable/prodRailwayNeon/custosserviçoscredenciaisprovidersPSPcontratosdinheirorealrootgrantsRLSdisable/Activitymanualwrites.

## AuditLOCAL independente integral (não suíteCI)
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadingReplacements,loadReplacements,replaceable,sameReplacementContext,requestReplacement as createRequest,matchReplacement,selectReplacement} from '../apps/mobile/lib/company-replacements.ts';
const A='11111111-2222-4333-8444-555555555555',R='66666666-7777-4888-8999-000000000000',P='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
const assignment={id:A,status:'confirmed',title:'Actual work',professionalName:'Actual person',replacementOpen:true},replacement={id:R,assignmentId:A,status:'open'};
const recommendation={replacementRequestId:R,recommendedProfessionalId:P,recommendedProfessionalName:'Actual substitute',score:82,reasons:['availability']};
const headers={Authorization:'Bearer actual-owner','x-tenant-id':'bbbbbbbb-cccc-4ddd-8eee-ffffffffffff'};
function screen(stage='none',empty=false){
 const source=fs.readFileSync(new URL('../apps/mobile/app/substituicoes.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Substituicoes('),end=source.indexOf('\n const requestReplacement=',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {action};\n}',{mode:'strip'}),keys=['useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','apiUrl','loadingReplacements','loadReplacements','replaceable','sameReplacementContext','createRequest','matchReplacement','selectReplacement','setTimeout','clearTimeout','fetch'];
 const create=new Function(...keys,prefix+'\nreturn Substituicoes();'),state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,tid=0,active=false,reads=0,resolve,currentHeaders={...headers};const gate=new Promise(r=>{resolve=r});
 const wait=async at=>{if(active&&stage===at)await gate};
 const auth=async()=>{if(active){reads++;await wait(reads===1?'auth':'final-auth')}return {...currentHeaders}};
 const fetch=async(path,options)=>{calls.push({path,options});if(options.method==='POST')await wait('fetch');return {ok:!empty||options.method!=='POST',status:empty&&options.method==='POST'?400:200,json:async()=>{if(options.method==='POST'){await wait('json');return empty?{message:'no_replacement_available'}:recommendation}return path.endsWith('assignments')?[assignment]:[replacement]}}};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=typeof initial==='function'?initial():initial;return[state[i],v=>{state[i]=typeof v==='function'?v(state[i]):v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,x=>x,loadingReplacements,loadReplacements,replaceable,sameReplacementContext,createRequest,matchReplacement,selectReplacement,callback=>{const id=++tid;timers.set(id,callback);return id},id=>timers.delete(id),fetch);}
 render();cleanup=focus();return {state,refs,calls,pump:()=>new Promise(setImmediate),begin:()=>{render();active=true;return handlers.action('match',R)},expire:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback);callback()},resume:()=>{stage='none';resolve()},blur:()=>cleanup(),changeTenant:()=>{currentHeaders={...headers,'x-tenant-id':'cccccccc-dddd-4eee-8fff-000000000000'}}};
}
for(const empty of [false,true])test('replacement match actual handler timely '+(empty?'documented empty':'recommendation')+' uses one bodyless POST without selecting',async()=>{
 const h=screen('none',empty);await h.pump();await h.begin();assert.equal(h.state[4],false);assert.equal(h.refs[3].current,false);assert.equal(h.calls.length,3);const post=h.calls[2];assert.equal(post.path,'/company/replacements/'+R+'/auto-match');assert.equal(post.options.method,'POST');assert.equal(post.options.body,undefined);assert.deepEqual(post.options.headers,headers);assert.equal(h.state[2][R].status,empty?'empty':'ready');assert.match(h.state[3],empty?/Nenhum substituto/:/Substituto recomendado/);h.blur();
});
for(const stage of ['auth','fetch','json','final-auth'])test('replacement match deadline releases pending before '+stage+' resolves',async()=>{
 const h=screen(stage);await h.pump();const pending=h.begin();await h.pump();assert.equal(h.state[4],true);h.expire();const expired={busy:h.state[4],pending:h.refs[3].current};assert.equal(h.calls.filter(c=>c.options.method==='POST').length,stage==='auth'?0:1);h.resume();await pending;assert.equal(h.state[4],false);assert.equal(h.refs[3].current,false);assert.equal(h.state[2][R],undefined);assert.equal(h.calls.filter(c=>c.options.method==='POST').length,stage==='auth'?0:1);h.blur();assert.equal(expired.busy,false);assert.equal(expired.pending,false);
});
for(const stage of ['auth','json'])test('replacement match '+stage+' cannot recommend after company context changes',async()=>{
 const h=screen(stage);await h.pump();const p=h.begin();await h.pump();h.changeTenant();h.resume();await p;assert.equal(h.state[2][R],undefined);assert.equal(h.state[4],false);assert.equal(h.refs[3].current,false);assert.equal(h.calls.filter(c=>c.options.method==='POST').length,stage==='auth'?0:1);h.blur();
});
for(const stage of ['auth','json'])test('replacement match '+stage+' late response after blur cannot recommend or dispatch again',async()=>{
 const h=screen(stage);await h.pump();const p=h.begin();await h.pump();h.blur();h.resume();await p;assert.deepEqual(h.state[2],{});assert.equal(h.state[4],false);assert.equal(h.refs[3].current,false);assert.equal(h.calls.filter(c=>c.options.method==='POST').length,stage==='auth'?0:1);
});
```

## AuditLOCAL signout integral (não Chrome/rootproof)
```js
import test from 'node:test';
import assert from 'node:assert/strict';
// Actual MAIN page.tsx signout handler, explicit state/storage/fetch fixtures only.
const source="  async function signout(){\n    const token=session?.accessToken;signinAttempt.current++;\n    try{sessionStorage.removeItem('mlivre:web:session');}catch{}setSession(null);setTenantId('');setDashboard(null);setAnalytics(null);setPlanner([]);setJobs([]);setAssignments([]);setSelectedJobId('');setCandidates([]);setRecommendations([]);setCompleted([]);setTeams([]);setSelectedTeamId('');setTeamMembers([]);setReplacements([]);setSelectedReplacementId('');setReplacementCandidates([]);setTalentPools([]);setPayments([]);setSafetyCases([]);setSafetyAppeals([]);setError('');setLoading(false);\n    if(token){void fetch(`${API}/v1/auth/signout`,{method:'POST',headers:{Authorization:`Bearer ${token}`}}).catch(()=>undefined);}\n  }";
const setters=["setSession","setTenantId","setDashboard","setAnalytics","setPlanner","setJobs","setAssignments","setSelectedJobId","setCandidates","setRecommendations","setCompleted","setTeams","setSelectedTeamId","setTeamMembers","setReplacements","setSelectedReplacementId","setReplacementCandidates","setTalentPools","setPayments","setSafetyCases","setSafetyAppeals","setError","setLoading"];
for(const outcome of ['pending','resolve','reject'])test('actual web signout '+outcome+' dispatch has no explicit AbortSignal, no retry and local-only clearance',async()=>{
 const changes=[],calls=[],attempt={current:7};let release,reject;const dependency=new Promise((a,b)=>{release=a;reject=b});
 const storage={removeItem:key=>{assert.equal(key,'mlivre:web:session');changes.push(['storage',key])}};
 const fetch=async(url,options)=>{calls.push({url,options});return dependency};
 const invoke=new Function(...setters,'session','signinAttempt','sessionStorage','fetch','API',source+'\nreturn signout();');
 await invoke(...setters.map(name=>value=>changes.push([name,value])),{accessToken:'actual-fixture-token'},attempt,storage,fetch,'http://127.0.0.1:4000');
 assert.equal(attempt.current,8);assert.equal(calls.length,1);assert.equal(calls[0].url,'http://127.0.0.1:4000/v1/auth/signout');assert.equal(calls[0].options.method,'POST');assert.deepEqual(calls[0].options.headers,{Authorization:'Bearer actual-fixture-token'});assert.equal(calls[0].options.signal,undefined);
 assert.ok(changes.some(([name,value])=>name==='setSession'&&value===null));assert.ok(changes.some(([name,value])=>name==='setLoading'&&value===false));
 if(outcome==='resolve')release({status:201});if(outcome==='reject')reject(Error('fixture transport canceled'));await new Promise(setImmediate);assert.equal(calls.length,1);
});
```

---
## Preparação preservada INTEGRAL

## Trabalhos: prazo de interesse com propriedade por operação

HEADf3e3d9f1b43968edebc888a1a86866ff0ced0163/tree76d9db2ab29fcc2d2f1951c0cdb1d51ab8c8fd7e/parentMAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1.

28 regressões actualpreJSX+REALhelpers: baseline11PASS17FAIL→28GREEN,62focal+28TZSãoPaulo eFULL941mobileLOCALPASS(913MAIN+28new),0fail-skip-cancel. Somente Trabalhos.interest/ref/cleanup: owns porjob+controller+generation e currentauthority;15s liberaENVIANDO/invalidaautorizaçãolistacommsgoriginal, nãoGET/POSTextra,finishretireANTESunlock;oldtimer/finally nãoafetaNEWinterestSAMEjobSAMEepoch. Concurrentotherjoblateauth/ACKnão restaurafonteexpirada. MensagensACKinterested/confirmed e retrymanual apósrefresh originais, APIUPSERTsemchanges. Não durableidempotencyinventada/cancelamentoservidor/native/HTTPPG/RNrender/produção proof.

ReverseFULL8254MAINchars exatosfora5regiões→8818candidate. Helpers/API SQLRLSACL/deps/lock/React19.1.4RN0.81.6/JSXstyles/readhandler/workflowsbuildsmoke intactos. Old34controlsbytesexatos. MutanteLOCALretirarMapownership20PASS8FAIL,nãopublicado/nãoCIcount. LocaltsconfigadaptadoNÃOPUBLICADO; scratch568foraescopo,941apenas78MAINtestpaths+newtest.

ALL10paths:1product+1newtest+6normFULLprefix584+newappend+1nota584MESMOblob+1newnoteFULL584FINAL17369chars. Todos9novosblobsFULLremoteUTF8readbackEXACT100644; nota584reusedFULLread. Nenhumproduto584Ganhos/draft568574581575573571558572copiado. MAIN75105CIREDquota582POST;own584CIREDquotabeforecheckout+ownAPKsuccessverifiedbytespreservadosnovanota. Não rerunoldSHA/duplicatePR.

OWNCI/APK PENDENTES.1531=(145Web941mobile431API3CLI11monitor)esperado,nãoexecutado. APK N/A FALSEmobilechanged. NãoReady/MergeatéownCI+APKSUCCESS/contextoGitexato+freshheadbaseALLdiffreviewexpectedSHA; POSTCI/APKreaisapósmerge. Sóárea10técnicainternaaceita12pendentes,não%code. SemprodRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/Activitymanualwrites.

### Registro integral de preparação


---

## Trabalhos — prazo do envio de interesse e propriedade por operação — 2026-10-18 19:53 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1/treecfac8574100022a5b576efade556920a7e282f0c. 576578579582 já integrados, não repetir ready/merge. MAINFULLCIRED582POSTquota; standalone técnicoMAIN582POST75105 já verificado. Outros drafts preservados. Esta entrega NÃO integra produtoGanhos584 nem outros códigos/fixtures de drafts.

Requisito áreas3/5/1/11/13: botão QUERO TRABALHAR não fica ENVIANDO indefinidamente enquanto credencial, fetch, JSON ou auth final não resolvem após prazo15s. Reconsulta de APIJobsController185be30435f34dc270461fefce284a37ac7a3b5e: exige identidade/profile/jobUUID/marketplacejobopen; ONCONFLICT(job_id,professional_id) conserva confirmed; GETinterest autenticado existe. Não mudar contrato, privilégios ou transformar retry manual já existente em replay automático/idempotência durável inventada. Sem novos GET/POST por timer.

Prova RED→fix:6modelos originais2PASS4FAIL reexecutados no actualTrabalhos a0f7fab92434aa1d7e8d8fb22e8766991b5f04d4 + REALloadJobs/sendInterest/runForSession; expansão28novos=11PASS17FAIL na mesmafonte antespatch. Apósfix28GREEN,62focal=[28new+28primary-read-deadline+6jobs]PASS;28TZAmerica/Sao_PauloPASS;FULL941mobileLOCAL=[913MAIN+28new]PASS/0fail-skip-cancel/Node24.19.0. Fixtures EXPLÍCITAS hooks/auth/JSON-clock, não renderReactNative/HTTPPG/SecureStore/native/produção/servidorcancellation. MutanteSÓLOCALinmemoryremoverMaptokenownership→20PASS8FAIL, nãopublicado/nãoCIcount.

CódigoAPENAS apps/mobile/app/trabalhos.tsx: ref interestControllers Map porjob criada APÓS4refs originais; owns=geração+identidadecontroller; current também exige !aborted e displayedAuthorization original. Prazo15s aborta controller próprio; somente contexto/operação correntes invalidam autorização/lista e publicam mensagem não-confirmada original, sem falseACK. finish aposenta Map/controller/pending ANTESunlock, é idempotente e verifica token, assim oldtimer/finally não removem NEWinterest MESMOjob/MESMOepoch. Contexto expirado também não permite concurrentotherjob lateauth iniciarPOST nem ACKtardio restaurar sucesso; cleanup de foco limpa Map junto do Set original. Operações em outros jobs conservam sua propriedade até finish próprio, sem clear indiscriminado. Depois do prazo, retry só após atualização humana original; callback/ACK válido oportuno interested/confirmed e política de erro de ACK inválido preservados. Não prova cancelamento servidor/nova barreiradurável/rollback/memóriaexaurida/tenantleak.

28regressões:2ACKpositivos/bodylessPOST/headers;4awaitstagesdeadline+filtrosmantidos;4oldfinally+4oldtimerNEWsamejob/SAMEepoch;2oldresponse/newfocus;1oldtimer/newread;2concurrentotherjobauthJSONstale;1twocurrentjobspositive;2ownerchanges;3incompatibleACK;1manualrefreshretry;1duplicateclick;20refresh/write explícitos com registrydrain. SAMEepochsnapshot é instalação adversarial EXPLÍCITA de fixture, NÃO GET/RNrender real. Helpers/jobs54d0814ace6e91565e0fa9c8722ea734594b015f e sessioncontext8a23f577cf222016694d6995822b632c0a71434f +34oldcontrols BYTEEXATOS. ReverseFULLfora5regiões reconstrói8254MAINcharsBYTEEXATOS(candidate8818). Requestbodylesspath/method/authheaders/ACKfields/UUID/profile/serverUPSERT/GETread/focusdeadline15s/querycategory/UIJSXstyles/handlersread/helpers/sessionqueue/API SQLRLSACLReact19.1.4RN0.81.6depslockworkflowsbuildsmoke intocados foraownscope.

Isolamento LOCAL:158MAINmobileblobs inicialmenteexatos exceto tsconfigLOCALadaptado, não publicado; apósfix157exatosexcetoTrabalhos+tsconfigLOCAL. Scratch antigos568 reapareceram no glob e a tentativa full contaminada foi REJEITADA. FULL941 atribuído somente à execução dos78paths de testes canônicos da árvoreMAIN+newtest; nenhum testeMAIN excluído/corpo modificado/assert relaxada. Nenhum Ganhos584/code568574581575573571558572 copiado.

Governança integral: seis normativos preservam FULLprefix584(branch90cc) que já começa com FULLMAIN75105; apêndice novo somente. Comprovação startsWith byteexata de ambos. NotaEARNINGS_CONTROLLER_CLEANUP_2026-10-18.md de584 reutilizada MESMOBLOB910545fa26432b9a5135db094d8baa38c41b7070 para preservar links/history; novaINTEREST_SCREEN_DEADLINE_2026-10-18.md preserva FULLFINAL58417369chars, inclusive auditLOCAL eprep anteriores. Não substituir originais por resumo/autoref/status/imagecommit. Memória>1MiB usarTREEpathSHA→fetch_blobFULL; contentsEMPTY não arquivo vazio.

584FINALgates: CI39156391666/job117760377495attempt1FAILquotaECRpostgres17ANTEScheckout18:55:36.4501679Z/43.4943406Z/53.3231549Z/Dockerpullfailed53.3326733Z, todosprodutosSKIP, ZEROretry/nãooutropara verde. OwnAPK39156391656/job117760377578attempt1SUCCESS actualcheckoutcedf110d819e78f53de4068c1a64a660215faaf9primary18:55:43.2093817Z SINTÉTICO[75105,90cc]/treed16d039ba48e5c5ccc379b75e48ade07fcc0a87f Gitconfirmadoigualcandidate. Build19:04:41.9710947Z/installSuccess19:06:23.4992537Z/DEVICE_SMOKE_OK19:06:35.8548384ZwithoutMetro. Artifact12147238228expires2026-11-01T19:06:36Z REALZIP28913017bytes/SHA256d58c7b27b6b264a7a4a5919fccca504f7e11fb9618bd44f43baa278076b68ca6APIexact;individualAPK66162212bytes/SHA256553c3b89981c4909e6b5e8ab052fc90e8efa68b401304ea74a79df75fe9bd77e/SHA256SUMSexact/BUILDINFOcedf/releasefixedpackage/metrofalse/build19:04:42Z/staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠Ganhosform/SecureStore/nativequeue/physical/VisualTruth/prod. 584DRAFTNOTMERGED CIREDproíbemergeAPKGREEN; FINALbody17369charswritten/readbackEXACT. NÃO584MAINAPK/nãorepetirreadymerge.

NOVOOWNCI/APK PENDENTES nesta preparação.1531=[145Web941mobile431API3CLI11monitor]SÓESPERADO,nãoexecutado. APK N/A FALSEmobilealterado; sóownCI+APKSUCCESS noSHA/contextoGit correto+freshMAIN/headbase/fullreview permitemexpectedSHAmergeONCE, depoispostCI/APKreais. NenhumPASSemprestado/retryrunning/cancel/bypass. Seinfra/browserfalhar, primário e independenteLOCAL, não rodadastatusonly/mesmologrerun.

Browserroot558ERR_ABORTED continuaUNRESOLVED;584CI nãoexecutouChrome, nãonovosabort/PNG/zeroNavatribuídos. Hipóteseestreitacontextotransition dentroondas já enfraquecidapelo558, não causaprova.568tambémobservouPOSTabortcom24GET200/ZEROGETfailed; não restringirroota12GET/API/CORS/vendor/framework. GuardCDPFetchCORSsandboxLNAdeadlineflagsassertsimages intactos. Sóárea10Androidstandalone TÉCNICAINTERNOaceita12pendentes/não%code; área3/5 não fechada por esta correção parcial. Externos215219220224228OPEN/Watch569CLOSEDcompletedfresh,semmanualActivitywrites. Rotinaúnicaenabledscheduleinalterados/novaautomação0/nãodesativarparcialtransientfimrodada. SemproduçãoRailwayNeonserviçoscustoscredenciaisprovidersPSPcontratosdinheirorealrootgrantsRLSdisable. Próximo: gates doNOVOHEAD e revisão completa; FINALmetadata+próximaentregafuncional, nunca commitapenasstatus.


## Recibo PR584 final integral (18273 caracteres)

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


## Corpo PR570 original integral (961 caracteres)

Escopo independente de #568 e do bloqueio Chrome/CDP. A leitura de /company/dashboard/assignments em apps/mobile/lib/company-replacements.ts aceitava datas calendáricas impossíveis normalizadas por new Date, inconsistentes com a validação já vigente de Safety/Agenda. Copiado o mesmo predicado de calendário (ano/mês/dia UTC verificados antes de aceitar timestamp finito), sem alterar endpoints, escrita, ACL, tenant ou lógica de seleção de substituto. Adicionados dois testes em company-replacements.test.mjs: datas inválidas em startsAt e endsAt devem produzir erro apenas na seção de assignments e preservar a seção de replacements; controles válidos leapday, offset, epoch e null devem permanecer ready. NÃO CONFIRMADO ainda: CI completo, APK do HEAD, pós-merge. Não dar ready nem merge antes dos gates, revisão de diff e documentação normativa por apêndice. Este PR foi preparado para obter evidência real de CI; nenhum resultado PASS está sendo presumido.
