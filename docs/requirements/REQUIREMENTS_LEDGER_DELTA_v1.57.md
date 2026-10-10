# Requirements Ledger — delta v1.57

| Requisito | Código/prova | Estado |
|---|---|---|
| Signin persiste só ack real e lista válida de memberships | signin.ts/entrar.tsx;6 testes novos | Branch; CI/APK/HTTP/taps pendentes |
| Par sessão/tenant verificado, sem leitor no meio da escrita ou rollback que apague próximo login | session-transaction.ts/session.ts;7 testes novos incluindo concorrência |146 testes locais; SecureStore nativo/CI pendentes; não atomicidade OS |
| Guard/loading/rejeição/rate-limit/timeout/senha memória | Tela/contrato/policies backend preservados | Revisão estática; Visual Truth aberto |
| Bootstrap revalida contexto antes de guardar tenant | bootstrap.ts ainda não alterado; consumidores a inspecionar | Próxima auditoria concreta, sem inferir nova política |
