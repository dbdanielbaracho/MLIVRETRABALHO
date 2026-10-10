# Evidence Registry — MLIVRETRABALHO

> Integração/gates consolidados em 2026-10-10 02:32 UTC: [execução verificada](../conversas/EXECUCAO_VERIFICADA_2026-10-10_0232Z.md). O registro está em ../conversas/EXECUCAO_VERIFICADA_2026-10-10_0232Z.md.Reconsultar GitHub; estados abaixo são históricos da versão.

Este registro acompanha o Documento da Verdade. Claims temporais devem ser revalidados em fonte primária antes de congelar comportamento de produção.

| Evidence ID | Fonte | Tema | Fato registrado | Status | Transferibilidade/decisão |
|---|---|---|---|---|---|
| COMP-JT-FIN-001 | Job&Talent | Financial Risk | Facility anunciada em out/2024 com Barclays + Fasanara em forma de trade receivables securitization; operação 2022 de US$250m é distinta | Verificado no histórico | Referência para financiar gap pagamento trabalhador/recebimento cliente; não copiar automaticamente |
| COMP-EST-LEGAL-001 | Estaff | Pagamentos/intermediação | Termos analisados descrevem processador/split, fee de intermediação e possibilidade de antecipação/sub-rogação | Verificado no histórico; revalidar redação atual | Benchmark Brasil; risco de crédito precisa gate próprio |
| COMP-INSTA-CANCEL-001 | Instawork | Cancelamento/Reliability | Help Center analisado: cancelamento empresarial em janela curta pode gerar até 4h; late/urgent cancellation do profissional pode afetar reliability/acesso; Paid Backup Shifts existem sob condições | Verificado no histórico; revalidar política atual | Inspiração, não política copiada |
| COMP-QWICK-CANCEL-001 | Qwick | Cancelamento | Suporte analisado: cancelamento de confirmed shift pela empresa dentro de 24h pode acionar mínimo até 4h; profissional tem consequências escalonadas | Verificado no histórico; revalidar política atual | Inspiração, não política copiada |
| COMP-INDEED-CANCEL-PENDING | Indeed Flex | Cancelamento | Política numérica não fechada | PENDING | Não usar números até fonte primária independente |

## Evidências técnicas — ADR-MT-001

| Evidence ID | Fonte | Tema | URL | Data verificada | Fato registrado | Status | Decisão |
|---|---|---|---|---|---|---|---|
| ARCH-PG-RLS-001 | PostgreSQL 17 Documentation | Row-Level Security | https://www.postgresql.org/docs/17/ddl-rowsecurity.html | 20/09/2026 | RLS restringe linhas por política; sem política aplicável após habilitar RLS, o comportamento é default-deny. Owner normalmente não fica sujeito a RLS; `FORCE ROW LEVEL SECURITY` altera esse comportamento, e superuser/BYPASSRLS exigem cuidado. | Fonte primária verificada | Base técnica para `tenant_id` + RLS e separação da role runtime |
| ARCH-AWS-MT-001 | AWS Prescriptive Guidance | PostgreSQL multi-tenancy | https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-managed-postgresql/best-practices.html | 20/09/2026 | Modelos silo/bridge/pool têm trade-offs; para pool em PostgreSQL, RLS centraliza o isolamento no banco e reduz dependência de filtros na aplicação. | Fonte técnica primária do fornecedor verificada | Suporta pool + RLS como baseline de menor overhead |
| ARCH-AWS-ISO-001 | AWS SaaS Architecture Fundamentals | Tenant isolation | https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/tenant-isolation.html | 20/09/2026 | Autenticação/autorização não são, sozinhas, isolamento de tenant; a arquitetura precisa de mecanismos explícitos para impedir acesso a recursos de outro tenant. | Fonte técnica primária do fornecedor verificada | Isolamento tratado como fronteira própria de segurança |

## Evidências técnicas — Visual Truth Gate

| Evidence ID | Fonte | Tema | URL | Data verificada | Fato registrado | Status | Decisão |
|---|---|---|---|---|---|---|---|
| UI-MOBILE-GANHOS-001 | Repositório e GitHub Actions | Contraste do gráfico semanal de Ganhos | https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/333 | 09/10/2026 | Etiquetas dos dias alteradas de `#EDE8FF` para `#65708A`; CI e APK standalone sem Metro aprovados | Verificado | Integrado em `cb7b689983976255798af661ca2e59a2d4c738c0`; auditoria global continua |
| UI-MOBILE-EMPRESA-IDENTIDADE-001 | Documento da Verdade e GitHub Actions | Identidade roxa nas quatro áreas da Empresa | https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/335 | 09/10/2026 | Azul `#064A9B` removido de navegação, CTAs, seleção e ícones das áreas canônicas da Empresa | Verificado | Integrado em `460bd1fbaa1bc284848caf5c609fb916ebab5ee7`; auditoria global continua |
| UI-MOBILE-ENTRADA-001 | Documento da Verdade, código e GitHub Actions | Identidade de abertura, entrada e criação de conta | https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/337 | 09/10/2026 | Três telas reconciliadas com marca, roxo canônico, contraste, rolagem e acessibilidade; CI e APK standalone aprovados | Verificado | Integrado em `2bb27ea09e7233f2b4c93a70c02d0e7fbf2c0962`; correções específicas aprovadas; fechamento integral revogado na v1.30 por pendências internas; Visual Truth Gate OPEN |

## Evidências técnicas — CI

| Evidence ID | Fonte | Tema | URL | Data verificada | Fato registrado | Status | Decisão |
|---|---|---|---|---|---|---|---|
| CI-POSTGRES-REGISTRY-001 | GitHub Actions e Docker Official Image mirror | Resiliência do serviço PostgreSQL no CI | https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/338 | 09/10/2026 | Falhas `toomanyrequests` do Docker Hub antes do checkout foram eliminadas usando `public.ecr.aws/docker/library/postgres:17`; suíte completa passou | Verificado | Integrado em `74cfa372b8f824adee3e99394556450eec24d9c3`; versão e contrato do banco preservados |

## Regra

Cada evidência material futura deve registrar: Evidence ID, concorrente/fonte, tópico, URL/fonte primária, data verificada, fato, confidence/status, transferibilidade ao Brasil e decisão do MLIVRETRABALHO.

**COMP-EVIDENCE bloqueia decisão material baseada em claim não verificado.**

## Implementação em validação — v1.31

| Evidence ID | Fonte | Fato | Estado | Decisão |
|---|---|---|---|---|
| UI-MOBILE-REAL-HOME-001 | Código/contratos e MOBILE_REAL_HOME_AND_COMPANY_NAV_v1.31.md, 09/10/2026 | Dados fictícios substituídos por quatro APIs; oito testes locais aprovados em UTC/São Paulo; navegação de /empresa reconciliada com v1.26 | IMPLEMENTADO; CI/APK/merge pendentes no registro inicial | Acompanhar gates e registrar SHA/runs no checkpoint; Visual Truth Gate OPEN |

## Perfil — v1.32

| Evidence ID | Fonte | Fato | Status | Decisão |
|---|---|---|---|---|
| UI-MOBILE-PROFILE-SHORTCUTS-001 | MOBILE_PROFILE_SHORTCUTS_v1.32.md, 09/10/2026 | Dois itens do Perfil agora abrem capacidades existentes; layout/contratos preservados | Implementado na branch; gates pendentes | Validar CI/APK e pós-merge; manter auditoria global aberta |

#341: CI `38006447169` e APK `38006447148` aprovados; merge `1f40e9e0bcab3e302b3319652a8f030495d7ccde`. Pós-merge em acompanhamento, sem PASS antecipado.

## Destinos profissionais — v1.33

| Evidence ID | Fonte | Fato | Status | Decisão |
|---|---|---|---|---|
| UI-MOBILE-SECONDARY-STATES-001 | MOBILE_SECONDARY_NETWORK_STATES_v1.33.md, 09/10/2026 | Falhas de disponibilidade/notificações tratadas; seis novos testes, 14 totais locais UTC/São Paulo | Implementado na branch, gates pendentes | Integrar após #342 e validar head/pós-merge; Visual Truth OPEN |

## Perfil e referência original — v1.34

| Evidence ID | Fonte | Fato | Status | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-PROFILE-STATES-001 | MOBILE_PROFILE_STATES_v1.34.md | Estados sem zeros presumidos; 5 testes novos, 19 totais locais | Implementado na branch; gates pendentes | Revisar, integrar após #343 com CI/APK exatos, pós-merge |
| UI-MOBILE-ORIGINAL-REFERENCE-001 | docs/referencias/BASELINE_MOBILE_ORIGINAL.md | Imagem original intacta recuperada do DOCX v1.2, hash rastreável | Referência recuperada; Visual Truth OPEN | Comparar aplicação real/dados/estados, sem promessas ilustrativas |

## Ganhos — v1.35

| Evidence ID | Fonte | Fato | Status | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-EARNINGS-TRUTH-001 | MOBILE_EARNINGS_STATES_v1.35.md | Semana/status/loading corrigidos; quatro testes novos, 23 totais locais | Implementado na branch; CI/APK pendentes | Integrar após #344 e gates exatos, pós-merge; Visual Truth OPEN |

## Painel Empresa — v1.36

| Evidence ID | Fonte | Fato | Status | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-COMPANY-STATES-001 | MOBILE_COMPANY_STATES_v1.36.md | Estados independentes/ações tratadas/tenant consistente; quatro novos testes, 27 totais locais | Implementado na branch, gates pendentes | Integrar após #345 corrigido e gates exatos/pós-merge; Visual Truth OPEN |

## Agenda e pós-merge — v1.37

| Evidence ID | Fonte | Fato | Status | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-AGENDA-STATES-001 | MOBILE_AGENDA_STATES_v1.37.md | Badge/ciclo/loading reais; 4 novos testes, 31 totais locais | Implementado na branch; gates pendentes | Integrar após #346/gates exatos/pós-merge |
| UI-MOBILE-HOME-POST-MERGE-001 | Runs 38012421142 / 38012421105, main 1f40e9e0bcab3e302b3319652a8f030495d7ccde | CI/smoke sem Metro/upload APK sucesso, artefato 11654492684 | Técnico aprovado | Visual Truth/piloto físico seguem separados |

## Início/referência e atalhos integrados — v1.38

| Evidence ID | Fonte | Fato | Status | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-HOME-CANONICAL-CARDS-001 | MOBILE_HOME_CANONICAL_CARDS_v1.38.md | Estrutura de cards da referência com APIs reais e estados honestos; 36 testes locais | Implementado na branch; gates próprios pendentes | Integrar após #347 e validar capturas/Visual Truth |
| UI-MOBILE-PROFILE-SHORTCUTS-MERGE-001 | #342 / CI 38012515909 / APK 38012515803 | Atalhos integrados no SHA aee58e7776eee0dc211713edcbe29075f841ecb1 | Pré-merge aprovado; pós-merge em execução | Acompanhar 38014015303 / 38014015274 |

## Trabalhos — v1.39

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-JOBS-STATES-001 | MOBILE_JOBS_STATES_v1.39.md | Foco/schema/timeout/ack interesse; 40 testes locais | Branch encadeada após #348 corrigido | CI/APK exatos, revisão, merge e pós-merge |

## Interessados — v1.40

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-CANDIDATES-STATES-001 | MOBILE_CANDIDATES_STATES_v1.40.md | Estados/seleção/contexto/ack; 45 testes locais | Implementado branch após #349 | Gates exatos, integração, pós-merge; taps/Visual Truth OPEN |

## Equipe — v1.41

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-TEAMS-STATES-001 | MOBILE_TEAMS_STATES_v1.41.md | Estados/seleção/contexto/salvamento; 51 testes locais | Branch após #350 | Gates exatos, merge/pós-merge; taps/Visual Truth OPEN |


## Reconciliação e pós-merge verificados — 10/10/2026

Fonte: [registro 03:18 UTC](../conversas/EXECUCAO_VERIFICADA_2026-10-10_0318Z.md). #350 pós-merge CI38018391376/APK38018391418 sucesso; #351 reconciliado exige gates novos antes de integração. Visual Truth OPEN.

## Conta — v1.42

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-COMPANY-ACCOUNT-ROUTES-001 | MOBILE_COMPANY_ACCOUNT_ROUTES_v1.42.md | Notificações reais no tenant/CompanyNav, labels e saída offline | Branch após #351 | CI/APK exatos, merge/pós-merge/taps; Visual Truth OPEN |

## Preparação #352 — 2026-10-10

Head original 953bdcf9426d66b0e25bc054dbfa56b83dbf2f8e; predecessor reconciliado #351 7ac5a6dace04ae120b6f8114ea87a499b0e222eb. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Leituras Empresa — v1.43

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-COMPANY-READONLY-STATES-001 | MOBILE_COMPANY_READONLY_STATES_v1.43.md | Estados/dados ausentes reais, GET-only; 57 testes locais | Branch após #352 | Gates exatos/merge/pós-merge/taps; Visual Truth/FIN-RISK OPEN |
| UI-MOBILE-PROFILE-SHORTCUTS-POST-001 | Runs 38014015303/38014015274, main aee58e7776eee0dc211713edcbe29075f841ecb1 | CI e APK pós-merge sucesso | Técnico aprovado | Gates visuais permanecem separados |

## Preparação #353 — 2026-10-10

Head original 5560abdf3a11bbdf63800ed2767d6db7e656ff17; predecessor reconciliado #352 667f7ef92d4596a773379add4c7a022242160b63. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Membros e transiente Android — v1.44

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-MEMBERS-STATES-001 | MOBILE_MEMBERS_STATES_v1.44.md | Estados/guards/ack/owner-only preservado; 63 testes locais | Branch após #353 | Gates próprios/merge/pós-merge/taps |
| CI-ANDROID-EMULATOR-TRANSIENT-002 | #343 run 38014252773 job 114100922318 | Emulador settings Broken pipe exit224 antes smoke do projeto; APK build aprovado | Retry controlado no mesmo head solicitado | Acompanhar tentativa2; sem bypass ou pausa global |

## Preparação #354 — 2026-10-10

Head original da169b62efdc52a4e72ccdb3d2d4b77ef491ae3f; predecessor reconciliado #353 f54f14f5ed6d375861b086469496ecddf14718f2. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Relatos — v1.45

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-SAFETY-STATES-001 | MOBILE_SAFETY_STATES_v1.45.md | Estados/guards/ack/contexto; decisões/policies humanas preservadas; 69 testes locais | Branch após #354 | Gates próprios/merge/pós-merge/taps |
| CI-ANDROID-PROFILE-SHORTCUTS-POST-002 | 38014015274 / job 114100204846 / artefato 11655825530 | DEVICE_SMOKE_OK efetivo e hash zip verificados | Técnico aprovado | Não fecha Visual Truth/piloto físico |

## Preparação #355 — 2026-10-10

Head original 05e2c7e6cf4ea8ef1c7553e2f9928af3b6a25d71; predecessor reconciliado #354 92651205a78181e7440375c552b933033ba7d54b. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Publicação — v1.46

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-COMPANY-PUBLICATION-001 | MOBILE_COMPANY_PUBLICATION_v1.46.md | Timeout/guard/ack/draft/sem repetir POST; 73 testes | Branch após #355 | CI/APK exatos, diff, merge/pós-merge/taps |
| CI-ANDROID-EMULATOR-TRANSIENT-003 | #349 38014598041 job114101968886; #350 38014796852 job114102576498 | Build aprovado, Broken pipe224 antes script | Retry2 mesmo SHA solicitado | Acompanhar/diagnosticar, sem bypass |

## Preparação #356 — 2026-10-10

Head original 5ddcb0d59c2bd13a49b5d4654efbcc02331699cf; predecessor reconciliado #355 cc4c3474afa997923c5211a5768ad745a9c77869. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Talentos — v1.47

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-TALENTS-STATES-001 | MOBILE_TALENTS_STATES_v1.47.md | Pools/estados/contexto/DELETE/ack; 79 testes locais | Branch após #356 | CI/APK exatos, revisão, merge/pós-merge/taps |

## Preparação #357 — 2026-10-10

Head original 449d25095c91fc63611ece504300448dd7192d50; predecessor reconciliado #356 6dd68681ec2739fbc5589fcbb68bcb4a57447510. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Substituições — v1.48

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-REPLACEMENTS-STATES-001 | MOBILE_REPLACEMENT_STATES_v1.48.md | Estados/contexto/ack/score82→82%;87 testes | Branch após #357 | Gates exatos/revisão/merge/pós-merge/taps |

## Preparação #358 — 2026-10-10

Head original 8e580893cf18ef31ef2f6aaa1ac168497fab46aa; predecessor reconciliado #357 4ee8172b3ed97cff66709ac58b0f903aba8572ab. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Conversa — v1.49

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-CONVERSATION-STATES-001 | MOBILE_CONVERSATION_STATES_v1.49.md | Dados/rota/sessão/ack/draft/sem duplicar;93 testes | Branch após #358 | Gates exatos/revisão/merge/pós-merge/taps |

## Preparação #359 — 2026-10-10

Head original d4567c39e4c113870382fbfcc9d2bc1bff71dcb7; predecessor reconciliado #358 8523aed8d98a596a22ee2d5d762f8d05afcfa2a5. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Segurança profissional — v1.50

| Evidence ID | Fonte | Fato | Estado | Próxima ação |
|---|---|---|---|---|
| UI-MOBILE-PROFESSIONAL-SAFETY-STATES-001 | MOBILE_PROFESSIONAL_SAFETY_v1.50.md | Estados/contexto/ack/contraditório/sem duplicar;101 testes | Branch após #359 | Gates exatos/revisão/merge/pós-merge/taps |

## Preparação #360 — 2026-10-10

Head original 1c1756fd20ae369a6df6855f79b873ce07ca0967; predecessor reconciliado #359 99a10a406c00db62eaec784e22ec4e53cf0585d2. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## Indicadores — v1.51

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-ANALYTICS-STATES-001 | MOBILE_ANALYTICS_STATES_v1.51.md | 6 testes novos/107 locais; GET/estados/null/taxa real | Branch/gates pendentes; Visual Truth OPEN |

## Assistente — v1.52

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-COPILOT-STATES-001 | MOBILE_COPILOT_STATES_v1.52.md |6 novos testes/113 locais; sugestão schema/rota/ação crítica/manual; rede/guard | Branch; CI/APK/taps pendentes; Visual Truth OPEN |

## Integrações 10/10/2026 e Privacidade v1.53

Fonte: [execução verificada06:21](../conversas/EXECUCAO_VERIFICADA_2026-10-10_0621Z.md). #356–#360/#362/#363 merges confirmados com gates exatos/trees/parents. Pós-merges em acompanhamento, sem PASS antecipado.

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-PRIVACY-REQUEST-STATES-001 | MOBILE_PRIVACY_REQUEST_STATES_v1.53.md |4 novos testes/117 locais; GET requests real/estados | Branch; CI/APK/taps pendentes; Visual Truth OPEN |


## Privacidade manual — v1.54

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-PRIVACY-ACTIONS-001 | MOBILE_PRIVACY_ACTIONS_v1.54.md |8 novos testes/125 locais; guard/ack/sessão/export explícito/deativação humana | Branch; CI/APK/taps pendentes; Visual Truth OPEN |

Snapshot atualizado dos pós-merges/retries: journal EXECUCAO_VERIFICADA_2026-10-10_0630Z.md. CI pós-merge de sete integrações aprovado; APKs ainda em execução; não declarar PASS antecipado.


## Assistente/Notificações — v1.55

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-COPILOT-ACCOUNT-NOTIFICATIONS-001 | COPILOT_NOTIFICATION_ACCOUNT_ROUTE_v1.55.md | Conta/rota/plural;126 mobile locais+5 política API; runner/E2E ajustados | Branch; CI/APK/HTTP/taps pendentes |
| CI-ANDROID-POST-355-RETRY-001 | journal0635Z/run38023598566/job114149969814/artefato11661758941 | Retry2 same SHA success, smoke real sem Metro/upload | Técnico aprovado; Visual Truth aberto |


## Cadastro — v1.56

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-SIGNUP-ACK-STATES-001 | MOBILE_SIGNUP_ACK_STATES_v1.56.md |7 novos testes/133 locais; signupbody/ack/incerteza/contexto | Branch; CI/APK/taps pendentes; Visual Truth OPEN |
| CI-ANDROID-POST-357-TRANSIENT-001 | journal0639Z/run38030523164/job114150307665 | APK buildsuccess/inputBrokenpipe224 antes script | Retry2 sameSHA solicitado; sem PASS antecipado |


## Login e pós-merges — v1.57

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-SIGNIN-SESSION-001 | MOBILE_SIGNIN_VERIFIED_SESSION_v1.57.md |13 novos testes/146 locais; signinack/fila/sessionpair/releitura/rollback | Branch; CI/APK/taps pendentes |
| CI-ANDROID-POST-INTEGRATIONS-0645 | journal0645Z | Pós356/359/362/363success; retry353success; smoke/jobs/artifacts SHA conferidos | Técnico aprovado; Visual Truth aberto |


## Availability e Privacidade integrada — v1.58

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-AVAILABILITY-ACK-001 | MOBILE_AVAILABILITY_ACK_v1.58.md |6novostestes/152locais;ackID/janela/session/foco/draft | Branch;CIAPK/taps pendentes |
| CI-ANDROID-PRIVACY-READ-MERGE-001 | journal0650Z/#3648844a118caa19ea454dc713565db47827e58f853 | headCIAPKpass/treeparentsverificados;postCIpass | postAPK emexecução;VisualTruthOPEN |


## Perfil, saída e integração #365 — v1.59

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-PROFILE-ACK-SESSION-EXIT-001 | MOBILE_PROFILE_ACK_SESSION_EXIT_v1.59.md |10 novos testes/162 locais; ID/campos/contexto/clear condicional | Branch; CI/APK/taps pendentes |
| CI-ANDROID-PRIVACY-ACTIONS-MERGE-001 | journal0700Z/#3651c89d39cc4b25c66104eb7ffb06cf4cae5125e0e | HeadCIAPKpass/treeparents/smoke/artefato verificados | Pós-runs a acompanhar;VisualTruthOPEN |


## Membros e pós-merges — v1.60

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-MEMBERS-TENANT-001 | MOBILE_MEMBERS_TENANT_PERSISTENCE_v1.60.md | 6 testes novos/168 locais UTC/SP; seleção condicional token+tenant/fila/rollback | Branch;CI/APK/taps pendentes |
| CI-ANDROID-POST-INTEGRATIONS-0712 | journal0712Z | Todos356–360/362/363 pósCIAPK success;357/358retry2 jobs/smoke/artefatos conferidos | Técnico aprovado;VisualTruthOPEN |
| CI-ANDROID-MERGES-366-367-001 | journal0712Z | Heads CIAPK success/tree/parents/main conferidos | PósCI success;APKs em execução |
| CI-ANDROID-368-RETRY-001 | journal0712Z | ANR com.android.phone antes de eventos;retry único sameSHA | Pendente;merge retido |


## Painel Empresa e Privacidade pós-merge — v1.61

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-COMPANY-DASHBOARD-ACK-001 | MOBILE_COMPANY_DASHBOARD_ACK_v1.61.md |8 testes novos/176 locais;ACK rating/preferred/conta+empresa/exit condicional|Branch;CIAPK/taps pendentes|
| CI-ANDROID-PRIVACY-POST-364-001 | journal0717Z | PósCIAPK364 main8844a118caa19ea454dc713565db47827e58f853;smoke/artefato|Success técnico;VisualTruthOPEN|


## Agenda e Privacidade pós-merge — v1.62

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| UI-MOBILE-AGENDA-ACK-001 | MOBILE_AGENDA_ACK_CONTEXT_v1.62.md |7novostestes/183locais;ACKestado/horário/score/Auth/coordopcional|Branch;CIAPK/taps pendentes|
| CI-ANDROID-PRIVACY-POST-365-001 | journal0723Z |PósCIAPKmain1c89d39cc4b25c66104eb7ffb06cf4cae5125e0e;smoke/artefatoSHAconferidos|Success técnico;VisualTruthOPEN|


## Smoke Android e pós-merges — v1.63

| Evidence ID | Fonte | Fato | Estado |
|---|---|---|---|
| CI-ANDROID-SMOKE-DIAGNOSTIC-001 | ANDROID_SMOKE_FAILURE_DIAGNOSTICS_v1.63.md |8shellfixtures/boundedlogs/exitpreservado/sem skip|Branch;APK real/head/pós-merge pendentes|
| CI-ANDROID-POST-366-367-001 | journal0732Z |366/367pósCIAPKsuccess no SHAexato/jobs/smoke/artefatos|Técnico aprovado;VisualTruthOPEN|
| CI-ANDROID-HEADS-369-371-001 | journal0732Z |Heads369/370/371CIAPKsuccess e artefatos/smoke próprios|Aguardam368/retarget/revisão;semmergeantecipado|


## Contexto Profissional / token HTTP — v1.64

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-PROFESSIONAL-ORIGIN-001|PROFESSIONAL_ORIGIN_SESSION_AND_HTTP_TOKEN_v1.64.md|8 novos/191mobile UTCSP; origem/foco/ACK|Branch;CIAPK/taps pendentes|
|CI-HTTP-TOKEN-ARGUMENT-001|journal0752Z/run38035165889|Falha Node opção reproduzida;3 regressões comando real aprovadas|Run antigo FAILURE;novo HTTP ainda obrigatório|
|CI-ANDROID-MERGES-368-373-001|journal0752Z|HeadsCIAPKsuccess/árvores/pais/main confirmados|Pós-gates conforme tabela;VisualTruthOPEN|


## Notificações / gate HTTP corrigido — v1.65

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-NOTIFICATION-ORIGIN-ACK-001|NOTIFICATIONS_ACK_AND_ORIGIN_CONTEXT_v1.65.md|7novos/198UTCSP;contexto/tenant/ACK/date/unknown|Branch;ownCIAPK/físico pendentes|
|CI-HTTP-TOKEN-ARGUMENT-001|journal0756Z/run38035883488|3regressões+jornadaHTTP/ProductionTruthnoheadf31422e45165dd8eeaa276d15142bab83a343176|CI novoSHA success;antigo370failurepreservado|
|CI-ANDROID-POST-369-001|journal0756Z/run38035131936|smokejob/artifactheadbe8c02d2c813533ae0a9b8a29446410ecac48d82|CIAPKsuccess técnico;VisualTruthOPEN|


## Ganhos/Conversa — v1.66

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-EARNINGS-CONVERSATION-ORIGIN-001|EARNINGS_CONVERSATION_ORIGIN_CONTEXT_v1.66.md|6novos/204UTCSP;GET/ACK/origem/draft/routes|Branch;ownCIAPK/taps pendentes|
|CI-NOTIFICATIONS-HEAD-376-001|journal0801Z/run38036176120|CItypecheck/HTTP head931a9b3c333a0771c5a2237cdd84a249eba14589success|APK emexecução;VisualTruthOPEN|


## Publicação / Android integrado — v1.67

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-COMPANY-PUBLICATION-ORIGIN-001|COMPANY_PUBLICATION_ORIGIN_CONTEXT_v1.67.md|5novos/209UTCSP;origem+empresa/foco/location/draft|Branch;ownCIAPK/físico pendentes|
|CI-ANDROID-SMOKE-DIAGNOSTIC-001|journal0807Z/merge5938a40ee27be04f4ccb63242421eb293ba2ddb9|374ownCIAPKsuccess/treeparents/main;novo smoke real|Integrado;pósCIpass/APKrunning;VisualTruthOPEN|
|CI-ANDROID-POST-368-371-001|journal0807Z|368/369/370/371pósAPKsjob/smoke/artifactheadcomprovados|TécnicoAPKpass;CI370failurepreservado|


## Leituras company — v1.68

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-COMPANY-READONLY-ORIGIN-001|COMPANY_READONLY_ORIGIN_CONTEXT_v1.68.md|2bindingsorigemtenant;209sharedUTCSP/diff|Branch;ownCIAPK/físico pendentes|
|CI-378-TRANSIENT-CONTAINER-001|journal0810Z/run38036810382/job114168834894|ECRrate antesCheckout;único retry samehead|Retry2 in_progress/semgateemprestado|


## Equipes/Talentos — v1.69

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-TEAMS-TALENTS-FINAL-CONTEXT-001|TEAMS_TALENTS_FINAL_CONTEXT_v1.69.md|214 testes UTC/SP; origem final/IDs/incerteza|Branch; próprios CI/APK/físico pendentes|
|CI-378-TRANSIENT-CONTAINER-001|journal0822Z/38036810382/job114169158970|Retry único sameSHA com todos os passos CI aprovados|SUCCESS tentativa2; histórico preservado|
|CI-376-TRANSIENT-EMULATOR-001|journal0822Z/38036176113|Build passou; input Broken pipe224 antes do script; logs uploaded|Retry único pendente; merge retido|
|CI-ANDROID-POST-372-373-001|journal0822Z|CI/APK, jobs/smoke/ZIP/SHA pós-merges conferidos|SUCCESS técnico; Visual Truth OPEN|
|CI-ANDROID-MERGE-375-001|journal0822Z/765cb2e834065f6eeaf0262ed9eedca9cbb2d52a|Head CI/APK, diff/base/árvore/pais/main conferidos|Integrado; pós-CI/APK em execução|


## Fluxos da empresa — v1.70

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-COMPANY-WORKFLOW-FINAL-CONTEXT-001|COMPANY_WORKFLOW_FINAL_CONTEXT_v1.70.md|7 regressões; 221 UTC/SP; contexto final/IDs/ACK real|Branch; próprios CI/APK/físico pendentes|
|CI-TEAMS-TALENTS-380-001|journal0826Z/run38037706772|CI success headcf0812a45e5e594a6839d061ec27e809e41c177b|APK pendente; não fecha Visual Truth|


## Segurança — v1.71

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-SAFETY-FINAL-ORIGIN-001|SAFETY_FINAL_ORIGIN_CONTEXT_v1.71.md|6 regressões;227 UTC/SP;contexto/IDs/ACK sensível|Branch; próprios CI/APK/físico pendentes|
|CI-ANDROID-POST-374-001|journal0829Z/run38036515570|Pós-CI/APK no SHA5938a40ee27be04f4ccb63242421eb293ba2ddb9, smoke/artifact|SUCCESS técnico;Visual Truth OPEN|


## Privacidade / Assistente / Convites — v1.72

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-ACCOUNT-TIMEOUT-ORIGIN-001|ACCOUNT_ACTIONS_TIMEOUT_ORIGIN_v1.72.md|7 regressões;234 UTC/SP;ACK/origem/prazo/rascunhos|Branch; próprios CI/APK/físico pendentes|
|CI-ANDROID-MERGES-376-382-001|journal1129Z|CI/APK próprios exact head, diff/base/treeparents/main|Integrado; pós CI success/APK running|
|CI-376-TRANSIENT-EMULATOR-001|38036176113 tentativa2/job114171193296|MesmoSHA;smoke/upload/ZIP aprovado após único retry|SUCCESS recuperação;falha1 preservada|
|CI-ANDROID-POST-375-001|38037544424/job114171028139|Pós CI/APKsuccess,smoke semMetro,artifactZIP/head|SUCCESS técnico;VisualTruth OPEN|


## Abertura pareada — v1.73

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UI-MOBILE-STARTUP-PAIR-001|STARTUP_SESSION_PAIR_v1.73.md|4 regressões;238 UTC/SP;fila real/tenant/foco|Branch; próprios CI/APK/físico pendentes|
|CI-ACCOUNT-ACTIONS-383-001|journal1132Z/38048556097|type/build/export já passaram no heada8c2c106068f311a64e6a303bae03d6d323df8e2|CI próprio success/APK em execução; físico não fechado|
|DOC-STATE-HISTORY-001|REQUIREMENTS_LEDGER.md|Tabelas base são snapshot2026-09-24, não bloqueio atual|Histórico preservado; deltas vigentes|


## Suporte e vínculo tenant — v1.74

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|SEC-SUPPORT-ASSIGNMENT-001|SUPPORT_ASSIGNMENT_TENANT_BOUNDARY_v1.74.md|Código/schema defeituosos revalidados; lookup tenant antes INSERT|Branch; HTTP/DB próprios pendentes|
|SUPPORT-INPUT-001|support-input.test.ts/support.controller.test.ts|4input+4método real fixturespass;Unicode4000/IDs/semINSERT|Mocks locais; Nest/HTTP/RLS real só CI próprio|
|CI-376-POST-TRANSIENT-001|38047970768/job114201236096|InputBrokenpipe224 antes script; ZIP11668597419|Único retry2 running; falha preservada|
|CI-ACCOUNT-STARTUP-383-384-001|journal1140Z|Ambos CIs próprios success, APKs running|Não integrado nem físico fechado|


## Atualização verificada 2026-10-10 11:45 UTC — correção da fixture e pós-provas

PR #385 primeiro head b8674912ea8e553fe3e311b551a31a597ef633b3/tree f1ea148e29fa6aa87ee0ea60108f0109d89191d6/pai d2146ef4a84a025567d52af7cb2b506462e29836 conferidos, diff remoto16arquivos revisado. CI38049311501/job114205058747 FAILURE no passo HTTP, após type/build/export, testes unitários incluindo controller inteiro, migration runner e privacy pass. Não reclassificar run nem repetir como transiente: havia expectativa403 incorreta para absent-membership no novo script; AuthService.requireMembership atual lança UnauthorizedException401. Fixture corrigida para401, com etiquetas/HTTPesperado+real em todos os negativos (sem tokens/payloads em diagnóstico), sem mudar autorização/backend. Bash -n passou. Novo commit próprio é obrigatório e será revalidado integralmente; consultar seu SHA após publicação, pois este registro o antecede. HTTP suporte ainda pendente até novo run success.

Subtree mobile exata #384/#385 é ba685042c10bf42051738241601f7a2041498a7b. Próprio #385 só emitiu CI (path filter APK N/A para API/CI/script/docs); isto não fecha APKs próprios #383/#384 nem Visual Truth.

|PR|SHA pós-merge exato|Gates|Job APK|Smoke real sem Metro|Artefato/digest ZIP (não APK individual)|
|---|---|---|---|---|---|
|#378|0e8321c4aa0adeb389d11d776a8cd66567680798|CI38048052533/APK38048052704 SUCCESS|114201468568|2026-10-10T11:40:07.1735973Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|ZIP11668990409 sha256:323b858d10f7dda7dc93143c2b5ec9283a1ebd02af0299521c8ee1587b5b3eb3|
|#379|18869fe910a89a55f897e74d6e81015404ca3998|CI38048058105/APK38048058091 SUCCESS|114201484903|2026-10-10T11:38:58.5421271Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|ZIP11668797338 sha256:0c37566a8d48dbecc2488428cb7e0d7577aae23296fca9e42f7f21b608cf9892|
|#382|516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca|CI38048073330/APK38048073303 SUCCESS|114201529542|2026-10-10T11:39:26.5431555Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|ZIP11668462821 sha256:145261eb8336c7981d9e6ff40c0a9609fa7a5b4f17f59ca52cdd85e52cf8d87a|

Jobs completos, smoke/uploadsuccess, vínculo artifactSHA e não-expiração conferidos. Main516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca possui pós-CI/APKsuccess; não implica fechamento físico. Pós #381 tentativa1APK38048068335/job114201515065 falhou input Broken pipe224 em11:39:53Z antes do script app, apósbuild. DiagnósticoZIP11668319473 sha256:2da1618bdea13d360df0481e9df4bfbd289b3a1fb1b672e8bcf94392db6ea229 vinculado ao SHAac18ca03de7a5f09ff3a626a763fadb55e699074. Único retry controlado no mesmoSHA solicitado, a acompanhar tentativa2; não repetir sem nova causa. Pós376retry2 e377/380 ainda a acompanhar; próprios APK383/384 pendentes. Nenhum novo merge realizado.

Auditoria integrity/cancellation/career-conversion/work-graph encontrou lookup/relação tenant explícitos no fluxo lido; não alterar política sem defeito provado. Lacuna independente concreta encontrada: API package test enumera fontes manualmente e omite12arquivos .test.ts existentes (Copilottools/modalidades/SLA/integration/appeals/schedule/score/adapter HMAC/taxonomy/team/terms/vertical). Typecheck não executa testes. Próxima tarefa segura após publicar esta fixture: configurar descoberta dos29arquivos de teste API atuais (27da main+2suporte), provar execução efetiva dos omitidos e manter todos os gates. Sem ativar provider/financeiro real.


## Descoberta API — v1.75

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|CI-API-DISCOVERY-001|API_TEST_DISCOVERY_v1.75.md|12fontes omitidas,21testes reais;26locais13files|Branch; novo próprio CIcompleto pendente|
|SEC-SUPPORT-ASSIGNMENT-001|38049578933/job114205819194|Controller real+schema+HTTP/RLS no CI;47API238mobile|SUCCESS próprio;merge/pós aguardantecessores|
|CI-ANDROID-POST-377-001|1150Z/38048000637|Smoke/job/upload/ZIP SHAexato conferidos|SUCCESS técnico;VisualTruth OPEN|
|CI-ANDROID-POST-380-TRANSIENT-001|38048063298/job114201499870/ZIP11668792675|Download hashbytes + boot1/logcat124/pid1, earlyshell224|Único retry2 solicitado,semfakePASS|


## Verificação 2026-10-10 12:06 UTC — v1.76

## Merges confirmados e pós-verificação — 2026-10-10 12:06 UTC

Main caa275aadbb118d37696f5609c3ebe17cd4e5856, árvore87b6c25b186660025eb5e408240ce9d66fbae160, Documento vigente v1.75 antes desta fatia. README/memória/checkpoint/main/PRs/diffs/gates reconsultados. Nenhuma PR aberta no snapshot antes da nova publicação. #383–#386 integradas em ordem, com retarget main só após predecessor, fresh merge-base.tree igual à main.tree, diff integral revisado e gates próprios no SHA exato; expected_head_sha em cada merge. Git object pós-merge conferiu árvore idêntica ao own head e dois pais corretos (main anterior e head), depois main igual ao resultado. Não repetir esses merges.

|PR|Own head|Merge real|Árvore|Pais ordenados|Own gates|Pós-merge|
|---|---|---|---|---|---|---|
|#383|a8c2c106068f311a64e6a303bae03d6d323df8e2|0d492408860ef0575e59974bf33eee19912a03e0|6159c19dd189fd46691df56a39fffa58a7ec993c|516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca / a8c2c106068f311a64e6a303bae03d6d323df8e2|[CI38048556097](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048556097) SUCCESS; [APK38048556192](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048556192) SUCCESS|[Standalone Pilot APK38050190228](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050190228) IN_PROGRESS; [CI38050190209](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050190209) SUCCESS|
|#384|d2146ef4a84a025567d52af7cb2b506462e29836|c033a300eb7e51b383a07240cc5ec4eb07900b40|b0f4e30e05428882397ee6bcee6cec43a94a533e|0d492408860ef0575e59974bf33eee19912a03e0 / d2146ef4a84a025567d52af7cb2b506462e29836|[CI38048756243](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048756243) SUCCESS; [APK38048756318](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048756318) SUCCESS|[Standalone Pilot APK38050194765](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050194765) IN_PROGRESS; [CI38050194820](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050194820) SUCCESS|
|#385|dcda3bf76996f82b8c85c2bb2767581ef6d1d18b|a494e500346738e0469897ecc99ae67be71c38c7|78aea740b5e241e480b6d381945d60346b7b4101|c033a300eb7e51b383a07240cc5ec4eb07900b40 / dcda3bf76996f82b8c85c2bb2767581ef6d1d18b|[CI38049578933](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38049578933) SUCCESS; APK N/A por paths e mobile inalterado|[CI38050198899](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050198899) SUCCESS|
|#386|0ee492ee69e0e97ab501116181df4726495e62bf|caa275aadbb118d37696f5609c3ebe17cd4e5856|87b6c25b186660025eb5e408240ce9d66fbae160|a494e500346738e0469897ecc99ae67be71c38c7 / 0ee492ee69e0e97ab501116181df4726495e62bf|[CI38049903423](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38049903423) SUCCESS; APK N/A por paths e mobile inalterado|[CI38050204302](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050204302) SUCCESS|

Own APK #383: job114202904683, 2026-10-10T11:54:43.4161082Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; artefato ZIP11669076498 sha256:b7f47b2e97ea626a42fa37053f5fa84b8331474a7cfecd04c15347b39da6fac8, head exato e não-expiração conferidos; smoke/upload success. Digest é do ZIP, não hash do APK individual.

Own APK #384: job114203460850, 2026-10-10T11:50:10.5514199Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; artefato ZIP11669330803 sha256:6aa3df4dff966893ba0d521e1a39a839e5a31fe5ff7e35b8408d56862274fcdf, head exato e não-expiração conferidos; smoke/upload success. Digest é do ZIP, não hash do APK individual.

Pós-CI #383 job114207589116:234mobile/39API/4Web/3CLI; #384 job114207602709:238mobile/39API/4Web/3CLI; #385 job114207614804:238mobile/47API/4Web/3CLI + suporte HTTP PASS2026-10-10T11:58:38.6370356Z. #386 job114207631004:238mobile/68API/4Web/3CLI + suporte HTTP PASS2026-10-10T11:58:45.3278831Z. Typecheck/build/export/tests/migration/privacy/HTTP todos success no SHA do merge, logs conferidos. Os21testes antesomitidos executaram no próprio CI386 e no pós-CI386, sem apagar falhas históricas. #385 CI inicial38049311501failure por fixture403 incorreta, corrigida401 no novo head, sem alterar política ou retryfake.

Mobile subtree ba685042c10bf42051738241601f7a2041498a7b preservada de #384 até #386; API/package e CI/scripts/docs não acionam standalone path filter. N/A não é PASS; pós-APK #38338050190228/job114207589083 e #38438050194765/job114207602549 ainda build/smoke pendentes no snapshot. Own smoke pré-merge não substitui conclusão pós-merge.

Pós #376 SHA847992ad32b078d0bdffe734510ba9113f7e6304: CI38047970793 SUCCESS, APK38047970768 tentativa2 SUCCESS, job114204577340, smoke2026-10-10T12:02:34.3682518Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; ZIP11669042479 sha256:a1d7b1f742157b649b52e9bc3c4761c4ec3b96239be964a8248245adbbed6ec6, head/não-expiração/upload conferidos. Falha tentativa1 e diagnóstico11668597419 mantidos; retry único recuperou infraestrutura, não prova visual física.

Pós #380 CI38048063306 SUCCESS, APK38048063298 tentativa2/job114206339606 smoke em execução; #381 CI38048068370 SUCCESS, APK38048068335 tentativa2/job114205251830 smoke em execução. Únicos retries já iniciados; não solicitar outro sem nova causa. Históricos/diagnóstico do primeiro fracasso no journal1150Z preservados. Pós #375/#377/#378/#379/#382 CI/APK SUCCESS com provas nos journals1129Z/1145Z/1150Z; não repetir merge/run. Execução/bloqueio parcial não fecha projeto.

## Limites e próxima ação

Esta fatia API/CI/scripts/docs exige próprio CI completo no novo head, diff remoto integral e árvore/base/main/merge-base frescas antes de merge. Confirmar mobile subtree inalterada e paths APK aplicáveis; nenhum PASS inventado nem SHA circular. Consultar PR/head/tree/run após publicar fix/governed-taxonomy-catalog baseada nesta main. Após gates integrar com lease, verificar pais/árvore/main e pós-CI. Merge não prova deploy público; não foram realizadas operações reais de conta, trabalho, suporte, dados pessoais, provider ou dinheiro.

Acompanhar pós-APKs pendentes e retries já em execução. Próximo item seguro comprovado a revalidar: perfil e disponibilidade confirmam identidade/foco ao receber resposta mas não conferem abort por prazo no resultado final; investigar ACK/JSON tardios e preservar rascunho/estado incerto de operação. Signup merece auditoria equivalente, sem reenvio automático de POST não idempotente. Canonical support journey/tenant choice exige confronto antes de nova UI; não inventar default tenant/política. Presença de backend/ausência de PR não comprova escopo integral.

Visual Truth completo do desenho original/dados/estados/cobertura em aparelho físico permanece OPEN. Piloto/device, pentest independente, providers/TRUST/PSP/FIN-RISK e WEB-ARCH separados. Nenhum dinheiro real, nova cobrança/infraestrutura/deploy pago autorizado. Rotina existente mantida até conclusão integral comprovada ou ordem explícita; não criar outra rotina, não alegar execução contínua em tempo real.


|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|DATA-TAXONOMY-ID-001|GOVERNED_TAXONOMY_CAPABILITIES_v1.76.md|Catálogo estático semid substituído por tabela ativa real;6locais +bashsyntax|Próprio CI/HTTPpendente|
|CI-API-DISCOVERY-001|38049903423/38050204302|68API efetivamenteexecutados own e main|SUCCESS|


## Verificação 2026-10-10 12:08 UTC — v1.77

Snapshot 2026-10-10 12:08 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), árvore29ee4cadb0a41ef7c89b8c08452d17691a66eeb3. PR387 ownhead0e45557096c025ef431c37d1f6983666b95f7962, CI38050684891/job114209015503 SUCCESS: todos os passos typecheck/build/export/tests/migration/privacy/HTTP aprovados;73API/238mobile/4Web/3CLI. HTTP catálogo/CRUD/isolation PASS2026-10-10T12:07:33.6125647Z, suporte PASS12:07:35.0650656Z. 15 conteúdos remotos byte a byte iguais ao revisado, diff integral inalterado e main/base/merge-base frescos, cleantrue, expectedhead e merge_method merge. Git merge tem árvore exata do head e pais caa275aadbb118d37696f5609c3ebe17cd4e5856 /0e45557096c025ef431c37d1f6983666b95f7962; main conferida. Pós-CI38050884981 em execução, APK N/A por path filter/mesma subtree mobileba685042c10bf42051738241601f7a2041498a7b. Não repetir merge; não alegar deploy público. v1.76/journal1206Z contém prova completa383–386 own/merge/postCI e correções históricas.

Pós #381 SHAac18ca03de7a5f09ff3a626a763fadb55e699074: CI38048068370 SUCCESS; APK38048068335 tentativa2 SUCCESS, job114205251830 smoke/uploadsuccess, DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false2026-10-10T12:06:04.6261351Z; ZIP11669042821 sha256:ca3cc88f76a14d18b70f959dd2f7ab691ee738e8150c0e61458280bae71bb537, head/não-expiração conferidos. Tentativa1failure/diagnóstico11668319473 mantidos, nenhum novo retry. Pós376retry2 já SUCCESS com prova no journal1206Z;375/377/378/379/382 pósCI/APK SUCCESS. Pós380CI38048063306 success/APK38048063298 tentativa2 ainda smoke em execução; pós383CI38050190209 success/APK38050190228 running e384CI38050194820 success/APK38050194765 running. Gates próprios383384 e CIs pós383–386 aprovados, mas esses APKs pós383384 não estão concluídos no snapshot.

Esta fatia mobile exige próprio CI E APK standalone/smoke/artefato no SHA exato. Publicar fix/profile-availability-response-deadline sobre main738073540f7ff6f9156b704a95c7a5616643307e e consultar PR/head/tree/runs reais após publicação; nenhum SHA futuro fictício. Revisar diff remoto integral/base/main/merge-base antes de integração, expectedhead, árvore/pais/main, depois pósCI/APK; não confundir build com smoke/aparelho físico. Gates ainda pendentes para esta alteração, nenhum merge autorizado sem aprovação dos gates aplicáveis.

Próxima ação segura em paralelo à validação: auditar criar-conta/signupAccount. Tela final verifica foco mas não prazo; POST criação é não idempotente, logo não aplicar ACK tardio nem retransmitir automaticamente. Revalidar fonte/testes e distinguir validação local sem POST de resultado incerto depois de envio; signin/signout têm semântica própria e não devem ser alterados por analogia. Suporte UI/tenant choice depende de confronto canônico; APIs existentes e ausência de issues não provam fechamento integral.

Visual Truth do desenho original/dados/estados/cobertura integral em aparelho físico OPEN. Pentest independente, piloto/device, providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Só mocks/localCI descartável; sem operações em contas reais, dados pessoais, dinheiro, novas cobranças ou infraestrutura/deploy pago. Bloqueio parcial/transiente/CIAPKrunning não encerra projeto; rotina existente permanece, sem outra automação/alegação24h.

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UX-PROFILE-AVAILABILITY-DEADLINE-001|PROFILE_AVAILABILITY_DEADLINE_v1.77.md|8regressões helpers reais;246mobile UTC/SP|LocalPASS; próprioCI/APKpendente|
|DATA-TAXONOMY-ID-001|38050684891/job114209015503/merge7380735|73API +HTTP catálogo/CRUD/isolation|OwnSUCCESS/integrado;post38050884981running|
|CI-ANDROID-POST-381-001|38048068335/ZIP11669042821|Tentativa2smoke/upload/head/digest conferidos|SUCCESS técnico;histórico1failure mantido|


## Verificação 2026-10-10 12:16 UTC — v1.78

Snapshot 2026-10-10 12:16 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), árvore29ee4cadb0a41ef7c89b8c08452d17691a66eeb3. README/Documento vigente/memória/checkpoint/main/PRs/gates atuais reconsultados. #351–#387 já integradas conforme histórico persistente; checkpoint remoto não deve fazer repetir operações antigas. #387 ownhead0e45557096c025ef431c37d1f6983666b95f7962 e merge738073540f7ff6f9156b704a95c7a5616643307e conferidos no journal1208Z. Pós-CI38050884981/job114209605292 SUCCESS todos os passos typecheck/build/export/tests/migration/privacy/HTTP,73API/238mobile/4Web/3CLI, catálogo CRUD/isolation PASS2026-10-10T12:11:05.1450848Z e suporte PASS12:11:06.5108388Z. APK N/A por pathfilter e mobile idêntica; merge não implica deploy público.

PR #388 base main, ownhead af42616736b1850d7549073d89cd5500dbe13880, árvore2e68d37bf946c6ce0e4127312f56e42f444611e3, pai738073540f7ff6f9156b704a95c7a5616643307e. CI38050976291/job114209868104 SUCCESS, todos passos;246mobile/73API/4Web/3CLI, catálogo HTTP PASS12:12:21.8176515Z e suporte12:12:23.0219396Z. 17arquivos remotos byte a byte iguais ao revisado, diff íntegro revisado. Own APK38050976276/job114209868114 build em execução; **não integrado** até próprio APK/smoke/upload/artefato e CI aprovados no headexato. GitHub mergeabletrue/unstable enquanto gate roda, não conflito demonstrado. Não retarget/merge criança antes do predecessor.

Pós #380 SHAe6c6554f9208d4243bc8f724fba4b8971d958a1d CI38048063306 SUCCESS/APK38048063298 tentativa2 SUCCESS, job114206339606, smoke2026-10-10T12:11:18.9692797Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false, ZIP11669487655 sha256:6547a7c85033dff12aa820e03aa6bfb835d61e76a3753649873bef126700df80. Build/smoke/upload/head/não-expiração conferidos; failure1diagnóstico11668792675 preservado, único retry recuperou infra.
Pós #383 SHA0d492408860ef0575e59974bf33eee19912a03e0 CI38050190209 SUCCESS/APK38050190228 SUCCESS, job114207589083, smoke2026-10-10T12:13:17.6674126Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false, ZIP11669617653 sha256:fd853d7b937c59c98d44c329503edf61f1d444d99b94c391bec4d920b3f9d1ad. Jobs/smoke/upload/head/não-expiração conferidos.
Pós #384 CI38050194820 SUCCESS/APK38050194765 running. Pós375/376/377/378/379/380/381/382/383 técnicosCI/APKsuccess, com provas nos journals anteriores1206Z/1208Z/este;376/380/381 históricosfailure1mantidos, retries2já concluídos **não repetir**. Pós385CI38050198899 e386CI38050204302 SUCCESS, APK N/A por paths. Digests citados são ZIPs de artefato, não APK individual; nenhum deles fecha Visual Truth físico.

Correção editorial verificada 2026-10-10 12:16 UTC: a coluna Own head da tabela383–386 em v1.76 serializava um objeto como [object Object]. Agora contém o SHA textual comprovado no segundo pai do objeto Git de cada merge. Árvores/pais/gates/fatos históricos não mudaram; snapshots de arquivo CHECKPOINT_ANTES permanecem originais. Heads corretos: #383 a8c2c106068f311a64e6a303bae03d6d323df8e2; #384 d2146ef4a84a025567d52af7cb2b506462e29836; #385 dcda3bf76996f82b8c85c2bb2767581ef6d1d18b; #386 0ee492ee69e0e97ab501116181df4726495e62bf. Não foi repetido qualquer merge.

## Próxima ação concreta

Publicar fix/signup-response-deadline sobre head próprio388af42616736b1850d7549073d89cd5500dbe13880, árvore-base2e68d37bf946c6ce0e4127312f56e42f444611e3, PRbasefix/profile-availability-response-deadline. Consultar head/tree/CI/APK reais após publicação. Integrar388 quando own CI/APK/gates aplicáveis aprovados no SHAexato e diff/main/base/merge-base frescos; verificar pais/árvore/main/pós. Só então retarget este filho main; se mergeable eventualfalse, reconsultar antes de declarar conflito; se real, reconciliar ancestral sem sobrescrever mudanças e revalidar novos gates. Não repetir merges antigos/retries concluídos.

A próxima falha independente foi demonstrada em fontes reais auditadas: Agenda e EmpresaInicio fazem final auth/foco após HTTP/JSON, mas não conferem prazo abortado antes de publicar dados prontos/ACK de check-in/check-out/avaliação/preferido. Revalidar helpers e contratos atuais e corrigir somente confirmação/carga de resposta expirada com testes efetivos, preservando tenant por trabalho, transições/enforcement/backend, geolocalização opcional, sem reenvio ou operações reais. Signout permanece semântica própria de limpeza local condicional. Presença de backend/ausência de issues não prova escopo completo.

Visual Truth desenho original/dados/estados/cobertura integral físico OPEN. Piloto/device, pentest independente, providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Sem contas reais/mensagens/suporte/assignments/PSP/dinheiro, nova cobrança ou infraestrutura/deploy pago. Somente fixtures mocks/API local descartável. Bloqueio parcial/falha transitória/CIAPKrunning não encerra projeto; rotina existente permanece, sem criar outra ou alegar execução24h.

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UX-SIGNUP-DEADLINE-001|SIGNUP_RESPONSE_DEADLINE_v1.78.md|9novas regressões;255mobile UTC/SP,handlers reais sem RN|LocalPASS;CI/APK próprios pendentes|
|DATA-TAXONOMY-ID-001|38050884981/job114209605292|73API+CRUD/isolationHTTP no merge387|Own e postSUCCESS|
|CI-ANDROID-POST-380-001|38048063298/ZIP11669487655|Tentativa2smoke/upload/head/digest comprovados|SUCCESS, histórico1failure preservado|
|CI-ANDROID-POST-383-001|38050190228/ZIP11669617653|Smoke/upload/head/digest no SHA pós-merge|SUCCESS técnico, físicoOPEN|


## Verificação 2026-10-10 12:24 UTC — v1.79

Snapshot 2026-10-10 12:24 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), árvore29ee4cadb0a41ef7c89b8c08452d17691a66eeb3. README/Documento vigente/memória/checkpoint/PRs/main/head/gates revalidados antes de agir. #387 pós-CI38050884981 SUCCESS/73API/238mobile/HTTP realfixture provado no journal1216Z; nenhum novo merge antes dos APKs próprios pendentes.

PR388 ownhead af42616736b1850d7549073d89cd5500dbe13880/tree2e68d37bf946c6ce0e4127312f56e42f444611e3/base main. OwnCI38050976291/job114209868104 SUCCESS/todos gates/246mobile73API4Web3CLI; ownAPK38050976276/job114209868114 buildpass, smoke **em execução**, não integrado.
PR389 ownhead71987cb7beebfba1f64a15a3dcbb6e00471fc6ea/tree66a2c6d64c39a10a0530fc927e582b743cfbf8e6/pai af42616736b1850d7549073d89cd5500dbe13880/basefix/profile-availability-response-deadline. OwnCI38051472605/job114211305932 SUCCESS todos passos,255mobile/73API/4Web/3CLI. HTTP catálogo/CRUD/isolation PASS2026-10-10T12:20:39.5007928Z e suporte PASS12:20:40.7203721Z. 16conteúdos remotos byte a byte iguais ao revisado e diff inteiro inalterado; ownAPK38051472614/job114211305922 build em execução, **não integrado**. Base só retarget main após388integrada.

Pós #384 SHA c033a300eb7e51b383a07240cc5ec4eb07900b40: CI38050194820 SUCCESS/APK38050194765 SUCCESS, job114207602549, smoke2026-10-10T12:16:06.1339324Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; ZIP11669785343 sha256:2e088c25edba0b624ac8dda10534e0b011140abf4864222b593d14f9deef0f17, head/não-expiração/job/smoke/upload conferidos. Pós375–384 CI/APK técnicos SUCCESS com provas nos journals anteriores1129Z/1145Z/1150Z/1206Z/1208Z/1216Z/este; históricos376/380/381failure1mantidos e retries2já recuperados, não repetir. Pós385/386/387 CI SUCCESS, APK N/A paths com mobile inalterado para essas fatias API/CI/docs. Digests são ZIPs, não hash individual do APK; nenhum fecha VisualTruth físico.

A correção editorial de own head v1.76 publicada em389 usa os SHAs reais dos segundos pais383–386; snapshots CHECKPOINT_ANTES originais preservados. Nenhum fato/gate/merge foi reescrito. Próprio SHA desta alteração é consultado depois de publicar, sem circularidade fictícia.

## Próxima ação concreta e retomada

Publicar fix/agenda-company-response-deadline sobre ownhead38971987cb7beebfba1f64a15a3dcbb6e00471fc6ea/tree-base66a2c6d64c39a10a0530fc927e582b743cfbf8e6, PRbasefix/signup-response-deadline. Consultar PR/head/tree/gates reais. Integrar388/389/este filho em ordem com próprio CI/APK/smoke/artefato aprovados no SHAexato, diff remoto integral revisto, fresh main/base/merge-base, expectedhead. Retarget só após predecessor; mergeable eventualfalse exige reconsulta e eventual conflito real exige reconciliação ancestral+novosgates, sem sobrescrever predecessores. Pós-merge verificar árvore/pais/main e novosCI/APK; não repetir operações já confirmadas nem considerar running conclusão/bloqueio definitivo.

Próximo confronto seguro de dados/estados, após preservar esta fatia: loadAgenda/company-dashboard aceitam strings vazias de IDs e datas não interpretáveis como ready no schema atual. Ler contratos/controllers efetivos antes de decidir validação de referência e campos, provar caso malformed/nulo/real em testes e manter nomes/valores reais, optionalnulls e unknown-status sem inventar política/IDs UUID para catálogo TEXT. Auditoria deadline também conferiu conversa/pagamentos/candidatos/equipes/substituições/planejamento/casos-seguranca/trabalhos: guardas de origem e aborto já existem nos pontos finais lidos; não criar alterações por analogia ou repetir tarefas.

Visual Truth desenho original/dados/estados/cobertura integral em aparelho físico OPEN. Pentest independente, piloto/device, providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Sem operações de contas/dados/assignments/mensagens/PSP/dinheiro reais, nova cobrança ou infraestrutura/deploy pago; somente fixtures locais. Manter rotina existente até conclusão integral comprovada/ordem explícita. Bloqueio parcial/transiente/CIAPKrunning/fim de rodada não encerra projeto; não criar outra rotina nem alegar24h contínuo.

|Evidence ID|Fonte|Fato|Estado|
|---|---|---|---|
|UX-OPERATIONS-DEADLINE-001|AGENDA_COMPANY_RESPONSE_DEADLINE_v1.79.md|13novas,268mobile UTC/SP,handlers reais finalauthdeadline|LocalPASS;próprioCI/APKpendente|
|UX-SIGNUP-DEADLINE-001|38051472605/job114211305932|255mobile/73API e HTTP gates reais|OwnCI SUCCESS,ownAPKrunning|
|CI-ANDROID-POST-384-001|38050194765/ZIP11669785343|Smoke/upload/head/digest comprovados no merge|SUCCESS técnico,físicoOPEN|


## UX-ASSIGNMENT-SCHEMA — v1.80

Fonte: ASSIGNMENT_RESPONSE_SCHEMA_v1.80.md e ../conversas/EXECUCAO_VERIFICADA_2026-10-10_1235Z.md. Antes da correção, execução dos helpers reais da base390 aceitava como ready assignment com id vazio, tenantId válido e startsAt bad-date, e painel ativo com id/professionalId vazios. Contratos efetivos work-assignments.controller.ts e company-dashboard.controller.ts foram lidos: IDs/referências e título/nome reais são obrigatórios, timestamps são datas PostgreSQL ou null; não há autorização para inventar valores. loadAgenda e loadCompanyDashboard agora exigem strings não vazias nos campos obrigatórios e datas opcionais interpretáveis. Registros/arrays incompatíveis resultam error, nunca contexto acionável ready. Painel conserva falha por seção e seções válidas independentes enquanto vigente.

Não normaliza valores/IDs, impõe UUID/enum novo, ordem/duração temporal, política financeira ou limites arbitrários. IDs opacos não vazios e status futuro não vazio permanecem literais; assignmentState mantém ausência de ação para status desconhecido. Optionalnulls/ausência, contagens0, listas vazias, offsets de data e rating/pagamento existentes preservados. Guardas de prazo da390 permanecem. Sem alteração JSX/StyleSheet/backend/lifecycle/RLS/React19.1.4/RN0.81.6/lockfile.

Sete regressões novas (3Agenda+4Painel) exercitam referência/campo vazio, resposta estrutural inválida, datas inválidas e controles positivos opacos/futuros/null/offset. Suíte completa275/275 PASS em UTC e America/Sao_Paulo, incluindo handlers reais pré-JSX das fatias anteriores;268anteriores+7novas. Execução local de helpers/handlers não equivale a renderização RN/aparelho físico. Próprios CI/typecheck/build/export e APK/smoke/upload/artefato no novoSHA ainda obrigatórios antes de integrar. Apenas mocks, nenhum assignment/perfil/rating/operação real.

Snapshot 2026-10-10 12:35 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), árvore29ee4cadb0a41ef7c89b8c08452d17691a66eeb3. README→Documento vigente, memória e checkpoint foram relidos na main em12:13UTC; main/PRs/gates reconsultados em12:35UTC. Não repetir #351–#387 já integradas.

PR388 base main/head af42616736b1850d7549073d89cd5500dbe13880/tree2e68d37bf946c6ce0e4127312f56e42f444611e3: CI38050976291 SUCCESS/246mobile73API4Web3CLI. APK38050976276 tentativa1/job114209868114 buildPASS, smokeFAIL antes do script instalar/abrir app: boot confirmou1, ação do emulador executou shell input keyevent82, service input Broken pipe32/exit224 em2026-10-10T12:28:31.1764888Z. Sem DEVICE_SMOKE_OK, upload APK validado skipped. DiagnósticoZIP11669444402/digest sha256:4863fd6450d5217c52b9fcb7dc9c70e1a6a87efbb782984c48ddd3e532360fa4/headexato/não-expirado consultados; não equivale a prova do app. Um único retry do job solicitado e aceito em12:35UTC após ler o log inteiro; acompanhar tentativa2, não repetir automaticamente. Não integrar sem gates aprovados.

PR389 basefix/profile-availability-response-deadline/head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea/tree66a2c6d64c39a10a0530fc927e582b743cfbf8e6: CI38051472605 SUCCESS/255mobile73API4Web3CLI; APK38051472614 em execução. PR390 basefix/signup-response-deadline/head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/tree0bb6dd39f035d4b62d674841166485fcf027c4c0: CI38051941067/job114212662753 SUCCESS, todos passos typecheck/build/export/tests/migration/privacy/HTTP;268mobile73API4Web3CLI, catálogoHTTP PASS12:28:19.7488628Z e suportePASS12:28:20.9895905Z. APK38051941014 em execução. Nenhuma destas PRs integrada neste snapshot. Retarget só depois do predecessor.

Reconsulta histórica pós-merge em12:26UTC confirma workflow CI/APK completed/success nos SHAs exatos:351 e80e8948f5d1ad58eac4f9d59224e914a4b8d057 →38023431415/38023431441(tentativa1);352 507b046b3e337d535d1374da26600361838837b6 →38023533303/38023533358(tentativa1);353 9a06da504b8b4fbf1c51f39ab6870aa5f23c1a47 →38023554710/38023554678(tentativa2);354 3b7328473ac0108cd1a2af1e517163b42e932c00 →38023574425/38023574399(tentativa1);355 6f8bea84a8fbb61f91a3ef057b9b9c75b75caa85 →38023598557/38023598566(tentativa2). Esta reconsulta prova status/head dos workflows, não nova inspeção de aparelhos, logs/artefatos históricos. Não refazer merges/retries antigos. Pós375–384 CI/APK técnicos SUCCESS com logs/smoke/artefatos preservados nos journals; pós385/386/387CI SUCCESS e APK N/A por paths/mobiletree inalterada. #387 pósCI38050884981/73API238mobile provado no journal1216Z. Merge não significa deploy público.
