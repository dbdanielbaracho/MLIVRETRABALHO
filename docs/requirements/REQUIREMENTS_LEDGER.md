# Requirements Ledger — MLIVRETRABALHO

Rastreabilidade obrigatória:

**Requirement → Issue/ADR → Code → Test → PR → SHA → Deploy → Evidence**

| ID | Requisito | Estado | Decisão/ADR | Código | Teste/Evidência |
|---|---|---|---|---|---|
| INFRA-001 | Monorepo TypeScript com pnpm + Turborepo | MERGED / CI GREEN | Documento da Verdade v1.5 §22.7 | `package.json`, `pnpm-workspace.yaml`, `turbo.json` | PR #1; merge `77fdcad`; CI `35553977088` SUCCESS |
| INFRA-LOCK-001 | Instalações pnpm reproduzíveis com lockfile congelado | IMPLEMENTADO / FROZEN LOCKFILE / CI GREEN | disciplina de build reproduzível | `pnpm-lock.yaml`, `.github/workflows/ci.yml` com `pnpm install --frozen-lockfile` | PR #198; lockfile v9.0 na `main`; CI #528 instala com frozen lockfile e passa |
| API-001 | API NestJS + Fastify com health/readiness | DEPLOYED / PUBLIC PRODUCTION TRUTH PASS | Documento da Verdade v1.5 §22.3 | `apps/api/` | Railway deployment atual `bbf44e63-5b95-4a29-a3f4-132d328aff5c` SUCCESS; Postgres SUCCESS; pending work zero |
| SEC-001 | Isolamento tenant-owned com `tenant_id` + PostgreSQL RLS | BASELINE MERGED + DEPLOYED / RUNTIME ROLE ENFORCED / PENTEST PENDENTE | `ADR-MT-001` | RLS + filtros explícitos tenant + `SET LOCAL ROLE app_runtime` | RLS suite; PR #181/#182/#183/#184/#188/#189; migration `0027`; deploys SUCCESS |
| SEC-002 | Runtime tenant DB role sem owner/superuser/BYPASSRLS | MERGED / CI GREEN / DEPLOYED | `ADR-MT-001` | `packages/db/infra/roles.sql`, `apps/api/src/database.service.ts`, `0027_runtime_rls_role.sql` | `app_runtime` NOLOGIN/NOSUPERUSER/NOBYPASSRLS; full HTTP journey passa sob `SET LOCAL ROLE`; PR #182 CI #474 |
| CI-001 | CI executa frozen install, typecheck, build, Expo Android export, testes, migration runner, jornadas HTTP e Production Truth contract | ATIVO / GREEN | Documento da Verdade v1.5 §22.9 | `.github/workflows/ci.yml`, `scripts/http-journey-e2e.sh`, `scripts/http-replacement-e2e.sh` | PR #196/#198; CI #516 e #528 SUCCESS, incluindo Android export real |
| FIN-RISK | Garantia/advance/credit/default | OPEN/BLOCKING / PESQUISA + ADR PROPOSTO / HARDENING NEUTRO MERGED | Documento da Verdade v1.5 §13/§33; `ADR-FIN-001-PROPOSED.md` | payment events append-only, provider provenance, webhook baseline, raw-body readiness; provider definitivo não selecionado | `FIN_RISK_PSP_RESEARCH_2026-09-22.md`; PR #169/#170; provider/comercial/legal/unit economics/sandbox real pendentes |
| TRUST-ARCH | Enforcement definitivo KYC/KYB/no-show/reporting/suspension/dispute | OPEN/BLOCKING PARCIAL / BASELINE KYC-KYB NEUTRO DEPLOYED / ENFORCEMENT NÃO ATIVO | Documento da Verdade v1.5 §33; `ADR-TRUST-001-PROPOSED.md` | reporting + verification provider-neutral; sem autoaprovação | PR #159/#171; revisão jurídica/provider/callback autenticado pendentes; replacement não atribui culpa/no-show automaticamente |
| MATCH-001 | Recomendações usam sinais reais em vez de placeholders | BASELINE REAL / BACKEND DEPLOYED / MOBILE EXPOSTO | Matching Engine | availability + reliability + role fit reais; proximidade por cidade opcional/baixa precisão; distância desconhecida não gera score inventado | PR #174/#175/#178/#187; PR #201 expõe score/razões reais no mobile; CI #528 SUCCESS |
| ONBOARD-001 | Signup/onboarding sem fixture administrativa | IMPLEMENTADO / HTTP E2E GREEN / DEPLOYED | ADR-MT-001 + NETWORK_SHARED | empresa cria workspace/owner no signup; profissional independente descobre vagas; membership profissional nasce só na confirmação | PR #179/#180; CI #464/#466 |
| NETWORK-001 | Descoberta profissional cross-company sem membership prévio | IMPLEMENTADO / DEPLOYED | ADR-MT-001 NETWORK_SHARED | `marketplace_jobs`, `marketplace_interests`, `professional_availability_network` | PR #180; migration `0026_network_shared_marketplace.sql` |
| MULTI-001 | Profissional opera com múltiplas empresas sem trocar workspace | IMPLEMENTADO / HTTP E2E GREEN / DEPLOYED | tenant isolation + friction gate | assignments/earnings/passport/notificações agregados; mutações usam tenant do item | PR #181 CI #472; PR #193 CI #510; testes com 2 empresas |
| MULTI-NOTIF-001 | Notificações do profissional agregam múltiplas empresas sem troca de workspace | IMPLEMENTADO / HTTP E2E GREEN / DEPLOYED | tenant isolation + friction gate | `notifications.controller.ts`, `notificacoes.tsx`, `http-notifications-multi-company-e2e.sh` | PR #193; CI #510 SUCCESS; deploy Railway SUCCESS; mark-read permanece tenant-scoped |
| COMPANY-JOBS-001 | Empresa seleciona vaga operacional sem digitar UUID | IMPLEMENTADO / HTTP E2E GREEN / DEPLOYED | Friction Gate | `GET /v1/company/jobs`, `apps/mobile/app/candidatos.tsx` | PR #184; CI #481; deploy SUCCESS; `COMPANY_JOB_SELECTION_v1.58.md` |
| COMPANY-SHIFT-001 | Vaga publicada pelo mobile possui janela real de data/hora | IMPLEMENTADO / HTTP E2E GREEN / DEPLOYED | Matching + Friction Gate | `apps/mobile/app/empresa.tsx`, `company-job-create.controller.ts` | PR #185; CI #484 SUCCESS; merge `36a1e2a6`; missing/reversed windows retornam 400 |
| COMPANY-NAV-001 | Ações principais da empresa acessíveis diretamente pela tela Operação | IMPLEMENTADO / CI GREEN / MOBILE MERGED | Friction Gate | `apps/mobile/app/empresa-inicio.tsx` | PR #186; CI #486 SUCCESS; atalhos para publicar, interessados, substituições, pagamentos e talentos |
| COMPANY-RANK-001 | Empresa vê interessados ordenados pela recomendação real do backend | IMPLEMENTADO / MOBILE MERGED / ANDROID EXPORT GREEN / DEVICE E2E PENDENTE | Matching Engine + decisão humana | `apps/mobile/app/candidatos.tsx`, `GET /v1/company/jobs/:jobId/recommendations` | PR #201; CI #528 SUCCESS; score 0–100 + razões; confirmação continua explícita e exige interesse |
| TALENT-POOL-001 | Empresa transforma bom histórico em pool preferido reutilizável e gerencia pools sem UUID | IMPLEMENTADO / HTTP E2E GREEN / MOBILE MERGED | Friction Gate + replacement sourcing | `talent-pools.controller.ts`, `empresa-inicio.tsx`, `talentos.tsx` | PR #189 e #194; CI #495/#512 SUCCESS; adicionar pelo contexto de trabalho concluído e remover em 1 ação |
| REPLACEMENT-001 | Empresa solicita, encontra e confirma substituto sem UUID/manual DB | IMPLEMENTADO / DEDICATED HTTP E2E GREEN / DEPLOYED | Replacement Engine + Trust gate | `replacement.controller.ts`, `substituicoes.tsx`, `http-replacement-e2e.sh` | PR #187–#190; CI #493/#495/#497 SUCCESS; original cancelado e substituto confirmado; sem inferência automática de culpa |
| ROADMAP-001 | Construção por fatias verticais mobile-first | ATIVO | Plano Mestre | `docs/roadmap/PLANO_MESTRE_EXECUCAO.md` | rastreabilidade contínua |

## Regra de estado

`MERGED`, `CI GREEN` ou `DEPLOYED` isoladamente **não significam Production-DONE**. O Definition of Done exige testes adequados, deploy quando aplicável, funcionamento real, Production Truth Gate e evidência. Pentest, **device E2E em aparelho físico**, distribuição do app e gates financeiros/jurídicos continuam separados conforme risco.

## Jornada profissional mobile

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| MOB-001 | Aplicativo mobile é o produto operacional principal | IN PROGRESS / ANDROID EXPORT GREEN / BACKEND PROD / DEVICE E2E PENDENTE | `apps/mobile/` | CI #516/#528 exporta Android real; jornadas HTTP completas verdes; aparelho físico ainda pendente |
| MOB-002 | Navegação profissional Trabalhos / Agenda / Disponibilidade / Ganhos / Notificações / Perfil | IMPLEMENTADA / ANDROID EXPORT GREEN / DEVICE E2E PENDENTE | `apps/mobile/app/` | PR #200; navegação reutilizável entre telas principais; CI completo green |
| MOB-003 | Interesse em oportunidade em 1 ação | IMPLEMENTADO / NETWORK_SHARED / HTTP E2E GREEN | `trabalhos.tsx`, `jobs.controller.ts` | PR #180 CI #466 |
| MOB-004 | Ganhos acessíveis em 1 ação | IMPLEMENTADO / MULTIEMPRESA / PSP REAL PENDENTE | `ganhos.tsx`, `earnings.controller.ts` | PR #181 CI #472; PSP real pendente |
| MOB-005 | Perfil profissional persistente | IMPLEMENTADO / HTTP E2E GREEN | `perfil.tsx`, `professional-profile.controller.ts` | role/city persistidos |
| MOB-006 | Agenda/check-in/start/check-out/conclusão | IMPLEMENTADO / MULTIEMPRESA / GEO OPCIONAL / HTTP E2E GREEN | `agenda.tsx`, `work-assignments.controller.ts` | PR #181; PR #199 adiciona localização foreground opcional somente em check-in/out; fluxo continua sem permissão |
| MOB-007 | Confirmação pela empresa após interesse | IMPLEMENTADA / MEMBERSHIP OPERACIONAL AUTOMÁTICO | `company-jobs.controller.ts` | PR #180 |
| MOB-008 | Conversa associada ao assignment | IMPLEMENTADA / TENANT-ISOLATED / HTTP E2E GREEN / DEPLOYED | `conversa.tsx`, `conversations.controller.ts`, `notifications.controller.ts` | PR #183 CI #478; empresa B recebe 404 ao tentar conversa da empresa A |
| MOB-009 | Empresa avalia profissional após conclusão | IMPLEMENTADA / DB+HTTP GREEN / DEPLOYED | `empresa-inicio.tsx`, `ratings.controller.ts` | PR #172; jornada rating→passport |
| MOB-010 | Work Passport global | IMPLEMENTADO / MULTIEMPRESA / HTTP E2E GREEN | `perfil.tsx`, `work-passport.controller.ts` | média global ponderada; PR #181 |
| MOB-011 | Entrada/autenticação respeita sessão segura e tipo de conta | IMPLEMENTADA / MOBILE MERGED / ANDROID EXPORT GREEN | `index.tsx`, `entrar.tsx`, `criar-conta.tsx`, `SecureStore` | PR #197; empresa → `/empresa-inicio`; profissional → `/trabalhos`; logout limpa token + tenant |
| MOB-012 | Mobile usa API oficial por padrão fora do ambiente local | IMPLEMENTADO / MOBILE MERGED | `apps/mobile/lib/api.ts` | PR #195; fallback `https://mlivretrabalho.predibeacon.com/v1`; `EXPO_PUBLIC_API_URL` preservado como override |
| MOB-013 | Disponibilidade é preenchida em formato humano e convertida internamente | IMPLEMENTADA / MOBILE MERGED / ANDROID EXPORT GREEN | `disponibilidade.tsx` | PR #200; DD/MM/AAAA + HH:MM; suporta turno cruzando meia-noite e valida entradas inválidas |
| MOB-014 | Localização no check-in/out é opcional e sem tracking em background | IMPLEMENTADA / MOBILE MERGED / DEVICE VALIDATION PENDENTE | `agenda.tsx`, `expo-location` | PR #199; foreground permission only; operação segue mesmo com negação/falha de localização |

## Testes integrados da jornada

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| TEST-JOURNEY-001 | Signup → disponibilidade → vaga → interesse → recomendação → confirmação → assignment → chat/notificação → check-in → início → check-out → conclusão → earnings → avaliação → Work Passport → signout | DB + HTTP E2E GREEN / ANDROID EXPORT GREEN / DEVICE E2E PENDENTE | `professional-journey.sh`, `http-journey-e2e.sh` | multiempresa, tenant isolation, chat, vagas, replacement, Talent Pool e notificações multiempresa; CI #528 SUCCESS |
| TEST-REPLACEMENT-001 | Dois profissionais → pool preferido → replacement request → auto-match → select → original cancelled → substituto confirmed | HTTP E2E GREEN / DEPLOYED | `scripts/http-replacement-e2e.sh` | PR #190; CI #497+ continua verde no pipeline atual |
| TEST-CONFIRM-001 | Confirmação repetida idempotente; estados incompatíveis rejeitados | UNIT GREEN | `company-confirmation-policy.ts` | PR #157 CI #389 |
| TEST-COMPANY-ONBOARD-001 | Signup empresa → workspace owner → signin → publicação de vaga válida sem DB fixture | HTTP E2E GREEN | `http-company-onboarding-e2e.sh` | PR #179 + PR #185; continua verde no CI #528 |
| TEST-ANDROID-EXPORT-001 | Bundle/export Android real compila com stack Expo suportado | CI GREEN | `apps/mobile/package.json`, `.github/workflows/ci.yml`, `pnpm-lock.yaml` | PR #196 fixou `react-native-screens ~4.16.0`; PR #198 congelou dependências; CI #516/#528 SUCCESS |

## Segurança/validação recente

| ID | Requisito | Estado | Código | Teste/Evidência |
|---|---|---|---|---|
| SEC-JOBS-001 | Company Jobs valida papel/vaga/lifecycle/janela do turno | MERGED / CI GREEN / DEPLOYED | `company-jobs.controller.ts`, `company-job-create.controller.ts` | PR #152/#184/#185 |
| SEC-AVAIL-001 | Availability rejeita timestamps inválidos | MERGED / CI GREEN | `availability.controller.ts` | PR #151 + HTTP journey |
| SEC-TEAM-001 | Team Allocation valida job/team/autorização | MERGED / CI GREEN | `team-allocation.controller.ts` | PR #149 |
| SEC-POOL-001 | Talent Pools valida papel, histórico e tenant explícito | MERGED / HTTP E2E GREEN / DEPLOYED | `talent-pools.controller.ts` | PR #146/#189; CI #495+ |
| SEC-SAFETY-001 | Safety case usa membership real e acesso testado | MERGED / CI GREEN | `safety-cases.controller.ts`, `safety-access-policy.ts` | PR #159 |
| SEC-RUNTIME-001 | Operações tenant-owned assumem role NOBYPASSRLS | MERGED / CI GREEN / DEPLOYED | `database.service.ts`, `0027_runtime_rls_role.sql` | PR #182 CI #474 |
| SEC-CHAT-001 | Chat/notificações respeitam assignment e tenant explícitos | MERGED / HTTP E2E GREEN / DEPLOYED | `conversations.controller.ts`, `notifications.controller.ts` | PR #183/#193; empresa B não acessa conversa da A; mark-read tenant-scoped |
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
- mobile usa `https://mlivretrabalho.predibeacon.com/v1` como fallback de produção, com `EXPO_PUBLIC_API_URL` como override;
- custom domain Railway: porta 8080;
- deployment atual da API: `bbf44e63-5b95-4a29-a3f4-132d328aff5c` — **SUCCESS**;
- Postgres Railway: **SUCCESS**;
- pending work: **zero** na verificação de 2026-09-23;
- migration runner: **SUCCESS**, migrations até `0027_runtime_rls_role.sql`;
- CI #528: **SUCCESS**, incluindo frozen lockfile, typecheck, build, Expo Android export, testes, migration runner, jornadas HTTP e Production Truth contract;
- verificação externa HTTPS do domínio oficial já está registrada como **PASS**;
- Production Truth Gate público health/readiness: **PASS**;
- alterações mobile-only não equivalem a app distribuído em aparelho físico;
- Neon não faz parte da arquitetura operacional.

## Pendências que continuam reais

- **Device E2E físico**: instalar/rodar o app em Android/iOS real e validar permissões, navegação, rede, SecureStore e localização em hardware;
- **Distribuição mobile**: identificadores definitivos Android/iOS, perfis de build/distribuição e canais de release ainda não foram congelados;
- **FIN-RISK**: PSP definitivo, contrato/comercial, sandbox real, tarifas, split, chargeback/refund deficit, reserve/advance/credit e revisão jurídico-contábil;
- **TRUST-ARCH**: provider/revisão jurídica, enforcement matrix, appeals, reason taxonomy e política definitiva continuam abertos;
- **Pentest/adversarial final**: permanece gate final após fechamento dos blocos externos.

Evidências principais: `docs/evidencias/PRODUCTION_TRUTH_PUBLIC_PASS_2026-09-23.md`, `NETWORK_SHARED_MARKETPLACE_v1.54.md`, `PROFESSIONAL_MULTI_COMPANY_v1.55.md`, `RUNTIME_RLS_ROLE_v1.56.md`, `CHAT_NOTIFICATIONS_TENANT_E2E_v1.57.md`, `COMPANY_JOB_SELECTION_v1.58.md`, `COMPANY_SHIFT_WINDOW_v1.59.md`, `COMPANY_OPERATION_NAVIGATION_v1.60.md`, `REPLACEMENT_OPERATION_v1.64.md`, `COMPANY_CANDIDATE_RECOMMENDATIONS_v1.69.md`.
