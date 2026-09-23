# Requirements Ledger — MLIVRETRABALHO

Rastreabilidade obrigatória:

**Requirement → Issue/ADR → Code → Test → PR → SHA → Deploy → Evidence**

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| INFRA-001 | Monorepo TypeScript com pnpm + Turborepo | MERGED / CI GREEN | Documento da Verdade v1.5 §22.7 | `package.json`, `pnpm-workspace.yaml`, `turbo.json` | PR #1; merge `77fdcad`; CI run `35553977088` SUCCESS |
| INFRA-LOCK-001 | Instalações pnpm reproduzíveis com lockfile congelado | OPEN / LOCKFILE GERADO EM CI / COMMIT BLOQUEADO PELA FERRAMENTA | disciplina de build reproduzível | `pnpm-lock.yaml` ainda ausente na `main`; CI ainda usa `--no-frozen-lockfile` | PR diagnóstico #173 fechado sem merge; CI #441 gerou artifact `pnpm-lockfile-generated` id `10726990759`; lockfile real 275570 bytes; integração atual não permite upload do arquivo gerado e bloqueou auto-commit do workflow |
| API-001 | API NestJS + Fastify com health/readiness | DEPLOYED RAILWAY / DB + MIGRATIONS + INTERNAL READINESS GREEN / PUBLIC TRUTH PENDENTE | Documento da Verdade v1.5 §22.3 | `apps/api/` | Railway deployment `d5fb0361-ac9f-49b9-a694-88e97d069b62` SUCCESS; migration 0025 aplicada; `/v1/health/ready` HTTP 200 |
| SEC-001 | Isolamento tenant-owned com `tenant_id` + PostgreSQL RLS | BASELINE MERGED / CI GREEN / PRODUCTION-DONE PENDENTE | `ADR-MT-001` | `packages/db/migrations/0001_tenancy_foundation.sql` | `packages/db/tests/rls-isolation.sh`; `docs/evidencias/SEC-001_RLS_BASELINE_2026-09-20.md` |
| SEC-002 | Runtime DB role sem owner/superuser/BYPASSRLS | BASELINE MERGED / CI GREEN | `ADR-MT-001` | `packages/db/infra/roles.sql` | teste de flags no RLS suite; CI run `35553977088` SUCCESS |
| CI-001 | CI executa typecheck, build, testes, migration runner e Production Truth contract | ATIVO / GREEN | Documento da Verdade v1.5 §22.9 | `.github/workflows/ci.yml` | runs #388/#389/#393/#414/#424/#426/#433/#439/#446/#450 SUCCESS nos PRs #156/#157/#159/#168/#169/#170/#171/#172/#174/#175 |
| FIN-RISK | Garantia/advance/credit/default | OPEN/BLOCKING / PESQUISA + ADR PROPOSTO / HARDENING NEUTRO MERGED | Documento da Verdade v1.5 §13/§33; `ADR-FIN-001-PROPOSED.md` | payment events append-only, provider provenance, webhook baseline, raw-body readiness; provider definitivo não selecionado | `FIN_RISK_PSP_RESEARCH_2026-09-22.md`; PR #169 CI #424; PR #170 CI #426; provider/comercial/legal/unit economics/sandbox real pendentes |
| TRUST-ARCH | Enforcement definitivo KYC/KYB/no-show/reporting/suspension/dispute | OPEN/BLOCKING PARCIAL / BASELINE KYC-KYB NEUTRO MERGED+DEPLOYED / ENFORCEMENT NÃO ATIVO | Documento da Verdade v1.5 §33; `ADR-TRUST-001-PROPOSED.md` | reporting baseline + verification cases/API provider-neutral; nenhum usuário pode autoaprovar; enforcement definitivo não integrado | `TRUST_ARCH_RESEARCH_2026-09-22.md`; PR #159; PR #171 CI #433 SUCCESS; merge `418a1dcc`; deploy `fcbfa2d5...` SUCCESS; revisão jurídica/provider/callback autenticado pendentes |
| MATCH-001 | Recomendações usam sinais reais em vez de placeholders | BASELINE REAL / SEM PLACEHOLDERS FIXOS / DEPLOYED | Matching Engine | availability + reliability + role fit reais; proximidade usa cidade opcional/baixa precisão e não inventa distância quando desconhecida | PR #174 CI #446, merge `01b4eb7`, migration `0024`; PR #175 CI #450, merge `9e61542`, deploy `d5fb0361...`, migration `0025`; `MATCH_ROLE_FIT_v1.50.md`; `MATCH_CITY_PROXIMITY_v1.51.md` |
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
| MOB-005 | Perfil profissional mobile persistente | API + MOBILE IMPLEMENTADOS / ROLE DATA DEPLOYED / E2E PENDENTE | Jornada profissional | `apps/mobile/app/perfil.tsx`, `apps/api/src/professional-profile.controller.ts` | nome/cidade/função principal persistentes; PR #174 CI #446; teste E2E em dispositivo pendente |
| MOB-006 | Próximo trabalho/agenda mobile | ASSIGNMENT LIFECYCLE IMPLEMENTADO / UNIT + DB INTEGRATION GREEN / DEVICE E2E PENDENTE | Jornada profissional | `apps/mobile/app/agenda.tsx`, `apps/api/src/work-assignments.controller.ts`, `apps/api/src/assignment-lifecycle.ts` | PR #154 testa transições; PR #156 valida cadeia no PostgreSQL; CI #382/#388 SUCCESS |
| MOB-007 | Confirmação pela empresa após interesse | IMPLEMENTADA / POLICY TEST GREEN / DEVICE E2E PENDENTE | Jornada empresa/profissional | `apps/api/src/company-jobs.controller.ts`, `apps/api/src/company-confirmation-policy.ts` | PR #152 valida vaga/autorização; PR #157 testa create/idempotency/conflict; CI #379/#389 SUCCESS |
| MOB-008 | Conversa associada ao assignment | BASELINE IMPLEMENTADA / E2E PENDENTE | Jornada profissional | `apps/mobile/app/conversa.tsx`, `apps/api/src/conversations.controller.ts` | autorização por assignment implementada; E2E pendente |
| MOB-009 | Empresa avalia profissional após trabalho concluído | IMPLEMENTADA / DB INTEGRATION GREEN / DEPLOYED / DEVICE E2E PENDENTE | Jornada empresa → avaliação → Work Passport | `apps/mobile/app/empresa-inicio.tsx`, `apps/api/src/company-dashboard.controller.ts`, `apps/api/src/ratings.controller.ts` | PR #172; CI #439 SUCCESS; merge `b2ca4db`; deploy `a8f78439-6bdb-4725-9b98-d956f8575e50` SUCCESS; `COMPANY_RATING_MOBILE_v1.48.md` |

## Testes integrados da jornada

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| TEST-JOURNEY-001 | Vaga → interesse → confirmação → assignment → check-in → início → check-out → conclusão → earnings → avaliação | DB INTEGRATION GREEN / HTTP+DEVICE E2E PENDENTE | Plano Mestre / Definition of Done | `packages/db/tests/professional-journey.sh` | PR #156 + extensão PR #172; CI #388/#439 SUCCESS; rating persiste e atualização é idempotente |
| TEST-CONFIRM-001 | Confirmação repetida é idempotente e estados incompatíveis são rejeitados | UNIT GREEN / CONTROLLER WIRED | ciclo da vaga/assignment | `apps/api/src/company-confirmation-policy.ts`, `company-confirmation-policy.test.ts` | PR #157; CI #389 SUCCESS; merge `0255fae` |

## Segurança/validação recente

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| SEC-JOBS-001 | Company Jobs respeita 403 para papel negado e valida vaga/lifecycle | MERGED / CI GREEN | consistência de autorização e ciclo da vaga | `apps/api/src/company-jobs.controller.ts` | PR #152; CI #379 SUCCESS; `docs/evidencias/COMPANY_JOBS_VALIDATION_v1.29.md`; merge `222f804` |
| SEC-AVAIL-001 | Availability rejeita timestamps inválidos | MERGED / CI GREEN | validação de entrada | `apps/api/src/availability.controller.ts` | PR #151; CI SUCCESS |
| SEC-TEAM-001 | Team Allocation valida job/team e autorização | MERGED / CI GREEN | validação/tenant safety | `apps/api/src/team-allocation.controller.ts` | PR #149; CI SUCCESS |
| SEC-POOL-001 | Talent Pools valida papel e visibilidade profissional no tenant | MERGED / CI GREEN | tenant safety | `apps/api/src/talent-pools.controller.ts` | PR #146; CI SUCCESS |
| SEC-SAFETY-001 | Safety case ligado a assignment usa membership real e regra de acesso testada | MERGED / CI GREEN | Trust & Safety reporting/access control | `apps/api/src/safety-cases.controller.ts`, `apps/api/src/safety-access-policy.ts` | PR #159; CI #393 SUCCESS; merge `4374fe8`; corrigida referência inválida `memberships` → `tenant_memberships` |
| TRUST-VERIFY-001 | Baseline provider-neutral para KYC/KYB, sem autoaprovação nem enforcement automático | MERGED / CI GREEN / DEPLOYED | `ADR-TRUST-001-PROPOSED.md` | `verification.controller.ts`, `verification-policy.ts`, migration `0023_verification_cases.sql` | PR #171; CI #433 SUCCESS; merge `418a1dcc`; deployment `fcbfa2d5-1155-4eba-b469-f85081d48789` SUCCESS; migration 0023 aplicada; readiness HTTP 200 |
| FIN-EVENT-001 | Fatos financeiros externos não podem ser fabricados por company/admin | MERGED / CI GREEN | `ADR-FIN-001-PROPOSED.md` | `apps/api/src/payment-events.controller.ts`, `payment-webhook.controller.ts`, migration `0022_payment_event_provider.sql` | PR #169; CI #424 SUCCESS; merge `3b18954`; `PAYMENT_PROVIDER_PROVENANCE_v1.45.md` |
| FIN-WEBHOOK-001 | API preserva raw HTTP body para assinatura futura de provider | MERGED / CI GREEN | arquitetura provider-neutral | `apps/api/src/main.ts` | PR #170; CI #426 SUCCESS; merge `625482c`; `PAYMENT_RAW_BODY_v1.46.md` |

## Deploy / Production Truth

Infraestrutura de produção canônica está concentrada no **Railway**.

- Railway project: `MLIVRETRABALHO`;
- Railway environment: `production`;
- Railway API service: `@mlivretrabalho/api` conectado à `main`;
- Railway PostgreSQL service: `Postgres`, com volume persistente de 5 GB;
- `DATABASE_URL` da API referencia internamente `${{Postgres.DATABASE_URL}}`; nenhuma credencial é armazenada no repositório;
- domínio Railway técnico: `mlivretrabalhoapi-production.up.railway.app`;
- domínio externo oficial: `https://mlivretrabalho.predibeacon.com`;
- custom domain Railway anexado à porta 8080; DNS/certificado/resolução pública ainda precisam de prova externa reproduzível;
- runtime da API escuta em `PORT=8080`;
- deployment atual do merge #175: `d5fb0361-ac9f-49b9-a694-88e97d069b62` — **SUCCESS**;
- Postgres Railway: **SUCCESS**;
- migration runner de produção: **SUCCESS**, migrations aplicadas até `0025_job_work_city.sql`;
- Nest application start: **SUCCESS**;
- Railway healthcheck `/v1/health/ready`: **HTTP 200** no deployment atual;
- Neon foi descartado da arquitetura operacional e não é dependência da produção;
- contrato automatizado do Production Truth Gate está versionado em `scripts/production-truth-gate.sh`, merge PR #168 `f43c8e9`, CI #414 SUCCESS;
- Production Truth público completo permanece pendente de uma requisição externa reproduzível ao domínio oficial e execução do script contra a URL pública. A ferramenta externa desta sessão ainda não consegue acessar esse domínio e isso não é tratado como prova de falha do serviço.

Evidências: `docs/evidencias/DEPLOY_PRODUCTION_BOOTSTRAP_2026-09-22.md`, `docs/evidencias/PRODUCTION_TRUTH_GATE_v1.44.md`, `docs/evidencias/TRUST_VERIFICATIONS_v1.47.md`, `docs/evidencias/COMPANY_RATING_MOBILE_v1.48.md`, `docs/evidencias/MATCH_ROLE_FIT_v1.50.md` e `docs/evidencias/MATCH_CITY_PROXIMITY_v1.51.md`.
