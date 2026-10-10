# Requirements Ledger — delta v1.39

| Requisito | Código | Evidência | Estado |
|---|---|---|---|
| Catálogo real no retorno/retry, sem falso vazio | trabalhos.tsx; lib/jobs.ts | MOBILE_JOBS_STATES_v1.39; 4 testes novos | Implementado na branch; gates pendentes |
| Interesse manual limitado e confirmado pelo backend | trabalhos.tsx; sendInterest | JobsController upsert/ack, testes erro/retry/status | Implementado; CI/APK/taps pendentes |
| Desenho/tenant/dependências preservados | Estilos/ProfessionalNav/API existentes | Diff e contratos reconsultados | Visual Truth OPEN |
