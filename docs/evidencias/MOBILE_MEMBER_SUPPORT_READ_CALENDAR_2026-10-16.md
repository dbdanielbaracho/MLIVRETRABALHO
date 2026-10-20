# Calendário de gestão, suporte e substituições — evidência funcional

---

## Ciclo funcional PR #568 — calendário de membros, suporte e substituições — 2026-10-16

Escopo exclusivo MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150; predecessor e2b3b3999dc40c380e60e567d34d612193aa7610 DRAFT/NOTMERGED, próprio CI FAILURE/APK SUCCESS. Novo trabalho funcional, não rerun cego do predecessor. Todos os bytes anteriores dos cinco originais e matriz mantidos como prefixos integrais NO LUGAR.

### Falha reproduzida, correção mínima e regressões
Os módulos reais professional-support.ts, company-members.ts e company-replacements.ts aceitavam datas impossíveis de fevereiro/abril pois Date as normalizava. Leitores retornavam ready; generateInvitation retornava created para ACK com expiresAt impossível. A API usa timestamps PG/now()+7days e valida autoridade; não se alega dado impossível gravado no PG, exploração/incidente de produção ou falha de ACL.

29 regressões novas em member-support-calendar.test.mjs: baseline2PASS27FAIL; após correção29PASS. Cobrem três datas inválidas × nove campos/ações: suportecreatedAt inclusive registro de outra seleção, membroscreatedAt/deactivatedAt, convitesexpiresAt/acceptedAt/revokedAt, ACKexpiresAt após uma chamada com path/body intactos, assignmentstartsAt/endsAt mantendo outra seção independente pronta. Controles positivos validam leapday/offset cruzando UTC/epoch0/pre1970, ordem e strings exatas, datas opcionais ausentes/nulas e vazio real. Vinte e seis controles antigos intactos +29novos =55PASS inclusive TZAmerica/Sao_Paulo; fullmobile825PASS/0fail/skip/cancel local (796anteriores+29). Unidade/helper ≠ Android render.

Mudança somente nos predicados dos três módulos, copiando a função calendário da Agenda BYTE-IDÊNTICA e mantendo wrapper opcional em substituições. Reversão mecânica restitui integralmente source anterior fora dos predicados/condições. Requests/headers/body/UUID/identidade/tenant/roles/current/deadline/no-autoretry/ACKsemantics/nullassignment/filtros/ordem/ações/JSX/API/SQL/RLS/deps/lock/build/workflow/smoke preservados.

### Nova jornada de cliente REAL/API/PG — PENDENTE nesta preparação
Novo scripts/mobile-member-read-http-e2e.cjs carrega fontes móveis atuais por NativeTSstrip e executará fetch REAL somente contra localhostAPI/CI+DB exato via guarda existente. Reusa empresas/profissional/outsider/assignments descartáveis criados HTTP no fixture Safety. Fluxo owner: ler membros e convites, criar UM convite manager com generateInvitation, ler expiresAt/acceptedAt/revokedAt reais, witness PG vincula tenant/id/email/role/invited_by/expiry/tokenhash sem logar código, revogar explicitamente pelo helper, ler data revogada e witness novamente. Nenhuma aceitação ou nova membership é criada.

Leitura de suporte pelo profissional já autorizado valida seleção assignment e nullassignment geral EXISTENTE via dois GETs, com IDs/fatos comparados ao PG. Leitura de substituições usa GETs reais de assignment+requests, valida horários PG e isolamento da outra empresa, sem criar/substituir alocação. Leitura gestão como profissional deve receber2HTTP403; outsider/ownerdaoutraempresa4HTTP401. Totais requeridos16GET+2POST(create/revoke), sem retry de negócio/POST implícito. Prova não é Android/teclado/SecureStore/provider.

Invocação nova APÓS todos os asserts e markers antigos da Safety/SupportClientlostACK, antes do finally; todo conteúdo anterior retido byte a byte. Novos snapshots guardam cinco tabelas antigas, memberships/assignments de dois tenants e somente uma nova invitation revogada; todos registros anteriores intactos, RLS/policies/ACL sem alterações. Novas consultas PG são APENAS leitura, sem DDL/DML direto/seed de papel/grants/histórico apagado. Marker MOBILE_MEMBER_SUPPORT_READ_HTTP_PG_PASS somente após os asserts. Todos gates HTTP/navegador/laterSupportJSON/CORS/Fetchguard/sandbox/LNA/deadlines continuam, não mover/remover para verde.

### Gates próprios e aceite
CI novo esperado1415=[145Web,825mobile,431API,3CLI,11monitor], APK próprio OBRIGATÓRIO porque mobile mudou, ambos ainda PENDENTES nesta preparação. Merge somente justificado com própriosgreen exatos/fresh review/expectedSHA, seguido de CI/APK pós no merge REAL. Nenhum PASS do predecessor emprestado. Somente área10 técnica interna aceita; outras12pendentes. Externos215/219/220/224/228separados; sem produção/providers/PSP/custos/serviços/dinheiro real. Native565isolation e Chrome558root permanecem sem solução comprovada, sem reduzir proteções.

### Recibo integral predecessor E2b, consolidado neste ciclo funcional
Os cinco PNGs pr568-e2b-* pertencem ao run38927529956attempt1/job117062786588FAIL/checkout618d119f12c07c7a16a475ba1ecb6ac8fe31ce42 SINTÉTICO[main3e,e2b]/treee444, NÃO são frames do novo HEAD nem Android. Manifest de origem próprio. O texto integral abaixo foi relido do recibo final do PR568: CI FAILURE/APK SUCCESS e limites permanecem. Preparações PENDING antigas são história, não estado deste novo candidato.

## FINAL OWN CI FAILURE / OWN APK SUCCESS — DRAFT / NOTMERGED — 2026-10-16 UTC

Current HEAD `e2b3b3999dc40c380e60e567d34d612193aa7610`, tree `e444dd019eabc29fa6198642b5b6d120d63a3b77`, ordered parent `368aa313a2aa55ad269060bdde12b19cb7bd1465`. Main remains `3e098cd51cd2fd84f21e144a600a814a2cb1a150` / tree66f89c3ef2902dad6d1d59e0210be7229c3a857c / orderedparents[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. No ready/merge/post568/retry/cancel. General CI is FAILURE, never label it green or borrow prior567/368 results.

### Own CI: FAILURE, all1386unitsPASS
[38927529956/job117062786588](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38927529956/job/117062786588), attempt1 COMPLETE FAILURE, ZEROretry.1386=[145Web,796mobile,431API,3CLI,11monitor]PASS/fail-skip-cancel0. Types/build/mobileexport/migrationrunner2x/privacyPASS; HTTP/browserFAIL, PostSetupNodeSKIPPED/laterProductionTruthNOTexecuted.

### New actual independent client/API/Postgres results
- MOBILE_WINDOW_AVAILABILITY_REAL_JSON_PASS15:55:38.5979929Z and MOBILE_WINDOW_PUBLICATION_REAL_JSON_PASS15:55:38.7165788Z consume actual earlier HTTP ACK JSON with independently existing request payloads; CURRENTrealhelpers acceptvalidresponses, ZEROadditionalHTTPPOSTs by these consumers. NativeTSstrip/fixturecallback, not nativeUI or actualhelper-network proof.
- MOBILE_CHAT_REAL_JSON_PASS15:55:44.6768358Z from actual oldHTTPmessagePOSTACK+GETlist through currentloadMessages/sendMessage, also ZEROadditionalHTTPPOSTs.
- **MOBILE_SUPPORT_CLIENT_HTTP_PG_PASS15:55:53.2922134Z** is different: actualCURRENT SupportSubmission/SupportIntent modules execute REALfetch against guarded disposablelocalhostAPI and actualPG. NormalcaseCONFIRMED, restored in newstoreobject, confirmedbarrier preventsnewcasePOST, explicitlocalrelease. A SECONDnewintent gets actualPOST201 and validACK, fixture locally drops that response ONCE; appreturnsUNKNOWN and retainsPENDING. ReadonlyPGwitness proves rowCOMMITTED BEFORE separate explicitretry. Restart/inspect/sendNew/release makeNOimplicitcasePOST. ONEexplicitpendingretry uses samekey/body and returns samecaseACK, then explicitlocalrelease. Actual totals2preparationPOSTs/3casePOSTs/2rows, not productionbusinessautoretry.
- Cases d02e9776-9a14-4a2b-a358-9400c9d30a2c and9a75046f-3d0a-4ccd-b32d-113e4887bf5b. PGDateobjects/currentdatabaseexactmlivretrabalho_http/actualclientsocket::1; identity/tenant/assignment/key/payload/statusbinding. Fiveexistingfixturetableoldrows unchanged, ACL/policiesunchanged, outsider401. No newSQLDML/DDL/grants/RLSdisable/events/historydeletion. Serializationadapter **INMEMORY**, objectrestart only, NOTdisk/SecureStore/nativeAndroidprocess/UI/keyboard/physical/providerproof.
- All original SAFETY_CHRONOLOGY assertions pass15:55:53.2207436Z before newcases; original3actualHTTPorders +currentSafetyrealJSONloader preserved. PROFESSIONAL_CHRONOLOGY_PASS15:55:52.5515482Z.
- OLD later **MOBILE_SUPPORT_REAL_JSON_PASS NOTEXECUTED**: its separate existing HTTPfixture is after the failedbrowser. Newactualclientcase is not backfilled or borrowedPASS for that older gate.

### Browser: real partial success followed by B failure
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 actual15:56:29.5720964Z.
WEB_SECTION_AVAILABILITY_BROWSER_PASS15:56:31.6218087Z: actualONEteamsGET503 consumed +11otherDISTINCTrealGET200, unknownloading/—, humanrefresh12NEWGET200/team1, ZEROextraPOSTfromSEND. ActualAteam/jobACK201/persist/pay12345cents/dates/render passed. Anewcompletedocumentreload and actualsignoutPOST201 occurred beforeB by primaryresponses and unchanged sequentialdrivercontrolflow.
FAIL15:56:51.7439035Z loaded-dashboard after Bsignin201: **B12GETnetERR_ABORTED/canceledTRUE/corsErrorNULL**, UI B12unavailable/counts/rates—, NOTfalsezero. FinalB isolation assertions and actualrevoked-browserGETme401/otherSAMEidentitysession200 are AFTERthisfailedgate and NOTEXECUTED. No full8journeyPASS. Notstartup/ECR/newpermissiondenial, rootoldintermittentabortsUNRESOLVED, noAPI/CORS/Chrome/vendorcauseproved. No browserflags/image/security/Fetchguard/CORS/sandbox/LNA/deadlinechange.

FiveOWNdesktopPNGs in primarylog117062786588 / window-ack-calendar-local/568-e2b-own-web-captures.json independentlydecodedPNGsignature/SHA256/bytes1365x900/PillowverifyPASS; recovered+failurevisuallyinspected. NOTnativeframes, NOTyetGitcurrentframes; preserveownsourcehead/checkout/tree/run/attempt/job/result in NEXTFUNCTIONALcycle only, noimage-onlycommit:
- login SHA25675fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc / 33686bytes
- company-a-created SHA256b2a1809d42ac13150d6db2029578494ca3f4466df85d34ab6e12fbe5a2abe14c / 133056bytes
- company-a-team-read-unavailable SHA25678f5b3465d386266a94de437d8e584592742b2f443bd13dfb059a38e01293290 / 142042bytes
- company-a-team-read-recovered SHA256be322e4f7610e6803fa0c47462d7fd386f8f85e14f5405084fb7a1f5f285bbda / 133314bytes
- failure SHA25689ab057dfd60cb28f86a33d2deb2e38d886e733c1515e0815712bf9302ee3f3d / 133827bytes

### Checkout truth / review
CIprimary15:53:27.2299841Z checkout `618d119f12c07c7a16a475ba1ecb6ac8fe31ce42` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`e2b3b3999dc40c380e60e567d34d612193aa7610`] / treee444dd019eabc29fa6198642b5b6d120d63a3b77 equivalentcandidate, NOTliteralHEAD; Gitcommit/tree/parents re-read.

WholePR35paths / ALL35remoteUTF8orbase64-whitespace-normalizedbyteexact:17newcyclepaths checkedagainstpreparedbytes,18priorpaths readbackunchanged. Modes100755twoHTTPshells100644rest.1176otherpredecessorblobsSHA/modeunchanged.486of493existingmainnon-docblobs outside4validators+3HTTP/fixture scriptsidentical. APIcontrollers/SQL/RLS/auth/roles/membership/events/allJSX/React19.1.4/RN0.81.6/deps/lock/native/workflows/build/smoke unchanged;89selectedprotectedinputs verifiedsame. Appmobilechanged soAPK N/A is FALSE. Nativecanonicalworkflowandoldsmoke retained,565draftgate neitheradoptednorremoved. Ahead2behind0/mergebase3e. FullmainAND368prefix5originaldocs+matrixpreservedINPLACE, whole368FINALreceipt consolidated. Prior368twoFAILdesktopPNGs+manifest nowGitwithownexactprovenance; allolder567assets sameblobs/modes, nonecurrente2b/native.

14NEWACKwindowregressions actualbaseline2PASS12FAIL;17old+14new RED19PASS12FAIL→GREEN31/31, TZAmerica/Sao_Paulo31PASS; full796local+CI. OnlyACKcalendarpredicateschange in availability-submit/company-job-publication, existingAgenda predicate copied; allsourceoutsideACKguards reversibleexactto368. Inputprevalidation/payload/headers/path/identity/tenant/current/UUID/retrypolicy unchanged. Prior17chat/supportregressions+predicates unchanged. NoimpossiblePGstoredrow/productionincident/exploitclaim.

### Acceptance and next safe work
Onlyarea10Androidstandalone TECHNICALINTERNAL accepted, other12pending; unitcounts/desktop/APIJSON/DEVICE_SMOKE_OK do not acceptnativeUIor13areas. Externals215/219/220/224/228OPENseparate. No production/newservices/costs/providers/PSP/credentials/contracts/realmoney. Other558/560/565remainDRAFTFAILseparate. No productrerunmerelyforgreen/no blindrerune2b/no metadata-onlyselfreference/activitycommit.

LOCALnextaudit only, NOTpublished/notpart796: currentprofessional-support,company-members,company-replacements realhelpers accept3impossiblecalendarstrings asREADY/invitationACKCREATED. window-ack-calendar-local/next-audit/remaining-calendar.test.mjs14tests baseline2PASS12FAIL (validleapday+epochcontrolsPASS), noappfix/CI/HTTP/Android/PGinvaliddataproof. Needs freshcontracts+optionaldate/role/tenantcontrols+actualAPIfixturebeforeminimalfix, notallparsersfixed. CurrentcompanymembersAPIowner-only and PGgeneratedexpiry remain authoritative; noauthorityexpansion/imaginaryAPIbug. Native565Ethernet strictguard remains unresolved; no unsupportednetworkcmd/root/grant/firewall/deadline/securitychange.

### Own standalone APK: SUCCESS, scoped install/launch proof
[38927530012/job117062788313](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38927530012/job/117062788313), attempt1 COMPLETE SUCCESS, ZEROretry. CanonicalbuildSUCCESS16:04:17.7448487Z / installationSuccess16:05:45.4238736Z / DEVICE_SMOKE_OK16:05:57.8290012Z metro_required=false, API35/x86_64/pixel6. Mainworkflow/build/oldsmoke unchanged; failure-onlydiagnosticsteps normalSKIPPED. NOT565offlineguard/forms/taps/keyboard/nativeauthsuccess/SecureStore/physical/VisualTruth evidence.
APKprimarycheckout15:53:14.5157558Z sameSYNTHETIC618d119f12c07c7a16a475ba1ecb6ac8fe31ce42 parents[3e,e2b]treee444, NOTliteralHEAD.

Artifact12058331243/notexpired/expiry2026-10-30T16:05:59Z actuallydownloadedthroughGitHubartifacttool and inspected:
- ZIP28912196bytes SHA25616803b5265c6bd42f66694bd4ef94fc7d87434c8f9bdf55986b0290b565fc4b5 matchesGitHubAPIdigest.
- IndividualAPK66161688bytes SHA25662996c3d76af8a2f91a3662e3c09b57be83bca9d9a15d922f7d5737ffcb69333 matchesSHA256SUMS.
- BUILD_INFO exactcheckout618d119f12c07c7a16a475ba1ecb6ac8fe31ce42/release/packagecom.predibeacon.mlivretrabalho.pilot/metrofalse.
- StaticgeneratedmanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480, same567/368/minSDK24target36/INTERNET/noexplicitusesCleartextTrafficorNetworkSecurityConfig; STATIC metadata only, NOT actualHTTPtransport/securitypermission/nativeUIproof. ZIPdigest is NOTindividualAPKindigest.
LatestvalidatedMAINAPK remains567POST3e; this is candidatee2b ownAPK, no568merge/post exists.

### Fresh monitoring / records
ActivityWatch38913325312/job117014361308SUCCESS schedulemarker14:08:20.1879949Z main3e/age182/openPR4/active0. #569OPEN botcreated14:08:20Z, monitor of commits not proof agentstopped. No manualissuewrites/activitycommit. Main3e and568DRAFT exacthead reconfirmed; otherdrafts558879/560e47/565aa0+external215219220224228remainopen. Keep existingroutineonlyenabled/scheduleunchanged,13taskNOTcomplete. Gitdocs preparationPENDING is historical, thisFINALreceipt is authoritativefornewownresults; consolidateFINALe2b in5docs/matrixONLYnextFUNCTIONALcycle, noautorefmetadata/image-onlycommit.

---

## HISTORICAL preparation and predecessor368 receipt — not results of currente2b
## CURRENT functional candidate — 2026-10-16 UTC
HEAD e2b3b3999dc40c380e60e567d34d612193aa7610 / tree e444dd019eabc29fa6198642b5b6d120d63a3b77 / ordered parent 368aa313a2aa55ad269060bdde12b19cb7bd1465. Same PR568, DRAFT/NOTMERGED. Main 3e098cd51cd2fd84f21e144a600a814a2cb1a150 unchanged. Own NEW CI and APK PENDING, not PASS. No ready/merge/post/retry/cancel.

14 new regressions reproduce normalized impossible startsAt/endsAt ACKs of a valid request (new2PASS12FAIL; old17+new14 RED19PASS12FAIL -> GREEN31/31). Full mobile796PASS locally, no fail/skip/cancel; expected aggregate1386, not yet CI. Minimal ACK date guards only in availability-submit and company-job-publication; request/input policy unchanged.

NEW independent real SupportSubmission/SupportIntent client HTTP cases after all original safety-chronology assertions: normal confirmation and defined local loss after actual HTTP201, PostgreSQL witness BEFORE explicit retry, pending recovery with no implicit POST, explicit same-key replay, local release. Adapter in memory, not SecureStore/disk/Android UI. Two prepPOSTs/three casePOSTs/two rows required; no business autoretry. New window ACK consumer gates use actual prior HTTP JSON with independent requestpayloads, no new POSTs. Existing browser and later support JSON gate remain required, unchanged; no deadline/security/Fetchguard/CORS/sandbox/LNA/workflow/build/smoke change.

17 functional-cycle paths:2ACK modules+14testfile+4scripts+5originaldocs+matrix+new evidence+2prior368desktopPNGs+manifest. Full predecessor/main document prefixes preserved in place. Prior368CI FAILURE/APK SUCCESS consolidated whole, no PASS borrowed. NativeAPK required (mobile changed); own/post exactcheckout to be verified. Only area10 technical internal accepted, other12pending. Externals open/separate. Final receipts below are historical predecessor368, not results of this new HEAD.

---

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


