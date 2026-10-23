# Área8 — correção de logs com privacidade e observabilidade — 22/10/2026

Candidatura PENDENTE de gates próprios e pós-merge. Não é pentest/produção/PSP/físico.



---

## Área8 — logs privados reproduzidos e correção integrada — 22/10/2026

PrimeiroHEAD3ed3ff7fe44ce6b849e37a565e1bdd92ec20051e/tree22976b3dba40b13d10352a5173e9eacc59011187, CI39881170789/job120178629061attempt1FAIL. Checkout5aa6da2ae3d242839829ee699821e8bc21ddc129SINTÉTICO[23b62,3ed3]/mesmaárvore;1936unit/typebuildexport/migrações/privacyPASS. Authconcurrency/PIIexport/fault-recoveryreaisPASS01:00:19.9352543Z/20.0088144Z/.0213739Z. GateparouporERRODAFIXTUREhealth404: usada/v1/healthmascontratoé/v1/health/ready, corrigida. IssoNÃOébugHealthController nemprovaFULLCI. Apesar desseerro, logprimáriorealNestExceptionsHandler01:00:20.4020922Z expôs canárioSQLprivado eFastifyincoming01:00:20.4032602Z expôs canárioquery; são observaçõesdiretas, nãoasserçãoquefalhouporlogger. Casounmatched/bodyaindanãomedidonesseHEAD. NenhumSAMESHArerun.

Auditados173arquivosruntimeGit[85API77mobile11Web]. Outroscanais:4CLIsrawexceptions eprivacy_retention_runs.error_code recebiam mensagembruta;storage mobile safeGet/Set/Delete passavam Errorao console.warn. ModeloLOCALNode24comfontesintegrais equeueREAL,adapterSecureStoreexplícito,observou6warningscomcanário→correção6warningsSEMcanárioequeue/login/tenant/logoutpreservados. NÃOaparelho/SecureStore nativo. Websemconsoleexposingnos11fontesauditados.

NovoHEADfuncionalusa privacy-logging.ts:hookPinoANTESinterpolação, allowlistdemétodo/rotaREGISTRADA/status/tempo/tipodeerro/SQLcode;Nestloggersemrawmessage/stack;reqIdUUIDgeradonoservereheaderrequest-idignorado. ErrosCLIeerror_coderetentionsãocódigos/reasonsliteraisallowlisted,guardasexistentespermanecemlegíveis;stdoutfuncionaldosoperadoresnãoéredigidocomosefosselog (exportprivilegiadocontrolado).3warningsmobileagorafixossemkey/erro,mesmosreturns/queue/verifiedstorage. Nenhumcontroledeauth/SQL/RLS/ACL/retentionrules/códigosHTTP/CORS/prazo/browseralterado.

NovajornadaampliafalhaPGparaaçãoCLIrealsobreprópriafixture/exit1/semACK/semrowmutada/códigoP0001sanitizado;2probes=1tentativaSQLcada,semretryautomático. Fixaendpointhealth eexigelogserror/status/correlação (não aceitar silênciocomoconserto);integraactualmobilequeue/adaptersourcecomo modelo explícito. SemreutilizarPASSdeSHAanterior. **APKAGORAAPLICÁVEL**pormobile/lib/session.ts;precisaOWNCI+OWNstandalone+review+mergeexpected+POSTCIAPKliterais. OldN/Aéapenasbaselinehistórica,183de184insumosprotegidosidênticosfora sessão;React19.1.4/RN0.81.6depslock/workflowsintactos. Área8PENDENTE;matriz8aceitas/5pendentes, semaceiteantecipado. Fonte/crosswalk/primárias/fullbodyhistórico em docs/evidencias/INTERNAL_SECURITY_LOG_PRIVACY_FIX_2026-10-22.md.


## Primária baseline e errata integral

```text
2026-10-23T01:00:19.9352543Z SECURITY_AUTHENTICATION_CONCURRENCY_PASS {"realHTTPPostgres":true,"parallelFailures":8,"unauthorized":7,"locked":1,"storedPasswordsScrypt":true,"storedTokensSHA256":true,"explicitRecovery":true}
2026-10-23T01:00:20.0088144Z SECURITY_PRIVATE_EXPORT_PASS {"realPersistedMessagesAndRating":true,"ownContentPreserved":true,"thirdPartyContentRedacted":true,"outsiderEmptyPrivateData":true,"credentialsAndOperatorFieldsAbsent":true}
2026-10-23T01:00:20.0213739Z SECURITY_FAILURE_RECOVERY_PASS {"realDatabaseFault":true,"http500":true,"noSuccessACK":true,"zeroPartialRows":true,"sqlAttempts":1,"automaticRetry":false,"explicitManualRetry201":true,"ownedFaultRemoved":true}
2026-10-23T01:00:20.0264363Z SECURITY_INTERNAL_ACCEPTANCE_FAIL {"stage":"server-log-privacy","details":"assertion_failed; synthetic values omitted"}
```

Observaçõesdiretasdoslogs (valorescanáriosomitidos;originaisnoslogsCI39881170789):
```json
[
  {
    "time": "2026-10-23T01:00:20.4020922Z",
    "queryCanary": false,
    "databaseErrorCanary": true,
    "requestRecord": false,
    "nestException": true
  },
  {
    "time": "2026-10-23T01:00:20.4032602Z",
    "queryCanary": true,
    "databaseErrorCanary": false,
    "requestRecord": true,
    "nestException": false
  },
  {
    "time": "2026-10-23T01:00:20.6859620Z",
    "queryCanary": false,
    "databaseErrorCanary": true,
    "requestRecord": false,
    "nestException": false
  }
]
```

## Modelo mobile local — fonte atual/base e candidata

BaseGitd99f5ad3cf53331aa55be0a2d38ac9a2fc4004a7 equeueD10eb3b0ce05326947aa216d30db2571d1501dc8,adapterexplicitonãoSecureStorenativo.
```text
BASE exit1
(node:2) ExperimentalWarning: stripTypeScriptTypes is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
SECURITY_MOBILE_LOG_OBSERVED {"actualSource":true,"nativeAdapterFixture":true,"warnings":6,"canaryDisclosed":true,"physicalDevice":false}
SECURITY_INTERNAL_ACCEPTANCE_FAIL {"stage":"configuration","details":"assertion_failed; synthetic values omitted"}

CANDIDATE exit0
(node:2) ExperimentalWarning: stripTypeScriptTypes is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
SECURITY_MOBILE_LOG_OBSERVED {"actualSource":true,"nativeAdapterFixture":true,"warnings":6,"canaryDisclosed":false,"physicalDevice":false}
SECURITY_MOBILE_LOG_AND_SESSION_PASS {"warningsRetained":true,"noRawError":true,"realQueueAndVerifiedStorageCore":true,"nativeSecureStore":false}

```

##173runtimefilesGit auditados

- `apps/api/src/allocation.ts` `ad0ab12ae7b1cdb48cb568d7d74850e0c7d6360a`
- `apps/api/src/app.module.ts` `6193376b38e7b8941d20de580c183740d4c3f86b`
- `apps/api/src/assignment-lifecycle.ts` `7175bf312039322f53f66f90e576b2da51eb0875`
- `apps/api/src/auth.controller.ts` `c432aa1e28e02c8064144e913168cc64e8a38e97`
- `apps/api/src/auth.service.ts` `ab715cc779425341e6502901d79b4dd3f6a70c86`
- `apps/api/src/availability-input.ts` `a5b2acc782df78f2c0a8716bf41e8ae63942ff28`
- `apps/api/src/availability.controller.ts` `fc225952e5063d65b344046d77dc1f8062026b3c`
- `apps/api/src/cancellation.controller.ts` `33beafd3d8d7788792dcec8ad1463e4a617e3956`
- `apps/api/src/career-conversion-input.ts` `ef4df34b24d8210e170cb8bd429b6dadd8db3a03`
- `apps/api/src/career-conversion.controller.ts` `b05d7094db192ec5613219dc4b9c64e4e8d8679b`
- `apps/api/src/career.controller.ts` `fe8f6cadb28617c896883622be9fac305172ea1a`
- `apps/api/src/city-proximity.ts` `ec047a6f262c0cf59cd6fb02b25d2ec8d3630d0c`
- `apps/api/src/company-analytics.controller.ts` `9d4aea6ba5f51260dd7b9f298837be9cb806b4ba`
- `apps/api/src/company-confirmation-policy.ts` `df1a6b7587b201bd55f8567876db5a9a2d127064`
- `apps/api/src/company-dashboard.controller.ts` `46e0a2847dcfe9655979a405b29cffdac2f8026e`
- `apps/api/src/company-job-create.controller.ts` `50acee5e5f13731101bc77abcb29d5e21c946206`
- `apps/api/src/company-jobs.controller.ts` `e888c6a6db28bd3f48223f150a5895ffc6c26d9c`
- `apps/api/src/company-members.controller.ts` `b63fedb082c0b8ed20b1b9f7daebe5045705ab4d`
- `apps/api/src/conversations.controller.ts` `05f479c1ab3a2350c8bcd1fd32b1bdd574e62ec3`
- `apps/api/src/copilot-tools.ts` `36ad02f7d46f2da45f1b5182e78d19d58499f758`
- `apps/api/src/copilot.controller.ts` `a78315b38e7b9d018a6d47e0f300a377a5d84071`
- `apps/api/src/copilot.ts` `05b6a3987f4b2167a5119456c9d3c0c271d1138a`
- `apps/api/src/cors.ts` `865b731ce19ea29d004281c3a8e9e722d1eceecb`
- `apps/api/src/database.service.ts` `371c1615e95271f5484de3e8bca883481d4e845f`
- `apps/api/src/earnings.controller.ts` `f091a1262e2c7a9934358883ea2ef8919ababf97`
- `apps/api/src/engagement-modality.ts` `160b241f812c5af0dd2eae5358d3f10fbe34ad09`
- `apps/api/src/exception-sla.ts` `a91a13a1edf90ce385997fc6153a6ecff83f80ba`
- `apps/api/src/health.controller.ts` `35afec02ee6dcf41c6d9bc7809f91e660cff44ff`
- `apps/api/src/integration-contract.ts` `d056e7d0cf493b955d56717fd19de6d06d028f23`
- `apps/api/src/integrity.controller.ts` `6004fa00460b9fc9466b343400371e07adaeaefb`
- `apps/api/src/iso-datetime.ts` `fa415e8ceb611231d694ac569f9802d2bd8b77bd`
- `apps/api/src/jobs.controller.ts` `185be30435f34dc270461fefce284a37ac7a3b5e`
- `apps/api/src/main.ts` `9d773e244d76ac060daebfdbb3b1afb0e4f0c18a`
- `apps/api/src/matching.ts` `4874a7d45e47d6b064103f96fe527a7ddbc5a9fc`
- `apps/api/src/me.controller.ts` `5e655898870718c4644998d76e1524c4af6d2c15`
- `apps/api/src/migrate.ts` `b1cd417192c9017defd12c8a2a0b0e5ee1c7e654`
- `apps/api/src/notifications.controller.ts` `dfe072e660b41060ff809eeefc489ae9aeb3981a`
- `apps/api/src/payment-events.controller.ts` `3030f292e35b5fbeb7c1c1bc0cd74149ea6d6313`
- `apps/api/src/payment-provider.ts` `9ff21a1ae90742024e495bcf6d65b03d7f445331`
- `apps/api/src/payment-webhook-security.ts` `c88f1f8e8b3681a3425e4990f7f5a912064c1c1f`
- `apps/api/src/payment-webhook.controller.ts` `81d39a81a9a93d556a8651d3492abc937f65a0f9`
- `apps/api/src/planner.controller.ts` `ceae97178b4f9b7fe9cf819e47d328bfcd09c790`
- `apps/api/src/privacy-legal-holds-ops.ts` `0fd8b70d349d93f298617f9d2ca90f8bd13a560a`
- `apps/api/src/privacy-requests-ops.ts` `fe7d38394363499ed2c3d8877181dec36e7b9328`
- `apps/api/src/privacy-retention.ts` `1aa4d279371b4f95880c41fdb10f51a9368db9fb`
- `apps/api/src/privacy.controller.ts` `4c9427c20213a838fda51adc2547014f31ef5456`
- `apps/api/src/professional-capabilities-input.ts` `10cb3338d04bcd50705aa08a88e55f395002155a`
- `apps/api/src/professional-capabilities.controller.ts` `6325906dea732851d6ed8f75be11c7baecbc7c5e`
- `apps/api/src/professional-planner.controller.ts` `5220558e1f5610607134b497bf95e16cecf39edb`
- `apps/api/src/professional-profile-input.ts` `58a240aa5205ddb85fa4a8e6b05c3b0ff1be391e`
- `apps/api/src/professional-profile.controller.ts` `c7333a3d6b8b63d074885c5df9cc707482cc3949`
- `apps/api/src/rating-policy.ts` `e6735bd686798c7782beec3e5b9ad7617d9a761d`
- `apps/api/src/ratings.controller.ts` `d4e41af53698b1658e620e717cafd1ec129a260a`
- `apps/api/src/reliability-score.ts` `4249884e086767ca7fd4aad0e7604366b2619ede`
- `apps/api/src/replacement.controller.ts` `809c27f1551c103adc9e6950f79555eb42d3b7db`
- `apps/api/src/role-fit.ts` `d5e0278d1b6688749d0b57a21b2423917cdf4e44`
- `apps/api/src/safety-access-policy.ts` `f9a68cb7c7630c1c46156d67aa9cd01d29c4b8ff`
- `apps/api/src/safety-admin.controller.ts` `baf0a51aae1c2cae598dbf3e7bdb7660b6b1f7f7`
- `apps/api/src/safety-appeal-policy.ts` `ea2f59f888f1d5fb82dfec285c9e62f423bed072`
- `apps/api/src/safety-appeals.controller.ts` `f9425e7357c8e6af17c866d1eb7803a19e430fff`
- `apps/api/src/safety-cases.controller.ts` `aa62c24959e927e896b041b744c4c154a58591b0`
- `apps/api/src/schedule-optimizer.ts` `a777e7cf5e755640e51f0790c358b1eed18ade4e`
- `apps/api/src/score-engine.ts` `431ab24e88a638f68c79dddb0bb0d3be63a81312`
- `apps/api/src/signed-json-payment-provider.ts` `26dd37d8dd0e2126a54ccb96445e23524ab1c8ef`
- `apps/api/src/support-idempotency.ts` `ad5002f06ba4b3af2c04b77eec26585924e8e934`
- `apps/api/src/support-input.ts` `5d34f38394575c3d0828a515976c9270c1aa472b`
- `apps/api/src/support.controller.ts` `b7418f9c3473b15ee32a488b7b354816c80acf28`
- `apps/api/src/talent-pools.controller.ts` `3e4156f6d582028101c06c5c21e6a2a7c6bc5ab4`
- `apps/api/src/taxonomy.controller.ts` `9552ffc4ddb96ebfe1db760cc104bcd23416bb5a`
- `apps/api/src/taxonomy.ts` `d745addcb11eb65d1b4455b3fd0f09c0c60b8b9a`
- `apps/api/src/team-allocation.controller.ts` `a316e0362c7d4de75bcf8cf0c347b6d21bfcac7f`
- `apps/api/src/team-optimizer.ts` `02e7e129b175d8caff3eee6f280201e36f2aa0bc`
- `apps/api/src/team-plan-input.ts` `7f142614adbdd28beb89f1fa77129d6f8cdc5076`
- `apps/api/src/teams.controller.ts` `40ffb43f9200d79e60262d3f9005155cce64b7fc`
- `apps/api/src/terms-policy.ts` `53b599ab5b5648bef3fe91eee598d21c6e8497ed`
- `apps/api/src/terms.controller.ts` `597e5fbda7337046452e4e8542df00face09a416`
- `apps/api/src/timestamp-order.ts` `e295b67d49dd47698d7351fc684674c7ec811b1e`
- `apps/api/src/trust-events.controller.ts` `ac760f24611da21d0b67f4b5ec5174915f07b73e`
- `apps/api/src/verification-policy.ts` `34b2c53bd3228a0fb62201985efd23f85863358a`
- `apps/api/src/verification.controller.ts` `e43b5f95d05a505b5146a0c0ea2281d5d0dee63f`
- `apps/api/src/vertical-packs.controller.ts` `98a2b07f18f277c19220d588d1e44c945b11c8f4`
- `apps/api/src/vertical-packs.ts` `409402cb0f5d808ba01dc62e3b91986950ed7390`
- `apps/api/src/work-assignments.controller.ts` `3c4c1c7023fb9fcbdfd84a4e594a67bbb491a6a8`
- `apps/api/src/work-graph.controller.ts` `5bed24a5999a66290a3eb058b09d70948e8c17f6`
- `apps/api/src/work-passport.controller.ts` `af621fe5009ff08f37d51ef49257b16293ceb5b7`
- `apps/mobile/app/_layout.tsx` `d75f4a26218d1c1fdfacef46b08fd2d2babaa05a`
- `apps/mobile/app/agenda.tsx` `764dcb964bdf79ae0337d6ae5a59cdc030e48a77`
- `apps/mobile/app/analytics.tsx` `aff479659db2976acd7b3e0923e991b36273fce7`
- `apps/mobile/app/candidatos.tsx` `e5f68ec17a307d71d0c115e191c3be480e24cd6b`
- `apps/mobile/app/casos-seguranca.tsx` `b4e3ccafaa50d4cfad34733f12820008289b68ec`
- `apps/mobile/app/conversa.tsx` `25e6191e1664ee0f98c96d026ff3aed96faa2798`
- `apps/mobile/app/copilot.tsx` `ecc9ca4ecafbdd5131c30e130ba0075c6d8d5526`
- `apps/mobile/app/criar-conta.tsx` `fba0cb3416b9cb538867fd7d542d3b9c118ce169`
- `apps/mobile/app/disponibilidade.tsx` `b4eb4736896148baec684b1b4ea6a5009919696e`
- `apps/mobile/app/empresa-conta.tsx` `20c37cc92957e7bdb245e494d240dfcd40ebab80`
- `apps/mobile/app/empresa-inicio.tsx` `714095ed78b6669a42750d0ac54fbb861e354501`
- `apps/mobile/app/empresa-notificacoes.tsx` `f42c24a684a943e4b3f07dfa0e6c7c533aa36b11`
- `apps/mobile/app/empresa.tsx` `b34777148cfab0b167f1d4d6b61777e44a087900`
- `apps/mobile/app/entrar.tsx` `ec7c7914f5f2f310e905bff8b81103c4be433357`
- `apps/mobile/app/equipes.tsx` `f7c6eacb4d951d37487473fc6572271ccefd31cb`
- `apps/mobile/app/ganhos.tsx` `79ae7e2b6225da08eac0d100ee71ab8639165755`
- `apps/mobile/app/index.tsx` `51d033d5ece17312b141da28ead40ecdfdf56705`
- `apps/mobile/app/membros.tsx` `4b6140a7349049dd704bbb079f16de06d6be7589`
- `apps/mobile/app/notificacoes.tsx` `5b92e71991bfa02a0be73bfd3dd1debf31a446c1`
- `apps/mobile/app/pagamentos.tsx` `e2b3b16937945d11c0d45c31c9eff13a2cf0b96f`
- `apps/mobile/app/perfil.tsx` `c492039ee8542f513e6a148ba18a94671f54332c`
- `apps/mobile/app/planejamento.tsx` `356460ad4b0a546fbd6b7ca5cf9650568e973c02`
- `apps/mobile/app/privacidade.tsx` `c3ac45ef5005aac68491f117e48b9af104748fa9`
- `apps/mobile/app/profissional-inicio.tsx` `a71b7c6ba11bf4cd35a6996448dda71ee598e731`
- `apps/mobile/app/seguranca.tsx` `bbd76fdb4dfa7d764b4e29942b47d58368be2223`
- `apps/mobile/app/substituicoes.tsx` `e2cf5a9af0d4cfc6755fd857cf6de91f30c45b80`
- `apps/mobile/app/talentos.tsx` `87872556f34ee09519f739c33a404322f1e677db`
- `apps/mobile/app/trabalhos.tsx` `65c0de5b1b9a390eb403a1a01695038c30180928`
- `apps/mobile/components/CompanyNav.tsx` `8f54ab81505b317b8d64a7d1ea301d4c8ee2cc12`
- `apps/mobile/components/DeclaredCapabilities.tsx` `8086dc0d623e6d1137fb821c9f5f9c1a07c70b67`
- `apps/mobile/components/GeneralSupport.tsx` `344b2d82c2172af1f164649fdf2c9fa69400e265`
- `apps/mobile/components/NotificationsScreen.tsx` `ea7dd8efc958c28730675ad8d6cc2bddc45067f2`
- `apps/mobile/components/ProfessionalNav.tsx` `5c09010eea757e92c7dfc42bd7adeff1119c7380`
- `apps/mobile/components/SupportHistory.tsx` `e99f37d6bdda66825e346f23b2f2c2fa2f6ee0f8`
- `apps/mobile/components/SupportRecovery.tsx` `919d24e9a2548703d4991f5c68a437ed9041e219`
- `apps/mobile/components/SupportRequest.tsx` `73827cddcfb0192f5fbd38f6b215cfc9c32f47bd`
- `apps/mobile/lib/agenda.ts` `48d3e08ae4e5ac1f4948c20549a330cc042a01ce`
- `apps/mobile/lib/api.ts` `46cf48a5fb37257af90aceb816b3791e6b1c3c7a`
- `apps/mobile/lib/availability-submit.ts` `beccad934ab8d187f8cfddfba28b4526e2bb41b1`
- `apps/mobile/lib/availability-window.ts` `7b46379568f19b2c13b32df292685af647463534`
- `apps/mobile/lib/bootstrap.ts` `7aaecdbc168f9486500afc91d045b5ca881806fd`
- `apps/mobile/lib/company-analytics.ts` `28f59c89ccf1d35e114daa93cb3ef39da418c6a9`
- `apps/mobile/lib/company-candidates.ts` `d042f8221b70cca7c984138d941f185d94c89ba5`
- `apps/mobile/lib/company-dashboard-actions.ts` `42419db9d1971ba02b46047a572c79b3f8eef041`
- `apps/mobile/lib/company-dashboard.ts` `a865a546c903520964a807f488a5ec4114e9bbe8`
- `apps/mobile/lib/company-job-publication.ts` `45fb20b6b1b55447fe83207d4ac3806db7e7dca5`
- `apps/mobile/lib/company-members.ts` `85c86260e3cecc70df9e8ffe24dd246f5cab9d7a`
- `apps/mobile/lib/company-readonly.ts` `4ec7f5151134f4ea11b09f2ce55dfd2a5cdd22d0`
- `apps/mobile/lib/company-replacements.ts` `7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6`
- `apps/mobile/lib/company-safety.ts` `5ab736715ffd3dc5ff83decc0739bf8c95276089`
- `apps/mobile/lib/company-talents.ts` `55f07c1e950a5f13036238ac6e1579e971a6aaba`
- `apps/mobile/lib/conversation.ts` `565a19b60e1c0a3aa244df92dbfb09dc9b27d718`
- `apps/mobile/lib/copilot-response.ts` `856d4d5210972be202e7502f6c9c3281b50adc43`
- `apps/mobile/lib/earnings.ts` `9afe1a24109c42ad4825eeda40ff1dcef164e84c`
- `apps/mobile/lib/home-cards.ts` `d6e4ccf9d71ab072e01e3b2915558a6586edec36`
- `apps/mobile/lib/jobs.ts` `54d0814ace6e91565e0fa9c8722ea734594b015f`
- `apps/mobile/lib/notifications.ts` `3928db3607370a459eca506a1610671d6c655bee`
- `apps/mobile/lib/passport-history.ts` `e72f0ce1df88d4624ba78295b87ff861493fdda6`
- `apps/mobile/lib/privacy-actions.ts` `e116dec3da68da1e41b666c7d3e8739a6d4ac5a7`
- `apps/mobile/lib/privacy-requests.ts` `3f69d87acd77d803bc0394ce412b3e85213d8b97`
- `apps/mobile/lib/professional-capabilities.ts` `e3ef307eaaa4a3755eda2f9f30b652bca1d5550b`
- `apps/mobile/lib/professional-home.ts` `ca9e396fceec67ad5b9fe99965a1479bc9a9d0f0`
- `apps/mobile/lib/professional-profile.ts` `c33dce25b0de5ab42512c846b2418895b92178de`
- `apps/mobile/lib/professional-safety.ts` `123e637dc1019e9fece11a64d5f5257bb4d6e3c9`
- `apps/mobile/lib/professional-support.ts` `865f1b87195d5860cc7f8f03d20c00c48b92fd1b`
- `apps/mobile/lib/profile-submit.ts` `7ff33c6e83c858577f6d0a31aa1fd6914b4cd609`
- `apps/mobile/lib/session-context.ts` `8a23f577cf222016694d6995822b632c0a71434f`
- `apps/mobile/lib/session-transaction.ts` `d10eb3b0ce05326947aa216d30db2571d1501dc8`
- `apps/mobile/lib/session.ts` `d99f5ad3cf53331aa55be0a2d38ac9a2fc4004a7`
- `apps/mobile/lib/signin.ts` `453de55dfc31d983fc8e279b8c91104913a927b0`
- `apps/mobile/lib/signup.ts` `800faeb27d041108ab7c1c9018f749c32d2a0010`
- `apps/mobile/lib/startup-route.ts` `b8cbb6fcbb50b3d592d077b5c31db3f155ec8fff`
- `apps/mobile/lib/support-contexts.ts` `61df65a69aca6acae2d1575304f5ed4191470ca7`
- `apps/mobile/lib/support-intent-storage.ts` `b266454649a7658b5231207edaec7e269e9da8b9`
- `apps/mobile/lib/support-intent.ts` `190926f412bb22ccf556899f6ae93dfe523c77ff`
- `apps/mobile/lib/support-submission.ts` `be61cef11a2033fc0bca2899b518efcd56022839`
- `apps/mobile/lib/teams.ts` `eeeab168bfb62c62f2552d28bd6600ae23adada1`
- `apps/web/app/independent-reads.ts` `5b8b9c9eea394b0ce5d5d3ac4d3287113952fdc5`
- `apps/web/app/job-publication.ts` `64fd591cb1384d52c1a1d8779acaf9f22ef94144`
- `apps/web/app/layout.tsx` `048d9f57c547ba61cb4736e9ed6eb2e1bb271b5a`
- `apps/web/app/page.tsx` `bbde0e9b28f8e8aaae328c05078f76ae9f4bfcc8`
- `apps/web/app/replacement-ack.ts` `3ebcbebc59ffed138b97ab71f73ae9411e0cbefd`
- `apps/web/app/safety-status-ack.ts` `48ef4cece386c53aa58416d7b45d2a8950dbbb09`
- `apps/web/app/stored-session.ts` `ec169a254f67391cff82ab46655b3a9adcbd326b`
- `apps/web/app/team-membership-ack.ts` `fcc698c53d06b053b9709f306526eaa24d29e5d8`
- `apps/web/app/team-publication.ts` `cfb30d410c890c9750c646153c2821e04efbe96b`
- `apps/web/app/web-contract.ts` `68cb38a51e1775e155bc67fe5b836d9a0b453a89`
- `apps/web/app/workforce-ack.ts` `cd9eda0b870a197ffdafd2d52c540e78fd8b6e3d`

##184insumosAndroid antesdacorreção (nova sessão exige build próprio)

- `apps/mobile/app.json` `77f1007b792ee4fa2d10dd5e5a8316762467ef8e` 100644
- `apps/mobile/app/_layout.tsx` `d75f4a26218d1c1fdfacef46b08fd2d2babaa05a` 100644
- `apps/mobile/app/agenda.tsx` `764dcb964bdf79ae0337d6ae5a59cdc030e48a77` 100644
- `apps/mobile/app/analytics.tsx` `aff479659db2976acd7b3e0923e991b36273fce7` 100644
- `apps/mobile/app/candidatos.tsx` `e5f68ec17a307d71d0c115e191c3be480e24cd6b` 100644
- `apps/mobile/app/casos-seguranca.tsx` `b4e3ccafaa50d4cfad34733f12820008289b68ec` 100644
- `apps/mobile/app/conversa.tsx` `25e6191e1664ee0f98c96d026ff3aed96faa2798` 100644
- `apps/mobile/app/copilot.tsx` `ecc9ca4ecafbdd5131c30e130ba0075c6d8d5526` 100644
- `apps/mobile/app/criar-conta.tsx` `fba0cb3416b9cb538867fd7d542d3b9c118ce169` 100644
- `apps/mobile/app/disponibilidade.tsx` `b4eb4736896148baec684b1b4ea6a5009919696e` 100644
- `apps/mobile/app/empresa-conta.tsx` `20c37cc92957e7bdb245e494d240dfcd40ebab80` 100644
- `apps/mobile/app/empresa-inicio.tsx` `714095ed78b6669a42750d0ac54fbb861e354501` 100644
- `apps/mobile/app/empresa-notificacoes.tsx` `f42c24a684a943e4b3f07dfa0e6c7c533aa36b11` 100644
- `apps/mobile/app/empresa.tsx` `b34777148cfab0b167f1d4d6b61777e44a087900` 100644
- `apps/mobile/app/entrar.tsx` `ec7c7914f5f2f310e905bff8b81103c4be433357` 100644
- `apps/mobile/app/equipes.tsx` `f7c6eacb4d951d37487473fc6572271ccefd31cb` 100644
- `apps/mobile/app/ganhos.tsx` `79ae7e2b6225da08eac0d100ee71ab8639165755` 100644
- `apps/mobile/app/index.tsx` `51d033d5ece17312b141da28ead40ecdfdf56705` 100644
- `apps/mobile/app/membros.tsx` `4b6140a7349049dd704bbb079f16de06d6be7589` 100644
- `apps/mobile/app/notificacoes.tsx` `5b92e71991bfa02a0be73bfd3dd1debf31a446c1` 100644
- `apps/mobile/app/pagamentos.tsx` `e2b3b16937945d11c0d45c31c9eff13a2cf0b96f` 100644
- `apps/mobile/app/perfil.tsx` `c492039ee8542f513e6a148ba18a94671f54332c` 100644
- `apps/mobile/app/planejamento.tsx` `356460ad4b0a546fbd6b7ca5cf9650568e973c02` 100644
- `apps/mobile/app/privacidade.tsx` `c3ac45ef5005aac68491f117e48b9af104748fa9` 100644
- `apps/mobile/app/profissional-inicio.tsx` `a71b7c6ba11bf4cd35a6996448dda71ee598e731` 100644
- `apps/mobile/app/seguranca.tsx` `bbd76fdb4dfa7d764b4e29942b47d58368be2223` 100644
- `apps/mobile/app/substituicoes.tsx` `e2cf5a9af0d4cfc6755fd857cf6de91f30c45b80` 100644
- `apps/mobile/app/talentos.tsx` `87872556f34ee09519f739c33a404322f1e677db` 100644
- `apps/mobile/app/trabalhos.tsx` `65c0de5b1b9a390eb403a1a01695038c30180928` 100644
- `apps/mobile/components/CompanyNav.tsx` `8f54ab81505b317b8d64a7d1ea301d4c8ee2cc12` 100644
- `apps/mobile/components/DeclaredCapabilities.tsx` `8086dc0d623e6d1137fb821c9f5f9c1a07c70b67` 100644
- `apps/mobile/components/GeneralSupport.tsx` `344b2d82c2172af1f164649fdf2c9fa69400e265` 100644
- `apps/mobile/components/NotificationsScreen.tsx` `ea7dd8efc958c28730675ad8d6cc2bddc45067f2` 100644
- `apps/mobile/components/ProfessionalNav.tsx` `5c09010eea757e92c7dfc42bd7adeff1119c7380` 100644
- `apps/mobile/components/SupportHistory.tsx` `e99f37d6bdda66825e346f23b2f2c2fa2f6ee0f8` 100644
- `apps/mobile/components/SupportRecovery.tsx` `919d24e9a2548703d4991f5c68a437ed9041e219` 100644
- `apps/mobile/components/SupportRequest.tsx` `73827cddcfb0192f5fbd38f6b215cfc9c32f47bd` 100644
- `apps/mobile/eas.json` `fb64fcbd42deff7361ad26d1b7cd2fd06fd6a15f` 100644
- `apps/mobile/lib/agenda.ts` `48d3e08ae4e5ac1f4948c20549a330cc042a01ce` 100644
- `apps/mobile/lib/api.ts` `46cf48a5fb37257af90aceb816b3791e6b1c3c7a` 100644
- `apps/mobile/lib/availability-submit.ts` `beccad934ab8d187f8cfddfba28b4526e2bb41b1` 100644
- `apps/mobile/lib/availability-window.ts` `7b46379568f19b2c13b32df292685af647463534` 100644
- `apps/mobile/lib/bootstrap.ts` `7aaecdbc168f9486500afc91d045b5ca881806fd` 100644
- `apps/mobile/lib/company-analytics.ts` `28f59c89ccf1d35e114daa93cb3ef39da418c6a9` 100644
- `apps/mobile/lib/company-candidates.ts` `d042f8221b70cca7c984138d941f185d94c89ba5` 100644
- `apps/mobile/lib/company-dashboard-actions.ts` `42419db9d1971ba02b46047a572c79b3f8eef041` 100644
- `apps/mobile/lib/company-dashboard.ts` `a865a546c903520964a807f488a5ec4114e9bbe8` 100644
- `apps/mobile/lib/company-job-publication.ts` `45fb20b6b1b55447fe83207d4ac3806db7e7dca5` 100644
- `apps/mobile/lib/company-members.ts` `85c86260e3cecc70df9e8ffe24dd246f5cab9d7a` 100644
- `apps/mobile/lib/company-readonly.ts` `4ec7f5151134f4ea11b09f2ce55dfd2a5cdd22d0` 100644
- `apps/mobile/lib/company-replacements.ts` `7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6` 100644
- `apps/mobile/lib/company-safety.ts` `5ab736715ffd3dc5ff83decc0739bf8c95276089` 100644
- `apps/mobile/lib/company-talents.ts` `55f07c1e950a5f13036238ac6e1579e971a6aaba` 100644
- `apps/mobile/lib/conversation.ts` `565a19b60e1c0a3aa244df92dbfb09dc9b27d718` 100644
- `apps/mobile/lib/copilot-response.ts` `856d4d5210972be202e7502f6c9c3281b50adc43` 100644
- `apps/mobile/lib/earnings.ts` `9afe1a24109c42ad4825eeda40ff1dcef164e84c` 100644
- `apps/mobile/lib/home-cards.ts` `d6e4ccf9d71ab072e01e3b2915558a6586edec36` 100644
- `apps/mobile/lib/jobs.ts` `54d0814ace6e91565e0fa9c8722ea734594b015f` 100644
- `apps/mobile/lib/notifications.ts` `3928db3607370a459eca506a1610671d6c655bee` 100644
- `apps/mobile/lib/passport-history.ts` `e72f0ce1df88d4624ba78295b87ff861493fdda6` 100644
- `apps/mobile/lib/privacy-actions.ts` `e116dec3da68da1e41b666c7d3e8739a6d4ac5a7` 100644
- `apps/mobile/lib/privacy-requests.ts` `3f69d87acd77d803bc0394ce412b3e85213d8b97` 100644
- `apps/mobile/lib/professional-capabilities.ts` `e3ef307eaaa4a3755eda2f9f30b652bca1d5550b` 100644
- `apps/mobile/lib/professional-home.ts` `ca9e396fceec67ad5b9fe99965a1479bc9a9d0f0` 100644
- `apps/mobile/lib/professional-profile.ts` `c33dce25b0de5ab42512c846b2418895b92178de` 100644
- `apps/mobile/lib/professional-safety.ts` `123e637dc1019e9fece11a64d5f5257bb4d6e3c9` 100644
- `apps/mobile/lib/professional-support.ts` `865f1b87195d5860cc7f8f03d20c00c48b92fd1b` 100644
- `apps/mobile/lib/profile-submit.ts` `7ff33c6e83c858577f6d0a31aa1fd6914b4cd609` 100644
- `apps/mobile/lib/session-context.ts` `8a23f577cf222016694d6995822b632c0a71434f` 100644
- `apps/mobile/lib/session-transaction.ts` `d10eb3b0ce05326947aa216d30db2571d1501dc8` 100644
- `apps/mobile/lib/session.ts` `d99f5ad3cf53331aa55be0a2d38ac9a2fc4004a7` 100644
- `apps/mobile/lib/signin.ts` `453de55dfc31d983fc8e279b8c91104913a927b0` 100644
- `apps/mobile/lib/signup.ts` `800faeb27d041108ab7c1c9018f749c32d2a0010` 100644
- `apps/mobile/lib/startup-route.ts` `b8cbb6fcbb50b3d592d077b5c31db3f155ec8fff` 100644
- `apps/mobile/lib/support-contexts.ts` `61df65a69aca6acae2d1575304f5ed4191470ca7` 100644
- `apps/mobile/lib/support-intent-storage.ts` `b266454649a7658b5231207edaec7e269e9da8b9` 100644
- `apps/mobile/lib/support-intent.ts` `190926f412bb22ccf556899f6ae93dfe523c77ff` 100644
- `apps/mobile/lib/support-submission.ts` `be61cef11a2033fc0bca2899b518efcd56022839` 100644
- `apps/mobile/lib/teams.ts` `eeeab168bfb62c62f2552d28bd6600ae23adada1` 100644
- `apps/mobile/package.json` `e1646b540a738daa81828a71f00617a7714fad6f` 100644
- `apps/mobile/tests/agenda-actions.test.mjs` `1e1964cc18cbabe419c8b70a5b4e9c8f2a9ed366` 100644
- `apps/mobile/tests/agenda-read-deadline.test.mjs` `9419980016590846a43daeb7c9ebc719ed8231e9` 100644
- `apps/mobile/tests/agenda-support-screen.test.mjs` `ff7f91eb8ae8d15aa440707a6909ae9c97a3308d` 100644
- `apps/mobile/tests/agenda.test.mjs` `934aa0350620a8e0b85fc63db9bbed110c2b4854` 100644
- `apps/mobile/tests/availability-calendar-screen.test.mjs` `b0c5cb20f354400db0c4dc934779ec800d321dbd` 100644
- `apps/mobile/tests/availability-screen-deadline.test.mjs` `0f5607ef3750c788a7657dbac299bc6afd3e8777` 100644
- `apps/mobile/tests/availability-submit.test.mjs` `340ceb0dbb8a7f5e0e502514279997df0fc9cc9c` 100644
- `apps/mobile/tests/availability-window.test.mjs` `8796c551a1db8fc8ea9687e6cab57542ec750d73` 100644
- `apps/mobile/tests/candidate-confirm-deadline.test.mjs` `1da09eeb72786d7553c2caf8828f6ef4d56bd108` 100644
- `apps/mobile/tests/candidate-confirm-session-guard.test.mjs` `81e44156aa9630e3842b92af33428a686b1a7928` 100644
- `apps/mobile/tests/candidates-expired-read.test.mjs` `6ea6740b371d48521829c2b3c003bfa7887b9391` 100644
- `apps/mobile/tests/candidates-read-deadline.test.mjs` `0bc2846acc7dad856994cdfdacf583b07b5d8f89` 100644
- `apps/mobile/tests/company-analytics.test.mjs` `1ea2952808f7aa44731918bca8f4554ac26fee5a` 100644
- `apps/mobile/tests/company-candidates.test.mjs` `e37d04a92b8df9999369d2c984419141541c762b` 100644
- `apps/mobile/tests/company-dashboard-actions.test.mjs` `01cd94d601274d78940c7cc30003830ca9ca8a53` 100644
- `apps/mobile/tests/company-dashboard.test.mjs` `6c5a7a3c1dc0df2bc505756a88991e7ad4e6ac9a` 100644
- `apps/mobile/tests/company-job-publication.test.mjs` `0f4437a3555309b6599976aec9c31a5b692d97b0` 100644
- `apps/mobile/tests/company-members.test.mjs` `9897a83bd52a3a19c3bdf4f940a787edc397253a` 100644
- `apps/mobile/tests/company-publication-context-deadline.test.mjs` `010543d05c7716ad3cb4cfc48567f220086c4ae3` 100644
- `apps/mobile/tests/company-readonly.test.mjs` `1b1d09278a6b6321a90852bccd20582037e7b2ed` 100644
- `apps/mobile/tests/company-replacement-ack-uuid.test.mjs` `a53cd57ec830d2c6faf7667c954c5dbf267f7776` 100644
- `apps/mobile/tests/company-replacements.test.mjs` `456bdc4dd6a3ca86e36e7289b1d39eb960342833` 100644
- `apps/mobile/tests/company-safety.test.mjs` `570bea7965d597a837a1cf1835a93f4fc87f1f19` 100644
- `apps/mobile/tests/company-talents.test.mjs` `155d414d3aef54db23dc8eedb7c854d8a45e0525` 100644
- `apps/mobile/tests/conversation-calendar.test.mjs` `403aa9317aa7f82b3042b56ae758cdfe5c9f0176` 100644
- `apps/mobile/tests/conversation-controller-cleanup.test.mjs` `9c3cdbf55372ec8387e5bfcadfb8d7dd2f175297` 100644
- `apps/mobile/tests/conversation-read-deadline.test.mjs` `fd83e07ff77f5c4ef84f4eca771fe81df99e435c` 100644
- `apps/mobile/tests/conversation-send-screen-deadline.test.mjs` `580ab20f9914bf4d6ca8f1adf9beb0fe4cd43eb6` 100644
- `apps/mobile/tests/conversation.test.mjs` `457e155044d518faaee0650cef135468a02838e6` 100644
- `apps/mobile/tests/copilot-response.test.mjs` `ed2136aee8c40a466a8dc51530a104015ef4b2b7` 100644
- `apps/mobile/tests/copilot-screen-deadline.test.mjs` `fc55d439d39f25d1ed3bbc76c2a8ae6b1e736850` 100644
- `apps/mobile/tests/declared-capabilities.test.mjs` `81be22f88f1842ea449589b88b4545a27dbc009b` 100644
- `apps/mobile/tests/earnings-controller-cleanup.test.mjs` `6cbf6645bfd2b7e36eda1e260c67a9ec1905f43f` 100644
- `apps/mobile/tests/earnings.test.mjs` `d886827477cf1a7e111eb7cb4ad24a3f3c1394cd` 100644
- `apps/mobile/tests/general-support.test.mjs` `97073823b6ea06ab8a72a8f72b9fe7eb68b88dcb` 100644
- `apps/mobile/tests/home-cards.test.mjs` `d60371e0bcb12e97b8af1d2c50a4cd3944241d56` 100644
- `apps/mobile/tests/interest-screen-deadline.test.mjs` `009ed1bd4db47b102223474e16bcdbbac5bd00f0` 100644
- `apps/mobile/tests/invitation-accept-deadline.test.mjs` `b276e85f116dccca5fb6f800d9a4cb7e2e5a9ade` 100644
- `apps/mobile/tests/invitation-create-deadline.test.mjs` `52973e05433b4f4cdb602d0fbbbfd8d02b982265` 100644
- `apps/mobile/tests/jobs-read-controller-cleanup.test.mjs` `c39715bb7f543cee59eef58b4be351a13ee3ed91` 100644
- `apps/mobile/tests/jobs.test.mjs` `5ed8e51d785af4c54de11e3a61bca09426b7a95e` 100644
- `apps/mobile/tests/member-support-calendar.test.mjs` `6dd1fe043e2822357c5e9f090ea197b2b924c4e4` 100644
- `apps/mobile/tests/notifications-read-deadline.test.mjs` `508bb7c7778d868a2c21b7059dd10c10bc0ae86f` 100644
- `apps/mobile/tests/notifications-write-deadline.test.mjs` `ffcd9625f56d5af2a394db0da37f1a993b80a6de` 100644
- `apps/mobile/tests/notifications.test.mjs` `bd21ae0efa3fa6c8f99a1e573490f745de48b98e` 100644
- `apps/mobile/tests/operations-deadline-screen.test.mjs` `ddadf21ddd0895fe35d9c4df9d6ccfe8d3b53710` 100644
- `apps/mobile/tests/passport-history.test.mjs` `67c1c472ef9292e984bdbfb716813068473af5de` 100644
- `apps/mobile/tests/passport-safety-calendar.test.mjs` `5ad0bde5ee19381be2115ba5687c428585580e85` 100644
- `apps/mobile/tests/planner-screen-deadline.test.mjs` `5bb08d09cc4af4b37c37a63de68273719a2c43a2` 100644
- `apps/mobile/tests/primary-read-deadline.test.mjs` `ee297621b25e80f12f203837c1d2b42f23df242d` 100644
- `apps/mobile/tests/privacy-actions.test.mjs` `0a69cc2358b1ed13b87f84baf11b8a8eab9447e4` 100644
- `apps/mobile/tests/privacy-requests.test.mjs` `e5095d9047542a5414519422efd5e891e906fcd2` 100644
- `apps/mobile/tests/privacy-write-deadline.test.mjs` `f9783551999b68589bdbbff2d9f03db6a9d6808d` 100644
- `apps/mobile/tests/professional-home.test.mjs` `d87761c9e81a48a6a3bb89f72563efee514a4ad4` 100644
- `apps/mobile/tests/professional-profile.test.mjs` `7898ada26ea546fc3137a688e86478fb10332430` 100644
- `apps/mobile/tests/professional-safety.test.mjs` `8fc94c9216dbad9b5fc483e0837f5d69a1881443` 100644
- `apps/mobile/tests/professional-support.test.mjs` `b2c5967bf7e4cdc270d68205b2d0e96009b4109c` 100644
- `apps/mobile/tests/profile-analytics-read-deadline.test.mjs` `2df00828279c9660a8ed365f1a3be149169cae7e` 100644
- `apps/mobile/tests/profile-save-screen-deadline.test.mjs` `bb11da6d351fa2026fba12eec293e63e42b103cd` 100644
- `apps/mobile/tests/profile-submit.test.mjs` `3e3dd073d8c642ffabbd325cc34350bac8d33164` 100644
- `apps/mobile/tests/publication-screen-uncertain-deadline.test.mjs` `9d11388afedbbe01e6ac15be0d9558e5d5328513` 100644
- `apps/mobile/tests/replacement-create-screen-deadline.test.mjs` `d0423c9b93767886251470009fede3a8ad0e34c3` 100644
- `apps/mobile/tests/replacement-match-screen-deadline.test.mjs` `a297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76` 100644
- `apps/mobile/tests/replacement-read-controller-cleanup.test.mjs` `3a0f44b631e6a0cce8cb74e22ea7607e4db87a3c` 100644
- `apps/mobile/tests/replacement-select-screen-deadline.test.mjs` `747753e9f044c02377a149a815211e5117ea58bc` 100644
- `apps/mobile/tests/response-calendar-contract.test.mjs` `630e26b4037cd59c17713451c2d34aa98b4917ba` 100644
- `apps/mobile/tests/revoke-screen-deadline.test.mjs` `a64a7963d655e4e1d706f3455ee5d96f92fc2849` 100644
- `apps/mobile/tests/secondary-read-deadline.test.mjs` `cc641c6180ad8ce624220e41bb5da3f980f2b466` 100644
- `apps/mobile/tests/session-clear.test.mjs` `ac626a1e1e2b3f5873da15c129e0b5f7101ad454` 100644
- `apps/mobile/tests/session-context.test.mjs` `f36b32432e8cd4654954445e1359812c4ed098af` 100644
- `apps/mobile/tests/session-tenant.test.mjs` `e40e2d1932c825cd61c8ebe489fc05e317293813` 100644
- `apps/mobile/tests/session-transaction.test.mjs` `6b60b6e08030e12a55ea002996caee7929341ae6` 100644
- `apps/mobile/tests/signin-screen-deadline.test.mjs` `3d188e71b180978bf900edcff96b32c4df1de41b` 100644
- `apps/mobile/tests/signin.test.mjs` `a580a51b608116701024ff5c102d76b0bb1712a4` 100644
- `apps/mobile/tests/signout-screen-deadline.test.mjs` `07f5b11eb3dfeea58a271c8caf027aade76ed359` 100644
- `apps/mobile/tests/signup-screen-deadline.test.mjs` `4f92e840adb8dfa6eb1c6fb941fd8061c1257093` 100644
- `apps/mobile/tests/signup-screen.test.mjs` `eace3ff93514dd1d182006e598136a057d352509` 100644
- `apps/mobile/tests/signup.test.mjs` `483ace20f18b2cd7053be06a50c91004ec15545f` 100644
- `apps/mobile/tests/startup-route.test.mjs` `242d7516e9c090a817ad8ae88a6daf9497e77a8b` 100644
- `apps/mobile/tests/startup-screen-deadline.test.mjs` `ae28131f4a72e5c71a6603d5ba31464c9f3e988b` 100644
- `apps/mobile/tests/support-calendar.test.mjs` `26e4c07812c7b020c68c7f3c1d2f9483e327c978` 100644
- `apps/mobile/tests/support-history-read-deadline.test.mjs` `408c4a5458e3baa4b23554cc2bfde807071db8cd` 100644
- `apps/mobile/tests/support-history-screen.test.mjs` `537f3e97b1cbcfbe8ac9efaf7a90adcb6ecc685f` 100644
- `apps/mobile/tests/support-intent.test.mjs` `bce844ae4c40f452c4d9db3961beaccff97d2108` 100644
- `apps/mobile/tests/support-recovery-screen.test.mjs` `9c041fff637ecf15064c828805cef36dad133786` 100644
- `apps/mobile/tests/support-request-screen.test.mjs` `c833939e03e63a17abbd9b195f631c6675871e64` 100644
- `apps/mobile/tests/support-submission-calendar.test.mjs` `7783fea5e432339b8cf4cc417c2fad6ff9fe6949` 100644
- `apps/mobile/tests/support-submission.test.mjs` `35845a334a6e271a976fd8ea1dc935833dc8ad58` 100644
- `apps/mobile/tests/talents-safety-read-deadline.test.mjs` `547ae928eda25b2ab28ac64f90b3028d275fe653` 100644
- `apps/mobile/tests/teams-read-deadline.test.mjs` `fa39a5639095d53b0e9f6491c4a926e47eeb9236` 100644
- `apps/mobile/tests/teams.test.mjs` `b202b682a7fbd4977fd99d49156bb7802aadb2f7` 100644
- `apps/mobile/tests/window-ack-calendar.test.mjs` `1bb7956ba411c2e93c03f5c0e2fe2addfff6cb1a` 100644
- `apps/mobile/tsconfig.json` `aee4c01aa16c5c63c241fe3d76cbff8d020081ca` 100644
- `.github/workflows/ci.yml` `b42bd9e89aa8052e2d1d9e36c63b4dee621b4e25` 100644
- `package.json` `936bb3649f5bb1b9810039ba35d339189f0a530c` 100644
- `pnpm-lock.yaml` `c1a67de447f42375a02a05a03661037262f9cd8d` 100644
- `pnpm-workspace.yaml` `b98f8b436f1d0dc6f3c11a4f905bdeb06fed9c65` 100644
- `tsconfig.base.json` `616448a7bb986fb1f524e58dc84e115ae330eec1` 100644
- `apps/api/package.json` `9a4a75a94b50730bbe129c51965b30656605b49d` 100644
- `scripts/android-standalone-smoke.sh` `7d7dac1cdd906cd40515c23bab54cdf59376553c` 100644
- `scripts/build-android-pilot.sh` `5f4f95c64a8c43f9744b1bfd5fbb9ec1180a2f42` 100644
- `scripts/tests/android-standalone-smoke.test.mjs` `56d89b19623b5ad07adb4c31632d6019fabc5e9c` 100644
- `.github/workflows/pilot-android.yml` `d6c9c21d00e8d038211d155085d77af8cad59dff` 100644
- `.github/workflows/standalone-pilot-apk.yml` `e0fc5f871dc3b498f71a38ff932c83b48716c35f` 100644

## Fontes modificadas integrais

### apps/api/src/main.ts

```typescript
import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import { privateApplicationLogger, privateHttpLogger } from './privacy-logging';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { parseCorsOrigins } from './cors';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: privateHttpLogger, requestIdHeader: false, genReqId: () => randomUUID() }),
    { rawBody: true, logger: privateApplicationLogger },
  );

  app.enableShutdownHooks();
  app.setGlobalPrefix('v1');

  const corsOrigins = parseCorsOrigins(process.env.CORS_ORIGINS);
  if (corsOrigins.length > 0) {
    app.enableCors({
      origin: corsOrigins,
      methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['authorization', 'content-type', 'x-tenant-id'],
    });
  }

  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? '0.0.0.0';

  await app.listen(port, host);
}

void bootstrap().catch(error=>{privateApplicationLogger.error(error,'Bootstrap');process.exitCode=1;});

```

### apps/api/src/migrate.ts

```typescript
import { privateOperationFailure } from './privacy-logging';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Pool, PoolClient } from 'pg';

const MIGRATION_LOCK_KEY = 781245901;

function migrationBody(sql:string):string {
  return sql.replace(/^\s*BEGIN;\s*/i,'').replace(/\s*COMMIT;\s*$/i,'').trim();
}
function checksum(sql:string):string {
  return createHash('sha256').update(sql).digest('hex');
}
async function ensureLedger(client:PoolClient){
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations(
    filename text PRIMARY KEY,
    checksum text NOT NULL,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);
}
async function applyMigration(client:PoolClient,filename:string,sql:string){
  const hash=checksum(sql);
  const existing=await client.query<{checksum:string}>('SELECT checksum FROM schema_migrations WHERE filename=$1',[filename]);
  if(existing.rows[0]){
    if(existing.rows[0].checksum!==hash)throw new Error(`migration_checksum_mismatch:${filename}`);
    process.stdout.write(`skip ${filename}\n`);
    return;
  }
  await client.query('BEGIN');
  try{
    await client.query(migrationBody(sql));
    await client.query('INSERT INTO schema_migrations(filename,checksum) VALUES($1,$2)',[filename,hash]);
    await client.query('COMMIT');
    process.stdout.write(`applied ${filename}\n`);
  }catch(error){
    await client.query('ROLLBACK');
    throw error;
  }
}

async function main(){
  if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL_required');
  const repoRoot=resolve(__dirname,'../../..');
  const migrationsDir=resolve(repoRoot,'packages/db/migrations');
  const rolesSql=await readFile(resolve(repoRoot,'packages/db/infra/roles.sql'),'utf8');
  const filenames=(await readdir(migrationsDir)).filter(x=>/^\d+.*\.sql$/.test(x)).sort();
  const pool=new Pool({connectionString:process.env.DATABASE_URL});
  const client=await pool.connect();
  try{
    await client.query('SELECT pg_advisory_lock($1)',[MIGRATION_LOCK_KEY]);
    await client.query(rolesSql);
    await ensureLedger(client);
    for(const filename of filenames){
      const sql=await readFile(resolve(migrationsDir,filename),'utf8');
      await applyMigration(client,filename,sql);
    }
  }finally{
    try{await client.query('SELECT pg_advisory_unlock($1)',[MIGRATION_LOCK_KEY]);}catch{}
    client.release();
    await pool.end();
  }
}

if(require.main===module){void main().catch(error=>{privateOperationFailure('migrate',error);process.exitCode=1;});}

export { migrationBody, checksum };

```

### apps/api/src/privacy-retention.ts

```typescript
import { privateOperationFailure, privateOperationCode } from './privacy-logging';
import { Pool } from 'pg';

const APPLY=process.argv.includes('--apply');
const GEO_DAYS=30;
const PROFILE_DAYS=30;
const CHAT_DAYS=730;
const RETENTION_LOCK_KEY='privacy-retention';

function errorCode(error:unknown){return privateOperationCode(error);}

async function main(){
  const maintenanceUrl=process.env.PRIVACY_MAINTENANCE_DATABASE_URL?.trim();
  const defaultUrl=process.env.DATABASE_URL?.trim();
  const operatorId=process.env.PRIVACY_OPERATOR_ID?.trim();
  if(APPLY&&!maintenanceUrl)throw new Error('PRIVACY_MAINTENANCE_DATABASE_URL_required_for_apply');
  if(APPLY&&!operatorId)throw new Error('PRIVACY_OPERATOR_ID_required_for_apply');
  if(operatorId&&operatorId.length>200)throw new Error('PRIVACY_OPERATOR_ID_too_long');
  const connectionString=maintenanceUrl||defaultUrl;
  if(!connectionString)throw new Error('DATABASE_URL_required');
  const pool=new Pool({connectionString});
  try{
    const expiredSessions=(await pool.query<{count:number}>('SELECT count(*)::int AS count FROM sessions WHERE expires_at<=now()')).rows[0]?.count??0;
    const geoCandidates=(await pool.query<{count:number}>(`SELECT count(*)::int AS count
      FROM work_assignments wa
      JOIN professional_profiles p ON p.id=wa.professional_id
      WHERE wa.status IN ('completed','cancelled')
        AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
        AND (wa.check_in_lat IS NOT NULL OR wa.check_in_lng IS NOT NULL OR wa.check_out_lat IS NOT NULL OR wa.check_out_lng IS NOT NULL)
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)`,[GEO_DAYS])).rows[0]?.count??0;
    const profileCandidates=(await pool.query<{count:number}>(`SELECT count(*)::int AS count
      FROM professional_profiles p
      JOIN identities i ON i.id=p.identity_id
      WHERE i.deactivated_at IS NOT NULL
        AND i.deactivated_at < now()-($1::int * interval '1 day')
        AND (p.display_name<>'Deleted professional' OR p.home_city IS NOT NULL OR p.primary_role IS NOT NULL)
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=i.id)`,[PROFILE_DAYS])).rows[0]?.count??0;
    const chatCandidates=(await pool.query<{count:number}>(`SELECT count(*)::int AS count
      FROM conversation_messages m
      JOIN conversations c ON c.id=m.conversation_id
      JOIN work_assignments wa ON wa.id=c.assignment_id
      JOIN professional_profiles p ON p.id=wa.professional_id
      WHERE wa.status IN ('completed','cancelled')
        AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)
        AND NOT EXISTS (
          SELECT 1
          FROM conversation_messages participant
          JOIN privacy_legal_holds h ON h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=participant.sender_identity_id
          WHERE participant.conversation_id=c.id
        )`,[CHAT_DAYS])).rows[0]?.count??0;

    let runId:string|null=null;
    if(APPLY){
      const client=await pool.connect();
      let lockHeld=false;
      try{
        const acquired=(await client.query<{acquired:boolean}>(`SELECT pg_try_advisory_lock(hashtextextended($1,0)) AS acquired`,[RETENTION_LOCK_KEY])).rows[0]?.acquired??false;
        if(!acquired)throw new Error('privacy_retention_already_running');
        lockHeld=true;

        await client.query(`UPDATE privacy_retention_runs
          SET status='failed',error_code='abandoned_before_completion',completed_at=now()
          WHERE status='running'`);
        const run=(await client.query<{id:string}>(`INSERT INTO privacy_retention_runs(operator_id,status,expired_sessions,geo_candidates,profile_candidates,chat_candidates)
          VALUES($1,'running',$2,$3,$4,$5) RETURNING id`,[operatorId,expiredSessions,geoCandidates,profileCandidates,chatCandidates])).rows[0];
        if(!run)throw new Error('privacy_retention_run_missing');
        runId=run.id;

        await client.query('BEGIN');
        await client.query('DELETE FROM sessions WHERE expires_at<=now()');
        await client.query(`UPDATE work_assignments wa
          SET check_in_lat=NULL,check_in_lng=NULL,check_out_lat=NULL,check_out_lng=NULL
          FROM professional_profiles p
          WHERE p.id=wa.professional_id
            AND wa.status IN ('completed','cancelled')
            AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
            AND (wa.check_in_lat IS NOT NULL OR wa.check_in_lng IS NOT NULL OR wa.check_out_lat IS NOT NULL OR wa.check_out_lng IS NOT NULL)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)`,[GEO_DAYS]);
        await client.query(`UPDATE professional_profiles p
          SET display_name='Deleted professional',home_city=NULL,primary_role=NULL,updated_at=now()
          FROM identities i
          WHERE i.id=p.identity_id
            AND i.deactivated_at IS NOT NULL
            AND i.deactivated_at < now()-($1::int * interval '1 day')
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=i.id)`,[PROFILE_DAYS]);
        await client.query(`DELETE FROM conversation_messages m
          USING conversations c, work_assignments wa, professional_profiles p
          WHERE c.id=m.conversation_id
            AND wa.id=c.assignment_id
            AND p.id=wa.professional_id
            AND wa.status IN ('completed','cancelled')
            AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)
            AND NOT EXISTS (
              SELECT 1
              FROM conversation_messages participant
              JOIN privacy_legal_holds h ON h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=participant.sender_identity_id
              WHERE participant.conversation_id=c.id
            )`,[CHAT_DAYS]);
        await client.query(`DELETE FROM conversations c
          USING work_assignments wa, professional_profiles p
          WHERE wa.id=c.assignment_id
            AND p.id=wa.professional_id
            AND wa.status IN ('completed','cancelled')
            AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
            AND NOT EXISTS (SELECT 1 FROM conversation_messages m WHERE m.conversation_id=c.id)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)`,[CHAT_DAYS]);
        await client.query("UPDATE privacy_retention_runs SET status='completed',completed_at=now() WHERE id=$1",[runId]);
        await client.query('COMMIT');
      }catch(error){
        await client.query('ROLLBACK').catch(()=>undefined);
        if(runId){
          await client.query("UPDATE privacy_retention_runs SET status='failed',error_code=$2,completed_at=now() WHERE id=$1",[runId,errorCode(error)]).catch(()=>undefined);
        }
        throw error;
      }finally{
        if(lockHeld){await client.query(`SELECT pg_advisory_unlock(hashtextextended($1,0))`,[RETENTION_LOCK_KEY]).catch(()=>undefined);}
        client.release();
      }
    }

    process.stdout.write(JSON.stringify({mode:APPLY?'apply':'dry-run',runId,operatorId:APPLY?operatorId:null,expiredSessions,geoCandidates,profileCandidates,chatCandidates,geoDays:GEO_DAYS,profileDays:PROFILE_DAYS,chatDays:CHAT_DAYS})+'\n');
  }finally{await pool.end();}
}

if(require.main===module){void main().catch(error=>{privateOperationFailure('privacy_retention',error);process.exitCode=1;});}

```

### apps/api/src/privacy-requests-ops.ts

```typescript
import { privateOperationFailure } from './privacy-logging';
import { Pool } from 'pg';

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const connectionString=process.env.PRIVACY_MAINTENANCE_DATABASE_URL?.trim();
const operatorId=process.env.PRIVACY_OPERATOR_ID?.trim();

function required(value:string|undefined,name:string){const v=value?.trim();if(!v)throw new Error(`${name}_required`);return v;}
function bounded(value:string|undefined,name:string,max=2000){const v=required(value,name);if(v.length>max)throw new Error(`${name}_too_long`);return v;}

async function main(){
  if(!connectionString)throw new Error('PRIVACY_MAINTENANCE_DATABASE_URL_required');
  const [command,id,...rest]=process.argv.slice(2);
  const pool=new Pool({connectionString});
  try{
    if(command==='list'){
      const rows=(await pool.query(`SELECT id,identity_id AS "identityId",request_type AS "requestType",request_details AS "requestDetails",status,created_at AS "createdAt",updated_at AS "updatedAt"
        FROM privacy_requests WHERE status IN ('submitted','reviewing') ORDER BY created_at ASC LIMIT 100`)).rows;
      process.stdout.write(JSON.stringify(rows,null,2)+'\n');return;
    }
    const handledBy=bounded(operatorId,'PRIVACY_OPERATOR_ID',200);
    if(!id||!UUID_RE.test(id))throw new Error('request_id_invalid');
    if(command==='start'){
      const evidenceRef=bounded(rest[0],'evidence_ref',500);
      const row=(await pool.query(`UPDATE privacy_requests SET status='reviewing',evidence_ref=$2,handled_by=$3,updated_at=now()
        WHERE id=$1 AND status='submitted' RETURNING id,status`,[id,evidenceRef,handledBy])).rows[0];
      if(!row)throw new Error('privacy_request_not_startable');
      process.stdout.write(JSON.stringify(row)+'\n');return;
    }
    if(command==='complete'||command==='partial'||command==='reject'){
      const resolutionCode=bounded(rest[0],'resolution_code',200);
      const evidenceRef=bounded(rest[1],'evidence_ref',500);
      const operatorNote=rest.slice(2).join(' ').trim();
      if(operatorNote.length>2000)throw new Error('operator_note_too_long');
      const status=command==='complete'?'completed':command==='partial'?'partially_completed':'rejected';
      const row=(await pool.query(`UPDATE privacy_requests
        SET status=$2,resolution_code=$3,evidence_ref=$4,operator_note=$5,handled_by=$6,updated_at=now(),completed_at=now()
        WHERE id=$1 AND status IN ('submitted','reviewing') RETURNING id,status,resolution_code AS "resolutionCode",evidence_ref AS "evidenceRef",handled_by AS "handledBy"`,[id,status,resolutionCode,evidenceRef,operatorNote||null,handledBy])).rows[0];
      if(!row)throw new Error('privacy_request_not_finishable');
      process.stdout.write(JSON.stringify(row)+'\n');return;
    }
    throw new Error('usage: privacy-requests-ops <list|start|complete|partial|reject> [requestId] [resolution/evidence/note]');
  }finally{await pool.end();}
}

void main().catch(error=>{privateOperationFailure('privacy_requests',error);process.exitCode=1;});

```

### apps/api/src/privacy-legal-holds-ops.ts

```typescript
import { privateOperationFailure } from './privacy-logging';
import { Pool } from 'pg';

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const connectionString=process.env.PRIVACY_MAINTENANCE_DATABASE_URL?.trim();
const operatorId=process.env.PRIVACY_OPERATOR_ID?.trim();
const SCOPE_TYPES=new Set(['identity','assignment','safety_case','financial_record']);

function required(value:string|undefined,name:string){const v=value?.trim();if(!v)throw new Error(`${name}_required`);return v;}
function bounded(value:string|undefined,name:string,max:number){const v=required(value,name);if(v.length>max)throw new Error(`${name}_too_long`);return v;}
function uuid(value:string|undefined,name:string){const v=required(value,name);if(!UUID_RE.test(v))throw new Error(`${name}_invalid`);return v;}
function futureDate(value:string|undefined,name:string){const raw=required(value,name);const d=new Date(raw);if(Number.isNaN(d.getTime()))throw new Error(`${name}_invalid`);if(d.getTime()<=Date.now())throw new Error(`${name}_must_be_future`);return d.toISOString();}

async function main(){
  if(!connectionString)throw new Error('PRIVACY_MAINTENANCE_DATABASE_URL_required');
  const [command,...args]=process.argv.slice(2);
  const pool=new Pool({connectionString});
  try{
    if(command==='list'){
      const rows=(await pool.query(`SELECT id,tenant_id AS "tenantId",scope_type AS "scopeType",scope_id AS "scopeId",reason,evidence_ref AS "evidenceRef",starts_at AS "startsAt",review_at AS "reviewAt",created_by AS "createdBy",reviewed_at AS "reviewedAt",reviewed_by AS "reviewedBy",review_note AS "reviewNote"
        FROM privacy_legal_holds WHERE released_at IS NULL ORDER BY COALESCE(review_at,'infinity'::timestamptz),created_at LIMIT 200`)).rows;
      process.stdout.write(JSON.stringify(rows,null,2)+'\n');return;
    }
    if(command==='history'){
      const holdId=uuid(args[0],'hold_id');
      const rows=(await pool.query(`SELECT id,legal_hold_id AS "legalHoldId",reviewed_by AS "reviewedBy",review_note AS "reviewNote",previous_review_at AS "previousReviewAt",next_review_at AS "nextReviewAt",created_at AS "createdAt"
        FROM privacy_legal_hold_reviews WHERE legal_hold_id=$1 ORDER BY created_at,id`,[holdId])).rows;
      process.stdout.write(JSON.stringify(rows,null,2)+'\n');return;
    }
    const handledBy=bounded(operatorId,'PRIVACY_OPERATOR_ID',200);
    if(command==='create'){
      const [scopeTypeRaw,scopeIdRaw,reasonRaw,evidenceRefRaw,reviewAtRaw]=args;
      const scopeType=required(scopeTypeRaw,'scope_type');
      if(!SCOPE_TYPES.has(scopeType))throw new Error('scope_type_invalid');
      const scopeId=uuid(scopeIdRaw,'scope_id');
      const reason=bounded(reasonRaw,'reason',1000);
      const evidenceRef=bounded(evidenceRefRaw,'evidence_ref',500);
      const reviewAt=futureDate(reviewAtRaw,'review_at');
      let tenantId:string|null=null;
      if(scopeType==='identity'){
        const target=(await pool.query('SELECT id FROM identities WHERE id=$1',[scopeId])).rows[0];
        if(!target)throw new Error('legal_hold_scope_not_found');
      }else if(scopeType==='assignment'){
        const target=(await pool.query<{tenantId:string}>('SELECT tenant_id AS "tenantId" FROM work_assignments WHERE id=$1',[scopeId])).rows[0];
        if(!target)throw new Error('legal_hold_scope_not_found');tenantId=target.tenantId;
      }else if(scopeType==='safety_case'){
        const target=(await pool.query<{tenantId:string}>('SELECT tenant_id AS "tenantId" FROM safety_cases WHERE id=$1',[scopeId])).rows[0];
        if(!target)throw new Error('legal_hold_scope_not_found');tenantId=target.tenantId;
      }else{
        const target=(await pool.query<{tenantId:string}>('SELECT tenant_id AS "tenantId" FROM earnings_ledger WHERE id=$1',[scopeId])).rows[0];
        if(!target)throw new Error('legal_hold_scope_not_found');tenantId=target.tenantId;
      }
      const row=(await pool.query(`INSERT INTO privacy_legal_holds(tenant_id,scope_type,scope_id,reason,evidence_ref,review_at,created_by)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING id,tenant_id AS "tenantId",scope_type AS "scopeType",scope_id AS "scopeId",reason,evidence_ref AS "evidenceRef",review_at AS "reviewAt",created_by AS "createdBy"`,[tenantId,scopeType,scopeId,reason,evidenceRef,reviewAt,handledBy])).rows[0];
      process.stdout.write(JSON.stringify(row)+'\n');return;
    }
    if(command==='review'){
      const holdId=uuid(args[0],'hold_id');
      const reviewNote=bounded(args[1],'review_note',2000);
      const nextReviewAt=futureDate(args[2],'next_review_at');
      const client=await pool.connect();
      try{
        await client.query('BEGIN');
        const hold=(await client.query<{reviewAt:string|null}>(`SELECT review_at AS "reviewAt" FROM privacy_legal_holds WHERE id=$1 AND released_at IS NULL FOR UPDATE`,[holdId])).rows[0];
        if(!hold)throw new Error('legal_hold_not_reviewable');
        const history=(await client.query<{id:string}>(`INSERT INTO privacy_legal_hold_reviews(legal_hold_id,reviewed_by,review_note,previous_review_at,next_review_at)
          VALUES($1,$2,$3,$4,$5) RETURNING id`,[holdId,handledBy,reviewNote,hold.reviewAt,nextReviewAt])).rows[0];
        if(!history)throw new Error('legal_hold_review_history_missing');
        const row=(await client.query(`UPDATE privacy_legal_holds SET reviewed_at=now(),reviewed_by=$2,review_note=$3,review_at=$4
          WHERE id=$1
          RETURNING id,reviewed_at AS "reviewedAt",reviewed_by AS "reviewedBy",review_note AS "reviewNote",review_at AS "reviewAt"`,[holdId,handledBy,reviewNote,nextReviewAt])).rows[0];
        await client.query('COMMIT');
        process.stdout.write(JSON.stringify({...row,reviewHistoryId:history.id})+'\n');return;
      }catch(error){await client.query('ROLLBACK').catch(()=>undefined);throw error;}finally{client.release();}
    }
    if(command==='release'){
      const holdId=uuid(args[0],'hold_id');
      const releaseReason=bounded(args.slice(1).join(' '),'release_reason',1000);
      const row=(await pool.query(`UPDATE privacy_legal_holds SET released_at=now(),released_by=$2,release_reason=$3
        WHERE id=$1 AND released_at IS NULL
        RETURNING id,released_at AS "releasedAt",released_by AS "releasedBy",release_reason AS "releaseReason"`,[holdId,handledBy,releaseReason])).rows[0];
      if(!row)throw new Error('legal_hold_not_releasable');
      process.stdout.write(JSON.stringify(row)+'\n');return;
    }
    throw new Error('usage: privacy-legal-holds-ops <list|history|create|review|release> ...');
  }finally{await pool.end();}
}

void main().catch(error=>{privateOperationFailure('privacy_legal_holds',error);process.exitCode=1;});

```

### apps/mobile/lib/session.ts

```typescript
import * as SecureStore from 'expo-secure-store';
import {createSessionQueue,persistVerifiedSession,clearExpectedSession,persistExpectedTenant} from './session-transaction';
import type {SessionState,SessionAdapter} from './session-transaction';
const queue=createSessionQueue();

const KEY = 'mlivretrabalho.accessToken';
const TENANT_KEY = 'mlivretrabalho.tenantId';

async function safeGet(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.warn('SecureStore read failed; continuing without persisted value.');
    return null;
  }
}

async function safeSet(key: string, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.warn('SecureStore write failed.');
  }
}

async function safeDelete(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.warn('SecureStore delete failed.');
  }
}

export const saveSession = (token: string) => queue.run(()=>safeSet(KEY, token));
export const getSession = () => queue.run(()=>safeGet(KEY));
export const clearSession = () => queue.run(()=>safeDelete(KEY));

export const authHeaders = async (): Promise<Record<string, string>> => {
  const token = await getSession();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const saveTenant = (tenantId: string) => queue.run(()=>safeSet(TENANT_KEY, tenantId));
export const getTenant = () => queue.run(()=>safeGet(TENANT_KEY));
export const clearTenant = () => queue.run(()=>safeDelete(TENANT_KEY));

export const authenticatedTenantHeaders = async (): Promise<Record<string, string>> => {
  const [token, tenantId] = await queue.run(()=>Promise.all([safeGet(KEY), safeGet(TENANT_KEY)]));
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(tenantId ? { 'x-tenant-id': tenantId } : {}),
  };
};

const verifiedStorage:SessionAdapter={
  read:async()=>{const [token,tenantId]=await Promise.all([SecureStore.getItemAsync(KEY),SecureStore.getItemAsync(TENANT_KEY)]);return {token,tenantId};},
  write:async state=>{await SecureStore.deleteItemAsync(TENANT_KEY);if(state.token)await SecureStore.setItemAsync(KEY,state.token);else await SecureStore.deleteItemAsync(KEY);if(state.tenantId)await SecureStore.setItemAsync(TENANT_KEY,state.tenantId);}
};
export const saveVerifiedSignin = (next:SessionState,expectedToken:string|null,isCurrent:()=>boolean) => queue.run(()=>persistVerifiedSession(verifiedStorage,next,expectedToken,isCurrent));
export const clearSessionForAuthorization = (authorization?:string) => {
  if(authorization&&!authorization.startsWith('Bearer '))return Promise.resolve('stale' as const);
  const expectedToken=authorization?.slice(7)||null;
  return queue.run(()=>clearExpectedSession(verifiedStorage,expectedToken));
};
export const saveTenantForContext = (tenantId:string,headers:Record<string,string>,isCurrent:()=>boolean) => {
 const authorization=headers.Authorization;
 if(!authorization?.startsWith('Bearer ')||!authorization.slice(7))return Promise.resolve('stale' as const);
 const expected={token:authorization.slice(7),tenantId:headers['x-tenant-id']||null};
 return queue.run(()=>persistExpectedTenant(verifiedStorage,tenantId,expected,isCurrent));
};

```

### apps/api/src/privacy-logging.ts

```typescript
import type { LoggerService } from '@nestjs/common';
import type { FastifyLoggerOptions } from 'fastify';

const methods=new Set(['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS']);
const components=new Set(['NestFactory','InstanceLoader','RoutesResolver','RouterExplorer','NestApplication','ExceptionsHandler','Bootstrap']);
const errorTypes=new Set(['Error','TypeError','RangeError','SyntaxError','HttpException','BadRequestException','UnauthorizedException','ForbiddenException','NotFoundException']);
const databaseCodes=new Set(['08000','08003','08006','22P02','22001','22003','23502','23503','23505','23514','40001','40P01','42501','57014','57P01','P0001']);
const operationReasons=new Set([
 'DATABASE_URL_required','PRIVACY_MAINTENANCE_DATABASE_URL_required','PRIVACY_MAINTENANCE_DATABASE_URL_required_for_apply','PRIVACY_OPERATOR_ID_required','PRIVACY_OPERATOR_ID_required_for_apply','PRIVACY_OPERATOR_ID_too_long',
 'privacy_retention_already_running','privacy_retention_run_missing','privacy_request_not_startable','privacy_request_not_finishable','operator_note_too_long','request_id_invalid',
 'scope_type_invalid','legal_hold_scope_not_found','legal_hold_not_reviewable','legal_hold_review_history_missing','legal_hold_not_releasable',
 'usage: privacy-requests-ops <list|start|complete|partial|reject> [requestId] [resolution/evidence/note]',
 'usage: privacy-legal-holds-ops <list|history|create|review|release> ...',
 ...['tenant_id','scope_type','scope_id','reason','evidence_ref','review_at','hold_id','review_note','next_review_at','release_reason','resolution_code'].flatMap(field=>['_required','_too_long','_invalid','_must_be_future'].map(suffix=>field+suffix)),
]);
const object=(value:unknown):Record<string,unknown>=>value!==null&&typeof value==='object'?value as Record<string,unknown>:{};

export function privateOperationCode(value:unknown):string{
 const error=object(value);
 if(typeof error.message==='string'&&operationReasons.has(error.message))return error.message;
 if(typeof error.message==='string'&&/^migration_checksum_mismatch:/.test(error.message))return 'migration_checksum_mismatch';
 if(typeof error.code==='string'&&databaseCodes.has(error.code))return 'database_'+error.code;
 return 'unexpected_error';
}

export function privateOperationFailure(operation:string,value:unknown):void{
 const name=['migrate','privacy_retention','privacy_requests','privacy_legal_holds'].includes(operation)?operation:'operation';
 process.stderr.write(JSON.stringify({event:'operation_error',operation:name,code:privateOperationCode(value),error:privateErrorMetadata(value)})+'\n');
}

// Diagnostic metadata is allowlisted. Messages, stacks, headers, cookies, URLs,
// raw route parameters, request/response bodies and SQL details never enter a log.
export function privateErrorMetadata(value:unknown):Record<string,unknown>{
 const error=object(value);
 return {type:typeof error.name==='string'&&errorTypes.has(error.name)?error.name:'Error',...(typeof error.code==='string'&&databaseCodes.has(error.code)?{code:error.code}:{})};
}

export function privateHttpMetadata(value:unknown):Record<string,unknown>{
 const fields=object(value),req=object(fields.req),res=object(fields.res),route=object(req.routeOptions).url;
 const record:Record<string,unknown>={event:fields.res?'http_response':fields.req?'http_request':'http_event'};
 if(fields.req){
  record.method=typeof req.method==='string'&&methods.has(req.method)?req.method:'OTHER';
  // routeOptions.url is the registered route pattern, never raw request.url.
  record.route=typeof route==='string'&&route.length<=180&&/^\/v1(?:\/[A-Za-z0-9:_-]+)*$/.test(route)?route:'unmatched';
 }
 if(typeof res.statusCode==='number'&&Number.isInteger(res.statusCode)&&res.statusCode>=100&&res.statusCode<=599)record.statusCode=res.statusCode;
 if(typeof fields.responseTime==='number'&&Number.isFinite(fields.responseTime)&&fields.responseTime>=0)record.elapsedMs=Math.min(fields.responseTime,86400000);
 if(fields.err)record.error=privateErrorMetadata(fields.err);
 return record;
}

export const privateHttpLogger:FastifyLoggerOptions={
 level:'info',
 hooks:{
  logMethod(args,method){
   // Pino's hook runs before interpolation and serialization. Do not forward a
   // free-form message or an unreviewed object, even on unmatched routes/errors.
   Reflect.apply(method,this,[privateHttpMetadata(args[0]),'http_event']);
  },
 },
};

function applicationLog(level:string,message:unknown,parameters:unknown[]):void{
 const context=parameters.at(-1);
 const record={level,event:level==='error'||level==='fatal'?'application_error':'application_event',component:typeof context==='string'&&components.has(context)?context:'Application',...(level==='error'||level==='fatal'?{error:privateErrorMetadata(message)}:{})};
 process.stdout.write(JSON.stringify(record)+'\n');
}

export const privateApplicationLogger:LoggerService={
 log(message:unknown,...parameters:unknown[]){applicationLog('log',message,parameters);},
 warn(message:unknown,...parameters:unknown[]){applicationLog('warn',message,parameters);},
 error(message:unknown,...parameters:unknown[]){applicationLog('error',message,parameters);},
 debug(message:unknown,...parameters:unknown[]){applicationLog('debug',message,parameters);},
 verbose(message:unknown,...parameters:unknown[]){applicationLog('verbose',message,parameters);},
 fatal(message:unknown,...parameters:unknown[]){applicationLog('fatal',message,parameters);},
};

```

### scripts/security-acceptance-e2e.cjs

```javascript
'use strict';
// Synthetic canaries only. This test cannot target a remote API or database.
const assert=require('node:assert/strict');
const {readFileSync,statSync,lstatSync}=require('node:fs');
const {resolve}=require('node:path');
const {createRequire}=require('node:module');
const {randomUUID,createHash}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
let stage='configuration';
async function storageLogContract(){
 const vm=require('node:vm'),{stripTypeScriptTypes}=require('node:module'),{inspect}=require('node:util');
 const evaluate=(path,names,context)=>vm.runInNewContext(stripTypeScriptTypes(readFileSync(path,'utf8').replace(/^import .*$/gm,''),{mode:'transform'}).replace(/\bexport\s+/g,'')+'\n({'+names.join(',')+'})',context);
 const transaction=evaluate('apps/mobile/lib/session-transaction.ts',['createSessionQueue','persistVerifiedSession','clearExpectedSession','persistExpectedTenant'],{});
 const canary='SyntheticNativeError-'+randomUUID(),warnings=[],values=new Map();let fail=true;
 const failure=()=>{const error=new Error(canary);Object.assign(error,{token:canary,details:canary});return error;};
 const SecureStore={getItemAsync:async key=>{if(fail)throw failure();return values.get(key)??null;},setItemAsync:async(key,value)=>{if(fail)throw failure();values.set(key,value);},deleteItemAsync:async key=>{if(fail)throw failure();values.delete(key);}};
 const storage=evaluate('apps/mobile/lib/session.ts',['getSession','saveSession','clearSession','getTenant','saveTenant','clearTenant','saveVerifiedSignin','clearSessionForAuthorization','saveTenantForContext','authenticatedTenantHeaders'],{...transaction,SecureStore,console:{warn:(...args)=>warnings.push(args)}});
 assert.equal(await storage.getSession(),null);assert.equal(await storage.getTenant(),null);
 await storage.saveSession(canary);await storage.saveTenant(canary);await storage.clearSession();await storage.clearTenant();
 assert.equal(warnings.length,6,'Storage warnings must remain observable');
 const leaked=inspect(warnings).includes(canary);console.log('SECURITY_MOBILE_LOG_OBSERVED '+JSON.stringify({actualSource:true,nativeAdapterFixture:true,warnings:warnings.length,canaryDisclosed:leaked,physicalDevice:false}));
 assert.equal(leaked,false,'Mobile diagnostic disclosed the injected storage error');
 fail=false;const token='SyntheticStored-'+randomUUID(),tenant=randomUUID();
 assert.equal(await storage.saveVerifiedSignin({token,tenantId:tenant},null,()=>true),'saved');
 assert.equal(await storage.getSession(),token);assert.equal(await storage.getTenant(),tenant);
 const nextTenant=randomUUID();assert.equal(await storage.saveTenantForContext(nextTenant,{Authorization:'Bearer '+token,'x-tenant-id':tenant},()=>true),'saved');
 assert.equal((await storage.authenticatedTenantHeaders())['x-tenant-id'],nextTenant);
 assert.equal(await storage.clearSessionForAuthorization('Bearer '+token),'cleared');assert.equal(await storage.getSession(),null);assert.equal(await storage.getTenant(),null);
 console.log('SECURITY_MOBILE_LOG_AND_SESSION_PASS '+JSON.stringify({warningsRetained:true,noRawError:true,realQueueAndVerifiedStorageCore:true,nativeSecureStore:false}));
}
async function main(){
 const config=localConfiguration(process.env);
 const logPath=process.env.SECURITY_ACCEPTANCE_API_LOG;
 assert.equal(logPath,'/tmp/mlivre-api.log','Explicit disposable API log required');
 assert.ok(lstatSync(logPath).isFile()&&!lstatSync(logPath).isSymbolicLink(),'Owned CI log must be a regular file');
 const logOffset=statSync(logPath).size;
 const {Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl});await db.connect();
 const suffix=randomUUID().replaceAll('-',''),prefix='security_'+suffix;
 const canaries={password:'SyntheticSecret-'+suffix+'!',query:'SyntheticQuery-'+suffix,path:'SyntheticPath-'+suffix,body:'SyntheticBody-'+suffix,fault:'SyntheticDatabasePII-'+suffix,ownMessage:'SyntheticOwnMessage-'+suffix,foreignMessage:'SyntheticForeignMessage-'+suffix,foreignRating:'SyntheticForeignRating-'+suffix};
 const secrets=[];let requests=0,faultInstalled=false;
 async function call(path,{method='GET',token,tenant,body,status=200,headers={}}={}){
  requests++;
  const response=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(token?{authorization:'Bearer '+token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body!==undefined?{'content-type':'application/json'}:{}),...headers},body:body===undefined?undefined:JSON.stringify(body)});
  const data=await response.json();assert.equal(response.status,status,'HTTP contract '+method+' '+path.split('?')[0].replace(canaries.path,'[fixture]'));return data;
 }
 async function account(label,type='professional'){
  const email='security-'+label+'-'+suffix+'@example.test';secrets.push(email);
  const signup=await call('/v1/auth/signup',{method:'POST',body:{email,password:canaries.password,accountType:type,...(type==='company'?{workspaceName:'Security fixture'}:{})},status:201});
  const auth=await call('/v1/auth/signin',{method:'POST',body:{email,password:canaries.password},status:201});secrets.push(auth.accessToken);
  assert.equal(auth.identity.id,signup.id);return{id:signup.id,tenant:signup.tenantId,token:auth.accessToken,email};
 }
 async function removeFault(){
  if(faultInstalled){await db.query('DROP TRIGGER IF EXISTS '+prefix+' ON public.privacy_requests; DROP FUNCTION IF EXISTS public.'+prefix+'(); DROP SEQUENCE IF EXISTS public.'+prefix+'_attempts;');faultInstalled=false;}
 }
 try{
  const server=(await db.query('SELECT current_database() name')).rows[0];requireLocalDatabasePeer(server,db.connection.stream.remoteAddress);
  stage='authentication-storage';
  const company=await account('company','company'),pro=await account('professional'),outsider=await account('outsider'),limited=await account('limiter');
  for(const actor of [company,pro,outsider,limited]){
   const row=(await db.query('SELECT password_hash FROM identities WHERE id=$1',[actor.id])).rows[0];
   assert.match(row.password_hash,/^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/);assert.ok(!row.password_hash.includes(canaries.password));
   const hash=createHash('sha256').update(actor.token).digest('hex');
   const sessions=(await db.query('SELECT token_hash FROM sessions WHERE identity_id=$1',[actor.id])).rows;
   assert.ok(sessions.some(x=>x.token_hash===hash));assert.ok(sessions.every(x=>x.token_hash!==actor.token));
  }
  stage='concurrent-rate-limit';
  const attempts=await Promise.all(Array.from({length:8},async()=>{
   requests++;const response=await fetch(config.origin+'/v1/auth/signin',{method:'POST',redirect:'error',signal:AbortSignal.timeout(15000),headers:{'content-type':'application/json'},body:JSON.stringify({email:limited.email,password:'SyntheticWrong-'+suffix})});
   const body=await response.json();assert.ok(!JSON.stringify(body).includes(limited.email));return response.status;
  }));
  assert.deepEqual(attempts.sort(),[401,401,401,401,401,401,401,429]);
  const limiter=(await db.query('SELECT failed_count,locked_until>now() locked FROM auth_signin_limits WHERE identity_id=$1',[limited.id])).rows[0];assert.equal(limiter.failed_count,8);assert.equal(limiter.locked,true);
  await call('/v1/auth/signin',{method:'POST',body:{email:limited.email,password:canaries.password},status:429});
  await db.query("UPDATE auth_signin_limits SET locked_until=now()-interval '1 second' WHERE identity_id=$1",[limited.id]);
  const recovered=await call('/v1/auth/signin',{method:'POST',body:{email:limited.email,password:canaries.password},status:201});secrets.push(recovered.accessToken);
  assert.equal((await db.query('SELECT count(*)::int n FROM auth_signin_limits WHERE identity_id=$1',[limited.id])).rows[0].n,0);
  console.log('SECURITY_AUTHENTICATION_CONCURRENCY_PASS '+JSON.stringify({realHTTPPostgres:true,parallelFailures:8,unauthorized:7,locked:1,storedPasswordsScrypt:true,storedTokensSHA256:true,explicitRecovery:true}));
  stage='private-export';
  const profile=await call('/v1/professional-profile',{method:'PUT',token:pro.token,body:{displayName:'Security professional',homeCity:'São Paulo',primaryRole:'Bartender'}});
  await call('/v1/professional-profile',{method:'PUT',token:outsider.token,body:{displayName:'Security outsider'}});
  const startsAt=new Date(Date.now()+86400000).toISOString(),endsAt=new Date(Date.now()+90000000).toISOString();
  const job=await call('/v1/company/jobs',{method:'POST',token:company.token,tenant:company.tenant,body:{title:'Security private journey',requiredRole:'Bartender',workCity:'São Paulo',startsAt,endsAt,payCents:1234},status:201});
  await call('/v1/jobs/'+job.id+'/interest',{method:'POST',token:pro.token,status:201});
  const assignment=await call('/v1/company/jobs/'+job.id+'/confirm',{method:'POST',token:company.token,tenant:company.tenant,body:{professionalId:profile.id},status:201});
  const chatPath='/v1/conversations/'+assignment.id+'/messages';
  const ownMessage=await call(chatPath,{method:'POST',token:pro.token,tenant:company.tenant,body:{body:canaries.ownMessage},status:201});
  const foreignMessage=await call(chatPath,{method:'POST',token:company.token,tenant:company.tenant,body:{body:canaries.foreignMessage},status:201});
  for(const step of ['check-in','start','check-out','complete'])await call('/v1/assignments/'+assignment.id+'/'+step,{method:'POST',token:pro.token,tenant:company.tenant,body:{},status:201});
  const rating=await call('/v1/assignments/'+assignment.id+'/rating',{method:'POST',token:company.token,tenant:company.tenant,body:{score:5,comment:canaries.foreignRating},status:201});
  assert.equal((await db.query('SELECT body FROM conversation_messages WHERE id=$1',[foreignMessage.id])).rows[0].body,canaries.foreignMessage);
  assert.equal((await db.query('SELECT comment FROM work_ratings WHERE id=$1',[rating.id])).rows[0].comment,canaries.foreignRating);
  const exported=await call('/v1/privacy/export',{token:pro.token}),foreignExport=await call('/v1/privacy/export',{token:company.token}),outsideExport=await call('/v1/privacy/export',{token:outsider.token});
  assert.ok(exported.authoredMessages.some(x=>x.id===ownMessage.id&&x.body===canaries.ownMessage));
  assert.ok(foreignExport.authoredMessages.some(x=>x.id===foreignMessage.id&&x.body===canaries.foreignMessage));
  assert.ok(exported.ratingsReceived.some(x=>x.id===rating.id&&x.score===5&&!('comment'in x)));
  for(const [value,forbidden]of [[exported,[canaries.foreignMessage,canaries.foreignRating,company.email,outsider.email]],[foreignExport,[canaries.ownMessage,pro.email]],[outsideExport,[canaries.ownMessage,canaries.foreignMessage,canaries.foreignRating,company.email,pro.email]]]){
   const raw=JSON.stringify(value);for(const secret of [...forbidden,canaries.password,...secrets.filter(x=>!x.includes('@'))])assert.ok(!raw.includes(secret),'Export disclosed a forbidden canary');
   for(const key of ['password_hash','passwordHash','token_hash','tokenHash','accessToken','operatorNote','handledBy','evidenceRef'])assert.ok(!raw.includes('"'+key+'"'),'Export secret/operator field');
  }
  await call('/v1/privacy/export',{status:401});await call('/v1/company/dashboard/assignments',{token:outsider.token,tenant:company.tenant,status:401});
  console.log('SECURITY_PRIVATE_EXPORT_PASS '+JSON.stringify({realPersistedMessagesAndRating:true,ownContentPreserved:true,thirdPartyContentRedacted:true,outsiderEmptyPrivateData:true,credentialsAndOperatorFieldsAbsent:true}));
  stage='owned-failure';
  const cliRequest=await call('/v1/privacy/requests',{method:'POST',token:pro.token,body:{requestType:'correction',details:canaries.body},status:201});
  const before=(await db.query('SELECT id FROM privacy_requests WHERE identity_id=$1 ORDER BY id',[pro.id])).rows;
  // The sequence is an out-of-transaction witness of exactly one failed SQL attempt.
  // Only the fresh fixture identity/detail matches; no policy/ACL/runtime code is changed.
  await db.query('CREATE SEQUENCE public.'+prefix+'_attempts;');faultInstalled=true;
  await db.query("CREATE FUNCTION public."+prefix+"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.identity_id='"+pro.id+"'::uuid AND NEW.request_details='"+canaries.body+"' THEN PERFORM nextval('public."+prefix+"_attempts'); RAISE EXCEPTION '"+canaries.fault+"' USING ERRCODE='P0001'; END IF; RETURN NEW; END $$;");
  await db.query('CREATE TRIGGER '+prefix+' BEFORE INSERT OR UPDATE ON public.privacy_requests FOR EACH ROW EXECUTE FUNCTION public.'+prefix+'();');
  const failed=await call('/v1/privacy/requests',{method:'POST',token:pro.token,body:{requestType:'correction',details:canaries.body},status:500});
  assert.equal(failed.requestId,undefined);assert.ok(!JSON.stringify(failed).includes(canaries.fault),'Raw database error in response');
  assert.deepEqual((await db.query('SELECT id FROM privacy_requests WHERE identity_id=$1 ORDER BY id',[pro.id])).rows,before);
  const sequence=(await db.query('SELECT last_value::int n,is_called FROM public.'+prefix+'_attempts')).rows[0];assert.equal(sequence.n,1);assert.equal(sequence.is_called,true);
  const {spawnSync}=require('node:child_process');
  const cli=spawnSync(process.execPath,['apps/api/dist/privacy-requests-ops.js','start',cliRequest.requestId,'test:security-owned-fault'],{env:{...process.env,PRIVACY_MAINTENANCE_DATABASE_URL:config.databaseUrl,PRIVACY_OPERATOR_ID:'ci:security-acceptance'},encoding:'utf8',timeout:15000,maxBuffer:65536});
  assert.equal(cli.error,undefined);assert.equal(cli.status,1);assert.equal(cli.stdout.trim(),'');
  assert.equal((await db.query('SELECT last_value::int n FROM public.'+prefix+'_attempts')).rows[0].n,2,'Exactly one additional failed CLI SQL attempt');
  const cliRow=(await db.query('SELECT status,evidence_ref FROM privacy_requests WHERE id=$1 AND identity_id=$2',[cliRequest.requestId,pro.id])).rows[0];assert.equal(cliRow.status,'submitted');assert.equal(cliRow.evidence_ref,null);
  console.log('SECURITY_OPERATION_LOG_OBSERVED '+JSON.stringify({realChildProcessAndDatabase:true,exitCode:cli.status,noSuccessOutput:true,canaryDisclosed:cli.stderr.includes(canaries.fault)}));
  assert.ok(!cli.stderr.includes(canaries.fault),'Operator diagnostic disclosed private SQL error');
  assert.ok(cli.stderr.includes('database_P0001'),'Operator error must retain safe SQL diagnostics');
  await removeFault();
  const recoveredRequest=await call('/v1/privacy/requests',{method:'POST',token:pro.token,body:{requestType:'correction',details:canaries.body},status:201});
  assert.equal((await db.query('SELECT request_details FROM privacy_requests WHERE id=$1 AND identity_id=$2',[recoveredRequest.requestId,pro.id])).rows[0].request_details,canaries.body);
  console.log('SECURITY_FAILURE_RECOVERY_PASS '+JSON.stringify({realDatabaseFault:true,http500:true,noSuccessACK:true,zeroPartialRows:true,sqlAttempts:1,automaticRetry:false,explicitManualRetry201:true,ownedFaultRemoved:true}));
  stage='server-log-privacy';
  await call('/v1/health/ready?email='+encodeURIComponent(pro.email)+'&accessToken='+canaries.query,{headers:{authorization:'Bearer '+pro.token,cookie:'session='+canaries.password,'x-request-id':canaries.query}});
  await call('/v1/'+canaries.path,{status:404,headers:{authorization:'Bearer '+pro.token}});
  await call('/v1/auth/signin',{method:'POST',body:{email:pro.email,password:canaries.body},status:401});
  await call('/v1/auth/signout',{method:'POST',token:pro.token,body:{},status:201});
  await call('/v1/me',{token:pro.token,status:401});
  // A bounded flush interval observes real server logging, never manufactures it.
  await new Promise(resolve=>setTimeout(resolve,200));
  const bytes=readFileSync(logPath);assert.ok(bytes.length>logOffset,'API log capture empty');
  const log=bytes.subarray(logOffset).toString('utf8');
  const categories={credentials:[...secrets,canaries.password],query:[canaries.query,encodeURIComponent(pro.email)],unmatchedPath:[canaries.path],requestBody:[canaries.body,canaries.ownMessage,canaries.foreignMessage,canaries.foreignRating],databaseError:[canaries.fault]};
  const violations=Object.entries(categories).map(([category,values])=>({category,leakedValues:values.filter(value=>log.includes(value)).length})).filter(x=>x.leakedValues>0);
  const statuses=[200,201,401,404,429,500];
  assert.ok(statuses.every(status=>new RegExp('"statusCode"\\s*:\\s*'+status+'\\b').test(log)),'HTTP status diagnostics missing');
  assert.ok(/"reqId"\s*:\s*"[^"\r\n]+"/.test(log),'Request correlation missing');
  console.log('SECURITY_LOG_PRIVACY_OBSERVED '+JSON.stringify({actualAPILog:true,scannedBytes:Buffer.byteLength(log),syntheticCategories:Object.keys(categories),violations,statusDiagnostics:statuses,requestCorrelation:true}));
  assert.equal(violations.length,0,'API logs exposed synthetic credential/PII canaries');
  assert.ok(/"event"\s*:\s*"application_error"/.test(log)&&/"code"\s*:\s*"P0001"/.test(log),'Application error diagnostics must remain observable');
  stage='mobile-storage-privacy';await storageLogContract();
  console.log('SECURITY_INTERNAL_ACCEPTANCE_HTTP_PG_PASS '+JSON.stringify({authentication:true,concurrentRateLimit:true,privateExport:true,realFaultRecovery:true,noAutomaticRetry:true,serverLogPrivacy:true,requests,disposableLocalOnly:true,externalPentest:false,physicalDevice:false,production:false}));
 }finally{await removeFault();await db.end();}
}
if(require.main===module)(process.argv.includes('--storage-only')?storageLogContract():main()).catch(()=>{console.error('SECURITY_INTERNAL_ACCEPTANCE_FAIL '+JSON.stringify({stage,details:'assertion_failed; synthetic values omitted'}));process.exitCode=1;});

```


## FULL preparação PR615 preservado

## Jornada integrada de segurança interna — Área8

O aceite8 exigeauth,concorrência,PII,rate-limit,logs,retriesefalhas. Este pacote conecta HTTP/PostgreSQL real, sem fragmentar em microtestes e sem declarar aceite antecipado. Nova jornada verifica scrypt/tokenSHA256;8falhas de login concorrentes com7×401+1×429 e resetmanual;mensagens/ratingpersistidos comexportprivado de3identidades;falhaPGlocal emsolicitaçãoprivacidade comsequencewitness1tentativa/HTTP500/semACKoulinha parcial/recuperaçãomanual201;canários sintéticos emURL/header/body/erro evarredura doarquivoAPIreal. Status e correlação continuamobrigatórios.

**Hipótese a medir**, não bug jáobservado: a fonteAPIusaFastifylogger:true eNestloggerpadrão;novo teste detecta eventualPII/query/erroplano antes dequalquercorreção. CI localreal éautoridade. Node --check localSÓsintaxe, nãoHTTP/Nest/PostgreSQLPASS.

Base main`23b62c2423c105350e442ebab3b5030619711b35`;HEAD`3ed3ff7fe44ce6b849e37a565e1bdd92ec20051e`/tree`22976b3dba40b13d10352a5173e9eacc59011187`.9arquivos:novoCJS,hooks3linhas noHTTPexistente,recibo comFULLFINAL614e6originaisFULLprefix+apêndice.SemruntimeAPI/mobile/deps/lock/workflow/browsersflags/prazo/ACL/RLSmodificado nesteHEAD.Todososgatesanterioresincluindo12matrix+canonical/ProductionTruthpermanecemobrigatórios. Trigger/sequence sãoprivados àidentidadefresh,CIloopbackDBexato/socketvalidado,removidosfinally. APK N/A porque insumosmobile/build nãoalterados; nãoAPK desteSHAemprestado.

Main8áreasaceitas[2,3,4,5,6,7,9,10],5pendentes[1,8,11,12,13].Área8PENDENTEownfullCI+review+mergeexpected+literalPOST+formalização quando tudo comprovado.574/565drafts;605/607/584/613/614járesolvidos,sem repetir.NãoPSP/produção/pentest/aparelhofísico/custo/credencialexterna/root/grants/bypass.Não rerunsameSHA para verde.

Evidência:`docs/evidencias/INTERNAL_SECURITY_ACCEPTANCE_JOURNEY_2026-10-22.md`.

---

## Área8 — tipo de opções do logger alinhado ao adaptador — 22/10/2026

HEAD eaa5f47e19508381c178fc7b1d6dbfccf387b90b CI39882323962/job120182338726attempt1FAIL SOMENTETypecheck:FastifyLoggerOptions não incluihooksPino e nãoequivaleaointersectionloggerdeFastifyServerOptions;TS2322/2353/7006. Build/unit/HTTP/browser posterioresSKIP; não1936PASSnesseHEAD,nãofalhaChrome. APK39882323906segueexecução (nãoaprovar/aindaempassarnãoemprestarparanovoSHA). CorreçãorealSomenteimport+anotação paraExclude<FastifyServerOptions<any>['logger'],boolean|undefined>,mesmotipodeopçõesdogenericserverusadopeloFastifyAdapter. Semcastemruntime,passthroughargs,relaxamento deallowlist/log/guards/deadline,semSAMESHArerun. Mesmamudançamobiletrêswarnings exigeAPKprópriononovoHEAD. Área8continuaPENDENTEownCIAPK/literalPOST;8aceitas/5pendentes. Fonte/errointegraisappendnanotaexistente,originaisFULLpreservados.


## Erros Typecheck primários completos

```text
2026-10-23T01:09:14.8163008Z [command]/usr/bin/git log -1 --format=%H
2026-10-23T01:09:33.5143561Z ##[error]command (/home/runner/work/MLIVRETRABALHO/MLIVRETRABALHO/apps/api) /opt/hostedtoolcache/node/22.23.3/x64/bin/pnpm run typecheck exited (2)
2026-10-23T01:09:33.5171269Z ##[error]src/main.ts(12,26): error TS2322: Type 'FastifyLoggerOptions<RawServerDefault, FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<...>>, FastifyReply<...>>' is not assignable to type 'boolean | (FastifyLoggerOptions<any, FastifyRequest<RouteGenericInterface, any, IncomingMessage | Http2ServerRequest, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<...>>, FastifyReply<...>> & LoggerOptions<...>) | undefined'.
2026-10-23T01:09:33.5214422Z ##[error]src/privacy-logging.ts(54,2): error TS2353: Object literal may only specify known properties, and 'hooks' does not exist in type 'FastifyLoggerOptions<RawServerDefault, FastifyRequest<RouteGenericInterface, RawServerDefault, IncomingMessage, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<...>>, FastifyReply<...>>'.
2026-10-23T01:09:33.5219071Z ##[error]src/privacy-logging.ts(55,13): error TS7006: Parameter 'args' implicitly has an 'any' type.
2026-10-23T01:09:33.5221700Z ##[error]src/privacy-logging.ts(55,18): error TS7006: Parameter 'method' implicitly has an 'any' type.
2026-10-23T01:09:33.5579807Z ##[error]Process completed with exit code 2.
```

## Fonte logger corrigida completa

```typescript
import type { LoggerService } from '@nestjs/common';
import type { FastifyServerOptions } from 'fastify';

const methods=new Set(['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS']);
const components=new Set(['NestFactory','InstanceLoader','RoutesResolver','RouterExplorer','NestApplication','ExceptionsHandler','Bootstrap']);
const errorTypes=new Set(['Error','TypeError','RangeError','SyntaxError','HttpException','BadRequestException','UnauthorizedException','ForbiddenException','NotFoundException']);
const databaseCodes=new Set(['08000','08003','08006','22P02','22001','22003','23502','23503','23505','23514','40001','40P01','42501','57014','57P01','P0001']);
const operationReasons=new Set([
 'DATABASE_URL_required','PRIVACY_MAINTENANCE_DATABASE_URL_required','PRIVACY_MAINTENANCE_DATABASE_URL_required_for_apply','PRIVACY_OPERATOR_ID_required','PRIVACY_OPERATOR_ID_required_for_apply','PRIVACY_OPERATOR_ID_too_long',
 'privacy_retention_already_running','privacy_retention_run_missing','privacy_request_not_startable','privacy_request_not_finishable','operator_note_too_long','request_id_invalid',
 'scope_type_invalid','legal_hold_scope_not_found','legal_hold_not_reviewable','legal_hold_review_history_missing','legal_hold_not_releasable',
 'usage: privacy-requests-ops <list|start|complete|partial|reject> [requestId] [resolution/evidence/note]',
 'usage: privacy-legal-holds-ops <list|history|create|review|release> ...',
 ...['tenant_id','scope_type','scope_id','reason','evidence_ref','review_at','hold_id','review_note','next_review_at','release_reason','resolution_code'].flatMap(field=>['_required','_too_long','_invalid','_must_be_future'].map(suffix=>field+suffix)),
]);
const object=(value:unknown):Record<string,unknown>=>value!==null&&typeof value==='object'?value as Record<string,unknown>:{};

export function privateOperationCode(value:unknown):string{
 const error=object(value);
 if(typeof error.message==='string'&&operationReasons.has(error.message))return error.message;
 if(typeof error.message==='string'&&/^migration_checksum_mismatch:/.test(error.message))return 'migration_checksum_mismatch';
 if(typeof error.code==='string'&&databaseCodes.has(error.code))return 'database_'+error.code;
 return 'unexpected_error';
}

export function privateOperationFailure(operation:string,value:unknown):void{
 const name=['migrate','privacy_retention','privacy_requests','privacy_legal_holds'].includes(operation)?operation:'operation';
 process.stderr.write(JSON.stringify({event:'operation_error',operation:name,code:privateOperationCode(value),error:privateErrorMetadata(value)})+'\n');
}

// Diagnostic metadata is allowlisted. Messages, stacks, headers, cookies, URLs,
// raw route parameters, request/response bodies and SQL details never enter a log.
export function privateErrorMetadata(value:unknown):Record<string,unknown>{
 const error=object(value);
 return {type:typeof error.name==='string'&&errorTypes.has(error.name)?error.name:'Error',...(typeof error.code==='string'&&databaseCodes.has(error.code)?{code:error.code}:{})};
}

export function privateHttpMetadata(value:unknown):Record<string,unknown>{
 const fields=object(value),req=object(fields.req),res=object(fields.res),route=object(req.routeOptions).url;
 const record:Record<string,unknown>={event:fields.res?'http_response':fields.req?'http_request':'http_event'};
 if(fields.req){
  record.method=typeof req.method==='string'&&methods.has(req.method)?req.method:'OTHER';
  // routeOptions.url is the registered route pattern, never raw request.url.
  record.route=typeof route==='string'&&route.length<=180&&/^\/v1(?:\/[A-Za-z0-9:_-]+)*$/.test(route)?route:'unmatched';
 }
 if(typeof res.statusCode==='number'&&Number.isInteger(res.statusCode)&&res.statusCode>=100&&res.statusCode<=599)record.statusCode=res.statusCode;
 if(typeof fields.responseTime==='number'&&Number.isFinite(fields.responseTime)&&fields.responseTime>=0)record.elapsedMs=Math.min(fields.responseTime,86400000);
 if(fields.err)record.error=privateErrorMetadata(fields.err);
 return record;
}

export const privateHttpLogger:Exclude<FastifyServerOptions<any>['logger'],boolean|undefined>={
 level:'info',
 hooks:{
  logMethod(args,method){
   // Pino's hook runs before interpolation and serialization. Do not forward a
   // free-form message or an unreviewed object, even on unmatched routes/errors.
   Reflect.apply(method,this,[privateHttpMetadata(args[0]),'http_event']);
  },
 },
};

function applicationLog(level:string,message:unknown,parameters:unknown[]):void{
 const context=parameters.at(-1);
 const record={level,event:level==='error'||level==='fatal'?'application_error':'application_event',component:typeof context==='string'&&components.has(context)?context:'Application',...(level==='error'||level==='fatal'?{error:privateErrorMetadata(message)}:{})};
 process.stdout.write(JSON.stringify(record)+'\n');
}

export const privateApplicationLogger:LoggerService={
 log(message:unknown,...parameters:unknown[]){applicationLog('log',message,parameters);},
 warn(message:unknown,...parameters:unknown[]){applicationLog('warn',message,parameters);},
 error(message:unknown,...parameters:unknown[]){applicationLog('error',message,parameters);},
 debug(message:unknown,...parameters:unknown[]){applicationLog('debug',message,parameters);},
 verbose(message:unknown,...parameters:unknown[]){applicationLog('verbose',message,parameters);},
 fatal(message:unknown,...parameters:unknown[]){applicationLog('fatal',message,parameters);},
};

```

## Corpoeaa5preservadoFULL

## Segurança interna — diagnóstico privado e jornada completa

Logs reais expuseram canários da URL/query e mensagem de erro PostgreSQL;modelo do storage móvel também expôs Errorbruto. Este pacote mantém status/correlação/códigos seguros, removendo valores privados do Fastify/Nest, CLIserror eerror_coderetenção, além dos três console.warn deSecureStore. Fluxos,retornos,queues,auth,tenant/RLS/ACL,regrasretenção,SQL,códigosHTTP,CORS,15s/browsernão sãoalterados. Nenhumgrants/serviçoexterno/custo/credencial/pentest/PSP/físico/produção.

Jornada integrada realHTTP/PostgreSQL:8falhasloginconcorrentes/7×401+1×429/limiterPG8/resetmanual;passwordscrypt/tokenSHA256;mensagens/ratingreais comexportown/thirdparty;PGfaultAPI500/semACK/0partial/oneSQLattempt eCLIexit1/rollbackownrow/oneadditionalattempt;manualrecovery201;canáriosquery/path/header/body/PGerro/diagnósticosstatus200/201/401/404/429/500+reqId+errorcode;actualmobilequeue/storagefixture6warningssemcanário/login/tenant/logout. ModeloSecureStoreexplícito NÃO nativeproof. Gatescompanheirosauth,roles,PGbarreiras,RLS,notificações,ledger,privacyretention/legalhold,browser12+canonical/ProductionTruthmantidos.

Baseline3ed3CI39881170789/job120178629061FAIL(semretry):1936unit/tipos/build/export/migration/privacyPASS;novajornadaauth/PII/faultPASS. FALHADA FIXTUREusou/v1/health404antesdavarredurafinal, corrigida para /v1/health/ready;NÃObugHealthController. Independentemente, logsprimáriosNest01:00:20.4020922Z eFastify.4032602ZrevelamcanáriosSQL/query. NãoalegarbaselineFULLPASSnemfalhadetestecomoRCAlogger. Fonte173runtimeauditada[85API77mobile11Web];Websemconsoleexposing;stdoutdeCLIprivilegiado éresultadofuncionalcontrolado, nãologpúblico.

NovoHEAD`eaa5f47e19508381c178fc7b1d6dbfccf387b90b`/tree`8f38154b67eb3b4978938fd070675d7e058f8099`, pai3ed3ff7fe44ce6b849e37a565e1bdd92ec20051e, normalFF/forcefalse. **APKAPLICÁVEL**agora poralterar apps/mobile/lib/session.ts (três warnings,nenhum storagecontractchange).183/184protectedinputsbyteiguaisfora sessão; React19.1.4/RN0.81.6/depslock/workflowsintactos. Exigir ownCI+APKstandaloneSUCCESS+review+expectedmergeONCE+literalPOSTCIAPK. NenhumAPKantigousadocomobuildnovo.

Área8PENDENTE,8áreasaceitas/5pendentes[1,8,11,12,13]. FULLprimária/errata/fontes/normas/modeloMobile e173+184manifestos em docs/evidencias/INTERNAL_SECURITY_LOG_PRIVACY_FIX_2026-10-22.md. AnteriorINTERNAL_SECURITY_ACCEPTANCE_JOURNEYpreservadoFULL.6normas append-onlyoriginaisFULL; semnovoPR,zerorerunSAMESHA/cancel/statuscommit.