# Requirements Ledger — delta v1.33

**Data:** 2026-10-09

| ID | Requisito | Código | Evidência | Estado |
|---|---|---|---|---|
| MOB-AVAIL-NETWORK-001 | Salvamento com erro honesto, campos preservados e guard de envio | disponibilidade.tsx, lib/availability-window.ts | 3 testes calendário; MOBILE_SECONDARY_NETWORK_STATES_v1.33.md; guard/UI não provados por unit | Implementado na branch, CI/APK pendentes |
| MOB-NOTIF-STATE-001 | Loading/erro/vazio e retry sem inventar dados | notificacoes.tsx, lib/notifications.ts | 3 testes resposta/multiempresa/retry | Implementado na branch, CI/APK pendentes |
| MULTI-NOTIF-001 (continuidade) | Mark-read mantém tenant do próprio item | notificacoes.tsx | Header preservado em diff; jornada HTTP existente no CI | Sem mudança de contrato/backend |

14/14 testes locais UTC/São Paulo. Integração depende do #342 e gates próprios; Visual Truth/Production-DONE não declarados.
