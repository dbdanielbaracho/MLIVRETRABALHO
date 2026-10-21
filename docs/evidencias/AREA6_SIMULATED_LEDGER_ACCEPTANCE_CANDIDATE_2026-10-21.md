# Área 6 — candidato integral de ledger e pagamentos simulados — 2026-10-21

## Decisão desta entrega

Este documento registra um candidato funcional no PR #573. Não declara aceite antes dos gates. Estado inicial: áreas 2 e 10 aceitas; 11 pendentes.

## Requisitos fechados pelo desenho do candidato

| Requisito da matriz | Implementação | Prova exigida no mesmo SHA |
|---|---|---|
| Ledger simulado | conclusão de assignment e `earnings_ledger` transacionais | HTTP/PostgreSQL com falha tardia de INSERT, rollback integral, recuperação explícita e replay sem duplicidade |
| Split teórico | `simulatedSplit = netCaptured, professionalPayable, platformRemainder` | captura 30.000, payable 25.000 e restante 5.000, sem taxa ou transferência inventada |
| Reembolso/saldo negativo | `netCaptured=captured-refunded` e `cashBalance=netCaptured-paidOut` | refund 40.000 após capture 30.000 e payout 25.000 resulta em -10.000/-35.000 |
| Segurança numérica | diferenças exigem `Number.isSafeInteger` | overflow derivado falha fechado |
| Cliente de ganhos | loader real + tela Ganhos com ownership de controller | JSON real de rollback/recuperação e regressões de deadline/retry/foco |
| Tenant/RLS | consultas e snapshots limitados ao tenant | duas empresas, ator outsider, recipient binding, policies/ACL inalterados |

## Blobs funcionais preparados

- payment controller: `3030f292e35b5fbeb7c1c1bc0cd74149ea6d6313`
- payment controller tests: `58e2b84f17fcbfaa58958e20af027f109de1e4b9`
- finance HTTP/PostgreSQL journey: `c074953289f22665d2dcdc9ca071c38ae41c4e74`
- root HTTP journey: `4e528301db4f9d489587517000f3af9700041fd8`
- ledger rollback journey: `1b9534fe52c7f660adc6a0fcf1c8074f9870543c`
- ledger guard tests: `fdb862cf33add1efcb97a2ae925462009c72d753`
- mobile Ganhos: `79ae7e2b6225da08eac0d100ee71ab8639165755`
- mobile Ganhos tests: `6cbf6645bfd2b7e36eda1e260c67a9ec1905f43f`

## Não-alegações

Não há PSP real, dinheiro real, contrato, KYC, provider externo, produção, transferência, liquidação, dispositivo físico, SecureStore nativo, Visual Truth ou pentest. `platformRemainderCents` é uma identidade contábil simulada, não uma comissão aprovada. O pacote não enfraquece RLS, ACL, assinatura, idempotência ou controles do navegador.

## Gate pendente

O candidato deve executar CI completo e APK standalone próprios. Se qualquer gate falhar, permanece draft e a Área 6 continua pendente; não haverá repetição do mesmo SHA apenas para obter verde.
