# Requirements Ledger — MLIVRETRABALHO

Rastreabilidade obrigatória:

**Requirement → Issue/ADR → Code → Test → PR → SHA → Deploy → Evidence**

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| INFRA-001 | Monorepo TypeScript com pnpm + Turborepo | IMPLEMENTADO NA BRANCH | Documento da Verdade v1.5 §22.7 | `package.json`, `pnpm-workspace.yaml`, `turbo.json` | CI deve provar install/typecheck/build |
| API-001 | API NestJS + Fastify com health/readiness | IMPLEMENTADO NA BRANCH | Documento da Verdade v1.5 §22.3 | `apps/api/` | CI build; smoke de produção pendente |
| SEC-001 | Isolamento tenant-owned com `tenant_id` + PostgreSQL RLS | IMPLEMENTAÇÃO INICIAL | `ADR-MT-001` | `packages/db/migrations/0001_tenancy_foundation.sql` | `packages/db/tests/rls-isolation.sh`; CI/produção pendentes |
| SEC-002 | Runtime DB role sem owner/superuser/BYPASSRLS | IMPLEMENTAÇÃO INICIAL | `ADR-MT-001` | `packages/db/infra/roles.sql` | teste de flags no RLS suite |
| CI-001 | CI executa typecheck, build e testes de RLS | IMPLEMENTADO NA BRANCH | Documento da Verdade v1.5 §22.9 | `.github/workflows/ci.yml` | GitHub Actions pendente |
| LEGAL-ARCH | Gate jurídico do modelo Brasil | OPEN/BLOCKING PARA REGRAS DEFINITIVAS | Documento da Verdade v1.5 §17/§33 | — | revisão jurídica externa exigida antes de produção dependente |
| FIN-RISK | Garantia/advance/credit/default | OPEN/BLOCKING | Documento da Verdade v1.5 §13/§33 | — | decisão/evidência pendente |
| TRUST-ARCH | Enforcement definitivo KYC/KYB/no-show/reporting/suspension/dispute | OPEN/BLOCKING | Documento da Verdade v1.5 §33 | — | arquitetura/evidência pendente |

## Regra de estado

`IMPLEMENTADO NA BRANCH` ou `IMPLEMENTAÇÃO INICIAL` **não significa DONE**. O Definition of Done exige testes adequados, merge, SHA rastreável, deploy quando aplicável, funcionamento real e evidência.
