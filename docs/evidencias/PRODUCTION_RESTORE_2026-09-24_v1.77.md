# Evidência — restauração de build/deploy v1.77 — 2026-09-24

## Incidente
Após os PRs #216/#217, o Railway recusou o build por erro TypeScript em `signed-json-payment-provider.ts` com `exactOptionalPropertyTypes`: uma propriedade opcional era emitida explicitamente como `undefined`.

## Detecção
O GitHub Actions estava indisponível antes de executar steps (`runner_id=0`), portanto o Railway funcionou como um gate independente de compilação e encontrou a regressão.

## Correção
PR #218 / main `6d9e7325f1a2e773edad32d0a67d02115c0de050`:
- omite propriedades opcionais ausentes em vez de atribuir `undefined`;
- adiciona integridade de destinatário para payout;
- mantém provider provenance e assinatura HMAC;
- migrations `0031_trust_event_causality.sql` e `0032_payment_payout_recipient.sql` aplicadas pelo startup de produção.

## Evidência Railway
Deployment `5b251a58-896d-44ef-87d9-7c0ad5ddc601`:
- `pnpm --filter @mlivretrabalho/api build` concluiu sem erro;
- imagem Docker exportada/push concluído;
- migration runner aplicou `0031` e `0032`;
- container iniciou.

## Gate ainda aberto
Esta evidência prova restauração de build/startup, mas não substitui o Production Truth Gate HTTP canônico nem o pipeline completo do GitHub Actions. Issue #214 permanece aberta até esses dois controles terem prova final.
