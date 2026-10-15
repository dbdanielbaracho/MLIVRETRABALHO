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


