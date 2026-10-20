# Replacement SELECT — failure boundaries

## 2026-10-18T23:55Z — SELECT: cinco fronteiras de falha no teste existente (#570)

Entrega funcional de cobertura, não correção de defeito no controller. Base desta entrega: 5b592c812baff125b816a90fe14cade8a987213a, tree f8e0f9ce7f821d52af3ee5071205b49f165f00b1. MAIN revalidada: 75105d42c873ca56b58fa1aa73cc4a682359e5c1. PR570 permanece draft; nenhum merge/ready/rerun/cancelamento nesta preparação.

Requisito aproximado do aceite: substituições/seleção não podem fabricar ACK matched nem continuar SQL/repetir automaticamente após falha. O controller existente já propaga essas falhas. Lacuna reproduzida: setup.error do teste canônico só falha antes do callback tenant; não permite alcançar as cinco fronteiras internas. Os 14 testes anteriores e suas assertivas permanecem integralmente iguais. Adicionados failSqlPrefix/sqlFailure opcionais ao mock e uma injeção após registrar a consulta, mais cinco casos parametrizados no mesmo apps/api/src/replacement-input.controller.test.ts.

Fronteiras: INSERT work_assignments; UPDATE work_assignments; UPDATE replacement_requests; SELECT active_tenant_professional_identity; INSERT notifications. Cada caso exige MESMO objeto Error, nenhum ACK, consulta falha exatamente uma vez e última, ausência de SQL posterior, tenant/membership confiáveis e parâmetros sem autoridade forjada. Não é prova de rollback SQL, transação real, entrega de notificação, HTTP/NestJS ou exploração.

Prova local Node24.19.0, adaptador explícito do controller FULL e corpos reais dos testes: nova cobertura com mock anterior 19 casos = 14 PASS/5 FAIL; mock ampliado 19 PASS/0 FAIL-SKIP-CANCEL em UTC e America/Sao_Paulo. Mutante somente em memória removendo injeção: 14 PASS/5 FAIL. Remover os dois campos opcionais, a única linha de injeção e o apêndice de testes reconstrói BYTE A BYTE os 13.802 caracteres do teste anterior (blob2f4865acbdbdaa79ac02feb1ff837373731b66fa); candidato15.778 caracteres. Controller FULL809c27f1551c103adc9e6950f79555eb42d3b7db inalterado.
Limite local: imports/decorators Nest removidos APENAS no adaptador temporário e exceções FixtureError explícitas; candidato publicado mantém imports reais Nest/controller. Dependências/tsc/NestJS locais ausentes: NÃO declarar typecheck/canonical CI/431+5 API/full-suite locais PASS. Adaptador reproduzível integral na nota vinculada. Anteriores1041 mobile locais são SÓ escopo exato5b previamente registrado, não execução nova deste HEAD.

CI completo novo obrigatório/PENDENTE nesta preparação. Contagem agregada esperada1636=[145Web1041mobile436API3CLI11monitor], NÃO executada/observada. Apesar delta test-only, PR570 cumulativa contém mobile e workflow standalone-pilot-apk aplicável; exigir resultado próprio do novo HEAD, não emprestar APK5b. Runtime/controller/SQL/RLS/ACL/mobile/helpers/auth/payload/deadlines/React19.1.4/RN0.81.6/lock/workflows/build/smoke intactos. Original seis normativos mantidos FULL PREFIX IN PLACE, este registro apenas append. Histórico MAIN e demais drafts preservados pela árvore anterior.

Reconciliação5b primária: CI39174241513/job117813502896attempt1 FAILURE ECRpostgres17 quota antes checkout (22:54:26.7731271/28.5240846/30.7593274Z; Dockerpullfailed22:54:30.7667688Z), todos produtos SKIP;1631 só esperado, ZEROretry/sem recovery nova. Não há novo Chrome/12GETabort nesse run.
APK39174241503/job117813502878attempt1 SUCCESS, checkout ee4b429d4f744101f5e845e80d340a647d72b9e4 SINTÉTICO pais ordenados[MAIN75105,5b], treef8e0 igual candidato, primário22:54:28.5744764Z. Build23:04:30.6178447Z/installSuccess23:05:50.4284168Z/DEVICE_SMOKE_OK23:06:03.6518574Z semMetro. Artifact12153378489 expires2026-11-01T23:06:05Z REALZIP28913425 bytes SHA25666bb8e7adc83c143fc41d0f33054c75f6faf93c8f9c601fa720a3b71cbac953e=API; APK66162584 bytes SHA2569a99576b09d7cd64270a499c99152ff54374290f5927f9a1f217d765ab8fb515=SHA256SUMS; BUILDINFOee4b/release/package fixo/metrofalse/build23:04:31Z, manifesto baselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36. ZIP≠APK/installlaunch≠formulário/SecureStore/nativequeue/físico/VisualTruth/produção. FULLFINAL5b15.453 caracteres preservado integralmente na nota.
MAIN FULLCIRED582POST39143803021attempt2 quota antes checkout/ONEretry consumida; MAINstandalone582POST39143802991literal75105 continua referência, não APK5b. Não repetir merges576578579582.

Só área10 standalone tecnicamente aceita internamente;12 sem aceite integral. Este teste aproxima requisito→teste, NÃO fecha área/percentual de código. Root browser558 permanece UNRESOLVED; observações568/585 incluem POST abort com GET200, não só12GET e não prova causa API/CORS/vendor/framework. Nenhuma mudança em segurança/CDP/Fetchguard/CORS/sandbox/LNA/flags/deadlines/assertivas, registry, grants ou produção. Nenhum custo/PSP/Railway/Neon/credencial/provider/contrato/dinheiro real.

Próximo passo: publicar fast-forward normal esperado5b no MESMO570, conferir testes Nest/CI completo e APK próprios. Infra quota sem recuperação primária nova: registrar bloqueio sem rerun para verde e seguir frente independente. Só ALLSUCCESS+freshHEAD/base/diff/modes permitem merge SHA esperado e pós-CI/APK reais. Detalhes finais via metadata PR e consolidação Git apenas em próxima entrega funcional, sem commit de status/autorreferência.
Evidência vinculada: docs/evidencias/REPLACEMENT_SELECT_FAILURE_BOUNDARIES_2026-10-18.md

## Adaptador local integral (não substitui NestJS/HTTP/PG)

Executar em Node24: node --test next-audit/run-replacement-input-tests-local.test.mjs. Layout relativo do adaptador: ../apps/api/src/{replacement.controller.ts,replacement-input.controller.test.ts}, bytes canônicos do pai/candidato identificados acima. TZ=America/Sao_Paulo para segunda execução; SELECT_FAILURE_MUTANT=1 somente para mutante.

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {stripTypeScriptTypes} from 'node:module';
// Local adapter only. The committed test keeps real NestJS imports for canonical CI.
class FixtureBadRequest extends Error {}
class FixtureForbidden extends Error {}
class FixtureUnauthorized extends Error {}
const controller=fs.readFileSync(new URL('../apps/api/src/replacement.controller.ts',import.meta.url),'utf8');
const adapted=controller.replace(/^import .*$/gm,'').replace(/@(Controller|Get|Post|Headers|Param|Body)\([^)]*\)/g,'').replace('export class ReplacementController','class ReplacementController');
const Controller=new Function('BadRequestException','ForbiddenException',stripTypeScriptTypes(adapted,{mode:'transform'})+'\nreturn ReplacementController;')(FixtureBadRequest,FixtureForbidden);
let tests=fs.readFileSync(new URL('../apps/api/src/replacement-input.controller.test.ts',import.meta.url),'utf8').replace(/^import .*$/gm,'');
if(process.env.SELECT_FAILURE_MUTANT==='1')tests=tests.replace('if(options.failSqlPrefix&&sql.startsWith(options.failSqlPrefix))throw options.sqlFailure??new Error(\'fixture_sql_failure\');','');
const run=new Function('test','assert','ReplacementController','BadRequestException','ForbiddenException','UnauthorizedException',stripTypeScriptTypes(tests,{mode:'transform'}));
run(test,assert,Controller,FixtureBadRequest,FixtureForbidden,FixtureUnauthorized);

```

## FULLFINAL5b anterior — preservado integralmente

# PR5705b — APK próprio final verificado (2026-10-18T23:52Z)

OWNCI39174241513a1/job117813502896 permaneceFAILquotaECRANTEScheckout/ZEROretry/TODOSprodutosSKIP.1631sóesperado,nãoCIunitexecutado. Não ready/mergeCIredmesmoAPKverde.

OWNAPK39174241503/job117813502878attempt1COMPLETEDSUCCESS/ZEROretry. Actualcheckoutee4b429d4f744101f5e845e80d340a647d72b9e4 primary22:54:28.5744764ZSINTÉTICOorderedparents[MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1,5b592c812baff125b816a90fe14cade8a987213a]/treef8e0f9ce7f821d52af3ee5071205b49f165f00b1igualcandidataGitconfirmado,NÃOliteralHEAD. Build23:04:30.6178447Z/installSuccess23:05:50.4284168Z/DEVICE_SMOKE_OK23:06:03.6518574ZwithoutMetro.

Artifact12153378489expires2026-11-01T23:06:05ZREALdownloadZIP28913425bytes/SHA66bb8e7adc83c143fc41d0f33054c75f6faf93c8f9c601fa720a3b71cbac953e=API. IndividualAPK66162584/SHA9a99576b09d7cd64270a499c99152ff54374290f5927f9a1f217d765ab8fb515=SUMS. BUILDINFOee4b/releasefixedpackage/metrofalse/build23:04:31Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠Substituicoesform/SecureStore/nativequeue/physical/VisualTruth/prod. MAINstandalonecontinua582POST75105,nãoAPK5bmain.

## Histórico anterior integral

# PR570 READcleanup — CI próprio bloqueado antescheckout (2026-10-18T22:56Z)

HEAD 5b592c812baff125b816a90fe14cade8a987213a/treef8e0f9ce7f821d52af3ee5071205b49f165f00b1/parent71;MAIN75105inalterada.DRAFTNOTMERGED/ZEROready/merge/rerun.

OWNCI39174241513/job117813502896attempt1COMPLETEDFAILURE/ZEROretry.ECRpostgres17toomanyrequestsDataLimit22:54:26.7731271Z/22:54:28.5240846Z/22:54:30.7593274Z/Dockerpullfailed22:54:30.7667688ZANTEScheckout.Checkout+TODOSprodutosSKIP.1631agregadoSÓESPERADO,nãoexecutado;1041LOCAL. NenhumactualCIcheckout/typecheck/build/export/unit/HTTPPG/Chrome/ProductionTruth/PNG5bnovo.SemRECOVERYprimárioNOVOapós71/029/eeac/584falhas,NÃOretry5bparaverde/registryworkflowcredentialbypass.Log https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39174241513/job/117813502896 .

OWNAPK39174241503/job117813502878attempt1AINDAIN_PROGRESSBuild22:56UTC;APKN/Afalsemobilealterado/semfalhaobservada. Semfinalbuild/install/DEVICE_SMOKE/artifactbytes/actualAPKcheckoutatribuído;smokeruleunit≠nativePASS. PrimeiropróximocicloFINALAPK/logcheckoutGitparents/tree/artifactREALdownloadZIP≠individualAPK/SUMS/BUILDINFO/expiry/rejeitarparciais/APIhash. Não cancel/rerunrunning/ready/mergeCIredmesmoAPKSUCCESS.MAINstandalone582POST75105,nãoAPK5bcandidata.

23newbaseline17PASS6FAIL→23GREEN/141focalTZ/1041fullcanonicalUTC+SPPASS0fail-skip-cancel. MutanteLOCALonlyinmemoryinsere controllers.current.clear() junto cleanupREADpróprio→14PASS9FAIL; prova que os testes rejeitam limpeza ampla que removeNEWREAD/CREATE/MATCH/SELECT. Produto publicado não modificado/NÃOCIcount.40SELECT/36CREATE/27MATCH/13helper/2ACKUUIDBYTEEXATOS. ALL19PRpathsSHA/modos100644freshreview,9NEWgeneratedFULLUTF8readbackEXATO+10preservados;1260existing71blobsiguaisfora7modified/1250of1259MAINblobsiguaisfora9modified.6FULLnormprefixNO LUGARappend.

## Frente independente após bloqueio: API SELECT/falhas de escrita (LOCAL)

ReplacementController809c27f1551c103adc9e6950f79555eb42d3b7db +replacement-input.controller.test.ts2f4865acbdbdaa79ac02feb1ff837373731b66fa +http-replacement-e2e.shf1025db62e0e534d874fa7252123f29e749f07a0 +replacement-selection-concurrency-e2e.cjse96d0d8b6755d75829095da0435805f9b5dbe7a6 lidos. Existem controles de ACK/roles/input/lifecycle/locks e corrida real/rollback de candidato inativo; NÃO ausência de testes/não duplicar fixture. NovoLOCAL8modelsPASS:5injectedSQLboundaries(INSERTassignment/UPDATEoriginal/UPDATEreplacement/lookuprecipient/INSERTnotification)propagam MESMOerro, semACK/retry/queries posteriores;2positivesrecipienttrue/falsemantêmACKnewassignmentId e targetDBresolvido;roleforbidden0tenantSQL. HarnessexecutaFULLclasseactualcomimports/decoratorsremovidosAPENASfixture+TStransform, exceçõesNestsubstituídasporErrorfixture/adapterSQLINMEMORY, nãoNestHTTP/runtime real. SQL/corpos algoritmos originais byteexact. NÃOrollbackSQL/PG/HTTP/notificationdelivery/native/produção. NENHUMAPIprodutopatch/publicação/CI/NÃOparte23/1041/1631. Prova nova de propagação, não defeito corrigido.

Próximo candidato independente: acrescentar casos de falha SELECT aos testesAPI EXISTENTES com opção failSqlPrefix no harness, mantendo todos14bodies/asserçõesoriginais; só após contrato/dupe/freshnormreview, sem mudarprodutoporhipótese. HTTP/PG rollback de falha de notificação continua exigir fixture isolada nova/extendexisting sósecoerente e não duplicada (560éatomicidadedechat separada). Nãoexecutarprod, grants/root/RLSbypass.

Fonte integralreproduzível abaixo (scratchnext-audit/replacement-select-failure-boundaries.test.mjs; arquivo replacement-controller-source.ts deve ser FULLblob809c27f1551c103adc9e6950f79555eb42d3b7db). Nãoapenastransiente.

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const raw=fs.readFileSync(new URL('./replacement-controller-source.ts',import.meta.url),'utf8');
const adapted=raw.replace(/^import .*$/gm,'').replace(/@(Controller|Get|Post|Headers|Param|Body)\([^)]*\)/g,'').replace('export class ReplacementController','class ReplacementController');
const code=stripTypeScriptTypes(adapted,{mode:'transform'});
class FixtureBadRequest extends Error {}
class FixtureForbidden extends Error {}
const Controller=new Function('BadRequestException','ForbiddenException',code+'\nreturn ReplacementController;')(FixtureBadRequest,FixtureForbidden);
const ID='11111111-2222-4333-8444-555555555555',P='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',A='66666666-7777-4888-8999-000000000000',J='77777777-2222-4333-8444-555555555555',N='99999999-2222-4333-8444-555555555555',T='bbbbbbbb-cccc-4ddd-8eee-ffffffffffff';
function setup(failAt,recipient=true,role='owner'){
 const calls=[],contexts=[],memberships=[],failure=new Error('explicit injected '+failAt);
 const db={tenant:async(tenant,op)=>{contexts.push(tenant);return op({query:async(sql,params)=>{calls.push({sql,params});if(failAt&&sql.startsWith(failAt))throw failure;if(sql.startsWith('SELECT assignment_id'))return {rows:[{assignmentId:A}]};if(sql.startsWith('SELECT job_id'))return {rows:[{jobId:J,status:'confirmed',isOriginalProfessional:false}]};if(sql.startsWith('SELECT 1 FROM'))return {rows:[{}]};if(sql.startsWith('INSERT INTO work_assignments'))return {rows:[{id:N,status:'confirmed'}]};if(sql.startsWith('SELECT active_tenant_professional_identity'))return {rows:recipient?[{identityId:'db-resolved-recipient'}]:[]};return {rows:[]}}})}};
 const auth={identityFromAuthorization:async authorization=>{assert.equal(authorization,'Bearer fixture');return {id:'trusted-identity'}},requireMembership:async(...args)=>{memberships.push(args);return {role}}};
 return {controller:new Controller(db,auth),calls,contexts,memberships,failure};
}
const boundaries=['INSERT INTO work_assignments','UPDATE work_assignments','UPDATE replacement_requests','SELECT active_tenant_professional_identity','INSERT INTO notifications'];
for(const [index,sql]of boundaries.entries())test('LOCAL actual SELECT '+sql+' failure propagates exact error without ACK/retry',async()=>{
 const h=setup(sql);let ack;
 await assert.rejects(async()=>{ack=await h.controller.select(ID,{professionalId:P,tenantId:'forged',identityId:'forged'},'Bearer fixture',T)},e=>e===h.failure);
 assert.equal(ack,undefined);assert.deepEqual(h.contexts,[T]);assert.deepEqual(h.memberships,[['trusted-identity',T]]);
 const last=h.calls.at(-1);assert.ok(last.sql.startsWith(sql));assert.equal(h.calls.filter(x=>x.sql.startsWith(sql)).length,1);
 assert.equal(h.calls.some(x=>boundaries.slice(index+1).some(next=>x.sql.startsWith(next))),false);
 if(sql==='INSERT INTO notifications')assert.deepEqual(last.params,[T,'db-resolved-recipient']);
 assert.ok(h.calls.every(x=>!x.params?.includes('forged')));
 // This adapter records calls only. It does NOT simulate or prove SQL rollback.
});
for(const recipient of [false,true])test('LOCAL actual SELECT positive recipient '+recipient+' retains exact ACK and trusted notification target',async()=>{
 const h=setup(undefined,recipient),row=await h.controller.select(ID,{professionalId:P},'Bearer fixture',T);
 assert.deepEqual(row,{replacementRequestId:ID,assignmentId:N,replacedAssignmentId:A,professionalId:P,status:'matched'});
 const notices=h.calls.filter(x=>x.sql.startsWith('INSERT INTO notifications'));assert.equal(notices.length,recipient?1:0);
 if(recipient)assert.deepEqual(notices[0].params,[T,'db-resolved-recipient']);
 assert.deepEqual(h.calls.find(x=>x.sql.startsWith('UPDATE work_assignments')).params,[A,T]);
 assert.deepEqual(h.calls.find(x=>x.sql.startsWith('UPDATE replacement_requests')).params,[ID,P,T]);
});
test('LOCAL actual SELECT unauthorized role rejects before database tenant callback',async()=>{
 const h=setup(undefined,true,'member');await assert.rejects(h.controller.select(ID,{professionalId:P},'Bearer fixture',T),e=>e instanceof FixtureForbidden&&e.message==='company_role_required');assert.equal(h.calls.length,0);assert.equal(h.contexts.length,0);
});

```

## Preparação anterior integral preservada

# PR570 — limpeza do controller e timer da leitura expirada

NOVO HEAD 5b592c812baff125b816a90fe14cade8a987213a/treef8e0f9ce7f821d52af3ee5071205b49f165f00b1/parent71d95202d192cfd0c1981ab1a7cab419c97f3c54;MAIN75105inalterada. Fastforwardnormal no PR existente,semforce/novaPR/rerunold. CI/APK próprios pendentes.



## 2026-10-18 — PR570: cleanup do controller e timer da leitura de substituições

Requisito → código → teste: área5/8, leitura expirada deve retirar seus recursos locais mesmo quando auth/transporte/JSON/authfinal não retornam. UIERROR/busyfalse/pendingfalse/snapshotnull já estavam corretos; isto NÃO é correção de busytravado, heapexhaustion, tenantleak ou cancelamento SQL. Base71d95202d192cfd0c1981ab1a7cab419c97f3c54/tree021f28d2eb2e70df0fcfcac9b94d7ea2f9216c4b;MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1 inalterada. Estender MESMOPR570normalfastforward/expectedSHAsemforce/novaPR/rerunoldSHA.

Fix mínimo APENAS12caracteres op.finish(); no callback deadlineREAD de apps/mobile/app/substituicoes.tsx antes da guarda generation+sequence de UI. Captura op próprio: operation já aborta controller antescallback; finish cancela próprio timer e remove próprio controller Set, inclusive callbackstale sem tocar UI nova. Finally original permanece idempotente. Retirada da única adição reconstrói FULL11736chars71 BYTEEXATOS→11748candidateSHAe2cf5a9af0d4cfc6755fd857cf6de91f30c45b80. Nenhum request/UItext/JSON/parser/helper/15s/auth/contextguard/JSXstyle/import/açãoMATCH/CREATE/SELECT/ACK/sessionqueue/API SQLRLSACLReact19.1.4RN0.81.6depslockworkflowsbuildsmoke/securityCDPFetchguardCORSsandboxLNAflags/deadlines alterado. READnãoenviaPOST e continua retentativa explícita.

23novos apps/mobile/tests/replacement-read-controller-cleanup.test.mjs10160chars usam handlerpréJSXREAL+loadReplacementsREAL+fixtureshooks/auth/fetchJSON/timers com assertdelay15000. BaselineEXATO71corrigido17PASS6FAIL→23PASS. Quatroawaits +positivospopulado/vazio, timer/controller0antesdependencyresume, oldfinally/oldtimer vsNEWREAD eNEWCREATE/MATCH/SELECTsamefocus, blurrefocus,20EXPLICITmanualreadsbounded e stale-seqresource vsnewverifiedsnapshot. Modelo inicial de tenant-antesauth esperava erro indevido: CORRIGIDO ANTESpatch para exigir leitura legítima com NEWheaders e limpeza dos drafts antigos; mudança tenantAPÓSJSON continuaerror/snapshotnull. Não contar errodoharness como defeito do produto. SAMEepochNEWsnapshot/recommendationadversarialéfixture explícita,nãoAPI/RNrender.

141focalPASS[23new+40SELECT+36CREATE+27MATCH+13helper+2ACKUUID],SãoPaulo141PASS. FULL1041LOCALPASSUTC+SP[1018pai71+23new],0fail/skip/cancel;82canonicalTREEtestpathsTODOSexistentesassert. Preflightrestauroucandidatospós582/test24e6helpersMAIN antesFULL,nãofullcontaminadoatribuído.160existingmobileblobsSHAexatosforaSubstituicoes+LOCALtsconfigadaptadoNÃOPUBLICADO. Typechecklocalindisponível,nãoPASS/CIobrigatório.40SELECT747753e9f044c02377a149a815211e5117ea58bc/36CREATEd0423c9b93767886251470009fede3a8ad0e34c3/27MATCHa297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76/helper5707f52/test456bdc/2ACKUUIDBYTEEXATOS. Nenhumoutrodraftproduto/testcopy.

Limites: Node/modelos não são ReactNative/SecureStore/HTTPPG/native/físico/VisualTruth/prod, garantia de memória/ausência de commit SQL/idempotência durável. Prazo/recursosárea5/8 mais próximo,nãoaceiteintegral. Somente10AndroidstandaloneTÉCNICAINTERNOaceita;12pending,não%code.

Reconciliação primária71: OWNCI39169430907a1/job117799211221FAILquotaECRANTEScheckout/ZEROretry/TODOSprodutosSKIP;1608sóesperado,nãounitexecutado. OWNAPK39169430905a1/job117799211090SUCCESSactualcheckouta64ea843d6ca341f4ad6b8fae1cccdc044b83a5cSINTÉTICO[MAIN75105,71]/tree021figualcandidataGitconfirmado,NÃOliteralHEAD. Build21:56:03.1859836Z/install21:57:10.1089635Z/DEVICE_SMOKE_OK21:57:22.3339524ZwithoutMetro.Artifact12151374410expiresNov1T21:57:24ZREALZIP28913376/SHA48869d739bd1090063d388b4e15ac6240cf680ff3e1ba86629d6d2cd846893a6=API;individualAPK66162572/SHA4ff26d3026957e47553946159f717419522d0381f31896e6bcb862888ff830d3=SUMS/BUILDINFOa64ea/releasefixedpackage/metrofalse/build21:56:03Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36.ZIP≠APK/installlaunch≠Substituicoesform/SecureStore/nativequeue/physical/VisualTruth/prod. CIREDproibiumerge71;NÃOemprestaroldAPKaoNOVOHEAD. FULLFINAL71 17043chars preservadoINTEGRALnovaREADnota.

Gates NOVOHEAD CI/APK PENDENTES nesta preparação histórica:1631=[145Web1041mobile431API3CLI11monitor]SÓESPERADO,nãoexecutado/APKN/Afalse. NãoReady/Mergeantes ownCI+APKALLSUCCESS/revisãofreshMAIN/base/head/todospaths+modes;somenteexpectedSHAmergeONCE+POSTCIAPKreais.MAINcontinua75105FULLCIRED582POSTquota/ONEretryconsumida eAPKstandalone582POSTvalidado. SemRECOVERYprimárioNOVOapós71/029/eeac/584,nãorerunoldparaverde/registryworkflowcredentialsbypass.

Rootbrowser558UNRESOLVED;nenhumChromeeeac/029/71devidoquota.585POSTsignoutabortapósOPTIONS204/71GET200+1controlled503/ZEROGETfailed,568POSTjobsabort24GET200;nãorestrito12GET,nãocausaCORS/API/vendor/framework/nãoemprestar558zeroNav. Controlessegurançaintactos.SemproduçãoRailwayNeon/custosserviços/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/manualActivitywrites.

Próximotécnico: primários CI/APKNOVOHEAD/checkoutGitparents/tree/artifactREALZIPvsindividualAPK/SUMS/BUILDINFO. Se quota/browserbloqueiam semnovaevidência,nãorerunmesmoSHAparaverde;auditar outro item matriz sempatchporhipótese/duplicarPR. FINALmetadataPR e consolidaçãoGitSÓpróximaentregaFUNCIONAL,nãostatus/selfref/image/activitycommit.6FULLoriginais71PREFIXNO LUGARappend;MAINrecuperávelFULLmanifestoanterior,nãoresumo.


NotaFULLrecibo71: https://github.com/dbdanielbaracho/MLIVRETRABALHO/blob/5b592c812baff125b816a90fe14cade8a987213a/docs/evidencias/REPLACEMENT_READ_CONTROLLER_CLEANUP_2026-10-18.md

Review:9NEWpathsFULLUTF8remote readbackEXATO100644;1260existing71blobs+modosexatosfora7modified.23newtests/141focal/1041fullLOCAL.UTC/SP.CI1631somenteesperado.40SELECT/36CREATE/27MATCH/13helper/2ACKUUID/helper570oldcalendarbyteexact.6FULLnormprefixNO LUGARappend.Nãoready/mergeantesCI+APKALLSUCCESS.
