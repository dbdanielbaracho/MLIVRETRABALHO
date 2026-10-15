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
