# Android isolation — bounded exact-command evidence and permission STOP

## ANDROID_ISOLATION_FAILURE_PROVENANCE_2026_10_23

Continuação funcional no mesmo PR565, a partir HEADb63d2c97bd1c54759375680240570726095c8836 e MAIN4c2dae79f8f63d7ba48b757b4885313a5d53a530. Resultado anterior real: CI39950306733 SUCCESS1948; APK39950306845 FAILURE após smoke original DEVICE_SMOKE_OK12:12:12Z; erro command_failed_adb_20 em offline-isolation12:12:17Z/checks[]/captures[]; uploadAPKvalidadoSKIPPED. Checkout sintético761c4cdb71936af2e76a77d9656a6c64c1eb69ea árvore0bc48d35450dcf912963dbb7a9a949a715fab152/pais[MAIN4c,HEADb63]. Não prova qual comando falhou: wrapper descartava stdout/stderr antes da classificação e várias chamadas precedem ethernet-help. Não inferir PermissionDenial/serviço/sintaxe/causa.

Correção de diagnóstico e interrupção real: as seis chamadas de isolamento existentes recebem identificação estática; stdout/stderr limitados a4096bytes por stream com bytes/SHA256/truncated explícitos, status/signal/errorCode. Classificação de permissão usa saída completa ANTES do corte e ANTES do erro genérico. Negativa real interrompe inclusive captura/cleanup internos posteriores, sem novo ADB após STOP. Comandos de isolamento originais, guarda de help suportado,15s,zeroIPv4IPv6default/globaladdress, QEMU/checkout/APK instalado e jornada7casos originais preservados. Sem root/grants/policy/fallback/bypass/nova operação de rede.

Quatro regressões novas executam o main real em VM com ADB/FS explicitamente simulados: erro tardio20 identificado/sem UI; PermissionDenial cedo interrompe; negativa após20000chars é detectada embora recibo seja limitado; negativa com exit0 falha fechada. Baseline0PASS4FAIL→candidate4PASS;10modelos antigos BYTEexatos continuamPASS. LOCALNode24.19.0, não prova Android/RN/HTTPPG/físico. Nova própriaCI+APKaplicável PENDENTES; não rerun mesmoSHA ou PASSemprestado. Nenhum aceite novo:10aceitas[2,3,4,5,6,7,8,9,10,12]/3pendentes[1,11,13]. Issue622 administrativa distinta: mainprotectedfalse/rulesets[];1/11 lacunas internas.574DRAFT intacto. React19.1.4/RN0.81.6/depslock/API/SQL/RLS/tenant/LGPD/browserguards intactos.
Recibo e FULLFINALb63: docs/evidencias/ANDROID_ISOLATION_FAILURE_PROVENANCE_2026-10-23.md. Terminal novo somente após primária real; prepPENDING é história. Nãoaceitar produção/PSP/dinheiro/pentest/aparelhofísico/VisualTruth/SecureStore/RNformintegral por arrasto.

## Regression source (four new composed tests)

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const actualRequire=createRequire(import.meta.url);
const source=readFileSync(new URL('../android-entry-journey.cjs',import.meta.url),'utf8');
const digest=b=>createHash('sha256').update(b).digest('hex');
const checkout='a'.repeat(40),sourceHead='b'.repeat(40),apk=Buffer.from('owned fixture APK bytes');
const pkg='com.predibeacon.mlivretrabalho.pilot';
async function execute(faultCommand,fault){
 const calls=[],logs=[],writes=new Map(),entry={exports:{}};
 const fs={
  existsSync:()=>false,mkdirSync:()=>{},
  readFileSync(p){
   if(p.endsWith('MLivreTrabalho.apk'))return apk;
   if(p.endsWith('BUILD_INFO.txt'))return 'commit_sha='+checkout+'\nandroid_package='+pkg+'\nmetro_required=false\n';
   if(p.endsWith('SHA256SUMS.txt'))return digest(apk)+'  MLivreTrabalho.apk\n';
   throw Error('unexpected_read');
  },
  writeFileSync:(p,b)=>writes.set(p,String(b))
 };
 const good=stdout=>({status:0,signal:null,stdout,stderr:''});
 function spawnSync(binary,args){
  const command=binary==='adb'?args.slice(2).join(' '):args.join(' ');
  calls.push({binary,command});
  if(command===faultCommand)return fault;
  if(binary==='git')return good(checkout+'\n');
  if(binary==='adb'&&args[0]==='devices')return good('List of devices attached\nemulator-5554 device\n');
  if(command==='shell getprop ro.kernel.qemu')return good('1\n');
  if(command==='shell pm path '+pkg)return good('package:/data/app/fixture/base.apk\n');
  if(command==='shell sha256sum /data/app/fixture/base.apk')return good(digest(apk)+'  /data/app/fixture/base.apk\n');
  if(command==='shell wm size')return good('Physical size: 1080x2400\n');
  if(command.startsWith('shell uiautomator'))return{status:1,stdout:'',stderr:'fixture hierarchy unavailable'};
  if(command==='shell cmd ethernet help')return good('  set-ethernet-enabled <enabled|disabled>\n');
  if(command==='shell am force-stop '+pkg||command==='shell cmd connectivity airplane-mode enable'||command==='shell svc wifi disable'||command==='shell svc data disable')return good('');
  throw Error('unexpected_command_'+command);
 }
 const require=name=>name==='node:fs'?fs:name==='node:child_process'?{spawnSync}:actualRequire(name);
 require.main=entry;
 const process={env:{CI:'true',GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',GITHUB_SHA:checkout,MLIVRE_SOURCE_HEAD:sourceHead,GITHUB_RUN_ID:'123',GITHUB_RUN_ATTEMPT:'1',GITHUB_WORKSPACE:'/fixture'},exitCode:0};
 vm.runInNewContext(source,{module:entry,exports:entry.exports,require,process,Buffer,setTimeout,console:{log:x=>logs.push(x),error:x=>logs.push(x)}},{timeout:1000});
 await new Promise(resolve=>setImmediate(resolve));
 const row=[...writes].find(([p])=>p.endsWith('/failure.json'));assert.ok(row,'actual main must persist failure');
 return{calls,logs,receipt:JSON.parse(row[1]),process};
}
test('real entry main records exact late exit20 output without entering forms',async()=>{
 const r=await execute('shell cmd ethernet help',{status:20,signal:null,stdout:'service usage unavailable\n',stderr:'fixture shell diagnostic\n'});
 assert.equal(r.receipt.error,'command_failed_adb_20');assert.equal(r.receipt.stage,'offline-isolation:ethernet-help');
 assert.equal(r.receipt.isolationFailure.status,20);assert.equal(r.receipt.isolationFailure.stderr.text,'fixture shell diagnostic\n');
 assert.equal(r.receipt.permissionStopped,false);assert.deepEqual(r.receipt.checks,[]);assert.deepEqual(r.receipt.captures,[]);
 assert.equal(r.calls.some(x=>/set-ethernet-enabled|pm clear|input tap|input text|monkey/.test(x.command)),false);
 assert.equal(r.process.exitCode,1);
});
test('permission denial in early isolation stops every subsequent ADB call including cleanup',async()=>{
 const fault='shell cmd connectivity airplane-mode enable';
 const r=await execute(fault,{status:20,signal:null,stdout:'',stderr:'SecurityException: Permission Denial\n'});
 assert.equal(r.receipt.error,'permission_denied_stop');assert.equal(r.receipt.stage,'offline-isolation:airplane-mode');
 assert.equal(r.receipt.permissionStopped,true);assert.equal(r.calls.at(-1).command,fault);
 assert.deepEqual(r.receipt.checks,[]);assert.deepEqual(r.receipt.captures,[]);assert.equal(r.process.exitCode,1);
});
test('full stderr is checked before bounded evidence truncation',async()=>{
 const stderr='x'.repeat(20000)+' Permission denied';
 const r=await execute('shell svc data disable',{status:20,signal:null,stdout:'',stderr});
 const e=r.receipt.isolationFailure.stderr;
 assert.equal(r.receipt.error,'permission_denied_stop');assert.equal(r.calls.at(-1).command,'shell svc data disable');
 assert.equal(e.bytes,Buffer.byteLength(stderr));assert.equal(e.sha256,digest(Buffer.from(stderr)));assert.equal(e.truncated,true);assert.equal(Buffer.byteLength(e.text),4096);
 assert.equal(r.logs.some(x=>x.includes('x'.repeat(4097))),false);
});
test('permission denial with zero exit status still fails closed before further commands',async()=>{
 const r=await execute('shell svc wifi disable',{status:0,signal:null,stdout:'not allowed by fixture policy',stderr:''});
 assert.equal(r.receipt.error,'permission_denied_stop');assert.equal(r.receipt.permissionStopped,true);
 assert.equal(r.receipt.isolationFailure.status,0);assert.equal(r.calls.at(-1).command,'shell svc wifi disable');
 assert.equal(r.process.exitCode,1);
});

```

## Prior terminal PR565 body — complete historical record

## Resultado real — 23/10/2026 12:20 UTC

**DRAFT, NÃO MERGED. CI completo SUCCESS; workflow Android FAILURE. Nenhum aceite novo de área nesta integração.** Matriz vigente: 10 áreas aceitas internamente [2,3,4,5,6,7,8,9,10,12]; 3 pendentes [1,11,13]. O preparo e o histórico abaixo são preservados integralmente e não substituem este resultado.

### SHA e revisão
- MAIN revalidada: `4c2dae79f8f63d7ba48b757b4885313a5d53a530`.
- HEAD deste mesmo PR: `b63d2c97bd1c54759375680240570726095c8836`; árvore `0bc48d35450dcf912963dbb7a9a949a715fab152`; pais ordenados [antigo565 `aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`, MAIN4c].
- Checkout REAL comum aos dois workflows: `761c4cdb71936af2e76a77d9656a6c64c1eb69ea`, SINTÉTICO, pais [MAIN4c, HEADb63], árvore0bc idêntica ao candidato, confirmado por Git API. Não é checkout literal HEAD nem MAIN.
- Revisão cumulativa: 13 caminhos, 10 arquivos existentes alterados +3 adicionados; 1369/1379 blobs existentes e modos idênticos fora do delta. 173 entradas mobile/runtime/API/SQL/RLS/deps/lock/build-smoke intactas; 183/185 entradas protegidas intactas fora dos 2 workflows explicitamente revisados. React19.1.4/RN0.81.6, RLS/tenant, políticas, navegador/15s/segurança preservados. APK aplicável porque os workflows Android mudaram.
- Atualização normal da branch com expected SHA e force=false. ZERO nova PR, ready, merge, pós-merge, rerun, cancel ou force.

### CI próprio completo aprovado
[Run39950306733](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39950306733), job120402860763, attempt1 SUCCESS. Checkout primário 12:02:18.6457849Z.
- 1948 testes de RunTests: 217 Web +1186 mobile +521 API +3 CLI +11 watch +10 modelos Android antigos reutilizados; 0 fail/skip/cancel. Os 10 não são novos testes nativos.
- 3 regressões de reconciliação na etapa HTTP separadas dos 1948. DOCUMENT_TRUTH_RECONCILIATION_PASS12:04:40.7029101Z:13 áreas/58 requisitos/9 cadeias históricas/18 recibos CI/12 APK/6 prefixos/185 entradas.
- Types/build/export Android/migrações2x/privacidade/jornadas HTTPPG/matriz12+canônico aprovados; MATRIXstatus0 12:06:48.8764301Z. ProductionTruth PASS12:07:56.2323285Z.
- Este verde não substitui o gate Android vermelho.

### Android próprio: falha preservada
[Run39950306845](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39950306845), job120402861032, attempt1 FAILURE. Checkout primário12:02:07.4459005Z = sintético761c.
- BuildStandalone SUCCESS, metadata12:10:38.0881180Z.
- Smoke original registrou DEVICE_SMOKE_OK12:12:12.3846494Z / metro_required=false.
- O step combinado “Device smoke test — install and launch without Metro” terminou FAILURE por causa da jornada adicional. Não chamar o workflow APK de SUCCESS.
- ANDROID_ENTRY_JOURNEY_FAIL12:12:17.3828734Z: stage=offline-isolation; error=command_failed_adb_20; checks=[]; captures=[].
- ANDROID_ENTRY_PROCESS_FAIL12:12:17.4055456Z; gate propagou falha. Upload validated standalone APK SKIPPED. Nenhum artefato APK validado foi publicado nesta run.
- ERRATA DE ATRIBUIÇÃO: ausência de ANDROID_ENTRY_ETHERNET_HELP não individualiza qual chamada ADB falhou. A mesma etapa também executa force-stop/airplane-mode/svc wifi/svc data antes da consulta help. O wrapper atual descarta stdout/stderr em retorno não zero. Logo exit20 não prova Permission Denial, ausência de serviço, sintaxe errada ou que a consulta help foi o comando que falhou. Não atribuir causa nem executar fallback/elevamento.
- Nenhum ANDROID_ENTRY_ETHERNET_HELP ou ANDROID_ENTRY_ETHERNET_DISABLE_REQUESTED observado no log completo. Não há prova do protocolo Ethernet suportado, nem teste de tela/teclado/7 casos ou captura nativa aprovado. Não inferir validação offline a partir do smoke anterior.

### Bytes dos diagnósticos verificados independentemente
1. Artifact12500313440 MLivreTrabalho-android-entry-journey: ZIP335 bytes, SHA256 `b3cce99475564e72f6134c9e070de6362b43e1741cc73ca33e2c44465d7b01f9`, API/log/bytes baixados iguais; curl exit0, ZIP CRC íntegro; único arquivo failure.json, checkout761c/sourceHeadb63/run39950306845/attempt1/erro e listas vazias acima.
2. Artifact12499929379 MLivreTrabalho-device-smoke-logs: ZIP37739 bytes, SHA256 `fbbc5e0b55fd05b702af2b909a33e65724a9acc7a643e972a1a95a1ccb00fa81`, API/log/bytes baixados iguais; curl exit0, ZIP CRC íntegro. Dez arquivos de smoke/logcat/instalação/diagnósticos anteriores. Busca de ethernet/Permission Denial/SecurityException/set-ethernet/shell command em todos os TXT/LOG/JSON não recuperou a saída do comando falho. Isso não demonstra ausência global de erro de permissão.
Ambos expiram06/11/2026, unexpired na consulta. ZIP diagnóstico NÃO é APK, PNG ou aceite funcional. Não emprestar APK antigo, own CI ou smoke parcial para autorizar merge.

### Bloqueio administrativo independente da Área13
[Issue622](https://github.com/dbdanielbaracho/MLIVRETRABALHO/issues/622) contém as provas e configuração requerida. GET branches/main retorna protected=false e required checks off; GET rulesets retorna []. Não há regra administrativa ativa comprovada. O conector não oferece mutação administrativa e a sessão disponível da página settings/branches está desconectada. Nenhuma credencial, login, ampliação de grants ou bypass solicitado/executado.
Ação externa específica: responsável com sessão administrativa existente deve configurar proteção/ruleset da main com PR e checks obrigatórios confiáveis; comprovar leitura de retorno e controles negativo/positivo. Isso não é aceite manual de produto. Não simular tentativa de merge vermelho enquanto main está desprotegida. Área13 permanece pendente; áreas1/11 continuam lacunas internas independentes. Não encerrar projeto/rotina por esse impedimento.

### Próximo trabalho seguro
Manter565/574 drafts. Antes de outra hipótese de isolamento, obter identificação e stdout/stderr limitados da chamada exata que falhou; o diagnóstico atual não os preserva. Em qualquer Permission Denial real, STOP: sem adb root, grants, chmod/setuid, ip-link alternativo, alteração de sandbox/policy/privilégio ou relaxamento de zero-address/default-route/deadlines. Sem novo delta funcional justificado, não rerun do b63 apenas para verde. Qualquer novo SHA exige ownfullCI+APK próprios, revisão fresca e pós-merge literal somente após todos os gates aprovados. Nenhum novo aceite total de Área1/11/13, SecureStore/RN formulário, aparelho físico, pentest, produção ou PSP/dinheiro real.

---

## PREPARAÇÃO E HISTÓRIA INTEGRAIS — preservadas, superadas pelo resultado terminal acima

## Android entrada565 — nova candidatura integrada, gates pendentes — 23/10/2026
MesmoPR565/DRAFT,HEADb63d2c97bd1c54759375680240570726095c8836/tree0bc48d35450dcf912963dbb7a9a949a715fab152/pais[aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1,4c2dae79f8f63d7ba48b757b4885313a5d53a530], avanço normal semforce/novaPR/rerun. MAIN4c2/CI39944936508SUCCESS/Área12aceita621 revalidados;605/6/584járesolvidos.10áreasaceitas/3pendentes[1,11,13], semnovoaceite.

Falha real antigaAPK38863990420/job116852488606 relidaFULL:DEVICE_SMOKE_OK07:07:50.2920580Z eoffline-isolation/global_address_present07:08:08.4612374Z,eth0 10.0.2.15/24,checks[]/captures[]. A nova hipótese adiciona SOMENTE cmd ethernet help antes do pedido disabled e exige sintaxeLITERALset-ethernet-enabled<enabled|disabled>anunciadapelopróprioemulador. Ajuda incompatível/serviçoausente/erro/negativapermissãoSTOP, semfallback/root/grant/iplink/adbroot/chmod/policy. Não afirmaCLIcompatível ou reparoAndroid antes de execução. Asserts15sdeairplane/wifi/data/routesIPv4IPv6/globaladdresses,guardCI/repo/checkout/APKinstalado/únicoQEMUemulador e7casos originaisUI nativa permanecem. Inputsapenasinválidos/vazios, offline comprovado antesdereset/taps/captures; nenhumaentrada/credencial/POSTprodução.

Atualizados2workflowsSOBREMAINEXATA: CIcontinuaDockerpostgres17 eGoogleChromesignado/mainwholejourneys,apenasreutiliza10entrymodels; APKpreservaoriginalsmoke eadicionagate565+artefatoevidênciaantesuploadAPKvalidado.13pathsreviewSHA/modos,1369dos1379blobs existentesintactos;173mobile/runtime/deps/lock/buildsmoke/APISQLRLSACLinalterados.183dos185insumosprotegidosiguaisfora2workflows. Ledgerreconcilia2SHAsdeworkflow eAPKAPLICÁVEL/candidatoPENDENTE,nenhumCI/APKantigoemprestado.12newblobsFULLreadbackexact+test10BYTEEXATOold565reusedSHA d5358dbecc895e18916d76770215126f2d801a88. Semcopiar574.

CheckerArea12agorarecortatabeladoseuprópriocapítulopelopróximo##;futurosapêndiceshistóricosnãoviramtabelaATUAL.55IDs/58requisitos/13áreas/9cadeias/6FULLprefixos/185insumos/guardsmantidos. LOCALNode24.19.0:10guardmodelsANTIGOS+3reconciliaçãoPASS0fail-skip-cancel/nodecheck;fixtureGitdeárvoremetadadoscandidata,semADB/emulador/NestPGlocal. Não são13novostestes nemprovanativa.

SeisoriginaisMAINprefixosFULLBYTEexatos eold565FULLreconstruídosporcommonprefix+caudaliteralcomoffset/hash;old565eraFULLprefixo da main nesta integração,caudasexclusivasvazias,semperda/reescreverhistória. PNGs/notas antigos565jáMAINmesmospaths,preservados;nenhumanovaVisualTruth. Nova nota docs/evidencias/ANDROID_ENTRY_ETHERNET_RECONCILIATION_2026-10-23.md contémFULLFINAL565anterior+primárias+manifesto+issue622.

OWNCIeOWNAPKnovosPENDENTES. ExigirfullSUCCESS/checkoutrealGitpaisárvore/BUILDINFO/ZIPvsAPKindividual/SUMS/installDEVICE_SMOKE+ANDROIDENTRYantesdequalquerready/mergeexpecteduma vez ePOSTCIAPKliterais. Browserguards15s/FetchCDPCORSsandboxLNA/NetLog/assertsintactos;semSAMESHArerun/cancel.

ÁREA13externoadministrativoREAL[#622](https://github.com/dbdanielbaracho/MLIVRETRABALHO/issues/622):mainprotectedfalse/rulesets[];conectorsemadmin,navegadorsem sessão. Nenhumloginsolicitado/credencial/root/permissãobypass. Nãoaceitar13nemencerrarprojeto/rotinaporisso. Áreas1/11continuam internaspedentes;ajudageral/prefs semcontrato nãoforaminventadas. SemprodRailwayNeon/providerPSP/dinheiro/custosserviçosexternos/pentest/físico. Rotinaexistenteinalterada/nãoprometeexecuçãoentreturnos.

### FULLFINAL565 anterior — história, não resultado do novoHEAD
## FINAL OWN RESULTS — 2026-10-16 UTC — DRAFT / NOT MERGED

HEAD `aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`, tree `49543d17a5abc38a47d020a32ddd7993619dff61`, parent `c4974ba7e191acac808e0877e62ab4d0b800c8bf`. Base MAIN `f98b5f618c5b78772c360b93d17e6028f0021008`. Both OWN runs completed FAILURE, attempt1, ZERO retries. No ready/merge/post-565 exists.

### General CI: FAILURE, not green
[Run 38863990479 / job 116852488777](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38863990479/job/116852488777).
1353 tests=[145Web,753mobile,431API,3HTTPCLI,11watch,10entry-harnessmodels] pass; fail/skip/cancel=0. Typecheck/build/mobile export/migration runner2x/privacy PASS. HTTP/browser FAIL; Post Setup Node skipped; later ProductionTruth NOT executed. Unit green is NOT CI green.

Actual Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed06:58:55.1553052Z. Actual ONE teams GET503 consumed +11 distinct other real GET200, human refresh12 NEW GET200/team1/zero extra POST from SEND PASS06:58:57.1288285Z. Subsequent loaded-dashboard timeout06:59:17.0151233Z with12 GET net::ERR_ABORTED/canceled=true/corsError=null. Full reload/logout/B journey NOT completed. Existing transport root remains unresolved, no API/CORS/vendor/security inference or workaround. Original app/browser driver and security/deadlines unchanged.

### Native APK: FAILURE after original standalone smoke
[Run 38863990420 / job 116852488606](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38863990420/job/116852488606).
Canonical build SUCCESS07:06:13.9296606Z; emulator API35/x86_64/pixel_6; actual installation Success07:07:37.9031694Z and unchanged DEVICE_SMOKE_OK07:07:50.2920580Z, metro_required=false.

NEW gate failed closed07:08:08.4612374Z at `offline-isolation`: after airplane-mode enable, Wi-Fi/data disable and bounded15s observation, `ip -o addr show scope global` still reported eth0 IPv4 10.0.2.15/24. Earlier serial/CI/repo/checkout/BUILD_INFO/individual local-versus-installed APK hash guards had passed by control flow, but no individual APK hash was emitted before this failure; do NOT invent its digest or substitute ZIP digest. Error is isolation precondition failure, NOT application validation failure / permission denial / production incident.

No pm-clear, UI input, native keyboard/form/navigation/relaunch checks reached; checks=[]/captures=[] are NOT PASS. NO native PNG/XML or native journey success observed. Validated standalone APK upload SKIPPED; diagnostic upload success does not accept UI. No radio/route/global-address assertion removed, no root/permission grant/security change/deadline extension, no rerun.

Native evidence artifact12030479489 contains failure receipt only,423ZIPbytes, ZIP SHA2567dc18987c7232d75aea175b75f89adf59117888046a4c643c0db8bbaafd4920e. Smoke diagnostic artifact12031106153,53576ZIPbytes, ZIP SHA2568d405ab35d70ed395338020a9af6a5daf73cb0b30c99d5f5a82ec426d6f1215a. Both expiry2026-10-30; neither ZIP digest is an individual APK digest.

### Exact provenance
Both current runs checked out `f90edc8564d4876a17b2d320b57a39b5271d9eb4`, SYNTHETIC ordered parents [`f98b5f618c5b78772c360b93d17e6028f0021008`,`aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`], tree49543d17a5abc38a47d020a32ddd7993619dff61 identical candidate; NOT literal HEAD. Native checkout primary06:55:33.1133119Z. Source head emitted in failure receipt is aa0. No merge/post gates borrowed.

### Historical initial preparation, separate from final HEAD
Initialc497 CI38863871145/job116852113483attempt1FAILURE1353testsPASS; browser created-team-rendered timeout06:58:05.1619699Z after12 GET aborts. Initial native38863871168/job116852113951attempt1FAILURE: synthetic checkout14a20f995c19ff22e661446925b707df0610ddfd, build07:05:07.7885982Z, original DEVICE_SMOKE_OK07:06:40.9087059Z, new gate offline-isolation/global_address_present07:06:59.2410393Z, no UI checks/captures. Initial results not borrowed for aa0. No retries/cancels.

### Implementation / review
Coverage gap only, no fabricated application defect or product RED. New scripts/android-entry-journey.cjs +10 unit guard models, added after UNCHANGED original standalone smoke in same emulator. Guards require CI/repo/exact checkout/source, single authorized QEMU emulator, own APK/BUILD_INFO/local-vs-installed hash, fresh output, radio/route/address isolation before app reset/input. Selectors require actual XML app labels, enabled unique observed bounds; planned keyboard/invalid email/empty forms/role/back/new-process checks must execute in actual emulator before claiming proof.

10 new models +8 original smoke models PASS locally, NOT Android UI. Separate subprocess fake-ADB physical-device refusal probe PASS before app clear/taps, NOT actual physical/native execution. All negative physical IDs fictional in current head.

17 PR paths, all remote UTF8/base64-normalized bytes exact, all modes100644; FULL original5docs+matrix/main/preparation prefixes preserved in-place by appendix.490of492 existing main non-doc blobs outside2 workflows IDENTICAL; all app/mobile/native/API/SQL/deps/lock/build/old smoke and old tests unchanged. Ahead2/behind0/merge-basef98. Workflow/gate changes require own AND post APK, not N/A.

Previous564 FINAL ownSUCCESS/postSTARTUPFAIL consolidated in5originaldocs+matrix and new ANDROID_OFFLINE_ENTRY_JOURNEY_2026-10-16.md. Five historical OWN564 web PNGs+source manifest persisted with exact provenance/remote readback, not565/native images. Current Git565 appendices are PREPARATION/PENDING history; consolidate this final result only in NEXT FUNCTIONAL cycle, no self-referential metadata/image-only commit.

### Current desktop captures (NOT native proof)
5 OWN CI Web frames primaryjob116852488777 independently decoded PNG signature/bytes/SHA256/1365x900 and Pillow verify PASS; recovered+failure visually inspected. Not yet Git565 assets.
- login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686
- created4dab0942d0fc0eca42a7af70e0ecbf8aed8c6b1374dc2d20dc195fbfa591e7d7/132035
- partial0299f9213f9752f79d2ec783005acdd39bdfc3f66dab4c2423aba498c1015fd2/140761
- recovered47b63ea5c5a1f9e7de0de3ed37223215ee3bd9e060603b1bfbdf951518ebe2e9/132202
- failuref735fdab7e4dba0436b8207cda12f5837a972f4bf4b376616d80f301dcdc538c/132794

### Limits / next safe work
Keep DRAFT: both OWN gates red. Do not rerun solely for green or remove strict isolation. Need a source-grounded, explicitly supported way to disable remaining emulator Ethernet with existing permissions, or a genuinely isolated fixture, followed by measured no global addresses/default routes; no root/grants/bypass. No production input/auth/signup or successful-auth/SecureStore/physical/VisualTruth claim. Permission denial must STOP that branch. If no safe supported isolation, continue independent contracted internal journeys, not all blocked.

Fresh MAIN remainsf98, PRhead/base/draft verified, openPRs558/560/565, external issues215/219/220/224/228 remain separate. Onlyarea10 Androidstandalone TECHNICAL INTERNAL accepted; other12 pending. No whole-area acceptance from testcounts, build, standalone smoke, diagnostics or desktop images.
