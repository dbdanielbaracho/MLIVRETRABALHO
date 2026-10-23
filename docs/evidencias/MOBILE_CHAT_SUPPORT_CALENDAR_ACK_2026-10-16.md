# Conversa e suporte — calendário/ACK

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

### Recibo567 final integral consolidado (HISTÓRIA, não resultado do novoHEAD)
## FINAL VERIFIED — MERGED / OWN + POST CI + APK SUCCESS — 2026-10-16 UTC

PR567 alreadyMERGED; DO NOT repeat ready/merge/rerun. Main LITERAL `3e098cd51cd2fd84f21e144a600a814a2cb1a150`, tree `66f89c3ef2902dad6d1d59e0210be7229c3a857c`, orderedparents [`f98b5f618c5b78772c360b93d17e6028f0021008`,`3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d`]. Fresh main/PR/commit re-read after both post gates. Single expectedHEAD merge, no force or gate weakening.

### Actual completed gate receipts
- OWN CI [38890073248/job116937140753](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38890073248/job/116937140753) attempt1SUCCESS1355=[145Web,765mobile,431API,3CLI,11monitor], fail/skip/cancel0, ALL18steps incl HTTPPG/ProductionTruth10:56:54.0120522Z.
- OWN APK [38890073257/job116937140654](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38890073257/job/116937140654) attempt1SUCCESS/build11:02:52.4400673Z/installSuccess11:04:16.5659481Z/DEVICE_SMOKE_OK11:04:29.1353446Z withoutMetro. Own head3a66, actualcheckout42ffc6a2a3536ff8c74bf732748210dce3f1b261 SYNTHETIC orderedparents[f98,3a66]/tree66f89c equalcandidate, NOTliteralHEAD; nativeprimary10:52:31.8761370Z.
- POST CI [38891514441/job116942544994](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38891514441/job/116942544994) attempt2SUCCESS1355samegroups/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth11:12:31.5379596Z. Actual LITERALcheckout3e098 primary11:07:57.3077219Z. Attempt1/job116941873608failed ECRpostgres17 Data limit exceeded11:05:49Z..58Z BEFOREcheckout/allproductSKIPPED. ExactlyONEspecific failed-completed job retry SAMESHA resolved infrastructure; no product failure rerun, no running-job rerun, no further retries.
- POST APK [38891514299/job116941872137](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38891514299/job/116941872137) attempt1SUCCESS/build11:16:47.9579105Z/installSuccess11:18:18.0446015Z/DEVICE_SMOKE_OK11:18:30.5174876Z withoutMetro. Actual LITERALcheckout3e098 primary11:05:51.5499143Z. Failure-only diagnostic steps normallySKIPPED on success; no Android form/keyboard/session journey claimed.

### APK bytes, not ZIP-digest borrowing
Both artifacts independently downloaded with the GitHub artifact tool, ZIP SHA checked against API, individual APK SHA checked against SHA256SUMS, BUILD_INFO actual checkout/package/release/metrofalse checked. No borrowed542/565 or inferred digest.
- OWN artifact12041947330, ZIP28912130bytes/SHA256f9efbb72eac87e9261da626cd0380daff6ceecf178670bc15789088b7a7eafeb, expires2026-10-30. Actual APK66161616bytes/SHA2561b2c0ce67f33b77494b8f929c22a19764a3e7c7f11b6d56b6501e8f43c73616b, BUILD_INFO.commit_sha42ffc6a2a3536ff8c74bf732748210dce3f1b261.
- POST artifact12042661578, ZIP28912126bytes/SHA256e4ed3e242a0af02e54a7edec2f808ae07e1385ad71eead02e2e9f940436b0959, expires2026-10-30. Actual APK66161612bytes/SHA2567b9cf44f2be9565dec7be7582ea0538a3bdd362198bcbeb52c4e7dfe7b24cc80, BUILD_INFO.commit_sha3e098cd51cd2fd84f21e144a600a814a2cb1a150.
- Actual generated AndroidManifest SHA256ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480 identical OWN/POST/historical542. SDKmin24/target36/INTERNETdeclared/no explicitusesCleartextTraffic/networkSecurityConfig attributes, no manifest/security/permission edit. This read-only AXML/static fact does NOT prove native localHTTP transport, permission denial, SecureStore, UI, physical or provider behavior.

### Current parser and browser evidence, own and post distinct
Actual HTTP/Postgres JSON passed through CURRENT mobile loadWorkPassport/Agenda/Earnings OWN10:55:08.6408598Z/POST11:10:25.3588245Z and currentSafety OWN10:55:09.3092651Z/POST11:10:26.0843801Z. Old static fixture phrase 'unchanged mobile' is NOT a claim the3patched validators are unchanged. No impossible calendar date was inserted in PostgreSQL; negative cases are adversarial JSON on real client helpers.

Actual OWN Chrome155.0.8059.39 observed10:55:46.7447225Z; POSTsameversion/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed11:11:14.0986888Z. OWN503/recoveryPASS10:55:48.8107225Z/8journeysPASS10:55:49.4565208Z; POST503/recoveryPASS11:11:17.9740271Z/8journeysPASS11:11:18.6961252Z. Each actualONEteamsGET503consumed+11distinctotherGET200, unknown/loading/— rather than false0, explicit humanrefresh12NEWGET200/team1/zeroextraPOSTfromSEND. Actuallogin401+empty/team/job12345centsdates/persistence/render/newcompleteDOCUMENTreload/logoutPOST201(notOPTIONS204)/browserbearerGETme401+otherSAMEidentitysession200/Bisolated. No security/deadline/browser/Fetchguard/CORS/LNA changes; these successes DO NOT resolve prior intermittent transport root or make other drafts green.

10OWN/POST567WebPNGs primarylogs + scratchpassport-safety-calendar-local/567-{own,post}-captures.json independently PNGsignature/SHA/bytes/1365x900/PillowverifyPASS; partial/recovered visually inspected for both. Not yet Git567frames; NEXT FUNCTIONAL cycle persist full own provenance, neverimage-onlycommit. They are NOT Androidframes.

```json
[
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "login",
    "sha256": "75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc",
    "bytes": 33686,
    "width": 1365,
    "height": 900
  },
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "company-a-created",
    "sha256": "7d510a5e85e0b0387ab575e4d337a12554872932b4692a5bad456269378610e9",
    "bytes": 132876,
    "width": 1365,
    "height": 900
  },
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "company-a-team-read-unavailable",
    "sha256": "eeb850e0cf0cd88366c81727fa7cd0620c34f25533f2de38229e1e102f754b56",
    "bytes": 141835,
    "width": 1365,
    "height": 900
  },
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "company-a-team-read-recovered",
    "sha256": "4facf06a2381b3745fbf2dcb6887629b2760cd715ecc4d52019dde99aa93ce44",
    "bytes": 133137,
    "width": 1365,
    "height": 900
  },
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "company-b-isolated",
    "sha256": "7b7ac786d2d2d7e319aad42bd6b15e48a6b7edcda577c03ff3a4b72f54fc0ee3",
    "bytes": 132014,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "login",
    "sha256": "75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc",
    "bytes": 33686,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "company-a-created",
    "sha256": "786a1a917728faf3d59537dc415716a279f27de7179c99b483da84d6bf71a42d",
    "bytes": 133199,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "company-a-team-read-unavailable",
    "sha256": "4c05317f8c40646589d271cf2be246ecb0aadf51ee65018e362c591e8bfac265",
    "bytes": 142259,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "company-a-team-read-recovered",
    "sha256": "e77cbc1d424a689ef92590bed68fe659783d8fac69c18172ee42679793321108",
    "bytes": 133501,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "company-b-isolated",
    "sha256": "26bdabb3cfef15ee8bb44d6890bd8e3c6747f61d56d888238dfc6588ebd72801",
    "bytes": 131919,
    "width": 1365,
    "height": 900
  }
]
```

### Review, history and limits
24paths remoteUTF8/base64normalizedexact, allmodes100644;1147otherpriorblobsidentical,490of493mainnon-docsoutside3datevalidatorsidentical, whole-source reverse-substitution/datepredicatebyte-identicalAgenda. FULL original5docs+matrix main+565preparation prefixes preserved IN PLACE by appendix; sourceREADME untouched. Localnew12RED2PASS10FAIL→12GREEN, old29+new12=41GREEN (original41=31PASS10FAIL), full765mobile+SaoPaulotimezone41PASS; no models borrowed as Androidproof. Request/ACK/body/tenant/auth/current/roles/status/created-existing/unknown/no-retry/order/JSX/API/SQL/RLS/events/deps/lock/build/workflow unchanged. Mobile source changed, so APK REQUIRED and now OWN+POST actually measured.

Git main567 consolidates565FINALFAIL receipts+full565preparation and5olderOWN564PNGs/manifest by identicalblobs, plus5OWN565FAILWebframes/PR565_AA0_CALENDAR_CYCLE_PROVENANCE.json. These are historical sources, not567/nativeframes. Current567Gitappendices PREPARATION/PENDING are HISTORY, not current status; consolidate this567FINAL OWN+POST only NEXT FUNCTIONAL cycle, no metadata/self-reference/activity commit. No original document replaced with summary.

PostWatch38891514341/job116941872899SUCCESSPUSH marker11:05:51.9356391Z3eage0/openPR3/active2. Issue566 actualbotclosed11:05:53Z/comment6214133831created11:05:52Z references3e; both event/comment read. No manualissuewrite or activitycommit.

Onlyarea10 Androidstandalone TECHNICAL INTERNAL accepted; other12 pending. No full nativeUI/forms/keyboard/SecureStore/physical/VisualTruth/pilot/provider/PSP/production/realmoney acceptance. 558879/560e47/565aa0 remain separateDRAFTFAIL; no reruns/merges. Existing routine remainsenabled/scheduleunchanged. Next local-only chat/support impossible-date candidates are not published/currentmain fixes and not part765tests; source-grounded freshcontract review and ownCI/APK/post required before any future integration.

---
Historical preparation and previous in-flight receipt preserved below; all PENDING / candidate states superseded by FINAL above.

## MERGED / POST-CI SUCCESS / POST-APK PENDING — 2026-10-16 UTC

#567 already merged ONCE with expectedHEAD3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d; no repeat ready/merge/rerun. MAIN3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c/orderedparents[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d], verified afteractualmerge.

POSTCI38891514441attempt2/job116942544994 COMPLETE SUCCESS1355=[145Web,765mobile,431API,3CLI,11monitor]tests=pass/fail-skip-cancel0/ALL18steps/ProductionTruth11:12:31.5379596Z. LITERALcheckout3e098... primary11:07:57.3077219Z. Attempt1/job116941873608 failed ECRpostgres17 toomanyrequests/Data limit exceeded11:05:49Z..58Z BEFOREcheckout/allproductSKIPPED. ExactlyONEspecificfailed-completedjobretrySAMESHA resolvedinfra; no retry of product failure/running/successjob.

Actual POST HTTPPG→currentmobilePassport/Agenda/Earnings PASS11:10:25.3588245Z and currentSafetyPASS11:10:26.0843801Z. ActualChrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed11:11:14.0986888Z; ONEteamsGET503CONSUMED+11otherdistinctGET200/HUMANrefresh12newGET200/team1/zeroextraPOSTfromSEND PASS11:11:17.9740271Z; ALL8journeysPASS11:11:18.6961252Z including actuallogoutPOST201/browserbearerGETme401+otherSAMEidentitysession200/Bisolated, newcompleteDOCUMENTreload. Prior intermittenttransportroot NOT explained/fixed, otherdrafts not green by borrowing.

POSTAPK38891514299/job116941872137 stillBUILDING at last query; NOTPASS, no actualpostAPKdigest/installation/DEVICE_SMOKE_OK yet. Must followactualmerge, notborrow OWNgreen. PostWatch38891514341/job116941872899SUCCESSPUSH marker11:05:51.9356391Z3eage0/openPR3/active2; actual566closed11:05:53Zbygithub-actions[bot], comment6214133831at11:05:52Zreferences3e/newcommittime11:05:49.206Z. No manualissuewrites/activitycommit.

5OWN+5POST567Webframes independentlysignature/SHA/bytes1365x900/PillowverifyPASS, partial/recoveredvisuallyinspectedbothruns; currentframesnotyetGitassets. ScopeWebdesktop NOTnativeUI/SecureStore/physical/VisualTruth. Sourcehead3a66/owntree+synthetic42ffc/ownCI38890073248job116937140753SUCCESS versus literalpost3e/CI38891514441attempt2job116942544994SUCCESS. PreservewithownprovenancenextFUNCTIONALcycleonly,noimage-onlycommit. GitdocsPREPARATION/PENDINGhistorypreserved; final567OWN+POSTconsolidationnextFUNCTIONALonly.

---

Historical OWN final/preparation below, pending/mergecandidate statements are superseded above.

## OWN CI + APK COMPLETE SUCCESS — merge candidate — 2026-10-16 UTC

Exact HEAD3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. OWN CI38890073248/job116937140753attempt1SUCCESS1355tests/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth10:56:54.0120522Z. OWN APK38890073257/job116937140654attempt1SUCCESS, ZERO retries: build11:02:52.4400673Z/installSuccess11:04:16.5659481Z/DEVICE_SMOKE_OK11:04:29.1353446Z withoutMetro; original smoke/fatal gates unchanged. Failure-only diagnostics correctly SKIPPED on success, not UI evidence.

Downloaded OWN artifact12041947330/28912130ZIPbytes/expires2026-10-30. ZIP SHA256f9efbb72eac87e9261da626cd0380daff6ceecf178670bc15789088b7a7eafeb. Actual individual APK66161616bytes/SHA2561b2c0ce67f33b77494b8f929c22a19764a3e7c7f11b6d56b6501e8f43c73616b matches SHA256SUMS; BUILD_INFO.commit_sha42ffc6a2a3536ff8c74bf732748210dce3f1b261/metrofalse/release/packagefixed. Both OWN checkout SYNTHETIC42ffc6a2a3536ff8c74bf732748210dce3f1b261 parents[f98,3a66]tree66f89c equalcandidate, NOTliteralHEAD (nativeprimary10:52:31.8761370Z).

Read-only generated AndroidManifest SHA256ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480 byte-identical historical542actualmanifest; SDKmin24/target36/INTERNETdeclared/no explicitusesCleartextTraffic/networkSecurityConfigattributes. Static manifest is NOT actual localHTTP transport/permission denial/UI/SecureStore proof. No change to permissions or security. Historical542 APK individual SHA52b5e5361d88df31f30aca27aa06510886536c140dbc267b2181e60d2d3cf491 was separately downloaded/verified, NOTborrowed for this candidate.

Fullreview24paths/remotebytes/modes100644/6originalFULLprefixmain+565+appendpreserved;1147otherpriorblobsidentical/490of493mainnon-docblobsoutside3validatorsidentical; existingAPK92protectedroot/packages/build/workflow/nativeinputsidentical (APKstillrequiredbecausemobilechanged). Whole-source reverse-substitution/datepredicatesexactAgenda; local765/765 and41focal/SaoPaulotimezonePASS; originalfocal31PASS10FAIL. Freshmainf98/head3a66/basef98/mergeableclean+both completedcheckrunsSUCCESS verified before ready. Integration only at expectedSHA; actualpostCI+postAPK mandatory after merge, NOT yet observed here. No whole-area acceptance.

---

Historical preparation / ownCI detail below; pending APK statements superseded above.

## OWN CI SUCCESS — APK PENDING — 2026-10-16 UTC

HEAD3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c remainsDRAFT/NOTMERGED. OWN CI38890073248/job116937140753attempt1COMPLETE SUCCESS, ZEROretry, ALL18stepsSUCCESS;1355=[145Web,765mobile,431API,3CLI,11monitor]tests=pass/fail-skip-cancel0; typecheck/build/export/migrationrunner2x/privacy/HTTPPG/ProductionTruth10:56:54.0120522Z. Checkout42ffc6a2a3536ff8c74bf732748210dce3f1b261 SYNTHETIC orderedparents[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]tree66f89c equivalent, NOTliteralHEAD; primary10:52:44.6058416Z.

Actual HTTP/Postgres→CURRENT mobile loadWorkPassport/Agenda/Earnings PASS10:55:08.6408598Z and CURRENT loadSafety PASS10:55:09.3092651Z. Static old fixture wording 'unchanged mobile' is not a claim that the3 newly patched validators are unchanged; actual loaders use this checkout. Valid server dates preserved, not a PostgreSQL impossible-date storage test.

ActualChrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed10:55:46.7447225Z; ONEteamsGET503CONSUMED+11otherdistinctrealGET200/unknownloading/—/HUMANrefresh12NEWGET200/team1/zeroextraPOSTfromSEND PASS10:55:48.8107225Z.8journeychecksPASS10:55:49.4565208Z login401/empty/team+jobpersist12345centsdates/render/newcompletedocumentreload/logoutACTUALPOST201/notOPTIONS204/revokedbrowserbearerGETme401+otherSAMEidentitysession200/Bisolated. Original UI/driver/security/deadlines unchanged. This does NOT resolve historical intermittent aborts or make558/560/565green.

OWN APK38890073257/job116937140654 stillBUILDING at last query; no final native PASS or merge. Mobile source changed: native APK mandatory, notN/A/borrowed542/565; no ready/merge until own exact completedSUCCESS. Then actual postCI+postAPK mandatory.

5OWN567WebPNG primarylog116937140753/scratchpassport-safety-calendar-local/567-own-captures.json independentlydecoded signature/SHA/bytes/1365x900/PillowverifyPASS; partial/recoveredvisuallyinspected. NOTnative/currentAPKframes. NotyetGitown567assets; persistownprovenanceonlynextFUNCTIONALcycle, notimage-onlycommit.

---

Historical preparation and completed review below; earlier pending CI statement is superseded above.

## DRAFT — exact own CI / APK pending

HEAD 3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, basef98b5f618c5b78772c360b93d17e6028f0021008. Reject impossible calendar days in existing real mobile Passport/Safety read and confirmation parsers. New12 regressions: baseline2PASS10FAIL, candidate12/12; with29 unchanged focused tests41/41PASS, no skipped/cancelled. These are Node24 real helper/transport fixtures, not Android render/physical/production exploit.

Only3 date validators changed; whole-source reverse-substitution preserves every request/path/payload/tenant/permission/status/created-existing/unknown/no-retry/current guard/ordering/stat. Actual leapday/offset/epoch0/null optional/missing-profile preserved. Same calendar predicate already used by main Agenda. No API/SQL/RLS/roles/events/workflow/build/deps/lock/JSX/layout changes. Native APK IS required because mobile source changed; do not borrow542/565. Own exact HEAD CI+APK GREEN and actual post-merge CI+APK mandatory before claiming integration.

24 paths:4 code/test,6 append-only originaldocs/matrix, new evidence,7 unchanged historical565 doc/564 PNG+manifest blobs,5 OWN565 FAIL desktop PNGs+manifest. FULL main originals +565 preparation text preserved in-place; final565 ownCI1353FAIL/browserabort and ownAPKFAIL/offline-isolation truthfully consolidated. Those images are NOT current parser candidate/native frames.

#565/#558/#560 stay separate drafts; no reruns or merge. AOSP Tradefed Ethernet command source explicitly assumes adb root; no root/permissions/isolation assertion weakening applied. Onlyarea10 technicalinternal accepted,12pending; no nativeUI/SecureStore/VisualTruth/auth-success/production/PSP/money acceptance. CI/APK here pending NOTPASS; keepDRAFT until own observed outcomes and fullreview.

## Review / local full suite completed (not own CI/APK result)
765/765 mobile tests PASS locally, fail/skip/cancel0, against all153 fresh main mobile input files plus the4 reviewed candidate changes. Same 41 focused tests on exact original3modules produce31PASS10FAIL; candidate41/41.24 remote files all UTF8/base64-normalized exact; allmodes100644; all6 main/565 full prefixes+expected append exact.490of493 existing main non-doc blobs outside3validators unchanged. Candidateparentf98/tree66f89c verified; ahead1behind0. Original565 assets7 retain same blobs/modes; new5desktop565 frames independentlysignature/SHA/bytes1365x900/Pillowverify and recovered/failure visual inspectionPASS with own565FAILprovenance, notthiscandidate/nativeproof.

OwnCI38890073248/job116937140753 and ownAPK38890073257/job116937140654 still executing at last review. No queued/running step is PASS. No merge/rerun while pending.
