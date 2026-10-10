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
