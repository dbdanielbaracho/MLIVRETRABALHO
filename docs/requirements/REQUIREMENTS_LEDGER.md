# Requirements Ledger — MLIVRETRABALHO

Rastreabilidade obrigatória:

**Requirement → Issue/ADR → Code → Test → PR → SHA → Deploy → Evidence**

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| INFRA-001 | Monorepo TypeScript com pnpm + Turborepo | MERGED / CI GREEN | Documento da Verdade v1.5 §22.7 | `package.json`, `pnpm-workspace.yaml`, `turbo.json` | PR #1; merge `77fdcad`; CI run `35553977088` SUCCESS |
| API-001 | API NestJS + Fastify com health/readiness | MERGED / BUILD GREEN / DEPLOY PENDENTE | Documento da Verdade v1.5 §22.3 | `apps/api/` | PR #1; CI build green; smoke de produção pendente |
| SEC-001 | Isolamento tenant-owned com `tenant_id` + PostgreSQL RLS | BASELINE MERGED / CI GREEN / PRODUCTION-DONE PENDENTE | `ADR-MT-001` | `packages/db/migrations/0001_tenancy_foundation.sql` | `packages/db/tests/rls-isolation.sh`; `docs/evidencias/SEC-001_RLS_BASELINE_2026-09-20.md` |
| SEC-002 | Runtime DB role sem owner/superuser/BYPASSRLS | BASELINE MERGED / CI GREEN | `ADR-MT-001` | `packages/db/infra/roles.sql` | teste de flags no RLS suite; CI run `35553977088` SUCCESS |
| CI-001 | CI executa typecheck, build e testes | ATIVO / GREEN | Documento da Verdade v1.5 §22.9 | `.github/workflows/ci.yml` | CI contínuo em PRs; runs #388 e #389 SUCCESS nos PRs #156/#157 |
| FIN-RISK | Garantia/advance/credit/default | OPEN/BLOCKING | Documento da Verdade v1.5 §13/§33 | — | decisão/evidência pendente |
| TRUST-ARCH | Enforcement definitivo KYC/KYB/no-show/reporting/suspension/dispute | OPEN/BLOCKING | Documento da Verdade v1.5 §33 | — | arquitetura/evidência pendente |
| ROADMAP-001 | Construção por fatias verticais mobile-first | ATIVO | Plano Mestre | `docs/roadmap/PLANO_MESTRE_EXECUCAO.md` | rastreabilidade contínua |

## Release foundation v0.1

- PR: `#1 — Foundation v0.1: API, tenancy RLS and CI`
- PR head testado: `b7a03b29256830cc909ca3028d55aa8a2ff2b9a3`
- CI: `35553977088` — SUCCESS
- merge squash em `main`: `77fdcad7bf903c1d0b8e987270f496baa58b82d8`

## Regra de estado

`MERGED` ou `CI GREEN` **não significa Production-DONE**. O Definition of Done exige testes adequados, deploy quando aplicável, funcionamento real, Production Truth Gate e evidência. Para segurança, pentest permanece obrigatório antes da produção pública conforme risco.

## Jornada profissional mobile

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| MOB-001 | Aplicativo mobile é o produto operacional principal | IN PROGRESS | Documento da Verdade v1.5; Plano Mestre | `apps/mobile/` | implementação funcional crescente; E2E em dispositivo/deploy pendentes |
| MOB-002 | Navegação profissional Início / Trabalhos / Ganhos / Perfil | BASELINE IMPLEMENTADA / E2E PENDENTE | UX mobile-first | `apps/mobile/app/` | telas e rotas presentes; validação em dispositivo/produção pendente |
| MOB-003 | Interesse em oportunidade em 1 ação | API + MOBILE IMPLEMENTADOS / DB INTEGRATION GREEN / DEVICE E2E PENDENTE | Friction Gate | `apps/mobile/app/trabalhos.tsx`, `apps/api/src/jobs.controller.ts`, `job_interests` | jornada SQL integrada no PR #156; CI #388 SUCCESS; teste em dispositivo pendente |
| MOB-004 | Ganhos acessíveis em 1 ação | API + MOBILE BASELINE / LEDGER INTEGRATION GREEN / PSP REAL PENDENTE | Friction Gate | `apps/mobile/app/ganhos.tsx`, `apps/api/src/earnings.controller.ts`, `earnings_ledger` | PR #156 valida criação `payable` e valor no ledger; PSP/payout real pendente |
| MOB-005 | Perfil profissional mobile persistente | API + MOBILE IMPLEMENTADOS / E2E PENDENTE | Jornada profissional | `apps/mobile/app/perfil.tsx`, `apps/api/src/professional-profile.controller.ts` | sessão autenticada + leitura/gravação de perfil; teste E2E em dispositivo pendente |
| MOB-006 | Próximo trabalho/agenda mobile | ASSIGNMENT LIFECYCLE IMPLEMENTADO / UNIT + DB INTEGRATION GREEN / DEVICE E2E PENDENTE | Jornada profissional | `apps/mobile/app/agenda.tsx`, `apps/api/src/work-assignments.controller.ts`, `apps/api/src/assignment-lifecycle.ts` | PR #154 testa transições; PR #156 valida cadeia no PostgreSQL; CI #382/#388 SUCCESS |
| MOB-007 | Confirmação pela empresa após interesse | IMPLEMENTADA / POLICY TEST GREEN / DEVICE E2E PENDENTE | Jornada empresa/profissional | `apps/api/src/company-jobs.controller.ts`, `apps/api/src/company-confirmation-policy.ts` | PR #152 valida vaga/autorização; PR #157 testa create/idempotency/conflict; CI #379/#389 SUCCESS |
| MOB-008 | Conversa associada ao assignment | BASELINE IMPLEMENTADA / E2E PENDENTE | Jornada profissional | `apps/mobile/app/conversa.tsx`, `apps/api/src/conversations.controller.ts` | autorização por assignment implementada; E2E pendente |

## Testes integrados da jornada

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| TEST-JOURNEY-001 | Vaga → interesse → confirmação → assignment → check-in → início → check-out → conclusão → earnings | DB INTEGRATION GREEN / HTTP+DEVICE E2E PENDENTE | Plano Mestre / Definition of Done | `packages/db/tests/professional-journey.sh` | PR #156; CI #388 SUCCESS; merge `9644d1f` |
| TEST-CONFIRM-001 | Confirmação repetida é idempotente e estados incompatíveis são rejeitados | UNIT GREEN / CONTROLLER WIRED | ciclo da vaga/assignment | `apps/api/src/company-confirmation-policy.ts`, `company-confirmation-policy.test.ts` | PR #157; CI #389 SUCCESS; merge `0255fae` |

## Segurança/validação recente

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| SEC-JOBS-001 | Company Jobs respeita 403 para papel negado e valida vaga/lifecycle | MERGED / CI GREEN | consistência de autorização e ciclo da vaga | `apps/api/src/company-jobs.controller.ts` | PR #152; CI #379 SUCCESS; `docs/evidencias/COMPANY_JOBS_VALIDATION_v1.29.md`; merge `222f804` |
| SEC-AVAIL-001 | Availability rejeita timestamps inválidos | MERGED / CI GREEN | validação de entrada | `apps/api/src/availability.controller.ts` | PR #151; CI SUCCESS |
| SEC-TEAM-001 | Team Allocation valida job/team e autorização | MERGED / CI GREEN | validação/tenant safety | `apps/api/src/team-allocation.controller.ts` | PR #149; CI SUCCESS |
| SEC-POOL-001 | Talent Pools valida papel e visibilidade profissional no tenant | MERGED / CI GREEN | tenant safety | `apps/api/src/talent-pools.controller.ts` | PR #146; CI SUCCESS |

## Deploy / Production Truth

Nenhum deploy do MLIVRETRABALHO foi comprovado nesta fase. Não existe projeto Railway explicitamente identificado como MLIVRETRABALHO na conta conectada; portanto `DEPLOY` e `Production Truth Gate` permanecem **PENDENTES** até existir serviço identificado, URL pública, banco de produção, migrations aplicadas e smoke tests reais.
