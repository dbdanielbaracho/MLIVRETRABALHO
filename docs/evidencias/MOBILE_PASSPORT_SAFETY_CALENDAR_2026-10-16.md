# Datas de calendário — Passaporte e Segurança mobile


## Validação de calendário no Passaporte e Segurança — ciclo funcional — 2026-10-16 UTC

Base main f98b5f618c5b78772c360b93d17e6028f0021008/tree6f1d97a074f8291862de403b5d65cdaf97fec512. DVT original v1.104, memória, checkpoint, ledger, registry e matriz permanecem completos NO LUGAR; este apêndice não substitui fontes nem aceita áreas. O apêndice de preparação do565 foi recebido INTEGRALMENTE como histórico antes deste recibo; seus arquivos de evidência/cincoPNGs564 foram copiados por mesmos blobs/modes, NÃO se incorporam seus workflows ou o gate nativo ainda falho.

Falha reproduzida ANTES da correção: loadWorkPassport e loaders Safety profissional/empresa aceitavam calendário impossível em new Date(...), tornando READY um histórico com 2026-02-30T12:00:00Z; submitSafetyCase e submitSafetyAppeal aceitavam created/existing sob ACK com mesma data impossível. As fixtures também usam 2025-02-29 comoffset e2026-04-31 comoffset. São respostas HTTP simuladas nos helpers TypeScript REAIS, não registros inválidos em PostgreSQL nem incidente/exploit/Android/produção provados. API retorna timestamps de colunas PostgreSQL (WorkPassport.completedAt; SafetyCases.createdAt/resolvedAt; SafetyAppeals.createdAt), não autoriza normalização silenciosa de dia impossível. Baseline já adotado pela Agenda/Ganhos/Notificações no538 valida componentes locais antes do instante.

Regressão nova apps/mobile/tests/passport-safety-calendar.test.mjs: 12 testes, RED2PASS/10FAIL no source exato da main; GREEN12/12 após correção. Conjunto focal com29testes existentes BYTE-IDÊNTICOS: GREEN41/41, zero fail/skip/cancel. Cobre sete campos de leitura (completedAt/startsAt/createdAt/resolvedAt) e três ACKs(case/appealcreated/appealexisting), preserva seção irmã READY quando só uma seção inválida, um único POST/endpoints/body/tenant/seleção, erro em leitura e unknown em confirmação incompatível. Controles positivos leapday2024, offset que cruza dia UTC e epochzero permanecem strings exatas; null/undefined opcionais,404perfilausente e vazio confirmado preservados. Não afirmar calendário impossível armazenável noPG, nem mudar política de recurso/status/retention.

Correção SOMENTE predicado date em professional-safety.ts/company-safety.ts e predicado completedAt em professional-profile.ts com função calendário byte-idêntica à já existente na Agenda. Reverse-substitution integral comprova todo restante dos3módulos preservado salvo whitespacefinal: requests/paths/headers/tenant/ACL/ids/descrição/motivo/currentcontext/respostas/created-existing/unknown/semretry, estatísticas/ordem/dados/JSX/layout/UI/rotas/API/SQL/RLS/runtime/roles/eventos/React19.1.4/RN0.81.6/deps/lock/build/workflows/smoke unchanged. Não incorporar565 nem seu gateoffline falho só para usar resultado antigo. Mobile mudou: OWN CI e OWN APK no HEAD exato são OBRIGATÓRIOS e ainda PENDENTES nesta preparação; pósCI/APK no MERGE REAL também, nenhum APK542/565 emprestado, nenhum verde por ausência/runqueued/skipped.

### Isolamento nativo565 — decisão técnica sem bypass

Consulta AOSP Tradefed DeviceSetup.java no commit cd9b18148493b9277b1b676c29ce0e4467b69df7 registra ifconfig eth0 down, mas a própria classe exige dispositivo onde adb root é possível. Isso NÃO prova comando suportado pelo shell sem elevação no runner; não será incorporado às cegas. Não houve novo comando de rede/root/su/grant/firewall/bypass nem nova tentativa565. Fonte primária https://android.googlesource.com/platform/tools/tradefederation/+/cd9b18148493b9277b1b676c29ce0e4467b69df7/src/com/android/tradefed/targetprep/DeviceSetup.java . Segurança/isolamento antes de input continuam obrigatórios; bloqueio parcial não impede este reparo independente do cliente.

### Recibo565 final consolidado INTEGRAL no ciclo funcional (história, NÃO resultado deste novo HEAD)

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


### Limites de aceite deste ciclo

Somente área10 Androidstandalone TÉCNICOINTERNO aceita; outras12 pendentes. Este reparo de parsing não prova renderRN/Android/taps/teclado/SecureStore/loginválido/físico/VisualTruth/piloto ou aceite integral1/2/3/7/8/11. #565aa0, #558879, #560e47 continuamDRAFT/FAIL separados. Externos215/219/220/224/228OPEN; sem produçãoRailway/Neon/Rails/custos/serviços/credenciais/provider/contratos/PSP/dinheiroreal. #566WatchOPEN é sinal de commits, não prova de agente parado; sem issuewrites manuais/commitatividade. Revisar head/base/main/bytes/modes/árvore/ancestrais; merge ÚNICO expectedSHA só após próprios gates GREEN, depois medir pósreal. Manter somente rotina existente enabled/scheduleinalterados; sem novo agendamento/desativar por parcial.
