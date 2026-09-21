# Requirements Ledger — MLIVRETRABALHO

Rastreabilidade obrigatória:

**Requirement → Issue/ADR → Code → Test → PR → SHA → Deploy → Evidence**

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| INFRA-001 | Monorepo TypeScript com pnpm + Turborepo | MERGED / CI GREEN | Documento da Verdade v1.5 §22.7 | `package.json`, `pnpm-workspace.yaml`, `turbo.json` | PR #1; merge `77fdcad`; CI run `35553977088` SUCCESS |
| API-001 | API NestJS + Fastify com health/readiness | MERGED / BUILD GREEN / DEPLOY PENDENTE | Documento da Verdade v1.5 §22.3 | `apps/api/` | PR #1; CI build green; smoke de produção pendente |
| SEC-001 | Isolamento tenant-owned com `tenant_id` + PostgreSQL RLS | BASELINE MERGED / CI GREEN / PRODUCTION-DONE PENDENTE | `ADR-MT-001` | `packages/db/migrations/0001_tenancy_foundation.sql` | `packages/db/tests/rls-isolation.sh`; `docs/evidencias/SEC-001_RLS_BASELINE_2026-09-20.md` |
| SEC-002 | Runtime DB role sem owner/superuser/BYPASSRLS | BASELINE MERGED / CI GREEN | `ADR-MT-001` | `packages/db/infra/roles.sql` | teste de flags no RLS suite; CI run `35553977088` SUCCESS |
| CI-001 | CI executa typecheck, build e testes de RLS | ATIVO / GREEN | Documento da Verdade v1.5 §22.9 | `.github/workflows/ci.yml` | GitHub Actions run `35553977088` SUCCESS |
| FIN-RISK | Garantia/advance/credit/default | OPEN/BLOCKING | Documento da Verdade v1.5 §13/§33 | — | decisão/evidência pendente |
| TRUST-ARCH | Enforcement definitivo KYC/KYB/no-show/reporting/suspension/dispute | OPEN/BLOCKING | Documento da Verdade v1.5 §33 | — | arquitetura/evidência pendente |

## Release foundation v0.1

- PR: `#1 — Foundation v0.1: API, tenancy RLS and CI`
- PR head testado: `b7a03b29256830cc909ca3028d55aa8a2ff2b9a3`
- CI: `35553977088` — SUCCESS
- merge squash em `main`: `77fdcad7bf903c1d0b8e987270f496baa58b82d8`

## Regra de estado

`MERGED` ou `CI GREEN` **não significa Production-DONE**. O Definition of Done exige testes adequados, deploy quando aplicável, funcionamento real, Production Truth Gate e evidência. Para segurança, pentest permanece obrigatório antes da produção pública conforme risco.

| MOB-001 | Aplicativo mobile é o produto operacional principal | IN PROGRESS | Documento da Verdade v1.5; Plano Mestre | `apps/mobile/` | shell Expo criado; E2E pendente |
| MOB-002 | Navegação profissional Início / Trabalhos / Ganhos / Perfil | IN PROGRESS | UX mobile-first | `apps/mobile/app/` | Início + Trabalhos baseline; tabs completas pendentes |
| MOB-003 | Interesse em oportunidade em 1 ação | BASELINE UI / API PENDENTE | Friction Gate | `apps/mobile/app/trabalhos.tsx` | integração API/E2E pendente |
| ROADMAP-001 | Construção por fatias verticais mobile-first | ATIVO | Plano Mestre | `docs/roadmap/PLANO_MESTRE_EXECUCAO.md` | rastreabilidade contínua |

| MOB-004 | Ganhos acessíveis em 1 ação | BASELINE UI / DATA PENDENTE | Friction Gate | `apps/mobile/app/ganhos.tsx` | CI + integração financeira pendentes |
| MOB-005 | Perfil profissional mobile | BASELINE UI / DATA PENDENTE | Jornada profissional | `apps/mobile/app/perfil.tsx` | identidade/profile API pendentes |
| MOB-006 | Próximo trabalho/agenda mobile | BASELINE UI / DATA PENDENTE | Jornada profissional | `apps/mobile/app/agenda.tsx` | confirmação/check-in pendentes |
