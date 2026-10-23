# Aceite técnico interno — Área 6: ledger e Ganhos SIMULADOS — 22/10/2026

## Decisão e autoridade

**APROVADA TÉCNICA E FUNCIONALMENTE NO ESCOPO INTERNO SIMULADO**, por decisão do assistente conforme delegação expressa do usuário (“todos os aceites é voce que tem que fazer”). Critério original da matriz: provar ledger simulado, split teórico, rollback, reembolso/saldo negativo, separando PSP/KYC externos. Não há espera por aceite humano.

Antes desta decisão: áreas2,3,9,10 aceitas. Após a formalização: **áreas2,3,6,9,10 aceitas; oito pendentes:1,4,5,7,8,11,12,13**. Esta decisão supersede somente a candidatura/pendência temporal da Área6 nos apêndices anteriores, preservados integralmente. Não equivale a Production-DONE.

Base viva auditada: main `c4bd0afb5993d347e4a3996bad03f16644886d4a`, árvore `b1f9e0f4d5c24875757ecc6a4efca2f10e62721d`. Produto #573, HEAD `68b1d8bd8cee9b472f569c710c1758b2fc71977c`, merge literal `1b85403cafd9e17bceeb3ea47ce27fdf03c1496e`, árvore `080e142b16df0d629fabc29d8940b03cfa40e553`. O #605 já estava integrado; não houve segundo merge.

## Requisito → implementação → prova real

| Critério interno | Implementação/contrato | Prova e limite |
|---|---|---|
| Conclusão gera ledger único | WorkAssignmentsController.complete, DatabaseService.tenant, earnings_ledger | HTTPPG cria trabalho/interesse/confirmação/check-in/start/check-out; conclusão explícita201 cria único payable23456; repetição400 não duplica |
| Falha tardia reverte tudo | Fixture ledger-completion-atomicity-e2e.cjs, guardas canônicos API | AFTER INSERT testemunha assignment completed + payable antes do500; snapshot integral de cinco tabelas/dois tenants permanece idêntico; assignment checked_out, completedAt nulo, nenhum payable; políticas/ACL idênticas; hook próprio removido |
| Cliente recebe fatos reais | GET /earnings/mine → loadEarnings real | JSON real vazio após rollback e linha exata após recuperação atravessam loader; tenant/assignment/ledger/23456/payable vinculados; zero HTTP adicional; não é formulário RN renderizado |
| Split teórico | PaymentEventsController.reconciliation | netCaptured=captured-refunded; professionalPayable da linha ledger; platformRemainder=netCaptured-payable; captured30000/payable25000 resulta5000; não cria comissão, tarifa, transferência ou regra comercial |
| Reembolso e saldo negativo | Webhook HMAC local + reconciliação | refund40000, capture30000, payout25000: netCaptured=-10000, platformRemainder=-35000, cashBalance=-35000; replay mantém um refund e três eventos; status reconciliationStatus original preservado |
| Exatidão numérica | SUM inteiro como texto decimal, validação safeInteger e diferenças seguras | API tests rejeitam overflow; HTTPPG soma eventos além de int32 e exige números JSON exatos e tenant isolado; nenhuma coerção para zero ou arredondamento |
| Evento simulado autorizado/idempotente | HMAC/recipient binding/idempotency + callback concurrency fixture | Assinatura inválida/recipient errado negados, replay sem duplicação, callbacks concorrentes e controle tenantB intacto; nenhum provider externo |
| Recursos de Ganhos | Tela real Ganhos + 18 regressões canônicas de ownership | Prazo original15s aposenta somente controller/listener próprios; foco/contexto posterior, auth, estados, leitura e retry explícito preservados; não prova heap ou cancelamento SQL |
| Android aplicável ao produto | APK release standalone e smoke emulador | Próprio e pós-merge build/install/launch sem Metro SUCCESS, bytes/hashes abaixo; não prova aparelho físico/SecureStore/formulário nativo |

### Identidades de código auditadas na main

| Caminho | Git blob |
|---|---|
| apps/api/src/payment-events.controller.ts | 3030f292e35b5fbeb7c1c1bc0cd74149ea6d6313 |
| apps/api/src/payment-reconciliation.controller.test.ts | 58e2b84f17fcbfaa58958e20af027f109de1e4b9 |
| apps/api/src/ledger-completion-atomicity.test.ts | b9478e0c1f2cfffa62b0a8296cfe8123cbe3cc52 |
| scripts/ledger-completion-atomicity-e2e.cjs | 1b9534fe52c7f660adc6a0fcf1c8074f9870543c |
| scripts/http-finance-reconciliation-e2e.sh | c074953289f22665d2dcdc9ca071c38ae41c4e74 |
| apps/api/src/work-assignments.controller.ts | 3c4c1c7023fb9fcbdfd84a4e594a67bbb491a6a8 |
| apps/mobile/lib/earnings.ts | 9afe1a24109c42ad4825eeda40ff1dcef164e84c |
| apps/mobile/app/ganhos.tsx | 79ae7e2b6225da08eac0d100ee71ab8639165755 |
| apps/mobile/tests/earnings-controller-cleanup.test.mjs | 6cbf6645bfd2b7e36eda1e260c67a9ec1905f43f |

## Gates completos e proveniência

| Gate | Run/job | Checkout efetivamente observado | Resultado |
|---|---|---|---|
| CI próprio573 | [39638859504](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39638859504), job119356793805 | sintético7677ac3fbeb6219c64f378e8ffd80685ac5111d9 | SUCCESS, tentativa1 |
| APK próprio573 | [39638859659](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39638859659), job119356794982 | mesmo sintético7677ac3 | SUCCESS, tentativa1 |
| CI literal pós573 | [39708675039](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39708675039), job119594571633 | literal1b85403cafd9e17bceeb3ea47ce27fdf03c1496e | SUCCESS, tentativa1 |
| APK literal pós573 | [39708675307](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39708675307), job119594572956 | literal1b85403cafd9e17bceeb3ea47ce27fdf03c1496e | SUCCESS, tentativa1 |
| CI próprio605 documental | [39710689408](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39710689408) | head5c4ddf1d2fc593967a714c52be7e3b4465864578 | SUCCESS |
| CI literal pós605 | [39718451637](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39718451637), job119626097106 | literalc4bd0afb5993d347e4a3996bad03f16644886d4a | SUCCESS |

Git confirma que o checkout sintético7677ac3 tem pais ordenados[7caa5f1404b0ac12e50e1953440e30177af93054,68b1d8bd8cee9b472f569c710c1758b2fc71977c] e árvore080e142b16df0d629fabc29d8940b03cfa40e553, idêntica à integração literal1b854. Não é checkout literal do HEAD do PR. A mainc4bd difere do produto apenas pela adição do recibo605; todos os blobs não documentais/modos são iguais.

CI do produto e da main605: **1936=[217Web,1186mobile,519API,3CLI,11monitor]**, zero fail/skip/cancel nos testes; typecheck, build, exportAndroid, migrações, retenção/legal-hold, HTTPPG, matriz12/12 + canônico e ProductionTruth SUCCESS. ProjectActivityWatch não foi usado como build.

Testemunhas literais pós573:
- 2026-10-22T02:00:44.6441159Z LEDGER_COMPLETION_INSERT_ROLLBACK_PASS;
- 2026-10-22T02:00:44.6832575Z LEDGER_MOBILE_REAL_JSON_PASS;
- 2026-10-22T02:00:44.6837126Z LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS;
- 2026-10-22T02:02:38.7931333Z WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=0;
- 2026-10-22T02:03:24.0555346Z theoretical split and negative simulated balance exact/replay-safe/no provider transfer PASS;
- 2026-10-22T02:03:45.1521882Z ProductionTruth PASS;
- 2026-10-22T02:10:13.3592105Z DEVICE_SMOKE_OK metro_required=false.

Nova leitura primária pós605 confirmou os mesmos marcadores em03:46:35Z, matrix0 em03:48:07Z e ProductionTruth03:49:00Z. Os logs completos foram consultados diretamente; a aceitação não usa apenas resumo antigo ou contagem de testes.

## APK: ZIP e APK individuais verificados nesta auditoria

| Fato | Próprio573 | Pós-merge literal573 |
|---|---|---|
| Artifact | 12363534293, expira2026-11-04T17:06:03Z | 12396378712, expira2026-11-05T02:10:14Z |
| ZIP bytes | 28913862 | 28913839 |
| ZIP SHA256, igual ao digest API | 66124dcdd736d85146f98785d752df3894e6a80e745f59d6219529043d2182aa | 2f1b75c2f67d4139c26c8f280cfa90e671505818ce704f863ef2752fd8c79537 |
| APK bytes | 66162792 | 66162796 |
| APK SHA256, igual a SHA256SUMS | bc027376a26ceb86a291ff8c965ea08a48d2ac21c9730a467a8f8975486cca42 | c0c25691c032b115a6285c04a106bc2cafa7209dc935363cd1ada4fd26e85a05 |
| BUILD_INFO commit | 7677ac3fbeb6219c64f378e8ffd80685ac5111d9 | 1b85403cafd9e17bceeb3ea47ce27fdf03c1496e |
| BUILD_INFO UTC | 2026-10-21T17:04:26Z | 2026-10-22T02:08:39Z |

Ambos baixados, ZIPCRC verificado, SHA256 ZIP recalculado e APK individual extraído/recalculado com SUMS. Release, packagecom.predibeacon.mlivretrabalho.pilot, metro_required=false, signinginternalpilot. Pós-merge contém assets/index.android.bundle; AndroidManifest binário SHA256ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480. ZIP não é APK. Não se afirma APK literalc4bd ou do novo commit documental.

## Reconciliação de PRs e preservação

O #584 foi encerrado sem merge adicional: lista integral de dez caminhos contém apenas dois caminhos funcionais, ambos idênticos em SHA e modo100644 aos integrados por573 (Ganhos e teste acima). Corpo original inteiro preservado como prefixo do recibo terminal, branch/commits mantidos; seus normativos divergentes não foram copiados. #574 e #565 continuam drafts. Nenhuma branch de PR já integrado foi estendida.

Os seis originais normativos recebem somente um capítulo final e esta referência: DVTv1.104, memória, checkpoint, requirements ledger, evidence registry e matriz. Cada conteúdo anterior é prefixo exato e será validado por leitura integral dos novos blobs. Todos os arquivos de runtime, testes, workflows, dependências, lockfile, build e smoke permanecem idênticos à basec4bd; **APK N/A para a formalização documental**, fundamentado pela árvore completa, sem APK emprestado.

O PR de formalização exige CI completo próprio antes da integração e CI literal pós-merge; esses resultados ainda futuros serão registrados no corpo terminal do PR, sem inventar números nem commit artificial autorreferente. A decisão técnica acima se apoia nos gates completos já medidos do produto integrado.

## Limites preservados e próximo passo

Não há PSP/KYC contratado, sandbox comercial aprovado, transferência, comissão comercial definida, dinheiro real, produção/Railway/Neon, credencial externa, contrato, custo, pentest independente, aparelho físico, RNformrender/SecureStore nativos ou VisualTruth físico inventados. Issues215/219/220/224/228 permanecem externas e separadas. O saldo simulado negativo não autoriza movimentação financeira.

React19.1.4/RN0.81.6, lockfile, auth, ACL/tenant/RLS, LGPD, HMAC, idempotência, isolamento e todos os controles Chrome/CDP/Fetch/CORS/sandbox/LNA/15s permanecem intactos. Nenhum rerun de SHA falho para verde; nenhuma permissão/policy/root/grant/bypass.

Próxima frente completa: área4 empresas/equipes (papéis, membros, publicação e contexto), ou área5 matching se a auditoria apontar dependência real. O progresso medido desta decisão é uma área interna adicional comprovada: quatro→cinco aceitas, nove→oito pendentes; não porcentagem de código.
