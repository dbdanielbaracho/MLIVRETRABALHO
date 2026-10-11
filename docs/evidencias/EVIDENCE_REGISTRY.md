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
