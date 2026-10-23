# REST/OpenAPI contract — 23/10/2026

## Requirement and scope

DVT original v1.4 §22.4 explicitly requires REST + OpenAPI. The current v1.104 and appendices remain authoritative; earlier requirements are not silently removed. On literal main3ca16763cfde9da583e643707d052c5799332783 there was no OpenAPI document. This delivery adds one for the existing106operations, not a new product endpoint or Swagger service. Area11 remains pending;9accepted[2,3,4,5,6,7,8,9,10],4pending[1,11,12,13].

## Implementation → test

| Requirement | Implementation | Evidence/gate |
|---|---|---|
| REST+OpenAPI | docs/api/openapi.json3.1.0;93paths,106operations,38bodies,76schemas | Full controller/source manifest below; current structure verified locally; actual ownCI and POST still required |
| Session and authorized scope | Opaque Bearer sessions;6anonymous operations,1two-headerHMAC operation;74tenant parameters (7owned reads optional,company copilot context conditional) | Existing238real negative status checks remain unchanged; structure refuses security/tenant drift |
| JSON request and response contracts | Bound checker in same backend journey;positive path/header/body beforefetch;every response afterJSONparse | New OPENAPI_REAL_HTTP_JSON_CONTRACT_PASS required;106positiveoperations/all383responses expected, not yet observed for candidate |
| State,atomicity,isolation | Existing backend realHTTPPG journey;27owned/foreign snapshots,policycatalog invariance,wholeproduct journeys | Existing assertions preserved; schema validation cannot replace them |
| Privacy | No rawrequest/responsebody/token/identity in new diagnostics; only schema pointer and canonical routepattern | Existingsecurityprivacy/retentionjourneys+fullCI required |
| Android applicability | No runtime/mobile/APIproduct/workflow/depslock change | All184protectedinputs exact; noAPKnewSHA asserted |

## Base primary receipts (not borrowed candidate proof)

PR618 already merged expected090185dbcadcb99435ff4673ad18b1065b93b681 into literal3ca,tree0cd15918b6b313f311f83117a2e933300aac8545. OwnCI39909415452/job120268671932/attempt1SUCCESS on synthetice0bb62bff9fc84dd8e7a4c034014629976069773 parents[87adab5ef5dfe6ad280bb17f9f65e27a053f4f6f,090185dbcadcb99435ff4673ad18b1065b93b681],tree0cd exact. POST39910174803/job120271091920/attempt1SUCCESS literal3ca. Both1938unit[217Web1186mobile521API3CLI11monitor],0fail/skip/cancel,type/build/exportAndroid/migrations2x/privacy/wholeHTTPPG/12matrix+canonical/MATRIX0/ProductionTruth. Wholebackend106positive/238negative/383requests/violations[]. POSTjourney06:15:33.8339927Z;ProductionTruth06:17:51.4594068Z. Terminalprimaries are in PR618, not a rerun and not the new candidate's CI.

Last literal Android product fbaec2e7674810b2f5232b0fd0c6673e1aadff29/APK39885077269;artifact12471849419 revalidated unexpired,size28913870,digeste82d9472c43c6067db11958f2de1673d55dd1312151518b677deb66ae917f35f. No new download/physical proof this delivery. CandidateAPK N/A because all Android build/runtime inputs remain identical. Full existing bytes/SUMS/BUILDINFO receipt remains in SECURITY_INTERNAL_ACCEPTANCE_2026-10-23.md.

## Verification limits

LocalNode24.19.0 syntax and document structure check passed at2026-10-23T06:36:51.655Z. Five local mutated documents (missing operation,anonymous company mutation,optionalized company tenant,unknown schema keyword,missing reference) were rejected. These are authoring controls, not new canonical unit counts, not actual HTTPPG, not fullOpenAPI certification. A source-derived comparison matched all38actual @Body/@Req handlers to38documented request bodies. Semantic review corrected actual nullable analytics rates, completed-dashboard rows without status, support-context displayName and professional-week rows without status BEFORE publication. No API bug was fabricated from a drafting error.

The checker supports only the JSONSchema keywords present here and refuses unknown ones/remote orrecursive refs. Stable response cores are additive. Normalization, UTF-16 limits, conditional fields, role permissions and state transitions remain described or enforced by real API/business assertions; not all are expressible/encoded in these schemas. Schema success is not exhaustive branch,provider,native orproduction proof. OpenAPI normative reference: https://spec.openapis.org/oas/v3.1.0.html (read23/10/2026).

Missing preference semantics/persistence/matching effect and general support without membership are explicitly not implemented; do not infer an endpoint or relax RLS to fill them. KYC/KYB remain provider-pending; ledger/webhook are simulated; no money,PSP,provider,production,physicaldevice,fullRNforms/SecureStore,pentest or external approval is asserted. Issues215/219/220/224/228 remain separate.574/565 remain drafts; neither owns these API/document files. No new automation or status-only commit.

## Controller source manifest

\`\`\`json
{
  "commit": "3ca16763cfde9da583e643707d052c5799332783",
  "controllerBlobs": {
    "auth.controller.ts": "c432aa1e28e02c8064144e913168cc64e8a38e97",
    "availability.controller.ts": "fc225952e5063d65b344046d77dc1f8062026b3c",
    "cancellation.controller.ts": "33beafd3d8d7788792dcec8ad1463e4a617e3956",
    "career-conversion.controller.ts": "b05d7094db192ec5613219dc4b9c64e4e8d8679b",
    "career.controller.ts": "fe8f6cadb28617c896883622be9fac305172ea1a",
    "company-analytics.controller.ts": "9d4aea6ba5f51260dd7b9f298837be9cb806b4ba",
    "company-dashboard.controller.ts": "46e0a2847dcfe9655979a405b29cffdac2f8026e",
    "company-job-create.controller.ts": "50acee5e5f13731101bc77abcb29d5e21c946206",
    "company-jobs.controller.ts": "e888c6a6db28bd3f48223f150a5895ffc6c26d9c",
    "company-members.controller.ts": "b63fedb082c0b8ed20b1b9f7daebe5045705ab4d",
    "conversations.controller.ts": "05f479c1ab3a2350c8bcd1fd32b1bdd574e62ec3",
    "copilot.controller.ts": "a78315b38e7b9d018a6d47e0f300a377a5d84071",
    "earnings.controller.ts": "f091a1262e2c7a9934358883ea2ef8919ababf97",
    "health.controller.ts": "35afec02ee6dcf41c6d9bc7809f91e660cff44ff",
    "integrity.controller.ts": "6004fa00460b9fc9466b343400371e07adaeaefb",
    "jobs.controller.ts": "185be30435f34dc270461fefce284a37ac7a3b5e",
    "me.controller.ts": "5e655898870718c4644998d76e1524c4af6d2c15",
    "notifications.controller.ts": "dfe072e660b41060ff809eeefc489ae9aeb3981a",
    "payment-events.controller.ts": "3030f292e35b5fbeb7c1c1bc0cd74149ea6d6313",
    "payment-webhook.controller.ts": "81d39a81a9a93d556a8651d3492abc937f65a0f9",
    "planner.controller.ts": "ceae97178b4f9b7fe9cf819e47d328bfcd09c790",
    "privacy.controller.ts": "4c9427c20213a838fda51adc2547014f31ef5456",
    "professional-capabilities.controller.ts": "6325906dea732851d6ed8f75be11c7baecbc7c5e",
    "professional-planner.controller.ts": "5220558e1f5610607134b497bf95e16cecf39edb",
    "professional-profile.controller.ts": "c7333a3d6b8b63d074885c5df9cc707482cc3949",
    "ratings.controller.ts": "d4e41af53698b1658e620e717cafd1ec129a260a",
    "replacement.controller.ts": "809c27f1551c103adc9e6950f79555eb42d3b7db",
    "safety-admin.controller.ts": "baf0a51aae1c2cae598dbf3e7bdb7660b6b1f7f7",
    "safety-appeals.controller.ts": "f9425e7357c8e6af17c866d1eb7803a19e430fff",
    "safety-cases.controller.ts": "aa62c24959e927e896b041b744c4c154a58591b0",
    "support.controller.ts": "b7418f9c3473b15ee32a488b7b354816c80acf28",
    "talent-pools.controller.ts": "3e4156f6d582028101c06c5c21e6a2a7c6bc5ab4",
    "taxonomy.controller.ts": "9552ffc4ddb96ebfe1db760cc104bcd23416bb5a",
    "team-allocation.controller.ts": "a316e0362c7d4de75bcf8cf0c347b6d21bfcac7f",
    "teams.controller.ts": "40ffb43f9200d79e60262d3f9005155cce64b7fc",
    "terms.controller.ts": "597e5fbda7337046452e4e8542df00face09a416",
    "trust-events.controller.ts": "ac760f24611da21d0b67f4b5ec5174915f07b73e",
    "verification.controller.ts": "e43b5f95d05a505b5146a0c0ea2281d5d0dee63f",
    "vertical-packs.controller.ts": "98a2b07f18f277c19220d588d1e44c945b11c8f4",
    "work-assignments.controller.ts": "3c4c1c7023fb9fcbdfd84a4e594a67bbb491a6a8",
    "work-graph.controller.ts": "5bed24a5999a66290a3eb058b09d70948e8c17f6",
    "work-passport.controller.ts": "af621fe5009ff08f37d51ef49257b16293ceb5b7"
  }
}
\`\`\`

## Android protected input manifest

\`\`\`json
[
  {
    "path": "apps/mobile/app.json",
    "sha": "77f1007b792ee4fa2d10dd5e5a8316762467ef8e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/_layout.tsx",
    "sha": "d75f4a26218d1c1fdfacef46b08fd2d2babaa05a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/agenda.tsx",
    "sha": "764dcb964bdf79ae0337d6ae5a59cdc030e48a77",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/analytics.tsx",
    "sha": "aff479659db2976acd7b3e0923e991b36273fce7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/candidatos.tsx",
    "sha": "e5f68ec17a307d71d0c115e191c3be480e24cd6b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/casos-seguranca.tsx",
    "sha": "b4e3ccafaa50d4cfad34733f12820008289b68ec",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/conversa.tsx",
    "sha": "25e6191e1664ee0f98c96d026ff3aed96faa2798",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/copilot.tsx",
    "sha": "ecc9ca4ecafbdd5131c30e130ba0075c6d8d5526",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/criar-conta.tsx",
    "sha": "fba0cb3416b9cb538867fd7d542d3b9c118ce169",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/disponibilidade.tsx",
    "sha": "b4eb4736896148baec684b1b4ea6a5009919696e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/empresa-conta.tsx",
    "sha": "20c37cc92957e7bdb245e494d240dfcd40ebab80",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/empresa-inicio.tsx",
    "sha": "714095ed78b6669a42750d0ac54fbb861e354501",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/empresa-notificacoes.tsx",
    "sha": "f42c24a684a943e4b3f07dfa0e6c7c533aa36b11",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/empresa.tsx",
    "sha": "b34777148cfab0b167f1d4d6b61777e44a087900",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/entrar.tsx",
    "sha": "ec7c7914f5f2f310e905bff8b81103c4be433357",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/equipes.tsx",
    "sha": "f7c6eacb4d951d37487473fc6572271ccefd31cb",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/ganhos.tsx",
    "sha": "79ae7e2b6225da08eac0d100ee71ab8639165755",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/index.tsx",
    "sha": "51d033d5ece17312b141da28ead40ecdfdf56705",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/membros.tsx",
    "sha": "4b6140a7349049dd704bbb079f16de06d6be7589",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/notificacoes.tsx",
    "sha": "5b92e71991bfa02a0be73bfd3dd1debf31a446c1",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/pagamentos.tsx",
    "sha": "e2b3b16937945d11c0d45c31c9eff13a2cf0b96f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/perfil.tsx",
    "sha": "c492039ee8542f513e6a148ba18a94671f54332c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/planejamento.tsx",
    "sha": "356460ad4b0a546fbd6b7ca5cf9650568e973c02",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/privacidade.tsx",
    "sha": "c3ac45ef5005aac68491f117e48b9af104748fa9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/profissional-inicio.tsx",
    "sha": "a71b7c6ba11bf4cd35a6996448dda71ee598e731",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/seguranca.tsx",
    "sha": "bbd76fdb4dfa7d764b4e29942b47d58368be2223",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/substituicoes.tsx",
    "sha": "e2cf5a9af0d4cfc6755fd857cf6de91f30c45b80",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/talentos.tsx",
    "sha": "87872556f34ee09519f739c33a404322f1e677db",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/trabalhos.tsx",
    "sha": "65c0de5b1b9a390eb403a1a01695038c30180928",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/CompanyNav.tsx",
    "sha": "8f54ab81505b317b8d64a7d1ea301d4c8ee2cc12",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/DeclaredCapabilities.tsx",
    "sha": "8086dc0d623e6d1137fb821c9f5f9c1a07c70b67",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/GeneralSupport.tsx",
    "sha": "344b2d82c2172af1f164649fdf2c9fa69400e265",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/NotificationsScreen.tsx",
    "sha": "ea7dd8efc958c28730675ad8d6cc2bddc45067f2",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/ProfessionalNav.tsx",
    "sha": "5c09010eea757e92c7dfc42bd7adeff1119c7380",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/SupportHistory.tsx",
    "sha": "e99f37d6bdda66825e346f23b2f2c2fa2f6ee0f8",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/SupportRecovery.tsx",
    "sha": "919d24e9a2548703d4991f5c68a437ed9041e219",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/SupportRequest.tsx",
    "sha": "73827cddcfb0192f5fbd38f6b215cfc9c32f47bd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/eas.json",
    "sha": "fb64fcbd42deff7361ad26d1b7cd2fd06fd6a15f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/agenda.ts",
    "sha": "48d3e08ae4e5ac1f4948c20549a330cc042a01ce",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/api.ts",
    "sha": "46cf48a5fb37257af90aceb816b3791e6b1c3c7a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/availability-submit.ts",
    "sha": "beccad934ab8d187f8cfddfba28b4526e2bb41b1",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/availability-window.ts",
    "sha": "7b46379568f19b2c13b32df292685af647463534",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/bootstrap.ts",
    "sha": "7aaecdbc168f9486500afc91d045b5ca881806fd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-analytics.ts",
    "sha": "28f59c89ccf1d35e114daa93cb3ef39da418c6a9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-candidates.ts",
    "sha": "d042f8221b70cca7c984138d941f185d94c89ba5",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-dashboard-actions.ts",
    "sha": "42419db9d1971ba02b46047a572c79b3f8eef041",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-dashboard.ts",
    "sha": "a865a546c903520964a807f488a5ec4114e9bbe8",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-job-publication.ts",
    "sha": "45fb20b6b1b55447fe83207d4ac3806db7e7dca5",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-members.ts",
    "sha": "85c86260e3cecc70df9e8ffe24dd246f5cab9d7a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-readonly.ts",
    "sha": "4ec7f5151134f4ea11b09f2ce55dfd2a5cdd22d0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-replacements.ts",
    "sha": "7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-safety.ts",
    "sha": "5ab736715ffd3dc5ff83decc0739bf8c95276089",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-talents.ts",
    "sha": "55f07c1e950a5f13036238ac6e1579e971a6aaba",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/conversation.ts",
    "sha": "565a19b60e1c0a3aa244df92dbfb09dc9b27d718",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/copilot-response.ts",
    "sha": "856d4d5210972be202e7502f6c9c3281b50adc43",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/earnings.ts",
    "sha": "9afe1a24109c42ad4825eeda40ff1dcef164e84c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/home-cards.ts",
    "sha": "d6e4ccf9d71ab072e01e3b2915558a6586edec36",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/jobs.ts",
    "sha": "54d0814ace6e91565e0fa9c8722ea734594b015f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/notifications.ts",
    "sha": "3928db3607370a459eca506a1610671d6c655bee",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/passport-history.ts",
    "sha": "e72f0ce1df88d4624ba78295b87ff861493fdda6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/privacy-actions.ts",
    "sha": "e116dec3da68da1e41b666c7d3e8739a6d4ac5a7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/privacy-requests.ts",
    "sha": "3f69d87acd77d803bc0394ce412b3e85213d8b97",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-capabilities.ts",
    "sha": "e3ef307eaaa4a3755eda2f9f30b652bca1d5550b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-home.ts",
    "sha": "ca9e396fceec67ad5b9fe99965a1479bc9a9d0f0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-profile.ts",
    "sha": "c33dce25b0de5ab42512c846b2418895b92178de",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-safety.ts",
    "sha": "123e637dc1019e9fece11a64d5f5257bb4d6e3c9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-support.ts",
    "sha": "865f1b87195d5860cc7f8f03d20c00c48b92fd1b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/profile-submit.ts",
    "sha": "7ff33c6e83c858577f6d0a31aa1fd6914b4cd609",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/session-context.ts",
    "sha": "8a23f577cf222016694d6995822b632c0a71434f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/session-transaction.ts",
    "sha": "d10eb3b0ce05326947aa216d30db2571d1501dc8",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/session.ts",
    "sha": "2be0e1f28380f9b4f8d18e39a48489dbf87fa9f0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/signin.ts",
    "sha": "453de55dfc31d983fc8e279b8c91104913a927b0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/signup.ts",
    "sha": "800faeb27d041108ab7c1c9018f749c32d2a0010",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/startup-route.ts",
    "sha": "b8cbb6fcbb50b3d592d077b5c31db3f155ec8fff",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/support-contexts.ts",
    "sha": "61df65a69aca6acae2d1575304f5ed4191470ca7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/support-intent-storage.ts",
    "sha": "b266454649a7658b5231207edaec7e269e9da8b9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/support-intent.ts",
    "sha": "190926f412bb22ccf556899f6ae93dfe523c77ff",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/support-submission.ts",
    "sha": "be61cef11a2033fc0bca2899b518efcd56022839",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/teams.ts",
    "sha": "eeeab168bfb62c62f2552d28bd6600ae23adada1",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/package.json",
    "sha": "e1646b540a738daa81828a71f00617a7714fad6f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/agenda-actions.test.mjs",
    "sha": "1e1964cc18cbabe419c8b70a5b4e9c8f2a9ed366",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/agenda-read-deadline.test.mjs",
    "sha": "9419980016590846a43daeb7c9ebc719ed8231e9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/agenda-support-screen.test.mjs",
    "sha": "ff7f91eb8ae8d15aa440707a6909ae9c97a3308d",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/agenda.test.mjs",
    "sha": "934aa0350620a8e0b85fc63db9bbed110c2b4854",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/availability-calendar-screen.test.mjs",
    "sha": "b0c5cb20f354400db0c4dc934779ec800d321dbd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/availability-screen-deadline.test.mjs",
    "sha": "0f5607ef3750c788a7657dbac299bc6afd3e8777",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/availability-submit.test.mjs",
    "sha": "340ceb0dbb8a7f5e0e502514279997df0fc9cc9c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/availability-window.test.mjs",
    "sha": "8796c551a1db8fc8ea9687e6cab57542ec750d73",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/candidate-confirm-deadline.test.mjs",
    "sha": "1da09eeb72786d7553c2caf8828f6ef4d56bd108",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/candidate-confirm-session-guard.test.mjs",
    "sha": "81e44156aa9630e3842b92af33428a686b1a7928",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/candidates-expired-read.test.mjs",
    "sha": "6ea6740b371d48521829c2b3c003bfa7887b9391",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/candidates-read-deadline.test.mjs",
    "sha": "0bc2846acc7dad856994cdfdacf583b07b5d8f89",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-analytics.test.mjs",
    "sha": "1ea2952808f7aa44731918bca8f4554ac26fee5a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-candidates.test.mjs",
    "sha": "e37d04a92b8df9999369d2c984419141541c762b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-dashboard-actions.test.mjs",
    "sha": "01cd94d601274d78940c7cc30003830ca9ca8a53",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-dashboard.test.mjs",
    "sha": "6c5a7a3c1dc0df2bc505756a88991e7ad4e6ac9a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-job-publication.test.mjs",
    "sha": "0f4437a3555309b6599976aec9c31a5b692d97b0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-members.test.mjs",
    "sha": "9897a83bd52a3a19c3bdf4f940a787edc397253a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-publication-context-deadline.test.mjs",
    "sha": "010543d05c7716ad3cb4cfc48567f220086c4ae3",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-readonly.test.mjs",
    "sha": "1b1d09278a6b6321a90852bccd20582037e7b2ed",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-replacement-ack-uuid.test.mjs",
    "sha": "a53cd57ec830d2c6faf7667c954c5dbf267f7776",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-replacements.test.mjs",
    "sha": "456bdc4dd6a3ca86e36e7289b1d39eb960342833",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-safety.test.mjs",
    "sha": "570bea7965d597a837a1cf1835a93f4fc87f1f19",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-talents.test.mjs",
    "sha": "155d414d3aef54db23dc8eedb7c854d8a45e0525",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation-calendar.test.mjs",
    "sha": "403aa9317aa7f82b3042b56ae758cdfe5c9f0176",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation-controller-cleanup.test.mjs",
    "sha": "9c3cdbf55372ec8387e5bfcadfb8d7dd2f175297",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation-read-deadline.test.mjs",
    "sha": "fd83e07ff77f5c4ef84f4eca771fe81df99e435c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation-send-screen-deadline.test.mjs",
    "sha": "580ab20f9914bf4d6ca8f1adf9beb0fe4cd43eb6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation.test.mjs",
    "sha": "457e155044d518faaee0650cef135468a02838e6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/copilot-response.test.mjs",
    "sha": "ed2136aee8c40a466a8dc51530a104015ef4b2b7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/copilot-screen-deadline.test.mjs",
    "sha": "fc55d439d39f25d1ed3bbc76c2a8ae6b1e736850",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/declared-capabilities.test.mjs",
    "sha": "81be22f88f1842ea449589b88b4545a27dbc009b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/earnings-controller-cleanup.test.mjs",
    "sha": "6cbf6645bfd2b7e36eda1e260c67a9ec1905f43f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/earnings.test.mjs",
    "sha": "d886827477cf1a7e111eb7cb4ad24a3f3c1394cd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/general-support.test.mjs",
    "sha": "97073823b6ea06ab8a72a8f72b9fe7eb68b88dcb",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/home-cards.test.mjs",
    "sha": "d60371e0bcb12e97b8af1d2c50a4cd3944241d56",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/interest-screen-deadline.test.mjs",
    "sha": "009ed1bd4db47b102223474e16bcdbbac5bd00f0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/invitation-accept-deadline.test.mjs",
    "sha": "b276e85f116dccca5fb6f800d9a4cb7e2e5a9ade",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/invitation-create-deadline.test.mjs",
    "sha": "52973e05433b4f4cdb602d0fbbbfd8d02b982265",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/jobs-read-controller-cleanup.test.mjs",
    "sha": "c39715bb7f543cee59eef58b4be351a13ee3ed91",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/jobs.test.mjs",
    "sha": "5ed8e51d785af4c54de11e3a61bca09426b7a95e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/member-support-calendar.test.mjs",
    "sha": "6dd1fe043e2822357c5e9f090ea197b2b924c4e4",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/notifications-read-deadline.test.mjs",
    "sha": "508bb7c7778d868a2c21b7059dd10c10bc0ae86f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/notifications-write-deadline.test.mjs",
    "sha": "ffcd9625f56d5af2a394db0da37f1a993b80a6de",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/notifications.test.mjs",
    "sha": "bd21ae0efa3fa6c8f99a1e573490f745de48b98e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/operations-deadline-screen.test.mjs",
    "sha": "ddadf21ddd0895fe35d9c4df9d6ccfe8d3b53710",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/passport-history.test.mjs",
    "sha": "67c1c472ef9292e984bdbfb716813068473af5de",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/passport-safety-calendar.test.mjs",
    "sha": "5ad0bde5ee19381be2115ba5687c428585580e85",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/planner-screen-deadline.test.mjs",
    "sha": "5bb08d09cc4af4b37c37a63de68273719a2c43a2",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/primary-read-deadline.test.mjs",
    "sha": "ee297621b25e80f12f203837c1d2b42f23df242d",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/privacy-actions.test.mjs",
    "sha": "0a69cc2358b1ed13b87f84baf11b8a8eab9447e4",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/privacy-requests.test.mjs",
    "sha": "e5095d9047542a5414519422efd5e891e906fcd2",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/privacy-write-deadline.test.mjs",
    "sha": "f9783551999b68589bdbbff2d9f03db6a9d6808d",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/professional-home.test.mjs",
    "sha": "d87761c9e81a48a6a3bb89f72563efee514a4ad4",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/professional-profile.test.mjs",
    "sha": "7898ada26ea546fc3137a688e86478fb10332430",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/professional-safety.test.mjs",
    "sha": "8fc94c9216dbad9b5fc483e0837f5d69a1881443",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/professional-support.test.mjs",
    "sha": "b2c5967bf7e4cdc270d68205b2d0e96009b4109c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/profile-analytics-read-deadline.test.mjs",
    "sha": "2df00828279c9660a8ed365f1a3be149169cae7e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/profile-save-screen-deadline.test.mjs",
    "sha": "bb11da6d351fa2026fba12eec293e63e42b103cd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/profile-submit.test.mjs",
    "sha": "3e3dd073d8c642ffabbd325cc34350bac8d33164",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/publication-screen-uncertain-deadline.test.mjs",
    "sha": "9d11388afedbbe01e6ac15be0d9558e5d5328513",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/replacement-create-screen-deadline.test.mjs",
    "sha": "d0423c9b93767886251470009fede3a8ad0e34c3",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/replacement-match-screen-deadline.test.mjs",
    "sha": "a297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/replacement-read-controller-cleanup.test.mjs",
    "sha": "3a0f44b631e6a0cce8cb74e22ea7607e4db87a3c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/replacement-select-screen-deadline.test.mjs",
    "sha": "747753e9f044c02377a149a815211e5117ea58bc",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/response-calendar-contract.test.mjs",
    "sha": "630e26b4037cd59c17713451c2d34aa98b4917ba",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/revoke-screen-deadline.test.mjs",
    "sha": "a64a7963d655e4e1d706f3455ee5d96f92fc2849",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/secondary-read-deadline.test.mjs",
    "sha": "cc641c6180ad8ce624220e41bb5da3f980f2b466",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/session-clear.test.mjs",
    "sha": "ac626a1e1e2b3f5873da15c129e0b5f7101ad454",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/session-context.test.mjs",
    "sha": "f36b32432e8cd4654954445e1359812c4ed098af",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/session-tenant.test.mjs",
    "sha": "e40e2d1932c825cd61c8ebe489fc05e317293813",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/session-transaction.test.mjs",
    "sha": "6b60b6e08030e12a55ea002996caee7929341ae6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signin-screen-deadline.test.mjs",
    "sha": "3d188e71b180978bf900edcff96b32c4df1de41b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signin.test.mjs",
    "sha": "a580a51b608116701024ff5c102d76b0bb1712a4",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signout-screen-deadline.test.mjs",
    "sha": "07f5b11eb3dfeea58a271c8caf027aade76ed359",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signup-screen-deadline.test.mjs",
    "sha": "4f92e840adb8dfa6eb1c6fb941fd8061c1257093",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signup-screen.test.mjs",
    "sha": "eace3ff93514dd1d182006e598136a057d352509",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signup.test.mjs",
    "sha": "483ace20f18b2cd7053be06a50c91004ec15545f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/startup-route.test.mjs",
    "sha": "242d7516e9c090a817ad8ae88a6daf9497e77a8b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/startup-screen-deadline.test.mjs",
    "sha": "ae28131f4a72e5c71a6603d5ba31464c9f3e988b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-calendar.test.mjs",
    "sha": "26e4c07812c7b020c68c7f3c1d2f9483e327c978",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-history-read-deadline.test.mjs",
    "sha": "408c4a5458e3baa4b23554cc2bfde807071db8cd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-history-screen.test.mjs",
    "sha": "537f3e97b1cbcfbe8ac9efaf7a90adcb6ecc685f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-intent.test.mjs",
    "sha": "bce844ae4c40f452c4d9db3961beaccff97d2108",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-recovery-screen.test.mjs",
    "sha": "9c041fff637ecf15064c828805cef36dad133786",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-request-screen.test.mjs",
    "sha": "c833939e03e63a17abbd9b195f631c6675871e64",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-submission-calendar.test.mjs",
    "sha": "7783fea5e432339b8cf4cc417c2fad6ff9fe6949",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-submission.test.mjs",
    "sha": "35845a334a6e271a976fd8ea1dc935833dc8ad58",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/talents-safety-read-deadline.test.mjs",
    "sha": "547ae928eda25b2ab28ac64f90b3028d275fe653",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/teams-read-deadline.test.mjs",
    "sha": "fa39a5639095d53b0e9f6491c4a926e47eeb9236",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/teams.test.mjs",
    "sha": "b202b682a7fbd4977fd99d49156bb7802aadb2f7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/window-ack-calendar.test.mjs",
    "sha": "1bb7956ba411c2e93c03f5c0e2fe2addfff6cb1a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tsconfig.json",
    "sha": "aee4c01aa16c5c63c241fe3d76cbff8d020081ca",
    "mode": "100644"
  },
  {
    "path": ".github/workflows/ci.yml",
    "sha": "b42bd9e89aa8052e2d1d9e36c63b4dee621b4e25",
    "mode": "100644"
  },
  {
    "path": "package.json",
    "sha": "936bb3649f5bb1b9810039ba35d339189f0a530c",
    "mode": "100644"
  },
  {
    "path": "pnpm-lock.yaml",
    "sha": "c1a67de447f42375a02a05a03661037262f9cd8d",
    "mode": "100644"
  },
  {
    "path": "pnpm-workspace.yaml",
    "sha": "b98f8b436f1d0dc6f3c11a4f905bdeb06fed9c65",
    "mode": "100644"
  },
  {
    "path": "tsconfig.base.json",
    "sha": "616448a7bb986fb1f524e58dc84e115ae330eec1",
    "mode": "100644"
  },
  {
    "path": "apps/api/package.json",
    "sha": "9a4a75a94b50730bbe129c51965b30656605b49d",
    "mode": "100644"
  },
  {
    "path": "scripts/android-standalone-smoke.sh",
    "sha": "7d7dac1cdd906cd40515c23bab54cdf59376553c",
    "mode": "100644"
  },
  {
    "path": "scripts/build-android-pilot.sh",
    "sha": "5f4f95c64a8c43f9744b1bfd5fbb9ec1180a2f42",
    "mode": "100644"
  },
  {
    "path": "scripts/tests/android-standalone-smoke.test.mjs",
    "sha": "56d89b19623b5ad07adb4c31632d6019fabc5e9c",
    "mode": "100644"
  },
  {
    "path": ".github/workflows/pilot-android.yml",
    "sha": "d6c9c21d00e8d038211d155085d77af8cad59dff",
    "mode": "100644"
  },
  {
    "path": ".github/workflows/standalone-pilot-apk.yml",
    "sha": "e0fc5f871dc3b498f71a38ff932c83b48716c35f",
    "mode": "100644"
  }
]
\`\`\`

Six normative documents preserve their entire current main UTF-8 contents as prefix and append the same chapter/reference. Original DVT versions, memory and all prior evidence remain unchanged. Post-publication final ownCI/merge/POST receipts belong in terminal PR metadata; do not create an artificial commit to repeat the same SHA for green.
