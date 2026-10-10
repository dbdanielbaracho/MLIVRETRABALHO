# Requirements Ledger — delta v1.43

| Requisito | Implementação | Prova | Estado |
|---|---|---|---|
| Planejamento real loading/falha/vazio/foco/retry limitado | planejamento.tsx; company-readonly.ts | 6 testes novos; MOBILE_COMPANY_READONLY_STATES_v1.43 | Branch; gates pendentes |
| Reconciliação read-only sem zero/obrigação fabricados | pagamentos.tsx; moneyOrMissing | Ausência vs zero/403/schema/retry | Implementado; FIN-RISK segue separado |
| Tenant obrigatório/roles/RLS preservados | Headers existentes/GET-only/backend intacto | Diff/controller | CI/APK/pós-merge pendentes |
