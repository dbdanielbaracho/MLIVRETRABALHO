# Safety mine — authority dependency failure boundaries


## 2026-10-19T03:38Z — leituras de segurança: falhas de identidade e vínculos antes de qualquer tenant

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. MAIN revalidada75105d42c873ca56b58fa1aa73cc4a682359e5c1/treecfac8574100022a5b576efade556920a7e282f0c. PR586 existente, base ee97b684aa98acc6727bc6e61b6730826bfe3b3a/treec0c2f5f5c6c67cb00d3c44237e415dcb3b85c1c5. Todos14PRs abertos e seus arquivos consultados: só586 altera o teste alvo.576578579582 já integrados; não repetir.

Entrega única: quatro casos canônicos no teste EXISTENTE apps/api/src/safety-support-chronology.test.ts: SafetyCases/SafetyAppeals × falha identityFromAuthorization/memberships. Falha de identidade é exercitada em leituras com e sem tenant explícito; enumeração de vínculos só no fluxo sem tenant. Mesmo objeto Error deve ser propagado, sem ACK nem lista vazia/parcial, sem trabalho de tenant/SQL, sem repetir dependências; ordem e parâmetros originais de identidade/vínculos são assertados. O controller já cumpre esse contrato; não é defeito de produto corrigido. mineFixture ganha authFailure opcional e authEvents, sem ampliar harness genérico. Retirar quatro mudanças da fixture e o apêndice recompõe FULL8426bytes do blob5a9de774588833dedfa5aec43a612627414d23df. Novo teste10095bytes/blob6459fb23cf7a24d915bb8fb44b2538cec92e5b23. Quinze casos anteriores/assertivas preservados. Os12create eabe811e64a47f633d17b72d4ee6d391d691f9a5 intactos.

Validação local Node24.19.0:19chronology +12create =31PASS UTC e America/Sao_Paulo,0fail/skip/cancel. Novos casos com fixture anterior:15PASS4FAIL, lacuna de capacidade de injeção do mock, NÃOprodutoRED. Mutante LOCALONLY que oculta falhas de identidade/enumeração e devolve[]: quinze antigosPASS, conjunto19=15PASS4FAIL. Mutante não publicado. FULL3controllers e5fontes auxiliares/testecreate locais conferidos por SHA Git exato. Um newline extra de materialização scratch foi removido antes da conferência final; não publicado nem atribuído a produto. Reprodução integral na nota. Publicado mantém importsNest reais; local usa adaptadores explícitos com classes/helpers/corpos canônicos, imports/decorators removidos só no adaptador e FixtureExceptions. Nest/TypeScript locais ausentes; NÃOtypecheckcanônico/fullAPI447/NestHTTP/HTTPPG/RLSenforcement/provider/nativePASS.

Requisito das áreas8/11 ficou mais próximo do aceite por impedir regressão de autoridade não estabelecida. Aceite técnico/funcional interno é responsabilidade do assistente conforme delegação já preservada integralmente nos seis originais; não aguarda confirmação humana. Nenhuma área nova aprovada: só10Androidstandalone técnico interno/12pending.

Reconciliação FINAL do pai: CI39191819663/job117866086541attempt1FAIL, log primário ECRpostgres17toomanyrequestsDataLimit2026-10-19T02:50:18.7128529Z/02:50:25.0401430Z/02:50:29.0587095Z;Dockerpullfailed02:50:29.0707124Z ANTEScheckout. Checkout/TODOSprodutosSKIP,1515 apenas esperado, não executado; ZEROretry/sem recuperação primária nova. Não emprestar testes de outroSHA, não rerun antigo para verde, não mudar registry/workflows/credenciais. FULLFINALpai9740chars preservado na nota desta entrega. GitprepPENDING histórico permanece.

Novo CI completo obrigatório/PENDENTE nesta preparação.1519=[145Web913mobile447API3CLI11monitor] SOMENTEESPERADO, não executado. APK N/A por identidade cumulativa de497blobs não-documentais fora dos dois testesAPI e ALL159mobile/depslock/workflows/buildsmoke; script canônico Expo mobile→Gradle e filtroStandalone relidos/inalterados. Nenhum prebuild/APK586 construído/emprestado. MAIN CI582POST39143803021a2redinfra/ONEretryconsumida e standalone técnico582POST39143802991literal75105 continuam referências distintas.

Seis originais recebem FULLprefixee97b+apêndice desta entrega; FULLMAINprefix também verificado byteexato. Memória>1MiB lida porTREEpathSHA→fetch_blobFULL; APIcontentsEMPTY não arquivo vazio. Nota contém FULLhistórico pai e reprodutores, preservando todas as histórias anteriores. Sem outro draft produto/teste copiado, sem alteração de runtime/API/SQLRLSACL/authpolicy/React19.1.4RN0.81.6/lock ou controlesCDPFetchguardCORSsandboxLNAflags/deadlines/asserts. Rootbrowser558UNRESOLVED; pai não executou Chrome por quota antescheckout;585signoutPOST/568jobsPOST abort com GET200 não provam causa API/CORS/vendor/framework. Semprodução/Railway/Neon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable.

Próximo: fast-forward no mesmo586 com expectedHEADee97b, consultar ownCI semrerun para verde. Se quota persistir, registrar primário e avançar prova independente. SóCIcompletoSUCCESS+freshMAIN/base/head/fullpaths/modes+APKN/A ainda válida permitem mergeexpectedSHA uma vez ePOSTCI real; nunca mergeCIred. Consolidar FINAL somente próxima entrega funcional, sem commit artificial de status.
Nota: docs/evidencias/SAFETY_MINE_AUTH_FAILURE_BOUNDARIES_2026-10-19.md

## Manifesto de preservação dos originais

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "parent": "815a62b18bdbc04b5d131631a1a49f1586d9d623",
    "chars": 1103422,
    "main": "e185d556d68c0551b4a203cefd7078d3d33f87ef",
    "mainChars": 1087051
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "parent": "4902e51c4adefee95d1e08181e5ab5f43cbd87be",
    "chars": 1435994,
    "main": "9897fbf42ca25608afec4b1eb5bb2e7ecf853180",
    "mainChars": 1419623
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "parent": "1c957fd2be71f937e538e1513712d03fb31e4ea5",
    "chars": 1093654,
    "main": "c7b27817e779ce9d05c2547a8a15d0dfa7706474",
    "mainChars": 1077283
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "parent": "c49dda1ada594f2f643bc7091d4b257475045e1f",
    "chars": 1088473,
    "main": "edafe6d31fd321d9417d1665e80b0bc50e87f45a",
    "mainChars": 1072102
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "parent": "92c5aaffcb07cfe146e37a68e36ee421c0672894",
    "chars": 1089565,
    "main": "50f65f8affc0c1debdcc08e0787a8f7c233eae4a",
    "mainChars": 1073194
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "parent": "5ae0ff556d9a029ea139b89a1e175dc09e24f0c0",
    "chars": 686270,
    "main": "989c6451f7b9671b3dfc2977ff1c5643244014e5",
    "mainChars": 669899
  }
]
```

Cada arquivo mantém conteúdo integral anterior no lugar. FULLMAIN também é prefixo integral. O apêndice acima é o único acréscimo normativo; a história anterior não é reescrita.

## Reprodutores locais integrais

Layout apps/api/src/ com fontes identificadas no manifesto de árvore. node --test run-chronology-local.test.mjs run-create-local.test.mjs; TZ=America/Sao_Paulo repete. MINE_AUTH_PRODUCT_MUTANT=1 muda somente a classe em memória; MINE_AUTH_OLD_ONLY=1 limita aos15antigos. A execução canônica com Nest permanece obrigatória no CI.

### run-chronology-local.test.mjs

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {stripTypeScriptTypes} from 'node:module';
// Explicit local adapter only; canonical published test preserves original Nest imports.
const read=name=>fs.readFileSync(new URL('./apps/api/src/'+name,import.meta.url),'utf8');
const imports=source=>source.replace(/^import[\s\S]*?from\s+['"][^'"]+['"];[ \t]*\n?/gm,'');
const compile=source=>stripTypeScriptTypes(source,{mode:'transform'});
const compareTimestamp=new Function(compile(imports(read('timestamp-order.ts')).replace(/export /g,''))+';return compareTimestamp;')();
const exceptionSla=new Function(compile(imports(read('exception-sla.ts')).replace(/export /g,''))+';return exceptionSla;')();
class FixtureUnauthorized extends Error {}
class FixtureForbidden extends Error {}
class FixtureBadRequest extends Error {}
function controller(file,name){
 let source=imports(read(file)).replace(/@(Controller|Get|Post|Headers|Param|Body)\([^)]*\)/g,'').replace(/export class /g,'class ');
 if(process.env.MINE_AUTH_PRODUCT_MUTANT==='1'&&name!=='SupportController'){
  const start=source.indexOf('async mine('),end=source.indexOf('const all:',start);
  const authority=source.slice(start,end).replace('const identity = await this.auth.identityFromAuthorization(authorization);',"let identity;try{identity=await this.auth.identityFromAuthorization(authorization);}catch{return[];}").replace('const tenantIds = tenantId',"let tenantIds;try{tenantIds = tenantId").replace('membership => membership.tenant_id))];',"membership => membership.tenant_id))];}catch{return[];}");
  if(authority===source.slice(start,end))throw Error('mutant replacement missing');
  source=source.slice(0,start)+authority+source.slice(end);
 }
 if(name==='SupportController'&&process.env.EXCEPTION_PRODUCT_MUTANT==='1')source=source.replaceAll('[c.t])).rows','[c.t]).catch(()=>({rows:[]}))).rows');
 if(name==='SafetyCasesController'||name==='SafetyAppealsController'){if(process.env.MINE_PRODUCT_MUTANT==='1')source=source.replace(').rows);\n      all.push',').rows).catch(()=>[]);\n      all.push');}
 return new Function('compareTimestamp','exceptionSla','BadRequestException','ForbiddenException',compile(source)+';return '+name+';')(compareTimestamp,exceptionSla,FixtureBadRequest,FixtureForbidden);
}
const SafetyCasesController=controller('safety-cases.controller.ts','SafetyCasesController');
const SafetyAppealsController=controller('safety-appeals.controller.ts','SafetyAppealsController');
const SupportController=controller('support.controller.ts','SupportController');
let tests=imports(read('safety-support-chronology.test.ts'));
 if(process.env.MINE_AUTH_OLD_ONLY==='1')tests=tests.slice(0,tests.indexOf('const mineAuthFailureStages='));
if(process.env.EXCEPTION_BASELINE==='1')tests=tests.replace(",failure?:{at:number;error:Error}","").replace("if(failure?.at===calls.length-1)throw failure.error;","");
if(process.env.MINE_BASELINE==='1')tests=tests.replace(',failure?:{tenant:string;error:Error}','').replace('if(failure?.tenant===t)throw failure.error;','');
if(process.env.MINE_OLD_ONLY==='1')tests=tests.slice(0,tests.indexOf('const mineFailureTenants='));
if(process.env.EXCEPTION_OLD_ONLY==='1')tests=tests.slice(0,tests.indexOf('const exceptionFailureTables='));
new Function('test','assert','UnauthorizedException','ForbiddenException','SafetyCasesController','SafetyAppealsController','SupportController',compile(tests))(test,assert,FixtureUnauthorized,FixtureForbidden,SafetyCasesController,SafetyAppealsController,SupportController);


```

### run-create-local.test.mjs

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

## FULLFINAL do PR pai, preservado literalmente

Os quatro casos novos foram publicados no #586 para verificar que uma falha em SafetyCases.mine ou SafetyAppeals.mine, no primeiro ou segundo tenant, rejeita o resultado inteiro. O controlador já cumpre esse contrato; a alteração acrescenta cobertura de regressão ao teste existente.

Commit: ee97b684aa98acc6727bc6e61b6730826bfe3b3a. Árvore: c0c2f5f5c6c67cb00d3c44237e415dcb3b85c1c5. Pai: e17f1c0d7f6f383fbb408ededec71ff4814f1ea5. PR continua em rascunho. Sem ready, merge, rerun ou nova PR.

Validação local:15casos de cronologia passaram em UTC e America/Sao_Paulo; conjunto focal27=[15chronology+12create]PASS/0fail-skip-cancel em Node24.19.0. Os11anteriores permanecem byteidênticos fora do parâmetro opcional do mock e da injeção. Reverse reconstrói o blob7c449d795d4178d1de428821908ad72c0fdb8e4e/7302bytes; candidato5a9de774588833dedfa5aec43a612627414d23df/8426bytes. Testecreateeabe811e64a47f633d17b72d4ee6d391d691f9a5 intacto. Baseline seminjeção:11PASS4FAIL; mutante local que oculta falha e retorna[]:11antigosPASS, conjunto15=11PASS4FAIL. O adaptador mantém classes/helpers/corpos canônicos, remove imports/decorators Nest e fornece FixtureExceptions explicitamente; dependênciasNest/tsc locais ausentes. Isso não comprova compilação canônica, HTTP/PostgreSQL, RLS em banco ou execução nativa.

CI próprio39191819663/job117866086541attempt1COMPLETEDFAILURE. Log primário: ECRpostgres17toomanyrequestsDataLimit2026-10-19T02:50:18.7128529Z/02:50:25.0401430Z/02:50:29.0587095Z;Dockerpullfailed02:50:29.0707124Z ANTEScheckout. Checkout e todosprodutosSKIP;1515=[145Web913mobile443API3CLI11monitor] apenas esperado, não executado. NenhumcheckoutCI/typebuildexport/unit/HTTPPG/Chrome/ProductionTruth/PNGnovo. ZEROretry; semrecuperaçãoprimárianovaapóse17f/57f/6ebquotas. Não repetirSHApara verde, nem alterar registry/workflows/credenciais. O CI impede integração.

APK N/A por identidade cumulativa de497blobsnão-documentais fora dos dois testesAPI,159mobile e todos insumos de build/depslock/workflows/entradaExpo mobile→Gradle iguaisMAIN. NenhumAPK586foiconstruído ou emprestado. ALL11PRpathsSHA/mode100644 correspondemárvore remota;8novosarquivosFULLUTF8readbackEXACT,3herdados mesmo blob.1254/1261existingpai+modesinalterados;1251/1259MAINiguaisfora8modificados.498non-docsforaúnicochronologytestiguaispai. ControllerSQLRLSACL/runtime/React19.1.4RN0.81.6/segurança/deadlines/assertivas intactos.

Os seis documentos originais mantêm FULLprefixe17f e receberam por apêndice a delegação de aceite02:36Z e o registro da entrega. O assistente assume o aceite técnico/funcional interno, após cumprir os critérios; não aguarda confirmação humana. Nenhuma área recebe aceite apenas por essa delegação ou por testes locais. Memória1435994chars>1MiB lida porTREEpathSHA→fetch_blobFULL,contentsEMPTYnãoemptyfile. [Nota com reprodutor e FULLFINALpai14231 preservado](https://github.com/dbdanielbaracho/MLIVRETRABALHO/blob/ee97b684aa98acc6727bc6e61b6730826bfe3b3a/docs/evidencias/SAFETY_MINE_FAILURE_BOUNDARIES_2026-10-19.md). GitprepPENDINGhistórico; FINALconsolidado nos originais somente próximaentregaFUNCIONAL, semcommitstatus/autoref/image/activity.

MAIN75105 permanece com CI582POST39143803021a2redporquota/ONEretryconsumida e standalone técnico582POST39143802991literal75105. Somente área10 técnico interno aceita;12pendentes. Root558cancelamentosbrowserUNRESOLVED; neste run não houveChrome porque containerfalhouantescheckout. Não atribuir0Nav deoutroSHA nem causasAPI/CORS/vendor/framework;585POSTsignout e568POSTjobs abortaramcomGET200. ControlesCDP/Fetchguard/CORS/sandbox/LNA/flags/deadlines/assertivas mantidos.

Após a publicação, foram executados seis novos modelos locais de autenticação para as mesmas duas leituras: falha na identidade, na lista de memberships ou na membership do tenant explícito propaga o mesmo erro antes de qualquer trabalho de tenant/SQL.6PASS em adaptador explícito, produto inalterado. Esses modelos não foram publicados como testes canônicos e não integram27/443/1515. Não provam provider/NestHTTP/HTTPPG/RLS. Oito cenários antigos de ordenação e autorização e os testes de entrada/create/review já existentes permanecem preservados; sem alegação global de ausência de cobertura.

Próxima frente candidata: após revalidar normas/HEAD/PRs/CI, avaliar cobertura canônica dos erros de dependência de identidade e enumeração de memberships em mineFixture, mantendo15chronology+12create. Não duplicar a rejeição cross-tenant já coberta nem inventar mudança de política, deadline ou schema. Conferir todos testes atuais antes de estender fixture. Se houver integraçãoHTTPPGfault, ler fixtures atuais e560FULL paraevitarduplicação. CIcompleto próprioSUCCESS e revisãoHEAD/base/diff/modes permanecemobrigatórios antes dequalquermerge, seguido dePOSTCIreal.

Fonte local integral dos seis modelos para reprodução:

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {stripTypeScriptTypes} from 'node:module';
// Explicit local adapter only; canonical published test preserves original Nest imports.
const read=name=>fs.readFileSync(new URL('./apps/api/src/'+name,import.meta.url),'utf8');
const imports=source=>source.replace(/^import[\s\S]*?from\s+['"][^'"]+['"];[ \t]*\n?/gm,'');
const compile=source=>stripTypeScriptTypes(source,{mode:'transform'});
const compareTimestamp=new Function(compile(imports(read('timestamp-order.ts')).replace(/export /g,''))+';return compareTimestamp;')();
const exceptionSla=new Function(compile(imports(read('exception-sla.ts')).replace(/export /g,''))+';return exceptionSla;')();
class FixtureUnauthorized extends Error {}
class FixtureForbidden extends Error {}
class FixtureBadRequest extends Error {}
function controller(file,name){
 let source=imports(read(file)).replace(/@(Controller|Get|Post|Headers|Param|Body)\([^)]*\)/g,'').replace(/export class /g,'class ');
 if(name==='SupportController'&&process.env.EXCEPTION_PRODUCT_MUTANT==='1')source=source.replaceAll('[c.t])).rows','[c.t]).catch(()=>({rows:[]}))).rows');
 if(name==='SafetyCasesController'||name==='SafetyAppealsController'){if(process.env.MINE_PRODUCT_MUTANT==='1')source=source.replace(').rows);\n      all.push',').rows).catch(()=>[]);\n      all.push');}
 return new Function('compareTimestamp','exceptionSla','BadRequestException','ForbiddenException',compile(source)+';return '+name+';')(compareTimestamp,exceptionSla,FixtureBadRequest,FixtureForbidden);
}
const SafetyCasesController=controller('safety-cases.controller.ts','SafetyCasesController');
const SafetyAppealsController=controller('safety-appeals.controller.ts','SafetyAppealsController');
const SupportController=controller('support.controller.ts','SupportController');

for(const [name,Controller]of [['cases',SafetyCasesController],['appeals',SafetyAppealsController]])for(const phase of ['identity','memberships','scopedMembership'])test(name+' mine propagates '+phase+' dependency failure before tenant work',async()=>{
 const failure=new Error('explicit '+phase),events=[],tenants=[];let acknowledged;
 const auth={
  identityFromAuthorization:async authorization=>{events.push(['identity',authorization]);if(phase==='identity')throw failure;return {id:'actor'};},
  memberships:async id=>{events.push(['memberships',id]);if(phase==='memberships')throw failure;return [{tenant_id:'a'}];},
  requireMembership:async(id,tenant)=>{events.push(['scopedMembership',id,tenant]);throw failure;}
 };
 const db={tenant:async tenant=>{tenants.push(tenant);throw Error('unexpected tenant work');}};
 const controller=new Controller(db,auth);
 await assert.rejects(async()=>{acknowledged=await controller.mine('Bearer fixture',phase==='scopedMembership'?'a':undefined);},e=>e===failure);
 assert.equal(acknowledged,undefined);assert.deepEqual(tenants,[]);
 assert.deepEqual(events,phase==='identity'?[['identity','Bearer fixture']]:phase==='memberships'?[['identity','Bearer fixture'],['memberships','actor']]:[['identity','Bearer fixture'],['scopedMembership','actor','a']]);
});
// Explicit adapter failures; no real identity provider, Nest HTTP or PostgreSQL/RLS proof.

```

Descrição preparada antes do resultadoCI, preservada integralmente:

Os testes de leitura de segurança cobriam ordenação e autorização, mas ainda não simulavam falhas nas consultas do primeiro ou do segundo tenant. Este PR acrescenta quatro casos para SafetyCases.mine e SafetyAppeals.mine: cada falha deve propagar o mesmo erro e impedir uma resposta parcial. Preserva os11casos de cronologia e os12de criação de suporte já presentes no PR.

HEAD ee97b684aa98acc6727bc6e61b6730826bfe3b3a; árvore c0c2f5f5c6c67cb00d3c44237e415dcb3b85c1c5; pai e17f1c0d7f6f383fbb408ededec71ff4814f1ea5. Quinze casos de cronologia passaram em UTC e America/Sao_Paulo; conjunto focal de27passou no adaptador local. O mutante que oculta erro e retorna[] passa os11anteriores e falha nos4novos. O adaptador usa classes e helpers reais com exceçõesNest explícitas; a compilação canônica e os testes HTTP/PostgreSQL dependem do CI, ainda pendente. Nenhuma alteração no controller ou nas regrasSQL/RLS.

APK N/A: 497blobs não documentais fora dos dois testesAPI, incluindo todos159mobile e insumos de build/dependências, são idênticos à main. CI completo obrigatório. O aceite técnico/funcional interno foi delegado ao assistente e está registrado por apêndice nos seis originais; nenhuma área recebe aceite apenas por essa delegação.

[Provas, reprodutor e histórico integral do PR](https://github.com/dbdanielbaracho/MLIVRETRABALHO/blob/ee97b684aa98acc6727bc6e61b6730826bfe3b3a/docs/evidencias/SAFETY_MINE_FAILURE_BOUNDARIES_2026-10-19.md). O histórico anterior de14231caracteres foi preservado integralmente nessa nota.


