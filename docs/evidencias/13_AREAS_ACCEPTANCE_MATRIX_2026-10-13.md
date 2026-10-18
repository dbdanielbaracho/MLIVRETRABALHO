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


## Cronologia de segurança, recursos e exceções — preparação de reprodução — 2026-10-16 UTC

Escopo exclusivo MLIVRETRABALHO. Main fresca a699fd0f26d12ba604cc5110e507adf231f120e1/treec73498cf7932994d4847b3a3b28ef80a6b36f869. Código atual SafetyCasesController.mine e SafetyAppealsController.mine agregam slices tenant e ordenam String(Date).localeCompare DESC; SupportController.exceptions prioriza overdue e ordena String(Date).localeCompare ASC. Probe LOCAL com classes reais NativeTSstrip+VM e fixtures explícitas DB/auth/Date reproduz três ordens incorretas (14quarta/15quinta outubro2026), NÃO HTTP/PG/produção/exploit. Nenhum defeito de autorização, política SLA ou evento demonstrado.

Nova fixture scripts/safety-support-chronology-e2e.cjs exige as guardas CI/localConfiguration/peerLoopback/bancoEXATOmlivretrabalho_http já existentes563, carrega pg somente após validar origem e banco, cria contas/associações por signup/profile/availability/job/interest/confirm reais, cria relatos/recursos/suporte via HTTP. Vínculos completos tenant+identity+assignment+parent+marcador conferidos no PG ANTES de mudar apenas created_at de SEIS registros novos próprios; nunca eventos, grants, RLS ou histórico anterior. App_runtime continua sem UPDATE/DELETE em appeals/events. Revisão humana real de recurso + repeat changedfalse/eventoúnico, slices de cada tenant/outsider401/professional403/admincross401, prioridades overdue/recente e snapshots tabelas/policies/ACLs fazem parte dos gates. Admin DML é fixture efêmera, NÃO nova capacidade runtime nem reescrita de histórico de usuário. Sem serviços/custos/produção/provider/PSP/dinheiroreal. Nenhuma migração/dependência/lock/Android/browser/security alterada. Fixture roda ANTES do browser original, mantendo todos asserts originais. Primeiro CI desta preparação ainda PENDENTE, não há RED HTTP, fix ou PASS publicado desta hipótese.

### Recibo final563 consolidado neste ciclo funcional

#563 jáMERGED, NÃO ready/merge/rerun. Head dad8c7d0b412cd833428e9657588043a3168be62; main/mergea699fd0f26d12ba604cc5110e507adf231f120e1/treec73498cf7932994d4847b3a3b28ef80a6b36f869/paisordenados[429dcba6287e95ca4e804d9452a2e7c0b21fedd8,dad8c7d0b412cd833428e9657588043a3168be62]. Own38853511354/job116819752463attempt1SUCCESS1335=[145Web,753mobile,423API,3CLI,11monitor],zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth05:04:55.2998589Z. Checkout4ea1971e4833a10da26373f850ca2a6aee6be56b SINTÉTICO[429dc,dad8]treeigual,nãoHEADliteral. POST38854119764/job116821643560attempt1SUCCESS1335/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth05:11:43.2603463Z; checkoutLITERALa69905:07:33.9226647Z. Zero retries.

3ordens reaisHTTP/PG e Dateobjects comprovadosRED50(run38853092004/job116818434421)→OWN05:03:08.0911572Z→POST05:09:57.8697266Z(PROFESSIONAL_CHRONOLOGY_PASS). Loaders mobile reais recebemJSONreal e preservamordem, nãoAndroidrender. Own+POSTChrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34 passaram503fixtureconsumido/11GET200outros/refreshHUMANO12GETnovos/team1/zeroPOSTextra e8jornadas, logoutACTUALPOST201/notOPTIONS204/browserbearer401+outrasessãoMESMAidentity200/Bisolado. Ownmarkers05:03:45.1905639Z/05:03:45.8042518Z; POST05:10:36.8402689Z/05:10:37.4576642Z. Não causa/remédio doERR_ABORTED anterior,558continuaDRAFT. APKN/A563 poridentidadeINTEGRALmobile/native/shared/rootdeps/lock/workflows/build/smoke+grafocanônico, NÃO[]/APKemprestado. ÚltimoAPK542SHA63340145d7688ac08f161be8db418d789e81ec89 nãoé563.

Recibo completo PRbody563 gravado/re-lido exato11035chars; fontes primárias jobs acima recuperadas novamente neste ciclo. DezPNGs OWN+POST563 serão preservados comproveniência própria no ciclo funcional, nãoframesdesta nova hipótese. Cincooriginais+matriz/históriaINTEGRAL preservados porapêndice. Errata explícita: antigo'588DRAFT' significa558 (nãoPR588observado/criado); marcadorprimário éPROFESSIONAL_CHRONOLOGY_PG_TYPES (nãoPROFESSSIONALtripleS).

ActivityWatch38854119812/job116821643905SUCCESSPUSH05:07:22.8856593Za699age0/openPR2/active1; issue562fechada05:07:23Zgithub-actions[bot]/comment6208529784comSHAa699, semissuewrite manual. FreshOPEN558head879/560heade47 DRAFTFAIL+externos215219220224228. Não emprestar563PASSaeles/não reruncego. Somenteárea10AndroidstandaloneTÉCNICOINTERNOaceita,12pendentes; esta investigação nãoaceitaáreas8/11integraisnem13áreas. Rotina única existenteenabled/scheduleinalterados; não criar/desativar porparcial. CIProductionTruthlocal nãoédeployprodução. Gates próprios e pós-merge da nova fatia só se justificada+GREEN/reviewdiffbytesmodestreeparents/mainbaseheadfrescos+EXPECTEDSHAúnico.


## RED HTTP/Postgres real e correção candidata — PR564 — 2026-10-16 UTC

HEAD de reprodução0d8d8a469f6f2979da4c54211bdea19fc4e64619/treecd6a95c5e63dfed69471ec528aaad396aec9e76f/parenta699. OwnCI38858060780/job116833876085attempt1COMPLETEFAILURE,zero retries.1335unitanteriores=[145Web,753mobile,423API,3CLI,11monitor]PASS/zeroFAILSKIPCANCEL/typecheckbuildexportmigrationsrunner2xprivacyPASS. HTTPfalhouNA NOVA REGRESSÃO, nãoChrome/ECR. Browser eProductionTruthposterior NÃOexecutados, PostSetupNodeskipped. Primary05:54:45.2974558Zguardabancocontextoclient::1;05:54:45.6934736ZactualpgDateObjects=true(3campos). CasosA8a36f981-e567-4be0-a37a-38575e95ce4f/B7497be81-7d46-482b-a8d9-5bec89f74b83, recursosA7ee274f0-b936-4a1b-b165-879f1583fee0/B8b55f336-b493-4867-a08a-9b726a68a40a, suporteA0d6ee73d-94e7-410e-b648-4e5e7562c665. Datas14quarta/15quintaOct2026.

05:54:45.7298221Zsafety-casesrealHTTPesperado[B,A],retornou[A,B].05:54:45.7300991Zsafety-appealsesperado[B,A],retornou[A,B].05:54:45.7303874Zexceptionsesperado[caseA,supportA,recenturgent004f27f1-eec5-4f5c-adc1-870b9d8e4904],retornou[supportA,caseA,recenturgent]. Todos3pass=false; agregadoerro05:54:45.7331563Z. Controles executadosantesdasassertsordem: snapshots5tabelas/2tenants/eventosimutáveis/policiesACLiguais, recursoHTTPreviewing+replaychangedfalse/atorreal, overdueTRUE/urgentrecenteFALSE, scopedtenant/outsider401/professional403/crossadmin401. NãoéHTTPexploit/vazamento/CORS/incidenteprodução; apenasordemdefatosnaAPIefêmera.

Correção candidata SOMENTEimport+expressãocomparadora em SafetyCasesController.mine/SafetyAppealsController.mine(DESCcreatedAt) e SupportController.exceptions(ASCcreatedAtDEPOISdoMESMOpredicadooverdue). Reutiliza compareTimestamp de563inalterado, semSQL/DTO/projeções/parâmetros/headers/ACL/roles/contexto/status/eventos/retention/SLA/ACK/escritas/UI/mobile/deps/lock/native/workflowalterados. Reverse-substitution comprova3sourcesoriginaisBYTE-IDÊNTICOSforaimport+comparador. Oito regressões comcontrollersREAIS:2ordenaçãopgDate+2nullable/autoridade/scoped/tenantdedup+exceptions4(Dateorder/overduepriority/owneradmin403cross401/tieISOoffset). LocalNativeTSstrip+Functionbaseline4PASS4FAIL→candidata8/8PASS; NÃOtypecheck/CI/HTTP/UI. Nulos são defesa de dados unit, nãoalegação deNULLPGondeNOTNULLexiste. Valoresiguaisoffsetpreservamordemestável.

Fixture adiciona somente apósas3ordensPASS a passagemdosJSONsREAISnoloadSafetyREALinalteradomobile, exigindoready/cases[B,A]/appeals[B,A]; REDnãochegouaexecutaressaúltimaetapa. ÉcontratodadossemrenderRN/Android/taps/SecureStore. GuardasCIexactlocalhostPG/socket/databasenameeorigeminalteradas;DMLonlysixownfreshcreated_at,noeventwrites/historydelete/grantrelaxation. TodasassertsHTTPoriginais+browser503/recovery/logoutinalterados. NOVOHEAD CI próprio aindaPENDENTE, nãoinferir431API/1343total/PASSatémedir. Revisarbytes/modes/árvore/ancestrais/mainbaseheadfrescos/mergeONLYGREENjustificadoexpectedSHAeapósgatesnovamenteSHAreal. APKN/AexigeidentidadeINTEGRALdosinputs+grafocanônico, não[]ouemprestado.

Neste cicloFUNCIONALpersistidos10PNGs563(5OWN+5POST)comPR563_OWN_POST_CHRONOLOGY_PROVENANCE.jsoncontendoHEAD/checkout/tree/pais/run/job/attempt/resultSUCCESS/SHA/bytes1365x900. Primarylogs563reconsultados e todos10assinaturaPNG/SHA256/bytes/dimensõesnovamenteverificados; nãoframes564. Isso consolidaa preparaçãoanteriorsemcommitapenasmetadados. Somenteárea10técnicainternaaceita,12pendentes.558rootERR_ABORTEDnãoresolvido/560separadosDRAFTFAIL,nenhumPASSemprestado/açãoexterna/produção/custo/provider.


## Jornada nativa de entrada offline — preparação funcional — 2026-10-16 UTC

Escopo exclusivo MLIVRETRABALHO; base main f98b5f618c5b78772c360b93d17e6028f0021008, árvore6f1d97a074f8291862de403b5d65cdaf97fec512. A matriz ainda exige interação real por plataforma: o smoke atual instala, abre, verifica PID/atividade/fatais após12s, mas NÃO toca em telas, digita, valida formulário ou navega. Nenhum defeito de produto novo é afirmado nesta preparação; trata-se de preencher uma lacuna factual de teste.

Novo scripts/android-entry-journey.cjs é executado no MESMO emulador API35/pixel6 do job APK, APÓS o smoke original byte-idêntico, antes do upload validado. Exige CI/GITHUB_ACTIONS/repositório exatos, sourceHead/checkout40hex/run/attempt, checkout Git literal igualGITHUB_SHA, BUILD_INFO.commit_sha igualcheckout/metrofalse/packagefixo e SHA256 dos bytesAPK local/arquivoSHA/instalaçãoREAL iguais. Adb devices deve conter SOMENTE um emulator-NNN autorizado e ro.kernel.qemu=1. Não aceita serial físico ou ambíguo nem toca dados de aparelho pessoal. pm clear é restrito ao packagefixo recém-instalado no emulador descartável já validado; não há clear em físico nem exclusão de histórico Git.

Antes de limpar/reabrir a fixture, força appstop, usa comandos shell normais de modo avião/Wi-Fi/mobiledata OFF e EXIGE modo avião enabled, settingswifi/mobiledata0, NENHUMA rota defaultIPv4/IPv6 e NENHUM endereço scopeglobal. Cada tap/captura verifica novamente essa condição. Se shell/isolamento/permissão falhar, gate exit1; sem root/grant de permissões/firewall/CORS/flags/deadlinebypass. Fonte primária AOSP ConnectivityService descreve cmd connectivity airplane-mode enable/disable; modo avião sozinho não é prova de offline, por isso rádios/rotas/endereço também são gates. Referência https://android.googlesource.com/platform/packages/modules/Connectivity/+/0eccf35b6b1b123996ee41e4cc078cf79c35be89/service/src/com/android/server/ConnectivityService.java . Fonte tagAndroid15 inacessível via ferramenta; não atribuir comportamento exato do runner sem observação.

Jornada proposta: landing signedout; botão Entrar real; TextInput E-mail selecionado por XML/package/bounds/estadoenabled+clickable; teclado nativo observado por input_method; digitação apenasinvalid, senha vazia; ação Entrar exige mensagem real de validação. Nenhuma credencial válida nem signup/loginHTTP é fornecida. Voltar; Criar conta profissional vazio exige nova mensagem; volta e reabre formulário para escolherempresa, campoNomeempresa/selected nativos reais e erro inicialmente AUSENTE, depois submit vazio exige mensagemnova (não reutiliza erro profissional). Troca de papel remove campoempresa; Voltar; force-stop/relaunch exige NOVOPID e landing signedout. CapturasPNG+XML+manifest porestado, SHA256/dimensões/checkout/sourcehead/APKhash/run/attempt; falha também conserva stage/exit, nunca viraPASS por diagnóstico. Não faz taps cegos, não concede prompts de sistema: target deve ser ÚNICO no package, boundsdentroda tela. Não muda JSX/design/navegação/helpers/sessão/API/backend/SQL/RLS/payloads/deps/lock/React19.1.4/RN0.81.6.

Dez regressões locais do harness PASS (CIguard/serial/isolamento/seletores/ambiguidades/roles/EditText/buildSHA/PNGmetadados/freshvalidation). São MODELOS, NÃO Android real/teclado/render ou prova de sucesso desta jornada. CI foundation passa a executar os10modelos além dos gatesanteriores. JobAPK preserva8testssmokeanteriores e acrescenta10modelos; preserva buildcanônico/envHTTPSprodução sem executarauthválida, todasflags/45min/gates/KVM/12ssmoke/fatais. Upload APK só após TODOjob incluindo jornadaPASS. ArtifactextraPNG/XML é evidência de teste, nunca substitutoAPK. Mudança em workflows/scripts de gates exige OWNCI+OWNAPK no HEAD final e POSTCI+POSTAPK no MERGEREAL; APK NÃOéN/A nem emprestado542. Primeiro run desta preparação ainda PENDENTE. Nãoalegar nenhum tap/keyboard/PASS/causaChrome antes de logs/capturas.

### Recibo564 final consolidado no ciclo funcional (sem commit sómetadados)

#564 JÁMERGED f98b5f618c5b78772c360b93d17e6028f0021008/tree6f1d97a074f8291862de403b5d65cdaf97fec512/paisordenados[a699fd0f26d12ba604cc5110e507adf231f120e1,b42428eddd3e4aa96857c6ed8b317a0c9543c749]. HEADb42428eddd3e4aa96857c6ed8b317a0c9543c749; ownCI38858389430/job116834879731attempt1SUCCESS1343=[145Web,753mobile,431API,3CLI,11monitor]/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth06:00:44.7591413Z. Owncheckoutd59368266570ec78447cb889ec160da3745fda37 SINTÉTICO[a699,b424]/tree6f1equivalente,nãoHEADliteral. Novaordem3HTTPPG+loadSafetymobileREAL05:58:52.1070917Z, Chrome155.0.8059.39/503recovery8jornadas05:59:37.7308418Z/05:59:38.3807603Z PASS próprios.

POST56438858944606/job116836602726attempt1COMPLETE FAILURE, ZEROretry. CheckoutLITERALf98 06:02:34.1883726Z.1343unitPASS/zeroFAILSKIPCANCEL/typecheckbuildexportmigrationrunner2xprivacyPASS; nova3ordensHTTPPG+loadSafetyREADY egrants/events/isolamentoPASS06:04:55.2579672Z. HTTPbrowserFAIL/PostSetupNodeSKIPPED/ProductionTruthposteriorNÃOexecutado. Primary06:05:45.8837081Z startup15s: processoGoogleChromespawned/pid13696, semexit/endpoints/DevToolsActivePort, stderr193bytes/DBus+errorflags, stdout0.06:05:45.8841405Z Browser startup timeout. Não versãoChrome/DOM/PNG/503/recovery/reload/logout/B noPOST, nãoECR/nãoERR_ABORTED/CORSobservado eDBusflagsNÃOcausaprovada. Não rerun porverde/relaxarprazos/sandbox/Fetchguard/LNApermissões; nãoemprestarOWNpass. PRbody564final12095charsgravado/re-lidoigual. Não repetirready/merge/rerun564/563/561.

CincoOWN564PNGs com fonteb424/checkoutsintéticod593/tree6f1/run38858389430/job116834879731/resultSUCCESS recuperadosnovamentedologprimário, assinaturaPNG/SHA256/bytes/dimensões1365x900 validados e persistidos neste ciclo com PR564_OWN_NATIVE_ENTRY_CYCLE_PROVENANCE.json. NÃOframesnativosdesta nova jornada. POST564nenhumframe/noversão, manifesto registra explicitamenteFAILsememprestarcapturas. Assets563/879 existentes intactos; documentosoriginais5+matriz continuam FULLPREFIX porapêndice.

Sóárea10Androidstandalone TÉCNICOINTERNO aceita; outras12pendentes, esta fatia não fechaáreas1/2/8/13integrais, autenticaçãosucesso/APIUI/SecureStorepersistência/físico/VisualTruth/piloto. Externos215/219/220/224/228OPENseparados, sem produçãoRailway/Neon/Rails/serviços/custos/credenciais/contratos/PSP/dinheiroreal. 558879/560e47DRAFTFAIL não repetir/reruncego/emprestarPASS. ActivityWatch38858944664/job116836603315SUCCESSPUSH06:02:22.1621163Zf98age0/openPR2/active1, sem issuewrites manuais; alertas562/559fechadospelobot jáprovados. Manter rotinaúnicaenabled/scheduleinalterados, não criaroutra/desativarporparcial. Nenhumcommitartificialdeatividade.


### Ajuste da fixture negativa de dispositivo — antes da prova nativa

O caso unitário de recusa de serial físico usa agora identificador totalmente fictício physical-device-fixture, sem identificador de aparelho do usuário. Nenhuma regra de seleção ou operação ADB mudou. Dez modelos continuam sujeitos à execução no novo HEAD; qualquer CI/APK de predecessor não pertence ao HEAD final. Histórico preservado, sem force-push/novo PR/cancelar ou rerun de job em execução; o novo SHA decorre desta alteração de fixture, não repetição para obter verde.


## Validação de calendário no Passaporte e Segurança — ciclo funcional — 2026-10-16 UTC

Base main f98b5f618c5b78772c360b93d17e6028f0021008/tree6f1d97a074f8291862de403b5d65cdaf97fec512. DVT original v1.104, memória, checkpoint, ledger, registry e matriz permanecem completos NO LUGAR; este apêndice não substitui fontes nem aceita áreas. O apêndice de preparação do565 foi recebido INTEGRALMENTE como histórico antes deste recibo; seus arquivos de evidência/cincoPNGs564 foram copiados por mesmos blobs/modes, NÃO se incorporam seus workflows ou o gate nativo ainda falho.

Falha reproduzida ANTES da correção: loadWorkPassport e loaders Safety profissional/empresa aceitavam calendário impossível em new Date(...), tornando READY um histórico com 2026-02-30T12:00:00Z; submitSafetyCase e submitSafetyAppeal aceitavam created/existing sob ACK com mesma data impossível. As fixtures também usam 2025-02-29 comoffset e2026-04-31 comoffset. São respostas HTTP simuladas nos helpers TypeScript REAIS, não registros inválidos em PostgreSQL nem incidente/exploit/Android/produção provados. API retorna timestamps de colunas PostgreSQL (WorkPassport.completedAt; SafetyCases.createdAt/resolvedAt; SafetyAppeals.createdAt), não autoriza normalização silenciosa de dia impossível. Baseline já adotado pela Agenda/Ganhos/Notificações no538 valida componentes locais antes do instante.

Regressão nova apps/mobile/tests/passport-safety-calendar.test.mjs: 12 testes, RED2PASS/10FAIL no source exato da main; GREEN12/12 após correção. Conjunto focal com29testes existentes BYTE-IDÊNTICOS: GREEN41/41, zero fail/skip/cancel. Cobre sete campos de leitura (completedAt/startsAt/createdAt/resolvedAt) e três ACKs(case/appealcreated/appealexisting), preserva seção irmã READY quando só uma seção inválida, um único POST/endpoints/body/tenant/seleção, erro em leitura e unknown em confirmação incompatível. Controles positivos leapday2024, offset que cruza dia UTC e epochzero permanecem strings exatas; null/undefined opcionais,404perfilausente e vazio confirmado preservados. Não afirmar calendário impossível armazenável noPG, nem mudar política de recurso/status/retention.

Correção SOMENTE predicado date em professional-safety.ts/company-safety.ts e predicado completedAt em professional-profile.ts com função calendário byte-idêntica à já existente na Agenda. Reverse-substitution integral comprova todo restante dos3módulos preservado salvo whitespacefinal: requests/paths/headers/tenant/ACL/ids/descrição/motivo/currentcontext/respostas/created-existing/unknown/semretry, estatísticas/ordem/dados/JSX/layout/UI/rotas/API/SQL/RLS/runtime/roles/eventos/React19.1.4/RN0.81.6/deps/lock/build/workflows/smoke unchanged. Não incorporar565 nem seu gateoffline falho só para usar resultado antigo. Mobile mudou: OWN CI e OWN APK no HEAD exato são OBRIGATÓRIOS e ainda PENDENTES nesta preparação; pósCI/APK no MERGE REAL também, nenhum APK542/565 emprestado, nenhum verde por ausência/runqueued/skipped.

### Isolamento nativo565 — decisão técnica sem bypass

Consulta AOSP Tradefed DeviceSetup.java no commit cd9b18148493b9277b1b676c29ce0e4467b69df7 registra ifconfig eth0 down, mas a própria classe exige dispositivo onde adb root é possível. Isso NÃO prova comando suportado pelo shell sem elevação no runner; não será incorporado às cegas. Não houve novo comando de rede/root/su/grant/firewall/bypass nem nova tentativa565. Fonte primária https://android.googlesource.com/platform/tools/tradefederation/+/cd9b18148493b9277b1b676c29ce0e4467b69df7/src/com/android/tradefed/targetprep/DeviceSetup.java . Segurança/isolamento antes de input continuam obrigatórios; bloqueio parcial não impede este reparo independente do cliente.

### Recibo565 final consolidado INTEGRAL no ciclo funcional (história, NÃO resultado deste novo HEAD)

## FINAL OWN RESULTS — 2026-10-16 UTC — DRAFT / NOT MERGED

HEAD `aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`, tree `49543d17a5abc38a47d020a32ddd7993619dff61`, parent `c4974ba7e191acac808e0877e62ab4d0b800c8bf`. Base MAIN `f98b5f618c5b78772c360b93d17e6028f0021008`. Both OWN runs completed FAILURE, attempt1, ZERO retries. No ready/merge/post-565 exists.

### General CI: FAILURE, not green
[Run 38863990479 / job 116852488777](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38863990479/job/116852488777).
1353 tests=[145Web,753mobile,431API,3HTTPCLI,11watch,10entry-harnessmodels] pass; fail/skip/cancel=0. Typecheck/build/mobile export/migration runner2x/privacy PASS. HTTP/browser FAIL; Post Setup Node skipped; later ProductionTruth NOT executed. Unit green is NOT CI green.

Actual Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed06:58:55.1553052Z. Actual ONE teams GET503 consumed +11 distinct other real GET200, human refresh12 NEW GET200/team1/zero extra POST from SEND PASS06:58:57.1288285Z. Subsequent loaded-dashboard timeout06:59:17.0151233Z with12 GET net::ERR_ABORTED/canceled=true/corsError=null. Full reload/logout/B journey NOT completed. Existing transport root remains unresolved, no API/CORS/vendor/security inference or workaround. Original app/browser driver and security/deadlines unchanged.

### Native APK: FAILURE after original standalone smoke
[Run 38863990420 / job 116852488606](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38863990420/job/116852488606).
Canonical build SUCCESS07:06:13.9296606Z; emulator API35/x86_64/pixel_6; actual installation Success07:07:37.9031694Z and unchanged DEVICE_SMOKE_OK07:07:50.2920580Z, metro_required=false.

NEW gate failed closed07:08:08.4612374Z at `offline-isolation`: after airplane-mode enable, Wi-Fi/data disable and bounded15s observation, `ip -o addr show scope global` still reported eth0 IPv4 10.0.2.15/24. Earlier serial/CI/repo/checkout/BUILD_INFO/individual local-versus-installed APK hash guards had passed by control flow, but no individual APK hash was emitted before this failure; do NOT invent its digest or substitute ZIP digest. Error is isolation precondition failure, NOT application validation failure / permission denial / production incident.

No pm-clear, UI input, native keyboard/form/navigation/relaunch checks reached; checks=[]/captures=[] are NOT PASS. NO native PNG/XML or native journey success observed. Validated standalone APK upload SKIPPED; diagnostic upload success does not accept UI. No radio/route/global-address assertion removed, no root/permission grant/security change/deadline extension, no rerun.

Native evidence artifact12030479489 contains failure receipt only,423ZIPbytes, ZIP SHA2567dc18987c7232d75aea175b75f89adf59117888046a4c643c0db8bbaafd4920e. Smoke diagnostic artifact12031106153,53576ZIPbytes, ZIP SHA2568d405ab35d70ed395338020a9af6a5daf73cb0b30c99d5f5a82ec426d6f1215a. Both expiry2026-10-30; neither ZIP digest is an individual APK digest.

### Exact provenance
Both current runs checked out `f90edc8564d4876a17b2d320b57a39b5271d9eb4`, SYNTHETIC ordered parents [`f98b5f618c5b78772c360b93d17e6028f0021008`,`aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`], tree49543d17a5abc38a47d020a32ddd7993619dff61 identical candidate; NOT literal HEAD. Native checkout primary06:55:33.1133119Z. Source head emitted in failure receipt is aa0. No merge/post gates borrowed.

### Historical initial preparation, separate from final HEAD
Initialc497 CI38863871145/job116852113483attempt1FAILURE1353testsPASS; browser created-team-rendered timeout06:58:05.1619699Z after12 GET aborts. Initial native38863871168/job116852113951attempt1FAILURE: synthetic checkout14a20f995c19ff22e661446925b707df0610ddfd, build07:05:07.7885982Z, original DEVICE_SMOKE_OK07:06:40.9087059Z, new gate offline-isolation/global_address_present07:06:59.2410393Z, no UI checks/captures. Initial results not borrowed for aa0. No retries/cancels.

### Implementation / review
Coverage gap only, no fabricated application defect or product RED. New scripts/android-entry-journey.cjs +10 unit guard models, added after UNCHANGED original standalone smoke in same emulator. Guards require CI/repo/exact checkout/source, single authorized QEMU emulator, own APK/BUILD_INFO/local-vs-installed hash, fresh output, radio/route/address isolation before app reset/input. Selectors require actual XML app labels, enabled unique observed bounds; planned keyboard/invalid email/empty forms/role/back/new-process checks must execute in actual emulator before claiming proof.

10 new models +8 original smoke models PASS locally, NOT Android UI. Separate subprocess fake-ADB physical-device refusal probe PASS before app clear/taps, NOT actual physical/native execution. All negative physical IDs fictional in current head.

17 PR paths, all remote UTF8/base64-normalized bytes exact, all modes100644; FULL original5docs+matrix/main/preparation prefixes preserved in-place by appendix.490of492 existing main non-doc blobs outside2 workflows IDENTICAL; all app/mobile/native/API/SQL/deps/lock/build/old smoke and old tests unchanged. Ahead2/behind0/merge-basef98. Workflow/gate changes require own AND post APK, not N/A.

Previous564 FINAL ownSUCCESS/postSTARTUPFAIL consolidated in5originaldocs+matrix and new ANDROID_OFFLINE_ENTRY_JOURNEY_2026-10-16.md. Five historical OWN564 web PNGs+source manifest persisted with exact provenance/remote readback, not565/native images. Current Git565 appendices are PREPARATION/PENDING history; consolidate this final result only in NEXT FUNCTIONAL cycle, no self-referential metadata/image-only commit.

### Current desktop captures (NOT native proof)
5 OWN CI Web frames primaryjob116852488777 independently decoded PNG signature/bytes/SHA256/1365x900 and Pillow verify PASS; recovered+failure visually inspected. Not yet Git565 assets.
- login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686
- created4dab0942d0fc0eca42a7af70e0ecbf8aed8c6b1374dc2d20dc195fbfa591e7d7/132035
- partial0299f9213f9752f79d2ec783005acdd39bdfc3f66dab4c2423aba498c1015fd2/140761
- recovered47b63ea5c5a1f9e7de0de3ed37223215ee3bd9e060603b1bfbdf951518ebe2e9/132202
- failuref735fdab7e4dba0436b8207cda12f5837a972f4bf4b376616d80f301dcdc538c/132794

### Limits / next safe work
Keep DRAFT: both OWN gates red. Do not rerun solely for green or remove strict isolation. Need a source-grounded, explicitly supported way to disable remaining emulator Ethernet with existing permissions, or a genuinely isolated fixture, followed by measured no global addresses/default routes; no root/grants/bypass. No production input/auth/signup or successful-auth/SecureStore/physical/VisualTruth claim. Permission denial must STOP that branch. If no safe supported isolation, continue independent contracted internal journeys, not all blocked.

Fresh MAIN remainsf98, PRhead/base/draft verified, openPRs558/560/565, external issues215/219/220/224/228 remain separate. Onlyarea10 Androidstandalone TECHNICAL INTERNAL accepted; other12 pending. No whole-area acceptance from testcounts, build, standalone smoke, diagnostics or desktop images.


### Limites de aceite deste ciclo

Somente área10 Androidstandalone TÉCNICOINTERNO aceita; outras12 pendentes. Este reparo de parsing não prova renderRN/Android/taps/teclado/SecureStore/loginválido/físico/VisualTruth/piloto ou aceite integral1/2/3/7/8/11. #565aa0, #558879, #560e47 continuamDRAFT/FAIL separados. Externos215/219/220/224/228OPEN; sem produçãoRailway/Neon/Rails/custos/serviços/credenciais/provider/contratos/PSP/dinheiroreal. #566WatchOPEN é sinal de commits, não prova de agente parado; sem issuewrites manuais/commitatividade. Revisar head/base/main/bytes/modes/árvore/ancestrais; merge ÚNICO expectedSHA só após próprios gates GREEN, depois medir pósreal. Manter somente rotina existente enabled/scheduleinalterados; sem novo agendamento/desativar por parcial.


<!-- PR570: histórico original integral; complemento integral MAIN/584/585 após prefixo comum de 189750 caracteres. -->


---

## Importação integral de história divergente558a8 — 2026-10-18

FULLprefixomainpreservadoacima. O prefixo original de 118114 unidadesUTF16 é compartilhadoBYTEEXATO com fonte a8ba96517135f1f1d3851f78b001f8fee39ce447, caminho docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md. Prefixocomum+trechoINTEGRALabaixo reconstrói os 293679 caracteresUTF16dofonte558, semresumo. EstadoshistóricosNÃOresultadoCI desta novaentrega.

### 2026-10-15 — investigação funcional do reload Web pós-556 (preparação)

PR556 já merged em dd715c6573bcc6d6e5e3c749cc634e276db83ef0, tree90aec6eeb7e3e0cd8ee853e156c5fd5f9831d1b1, pais[d0754b848e5bb780d3f3707001b8c49b802fd0f5,078ebbc8977c61055100184ff91a0261f36a0d3e]. Próprio CI38751951403/job116480374661 SUCCESS1308/todos18steps + Chrome real com8checks/3capturas. Checkout próprio71d37062b330ff2b6759a797ce8fdc3bcd9620f1 é sintético com pais/tree equivalentes, não head literal. Pós38753142047/job116484484990 attempt1 FAILURE14:42:00Z ao recarregar painel:12seções falharam; OPTIONS204 não são ACK nem leitura concluída. Não é startup/ECR, não repetir merge ou rerun cego. Recibo parcial/falha no corpo556. Investigação instrumenta método, nomes de headers/CORS e erros de rede sem tokens/senhas, mantendo todos asserts e segurança. Hipótese CORS/cache do reload ainda NÃO comprovada. Aplicação/API/CORS/deps/lock/Android intactos. Capturas próprias556 são próprias, não pós. Evidência WEB_BROWSER_RELOAD_DIAGNOSTIC_2026-10-15.md. Este ciclo ainda PENDENTE, não aceite; só área10 técnica interna aceita,12semaceiteintegral,externos215/219/220/224/228 separados.


### 2026-10-15 — diagnóstico558: primeiro resultado medido e regressão intermitente

Head386e800747f378d98fa363a03d131afa7a33bf64/CI38754463700/job116489109517 attempt1SUCCESS1308+Chrome14:50:32.7732259Z, sem alterar aplicação/API/CORS. Isso NÃO determina causa nem reclassifica a falha pós556 como PASS. Teste agora exige5recargas consecutivas com mesmos assertions/cache/CORS/interceptação/sessão, não retry de falha; qualquer falha interrompe o gate. Preservados PNGs556 próprios/pós-falhos+manifesto no repositório comorigem/SHA/bytes/dimensões verificados, não atribuídos a558. Novocandidato/exactheadCI/pós aindaPENDENTES. Nenhum fix especulativo deproduto foi feito; causa eminvestigação. Somenteárea10aceita tecnicamente;12pendentes.


### 2026-10-15 —558 cinco recargas medidas, identidade de documento agora exigida

Headc2d61915167ac224eea6d743fb6e1864c51e66cd/CI38755422965/job116492445552 attempt1SUCCESS com5marcadores reloadPASS14:56:34.514Z..998Z e jornada real. Ainda não é causa resolvida do pós556falho. Os tempos curtos suscitam hipótese de DOMantigo; novo gate compara performance.timeOrigin antes/depois deCADA reload e exige documento diferente, sem aguardar/corrigir automaticamente neste estágio. Isso é regressão maisestrita, não prova prévia dahipótese. Se falhar, ler origem real registrada antesde fixdeharness. API/CORS/app/segurança intactos; CI novoHEAD PENDENTE,12áreaspendentes.


### 2026-10-15 —558 RED real das recargas e barreira candidata

Head7e707f40c64b3618558bc689c45f86965cd3dcaf/CI38756284006/job116495471903 attempt1FAILURE:1308unitPASS; reload1 mudou timeOrigin1792076542081.2→1792076544788 e passou15:02:25.136Z; reload2 falhouloaded-dashboard15:02:45.167Z. Diagnóstico primário registrou12GETnet::ERR_ABORTED/canceledtrue; nenhum corsErrorStatus, OPTIONSorigem explícita3001 e allowheadersanteriores. Não é prova deCORSrejeitado/defeitoproduto/vazamento. Sequência deharness não aguardava novo documento completo ANTESde lerDOM. CandidatareloadDocument aguardaperformance.timeOrigin diferente E document.readyStatecomplete antesdashboard;5hardreloads/mesmosasserts/timeout20000/logoutPOST201+401+outrasessão preservados.4novasregressões executam helpers REAIS viaVM commodelosdedocumento atrasado/mesmo/incompleto/errocomando:local4/4PASS, nãoChrome/typecheck. CI novoheadPENDENTE;contagensWeb135/total1312sãoprevisão atémedir. API/CORS/aplicação/deps/lock/Android intactos. Recibo556pósfalho permanecehistórico; não inventar correspondência causaltotal entre duasfalhas. Sóárea10técnicainterna aceita,12pendentes.


### 2026-10-15 —558 candidato barreira NÃO resolveu cancelamentos; diagnóstico adicional

Head40ab0c8017c3e79b43b1bf95e6363cd1d5961b25/CI38757186986/job116498594996attempt1FAILURE15:08:40.7178294Z created-team-rendered ANTESqualquerreload;1312unit[135,753,410,3,11]PASSzeroFAILSKIPCANCEL/typecheck/build/migrationsprivacyPASS,HTTPbrowserFAIL. TeamPOST201real;12GETposterioresnet::ERR_ABORTED/canceledtrue. Candidata barreira/modelos passouunitmasnãoexplicaestaoutrasfalhas. Não declarar causa resolvida/fix deproduto; não merge/reruncego. Novoheadinstrumenta Fetch.requestPaused+ACK/erroCDP(protocolcode/message apenas,semheaders/tokens),timestamp/loaderId/type,mainframe navigation; semdesativarinterceptação/CORS/sandbox oualterarapp. CI novocandidatoPENDENTE. Sóárea10técnicainternaaceita12pendentes.


### 2026-10-15 —558 rastreio não sustenta navegação ou recusa CDP como causa

Heada524edbf0a8d519eaca176ffceaf43adc97253a5/CI38758034590/job116501584200attempt1FAILURE15:14:43.5450645Z created-job-rendered ANTESreload;1312unitPASS. Tracerealm:ZEROintercept-error,ZEROsessionmismatch,todascontinueACKobservadas,UMAmain-documentnavegaçãoinicialapenas;12GETabortadosmesmoloader. Isso não prova causasugeridaanteriorderecarregamento/CORS/CDPerror. NovoheadpreservaFAILeimprimeSOMENTEmétodo/path/status/timing/reqId doAPIfixture dedicadoemcasofalha,semheaders/body/tokens/senhas/query/credenciais. NãoalteraAPI/CORS/app,skip/retrysegurança. Wrappermantémexit1sefalhou,trapcleanupigual. CI novoheadPENDENTE,nãoPASS;nãomergerdraft/repita556merge/reruncego. Barreiraéintegridadedoteste,cancelamentoscontinuamSEMcauseconfirmada;12áreasnãoaceitas.


### 2026-10-15 —558 recibo real head e32 e observação nativa candidata

Main continua dd715c6573bcc6d6e5e3c749cc634e276db83ef0;556jámergedpósFAIL,nãorepetir. CI38758878368head e32e8f2aee1c77b40e84973bc886c3ab2ad64d2b attempt1/job116504528610 falhouANTEScheckoutECRtoomanyrequests,produtosSKIPPED;umúnicoretrydejobfalhomesmoSHAapósconclusão. Attempt2/job116505547703FAILURE:1312unitPASS[135,753,410,3,11],cincohardreloadstimeOriginsdistintosPASS15:21:20Z eAPIleiturasA200 reais;POSTsignout201/signinB201 reais;painelBfalhouloaded-dashboard15:21:40.7693790Z. Servermetadata recebeu12OPTIONSB204masNENHUMGETseguinte;browserGETcancelados. Não éPASSnemcausadeproduto/CORS/CDP/navigationcomprovada;documentobarrierpassounãoreparaestecomportamento. Semnovo retrycego/merge/ready.

Candidatofuncional558instrumentaerrosnativosLog.network+responseExtraCORSepassthroughfetchviaRuntime.bindingCalled,semleituras/clonesdecorpo,semheaders/token/body/query e semmutarargumentos/resposta/Promiseoriginais. Messageerror sóallowlistgenéricaconhecida,demaisredigidas;LogURLssemquery/userinfo eBearerredigido.4regressõesnovas+4originaishelpersreaisVM:local8/8PASS(modelos,nãoChrome/typecheck). API/CORS/layout/lock/deps/Android/egress/sandbox/timeouts/assertsinalterados;5recargas+todasleituras+signoutPOST201/revocation401+outrasessão200continuamexigidas. CIexact-headpróximoPENDENTE;Web139/total1316sóprevisãoatémedir. Capturas556/manifestopreservados. Sóárea10aceitetécnicointerno,12semaceiteintegral;externos215/219/220/224/228OPEN. Evidência WEB_BROWSER_RELOAD_DIAGNOSTIC_2026-10-15.md.


### 2026-10-15 —558 head instrumentado green medido; ampliada jornada de refresh explícito

Head3afbd79b293f0af031d98ff698a2a61f88272045/CI38780501516/job116579142286 attempt1SUCCESS1316=[139Web,753mobile,410API,3CLI,11monitor],todos18steps/typecheck/build/export/migrationsprivacy/HTTPPostgres/ProductionTruth17:54:11.6227914Z. Checkout738e7003e9c331ebfc0d9a4edc3a5eb64de25838SINTÉTICOpais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,3afbd79b293f0af031d98ff698a2a61f88272045]treefaa7f713219331a2e988199a2199a1c7e44c13d3equivalente,nãoheadliteral. BrowserPASS17:53:06.5636995Z8checksreais,5reloadsnovaorigem,logoutPOST201/bearer401/outrasessão200/Bisolado;3capturas1365x900declaradaslogprimário,nãoatribuídasamain. OwnpassNÃOexplicacausa intermitentedosheads anteriores,nãoreclassificapost556nemfecha13áreas.

Próximocandidato558 amplia5cliquesHUMANOSsimulados explícitosbuttonAtualizardados. Cadaondaexige12GET200distintosAPÓSclique+DOMpainelválido/vagapersistida/zeroPOSTadicional;OPTIONS204/leiturasantigasnãoPASS. NÃOretrydefalha:qualquerondafalha encerra gate. Mantidos5hardreloads+sessão/signout/isolamento/assertsoriginais,timeout20000/CORS/Fetchguard/sandbox. Browser.getVersionrealregistraráproduct/protocol/JS/revisionsemcredenciais.2modelosnovosbarreiradeondaleitura+8originais:10/10localPASS,nãoChrome/typecheck;CIexactheadpróximoPENDENTE,Web141/total1318apenasprevisão. Semmudançanaaplicação/API/SQL/layout/deps/lock/Android. Somenteárea10técnicainternaaceita12pendentes;causacancelamentosanterioraindanãoresolvida,nãomergediagnósticoapenasporumgreen.


## Matriz controlada de observadores do navegador — PR #558 — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Main revalidada `dd715c6573bcc6d6e5e3c749cc634e276db83ef0`; pós-merge #556 run38753142047/job116484484990 permanece FAILURE, não repetido nem convertido em verde. PR558 continua DRAFT, não integrado. Falhas anteriores incluem cancelamentos antes de qualquer reload; não há causa demonstrada em CORS, aplicação, CDP session/continue ou troca de imagem. A issue559 do Activity Watch é alerta automático de ausência de commit na main, não prova de agente parado; sem escrita manual no alerta nem commit de atividade.

Recibo FINAL do head anterior `aab5b8f2ab971cf8969b99b04eb005a64b774f91`: own CI38781696446/job116583255788 attempt1 SUCCESS;1318=[141Web,753mobile,410API,3CLI,11monitor], todos18steps, zeroFAIL/SKIP/CANCEL. Checkout6126ceee433bfa2cb6ec18f06e6d2bca25114836 SINTÉTICO, pais ordenados[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,aab5b8f2ab971cf8969b99b04eb005a64b774f91], árvore de4efe3c121fa7ccd33b68bc35530e00a6a325d5 idêntica à candidata. Browser Chrome155.0.8059.39;5refreshes explícitos com12GET200 novos por ação e5hardreloads de documento novo/complete,9checks de UI/API/PG PASS; logout POST201, bearer real401 e outra sessão da MESMA identidade200, empresa B isolada. ProductionTruth18:02:33.5034753Z. Não é recibo pós-merge558. Capturas próprias aab em docs/evidencias/web-browser-2026-10-15/ com manifesto separado; não atribuir screenshots556 ou aab a novo HEAD.

Novo trabalho FUNCIONAL: matriz fatorial baseline (sem observador fetch nativo e sem Log), log-only, native-only, instrumented. Cada caso cria perfil Chrome e duas identidades/tenants descartáveis novos, registra versão literal e executa TODOS os mesmos gates de jornada,5refreshes e5hardreloads. Permanecem Fetch-egressguard/local-only, CORS, sandbox, auth/DOM/ACK, cache no-store e todos os prazos; nenhuma mudança app/API/SQL/UI/deps/lock/Android/workflows. Só os DOIS observadores passivos variam. Não são retries: todo caso falho fica FAIL e o agregador termina não-zero mesmo com sucesso de caso seguinte; continuar controles distintos serve à comparação, não apaga falha. A identidade da Promise nativa foi preservada, mas seus handlers podem mudar timing: HIPÓTESE, não causa/remédio comprovados.

Quatro regressões novas executam configuração REAL e agregador shell REAL com executável child simulado offline; rejeitam nomes desconhecidos/herdados e provam retenção de falha após casos posteriores verdes.14/14 modelos locais PASS e node--check/bash-n PASS; isso não é Chrome/typecheck. CI completo do NOVO HEAD e matriz REAL estão PENDENTES na preparação; não emprestar1318/verde do aab. Nenhuma correção de produto reivindicada; permanecer DRAFT sem explicação causal demonstrada. APK N/A condicionado à identidade INTEGRAL mobile/native/deps/lock/workflows/build/smoke e grafo canônico, não por ausência de runs. Somente área10 tem aceite técnico interno;12outras sem aceite integral; desktop/fixtures não são Android/físico/VisualTruth/SecureStore/piloto. Externos215/219/220/224/228 separados; sem produção/custos/credenciais/contratos/PSP/dinheiro real. Histórico completo preservado por apêndice.


## Reprodução controlada e redução de transporte — PR #558 — 2026-10-15

Resultado REAL do head690154ae25b1872994db39f0703d47cda03d1f0f/tree9326c8b03ca4718227b5e96c7eb73fb55a783c27: CI38789034434 attempt2/job116609063762 FAILURE.1322unit=[145Web,753mobile,410API,3CLI,11monitor] todosPASS/FAILSKIPCANCEL0;typecheck/build/export/migrationrunner2x/privacyPASS,HTTP/browserFAIL e ProductionTruth posterior NÃOexecutado. Attempt1/job116608466677 falhouANTEScheckout ECRtoomanyrequests/Data limit exceeded;EXATAMENTE1retrylimitadojobfalhomesmoHEAD resolveuinfra, NÃO repetir produtoFAIL. Checkout c84c53b7b913f2c3879ac1b9024f88a198161960 SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,690154ae25b1872994db39f0703d47cda03d1f0f] árvore9326...equivalente, nãoheadliteral.

Matriz REAL, TODOS Chrome155.0.8059.39/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34/runner20261012.334.1: baseline FAIL createdteam18:56:06Z e log-only FAIL createdteam18:56:27Z,1POST de equipe net::ERR_ABORTED/canceledtrue em cada; OPTIONS204real antes, sem POST da equipe no logAPI observado. UI exibiu publicação não confirmada, não sucesso. native-only PASS9checks reais+5refreshes+5hardreloads18:56:31Z,logoutPOST201/bearer401/outraMESMAidentidade200/isolamentoB. instrumented FAIL painel inicial18:56:52Z,12GETabortados e12rejeições NATIVAS TypeError/Failed to fetch;API log no intervalo recebeu preflight, sem GETs correspondentes. Zerointercept-error/sessãomismatch observados. O agregado terminoustatus1 apesar de um caso PASS: nenhuma falha foi apagada. Resultado refuta a suficiência de manter observador nativo/Log ligados para evitar cancelamentos; NÃO prova causa universal no observador, React, CORS, Chrome ou API. Causa permanece NÃO demonstrada; não alterar produto nem merge/ready/reruncego. Screenshots próprios690 por caso/manifesto preservados separados dos556/aab. Capturasbaseline e instrumented de falha visualmente inspecionadas; screenshots não são causa/exploit nem aceitesAndroid.

Nova redução FUNCIONAL: matriz2cenários×4observadores (8casos) com perfis+fixtures separados. Cenário minimal carrega documento HTML explicitamente INJETADO só em GET Document /__mlivre_transport_fixture na origemWeblocalhost exata, sem scripts React/Next; mantém a MESMA origem CORS real, Fetchguard bloqueia todoegressexterno. Dentro desse documento, fetch NATIVO usa headersreais/GETcache:no-store; exige GETJSONsingular200,12GETJSONparalelos200,UMPOSTequipe201 com id,GET da equipe criada e12GETJSONparalelos200; API/PostgresREAL depois confirma persistência. Qualquer estágio falho fica FAIL sem retryPOST; metadados não incluem headersvalores/body/token/senha. Cenário journey preserva TODOS gatesWeb anteriores; minimal NÃO é UI/VisualTruth. Cada caso registra versão literal; agregado falha se QUALQUER caso falhar. Não há disableFetch/CORS/sandbox/cache/timeout/autorização/asserts, nem mudanças API/SQL/JSX/CSS/Android/deps/lock/workflows.

Corrigida atribuição do diagnóstico servidor: o snapshot anterior era janela compartilhada last300; não presumir todas as linhas como sendo do caso rotulado. Novo wrapper usa OFFSET de BYTES do logAPI antes de cada caso e sanitiza só seu intervalo, ainda method/path/status/timing/reqId sem query/header/body. Regressão REAL do formatador prova isolamento inclusive prefixoUTF8multibyte e redação de segredos. Cinco novosmodelos (cenários,documento restrito,transporteACK/cache,POSTrejeitado semretry,janela bytes) e agregadorfortalecido8casos:19/19localPASS/node--check/bash-nPASS; nãoChrome/typecheck. NovoCIexactheadPENDENTE, qualquer contagemnova é previsão até medir. Consulta primária Fetch CDP: https://chromedevtools.github.io/devtools-protocol/tot/Fetch/ ; sem atribuir a documentação uma causa deste incidente.

Main permanece dd715c6573bcc6d6e5e3c749cc634e276db83ef0 pós556FAIL; PR558DRAFT/nãointegrado,sem pósgates558. Somenteárea10aceitetécnicointerno,outras12semaceiteintegral; áreas1/4/11/13ganham cobertura diagnóstica mas não aceites. APK N/A condicionado à identidade INTEGRAL dosinsumos/grafo Android, não por[]/APKemprestado. Externos215/219/220/224/228separados,559alertabotnãoeditado,nãoéprovaagenteparado. Sem produção/custos/serviços/credenciais/contratos/PSP/dinheiroreal. Preparação de loading/503 parcial em r10 é SOMENTELOCAL, não publicada/testadaemChrome; não alegar resultado. Histórico/documentosoriginaispreservados integralmente por apêndice.


## Fixture mínima HTTP real, sem contornar LNA — PR #558 — 2026-10-15

Recibo FINAL headbc3d1654839781433d9f832dac370bd2fd502aca/tree7e946e889a38b060f18ec04893971fc40e4c621d: CI38790924626/job116614947907 attempt1 FAILURE, semreruns.1327unit=[150Web,753mobile,410API,3CLI,11monitor]PASS/FAILSKIPCANCEL0;typecheck/build/export/migrations/privacyPASS,HTTP/browserFAIL,ProductionTruthposteriorNÃOexecutado. Checkout3760f08faba19db515665ff9f5e1d5dc3cfd4236 SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,bc3d1654839781433d9f832dac370bd2fd502aca], árvore7e946...igual,nãoHEADliteral.31paths/11UTF8+9PNGnovosreadback/prefixos6histórias/483não-docfora2harnessidênticos comprovados;APK N/AporidentidadeintegralgrafoAndroid.

Resultados REAIS8casos: minimal/baseline e minimal/log-only falharam startup15s19:08:01Z/19:08:16Z,semversãoliteral/SÓstderrdbusobservado,nãocausacomprovada;nãoretry/extensãodeprazo/sandboxbypass. minimal/native-only e minimal/instrumented falharam primeiroGETcom TypeError19:08:27Z/19:08:28Z,mas diagnóstico é **ERR_BLOCKED_BY_LOCAL_NETWORK_ACCESS_CHECKS / LocalNetworkAccessPermissionDenied**, canceled=false, distinto de ERR_ABORTED/canceled=true das jornadas. A página INJETADA não é controle válido para atribuir a falha original a foraReact. NÃO confundir as duas classes nem alegar que LNA explica o incidente anterior. Nenhuma permissão foi concedida/override utilizado. journey/baseline passou5refreshes/formuláriosreais,masfalhoupainelna primeira recarga19:08:54Z;journey/log-only e journey/native-only PASS9checks+5refresh+5reload19:08:57Z/19:09:00Z,logoutPOST201,bearer401/outraMESMAidentity200/Bisolado;journey/instrumented falhoupainelinicial19:09:21Z com12GETabortados. Todos6browsersqueiniciaramregistraramChrome155.0.8059.39;2startupnãoobservaramversão. Agregadostatus1,nenhumPASSemprestado. UmInvalidInterceptionId(-32602)observadoapósosabortos (~18ms),não prova causa. Treze capturas bc3 e manifesto próprio preservados; não são capturas do novoHEAD.

Correção FUNCIONAL da fixture (não da aplicação/cancelamentooriginal): parar uso de Fetch.fulfillRequest no documento mínimo. Wrapper cria EXCLUSIVAMENTE (`wx`,nãosobrescreve) arquivo temporário apps/web/public/__mlivre_transport_fixture.html ANTESbuild; NextlocalhostREALserveHTTP,cleanupremoveSÓarquivo própriocriadonesteprocesso. Arquivo NÃO é adicionado aoGit/produto/distribuição/deploy; HTMLsem scripts,API/PGcontinuamreais. Driver exige resposta200 com remoteIPAddressLOOPBACK,semcache/SW,zero scripts e isSecureContexttrue. Não há grantBrowserPermissions,featuredisable,sandbox/websecurity/CORS/cache/auth/timeoutsalterados,IPaddressspaceoverrideouheadersPNAinventados. É o contexto de rede legítimo do servidorlocalhost já solicitado, não autorização nova nem desativação da proteçãoLNA. Se contexto legítimo ainda negar acesso, manterFAIL e parar esse caminho sembypass.

Passam a ser registrados SOMENTE campos primitivos clientSecurityState/IPaddressspace/policy e resourceIPAddressSpace do CDP, semheadersdeautenticação/tokens/senhas/query/body.8casos/freshfixtures/egressguard/ACK/JSON/persistência/5refreshes+5reloadsjornadas/exitsticky permanecem. ModelovalidadoragorarejeitadocumentossemTCPloopback,cache/SW/statusnão200;regressãocriadorrealexige wx,não scripts e EEXISTpropagado.20/20modeloslocais/node--check/bash-nPASS,nãoChrome/typecheck. NovoCIexactheadPENDENTE,sememprestar1327ouPASSdoscasosisolados. Referênciasprimárias: https://chromedevtools.github.io/devtools-protocol/tot/Network/ e https://developer.chrome.com/blog/local-network-access . Fontesdocumentamcontextosecampos,nãoprovamcausadocancelamento.

Maincontinua dd715c6573bcc6d6e5e3c749cc634e276db83ef0,pós556FAILnão repetido;PR558DRAFT/semmerge/pós558inexistente.CausaintermitenteoriginalsegueNÃOdemonstrada.Somenteárea10aceitetécnicointerno,12pendentes. Auditoriaindependenteleu DatabaseService/NotificationsController eHTTPmulti-company:isolamento/UUID/ACKreadreplay/unreadcontadoremHTTPexistem;triggerdefalhanotificationINSERT/rollbackrealnos3fluxosaindanãoimplementado. Preferirprovaespecíficadeatomicidadea inventaroutbox/provider/retry. r10partial503/loading/recoverycontinuaLOCAL/semPR/semChrome.Externos215/219/220/224/228separados;559alertabotnãoeditado.Semprodução/custos/credenciais/contratos/PSP/dinheiroreal.Históricointegralpreservadoporapêndice;recibofinaldestaCIseráconsolidadopróximocicloFUNCIONAL,semcommitmetadadosautorreferente.


---

## Histórico integral incorporado da main429dc desde a base comumdd715 (apêndice sem alteração de bytes)


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

## Ciclo funcional — 2026-10-16 UTC — continuação CDP serial vs concorrente, sem mudar fetch da aplicação

### Estado revalidado e recibos finais anteriores

Main real429dcba6287e95ca4e804d9452a2e7c0b21fedd8/treec0fb1ba376cb5a7d6089601f7ac4a2910b8149ca/pais ordenados[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,b23c2de96a8e51ea75159bbc8faf23668928ef75]. PR561 já MERGED, não repetir ready/merge/rerun. Own561b23 CI38837907503/job116771049592 attempt1 SUCCESS1322=[145Web,753mobile,410API,3CLI,11monitor], todos18steps/HTTPPG/ProductionTruth02:02:37.1364963Z; checkout1eeca41e434d142b848f7ecada1eb04dcdf2c54b sintético[dd715,b23]/treeigual, não HEADliteral. Browser real155.0.8059.39/503consumido+11GET200/recuperaçãohumana12GET200/8jornadas PASS próprio. O pós561 CI38838523471 attempt2/job116773347723 é FAILURE:1322unitPASS/typecheck/build/export/migrationsrunner2x/privacyPASS, HTTP/browserFAIL02:09:06.6059683Z após teamPOST201/12GETERR_ABORTED/canceledtrue/corsnull; PostSetupNodeSKIPPED/ProductionTruthposteriorNÃOexecutado. Checkoutliteral429dc02:06:05.5752710Z. Attempt1/job116772970771 ECRquotaANTEScheckout→exatamenteUMretrydejobfalhomesmoSHA resolveuINFRA; attempt2browserFAILnão repetido. Unknown—/indisponível/rates— corretos no DOM, mas jornadas/503/recovery/reload/logout/B não completadas no pós. OwnPASS não é pósPASS.

PR560 DRAFT/NOTMERGED e47ca8af5267e29716e934ce86b29df31fa7f783/treed6b1bb1fdd6401cb4c44f29848015bf1998b61ed/base429dc; pais de integração[b421f2f21fc9c6a96a58172436aeeb843abd93fb,429dc]. CI38838893368 attempt2/job116774688695 FAILURE1327=[145,753,415,3,11]unitPASS/zeroFAILSKIPCANCEL/typecheckbuildexportmigrationsprivacyPASS; HTTP/browserFAIL02:14:11.0425070Z/ProductionTruthposteriorNÃOexecutado. Attempt1/job116774151028 ECRquotaANTEScheckout→UMretryfalhoMESMOSHA, não repetirFAILproduto. Checkout528ac670f865cbca05feeee360b9411458f82af2 sintético[429dc,e47]/treeigual. TODOS5HTTPPGrollbackPASS02:13:14.2132110Z..5137370Z (confirm/chatnovo/chatexistente/segundodestinatário/replacement), witness1ou2/ambosalertasvistosanteserro e rollback integral2tenants/foreignunchanged/cleanup/grantsRLSimutáveis;4fasespositivasACK/persist/replay/membership/inboxes/replacementPASS. Não prova provider/outbox/push/entrega/retry. Browseractual155.0.8059.39 inicialteam/job/renderPASS, mas fault503CDPaccepted não é503consumido;12GETERR_ABORTED/canceledtrue/corsnull interromperam partial/recovery/reload/logout/B. Nenhumdefeitotransacionalinventado/nãomerge560/nãoreruncego.

### Variável controlada nova; causa ainda não demonstrada

55848a CI38792613152/job116620750043 FAILURE1328unitPASS,8casos4PASS4FAIL, mínimoHTTPloopbacksemReact reproduziu12nativeGETERR_ABORTED; casos têm provenance distinta, não produção nem causaChromium/CORS/API demonstrada. A nova comparação mantém os oito controles anteriores e acrescenta quatro controles mínimos com ACKs CDP serializados (baseline/log-only/native-only/instrumented). Os12GET nativos da aplicação permanecem Promise.all, com mesmos headers/cache/auth/JSON/ACK/teamPG/CORS/Fetchegressguard/sandbox/deadlines. Só o despacho de Fetch.continueRequest/Fetch.failRequest pelo harness espera o ACK anterior no modo serial; sem repetir comando ou requisição. Falha de continuação agora propaga reprovação sticky e registra apenas código numérico, nunca mensagem potencialmente sensível. Redirecionamentos observados registram somente status/origin/path sem query; ausência de redirect não é presumida. A hipótese de colisão em preflight+redirect não foi demonstrada nos nossos traces, nenhum workaround de produto/featureflag/imagem/browser/security foi adotado.

Driver histórico de558 é preservado como scripts/web-browser-transport-probe.cjs. Driver principal de561 permanece BYTE-IDÊNTICO ao main429dc; sua jornada503/loading/11leituras/recoveryhumana/POSTdesdeENVIO/logoutPOST201+browser401/outraMESMAidentity200/Bisolado é executada adicionalmente e obrigatória. Matriz12controles+jornadamain: qualquerFAIL permanece exit1, nenhum PASS substitui falha; casos independentes não são retry de negócio. Browser.getVersion é medido em cada processo que iniciar; startup15s mantém helper estruturado real de561/mesmasflags/guardas, sem interpretarstdout/portfilecomo readiness. Perfis/contas/tenants frescos, API/PGlocalhost, nenhuma produção/credencialpessoal/serviço novo. O arquivoHTTPmínimo é criado wx e removido somente se próprio, nunca commitado em public.

25modeloslocais executamhelpersREAIS e wrapperreal com executávelfixture:4novosdispatch concorrente/serial/errosemretry/policyestrita,1novogatejornadamainobrigatória,20anteriorespreservadoscomproveniêncianovocaminho. Nodecheck/bash-n PASS, não TypeScriptCI/Chrome/PG/render. CI do novoHEAD ainda PENDENTE ao preparar este apêndice; não emprestar contagens ou PASS antigos.

### Preservação e limites

Integração normal de main429dc no ramo558 com dois pais, sem force. Documentos558 mantêm prefixo integral e recebem, por apêndice, todos os bytes do delta documentalmain desde a base comumdd715; ambaslinhashistóricas são preservadas sem substituir originais por resumos. Código/app/SQL/mobile/native/deps/lock/workflows/build/smoke do main permanecem idênticos; somente harness/teste/evidências/docs deste diagnóstico mudam. Capturas primárias pós561FAIL e own560e47FAIL são persistidas com manifestos de SHA/head/checkout/tree/run/job/resultFAILURE, bytes/SHA256/dimensões1365x900 conferidos; não são frames do novo558. Nenhumcommit sómetadados/imagens.

Somente área10 Androidstandalone tem aceite TÉCNICO INTERNO;12outraspendentes. APK N/A exige identidade integral de insumos/grafoAndroid, não[]/ausênciarun/APKemprestado. Mobileprincipal/React19.1.4/RN0.81.6/lock/RLS/desenhocanônico preservados. Webdesktopfixture não Android/físico/SecureStore/VisualTruth/piloto. Externos215/219/220/224/228 OPEN, sem custos/produção/contratos/PSP/dinheiroreal. PR558 segueDRAFT enquanto causa não comprovada, mesmo se casosisoladosPASS. Watchpost56138838523472/job116772971196 SUCCESS02:04:32.0338059Z429dcage0;559comentado6206385849pelobot02:04:32Z e fechadobot02:04:33Z, sem escrita manual. Não criar commitdeatividade.


---

## Importação integral de delta normativo divergente — fonte57185 — 2026-10-18

Todo prefixo deste arquivo na branch558879 está preservado acima. O prefixo de 118114 unidadesUTF16 é compartilhadoBYTEEXATO com fonte57185; concatenação desse prefixo original com o trecho importado abaixo reconstrói INTEGRALMENTE a fonte57185 (229440 unidadesUTF16). FonteGit85e9c992b6e7a1568b8ea865e43da63477c5f3a0, caminhoinalterado. Não é estadoCI desta558 nem substituição porresumo.

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


## Cronologia de segurança, recursos e exceções — preparação de reprodução — 2026-10-16 UTC

Escopo exclusivo MLIVRETRABALHO. Main fresca a699fd0f26d12ba604cc5110e507adf231f120e1/treec73498cf7932994d4847b3a3b28ef80a6b36f869. Código atual SafetyCasesController.mine e SafetyAppealsController.mine agregam slices tenant e ordenam String(Date).localeCompare DESC; SupportController.exceptions prioriza overdue e ordena String(Date).localeCompare ASC. Probe LOCAL com classes reais NativeTSstrip+VM e fixtures explícitas DB/auth/Date reproduz três ordens incorretas (14quarta/15quinta outubro2026), NÃO HTTP/PG/produção/exploit. Nenhum defeito de autorização, política SLA ou evento demonstrado.

Nova fixture scripts/safety-support-chronology-e2e.cjs exige as guardas CI/localConfiguration/peerLoopback/bancoEXATOmlivretrabalho_http já existentes563, carrega pg somente após validar origem e banco, cria contas/associações por signup/profile/availability/job/interest/confirm reais, cria relatos/recursos/suporte via HTTP. Vínculos completos tenant+identity+assignment+parent+marcador conferidos no PG ANTES de mudar apenas created_at de SEIS registros novos próprios; nunca eventos, grants, RLS ou histórico anterior. App_runtime continua sem UPDATE/DELETE em appeals/events. Revisão humana real de recurso + repeat changedfalse/eventoúnico, slices de cada tenant/outsider401/professional403/admincross401, prioridades overdue/recente e snapshots tabelas/policies/ACLs fazem parte dos gates. Admin DML é fixture efêmera, NÃO nova capacidade runtime nem reescrita de histórico de usuário. Sem serviços/custos/produção/provider/PSP/dinheiroreal. Nenhuma migração/dependência/lock/Android/browser/security alterada. Fixture roda ANTES do browser original, mantendo todos asserts originais. Primeiro CI desta preparação ainda PENDENTE, não há RED HTTP, fix ou PASS publicado desta hipótese.

### Recibo final563 consolidado neste ciclo funcional

#563 jáMERGED, NÃO ready/merge/rerun. Head dad8c7d0b412cd833428e9657588043a3168be62; main/mergea699fd0f26d12ba604cc5110e507adf231f120e1/treec73498cf7932994d4847b3a3b28ef80a6b36f869/paisordenados[429dcba6287e95ca4e804d9452a2e7c0b21fedd8,dad8c7d0b412cd833428e9657588043a3168be62]. Own38853511354/job116819752463attempt1SUCCESS1335=[145Web,753mobile,423API,3CLI,11monitor],zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth05:04:55.2998589Z. Checkout4ea1971e4833a10da26373f850ca2a6aee6be56b SINTÉTICO[429dc,dad8]treeigual,nãoHEADliteral. POST38854119764/job116821643560attempt1SUCCESS1335/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth05:11:43.2603463Z; checkoutLITERALa69905:07:33.9226647Z. Zero retries.

3ordens reaisHTTP/PG e Dateobjects comprovadosRED50(run38853092004/job116818434421)→OWN05:03:08.0911572Z→POST05:09:57.8697266Z(PROFESSIONAL_CHRONOLOGY_PASS). Loaders mobile reais recebemJSONreal e preservamordem, nãoAndroidrender. Own+POSTChrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34 passaram503fixtureconsumido/11GET200outros/refreshHUMANO12GETnovos/team1/zeroPOSTextra e8jornadas, logoutACTUALPOST201/notOPTIONS204/browserbearer401+outrasessãoMESMAidentity200/Bisolado. Ownmarkers05:03:45.1905639Z/05:03:45.8042518Z; POST05:10:36.8402689Z/05:10:37.4576642Z. Não causa/remédio doERR_ABORTED anterior,558continuaDRAFT. APKN/A563 poridentidadeINTEGRALmobile/native/shared/rootdeps/lock/workflows/build/smoke+grafocanônico, NÃO[]/APKemprestado. ÚltimoAPK542SHA63340145d7688ac08f161be8db418d789e81ec89 nãoé563.

Recibo completo PRbody563 gravado/re-lido exato11035chars; fontes primárias jobs acima recuperadas novamente neste ciclo. DezPNGs OWN+POST563 serão preservados comproveniência própria no ciclo funcional, nãoframesdesta nova hipótese. Cincooriginais+matriz/históriaINTEGRAL preservados porapêndice. Errata explícita: antigo'588DRAFT' significa558 (nãoPR588observado/criado); marcadorprimário éPROFESSIONAL_CHRONOLOGY_PG_TYPES (nãoPROFESSSIONALtripleS).

ActivityWatch38854119812/job116821643905SUCCESSPUSH05:07:22.8856593Za699age0/openPR2/active1; issue562fechada05:07:23Zgithub-actions[bot]/comment6208529784comSHAa699, semissuewrite manual. FreshOPEN558head879/560heade47 DRAFTFAIL+externos215219220224228. Não emprestar563PASSaeles/não reruncego. Somenteárea10AndroidstandaloneTÉCNICOINTERNOaceita,12pendentes; esta investigação nãoaceitaáreas8/11integraisnem13áreas. Rotina única existenteenabled/scheduleinalterados; não criar/desativar porparcial. CIProductionTruthlocal nãoédeployprodução. Gates próprios e pós-merge da nova fatia só se justificada+GREEN/reviewdiffbytesmodestreeparents/mainbaseheadfrescos+EXPECTEDSHAúnico.


## RED HTTP/Postgres real e correção candidata — PR564 — 2026-10-16 UTC

HEAD de reprodução0d8d8a469f6f2979da4c54211bdea19fc4e64619/treecd6a95c5e63dfed69471ec528aaad396aec9e76f/parenta699. OwnCI38858060780/job116833876085attempt1COMPLETEFAILURE,zero retries.1335unitanteriores=[145Web,753mobile,423API,3CLI,11monitor]PASS/zeroFAILSKIPCANCEL/typecheckbuildexportmigrationsrunner2xprivacyPASS. HTTPfalhouNA NOVA REGRESSÃO, nãoChrome/ECR. Browser eProductionTruthposterior NÃOexecutados, PostSetupNodeskipped. Primary05:54:45.2974558Zguardabancocontextoclient::1;05:54:45.6934736ZactualpgDateObjects=true(3campos). CasosA8a36f981-e567-4be0-a37a-38575e95ce4f/B7497be81-7d46-482b-a8d9-5bec89f74b83, recursosA7ee274f0-b936-4a1b-b165-879f1583fee0/B8b55f336-b493-4867-a08a-9b726a68a40a, suporteA0d6ee73d-94e7-410e-b648-4e5e7562c665. Datas14quarta/15quintaOct2026.

05:54:45.7298221Zsafety-casesrealHTTPesperado[B,A],retornou[A,B].05:54:45.7300991Zsafety-appealsesperado[B,A],retornou[A,B].05:54:45.7303874Zexceptionsesperado[caseA,supportA,recenturgent004f27f1-eec5-4f5c-adc1-870b9d8e4904],retornou[supportA,caseA,recenturgent]. Todos3pass=false; agregadoerro05:54:45.7331563Z. Controles executadosantesdasassertsordem: snapshots5tabelas/2tenants/eventosimutáveis/policiesACLiguais, recursoHTTPreviewing+replaychangedfalse/atorreal, overdueTRUE/urgentrecenteFALSE, scopedtenant/outsider401/professional403/crossadmin401. NãoéHTTPexploit/vazamento/CORS/incidenteprodução; apenasordemdefatosnaAPIefêmera.

Correção candidata SOMENTEimport+expressãocomparadora em SafetyCasesController.mine/SafetyAppealsController.mine(DESCcreatedAt) e SupportController.exceptions(ASCcreatedAtDEPOISdoMESMOpredicadooverdue). Reutiliza compareTimestamp de563inalterado, semSQL/DTO/projeções/parâmetros/headers/ACL/roles/contexto/status/eventos/retention/SLA/ACK/escritas/UI/mobile/deps/lock/native/workflowalterados. Reverse-substitution comprova3sourcesoriginaisBYTE-IDÊNTICOSforaimport+comparador. Oito regressões comcontrollersREAIS:2ordenaçãopgDate+2nullable/autoridade/scoped/tenantdedup+exceptions4(Dateorder/overduepriority/owneradmin403cross401/tieISOoffset). LocalNativeTSstrip+Functionbaseline4PASS4FAIL→candidata8/8PASS; NÃOtypecheck/CI/HTTP/UI. Nulos são defesa de dados unit, nãoalegação deNULLPGondeNOTNULLexiste. Valoresiguaisoffsetpreservamordemestável.

Fixture adiciona somente apósas3ordensPASS a passagemdosJSONsREAISnoloadSafetyREALinalteradomobile, exigindoready/cases[B,A]/appeals[B,A]; REDnãochegouaexecutaressaúltimaetapa. ÉcontratodadossemrenderRN/Android/taps/SecureStore. GuardasCIexactlocalhostPG/socket/databasenameeorigeminalteradas;DMLonlysixownfreshcreated_at,noeventwrites/historydelete/grantrelaxation. TodasassertsHTTPoriginais+browser503/recovery/logoutinalterados. NOVOHEAD CI próprio aindaPENDENTE, nãoinferir431API/1343total/PASSatémedir. Revisarbytes/modes/árvore/ancestrais/mainbaseheadfrescos/mergeONLYGREENjustificadoexpectedSHAeapósgatesnovamenteSHAreal. APKN/AexigeidentidadeINTEGRALdosinputs+grafocanônico, não[]ouemprestado.

Neste cicloFUNCIONALpersistidos10PNGs563(5OWN+5POST)comPR563_OWN_POST_CHRONOLOGY_PROVENANCE.jsoncontendoHEAD/checkout/tree/pais/run/job/attempt/resultSUCCESS/SHA/bytes1365x900. Primarylogs563reconsultados e todos10assinaturaPNG/SHA256/bytes/dimensõesnovamenteverificados; nãoframes564. Isso consolidaa preparaçãoanteriorsemcommitapenasmetadados. Somenteárea10técnicainternaaceita,12pendentes.558rootERR_ABORTEDnãoresolvido/560separadosDRAFTFAIL,nenhumPASSemprestado/açãoexterna/produção/custo/provider.


## Jornada nativa de entrada offline — preparação funcional — 2026-10-16 UTC

Escopo exclusivo MLIVRETRABALHO; base main f98b5f618c5b78772c360b93d17e6028f0021008, árvore6f1d97a074f8291862de403b5d65cdaf97fec512. A matriz ainda exige interação real por plataforma: o smoke atual instala, abre, verifica PID/atividade/fatais após12s, mas NÃO toca em telas, digita, valida formulário ou navega. Nenhum defeito de produto novo é afirmado nesta preparação; trata-se de preencher uma lacuna factual de teste.

Novo scripts/android-entry-journey.cjs é executado no MESMO emulador API35/pixel6 do job APK, APÓS o smoke original byte-idêntico, antes do upload validado. Exige CI/GITHUB_ACTIONS/repositório exatos, sourceHead/checkout40hex/run/attempt, checkout Git literal igualGITHUB_SHA, BUILD_INFO.commit_sha igualcheckout/metrofalse/packagefixo e SHA256 dos bytesAPK local/arquivoSHA/instalaçãoREAL iguais. Adb devices deve conter SOMENTE um emulator-NNN autorizado e ro.kernel.qemu=1. Não aceita serial físico ou ambíguo nem toca dados de aparelho pessoal. pm clear é restrito ao packagefixo recém-instalado no emulador descartável já validado; não há clear em físico nem exclusão de histórico Git.

Antes de limpar/reabrir a fixture, força appstop, usa comandos shell normais de modo avião/Wi-Fi/mobiledata OFF e EXIGE modo avião enabled, settingswifi/mobiledata0, NENHUMA rota defaultIPv4/IPv6 e NENHUM endereço scopeglobal. Cada tap/captura verifica novamente essa condição. Se shell/isolamento/permissão falhar, gate exit1; sem root/grant de permissões/firewall/CORS/flags/deadlinebypass. Fonte primária AOSP ConnectivityService descreve cmd connectivity airplane-mode enable/disable; modo avião sozinho não é prova de offline, por isso rádios/rotas/endereço também são gates. Referência https://android.googlesource.com/platform/packages/modules/Connectivity/+/0eccf35b6b1b123996ee41e4cc078cf79c35be89/service/src/com/android/server/ConnectivityService.java . Fonte tagAndroid15 inacessível via ferramenta; não atribuir comportamento exato do runner sem observação.

Jornada proposta: landing signedout; botão Entrar real; TextInput E-mail selecionado por XML/package/bounds/estadoenabled+clickable; teclado nativo observado por input_method; digitação apenasinvalid, senha vazia; ação Entrar exige mensagem real de validação. Nenhuma credencial válida nem signup/loginHTTP é fornecida. Voltar; Criar conta profissional vazio exige nova mensagem; volta e reabre formulário para escolherempresa, campoNomeempresa/selected nativos reais e erro inicialmente AUSENTE, depois submit vazio exige mensagemnova (não reutiliza erro profissional). Troca de papel remove campoempresa; Voltar; force-stop/relaunch exige NOVOPID e landing signedout. CapturasPNG+XML+manifest porestado, SHA256/dimensões/checkout/sourcehead/APKhash/run/attempt; falha também conserva stage/exit, nunca viraPASS por diagnóstico. Não faz taps cegos, não concede prompts de sistema: target deve ser ÚNICO no package, boundsdentroda tela. Não muda JSX/design/navegação/helpers/sessão/API/backend/SQL/RLS/payloads/deps/lock/React19.1.4/RN0.81.6.

Dez regressões locais do harness PASS (CIguard/serial/isolamento/seletores/ambiguidades/roles/EditText/buildSHA/PNGmetadados/freshvalidation). São MODELOS, NÃO Android real/teclado/render ou prova de sucesso desta jornada. CI foundation passa a executar os10modelos além dos gatesanteriores. JobAPK preserva8testssmokeanteriores e acrescenta10modelos; preserva buildcanônico/envHTTPSprodução sem executarauthválida, todasflags/45min/gates/KVM/12ssmoke/fatais. Upload APK só após TODOjob incluindo jornadaPASS. ArtifactextraPNG/XML é evidência de teste, nunca substitutoAPK. Mudança em workflows/scripts de gates exige OWNCI+OWNAPK no HEAD final e POSTCI+POSTAPK no MERGEREAL; APK NÃOéN/A nem emprestado542. Primeiro run desta preparação ainda PENDENTE. Nãoalegar nenhum tap/keyboard/PASS/causaChrome antes de logs/capturas.

### Recibo564 final consolidado no ciclo funcional (sem commit sómetadados)

#564 JÁMERGED f98b5f618c5b78772c360b93d17e6028f0021008/tree6f1d97a074f8291862de403b5d65cdaf97fec512/paisordenados[a699fd0f26d12ba604cc5110e507adf231f120e1,b42428eddd3e4aa96857c6ed8b317a0c9543c749]. HEADb42428eddd3e4aa96857c6ed8b317a0c9543c749; ownCI38858389430/job116834879731attempt1SUCCESS1343=[145Web,753mobile,431API,3CLI,11monitor]/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth06:00:44.7591413Z. Owncheckoutd59368266570ec78447cb889ec160da3745fda37 SINTÉTICO[a699,b424]/tree6f1equivalente,nãoHEADliteral. Novaordem3HTTPPG+loadSafetymobileREAL05:58:52.1070917Z, Chrome155.0.8059.39/503recovery8jornadas05:59:37.7308418Z/05:59:38.3807603Z PASS próprios.

POST56438858944606/job116836602726attempt1COMPLETE FAILURE, ZEROretry. CheckoutLITERALf98 06:02:34.1883726Z.1343unitPASS/zeroFAILSKIPCANCEL/typecheckbuildexportmigrationrunner2xprivacyPASS; nova3ordensHTTPPG+loadSafetyREADY egrants/events/isolamentoPASS06:04:55.2579672Z. HTTPbrowserFAIL/PostSetupNodeSKIPPED/ProductionTruthposteriorNÃOexecutado. Primary06:05:45.8837081Z startup15s: processoGoogleChromespawned/pid13696, semexit/endpoints/DevToolsActivePort, stderr193bytes/DBus+errorflags, stdout0.06:05:45.8841405Z Browser startup timeout. Não versãoChrome/DOM/PNG/503/recovery/reload/logout/B noPOST, nãoECR/nãoERR_ABORTED/CORSobservado eDBusflagsNÃOcausaprovada. Não rerun porverde/relaxarprazos/sandbox/Fetchguard/LNApermissões; nãoemprestarOWNpass. PRbody564final12095charsgravado/re-lidoigual. Não repetirready/merge/rerun564/563/561.

CincoOWN564PNGs com fonteb424/checkoutsintéticod593/tree6f1/run38858389430/job116834879731/resultSUCCESS recuperadosnovamentedologprimário, assinaturaPNG/SHA256/bytes/dimensões1365x900 validados e persistidos neste ciclo com PR564_OWN_NATIVE_ENTRY_CYCLE_PROVENANCE.json. NÃOframesnativosdesta nova jornada. POST564nenhumframe/noversão, manifesto registra explicitamenteFAILsememprestarcapturas. Assets563/879 existentes intactos; documentosoriginais5+matriz continuam FULLPREFIX porapêndice.

Sóárea10Androidstandalone TÉCNICOINTERNO aceita; outras12pendentes, esta fatia não fechaáreas1/2/8/13integrais, autenticaçãosucesso/APIUI/SecureStorepersistência/físico/VisualTruth/piloto. Externos215/219/220/224/228OPENseparados, sem produçãoRailway/Neon/Rails/serviços/custos/credenciais/contratos/PSP/dinheiroreal. 558879/560e47DRAFTFAIL não repetir/reruncego/emprestarPASS. ActivityWatch38858944664/job116836603315SUCCESSPUSH06:02:22.1621163Zf98age0/openPR2/active1, sem issuewrites manuais; alertas562/559fechadospelobot jáprovados. Manter rotinaúnicaenabled/scheduleinalterados, não criaroutra/desativarporparcial. Nenhumcommitartificialdeatividade.


### Ajuste da fixture negativa de dispositivo — antes da prova nativa

O caso unitário de recusa de serial físico usa agora identificador totalmente fictício physical-device-fixture, sem identificador de aparelho do usuário. Nenhuma regra de seleção ou operação ADB mudou. Dez modelos continuam sujeitos à execução no novo HEAD; qualquer CI/APK de predecessor não pertence ao HEAD final. Histórico preservado, sem force-push/novo PR/cancelar ou rerun de job em execução; o novo SHA decorre desta alteração de fixture, não repetição para obter verde.


## Validação de calendário no Passaporte e Segurança — ciclo funcional — 2026-10-16 UTC

Base main f98b5f618c5b78772c360b93d17e6028f0021008/tree6f1d97a074f8291862de403b5d65cdaf97fec512. DVT original v1.104, memória, checkpoint, ledger, registry e matriz permanecem completos NO LUGAR; este apêndice não substitui fontes nem aceita áreas. O apêndice de preparação do565 foi recebido INTEGRALMENTE como histórico antes deste recibo; seus arquivos de evidência/cincoPNGs564 foram copiados por mesmos blobs/modes, NÃO se incorporam seus workflows ou o gate nativo ainda falho.

Falha reproduzida ANTES da correção: loadWorkPassport e loaders Safety profissional/empresa aceitavam calendário impossível em new Date(...), tornando READY um histórico com 2026-02-30T12:00:00Z; submitSafetyCase e submitSafetyAppeal aceitavam created/existing sob ACK com mesma data impossível. As fixtures também usam 2025-02-29 comoffset e2026-04-31 comoffset. São respostas HTTP simuladas nos helpers TypeScript REAIS, não registros inválidos em PostgreSQL nem incidente/exploit/Android/produção provados. API retorna timestamps de colunas PostgreSQL (WorkPassport.completedAt; SafetyCases.createdAt/resolvedAt; SafetyAppeals.createdAt), não autoriza normalização silenciosa de dia impossível. Baseline já adotado pela Agenda/Ganhos/Notificações no538 valida componentes locais antes do instante.

Regressão nova apps/mobile/tests/passport-safety-calendar.test.mjs: 12 testes, RED2PASS/10FAIL no source exato da main; GREEN12/12 após correção. Conjunto focal com29testes existentes BYTE-IDÊNTICOS: GREEN41/41, zero fail/skip/cancel. Cobre sete campos de leitura (completedAt/startsAt/createdAt/resolvedAt) e três ACKs(case/appealcreated/appealexisting), preserva seção irmã READY quando só uma seção inválida, um único POST/endpoints/body/tenant/seleção, erro em leitura e unknown em confirmação incompatível. Controles positivos leapday2024, offset que cruza dia UTC e epochzero permanecem strings exatas; null/undefined opcionais,404perfilausente e vazio confirmado preservados. Não afirmar calendário impossível armazenável noPG, nem mudar política de recurso/status/retention.

Correção SOMENTE predicado date em professional-safety.ts/company-safety.ts e predicado completedAt em professional-profile.ts com função calendário byte-idêntica à já existente na Agenda. Reverse-substitution integral comprova todo restante dos3módulos preservado salvo whitespacefinal: requests/paths/headers/tenant/ACL/ids/descrição/motivo/currentcontext/respostas/created-existing/unknown/semretry, estatísticas/ordem/dados/JSX/layout/UI/rotas/API/SQL/RLS/runtime/roles/eventos/React19.1.4/RN0.81.6/deps/lock/build/workflows/smoke unchanged. Não incorporar565 nem seu gateoffline falho só para usar resultado antigo. Mobile mudou: OWN CI e OWN APK no HEAD exato são OBRIGATÓRIOS e ainda PENDENTES nesta preparação; pósCI/APK no MERGE REAL também, nenhum APK542/565 emprestado, nenhum verde por ausência/runqueued/skipped.

### Isolamento nativo565 — decisão técnica sem bypass

Consulta AOSP Tradefed DeviceSetup.java no commit cd9b18148493b9277b1b676c29ce0e4467b69df7 registra ifconfig eth0 down, mas a própria classe exige dispositivo onde adb root é possível. Isso NÃO prova comando suportado pelo shell sem elevação no runner; não será incorporado às cegas. Não houve novo comando de rede/root/su/grant/firewall/bypass nem nova tentativa565. Fonte primária https://android.googlesource.com/platform/tools/tradefederation/+/cd9b18148493b9277b1b676c29ce0e4467b69df7/src/com/android/tradefed/targetprep/DeviceSetup.java . Segurança/isolamento antes de input continuam obrigatórios; bloqueio parcial não impede este reparo independente do cliente.

### Recibo565 final consolidado INTEGRAL no ciclo funcional (história, NÃO resultado deste novo HEAD)

## FINAL OWN RESULTS — 2026-10-16 UTC — DRAFT / NOT MERGED

HEAD `aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`, tree `49543d17a5abc38a47d020a32ddd7993619dff61`, parent `c4974ba7e191acac808e0877e62ab4d0b800c8bf`. Base MAIN `f98b5f618c5b78772c360b93d17e6028f0021008`. Both OWN runs completed FAILURE, attempt1, ZERO retries. No ready/merge/post-565 exists.

### General CI: FAILURE, not green
[Run 38863990479 / job 116852488777](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38863990479/job/116852488777).
1353 tests=[145Web,753mobile,431API,3HTTPCLI,11watch,10entry-harnessmodels] pass; fail/skip/cancel=0. Typecheck/build/mobile export/migration runner2x/privacy PASS. HTTP/browser FAIL; Post Setup Node skipped; later ProductionTruth NOT executed. Unit green is NOT CI green.

Actual Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed06:58:55.1553052Z. Actual ONE teams GET503 consumed +11 distinct other real GET200, human refresh12 NEW GET200/team1/zero extra POST from SEND PASS06:58:57.1288285Z. Subsequent loaded-dashboard timeout06:59:17.0151233Z with12 GET net::ERR_ABORTED/canceled=true/corsError=null. Full reload/logout/B journey NOT completed. Existing transport root remains unresolved, no API/CORS/vendor/security inference or workaround. Original app/browser driver and security/deadlines unchanged.

### Native APK: FAILURE after original standalone smoke
[Run 38863990420 / job 116852488606](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38863990420/job/116852488606).
Canonical build SUCCESS07:06:13.9296606Z; emulator API35/x86_64/pixel_6; actual installation Success07:07:37.9031694Z and unchanged DEVICE_SMOKE_OK07:07:50.2920580Z, metro_required=false.

NEW gate failed closed07:08:08.4612374Z at `offline-isolation`: after airplane-mode enable, Wi-Fi/data disable and bounded15s observation, `ip -o addr show scope global` still reported eth0 IPv4 10.0.2.15/24. Earlier serial/CI/repo/checkout/BUILD_INFO/individual local-versus-installed APK hash guards had passed by control flow, but no individual APK hash was emitted before this failure; do NOT invent its digest or substitute ZIP digest. Error is isolation precondition failure, NOT application validation failure / permission denial / production incident.

No pm-clear, UI input, native keyboard/form/navigation/relaunch checks reached; checks=[]/captures=[] are NOT PASS. NO native PNG/XML or native journey success observed. Validated standalone APK upload SKIPPED; diagnostic upload success does not accept UI. No radio/route/global-address assertion removed, no root/permission grant/security change/deadline extension, no rerun.

Native evidence artifact12030479489 contains failure receipt only,423ZIPbytes, ZIP SHA2567dc18987c7232d75aea175b75f89adf59117888046a4c643c0db8bbaafd4920e. Smoke diagnostic artifact12031106153,53576ZIPbytes, ZIP SHA2568d405ab35d70ed395338020a9af6a5daf73cb0b30c99d5f5a82ec426d6f1215a. Both expiry2026-10-30; neither ZIP digest is an individual APK digest.

### Exact provenance
Both current runs checked out `f90edc8564d4876a17b2d320b57a39b5271d9eb4`, SYNTHETIC ordered parents [`f98b5f618c5b78772c360b93d17e6028f0021008`,`aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`], tree49543d17a5abc38a47d020a32ddd7993619dff61 identical candidate; NOT literal HEAD. Native checkout primary06:55:33.1133119Z. Source head emitted in failure receipt is aa0. No merge/post gates borrowed.

### Historical initial preparation, separate from final HEAD
Initialc497 CI38863871145/job116852113483attempt1FAILURE1353testsPASS; browser created-team-rendered timeout06:58:05.1619699Z after12 GET aborts. Initial native38863871168/job116852113951attempt1FAILURE: synthetic checkout14a20f995c19ff22e661446925b707df0610ddfd, build07:05:07.7885982Z, original DEVICE_SMOKE_OK07:06:40.9087059Z, new gate offline-isolation/global_address_present07:06:59.2410393Z, no UI checks/captures. Initial results not borrowed for aa0. No retries/cancels.

### Implementation / review
Coverage gap only, no fabricated application defect or product RED. New scripts/android-entry-journey.cjs +10 unit guard models, added after UNCHANGED original standalone smoke in same emulator. Guards require CI/repo/exact checkout/source, single authorized QEMU emulator, own APK/BUILD_INFO/local-vs-installed hash, fresh output, radio/route/address isolation before app reset/input. Selectors require actual XML app labels, enabled unique observed bounds; planned keyboard/invalid email/empty forms/role/back/new-process checks must execute in actual emulator before claiming proof.

10 new models +8 original smoke models PASS locally, NOT Android UI. Separate subprocess fake-ADB physical-device refusal probe PASS before app clear/taps, NOT actual physical/native execution. All negative physical IDs fictional in current head.

17 PR paths, all remote UTF8/base64-normalized bytes exact, all modes100644; FULL original5docs+matrix/main/preparation prefixes preserved in-place by appendix.490of492 existing main non-doc blobs outside2 workflows IDENTICAL; all app/mobile/native/API/SQL/deps/lock/build/old smoke and old tests unchanged. Ahead2/behind0/merge-basef98. Workflow/gate changes require own AND post APK, not N/A.

Previous564 FINAL ownSUCCESS/postSTARTUPFAIL consolidated in5originaldocs+matrix and new ANDROID_OFFLINE_ENTRY_JOURNEY_2026-10-16.md. Five historical OWN564 web PNGs+source manifest persisted with exact provenance/remote readback, not565/native images. Current Git565 appendices are PREPARATION/PENDING history; consolidate this final result only in NEXT FUNCTIONAL cycle, no self-referential metadata/image-only commit.

### Current desktop captures (NOT native proof)
5 OWN CI Web frames primaryjob116852488777 independently decoded PNG signature/bytes/SHA256/1365x900 and Pillow verify PASS; recovered+failure visually inspected. Not yet Git565 assets.
- login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686
- created4dab0942d0fc0eca42a7af70e0ecbf8aed8c6b1374dc2d20dc195fbfa591e7d7/132035
- partial0299f9213f9752f79d2ec783005acdd39bdfc3f66dab4c2423aba498c1015fd2/140761
- recovered47b63ea5c5a1f9e7de0de3ed37223215ee3bd9e060603b1bfbdf951518ebe2e9/132202
- failuref735fdab7e4dba0436b8207cda12f5837a972f4bf4b376616d80f301dcdc538c/132794

### Limits / next safe work
Keep DRAFT: both OWN gates red. Do not rerun solely for green or remove strict isolation. Need a source-grounded, explicitly supported way to disable remaining emulator Ethernet with existing permissions, or a genuinely isolated fixture, followed by measured no global addresses/default routes; no root/grants/bypass. No production input/auth/signup or successful-auth/SecureStore/physical/VisualTruth claim. Permission denial must STOP that branch. If no safe supported isolation, continue independent contracted internal journeys, not all blocked.

Fresh MAIN remainsf98, PRhead/base/draft verified, openPRs558/560/565, external issues215/219/220/224/228 remain separate. Onlyarea10 Androidstandalone TECHNICAL INTERNAL accepted; other12 pending. No whole-area acceptance from testcounts, build, standalone smoke, diagnostics or desktop images.


### Limites de aceite deste ciclo

Somente área10 Androidstandalone TÉCNICOINTERNO aceita; outras12 pendentes. Este reparo de parsing não prova renderRN/Android/taps/teclado/SecureStore/loginválido/físico/VisualTruth/piloto ou aceite integral1/2/3/7/8/11. #565aa0, #558879, #560e47 continuamDRAFT/FAIL separados. Externos215/219/220/224/228OPEN; sem produçãoRailway/Neon/Rails/custos/serviços/credenciais/provider/contratos/PSP/dinheiroreal. #566WatchOPEN é sinal de commits, não prova de agente parado; sem issuewrites manuais/commitatividade. Revisar head/base/main/bytes/modes/árvore/ancestrais; merge ÚNICO expectedSHA só após próprios gates GREEN, depois medir pósreal. Manter somente rotina existente enabled/scheduleinalterados; sem novo agendamento/desativar por parcial.

---

## Entrega funcional — atomicidade da renovação de convites — 2026-10-17

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. Originais completos mantidos NO LUGAR como prefixos integrais. Área4equipes/convites, área7RLS/tenant e área11API ficam mais próximas do aceite; nenhuma área é declarada concluída.

Lacuna comprovada por leitura dos testes existentes: http-company-invitation-concurrency-e2e.sh comprova serialização de duas renovações bem-sucedidas e aceitação de apenas um código; http-company-members-e2e.sh cobre papéis/criação/aceitação/revogação. Nenhum injeta falha SQL no INSERT posterior à revogação do convite anterior. Controller.invite executa ambas as escritas dentro de DatabaseService.tenant BEGIN/SET LOCAL app_runtime/tenant/COMMIT/catchROLLBACK. Não foi reproduzido defeito no produto; a entrega é prova adicional do contrato transacional, sem alterar controller/SQL/runtime.

Novo scripts/invitation-atomicity-e2e.cjs: guarda CI+APIlocalhostHTTPporta explícita+PGlocalhostporta/DBEXATOmlivretrabalho_http; carrega pg somente após guarda e exige socket REALloopback antes de criar fixtures/DDL. Identidades/duasempresas/profissional/convites são criados por HTTP real, IDs/tenant/ator/email/role/expiry/tokenhash vinculados ao PG antes do hook. Nenhuma credencial/código de convite é logado, nenhuma requisição externa/prod/provider.

Uma sequência e função/trigger AFTER INSERT com nomes derivados de UUID próprio são criados APENAS no banco descartável. Função SECURITYDEFINER com search_path fixo/tabela+sequência qualificadas/EXECUTE PUBLIC revogado limita-se ao tenant/email/ator próprios. Exige ver os dois fatos dentro da transação (convite anterior revogado + novo inserido) antes de avançar sequência não transacional e levantar erro controlado. HTTP deve retornar500, witness deve ser1, snapshots integrais das invitations/memberships dos dois tenants devem ser exatamente iguais aos anteriores, RLS/policies/ACL intactos.

Cleanup remove SOMENTE objetos criados com flags próprias, em ordem trigger/function/sequence, não sobrescreve objetos existentes nem usa CASCADE. Guardas contra nomes forjados e cleanup parcial com falha têm teste real. Depois, uma solicitação explícita de recuperação201 deve criar exatamenteumconvite e revogar anterior; código antigo400/novo201aceito e exatamenteuma membershipmanager nova, demaisregistros/tenantestrangeiro intactos. Não é retry automático de negócio, outbox, email entregue ou prova Android/produção. Markers INVITATION_INSERT_ROLLBACK_PASS e INVITATION_ATOMICITY_HTTP_PG_PASS só serão aceitos por logs novos; nesta preparação PENDENTES.

Cinco guardmodels novos em apps/api/src/invitation-atomicity.test.ts PASS5/5 local via NativeTSstrip e funções reais, sem pg/HTTP local. Cobrem IDs/email do escopo, vinculação do registro, recusa de cleanup não próprio/forjado, ordem/flags e drenagem após falha. Não são prova SQL/HTTP. CI esperado1360=[145Web,765mobile,436API,3CLI,11monitor], ainda PENDENTE. Uma invocação foi adicionada antes do navegador no HTTPjourney; TODOS asserts/gates antigos/navegador/CORS/Fetchguard/CDP/sandbox/LNA/deadlines preservados. Nenhum app/controller/migração/dependência/lock/workflow/build/smoke/native alterado. APK N/A somente após revisão integral da árvore de insumos nativos; não por ausência de run ou APK emprestado.

Revalidação inicial: #568b7ef e #5702205 são DRAFT e CIbrowserFAIL/APKSUCCESS, sem merge/retry cego nesta rodada; os snapshots PENDING dos corpos não são PASS. Não duplicar reparo de datas já abrangido nesses PRs. #558/#560/#565 mantêm bloqueios independentes. Apenas área10Androidstandalone TÉCNICO interno aceita, demais12pendentes; externos215/219/220/224/228abertos. Sem produção/serviços/custos/providers/PSP/credenciais/contratos/dinheiroreal. Nenhum commit artificial/alerta manual.

Fecho desta preparação: código fixture+guardtests/documentação/evidência acima preparados, 5modelsPASS, execuçãoCI/HTTPPG/revisão/merge/pós-gates PENDENTES. Próximo passo: conferir bytes/modes/ancestrais e log primário próprio; manter DRAFT se qualquer gate falhar e avançar em item independente em vez de rerun de falha de produto. Recibo final será vinculado ao PR e consolidado em novo ciclo funcional sem commit autorreferente de status.



## Aceite de convite: falha tardia no UPDATE — ciclo funcional — 2026-10-17 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Estende o PR571 existente, sem PR duplicado, sobre HEAD67e3b8fc389162a186c4899d4c0b117a906c2d42/treec431b86c2e9876a788b74745348801bcdccd9020; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README/DVT original completo/memória/checkpoint/ledger/registry/matriz foram recuperados em referência imutável; todos prefixos integrais permanecem NO LUGAR por apêndice.

Lacuna concreta: CompanyMembersController.accept insere membership (ou promove admin/manager a owner) e depois grava accepted_at/accepted_by_identity_id. Testes atuais verificam entradas/auth/ACK e erro genérico; não injetam falha SQL na última escrita depois de observar membership nova. Migrations0001/0004/0039/0047 confirmam UUIDs, unicidade, RLS/app_runtime e par de aceitação consistente. Nenhum defeito de transação do produto é presumido: o controller e DatabaseService já transacionam ambas as escritas. Esta fatia cobre SOMENTE INSERT de membership nova, não prova rollback do caminho de promoção de papel.

Nova fase em scripts/invitation-atomicity-e2e.cjs, depois da prova de renovação antiga intacta: convite renovado real/target profissional real ainda sem membership vinculados a tenant/email/ator/UUID/hashPG antes do hook. Scope phase=accept exige targetIdUUID e namespace inv_accept separado. Hook temporário AFTER UPDATE OF accepted_at exige convite exato, transição NULL→data, accepted_by=target e testemunha simultânea de UMA membershipmanager/subject_identity e UM convite aceito na transação. Só então avança sequência não transacional própria e falha. HTTP500+witness1 devem corresponder a snapshots integrais de invitations/memberships dos DOIS tenants exatamente iguais ao pré-aceite; convite permanece ativo via GET autorizado. Após remover hook, UMA ação EXPLÍCITA com MESMO código deve retornar201, criar exatamenteuma membershipmanager, alterar somente paraccepted_at/by do convite, preservar demaislinhas/tenantestrangeiro/ACL/policies. Código jáconsumido400 não pode criaroutramembership.

Nenhuma seed de papel, grant relaxado, RLSdisable, alteração de SQL/controller/migração/produção ou retry automático. Todas guardas CI/localAPIHTTPportaexplícita/PGexactmlivretrabalho_http/socketloopback continuam; pg carregado sóapósconfigguard, objetos criadossomenteapósHTTP↔PGbinding. SECURITYDEFINER restringe witness a linhas próprias, search_pathfixo, nomesqualificados, EXECUTEPUBLICrevogado. Cleanup rederiva nomes/ownershipflags/semCASCADE; exige ausência dos DOIS conjuntos de objetos ao final. Falha permanece exit1, sem remover/adialogar nenhum gate antigo.

Quatro regressões adicionais das funções REAIS scope/binding/SQLbounded/cleanupPASS local, nove guardmodels no total (5 antigos+4 novos), zeroFAILSKIPCANCEL. A execução focal NativeTSstrip+Function foi necessária pelo modo ES-module do runner local; invocação direta inicial falhou por require indisponível, NÃO defeito do produto nem teste SQL RED. node --check PASS; CLI CI=0 recusou antes de pg/HTTP. Modelos não são prova de rollback HTTPPG. Novos markers INVITATION_ACCEPT_UPDATE_ROLLBACK_PASS e INVITATION_ACCEPT_ATOMICITY_HTTP_PG_PASS ainda PENDENTES nesta preparação, não PASS emprestado. CI esperado1364=[145Web,765mobile,440API,3CLI,11monitor] precisa medir novo HEAD. APK N/A só por identidade integral de inputs/grafo canonical expo prebuild→Gradle, não []/ausência de run/artefato emprestado.

### Recibo anterior571 consolidado neste ciclo funcional (HISTÓRIA, não resultado do novo HEAD)

HEAD67e3b8fc389162a186c4899d4c0b117a906c2d42/treec431b86c2e9876a788b74745348801bcdccd9020/parentmain3e. OWNCI39068354509/job117500598324attempt1COMPLETEFAILURE,ZEROretry.1360=[145Web,765mobile,436API,3CLI,11monitor]unitPASS/fail-skip-cancel0/typesbuildexportmigrationrunner2xprivacyPASS; HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Checkoutcec5e3e46cebfa29e8dcc9e6f56531c87aacb7b6SINTÉTICO[main3e,67e]/treec431equivalente, NÃOHEADliteral.
INVITATION_INSERT_ROLLBACK_PASS20:52:28.3424395Z e INVITATION_ATOMICITY_HTTP_PG_PASS20:52:28.3603093Z ACTUAIS: falhaINSERT500 após oldrevoked+newvisible/witness1, snapshots2tenantsiguais/ACLpoliciesintactos, recuperação explícita201/oldcode400/newaccepted201/managerúnica/cleanupPGPASS. Nenhumprodutoalterado/buginventado.
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual20:53:04.2812605Z; fail20:53:25.1342704Zcreatedteamrendered apósPOST201+12GETERR_ABORTED/canceledTRUE/corsnull; UI12unavailable/—correta. Job/503/recovery/reload/logout/B/fulljourneyNOTcompleted. NãoECR/startup/causaAPI-CORS-vendorprovada; não rerun67e para verde. 10pathsremotebyteexact/492of493existingmainnon-docsoutsideHTTPshellsame/246protectedinputsidentical→APKN/Aintegral; nenhumAPK571atribuído. PRbodyfinal12310charsre-lidoexato é recibo primário. Não emprestar frames/PASS antigos ao novo HEAD.

### Fecho desta preparação e rastreabilidade

Arquivos funcionais: CJSfixture+APItest (quatro casos novos); HTTPshell original571inalterado e todos gates/browser/asserts preservados. Cincooriginais+matrizappend e nova evidência INVITATION_ACCEPT_UPDATE_ROLLBACK_2026-10-17.md. Áreas4equipes/7PostgresRLS/11API mais próximas do aceite somente se logs próprios provarem nova fase; nenhuma área fechada, apenas10TÉCNICAINTERNA aceita e12pendentes. OwnCI/revisão/integração/pósreal ainda PENDENTES. DRAFT se qualquer gatefalhar; no rerunblind/newPR/activitycommit. #572infraregistry é outroPRdraftCIred, não integrado/copiado aqui; #568/#570/#565/#560/#558 separados, externos215219220224228OPEN. Semprodução/serviços/custos/credenciais/contratos/providers/PSP/dinheiroreal.



## Ledger simulado: falha de INSERT após conclusão — ciclo funcional — 2026-10-17 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README e seis documentos normativos originais recuperados completos do GitHub vivo. FULLprefix main+apêndices históricos de571007 preservados NO LUGAR, sem resumir/substituir original. PR independente do571 (convites), sem repetir seu CI, sem copiar seus scripts/workflows/gates ainda não integrados. Esta entrega cobre área6ledgerSIMULADO, área7RLS/tenant e área11API; não fecha nenhuma área.

Lacuna concreta: WorkAssignmentsController.complete faz UPDATE work_assignments(status/completed_at), depois INSERTearnings_ledger na MESMA DatabaseService.tenant BEGIN/SETLOCALapp_runtime/tenant/COMMIT/catchROLLBACK. assignment-lifecycle/work-assignments-inputtests cobrem entradas/ACK/filtros/SQL/erro genérico; http-finance-reconciliation-e2e cobre callbackHMAC/replay/recipient/totais, não testemunha erroSQL tardio doINSERTledger apósstatuscompleted. Migrations0006/0007/0044/0065 mantêmRLS/uniquenessassignment/noDELETEledgerapp_runtime/FKassignmenttenant. Não há bug transacional reproduzido ou patch emproduto; a entrega preenche uma lacuna de teste do contrato existente.

Novo scripts/ledger-completion-atomicity-e2e.cjs: reutiliza configuraçãoCI/localAPIHTTPportaexplicita/PGlocalhostporta+DBEXATOmlivretrabalho_http; carrega pg só após guarda e valida socketPGreal loopback antesfixtures/DDL. Duasempresas/profissional/outsider/perfil/availability/jobs/interest/confirm/memberships/checkin/start/checkout são criados porHTTP. TenantB concluído viaHTTP anteshook e possui ledgerpayable34567real; tenantA permanecechecked_out/semledger, valor23456. Vincula assignment/job/tenant/profile/identity/títuloUUID/valor/Dateobjects/estado aoPG anteshook. Negativos401semAuth/outsider/crossowner e400sameproforeignassignment devem preservar integralmente snapshots de5tabelas em2tenants; não seedpapel/SQLdatawrites/adminhistorydelete.

HookAFTERINSERTearnings_ledger temporário SÓbancodescartável: scopeUUID+amountfixo/nomesderivadospróprios. SECURITYDEFINER sówitnessbounded/search_pathfixo/schemaqualified/EXECUTEPUBLICrevogado; exigeverassignmentcompleted+completed_at eUMledgerpayableexato visíveis na mesma transação antesavançarsequêncianãotransacional1+raise→HTTP500. Apóserro exige5tabelas(work_assignments/earnings_ledger/company_jobs/tenant_memberships/payment_events)dosDOIStenants exatamenteiguais +ACLpoliciesRLSiguais, assignmentGETchecked_out/completedAtnull eearningsGETvazio. Não é PATCH no produto nem provider/transferência/dinheiroreal.

ApóscleanupSÓobjetoscriados/flags/nomesrevalidados/semCASCADE, UMAconclusãoEXPLÍCITA201 deve gerarUMledger23456payable e somentealtera2camposstatus/completed_at doassignment. Todosoldrows/tenantBledger/grants/policies intactos. Repetircomplete apóscompleted→400 sem novoledger é contrato atual, NÃO alegar201idempotente nem retryautomático. ConsultaPG comprova ausência owntrigger/function/sequence. Nenhumapp/controller/DatabaseService/migração/SQLproduto/ACL/deps/lock/mobile/native/workflow/build/smoke/React19.1.4/RN0.81.6 alterado.

Seis guardmodels em apps/api/src/ledger-completion-atomicity.test.ts executamfunçõesreais scope/binding/witnessSQL/cleanup:local6PASS/fail-skip-cancel0 viaNativeTSstrip+Function, node--checkPASS eCLI CI=0refusedantespg/HTTP. NÃOprovaSQL/HTTP/UI. Markers novos LEDGER_COMPLETION_INSERT_ROLLBACK_PASS e LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS PENDENTES nesta preparação, só aceitar porCIpróprioexato. CI esperado1361=[145Web,765mobile,437API,3CLI,11monitor] nãoresultadojámedido. Uma invocaçãoantesbrowser noHTTPshell; TODOSoldcalls/asserts/gatesincludebrowsermantidos, semsecurity/CDP/Fetchguard/CORS/sandbox/LNA/deadline/flags/imageweakening. APKN/A SOMENTE apósconferência integral insumos/grafoexpo-mobileprebuild→Gradle; não[]/ausênciaruns/borrowedAPK.

### Recibo571007 final consolidado neste ciclo (história, não resultado do novo HEAD)

#571DRAFT HEAD007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb/tree49f043f544cf0a9bae2299bb686ece458a8293b1/parent67e3/main3e. OwnCI39072426685/job117512606508attempt1COMPLETEFAILURE,ZEROretry;1364=[145,765,440,3,11]unitPASS/typesbuildexportmigrationrunner2xprivacyPASS/HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Actualcheckoute364e571a9d208be2c6ed215d12cfd8847ccd739primary21:48:00.6701256ZSINTÉTICO[main3e,007]/tree49figual,nãoHEADliteral.
Nova provaaceiteHTTPPGPASS21:50:13.4912912Z e21:50:13.5048641Z: erroUPDATEaccepted_at depoismember+convitevisíveis/witness1/5guards+4models/rollback2tenant/conviteativo/samecode201explicit/replay400/membershipmanagerúnica/cleanup2hooksPGPASS; não caminho promoção papéis. OriginalrenovaçãoPASS21:50:13.4679747Z/21:50:13.5051887Z neste007.
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual21:50:52.8196851Z. Fail21:51:15.4245332Zcreatedteamrendered/teamPOST201→12GETERR_ABORTED/canceledtrue/corsnull/UIunavailable—correta. Job/503/recovery/reload/logout/B/fulljourneyNOTcompleted, rootUNRESOLVED, nãoECR/startup/API-CORS-vendorcausaproof. Nenhumrerun/ready/merge571. FinalPRbody19179charsre-lidoexato11pathsbyteexact/fullprefixpreserved/249protectedunchanged→APKN/Aintegral/nenhumAPK571. PNGdesktopprópriossómetadata/signatureSHAbytes1365x900PASS,nãovisual/native/Gitassets:login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686;failure4d25511d5a01f3afb096a28244556f342892651e61005c07d37745797459e6f9/133250. NãoemprestarPASSframes.

### Fecho da preparação

Código/test6/localguardprova/documentação preparados, HTTPPGreal/CIreview/integração/pósreal PENDENTES. Cincooriginais+matrizpreservadosappend e evidência LEDGER_COMPLETION_INSERT_ROLLBACK_2026-10-17.md; duasnotasoriginais571 copiadas comoHISTÓRIApelosmesmosblobs,nãoimportscriptsde571. Sóárea10AndroidstandaloneTÉCNICAINTERNOaceita;12pendentes. #558/#560/#565/#568/#570/#571/#572draftsseparados/ext215219220224228OPEN. Nenhumcommitatividade/alertmanual/novaautomação/produção/serviço/custo/credencial/contrato/provider/PSP/dinheiroreal. RevalidarHEAD/base/bytes/modes/tree/ancestrais; mergeúnicoexpectedSHA sóCIcompletoSUCCESS+APKaplicávelGREEN e pósREAL. SeCIfalharporbrowser registrarlog e avançaroutroitem, semrerunmesmoSHAparaverde.



## Privacidade mobile: validar calendário antes de confirmar fatos — ciclo funcional — 2026-10-17 UTC

Escopoexclusivo dbdanielbaracho/MLIVRETRABALHO;base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README/DVToriginalv1.104/memória/checkpoint/ledger/registry/matrizrecuperadoscompletosGitHubvivo. PrefixosINTEGRAISmain+história571/573 preservadosNO LUGARporapêndice,nãoresumo/substituição. Nenhumledger/convite/workflow/gate nãointegrado dessesPRs écopiadofuncionalmente;3notasexistentessegregadascomohistória,pelosmesmosblobs.

FalhaREPRODUZIDA: privacy-requests.ts usaDatefinito e normaliza calendáriosimpossíveis nos createdAt/completedAt →READY. privacy-actions.ts fazomesmoemexportgeneratedAt/identity.createdAt/privacyRequests.createdAt→GENERATED eACKdeactivatedAt→DEACTIVATED. Trêsvalores2026-02-30T12:00:00Z/2025-02-29T12:00:00-03:00/2026-04-31T12:00:00+02:00 cobremseiscampos. APIPrivacyControllerrealretornaPGtimestamps/now()/generatedAtnewDateISO;NÃOháprovaPGinvalid/APIbug/exploit/produção. Trata-sedeaceitaçãoindevidadeJSONincompatívelpeloshelpersreaissusadospelatela,comcallbackscontrolados.

23regressõesNOVAS apps/mobile/tests/privacy-calendar.test.mjs:18negativos(6campos×3datas)+5controlespositivos,baseline5PASS18FAIL;14oldprivacytestssemassertalterado→conjuntoRED19PASS18FAIL. Fixapenas2predicadosdate emprivacy-requests.ts/privacy-actions.ts, funçãoBYTEIDÊNTICAàAgenda(main): componentescalendárioISOlocaisantesdeDatefinito. Nãoéconversãonemnormalização dedata. GREEN37/37zeroFAILSKIPCANCEL,inclTZAmerica/Sao_Paulo;novo23GREEN.NovoCIesperado1378=[145Web,788mobile,431API,3CLI,11monitor]PENDENTE,nãoemprestar567verde.

Lêdataimpossível→ERROR;exportincompatível→UNKNOWNsemcópia;ACKdesativaçãoincompatível→UNKNOWNapósUMPOSTbodylessinalterado,semretry. Controleleapday2024/epoch0string/offsetcruzaUTCpreservadosstrings/fatos;completedAtnull/missing/vazioautorizadopreservados;requiredtimestampnull/missingcontinuafalha. runForSession atual(staleporidentity/deadline)permanece,aoperaçãoocorreumaúnicavez;14oldcontrolsreauth/reasons400/unknown/responses/session/payloads/DSARpreservados. TestesexecutamhelpersTypeScriptREAIS+fixturesJSONexplícitas,nãoAndroidUI/HTTPPG/SecureStore/limpezarealdesessão.

Reverse-substitutionINTEGRAL confirma TODOsourcefora2predicadosBYTEEXATO: requests/paths/methods/bodylessPOST/auth/session/current/deadline/ACKIDs/rejections/unknown/retrypolicies/retention/ACL/DSAR/SQL/API/RLS unchanged. Telaapps/mobile/app/privacidade.tsxTOTALMENTEinalterada: UNKNOWNjámarcauncertain e nãoencaminhaaceitaçãoDEACTIVATED; nãoalterarclearSession/router/design/handlers. Não alegar sessão realapagadaouimpedidaemAndroidapartirdehelperunit. React19.1.4/RN0.81.6/deps/lock/workflow/build/smokeinalterados. Mudançamobile→OWNCI+OWNAPKobrigatórios,noHEADexato;APKN/AéFALSO.PósCI/APKnoMERGEREALtambémobrigatórios.NenhumAPKantigoemprestado.

### Recibo573 FINAL consolidado neste ciclo funcional (HISTÓRIA, não resultado deste novo HEAD)

PR573DRAFT HEAD5852d5527e347312d473a6fac8cc3a604ff2eb52/treeff1d0ec816605367a1a0c0d809391f6c3e98b2d2/parentmain3e. Fixtureledgercompletion+6guardmodelsLOCALPASS/nodesyntaxPASS/CLI CI=0refused, nãoSQLproof. OwnCI39076638325attempt2COMPLETEFAILURE:attempt1/job117525041067ECRpostgres17toomanyrequestsDatalimit22:49:56.4661814Z..22:50:02.4990382ZANTEScheckout;EXATAMENTEUMretryespecíficofailed-completedMESMOSHA attempt2/job117525180707mesmoerro22:50:38.6329457Z..22:50:50.2411551Z. QuotaNÃOresolvida/semoutroretry/registrochange/credencial/custo.
AMBOSInitializecontainersFAIL/Checkout/TODOSprodutosSKIPPED;nenhumcheckoutACTUAL/Chrome/DOM/PNG/HTTPPG/ProductionTruth/LEDGER_*PASSobservado.1361SÓESPERADO,nãoexecutado.PassSQLnãopodeemprestado571.12pathsremotebyteexact/249protectedinputsiguais→APKN/Aintegral/nenhumAPK573. FinalPRbody8258charsreadbackexato;noREADY/merge/pós573. GitprepPENDINGhistóriapreservada,estaéconsolidaçãoemciclofuncional,nãometadatacommit.

### Fecho desta preparação

Código2predicados+23newtests/37focalPASS+evidênciaMOBILE_PRIVACY_CALENDAR_2026-10-17.md+5originais/matrizappendpreparados;CI/APK/review/merge/pós-gatesaindaPENDENTES. Áreas8privacidade/11APIcliente/12rastreabilidade maispróximas,nenhumaceiteintegral.Só10AndroidstandaloneTÉCNICAINTERNOaceita12pendentes;externos215219220224228OPEN. Nãoadotar572registryparaverde,nãorerun573mesmoSHA;571007browserrootUNRESOLVEDpreservado/558560565568570separados. Semprodução/Railway/Neon/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal. Semnovaautomação/manualActivitywrites/commitatividade.AssertivasbrowserCDPFetchguardCORSsandboxLNAdeadlinesflagsimagesintactas.



## Ganhos: JSON real após rollback e recuperação explícita — ciclo funcional — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Extensão coerente do PR573 existente, branch test/ledger-completion-insert-rollback-20261017, parent5852d5527e347312d473a6fac8cc3a604ff2eb52/treeff1d0ec816605367a1a0c0d809391f6c3e98b2d2; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README e seis originais recuperados integralmente em refs imutáveis do GitHub vivo. Prefixos FULLmain+571+573+574 preservados NO LUGAR por apêndice, não substituídos por resumo. A nota de privacidade574 é preservada pelo mesmo blob, sem copiar seus dois patches mobile/teste nem gates de outros drafts.

Lacuna definida: o fixture573 já exige HTTPearnings vazio depois de rollback e um ledger payable23456 depois da recuperação, mas não passa ESSES dois JSONs ao consumidor real apps/mobile/lib/earnings.ts usado em Ganhos. Acrescenta consumeEarningsJSON ao próprio CJS, importando o source REAL por caminho fixo, NativeTSstrip+VM, sem modificar o helper. Callback retorna SOMENTE o objeto já recebido pela chamada HTTP existente; exige uma execução/uma leituraJSON, READY e a mesma referência de dados. Rollback exige [] autorizado; positivo exige UMA linha com id do ledger obtido independentemente do PG, tenantId/assignmentId do escopo HTTP↔PG, amountCents23456/statuspayable. Expectativas malformadas/incompatibilidade/schema inválido falham sticky, nunca viram zero ou PASS. Não há fetch/SQL/POST/retry nessa função.

Todos os20 comandos awaitcall anteriores foram confrontados e mantidos nas mesmas posições; o GET pós-rollback apenas ganha variável para compartilhar a resposta com o helper. Nenhuma requisição adicional, SQL do hook/snapshots/cleanup/ACL/RLS, operação de produto ou reordenação de gates. Marker novo LEDGER_MOBILE_REAL_JSON_PASS só poderá ser aceito se o CI próprio executar os DOIS consumos reais e TODOS os controles anteriores até cleanup/400 replay. Os antigos LEDGER_COMPLETION_* permanecem exigidos. NESTA PREPARAÇÃO nenhum marker HTTPPGnovo foi executado; não emprestar dados/CI574/571 ou modelo local.

Quatro testes NOVOS das funções REAIS em apps/api/src/ledger-completion-atomicity.test.ts: vazioREADY sem transporte; positivo preservado; bindings tenant/assignment/ledger/amount/status e expectativas forjadas recusados; schema/data impossível não aceitos como vazio/positivo. Seis testes antigos preservados byte a byte exceto destructuring para importar nova função: total10PASS/zeroFAILSKIPCANCEL local viaNativeTSstrip+Function. Oito testes earnings.test.mjs da main executados SEM alterar asserts:8PASS. node--checkPASS; CLI CI=0 recusa antes de pg/HTTP. Local18PASS não é rollbackSQL/AndroidUI/rede/SecureStore/provider/produção.

CI novo esperado1365=[145Web,765mobile,441API,3CLI,11monitor], AINDA PENDENTE, não resultado. Não rerun5852 nem esconder falha anterior: run39076638325attempt1job117525041067 eattempt2job117525180707 falharam por quotaECRpostgres17 ANTEScheckout; retryespecíficoúnico consumido e sem resolução. Nova execução é justificada por novo caso funcional/novoHEAD, não tentativa de verde. Workflow/registro/imagem/CDP/Fetchguard/CORS/sandbox/LNA/deadlines/securityflags/asserts intactos.

### Recibo574 final consolidado (história, NÃO resultado do novo573)

PR574DRAFT97aa91d545df32cbcb6076b3669c3fc233dafdc3/tree333ddc4deb51fd1758cb8f00593a31afe8fb8471/parentmain3e. Dois predicados calendário/23novas regressões, baseline5PASS18FAIL→23GREEN;14old→37focalGREENinclSaoPauloTZ;288boundarychecksPASS fora da contagemCI. OwnCI39080576526/job117536501485attempt1FAIL/ZEROretry:1378=[145,788,431,3,11]unitPASS/typesbuildexportmigrationrunner2xprivacyPASS; HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual23:54:19.5174338Z; fail23:54:40.3638911Zcreatedteamrendered apósPOST201→12GETERR_ABORTED/canceledtrue/corsnull/UI12unavailable—correta. Semjob/503/recovery/reload/logout/B/fulljourneyPASS; rootUNRESOLVED/nãoAPI-CORS-vendorprovado.

OwnAPK39080576491/job117536501043attempt1SUCCESS/ZEROretry:build2026-10-17T23:59:50.6491950Z/install2026-10-18T00:01:17.7474676Z/DEVICE_SMOKE_OK00:01:30.0505171Z withoutMetro. Ambosactualcheckoutdb80b5523a8d7889c6c9c318c0b17de8b1940ba2SINTÉTICO orderedparents[main3e,97aa]/tree333digual, NÃOHEADliteral. Artifact12119106701notexpired/expires2026-11-01T00:01:31Z ZIP28912115bytes/SHA256030c9be65cd67e12addd756fead5aca9dac3b2b282acf0e1a2c1bf5f6a80a8f0; individualAPK66161616bytes/SHA2563d561dee39968483d0d54fb3a74a3d38a6c1265876ca4cb91bea16c535caef9d/SHA256SUMS/BUILDINFOcommitdb80/release/packagefixed/metrofalse conferidos. ZIP≠APK. ManifeststaticSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36/INTERNET/noexplicitcleartextnetworkconfig NÃOprova transporte/UI. 574NÃOmerged;mainAPKvalidado ainda567POST3e. Recibo integral PR574 preservado na nova evidência deste ciclo; nenhuma prova nativa de formulários/privacidade/SecureStore/físico.

### Fecho desta preparação / rastreabilidade

Arquivos funcionais alterados: scripts/ledger-completion-atomicity-e2e.cjs e apps/api/src/ledger-completion-atomicity.test.ts. HTTPshell573 já existente permanece byteidêntico; mainmobile/APIproduto/migrações/deps/lock/workflows/build/smoke intocados. Evidência LEDGER_MOBILE_REAL_JSON_2026-10-18.md +5originais/matrizappend. Requisito área6ledgerSIMULADO→complete/earningsAPI→rollbackvazio/recuperaçãopayable→loadEarningsreal→4tests+oldcontrols→CIpróprio/markers PENDENTES→evidência. Área7RLS/11API/12rastreabilidade também beneficiadas, NENHUMAaceita integralmente. Apenas10TÉCNICAINTERNOaceita12pendentes.

APK N/A SOMENTE mediante comparação integral de blobs/modes e grafo canônico expo-mobileprebuild→Gradle; não []/ausência de run/APK574emprestado. Rever todos paths/ancestrais/HEAD/base; mergeumaúnicavezexpectedSHA SÓCIcompletoSUCCESS e pósCIreal. Se falhar, manterDRAFT/semretryproduto, registrar log e avançar frente independente. Nova prova não garante resolver quota nem causaERR_ABORTED. Sem produção/PSP/dinheiroreal/providers/novosserviços/custos/credenciais/contratos/root/grants/RLSdisable/automaçãoextra/Activitymanualwrites. Próximo passo técnico: observar markers próprios no novoHEAD e fullCI; recibo final noPR antes de futura consolidação funcional append-only, sem commitautorreferente de status.



## Transações: preservar falha original e descartar cliente após ROLLBACK falho — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, paisordenados[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. Nova fatia de produto independente dos fixtures573/571; nenhum PR duplicado e nenhum gate deles importado. README e seis documentos normativos originais foram recuperados completos em refs imutáveis. FULLprefix main+histórias571/573/574/dfb2 nos cinco originais e matriz preservado NO LUGAR, por apêndice. Cinco notas históricas são mantidas pelos mesmos blobs; nenhum script/appfix/workflow de drafts é incorporado.

Defeito reproduzido nas funções REAIS DatabaseService.transaction e tenant: depois de erro em BEGIN, callback, COMMIT ou configuração do tenant, o catch faz ROLLBACK. Se esse ROLLBACK também rejeitar, substitui o erro primário pelo erro de rollback e finally chama release() normal. A reprodução usa objetos Pool/client explícitos, não rede nem banco. Não prova conexão PG real reutilizada, vazamento tenant, exploit ou incidente em produção.

24 regressões novas em apps/api/src/database-rollback-release.test.ts, sobre prototype da classe REAL: baseline14PASS10FAIL/exit1 → candidato24PASS/zeroFAILSKIPCANCEL/exit0 local via NativeTSstrip+Function. Cobrem ambos wrappers: sucessoCOMMIT/valor original; conexão recusada semquery/work/release; falhasBEGIN/WORK/COMMIT com rollback bem-sucedido ou falho; aguardar rollback pendente antes de liberar; ausência de retry de callback; valor rejeitado nãoError preservado. Quatro casos tenant adicionais cobrem falhaSETLOCALROLE e set_config com ambos resultados de rollback, sem executar callback. Anotações de fixtures respeitam strict/noUncheckedIndexedAccess/exactOptionalPropertyTypes; typecheckCI ainda pendente, não é PASS por strip.

Fix mínimo SOMENTE nas duas funções de apps/api/src/database.service.ts: variável rollbackFailed inicialmentefalse; ROLLBACK é aguardado em try/catch e sua rejeição marca descarte; o mesmo erro primário é relançado; finally chama client.release(true) SOMENTE se rollback falhou, caso contrário o release() original. Nenhum retry, novo SQL, log ou credencial. Reverse-substitution integral reconstrói a fonte main byte a byte fora dessas duas mudanças. Pool constructor/query/onModuleDestroy, assinatura, callback/valor/sucessoCOMMIT/BEGIN, SET LOCAL ROLE app_runtime e set_config('app.tenant_id',$1,true) com parâmetros permanecem intactos. Não altera política tenant/RLS/ACL, membership, role, migração, controller, endpoint/payload/auth/session ou negócio.

API oficial node-postgres https://node-postgres.com/apis/pool#releasing-clients consultada2026-10-18: release(true) instrui descarte em vez de devolver ao pool. Lockfile lido: pg8.23.0/pg-pool3.14.0/@typespg8.23.1, sem alteração/instalação de dependência. Não confundir documentação ou fixture de client com teste de banco real. Os testes compilados no CI importarão DatabaseService real com dependências existentes; local usa o mesmo source e fixtures explícitas. Nenhum pressuposto sobre falha de driver específica ou tenantleak.

### Recibo final573dfb2 consolidado neste ciclo funcional (história, não PASS do novo HEAD)

PR573DRAFT HEADdfb2ccf818274e55f348c0640ead9bc58edd7655/tree201e959b6f6762e32e22005bb16f564fe1b5e2f0/parent5852. EntregaCJSconsumeloadEarningsrealinalterado/4novosmodels+6old=10PASS e8oldGanhosPASS; nãoHTTPPG. OwnCI39084499453/job117548129772attempt1COMPLETEFAILURE,ZEROretry: quotaECRpostgres17toomanyrequestsDatalimit00:54:33.8036969Z/00:54:38.7258144Z/00:54:45.9339526Z/Dockerpullfailed00:54:45.9445280Z. InitializecontainersFAIL/Checkout+TODOSprodutosSKIPPED. NenhumcheckoutACTUAL/Chrome/DOM/PNG/HTTPPG/ProductionTruth, nenhum dos3LEDGERmarkers executado;1365 apenasESPERADO, não unitPASS. Old5852attempt1+2tambéminfra, não outroretry/registrychange. Fullfinalbody17133chars preservado integralmente na evidência DATABASE_ROLLBACK_CLIENT_DISCARD_2026-10-18.md. Não copia fixture573 ou seus10tests/HTTPshell para esta branch. APK573N/Aintegral, nenhumAPKatribuído.

### Fecho desta preparação e requisito mais próximo do aceite

Alteração funcional: DatabaseService em duas funções e24 regressões reais. Evidência DATABASE_ROLLBACK_CLIENT_DISCARD_2026-10-18.md; cinco originais+matrizappend, história íntegra. Área7PostgresRLS/tenant→DatabaseService falha de cleanup→erro primário/discard→24testes→CI/PGevidência própria PENDENTES. Áreas8falhas e11API também beneficiadas. Nenhum aceite integral: só10AndroidstandaloneTÉCNICAINTERNOaceita, outras12pendentes.

CI esperado1379=[145Web,765mobile,455API,3CLI,11monitor] (431API+24), não resultado medido. CI completo novoHEAD/revisão/merge/pósreal PENDENTES. APK N/A apenas após identidade integral de insumos mobile/packages/rootdeps/lock/workflows/build/smoke e grafo canônico expo-mobileprebuild→Gradle; não []/ausência de run/APK574emprestado. Não mudou React19.1.4/RN0.81.6/desenho/segurança/CDP/Fetchguard/CORS/sandbox/LNA/deadlines/images; browserERR_ABORTED permanece questão separada não corrigida aqui.

Próximo passo técnico: conferir todosbytes/modes/tree/ancestrais e CI próprio exato. ManterDRAFT se falhar; semrerunproduto para verde ou quota persistente, avançar item independente. Integração somente por expectedSHA/CIcompletoSUCCESS e pósCIreal. Registrar final primário noPR, consolidar em próximo ciclo funcional sem commitmetadados/autorreferência/atividade. Semprodução/Railway/Neon/serviço/custo/credencial/provider/PSP/contrato/dinheiroreal/root/grants/RLSdisable/Activitymanualwrites/novaautomação.



## Convites: rollback da promoção de manager para owner — ciclo funcional — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Estende PR571 existente na branch test/invitation-insert-rollback-20261017; parent007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb/tree49f043f544cf0a9bae2299bb686ece458a8293b1; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README, originais completos, código/controller/testes/migrações/grants e CI/APK consultados em GitHub vivo. FULLprefixmain+571+573+574+575 dos5originais/matriz preservados NO LUGAR por apêndice, não resumos substitutivos. Notas históricas preservadas pelos mesmos blobs; DatabaseService575 aindaDRAFT NÃOcopiado ou integrado.

Lacuna concreta: CompanyMembersController.accept atual suporta promoção de membership existente manager/admin→owner por conviteowner emitido por ownerreal, fazendo UPDATErole antes de UPDATEaccepted_at. PR571007 provou rollback de INSERTmembership, não promoção. Migrations0001/0004/0039/0047 autorizam UPDATEruntime já existente e mantêm RLS/FORCE, unicidade tenant/subject/identity e paraccepted_at/by; nenhum novo grant/política inventado. Esta fatia testa SOMENTE manager→owner. Não altera controller/DatabaseService/SQLproduto/auth/roles/migrações ou presume bug transacional.

Extensão scripts/invitation-atomicity-e2e.cjs DEPOIS de todos comandos/asserts/markers antigos: targetmanager já foi criado por aceiteHTTP real da etapa anterior. OwnerA emite novo conviteowner porHTTP (não seedrole). Scopephasepromote exigeUUIDtarget/priorRoleEXATOmanager e namespaceinv_promote separado. BindingHTTP↔PG comprova invitationId/tenant/ownerator/email/roleowner/hashdocódigo/ativo e UMAmembershipmanager comtenant/identity/subject exatos ANTESDDL.

HooktemporárioownedAFTERUPDATEaccepted_at exige ver simultaneamente membershipowner+conviteowneraceito exatos na transação; só então sequenceprópria1 não rollback e errocontrolado→HTTP500. Deve preservar snapshots integrais detodaslinhas invitations/memberships dosDOIStenants+RLS/policies/ACL; GETmembros autorizado continua manager e conviteowner continuaativo. Apóscleanupapenasobjetospróprios, UMAaçãoEXPLÍCITA comMESMOcódigo201 deve alterarSÓrolemanager→owner eparaccepted_at/by, semnovamembership, preservartodosoldrows/tenantB; replay400semnovadelta; PGconfirmaownhookausente. NÃOretryautomático, transferênciadeownershipinferida, emaildelivery/provider/native/produção.

Reusa todas guardasCI/localAPIportaexplícita/DBEXATOmlivretrabalho_http/socketloopback; carrega pg sóapósconfigguard. NomesrederivadosUUID/boundedemail, SECDEFsówitnessowned/search_pathfixo/schemaqualified/EXECUTEPUBLICrevogado, cleanupflags/priornamespacesinalterados/semCASCADE/ORREPLACE/grantapp_runtime/RLSdisable/root/historydelete. Osmesmos9tests antigos eTODOsourceparent fora extensão reconstruídosBYTEEXATOSporreverse-substitution, inclusivewhitespacefinal. Quatro guardmodelsNOVOS reais scope/binding/SQLwitness/cleanupPASS; total13PASS/zeroFAILSKIPCANCELlocal NativeTSstrip+Function; node--checkPASS/CLI CI=0recusouantespgHTTP. Modelos NÃOprovaHTTPPG.

Novosmarkers INVITATION_PROMOTION_UPDATE_ROLLBACK_PASS e INVITATION_PROMOTION_ATOMICITY_HTTP_PG_PASS PENDENTES até logs próprios. CI novo esperado1368=[145Web,765mobile,444API,3CLI,11monitor] (431main+13), NÃOresultadojámedido. TodosoldHTTPshell/browser/gates/asserts/deadlines/CDP/Fetchguard/CORS/sandbox/LNA/flags/imagesinalterados. APKN/A SÓapósrevisãointegralinputs/grafoexpo-mobileprebuild→Gradle, não[]/ausênciaruns/APKemprestado.

### Recibo575 FINAL consolidado (história, não resultado deste novo571)

PR575DRAFT HEAD89f799914fdcadaa75f7569b78c8483953829295/treed9ca8e85f8f2410474c18c73d85e99adbec66b72/parentmain3e. Fix2wrappersDBrollback,24regressõesbaseline14PASS10FAIL→24GREEN;mutaçãoomitirdiscard14PASS10FAILLOCAL. OwnCI39090990507/job117567517336attempt1COMPLETEFAILURE,ZEROretry:1379=[145,765,455,3,11]unitPASS/fail-skip-cancel0/typebuildexportmigrationrunner2xprivacyPASS/HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Actualcheckoutd3447a773881d73bf358476b2235882d789bcde8primary02:41:50.5247148ZSINTÉTICO[main3e,89f799]/treed9caequivalente,nãoHEADliteral.

Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual02:44:58.9839611Z. ActualONEteams503CONSUMED+11distinctGET200/unknown—/humanrefresh12NEWGET200/team1/noextraPOSTPASS02:45:01.0243014Z;Ateamjob201/render/persist12345centsdatesPASS. FAIL02:45:20.8951636Zloaded-dashboard apósPage.reload/newdocumentcompleteguard;12GETERR_ABORTED/canceledtrue/corsnull/UIunavailable—correta. Reloadsuccess/logout/B/revokedbearer/fulljourneyNOTcompleted; rootUNRESOLVED/nãoECRstartuppermissionAPI-CORS-vendorcausa. 14pathsremotebyteexact/249protectedinputsiguais→APKN/Aintegral,nãoAPK575. FINALbody12344charsreadbackexato preservadointegral na nova evidência deste ciclo. Seus5OWNdesktopPNGs+manifest agora preservados nesteCICLOFUNCIONAL com fontehead/tree/checkout/run/job/attemptFAIL próprios sob web-browser-2026-10-18; NÃOframes571/nativo/PASS emprestado. SignatureSHAbytes1365x900/Pillowverify do ciclofonte e normalizedbase64readback atuais exigidos; sem inspeção visual alegada.

### Fecho desta preparação e próximo passo

ArquivosfuncionaisCJS+APItest;5origdocs/matrizappend+INVITATION_OWNER_PROMOTION_ROLLBACK_2026-10-18.md e evidênciashistóricas vinculadas, semstatuscommitartificial. Requisitoárea4equipes/7PostgresRLS/11API→conviteownerautorizado/managerexistente→falhaúltimaescrita→rollbackrole+convite→13guardmodels+NOVOHTTPPG PENDENTE→CIpróprio/recibo. Nenhumaceiteintegral; só10AndroidstandaloneTÉCNICAINTERNOaceita12pendentes. Externos215219220224228OPEN.

CI/review/integração/pósreal aindaPENDENTES nesta preparação. ConferirnovoHEAD/tree/pais/bytes/modes/fullprefix/ownCI; mergeúnicoexpectedSHA SÓcompletoSUCCESS e pósCIreal. Se falhar manterDRAFT, registrarprimário e avançar outrafrente, sem rerunmesmoSHAparaverde. Não ready/merge/retry575/571007/573/anteriores. Semprodução/Railway/Neon/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal/Activitymanualwrites/novaautomação. Recibofinal seráPRbody e consolidado sópróximocicloFUNCIONAL, semmetadataautorreferente.


---

## Execução funcional — correlação passiva de lifecycle/requisições Web — 2026-10-18 (preparação)

EscopoexclusivoMLIVRETRABALHO. EstendePR558existente, nãoPRduplicada. Mainviva3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c incorporadacomparentordenadonormal, semforce. Preservatodo558879e todosoriginaisnoLUGARporapêndice; delta normativo57185completoapósprefixocomum éimportadoINTEGRAL, nãoresumo. ProdutoWeb/API/mobile/SQL/RLS/deps/lock/workflows/build/smoke byteidênticosamain; scripts/testsproduto de571/573/574/575 NÃOcopiados.

Entrega concreta3paths: novo scripts/web-browser-lifecycle-trace.cjs + apps/web/app/browser-lifecycle-trace.test.ts + ligaçãopassivaem scripts/web-browser-transport-probe.cjs. Lacunaeraausênciadecontextdestroy/clear eframeloaderlifecycle emstreamcorrelacionadoaNetworkrequestids. Hipótesefalsificável: observar seMESMOframe/loader apresenta transiçãoantesdos12loadingFailed; ordemrecebida NÃOcausalidade. NãoatribuirChrome/API/CORS/React/produção nemausênciadeeventoàausênciadecausa. Semcorreçãoaplicativainventada.

CollectorallowlistsemURL/header/body/token/email/stack, idssegurosnullable/workerloaderidvaziopreservado; recebimentosequence+hostepochms/browsermonotonicseconds/browserwallseconds SEPARADOS. Contextnumericreuso comuniqueidconflitantenãocorrelacionafalso. Bounds4096events1024requests256contexts comdropped/evictedexplícitos. NO comandos/HTTP/storage; probeadicionaSÓcollector,observe,enablelifecycleobservaçãoeWEB_BROWSER_LIFECYCLE_DIAGNOSTICfinalinclusiveFAIL. Baseline/log-only/native-only/instrumenteddistinguemobservadoresORIGINAIS, nãoalegamzeroobservaçãoCDP. TODOSoldguards/continuefail/loopbackHTTP/script0/deadlines/flags/securityCORSsandboxLNA/asserts e13casos+exit1stickyinalterados.

8novosactualcollector/wiringtests:7PASS1FAILantesligação→8GREENdepois; lacunadeinstrumentaçãoNÃObugproduto.25oldhelpers/shelltestsassertsinalteradosPASS; total33focalPASSzeroFAILSKIPCANCELlocal. Node--checkmodule/probePASS. NativeTSstripNode24.19.0/fixturesCDP-shapedsãoLOCAL,nãoChrome/CDP/HTTPPG/Android/SecureStore/produção. OfficialCDPcontratosprimáriosimmutáveis a07da3c859be8526571a69be9c1f3c6e91cc0a26(Page/Networkpdl+RuntimeJSON)consultados; NÃOschemaexataChromeinstalado. Reverse-substitutionreconstróiprobe879BYTEEXATOfora4adições.

Recibo57185FINALhistóricoconsolidado: HEAD85e9c992b6e7a1568b8ea865e43da63477c5f3a0/treeca88187efb97fbf1f9312ec6494b136a88e57b43, próprio39091663600/job117569533700attempt1FAILquotaECRANTEScheckout/allprodSKIP/zeroRetry.13testsLOCALPASSnãoPGproof;1368SÓESPERADO,nãotestexecutado. PromotionmarkersNÃOexecutados,nenhumcheckout/Chrome/frames85. CorpoPR57128782charsINTEGRALna novaWEB_LIFECYCLE_REQUEST_CORRELATION_2026-10-18.md,juntocomcorpo55887960388charsINTEGRAL. Assetsimportadosmantêmfontespróprias/FAILhistórico,nãocurrentframes/native;nenhumaimagemnovaalegada.

Fechopreparação: área1/2/13requisitojourney→coletorpassivo→8new+25oldlocal→NOVOHEADCI/realChrometracePENDENTES→reciboexato. Nenhumaceiteintegral; somente10TÉCNICAINTERNOaceita12pendentes,não%implementado. CIcompletoobrigatório, não[]/queued/skippedPASS; APK N/A SÓporidentidadeINTEGRALinputs/grafoAndroidcomfreshmain. MesmoisoladogreenNÃOresolve558semcausajustificada/gatesíntegros. DRAFT/noready/merge/rerun879/85/89f799;semproviderPSPproduçãoRailwayNeoncustoscredenciaiscontratosdinheiroreal/root/grantsRLSdisable/Activitywrites/novaautomação. Seinfra/browserfalhar registrarprimário ePASSARoutrafrenteindependente. FinalseráPRbodyeapêndiceSÓpróximociclofuncional,semstatusautorefcommit.


---

## Notificações — prazo de marcar como lida e ownership — 2026-10-18 (preparação funcional)

EscopoexclusivoMLIVRETRABALHO; novaentregapequenaindependente:2pathsfuncionais NotificationsScreen.tsx e30regressões notifications-write-deadline.test.mjs, base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c. PRs568/570/574/575/560 nãoalteramessaTela(sourceSHAigual);560rollbackAPI nãoé prazoUI,nãoduplicado. Semadotar/removergatesdosdrafts558/565;todosgatesDAMAINaprovadapreservadosBYTEEXATOS.

Defeitoreproduzido: read(n)operationabort-onlydeixavaUIREADY+pending1indefinidosquandoauth/fetch/JSON/finalauthnuncaresolve.30actualhandlerpreJSX+realhelpers/fixtureshooks-auth-fetch-timers:baseline14PASS16FAIL→30GREEN. Ambosprof/company,4estágios/oldACK/timer/finallyMESMAchavenovaop/blur/foco/owner/company/twosiblings/rejectedunknown/onePOST+ACKrefresh.28oldhelper+LOADcontrolsBYTEEXATOS→58focalPASSinclSaoPauloTZ;fullmobile795PASS[765old+30new],zeroFAILSKIPCANCELLOCALNode24.19.0,nãoCIHTTPRNSecureStoreAndroidfísico.

FIX: pendingReadsMapchave→ownerobjeto/owns(epoch+token)/releasePendingSÓpróprio; callbackread15sencerraowncontrollercomop.finish+pendingantesdoinvalidador,limpaheaders/lista/ERROR/mensagemUNKNOWNsomenteMESMAsourcelist. Apósawaitsomenteowns+!aborted+sourceHeadersMESMOobjetopodeaceitarresultado. SiblingACKnãorestauraexpirada;oldfinally/timernãolimpaNEWsamekey/controller. MutaçãoLOCALretirarSÓownershipcleanup→24PASS6FAILexit1,provaasssertnãopublicada. Candidatainicialexpôs8falhascontrollerregistration;op.finishnoDeadlinecorrigiu,full795GREEN. NenhumautoPOST/GET/retry noDeadline;pedidoauthpendente0POST,outros1POST;ACKválidoONEPOST+refreshoriginal. Bodylesspath/tenant/Authorization/helpersid/readAt/rejectedunknown/idempotênciaAPIinalterados.

Reverse-substitutionSOURCEINTEGRALreconstrói5479charsoriginaisBYTEEXATOS;5934cand. ForaMapeREADtodosimports/operation/LOAD/focuscleanup/JSX/nav/stylesiguais. API/SQL/RLS/ACL/roles/migrações/session/headers/React19.1.4/RN0.81.6/deps/lock/workflows/build/smokeinalterados. APK N/AÉFALSOmobilemudou: mediropróprioCI/APKnov oHEAD ebytes/install/smokesemMetro,semprovaNotifUI/SecureStore/nativeform/físico. CIesperado1385=[145Web,795mobile,431API,3CLI,11monitor]PENDENTE,nãoobservadoaqui;semreadymergeantesfullGREEN/reviewexpectedSHA+pósreal. []/queued/skippednãopass. SeCI/browserfalhar manterDRAFT/registrarprimário/avançarfrenteindependente,nãorepetirmesmoSHAparaverde.

Recibo558a8FINALconsolidadoHISTÓRICO/nãogatenovo: own39095060696/job117579674681attempt1FAIL1388unitPASS[178,765,431,3,11]/typebuildexportmigrationprivacyPASS/HTTPbrowserFAIL/PostSetupNodeSKIP/ProductionTruthposteriorNOTexecuted. Actualcheckoutfae18570e8f563f49a7bea9de72954e4d81f99e4primary03:51:24.6359052ZSINTÉTICOorderedparents[main3e,a8ba965]/tree7e8aecfa397f52e2528e596001e512de39396c1cigualHEAD,nãoHEADliteral.13actualChrome155.0.8059.39/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34,12novoslifecycletraces;13cases7PASS6FAIL/sticky1;6waves72GETabort/canceledTRUE/noCORSerror. 12requests+12failsbindsameframeloader porcase,0observedframetransition/contextdestroy-clear/lifecycleWITHINwave/dropped-evicted0. NarrowhypothesisENFRAQUECIDA,nãoausênciabrowser/framework/networkcancel/causal/vendor/API/CORS/Reactroot. MaincurrentjourneyOWN8checksPASS03:55:49.7620711Z/503consumed11GET200→HUMAN12NEW200PASS03:55:49.1143674Z;UIbaseline9checks5refresh5reloadPASS,demaisfalhasnãoborrowPASS. ZEROretryreadymergepost558.

SeuFULLbodyFINAL65296charsagoraINTEGRALemNOTIFICATION_MARK_READ_DEADLINE_2026-10-18.md;oldoriginal558normtailsINTEGRAISporapêndiceatual,notas/assets sameblobs/modesSEMoutrosdraftcodes.19desktopPNGs558a8+PR558_A8_NOTIFICATION_CYCLE_PROVENANCE.json+PR558_A8_LIFECYCLE_TRACE.jsonpreservamFONTESa8/fae/tree7e8/run39095060696job117579674681attempt1FAIL;primaryreobtido+signatureSHAbytes1365x900/Pillowvalid+remoteBASE64readbackexigido. Nãocurrentframes/RN/físico/VisualTruth/PNGemprestado. TodosoriginaisnoLUGAR,prefixosmaincompletos+caudasdivergentes558semresumos;arquivos>1MiBviaGitblobFULL,nãoarquivoAPIempty.

Área9/1/2/8requisitoprazo/resultadoincerto→readownership→30regressões+28controles→NOVOCIGREEN/APK/evidênciasPENDENTES→recibo. Nãoaceiteárea9/outbox/push/providerdelivery. Somente10AndroidstandaloneTÉCNICAINTERNOaceita12pendentes,não%code. Externos215219220224228OPEN. SemproduçãoRailwayNeon/novosserviços/custos/credenciais/contratos/providersPSP/dinheiroreal/root/grants/RLSdisable/Activitywrites/novaautomação. Fechocorrente:source+tests+evidência+5docs/matriz;próximopassomediroCI/APKdoHEADexato/revisar/únicomergeexpectedSHAapenasSUCCESS+pósreal. ResultadofinalPRbody;consolidarpróximocicloFUNCIONALsemmetadataautoref/statuscommit.


---

## Privacidade — prazo de ações com ownership e ACK preservado — 2026-10-18 (preparação funcional)

Base GitHub main25b2cf600ef47187421809e7c6e93743876a978e/tree36c6b5f4fe4d28f508cb44d6cc1dbdf74d978a34/paisordenados[3e098cd51cd2fd84f21e144a600a814a2cb1a150,56627fc346d093c4acf27939be4988b22542b393]. PR576 JÁMERGED05:01:28Z, NÃO repetir. OWNCI39098550602attempt1SUCCESS1385=[145,795,431,3,11]/OWNAPK39098550610SUCCESS; POSTCI39099109874attempt2/job117591715427SUCCESS1385/unitfail-skip-cancel0+typesbuildexportmigrationprivacyHTTP/ProductionTruth05:06:45.5144417Z. Attempt1/job117591532764ECRquotaANTEScheckout; somenteUMfailed-completedjobretryMESMOMERGESHApermitidopeloerroprimáriotransitório. POSTAPK39099109887/job117591533075attempt1SUCCESSbuild05:10:24.4538875Z/install05:11:41.5088677Z/DEVICE_SMOKE_OK05:11:53.9052008ZwithoutMetro. AmbosPOSTactualcheckoutLITERAL25b2, tree36c6; não sintético. POSTartifact12125089549ZIP28912578/SHA25669178ec46eb77d2b0193fc7b5b9476afaa5cac46f35d3db9cb637e197231a707; individualAPK66161640/SHA256e54a2a02e31d8f82cccbdad81d50fe02a4d4c696bc61936354ce89e438e6f340/SHA256SUMSexact/BUILDINFOliteral25b2releasefixedpackage/metrofalse. NovoMAINstandalonevalidado576POST25b2,não567antigo. Emulador≠telaNotificações/SecureStore/físico/piloto.

POST576realChrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34:8journeychecksPASS05:05:49.8755161Z;ONE503consumed/11otherrealGET→HUMAN12NEWGET/team1/zeroextraPOSTPASS05:05:49.2949373Z. Rootintermitente12GETERR_ABORTED dos outros runs NÃO resolvido, nãoemprestarPASSa558. Watch39099109793/39104290197SUCCESS/semmanualActivitywrite. Recibo576FINAL15827charsINTEGRALna nova evidência PRIVACY_ACTION_DEADLINE_2026-10-18.md; prepPENDINGantigapreservadanãoéestadocorrente.

NOVA lacuna REAL independente: Privacidade.operate timerabort-onlydeixava busy/pendingeternos seauth/fetch/JSON/finalauthnuncaresolve em pedido,exportação e desativação. Fonteappb2d9505f9a891fb6ce00eef34897193ed387a528;41novos actualpreJSXhandler+helpersreaishooks/auth/transporte/clear/timersEXPLÍCITOS:RED14PASS27FAIL→GREEN41. 57oldcontrols(10privacy-actions+4requests+43secondaryreads)bytes/assertsintactos→98focalPASSinclusiveTZAmerica/Sao_Paulo;FULLsnapshotmobile836/836PASS[795old+41new],fail-skip-cancel0,LOCALNode24.19.0,nãoCINode22/HTTPPG/RN/nativesession.

Fix mínimo: pendingboolean→tokenobjeto/null e owns(epoch+token);finishlimpaowncontroller/pendingAPENASdono. Timer15s invalida snapshot/sequence associada+readerror/liberabusy. Antesdeenvio0ação;depoisumPOSTouGETexportdespachado viraunknown,sem segundoenvioautomático. BarreiraunknownEXISTENTE fica atéload(true)explícitovalidado;blur/refocus nãoalibera. Nãoéprovadecancelamento/dedupedurável/novachaveidempotência. Reconciliarlista nãoafirmaqueAPIcancelouaçãoantiga,nãocriarretry.

Faseaccepting apósACKVALIDADOemcontextocorretoéDISTINTA: seGETpós-ACKtrava,preservam-se"Pedido registrado"/"Cópia gerada"/cópiaREALvalidada,comfalhadaconfirmaçãolocal;NÃOreclassificasucessoservidorcomoresultadoincerto. ApósACKdesativadavalidado,mensagem"Conta desativada" eclearSessionForAuthorizationoriginalsãopreservados;seclearlocalficaindefinido,UIencerraocupaçãoe exigeconferência,lateclear não navega/apresentaresultadoemnovaação/foco. CallbackrecebeisCurrentadicional;fila/clear nativo não removidos/atropelados. Timer/finallyantigosapósreconciliação+novaaçãoMESMOepochnãoapagampendingnovo;41testesnovosexatos.

9regressõesadversariaisprovamownership: mutaçãoLOCALretirarSÓtokencheckdofinish→32PASS9FAIL/exit1,nãopublicada/nãoCIcount. Incluídos4estágios3ações,lateACK/unknownbarrier/humanreconciliation,queuedoldtimer/oldfinally,8readpósACKpendentes,clearlocalpendente,identitychange+blur/refocus. Harnessnovo usa Boolean(pending) paraatividade(independentebooleanantigo vs token/null),semreduzirasserts;controlleréretidoantesdeexpireparaassertabort eSetdrain. FULLreverse-substitutionINTEGRALreconstrói12657charsmainBYTEEXATOSfora4regiõesexplicadas;candidate13330chars/JSXStyleSheets/imports/LOAD/protocolobody/path/auth/Alertconfirm/helpers/API/SQL/RLS/roles/grants/migrações/deps/lock/workflows/build/smokeinalterados. #574éparserhelperseparado,nãocopiado/duplicado.

Área1/2/8/12requisitoprazo/estadoincerto/ACK/sessãocorrente→operateownership/guard→41new+57controls→CIcompleto/APKprópriosNOVOHEADPENDENTES. Esperado1426=[145Web,836mobile,431API,3CLI,11monitor]AINDA NÃOobservado;[]/queued/skippednãopass. APK N/A FALSEmobilealterado; medirbuild/install/smokewithoutMetro+artifactbytes/SHA256SUMS/BUILDINFOeactualcheckoutorderedparents/tree;unit/standalonenãoprovaformprivacy/Alert/SecureStore/aparelhofísico/aceiteárea. Somenteárea10TÉCNICAINTERNAaceita12pendentes,não%code. Externos215219220224228OPEN. Nenhumready/mergeantesfullCI/APKSUCCESS+freshdiffmainbasehead+expectedSHAúnico+pósgatesreais. SeCI/browserfalha,registrarprimárioeavançaroutraitem,nãorerunmesmoSHAparaverde.

Todos6normativosoriginaisFULLprefixNO LUGAR+esteapêndice,nadaapagado/substituídoporresumo. Novaentregacódigo+testes+evidência+5docs/matriz,semstatus/activity/image-onlycommit. RecibofinalPRbody+apêndicepróximocicloFUNCIONAL. SemproduçãoRailwayNeon/novocusto/serviço/credenciais/providerPSPcontrato/dinheiroreal/root/grants/RLSdisable/novaautomação/Activitymanualwrite. Nãoépromessa24x7,nãoencerrarrotinaporfimrodada/parcial/transitório.


---

## Convites — prazo de geração com ownership — 2026-10-18 (preparação funcional)

Base main d1f814ac286bf4a2db2ce7845381e97cd16aed22/tree87540a4fe94a44471c98ff88a9363bbf73380446, pais [25b2cf600ef47187421809e7c6e93743876a978e,91f54f8a4385cd32da0b48a84ba26982cd76fa01]. PR578 já MERGED08:02:04Z; não repetir. Seu recibo FINAL17395chars foi preservado INTEGRALMENTE em INVITATION_CREATE_DEADLINE_2026-10-18.md. OWNCI39109077059attempt2SUCCESS1426/OWNAPK39109077048SUCCESS; POSTCI39109895501attempt2/job117623846125FAIL browser, apesar1426unitPASS/zeroFAILSKIPCANCEL/typebuildexportmigrationprivacyretentionPASS. Attempt1quotaECRprécheckout/único retry consumido, NENHUM retry adicional. POSTliteralD1: ONE503+11GET→human12NEWGET/zeroPOSTextraPASS08:06:16.9448845Z; depois logout201/Bsignin201→12OPTIONS204+12GETERR_ABORTED/canceledtrue/corsnull/loaded-dashboardFAIL08:06:37.2638310Z. B/fulljourney/ProductionTruthposterior NÃO completos; rootintermitente NÃO resolvido. Não emprestar ownGREEN/lifecycle558/frames. POSTAPK39109895488/job117623555565SUCCESS/LITERALD1/DEVICE_SMOKE_OK08:14:08.7587245Z, artifact12129494021: ZIP28912763 SHA2566266cc6207dc36c06ae7531806b02ded4db4892f85b4d966ec68a27739a6e1c4; individualAPK66161664 SHA256dd55b91c4408c37fafebbde0145c1fcf92db4d77302ad6c86d3372a2c8cfde40/SHA256SUMSexact/BUILDINFOliteralD1/metrofalse. CurrentMAINstandalone técnico medido578POSTD1 MAS fullCIRED; emulador≠PrivacyUI/SecureStore/físico/aceiteintegral.

NOVA ENTREGA: Membros.createInvite tinha operation abort-only; auth/fetch/JSON/authfinal que não resolvessem mantinham busy/pending após15s. 26novas regressões dos handlers REAIS pré-JSX+helpercompany-members REAL com hooks/auth/transporte/timers explícitos: baseline11PASS15FAIL→26GREEN. 67oldcontrols BYTE-idênticos(10company-members+14revoke+43secondaryreads)→93focalPASS inclusive TZAmerica/Sao_Paulo; fullsnapshotmobile862PASS[836old+26new], zeroFAILSKIPCANCEL LOCAL Node24.19.0. Não é RNrender/SecureStore/HTTPPG/emaildelivery/produção. Harness preliminar de10casos6PASS4FAIL confirmado; harness expandido corrigiu espera de fixture para provar que NOVA ação realmente iniciou, não mudança de produto para satisfazer assert.

Fix mínimo: referência createController APÓS refs existentes; owns(epoch+controller), finish drena controller e libera pending/busy SOMENTE dono, aposentando referência inclusive no prazo. Deadline15s invalida contexto/seq/lista associada e liberaUI sem novo POST/GET. Após cada await só operação corrente não-abortada aceita fatos. Timer/finally antigos não liberam NEWCREATE/NEWACCEPT/NEWREVOKE MESMOepoch; seis cenários adversariais. Draftemail/role/código de aceite preservados. 5estágios pré-secret(auth/fetch/JSON/finalauth/terceiraauth): auth0POST/outros1POST; resultado despachado incerto mantém barreira existente até load(true) explícito validado; blur/refocus não a remove. Após ACK validado+secret em contexto correto, quatro esperasGET pós-ACK preservam secret/mensagem Convite criado, NÃO falsoUNKNOWNservidor; contexto/lista expiram e só leitura explícita volta a habilitar gestão. Owner/tenant/foco distintos nunca recebem secret tardio. GET nunca recupera secret; renewal NÃO é idempotência inventada, API mantém random32/hash/7dias/advisorylock/revoga+INSERT. Não é cancelamento servidor/dedupedurável.

Escopo: APENAS app/membros.tsx criação e newtests/invitation-create-deadline.test.mjs. Comparação INTEGRAL confirma tudo fora createInvite e nova ref BYTEEXATO, inclusive load/focuscleanup/acceptInvite/saveTenantForContext/revoke/imports/JSX/StyleSheets. Fila nativa/session/helpers/API/SQL/RLS/ACL/migrações/React19.1.4/RN0.81.6/deps/lock/workflows/build/smoke intactos. Localtsconfig é adaptação de execução Node, NÃO publicado. Outros10drafts são independentes, sem copiar575/574/573/571/558/565 nem duplicar576/578. CI/APK próprios NOVOHEAD PENDENTES nesta preparação; esperado1452=[145Web,862mobile,431API,3CLI,11monitor] NÃO observado. APK N/A FALSE mobile alterado: exigir gates reais e artifactZIP≠APK/SHA256SUMS/BUILDINFO/checkout; merge apenas fullCI+APKSUCCESS/freshdiffheadbase/review/expectedSHA e pós-gates reais. []/queued/skipped nãoPASS. Se browser/infra bloqueia, registrar primário e avançar item independente, não rerunSHA para verde.

Área4/2/8 requisito convites/prazo/sessão→createownership→26regressões+67controles→NOVOCI/APK/evidência PENDENTES. Não aceite integral: somente10Androidstandalone TÉCNICAINTERNO aceito,12pendentes; não percentual de código. Externos215/219/220/224/228OPEN. Os6normativos são mantidos FULLprefix NO LUGAR+apêndice; memória>1MiB lida via SHA→fetch_blob, não APIempty. Evidência nova inclui recibo578FINAL integral, não resumo substituto. Resultado final vai PRbody/readback e próximo apêndice FUNCIONAL, sem commit autoref/status/imagem/atividade. Sem produção/Railway/Neon/custos/serviços/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/novaautomação/Activitymanualwrites. Rotina não é promessa24x7 e não se encerra por fim de rodada/parcial/transitório.


---

## Aceite de convites — prazo e persistência serializada — 2026-10-18 (preparação funcional)

Continuação COERENTE do PR579 existente, base mainD1 d1f814ac286bf4a2db2ce7845381e97cd16aed22/tree87540a4fe94a44471c98ff88a9363bbf73380446; parent579edd893ca1f72bb5304bd6ff2e2f3d8bc60f6fd2b/treed98b0c45212b999d8050dda24a61ba3d6e14cae9. NÃO novaPR/duplicata/rerun de edd para verde. Outros10drafts continuam separados; 576/578 jáMERGED/não repetir. MainD1fullCIRED578POST/native578POSTD1SUCCESS; somente10técnica interna aceita12pendentes,não%code.

Recibo FINAL anterior579 consolidado em INVITATION_ACCEPT_DEADLINE_2026-10-18.md com seu corpo10298chars INTEGRAL. CI39113288406attempt2/job117633928242FAILquotaECRANTEScheckout/TODOSprodutosSKIP; attempt1/job117633770138mesmaquota; única retry jáconsumida/não nova. NENHUMCIunit/Chrome/HTTPPG/ProductionTruth579edd;1452sóesperado. APK39113288436/job117633770355attempt1COMPLETESUCCESS: actualcheckout3953e6fec5467fc933c46d4195523280121fb1d9 primary08:55:04.8301636Z SINTÉTICOorderedparents[mainD1,edd893]/treed98igualcandidate,Gitconfirmado,nãoHEADliteral. Build09:05:54.4088341Z/installSuccess09:07:14.7144282Z/DEVICE_SMOKE_OK09:07:27.0501497Z withoutMetro. Artifact12130983560notexpired/expires2026-11-01T09:07:27Z REALdownload:ZIP28912983bytes/SHA256c02fd7a6fc85f23a870f3ca0a00de66eddb5bed80d0e869fb5c7e0ebc558db4d/APIexact; individualAPK66161596/SHA256449a4842cfb23d4e63b5d1c400aad3fba8026dab9b75d84e10eb3532158161e8/SHA256SUMSexact/BUILDINFO3953/releasefixedpackage/metrofalse/build09:05:54Z. Staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36. ZIP≠APK/emulatorinstalllaunch≠Membrosform/nativeSecureStore/physical/VisualTruth/provider/prod. APKeddNÃOatribuir a novoHEAD. ZEROready/merge/pós579.

Nova falha REAL: acceptInvite operation abort-only mantinha busy/pending infinitos em auth/fetch/JSON/finalauth/persistência/sessãofinal. Auditoria7actualmodels1PASS6FAIL confirmada; ampliada27actualhandler+helpers+createSessionQueue/persistExpectedTenant/persistVerifiedSessionREAIS com adapter explicitamente INMEMORY:RED12PASS15FAIL→GREEN27. Inclui9awaits (4request/auth+3storageREADs+storageWRITE+authpóssaved), OLDtimer/finally vs NEWACCEPT/CREATE/REVOKE MESMOepoch, owner/tenantmudando,blur/foco,unknown/role/email/unauth/noTenant,storagefailure e rollbackANTESlogin posterior. Local133focalPASS(27new+106old),TZSaoPaulo;FULLmobile889PASS[862parent+27new]/zeroFAILSKIPCANCEL/Node24.19.0. MutaçãoLOCALsóremoverownershipfinish→24PASS3FAIL,nãopublicada/nãoCIcount. Não é renderRN/SecureStore/HTTPPG/produção/aparelho físico.

Fix APENAS acceptInvite+nova ref acceptController APÓS refs existentes: owns(epoch+controller), finish drenaowncontroller/retiraREF antesliberarbusy/pending, callback15s invalida contexto/seq/reads e informa não confirmado; apósACKválido COMmesmaauth/tenant, confirmed preserva fato "aceite foi confirmado" se persistência/verificação local atrasar. Código/rascunhos mantidos,zeroPOST/GETextra. Apósawait sócurrent&&!aborted pode persistir/navegar; saveTenantForContext ORIGINAL recebe isCurrent maisestrito, fila nativa/helper/rollback originais INALTERADOS. WRITEjáemvoo NÃO écanceladonemfilaéfurada: ao resolver,guardafalsa fazrestore originalANTESnova queuedlogin, conforme algoritmojáexistente; testeordem3writesconfirma isso sóadapter. Savedantesdeadline comauthfinalpendente pode manter targetlocalvalidado mas NÃO navega; não promete desfazer writeconcluído.

Política de escrita incerta foi AUDITADA, não inventada: API consomeconvite comemail/role/tenant soblock e responseACKvinculadoao código; replay pode400, NÃO idempotência durável. Tela jápreservava código+"confira participação antes de tentar novamente" em erro finito; este comportamento e ação manual explícita são preservados, nenhum retryautomático/reconciliação nova/lockdurável/alteração API. Deadline não declara membershipcancelado, selecionado ou sucesso nativo. Não reutiliza inviteUncertain de CRIAÇÃO para ACEITE nem limpa barreira da criação. Fluxo aceito continua ONEPOST→ACK→authigual→fila→persistverified→authfinaligual→navigate. Rejeição/unknown nunca chama persist; headerstoken/tenant/payload e roleguards originais permanecem.

Comparação INTEGRAL reconstrói14952parentchars BYTEEXATOS fora2regiões(acceptInvite+newref),candidate15464;createInvite26regressõesanteriores BYTE-IDÊNTICAS, LOAD/focus/revoke/JSX/styles/imports/helpers/API/SQL/RLS/ACL/migrações/session-queue/React19.1.4/RN0.81.6/depslock/workflows/build/smoke intocados. Localtsconfig não publicado. Todos6normativos FULLmain+FULLparentPREFIX NO LUGAR append,memória>1MiBviaSHAfetch_blob,nãoAPIempty. NovoCI/APKnoNOVOHEAD PENDENTES;1479=[145Web,889mobile,431API,3CLI,11monitor] SÓESPERADO,nãoobservado. APK N/A FALSEmobilealterado; gates sóapósactualCI+APKSUCCESS/reviewfreshmainbasehead/expectedSHA+pósreais. NenhumemprestadoGREEN/cancel/ready/merge/novaautomação/Activitymanualwrites;semproduçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable. Sequota/browserfalha,registrarprimárioeavançaroutrafrente,nãorerunoldSHAparaverde. Requisitoárea4/2/8 ficoumaispróximodoaceite; nenhumaceiteintegral. FinalPRbodyepróximocicloFUNCIONAL,nãostatus/image/activitycommit.


## Histórico adicional integral PR568 a563 — apêndice recuperável 2026-10-18
## Conversa e suporte — integridade do calendário e ACK — ciclo funcional 2026-10-16 UTC

Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, após567 jáMERGED. README e originais completos recebidos de GitHub; todos os bytes anteriores dos5originais/matriz permanecem PREFIXO integral NO LUGAR, sem substituir documentos ou estados históricos por resumo. Recibo final567 integral abaixo consolida próprio+pós reais no ciclo funcional, não é resultado deste novo HEAD.

### Falha reproduzida e correção mínima
Conversa loadMessages aceitava createdAt impossível e apresentava READY; sendMessage aceitava mesmo ACK como SENT. SupportAcknowledgement aceitava createdAt impossível, createSupportSubmission real retornava CONFIRMED e store confirm/releaseConfirmed podia liberar a barreira pendente. Fixtures usam2026-02-30,2025-02-29-03:00,2026-04-31+02:00, que Date normaliza. Reproduzido nos módulos TypeScript REAIS com transportes/adapter in-memory explícitos, não alegação de data impossível armazenada noPostgres, incidente/exploit de produção ou SecureStore nativo.

Correção SOMENTE predicado date em apps/mobile/lib/conversation.ts e inclusão do mesmo predicado calendário já usado BYTE-IDÊNTICO pela Agenda em support-intent.ts, substituindo a condição createdAt doACK. Ler calendário inválido retornaERROR; ACK de conversa permaneceUNKNOWN depois de UMA chamada; suporte retornaUNKNOWN, mantém registro pending exatamente com mesma identidade/tenant/chave/payload; novo sendNew recuperaPENDING sem outra preparação/POST; releaseConfirmed recusa sem remover. Registro confirmado corrompido em disco falha fechado, não é apagado/substituído por política inventada. Calendários válidos/leapday2024/offset cruzandoUTC/epochzero strings exatas preservados; liberação explícita de confirmado válido permanece. Não alterar contrato de suporte geral nullassignment autorizado, autoridade por tenant/membership ou recuperação explícita.

17regressões novas em conversation-calendar.test.mjs(8),support-calendar.test.mjs(5),support-submission-calendar.test.mjs(4): baseline main4PASS/13FAIL→GREEN17/17.51testes existentes BYTE-IDÊNTICOS nesses3módulos +17=68/68PASS, inclusive TZ America/Sao_Paulo. Fullmobile782/782PASS local,0fail/skip/cancel (765anteriores+17); modelos/helpers reais≠renderReactNative/Android/SecureStore. Todo source fora2predicados/condição compare-substituível BYTE-IDÊNTICO. Requests/UUID/path/headers/body/tenant/sessão/foco/prazo15s/chaveidempotente/current/ordem/stat/ACK/no-autoretry/JSX/API/controllers/SQL/RLS/grants/eventos/mobiledesign/deps/lock/build/workflows/smoke preservados.

### Paridade com JSON HTTP/Postgres real — gate novo, ainda PENDENTE nesta preparação
scripts/mobile-chat-support-contract.cjs lê somente JSON já obtido pelas fixtures locais existentes: real POST+GET de conversa e replayACK de suporte apósreview. NativeTSstrip carrega helpers atuais; conversa valida lista/ACK e suporte stage/confirm/restart/read/release em adapter in-memory. Duas invocações adicionadas aosHTTPscripts, TODOS asserts/chamadas HTTP anteriores intactos; nenhuma nova chamadaHTTP/SQL, nenhumPOST adicional, alteração de grant/policy/status/body/tenant/auth. Gate exige CI e configAPIPG exatoslocalhost via helper localConfiguration existente; script não acessa banco/rede/credencial, não recebe bearer. Marcadores MOBILE_CHAT_REAL_JSON_PASS eMOBILE_SUPPORT_REAL_JSON_PASS só podem ser aceitos após logs primários novos, não resultados locais simulados/antecipados. Não conta marcadores como novos testes unitários nem prova de tela ou SecureStore.

### Evidência histórica567 persistida com origem própria
DezPNGs Web de567(5OWN+5POST) +PR567_OWN_POST_CHAT_SUPPORT_CYCLE_PROVENANCE.json persistidos neste ciclo sobdocs/evidencias/web-browser-2026-10-16/, comsignature/SHA256/bytes/1365x900 conferidos independentemente, fonteprimáriajobs116937140753/116942544994. OWNsourcehead3a66/checkout42ffcSINTÉTICO[f98,3a66]/tree66f89c/run38890073248attempt1SUCCESS; POSTcheckoutLITERAL3e/run38891514441attempt2SUCCESS. Não são frames deste novoHEAD nem Android. Recibo567 separaAPKindividual≠ZIP; nenhuma prova567 é emprestada para aceitar candidato/565/558/560.

### Gates e limites atuais
OWNCI esperado1372=[145Web,782mobile,431API,3CLI,11monitor], APKstandaloneOWN obrigatório por mobilealterado, ambos AINDA PENDENTES neste apêndice preparação; pósCI/APK no mergeREAL também obrigatórios. Não ready/merge sem ambos própriosGREEN e revisão/expectedSHAfresh, não rerun falhaproduto para verde. Preservar f98/3e/567históricos, não repetir merges. Navegador/CORS/Fetchguard/sandbox/LNA/permissões/deadlines inalterados; causa antigaERR_ABORTED e startup permaneceUNRESOLVED apesar567GREEN.
Somente área10Androidstandalone TÉCNICOINTERNO aceita; outras12pendentes. Esta correção e paridadeJSON não aceitam integralmenteárea9/11 ounativeUI/taps/teclado/loginválido/SecureStore/físico/piloto/VisualTruth. Externos215/219/220/224/228OPEN;565aa0/558879/560e47DRAFTFAIL separados. Semprodução/serviços/custos/credenciais/contratos/provider/PSP/dinheiroreal. #566fechada porgithub-actions[bot]comSHA3e/evento11:05:53Z/comment6214133831, semissuewritesmanuais/commitatividade. Manterrotinaúnicaenabled/scheduleinalterados; parcialnãoencerra13áreas. Datas deoutrosleitores ainda precisam auditoriafactual, não declarar todoscorrigidos.

### Recibo567 final integral consolidado (HISTÓRIA, não resultado do novoHEAD)
## FINAL VERIFIED — MERGED / OWN + POST CI + APK SUCCESS — 2026-10-16 UTC

PR567 alreadyMERGED; DO NOT repeat ready/merge/rerun. Main LITERAL `3e098cd51cd2fd84f21e144a600a814a2cb1a150`, tree `66f89c3ef2902dad6d1d59e0210be7229c3a857c`, orderedparents [`f98b5f618c5b78772c360b93d17e6028f0021008`,`3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d`]. Fresh main/PR/commit re-read after both post gates. Single expectedHEAD merge, no force or gate weakening.

### Actual completed gate receipts
- OWN CI [38890073248/job116937140753](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38890073248/job/116937140753) attempt1SUCCESS1355=[145Web,765mobile,431API,3CLI,11monitor], fail/skip/cancel0, ALL18steps incl HTTPPG/ProductionTruth10:56:54.0120522Z.
- OWN APK [38890073257/job116937140654](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38890073257/job/116937140654) attempt1SUCCESS/build11:02:52.4400673Z/installSuccess11:04:16.5659481Z/DEVICE_SMOKE_OK11:04:29.1353446Z withoutMetro. Own head3a66, actualcheckout42ffc6a2a3536ff8c74bf732748210dce3f1b261 SYNTHETIC orderedparents[f98,3a66]/tree66f89c equalcandidate, NOTliteralHEAD; nativeprimary10:52:31.8761370Z.
- POST CI [38891514441/job116942544994](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38891514441/job/116942544994) attempt2SUCCESS1355samegroups/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth11:12:31.5379596Z. Actual LITERALcheckout3e098 primary11:07:57.3077219Z. Attempt1/job116941873608failed ECRpostgres17 Data limit exceeded11:05:49Z..58Z BEFOREcheckout/allproductSKIPPED. ExactlyONEspecific failed-completed job retry SAMESHA resolved infrastructure; no product failure rerun, no running-job rerun, no further retries.
- POST APK [38891514299/job116941872137](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38891514299/job/116941872137) attempt1SUCCESS/build11:16:47.9579105Z/installSuccess11:18:18.0446015Z/DEVICE_SMOKE_OK11:18:30.5174876Z withoutMetro. Actual LITERALcheckout3e098 primary11:05:51.5499143Z. Failure-only diagnostic steps normallySKIPPED on success; no Android form/keyboard/session journey claimed.

### APK bytes, not ZIP-digest borrowing
Both artifacts independently downloaded with the GitHub artifact tool, ZIP SHA checked against API, individual APK SHA checked against SHA256SUMS, BUILD_INFO actual checkout/package/release/metrofalse checked. No borrowed542/565 or inferred digest.
- OWN artifact12041947330, ZIP28912130bytes/SHA256f9efbb72eac87e9261da626cd0380daff6ceecf178670bc15789088b7a7eafeb, expires2026-10-30. Actual APK66161616bytes/SHA2561b2c0ce67f33b77494b8f929c22a19764a3e7c7f11b6d56b6501e8f43c73616b, BUILD_INFO.commit_sha42ffc6a2a3536ff8c74bf732748210dce3f1b261.
- POST artifact12042661578, ZIP28912126bytes/SHA256e4ed3e242a0af02e54a7edec2f808ae07e1385ad71eead02e2e9f940436b0959, expires2026-10-30. Actual APK66161612bytes/SHA2567b9cf44f2be9565dec7be7582ea0538a3bdd362198bcbeb52c4e7dfe7b24cc80, BUILD_INFO.commit_sha3e098cd51cd2fd84f21e144a600a814a2cb1a150.
- Actual generated AndroidManifest SHA256ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480 identical OWN/POST/historical542. SDKmin24/target36/INTERNETdeclared/no explicitusesCleartextTraffic/networkSecurityConfig attributes, no manifest/security/permission edit. This read-only AXML/static fact does NOT prove native localHTTP transport, permission denial, SecureStore, UI, physical or provider behavior.

### Current parser and browser evidence, own and post distinct
Actual HTTP/Postgres JSON passed through CURRENT mobile loadWorkPassport/Agenda/Earnings OWN10:55:08.6408598Z/POST11:10:25.3588245Z and currentSafety OWN10:55:09.3092651Z/POST11:10:26.0843801Z. Old static fixture phrase 'unchanged mobile' is NOT a claim the3patched validators are unchanged. No impossible calendar date was inserted in PostgreSQL; negative cases are adversarial JSON on real client helpers.

Actual OWN Chrome155.0.8059.39 observed10:55:46.7447225Z; POSTsameversion/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed11:11:14.0986888Z. OWN503/recoveryPASS10:55:48.8107225Z/8journeysPASS10:55:49.4565208Z; POST503/recoveryPASS11:11:17.9740271Z/8journeysPASS11:11:18.6961252Z. Each actualONEteamsGET503consumed+11distinctotherGET200, unknown/loading/— rather than false0, explicit humanrefresh12NEWGET200/team1/zeroextraPOSTfromSEND. Actuallogin401+empty/team/job12345centsdates/persistence/render/newcompleteDOCUMENTreload/logoutPOST201(notOPTIONS204)/browserbearerGETme401+otherSAMEidentitysession200/Bisolated. No security/deadline/browser/Fetchguard/CORS/LNA changes; these successes DO NOT resolve prior intermittent transport root or make other drafts green.

10OWN/POST567WebPNGs primarylogs + scratchpassport-safety-calendar-local/567-{own,post}-captures.json independently PNGsignature/SHA/bytes/1365x900/PillowverifyPASS; partial/recovered visually inspected for both. Not yet Git567frames; NEXT FUNCTIONAL cycle persist full own provenance, neverimage-onlycommit. They are NOT Androidframes.

```json
[
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "login",
    "sha256": "75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc",
    "bytes": 33686,
    "width": 1365,
    "height": 900
  },
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "company-a-created",
    "sha256": "7d510a5e85e0b0387ab575e4d337a12554872932b4692a5bad456269378610e9",
    "bytes": 132876,
    "width": 1365,
    "height": 900
  },
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "company-a-team-read-unavailable",
    "sha256": "eeb850e0cf0cd88366c81727fa7cd0620c34f25533f2de38229e1e102f754b56",
    "bytes": 141835,
    "width": 1365,
    "height": 900
  },
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "company-a-team-read-recovered",
    "sha256": "4facf06a2381b3745fbf2dcb6887629b2760cd715ecc4d52019dde99aa93ce44",
    "bytes": 133137,
    "width": 1365,
    "height": 900
  },
  {
    "source": "OWN38890073248/job116937140753/SYNTHETIC42ffc/SUCCESS",
    "label": "company-b-isolated",
    "sha256": "7b7ac786d2d2d7e319aad42bd6b15e48a6b7edcda577c03ff3a4b72f54fc0ee3",
    "bytes": 132014,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "login",
    "sha256": "75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc",
    "bytes": 33686,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "company-a-created",
    "sha256": "786a1a917728faf3d59537dc415716a279f27de7179c99b483da84d6bf71a42d",
    "bytes": 133199,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "company-a-team-read-unavailable",
    "sha256": "4c05317f8c40646589d271cf2be246ecb0aadf51ee65018e362c591e8bfac265",
    "bytes": 142259,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "company-a-team-read-recovered",
    "sha256": "e77cbc1d424a689ef92590bed68fe659783d8fac69c18172ee42679793321108",
    "bytes": 133501,
    "width": 1365,
    "height": 900
  },
  {
    "source": "POST38891514441attempt2/job116942544994/LITERAL3e098/SUCCESS",
    "label": "company-b-isolated",
    "sha256": "26bdabb3cfef15ee8bb44d6890bd8e3c6747f61d56d888238dfc6588ebd72801",
    "bytes": 131919,
    "width": 1365,
    "height": 900
  }
]
```

### Review, history and limits
24paths remoteUTF8/base64normalizedexact, allmodes100644;1147otherpriorblobsidentical,490of493mainnon-docsoutside3datevalidatorsidentical, whole-source reverse-substitution/datepredicatebyte-identicalAgenda. FULL original5docs+matrix main+565preparation prefixes preserved IN PLACE by appendix; sourceREADME untouched. Localnew12RED2PASS10FAIL→12GREEN, old29+new12=41GREEN (original41=31PASS10FAIL), full765mobile+SaoPaulotimezone41PASS; no models borrowed as Androidproof. Request/ACK/body/tenant/auth/current/roles/status/created-existing/unknown/no-retry/order/JSX/API/SQL/RLS/events/deps/lock/build/workflow unchanged. Mobile source changed, so APK REQUIRED and now OWN+POST actually measured.

Git main567 consolidates565FINALFAIL receipts+full565preparation and5olderOWN564PNGs/manifest by identicalblobs, plus5OWN565FAILWebframes/PR565_AA0_CALENDAR_CYCLE_PROVENANCE.json. These are historical sources, not567/nativeframes. Current567Gitappendices PREPARATION/PENDING are HISTORY, not current status; consolidate this567FINAL OWN+POST only NEXT FUNCTIONAL cycle, no metadata/self-reference/activity commit. No original document replaced with summary.

PostWatch38891514341/job116941872899SUCCESSPUSH marker11:05:51.9356391Z3eage0/openPR3/active2. Issue566 actualbotclosed11:05:53Z/comment6214133831created11:05:52Z references3e; both event/comment read. No manualissuewrite or activitycommit.

Onlyarea10 Androidstandalone TECHNICAL INTERNAL accepted; other12 pending. No full nativeUI/forms/keyboard/SecureStore/physical/VisualTruth/pilot/provider/PSP/production/realmoney acceptance. 558879/560e47/565aa0 remain separateDRAFTFAIL; no reruns/merges. Existing routine remainsenabled/scheduleunchanged. Next local-only chat/support impossible-date candidates are not published/currentmain fixes and not part765tests; source-grounded freshcontract review and ownCI/APK/post required before any future integration.

---
Historical preparation and previous in-flight receipt preserved below; all PENDING / candidate states superseded by FINAL above.

## MERGED / POST-CI SUCCESS / POST-APK PENDING — 2026-10-16 UTC

#567 already merged ONCE with expectedHEAD3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d; no repeat ready/merge/rerun. MAIN3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c/orderedparents[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d], verified afteractualmerge.

POSTCI38891514441attempt2/job116942544994 COMPLETE SUCCESS1355=[145Web,765mobile,431API,3CLI,11monitor]tests=pass/fail-skip-cancel0/ALL18steps/ProductionTruth11:12:31.5379596Z. LITERALcheckout3e098... primary11:07:57.3077219Z. Attempt1/job116941873608 failed ECRpostgres17 toomanyrequests/Data limit exceeded11:05:49Z..58Z BEFOREcheckout/allproductSKIPPED. ExactlyONEspecificfailed-completedjobretrySAMESHA resolvedinfra; no retry of product failure/running/successjob.

Actual POST HTTPPG→currentmobilePassport/Agenda/Earnings PASS11:10:25.3588245Z and currentSafetyPASS11:10:26.0843801Z. ActualChrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed11:11:14.0986888Z; ONEteamsGET503CONSUMED+11otherdistinctGET200/HUMANrefresh12newGET200/team1/zeroextraPOSTfromSEND PASS11:11:17.9740271Z; ALL8journeysPASS11:11:18.6961252Z including actuallogoutPOST201/browserbearerGETme401+otherSAMEidentitysession200/Bisolated, newcompleteDOCUMENTreload. Prior intermittenttransportroot NOT explained/fixed, otherdrafts not green by borrowing.

POSTAPK38891514299/job116941872137 stillBUILDING at last query; NOTPASS, no actualpostAPKdigest/installation/DEVICE_SMOKE_OK yet. Must followactualmerge, notborrow OWNgreen. PostWatch38891514341/job116941872899SUCCESSPUSH marker11:05:51.9356391Z3eage0/openPR3/active2; actual566closed11:05:53Zbygithub-actions[bot], comment6214133831at11:05:52Zreferences3e/newcommittime11:05:49.206Z. No manualissuewrites/activitycommit.

5OWN+5POST567Webframes independentlysignature/SHA/bytes1365x900/PillowverifyPASS, partial/recoveredvisuallyinspectedbothruns; currentframesnotyetGitassets. ScopeWebdesktop NOTnativeUI/SecureStore/physical/VisualTruth. Sourcehead3a66/owntree+synthetic42ffc/ownCI38890073248job116937140753SUCCESS versus literalpost3e/CI38891514441attempt2job116942544994SUCCESS. PreservewithownprovenancenextFUNCTIONALcycleonly,noimage-onlycommit. GitdocsPREPARATION/PENDINGhistorypreserved; final567OWN+POSTconsolidationnextFUNCTIONALonly.

---

Historical OWN final/preparation below, pending/mergecandidate statements are superseded above.

## OWN CI + APK COMPLETE SUCCESS — merge candidate — 2026-10-16 UTC

Exact HEAD3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. OWN CI38890073248/job116937140753attempt1SUCCESS1355tests/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth10:56:54.0120522Z. OWN APK38890073257/job116937140654attempt1SUCCESS, ZERO retries: build11:02:52.4400673Z/installSuccess11:04:16.5659481Z/DEVICE_SMOKE_OK11:04:29.1353446Z withoutMetro; original smoke/fatal gates unchanged. Failure-only diagnostics correctly SKIPPED on success, not UI evidence.

Downloaded OWN artifact12041947330/28912130ZIPbytes/expires2026-10-30. ZIP SHA256f9efbb72eac87e9261da626cd0380daff6ceecf178670bc15789088b7a7eafeb. Actual individual APK66161616bytes/SHA2561b2c0ce67f33b77494b8f929c22a19764a3e7c7f11b6d56b6501e8f43c73616b matches SHA256SUMS; BUILD_INFO.commit_sha42ffc6a2a3536ff8c74bf732748210dce3f1b261/metrofalse/release/packagefixed. Both OWN checkout SYNTHETIC42ffc6a2a3536ff8c74bf732748210dce3f1b261 parents[f98,3a66]tree66f89c equalcandidate, NOTliteralHEAD (nativeprimary10:52:31.8761370Z).

Read-only generated AndroidManifest SHA256ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480 byte-identical historical542actualmanifest; SDKmin24/target36/INTERNETdeclared/no explicitusesCleartextTraffic/networkSecurityConfigattributes. Static manifest is NOT actual localHTTP transport/permission denial/UI/SecureStore proof. No change to permissions or security. Historical542 APK individual SHA52b5e5361d88df31f30aca27aa06510886536c140dbc267b2181e60d2d3cf491 was separately downloaded/verified, NOTborrowed for this candidate.

Fullreview24paths/remotebytes/modes100644/6originalFULLprefixmain+565+appendpreserved;1147otherpriorblobsidentical/490of493mainnon-docblobsoutside3validatorsidentical; existingAPK92protectedroot/packages/build/workflow/nativeinputsidentical (APKstillrequiredbecausemobilechanged). Whole-source reverse-substitution/datepredicatesexactAgenda; local765/765 and41focal/SaoPaulotimezonePASS; originalfocal31PASS10FAIL. Freshmainf98/head3a66/basef98/mergeableclean+both completedcheckrunsSUCCESS verified before ready. Integration only at expectedSHA; actualpostCI+postAPK mandatory after merge, NOT yet observed here. No whole-area acceptance.

---

Historical preparation / ownCI detail below; pending APK statements superseded above.

## OWN CI SUCCESS — APK PENDING — 2026-10-16 UTC

HEAD3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c remainsDRAFT/NOTMERGED. OWN CI38890073248/job116937140753attempt1COMPLETE SUCCESS, ZEROretry, ALL18stepsSUCCESS;1355=[145Web,765mobile,431API,3CLI,11monitor]tests=pass/fail-skip-cancel0; typecheck/build/export/migrationrunner2x/privacy/HTTPPG/ProductionTruth10:56:54.0120522Z. Checkout42ffc6a2a3536ff8c74bf732748210dce3f1b261 SYNTHETIC orderedparents[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]tree66f89c equivalent, NOTliteralHEAD; primary10:52:44.6058416Z.

Actual HTTP/Postgres→CURRENT mobile loadWorkPassport/Agenda/Earnings PASS10:55:08.6408598Z and CURRENT loadSafety PASS10:55:09.3092651Z. Static old fixture wording 'unchanged mobile' is not a claim that the3 newly patched validators are unchanged; actual loaders use this checkout. Valid server dates preserved, not a PostgreSQL impossible-date storage test.

ActualChrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed10:55:46.7447225Z; ONEteamsGET503CONSUMED+11otherdistinctrealGET200/unknownloading/—/HUMANrefresh12NEWGET200/team1/zeroextraPOSTfromSEND PASS10:55:48.8107225Z.8journeychecksPASS10:55:49.4565208Z login401/empty/team+jobpersist12345centsdates/render/newcompletedocumentreload/logoutACTUALPOST201/notOPTIONS204/revokedbrowserbearerGETme401+otherSAMEidentitysession200/Bisolated. Original UI/driver/security/deadlines unchanged. This does NOT resolve historical intermittent aborts or make558/560/565green.

OWN APK38890073257/job116937140654 stillBUILDING at last query; no final native PASS or merge. Mobile source changed: native APK mandatory, notN/A/borrowed542/565; no ready/merge until own exact completedSUCCESS. Then actual postCI+postAPK mandatory.

5OWN567WebPNG primarylog116937140753/scratchpassport-safety-calendar-local/567-own-captures.json independentlydecoded signature/SHA/bytes/1365x900/PillowverifyPASS; partial/recoveredvisuallyinspected. NOTnative/currentAPKframes. NotyetGitown567assets; persistownprovenanceonlynextFUNCTIONALcycle, notimage-onlycommit.

---

Historical preparation and completed review below; earlier pending CI statement is superseded above.

## DRAFT — exact own CI / APK pending

HEAD 3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, basef98b5f618c5b78772c360b93d17e6028f0021008. Reject impossible calendar days in existing real mobile Passport/Safety read and confirmation parsers. New12 regressions: baseline2PASS10FAIL, candidate12/12; with29 unchanged focused tests41/41PASS, no skipped/cancelled. These are Node24 real helper/transport fixtures, not Android render/physical/production exploit.

Only3 date validators changed; whole-source reverse-substitution preserves every request/path/payload/tenant/permission/status/created-existing/unknown/no-retry/current guard/ordering/stat. Actual leapday/offset/epoch0/null optional/missing-profile preserved. Same calendar predicate already used by main Agenda. No API/SQL/RLS/roles/events/workflow/build/deps/lock/JSX/layout changes. Native APK IS required because mobile source changed; do not borrow542/565. Own exact HEAD CI+APK GREEN and actual post-merge CI+APK mandatory before claiming integration.

24 paths:4 code/test,6 append-only originaldocs/matrix, new evidence,7 unchanged historical565 doc/564 PNG+manifest blobs,5 OWN565 FAIL desktop PNGs+manifest. FULL main originals +565 preparation text preserved in-place; final565 ownCI1353FAIL/browserabort and ownAPKFAIL/offline-isolation truthfully consolidated. Those images are NOT current parser candidate/native frames.

#565/#558/#560 stay separate drafts; no reruns or merge. AOSP Tradefed Ethernet command source explicitly assumes adb root; no root/permissions/isolation assertion weakening applied. Onlyarea10 technicalinternal accepted,12pending; no nativeUI/SecureStore/VisualTruth/auth-success/production/PSP/money acceptance. CI/APK here pending NOTPASS; keepDRAFT until own observed outcomes and fullreview.

## Review / local full suite completed (not own CI/APK result)
765/765 mobile tests PASS locally, fail/skip/cancel0, against all153 fresh main mobile input files plus the4 reviewed candidate changes. Same 41 focused tests on exact original3modules produce31PASS10FAIL; candidate41/41.24 remote files all UTF8/base64-normalized exact; allmodes100644; all6 main/565 full prefixes+expected append exact.490of493 existing main non-doc blobs outside3validators unchanged. Candidateparentf98/tree66f89c verified; ahead1behind0. Original565 assets7 retain same blobs/modes; new5desktop565 frames independentlysignature/SHA/bytes1365x900/Pillowverify and recovered/failure visual inspectionPASS with own565FAILprovenance, notthiscandidate/nativeproof.

OwnCI38890073248/job116937140753 and ownAPK38890073257/job116937140654 still executing at last review. No queued/running step is PASS. No merge/rerun while pending.

---

## Ciclo funcional — PR #568: calendário de ACK de janela e suporte pelo cliente real — 2026-10-16

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Main de preparação 3e098cd51cd2fd84f21e144a600a814a2cb1a150; candidato predecessor368aa313a2aa55ad269060bdde12b19cb7bd1465 permanece DRAFT/NOTMERGED e seu CI é FAILURE, não PASS. Nenhum rerun cego, cancelamento ou alteração dos gates do navegador.

### Falha reproduzida / correção mínima
Disponibilidade e publicação aceitavam ACKs com startsAt/endsAt impossíveis (2026-02-30, 2025-02-29, 2026-04-31), normalizados por Date ao mesmo instante de um pedido VÁLIDO. Isso retornava saved/created falsamente. Não se alega entrada inválida aceita pela API, registro PG impossível ou incidente em produção: contratos API atuais já validam calendário/intervalo. Só a validação das datas do ACK em availability-submit.ts e company-job-publication.ts muda, usando o predicado de calendário existente da Agenda. Todo o código fora do predicado e das duas condições foi conferido por reversão; pré-validação de entrada, requests, payloads, identidade, sessão, tenant, contexto, UUID, ACK policy e ausência de retry automático ficam iguais.

14 regressões novas executam funções reais: 12 casos negativos (três datas, início/fim, dois helpers), dois controles de calendário legítimo/offset cruzando UTC/epoch0 e contexto/rejeição. Baseline nova suíte2PASS12FAIL; 17 antigos +14 novos RED19PASS12FAIL -> GREEN31PASS0FAIL; full mobile796PASS0FAIL0SKIP0CANCEL local. Os 17 controles anteriores estão intactos. CI agregado esperado1386=[145Web,796mobile,431API,3CLI,11monitor], mas não é resultado observado nesta preparação.

### Novos casos independentes API/cliente/PG — execução PENDENTE
Os ACKs e pedidos já obtidos por HTTP em http-journey-e2e alimentam os helpers atuais de disponibilidade/publicação, mantendo pedidos independentes do ACK e zero novos POSTs HTTP nesses dois consumidores JSON. Markers previstos MOBILE_WINDOW_AVAILABILITY_REAL_JSON_PASS e MOBILE_WINDOW_PUBLICATION_REAL_JSON_PASS, não ainda observados.

Após TODAS as verificações originais do fixture safety-support-chronology (antes do navegador já existente), mobile-support-client-http-e2e executará SupportSubmission + SupportIntent reais via NativeTSstrip/import e fetch REAL contra API local: (1) confirmação normal, restauração por novo objeto store, barreira confirmada sem novo POST, liberação local explícita; (2) novo intent, POST real201 consumido pelo fixture e resposta perdida uma única vez LOCALMENTE; app retorna unknown/pending; PG precisa testemunhar a linha gravada ANTES de uma tentativa explícita separada; restauração/novo send/release não geram POST implícito; retry explícito usa mesma chave/corpo e retorna o mesmo caso; liberação explícita. Totais requeridos2preparações/3POSTscase/2linhas, com um POST inicial normal, um POST inicial com resposta perdida e um replay explícito, não retry de negócio automático.

Caller já guardado exige CI/localAPI/PG DB exato mlivretrabalho_http/socketloopback; witness SQL SOMENTE leitura vincula ID/tenant/reporter/assignment/key/payload/status e Date real. Snapshots das cinco tabelas e ACL/policies verificam duas linhas novas e todos registros anteriores intactos, outsider401. Nenhuma nova escrita SQL direta, DDL, alteração de grant/RLS/evento, seed de papel, provedor ou dado real. Marker MOBILE_SUPPORT_CLIENT_HTTP_PG_PASS só após esses asserts. Adapter serializado é EM MEMÓRIA, reinício de objetos JS; NÃO disco/SecureStore, processo Android, tela, teclado ou aparelho físico.

Todos HTTP/asserts antigos continuam; duas linhas de consumidor adicionadas ao HTTPjourney e bloco novo ao fim da chronology; navegador, CORS, Fetchguard, sandbox, LNA, deadlines, workflow, build e smoke permanecem iguais. O consumidor antigo MOBILE_SUPPORT_REAL_JSON_PASS no script posterior permanece obrigatório e separado; no predecessor não foi executado. Nenhum novo marker está aprovado sem log primário.

### Provas próprias e aceite
Esta preparação exige CI E APK próprios do novo HEAD e pós-gates no merge real somente se justificado/green. Mobile mudou, APK NÃO é N/A. Nenhum resultado368/567 emprestado. Somente área10 técnica interna aceita; demais12 pendentes. RLS/app_runtime/React19.1.4/RN0.81.6/frozenlock/desenho preservados; produção/custos/providers/PSP/pentest/VisualTruth/físico/SecureStore/piloto separados. #558/#560/#565 ficam DRAFT com falhas históricas próprias. #567/#564/#563/#561 já integrados, não repetir.

### Recibo integral predecessor368 — história consolidada neste ciclo funcional
O conteúdo a seguir foi reobtido do corpo final do PR568 e preserva as qualificações CI FAILURE / APK SUCCESS. Não representa o resultado deste novo HEAD. As antigas preparações PENDING permanecem históricas, sem substituição por resumo. Os dois PNGs pr568-368-* têm proveniência desse predecessor e NÃO são frames do novo ciclo nem Android.

## FINAL OWN VERIFIED — DRAFT / NOT MERGED — 2026-10-16 12:03 UTC

HEAD `368aa313a2aa55ad269060bdde12b19cb7bd1465`, tree `09bd6335ed6da6f0cf593b5523ac52b59cb076c0`, parent/base MAIN `3e098cd51cd2fd84f21e144a600a814a2cb1a150`. No ready, merge, post-568 run, rerun or cancellation. General CI is FAILURE; own standalone APK is SUCCESS. Do not borrow previous567 green or retry this product failure merely for green.

### Own general CI: FAILURE, not green
[38896338100/job116957597212](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38896338100/job/116957597212), attempt1 completeFAILURE, ZEROretry.
1372tests=[145Web,782mobile,431API,3CLI,11monitor] allPASS/fail-skip-cancel0. Typecheck/build/mobileexport/migrationrunner2x/privacyPASS. HTTP/browserFAIL; PostSetupNodeSKIPPED; later ProductionTruth and later support HTTP fixture NOT executed.

**Actual new positive consumer gate:** MOBILE_CHAT_REAL_JSON_PASS11:52:07.8816248Z consumed actual PostgreSQL/API-created POST message ACK and GET message list with CURRENT real mobile loadMessages/sendMessage helpers. Transport callback returns already-obtained actual JSON; it sends ZERO additional HTTP POSTs. This is positive API JSON-to-helper compatibility, NOT real Android UI or client network/SecureStore proof.

**New support JSON consumer gate: NOT EXECUTED.** Its invocation is in the later existing HTTP support fixture, after http-journey/browser; failure stopped the workflow before reaching it. The9 new support calendar tests and all old local/CI support tests passed, but MUST NOT label the new real support JSON gate PASS. No support delivery/outbox/provider/native proof.

### Primary browser failure
Actual Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed11:53:02.2076616Z.
Browsercreatedjob-render timeout11:53:24.4937681Z. Actual teamPOST201 and jobPOST201 observed, followed by12 GET net::ERR_ABORTED/canceled=true/corsError=null. Failure DOM shows12 unavailable sections/counts and rates—, not invented zero. This run did NOT complete created-job rendering/partial503/recovery/reload/logout/B journey. No availability or journey PASS marker. Not ECR/startup failure here; actual root of old aborts remainsUNRESOLVED, not proved API/CORS/vendor defect. No browser/security/Fetchguard/CORS/sandbox/LNApermission/deadline change.

Two OWN568 desktop PNGs from this job independently signature/SHA256/bytes/1365x900/PillowverifyPASS; failure visually inspected. Not native frames, not yet Git assets:
- login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686
- failureca8b160097084f7a3214c125780515cd7e66d05ded89dcf057d1b8d43538bdbc/133660
Scratch chat-support-calendar-local/568-own-web-captures.json. Preserve own exact source only in NEXT FUNCTIONAL cycle, not image-only commit.

### Own standalone APK: SUCCESS, scoped install/launch proof
[38896338029/job116957597028](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38896338029/job/116957597028), attempt1 completeSUCCESS, ZEROretry.
CanonicalbuildSUCCESS12:00:14.0015569Z; emulatorAPI35/x86_64/pixel6; installationSuccess12:01:47.8590566Z; DEVICE_SMOKE_OK12:02:00.3559792Z metro_required=false. Original main build/workflow/smoke unchanged. Failure-only diagnostics normally skipped on success. NOT565offlineentry/newforms/taps/keyboard/SecureStore/authsuccess/physical/VisualTruth proof.

Artifact12044258736/notexpired/expiry2026-10-30T12:02:02Z, actually downloaded and independently inspected:
- ZIP28912071bytes SHA2561a82df5ffa9b5fab2cdf8fd4830576042eb741662bca4ed8d962b61ce6b463a1 matches API digest.
- IndividualAPK66161572bytes SHA256f2453f30b13d83936d5e87af64e8212e4765420c97aa0f7f45ea27a8d54ce0be matches SHA256SUMS.
- BUILD_INFO commit6dc07b039535169a5e07399b5566ffb840a8230a/release/packagecom.predibeacon.mlivretrabalho.pilot/metrofalse.
- Static generatedmanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480 equals567. minSDK24/target36/INTERNETdeclared; static metadata not actual transport/security/UI proof. ZIP digest is NOT individual APK digest.

### Checkout truth / full review
Both runs actualcheckout `6dc07b039535169a5e07399b5566ffb840a8230a` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`368aa313a2aa55ad269060bdde12b19cb7bd1465`], tree09bd6335ed6da6f0cf593b5523ac52b59cb076c0 exactly candidate, NOT literal HEAD. CIprimary11:49:54.2445938Z/native11:49:41.7569364Z; Git commit/tree/parents re-read.

26paths ALLremoteUTF8/base64-whitespace-normalized bytes EXACT; modes100755 twoexistingHTTPshells,100644rest.1161otherpriorblobs sameSHA/mode;489of493 existing main non-docs outside2mobilevalidators+2HTTPscripts unchanged. All old assertions/HTTPcalls preserved, scripts each addONE nonblank consumer invocation.3newtest files + newconsumer script. All source outside2datepredicates/ACKcondition exactly reversible to main, all oldmobiletests intact. Full5originaldocs+matrixmainprefix preserved INPLACE,567 FINALreceipt consolidated integral and10historical567WebPNGs+manifest persisted with exact own/post provenance. None are568/nativeframes. Ahead1/behind0/mergebase3e. APKN/A FALSE, mobilechanged; ownAPK measured. No main/integrated gate was removed;565draft gate not incorporated.

Editorial scope clarification: prepared appendix says corrupt confirmed record “em disco”; observed regression uses serialized raw JSON in an IN-MEMORY adapter, not actual disk or native SecureStore. Implementation fails closed on invalid stored JSON without deletion/replacement; no retention policy invented.

### Functional result / limits / continuation
17newregressions baseline4PASS13FAIL→17PASS; old51+17=68PASS includingAmerica/Sao_Paulo; full782mobilelocal+CI. Reads reject impossible calendar, chatACKunknown afterONEunchangedcall, supportACKunknown/pending barrier retained with sameidentity/tenant/key/payload, no implicit repeat or release. Existing valid calendars/offsets/epochzero/explicit confirmed release unaffected. No impossible timestamp stored inPG/productionincident/exploit claimed.

MAIN remains3e/tree66f89c/orderedparents[f98,3a66]. Onlyarea10AndroidstandaloneTECHNICALINTERNAL accepted; other12pending. Otherdrafts558/560/565 unchanged;externals215/219/220/224/228OPEN. No production/services/costs/providers/PSP/realmoney. Do not ready/merge/rerun368 blind; consolidate FINAL568 only next FUNCTIONALcycle, no self-reference metadata/image/activity Gitcommit. The support actualJSON gate remains a concrete pending proof.

Independent NEXT LOCAL audit only, not published/not part782: current availability-submit and company-job-publication accept impossible2026-02-30 ACK when it normalizes to valid requested2026-03-02 instant. Actualhelpers fixture3tests baseline1PASS2FAIL;17oldcontrols+3 baseline18PASS2FAIL, copiedcandidate addscalendarcheck onlyACK fields→20PASS. Inputs/requests/response-offset equivalence unchanged in copy. APIavailability and companyjobcreate already validate input calendar/interval, no API bug. Screen requires nonblankworkCity, so speculative blank-city helper mismatch was NOT patched. No source/commit after368 or actualHTTP/Android/exploit proof for nextaudit. Needs fresh normative/source/contracts + coherent new regression/gates, NOT a blind retry of existing failure.

---
## Historical preparation — superseded ONLY by actual results above
## Functional correction / gates pending
Base 3e098cd51cd2fd84f21e144a600a814a2cb1a150; HEAD 368aa313a2aa55ad269060bdde12b19cb7bd1465; tree 09bd6335ed6da6f0cf593b5523ac52b59cb076c0. Only chat/support date predicates change; no app UI/authority/transport/retry policy change. 17 new regressions baseline4PASS13FAIL→17PASS; 51 unchanged focal tests +17=68PASS; fullmobile782PASS / zero fail, skip or cancel. TZ America/Sao_Paulo68PASS. Real HTTP fixture JSON-to-current-helper parity is added, still PENDING primary CI.

Own CI expected1372=[145Web,782mobile,431API,3CLI,11monitor] and own standalone APK REQUIRED, NOT yet PASS. Post gates required on actual real merge. No ready/merge until justified fresh exactHEAD green; no blind retry product failure. Onlyarea10technical accepted; other12pending. No production/costs/providers/PSP/realmoney. Otherdrafts558/560/565 preserved.


## Conversa e suporte — integridade do calendário e ACK — ciclo funcional 2026-10-16 UTC

Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, após567 jáMERGED. README e originais completos recebidos de GitHub; todos os bytes anteriores dos5originais/matriz permanecem PREFIXO integral NO LUGAR, sem substituir documentos ou estados históricos por resumo. Recibo final567 integral abaixo consolida próprio+pós reais no ciclo funcional, não é resultado deste novo HEAD.

### Falha reproduzida e correção mínima
Conversa loadMessages aceitava createdAt impossível e apresentava READY; sendMessage aceitava mesmo ACK como SENT. SupportAcknowledgement aceitava createdAt impossível, createSupportSubmission real retornava CONFIRMED e store confirm/releaseConfirmed podia liberar a barreira pendente. Fixtures usam2026-02-30,2025-02-29-03:00,2026-04-31+02:00, que Date normaliza. Reproduzido nos módulos TypeScript REAIS com transportes/adapter in-memory explícitos, não alegação de data impossível armazenada noPostgres, incidente/exploit de produção ou SecureStore nativo.

Correção SOMENTE predicado date em apps/mobile/lib/conversation.ts e inclusão do mesmo predicado calendário já usado BYTE-IDÊNTICO pela Agenda em support-intent.ts, substituindo a condição createdAt doACK. Ler calendário inválido retornaERROR; ACK de conversa permaneceUNKNOWN depois de UMA chamada; suporte retornaUNKNOWN, mantém registro pending exatamente com mesma identidade/tenant/chave/payload; novo sendNew recuperaPENDING sem outra preparação/POST; releaseConfirmed recusa sem remover. Registro confirmado corrompido em disco falha fechado, não é apagado/substituído por política inventada. Calendários válidos/leapday2024/offset cruzandoUTC/epochzero strings exatas preservados; liberação explícita de confirmado válido permanece. Não alterar contrato de suporte geral nullassignment autorizado, autoridade por tenant/membership ou recuperação explícita.

17regressões novas em conversation-calendar.test.mjs(8),support-calendar.test.mjs(5),support-submission-calendar.test.mjs(4): baseline main4PASS/13FAIL→GREEN17/17.51testes existentes BYTE-IDÊNTICOS nesses3módulos +17=68/68PASS, inclusive TZ America/Sao_Paulo. Fullmobile782/782PASS local,0fail/skip/cancel (765anteriores+17); modelos/helpers reais≠renderReactNative/Android/SecureStore. Todo source fora2predicados/condição compare-substituível BYTE-IDÊNTICO. Requests/UUID/path/headers/body/tenant/sessão/foco/prazo15s/chaveidempotente/current/ordem/stat/ACK/no-autoretry/JSX/API/controllers/SQL/RLS/grants/eventos/mobiledesign/deps/lock/build/workflows/smoke preservados.

### Paridade com JSON HTTP/Postgres real — gate novo, ainda PENDENTE nesta preparação
scripts/mobile-chat-support-contract.cjs lê somente JSON já obtido pelas fixtures locais existentes: real POST+GET de conversa e replayACK de suporte apósreview. NativeTSstrip carrega helpers atuais; conversa valida lista/ACK e suporte stage/confirm/restart/read/release em adapter in-memory. Duas invocações adicionadas aosHTTPscripts, TODOS asserts/chamadas HTTP anteriores intactos; nenhuma nova chamadaHTTP/SQL, nenhumPOST adicional, alteração de grant/policy/status/body/tenant/auth. Gate exige CI e configAPIPG exatoslocalhost via helper localConfiguration existente; script não acessa banco/rede/credencial, não recebe bearer. Marcadores MOBILE_CHAT_REAL_JSON_PASS eMOBILE_SUPPORT_REAL_JSON_PASS só podem ser aceitos após logs primários novos, não resultados locais simulados/antecipados. Não conta marcadores como novos testes unitários nem prova de tela ou SecureStore.

### Evidência histórica567 persistida com origem própria
DezPNGs Web de567(5OWN+5POST) +PR567_OWN_POST_CHAT_SUPPORT_CYCLE_PROVENANCE.json persistidos neste ciclo sobdocs/evidencias/web-browser-2026-10-16/, comsignature/SHA256/bytes/1365x900 conferidos independentemente, fonteprimáriajobs116937140753/116942544994. OWNsourcehead3a66/checkout42ffcSINTÉTICO[f98,3a66]/tree66f89c/run38890073248attempt1SUCCESS; POSTcheckoutLITERAL3e/run38891514441attempt2SUCCESS. Não são frames deste novoHEAD nem Android. Recibo567 separaAPKindividual≠ZIP; nenhuma prova567 é emprestada para aceitar candidato/565/558/560.

### Gates e limites atuais
OWNCI esperado1372=[145Web,782mobile,431API,3CLI,11monitor], APKstandaloneOWN obrigatório por mobilealterado, ambos AINDA PENDENTES neste apêndice preparação; pósCI/APK no mergeREAL também obrigatórios. Não ready/merge sem ambos própriosGREEN e revisão/expectedSHAfresh, não rerun falhaproduto para verde. Preservar f98/3e/567históricos, não repetir merges. Navegador/CORS/Fetchguard/sandbox/LNA/permissões/deadlines inalterados; causa antigaERR_ABORTED e startup permaneceUNRESOLVED apesar567GREEN.
Somente área10Androidstandalone TÉCNICOINTERNO aceita; outras12pendentes. Esta correção e paridadeJSON não aceitam integralmenteárea9/11 ounativeUI/taps/teclado/loginválido/SecureStore/físico/piloto/VisualTruth. Externos215/219/220/224/228OPEN;565aa0/558879/560e47DRAFTFAIL separados. Semprodução/serviços/custos/credenciais/contratos/provider/PSP/dinheiroreal. #566fechada porgithub-actions[bot]comSHA3e/evento11:05:53Z/comment6214133831, semissuewritesmanuais/commitatividade. Manterrotinaúnicaenabled/scheduleinalterados; parcialnãoencerra13áreas. Datas deoutrosleitores ainda precisam auditoriafactual, não declarar todoscorrigidos.



---

## Ciclo funcional PR #568 — calendário de membros, suporte e substituições — 2026-10-16

Escopo exclusivo MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150; predecessor e2b3b3999dc40c380e60e567d34d612193aa7610 DRAFT/NOTMERGED, próprio CI FAILURE/APK SUCCESS. Novo trabalho funcional, não rerun cego do predecessor. Todos os bytes anteriores dos cinco originais e matriz mantidos como prefixos integrais NO LUGAR.

### Falha reproduzida, correção mínima e regressões
Os módulos reais professional-support.ts, company-members.ts e company-replacements.ts aceitavam datas impossíveis de fevereiro/abril pois Date as normalizava. Leitores retornavam ready; generateInvitation retornava created para ACK com expiresAt impossível. A API usa timestamps PG/now()+7days e valida autoridade; não se alega dado impossível gravado no PG, exploração/incidente de produção ou falha de ACL.

29 regressões novas em member-support-calendar.test.mjs: baseline2PASS27FAIL; após correção29PASS. Cobrem três datas inválidas × nove campos/ações: suportecreatedAt inclusive registro de outra seleção, membroscreatedAt/deactivatedAt, convitesexpiresAt/acceptedAt/revokedAt, ACKexpiresAt após uma chamada com path/body intactos, assignmentstartsAt/endsAt mantendo outra seção independente pronta. Controles positivos validam leapday/offset cruzando UTC/epoch0/pre1970, ordem e strings exatas, datas opcionais ausentes/nulas e vazio real. Vinte e seis controles antigos intactos +29novos =55PASS inclusive TZAmerica/Sao_Paulo; fullmobile825PASS/0fail/skip/cancel local (796anteriores+29). Unidade/helper ≠ Android render.

Mudança somente nos predicados dos três módulos, copiando a função calendário da Agenda BYTE-IDÊNTICA e mantendo wrapper opcional em substituições. Reversão mecânica restitui integralmente source anterior fora dos predicados/condições. Requests/headers/body/UUID/identidade/tenant/roles/current/deadline/no-autoretry/ACKsemantics/nullassignment/filtros/ordem/ações/JSX/API/SQL/RLS/deps/lock/build/workflow/smoke preservados.

### Nova jornada de cliente REAL/API/PG — PENDENTE nesta preparação
Novo scripts/mobile-member-read-http-e2e.cjs carrega fontes móveis atuais por NativeTSstrip e executará fetch REAL somente contra localhostAPI/CI+DB exato via guarda existente. Reusa empresas/profissional/outsider/assignments descartáveis criados HTTP no fixture Safety. Fluxo owner: ler membros e convites, criar UM convite manager com generateInvitation, ler expiresAt/acceptedAt/revokedAt reais, witness PG vincula tenant/id/email/role/invited_by/expiry/tokenhash sem logar código, revogar explicitamente pelo helper, ler data revogada e witness novamente. Nenhuma aceitação ou nova membership é criada.

Leitura de suporte pelo profissional já autorizado valida seleção assignment e nullassignment geral EXISTENTE via dois GETs, com IDs/fatos comparados ao PG. Leitura de substituições usa GETs reais de assignment+requests, valida horários PG e isolamento da outra empresa, sem criar/substituir alocação. Leitura gestão como profissional deve receber2HTTP403; outsider/ownerdaoutraempresa4HTTP401. Totais requeridos16GET+2POST(create/revoke), sem retry de negócio/POST implícito. Prova não é Android/teclado/SecureStore/provider.

Invocação nova APÓS todos os asserts e markers antigos da Safety/SupportClientlostACK, antes do finally; todo conteúdo anterior retido byte a byte. Novos snapshots guardam cinco tabelas antigas, memberships/assignments de dois tenants e somente uma nova invitation revogada; todos registros anteriores intactos, RLS/policies/ACL sem alterações. Novas consultas PG são APENAS leitura, sem DDL/DML direto/seed de papel/grants/histórico apagado. Marker MOBILE_MEMBER_SUPPORT_READ_HTTP_PG_PASS somente após os asserts. Todos gates HTTP/navegador/laterSupportJSON/CORS/Fetchguard/sandbox/LNA/deadlines continuam, não mover/remover para verde.

### Gates próprios e aceite
CI novo esperado1415=[145Web,825mobile,431API,3CLI,11monitor], APK próprio OBRIGATÓRIO porque mobile mudou, ambos ainda PENDENTES nesta preparação. Merge somente justificado com própriosgreen exatos/fresh review/expectedSHA, seguido de CI/APK pós no merge REAL. Nenhum PASS do predecessor emprestado. Somente área10 técnica interna aceita; outras12pendentes. Externos215/219/220/224/228separados; sem produção/providers/PSP/custos/serviços/dinheiro real. Native565isolation e Chrome558root permanecem sem solução comprovada, sem reduzir proteções.

### Recibo integral predecessor E2b, consolidado neste ciclo funcional
Os cinco PNGs pr568-e2b-* pertencem ao run38927529956attempt1/job117062786588FAIL/checkout618d119f12c07c7a16a475ba1ecb6ac8fe31ce42 SINTÉTICO[main3e,e2b]/treee444, NÃO são frames do novo HEAD nem Android. Manifest de origem próprio. O texto integral abaixo foi relido do recibo final do PR568: CI FAILURE/APK SUCCESS e limites permanecem. Preparações PENDING antigas são história, não estado deste novo candidato.

## FINAL OWN CI FAILURE / OWN APK SUCCESS — DRAFT / NOTMERGED — 2026-10-16 UTC

Current HEAD `e2b3b3999dc40c380e60e567d34d612193aa7610`, tree `e444dd019eabc29fa6198642b5b6d120d63a3b77`, ordered parent `368aa313a2aa55ad269060bdde12b19cb7bd1465`. Main remains `3e098cd51cd2fd84f21e144a600a814a2cb1a150` / tree66f89c3ef2902dad6d1d59e0210be7229c3a857c / orderedparents[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. No ready/merge/post568/retry/cancel. General CI is FAILURE, never label it green or borrow prior567/368 results.

### Own CI: FAILURE, all1386unitsPASS
[38927529956/job117062786588](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38927529956/job/117062786588), attempt1 COMPLETE FAILURE, ZEROretry.1386=[145Web,796mobile,431API,3CLI,11monitor]PASS/fail-skip-cancel0. Types/build/mobileexport/migrationrunner2x/privacyPASS; HTTP/browserFAIL, PostSetupNodeSKIPPED/laterProductionTruthNOTexecuted.

### New actual independent client/API/Postgres results
- MOBILE_WINDOW_AVAILABILITY_REAL_JSON_PASS15:55:38.5979929Z and MOBILE_WINDOW_PUBLICATION_REAL_JSON_PASS15:55:38.7165788Z consume actual earlier HTTP ACK JSON with independently existing request payloads; CURRENTrealhelpers acceptvalidresponses, ZEROadditionalHTTPPOSTs by these consumers. NativeTSstrip/fixturecallback, not nativeUI or actualhelper-network proof.
- MOBILE_CHAT_REAL_JSON_PASS15:55:44.6768358Z from actual oldHTTPmessagePOSTACK+GETlist through currentloadMessages/sendMessage, also ZEROadditionalHTTPPOSTs.
- **MOBILE_SUPPORT_CLIENT_HTTP_PG_PASS15:55:53.2922134Z** is different: actualCURRENT SupportSubmission/SupportIntent modules execute REALfetch against guarded disposablelocalhostAPI and actualPG. NormalcaseCONFIRMED, restored in newstoreobject, confirmedbarrier preventsnewcasePOST, explicitlocalrelease. A SECONDnewintent gets actualPOST201 and validACK, fixture locally drops that response ONCE; appreturnsUNKNOWN and retainsPENDING. ReadonlyPGwitness proves rowCOMMITTED BEFORE separate explicitretry. Restart/inspect/sendNew/release makeNOimplicitcasePOST. ONEexplicitpendingretry uses samekey/body and returns samecaseACK, then explicitlocalrelease. Actual totals2preparationPOSTs/3casePOSTs/2rows, not productionbusinessautoretry.
- Cases d02e9776-9a14-4a2b-a358-9400c9d30a2c and9a75046f-3d0a-4ccd-b32d-113e4887bf5b. PGDateobjects/currentdatabaseexactmlivretrabalho_http/actualclientsocket::1; identity/tenant/assignment/key/payload/statusbinding. Fiveexistingfixturetableoldrows unchanged, ACL/policiesunchanged, outsider401. No newSQLDML/DDL/grants/RLSdisable/events/historydeletion. Serializationadapter **INMEMORY**, objectrestart only, NOTdisk/SecureStore/nativeAndroidprocess/UI/keyboard/physical/providerproof.
- All original SAFETY_CHRONOLOGY assertions pass15:55:53.2207436Z before newcases; original3actualHTTPorders +currentSafetyrealJSONloader preserved. PROFESSIONAL_CHRONOLOGY_PASS15:55:52.5515482Z.
- OLD later **MOBILE_SUPPORT_REAL_JSON_PASS NOTEXECUTED**: its separate existing HTTPfixture is after the failedbrowser. Newactualclientcase is not backfilled or borrowedPASS for that older gate.

### Browser: real partial success followed by B failure
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 actual15:56:29.5720964Z.
WEB_SECTION_AVAILABILITY_BROWSER_PASS15:56:31.6218087Z: actualONEteamsGET503 consumed +11otherDISTINCTrealGET200, unknownloading/—, humanrefresh12NEWGET200/team1, ZEROextraPOSTfromSEND. ActualAteam/jobACK201/persist/pay12345cents/dates/render passed. Anewcompletedocumentreload and actualsignoutPOST201 occurred beforeB by primaryresponses and unchanged sequentialdrivercontrolflow.
FAIL15:56:51.7439035Z loaded-dashboard after Bsignin201: **B12GETnetERR_ABORTED/canceledTRUE/corsErrorNULL**, UI B12unavailable/counts/rates—, NOTfalsezero. FinalB isolation assertions and actualrevoked-browserGETme401/otherSAMEidentitysession200 are AFTERthisfailedgate and NOTEXECUTED. No full8journeyPASS. Notstartup/ECR/newpermissiondenial, rootoldintermittentabortsUNRESOLVED, noAPI/CORS/Chrome/vendorcauseproved. No browserflags/image/security/Fetchguard/CORS/sandbox/LNA/deadlinechange.

FiveOWNdesktopPNGs in primarylog117062786588 / window-ack-calendar-local/568-e2b-own-web-captures.json independentlydecodedPNGsignature/SHA256/bytes1365x900/PillowverifyPASS; recovered+failurevisuallyinspected. NOTnativeframes, NOTyetGitcurrentframes; preserveownsourcehead/checkout/tree/run/attempt/job/result in NEXTFUNCTIONALcycle only, noimage-onlycommit:
- login SHA25675fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc / 33686bytes
- company-a-created SHA256b2a1809d42ac13150d6db2029578494ca3f4466df85d34ab6e12fbe5a2abe14c / 133056bytes
- company-a-team-read-unavailable SHA25678f5b3465d386266a94de437d8e584592742b2f443bd13dfb059a38e01293290 / 142042bytes
- company-a-team-read-recovered SHA256be322e4f7610e6803fa0c47462d7fd386f8f85e14f5405084fb7a1f5f285bbda / 133314bytes
- failure SHA25689ab057dfd60cb28f86a33d2deb2e38d886e733c1515e0815712bf9302ee3f3d / 133827bytes

### Checkout truth / review
CIprimary15:53:27.2299841Z checkout `618d119f12c07c7a16a475ba1ecb6ac8fe31ce42` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`e2b3b3999dc40c380e60e567d34d612193aa7610`] / treee444dd019eabc29fa6198642b5b6d120d63a3b77 equivalentcandidate, NOTliteralHEAD; Gitcommit/tree/parents re-read.

WholePR35paths / ALL35remoteUTF8orbase64-whitespace-normalizedbyteexact:17newcyclepaths checkedagainstpreparedbytes,18priorpaths readbackunchanged. Modes100755twoHTTPshells100644rest.1176otherpredecessorblobsSHA/modeunchanged.486of493existingmainnon-docblobs outside4validators+3HTTP/fixture scriptsidentical. APIcontrollers/SQL/RLS/auth/roles/membership/events/allJSX/React19.1.4/RN0.81.6/deps/lock/native/workflows/build/smoke unchanged;89selectedprotectedinputs verifiedsame. Appmobilechanged soAPK N/A is FALSE. Nativecanonicalworkflowandoldsmoke retained,565draftgate neitheradoptednorremoved. Ahead2behind0/mergebase3e. FullmainAND368prefix5originaldocs+matrixpreservedINPLACE, whole368FINALreceipt consolidated. Prior368twoFAILdesktopPNGs+manifest nowGitwithownexactprovenance; allolder567assets sameblobs/modes, nonecurrente2b/native.

14NEWACKwindowregressions actualbaseline2PASS12FAIL;17old+14new RED19PASS12FAIL→GREEN31/31, TZAmerica/Sao_Paulo31PASS; full796local+CI. OnlyACKcalendarpredicateschange in availability-submit/company-job-publication, existingAgenda predicate copied; allsourceoutsideACKguards reversibleexactto368. Inputprevalidation/payload/headers/path/identity/tenant/current/UUID/retrypolicy unchanged. Prior17chat/supportregressions+predicates unchanged. NoimpossiblePGstoredrow/productionincident/exploitclaim.

### Acceptance and next safe work
Onlyarea10Androidstandalone TECHNICALINTERNAL accepted, other12pending; unitcounts/desktop/APIJSON/DEVICE_SMOKE_OK do not acceptnativeUIor13areas. Externals215/219/220/224/228OPENseparate. No production/newservices/costs/providers/PSP/credentials/contracts/realmoney. Other558/560/565remainDRAFTFAILseparate. No productrerunmerelyforgreen/no blindrerune2b/no metadata-onlyselfreference/activitycommit.

LOCALnextaudit only, NOTpublished/notpart796: currentprofessional-support,company-members,company-replacements realhelpers accept3impossiblecalendarstrings asREADY/invitationACKCREATED. window-ack-calendar-local/next-audit/remaining-calendar.test.mjs14tests baseline2PASS12FAIL (validleapday+epochcontrolsPASS), noappfix/CI/HTTP/Android/PGinvaliddataproof. Needs freshcontracts+optionaldate/role/tenantcontrols+actualAPIfixturebeforeminimalfix, notallparsersfixed. CurrentcompanymembersAPIowner-only and PGgeneratedexpiry remain authoritative; noauthorityexpansion/imaginaryAPIbug. Native565Ethernet strictguard remains unresolved; no unsupportednetworkcmd/root/grant/firewall/deadline/securitychange.

### Own standalone APK: SUCCESS, scoped install/launch proof
[38927530012/job117062788313](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38927530012/job/117062788313), attempt1 COMPLETE SUCCESS, ZEROretry. CanonicalbuildSUCCESS16:04:17.7448487Z / installationSuccess16:05:45.4238736Z / DEVICE_SMOKE_OK16:05:57.8290012Z metro_required=false, API35/x86_64/pixel6. Mainworkflow/build/oldsmoke unchanged; failure-onlydiagnosticsteps normalSKIPPED. NOT565offlineguard/forms/taps/keyboard/nativeauthsuccess/SecureStore/physical/VisualTruth evidence.
APKprimarycheckout15:53:14.5157558Z sameSYNTHETIC618d119f12c07c7a16a475ba1ecb6ac8fe31ce42 parents[3e,e2b]treee444, NOTliteralHEAD.

Artifact12058331243/notexpired/expiry2026-10-30T16:05:59Z actuallydownloadedthroughGitHubartifacttool and inspected:
- ZIP28912196bytes SHA25616803b5265c6bd42f66694bd4ef94fc7d87434c8f9bdf55986b0290b565fc4b5 matchesGitHubAPIdigest.
- IndividualAPK66161688bytes SHA25662996c3d76af8a2f91a3662e3c09b57be83bca9d9a15d922f7d5737ffcb69333 matchesSHA256SUMS.
- BUILD_INFO exactcheckout618d119f12c07c7a16a475ba1ecb6ac8fe31ce42/release/packagecom.predibeacon.mlivretrabalho.pilot/metrofalse.
- StaticgeneratedmanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480, same567/368/minSDK24target36/INTERNET/noexplicitusesCleartextTrafficorNetworkSecurityConfig; STATIC metadata only, NOT actualHTTPtransport/securitypermission/nativeUIproof. ZIPdigest is NOTindividualAPKindigest.
LatestvalidatedMAINAPK remains567POST3e; this is candidatee2b ownAPK, no568merge/post exists.

### Fresh monitoring / records
ActivityWatch38913325312/job117014361308SUCCESS schedulemarker14:08:20.1879949Z main3e/age182/openPR4/active0. #569OPEN botcreated14:08:20Z, monitor of commits not proof agentstopped. No manualissuewrites/activitycommit. Main3e and568DRAFT exacthead reconfirmed; otherdrafts558879/560e47/565aa0+external215219220224228remainopen. Keep existingroutineonlyenabled/scheduleunchanged,13taskNOTcomplete. Gitdocs preparationPENDING is historical, thisFINALreceipt is authoritativefornewownresults; consolidateFINALe2b in5docs/matrixONLYnextFUNCTIONALcycle, noautorefmetadata/image-onlycommit.

---

## HISTORICAL preparation and predecessor368 receipt — not results of currente2b
## CURRENT functional candidate — 2026-10-16 UTC
HEAD e2b3b3999dc40c380e60e567d34d612193aa7610 / tree e444dd019eabc29fa6198642b5b6d120d63a3b77 / ordered parent 368aa313a2aa55ad269060bdde12b19cb7bd1465. Same PR568, DRAFT/NOTMERGED. Main 3e098cd51cd2fd84f21e144a600a814a2cb1a150 unchanged. Own NEW CI and APK PENDING, not PASS. No ready/merge/post/retry/cancel.

14 new regressions reproduce normalized impossible startsAt/endsAt ACKs of a valid request (new2PASS12FAIL; old17+new14 RED19PASS12FAIL -> GREEN31/31). Full mobile796PASS locally, no fail/skip/cancel; expected aggregate1386, not yet CI. Minimal ACK date guards only in availability-submit and company-job-publication; request/input policy unchanged.

NEW independent real SupportSubmission/SupportIntent client HTTP cases after all original safety-chronology assertions: normal confirmation and defined local loss after actual HTTP201, PostgreSQL witness BEFORE explicit retry, pending recovery with no implicit POST, explicit same-key replay, local release. Adapter in memory, not SecureStore/disk/Android UI. Two prepPOSTs/three casePOSTs/two rows required; no business autoretry. New window ACK consumer gates use actual prior HTTP JSON with independent requestpayloads, no new POSTs. Existing browser and later support JSON gate remain required, unchanged; no deadline/security/Fetchguard/CORS/sandbox/LNA/workflow/build/smoke change.

17 functional-cycle paths:2ACK modules+14testfile+4scripts+5originaldocs+matrix+new evidence+2prior368desktopPNGs+manifest. Full predecessor/main document prefixes preserved in place. Prior368CI FAILURE/APK SUCCESS consolidated whole, no PASS borrowed. NativeAPK required (mobile changed); own/post exactcheckout to be verified. Only area10 technical internal accepted, other12pending. Externals open/separate. Final receipts below are historical predecessor368, not results of this new HEAD.

---

## FINAL OWN VERIFIED — DRAFT / NOT MERGED — 2026-10-16 12:03 UTC

HEAD `368aa313a2aa55ad269060bdde12b19cb7bd1465`, tree `09bd6335ed6da6f0cf593b5523ac52b59cb076c0`, parent/base MAIN `3e098cd51cd2fd84f21e144a600a814a2cb1a150`. No ready, merge, post-568 run, rerun or cancellation. General CI is FAILURE; own standalone APK is SUCCESS. Do not borrow previous567 green or retry this product failure merely for green.

### Own general CI: FAILURE, not green
[38896338100/job116957597212](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38896338100/job/116957597212), attempt1 completeFAILURE, ZEROretry.
1372tests=[145Web,782mobile,431API,3CLI,11monitor] allPASS/fail-skip-cancel0. Typecheck/build/mobileexport/migrationrunner2x/privacyPASS. HTTP/browserFAIL; PostSetupNodeSKIPPED; later ProductionTruth and later support HTTP fixture NOT executed.

**Actual new positive consumer gate:** MOBILE_CHAT_REAL_JSON_PASS11:52:07.8816248Z consumed actual PostgreSQL/API-created POST message ACK and GET message list with CURRENT real mobile loadMessages/sendMessage helpers. Transport callback returns already-obtained actual JSON; it sends ZERO additional HTTP POSTs. This is positive API JSON-to-helper compatibility, NOT real Android UI or client network/SecureStore proof.

**New support JSON consumer gate: NOT EXECUTED.** Its invocation is in the later existing HTTP support fixture, after http-journey/browser; failure stopped the workflow before reaching it. The9 new support calendar tests and all old local/CI support tests passed, but MUST NOT label the new real support JSON gate PASS. No support delivery/outbox/provider/native proof.

### Primary browser failure
Actual Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed11:53:02.2076616Z.
Browsercreatedjob-render timeout11:53:24.4937681Z. Actual teamPOST201 and jobPOST201 observed, followed by12 GET net::ERR_ABORTED/canceled=true/corsError=null. Failure DOM shows12 unavailable sections/counts and rates—, not invented zero. This run did NOT complete created-job rendering/partial503/recovery/reload/logout/B journey. No availability or journey PASS marker. Not ECR/startup failure here; actual root of old aborts remainsUNRESOLVED, not proved API/CORS/vendor defect. No browser/security/Fetchguard/CORS/sandbox/LNApermission/deadline change.

Two OWN568 desktop PNGs from this job independently signature/SHA256/bytes/1365x900/PillowverifyPASS; failure visually inspected. Not native frames, not yet Git assets:
- login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686
- failureca8b160097084f7a3214c125780515cd7e66d05ded89dcf057d1b8d43538bdbc/133660
Scratch chat-support-calendar-local/568-own-web-captures.json. Preserve own exact source only in NEXT FUNCTIONAL cycle, not image-only commit.

### Own standalone APK: SUCCESS, scoped install/launch proof
[38896338029/job116957597028](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38896338029/job/116957597028), attempt1 completeSUCCESS, ZEROretry.
CanonicalbuildSUCCESS12:00:14.0015569Z; emulatorAPI35/x86_64/pixel6; installationSuccess12:01:47.8590566Z; DEVICE_SMOKE_OK12:02:00.3559792Z metro_required=false. Original main build/workflow/smoke unchanged. Failure-only diagnostics normally skipped on success. NOT565offlineentry/newforms/taps/keyboard/SecureStore/authsuccess/physical/VisualTruth proof.

Artifact12044258736/notexpired/expiry2026-10-30T12:02:02Z, actually downloaded and independently inspected:
- ZIP28912071bytes SHA2561a82df5ffa9b5fab2cdf8fd4830576042eb741662bca4ed8d962b61ce6b463a1 matches API digest.
- IndividualAPK66161572bytes SHA256f2453f30b13d83936d5e87af64e8212e4765420c97aa0f7f45ea27a8d54ce0be matches SHA256SUMS.
- BUILD_INFO commit6dc07b039535169a5e07399b5566ffb840a8230a/release/packagecom.predibeacon.mlivretrabalho.pilot/metrofalse.
- Static generatedmanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480 equals567. minSDK24/target36/INTERNETdeclared; static metadata not actual transport/security/UI proof. ZIP digest is NOT individual APK digest.

### Checkout truth / full review
Both runs actualcheckout `6dc07b039535169a5e07399b5566ffb840a8230a` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`368aa313a2aa55ad269060bdde12b19cb7bd1465`], tree09bd6335ed6da6f0cf593b5523ac52b59cb076c0 exactly candidate, NOT literal HEAD. CIprimary11:49:54.2445938Z/native11:49:41.7569364Z; Git commit/tree/parents re-read.

26paths ALLremoteUTF8/base64-whitespace-normalized bytes EXACT; modes100755 twoexistingHTTPshells,100644rest.1161otherpriorblobs sameSHA/mode;489of493 existing main non-docs outside2mobilevalidators+2HTTPscripts unchanged. All old assertions/HTTPcalls preserved, scripts each addONE nonblank consumer invocation.3newtest files + newconsumer script. All source outside2datepredicates/ACKcondition exactly reversible to main, all oldmobiletests intact. Full5originaldocs+matrixmainprefix preserved INPLACE,567 FINALreceipt consolidated integral and10historical567WebPNGs+manifest persisted with exact own/post provenance. None are568/nativeframes. Ahead1/behind0/mergebase3e. APKN/A FALSE, mobilechanged; ownAPK measured. No main/integrated gate was removed;565draft gate not incorporated.

Editorial scope clarification: prepared appendix says corrupt confirmed record “em disco”; observed regression uses serialized raw JSON in an IN-MEMORY adapter, not actual disk or native SecureStore. Implementation fails closed on invalid stored JSON without deletion/replacement; no retention policy invented.

### Functional result / limits / continuation
17newregressions baseline4PASS13FAIL→17PASS; old51+17=68PASS includingAmerica/Sao_Paulo; full782mobilelocal+CI. Reads reject impossible calendar, chatACKunknown afterONEunchangedcall, supportACKunknown/pending barrier retained with sameidentity/tenant/key/payload, no implicit repeat or release. Existing valid calendars/offsets/epochzero/explicit confirmed release unaffected. No impossible timestamp stored inPG/productionincident/exploit claimed.

MAIN remains3e/tree66f89c/orderedparents[f98,3a66]. Onlyarea10AndroidstandaloneTECHNICALINTERNAL accepted; other12pending. Otherdrafts558/560/565 unchanged;externals215/219/220/224/228OPEN. No production/services/costs/providers/PSP/realmoney. Do not ready/merge/rerun368 blind; consolidate FINAL568 only next FUNCTIONALcycle, no self-reference metadata/image/activity Gitcommit. The support actualJSON gate remains a concrete pending proof.

Independent NEXT LOCAL audit only, not published/not part782: current availability-submit and company-job-publication accept impossible2026-02-30 ACK when it normalizes to valid requested2026-03-02 instant. Actualhelpers fixture3tests baseline1PASS2FAIL;17oldcontrols+3 baseline18PASS2FAIL, copiedcandidate addscalendarcheck onlyACK fields→20PASS. Inputs/requests/response-offset equivalence unchanged in copy. APIavailability and companyjobcreate already validate input calendar/interval, no API bug. Screen requires nonblankworkCity, so speculative blank-city helper mismatch was NOT patched. No source/commit after368 or actualHTTP/Android/exploit proof for nextaudit. Needs fresh normative/source/contracts + coherent new regression/gates, NOT a blind retry of existing failure.

---
## Historical preparation — superseded ONLY by actual results above
## Functional correction / gates pending
Base 3e098cd51cd2fd84f21e144a600a814a2cb1a150; HEAD 368aa313a2aa55ad269060bdde12b19cb7bd1465; tree 09bd6335ed6da6f0cf593b5523ac52b59cb076c0. Only chat/support date predicates change; no app UI/authority/transport/retry policy change. 17 new regressions baseline4PASS13FAIL→17PASS; 51 unchanged focal tests +17=68PASS; fullmobile782PASS / zero fail, skip or cancel. TZ America/Sao_Paulo68PASS. Real HTTP fixture JSON-to-current-helper parity is added, still PENDING primary CI.

Own CI expected1372=[145Web,782mobile,431API,3CLI,11monitor] and own standalone APK REQUIRED, NOT yet PASS. Post gates required on actual real merge. No ready/merge until justified fresh exactHEAD green; no blind retry product failure. Onlyarea10technical accepted; other12pending. No production/costs/providers/PSP/realmoney. Otherdrafts558/560/565 preserved.


## Conversa e suporte — integridade do calendário e ACK — ciclo funcional 2026-10-16 UTC

Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, após567 jáMERGED. README e originais completos recebidos de GitHub; todos os bytes anteriores dos5originais/matriz permanecem PREFIXO integral NO LUGAR, sem substituir documentos ou estados históricos por resumo. Recibo final567 integral abaixo consolida próprio+pós reais no ciclo funcional, não é resultado deste novo HEAD.

### Falha reproduzida e correção mínima
Conversa loadMessages aceitava createdAt impossível e apresentava READY; sendMessage aceitava mesmo ACK como SENT. SupportAcknowledgement aceitava createdAt impossível, createSupportSubmission real retornava CONFIRMED e store confirm/releaseConfirmed podia liberar a barreira pendente. Fixtures usam2026-02-30,2025-02-29-03:00,2026-04-31+02:00, que Date normaliza. Reproduzido nos módulos TypeScript REAIS com transportes/adapter in-memory explícitos, não alegação de data impossível armazenada noPostgres, incidente/exploit de produção ou SecureStore nativo.

Correção SOMENTE predicado date em apps/mobile/lib/conversation.ts e inclusão do mesmo predicado calendário já usado BYTE-IDÊNTICO pela Agenda em support-intent.ts, substituindo a condição createdAt doACK. Ler calendário inválido retornaERROR; ACK de conversa permaneceUNKNOWN depois de UMA chamada; suporte retornaUNKNOWN, mantém registro pending exatamente com mesma identidade/tenant/chave/payload; novo sendNew recuperaPENDING sem outra preparação/POST; releaseConfirmed recusa sem remover. Registro confirmado corrompido em disco falha fechado, não é apagado/substituído por política inventada. Calendários válidos/leapday2024/offset cruzandoUTC/epochzero strings exatas preservados; liberação explícita de confirmado válido permanece. Não alterar contrato de suporte geral nullassignment autorizado, autoridade por tenant/membership ou recuperação explícita.

17regressões novas em conversation-calendar.test.mjs(8),support-calendar.test.mjs(5),support-submission-calendar.test.mjs(4): baseline main4PASS/13FAIL→GREEN17/17.51testes existentes BYTE-IDÊNTICOS nesses3módulos +17=68/68PASS, inclusive TZ America/Sao_Paulo. Fullmobile782/782PASS local,0fail/skip/cancel (765anteriores+17); modelos/helpers reais≠renderReactNative/Android/SecureStore. Todo source fora2predicados/condição compare-substituível BYTE-IDÊNTICO. Requests/UUID/path/headers/body/tenant/sessão/foco/prazo15s/chaveidempotente/current/ordem/stat/ACK/no-autoretry/JSX/API/controllers/SQL/RLS/grants/eventos/mobiledesign/deps/lock/build/workflows/smoke preservados.

### Paridade com JSON HTTP/Postgres real — gate novo, ainda PENDENTE nesta preparação
scripts/mobile-chat-support-contract.cjs lê somente JSON já obtido pelas fixtures locais existentes: real POST+GET de conversa e replayACK de suporte apósreview. NativeTSstrip carrega helpers atuais; conversa valida lista/ACK e suporte stage/confirm/restart/read/release em adapter in-memory. Duas invocações adicionadas aosHTTPscripts, TODOS asserts/chamadas HTTP anteriores intactos; nenhuma nova chamadaHTTP/SQL, nenhumPOST adicional, alteração de grant/policy/status/body/tenant/auth. Gate exige CI e configAPIPG exatoslocalhost via helper localConfiguration existente; script não acessa banco/rede/credencial, não recebe bearer. Marcadores MOBILE_CHAT_REAL_JSON_PASS eMOBILE_SUPPORT_REAL_JSON_PASS só podem ser aceitos após logs primários novos, não resultados locais simulados/antecipados. Não conta marcadores como novos testes unitários nem prova de tela ou SecureStore.

### Evidência histórica567 persistida com origem própria
DezPNGs Web de567(5OWN+5POST) +PR567_OWN_POST_CHAT_SUPPORT_CYCLE_PROVENANCE.json persistidos neste ciclo sobdocs/evidencias/web-browser-2026-10-16/, comsignature/SHA256/bytes/1365x900 conferidos independentemente, fonteprimáriajobs116937140753/116942544994. OWNsourcehead3a66/checkout42ffcSINTÉTICO[f98,3a66]/tree66f89c/run38890073248attempt1SUCCESS; POSTcheckoutLITERAL3e/run38891514441attempt2SUCCESS. Não são frames deste novoHEAD nem Android. Recibo567 separaAPKindividual≠ZIP; nenhuma prova567 é emprestada para aceitar candidato/565/558/560.

### Gates e limites atuais
OWNCI esperado1372=[145Web,782mobile,431API,3CLI,11monitor], APKstandaloneOWN obrigatório por mobilealterado, ambos AINDA PENDENTES neste apêndice preparação; pósCI/APK no mergeREAL também obrigatórios. Não ready/merge sem ambos própriosGREEN e revisão/expectedSHAfresh, não rerun falhaproduto para verde. Preservar f98/3e/567históricos, não repetir merges. Navegador/CORS/Fetchguard/sandbox/LNA/permissões/deadlines inalterados; causa antigaERR_ABORTED e startup permaneceUNRESOLVED apesar567GREEN.
Somente área10Androidstandalone TÉCNICOINTERNO aceita; outras12pendentes. Esta correção e paridadeJSON não aceitam integralmenteárea9/11 ounativeUI/taps/teclado/loginválido/SecureStore/físico/piloto/VisualTruth. Externos215/219/220/224/228OPEN;565aa0/558879/560e47DRAFTFAIL separados. Semprodução/serviços/custos/credenciais/contratos/provider/PSP/dinheiroreal. #566fechada porgithub-actions[bot]comSHA3e/evento11:05:53Z/comment6214133831, semissuewritesmanuais/commitatividade. Manterrotinaúnicaenabled/scheduleinalterados; parcialnãoencerra13áreas. Datas deoutrosleitores ainda precisam auditoriafactual, não declarar todoscorrigidos.




## Integração normal MAIN A683 — conteúdo original ausente preservado por apêndice (2026-10-18)
---

## Importação integral de história divergente558a8 — 2026-10-18

FULLprefixomainpreservadoacima. O prefixo original de 118114 unidadesUTF16 é compartilhadoBYTEEXATO com fonte a8ba96517135f1f1d3851f78b001f8fee39ce447, caminho docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md. Prefixocomum+trechoINTEGRALabaixo reconstrói os 293679 caracteresUTF16dofonte558, semresumo. EstadoshistóricosNÃOresultadoCI desta novaentrega.

### 2026-10-15 — investigação funcional do reload Web pós-556 (preparação)

PR556 já merged em dd715c6573bcc6d6e5e3c749cc634e276db83ef0, tree90aec6eeb7e3e0cd8ee853e156c5fd5f9831d1b1, pais[d0754b848e5bb780d3f3707001b8c49b802fd0f5,078ebbc8977c61055100184ff91a0261f36a0d3e]. Próprio CI38751951403/job116480374661 SUCCESS1308/todos18steps + Chrome real com8checks/3capturas. Checkout próprio71d37062b330ff2b6759a797ce8fdc3bcd9620f1 é sintético com pais/tree equivalentes, não head literal. Pós38753142047/job116484484990 attempt1 FAILURE14:42:00Z ao recarregar painel:12seções falharam; OPTIONS204 não são ACK nem leitura concluída. Não é startup/ECR, não repetir merge ou rerun cego. Recibo parcial/falha no corpo556. Investigação instrumenta método, nomes de headers/CORS e erros de rede sem tokens/senhas, mantendo todos asserts e segurança. Hipótese CORS/cache do reload ainda NÃO comprovada. Aplicação/API/CORS/deps/lock/Android intactos. Capturas próprias556 são próprias, não pós. Evidência WEB_BROWSER_RELOAD_DIAGNOSTIC_2026-10-15.md. Este ciclo ainda PENDENTE, não aceite; só área10 técnica interna aceita,12semaceiteintegral,externos215/219/220/224/228 separados.


### 2026-10-15 — diagnóstico558: primeiro resultado medido e regressão intermitente

Head386e800747f378d98fa363a03d131afa7a33bf64/CI38754463700/job116489109517 attempt1SUCCESS1308+Chrome14:50:32.7732259Z, sem alterar aplicação/API/CORS. Isso NÃO determina causa nem reclassifica a falha pós556 como PASS. Teste agora exige5recargas consecutivas com mesmos assertions/cache/CORS/interceptação/sessão, não retry de falha; qualquer falha interrompe o gate. Preservados PNGs556 próprios/pós-falhos+manifesto no repositório comorigem/SHA/bytes/dimensões verificados, não atribuídos a558. Novocandidato/exactheadCI/pós aindaPENDENTES. Nenhum fix especulativo deproduto foi feito; causa eminvestigação. Somenteárea10aceita tecnicamente;12pendentes.


### 2026-10-15 —558 cinco recargas medidas, identidade de documento agora exigida

Headc2d61915167ac224eea6d743fb6e1864c51e66cd/CI38755422965/job116492445552 attempt1SUCCESS com5marcadores reloadPASS14:56:34.514Z..998Z e jornada real. Ainda não é causa resolvida do pós556falho. Os tempos curtos suscitam hipótese de DOMantigo; novo gate compara performance.timeOrigin antes/depois deCADA reload e exige documento diferente, sem aguardar/corrigir automaticamente neste estágio. Isso é regressão maisestrita, não prova prévia dahipótese. Se falhar, ler origem real registrada antesde fixdeharness. API/CORS/app/segurança intactos; CI novoHEAD PENDENTE,12áreaspendentes.


### 2026-10-15 —558 RED real das recargas e barreira candidata

Head7e707f40c64b3618558bc689c45f86965cd3dcaf/CI38756284006/job116495471903 attempt1FAILURE:1308unitPASS; reload1 mudou timeOrigin1792076542081.2→1792076544788 e passou15:02:25.136Z; reload2 falhouloaded-dashboard15:02:45.167Z. Diagnóstico primário registrou12GETnet::ERR_ABORTED/canceledtrue; nenhum corsErrorStatus, OPTIONSorigem explícita3001 e allowheadersanteriores. Não é prova deCORSrejeitado/defeitoproduto/vazamento. Sequência deharness não aguardava novo documento completo ANTESde lerDOM. CandidatareloadDocument aguardaperformance.timeOrigin diferente E document.readyStatecomplete antesdashboard;5hardreloads/mesmosasserts/timeout20000/logoutPOST201+401+outrasessão preservados.4novasregressões executam helpers REAIS viaVM commodelosdedocumento atrasado/mesmo/incompleto/errocomando:local4/4PASS, nãoChrome/typecheck. CI novoheadPENDENTE;contagensWeb135/total1312sãoprevisão atémedir. API/CORS/aplicação/deps/lock/Android intactos. Recibo556pósfalho permanecehistórico; não inventar correspondência causaltotal entre duasfalhas. Sóárea10técnicainterna aceita,12pendentes.


### 2026-10-15 —558 candidato barreira NÃO resolveu cancelamentos; diagnóstico adicional

Head40ab0c8017c3e79b43b1bf95e6363cd1d5961b25/CI38757186986/job116498594996attempt1FAILURE15:08:40.7178294Z created-team-rendered ANTESqualquerreload;1312unit[135,753,410,3,11]PASSzeroFAILSKIPCANCEL/typecheck/build/migrationsprivacyPASS,HTTPbrowserFAIL. TeamPOST201real;12GETposterioresnet::ERR_ABORTED/canceledtrue. Candidata barreira/modelos passouunitmasnãoexplicaestaoutrasfalhas. Não declarar causa resolvida/fix deproduto; não merge/reruncego. Novoheadinstrumenta Fetch.requestPaused+ACK/erroCDP(protocolcode/message apenas,semheaders/tokens),timestamp/loaderId/type,mainframe navigation; semdesativarinterceptação/CORS/sandbox oualterarapp. CI novocandidatoPENDENTE. Sóárea10técnicainternaaceita12pendentes.


### 2026-10-15 —558 rastreio não sustenta navegação ou recusa CDP como causa

Heada524edbf0a8d519eaca176ffceaf43adc97253a5/CI38758034590/job116501584200attempt1FAILURE15:14:43.5450645Z created-job-rendered ANTESreload;1312unitPASS. Tracerealm:ZEROintercept-error,ZEROsessionmismatch,todascontinueACKobservadas,UMAmain-documentnavegaçãoinicialapenas;12GETabortadosmesmoloader. Isso não prova causasugeridaanteriorderecarregamento/CORS/CDPerror. NovoheadpreservaFAILeimprimeSOMENTEmétodo/path/status/timing/reqId doAPIfixture dedicadoemcasofalha,semheaders/body/tokens/senhas/query/credenciais. NãoalteraAPI/CORS/app,skip/retrysegurança. Wrappermantémexit1sefalhou,trapcleanupigual. CI novoheadPENDENTE,nãoPASS;nãomergerdraft/repita556merge/reruncego. Barreiraéintegridadedoteste,cancelamentoscontinuamSEMcauseconfirmada;12áreasnãoaceitas.


### 2026-10-15 —558 recibo real head e32 e observação nativa candidata

Main continua dd715c6573bcc6d6e5e3c749cc634e276db83ef0;556jámergedpósFAIL,nãorepetir. CI38758878368head e32e8f2aee1c77b40e84973bc886c3ab2ad64d2b attempt1/job116504528610 falhouANTEScheckoutECRtoomanyrequests,produtosSKIPPED;umúnicoretrydejobfalhomesmoSHAapósconclusão. Attempt2/job116505547703FAILURE:1312unitPASS[135,753,410,3,11],cincohardreloadstimeOriginsdistintosPASS15:21:20Z eAPIleiturasA200 reais;POSTsignout201/signinB201 reais;painelBfalhouloaded-dashboard15:21:40.7693790Z. Servermetadata recebeu12OPTIONSB204masNENHUMGETseguinte;browserGETcancelados. Não éPASSnemcausadeproduto/CORS/CDP/navigationcomprovada;documentobarrierpassounãoreparaestecomportamento. Semnovo retrycego/merge/ready.

Candidatofuncional558instrumentaerrosnativosLog.network+responseExtraCORSepassthroughfetchviaRuntime.bindingCalled,semleituras/clonesdecorpo,semheaders/token/body/query e semmutarargumentos/resposta/Promiseoriginais. Messageerror sóallowlistgenéricaconhecida,demaisredigidas;LogURLssemquery/userinfo eBearerredigido.4regressõesnovas+4originaishelpersreaisVM:local8/8PASS(modelos,nãoChrome/typecheck). API/CORS/layout/lock/deps/Android/egress/sandbox/timeouts/assertsinalterados;5recargas+todasleituras+signoutPOST201/revocation401+outrasessão200continuamexigidas. CIexact-headpróximoPENDENTE;Web139/total1316sóprevisãoatémedir. Capturas556/manifestopreservados. Sóárea10aceitetécnicointerno,12semaceiteintegral;externos215/219/220/224/228OPEN. Evidência WEB_BROWSER_RELOAD_DIAGNOSTIC_2026-10-15.md.


### 2026-10-15 —558 head instrumentado green medido; ampliada jornada de refresh explícito

Head3afbd79b293f0af031d98ff698a2a61f88272045/CI38780501516/job116579142286 attempt1SUCCESS1316=[139Web,753mobile,410API,3CLI,11monitor],todos18steps/typecheck/build/export/migrationsprivacy/HTTPPostgres/ProductionTruth17:54:11.6227914Z. Checkout738e7003e9c331ebfc0d9a4edc3a5eb64de25838SINTÉTICOpais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,3afbd79b293f0af031d98ff698a2a61f88272045]treefaa7f713219331a2e988199a2199a1c7e44c13d3equivalente,nãoheadliteral. BrowserPASS17:53:06.5636995Z8checksreais,5reloadsnovaorigem,logoutPOST201/bearer401/outrasessão200/Bisolado;3capturas1365x900declaradaslogprimário,nãoatribuídasamain. OwnpassNÃOexplicacausa intermitentedosheads anteriores,nãoreclassificapost556nemfecha13áreas.

Próximocandidato558 amplia5cliquesHUMANOSsimulados explícitosbuttonAtualizardados. Cadaondaexige12GET200distintosAPÓSclique+DOMpainelválido/vagapersistida/zeroPOSTadicional;OPTIONS204/leiturasantigasnãoPASS. NÃOretrydefalha:qualquerondafalha encerra gate. Mantidos5hardreloads+sessão/signout/isolamento/assertsoriginais,timeout20000/CORS/Fetchguard/sandbox. Browser.getVersionrealregistraráproduct/protocol/JS/revisionsemcredenciais.2modelosnovosbarreiradeondaleitura+8originais:10/10localPASS,nãoChrome/typecheck;CIexactheadpróximoPENDENTE,Web141/total1318apenasprevisão. Semmudançanaaplicação/API/SQL/layout/deps/lock/Android. Somenteárea10técnicainternaaceita12pendentes;causacancelamentosanterioraindanãoresolvida,nãomergediagnósticoapenasporumgreen.


## Matriz controlada de observadores do navegador — PR #558 — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Main revalidada `dd715c6573bcc6d6e5e3c749cc634e276db83ef0`; pós-merge #556 run38753142047/job116484484990 permanece FAILURE, não repetido nem convertido em verde. PR558 continua DRAFT, não integrado. Falhas anteriores incluem cancelamentos antes de qualquer reload; não há causa demonstrada em CORS, aplicação, CDP session/continue ou troca de imagem. A issue559 do Activity Watch é alerta automático de ausência de commit na main, não prova de agente parado; sem escrita manual no alerta nem commit de atividade.

Recibo FINAL do head anterior `aab5b8f2ab971cf8969b99b04eb005a64b774f91`: own CI38781696446/job116583255788 attempt1 SUCCESS;1318=[141Web,753mobile,410API,3CLI,11monitor], todos18steps, zeroFAIL/SKIP/CANCEL. Checkout6126ceee433bfa2cb6ec18f06e6d2bca25114836 SINTÉTICO, pais ordenados[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,aab5b8f2ab971cf8969b99b04eb005a64b774f91], árvore de4efe3c121fa7ccd33b68bc35530e00a6a325d5 idêntica à candidata. Browser Chrome155.0.8059.39;5refreshes explícitos com12GET200 novos por ação e5hardreloads de documento novo/complete,9checks de UI/API/PG PASS; logout POST201, bearer real401 e outra sessão da MESMA identidade200, empresa B isolada. ProductionTruth18:02:33.5034753Z. Não é recibo pós-merge558. Capturas próprias aab em docs/evidencias/web-browser-2026-10-15/ com manifesto separado; não atribuir screenshots556 ou aab a novo HEAD.

Novo trabalho FUNCIONAL: matriz fatorial baseline (sem observador fetch nativo e sem Log), log-only, native-only, instrumented. Cada caso cria perfil Chrome e duas identidades/tenants descartáveis novos, registra versão literal e executa TODOS os mesmos gates de jornada,5refreshes e5hardreloads. Permanecem Fetch-egressguard/local-only, CORS, sandbox, auth/DOM/ACK, cache no-store e todos os prazos; nenhuma mudança app/API/SQL/UI/deps/lock/Android/workflows. Só os DOIS observadores passivos variam. Não são retries: todo caso falho fica FAIL e o agregador termina não-zero mesmo com sucesso de caso seguinte; continuar controles distintos serve à comparação, não apaga falha. A identidade da Promise nativa foi preservada, mas seus handlers podem mudar timing: HIPÓTESE, não causa/remédio comprovados.

Quatro regressões novas executam configuração REAL e agregador shell REAL com executável child simulado offline; rejeitam nomes desconhecidos/herdados e provam retenção de falha após casos posteriores verdes.14/14 modelos locais PASS e node--check/bash-n PASS; isso não é Chrome/typecheck. CI completo do NOVO HEAD e matriz REAL estão PENDENTES na preparação; não emprestar1318/verde do aab. Nenhuma correção de produto reivindicada; permanecer DRAFT sem explicação causal demonstrada. APK N/A condicionado à identidade INTEGRAL mobile/native/deps/lock/workflows/build/smoke e grafo canônico, não por ausência de runs. Somente área10 tem aceite técnico interno;12outras sem aceite integral; desktop/fixtures não são Android/físico/VisualTruth/SecureStore/piloto. Externos215/219/220/224/228 separados; sem produção/custos/credenciais/contratos/PSP/dinheiro real. Histórico completo preservado por apêndice.


## Reprodução controlada e redução de transporte — PR #558 — 2026-10-15

Resultado REAL do head690154ae25b1872994db39f0703d47cda03d1f0f/tree9326c8b03ca4718227b5e96c7eb73fb55a783c27: CI38789034434 attempt2/job116609063762 FAILURE.1322unit=[145Web,753mobile,410API,3CLI,11monitor] todosPASS/FAILSKIPCANCEL0;typecheck/build/export/migrationrunner2x/privacyPASS,HTTP/browserFAIL e ProductionTruth posterior NÃOexecutado. Attempt1/job116608466677 falhouANTEScheckout ECRtoomanyrequests/Data limit exceeded;EXATAMENTE1retrylimitadojobfalhomesmoHEAD resolveuinfra, NÃO repetir produtoFAIL. Checkout c84c53b7b913f2c3879ac1b9024f88a198161960 SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,690154ae25b1872994db39f0703d47cda03d1f0f] árvore9326...equivalente, nãoheadliteral.

Matriz REAL, TODOS Chrome155.0.8059.39/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34/runner20261012.334.1: baseline FAIL createdteam18:56:06Z e log-only FAIL createdteam18:56:27Z,1POST de equipe net::ERR_ABORTED/canceledtrue em cada; OPTIONS204real antes, sem POST da equipe no logAPI observado. UI exibiu publicação não confirmada, não sucesso. native-only PASS9checks reais+5refreshes+5hardreloads18:56:31Z,logoutPOST201/bearer401/outraMESMAidentidade200/isolamentoB. instrumented FAIL painel inicial18:56:52Z,12GETabortados e12rejeições NATIVAS TypeError/Failed to fetch;API log no intervalo recebeu preflight, sem GETs correspondentes. Zerointercept-error/sessãomismatch observados. O agregado terminoustatus1 apesar de um caso PASS: nenhuma falha foi apagada. Resultado refuta a suficiência de manter observador nativo/Log ligados para evitar cancelamentos; NÃO prova causa universal no observador, React, CORS, Chrome ou API. Causa permanece NÃO demonstrada; não alterar produto nem merge/ready/reruncego. Screenshots próprios690 por caso/manifesto preservados separados dos556/aab. Capturasbaseline e instrumented de falha visualmente inspecionadas; screenshots não são causa/exploit nem aceitesAndroid.

Nova redução FUNCIONAL: matriz2cenários×4observadores (8casos) com perfis+fixtures separados. Cenário minimal carrega documento HTML explicitamente INJETADO só em GET Document /__mlivre_transport_fixture na origemWeblocalhost exata, sem scripts React/Next; mantém a MESMA origem CORS real, Fetchguard bloqueia todoegressexterno. Dentro desse documento, fetch NATIVO usa headersreais/GETcache:no-store; exige GETJSONsingular200,12GETJSONparalelos200,UMPOSTequipe201 com id,GET da equipe criada e12GETJSONparalelos200; API/PostgresREAL depois confirma persistência. Qualquer estágio falho fica FAIL sem retryPOST; metadados não incluem headersvalores/body/token/senha. Cenário journey preserva TODOS gatesWeb anteriores; minimal NÃO é UI/VisualTruth. Cada caso registra versão literal; agregado falha se QUALQUER caso falhar. Não há disableFetch/CORS/sandbox/cache/timeout/autorização/asserts, nem mudanças API/SQL/JSX/CSS/Android/deps/lock/workflows.

Corrigida atribuição do diagnóstico servidor: o snapshot anterior era janela compartilhada last300; não presumir todas as linhas como sendo do caso rotulado. Novo wrapper usa OFFSET de BYTES do logAPI antes de cada caso e sanitiza só seu intervalo, ainda method/path/status/timing/reqId sem query/header/body. Regressão REAL do formatador prova isolamento inclusive prefixoUTF8multibyte e redação de segredos. Cinco novosmodelos (cenários,documento restrito,transporteACK/cache,POSTrejeitado semretry,janela bytes) e agregadorfortalecido8casos:19/19localPASS/node--check/bash-nPASS; nãoChrome/typecheck. NovoCIexactheadPENDENTE, qualquer contagemnova é previsão até medir. Consulta primária Fetch CDP: https://chromedevtools.github.io/devtools-protocol/tot/Fetch/ ; sem atribuir a documentação uma causa deste incidente.

Main permanece dd715c6573bcc6d6e5e3c749cc634e276db83ef0 pós556FAIL; PR558DRAFT/nãointegrado,sem pósgates558. Somenteárea10aceitetécnicointerno,outras12semaceiteintegral; áreas1/4/11/13ganham cobertura diagnóstica mas não aceites. APK N/A condicionado à identidade INTEGRAL dosinsumos/grafo Android, não por[]/APKemprestado. Externos215/219/220/224/228separados,559alertabotnãoeditado,nãoéprovaagenteparado. Sem produção/custos/serviços/credenciais/contratos/PSP/dinheiroreal. Preparação de loading/503 parcial em r10 é SOMENTELOCAL, não publicada/testadaemChrome; não alegar resultado. Histórico/documentosoriginaispreservados integralmente por apêndice.


## Fixture mínima HTTP real, sem contornar LNA — PR #558 — 2026-10-15

Recibo FINAL headbc3d1654839781433d9f832dac370bd2fd502aca/tree7e946e889a38b060f18ec04893971fc40e4c621d: CI38790924626/job116614947907 attempt1 FAILURE, semreruns.1327unit=[150Web,753mobile,410API,3CLI,11monitor]PASS/FAILSKIPCANCEL0;typecheck/build/export/migrations/privacyPASS,HTTP/browserFAIL,ProductionTruthposteriorNÃOexecutado. Checkout3760f08faba19db515665ff9f5e1d5dc3cfd4236 SINTÉTICO pais[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,bc3d1654839781433d9f832dac370bd2fd502aca], árvore7e946...igual,nãoHEADliteral.31paths/11UTF8+9PNGnovosreadback/prefixos6histórias/483não-docfora2harnessidênticos comprovados;APK N/AporidentidadeintegralgrafoAndroid.

Resultados REAIS8casos: minimal/baseline e minimal/log-only falharam startup15s19:08:01Z/19:08:16Z,semversãoliteral/SÓstderrdbusobservado,nãocausacomprovada;nãoretry/extensãodeprazo/sandboxbypass. minimal/native-only e minimal/instrumented falharam primeiroGETcom TypeError19:08:27Z/19:08:28Z,mas diagnóstico é **ERR_BLOCKED_BY_LOCAL_NETWORK_ACCESS_CHECKS / LocalNetworkAccessPermissionDenied**, canceled=false, distinto de ERR_ABORTED/canceled=true das jornadas. A página INJETADA não é controle válido para atribuir a falha original a foraReact. NÃO confundir as duas classes nem alegar que LNA explica o incidente anterior. Nenhuma permissão foi concedida/override utilizado. journey/baseline passou5refreshes/formuláriosreais,masfalhoupainelna primeira recarga19:08:54Z;journey/log-only e journey/native-only PASS9checks+5refresh+5reload19:08:57Z/19:09:00Z,logoutPOST201,bearer401/outraMESMAidentity200/Bisolado;journey/instrumented falhoupainelinicial19:09:21Z com12GETabortados. Todos6browsersqueiniciaramregistraramChrome155.0.8059.39;2startupnãoobservaramversão. Agregadostatus1,nenhumPASSemprestado. UmInvalidInterceptionId(-32602)observadoapósosabortos (~18ms),não prova causa. Treze capturas bc3 e manifesto próprio preservados; não são capturas do novoHEAD.

Correção FUNCIONAL da fixture (não da aplicação/cancelamentooriginal): parar uso de Fetch.fulfillRequest no documento mínimo. Wrapper cria EXCLUSIVAMENTE (`wx`,nãosobrescreve) arquivo temporário apps/web/public/__mlivre_transport_fixture.html ANTESbuild; NextlocalhostREALserveHTTP,cleanupremoveSÓarquivo própriocriadonesteprocesso. Arquivo NÃO é adicionado aoGit/produto/distribuição/deploy; HTMLsem scripts,API/PGcontinuamreais. Driver exige resposta200 com remoteIPAddressLOOPBACK,semcache/SW,zero scripts e isSecureContexttrue. Não há grantBrowserPermissions,featuredisable,sandbox/websecurity/CORS/cache/auth/timeoutsalterados,IPaddressspaceoverrideouheadersPNAinventados. É o contexto de rede legítimo do servidorlocalhost já solicitado, não autorização nova nem desativação da proteçãoLNA. Se contexto legítimo ainda negar acesso, manterFAIL e parar esse caminho sembypass.

Passam a ser registrados SOMENTE campos primitivos clientSecurityState/IPaddressspace/policy e resourceIPAddressSpace do CDP, semheadersdeautenticação/tokens/senhas/query/body.8casos/freshfixtures/egressguard/ACK/JSON/persistência/5refreshes+5reloadsjornadas/exitsticky permanecem. ModelovalidadoragorarejeitadocumentossemTCPloopback,cache/SW/statusnão200;regressãocriadorrealexige wx,não scripts e EEXISTpropagado.20/20modeloslocais/node--check/bash-nPASS,nãoChrome/typecheck. NovoCIexactheadPENDENTE,sememprestar1327ouPASSdoscasosisolados. Referênciasprimárias: https://chromedevtools.github.io/devtools-protocol/tot/Network/ e https://developer.chrome.com/blog/local-network-access . Fontesdocumentamcontextosecampos,nãoprovamcausadocancelamento.

Maincontinua dd715c6573bcc6d6e5e3c749cc634e276db83ef0,pós556FAILnão repetido;PR558DRAFT/semmerge/pós558inexistente.CausaintermitenteoriginalsegueNÃOdemonstrada.Somenteárea10aceitetécnicointerno,12pendentes. Auditoriaindependenteleu DatabaseService/NotificationsController eHTTPmulti-company:isolamento/UUID/ACKreadreplay/unreadcontadoremHTTPexistem;triggerdefalhanotificationINSERT/rollbackrealnos3fluxosaindanãoimplementado. Preferirprovaespecíficadeatomicidadea inventaroutbox/provider/retry. r10partial503/loading/recoverycontinuaLOCAL/semPR/semChrome.Externos215/219/220/224/228separados;559alertabotnãoeditado.Semprodução/custos/credenciais/contratos/PSP/dinheiroreal.Históricointegralpreservadoporapêndice;recibofinaldestaCIseráconsolidadopróximocicloFUNCIONAL,semcommitmetadadosautorreferente.


---

## Histórico integral incorporado da main429dc desde a base comumdd715 (apêndice sem alteração de bytes)


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

## Ciclo funcional — 2026-10-16 UTC — continuação CDP serial vs concorrente, sem mudar fetch da aplicação

### Estado revalidado e recibos finais anteriores

Main real429dcba6287e95ca4e804d9452a2e7c0b21fedd8/treec0fb1ba376cb5a7d6089601f7ac4a2910b8149ca/pais ordenados[dd715c6573bcc6d6e5e3c749cc634e276db83ef0,b23c2de96a8e51ea75159bbc8faf23668928ef75]. PR561 já MERGED, não repetir ready/merge/rerun. Own561b23 CI38837907503/job116771049592 attempt1 SUCCESS1322=[145Web,753mobile,410API,3CLI,11monitor], todos18steps/HTTPPG/ProductionTruth02:02:37.1364963Z; checkout1eeca41e434d142b848f7ecada1eb04dcdf2c54b sintético[dd715,b23]/treeigual, não HEADliteral. Browser real155.0.8059.39/503consumido+11GET200/recuperaçãohumana12GET200/8jornadas PASS próprio. O pós561 CI38838523471 attempt2/job116773347723 é FAILURE:1322unitPASS/typecheck/build/export/migrationsrunner2x/privacyPASS, HTTP/browserFAIL02:09:06.6059683Z após teamPOST201/12GETERR_ABORTED/canceledtrue/corsnull; PostSetupNodeSKIPPED/ProductionTruthposteriorNÃOexecutado. Checkoutliteral429dc02:06:05.5752710Z. Attempt1/job116772970771 ECRquotaANTEScheckout→exatamenteUMretrydejobfalhomesmoSHA resolveuINFRA; attempt2browserFAILnão repetido. Unknown—/indisponível/rates— corretos no DOM, mas jornadas/503/recovery/reload/logout/B não completadas no pós. OwnPASS não é pósPASS.

PR560 DRAFT/NOTMERGED e47ca8af5267e29716e934ce86b29df31fa7f783/treed6b1bb1fdd6401cb4c44f29848015bf1998b61ed/base429dc; pais de integração[b421f2f21fc9c6a96a58172436aeeb843abd93fb,429dc]. CI38838893368 attempt2/job116774688695 FAILURE1327=[145,753,415,3,11]unitPASS/zeroFAILSKIPCANCEL/typecheckbuildexportmigrationsprivacyPASS; HTTP/browserFAIL02:14:11.0425070Z/ProductionTruthposteriorNÃOexecutado. Attempt1/job116774151028 ECRquotaANTEScheckout→UMretryfalhoMESMOSHA, não repetirFAILproduto. Checkout528ac670f865cbca05feeee360b9411458f82af2 sintético[429dc,e47]/treeigual. TODOS5HTTPPGrollbackPASS02:13:14.2132110Z..5137370Z (confirm/chatnovo/chatexistente/segundodestinatário/replacement), witness1ou2/ambosalertasvistosanteserro e rollback integral2tenants/foreignunchanged/cleanup/grantsRLSimutáveis;4fasespositivasACK/persist/replay/membership/inboxes/replacementPASS. Não prova provider/outbox/push/entrega/retry. Browseractual155.0.8059.39 inicialteam/job/renderPASS, mas fault503CDPaccepted não é503consumido;12GETERR_ABORTED/canceledtrue/corsnull interromperam partial/recovery/reload/logout/B. Nenhumdefeitotransacionalinventado/nãomerge560/nãoreruncego.

### Variável controlada nova; causa ainda não demonstrada

55848a CI38792613152/job116620750043 FAILURE1328unitPASS,8casos4PASS4FAIL, mínimoHTTPloopbacksemReact reproduziu12nativeGETERR_ABORTED; casos têm provenance distinta, não produção nem causaChromium/CORS/API demonstrada. A nova comparação mantém os oito controles anteriores e acrescenta quatro controles mínimos com ACKs CDP serializados (baseline/log-only/native-only/instrumented). Os12GET nativos da aplicação permanecem Promise.all, com mesmos headers/cache/auth/JSON/ACK/teamPG/CORS/Fetchegressguard/sandbox/deadlines. Só o despacho de Fetch.continueRequest/Fetch.failRequest pelo harness espera o ACK anterior no modo serial; sem repetir comando ou requisição. Falha de continuação agora propaga reprovação sticky e registra apenas código numérico, nunca mensagem potencialmente sensível. Redirecionamentos observados registram somente status/origin/path sem query; ausência de redirect não é presumida. A hipótese de colisão em preflight+redirect não foi demonstrada nos nossos traces, nenhum workaround de produto/featureflag/imagem/browser/security foi adotado.

Driver histórico de558 é preservado como scripts/web-browser-transport-probe.cjs. Driver principal de561 permanece BYTE-IDÊNTICO ao main429dc; sua jornada503/loading/11leituras/recoveryhumana/POSTdesdeENVIO/logoutPOST201+browser401/outraMESMAidentity200/Bisolado é executada adicionalmente e obrigatória. Matriz12controles+jornadamain: qualquerFAIL permanece exit1, nenhum PASS substitui falha; casos independentes não são retry de negócio. Browser.getVersion é medido em cada processo que iniciar; startup15s mantém helper estruturado real de561/mesmasflags/guardas, sem interpretarstdout/portfilecomo readiness. Perfis/contas/tenants frescos, API/PGlocalhost, nenhuma produção/credencialpessoal/serviço novo. O arquivoHTTPmínimo é criado wx e removido somente se próprio, nunca commitado em public.

25modeloslocais executamhelpersREAIS e wrapperreal com executávelfixture:4novosdispatch concorrente/serial/errosemretry/policyestrita,1novogatejornadamainobrigatória,20anteriorespreservadoscomproveniêncianovocaminho. Nodecheck/bash-n PASS, não TypeScriptCI/Chrome/PG/render. CI do novoHEAD ainda PENDENTE ao preparar este apêndice; não emprestar contagens ou PASS antigos.

### Preservação e limites

Integração normal de main429dc no ramo558 com dois pais, sem force. Documentos558 mantêm prefixo integral e recebem, por apêndice, todos os bytes do delta documentalmain desde a base comumdd715; ambaslinhashistóricas são preservadas sem substituir originais por resumos. Código/app/SQL/mobile/native/deps/lock/workflows/build/smoke do main permanecem idênticos; somente harness/teste/evidências/docs deste diagnóstico mudam. Capturas primárias pós561FAIL e own560e47FAIL são persistidas com manifestos de SHA/head/checkout/tree/run/job/resultFAILURE, bytes/SHA256/dimensões1365x900 conferidos; não são frames do novo558. Nenhumcommit sómetadados/imagens.

Somente área10 Androidstandalone tem aceite TÉCNICO INTERNO;12outraspendentes. APK N/A exige identidade integral de insumos/grafoAndroid, não[]/ausênciarun/APKemprestado. Mobileprincipal/React19.1.4/RN0.81.6/lock/RLS/desenhocanônico preservados. Webdesktopfixture não Android/físico/SecureStore/VisualTruth/piloto. Externos215/219/220/224/228 OPEN, sem custos/produção/contratos/PSP/dinheiroreal. PR558 segueDRAFT enquanto causa não comprovada, mesmo se casosisoladosPASS. Watchpost56138838523472/job116772971196 SUCCESS02:04:32.0338059Z429dcage0;559comentado6206385849pelobot02:04:32Z e fechadobot02:04:33Z, sem escrita manual. Não criar commitdeatividade.


---

## Importação integral de delta normativo divergente — fonte57185 — 2026-10-18

Todo prefixo deste arquivo na branch558879 está preservado acima. O prefixo de 118114 unidadesUTF16 é compartilhadoBYTEEXATO com fonte57185; concatenação desse prefixo original com o trecho importado abaixo reconstrói INTEGRALMENTE a fonte57185 (229440 unidadesUTF16). FonteGit85e9c992b6e7a1568b8ea865e43da63477c5f3a0, caminhoinalterado. Não é estadoCI desta558 nem substituição porresumo.

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


## Cronologia de segurança, recursos e exceções — preparação de reprodução — 2026-10-16 UTC

Escopo exclusivo MLIVRETRABALHO. Main fresca a699fd0f26d12ba604cc5110e507adf231f120e1/treec73498cf7932994d4847b3a3b28ef80a6b36f869. Código atual SafetyCasesController.mine e SafetyAppealsController.mine agregam slices tenant e ordenam String(Date).localeCompare DESC; SupportController.exceptions prioriza overdue e ordena String(Date).localeCompare ASC. Probe LOCAL com classes reais NativeTSstrip+VM e fixtures explícitas DB/auth/Date reproduz três ordens incorretas (14quarta/15quinta outubro2026), NÃO HTTP/PG/produção/exploit. Nenhum defeito de autorização, política SLA ou evento demonstrado.

Nova fixture scripts/safety-support-chronology-e2e.cjs exige as guardas CI/localConfiguration/peerLoopback/bancoEXATOmlivretrabalho_http já existentes563, carrega pg somente após validar origem e banco, cria contas/associações por signup/profile/availability/job/interest/confirm reais, cria relatos/recursos/suporte via HTTP. Vínculos completos tenant+identity+assignment+parent+marcador conferidos no PG ANTES de mudar apenas created_at de SEIS registros novos próprios; nunca eventos, grants, RLS ou histórico anterior. App_runtime continua sem UPDATE/DELETE em appeals/events. Revisão humana real de recurso + repeat changedfalse/eventoúnico, slices de cada tenant/outsider401/professional403/admincross401, prioridades overdue/recente e snapshots tabelas/policies/ACLs fazem parte dos gates. Admin DML é fixture efêmera, NÃO nova capacidade runtime nem reescrita de histórico de usuário. Sem serviços/custos/produção/provider/PSP/dinheiroreal. Nenhuma migração/dependência/lock/Android/browser/security alterada. Fixture roda ANTES do browser original, mantendo todos asserts originais. Primeiro CI desta preparação ainda PENDENTE, não há RED HTTP, fix ou PASS publicado desta hipótese.

### Recibo final563 consolidado neste ciclo funcional

#563 jáMERGED, NÃO ready/merge/rerun. Head dad8c7d0b412cd833428e9657588043a3168be62; main/mergea699fd0f26d12ba604cc5110e507adf231f120e1/treec73498cf7932994d4847b3a3b28ef80a6b36f869/paisordenados[429dcba6287e95ca4e804d9452a2e7c0b21fedd8,dad8c7d0b412cd833428e9657588043a3168be62]. Own38853511354/job116819752463attempt1SUCCESS1335=[145Web,753mobile,423API,3CLI,11monitor],zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth05:04:55.2998589Z. Checkout4ea1971e4833a10da26373f850ca2a6aee6be56b SINTÉTICO[429dc,dad8]treeigual,nãoHEADliteral. POST38854119764/job116821643560attempt1SUCCESS1335/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth05:11:43.2603463Z; checkoutLITERALa69905:07:33.9226647Z. Zero retries.

3ordens reaisHTTP/PG e Dateobjects comprovadosRED50(run38853092004/job116818434421)→OWN05:03:08.0911572Z→POST05:09:57.8697266Z(PROFESSIONAL_CHRONOLOGY_PASS). Loaders mobile reais recebemJSONreal e preservamordem, nãoAndroidrender. Own+POSTChrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34 passaram503fixtureconsumido/11GET200outros/refreshHUMANO12GETnovos/team1/zeroPOSTextra e8jornadas, logoutACTUALPOST201/notOPTIONS204/browserbearer401+outrasessãoMESMAidentity200/Bisolado. Ownmarkers05:03:45.1905639Z/05:03:45.8042518Z; POST05:10:36.8402689Z/05:10:37.4576642Z. Não causa/remédio doERR_ABORTED anterior,558continuaDRAFT. APKN/A563 poridentidadeINTEGRALmobile/native/shared/rootdeps/lock/workflows/build/smoke+grafocanônico, NÃO[]/APKemprestado. ÚltimoAPK542SHA63340145d7688ac08f161be8db418d789e81ec89 nãoé563.

Recibo completo PRbody563 gravado/re-lido exato11035chars; fontes primárias jobs acima recuperadas novamente neste ciclo. DezPNGs OWN+POST563 serão preservados comproveniência própria no ciclo funcional, nãoframesdesta nova hipótese. Cincooriginais+matriz/históriaINTEGRAL preservados porapêndice. Errata explícita: antigo'588DRAFT' significa558 (nãoPR588observado/criado); marcadorprimário éPROFESSIONAL_CHRONOLOGY_PG_TYPES (nãoPROFESSSIONALtripleS).

ActivityWatch38854119812/job116821643905SUCCESSPUSH05:07:22.8856593Za699age0/openPR2/active1; issue562fechada05:07:23Zgithub-actions[bot]/comment6208529784comSHAa699, semissuewrite manual. FreshOPEN558head879/560heade47 DRAFTFAIL+externos215219220224228. Não emprestar563PASSaeles/não reruncego. Somenteárea10AndroidstandaloneTÉCNICOINTERNOaceita,12pendentes; esta investigação nãoaceitaáreas8/11integraisnem13áreas. Rotina única existenteenabled/scheduleinalterados; não criar/desativar porparcial. CIProductionTruthlocal nãoédeployprodução. Gates próprios e pós-merge da nova fatia só se justificada+GREEN/reviewdiffbytesmodestreeparents/mainbaseheadfrescos+EXPECTEDSHAúnico.


## RED HTTP/Postgres real e correção candidata — PR564 — 2026-10-16 UTC

HEAD de reprodução0d8d8a469f6f2979da4c54211bdea19fc4e64619/treecd6a95c5e63dfed69471ec528aaad396aec9e76f/parenta699. OwnCI38858060780/job116833876085attempt1COMPLETEFAILURE,zero retries.1335unitanteriores=[145Web,753mobile,423API,3CLI,11monitor]PASS/zeroFAILSKIPCANCEL/typecheckbuildexportmigrationsrunner2xprivacyPASS. HTTPfalhouNA NOVA REGRESSÃO, nãoChrome/ECR. Browser eProductionTruthposterior NÃOexecutados, PostSetupNodeskipped. Primary05:54:45.2974558Zguardabancocontextoclient::1;05:54:45.6934736ZactualpgDateObjects=true(3campos). CasosA8a36f981-e567-4be0-a37a-38575e95ce4f/B7497be81-7d46-482b-a8d9-5bec89f74b83, recursosA7ee274f0-b936-4a1b-b165-879f1583fee0/B8b55f336-b493-4867-a08a-9b726a68a40a, suporteA0d6ee73d-94e7-410e-b648-4e5e7562c665. Datas14quarta/15quintaOct2026.

05:54:45.7298221Zsafety-casesrealHTTPesperado[B,A],retornou[A,B].05:54:45.7300991Zsafety-appealsesperado[B,A],retornou[A,B].05:54:45.7303874Zexceptionsesperado[caseA,supportA,recenturgent004f27f1-eec5-4f5c-adc1-870b9d8e4904],retornou[supportA,caseA,recenturgent]. Todos3pass=false; agregadoerro05:54:45.7331563Z. Controles executadosantesdasassertsordem: snapshots5tabelas/2tenants/eventosimutáveis/policiesACLiguais, recursoHTTPreviewing+replaychangedfalse/atorreal, overdueTRUE/urgentrecenteFALSE, scopedtenant/outsider401/professional403/crossadmin401. NãoéHTTPexploit/vazamento/CORS/incidenteprodução; apenasordemdefatosnaAPIefêmera.

Correção candidata SOMENTEimport+expressãocomparadora em SafetyCasesController.mine/SafetyAppealsController.mine(DESCcreatedAt) e SupportController.exceptions(ASCcreatedAtDEPOISdoMESMOpredicadooverdue). Reutiliza compareTimestamp de563inalterado, semSQL/DTO/projeções/parâmetros/headers/ACL/roles/contexto/status/eventos/retention/SLA/ACK/escritas/UI/mobile/deps/lock/native/workflowalterados. Reverse-substitution comprova3sourcesoriginaisBYTE-IDÊNTICOSforaimport+comparador. Oito regressões comcontrollersREAIS:2ordenaçãopgDate+2nullable/autoridade/scoped/tenantdedup+exceptions4(Dateorder/overduepriority/owneradmin403cross401/tieISOoffset). LocalNativeTSstrip+Functionbaseline4PASS4FAIL→candidata8/8PASS; NÃOtypecheck/CI/HTTP/UI. Nulos são defesa de dados unit, nãoalegação deNULLPGondeNOTNULLexiste. Valoresiguaisoffsetpreservamordemestável.

Fixture adiciona somente apósas3ordensPASS a passagemdosJSONsREAISnoloadSafetyREALinalteradomobile, exigindoready/cases[B,A]/appeals[B,A]; REDnãochegouaexecutaressaúltimaetapa. ÉcontratodadossemrenderRN/Android/taps/SecureStore. GuardasCIexactlocalhostPG/socket/databasenameeorigeminalteradas;DMLonlysixownfreshcreated_at,noeventwrites/historydelete/grantrelaxation. TodasassertsHTTPoriginais+browser503/recovery/logoutinalterados. NOVOHEAD CI próprio aindaPENDENTE, nãoinferir431API/1343total/PASSatémedir. Revisarbytes/modes/árvore/ancestrais/mainbaseheadfrescos/mergeONLYGREENjustificadoexpectedSHAeapósgatesnovamenteSHAreal. APKN/AexigeidentidadeINTEGRALdosinputs+grafocanônico, não[]ouemprestado.

Neste cicloFUNCIONALpersistidos10PNGs563(5OWN+5POST)comPR563_OWN_POST_CHRONOLOGY_PROVENANCE.jsoncontendoHEAD/checkout/tree/pais/run/job/attempt/resultSUCCESS/SHA/bytes1365x900. Primarylogs563reconsultados e todos10assinaturaPNG/SHA256/bytes/dimensõesnovamenteverificados; nãoframes564. Isso consolidaa preparaçãoanteriorsemcommitapenasmetadados. Somenteárea10técnicainternaaceita,12pendentes.558rootERR_ABORTEDnãoresolvido/560separadosDRAFTFAIL,nenhumPASSemprestado/açãoexterna/produção/custo/provider.


## Jornada nativa de entrada offline — preparação funcional — 2026-10-16 UTC

Escopo exclusivo MLIVRETRABALHO; base main f98b5f618c5b78772c360b93d17e6028f0021008, árvore6f1d97a074f8291862de403b5d65cdaf97fec512. A matriz ainda exige interação real por plataforma: o smoke atual instala, abre, verifica PID/atividade/fatais após12s, mas NÃO toca em telas, digita, valida formulário ou navega. Nenhum defeito de produto novo é afirmado nesta preparação; trata-se de preencher uma lacuna factual de teste.

Novo scripts/android-entry-journey.cjs é executado no MESMO emulador API35/pixel6 do job APK, APÓS o smoke original byte-idêntico, antes do upload validado. Exige CI/GITHUB_ACTIONS/repositório exatos, sourceHead/checkout40hex/run/attempt, checkout Git literal igualGITHUB_SHA, BUILD_INFO.commit_sha igualcheckout/metrofalse/packagefixo e SHA256 dos bytesAPK local/arquivoSHA/instalaçãoREAL iguais. Adb devices deve conter SOMENTE um emulator-NNN autorizado e ro.kernel.qemu=1. Não aceita serial físico ou ambíguo nem toca dados de aparelho pessoal. pm clear é restrito ao packagefixo recém-instalado no emulador descartável já validado; não há clear em físico nem exclusão de histórico Git.

Antes de limpar/reabrir a fixture, força appstop, usa comandos shell normais de modo avião/Wi-Fi/mobiledata OFF e EXIGE modo avião enabled, settingswifi/mobiledata0, NENHUMA rota defaultIPv4/IPv6 e NENHUM endereço scopeglobal. Cada tap/captura verifica novamente essa condição. Se shell/isolamento/permissão falhar, gate exit1; sem root/grant de permissões/firewall/CORS/flags/deadlinebypass. Fonte primária AOSP ConnectivityService descreve cmd connectivity airplane-mode enable/disable; modo avião sozinho não é prova de offline, por isso rádios/rotas/endereço também são gates. Referência https://android.googlesource.com/platform/packages/modules/Connectivity/+/0eccf35b6b1b123996ee41e4cc078cf79c35be89/service/src/com/android/server/ConnectivityService.java . Fonte tagAndroid15 inacessível via ferramenta; não atribuir comportamento exato do runner sem observação.

Jornada proposta: landing signedout; botão Entrar real; TextInput E-mail selecionado por XML/package/bounds/estadoenabled+clickable; teclado nativo observado por input_method; digitação apenasinvalid, senha vazia; ação Entrar exige mensagem real de validação. Nenhuma credencial válida nem signup/loginHTTP é fornecida. Voltar; Criar conta profissional vazio exige nova mensagem; volta e reabre formulário para escolherempresa, campoNomeempresa/selected nativos reais e erro inicialmente AUSENTE, depois submit vazio exige mensagemnova (não reutiliza erro profissional). Troca de papel remove campoempresa; Voltar; force-stop/relaunch exige NOVOPID e landing signedout. CapturasPNG+XML+manifest porestado, SHA256/dimensões/checkout/sourcehead/APKhash/run/attempt; falha também conserva stage/exit, nunca viraPASS por diagnóstico. Não faz taps cegos, não concede prompts de sistema: target deve ser ÚNICO no package, boundsdentroda tela. Não muda JSX/design/navegação/helpers/sessão/API/backend/SQL/RLS/payloads/deps/lock/React19.1.4/RN0.81.6.

Dez regressões locais do harness PASS (CIguard/serial/isolamento/seletores/ambiguidades/roles/EditText/buildSHA/PNGmetadados/freshvalidation). São MODELOS, NÃO Android real/teclado/render ou prova de sucesso desta jornada. CI foundation passa a executar os10modelos além dos gatesanteriores. JobAPK preserva8testssmokeanteriores e acrescenta10modelos; preserva buildcanônico/envHTTPSprodução sem executarauthválida, todasflags/45min/gates/KVM/12ssmoke/fatais. Upload APK só após TODOjob incluindo jornadaPASS. ArtifactextraPNG/XML é evidência de teste, nunca substitutoAPK. Mudança em workflows/scripts de gates exige OWNCI+OWNAPK no HEAD final e POSTCI+POSTAPK no MERGEREAL; APK NÃOéN/A nem emprestado542. Primeiro run desta preparação ainda PENDENTE. Nãoalegar nenhum tap/keyboard/PASS/causaChrome antes de logs/capturas.

### Recibo564 final consolidado no ciclo funcional (sem commit sómetadados)

#564 JÁMERGED f98b5f618c5b78772c360b93d17e6028f0021008/tree6f1d97a074f8291862de403b5d65cdaf97fec512/paisordenados[a699fd0f26d12ba604cc5110e507adf231f120e1,b42428eddd3e4aa96857c6ed8b317a0c9543c749]. HEADb42428eddd3e4aa96857c6ed8b317a0c9543c749; ownCI38858389430/job116834879731attempt1SUCCESS1343=[145Web,753mobile,431API,3CLI,11monitor]/zeroFAILSKIPCANCEL/ALL18steps/ProductionTruth06:00:44.7591413Z. Owncheckoutd59368266570ec78447cb889ec160da3745fda37 SINTÉTICO[a699,b424]/tree6f1equivalente,nãoHEADliteral. Novaordem3HTTPPG+loadSafetymobileREAL05:58:52.1070917Z, Chrome155.0.8059.39/503recovery8jornadas05:59:37.7308418Z/05:59:38.3807603Z PASS próprios.

POST56438858944606/job116836602726attempt1COMPLETE FAILURE, ZEROretry. CheckoutLITERALf98 06:02:34.1883726Z.1343unitPASS/zeroFAILSKIPCANCEL/typecheckbuildexportmigrationrunner2xprivacyPASS; nova3ordensHTTPPG+loadSafetyREADY egrants/events/isolamentoPASS06:04:55.2579672Z. HTTPbrowserFAIL/PostSetupNodeSKIPPED/ProductionTruthposteriorNÃOexecutado. Primary06:05:45.8837081Z startup15s: processoGoogleChromespawned/pid13696, semexit/endpoints/DevToolsActivePort, stderr193bytes/DBus+errorflags, stdout0.06:05:45.8841405Z Browser startup timeout. Não versãoChrome/DOM/PNG/503/recovery/reload/logout/B noPOST, nãoECR/nãoERR_ABORTED/CORSobservado eDBusflagsNÃOcausaprovada. Não rerun porverde/relaxarprazos/sandbox/Fetchguard/LNApermissões; nãoemprestarOWNpass. PRbody564final12095charsgravado/re-lidoigual. Não repetirready/merge/rerun564/563/561.

CincoOWN564PNGs com fonteb424/checkoutsintéticod593/tree6f1/run38858389430/job116834879731/resultSUCCESS recuperadosnovamentedologprimário, assinaturaPNG/SHA256/bytes/dimensões1365x900 validados e persistidos neste ciclo com PR564_OWN_NATIVE_ENTRY_CYCLE_PROVENANCE.json. NÃOframesnativosdesta nova jornada. POST564nenhumframe/noversão, manifesto registra explicitamenteFAILsememprestarcapturas. Assets563/879 existentes intactos; documentosoriginais5+matriz continuam FULLPREFIX porapêndice.

Sóárea10Androidstandalone TÉCNICOINTERNO aceita; outras12pendentes, esta fatia não fechaáreas1/2/8/13integrais, autenticaçãosucesso/APIUI/SecureStorepersistência/físico/VisualTruth/piloto. Externos215/219/220/224/228OPENseparados, sem produçãoRailway/Neon/Rails/serviços/custos/credenciais/contratos/PSP/dinheiroreal. 558879/560e47DRAFTFAIL não repetir/reruncego/emprestarPASS. ActivityWatch38858944664/job116836603315SUCCESSPUSH06:02:22.1621163Zf98age0/openPR2/active1, sem issuewrites manuais; alertas562/559fechadospelobot jáprovados. Manter rotinaúnicaenabled/scheduleinalterados, não criaroutra/desativarporparcial. Nenhumcommitartificialdeatividade.


### Ajuste da fixture negativa de dispositivo — antes da prova nativa

O caso unitário de recusa de serial físico usa agora identificador totalmente fictício physical-device-fixture, sem identificador de aparelho do usuário. Nenhuma regra de seleção ou operação ADB mudou. Dez modelos continuam sujeitos à execução no novo HEAD; qualquer CI/APK de predecessor não pertence ao HEAD final. Histórico preservado, sem force-push/novo PR/cancelar ou rerun de job em execução; o novo SHA decorre desta alteração de fixture, não repetição para obter verde.


## Validação de calendário no Passaporte e Segurança — ciclo funcional — 2026-10-16 UTC

Base main f98b5f618c5b78772c360b93d17e6028f0021008/tree6f1d97a074f8291862de403b5d65cdaf97fec512. DVT original v1.104, memória, checkpoint, ledger, registry e matriz permanecem completos NO LUGAR; este apêndice não substitui fontes nem aceita áreas. O apêndice de preparação do565 foi recebido INTEGRALMENTE como histórico antes deste recibo; seus arquivos de evidência/cincoPNGs564 foram copiados por mesmos blobs/modes, NÃO se incorporam seus workflows ou o gate nativo ainda falho.

Falha reproduzida ANTES da correção: loadWorkPassport e loaders Safety profissional/empresa aceitavam calendário impossível em new Date(...), tornando READY um histórico com 2026-02-30T12:00:00Z; submitSafetyCase e submitSafetyAppeal aceitavam created/existing sob ACK com mesma data impossível. As fixtures também usam 2025-02-29 comoffset e2026-04-31 comoffset. São respostas HTTP simuladas nos helpers TypeScript REAIS, não registros inválidos em PostgreSQL nem incidente/exploit/Android/produção provados. API retorna timestamps de colunas PostgreSQL (WorkPassport.completedAt; SafetyCases.createdAt/resolvedAt; SafetyAppeals.createdAt), não autoriza normalização silenciosa de dia impossível. Baseline já adotado pela Agenda/Ganhos/Notificações no538 valida componentes locais antes do instante.

Regressão nova apps/mobile/tests/passport-safety-calendar.test.mjs: 12 testes, RED2PASS/10FAIL no source exato da main; GREEN12/12 após correção. Conjunto focal com29testes existentes BYTE-IDÊNTICOS: GREEN41/41, zero fail/skip/cancel. Cobre sete campos de leitura (completedAt/startsAt/createdAt/resolvedAt) e três ACKs(case/appealcreated/appealexisting), preserva seção irmã READY quando só uma seção inválida, um único POST/endpoints/body/tenant/seleção, erro em leitura e unknown em confirmação incompatível. Controles positivos leapday2024, offset que cruza dia UTC e epochzero permanecem strings exatas; null/undefined opcionais,404perfilausente e vazio confirmado preservados. Não afirmar calendário impossível armazenável noPG, nem mudar política de recurso/status/retention.

Correção SOMENTE predicado date em professional-safety.ts/company-safety.ts e predicado completedAt em professional-profile.ts com função calendário byte-idêntica à já existente na Agenda. Reverse-substitution integral comprova todo restante dos3módulos preservado salvo whitespacefinal: requests/paths/headers/tenant/ACL/ids/descrição/motivo/currentcontext/respostas/created-existing/unknown/semretry, estatísticas/ordem/dados/JSX/layout/UI/rotas/API/SQL/RLS/runtime/roles/eventos/React19.1.4/RN0.81.6/deps/lock/build/workflows/smoke unchanged. Não incorporar565 nem seu gateoffline falho só para usar resultado antigo. Mobile mudou: OWN CI e OWN APK no HEAD exato são OBRIGATÓRIOS e ainda PENDENTES nesta preparação; pósCI/APK no MERGE REAL também, nenhum APK542/565 emprestado, nenhum verde por ausência/runqueued/skipped.

### Isolamento nativo565 — decisão técnica sem bypass

Consulta AOSP Tradefed DeviceSetup.java no commit cd9b18148493b9277b1b676c29ce0e4467b69df7 registra ifconfig eth0 down, mas a própria classe exige dispositivo onde adb root é possível. Isso NÃO prova comando suportado pelo shell sem elevação no runner; não será incorporado às cegas. Não houve novo comando de rede/root/su/grant/firewall/bypass nem nova tentativa565. Fonte primária https://android.googlesource.com/platform/tools/tradefederation/+/cd9b18148493b9277b1b676c29ce0e4467b69df7/src/com/android/tradefed/targetprep/DeviceSetup.java . Segurança/isolamento antes de input continuam obrigatórios; bloqueio parcial não impede este reparo independente do cliente.

### Recibo565 final consolidado INTEGRAL no ciclo funcional (história, NÃO resultado deste novo HEAD)

## FINAL OWN RESULTS — 2026-10-16 UTC — DRAFT / NOT MERGED

HEAD `aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`, tree `49543d17a5abc38a47d020a32ddd7993619dff61`, parent `c4974ba7e191acac808e0877e62ab4d0b800c8bf`. Base MAIN `f98b5f618c5b78772c360b93d17e6028f0021008`. Both OWN runs completed FAILURE, attempt1, ZERO retries. No ready/merge/post-565 exists.

### General CI: FAILURE, not green
[Run 38863990479 / job 116852488777](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38863990479/job/116852488777).
1353 tests=[145Web,753mobile,431API,3HTTPCLI,11watch,10entry-harnessmodels] pass; fail/skip/cancel=0. Typecheck/build/mobile export/migration runner2x/privacy PASS. HTTP/browser FAIL; Post Setup Node skipped; later ProductionTruth NOT executed. Unit green is NOT CI green.

Actual Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed06:58:55.1553052Z. Actual ONE teams GET503 consumed +11 distinct other real GET200, human refresh12 NEW GET200/team1/zero extra POST from SEND PASS06:58:57.1288285Z. Subsequent loaded-dashboard timeout06:59:17.0151233Z with12 GET net::ERR_ABORTED/canceled=true/corsError=null. Full reload/logout/B journey NOT completed. Existing transport root remains unresolved, no API/CORS/vendor/security inference or workaround. Original app/browser driver and security/deadlines unchanged.

### Native APK: FAILURE after original standalone smoke
[Run 38863990420 / job 116852488606](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38863990420/job/116852488606).
Canonical build SUCCESS07:06:13.9296606Z; emulator API35/x86_64/pixel_6; actual installation Success07:07:37.9031694Z and unchanged DEVICE_SMOKE_OK07:07:50.2920580Z, metro_required=false.

NEW gate failed closed07:08:08.4612374Z at `offline-isolation`: after airplane-mode enable, Wi-Fi/data disable and bounded15s observation, `ip -o addr show scope global` still reported eth0 IPv4 10.0.2.15/24. Earlier serial/CI/repo/checkout/BUILD_INFO/individual local-versus-installed APK hash guards had passed by control flow, but no individual APK hash was emitted before this failure; do NOT invent its digest or substitute ZIP digest. Error is isolation precondition failure, NOT application validation failure / permission denial / production incident.

No pm-clear, UI input, native keyboard/form/navigation/relaunch checks reached; checks=[]/captures=[] are NOT PASS. NO native PNG/XML or native journey success observed. Validated standalone APK upload SKIPPED; diagnostic upload success does not accept UI. No radio/route/global-address assertion removed, no root/permission grant/security change/deadline extension, no rerun.

Native evidence artifact12030479489 contains failure receipt only,423ZIPbytes, ZIP SHA2567dc18987c7232d75aea175b75f89adf59117888046a4c643c0db8bbaafd4920e. Smoke diagnostic artifact12031106153,53576ZIPbytes, ZIP SHA2568d405ab35d70ed395338020a9af6a5daf73cb0b30c99d5f5a82ec426d6f1215a. Both expiry2026-10-30; neither ZIP digest is an individual APK digest.

### Exact provenance
Both current runs checked out `f90edc8564d4876a17b2d320b57a39b5271d9eb4`, SYNTHETIC ordered parents [`f98b5f618c5b78772c360b93d17e6028f0021008`,`aa0d375da22f95e7274a1551f2a97b9aa9cd8ff1`], tree49543d17a5abc38a47d020a32ddd7993619dff61 identical candidate; NOT literal HEAD. Native checkout primary06:55:33.1133119Z. Source head emitted in failure receipt is aa0. No merge/post gates borrowed.

### Historical initial preparation, separate from final HEAD
Initialc497 CI38863871145/job116852113483attempt1FAILURE1353testsPASS; browser created-team-rendered timeout06:58:05.1619699Z after12 GET aborts. Initial native38863871168/job116852113951attempt1FAILURE: synthetic checkout14a20f995c19ff22e661446925b707df0610ddfd, build07:05:07.7885982Z, original DEVICE_SMOKE_OK07:06:40.9087059Z, new gate offline-isolation/global_address_present07:06:59.2410393Z, no UI checks/captures. Initial results not borrowed for aa0. No retries/cancels.

### Implementation / review
Coverage gap only, no fabricated application defect or product RED. New scripts/android-entry-journey.cjs +10 unit guard models, added after UNCHANGED original standalone smoke in same emulator. Guards require CI/repo/exact checkout/source, single authorized QEMU emulator, own APK/BUILD_INFO/local-vs-installed hash, fresh output, radio/route/address isolation before app reset/input. Selectors require actual XML app labels, enabled unique observed bounds; planned keyboard/invalid email/empty forms/role/back/new-process checks must execute in actual emulator before claiming proof.

10 new models +8 original smoke models PASS locally, NOT Android UI. Separate subprocess fake-ADB physical-device refusal probe PASS before app clear/taps, NOT actual physical/native execution. All negative physical IDs fictional in current head.

17 PR paths, all remote UTF8/base64-normalized bytes exact, all modes100644; FULL original5docs+matrix/main/preparation prefixes preserved in-place by appendix.490of492 existing main non-doc blobs outside2 workflows IDENTICAL; all app/mobile/native/API/SQL/deps/lock/build/old smoke and old tests unchanged. Ahead2/behind0/merge-basef98. Workflow/gate changes require own AND post APK, not N/A.

Previous564 FINAL ownSUCCESS/postSTARTUPFAIL consolidated in5originaldocs+matrix and new ANDROID_OFFLINE_ENTRY_JOURNEY_2026-10-16.md. Five historical OWN564 web PNGs+source manifest persisted with exact provenance/remote readback, not565/native images. Current Git565 appendices are PREPARATION/PENDING history; consolidate this final result only in NEXT FUNCTIONAL cycle, no self-referential metadata/image-only commit.

### Current desktop captures (NOT native proof)
5 OWN CI Web frames primaryjob116852488777 independently decoded PNG signature/bytes/SHA256/1365x900 and Pillow verify PASS; recovered+failure visually inspected. Not yet Git565 assets.
- login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686
- created4dab0942d0fc0eca42a7af70e0ecbf8aed8c6b1374dc2d20dc195fbfa591e7d7/132035
- partial0299f9213f9752f79d2ec783005acdd39bdfc3f66dab4c2423aba498c1015fd2/140761
- recovered47b63ea5c5a1f9e7de0de3ed37223215ee3bd9e060603b1bfbdf951518ebe2e9/132202
- failuref735fdab7e4dba0436b8207cda12f5837a972f4bf4b376616d80f301dcdc538c/132794

### Limits / next safe work
Keep DRAFT: both OWN gates red. Do not rerun solely for green or remove strict isolation. Need a source-grounded, explicitly supported way to disable remaining emulator Ethernet with existing permissions, or a genuinely isolated fixture, followed by measured no global addresses/default routes; no root/grants/bypass. No production input/auth/signup or successful-auth/SecureStore/physical/VisualTruth claim. Permission denial must STOP that branch. If no safe supported isolation, continue independent contracted internal journeys, not all blocked.

Fresh MAIN remainsf98, PRhead/base/draft verified, openPRs558/560/565, external issues215/219/220/224/228 remain separate. Onlyarea10 Androidstandalone TECHNICAL INTERNAL accepted; other12 pending. No whole-area acceptance from testcounts, build, standalone smoke, diagnostics or desktop images.


### Limites de aceite deste ciclo

Somente área10 Androidstandalone TÉCNICOINTERNO aceita; outras12 pendentes. Este reparo de parsing não prova renderRN/Android/taps/teclado/SecureStore/loginválido/físico/VisualTruth/piloto ou aceite integral1/2/3/7/8/11. #565aa0, #558879, #560e47 continuamDRAFT/FAIL separados. Externos215/219/220/224/228OPEN; sem produçãoRailway/Neon/Rails/custos/serviços/credenciais/provider/contratos/PSP/dinheiroreal. #566WatchOPEN é sinal de commits, não prova de agente parado; sem issuewrites manuais/commitatividade. Revisar head/base/main/bytes/modes/árvore/ancestrais; merge ÚNICO expectedSHA só após próprios gates GREEN, depois medir pósreal. Manter somente rotina existente enabled/scheduleinalterados; sem novo agendamento/desativar por parcial.

---

## Entrega funcional — atomicidade da renovação de convites — 2026-10-17

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. Originais completos mantidos NO LUGAR como prefixos integrais. Área4equipes/convites, área7RLS/tenant e área11API ficam mais próximas do aceite; nenhuma área é declarada concluída.

Lacuna comprovada por leitura dos testes existentes: http-company-invitation-concurrency-e2e.sh comprova serialização de duas renovações bem-sucedidas e aceitação de apenas um código; http-company-members-e2e.sh cobre papéis/criação/aceitação/revogação. Nenhum injeta falha SQL no INSERT posterior à revogação do convite anterior. Controller.invite executa ambas as escritas dentro de DatabaseService.tenant BEGIN/SET LOCAL app_runtime/tenant/COMMIT/catchROLLBACK. Não foi reproduzido defeito no produto; a entrega é prova adicional do contrato transacional, sem alterar controller/SQL/runtime.

Novo scripts/invitation-atomicity-e2e.cjs: guarda CI+APIlocalhostHTTPporta explícita+PGlocalhostporta/DBEXATOmlivretrabalho_http; carrega pg somente após guarda e exige socket REALloopback antes de criar fixtures/DDL. Identidades/duasempresas/profissional/convites são criados por HTTP real, IDs/tenant/ator/email/role/expiry/tokenhash vinculados ao PG antes do hook. Nenhuma credencial/código de convite é logado, nenhuma requisição externa/prod/provider.

Uma sequência e função/trigger AFTER INSERT com nomes derivados de UUID próprio são criados APENAS no banco descartável. Função SECURITYDEFINER com search_path fixo/tabela+sequência qualificadas/EXECUTE PUBLIC revogado limita-se ao tenant/email/ator próprios. Exige ver os dois fatos dentro da transação (convite anterior revogado + novo inserido) antes de avançar sequência não transacional e levantar erro controlado. HTTP deve retornar500, witness deve ser1, snapshots integrais das invitations/memberships dos dois tenants devem ser exatamente iguais aos anteriores, RLS/policies/ACL intactos.

Cleanup remove SOMENTE objetos criados com flags próprias, em ordem trigger/function/sequence, não sobrescreve objetos existentes nem usa CASCADE. Guardas contra nomes forjados e cleanup parcial com falha têm teste real. Depois, uma solicitação explícita de recuperação201 deve criar exatamenteumconvite e revogar anterior; código antigo400/novo201aceito e exatamenteuma membershipmanager nova, demaisregistros/tenantestrangeiro intactos. Não é retry automático de negócio, outbox, email entregue ou prova Android/produção. Markers INVITATION_INSERT_ROLLBACK_PASS e INVITATION_ATOMICITY_HTTP_PG_PASS só serão aceitos por logs novos; nesta preparação PENDENTES.

Cinco guardmodels novos em apps/api/src/invitation-atomicity.test.ts PASS5/5 local via NativeTSstrip e funções reais, sem pg/HTTP local. Cobrem IDs/email do escopo, vinculação do registro, recusa de cleanup não próprio/forjado, ordem/flags e drenagem após falha. Não são prova SQL/HTTP. CI esperado1360=[145Web,765mobile,436API,3CLI,11monitor], ainda PENDENTE. Uma invocação foi adicionada antes do navegador no HTTPjourney; TODOS asserts/gates antigos/navegador/CORS/Fetchguard/CDP/sandbox/LNA/deadlines preservados. Nenhum app/controller/migração/dependência/lock/workflow/build/smoke/native alterado. APK N/A somente após revisão integral da árvore de insumos nativos; não por ausência de run ou APK emprestado.

Revalidação inicial: #568b7ef e #5702205 são DRAFT e CIbrowserFAIL/APKSUCCESS, sem merge/retry cego nesta rodada; os snapshots PENDING dos corpos não são PASS. Não duplicar reparo de datas já abrangido nesses PRs. #558/#560/#565 mantêm bloqueios independentes. Apenas área10Androidstandalone TÉCNICO interno aceita, demais12pendentes; externos215/219/220/224/228abertos. Sem produção/serviços/custos/providers/PSP/credenciais/contratos/dinheiroreal. Nenhum commit artificial/alerta manual.

Fecho desta preparação: código fixture+guardtests/documentação/evidência acima preparados, 5modelsPASS, execuçãoCI/HTTPPG/revisão/merge/pós-gates PENDENTES. Próximo passo: conferir bytes/modes/ancestrais e log primário próprio; manter DRAFT se qualquer gate falhar e avançar em item independente em vez de rerun de falha de produto. Recibo final será vinculado ao PR e consolidado em novo ciclo funcional sem commit autorreferente de status.



## Aceite de convite: falha tardia no UPDATE — ciclo funcional — 2026-10-17 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Estende o PR571 existente, sem PR duplicado, sobre HEAD67e3b8fc389162a186c4899d4c0b117a906c2d42/treec431b86c2e9876a788b74745348801bcdccd9020; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README/DVT original completo/memória/checkpoint/ledger/registry/matriz foram recuperados em referência imutável; todos prefixos integrais permanecem NO LUGAR por apêndice.

Lacuna concreta: CompanyMembersController.accept insere membership (ou promove admin/manager a owner) e depois grava accepted_at/accepted_by_identity_id. Testes atuais verificam entradas/auth/ACK e erro genérico; não injetam falha SQL na última escrita depois de observar membership nova. Migrations0001/0004/0039/0047 confirmam UUIDs, unicidade, RLS/app_runtime e par de aceitação consistente. Nenhum defeito de transação do produto é presumido: o controller e DatabaseService já transacionam ambas as escritas. Esta fatia cobre SOMENTE INSERT de membership nova, não prova rollback do caminho de promoção de papel.

Nova fase em scripts/invitation-atomicity-e2e.cjs, depois da prova de renovação antiga intacta: convite renovado real/target profissional real ainda sem membership vinculados a tenant/email/ator/UUID/hashPG antes do hook. Scope phase=accept exige targetIdUUID e namespace inv_accept separado. Hook temporário AFTER UPDATE OF accepted_at exige convite exato, transição NULL→data, accepted_by=target e testemunha simultânea de UMA membershipmanager/subject_identity e UM convite aceito na transação. Só então avança sequência não transacional própria e falha. HTTP500+witness1 devem corresponder a snapshots integrais de invitations/memberships dos DOIS tenants exatamente iguais ao pré-aceite; convite permanece ativo via GET autorizado. Após remover hook, UMA ação EXPLÍCITA com MESMO código deve retornar201, criar exatamenteuma membershipmanager, alterar somente paraccepted_at/by do convite, preservar demaislinhas/tenantestrangeiro/ACL/policies. Código jáconsumido400 não pode criaroutramembership.

Nenhuma seed de papel, grant relaxado, RLSdisable, alteração de SQL/controller/migração/produção ou retry automático. Todas guardas CI/localAPIHTTPportaexplícita/PGexactmlivretrabalho_http/socketloopback continuam; pg carregado sóapósconfigguard, objetos criadossomenteapósHTTP↔PGbinding. SECURITYDEFINER restringe witness a linhas próprias, search_pathfixo, nomesqualificados, EXECUTEPUBLICrevogado. Cleanup rederiva nomes/ownershipflags/semCASCADE; exige ausência dos DOIS conjuntos de objetos ao final. Falha permanece exit1, sem remover/adialogar nenhum gate antigo.

Quatro regressões adicionais das funções REAIS scope/binding/SQLbounded/cleanupPASS local, nove guardmodels no total (5 antigos+4 novos), zeroFAILSKIPCANCEL. A execução focal NativeTSstrip+Function foi necessária pelo modo ES-module do runner local; invocação direta inicial falhou por require indisponível, NÃO defeito do produto nem teste SQL RED. node --check PASS; CLI CI=0 recusou antes de pg/HTTP. Modelos não são prova de rollback HTTPPG. Novos markers INVITATION_ACCEPT_UPDATE_ROLLBACK_PASS e INVITATION_ACCEPT_ATOMICITY_HTTP_PG_PASS ainda PENDENTES nesta preparação, não PASS emprestado. CI esperado1364=[145Web,765mobile,440API,3CLI,11monitor] precisa medir novo HEAD. APK N/A só por identidade integral de inputs/grafo canonical expo prebuild→Gradle, não []/ausência de run/artefato emprestado.

### Recibo anterior571 consolidado neste ciclo funcional (HISTÓRIA, não resultado do novo HEAD)

HEAD67e3b8fc389162a186c4899d4c0b117a906c2d42/treec431b86c2e9876a788b74745348801bcdccd9020/parentmain3e. OWNCI39068354509/job117500598324attempt1COMPLETEFAILURE,ZEROretry.1360=[145Web,765mobile,436API,3CLI,11monitor]unitPASS/fail-skip-cancel0/typesbuildexportmigrationrunner2xprivacyPASS; HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Checkoutcec5e3e46cebfa29e8dcc9e6f56531c87aacb7b6SINTÉTICO[main3e,67e]/treec431equivalente, NÃOHEADliteral.
INVITATION_INSERT_ROLLBACK_PASS20:52:28.3424395Z e INVITATION_ATOMICITY_HTTP_PG_PASS20:52:28.3603093Z ACTUAIS: falhaINSERT500 após oldrevoked+newvisible/witness1, snapshots2tenantsiguais/ACLpoliciesintactos, recuperação explícita201/oldcode400/newaccepted201/managerúnica/cleanupPGPASS. Nenhumprodutoalterado/buginventado.
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual20:53:04.2812605Z; fail20:53:25.1342704Zcreatedteamrendered apósPOST201+12GETERR_ABORTED/canceledTRUE/corsnull; UI12unavailable/—correta. Job/503/recovery/reload/logout/B/fulljourneyNOTcompleted. NãoECR/startup/causaAPI-CORS-vendorprovada; não rerun67e para verde. 10pathsremotebyteexact/492of493existingmainnon-docsoutsideHTTPshellsame/246protectedinputsidentical→APKN/Aintegral; nenhumAPK571atribuído. PRbodyfinal12310charsre-lidoexato é recibo primário. Não emprestar frames/PASS antigos ao novo HEAD.

### Fecho desta preparação e rastreabilidade

Arquivos funcionais: CJSfixture+APItest (quatro casos novos); HTTPshell original571inalterado e todos gates/browser/asserts preservados. Cincooriginais+matrizappend e nova evidência INVITATION_ACCEPT_UPDATE_ROLLBACK_2026-10-17.md. Áreas4equipes/7PostgresRLS/11API mais próximas do aceite somente se logs próprios provarem nova fase; nenhuma área fechada, apenas10TÉCNICAINTERNA aceita e12pendentes. OwnCI/revisão/integração/pósreal ainda PENDENTES. DRAFT se qualquer gatefalhar; no rerunblind/newPR/activitycommit. #572infraregistry é outroPRdraftCIred, não integrado/copiado aqui; #568/#570/#565/#560/#558 separados, externos215219220224228OPEN. Semprodução/serviços/custos/credenciais/contratos/providers/PSP/dinheiroreal.



## Ledger simulado: falha de INSERT após conclusão — ciclo funcional — 2026-10-17 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README e seis documentos normativos originais recuperados completos do GitHub vivo. FULLprefix main+apêndices históricos de571007 preservados NO LUGAR, sem resumir/substituir original. PR independente do571 (convites), sem repetir seu CI, sem copiar seus scripts/workflows/gates ainda não integrados. Esta entrega cobre área6ledgerSIMULADO, área7RLS/tenant e área11API; não fecha nenhuma área.

Lacuna concreta: WorkAssignmentsController.complete faz UPDATE work_assignments(status/completed_at), depois INSERTearnings_ledger na MESMA DatabaseService.tenant BEGIN/SETLOCALapp_runtime/tenant/COMMIT/catchROLLBACK. assignment-lifecycle/work-assignments-inputtests cobrem entradas/ACK/filtros/SQL/erro genérico; http-finance-reconciliation-e2e cobre callbackHMAC/replay/recipient/totais, não testemunha erroSQL tardio doINSERTledger apósstatuscompleted. Migrations0006/0007/0044/0065 mantêmRLS/uniquenessassignment/noDELETEledgerapp_runtime/FKassignmenttenant. Não há bug transacional reproduzido ou patch emproduto; a entrega preenche uma lacuna de teste do contrato existente.

Novo scripts/ledger-completion-atomicity-e2e.cjs: reutiliza configuraçãoCI/localAPIHTTPportaexplicita/PGlocalhostporta+DBEXATOmlivretrabalho_http; carrega pg só após guarda e valida socketPGreal loopback antesfixtures/DDL. Duasempresas/profissional/outsider/perfil/availability/jobs/interest/confirm/memberships/checkin/start/checkout são criados porHTTP. TenantB concluído viaHTTP anteshook e possui ledgerpayable34567real; tenantA permanecechecked_out/semledger, valor23456. Vincula assignment/job/tenant/profile/identity/títuloUUID/valor/Dateobjects/estado aoPG anteshook. Negativos401semAuth/outsider/crossowner e400sameproforeignassignment devem preservar integralmente snapshots de5tabelas em2tenants; não seedpapel/SQLdatawrites/adminhistorydelete.

HookAFTERINSERTearnings_ledger temporário SÓbancodescartável: scopeUUID+amountfixo/nomesderivadospróprios. SECURITYDEFINER sówitnessbounded/search_pathfixo/schemaqualified/EXECUTEPUBLICrevogado; exigeverassignmentcompleted+completed_at eUMledgerpayableexato visíveis na mesma transação antesavançarsequêncianãotransacional1+raise→HTTP500. Apóserro exige5tabelas(work_assignments/earnings_ledger/company_jobs/tenant_memberships/payment_events)dosDOIStenants exatamenteiguais +ACLpoliciesRLSiguais, assignmentGETchecked_out/completedAtnull eearningsGETvazio. Não é PATCH no produto nem provider/transferência/dinheiroreal.

ApóscleanupSÓobjetoscriados/flags/nomesrevalidados/semCASCADE, UMAconclusãoEXPLÍCITA201 deve gerarUMledger23456payable e somentealtera2camposstatus/completed_at doassignment. Todosoldrows/tenantBledger/grants/policies intactos. Repetircomplete apóscompleted→400 sem novoledger é contrato atual, NÃO alegar201idempotente nem retryautomático. ConsultaPG comprova ausência owntrigger/function/sequence. Nenhumapp/controller/DatabaseService/migração/SQLproduto/ACL/deps/lock/mobile/native/workflow/build/smoke/React19.1.4/RN0.81.6 alterado.

Seis guardmodels em apps/api/src/ledger-completion-atomicity.test.ts executamfunçõesreais scope/binding/witnessSQL/cleanup:local6PASS/fail-skip-cancel0 viaNativeTSstrip+Function, node--checkPASS eCLI CI=0refusedantespg/HTTP. NÃOprovaSQL/HTTP/UI. Markers novos LEDGER_COMPLETION_INSERT_ROLLBACK_PASS e LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS PENDENTES nesta preparação, só aceitar porCIpróprioexato. CI esperado1361=[145Web,765mobile,437API,3CLI,11monitor] nãoresultadojámedido. Uma invocaçãoantesbrowser noHTTPshell; TODOSoldcalls/asserts/gatesincludebrowsermantidos, semsecurity/CDP/Fetchguard/CORS/sandbox/LNA/deadline/flags/imageweakening. APKN/A SOMENTE apósconferência integral insumos/grafoexpo-mobileprebuild→Gradle; não[]/ausênciaruns/borrowedAPK.

### Recibo571007 final consolidado neste ciclo (história, não resultado do novo HEAD)

#571DRAFT HEAD007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb/tree49f043f544cf0a9bae2299bb686ece458a8293b1/parent67e3/main3e. OwnCI39072426685/job117512606508attempt1COMPLETEFAILURE,ZEROretry;1364=[145,765,440,3,11]unitPASS/typesbuildexportmigrationrunner2xprivacyPASS/HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Actualcheckoute364e571a9d208be2c6ed215d12cfd8847ccd739primary21:48:00.6701256ZSINTÉTICO[main3e,007]/tree49figual,nãoHEADliteral.
Nova provaaceiteHTTPPGPASS21:50:13.4912912Z e21:50:13.5048641Z: erroUPDATEaccepted_at depoismember+convitevisíveis/witness1/5guards+4models/rollback2tenant/conviteativo/samecode201explicit/replay400/membershipmanagerúnica/cleanup2hooksPGPASS; não caminho promoção papéis. OriginalrenovaçãoPASS21:50:13.4679747Z/21:50:13.5051887Z neste007.
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual21:50:52.8196851Z. Fail21:51:15.4245332Zcreatedteamrendered/teamPOST201→12GETERR_ABORTED/canceledtrue/corsnull/UIunavailable—correta. Job/503/recovery/reload/logout/B/fulljourneyNOTcompleted, rootUNRESOLVED, nãoECR/startup/API-CORS-vendorcausaproof. Nenhumrerun/ready/merge571. FinalPRbody19179charsre-lidoexato11pathsbyteexact/fullprefixpreserved/249protectedunchanged→APKN/Aintegral/nenhumAPK571. PNGdesktopprópriossómetadata/signatureSHAbytes1365x900PASS,nãovisual/native/Gitassets:login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686;failure4d25511d5a01f3afb096a28244556f342892651e61005c07d37745797459e6f9/133250. NãoemprestarPASSframes.

### Fecho da preparação

Código/test6/localguardprova/documentação preparados, HTTPPGreal/CIreview/integração/pósreal PENDENTES. Cincooriginais+matrizpreservadosappend e evidência LEDGER_COMPLETION_INSERT_ROLLBACK_2026-10-17.md; duasnotasoriginais571 copiadas comoHISTÓRIApelosmesmosblobs,nãoimportscriptsde571. Sóárea10AndroidstandaloneTÉCNICAINTERNOaceita;12pendentes. #558/#560/#565/#568/#570/#571/#572draftsseparados/ext215219220224228OPEN. Nenhumcommitatividade/alertmanual/novaautomação/produção/serviço/custo/credencial/contrato/provider/PSP/dinheiroreal. RevalidarHEAD/base/bytes/modes/tree/ancestrais; mergeúnicoexpectedSHA sóCIcompletoSUCCESS+APKaplicávelGREEN e pósREAL. SeCIfalharporbrowser registrarlog e avançaroutroitem, semrerunmesmoSHAparaverde.



## Privacidade mobile: validar calendário antes de confirmar fatos — ciclo funcional — 2026-10-17 UTC

Escopoexclusivo dbdanielbaracho/MLIVRETRABALHO;base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README/DVToriginalv1.104/memória/checkpoint/ledger/registry/matrizrecuperadoscompletosGitHubvivo. PrefixosINTEGRAISmain+história571/573 preservadosNO LUGARporapêndice,nãoresumo/substituição. Nenhumledger/convite/workflow/gate nãointegrado dessesPRs écopiadofuncionalmente;3notasexistentessegregadascomohistória,pelosmesmosblobs.

FalhaREPRODUZIDA: privacy-requests.ts usaDatefinito e normaliza calendáriosimpossíveis nos createdAt/completedAt →READY. privacy-actions.ts fazomesmoemexportgeneratedAt/identity.createdAt/privacyRequests.createdAt→GENERATED eACKdeactivatedAt→DEACTIVATED. Trêsvalores2026-02-30T12:00:00Z/2025-02-29T12:00:00-03:00/2026-04-31T12:00:00+02:00 cobremseiscampos. APIPrivacyControllerrealretornaPGtimestamps/now()/generatedAtnewDateISO;NÃOháprovaPGinvalid/APIbug/exploit/produção. Trata-sedeaceitaçãoindevidadeJSONincompatívelpeloshelpersreaissusadospelatela,comcallbackscontrolados.

23regressõesNOVAS apps/mobile/tests/privacy-calendar.test.mjs:18negativos(6campos×3datas)+5controlespositivos,baseline5PASS18FAIL;14oldprivacytestssemassertalterado→conjuntoRED19PASS18FAIL. Fixapenas2predicadosdate emprivacy-requests.ts/privacy-actions.ts, funçãoBYTEIDÊNTICAàAgenda(main): componentescalendárioISOlocaisantesdeDatefinito. Nãoéconversãonemnormalização dedata. GREEN37/37zeroFAILSKIPCANCEL,inclTZAmerica/Sao_Paulo;novo23GREEN.NovoCIesperado1378=[145Web,788mobile,431API,3CLI,11monitor]PENDENTE,nãoemprestar567verde.

Lêdataimpossível→ERROR;exportincompatível→UNKNOWNsemcópia;ACKdesativaçãoincompatível→UNKNOWNapósUMPOSTbodylessinalterado,semretry. Controleleapday2024/epoch0string/offsetcruzaUTCpreservadosstrings/fatos;completedAtnull/missing/vazioautorizadopreservados;requiredtimestampnull/missingcontinuafalha. runForSession atual(staleporidentity/deadline)permanece,aoperaçãoocorreumaúnicavez;14oldcontrolsreauth/reasons400/unknown/responses/session/payloads/DSARpreservados. TestesexecutamhelpersTypeScriptREAIS+fixturesJSONexplícitas,nãoAndroidUI/HTTPPG/SecureStore/limpezarealdesessão.

Reverse-substitutionINTEGRAL confirma TODOsourcefora2predicadosBYTEEXATO: requests/paths/methods/bodylessPOST/auth/session/current/deadline/ACKIDs/rejections/unknown/retrypolicies/retention/ACL/DSAR/SQL/API/RLS unchanged. Telaapps/mobile/app/privacidade.tsxTOTALMENTEinalterada: UNKNOWNjámarcauncertain e nãoencaminhaaceitaçãoDEACTIVATED; nãoalterarclearSession/router/design/handlers. Não alegar sessão realapagadaouimpedidaemAndroidapartirdehelperunit. React19.1.4/RN0.81.6/deps/lock/workflow/build/smokeinalterados. Mudançamobile→OWNCI+OWNAPKobrigatórios,noHEADexato;APKN/AéFALSO.PósCI/APKnoMERGEREALtambémobrigatórios.NenhumAPKantigoemprestado.

### Recibo573 FINAL consolidado neste ciclo funcional (HISTÓRIA, não resultado deste novo HEAD)

PR573DRAFT HEAD5852d5527e347312d473a6fac8cc3a604ff2eb52/treeff1d0ec816605367a1a0c0d809391f6c3e98b2d2/parentmain3e. Fixtureledgercompletion+6guardmodelsLOCALPASS/nodesyntaxPASS/CLI CI=0refused, nãoSQLproof. OwnCI39076638325attempt2COMPLETEFAILURE:attempt1/job117525041067ECRpostgres17toomanyrequestsDatalimit22:49:56.4661814Z..22:50:02.4990382ZANTEScheckout;EXATAMENTEUMretryespecíficofailed-completedMESMOSHA attempt2/job117525180707mesmoerro22:50:38.6329457Z..22:50:50.2411551Z. QuotaNÃOresolvida/semoutroretry/registrochange/credencial/custo.
AMBOSInitializecontainersFAIL/Checkout/TODOSprodutosSKIPPED;nenhumcheckoutACTUAL/Chrome/DOM/PNG/HTTPPG/ProductionTruth/LEDGER_*PASSobservado.1361SÓESPERADO,nãoexecutado.PassSQLnãopodeemprestado571.12pathsremotebyteexact/249protectedinputsiguais→APKN/Aintegral/nenhumAPK573. FinalPRbody8258charsreadbackexato;noREADY/merge/pós573. GitprepPENDINGhistóriapreservada,estaéconsolidaçãoemciclofuncional,nãometadatacommit.

### Fecho desta preparação

Código2predicados+23newtests/37focalPASS+evidênciaMOBILE_PRIVACY_CALENDAR_2026-10-17.md+5originais/matrizappendpreparados;CI/APK/review/merge/pós-gatesaindaPENDENTES. Áreas8privacidade/11APIcliente/12rastreabilidade maispróximas,nenhumaceiteintegral.Só10AndroidstandaloneTÉCNICAINTERNOaceita12pendentes;externos215219220224228OPEN. Nãoadotar572registryparaverde,nãorerun573mesmoSHA;571007browserrootUNRESOLVEDpreservado/558560565568570separados. Semprodução/Railway/Neon/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal. Semnovaautomação/manualActivitywrites/commitatividade.AssertivasbrowserCDPFetchguardCORSsandboxLNAdeadlinesflagsimagesintactas.



## Ganhos: JSON real após rollback e recuperação explícita — ciclo funcional — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Extensão coerente do PR573 existente, branch test/ledger-completion-insert-rollback-20261017, parent5852d5527e347312d473a6fac8cc3a604ff2eb52/treeff1d0ec816605367a1a0c0d809391f6c3e98b2d2; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README e seis originais recuperados integralmente em refs imutáveis do GitHub vivo. Prefixos FULLmain+571+573+574 preservados NO LUGAR por apêndice, não substituídos por resumo. A nota de privacidade574 é preservada pelo mesmo blob, sem copiar seus dois patches mobile/teste nem gates de outros drafts.

Lacuna definida: o fixture573 já exige HTTPearnings vazio depois de rollback e um ledger payable23456 depois da recuperação, mas não passa ESSES dois JSONs ao consumidor real apps/mobile/lib/earnings.ts usado em Ganhos. Acrescenta consumeEarningsJSON ao próprio CJS, importando o source REAL por caminho fixo, NativeTSstrip+VM, sem modificar o helper. Callback retorna SOMENTE o objeto já recebido pela chamada HTTP existente; exige uma execução/uma leituraJSON, READY e a mesma referência de dados. Rollback exige [] autorizado; positivo exige UMA linha com id do ledger obtido independentemente do PG, tenantId/assignmentId do escopo HTTP↔PG, amountCents23456/statuspayable. Expectativas malformadas/incompatibilidade/schema inválido falham sticky, nunca viram zero ou PASS. Não há fetch/SQL/POST/retry nessa função.

Todos os20 comandos awaitcall anteriores foram confrontados e mantidos nas mesmas posições; o GET pós-rollback apenas ganha variável para compartilhar a resposta com o helper. Nenhuma requisição adicional, SQL do hook/snapshots/cleanup/ACL/RLS, operação de produto ou reordenação de gates. Marker novo LEDGER_MOBILE_REAL_JSON_PASS só poderá ser aceito se o CI próprio executar os DOIS consumos reais e TODOS os controles anteriores até cleanup/400 replay. Os antigos LEDGER_COMPLETION_* permanecem exigidos. NESTA PREPARAÇÃO nenhum marker HTTPPGnovo foi executado; não emprestar dados/CI574/571 ou modelo local.

Quatro testes NOVOS das funções REAIS em apps/api/src/ledger-completion-atomicity.test.ts: vazioREADY sem transporte; positivo preservado; bindings tenant/assignment/ledger/amount/status e expectativas forjadas recusados; schema/data impossível não aceitos como vazio/positivo. Seis testes antigos preservados byte a byte exceto destructuring para importar nova função: total10PASS/zeroFAILSKIPCANCEL local viaNativeTSstrip+Function. Oito testes earnings.test.mjs da main executados SEM alterar asserts:8PASS. node--checkPASS; CLI CI=0 recusa antes de pg/HTTP. Local18PASS não é rollbackSQL/AndroidUI/rede/SecureStore/provider/produção.

CI novo esperado1365=[145Web,765mobile,441API,3CLI,11monitor], AINDA PENDENTE, não resultado. Não rerun5852 nem esconder falha anterior: run39076638325attempt1job117525041067 eattempt2job117525180707 falharam por quotaECRpostgres17 ANTEScheckout; retryespecíficoúnico consumido e sem resolução. Nova execução é justificada por novo caso funcional/novoHEAD, não tentativa de verde. Workflow/registro/imagem/CDP/Fetchguard/CORS/sandbox/LNA/deadlines/securityflags/asserts intactos.

### Recibo574 final consolidado (história, NÃO resultado do novo573)

PR574DRAFT97aa91d545df32cbcb6076b3669c3fc233dafdc3/tree333ddc4deb51fd1758cb8f00593a31afe8fb8471/parentmain3e. Dois predicados calendário/23novas regressões, baseline5PASS18FAIL→23GREEN;14old→37focalGREENinclSaoPauloTZ;288boundarychecksPASS fora da contagemCI. OwnCI39080576526/job117536501485attempt1FAIL/ZEROretry:1378=[145,788,431,3,11]unitPASS/typesbuildexportmigrationrunner2xprivacyPASS; HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual23:54:19.5174338Z; fail23:54:40.3638911Zcreatedteamrendered apósPOST201→12GETERR_ABORTED/canceledtrue/corsnull/UI12unavailable—correta. Semjob/503/recovery/reload/logout/B/fulljourneyPASS; rootUNRESOLVED/nãoAPI-CORS-vendorprovado.

OwnAPK39080576491/job117536501043attempt1SUCCESS/ZEROretry:build2026-10-17T23:59:50.6491950Z/install2026-10-18T00:01:17.7474676Z/DEVICE_SMOKE_OK00:01:30.0505171Z withoutMetro. Ambosactualcheckoutdb80b5523a8d7889c6c9c318c0b17de8b1940ba2SINTÉTICO orderedparents[main3e,97aa]/tree333digual, NÃOHEADliteral. Artifact12119106701notexpired/expires2026-11-01T00:01:31Z ZIP28912115bytes/SHA256030c9be65cd67e12addd756fead5aca9dac3b2b282acf0e1a2c1bf5f6a80a8f0; individualAPK66161616bytes/SHA2563d561dee39968483d0d54fb3a74a3d38a6c1265876ca4cb91bea16c535caef9d/SHA256SUMS/BUILDINFOcommitdb80/release/packagefixed/metrofalse conferidos. ZIP≠APK. ManifeststaticSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36/INTERNET/noexplicitcleartextnetworkconfig NÃOprova transporte/UI. 574NÃOmerged;mainAPKvalidado ainda567POST3e. Recibo integral PR574 preservado na nova evidência deste ciclo; nenhuma prova nativa de formulários/privacidade/SecureStore/físico.

### Fecho desta preparação / rastreabilidade

Arquivos funcionais alterados: scripts/ledger-completion-atomicity-e2e.cjs e apps/api/src/ledger-completion-atomicity.test.ts. HTTPshell573 já existente permanece byteidêntico; mainmobile/APIproduto/migrações/deps/lock/workflows/build/smoke intocados. Evidência LEDGER_MOBILE_REAL_JSON_2026-10-18.md +5originais/matrizappend. Requisito área6ledgerSIMULADO→complete/earningsAPI→rollbackvazio/recuperaçãopayable→loadEarningsreal→4tests+oldcontrols→CIpróprio/markers PENDENTES→evidência. Área7RLS/11API/12rastreabilidade também beneficiadas, NENHUMAaceita integralmente. Apenas10TÉCNICAINTERNOaceita12pendentes.

APK N/A SOMENTE mediante comparação integral de blobs/modes e grafo canônico expo-mobileprebuild→Gradle; não []/ausência de run/APK574emprestado. Rever todos paths/ancestrais/HEAD/base; mergeumaúnicavezexpectedSHA SÓCIcompletoSUCCESS e pósCIreal. Se falhar, manterDRAFT/semretryproduto, registrar log e avançar frente independente. Nova prova não garante resolver quota nem causaERR_ABORTED. Sem produção/PSP/dinheiroreal/providers/novosserviços/custos/credenciais/contratos/root/grants/RLSdisable/automaçãoextra/Activitymanualwrites. Próximo passo técnico: observar markers próprios no novoHEAD e fullCI; recibo final noPR antes de futura consolidação funcional append-only, sem commitautorreferente de status.



## Transações: preservar falha original e descartar cliente após ROLLBACK falho — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, paisordenados[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. Nova fatia de produto independente dos fixtures573/571; nenhum PR duplicado e nenhum gate deles importado. README e seis documentos normativos originais foram recuperados completos em refs imutáveis. FULLprefix main+histórias571/573/574/dfb2 nos cinco originais e matriz preservado NO LUGAR, por apêndice. Cinco notas históricas são mantidas pelos mesmos blobs; nenhum script/appfix/workflow de drafts é incorporado.

Defeito reproduzido nas funções REAIS DatabaseService.transaction e tenant: depois de erro em BEGIN, callback, COMMIT ou configuração do tenant, o catch faz ROLLBACK. Se esse ROLLBACK também rejeitar, substitui o erro primário pelo erro de rollback e finally chama release() normal. A reprodução usa objetos Pool/client explícitos, não rede nem banco. Não prova conexão PG real reutilizada, vazamento tenant, exploit ou incidente em produção.

24 regressões novas em apps/api/src/database-rollback-release.test.ts, sobre prototype da classe REAL: baseline14PASS10FAIL/exit1 → candidato24PASS/zeroFAILSKIPCANCEL/exit0 local via NativeTSstrip+Function. Cobrem ambos wrappers: sucessoCOMMIT/valor original; conexão recusada semquery/work/release; falhasBEGIN/WORK/COMMIT com rollback bem-sucedido ou falho; aguardar rollback pendente antes de liberar; ausência de retry de callback; valor rejeitado nãoError preservado. Quatro casos tenant adicionais cobrem falhaSETLOCALROLE e set_config com ambos resultados de rollback, sem executar callback. Anotações de fixtures respeitam strict/noUncheckedIndexedAccess/exactOptionalPropertyTypes; typecheckCI ainda pendente, não é PASS por strip.

Fix mínimo SOMENTE nas duas funções de apps/api/src/database.service.ts: variável rollbackFailed inicialmentefalse; ROLLBACK é aguardado em try/catch e sua rejeição marca descarte; o mesmo erro primário é relançado; finally chama client.release(true) SOMENTE se rollback falhou, caso contrário o release() original. Nenhum retry, novo SQL, log ou credencial. Reverse-substitution integral reconstrói a fonte main byte a byte fora dessas duas mudanças. Pool constructor/query/onModuleDestroy, assinatura, callback/valor/sucessoCOMMIT/BEGIN, SET LOCAL ROLE app_runtime e set_config('app.tenant_id',$1,true) com parâmetros permanecem intactos. Não altera política tenant/RLS/ACL, membership, role, migração, controller, endpoint/payload/auth/session ou negócio.

API oficial node-postgres https://node-postgres.com/apis/pool#releasing-clients consultada2026-10-18: release(true) instrui descarte em vez de devolver ao pool. Lockfile lido: pg8.23.0/pg-pool3.14.0/@typespg8.23.1, sem alteração/instalação de dependência. Não confundir documentação ou fixture de client com teste de banco real. Os testes compilados no CI importarão DatabaseService real com dependências existentes; local usa o mesmo source e fixtures explícitas. Nenhum pressuposto sobre falha de driver específica ou tenantleak.

### Recibo final573dfb2 consolidado neste ciclo funcional (história, não PASS do novo HEAD)

PR573DRAFT HEADdfb2ccf818274e55f348c0640ead9bc58edd7655/tree201e959b6f6762e32e22005bb16f564fe1b5e2f0/parent5852. EntregaCJSconsumeloadEarningsrealinalterado/4novosmodels+6old=10PASS e8oldGanhosPASS; nãoHTTPPG. OwnCI39084499453/job117548129772attempt1COMPLETEFAILURE,ZEROretry: quotaECRpostgres17toomanyrequestsDatalimit00:54:33.8036969Z/00:54:38.7258144Z/00:54:45.9339526Z/Dockerpullfailed00:54:45.9445280Z. InitializecontainersFAIL/Checkout+TODOSprodutosSKIPPED. NenhumcheckoutACTUAL/Chrome/DOM/PNG/HTTPPG/ProductionTruth, nenhum dos3LEDGERmarkers executado;1365 apenasESPERADO, não unitPASS. Old5852attempt1+2tambéminfra, não outroretry/registrychange. Fullfinalbody17133chars preservado integralmente na evidência DATABASE_ROLLBACK_CLIENT_DISCARD_2026-10-18.md. Não copia fixture573 ou seus10tests/HTTPshell para esta branch. APK573N/Aintegral, nenhumAPKatribuído.

### Fecho desta preparação e requisito mais próximo do aceite

Alteração funcional: DatabaseService em duas funções e24 regressões reais. Evidência DATABASE_ROLLBACK_CLIENT_DISCARD_2026-10-18.md; cinco originais+matrizappend, história íntegra. Área7PostgresRLS/tenant→DatabaseService falha de cleanup→erro primário/discard→24testes→CI/PGevidência própria PENDENTES. Áreas8falhas e11API também beneficiadas. Nenhum aceite integral: só10AndroidstandaloneTÉCNICAINTERNOaceita, outras12pendentes.

CI esperado1379=[145Web,765mobile,455API,3CLI,11monitor] (431API+24), não resultado medido. CI completo novoHEAD/revisão/merge/pósreal PENDENTES. APK N/A apenas após identidade integral de insumos mobile/packages/rootdeps/lock/workflows/build/smoke e grafo canônico expo-mobileprebuild→Gradle; não []/ausência de run/APK574emprestado. Não mudou React19.1.4/RN0.81.6/desenho/segurança/CDP/Fetchguard/CORS/sandbox/LNA/deadlines/images; browserERR_ABORTED permanece questão separada não corrigida aqui.

Próximo passo técnico: conferir todosbytes/modes/tree/ancestrais e CI próprio exato. ManterDRAFT se falhar; semrerunproduto para verde ou quota persistente, avançar item independente. Integração somente por expectedSHA/CIcompletoSUCCESS e pósCIreal. Registrar final primário noPR, consolidar em próximo ciclo funcional sem commitmetadados/autorreferência/atividade. Semprodução/Railway/Neon/serviço/custo/credencial/provider/PSP/contrato/dinheiroreal/root/grants/RLSdisable/Activitymanualwrites/novaautomação.



## Convites: rollback da promoção de manager para owner — ciclo funcional — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Estende PR571 existente na branch test/invitation-insert-rollback-20261017; parent007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb/tree49f043f544cf0a9bae2299bb686ece458a8293b1; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README, originais completos, código/controller/testes/migrações/grants e CI/APK consultados em GitHub vivo. FULLprefixmain+571+573+574+575 dos5originais/matriz preservados NO LUGAR por apêndice, não resumos substitutivos. Notas históricas preservadas pelos mesmos blobs; DatabaseService575 aindaDRAFT NÃOcopiado ou integrado.

Lacuna concreta: CompanyMembersController.accept atual suporta promoção de membership existente manager/admin→owner por conviteowner emitido por ownerreal, fazendo UPDATErole antes de UPDATEaccepted_at. PR571007 provou rollback de INSERTmembership, não promoção. Migrations0001/0004/0039/0047 autorizam UPDATEruntime já existente e mantêm RLS/FORCE, unicidade tenant/subject/identity e paraccepted_at/by; nenhum novo grant/política inventado. Esta fatia testa SOMENTE manager→owner. Não altera controller/DatabaseService/SQLproduto/auth/roles/migrações ou presume bug transacional.

Extensão scripts/invitation-atomicity-e2e.cjs DEPOIS de todos comandos/asserts/markers antigos: targetmanager já foi criado por aceiteHTTP real da etapa anterior. OwnerA emite novo conviteowner porHTTP (não seedrole). Scopephasepromote exigeUUIDtarget/priorRoleEXATOmanager e namespaceinv_promote separado. BindingHTTP↔PG comprova invitationId/tenant/ownerator/email/roleowner/hashdocódigo/ativo e UMAmembershipmanager comtenant/identity/subject exatos ANTESDDL.

HooktemporárioownedAFTERUPDATEaccepted_at exige ver simultaneamente membershipowner+conviteowneraceito exatos na transação; só então sequenceprópria1 não rollback e errocontrolado→HTTP500. Deve preservar snapshots integrais detodaslinhas invitations/memberships dosDOIStenants+RLS/policies/ACL; GETmembros autorizado continua manager e conviteowner continuaativo. Apóscleanupapenasobjetospróprios, UMAaçãoEXPLÍCITA comMESMOcódigo201 deve alterarSÓrolemanager→owner eparaccepted_at/by, semnovamembership, preservartodosoldrows/tenantB; replay400semnovadelta; PGconfirmaownhookausente. NÃOretryautomático, transferênciadeownershipinferida, emaildelivery/provider/native/produção.

Reusa todas guardasCI/localAPIportaexplícita/DBEXATOmlivretrabalho_http/socketloopback; carrega pg sóapósconfigguard. NomesrederivadosUUID/boundedemail, SECDEFsówitnessowned/search_pathfixo/schemaqualified/EXECUTEPUBLICrevogado, cleanupflags/priornamespacesinalterados/semCASCADE/ORREPLACE/grantapp_runtime/RLSdisable/root/historydelete. Osmesmos9tests antigos eTODOsourceparent fora extensão reconstruídosBYTEEXATOSporreverse-substitution, inclusivewhitespacefinal. Quatro guardmodelsNOVOS reais scope/binding/SQLwitness/cleanupPASS; total13PASS/zeroFAILSKIPCANCELlocal NativeTSstrip+Function; node--checkPASS/CLI CI=0recusouantespgHTTP. Modelos NÃOprovaHTTPPG.

Novosmarkers INVITATION_PROMOTION_UPDATE_ROLLBACK_PASS e INVITATION_PROMOTION_ATOMICITY_HTTP_PG_PASS PENDENTES até logs próprios. CI novo esperado1368=[145Web,765mobile,444API,3CLI,11monitor] (431main+13), NÃOresultadojámedido. TodosoldHTTPshell/browser/gates/asserts/deadlines/CDP/Fetchguard/CORS/sandbox/LNA/flags/imagesinalterados. APKN/A SÓapósrevisãointegralinputs/grafoexpo-mobileprebuild→Gradle, não[]/ausênciaruns/APKemprestado.

### Recibo575 FINAL consolidado (história, não resultado deste novo571)

PR575DRAFT HEAD89f799914fdcadaa75f7569b78c8483953829295/treed9ca8e85f8f2410474c18c73d85e99adbec66b72/parentmain3e. Fix2wrappersDBrollback,24regressõesbaseline14PASS10FAIL→24GREEN;mutaçãoomitirdiscard14PASS10FAILLOCAL. OwnCI39090990507/job117567517336attempt1COMPLETEFAILURE,ZEROretry:1379=[145,765,455,3,11]unitPASS/fail-skip-cancel0/typebuildexportmigrationrunner2xprivacyPASS/HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Actualcheckoutd3447a773881d73bf358476b2235882d789bcde8primary02:41:50.5247148ZSINTÉTICO[main3e,89f799]/treed9caequivalente,nãoHEADliteral.

Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual02:44:58.9839611Z. ActualONEteams503CONSUMED+11distinctGET200/unknown—/humanrefresh12NEWGET200/team1/noextraPOSTPASS02:45:01.0243014Z;Ateamjob201/render/persist12345centsdatesPASS. FAIL02:45:20.8951636Zloaded-dashboard apósPage.reload/newdocumentcompleteguard;12GETERR_ABORTED/canceledtrue/corsnull/UIunavailable—correta. Reloadsuccess/logout/B/revokedbearer/fulljourneyNOTcompleted; rootUNRESOLVED/nãoECRstartuppermissionAPI-CORS-vendorcausa. 14pathsremotebyteexact/249protectedinputsiguais→APKN/Aintegral,nãoAPK575. FINALbody12344charsreadbackexato preservadointegral na nova evidência deste ciclo. Seus5OWNdesktopPNGs+manifest agora preservados nesteCICLOFUNCIONAL com fontehead/tree/checkout/run/job/attemptFAIL próprios sob web-browser-2026-10-18; NÃOframes571/nativo/PASS emprestado. SignatureSHAbytes1365x900/Pillowverify do ciclofonte e normalizedbase64readback atuais exigidos; sem inspeção visual alegada.

### Fecho desta preparação e próximo passo

ArquivosfuncionaisCJS+APItest;5origdocs/matrizappend+INVITATION_OWNER_PROMOTION_ROLLBACK_2026-10-18.md e evidênciashistóricas vinculadas, semstatuscommitartificial. Requisitoárea4equipes/7PostgresRLS/11API→conviteownerautorizado/managerexistente→falhaúltimaescrita→rollbackrole+convite→13guardmodels+NOVOHTTPPG PENDENTE→CIpróprio/recibo. Nenhumaceiteintegral; só10AndroidstandaloneTÉCNICAINTERNOaceita12pendentes. Externos215219220224228OPEN.

CI/review/integração/pósreal aindaPENDENTES nesta preparação. ConferirnovoHEAD/tree/pais/bytes/modes/fullprefix/ownCI; mergeúnicoexpectedSHA SÓcompletoSUCCESS e pósCIreal. Se falhar manterDRAFT, registrarprimário e avançar outrafrente, sem rerunmesmoSHAparaverde. Não ready/merge/retry575/571007/573/anteriores. Semprodução/Railway/Neon/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal/Activitymanualwrites/novaautomação. Recibofinal seráPRbody e consolidado sópróximocicloFUNCIONAL, semmetadataautorreferente.


---

## Execução funcional — correlação passiva de lifecycle/requisições Web — 2026-10-18 (preparação)

EscopoexclusivoMLIVRETRABALHO. EstendePR558existente, nãoPRduplicada. Mainviva3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c incorporadacomparentordenadonormal, semforce. Preservatodo558879e todosoriginaisnoLUGARporapêndice; delta normativo57185completoapósprefixocomum éimportadoINTEGRAL, nãoresumo. ProdutoWeb/API/mobile/SQL/RLS/deps/lock/workflows/build/smoke byteidênticosamain; scripts/testsproduto de571/573/574/575 NÃOcopiados.

Entrega concreta3paths: novo scripts/web-browser-lifecycle-trace.cjs + apps/web/app/browser-lifecycle-trace.test.ts + ligaçãopassivaem scripts/web-browser-transport-probe.cjs. Lacunaeraausênciadecontextdestroy/clear eframeloaderlifecycle emstreamcorrelacionadoaNetworkrequestids. Hipótesefalsificável: observar seMESMOframe/loader apresenta transiçãoantesdos12loadingFailed; ordemrecebida NÃOcausalidade. NãoatribuirChrome/API/CORS/React/produção nemausênciadeeventoàausênciadecausa. Semcorreçãoaplicativainventada.

CollectorallowlistsemURL/header/body/token/email/stack, idssegurosnullable/workerloaderidvaziopreservado; recebimentosequence+hostepochms/browsermonotonicseconds/browserwallseconds SEPARADOS. Contextnumericreuso comuniqueidconflitantenãocorrelacionafalso. Bounds4096events1024requests256contexts comdropped/evictedexplícitos. NO comandos/HTTP/storage; probeadicionaSÓcollector,observe,enablelifecycleobservaçãoeWEB_BROWSER_LIFECYCLE_DIAGNOSTICfinalinclusiveFAIL. Baseline/log-only/native-only/instrumenteddistinguemobservadoresORIGINAIS, nãoalegamzeroobservaçãoCDP. TODOSoldguards/continuefail/loopbackHTTP/script0/deadlines/flags/securityCORSsandboxLNA/asserts e13casos+exit1stickyinalterados.

8novosactualcollector/wiringtests:7PASS1FAILantesligação→8GREENdepois; lacunadeinstrumentaçãoNÃObugproduto.25oldhelpers/shelltestsassertsinalteradosPASS; total33focalPASSzeroFAILSKIPCANCELlocal. Node--checkmodule/probePASS. NativeTSstripNode24.19.0/fixturesCDP-shapedsãoLOCAL,nãoChrome/CDP/HTTPPG/Android/SecureStore/produção. OfficialCDPcontratosprimáriosimmutáveis a07da3c859be8526571a69be9c1f3c6e91cc0a26(Page/Networkpdl+RuntimeJSON)consultados; NÃOschemaexataChromeinstalado. Reverse-substitutionreconstróiprobe879BYTEEXATOfora4adições.

Recibo57185FINALhistóricoconsolidado: HEAD85e9c992b6e7a1568b8ea865e43da63477c5f3a0/treeca88187efb97fbf1f9312ec6494b136a88e57b43, próprio39091663600/job117569533700attempt1FAILquotaECRANTEScheckout/allprodSKIP/zeroRetry.13testsLOCALPASSnãoPGproof;1368SÓESPERADO,nãotestexecutado. PromotionmarkersNÃOexecutados,nenhumcheckout/Chrome/frames85. CorpoPR57128782charsINTEGRALna novaWEB_LIFECYCLE_REQUEST_CORRELATION_2026-10-18.md,juntocomcorpo55887960388charsINTEGRAL. Assetsimportadosmantêmfontespróprias/FAILhistórico,nãocurrentframes/native;nenhumaimagemnovaalegada.

Fechopreparação: área1/2/13requisitojourney→coletorpassivo→8new+25oldlocal→NOVOHEADCI/realChrometracePENDENTES→reciboexato. Nenhumaceiteintegral; somente10TÉCNICAINTERNOaceita12pendentes,não%implementado. CIcompletoobrigatório, não[]/queued/skippedPASS; APK N/A SÓporidentidadeINTEGRALinputs/grafoAndroidcomfreshmain. MesmoisoladogreenNÃOresolve558semcausajustificada/gatesíntegros. DRAFT/noready/merge/rerun879/85/89f799;semproviderPSPproduçãoRailwayNeoncustoscredenciaiscontratosdinheiroreal/root/grantsRLSdisable/Activitywrites/novaautomação. Seinfra/browserfalhar registrarprimário ePASSARoutrafrenteindependente. FinalseráPRbodyeapêndiceSÓpróximociclofuncional,semstatusautorefcommit.


---

## Notificações — prazo de marcar como lida e ownership — 2026-10-18 (preparação funcional)

EscopoexclusivoMLIVRETRABALHO; novaentregapequenaindependente:2pathsfuncionais NotificationsScreen.tsx e30regressões notifications-write-deadline.test.mjs, base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c. PRs568/570/574/575/560 nãoalteramessaTela(sourceSHAigual);560rollbackAPI nãoé prazoUI,nãoduplicado. Semadotar/removergatesdosdrafts558/565;todosgatesDAMAINaprovadapreservadosBYTEEXATOS.

Defeitoreproduzido: read(n)operationabort-onlydeixavaUIREADY+pending1indefinidosquandoauth/fetch/JSON/finalauthnuncaresolve.30actualhandlerpreJSX+realhelpers/fixtureshooks-auth-fetch-timers:baseline14PASS16FAIL→30GREEN. Ambosprof/company,4estágios/oldACK/timer/finallyMESMAchavenovaop/blur/foco/owner/company/twosiblings/rejectedunknown/onePOST+ACKrefresh.28oldhelper+LOADcontrolsBYTEEXATOS→58focalPASSinclSaoPauloTZ;fullmobile795PASS[765old+30new],zeroFAILSKIPCANCELLOCALNode24.19.0,nãoCIHTTPRNSecureStoreAndroidfísico.

FIX: pendingReadsMapchave→ownerobjeto/owns(epoch+token)/releasePendingSÓpróprio; callbackread15sencerraowncontrollercomop.finish+pendingantesdoinvalidador,limpaheaders/lista/ERROR/mensagemUNKNOWNsomenteMESMAsourcelist. Apósawaitsomenteowns+!aborted+sourceHeadersMESMOobjetopodeaceitarresultado. SiblingACKnãorestauraexpirada;oldfinally/timernãolimpaNEWsamekey/controller. MutaçãoLOCALretirarSÓownershipcleanup→24PASS6FAILexit1,provaasssertnãopublicada. Candidatainicialexpôs8falhascontrollerregistration;op.finishnoDeadlinecorrigiu,full795GREEN. NenhumautoPOST/GET/retry noDeadline;pedidoauthpendente0POST,outros1POST;ACKválidoONEPOST+refreshoriginal. Bodylesspath/tenant/Authorization/helpersid/readAt/rejectedunknown/idempotênciaAPIinalterados.

Reverse-substitutionSOURCEINTEGRALreconstrói5479charsoriginaisBYTEEXATOS;5934cand. ForaMapeREADtodosimports/operation/LOAD/focuscleanup/JSX/nav/stylesiguais. API/SQL/RLS/ACL/roles/migrações/session/headers/React19.1.4/RN0.81.6/deps/lock/workflows/build/smokeinalterados. APK N/AÉFALSOmobilemudou: mediropróprioCI/APKnov oHEAD ebytes/install/smokesemMetro,semprovaNotifUI/SecureStore/nativeform/físico. CIesperado1385=[145Web,795mobile,431API,3CLI,11monitor]PENDENTE,nãoobservadoaqui;semreadymergeantesfullGREEN/reviewexpectedSHA+pósreal. []/queued/skippednãopass. SeCI/browserfalhar manterDRAFT/registrarprimário/avançarfrenteindependente,nãorepetirmesmoSHAparaverde.

Recibo558a8FINALconsolidadoHISTÓRICO/nãogatenovo: own39095060696/job117579674681attempt1FAIL1388unitPASS[178,765,431,3,11]/typebuildexportmigrationprivacyPASS/HTTPbrowserFAIL/PostSetupNodeSKIP/ProductionTruthposteriorNOTexecuted. Actualcheckoutfae18570e8f563f49a7bea9de72954e4d81f99e4primary03:51:24.6359052ZSINTÉTICOorderedparents[main3e,a8ba965]/tree7e8aecfa397f52e2528e596001e512de39396c1cigualHEAD,nãoHEADliteral.13actualChrome155.0.8059.39/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34,12novoslifecycletraces;13cases7PASS6FAIL/sticky1;6waves72GETabort/canceledTRUE/noCORSerror. 12requests+12failsbindsameframeloader porcase,0observedframetransition/contextdestroy-clear/lifecycleWITHINwave/dropped-evicted0. NarrowhypothesisENFRAQUECIDA,nãoausênciabrowser/framework/networkcancel/causal/vendor/API/CORS/Reactroot. MaincurrentjourneyOWN8checksPASS03:55:49.7620711Z/503consumed11GET200→HUMAN12NEW200PASS03:55:49.1143674Z;UIbaseline9checks5refresh5reloadPASS,demaisfalhasnãoborrowPASS. ZEROretryreadymergepost558.

SeuFULLbodyFINAL65296charsagoraINTEGRALemNOTIFICATION_MARK_READ_DEADLINE_2026-10-18.md;oldoriginal558normtailsINTEGRAISporapêndiceatual,notas/assets sameblobs/modesSEMoutrosdraftcodes.19desktopPNGs558a8+PR558_A8_NOTIFICATION_CYCLE_PROVENANCE.json+PR558_A8_LIFECYCLE_TRACE.jsonpreservamFONTESa8/fae/tree7e8/run39095060696job117579674681attempt1FAIL;primaryreobtido+signatureSHAbytes1365x900/Pillowvalid+remoteBASE64readbackexigido. Nãocurrentframes/RN/físico/VisualTruth/PNGemprestado. TodosoriginaisnoLUGAR,prefixosmaincompletos+caudasdivergentes558semresumos;arquivos>1MiBviaGitblobFULL,nãoarquivoAPIempty.

Área9/1/2/8requisitoprazo/resultadoincerto→readownership→30regressões+28controles→NOVOCIGREEN/APK/evidênciasPENDENTES→recibo. Nãoaceiteárea9/outbox/push/providerdelivery. Somente10AndroidstandaloneTÉCNICAINTERNOaceita12pendentes,não%code. Externos215219220224228OPEN. SemproduçãoRailwayNeon/novosserviços/custos/credenciais/contratos/providersPSP/dinheiroreal/root/grants/RLSdisable/Activitywrites/novaautomação. Fechocorrente:source+tests+evidência+5docs/matriz;próximopassomediroCI/APKdoHEADexato/revisar/únicomergeexpectedSHAapenasSUCCESS+pósreal. ResultadofinalPRbody;consolidarpróximocicloFUNCIONALsemmetadataautoref/statuscommit.


---

## Privacidade — prazo de ações com ownership e ACK preservado — 2026-10-18 (preparação funcional)

Base GitHub main25b2cf600ef47187421809e7c6e93743876a978e/tree36c6b5f4fe4d28f508cb44d6cc1dbdf74d978a34/paisordenados[3e098cd51cd2fd84f21e144a600a814a2cb1a150,56627fc346d093c4acf27939be4988b22542b393]. PR576 JÁMERGED05:01:28Z, NÃO repetir. OWNCI39098550602attempt1SUCCESS1385=[145,795,431,3,11]/OWNAPK39098550610SUCCESS; POSTCI39099109874attempt2/job117591715427SUCCESS1385/unitfail-skip-cancel0+typesbuildexportmigrationprivacyHTTP/ProductionTruth05:06:45.5144417Z. Attempt1/job117591532764ECRquotaANTEScheckout; somenteUMfailed-completedjobretryMESMOMERGESHApermitidopeloerroprimáriotransitório. POSTAPK39099109887/job117591533075attempt1SUCCESSbuild05:10:24.4538875Z/install05:11:41.5088677Z/DEVICE_SMOKE_OK05:11:53.9052008ZwithoutMetro. AmbosPOSTactualcheckoutLITERAL25b2, tree36c6; não sintético. POSTartifact12125089549ZIP28912578/SHA25669178ec46eb77d2b0193fc7b5b9476afaa5cac46f35d3db9cb637e197231a707; individualAPK66161640/SHA256e54a2a02e31d8f82cccbdad81d50fe02a4d4c696bc61936354ce89e438e6f340/SHA256SUMSexact/BUILDINFOliteral25b2releasefixedpackage/metrofalse. NovoMAINstandalonevalidado576POST25b2,não567antigo. Emulador≠telaNotificações/SecureStore/físico/piloto.

POST576realChrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34:8journeychecksPASS05:05:49.8755161Z;ONE503consumed/11otherrealGET→HUMAN12NEWGET/team1/zeroextraPOSTPASS05:05:49.2949373Z. Rootintermitente12GETERR_ABORTED dos outros runs NÃO resolvido, nãoemprestarPASSa558. Watch39099109793/39104290197SUCCESS/semmanualActivitywrite. Recibo576FINAL15827charsINTEGRALna nova evidência PRIVACY_ACTION_DEADLINE_2026-10-18.md; prepPENDINGantigapreservadanãoéestadocorrente.

NOVA lacuna REAL independente: Privacidade.operate timerabort-onlydeixava busy/pendingeternos seauth/fetch/JSON/finalauthnuncaresolve em pedido,exportação e desativação. Fonteappb2d9505f9a891fb6ce00eef34897193ed387a528;41novos actualpreJSXhandler+helpersreaishooks/auth/transporte/clear/timersEXPLÍCITOS:RED14PASS27FAIL→GREEN41. 57oldcontrols(10privacy-actions+4requests+43secondaryreads)bytes/assertsintactos→98focalPASSinclusiveTZAmerica/Sao_Paulo;FULLsnapshotmobile836/836PASS[795old+41new],fail-skip-cancel0,LOCALNode24.19.0,nãoCINode22/HTTPPG/RN/nativesession.

Fix mínimo: pendingboolean→tokenobjeto/null e owns(epoch+token);finishlimpaowncontroller/pendingAPENASdono. Timer15s invalida snapshot/sequence associada+readerror/liberabusy. Antesdeenvio0ação;depoisumPOSTouGETexportdespachado viraunknown,sem segundoenvioautomático. BarreiraunknownEXISTENTE fica atéload(true)explícitovalidado;blur/refocus nãoalibera. Nãoéprovadecancelamento/dedupedurável/novachaveidempotência. Reconciliarlista nãoafirmaqueAPIcancelouaçãoantiga,nãocriarretry.

Faseaccepting apósACKVALIDADOemcontextocorretoéDISTINTA: seGETpós-ACKtrava,preservam-se"Pedido registrado"/"Cópia gerada"/cópiaREALvalidada,comfalhadaconfirmaçãolocal;NÃOreclassificasucessoservidorcomoresultadoincerto. ApósACKdesativadavalidado,mensagem"Conta desativada" eclearSessionForAuthorizationoriginalsãopreservados;seclearlocalficaindefinido,UIencerraocupaçãoe exigeconferência,lateclear não navega/apresentaresultadoemnovaação/foco. CallbackrecebeisCurrentadicional;fila/clear nativo não removidos/atropelados. Timer/finallyantigosapósreconciliação+novaaçãoMESMOepochnãoapagampendingnovo;41testesnovosexatos.

9regressõesadversariaisprovamownership: mutaçãoLOCALretirarSÓtokencheckdofinish→32PASS9FAIL/exit1,nãopublicada/nãoCIcount. Incluídos4estágios3ações,lateACK/unknownbarrier/humanreconciliation,queuedoldtimer/oldfinally,8readpósACKpendentes,clearlocalpendente,identitychange+blur/refocus. Harnessnovo usa Boolean(pending) paraatividade(independentebooleanantigo vs token/null),semreduzirasserts;controlleréretidoantesdeexpireparaassertabort eSetdrain. FULLreverse-substitutionINTEGRALreconstrói12657charsmainBYTEEXATOSfora4regiõesexplicadas;candidate13330chars/JSXStyleSheets/imports/LOAD/protocolobody/path/auth/Alertconfirm/helpers/API/SQL/RLS/roles/grants/migrações/deps/lock/workflows/build/smokeinalterados. #574éparserhelperseparado,nãocopiado/duplicado.

Área1/2/8/12requisitoprazo/estadoincerto/ACK/sessãocorrente→operateownership/guard→41new+57controls→CIcompleto/APKprópriosNOVOHEADPENDENTES. Esperado1426=[145Web,836mobile,431API,3CLI,11monitor]AINDA NÃOobservado;[]/queued/skippednãopass. APK N/A FALSEmobilealterado; medirbuild/install/smokewithoutMetro+artifactbytes/SHA256SUMS/BUILDINFOeactualcheckoutorderedparents/tree;unit/standalonenãoprovaformprivacy/Alert/SecureStore/aparelhofísico/aceiteárea. Somenteárea10TÉCNICAINTERNAaceita12pendentes,não%code. Externos215219220224228OPEN. Nenhumready/mergeantesfullCI/APKSUCCESS+freshdiffmainbasehead+expectedSHAúnico+pósgatesreais. SeCI/browserfalha,registrarprimárioeavançaroutraitem,nãorerunmesmoSHAparaverde.

Todos6normativosoriginaisFULLprefixNO LUGAR+esteapêndice,nadaapagado/substituídoporresumo. Novaentregacódigo+testes+evidência+5docs/matriz,semstatus/activity/image-onlycommit. RecibofinalPRbody+apêndicepróximocicloFUNCIONAL. SemproduçãoRailwayNeon/novocusto/serviço/credenciais/providerPSPcontrato/dinheiroreal/root/grants/RLSdisable/novaautomação/Activitymanualwrite. Nãoépromessa24x7,nãoencerrarrotinaporfimrodada/parcial/transitório.


---

## Convites — prazo de geração com ownership — 2026-10-18 (preparação funcional)

Base main d1f814ac286bf4a2db2ce7845381e97cd16aed22/tree87540a4fe94a44471c98ff88a9363bbf73380446, pais [25b2cf600ef47187421809e7c6e93743876a978e,91f54f8a4385cd32da0b48a84ba26982cd76fa01]. PR578 já MERGED08:02:04Z; não repetir. Seu recibo FINAL17395chars foi preservado INTEGRALMENTE em INVITATION_CREATE_DEADLINE_2026-10-18.md. OWNCI39109077059attempt2SUCCESS1426/OWNAPK39109077048SUCCESS; POSTCI39109895501attempt2/job117623846125FAIL browser, apesar1426unitPASS/zeroFAILSKIPCANCEL/typebuildexportmigrationprivacyretentionPASS. Attempt1quotaECRprécheckout/único retry consumido, NENHUM retry adicional. POSTliteralD1: ONE503+11GET→human12NEWGET/zeroPOSTextraPASS08:06:16.9448845Z; depois logout201/Bsignin201→12OPTIONS204+12GETERR_ABORTED/canceledtrue/corsnull/loaded-dashboardFAIL08:06:37.2638310Z. B/fulljourney/ProductionTruthposterior NÃO completos; rootintermitente NÃO resolvido. Não emprestar ownGREEN/lifecycle558/frames. POSTAPK39109895488/job117623555565SUCCESS/LITERALD1/DEVICE_SMOKE_OK08:14:08.7587245Z, artifact12129494021: ZIP28912763 SHA2566266cc6207dc36c06ae7531806b02ded4db4892f85b4d966ec68a27739a6e1c4; individualAPK66161664 SHA256dd55b91c4408c37fafebbde0145c1fcf92db4d77302ad6c86d3372a2c8cfde40/SHA256SUMSexact/BUILDINFOliteralD1/metrofalse. CurrentMAINstandalone técnico medido578POSTD1 MAS fullCIRED; emulador≠PrivacyUI/SecureStore/físico/aceiteintegral.

NOVA ENTREGA: Membros.createInvite tinha operation abort-only; auth/fetch/JSON/authfinal que não resolvessem mantinham busy/pending após15s. 26novas regressões dos handlers REAIS pré-JSX+helpercompany-members REAL com hooks/auth/transporte/timers explícitos: baseline11PASS15FAIL→26GREEN. 67oldcontrols BYTE-idênticos(10company-members+14revoke+43secondaryreads)→93focalPASS inclusive TZAmerica/Sao_Paulo; fullsnapshotmobile862PASS[836old+26new], zeroFAILSKIPCANCEL LOCAL Node24.19.0. Não é RNrender/SecureStore/HTTPPG/emaildelivery/produção. Harness preliminar de10casos6PASS4FAIL confirmado; harness expandido corrigiu espera de fixture para provar que NOVA ação realmente iniciou, não mudança de produto para satisfazer assert.

Fix mínimo: referência createController APÓS refs existentes; owns(epoch+controller), finish drena controller e libera pending/busy SOMENTE dono, aposentando referência inclusive no prazo. Deadline15s invalida contexto/seq/lista associada e liberaUI sem novo POST/GET. Após cada await só operação corrente não-abortada aceita fatos. Timer/finally antigos não liberam NEWCREATE/NEWACCEPT/NEWREVOKE MESMOepoch; seis cenários adversariais. Draftemail/role/código de aceite preservados. 5estágios pré-secret(auth/fetch/JSON/finalauth/terceiraauth): auth0POST/outros1POST; resultado despachado incerto mantém barreira existente até load(true) explícito validado; blur/refocus não a remove. Após ACK validado+secret em contexto correto, quatro esperasGET pós-ACK preservam secret/mensagem Convite criado, NÃO falsoUNKNOWNservidor; contexto/lista expiram e só leitura explícita volta a habilitar gestão. Owner/tenant/foco distintos nunca recebem secret tardio. GET nunca recupera secret; renewal NÃO é idempotência inventada, API mantém random32/hash/7dias/advisorylock/revoga+INSERT. Não é cancelamento servidor/dedupedurável.

Escopo: APENAS app/membros.tsx criação e newtests/invitation-create-deadline.test.mjs. Comparação INTEGRAL confirma tudo fora createInvite e nova ref BYTEEXATO, inclusive load/focuscleanup/acceptInvite/saveTenantForContext/revoke/imports/JSX/StyleSheets. Fila nativa/session/helpers/API/SQL/RLS/ACL/migrações/React19.1.4/RN0.81.6/deps/lock/workflows/build/smoke intactos. Localtsconfig é adaptação de execução Node, NÃO publicado. Outros10drafts são independentes, sem copiar575/574/573/571/558/565 nem duplicar576/578. CI/APK próprios NOVOHEAD PENDENTES nesta preparação; esperado1452=[145Web,862mobile,431API,3CLI,11monitor] NÃO observado. APK N/A FALSE mobile alterado: exigir gates reais e artifactZIP≠APK/SHA256SUMS/BUILDINFO/checkout; merge apenas fullCI+APKSUCCESS/freshdiffheadbase/review/expectedSHA e pós-gates reais. []/queued/skipped nãoPASS. Se browser/infra bloqueia, registrar primário e avançar item independente, não rerunSHA para verde.

Área4/2/8 requisito convites/prazo/sessão→createownership→26regressões+67controles→NOVOCI/APK/evidência PENDENTES. Não aceite integral: somente10Androidstandalone TÉCNICAINTERNO aceito,12pendentes; não percentual de código. Externos215/219/220/224/228OPEN. Os6normativos são mantidos FULLprefix NO LUGAR+apêndice; memória>1MiB lida via SHA→fetch_blob, não APIempty. Evidência nova inclui recibo578FINAL integral, não resumo substituto. Resultado final vai PRbody/readback e próximo apêndice FUNCIONAL, sem commit autoref/status/imagem/atividade. Sem produção/Railway/Neon/custos/serviços/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/novaautomação/Activitymanualwrites. Rotina não é promessa24x7 e não se encerra por fim de rodada/parcial/transitório.


---

## Aceite de convites — prazo e persistência serializada — 2026-10-18 (preparação funcional)

Continuação COERENTE do PR579 existente, base mainD1 d1f814ac286bf4a2db2ce7845381e97cd16aed22/tree87540a4fe94a44471c98ff88a9363bbf73380446; parent579edd893ca1f72bb5304bd6ff2e2f3d8bc60f6fd2b/treed98b0c45212b999d8050dda24a61ba3d6e14cae9. NÃO novaPR/duplicata/rerun de edd para verde. Outros10drafts continuam separados; 576/578 jáMERGED/não repetir. MainD1fullCIRED578POST/native578POSTD1SUCCESS; somente10técnica interna aceita12pendentes,não%code.

Recibo FINAL anterior579 consolidado em INVITATION_ACCEPT_DEADLINE_2026-10-18.md com seu corpo10298chars INTEGRAL. CI39113288406attempt2/job117633928242FAILquotaECRANTEScheckout/TODOSprodutosSKIP; attempt1/job117633770138mesmaquota; única retry jáconsumida/não nova. NENHUMCIunit/Chrome/HTTPPG/ProductionTruth579edd;1452sóesperado. APK39113288436/job117633770355attempt1COMPLETESUCCESS: actualcheckout3953e6fec5467fc933c46d4195523280121fb1d9 primary08:55:04.8301636Z SINTÉTICOorderedparents[mainD1,edd893]/treed98igualcandidate,Gitconfirmado,nãoHEADliteral. Build09:05:54.4088341Z/installSuccess09:07:14.7144282Z/DEVICE_SMOKE_OK09:07:27.0501497Z withoutMetro. Artifact12130983560notexpired/expires2026-11-01T09:07:27Z REALdownload:ZIP28912983bytes/SHA256c02fd7a6fc85f23a870f3ca0a00de66eddb5bed80d0e869fb5c7e0ebc558db4d/APIexact; individualAPK66161596/SHA256449a4842cfb23d4e63b5d1c400aad3fba8026dab9b75d84e10eb3532158161e8/SHA256SUMSexact/BUILDINFO3953/releasefixedpackage/metrofalse/build09:05:54Z. Staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36. ZIP≠APK/emulatorinstalllaunch≠Membrosform/nativeSecureStore/physical/VisualTruth/provider/prod. APKeddNÃOatribuir a novoHEAD. ZEROready/merge/pós579.

Nova falha REAL: acceptInvite operation abort-only mantinha busy/pending infinitos em auth/fetch/JSON/finalauth/persistência/sessãofinal. Auditoria7actualmodels1PASS6FAIL confirmada; ampliada27actualhandler+helpers+createSessionQueue/persistExpectedTenant/persistVerifiedSessionREAIS com adapter explicitamente INMEMORY:RED12PASS15FAIL→GREEN27. Inclui9awaits (4request/auth+3storageREADs+storageWRITE+authpóssaved), OLDtimer/finally vs NEWACCEPT/CREATE/REVOKE MESMOepoch, owner/tenantmudando,blur/foco,unknown/role/email/unauth/noTenant,storagefailure e rollbackANTESlogin posterior. Local133focalPASS(27new+106old),TZSaoPaulo;FULLmobile889PASS[862parent+27new]/zeroFAILSKIPCANCEL/Node24.19.0. MutaçãoLOCALsóremoverownershipfinish→24PASS3FAIL,nãopublicada/nãoCIcount. Não é renderRN/SecureStore/HTTPPG/produção/aparelho físico.

Fix APENAS acceptInvite+nova ref acceptController APÓS refs existentes: owns(epoch+controller), finish drenaowncontroller/retiraREF antesliberarbusy/pending, callback15s invalida contexto/seq/reads e informa não confirmado; apósACKválido COMmesmaauth/tenant, confirmed preserva fato "aceite foi confirmado" se persistência/verificação local atrasar. Código/rascunhos mantidos,zeroPOST/GETextra. Apósawait sócurrent&&!aborted pode persistir/navegar; saveTenantForContext ORIGINAL recebe isCurrent maisestrito, fila nativa/helper/rollback originais INALTERADOS. WRITEjáemvoo NÃO écanceladonemfilaéfurada: ao resolver,guardafalsa fazrestore originalANTESnova queuedlogin, conforme algoritmojáexistente; testeordem3writesconfirma isso sóadapter. Savedantesdeadline comauthfinalpendente pode manter targetlocalvalidado mas NÃO navega; não promete desfazer writeconcluído.

Política de escrita incerta foi AUDITADA, não inventada: API consomeconvite comemail/role/tenant soblock e responseACKvinculadoao código; replay pode400, NÃO idempotência durável. Tela jápreservava código+"confira participação antes de tentar novamente" em erro finito; este comportamento e ação manual explícita são preservados, nenhum retryautomático/reconciliação nova/lockdurável/alteração API. Deadline não declara membershipcancelado, selecionado ou sucesso nativo. Não reutiliza inviteUncertain de CRIAÇÃO para ACEITE nem limpa barreira da criação. Fluxo aceito continua ONEPOST→ACK→authigual→fila→persistverified→authfinaligual→navigate. Rejeição/unknown nunca chama persist; headerstoken/tenant/payload e roleguards originais permanecem.

Comparação INTEGRAL reconstrói14952parentchars BYTEEXATOS fora2regiões(acceptInvite+newref),candidate15464;createInvite26regressõesanteriores BYTE-IDÊNTICAS, LOAD/focus/revoke/JSX/styles/imports/helpers/API/SQL/RLS/ACL/migrações/session-queue/React19.1.4/RN0.81.6/depslock/workflows/build/smoke intocados. Localtsconfig não publicado. Todos6normativos FULLmain+FULLparentPREFIX NO LUGAR append,memória>1MiBviaSHAfetch_blob,nãoAPIempty. NovoCI/APKnoNOVOHEAD PENDENTES;1479=[145Web,889mobile,431API,3CLI,11monitor] SÓESPERADO,nãoobservado. APK N/A FALSEmobilealterado; gates sóapósactualCI+APKSUCCESS/reviewfreshmainbasehead/expectedSHA+pósreais. NenhumemprestadoGREEN/cancel/ready/merge/novaautomação/Activitymanualwrites;semproduçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable. Sequota/browserfalha,registrarprimárioeavançaroutrafrente,nãorerunoldSHAparaverde. Requisitoárea4/2/8 ficoumaispróximodoaceite; nenhumaceiteintegral. FinalPRbodyepróximocicloFUNCIONAL,nãostatus/image/activitycommit.

## 2026-10-18 — PR568: efeito de calendário no ACK da tela real de disponibilidade (PREPARAÇÃO FUNCIONAL)

Fontes revalidadas: MAIN a68392c3bf8d82238f442ec6b68c023aefd751f6/tree0b7eb07dbd6353eed75be80b6acd248de1dc247c; PR568 DRAFT HEAD b7ef867464a3a529ec6e4f5518987143078f9d7e/tree178be320b8e42e2ae9d0aa8d045b7b53802ba9f9. Integração normal de MAIN no PR568 EXISTENTE, pais ordenados [b7ef,A683], sem force/PR duplicada/rerun do SHA antigo. PR576/578/579 já MERGED, não repetir. MAIN579POSTCI39118128290 e APK39118128289 SUCCESS; standalone técnico atual A683, nenhum aceite integral adicional.

Requisito área3: disponibilidade só confirma salvo e apaga formulário depois de ACK verificável, preserva rascunho perante resposta incompatível/incerta. Novo apps/mobile/tests/availability-calendar-screen.test.mjs executa o save pré-JSX REAL de apps/mobile/app/disponibilidade.tsx SHA b4eb4736896148baec684b1b4ea6a5009919696e, com submitAvailability REAL e availabilityWindow REAL. Hooks/auth/network/JSON/timers explícitos, NÃO renderRN/SecureStore/HTTPPG/aparelho físico/produção.
12 novos casos: baseline MAIN 5PASS7FAIL -> helper568 já publicado 12GREEN, 12GREEN também TZ America/Sao_Paulo. Seis negativos individualizam startsAt/endsAt em 2027-02-30,2027-04-31,2026-11-31, que Date normalizava para janelas válidas FUTURAS 02/03/2027,01/05/2027,01/12/2026 e indevidamente apagava o rascunho/afirmava salvo. Três positivos aceitam as janelas canônicas legítimas. Um conserva retry MANUAL EXPLÍCITO do mesmo payload após unknown, sem POST automático; dois conservam owner/deadline perante ACK tardio incompatível. API retorna timestamps PG e possui ON CONFLICT(professional_id,starts_at,ends_at) já existente; não alegamos timestamp impossível real PG, exploit, nova idempotência/barreira durável/cancelamento servidor.

Produto NÃO ganha novo parser nem alteração de tela. Reutiliza BYTEEXATOS os sete helpers JÁ PUBLICADOS568 (availability-submit/company-job-publication/company-members/company-replacements/conversation/professional-support/support-intent), cinco arquivos/60testes568 e seis scripts/gates existentes568. Apps Disponibilidade/Membros579/Privacy578/Notifications576/Conversa MAIN e 12 controles antigos availability-screen-deadline BYTEINTACTOS. Preserva auth/tenant/UUID/payload/ACK/rejected/unknown/15s/manualretry/current/foco/JSX/styles/fila/session/API/SQL/RLS/ACL/migrações/React19.1.4/RN0.81.6/deps/lock/workflows/build/smoke. Não copia 574privacy,581Conversa,575DB,573ledger,571fixture,558instrumentação ou572registry.
LOCAL 84focal=[12new+12oldavailabilitydeadline+60old568] PASS, também TZ SaoPaulo; 96focalmaisoutrocalendar preexistente PASS; FULLmobile961PASS=[889main+60old568+12new], fail/skip/cancel0/Node24.19.0. Comparação local 162 existing/reused mobileblobs BYTEEXATOS; tsconfig local adaptado é EXCLUÍDO da publicação. Primeira instalação local removeu whitespace final em três helpers; corrigido antes publicação, hashes de todos12sources/testsold568 exatos. Sem assert antiga alterada. Todos scripts/gates568 são os blobs antigos, MAIN nesses paths era igual ao mergebase3e; preserva integralmente browser/503humanrecovery/Fetchguard/CDP/CORS/sandbox/LNA/deadlines/flags/asserts/imagens. Segurança não relaxada.

Normativos: seis FULL568PREFIX preservados NO LUGAR; FULLMAINmissingtail após último prefixo comum de LINHA acrescentado, manifest offsets/chars/blobs em docs/evidencias/AVAILABILITY_CALENDAR_SCREEN_EFFECTS_2026-10-18.md. Prefixo comum + segmento anexado reconstrói FULLMAIN BYTEEXATO; NÃO afirmar FULLMAINprefixcontíguo onde ramos divergiram. Memória>1MiB via treepathSHA→fetch_blob FULL, não APIcontentsEMPTY. Old568notes/assets continuam mesmos blobs/história/proveniência, não frames/PASS atuais. Nota nova preserva FULLold568PRbody27886chars e FULL574FINAL13804chars.

Consolidação5744770: CI39133014687attempt2FAILquotaECR ANTEScheckout em ambas tentativas, uma retry já consumida; nenhum produto/teste/Chrome novo executado. OWNAPK39133014704/job117691848889attempt1SUCCESS, checkoutb4f034ba23fb0e2fb0d4a8c4ead0c38a830a1576 SINTÉTICO orderedparents[A683,4770]/treec497 igual candidata confirmado Git, NÃO literal. Build13:56:56.3097811Z/installSuccess13:58:16.0210897Z/DEVICE_SMOKE_OK13:58:28.4949348Z withoutMetro. Artifact12139200939 expires2026-11-01T13:58:29Z download REAL ZIP28912892bytes/SHA25624093e019faec31588022fb6c99192c479c14c8c64ee22b7e7561bc81e98a791 APIexact; APKindividual66161708bytes/SHA256c3ba2c3db2e35fd4636918ca85e7ec276ab0e87ef30422198f4018d435538220 SHA256SUMSexact/BUILD_INFOb4f034/release/fixedpackage/metrofalse/build13:56:56Z. Staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36 ≠ transport/UIproof. ZIP≠APK; nãoPrivacyform/Alert/SecureStore/nativequeue/physical/VisualTruth/565offlineentry/produção. 574 segueDRAFT CIRED/nãoMERGED. FULLfinal574body gravado/readbackEXATO e preservado na nota funcional; não commit só status.

Novo CI/APK OWN no NOVO HEAD568 ainda PENDENTES neste apêndice de preparação. Esperado1551=[145Web,961mobile,431API,3CLI,11monitor] NÃO observado. APK N/A FALSE mobile alterado; todos gates próprios SUCCESS + freshdiff/main/base/head/expectedSHA obrigatórios antes merge e CI/APK reais pósmerge. Sem emprestar old568/574/581/579PASS/frames. Root12GET ERR_ABORTED segue UNRESOLVED; neste momento nenhum Chrome novo deste candidato. Se infra/browser bloquear, referência primária + avanço independente, não rerun mesmoSHA para verde.
Só10AndroidstandaloneTÉCNICAINTERNO aceita,12pendentes; não percentual código. Externos215219220224228OPEN fresh. Watch569 agora CLOSED/completed 2026-10-18T05:01:41Z; não agentstopped inferido nem issuewrite manual. Única rotina enabled/scheduleinalterados, sem outra/disableparcial/transitório. Sem produçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/Activitymanualwrites. Próximo passo: próprios CI/APK + inspeção literal/sintética/bytes; FINAL no PRbody e próximo ciclo FUNCIONAL, nunca selfref/status/image/activitycommit.

## 2026-10-18 — confirmação de candidatos: prazo e ownership (PREPARAÇÃO FUNCIONAL)

MAIN revalidada a68392c3bf8d82238f442ec6b68c023aefd751f6/tree0b7eb07dbd6353eed75be80b6acd248de1dc247c; 576/578/579 JÁ MERGED, não repetir. MAIN579 POSTCI39118128290 SUCCESS1479+8browser/503humanrecovery/ProductionTruth e POSTAPK39118128289 SUCCESS literalA683 continuam válidos APENAS nesse escopo. Só10AndroidstandaloneTÉCNICAINTERNO aceita,12pendentes, não percentual código.

Requisito área5/matching: confirmação humana explícita não mantém UI "Confirmando..." indefinidamente quando credencial/HTTP/JSON/verificação final não resolvem; um resultado desconhecido não autoriza novo POST com snapshot antigo; ACK já validado permanece factual se apenas refreshGET posterior trava. Fresh actualCandidatos SHA8d55eec398255ddf5d43379f01a78fa6a59bdc53/REALcompany-candidates d042f8221b70cca7c984138d941f185d94c89ba5/REALrunForSession lidos. API CompanyJobsController e888c6a6db28bd3f48223f150a5895ffc6c26d9c +confirmationDecisiondf1a6b7587b201bd55f8567876db5a9a2d127064: auth/tenantrole→joblock→activeinterest→existingconfirmedreplay ou lifecycleconflict, membership/assignment/notification numa tenanttransaction. Não novo contratoAPI/idempotência durável/retry implícito/cancelamentoSQL.

24novos apps/mobile/tests/candidate-confirm-deadline.test.mjs executam handlers REAIS pré-JSX+helpers reais, hooks/auth/fetch/JSON/timers explícitos. RED MAIN4PASS20FAIL→GREEN24. Inclui5waits preACK(auth/transportauth/fetch/JSON/finalauth),2pósACKchildGETfetch/finalauth,6oldtimer/finally vs NEWconfirm MESMAgeneration,2parentstale vs NEWactualselectionREAD MESMAgeneration,3blurrefocus+freshjobsreads,3ACKincompatíveis UUID/tenant/professional,1positiveONEPOST+refresh,1synchronousstalesnapshotguard,1loop20açõesEXPLÍCITASexpiradassemcontrollerspendentes/semPOST. As reconstruções de snapshot para adversarialSAMEgeneration são fixtures explicitamente instaladas (NÃO prova refreshAPI/React). 60focal=[24new+36oldcandidatecontrols]PASS/24TZSaoPauloPASS/FULLmobile913LOCALPASS=[889main+24new]/fail-skip-cancel0/Node24.19.0. MutanteLOCALretirarSÓownershipfinish→21PASS3FAIL, restaurado/nãoCIcount/nãopublicado. Não RNrender/SecureStore/HTTPPG/physical/heapexhaustion/tenantleak/produção.

Fix APENAS Candidatos: nova confirmController ref APÓS6refs existentes; owns(generation+controller), source guardcapturaselectionversion/id+contextreference e abortstate; finishSÓdonoretiraREF ANTESliberarpending/busy. Deadline15sabort+drainparent/ownedchildtimercontroller e invalida context/jobs/selecteddata SINCRONAMENTE antesunlock. Isso exige verificação manual atualizandotrabalhos, sem autoGET/POST. OLDtimer/finally não atinge NEWconfirm/read na mesma geração, nem novo foco. PósACKverified+authigual, confirmed preserva mensagem "Profissional confirmado." se filhoGETtrava; UNKNOWN não vira cancelado nem confirmado. LateACK não restaura estado/lista expirada. selectJob ganha APENAS callback opcional que entrega cleanup próprio ao pai; todosguardas/read/deadlines antigos permanecem, sem abortar leitura não pertencente. REQUESTbody/path/professionalId/tenant/auth/ACKUUID/status/currentcontext/finiteunknown/manualpolicy mantidos; um POST por ação explícita. Fila/sessão/helper/API SQLRLSACLmigrations/UIJSXstyles/depslockReact19.1.4RN0.81.6/workflows/build/smoke intocados. Reverse INTEGRAL fora5regiões(ref/blur/selectsignature/cleanupcallback/confirm) reconstrói10623maincharsBYTEEXATOS, candidato11574. 156existinglocalmobileblobs SHAiguais exceto appalterado+tsconfigLOCALadaptadoNÃOPUBLICADO. Limpeza de leftovers de testes568 fora da whitelist local antesFULL913; não reduzir assertivas ou apagar históricosGit.

Esta frente INDEPENDENTE não duplicaPR568calendar/581Conversa/574Privacy/575DB/573ledger/571SQL/558diagnostic/572registry. Não copia NENHUM produto/teste/fixture dessesdrafts. Só main+Candidatosfix+24tests; seisnormativos FULLmainPREFIX NO LUGAR appendlatest568missingtail+novoapêndice, não resumidos. Manifesto em docs/evidencias/CANDIDATE_CONFIRM_DEADLINE_2026-10-18.md permite reconstruirFULLlatest568 com commonfull-lineprefix+tail; memória>1MiB treepathSHA→fetch_blobFULL, APIcontentsEMPTY não emptyfile. FULL568FINAL43442chars preservadoINTEGRAL na nota, sem status-only/selfref/activitycommit.

Consolidação 568a563: CI39138035113/job117706473278attempt1FAIL1551unitPASS/browser,zero retry. Actual6450352581a2ed851f386a12a10e69de781c7652SINTÉTICO[A683,a563]/tree6cbeigualhead. Actual24GET200 e teamPOST201→UMPOSTcompany/jobsERR_ABORTED/canceledTRUE/corsnull/semACK201/unknownpublicationcorreta, NÃO12GETabort neste run. Causa intermitenteUNRESOLVED, sem558trace/newcausaAPI-CORS-vendor. 503/recovery/reload/logout/B/full8/ProductionTruthnãoexecutados. SegurançaCDPFetchguardCORSsandboxLNAdeadlinesflagsassertsimagesintactos.
OWNAPK56839138035121/job117706473372attempt1SUCCESS/checkout6450primary14:53:54.2309796ZSINTÉTICO confirmadoGit/Build15:03:58.0643608Z/installSuccess15:05:12.4351792Z/DEVICE_SMOKE_OK15:05:24.8376117ZwithoutMetro. Artifact12140916922expires2026-11-01T15:05:25ZREALdownloadZIP28912804/SHA25675a1dd6de734c5c7605af4cdebe5bdcef20f834711cc04fe77e9ecf00217045eAPIexact;individualAPK66161804/SHA256f88dd805384b840e3ebb0dbfd25938e90cf390dc1e572e1c8d464bcecf74725a/SHA256SUMSexact/BUILD_INFO6450/releasefixedpackage/metrofalse/build15:03:58Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. DownloadsparciaislocaisforamREJEITADOS; finaltransfernormalexit0 hash/tamanhoAPIexatos. ZIP≠APK;installlaunch≠nativeform/keyboard/SecureStore/físico/VisualTruth565/prod. 568continuaDRAFTCIRED,nãomerge/rerunoldSHA; ownAPKgreennãoautoriza.

NOVOSOWNCI/APK PENDENTES neste apêndicepreparação.1503=[145Web913mobile431API3CLI11monitor]SÓESPERADO,nãoobservado. APK N/A FALSEmobilealterado; ownCI+APKSUCCESS/freshmainheadbase/diffreview/expectedSHAONLY antesmerge e pósCI/APK REAIS obrigatórios. SemGREENemprestado/CIrerunpara verde. Seinfra/browserfalhar, primáriolog+avançoLOCALindependente, nãoestagnaremstatus/mesmolog. Nenhuma área nova aceita por testes locais/APK.
Externos215219220224228OPEN/Watch569CLOSEDcompleted05:01:41Zfresh,semmanualActivityissuewrites. Rotinaúnicaenabled/scheduleinalterados/novaautomação0/nãodesativarparcialtransientfimrodada. SemproduçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable. Próximo técnico: ownCI/APK do NOVOHEAD e revisão primária; FINAL noPRbody/nextFUNCTIONALconsolidação, nuncacommitautorreferente/status/imagem/atividade.


---

## Ganhos — limpeza dos recursos próprios no prazo — 2026-10-18 18:55 UTC

Entrega funcional exclusiva dbdanielbaracho/MLIVRETRABALHO, base MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1/treecfac8574100022a5b576efade556920a7e282f0c. PR582 JÁ MERGED16:10:28Z; não repetir ready/merge. Recibo FINAL582 integral preservado em docs/evidencias/EARNINGS_CONTROLLER_CLEANUP_2026-10-18.md junto desta entrega; histórico normativo original permanece prefixo FULL no lugar, apêndice apenas.

Requisito→código→prova: área6 leitura Ganhos e áreas1/11/13 contexto/recursos/gates. O prazo de leitura15s já mostrava ERROR/— corretamente, mas controller expirado e listener próprio do focusSignal ficavam registrados até auth/fetch/JSON/auth final resolver. Não afirmar busy/loading eterno, heap exhaustion, vazamento tenant ou defeito financeiro/SQL. Nova regressão executa handler REAL Ganhos pré-JSX e helpers REAIS loadEarnings/runForSession, com hooks/auth/fetchJSON/clock e wrapper de AbortController/AbortSignal Node EXPLÍCITOS para observar listeners. Não render RN/native/SecureStore/HTTPPG/conta ou dinheiro real.

Antes18novos=2PASS16FAIL na fonte d08f4f9f9f10709130a1ab4af8a49f8367657fdd. Fix APENAS apps/mobile/app/ganhos.tsx acrescenta controllers.current.delete(controller) e focusSignal?.removeEventListener('abort',cancel) no callback do prazo existente após abort. Identidade controller/cancel capturada na closure; finally original permanece idempotente. Nenhum clear global ou aposentadoria de controller de outra leitura. Reverse FULL removendo somente88chars adicionados reconstrói5693chars MAIN byte-exatos (candidate5781chars). Nenhuma mudança em 15s, UI/JSX/styles, handlers de foco, guards requestId/generation/owner, parser/helper/date/totais/status, GET /earnings/mine/headers, política retry manual, API, SQL/RLS/ACL, sessionqueue, React19.1.4/RN0.81.6/deps/lock/workflows/build/smoke.

Nova apps/mobile/tests/earnings-controller-cleanup.test.mjs:18GREEN,54focal=[18new+28primary-read-deadline+8earnings]PASS,18TZAmerica/Sao_PauloPASS. FULL931mobile LOCAL=[913MAIN+18new]PASS/0fail-skip-cancel/Node24.19.0. Cobertura4stages ainda pendentes, listener e registry zerados antes da dependência resolver;2positivos JSONvazio/payable;4oldfinally vsNEWREAD mesmo foco;4oldtimer repetido vsNEWREAD/success mesmo foco;2blur/refocus;20tentativas EXPLÍCITAS transportependente, registry/listener bounded;1trocaowner/JSONtardio. ZeroPOST/retryautomático. Fixtures de callbacks antigos são adversariais, não evento RN/servidor real. Métodos e asserções dos36controles antigos byte-exatos. Nenhum código/fixture de drafts568574581575573571558572 copiado. Isolamento LOCAL restaurou7helpers MAIN e retirou6 cópias scratch de testes568 do glob (recuperáveis no PR568/next-audit/Git), não arquivos do repositório: primeira tentativa full local contaminada foi rejeitada; somente931 posterior atribuído. Tsconfig LOCAL adaptado não publicado.157de159blobs mobile existentes iguais exceto Ganhos e tsconfigLOCAL; este último não entra no commit.

Estado CI/APK da NOVA entrega PENDENTE nesta preparação.1521=[145Web931mobile431API3CLI11monitor]é apenas esperado, NÃO observado. APK N/A FALSE mobilealterado; ownCI+APKSUCCESS/headbasefresh/allpathsreview/expectedSHAONLY antes de merge, depois CI/APK REAIS no merge. Sem PASS emprestado. Falha infra/browser→primáriolog e frente independente, não rerun porverde. FINAL posterior no PRbody e próxima entrega funcional, nunca commit só status/autorreferência/imagens/atividade.

MAIN582 POST: CI39143803021 attempt2/job117759295057 FAILURE ECRquotaANTEScheckout18:50:43.1176973Z/52.6021549Z/58.7999293Z, Dockerpullfailed18:50:58.8101634Z. Initialattempt1/job117723430111 mesmaquota16:10:35.4776235Z/38.0780919Z/39.8340248Z; UMA retry específica já consumida, não outra. Todos produtosSKIPPED/semcheckoutCI/Chrome/HTTPPG/ProductionTruth/unitPOST, não emprestar own1503GREEN. POSTAPK39143802991/job117723429927 attempt1SUCCESS/actualcheckoutLITERAL75105 primary16:10:39.3955535Z/build16:21:09.7501762Z/installSuccess16:22:34.1093158Z/DEVICE_SMOKE_OK16:22:46.7334253ZwithoutMetro. Artifact12142183907/expires2026-11-01T16:22:47Z REALZIP28913032bytes/SHA2562d954eb6866fa782dedfc9fd5f74a18131ff1be942ea0151c99045b8078e93afAPIexact;individualAPK66162152bytes/SHA2568bd6c326090ea6bdaceb30f851cba9cddc6f1ffcd85e806be5a367f821c9af17/SHA256SUMSexact;BUILD_INFOliteral75105/releasefixedpackage/metrofalse/build16:21:10Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠matching/Ganhosform/SecureStore/physical/VisualTruth/prod. Mainstandalone técnico atual582POST75105 MAS MAIN FULLCIRED.

Browser: root intermitente558ERR_ABORTED NÃO resolvido; POST582 não executou Chrome, não observar novos aborts onde houve SKIP. Evidência568a563 primária anterior observou POSTjobsabort com24GET200 eZEROGETfalho, não restringir causa aos12GET nem inferir CORS/API/vendor/framework; nenhuma instrumentação558/zeroNav emprestada. Controles CDP/Fetchguard/CORS/sandbox/LNA/flags/prazos/asserts/images originais intactos.

Matriz: apenas área10Androidstandalone técnica interna aceita,12semaceiteintegral; não percentual código. Fechamento da área6 exige ledger/split/rollback/reembolso/saldo negativo+CI/evidências completos, NÃO satisfeito por limpeza UI. Externos215219220224228OPENfresh;Watch569CLOSEDcompleted,semmanualActivityissuewrites. Outros11drafts581575574573572571570568565560558preservados, ownCIred e APKsescopados, não rerunoldSHA/novaPRduplicada. Rotina únicaenabled/scheduleinalterados/novaautomação0/nãodesativarparcialtransientfimrodada. SemprodRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable. Próximo passo técnico: novoHEAD ownCI/APK e revisão completa; se bloqueado, auditar recurso de leitura independente com contrato/RED, não atividade artificial.


---

## Trabalhos — prazo do envio de interesse e propriedade por operação — 2026-10-18 19:53 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1/treecfac8574100022a5b576efade556920a7e282f0c. 576578579582 já integrados, não repetir ready/merge. MAINFULLCIRED582POSTquota; standalone técnicoMAIN582POST75105 já verificado. Outros drafts preservados. Esta entrega NÃO integra produtoGanhos584 nem outros códigos/fixtures de drafts.

Requisito áreas3/5/1/11/13: botão QUERO TRABALHAR não fica ENVIANDO indefinidamente enquanto credencial, fetch, JSON ou auth final não resolvem após prazo15s. Reconsulta de APIJobsController185be30435f34dc270461fefce284a37ac7a3b5e: exige identidade/profile/jobUUID/marketplacejobopen; ONCONFLICT(job_id,professional_id) conserva confirmed; GETinterest autenticado existe. Não mudar contrato, privilégios ou transformar retry manual já existente em replay automático/idempotência durável inventada. Sem novos GET/POST por timer.

Prova RED→fix:6modelos originais2PASS4FAIL reexecutados no actualTrabalhos a0f7fab92434aa1d7e8d8fb22e8766991b5f04d4 + REALloadJobs/sendInterest/runForSession; expansão28novos=11PASS17FAIL na mesmafonte antespatch. Apósfix28GREEN,62focal=[28new+28primary-read-deadline+6jobs]PASS;28TZAmerica/Sao_PauloPASS;FULL941mobileLOCAL=[913MAIN+28new]PASS/0fail-skip-cancel/Node24.19.0. Fixtures EXPLÍCITAS hooks/auth/JSON-clock, não renderReactNative/HTTPPG/SecureStore/native/produção/servidorcancellation. MutanteSÓLOCALinmemoryremoverMaptokenownership→20PASS8FAIL, nãopublicado/nãoCIcount.

CódigoAPENAS apps/mobile/app/trabalhos.tsx: ref interestControllers Map porjob criada APÓS4refs originais; owns=geração+identidadecontroller; current também exige !aborted e displayedAuthorization original. Prazo15s aborta controller próprio; somente contexto/operação correntes invalidam autorização/lista e publicam mensagem não-confirmada original, sem falseACK. finish aposenta Map/controller/pending ANTESunlock, é idempotente e verifica token, assim oldtimer/finally não removem NEWinterest MESMOjob/MESMOepoch. Contexto expirado também não permite concurrentotherjob lateauth iniciarPOST nem ACKtardio restaurar sucesso; cleanup de foco limpa Map junto do Set original. Operações em outros jobs conservam sua propriedade até finish próprio, sem clear indiscriminado. Depois do prazo, retry só após atualização humana original; callback/ACK válido oportuno interested/confirmed e política de erro de ACK inválido preservados. Não prova cancelamento servidor/nova barreiradurável/rollback/memóriaexaurida/tenantleak.

28regressões:2ACKpositivos/bodylessPOST/headers;4awaitstagesdeadline+filtrosmantidos;4oldfinally+4oldtimerNEWsamejob/SAMEepoch;2oldresponse/newfocus;1oldtimer/newread;2concurrentotherjobauthJSONstale;1twocurrentjobspositive;2ownerchanges;3incompatibleACK;1manualrefreshretry;1duplicateclick;20refresh/write explícitos com registrydrain. SAMEepochsnapshot é instalação adversarial EXPLÍCITA de fixture, NÃO GET/RNrender real. Helpers/jobs54d0814ace6e91565e0fa9c8722ea734594b015f e sessioncontext8a23f577cf222016694d6995822b632c0a71434f +34oldcontrols BYTEEXATOS. ReverseFULLfora5regiões reconstrói8254MAINcharsBYTEEXATOS(candidate8818). Requestbodylesspath/method/authheaders/ACKfields/UUID/profile/serverUPSERT/GETread/focusdeadline15s/querycategory/UIJSXstyles/handlersread/helpers/sessionqueue/API SQLRLSACLReact19.1.4RN0.81.6depslockworkflowsbuildsmoke intocados foraownscope.

Isolamento LOCAL:158MAINmobileblobs inicialmenteexatos exceto tsconfigLOCALadaptado, não publicado; apósfix157exatosexcetoTrabalhos+tsconfigLOCAL. Scratch antigos568 reapareceram no glob e a tentativa full contaminada foi REJEITADA. FULL941 atribuído somente à execução dos78paths de testes canônicos da árvoreMAIN+newtest; nenhum testeMAIN excluído/corpo modificado/assert relaxada. Nenhum Ganhos584/code568574581575573571558572 copiado.

Governança integral: seis normativos preservam FULLprefix584(branch90cc) que já começa com FULLMAIN75105; apêndice novo somente. Comprovação startsWith byteexata de ambos. NotaEARNINGS_CONTROLLER_CLEANUP_2026-10-18.md de584 reutilizada MESMOBLOB910545fa26432b9a5135db094d8baa38c41b7070 para preservar links/history; novaINTEREST_SCREEN_DEADLINE_2026-10-18.md preserva FULLFINAL58417369chars, inclusive auditLOCAL eprep anteriores. Não substituir originais por resumo/autoref/status/imagecommit. Memória>1MiB usarTREEpathSHA→fetch_blobFULL; contentsEMPTY não arquivo vazio.

584FINALgates: CI39156391666/job117760377495attempt1FAILquotaECRpostgres17ANTEScheckout18:55:36.4501679Z/43.4943406Z/53.3231549Z/Dockerpullfailed53.3326733Z, todosprodutosSKIP, ZEROretry/nãooutropara verde. OwnAPK39156391656/job117760377578attempt1SUCCESS actualcheckoutcedf110d819e78f53de4068c1a64a660215faaf9primary18:55:43.2093817Z SINTÉTICO[75105,90cc]/treed16d039ba48e5c5ccc379b75e48ade07fcc0a87f Gitconfirmadoigualcandidate. Build19:04:41.9710947Z/installSuccess19:06:23.4992537Z/DEVICE_SMOKE_OK19:06:35.8548384ZwithoutMetro. Artifact12147238228expires2026-11-01T19:06:36Z REALZIP28913017bytes/SHA256d58c7b27b6b264a7a4a5919fccca504f7e11fb9618bd44f43baa278076b68ca6APIexact;individualAPK66162212bytes/SHA256553c3b89981c4909e6b5e8ab052fc90e8efa68b401304ea74a79df75fe9bd77e/SHA256SUMSexact/BUILDINFOcedf/releasefixedpackage/metrofalse/build19:04:42Z/staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36. ZIP≠APK/installlaunch≠Ganhosform/SecureStore/nativequeue/physical/VisualTruth/prod. 584DRAFTNOTMERGED CIREDproíbemergeAPKGREEN; FINALbody17369charswritten/readbackEXACT. NÃO584MAINAPK/nãorepetirreadymerge.

NOVOOWNCI/APK PENDENTES nesta preparação.1531=[145Web941mobile431API3CLI11monitor]SÓESPERADO,nãoexecutado. APK N/A FALSEmobilealterado; sóownCI+APKSUCCESS noSHA/contextoGit correto+freshMAIN/headbase/fullreview permitemexpectedSHAmergeONCE, depoispostCI/APKreais. NenhumPASSemprestado/retryrunning/cancel/bypass. Seinfra/browserfalhar, primário e independenteLOCAL, não rodadastatusonly/mesmologrerun.

Browserroot558ERR_ABORTED continuaUNRESOLVED;584CI nãoexecutouChrome, nãonovosabort/PNG/zeroNavatribuídos. Hipóteseestreitacontextotransition dentroondas já enfraquecidapelo558, não causaprova.568tambémobservouPOSTabortcom24GET200/ZEROGETfailed; não restringirroota12GET/API/CORS/vendor/framework. GuardCDPFetchCORSsandboxLNAdeadlineflagsassertsimages intactos. Sóárea10Androidstandalone TÉCNICAINTERNOaceita12pendentes/não%code; área3/5 não fechada por esta correção parcial. Externos215219220224228OPEN/Watch569CLOSEDcompletedfresh,semmanualActivitywrites. Rotinaúnicaenabledscheduleinalterados/novaautomação0/nãodesativarparcialtransientfimrodada. SemproduçãoRailwayNeonserviçoscustoscredenciaisprovidersPSPcontratosdinheirorealrootgrantsRLSdisable. Próximo: gates doNOVOHEAD e revisão completa; FINALmetadata+próximaentregafuncional, nunca commitapenasstatus.


## 2026-10-18 — PR #570: prazo/ownership da busca de substituto (preparação funcional)

Requisito → código → teste: área de substituições/matching; a busca explícita de recomendação precisa encerrar a espera local aos 15 s, invalidar autoridade expirada e não afetar a próxima ação. MAIN de referência 75105d42c873ca56b58fa1aa73cc4a682359e5c1; integração normal no PR #570 existente, antigo HEAD 2205e2dcef0aa79e3ce9a96c4a0dd1eee649eb3a. Sem force, nova PR duplicada ou rerun do SHA antigo.

Entrega real: apps/mobile/app/substituicoes.tsx recebe actionController após as seis refs existentes, ownership generation+controller, retirada da ref ANTES de pending/busy e callback SOMENTE para action('match') no prazo original de 15000 ms. Callback invalida snapshot/sequence/dados/recomendações, conserva motivos digitados, drena operação própria e não envia GET/POST. Atualização manual explícita e validada recupera autoridade. Timer/finally antigos não liberam nova busca, criação ou seleção no mesmo foco; blur aposenta ownership. Guardas posteriores preservam contexto e origem do snapshot. Criação/seleção mantêm timeout abort-only anterior: esta entrega NÃO corrige nem aceita seus prazos. Nenhum novo parser, retry automático ou alteração de payload/ACK/API/SQL/RLS/ACL/React/RN/lockfile/workflows/Chrome/CORS/Fetch guard/CDP/deadlines.

Correção factual de histórico: o #570 original altera SOMENTE validador de datas calendáricas e acrescenta dois testes. NÃO altera tenantId no ACK/select. Preservados byte a byte helper 7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6 e teste 456bdc4dd6a3ca86e36e7289b1d39eb960342833; os 11 testes anteriores permanecem prefixo integral e os dois calendáricos permanecem integrais. Metadados #585 corrigidos sem apagar histórico; recibo completo na nota vinculada.

Prova local nova: apps/mobile/tests/replacement-match-screen-deadline.test.mjs, 27 modelos do handler pré-JSX REAL + helper REAL, hooks/auth/fetch/JSON/timers explícitos. Baseline MAIN+helper570: 16 PASS/11 FAIL → 27 PASS após fix. Quatro awaits (auth/fetch/JSON/auth final), casos positivos ready/empty bodyless POST, timers/finally antigos vs NEWmatch/CREATE/SELECT no mesmo foco, blur/refocus, contexto tenant, ACKs incompatíveis, atualização manual, vinte buscas pendentes explicitamente iniciadas. Snapshot novo SAMEepoch é fixture explícita, não prova de API/render. Focais 42 PASS = 27 novos +13 helper570 +2 ACKUUID; fuso São Paulo 42 PASS. Full móvel canônico 942 PASS = 913 MAIN +2 calendáricos570 +27 novos, UTC e America/Sao_Paulo, 0 fail/skip/cancel. 79 caminhos explícitos; cópias scratch não canônicas excluídas, nenhum teste MAIN omitido. Verificador: 155 blobs móveis existentes iguais; diferenças APENAS Substituicoes/helper570/test570 e tsconfig LOCAL adaptado, este último NÃO PUBLICADO. Fora cinco regiões do app, reversão reconstrói 10967 caracteres MAIN byte exatos; candidato 11455 caracteres. Typecheck local indisponível (tsc/dependência ausente), NÃO PASS; CI obrigatório preservado.

Limites: modelos Node/adapter fixtures não são RN render, SecureStore, HTTP/PostgreSQL, dispositivo físico, cancelamento no servidor, garantia de memória ou aceite integral. API auto-match é ranking sem escrita/seleção; create/select são contratos distintos intactos. Somente área 10 standalone tecnicamente aceita internamente; 12 áreas pendentes, sem percentual de código.

Gates novos deste HEAD: CI/APK próprios PENDENTES neste apêndice histórico de preparação. 1532 testes agregados apenas ESPERADOS [145 Web,942 mobile,431 API,3 CLI,11 monitor], não executados ainda em CI. APK N/A FALSE. Não ready/merge antes de CI completo SUCCESS + APK SUCCESS e revisão fresh HEAD/base/todos paths/modes; após merge verificar CI/APK reais do merge. Não emprestar PASS antigo2205, 584 ou585. MAIN full CI continua RED582POST quota antescheckout; APK standalone MAIN validado582POST75105.

Histórico recente: #585 f3e3 CI39160905472a1 FAIL HTTP/browser após 1531 unidades PASS; signout POST ERR_ABORTED após OPTIONS204, 71 GET200+1 GET503 controlado e zero GETfailed; sem ACK201/revogação remota/B/full8/ProductionTruth. APK39160905491a1 SUCCESS com bytes e checkout sintético68082. #58490cc CI39156391666a2 quota antescheckout após UMA retry justificada pelo pull postgres17 novo do #585; orçamento consumido, sem outro rerun. APK584 SUCCESS sintéticocedf. Recibos FULL nas notas/PRs. Root browser permanece NÃO resolvido, segurança intacta. Sem produção, serviços, custos, PSP, contratos ou dinheiro real.

Próximo passo técnico: observar primários CI/APK deste novo HEAD; se produto/browser falhar, registrar log e seguir auditoria independente sem rerun cego. Consolidar FINAL em metadados do PR e somente próxima entrega FUNCIONAL nos normativos, sem commit de status/selfref/imagens/atividade.


## 2026-10-18 — PR570: prazo de CREATE e preservação do ACK validado

Requisito → código → teste: área5 substituições, criação explícita do pedido não pode manter busy/pending após 15000ms nem descartar confirmação validada quando somente o refresh demora. Base funcional eeac6a52b0121d98c51fed0a1583116f98050dd7/tree4618e3ca5ffad18410a3bfc28548ca9b79862bf6; MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1 inalterada. Extensão coerente do MESMO PR570, sem novaPR/force/retry do SHA velho.

Contrato original lido integralmente: ReplacementController.create autentica membro owner/admin/manager/company, valida UUID/motivo, lock FOR NO KEY UPDATE assignment tenant, estados confirmed/checked_in/in_progress, INSERTopen ONCONFLICT(assignment_id,status)UPDATEreason, retorna id/assignmentId/status. Isto NÃO é nova idempotência durável/cancelamento servidor. Helper requestReplacement UUID/ACK/payload inalterado. API select é OUTRO contrato (locks, disponibilidade, novaassignment/cancelamento/notification); não corrigido ou aceito nesta entrega.

Mudança mínima APENAS apps/mobile/app/substituicoes.tsx: callback de prazo existente match estendido SÓCREATE, mantém SELECTabort-only; ownedref/finish do eeac preservados. AntesACK+autenticaçãofinalválida, prazo invalida snapshot/sequence/dados/recomendação e mantém motivo/aviso de incerteza, sem GET/POST/retry automático; recuperação segue load(true) explícito validado original, sem barreira durável inventada. Após ACKtrue+contexto finaligual e owns, acknowledgedlocal=true; enquanto refresh demora, prazo conserva Substituição solicitada. em vez de falso resultado desconhecido do servidor. load recebe callback opcional de cleanup próprio; sóCREATE captura childcontroller abort+finish, drena child ANTES de liberar pending/busy. Seq/sourceguards originais impedem child tardio reconstituir snapshot. Fora quatro regiões, reversão reconstrói FULL11455chars eeac BYTEEXATO; candidato11762chars. Nenhum novo parser/helper/payload/JSX/styles/sessionqueue/API SQLRLSACLReact19.1.4RN0.81.6depslockworkflowsbuildsmoke/securityCDPFetchguardCORSsandboxLNAflags/deadlines alterados.

Nova prova: apps/mobile/tests/replacement-create-screen-deadline.test.mjs,36 regressões actualhandlerpréJSX+REALhelpers com hooks/auth/fetchJSON/timers explícitos. Baseline EXATOeeac17PASS19FAIL →36PASS. Oito awaits (4preACK+4child), parent/child drain, motivo original/trim/blank{}, ACKvalidado vs desconhecido, oldtimer/finally NEWcreate/match/select SAMEepoch, blurrefocus/tenant/badACK/HTTP400, manualGET recovery e20EXPLICITpendingcreatesbounded. SAMEepochNEWsnapshot/recommendation é fixture explícita,nãoReact/APIrenderproof.78focalPASS[36new+27match+13helper+2ACKUUID], SãoPaulo78PASS; FULLcanônico978LOCALPASSUTC/SP[942eeac+36new],0fail/skip/cancel,80paths explícitos do TREE. PRIMEIRA954contaminadaREJEITADA: scratch tinha candidatos pré582/test24ausente e seis568helpers; restaurados SHAs Git, só978 posterior atribuído.158existingmobileblobsSHAexactforaapp+LOCALtsconfigadaptadoNÃOPUBLICADO. Old27match/13helper/2ACKtests BYTEEXATOS preservados, helpers7f52/test456bdc orig570calendar intactos. Typecheck local indisponível, NÃO PASS; CI obrigatório preservado.

Limites: testes Node/modelos não provam RNrender/SecureStore/HTTPPG/native/físico/VisualTruth/produção/heap ou cancelamento SQL. Área5 mais próxima no requisito prazo/ACK, NÃO aceite integral. Só10Android standalone técnicointerno aceito;12pending,não%code.

Reconciliação eeac primária: OWNCI39162744033a1/job117779280558FAILquotaECRANTEScheckout/ZEROretry/TODOSprodutosSKIP;1532 esperado nãoexecutado/942LOCAL. OWNAPK39162744045a1/job117779280586SUCCESScheckout1dfab0a634e1886280c54d963b29ab832ce6e3e2SINTÉTICO[75105,eeac]/tree4618igualHEAD (Gitconfirmado).Build20:29:28.8949788Z/install20:30:53.0097870Z/smoke20:31:05.4126442ZwithoutMetro. Artifact12149522232expiresNov1T20:31:06ZREALZIP28913213/SHAfe08e0823ed7266b2e093fd67c4ec24d6463ca0b003e1a10d79f35699f5bd3e1=API;APK66162412/SHA6e7b86bc03e69a2a8fb2ac4a7566fe4ce5a15f1a7d4db23ced77fe3b65bec07b=SUMS/BUILDINFO1dfab/releasefixedpackage/metrofalse/build20:29:29Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36.ZIP≠APK/installlaunch≠form/SecureStore/physical/VisualTruth/prod. CIREDproibiumergeeeac; NÃOemprestaroldAPK/CIaNOVOHEAD. FULLFINALeeac14969chars preservado na nota desta entrega.

Gates NOVOHEAD CI/APK PENDENTES nesta preparação histórica:1568=[145Web978mobile431API3CLI11monitor]SÓESPERADO.NãoReady/Merge até ownCI+APK ALLSUCCESS/freshmain/base/head/fullpaths+modes; somente expectedSHAmerge e POSTCI/APK reais depois. Main continua75105 FULLCIRED582POSTquota/ONEretryconsumida, standalone582POSTvalidado;semmergeoutrosdrafts.

Rootbrowser558 permaneceUNRESOLVED; eeac nãoexecutouChrome porquota. 585observou signoutPOSTabort/71GET200+1controlled503/ZEROGETfailed;568jobsPOSTabort/24GET200; não afirmar causa nem restringir12GET. Semrerunverde/registryworkflowcredentialbypass. SemprodRailwayNeon/providersPSP/custosserviços/contratos/dinheiroreal/root/grants/RLSdisable/manualActivitywrites.

Próximo técnico: ownCI/APKnovoHEAD/logcheckout/tree/artifactZIPvsindividualAPK. Se bloqueado produto/browser/infra semrecuperação nova, registrar primário e avançar auditoria independente (SELECT/ACK+child ou leitura), nunca mesmoSHAparaverde. FINALPRmetadata e próximo apêndice apenas junto de entrega FUNCIONAL, não commitstatus/selfref/imagem/atividade. Todos os seis originais eeac preservados como FULLprefix NO LUGAR por append; MAIN também recuperável integralmente pelo manifesto anterior, nãoresumo.


## 2026-10-18 — PR570: prazo SELECT e preservação do ACK de substituto confirmado

Requisito → código → teste: área5, seleção humana explícita não mantém busy/pending indefinidos após 15000ms nem converte ACKvalidado em falsoUNKNOWN quando apenas a leitura posterior demora. Base funcional029ecf051218755f85e757c517109cea1464d8be/tree543e4b3752075629f0d4227c8fd00e0399c2e75a;MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1 inalterada. Estender MESMOPR570 por fastforward normal/expectedSHA/semforce/novaPRduplicada/rerunoldSHA.

Contrato original integralmente relido: ReplacementController.select809c27f1551c103adc9e6950f79555eb42d3b7db autentica tenant/membership owner/admin/manager/company, UUIDbody/id, originalassignment FOR NO KEYUPDATE e replacementopen FORUPDATE, estado substituível/candidato diferente/talentpoolativo/disponibilidade. Inserção assignmentconfirmed ONCONFLICT preservastatus; cancelaoriginal, marca replacementmatched, insere notificação e devolve replacementRequestId/assignmentId NOVO/replacedAssignmentId/professionalId/statusmatched. Helper7f52 valida todos vínculos e UUIDnovo diferente. API/SQL/RLS/transação/ACL/notification/payload inalterados; modelos abaixo NÃO provam rollback HTTPPG nem entrega notificação.

Fix APENAS DUAS LINHAS em apps/mobile/app/substituicoes.tsx, candidato11736charsSHA168b5c3b6a2de80caa7d73998f30f402c5fc9a59 vs02911762chars: callback15s ownedref já existente MATCH/CREATE agora também SELECT; acknowledged=ok somente ramo CREATE/SELECT após helper+autenticaçãofinaligual+owns; mensagem por kind conserva Substituto confirmado. (SELECT) ou Substituição solicitada. (CREATE) quando ACKverificado. Ramo MATCH nunca marca acknowledged. SELECT também captura cleanup próprio do childload já existente em CREATE, abort+finish ANTES pending/busyunlock. AntesACK permanece erro/UNKNOWN com snapshot/seq/list/recommendations invalidados, motivos preservados, semGETPOSTextra/autoPOST; recuperação manualGETvalidado+nova recomendação humana segueoriginal. Ownership/seq/source/blur/headers/15s/requestshape/JSXstyles/imports/helpers/sessionqueue permanecem; reverse das2linhas reconstrói FULL029byteexato. Semparser/depslock/workflows/buildsmoke/segurança/CORS/Fetchguard/CDP/deadline/flags/grants/policy changes.

Prova nova: apps/mobile/tests/replacement-select-screen-deadline.test.mjs11879chars,40testes actualhandlerpréJSX+REALhelpers/hooks/auth-fetchJSON-timers. BaselineEXATO02919PASS21FAIL→40PASS. Oito awaits4preACK4child, positivos após MATCHrealdohelper (não apenas recommendationfixture), vínculos ACKrequest/professional/replacedAssignment/newAssignmentUUIDdifferent/status, HTTP400, mudanças tenant/blur, oldtimer/finally vsNEWselect/create/match/read SAMEfocus,20EXPLICITmanualGET+MATCH+SELECT tentativas bounded semautorretry. AdversarialSAMEepochnovo snapshot/recommendation é fixtureEXPLÍCITA,nãoAPI/RNrenderproof. Focais118PASS=[40new+36CREATE+27MATCH+13helper+2ACKUUID],America/Sao_Paulo118PASS. FULL1018LOCALPASSUTC+SP=[978029+40new],0fail/skip/cancel,81canonicalTREEtestpaths, existência de TODOS validada. Preflight restaurou candidatos pós582/test24 e seishelpersMAIN que scratch antigo não continha ANTESfull, nenhumfullcontaminado atribuído.159existingmobileblobsSHAexactforaSubstituicoes+LOCALtsconfigadaptadoNÃOPUBLICADO. Typechecklocalindisponível,nãotypecheckPASS;CIobrigatório.

36oldCREATEd0423c9b93767886251470009fede3a8ad0e34c3/27oldMATCHa297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76/oldhelper5707f52/test456bdc e2ACKUUID BYTEEXATOS. Old570calendar+2testsSOMENTE,nãotenantACK; correçãohistórica585preservadanasnotas. Nenhumproduto/testeoutrosdraftscopiado.

Limites: Node/modelos não são RNrender/SecureStore/HTTPPG/native/físico/VisualTruth/prod/heap/cancelamentoservidor/idempotênciadurável. Não inventar garantia debarreira durável nem ausência de commitSQL. Requisito prazo/ACKárea5avançou,nãoaceiteintegral. Somente10standaloneTÉCNICAINTERNOaceita;12pending,não%code.

Reconciliação primária029: OWNCI39165291531a1/job117786838938FAILquotaECRANTEScheckout/ZEROretry/TODOSprodutosSKIP;1568sóesperado,nãounitexecutado. OWNAPK39165291444a1/job117786838693SUCCESSactualcheckout2ff21b2881327db7e9e0b440a71cceeee7d713a2SINTÉTICO[MAIN75105,029]/tree543eigualHEAD Gitconfirmado,NÃOliteral029. Build21:00:30.5041105Z/install21:01:40.6004265Z/smoke21:01:52.9415231ZwithoutMetro.Artifact12150363826expiresNov1T21:01:54ZREALZIP28913421/SHA268b36138354c77295ccc45888678e3a23381f8ece4baf801c0f56fd887e0100=API;individualAPK66162592/SHA48bf107594965fbee82bcd7aa02e35dfe6c2e3c4a0f18f8476cf83c5e64b0533=SUMS/BUILDINFO2ff21/releasefixedpackage/metrofalse/build21:00:31Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36.ZIP≠APK/installlaunch≠Substituicoesform/SecureStore/physical/VisualTruth/prod. CIREDproibiumerge029;NÃOemprestarAPKold aoNOVOHEAD. FULLFINAL02915605chars preservadoINTEGRALnovaSELECTnota.

Gates NOVOHEAD CI/APK PENDENTES nesta preparação histórica:1608=[145Web1018mobile431API3CLI11monitor]SÓESPERADO,nãoexecutado/APKN/Afalse. NãoReady/MergeatéownCI+APKALLSUCCESS/revisãofreshMAIN/base/head/todospaths/modes;somenteexpectedSHAmergeONCE+POSTCIAPKreais.MAINcontinua75105FULLCIRED582POSTquota/ONEretryconsumida,standalone582POSTvalidado.

Rootbrowser558UNRESOLVED;nenhumChromeeeac/029devidoquota.585POSTsignoutabortapósOPTIONS204/71GET200+1controlledGET503/ZEROGETfailed,568POSTjobsabort/24GET200;nãorestringir12GET/nãoafirmarcausaCORS/API/vendor/framework/nãoemprestar558zeroNav. Controlessegurançaintactos.SemproduçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/manualActivitywrites.

Próximo técnico: CI/APK NOVOHEAD/logcheckout/tree/artifactZIPvsindividualAPK/SUMS/BUILDINFO. Se bloqueado porproduto/browser ouquota semRECOVERYprimárioNOVO,nãorerunmesmoSHAparaverde;registrarprimárioeavançar auditoria independente de LOAD manual/controllercleanup,semduplicar584Ganhos. FINALPRmetadata e consolidaçãoGitAPENASpróxima entregaFUNCIONAL,nãostatus/selfref/image/activitycommit.6originais029FULLPREFIXNO LUGARappend;MAINrecuperávelintegralmanifestoanterior,nãoresumo.


## 2026-10-18 — PR570: cleanup do controller e timer da leitura de substituições

Requisito → código → teste: área5/8, leitura expirada deve retirar seus recursos locais mesmo quando auth/transporte/JSON/authfinal não retornam. UIERROR/busyfalse/pendingfalse/snapshotnull já estavam corretos; isto NÃO é correção de busytravado, heapexhaustion, tenantleak ou cancelamento SQL. Base71d95202d192cfd0c1981ab1a7cab419c97f3c54/tree021f28d2eb2e70df0fcfcac9b94d7ea2f9216c4b;MAIN75105d42c873ca56b58fa1aa73cc4a682359e5c1 inalterada. Estender MESMOPR570normalfastforward/expectedSHAsemforce/novaPR/rerunoldSHA.

Fix mínimo APENAS12caracteres op.finish(); no callback deadlineREAD de apps/mobile/app/substituicoes.tsx antes da guarda generation+sequence de UI. Captura op próprio: operation já aborta controller antescallback; finish cancela próprio timer e remove próprio controller Set, inclusive callbackstale sem tocar UI nova. Finally original permanece idempotente. Retirada da única adição reconstrói FULL11736chars71 BYTEEXATOS→11748candidateSHAe2cf5a9af0d4cfc6755fd857cf6de91f30c45b80. Nenhum request/UItext/JSON/parser/helper/15s/auth/contextguard/JSXstyle/import/açãoMATCH/CREATE/SELECT/ACK/sessionqueue/API SQLRLSACLReact19.1.4RN0.81.6depslockworkflowsbuildsmoke/securityCDPFetchguardCORSsandboxLNAflags/deadlines alterado. READnãoenviaPOST e continua retentativa explícita.

23novos apps/mobile/tests/replacement-read-controller-cleanup.test.mjs10160chars usam handlerpréJSXREAL+loadReplacementsREAL+fixtureshooks/auth/fetchJSON/timers com assertdelay15000. BaselineEXATO71corrigido17PASS6FAIL→23PASS. Quatroawaits +positivospopulado/vazio, timer/controller0antesdependencyresume, oldfinally/oldtimer vsNEWREAD eNEWCREATE/MATCH/SELECTsamefocus, blurrefocus,20EXPLICITmanualreadsbounded e stale-seqresource vsnewverifiedsnapshot. Modelo inicial de tenant-antesauth esperava erro indevido: CORRIGIDO ANTESpatch para exigir leitura legítima com NEWheaders e limpeza dos drafts antigos; mudança tenantAPÓSJSON continuaerror/snapshotnull. Não contar errodoharness como defeito do produto. SAMEepochNEWsnapshot/recommendationadversarialéfixture explícita,nãoAPI/RNrender.

141focalPASS[23new+40SELECT+36CREATE+27MATCH+13helper+2ACKUUID],SãoPaulo141PASS. FULL1041LOCALPASSUTC+SP[1018pai71+23new],0fail/skip/cancel;82canonicalTREEtestpathsTODOSexistentesassert. Preflightrestauroucandidatospós582/test24e6helpersMAIN antesFULL,nãofullcontaminadoatribuído.160existingmobileblobsSHAexatosforaSubstituicoes+LOCALtsconfigadaptadoNÃOPUBLICADO. Typechecklocalindisponível,nãoPASS/CIobrigatório.40SELECT747753e9f044c02377a149a815211e5117ea58bc/36CREATEd0423c9b93767886251470009fede3a8ad0e34c3/27MATCHa297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76/helper5707f52/test456bdc/2ACKUUIDBYTEEXATOS. Nenhumoutrodraftproduto/testcopy.

Limites: Node/modelos não são ReactNative/SecureStore/HTTPPG/native/físico/VisualTruth/prod, garantia de memória/ausência de commit SQL/idempotência durável. Prazo/recursosárea5/8 mais próximo,nãoaceiteintegral. Somente10AndroidstandaloneTÉCNICAINTERNOaceita;12pending,não%code.

Reconciliação primária71: OWNCI39169430907a1/job117799211221FAILquotaECRANTEScheckout/ZEROretry/TODOSprodutosSKIP;1608sóesperado,nãounitexecutado. OWNAPK39169430905a1/job117799211090SUCCESSactualcheckouta64ea843d6ca341f4ad6b8fae1cccdc044b83a5cSINTÉTICO[MAIN75105,71]/tree021figualcandidataGitconfirmado,NÃOliteralHEAD. Build21:56:03.1859836Z/install21:57:10.1089635Z/DEVICE_SMOKE_OK21:57:22.3339524ZwithoutMetro.Artifact12151374410expiresNov1T21:57:24ZREALZIP28913376/SHA48869d739bd1090063d388b4e15ac6240cf680ff3e1ba86629d6d2cd846893a6=API;individualAPK66162572/SHA4ff26d3026957e47553946159f717419522d0381f31896e6bcb862888ff830d3=SUMS/BUILDINFOa64ea/releasefixedpackage/metrofalse/build21:56:03Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480min24target36.ZIP≠APK/installlaunch≠Substituicoesform/SecureStore/nativequeue/physical/VisualTruth/prod. CIREDproibiumerge71;NÃOemprestaroldAPKaoNOVOHEAD. FULLFINAL71 17043chars preservadoINTEGRALnovaREADnota.

Gates NOVOHEAD CI/APK PENDENTES nesta preparação histórica:1631=[145Web1041mobile431API3CLI11monitor]SÓESPERADO,nãoexecutado/APKN/Afalse. NãoReady/Mergeantes ownCI+APKALLSUCCESS/revisãofreshMAIN/base/head/todospaths+modes;somenteexpectedSHAmergeONCE+POSTCIAPKreais.MAINcontinua75105FULLCIRED582POSTquota/ONEretryconsumida eAPKstandalone582POSTvalidado. SemRECOVERYprimárioNOVOapós71/029/eeac/584,nãorerunoldparaverde/registryworkflowcredentialsbypass.

Rootbrowser558UNRESOLVED;nenhumChromeeeac/029/71devidoquota.585POSTsignoutabortapósOPTIONS204/71GET200+1controlled503/ZEROGETfailed,568POSTjobsabort24GET200;nãorestrito12GET,nãocausaCORS/API/vendor/framework/nãoemprestar558zeroNav. Controlessegurançaintactos.SemproduçãoRailwayNeon/custosserviços/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/manualActivitywrites.

Próximotécnico: primários CI/APKNOVOHEAD/checkoutGitparents/tree/artifactREALZIPvsindividualAPK/SUMS/BUILDINFO. Se quota/browserbloqueiam semnovaevidência,nãorerunmesmoSHAparaverde;auditar outro item matriz sempatchporhipótese/duplicarPR. FINALmetadataPR e consolidaçãoGitSÓpróximaentregaFUNCIONAL,nãostatus/selfref/image/activitycommit.6FULLoriginais71PREFIXNO LUGARappend;MAINrecuperávelFULLmanifestoanterior,nãoresumo.
