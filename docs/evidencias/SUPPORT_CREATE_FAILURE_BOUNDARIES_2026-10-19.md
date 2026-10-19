# Support create — failure boundaries

## 2026-10-19T00:53Z — suporte: falhas internas e nova tentativa explícita

Escopo exclusivo MLIVRETRABALHO. Base main75105d42c873ca56b58fa1aa73cc4a682359e5c1/treecfac8574100022a5b576efade556920a7e282f0c revalidada;576578579582 já MERGED, não repetir. Uma entrega pequena de COBERTURA em apps/api/src/support-idempotency.controller.test.ts, não correção fictícia de bug: o controller já propaga as falhas. Sete testes originais FULL PREFIX BYTEEXACT e fixture original intacta; append de cinco casos canônicos (3 etapas parametrizadas+2 retentativas explícitas).

Contrato→código→teste: falhas no assignment lookup, INSERT keyed e fallback replay depois de perder INSERT propagam MESMO objeto Error sem ACK, consulta posterior, reenvio automático, UPDATE/DELETE ou autoridade forjada. Params continuam tenant/reporter autenticados+key normalizada+digest real. Após erro incerto no INSERT, somente uma nova chamada humana explícita pode consultar a linha existente fornecida pela fixture: retorna reviewing sem segundo INSERT nem exposição do hash, ou mantém conflito por digest divergente sem sobrescrever. Nenhuma mudança de idempotência, payload, retry, auth, SQL, RLS ou regra de produção.

Prova local Node24.19.0, classe SupportController FULLb7418f9c3473b15ee32a488b7b354816c80acf28+helpers FULLsupport-input5d34f38394575c3d0828a515976c9270c1aa472b/support-idempotencyad5002f06ba4b3af2c04b77eec26585924e8e934 e corpos canônicos:12PASS UTC/SP/0fail-skip-cancel (7old+5new). Mutante APENAS em memória engole erros depois da primeira consulta: sete antigos continuam7PASS, cobertura nova produz7PASS5FAIL no conjunto12; demonstra lacuna do oráculo antigo, NÃO defeito de produção. Nenhum helper mock ampliado foi necessário: replies já aceita Error sequencial.
Limites: imports/decorators Nest removidos APENAS adaptador local, FixtureBadRequest/Conflict/Forbidden explícitas/TStransform. Candidato publicado mantém imports reais; dependênciasNest/tsc locais ausentes, NÃO typecheck/canonical API/fullsuitePASS. Linhas existentes são FIXTURE EXPLÍCITA, NÃO prova de commit/rollback SQL, concorrência real, HTTP/Nestbootstrap, SecureStore/native/provider. Controlador, helpers e demais testes originais intactos. Reprodução integral na nota.
Expected novo CI1508=[145Web913mobile436API3CLI11monitor] SOMENTEesperado/nãoexecutado; main431API+5novos, não incorporar5testesAPI570 nem1041mobile draft. CI completo obrigatório ainda PENDENTE nesta preparação. APK N/A por todos blobs/modes não-docs idênticos a main fora do único testeAPI e pela entrada canônica Expo mobile→Gradle/buildsmoke/depslock/workflow idêntica; nenhuma execução Gradle nova alegada. Não atribuirAPK570 à nova branch/main; filtro standalone não inclui apps/api/src/*.test.ts nem docs. Confirmarpaths/base/HEAD antes de merge; ALLCI SUCCESS obrigatório e pós-CI real obrigatório.

Consolidação comprovada5706eb: PR570 permanece draft, CI39178536092/job117826179874attempt1FAIL quotaECRpostgres17 BEFOREcheckout2026-10-18T23:56:00.8678568/07.6618783/17.0043411Z/Dockerpullfailed17.0133371Z;TODOSprodutosSKIP/1636somenteesperado/ZEROretry/semnova recuperação primária. Não rerun para verde.
570APK39178536098/job117826179844attempt1SUCCESS. Actualcheckoutdda4cfd5e70dd51a57fbf90601b7dd4b2035cdfa primário23:56:04.9044521Z SINTÉTICO orderedparents[MAIN75105,6eb1b7aad525069474447139f11fa873a2692049]/treeb85cf39463a8a0df2912ae971444c92aa5628e7d igualcandidato Gitconfirmado, não HEADliteral. Build2026-10-19T00:06:52.2403131Z/installSuccess00:08:44.8311700Z/DEVICE_SMOKE_OK00:08:57.4132059ZwithoutMetro. Artifact12156070144 expires2026-11-02T00:08:59ZREALZIP28913408bytesSHA6305ea7a60db81b9a7e2ad1fe0c48009e2c34b325d490e82861162ce21fed2a2=API;APKindividual66162584bytesSHA6e22e19c70c684c234f010a71c38ef3c1a9af45a184d7fb162611ec8c3fa1753=SHA256SUMS/BUILDINFOdda4/releasefixedpackage/metrofalse/build00:06:52Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠forms/SecureStore/nativequeue/physical/VisualTruth/produção. FULLFINAL57018155chars preservado INTEGRAL na nota; os seis originais do draft570 permanecem integralmente na branch/SHA6eb (não foram substituídos por resumo/copiados como código de produto). Esta nova branch parte de main e preserva seis originaisMAIN FULL PREFIX IN PLACE+apêndice.
MAIN FULLCIRED582POST39143803021a2quota/ONEretry consumida; MAINstandalone técnico582POST39143802991literal75105, não570. Nenhuma nova área aceita; somente10técnicointerno/12pending. Não interpretar1/13como%implementação. Externos215219220224228 separados. Rootbrowser558 UNRESOLVED; nenhum Chrome novo observado no5706eb porque quota antes checkout.585POSTsignout e568POSTjobs abort com GET200 mostram que não é restrito12GET, não provaAPI/CORS/vendor/frameworkcausa. SecurityCDPFetchguardCORSsandboxLNAdeadlinesflagsassertsintactos. Nenhum registryfix572/DBfix575/outro draft produto/teste copiado. Sem root/grants/RLSdisable, produção/Railway/Neon/PSP/providers/credenciais/serviços/custos/contratos/dinheiroreal.

Próximo técnico: publicar branch independente testeAPI, confirmar novo HEAD e CI completo. Se quota antes checkout persistir sem recuperação primária nova, registrar log/ZEROretry e avançar prova independente permitida; não fingir typecheck/HTTPPG executado. Só CI próprioSUCCESS+freshdiff/base/HEAD permite merge esperado uma vez e pós-CI real; APK N/A só enquanto identidade de insumos provada. ReciboFINAL via metadataPR e consolidação apenas próxima entrega funcional, sem commit de status/autorreferência.
Nota: docs/evidencias/SUPPORT_CREATE_FAILURE_BOUNDARIES_2026-10-19.md

## Manifesto de preservação

Seis arquivos desta branch = FULLMAIN original+apêndice acima. Draft570 permanece FULL no SHA imutável6eb1b7aad525069474447139f11fa873a2692049, com histórico próprio recuperável; nenhum arquivo dessa branch foi reescrito. Não afirmar FULL570prefix nesta branch independente.

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "mainBlob": "e185d556d68c0551b4a203cefd7078d3d33f87ef",
    "mainChars": 1087051,
    "draft570Blob": "273eb1042693819d9f2073d3154bb6a31d0a3df2",
    "draft570Chars": 1127332
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "mainBlob": "9897fbf42ca25608afec4b1eb5bb2e7ecf853180",
    "mainChars": 1419623,
    "draft570Blob": "27c9f4603f2c841384a9150857fc35aa22195c06",
    "draft570Chars": 1459904
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "mainBlob": "c7b27817e779ce9d05c2547a8a15d0dfa7706474",
    "mainChars": 1077283,
    "draft570Blob": "7e38813b721fe5a0326c057778c32d25f4dff36a",
    "draft570Chars": 1117564
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "mainBlob": "edafe6d31fd321d9417d1665e80b0bc50e87f45a",
    "mainChars": 1072102,
    "draft570Blob": "f201c5fb41c21c331af2ce2ef1caa231741fbee9",
    "draft570Chars": 1112383
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "mainBlob": "50f65f8affc0c1debdcc08e0787a8f7c233eae4a",
    "mainChars": 1073194,
    "draft570Blob": "830b503ce2f6c556f615bc025eec492d53d0011b",
    "draft570Chars": 1113475
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "mainBlob": "989c6451f7b9671b3dfc2977ff1c5643244014e5",
    "mainChars": 669899,
    "draft570Blob": "b870861f88996e7e0395d1079031ff3706bc112c",
    "draft570Chars": 710180
  }
]
```

## Adaptador local integral — layout ./apps/api/src/ com fontes canônicas identificadas

node --test run-support-idempotency-local.test.mjs; TZ=America/Sao_Paulo para repetição. SUPPORT_LATE_FAILURE_MUTANT=1 apenas mutante em memória; SUPPORT_OLD_ONLY=1 para sete antigos.

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createHash,randomUUID} from 'node:crypto';
import {stripTypeScriptTypes} from 'node:module';
// Local fixture adapter only; committed canonical test retains all original real Nest imports.
const read=name=>fs.readFileSync(new URL('./apps/api/src/'+name,import.meta.url),'utf8');
const compile=source=>stripTypeScriptTypes(source,{mode:'transform'});
const helper=source=>source.replace(/^import .*$/gm,'').replace(/export /g,'');
const supportCaseInput=new Function(compile(helper(read('support-input.ts')))+';return supportCaseInput;')();
const {supportRequestKey,supportRequestDigest}=new Function('createHash',compile(helper(read('support-idempotency.ts')))+';return {supportRequestKey,supportRequestDigest};')(createHash);
class FixtureBadRequest extends Error {}
class FixtureConflict extends Error {}
class FixtureForbidden extends Error {}
const source=read('support.controller.ts').replace(/^import .*$/gm,'').replace(/@(Controller|Get|Post|Headers|Param|Body)\([^)]*\)/g,'').replace('export class SupportController','class SupportController');
const unused=()=>{throw Error('unexecuted helper');};
const Controller=new Function('supportCaseInput','supportRequestKey','supportRequestDigest','BadRequestException','ConflictException','ForbiddenException','randomUUID','compareTimestamp','exceptionSla',compile(source)+';return SupportController;')(supportCaseInput,supportRequestKey,supportRequestDigest,FixtureBadRequest,FixtureConflict,FixtureForbidden,randomUUID,unused,unused);
let tests=read('support-idempotency.controller.test.ts').replace(/^import .*$/gm,'');
if(process.env.SUPPORT_LATE_FAILURE_MUTANT==='1')tests=tests.replace('if(next instanceof Error)throw next;', 'if(next instanceof Error&&calls.length===1)throw next;if(next instanceof Error)return {rows:[]};');
if(process.env.SUPPORT_OLD_ONLY==='1')tests=tests.slice(0,tests.indexOf('const supportFailureStages='));
new Function('test','assert','SupportController','supportCaseInput','supportRequestDigest',compile(tests))(test,assert,Controller,supportCaseInput,supportRequestDigest);

```

## FULLFINAL570 anterior — integral

## FINAL 6eb — 2026-10-19T00:51Z

OwnAPK39178536098/job117826179844attempt1 SUCCESS. Actualcheckoutdda4cfd5e70dd51a57fbf90601b7dd4b2035cdfa primário2026-10-18T23:56:04.9044521Z SINTÉTICO pais[MAIN75105,6eb1]/treeb85cf39463a8a0df2912ae971444c92aa5628e7d igualHEAD, Gitconfirmado, NÃOliteral6eb. Build2026-10-19T00:06:52.2403131Z/installSuccess00:08:44.8311700Z/DEVICE_SMOKE_OK00:08:57.4132059ZsemMetro. Artifact12156070144 expires2026-11-02T00:08:59ZREALZIP28913408bytesSHA2566305ea7a60db81b9a7e2ad1fe0c48009e2c34b325d490e82861162ce21fed2a2=API;APKindividual66162584bytesSHA2566e22e19c70c684c234f010a71c38ef3c1a9af45a184d7fb162611ec8c3fa1753=SHA256SUMS;BUILDINFOdda4/releasefixedpackage/metrofalse/build00:06:52Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36. ZIP≠APK/installlaunch≠forms/SecureStore/nativequeue/physical/VisualTruth/produção.
CI39178536092attempt1FAIL ECRquotaANTEScheckout, allproductsSKIP/1636sóesperado/ZEROretry/semrecuperaçãoprimárianova. Não merge/ready/rerun6ebmesmoAPKgreen. MAIN75105inalterada/currentMAINstandalone582POSTliteral75105,não6eb. Só10técnicointerno/12pending. Este recibo supersede apenas APKpendente abaixo; histórico preservado integral. Gitconsolidação só próxima entrega funcional.

## Histórico integral anterior

# FINAL parcial — 2026-10-18T23:58Z: entrega de cobertura publicada, gates não completos

PR570 DRAFT NOTMERGED. HEAD6eb1b7aad525069474447139f11fa873a2692049/treeb85cf39463a8a0df2912ae971444c92aa5628e7d/parent5b592c812baff125b816a90fe14cade8a987213a, fast-forward normal com lease e forcefalse. Nenhum ready/merge/rerun/cancelamento/nova PR.

## Gates próprios

CI39178536092/job117826179874attempt1 COMPLETEDFAILURE, ZEROretry. Primário ECRpostgres17 toomanyrequests Data limit exceeded 2026-10-18T23:56:00.8678568Z /23:56:07.6618783Z /23:56:17.0043411Z; Dockerpullfailed23:56:17.0133371Z, ANTEScheckout. Checkout+TODOSprodutos SKIP.1636=[145Web1041mobile436API3CLI11monitor] SOMENTEesperado, não executado. Nenhum actualcheckoutCI/typebuildexport/unit/HTTPPG/Chrome/ProductionTruth/PNG novo. Sem recuperação primária nova após quota5b/71/029/eeac/584: NÃO rerun6eb para verde, sem registry/workflow/credenciais bypass. Nenhum12GETabort novo observado neste run.
APK39178536098/job117826179844attempt1 AINDAIN_PROGRESS Build nesta consulta. Smokeruleunit SUCCESS não equivale install/devicePASS. Nenhum buildfinal/install/DEVICE_SMOKE/artifactbytes/actualcheckoutAPK atribuído. APK N/A FALSE porque PRcumulativa mobile mudou; não emprestar APK5b/currentMAIN.
Próxima conferência prioritária: finalAPK e logs checkoutLiteralOuSintético/pais/tree + REALdownloadZIP/APIhash/tamanho vs APKindividual/SHA256SUMS/BUILDINFO/expiry. Running não cancelar/rerun. Mesmo APKsuccess não permite merge com CIred. MAIN75105 FULLCIRED582POSTquota/ONEretry consumida, standalone técnicoMAIN582POSTliteral75105. Só área10 técnico interno aceita,12pending.

## Revisão e prova da entrega

8paths desta entrega = testeAPI existente+6FULLoriginais append+nota. 1262/1269blobs existentes do5b e modos intactos;502non-docs foraúnicoAPItest BYTE/MODEiguais, incluindo todo mobile/controller/SQL/RLS/ACL/depslock/workflows/buildsmoke. 21paths acumulados PR conferidos contra árvore remota. ALL8novosUTF8 blobs gravados e FULLreadbackEXACT, modos100644; demais13paths herdados mesmos blobs. SixnormFULLprefix INPLACE, memória1.459.904chars (>1MiB: treepathSHA→fetch_blob; contentsEMPTYnãoemptyfile).
TesteAPI23eab05fe544532c5de9cad7217e19b7f3c1468c15.778chars. Reverse somente dois campos de opção+linha de injeção+apêndice reconstrói FULL13.802chars2f4865acbdbdaa79ac02feb1ff837373731b66fa,14oldbodies/asserts intactos. Controller809c27f1551c103adc9e6950f79555eb42d3b7db FULLinalterado.
14PASS5FAIL baseline mock-capability→19PASS UTC/SP; mutante seminjeção14PASS5FAIL. Não produtoRED/bugfix; local19 usa fixtureNestexceptions/decorator-removal/TStransform, não Nestbootstrap/tsc/HTTPPG/rollback. Candidato canônico mantém imports reais; CI obrigatório ainda SKIP. Não atribuir1041mobile de5b como novaexecução. FULLFINAL5b15453 integral notadocs/evidencias/REPLACEMENT_SELECT_FAILURE_BOUNDARIES_2026-10-18.md. GitpreparaçãoPENDING histórica; consolidar esteFINAL somente em próxima entregaFUNCIONAL, não commit de status/autorreferência.

## Após bloqueio: auditoria independente local de suporte

6novos modelos PASS usando SupportController FULLb7418f9c3473b15ee32a488b7b354816c80acf28 +support-input5d34f38394575c3d0828a515976c9270c1aa472b +support-idempotencyad5002f06ba4b3af2c04b77eec26585924e8e934, arquivos locais conferidos GitblobSHAexatos.4falhas lookupinicial/assignmentlookup/keyedINSERT/unique-key-loserreplay propagam MESMOError, semACK/SQLposterior/extraINSERT, parâmetros tenant/reporter/autenticados.2explicitretryfixtures após erroINSERT: existingreviewingACKsemhash/nãosegundoINSERT ou digestdivergenteConflictsemUPDATE. Existingrow é fixture EXPLÍCITA, NÃO prova de commit/rollbackSQL/HTTPPG/transação/SecureStore/native/provider.
Suporteproduto NÃO alterado/publicado,6models NÃO parte19/436/1636. Testes existentes support-idempotency7/supportcontroller4/intent7/status9 FULLlidos: JÁ cobremreplay/conflict/unique-keyloser/missingreplay/databasefirstfail/ACL/input, nãoabsenceclaim. #568 alterahelpers/testescalendarmobile+scriptsHTTPsuporte; #560fixtureSQLnotificationatomicitynãoalterasuporteunit. Não criarfixtureHTTP/PGduplicada, ler560FULLantesHTTPfaultwork. Próxima pequena frente: decidir apósfreshnorm/PRdupe se ampliar EXISTENTE support-idempotency.controller.test.ts com falhasassignment/INSERT/fallback mantendo7oldbodies, fixturesexistingrowexplicit/manualpolicy original. Não inventar bug nem mudarruntime/autoridade/idempotência/cancelserver. Não misturar patchsuporte em570semescopocoerente.
FULLsourceaudit abaixo, persistido metadataGit em vez de única cópia scratch.

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createHash,randomUUID} from 'node:crypto';
import {stripTypeScriptTypes} from 'node:module';
// Explicit in-memory adapter: no Nest bootstrap, HTTP, PostgreSQL or rollback claim.
const read=name=>fs.readFileSync(new URL(name,import.meta.url),'utf8');
const compile=source=>stripTypeScriptTypes(source,{mode:'transform'});
const helpers=source=>source.replace(/^import .*$/gm,'').replace(/export /g,'');
const supportCaseInput=new Function(compile(helpers(read('support-input.ts')))+';return supportCaseInput;')();
const {supportRequestKey,supportRequestDigest}=new Function('createHash',compile(helpers(read('support-idempotency.ts')))+';return {supportRequestKey,supportRequestDigest};')(createHash);
class FixtureBadRequest extends Error {}
class FixtureConflict extends Error {}
class FixtureForbidden extends Error {}
const source=read('support.controller.ts').replace(/^import .*$/gm,'').replace(/@(Controller|Get|Post|Headers|Param|Body)\([^)]*\)/g,'').replace('export class SupportController','class SupportController');
const unused=()=>{throw Error('unexecuted helper must not be used');};
const Controller=new Function('supportCaseInput','supportRequestKey','supportRequestDigest','BadRequestException','ConflictException','ForbiddenException','randomUUID','compareTimestamp','exceptionSla',compile(source)+';return SupportController;')(supportCaseInput,supportRequestKey,supportRequestDigest,FixtureBadRequest,FixtureConflict,FixtureForbidden,randomUUID,unused,unused);
const assignment='11111111-2222-3333-4444-555555555555',key='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
const body={assignmentId:assignment,category:'schedule',description:' fixture ',reporterIdentityId:'forged',tenantId:'forged'};
const digest=supportRequestDigest(supportCaseInput(body));
const stored={id:'case',category:'schedule',priority:'normal',status:'reviewing',createdAt:'2026-10-10T12:00:00Z',requestHash:digest};
function fixture(replies){
 const queries=[],contexts=[],memberships=[];
 const auth={identityFromAuthorization:async()=>({id:'trusted-reporter'}),requireMembership:async(...args)=>{memberships.push(args);return {role:'professional'};}};
 const db={tenant:async(tenant,op)=>{contexts.push(tenant);return op({query:async(sql,params)=>{queries.push({sql,params});const next=replies.shift();if(next instanceof Error)throw next;assert.ok(next,'unexpected SQL');return {rows:next};}});}};
 return {controller:new Controller(db,auth),queries,contexts,memberships};
}
const invoke=f=>f.controller.create(body,'Bearer fixture','trusted-tenant',key);
const stages=[
 {name:'initial replay lookup',prefix:'SELECT id,category',before:[],params:['trusted-tenant','trusted-reporter',key]},
 {name:'assignment lookup',prefix:'SELECT id FROM work_assignments',before:[[]],params:['trusted-tenant',assignment]},
 {name:'keyed INSERT',prefix:'INSERT INTO support_cases',before:[[],[{id:assignment}]],params:['trusted-tenant','trusted-reporter',assignment,'schedule','fixture','normal',key,digest]},
 {name:'unique-key loser replay',prefix:'SELECT id,category',before:[[],[{id:assignment}],[]],params:['trusted-tenant','trusted-reporter',key]},
];
for(const stage of stages)test('support exact failure propagates at '+stage.name+' without ACK or later query',async()=>{
 const error=new Error('explicit '+stage.name),f=fixture([...stage.before,error]);let ack;
 await assert.rejects(async()=>{ack=await invoke(f);},e=>e===error);
 assert.equal(ack,undefined);assert.equal(f.queries.length,stage.before.length+1);
 assert.ok(f.queries.at(-1).sql.startsWith(stage.prefix));assert.deepEqual(f.queries.at(-1).params,stage.params);
 assert.deepEqual(f.contexts,['trusted-tenant']);assert.deepEqual(f.memberships,[['trusted-reporter','trusted-tenant']]);
 assert.ok(f.queries.every(q=>!q.params.includes('forged')));
 assert.equal(f.queries.filter(q=>q.sql.startsWith('INSERT')).length,stage.before.length>=2?1:0);
});
test('human explicit retry after uncertain INSERT may read an existing factual case with no second INSERT',async()=>{
 const error=new Error('uncertain insert'),f=fixture([[],[{id:assignment}],error,[stored]]);
 await assert.rejects(invoke(f),e=>e===error);
 assert.equal(f.queries.length,3,'no retry occurs without the next explicit call');
 const ack=await invoke(f);
 assert.deepEqual(ack,{id:stored.id,category:stored.category,priority:stored.priority,status:'reviewing',createdAt:stored.createdAt});
 assert.equal('requestHash' in ack,false);assert.equal(f.queries.length,4);
 assert.equal(f.queries.filter(q=>q.sql.startsWith('INSERT')).length,1);
 assert.deepEqual(f.queries.at(-1).params,['trusted-tenant','trusted-reporter',key]);
 // Existing row is explicitly supplied by the fixture, not evidence of a real committed transaction.
});
test('explicit retry cannot overwrite an existing key with a different digest',async()=>{
 const error=new Error('uncertain insert'),f=fixture([[],[{id:assignment}],error,[{...stored,requestHash:'different'}]]);
 await assert.rejects(invoke(f),e=>e===error);assert.equal(f.queries.length,3);
 await assert.rejects(invoke(f),e=>e instanceof FixtureConflict&&e.message==='support_request_key_conflict');
 assert.equal(f.queries.length,4);assert.equal(f.queries.filter(q=>q.sql.startsWith('INSERT')).length,1);
 assert.equal(f.queries.some(q=>q.sql.startsWith('UPDATE')),false);
});

```

## Preparação da entrega — histórico integral

# SELECT failure-boundary coverage — 2026-10-18T23:56Z

HEAD 6eb1b7aad525069474447139f11fa873a2692049, tree b85cf39463a8a0df2912ae971444c92aa5628e7d, parent5b592c812baff125b816a90fe14cade8a987213a. Normal fast-forward, same PR570 DRAFT, no ready/merge/rerun. Runtime/mobile inputs unchanged from5b: 502 non-doc blobs/modes outside API test identical; 1262/1269 existing blobs/modes identical; 8 delivery paths,21 cumulative PR paths.

Five real new canonical API cases,14 old test bodies/assertions intact. Reproduced local coverage/mock gap14PASS5FAIL→19PASS UTC/SP; injection-removed mutant14PASS5FAIL. Local adapter removes Nest imports/decorators and substitutes fixture exceptions ONLY locally. Published test retains real NestJS imports; canonical typecheck/CI/HTTP/PG pending. No runtime bug fixed, no SQL rollback or native-UI proof. Expected total1636 is NOT an executed count.

Own fullCI/APK for new HEAD PENDING. APK remains applicable because cumulative mobile PR diff; old5bAPK SUCCESS is not newHEAD success. Exact primary5b final receipt and FULL previous body preserved in docs/evidencias/REPLACEMENT_SELECT_FAILURE_BOUNDARIES_2026-10-18.md. Six originals FULL prefix in place, append-only. Main75105 unchanged, fullCIRED582POSTquota; currentMAIN standalone technically measured582POSTliteral75105. Only area10 technical internal;12 areas pending; no new area acceptance.


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



