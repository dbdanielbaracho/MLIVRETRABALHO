# PR570 — seleção humana: prazo e confirmação preservados


## 2026-10-18 — PR570: prazo SELECT e preservação do ACK de substituto confirmado

Requisito → código → teste: área5, seleção humana explícita não mantém busy/pending indefinidos após 15000ms nem converte ACKvalidado em falsoUNKNOWN quando apenas a leitura posterior demora. Base funcional029ecf051218755f85e757c517109cea1464d8be/tree543e4b3752075629f0d4227c8fd00e0399c2e75a;MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1 inalterada. Estender MESMOPR570 por fastforward normal/expectedSHA/semforce/novaPRduplicada/rerunoldSHA.

Contrato original integralmente relido: ReplacementController.select809c27f1551c103adc9e6950f79555eb42d3b7db autentica tenant/membership owner/admin/manager/company, UUIDbody/id, originalassignment FOR NO KEYUPDATE e replacementopen FORUPDATE, estado substituível/candidato diferente/talentpoolativo/disponibilidade. Inserção assignmentconfirmed ONCONFLICT preservastatus; cancelaoriginal, marca replacementmatched, insere notificação e devolve replacementRequestId/assignmentId NOVO/replacedAssignmentId/professionalId/statusmatched. Helper7f52 valida todos vínculos e UUIDnovo diferente. API/SQL/RLS/transação/ACL/notification/payload inalterados; modelos abaixo NÃO provam rollback HTTPPG nem entrega notificação.

Fix APENAS DUAS LINHAS em apps/mobile/app/substituicoes.tsx, candidato11736charsSHA168b5c3b6a2de80caa7d73998f30f402c5fc9a59 vs02911762chars: callback15s ownedref já existente MATCH/CREATE agora também SELECT; acknowledged=ok somente ramo CREATE/SELECT após helper+autenticaçãofinaligual+owns; mensagem por kind conserva Substituto confirmado. (SELECT) ou Substituição solicitada. (CREATE) quando ACKverificado. Ramo MATCH nunca marca acknowledged. SELECT também captura cleanup próprio do childload já existente em CREATE, abort+finish ANTES pending/busyunlock. AntesACK permanece erro/UNKNOWN com snapshot/seq/list/recommendations invalidados, motivos preservados, semGETPOSTextra/autoPOST; recuperação manualGETvalidado+nova recomendação humana segueoriginal. Ownership/seq/source/blur/headers/15s/requestshape/JSXstyles/imports/helpers/sessionqueue permanecem; reverse das2linhas reconstrói FULL029byteexato. Semparser/depslock/workflows/buildsmoke/segurança/CORS/Fetchguard/CDP/deadline/flags/grants/policy changes.

Prova nova: apps/mobile/tests/replacement-select-screen-deadline.test.mjs11879chars,40testes actualhandlerpréJSX+REALhelpers/hooks/auth-fetchJSON-timers. BaselineEXATO02919PASS21FAIL→40PASS. Oito awaits4preACK4child, positivos após MATCHrealdohelper (não apenas recommendationfixture), vínculos ACKrequest/professional/replacedAssignment/newAssignmentUUIDdifferent/status, HTTP400, mudanças tenant/blur, oldtimer/finally vsNEWselect/create/match/read SAMEfocus,20EXPLICITmanualGET+MATCH+SELECT tentativas bounded semautorretry. AdversarialSAMEepochnovo snapshot/recommendation é fixtureEXPLÍCITA,nãoAPI/RNrenderproof. Focais118PASS=[40new+36CREATE+27MATCH+13helper+2ACKUUID],America/Sao_Paulo118PASS. FULL1018LOCALPASSUTC+SP=[978029+40new],0fail/skip/cancel,81canonicalTREEtestpaths, existência de TODOS validada. Preflight restaurou candidatos pós582/test24 e seishelpersMAIN que scratch antigo não continha ANTESfull, nenhumfullcontaminado atribuído.159existingmobileblobsSHAexactforaSubstituicoes+LOCALtsconfigadaptadoNÃOPUBLICADO. Typechecklocalindisponível,nãotypecheckPASS;CIobrigatório.

36oldCREATEd0423c9b93767886251470009fede3a8ad0e34c3/27oldMATCHa297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76/oldhelper5707f52/test456bdc e2ACKUUID BYTEEXATOS. Old570calendar+2testsSOMENTE,nãotenantACK; correçãohistórica585preservadanasnotas. Nenhumproduto/testeoutrosdraftscopiado.

Limites: Node/modelos não são RNrender/SecureStore/HTTPPG/native/físico/VisualTruth/prod/heap/cancelamentoservidor/idempotênciadurável. Não inventar garantia debarreira durável nem ausência de commitSQL. Requisito prazo/ACKárea5avançou,nãoaceiteintegral. Somente10standaloneTÉCNICAINTERNOaceita;12pending,não%code.

Reconciliação primária029: OWNCI39165291531a1/job117786838938FAILquotaECRANTEScheckout/ZEROretry/TODOSprodutosSKIP;1568sóesperado,nãounitexecutado. OWNAPK39165291444a1/job117786838693SUCCESSactualcheckout2ff21b2881327db7e9e0b440a71cceeee7d713a2SINTÉTICO[MAIN75105,029]/tree543eigualHEAD Gitconfirmado,NÃOliteral029. Build21:00:30.5041105Z/install21:01:40.6004265Z/smoke21:01:52.9415231ZwithoutMetro.Artifact12150363826expiresNov1T21:01:54ZREALZIP28913421/SHA268b36138354c77295ccc45888678e3a23381f8ece4baf801c0f56fd887e0100=API;individualAPK66162592/SHA48bf107594965fbee82bcd7aa02e35dfe6c2e3c4a0f18f8476cf83c5e64b0533=SUMS/BUILDINFO2ff21/releasefixedpackage/metrofalse/build21:00:31Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36.ZIP≠APK/installlaunch≠Substituicoesform/SecureStore/physical/VisualTruth/prod. CIREDproibiumerge029;NÃOemprestarAPKold aoNOVOHEAD. FULLFINAL02915605chars preservadoINTEGRALnovaSELECTnota.

Gates NOVOHEAD CI/APK PENDENTES nesta preparação histórica:1608=[145Web1018mobile431API3CLI11monitor]SÓESPERADO,nãoexecutado/APKN/Afalse. NãoReady/MergeatéownCI+APKALLSUCCESS/revisãofreshMAIN/base/head/todospaths/modes;somenteexpectedSHAmergeONCE+POSTCIAPKreais.MAINcontinua75105FULLCIRED582POSTquota/ONEretryconsumida,standalone582POSTvalidado.

Rootbrowser558UNRESOLVED;nenhumChromeeeac/029devidoquota.585POSTsignoutabortapósOPTIONS204/71GET200+1controlledGET503/ZEROGETfailed,568POSTjobsabort/24GET200;nãorestringir12GET/nãoafirmarcausaCORS/API/vendor/framework/nãoemprestar558zeroNav. Controlessegurançaintactos.SemproduçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/manualActivitywrites.

Próximo técnico: CI/APK NOVOHEAD/logcheckout/tree/artifactZIPvsindividualAPK/SUMS/BUILDINFO. Se bloqueado porproduto/browser ouquota semRECOVERYprimárioNOVO,nãorerunmesmoSHAparaverde;registrarprimárioeavançar auditoria independente de LOAD manual/controllercleanup,semduplicar584Ganhos. FINALPRmetadata e consolidaçãoGitAPENASpróxima entregaFUNCIONAL,nãostatus/selfref/image/activitycommit.6originais029FULLPREFIXNO LUGARappend;MAINrecuperávelintegralmanifestoanterior,nãoresumo.

## Recibo FINAL029 integral (15605 caracteres)

# PR570029 — APK final próprio conferido (2026-10-18T21:45Z)

CI39165291531a1/job117786838938 permanece FAILUREquotaECRANTEScheckout/ZEROretry;1568SÓESPERADO,nãoexecutado. Não ready/merge mesmoAPKverde.

OWNAPK39165291444/job117786838693attempt1COMPLETEDSUCCESS/ZEROretry. Actualcheckout2ff21b2881327db7e9e0b440a71cceeee7d713a2 primário20:52:33.4826041ZSINTÉTICOorderedparents[MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1,029ecf051218755f85e757c517109cea1464d8be]/tree543e4b3752075629f0d4227c8fd00e0399c2e75a igualcandidata Gitconfirmado,NÃOliteralHEAD. Build21:00:30.5041105Z/installSuccess21:01:40.6004265Z/DEVICE_SMOKE_OK21:01:52.9415231ZwithoutMetro.

Artifact12150363826expires2026-11-01T21:01:54Z REALdownloadZIP28913421bytes/SHA256268b36138354c77295ccc45888678e3a23381f8ece4baf801c0f56fd887e0100=API. IndividualAPK66162592/SHA25648bf107594965fbee82bcd7aa02e35dfe6c2e3c4a0f18f8476cf83c5e64b0533=SUMS. BUILDINFO2ff21/releasefixedpackage/metrofalse/build21:00:31Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠Substituicoesform/SecureStore/physical/VisualTruth/prod. MAINstandalone continua582POST75105,não029APKmain.

## Histórico anterior integral

# PR570 CREATE — próprio CI bloqueado antescheckout (2026-10-18T20:54Z)

HEAD 029ecf051218755f85e757c517109cea1464d8be/tree543e4b3752075629f0d4227c8fd00e0399c2e75a; parenteeac/MAIN75105inalterada. DRAFTNOTMERGED;ZEROready/merge/rerun.

OWNCI39165291531/job117786838938attempt1COMPLETEDFAILURE/ZEROretry. Primários ECRpostgres17toomanyrequestsDataLimit20:52:30.4349798Z/20:52:33.1363819Z/20:52:40.1258670Z/Dockerpullfailed20:52:40.1347549Z ANTEScheckout. TODOSprodutosSKIPPED. Nenhum actualCIcheckout/typecheck/build/export/unit/HTTPPG/Chrome/ProductionTruth/PNG desteHEAD.1568 agregado apenasESPERADO;978LOCAL. Sem recuperação primária nova após falhas584/eeac; NÃO retry029ec para verde/registryworkflowcredentialsbypass. Log https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39165291531/job/117786838938 .

OWNAPK39165291444/job117786838693attempt1AINDAIN_PROGRESS Build20:54UTC. APKN/Afalsemobilealterado. Smokeruleunit≠nativePASS,semfinalbuild/install/DEVICE_SMOKE/artifactbytes/actualAPKcheckoutatribuído. Não cancel/rerunrunning/mergeCIredmesmoAPKpassar. Primeiro próximo ciclo conferir FINALAPKprimário/checkout Gitparents/tree/artifactREALZIP≠individualAPK/SUMS/BUILDINFO/expiry; rejeitar bytesparciais/APIhash. Mainstandalonevalidado582POST75105, nãoAPKcandidata.

36newbaseline17PASS19FAIL→36GREEN/78focalTZ/978canonicalUTC+SPPASS0fail-skip-cancel. MutantesLOCALonlyinmemory:removerchildCleanup32PASS4FAIL;removeracknowledgedflag30PASS6FAIL. NÃOprodutopatchmutante/NÃOCIcount. Helpers old570+27matchtests intactos.

## Frente independente SELECT — auditoria LOCAL (sem patch publicado)

9actualhandlerpréJSX+REALhelpersmodelos1positivePASS8FAIL,4preACK+4childawaits. Aos15s busy/pending permanecemtrue/controllerparentouparent+child até dependência resolver;0POSTauth/1outros. Controle positivo usa ACKválido API assignmentId UUIDdifferent, bodyprofessionalId e Substituto confirmado.+2GETrefresh. Isto corrige a limitação do fixture histórico select com newAssignmentId que não afirmava ACKsuccess. NÃO novoSELECTproduto/testeCI/NÃOparte36/978/1568/RNnative/HTTPPG/SecureStore/SQLrollback. Antes próximo fix, auditar preservação ACKconfirmado vs childrefresh, oldtimerfinallyNEWaçõesmesmoepoch e reconciliaçãomanual; API locks/availability/assignmentcancel/notifications inalterados,nãoinventarbarreiradurável/idempotência/cancelamentoservidor/autoPOST. Fonte reproduzível integral abaixo; scratchnext-audit/replacement-select-deadline-audit.test.mjs, nãoúnicacópiatransiente.

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadingReplacements,loadReplacements,replaceable,sameReplacementContext,requestReplacement as createRequest,matchReplacement,selectReplacement} from '../apps/mobile/lib/company-replacements.ts';
const A='11111111-2222-4333-8444-555555555555',R='66666666-7777-4888-8999-000000000000',P='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',N='99999999-2222-4333-8444-555555555555';
const assignment={id:A,status:'confirmed',title:'Actual work',professionalName:'Actual person',replacementOpen:false},replacement={id:R,assignmentId:A,status:'open'};
const recommendation={replacementRequestId:R,recommendedProfessionalId:P,recommendedProfessionalName:'Actual substitute',score:82,reasons:['availability']};
const ack={id:R,assignmentId:A,status:'open'},headers={Authorization:'Bearer actual-owner','x-tenant-id':'bbbbbbbb-cccc-4ddd-8eee-ffffffffffff'};
const pre=['auth','fetch','json','final-auth'],child=['child-auth','child-fetch','child-json','child-final-auth'];
function screen(){
 const source=fs.readFileSync(new URL('../apps/mobile/app/substituicoes.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Substituicoes('),end=source.indexOf('\n const requestReplacement=',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {action,load};\n}',{mode:'strip'}),keys=['useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','apiUrl','loadingReplacements','loadReplacements','replaceable','sameReplacementContext','createRequest','matchReplacement','selectReplacement','setTimeout','clearTimeout','fetch'];
 const create=new Function(...keys,prefix+'\nreturn Substituicoes();'),state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,tid=0,active=null,currentHeaders={...headers};
 const wait=async(c,at)=>{if(c?.stage===at)await c.gate};
 const auth=async()=>{const c=active;if(c){c.reads++;await wait(c,['auth','final-auth','child-auth','child-final-auth'][c.reads-1])}return {...currentHeaders}};
 const fetch=async(path,options)=>{const c=active;calls.push({path,options});await wait(c,options.method==='POST'?'fetch':'child-fetch');return {ok:!c?.rejected,status:c?.rejected?400:200,json:async()=>{await wait(c,options.method==='POST'?'json':'child-json');if(options.method==='POST'){if(path.endsWith('/auto-match'))return recommendation;if(path.endsWith('/select'))return {replacementRequestId:R,professionalId:P,replacedAssignmentId:A,assignmentId:N,status:'matched'};return c?.ack??ack}return path.endsWith('assignments')?[assignment]:[]}}};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=typeof initial==='function'?initial():initial;return[state[i],v=>{state[i]=typeof v==='function'?v(state[i]):v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,x=>x,loadingReplacements,loadReplacements,replaceable,sameReplacementContext,createRequest,matchReplacement,selectReplacement,callback=>{const id=++tid;timers.set(id,callback);return id},id=>timers.delete(id),fetch);}
 render();cleanup=focus();return {state,refs,calls,timers,pump:()=>new Promise(setImmediate),begin(stage='none',kind='create',extras={}){render();let resolve;const gate=new Promise(r=>{resolve=r});const context=active={stage,gate,reads:0,...extras};const promise=handlers.action(kind,kind==='create'?A:R,P),timer=[...timers.values()].at(-1);return {promise,timer,context,resume(){active===context&&(active=null);resolve()}}},load(){active=null;render();return handlers.load(true)},blur:()=>cleanup(),refocus(){active=null;render();cleanup=focus()},install(){const data={assignments:{status:'ready',data:[assignment]},replacements:{status:'ready',data:[replacement]}};state[0]=data;state[2]={[R]:{status:'ready',data:recommendation}};refs[5].current={headers:{...headers},data}},draft(value='  Keep my draft  '){state[1]={[A]:value}},changeTenant(){currentHeaders={...headers,'x-tenant-id':'cccccccc-dddd-4eee-8fff-000000000000'}}};
}

test('AUDIT SELECT timely valid original assignmentId ACK and payload',async()=>{const h=screen();await h.pump();h.install();await h.begin('none','select').promise;assert.equal(h.state[4],false);assert.equal(h.refs[3].current,false);assert.equal(h.state[3],'Substituto confirmado.');const post=h.calls.find(x=>x.options.method==='POST');assert.equal(post.path,'/company/replacements/'+R+'/select');assert.equal(post.options.body,JSON.stringify({professionalId:P}));assert.equal(h.calls.length,5);h.blur()});
for(const stage of [...pre,...child])test('AUDIT SELECT actual deadline at '+stage,async()=>{const h=screen();await h.pump();h.install();const c=h.begin(stage,'select');await h.pump();c.timer();const expired={busy:h.state[4],pending:h.refs[3].current,count:h.refs[4].current.size,message:h.state[3]};c.resume();await c.promise;assert.equal(h.state[4],false);assert.equal(h.refs[3].current,false);assert.equal(h.calls.filter(x=>x.options.method==='POST').length,stage==='auth'?0:1);h.blur();assert.equal(expired.busy,false);assert.equal(expired.pending,false);assert.equal(expired.count,0);if(stage.startsWith('child-'))assert.equal(expired.message,'Substituto confirmado.')});

```

## Preparação anterior integral preservada

# PR570 — prazo de criação com ACK validado preservado

NOVO HEAD 029ecf051218755f85e757c517109cea1464d8be/tree543e4b3752075629f0d4227c8fd00e0399c2e75a/parenteeac6a52b0121d98c51fed0a1583116f98050dd7; MAIN75105 inalterada. PR existente, fast-forward normal sem force e sem duplicata. CI/APK próprios pendentes.



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


Nota com recibo integral eeac: https://github.com/dbdanielbaracho/MLIVRETRABALHO/blob/029ecf051218755f85e757c517109cea1464d8be/docs/evidencias/REPLACEMENT_CREATE_SCREEN_DEADLINE_2026-10-18.md

Revisão: todos os 9 caminhos desta entrega gerados e lidos integralmente de volta por blob, modos100644; demais blobs do pai preservados por SHA. Old27match/13helper/2ACKtests/helper7f52 e oldtest456bdc BYTEEXATOS. FULL6originais pai prefixexato append. NovoCI/APK obrigatório, nenhummerge/ready/rerun.
