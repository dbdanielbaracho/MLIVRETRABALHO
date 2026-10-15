# Atualização de estado corrente — 2026-10-14

> Esta seção supersede somente a referência de base temporal do texto histórico abaixo. O conteúdo original da matriz foi preservado integralmente após esta seção; a matriz continua sendo auditoria, não declaração de aceite.
>
> **Main corrente:** `bf65dc52d0ab8f493b7265cb50e1722d53df4c4e`.
> **Integrações refletidas:** #522, #523 e #524, conforme o recibo abaixo.

# Matriz de fechamento — 13 áreas internas — 2026-10-13

**Natureza:** auditoria de evidência, não declaração de aceite. Referências: Documento da Verdade original v1.104, CHECKPOINT_EXECUCAO_AUTONOMA, REQUIREMENTS_LEDGER_DELTA, EVIDENCE_REGISTRY, PRs já integrados até #518, issues abertos. Base da análise: `main` `afe80cb29ed7d6dd754e790ac6ac7cbea33c89dc`. Não substitui os documentos normativos.

**Regra de encerramento:** marcar CONCLUÍDO INTERNO apenas após confronto requisito↔implementação↔testes↔CI do HEAD e pós-merge↔evidências; quando aplicável, APK standalone/emulador por SHA. Nunca converter testes simulados em prova física. Esta matriz não aprova dinheiro real, produção, pentest, provider ou piloto.

| Área | Implementação/evidência já disponível | Verificação necessária para aceite interno |
|---|---|---|
| 1. Telas/layout/navegação | Mobile com testes de telas/handlers e Web empresarial; PRs de deadline, contexto e seleção já integrados | Percorrer telas/estados originais, confrontar layouts e funções por plataforma; identificar divergências concretas com regressão; Visual Truth físico fica EXTERNO |
| 2. Signup/login/auth | Web: #500 sessão armazenada, #501 tenants duplicados, #502 resposta login, #503 storage bloqueado, #504-505 falhas/prazo | Verificar fluxos de signup/convite/expiração/revogação e troca de tenant por API e cliente; nenhuma permissão inferida |
| 3. Profissionais/agenda | Testes mobile e handlers de prazo da agenda, disponibilidade API #516 | Cobrir API/cliente da agenda, trabalho, presença e avaliação no mesmo owner/tenant e concorrência; dispositivo físico EXTERNO |
| 4. Empresas/equipes | Web: equipes, membros, vagas, concorrência e validações #512/#513/#517; API empresarial com testes | Checklist de métodos/ACK, papéis owner/admin/manager/company, convites, contexto, prazos e estados vazios/erro |
| 5. Matching/alocação/substituição | Rotas e confirmações humanas com testes, contexto multi-tenant | Revalidar idempotência, concorrência, disponibilidade, escolha humana e vínculo empresa-profissional |
| 6. Pagamentos simulados | Reconciliação/eventos em leitura e controles FIN-RISK isolados | Provar ledger simulado, split teórico, rollback, reembolso/saldo negativo sem PSP real; sandbox/provider/KYC EXTERNOS #215/#228 |
| 7. PostgreSQL/RLS/tenant | CI com migrações/HTTP/Postgres; índices/UPSERT concorrentes #509/#511 | Auditar todas as tabelas/endpoints, políticas deny-by-default e isolamento entre tenants e papéis com E2E adversarial |
| 8. Segurança interna | Testes de autorização, trust/safety e prazos; #509/#511 corrigem corridas | Cobrir auth, concorrência, PII, rate limit, logs, retries e falhas; pentest independente/provider privacy EXTERNOS #219/#220 |
| 9. Notificações | Fluxos de mensagens e notificação contemplados em #509, testes existentes | Auditar outbox/ACK/duplicidade, entrega, não-entrega e isolamento com falhas simuladas; provedor externo se aplicável separado |
| 10. Android standalone | Registros de CI/emulador DEVICE_SMOKE_OK sem Metro e APK por SHA em checkpoints | Revalidar entradas native/build após mudanças, smoke no SHA aplicável; dispositivo físico, SecureStore nativo e piloto EXTERNOS #220 |
| 11. Backend/API | Correções #509, #511, #514 e #516, CI API 392 testes no recibo #517 | Inventariar endpoints e contratos por fluxo, testes de entradas inválidas, autorização, ACK, concorrência e APIs necessárias não implementadas |
| 12. Documento da Verdade | Documento original v1.104 e apêndices, ledger/checkpoint/registry; atualização #518 | Conciliar requisito↔PR↔CI/pós-CI↔teste↔lacuna, preservando integralmente arquivos originais; não reinterpretar snapshot histórico como estado corrente |
| 13. CI/PR/automação | Gates completos no recibo #517; monitor main push #508 e automação horária | Confirmar cobertura CI/Android por tipo de mudança, proteção merge, activity watch e ausência de aceites antecipados; rotina horária NÃO é agente 24/7 |

## Dependências externas — não classificar como pendência interna resolvida

- #215: FIN-RISK, custos, compliance, PSP e sandbox;
- #219: TRUST, fornecedores, privacidade runtime e pentest;
- #220: Android físico/E2E, distribuição/piloto e pentest independente;
- #224: implantação complementar Web paga/condições externas;
- #228: due diligence de fornecedores PSP/KYC.
- Activity Watch: alerta de inatividade é monitoramento, não execução autônoma de código. Revalidar issue se aberto, sem tratar commit artificial como progresso.

## Sequência executável, sem depender de fornecedor

1. Reconciliar por área a evidência dos testes e definir faltas *específicas* a partir do código real, sem criar recursos por hipótese.
2. Reproduzir cada defeito por teste adversarial ou verificação real, corrigir de modo minimalista e registrar contrato/evidência.
3. Verificar CI no SHA exato, revisar diff, integrar somente aprovado e exigir pós-merge. Repetir por falha comprovada.
4. Alterar o estado de uma área de **ACEITE PENDENTE** para **CONCLUÍDO INTERNO** só quando todas as evidências correspondentes estiverem rastreáveis. Nesta versão: **13 áreas com aceite ainda pendente de reconciliação; nenhuma é declarada integralmente aprovada**.

**Não executar:** nova despesa Railway, produção, transações reais, contratos externos, pentest por conta própria ou testes físicos não realizados. Preservar React 19.1.4 / RN 0.81.6, lockfile, tenant/RLS e Documento da Verdade original.


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

## Reconciliação factual corrente — PR #528 — 2026-10-14

A base temporal histórica acima é preservada. A referência corrente é a `main` `fdef52f7fd61779c378294d0555e01b4db610e94`, árvore `73bfe5be8f54f988cf4e9d60334fb71a9c69547d`. O PR #528 foi integrado após CI próprio SUCCESS no head `c821e7b1fdf9a3f7e594384237154091c6136885` (run `38593259613`) e pós-merge CI SUCCESS no SHA real (run `38594046674`), com Activity Watch SUCCESS (run `38594046648`). A mudança corrige leituras independentes do dashboard Web e seus harnesses; não altera mobile/native/dependências/build/smoke, portanto APK não é aplicável por identidade dos insumos protegidos. As 13 áreas continuam pendentes de aceite independente; nenhum gate externo foi encerrado.


---

## Reconciliação factual corrente — PR #530 — 2026-10-14

A referência corrente é a `main` `6b736fda484aa7a72ffada15560bb32e6fe3db68`, árvore `1926803e965701f0fcc191666f4fb73df0e60fbc`, com pais ordenados `fb19fd936011a6f412739814896b7ef13b4d2ca7` e `0de4ea4dc35efb7f802a25b5f874044bab54be70`. O PR #530 preservou candidatos quando uma leitura de recomendações falha, substituindo `Promise.all` por `Promise.allSettled`, usando os helpers de leituras independentes e mantendo a proteção contra contexto antigo, troca de vaga/tenant, prazo e ausência de reenvio automático.

O CI próprio no HEAD exato `0de4ea4dc35efb7f802a25b5f874044bab54be70` foi SUCCESS no run `38609828461`, após alinhar a regressão do harness ao erro parcial real de duas consultas. O pós-merge CI no SHA real `6b736fda484aa7a72ffada15560bb32e6fe3db68` foi SUCCESS no run `38610522373`; o Project Activity Watch foi SUCCESS no run `38610522341`. A alteração foi exclusivamente Web/teste/evidência; mobile/native/dependências/lock/build/smoke não mudaram, portanto APK é N/A por identidade dos insumos protegidos. As 13 áreas continuam pendentes de aceite independente e os gates externos #215/#219/#220/#224/#228 permanecem separados.


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
