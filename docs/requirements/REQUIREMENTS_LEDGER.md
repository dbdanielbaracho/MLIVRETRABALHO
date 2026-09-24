# Requirements Ledger — MLIVRETRABALHO

Rastreabilidade obrigatória:

**Requirement → Issue/ADR → Code → Test → PR → SHA → Deploy → Evidence**

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| INFRA-001 | Monorepo TypeScript com pnpm + Turborepo | MERGED / ÚLTIMO CI COMPLETO CONHECIDO GREEN | Documento da Verdade v1.5 §22.7 | `package.json`, `pnpm-workspace.yaml`, `turbo.json` | PR #1; merge `77fdcad`; histórico CI SUCCESS |
| INFRA-LOCK-001 | Instalações pnpm reproduzíveis com lockfile congelado | IMPLEMENTADO / FROZEN LOCKFILE | disciplina de build reproduzível | `pnpm-lock.yaml`, `.github/workflows/ci.yml` com `pnpm install --frozen-lockfile` | PR #198; CI #528 SUCCESS; runners atuais bloqueados antes dos steps |
| API-001 | API NestJS + Fastify com health/readiness | DEPLOYED / RAILWAY SUCCESS / CURRENT PUBLIC PROBE PENDING | Documento da Verdade v1.5 §22.3 | `apps/api/` | deployment `5b251a58-896d-44ef-87d9-7c0ad5ddc601` SUCCESS; Postgres SUCCESS; pending work zero; Issue #214 mantém probe HTTP atual aberto |
| SEC-001 | Isolamento tenant-owned com `tenant_id` + PostgreSQL RLS | BASELINE MERGED + DEPLOYED / RUNTIME ROLE ENFORCED / PENTEST PENDENTE | `ADR-MT-001` | RLS + filtros explícitos tenant + `SET LOCAL ROLE app_runtime` | RLS suite; PR #181/#182/#183/#184/#188/#189; migration `0027`; pentest externo Issue #220 |
| SEC-002 | Runtime tenant DB role sem owner/superuser/BYPASSRLS | MERGED / HISTÓRICO CI GREEN / DEPLOYED | `ADR-MT-001` | `packages/db/infra/roles.sql`, `apps/api/src/database.service.ts`, `0027_runtime_rls_role.sql` | `app_runtime` NOLOGIN/NOSUPERUSER/NOBYPASSRLS; PR #182; testes históricos verdes |
| CI-001 | CI executa frozen install, typecheck, build, Expo Android export, testes, migration runner, jornadas HTTP e Production Truth contract | PIPELINE ATIVO / EXECUÇÃO ATUAL BLOQUEADA POR RUNNER | Documento da Verdade v1.5 §22.9 | `.github/workflows/ci.yml` + jornadas HTTP | CI #516/#528 SUCCESS historicamente; runs atuais recebem `runner_id=0` e `steps=[]`; Issue #214 |
| FIN-RISK | Garantia/advance/credit/default | OPEN/BLOCKING / ADR PROPOSTO / HARDENING NEUTRO DEPLOYED | Documento da Verdade v1.5 §13/§33; `ADR-FIN-001-PROPOSED.md` | payment events append-only, webhook HMAC raw-body, provider provenance, recipient-bound payouts | PR #169/#170/#216/#218; Issue #215; PSP/comercial/legal/unit economics/sandbox real pendentes |
| TRUST-ARCH | Enforcement definitivo KYC/KYB/no-show/reporting/suspension/dispute | OPEN/BLOCKING / BASELINE NEUTRO DEPLOYED / ENFORCEMENT NÃO ATIVO | Documento da Verdade v1.5 §33; `ADR-TRUST-001-PROPOSED.md` | reporting + verification provider-neutral + Safety audit + causal trust events | PR #159/#171/#213/#217; Issue #219; provider/revisão jurídica/appeals/enforcement externo pendentes |
| MATCH-001 | Recomendações usam sinais reais em vez de placeholders | BASELINE REAL / BACKEND DEPLOYED / MOBILE EXPOSTO | Matching Engine | availability + reliability + role fit reais; proximidade por cidade opcional/baixa precisão | PR #174/#175/#178/#187/#201/#212; ranking E2E adicionado |
| ONBOARD-001 | Signup/onboarding sem fixture administrativa | IMPLEMENTADO / HTTP E2E HISTORICAMENTE GREEN / DEPLOYED | ADR-MT-001 + NETWORK_SHARED | empresa cria workspace/owner no signup; profissional independente descobre vagas | PR #179/#180 |
| NETWORK-001 | Descoberta profissional cross-company sem membership prévio | IMPLEMENTADO / DEPLOYED | ADR-MT-001 NETWORK_SHARED | `marketplace_jobs`, `marketplace_interests`, `professional_availability_network` | PR #180; migration `0026_network_shared_marketplace.sql` |
| MULTI-001 | Profissional opera com múltiplas empresas sem trocar workspace | IMPLEMENTADO / DEPLOYED | tenant isolation + friction gate | assignments/earnings/passport/notificações agregados | PR #181/#193; testes multiempresa históricos |
| MULTI-NOTIF-001 | Notificações do profissional agregam múltiplas empresas sem troca de workspace | IMPLEMENTADO / DEPLOYED | tenant isolation + friction gate | `notifications.controller.ts`, `notificacoes.tsx`, `http-notifications-multi-company-e2e.sh` | PR #193; mark-read tenant-scoped |
| COMPANY-JOBS-001 | Empresa seleciona vaga operacional sem digitar UUID | IMPLEMENTADO / DEPLOYED | Friction Gate | `GET /v1/company/jobs`, `apps/mobile/app/candidatos.tsx` | PR #184; `COMPANY_JOB_SELECTION_v1.58.md` |
| COMPANY-SHIFT-001 | Vaga publicada pelo mobile possui janela real de data/hora | IMPLEMENTADO / DEPLOYED | Matching + Friction Gate | `apps/mobile/app/empresa.tsx`, `company-job-create.controller.ts` | PR #185; validações de janela |
| COMPANY-NAV-001 | Ações principais da empresa acessíveis diretamente pela tela Operação | IMPLEMENTADO / MOBILE MERGED | Friction Gate | `apps/mobile/app/empresa-inicio.tsx` | PR #186; atalhos operacionais |
| COMPANY-RANK-001 | Empresa vê interessados ordenados pela recomendação real do backend | IMPLEMENTADO / MOBILE MERGED / DEVICE E2E PENDENTE | Matching Engine + decisão humana | `apps/mobile/app/candidatos.tsx`, recommendations endpoint | PR #201/#212; score 0–100 + razões; confirmação explícita |
| COMPANY-ANALYTICS-001 | Empresa vê métricas factuais da operação sem previsão inventada | IMPLEMENTADO / DEPLOYED | analytics descritivo | `company-analytics.controller.ts`, `analytics.tsx` | PR #211; taxas usam denominadores explícitos e `null` sem base |
| TALENT-POOL-001 | Empresa transforma bom histórico em pool preferido reutilizável e gerencia pools sem UUID | IMPLEMENTADO / MOBILE MERGED | Friction Gate + replacement sourcing | `talent-pools.controller.ts`, `talentos.tsx` | PR #189/#194 |
| REPLACEMENT-001 | Empresa solicita, encontra e confirma substituto sem UUID/manual DB | IMPLEMENTADO / DEPLOYED | Replacement Engine + Trust gate | `replacement.controller.ts`, `substituicoes.tsx`, `http-replacement-e2e.sh` | PR #187–#190; sem inferência automática de culpa |
| ROADMAP-001 | Construção por fatias verticais mobile-first | ATIVO | Plano Mestre | `docs/roadmap/PLANO_MESTRE_EXECUCAO.md` | rastreabilidade contínua |

## Regra de estado

`MERGED`, `CI GREEN` ou `DEPLOYED` isoladamente **não significam Production-DONE**. O Definition of Done exige testes adequados, deploy quando aplicável, funcionamento real, Production Truth Gate e evidência. Pentest, **device E2E em aparelho físico**, distribuição do app e gates financeiros/jurídicos continuam separados conforme risco.

## Jornada profissional mobile

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| MOB-001 | Aplicativo mobile é o produto operacional principal | IN PROGRESS / ANDROID EXPORT HISTORICAMENTE GREEN / BACKEND PROD / DEVICE E2E PENDENTE | `apps/mobile/` | CI #516/#528 exportou Android real; aparelho físico Issue #220 |
| MOB-002 | Navegação profissional Trabalhos / Agenda / Disponibilidade / Ganhos / Notificações / Perfil | IMPLEMENTADA / DEVICE E2E PENDENTE | `apps/mobile/app/` | PR #200; Issue #220 |
| MOB-003 | Interesse em oportunidade em 1 ação | IMPLEMENTADO / NETWORK_SHARED | `trabalhos.tsx`, `jobs.controller.ts` | PR #180 |
| MOB-004 | Ganhos acessíveis em 1 ação | IMPLEMENTADO / MULTIEMPRESA / PSP REAL PENDENTE | `ganhos.tsx`, `earnings.controller.ts` | PR #181; FIN-RISK Issue #215 |
| MOB-005 | Perfil profissional persistente | IMPLEMENTADO | `perfil.tsx`, `professional-profile.controller.ts` | role/city persistidos |
| MOB-006 | Agenda/check-in/start/check-out/conclusão | IMPLEMENTADO / MULTIEMPRESA / GEO OPCIONAL | `agenda.tsx`, `work-assignments.controller.ts` | PR #181/#199; device validation Issue #220 |
| MOB-007 | Confirmação pela empresa após interesse | IMPLEMENTADA / MEMBERSHIP OPERACIONAL AUTOMÁTICO | `company-jobs.controller.ts` | PR #180 |
| MOB-008 | Conversa associada ao assignment | IMPLEMENTADA / TENANT-ISOLATED / DEPLOYED | `conversa.tsx`, `conversations.controller.ts`, `notifications.controller.ts` | PR #183; cross-tenant 404 testado historicamente |
| MOB-009 | Empresa avalia profissional após conclusão | IMPLEMENTADA / DEPLOYED | `empresa-inicio.tsx`, `ratings.controller.ts` | PR #172/#210 |
| MOB-010 | Work Passport global | IMPLEMENTADO / MULTIEMPRESA | `perfil.tsx`, `work-passport.controller.ts` | média global ponderada; PR #181 |
| MOB-011 | Entrada/autenticação respeita sessão segura e tipo de conta | IMPLEMENTADA / MOBILE MERGED | `index.tsx`, `entrar.tsx`, `criar-conta.tsx`, `SecureStore` | PR #197; device validation pendente |
| MOB-012 | Mobile usa API oficial por padrão fora do ambiente local | IMPLEMENTADO / MOBILE MERGED | `apps/mobile/lib/api.ts` | PR #195; fallback oficial + override |
| MOB-013 | Disponibilidade é preenchida em formato humano e convertida internamente | IMPLEMENTADA / MOBILE MERGED | `disponibilidade.tsx` | PR #200 |
| MOB-014 | Localização no check-in/out é opcional e sem tracking em background | IMPLEMENTADA / DEVICE VALIDATION PENDENTE | `agenda.tsx`, `expo-location` | PR #199; Issue #220 |

## Testes integrados da jornada

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| TEST-JOURNEY-001 | Signup → disponibilidade → vaga → interesse → recomendação → confirmação → assignment → chat/notificação → check-in → início → check-out → conclusão → earnings → avaliação → Work Passport → signout | DB + HTTP E2E HISTORICAMENTE GREEN / DEVICE E2E PENDENTE | `professional-journey.sh`, `http-journey-e2e.sh` | CI #528 SUCCESS histórico; runner atual bloqueado; Issue #220 |
| TEST-REPLACEMENT-001 | Dois profissionais → pool preferido → replacement request → auto-match → select → original cancelled → substituto confirmed | HTTP E2E HISTORICAMENTE GREEN / DEPLOYED | `scripts/http-replacement-e2e.sh` | PR #190 |
| TEST-CONFIRM-001 | Confirmação repetida idempotente; estados incompatíveis rejeitados | UNIT HISTORICAMENTE GREEN | `company-confirmation-policy.ts` | PR #157 |
| TEST-COMPANY-ONBOARD-001 | Signup empresa → workspace owner → signin → publicação de vaga válida sem DB fixture | HTTP E2E HISTORICAMENTE GREEN | `http-company-onboarding-e2e.sh` | PR #179/#185 |
| TEST-ANDROID-EXPORT-001 | Bundle/export Android real compila com stack Expo suportado | ÚLTIMO CI COMPLETO GREEN / CURRENT RUNNER BLOCKED | `apps/mobile/package.json`, `.github/workflows/ci.yml`, `pnpm-lock.yaml` | CI #516/#528 SUCCESS; Issue #214 |
| TEST-FIN-SIGNED-001 | Webhook financeiro assinado rejeita tampering/replay e reconcilia fatos | IMPLEMENTADO / DEPLOYED / FULL CI RERUN PENDENTE | signed adapter + finance E2E | PR #216; `SIGNED_PAYMENT_WEBHOOK_v1.75.md`; Issue #214 |
| TEST-FIN-RECIPIENT-001 | Payout para destinatário diferente do assignment é rejeitado | IMPLEMENTADO / DEPLOYED / ADVERSARIAL BASELINE | payout recipient + finance E2E | PR #218; `PAYOUT_RECIPIENT_INTEGRITY_v1.77.md` |
| TEST-TRUST-CAUSAL-001 | Trust event preserva causa, ator e isolamento tenant sem enforcement automático | IMPLEMENTADO / DEPLOYED | trust causality E2E | PR #217; `TRUST_CAUSAL_EVENTS_v1.76.md` |

## Segurança/validação recente

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| SEC-JOBS-001 | Company Jobs valida papel/vaga/lifecycle/janela do turno | MERGED / DEPLOYED | `company-jobs.controller.ts`, `company-job-create.controller.ts` | PR #152/#184/#185 |
| SEC-AVAIL-001 | Availability rejeita timestamps inválidos | MERGED | `availability.controller.ts` | PR #151 + jornada histórica |
| SEC-TEAM-001 | Team Allocation valida job/team/autorização | MERGED | `team-allocation.controller.ts` | PR #149 |
| SEC-POOL-001 | Talent Pools valida papel, histórico e tenant explícito | MERGED / DEPLOYED | `talent-pools.controller.ts` | PR #146/#189 |
| SEC-SAFETY-001 | Safety case usa membership real, histórico imutável e acesso tenant | MERGED / DEPLOYED | `safety-cases.controller.ts`, `safety-admin.controller.ts`, migration 0030 | PR #159/#209/#213 |
| SEC-RUNTIME-001 | Operações tenant-owned assumem role NOBYPASSRLS | MERGED / DEPLOYED | `database.service.ts`, `0027_runtime_rls_role.sql` | PR #182 |
| SEC-CHAT-001 | Chat/notificações respeitam assignment e tenant explícitos | MERGED / DEPLOYED | `conversations.controller.ts`, `notifications.controller.ts` | PR #183/#193 |
| TRUST-VERIFY-001 | Baseline provider-neutral KYC/KYB | MERGED / DEPLOYED / PROVIDER REAL PENDENTE | `verification.controller.ts`, migration 0023 | PR #171; Issue #219 |
| TRUST-CAUSAL-001 | Trust events preservam causalidade e ator e são append-only no runtime | MERGED / DEPLOYED | `trust-events.controller.ts`, migration 0031 | PR #217; `TRUST_CAUSAL_EVENTS_v1.76.md` |
| FIN-EVENT-001 | Fatos financeiros externos não fabricáveis por company/admin | MERGED / DEPLOYED | `payment-events.controller.ts`, migrations financeiras | PR #169/#216/#218 |
| FIN-WEBHOOK-001 | Raw body preservado e webhook HMAC provider-neutral | MERGED / DEPLOYED / PSP SANDBOX REAL PENDENTE | `main.ts`, `signed-json-payment-provider.ts`, `payment-webhook.controller.ts` | PR #170/#216; `SIGNED_PAYMENT_WEBHOOK_v1.75.md` |
| FIN-PAYOUT-001 | Payout fica vinculado ao profissional correto do assignment | MERGED / DEPLOYED / DINHEIRO REAL DESATIVADO | recipient provenance + migration 0032 | PR #218; `PAYOUT_RECIPIENT_INTEGRITY_v1.77.md` |

## Deploy / Production Truth

Infraestrutura canônica de produção está concentrada no **Railway**.

- Railway project: `MLIVRETRABALHO`;
- environment: `production`;
- API: `@mlivretrabalho/api`, branch `main`;
- PostgreSQL: serviço `Postgres`, volume persistente 5 GB;
- API usa referência interna `${{Postgres.DATABASE_URL}}`; credenciais não ficam no GitHub/chat;
- tenant-owned transactions executam `SET LOCAL ROLE app_runtime` (`NOBYPASSRLS`) e `app.tenant_id`;
- domínio externo oficial: `https://mlivretrabalho.predibeacon.com`;
- mobile usa `https://mlivretrabalho.predibeacon.com/v1` como fallback de produção, com `EXPO_PUBLIC_API_URL` como override;
- deployment atual confirmado: `5b251a58-896d-44ef-87d9-7c0ad5ddc601` — **SUCCESS**;
- commit funcional incluído no ciclo: PR #218 / `6d9e7325f1a2e773edad32d0a67d02115c0de050`;
- Railway build TypeScript: **PASS** após correção de `exactOptionalPropertyTypes`;
- migrations `0031_trust_event_causality.sql` e `0032_payment_payout_recipient.sql`: **APLICADAS** em produção;
- Postgres Railway: **SUCCESS**;
- pending work: **zero** na verificação de 2026-09-24;
- GitHub Actions atual: **BLOCKED EXTERNALLY**, jobs com `runner_id=0` e `steps=[]`; Issue #214;
- houve Production Truth público histórico em 2026-09-23, mas o probe HTTP do commit corrente não pôde ser executado pela ferramenta atual; portanto o **current Production Truth HTTP permanece PENDING**, sem falso PASS;
- alterações mobile-only não equivalem a app distribuído em aparelho físico;
- Neon não faz parte da arquitetura operacional.

## Pendências que continuam reais

- **Issue #214 — Production Truth/CI:** restaurar alocação de runner, rerodar pipeline completo e executar probe HTTP público do commit corrente;
- **Issue #215 — FIN-RISK:** PSP definitivo, contrato/comercial, sandbox real, tarifas, split, chargeback/refund/default, compliance e revisão jurídico-contábil;
- **Issue #219 — TRUST-ARCH:** provider KYC/KYB, enforcement matrix, appeals/revisão humana, retenção/SLA e revisão jurídica;
- **Issue #220 — Pilot readiness:** device E2E físico, distribuição mobile e pentest independente;
- dinheiro real, garantia, adiantamento/crédito e punição automática permanecem desativados enquanto os respectivos gates estiverem abertos.

Evidências principais: `docs/evidencias/PRODUCTION_TRUTH_PUBLIC_PASS_2026-09-23.md`, `PRODUCTION_RESTORE_2026-09-24_v1.77.md`, `ADVERSARIAL_REVIEW_2026-09-24.md`, `SIGNED_PAYMENT_WEBHOOK_v1.75.md`, `PAYOUT_RECIPIENT_INTEGRITY_v1.77.md`, `TRUST_CAUSAL_EVENTS_v1.76.md`, `EXTERNAL_GATES_2026-09-24.md`.