# PR570 — criação de substituição: prazo e ACK preservado


## 2026-10-18 — PR570: prazo de CREATE e preservação do ACK validado

Requisito → código → teste: área5 substituições, criação explícita do pedido não pode manter busy/pending após 15000ms nem descartar confirmação validada quando somente o refresh demora. Base funcional eeac6a52b0121d98c51fed0a1583116f98050dd7/tree4618e3ca5ffad18410a3bfc28548ca9b79862bf6; MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1 inalterada. Extensão coerente do MESMO PR570, sem novaPR/force/retry do SHA velho.

Contrato original lido integralmente: ReplacementController.create autentica membro owner/admin/manager/company, valida UUID/motivo, lock FOR NO KEY UPDATE assignment tenant, estados confirmed/checked_in/in_progress, INSERTopen ONCONFLICT(assignment_id,status)UPDATEreason, retorna id/assignmentId/status. Isto NÃO é nova idempotência durável/cancelamento servidor. Helper requestReplacement UUID/ACK/payload inalterado. API select é OUTRO contrato (locks, disponibilidade, novaassignment/cancelamento/notification); não corrigido ou aceito nesta entrega.

Mudança mínima APENAS apps/mobile/app/substituicoes.tsx: callback de prazo existente match estendido SÓCREATE, mantém SELECTabort-only; ownedref/finish do eeac preservados. AntesACK+autenticaçãofinalválida, prazo invalida snapshot/sequence/dados/recomendação e mantém motivo/aviso de incerteza, sem GET/POST/retry automático; recuperação segue load(true) explícito validado original, sem barreira durável inventada. Após ACKtrue+contexto finaligual e owns, acknowledgedlocal=true; enquanto refresh demora, prazo conserva Substituição solicitada. em vez de falso resultado desconhecido do servidor. load recebe callback opcional de cleanup próprio; sóCREATE captura childcontroller abort+finish, drena child ANTES de liberar pending/busy. Seq/sourceguards originais impedem child tardio reconstituir snapshot. Fora quatro regiões, reversão reconstrói FULL11455chars eeac BYTEEXATO; candidato11762chars. Nenhum novo parser/helper/payload/JSX/styles/sessionqueue/API SQLRLSACLReact19.1.4RN0.81.6depslockworkflowsbuildsmoke/securityCDPFetchguardCORSsandboxLNAflags/deadlines alterados.

Nova prova: apps/mobile/tests/replacement-create-screen-deadline.test.mjs,36 regressões actualhandlerpréJSX+REALhelpers com hooks/auth/fetchJSON/timers explícitos. Baseline EXATOeeac17PASS19FAIL →36PASS. Oito awaits (4preACK+4child), parent/child drain, motivo original/trim/blank{}, ACKvalidado vs desconhecido, oldtimer/finally NEWcreate/match/select SAMEepoch, blurrefocus/tenant/badACK/HTTP400, manualGET recovery e20EXPLICITpendingcreatesbounded. SAMEepochNEWsnapshot/recommendation é fixture explícita,nãoReact/APIrenderproof.78focalPASS[36new+27match+13helper+2ACKUUID], SãoPaulo78PASS; FULLcanônico978LOCALPASSUTC/SP[942eeac+36new],0fail/skip/cancel,80paths explícitos do TREE. PRIMEIRA954contaminadaREJEITADA: scratch tinha candidatos pré582/test24ausente e seis568helpers; restaurados SHAs Git, só978 posterior atribuído.158existingmobileblobsSHAexactforaapp+LOCALtsconfigadaptadoNÃOPUBLICADO. Old27match/13helper/2ACKtests BYTEEXATOS preservados, helpers7f52/test456bdc orig570calendar intactos. Typecheck local indisponível, NÃO PASS; CI obrigatório preservado.

Limites: testes Node/modelos não provam RNrender/SecureStore/HTTPPG/native/físico/VisualTruth/produção/heap ou cancelamento SQL. Área5 mais próxima no requisito prazo/ACK, NÃO aceite integral. Só10Android standalone técnicointerno aceito;12pending,não%code.

Reconciliação eeac primária: OWNCI39162744033a1/job117779280558FAILquotaECRANTEScheckout/ZEROretry/TODOSprodutosSKIP;1532 esperado nãoexecutado/942LOCAL. OWNAPK39162744045a1/job117779280586SUCCESScheckout1dfab0a634e1886280c54d963b29ab832ce6e3e2SINTÉTICO[75105,eeac]/tree4618igualHEAD (Gitconfirmado).Build20:29:28.8949788Z/install20:30:53.0097870Z/smoke20:31:05.4126442ZwithoutMetro. Artifact12149522232expiresNov1T20:31:06ZREALZIP28913213/SHAfe08e0823ed7266b2e093fd67c4ec24d6463ca0b003e1a10d79f35699f5bd3e1=API;APK66162412/SHA6e7b86bc03e69a2a8fb2ac4a7566fe4ce5a15f1a7d4db23ced77fe3b65bec07b=SUMS/BUILDINFO1dfab/releasefixedpackage/metrofalse/build20:29:29Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36.ZIP≠APK/installlaunch≠form/SecureStore/physical/VisualTruth/prod. CIREDproibiumergeeeac; NÃOemprestaroldAPK/CIaNOVOHEAD. FULLFINALeeac14969chars preservado na nota desta entrega.

Gates NOVOHEAD CI/APK PENDENTES nesta preparação histórica:1568=[145Web978mobile431API3CLI11monitor]SÓESPERADO.NãoReady/Merge até ownCI+APK ALLSUCCESS/freshmain/base/head/fullpaths+modes; somente expectedSHAmerge e POSTCI/APK reais depois. Main continua75105 FULLCIRED582POSTquota/ONEretryconsumida, standalone582POSTvalidado;semmergeoutrosdrafts.

Rootbrowser558 permaneceUNRESOLVED; eeac nãoexecutouChrome porquota. 585observou signoutPOSTabort/71GET200+1controlled503/ZEROGETfailed;568jobsPOSTabort/24GET200; não afirmar causa nem restringir12GET. Semrerunverde/registryworkflowcredentialbypass. SemprodRailwayNeon/providersPSP/custosserviços/contratos/dinheiroreal/root/grants/RLSdisable/manualActivitywrites.

Próximo técnico: ownCI/APKnovoHEAD/logcheckout/tree/artifactZIPvsindividualAPK. Se bloqueado produto/browser/infra semrecuperação nova, registrar primário e avançar auditoria independente (SELECT/ACK+child ou leitura), nunca mesmoSHAparaverde. FINALPRmetadata e próximo apêndice apenas junto de entrega FUNCIONAL, não commitstatus/selfref/imagem/atividade. Todos os seis originais eeac preservados como FULLprefix NO LUGAR por append; MAIN também recuperável integralmente pelo manifesto anterior, nãoresumo.

## Recibo FINALeeac integral (14969 caracteres)

# PR570 eeac — recibo final do APK (2026-10-18T20:49Z)

CI39162744033a1/job117779280558 permanece FAILURE ECR antescheckout, ZEROretry; nenhum produto executado/nenhum1532PASS atribuído. Não merge mesmoAPKverde. PRDRAFTNOTMERGED.

APK39162744045/job117779280586attempt1 COMPLETEDSUCCESS/ZEROretry. Actualcheckout1dfab0a634e1886280c54d963b29ab832ce6e3e2 primário20:19:06.6678171Z SINTÉTICO orderedparents[MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1,eeac6a52b0121d98c51fed0a1583116f98050dd7]/tree4618e3ca5ffad18410a3bfc28548ca9b79862bf6igualcandidata, Git confirmado NÃOliteralHEAD. Build20:29:28.8949788Z/installSuccess20:30:53.0097870Z/DEVICE_SMOKE_OK20:31:05.4126442ZwithoutMetro.

Artifact12149522232expires2026-11-01T20:31:06Z REALdownloadZIP28913213bytes/SHA256fe08e0823ed7266b2e093fd67c4ec24d6463ca0b003e1a10d79f35699f5bd3e1=API. IndividualAPK66162412/SHA2566e7b86bc03e69a2a8fb2ac4a7566fe4ce5a15f1a7d4db23ced77fe3b65bec07b=SHA256SUMS. BUILDINFOliteralactual1dfab/releasefixedpackage/metrofalse/build20:29:29Z;manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠Substituicoesform/SecureStore/physical/VisualTruth/prod. Mainstandalonecontinua582POST75105, não570APKmain.

## Histórico anterior integral

# PR570 — entrega funcional publicada; CI bloqueado por infraestrutura

Verificado 2026-10-18T20:20Z. HEAD eeac6a52b0121d98c51fed0a1583116f98050dd7/tree4618e3ca5ffad18410a3bfc28548ca9b79862bf6; MAIN75105, PR DRAFT NOT MERGED. Integração normal orderedparents[2205,75105], sem force/nova PR.

CI39162744033 attempt1/job117779280558 COMPLETED FAILURE, ZEROretry. ECR postgres17 toomanyrequests Data limit exceeded em 20:19:04.6276183Z,20:19:14.1178759Z,20:19:22.2088878Z; Dockerpullfailed20:19:22.2172003Z ANTEScheckout. Checkout e TODOS produtos SKIPPED. Nenhum actualCIcheckout, typecheck/build/export/unit/HTTPPG/Chrome/ProductionTruth observado neste HEAD. 1532 agregado é somente ESPERADO; 942 é LOCAL. Quota persistiu após falha584a2, sem evidência nova de recuperação; NÃO rerun eeac para verde/registry/workflow/credenciais/bypass. Log: https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39162744033/job/117779280558 .

APK39162744045/job117779280586 attempt1 ainda IN_PROGRESS Build às20:20Z; nenhum nativePASS/artifact/checkout primário atribuído ainda. APKN/A FALSE. Não cancelar/rerunrunning/ready/mergeCIred mesmoAPKpassar. MAIN standalone técnico continua582POST75105, nãoAPK570candidato. Root browser558 NÃOresolvido; nenhumChrome novo aqui devidoquota, não atribuir 12GETabort nem emprestar outro run.

Local: 27 newPASS baseline16PASS11FAIL;42focal/TZPASS;942canônicoUTC/SPPASS,0fail/skip/cancel. Mutante SOMENTEINMEMORY no harness removendo checkownership em finish:19PASS8FAIL. Produto publicado não modificado pelo mutante; nãoCIcount.

## Frente independente após bloqueio — auditoria LOCAL create/select

10 modelos actualhandler pré-JSX + REALhelper570,2positivePASS8deadlineFAIL (4awaits×2kinds). Aos15s busy/pendingtrue/controller1; após dependencyresume liberam com mensagemfalha, nenhum falseACKsuccess/GETrefresh/POSTextra; auth0POST/outros1. Positivos mantêm ONEPOST original reason/professionalId e dois GETrefresh, sem redesenhar política. NÃO fixpublicado/NÃOparte27/942/1532/NÃO RNrender/HTTPPG/SecureStore/contareal. Gap propositalmente fora desta entrega match-only; antes de próximo fix auditar ACKconfirmado vs refreshchild e reconciliação manual/unknown vigente, ownershipprópria e oldtimer/finally vsNEWações, sem autoretry/idempotênciadurável inventada. Fonte reproduzível integral abaixo (scratch next-audit/replacement-mutation-deadline-audit.test.mjs).

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadingReplacements,loadReplacements,replaceable,sameReplacementContext,requestReplacement as createRequest,matchReplacement,selectReplacement} from '../apps/mobile/lib/company-replacements.ts';
const A='11111111-2222-4333-8444-555555555555',R='66666666-7777-4888-8999-000000000000',P='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',N='99999999-2222-4333-8444-555555555555';
const assignment={id:A,status:'confirmed',title:'Actual work',professionalName:'Actual person',replacementOpen:true},replacement={id:R,assignmentId:A,status:'open'};
const recommendation={replacementRequestId:R,recommendedProfessionalId:P,recommendedProfessionalName:'Actual substitute',score:82,reasons:['availability']};
const headers={Authorization:'Bearer actual-owner','x-tenant-id':'bbbbbbbb-cccc-4ddd-8eee-ffffffffffff'};
const stages=['auth','fetch','json','final-auth'];
function screen(){
 const source=fs.readFileSync(new URL('../apps/mobile/app/substituicoes.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Substituicoes('),end=source.indexOf('\n const requestReplacement=',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {action,load};\n}',{mode:'strip'}),keys=['useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','apiUrl','loadingReplacements','loadReplacements','replaceable','sameReplacementContext','createRequest','matchReplacement','selectReplacement','setTimeout','clearTimeout','fetch'];
 const create=new Function(...keys,prefix+'\nreturn Substituicoes();'),state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,tid=0,active=null,currentHeaders={...headers};
 const wait=async(c,at)=>{if(c?.stage===at)await c.gate};
 const auth=async()=>{const c=active;if(c){c.reads++;await wait(c,c.reads===1?'auth':'final-auth')}return {...currentHeaders}};
 const fetch=async(path,options)=>{const c=active;calls.push({path,options});if(options.method==='POST')await wait(c,'fetch');return {ok:!c?.empty&&!c?.serverError,status:c?.empty?400:c?.serverError?500:200,json:async()=>{if(options.method==='POST'){await wait(c,'json');if(c?.empty||c?.serverError)return {message:'no_replacement_available'};if(path.endsWith('/auto-match'))return c?.ack??recommendation;if(path.endsWith('/select'))return {replacementRequestId:R,professionalId:P,replacedAssignmentId:A,newAssignmentId:N,status:'matched'};return {id:R,assignmentId:A,status:'open'}}return path.endsWith('assignments')?[assignment]:[replacement]}}};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=typeof initial==='function'?initial():initial;return[state[i],v=>{state[i]=typeof v==='function'?v(state[i]):v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,x=>x,loadingReplacements,loadReplacements,replaceable,sameReplacementContext,createRequest,matchReplacement,selectReplacement,callback=>{const id=++tid;timers.set(id,callback);return id},id=>timers.delete(id),fetch);}
 function control(stage='none',extras={}){let resolve;const gate=new Promise(r=>{resolve=r});active={stage,gate,reads:0,...extras};return {resume(){active===this.context&&(active=null);resolve()},context:active};}
 render();cleanup=focus();return {state,refs,calls,timers,pump:()=>new Promise(setImmediate),begin(stage='none',kind='match',extras={}){render();const c=control(stage,extras);c.promise=handlers.action(kind,kind==='create'?A:R,P);return c},load(){active=null;render();return handlers.load(true)},timer(){const cb=[...timers.values()].at(-1);assert.ok(cb);return cb},blur:()=>cleanup(),refocus(){render();cleanup=focus()},install(){const data={assignments:{status:'ready',data:[assignment]},replacements:{status:'ready',data:[replacement]}};state[0]=data;state[2]={[R]:{status:'ready',data:recommendation}};refs[5].current={headers:{...headers},data}},draft(){state[1]={[A]:'Keep my draft'}},changeTenant(){currentHeaders={...headers,'x-tenant-id':'cccccccc-dddd-4eee-8fff-000000000000'}}};
}

for(const kind of ['create','select'])test('AUDIT actual '+kind+' timely payload and two GET refresh stay original',async()=>{const h=screen();await h.pump();h.install();h.draft();await h.begin('none',kind).promise;assert.equal(h.state[4],false);assert.equal(h.refs[3].current,false);const posts=h.calls.filter(x=>x.options.method==='POST');assert.equal(posts.length,1);assert.deepEqual(JSON.parse(posts[0].options.body),kind==='create'?{reason:'Keep my draft'}:{professionalId:P});assert.equal(h.calls.filter(x=>x.options.method==='GET').length,4);h.blur()});
for(const kind of ['create','select'])for(const stage of stages)test('AUDIT actual '+kind+' deadline before '+stage+' resolves',async()=>{const h=screen();await h.pump();h.install();h.draft();const c=h.begin(stage,kind);await h.pump();h.timer()();const expired={busy:h.state[4],pending:h.refs[3].current,registered:h.refs[4].current.size};c.resume();await c.promise;assert.equal(h.state[4],false);assert.equal(h.refs[3].current,false);assert.equal(h.state[1][A],'Keep my draft');assert.equal(h.calls.filter(x=>x.options.method==='POST').length,stage==='auth'?0:1);assert.equal(h.calls.filter(x=>x.options.method==='GET').length,2);assert.doesNotMatch(h.state[3],/solicitada|confirmado/);h.blur();assert.deepEqual(expired,{busy:false,pending:false,registered:0})});

```

## Preparação anterior integral preservada

# PR570 — calendário preservado + prazo da busca de substituto

HEAD eeac6a52b0121d98c51fed0a1583116f98050dd7; tree 4618e3ca5ffad18410a3bfc28548ca9b79862bf6; pais ordenados [2205e2dcef0aa79e3ce9a96c4a0dd1eee649eb3a, 75105d42c873ca56b58fa1aa73cc4a682359e5c1]. Integração normal sem force no PR existente; sem duplicata.



## 2026-10-18 — PR #570: prazo/ownership da busca de substituto (preparação funcional)

Requisito → código → teste: área de substituições/matching; a busca explícita de recomendação precisa encerrar a espera local aos 15 s, invalidar autoridade expirada e não afetar a próxima ação. MAIN de referência 75105d42c873ca56b58fa1aa73cc4a682359e5c1; integração normal no PR #570 existente, antigo HEAD 2205e2dcef0aa79e3ce9a96c4a0dd1eee649eb3a. Sem force, nova PR duplicada ou rerun do SHA antigo.

Entrega real: apps/mobile/app/substituicoes.tsx recebe actionController após as seis refs existentes, ownership generation+controller, retirada da ref ANTES de pending/busy e callback SOMENTE para action('match') no prazo original de 15000 ms. Callback invalida snapshot/sequence/dados/recomendações, conserva motivos digitados, drena operação própria e não envia GET/POST. Atualização manual explícita e validada recupera autoridade. Timer/finally antigos não liberam nova busca, criação ou seleção no mesmo foco; blur aposenta ownership. Guardas posteriores preservam contexto e origem do snapshot. Criação/seleção mantêm timeout abort-only anterior: esta entrega NÃO corrige nem aceita seus prazos. Nenhum novo parser, retry automático ou alteração de payload/ACK/API/SQL/RLS/ACL/React/RN/lockfile/workflows/Chrome/CORS/Fetch guard/CDP/deadlines.

Correção factual de histórico: o #570 original altera SOMENTE validador de datas calendáricas e acrescenta dois testes. NÃO altera tenantId no ACK/select. Preservados byte a byte helper 7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6 e teste 456bdc4dd6a3ca86e36e7289b1d39eb960342833; os 11 testes anteriores permanecem prefixo integral e os dois calendáricos permanecem integrais. Metadados #585 corrigidos sem apagar histórico; recibo completo na nota vinculada.

Prova local nova: apps/mobile/tests/replacement-match-screen-deadline.test.mjs, 27 modelos do handler pré-JSX REAL + helper REAL, hooks/auth/fetch/JSON/timers explícitos. Baseline MAIN+helper570: 16 PASS/11 FAIL → 27 PASS após fix. Quatro awaits (auth/fetch/JSON/auth final), casos positivos ready/empty bodyless POST, timers/finally antigos vs NEWmatch/CREATE/SELECT no mesmo foco, blur/refocus, contexto tenant, ACKs incompatíveis, atualização manual, vinte buscas pendentes explicitamente iniciadas. Snapshot novo SAMEepoch é fixture explícita, não prova de API/render. Focais 42 PASS = 27 novos +13 helper570 +2 ACKUUID; fuso São Paulo 42 PASS. Full móvel canônico 942 PASS = 913 MAIN +2 calendáricos570 +27 novos, UTC e America/Sao_Paulo, 0 fail/skip/cancel. 79 caminhos explícitos; cópias scratch não canônicas excluídas, nenhum teste MAIN omitido. Verificador: 155 blobs móveis existentes iguais; diferenças APENAS Substituicoes/helper570/test570 e tsconfig LOCAL adaptado, este último NÃO PUBLICADO. Fora cinco regiões do app, reversão reconstrói 10967 caracteres MAIN byte exatos; candidato 11455 caracteres. Typecheck local indisponível (tsc/dependência ausente), NÃO PASS; CI obrigatório preservado.

Limites: modelos Node/adapter fixtures não são RN render, SecureStore, HTTP/PostgreSQL, dispositivo físico, cancelamento no servidor, garantia de memória ou aceite integral. API auto-match é ranking sem escrita/seleção; create/select são contratos distintos intactos. Somente área 10 standalone tecnicamente aceita internamente; 12 áreas pendentes, sem percentual de código.

Gates novos deste HEAD: CI/APK próprios PENDENTES neste apêndice histórico de preparação. 1532 testes agregados apenas ESPERADOS [145 Web,942 mobile,431 API,3 CLI,11 monitor], não executados ainda em CI. APK N/A FALSE. Não ready/merge antes de CI completo SUCCESS + APK SUCCESS e revisão fresh HEAD/base/todos paths/modes; após merge verificar CI/APK reais do merge. Não emprestar PASS antigo2205, 584 ou585. MAIN full CI continua RED582POST quota antescheckout; APK standalone MAIN validado582POST75105.

Histórico recente: #585 f3e3 CI39160905472a1 FAIL HTTP/browser após 1531 unidades PASS; signout POST ERR_ABORTED após OPTIONS204, 71 GET200+1 GET503 controlado e zero GETfailed; sem ACK201/revogação remota/B/full8/ProductionTruth. APK39160905491a1 SUCCESS com bytes e checkout sintético68082. #58490cc CI39156391666a2 quota antescheckout após UMA retry justificada pelo pull postgres17 novo do #585; orçamento consumido, sem outro rerun. APK584 SUCCESS sintéticocedf. Recibos FULL nas notas/PRs. Root browser permanece NÃO resolvido, segurança intacta. Sem produção, serviços, custos, PSP, contratos ou dinheiro real.

Próximo passo técnico: observar primários CI/APK deste novo HEAD; se produto/browser falhar, registrar log e seguir auditoria independente sem rerun cego. Consolidar FINAL em metadados do PR e somente próxima entrega FUNCIONAL nos normativos, sem commit de status/selfref/imagens/atividade.


Recibos completos e manifesto de preservação: [docs/evidencias/REPLACEMENT_MATCH_SCREEN_DEADLINE_2026-10-18.md](https://github.com/dbdanielbaracho/MLIVRETRABALHO/blob/eeac6a52b0121d98c51fed0a1583116f98050dd7/docs/evidencias/REPLACEMENT_MATCH_SCREEN_DEADLINE_2026-10-18.md).

Revisão: todos os 13 paths/modes conferidos; 1250 blobs MAIN existentes exatos fora dos nove modificados. Dois helpers/testes570 byte idênticos já publicados; nenhum produto/teste585/584 ou outros drafts copiado. CI/APK deste HEAD pendentes, nenhum ready/merge.

