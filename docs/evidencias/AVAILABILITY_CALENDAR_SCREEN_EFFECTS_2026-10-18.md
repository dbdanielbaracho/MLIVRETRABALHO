# Availability calendar ACK — actual screen effects, 2026-10-18

## 2026-10-18 — PR568: efeito de calendário no ACK da tela real de disponibilidade (PREPARAÇÃO FUNCIONAL)

Fontes revalidadas: MAIN a68392c3bf8d82238f442ec6b68c023aefd751f6/tree0b7eb07dbd6353eed75be80b6acd248de1dc247c; PR568 DRAFT HEAD b7ef867464a3a529ec6e4f5518987143078f9d7e/tree178be320b8e42e2ae9d0aa8d045b7b53802ba9f9. Integração normal de MAIN no PR568 EXISTENTE, pais ordenados [b7ef,A683], sem force/PR duplicada/rerun do SHA antigo. PR576/578/579 já MERGED, não repetir. MAIN579POSTCI39118128290 e APK39118128289 SUCCESS; standalone técnico atual A683, nenhum aceite integral adicional.

Requisito área3: disponibilidade só confirma salvo e apaga formulário depois de ACK verificável, preserva rascunho perante resposta incompatível/incerta. Novo apps/mobile/tests/availability-calendar-screen.test.mjs executa o save pré-JSX REAL de apps/mobile/app/disponibilidade.tsx SHA b4eb4736896148baec684b1b4ea6a5009919696e, com submitAvailability REAL e availabilityWindow REAL. Hooks/auth/network/JSON/timers explícitos, NÃO renderRN/SecureStore/HTTPPG/aparelho físico/produção.
12 novos casos: baseline MAIN 5PASS7FAIL -> helper568 já publicado 12GREEN, 12GREEN também TZ America/Sao_Paulo. Seis negativos individualizam startsAt/endsAt em 2027-02-30,2027-04-31,2026-11-31, que Date normalizava para janelas válidas FUTURAS 02/03/2027,01/05/2027,01/12/2026 e indevidamente apagava o rascunho/afirmava salvo. Três positivos aceitam as janelas canônicas legítimas. Um conserva retry MANUAL EXPLÍCITO do mesmo payload após unknown, sem POST automático; dois conservam owner/deadline perante ACK tardio incompatível. API retorna timestamps PG e possui ON CONFLICT(professional_id,starts_at,ends_at) já existente; não alegamos timestamp impossível real PG, exploit, nova idempotência/barreira durável/cancelamento servidor.

Produto NÃO ganha novo parser nem alteração de tela. Reutiliza BYTEEXATOS os sete helpers JÁ PUBLICADOS568 (availability-submit/company-job-publication/company-members/company-replacements/conversation/professional-support/support-intent), cinco arquivos/60testes568 e seis scripts/gates existentes568. Apps Disponibilidade/Membros579/Privacy578/Notifications576/Conversa MAIN e 12 controles antigos availability-screen-deadline BYTEINTACTOS. Preserva auth/tenant/UUID/payload/ACK/rejected/unknown/15s/manualretry/current/foco/JSX/styles/fila/session/API/SQL/RLS/ACL/migrações/React19.1.4/RN0.81.6/deps/lock/workflows/build/smoke. Não copia 574privacy,581Conversa,575DB,573ledger,571fixture,558instrumentação ou572registry.
LOCAL 84focal=[12new+12oldavailabilitydeadline+60old568] PASS, também TZ SaoPaulo; 96focalmaisoutrocalendar preexistente PASS; FULLmobile961PASS=[889main+60old568+12new], fail/skip/cancel0/Node24.19.0. Comparação local 162 existing/reused mobileblobs BYTEEXATOS; tsconfig local adaptado é EXCLUÍDO da publicação. Primeira instalação local removeu whitespace final em três helpers; corrigido antes publicação, hashes de todos12sources/testsold568 exatos. Sem assert antiga alterada. Todos scripts/gates568 são os blobs antigos, MAIN nesses paths era igual ao mergebase3e; preserva integralmente browser/503humanrecovery/Fetchguard/CDP/CORS/sandbox/LNA/deadlines/flags/asserts/imagens. Segurança não relaxada.

Normativos: seis FULL568PREFIX preservados NO LUGAR; FULLMAINmissingtail após último prefixo comum de LINHA acrescentado, manifest offsets/chars/blobs em docs/evidencias/AVAILABILITY_CALENDAR_SCREEN_EFFECTS_2026-10-18.md. Prefixo comum + segmento anexado reconstrói FULLMAIN BYTEEXATO; NÃO afirmar FULLMAINprefixcontíguo onde ramos divergiram. Memória>1MiB via treepathSHA→fetch_blob FULL, não APIcontentsEMPTY. Old568notes/assets continuam mesmos blobs/história/proveniência, não frames/PASS atuais. Nota nova preserva FULLold568PRbody27886chars e FULL574FINAL13804chars.

Consolidação5744770: CI39133014687attempt2FAILquotaECR ANTEScheckout em ambas tentativas, uma retry já consumida; nenhum produto/teste/Chrome novo executado. OWNAPK39133014704/job117691848889attempt1SUCCESS, checkoutb4f034ba23fb0e2fb0d4a8c4ead0c38a830a1576 SINTÉTICO orderedparents[A683,4770]/treec497 igual candidata confirmado Git, NÃO literal. Build13:56:56.3097811Z/installSuccess13:58:16.0210897Z/DEVICE_SMOKE_OK13:58:28.4949348Z withoutMetro. Artifact12139200939 expires2026-11-01T13:58:29Z download REAL ZIP28912892bytes/SHA25624093e019faec31588022fb6c99192c479c14c8c64ee22b7e7561bc81e98a791 APIexact; APKindividual66161708bytes/SHA256c3ba2c3db2e35fd4636918ca85e7ec276ab0e87ef30422198f4018d435538220 SHA256SUMSexact/BUILD_INFOb4f034/release/fixedpackage/metrofalse/build13:56:56Z. Staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36 ≠ transport/UIproof. ZIP≠APK; nãoPrivacyform/Alert/SecureStore/nativequeue/physical/VisualTruth/565offlineentry/produção. 574 segueDRAFT CIRED/nãoMERGED. FULLfinal574body gravado/readbackEXATO e preservado na nota funcional; não commit só status.

Novo CI/APK OWN no NOVO HEAD568 ainda PENDENTES neste apêndice de preparação. Esperado1551=[145Web,961mobile,431API,3CLI,11monitor] NÃO observado. APK N/A FALSE mobile alterado; todos gates próprios SUCCESS + freshdiff/main/base/head/expectedSHA obrigatórios antes merge e CI/APK reais pósmerge. Sem emprestar old568/574/581/579PASS/frames. Root12GET ERR_ABORTED segue UNRESOLVED; neste momento nenhum Chrome novo deste candidato. Se infra/browser bloquear, referência primária + avanço independente, não rerun mesmoSHA para verde.
Só10AndroidstandaloneTÉCNICAINTERNO aceita,12pendentes; não percentual código. Externos215219220224228OPEN fresh. Watch569 agora CLOSED/completed 2026-10-18T05:01:41Z; não agentstopped inferido nem issuewrite manual. Única rotina enabled/scheduleinalterados, sem outra/disableparcial/transitório. Sem produçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/Activitymanualwrites. Próximo passo: próprios CI/APK + inspeção literal/sintética/bytes; FINAL no PRbody e próximo ciclo FUNCIONAL, nunca selfref/status/image/activitycommit.

## Manifesto de preservação INTEGRAL
```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "oldBlob": "63af4611ad7be32093ddf3d6e2dd76c7f789cb0f",
    "mainBlob": "1fc8f0863c545315f388bc62dcc5584b57e46a26",
    "oldChars": 681391,
    "mainChars": 803318,
    "commonFullLinePrefixChars": 606904,
    "mainTailStartChars": 681489,
    "mainTailChars": 196414
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "oldBlob": "abaf4b48f12f99460a7d60f33e0a6a75a08871b2",
    "mainBlob": "1d7a6c79b23f60ef7bdaf218a4f9e43f582caea4",
    "oldChars": 1013961,
    "mainChars": 1135889,
    "commonFullLinePrefixChars": 939474,
    "mainTailStartChars": 1014059,
    "mainTailChars": 196415
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "oldBlob": "4b4a72d216a562f07896406e4586ba072616e344",
    "mainBlob": "09dddd85c2a1e8faba73791a9bb0bf20e0a67387",
    "oldChars": 671643,
    "mainChars": 793560,
    "commonFullLinePrefixChars": 597156,
    "mainTailStartChars": 671741,
    "mainTailChars": 196404
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "oldBlob": "0d7f3bef6342708dc7a6aac49a635620f3a3c6b4",
    "mainBlob": "09fc0a21a963ca707dbb7ad0ccb6f5ad1f19edb7",
    "oldChars": 666448,
    "mainChars": 788372,
    "commonFullLinePrefixChars": 591961,
    "mainTailStartChars": 666546,
    "mainTailChars": 196411
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "oldBlob": "30a243bac84416a2445a6fb9fca971456f921b1d",
    "mainBlob": "353ae681b275c2d33cac599b48af4f76975e071c",
    "oldChars": 667574,
    "mainChars": 789481,
    "commonFullLinePrefixChars": 593087,
    "mainTailStartChars": 667672,
    "mainTailChars": 196394
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "oldBlob": "e8a047986e33c15cc63cfa0011059ad4c100994a",
    "mainBlob": "9d98072908f4407173b82d38da370cc3c34f709e",
    "oldChars": 264239,
    "mainChars": 386166,
    "commonFullLinePrefixChars": 189752,
    "mainTailStartChars": 264337,
    "mainTailChars": 196414
  }
]
```
## PR568 corpo anterior INTEGRAL (27886 chars)
## CURRENT functional candidate — gates pending — 2026-10-16 UTC
HEAD b7ef867464a3a529ec6e4f5518987143078f9d7e / tree 178be320b8e42e2ae9d0aa8d045b7b53802ba9f9 / parent e2b3b3999dc40c380e60e567d34d612193aa7610. SamePR568 DRAFT/NOTMERGED; main3e098cd51cd2fd84f21e144a600a814a2cb1a150 unchanged. OwnNEW CI+APK PENDING, not green. No ready/merge/post/retry/cancel.

NEWreproducedcalendarfault: professional-support/company-members/company-replacements accepted impossible datesREADY and inviteACKCREATED.29newregressionsbaseline2PASS27FAIL→29GREEN;26oldfocalunchanged+29=55PASSinclSaoPaulo/fullmobile825localPASS. PredicatesONLY, existingAgenda functionbyteidentical; optionalnull/missing/offsets/epoch0/pre1970/order/payload/roles/context/noautoretry unchanged. APIusesPGdatesandownerchecks, noimaginaryAPIbug/impossiblePGrow/productionincident. ExpectedCI1415=[145Web,825mobile,431API,3CLI,11monitor], NOTyetobserved; mobilechangedAPKmandatory.

NEWindependentactualclientHTTPcase inexistingSafetyfixture AFTERalloldchronology+lostACKasserts: ownerreadmembers/invites→ONEgenerateInvitationPOST→PGboundexpiry/tokenhash→explicitrevokePOST→PGboundrevokedAt; noaccept/noaddedmembership. ProfessionalactualGETsupportassigned+generalEXISTINGauthorizedtenant, ownerreplacementassignmentreads+PGtimestamps; owner-onlyprofessional2x403 andforeignowner/outsider4x401. Required16GET+2POST, noproductionnetwork/autoretry/provider. Alloldsafety/support/membership/assignmentrows+ACL/policiesmuststayunchangedexceptoneOWNnewrevokedinvitation. NewscriptstrictCI/localAPIguard, calleractualPGsocket/nameguardalreadyrequired. This NEWgate PENDING, not nativeUI/SecureStore. Browser/laterSupportJSON/alloldgates untouched.

19cyclepaths, five originals+matrixFULLparent/mainprefixappend-only, wholeE2bFINALreceipt and5OWN E2bFAILdesktopPNGs+source manifest preserved, NOTnewhead/nativeframes. PredecessorCIred/APKgreen remains own history below. Onlyarea10technicalaccepted12pending. No production/services/costs/credentials/PSP/realmoney.

---

## HISTORICAL FINAL E2b — superseded only current candidate, not its actual evidence
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



## PR5744770 FINAL INTEGRAL (13804 chars)
## Fecho APK próprio 4770 — 2026-10-18 14:50 UTC
PR574 DRAFT/NOT MERGED. CI39133014687 attempt2 FAILURE por quota ECR postgres17 ANTES checkout em ambas tentativas; UMA retry específica já consumida, nenhum novo rerun. Nenhum produto/1514 testes/HTTP/browser executados nesse CI. APK SUCCESS NÃO autoriza merge.

OWN APK39133014704/job117691848889 attempt1 COMPLETED SUCCESS, zero retry. Checkout primário 2026-10-18T13:46:33.1220262Z = b4f034ba23fb0e2fb0d4a8c4ead0c38a830a1576 SINTÉTICO, pais ordenados [MAINa68392c3bf8d82238f442ec6b68c023aefd751f6,4770c1d9d35db657125c7fad39203b58844b2d24], treec497c3887a3b0fc55061e7bded32311c4f380f7e igual candidata, confirmados Git; NÃO literal HEAD.
Build 13:56:56.3097811Z / install Success 13:58:16.0210897Z / DEVICE_SMOKE_OK 13:58:28.4949348Z without Metro.
Artifact12139200939 não expirado/expires2026-11-01T13:58:29Z, download REAL: ZIP28912892bytes/SHA25624093e019faec31588022fb6c99192c479c14c8c64ee22b7e7561bc81e98a791 = API. IndividualAPK66161708bytes/SHA256c3ba2c3db2e35fd4636918ca85e7ec276ab0e87ef30422198f4018d435538220 = SHA256SUMS. BUILD_INFO commitb4f034/release/packagecom.predibeacon.mlivretrabalho.pilot/metro_required=false/build13:56:56Z. Manifest estático SHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36/baseline; NÃO prova transporte/UI.
ZIP≠APK. Install/launch NÃO é Privacyform/Alert/SecureStore/nativequeue/físico/VisualTruth/565offlineentry/produção. CURRENTMAIN standalone medido continua579POSTA683; 574 é candidata CIRED, nenhum merge/pós.
12novos screen-effects/90focal/924FULLmobile são LOCAIS, não CIunit observado. Rootbrowser intermitente UNRESOLVED; nenhuma alteração segurança/CORS/CDP/Fetchguard/sandbox/LNA/deadlines/flags/asserts/imagens.
Próxima entrega independente: ampliar568 existente com actualscreen availability calendar effects, sem duplicar parser/PR nem rerun4770/b7ef para verde. Recibo consolidável em Git SOMENTE próximo ciclo FUNCIONAL, não commit status/atividade.

### Corpo anterior INTEGRAL preservado (11757 chars)
# Resultado do novo ciclo funcional574 — 2026-10-18

HEAD `4770c1d9d35db657125c7fad39203b58844b2d24`, tree `c497c3887a3b0fc55061e7bded32311c4f380f7e`, merge NORMAL orderedparents[97aa574,mainA683], semforce. **DRAFT/NÃO MERGED. CI FAILURE de infraestrutura; APK próprio RUNNING, NÃO PASS.** Não ready/merge/pós/rerun adicional/PRduplicada.

## CI novo: dois attempts, ambos antes do checkout

Run[39133014687](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39133014687)attempt1/job117691848767COMPLETEFAILURE: ECRpublic.ecr.aws/docker/library/postgres:17toomanyrequestsDataLimit primários13:46:30.5035679Z/13:46:40.4744811Z/13:46:45.4465233Z/Dockerpullfailed13:46:45.4562150Z. InitializecontainersFAIL/Checkout+TODOSprodutosSKIP.

EXATAMENTEUMA retry específica failed-completedjob SAMESHA foi emitida após primárioinfra/recentescontainersmainA683e581attempt2SUCCESS; semregistro/workflow/credencial/bypass. Attempt2/job117692219027COMPLETEFAILURE: MESMAquota13:48:13.1610872Z/13:48:19.6033388Z/13:48:21.3657248Z/Dockerpullfailed13:48:21.3732675Z. InitializecontainersFAIL/Checkout+TODOSprodutosSKIP. **Quota não resolvida; zero outra retry.**

NENHUMcheckoutACTUAL literal/sintético/Chrome/DOM/PNG/HTTPPG/ProductionTruth/unit novo observado em AMBOS. `1514=[145Web,924mobile,431API,3CLI,11monitor]` é SÓESPERADO, **nãoexecutado**;924éLOCAL. Não emprestarmain/old574/581/579PASS. RootbrowserintermitenteantigoNÃOobservado/solucionadonestesgatesinfra; nãoatribuir12GET/0Nav/framesdeoutrorun. ControlesCDPFetchguardCORSsandboxLNAdeadlinesflagsimagesasserts intactos. Não rerun4770sóparaverde.

## APK próprio pendente

Run[39133014704](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39133014704)/job117691848889attempt1 ainda IN_PROGRESS, BuildstandaloneAPK na consulta13:49UTC. Teststandalone-smokegate precedentesSUCCESS NÃOinstall/devicePASS. Sem buildfinal/install/DEVICE_SMOKE/artifact/bytesatribuídos,semcheckoutprimárioAPKatribuídoainda. Exigirfinal/logactualcheckoutGitparents/tree/artifactZIP≠individualAPKSHA256SUMS/BUILDINFO eexpiry. Não cancel/rerunrunning/mergemesmoAPKGREENporqueCIred. APKN/A FALSEmobilevalidatorsmudaram. MAINstandalonevalidadoainda579POSTA683.

## Entrega e revisão confirmadas

12newscreenregressions3PASS9FAILbaseline→12GREEN;90focalPASS/12TZSaoPaulo/FULL924mobileLOCALPASS. Old23parser/41deadline/14helpertestsBYTEintactos;2productvalidatorsBYTEIDÊNTICOSao574anterior;actualScreenPrivacidade c3ac45main/queue/JSXstyles/helpersruntimeauth/API/SQL/RLS/depslock/workflowsbuildsmokeinalteradosfora2predicados originais. ALL11PRpathsSHA/mode100644/reviewTREE e FULL8newUTF8readbackexact+3reusedfullread;1249of1257existingmainblobs+modesiguais. Sem copiardraft581/575/573/571/558/572 oulocaltsconfig. Chegou-seaisto comnovo teste funcional e integração de main atual, não commitatividade/status.

6originais574FULLPREFIX INPLACE+mainTAILliteralapósúltimafimdelinhacomum;mainoriginalFULLreconstruídobyteexact(comum+caudaanexada),manifestocharoffsets/hash/lengthnotaGit. NãofalsificarFULLmaincomoPREFIXcontíguoembranchesdivergidas. Memória1163014charsviaTREEpathSHA→fetch_blobFULL(APIcontentsEMPTYnãoarquivoempty). RecibosFULLold5749292chars+58114050chars preservados notaPRIVACY_CALENDAR_SCREEN_EFFECTS_2026-10-18.md32293chars. Todos históricos mantidos, preparationPENDING é história;FINALconsolidarSÓpróximoFUNCTIONALsemselfrefstatus/image/activitycommit.

## Frente independente após o bloqueio

Após bloqueio, frenteLOCAL independente área3: actualDisponibilidade screenSHA b4eb4736896148baec684b1b4ea6a5009919696e/helper439c05f2810b43d067ad04f5ad504d48956ef9bf/window7b46379568f19b2c13b32df292685af647463534/APIcontrollerfc225952e5063d65b344046d77dc1f8062026b3c lidos fresh. 4modelosactualpreJSX+realwindow/helper+hooks/auth/fetch/timerfixtures:1positivePASS3FAIL main; callbacksJSONACKvalidUUID comstartsAt/endsAt2027-02-30/2027-04-31/2026-11-31 normalizam à janelaFUTURA2027-03-02/2027-05-01/2026-12-01 e apagamdrafts/afirmamsalva. HelperJÁPUBLICADO568b7ef/beccad934ab8d187f8cfddfba28b4526e2bb41b1 INMEMORY→4GREEN/preserva3drafts/uncertain/ONEPOSTsemretryautomático; positivevalidfuturewindowPASS. Também nãoidempotênciainventada: APIaddjátemONCONFLICT(professional_id,starts_at,ends_at),nãoalterado. NenhumACKimpossívelrealAPI/PG/produção/nativereal/novohelperparser/produto/CI/publicação. Não é parte12/924/1514. Scratchnotification-deadline-local/next-audit/{availability-calendar-screen-audit.test.mjs,availability-submit-568.ts}. Se próximo item, estender568EXISTENTE comestesactualscreen-effectregressions, nãoPR/parserduplicado/570parserduplicado, normalmainintegrationsemforce e6originaisFULLbranch+mainpreservados. Preservar7helpers/oldtests568 e controlesdisponibilidadeprazos/owner/current/rascunho/uncertainty/retryMANUALoriginal. NovoHEADcoerenteapenascomnovaprovaeintegraçãoreal, não rerunb7efmesmoSHAparaverde.

Requisitoáreas8/2/1e12maispróximodoaceite pela provaactualefeitoscalendarna tela; **nenhuma área nova aceita**. Só10TÉCNICAINTERNOaceita12pending,não%code. Externos215219220224228OPENfresh. Não notificar conclusão integral/erro que exija ação inexistente. Rotina únicaenabled/scheduleinalterado/nenhumanova/nãodesativarparcialtransitóriofimrodada. SemproduçãoRailwayNeon/serviços/custos/credenciais/providersPSPcontratosdinheiroreal/root/grants/RLSdisable/Activitymanualwrites.

---

## Preparação integral preservada

# Privacidade: calendário antes de efeitos da tela atual

Novo HEAD `4770c1d9d35db657125c7fad39203b58844b2d24` / tree `c497c3887a3b0fc55061e7bded32311c4f380f7e`; merge NORMAL orderedparents[97aa574,mainA683], semforce. **DRAFT / NÃO MERGED. Novo CI e APK PENDENTES.** Não rerun97aa para verde.



---

## Privacidade — efeitos da validação de calendário na tela atual — 2026-10-18 (preparação funcional)

Integração NORMAL de mainA68392c3bf8d82238f442ec6b68c023aefd751f6/tree0b7eb07dbd6353eed75be80b6acd248de1dc247c na branch574 EXISTENTE parent97aa91d545df32cbcb6076b3669c3fc233dafdc3/tree333ddc4deb51fd1758cb8f00593a31afe8fb8471. Não force/rebase/PRduplicada/rerun97aa. Os handlersPrivacidade578+convites579+Notifications576 são os da MAIN já integrada; não copiar581Conversa/575DB/573ledger/571/558/572registry. MainA683temCI39118128290attempt1/job117647993765SUCCESS1479+HTTPbrowser8journey+ProductionTruth eAPK39118128289/job117647993875SUCCESSliteralA683/DEVICE_SMOKE_OK10:21:11.3896069Z; estados revalidados nesta rodada. Não transferir esses PASS ao novoHEAD.

Lacuna de prova REPRODUZIDA agora: helpers dates574 já corrigem calendário mas seus23testes só exercem helpers; tela atual possui prazos/unknownbarrier/clearSession alterados no578 após criação574. Novo apps/mobile/tests/privacy-calendar-screen.test.mjs executa handlers atuais pré-JSX REAIS+loadPrivacyRequests/createPrivacyRequest/deactivatePrivacyAccount/exportPrivacyData/samePrivacySession REAIS com fixtures explícitas dehooks/auth/fetch/timer/local-clear/router.12novos cenários BASELINE main2helpers3PASS9FAIL→com2helpers JÁPUBLICADOS57412GREEN. Não novo parser/novo produtohandler.

Três datas incompatíveis2026-02-30T12:00:00Z/2025-02-29T12:00:00-03:00/2026-04-31T12:00:00+02:00: 3ACKdeactivation falsos antes chamam callbackfixtureclearlocal/nav, depois UNKNOWN sem clear/nav e mantêm barriercontra segundoPOST inclusiveblur/refocus, atéreconciliaçãoGETexplícitavalidada; 3exports inválidos(generatedAt/identity.createdAt/privacyRequests.createdAt) antesmostramcópia, depoiswithholdcopy/UNKNOWNsemnovoGETexport; 3listsinvalidcreatedAt antesREADY/snapshotautorizado, depoisERROR/snapshotnull/zeroPOST.3controlespositivos:leapdaybodylessdeactivation+clearedcallback/nav;offsetexportstringintacta/1GETexport+listrefresh;epoch0listcompletedAtnull+açõeslegítimas. SóJSONfixture explicitamenteincompatível; APIPrivacyControllerREALusaPGtimestamps/now()/newDateISO: nãoAPIbug/impossiblePGrow/exploit/produção. Clearcallback nãoéSecureStore; nãoRNrender/nativereal/contadesativadareal/HTTPPG.

Local12newPASS/TZSaoPaulo12PASS+23oldparserBYTEEXATOS+41olddeadlineBYTEEXATOS+14oldhelpersBYTEEXATOS=90focalPASS. FULLmobile924PASS=[889main+23old574+12new],zeroFAILSKIPCANCEL/Node24.19.0. Localmobile155existingmainblobsSHAiguaisfora2helpers e tsconfig adaptaçãoNODE NÃOpublicada; Conversa581backupretiradodografoLOCAL/sourceConversaMAINSHArestaurado. Produto2helpers574BYTEIDÊNTICOS; reverse-substitutionINTEGRALfora2predicadosreconstróimainhelpersBYTEEXATOS. Privacidade.tsx c3ac45ef5005aac68491f117e48b9af104748fa9/helper-sessionqueue/API/SQL/RLS/ACL/React19.1.4/RN0.81.6/depslock/workflows/build/smoke/JSX/styles/prazos/unknownpolicy atuaismain intactos. Somente2validatorsproduto, nãorescrever578/579.

Preservação documental sem substituir resumo: FULL6originais574 ficamPREFIXOSBYTEEXATOSnoMESMOpath; após eles é anexada a caudaINTEGRALmain desde o último fimdelinhacomum. Commonprefix+mainTail reconstróiFULLmainBYTEEXATO; offset/hash/length no manifesto da nota nova. Não se afirma que FULLmainéprefixocontíguoquandoasbranchesdivergiram. Nenhuma linha histórica574oumainomitida/truncada. Quatronotas574históricas jápresentesmainmesmosblobs. Memória>1MiBusarTREEpathSHA→fetch_blobFULL,nãoAPIcontentsEMPTY. Recibos FULL574old9292chars+581FINAL14050chars preservados integralmente em PRIVACY_CALENDAR_SCREEN_EFFECTS_2026-10-18.md. Consolidação ligada a12regressõesnovas+integraçãofuncional, nãoactivity/status/imagecommit.

Recibo581HISTÓRICO, não prova desteHEAD: draft7137cf4f96e9ff5de82547edf124e27aeda5b2f6/tree fbe1443d170947bbba963b2ff01ff3d37c5e09d7 CI39129134939attempt2/job117680662666FAIL1497unitPASS/browser12GETabortfase503refresh,ProductionTruthposteriorNOTexecuted;attempt1quotaantescheckout+ONEretryconsumida/nãorerunproduto. OwnAPK39129134680/job117680489732attempt1SUCCESSactualcheckoutc1f2SINTÉTICO[A683,7137]/treefbe,install13:04:21.2259173Z/DEVICE_SMOKE_OK13:04:33.6746216Z;artifact12137147993ZIP28913187/SHA2566c37fb8ee6def8654445f6b57bed38244122c71938f92ea063fef47901f79a5f;individualAPK66161824/SHA2564bb10cfb89e9813f65785d1f3b44355b16e5c403947188c908ec684e4adeb83a/SHA256SUMSexact/BUILDINFOc1f2/releasefixedpackage/metrofalse/build13:03:00Z,bytes medidos rodada581/não novo download nesta. Não581merge/NÃOcopy581code/NÃOemprestarAPK581. Old574CI39080576526/job117536501485FAIL1378unitPASS+browser eAPK39080576491/job117536501043SUCCESS; ambos old97aa/db80sintético e não novoHEAD. Recibos integrais nota.

NOVOCI/APKprópriosNOVOHEADPENDENTES. Esperado1514=[145Web,924mobile,431API,3CLI,11monitor] SÓESPERADO,nãoCIcountobservado. APKN/A FALSE2mobilevalidatorsalterados. NãoReady/mergeantesALLSUCCESS/reviewfreshmain/base/head/diff/modes/expectedSHA; pósCI/APK reaisobrigatórios. []/running/skipped≠PASS. BrowserECR bloqueia→registrarprimárioeavançarfrenteindependente;quotaBEFOREcheckoutmáximoONEspecificfailedcompletedretrycomprimário;semrerunprodutoparaverde/registryworkflowcredentialbypass. Browserroot558UNRESOLVED,controlesCDPFetchguardCORSsandboxLNAdeadlineflagimagesasserts intactos.

Áreas8privacidade/2sessão/1tela/12evidência maispróximasdoaceite; só10AndroidstandaloneTÉCNICAINTERNOaceita12pending/não%code/nenhumaceiteintegralnovo. Externos215219220224228OPENfresh. SemproduçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/novaautomação/Activitymanualwrites. Rotinaúnicaenabledscheduleinalterados/não24x7/nãodesativarporparcialtransitóriofimrodada. GitPENDINGéhistória; FINALnoPRbodyreadbackepróximoFUNCTIONAL,nãoautorefstatuscommit.


Recibos antigos574 e581 INTEGRAIS preservados na notaGit PRIVACY_CALENDAR_SCREEN_EFFECTS_2026-10-18.md. Corpo anterior574 segue na nota, não descartado. Resultado novo vai aqui com readbackexato e próximo ciclofuncional, sem autorefmetadata commit.