# Aceite técnico interno — Área7 PostgreSQL/RLS/tenant — 22/10/2026

**Decisão do assistente por delegação expressa: ÁREA7 APROVADA TÉCNICA E FUNCIONALMENTE NO ESCOPO INTERNO DE ISOLAMENTO.** Não depende de aceite humano/CONTINUAR. A decisão se apoia em produto integrado e verificado literalmente; este delta documental exige também CIcompleta própria e literal pós-merge antes de anunciar sua conclusão de publicação. Nenhum gate externo é inventado.

Critério original da matriz7: “Auditar todas as tabelas/endpoints, políticas deny-by-default e isolamento entre tenants e papéis com E2E adversarial”. ADR-MT-001 fechado como arquitetura continuava exigindo implementação; esta cadeia fecha o aceite interno de sua implementação no schema/API auditados. Escopo do produto: main `d6b8c72389fd0825e2a96c25f5722a9d265844c2`, árvore `1969278483372480dd1874e5d6b06bc7daddcfc5`, merge613/HEAD325c6d761f624de2dbe3f0918c48e73d60ea0ed8. Pais[e88f8d4ff9f11b92e82b4c9510c50c4607ca09a8,325c6d761f624de2dbe3f0918c48e73d60ea0ed8].

CIprópria39872228407/job120149166133attempt1SUCCESS, checkout23:30:46.2703903ZSINTÉTICO3494aa65f8a4ba04d99219f5cbd53690fd99f666/pais[e88f,325c]/árvoreexata. PÓSCI39873134900/job120152158629attempt1SUCCESS, gitlog23:38:59.8445399ZLITERALd6b8.1936unit[217Web1186mobile519API3CLI11monitor]0fail/skip/cancel, todos tipos/build/export/migração2x/privacy/HTTPPG/browser12+canonical/MATRIX0/ProductionTruthPASS (own23:36:39.9066339Z, literal23:43:45.8698500Z).0rerun/cancel. Watch39873134887 não é CI/build. PrimáriasGit/logs são autoridade, não snapshot.

## Requisito → implementação → prova real → CI/SHA

|Critério|Implementação/contrato verificado|Testemunha|
|---|---|---|
|Inventário integral|44tabelas (27TENANT+17exceções) e106rotasde43classes registradas; drift exige reconciliação explícita. Bootstrapv1 auditado sem registro de rotas de negócio fora doAppModule.|All-table/endpointPGmarkers; manifesto e auditoria das32rotasabaixo|
|TENANT read/write deny-by-default|tenant_idNOTNULL,ENABLE+FORCERLS,políticaUSING/WITHCHECK; SELECT semWHERE emA/B sópróprio; UPDATE/DELETEestrangeiro0ou42501;INSERT/rebindestrangeiro42501em27tabelas, semaceitarFK/uniquecomoautorização.|TENANT_BOUNDARY_ALL_TABLES_PASS|
|Contexto e pool|SemcontextoSELECT0;UUIDinválido22P02failclosed. Classe DatabaseService compilada comPoolPGrealmax1/PIDidêntico/alternânciaA/B,COMMITe4callbackscomerro/ROLLBACK,roleeGUCreset.|TENANT_BOUNDARY_ENDPOINTS_PASS; fonte atual255linhas|
|Role runtime e menor privilégio|rolsuper/rolbypassrls/rolcreatedb/rolcreaterolefalse;semherançadeoutrarole;runtime nãoowner27TENANT nem8funçõesprivilegiadas. Exceçõesglobais:7somenteSELECTe10semacesso, todosIUDnegados42501.|RUNTIME_ACL_OBSERVED violations[]; 3 OWNER_WRITE42501|
|Caminhos privilegiados|8SECURITYDEFINER exatas:PUBLICEXECUTEfalse/search_pathfixo/6callable+2trigger-only; ownpositive/foreignfalseouNULL/foreignconfirmP0001/missingcontextP0001;SQLrevertido ehashesdedfinições observados.|TENANT_BOUNDARY_PRIVILEGED_FUNCTIONS_PASS|
|Autoridade HTTP e papéis|74rotas tenantnegamownerestrangeiro+anônimo401=148 chamadas; snapshots27tabelas vizinhas inalterados. Owner/admin/manager/companyeprofissional/terceiro também nosgatescompanheirodeempresa/notify/replacement.|TENANT_BOUNDARY_ENDPOINTS_PASS; COMPANY_ACCEPTANCE_HTTP_PG_PASS; actor/tenant isolation gates|
|Compatibilidade e concorrência|Cancelamento usaFORNOKEYUPDATEOFwa,semrestaurarUPDATEprofile; confirmação→cancelamentoprofissional/empresa201/auditpersistido/perfisinalterados/outrotenant27tabelasinalteradas;barreirasoriginaisselectecreate/cancelmantidas.|LEAST_PRIVILEGE_CANCELLATION_PASS ePASSconcorrênciaselection/createcancel|
|Cadeia de validação|CIprópria39872228407SUCCESSsintético3494/mesmaárvore eCIpósliteral39873134900SUCCESSd6b8;1936unit0fail/skip/cancel/tiposbuildexport/migração2x/privacy/HTTPPG/12matrix+canonical/MATRIX0/ProductionTruth.|Recibosprimáriosintegrais noFULLFINAL613abaixo|

## Resultado e correções

O primeiroteste provou INSERTdeaceite deoutraidentidade eUPDATEdehabilidades deoutroprofissional rowCount1, ambosSAVEPOINTrevertidos, nuncaexploração deAPI/produção. Osegundo identificou INSERTDEFAULT23502/UPDATEWHEREfalse0semerror emprofessional_profiles: prova de permissãoexcessiva, NÃOdealteração deperfilválido. Migração0072 removeALLterms eIUDcapabilities/profiles, mantendoSELECT necessário aosconsumidoresprivadosdematching/planner. Agora as3tentativasdirecionadasreais são42501, ACLviolations[];APIs poridentidade continuamoperacionais. RuntimeUSAroleapp_runtime noscaminhosDatabaseService.tenant; query/transactionbase são caminhosglobais/identidade explicitamenteauditados. Não inventar credencialdeproduçãofisicamenteseparada que não foi medida.

A restrição evidenciou dependência indevida deUPDATEprofile noSELECTjoineddeCancellationController. Só6caracteresOFwa corrigemalvodolock; mesmoWHEREtenant/id,status,membership,ator,audit/requests eACK. Otesteexistente agora exigeOFwaestrito, não regexalternativo/afrouxado;10casespreservadas. AfixturePGprova201porprofissionaleempresa,perfisintactos e27tabelasdotenantvizinhoinalteradas;barreirasconcorrentesoriginaisconfirmam olockcrítico daalocação. Não afirmarcorreção global deChrome: nestaárvore own+literal passaram sem flags/deadlines/guards/asserts relaxados, história intermitente continua história semRCAglobal.

## Classificação integral do schema

Nenhuma tabelaéclassificada sóporqueRLSestáon/off. TENANT conformeADR; PLATFORM/NETWORK_SHARED/PROFESSIONAL_OWNED seguemescoposdeintrodução econtatosautorizados. Não atribuirtenant artificial aperfil,availnetwork,interesses/reputação/publishedjobs ouoperator/auth/terms. PROFESSIONAL_OWNED permiteleituradematchingdeperfil/capabilities/availability autorizada, não escrita arbitrária; credenciais/emailauthnão ficam nesses datasets.

|Tabela|Escopo|Fronteira|
|---|---|---|
|`assignment_cancellations`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`company_jobs`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`company_member_invitations`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`company_work_ratings`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`conversation_messages`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`conversations`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`direct_hire_conversions`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`earnings_ledger`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`job_interests`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`marketplace_integrity_cases`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`notifications`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`payment_events`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`professional_availability`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`replacement_requests`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`safety_case_appeal_events`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`safety_case_appeals`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`safety_case_events`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`safety_cases`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`support_cases`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`talent_pool_members`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`tenant_memberships`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`trust_events`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`verification_cases`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`work_assignments`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`work_ratings`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`workforce_team_members`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`workforce_teams`|TENANT|NOTNULL+ENABLE/FORCERLS;A/B/defaultdeny;IUD/rebind;ACLimutáveisrespeitadas|
|`tenants`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`identities`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`sessions`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`auth_signin_limits`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`terms_acceptances`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`taxonomy_roles`|PLATFORM|app_runtimeSELECTsomente, writesexigemcaminhopróprio|
|`schema_migrations`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`privacy_legal_holds`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`privacy_requests`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`privacy_retention_runs`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`privacy_legal_hold_reviews`|PLATFORM|app_runtimeSEM acesso; caminhoPLATFORM/identidade/manutençãoexplicitamentecontrolado|
|`professional_profiles`|PROFESSIONAL_OWNED|app_runtimeSELECTsomente, writesexigemcaminhopróprio|
|`professional_capabilities`|PROFESSIONAL_OWNED|app_runtimeSELECTsomente, writesexigemcaminhopróprio|
|`professional_availability_network`|PROFESSIONAL_OWNED|app_runtimeSELECTsomente, writesexigemcaminhopróprio|
|`marketplace_jobs`|NETWORK_SHARED|app_runtimeSELECTsomente, writesexigemcaminhopróprio|
|`marketplace_interests`|NETWORK_SHARED|app_runtimeSELECTsomente, writesexigemcaminhopróprio|
|`marketplace_company_reputation`|NETWORK_SHARED|app_runtimeSELECTsomente, writesexigemcaminhopróprio|

## Auditoria das rotas sem header tenant

São32rotasexcepcionadas da negativa deheader, não32rotasignoradas nemforçadas aRLSdeempresa. A auditoria de fonte eclassificação é distinta de uma chamadaHTTP diretapara cada rota/variante. OsE2Eslistados corroboram contratos/isolaçãocompanhantes; otable abaixoexplicita oscasossemalegação dechamadadireta. Não declarar106jornadaspositivas/equivalênciadetodosospayloads nemfecharbackend11porarrasto. Bootstrapmain.ts9d773e244d76ac060daebfdbb3b1afb0e4f0c18a sóprefixa/registerAppModule; HEADderivado/OPTIONS/CORSframeworknão são inventados como novoscontratosdenegócio.

|Classe|Rotas|Autoridade/escopo auditado|Fonte de prova (scripts/)|
|---|---:|---|---|
|AuthController|3|Cadastro/login públicos controlados; logout resolve a própria sessão/token. Normalização, senha, expiry, membership, revoke e troca de sessão.|authentication-acceptance-e2e.cjs; http-auth-rate-limit-e2e.sh; auth-db-invariants-e2e.sh|
|AvailabilityController|2|PROFESSIONAL_OWNED compartilhável no matching; profissional resolvido pela identidade autenticada, sem target confiável vindo do body.|http-availability-input-e2e.sh; professional-chronology-e2e.cjs|
|CareerConversionController|1|Respond usa professional_id derivado da sessão; consulta proposta com id+professional_id e deriva tenant da linha antes da transaçãoRLS.|http-support-assignment-boundary-e2e.sh (negativas); auditoria da fonte respond, sem afirmar jornada positiva universal|
|CareerController|1|Progresso somente do profile da identidade; estatísticas/habilidades ligadas ao professional_id confiável. Não aceita tenant/target do cliente.|Auditoria da fonte; professional-chronology e taxonomy-capabilities corroboram dados/isolamento, não são chamada direta inventada à rota|
|CompanyMembersController|1|Consumo de convite por código hash, email autenticado, validade/uso único, role permitida; tenant vem do convite verificado, não de header livre.|authentication-acceptance-e2e.cjs; invitation-atomicity-e2e.cjs|
|CopilotController|1|Interpret é autenticado, determinístico e advisory; accountType deriva memberships, sem executar ação crítica nem acessar tenant arbitrário.|http-copilot-e2e.sh|
|HealthController|1|PLATFORM público intencional: somente status/service/version/database, SELECT1 sem dados pessoais/tenant.|smoke-api.sh; production-truth-gate.sh|
|JobsController|3|NETWORK_SHARED intencional de vagas publicadas; interesse é do profile autenticado e UUID validado; cliente não escolhe identidade/profissional confiáveis.|http-journey-e2e.sh; matching-acceptance-e2e.cjs|
|MeController|2|Identidade, memberships e contextos nomeados exclusivamente filtrados pela identidade validada da sessão.|authentication-acceptance-e2e.cjs; http-support-assignment-boundary-e2e.sh|
|PaymentWebhookController|1|Caminho privilegiado explícito de assinatura HMAC/local; valida rawpayload/tenant/assignment/recipient e usa RLS/idempotência. Sem PSP real.|http-finance-reconciliation-e2e.sh; concorrência por barreira PG|
|PrivacyController|4|Identidade autenticada para solicitações/export/deactivate; export percorre somente memberships verificadas+RLS e redige terceiros; manutenção/operador fora da role tenant.|http-privacy-export-e2e.sh; http-account-deactivation-e2e.sh; gates retention/legalhold|
|ProfessionalCapabilitiesController|3|Leitura e CRUD por profile da identidade; role canônica/skills validadas; runtime tenant semIUD. Selector roleId é catálogo, não identidade.|http-taxonomy-capabilities-e2e.sh; tenant-boundary-acceptance-e2e.cjs|
|ProfessionalPlannerController|1|Somente oportunidadesNETWORK_SHARED compatíveis com disponibilidade/profile próprio; nenhum lookup privado com tenant arbitrário.|http-support-assignment-boundary-e2e.sh (professional week real JSON)|
|ProfessionalProfileController|2|GET/PUT bindam identity_id da sessão; id/identityId do body não são autoridade. App_runtime sóSELECT após0072.|http-professional-profile-input-e2e.sh; tenant-boundary-acceptance-e2e.cjs|
|TaxonomyController|1|CatálogoPLATFORM público, governado e read-only; campos canônicos sem dados pessoais/tenant.|http-taxonomy-capabilities-e2e.sh|
|TermsController|3|AceitesPLATFORM por identidade autenticada/WHEREidentity_id confiável, replay por unique; app_runtime sem acesso direto.|tenant-boundary-acceptance-e2e.cjs + auditoria da fonte; sem validar termos jurídicos externos|
|VerticalPacksController|2|ConfiguraçãoPLATFORM estática pública intencional, sem SQL ou dados pessoais/tenant. ID desconhecido404.|Auditoria da fonte/dicionário estático; sem alegar chamadaHTTP nova a cada pack|

### Manifesto das106rotas declaradas

|Método|Rota|Contrato|
|---|---|---|
|POST|`/v1/auth/signup`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/auth/signin`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/auth/signout`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/availability/mine`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/availability/mine`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/assignments/:id/cancel`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/conversions`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/conversions`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/career/conversions/:id/respond`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/career/progress`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/company/analytics`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/dashboard`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/dashboard/assignments`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/dashboard/completed`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/jobs`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/jobs`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/jobs/:jobId/candidates`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/jobs/:jobId/recommendations`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/jobs/:jobId/confirm`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/members`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/members/invitations`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/members/invitations`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/members/invitations/:id/revoke`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/members/invitations/accept`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/conversations/:assignmentId/messages`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/conversations/:assignmentId/messages`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/copilot/read`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/copilot/interpret`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/earnings/mine`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/health/ready`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/company/integrity/cases`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/integrity/cases`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/integrity/cases/:id/review`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/jobs`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/jobs/:jobId/interest`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/jobs/:jobId/interest`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/me`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/me/support-contexts`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/notifications/unread-count`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/notifications/mine`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/notifications/:id/read`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/payment-events/reconciliation`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/payment-events`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/payments/webhook`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/company/planner`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/planner/:jobId/team-plan`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/privacy/requests`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/privacy/requests`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/privacy/export`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/privacy/deactivate`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/professional-capabilities`|Auditoria decontratoglobal/identidade/assinatura acima|
|PUT|`/v1/professional-capabilities/:roleId`|Auditoria decontratoglobal/identidade/assinatura acima|
|DELETE|`/v1/professional-capabilities/:roleId`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/planner/my-week`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/professional-profile`|Auditoria decontratoglobal/identidade/assinatura acima|
|PUT|`/v1/professional-profile`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/assignments/:id/rating`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/assignments/:id/company-rating`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/replacements`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/replacements/:id/candidates`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/replacements/:id/auto-match`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/replacements/:id/select`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/replacements/:assignmentId`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/safety-cases`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/safety-cases/:id/events`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/safety-cases/:id/status`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/safety-appeals/mine`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/safety-appeals`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/safety-appeals`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/safety-appeals/:id/events`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/safety-appeals/:id/status`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/safety-cases/mine`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/safety-cases`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/support-cases/intent`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/support-cases`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/support-cases/mine`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/exceptions`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/support-cases/:id/status`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/talent-pools`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/talent-pools`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|DELETE|`/v1/company/talent-pools/:pool/:professionalId`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/taxonomy/roles`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/company/teams/:teamId/allocation/:jobId`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/teams`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/teams/:id/members`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/teams`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/teams/:id/members`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|DELETE|`/v1/company/teams/:id/members/:professionalId`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/terms/status`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/terms/acceptances`|Auditoria decontratoglobal/identidade/assinatura acima|
|POST|`/v1/terms/accept`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/company/trust-events/:professionalId`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/company/trust-events`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/verification/mine`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/verification/mine/request`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/verification/business`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/verification/business/request`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/vertical-packs`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/vertical-packs/:id`|Auditoria decontratoglobal/identidade/assinatura acima|
|GET|`/v1/assignments/mine`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/assignments/:id/check-in`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/assignments/:id/start`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/assignments/:id/check-out`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|POST|`/v1/assignments/:id/complete`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/company/work-graph`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|
|GET|`/v1/work-passport/mine`|NegativaHTTPownerestrangeiro+anônimo401, snapshotinalterado|

### Fontes executadas dos controllers

```json
{
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
```

## Android, limites e matriz

APK N/A integral para produto613 e este delta documental:184insumosprotegidos/173mobileBYTEidênticos ao produto literal1b85403cafd9e17bceeb3ea47ce27fdf03c1496e; NovoSQL/API/CJS não é importado pelo buildExpo→Gradle. O workflowStandalone filtra mobile/build/deps, semAPKworkflow613. ÚltimoAPKmedido literal1b854/run39708675307SUCCESS/DEVICE_SMOKE_OK semMetro, artifact12396378712unexpired/ZIP28913839digest2f1b75c2f67d4139c26c8f280cfa90e671505818ce704f863ef2752fd8c79537 revalidadoAPI; nenhum novo download de bytes nesta formalização. APKindividual66162796SHA256c0c25691c032b115a6285c04a106bc2cafa7209dc935363cd1ada4fd26e85a05 é recibo de medição anterior, não APK literald6b8 ou desteSHA. Reactmobile19.1.4/RN0.81.6/lock c1a67de447f42375a02a05a03661037262f9cd8d intactos. Workflows/browserFetchCDPCORSsandboxLNA15s/NetLogboundedfailclosed/asserts intactos; nenhumPNGnovo nemVisualTruthclaim.

**Matriz apósintegraçãodestaformalização:8áreas concluídas internamente2,3,4,5,6,7,9,10;5pendentes1,8,11,12,13.** Não é percentualdecódigo. Não é Production-DONE, pentestindependente, arquitetura/credenciaisinfra/Neon/Railwaydeprodução, dispositivo físico, renderRNform/SecureStore nativo,PSP/KYC/KYB/contratos/dinheiroreal ouvalidaçãoexterna. Áreas8/11/12/13/1nãofechadasporarrasto; externos215/219/220/224/228separados e574/565drafts. Routineexistentecontinua; semnovaautomação oupromessadeexecuçãoininterrupta.

Prefixosintegrais6normativos preservados. Quatro notas decandidatura/falhaslegítimas613 preservam fontes/primárias; “PENDENTE”éestadohistórico supersedido SÓpara7 nesta decisão. Os5SHAsdo613 foramlegítimos (prova,2permissões+fixture,perfil+SECDEF,compatlock+HTTP,expectativaunitestrita), nenhum rerunmesmoSHA/commitstatus. Esta formalização é entrega deaceite técnico porrequisito comprovado; CI própria e literalpós-mergepróprias devem ser registradas no corpoPRfinal semautorreferênciaGit que reinvalideogate.

### Manifesto Android protegido

```json
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
    "sha": "d99f5ad3cf53331aa55be0a2d38ac9a2fc4004a7",
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
    "path": ".github/workflows/standalone-pilot-apk.yml",
    "sha": "e0fc5f871dc3b498f71a38ff932c83b48716c35f",
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
    "path": ".github/workflows/ci.yml",
    "sha": "b42bd9e89aa8052e2d1d9e36c63b4dee621b4e25",
    "mode": "100644"
  },
  {
    "path": ".github/workflows/pilot-android.yml",
    "sha": "d6c9c21d00e8d038211d155085d77af8cad59dff",
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
  }
]
```

## Recibo terminal613 integral preservado

## Corrige três permissões excessivas de escrita e mantém cancelamento concorrente

A role tenant app_runtime podia registrar termos de outra identidade e alterar habilidades de outro profissional. A prova real também identificou INSERT/UPDATE excessivos em perfis. A migração0072 revoga esses writes e mantém SELECT para matching/planner; termos/perfis/capacidades continuam no caminho autenticado por identidade da API. SemGRANT/ALTERROLE/RLSbypass ou alteração de dados históricos.

CancellationController passa a usar `FOR NO KEY UPDATE OF wa`: mantém lock da alocação e não exige escrita no perfil joined. O teste unitário existente exige exatamente OFwa; todos os outros asserts/casos permanecem. A nova jornada real HTTP/PostgreSQL prova 27TENANT/44tabelas, negativas SELECT/INSERT/UPDATE/DELETE/rebind, contextos ausente/inválido, Poolreal1conexão/DatabaseService,8SECURITYDEFINER e148negativas74rotas tenant. São43controllers/106rotas inventariadas;32contratos globais/identidade têm escopo separado, semalegar106jornadaspositivas. Cancelamentos profissional eempresa201 deixam perfis/tenantvizinhoinalterados; barreirasoriginais selecionam/cancelam sem duplicação ou requestaberto terminal.

### Validação própria completa

CI39872228407/job120149166133/attempt1 SUCCESS, zero rerun/cancel. HEAD `325c6d761f624de2dbe3f0918c48e73d60ea0ed8`; árvore `1969278483372480dd1874e5d6b06bc7daddcfc5`. Checkout primário23:30:46.2703903Z SINTÉTICO `3494aa65f8a4ba04d99219f5cbd53690fd99f666`, pais[e88f8d4ff9f11b92e82b4c9510c50c4607ca09a8,325c6d761f624de2dbe3f0918c48e73d60ea0ed8], árvoreexata, NÃOliteralHEAD.1936unit[217Web1186mobile519API3CLI11monitor]PASS0fail/skip/cancel; tipos/build/exportAndroid/migração2x/privacy/HTTPPG/12matrix+canonical/MATRIX0/ProductionTruth23:36:39.9066339ZPASS. As3tentativasdiretas indevidas42501/ACLviolations[]; cancelamentossequenciais23:33:35.6454428Z ebarreirasconcorrentes23:35:36.0205363Z/.1666802ZPASS.

15paths revistos porSHA/modo. SeisnormativosFULLprefixappend e4notas preservam história+fontes. Nenhum insumo Android modificado:184protegidos/173mobileBYTEiguais ao APKliteral1b854/39708675307/artifact12396378712unexpired. BackendSQL/API/CJS/docs fora deExpo→Gradle; APK N/A integral, semAPKemprestado como se fosse desteSHA. React19.1.4/RN0.81.6/lock/workflows/browserCDPFetchCORSsandboxLNA15s/asserts intactos.

Merge autorizado apenas apósfreshMAIN/head/base/diff eexpectedSHA; literalpósmergeCI ainda PENDENTE. Área7 aindaPENDENTEaté cadeia eformalização; aceitas2,3,4,5,6,9,10 ependentes1,7,8,11,12,13. #574/#565drafts, externos215/219/220/224/228separados. Semprodução/PSP/dinheiro/pentest/aparelhofísico/serviçocustos/root/grants/bypass.

### Primária própria selecionada integral

```text
2026-10-22T23:30:46.2703903Z HEAD is now at 3494aa6 Merge 325c6d761f624de2dbe3f0918c48e73d60ea0ed8 into e88f8d4ff9f11b92e82b4c9510c50c4607ca09a8
2026-10-22T23:33:34.9791134Z TENANT_BOUNDARY_PRIVILEGED_FUNCTIONS_PASS {"functions":[{"name":"active_marketplace_professional","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"6ba44cf9b5811777400ee972a9860be5eb019176711f8a6faee1241527cc38ea"},{"name":"active_marketplace_professional_identity","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"81b865441978c5da4c77c2b6f6e645fbc5b31e4b9e0e6e322a0f57f68b23f2f8"},{"name":"active_tenant_professional","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"36a6d8c098aa513e5ea05ce6c8d267fc73fc0fd3ec3a9bf416434c00465853bf"},{"name":"active_tenant_professional_identity","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"aa79b84b4a1e14a093df44ba3bf55b32a3d0e416bc5f556e4130759b651b7e75"},{"name":"confirm_marketplace_interest","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"9cba54a88998ef837f455ca1926e688bd5524c49e13156e1c4c51bc3ec23129d"},{"name":"list_company_members","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"307a0432bd2bfe87527d2b7be3ee0906389f1ab829f73f18a1b21d829f7ff39a"},{"name":"refresh_marketplace_company_reputation","publicExecute":false,"runtimeExecute":false,"fixedSearchPath":true,"definitionSHA256":"72bec6d7aec9bb6938e5384510fdc01b4e4f2d79f30eb378be64e635094e2213"},{"name":"sync_marketplace_job_projection","publicExecute":false,"runtimeExecute":false,"fixedSearchPath":true,"definitionSHA256":"461937c5bfe59bbfb4b569180798cbc4834fd21f829c1b43691797ffa657b7a4"}],"ownAndForeignBothDirections":true,"missingContextDenied":true,"confirmationWritesRolledBack":true}
2026-10-22T23:33:35.1110572Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"terms_acceptances","method":"INSERT_FOREIGN_IDENTITY","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:33:35.1113036Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_capabilities","method":"UPDATE_FOREIGN_PROFESSIONAL","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:33:35.1115417Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_profiles","method":"UPDATE_FOREIGN_PROFILE","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:33:35.1318147Z TENANT_BOUNDARY_ALL_TABLES_PASS {"classifiedTables":44,"tenantTables":27,"validTenantGraphs":2,"readBothDirections":true,"insertAndTenantRebindDenied":true,"updateDeleteResults":[{"table":"assignment_cancellations","method":"UPDATE","result":"ACL_DENIED"},{"table":"assignment_cancellations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_jobs","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_jobs","method":"DELETE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_work_ratings","method":"DELETE","result":"ACL_DENIED"},{"table":"conversation_messages","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversation_messages","method":"DELETE","result":"RLS_FILTERED"},{"table":"conversations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversations","method":"DELETE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"UPDATE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"DELETE","result":"ACL_DENIED"},{"table":"earnings_ledger","method":"UPDATE","result":"RLS_FILTERED"},{"table":"earnings_ledger","method":"DELETE","result":"ACL_DENIED"},{"table":"job_interests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"job_interests","method":"DELETE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"notifications","method":"UPDATE","result":"RLS_FILTERED"},{"table":"notifications","method":"DELETE","result":"RLS_FILTERED"},{"table":"payment_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"payment_events","method":"DELETE","result":"ACL_DENIED"},{"table":"professional_availability","method":"UPDATE","result":"RLS_FILTERED"},{"table":"professional_availability","method":"DELETE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"DELETE","result":"RLS_FILTERED"},{"table":"safety_case_appeal_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeal_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"safety_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"support_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"support_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"talent_pool_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"talent_pool_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"UPDATE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"DELETE","result":"RLS_FILTERED"},{"table":"trust_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"trust_events","method":"DELETE","result":"ACL_DENIED"},{"table":"verification_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"verification_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"work_assignments","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_assignments","method":"DELETE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"DELETE","result":"RLS_FILTERED"},{"table":"assignment_cancellations","method":"UPDATE","result":"ACL_DENIED"},{"table":"assignment_cancellations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_jobs","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_jobs","method":"DELETE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_work_ratings","method":"DELETE","result":"ACL_DENIED"},{"table":"conversation_messages","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversation_messages","method":"DELETE","result":"RLS_FILTERED"},{"table":"conversations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversations","method":"DELETE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"UPDATE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"DELETE","result":"ACL_DENIED"},{"table":"earnings_ledger","method":"UPDATE","result":"RLS_FILTERED"},{"table":"earnings_ledger","method":"DELETE","result":"ACL_DENIED"},{"table":"job_interests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"job_interests","method":"DELETE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"notifications","method":"UPDATE","result":"RLS_FILTERED"},{"table":"notifications","method":"DELETE","result":"RLS_FILTERED"},{"table":"payment_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"payment_events","method":"DELETE","result":"ACL_DENIED"},{"table":"professional_availability","method":"UPDATE","result":"RLS_FILTERED"},{"table":"professional_availability","method":"DELETE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"DELETE","result":"RLS_FILTERED"},{"table":"safety_case_appeal_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeal_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"safety_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"support_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"support_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"talent_pool_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"talent_pool_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"UPDATE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"DELETE","result":"RLS_FILTERED"},{"table":"trust_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"trust_events","method":"DELETE","result":"ACL_DENIED"},{"table":"verification_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"verification_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"work_assignments","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_assignments","method":"DELETE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"DELETE","result":"RLS_FILTERED"}],"missingAndInvalidContextDenied":true,"fixtureGraphRolledBack":true}
2026-10-22T23:33:35.6454428Z TENANT_BOUNDARY_LEAST_PRIVILEGE_CANCELLATION_PASS {"realHTTPPostgres":true,"professionalAndCompany":true,"assignmentAuditPersisted":true,"profilesByteUnchanged":true,"otherTenantAll27TablesUnchanged":true,"profileUpdatePermissionNotRestored":true}
2026-10-22T23:33:35.6568138Z TENANT_BOUNDARY_ENDPOINTS_PASS {"registeredControllers":43,"inventoriedRoutes":106,"tenantHeaderRoutes":74,"negativeHTTPRequests":148,"controllerSourceGitBlobs":{"auth.controller.ts":"c432aa1e28e02c8064144e913168cc64e8a38e97","availability.controller.ts":"fc225952e5063d65b344046d77dc1f8062026b3c","cancellation.controller.ts":"33beafd3d8d7788792dcec8ad1463e4a617e3956","career-conversion.controller.ts":"b05d7094db192ec5613219dc4b9c64e4e8d8679b","career.controller.ts":"fe8f6cadb28617c896883622be9fac305172ea1a","company-analytics.controller.ts":"9d4aea6ba5f51260dd7b9f298837be9cb806b4ba","company-dashboard.controller.ts":"46e0a2847dcfe9655979a405b29cffdac2f8026e","company-job-create.controller.ts":"50acee5e5f13731101bc77abcb29d5e21c946206","company-jobs.controller.ts":"e888c6a6db28bd3f48223f150a5895ffc6c26d9c","company-members.controller.ts":"b63fedb082c0b8ed20b1b9f7daebe5045705ab4d","conversations.controller.ts":"05f479c1ab3a2350c8bcd1fd32b1bdd574e62ec3","copilot.controller.ts":"a78315b38e7b9d018a6d47e0f300a377a5d84071","earnings.controller.ts":"f091a1262e2c7a9934358883ea2ef8919ababf97","health.controller.ts":"35afec02ee6dcf41c6d9bc7809f91e660cff44ff","integrity.controller.ts":"6004fa00460b9fc9466b343400371e07adaeaefb","jobs.controller.ts":"185be30435f34dc270461fefce284a37ac7a3b5e","me.controller.ts":"5e655898870718c4644998d76e1524c4af6d2c15","notifications.controller.ts":"dfe072e660b41060ff809eeefc489ae9aeb3981a","payment-events.controller.ts":"3030f292e35b5fbeb7c1c1bc0cd74149ea6d6313","payment-webhook.controller.ts":"81d39a81a9a93d556a8651d3492abc937f65a0f9","planner.controller.ts":"ceae97178b4f9b7fe9cf819e47d328bfcd09c790","privacy.controller.ts":"4c9427c20213a838fda51adc2547014f31ef5456","professional-capabilities.controller.ts":"6325906dea732851d6ed8f75be11c7baecbc7c5e","professional-planner.controller.ts":"5220558e1f5610607134b497bf95e16cecf39edb","professional-profile.controller.ts":"c7333a3d6b8b63d074885c5df9cc707482cc3949","ratings.controller.ts":"d4e41af53698b1658e620e717cafd1ec129a260a","replacement.controller.ts":"809c27f1551c103adc9e6950f79555eb42d3b7db","safety-admin.controller.ts":"baf0a51aae1c2cae598dbf3e7bdb7660b6b1f7f7","safety-appeals.controller.ts":"f9425e7357c8e6af17c866d1eb7803a19e430fff","safety-cases.controller.ts":"aa62c24959e927e896b041b744c4c154a58591b0","support.controller.ts":"b7418f9c3473b15ee32a488b7b354816c80acf28","talent-pools.controller.ts":"3e4156f6d582028101c06c5c21e6a2a7c6bc5ab4","taxonomy.controller.ts":"9552ffc4ddb96ebfe1db760cc104bcd23416bb5a","team-allocation.controller.ts":"a316e0362c7d4de75bcf8cf0c347b6d21bfcac7f","teams.controller.ts":"40ffb43f9200d79e60262d3f9005155cce64b7fc","terms.controller.ts":"597e5fbda7337046452e4e8542df00face09a416","trust-events.controller.ts":"ac760f24611da21d0b67f4b5ec5174915f07b73e","verification.controller.ts":"e43b5f95d05a505b5146a0c0ea2281d5d0dee63f","vertical-packs.controller.ts":"98a2b07f18f277c19220d588d1e44c945b11c8f4","work-assignments.controller.ts":"3c4c1c7023fb9fcbdfd84a4e594a67bbb491a6a8","work-graph.controller.ts":"5bed24a5999a66290a3eb058b09d70948e8c17f6","work-passport.controller.ts":"af621fe5009ff08f37d51ef49257b16293ceb5b7"},"actualDatabaseServicePoolSize":1,"commitAndRollbackReuse":true,"identityAPIsRemainOperational":true,"requests":179}
2026-10-22T23:33:35.6588766Z TENANT_BOUNDARY_RUNTIME_ACL_OBSERVED {"violations":[]}
2026-10-22T23:33:35.6596065Z TENANT_BOUNDARY_ACCEPTANCE_HTTP_PG_PASS {"tenantTables":27,"tableScopes":{"tenants":"PLATFORM","identities":"PLATFORM","sessions":"PLATFORM","auth_signin_limits":"PLATFORM","terms_acceptances":"PLATFORM","taxonomy_roles":"PLATFORM","schema_migrations":"PLATFORM","privacy_legal_holds":"PLATFORM","privacy_requests":"PLATFORM","privacy_retention_runs":"PLATFORM","privacy_legal_hold_reviews":"PLATFORM","professional_profiles":"PROFESSIONAL_OWNED","professional_capabilities":"PROFESSIONAL_OWNED","professional_availability_network":"PROFESSIONAL_OWNED","marketplace_jobs":"NETWORK_SHARED","marketplace_interests":"NETWORK_SHARED","marketplace_company_reputation":"NETWORK_SHARED"},"all106RoutesInventoried":true,"all74TenantHeaderRoutesDeniedForeignAndAnonymous":true,"globalAndIdentityRuntimeLeastPrivilege":true,"realPostgreSQL":true,"externalPentest":false,"nativeUI":false,"production":false}
2026-10-22T23:34:19.8797015Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/concurrent PASS
2026-10-22T23:34:26.2720246Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/serial PASS
2026-10-22T23:34:27.6798642Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/concurrent PASS
2026-10-22T23:34:34.0154263Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/serial PASS
2026-10-22T23:34:35.4062611Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/concurrent PASS
2026-10-22T23:34:41.7660872Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/serial PASS
2026-10-22T23:34:48.3490551Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/concurrent PASS
2026-10-22T23:34:54.9162331Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/serial PASS
2026-10-22T23:35:04.6449218Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/baseline/concurrent PASS
2026-10-22T23:35:09.1179791Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/log-only/concurrent PASS
2026-10-22T23:35:19.4031735Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/native-only/concurrent PASS
2026-10-22T23:35:28.8140809Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/instrumented/concurrent PASS
2026-10-22T23:35:31.6726564Z WEB_BROWSER_CURRENT_MAIN_CASE_RESULT PASS
2026-10-22T23:35:31.6726983Z WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=0
2026-10-22T23:35:35.6334332Z PASS: professional and company cancellation retain real ACKs tenant scope and no financial compensation
2026-10-22T23:35:36.0205363Z PASS: concurrent replacement selection crossed PostgreSQL barrier, one matched ACK, one closed-request rejection, one substitute and notification
2026-10-22T23:35:36.1666802Z PASS: concurrent replacement creation and cancellation leave assignment and request terminally cancelled
2026-10-22T23:36:39.9066339Z PASS: Production Truth Gate health/readiness contract
```

### Histórico completo da preparação, supersedido apenas temporalmente

## Correção integrada da fronteira de isolamento7 — candidata

A CI39868876663 reproduziu sob app_runtime/tenantA dois writes indevidos: INSERT de termos para outra identidade e UPDATE de habilidades de outro profissional, cadaum rowCount1, ambos revertidos. A migração aditiva0072 remove permissões de termos e IUD de capacidades; mantém SELECT paraPlanner e os caminhos autenticados por identidade daAPI. Nenhum novoGRANT/RLSbypass/ALTERROLE/repair.

A jornada cobre27TENANT/44tabelas, SELECT sem filtro/INSERT/rebind/UPDATEDELETE bidirecionais, contexto ausente/inválido e classe DatabaseService compilada comPoolPGreal de uma conexão. Inventaria43controllers/106rotas;74rotastenant devem rejeitarowner estrangeiro/anônimo401 e preservar snapshots. Baseline provou as27tabelas e os2writes; falhou na etapaHTTP sem registrarrota. A fixture agora fornece toolcopilotválido/perfilpassportnecessário e diagnóstico método/UUIDredigido/status. Não se alteram APIs ou asserts401/42501 para acomodar a falha.

Base `e88f8d4ff9f11b92e82b4c9510c50c4607ca09a8`; novoHEAD `c2a6a8f60acbc54277dee7a4ed5bb88c987b094c`; árvore `7e3a41ed175349d4ef6e09357f7102f37011627d`, pai `e97c4b4c87698c75f56002482f2c41aed1913568` (primeirotestelegítimo). Baseline checkout sintético fd51980a49c99d1a492eb264e2cf8a03cf8e20d9/árvorec05f4f... exact.1936unit+types/build/export/migrações2x/privacyPASS; browser/ProductionTruth NÃOexecutados no primeiroCI. Zero reruns/cancel. NovoSHA exige CI completa própria e literal pós-merge; nãoemprestarPASS.

11paths, seisnormativosFULLprefixappend e2recibos contendo fontes/primária. Nenhum mobile/deps/lock/workflow/browserflag/deadlinealterado. APK N/A por184insumosprotegidos/173mobile BYTEidênticos ao APKliteral1b854 e delta SQL/scripts/docs fora deExpo→Gradle. NãoAPKdesteSHA. Áreas2,3,4,5,6,9,10 aceitas;1,7,8,11,12,13 pendentes. Sem PSP/dinheiro/pentest/produção/serviço/aparelho físico/root/grants/bypass. #574/#565 drafts preservados.

## Extensão por terceira permissão detectada, não rerun

Novo HEAD `3071f8c8672dfb48934c0b058274d8e9697742af`, árvore `72d6cfa9b7c8116776c60c346016e5b8f19520d0`, pai `c2a6a8f60acbc54277dee7a4ed5bb88c987b094c`. CI39869731126/job120140841377a1FAIL confirmou termos/capacidades42501,27TENANTPASS,148negativas74rotasHTTPPASS e poolreal. Falha específica: runtime ainda possuía INSERT/UPDATE deprofessional_profiles (0034): INSERTDEFAULT23502 eUPDATEWHEREfalse0sem erro. Não alegar alteração de perfil válido naquele baseline.0072 agora revogaIUDprofiles e preservaSELECT; API identidade/Planner/matching intactos. Novo probe exige42501 paraUPDATEdireto deperfil estrangeiro. Completa também a prova integrada dos8SECURITYDEFINER (6callable/2trigger-only/PUBLICrevogado/fixedsearch_path/duastenants/ausênciacontexto), requisito expressoADR7.

12paths/revisãoSHA+modes/184insumosAndroidintactos. Terceiro commit funcional justificado por defeito de permissão e requisito faltante,0SAMESHAreruns. Fullsource/primárias em PROFILE_AND_PRIVILEGED_RUNTIME_BOUNDARY_2026-10-22.md e seisnormativosfullprefix. CI completa própria+POSTliteral continuam obrigatórias; SEMACEITE7 antecipado. Browser/ProductionTruth sequer executados na run39869731126, nãoatribuirChrome.

## Compatibilidade comprovada: lock restrito à alocação

NovoHEAD `a464e6347379b704393bc85674659882c2bf200a`/árvore `5b25a327984adb59d4cd6944f382740fd8cd64a6`, pai `3071f8c8672dfb48934c0b058274d8e9697742af`. CI39870499567/job120143431301a1FAIL: TODAprova7realHTTPPGPASS23:17:48.2540803Z (27TENANT/44tables/8SECDEF/3writes42501/148negativas/ACLviolations[]/Poolreal). Browser12/12+canonical/MATRIX0PASS23:19:34.5449072Z. Falhou depois em cancelamentoválidoHTTP500/42501professional_profiles: FOR NO KEY UPDATE semOF bloqueava o perfiljoined e exigiaUPDATE. Corrigir só6caracteres OF wa, mantendo lockdaalocação e restriçãoIUDdo perfil. NãoRCAChrome nemrestaurargrant.

Jornadaagora adiciona confirmaçãoreal→cancelamentoprofissional eempresa,201/auditpersistido/perfisinalterados/27tabelasoutrotenantinalteradas. Barreiras originais deconcorrência replacement/cancellation continuam obrigatórias e integrais. Fonte/primáriasFULL em LEAST_PRIVILEGE_CANCELLATION_LOCK_2026-10-22.md;14paths/6normprefixappend,184protegidosAndroidintactos. CIprópria completa+POSTliteral continuam obrigatórias. Área7 PENDENTE,semaceiteoumergeantecipado. ZeroSAMESHAreruns/cancel/force.

## Reconciliação estrita do teste de lock existente

HEAD atual `325c6d761f624de2dbe3f0918c48e73d60ea0ed8`/árvore `1969278483372480dd1874e5d6b06bc7daddcfc5`, pai `a464e6347379b704393bc85674659882c2bf200a`. CI39871529373/job120146860918a1FAIL emRunTests: caso43 ainda exigia `/FOR NO KEY UPDATE$/`; tipos/build/exportPASS e demaisgatesSKIP. Atualiza somenteessa expectativa para `/FOR NO KEY UPDATE OF wa$/`, semalternância/removerassert/novo contador. Produto e jornadaHTTP BYTEidênticos aoHEADa464. Os10casosexistentes mantêm ordem/tenant/actor/estados/audit/close/erro; forteassertOFwa agora impede regressão ao lockdo perfil. Fonte/primáriaFULLappend no reciboLEAST_PRIVILEGE_CANCELLATION_LOCK. NenhumrerunmesmoSHA/commitstatus; novoSHA executará CIinteira. Não atribuirbrowser/PG/ProductionTruth de3071 aesteSHA; aindaaguarda própriosgates+POST.

---

## FINAL pós-merge literal — supersede apenas pendência temporal acima

#613 MERGEDuma vez; literalMAIN `d6b8c72389fd0825e2a96c25f5722a9d265844c2`, árvore `1969278483372480dd1874e5d6b06bc7daddcfc5`, pais[e88f8d4ff9f11b92e82b4c9510c50c4607ca09a8,325c6d761f624de2dbe3f0918c48e73d60ea0ed8]. POSTCI39873134900/job120152158629/attempt1SUCCESS, checkoutGitlog23:38:59.8445399ZLITERALd6b8.1936unit[217/1186/519/3/11]PASS0fail/skip/cancel; alltypes/build/export/migração2x/privacy/HTTPPG/browser12+canonical/MATRIX0/ProductionTruth23:43:45.8698500ZPASS. ProjectActivityWatch39873134887éoutroworkflow,nãoCI/build.

Prova7PASS23:41:16.6629491Z;3writes42501/ACLviolations[];8SECDEF/BOTHtenant/missingcontext/27TENANTRLS/148negativas74rotas+Pool1;cancelamentoprofissionaleempresa23:41:16.6531246Z;corridasselection23:42:57.7454814Z ecreate/cancel.8864931ZPASS.15pathsrevistos;0rerun/cancel/force. Native184protected/173mobileigualAPK1b854;APIartifact12396378712notexpiredZIP28913839/digest2f1b75c2f67d4139c26c8f280cfa90e671505818ce704f863ef2752fd8c79537revalidadoagora,semnovodownloadAPK/ZIP. APK N/A nãoAPKliterald6b8.

Produto integrado e validado; formalização doaceite7 será feita emdelta documental coerente apoiado nesta cadeia, semautorreferência/statuscommit. Atéformalizaçãomatrizmainainda7aceitas/6pendentes; NÃOmarcaroutrositensporarrasto. Semaprovaçãoexterna/produção/PSP/dinheiro/pentest/aparelhofísico.574/565drafts e215/219/220/224/228externosseparados.

### Primária literal integral selecionada

```text
2026-10-22T23:38:57.1105215Z [command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +d6b8c72389fd0825e2a96c25f5722a9d265844c2:refs/remotes/origin/main
2026-10-22T23:38:59.6131760Z  * [new ref]         d6b8c72389fd0825e2a96c25f5722a9d265844c2 -> origin/main
2026-10-22T23:38:59.8445399Z d6b8c72389fd0825e2a96c25f5722a9d265844c2
2026-10-22T23:41:16.2218779Z TENANT_BOUNDARY_PRIVILEGED_FUNCTIONS_PASS {"functions":[{"name":"active_marketplace_professional","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"6ba44cf9b5811777400ee972a9860be5eb019176711f8a6faee1241527cc38ea"},{"name":"active_marketplace_professional_identity","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"81b865441978c5da4c77c2b6f6e645fbc5b31e4b9e0e6e322a0f57f68b23f2f8"},{"name":"active_tenant_professional","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"36a6d8c098aa513e5ea05ce6c8d267fc73fc0fd3ec3a9bf416434c00465853bf"},{"name":"active_tenant_professional_identity","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"aa79b84b4a1e14a093df44ba3bf55b32a3d0e416bc5f556e4130759b651b7e75"},{"name":"confirm_marketplace_interest","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"9cba54a88998ef837f455ca1926e688bd5524c49e13156e1c4c51bc3ec23129d"},{"name":"list_company_members","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"307a0432bd2bfe87527d2b7be3ee0906389f1ab829f73f18a1b21d829f7ff39a"},{"name":"refresh_marketplace_company_reputation","publicExecute":false,"runtimeExecute":false,"fixedSearchPath":true,"definitionSHA256":"72bec6d7aec9bb6938e5384510fdc01b4e4f2d79f30eb378be64e635094e2213"},{"name":"sync_marketplace_job_projection","publicExecute":false,"runtimeExecute":false,"fixedSearchPath":true,"definitionSHA256":"461937c5bfe59bbfb4b569180798cbc4834fd21f829c1b43691797ffa657b7a4"}],"ownAndForeignBothDirections":true,"missingContextDenied":true,"confirmationWritesRolledBack":true}
2026-10-22T23:41:16.3054490Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"terms_acceptances","method":"INSERT_FOREIGN_IDENTITY","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:41:16.3055607Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_capabilities","method":"UPDATE_FOREIGN_PROFESSIONAL","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:41:16.3056511Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_profiles","method":"UPDATE_FOREIGN_PROFILE","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:41:16.3162281Z TENANT_BOUNDARY_ALL_TABLES_PASS {"classifiedTables":44,"tenantTables":27,"validTenantGraphs":2,"readBothDirections":true,"insertAndTenantRebindDenied":true,"updateDeleteResults":[{"table":"assignment_cancellations","method":"UPDATE","result":"ACL_DENIED"},{"table":"assignment_cancellations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_jobs","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_jobs","method":"DELETE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_work_ratings","method":"DELETE","result":"ACL_DENIED"},{"table":"conversation_messages","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversation_messages","method":"DELETE","result":"RLS_FILTERED"},{"table":"conversations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversations","method":"DELETE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"UPDATE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"DELETE","result":"ACL_DENIED"},{"table":"earnings_ledger","method":"UPDATE","result":"RLS_FILTERED"},{"table":"earnings_ledger","method":"DELETE","result":"ACL_DENIED"},{"table":"job_interests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"job_interests","method":"DELETE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"notifications","method":"UPDATE","result":"RLS_FILTERED"},{"table":"notifications","method":"DELETE","result":"RLS_FILTERED"},{"table":"payment_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"payment_events","method":"DELETE","result":"ACL_DENIED"},{"table":"professional_availability","method":"UPDATE","result":"RLS_FILTERED"},{"table":"professional_availability","method":"DELETE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"DELETE","result":"RLS_FILTERED"},{"table":"safety_case_appeal_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeal_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"safety_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"support_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"support_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"talent_pool_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"talent_pool_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"UPDATE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"DELETE","result":"RLS_FILTERED"},{"table":"trust_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"trust_events","method":"DELETE","result":"ACL_DENIED"},{"table":"verification_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"verification_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"work_assignments","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_assignments","method":"DELETE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"DELETE","result":"RLS_FILTERED"},{"table":"assignment_cancellations","method":"UPDATE","result":"ACL_DENIED"},{"table":"assignment_cancellations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_jobs","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_jobs","method":"DELETE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_work_ratings","method":"DELETE","result":"ACL_DENIED"},{"table":"conversation_messages","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversation_messages","method":"DELETE","result":"RLS_FILTERED"},{"table":"conversations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversations","method":"DELETE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"UPDATE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"DELETE","result":"ACL_DENIED"},{"table":"earnings_ledger","method":"UPDATE","result":"RLS_FILTERED"},{"table":"earnings_ledger","method":"DELETE","result":"ACL_DENIED"},{"table":"job_interests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"job_interests","method":"DELETE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"notifications","method":"UPDATE","result":"RLS_FILTERED"},{"table":"notifications","method":"DELETE","result":"RLS_FILTERED"},{"table":"payment_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"payment_events","method":"DELETE","result":"ACL_DENIED"},{"table":"professional_availability","method":"UPDATE","result":"RLS_FILTERED"},{"table":"professional_availability","method":"DELETE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"DELETE","result":"RLS_FILTERED"},{"table":"safety_case_appeal_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeal_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"safety_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"support_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"support_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"talent_pool_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"talent_pool_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"UPDATE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"DELETE","result":"RLS_FILTERED"},{"table":"trust_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"trust_events","method":"DELETE","result":"ACL_DENIED"},{"table":"verification_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"verification_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"work_assignments","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_assignments","method":"DELETE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"DELETE","result":"RLS_FILTERED"}],"missingAndInvalidContextDenied":true,"fixtureGraphRolledBack":true}
2026-10-22T23:41:16.6531246Z TENANT_BOUNDARY_LEAST_PRIVILEGE_CANCELLATION_PASS {"realHTTPPostgres":true,"professionalAndCompany":true,"assignmentAuditPersisted":true,"profilesByteUnchanged":true,"otherTenantAll27TablesUnchanged":true,"profileUpdatePermissionNotRestored":true}
2026-10-22T23:41:16.6613477Z TENANT_BOUNDARY_ENDPOINTS_PASS {"registeredControllers":43,"inventoriedRoutes":106,"tenantHeaderRoutes":74,"negativeHTTPRequests":148,"controllerSourceGitBlobs":{"auth.controller.ts":"c432aa1e28e02c8064144e913168cc64e8a38e97","availability.controller.ts":"fc225952e5063d65b344046d77dc1f8062026b3c","cancellation.controller.ts":"33beafd3d8d7788792dcec8ad1463e4a617e3956","career-conversion.controller.ts":"b05d7094db192ec5613219dc4b9c64e4e8d8679b","career.controller.ts":"fe8f6cadb28617c896883622be9fac305172ea1a","company-analytics.controller.ts":"9d4aea6ba5f51260dd7b9f298837be9cb806b4ba","company-dashboard.controller.ts":"46e0a2847dcfe9655979a405b29cffdac2f8026e","company-job-create.controller.ts":"50acee5e5f13731101bc77abcb29d5e21c946206","company-jobs.controller.ts":"e888c6a6db28bd3f48223f150a5895ffc6c26d9c","company-members.controller.ts":"b63fedb082c0b8ed20b1b9f7daebe5045705ab4d","conversations.controller.ts":"05f479c1ab3a2350c8bcd1fd32b1bdd574e62ec3","copilot.controller.ts":"a78315b38e7b9d018a6d47e0f300a377a5d84071","earnings.controller.ts":"f091a1262e2c7a9934358883ea2ef8919ababf97","health.controller.ts":"35afec02ee6dcf41c6d9bc7809f91e660cff44ff","integrity.controller.ts":"6004fa00460b9fc9466b343400371e07adaeaefb","jobs.controller.ts":"185be30435f34dc270461fefce284a37ac7a3b5e","me.controller.ts":"5e655898870718c4644998d76e1524c4af6d2c15","notifications.controller.ts":"dfe072e660b41060ff809eeefc489ae9aeb3981a","payment-events.controller.ts":"3030f292e35b5fbeb7c1c1bc0cd74149ea6d6313","payment-webhook.controller.ts":"81d39a81a9a93d556a8651d3492abc937f65a0f9","planner.controller.ts":"ceae97178b4f9b7fe9cf819e47d328bfcd09c790","privacy.controller.ts":"4c9427c20213a838fda51adc2547014f31ef5456","professional-capabilities.controller.ts":"6325906dea732851d6ed8f75be11c7baecbc7c5e","professional-planner.controller.ts":"5220558e1f5610607134b497bf95e16cecf39edb","professional-profile.controller.ts":"c7333a3d6b8b63d074885c5df9cc707482cc3949","ratings.controller.ts":"d4e41af53698b1658e620e717cafd1ec129a260a","replacement.controller.ts":"809c27f1551c103adc9e6950f79555eb42d3b7db","safety-admin.controller.ts":"baf0a51aae1c2cae598dbf3e7bdb7660b6b1f7f7","safety-appeals.controller.ts":"f9425e7357c8e6af17c866d1eb7803a19e430fff","safety-cases.controller.ts":"aa62c24959e927e896b041b744c4c154a58591b0","support.controller.ts":"b7418f9c3473b15ee32a488b7b354816c80acf28","talent-pools.controller.ts":"3e4156f6d582028101c06c5c21e6a2a7c6bc5ab4","taxonomy.controller.ts":"9552ffc4ddb96ebfe1db760cc104bcd23416bb5a","team-allocation.controller.ts":"a316e0362c7d4de75bcf8cf0c347b6d21bfcac7f","teams.controller.ts":"40ffb43f9200d79e60262d3f9005155cce64b7fc","terms.controller.ts":"597e5fbda7337046452e4e8542df00face09a416","trust-events.controller.ts":"ac760f24611da21d0b67f4b5ec5174915f07b73e","verification.controller.ts":"e43b5f95d05a505b5146a0c0ea2281d5d0dee63f","vertical-packs.controller.ts":"98a2b07f18f277c19220d588d1e44c945b11c8f4","work-assignments.controller.ts":"3c4c1c7023fb9fcbdfd84a4e594a67bbb491a6a8","work-graph.controller.ts":"5bed24a5999a66290a3eb058b09d70948e8c17f6","work-passport.controller.ts":"af621fe5009ff08f37d51ef49257b16293ceb5b7"},"actualDatabaseServicePoolSize":1,"commitAndRollbackReuse":true,"identityAPIsRemainOperational":true,"requests":179}
2026-10-22T23:41:16.6625700Z TENANT_BOUNDARY_RUNTIME_ACL_OBSERVED {"violations":[]}
2026-10-22T23:41:16.6629491Z TENANT_BOUNDARY_ACCEPTANCE_HTTP_PG_PASS {"tenantTables":27,"tableScopes":{"tenants":"PLATFORM","identities":"PLATFORM","sessions":"PLATFORM","auth_signin_limits":"PLATFORM","terms_acceptances":"PLATFORM","taxonomy_roles":"PLATFORM","schema_migrations":"PLATFORM","privacy_legal_holds":"PLATFORM","privacy_requests":"PLATFORM","privacy_retention_runs":"PLATFORM","privacy_legal_hold_reviews":"PLATFORM","professional_profiles":"PROFESSIONAL_OWNED","professional_capabilities":"PROFESSIONAL_OWNED","professional_availability_network":"PROFESSIONAL_OWNED","marketplace_jobs":"NETWORK_SHARED","marketplace_interests":"NETWORK_SHARED","marketplace_company_reputation":"NETWORK_SHARED"},"all106RoutesInventoried":true,"all74TenantHeaderRoutesDeniedForeignAndAnonymous":true,"globalAndIdentityRuntimeLeastPrivilege":true,"realPostgreSQL":true,"externalPentest":false,"nativeUI":false,"production":false}
2026-10-22T23:41:50.7251714Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/concurrent PASS
2026-10-22T23:41:56.7532818Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/serial PASS
2026-10-22T23:42:02.7614265Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/concurrent PASS
2026-10-22T23:42:08.8002054Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/serial PASS
2026-10-22T23:42:14.8142569Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/concurrent PASS
2026-10-22T23:42:15.8855530Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/serial PASS
2026-10-22T23:42:21.9156788Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/concurrent PASS
2026-10-22T23:42:27.9515954Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/serial PASS
2026-10-22T23:42:31.6204492Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/baseline/concurrent PASS
2026-10-22T23:42:40.0728104Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/log-only/concurrent PASS
2026-10-22T23:42:48.6186017Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/native-only/concurrent PASS
2026-10-22T23:42:52.0541310Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/instrumented/concurrent PASS
2026-10-22T23:42:54.4144550Z WEB_BROWSER_CURRENT_MAIN_CASE_RESULT PASS
2026-10-22T23:42:54.4144906Z WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=0
2026-10-22T23:42:57.4378651Z PASS: professional and company cancellation retain real ACKs tenant scope and no financial compensation
2026-10-22T23:42:57.7454814Z PASS: concurrent replacement selection crossed PostgreSQL barrier, one matched ACK, one closed-request rejection, one substitute and notification
2026-10-22T23:42:57.8864931Z PASS: concurrent replacement creation and cancellation leave assignment and request terminally cancelled
2026-10-22T23:43:45.8698500Z PASS: Production Truth Gate health/readiness contract
```

