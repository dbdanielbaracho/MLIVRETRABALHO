# ACKs de janela e suporte com cliente real — evidência e preparação

---

## Ciclo funcional — PR #568: calendário de ACK de janela e suporte pelo cliente real — 2026-10-16

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Main de preparação 3e098cd51cd2fd84f21e144a600a814a2cb1a150; candidato predecessor368aa313a2aa55ad269060bdde12b19cb7bd1465 permanece DRAFT/NOTMERGED e seu CI é FAILURE, não PASS. Nenhum rerun cego, cancelamento ou alteração dos gates do navegador.

### Falha reproduzida / correção mínima
Disponibilidade e publicação aceitavam ACKs com startsAt/endsAt impossíveis (2026-02-30, 2025-02-29, 2026-04-31), normalizados por Date ao mesmo instante de um pedido VÁLIDO. Isso retornava saved/created falsamente. Não se alega entrada inválida aceita pela API, registro PG impossível ou incidente em produção: contratos API atuais já validam calendário/intervalo. Só a validação das datas do ACK em availability-submit.ts e company-job-publication.ts muda, usando o predicado de calendário existente da Agenda. Todo o código fora do predicado e das duas condições foi conferido por reversão; pré-validação de entrada, requests, payloads, identidade, sessão, tenant, contexto, UUID, ACK policy e ausência de retry automático ficam iguais.

14 regressões novas executam funções reais: 12 casos negativos (três datas, início/fim, dois helpers), dois controles de calendário legítimo/offset cruzando UTC/epoch0 e contexto/rejeição. Baseline nova suíte2PASS12FAIL; 17 antigos +14 novos RED19PASS12FAIL -> GREEN31PASS0FAIL; full mobile796PASS0FAIL0SKIP0CANCEL local. Os 17 controles anteriores estão intactos. CI agregado esperado1386=[145Web,796mobile,431API,3CLI,11monitor], mas não é resultado observado nesta preparação.

### Novos casos independentes API/cliente/PG — execução PENDENTE
Os ACKs e pedidos já obtidos por HTTP em http-journey-e2e alimentam os helpers atuais de disponibilidade/publicação, mantendo pedidos independentes do ACK e zero novos POSTs HTTP nesses dois consumidores JSON. Markers previstos MOBILE_WINDOW_AVAILABILITY_REAL_JSON_PASS e MOBILE_WINDOW_PUBLICATION_REAL_JSON_PASS, não ainda observados.

Após TODAS as verificações originais do fixture safety-support-chronology (antes do navegador já existente), mobile-support-client-http-e2e executará SupportSubmission + SupportIntent reais via NativeTSstrip/import e fetch REAL contra API local: (1) confirmação normal, restauração por novo objeto store, barreira confirmada sem novo POST, liberação local explícita; (2) novo intent, POST real201 consumido pelo fixture e resposta perdida uma única vez LOCALMENTE; app retorna unknown/pending; PG precisa testemunhar a linha gravada ANTES de uma tentativa explícita separada; restauração/novo send/release não geram POST implícito; retry explícito usa mesma chave/corpo e retorna o mesmo caso; liberação explícita. Totais requeridos2preparações/3POSTscase/2linhas, com um POST inicial normal, um POST inicial com resposta perdida e um replay explícito, não retry de negócio automático.

Caller já guardado exige CI/localAPI/PG DB exato mlivretrabalho_http/socketloopback; witness SQL SOMENTE leitura vincula ID/tenant/reporter/assignment/key/payload/status e Date real. Snapshots das cinco tabelas e ACL/policies verificam duas linhas novas e todos registros anteriores intactos, outsider401. Nenhuma nova escrita SQL direta, DDL, alteração de grant/RLS/evento, seed de papel, provedor ou dado real. Marker MOBILE_SUPPORT_CLIENT_HTTP_PG_PASS só após esses asserts. Adapter serializado é EM MEMÓRIA, reinício de objetos JS; NÃO disco/SecureStore, processo Android, tela, teclado ou aparelho físico.

Todos HTTP/asserts antigos continuam; duas linhas de consumidor adicionadas ao HTTPjourney e bloco novo ao fim da chronology; navegador, CORS, Fetchguard, sandbox, LNA, deadlines, workflow, build e smoke permanecem iguais. O consumidor antigo MOBILE_SUPPORT_REAL_JSON_PASS no script posterior permanece obrigatório e separado; no predecessor não foi executado. Nenhum novo marker está aprovado sem log primário.

### Provas próprias e aceite
Esta preparação exige CI E APK próprios do novo HEAD e pós-gates no merge real somente se justificado/green. Mobile mudou, APK NÃO é N/A. Nenhum resultado368/567 emprestado. Somente área10 técnica interna aceita; demais12 pendentes. RLS/app_runtime/React19.1.4/RN0.81.6/frozenlock/desenho preservados; produção/custos/providers/PSP/pentest/VisualTruth/físico/SecureStore/piloto separados. #558/#560/#565 ficam DRAFT com falhas históricas próprias. #567/#564/#563/#561 já integrados, não repetir.

### Recibo integral predecessor368 — história consolidada neste ciclo funcional
O conteúdo a seguir foi reobtido do corpo final do PR568 e preserva as qualificações CI FAILURE / APK SUCCESS. Não representa o resultado deste novo HEAD. As antigas preparações PENDING permanecem históricas, sem substituição por resumo. Os dois PNGs pr568-368-* têm proveniência desse predecessor e NÃO são frames do novo ciclo nem Android.

## FINAL OWN VERIFIED — DRAFT / NOT MERGED — 2026-10-16 12:03 UTC

HEAD `368aa313a2aa55ad269060bdde12b19cb7bd1465`, tree `09bd6335ed6da6f0cf593b5523ac52b59cb076c0`, parent/base MAIN `3e098cd51cd2fd84f21e144a600a814a2cb1a150`. No ready, merge, post-568 run, rerun or cancellation. General CI is FAILURE; own standalone APK is SUCCESS. Do not borrow previous567 green or retry this product failure merely for green.

### Own general CI: FAILURE, not green
[38896338100/job116957597212](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38896338100/job/116957597212), attempt1 completeFAILURE, ZEROretry.
1372tests=[145Web,782mobile,431API,3CLI,11monitor] allPASS/fail-skip-cancel0. Typecheck/build/mobileexport/migrationrunner2x/privacyPASS. HTTP/browserFAIL; PostSetupNodeSKIPPED; later ProductionTruth and later support HTTP fixture NOT executed.

**Actual new positive consumer gate:** MOBILE_CHAT_REAL_JSON_PASS11:52:07.8816248Z consumed actual PostgreSQL/API-created POST message ACK and GET message list with CURRENT real mobile loadMessages/sendMessage helpers. Transport callback returns already-obtained actual JSON; it sends ZERO additional HTTP POSTs. This is positive API JSON-to-helper compatibility, NOT real Android UI or client network/SecureStore proof.

**New support JSON consumer gate: NOT EXECUTED.** Its invocation is in the later existing HTTP support fixture, after http-journey/browser; failure stopped the workflow before reaching it. The9 new support calendar tests and all old local/CI support tests passed, but MUST NOT label the new real support JSON gate PASS. No support delivery/outbox/provider/native proof.

### Primary browser failure
Actual Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed11:53:02.2076616Z.
Browsercreatedjob-render timeout11:53:24.4937681Z. Actual teamPOST201 and jobPOST201 observed, followed by12 GET net::ERR_ABORTED/canceled=true/corsError=null. Failure DOM shows12 unavailable sections/counts and rates—, not invented zero. This run did NOT complete created-job rendering/partial503/recovery/reload/logout/B journey. No availability or journey PASS marker. Not ECR/startup failure here; actual root of old aborts remainsUNRESOLVED, not proved API/CORS/vendor defect. No browser/security/Fetchguard/CORS/sandbox/LNApermission/deadline change.

Two OWN568 desktop PNGs from this job independently signature/SHA256/bytes/1365x900/PillowverifyPASS; failure visually inspected. Not native frames, not yet Git assets:
- login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686
- failureca8b160097084f7a3214c125780515cd7e66d05ded89dcf057d1b8d43538bdbc/133660
Scratch chat-support-calendar-local/568-own-web-captures.json. Preserve own exact source only in NEXT FUNCTIONAL cycle, not image-only commit.

### Own standalone APK: SUCCESS, scoped install/launch proof
[38896338029/job116957597028](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38896338029/job/116957597028), attempt1 completeSUCCESS, ZEROretry.
CanonicalbuildSUCCESS12:00:14.0015569Z; emulatorAPI35/x86_64/pixel6; installationSuccess12:01:47.8590566Z; DEVICE_SMOKE_OK12:02:00.3559792Z metro_required=false. Original main build/workflow/smoke unchanged. Failure-only diagnostics normally skipped on success. NOT565offlineentry/newforms/taps/keyboard/SecureStore/authsuccess/physical/VisualTruth proof.

Artifact12044258736/notexpired/expiry2026-10-30T12:02:02Z, actually downloaded and independently inspected:
- ZIP28912071bytes SHA2561a82df5ffa9b5fab2cdf8fd4830576042eb741662bca4ed8d962b61ce6b463a1 matches API digest.
- IndividualAPK66161572bytes SHA256f2453f30b13d83936d5e87af64e8212e4765420c97aa0f7f45ea27a8d54ce0be matches SHA256SUMS.
- BUILD_INFO commit6dc07b039535169a5e07399b5566ffb840a8230a/release/packagecom.predibeacon.mlivretrabalho.pilot/metrofalse.
- Static generatedmanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480 equals567. minSDK24/target36/INTERNETdeclared; static metadata not actual transport/security/UI proof. ZIP digest is NOT individual APK digest.

### Checkout truth / full review
Both runs actualcheckout `6dc07b039535169a5e07399b5566ffb840a8230a` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`368aa313a2aa55ad269060bdde12b19cb7bd1465`], tree09bd6335ed6da6f0cf593b5523ac52b59cb076c0 exactly candidate, NOT literal HEAD. CIprimary11:49:54.2445938Z/native11:49:41.7569364Z; Git commit/tree/parents re-read.

26paths ALLremoteUTF8/base64-whitespace-normalized bytes EXACT; modes100755 twoexistingHTTPshells,100644rest.1161otherpriorblobs sameSHA/mode;489of493 existing main non-docs outside2mobilevalidators+2HTTPscripts unchanged. All old assertions/HTTPcalls preserved, scripts each addONE nonblank consumer invocation.3newtest files + newconsumer script. All source outside2datepredicates/ACKcondition exactly reversible to main, all oldmobiletests intact. Full5originaldocs+matrixmainprefix preserved INPLACE,567 FINALreceipt consolidated integral and10historical567WebPNGs+manifest persisted with exact own/post provenance. None are568/nativeframes. Ahead1/behind0/mergebase3e. APKN/A FALSE, mobilechanged; ownAPK measured. No main/integrated gate was removed;565draft gate not incorporated.

Editorial scope clarification: prepared appendix says corrupt confirmed record “em disco”; observed regression uses serialized raw JSON in an IN-MEMORY adapter, not actual disk or native SecureStore. Implementation fails closed on invalid stored JSON without deletion/replacement; no retention policy invented.

### Functional result / limits / continuation
17newregressions baseline4PASS13FAIL→17PASS; old51+17=68PASS includingAmerica/Sao_Paulo; full782mobilelocal+CI. Reads reject impossible calendar, chatACKunknown afterONEunchangedcall, supportACKunknown/pending barrier retained with sameidentity/tenant/key/payload, no implicit repeat or release. Existing valid calendars/offsets/epochzero/explicit confirmed release unaffected. No impossible timestamp stored inPG/productionincident/exploit claimed.

MAIN remains3e/tree66f89c/orderedparents[f98,3a66]. Onlyarea10AndroidstandaloneTECHNICALINTERNAL accepted; other12pending. Otherdrafts558/560/565 unchanged;externals215/219/220/224/228OPEN. No production/services/costs/providers/PSP/realmoney. Do not ready/merge/rerun368 blind; consolidate FINAL568 only next FUNCTIONALcycle, no self-reference metadata/image/activity Gitcommit. The support actualJSON gate remains a concrete pending proof.

Independent NEXT LOCAL audit only, not published/not part782: current availability-submit and company-job-publication accept impossible2026-02-30 ACK when it normalizes to valid requested2026-03-02 instant. Actualhelpers fixture3tests baseline1PASS2FAIL;17oldcontrols+3 baseline18PASS2FAIL, copiedcandidate addscalendarcheck onlyACK fields→20PASS. Inputs/requests/response-offset equivalence unchanged in copy. APIavailability and companyjobcreate already validate input calendar/interval, no API bug. Screen requires nonblankworkCity, so speculative blank-city helper mismatch was NOT patched. No source/commit after368 or actualHTTP/Android/exploit proof for nextaudit. Needs fresh normative/source/contracts + coherent new regression/gates, NOT a blind retry of existing failure.

---
## Historical preparation — superseded ONLY by actual results above
## Functional correction / gates pending
Base 3e098cd51cd2fd84f21e144a600a814a2cb1a150; HEAD 368aa313a2aa55ad269060bdde12b19cb7bd1465; tree 09bd6335ed6da6f0cf593b5523ac52b59cb076c0. Only chat/support date predicates change; no app UI/authority/transport/retry policy change. 17 new regressions baseline4PASS13FAIL→17PASS; 51 unchanged focal tests +17=68PASS; fullmobile782PASS / zero fail, skip or cancel. TZ America/Sao_Paulo68PASS. Real HTTP fixture JSON-to-current-helper parity is added, still PENDING primary CI.

Own CI expected1372=[145Web,782mobile,431API,3CLI,11monitor] and own standalone APK REQUIRED, NOT yet PASS. Post gates required on actual real merge. No ready/merge until justified fresh exactHEAD green; no blind retry product failure. Onlyarea10technical accepted; other12pending. No production/costs/providers/PSP/realmoney. Otherdrafts558/560/565 preserved.


## Conversa e suporte — integridade do calendário e ACK — ciclo funcional 2026-10-16 UTC

Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, após567 jáMERGED. README e originais completos recebidos de GitHub; todos os bytes anteriores dos5originais/matriz permanecem PREFIXO integral NO LUGAR, sem substituir documentos ou estados históricos por resumo. Recibo final567 integral abaixo consolida próprio+pós reais no ciclo funcional, não é resultado deste novo HEAD.

### Falha reproduzida e correção mínima
Conversa loadMessages aceitava createdAt impossível e apresentava READY; sendMessage aceitava mesmo ACK como SENT. SupportAcknowledgement aceitava createdAt impossível, createSupportSubmission real retornava CONFIRMED e store confirm/releaseConfirmed podia liberar a barreira pendente. Fixtures usam2026-02-30,2025-02-29-03:00,2026-04-31+02:00, que Date normaliza. Reproduzido nos módulos TypeScript REAIS com transportes/adapter in-memory explícitos, não alegação de data impossível armazenada noPostgres, incidente/exploit de produção ou SecureStore nativo.

Correção SOMENTE predicado date em apps/mobile/lib/conversation.ts e inclusão do mesmo predicado calendário já usado BYTE-IDÊNTICO pela Agenda em support-intent.ts, substituindo a condição createdAt doACK. Ler calendário inválido retornaERROR; ACK de conversa permaneceUNKNOWN depois de UMA chamada; suporte retornaUNKNOWN, mantém registro pending exatamente com mesma identidade/tenant/chave/payload; novo sendNew recuperaPENDING sem outra preparação/POST; releaseConfirmed recusa sem remover. Registro confirmado corrompido em disco falha fechado, não é apagado/substituído por política inventada. Calendários válidos/leapday2024/offset cruzandoUTC/epochzero strings exatas preservados; liberação explícita de confirmado válido permanece. Não alterar contrato de suporte geral nullassignment autorizado, autoridade por tenant/membership ou recuperação explícita.

17regressões novas em conversation-calendar.test.mjs(8),support-calendar.test.mjs(5),support-submission-calendar.test.mjs(4): baseline main4PASS/13FAIL→GREEN17/17.51testes existentes BYTE-IDÊNTICOS nesses3módulos +17=68/68PASS, inclusive TZ America/Sao_Paulo. Fullmobile782/782PASS local,0fail/skip/cancel (765anteriores+17); modelos/helpers reais≠renderReactNative/Android/SecureStore. Todo source fora2predicados/condição compare-substituível BYTE-IDÊNTICO. Requests/UUID/path/headers/body/tenant/sessão/foco/prazo15s/chaveidempotente/current/ordem/stat/ACK/no-autoretry/JSX/API/controllers/SQL/RLS/grants/eventos/mobiledesign/deps/lock/build/workflows/smoke preservados.

### Paridade com JSON HTTP/Postgres real — gate novo, ainda PENDENTE nesta preparação
scripts/mobile-chat-support-contract.cjs lê somente JSON já obtido pelas fixtures locais existentes: real POST+GET de conversa e replayACK de suporte apósreview. NativeTSstrip carrega helpers atuais; conversa valida lista/ACK e suporte stage/confirm/restart/read/release em adapter in-memory. Duas invocações adicionadas aosHTTPscripts, TODOS asserts/chamadas HTTP anteriores intactos; nenhuma nova chamadaHTTP/SQL, nenhumPOST adicional, alteração de grant/policy/status/body/tenant/auth. Gate exige CI e configAPIPG exatoslocalhost via helper localConfiguration existente; script não acessa banco/rede/credencial, não recebe bearer. Marcadores MOBILE_CHAT_REAL_JSON_PASS eMOBILE_SUPPORT_REAL_JSON_PASS só podem ser aceitos após logs primários novos, não resultados locais simulados/antecipados. Não conta marcadores como novos testes unitários nem prova de tela ou SecureStore.

### Evidência histórica567 persistida com origem própria
DezPNGs Web de567(5OWN+5POST) +PR567_OWN_POST_CHAT_SUPPORT_CYCLE_PROVENANCE.json persistidos neste ciclo sobdocs/evidencias/web-browser-2026-10-16/, comsignature/SHA256/bytes/1365x900 conferidos independentemente, fonteprimáriajobs116937140753/116942544994. OWNsourcehead3a66/checkout42ffcSINTÉTICO[f98,3a66]/tree66f89c/run38890073248attempt1SUCCESS; POSTcheckoutLITERAL3e/run38891514441attempt2SUCCESS. Não são frames deste novoHEAD nem Android. Recibo567 separaAPKindividual≠ZIP; nenhuma prova567 é emprestada para aceitar candidato/565/558/560.

### Gates e limites atuais
OWNCI esperado1372=[145Web,782mobile,431API,3CLI,11monitor], APKstandaloneOWN obrigatório por mobilealterado, ambos AINDA PENDENTES neste apêndice preparação; pósCI/APK no mergeREAL também obrigatórios. Não ready/merge sem ambos própriosGREEN e revisão/expectedSHAfresh, não rerun falhaproduto para verde. Preservar f98/3e/567históricos, não repetir merges. Navegador/CORS/Fetchguard/sandbox/LNA/permissões/deadlines inalterados; causa antigaERR_ABORTED e startup permaneceUNRESOLVED apesar567GREEN.
Somente área10Androidstandalone TÉCNICOINTERNO aceita; outras12pendentes. Esta correção e paridadeJSON não aceitam integralmenteárea9/11 ounativeUI/taps/teclado/loginválido/SecureStore/físico/piloto/VisualTruth. Externos215/219/220/224/228OPEN;565aa0/558879/560e47DRAFTFAIL separados. Semprodução/serviços/custos/credenciais/contratos/provider/PSP/dinheiroreal. #566fechada porgithub-actions[bot]comSHA3e/evento11:05:53Z/comment6214133831, semissuewritesmanuais/commitatividade. Manterrotinaúnicaenabled/scheduleinalterados; parcialnãoencerra13áreas. Datas deoutrosleitores ainda precisam auditoriafactual, não declarar todoscorrigidos.


