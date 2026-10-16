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


## API-PROFILE-INPUT — v1.81

Fonte PROFILE_INPUT_VALIDATION_v1.81.md e ../conversas/EXECUCAO_VERIFICADA_2026-10-10_1240Z.md. PUT /professional-profile chamava trim em campos não validados e lançava Error genérico para displayName vazio. Execução do método real da base391 com auth/db simulados confirmou Error display_name_required para vazio e TypeError para displayName/homeCity numéricos, zero queries; isso não é BadRequestException e o tratamento padrão Nest classifica como falha de servidor. professionalProfileInput agora recebe unknown, exige objeto não array e nome string não vazio; opcionais homeCity/primaryRole são string/null/ausentes. Preserva trim, branco→null nos opcionais, identidade exclusivamente autenticada e query/retorno reais. Controller autentica primeiro e rejeita entrada inválida com BadRequestException('professional_profile_invalid')400 antes de qualquer escrita. Falha real do banco propaga, nunca é mascarada como validação.

Não acrescenta tamanho máximo arbitrário, enum de função, campo/propriedade de tenant, decisão de KYC ou mudança de schema/RLS. Campos extras não impõem id/identityId; mesma chave ON CONFLICT(identity_id), mesma fonte auth e GET. Validação rejeita tipos inválidos em vez de coerção.

8regressões novas:4helper e4controller (400/zeroquery,401antesdevalidar, identidade/trim/null/ACK, falhaDBpropagada). PASS8/8 local com transformação TypeScript e adaptador explícito de decorators/exceptions Nest; não é execução Nest completa nem HTTP/DB. Primeiras execuções do adaptador local falharam por escape de regex/export de stub e foram corrigidas, sem mudar expectativas/testes/produto; só a execução posterior8/8 é prova local. CI compila e executa os próprios testes com Nest real:81API esperado (73anteriores+8), confirmação só após run sucesso/log no próprioSHA. Novo fixture HTTP restrito a localhost e DB efêmero de CI cria2identidades, verifica400malformed/semcriaçãooualteração,401sem auth antes de validar, trim/null, atualização mesmoID e isolamento identidade; registrado no step HTTP do CI. bash -n PASS; HTTP local ainda não executado neste ambiente sem Nest/PostgreSQL instalados. Nenhum perfil/conta/dado real alterado.

Fatias apps/api/src + scriptHTTP + CI/docs apenas. APK próprio N/A pelo pathfilter efetivo standalone-pilot-apk.yml: nada em apps/mobile/**, build/smoke/workflowAPK/rootpackage/lockfile/workspace. Árvore mobile deve continuar byteidêntica à base391 e APK do predecessor391 continua obrigatório/pendente; N/A não é APK aprovado. React19.1.4/RN0.81.6/lockfile/backendtenant/RLS preservados.

Snapshot 2026-10-10 12:40 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76) permanece. Autoridade README→Documento/memória/checkpoint relida e main/PR391/gates/head/tree reconsultados. Sem repetir #351–#387, pós-merge e artefatos históricos preservados emjournalsanteriores.

PR388 head af42616736b1850d7549073d89cd5500dbe13880, base main, CI38050976291 SUCCESS; APK38050976276 tentativa2 em execução após único retry autorizado do job114209868114 por falha input Broken pipe/exit224 anterior à instalação/app; tentativa1diagnóstico11669444402/digest sha256:4863fd6450d5217c52b9fcb7dc9c70e1a6a87efbb782984c48ddd3e532360fa4 preservado no journal1235Z. Não repetir retry automaticamente nem aceitar build isolado.

PR389 head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea, basefix/profile-availability-response-deadline, CI38051472605 SUCCESS/255mobile73API; APK38051472614/job114211305922 smoke em execução. PR390 head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65, basefix/signup-response-deadline, CI38051941067 SUCCESS/268mobile73API; APK38051941014/job114212662952 smoke em execução. PR391 head d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/treeef8bc3221d354d4cd544453df5b59fec4132df38/pai97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/basefix/agenda-company-response-deadline. CI38052634310/job114214702463 SUCCESS todos passos/typecheck/build/export/tests/migration/privacy/HTTP,275mobile73API4Web3CLI; catálogoHTTP PASS2026-10-10T12:39:41.8817755Z, suportePASS12:39:43.1976088Z, ProductionTruth12:39:48.9216490Z. APK38052634388 em execução. Os13arquivos remotos391 conferidos byte a byte e diff produto íntegro revisto. Nenhuma dessas PRs integrada neste snapshot.

Esta alteração tem próprioSHA/PR/runs somente após publicar; não registrar número antecipado nem CI futuro aprovado. Main238mobile é distinta dos275do head391; próprio API81 da nova fatia só será confirmado no seu run.


## Correção de teste e gates — 2026-10-10 12:44UTC

PR392 foi publicada no head35abdc0e8919288b44da1302f720cdb3a0727558/tree4e03f90e1421cbce0842452e50ef380d40950b95. CI38052927578/job114215554076 FAIL no Typecheck por TS2532 em27:50/126: acesso direto h.calls[0] no teste novo sem noUncheckedIndexedAccess narrowing. Build/tests/HTTP ficaram skipped; não considerar81API aprovado. Corrigido teste com const call=h.calls[0];assert.ok(call) antes dos asserts de identidade/query, sem non-null assertion/coerção nem mudança de expectativa ou produto. Oito testes locais novamente PASS e bash-n PASS. Falha histórica preservada; novo commit exige próprioCI, não retry do SHA errado. Próximohead/tree são consultados após publicação. API-onlyAPK N/A e mobiletree01ebadd68b56c3239bde95db27a690a3cc0f6875 conferida igual à391.15conteúdos remotos do primeirohead byteidênticos; novohead/diff devem ser revalidados.

Own APK39038051941014/job114212662952 SUCCESS, smoke2026-10-10T12:41:29.7434409Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false. Upload ZIP11670101921/digest sha256:371e9ed0f8043b9edc6712cda08afa74c264a2779d40b3b483f04ba268633bfa/head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/não-expirado/jobsteps conferidos. CI390 SUCCESS próprio, ainda não integrada por388/389predecessoras. APK388retry2/389/391 seguem em execução na última consulta. Não fecha VisualTruth físico nem autoriza merge de antecessor pendente.


## MOB-PASSPORT-HISTORY — v1.82

Fonte PASSPORT_VERIFIED_HISTORY_v1.82.md e ../conversas/EXECUCAO_VERIFICADA_2026-10-10_1246Z.md. Documento normativo v1.5§10 exige experiência/histórico verificável no Work Passport. Endpoint /work-passport/mine já devolve verifiedHistory global das memberships profissionais, ordenado no servidor e limitado aos50registros mais recentes. A área Experiência profissional de perfil.tsx mostrava somente completedWorkCount. Agora exibe os registros reais fornecidos: título, local quando existente e data de conclusão em pt-BR/no fuso do aparelho. Fonte única da API, sem fabricar empresa/função/horas/pagamento ou gerar entradas a partir da contagem. MesmosIDs de assignment em tenants distintos possuem keycomposta tenantId+id; IDs internos não aparecem na UI. Não há novas ações/mutações/rotas.

Tipo Passport passa a incluir verifiedHistory opcional para compatibilidade de respostas resumidas; quando presente exige array de registros com id/tenantId/título não vazios, localização string/null e data interpretável/null. Nome mostrado no passaporte também exige string não vazia. Dados inválidos resultam erro, não histórico pronto/vazio. Ausência do detalhe é estado unavailable explícito; lista vazia comprovada é empty, perfil inexistente missing, loading/erro existentes mantidos. Contagem global pode exceder o detalhe recente e continua literal; não reduzir nem inferir contagem0 a partir da lista. Datas/locais ausentes têm mensagens explícitas, sem valores inventados. Guardas foco/sessão/prazo das versões anteriores preservadas.

5novas regressões:2loadWorkPassport (malformed/dados multiempresa/opaque/null/offset preservados),3passportHistory/completionDate (todos estados, ordem/contagemsemexpansão, data local/ausência). Suite mobile completa280/280 PASSUTC e America/Sao_Paulo,275anteriores+5. StyleSheet/perfil byteidêntico; hierarquia do painel existente e barra canônica permanecem. Alteração de conteúdo precisa próprioCI/typecheck/build/export/APK/smoke no SHAexato e validação física. Referência original PNG foi relida visualmente nesta rodada: não cobre detalhamento dessa área extra; não inferir fechamento físico/fidelidade total. Nenhuma captura RN/aparelho foi obtida. Sem alterações backend/tenant/RLS/deps/React19.1.4/RN0.81.6/lockfile e sem perfil/assignment/rating reais.

Snapshot 2026-10-10 12:46UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76) revalidada; README/Documento vigente/memória/checkpoint do mesmoSHA já lidos. OpenPRs388–392 enumeradas, base/head/runs confrontados. Não repetir351–387merges nem retries históricos recuperados.

PR388 head af42616736b1850d7549073d89cd5500dbe13880/base main: CI38050976291 SUCCESS; APK38050976276 tentativa2/job114214397242 smoke em execução, buildPASS. Falha1input Broken pipe anterior aoapp/job114209868114/diagnóstico11669444402 e único retry permanecem no journal1235Z. PR389 head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea/basefix/profile-availability-response-deadline: CI38051472605 SUCCESS, ownAPK38051472614/job114211305922 SUCCESS todos passos, smoke2026-10-10T12:43:49.3543960Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false. Upload ZIP11670726043/digest sha256:e900ee4c656428fca988278e291782482a2e00b5e50dedcfae8308f8d05ddcc3/headexato/não-expiração/jobsteps conferidos. PR390 head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/basefix/signup-response-deadline: ownCI38051941067 eAPK38051941014 SUCCESS, smoke/upload/artefato11670101921 provados no journal1240Z. PR391 head d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/basefix/agenda-company-response-deadline: CI38052634310 SUCCESS275mobile73API, APK38052634388 em execução. Nenhuma dessas PRs integrada até este snapshot;388precede a cadeia, não aceitar gate de outroSHA.

PR392 basefix/assignment-response-schema: primeiro head35abdc0e8919288b44da1302f720cdb3a0727558 CI38052927578 FAILTS2532 histórico. Correção estrita guardando call no teste publicada no head35119ff2da17f3b71876ebd48f3f93cf9a5a1ed8/treebaf1d92ab9185e6b34eae0dffb9540f97e8791c0/pai35abdc0e8919288b44da1302f720cdb3a0727558. OwnCI38053028411/job114215844372 SUCCESS todos passos,81API275mobile4Web3CLI; novoHTTP perfil/Nest/DB local PASS2026-10-10T12:45:27.3421765Z (400semwrites/authprimeiro/trim/null/isolamento), catálogo12:45:27.8413178Z, suporte12:45:28.6822392Z, ProductionTruth12:45:32.5587659Z. APK próprio N/A por paths e árvore mobile01ebadd68b56c3239bde95db27a690a3cc0f6875 idêntica à391; não equivale aoAPKpendente391. Novohead392 exige nova conferência remota de arquivos/diff antes do merge. Nenhummerge/deploy público presumido.


## UX-HOME-SCHEMA — v1.83

Fonte HOME_RESPONSE_SCHEMA_v1.83.md e ../conversas/EXECUCAO_VERIFICADA_2026-10-10_1249Z.md. profissional-inicio.tsx já consome APIs reais, usa runForSession com foco/deadline/identidade e oferece loading/erro/retry/vazio. Auditoria do código confirmou estas guardas finais; não refazê-las por analogia. Porém professional-home.ts aceitava IDs/títulos/status vazios, timestamps ilegíveis em assignments/earnings e disponibilidade invertida/igual como ready. Cálculos filtravam essas entradas e podiam mostrar0trabalhos/ganhos ou pedir cadastro de disponibilidade em vez de erro factual. home-cards.ts também aceitava oportunidades com referência vazia/datas inválidas.

Helpers agora validam strings obrigatórias não vazias e datas interpretáveis antes de ready; earnings createdAt é obrigatório, optionalstartsAt/endsAt de assignment/oportunidade permanecem null/ausentes. Disponibilidade exige duas datas interpretáveis e ends>starts, a mesma regra efetiva já usada por availability.controller.ts; não cria regra nova. Nome fornecido não pode ser branco/tipo inválido; ausência/null legados continuam compatíveis e nome válido é preservado literal. Falha permanece por seção, resultados válidos independentes preservados. Zero/listas vazias legítimas, IDs opacos, status futuros não vazios, centavos assinados existentes e optionalnulls/offsets permanecem sem normalização. Não há enum, regra financeira, horário/local/distância/contagem inventada ou alteração da UI/StyleSheet/backend/tenant/RLS/deps/React19.1.4/RN0.81.6/lockfile.

6regressões novas no fluxo real dos loaders (5home+1cards) comprovam malformedassignment não pronta/zero, earningsdate/status não zero, availability inválida não vazio, nome branco, controlepositivo real/opaque/future/null/offset/cents e sucesso parcial Passport/opportunity. Suíte mobile completa286/286 PASSUTC e America/Sao_Paulo;280anteriores+6novas. Campos/calculadores válidos existentes sem mudança. CI/typecheck/build/export e APK standalone/smoke/artefato próprios ainda obrigatórios no novoSHA; prova local não é renderização física.

Snapshot 2026-10-10 12:49UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), código/contratos atuais auditados no head393; README/Documento vigente/memória/checkpoint já lidos no mesmoSHA main. #351–#387 integradas/histórico pós-merge preservado; não repetir operações antigas.

PR388 ownhead af42616736b1850d7549073d89cd5500dbe13880/base main/CI38050976291 SUCCESS; APK38050976276 tentativa2/job114214397242 smoke em execução/buildPASS. Falha1infra e único retry mantidos no journal1235Z. PR389 ownhead71987cb7beebfba1f64a15a3dcbb6e00471fc6ea/basefix/profile-availability-response-deadline: CI38051472605/APK38051472614 SUCCESS, smoke/artefato11670726043/head/digest conferidos no journal1246Z. PR390 ownhead97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/basefix/signup-response-deadline: CI38051941067/APK38051941014 SUCCESS, smoke/artefato11670101921 no journal1240Z. PR391 ownhead d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/basefix/agenda-company-response-deadline: CI38052634310 SUCCESS275mobile73API, APK38052634388 em execução. PR392 ownhead35119ff2da17f3b71876ebd48f3f93cf9a5a1ed8/basefix/assignment-response-schema: CI38053028411 SUCCESS81API275mobile/HTTPperfil PASS12:45:27.3421765Z; APK N/A mobiletreeidêntica39101ebadd68b56c3239bde95db27a690a3cc0f6875. Correção8conteúdos remotos conferidos byte a byte/diffintegral revisado; falhaTS2532nohead35ab... CI38052927578 histórica preservada, não retry.

PR393 ownhead27144fbfa6fb9e7ce114b831d0f668e110b8af2d/tree6225d322e06bd10eaa3cef80a5b5e942c3388bfc/pai35119ff2da17f3b71876ebd48f3f93cf9a5a1ed8/basefix/profile-input-validation: CI38053297959 eAPK38053298010 em execução.14arquivos remotos byte a byte iguais e diff produto integral revisado.280local é dohead393, main ainda238mobile/73API. Nenhuma dessas PRs integrada neste snapshot; não usar gate de descendente para predecessor pendente. Próprio head/PR/gates desta nova fatia serão consultados depois de publicar, sem gate/número/SHA futuro inventado.


## API-AVAILABILITY-INPUT — v1.84

Fonte AVAILABILITY_INPUT_VALIDATION_v1.84.md e ../conversas/EXECUCAO_VERIFICADA_2026-10-10_1257Z.md. Durante o confronto da home com contratos reais, AvailabilityController.add recebeu body tipado em TypeScript sem validação de tipo runtime. Execução do método real com auth/db simulados provou body null→TypeError zeroqueries, e startsAt42/endsAt43→parâmetros numéricos encaminhados ao INSERT após Date coerção epoch. Essa entrada não satisfaz o contrato timestamps string e pode resultar falha de banco, jamais disponibilidade factual.

availabilityInput recebe unknown, exige objeto não array e duas strings de datas interpretáveis com ends>starts. Preserva valores/offsets originais; sem formato/limite novo nem regra future-only/duração imposta. Controller autentica antes de validar e responde BadRequestException('availability_range_invalid')400 antes de consultar perfil ou escrever. Perfil inexistente conserva professional_profile_required400; fonte identity→profile exclusiva da sessão, INSERT ON CONFLICT(professional_id,starts_at,ends_at) idempotente e GET/network-shared existentes inalterados. Bodyextra professionalId/tenantId ignorado, não sobrescreve contexto.

7novas regressões (4helper+3controller) PASS7/7local via adaptador explícito TypeScript/decorators/exceptions Nest; controller verifica400semquery,401primeiro, binding/timestamps/ACK/ONCONFLICT e perfil ausente. Não é Nest/DB completo local. Novo fixture HTTP sólocalhost/DBefêmeroCI cria2identidades/perfis, verifica null/array/tipos/datas/range invalidos400semjanelas,401primeiro, criação com valoresreais, segunda criação mesmointervalo retorna mesmoid e outraidentidade não vê janela. bash-nPASS; HTTP/Nest/DB próprios pendentesCI. Próprio88API esperado (81anteriores+7), só confirmado após run/log sucesso no próprioSHA. Nenhum dado/perfil/disponibilidade real alterado.

Mudança API/helper/tests/scriptHTTP/CI/docs apenas. APK próprio N/A pelos paths do workflow e mobiletree deve permanecer idêntica à394; não isenta APK394 nem implica APK aprovado deste código mobile herdado. React19.1.4/RN0.81.6/lockfile/tenant/RLS preservados.

Snapshot 2026-10-10 12:57UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76) na última leitura, openPRs388–394 e próprioshead/gates atuais consultados. README/Documento vigente/memória/checkpoint do mesmoSHA main já lidos. Nenhum merge dessas fatias presumido;351–387 integradas, não repetir.

PR388 head af42616736b1850d7549073d89cd5500dbe13880/base main: CI38050976291 SUCCESS; APK38050976276 tentativa2/job114214397242 smoke em execução/buildPASS. Único retry/failure1infra/diagnóstico11669444402 preservados. PR389 head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea: CI38051472605/APK38051472614 SUCCESS comprovados journal1246Z. PR390 head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65: CI38051941067/APK38051941014 SUCCESS comprovados journal1240Z. PR391 head d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/basefix/agenda-company-response-deadline: CI38052634310 SUCCESS275mobile73API; APK38052634388/job114214702747 SUCCESStodossteps, smoke2026-10-10T12:56:48.0086495Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false. Upload ZIP11670128045/digest sha256:4b74abf0e0d38a83bb0bb97c1d19ec67250cd500f7746ba658df99792e64327e/headexato/não-expirado/job/smoke conferidos.

PR392 head35119ff2da17f3b71876ebd48f3f93cf9a5a1ed8: CI38053028411 SUCCESS81API275mobile/HTTPperfil PASS; APK N/Apaths/mobileigual391; failureTS2532primeirohead35ab... preservada. PR393 head27144fbfa6fb9e7ce114b831d0f668e110b8af2d/basefix/profile-input-validation: CI38053297959/job114216620344 SUCCESS todos passos/280mobile81API4Web3CLI, HTTPperfil12:50:13.1965235Z/ProductionTruth12:50:20.0086110Z; APK38053298010 em execução. PR394 head6ea665db2c88e878a6fa967d6b2188a3f0b246da/treefe5dd9dd1cd2a108809348d9645f2486efafd375/pai27144fbfa6fb9e7ce114b831d0f668e110b8af2d/basefix/passport-verified-history: CI38053532122/job114217293216 SUCCESS todos passos/286mobile81API4Web3CLI, HTTPperfil12:54:08.2313050Z/ProductionTruth12:54:15.6382306Z; APK38053532125 em execução.13conteúdos394 byte a byte iguais ao revisto, diff produto integral revisado. Main continua238mobile/73API neste snapshot.

Issues215/219/220/224/228 continuam abertas com gates específicos: provider comercial/sandbox, pentest/aparelho físico/distribuição, aceitaçãoWeb. Ausência dePR não prova conclusão e esses gates externos não impedem as correções independentes atuais. Dados próprios desta novafatiasódepoispublicar.

Reconsulta histórica pós-merge351–355 em12:54UTC: CI/jobsteps SUCCESS nos SHAs exatos e APK/jobsteps/artifactheads/digests/não-expiração conferidos. Logs mostram instalação Success, PID/script e markerobservado, não apenas echo do comando; workflows antigos usam gate legado anterior ao endurecimento375, e estes logs não equivalem a novo teste com script atual nem cobertura física.
|PR|SHAmerge|CI/job|APK/job|Smoke observadoUTC|ZIP/digestsha256|
|---|---|---|---|---|---|
|351|e80e8948f5d1ad58eac4f9d59224e914a4b8d057|38023431415/114129121666|38023431441/114129121945|04:30:51.3146792|11659572193/0d611e53be073b097d417d5d70a98f021223d75d3ce2a64a4312edc4e8413619|
|352|507b046b3e337d535d1374da26600361838837b6|38023533303/114129433215|38023533358/114129433663|04:32:10.0793530|11659386713/e31a2799cb5313f80a1feaf7be66bbe1ac9581f26629a1503d0fb01211244251|
|353|9a06da504b8b4fbf1c51f39ab6870aa5f23c1a47|38023554710/114129497907|38023554678attempt2/114150020296|06:41:54.0917019|11662710348/ac906249b4c3b4ca034699420500bd98202019d4b0b14a938eb5d13308834c5b|
|354|3b7328473ac0108cd1a2af1e517163b42e932c00|38023574425/114129559271|38023574399/114129559267|04:40:36.0348540|11659057552/a812eeba3844095d96ba607d015d51bf418a06df6a4977ffef9b5645b63d7c64|
|355|6f8bea84a8fbb61f91a3ef057b9b9c75b75caa85|38023598557/114129633716|38023598566attempt2/114149969814|06:31:17.8143751|11661758941/8230509f7451e9308e47b0546d92c101756e67366ebf2bf5539fcf8b84f2187b|

Digests ZIP, não APK individual. Não refazer antigosmerges/retries históricos; revalidar o produto integrado com gates atuais e manter VisualTruth aberto.


## v1.85 — suporte e integração388–395 /2026-10-10 17:17UTC

[Suporteconsulta](PROFESSIONAL_SUPPORT_HISTORY_v1.85.md), [integrações/gates pós](INTEGRACAO_388_395_2026-10-10_1717Z.md), journal1717Z; requisitos v1.85. Snapshot2026-10-10 17:17UTC: main9ed1859... v1.84 revalidada, README/Documento/memória/checkpoint lidos. PRs388–395 integradas e CI pós-merge de todas SUCCESS; APK pós389–391/393/394 SUCCESS comsmoke/artefato, pós388falhainfra/únicoretry solicitado. Prova detalhada docs/evidencias/INTEGRACAO_388_395_2026-10-10_1717Z.md. Não repetir integrações.



## Correção de typecheck — 2026-10-10 17:24UTC

PR396 publicada no headbe08d499f4ac4c199e8f57bdf6afc151b4d935ed/treea28afa107f7d64e6e439f86bdb0275aa1d5d2c8a. CI38071227829/job114268875794 FAIL no Typecheck: TS18048 work.data possivelmente undefined no JSX, devido Section unir loading|error no mesmo membro. Build/export/tests/HTTP ficaram skipped; não tratar CI aprovado. Corrigida projeção const items=work.status==='ready'?work.data:[] para render da lista, mantendo mensagens loading/erro e ausência apenas na ramificação legítima. Sem non-null assertion, coerção, relaxamento TS, alteração de testes/expectativas/estados, dependências ou API. Própriohead/CI/APK novos exigidos após publicar; APK38071227890 do primeirohead não autoriza merge do corrigido. Testes locais298mobile continuam válidos após nova execução; compilação completa requer CI real.


## v1.86 — idempotência de suporte /2026-10-10 17:26UTC

[SUPPORT_INTENT_IDEMPOTENCY_v1.86.md](SUPPORT_INTENT_IDEMPOTENCY_v1.86.md), requisitosv1.86/journal1726Z. 10novasregressões/18suportelocalPASS;CI98API/Nest/SQL/HTTPpendente;APKownN/Apaths/mobileidêntico396a conferir;envioUI/VisualTruthOPEN.

Snapshot2026-10-10 17:26UTC: main9ed1859ee28b1ba50e84bda0d4357d22760a59f3/v1.84 permanece;README→Documento/memória/checkpoint consultados. PR396base main/head26b3fb2365200415366e12da76710a0ad629725b/tree87ac6719b538d92a2b1843e9954cee80de0aece4, próprioCI38071421868/job114269432957SUCCESStodossteps/298mobile88API4Web3CLI. PróprioAPK38071421849 em execução; primeiroheadbe08.../CI38071227829TS18048FAILpreservado, corrigido readyprojection semafrouxartestes/TS.15conteúdos remotos corrigidos396byteidênticos e patch íntegro revisado.396nãointegrada até snapshot.

388–395jáintegradas, CI pós de todas e APKpós389–391/393/394SUCCESScomjobs/smoke/artefatos/digests no journal1717Z/v1.85. Pós388run38054154641tentativa1infraBrokenpipe32/exit224antesapp, diagnósticoZIP11671065789/digest78996502e4e43543f065ec334594068669c0dc7a7acc523b33aa780681f250bd. Único retry do job114219065904pedido17:17:11UTC, tentativa2emexecução; não repetir. Pré-merge388retryhistórico recuperado é distinto, não refazer. Não repetirmerges351–395.



## 2026-10-10 — preparação da tentativa de suporte v1.87

Verificação de 2026-10-10, 17:33 UTC: main permanece em 9ed1859ee28b1ba50e84bda0d4357d22760a59f3 (v1.84).
PR #396: head 26b3fb2365200415366e12da76710a0ad629725b, tree 87ac6719b538d92a2b1843e9954cee80de0aece4, base main. CI 38071421868 / job 114269432957 aprovado (298 mobile, 88 API, 4 web, 3 CLI). APK próprio 38071421849 / job 114269432897 ainda executa o teste de instalação e abertura sem Metro; não integrado.
PR #397: head be12cb6905234a081472971a8e37e5cbdc98d9cf, tree d57bfbb2cfb11ace871e0c3ef4c9a41ac6088763, base fix/professional-support-history. CI 38071852247 / job 114270695562 aprovado em todos os passos: 298 mobile, 98 API, 4 web, 3 CLI, migrations e HTTP/PostgreSQL, inclusive oito primeiros envios concorrentes, conflito de payload e guards SQL. APK próprio não aplicável: paths e árvore mobile 163de7d27fe6b49fb11d87ed9a9da2bf8b9e47e7 idênticos à #396; isso não dispensa o APK do predecessor.
388–395 já integradas; não repetir merges. Retry controlado único do APK pós-merge #388, run 38054154641, tentativa 2 / job 114268524350, ainda em teste de dispositivo. Retry pedido em 17:17:11 UTC após falha de infraestrutura anterior à instalação; não solicitar nova repetição automática. Evidências dos outros pós-merges e dos gates históricos estão no registro 1717Z/v1.85.

Evidência SUPPORT_INTENT_PREPARATION_v1.87.md: randomUUID no servidor após auth/membership/assignment, sem criar chamado; 7 regressões novas e fixture de contagem zero. PASS local 25/25 suporte e bash -n; CI próprio/105 API pendente. UI e storage durável continuam abertos. Journal 1733Z e checkpoint preservam gates e retomada.


## 2026-10-10 — persistência da tentativa de suporte v1.88

Verificação de 2026-10-10, 17:42 UTC: main 60759a41bfb6a90aed80d85045b9ec837c50a3ad, tree f222de6ba92646e70d3aa99b5bcd513097768d5f, Documento da Verdade v1.87. #396, #397 e #398 integradas nesta etapa, em ordem, após retarget main, diff idêntico ao revisado e gates próprios no SHA exato. mergeable false imediato no retarget foi reconsultado e tornou-se true; não houve conflito real nem overwrite.

| PR | Head aprovado | Merge real | Gates próprios |
|---|---|---|---|
| #396 | 26b3fb2365200415366e12da76710a0ad629725b | 56922ded75cb1cb4d8b7fb101cb0659832379db9 | CI38071421868/job114269432957:298 mobile/88API/4web/3CLI; APK38071421849/job114269432897 aprovado |
| #397 | be12cb6905234a081472971a8e37e5cbdc98d9cf | 377a5e0e708a6d93d2c84c3323f16121a14e43d5 | CI38071852247/job114270695562:298mobile/98API/4web/3CLI, migrations/HTTP concorrente/SQL; APK próprio N/A |
| #398 | f1f7b2119c3522086a36096007c8f21e2e74bd78 | 60759a41bfb6a90aed80d85045b9ec837c50a3ad | CI38072354467/job114272206876:298mobile/105API/4web/3CLI, migrations/HTTPpreparação+concorrência; APK próprio N/A |

APK próprio #396: instalação Success em 17:39:44.4146891Z e DEVICE_SMOKE_OK metro_required=false em 17:40:23.7681833Z. ZIP validado11677198964, sha256:47b21ee4d0943b465700e97c1b543be2f10fcc811acbf2e5c9ffe8ca8495ef32, não expirado e workflow head26b3... exato. Digest é do ZIP do artefato, não do APK individual; smoke de emulador não é aceite visual físico. Primeiro CI396be08.../38071227829 falhou TS18048 e foi corrigido sem enfraquecer testes; não usar gate do primeiro head para o corrigido.

Pais de cada merge foram confirmados como [main anterior, head próprio]; árvores de merges byteidênticas às árvores aprovadas (39687ac6719b538d92a2b1843e9954cee80de0aece4;397d57bfbb2cfb11ace871e0c3ef4c9a41ac6088763;398f222de6ba92646e70d3aa99b5bcd513097768d5f). Bytes remotos/patches de todas foram conferidos, e main confirmada após cada merge. APK próprios397/398 N/A por paths efetivos e árvore mobile163de7d27fe6b49fb11d87ed9a9da2bf8b9e47e7 idêntica à396.

Pós-merge #396 no SHA56922...: CI38072758220 e APK38072758154 em execução. Pós #397 no SHA377a5...: CI38072798277 em execução, APK próprio N/A. Pós #398 no SHA60759...: CI38072830711 em execução, APK próprio N/A. Não considerar gates pré-merge suficientes para declarar estes pós-merges completos.

388–395 já integradas. Único retry pós-merge #388run38054154641, tentativa2/job114268524350, continua em execução após pedido17:17:11UTC; falha anterior foi infraestrutura Brokenpipe32/exit224 antes de instalação. Não solicitar novo retry automático. Evidências dos demais pós-merges/históricos estão em1717Z/v1.85. Não repetir merges351–398.

Evidência SUPPORT_INTENT_DURABILITY_v1.88.md: barreira SecureStore por identidade, fila, readback e proibição de descartar pending. PASS18/18 local UTC/SP; CI316mobile/105API e APK próprios pendentes. Storage nativo físico/fluxo/UI ainda abertos. Checkpoint e journal1742Z registram retomada.


## 2026-10-10 — envio humano de suporte v1.89

Verificação de 2026-10-10, 17:53 UTC: main60759a41bfb6a90aed80d85045b9ec837c50a3ad/treef222de6ba92646e70d3aa99b5bcd513097768d5f, Documento da Verdade v1.87. #396–398 já integradas e pais/árvores iguais aos heads aprovados conferidos em1742Z/v1.88; não repetir.

Pós-merges no SHA real: #396CI38072758220/job114273405415 aprovado (298mobile/88API/4web/3CLI); #397CI38072798277/job114273523384 aprovado (298/98/4/3); #398CI38072830711/job114273616278 aprovado (298/105/4/3). Todos os passos e logs foram conferidos, inclusive migrations e contratos HTTP/PostgreSQL. APK pós-merge #39638072758154 ainda em execução; não substituí-lo por APK pré-merge. #397/#398 API-only: APK próprio N/A por paths efetivos e árvore mobile idêntica à396.

Retry único pós-merge #388run38054154641, tentativa2/job114268524350, recuperado com todos os passos aprovados. Instalação Success17:42:32.8794730Z, DEVICE_SMOKE_OK sem Metro17:43:22.9345817Z. ZIP validado11676949709, sha256:813823c871d6abb8ebebfd85e28fae00941db92a4160acab5f041e8eb90d9085, não expirado, head de merge4cfa80fbe784d087b3aad49738a5df7c30c76666 correto. ZIP é artefato, não digest individual do APK. Diagnóstico da tentativa1infra preservado11671065789/digest78996502e4e43543f065ec334594068669c0dc7a7acc523b33aa780681f250bd. Não solicitar outro retry; esse pós-merge está comprovado no emulador, sem fechar gate físico.

#399head7bd91e24c1c0428d0ea8caa762fe995ba0271374/tree18edb4798cccb9094653010a55f17aad898a4abc, base main, mergeabletrue. CI38072920913/job114273878473 aprovado:316mobile/105API/4web/3CLI e todos os passos/HTTP/migrations. 12arquivos remotos conferidos byte a byte. APK próprio38072921018 em execução; não integrada. Diff próprio deve ser revisado fresco antes de merge. Próxima etapa depende desse storage e dos predecessores já integrados.

PROFESSIONAL_SUPPORT_SUBMISSION_v1.89.md:29regressões novas de protocolo/handlers; PASSlocal59/59 suporteUTC/SP, CI345mobile/105API e APK próprios pendentes. Solicitar ajuda no trabalho escolhido, storage antesPOST, retryhumano com mesmocontexto e ACKdurável; sem criação real. Físico/geral/Dia/Preferências aindaabertos; checkpoint/journal1753Z.


## 2026-10-10 — Ajuda contextual na Agenda v1.90

Verificação de 2026-10-10, 18:00 UTC: main60759a41bfb6a90aed80d85045b9ec837c50a3ad/treef222de6ba92646e70d3aa99b5bcd513097768d5f, Documento da Verdade v1.87. #396–398 já integradas e pais/árvores iguais aos heads aprovados conferidos em1742Z/v1.88; não repetir.

Pós-merges no SHA real: #396CI38072758220/job114273405415 aprovado (298mobile/88API/4web/3CLI); #397CI38072798277/job114273523384 aprovado (298/98/4/3); #398CI38072830711/job114273616278 aprovado (298/105/4/3). Todos os passos e logs foram conferidos, inclusive migrations e contratos HTTP/PostgreSQL. APK pós-merge #39638072758154 ainda em execução; não substituí-lo por APK pré-merge. #397/#398 API-only: APK próprio N/A por paths efetivos e árvore mobile idêntica à396.

Retry único pós-merge #388run38054154641, tentativa2/job114268524350, recuperado com todos os passos aprovados. Instalação Success17:42:32.8794730Z, DEVICE_SMOKE_OK sem Metro17:43:22.9345817Z. ZIP validado11676949709, sha256:813823c871d6abb8ebebfd85e28fae00941db92a4160acab5f041e8eb90d9085, não expirado, head de merge4cfa80fbe784d087b3aad49738a5df7c30c76666 correto. ZIP é artefato, não digest individual do APK. Diagnóstico da tentativa1infra preservado11671065789/digest78996502e4e43543f065ec334594068669c0dc7a7acc523b33aa780681f250bd. Não solicitar outro retry; esse pós-merge está comprovado no emulador, sem fechar gate físico.

#399head7bd91e24c1c0428d0ea8caa762fe995ba0271374/tree18edb4798cccb9094653010a55f17aad898a4abc, base main, mergeabletrue. CI38072920913/job114273878473 aprovado:316mobile/105API/4web/3CLI e todos os passos/HTTP/migrations. 12arquivos remotos conferidos byte a byte. APK próprio38072921018 em execução; não integrada. Diff próprio deve ser revisado fresco antes de merge. Próxima etapa depende desse storage e dos predecessores já integrados.
#400head9eeaf89ca2e327bc756610ebd4aebb414840c21b/treec92641013a9228efe3ae44932e7ec3302438a680, basefix/support-intent-durability, mergeabletrue. CI38073733288/job114276258891 aprovado:345mobile/105API/4web/3CLI, typecheck/build/export/migrations/HTTPPostgreSQL, todos os passos/logs. 14arquivos remotos byteidênticos; patch revisto inclusive ligação SupportRequest/SupportHistory. APKpróprio38073733274/job114276258739 em build; #400nãointegrada. APK39938072921018/job114273878889 e APKpós39638072758154/job114273404967 ainda em smoke; CI399 já316/105/4/3aprovado.

AGENDA_SUPPORT_CONTEXT_v1.90.md:7regressões novas/29localUTC/SP, handler escolhe row real guardado, semPOST aoabrir; reutiliza SupportRequest. StyleSheetbyteidêntico/nav/lifecyclepreservados. CI352mobile/105API eAPK próprios pendentes; físico/geral/Preferências abertos. Checkpoint/journal1800Z.


## 2026-10-10 1812Z —v1.91

NAMED_SUPPORT_CONTEXTS_v1.91.md: cinco testes novos/30localAPI, consulta selfidentity/nome real, contrato HTTP A/B/sem vínculo/header/revogado ampliado. CI próprio110API/352mobile ainda pendente; APK próprio N/A condicionado a paths/tree exatos. #399merged960d3f14c4d59018f9949569c930a6f9e4b82ef8, ownAPK aprovado, pósCIpass/log a ler/native em execução; #396 pósAPKpass/ZIP11677363296/digest9af288dce5f55b2a5ada4ec68da6b21f3421cd930e9575289dccf77faf80e0e7. #400/401 CI aprovados/APKs em execução. Sem vínculo requer decisão de autoridade, sem inventar tenant. Evidência detalhada/ checkpoint/journal1812Z.


## 2026-10-10 1817Z —v1.92

GENERAL_PROFESSIONAL_SUPPORT_v1.92.md: escolha humana de nomes reais, histórico assignmentnull, protocolo durável reutilizado.17novas regressões,65localUTC/SP +54adicionais aprovadas. CI369mobile/110API +APK próprio pendentes. #402CI38074817938/job114279486213 aprovado352/110/4/3 inclusive contrato PostgreSQL/nomes/header/revogado; mobiletreee528995c9c2f9d17d0f94ae89faaeb214742f267 igual401, APK próprioN/A. #399pósCIpass316/105/log completo; natives400/401/pós399 ainda execução. Autoridade sem membership e retomada sem escolha ativa limitadas explicitamente; VisualTruth físico aberto. Checkpoint/journal1817Z.


## 2026-10-10 1821Z —v1.93

SUPPORT_RECOVERY_WITHOUT_CONTEXT_v1.93.md: retomada independente de listas, modo sem nova preparação/envio, retry humano e release confirmed originais.8novas regressões;73localUTC/20SP aprovadas; CI377mobile/110API +APK próprios pendentes. #403CI38075196323/job114280600176 aprovado369/110/4/3/log completo, APK38075196283 pendente; natives400/401/pós399 pendentes. Sem bypass membership/RLS; novo suporte sem vínculo requer autoridade aprovada, gate físico aberto. Checkpoint/journal1821Z.


## 2026-10-10 1830Z —v1.94

CAPABILITY_INPUT_SHAPE_v1.94.md: TypeError antigo reproduzido em fixtures;9testes novos/39localAPI e bash-n aprovados; shape400/auth/perfil real/catálogo ativo textIDs preservados. CI119API/377mobile pendente, APK próprioN/A condicionado paths/tree. Preferências sem contrato próprio não inventada. #400merged5675327972869b16b0641a738d88f99cfb1a53b0/pósCIpass/ownAPKpass; #399pósAPK38074363965/job114278113410PASS/ZIP11678204886/digestf75356f54853369f8e3150addb7f950fe0611242eae53978358306fb813257a9 no head real. #404CI38075494028/job114281481865PASS377/110/4/3; natives401/403/404/pós400 pendentes. Checkpoint/journal1830Z.


## 2026-10-10 1836Z —v1.95

CAREER_CONVERSION_INPUT_v1.95.md: TypeError antigo reproduzido;12novos testes/51localAPI e bash-n aprovados, parsers/profissional/tenant/completed/proposed preservados. CI131API/377mobile/HTTPnegativos pendentes; APK próprioN/A condicionado paths/tree. #405CI38076148645/job114283385677 aprovado377/119/4/3/HTTPshape400/cadastro intacto; mobiletree39e121e416614fa92ce16775d19e65648492d9f3 igual404, APK N/A. Natives401/403/404/pós400 continuam execução. Preferências/autoridade sem membership/VisualTruth físico seguem abertos. Checkpoint/journal1836Z.


## 2026-10-10 — v1.96

- [TEAM_PLAN_INPUT_v1.96.md](TEAM_PLAN_INPUT_v1.96.md): TypeError do método anterior reproduzido em fixtures, parser/bind corrigidos e PASS62 local explícito; novo CI/HTTP próprio pendentes.
- [EXECUCAO_VERIFICADA_2026-10-10_1847Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_1847Z.md): CI próprio406 comprovado377mobile/131API, APKs próprios403/404 comprovados com instalação/sem Metro/digests; native401 e pós400 em execução. Visual Truth físico segue aberto.


## 2026-10-10 — v1.97

- [PLANNER_SCREEN_DEADLINE_v1.97.md](PLANNER_SCREEN_DEADLINE_v1.97.md):5falhas/1pass anteriores e PASS15 após correção local explícita. CI/APK próprios pendentes. #407CI377mobile/140API/HTTP válido e #400pósAPK com instalação/sem Metro/digest comprovados.
- [EXECUCAO_VERIFICADA_2026-10-10_1851Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_1851Z.md): #401 cancelada antes de boot/install; retry único no mesmo SHA solicitado e em execução. Não repetir nem interpretar cancelamento como crash do app. Gate físico aberto.


## 2026-10-10 — v1.98

- [DECLARED_CAPABILITIES_PROFILE_v1.98.md](DECLARED_CAPABILITIES_PROFILE_v1.98.md): declarações reais em Experiência profissional, GET auth-only, sem alterações de catálogo/certificação;13regressões novas/PASS28 local explícito. CI396mobile/140API+APK próprios pendentes; gate físico aberto.
- [EXECUCAO_VERIFICADA_2026-10-10_1856Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_1856Z.md): #408CI38077510496/job114287470090 aprovado383mobile/140API/4web/3CLI/HTTP; APK408 e tentativa2APK401 em execução. #400 pós-gates comprovados.


## 2026-10-10 — v1.99

- [PROFILE_ANALYTICS_READ_DEADLINE_v1.99.md](PROFILE_ANALYTICS_READ_DEADLINE_v1.99.md):10falhas/2pass antes ePASS58 após correção de leitura; campos privados condicionados a perfilready; sem mudança de escrita. CI408mobile/140API+APK próprios pendentes.
- [EXECUCAO_VERIFICADA_2026-10-10_1903Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_1903Z.md): #409CI38077842127/job114288445864 aprovado396mobile/140API/4web/3CLI; APKs401retry/408/409 em execução. Issue214closed, dependências externas aindaopen; ledger histórico não redefinido.


## 2026-10-10 — v1.100

- [PROFESSIONAL_WEEK_CHRONOLOGY_v1.100.md](PROFESSIONAL_WEEK_CHRONOLOGY_v1.100.md): comparator por timestamp, cinco regressões novas e PASS67 local; HTTP/PostgreSQL/CI próprio pendentes antes da publicação. Provas completas dos gates/merges401–410 e pós401/402CI; pós-APKs em acompanhamento.
- [EXECUCAO_VERIFICADA_2026-10-10_2313Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_2313Z.md): SHAs reais, pais/árvores, runs e próxima ação; checkpoint anterior arquivado. Visual Truth físico/gates externos abertos.


## 2026-10-10 — v1.101

- [TALENTS_SAFETY_READ_DEADLINE_v1.101.md](TALENTS_SAFETY_READ_DEADLINE_v1.101.md):10falhas/6pass anteriores;16novas regressões, PASS34 local após correção; JSX/StyleSheets/mutations preservados. CI424mobile/145API+APK próprios pendentes antes de publicação.
- [EXECUCAO_VERIFICADA_2026-10-10_2317Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_2317Z.md):411 integrado com HTTP real de cronologia e145API; todos os pósCI401–410 conferidos; pósAPKs e411pósCI em acompanhamento.


## 2026-10-10 — v1.102

- [PRIMARY_READ_DEADLINE_v1.102.md](PRIMARY_READ_DEADLINE_v1.102.md):20falhas/8pass antes;28novos testes/PASS37 local explícito; JSX/StyleSheet/escritas preservados. CI452mobile/145API+APK próprios pendentes antes de publicar.
- [EXECUCAO_VERIFICADA_2026-10-10_2324Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_2324Z.md):todos os pós-CI401–411 comprovados, inclusiveHTTPreal de cronologia;412CI424/145 aprovado, ownAPK pendente. Pós-APKs independentes em execução.


## 2026-10-10 — v1.103

- [COMPANY_PUBLICATION_CONTEXT_DEADLINE_v1.103.md](COMPANY_PUBLICATION_CONTEXT_DEADLINE_v1.103.md):5falhas/1pass antes;6novos/PASS12 local após prazo/catch; publicação/JSX/draft/uncertain preservados. CI458mobile/145API +APK próprios pendentes.
- [EXECUCAO_VERIFICADA_2026-10-10_2329Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_2329Z.md):413CI452mobile/145API/HTTPreal comprovado,412CI424/145 aprovado; natives próprios/pós em execução.


## 2026-10-10 — v1.104

- [AGENDA_READ_DEADLINE_v1.104.md](AGENDA_READ_DEADLINE_v1.104.md): seis falhas/três sucessos anteriores; nove regressões novas/PASS24 local; lifecycle/geo/JSX preservados. CI467mobile/145API eAPK próprios pendentes antes da publicação.
- [EXECUCAO_VERIFICADA_2026-10-10_2343Z.md](../conversas/EXECUCAO_VERIFICADA_2026-10-10_2343Z.md): pós-CI401–411 e todos os pós-APKs aplicáveis comprovados no SHA real; CI412–414 comprovados, ownAPKs em execução. Visual Truth físico/gates externos abertos.


## 2026-10-11 — Interessados / pós-merge #419

- [CANDIDATES_READ_DEADLINE_2026-10-11.md](CANDIDATES_READ_DEADLINE_2026-10-11.md): 12falhas/9sucessos anteriores;21regressões novas/PASS29local, escritas/layout preservados. CI497mobile/145API eAPK próprios pendentes antes de publicação. Prova completa pós-merge419 no SHA real; gates físicos separados.


## 2026-10-11 — Conversa

- [CONVERSATION_READ_DEADLINE_2026-10-11.md](CONVERSATION_READ_DEADLINE_2026-10-11.md):7falhas/6sucessos antes,13novas/PASS24local. Send/rascunho/layout preservados; CI510mobile/145API eAPK próprios pendentes. #420 gates em execução, pós419 comprovado.


## 2026-10-11 — Notificações

- [NOTIFICATIONS_READ_DEADLINE_2026-10-11.md](NOTIFICATIONS_READ_DEADLINE_2026-10-11.md): 10falhas/8sucessos antes,18novas/PASS28local. MarcarPOST/layout/nav preservados; CI528mobile/145API eAPK próprios pendentes. #420 CI497/145 comprovado, APK em execução.


## 2026-10-11 — leituras secundárias

- [SECONDARY_READ_DEADLINES_2026-10-11.md](SECONDARY_READ_DEADLINES_2026-10-11.md): 25falhas/15sucessos na bateria anterior40,43novas/PASS94local. Escritas/layouts/rascunhos/resultados incertos preservados; CI571mobile/145API eAPK próprios pendentes. CI420–422 comprovados, APKs em execução.


## 2026-10-11 — Histórico de suporte

- [SUPPORT_HISTORY_READ_DEADLINE_2026-10-11.md](SUPPORT_HISTORY_READ_DEADLINE_2026-10-11.md):10falhas/7sucessos antes;17novos/PASS37local. GETs de trabalhos/casos com error imediato e isolamento de seleção; SupportRequest/durable/JSX preservados. CIs420–423 comprovados; APKs pendentes. CI588mobile/145API eAPK próprios ainda pendentes antes de publicação.


## 2026-10-11 — prazo do Copilot assistido

- [COPILOT_INTERPRETATION_DEADLINE_2026-10-11.md](COPILOT_INTERPRETATION_DEADLINE_2026-10-11.md):8falhas/3sucessos antes;11novos/PASS28local. Backend interpreta sem mutations/provider pago. Prazo libera interpretação para retry humano com guard controller/foco e sem rota/POST automático; nextStep/layout preservados. CI599mobile/145API eAPK próprios pendentes;420–423CI comprovados,424CI/APKs em execução.


## 2026-10-11 — Disponibilidade com resultado incerto

- [AVAILABILITY_SAVE_DEADLINE_2026-10-11.md](AVAILABILITY_SAVE_DEADLINE_2026-10-11.md):8falhas/3sucessos antes;11novos/PASS23local. Prazo distingue não-envio/unknown, mantém draft e só retry humano. Idempotência existente exata auditada em controller/migration0026/HTTP real CI; JSX/schema preservados. CI610mobile/145API+APK próprios pendentes;420–424CI comprovados,425CI/APKs em execução.


## 2026-10-11 — leitura pareada na abertura

- [STARTUP_SESSION_READ_DEADLINE_2026-10-11.md](STARTUP_SESSION_READ_DEADLINE_2026-10-11.md):5falhas/2sucessos por prazo ausente;7novos/PASS11local. Callback libera entrada após15s, leitura expirada não navega/mescla contexto. Resolver/fila/storage/JSX preservados. CI617mobile/145API+APK próprios pendentes;420–426CI comprovados, APKs em execução.


## 2026-10-11 — recuperação de cadastro incerto

- [SIGNUP_UNCERTAIN_DEADLINE_2026-10-11.md](SIGNUP_UNCERTAIN_DEADLINE_2026-10-11.md):6falhas/3sucessos antes;9novos/PASS20local. Prazo revela link Entrar sem desbloquear unknown/segundoPOST; drafts/ACK/layout preservados. CI626mobile/145API+APK próprios pendentes. #420merged apósCI/nativeown completos; pós420emexecução,421–427ownAPKs pendentes.


## 2026-10-11 — login com fila/rollback preservados

- [SIGNIN_SESSION_DEADLINE_2026-10-11.md](SIGNIN_SESSION_DEADLINE_2026-10-11.md):7falhas/4sucessos antes;11novos/PASS24local. Prazo libera tela, preserva fila e rollback/par atual antes de login posterior. Storage nativo/físico não comprovado. CI637mobile/145API+APK próprios pendentes; ownCIs420–428 aprovados, pós420CI aprovado/APK em execução.


## 2026-10-11 — saída local preservando sessão posterior

- [SIGNOUT_LOCAL_DEADLINE_2026-10-11.md](SIGNOUT_LOCAL_DEADLINE_2026-10-11.md):12falhas/6sucessos antes;18novos/PASS29local. Prazo inclui storage e permite fallbacklocal offline mantendo expectedToken/fila/readback, sem apagar novo login/alegar revogação remota. Perfilsave/layouts/helpers preservados. CI655mobile/145API+APK próprios pendentes;420–423mergedowncompletos, pós420/421CI aprovados/APKs pendentes.

## 2026-10-11 05:32:18 UTC

- [PROFILE_SAVE_SCREEN_DEADLINE_2026-10-11.md](./PROFILE_SAVE_SCREEN_DEADLINE_2026-10-11.md): Perfil.saveProfile: 5 falhas/6 sucessos antes, 50/50 locais depois; UI encerra busy no prazo, mantém draft, rejeita ACK/finally antigo. Backend/índice único e same-body retry auditados; sem prova de cancelamento/ordenação de escritas diferentes. Registra merges420–424, CI pós-merge, APKs pendentes e falha/rerun425. Gates físico/VisualTruth/PSP/pentest abertos.

## 2026-10-11 05:36:39 UTC

- [DASHBOARD_SIGNOUT_LOCAL_DEADLINE_2026-10-11.md](./DASHBOARD_SIGNOUT_LOCAL_DEADLINE_2026-10-11.md): EmpresaInicio.signout: 6 falhas/3 sucessos antes; 70/70 locais depois, incluindo27casos das3telas. Prazo de UI/limpeza local/token posterior/contexto exibido conservados; sem prova física ou de revogação remota. CI431 aprovado, APKs pendentes. Equipes já coberta na main; publicação incerta identificada para auditoria.

## 2026-10-11 05:39:56 UTC

- [PUBLICATION_UNCERTAIN_DEADLINE_2026-10-11.md](./PUBLICATION_UNCERTAIN_DEADLINE_2026-10-11.md): Empresa.create: reproduz7falhas/3sucessos incluindo reenvio duplicado apósunknown; 31/31 locais depois. Prazo/guarduncertain preservamdraft e impedem novoPOST sem contrato. Recuperação durável/reinício/idempotência continuam abertos; sem bypass. Registra pós420 integral e demaisgates pendentes.

## 2026-10-11 05:43:41 UTC

- [CONVERSATION_SEND_UI_DEADLINE_2026-10-11.md](./CONVERSATION_SEND_UI_DEADLINE_2026-10-11.md): sendConversa: antes9falhas/5sucessos, depois47/47locais. Prazo conserva draft quandounknown e separaACKsent confirmado de falha noGET posterior; nãoháautoPOST/ACKtardio/finally antigo. Semidempotência nova/renderRN/E2Efísico. Registra pós420integral/CI432/APKs426–429aprovados e dependência425pendente.

## 2026-10-11 05:50:14 UTC

- [COMPANY_JOB_INPUT_RUNTIME_VALIDATION_2026-10-11.md](./COMPANY_JOB_INPUT_RUNTIME_VALIDATION_2026-10-11.md): CompanyJobCreateController runtime JSON: antes5falhas/3sucessos, depois8/8 locais; HTTPlocalhost34entradas malformadas integrado aoCI, ainda aguarda prova real no head. Auth/membership primeiro, 400semINSERT, trim/null/defaults/tenant e integer representável preservados. APK N/A condicionado paths/mobiletree/predecessor434; gatespós420/421/423/424 comprovados,422/425pendentes.

- Retificação no mesmo [registro de entrada JSON](COMPANY_JOB_INPUT_RUNTIME_VALIDATION_2026-10-11.md): CI inicial #435 TS2345 corrigido, nova validação pendente; #422 pós-merge comprovado e #425 ANR do sistema/tentativa 3 pendente.


### Retificação comprovada do contrato HTTP — 2026-10-11 06:00 UTC
CI #435 38116431968 no head c39bc3752f3434b69d1b0c30f2b9c053c0c8f8d1: Typecheck/Build/export/testes/migrações/retenção PASS, 4/699/153/3 testes sem falhas, mas HTTP NÃO aprovado. Job 114402119736 falhou porque o novo teste esperava 403 para falta de membership e a API vigente retorna 401. Fonte auth.service.ts::requireMembership lança UnauthorizedException('tenant_membership_required') quando identidade válida não pertence ao tenant solicitado; confirmado no código e GET autorizado da fixture. Corrigida somente a expectativa exata para 401; não se enfraquece auth/RLS nem muda a API. Nenhum gate completo #435 é declarado PASS até CI do novo SHA e todo HTTP aprovados. #430 APK 38114691248/job114397143546 attempt1 falhou em input keyevent82 Broken pipe32 antes de instalação em 05:43:22.5234357Z, build PASS; diagnóstico ZIP11693427721 sha256:38bc487638a2d67da8174c3bdf4476ac38e7f9dd732797477196c49f89b75dbc. Após log integral, rerun somente job falho solicitado; attempt2 pendente. #425 attempt3 pendente. Próxima ação: acompanhar e integrar em ordem com gates reais, sem bypass.

- [TEAM_INPUT_RUNTIME_VALIDATION_2026-10-11.md](TEAM_INPUT_RUNTIME_VALIDATION_2026-10-11.md): TeamsController JSON/UUID/no-write; 6 fixtures locais PASS; HTTP/CI próprio pendente; mobile sem mudança, gate nativo N/A condicional.


## Validação das rotas de equipes — 2026-10-11 06:06:16 UTC

A pendência dos parâmetros de rota UUID no mesmo TeamsController foi reproduzida e corrigida nesta fatia: GET membros, POST membro e DELETE membro agora rejeitam IDs não canônicos antes de db.tenant/query/cast uuid, após autenticação/membership/role original. UUID_RE não impõe versão; IDs canônicos emitidos pela API e SQL/RLS existentes preservados. Nenhuma lista/snapshot ou ACK fictício.

Três testes adicionais dos handlers reais: matriz anterior 9 testes, 2 FAIL/7 PASS; matriz final 9 PASS/0 FAIL local (limitações de stubs já registradas). Confirmam rejeição sem abrir tenant/query, prioridade 401/403 e consultas válidas com tenant confiável/DELETE exato; continuam 6 regressões anteriores de Body. HTTP de equipes acrescenta GET/POST/DELETE de rota inválida com 400 e GETs inalterados, sem relaxar jornada válida de alocação existente. bash -n PASS. CI do NOVO head espera 4/699/162/3 e todos HTTP; não reutilizar a aprovação do head anterior f5133a4c061b1d0652654282fe907494e018d640 (CI38116726059 passou 4/699/159/3 e marcador equipe em 2026-10-11T06:04:18.0077457Z).

#435 head5b9f91029a5401b6c54c64862076bcd7e7e981fc CI38116648295/job114402739344 confirmado PASS em todos os passos, 4/699/153/3, marcador job inválido 2026-10-11T06:02:39.4641635Z e cronologia PostgreSQL 06:02:54.5430625Z; ainda não merged. #425 attempt3/#430 attempt2 em execução, sem gate nativo aprovado nessas tentativas. Main permanece #424 b00be864d6ed6c7383f9f5267df054dad6907535. Próxima ação: acompanhar #425/#430/#434; integrar em ordem #425–#436 com gates aplicáveis exatos e confirmar pós-merge. APK desta fatia API permanece N/A condicional a mobile tree idêntica e #434 nativo; gates físicos/Visual Truth/pentest/PSP/Web pago permanecem abertos. Histórico v1.104/memória/checkpoint preservados. Sem custos, provider, dinheiro real ou deploy.

- [MEMBERS_INPUT_RUNTIME_VALIDATION_2026-10-11.md](MEMBERS_INPUT_RUNTIME_VALIDATION_2026-10-11.md): convites Body/string/UUID, sem coerção/escrita/consumo inválido; 7 regressões locais PASS, CI/HTTP próprio pendente; native N/A condicional.

- [MEMBER_REVOKE_SCREEN_DEADLINE_2026-10-11.md](MEMBER_REVOKE_SCREEN_DEADLINE_2026-10-11.md):14 regressões novas/67local PASS, prazo Membros.revoke; recibos exatos de merge/pre/post420–437, native post425–434 pendente, gates próprios novos713/169+APK pendentes.


## Talentos / recibo #438 — 2026-10-11

[TALENT_INPUT_RUNTIME_VALIDATION_2026-10-11.md](TALENT_INPUT_RUNTIME_VALIDATION_2026-10-11.md): ANTES3FAIL/5PASS, DEPOIS8PASS; novo HTTP/CI177API a provar; merge438/CI pós-merge provados, APK pós438/retry427 pendentes. Originalv1.104/histórico preservados. Gate físico/provider independente e aberto.


## Avaliações / recibo #439 — 2026-10-11

[RATING_INPUT_RUNTIME_VALIDATION_2026-10-11.md](RATING_INPUT_RUNTIME_VALIDATION_2026-10-11.md): 9novos testes ANTES3FAIL/6PASS, DEPOIS9PASS; 12locais com política existente; HTTP38requests/CI186API pendentes antes de publicação. #439 integrado com CI177API completo; native próprio N/A, pós-CI439/pósAPK438/retry427 separados pendentes.


## Conversas / recibo #440 — 2026-10-11

[CONVERSATION_INPUT_RUNTIME_VALIDATION_2026-10-11.md](CONVERSATION_INPUT_RUNTIME_VALIDATION_2026-10-11.md): 9novos testes ANTES3FAIL/6PASS, DEPOIS9PASS; HTTP28invalidPOSTs/CI195API pendentes antes de publicar. #440 integrado com CI186API completo, pós439CI comprovado; native próprio N/A, pósAPK438/retry427 separados pendentes.


## Recibo de integração #438–441 / pós-merge histórico

[VERIFIED_CONTINUITY_RECEIPTS_2026-10-11.md](VERIFIED_CONTINUITY_RECEIPTS_2026-10-11.md): CI pré/pós438–441 e APK próprio438 aprovados; postAPK419/425–434 aprovados, retry4272 comprovado; postAPK438 ainda executando no snapshot. N/A nativo API/docs explicado por paths/mobiletree. PróximaAuthinput/Supportstatus, VisualTruth físico/pentest/PSP externos ainda OPEN. Originalv1.104/histórico integral mantidos.


### Pós438 atualizado 2026-10-11 11:18:07 UTC

PASS run38133235730/job114451722593, install11:14:10.8159307Z/DEVICE_SMOKE_OK11:14:53.7258824Z, ZIP11700537236/sha256:de19b169e19ab8c59d27d30b462095220c44e167342d2b3a35602267206be510 no merge27e96142. Novo complemento em VERIFIED_CONTINUITY_RECEIPTS_2026-10-11.md. Histórico pendente mantido como histórico; gates físicos/provedores não fechados.


## Validação runtime de signup/signin — 2026-10-11 11:28:10 UTC

Base verificada maine3f6d58221d92a461852c98db3accb0549186d38, tree8ddc306d6965f0ac5619f7dc5b438b0d803be5a5, README aponta ORIGINAL Documento da Verdadev1.104; zero PR aberto não implica conclusão. #442 integrado e pós-CI38135416532/job114458169133 PASS4web/713mobile/195API/3CLI no SHAexatoe3f6d58221d92a461852c98db3accb0549186d38. Recibo final de #442 está na própria PR com SHA/pais/tree/logs; snapshot anterior preservado.

Falhas reais reproduzidas: body null em signup/signin, email não textual em trim, password não textual em scrypt/limiter e workspaceName não textual em trim podem causar TypeError/500. Entrada @Body passa a unknown, exige objeto não array e credenciais textuais antes de normalizar/hash/SQL. Mantém401invalid_signup para signup e401 genérico para signin; conta default professional inclusive null; account_type_invalid400 e workspace_name_required400/too_long400. Workspace inválido continua na ordem anterior, após hash de senha textual. Não transforma objetos/números em credenciais, não altera a autoridade de tenant/role/identity.

Doze testes do AuthController real: antes8PASS/4FAIL; depois12PASS. Crypto usa scryptSync real, salts/hashes reais de fixture e SHA256 real do token, sem substituir o algoritmo. Cobrem null/não-objeto/tipos, limites e prioridade, workspace, professional/default/company/owner/slug/normalização, duplicate23505/email_in_use e DBerrors, sucesso/token/memberships/cap10, senha errada/falha8→429/15min, conta bloqueada inclusive senha certa, janela expirada/unknown sem limiter, senha curta legada no signin vs mínimo8 signup. Onze expressões SQL comparadas BYTE-IDÊNTICAS. Corpo transacional de signin, dummy hash, scrypt/timingSafeEqual, 8falhas/15min, sessões30dias/cap10, limpeza e signout preservados; não altera limite HTTP.

HTTP script EXISTENTE http-auth-rate-limit-e2e.sh estendido: 22JSONs×2endpoints=44rejeições401, 10workspaces inválidos400 e tipo de conta inválido400; contagens reais de identities/tenants/memberships/auth_signin_limits/sessions não mudam. Mais7senhas não textuais sobre identidade real401 sem consumir janela/criar sessões. Todas as verificações positivas anteriores de hash/login/8falhas429/unlock/reset/unknown/cap10/signout continuam. Guard exige localhost/127.0.0.1 e porta antes de DB/rede; bash-n e quatro URLs externas/host-confuso/rota indevida rejeitadas. Execução HTTP/PostgreSQL real ainda depende da CI própria — NÃO afirmar PASS antecipado.

Local usa Node24 transform TS do controller real com stubs explícitos Nest/DB/Auth e fixtures; prova ramo/crypto/params, não typecheck/Nest HTTP/PostgreSQL. CI própria necessária no SHA do futuro head:4web/713mobile/207API/3CLI, frozen-lockfile/typecheck/build/export/migrations/retention/todos HTTP/ProductionTruth. Diff restrito API controller/test/script e docs; mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao #438 aprovado; Standalone workflow por paths não cobre esta mudança de API, APK próprio/pós N/A condicionado à revalidação de paths/tree, não inventar run para auth.

Próxima ação: publicar branch/PR, revisar diff/bytes e lease main, aguardar CI207API e markers HTTP de auth no SHA EXATO, merge só com gates aplicáveis PASS e verificar pais/tree/main/pós-CI. PR deve guardar recibo final gerado após snapshot, sem hashes autorreferentes. Depois tarefa independente SupportController.status (note/body/UUID) mantendo admin/auth/enum/queries. Nenhuma aprovação adicional para esta correção runtime autorizada. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho mantidos, sem custo/deploy/PSP/dinheiro/mensagens externas. VisualTruth físico/E2E/SecureStore/piloto/pentest/provider/PSP/KYC/FIN-RISK/Web pago continuam OPEN; projeto em andamento.


## Correção da tipagem do teste de token — 2026-10-11 11:30:35 UTC

CI38135705986/job114459009267 no headab3da139ef6ea42dd9a20792089251ca6a362f1c falhou em Typecheck por TS2345 no teste novo: retorno accessToken inferido string|undefined. Log integral lido; build/export/testes/HTTP seguintes SKIPPED, NÃO PASS. Teste agora extrai token e assert.ok(typeof token==='string') antes de regex/SHA256, estreitando tipo sem non-null fictício. Controller/política/SQL sem nova mudança; fixtures locais12PASS novamente. Novo commit requer CI no novo SHA, sem rerun do SHA inválido nem reutilizar gates. Evidência histórica de falha preservada; merge proibido até CI4/713/207/3 completo e markersauth HTTP reais.


## Revisão de suporte: validação runtime — 2026-10-11 11:35:12 UTC

Base verificada mainc6e63c060e1f4edcffdf16cc7dc492a412f15c71/treea1a1e593a7fc2194bc81201d6ce3eda54e072c48; README/DVT ORIGINALv1.104/memória/checkpoint reconsultados e história preservada. Auth#443 integrado após CI38135838666/job114459394668 PASS no heada17451ad4cffafe09d6eedae6a2b425795e7a5cf:4web/713mobile/207API/3CLI e markers62inputs+antibruteforce/cap10 PostgreSQL. Mergec6e63c060e1f4edcffdf16cc7dc492a412f15c71, pais[e3f6d58221d92a461852c98db3accb0549186d38,a17451ad4cffafe09d6eedae6a2b425795e7a5cf], tree aprovadoa1a1e593a7fc2194bc81201d6ce3eda54e072c48 conferidos. Pós-CI38136044075 ainda em execução neste snapshot, NÃO PASS antecipado; finalizar recibo na PR443 quando realproof. APKauthN/A por pathsAPI/docs/mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d. Falha de tipagem no primeiro head443 permanece histórica, não bypass.

SupportController.status b.note?.trim gerava TypeError com null/note não textual; UUID inválido chegava a UPDATE uuid. Bodyunknown exige objeto não array, statusstring reviewing/resolved/dismissed e note textual não vazia; caseUuid canônico genérico sem restringir versão. Mantém support_status_invalid400 e support_case_not_found400 reais. Autenticação/membership/admin(owner/admin)/tenant continuam ANTES da validação, sem mudar autoridade. Dez expressões SQL BYTE-IDÊNTICAS; prepare/create duráveis byte-idênticos, sem alterar chaves/digest/replay/concurrency/reporter ou assignment. mine/exceptions/admin/retention/protocolo preservados. Não altera política/transições autorizadas.

Nove regressões do controller real, antes6PASS/3FAIL → depois9PASS. Cobrem null/não-objeto, nota textual sem coerção, enum, UUID antes de SQL, prioridade auth/tenant/membership/admin, estados válidos com owner/admin e parâmetros tenanttrusted, resultado real incluindo resolução, ausência/cross-tenant sem ACK e DBerrors incertos. Local Node24 transform TS, stubs explícitos Nest/DB/Auth/helpers reais; não prova Nest HTTP/PostgreSQL/native.

Script HTTP EXISTENTE http-support-assignment-boundary-e2e.sh estendido:22JSONs inválidos400, UUID400, auth401/membership401/admin403; GETs reais antes/depois das listas owner e reporter devem ficar IDÊNTICOS. Fluxos positivos de reviewing/resolved/dismissed verificam ACK/resolutionNote trim/resolvedAt timestamp real vs null, deixando estado final reviewing. Scripts originais de intent/key/8concurrentretries/payloadconflict/tenant+reporter isolation/guardDB/replay após linknull e todos demaisfixtures preservados. Guardlocalhost/porta antes de DB/rede endurecido; bash-n e4URLs externas/host-confuso/path PASS local. Nenhum chamado de produção ou mensagem externa. HTTP real depende da CI própria, NÃO aprovado neste snapshot.

Head ainda a gerar em branch/PR: esperar CI4web/713mobile/216API/3CLI (9API novos), frozen-lockfile/typecheck/build/export/migrations/retention/todosHTTP/ProductionTruth e2markerssupport. APK próprio/pós N/A condicionado a pathsAPI/docs e mesma mobiletree aprovada#438; não atribuir APK outroSHA. Próxima ação: conferir diff/bytes/lease/gateshead exato, integrar uma vez se PASS e confirmar pais/tree/main/pós-CI; recibo final de hashes/runs pós-snapshot na própria PR e consolidar docs em mesmo ciclo.

Próxima falha concreta auditada: SafetyAdminController.status body null/note não textual e UUID em events/status; preservar note opcional/null (diferente do suporte), enumopen/reviewing/resolved/dismissed, owner/admin, FOR UPDATE, eventactor/status/changedfalse e SQL/canonical. Em seguida SafetyAppealsController.create e adminstatus JSONtipos/UUID com política/advisory lock/reporterACL íntegros; CancellationController.cancel reason e ReplacementController.select/create runtime também tipados sem guard. Fontes consultadas no SHAe3f6d582; revalidar novasmain antes de qualquer próxima mudança, reproduzirRED e testarHTTPreal. Não decidir compensação ou política financeira nem alterar scheduling/race sem prova.

React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Gates físicos/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSP/KYC/FIN-RISK/Web pago permanecem OPEN; projeto em andamento e rotina mantida sem solicitar continuar/custo/deploy/PSP.


## Diff revisado: testes de criação preservados — 2026-10-11 11:36:36 UTC

Antes de integrar, review do patch identificou que o primeiro heada50e5a61798c17fcab622a57a0cf8ede915c8600 substituía o arquivo EXISTENTE support.controller.test.ts (4testes de criação/tenant) pelos9novos de status. Corrigido: original restaurado BYTE-IDÊNTICO à mainbase e9novos em arquivo separado support-status.controller.test.ts. Local13PASS (4anteriores+9novos), sem apagar cobertura de criação. Head anterior/CI38136142135 não autorizam merge; SHA novo precisa CI4/713/216/3 completo. Diff final contra main NÃO deve alterar support.controller.test.ts original. História preservada e falha corrigida antes de gate/merge; sem bypass/rerun.


## Recibo consolidado auth/support e retomada — 2026-10-11 11:44:26 UTC

Main reconsultadacc372ac4030f30459b5b01446ac634b816040f1a, tree5cfadceb45839c5d3c4423bf3537d7c8d54cfb23; PR#443/#444 merged comprovadas, nenhuma PR aberta na reconsulta não implica fim do projeto. README aponta DVT ORIGINALv1.104 atualizado EM LUGAR, histórico integral preservado. Entradas pendentes abaixo são snapshots históricos; estado atual:
- #442 docs: head1363ed6f381a92dd627aa456149596cd59d0513c, CI38135062135/job114457131722 PASS4/713/195/3; mergee3f6d58221d92a461852c98db3accb0549186d38/tree8ddc306d6965f0ac5619f7dc5b438b0d803be5a5/pais[739908e026ac10bd254e9ea64aa940c404d2f5a0,1363ed6f381a92dd627aa456149596cd59d0513c]; pós-CI38135416532/job114458169133 PASS no SHAexato, mesmos195API. APK N/A por docs-only/mobiletree igual.
- #443 auth: heada17451ad4cffafe09d6eedae6a2b425795e7a5cf/treea1a1e593a7fc2194bc81201d6ce3eda54e072c48, CI38135838666/job114459394668/attempt1 PASS4web/713mobile/207API/3CLI; mergec6e63c060e1f4edcffdf16cc7dc492a412f15c71/treea1a1e593a7fc2194bc81201d6ce3eda54e072c48/pais[e3f6d58221d92a461852c98db3accb0549186d38,a17451ad4cffafe09d6eedae6a2b425795e7a5cf]. Pós-CI38136044075/job114459998562/attempt1 PASS no SHA EXATOc6e63c060e1f4edcffdf16cc7dc492a412f15c71, mesmas contagens; 2026-10-11T11:36:47.4761781Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies; 2026-10-11T11:36:55.3475299Z PASS: Production Truth Gate health/readiness contract. Três markersauth de inputsem escrita/identityreal sem limiter/sessões/antibruteforce/reset/unknown/cap10 lidos nos logs próprio E pós.12novostestes, antes8PASS/4FAIL→depois12PASS,11SQLbyte-idênticos. Falha Typecheck do primeiro head e correção da asserção tipada preservadas como histórico; gates atuais não reutilizam esseSHA.
- #444 supportstatus: headb52824acbaa718a0c29ffa6dd64498124aa65993/tree5cfadceb45839c5d3c4423bf3537d7c8d54cfb23, CI38136212040/job114460487911/attempt1 PASS4web/713mobile/216API/3CLI; mergecc372ac4030f30459b5b01446ac634b816040f1a/tree5cfadceb45839c5d3c4423bf3537d7c8d54cfb23/pais[c6e63c060e1f4edcffdf16cc7dc492a412f15c71,b52824acbaa718a0c29ffa6dd64498124aa65993]. Pós-CI38136390122/job114461019018/attempt1 PASS no SHA EXATOcc372ac4030f30459b5b01446ac634b816040f1a, mesmas contagens; 2026-10-11T11:42:35.5645774Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies; 2026-10-11T11:42:43.4395649Z PASS: Production Truth Gate health/readiness contract. Dois markerssupport JSON/path/authsem alterações + reviewing/resolved/dismissed/resolvedAt e intent8concurrent/replay/DBguards lidos nos logs próprio E pós; auth real também continua PASS.9novosstatus separado dos4originais de criação byte-idênticos; local13PASS. Review corrigiu substituição do arquivo antes de integrar, sem perder testes.10SQLexpressões e prepare/create duráveis byte-idênticos.
- Todos passos CI aplicáveis completos: frozen-lockfile/typecheck/build/exportAndroid/testes/migrations/retention/todosHTTP/ProductionTruth. Pais/tree==headaprovado/main reconsultados após cada merge; todos próprios e pós-CI aprovados nos respectivos SHAs reais.
- APK próprio/pós#443/#444 N/A por paths EXCLUSIVAMENTE API/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d igual ao #438 aprovado; não inventar APK de outro SHA. #438 próprio e pós nativos já PASS: pós38133235730/job114451722593/merge27e96142ecde5efa10adb05ef436bb5a3f123865, Success11:14:10.8159307Z/DEVICE_SMOKE_OK11:14:53.7258824Z semMetro, ZIP11700537236/digestsha256:de19b169e19ab8c59d27d30b462095220c44e167342d2b3a35602267206be510 não expirado. Digest éZIP; teste EMULADOR, não aparelho físico. #419 e425–434 pós nativos também comprovados;#427attempt2 PASS com falhaPackageManagerattempt1/logdiagnóstico preservados.

Próximo item concreto seguro: SafetyAdminController.status/events JSONbody/note/UUID. Fonte reconsultada no SHAcc372ac4030f30459b5b01446ac634b816040f1a, idêntica à auditada. ReproduzirRED antes de mudar: status null e note não textual em trim, events/status UUID malformado chega ao SQL. Preservar AUTH/membership OWNER/ADMIN primeiro, nota OPCIONAL/null/vazio (não aplicar exigência do suporte), enumopen/reviewing/resolved/dismissed, limite2000, FOR UPDATE, changedfalse sem evento em repetição, atortrusted e todasqueries. Testes existentes devem ser inventariados e preservados; novos em arquivo próprio; executarHTTPreal/gateshead e pós. DepoisSafetyAppeals.create/adminstatus/typesUUID (preservar reporterACL/advisorylock/policy), Cancellation.reason e Replacement.select/create (preservar assignmentstatus/compensationPolicy/tenant/availability/authority); fontes confirmadas nessa main, não alteradas nesta entrega. Um impedimento isolado não encerra outros itens.

Este recibo é branch/PR SOMENTE DOCS ainda a publicar, requer CI4/713/216/3 no novo head e revalidação de paths/mobiletree antes de integrar; não usar gates de outra PR. SHA/PR/runs finais gerados após snapshot devem constar na própria PR do recibo; evita hashes autorreferentes inventados/commits infinitos. Evidência completa: docs/evidencias/AUTH_SUPPORT_MERGE_RECEIPTS_2026-10-11.md. Rotina permanece para reavaliar gates e continuar código seguro, sem exigir continuar nem afirmar24h.

React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho canônico preservados. Sem serviços/custos/dinheiro/deploypago/PSP/mensagens reais. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, PSP/KYC/provider/FIN-RISK e Web pago continuam OPEN; prova em emulador/CI não fecha essesgates. Projeto EM ANDAMENTO.


## Revisão de segurança: entradas runtime — 2026-10-11 11:57:32 UTC

Base mainb4b45e4482ea08e3e1706318b8757f238201fe0c/treee3881ffee028f8bb236a956a956089d29d779e0f reconsultada, README/DVT ORIGINALv1.104/memória/checkpoint lidos, zeroPR aberto não significa conclusão. #445 já merged e pós-CI38136903951/job114462526767 PASS4web/713mobile/216API/3CLI no SHAb4b45e4482ea08e3e1706318b8757f238201fe0c, recibo completo na PR445. #419 é histórico integrado, não repetir merge. Mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d coincide com #438 aprovado, APK pós43838133235730/job114451722593 no SHA27e96142ecde5efa10adb05ef436bb5a3f123865 revalidado PASS install/launch EMULADOR semMetro/ZIPnãoexpirado; NÃO prova físico.

Três falhas reais em SafetyAdminController: status JSONnull TypeError; note não textual trim TypeError; UUIDmalformado events/status chega aoSQL.12regressões controllerreal antes9PASS/3FAIL→depois12PASS. Bodyunknown exige objeto não array e status textual enumopen/reviewing/resolved/dismissed; note opcional (undefined/null/vazio/espaços continuam null), não textual rejeitada safety_note_invalid400, limite2000UTF16 após trim preservado. UUIDcanônico genérico rejeita safety_case_invalid400 após contextAUTH/tenant/membership/OWNERADMIN. Mantém safety_status_invalid400, safety_case_not_found404 e safety_admin_required403; não altera transições autorizadas.

Seis expressões SQL BYTE-IDÊNTICAS; list/context/retention e evento imutável não mudam. SELECT FOR UPDATE, changedfalse sem update/evento em repetição, resoluçãonow vsNULL, tenant/actor doauth e ACKreal preservados. Testesnovos em safety-admin-input.controller.test.ts path inventariado AUSENTE antes; nenhum teste existente sobrescrito/removido.12cobrem body/status/note/limite/prioridade/UUIDGETPOST/auth/tenant/membership/role/owneradmin/status4/notas5/params/FORUPDATE/changedfalse/eventsreal/404/RLS/DBerror. Local Node24 transformTS do controllerreal com stubs explícitos Nest/DB/Auth; não substitui CItypecheck/NestHTTP/PostgreSQL/native.

ScriptHTTP EXISTENTE http-safety-e2e.sh estendido, workflowCI já o executa:20JSONs400+UUIDGETPOST400/authGETPOST401/memberGETPOST403/ausênciamembership401 sem mudar listas owner/reporter/eventos reais. Fluxopositivo original open→reviewing e repetiçãoevento único preservado. Depois4transiçõesresolved/dismissed/open/reviewing com notas ausente/null/branco/texto, ACKs e resolvedAt reais, repetir cada estado changedfalse; verificar EXATAMENTE5eventos com atoridentityauth e notas previstas. Guardlocalhostporta antes defixture/rede, bash-n e4URLs externas/hostconfuso/path rejeitados localPASS. HTTPreal ainda depende da CI própria; NÃO afirmar sucesso antecipado.

Publicar branch/PR, revisar diff remoto/bytes/mobiletree/mainlease; exigir CI4web/713mobile/228API/3CLI (12novosAPI) completa no SHAexato, markersHTTPsafety próprios, frozenlock/typecheck/build/export/migrations/retention/ProductionTruth. APK próprio/pós N/A condicionado paths SOMENTEAPI/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d igual#438: workflowstandalonepathfilter não cobreAPI e dependências/mobile/scriptsnative intactos. Não inventar APK de outro SHA. Merge uma vez só com gates aplicáveisPASS, confirmar pais/tree/main/CIpós. Próprio corpoPR guarda SHA/runs gerados após snapshot; consolidar evidências/checkpoint no mesmo ciclo.

Próximoitemseguro após esta correção: SafetyAppealsController.create (body.reason?.trim/UUID) e SafetyAppealsAdminController.status/events (JSON/note/UUID), preservar reasonlimit4000, note opcional2000, auth/reporterACL/owneradmin/advisorylock/policy/same/conflict/SQL. Revalidar fonte e inventáriotestes, reproduzirRED antes de qualquer mudança. Cancellation.reason e Replacement.select/create independentes continuam auditados; não decidir política de compensação nem mudar scheduling/race sem prova.

React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Sem custo/serviços/deploypago/PSP/dinheiro/mensagens reais. FísicoAndroid/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSP/KYC/FIN-RISK/Webpago seguemOPEN; projeto em andamento e rotina mantida, não exigir continuar.


## Recursos de segurança: validação de entradas — 2026-10-11 12:06:45 UTC

Estado de partida confirmado: main 3de10488b64a90139386fc2b6f5617744b35100c, tree 16a7b201a1039e69c01c82472102cbf229471dbc, PR #446 integrado uma única vez. CI do head eebfcb74debcc6891c1345ffb688bb7f23e924ae: run 38137493375/job 114464260065 PASS; pós-merge no SHA 3de10488b64a90139386fc2b6f5617744b35100c: run 38137742579/job 114464986458 PASS. Ambos: 4 testes web, 713 mobile, 228 API, 3 CLI, todos os steps aplicáveis, fluxo HTTP original e os dois markers novos da revisão de segurança. Pais [b4b45e4482ea08e3e1706318b8757f238201fe0c,eebfcb74debcc6891c1345ffb688bb7f23e924ae] e tree aprovada 16a7b201a1039e69c01c82472102cbf229471dbc conferidos. Recibo final persistido no corpo de https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/446. README, Documento da Verdade ORIGINAL v1.104, memória, checkpoint, fonte, inventário e workflows relidos na main; histórico integral preservado.

Falhas reproduzidas no controller real de recursos: criação/revisão com JSON nulo provoca TypeError, nota não textual provoca TypeError, UUID malformado chega ao SQL. A criação agora recebe unknown e exige objeto não array, safetyCaseId UUID canônico genérico e reason textual não vazio, com trim e limite de 4000 unidades UTF16 preservados. Revisão recebe unknown e valida status textual no enum existente; note continua opcional, null/vazio/espaços continuam NULL, valores não textuais retornam 400, limite 2000 após trim preservado. Events/status rejeitam UUID inválido com safety_appeal_invalid 400 antes de SQL/advisory lock, sempre depois de auth, tenant, membership e owner/admin quando aplicável. Erros de status/nota, 404 real e 403 de acesso mantidos.

Onze expressões SQL preservadas byte a byte. Não muda RLS, ACL reporter/professional/owner/admin, ON CONFLICT e retorno do motivo original em repetição, pg_advisory_xact_lock, eventos imutáveis ou política de transição: mesmo estado changed:false sem evento; terminal não reabre, conflito 409. Teste existente safety-appeal-policy.test.ts e policy preservados integralmente. Treze testes novos em safety-appeals-input.controller.test.ts, path comprovadamente ausente na base, sem sobrescrever testes: criação, limites, parâmetros autenticados, duplicação, ACL/404, prioridade auth/tenant/membership/owner-admin, JSON/status/nota/UUID, notas opcionais, 25 pares de transição, eventos e propagação de falha de DB. Local Node24 com transformação do controller real e stubs explícitos Nest/Auth/DB: antes 13 PASS/4 FAIL de 17 (inclui quatro policy existentes), depois 17 PASS. Falha inicial do harness por import de tipo foi corrigida apenas no harness antes do RED válido; não é falha do projeto. Local não substitui typecheck/NestHTTP/PostgreSQL.

Script HTTP existente http-safety-appeals-e2e.sh estendido: 26 JSONs inválidos de criação e 20 de revisão, UUID inválido GET/POST, auth/membership/role negativos; compara listas e eventos reais antes/depois para provar nenhuma mutação. Fluxo original com profissional relacionado, duplicate original reason, tenant isolation, revisão humana, dois eventos e terminal 409 preservado. Segundo recurso do owner testa reason4000 após trim, nota omitida/null, actor autenticado e datas reais, repetição sem duplicação, terminal fechado sem novo evento; verifica que eventos do recurso profissional permanecem intactos. Guard local http://localhost ou127.0.0.1 com porta explícita antes de fixtures/rede, mktemp/trap em vez de arquivo /tmp compartilhado; bash -n e quatro URLs externas/ambíguas rejeitadas localmente PASS. HTTP real depende de CI própria e pós no SHA exato: não alegar aprovação antecipada.

Publicar branch/PR, revisar diff e nove paths/bytes, exigir CI própria completa com 4web/713mobile/241API/3CLI, frozen lockfile, typecheck, build/export Android, migrations, retention, HTTP e Production Truth. Confirmar markers específicos de criação inválida, revisão inválida, notas opcionais/idempotência e fluxo original. Só integrar com gates aplicáveis PASS, lease main/head atuais; confirmar pais/tree/main e pós-CI nas mesmas contagens/markers. Recibo final no corpo da PR após geração dos SHAs/runs; consolidar documentação/checkpoint no mesmo ciclo. APK próprio/pós N/A para estes paths apenas API/docs: mobiletree 4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao #438, nenhuma alteração de dependências, mobile ou workflow/script native; não atribuir APK de outro SHA. Referência #438 pós-APK run38133235730 no SHA27e96142ecde5efa10adb05ef436bb5a3f123865 prova emulador/noMetro, não físico.

Próxima ação segura após integração: reconsultar main/PRs/gates e auditar CancellationController.reason e ReplacementController.create/select, reproduzindo falhas runtime concretas e preservando suas políticas/SQL antes de mudar código. Não mudar compensação financeira, scheduling ou semântica de substituição sem requisito/prova. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Zero custo, contratação, deploy pago, dinheiro real, PSP ou mensagens reais. Android físico/Visual Truth/E2E/SecureStore/piloto, pentest independente e providers/PSP/KYC/FIN-RISK/Web pago permanecem OPEN. Projeto em andamento; bloqueio isolado não encerra os demais trabalhos.



### Correção do teste após CI própria

Head inicial 76a08b4e421ec5b8c91ec2c73b249a44f54d8e05, CI38138064763/job114465949006 FAILED no typecheck: TS2532 em safety-appeals-input.controller.test.ts linha87, query[0] possivelmente ausente. Log completo inspecionado; build/testes/HTTP posteriores SKIPPED não são aprovação. Corrigida somente asserção: obter lock, assert.ok(lock), então conferir SQL. Sem mudar controller/policy/SQL/expectativas nem remover testes. Testes locais repetidos e nova CI inteira obrigatória em novo SHA; não rerun cego, não reutilizar gate do head falho. Histórico de falha preservado.


## Cancelamento: validação runtime sem alterar política financeira — 2026-10-11 12:13:09 UTC

Base reconsultada main dc3b70d61153c6e8a1d14ca0f6678f4586667ffa, tree e42ed66bb9d8664f81076320c487cb67f1451b24. #447 já integrado uma vez, head aprovado 88da0e014bbbc74cef13b860aa6fa60595564f73, CI38138158446/job114466235501 PASS4web/713mobile/241API/3CLI e quatro markers HTTP de recursos; pais [3de10488b64a90139386fc2b6f5617744b35100c,88da0e014bbbc74cef13b860aa6fa60595564f73] e tree e42ed66bb9d8664f81076320c487cb67f1451b24 confirmados. Pós-CI38138345123 no SHA dc3b70d61153c6e8a1d14ca0f6678f4586667ffa estava em execução na consulta, não é PASS antecipado: acompanhar e persistir recibo. Histórico da falha de typecheck no primeiro head #447 preservado, corrigido sem remover expectativas; aprovação só do head resultante. #446 own/pós PASS e recibo já consolidados em docs/PR446. README, DVT ORIGINAL v1.104, memória, checkpoint, controllers, HTTP e inventário lidos na base atual.

CancellationController tinha TypeError em JSON null ou motivo não textual, e UUID malformado era enviado ao SQL. Corrigido com Body unknown: objeto não array, reason textual com trim, obrigatório não vazio, limite 1000 unidades UTF16 já existente, erro cancellation_reason_required400. UUID canônico genérico rejeita assignment_invalid400 antes do DB, depois de auth, tenant, membership e validação do motivo. Três consultas SQL byte-idênticas, sem alterações de política: só confirmed/checked_in, própria pessoa profissional ou owner/admin/manager/company, initiatorKind derivado de auth, ON CONFLICT conserva registro, update condicional e cancellation_conflict existentes, estado não cancelável continua400. compensationPolicy permanece EXATAMENTE none_until_fin_risk_policy_approved; não calcula, habilita nem promete compensação.

Nove regressões novas em cancellation-input.controller.test.ts (path ausente confirmado, nenhum teste existente substituído): JSON/reason/limite, UUID, auth/tenant/membership, parâmetros autenticados, ACL/papéis, escopo de status, conflito de update/durabilidade SQL, falta de assignment e DBerror. Controller real transformado Node24 com stubs explícitos Nest/Auth/DB: antes7PASS/2FAIL, depois9PASS. Local não substitui CI typecheck/HTTP/PostgreSQL.

Script HTTP EXISTENTE http-replacement-e2e.sh estendido com17JSONs inválidos de cancelamento, UUID inválido, ausência de auth e ator profissional não relacionado; compara as duas listas de assignments e replacement list antes/depois sem alteração real. Fluxo original de substituição preservado e verificado ANTES dos cancelamentos positivos. Depois usa somente as duas assignments CI confirmadas (seed e substituta): profissional cancela a própria com reason1000 após trim; owner cancela a substituta; ambos ACKs reais id/status/initiatorKind/compensationPolicy e GET assignments tenant/cancelled. Repetição em já cancelada continua400, replacementmatched não muda. Não executa mensagens externas nem dinheiro; fixtures em API local isolada. Guard localhost/127.0.0.1 porta antes de rede, mktemp/trap, bash-n e quatro URLs não locais/ambíguas rejeitadas PASS local. HTTP real ainda exige CI própria/pós no SHA exato; não alegar sucesso antecipado.

Publicar branch/PR, revisar nove paths e bytes remotos/lease; CI obrigatória4web/713mobile/250API/3CLI, typecheck/build/export/frozenlock/migrations/retention/HTTP/ProductionTruth completos e dois markers HTTP de cancelamento + originalreplacement. Integrar só após gates aplicáveis PASS e #447 pós confirmado; conferir pais/tree/main e pós-CI mesmoSHAcontagens. Recibo final no corpoPR após geração dos SHAs/runs, documentos/checkpoint consolidados no ciclo. APK próprio/pós N/A por pathsAPI/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438; workflows/deps/mobile/native não alterados. Não atribuir APK de outroSHA; referência#438 noMetro/emulador não prova aparelho físico.

Próxima pendência segura: ReplacementController.create/select ainda aceitam bodies tipados sem validação runtime, create.reason?.trim e select.professionalId com UUIDs não validados (inclui rotas candidates/auto-match). Fonte atual relida; reproduzir regressões e corrigir só entrada preservando reason OPCIONAL sem inventar limite, company-role ACL, ranking, active_tenant_professional, disponibilidade, SQL e política de substituição. Questões de lifecycle/scheduling/compensação precisam requisito/prova específica, sem mudança implícita. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho intactos; zero custo/deploypago/PSP/dinheiro real. Físico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSP/KYC/FIN-RISK/Webpago OPEN. Projeto em andamento; próximos itens independentes continuam autorizados.



## Substituição: validação runtime preservando ranking e disponibilidade — 2026-10-11 12:18:41 UTC

Base main 3ee73c73229d1034324a858b65bd73bfd73d314e, tree 03e5e2f71e6572514cd52efeb352bec4c3c5d6e4 reconsultada com README, DVT ORIGINALv1.104, memória, checkpoint, código, HTTP e inventário. PR #448 integrado uma vez, head2a128e6f450cb31508ac34a5f77bb7fdca28a4a7 aprovado em CI38138438300/job114467066599 PASS4web/713mobile/250API/3CLI, dois markers HTTPcancelamento e originalreplacement. Pais [dc3b70d61153c6e8a1d14ca0f6678f4586667ffa,2a128e6f450cb31508ac34a5f77bb7fdca28a4a7], tree03e5e2f71e6572514cd52efeb352bec4c3c5d6e4 confirmados. Pós-CI38138677504 no SHA3ee73c73229d1034324a858b65bd73bfd73d314e em execução na última consulta, acompanhar sem afirmar PASS. #447 pós-CI38138345123/job114466789634 confirmadoPASS4/713/241/3, todossteps/quatro markersrecursos no SHA dc3b70d61153c6e8a1d14ca0f6678f4586667ffa; recibo final persistido na PR447. #446 receipt/pass já registrados. Nenhum merge repetido.

ReplacementController create/select recebiam JSON tipado sem validar runtime: body null e reason não textual provocam TypeError, professionalId e IDs de rota malformados chegam ao SQL. Bodyunknown exige objeto não array; create reason continua OPCIONAL (ausente/null/vazio/espaços → NULL), texto trim e sem inventar limite inexistente, invalid400 replacement_reason_invalid. select exige professionalId textual UUIDcanônico genérico, mantendo erro professional_required400. IDs de candidates/auto-match/select rejeitam replacement_invalid400; create assignment inválido assignment_invalid400. Tudo depois de auth/tenant/membership/company role e antes de SQL.

Quatorze expressões SQL byte-idênticas e corpo do método ranked byte-idêntico. Sem alterar ranking/candidatos/score, active_tenant_professional, disponibilidade real, filtros tenant, company roles owner/admin/manager/company, status replaceable confirmed/checked_in/in_progress, requestopen, INSERTassign/UPDATEorig/UPDATErequest, recipientnotification resolvido DB, ou upsert de reason existente. Não resolve implicitamente lifecycle/concurrency, scheduling, custos ou política financeira.

Dez testes novos em replacement-input.controller.test.ts, path ausente comprovado, sem sobrescrever testes: criação/seleção JSON e tipos, motivos opcionais/no-limit, quatro pathsUUID, auth/tenant/membership/company roles, status/reqopen/activecandidate/disponibilidade antes de writes, parameters tenant/notificationrecipient e ACK real, assignment404-equivalenteerroexistente, DBerror. Local controller real transformado Node24 com stubs explícitos Nest/Auth/DB e ranking helpers NÃO executados (stubs lançam se chamados): antes7PASS/3FAIL, depois10PASS. Não comprova ranking local, HTTP/typecheck/PostgreSQL dependem da CI. FluxoHTTPoriginal comprova ranking e substituição real.

ScriptHTTPexistingreplacement (incluindo regressões de cancelamento #448) estendido sem remover fluxo anterior:12JSON inválidos create e16select, UUIDcreate/select/candidates/auto-match, auth401 e companyrole403; compara assignmentsdasduaspessoas e requestsreais sem mutações. Seis upserts válidos no requestoriginal provam reason omitido/null/vazio/espaços/texto e texto5000 apóstrim, mantendo id/assignment/status e motivoDBreal. Depois fluxo original auto-match/replacementconfirmed/cancelaorig e positivoscancelamento permanecem. Guardlocalhost/mktemp/trap preservados; bash-n PASSlocal. HTTPreal ainda exige CI completa no SHAexato antes de declarar aprovação.

Exigir CIprópria4web/713mobile/260API/3CLI e todossteps frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth; markers específicos criação inválida/seleção+motivos opcionais, os dois cancelamento e originalreplacement; antecessor #448 pósPASS. Revisar diff novepaths/bytes remotos/lease; merge só gatesaplicáveisPASS, confirmar pais/tree/main e CIpós exato. APKpróprio/pósN/A porAPI/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438; deps/workflow/native/mobile intactos, nenhumAPKdeoutroSHAatribuído. #438emulador/standalone/noMetro não prova físico. Recibo final no corpoPR após SHAs/runsgerados, consolidar evidências/checkpoint sem hashesautorreferentes e preservandohistória.

Próxima ação concreta: verificar CIpós/main atual, auditar WorkAssignmentsController e CareerConversionController usando requisitos vigentes, reproduzir falhas runtime/tenant/estado reais antes de qualquer mudança. Questões delifecycle e concorrência substituição ficam separadas, precisam prova/requisito sem mudança implícita. Preservar React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho. Sem custo/contratação/deploypago/PSP/dinheiro real. FísicoAndroid/VisualTruth/E2E/SecureStore/piloto, pentest independente, providers/PSP/KYC/FIN-RISK/Web pago OPEN; projeto não concluído, itens independentes continuam autorizados.



## Notificações: UUID runtime sem alterar autoridade ou idempotência — 2026-10-11 12:23:48 UTC

Base main 334900b6903cc3137d50e90bbfc2e7b98306645c, tree 7b000d4c9c71d55862ab9406c97c41cb85d6c9e1, README/DVT ORIGINALv1.104/memória/checkpoint/fonte/HTTP/inventário reconsultados. #449 integrado uma vez, head e4322dc8679a173e977bd28ba07e07789928939d e CI38138783719/job114468104555 PASS4web/713mobile/260API/3CLI, todossteps e markerscriação/seleção/optionalreason/cancelamento/originalreplacement. Pais [3ee73c73229d1034324a858b65bd73bfd73d314e,e4322dc8679a173e977bd28ba07e07789928939d], tree7b000d4c9c71d55862ab9406c97c41cb85d6c9e1 aprovada confirmada. Pós-CI38139014848 no SHA334900b6903cc3137d50e90bbfc2e7b98306645c em execução na consulta: aguardar, não afirmar PASS. #448 pós-CI38138677504/job114467779616 PASS4/713/250/3 no SHA3ee73c73229d1034324a858b65bd73bfd73d314e com todossteps/markers, recibo final na PR448. #446/#447 own/pós já aprovados e registrados; não repetir merges.

Falha concreta: NotificationsController.read enviava UUIDmalformado ao SQL, causando500 em vez de400. Uma guarda UUIDcanônico genérico (case-insensitive) adicionada APÓS identity/tenant_required/membership e ANTES db.tenant. Erro notification_invalid400, sem mudar três SQL, unread/mine/tenantIds/sort, UPDATE identity_id+tenant_id, COALESCE read_at idempotente, retorno da row real ou null para inexistente/estrangeiro. Nenhuma mensagem ou notificação externa é enviada por esta operação.

Seis regressões novas em notifications-input.controller.test.ts, path inventariado AUSENTE: UUIDmalformado/noDB, prioridadeauth, requiredtenant/membership, row/timestamp real e parâmetros trusted, UUIDcomletrasuppercase, nullmissing/foreign e DBerror. Controller real transformado Node24 com stubs explícitos Nest/Auth/DB: antes5PASS/1FAIL, depois6PASS; não substitui typecheck/NestHTTP/PostgreSQL. Nenhum teste existente removido/substituído.

HTTPexistente http-notifications-multi-company-e2e.sh preserva duas empresas/memberships e notificações reais geradas por confirmações de assignment. Acrescenta3UUIDs400, auth401, tenantmissing400, membership401, receiver errado e tenantválidoerrado (contrato existente201/null), compara lista completa e unreadcountreais antes/depois sem mudança. Marcar a row própria retornaACK id/readAtDBreal; repetir mantém readAt e decrementarunread EXATAMENTEuma vez. Fluxooriginal agregado preservado. Guardlocalhostporta antesdefixtures/rede, mktemp/trap, bash-n e quatroURLsexternas/ambíguas rejeitadas PASSlocal. HTTPreal exige CIprópria/pós noSHAexato; não afirmar antecipadamente.

Branch/PR deve ter novepaths/bytes/diff revisados; CIprópria4web/713mobile/266API/3CLI completa frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth e dois markersnovosnotification+original. Confirmarpredecessorpós449PASS; merge só gatesaplicáveisPASS/lease, verificarpais/tree/main/pós exato. APK próprio/pós N/A porpathsAPI/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438, deps/native/mobile/workflows sem mudanças; nenhumAPKdeoutroSHAatribuído. #438emuladornoMetro não prova físico. Recibo final no corpoPRapósSHAs/runsgerados, consolidarDVT/memória/ledger/evidência/checkpoint no mesmociclo preservando história.

Auditoria próxima já executada em fonte: CareerConversionController já usa conversionProposalInput/DecisionInput/conversionId, não reimplementar nem criar tarefa baseada em body tipado antigo. WorkAssignmentsController.transition ainda leva id de rota sem validar UUID ao SQL e converte coordenadas via Number, aceitando valores coercíveis; próxima ação concreta é reproduzir pathmalformado e confrontar optionalCoordinates/requisitos antes de mudar validação GPS. Não tornar GPS obrigatório nem mudar lifecycle/ledger/compensação por inferência. Lifecycle/concurrency de replacement é questão separada, não resolvida por guardas. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Sem custo/deploypago/PSP/dinheiro real; físico/VisualTruth/E2E/SecureStore/piloto, pentest, providers/PSP/KYC/FIN-RISK/Webpago OPEN. Projeto não concluído; checkpoint permite retomada sem pedir continuar.



## Transições de trabalho: rejeitar UUID inválido antes do SQL — 2026-10-11 12:30:07 UTC

Base main 4bf72d0a960b3e1b154997db8181575a5c5ec3c3, tree b06728234e23f6a6b812efac33a4e3bfed09886c reconsultada; README aponta DVT ORIGINALv1.104, memória/checkpoint/fonte/helper/testes/HTTP lidos, história integral preservada. #450 integrado uma vez, headbdba5be156e7ceb95dcdb8e965641fb2f19ac263 e CI38139102667/job114469064477 PASS4web/713mobile/266API/3CLI, todossteps e os dois novos markersnotification+original. Pais [334900b6903cc3137d50e90bbfc2e7b98306645c,bdba5be156e7ceb95dcdb8e965641fb2f19ac263], treeb06728234e23f6a6b812efac33a4e3bfed09886c aprovada, main verificada. Pós-CI38139347035 no SHA4bf72d0a960b3e1b154997db8181575a5c5ec3c3 em execução na consulta, acompanhar sem anteciparPASS. #449 pós-CI38139014848/job114468799720 PASS4/713/260/3 no SHA334900b6903cc3137d50e90bbfc2e7b98306645c, todossteps/5markersreplacement/cancelamento, recibo finalPR449. Antecessores446–448 own/pósjáregistrados; não repetirmerges.

Falha reproduzida em WorkAssignmentsController.transition: IDs malformados de check-in/start/check-out/complete entram no SQL/UUID e causam500. Adicionada SOMENTE uma guarda UUIDcanônico genérico case-insensitive depois de auth/tenant/membership e antes db.tenant/profileSQL, erro assignment_invalid400. Remover textualmente a guarda reproduz o arquivo anterior BYTE A BYTE: GPS/coords/Number/conversão/limites/profile404, lifecycle, SQLdinâmico/stamps, tenant/identity/ownprofessional/statusfilters e ledger preservados. Sem alterar dinheiro ou compensação.

Nove regressões novas em work-assignments-input.controller.test.ts (pathausente comprovado); helper assignment-lifecycle.ts e seus dois testes existentes preservadosbyte-idênticos. Controller real transformado Node24 com helperreal e stubs explícitos Nest/Auth/DB: antes10PASS/1FAIL de11, depois11PASS. Cobrem quatro rotas inválidas/noDB, auth/tenant/membership, ACKreal e UUIDuppercase/params/profile/tenant/statusfilters, GPSopcional/pair/bounds atuais, profile404, updateinvalidsemledger, ledger interno existente payable/onconflict scoped e DBerror. Local não substitui typecheck/NestHTTP/PostgreSQL nem comprova localização física.

ScriptHTTPexistingjourney preserva signup/profile/jobs/confirm/chat/replacement/talent/ratings/earnings/passport. Nas quatro rotas,3IDs inválidos400+auth401+tenantmissing400+membership401+tenantválidoerrado400+ownernão-professional404, compara assignments e earnings reais antes/depois sem mutações. Fluxo original semGPS continua check-in/start/check-out/complete, agora valida ACKid e timestampsDBreais; cada replay mantém erro400, completion earnings comparadas imediatamente antes/depois replay sem duplicação. Guardslocale existentes preservados; bash-nPASSlocal. HTTPreal só apósCIprópria/pós no SHAexato.

Exigir CIprópria4web/713mobile/275API/3CLI completa frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth, dois markersnovosassignment+journeyoriginal; predecessor450pósPASS. Revisar novepaths/diff/bytes/lease; merge sógatesaplicáveisPASS, confirmarpais/tree/main e pósCIexato. APKpróprio/pósN/A pathsAPI/docs/mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438, deps/native/workflows/mobileintactos; nenhumAPKdeoutroSHAatribuído. #438install/launch/noMetroEMULADOR não prova físico. Recibo final no corpoPRapósgeraçãoSHAs/runs e consolidar documentos/checkpoint mesmo ciclo.

Próximaação concreta: consolidar recibos próprios/pós446–451 apósconclusão e revalidar main/PRs/gates. Coordenadas via Number continuam questão auditada separada: APIaceitaJSONcoercível; confrontar optionalCoordinates/contratoGPS e reproduzir antes de mudar tipos, mantendo GPSopcional e sem alegar prova de localização física. CareerConversion já tem validadores, não reimplementar. Auditar próximo controllercom pendência real antesdecriar tarefa; ausênciaPR não conclusão. Lifecycle/concurrencyreplacement separado, sempolíticaimplícita. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho intactos. Zerocusto/deploypago/contratação/PSP/dinheiro real. FísicoAndroid/VisualTruth/E2E/SecureStore/piloto, pentest/provider/PSP/KYC/FIN-RISK/WebpagoOPEN; projetoandamento e retomadaindependenteautorizada.



## GPS runtime: impedir coordenadas inventadas por coerção — 2026-10-11 12:41:55 UTC

Base main 6b7699b02c4f200356fcba5958de6eb937e983f9, tree 1fb88bf06a88d5acb6740575612b06ca4bf44fa8; README/DVT ORIGINALv1.104/memória/checkpoint já lidos na base; main/PRs/inventário/fonte/HTTP/helper/testes reconsultados. Todas as seis correções446–451 own/pós PASS no SHAexato, pais/tree iguais candidatos e mainconfirmada; nenhum merge repetido. #451 own38139500293/job114470246544, pós38139768716/job114471036384 PASS4web/713mobile/275API/3CLI no head2047bf849a3fbfa5a33f000669f53e48e0fa2923 e merge6b7699b02c4f200356fcba5958de6eb937e983f9, todossteps/2markersassignment+journey. Recibos completos nos corposPR. Tabela primária:

| PR | Head aprovado | Merge main | CI própria / pós (PASS) | Testes API / novos |
|---|---|---|---|---|
| [#446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/446) Revisão de segurança | eebfcb74debcc6891c1345ffb688bb7f23e924ae | 3de10488b64a90139386fc2b6f5617744b35100c | [38137493375](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137493375) / [38137742579](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137742579) | 228 / +12 |
| [#447](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/447) Recursos de segurança | 88da0e014bbbc74cef13b860aa6fa60595564f73 | dc3b70d61153c6e8a1d14ca0f6678f4586667ffa | [38138158446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138158446) / [38138345123](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138345123) | 241 / +13 |
| [#448](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/448) Cancelamento | 2a128e6f450cb31508ac34a5f77bb7fdca28a4a7 | 3ee73c73229d1034324a858b65bd73bfd73d314e | [38138438300](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138438300) / [38138677504](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138677504) | 250 / +9 |
| [#449](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/449) Substituição | e4322dc8679a173e977bd28ba07e07789928939d | 334900b6903cc3137d50e90bbfc2e7b98306645c | [38138783719](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138783719) / [38139014848](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139014848) | 260 / +10 |
| [#450](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/450) Leitura de notificações | bdba5be156e7ceb95dcdb8e965641fb2f19ac263 | 4bf72d0a960b3e1b154997db8181575a5c5ec3c3 | [38139102667](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139102667) / [38139347035](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139347035) | 266 / +6 |
| [#451](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/451) UUID nas transições de trabalho | 2047bf849a3fbfa5a33f000669f53e48e0fa2923 | 6b7699b02c4f200356fcba5958de6eb937e983f9 | [38139500293](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139500293) / [38139768716](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139768716) | 275 / +9 |

Auditoria do controller real (Node24 com fixtures/stubs explícitos) reproduziu false/false, strings vazias e arrays[0]/[0] convertidos por Number em parâmetros0,0 do UPDATE; strings numéricas também coagidas. Isso não é GPSreal. Fonte canônica mobile agenda.optionalCoordinates relida: retorna lat/lng NUMBER de expo-location ou null em denied/error/timeout, tipo Coordinates={lat:number;lng:number}. Migration0012 usa doubleprecision nullable + limites90/180. Sem mudar client/schema, a API deve preservar números e ausência, rejeitar tipos JSON incorretos.

Bodycheck-in/out e coords agora unknown; após auth/tenant/membership/UUID e profileexistente, não-null requer objeto não array (location_invalid400). Campos não-null devem aparecer em par (location_pair_required anterior), ser NUMBER finito e respeitar limites existentes (latitude_invalid/longitude_invalid400). Removida coerção Number: false/texto/arrays não viram0,0. Ausência/undefined/null/{}/doiscamposnull continuam semGPS; zero numérico, floats e extremos válidos continuam aceitos. Prioridade profile404 e authgates preservada, sem mover validação GPS para antes da autoridade. TodasSQL/stamps/geo assignments/params/tenant/lifecycle/ledger e helper/doistestespolicy/noveunit451 preservados; sem geofence ou GPS obrigatório. Tipagem não comprova origem/proveniência/localização física.

Oito regressões novas em assignment-coordinates.controller.test.ts, pathausente, nenhumtesteexistente alterado: lat/lngnão-números/bodyshape, númeroszero/floats/limites, ausência/pair/bounds/prioridades, auth/tenant/member/UUID/profile, start/completion/ledger intactos. Local controllerreal/helperreal com stubs Nest/Auth/DB: antes16PASS/3FAIL de19 (8novos+11existentes), depois19PASS. Não substitui typecheck/NestHTTP/PostgreSQL.

HTTPjourneyexisting preserva todasregressõesanteriores e fluxo originalsemGPS. Novos28JSONs (6bodyshape+7lat+7lng+4pair+4bounds) por check-in/check-out, total56respostas400 com mensagemespecífica, compara assignments e earnings antes/depois sem mudança. SegundoassignmentCI de empresaB testa GPSnumérico0,0 e90,180 em check-in/out, ACKid/status/timestamps reais, semcompletion/ganhosnovos; fluxoA continua semGPS e passportcompletedcount1 preservado. Coordenadas são valores EXPLÍCITOS de fixture, não leitura física. mktemp/trap/guardlocal/bash-n PASSlocal; HTTP/PG/typecheck só após CIcompleta no SHAexato.

Exigir CI própria4web/713mobile/283API/3CLI e todossteps frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth, novosmarkersGPSnegativo/positive+journeyoriginal+markers451. Revisar novepaths/diff/bytes/lease, merge sógatesaplicáveisPASS; conferirpais/tree/main e pósCIexato. APKpróprio/pósN/A porAPI/docs/mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438, deps/native/mobile/workflows intactos. Não atribuir APK de outroSHA, emulador≠físico. Consolidar evidências/memória/ledger/DVT/checkpoint no mesmociclo, recibofinalnocorpoPRapósSHAs/runsgerados, preservarhistória.

Próxima ação: verificar pós destePR e consolidar recibos446–452, revalidar main/PRs/code/ledger e auditar próximoendpoint com falha concreta (Privacy/Copilot inputs), sem mudanças de política de dados/decisõesIA/providers por inferência. CareerConversion já protegido; não reimplementar. Lifecycle/concurrencyreplacement separado, exige prova específica. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho intactos; zerocusto/deploypago/contratação/PSP/dinheiro. FísicoAndroid/VisualTruth/E2E/SecureStore/piloto, pentest/providers/PSP/KYC/FIN-RISK/WebpagoOPEN; projetoandamento, rotinaativa e próxima ação independente sem pedir continuar.


## Copilot runtime e consolidação de recibos #446–#452 — 2026-10-11 12:52 UTC

Base main `8d5fc2d8af3cd945b33ac9a8e04414c3e85ac75b`, tree `00c029a3a2e49337b78c0e0a9a7247f784d94d79`; README/DVT ORIGINAL v1.104/memória/checkpoint e main/PRs/código/CI relidos. #452 own38140257625/job114472501945 e pós38140584506/job114473459916 SUCCESS no head a6158e4c1bc2adf1b728cc4d97a49c2f99ee05bb e merge8d5fc2...; 4web/713mobile/283API/3CLI, zero falhas, todos steps completos e cinco markersGPS/assignment/journey. Sete correções446–452 próprias/pós PASS, +67 testesAPI216→283; nenhum merge repetido. Recibos finais em docs/evidencias/API_RUNTIME_RECEIPTS_446_452_2026-10-11.md, evidências individuais atualizadas por acréscimo. Tabela primária:

| PR | Head aprovado | Merge main | CI própria / pós (PASS) | Testes API / novos |
|---|---|---|---|---|
| [#446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/446) Revisão de segurança | eebfcb74debcc6891c1345ffb688bb7f23e924ae | 3de10488b64a90139386fc2b6f5617744b35100c | [38137493375](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137493375) / [38137742579](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137742579) | 228 / +12 |
| [#447](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/447) Recursos de segurança | 88da0e014bbbc74cef13b860aa6fa60595564f73 | dc3b70d61153c6e8a1d14ca0f6678f4586667ffa | [38138158446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138158446) / [38138345123](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138345123) | 241 / +13 |
| [#448](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/448) Cancelamento | 2a128e6f450cb31508ac34a5f77bb7fdca28a4a7 | 3ee73c73229d1034324a858b65bd73bfd73d314e | [38138438300](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138438300) / [38138677504](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138677504) | 250 / +9 |
| [#449](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/449) Substituição | e4322dc8679a173e977bd28ba07e07789928939d | 334900b6903cc3137d50e90bbfc2e7b98306645c | [38138783719](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138783719) / [38139014848](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139014848) | 260 / +10 |
| [#450](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/450) Leitura de notificações | bdba5be156e7ceb95dcdb8e965641fb2f19ac263 | 4bf72d0a960b3e1b154997db8181575a5c5ec3c3 | [38139102667](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139102667) / [38139347035](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139347035) | 266 / +6 |
| [#451](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/451) UUID nas transições de trabalho | 2047bf849a3fbfa5a33f000669f53e48e0fa2923 | 6b7699b02c4f200356fcba5958de6eb937e983f9 | [38139500293](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139500293) / [38139768716](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139768716) | 275 / +9 |
| [#452](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/452) GPS opcional sem coerção | a6158e4c1bc2adf1b728cc4d97a49c2f99ee05bb | 8d5fc2d8af3cd945b33ac9a8e04414c3e85ac75b | [38140257625](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38140257625) / [38140584506](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38140584506) | 283 / +8 |

Falha seguinte comprovada no controller real antes da correção: read(null/undefined) acessava body.tool; interpret(null/undefined) acessava body.text; textos JSON não string provocavam TypeError.trim; modos false/0/'' passavam pelo teste de truthiness e eram propagados como modos inválidos. Dez regressões NOVAS em copilot-input.controller.test.ts, inventário confirmou path ausente; seis testes originais de policy/tools permanecem byte idênticos. Harness local transpila controller/policy/tools reais e usa stubs explícitos Nest/Auth/DB: RED12PASS/4FAIL de16, GREEN16PASS. Não é evidência NestHTTP/PostgreSQL/typecheck.

read/interpret agora Body unknown e validam objeto não-array. read exige tool string do allowlist pelo accountType existente; mantém auth→memberships→toolACL→tenant/membership→SQL. interpret text string.trim não vazio≤2000, mode nullish mantém assisted; demais valores exigem enum manual/assisted/automatic, texto invalid precede modo invalid, auth antes de ambos. Policy/tools/provider/advisoryOnly/requireHumanConfirmation/executionAllowed=false/read_only_explicit e sete SQL literais/params/tenant/identity/profile intactos. Sem chamadas LLM/provedor/custos, decisão automática ou writes.

HTTPcopilot original preservado (intents/notifications/criticalaction/signout), adicionados guardlocalhost/mktemp/trap; profile fixture disposable real para leituras;76 JSON400/message específicos nos dois accountTypes, ausênciaAuth401, tenantmissing400, tenantalheio401, toolACL400. Compara seis leituras reais antes/depois (dashboard/planner/exceptions/career/week/support) sem mudança e verifica vazios reais das fixtures; cinco modos(enum3+omitted+null)×2accounts mantêm provider deterministic_baseline/providerConfiguredfalse/humanconfirmation/noexecution. bash-nPASS local. Typecheck/NestHTTP/PG e novosmarkers só comprovados após CI completa no SHAexato; exigir4web/713mobile/293API/3CLI própria e pós, revisar diff/bytes/lease/pais/tree antesde integrar.

APKpróprio/pós N/A por API/docs/mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica438; referência standalone438 verificada em emulador semMetro, não execução destaPR nem prova física. React19.1.4/RN0.81.6/frozenlock/tenant/RLS/desenho/rootnativeworkflows intactos. Não habilitar dinheiro/PSP/custos/deploy pago. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest/provedores/PSP/KYC/FIN-RISK/Webpago continuam OPEN; projeto em andamento.

Próxima ação concreta: acompanhar CI própria deste candidato, rever diff e integrar somentePASS, verificar pós SHAmerge e atualizar recibo final no corpoPR (SHAs gerados posteriormente). Revalidar main/README/memória/checkpoint e auditar Privacy requestType/details: String coage arrays/objetos para solicitações reais. Corrigir sóruntime, sem mudar políticas de direitos/retention/deactivation/exports ou ativarprovedor. Um gate externo isolado não bloqueia estas tarefas independentes; não exigir continuar nem encerrar rotina por roundend.


## Privacidade manual e continuidade pós-#455 — 2026-10-11 15:54 UTC

README, Documento da Verdade ORIGINAL v1.104, memória, checkpoint e GitHub relidos. Base main `9f4668266129b65978a0003782693561d6404498`, tree `236bbdba89dda0408de6f31c2df6953b829b2b79`. #455 integrada uma única vez após revisão dos três arquivos, CI38148843064/job114497813804 SUCCESS (4web/714mobile/293API/3CLI, zero falhas, todos steps), e APK38148843065 attempt2/job114503199280 SUCCESS no mesmo head `c53c2aa5d2dac52f5b354f89374ba89a0b515cea`. Instalação15:42:03.8057917Z e DEVICE_SMOKE_OK15:42:56.2618191Z metro_required=false, emulador, não aparelho físico. ZIP artifact11707162092 size28910971 sha256:3480c1f17599dcb75fc5b9028a4b119513dd439807d560c41f17c493ba97ec96 expira25/10; digest do ZIP, não do APK individual. Primeira tentativa job114497813905 compilou BUILD SUCCESSFUL15:01:22Z mas o emulador falhou ColorBuffer/texture/com.android.phone ANR; logs examinados. Reexecução bounded já autorizada concluída, sem alteração ou novo rerun. Merge455 pais[ee8bade81d5241bac45f4878d2f5ceb595e5812f,c53c2aa5d2dac52f5b354f89374ba89a0b515cea], tree igualhead e mainconfirmadas. PósCI38153041572 e pósAPK38153041663 em acompanhamento, NÃO declarados PASS enquanto executam. Gate físico Android/E2E/VisualTruth segue OPEN.

Memória/checkpoint anteriores ainda apontavam #453; recuperados pela main e PRs reais. PósCI45338141228315/job114475342450 SUCCESS no merge ed64035184c8077df5e01eefab3e8d3fabc381cc, 4/713/293/3, todos steps/HTTP/ProductionTruth; nenhum merge repetido. Branch Privacy anterior só apontava ed640351... e não tinha PR/commit de implementação; retomar com lease e commit filho da main atual, sem perder alterações454/455. Rotina horária permanece ativa, sem criar executor/serviço/custo nem prometer execução contínua.

Pendência concreta independentemente da execução APK: POST privacy/requests usava String(requestType/details), aceitando arrays como tipos e convertendo JSON não-textual em textos fabricados, podendo criar solicitações reais. Código atual revalidado na main; regressões no controller real (stubs explícitos Nest/Auth/DB) antes7PASS/2FAIL de9, após9PASS. NOVO privacy-input.controller.test.ts inexistente no inventário; nenhum teste removido/substituído. Body unknown + objeto não-array; requestType string exatamente no allowlist oito tipos anterior; details nullish preservado, demais exigem string.trim, erro400 privacy_request_details_invalid. Autenticação primeiro; tipo inválido antes de detalhes; quatro tipos com detalhes obrigatórios, limite2000 após trim, optional blank/null/omitted→NULL mantidos. Helpers, todas SQL, list, export/redaction, deactivation/locks/owner/session/assignment/earnings e políticas legais/operador/retention byte idênticos fora do método manual. Sem alterar direitos ou decisões jurídicas.

HTTPprivacy original preservado, inclusive export scoped/redacted e ciclo operador/correction/portability/signout. Acréscimo guardlocalhost/mktemp/trap:88JSON400/message específicos +auth401, comparação GETrequests antes/depois sem novas solicitações;24 JSONválidos (8tipos texto2000+4opcionais×4missing/null/empty/blank) verificam ACK/GETid/status/details textouNULL/datareal e ausência de metadata operador. bash-nPASS local. Typecheck/HTTP Nest/PostgreSQL e markers novos só serão comprovados no CI completo, não inferidos do harness.

Exigir CI própria4web/714mobile/302API/3CLI no head final, todos steps frozen-lockfile/typecheck/build/mobileexport/migrations/retention/HTTP/ProductionTruth SUCCESS, diff9paths/bytes/tree/lease revisados; merge somente com gates aplicáveis, verificar main/pais/tree e pósCI SHAmerge. APK própria/pós desta alteração API/docs N/A pelo path-filter atual de standalone-pilot-apk.yml, sem modificar mobile/rootdeps/lockfile/workflows/scriptsnative. Não atribuir APK455 a este head nem dispensar acompanhamento pós455. Documento ORIGINAL e todo histórico preservados por append, memória/checkpoint/ledger/registro e nova evidência no mesmo commit.

Próxima ação concreta: acompanhar pós455CI/APK e CI desta PR; corrigir falha real se houver, integrar após aprovação aplicável e verificar pós. Persistir recibos finais de cadaSHA/run. Depois revalidar main e auditar inputs de safety-cases.create, trust-events.create/list e terms.accept (não considerar fechados sem prova); preparar regressões antes de corrigir, sem mudar ACL/SQL/categorias/causas/termos/políticas. Não encerrar projeto por faltaPR; gate isolado não bloqueia tarefas independentes. React19.1.4/RN0.81.6/frozenlock/tenant/RLS/desenho preservados. Zero produção Railway alterada diretamente, dinheiro real/PSP/novo serviço/custo/deploypago. Físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/provedores/Webeventualpago continuam separados e OPEN.


## Relato de segurança: JSON e UUID em runtime — 2026-10-11 16:00 UTC

Base main `aad6a27a9595d3f5c37404c52a0c9717c58ad22f`, tree `5e90144760d2092972b9a020cfb31248ba8f8131`; README/DVT ORIGINAL v1.104/memória/checkpoint/código/main/PRs reconsultados. #456 merged uma única vez após próprioCI38153269959/job114510935277 SUCCESS no head3f64b00e4d7379db30839f7e65e6d3b6aea1dd84, 4web/714mobile/302API/3CLI, zero falhas, todossteps e doismarkersprivacidade+export/operator original reais. Merge/pais[9f4668266129b65978a0003782693561d6404498,3f64b00e4d7379db30839f7e65e6d3b6aea1dd84]/treeigualcandidato/mainconfirmados; pós38153500329 em acompanhamento, não declararPASS antecipado. APK456 própria/pósN/A porpath-filterAPI/docs/mobiletreef50bb7c71f70ae65f59ed558debff6e02a91756e intacta, sem atribuir455 a456. #455 próprioCI38148843064/APK38148843065attempt2 PASS; pósCI38153041572/job114510260977 SUCCESS no merge9f466... com4/714/293/3 e todossteps; pósAPK38153041663 em acompanhamento. Não repetir merge ou rerun por suposição.

Falha concreta reproduzida no controller real: safety-cases.create acessava body.description e .trim em JSON null/nontext, gerando TypeError; assignmentId sem formato/tipo UUID entrava no caminho SQL. Somente create alterado: Bodyunknown, objetonãoarray, descrição string.trim não vazia≤4000 e categorySTRING no allowlistseis original; erros400 safety_case_invalid. assignmentId nullish continua opcional, demais exigem UUIDSTRING (assignment_invalid400) antes de SQL. Auth/tenant/membershipprimeiro; payloadinválido antesdeUUID. Não alterar conteúdo/categorias de denúncias, política de acesso, papel/companyroles ou conferência do trabalho: profissional do próprio assignment e companyroles continuam autorizados, unrelated403 e inexistente400assignment_not_found preservados. Quatro SQL literais/params/trustedtenant/reporter e GETmine/sort/cross-company policy/helper byte idênticos; sem enforcement automático ou penalidade.

Nove regressões novas em safety-create-input.controller.test.ts, pathausente/nenhum teste sobrescrito, três testes originais do helperACL preservados. Controller/helper reais com stubs Nest/Auth/DB: RED8PASS/4FAIL de12→GREEN12PASS. JSONshape/text/category/UUID/optionalassignment/trustedreporter/category6/text4000/authpriority/relatedACL/companyroles/dbfailure; não é typecheck/NestHTTP/PostgreSQL. HTTPsafety original íntegro inclusiveadminreviews/events/idempotência/cross-tenant e duas regressões446:62JSON inválidos(31porprofissional/owner)400/mensagem; sem autenticação ou sem membership:401; tenant ausente:400; assignment UUID válido inexistente:400; GETmine/companycases antes/depois idênticos. Seiscategoriastext4000/omitternullassignment reais ACKid/status/timestamp/GETdesc/tenant/reportedByMe e visibilidadecompany, maisownerrelatocomaassignmentreal visibleprofessionalreportedByMefalse e ausentecompanyB. bash-nPASSlocal; todosmarkersnovos/originais sócomprovadosapósCIreal.

Exigir CI própria4web/714mobile/311API/3CLI e todossteps frozenlock/typecheck/build/mobileexport/migrations/retention/HTTP/ProductionTruth PASS noSHAfinal; rever9paths/diff/bytes/lease; integrar sógatesaplicáveis, confirmarpais/tree/main e pósCI SHAmerge. APK destaAPI/docs N/A conformeworkflowpath-filter; não modificarapps/mobile/rootReact19.1.4/RN0.81.6/lockfile/workflows/buildnative. DVT ORIGINAL e histórico preservados porappend; memóriacheckpointledgerregistro+evidência no mesmo commit. Metadados finaisPR depoisdeSHAs gerados e próximo adendorecibo durável.

Próximas ações concretas: acompanhar próprioCI deste relato e pós456, manter acompanhamentoAPKpós455 sem confundircompilarcomsmokePASS ou emuladorcomfísico. Auditartrust-events.create/list body/notes/cause/UUID e terms.accept null/nontexttrim com provas específicas antes de corrigir; preservar políticas/causas/idempotência/SQL/ACL. Gates físicos Android/E2E/VisualTruth/SecureStore/piloto, pentestindependente/providers/PSP/KYCsandbox/FIN-RISK/Webeventualpago seguem OPEN. Zero custo/PSP/dinheiro/serviçonovo/deploypago/Railwayprodução direta. Rotinaativa e projetoandamento, sem encerrar por roundend ou ausênciaPR.



## Aceite de termos: validação JSON em runtime — 2026-10-11 16:10 UTC

README, Documento da Verdade ORIGINAL v1.104, memória, checkpoint e GitHub reconsultados na main `1ef32e4b2f2c862c795795df6e1ba942a9beed4b`, tree `a0a0bd033dcb30c9193e80c1b33f5ec91c763184`. #457 integrada uma única vez após CI38153692777/job114512174782 SUCCESS no head280a8bb4493a7a5177fca20d990538fbbffd3af2: 4web/714mobile/311API/3CLI, zero falhas, todos os steps e cinco markers safety create/admin/events originais e novos comprovados. Merge/pais[aad6a27a9595d3f5c37404c52a0c9717c58ad22f,280a8bb4493a7a5177fca20d990538fbbffd3af2]/tree igual ao candidato/main confirmados. PósCI38154072947 em acompanhamento, sem declarar PASS antecipado. #456 pósCI38153500329/job114511620064 SUCCESS no mergeaad6a27... com4/714/302/3, zero falhas, todossteps e três markers de privacidade/export/operator comprovados. APK própria/pós de456 e457 N/A pelos path-filters API/docs: tree mobile f50bb7c71f70ae65f59ed558debff6e02a91756e preservada. #455 pósCI38153041572 SUCCESS; pósAPK38153041663 continua em execução no smoke, não declarar aprovado nem emitir novo rerun por suposição. Sua própriaAPK38148843065 attempt2 já foi comprovada no headc53c2aa...; não atribuí-la às alterações API posteriores.

Falha reproduzida no controller real terms.accept: JSON null/undefined e termsKey/version não-string causavam TypeError. Apenas accept recebe Bodyunknown, restringe objeto não-array e faz trim somente em string; retorna400 terms_key_and_version_required antes de SQL para valores inválidos. Auth permanece primeiro, identidade obtida do token, não do body. SQL INSERT/ON CONFLICT preservado byte a byte, assim como list/status, policy/missingTerms, versões1.0 existentes, chaves e versões string já permitidas. Nenhuma nova política legal, limite arbitrário ou aceite presumido. accepted_at do replay continua preservado pelo banco.

Sete regressões novas em terms-input.controller.test.ts; teste original da política mantido. Controller e helper reais com stubs Nest/Auth/DB: RED5PASS/3FAIL de8 para GREEN8PASS, sem confundir com typecheck ou PostgreSQL. Cobrem shape/key/version, trim, identidade confiável/ACK, auth antes de payload, falhaDB e list/status para companyroles e professional. Script HTTP company-onboarding original preserva signup/workspace/owner/job/analytics e ganha guard localhost, mktemp/trap, 27 JSON inválidos400/mensagem + auth inválida401; GETacceptances/status antes/depois idênticos. Fixtures reais descartáveis company e professional verificam dois termos1.0 cada, replay com mesma acceptedAt, datas reais parseáveis, status compliant, nenhuma duplicação e isolamento entre identidades. bash-n PASS local. Dois markers novos e marker original do onboarding dependem de CI HTTP real, ainda não declarados PASS.

Rever todos os nove paths/diff/bytes, exigir próprioCI4web/714mobile/318API/3CLI, frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth no SHA final. Integrar só com gates aplicáveis, confirmar pais/tree/main e CI pós no SHA merge; APK N/A para API/docs conforme workflow existente, sem inventar run quando consulta vazia. DVT ORIGINAL/histórico preservados em lugar por append, memória/checkpoint/ledger/registro/evidência atualizados no mesmo commit. Próxima ação: completar os gates desta PR e os pós457/455; auditar trust-events create/list com regressão de JSON/notes/cause/UUID antes de corrigir, sem alterar causalidade/ACL/RLS ou enforcement. React19.1.4/RN0.81.6/lockfile/native/workflows preservados. Físico Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/provedores/Web eventualmente pago seguem OPEN. Sem custos, dinheiro real, PSP, serviços novos ou alterações diretas em Railway produção. Rotina ativa; projeto ainda em andamento.


### Correção do próprio teste antes da integração — 2026-10-11 16:13 UTC

PR #458 head4bf37ee6a2bcef7b6df13e4cbf5a2995f742eb09 NÃO integrado: CI38154327849/job114514053655 falhou no Typecheck com TS2532 em duas referências accepted[0] do teste novo, noUncheckedIndexedAccess. Dados de fixture agora definidos como tupla readonly as const, comprovando índice existente sem desabilitar verificação nem alterar controller/política. Regressores locais8PASS novamente; exigir CI completo do novo SHA, incluindo HTTP real; a falha anterior não é infraestrutura nem prova de aprovação. Revalidar head/main/diff antes de merge. Histórico original e snapshot anterior preservados.


## Registros de confiança: JSON, causa, observações e UUID — 2026-10-11 16:18 UTC

Base main `c5ef0cc895859a35e4cbde6691f1eb40b98fc733`, tree `ebe6a6236055ab12e416248f1686fbe7ed5ebc2a`; README/DVT ORIGINAL v1.104/memória/checkpoint/código/GitHub reconsultados. #458 integrada uma única vez no head7cd06a32800c7aa5a8a94c6b17da056ebbff2433 com CI38154542479/job114514691921 SUCCESS:4web/714mobile/318API/3CLI, zero falhas e todossteps. Dois markers novos de termos e o onboarding original foram comprovados com PostgreSQL/HTTP. Merge/pais[1ef32e4b2f2c862c795795df6e1ba942a9beed4b,7cd06a32800c7aa5a8a94c6b17da056ebbff2433]/tree/main confirmados; pósCI38154771886 em acompanhamento, não antecipar PASS. Tentativa anterior38154327849 falhou no Typecheck de dados de teste, corrigida em novo commit sem relaxar verificação; não infraestrutura. #457 pósCI38154072947/job114513299585 SUCCESS no merge1ef32e4... com4/714/311/3 e markers safety original/create/admin. #456 pósCI38153500329/job114511620064 SUCCESS com4/714/302/3 e markers privacy/export/operator. APK456–458 própria/pós N/A pelo path-filter API/docs, mobiletreef50bb7c71f70ae65f59ed558debff6e02a91756e preservada; não atribuir APK455 a códigoAPIposterior. #455 próprioCI38148843064/APK38148843065attempt2 e pósCI38153041572 aprovados; pósAPK38153041663 em acompanhamento no smoke, ainda NÃO PASS nem bloqueio definitivo, sem repetir rerun em andamento.

Falhas reais reproduzidas em trust-events.create/list: body null/undefined ou notes não-texto geravam TypeError; causas false/0/vazia escapavam da validação por truthiness; UUIDs de professional/assignment sem tipo/formato entravam em SQL. Mudança restrita a validação de runtime: Bodyunknown/objetonãoarray, professionalIdUUIDSTRING/eventTypeSTRING no allowlistquatro original (trust_event_invalid400), causa não-nullish STRING no allowlistcinco original (trust_cause_invalid400), notes não-nullish STRING (trust_notes_invalid400), assignmentId opcional nullish ou UUIDSTRING (trust_assignment_invalid400). no_show/late_arrival ainda exigem assignment e preservam assignment_required400 antes do UUID inválido vazio. List rejeita professionalId malformado400 depois de autenticação/tenant/membership/companyrole. Null/omit causa continuam undetermined; notes null/omit/empty/blank continuamNULL, string trim; nenhum limite de texto inventado.

SQL literais de list/create, tenant/RLS, owner/admin/manager/company, reporter obtido da identidade confiável, professionalvisibility404, assignmentexistência400 e relação profissional400 preservados. Tipos/causas/ordem de listagem e datas reais do ACK inalterados. Sem enforcement, multas, decisão laboral automática ou mudança em scores/causalidade/termos/provider; erro DB não fabrica sucesso.

Dez regressões novas em trust-input.controller.test.ts (path antes ausente): controller real com stubs Nest/Auth/DB RED4PASS/6FAIL→GREEN10PASS; shape/UUID/type/cause/notes/optionalNULL/defaults/ACK/roles/authpriority/visibility/relation/dbfailure. Não é prova de typecheck/NestHTTP/PG. HTTPtrust original preservado (causa company/reporter/cross-tenant404/automatic_guilt400); script guard localhost/mktemp/trap,52JSON inválidos400/mensagem, três UUID paths400, auth401/tenant400/membership401/professionalrole403/UUIDválidonãovisível404. GETevents/assignments/earnings antes/depois idênticos.36fixtures positivas(4types×7causeoptions +8assignment/notesoptional) verificam id/eventType/cause/trustedreporter/occurredAt reais, GETnotes/NULL/assignment/date, isolamento404 e assignments/earnings inalterados sem enforcement. bash-nPASSlocal; dois markers novos mais original dependem de CI real, não antecipados.

Rever novepaths/diff/bytes, exigir próprioCI4web/714mobile/328API/3CLI e todos steps no SHA final; integrar somente gates aplicáveis, confirmar pais/tree/main e CI pós no SHAmerge. APK destaAPI/docs N/A conforme workflow existente; React19.1.4/RN0.81.6/frozenlock/mobile/web/DB/workflows nativos preservados. ORIGINALv1.104 em lugar com histórico inteiro por append, memória/checkpoint/ledger/registro/evidência no mesmo commit. Próxima tarefa concreta auditada independente: integrity.controller create/review acessam b.evidence?.trim/b.note?.trim sem validação JSON e aceitam IDs malformados; reproduzir regressões antes de corrigir, preservar adminACL/SQL/status/reviewhuman e ausência de punição automática. professional-capabilities roleId PUT/DELETE também precisa auditoria factual de UUID antesSQL, não declarar falha resolvida sem prova. Verification/conversations/work-passport/career-conversion inspecionados, não alterar sem reproduzir problema e contrato. Scores/decisões de confiança devem manter política vigente; nenhum ajuste arbitrário em dados reais.

Gates físicos Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago permanecem separados e OPEN. Sem custo, dinheiro real, PSP, serviços novos, deploy pago ou alteração direta de produção. Um gate pendente não encerra o projeto; rotina ativa, não agente24/7.


## Casos de integridade: entradas em runtime — 2026-10-11 16:24 UTC

README, Documento da Verdade ORIGINAL v1.104, memória, checkpoint, PRs, main e código reconsultados. Base `de64d2c9bbf05eb6ab815c282c3f38e557438d5c`, tree `765627fcde029d7238611ed559dd3f257037083e`. Nenhum merge anterior deve ser repetido.

Recibos confirmados:
- #455: merge9f4668266129b65978a0003782693561d6404498; próprioCI38148843064 e APK38148843065attempt2 aprovados no headc53c2aa5d2dac52f5b354f89374ba89a0b515cea. PósCI38153041572/job114510260977 SUCCESS4web/714mobile/293API/3CLI. PósAPK38153041663/job114510261888 SUCCESS no merge exato: instalação2026-10-11T16:16:31.3465658Z, DEVICE_SMOKE_OK16:17:18.3135349Z metro_required=false. ZIP11708171528 size28910970 digestsha256:3b7bd65396603ec00b99b47dc662b694959c6a3bfb42dd1936a6dad9c393ce87, expires2026-10-25T16:17:20Z, não expirado na consulta. Digest é do ZIP; prova de emulador, não aparelho físico. A primeira falha de emulador/reexecução própria já foi resolvida, sem novo rerun.
- #456: mergeaad6a27a9595d3f5c37404c52a0c9717c58ad22f; próprioCI38153269959/job114510935277 e pósCI38153500329/job114511620064 SUCCESS4/714/302/3, todos steps, zero falhas, três markers privacy/export/operator.
- #457: merge1ef32e4b2f2c862c795795df6e1ba942a9beed4b; próprioCI38153692777/job114512174782 e pósCI38154072947/job114513299585 SUCCESS4/714/311/3, todos steps/zero falhas/cinco markers safety create/admin/events.
- #458: mergec5ef0cc895859a35e4cbde6691f1eb40b98fc733; próprioCI38154542479/job114514691921 e pósCI38154771886/job114515371572 SUCCESS4/714/318/3, todos steps/zero falhas/dois markers de termos e onboarding original. Falha TS2532 do teste no head anterior4bf37... foi corrigida em novo commit7cd06... sem relaxar strict.
- #459: head96d82ccaf194edf94ea5da9c56ead4e6175fbdf4, próprioCI38154886612/job114515707438 SUCCESS4/714/328/3, todos steps/zero falhas/três markers trust. Mergede64d2c9bbf05eb6ab815c282c3f38e557438d5c com pais[c5ef0cc895859a35e4cbde6691f1eb40b98fc733,96d82ccaf194edf94ea5da9c56ead4e6175fbdf4], tree igual ao candidato e main confirmadas. PósCI38155165066 em acompanhamento; só declarar PASS depois da conclusão e logs no SHA exato.
APK própria/pós456–459 N/A por path-filter API/docs, mobiletreef50bb7c71f70ae65f59ed558debff6e02a91756e preservada. Não atribuir APK455 a código API posterior.

Falha reproduzida no controller real IntegrityController: create/review acessavam evidence/note em JSON null e chamavam trim em valores não-string; UUIDs malformados escapavam para SQL. Alteração restrita: Bodyunknown/objeto não-array, assignmentId UUIDSTRING e kind STRING no allowlist original, evidence STRING trim não vazia; erros400 integrity_case_invalid. Review valida UUID de case, decision STRING no allowlist original e note STRING trim não vazia; erro400 review_invalid. Autenticação/tenant/membership/owner-admin continuam antes dos inputs. Não adicionar limite de texto, categoria, status, penalidade ou decisão automática.

Todos os SQLs, tenant/RLS, identidade auditada, list e ordenação preservados. Criação exige assignment visível no tenant; assignment_not_found400 permanece. Review continua somente nos estados open/needs_more_info; caso ausente, outro tenant ou encerrado mantém integrity_case_not_open400. Sem modificar decisão humana, review auditado ou ganhos.

Dez regressões novas, path antes ausente; controller real com stubs Nest/Auth/DB: RED6PASS/4FAIL→GREEN10PASS. Cobrem JSON/tipos/UUID, kinds, trim/ACK, auth/roles, assignment visível, três decisões humanas, erro de caso encerrado, list e falha DB. Prova local não é typecheck/NestHTTP/PostgreSQL.

Script HTTP trust-causality existente preserva todas as verificações trust e recebe cobertura de integridade usando os mesmos fixtures descartáveis em localhost e mktemp/trap. 33 JSON de criação inválidos400/mensagem sem inserir casos; três kinds reais com ACKid/status/createdAt/evidence/assignment. Cada um recebe24JSON de review inválidos, três IDs malformados, auth/professionalrole/cross-tenant rejeitados, GET anterior idêntico. Transição humana open→needs_more_info→substantiated/unsubstantiated tem note trim e reviewedAt reais; tentativa posterior de alterar caso fechado retorna400 sem mudar GET. CompanyB não vê casos deA. GETassignments/earnings continuam idênticos, inclusive após reviews, sem enforcement. bash-n PASS local; dois markers novos somente serão comprovados no CI HTTP real.

Publicar branch/PR; rever nove paths, diff e bytes; exigir CI próprio4web/714mobile/338API/3CLI com frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth no SHA final. Integrar só com gates aplicáveis e confirmar pais/tree/main/pósCI. APK desta mudança API/docs N/A pelo workflow existente; React19.1.4/RN0.81.6/lockfile/native/web/DB/workflows preservados. ORIGINALv1.104 e todo histórico permanecem em lugar por append; memória/checkpoint/ledger/registro/evidência atualizados no mesmo commit.

Próxima auditoria concreta: professional-capabilities PUT/DELETE roleId entra em SQL sem guard UUID; reproduzir com controller/helper e ampliar HTTP taxonomy existente sem mudar taxonomia/certificações/níveis. Verification/conversations/work-passport/career-conversion inspecionados, sem correção especulativa. Scores/causalidade exigem contrato vigente, nenhum ajuste arbitrário autorizado. Gates físicos Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago seguem OPEN. Sem dinheiro real, custos, PSP, novo serviço, deploy pago ou alteração direta em produção. Rotina ativa; projeto em andamento.


## Confirmação de trabalhos: validação e autoridade antes de SQL — 2026-10-11 16:32 UTC

Base main `f55cffba8947576d17964c39ba614eff4bab60dd`, tree `34b2c16e34efa658ae8ab02a270767367cb7f60d`. README/DVT ORIGINAL v1.104/memória/checkpoint/main/PRs/código relidos; não repetir455–460. #460 integrada uma única vez após CI38155305777/job114516945715 SUCCESS no head aa0baf324d7ec13cfa6b3a029697fff2a231645b:4web/714mobile/338API/3CLI, zero falhas/todossteps/dois markers integrity e três trust. Merge f55cffba8947576d17964c39ba614eff4bab60dd pais[de64d2c9bbf05eb6ab815c282c3f38e557438d5c,aa0baf324d7ec13cfa6b3a029697fff2a231645b], tree igual ao candidato e main confirmadas. PósCI38155630675 em acompanhamento, sem antecipar PASS.
#459 pósCI38155165066/job114516529907 SUCCESS4/714/328/3 no merge de64d2c9bbf05eb6ab815c282c3f38e557438d5c, todossteps/zero falhas/três markers trust. Recibos anteriores455–458 e pósAPK455 integral já persistidos no adendo de integridade; APK própria/pós456–460 N/A pelo path-filter API/docs, sem atribuir APK455 a código API posterior.

Resultado da auditoria de capacidades: NÃO impor UUID a roleId. Migração0058_taxonomy_capabilities.sql define taxonomy_roles.id TEXT e professional_capabilities.role_id TEXT, com chave canônica hospitality.bartender. Controller, helper, cinco testes de controller/quatro de helper e HTTPtaxonomy já trabalham com IDs governados textuais, CRUD real e isolamento. Proposta histórica de auditar UUID nesse campo foi confrontada e descartada; não é bug confirmado nem tarefa a implementar. Nenhum arquivo de capacidades/taxonomia/migração alterado. IDs de company_jobs e professional_profiles são UUID nas migrações0001/0002, reconsultadas antes desta mudança.

Falha reproduzida no CompanyJobsController.confirm real: body null/undefined gera TypeError antes de autenticação; professionalId não-string/malformado pode entrar nos SQLs. requireJob também encaminhava jobId malformado de candidates/recommendations/confirm ao banco. Correção restrita: confirm recebe Bodyunknown, autentica/verifica tenant/membership/companyrole PRIMEIRO, aceita objeto não-array e professionalId UUIDSTRING; payload inválido400 professional_required antes de SQL. requireJob valida jobId UUIDSTRING, retorna400 job_invalid; UUID válido ausente continua404 job_not_found. Para usuário autorizado, profissional inválido ainda tem precedência sobre job inválido. Entradas inválidas não inserem assignment, membership nem notificação.

Todos os SQLs, active_marketplace_professional/identity, tenant/RLS, confirmação de interesse, destinatário confiável e payloads de escrita válidos preservados. Nenhum ajuste de ranking/scoring/causalidade, pagamento ou regra de alocação. Helpers confirmationDecision/rankCandidates/reliability/roleFit/cityDistance/professionalScore permanecem byte idênticos. Assignment confirmado prévio retorna mesmo ACK e confirmedAt sem novos INSERTs; checked_in/in_progress/checked_out/completed/cancelled continuam assignment_state_conflict400. Job fechado, interesse ausente e destinatário ativo ausente preservam seus erros, sem fabricar sucesso.

Dez regressões novas (path antes ausente) e três testes originais de confirmationDecision mantidos: controller/helpers reais com stubs Nest/Auth/DB RED9PASS/4FAIL de13→GREEN13PASS. O harness local remove decorators/imports de tipo, inclusive MatchInput de allocation, para Node24; erro inicial de elisão no harness não foi contado como regressão do produto. Não é typecheck/NestHTTP/PG. Script HTTPjourney original, incluindo lifecycle, GPS, cross-tenant, ratings/earnings, preservado.16JSON de confirmação inválidos antes e depois de confirmação real, três IDs malformados em candidates/recommendations/confirm, auth401/tenant400/membership401, roleprofessional403 depois do vínculo real. GETme/assignments/earnings/notifications/candidates antes/depois idênticos. Replay confirmado tem id/jobId/professionalId/tenant/status e confirmedAt reais iguais ao ACK original; não duplica notifications/memberships/assignments. bash-nPASSlocal. Dois markers novos e jornada original dependem do CI real no SHA final.

Exigir próprioCI4web/714mobile/348API/3CLI, todossteps frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth. Rever novepaths/diff/bytes, integrar somente gates aplicáveis, confirmar pais/tree/main e CI pós no SHA merge. APK N/A para API/docs conforme workflow existente; React19.1.4/RN0.81.6/lockfile/mobile/web/DB/workflows preservados. ORIGINALv1.104 em lugar com todo histórico por append, memória/checkpoint/ledger/registro/evidência no mesmo commit.

Próxima pendência concreta: JobsController expressInterest/getInterest ainda recebem jobId sem validar UUID; reproduzir antes de corrigir, preservar perfil/autorização/idempotência de interesse confirmado e visibilidade de rede. Planner.teamPlan também precisa auditoria factual de jobId após requirements, sem modificar otimizador ou scores. Não mexer em roleId textual. Gates físicos Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago separados e OPEN. Zero custo, dinheiro real, PSP, serviço novo, deploy pago ou mudança direta em produção; manter rotina ativa e andamento.


### Correção do gate HTTP da confirmação — 2026-10-11

O CI 38155848323 do head ede2f1b62388adbea3ecb12d321ade1e0ba93853 passou typecheck, build e todos os testes unitários (4 web, 714 mobile, 348 API, 3 CLI), mas falhou no HTTP journey: a nova fixture consultou `/v1/notifications`, rota inexistente (404). A rota canônica auditada é `/v1/notifications/mine`, que sem tenant agrega somente os tenants da identidade autenticada e permite lista vazia antes da confirmação. Corrigida apenas a fixture, acrescentando prova de uma notificação factual de confirmação por tenant e preservação no replay. Não houve alteração de produção para contornar o teste. O gate do novo SHA permanece pendente até execução integral bem-sucedida; não repetir/rerodar o SHA antigo nem alegar merge aprovado.


## Interesse e planejamento: UUID de trabalho validado antes de SQL — 2026-10-11

Base main `fad846ab4f2d089e5f55c6e9770f4d8088c5c423`, tree `c7ae970f61ad0fd3dbcf635f5ce7389f1b76d427`. README aponta DVT ORIGINAL v1.104; Documento da Verdade, memória e checkpoint relidos nesta base imutável; código, PRs, caminhos novos e workflow consultados. #455–461 já integradas, não repetir merges. #461 head 248eb54d44b0689acd5c9ab68d842cb87a547397 próprio CI38156463552/job114520353069 SUCCESS4web/714mobile/348API/3CLI, todossteps/zero falhas/dois novos markers+journey original no log primário. Merge fad846ab4f2d089e5f55c6e9770f4d8088c5c423 pais[f55cffba8947576d17964c39ba614eff4bab60dd,248eb54d44b0689acd5c9ab68d842cb87a547397], tree c7ae970f61ad0fd3dbcf635f5ce7389f1b76d427 igual ao candidato e main confirmadas. Falha anterior38155848323 conservada no histórico, corrigida fixture404 com rota notifications/mine; sucesso do novo SHA não apaga falha anterior. PósCI46138156715053 em execução, NÃO declarado aprovado nesta captura.
#460 pósCI38155630675/job114517914877 SUCCESS no SHA f55cffba8947576d17964c39ba614eff4bab60dd:4/714/338/3, todossteps, zero falhas, cinco markers trust/integrity conferidos. #459 pósCI38155165066/job114516529907 SUCCESSde64d2c9bbf05eb6ab815c282c3f38e557438d5c4/714/328/3; #458 pósCI38154771886/job114515371572 SUCCESSc5ef0cc895859a35e4cbde6691f1eb40b98fc7334/714/318/3. Os respectivos PRs receberam recibos finais; anteriores455–458/Android455 já documentados, não atribuir APK455 a API posterior.

Pendência concreta reproduzida em controllers reais: Jobs.expressInterest/getInterest e Planner.teamPlan admitiam jobId malformado até SQL UUID. Novo guard string/UUID400job_invalid. InteressePOST mantém prioridade auth→perfil real (404professional_profile_required)→UUID→vaga aberta→upsert existente; GET mantém auth→UUID→consulta da identidade, NULL real para interesse ausente. ONCONFLICT que preserva confirmed permanece byte a byte; nenhuma alteração de status, SQL, rede/visibilidade ou dinheiro. Planner mantém auth/tenant/membership/companyrole→teamPlanRequirements400requirements_invalid→UUID→consulta no tenant/400job_not_found→otimizador real. Listas, score, availability, requisitos/funções e algoritmo preservados, sem candidatos inventados nem calibração arbitrária. JobUUID confirmado pelas migrações0001/0005; roleId capacidades é TEXT e segue intocado.

Cinco regressões NOVAS de Jobs (path antes ausente): controller real + stubs Nest/Auth/DB RED3PASS/2FAIL→GREEN5PASS. Quatro regressões NOVAS de Planner + três testes originais teamPlanRequirements mantidos: RED6PASS/1FAIL→GREEN7PASS, incluindo isolamento/autorização/prioridade, datas/args confiáveis, otimizador real, ausência e falha DB honesta. Ajuste local de imports type-only do harness Planner foi necessário antes de produzir RED legítimo; o ERR_MODULE_NOT_FOUND do harness não é prova de falha de produto. Esses testes locais não substituem typecheck, NestHTTP ou PostgreSQL reais.

HTTPjourney existente ampliado:3IDs inválidos×GET/POST de interesse400 sem writes, auth401, perfilempresa404, UUID ausente GETnull/POST404, GETscoped proprietário e empresaNULL, replayPOSTconfirmed preservado após confirmação factual, assignments/earnings/notifications imutáveis. Extensão de confirmações #461 inteira mantida, rota canônica notifications/mine correta. HTTPplanner existente preservado com lifecycle e counts reais; amplia trêsUUIDs inválidos400, auth401/tenant400/member401/companyrole403/requirements priority400 e UUIDausente/cross-tenant400job_not_found. Planos válidos selecionam perfilBartender factual com disponibilidade real do tenantA; função sem candidato e tenantB retornam posições unfilled/selected[]/score0 reais. Leituras não alteram planner, assignments, earnings nem notifications. Ambos bash-n PASS e ambos recusam BASE_URL remoto; novas fixtures só em API local descartável com mktemp/trap.

Próprios CI e markers HTTP ainda PENDENTES no novo head: exigir4web/714mobile/357API/3CLI, zero falhas, frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth, conferir diff/12paths/bytes e integrar somente no SHA aprovado. APK própria/pós N/A pelo pathfilter existente para API/docs/HTTPscripts; mobile/web/DB/packages/workflows/React19.1.4/RN0.81.6/lockfile preservados. Confirmar pais/tree/main e pósCI do merge; []/running não são sucesso. Atualização no mesmo commit do DVT ORIGINALv1.104 com todo histórico, memória, checkpoint, ledger, registro e evidência específica.

Próxima auditoria concreta independente: TeamAllocationController.allocation recebe teamId/jobId sem UUIDguard, ambos vão a SQL UUID; reproduzir antes de implementar e preservar auth/companyrole/job/team_not_found, ranking/availability/reasons reais, tenant/RLS e nenhum write. WorkGraph só lê tenant autenticado; Taxonomy usa roleId TEXT; ProfessionalPlanner mantém timestamps PostgreSQL já provados — não inventar correções nem tratar essas consultas como encerramento integral. Gates externos físico Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUST/providers, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago continuam OPEN e separados. Nenhum serviço novo/custo/dinheiro real/PSP/deploy pago/produção direta; continuidade ativa, sem pedir continuar.


## Tenant e alocação: UUID antes de SQL com autoridade preservada — 2026-10-11

Base main `a9da2f7343fa25286000df191a6bc002d660e673`, tree `8722f68b278b19d84653a772f99e5abb72be779e`. README→DVT ORIGINAL v1.104/memória/checkpoint/código/PRs/esquema relidos nesta base; histórico integral preservado. #462 próprio CI38156941513/job114521753599 SUCCESS no head428df22fa7ab95c9732b7dba3a4632b525fcaaa3:4web/714mobile/357API/3CLI, zero falhas/todossteps/4novos markers+2originais HTTP verificados no log primário. Merge único a9da2f7343fa25286000df191a6bc002d660e673 pais[fad846ab4f2d089e5f55c6e9770f4d8088c5c423,428df22fa7ab95c9732b7dba3a4632b525fcaaa3], tree8722f68b278b19d84653a772f99e5abb72be779e igual ao candidato/main. PósCI46238157190079 em acompanhamento, NÃO aprovado nesta captura. #461 pósCI38156715053/job114521090276 SUCCESS no mergefad846ab4f2d089e5f55c6e9770f4d8088c5c4234/714/348/3, todossteps/zero falhas/dois markers confirmação+journey original. Recibo final no PR. #455–460 e APK455 já comprovados em adendos anteriores; não repetir merges nem atribuir APK455 a API posterior.

Falhas reproduzidas em código real: TeamAllocation.allocation encaminhava teamId/jobId malformados a SQL UUID; AuthService.requireMembership encaminhava tenantId não confiável do header a SQL UUID. IDs UUID confirmados nas migrações0001/0013; tenant/RLS mantidos. Guard jobId stringUUID após autoridade/companyrole e antes de db.tenant:400job_invalid. Guard teamId stringUUID somente após lookup factual do job:400team_not_found, coerente com Teams.members/add/remove. Preservada prioridade job_not_found antes de team inválido e os erros factuais team_not_found/team_empty. Todos SQLs/args/ranking/matching/reliability/city/availability/reasons idênticos, zero writes novos.

Guard central restringe somente tenantId de requireMembership: inválido→401tenant_membership_required antes de SQL, mesma negativa existente para vínculo ausente. UUID válido segue consulta/role factual original. Bearer/hash/sessões/roles/autoridade de controllers/revogação/SQL/RLS intocados. Header ausente continua400tenant_required, vínculo ausente401, profissional em rota de empresa403. Falha real DB não é transformada em sucesso nem em permissão/negação fabricada.

Seis testes NOVOS de controller allocation+helpers reais com stubs Nest/Auth/DB: RED4PASS/2FAIL→GREEN6PASS, incluindo prioridade/auth/tenant/role, ausências/empty, ranking/reasons factual, unavailable[], args confiáveis/read-only/falhaDB. Quatro testes NOVOS de AuthService real e crypto builtin com stubs Nest/DB: RED2PASS/2FAIL→GREEN4PASS, oito tipos/IDs inválidos semSQL, vínculo válido/ausente, falhaDB e hashing/sessão original antes da negativa. Harness type-stripped é prova local limitada, não substitui typecheck/NestHTTP/PG/pentest.

HTTPteam-allocation original/membrosCRUD/ranking/disponibilidade preservado e ampliado com fixtures locais descartáveis/mktemp/trap:3IDs×job/team400/messages, auth401/headerausente400/membership401/roleprofissional403; workspaceB/jobB/teamB reais provam isolamento job/team, UUIDausente, prioridade job e emptyteam400. GETteams/members/assignments/earnings/notifications de ambos profissionais imutáveis; ranking real replay idêntico e unavailable[] factual. HTTPjourney original completo mantido, amplia headers3IDs inválidos+UUIDválido ausente×5GETroutes+confirmPOST401tenant_membership_required; invalidtoken401/ausente400/crossmember401; me/memberships/assignments/earnings/notifications antes/depois iguais. Scripts bash-nPASS e guarda BASE_URL remoto comprovada.

Gates novos ainda PENDENTES: exigir CI4web/714mobile/367API/3CLI/todossteps/zero falhas/3novos markers+originais HTTP/ProductionTruth, revisar12paths/diff/bytes/escopo e integrar somente SHA aprovado. Confirmar pais/tree/main e pósCI; []/running não são PASS. APK própria/pós N/A pelo filtro existente API/docs/HTTPscripts; mobile/web/packages/.github/root/lock/migrações/React19.1.4/RN0.81.6 preservados. DVT ORIGINALv1.104 inteiro/memória/checkpoint/ledger/registro/evidência atualizados no mesmo commit.

Alternativas auditadas: WorkGraph lê somente tenant autenticado; Taxonomy/searchRoles já trata query não-string via typeof seguro, catálogo governado TEXT (hipótese de TypeError descartada por código/testes existentes); ProfessionalPlanner utiliza timestamps reais/otimizador existentes. Nenhuma alteração inventada nestes pontos. Próximo: conferir próprios/pós462–463, persistir recibos finais e seguir auditoria funcional de dados/estados/falhas reais nas telas. Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST/providers, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago continuam OPEN separados. Sem custo/serviço novo/dinheiro real/PSP/deploy pago/produção direta; continuidade ativa, sem pedir continuar nem assumir conclusão por ausênciaPR.


## Publicação no app: ACK com UUID real e recibos finais455–463 — 2026-10-11

Base main `524cba983a49a4ea6ba10055f4be7fe0b2a58af8`, tree `48fefd8cd086023fc3148398c790538e91010c5c`, README aponta DVT ORIGINALv1.104. DVT inteiro/memória/checkpoint relidos; #455–463 e main reconsultados no GitHub, todos merges únicos confirmados. Todo histórico anterior preservado: capturas pending continuam históricas e são resolvidas pelos recibos exatos abaixo; não repetir ready/rerun/merge455 nem merges456–463.

| PR | Entrega | Head validado | CI próprio / job | Merge main | CI pós-merge / job | Testes web/mobile/API/CLI |
|---|---|---|---|---|---|---|
| [#455](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/455) | Mobile: mensagem de timeout preservada após abort | `c53c2aa5d2dac52f5b354f89374ba89a0b515cea` | [38148843064](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38148843064) / 114497813804 | `9f4668266129b65978a0003782693561d6404498` | [38153041572](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153041572) / 114510260977 | 4/714/293/3 |
| [#456](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/456) | Privacidade: JSON manual sem coerção fictícia | `3f64b00e4d7379db30839f7e65e6d3b6aea1dd84` | [38153269959](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153269959) / 114510935277 | `aad6a27a9595d3f5c37404c52a0c9717c58ad22f` | [38153500329](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153500329) / 114511620064 | 4/714/302/3 |
| [#457](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/457) | Safety: categoria/texto/assignment UUID | `280a8bb4493a7a5177fca20d990538fbbffd3af2` | [38153692777](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153692777) / 114512174782 | `1ef32e4b2f2c862c795795df6e1ba942a9beed4b` | [38154072947](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38154072947) / 114513299585 | 4/714/311/3 |
| [#458](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/458) | Termos: aceite com versão e replay factual | `7cd06a32800c7aa5a8a94c6b17da056ebbff2433` | [38154542479](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38154542479) / 114514691921 | `c5ef0cc895859a35e4cbde6691f1eb40b98fc733` | [38154771886](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38154771886) / 114515371572 | 4/714/318/3 |
| [#459](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/459) | Trust: tipos/causas/notas/UUID com audit factual | `96d82ccaf194edf94ea5da9c56ead4e6175fbdf4` | [38154886612](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38154886612) / 114515707438 | `de64d2c9bbf05eb6ab815c282c3f38e557438d5c` | [38155165066](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38155165066) / 114516529907 | 4/714/328/3 |
| [#460](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/460) | Integrity: criação/revisão humana sem enforcement | `aa0baf324d7ec13cfa6b3a029697fff2a231645b` | [38155305777](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38155305777) / 114516945715 | `f55cffba8947576d17964c39ba614eff4bab60dd` | [38155630675](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38155630675) / 114517914877 | 4/714/338/3 |
| [#461](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/461) | Confirmação: autoridade/IDs/replay sem duplicação | `248eb54d44b0689acd5c9ab68d842cb87a547397` | [38156463552](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38156463552) / 114520353069 | `fad846ab4f2d089e5f55c6e9770f4d8088c5c423` | [38156715053](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38156715053) / 114521090276 | 4/714/348/3 |
| [#462](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/462) | Interesse e plano: UUID, NULL/replay e candidatos reais | `428df22fa7ab95c9732b7dba3a4632b525fcaaa3` | [38156941513](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38156941513) / 114521753599 | `a9da2f7343fa25286000df191a6bc002d660e673` | [38157190079](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38157190079) / 114522489256 | 4/714/357/3 |
| [#463](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/463) | Tenant e alocação: UUID antes de SQL/escopo e ranking preservados | `026c1b205a87d7353d61524291ac327f7d6cb139` | [38157487107](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38157487107) / 114523357679 | `524cba983a49a4ea6ba10055f4be7fe0b2a58af8` | [38157775895](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38157775895) / 114524197984 | 4/714/367/3 |

Todos CI próprios e pós da tabela SUCCESS no SHA correspondente, counts exatos, zero fail e todossteps, inclusive frozenlock/typecheck/build/export/migrations/retention/HTTP/Nest/PostgreSQL/ProductionTruth. Markers específicos de cada tarefa foram lidos nos logs primários, sem usar pré-merge como substituto de pós. Em463 pósCI38157775895/job114524197984 SUCCESS no524cba983a49a4ea6ba10055f4be7fe0b2a58af8:4/714/367/3 e3novosmarkers tenant/allocation+2originais. Total final nesta base1088testes,74regressões API novas após293→367 e uma mobile em455 após713→714. APK próprio/pós456–463 N/A pelo pathfilter API/docs/HTTPscripts, nunca atribuir APK455 a API posterior.

Android455: próprioAPK38148843065 attempt2/job114503199280 SUCCESS no headc53c2aa5d2dac52f5b354f89374ba89a0b515cea, após primeiro smoke falhar por emulatorColorBuffer/texture/com.android.phoneANR com build aprovado; retry previamente solicitado verificou mesmoSHA. PróprioZIP11707162092sha256:3480c1f17599dcb75fc5b9028a4b119513dd439807d560c41f17c493ba97ec96. PósAPK38153041663/job114510261888 attempt1SUCCESS no merge9f4668266129b65978a0003782693561d6404498, instalação2026-10-11T16:16:31.3465658Z e DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false às16:17:18.3135349Z. ZIP11708171528 size28910970, sha256:3b7bd65396603ec00b99b47dc662b694959c6a3bfb42dd1936a6dad9c393ce87, expira2026-10-25T16:17:20Z. Digest é do ZIP, NÃO sha256 individual do APK; smoke é emulador, NÃO Android físico. Link [pósAPK455](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153041663).

Auditoria funcional da home na base463: dados via loadProfessionalHome/loadHomeCards/APIs, loading/erro/vazio e retry; nenhum dado fictício reintroduzido. Empresa renderiza CompanyNav e protege contexto/deadline/publicação incerta. Essas leituras de código não encerram desenho original/Visual Truth físico. RoleId capacidades é TEXT governado; searchRoles já typeof-safe; hipóteses de guardUUID emrole e TypeError da pesquisa descartadas, sem commits inventados.

Nova falha concreta reproduzida em publishJob REAL: HTTP201 com todos fatos correspondentes mas id='job-real' era classificado created, podendo apagar formulário e anunciar publicação sem identidade UUID real. company_jobs.id é UUID no esquema canônico. Correção restrita: exige id stringUUID completo case-insensitive, sem trim/coerção de ID; resposta incompatível permanece statusunknown, NÃO rejected, pois não prova que o servidor deixou de criar. Exatamente uma chamada/nenhum retry automático. Mantidos title/workCity/location/nullablelocation/pay/status/timestamps equivalentes, payload, mensagens existentes, sessão/tenant e tratamento4xx/5xx. Sem alteração de tela/desenho/API/SQL/negócio/PSP.

Fixture positiva antiga id='job-real' corrigida para UUID real mantendo os seis testes originais e todos fatos/timezone; um novo teste comportamental examina11IDs malformados/tipos e UUID maiúsculo válido, com uma chamada. RED6PASS/1FAIL→GREEN7PASS no helper real via Node --experimental-strip-types --test tests/company-job-publication.test.mjs, sem mock de implementação. Falha original explicitamente retornava created/idjob-real; correção retorna unknown. Não é prova de dispositivo físico.

Novo ciclo móvel exige próprio CI4web/715mobile/367API/3CLI e Standalone Pilot APK no SHA exato, revisão8paths/bytes/diff/escopo, merge só após ambos SUCCESS e artifact/install/DEVICE_SMOKE_OK semMetro; depois verificar pais/tree/main e próprios gates pós no mergeSHA. Gates deste NOVO head PENDENTES nesta captura, não reutilizar APK455. Preserve React19.1.4/RN0.81.6/lockfile, API/web/DB/packages/workflows/layout intactos, somente helper+teste mobile e seis docs. DVT ORIGINALv1.104 inteiro, memória, checkpoint, ledger, registro e evidência específica no mesmo commit.

Próxima ação concreta: acompanhar CI/APK deste PR móvel, diagnosticar logs reais se falhar sem contornar gate; integrar somente aprovado e verificar pós. Continuar auditoria funcional independente (incluindo publicação ambígua e troca de sessão/empresa entre focus e remount, comparar helpers/testes antes de afirmar bug). Físico Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUST/providers, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago seguem OPEN separados. Sem serviços novos/custo/PSP/dinheiro real/deploy pago/produção direta. Rotina ativa, fim de rodada ou bloqueio isolado não prova conclusão; não exigir continuar nem afirmar24/7.


### Gate completou e encontrou fixtures antigas de publicação — 2026-10-11

CI38158313160/head a07a2614b307a8c7657fa1453b526c959ab2faad passou typecheck/build/export, mas715mobile tiveram2falhas nos cenários de publicação de tela: fixture positiva usava idfixture-job, incompatível com UUID real. Corrigida exclusivamente fixture positiva de publication-screen-uncertain-deadline.test.mjs para UUID; todos os dez testes originais e assertions de autorização/deadline/replay/draft/mensagens mantidos. Acrescentado cenário real do handler+publishJob+runForSession que recebe ACK com UUIDmalformado em resposta oportuna: conserva draft/unknown/uncertain, busyfalse/Planejamento e impede segundoPOST após refresh da mesmaempresa. Nada da lógica de tela foi relaxado. Com helper ORIGINAL e fixtures novas,24testes→RED22PASS/2FAIL (helper e efeito no formulário); helper corrigido→GREEN24PASS. Novo esperado CI4web/716mobile/367API/3CLI e próprioAPK novoSHA. Agora9paths (3mobile+6docs). Head anterior/CI falho/APK antigo não valem para o novohead. Preservar falha histórica/recibos anteriores; novo merge exige todos gates novos completos, seguido dos próprios pósCI/APK. Gates físicos permanecem separados e OPEN.


## Disponibilidade: confirmação exige UUID real — 2026-10-11

Main revalidada `524cba983a49a4ea6ba10055f4be7fe0b2a58af8`; PR#464 aberta head`7f4b96cbc55c97fb7922219f96b749c8cb91345e`, CI38158579009/job114526542150 SUCCESS4web/716mobile/367API/3CLI/todossteps/zero falhas/HTTP real/ambas novas regressões; APK38158579008 ainda em execução, NÃO PASS. Diff/9paths/bytes/tree revisados. APK anterior38158313208 não autoriza head novo; manter histórico CI38158313160 falho por fixtures positivas nãoUUID.

Pendência independente reproduzida: submitAvailability aceitava id`a` ou espaço como saved com horários corretos; handler REAL de Disponibilidade apagava date/start/end e anunciava salva. Migration0026 comprova professional_availability_network.id UUID DEFAULT gen_random_uuid; AvailabilityController.add retorna ID/instantes reais, ONCONFLICT por professional/starts/ends mantém retry explícito idempotente. Referências relidas na main imutável; não inventar UUID em dados reais.

Correção limitada ao helper apps/mobile/lib/availability-submit.ts: UUID completo no ACK, incompatível mantém unknown, rascunho/aviso/uma chamada sem retry automático. Sessão/deadline/4xx-profile-required/5xx/dataequivalente/idempotência existente/layout/API/RLS intactos. apps/mobile/tests/availability-submit.test.mjs mantém9testes anteriores/assertions comfixturesUUID e acrescenta1regressão11IDs incompatíveis+uppercaseválido. availability-screen-deadline.test.mjs mantém11testes/assertions/deadline/retry explícito/ownerswitch e acrescenta1regressão do handler REAL com helper/parser deprodução confirmando rascunho/incerteza/busyfalse/sem anúncio de salva/sem nova requisição automática. RED20PASS/2FAIL22→GREEN22PASS; falhas reproduzem duas confirmações falsas, não falha do harness.

Branch fix/mobile-availability-ack-job-uuid parte do head#464 para preservar sua alteração e histórico documental; predecessor obrigatório antes de integrar esta nova tarefa. Gate próprio esperado4web/718mobile/367API/3CLI (1092), APK MOBILE próprio obrigatório; não emprestar APK455/464. Nove paths: helper+2testes+evidência+5docs existentes. Revisar bytes/diff/tree, reconsultar predecessor/main/head; após integrar464, retarget main sem perder mudanças e só integrar com CI/APK SUCCESS no próprio SHA exato. Confirmar pais/tree/main e ambos pósCI/APK; []/running≠PASS. Nenhum sucesso remoto deste novo head presumido.

DVT ORIGINALv1.104/histórico preservados em lugar, memória/checkpoint/ledger/registry/evidência no mesmo ciclo. React19.1.4/RN0.81.6/lockfile/standalone semMetro/layout/tenantRLS preservados; sem dinheiroreal/custos/serviços/deploypago/PSP/produçãoRailsRailway. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUSTproviders, PSPKYCsandbox/FIN-RISK/Webpago OPEN separados; emulador≠físico/ZIPdigest≠APKindividual. Não concluir projeto nem bloquear tarefas independentes por APK em execução.


## Perfil: recusar confirmação incompatível com UUID real — 2026-10-11

Main `524cba983a49a4ea6ba10055f4be7fe0b2a58af8`; predecessores464head7f4b96cbc55c97fb7922219f96b749c8cb91345e (CI38158579009 SUCCESS4/716/367/3, APK38158579008 ainda em execução) e465headfb8a3261d8940c6376a949aef203de99ae824b65 (CI38159094661/APK38159094659, reconsultar estados). Nenhum APK pendente equivale aPASS.

Fato reproduzido em helper e handler REAL Perfil: criação sem perfil existente aceitava idnew-profile com campos iguais e anunciava Dados salvos, desmarcando dirty/normalizando rascunho e atualizando/recarregando perfil apesar de IDincompatível. Migration0002 professional_profiles.id UUID DEFAULT gen_random_uuid; ProfessionalProfileController.upsert retorna UUID/fatos reais e ONCONFLICT(identity_id) mantém retry explícito upsert. Fontes relidas na main imutável.

Correção limitada aapps/mobile/lib/profile-submit.ts UUID completo no ACK; dados incompatíveis unknown, rascunho/dirty/aviso preservados, sem atualizar/recarregar snapshotnemretryautomático. expectedId em edição continua igualdadeEXATA, campos/nulls/trim/4xx/5xx/session/deadline/layout/SQL/API/RLS intactos. profile-submit.test.mjs9originais e profile-save-screen-deadline.test.mjs11originais preservados/assertions; positivos UUID e casos de IDdiferente usam outro UUID válido para continuar testar identidade, não apenas formato. Mais2regressões malformedtypes/IDs/criação e expectedIdmalformadocoincidente/uppercaseválido; handlerREAL comperfilinicialnull/provasrascunho/dirty/busyfalse/aviso/semGETextra/semrota/umaPUT. RED20PASS/2FAIL22→GREEN22PASS, sem harnessfakeproduction.

Branch fix/mobile-profile-ack-uuid parte head465 preservando predecessores/dados/documentos. Integrar464→465primeiro, retargetmain/revisardiff/gates/head/pais/tree semsobrescrever. PróprioCI esperado4web/720mobile/367API/3CLI(1094)/todossteps/HTTPreal/zerofalhas e APKstandalone MOBILE obrigatório no SHAexato; ambos pósCI/APK obrigatórios apósmerge. Sem emprestar APK455/464/465. Novepaths helper+2testes+evidência+5docs EXISTENTES DVT ORIGINALv1.104/histórico/memória/checkpoint/ledger/registry preservados.

Sem React/RN/lockfile/layout/workflows/backend/produçãoRailsRailway/custos/serviços/PSP/dinheiroreal/deploypago. Externos Androidfísico/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTproviders/PSPKYCsandbox/FINRISK/Webpago continuamOPEN separados. Emulador≠físico/ZIPdigest≠APKindividual; []/running≠PASS. Não declarar projeto completo nem bloquear outras tarefas seguras por gate pendente.


## Cadastro: confirmação com identidade/workspace UUID reais — 2026-10-11

Base GitHub main `e8a4d0764a3527bb525e797a00b0ca1251529dff`, tree `e72ae0b784a5c4670bf60a38889b02d70436ef49`. README, DVT ORIGINAL v1.104 completo/histórico, memória e checkpoint relidos em referência imutável; nenhuma substituição resumida. #455–466 já integradas, não repetir merges.

Falha reproduzida: signupAccount aceitava qualquer string não vazia em identity.id e, na empresa, tenantId. ACK oportuno com idnot-an-identity-uuid/email/accountType correspondentes fazia o handler REAL CriarConta apagar senha, navegar para entrar e liberar a barreira de cadastro não idempotente. AuthController.signup retorna identities.id/tenants.id reais: migrations0003_identity e0001_tenancy_foundation usam UUID DEFAULT gen_random_uuid; empresa mantém owner/workspace e profissional independente mantém tenantId/role ausentes.

Correção limitada ao predicado id de apps/mobile/lib/signup.ts: UUID completo case-insensitive no ACK identity e workspace. Resposta incompatível permanece unknown, sem afirmar rejeição ou inexistência no servidor. Handler existente preserva rascunho/aviso/uncertain e impede novo POST automático ou manual duplicado; recuperação continua entrar com as credenciais antes de cadastrar novamente. Não inventar tenant, sessão, cadastro ou persistência/idempotência no servidor. Email/password/workspace/accountType limites, owner, profissional independente, status401 email_in_use/4xx/5xx, auth/fetch/JSON/prazos/blur/refocus e não reenvio intactos. Nenhuma mudança no JSX, navegação canônica, API/SQL/RLS/política.

25 testes originais em signup.test.mjs(11), signup-screen.test.mjs(5), signup-screen-deadline.test.mjs(9) preservados com todas assertions. Fixtures positivas de identidade/workspace/JSON tardio atualizadas para UUIDs reais; negativas unrelated/roles/deadlines continuam negativas por suas próprias condições. Acrescentadas2 regressões: helper com11 tipos/formatos inválidos em identity de profissional/empresa e workspace empresarial, positivos UUID uppercase e umPOST; handler REAL com ACKmalformado mantém email/senha/accountType, busyfalse/uncertain/aviso/semrota e bloqueia segundoPOST. Mesmo conjunto no helper ORIGINAL RED25PASS/2FAIL27 (created falso e rota entrar indevida); predicado corrigido GREEN27PASS/0FAIL em2026-10-11. Fixtures não criam conta/workspace, não renderizam RN/nem executam SecureStore/não são evidência física.

Gates do novo candidato ainda a gerar: próprio CI esperado4web/722mobile/367API/3CLI(1096), zero falhas/todossteps/typecheck/build/export/frozenlock/HTTP real/ProductionTruth; próprio APKstandalone obrigatório no SHAexato cominstall/DEVICE_SMOKE_OKmetrofalse/artefato não expirado. CI/APK pós obrigatórios no SHA REAL apósmerge. Não emprestar APK de466 ou SHA anterior. Rever10paths/bytes/diff/árvore/lease/head/main; merge só gatesaplicáveis aprovados, confirmar pais/tree/main; resultados próprios/pós persistidos nos recibos finais quando existirem, nunca tratar[]/runningcomoPASS.

Estado pós predecessores às17:59UTC: post464CI38160409539/job114531932443 SUCCESS4/716/367/3; post465CI38160794937/job114533094891 SUCCESS4/718/367/3; post466CI38161066141/job114533894900 SUCCESS4/720/367/3, todos SHAmerge exatos e novos testes/HTTP primários. Post464APK38160409565 attempt1/job114531932515 BUILD SUCCESSFUL17:47:53.6781285Z; emulador demorou460900ms e falhou antes de instalar, input keyevent82/serviços settings/input Broken pipe32, adbexit224; nenhum install/DEVICE_SMOKE_OK, uploadAPK skipped. Logs/steps primários examinados; pedido bounded apenasfailedjobs aceito, novoattempt em acompanhamento, NÃO PASS. Logartefato11711046807/1723bytes sha256:613d8b33952af9394664c727250612d88750b5d944e90579c60ba35cbce40b2e, não APK. Post465APK38160794999/job114533095010 e post466APK38161066155/job114533894811 emexecução, NÃO PASS. Falha isolada de infra não impede esta correção segura; não contornar/reexecutar jobs ativos. Após todospostPASS, consolidar recibos finais próprios/pós455–novoPR nos5docs/evidência em PRsomentedocs com CI próprio/pós e APK N/A sópor paths/árvoremobile/lock/workflows inalterados comprovados; sem loop de commits metadados.

Preservados React19.1.4/RN0.81.6/lockfrozen/standalone semMetro/tenantRLS/desenho/histórico. Sem custo/serviçonovo/PSP/dinheiroreal/deploypago/produçãoRailsRailwaydireta. AndroidFÍSICO/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUSTproviders, PSPKYCsandbox/FIN-RISK/Webeventualpago seguem OPEN separados; emulador não físico. Projeto em andamento; nenhuma obrigação de digitar continuar nem alegação24h contínua. Próximaação: acompanhar gates próprios/anteriores, diagnóstico primário se falhar, integrar sóPASS e confirmar pós; depois consolidar recibos e auditar próximo ponto factual com contrato, sem inventar atividade. Preferências dependecontrato; roleId taxonomyTEXT não UUID.


## Infraestrutura Android independente — KVM sem integrar código pendente — 2026-10-11

Main relida682f0849b5861af0dc2b571c9024b1062743d8b1/tree6b5ef1978c0a7557c6d351e97361ea5a55977cd4. #468–472 permanecem PRs não integrados nesta fotografia; não alegar novo merge/gates pós inexistentes. #470stack headf25b8d50e94f16e52fd0c6c09207be46813a37e3 tem próprioCI38178173114SUCCESS4/727/367/3 eAPK38178173119/job114584886736attempt1SUCCESS, mas herdava código468/469 e não pode adiantar gates pendentes dessesPRs. Para eliminar dependência circular de infraestrutura, esta branch isola SOMENTE workflowKVM e docs na main atual, sem importar app/helpers/tests/API de PR pendente. Não usar o APK de470 como gate desta novaSHA: própriosCI4/722/367/3 eAPK obrigatórios; preservar snapshots/árvores/refs de predecessores. Sem force, reset, downgradeoualteração de runnerpago.

Falha real469ownAPK38177958961attempt1/job114584255869 no head5e29cacde3742b28e8c36a179b535dfa4294d075: buildSUCCESS, boot505514ms, serviço settings/inputBrokenpipe32/adbexit22422:09:45Z antesAPKinstall e antes executar customscript do app. Logsprimários guardados; nãofalha comprovada do app, nãoPASS. Failedjobs-only rerun solicitado1vez, aguardar attempt2/novo job, não rerunrunning. #468ownAPK38177844411aindaexecução. KVM ajuda o runnersemaceleração, não declarar únicoresponsável por todo erro/ANR/GPU.

Workflow isolado é bytea byte aqueletestado no470: regraudevKVM recomendadoREADMEoficial/GitHub2024-04-02, test-c/read/write/devKVM, KVM_READY, disable-linux-hw-accel:false. Não relaxar timeout/install/crashgates/upload/Metrofalse; falha seKVMindisponível. No own470 houve KVM_READY22:03:42.6506216Z, comandoemulatorsem-acceloff, boot32693ms22:04:43.2524223Z, install22:04:55.9188086Z/DEVICE_SMOKE_OK22:05:08.3364025Zmetrofalse. Apenas comparaçãoobservacional com post467boot471902ms; não prova causalestatísticaouequivalência físicadispositivo.

Artefato470ZIP11717017692size28911048 SHA256f9e0ed5973872b3388edc09ed59b5310fc3d5545781b880e81c1e013761153ab/expires2026-10-25T22:05:10Z downloaded/CRCvalid/digestmatchesAPI. APK66160320bytes SHA256f14a0fda9afa09f336e02212c2fc3e4c092206b0b1e25418667b5e7af6d62922matchesSHA256SUMS, APKCRCvalid, assets/index.android.bundle. BUILDINFOcommitd6bae6494eebff05ae04fdeb52d95eb5b5a36447 ésyntheticrefsPRmerge pais[5e29cacde3742b28e8c36a179b535dfa4294d075,f25b8d50e94f16e52fd0c6c09207be46813a37e3], tree5722ee7dc56fb323d0c4875e69641d777a34e79e igualcandidato confirmadoREST. NãoalegarBUILDINFOheadliteralouAPKprovandooutroSHA.

Após próprioCI/APKverdeexactHEAD desta infra, review9paths/bytes/todosapp/lock/build/smoke blobsinalterados, mergeindependente e comprovar orderedparents/tree/main e ambospostCI/APK actualSHA. A seguir reconciliar468/469 COMNOVAMAINvia mergesdeancestral sem perda e sem force; novosheads exigem própriosgatesCI/APKnovos. Fechar470 apenascomoSUPERSEDED após provar workflowblob idêntico e infraindependenteintegrada/gates, semalegar470merged. Reconciliar471/472 com predecessorreal/retargetmain emordem, preservando códigotestado e novosdocs, nãoemprestarAPK/outdatedheads ou repetirmerges.

Auditoria de continuidade: docs/evidencias/INTERNAL_EXHAUSTION_PROOF_2026-09-28.md e INTERNAL_COMPLETION_CHECKPOINT_2026-09-24.md são snapshots históricos1.15, não documento normativo atual1.104 nem autorização de parar. A inspeção atual encontrou falhasreais internas e PRs468–472; aviso adicionadoa essesoriginais preservando TODOcorpo/história/datas. PRvazia/TODOausente/aparelhoindisponível não prova todasáreasinternas completas. Uma dependência élocal; continuar auditoria fachadas/dados reais/auth/API/tenant/finance/notificações/matching/navegação/segurança documentadafontecanônica. Não declarar cobertura integralVisualTruthestática ou interna por smoke único.

DVT ORIGINAL integral/histórico+memória/checkpoint/ledger/registry+evidência no ciclo. Source/workflow gatejátestadono470, YAML/bashtargetedPASS e nenhuma semânticaapp nova. CI/APK próprios/pós destaPR PENDENTES neste commit, nãoPASS. FísicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTprovider/PSPKYCsandbox/FIN-RISK/Webpagodeploy continuam OPEN. PreserveReact19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone/desenho, no PSP/money/custo/produção/deploypago. Próximo concretamente: própriosinfraCI/APKnewSHA, merge pós, incorporarKVMmain nosheads de candidatos e retestar sem relaxargates, depois pagamentos/UUIDACKtestados e consolidarrecibos, continuarfrentesinternas.


## Correção do preparo KVM após falha primária de473 — 2026-10-11

Own473APK38179654427/job114589320217 no head21d7567b9bfa8df660765ad2382fec6d836b141e FAIL no stepEnableandverifyKVM22:24:36Z; APK buildSUCCESS9m12s, customdevice-smokeSKIPPED evalidatedartifactSKIPPED, portanto nãoPASS/existência de APKpublicável. Log imprime regra do sudo tee após test-c/dev/kvm, mas nãoKVM_READY; falha aconteceu entre reload/trigger/test-r/test-w, semlogporcomandoparaatribuircausa exata. Não declarar indisponibilidadehardware ou certeza de qual comando falhou; não é erro do app nemlogoappinstalado. Diagnóstico failureartifact11717640022 retido, semvalidadoAPK.

Correção de implementação do setup, mantendo MESMApermissão pretendida0666/no runner efêmero: depois de exigircharacterdeviceKVM jápresente, aplica sudochmoda+rw/dev/kvm diretamente e registra stat KVM_PERMISSIONS; exige read/write pelo próprio runner com mensagens explícitas KVM_NOT_READABLE/KVM_NOT_WRITABLE e exit1. Evita dependênciaderecarga/eventosudevasíncronos, semfallbacksoftwaresilent/skip/continueonerror. Não cria dispositivo fictício, não atua nocomputadorusuario/produção/RLS/segredos, não mudaUbuntu/runnermetered. Mantém disable-linux-hw-accel:false, KVM_READY sóapóschecks, appinstall/launch/nativecrash/Metrofalse/ZIPuploadsomenteapósSUCCESS.

OwnCI473anterior38179654397/job114589320021SUCCESS4/722/367/3 pertenceapenas21d. Headcorretivo exige NEWCI4/722/367/3 eNEWAPK acelerado/install/DEVICE_SMOKE_OKmetrofalse/artifactSHAexato/nãoexpirado. YAMLparse/bash -n jábaseworkflowprovados, novo bloco seráchecadosintaxe; não executar rootdevKVM local nemalegarvirtualização daí. Validarprecisamente comandos/primáriosantesownmerge eposrealambos. Nenhum rerunsemcodefix do473failed; não apagarhistoricalFAILnememprestar470artefato. Depois incorporar novohead473nasbranches468/469/471/472/474por ancestry mergessemforce/missingdocs, própriosgates novos SHAexato; N/AAPI sódiffnãoAPK exato contraantecessornovo, retargetbranches para refletir dependencia real. Main ainda682... nesta fotografia, nãoalegarnovomerge.

DVT ORIGINAL/histórico/memória/checkpoint/ledger/registry/evidência preservados, no mesmo commit. Semcusto/PSP/dinheiroreal/serviços/produção/deploypago; físicos/pentest/provider/FINRISK/Webpaid separadosOPEN. Correção épermissionamento pretendido doCI, não relaxamento do smoke oubypassgate. Próximo: gate473novo eextrasgatesbranchesnovaancestria, integraçãogatesown/post, consolidaçãoevidências e auditoria independente segura.


## Notas historicas da branch #468 preservadas integralmente



## PR #468 — confirmação de candidato: regressão comportamental e recibo vigente — 2026-10-11

Base main `682f0849b5861af0dc2b571c9024b1062743d8b1` (merge467), tree`6b5ef1978c0a7557c6d351e97361ea5a55977cd4`, pais[`e8a4d0764a3527bb525e797a00b0ca1251529dff`,`b6b66b7925855fac67dfdc65782c13a97209697a`]. README/DVT ORIGINALv1.104/memória/checkpoint/PRs/issues/GitHub/código reconsultados. Pós467CI38165293516/job114546488872 SUCCESS4/722/367/3/todossteps/HTTP real; pós467APK38165293489/job114546488627 SUCCESS install19:10:51.3358475Z/DEVICE_SMOKE_OK19:11:44.4987192Zmetrofalse, ZIP11712008074/28911009bytes digestsha256:383b50b43b5f862ab70b6e0e9d6a2fad92c7d776c34cef8860d5c3a900db7015/expires2026-10-25T19:11:54Z/expiredfalse. Não repetir merge467 nem confundir emuladorcomfísico/ZIPdigestcomAPKindividual.

A mudança existente468 relê authenticatedTenantHeaders no callback de transporte REAL confirmCandidate e recusa generation/signal/empresa/Authorization diferentes antes de fetch. Revisão encontrou que teste novo anterior apenas assert.match do texto não executava race; substituído integralmente por3 regressões comportamentais de handlers reais pré-JSX com parsers/runForSession/confirmCandidate deprodução. Fixtures sóhooks/auth/transporte/timer, sem RN render/SecureStore/writeexterno. Doiscenáriosfalham com código ORIGINAL da main: troca realtenant ou sessão entre snapshot retornado e dispatch; deadline ou cleanupREALblur durante authde transporte pendente. Antes ocorreumPOST indevido, depois0POST e nenhuma confirmação fictícia. Terceirocaso conserva sucesso autorizado: umPOST/bodyprofessional/headersorigem, ACK compatível, refresh com statusconfirmed e nenhumPOST ao clicarprofissionaljáconfirmed. 29testes originais (21readdeadline+8companycandidates) e assertions intactos. Mesmo conjunto RED30PASS/2FAIL32→GREEN32PASS/0FAIL com código468; não alterado JSX/estilos/API/SQL/RLS/ACK/deadline/retry ou política.

Head anterior468a1643edfeb2981e27ef50d53792a49a547308a8a passouCI38165495573/job1145470880064/723/367/3 e APK38165495577/job114547087977 install19:13:35.4814563Z/DEVICE_SMOKE_OK19:14:31.7519825Zmetrofalse/ZIP11712202993sha256:ac6123d19e535fcbb9821ea9850d5d2660039a6d1a7ad315ab0e16d4e563d883. Esses gates são históricos desseSHA, NÃO autorizam novohead. Novo próprioCI esperado4web/725mobile/367API/3CLI (1099), títulos dos3testes reais/todossteps/HTTP/frozenlock, APKstandalone próprio novoSHA obrigatório. Não presumirSUCCESS/emprestarAPK/usar[]ourunningcomoPASS. Após revisão diff/bytes/tree/lease e gates própriosgreen, ready/merge umaúnicavez, verificar pais/tree/main e CI/APK pós SHArealo. #469 precisa integrar novo468 como ancestral e preservar ambasmudanças/docshistóricos, retargetmain apósmerge468 e própriosgates noSHAresultante.

O DVT ORIGINAL inteiro preservado em lugar; adendo+memória/checkpoint/ledger/registry+evidência no mesmo ciclo. React19.1.4/RN0.81.6/lockfrozen/tenantRLS/standalone semMetro/desenho preservados. Sem custo/serviço/PSP/dinheiro/deploypago/produçãoRailsRailway. FísicoAndroid/E2E/VisualTruth/SecureStore/piloto, pentestindependente, TRUSTproviders, PSPKYCsandbox/FIN-RISK e WEB-ARCHprovisionamentoeventualpago permanecem OPEN separados. #224 interno existente não exige provisionar. Próximo: completar468/469 e consolidar recibos completos464–469; auditar áreas internas da referência canônica e corrigir sófalhascomprovadas com regressões, sem declarar conclusão pornenhumPR ou inventaratividade. Não encerrar rotina por bloqueioisolado/fimrodada, nem pedir continuar.


## Reconciliacao de #468 com candidato de infraestrutura independente #473 — 2026-10-11

Merge de ancestrais preserva pais[5888455ace44c6eb8b26201fe4a3a88ca54ab441,21d7567b9bfa8df660765ad2382fec6d836b141e], semforce/sobrescrita de app. Codigo468 e seus3testesreais/evidencia mantidos bytea byte; importa SOMENTE workflowKVM+notices/documentos473 da fonte main. DVT/memoria/ledger/registry começam com TODOoriginal473 e acrescentam notas anteriores468 integralmente. Checkpointconserva cabecalho/corpooriginalcomnotas historicasrealocadas/integrais.

Own468 anterior588 CI38177844414 SUCCESS4/725/367/3; APK38177844411/job114583912063SUCCESS install22:10:25.8247404Z/DEVICE_SMOKE_OK22:11:38.0601986Zmetrofalse/ZIP11716433370size28911013digestsha256:f4ba99b16054b7a2ea5df733b7951ac13682caac422007891df5b9351b3361c5expires2026-10-25T22:11:49Z. Historico valido SOMENTE588, nao autoriza novoSHA. PropriosCI4/725/367/3 eAPK novos obrigatorios no headresultante, KVM_READY/install/smoke/artifact exatos.

Infra473 deveintegrarprimeiro com propriosCI/APKgreen eposreal; entao main equivale a fonte473, diff468volta8paths e tree deveequivaler ao candidato. Nenhum merge468real nestecommit. #469readguard/#471finance/#472UUIDACK ficambranchesposteriores; progressosegueautonomo semloanAPK, semrerunrunning, semcusto/PSP/producaofisicofalso. ConfirmarHEAD/main/mergeable/bytes/diff/pais/tree/gates frescos antesmerge, verificarpostCI/APKactual e consolidarrecibos.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #468 — 2026-10-11

Pais ordenados[fd13d5b70faf4093a2824f904723b6fedc42ab82,c33b2823950c990ceda9815dffe9c42b74b8366a], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo473, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/725/367/3 novo eownAPK novo KVM_READY/install/DEVICE_SMOKE_OKmetrofalse/artifactexato obrigatório. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCIeAPK. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Notas historicas da branch #469 preservadas integralmente



## PR #469 — leitura cancelada: isolamento comportamental com ancestral468 — 2026-10-11

Main observada682f0849b5861af0dc2b571c9024b1062743d8b1. #468 novohead5888455ace44c6eb8b26201fe4a3a88ca54ab441/tree d920442a816aa7679a482bccb45c999c6cafc49e é predecessor necessário e ainda exige CI/APK próprios novos. #469 foi reconciliada com MERGE DE ANCESTRAL468, parent85afb28bb4db8babcda45d5b42d5a125584f6141 e additionalparent5888455ace44c6eb8b26201fe4a3a88ca54ab441, sem force/reset/rebase destrutivo. Resolver manualmente source/DVT preservando literalmente as duas mudanças, notas históricas e todos arquivos de468; comparar delta469 somente contra árvore468, e integração apenasdepois468na main.

selectJob já mostrava erro no timer15s, mas o catch da autenticação rejeitada depois de abortar escrevia novo objeto de erro após deadline. Novo guard!controller.signal.aborted conserva último estado/deadline e evita commit tardio; erros atuais não cancelados continuam retryable. Teste anterior469 apenas assert.match código foi substituído por2 cenários de handlerREAL pré-JSX com hooks/auth/timers explícitos e parsers reais. Verifica contagem de commits no setData e identidade do snapshot após timeout/rejeiçãoauth, zeroPOST; outro caso verifica loading→erro real atual/umcommit e nenhuma confirmação/POST. Reaproveita estrutura dos testes readdeadline, não replica implementação nem afirma RN render/SecureStore/físico. Mantidos os29originais (21read+8helpers), os3novos testes reais468 e todas assertions. Com código468 e catchORIGINAL RED33PASS/1FAIL34 (commitsextras4emvez3); comduas mudanças GREEN34PASS/0FAIL. Deadline/geração/seleção/blur/retry/matching/ranking/headers/canonicalJSX/SQL/API/RLS íntegros.

Head anterior46985afb28bb4db8babcda45d5b42d5a125584f6141 passou ownCI38166077594/job1145488108674/723/367/3 e ownAPK38166077651/job114548810629 install19:21:29.5354420Z/DEVICE_SMOKE_OK19:22:18.1357217Zmetrofalse/ZIP11712399046sha256:4d46079f0b2618adb6742b5a049105bd35cd7bfa7a395ac938ff074a1c385198. Essesgates históricos NÃO autorizamnovoheadreconciliado. Novo esperadoCI4web/727mobile/367API/3CLI(1101)/zero failures/todossteps/HTTP real/ProductionTruth e todos5tituloscomportamentais. APKstandalone próprio novoSHAobrigatório, install/DEVICE_SMOKE_OKsemMetro/artefatoprório nãoexpirado; nuncaemprestar468/old469. Esperar gatesgreen/reverbytes/diff/lease/head/main/mergeable/tree, integrar sóapós468 e verificar pais/tree/main/CIAPKinclusivepós SHArealo. Se conflitoapós468merge, reconsultar GitHubestadoeventual e reconciliar preservandoambos; nunca sobrescreverpredecessor.

DVT ORIGINALv1.104/histórico/memória/checkpoint/ledger/registry/evidência no mesmo ciclo porappend e checkpointnovo topo, sem substitutos. React19.1.4/RN0.81.6/lockfrozen/tenantRLS/standalone semMetro/canônico intactos. Sem custos/serviços/dinheiroreal/PSP/deploypago/produçãoRailsRailwaydireta. GatesfísicosAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/providers/TRUST/PSPKYCsandbox/FIN-RISK/Webprovisionamentoeventualpago separados OPEN; #224 internojáexistente não contratar. Próximo completar gates468→469 +ambospós, consolidar recibos464–469docssomentedocs CIpróprio/pós+APKN/Asópathsárvorelockworkflows idênticos provados; enquantoexecutam auditar frentesinternas e implementarfalhascomprovadas. Rotinaativa atéconclusãoINTEGRALcomprovada/ordemexpressa; fimrodada ou gateisolado nãoencerra projeto, sem pedircontinuar/nem24hcontínuo.


## Reconciliacao de #469 com #468/KVM independentes — 2026-10-11

Pais ordenados[5e29cacde3742b28e8c36a179b535dfa4294d075,fd13d5b70faf4093a2824f904723b6fedc42ab82], semforce/reset. Arvore parte de #468novo com473workflow/devKVM e conserva bytea byte o app combinado de confirmaçao/catch469 e2regressoesreais, mais3regressoes468. DVT ORIGINAL/memoria/checkpoint/ledger/registry conservam TODOdocumento do ancestralnovo e notas469 integrais.

Head469anterior5e29: CI38177958982SUCCESS4/727/367/3; APK38177958961attempt1FAILservicesettings/inputBrokenpipe32 antesinstall, buildSUCCESS. 1failedjobs-only retry doheadantigo emexecuçaoattempt2, nao rerunrunning/não declararPASS/nãoemprestar470APK. Gate novohead469 obrigatórioCI4/727/367/3 epróprioAPK KVM_READY/install/DEVICE_SMOKE_OKmetrofalse/artifactmesmoSHA. Rerun antigo serve sóhistorico5e29, nao autoriza novohead.

Integraçãoinfra473primeiro, depois468, retarget469main jáapontada/reconsultar eventual/diff8paths/bytes/gates/mergebase/equivalencia semperder predecessors. PosCI eAPK devemser conferidos nos SHA reais após cada merge, naoinventarruns[]/running. APIfinance471 eUUIDACK472seguembranches posteriores, trabalhoindependente semcusto/PSP/produção/físicofalso, documentarrecibos e continuar todasfrentesinternas.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #469 — 2026-10-11

Pais ordenados[9f8af7e78ce748bded2bc1a3c0ab55ff41d48506,2242ee79e4102c2ed22eaed072bae805060dbd07], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo468, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/727/367/3 novo eownAPK novo KVM_READY/install/DEVICE_SMOKE_OKmetrofalse/artifactexato obrigatório. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCIeAPK. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Notas historicas de #470/#471 preservadas integralmente



## APK em emulador — KVM no runner existente, sem reduzir gates — 2026-10-11

Falha de infraestrutura investigada em logs primários: post467APK38165293489/job114546488627 no SHA682f0849b5861af0dc2b571c9024b1062743d8b1 usou emulator -accel off, ProbeKVM sem permissão /dev/kvm e boot471902ms (19:06:17.0743300Z), embora install19:10:51.3358475Z e DEVICE_SMOKE_OK19:11:44.4987192Z tenham passado. Post464attempt1 antes falhou serviçosinput/settings Brokenpipe32 antes de instalar; retrybounds resolveu. Não afirmar queKVM é única causa dos erros gráficos/ANR, nem apagar falhas históricas ou declarar softwarefalhou. O workflowUbuntu não tinha configuração das permissões KVM; fonte/código relidos na main e ancestral.

Correção independente em .github/workflows/standalone-pilot-apk.yml: antes do smoke, comprova /dev/kvm characterdevice, aplica regra udevdepermissão KVM recomendada aos runnersGitHub Ubuntu, reload/trigger, exige acesso de leitura/escrita pelo runner e registra KVM_READYdevice=/dev/kvm. Em actionexisting android-emulator-runner, disable-linux-hw-accel:false exige aceleração disponível, sem fallbacksilenciosoemsoftware. Se dispositivo/permissão nãoexistir ou inicialização falhar, o job/artefato continuam BLOQUEADOS, não mascaradosSUCCESS.

Fontes primárias verificadas em2026-10-11: [GitHub — hardware accelerated Android virtualization, publicado2024-04-02](https://github.blog/changelog/2024-04-02-github-actions-hardware-accelerated-android-virtualization-now-available/); [README oficial ReactiveCircus](https://github.com/ReactiveCircus/android-emulator-runner/blob/main/README.md); [main.ts oficial — accessSync R_OK|W_OK antes de escolher KVM](https://github.com/ReactiveCircus/android-emulator-runner/blob/main/src/main.ts). A alteração sóocorre no runner efêmeroCI existente, não computadorusuário/produção. Não muda para runnerpago nem cria serviços.

YAML parse e bash -n do bloco PASS local; não executado sudo/devKVM no ambiente local, não alegar prova de virtualização daí. Prova obrigatória em próprioAPK SHAfinal: novo stepSUCCESS/KVM_READY, configuração disableLinuxHardwareAccelerationfalse, emulator sem -acceloff, install/DEVICE_SMOKE_OKmetrofalse, artefatomesmoSHA/nãoexpirado, logs primários. Não antecipar melhoraquantitativa do boot ou estabilidade antes dessas medições. CI próprio4/727/367/3(1101) e APK obrigatório por pathworkflow; ambos pós SHArealo apósintegração. RegressõesCLI/smokescript/assertionsgatesnativos existentes preservadas bytea byte, sem novo teste textualespelho de YAML.

Preserva ubuntu-latest existente/AndroidAPI35/x86_64/pixel_6/GPU/animations/Java17/Node22/pnpm10.15.1/frozenlock/React19.1.4/RN0.81.6/standalone semMetro/crashgate/diagnosticsfailure/retention14/upload somenteapóssmoke. Aplicações/API/SQL/RLS/segredos/pagamentos/produção/layout inalterados. DVT ORIGINAL/histórico inteiro+memória/checkpoint/ledger/registry/evidência no mesmo ciclo.

Branch parte do head4695e29cacde3742b28e8c36a179b535dfa4294d075/tree1f2362a0c74224cf1d3ccc7471712ee188802ff5, para não perder3regressõesreais468 e2reais469/amboscódigo/docs. Integrar468→469primeiro com própriosgatesnovos; retarget destaPRmain depois e reverdiff7paths/bytes/tree/head/main/mergeable. PrópriosCI/APKnovoSHAobrigatórios; nãoemprestarAPKanterior nemrepetirmerges. Pós próprios de cadaSHAreal devemser confirmados e recibosfinais consolidados emdocsevidência porPRsomentedocs depois, semloopautorrefentemetadados. Capturasrunning/[]nãoPASS.

FísicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/Trustproviders/PSPKYCsandbox/FIN-RISK/Webprovisionamentoeventualpago continuam separados OPEN. Emulador não físico; ZIPdigest não APKindividual. Sem custo/contratação/PSP/dinheiroreal/deploypago/produçãoRailsRailway. Próximo: validar CI/emulador real novoSHA e medir boot, integrarnaordem e verificar pós; continuar auditando todasfrentesinternas da fontecanônica e corrigindo lacunascomprovadas, seminventaratividade/declararconclusão porPRvazia ougateisolado/encerrarrotina.


## Pagamentos simulados — recibo e conflito após INSERT concorrente — 2026-10-11

Auditoria factual da API em main682f0849b5861af0dc2b571c9024b1062743d8b1: PaymentWebhookController fazia SELECT prévio e INSERT ON CONFLICT(tenant_id,idempotency_key) DO NOTHING RETURNING; se outro callback ganhasse entre ambos, rows[0] podia ser undefined. O perdedor também não conferia samePaymentEvent contra o vencedor. Sem ACK factual e sem conflito explícito para payload divergente. Reproduzido em execução do controller/adapter HMAC reais, com respostas SQL controladas: 7 regressões, RED3PASS4FAIL→GREEN7PASS. Local usa transformação TypeScript de Node com decorators removidos e exceções de fixture; não é prova de Nest/HTTP/Postgres nem PSP.

Correção restrita à confirmação/idempotência: conserva SELECT/INSERT existentes e todos parâmetros escopados, retorna ACK do insert vencedor; caso rows vazio, reconsulta mesma chave dentro db.tenant atual e exige equivalência exata provider/assignment/eventtype/amount/reference/recipient. Retorna o recibo persistido ou 400idempotency_conflict; falta de replay e erros SQL continuam erros, sem ACK inventado, UPDATE financeiro, sobrescrita, retry automático, mudança de ledger/reconciliação ou dinheiro real. Nova leitura de statement no READ COMMITTED conserva isolamento RLS e assinatura/timestamp/destinatário. [PostgreSQL17 — Transaction Isolation](https://www.postgresql.org/docs/17/transaction-iso.html) fundamenta que DO NOTHING pode perder contra linha não visível ao snapshot inicial; próximaSELECT vê commit.

Testes originais de assinatura/segurança e HTTP de finance-reconciliation preservados. Novo TSunitário chama controller real com HMAC real: insert novo, replay pré-existente exato/mismatch, perdedor concorrente igual/mismatch nas6 dimensões, vencedor desaparecido, erro SQL e validação/assignment/recipient antes da escrita. Sem source-regex/cópia da decisão. Nova prova HTTP/Postgres real usa barreira SHARE TABLE na base efêmera mlivretrabalho_http e espera duas requests realmente bloqueadas no RowExclusiveLock de INSERT, liberando só depois; duas assinaturas iguais exigem 201 com mesmo UUID/recibo+1row, divergentes exigem 1×201 e1×400conflict+1row, replaysequencial/mismatch continuam testados. Apenas fixture CI=true/1, hostDBlocalhost/127.0.0.1, baseCI conhecida, hostHTTP local; não pode apontar serviço público ou outra base. Clients/timers limitados e rollback/finally; eventos authorized simulados não alteram payout/recebimento. Cenário executado pelo script financeiro EXISTENTE após afirmações originais e antes de checar tenantB. Sintaxe Node/bash PASS; HTTP real é gate CI pendente, não declarar aprovado antes dos marcadores.

Base da branch é head470f25b8d50e94f16e52fd0c6c09207be46813a37e3/tree5722ee7dc56fb323d0c4875e69641d777a34e79e. Ordem468→469→470→estaPR, retargetmain depois470 e revisar10paths/bytes/ancestralidade. CI próprio esperado4/727/374/3(1108), todos testes/HTTP/novos marcadores PASS no SHAexato antesmerge, pósCI real obrigatório. APK N/A somente após comprovar árvore mobile/lockfiles/rootworkspace/workflows/build/smoke bytea byte idênticos ao predecessor470 já aprovado, e paths10restritosAPI/scriptsfinance/docs; não emprestarAPK de SHA distinto como se fosse destaAPI. Se workflowAPK gerar run, verificar próprio em vezdeafirmar inexistência. Não relaxarRLS/tenant/auth/HMAC/PSP/externalbindings/moneyrisk, não tocarprodução nem custos.

DVT ORIGINAL integral/histórico+memória/checkpoint/ledger/registry+evidência no mesmo ciclo. FísicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTproviders/PSPKYCsandbox/FIN-RISK/Webpagodeploy continuam OPEN separados. Não declarar todasfrentesinternas completas por cobertura desta falha. Próximaação: próprioCI exactSHA com testeNest e duas barreirasHTTPPG, revisar/retarget/integrar após predecessores, verificarpós, consolidarrecibos reais e continuar auditoria independente de todasáreas canônicas.


## Reconciliacao de #471 com predecessores novos e KVM473 — 2026-10-11

Pais ordenados[44bb92dcaaaf9e15aa9f5804637bcf2a34ac06ef,9f8af7e78ce748bded2bc1a3c0ab55ff41d48506], semforce/reset/perda. Conserva bytea byte4pathsAPI/finance e7regressoescontrollerHMAC/duasbarreirasHTTPPostgres. CIanterior38178800341/job114586754292SUCCESS4/727/374/3 ePASSbarreiras22:05:21Z pertencemSOMENTE44bb, naoautoriza novoSHA. OwnCI novo obrigatório4/727/374/3 +7títulos/ambosHTTPbarreira, depoispostCIactualreal.

Fonte tree é469novo com473workflowKVM/apps dospredecessores, importsAPIfinance+dosevidências471 e470historica. 470nãointegradacomoapp, note/evidência preserved apenasfotografia de sourceKVMtestadooldf25/syntheticd6bae, seráSUPERSEDED por infra473 apósgates. Nãoalegar470merged ou emprestarbinary. DVToriginal5docs mantem integrodoc doantecessornovo+notasoriginais470/471; semresumoouapagardatas/falhas.

Ordem473→468→469→471; retarget471main sóapós469einfra473integrados, revisar11paths(API4+5docs+2evidencias), verificar todosmobile/rootlock/workspace/workflows/build/smoke blobSHAs/modes idênticos469. APK N/A por escopoapenasAPI/finance/docs somenteapósown+postAPKinfra epredecessorconfirmados; se run existirchecarpróprioSHA. Não usarEMPTY/runningcomoPASS. Preservar RLS/HMAC/auth/recipient/replay/moneyrisk/layout/ReactRN/frozenlock. Sem PSP/dinheiroreal/custos/deploypaid/produção; físicos/provider/pentestcontinuamOPEN. Atualizarrecibos reais apósmerges, continuartodasfrentesinternas.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #471 — 2026-10-11

Pais ordenados[7e4817f20ba6df547dc7dcd3490d44e463b621a4,5a418f3e938f416d71642a6a9b884ec8167ce809], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo469, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/727/374/3 novo eAPK N/A SÓcomparaçãoexata de mobile/rootlock/workflows/build/smoke contraantecessorjáown/postgatesprovados, senãoverificarprópriorun. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCI/APKscopeN/Aprovada. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Notas historicas de #472 preservadas integralmente



## Candidatos — ACK de alocação UUID antes de confirmar na tela — 2026-10-11

Auditoria factual depois do candidate transport/catch guards: confirmCandidate aceitava qualquer string id não vazia no ACK. Com mesmas jobId/professionalId/tenantId/status='confirmed', id='assignment-a' fazia handler REAL Candidatos exibir 'Profissional confirmado.' mesmo após GET de interessados ainda interessado. Migração canônica0006_work_assignments define idUUID PK DEFAULTgen_random_uuid; CompanyJobsController devolve esse id de work_assignments. Não aplicar UUID a roleIdTEXT/governança nem criar requisito novo para IDs de listas.

Duas novas regressões pré-JSX/confirmCandidate e parsers reais, fixtures explícitas hooks/auth/fetch/timers: RED35PASS1FAIL/36 sobre helper anterior→GREEN36 com correção. 34 testes anteriores preservados integralmente em assertions/resultados/falhas/rotas/headers; somente ACK positivo antigo id='a'/'assignment-a' atualizado para UUID realístico, sem enfraquecer testes. Fixture configureACK não se confunde com opçõesHTTP. Novo caso inválido inclui stringfictícia/malformed/whitespace/nonstring, mantém mensagem de resultado desconhecido e interessados reais, sem falseconfirm; controle UUIDlower/upper exibe confirmação factual e mantém validação exata job/profissional/tenant/status, refresh e únicoPOST. Testes não fazem write público nem renderReactNative/físico.

Correção mínima em lib/company-candidates.ts: uuid guard no d.id do ACK, sem trim/normalização do recibo, mantém correspondência exata demais campos e HTTPok/statusconfirmed. Candidatoscontinua consultando interessados para conferir resultado e não repete escrita automaticamente. Autenticação/sessão/seleção/deadline/blur/tenant/tentativaexplícita e ordenação/recomendações/fallbackoriginais preservados, API/SQL/ledger/RLS/matching/layout/mobileversions/lock sem mudança.

Base desta branch é head47144bb92dcaaaf9e15aa9f5804637bcf2a34ac06ef/tree30ecdf1bb7b70f595ec541b0830b080aea2df921; preserva predecessores468/469/470/471. #471CI38178800341/job114586754292SUCCESS4/727/374/3 e ambasbarreirasHTTPPostgres reais, mas não integrado. #470CI38178173114 e próprioAPK38178173119SUCCESS/KVM_READY/boot32693ms/install/DEVICE_SMOKE_OKmetrofalse/ZIP11717017692SHAf25...; não emprestar470APK a outroPR. #469ownAPK38177958961attempt1FAIL antesAPKinstall: boot505514ms, servicesettings/inputBrokenpipe32/adbexit224 em22:09:45Z; buildSUCCESS, não evidência de falha no app. Failedjobs-only rerun solicitado UMAvezmesmohead5e29...; aguardar attempt2/novo job, não rerunrunning. #468ownAPK38177844411 ainda execução; nenhum merge antecipado. Corrigirinfra independentese retryconfirmarfalhanova, sem emprestarAPK ou relaxarsmoke.

PrópriosCI eAPK obrigatórios por pathmobile destaPRnovoSHA, CI esperado4/729/374/3(1110) +testestítulosreais +HTTPpréexistente/novasbarreirasfinanceiras. Ordem468→469→470→471→estaPR; retargetmain sóapósantecessor, reconsultar mergeableeventual, diff9paths/helper+2testsfiles+5docsexistentes+evidência/bytes/tree/heads/main antesmerge. Confirmar próprios/pósCI eAPK no SHAreal. Não marcarSUCCESS running/[] nemconfundirapkCRC/ZIPdigest/físico. Nãoinventar testesespelhosource ou commits sóatividade.

Histórico completo DVT ORIGINAL1.104/memória/checkpoint/ledger/registry preservado emlugar+evidência no mesmociclo. Próximo: própriosgates headnovo, acompanharinfra469 limitado, mergeordem e pós, consolidarrecibosfinais464–atual; continuar todasáreas internas com lacunasprovadas. Gates físicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTprovider/PSPKYCsandbox/FIN-RISK/Webpago continuam separadosOPEN. Semcustos/PSPreal/contratação/produção/deploypago; não encerrarrotina por bloqueioparcial/fimrodada.


## Reconciliacao de #472 com pagamentos/candidatos/KVM atuais — 2026-10-11

Mergeancestral pais[5a717c8630b30ed371097b6cc477007def337d65,7e4817f20ba6df547dc7dcd3490d44e463b621a4], semforce/perdadepredecessor. HelperUUID/2regressoeshandler e8testesoriginaispositivosfixtureUUID preservados bytea byte; 36alvostestadosRED35PASS1FAIL→GREEN36, mesmosall34assertionsanteriores. App/finance/HMAC/API do ancestralnovo preservados. 5docsoriginaisinteiros recebem apenasnotashistoricas472 eesta reconciliação.

OwnCI/APK dohead5a717, se terminarem, pertencem apenasSHAantiga. NovoheadexigepróprioCI4/729/374/3 epróprioAPKhardwareKVM/install/DEVICE_SMOKE_OKmetrofalse/artifactnãoexpirado; verificar passos/logs/testesHTTP/UUID noSHAexato. Ordeminfra473→468→469→471→472, retargetmain depois471, diff9paths/códigomesmobytetree/headerlock, merge sóown gatesgreenfrescos; verificarposCI/APK SHAreal. NãoemprestarAPK/[]/running, nãoinventarworkflowouconclusãointernatotal. APKemulador≠físico; físico/E2E/VisualTruth/SecureStore/piloto/pentest/provider/PSPFINRISK/Webpago OPENseparados. Semcusto/dinheiroreal/PSP/produção/deploypaid. Prosseguir auditoria segura e consolidarreciboscanônicos apósmerges, semloopmetadadosautorrefente.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #472 — 2026-10-11

Pais ordenados[a3c9b3adc4efa5f2a65fcdc6a019aa1f9a315b8e,a031a835161dba89389552d9b4885704db996a09], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo471, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/729/374/3 novo eownAPK novo KVM_READY/install/DEVICE_SMOKE_OKmetrofalse/artifactexato obrigatório. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCIeAPK. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Pagamentos simulados — JSON null assinado não causa TypeError/HTTP500 — 2026-10-11

Falha factual no SignedJsonPaymentProviderAdapter: depois da assinaturaHMAC/timestamp válidos, JSON.parse('null') era castRecord e payload.tenantId lançava TypeError('Cannot read properties of null'). Controller propagava erro não classificado, em vez de BadRequestpayment_event_invalid. Nullassinado é entrada inválida, não pedido financeiro válido; verificaçãoassinatura não é validação deestruturaJSON. Reproduzido noadapter econtroller reais: 14regressões, RED12PASS2FAIL→GREEN14PASS, mantendo5adaptertests+7replaycontrolleroriginais/assertions. LocaltransformTS/fixtureexceção não provaNestHTTP; CI exato deve comprovar.

Correção mínima: após JSONparse e APÓS validação timestamp/assinatura, anteslercampos, exige payloadnãoNULL/object/nãoarray e lança PaymentWebhookVerificationErrorpayment_event_invalid. Controllerexistente traduz erro em400; inválidaassinatura/antiga continua403 precedência intacta. Nada consulta db.tenant ouescreve quandoJSONnull; nenhumACK/UPDATE/retry automático/novoPSP/ledger/moneyrule/RLSconfusão.

Doistestesnovos comportamentais: adapterHMACreal rejeitaNULL/primitive/array/objeto vazio com erro tipado e controllerassinadoNULL exigeeventinvalid antes de tenant/query. Todoscontrolespositivo/sandboxpayoutrecipient/tampering/stale/valornegativo/replayconcorrente exato/conflict sixfacts/dberrors ficam intactos. FixtureHTTPfinanceiro existente acrescenta signedcallbacknull, exige400messagepayment_event_invalid ePASSmarker antes ambasbarreirasPostgres reais; hostDBCI/local/mlivretrabalho_http eURLlocal guardados, noPSP/serviçopúblico/produtoexterno. Sintaxe local Node/bash preservada; HTTPnull égateCIpendente nestecommit, nãoalegarPASSantesprimários.

Branch parte do novohead472a3c9b3adc4efa5f2a65fcdc6a019aa1f9a315b8e/tree7262c1fdb30680ad773f3fe9ed80483e508d932b, preserva infra473/468transport/469catch/471replay/472UUIDACK e TODOhistórico5docsOriginais emlugar+evidência. Diff10paths: adapter+seuteste+controllerteste+HTTPhelper+5coreDocs+evidência, semmobile/rootlock/workspace/workflows/build/smoke changes. OwnCI expected4/729/376/3=1112+testtitles+signedNULLHTTP400+ambasbarreirasfinanceiras. APK N/A somenteprovaárvoremobile/rootlock/workflow/smoke idêntica472apóspróprio/posAPKexactpredecessor aprovado; []nãoéPASS. Retargetmain sódepois472; mergeownCIexactGREEN/reviewbytes/tree/heads/main, pósCIactual obrigatório. Ordem473→468→469→471→472→estaPR; snapshot473/468/469/471/472gates próprios novos aindaem acompanhamento, nãoemprestarAPKsoutdated.

PreserveReact19.1.4/RN0.81.6/frozenlock/tenantRLS/auth/HMAC/standalone/desenho; semdinheiroreal/PSP/custo/serviços/segredos/deploypago/produçãoRailsRailway. FísicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTprovider/PSPKYCsandbox/FIN-RISK/WebpagocontinuamOPENseparados. Próximo: própriosCI comNest+HTTPPostgresrealSHAfinal, seguirmergesgatesordenados/verificarpós, consolidarrecibosreais completos464–atual porPRdocssemloopmeta, prosseguir auditoria segura de todasfrentesinternas seminventaratividadeoufechamento geral.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #474 — 2026-10-11

Pais ordenados[3c2add6b12e52035b3920553b720c3c396a596db,90a7498f4de4e0473216d4fe06be54fafe54e1a5], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo472, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/729/376/3 novo eAPK N/A SÓcomparaçãoexata de mobile/rootlock/workflows/build/smoke contraantecessorjáown/postgatesprovados, senãoverificarprópriorun. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCI/APKscopeN/Aprovada. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Ciclo 2026-10-11 — merges verificados e limite inteiro do callback assinado
Base factual main `933e584c49c45aff80f9268e80f2b094296f67b4`, tree `487b9e7ef8dab59fdade639578f0c523a9ac5b7a`. Releitura README→DVT ORIGINAL v1.104/memória/checkpoint no SHA, PRs, código, CI, artefatos e logs primários. Os registros anteriores são snapshots históricos, preservados integralmente; estados atuais abaixo substituem suas pendências, não suas evidências.

### Entrega e proveniência
#473→#468→#469→#471→#472→#474 integrados uma única vez por merge. Ordered parents=[main anterior,head aprovado], árvore resultante igual à árvore candidata e avanço de main comprovados pela API em cada integração. #473 e #468 já estavam merged ao reconsultar, portanto não se repetiu a operação. #470 não foi integrado: implementação inicial udev foi substituída pelo #473 independente e corrigido; fechamento administrativo como superseded não equivale a merge.
Cada head tem CI próprio completo success. #473/#468/#469/#472 têm APK próprio success, instalação e DEVICE_SMOKE_OK metro_required=false, artefato do SHA não expirado. #471/#474: APK N/A por escopo comprovado, sem mudança em mobile, lock/workspace, workflows/build/smoke relativamente aos predecessores; ausência de run não se chama PASS. Os APKs pós-merge dos predecessores ainda em execução no momento deste registro devem ser acompanhados até prova, nunca substituídos por artefato de outro SHA.
KVM validado no runner efêmero: dispositivo existente /dev/kvm, modo0666, acesso leitura/escrita e KVM_READY, disable-linux-hw-accel=false, comando real sem -accel off. Não é teste físico. A primeira tentativa #473 com udev falhou antes de instalar; não se afirmou qual subcomando falhou. Novo código aplica diretamente o mesmo acesso pretendido ao dispositivo existente e todos os gates continuam obrigatórios. Cabe acompanhar pós-merge e registrar falha/log real se ocorrer.

Recibos consultados nesta rodada (IDs são links https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/ID; running≠PASS):
```json
[
  {
    "pr": 473,
    "merge": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
    "head": "c33b2823950c990ceda9815dffe9c42b74b8366a",
    "tree": "37de203b255238a1e5530614bb2841aaed501b91",
    "parents": [
      "682f0849b5861af0dc2b571c9024b1062743d8b1",
      "c33b2823950c990ceda9815dffe9c42b74b8366a"
    ],
    "ownCI": {
      "run": 38180539072,
      "sha": "c33b2823950c990ceda9815dffe9c42b74b8366a",
      "job": 114591960350,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        722,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180539085,
      "sha": "c33b2823950c990ceda9815dffe9c42b74b8366a",
      "job": 114591960282,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:40:24.4028169Z Success",
        "2026-10-11T22:40:36.7452696Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717966676,
        "size_in_bytes": 28911004,
        "digest": "sha256:6a06214ba25977ec50f19e3be1ef368aa1ad3cf5e830ff79126f4fe2e26bb69d",
        "expires_at": "2026-10-25T22:40:38Z",
        "expired": false,
        "head_sha": "c33b2823950c990ceda9815dffe9c42b74b8366a"
      }
    },
    "postCI": {
      "run": 38181442437,
      "sha": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "job": 114594673900,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        722,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181442348,
      "sha": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 468,
    "merge": "567221ee2db677c21580fa72874688cee20564ca",
    "head": "2242ee79e4102c2ed22eaed072bae805060dbd07",
    "tree": "dffef23c56d53f5645c6f400e1cca09b5ea94cb0",
    "parents": [
      "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "2242ee79e4102c2ed22eaed072bae805060dbd07"
    ],
    "ownCI": {
      "run": 38180624911,
      "sha": "2242ee79e4102c2ed22eaed072bae805060dbd07",
      "job": 114592228754,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        725,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180624934,
      "sha": "2242ee79e4102c2ed22eaed072bae805060dbd07",
      "job": 114592229034,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:40:03.4057533Z Success",
        "2026-10-11T22:40:15.8355741Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11718450944,
        "size_in_bytes": 28911028,
        "digest": "sha256:01ad04507c3f3077186167d9cde1e646ce8a264301ea9e74c5e7f412767958a8",
        "expires_at": "2026-10-25T22:40:17Z",
        "expired": false,
        "head_sha": "2242ee79e4102c2ed22eaed072bae805060dbd07"
      }
    },
    "postCI": {
      "run": 38181629368,
      "sha": "567221ee2db677c21580fa72874688cee20564ca",
      "job": 114595240551,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        725,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181629374,
      "sha": "567221ee2db677c21580fa72874688cee20564ca",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 469,
    "merge": "38b253f603f19938c22001c502963ab08287a08f",
    "head": "5a418f3e938f416d71642a6a9b884ec8167ce809",
    "tree": "c2e1aa7d7452ae01087ddc45c3f59d640f14d624",
    "parents": [
      "567221ee2db677c21580fa72874688cee20564ca",
      "5a418f3e938f416d71642a6a9b884ec8167ce809"
    ],
    "ownCI": {
      "run": 38180627279,
      "sha": "5a418f3e938f416d71642a6a9b884ec8167ce809",
      "job": 114592236030,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180627318,
      "sha": "5a418f3e938f416d71642a6a9b884ec8167ce809",
      "job": 114592236477,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:39:38.6580712Z Success",
        "2026-10-11T22:39:51.2457223Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717647226,
        "size_in_bytes": 28911058,
        "digest": "sha256:45d21dc20f89435031fbbf508f109ab0221ac935bc8b7ff7c0cf0384f272eff3",
        "expires_at": "2026-10-25T22:39:52Z",
        "expired": false,
        "head_sha": "5a418f3e938f416d71642a6a9b884ec8167ce809"
      }
    },
    "postCI": {
      "run": 38181961285,
      "sha": "38b253f603f19938c22001c502963ab08287a08f",
      "job": 114596235120,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181961351,
      "sha": "38b253f603f19938c22001c502963ab08287a08f",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 471,
    "merge": "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
    "head": "a031a835161dba89389552d9b4885704db996a09",
    "tree": "4d7df3d2ab4a98d056f9597593b626b31a404200",
    "parents": [
      "38b253f603f19938c22001c502963ab08287a08f",
      "a031a835161dba89389552d9b4885704db996a09"
    ],
    "ownCI": {
      "run": 38180630973,
      "sha": "a031a835161dba89389552d9b4885704db996a09",
      "job": 114592248277,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        374,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": "N/A: mobile, dependency files, workflow and smoke unchanged relative to predecessor",
    "postCI": {
      "run": 38182001026,
      "sha": "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": "N/A: mobile, dependency files, workflow and smoke unchanged relative to predecessor"
  },
  {
    "pr": 472,
    "merge": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
    "head": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
    "tree": "8375bdb0fe165e5c43af49fc758b851f251818b1",
    "parents": [
      "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
      "90a7498f4de4e0473216d4fe06be54fafe54e1a5"
    ],
    "ownCI": {
      "run": 38180634772,
      "sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
      "job": 114592260912,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        729,
        374,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180634538,
      "sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
      "job": 114592260054,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:41:48.7539333Z Success",
        "2026-10-11T22:42:01.3051492Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717826308,
        "size_in_bytes": 28910954,
        "digest": "sha256:8adde9570883e6b1e6fa122deab6fa1f19fb03c599e924657f9a1d28366cb2ee",
        "expires_at": "2026-10-25T22:42:02Z",
        "expired": false,
        "head_sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5"
      }
    },
    "postCI": {
      "run": 38182026864,
      "sha": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": {
      "run": 38182026860,
      "sha": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 474,
    "merge": "933e584c49c45aff80f9268e80f2b094296f67b4",
    "head": "12e94426901461448f8c18b586011631c8048489",
    "tree": "487b9e7ef8dab59fdade639578f0c523a9ac5b7a",
    "parents": [
      "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "12e94426901461448f8c18b586011631c8048489"
    ],
    "ownCI": {
      "run": 38180637940,
      "sha": "12e94426901461448f8c18b586011631c8048489",
      "job": 114592270958,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        729,
        376,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": "N/A: mobile, dependency files, workflow and smoke unchanged",
    "postCI": {
      "run": 38182059488,
      "sha": "933e584c49c45aff80f9268e80f2b094296f67b4",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": "N/A: mobile, dependency files, workflow and smoke unchanged"
  }
]
```

### Próxima falha concreta corrigida nesta branch: amount_cents INTEGER
Migração existente `packages/db/migrations/0017_payment_events.sql`: amount_cents integer NOT NULL CHECK(amount_cents>=0). Adapter assinado verificava Number.isInteger e>=0, aceitando 2147483648 e números inseguros como1e100 antes de SQL (overflow do integer). Ajuste mínimo: Number.isSafeInteger, intervalo inclusivo0..2147483647, sem arredondar/clamp, sem nova política comercial, sem alteração de schema.
Dois testes comportamentais adicionais executam adapter/controller reais: invalididades assinadas rejeitam payment_event_invalid e nenhum tenant/query; zero e máximo preservam o ACK factual e valor exato; assinatura inválida mantém precedência. HTTP/Postgres real da CI verifica400 sem eventos para entradas inválidas, 201+id/amount iguais à linha real em zero/máximo e replay idempotente, além dos testes prévios de JSONnull e das duas barreiras concorrentes.
Sem resultado local inventado: execução de comandos locais ficou indisponível nesta parte da rodada; CI primário/Nest/HTTP/Postgres no próprio SHA ainda precisa passar (esperado4/729/378/3=1114). Não há alegação RED/GREEN local desta tarefa. Branch/PR deve permanecer draft até aprovação dos gates aplicáveis, revisão diff/bytes/árvore e revalidação main/head. APK N/A somente após confirmar que os paths mobile/dependências/workflow/smoke são idênticos à base. ID UUID de entrada no controller foi identificado para auditoria seguinte, mas não alterado nem dado como testado neste patch.

### Continuidade e limites
Após integrar esta correção, confirmar ordered parents/tree/main e CI pós-merge real. Consolidar recibos finais dos APKs pós-merge #473/#468/#469/#472, sem loop de commits autorreferentes (últimos gates do commit documental podem ficar no recibo do PR/checkpoint de retomada). #464–#467 já têm provas pósCI/APK verificadas, preservadas nos históricos; não repetir merges/reruns. Examinar funcionalidades reais por área do plano mestre/requisitos/código/testes, não concluir pelo número de PRs/issues.
Todas as áreas internas seguem no escopo: telas/navegação, login/cadastro/sessão, vagas/profissionais/agenda, empresas/equipes/candidaturas/matching, simulados financeiros/notificações, backend/APIs, tenant/RLS/Postgres/segurança, emulador APK e documentação. Empresa já renderiza CompanyNav e início profissional já consulta APIs reais; não recriar tarefas antigas já corrigidas. Preferências/ajuda sem vínculo/previsões de no-show exigem contrato/dados e não autorizam política inventada; verificar alternativas independentes.
Android FÍSICO/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST providers e PSP/KYC sandbox/FIN-RISK permanecem OPEN e separados. #224 Web depende serviço Railway eventualmente pago, sem provisionar. React19.1.4/RN0.81.6, frozen lockfile, isolamento/RLS, desenho canônico e standalone semMetro preservados. Sem PSP real, dinheiro real, serviços novos, custos, segredos, produção/Railway/deploy pago. ZIP digest é ZIP, não APK individual; não atribuir BUILD_INFO sintético ao head literal. Rotina continua ativa, sem exigir CONTINUAR, sem afirmar execução24h ou conclusão integral.


## Ciclo 2026-10-11 — IDs internos do callback antes do SQL
Predecessor #475 `fix/payment-webhook-integer-bounds`, head `62efd612a4582e0b473189d35c0c016be73aacf1`, tree `a14ee4967df485e3488a4e7e692843d72abea2e6`, CI38182249396 em execução na consulta; ainda não integrado. Main verificada933e584c49c45aff80f9268e80f2b094296f67b4. PRs #473/#468/#469/#471/#472/#474 merged, sem repetir. Recibos completos e histórico original permanecem acima.

Falha independente auditada no controller financeiro: adapter genérico verifica campos string, mas o endpoint concreto usa tenant_id/assignment_id UUID(migração0017) e recipient_professional_id UUID(opcional,0032). Strings nãoUUID assinadas atravessavam a validação e podiam falhar na conversão PostgreSQL. Guard local no PaymentWebhookController após HMAC/timestamp/parse e antes de db.tenant rejeita formatos malformados com400/payment_event_invalid. Mantém contrato genérico do adapter/provenance/idempotencyKey(provider TEXT), roleId TEXT, comparação EXATA de destinatário/profissional, RLS/tenant, replay/concorrência e ausência de UPDATE/dinheiro real. Não normaliza IDs.
Dois testes adicionais com controller real: 3campos×8valores malformados (texto, vazio/espaços/compacto, number/object/array) exigem0tenant/0query; IDs válidos mantêm ACK real e igualdade exata do destinatário; assignment ausente e destinatário diferente UUID continuam erros específicos sem INSERT. A fixture antiga de destinatário diferente passa de 'other' para UUID diferente válido, mantendo a mesma assert payout_recipient_mismatch e única consulta; não se remove o controle.
HTTP/Postgres real exige400 para todas as entradas malformadas sem linha em qualquer tenant para a chave dedicada e preserva assignment_not_found para UUID válido inexistente. Testes prévios de assinatura/timestamp, JSONnull, extremos INTEGER e duas barreiras concorrentes continuam obrigatórios. Esperado4/729/380/3=1116. Nenhum resultado local alegado(runtime local indisponível); próprios gates do SHA resultante ainda precisam ser executados e aprovados.
APK N/A por escopo API/controller/test/HTTP/docs apenas, a comprovar pelas árvores/paths iguais para mobile/lock/workspace/workflows/build/smoke; []nãoPASS. Base empilhada #475 deve ser integrada primeiro, depois retarget main, reconsultar eventual mergeable/diff/bytes/árvores/gates e integrar uma única vez apenas green. Se conflito real, reconciliar ancestral sem force/perder alterações e reexecutar em novo SHA.

PósCI #473/#468/#469/#471/#472/#474 são consultados no merge real, não emprestados de heads. APK pós#47338181442348/job114594673494 attempt1 SUCCESS/install22:53:42.564Z/DEVICE_SMOKE_OK22:53:54.939Zmetrofalse/ZIP11717758640 28910998bytes/digestsha256:0f6023b8b1911f1193f231385541ced9c205c6a9731e62eb6869ccc183d28a08/exp2026-10-25T22:53:56Z. #470 fechado superseded, não merged. APK pós#46838181629374/#46938181961351/#47238182026860 ainda em execução no snapshot; acompanhar e registrar resultados reais. Pós#475 deve ser descoberto após merge; não criar workflow imaginário nem chamarrunning de aprovado.
Depois desta tarefa, consolidar recibos finais em PR documental com CI próprio/pós e APK N/A por equivalência; evitar loop autorreferente de commits. Continuar auditoria factual das áreas internas e requisitos/código/testes reais, sem transformar ausência de PR/issue em fechamento. Preferências/helpsemvínculo/previsões ainda exigem contrato/dados; mover alternativas seguras. Celular físico/E2E/VisualTruth/SecureStore/piloto, pentest independente/TRUST providers, PSP/KYC sandbox/FIN-RISK/Web Railway pago OPEN separados. Não habilitar PSP/dinheiro real/custos/serviços/deploy pago/produção/segredos. Preservar React19.1.4/RN0.81.6/lockfilefrozen/RLS/standalone semMetro/desenho canônico. Documento ORIGINAL v1.104 e memória/checkpoint/ledger/registry inteiros preservados; rodada não fecha projeto; rotina segue ativa sem CONTINUAR e sem promessa24h.


## Ciclo 2026-10-11 — confirmação simultânea de candidato
Base main `edaa4f923b1789809b9ed399964f621fa6b271c1`, tree `204408ac0d1e3ea42fd104c7966e4653c5fcbbe0`, #476 já merged à consulta; não repetir. #475 merged00df69af74f394907b4bff0ba32727a0ac73c4ea. Próprios CI47538182249396/job114597076328 SUCCESS4/729/378/3(1114) e47638182495135/job114597830776 SUCCESS4/729/380/3(1116), assinatura/JSONnull/limitesINTEGER/UUID/HTTPPostgres/barreirasconcorrentes PASS no SHA exato. APK475/476 N/A API+tests+docs, mobile/dependencies/workflow/build/smoke idênticos. PósCI real47538182555348 e476 a descobrir/acompanhar, running/[]nãoPASS.

Todos APKs pós-merge pendentes das integrações móveis desta rodada agora SUCCESS, logs primários confirmam instalar/lançar metro_required=false e artefatos dos próprios mergeSHAs não expirados:
- #473 mergecfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70, postAPK38181442348/job114594673494 attempt1, install22:53:42.564Z/smoke22:53:54.939Z, ZIP11717758640/28910998/digestsha256:0f6023b8b1911f1193f231385541ced9c205c6a9731e62eb6869ccc183d28a08/expires2026-10-25T22:53:56Z.
- #468 merge567221ee2db677c21580fa72874688cee20564ca, postAPK38181629374/job114595240503 attempt1, install22:56:55.562Z/smoke22:57:08.027Z, ZIP11717762633/28911013/digestsha256:7d160e3b9871e9c8f125da5444d20e8ba5429533090926d0b97fc5c91d611130/expires2026-10-25T22:57:09Z.
- #469 merge38b253f603f19938c22001c502963ab08287a08f, postAPK38181961351/job114596235517 attempt1, install23:01:44.822Z/smoke23:01:57.242Z, ZIP11717854452/28911063/digestsha256:8bb9649fec5250cc06d54df26a0cd3e04023afe77e3061ba2ef8199da7e44246/expires2026-10-25T23:01:58Z.
- #472 merge42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5, postAPK38182026860/job114596422655 attempt1, install23:00:20.882Z/smoke23:00:33.370Z, ZIP11717839222/28910958/digestsha256:02fee094b7c610e020320f61f6a5c922be077b9fc9a5be1d20797d2676dcaa61/expires2026-10-25T23:00:35Z.
ZIP digest refere-se ao ZIP; não chamar APK individual. Emulador não é físico. Próprios APKs/head/trees e pais já constam integralmente nos recibos anteriores. #470 superseded fechado, nunca merged.

### Falha concreta auditada no caminho empresa→confirmação
CompanyJobsController.confirm lia vínculo inexistente, depois INSERT, dentro de db.tenant com BEGIN/READ COMMITTED, sem retry automático. UNIQUE(job_id,professional_id) na migração0006 evita duplicação, mas dois clientes simultâneos podem ambos ler ausência e o perdedor receber erro de constraint em vez de recibo idempotente. Não se alegou reprodução RED local/CI antiga: risco comprovado pela estrutura/transação e nova regressão pública será validada na CI.
Correção: requireJob aceita bloqueio opcional FOR UPDATE, usado exclusivamente pelo POST confirm, antes de consultar interesse/vínculo. Segundo POST do mesmo job aguarda primeiro commit e retorna vínculo real pelo caminho idempotente existente. GETcandidates/recommendations continuam sem lock opcional; regras/roles/status/tenant/capacidade/notify/ownership não mudam. Sem ON CONFLICT cego/ACK inventado, sem nova infraestrutura ou custos.

Novo cenário HTTP/Postgres em scripts/company-confirmation-concurrency-e2e.cjs, chamado no fim da jornada existente antes de signout, preservando TODAS suas asserts. Cria job isolado viaAPI + interesse via profissional legítimo, exige membership já criada pela jornada original(não seed/não enfraquece sua prova), usa SHARE lock em work_assignments para sobrepor duas requisições HTTP reais. Observa ambas bloqueadas no banco antes de liberar. Exige201/201, ACKs exatamente iguais(id/date/tenant/job/prof/status), uma linha real, incremento de exatamente uma notificação sobre o contador factual anterior, replay sequencial idêntico e outraempresa401 sem nova linha. Não faz escrita em produção: CI=true/1, DB e HTTP localhost e DB dedicada mlivretrabalho_http, credenciais efêmeras dos usuários da jornada. Nenhum token é registrado em evidência.
Contagem unitária permanece4/729/380/3=1116; a prova nova é HTTPconcorrente. Sem resultado local alegado(runtime local indisponível). CI próprio no head resultante deve SUCCESS e conter marker novo; gates anteriores não autorizam novoSHA. APK N/A só comprovada equivalência exata mobile/rootlocks/dependencies/workflows/build/smoke. Revisar diff/bytes/fullhistory/tree, revalidar head/main/mergeable e integrar uma vez; confirmar orderedparents/tree/main e CI pós-merge real. Caso teste/barreira falhe, ler logs primários e ajustar o problema real sem retirar assertions ou emprestar provas.

### Auditoria factual por áreas e próximas ações
No CI real de #475/#476, HTTP/Postgres aprovou auth/jornada multiempresa, estados/lifecycle/agenda/earnings, perfil/disponibilidade/taxonomia, empresa/equipes/planner/candidatos/matching explicável, notificações com leituras isoladas/idempotentes, pagamentos assinados simulados/reconciliação, suporte/safety/trust/privacy, migrações/RLS/readiness. São provas desses contratos, não fechamento integral do app/desenho ou pentest.
Releitura atual de empresa.tsx confirma CompanyNav; profissional-inicio.tsx carregaAPIs/fatos e loading/erro/vazio/deadlines sem retornar mocks. matching.ts/role-fit.ts/company-jobs/earnings/notifications lidos; roles continuamTEXT, earnings filtra identidade+tenant e recomendações usam sinais reais de função/cidade/disponibilidade/histórico. Preferências/helpsemvínculo/previsões dependem contrato/dados, não se inventou funcionalidade ou commit para atividade.
Após esta integração, consolidar TODOS os recibos finais próprios/pósCI/APK, inclusive464–467, nos5documentosoriginais/registry/evidência/checkpoint por único PR documental(CI próprio/pós; APK N/A com equivalência), sem loop de commits para incluir o próprio SHA. Depois auditar próximas lacunas reais por requisitos/código/testes, não usar0PRs/issues como prova deconclusão.
React19.1.4/RN0.81.6 confirmados no package.json atual; lockfile/root/workflow/mobile163blobs equivalentes na alteração API anterior. Celular físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUSTproviders, PSP/KYC sandbox/FIN-RISK e serviço WebRailway pago(#224) seguem OPEN separados. SemPSP/dinheiroreal/custos/deploypago/prodRailway/segredos/serviços novos. Documento ORIGINALv1.104/histórico/memória/checkpoint/ledger/registry preservados integrais. Rotina ativa sem CONTINUAR, sem promessa24h; bloqueio parcial/transitório ou fimrodada não fecha projeto.


### Retificação da observação da barreira — 2026-10-11
CI38183022941/job114599408205 no head1abb11e151f1e564d77c0f9146db37a85e05de0d: typecheck/build/bundle/unit4/729/380/3 PASS; HTTP FAIL na assertion overlap, actual0/expected2. Logs primários mostram os dois POST reais recebidos e ambos201 após aproximadamente5segundos de liberação, sem erro financeiro/SQL alegado. A fixture consultava pg_stat_activity repetidamente dentro de BEGIN; essa informação retém snapshot até fim da transação ou pg_stat_clear_snapshot, conforme documentação PostgreSQL17 https://www.postgresql.org/docs/17/monitoring-stats.html seção27.2.2.
Novo patch renova snapshot antes de cada leitura da barreira, também na fixture concorrente financeira que associa pg_locks a pg_stat_activity. Nenhuma assert, limite, SQL de negócio ou controle foi removido/relaxado. Preserva overlap de duas requisições,2ACK/1vínculo/1notificação e testes financeiros. Exigir novo CI no SHA resultante; não rerun deinfra nem emprestaroldgates. Modo original100644 do script da jornada foi restaurado no commit anterior, sem mudança de conteúdo.


## Recibo consolidado 2026-10-11 — referência atual

Main funcional verificada ac7fa1b35aa0057578aba39f9f85c3a0d79c78eb / tree 29b1c510fc559554e7a12cf0b94cdba6e17d48b4. #473/#468/#469/#471/#472/#474/#475/#476/#477 MERGED com própriosCI e pósCI reais SUCCESS; native own/post473/468/469/472 SUCCESS no próprioSHA/install/smoke semMetro/artefatos não expirados; API-only471/474/475/476/477 APK N/A por equivalência comprovada. #470 superseded fechado, nunca merged. #464–467 pósCI/APK também confirmados, inclusive464attempt2. Todos recibos completos(pais/tree/heads/runs/jobs/counts/install/smoke/ZIPdigest/expiração) em [AUTONOMOUS_CYCLE_RECEIPTS_464_477_2026-10-11](../evidencias/AUTONOMOUS_CYCLE_RECEIPTS_464_477_2026-10-11.md). Path canônico: docs/evidencias/AUTONOMOUS_CYCLE_RECEIPTS_464_477_2026-10-11.md. Registros pendentes anteriores são snapshots históricos, preservados, substituídos por este estado.

Última correção: confirmação simultânea retorna dois recibos factuais iguais com umaassignment e uma notificação; CompanyNav/APIhome/rolesTEXT preservados. Financeiros simulados validam JSONnull/rangeINTEGER/UUID, HMAC/timestamp/replay/conflito/tenant. CI1116+HTTPPostgres real; não prova renderRN/físico/pentest. Matriz porárea na evidência marca limites; não declarar todas áreas concluídas. Documento ORIGINALv1.104 e todo histórico/memória/checkpoint/ledger/registry permanecem integrais.

Item atual: consolidar estes recibos em único PR docs(receipts/verified-cycle-464-477); CI próprio/pós obrigatório, APK N/A somente todo código/dependências/workflows/build/smoke igual à base. O resultado final do próprio commit documental será confirmado no PRbody/checkpoint de retomada, sem loop autorreferente. Reconsultar main/PRs/runs reais antes de ação; nunca repetir merges. Depois: auditar mapa requisitos/referência/rotas/APIs/dados/estados e concorrência restante de interesse/cancelamento/substituição, reproduzir falha concreta antes de alterar, avançar alternativas independentes.

Preferências/helpsemvínculo/ML/integrations requerem contratos/dados explicitados noDVT. Físico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSPKYCsandbox/FIN-RISK/WebRailwaypago OPEN separados; não habilitar custos/PSP/dinheiroreal/produção. React19.1.4/RN0.81.6/frozenlock/RLS/standalone/desenho preservados. Rotina segue ativa atéconclusão integralCOMPROVADA ouordemexpressa; fimrodada/transitório/parcial nãoencerra projeto; semCONTINUAR/semexecução24h alegada.


## 2026-10-11 — substituição não pode selecionar o profissional original
Base main verificada `a58d0596d1e298defde5e4f62640d02c83e24528`, tree `82c2348ff9d076a20663ab8540ad2e44b3dfaab4`. README→DVT ORIGINALv1.104 inteiro/histórico, memória/checkpoint/ledger/registry relidos no SHA imutável; basev1.103 e código de interesse/cancelamento/substituição inspecionados. #478 jámerged; pósCI38184167762 SUCCESS na nova consulta. 0PRs não provou conclusão; não repetir integrações históricas.

Falha reproduzida no controller real: ranked exclui profissional original(tpm.professional_id<>$2), mas POSTselect validava apenas pool/atividade/disponibilidade. Original elegível no pool era aceito, UNIQUE(job_id,professional_id) devolvia o próprio vínculo e o endpoint cancelava original/registrava matched, um falso sucesso de substituição. Regressão local do controller original:11PASS/1FAIL12(Missing expected rejection), mantém TODOS10tests/asserts originais. Correção GREEN12/12. Local executa source do controller TypeScript com decorators removidos e exceptions/ranking não usado substituídos por fixtures explícitas; NÃO prova NestDI, SQL/Postgres real, renderRN ou físico. Bash-n da jornada PASS.
Dois testes novos cobrem original active/preferred/available nas3etapas substituíveis e UUIDcase equivalente, zero INSERT/UPDATE/poollookups, candidata distinta com ACK/input exatos, autoridade company e prioridade dos erros de estados inválidos. Fixtures agora refletem a projeção booleana UUID e o ID da linha preexistente sem remover expectativas positivas anteriores.
SQL do próprio endpoint projeta professional_id=$3::uuid AS isOriginalProfessional no SELECT já scoped porassignment/tenant; bool evita selecionar o próprio original antes das escritas. Usa erro existente replacement_candidate_required. Não normaliza/mutaIDs de input/ACK, não muda roleIdTEXT/referências externas/política/matching/disponibilidade/roles/RLS/finanças.
HTTP/Postgres da CI adiciona original ao pool porAPI legítima(apenasfixturelocal), testa lower/upperUUID400 com erro específico e snapshots exatos de pedidos/vínculos/notifications/earnings inalterados. Mantém jornada completa existente e auto-match/seleção legítima posteriorPRO2. Esse HTTP ainda não foi executado neste registro: exigir CI próprioSHA4/729/382/3=1118 +marker novo e todosgates antigos antes de merge. Não chamar localfixture prova deSQL, nempre-gates pós-merge.
Código/2regressões/jornada/evidência e5documentosoriginais no mesmo ciclo, todo histórico preservado por prefixo literal. APK N/A somente após comprovarmobile/rootlock/workspace/dependencies/workflow/build/smoke/hashes/modes idênticos àbase; []nãoPASS. Branchfix/replacement-exclude-original-uuid: revisar bytes/diff/tree/modes, revalidarmain/head/mergeable, mergecomexpectedhead apenasgatesgreen; confirmarorderedparents/tree/main eCIpós realSHA.
Próxima auditoria segura: concorrência da seleção de substitutos e disputa com cancelamento/lifecycle; reproduzir efeito real antes de patch. Interesse usaUPSERT preservandoconfirmed; cancellation usaUPDATEcondicional, mas interações requerem prova. Um bloqueio não encerra projeto; continuar alternativas independentes enquantoCIexecuta.
React19.1.4/RN0.81.6/lockfilefrozen/tenantRLS/standalone semMetro/desenho preservados. DVT ORIGINAL/memória/checkpoint/ledger/registry seguem integrais, sem documento substituto. VisualTruth/AndroidFÍSICO/E2E/SecureStore/piloto, pentestindependente, TRUSTproviders, PSPKYCsandbox/FIN-RISK/WebRailwaypago(#224) OPEN separados. Preferências/helpsemvínculo/ML/integrations precisam contrato/dados; não inventar defaults/bypass/política. Sem PSP/dinheiroreal/custos/serviçosnovos/produçãoRailway/deploypago/segredos. Não desativarporfimrodada/parcial/transitório, não exigirCONTINUAR/alegar24h.


## 2026-10-11 — prova concorrente da seleção de substitutos
#479 já MERGED85fea5d911a6fab758669c9b950fb214ac0190ef/head1ce72d4de424183c875d68645ea452728007dabb/tree788442c695c3cb2dda91e89297c225ea117b4ea2, parents[a58d0596d1e298defde5e4f62640d02c83e24528,1ce72d4de424183c875d68645ea452728007dabb], treecandidata=main comprovada. OwnCI38185492065/job114606794588 SUCCESS4/729/382/3=1118 eHTTPPostgres: original elegível no pool lower/upperUUID400 sem alterarrequests/assignments/notificações/earnings, substituição legítima preservada. PósCI do merge real deve ser acompanhado; não emprestarpre-gates. APK479N/A234blobs mobile/sharedpackages/rootlocks/workflows/build/smoke e modesiguais comprovados. Documento ORIGINAL/histórico preservados.

Nova hipótese concreta: select lê replacement_request open eoriginalestado semlock, escreve novoassignment e marcaRRmatched sempredicate deestado. Duas seleções distintas simultâneas podem confirmar2substitutos para1pedido escalar. Antes de modificar código, esta branch adiciona APENASfixtureHTTPPostgres que força as2requisições reais a sobrepor com SHARE lock emwork_assignments, renova snapshotpg_stat_activity porpoll e exige1ACK201+1rejeição400replacement_not_open,1novoassignment/1notification e pedido comwinnerexato, retryterminal sem novaswrites.
Usa somente CI=true/1, HTTP ePGlocalhost/DBmlivretrabalho_http, usuário/profissional criados porAPIlocal, membership viajornada legítima; nenhum seeding/bypassRLS/credencialprod. Teste acrescentado ao fim da jornada antes designout mantendo TODASasserts anteriores, comjobfresh e terceiroprofissional ativo/disponível/napool. Node--check/Bash-n locaisPASS; execuçãoHTTP/SQL aindaPENDENTE. CI do próprioSHA deve reproduzir ou refutar hipótese: não declarar falha real semlogprimário, não merge testeRED nem ignorar asserts.
Próximo seRED demonstrar2matched: serializarRRna transação e proteger status deoriginal contra escritas concorrentes comlock compatívelFK, preservar política400jáexistente paraRRclosed. ReexecutarnovoSHA e registrar prova1winner/1closed/1substitute/1notice. Se outroerrofixture, corrigi-lo semremover controles; se hipótese refutada não inventarpatch. Scope APItests/HTTP/docs; mobile/lock/workflow/desenho/React19.1.4/RN0.81.6/RLS/standalone semMetro preservados; APKN/Aapenas equivalênciacomprovada. Atualizar código/teste/evidência e5originais no mesmo ciclo.

Físico/VisualTruth/E2E/SecureStore/piloto/pentestindependente/TRUSTproviders/PSPKYCsandbox/FIN-RISK/Webpago econtratos/dados seguemOPEN separados. SemPSP/dinheiroreal/custos/produção/serviços/deploypago/segredos. Rotina não desativada por parcial/transitório/fimrodada; semCONTINUAR/24h. Após esta prova seguir auditoria cancelamento/lifecycle e estados preexistentes do substituto; não fingir conclusão por0PR/issues.


### Reprodução primária e correção — seleção concorrente
CI38185857319/job114607904601 no headb0dd0ed8064d31a67daaa5ff0088ecb6adb17846 FAILHTTP após unidade4/729/382/3, build/typecheck/export/migrations/privacy aprovados: barreira atingiu2requisições reais; assert esperava[201,400], recebeu[201,201], DOISmatched parao mesmoRR. Não é falhadeemulador/infra nemhipótese nãoverificada. Fonteprimária log dojob. Nenhumassert retirado.
Correção noendpointselect: bloqueiaRRopen FOR UPDATE paraqueapenasumcliente leiaestado aberto e o segundo aguarde/reavalie WHEREdeestado; erroexisting replacement_not_open400 mantido parao perdedor/retryterminal. Originalassignment lido FOR NO KEY UPDATE protege status durantea transação sem bloquearKEY SHARE dasFKs de criação/cancelamento; não alteraPK/contrato/roles/RLS/finanças/policy. Compatibilidade documentadaPostgreSQL17 https://www.postgresql.org/docs/17/explicit-locking.html. Locks seguemRR→original; processo inteiro emdb.tenantBEGIN/COMMIT/ROLLBACKpreexistente. GET/candidates/auto-match semnovolock, disponibilidades/matching/selfguard479 preservados.
ReexecutarCI own noNOVOSHA esperado4/729/382/3 +mesmabarreira1ACK/1closed/1novoassignment/1notice/winner real e retrysemnovaescrita. Não declararGREENantesdelogprimário; oldREDnão autoriza merge nemgera reruninfra. Código/teste/evidência e5DVT/memória/checkpoint/ledger/registry existentesatualizados no mesmo ciclo íntegros. Pós47938185785746 agoraSUCCESS na consulta, registrar recibo primário completo depois; não repetir479.


## 2026-10-11 — ACK de substituição exige vínculo confirmado real
Predecessor#480 branchfix/replacement-selection-concurrency head87f4720e2dfdc018cfa094d926bdaafc940b0540/tree67d92527f7573c1e38654bdf39f57012b032f253, CI próprio novo a executar/acompanhar; sourceLOCKs herdado integralmente. Main#47985fea5d911a6fab758669c9b950fb214ac0190ef, pósCI38185785746 SUCCESS consulta, não repetirmerge. #480REDprimário38185857319/job114607904601 comprovou2ACK201 no mesmoRR e novoSHA exige1winner/1closed, nãoborrowoldgates.

Falha independente reproduzida enquantoCI#480 executa: INSERTassignment emselect usaONCONFLICTpreservandostatus da linha anterior e retornavaapenasid. Uma candidatacomanterior vínculo cancelado/concluído/emcurso no MESMOjob recebia ACKmatched sem terassignmentconfirmed, cancelandooriginal e resolvendoRRfalsamente. Regressão localcontroller real: RED12PASS1FAIL13(Missing expected rejection)→GREEN13, TODOS12originais/asserts preservados incluindo479; fixture explicita5estadosnão-confirmados econtrole confirmed factual. Local decorators/exceptionsfixtures, não NestDI/SQL/físico. Não afirmarHTTPRED desta tarefa.
Patch mínimo retornaid,status do próprioINSERT/UPSERT e exige a2.status==='confirmed' antes de alteraroriginal/RR/notificar. Reusa replacement_assignment_failed400. Não reativa cancelled/completed, não reseta checked_in/in_progress/checked_out, não altera políticas/roles/RLS/finance/capacidade/URLs/IDs. Exceção emdb.tenant causaROLLBACK doUPSERT; nenhum ACK/status inventado. Locks479/480, open-state/selfUUID/exigência pool/availability continuam.
JornadaHTTPPostgres adiciona2casos isoladosANTES da barreira: candidatojáconfirmadonojobcanceladoporAPIcompany ouconcluído pelolifecycleprofissional(checkin/start/checkout/complete), então selectesperado400 sem mudaroriginal/RR/notifications/earnings reais(snapshotantes/depois; incluindoledgerdo completed). Não escreve produção: somenteCIlocalhost/DBdedicada/actorsAPIfixture; pagamentos representacionais nãoPSP/dinheiroreal. Mantém TODAS asasserts existentes/barreira1winner/1closed e retry.
EsperadoCI own4/729/383/3=1119 +markers cancelado/concluído/concorrência e antigoHTTPfull. EstaexecuçãoHTTP aindaPENDENTE; node-check/bash-n eGREENlocalnão autorizammerge. APK N/A somenteescopo/API/test/HTTP/docs eblobsprotectediguais. Branchfix/replacement-confirmed-assignment-ack sobre480; integrarpredecessorapenasgreen depoisretargetmain/reconsultarfresco head/diff/bytes/pais/tree/CI own/post obrigatório. Não repetir479/480,sejámergedreconsultarprovas. Não removerassert pararesolverCI.

DVT ORIGINALv1.104/memória/checkpoint/ledger/registry INTEIROS atualizados nomesmo ciclo+evidência, prefixospredecessor preservados. React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone/desenho preservados. Físico/VisualTruth/E2E/SecureStore/piloto,pentestindependente,providersTRUST/PSPKYCsandbox/FIN-RISK/Webpago econtratos/dadospreferências/helpsemvínculo/ML/integrations OPENseparados. Sem custos/serviços/dinheiroreal/PSP/produçãoRailway/deploypago/segredos. Continuar auditoria cancelamento/lifecycle ecompatibilidade locks/criação,tarefas segurasindependentes; rotina nãofecha emfimrodada/parcial/transitório e não pedeCONTINUAR/alega24h.


## 2026-10-12 — substituição mobile: ACK exige UUID real e vínculo distinto
Base revalidada main510b2036b8229a21b1b7f5c836f39240fe6ba3ac/tree98d3dce68c680ed5777350e6fc9f0a0b17fa85f9. README aponta ORIGINALv1.104; DVT/memória/checkpoint/ledger/registry existentes lidos no SHA imutável e mantidos íntegros. PR482 painel jámerged, não repetir. PósCI48238190155860/job114620980999 SUCCESS4/729/383/3=1119, todos passos e HTTPPostgres primários. Pós48038186459872/job114609716511 SUCCESS4/729/382/3; pós48138186630833/job114610239999 SUCCESS4/729/383/3; não usar resultados próprios como pós-gates.
Falha reproduzida no helper real apps/mobile/lib/company-replacements.ts: requestReplacement aceitava id qualquer não vazio e selectReplacement aceitava assignmentId falso ou igual ao original, retornando true para operação que não provava nova substituição. Testes locais Node24 actualTS: RED10PASS2FAIL12→GREEN12/12. TODOS10tests/asserts antigos mantidos, somente fixtures positivas de ACK agora usam UUID conforme schema0011/0006. Novos2testes incluem espaços/nonstring/nãoUUID/sameoriginalUUIDcase, positivos lower/upper com letras, bindings exatos request/prof/original/status e apenas1POST, sem retry automático.
Patch mínimo valida somente IDs gerados no ACK: pedidoUUID e assignmentUUID distinto do original por comparação case-insensitive; não muta IDs de input/payload/ACK, nem rolesTEXT. Parsers de leitura/recomendações, APIs, layout/JSX, navegação, sessão/deadlines/estado incerto permanecem iguais. Localhelper/fixtures NÃO prova ReactNative render, transporte externo, SecureStore ou Android físico. CI próprio esperado4/731/383/3=1121 e APK standalone do NOVO head obrigatórios antes do merge; pósCI e pósAPK no merge real obrigatórios. Nenhum PASS antecipado, ZIPdigest não é APK individual.
Monitor Project Activity Watch: arquivo presente e permissões declaradas contents/actions/pull-requests read, issues write. Consulta REST actions/runs?event=schedule&per_page=100 retornou total_count0; lista geral recente não contém monitor. Isto não prova falha do cron nem execução/permissions runtime. Endpoint actions/workflows recusado pelo allowlist do conector; github_fetch aceita GET de runs, não dispatch e não existe ferramenta workflow_dispatch instalada. Consulta pública secundária Actions falhou DisabledError. Smoke da lógica será executado localmente com API/summary/clock fixtures; NÃO declarar execução agendada real a partir disso. Nenhum alerta Activity Watch aberto na consulta. Próxima ação: continuar consultando runs por event=schedule e workflow_dispatch/name, ler job/log/summary e issue reais quando aparecerem; não pedir ao usuário conferir nem disparar manualmente, não mudar serviço/custos.
Branchfix/mobile-replacement-ack-uuid: revisar bytes/diff/tree/modes/history, exigir CI+APK no próprioSHA, revalidar main/head/mergeable, merge sógreen, orderedparents/tree/main e pós-gates reais. Enquanto APK executa, auditar/testar monitor e interações cancelamento/lifecycle independentes; 0PRs não prova conclusão das13áreas.
React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone semMetro/desenho canônico preservados. Físico/VisualTruth/E2E/SecureStore/piloto, pentestindependente/providersTRUST/PSPKYCsandbox/FIN-RISK/Webpago e contratos/dados de preferências/helpsemvínculo/ML/integrations OPEN separados. Sem gastos/serviços/produção/Railway/PSP/dinheiroreal/segredos/deploypago. Rotina ativa; parcial/transitório/fimrodada não encerra projeto; semCONTINUAR nem promessa24h.


## 2026-10-12 — smoke do monitor e alerta além da primeira página
Project Activity Watch integrado #482/main510b2036b8229a21b1b7f5c836f39240fe6ba3ac; pósCI38190155860/job114620980999 SUCCESS1119/todossteps/HTTP. Lista REST de runs agendados event=schedule retornou0 (consulta02:44UTC), lista geral e issues abertas não mostraram execução/alerta do monitor. Endpoints workflows e ActionsHTML recusados pelo allowlist; conector GitHub oferece somenteGET runs e rerun de job existente, nenhuma ferramenta dispatch. gh CLI ausente; consulta pública secundária falhou DisabledError. Execução cron/runtime de issues: NÃO COMPROVADA, não conclusão nem diagnóstico de falha do workflow; não pedir usuário disparar/validar. Reconsultar event=schedule/workflow_dispatch/generalname e logs/jobs/summary/alerta reais nas próximas consultas.
Smoke executa JavaScript REAL extraído de .github/workflows/project-activity-watch.yml em node:vm com fixtures explícitas GithubAPI/summary/clock; nenhuma escrita ou notificação real, credencial/custo/prod/segredo. 5PASS1FAIL6 no código original: quando alerta único está no item101/página2, monitor sólêprimeiros100 e cria novo aviso. Corrigido usando github.paginate SOMENTEissues abertas e mantendo título/tempo15min/permissões/cron/concurrency/closecomment iguais. GREEN6/6 com abertura factual, alertaexistente semduplicação, closeemcommitrecente issueexata, exclusãoprópriorun/ACTIONSativo semafirmaragentetrabalhando, APIreadfailure semsummary/writes, paginação abertura/fechamento. Isto prova lógica localcomfixtures, NÃOcronreal/GITHUB_TOKENpermissions/notificação/renderSummary. Defeito reprodução determinística, não alegar queduplicação jáocorreu no repositório atual.
scripts/tests/project-activity-watch.test.mjs novo, execução adicionada ao Run tests daCI; demaissteps/gates/asserts/baseline íntegros. TotalCI esperadoapós483:4/731/383/3+6=1127. APKN/A paraesta correção de monitor somenteapóscompararTODOSmobile/packages/rootlock/build/smoke/pilotstandaloneworkflow blobs+modes idênticos àbase483 final; ci.yml sóacrescentaunitárioNode, projectwatch não compila/apk nemmudaReact/lock/Expo/Gradle. NovoCI próprio e pósCI noSHAreal necessários. Não emprestarAPK483 para alterar native depois.
Predecessor#483 drafthead61e34c6a599c5ad11eeca7fa69db737fbab1c2cf/tree80cbc8b016cd315285bea80909b56534de98a375, CI38197145030/APK38197144807 emexecução na consulta; NÃO PASS. Esta branch herda3arquivosmobilee5docsíntegros; PR basefix/mobile-replacement-ack-uuid para validar apenasmonitor, retargetmain SOMENTEapós483merged/gates, reconsultarhead/main/mergeable/diff/bytes/tree; nãointegrarantecessorpendente. Fimrodada/running nãofecha projeto; outrasáreas precisamaceitefactual.
DVT ORIGINALv1.104/memória/checkpoint/ledger/registry íntegrosnomesmociclo+evidência+paineloperacional atualizado, semsubstitutos. Runtimecron abertoindependente das13áreas. React19.1.4/RN0.81.6/frozenlock/RLS/standalone/desenho preservados; Androidfísico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSPKYCsandbox/FIN-RISK/Webpago/contratosdados OPEN separados. Sem novosgastos/provisão/PSP/produção/dinheiroreal/segredos. Continuarautônomo, semCONTINUAR/24h/fecharporparcial.


### Verificação efetiva do monitor sem dispatch manual
Esta correção também acrescenta preview read-only em pull_request restrito aos2paths monitor/teste, e execução normal em push da main restrita aos mesmospaths. É o MESMOworkflow Project Activity Watch, sem novaautomação/serviço/custo/provisionamento. Preview faz consultas reais de commit/main, PRs, Actions eissues e publica summary, mas retornaANTES de create/comment/updateIssue; cron/workflow_dispatch/push mantêm comportamento aprovado. Core.info registraACTIVITY_WATCH_OBSERVED comfatosidênticos ao summary eACTIVITY_WATCH_PREVIEW no_issue_writes=true; não tokens.
Acrescentados2testes: preview stale/recent comalertaexistente SEMescritas, pushcommitrecente semalerta inventado. GREEN8/8 local; CIesperado4/731/383/3+8=1129. Novohead exigepróprioCI + ProjectActivityWatch previewreal, lerlogsAPI/summaryfactseerro. Pushpósmergeexatoexecutaráworkflow completo apósalteração autorizada; NÃOequivaleprimeirocron, quecontinuaatéserobservadonomesmoevent=schedule. Permissõesread runtime serão comprovadas na execução real, writes permanecemsemprova se nenhumalertaconcreto demandado. Não abrir/fecharissueartificial sóparaexercerpermissão.


## 2026-10-12 — Web: leituras antigas não podem substituir contexto atual
Auditoria independente enquantoAPK483executa encontrou falha nos4useEffects de apps/web/app/page.tsx (dashboard, candidatos/recomendações, membros, candidatosdesubstituição). Promises antigas podiam sobrescrever dados após tenant/seleção/signout, catch antigo substituirerroatual e finallyantigo desligarloadingnovo; registros anteriores ficavam visíveis emfalha da nova leitura. RED4PASS5FAIL9 nos efeitos reais pré-JSX; GREEN9/9 após correção, mantendo integralmente4testes web-contract anteriores.
5regressões novas executam o source REAL antesdo JSX com stripTypeScriptTypes/node:vm, hooks/storage/fetch explicitamente simulados, helpers web-contract reais. Cobrem4áreas×late success/late HTTPfailure/signout/clear-currentfailure-explicitretry,3seleções no MESMOtenant e cabeçalhos reais tenant-b. Não érenderReactDOM/browser/sessionStorage real/produção/Android. Fixture usa IDs/nomes labels explícitos, nunca dados inventados no produto.
Correção mínima: cadaeffectmantémflaglocalcurrent, cleanupinvalidaresultado ao mudar dependência/desmontar. Limpa seus registros antesda nova leitura; then/catch efinallydo dashboard sópublicamquando current. Não abortarequisições antigas, não implementa deadline, não promete resolverfetchindefinido. TODOJSX da primeiraguarda if(!session)return atéfim ébyteigual; handlerssignin/signout/create/confirm/safety/teams/talents/replacement semmudança. Nenhuma açãoPOST/DELETE foi executada para teste nemse alteroupolíticadeescrita/ACK/roles/contratos/RLS. Recuperação de leitura explícita porrevisão/contexto permanece. Impacto internoWeb permitido; serviço/deployRailway eventualmente pago#224 continuaOPEN separado, semprovisão/custo.
Basebranch#484 headb78c749b24742126b73f2bc076db2694541e5da2/tree2154a2198615f2ba37a6f19d56806a04865c5601. EssaPRownCI38197598960/job114643661686 estáSUCCESS na consulta(metadata), logs/contagens exigidosantesmerge. MonitorPREVIEWREAL38197598983/job114643661949 SUCCESS noheadb78...todos3steps; log02:54:00.5808530Z ACTIVITY_WATCH_OBSERVED main510...estadoCI/ACTIONS emexecução/114min/2PR/3active, evento pull_request, eACTIVITY_WATCH_PREVIEW no_issue_writes=true. Publicousummary via core.summary.write na etapaaprovada, semconferênciaUIHTML alegada. Isto é execução efetiva read-only, NÃOcron e não comprova issueswrite. Runs event=schedule/workflow_dispatch0, nenhumalerta. Depoismerge484 verificarpushmonitornoSHA REALeCIconformeprópriosgates. Não exigir usuário dispararmanualmente; mesmoworkflow ganhoueventospreview/pushparaobservação autorizada.
Predecessor483 ownCI38197145030/job114642227976 SUCCESS4/731/383/3=1121, allsteps/2novosmarkers/fail0; ownAPK38197144807/job114642227163 passouBUILD e estásmokeAndroidna consulta, NÃO PASS. Nunca repetirmergequandoexecutado. EstaWebbranchbasewatchdependente sóretargetmainapós484integrada; diffpróprio8paths(page/test/evidência/5docscore); próprioCIesperado9/731/383/3+8=1134/todossteps/HTTP/monitorfixture, pósCI obrigatório. APK N/A SOMENTEhashes/modesmobile/packages/rootlock/nativebuild/smoke/standalonepilotworkflows idênticos àbase, nenhumsourceRNtocada; []nãoPASS.
DocumentosORIGINAISv1.104/memória/checkpoint/ledger/registry preservadosinteiros/prefixoliteral, evidênciamesmociclo. Apósgates/merges483–485 consolidarrecibosreais numPRdocsúnico, últimosrecibosnoPRbody/retomada semloopautorreferente. Próximaauditoria: mutations Webcontext/ACK/deadlines ecancelamentocriaçãoconcorrente, sóalterarbugreproduzido; semconclusãointegral13áreaspor0PR/issues. Manterrotinaativa atéaceitecomprovado, parcial/transitório/fimrodada nãofecha.
React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone/desenhocanônico preservados. Físico/VisualTruth/E2E/SecureStore/piloto,pentestindependente/providers/PSPKYCsandbox/FIN-RISK/Webpago econtratosdadospreferências/helpsemvínculo/ML/integrations OPENseparados. Semprodução/serviços/custos/PSP/dinheiroreal/segredos/deploypago. SemCONTINUAR/24h.


## 2026-10-12 — Web: formulário permanece disponível após resposta assíncrona
Falha reproduzida nos handlers REAIS createJob/createTeam/updateSafetyCase/updateSafetyAppeal de apps/web/app/page.tsx: após awaitmutate, usavam e.currentTarget.reset(). DispatcherReactDOM19.1.4 chama listener(event) e define event.currentTarget=null emseguida, fonteprimária lida viaGitHub https://github.com/react/react/blob/v19.1.4/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js functionexecuteDispatch. Isto é diferente de pooling; não afirmar queReact19 fazpooling. MesmoHTTPsucesso lançavaTypeError, exibiafalha eimpediareset/refresh.
4testes novos dehandlerspré-JSX/sourceREAL com hooks/transport/FormDataexplicitfixtures simulamclearing doevent.currentTarget depoisretorno dohandler eANTES de resolverpromise. RED9PASS4FAIL13→GREEN13/13, preservandoTODOS9anteriores/assertionsdecontrato/leiturastenant/select/signout. Cadaformcom201verifica1reset/1refresh/erroempty/loadingfalse/1POST/URL/tenant; com500verifica0reset/0refresh/erroHTTP500/1POST, semretryautomático. Nenhumaescritarealexterna/produção efetuada, nenhuma aparência oubrowserReactDOMreal alegado.
Correçãomínima captura constform=e.currentTarget ANTESdeawait, usaFormData(form) eresetformcapturado; alteraapenas4handlers, osoutrosigualbytes; TODOJSX/layoutigual, os4effects485inalterados. Nãoalterapayload/URLs/roles/autoridade/ID/ACK/FINRISK/regras/Retry/tenantRLS. Nãoendereça nestafatia osoutros possíveis resultadosincertos oudeadline dasmutationsWeb; próximositens exigemreprodução/dadossemcontrato inventado.
Base#485headfc2e308edba58932110bae25a2ba8ccacdc19c4e/tree7a03c695c2510a8049e84b1d50e540edbd99d305, próprioCI38198003282attempt1/job114644910774 FAILantesCheckout: Dockerpullpublic.ecr.aws/docker/library/postgres:17 toomanyrequests:Data limit exceeded. Logsprimários3pulls comprovamINFRA, nãoatribuircodetestcompile. Rerun somentejobsfalhos solicitado1vez; attempt2/job114645293186 iniciou/typecheck/build/export emexecução naúltimaconsulta. NãoPASSnemfalhatesteassumida, nãooutro rerunrunning. #485retargetmain após484merged.
#483MERGEDa05314e945f5e9edf3e82650d97e73e21275bd37 orderedparents[510b2036b8229a21b1b7f5c836f39240fe6ba3ac,61e34c6a599c5ad11eeca7fa69db737fbab1c2cf], tree80cbc8b016cd315285bea80909b56534de98a375=candidata/maincomprovada. OwnCI38197145030/job114642227976 SUCCESS4/731/383/3; ownAPK38197144807/job114642227163attempt1 SUCCESS/install02:59:15.1318407Z/smoke02:59:27.7529817Zmetrofalse/ZIP11724291281size28910995/digestsha256:9978ee19243d26f89b204ce84e5b676e9061d606954f1e5d2174620f7831ad52/expires2026-10-26T02:59:28Z,exacthead61e... . ZIPdigest nãoAPKindividual. PósCI38198075369/job114645120178 SUCCESS4/731/383/3 noSHAREALmergea053... . PósAPK38198075301 aindaemexecução, nãoPASS. Emulador≠físico.
#484MERGEDfea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30 orderedparents[a05314e945f5e9edf3e82650d97e73e21275bd37,b78c749b24742126b73f2bc076db2694541e5da2], tree2154a2198615f2ba37a6f19d56806a04865c5601=candidata/maincomprovada. OwnCI38197598960/job114643661686SUCCESS4/731/383/3+8=1129,todossteps; ownMONITORpreview38197598983/job114643661949SUCCESSreadAPI/summary/observedmain510.../2PR/3runs/pull_request/noissuewrites. JobGITHUB_TOKENpermissions primáriasActionsread/Contentsread/Issueswrite/PullRequestsread. Grantdepermissionnãoéwriteexercida. Próprio/pósnativeAPK484N/A231blobsmobile/packages/rootlock/nativebuild/smoke/pilotworkflowsiguais à483 comprovados; CI.yml alteraAPENASexecuçãotestesmonitornode, projectwatchalteraALERTA semcompilarnative. PósCI ePOSTmonitorpush484aindaadescobrir/acompanhar noSHAreal, cron0naúltimaconsulta nãoPASS.
EstaWebbranchbase485, próprioCIesperado13/731/383/3+8=1138, pósCI obrigatório; APK N/A SOMENTEprova nativehash/modesidênticos àmainprecedente; nãoemprestarAPKpara modificarinputnovo. Integrar485primeiro sógatesgreen/pósCI484, retargetestamain/revisarfreshdiff/bytes/modes/parents/tree/head/main; semrepetirmerges483484. Registrar todosrecibos nooriginal5docs/evidência porúnicaconsolidação apósgates, últimoPRdocbody/retomadasemloopautorreferente.
DVT ORIGINALv1.104/histórico/memória/checkpoint/ledger/registry preservadosinteirosnomesmociclo. React19.1.4/RN0.81.6/frozenlock/RLS/standalone/desenhocanônico preservados. Androidfísico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSPKYCsandbox/FIN-RISK/WebRailwaypago#224 econtratos/dados OPENseparados; nãohabilitarcustos/PSP/produção/serviços/dinheiroreal/segredos. Manterrotinaativa/alternativassegurassemCONTINUAR/24h;4entregastécnicasnãofecham13áreasintegralmente.

## Estado consolidado2026-10-12 —479–486 e correção do monitor

| PR | Merge real | Head aprovado | CI próprio | CI pós-merge real |
|---|---|---|---|---|
| #479 | 85fea5d911a6fab758669c9b950fb214ac0190ef | 1ce72d4de424183c875d68645ea452728007dabb | 38185492065/job114606794588/attempt1 SUCCESS 4/729/382/3 | 38185785746/job114607681110/attempt1 SUCCESS 4/729/382/3 |
| #480 | 4cf88daa9e9d4d9be1aeb23e99edc6a631037ec1 | 87f4720e2dfdc018cfa094d926bdaafc940b0540 | 38186117528/job114608677326/attempt1 SUCCESS 4/729/382/3 | 38186459872/job114609716511/attempt1 SUCCESS 4/729/382/3 |
| #481 | 99f4509241755f7e51b8771e59470e43eef98a2d | 52bed1cb0d0d115b537553dc7ae052c31eff41ee | 38186207904/job114608953220/attempt1 SUCCESS 4/729/383/3 | 38186630833/job114610239999/attempt1 SUCCESS 4/729/383/3 |
| #482 | 510b2036b8229a21b1b7f5c836f39240fe6ba3ac | 50c5ec4fe46fda204e359fe1d1dd58f7e1028fb0 | 38189224586/job114618165842/attempt1 SUCCESS 4/729/383/3 | 38190155860/job114620980999/attempt1 SUCCESS 4/729/383/3 |
| #483 | a05314e945f5e9edf3e82650d97e73e21275bd37 | 61e34c6a599c5ad11eeca7fa69db737fbab1c2cf | 38197145030/job114642227976/attempt1 SUCCESS 4/731/383/3 | 38198075369/job114645120178/attempt1 SUCCESS 4/731/383/3 |
| #484 | fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30 | b78c749b24742126b73f2bc076db2694541e5da2 | 38197598960/job114643661686/attempt1 SUCCESS 4/731/383/3/8 | 38198337936/job114645925692/attempt1 SUCCESS 4/731/383/3/8 |
| #485 | 73f523be05d8042cff871ed776a52fd61c95995b | fc2e308edba58932110bae25a2ba8ccacdc19c4e | 38198003282/job114645293186/attempt2 SUCCESS 9/731/383/3/8 | 38198605205/job114646745687/attempt1 SUCCESS 9/731/383/3/8 |
| #486 | 41d5165194a70a4a5bfdb0d3d4b90431fc533c9b | 1f36dd1081be42899beccecf0a15bc7b8e1ee3ef | 38198471412/job114646330881/attempt1 SUCCESS 13/731/383/3/8 | 38198920578/job114647714446/attempt1 SUCCESS 13/731/383/3/8 |

Main funcional 41d5165194a70a4a5bfdb0d3d4b90431fc533c9b/tree910e637b49b90834ad3306c41d053f4d5b6b943e. Todos próprios/pósCI reais aprovados; APK483 próprios/pós aprovado no SHA exato, instalação e smoke semMetro e ZIP não expirado. Ordered parents/tree/candidata/main de cada integração conferidos. Recibos completos: docs/evidencias/AUTONOMOUS_CYCLE_RECEIPTS_479_486_2026-10-12.md. Histórico integral preservado; snapshots pending são substituídos por estas provas. Não repetir merges479–486.

## Provas e limites
Os PRs479–482 pertencem aos ciclos anteriores; foram revalidados para consolidar seus recibos, sem anunciar essas correções como novas entregas. 483 rejeita ACKs com ID não UUID ou assignment original. 484 pagina issues e acrescenta smoke, preview PR sem escritas e execução normal no push. 485 isola as quatro leituras Web em troca de empresa/seleção/logout. 486 captura o formulário antes de await para quatro handlers. Testes locais executam os helpers/handlers/scripts reais com fixtures explícitas, não render real ReactDOM/RN ou execução física. CI mantém os contratos HTTP/Postgres, migrações, RLS/privacy/readiness e todos os gates anteriores.
CI485 attempt1/job114644910774 falhou antes de Checkout: Docker pull public.ecr.aws/docker/library/postgres:17 retornou toomanyrequests: Data limit exceeded em três tentativas. Um rerun apenas de jobs falhos foi autorizado pela API; attempt2/job114645293186 PASS no mesmo head. Não foi falha de teste/app; nenhum assert ou gate foi removido. Não repetir rerun de run já aprovado.
APK483 próprios e pós-merge SUCCESS com instalação e DEVICE_SMOKE_OK metro_required=false, ZIP não expirado e head_sha exato (metadados integrais nos recibos JSON). ZIP digest não é hash do APK individual. Own checkout90f0068fd7c52ea009c7f14330dd90853835e3b9 é refs/pull/483/merge sintético: pais[510b2036b8229a21b1b7f5c836f39240fe6ba3ac,61e34c6a599c5ad11eeca7fa69db737fbab1c2cf], tree80cbc8b016cd315285bea80909b56534de98a375 igual à candidata e merge real. Não alegar BUILD_INFO head literal. Emulador não é físico.
484 APK N/A:231 blobs mobile/shared packages/root lock/native build/smoke/pilot workflows iguais à483; CI.yml só adiciona execução de teste Node e Project Activity Watch não compila native. 485 também231 inputs native iguais;486 todos447 blobs não-docs da base são iguais, exceto a página Web (e novo teste). Nenhum APK de outro head usado para autorizar alteração de código mobile. Diffs antigos479–482 não alteram mobile/shared dependencies/root locks/build/smoke/standalone workflow, conforme paths registrados.
Monitor preview REAL38197598983/job114643661949 no headb78c749b24742126b73f2bc076db2694541e5da2:02:54:00.5808530Z observou main510...,114min,2PRs,3Actions,event=pull_request e no_issue_writes=true. Monitor pós-merge REAL38198337977/job114645926135 no SHAfea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30:03:04:56.2672067Z observou essa main,age0,1PR,3Actions,event=push. Etapas/logs aprovados; core.summary.write executada, sem alegação de leitura da UI HTML. GITHUB_TOKEN grant Actionsread/Contentsread/Issueswrite/PullRequestsread consta dos logs. Grant de Issueswrite não comprova operação de escrita; não criar alerta artificial.
Cron e dispatch retornaram0 na consulta mais recente. Execução agendada ainda NÃO COMPROVADA; isso não prova falha do cron. Endpoint actions/workflows bloqueado pelo allowlist do conector; disponível GET actions/runs e rerun de job existente, nenhuma ferramenta dispatch. gh CLI ausente; ActionsHTML/consulta pública secundária falhou DisabledError. A solução autorizada acrescentou eventos preview read-only PR e push ao MESMO workflow, sem nova automação/serviço/despesa. Estes eventos provaram execução efetiva das APIs e summary, nunca agente programando ou cron preciso/24h.

## Correção adicional do monitor: distinguir issue de PR
A resposta real IssuesAPI desta rodada inclui485/486 com campo pull_request. O monitor procurava só título: um PR homônimo podia esconder o alerta ou receber comentário/fechamento. Duas regressões do script real com fixtures explícitas: RED8PASS2FAIL10 (stale não cria issue, recent produz duas escritas no PR) → GREEN10/10 com filtro !i.pull_request antes do título. Todos oito testes anteriores preservados. Não alegar que um PR real foi fechado; não criar issue/PR homônimo artificial.
Esta correção e a consolidação de recibos integram o mesmo PR, com código/teste/evidência e cinco documentos originais completos. CI esperado13web/731mobile/383API/3CLI +10monitor=1140 e preview real no novo head obrigatórios antes de merge; pósCI/push monitor no SHA real obrigatórios. APK N/A só após comparar native inputs/modes iguais. O último recibo do próprio PR ficará no PR body e checkpoint de retomada, sem loop autorreferente de commits.

## Continuidade por áreas
Estes contratos e correções não comprovam aceite integral das13áreas. Telas/navegação mantêm CompanyNav e início profissional com APIs/estados, mas Visual Truth completo continua aberto. Auth/agenda/jobs/company/teams/candidates/matching/payments/notifications/privacy/RLS têm contratos HTTP/Node/Postgres, não E2E físico ou prova completa de todos os estados. Web ganhou proteção de leituras e formulários; não recebeu deploy pago.
Próximas ações concretas: reproduzir ACK indevido em WebcreateJob (mutate genérico aceita qualquer JSON2xx), confrontar o contrato real CompanyJobs antes de corrigir; auditar contexto de writes após await e deadlines/recuperação das leituras Web. Backend criação de substituição versus cancelamento/lifecycle precisa prova concorrente antes de patch. Não refazer485/486, não inventar validação global/contrato/dados ou usar0PRs/issues como conclusão. Referência original→rotas/API/dados/estados/testes é a base dos aceites.
React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone semMetro/desenho canônico preservados. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e WebRailway pago#224 continuam OPEN separados; preferências/helpsemvínculo/ML/integrations dependem contrato/dados. Sem serviços/custos/produção/PSP/dinheiro real/segredos/deploy pago. Manter a rotina ativa; parcial/transitório/fim de rodada não encerra projeto. Não exigirCONTINUAR nem alegar24h.


## 2026-10-12 — publicação Web exige recibo compatível e preserva formulário incerto
Main revalidadab16fd677bd0b853b97f81e8a660ec0318366dcb4/tree2f14715d56751cea93a7cad035a8717606cec750, PR487 jámerged, não repetir. PróprioCI38199412553/job114649245800 SUCCESS13/731/383/3+10=1140 nohead549e2642b8b2985cb7e3132596f7bc2ae7216537. PróprioProjectWatchpreview38199412549/job114649245878 SUCCESS/03:21:16.7193522Z main41d...7min/1PR/1run, no_issue_writes=true. PósCI38199681077/job114650083177 SUCCESS13/731/383/3+10 noREALmergeSHAb16fd677bd0b853b97f81e8a660ec0318366dcb4. Pósmonitor38199681085/job114650083321 SUCCESS/03:25:29.7820591Z observouessaMAIN/age0/0PR/1run,eventpush, etapas/log/summary real. Orderedparents[41d5165194a70a4a5bfdb0d3d4b90431fc533c9b,549e2642b8b2985cb7e3132596f7bc2ae7216537], tree2f14715d56751cea93a7cad035a8717606cec750=candidata/main comprovada; revisão9paths/bytes e447blobsnonDocs fora2monitorpaths iguais; APKN/AinputsNativeiguais. Cron ainda0naúltimaconsulta, não dizercron passou; alertas reais ainda nenhum. Recibo completo487 no PRbody e abaixo, sem commit autorreferente.
Nova falha reproduzida em createJob real: mutate genérico aceitavaqualquerJSON2xx, limpavaformulário/refrescava como se criação fosse confirmada com{id:'fake'} ouUUID/title incompatível. Baseline handler+novosoráculos: RED16PASS1FAIL17; GREEN17/17 após. Todos13tests/asserts anteriores preservados; fixture positiva do createJob agora ACK conformeAPI (UUID,campos,open,gig), demaisforms iguais. 3tests novos validam helper,1test handler real; fixtures explicam hooks/fetch/FormData/eventcurrentTarget e usam web-contract real. NÃO renderbrowser/ReactDOM/produção.
Contrato verificado no código REAL apps/api/src/company-job-create.controller.ts: title.trim, requiredRole.trim||title, location/workCity.trim||null, payCents??0, engagementModality??gig, timestampsabsolutos/statusopen eUUIDgerado. Não imporcidadeobrigatória como noformmobile: Web/APIaceitamnullable. Helper novo apps/web/app/job-publication.ts validaACKcomUUID eTODOScamposcontratuais do pedido, não muda payload nem normaliza IDs enviados. Retorna created/rejected4xx/unknown5xx/network/JSON/malformed2xx; nãoautorreenviaPOST. ErrosHTTPexplicitose500preservamfeedbackanterior; ACKincerto mostra publicação não confirmada/dadosmantidos/conferirvagasantesdenovoenvio. Não declarar quePOSTnãofoienviado nemqueUUIDregex comprovaexistênciaporSQL; cadeiaAPI+camposéautoridade.
SomentecreateJob muda;3outrosformhandlers e4effects de485/486 preservados. Novo botãoWeb secundário Atualizar dados incrementa somente revision, efetuandoleituras jáexistentes; disabledloading, semPOST automático/retrydemutação/novospapéis. Permiteconferênciaexplícita apósrespostaincerta. Mobile/desenhocanônicoRN inteiroinalterado; Webalteração visual restrita aessecontrole, semclaimderender/aceitevisualintegral.
Source/types/tests/fixture/evidência e5docsORIGINAISv1.104/memória/checkpoint/ledger/registry íntegrosnomesmociclo. ExigirCIpróprioNOVOhead esperado17web/731mobile/383API/3CLI+10monitor=1144, typecheck/build/Next/export/migrations/privacy/HTTPPostgres/todossteps e pósCIrealSHA. APK N/A SÓhash/modesNativeigual eworkflowbuild/smoke/lock/RN iguais, não []comoPASS. Branchfix/web-job-publication-ack: revisar diff/bytes/tree/modes/fullhistory, main/head/mergeable eexpectedhead; mergeapenasgatesgreen, orderedparents/tree/main/postCI; não emprestar487para488.
Próximo apósgate: sessão/contexto de mutations Webapósawait e prazo/recuperaçãodasleituras, ACKs deequipes/safety/substituição conformecontratosreais, concorrência criação deRR vs cancel/lifecycle. Apenasfalhasreproduzidas; preferências/helpsemvínculo/ML/integrations precisamcontrato/dados. Nãofechar13áreasporunitcount/0PR/issues, não repetirACK/proteção/formleitura jácorrigidos. React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone semMetro preservados; físico/E2E/VisualTruth/SecureStore/piloto,pentest/providers/PSPKYCsandbox/FIN-RISK/WebRailwaypago OPEN separados. Semgastos/provisão/serviços/PSP/dinheiroreal/produção/segredos/deploypago; manterrotinaativa/nãoCONTINUAR/não24h/fimrodada/parcial/transitório nãofecha.

### Recibo primário487
```json
{
  "merge": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
  "parents": [
    "41d5165194a70a4a5bfdb0d3d4b90431fc533c9b",
    "549e2642b8b2985cb7e3132596f7bc2ae7216537"
  ],
  "tree": "2f14715d56751cea93a7cad035a8717606cec750",
  "head": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
  "ci": {
    "run": 38199412553,
    "sha": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "job": 114649245800,
    "attempt": 1,
    "counts": [
      13,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "preview": {
    "run": 38199412549,
    "job": 114649245878,
    "sha": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "event": "pull_request",
    "success": true,
    "markers": [
      "2026-10-12T03:21:16.7193522Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"41d5165194a70a4a5bfdb0d3d4b90431fc533c9b\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":7,\"openPrs\":1,\"activeRuns\":1,\"event\":\"pull_request\"}",
      "2026-10-12T03:21:16.7195998Z ACTIVITY_WATCH_PREVIEW no_issue_writes=true"
    ]
  },
  "review": {
    "base": "41d5165194a70a4a5bfdb0d3d4b90431fc533c9b",
    "head": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "tree": "2f14715d56751cea93a7cad035a8717606cec750",
    "paths": [
      ".github/workflows/project-activity-watch.yml",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/AUTONOMOUS_CYCLE_RECEIPTS_479_486_2026-10-12.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/operacao/PAINEL_ATIVIDADE_GITHUB.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
      "scripts/tests/project-activity-watch.test.mjs"
    ],
    "bytesVerified": 9,
    "history": true,
    "unchangedNonDocs": 447,
    "apk": "N/A native inputs unchanged"
  },
  "postCI": {
    "run": 38199681077,
    "sha": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "job": 114650083177,
    "attempt": 1,
    "counts": [
      13,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "postMonitor": {
    "run": 38199681085,
    "job": 114650083321,
    "sha": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "event": "push",
    "markers": [
      "2026-10-12T03:25:29.7820591Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"b16fd677bd0b853b97f81e8a660ec0318366dcb4\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
    ],
    "success": true
  }
}
```

## Web: prazo e recuperação de leituras — 2026-10-12

Base verificada d43e3f31902c59a9e52a684aeca0e4794859d471 (PR #488 já integrado; não repetir merge). README e os cinco documentos originais íntegros foram reconsultados nesta base. A observação anterior mostrou dashboard com 12 requests pendentes/loading true e zero deadlines; candidatos 2, membros 1, substitutos 1, também sem prazo. Cinco regressões dos efeitos reais pré-JSX reproduziram RED 17 PASS / 5 FAIL (22 testes Web); após correção, GREEN 22 PASS / 0 FAIL, mantendo os 17 testes e seus asserts existentes. Relógio e transporte são fixtures determinísticas, sem alegar espera real de 15s, navegador renderizado ou aparelho físico.

apps/web/app/page.tsx agora limita cada uma das quatro leituras a 15000ms, incluindo fetch e leitura JSON. Expiração invalida a resposta para publicação de estado, mostra mensagem factual de tempo expirado/Atualizar dados e encerra loading do dashboard. Respostas/erros tardios não sobrescrevem dados, erros ou loading de uma nova leitura. Cleanup por empresa, seleção, sessão, revision ou unmount invalida e remove o timer; sucesso/falha também remove o timer. Não alegar aborto/cancelamento físico da rede: a requisição pendente pode continuar; o efeito expirado não publica. Não alterar POST/DELETE/login/payload/ACK/forms/tenant/roles; nenhuma repetição automática de escrita. Recuperação é uma nova leitura pelo controle Atualizar dados já existente, nunca confirmação fictícia de dados.

Regressões cobrem as quatro leituras: fetch pendente, JSON pendente, sucesso/erro tardios, retry explícito, cleanup com callback já capturado (empresa/seleção/signout), remoção de timers após sucesso e HTTP500. Fixture de timer adicionada ao harness existente sem retirar asserts/controles. JSX existente é preservado neste PR, assim como os demais handlers. Não representa aceite visual/E2E integral das 13 áreas.

Evidência: docs/evidencias/WEB_READ_DEADLINE_RECOVERY_2026-10-12.md. Código + regressões + evidência + DVT ORIGINAL v1.104/memória/checkpoint/ledger/registry no mesmo ciclo, apêndice sem substituir histórico. CI novo head esperado 22 Web + 731 mobile + 383 API + 3 CLI + 10 monitor = 1149, todos steps/typecheck/build/export/migrations/privacy/HTTP Postgres e pós-CI no merge SHA real. APK N/A apenas após identidade de todos blobs/modes nativos/dependências/lock/build/workflow/smoke comprovada; []/running não são PASS. Branch fix/web-read-deadline-recovery-20261012, PR/gates ainda pendentes neste snapshot; recibo final será no corpo do PR/checkpoint de continuidade, sem commit de metadados autorreferente.

Monitor: última execução real confirmada Project Activity Watch push 38199681085/job114650083321 em b16fd677bd0b853b97f81e8a660ec0318366dcb4 SUCCESS, ACTIVITY_WATCH_OBSERVED 2026-10-12T03:25:29.7820591Z, age0/openPrs0/activeRuns1. Consulta atual por event=schedule retornou zero runs, não prova falha nem execução do cron. Sem novo alerta aberto na consulta atual; permissions Issues write concedida não prova escrita quando não necessária. O workflow não muda nesta tarefa.

Próxima auditoria segura após gates: contexto de sessão/empresa das mutations Web após await, ACKs de equipes/safety/substituição conforme contratos atuais e concorrência de criação de replacement/cancelamento/lifecycle. Reproduzir falha antes de modificar; não inventar correção/atividade nem regras de negócio. Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST providers, PSP/KYC sandbox/FIN-RISK e Web Railway com eventual custo continuam OPEN separados (#215/#219/#220/#224/#228). React19.1.4/RN0.81.6/frozen lock/RLS/standalone sem Metro preservados; sem produção direta/serviços/custos/PSP/dinheiro real/segredos/deploy pago. Rotina ativa; fim de rodada/bloqueio parcial não fecha o projeto nem exige CONTINUAR; não alegar execução contínua 24h.

### Recibo final #488 (consulta factual, histórico integral)
```json
{
  "merge": "d43e3f31902c59a9e52a684aeca0e4794859d471",
  "parents": [
    "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "3e35ba395101ae6c24ae395905059284fb5bbf66"
  ],
  "tree": "f273f11ad44ffb1984673a60b2e09fd311d4722f",
  "head": "3e35ba395101ae6c24ae395905059284fb5bbf66",
  "ci": {
    "run": 38200188082,
    "sha": "3e35ba395101ae6c24ae395905059284fb5bbf66",
    "job": 114651648544,
    "attempt": 1,
    "counts": [
      17,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "review": {
    "base": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "head": "3e35ba395101ae6c24ae395905059284fb5bbf66",
    "tree": "f273f11ad44ffb1984673a60b2e09fd311d4722f",
    "paths": [
      "apps/web/app/job-publication.test.ts",
      "apps/web/app/job-publication.ts",
      "apps/web/app/page.tsx",
      "apps/web/app/web-form-target.test.ts",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/evidencias/WEB_JOB_PUBLICATION_ACK_2026-10-12.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md"
    ],
    "bytesVerified": 10,
    "history": true,
    "unchangedNonDocs": 447,
    "apk": "N/A all native inputs unchanged"
  },
  "apk": "N/A all native inputs unchanged",
  "postCI": {
    "run": 38200543524,
    "sha": "d43e3f31902c59a9e52a684aeca0e4794859d471",
    "job": 114652746016,
    "attempt": 1,
    "counts": [
      17,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "nextReadDeadlineObservations": [
    {
      "label": "dashboard",
      "pendingRequests": 12,
      "registeredDeadlines": 0,
      "error": "",
      "loading": true
    },
    {
      "label": "candidates",
      "pendingRequests": 2,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    },
    {
      "label": "teamMembers",
      "pendingRequests": 1,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    },
    {
      "label": "replacementCandidates",
      "pendingRequests": 1,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    }
  ]
}
```

## Web: confirmação contratual de criação de equipe — 2026-10-12

Predecessor funcional PR #489/head 5889221a5a415318add6e31acf8e3501cc4c88fa/tree85af7eaeae821efb6cc7df7b7f990b320bbc897c: prazo das quatro leituras Web, CI38201650457 ainda EM EXECUÇÃO neste snapshot, não PASS. Esta preparação é independente de regras novas de negócio; integração exige primeiro o predecessor e seus gates. Documento ORIGINAL integral, memória/checkpoint/ledger/registry preservados por apêndice.

Falha reproduzida no handler real createTeam: HTTP201 com {id:'fake'} limpa form e incrementa revision sem confirmar a equipe criada; regressão nova RED22PASS/1FAIL de23. Contrato existente apps/api/src/teams.controller.ts create autentica/membership antes de validação, exige name:string.trim não vazio e retorna SQL RETURNING id,name com name.trim. Nenhuma alteração no backend/mobile/roles/RLS/SQL.

Novo apps/web/app/team-publication.ts usa apenas esse contrato: confirmação exige UUID do ACK e nome igual ao name.trim enviado; payload é mantido, sem adicionar tenantId/ID/normalizações à escrita. ACK ausente/fabricado/divergente, perda de JSON ou transporte permanecem unknown; 4xx rejected, 5xx unknown com HTTP explícito preservado. Não declarar inexistência de escrita quando retorno perdido, não auto-repetir POST. Handler guarda o form em resultado incerto e orienta Atualizar dados/conferir equipes antes de qualquer novo envio. Resultado válido limpa o form uma vez e dispara leitura existente. Campos de vaga/safety e seus ACKs, quatro efeitos de leitura/JSX/login/DELETE/RN intactos.

Regressão do handler + três testes do helper: GREEN26PASS/0FAIL. Todos22 testes/asserts anteriores preservados; somente fixture positiva createTeam foi ajustada ao ACK real UUID+nome (antiga id fixture-ack incompleta). Cobertura de trim/payload por referência, nomes diferentes, UUID inválido/whitespace, JSON inválido/nulo/array, HTTP400/401/403/429/500 e perda de transporte/JSON com uma única chamada. Não é navegador renderizado, SQL real deste teste, nem E2E/aparelho físico. Testes HTTP Postgres existentes da API continuam no CI.

Código/helper/testes/evidência docs/evidencias/WEB_TEAM_PUBLICATION_ACK_2026-10-12.md e cinco documentos originais no mesmo ciclo. CI esperado26Web/731mobile/383API/3CLI/10monitor=1153, todos steps/typecheck/build/export/migrations/privacy/HTTPjourney e pós-CI real. APK N/A exige prova de identidade SHA/modes de todos inputs native/deps/workflows/build/smoke, jamais pela ausência de run. Branch fix/web-team-publication-ack-20261012; own/merge/post pendentes neste snapshot. Revalidar base main após489 e diff/bytes/modes/ancestral/tree; merge somente green no head exato; registrar recibo real no PR e continuidade sem loop de commits de metadados.

Próximas alternativas seguras: contexto de mutations após await/troca sessão/empresa; ACKs de membership/substituição/safety conforme contrato atual; concorrência RR/lifecycle/cancel. Reproduzir causa-raiz antes de novo código; não inventar tarefas. Monitor source inalterado: execução push487 comprovada, cron ainda não comprovado, [] não falha/PASS. Preservar gates OPEN separados físico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSP-KYC/FIN-RISK/Web pago e proibições de custo/segredo/PSP real/produção/deploy pago. Projeto não concluído por0PR; rotina ativa sem CONTINUAR/sem alegar24h contínuo.

## Web: ACK de revisão de segurança — 2026-10-12

Base funcional PR #490/head9ead8ad37dba3f03362d4792d6154cc9c94f105e/tree29684e78d4535a1cdbc83bb0d9209078cbaf1cd6. Próprios/post gates490 ainda pendentes neste snapshot; integração exige predecessor validado. #489 já MERGED09b2d029c92aa1c783ce759c6f553f09b7685d5f/pais[d43e3f31902c59a9e52a684aeca0e4794859d471,5889221a5a415318add6e31acf8e3501cc4c88fa]/tree85af7eaeae821efb6cc7df7b7f990b320bbc897c igual candidato/main confirmada. OwnCI38201650457/job114656159008 SUCCESS22/731/383/3/10=1149, todos steps/HTTP Postgres; postCI38201962169 EM EXECUÇÃO, não PASS neste snapshot. Não repetir merge489.

Falha reproduzida nos handlers reais updateSafetyCase/updateSafetyAppeal pré-JSX: ambos limpam o formulário e incrementam revision após HTTP201 com ACK sem ID/status/changed correspondentes. Duas regressões reais RED26PASS/2FAIL(28). Após helper/integração + três testes contratuais: GREEN31PASS/0FAIL; 26 testes/asserts anteriores mantidos. Fixtures positivas de safety agora usam UUID realista em caseId/appealId/path e ACK canônico id/status/changed:true, sem retirar assert de POST, tenant, reset uma vez/revision/falha500.

Contratos consultados na main: SafetyAdminController.status retorna id,status,resolvedAt,changed:true ou changed:false no replay mesmo status; SafetyAppealsAdminController.status retorna id,status,changed:true/false após advisory lock/transição existing. Novo helper confirmSafetyStatus confirma somente ID UUID exato ao enviado, status exato e changed booleano; aceita changed:false como confirmação idempotente. Não criar política de transição/novos roles/estatísticas/SQL, não afirmar validação de todos campos como resolvedAt. Autenticação owner/admin e payload/status/note/paths/headers da UI permanecem iguais; backend/RLS/locks/policies intactos. ErroHTTP400/401/403/404/409/429/500 explícito preservado; ACK incerto/perdaJSON/network é unknown, form mantido e consulta explícita via Atualizar dados antes de novo envio. Sem retry automático ou afirmação de que não houve escrita.

Somente dois handlers de safety + import/helper/testes; JSX/quatro efeitos/handlers restantes inclusive vaga/equipe/login/DELETE inalterados. Testes helper usam transporte determinístico, não SQL real/browser renderizado/físico. As jornadas HTTP Postgres e demais testes API existentes seguem obrigatórios no CI.

Evidência docs/evidencias/WEB_SAFETY_STATUS_ACK_2026-10-12.md, código/regressões e cinco documentos ORIGINAIS íntegros no mesmo ciclo por apêndice, sem substituição de histórico. Branch fix/web-safety-status-ack-20261012; CI esperado31Web/731mobile/383API/3CLI/10monitor=1158, todos steps/build/typecheck/export/privacy/migrations/HTTP e pós-CI real. APK N/A somente identidade de SHA/modes de inputs nativos/deps/workflow/build/smoke. Own/predecessores/merge/post pendentes não são PASS; recibo primário completo será PRbody/checkpoint de continuidade sem loop de commits de metadados.

Próximas frentes internas: contexto de mutations após await/troca sessão/empresa; ACKs de membros/confirm/substituições com contrato real; concorrência RR/lifecycle/cancel. Reproduzir falha antes de modificar. Monitor última execução push487 comprovada; cron ainda sem run localizado, nunca confundir configuração com execução; sourceunchanged. Físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSP-KYC/FIN-RISK/Webpago permanecem OPEN separados; React19.1.4/RN0.81.6/frozenlock/RLS/standalone semMetro preservados. Sem serviços/custo/credenciais/dinheiroreal/PSP/produção/deploypago. SemCONTINUAR/não24hcontínuo/rotinaativa até aceiteintegral ou ordemexpressa.

### 2026-10-12 — isolamento de contexto nas mutações Web da empresa (PR #492)

- A reprodução comportamental no código integrado por `d65e3a86484df72319a8b0ed8db44a5856d775ba` confirmou que respostas tardias de quatro mutações (`createJob`, `createTeam`, `updateSafetyCase` e `updateSafetyAppeal`) ainda conseguiam publicar `HTTP 500` e encerrar o estado de carregamento depois da troca de `tenant-a` para `tenant-b`.
- A revisão da mesma família encontrou sete operações com o mesmo risco: adicionar/remover membro, confirmar candidato, solicitar/selecionar substituição e adicionar/remover profissional do talent pool.
- A correção instala uma chave de contexto baseada em token, identidade, tenant e papel por `useLayoutEffect`, invalida-a no cleanup e só publica sucesso, erro, refresh ou término de loading se a resposta ainda pertence ao contexto ativo. O ciclo cleanup/setup do Strict Mode preserva o contexto atual.
- A escrita que já chegou ao servidor não é cancelada nem repetida. Payloads, cabeçalhos, autoridade, ACKs canônicos, idempotência, rotas, RLS e política de tenant permanecem inalterados.
- Regressão local: 27 cenários novos cobrem falha/sucesso tardios, troca de tenant/token/papel, logout, desmontagem e replay de Strict Mode; a suíte Web completa passou com **58/58** testes.
- Escopo funcional: `apps/web/app/page.tsx`, `apps/web/app/web-form-target.test.ts` e ajuste de fixture em `apps/web/app/web-read-context.test.ts`. Entradas Android/native, dependências, lockfile, workflows, build e smoke permanecem byte a byte idênticas à base; APK é **N/A por identidade de árvore**, não por ausência de execução.
- Os recibos exatos de head, árvore, CI próprio, merge e pós-CI serão mantidos no corpo do PR #492; `queued`, `running` ou resposta vazia não serão tratados como aprovação.
- Próxima auditoria interna: reproduzir antes de alterar qualquer concorrência restante em login/logout, membership, confirmação/substituição e lifecycle/cancelamento. Preferências, help sem vínculo, previsão e integrações continuam sem política inventada.

### 2026-10-12 — propriedade da sessão no login e saída local imediata da Web

- Na `main` `28c17ad558803bee566fd4594ba4e1e193633a8f`, cinco regressões comportamentais executando os handlers reais pré-JSX reproduziram: resposta antiga de login substituindo uma sessão mais nova; falha antiga publicando erro e encerrando loading da sessão atual; resposta de login persistindo sessão após desmontagem; e logout mantendo token/sessão local enquanto a revogação remota estava pendente ou falhava.
- Resultado RED: **58 testes anteriores passaram e 5 novos falharam**. A correção mínima terminou com **63/63 PASS** localmente.
- `signin` agora atribui geração monotônica a cada tentativa e só persiste sessão, publica erro ou encerra loading quando a tentativa ainda é a mais recente e o componente permanece montado. A resposta anterior não ganha autoridade sobre a tentativa posterior.
- `signout` invalida tentativas de login, remove imediatamente a sessão da aba e limpa integralmente os dados/seleções/feedback locais antes de solicitar, em melhor esforço e sem retry automático, a revogação remota com o token capturado. Falha ou demora de rede não restaura a sessão nem bloqueia a saída local.
- O endpoint, método, header Bearer, payloads, filtro de papéis empresariais, tenant/RLS, armazenamento por aba, APIs e backend permanecem inalterados. A correção não afirma revogação remota quando o transporte falha e não representa browser E2E, dispositivo físico ou produção.
- Escopo funcional: `apps/web/app/page.tsx` e novo `apps/web/app/web-auth-context.test.ts`. Entradas Android/native, dependências, lockfile, workflows, build e smoke permanecem candidatas a APK **N/A por identidade de árvore**, a comprovar na revisão do PR.
- Project Activity Watch: a primeira execução agendada real `38217445193`/`114705385578` passou e abriu corretamente o alerta #493 ao observar 146 minutos sem commit. O alerta não prova agente parado e deve ser comentado/fechado pelo próprio monitor após detectar novo commit na main.
- Próxima auditoria segura após os gates: concorrência de criação de substituição versus cancelamento/lifecycle e contratos reais de ACK de membership/substituição. Corrigir somente falha reproduzida; não inventar políticas para preferências, ajuda, previsão ou integrações sem contrato/dados.

## 2026-10-12 — replacement create/cancel concurrency

- Evidência: `docs/evidencias/REPLACEMENT_CREATE_CANCEL_CONCURRENCY_2026-10-12.md`.
- Reprodução primária: PR #495 head `aeb5a8d49a0350021873fffabd1fb7289a56f5ab`, CI `38238401435`, job `114774652060`, HTTP/Postgres RED com assignment `cancelled` e pedido `open`.
- Correção: ordem de lock `assignment → replacement request`, fechamento tenant-scoped do pedido `open` e `resolved_at`.
- Validação: regressão concorrente + dois testes de controller; CI próprio/pós-CI e revisão de árvore ainda obrigatórios neste snapshot.

## 2026-10-12 — reset de seleções ao trocar a empresa Web (PR #496)

Base revalidada main345419b077571e0ebfa3337ff24edfa522aea03c. README aponta o DVT ORIGINAL v1.104; memória/checkpoint/ledger/registry preservados integralmente. PR #495 já integrado uma vez; não repetir. Seu head eff95a3fd8a6e323755290f3a480432f514d8bcc teve ownCI38238954175/job114776491510 SUCCESS; merge345419b077571e0ebfa3337ff24edfa522aea03c, orderedparents[10fc12c47f515dc38cf3bd0a8985b53754bfc364,eff95a3fd8a6e323755290f3a480432f514d8bcc], tree8c8eb20c8ccf8eb66ba6ecad2974df99370f3a28 igual candidata/main. PósCI38239314453/job114777705727 SUCCESS no merge REAL, counts63Web/731Mobile/385API/3CLI/10monitor=1192, zero falhas, todos steps/HTTPPostgres e duas barreiras concorrentes. Recibo final PRbody495, sem novo commit autorreferente.

Reprodução do handler real de seleção empresarial: old source mantém selectedJobId=job-a, selectedTeamId=team-a, selectedReplacementId=replacement-a e candidatos/recomendações/membros/substitutos da empresa A depois de setTenantId(company-b). Fonte corrigida zera os três IDs e quatro listas antes da mudança de tenant; reescolha do mesmo tenant preserva seleção. Esse teste executa o corpo real com setters determinísticos: não é browser/React render, SQL, físico ou prova de segurança RLS.

Mudança funcional restrita ao onChange da empresa em apps/web/app/page.tsx; teste comportamental apps/web/app/tenant-switch.test.ts passou 2/2 local. Nenhum endpoint/header/payload/ACK/autoridade/role/RLS mudou. O CI inicial38262686638/job114856945168 SUCCESS no head d8a4edec7378147ca05f7652092ea9d991697f38; após adicionar os cinco documentos e reprodução factual à evidência, exigir NOVO CI no novo head, não emprestar o run inicial. Próprio e pós-CI no merge real obrigatórios; APK N/A somente identidade dos blobs/modes Android/native/deps/lock/workflow/build/smoke comprovada.

Evidência docs/evidencias/WEB_TENANT_SELECTION_RESET_2026-10-12.md. Próxima ação: revalidar head/base/diff/bytes/modes/tree/ancestrais/gates, integrar #496 somente com CI green, confirmar orderedparents/tree/main/pósCI, registrar recibo real no corpo do PR. Após gates continuar auditoria ACKs Web de membership/replacement e cobertura interna por área, apenas falhas reproduzidas e contratos existentes. Zero PRs ou contagem de testes não provam aceite das13 áreas.

Monitor reconsultado: último schedule comprovado38217445193 SUCCESS, #493 ainda OPEN0comments, nenhum schedule posterior localizado; não fechar manualmente, acompanhar logs/alertas sem inferir agente parado. Físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSP-KYC/FIN-RISK/Webpago (#215/#219/#220/#224/#228) continuam OPEN separados. React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/standalone/desenho preservados. Sem produção/serviços/custos/credenciais/contratos/dinheiroreal/PSP/deploypago; rotina única ativa sem pedir CONTINUAR nem alegar24h contínuo.

## 2026-10-12 — confirmação de ACK de substituição na Web

Predecessor496 MERGED107cfb3a81487d37f78e3176cd1dd9d567719d6c, orderedparents[345419b077571e0ebfa3337ff24edfa522aea03c,2a54965f96bfd6af56e091424bbbe1b738c4015f], tree d15fe502bd292102027b60945683f28298723415 igual candidata/main. OwnCI38266180060/job114868804284 SUCCESS65/731/385/3/10=1194, todossteps/HTTPPostgres; postCI38266743335 EMEXECUÇÃO neste snapshot, não PASS. Não repetir merge496. Docs originais preservados; acompanhar pós e recibo final PR496.

Nova falha reproduzida no source real pré-JSX: requestReplacement aceita id:'fake' e seleciona pedido fictício; selectReplacement aceita assignmentId:'fake', limpa seleção e incrementa revision sem ACK canônico. Dois testes comportamentais RED1PASS/2FAIL com controle legítimo. Contratos API existentes reconsultados: create idUUID/assignmentIdexato/statusopen; select replacementRequestId/professionalId/replacedAssignmentIdexatos, assignmentIdUUIDdiferente/statusmatched.

Correção mínima em dois handlers com helper replacement-ack.ts. Captura assignmentId do pedido exibido antes do await, guarda contexto atual antes de validação/publicação e exige ACK canônico. Incerteza mantém seleção/revision e orienta leitura explícita; não auto-retry, não afirma que escrita não ocorreu. Payloads/métodos/headers/endpoints/auth/roles/tenantRLS/idempotência/matching/notificações/finanças preservados. Nenhuma política nova.

Seis testes novos (dois RED, positivo/payload/schemaUUID/binding/HTTP/perda transporteJSON): suite Web local71/71PASS, todos65 anteriores mantidos. Fixtures determinísticas não representam React render/browser/E2E/físico/SQL. Evidência docs/evidencias/WEB_REPLACEMENT_CONTRACT_ACK_2026-10-12.md. Branch fix/web-replacement-contract-ack-20261012; PR/head/CI próprio/pós ainda pendentes neste snapshot. Exigir CI no novohead esperado71/731/385/3/10=1200 + todossteps/HTTPPostgres. APK N/A somente identidade de todosinputs Android/native/deps/lock/build/workflow/smoke SHA/modes.

Próximopasso: revisar bytes/diff/modes/tree/ancestrais, comprovar pós496 e próprioCI destehead, integrar uma vez e confirmar pais/tree/main/pósreal. Recibo final no corpoPR/continuidade, consolidar no próximo ciclo funcional semloopmetadata. Depois auditar contratos de ACK membership/confirmação e cobertura porárea apenas lacunasreproduzidas. Monitor493 OPEN/0comments, nenhum scheduleposterior localizado naúltimaconsulta; acompanhar, não fechar manualmente. Gates físicos/E2E/VisualTruth/SecureStore/piloto/pentest/TRUSTproviders/PSPKYC/FINRISK/WebpagoOPENseparados215/219/220/224/228. Preserve React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/standalone/desenho; semserviços/custos/credenciais/contratos/PSP/dinheiroreal/produção/deploypago. Rotinaúnica ativa, semCONTINUAR/sem24h contínuo; 0PR/testcount não fecha13áreas.

## 2026-10-12 — ACK canônico de membros de equipe Web

Base main1b8a9deeec5d3211f1c946aba679c3cb48d59a7f: #497 jáMERGED, orderedparents[107cfb3a81487d37f78e3176cd1dd9d567719d6c,40b66a4045f6f33dac9623e927a369346809f17c], tree988e365586b49e77e9a606f37d4135b0e0b57c19 igualcandidata/mainconfirmada. OwnCI38267049611/job114871723175 SUCCESS71/731/385/3/10=1200, todossteps/HTTPPostgres; pós38267610320 EMEXECUÇÃO neste snapshot. #496pós38266743335/job114870718162 SUCCESS65/731/385/3/10=1194, todossteps/HTTPPostgres noSHAreal107cfb3a81487d37f78e3176cd1dd9d567719d6c. Recibos finais corposPR496/497; não repetir merges.

Dois handlers source-real addTeamMember/removeTeamMember aceitam HTTPok+{} comrevision1/erroblank. Nova bateriaRED1PASS/2FAIL de3 comcontroleslegítimos, hooks/transportedeterminísticos préJSX, nãoReactrender/SQL/browser/físico. Contrato TeamsController existente: add teamId/professionalIdexatos/replayidempotente; remove removed:true. Helperteam-membership-ack.ts valida somente essesACKs; addrequireUUID/binding, removebooleantrue seminventarIDsde retorno.

Correção: add validaresultado antesrefresh; remove lêJSON e validaACK mantendo mesmoDELETE/URL/headers; removegenérico/talentpool intactos. ACKincerto preservaseleção/revision e orienta leituraexplícita, semretry nemassertque nãohouveescrita. Guardascontexto sessão/token/tenant/role/unmount e catch/finallypreservadas. API/backend/RLS/autoridade/payloads/matching/finanças/policy inalterados.

Seisregressões novas negativos/positivopayloadheaders/UUID/replay/HTTPrejected/perdaredeJSON, suiteWeblocal77/77PASSmantendo71anteriores/asserts. Evidência docs/evidencias/WEB_TEAM_MEMBERSHIP_CONTRACT_ACK_2026-10-12.md. Branch fix/web-team-membership-contract-ack-20261012. Próximo: próprioCInovohead77/731/385/3/10=1206 +todosstepsHTTPPostgres,post497green,revisãobytes/modes/diff/árvore/ancestralidade,mergeumavez/pais/tree/main/pósreal. APKN/Aapenasidentidadeblobsmodesnative/deps/lock/workflow/build/smoke. Registrar recibofinalPRbody semloopcommitsmetadados.

Continuar auditoria funcional de ACK confirmação/cancelamento e cobertura 13áreas da referência, somentefalhaprovada, nãoinventarpolítica/aceiteportestcount/0PR. Monitor493OPENúltimaconsulta/croncomprovado38217445193semnovoagendamento localizado; nãofecharmanual/semalegaragenteparado. Físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSPKYC/FINRISK/WebpagoOPENseparados215/219/220/224/228. React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/standalone/desenho preservados. Semprodução/serviços/custo/credenciais/contratos/PSP/dinheiroreal/deploypago. Rotinaúnicaativa atéaceiteintegral, semCONTINUAR/sem24hcontínuo.

## 2026-10-12 — ACK de confirmação de candidato e talent pool Web

Base main50fd200b3a69fd80633612b167dbaf596d301984 (#498MERGED, não repetir), pais[1b8a9deeec5d3211f1c946aba679c3cb48d59a7f,d30d18d71628dca5165388c2dd2518c0814892c0], tree88f48e1cd0a205cbc90b02e6cfb65eeae64ff7d1 igualcandidata/main. ownCI38267978559/job114874891285 SUCCESS77/731/385/3/10=1206todossteps/HTTPPostgres; pós38268538595 EMEXECUÇÃO neste snapshot. #497pós38267610320/job114873626196 SUCCESS1200todossteps/HTTPPostgres noSHAreal1b8a9deeec5d3211f1c946aba679c3cb48d59a7f. RecibosfinaisnoscorposPR496/497/498; snapshots running não PASS.

Falha reproduzida no source-real confirmCandidate/addTalentPool/removeTalentPool: HTTPok+{} incrementa revision sem ACKcontratual. TrêsnegativosRED+controlepositivo RED1PASS/3FAIL. ControllersAPIreconsultados: confirm idUUID/jobId/professionalId/tenantIdexatos/statusconfirmed; addTalent professionalId/poolexatos/replaylegítimo; removeTalent removed:true. Nenhuma política/tipoempregatício/culpa/pagamento/provider foi inferida.

Correção mínima usa workforce-ack.ts antes de refresh; captura payloadFormData literal; removeTalent lêJSONcommesmoDELETE/URL/headers/statusHTTP. Guardas sessão/token/tenant/role/unmount preservadasantesdevalidarACK/publicar. Resultadoincerto mantémdados/seleção/revision e orientaleituraexplícitaantesdenovoenvio, semauto-retry/nãoafirmaqueescritanãoocorreu. API/RLS/roles/idempotência/matching/notificações/finanças/backend intocados.

Seteregressões novas: trêsnegativas, controlepositivo/payloadheaders/method, UUID/replay/shape, HTTPrejected e perdaredeJSON. SuiteWeblocal84/84PASS mantémtodos77anteriores. Fixturesdeterminísticas nãoReactrender/browser/físico/SQL. Evidência docs/evidencias/WEB_CANDIDATE_TALENT_CONTRACT_ACK_2026-10-12.md. Branch fix/web-candidate-talent-contract-ack-20261012; exigir novoheadCI84/731/385/3/10=1213+todossteps/HTTPPostgres,pós498green,revisãodiff/bytes/modes/tree/ancestrais,mergeumavez/pais/tree/main/pósreal. APKN/AapenasidentidadeblobsmodesAndroid/native/deps/lock/build/workflow/smoke.

Próximo apósgates: confrontar requisitos/referênciacanônica→rotas/APIs/dados/estados/testespor13áreas, inclusive renderinterno/emulador e prazos/mutações/contextosmesmo tenant. Sócorrigirfalhaprovada; nãoinventarpreferências/helpsemvínculo/previsões/integrationssefaltacontrato/dados. Monitor493OPENúltimaconsulta/nennhum scheduleposterior; verificarprimários/alertas semfecharmanual. Físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSPKYC/FINRISK/WebpagoOPENseparados215/219/220/224/228. Preserve React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/standalone/desenho. Semprodução/serviços/custos/credenciais/contratos/PSP/dinheiroreal/deploypago. Rotinaúnicaativa; semCONTINUAR/sem24hcontínuo;13áreasnãofechadasportestcount/0PR. RecibofinalPRbody, próximo ciclofuncionalconsolida semloopmetadata.


## Continuidade factual — Web signin HTTP feedback — 2026-10-13

Base revalidada: main `bf094d28377b0033d1ab5242c439447ef42cca27`, tree `abaee6e83cba4b059499c4c92d06c722980da252`; PR #503 já merged, pais ordenados `c5347d6965d093180e8c1270f1b0e62666093d18`, `408f34ed120bf6c31445ca6f31d9c101f4394032`. Não repetir essa integração. CI próprio #503 run [38335904205](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38335904205) SUCCESS no head `408f34ed120bf6c31445ca6f31d9c101f4394032`. Pós-CI [38337622522](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38337622522), job `115101186739`, SUCCESS no merge SHA real `bf094d28377b0033d1ab5242c439447ef42cca27`: 92 Web / 731 Mobile / 385 API / 3 CLI / 10 monitor, fail 0; todos os steps, HTTP/Postgres e Production Truth passaram. Consulta vazia anterior não foi utilizada como PASS.

Project Activity Watch schedule comprovado: [38343885280](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38343885280), job `115120748244`, SUCCESS no SHA `bf094d28377b0033d1ab5242c439447ef42cca27`. Log primário `2026-10-13T03:54:22.4300728Z ACTIVITY_WATCH_OBSERVED`: SEM NOVO COMMIT (>15 MIN), ageMinutes 78, openPrs 0, activeRuns 0, event schedule. Issue #493 OPEN na consulta; não fechada manualmente. Ausência de commit não prova ausência de trabalho.

Falha reproduzida no handler real de signin Web: uma resposta HTTP 400 era apresentada como “E-mail ou senha inválidos.”, embora a API reserve Unauthorized/401 para rejeição de credenciais. O código aplicava essa mensagem também a todos os demais códigos diferentes de 429. Regressão RED: 93 PASS / 1 FAIL, preservando os 92 testes anteriores; a primeira asserção negativa (400) falhou pela mensagem sem HTTP 400. Correção mínima: apenas 401 usa credenciais inválidas; 429 mantém a mensagem existente; outros status exibem “Não foi possível concluir o login (HTTP N). Tente novamente.” Sem diagnóstico inventado do servidor.

GREEN local: 94/94, fail 0, via `node --experimental-strip-types --test apps/web/app/*.test.ts`. Duas novas regressões comportamentais exercem o handler real pré-JSX com hooks/transporte determinísticos: 400/403/404/500/502/503 informam status; 401/429 conservam os textos canônicos; sessão/storage continuam vazios, loading encerra e há exatamente uma chamada por tentativa. Não representa renderização React, navegador E2E, SQL real ou aparelho físico.

Escopo: uma expressão de classificação de erro em `apps/web/app/page.tsx` e dois testes em `apps/web/app/web-auth-context.test.ts`. Endpoints/métodos/headers/payloads/validação de ACK/propriedade de sessão/tenant/RLS/backend e desenho intactos; sem retry automático, nova dependência ou custo. Evidência: [WEB_SIGNIN_HTTP_FEEDBACK_2026-10-13.md](../evidencias/WEB_SIGNIN_HTTP_FEEDBACK_2026-10-13.md). Os cinco documentos originais recebem este apêndice, sem remover o histórico.

Gates desta correção: CI próprio do novo SHA e pós-CI do merge real ainda PENDENTES nesta árvore de preparação; contagem esperada 94/731/385/3/10 = 1223 não equivale a aceite antes dos logs. APK N/A somente após revisão de identidade de blobs/modes de TODOS os inputs Android/native/deps/lock/workflows/build/smoke; não por ausência de run ou APK emprestado. Recibos finais serão registrados no corpo do PR e checkpoint de retomada, sem loop de commits autorreferentes.

Próxima ação concreta: revisar bytes/diff/árvores e gates do PR desta correção; integrar uma única vez se aprovados e conferir ordered parents/tree/main/pós-CI. Depois auditar falhas reproduzíveis nos requisitos internos (auth/estados/mutações/lifecycle), sem inventar política para preferências/help sem vínculo/previsão/integrações. Zero PRs e contagem de testes não comprovam aceite das 13 áreas. Gates externos #215/#219/#220/#224/#228 físico/Visual Truth/pentest/providers/PSP-KYC/Web pago continuam OPEN separados. React 19.1.4, RN 0.81.6, frozen lockfile e standalone sem Metro preservados; sem produção, gastos, PSP ou dinheiro real.


## Continuidade factual — prazo de signin Web — 2026-10-13

Correção anterior PR #504: head `da5d0bc8dee051dbe743e72fba63a5242e04c4f5`, tree `c1da51c9cee9a8d47024a9b831c1b2ac2f8d5548`, base `bf094d28377b0033d1ab5242c439447ef42cca27`. Diff/bytes dos 8 paths conferidos; cinco documentos preservados por prefixo integral; 463 blobs não-docs fora dos dois arquivos Web permanecem idênticos em SHA/mode. CI próprio [38353198161](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38353198161), job 115150043092, attempt 1, SUCCESS no head exato da5d0bc8dee051dbe743e72fba63a5242e04c4f5: 94/731/385/3/10, fail 0, todos steps+HTTP/Postgres/Production Truth. #504 MERGED em 95973f2a2292acad8c3d150915f387c2f0c48271, pais ordenados [bf094d28377b0033d1ab5242c439447ef42cca27,da5d0bc8dee051dbe743e72fba63a5242e04c4f5], tree c1da51c9cee9a8d47024a9b831c1b2ac2f8d5548 igual candidata/main confirmada. Pós-CI no merge real ainda PENDENTE; não repetir merge nem antecipar pós-PASS. Recibo final será consolidado no corpo do PR e retomada após logs reais.

Nova falha reproduzida: fetch do signin ou response.json pendentes mantinham loading true sem prazo/recuperação. Regressão real contra o source #504: 96 PASS / 2 FAIL, os 94 testes anteriores preservados; ambas falhas por loading true após prazo. Duas novas regressões de controle (retry explícito e unmount) também passaram antes da correção. Sem requests externos ou credenciais reais.

Correção: Promise.race limita a espera conjunta HTTP+JSON ao prazo de 15 s já usado pelas leituras Web; timeout libera loading e exibe “O tempo de login expirou. Tente novamente.”. Timer sempre removido ao encerrar. Resultado tardio do transporte não publica sessão/storage; tentativa mais recente e mounted continuam donos da publicação. Não cancela nem revoga a sessão possivelmente criada no servidor, não prova que a requisição HTTP foi cancelada, não repete a chamada. Nova tentativa depende de ação explícita; nenhum retry automático. Endpoint/POST/headers/payload/validação de sessão/isolamento de tenant/RLS/propriedade de signin/#504/JSX/desenho/backend intactos.

GREEN local: 98/98, fail 0, comando `node --experimental-strip-types --test apps/web/app/*.test.ts`. Quatro regressões novas: HTTP pendente; JSON pendente; sucesso tardio após prazo e após retry explícito; deadline após unmount. Incluem ausência de sessão/storage indevidos, mensagem de prazo, uma chamada sem retry automático e cleanup dos timers. Fixture usa handler real pré-JSX, hooks/transporte e timer explícito de 15000 ms. Não é render React, navegador E2E, SQL real ou físico.

Código+regressão+evidência+[cinco documentos originais por apêndice] no mesmo ciclo; evidência `docs/evidencias/WEB_SIGNIN_DEADLINE_2026-10-13.md`. Gates próprios CI e pós-CI no SHA real desta correção ainda PENDENTES na árvore de preparação. Contagens esperadas 98 Web / 731 Mobile / 385 API / 3 CLI / 10 monitor = 1227 não são aceite antes do run. APK N/A condicionado à identidade de todos os inputs native/deps/lock/workflows/build/smoke, não por ausência de runs. Revisar diff/bytes/modes/tree/ancestrais e atualizar a base main após #504 antes de integrar uma vez com gates reais.

Próxima ação: acompanhar CI de #504 enquanto esta correção recebe PR/gates; confirmar pais/tree/main e pós-CI de ambos sem emprestar resultados. Após integração, auditar lacunas reproduzíveis dos estados/mutações/lifecycle e requisitos por área, sem inventar política para preferências/help sem vínculo/previsão/integrações. Zero PRs não fecha as 13 áreas. Activity Watch tem schedule comprovado e issue #493 de ausência de commit; só o monitor deve administrar seu alerta. Histórico #503 e anteriores preservado; nenhuma integração repetida.

React 19.1.4/RN 0.81.6/frozen lockfile/tenant-RLS/Postgres/standalone sem Metro/desenho preservados. Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST/providers, PSP/KYC/FIN-RISK e Web pago permanecem OPEN (#215/#219/#220/#224/#228). Sem produção/PSP/transações/custos/novos serviços/credenciais/deploy pago. Sem aceite fictício das 13 áreas.


## Continuidade factual — prazo das mutações Web de formulário — 2026-10-13

Base revalidada: main `eac86f819815b8e37615a7b6df546279995f040d`, tree `34bfaf86820dbeb2fc026a3d2d45cd89039fa908`, zero PRs abertos. #504 e #505 já integrados; não repetir. Os recibos finais dos PRs comprovam, respectivamente, CI próprio/pós-CI 38353198161/38353600546 (94/731/385/3/10) e 38353695613/38354065490 (98/731/385/3/10), todos os steps, HTTP/Postgres e Production Truth aprovados nos SHAs exatos. Pais/árvores/main e checkouts sintéticos equivalentes foram conferidos; APK N/A por identidade completa dos inputs protegidos. Snapshots anteriores marcados PENDENTE permanecem histórico da preparação e não anulam os recibos finais.

Falha reproduzida no source real: `createJob`, `createTeam`, `updateSafetyCase` e `updateSafetyAppeal` permaneciam com loading ativo indefinidamente quando o POST ou `response.json()` não concluía. Regressão RED: 98 PASS / 8 FAIL, uma falha por transporte e outra por JSON pendente para cada handler; todas falharam porque loading continuava true. Nenhuma rede externa, credencial ou produção foi usada.

Correção: `withinMutationDeadline` limita a espera conjunta transporte+JSON a 15 s. Ao expirar, libera loading e informa: “A operação não respondeu no prazo. O resultado pode ser desconhecido. Atualize os dados antes de qualquer novo envio.” O formulário e seleções permanecem intactos, revision não avança, nenhum ACK é fabricado e não há retry automático. A operação remota pode ter sido processada; por isso a mensagem não declara sucesso nem falha e exige conferência antes de novo envio. Resposta ou ACK tardio não publica reset/refresh porque a Promise do handler já encerrou pelo prazo. Timers são removidos em sucesso, falha ou prazo.

GREEN local: 106/106, fail 0, comando `node --experimental-strip-types --test apps/web/app/*.test.ts`. As oito novas regressões usam os handlers reais pré-JSX, timers de 15000 ms, transporte e JSON controlados; confirmam mensagem incerta, loading false, formulário preservado, revision 0, uma única chamada, ausência de retry e descarte de ACK tardio. Os 98 testes anteriores passam intactos. Não representa render React, navegador E2E, SQL real ou aparelho físico.

Escopo funcional: `apps/web/app/page.tsx` e `apps/web/app/web-form-target.test.ts`; evidência `docs/evidencias/WEB_MUTATION_DEADLINE_2026-10-13.md`; Documento da Verdade ORIGINAL v1.104, memória, checkpoint, ledger e registry atualizados por este apêndice integral. Endpoints, POSTs, headers, payloads, ACKs, isolamento de contexto/sessão/tenant/RLS, rascunho, JSX/desenho, backend e dependências preservados. Nenhum custo, produção, PSP ou dinheiro real.

Gates desta árvore de preparação: CI próprio e pós-CI ainda PENDENTES; contagem esperada 106 Web / 731 Mobile / 385 API / 3 CLI / 10 monitor = 1235 não é aceite antes dos logs reais. APK será N/A apenas se a revisão provar identidade SHA/mode de todos os inputs Android/native/deps/lock/workflows/build/smoke; não por ausência de run ou artefato emprestado. Revisar bytes/diff/tree/ancestrais, revalidar main/head/mergeable, integrar uma vez somente com gate próprio aprovado e confirmar ordered parents/tree/main/pós-CI no SHA real.

Próxima ação após os gates: auditar, reproduzir e tratar separadamente prazos das demais mutações Web (membership, confirmação, substituição e talent pool), sem ampliar esta correção sem prova. #495 já serializa criação/seleção/cancelamento de substituição e #477 confirmação de assignment; não refazer. Zero PRs/testes não fecha as 13 áreas. Monitor schedule 38343885280/job115120748244 continua última execução comprovada; issue #493 OPEN, sem fechamento manual. Gates externos #215/#219/#220/#224/#228 continuam separados e abertos.


## 2026-10-13 — prazo nas mutações Web de força de trabalho (#507 em preparação)

- **Predecessor confirmado:** o PR #506 foi integrado em `a981a6ccc67787526ebbeeb299d5b2a8668096d8`, pais ordenados [`eac86f819815b8e37615a7b6df546279995f040d`, `d9d177b2734e443b9f112478efcef5313767dc29`] e árvore `cf038ee9953af9013fe9bcfa4033d6fb3738a4bf`. O CI próprio `38358738843`/job `115167636921` e o pós-CI real `38359224213`/job `115169187903` terminaram **SUCCESS**, com 106 Web, 731 mobile, 385 API, 3 CLI e 10 monitor, zero falhas e HTTP/Postgres/Production Truth aprovados.
- **Falha reproduzida:** depois desse merge, sete mutações Web — adicionar/remover membro, confirmar candidato, solicitar/selecionar substituição e adicionar/remover talent pool — continuavam aguardando indefinidamente quando o transporte ou `response.json()` não terminavam. O estado `loading` permanecia verdadeiro nos 14 cenários.
- **RED:** 106 testes anteriores aprovados e 14 regressões novas falhando (`true !== false` para `loading`) no source funcional do merge #506.
- **Correção:** as sete operações agora usam o mesmo prazo explícito de 15 s para transporte + JSON. Expirar libera a interface e informa que o resultado pode ser desconhecido, sem avançar revisão, limpar seleção, fabricar ACK ou reenviar automaticamente. A escrita já enviada ao servidor não é alegada como cancelada.
- **GREEN local:** 120/120 testes Web. As regressões verificam uma única chamada, resposta/ACK tardios ignorados e timers limpos. Os harnesses de ACK existentes apenas passaram a expor os timers reais do runtime; seus asserts de método, payload, headers, vínculo tenant, ACK e erro HTTP foram preservados.
- **Escopo:** `apps/web/app/page.tsx`, quatro arquivos de teste Web, esta evidência e os cinco documentos originais por apêndice. React/RN, API, SQL, RLS, lockfile e inputs Android/native/build/workflow/smoke não foram alterados.
- **Gates:** branch/PR, CI próprio no head exato, revisão de árvore, merge e pós-CI no SHA real ainda são pendentes neste snapshot de preparação; nenhuma contagem esperada é tratada como aprovação.
- **Próxima auditoria:** confrontar as mutações Web remanescentes e os demais requisitos das 13 áreas com contratos reais, corrigindo apenas nova falha reproduzida. Preferências, ajuda sem vínculo, previsão e integrações sem contrato/dados não autorizam política inventada.
- **Gates externos preservados:** Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST providers, PSP/KYC/FIN-RISK e implantação Web paga continuam separados e abertos.


## 2026-10-13 — monitor observa todo push na main (#508 em preparação)

- **Predecessor confirmado:** o PR #507 foi integrado em `c8e201868bcab5f872cb4e21a112fed56e2db94b`, pais ordenados [`a981a6ccc67787526ebbeeb299d5b2a8668096d8`, `609d7c6017b41a9b50a204f1ce12b97741555a5d`] e árvore `e1a029b6dd1a8c1ecf3d39d34f6c5ecc2f6e9845`. O CI próprio `38359817563`/job `115171098056` e o pós-CI real `38360258502`/job `115172509303` terminaram **SUCCESS**, com 120 Web, 731 mobile, 385 API, 3 CLI e 10 monitor, zero falhas e HTTP/Postgres/Production Truth aprovados.
- **Falha real observada:** o alerta #493 foi criado por schedule em 2026-10-12 e permaneceu aberto, sem comentário, depois de vários commits novos. Não houve Project Activity Watch nos SHAs dos merges #506/#507. Causa no YAML: o evento `push` para `main` tinha filtro `paths` limitado ao próprio workflow e ao seu teste, então entregas normais não acionavam a rotina que detecta commit recente e fecha o alerta.
- **RED:** 10 testes existentes aprovados e uma regressão nova falhando ao encontrar `push.paths` no workflow atual.
- **Correção:** o filtro de paths foi removido apenas do evento `push`; qualquer commit na `main` passa a executar o monitor. O evento `pull_request` continua restrito aos dois arquivos do monitor e continua read-only para issues.
- **GREEN local:** 11/11 testes do Project Activity Watch.
- **Escopo:** um workflow, um teste, esta evidência e os cinco documentos originais por apêndice. Código de produto, mobile, API, SQL, dependências, lockfile e workflows Android/build/smoke não foram alterados.
- **Prova ainda pendente neste snapshot:** PR/CI próprio, preview read-only, merge, execução `push` no SHA real e fechamento/comentário efetivo de #493. Nenhuma dessas etapas é tratada como aprovada antes da evidência do GitHub.
- **Próxima auditoria:** continuar a matriz das 13 áreas após fechar factual e automaticamente o alerta, sem criar commits apenas para atividade.


## 2026-10-13 — conversa única por trabalho sob concorrência (#509 em preparação)

- **Predecessor:** #508 integrado em `e702ffdce86bcc148029fbe2fa6e0163a14fb449`, árvore `f28b6ab0ca4731740c20079d6683c3d4aecd075e`, CI próprio/pós-CI e Activity Watch push aprovados; #493 encerrada automaticamente.
- **Falha reproduzida:** duas primeiras mensagens simultâneas podiam fazer leitura vazia antes de duas inserções e criar duas conversas para o mesmo trabalho.
- **RED válido:** head `218df1d25acea2a530fb32a12d8563d60429700a`, CI `38386686705`/job `115260103485`; typecheck/build/export Android aprovados, 385 testes API anteriores aprovados e nova regressão falhou com esperado 1/observado 2. A tentativa anterior com erro sintático do fixture foi descartada, não contada como prova funcional.
- **Correção preparada:** consolidação segura de duplicatas históricas, índice único parcial `tenant_id + assignment_id`, upsert atômico no endpoint e E2E com barreira PostgreSQL real.
- **Contratos preservados:** autorização, participante, tenant/RLS, mensagem, ACK e uma notificação por mensagem; nenhuma política nova.
- **Escopo:** API/DB/teste/fixture/evidência e estes cinco documentos originais por apêndice. Mobile/dependências/lock/Android build/standalone smoke não mudam.
- **Gates pendentes neste snapshot:** CI próprio no head corrigido, revisão de árvore, merge único e pós-CI no SHA real; nenhuma previsão é PASS.
- **Próxima auditoria:** após os gates, continuar a matriz factual das 13 áreas sem repetir auth/deadlines/replacement/monitor já concluídos.


## 2026-10-13 — pedidos concorrentes de verificação (#511 em preparação)

- **Predecessor confirmado:** #509 integrado em `d497517b3425b95305eac6f2bd6643bd161565b9`, pais [`e702ffdce86bcc148029fbe2fa6e0163a14fb449`, `22a66883853bbe5591b5a8bfb559736c4ad29d97`], árvore `6701ce5fc2f538ecfc62e91dd21c2502a2cd07ab`. CI próprio `38387496348`/job `115262763619` e pós-CI `38388020400`/job `115264507377` SUCCESS com 120 Web, 731 mobile, 386 API, 3 CLI e 11 monitor; Activity Watch push `38388020355` SUCCESS.
- **Falha reproduzida:** dois pedidos iniciais simultâneos de verificação do mesmo usuário ou empresa podiam ler ausência e competir pelo INSERT. O índice único evitava duplicidade física, mas uma requisição recebia erro `23505` em vez do mesmo caso pendente.
- **RED válido:** head `b30c4c8e06bea4ba5e6db81e376e7785c9423369`, CI `38392760549`/job `115280347562`; typecheck/build/export Android passaram, 386 testes API anteriores passaram e somente a nova regressão falhou. Duas tentativas anteriores com erro sintático no fixture foram descartadas e não contam como prova.
- **Correção preparada:** UPSERT atômico usa os índices parciais existentes de identidade e empresa, mantém o estado factual da linha vencedora e devolve o mesmo ACK. Não cria fornecedor, não aprova KYC, não chama produção e não altera a política de retry de casos rejeitados/expirados.
- **Prova adicional preparada:** E2E local/CI trava `verification_cases` em SHARE, exige duas requisições HTTP simultaneamente bloqueadas no INSERT e comprova dois HTTP 201, mesmo ID e uma linha pendente para identidade e empresa.
- **Escopo:** controller/teste API, fixture HTTP/PostgreSQL, esta evidência e os cinco documentos originais por apêndice. Mobile, React/RN, dependências, lockfile, build Android e standalone smoke permanecem inalterados.
- **Gates ainda pendentes neste snapshot:** novo head, CI completo, revisão de árvore, merge único e pós-CI no SHA real. Nenhuma previsão é tratada como PASS.
- **Externos preservados:** contratação/integração real de KYC/PSP, físico, pentest e implantação paga continuam separados; esta correção trata apenas consistência interna do pedido simulado.


## Apêndice — 2026-10-13 — Validação UTC estrita de turnos na API

- **Base revalidada:** `main` em `b8073e48632a8f33baef20e3026ab948a83f6d5b`, após o PR #513.
- **Recibo final do PR #513:** head `f96b63abfc5d83818e89eb60c4e9084c35df6d12`; CI próprio `38431609273`/`115414933714` SUCCESS; merge `b8073e48632a8f33baef20e3026ab948a83f6d5b`, pais ordenados `[84b8bfc117ab4a20b1d982d1eda7fe9635c4d265, f96b63abfc5d83818e89eb60c4e9084c35df6d12]`, tree `e852c9b035df7279d1a3d64ab90b0b853c1b510e`; pós-CI `38433558501`/`115421654529` SUCCESS com todos os passos. O escopo foi Web e documentação; APK foi N/A por identidade dos insumos Android/native/dependências/lock/workflows/build/smoke, não por ausência de run.
- **Falha reproduzida na autoridade API:** o runtime JavaScript aceita `2026-02-30T18:00:00Z` e o normaliza para `2026-03-02T18:00:00.000Z`; também interpreta strings sem fuso. O controller de criação de vaga usava apenas `new Date(...)`, podendo persistir um turno diferente do solicitado.
- **Correção candidata:** exigir instante UTC canônico `YYYY-MM-DDTHH:mm:ss[.SSS]Z`, aceitar frações de um a três dígitos com canonicalização e validar round-trip antes de qualquer escrita tenant. Datas impossíveis, date-only, sem fuso, offset e frações maiores são rejeitadas como `shift_window_invalid`.
- **Invariantes preservadas:** autenticação e papel antecedem validação; tenant vem do cabeçalho confiável; RLS/SQL, payload válido, ordenação início/fim, remuneração e modalidade não mudam; não há retry nem escrita em erro.
- **Prova preparada:** regressões unitárias cobrem 30 de fevereiro, formatos ambíguos e leap day real. Evidência: `docs/evidencias/API_JOB_UTC_DATETIME_VALIDATION_2026-10-13.md`.
- **Gates neste snapshot:** branch e conteúdo preparados; CI próprio, revisão final, merge e pós-CI ainda não são PASS até evidência do SHA exato.


## Apêndice — 2026-10-13 — Datas explícitas na disponibilidade profissional

- **Base revalidada:** `main` em `273169f5150f4dcef77e30b028a0f7597c9f4755`, sem PRs abertos.
- **Recibo final do PR #514:** head `884d9b57e6d67fa5909545436920b11915b6bc12`; CI próprio `38442378668`/`115451969431` SUCCESS com contagens 122/731/388/3/11 e zero falhas; merge `273169f5150f4dcef77e30b028a0f7597c9f4755`, pais ordenados `[b8073e48632a8f33baef20e3026ab948a83f6d5b, 884d9b57e6d67fa5909545436920b11915b6bc12]`, tree `62aad0f67c8f34dd6e787d1b07fa1d3162423c6f`; pós-CI `38443075923`/`115454365042` SUCCESS e Activity Watch `38443076014` SUCCESS.
- **Falha reproduzida:** `availabilityInput` ainda aceitava `2026-02-30T18:00:00-03:00` e o runtime o normalizava para 2 de março; também aceitava date-only e data/hora sem fuso, persistindo a string ambígua original.
- **Correção candidata:** parser compartilhado valida calendário e zona explícita. Disponibilidade preserva offsets explícitos válidos, enquanto criação de vaga continua exigindo UTC `Z`; a regra já integrada no PR #514 deixa de ficar duplicada no controller.
- **Regressões preparadas:** datas impossíveis, sem zona, date-only, fração longa e horários inválidos são rejeitados; leap day real com offset continua aceito e preservado. Autenticação, perfil, SQL idempotente e ordem positiva permanecem cobertos.
- **Escopo:** helper/teste API, input/controller tests, refatoração sem mudança funcional do job controller, evidência e cinco documentos originais. Mobile/dependências/lock/workflows/build/smoke permanecem inalterados.
- **Gates neste snapshot:** novo head, CI próprio, revisão, merge e pós-CI ainda não são PASS.


## Apêndice — 2026-10-13 — PR #517: preflight de publicação de vaga e regressão do harness

- Base funcional confirmada: `main` `4e624c66a99bfd24e6f27b4cc82734203e0b3141` (PR #516 já integrado; não repetir).
- Candidato inicial do PR #517: `bad3beb88640b424c7c4d925f9619f3a7a0710ec`.
- Correção funcional: a publicação Web de vaga valida, antes do POST, remuneração em centavos como inteiro seguro e não negativo, datas válidas e término posterior ao início. Payload, headers, isolamento tenant/RLS, ACK e ausência de retry automático permanecem inalterados.
- CI exato do candidato inicial: run `38450697584`, job `115480517944`, **FAILURE**. Typecheck, build e export Android passaram; a suíte parou com 8 falhas Web e os gates posteriores foram corretamente ignorados.
- Causa reproduzida: o harness que avalia o prefixo real de `page.tsx` em VM não injetava o novo helper `validateCompanyJobPreflight`; por isso oito cenários existentes de criação de vaga não alcançavam o transporte (esperado 1 POST, observado 0).
- Correção de regressão: importar e injetar o helper nos dois contextos VM de `web-form-target.test.ts`, preservando as fixtures válidas e todas as asserções anteriores. A falha não foi classificada como infraestrutura e o run antigo não deve ser reexecutado.
- Estado deste apêndice: novo SHA e gates completos ainda pendentes; `queued`, `running` ou `[]` não equivalem a aprovação. O merge permanece proibido até CI próprio no novo HEAD e revisão final.


## Recibo final — PR #517 — 2026-10-13

- Base: `main` `4e624c66a99bfd24e6f27b4cc82734203e0b3141`.
- HEAD aprovado: `7b10b1595531a84f3a2e359d74358e0f581ecd36`; árvore `ee4429a1a38bee2eed32bc068d9b19a55748c7ed`.
- CI próprio: run `38473361533`, attempt 2, job `115558139667`, **SUCCESS**; contagens Web/mobile/API/CLI/monitor `123/731/392/3/11`, zero falhas, migrações, privacidade, HTTP/Postgres, readiness e Production Truth aprovados.
- A tentativa 1 do mesmo run, job `115557829125`, falhou antes do checkout/testes por `toomanyrequests: Data limit exceeded` nas três tentativas de baixar `postgres:17`; a reexecução limitada do job foi autorizada por essa causa primária de infraestrutura.
- Merge real: `a44e0d2b48a52b15f91e73573006df624778a22f`; pais ordenados [`4e624c66a99bfd24e6f27b4cc82734203e0b3141`, `7b10b1595531a84f3a2e359d74358e0f581ecd36`]; árvore do merge e da `main`: `ee4429a1a38bee2eed32bc068d9b19a55748c7ed`.
- Pós-merge CI no SHA real: run `38473994135`, job `115559989818`, **SUCCESS**, mesmas contagens e todos os gates acima.
- Project Activity Watch pós-merge: run `38473994102`, job `115559996397`, **SUCCESS** no SHA real, marcador `ACTIVITY_WATCH_OBSERVED`, `ageMinutes=0`, `openPrs=0`, `activeRuns=1`.
- Escopo: 10 paths, todos modo `100644`; os cinco documentos preservam integralmente o prefixo anterior; nenhum input mobile/Android, dependência, lockfile, workflow, build ou smoke mudou. APK N/A por identidade comprovada da árvore, não por ausência de run.
- O PR #517 está merged e não deve ser repetido. Este apêndice corrige apenas a defasagem de recibo dos documentos; não altera produto.


## MOBILE_REPLACEMENT_UUID_CONTRACT_2026-10-14.md

- Projeto exclusivo `dbdanielbaracho/MLIVRETRABALHO`; não é documentação do Creator Commerce OS.
- Base `23ddd7a0c61cbdb5002eec9b85ca69ab8126ef97`; branch `fix/mobile-replacement-uuid-contract-20261014`.
- API replacement controller valida UUID antes do SQL; mobile antigo aceitava IDs textuais e podia despachar rotas impossíveis.
- Correção: guards UUID no parser e mutações, regressão e evidência; gates pendentes, não contar como aceite.


- **MOBILE_REPLACEMENT_UUID_CONTRACT gate correction:** CI `38503240745` falhou somente em quatro assertions da fixture textual `fixture-professional`; typecheck/build/export passaram. Fixture corrigida para UUID no novo HEAD; não tratar CI/APK anterior como PASS.


- **MOBILE_REPLACEMENT_UUID segundo ajuste:** CI `38503481351` confirmou quatro falhas de fixture textual em `secondary-read-deadline.test.mjs` após typecheck/build/export green; IDs de assignment/replacement agora são UUIDs canônicos no novo HEAD. Sem aprovação anterior reutilizada.


## MOBILE_CONVERSATION_UUID_CONTRACT_2026-10-14.md

- Escopo exclusivo `dbdanielbaracho/MLIVRETRABALHO`; não é documentação do Creator Commerce OS.
- Base `a52b3e7374ddbae3cd3c0556a4f53a18dd136239`; backend rejeita assignment IDs não UUID e o mobile antigo aceitava texto livre.
- Correção candidata: `routeId` exige UUID canônico; regressões de leitura/envio/deadline usam IDs válidos e casos inválidos não fazem transporte.
- CI/APK/merge/pós-gates do novo SHA ainda pendentes; não contar como aceite.


- **Correção de gate 2026-10-14:** o CI próprio `38507724368` passou typecheck, build e export, mas o teste mobile terminou com 24 falhas porque `routeId` também valida o `tenantId` selecionado na rota; as fixtures ainda usavam `tenant-a`, `tenant-b` e `fixture-tenant`. Esses valores foram alinhados a UUIDs canônicos no novo HEAD. A validação não foi relaxada e o APK anterior não autoriza merge.


## Apêndice — Recibo final PR #523 — 2026-10-14

- **Escopo exclusivo:** `dbdanielbaracho/MLIVRETRABALHO`; não pertence ao Creator Commerce OS.
- **Correção:** contrato UUID de `assignmentId` e `tenantId` nas conversas mobile, com fixtures canônicas nos testes de leitura/envio/deadline; payload, sessão, tenant/RLS, autorização, ACK, retry humano e notificações preservados.
- **Merge real:** PR #523 → `400b56861c41a656bbdbd6e6d79d56944c73519d`; pai ordenado `a52b3e7374ddbae3cd3c0556a4f53a18dd136239`; árvore `382ed386693865c3e5d32e60e0925f96cc288bbe); `main` confirmada nesse SHA.
- **CI próprio:** run `38513161396`, job `115686011380`, HEAD `8546f9dd418060486f41add0697e3604f3362dd1`, SUCCESS em todos os passos.
- **APK próprio:** run `38513161246`, job `115686010569`, mesmo HEAD, SUCCESS; instalação e `DEVICE_SMOKE_OK` sem Metro; artefato ZIP `11871155950`, 28.910.983 bytes, não expirado, digest `sha256:00afb8f4a140155de174dcc11faddf453118d848cb3ceb8dedcfe85eb79e22f2`.
- **Pós-merge CI:** run `38518567344`, job `115702805508`, SHA real `400b56861c41a656bbdbd6e6d79d56944c73519d`, SUCCESS em todos os passos.
- **Pós-merge APK:** run `38518567348`, job `115702805484`, SHA real, SUCCESS; instalação e `DEVICE_SMOKE_OK` sem Metro; artefato ZIP `11872998610`, 28.910.975 bytes, não expirado, digest `sha256:cbf616843698320de5d6295305694bf584ac20a454bcb904579c5a73ee9c391b`.
- **Activity Watch pós-merge:** run `38518567323`, job `115702805592`, SUCCESS.
- **Limites:** emulador/standalone não é aceite de dispositivo físico; este recibo não declara aceite integral das 13 áreas nem encerra os gates externos.



---

## Reconciliação factual do estado corrente — 2026-10-14

- **Escopo exclusivo:** `dbdanielbaracho/MLIVRETRABALHO`; este registro não pertence ao Creator Commerce OS.
- **Main verificada antes desta alteração:** `bf65dc52d0ab8f493b7265cb50e1722d53df4c4e`.
- **Estado de PRs:** nenhum PR aberto na consulta desta rodada. Isso não constitui aceite das 13 áreas.
- **Integrações recentes que a matriz histórica ainda não refletia:** #522 → `a52b3e7374ddbae3cd3c0556a4f53a18dd136239`; #523 → `400b56861c41a656bbdbd6e6d79d56944c73519d`; #524 (recibo documental) → `bf65dc52d0ab8f493b7265cb50e1722d53df4c4e`.
- **#523:** contrato UUID de `assignmentId` e `tenantId` nas conversas mobile; CI próprio run `38513161396` SUCCESS; APK próprio run `38513161246` SUCCESS com instalação e `DEVICE_SMOKE_OK` sem Metro; pós-CI run `38518567344` SUCCESS; pós-APK run `38518567348` SUCCESS no SHA real; Activity Watch pós-merge run `38518567323` SUCCESS.
- **#524:** recibo documental append-only nos cinco documentos originais e evidência mobile; CI próprio run `38524643905` SUCCESS; pós-CI run `38525021106` SUCCESS; Activity Watch run `38525020959` SUCCESS; APK não aplicável por identidade integral dos insumos mobile/native/dependências/build/smoke.
- **Auditoria desta rodada:** `apps/mobile/lib/bootstrap.ts` contém `bootstrapTenant`, mas a função não possui referências no conjunto de telas/componentes/libs auditado; não foi criada correção especulativa. As rotas móveis verificadas mantêm deadlines, AbortController e guardas de lifecycle/contexto já existentes.
- **Estado de aceite:** a matriz continua histórica e conservadora: as 13 áreas permanecem pendentes de reconciliação independente; emulador não é dispositivo físico e os gates externos #215/#219/#220/#224/#228 permanecem separados.


---

## Recibo append-only — PR #528 — 2026-10-14

- **Escopo:** somente MLIVRETRABALHO; esta atualização não pertence ao Creator Commerce OS.
- **Main corrente:** `fdef52f7fd61779c378294d0555e01b4db610e94`.
- **Pais ordenados do merge:** `99dda3d93a3375c20d6d208512f15e1e30a18d23`, `c821e7b1fdf9a3f7e594384237154091c6136885`.
- **Árvore do merge:** `73bfe5be8f54f988cf4e9d60334fb71a9c69547d`; a `main` foi revalidada nesse SHA.
- **PR:** #528, head final `c821e7b1fdf9a3f7e594384237154091c6136885`, corrigiu a perda de resultados do dashboard Web quando uma das 12 leituras independentes falhava, usando `Promise.allSettled`, fallback explícito e contagem de seções indisponíveis.
- **Falhas e correções de CI:** o primeiro run `38587399213` falhou em seis harnesses VM por `readSettledSection is not defined`; o segundo run `38592768248` revelou apenas expectativa antiga de `HTTP 500`. O harness foi injetado com os helpers e a asserção do dashboard foi alinhada ao novo contrato.
- **CI próprio final:** run `38593259613`, SUCCESS no head exato, incluindo typecheck, build, export Android, testes, migração, privacidade e HTTP/Production Truth.
- **Pós-merge:** CI run `38594046674`, SUCCESS no SHA real; Project Activity Watch run `38594046648`, SUCCESS no mesmo SHA.
- **Arquivos funcionais/evidência:** `apps/web/app/page.tsx`, `apps/web/app/independent-reads.ts`, `apps/web/app/independent-reads.test.ts`, `apps/web/app/web-read-context.test.ts` e `docs/evidencias/WEB_INDEPENDENT_DASHBOARD_READS_2026-10-14.md`.
- **APK:** N/A para o PR Web-only; inputs mobile/native/dependências/lock/build/smoke não foram alterados. Isso não é prova de teste físico.
- **Estado de aceite:** este recibo não declara aceite integral das 13 áreas; gates externos #215, #219, #220, #224 e #228 permanecem separados.


---

## Recibo append-only — PR #530 — 2026-10-14

- **Escopo:** somente MLIVRETRABALHO; esta atualização não pertence ao Creator Commerce OS.
- **Main corrente:** `6b736fda484aa7a72ffada15560bb32e6fe3db68`.
- **Pais ordenados do merge:** `fb19fd936011a6f412739814896b7ef13b4d2ca7`, `0de4ea4dc35efb7f802a25b5f874044bab54be70`.
- **Árvore do merge:** `1926803e965701f0fcc191666f4fb73df0e60fbc`.
- **PR:** #530, head final `0de4ea4dc35efb7f802a25b5f874044bab54be70`, preserva dados de candidatos quando recomendações falham, com `Promise.allSettled`, helpers independentes e mensagem explícita de falha parcial.
- **Falha de CI corrigida:** o primeiro CI `38603296094` falhou somente porque o harness esperava `HTTP 500`; o contrato atual para candidatos/recomendações é `2 consulta(s) de candidatos ou recomendações falharam`. O teste foi alinhado sem alterar o contrato de membros/substituições.
- **CI próprio:** run `38609828461`, SUCCESS no HEAD exato, com todos os gates aplicáveis.
- **Pós-merge:** CI run `38610522373`, SUCCESS no SHA real; Project Activity Watch run `38610522341`, SUCCESS.
- **APK:** N/A por mudança exclusivamente Web/teste/evidência e identidade dos inputs mobile/native/dependências/lock/build/smoke; isso não é prova de teste físico.
- **Estado de aceite:** não declara aceite integral das 13 áreas; os gates externos #215, #219, #220, #224 e #228 permanecem separados.


## APÊNDICE DE EXECUÇÃO — 2026-10-14 — datas impossíveis em respostas móveis

Escopo exclusivo: MLIVRETRABALHO. A auditoria reproduziu que o validador móvel de `apps/mobile/lib/professional-home.ts` aceitava `2026-02-30T12:00:00Z`, pois `new Date` o normalizava para `2026-03-02T12:00:00.000Z` com timestamp finito. Isso poderia apresentar uma agenda impossível como horário real.

Correção candidata na branch `fix/mobile-strict-response-dates-20261014`: validação explícita dos componentes ano/mês/dia ISO antes do timestamp. Regressões cobrem assignment em `startsAt`/ `endsAt` e janela de disponibilidade; datas legítimas, offsets, payloads, headers, tenant/RLS, endpoints, retry e escrita no servidor permanecem sem alteração. Evidência: `docs/evidencias/MOBILE_STRICT_RESPONSE_DATES_2026-10-14.md`.

Estado factual nesta entrada: reproduzido e codificado; CI/APK no SHA da branch ainda pendente. APK só será exigido se os insumos mobile/build/smoke mudarem, e emulador não será tratado como aparelho físico. Não é aceite integral das 13 áreas nem fechamento de gates externos. Não misturar este registro com Creator Commerce OS.


## APÊNDICE DE RECIBO FINAL — PR #532 — 2026-10-14

- **Correção:** o leitor móvel de agenda rejeita datas de calendário ISO impossíveis antes de usar `Date`; regressões cobrem assignments e disponibilidade. Escopo exclusivo MLIVRETRABALHO.
- **Merge real:** `c8fceda23f0f0a423efff2fcc47d80f93b564126`.
- **Pais ordenados:** `260a2b27b25cde8571eae2dcb93db373e7cd4f24`, `442442c7fcd77afb1cef0190d30b3cd5a2ea0892`.
- **Árvore da main:** `df233cd974eadb953271e0d76c9e8d63ce39c630`, confirmada no branch `main`.
- **CI próprio do HEAD:** run `38619287186`, job `116042294770`, SUCCESS em todos os passos, incluindo testes, HTTP/Postgres e Production Truth.
- **APK próprio do HEAD:** run `38619287198`, job `116042294382`, SUCCESS em build, KVM, instalação, smoke sem Metro e upload do APK. Isso é emulador/standalone, não aparelho físico.
- **Pós-merge real:** CI run `38626600072`, job `116067212891`, SUCCESS; APK run `38626599740`, job `116067209142`, SUCCESS; Activity Watch run `38626599724`, job `116067209613`, SUCCESS.
- **Revisão:** alteração restrita a mobile/teste/evidência/documentação; sem mudança de dependências, lockfile, API, payload, headers, tenant/RLS ou produção.
- **Estado de aceite:** este recibo não declara aceite integral das 13 áreas; gates externos #215, #219, #220, #224 e #228 permanecem separados. Não misturar com Creator Commerce OS.


## APÊNDICE DE EXECUÇÃO — 2026-10-14 — datas impossíveis no dashboard de empresa

Escopo exclusivo: MLIVRETRABALHO. Auditoria reproduziu que `apps/mobile/lib/company-dashboard.ts` aceitava `2026-02-30T12:00:00Z` em `startsAt` e `completedAt`: o JavaScript normalizava a entrada para 2 de março e o timestamp finito passava na validação. Isso poderia exibir um turno ou conclusão em uma data diferente da resposta da API.

Correção candidata na branch `fix/mobile-company-dashboard-strict-dates-20261014`: reutilizar validação explícita do calendário ISO antes de aceitar datas opcionais do dashboard. Regressões cobrem 30 de fevereiro e 29 de fevereiro em ano não bissexto nos registros ativos e concluídos; respostas legítimas, campos nulos, identidade, tenant/RLS, endpoints, payloads e escrita permanecem sem alteração.

Estado factual desta entrada: falha reproduzida e regressão/correção preparadas; CI, APK, revisão final, merge e pós-gates ainda pendentes. APK será exigido se os insumos mobile/build/smoke mudarem; emulador não é aparelho físico. Não é aceite integral das 13 áreas nem fechamento de gates externos. Não misturar com Creator Commerce OS.


## Recibo append-only — PR #535 — 2026-10-15

- **Escopo exclusivo:** `dbdanielbaracho/MLIVRETRABALHO`; esta atualização não pertence ao Creator Commerce OS.
- **Falha corrigida:** o dashboard móvel de empresa aceitava datas ISO impossíveis como `2026-02-30T12:00:00Z` e `2025-02-29T12:00:00Z` porque o JavaScript as normalizava antes da validação.
- **HEAD próprio aprovado:** `f51380249e5f3ebe475ae77652d57afc557bb0be`.
- **CI próprio:** run `38650627518`, job `116148229344`, SUCCESS em todos os passos aplicáveis.
- **APK próprio:** run `38650627423`, job `116148229644`, SUCCESS com build standalone, KVM, instalação e `DEVICE_SMOKE_OK` sem Metro.
- **Merge real:** `e24b0d307f89e84887b09fc2912cf2f9314c9b16`; pais ordenados [`112dc0dc619bb668838f36800628ef1b6eb8596c`, `f51380249e5f3ebe475ae77652d57afc557bb0be`]; árvore `3beabe4b2c6ecb946752b3de856477e3767a5c51`.
- **Pós-merge CI:** run `38656459350`, attempt 2, job `116167566974`, SUCCESS. A tentativa inicial falhou antes dos testes por `toomanyrequests: Data limit exceeded` ao baixar `postgres:17`; somente o job falho foi reexecutado.
- **Pós-merge APK:** run `38656459361`, job `116167288745`, SUCCESS com instalação e `DEVICE_SMOKE_OK` sem Metro.
- **Project Activity Watch:** run `38658218351`, job `116172955555`, SUCCESS no SHA real.
- **Revisão documental:** a correção preservou payload, headers, autorização, tenant/RLS, endpoints, lockfile e os demais inputs mobile/build; este recibo não declara aceite integral das 13 áreas. Emulador/standalone não é aparelho físico e os gates externos #215/#219/#220/#224/#228 permanecem separados.


## Agenda, ganhos, notificações e ACKs móveis — calendário real — 2026-10-15

Escopo: somente MLIVRETRABALHO. Base auditada `884f207f722145fd1e909f73fca96d6d16870859`, árvore `f5f4925ac692edefb3cb2c36fb385ca8b4d8b92e`. #537 já integrado; CI pós-merge 38666946872/job116200954332 e Activity Watch38666947017 SUCCESS. Suíte base:127Web/735mobile/392API/3CLI/11monitor, zero falhas; não repetir merge ou rerun #537.

Falha REPRODUZIDA em quatro módulos: `agenda.ts` (leitura startsAt/endsAt, ACK check-in/check-out/complete/company-rating), `earnings.ts` (createdAt), `notifications.ts` (createdAt/readAt em lista e ACK) e `company-dashboard-actions.ts` (rating.createdAt). Datas impossíveis como 30 de fevereiro e 31 de abril tinham timestamp finito após normalização e eram exibidas ou confirmadas.

Regressão comportamental: `apps/mobile/tests/response-calendar-contract.test.mjs` com12 testes novos, usando as funções reais e transporte simulado. Mesmo conjunto de56 testes: RED45PASS/11FAIL no source da main, GREEN56PASS/0FAIL após validação local dos componentes ISO antes do timestamp. Os44 testes anteriores nesses cinco arquivos permanecem sem qualquer alteração; o novo controle positivo cobre leap day e offsets que cruzam dia UTC, mantendo strings exatas. Falha em leitura retorna error; ACK inválido permanece unknown após uma única chamada, sem inferir cancelamento do servidor e sem retry automático.

Datas opcionais nulas, payload, headers, endpoints, IDs/tenant, sessão/contexto, score, coordenadas, mensagens e JSX permanecem intactos. Não há mudança API/SQL/lockfile/dependências. Mobile exige CI e APK próprios no novo HEAD e pós-gates reais; neste apêndice de preparação os gates são PENDENTES, não PASS. Evidência: `docs/evidencias/MOBILE_CALENDAR_ACK_AND_READ_CONTRACT_2026-10-15.md`.

Aceites específicos em avaliação: área3 agenda/presença/avaliação (6 timestamps), área4 avaliação empresarial (1 timestamp), área6 leitura de ganhos (1 timestamp), área9 notificações/ACK (3 timestamps). Isso fecha apenas a falha reproduzida após gates, sem declarar aceite integral de qualquer área. Outros leitores móveis de datas ainda precisam auditoria; tela/estado real em emulador e inventário requisito↔teste continuam pendentes. Preferências/ajuda sem vínculo/previsão/integrações continuam dependentes de contrato/dados. Gates externos215/219/220/224/228 permanecem separados; sem produção, custos ou dinheiro real.


## Ganhos — fallback textual de status desconhecido — 2026-10-15

Correção independente sobre candidato #538 (`b2b25a5e21dae06cf322ec726bc0fe444e625100`); predecessor ainda depende dos próprios gates CI/APK e não está antecipadamente aprovado. Escopo exclusivo MLIVRETRABALHO.

Falha reproduzida no fluxo real `loadEarnings` → `earningStatus`: o leitor aceita status futuro string, mas a consulta de propriedades herdadas do mapa devolvia Object.prototype para "__proto__" e funções para "constructor"/"toString", contrariando o fallback textual já existente "Status não identificado". Não é alegação de poluição do protótipo, invasão ou crash observado no Android.

Três regressões comportamentais em `apps/mobile/tests/earnings.test.mjs`: RED5PASS/3FAIL na suíte de ganhos antes; GREEN8/8 após guarda `Object.prototype.hasOwnProperty.call`. Suíte mobile completa local750/750 (inclui747 do predecessor); os5 testes antigos de ganhos e asserções permanecem. Rótulos conhecidos, estados financeiros, cálculo semanal, dados, transporte, tenant/RLS, sessão e JSX não mudam.

Evidência `docs/evidencias/MOBILE_EARNING_STATUS_PROTOTYPE_FALLBACK_2026-10-15.md`. CI/APK próprios do novo SHA e pós-gates reais são PENDENTES neste snapshot de preparação. Integrar apenas após predecessor #538, reconsulta main/base/head/mergeable e equivalência de árvore/revisão se retarget. Não declarar aceite integral da área6 nem das13 áreas; físico/pentest/provider/PSP/Web pago permanecem externos.


## Aceite técnico interno — área10 Android standalone — 2026-10-15 UTC

**Base verificada:** `f0767618020c1efe20b8ce5d24ab10cb296c1f59`, árvore `a2775bbaa0794048364477a3ca5c39a8f4fcfb64`. Escopo exclusivo MLIVRETRABALHO. Este apêndice supersede somente o estado de aceite interno técnico da linha10 da matriz; todos os textos e snapshots anteriores permanecem históricos.

**Resultado da área10:** CONCLUÍDO INTERNO no escopo técnico já definido pela matriz: insumos native/build revalidados, APK release standalone e smoke no SHA aplicável. A linha10 exclui explicitamente Android físico, SecureStore nativo e piloto (#220). Jornadas completas de telas/estados continuam na área1 e nos fluxos3–9; não foram aceitas pelo simples lançamento do APK.

| Critério técnico | Prova observada |
|---|---|
| Build canônico release | `scripts/build-android-pilot.sh`: prebuild limpo, NODE_ENV production, assembleRelease, bundle embarcado obrigatório; steps reais SUCCESS nos próprios e pós-APKs538/539 |
| Proveniência própria | HEAD538 `b2b25a5e21dae06cf322ec726bc0fe444e625100` e HEAD539 `f8626256750129a557ef5c5bcf60eff1f311cde4`; checkouts sintéticos3f21a160.../06f8e34... têm pais/árvores equivalentes às candidatas; BUILD_INFO não foi apresentado como HEAD literal |
| Pós-merge real | #538 `e756d5ecf5af4c804e02b31ca8158fb49510a7d4` e #539 `f0767618020c1efe20b8ce5d24ab10cb296c1f59`; BUILD_INFO dos ZIPs baixados contém os SHAs reais respectivos |
| Emulador | Android35/x86_64/pixel6, KVM, instalação Success, PID/atividade presentes e ausência dos padrões fatais do gate; DEVICE_SMOKE_OK metro_required=false nos logs primários de ambos pós-merges |
| Artefato final539 | ZIP11945526772,28.911.942bytes, digestSHA256422c1a965e94fec5b5fb4d960e3ee9a303be25856e0374cfb56bfca977c76d49, não expirado (2026-10-29T03:10:50Z) |
| Integridade individual | APK66.161.516bytes, SHA25663eaf7f141b62226fc839dbd6322344c0974f3ffc0641b315b6e0cda7c72cc84 confereSHA256SUMS; CRC ZIP/APK válidos; assets/index.android.bundle presente |
| CI e gates pós539 | CI38673970850/job116223244281 SUCCESS127Web/750mobile/392API/3CLI/11monitor,0falhas,todossteps; APK38673970923/job116223244739 SUCCESS; ActivityWatch38673970938/job116223245485 SUCCESS |

**Correções funcionais aceitas pelos gates:** #538 rejeita calendário impossível em leituras de agenda/ganhos/notificações e ACKs de presença/avaliação/leitura; RED45PASS/11FAIL→GREEN56/56 focal,747mobile completos. #539 garante fallback textual para status futuro que coincide com propriedade herdada; RED5PASS/3FAIL→GREEN8/8 ganhos,750mobile completos.15 regressões novas totais; testes antigos preservados. As áreas3/4/6/9 receberam essas correções, mas não são declaradas integralmente aceitas.

**Situação das13 áreas:** área10 com aceite interno técnico acima;1/2/3/4/5/6/7/8/9/11/12/13 continuam sem aceite integral. Área1: checagem estática de27 rotas e41 referências literais sem destinos inexistentes, incluindo8 destinos das barras canônicas; isso não prova taps/render/teclado/estados. Prosseguir confrontando requisitos, código e provas de cada área. Preferências/ajuda sem vínculo/previsão/integrações sem contrato/dados não autorizam política inventada.

**Recibos finais:** evidência `docs/evidencias/ANDROID_STANDALONE_INTERNAL_ACCEPTANCE_2026-10-15.md` e corposPR538/539 registram HEADs/pais/tree/runs/jobs/instalação/smoke e digests separados. O snapshot candidato "PENDENTE" preservado nos documentos não é estado final. React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/desenho preservados; sem produção, novos serviços, custos, dinheiro real ou PSP. Gates externos215/219/220/224/228 continuam OPEN; não há conclusão integral do projeto.


## Conciliação simulada — totais acima de int32 — 2026-10-15

Escopo exclusivo: MLIVRETRABALHO. Base auditada `4fad0b6e801b693b7346762a533e28cbebc03b41`, árvore `a5b4c3246a86de664da10f4965f8af181791e594`. #538/#539/#540 já integrados; #540 pós-CI38675578570/job116228294880 SUCCESS no merge real4fad...,127Web/750mobile/392API/3CLI/11monitor, todos passos/HTTPPostgres/ProductionTruth; ActivityWatch38675578567/job116228295404 SUCCESS com marker03:18:37.6982779Z. Não repetir esses merges.

PR #541 investiga/corrige a soma na leitura `GET /v1/company/payment-events/reconciliation`. Cada evento assinado já admite0..2147483647centavos, mas as três somas eram estreitadas por SQL `::int`. Reprodução primária no HEAD de teste1986f2fdb3efd0d8c7b5d9dd90ccd4d53279578b: CI38678006539/job116235903387 passou todos1283testes anteriores, typecheck/build/export/migrations/privacy e falhou no novo cenário HTTP. Logs03:50:10.5523177Z mostram curlHTTP500; Nest03:50:11.0790323Z e PostgreSQL03:50:10.550UTC registram `integer out of range`. Eventos assinados válidos e replays foram aceitos antes da leitura; a falha é o cast da soma, não validação de evento individual nem indisponibilidade de infraestrutura.

Correção: somente as três projeções SQL de soma passam para texto decimal exato e são convertidas explicitamente em inteiros JSON seguros. Valores inválidos ou acima de Number.MAX_SAFE_INTEGER geram erro, nunca arredondamento ou zero fabricado. Sem alterar valor individual permitido, eventos imutáveis, assinatura/idempotência, destinatário, filtros tenant/RLS, owner/admin, classificação SQL ou endpoint de listagem. Não mudar política de fees/split/refund/chargeback/saldo negativo: depende de FIN-RISK/provider real.

O E2E HTTP/PostgreSQL existente recebe seis eventos assinados válidos (dois por captured/refunded/payout_paid), replay factual de cada ACK e leitura das somas4294992294/4294967294/4294992294 como números exatos, payable25000/statusoverpaid e ausência em outro tenant. Nenhum gate anterior foi retirado. O novo trecho só admite URL HTTP local; executado apenas na base efêmera de CI. Oito testes unitários exercem handler real com mocks explícitos, limites0/MAX_SAFE_INTEGER/overflow/malformed, permissões e falha DB; local8/8 após transformação TypeScript/decorators para fixtures, sem alegar PostgreSQL local ou Nest/render real.

Evidência: `docs/evidencias/FINANCE_RECONCILIATION_WIDE_TOTALS_2026-10-15.md`. Próprios gates no novo HEAD e pós-merge ainda PENDENTES neste snapshot de preparação. APK N/A somente após revisão por identidade completa de mobile/native/deps/lock/workflow/build/smoke, não por ausência de run. Recibo final será registrado no corpoPR sem commit autorreferente extra.

Área6 recebe correção aritmética; áreas7/11 recebem regressões de isolamento/contrato. Não é aceite integral dessas áreas ou das13. Área10 mantém aceite técnico standalone; outras12 sem aceite integral. Externos215/219/220/224/228 permanecem OPEN separados, sem produção/custos/PSP/dinheiroreal/contratos/serviços novos. Próximo: validar CI/HTTP real, revisar bytes/modes/árvores e integrar sógreen, depois continuar matriz com lacuna factual independente.


## Formatação monetária mobile — preservar centavos inteiros — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Candidato baseado no HEAD541 `37220bcebe56266e39d9f05cabaf8f06c71aeda7`/tree`cdaec278156ac72f34b2857db6c8b60a55b2a67d`; #541 ainda depende de CI/merge/pós-gates, sem aprovação antecipada. Nenhum merge anterior repetido.

Falha reproduzida em `apps/mobile/lib/company-readonly.ts`, fluxo real loadReconciliation→moneyOrMissing:9007199254740990centavos (Number.isSafeInteger=true) eram exibidos como `R$ 90071992547409,91` em vez de `R$ 90071992547409,90`. A divisão por100 arredondava antes do toFixed. Não é alegação de débito/pagamento real ou bug render observado no aparelho.

Três regressões novas, oito testes antigos intactos: RED8PASS/3FAIL→GREEN11/11 local. Cobrem limites positivos/negativos, zero/centavos comuns, valor acima de int32 e caminho leitor→rótulo sem escrita. Formatter agora separa os dígitos decimais do inteiro seguro, sem divisão, BigInt ou dependência nova; ausência e fallback anterior para valores fora desse contrato preservados. Suíte mobile completa local753/753PASS, zero falhas. Testes de sinais não autorizam evento financeiro negativo: política individual/DB permanece sem alteração.

Helpers de GET/parsers/dados/status/tenant/contexto, JSX e rotas preservados. API541 herdada não é reimplementada nesta fatia. Evidência `docs/evidencias/MOBILE_MONEY_EXACT_CENTS_2026-10-15.md`. CI e APK próprios do novo HEAD são OBRIGATÓRIOS e PENDENTES, depois revisão/retarget main após541 e pós-CI/APK no merge real. Emulador não é físico; ownPRcheckout pode ser sintético e deve ter pais/árvore comprovados.

Área6 recebe correção de apresentação, sem aceite integral. Área10 conserva aceite técnico no SHA válido anterior e exige novos gates por mudança mobile; demais12áreas seguem pendentes. Documento ORIGINALv1.104/memória/checkpoint/ledger/registry/matriz preservados por apêndice; sem custos/produção/serviços/credenciais/PSP/dinheiroreal/contratos. Externos215/219/220/224/228 permanecem OPEN. Próxima tarefa independente só após confronto de código/requisitos e nova reprodução; não repetir541 ou esta correção sem nova falha.


## Integridade da relação alocação→vaga por tenant — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Base `63340145d7688ac08f161be8db418d789e81ec89`/tree`352d22aa107cf80a2f0bbd2c88c066227a1e38d3`; ADR-MT-001 exige isolamento no banco, além da autorização da aplicação. Não misturar com Creator Commerce OS.

Reprodução PostgreSQL real no HEADde teste`809373ac6b85b5242901ea6fd4b19d72745f3107`, CI38679947286/job116241971096: todos1294testes anteriores passaram; a nova barreira falhou às04:11:17.6028276Z com `FAIL: tenant T1 assignment referenced a job owned by T2`. O fixture usa SET LOCAL ROLEapp_runtime/contextoT1, prova que a vagaT2 não é visível e que a alocação da vagaT1 é permitida; depois o INSERT de uma alocaçãoT1 referindo vagaT2 era aceito. Tentativas de alocação são revertidas por ROLLBACK. Erros esperados de outros testes negativos no log não são a causa desta falha. Isto é uma lacuna de integridade relacional sob contexto runtime confiável, não demonstração de exploração HTTP ou vazamento observado.

Correção candidata: migration`0064_assignment_job_tenant_integrity.sql` adiciona índice único(company_jobs.id,tenant_id) e FK(work_assignments.job_id,tenant_id)→company_jobs(id,tenant_id), preservando FK/cascade anterior, RLS, grants, APIs, parâmetros e escopo NETWORK_SHARED dos perfis profissionais. VALIDATE CONSTRAINT verifica histórico sem apagar linhas ou adivinhar outro tenant; inconsistência histórica deve falhar/rollback, não ser reescrita silenciosamente. Nenhuma migration foi aplicada em produção.

Regressão existente `scripts/network-shared-write-boundary-e2e.sh` conserva controles anteriores e agora exige rejeição da referência cruzada em INSERT e UPDATE, identificada pelo nome da FK, com controle positivo de INSERT próprio e RLS de leitura. Bash-n local aprovado; PostgreSQL real/runner de migrações e todos os demais gates no novoHEAD são PENDENTES neste snapshot. Não inventar aumento na contagem unitária: são novas asserções SQL no E2E existente.

Recibos anteriores consolidados no ciclo funcional: #541 merge297efdc9029ca3135006c791614bafbeeb410518/head37220bcebe56266e39d9f05cabaf8f06c71aeda7/treecdaec278156ac72f34b2857db6c8b60a55b2a67d; pais[4fad0b6e801b693b7346762a533e28cbebc03b41,37220bcebe56266e39d9f05cabaf8f06c71aeda7]. OwnCI38678396680/job116237124536 e postCI38678764136/job116238268031 SUCCESS1291testes/todossteps/HTTPPostgres/ProductionTruth; Watch38678764183/job116238268368 SUCCESS. APK541N/A por identidade completa dos insumos protegidos.

#542 já MERGED em63340145d7688ac08f161be8db418d789e81ec89; pais[297efdc9029ca3135006c791614bafbeeb410518,6d06b65705d448e9e54bacd11681b0e0b99314ff]/tree352d22aa107cf80a2f0bbd2c88c066227a1e38d3. OwnCI38678616863/job116237812088 SUCCESS127Web/753mobile/400API/3CLI/11monitor; ownAPK38678616850/job116237812101 SUCCESS install04:06:11.7586645Z/smoke04:06:24.2239088Zmetrofalse; ZIP11947563625/digestacacb7944ad2914f2dfe0317549773d51e22352b97f2c8095b9b728da3cbfff4, APKindividualbc93c6284d11e3fc8c800f073702f94c63abd7177f5ddfdf87af63488bda3d6b/66161656bytes, CRC/SHA256SUMS/bundle verificados. BUILD_INFO ownb00917a4fae62c055bdc1263d9d5f70117c157d3 é SINTÉTICO, pais[541head,542head]/árvoreigual. PostCI38679821878/job116241573803 SUCCESS1294/todossteps/HTTPPostgres/ProductionTruth; Watch38679821865/job116241574162 SUCCESS. PostAPK38679821867 ainda EM EXECUÇÃO neste registro, não PASS; não repetirmerge/rerun542.

Evidência `docs/evidencias/ASSIGNMENT_JOB_TENANT_INTEGRITY_2026-10-15.md`. APK543N/A somente após prova de identidade de todos inputsmobile/native/deps/lock/workflows/build/smoke em relação àbase633..., sem emprestarAPK ou usar[]. Revisar bytes/modes/pais/tree e CIpróprio/pósreal antes de aceite. Área7 recebe correção específica; não encerra área7/11 nem outras12áreas sem aceite integral. Área10 técnica permanece separada. Próximo: auditar relações filhas tenant-owned (ledger/eventos/conversas/safety/suporte) por reprodução, sem ampliar constraints por hipótese. Externos215/219/220/224/228 ficam OPEN; sem custos/produção/dinheiroreal/PSP/novosserviços/credenciais/contratos.



## Integridade financeira: tenant do ledger/evento e da contratação — 2026-10-15

Escopo exclusivo MLIVRETRABALHO; base auditada `a6d213e84cb5313d5f1498d8d2646f0bcbb1945c`/tree`c5d4092e248ff7ac8eb9b0f83f7f9ce9110a6a80`. README/DVT ORIGINAL v1.104/memória/checkpoint/ledger/registry/matriz recuperados completos; nenhum arquivo substituído por resumo. ADR-MT-001 exige isolamento no banco além dos filtros de aplicação. As66 migrations da base foram consultadas: FKs simples de earnings_ledger e payment_events não vinculavam tenant_id ao assignment. Webhook e conclusão de trabalho já filtram a contratação pelo contexto; não se alega bypass HTTP ou vazamento observado.

**RED primário real:** PR545, HEAD `0d9bac603e8de58587c439f11cc5f0ee874a722c`, CI38683097976/job116251804687. Todos1294testes anteriores passaram. PostgreSQL/app_runtime/SET LOCAL tenantT1 comprovou contrataçãoT2 invisível e escritas próprias válidas; às2026-10-15T04:47:15.2927723Z/04:47:15.2931324Z/04:47:15.2934814Z aceitou ledger INSERT/UPDATE e payment_event INSERT ligados à contrataçãoT2; erro final `financial_assignment_tenant_integrity: 3 cross-tenant writes accepted`. As exceções esperadas dos testes antigos no log não são esta falha. Cada tentativa negativa reverte sua escrita por subtransação e o bloco completo é ROLLBACK; somente fixtures sintéticas da base efêmera de CI.

**Correção:** migration0065 cria índice único work_assignments(id,tenant_id) e duas FKs compostas (assignment_id,tenant_id), preservando FKs/cascade anteriores, RLS, grants, APIs, payload/ACK, assinatura/idempotência/provider e limites financeiros. VALIDATE verifica as linhas históricas dentro da mesma transação; inconsistência faz falhar/rollback, sem apagar linhas, adivinhar outro tenant ou reparentar. Nenhuma migration/limpeza foi executada em produção.

**Regressão:** o E2E existente conserva todos os controles e exige rejeição por nome específico da FK nas3operações cruzadas; controles positivos cobrem INSERT próprio, UPDATE permitido do ledger, ausência de UPDATE/DELETE de eventos e DELETE de ledger, além de cascade administrativo com rollback. Não há aumento fictício da contagem unitária. Bash-n local PASS; PostgreSQL real próprio do novoSHA, todossteps e pós-CI no merge real ainda PENDENTES neste snapshot de preparação. APK N/A somente após prova de identidade integral mobile/native/deps/lock/workflows/build/smoke; não por[]/artefato emprestado.

**Recibos anteriores agora finais:** #542 merge63340145d7688ac08f161be8db418d789e81ec89/head6d06b65705d448e9e54bacd11681b0e0b99314ff; pósCI38679821878/job116241573803 SUCCESS1294/todossteps/HTTPPostgres/ProductionTruth. PósAPK38679821867/job116241573730 SUCCESS install04:16:40.9654876Z/smoke04:16:53.2820749Z semMetro, BUILD_INFO literal633...; ZIP11948030450 digest1a14060f64cb6e9219c04e0a599dce08a7be4bfadde5d804ed89f65d95f1468f, APK52b5e5361d88df31f30aca27aa06510886536c140dbc267b2181e60d2d3cf491, CRC/SHA256SUMS/bundle/proveniência verificados no ciclo anterior. #543 mergea6d213e84cb5313d5f1498d8d2646f0bcbb1945c pais[63340145d7688ac08f161be8db418d789e81ec89,6e782720e07816145760f6ee41154a511435562c] treec5d4092e248ff7ac8eb9b0f83f7f9ce9110a6a80, ownCI38680244978 attempt2/job116243134146 e pósCI38680806670/job116244684503 SUCCESS1294/todossteps/SQL/HTTPPGProductionTruth; primeira tentativa própria falhou antes de checkout por quota ECR. Checkout próprio53e8a72... é sintético/pais e árvore comprovados, nãoHEAD literal. Não repetir merges/reruns542/543.

Monitor schedule38682891207/job116251164219 SUCCESS: log04:42:48.5560058Z no SHAa6d213... age23/openPrs0/activeRuns0, criou alerta544; não fechar manualmente nem criar commit artificial. Alerta de ausência de commit não prova agente parado.

Evidência `docs/evidencias/FINANCIAL_ASSIGNMENT_TENANT_INTEGRITY_2026-10-15.md`. Áreas6/7 recebem correção específica, não aceite integral; área10 mantém aceite técnico Androidstandalone e outras12 permanecem sem aceite integral. Externos215/219/220/224/228 OPEN separados, sem custos/produção/PSP/dinheiroreal/provisionamento/contratos/credenciais. Referência visual/desenho, React19.1.4/RN0.81.6 e frozenlock preservados. Próximo: validar novoCI, revisar bytes/modes/ancestrais/tree/main, merge sógreen, verificar pósreal; continuar auditoria das relações safety/support/conversation apenas mediante nova reprodução e contrato, sem alterar SET NULL/cascade por hipótese.



## Conversa privada: integridade das duas relações por tenant — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Base`d1ad006f4412d13c7e1b19c4769e9656f3d2526f`/tree`7e785a968b9cf6c422cfe86ed7822f2ddd5a99c5`; README/DVT ORIGINALv1.104/memória/checkpoint/ledger/registry/matriz recuperados completos e preservados.67migrations da base consultadas. ADR-MT-001 exige isolamento no banco; conversa/mensagem são privados sobRLS, não projeção NETWORK_SHARED. API já exige identidade/membership, contratação/tenant e papel/dono; não se alega bypassHTTP ou vazamento observado.

**Inventário real:** o E2E consulta pg_constraint/pg_class/pg_attribute na base efêmera do CI, inclusive FKs adicionadas viaALTER. HEADde reprodução`2c8edecdedabacfc7abf45b8a8306db0e21d307a`, run38688317631/job116268189944 registrou95FKs de tabelas-filhas no schemapublic, definições/colunas/pais/validated/RLS/FORCE. Arquivo`docs/evidencias/POSTGRES_FK_CATALOG_BASE_d1ad006_2026-10-15.json` contém a medição completa, não inventário por regex. Os flags não substituem classificação de escopo ou testes comportamentais;95FKs não significam95invariantes tenant nem aceite da área7.

**RED real:** todos1294testes anteriores PASS, inclusive regressões543/545. Às2026-10-15T05:45:35.1313962Z..05:45:35.1322982Z foram aceitos INSERT/UPDATE de conversationsT1→assignmentT2 e conversation_messagesT1→conversationT2. Errofinal`conversation_tenant_integrity: 4 cross-tenant writes accepted`. SET LOCAL ROLEapp_runtime/contextoT1 prova que paisT2 são invisíveis e escritasT1 válidas; cada probe aceito reverte por subtransação e bloco completoROLLBACK. Não confundir erros esperados de outros testes negativos com esta falha.

**Correção candidata0066:** índice único conversations(id,tenant_id), FK(conversations.assignment_id,tenant_id)→work_assignments(id,tenant_id) e FK(messages.conversation_id,tenant_id)→conversations(id,tenant_id), mantendo FKs/cascade anteriores. assignment_idNULL continua permitido por contrato existente; não abre nova rota de conversa sem vínculo. VALIDATE no mesmoBEGIN/COMMIT deve falhar/rollback se histórico inconsistente, sem deletar/reparent/guess. Nenhuma operação de produção foi disparada viaferramentas; CIlocal não é produção implantada.

**Regressão preservada do RED:** quatro negativas exigem nomes específicos dasFKs; controles positivos de conversa/mensagemT1, UPDATE próprio, NULLassignment e cascade administrativo. Nenhum teste antigo removido, nenhuma contagem unitária inflada. Bash-n localPASS; PostgreSQL próprio/CIcompleto no novoHEAD e pós-CImergeREAL são PENDENTES neste snapshot. Preservar a prova HTTP concorrente já existente: doisACKs/umaconversa/duasmensagens/duasnotificações. API/JSX/payload/auth/roles/ACK/idempotência/notificações não alterados. APK N/A apenas mediante identidade integral mobile/native/deps/lock/workflows/build/smoke, nunca[] ou artefato emprestado.

**Recibo545 agora final:** headf19fe309e378906bc5e21389b1a74fc92b87bc23; merged1ad006f4412d13c7e1b19c4769e9656f3d2526f, pais[a6d213e84cb5313d5f1498d8d2646f0bcbb1945c,f19fe309e378906bc5e21389b1a74fc92b87bc23], tree7e785a968b9cf6c422cfe86ed7822f2ddd5a99c5. OwnCI38683404936/job116252751221 SUCCESS1294/todos18steps/SQL/HTTPPGProductionTruth; checkout1a076b7501c35ab38d2486caf3929c542a491585 SINTÉTICO pais/treecomprovados, nãoheadliteral. PostCI38683723297 attempt2/job116253959220 SUCCESSmesmascontagens/todosgates/checkoutliteralmerge; attempt1/job116253733136 falhouANTEScheckout porquotaECR e teveumaúnicarepetição dejobfalho. APK545N/A por identidade integral dos insumos protegidos. Watch38683723416/job116253734187 SUCCESSmarker04:52:14.3075276Z e botcomentou/fechou544em04:52:15Z; nãofecharalertasmanualmente. Não repetir545 nem542/543.

Evidência`docs/evidencias/CONVERSATION_TENANT_CHAIN_INTEGRITY_2026-10-15.md`. Área7/8/9/11 recebem proteção específica, não aceite integral. Somente área10 tem aceite técnico standalone; outras12 seguem semaceiteintegral. Preservar React19.1.4/RN0.81.6/frozenlock/desenhocanônico/tenantRLS. Externos215/219/220/224/228 ficamOPENseparados, sem custos/credenciais/serviços/PSP/dinheiroreal/contratos/produção. Próximo: própriosgates/revisãobytesmodesárvore/mergeúnicogreen/pósreal, depois usar catálogo para cruzar contratos e reproduzir outras famílias; NULL/SETNULL/RESTRICT/CASCADE e NETWORK_SHARED não autorizam constraints indiscriminadas. SnapshotsPENDENTES anteriores são históricos; recibo final no corpoPR e próximo ciclofuncional, semcommitmetadadosautorreferente.



## Avaliações bidirecionais: contratação no mesmo tenant — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Base `61c85733f2163160305364a7c1ff0eaaace9faf5`/tree`43a0172f7a7d7bcb144ce2a17d3914d6667937a0`; README, Documento da Verdade ORIGINALv1.104, memória, checkpoint, ledger, registry e matriz recuperados integralmente sem substituir história. Todas68migrations atuais confrontadas: somente0008/0028/0029 definem/alteram a família ratings. ADR-MT-001 exige isolamento no banco;0029 declara ratings/comentários individuais TENANT e reputação agregada NETWORK_SHARED. Professional/identity continuam globais.

**RED real:** PR547 head`2581740c787358275479703aae04437165c6f552`, CI38694460685/job116287667854 attempt1. Os1294testes anteriores PASS[127Web,753mobile,400API,3CLI,11monitor]; log2026-10-15T06:48:58.2084506Z..06:48:58.2092923Z aceitou INSERT/UPDATE work_ratingsT1→assignmentT2 e INSERT/UPDATE company_work_ratingsT1→assignmentT2, erro06:48:58.2096813Z `rating_assignment_tenant_integrity: 4 cross-tenant writes accepted`. app_runtime/SETLOCALtenantT1, pai/ratingsT2 invisíveis; própriosINSERTs/UPSERTs mantiveram IDs/notas/comentários e agregadosT1/T2 corretos. Outro rater no controleT2 evita falsoRED por UNIQUE global. Probes aceitos revertidos por subtransações, fixtures sintéticas em banco efêmero; nenhuma operação de produção foi invocada. Isso NÃO comprova exploitHTTP/vazamento: rotas já validam sessão/membership/papel/assignmentcompleted/tenant e identidade profissional.

**Correção0067:** duasFKs(assignment_id,tenant_id)→work_assignments(id,tenant_id), reutilizando unique0065, ONDELETECASCADE igual àsFKs anteriores, que permanecem. NOTVALID+VALIDATE no mesmoBEGIN/COMMIT falha/rollback em história inconsistente, sem apagar/reparent/guess. RLS/grants/imutabilidade, score1–5, comentários, unique(assignment,rater), identidades/profissionaisglobais, trigger/reputação compartilhada, API/autoridade/payload/headers/ACK/idempotência/UI ficam intactos. Não é migração em produção.

**Regressão:** o MESMO script doRED exige quatro rejeições por nomes específicos dasFKs, INSERTs/UPSERTs próprios sem duplicarID, invisibilidade de avaliaçõesT2, grantsDELETE distintos, reputaçãoagregadaT1/T2 e cascade administrativo preservandoT2. Nenhuma asserção anterior foi removida; unitcount não é inflada por probesSQL. CatálogoREALbase97FKs idêntico ao pós546; medir99com2novas validadas e97definiçõesanteriores intactas nos próximosgates, sem presumirPASS. JornadaHTTPexistente de avaliações/reputação deve passar completa.

**Snapshot de preparação:** bash-n localPASS; CIpróprio/SQL/cascade/HTTPPostgres/ProductionTruth no novoHEAD e pós-CImergeREAL PENDENTES, não PASS. Revisão remota de bytes/modes/árvore/ancestrais/main exigida antes de mergeúnico expectedHEAD. APK N/A SOMENTE se TODOSmobile/native/deps/lock/workflows/build/smoke permanecerem idênticos; []/APKemprestado não prova.

**Recibo546 FINAL consolidado:** heade986a10604ecf8477de80780336786c97de12800; merge61c85733f2163160305364a7c1ff0eaaace9faf5; pais ordenados[d1ad006f4412d13c7e1b19c4769e9656f3d2526f,e986a10604ecf8477de80780336786c97de12800]; tree43a0172f7a7d7bcb144ce2a17d3914d6667937a0. OwnCI38688659500/job116269248417 attempt1 SUCCESS1294/todos18steps/SQL/HTTPPostgres/ProductionTruth; checkout048cf7e03227e3b5193dfa77671e9f5984840351 SINTÉTICO com pais/tree equivalentes, não HEAD literal. PostCI38689088578/job116270598795 attempt1 SUCCESS no merge REAL, checkoutliteral05:52:07.7342046Z, SQL05:54:01.9480894Z e HTTPconcorrência05:54:29.5040092Z/ProductionTruth05:55:35.4415616Z. Catálogos próprios/pós97FKs idênticos,95anteriores intactas+2chat novasvalidadas. Watch38689088548/job116270598954 SUCCESSpush/marker05:51:53.2409129Z/age0/openPrs0/activeRuns1. Dezpaths/bytes/modes/docs-prefix e476blobsnão-docsforaScript intactos verificados. APK546N/A identidade integral mobile/native/deps/lock/workflows/build/smoke. Semreruns. Não repetir546. SnapshotsPENDENTES históricos eram preparação, não estado final.

Evidência `docs/evidencias/RATING_ASSIGNMENT_TENANT_INTEGRITY_2026-10-15.md`. Área3/4/7/8/11 recebe correção específica, não aceite integral. Sóárea10tem aceite TÉCNICO standalone; outras12 pendentes. React19.1.4/RN0.81.6/frozenlock/desenhocanônico preservados. Externos215/219/220/224/228 OPEN separados, sem custos/produção/credenciais/serviços/contratos/PSP/dinheiroreal. Auditoria independente safety0030/0033 indica3relações candidatas comruntimeINSERTsomente, UPDATE/DELETErevogados; ainda SEM reprodução nesta rodada, não imporDDL nem relaxargrants. safety/supportassignmentSETNULL são família distinta, preservartenantNOTNULL e contratoNULL; metadados não são comportamento nem aceiteárea7.



## Cadeia imutável de segurança: eventos e recursos no tenant do pai — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Base`a621e8aa4e52e7947e14739170ceaeebc9a22fba`/tree`c84f5c293cc3056530bf879def40e366f4068c1b`; README/DVT ORIGINALv1.104/memória/checkpoint/ledger/registry/matriz relidos em referência imutável, prefixos integrais preservados. Todas69migrations conhecidas confrontadas; relações candidatas definidas0030/0033, casos0019/0021. Eventos, recursos e eventos de recurso são TENANT privados com SELECT/INSERT e UPDATE/DELETErevogados; não são projeções compartilhadas. API valida membership/papel/dono e caso/recurso dentro do tenant, incluindo FORUPDATE/advisorylock jáexistentes; nenhuma dessas autoridades mudou.

**RED REAL:** PR548 head`0a4c5bd60554a871d28b58c61d27e87ed8275f77`, CI38695248425/job116290183873 attempt1. Os1294testes anteriores PASS[127Web,753mobile,400API,3CLI,11monitor], incluindo quatro negativasrating547. Log2026-10-15T06:56:25.5857032Z..5860168Z aceitou3INSERTs: safety_case_eventsT1→caseT2, safety_case_appealsT1→caseT2 e safety_case_appeal_eventsT1→appealT2; erro06:56:25.5861690Z `safety_chain_tenant_integrity: 3 cross-tenant writes accepted`. app_runtime/SETLOCALtenantT1; paisT2invisíveis, própriosINSERTs e idempotênciaONCONFLICTdonothing válidos, grants imutáveis verificados sem relaxar permissões. AppellantT2 distinto impede falsoRED porunique global. Probes revertidos por subtransações; fixtures sintéticas em banco efêmero, não produção. Não é provaexploitHTTP/vazamento observado.

**Correção0068:** índices únicos(id,tenant_id) em safety_cases e safety_case_appeals; trêsFKs compostas de evento→caso, recurso→caso e evento→recurso. TodasFKs simples/cascades anteriores permanecem; identidades continuam globais. NOTVALID+VALIDATE no mesmoBEGIN/COMMIT falha/rollback em histórico inconsistente sem apagar/reparent/guess. Preserva RLS/grants/imutabilidade, transições/locks/ACK/idempotência, payload, API/auth/roles, notificações e UI. Não altera safety_cases.assignment_id ou support_cases.assignment_id (NULL/SETNULL são outra família, sem reprodução aqui). Nenhuma operação de produção foi invocada viaferramentas.

**Regressão:** o MESMO teste doRED exige3rejeições porFKsnomeadas; positivos incluem inserção de eventos/recursos próprios, replay de recurso sem duplicar/alterar motivo, paisprivadosinvisíveis, ausênciaUPDATE/DELETE e cascade administrativo das3relações preservandoT2. CasosNULLassignment são fixtures de contrato jáexistente, não nova política de ajuda. Bloco inteiroROLLBACK; nenhuma asserção antiga removida nem unitcount inflada. CatálogoREALbase99FKs idêntico ao próprio/pós547; próprios/pós devem medir102com99anteriores intactas+3novas validadas, não presumirPASS.

**Snapshot de preparação:** bash-n localPASS, sem PostgreSQL/adb local. NovoCIpróprio/SQL/cascade/HTTPsafety/appeals/ProductionTruth e pós-CImergeREAL PENDENTES. Reviewbytes/modes/diff/tree/ancestrais/main exigida antes de mergeúnicoexpectedHEAD. APK N/A só após identidadeINTEGRAL mobile/native/deps/lock/workflows/build/smoke; []/artefatoemprestado não prova.

**Recibo547 FINAL consolidado:** head1a699207e271f149d624bbdf6c0a4ea97aadf50a; mergea621e8aa4e52e7947e14739170ceaeebc9a22fba; paisordenados[61c85733f2163160305364a7c1ff0eaaace9faf5,1a699207e271f149d624bbdf6c0a4ea97aadf50a]; treec84f5c293cc3056530bf879def40e366f4068c1b. OwnCI38694847100/job116288900439 attempt1 SUCCESS1294/todos18steps/SQL/HTTPPostgres/ProductionTruth; checkout2355ff0830abd2ceb2218e8f0aa72244b52345d7 SINTÉTICO com pais/tree equivalentes, nãoHEADliteral. PostCI38695203452/job116290038848 attempt1 SUCCESS no mergeREAL; SQL06:56:52.0765923Z, ratingHTTP06:57:58.3436962Z, ProductionTruth06:58:18.7890814Z. Catálogos próprios/pós99FKs idênticos,97anteriores intactas+2ratingnovasvalidadas. Watch38695203467/job116290039333 SUCCESSpush/marker06:53:54.6235594Z/age0/openPrs0/activeRuns1. Review9paths/9UTF8/modes100755script/100644restante,5originais+matrizprefixosíntegros,477blobsnão-docsforaScript intactos; APK547N/A identidade integralinsumosprotegidos. Semreruns. Recibo completo no corpoPR547 verificado, não repetir547. SnapshotsPENDENTES anteriores são preparação histórica, não estadofinal.

Evidência `docs/evidencias/SAFETY_EVENT_APPEAL_TENANT_INTEGRITY_2026-10-15.md`. Proteção específica dasáreas7/8/11, não aceite integral. Sóárea10 tem aceite TÉCNICO Androidstandalone; outras12 pendentes. Após próprios/pós gates, oito paresmetadata candidatos ainda exigem contrato/reprodução: assignment_cancellations, direct_hire_conversions, job_interestslegado, marketplace_integrity_cases, replacement_requests, safety_cases/support_cases optionalassignmentSETNULL e trust_events. Não são8falhas comprovadas nem8áreas. Referênciasglobais/NETWORK_SHARED não recebemtenantartificial. FontesPG17 oficiais consultadas: FKs compostas/NOTVALID/VALIDATE/RLS; SETNULL permite lista decolunas, mas qualquer futura solução deve testar tenantNOTNULL e exclusão real. NãoexecutarDDLsemfalha.

React19.1.4/RN0.81.6/frozenlock/tenantRLS/desenhocanônico preservados; externos215/219/220/224/228 OPENseparados, semserviços/custos/credenciais/contratos/dinheiroreal/PSP/produção. Continuar demais áreas com contratos/evidências, sem confundir SQL/HTTPcomtaps/render/SecureStore/físico. Recibo final desta correção será registrado no corpoPR e próximo cicloFUNCIONAL, semcommitmetadadosautorreferente.



## Vínculos opcionais de relatos e confiança: tenant e retenção — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Base`e0fddd7dfde5515115281f106eebf06b9a8e38c6`/tree`9573fe05eed11e02cd1c8e198d643aafdee8f565`; README/DVT ORIGINALv1.104/memória/checkpoint/ledger/registry/matriz recuperados completos e preservados. Todas70migrations confrontadas;0016/0019/0021/0031/0060/0062 definemlinks/grants/retenção/idempotência;0065 forneceassignmentunique;0068 protege cadeia deeventos/recursos e não alteraesteslinks opcionais. ADR-MT-001 exige isolamento no banco, mantendo identities/profiles globais e NETWORK_SHARED distinto. APIs safety/support/trust jávalidamcontexto/assignment/profissional/papéis; NÃO se alega bypassHTTP/vazamento observado.

**RED REAL:** PR549 head`58ae0973d4800c9efbbe034430b376b94ca983b0`, CI38701428451/job116310291217 attempt1.1294testes anteriores PASS[127Web,753mobile,400API,3CLI,11monitor]; log2026-10-15T07:52:22.5602168Z..5616772Z aceitou safetyINSERT/UPDATE, supportINSERT/UPDATE e trustINSERTT1→assignmentT2; erro07:52:22.5631379Z `optional_assignment_tenant_integrity: 5 cross-tenant writes accepted`. app_runtime/SETLOCALtenantT1, paiT2invisível, próprioswrites/NULL/status/grantsválidos; trustUPDATE/DELETE permanecemrevogados, nenhumgrantfoirelaxado. Probes revertidos em subtransações e fixtures sintéticas em banco CIefêmero; nenhumaoperação deprodução invocada viaferramentas. CatálogoREALRED102FKs integralmente igualaopós548, não inventário lexical.

**Correção0069 candidata:** trêsFKscompostas(assignment_id,tenant_id)→work_assignments(id,tenant_id), mantendoFKssimples/grants/RLS/imutabilidade/IDs/authority/API/payload/ACK/políticasoriginais. Safety/support usamONDELETESETNULL(assignment_id) específico PG17; tenantNOTNULL jamaisécoluna a nulificar. TrustmantémCASCADE eassignmentNULL permitido. NOTVALID+VALIDATE no mesmoBEGIN/COMMIT falha/rollback sehistóriainconsistente, semapagar/reparent/guess. Nãoéimplantação/migração emprodução.

**Regressões:** o MESMO SQL doRED exige5FKrejectionsnomeadas, própriosINSERT/UPDATE/NULL/grants e exclusãoADMINreal da contratação; casos completos menosassignment_id, histórico/eventos/appeals e todascolunas daintentidentity support(request_key/hash incluídos) devemficar JSONidênticos; trustrelacionado devecascadear e trustNULL/T2devempermanecer. JornadaHTTPexistente é ampliada por uma NOVAfixtureisolada nofinal, semtrocarassertsantigos/manualNULLlegado: signup/contextos/role/profile existentes→nova disponibilidade/vaga/interesse/confirm→supportkeyed+revisão/safety+histórico/appeal+review/trust→DELETEexatoassignmentporSQLlocal→replayACKdeepEqual/GETcasosNULL/historyidêntico/trustcascade. SemPSP/dinheiroreal/políticadereenvio. ApenasAPIlocal explícita+DBlocalguardados; hostexternorecusadoantesderede. Nenhuma contagemunitáriaéinfladaporprobesSQL/HTTP.

**Preparação:** bash-nlocalPASS; próprioCI/SQL/HTTPPostgres/ProductionTruth no novoHEAD e pósCImergeREAL PENDENTES neste snapshot, nãoPASS. Reviewbytes/modes/diff/ancestrais/tree/main e própriosgates obrigatórios antesmergeúnicoexpectedHEAD. APK N/A sóseidentidadeINTEGRAL mobile/native/deps/lock/workflows/build/smoke; []/emprestado não prova. Catálogo deve registrar105FKs(102anteriores intactas+3validadasnovas), medir em próprios/póslogs sempresumirresultado.

**Recibo548 FINAL consolidado:** head5f232140a85b4c2f55de1609c94229181370e871; mergee0fddd7dfde5515115281f106eebf06b9a8e38c6; paisordenados[a621e8aa4e52e7947e14739170ceaeebc9a22fba,5f232140a85b4c2f55de1609c94229181370e871]; tree9573fe05eed11e02cd1c8e198d643aafdee8f565. OwnCI38695844166attempt3/job116293151860 SUCCESS1294/todos18steps/SQL/HTTPsafety+appeals/ProductionTruth, checkoutfc9ec0236f2102be7cc02c5d0ae4ec068c9ae3bb SINTÉTICO com pais/treeequivalentes, nãoHEADliteral. Attempts1/job116292108954 e2/job116292471644 falharamANTEScheckoutporECRquota,duasrepetiçõeslimitadasmesmoSHAresolveram; nãorepetir. PostCI38696705284/job116294841928attempt1 SUCCESSliteralmerge, checkout07:08:11.0964266Z/SQL07:10:13.7325255Z/HTTPappeals07:11:08.0111890Z/ProductionTruth07:11:47.4678133Z. Próprios/póscatálogos102iguais,99anterioresintactas+3novasvalidadas. Watch38696705400/job116294842653 SUCCESSpushmarker07:07:59.8278791Z/age0/openPrs0/activeRuns1. Review9paths/9UTF8/modes100755script/100644restante/5originais+matrizprefixo/478blobsnão-docsforaScriptintactos; APK548N/A identidade integralinputsprotegidos. RecibofinalcompletoPRbody548; snapshotsPENDENTES anteriorespreparaçãohistórica, nãoestadofinal.

Evidência `docs/evidencias/OPTIONAL_CASE_TRUST_ASSIGNMENT_TENANT_2026-10-15.md`. Proteção específicaáreas7/8/11, semaceiteintegral. Sóárea10temaceiteTÉCNICOstandalone; outras12pendentes. Próximaauditoria restante:3linksRESTRICT(cancellation/directhire/integrity) e2CASCADElegadojobinterests/replacement, aindaHIPÓTESESsemreprodução, não5falhascomprovadasnem5áreas. Não criarconstraintsporRLSflagapenas/nãoconfundirmarketplace_interestsNETWORK_SHARED ouprofissionaisglobais. PreservarReact19.1.4/RN0.81.6/frozenlock/desenhocanônico/tenantRLS. Externos215/219/220/224/228OPENseparados; semserviços/custos/credenciais/contratos/produção/PSP/dinheiroreal. Continuar também demaisáreas/jornadas conformematriz, SQL/HTTPnãoéRNrender/taps/SecureStore/físico. Recibofinal549noPR e próximocicloFUNCIONAL, semcommitmetadadosautorreferente.


---

## Históricos privados RESTRICT — reprodução e correção candidata — 2026-10-15

Escopo exclusivo: dbdanielbaracho/MLIVRETRABALHO. Base real `a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29`, árvore `b2bc7e367775bc5f369ec21ead76fa05caaa7499`. Não é documento do Creator Commerce OS.

## Falha reproduzida, antes da correção
- Head somente regressão `a564c53eda2768d10b30b8d7357908a04b92509c`, CI https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38702545056, job116313985152, attempt1.
- Os 1294 testes anteriores passaram ([127 Web,753 mobile,400 API,3 CLI,11 monitor], zero falhas unitárias). Os controles anteriores inclusive optional-assignment549 passaram.
- Log primário 2026-10-15T08:02:12.3669225Z..3678126Z aceitou cinco escritas com tenantT1 e assignmentT2: cancellation INSERT, conversion INSERT/UPDATE, integrity INSERT/UPDATE. Erro esperado às08:02:12.3681907Z: restrict_assignment_tenant_integrity: 5 cross-tenant writes accepted.
- app_runtime com SET LOCAL app.tenant_id=T1; assignmentT2 invisível. Escritas próprias, replay de cancelamento, UPSERT de nota de conversão, revisão de integridade e grants imutáveis foram controles positivos. Nenhum grant foi relaxado para testar UPDATE/DELETE revogados.
- Cada probe aceito é revertido por subtransação; toda fixture termina ROLLBACK. Banco efêmero do CI, não Neon/produção. Não foi reproduzido bypass HTTP nem vazamento; controladores já validam tenant/autoridade/pai.

## Contratos e correção mínima
Todas as migrações até0069 e controladores CancellationController/CareerConversionController/IntegrityController foram confrontados. As três relações são privadas TENANT; identidades/perfis continuam globais. O cancelamento não cria compensação: compensationPolicy continua none_until_fin_risk_policy_approved. Conversão é proposta interna, não contrato externo.

Migration0070 acrescenta três FKs compostas sobre assignment e tenant, reutilizando unique work_assignments(id,tenant_id) de0065:
- assignment_cancellations(assignment_id,tenant_id) → work_assignments(id,tenant_id);
- direct_hire_conversions(source_assignment_id,tenant_id) → work_assignments(id,tenant_id);
- marketplace_integrity_cases(assignment_id,tenant_id) → work_assignments(id,tenant_id).

Todas mantêm ON DELETE RESTRICT e as FKs antigas. NOT VALID + VALIDATE na mesma transação BEGIN/COMMIT rejeita histórico inconsistente atomicamente, sem apagar/reparentar/adivinhar tenant. RLS/FORCE, grants, imutabilidade de cancelamento, unicidades/replay/UPSERT, API/ACK/roles, política financeira, UI/deps/lock/build permanecem intactos. Nenhuma operação de produção foi invocada via ferramentas; ProductionTruth local não prova implantação.

## Regressão e controles de exclusão
O mesmo SQL agora exige rejeição pelas três FKs nomeadas em cinco probes. Há três assignments próprios independentes, um para cada família: DELETE administrativo de cada um deve falhar pela FK original ou composta daquela família específica, evitando que outra família mascare uma regressão. Pais e histórico permanecem. Replay conserva motivo; UPSERT altera somente nota legítima; revisão mantém decisão/nota; tenantT2 permanece intacto. Tudo reverte.

Catálogo real RED105FKs é inteiro idêntico ao próprio/pós549. Esperado após correção108:105 entradas antigas integralmente iguais e3 novas validadas; medir no CI próprio/pós, não presumir PASS. JSON histórico com95 não é catálogo atual. Insumos mobile/native/deps/lock/workflows/build/smoke devem ser integralmente idênticos; APK será N/A somente após revisão de blobs+modes. Testes SQL não incrementam artificialmente unitcount.

## Gates desta preparação
Local bash -n passou no fragmento e script completo. Own CI no novoHEAD, catálogo108/controlesRESTRICT, HTTP/Postgres/ProductionTruth, revisão bytes/modes/ancestrais/tree e pós-merge REAL ainda PENDENTES nesta preparação. Não interpretar este snapshot histórico como aprovação.

## Recibo final do ciclo funcional anterior — PR549
O PR549 foi integrado e o pós-CI real passou. Mantém casos opcionais via SET NULL apenas em assignment_id, histórico/tenant/identidade de intent/replayACK e cascade original de trust. Regressão adicional HTTP fez DELETE real de assignment descartável e verificou retenção por API.
```json
{
  "pr": 549,
  "head": "82862976c449ce0120acf8a96225d432d3249cef",
  "base": "e0fddd7dfde5515115281f106eebf06b9a8e38c6",
  "tree": "b2bc7e367775bc5f369ec21ead76fa05caaa7499",
  "red": {
    "head": "58ae0973d4800c9efbbe034430b376b94ca983b0",
    "run": 38701428451,
    "job": 116310291217,
    "previousTestsPass": 1294,
    "crossWritesAccepted": 5
  },
  "ownCI": {
    "run": 38701899580,
    "job": 116311842256,
    "attempt": 1,
    "sha": "82862976c449ce0120acf8a96225d432d3249cef",
    "counts": [
      127,
      753,
      400,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "realAssignmentDeleteAndReplay": true,
    "productionTruth": true
  },
  "checkout": {
    "sha": "fce33db66193fe022e7ca9deb63c51d45f13b948",
    "parents": [
      "e0fddd7dfde5515115281f106eebf06b9a8e38c6",
      "82862976c449ce0120acf8a96225d432d3249cef"
    ],
    "tree": "b2bc7e367775bc5f369ec21ead76fa05caaa7499",
    "synthetic": true,
    "equivalent": true
  },
  "catalog": {
    "before": 102,
    "after": 105,
    "allPreviousUnchanged": true,
    "newValidated": 3,
    "ownPostEntireIdentical": true
  },
  "review": {
    "base": "e0fddd7dfde5515115281f106eebf06b9a8e38c6",
    "head": "82862976c449ce0120acf8a96225d432d3249cef",
    "tree": "b2bc7e367775bc5f369ec21ead76fa05caaa7499",
    "paths": [
      {
        "path": "packages/db/migrations/0069_optional_case_trust_assignment_tenant.sql",
        "mode": "100644"
      },
      {
        "path": "scripts/network-shared-write-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "scripts/http-support-assignment-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/OPTIONAL_CASE_TRUST_ASSIGNMENT_TENANT_2026-10-15.md",
        "mode": "100644"
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "mode": "100644"
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "mode": "100644"
      }
    ],
    "bytesVerified": 10,
    "modes": true,
    "history": true,
    "oldSQLTestsPreserved": true,
    "oldHTTPTestsPreserved": true,
    "unchangedNonDocs": 478,
    "apk": "N/A complete identity of all mobile/native/dependencies/lock/workflows/build/smoke blobs and modes"
  },
  "postCI": {
    "run": 38702488598,
    "job": 116313793200,
    "attempt": 1,
    "sha": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
    "checkoutLiteral": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
    "counts": [
      127,
      753,
      400,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "realAssignmentDeleteAndReplay": true,
    "productionTruth": true
  },
  "merge": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
  "parents": [
    "e0fddd7dfde5515115281f106eebf06b9a8e38c6",
    "82862976c449ce0120acf8a96225d432d3249cef"
  ],
  "monitor": {
    "run": 38702488553,
    "job": 116313793322,
    "event": "push",
    "success": true,
    "marker": "2026-10-15T07:59:35.5414133Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  }
}
```

## Limites e próxima auditoria
Somente área10 Android standalone tem aceite técnico interno; outras12 SEM aceite integral. SQL/HTTP/1294 testes/catálogo não provam telas/taps/teclado/SecureStore/VisualTruth/físico/piloto nem fecham área7. #215/#219/#220/#224/#228 continuam externos OPEN; não iniciar custos, serviços, credenciais, contratos, PSP/dinheiro real ou produção.

Após esta família, sobram por metadados dois pares candidatos a investigar, NÃO duas falhas comprovadas: job_interests→company_jobs (privado legado, distinto de marketplace_interests NETWORK_SHARED), replacement_requests→work_assignments. Ambos CASCADE: cruzar contratos/migrações/roles e reproduzir controles positivos/negativos antes de qualquer DDL. Não impor tenant a perfis/globais nem declarar segurança total por FKs.

Fontes semânticas primárias: https://www.postgresql.org/docs/17/ddl-constraints.html e https://www.postgresql.org/docs/17/sql-altertable.html. A skill neon-postgres orientou migração versionada e prova isolada, sem criar recurso Neon ou operar produção.


---

## Interesses privados e substituições — integridade tenant candidata — 2026-10-15

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO, não Creator Commerce OS. Base real `aa729a09ce708fa722e1844ccff8052fd7cb1cf6`, árvore `e3716184d72cb975bcfd9e2572ec778515d775ac`.

## RED real antes da correção
Head somente regressão `c97940aefb1c93630663e33d3368c6a58e7c9f48`, CI https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38703682519, job116317712294, attempt1. Os1294 testes anteriores ([127Web,753mobile,400API,3CLI,11monitor], zero falhas unitárias) e todas as negativas/positivas anteriores inclusive549/550 passaram.

Log primário 2026-10-15T08:11:54.5737826Z..5746490Z aceitou quatro escritas cruzadas: INSERT/UPDATE job_interests(jobT2) e INSERT/UPDATE replacement_requests(assignmentT2), com tenantT1 e app_runtime/SETLOCAL. Erro às08:11:54.5748133Z: workforce_cascade_tenant_integrity: 4 cross-tenant writes accepted. Pais privados T2 invisíveis; marketplaceT2 compartilhado permaneceu legivelmente disponível por contrato.

Todos os privilégios SELECT/INSERT/UPDATE/DELETE de ambas tabelas são conferidos individualmente. Own CRUD e UPSERT/reason foram exercitados antes das negativas. Cada probe aceito reverte por subtransação e a fixture inteira por ROLLBACK. Não há vazamento/bypassHTTP demonstrado; API usa marketplace_interests compartilhado, não job_interests privado legado. ReplacementController já valida tenant, role, pai e locks. Nada em produção foi invocado.

## Contrato, classificação e correção
Migrações0002,0011,0026 e todas as posteriores até0070, JobsController, CompanyJobsController e ReplacementController foram confrontados. job_interests é TENANT privado legado; marketplace_jobs/interests são NETWORK_SHARED; professional_availability_network é PROFESSIONAL_OWNED; identidades/perfis são globais. tenant_id ou flagsRLS não são classificação automática.

Migration0071 adiciona apenas:
- job_interests(job_id,tenant_id) → company_jobs(id,tenant_id), ON DELETE CASCADE, reutilizando unique0064;
- replacement_requests(assignment_id,tenant_id) → work_assignments(id,tenant_id), ON DELETE CASCADE, reutilizando unique0065.

Preserva FKs antigas/cascades, RLS/FORCE/grants, unicidades/status/razões/replay/UPSERT, referência global replacement_professional_id e SETNULL original, dados compartilhados/projection trigger, contratos HTTP/ACK/authority/roles/locks/replacement serialization, seleção humana e nenhuma política financeira nova. NOTVALID+VALIDATE dentroBEGIN/COMMIT falha/rollback com histórico inconsistente, sem apagar/reparentar/adivinhar tenant. Não é migração executada em produção.

## Regressão GREEN exigida
O mesmo script requer quatro rejeições pelas FKs nomeadas, own CRUD/UPSERT e privilégios intactos. DELETE administrativo real da contratação própria remove sua substituição mas mantém interesse privado; DELETE da vaga remove interesse privado e sua projeção/interest compartilhados como antes. Vaga/assignment e marketplaceT2, perfil e identidade globais precisam permanecer. O bloco inteiro reverte, inclusive exclusões.

Catálogo RED108FKs inteiro igual ao próprio/pós550; esperado110FKs com108 entradas antigas idênticas e2 novas validadas. Medir próprio e pós-merge, não presumir. Um filtro de metadados pode então ter zero pares candidatos anteriores, mas isso NÃO é classificação total, segurança completa nem aceite da área7. Não fecha nenhum dos12 aceites pendentes.

Local bash-n do fragmento e script completo passou. OwnCI no novoHEAD, catálogo/SQL/HTTPPostgres/ProductionTruth, revisão de9paths/bytes/modes/histórico/ancestrais/árvore e pós-CI REAL estão PENDENTES nesta preparação. APK N/A somente após identidade INTEGRAL dos insumos mobile/native/deps/lock/workflows/build/smoke, nunca por[] ou APK de outroSHA.

## Recibo final anterior consolidado no ciclo funcional — PR550
```json
{
  "pr": 550,
  "head": "6c14ec905727215ab942463ebc6fae3b73ee407a",
  "base": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
  "tree": "e3716184d72cb975bcfd9e2572ec778515d775ac",
  "red": {
    "head": "a564c53eda2768d10b30b8d7357908a04b92509c",
    "run": 38702545056,
    "job": 116313985152,
    "previousTestsPass": 1294,
    "crossWritesAccepted": 5
  },
  "ownCI": {
    "run": 38703129362,
    "job": 116315898751,
    "attempt": 1,
    "sha": "6c14ec905727215ab942463ebc6fae3b73ee407a",
    "counts": [
      127,
      753,
      400,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "independentRestrictDeletes": true,
    "productionTruth": true
  },
  "checkout": {
    "sha": "e6cd595132e701071a5a0f0292fad1cd8e6c2fc4",
    "parents": [
      "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
      "6c14ec905727215ab942463ebc6fae3b73ee407a"
    ],
    "tree": "e3716184d72cb975bcfd9e2572ec778515d775ac",
    "synthetic": true,
    "equivalent": true
  },
  "catalog": {
    "before": 105,
    "after": 108,
    "allPreviousUnchanged": true,
    "newValidated": 3,
    "ownPostEntireIdentical": true
  },
  "review": {
    "base": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
    "head": "6c14ec905727215ab942463ebc6fae3b73ee407a",
    "tree": "e3716184d72cb975bcfd9e2572ec778515d775ac",
    "paths": [
      {
        "path": "packages/db/migrations/0070_restricted_assignment_tenant.sql",
        "mode": "100644"
      },
      {
        "path": "scripts/network-shared-write-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/RESTRICTED_ASSIGNMENT_TENANT_INTEGRITY_2026-10-15.md",
        "mode": "100644"
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "mode": "100644"
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "mode": "100644"
      }
    ],
    "bytesVerified": 9,
    "modes": true,
    "history": true,
    "oldSQLTestsPreserved": true,
    "unchangedNonDocs": 480,
    "apk": "N/A full identity of all mobile/native/dependency/lock/workflow/build/smoke blobs and modes",
    "ancestry": {
      "ahead": 2,
      "behind": 0,
      "mergeBase": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29"
    },
    "diff": {
      "files": 9,
      "additions": 1398,
      "deletions": 0
    }
  },
  "postCI": {
    "run": 38703640881,
    "job": 116317920049,
    "attempt": 2,
    "sha": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
    "checkoutLiteral": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
    "counts": [
      127,
      753,
      400,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "independentRestrictDeletes": true,
    "productionTruth": true
  },
  "merge": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
  "parents": [
    "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
    "6c14ec905727215ab942463ebc6fae3b73ee407a"
  ],
  "infra": {
    "attempt": 1,
    "job": 116317579915,
    "cause": "ECR public quota before checkout; all product gates skipped, not PASS",
    "retryCount": 1
  },
  "monitor": {
    "run": 38703640882,
    "job": 116317580000,
    "event": "push",
    "success": true,
    "marker": "2026-10-15T08:09:20.6848578Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"aa729a09ce708fa722e1844ccff8052fd7cb1cf6\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  }
}
```
O attempt1 pós550 falhou antes decheckout por ECR toomanyrequests/Data limit exceeded, todos os gates de produto skipped (nãoPASS). Uma única repetição limitada do job falho no mesmoSHA concluiu attempt2 SUCCESS; nenhum workflow/imagem/credencial/infra/custo foi alterado. Recibo549 final já está nos apêndices de550. Não repetir merges/reruns concluídos.

## Limites e próxima auditoria independente
Somente área10 Android standalone tem aceite TÉCNICO INTERNO. Outras12 áreas SEM aceite integral. SQL/HTTP/1294 unitários/catálogo não são jornadas de tela/taps/render/teclado/SecureStore/VisualTruth/físico/piloto. React19.1.4/RN0.81.6/frozenlock/desenho/tenantRLSPostgres/standalone semMetro preservados. #215/#219/#220/#224/#228 seguem externos OPEN; sem gastos, serviços novos, produção, credenciais, contratos ou dinheiro real.

Após estes pares, confrontar matriz/13áreas e ampliar testes comportamentais por contratos, não inferir aceite por zero candidatosFK/PRs. Auditoria estática aponta uma hipótese para investigar em outro ciclo funcional: IntegrityController.create limita evidence apenas por trim/não-vazio, enquanto migration0059 exige comprimento1..4000; testar HTTP autenticado com4000/4001 e estados antes/depois antes de alegar defeito ou alterar. Não é falha reproduzida nesta evidência. Também priorizar jornadas de emulador quando houver ambiente real, sem fingir físico ou UI a partir de testes de dados.

Semântica primária: https://www.postgresql.org/docs/17/ddl-constraints.html e https://www.postgresql.org/docs/17/sql-altertable.html. Skill neon-postgres aplicada a migrações versionadas e prova isolada, sem provisionar Neon ou operar produção.


---

## Integrity evidence — limite existente, Unicode e HTTP — 2026-10-15

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO, não Creator Commerce OS. Base real `b05b51152da242160614f55b0022313e33500bea`, árvore `3398d6fa1c931569d7459d3e5469255bd12d42e8`.

## Contrato existente, sem política nova
Migration0059 já exige CHECK(char_length(evidence) BETWEEN1 AND4000). IntegrityController.create já exige texto não vazio após trim e responde integrity_case_invalid nos demais inputs inválidos, com auth/membership/owner-admin antes da validação. Nenhuma nova regra de comprimento foi criada.

## Reprodução HTTP/PostgreSQL real
Head somente regressão `3429168da0e81c05ff352da3a347f4c089296c52`, CI https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38705046563, attempt2/job116322760476. Attempt1/job116322270006 falhou antes decheckout por ECR toomanyrequests/Data limit exceeded; todos os gates de produto skipped (nãoRED/PASS). Um único retry do job falho MESMOSHA permitiu a reprodução real.

Os1294 testes anteriores ([127Web,753mobile,400API,3CLI,11monitor], zero falhas) e SQLs anteriores inclusive551 passaram. A fixture local-only criou/persistiu casos com4000ASCII e4000emoji, comparou conteúdo real e assignment/status, e PostgreSQL confirmou char_length4000/octet_length16000 para4000emoji.

Logs primários:
- 2026-10-15T08:25:21.5968712Z:4001ASCII → HTTP500;
- 2026-10-15T08:25:21.6802130Z:4001Unicode → HTTP500;
- 2026-10-15T08:25:21.6977564Z:FAIL integrity evidence oversized HTTP contract:2 responses were not400.
O log da API identificou marketplace_integrity_cases_evidence_check, não erro de autoridade. GETs reais após cada negativa permaneceram iguais, empresaB intacta; invalidtoken401 e profissional403 precederam input. Isso é erro de contrato de entrada, não bypass HTTP/vazamento/produção. Banco/servidor descartáveis do CI, nenhum recurso Neon ou produção invocado.

## Correção mínima e regressões
Acrescentar somente Array.from(evidence).length>4000 ao predicado de entrada após o trim existente e após ctx. Reutiliza integrity_case_invalid/BadRequestException, antes de entrar na transação de negócio/consultar assignment/inserir. SQL/params/headers/payload/endpoint/ACK/list/review/roles/RLS/tenant/transações intactos; auth pode consultar suas fontes como antes.

Array.from conta por iteração de string, sem impor erroneamente limite por unidadesUTF16: localmente4000emoji têm8000unidades mas4000elementos; a fixture PostgreSQL real acima confirmou o contrato Unicode. Não é truncamento/normalização/reinterpretação de evidence. Espaços externos continuam sujeitos ao trim existente. Schema/migrations e limite do banco não mudam.

Três regressões unitárias novas, com todos os testes anteriores preservados por prefixo:
1. rejeitar4001ASCII/emoji e4001codepoints combinantes antes de SQL de negócio;
2. aceitar1..4000ASCII/emoji/codepoints combinantes, manter trim, params confiáveis e ACK real para owner/admin;
3. manter auth401/membership/owner-admin403/tenant_required antes do limite.
O mesmo E2E HTTP que falhou exige400 em ambos excessos, sem novas linhas ou alterações emB, com4000 Unicode válidos. Não somar casos de loop/SQL ao unitcount; esperado403API/1297total SOMENTE após medir no CI.

Preparação local: bash-n fragmento/scriptHTTP completo passou; mudança de controlador é um único predicado, auth/list/review e SQL byte-idênticos. OwnCI do novoHEAD, revisão de bytes/modes/tree/ancestrais e pós-CI REAL ainda PENDENTES nesta preparação. APK N/A somente após identidade INTEGRAL dos insumos mobile/native/deps/lock/workflows/build/smoke; nunca por[] ou APK emprestado.

## Recibo final anterior consolidado no mesmo ciclo funcional — PR551
```json
{
  "pr": 551,
  "head": "a4a038394ba11d0bdf4cc397bc3a03ec548f5012",
  "base": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
  "tree": "3398d6fa1c931569d7459d3e5469255bd12d42e8",
  "red": {
    "head": "c97940aefb1c93630663e33d3368c6a58e7c9f48",
    "run": 38703682519,
    "job": 116317712294,
    "previousTestsPass": 1294,
    "crossWritesAccepted": 4
  },
  "ownCI": {
    "run": 38704350741,
    "job": 116319932018,
    "attempt": 1,
    "sha": "a4a038394ba11d0bdf4cc397bc3a03ec548f5012",
    "counts": [
      127,
      753,
      400,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "privateCascadesAndSharedGlobalPreserved": true,
    "productionTruth": true
  },
  "checkout": {
    "sha": "44e71d99a040f7854b11d6c99f6788a000cfcd82",
    "parents": [
      "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
      "a4a038394ba11d0bdf4cc397bc3a03ec548f5012"
    ],
    "tree": "3398d6fa1c931569d7459d3e5469255bd12d42e8",
    "synthetic": true,
    "equivalent": true
  },
  "catalog": {
    "before": 108,
    "after": 110,
    "allPreviousUnchanged": true,
    "newValidated": 2,
    "remainingMetadataPairs": 0,
    "notAreaAcceptance": true,
    "ownPostEntireIdentical": true
  },
  "review": {
    "base": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
    "head": "a4a038394ba11d0bdf4cc397bc3a03ec548f5012",
    "tree": "3398d6fa1c931569d7459d3e5469255bd12d42e8",
    "paths": [
      {
        "path": "packages/db/migrations/0071_private_workforce_cascade_tenant.sql",
        "mode": "100644"
      },
      {
        "path": "scripts/network-shared-write-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/PRIVATE_WORKFORCE_CASCADE_TENANT_INTEGRITY_2026-10-15.md",
        "mode": "100644"
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "mode": "100644"
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "mode": "100644"
      }
    ],
    "bytesVerified": 9,
    "modes": true,
    "history": true,
    "oldSQLTestsPreserved": true,
    "unchangedNonDocs": 481,
    "apk": "N/A full identity of all mobile/native/dependency/lock/workflow/build/smoke blobs and modes",
    "ancestry": {
      "ahead": 2,
      "behind": 0,
      "mergeBase": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6"
    },
    "diff": {
      "files": 9,
      "additions": 1438,
      "deletions": 0
    }
  },
  "postCI": {
    "run": 38704904134,
    "job": 116321788800,
    "attempt": 1,
    "sha": "b05b51152da242160614f55b0022313e33500bea",
    "checkoutLiteral": "b05b51152da242160614f55b0022313e33500bea",
    "counts": [
      127,
      753,
      400,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "privateCascadesAndSharedGlobalPreserved": true,
    "productionTruth": true
  },
  "merge": "b05b51152da242160614f55b0022313e33500bea",
  "parents": [
    "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
    "a4a038394ba11d0bdf4cc397bc3a03ec548f5012"
  ],
  "monitor": {
    "run": 38704904005,
    "job": 116321788671,
    "event": "push",
    "success": true,
    "marker": "2026-10-15T08:20:10.9893109Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"b05b51152da242160614f55b0022313e33500bea\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  }
}
```
Final550 já está nos apêndices551, final549 nos550, final548 nos549. Não repetir merges/reruns nem criar commit metadados autorreferente para fechar este próprio recibo. SnapshotsPENDENTES históricos preservam preparação, não estado final.

## Aceites e próximas provas
Somente área10 Androidstandalone tem aceite TÉCNICO INTERNO; outras12 SEMaceiteintegral. Catálogo110FKs com zero pares no filtro anterior não prova classificação total, autorização correta em todos os endpoints ou aceiteárea7. Unit/HTTP/SQL não são render/taps/teclado/SecureStore/VisualTruth/físico/piloto. Externos215/219/220/224/228 continuamOPEN, sem gastos/serviços/credenciais/contratos/PSP/dinheiroreal/produção.

Auditoria paralela executou a fonte real exception-sla.ts usando stripTypeScriptTypes do Node24 +vm, sem reescrever fórmula: urgent15/high60/normal240/future_priority240 funcionaram; __proto__ retornou objeto e constructor/toString funções, convertendo atraso300min em within_sla em vez do fallback240 já existente. Isso é função dados→SLA; não é exploitHTTP/prototype pollution/render ou uso observado de prioridade inválida em produção. Próximo: verificar contrato/callers e reproduzir com regressões da função real antes de corrigir own-property fallback, preservando15/60/240 e limites estritos de overdue/escalation; não criar política nova.

Fontes semânticas primárias: https://www.postgresql.org/docs/17/functions-string.html e https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype-@@iterator. Fonte local e HTTP real prevalecem sobre inferência de tipos.


---

## SLA — lookup próprio e fallback existente — 2026-10-15

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO, não Creator Commerce OS. Base real `79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35`, árvore `d7d0b447eb6a070744918bf57774bf1cf6e53def`.

## Contrato e alcance
exceptionSla recebe priority:string, usa urgent15/high60/normal240 e fallback240 para prioridades desconhecidas. SupportController.company/exceptions usa a função; migration0060 já restringe priority do suporte a normal/high/urgent, safety usa urgente e integrity normal. Essa restrição de entrada continua intacta. Não adicionar enum/prioridade, relaxar CHECK ou alegar que API/produção aceitou prioridades herdadas.

## Reprodução local da fonte real
Fonte exception-sla.ts desta base, executada com Node24.19 stripTypeScriptTypes+vm, sem reescrever a fórmula (somente tipos/export para carregar função). Acesso direto mins[x.priority]??240 aceita propriedades herdadas:

| priority desconhecida | targetMinutes anterior | resultado com atraso300min | alvo já esperado |
|---|---|---|---|
| __proto__ | objeto herdado | overduefalse/within_sla | 240,overduetrue |
| constructor | função herdada | overduefalse/within_sla | 240,overduetrue |
| toString | função herdada | overduefalse/within_sla | 240,overduetrue |

urgent15/high60/normal240/future_priority240 permaneceram positivos. Sem prototype pollution, exploitHTTP, render/crash ou ocorrência observada de prioridade inválida em produção: falha reproduzida foi a função dados→SLA retornando tipo/atraso incompatíveis com o fallback existente.

Regressões executadas com o teste original e quatro novos testes: três chaves herdadas e uma matriz de limites. RED2PASS/3FAIL→GREEN5/5, sem skipped. Matriz preserva targets15/60/240/fallback240 e os comparadores estritos em0,target,target+1,2target,2target+1. Loops/asserts não viram novos testes na contagem. O carregador local stripTypeScriptTypes não é typecheck nem substitui fullCI Node22/tsc.

## Correção mínima
Somente a expressão de lookup usa Object.prototype.hasOwnProperty.call(mins,x.priority) antes de ler mins; desconhecida mantém240. Mapa/valores, Date/Math/floor/clamp, timestamp recebido/defaultnow, spread dos campos e comparadores overdue/escalation byte-idênticos. Sem alteração no controlador/SQL/auth/roles/payload/API/migrations/RLS/grants/notificações/estado persistido, nem política de SLA nova.

Todos os testes originais são prefixo integral preservado. Previsão407API/1301total apenas após medirCI; GREEN5local não é suitecompleta ou aceite de área. Próprios gates exatos, revisão bytes/modes/tree/ancestrais e pós-CI REAL ainda PENDENTES nesta preparação. APK N/A somente pela identidade INTEGRAL de mobile/native/deps/lock/workflows/build/smoke; não por[]/APK alheio.

## Recibo final anterior consolidado no ciclo funcional — PR552
```json
{
  "pr": 552,
  "head": "d7643fd727e3b0adb42cfe8f787dc57934010b5f",
  "base": "b05b51152da242160614f55b0022313e33500bea",
  "tree": "d7d0b447eb6a070744918bf57774bf1cf6e53def",
  "red": {
    "head": "3429168da0e81c05ff352da3a347f4c089296c52",
    "run": 38705046563,
    "attempt": 2,
    "job": 116322760476,
    "previousTestsPass": 1294,
    "http500InsteadOf400": 2,
    "valid4000UnicodeAndIsolation": true,
    "infra": {
      "run": 38705046563,
      "sha": "3429168da0e81c05ff352da3a347f4c089296c52",
      "attempt1Job": 116322270006,
      "cause": "ECR quota before checkout, product tests skipped, NOT real RED",
      "failedJobRetries": 1
    }
  },
  "ownCI": {
    "run": 38705843349,
    "job": 116324935286,
    "attempt": 1,
    "sha": "d7643fd727e3b0adb42cfe8f787dc57934010b5f",
    "counts": [
      127,
      753,
      403,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "evidence4000Accepted4001Rejected400": true,
    "productionTruth": true
  },
  "checkout": {
    "sha": "443dbf73bf65d0e732cbff4c0a40834760025ef2",
    "parents": [
      "b05b51152da242160614f55b0022313e33500bea",
      "d7643fd727e3b0adb42cfe8f787dc57934010b5f"
    ],
    "tree": "d7d0b447eb6a070744918bf57774bf1cf6e53def",
    "synthetic": true,
    "equivalent": true
  },
  "catalog": {
    "foreignKeys": 110,
    "entireUnchanged": true,
    "ownPostEntireIdentical": true
  },
  "review": {
    "base": "b05b51152da242160614f55b0022313e33500bea",
    "head": "d7643fd727e3b0adb42cfe8f787dc57934010b5f",
    "tree": "d7d0b447eb6a070744918bf57774bf1cf6e53def",
    "paths": [
      {
        "path": "apps/api/src/integrity.controller.ts",
        "mode": "100644"
      },
      {
        "path": "apps/api/src/integrity-input.controller.test.ts",
        "mode": "100644"
      },
      {
        "path": "scripts/http-support-assignment-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/INTEGRITY_EVIDENCE_CHARACTER_LIMIT_2026-10-15.md",
        "mode": "100644"
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "mode": "100644"
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "mode": "100644"
      }
    ],
    "bytesVerified": 10,
    "modes": true,
    "history": true,
    "oldHTTPTestsPreserved": true,
    "oldUnitTestsPreserved": true,
    "onlyOneControllerPredicateChanged": true,
    "unchangedNonDocs": 480,
    "apk": "N/A full identity of all mobile/native/dependency/lock/workflow/build/smoke blobs and modes",
    "ancestry": {
      "ahead": 2,
      "behind": 0,
      "mergeBase": "b05b51152da242160614f55b0022313e33500bea"
    },
    "diff": {
      "files": 10,
      "additions": 1361,
      "deletions": 1
    }
  },
  "postCI": {
    "run": 38706432003,
    "job": 116326881560,
    "attempt": 1,
    "sha": "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
    "checkoutLiteral": "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
    "counts": [
      127,
      753,
      403,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "evidence4000Accepted4001Rejected400": true,
    "productionTruth": true
  },
  "merge": "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
  "parents": [
    "b05b51152da242160614f55b0022313e33500bea",
    "d7643fd727e3b0adb42cfe8f787dc57934010b5f"
  ],
  "monitor": {
    "run": 38706431860,
    "job": 116326881477,
    "event": "push",
    "success": true,
    "marker": "2026-10-15T08:32:53.9230245Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  }
}
```
Final551 nos apêndices552, final550 nos551, final549 nos550 e final548 nos549. SnapshotsPENDENTES são história de preparação, não estadofinal. Recibo deste próprio ciclo será consolidado no próximo cicloFUNCIONAL, sem commit autorreferente de metadados.

## Aceites e próximos trabalhos
Somente área10 Androidstandalone mantém aceite TÉCNICO INTERNO; outras12 áreas SEM aceite integral. Catálogo110FKs/0pares do filtro não prova segurança total/classificação automática/aceiteárea7; unit/SQL/HTTP não provam jornadas/taps/render/teclado/SecureStore/VisualTruth/físico/piloto. React19.1.4/RN0.81.6/frozenlock/desenho/tenantRLSPostgres/standalone semMetro preservados. #215/#219/#220/#224/#228 externos OPEN; sem gastos/serviços/produção/credenciais/contratos/PSP/dinheiroreal.

Depois dos gates, revalidar matriz/rotas/contratos e escolher próxima lacuna factual por testes. A auditoria de entradas integrity e a família de vínculos privados anteriores estão concluídas nos respectivos recibos; não repetir classes sem nova reprodução. Priorizar jornadas reais de emulador quando houver ambiente; não converter install/launch/smoke em prova de telas. Preferências/help sem vínculo/previsão/integrações precisam contratos/dados, sem política inventada.


---

## Conversas — limite existente de caracteres antes do SQL — 2026-10-15

Escopo exclusivo MLIVRETRABALHO; base `704ffea11cff6985849c775097b952bf81c26f77`, árvore `afa704de025465de2a3cd32adfbed5e45aa151eb`. Todos os documentos originais completos recuperados e preservados em lugar por apêndice; não corresponde ao Creator Commerce OS.

Migration0015 exige body text NOT NULL CHECK(length(body) BETWEEN1 AND4000). A auditoria das73 migrations da base não encontrou remoção ou alteração desse limite:0063 consolida conversas duplicadas;0066 acrescenta integridade tenant. ConversationsController.send já exige trim/não-vazio e usa message_required/BadRequestException; não há nova política de limite ou mudança de schema.

Regressão local da fonte REAL atual com Node24.19 stripTypeScriptTypes+vm, removendo apenas tipos/decorators/imports e fornecendo stubs explícitos Nest/Auth/DB: teste original completo+três testes novos, RED12PASS/1FAIL→candidataGREEN13/13. Isso não substitui Nest HTTP/PostgreSQL/typecheck. Cobre mais4000ASCII/emoji/caracteres combinantes antes db.tenant;4000codepoints válidos/trim/params tenant+sender confiáveis/ACKreal/recipient real; auth/membership antes do input. Os10 testes anteriores da conversa, inclusive concorrência, permanecem prefixo integral. Loops/asserts não aumentam unitcount.

Candidata altera SOMENTE predicado !text para !text||Array.from(text).length>4000, após ctx e trim, reutilizando message_required400 antes do SQL de negócio. Os8 SQLs, argumentos, UPSERT/ACK, ACL, sender/recipient, tenant/RLS/transações, política não idempotente de envio e ausência de retry automático permanecem byte-idênticos. JS.length não serve para rejeitar4000emoji válidos: estes têm8000unidadesUTF16, mas4000caracteres PostgreSQL. Sem truncamento ou normalização de texto.

O HTTP journey existente mantém todos os assertions originais e acrescenta controles localAPI+Postgres, negativos4001ASCII/emoji por profissional/empresa, snapshots completos mensagens/notificaçõesA/B, auth401/membership401, positivos4000comtrim/ACK/lengthPG/octet_length e preservação de histórico/B. A prova HTTP RED real foi obtida e está registrada abaixo; os próprios/pós gates da correção continuam PENDENTES neste snapshot de preparação.

## Recibo FINAL anterior consolidado — PR553
```json
{
  "pr": 553,
  "base": "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
  "head": "c32ee702144238821378a582e0abd8837e1b28b7",
  "merge": "704ffea11cff6985849c775097b952bf81c26f77",
  "tree": "afa704de025465de2a3cd32adfbed5e45aa151eb",
  "parents": [
    "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
    "c32ee702144238821378a582e0abd8837e1b28b7"
  ],
  "red": {
    "scope": "actual function source+original and4new tests via native TS stripping/vm, not HTTP/typecheck/production",
    "pass": 2,
    "fail": 3,
    "greenPass": 5,
    "greenFail": 0
  },
  "ownCI": {
    "run": 38707092951,
    "attempt": 2,
    "job": 116330711818,
    "head": "c32ee702144238821378a582e0abd8837e1b28b7",
    "success": true,
    "all18Steps": true,
    "summary": {
      "tests": [
        127,
        753,
        407,
        3,
        11
      ],
      "pass": [
        127,
        753,
        407,
        3,
        11
      ],
      "fail": [
        0,
        0,
        0,
        0,
        0
      ],
      "cancelled": [
        0,
        0,
        0,
        0,
        0
      ],
      "skipped": [
        0,
        0,
        0,
        0,
        0
      ]
    },
    "checkout": {
      "sha": "ca4683b3a3de44a64f92a6aea455751081fc051e",
      "parents": [
        "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
        "c32ee702144238821378a582e0abd8837e1b28b7"
      ],
      "tree": "afa704de025465de2a3cd32adfbed5e45aa151eb",
      "synthetic": true,
      "equivalent": true
    },
    "httpPostgres": true,
    "productionTruth": true,
    "infra": "Attempt1 ECR quota BEFORE checkout, product skipped; exactly one retry of failed jobs, attempt2 full success. No further rerun."
  },
  "review": {
    "checks": [
      {
        "path": "apps/api/src/exception-sla.test.ts",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 1665
      },
      {
        "path": "apps/api/src/exception-sla.ts",
        "blob": true,
        "mode": "100644",
        "prefix": false,
        "chars": 526
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 498647
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 840965
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 508395
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 91243
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 494578
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 493452
      },
      {
        "path": "docs/evidencias/EXCEPTION_SLA_OWN_PRIORITY_2026-10-15.md",
        "blob": true,
        "mode": "100644",
        "prefix": null,
        "chars": 8325
      }
    ],
    "onlyLookupExpression": true,
    "unchangedNonDocs": 481,
    "apk": "N/A full protected input blob/mode identity",
    "tree": "afa704de025465de2a3cd32adfbed5e45aa151eb"
  },
  "postCI": {
    "run": 38737341120,
    "attempt": 1,
    "job": 116429886035,
    "sha": "704ffea11cff6985849c775097b952bf81c26f77",
    "checkoutLiteral": "704ffea11cff6985849c775097b952bf81c26f77",
    "success": true,
    "all18Steps": true,
    "summary": {
      "tests": [
        127,
        753,
        407,
        3,
        11
      ],
      "pass": [
        127,
        753,
        407,
        3,
        11
      ],
      "fail": [
        0,
        0,
        0,
        0,
        0
      ],
      "cancelled": [
        0,
        0,
        0,
        0,
        0
      ],
      "skipped": [
        0,
        0,
        0,
        0,
        0
      ]
    },
    "httpPostgres": true,
    "productionTruth": true,
    "catalogForeignKeys": 110,
    "catalogOwnPostEntireIdentical": true
  },
  "monitor": {
    "scheduleRun": 38713095475,
    "scheduleJob": 116349094163,
    "success": true,
    "pushRun": 38737341187,
    "pushJob": 116429886696,
    "pushSuccess": true,
    "marker": "2026-10-15T12:47:34.8570842Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"704ffea11cff6985849c775097b952bf81c26f77\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}",
    "issue554": {
      "state": "closed",
      "closedAt": "2026-10-15T12:47:35Z",
      "botComment": 6192416713,
      "sha": "704ffea11cff6985849c775097b952bf81c26f77",
      "manualIssueWrites": false
    }
  },
  "acceptance": "Only area10 Android standalone TECHNICAL INTERNAL accepted;12 others not fully accepted.",
  "remainingExternal": [
    228,
    224,
    220,
    219,
    215
  ],
  "openPRs": 0
}
```

Este recibo553 é final, incluindo CI próprio e pós-merge real; os PENDENTES nos apêndices de preparação553 são históricos. Não repetir ready/merge/rerun553 nem anteriores. O recibo do próprio ciclo será consolidado no próximo ciclo FUNCIONAL, sem commit autorreferente só de metadados.

## Aceites e limites
Só área10 Android standalone tem aceite TÉCNICO INTERNO; outras12 ainda SEM aceite integral. Esta fatia pertence às áreas8/9/11 e não as encerra. Unit/SQL/HTTP não provam tela/taps/render/teclado/VisualTruth/físico/SecureStore/piloto. Catálogo110FKs/0pares não é classificação automática nem segurança total. APK N/A apenas pela identidade INTEGRAL de mobile/native/deps/lock/workflows/build/smoke; nenhum APK de outroSHA atribuído aqui.

React19.1.4/RN0.81.6/frozenlock/desenho canônico preservados. Externos215/219/220/224/228 OPEN separados; sem produção/Railway/Neon/novosserviços/gastos/credenciais/contratos/PSP/dinheiroreal. Priorizar também jornadas reais de cliente/estados e testes de falhas notificações conforme contrato, sem inventar outbox/provider/ajuda sem vínculo. Auditoria estática42controllers localizou3sites INSERTnotifications(company-jobs,replacement,conversations), todos em DatabaseService.tenant BEGIN/COMMIT/catchROLLBACK; isso não é prova comportamental de falha na inserção de notificação.

## RED HTTP/PostgreSQL REAL — confirmado antes do fix
```json
{
  "head": "092563fc1b4519e7a1d027e1b897ebd0af4e6016",
  "run": 38746255453,
  "attempt": 3,
  "job": 116461647119,
  "previousTestsPass": 1301,
  "summary": {
    "tests": [
      127,
      753,
      407,
      3,
      11
    ],
    "pass": [
      127,
      753,
      407,
      3,
      11
    ],
    "fail": [
      0,
      0,
      0,
      0,
      0
    ],
    "skipped": [
      0,
      0,
      0,
      0,
      0
    ],
    "cancelled": [
      0,
      0,
      0,
      0,
      0
    ]
  },
  "http500InsteadOf400": 4,
  "valid4000AsciiAndUnicodePersisted": true,
  "negativeWritesPreserved": true,
  "authenticationMembership401": true,
  "primaryMarkers": [
    "2026-10-15T13:56:10.2951588Z OBSERVED chat body characters=4001 encoding=ascii actor=pro HTTP=500",
    "2026-10-15T13:56:10.4486468Z OBSERVED chat body characters=4001 encoding=ascii actor=company HTTP=500",
    "2026-10-15T13:56:10.6026224Z OBSERVED chat body characters=4001 encoding=unicode actor=pro HTTP=500",
    "2026-10-15T13:56:10.7515821Z OBSERVED chat body characters=4001 encoding=unicode actor=company HTTP=500",
    "2026-10-15T13:56:11.0129025Z OBSERVED chat persisted characters=4000 encoding=ascii octets=4000",
    "2026-10-15T13:56:11.1238479Z OBSERVED chat persisted characters=4000 encoding=unicode octets=16000",
    "2026-10-15T13:56:11.2253680Z FAIL: chat_character_limit 4 oversized requests were not HTTP400"
  ],
  "infra": {
    "run": 38746255453,
    "attempt1Job": 116460573392,
    "attempt2Job": 116461005441,
    "cause": "Both ECR quota before checkout, all product gates skipped, NOT real RED/PASS",
    "failedJobRetries": 2,
    "secondRetryTime": "2026-10-15 13:53:24 UTC"
  }
}
```
O log primário mostra conversation_messages_body_check para cada4001. As4000Unicode foram persistidas comlength4000/octet16000. Snapshots completos mensagens/notificações A/B e auth/membership401 passaram. Não é bypassHTTP/vazamento/produção/tela. Attempts1/2 falharamANTEScheckout porECRquota e NÃO contam como RED; a tentativa3 executou1301 anteriores PASS e falhou apenas no novo marcador esperado4HTTP500.

Todos próprios gates do novo HEAD, revisão final e pós-merge REAL continuam PENDENTES neste snapshot de preparação. API previsto410/total1304 somente após medirCI, nunca por projeção.


---

## Jornada Web em navegador real — preparação verificável — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Base real `d0754b848e5bb780d3f3707001b8c49b802fd0f5`, árvore `78bbca3e834335cef8c09e9ab398beb87eb8302c`; PR555 JÁ MERGED e próprios/pósCI reais aprovados. DVT ORIGINAL/memória/checkpoint/ledger/registry/matriz integrais preservados como prefixos; não é documento Creator Commerce OS.

## Lacuna e limite da prova atual
Matriz áreas1/2/4 ainda exigem prova real do cliente: hooks/unit/HTTP servidor e Androidinstall/launch não provam DOM/sessão/formulários da Web. A imagem do RED555 declarou ubuntu24/20261004.327; inventário primário https://github.com/actions/runner-images/blob/ubuntu24/20261004.327/images/ubuntu/Ubuntu2404-Readme.md lista Chrome154.0.8037.97/Chromium154.0.8037.0. Isso NÃO equivale a executar navegador neste projeto. Localmente não há navegador instalado; node--check e bash-n são apenas verificações de sintaxe, NÃO testes UI.

## Novo teste, sem alteração no produto
scripts/web-browser-journey-e2e.sh reconstrói Next apenas para fixture com NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:3002, inicia backend isolado3002/CORSexplícitoWeb3001 e Next3001 sobre o PostgreSQL efêmero já existente. Wrapper e driver recusam origens/DB não-local; navegador usa perfil novo e intercepta/bloqueia requests de aplicação foraAPI/Weblocal. Não desabilita sandbox/CORS/web-security, não lê sessão pessoal, não cria serviços/deps/lock/credenciais/produção e não muda URL do APK canônico.

Driver Node22/WebSocket/CDP usa Chrome instalado (falha em vez de pular se ausente), DOM real e entrada/cliques browser para: login401+feedback; loginválido/estado vazio; criaçãoequipe/vaga peloformulário; GETAPI realconfirmaIDs/tenant/valor12345cents/datas; recarga usa sessão da aba sem signin automático; signout local+resposta remota; novaidentidadeB com tela/API sem dadosA. CapturasPNG do viewport1365x900 comSHA256/base64 no log primário e relatório fixtureIDs/statuses semtokens/senhas. DATETIMEinputs usam setterDOM+eventos; não é prova de teclado móvel. O HTTPjourney anterior é integralmente preservado; só acrescenta chamada a wrapper antes dos signouts.

Código funcional/JSX/CSS/API/SQL/migrations/auth/roles/RLS/notificações/desenho/deps/lock/native/workflows/buildAPK/smoke canônico permanecem intactos. Teste acrescenta evidência a comportamento existente, não alega defeito de produto sem reprodução. Caso falhe, primeiro classificar harness/ambiente/contrato e corrigir apenas o que os logs provarem; não relaxar teste para fabricar sucesso.

## Estado desta preparação
O navegador REAL AINDA NÃO FOI EXECUTADO no SHA desta fatia; próprioCI/capturas/revisão/merge/pósREAL PENDENTES. Unitcount continua1304 previstoinalterado, sem somar assertions/etapasUI como novos unit tests. Nenhum aceiteintegral novo: sóárea10standaloneTÉCNICOINTERNO, outras12 ainda SEM aceite completo. Webdesktop≠Android/físico/VisualTruth/SecureStore/piloto. Externos215/219/220/224/228 OPEN, semgastos/produção/PSP/dinheiroreal. APK N/A só poridentidadeINTEGRALinsumos protegidos, não[].

## Recibo FINAL anterior consolidado — PR555
```json
{
  "pr": 555,
  "base": "704ffea11cff6985849c775097b952bf81c26f77",
  "head": "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f",
  "merge": "d0754b848e5bb780d3f3707001b8c49b802fd0f5",
  "tree": "78bbca3e834335cef8c09e9ab398beb87eb8302c",
  "parents": [
    "704ffea11cff6985849c775097b952bf81c26f77",
    "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f"
  ],
  "red": {
    "head": "092563fc1b4519e7a1d027e1b897ebd0af4e6016",
    "run": 38746255453,
    "attempt": 3,
    "job": 116461647119,
    "previousTestsPass": 1301,
    "summary": {
      "tests": [
        127,
        753,
        407,
        3,
        11
      ],
      "pass": [
        127,
        753,
        407,
        3,
        11
      ],
      "fail": [
        0,
        0,
        0,
        0,
        0
      ],
      "skipped": [
        0,
        0,
        0,
        0,
        0
      ],
      "cancelled": [
        0,
        0,
        0,
        0,
        0
      ]
    },
    "http500InsteadOf400": 4,
    "valid4000AsciiAndUnicodePersisted": true,
    "negativeWritesPreserved": true,
    "authenticationMembership401": true,
    "primaryMarkers": [
      "2026-10-15T13:56:10.2951588Z OBSERVED chat body characters=4001 encoding=ascii actor=pro HTTP=500",
      "2026-10-15T13:56:10.4486468Z OBSERVED chat body characters=4001 encoding=ascii actor=company HTTP=500",
      "2026-10-15T13:56:10.6026224Z OBSERVED chat body characters=4001 encoding=unicode actor=pro HTTP=500",
      "2026-10-15T13:56:10.7515821Z OBSERVED chat body characters=4001 encoding=unicode actor=company HTTP=500",
      "2026-10-15T13:56:11.0129025Z OBSERVED chat persisted characters=4000 encoding=ascii octets=4000",
      "2026-10-15T13:56:11.1238479Z OBSERVED chat persisted characters=4000 encoding=unicode octets=16000",
      "2026-10-15T13:56:11.2253680Z FAIL: chat_character_limit 4 oversized requests were not HTTP400"
    ],
    "infra": {
      "run": 38746255453,
      "attempt1Job": 116460573392,
      "attempt2Job": 116461005441,
      "cause": "Both ECR quota before checkout, all product gates skipped, NOT real RED/PASS",
      "failedJobRetries": 2,
      "secondRetryTime": "2026-10-15 13:53:24 UTC"
    }
  },
  "ownCI": {
    "run": 38747253808,
    "job": 116464035645,
    "attempt": 1,
    "sha": "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f",
    "summary": {
      "tests": [
        127,
        753,
        410,
        3,
        11
      ],
      "pass": [
        127,
        753,
        410,
        3,
        11
      ],
      "fail": [
        0,
        0,
        0,
        0,
        0
      ],
      "skipped": [
        0,
        0,
        0,
        0,
        0
      ],
      "cancelled": [
        0,
        0,
        0,
        0,
        0
      ]
    },
    "success": true,
    "all18Steps": true,
    "httpPostgres": true,
    "chat4000Accepted4001Rejected400": true,
    "productionTruth": true,
    "checkout": {
      "sha": "8f045f634a8d2bf79785b5bc9d0d47976a334496",
      "synthetic": true,
      "parents": [
        "704ffea11cff6985849c775097b952bf81c26f77",
        "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f"
      ],
      "tree": "78bbca3e834335cef8c09e9ab398beb87eb8302c",
      "equivalent": true
    },
    "catalog": {
      "foreignKeys": 110,
      "entireUnchangedFromRed": true
    }
  },
  "review": {
    "base": "704ffea11cff6985849c775097b952bf81c26f77",
    "head": "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f",
    "tree": "78bbca3e834335cef8c09e9ab398beb87eb8302c",
    "paths": [
      {
        "path": "apps/api/src/conversations.controller.test.ts",
        "mode": "100644"
      },
      {
        "path": "apps/api/src/conversations.controller.ts",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "mode": "100644"
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "mode": "100644"
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "scripts/http-journey-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/CHAT_BODY_CHARACTER_LIMIT_2026-10-15.md",
        "mode": "100644"
      }
    ],
    "bytesVerified": 10,
    "history": true,
    "oldUnitFullPrefix": true,
    "oldHttpRestoredExactly": true,
    "onlyPredicate": true,
    "unchangedNonDocs": 480,
    "apk": "N/A full identity of ALL mobile/native/dependency/lock/workflow/build/smoke blobs and modes",
    "ancestry": {
      "ahead": 2,
      "behind": 0,
      "mergeBase": "704ffea11cff6985849c775097b952bf81c26f77"
    }
  },
  "postCI": {
    "run": 38747908223,
    "job": 116466304518,
    "attempt": 1,
    "sha": "d0754b848e5bb780d3f3707001b8c49b802fd0f5",
    "checkoutLiteral": "d0754b848e5bb780d3f3707001b8c49b802fd0f5",
    "summary": {
      "tests": [
        127,
        753,
        410,
        3,
        11
      ],
      "pass": [
        127,
        753,
        410,
        3,
        11
      ],
      "fail": [
        0,
        0,
        0,
        0,
        0
      ],
      "skipped": [
        0,
        0,
        0,
        0,
        0
      ],
      "cancelled": [
        0,
        0,
        0,
        0,
        0
      ]
    },
    "success": true,
    "all18Steps": true,
    "httpPostgres": true,
    "chat4000Accepted4001Rejected400": true,
    "productionTruth": true,
    "catalogForeignKeys": 110,
    "catalogOwnPostEntireIdentical": true
  },
  "monitor": {
    "run": 38747908353,
    "job": 116466304284,
    "success": true,
    "event": "push",
    "marker": "2026-10-15T14:02:54.2316028Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"d0754b848e5bb780d3f3707001b8c49b802fd0f5\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  },
  "remainingExternal": [
    228,
    224,
    220,
    219,
    215
  ],
  "acceptance": "Only area10 TECHNICAL INTERNAL accepted;12other areas pending."
}
```

PENDENTES nos apêndices555 eram preparação, não estadofinal; reciboFINALacima inclui1304PASS/todos18steps/HTTPunicode400/PGpersistência/ProductionTruth/mergeREAL. Não repetir555/553/anteriores. Recibo deste teste será consolidado no próximo cicloFUNCIONAL, semcommit sóparaatividade/metadados. Jornada parcial não fecha áreas1/2/4 nem13; ampliar depois porcontratos loading/erro/vazio/acessibilidade e navegaçãoreal seminventarpolítica.


---

## Correção funcional — resposta REAL de login tenant_id→tenantId — 2026-10-15

Este apêndice supersede somente a preparação anterior que não alegava defeito de produto. A nova reprodução é integração REAL API→Web; não repete antigos testes de mock/canonical-session como se fossem jornada de cliente.

### Falha comprovada
AuthController.signin devolve AuthService.memberships com colunas SQL tenant_id/role, sem alterar o formato. validateSigninCompanySession exigia tenantId via parser de sessão armazenada. A primeira execução Chrome renderizou login e feedback401, mas não chegou ao dashboard após credenciais válidas; a execução diagnóstica subsequente capturou shape tenant_id/owner mas teve timeout de startupChrome, separado de falha do produto. A regressão seguinte passa resposta HTTP REAL, com PostgreSQL real, pelo módulo Web REAL carregado por nativeTSstrip+VM, sem stubs Auth/DB/transporte: normalized=false. Assim confirma incompatibilidade antes de alterar produto; não é prova de exploit, vazamento, Android/físico ou jornada completa.

```json
{
  "head": "97bb04b4e3619f721b6cbd48a93876f0693cb9d7",
  "run": 38751252527,
  "job": 116477925459,
  "attempt": 1,
  "previousTestsPass": 1304,
  "summary": {
    "tests": [
      127,
      753,
      410,
      3,
      11
    ],
    "pass": [
      127,
      753,
      410,
      3,
      11
    ],
    "fail": [
      0,
      0,
      0,
      0,
      0
    ],
    "skipped": [
      0,
      0,
      0,
      0,
      0
    ],
    "cancelled": [
      0,
      0,
      0,
      0,
      0
    ]
  },
  "scope": "REAL local HTTP/Postgres signin envelope fed unchanged into ACTUAL Web validator via nativeTSstrip+VM; no auth/transport mock",
  "observed": [
    "2026-10-15T14:27:41.1939343Z WEB_BROWSER_FIXTURE_AUTH {\"label\":\"A\",\"tenantId\":\"4815332a-ab7c-462d-9b4a-588bcf39eaa5\",\"memberships\":[{\"tenant_id\":\"4815332a-ab7c-462d-9b4a-588bcf39eaa5\",\"role\":\"owner\"}]}",
    "2026-10-15T14:27:41.1940306Z WEB_BROWSER_WIRE_OBSERVED {\"label\":\"A\",\"normalized\":false,\"membershipKeys\":[[\"tenant_id\",\"role\"]]}",
    "2026-10-15T14:27:41.1944235Z WEB_BROWSER_JOURNEY_FAIL Actual API signin response rejected by current Web validator"
  ],
  "browserAttempt": {
    "head": "d31253d2987e644d1d8641b445999c8c931a3fa0",
    "run": 38749130483,
    "attempt": 2,
    "job": 116471435561,
    "actualLoginRendered": true,
    "actual401Feedback": true,
    "validLoginDashboardTimeout": true,
    "scope": "No valid dashboard completion claimed"
  },
  "infra": {
    "firstAttemptEcr": {
      "attempt1Job": 116470558210,
      "run": 38749130483,
      "cause": "ECR quota before checkout, browser/product gates not executed",
      "failedJobRetries": 1
    },
    "diagnosticChromeStartup": {
      "head": "1219d965829ab153478a87ec6c5d26b58394eee7",
      "run": 38750284144,
      "job": 116474585407,
      "observedApiRaw": true,
      "startupTimeout": true,
      "scope": "NOT product RED/root proof by startup"
    }
  },
  "localRegression": {
    "previous6Pass": 6,
    "new4Fail": 4,
    "candidate10Pass": 10,
    "typecheck": false,
    "browser": false
  }
}
```

### Mudança mínima de fronteira, sem mudar API ou autoridade
Somente validateSigninCompanySession adapta tenant_id da resposta de rede para o tenantId canônico já usado pela aba. tenantId canônico anterior continua suportado; se as duas chaves existem e divergem, rejeita em vez de escolher autoridade ambígua. O parser readStoredCompanySession permanece BYTE-IDÊNTICO/estrito e continua rejeitando storage em formato wire. Allowlist de papéis, filtro profissional, identidade/token, tipos/campos estáveis, Set que rejeita empresas duplicadas e dados opcionais validados não mudam. IDs não são inventados, normalizados por trim ou inferidos de headers. A API e mobile continuam recebendo tenant_id como antes; SQL/migrations/RLS/auth/header/payload/contratos/JSX/CSS/layout/deps/lock/standalone preservados.

Quatro testes novos da função real, mantendo os6 originais como prefixo integral: rawAPI válido→canonical; combinação wire/canonical+filtro de papéis+duplicados; aliases conflitantes/malformados; roundtrip canonical sem alargar storagewire. RED6PASS/4FAIL→GREEN10/10 local com nativeTSstrip+web-contract reais (sem reescrever fórmula), NÃO typecheck ou render. Web131/total1308 são somente previsão até fullCI.

### Prova Web real ainda exigida
O MESMO navegador/teste mantém todas as condições DOM/UI/API originais, sem relaxar a espera de dashboard (controle DOM conhecido local PASS). Driver também exige token real do navegador revogado401 após signout explícito e outro token da MESMA identidade ainda200; esse token de fixture fica privado e não é impresso. Não há retryPOST, alteração na política de revogação, cancelamento de signin ou limpeza fictícia de sessão tardia. Chrome startup segue15s com stderr seguro para diagnosticar ambiente; não desabilitar sandbox/security/CORS para passar.

OwnCI no novo HEAD/capturas completas/revisão13paths/merge/pósREAL AINDA PENDENTES nesta preparação. Falhas de startup/driver não são declaradas falhas de produto. Precisam haver WEB_BROWSER_WIRE_OBSERVED true para A/B, WEB_BROWSER_JOURNEY_PASS com persistência e isolamento, três capturasPNGhash+bytes e todos gates antigos. AssertUI não soma unitcount. BrowserWebdesktop não é Android/nativo/tecladofísico/VisualTruth nem aceite integral de áreas1/2/4. Sóárea10 tem aceite TÉCNICO INTERNO; outras12 pendentes. Recibo555final jáconsolidado no apêndice anterior deste ciclo; não criar commit só de metadados para si. Externos215/219/220/224/228OPEN, semgastos/serviços/produção/credenciais/contratos/PSP/dinheiroreal.


---

## Prova de atomicidade das notificações — preparação funcional — 2026-10-15

Escopo exclusivo MLIVRETRABALHO, área9 (e controles transacionais das áreas5/7/11). Base viva `dd715c6573bcc6d6e5e3c749cc634e276db83ef0`, árvore `90aec6eeb7e3e0cd8ee853e156c5fd5f9831d1b1`; pais ordenados `d0754b848e5bb780d3f3707001b8c49b802fd0f5`, `078ebbc8977c61055100184ff91a0261f36a0d3e`. README, DVT v1.104 original e histórico, memória, checkpoint, ledger, registry e matriz recuperados em referências imutáveis. Todas73 migrações consultadas; notificações definidas em0014, sem outra migração que mude essa tabela. A documentação completa anterior permanece prefixo literal, não é substituída por resumo.

### Lacuna concreta e teste novo, sem correção especulativa

Os testes HTTP existentes cobrem isolamento, agregação, UUID, leitura/ACK idempotente e contador; não injetavam falha SQL no INSERT de notificação para provar rollback de todos os efeitos de confirmação/chat/substituição. Os três controllers usam `DatabaseService.tenant` com BEGIN/SET LOCAL ROLE app_runtime/contexto/COMMIT/catchROLLBACK. Isso é leitura de código, não prova comportamental nem entrega externa.

Novo `scripts/notification-atomicity-e2e.cjs`, chamado antes do gate de navegador no HTTP journey existente (nenhuma assertion antiga removida): quatro chamadas HTTP de falha deliberada, com hook AFTER INSERT restrito ao tenant/identidade/tipo de fixtures reais. Sequência exclusiva testemunha uma tentativa de INSERT mesmo após rollback; função de fixture SECURITY DEFINER só avança essa sequência e lança erro, com search_path fixo/EXECUTE público revogado. Não concede privilégios nem altera políticas/grants existentes. Criação/remoção transacional de nomes próprios aleatórios, sem OR REPLACE/CASCADE, sem migração de produto ou DDL em produção. Não existe instalação em Neon/Railway.

Guarda CI + origem HTTP localhost com porta explícita + DSN PostgreSQL localhost com porta explícita e banco exato mlivretrabalho_http; recusa overrides/query/fragment/host externo. Conferência do nome real do banco e de IDs criados via HTTP no mesmo PostgreSQL antes do hook. IP interno do contêiner pode diferir do endpoint loopback; não se falsifica esse fato. Controle real app_runtime/tenant lê próprio job e não lê job do segundo tenant.

Casos: (1) confirmar profissional ainda sem membership: assignment/membership/interesse/notificação devem ficar integralmente iguais após500; depois controle positivo com ACK e replay contratual sem duplicação; (2) primeira mensagem: criação de conversa/mensagem/notificação deve ser revertida; controle positivo de mensagem/ACK/leitura reais; (3) mensagem em conversa existente: preserva histórico anterior por rollback de UPSERT/mensagem/notificação; (4) selecionar substituto elegível com identidade/membership/talent pool/disponibilidade reais: status original/request/newassignment/notificação inalterados após500, depois seleção positiva única com matched/cancelled/confirmed/notification reais. Snapshots integrais apenas dos dois tenants de fixture, incluindo marketplace_interests; metadados RLS/policies/grants/role devem ficar iguais após limpeza. Sequência prova chegada ao hook em app_runtime/contexto, não basta observar um500 genérico. Positivos são fases deliberadas de teste após remoção da injeção, não política de retry de negócio.

Estado desta preparação: quatro testes locais das funções REAIS de guardas/DDL PASS, node --check PASS; não é PostgreSQL, HTTP, typecheck, navegador ou aceite. CI próprio do novo HEAD, revisão final, merge e pós-gates AINDA PENDENTES. Não declarar falha nova da aplicação: se os testes passarem no código existente, o resultado é prova de cobertura, não patch de defeito imaginado. Evidência detalhada: `docs/evidencias/NOTIFICATION_TRANSACTION_ATOMICITY_2026-10-15.md`.

### Consolidação factual independente — PR558 continua DRAFT/FAIL

Reconsulta viva: #555/#556 já integrados; main pós556 CI38753142047/job116484484990 continua FAILURE no navegador, não PASS. Não repetir merge/rerun. #558 segue DRAFT/NÃO MERGED no HEAD48a123aa5abac436c9ed26d148b725e30db79f74/tree d577b8c55e24239253f034768018a85b1ce7444f. OwnCI38792613152/job116620750043 attempt1 FAILURE, sem retry.1328unit=[151Web,753mobile,410API,3CLI,11monitor] PASS/fail-skip-cancel0, typecheck/build/export/migrations/privacy PASS; etapa HTTP/browser FAIL, ProductionTruth posterior não executado/PostSetupNode skipped. Checkout9e6fb40254ebb076adbe2c7faefa5761e399a81c SINTÉTICO pais[dd715...,48a...] árvore equivalente, não HEAD literal. Recibo final completo reconsultado no corpoPR558 e logs primários; não emprestar verdes de heads anteriores.

Mínimo válido48a: documento HTTP200 real de127.0.0.1, sem cache/SW/scripts, secureContexttrue. Controles minimal/log-only e native-only PASS27 respostas JSON (26GET200+1teamPOST201) com persistência API/PG; minimal/instrumented primeiro GET200 e depois12GET paralelos ERR_ABORTED/canceledtrue/TypeErrorFailedtofetch, nenhum GET dessa onda chegou àAPI após OPTIONS204. React/NextAPPscripts NÃO são necessários para essa reprodução DIAGNÓSTICA; CDPguard/observer/Log ainda presentes, raiz EXATA NÃO comprovada. Não é prova de falha comum sem instrumentação/bug de fornecedor/CORS/API/produção. Política LNA PermissionBlock é campo de política, não erro de permissão; controles48a não exibem LocalNetworkAccessPermissionDenied. Fixture sintética anterior bc3 com LNAdenied/canceledfalse era redução inválida; nenhum grant/bypass foi feito. Baseline mínimo48a falhou startup15s, não transporte. Jornadas baseline/instrumented PASS9checks+5refreshwaves(12GET200novos/click/semPOSTextra)+5hardreloads(timeOriginnovo/readycomplete); log-only falhou após teamPOST201, native-only após segunda recarga. Agregado8casos=4PASS/4FAIL, exit1 sticky. Todos7 browsers que iniciaram Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34, um startup sem versão. Sem causa inferida por upgrade de imagem:20261012.334.1 também em falhas/sucessos anteriores. Sem patch de API/CORS/React/security/assert/deadline.

12PNGs próprios48a foram verificados naquele ciclo (assinatura/bytes/SHA/dimensões1365x900); logs38792613152/job116620750043 preservam WEB_BROWSER_CAPTURE. BaselineA e5c2374826d9944cf8a86df5a0e94af8d7ba3746a36606ea76c7abf9b2644fd0/132205bytes; B e6287ca5441c85c466014cdf7e1b2807e7b1b889276680284307606ae4c88c5c/132545; mínimo falho050b6043a08877784addeaf706f0304c956e63007ba673516b4119d3e8bcfdc2/9116. Não atribuir a outro SHA nem a esta prova API. Assets antigos556/aab/690/bc3 são distintos. Nenhum merge/post558 existe. Bloqueio parcial do navegador não impede esta frente transacional independente.

### Limites de aceite e continuidade

Só área10 tem aceite TÉCNICO INTERNO Android standalone; outras12 SEM aceite integral. Esta prova SQL/HTTP não prova entrega, outbox, provider, push nativo, render, SecureStore, Android físico, VisualTruth ou piloto e não inventa políticas. React19.1.4/RN0.81.6/frozenlock/mobile/native/build/smoke/RLS/contratos/API/UI intactos; APK N/A depende revisão INTEGRAL dos insumos e grafo canônico, não[]/APK emprestado. Último APK efetivamente validado542 pertence63340145d7688ac08f161be8db418d789e81ec89, não a este teste.

Monitor cron38786296228/job116599024825 SUCCESS, marker18:31:20.3326834Z main dd715... age233/openPR1/active0 criou559; ausência de commit não prova agente parado, nenhum alerta foi alterado manualmente e nenhum commit é feito só por atividade. Externos215/219/220/224/228 continuam OPEN separados, sem produção/serviços novos/credenciais/custos/contratos/PSP/dinheiro real. Rotina existente horária preservada, não agente24x7. Recibos finais novos só após observados nos SHAs exatos; snapshots PENDENTES são histórico da preparação.


### Extensão funcional: segundo destinatário e recibo inicial real — 2026-10-15

PR560 próprio inicial `2190064ea45db4680a8714e381299fef0d5046b0`/tree7bed24466cac7036981eb4ced5a97238f4fe0103, ownCI38797707503/job116638353421 attempt1 FAILURE, nenhum retry.1312unit=[131Web,753mobile,414API,3CLI,11monitor] PASS/fail-skip-cancel0; typecheck/build/export/migrationrunner2x/privacy PASS. Às19:57:16.099Z..218Z TODAS4 injeções SQL/HTTP passaram: company-confirm, chat-new-conversation, chat-existing-conversation, replacement-select; cada sequence=1, HTTP500 alvo confirmado, snapshots dos dois tenants íntegros, hooks removidos;3 fases positivas com ACK/persistência/replay contratual/isolamento e políticas/grants/role intactos. Erros ci_notification_insert_failure nos logs primários correspondem às injeções esperadas, não falha do produto. Depois o navegador legado falhou19:58:20.2718881Z em created-team-rendered; CI inteiro NÃO PASS, ProductionTruth posterior não executado. Checkoutbb1aa96df912703f1e33b4532371536272b041fe SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,2190064ea45db4680a8714e381299fef0d5046b0], tree7bed...equivalente, não HEAD literal. PR560 segue DRAFT, sem merge/ready/rerun cego; não emprestar PASS parcial ao browser/pós. Main e PR558 permanecem como acima.

Novo caso distinto, não repetição cega: manager legítimo obtido por signup+convite aceito via endpoints reais (sem seedSQL de papel), mensagem enviada pelo profissional à empresa com DOIS destinatários reais owner/manager. Hook somente desses dois UUIDs+tenant+new_message permite o primeiro INSERT e falha APENAS no segundo. Sequência deve terminar2; dentro do AFTER INSERT a função também exige2 alertas de fixture visíveis antes do erro. Se o contador de linhas divergir, avança um terceiro valor distinguível e falha: HTTP500 genérico não satisfaz o teste. Snapshot posterior deve eliminar AMBOS os alertas, a nova mensagem e efeito de UPSERT, preservando histórico, memberships e outro tenant. Após remoção do hook, controle positivo com UMA nova mensagem/ACK e DOIS alertas persistidos, um em cada inbox autenticado; nenhum algoritmo de retry/idempotência novo. Sem ordem de destinatários presumida.

O hook de batch lê somente os dois destinatários/tenant/tipo de fixture; além dessa leitura fixa, só toca a própria sequência e lança erro. EXECUTE público revogado/search_path fixo; nenhum grant de produto alterado, RLS não desativada, nenhuma migração nem histórico apagado. O conjunto agora tem5 injeções e4 fases positivas cobrindo os mesmos3 sites; isso NÃO implica entrega externa/outbox/provider/push/nativo ou aceite da área9.

5 testes locais de funções reais de guardas/DDL PASS e node--check PASS; a extensão de batch ainda NÃO passou por HTTP/PG/typecheck/CI neste snapshot. Novo HEAD exigirá gates próprios e revisão final10paths/bytes/modes/docs-prefix/tree/ancestrais, APK N/A só por identidade integral dos insumos/grafo. Nenhum aceite antecipado, produção, gasto ou mudança no CI/browser/security para obter PASS. Preparação anterior permanece história; final inicial acima não é gate do próximo HEAD.


---

## Leituras indisponíveis não são contagens zero — regressão funcional — 2026-10-15

Escopo exclusivo MLIVRETRABALHO, áreas1/4/11. Main viva `dd715c6573bcc6d6e5e3c749cc634e276db83ef0`/tree90aec6eeb7e3e0cd8ee853e156c5fd5f9831d1b1 permanece sem novo merge; #555/#556 já integrados, #55848a e #560b421 continuam DRAFT/FAIL. README/DVT originalv1.104, memória/checkpoint/ledger/registry/matriz recuperados em referências imutáveis. Histórico completo da main E apêndices da branch560 mantidos como prefixo literal; incorporar o texto documental da560 não incorpora seu código nem empresta seus gates.

### Falha factual e escopo exato

No job116641822641/CI38798714617 do PR560, Chrome real com API/PG descartáveis mostrou inicialmente Equipes visíveis1 (captura company-a-created, SHA2567e312d732b13f48d90a7d375f23bb6eda168839099b3a8c30238d4e972109acc/133272bytes), depois12leituras indisponíveis e Equipes visíveis0 (failure SHA2564cd6886c31132ec1568c3a2ef4a39fbebd10057a475eb19c8dc7ff0bfb0bbc0f/139867bytes). As duas imagensPNG1365x900 reais foram decodificadas, assinatura/SHA256/bytes/dimensões conferidos independentemente e visualmente inspecionadas neste ciclo. Persistidas com manifesto de proveniência em docs/evidencias/web-section-availability-2026-10-15/. NÃO são capturas do candidato nem provaAndroid/físico/produção. Checkout560 era sintético459b74148b2bcb198462ff4ee513083b8d484f78/treeffc56ceb0a8f678c56ea66c31eb91c7c78840bee com página byte-idêntica à main.

Fonte real apps/web/app/page.tsx: rejeições são convertidas em arrays vazios por readSettledSection; seis contadores .length passam a afirmar0 e cinco ternários.length===0 afirmam ausência de registros, mesmo sem leitura confirmada. Campos administrativos não consultados para manager também eram mostrados como0. A falha é interpretação de disponibilidade no cliente, DISTINTA da causa ainda NÃO esclarecida dos ERR_ABORTED e sem alegar incidente em produção/CORS/vendorbug.

Novas7regressões executam prefixo REALHome, efeitos/API reais e expressões REAIS do JSX(extraídas, não fórmula reescrita), com hooks/transporte/timers explicitamente simulados. Node24.19.0/nativeTSstrip, sem renderReact/Chrome/SQL neste teste: RED0PASS/7FAIL no código original. Cobrem pendente, recuperação de equipe anterior, uma seção falha+11disponíveis, vazio realmente confirmado, fetch/JSON sem resposta/prazo e retorno tardio, contextoidentidade/tenant/papel/revisão antes de efeitos, manager sem consultasadmin, nova leitura explícita. Nenhum POST novo ou retry automático. A fase inicial desta branch publica SOMENTE a regressão e evidências para obter RED primário; correção/CI completo/revisão/merge/pós AINDA PENDENTES.

Correção planejada limitada a metadados por seção e contexto (loading/ready/unavailable/not_requested), mantendo todos os requests/prazos/currents/ACLs/arrays/handlers de escrita. Contadores só podem mostrar número quando ready; mensagens de vazio só após leitura pronta. UI/células/linhas/classesCSS/desenho e conteúdo operacional preservados salvo distinção factual dos estados. Não mudar API, CORS, sandbox, Fetchguard, headers, esquema, React19.1.4/RN0.81.6, lock, native/build/smoke. APK N/A sujeito identidade integral dos inputs/grafo, não ausênciaruns/emprestado. Nenhum aceite novo: sóárea10técnicaaceita,12pendentes. Externos215/219/220/224/228OPEN; nenhuma produção/serviço/custo/credencial/contrato/PSP/dinheiroreal.

### Recibo final560 consolidado sem commit só de metadados

## FINAL VERIFIED — PR560 — 2026-10-15

This section supersedes pending preparation below, not the retained historical receipts. DRAFT/NOTMERGED; NO ready/merge/rerun of completed product failure.
HEAD b421f2f21fc9c6a96a58172436aeeb843abd93fb / tree ffc56ceb0a8f678c56ea66c31eb91c7c78840bee, base/main dd715c6573bcc6d6e5e3c749cc634e276db83ef0.
[OwnCI38798714617/job116641822641](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38798714617/job/116641822641) attempt1 COMPLETE FAILURE, zero retries.1313unit=[131Web,753mobile,415API,3CLI,11monitor] all pass, fail/skipped/cancelled0; typecheck/build/mobile export/migrationrunner2x/privacy PASS. HTTP/browser step FAIL and PostSetupNode skipped; later ProductionTruth NOTexecuted. Unit GREEN is not CI GREEN.

All FIVE actual HTTP/PostgreSQL rollback cases PASS at2026-10-15T20:05:08.7648178Z..20:05:09.0780610Z: company-confirm; chat-new-conversation; chat-existing-conversation; chat-second-recipient; replacement-select. Ordinary hook witnesses1; second-recipient witnesses2 AND both pending alert rows seen before injected error, then BOTH removed by rollback along with new message/UPSERT; prior history and other tenant unchanged, hook removed. Four distinct positive phases PASS with real201 ACK/persisted assignment/membership/interest/replay; message/read; one message/two alerts/inboxes after actual accepted manager invitation; replacement matched/originalcancelled/newconfirmed/resolved/onealert. Full table RLS/policy/grant/runtime metadata unchanged. This proves existing transaction behavior under deliberate failure, not a newly fixed product outage or delivery/outbox/push/provider.

Later20:06:14.5147596Z legacy browser FAILED loaded-dashboard (12 sections unavailable after an earlier created-team/job capture), no cause patch or security/gate relaxation. NO merge/post560 exists. Main stilldd715..., #558 stillDRAFT48a/FAIL. No green borrowing.
Checkout459b74148b2bcb198462ff4ee513083b8d484f78 SYNTHETIC, orderedparents[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,b421f2f21fc9c6a96a58172436aeeb843abd93fb], treeffc56... candidate-equivalent; not literalHEAD.

Review completed for finalhead:10paths/10remoteUTF8exact/modes100755 existingHTTPshell and100644rest;5originaldocs+matrix ORIGINAL FULL prefixes and previous cycle prefixes preserved;484existing non-doc blobs outside HTTP script unchanged, including allapp controllers/services/SQL/JSX/CSS/mobile/native/deps/lock/workflows/Androidbuild+smoke inputs. APK N/A integral protected graph identity, not[]/borrowedAPK. Onlyarea10technicalstandaloneaccepted,12pending/external5open. 5guard/DDLmodels are included in actual415API count; HTTPmarkers are NOT extra unit tests.

Finalreceipt is here; Gitdocs retain truthful preparation and first219 receipt. Consolidate this final b421 receipt only in next FUNCTIONAL cycle with real code/regression, no metadata-only self commit. Original preparation and initial failed run history below retained.

---




## PR #561 — tipagem da regressão — 2026-10-16 UTC

CI38826059900/job116733680298 no HEAD68da0123be6b9abe6ece93fcd84bc835d1ea2204 falhou em Typecheck (TS2345: Array.from inferiu unknown nos resultados VM); Run tests e gates posteriores SKIPPED, portanto NÃO é RED comportamental nem PASS. A fixture agora declara Iterable<number|string> nos contadores e Iterable<string> nas mensagens extraídas do código real. Nenhuma asserção ou código da aplicação foi alterado. Reexecução local dos sete testes na aplicação original: 0PASS/7FAIL por zero/valor antigo em vez de desconhecido; não é typecheck/Chrome. Próximo gate neste commit: typecheck e reprodução CI; sem ready/merge ou rerun cego. Histórico integral preservado. Somente área10 tem aceite técnico interno; doze permanecem pendentes.


## PR #561 — correção candidata dos estados de leitura — 2026-10-16 UTC (15/10 em Brasília)

Reprodução CI REAL no HEAD01cd4bd47fef91498fd1fea80dd4908185310b11: run38831035462 attempt2/job116749859952, Typecheck/Build/export PASS; Run tests FAIL em 2026-10-16T00:45:27.9436458Z..00:45:28.0037936Z com138Web=131PASS/7FAIL. Somente os sete testes novos falharam por zero/valor antigo em vez de desconhecido. Etapas posteriores não executadas não são PASS. Attempt1/job116749612182 falhou ANTES checkout por ECRtoomanyrequests/Data limit exceeded; uma única repetição do job falho no MESMO SHA produziu o RED comportamental. Não repetir a falha de produto para ficar verde. CI38826059900 anterior é falha TS2345 da fixture, não RED de comportamento.

page.tsx passa a guardar estados loading/ready/unavailable/not_requested por índice das12leituras, vinculados a token/identity/tenant/role/revision. Contagem só é fato quando a consulta foi fulfilled; demais estados mostram ‘—’. Cinco tabelas só declaram vazio após fulfilled; antes mostram carregamento/indisponibilidade. Dados antigos não ganham validade sob novo contexto; o prazo15s invalida leitura e respostas tardias não são aceitas. Papéis sem as três consultas administrativas mantêm not_requested, não zero inventado. Sessão, métodos/URLs/headers/cache, Promise.allSettled, ordem das12chamadas, autorizações, ACKs e corpos de TODAS as mutations continuam byte-idênticos. Sem retry automático, política nova, alteração de API/SQL/CSS/mobile/deps/lock.

Os mesmos sete cenários passam localmente; suíte Web completa138/138 (131anteriores+7), zeroFAIL/SKIP/CANCEL. O último cenário agora também resolve uma leitura antiga DEPOIS da recuperação nova, preservando o resultado atual. São expressões e handlers reais executados em VM com hooks/fetch/timers explícitos, não render React/Chrome/typecheck. Não contar modelos como jornadas UI.

Driver de navegador existente ampliado para injeção controlada de UMA GET localhost /v1/company/teams503, com atraso delimitado para conferir loading/‘—’, outras ONZE GETs200 distintas reais API/PG e vaga persistida visível, depois recuperação humana via Atualizar dados exige DOZE novas GETs200/equipe1/zeroPOSTextra. Sem responder mutations fictícias nem desativar Fetch-egressguard/CORS/sandbox/segurança/prazos. O503 é fixture de teste, não outage real. Capturas previstas partial/recovered pertencem ao novo CI somente se observado; as PNGs PR560_B421 preservadas NÃO são da candidata. Browser.getVersion registrado; reload exige timeOrigin novo e readyStatecomplete; logout exige POST201, não preflight204, além do bearer revogado401/outra sessão mesmaidentity200 já exigidos. node --check PASS, mas prova REAL dessa ampliação e CI completo no HEAD FINAL ainda PENDENTES. CausaERR_ABORTED dos PR558/560 NÃO foi corrigida por esta mudança.

Revisão de preparação:12paths anteriores lidos remotamente;8UTF8alterados pela tipagem conferidos byte a byte, PNGs560 comparadas base64 ao log primário e assinatura/SHA256/bytes/1365x900 revalidados; cinco documentos originais+matriz preservam prefixos integrais tanto da main quanto de b421. Todos485blobs não-doc existentes estavam idênticos antes do fix de página/driver. Novo diff final precisará revisão integral e CI; nativeAPK N/A apenas após provar identidade integral dos inputs mobile/native/deps/lock/workflows/build/smoke e grafo canônico. Sem ready/merge antecipado. PR558 e560 continuam drafts não integrados com CI FAILURE; main dd715c6573bcc6d6e5e3c749cc634e276db83ef0 e pós556FAIL não foram reescritos. Somente área10 possui aceite técnico interno; outras12pendentes, externos215/219/220/224/228 separados. Nenhuma operação de produção/dinheiro real/serviço novo invocada.


## PR #561 — recibo próprio0ffd e integridade da observação de POST — 2026-10-16 UTC

CI38831459958/job116750951990 attempt1 COMPLETE FAILURE, zero reruns, no HEAD0ffd05f362591006c20ac935500dd9e7a43dde79.1315unit=[138Web,753mobile,410API,3CLI,11monitor]PASS/zeroFAILSKIPCANCEL; Typecheck/Build/mobileexport/migrationrunner2x/privacy PASS. HTTP/browserFAIL e PostSetupNodeSKIPPED; ProductionTruth posterior NÃO executado. NÃO é CI GREEN. Checkout9b36a6dedf34860b6732f08cf7d19bce7f0f46ad SINTÉTICO paisordenados[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,0ffd05f362591006c20ac935500dd9e7a43dde79], tree8a5eb8baa0dc7555b52a7991db38608c8a582e91 igualcandidata, não HEADliteral.

Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34 observado00:50:39.9866128Z. Login401/sessão/equipe+vaga/persist12345cents/datas e render inicial ocorreram; falha00:51:04.6695171Z no gate‘one unavailable read preserves other real sections’. No refresh de falha, ficaram DOZE seções indisponíveis, não somenteteams. Estado DOM/captura comprova contadores‘—’ e mensagens‘Não foi possível carregar esta seção’, SEMzerosfalsos. Não comprova 11sucessos/HTTP503consumido/recuperação/reload/signout/Bisolation nessaexecução. Não é nova causaCORS/ERR_ABORTED demonstrada: driver anterior NÃOregistrava loadingFailed. ComandoCDPaceito não prova resposta consumida pelo cliente. Nenhuma condição foi relaxada nem a corrida falha repetida cegamente.

CapturasPR561_0FFD em docs/evidencias/web-section-availability-2026-10-15/, manifesto próprio(run/job/head/checkout/tree/resultFAIL):company-a-created SHAd09b6b8c02270257dea1b089185cae7a4ef9ae750abe5001fabed086fc2718d3/131195bytes; failure04ba72a5ccf11f9f5a88a780781d645668474bb0978a69583f75bc808d3ffa6d/136662bytes. Ambas1365x900, assinaturaPNG/SHA256/bytes/dimensões verificadas independentemente; failure visualmente inspecionada. São desta execução0ffd/FAIL, NÃO imagens do próximo head, Android/físico/produção. Histórico560PNG+manifesto intacto.

Nova correção distinta do HARNESS, não tentativa de consertar transporte: gatezeroPOSTextra contava respostasPOST; um requestPOSTsemresposta era invisível. ProbeVM do handler/counter reais reproduz original0(falso-negativo)→candidato1. Agora conta Network.requestWillBeSent POST para origemAPIlocal imediatamente; GET/OPTIONS/POSTWeb não contam. Novo teste regressivo browser-read-wave-writes.test.ts exercita handler/counter REAIS com eventoPOSTpendente e respostasvazias. Sem tráfego real nesses modelos.139/139Web localPASS, zeroFAILSKIPCANCEL (138anteriores+1novo); ainda NÃO é CI/browser do novo head. Os7testesavailability continuam todosPASS e aplicação page.tsx fica BYTE-IDÊNTICA à0ffd.

Diagnóstico passivo ampliado somente para requestsAPIlocais: pathsemquery/método/Network.loadingFailed error enum net::ERR_* sanitizado/canceled/cors enum, semheaders/body/tokens/passwords. MarkerWEB_SECTION_FAULT_CDP_ACCEPTED diferencia aceitaçãoCDP de HTTP503consumido. Nenhuma segurança/Fetch-egressguard/CORS/sandbox/deadlinealterada, nenhuma resposta fake para mutation/elevenotherGETs. Todo caso que falhar permanece exit1; nãoemprestarPASSparcial. NovoHEAD exige própriosCI+revisãoremotafinal antesqualquermerge; manterDRAFTseFAIL. APK N/A identidadeintegral244inputsprotegidos/grafocanônico mobile,483blobsnão-docsexistentesforaPAGE+DRIVERcontinuamiguais. Cincooriginais+matriz porapêndice, sem substituição/resumo e sem commit sómetadados.

MaincontinuaDD715; #558 e560 continuam draftsFAILsemmerge/pós. Somenteárea10aceitetécnico; outras12pendentes. ActivityWatchschedule38827837492/job116739357803SUCCESSmarker00:09:22.9047867ZmainDD715/age571/openPR3/active0; alerta559OPEN, não editadomanualmente; ausência de commit não prova agenteparado. Semprodução/custos/serviços/contratos/PSP/dinheiroreal. ConsolidarresultadofinaldestenovoheadsomenteempróximocicloFUNCIONAL, semcommitautorreferente.


## PR #561 — percentuais indisponíveis não significam ausência de denominador — 2026-10-16 UTC

A captura REAL failure do próprio0ffd/CI38831459958/job116750951990 já preservada neste ciclo também mostra ‘Sem denominador’ sob falha das12leituras. page.tsx usava analytics?.rate==null e confundia analyticsNULL (não lido/falhou) com rateNULL confirmado pela API. Novas2regressões extraem as duas expressões REAIS do JSX e exercitam handlers: pendente/refresh com percentual anterior/analytics503 devem exibir‘—’; analyticsfulfilled comnull mantém‘Sem denominador’, valor0 mantém‘0%’,37.5 mantém‘37.5%’. Antes:8PASS1FAIL no conjunto9availability (7anteriores+2novos), falhaSemdenominadorvs—; depois9/9. SuíteWebcompleta141/141local (131originais+9availability+1guardPOST), zeroFAILSKIPCANCEL; não typecheck/browser/produção.

Correção limitada a dois ternários que exigem sectionReadState(1)ready E analytics presente antes de interpretar o denominador; nada muda nos cálculos/valores/requests/API/headers/contexto/roles/ACK/mutations/SQL/CSS/native/deps/lock. É falha distinta reproduzida na mesma família de disponibilidade, não nova política nem mudança para fazer transporte passar. CI389head(389a7d21534cf42fa20f7b17d9fe618c75f7e973)/run38832096131/job116752936911 estava HTTP/browser EMEXECUÇÃO na consulta00:56:36Z; não foi rerun/cancelado nem tratado PASS. Esse run NÃO inclui o ajuste dos percentuais, cujo próprioHEAD exige novoCIcompleto e revisão. Nenhumresultado de389 é emprestado ao candidato novo. Preparações e recibos anteriores preservados literalmente; se389concluirantes, recibo final sóemPRbody/próximociclofuncional, nãoautocommitmetadados.

PRcontinuaDRAFTsemmerge atéprovas próprias. Outrosgate12pendentes/área10técnica/external215219220224228 preservados; semprodução/custos/contratos/dinheiroreal. A causa das leituras interrompidas continua não esclarecida; este ajuste não é correçãoCORS/Chrome/transporte.


## PR #561 — diagnóstico estruturado da inicialização do navegador — 2026-10-16 UTC

### Reprodução e correção limitada do harness

O próprio HEADf5a0a9c616f1a956e7eb30a0c04170d388a2b0bc falhou no CI38832425218/job116753961589 attempt1: `WEB_BROWSER_STARTUP_DIAGNOSTIC` vazio em01:00:59.8601685Z, seguido de startup timeout15s. Reprodução local executou a Promise REAL original com child/clock explícitos: stderr silencioso produz exatamente o mesmo diagnóstico vazio. Isso não esclarece por que o Chrome não iniciou e não é prova de falha API/CORS/produção.

Novo helper `waitForBrowserEndpoint` mantém prazo15000ms e falha fechada, mas observa spawn/exit/error/PID/exitCode/signalCode/killed/nome do binário, quantidade de bytes de stdout/stderr e apenas presença/validade do DevToolsActivePort do perfil descartável próprio. Flags sanitizadas de stderr; sem texto bruto, diretório do perfil, endpoint/UUID de depuração, credenciais, headers ou bodies. `stdout` e arquivo de porta são SOMENTE diagnóstico, nunca substitutos de readiness. A única readiness continua um endpoint stderr loopback real e validado; host externo/userinfo/query/hash/path inesperado são recusados. Não há nova porta exposta, grant de permissão, disable de Fetchguard/CORS/sandbox, timeout maior, retry ou alteração de browserflags.

Quatro regressões executam o helper REAL com EventEmitter/streams/clock/file fixtures explícitos: timeout silencioso ainda falha em15s com metadados, endpoint stderr fragmentado válido resolve sem timer/listener residual, stdout/porta/endpoint externo não geram falsoPASS nem vazam texto sensível, spawnerror/earlyexit falham imediatamente e limpam prazo/listeners. 4/4 PASS local, node--check PASS; suíte Web inteira145/145 (141anteriores+4), zeroFAILSKIPCANCEL. NÃO é Chrome real/typecheck/CI próprio, e não é correção comprovada da causa de startup nem do ERR_ABORTED anterior. Aplicação page.tsx/handlers/API/SQL/JSX/CSS/deps/lock/mobile continuam byte-idênticos a f5. Novo CI do novo HEAD é obrigatório e ainda PENDENTE nesta preparação. Uma eventual execução verde não explica falhas intermitentes antigas.

### Recibos finais anteriores consolidados neste ciclo funcional

| HEAD | CI próprio / job / attempt | Resultado real e limite |
|---|---|---|
| f5a0a9c616f1a956e7eb30a0c04170d388a2b0bc | 38832425218 /116753961589 /1 | FAILURE, zero retries.1318unit=[141Web,753mobile,410API,3CLI,11monitor]PASS, fail/skipped/cancelled0. Typecheck/build/export/migrationsrunner2x/privacyPASS; HTTP/browserFAIL/PostSetupNodeSKIPPED/ProductionTruth posterior NÃO executado. Nenhuma versão Chrome/DOM/PNG/jornada observada nesse HEAD. |
| 389a7d21534cf42fa20f7b17d9fe618c75f7e973 | 38832096131 /116752936911 /1 | SUCCESS,1316unit=[139Web,753mobile,410API,3CLI,11monitor], zeroFAILSKIPCANCEL/todos18steps. ProductionTruth00:57:07.6734810Z. Browser partial503/recovery PASS00:56:21.0769921Z e journey00:56:21.4874099Z. Prova do389, não f5 nem novoHEAD. |

f5 checkoutfc734c28f3c9ad4f0bc7dc4e3fd7e580d60fe114 SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,f5a0a9c616f1a956e7eb30a0c04170d388a2b0bc], treec1d377f3cb283cf2317d2366c7051e81bc1a5b49 igualcandidata.389 checkout20dc2aa779ca00e9bd6940051ed6b3fcbc9d7350 SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,389a7d21534cf42fa20f7b17d9fe618c75f7e973], treec4dbd7c7e1825f1eeb8f9456116870f00071e446 igualcandidata. Nenhum é HEADliteral. Nenhum merge/pós561 existe neste snapshot; não repetir ready/merge/rerun de falha concluída para ficar verde.

389 Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34: uma GETteams503 consumida por fixture local,11outras GET200 reais distintas, loading/unknown, recuperação humana via Atualizar dados exige12NOVASGET200/equipe1/zeroPOSTextra desde ENVIO. Login401/vazio, equipe+vaga reais/persistpay12345/datas/render, reloaddocumentonovo/timeOrigin+readycomplete, logoutPOST201 (nãoOPTIONS204), actualbrowserbearerGETme401/outrasessãoMESMAidentity200/Bisolado. Não é Android/físico/SecureStore/VisualTruth/piloto/produção nem prova de causa do transporte.

Cinco PNGs primários389 recuperados novamente do log116752936911 e persistidos em `docs/evidencias/web-section-availability-2026-10-15/PR561_389_*` com manifesto de HEAD/checkout/tree/run/job/resultadoSUCCESS, bytes/SHA256/dimensões1365x900. Assinatura/bytes/SHA/dims verificadas independentemente; frames partial/recovered inspecionados. São do389, NÃO f5 nem próximoHEAD. Capturas560/0ffd/recibos históricos permanecem intactos, inclusive falhas. Não há imagem nova inventada nem commit somente de metadados: este ciclo muda código de diagnóstico e regressões.

### Gates preservados

Cinco documentos originais+matriz recebem somente este apêndice, mantendo todos os prefixos e estados históricos. Main dd715c6573bcc6d6e5e3c749cc634e276db83ef0 inalterada, PR558/560/561drafts; novos SHA/tree/CI precisam revisão de bytes/modes/pais/árvore/ancestrais, ownCI completo e, somente se justificado e GREEN, merge único expectedSHA e pósCI REAL com browser novamente. APK N/A deve ser comprovado por identidade integral de mobile/native/shareddeps/lock/workflows/build/smoke e grafo Android, não ausência de runs/artefato emprestado. React19.1.4/RN0.81.6, RLS/tenant/produção preservados. Sóárea10 tem aceite técnico interno;12outraspendentes, externos215/219/220/224/228 separados. Sem produção, custos, novos serviços, credenciais, contratos, PSP ou dinheiroreal. Bloqueio parcial do navegador não fecha nem bloqueia automaticamente as outras áreas.


---

## Ciclo funcional — 2026-10-16 UTC — ordenação cronológica profissional (reprodução em preparação)

Escopo exclusivo MLIVRETRABALHO; base main429dcba6287e95ca4e804d9452a2e7c0b21fedd8/treec0fb1ba376cb5a7d6089601f7ac4a2910b8149ca. Documento originalv1.104 e históricos integrais preservados por apêndice. PR561 jámerged;558879/560e47 drafts com CI FAILURE, não repetir ready/merge/rerun. Sóárea10 tem aceite técnico interno, outras12pendentes; gatesexternos215/219/220/224/228 separados.

Auditoria de Perfil→passaporte→API e Agenda/Ganhos identificou que WorkAssignments.mine, WorkPassport.mine e Earnings.mine mesclam slices tenant e ordenam String(timestamp).localeCompare, enquanto DatabaseService usa pg.Pool padrão, sem parsercustom. Exemplo local de Date válido Wed2026-10-21/Thu2026-10-22 retorna ThuantesWed na ascendente e WedantesThu na descendente. Isso é hipótese de ordenação no transporte real até a reprodução HTTP/PG, não incidente de produção/UI/segurança provado. Nenhuma correção foi aplicada nesta preparação. O possível parsercalendário permissivo de Perfil não foi alterado neste ciclo.

Nova fixture scripts/professional-chronology-e2e.cjs cria identidades/duasempresas/profissional+outsider por HTTP real, perfil/disponibilidade/interesse/confirmação/lifecycle completo por HTTP, com ledger interno simulado (não PSP/dinheiroreal). Só depois de vincular cadaUUID HTTP aoPG, ajusta completed_at/ledgercreated_at APENASdos registros próprios recémcriados a timestamps controlados Wed/Thu. DMLfixtureadministrativa em databaseCIEXATA mlivretrabalho_http/hostloopback/portaexplícita, rejeitaquery/hash/override eorigensAPIexternas; nãoDDL/RLSdisable/grantsrelaxados/históricodeletado/reparent/produção. Mede instanceofDate real em startsAt/completedAt/createdAt do pg e exige ordenação global ascassignments/descpassport+earnings; tenta todos3 e agregaFAIL. Controles tenantselecionado/outsider/401/contadores/valores intactos. ApósPASS, respostasHTTP também passam nos loaders mobileREAISloadAgenda/loadWorkPassport/loadEarnings viaNodeTSstrip+VM; isso NÃO é renderRN/Android/SecureStore/físico.

O HTTPjourney existente recebe só comentário+node antes do browser; TODOSasserts anteriores e gates503/recovery/ACK/logout/isolamento permanecem. CI REDreal aindaPENDENTE; node--check localPASS não éCI/PG/provaHTTP. Originais5docs+matriz recebem este apêndice, sem resumos substitutivos. Antesdefix: exigirprimaryHTTPPGRED comtiposobservados; depoisregressões/código/evidência, exactHEADfullCI, revisão bytes/modes/tree/ancestrais e seGREENjustificado mergeúnicoexpectedSHA+pósREAL. APK N/A dependeidentidadeINTEGRALmobile/native/deps/lock/workflows/build/smoke+grafocanônico, não[]/ausênciaruns/APKemprestado. React19.1.4/RN0.81.6/RLS/design preservados. BloqueioWebparcial nãoautoriza bypassnemparalisaoutrasáreas.


### Correção da guarda da fixture, não RED de produto — 2026-10-16 UTC

Run38852719713/job116817292055 attempt1 noheadf63d37b3f09ff01e51245d8a7ed64c939fa385e8 terminouFAIL antes de criar fixtures: o teste exigia inet_server_addr() loopback, mas esse campo é a interface do servidor dentro do containerCI, não o peer do socketcliente publicadoemlocalhost.1322unitanterioresPASS/typecheck/build/export/migrationsprivacyPASS; falha04:53:43.1284710Z nessa assert, semPROFESSIONAL_CHRONOLOGY_PG_TYPES/OBSERVED e semREDordenaçãoobservado. Não éinfraECR/nãoretry/nãoprodutoprova.

A configuração continuaexigindo CI+URLPostgreslocalhost/portaexplícita/databaseEXATAmlivretrabalho_http/semqueryhash+APIorigemlocalhost. A correção verifica o peerREAL db.connection.stream.remoteAddress como127.0.0.1/::1/IPv4mappedloopback e current_database() exato; endereço do ladoSERVIDOR é somente diagnóstico primitivo comsocketpeer, nunca autorização parahostexterno. Semalterarserviço/Docker/network/credenciais/RLS/grants/CORS/sandbox/deadlines/produção. Fonteprimária PostgreSQL17functions-info descreveinet_server_addr comoendereço noqualSERVIDORaceitouconexão; NodeNETsocket.remoteAddress descrevepeerremoto do socketcliente. Referências https://www.postgresql.org/docs/17/functions-info.html e https://nodejs.org/api/net.html#socketremoteaddress . NovoheadCI aindaPENDENTE, sememprestarPASSouRED. Correçãodeguardacausalàfalhaprimária, nãoreruncego.



## Correção candidata com RED HTTP/PG comprovado — PR563 — 2026-10-16 UTC

### Reprodução primária (não navegador/produção)

Head50e30f1abf5264c6a452cb60ca4dfd0d058ab0cb/tree0797fe32273ffb34aa38a6289c8941865912b366, CI38853092004/job116818434421 attempt1 FAILURE semretry.1322unitanteriores=[145Web,753mobile,410API,3CLI,11monitor]PASS/zerofail-skip-cancel/typecheckbuildexportmigrationsrunner2xprivacyPASS. Às04:58:03.1949187Z contextoPGreal{name:mlivretrabalho_http,serverAddress:172.18.0.2/32,clientSocketAddress:::1} confirmouportmappinglegítimo; guardaexatasocketloopback/bancoPASS. Às04:58:03.6689870Z PROFESSSIONAL_CHRONOLOGY_PG_TYPES dateObjects=true para startsAt/completedAt/createdAt, sem parsercustom em DatabaseService. Doisassignments própriosHTTP c99c110d-ad39-4eb5-880a-2f76e3a2e38f(A) e8749a167-115e-4a2b-869b-20e346c37402(B), starts2026-10-21/22T12:00Z e completionsfixture2026-10-14/15T12:00Z. São datascontroladasdeCI, NÃOatendimentofísico/diasreaisdo usuário.

04:58:03.7178193Z /assignments/mine esperava[A,B] masHTTPretornou[B,A].04:58:03.7180264Z /work-passport/mine esperava[B,A] masretornou[A,B].04:58:03.7182166Z /earnings/mine esperava[B,A] masretornou[A,B]. Todos3pass=false, erro agregado3 às04:58:03.7215446Z. Isso mede FALHAORDENAÇÃOHTTPreal noSQLefêmero, nãoexploit/vazamento/incidenteprodução. O browser NÃOchegouaexecutar: a nova regressão falhouantes dele, sem confundircomERR_ABORTED antigo. Controles anteriores1tenant/outsider/401/contadores/valores passaram antes dasassertsordenação; loadersmobileexecutamapenasapósordemPASS, portanto NÃOprovarpassagedestesnesteRED.

Primeiroheadf63/run38852719713/job116817292055 falhou na guardaerradaantesdefixtures, comoapêndiceanterior; NÃOéREDproduto. Novohead50 mudouessa guarda comcausaobservada,não repetiujobcego. Ambosattempt1, zeroreruns.

### Alteração de produção mínima

Novo compareTimestamp em apps/api/src/timestamp-order.ts compara milissegundos de Date/ISO, preservaepochzero/instantespré1970/offsetsequivalentes, paresausentesestáveis e valoresausentesporúltimo. Cadaumdos3controllersmuda SOMENTEimport+expressãocomparadora: assignments ASCstartsAt; verifiedHistory DESCcompletedAt antesdocorteglobal50; earnings DESCcreatedAt. SQLliteral/parâmetros/projeções/DTOs/serializaçãodatas/ACL/membershipfilters/tenantRLS/papéis/lifecycle/ledger/valores/ACK/escritas permanecem BYTE-IDÊNTICOS. Não reordenarpor rótulododia/localidade e não inventar datas. Nada no mobile/JSX/layout/payload/deps/lock/workflows/native é alterado.

13regressões API reais:3Dateobjectsordenação+3null/autoridade,1corte50entre2slices26+26(controlesbounded, nãoprovatodahistóriaSQLarbitrária),3comparador(epochpré1970/offset/equivalência/ausentes),3guardasfixtureCI/URL/socket. ExecuçãoLOCALNode24stripTypeScriptTypes+VMcomcontrollersREAIS: baseline6PASS7FAIL→candidata13/13PASS; isso NÃOtypecheckCI/HTTP/renderAndroid. Separadamente, noGREENHTTPa fixturepassa JSONreal doAPI nosloadersmobileREAISloadAgenda/loadEarnings/loadWorkPassport e exigeordem/membership/valoresinalterados; não é tap/renderRN/SecureStore/aparelhofísico. A refatoraçãoda guarda porfunçãoexportada preservaasmesmascondiçõesSocket/banco e ganharegressãoespecífica, sem permitirotherpeer/database.

### Consolidação factual de outros ramos, sem emprestar PASS

Main429dcba6287e95ca4e804d9452a2e7c0b21fedd8/treec0fb1ba376cb5a7d6089601f7ac4a2910b8149ca,pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,b23c2de96a8e51ea75159bbc8faf23668928ef75],561jámerged/NÃOrepetir. Own561b23CI38837907503/job116771049592 SUCCESS1322/todossteps+Chrome503recovery8jornadas; post56138838523471attempt2/job116773347723 FAILURE1322unitPASS+browser12GETERR_ABORTED, nãoPASS. Old560e47CI38838893368attempt2/job116774688695 FAILURE1327unitPASS+TODOS5HTTPPGrollbacks/4positivasPASS+browserFAIL; continuaDRAFT/semmerge. Nãoinventar defeito transacional/provider/outbox/retry/entrega nemconfundirtentativasECRantescheckoutcomproduto.

558HEAD8793af936a72f260af60894740145c720a5ba649/tree1c8cfe6b579629829f73ba71ef91553993a63ca3, CI38842653055/job116786029336 attempt1 FAILURE1347=[170,753,410,3,11]unitPASS/typecheckbuildexportmigrationsprivacyPASS;HTTPbrowserFAIL/ProductionTruthposteriorNÃOexecutado. Checkout21083f147c2a5a460c6ce783ae8b06263088b9ab SINTÉTICO[429dc,879]treeigual.8mínimos:4concurrentPASS27JSON+PGpersist;serialbaseline/instrumentedPASS,seriallog-only/native-only12GETERR_ABORTED/canceledtrue/corsnull+3OPTIONSprotocolerror-32602cada.6PASS6FAILnos12controles+mainFAIL=13casos6PASS7FAIL, sticky1.4UIconcurrentFAIL emrefresh1/refresh3/reload4/teamrender; semerroscontinuação/sessionmismatch/redirectobservado nessas4falhas. Main503REALconsumido+11GET200/partialDOMcorretos, recuperaçãohumanafalhou12GETabortados. TODOS13Chrome155.0.8059.39;semstartupfalhanessacorrida NÃOprovacausastartupcorrigida. SerializarACKNÃOéremédio,semcausaChromium/CORS/APIdefinitiva. Nãoready/merge/rerun879cego,588permaneceDRAFT; não desabilitarFetchguard/CORS/sandbox/LNApermissões/prazos/browserflags/imagensparaobterverde.

17PNGs879 primários recuperadosnovamentedolog116786029336, assinatura/SHA256/bytes/1365x900 conferidos. Persistidos neste cicloFUNCIONAL em docs/evidencias/web-browser-2026-10-16/pr558-879-* com PR558_879_CHRONOLOGY_CYCLE_PROVENANCE.json contendoHEAD/checkout/tree/pais/run/job/attempt/resultFAILURE/scenario/observer/continuation/sourceDriver. Primeiros13doscontroles,últimos4domaindriversemmodificação. Partiale136927cc452a3dd331c7e763da07293937257636f01bf4c63b56229a14ac130/139917 e failure3f072c398ac416b4f2ab336ba920d2a8e199c022cde597e55c68cd3d206025d7/132025 inspecionados no cicloanterior; não frames563 nemPASSemprestado. 5framespost561/own560anteriorespersistemnoGit558879comproveniência própria, nãoalegarquejáerammain. Nenhumcommitapenasimagens/metadados, pois estecicloalteracódigo/regressão/fixture.

### Gates do próximo HEAD

CIpróprioDACANDIDATA aindaPENDENTE ao registrar, não declarar423API/1335total/PASSatémedir. Exigirtypecheck/build/export/migrationsprivacy/HTTPPGnovo+BROWSERoriginalintacto, reviewbytes/modes/tree/parents/ancestry/base/head/main frescos; mergeONLYGREENjustificadoexpectedSHAúnico,pósCIrealnovamente. APK N/AdependeidentidadeINTEGRALmobile/shareddeps/native/rootdeps/lock/workflows/build/smoke+grafocanônicoexpo-mobileprebuildGradle, não[]/runemprestado. Originais5docs+matrizprefixosíntegrosappend-only; todosPENDENTEShistóricospreservados,nãoestadocorrentefinal. Sóárea10AndroidstandaloneTÉCNICOINTERNO aceita,12pendentes; esta correção não fechaáreas3/6/11integraisnemjornadasAndroid/físico/VisualTruth/SecureStore/piloto. Externos215/219/220/224/228OPEN, semserviços/custos/credenciais/produção/PSP/dinheiroreal. Issue562activitywatchOPENnãorequerescritamanual/commitartificial. Preservarúnicarotinaenabled/schedule,nãocriaroutra/nãodesativarparcialmente.
