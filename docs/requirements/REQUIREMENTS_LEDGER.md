# Requirements Ledger — MLIVRETRABALHO

Rastreabilidade obrigatória:

**Requirement → Issue/ADR → Code → Test → PR → SHA → Deploy → Evidence**

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| INFRA-001 | Monorepo TypeScript com pnpm + Turborepo | MERGED / CI GREEN | Documento da Verdade v1.5 §22.7 | `package.json`, `pnpm-workspace.yaml`, `turbo.json` | PR #1; merge `77fdcad`; CI `35553977088` SUCCESS |
| INFRA-LOCK-001 | Instalações pnpm reproduzíveis com lockfile congelado | OPEN / LOCKFILE GERADO EM CI / COMMIT BLOQUEADO PELA FERRAMENTA | disciplina de build reproduzível | `pnpm-lock.yaml` ainda ausente na `main`; CI ainda usa `--no-frozen-lockfile` | PR diagnóstico #173 fechado sem merge; CI #441 gerou artifact `pnpm-lockfile-generated` id `10726990759`; lockfile real 275570 bytes |
| API-001 | API NestJS + Fastify com health/readiness | DEPLOYED / PUBLIC PRODUCTION TRUTH PASS | Documento da Verdade v1.5 §22.3 | `apps/api/` | Railway deploy `6fea1e80-6ee2-41f9-b70a-b473c557707d` SUCCESS; readiness interno 200; readiness HTTPS público no domínio oficial PASS |
| SEC-001 | Isolamento tenant-owned com `tenant_id` + PostgreSQL RLS | BASELINE MERGED + DEPLOYED / RUNTIME ROLE ENFORCED / PENTEST PENDENTE | `ADR-MT-001` | RLS + filtros explícitos tenant + `SET LOCAL ROLE app_runtime` | RLS suite; PR #181 CI #472; PR #182 CI #474; migration `0027`; deploy `6fea1e80...` |
| SEC-002 | Runtime tenant DB role sem owner/superuser/BYPASSRLS | MERGED / CI GREEN / DEPLOYED | `ADR-MT-001` | `packages/db/infra/roles.sql`, `apps/api/src/database.service.ts`, `0027_runtime_rls_role.sql` | `app_runtime` NOLOGIN/NOSUPERUSER/NOBYPASSRLS; full HTTP journey passa sob `SET LOCAL ROLE`; PR #182 CI #474 |
| CI-001 | CI executa typecheck, build, testes, migration runner, jornada HTTP e Production Truth contract | ATIVO / GREEN | Documento da Verdade v1.5 §22.9 | `.github/workflows/ci.yml`, `scripts/http-journey-e2e.sh` | runs #456/#462/#464/#466/#472/#474 SUCCESS; jornada HTTP multiempresa e runtime role restrito testados |
| FIN-RISK | Garantia/advance/credit/default | OPEN/BLOCKING / PESQUISA + ADR PROPOSTO / HARDENING NEUTRO MERGED | Documento da Verdade v1.5 §13/§33; `ADR-FIN-001-PROPOSED.md` | payment events append-only, provider provenance, webhook baseline, raw-body readiness; provider definitivo não selecionado | `FIN_RISK_PSP_RESEARCH_2026-09-22.md`; PR #169/#170; provider/comercial/legal/unit economics/sandbox real pendentes |
| TRUST-ARCH | Enforcement definitivo KYC/KYB/no-show/reporting/suspension/dispute | OPEN/BLOCKING PARCIAL / BASELINE KYC-KYB NEUTRO DEPLOYED / ENFORCEMENT NÃO ATIVO | Documento da Verdade v1.5 §33; `ADR-TRUST-001-PROPOSED.md` | reporting + verification provider-neutral; sem autoaprovação | PR #159/#171; revisão jurídica/provider/callback autenticado pendentes |
| MATCH-001 | Recomendações usam sinais reais em vez de placeholders | BASELINE REAL / DEPLOYED | Matching Engine | availability + reliability + role fit reais; proximidade por cidade opcional/baixa precisão; distância desconhecida não gera score inventado | PR #174/#175/#178; CI #446/#450/#462; migrations 0024/0025; `MATCHING_ROLE_SIGNALS_v1.50.md` |
| ONBOARD-001 | Signup/onboarding sem fixture administrativa | IMPLEMENTADO / HTTP E2E GREEN / DEPLOYED | ADR-MT-001 + NETWORK_SHARED | empresa cria workspace/owner no signup; profissional independente descobre vagas da rede; membership profissional nasce só na confirmação | PR #179 CI #464; PR #180 CI #466; deploys SUCCESS; jornada HTTP sem tenant/membership fixture |
| NETWORK-001 | Descoberta profissional cross-company sem membership prévio | IMPLEMENTADO / DEPLOYED | ADR-MT-001 NETWORK_SHARED | `marketplace_jobs`, `marketplace_interests`, `professional_availability_network`, projection trigger | PR #180; migration `0026_network_shared_marketplace.sql`; CI #466; deploy `3b5e4dad...` |
| MULTI-001 | Profissional opera com múltiplas empresas sem trocar workspace | IMPLEMENTADO / HTTP E2E GREEN / DEPLOYED | tenant isolation + friction gate | assignments/earnings/passport agregados por memberships profissionais; mutações usam tenant do item | PR #181 CI #472; merge `079c42c`; deploy base SUCCESS; teste com 2 empresas |
| ROADMAP-001 | Construção por fatias verticais mobile-first | ATIVO | Plano Mestre | `docs/roadmap/PLANO_MESTRE_EXECUCAO.md` | rastreabilidade contínua |

## Regra de estado

`MERGED`, `CI GREEN` ou `DEPLOYED` isoladamente **não significam Production-DONE**. O Definition of Done exige testes adequados, deploy quando aplicável, funcionamento real, Production Truth Gate e evidência. Pentest, device E2E e gates financeiros/jurídicos continuam separados conforme risco.

## Jornada profissional mobile

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| MOB-001 | Aplicativo mobile é o produto operacional principal | IN PROGRESS / BACKEND PROD / DEVICE E2E PENDENTE | `apps/mobile/` | jornada HTTP completa verde; device E2E pendente |
| MOB-002 | Navegação profissional Início / Trabalhos / Ganhos / Perfil | BASELINE IMPLEMENTADA / DEVICE E2E PENDENTE | `apps/mobile/app/` | telas/rotas presentes |
| MOB-003 | Interesse em oportunidade em 1 ação | IMPLEMENTADO / NETWORK_SHARED / HTTP E2E GREEN | `trabalhos.tsx`, `jobs.controller.ts`, `marketplace_interests` | PR #180 CI #466 |
| MOB-004 | Ganhos acessíveis em 1 ação | IMPLEMENTADO / MULTIEMPRESA / PSP REAL PENDENTE | `ganhos.tsx`, `earnings.controller.ts`, `earnings_ledger` | PR #181 CI #472; PSP/payout real pendente |
| MOB-005 | Perfil profissional persistente | IMPLEMENTADO / HTTP E2E GREEN | `perfil.tsx`, `professional-profile.controller.ts` | role/city persistidos; jornada HTTP real |
| MOB-006 | Agenda/check-in/start/check-out/conclusão | IMPLEMENTADO / MULTIEMPRESA / HTTP E2E GREEN | `agenda.tsx`, `work-assignments.controller.ts`, `assignment-lifecycle.ts` | PR #154/#156/#181; CI #472 |
| MOB-007 | Confirmação pela empresa após interesse | IMPLEMENTADA / MEMBERSHIP OPERACIONAL AUTOMÁTICO | `company-jobs.controller.ts` | PR #180; confirmação cria role `professional` somente no tenant confirmado |
| MOB-008 | Conversa associada ao assignment | BASELINE IMPLEMENTADA / TENANT DO ITEM / E2E ESPECÍFICO PENDENTE | `conversa.tsx`, `conversations.controller.ts` | tenantId acompanha assignment; chat E2E específico pendente |
| MOB-009 | Empresa avalia profissional após conclusão | IMPLEMENTADA / DB+HTTP GREEN / DEPLOYED | `empresa-inicio.tsx`, `ratings.controller.ts` | PR #172; jornada HTTP rating→passport |
| MOB-010 | Work Passport global | IMPLEMENTADO / MULTIEMPRESA / HTTP E2E GREEN | `perfil.tsx`, `work-passport.controller.ts` | média global ponderada; PR #181 CI #472 |

## Testes integrados da jornada

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| TEST-JOURNEY-001 | Signup → disponibilidade → vaga → interesse → recomendação → confirmação → assignment → check-in → início → check-out → conclusão → earnings → avaliação → Work Passport → signout | DB + HTTP E2E GREEN / DEVICE E2E PENDENTE | `professional-journey.sh`, `http-journey-e2e.sh` | sem fixture de tenant/membership; PR #180; multiempresa com 2 empresas no PR #181 CI #472 |
| TEST-CONFIRM-001 | Confirmação repetida idempotente; estados incompatíveis rejeitados | UNIT GREEN | `company-confirmation-policy.ts` | PR #157 CI #389 |
| TEST-COMPANY-ONBOARD-001 | Signup empresa → workspace owner → signin → publicação de vaga sem DB fixture | HTTP E2E GREEN | `http-company-onboarding-e2e.sh` | PR #179 CI #464 |

## Segurança/validação recente

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| SEC-JOBS-001 | Company Jobs valida papel/vaga/lifecycle | MERGED / CI GREEN | `company-jobs.controller.ts` | PR #152; CI #379 |
| SEC-AVAIL-001 | Availability rejeita timestamps inválidos | MERGED / CI GREEN | `availability.controller.ts` | PR #151 + HTTP journey |
| SEC-TEAM-001 | Team Allocation valida job/team/autorização | MERGED / CI GREEN | `team-allocation.controller.ts` | PR #149 |
| SEC-POOL-001 | Talent Pools valida papel/visibilidade | MERGED / CI GREEN | `talent-pools.controller.ts` | PR #146 |
| SEC-SAFETY-001 | Safety case usa membership real e acesso testado | MERGED / CI GREEN | `safety-cases.controller.ts`, `safety-access-policy.ts` | PR #159 CI #393 |
| SEC-RUNTIME-001 | Operações tenant-owned assumem role NOBYPASSRLS | MERGED / CI GREEN / DEPLOYED | `database.service.ts`, `roles.sql`, `0027_runtime_rls_role.sql` | PR #182 CI #474; deploy `6fea1e80...`; migration 0027 aplicada; readiness 200 |
| TRUST-VERIFY-001 | Baseline provider-neutral KYC/KYB | MERGED / DEPLOYED | `verification.controller.ts`, migration 0023 | PR #171; sem autoaprovação/enforcement automático |
| FIN-EVENT-001 | Fatos financeiros externos não fabricáveis por company/admin | MERGED / CI GREEN | `payment-events.controller.ts`, migration 0022 | PR #169 |
| FIN-WEBHOOK-001 | Raw HTTP body preservado para assinatura futura | MERGED / CI GREEN | `main.ts` | PR #170 |

## Deploy / Production Truth

Infraestrutura canônica de produção está concentrada no **Railway**.

- Railway project: `MLIVRETRABALHO`;
- environment: `production`;
- API: `@mlivretrabalho/api`, branch `main`;
- PostgreSQL: serviço `Postgres`, volume persistente 5 GB;
- API usa referência interna `${{Postgres.DATABASE_URL}}`; credenciais não ficam no GitHub/chat;
- tenant-owned transactions executam `SET LOCAL ROLE app_runtime` (`NOBYPASSRLS`) e `app.tenant_id`;
- domínio externo oficial: `https://mlivretrabalho.predibeacon.com`;
- custom domain Railway: porta 8080;
- deployment atual após PR #182: `6fea1e80-6ee2-41f9-b70a-b473c557707d` — **SUCCESS**;
- migration runner: **SUCCESS**, `0027_runtime_rls_role.sql` aplicada;
- Nest start: **SUCCESS**;
- Railway internal readiness: **HTTP 200**;
- verificação externa independente HTTPS em `https://mlivretrabalho.predibeacon.com/v1/health/ready`: **PASS**;
- resposta pública observada: `status=ok`, `service=api`, `version=0.1.0`, `database=ok`;
- essa resposta satisfaz `scripts/smoke-api.sh` e `scripts/production-truth-gate.sh` com `EXPECTED_VERSION=0.1.0`;
- **Production Truth Gate público health/readiness: PASS**;
- Neon não faz parte da arquitetura operacional.

Evidências principais: `docs/evidencias/DEPLOY_PRODUCTION_BOOTSTRAP_2026-09-22.md`, `PRODUCTION_TRUTH_GATE_v1.44.md`, `PRODUCTION_TRUTH_PUBLIC_PASS_2026-09-23.md`, `NETWORK_SHARED_MARKETPLACE_v1.54.md`, `PROFESSIONAL_MULTI_COMPANY_v1.55.md`, `RUNTIME_RLS_ROLE_v1.56.md`.
