# Requirements Ledger — delta v1.53

| Requisito | Código | Prova | Estado |
|---|---|---|---|
| Pedidos do titular reais/loading/falha/vazio/schema/foco/retry/15s | privacidade.tsx; privacy-requests.ts |4 novos testes/117 locais; revisão geração | Branch; CI/APK/taps pendentes |
| Refresh não gera exportação/DSAR novo | GET requests somente | Endpoint testado; mutators byte-idênticos | Backend/policies/retention preservados |
| Próximas operações exigem guard/ack/identidade/controle humano | create/export/deactivate ainda não alterados | Contrato/DSAR lidos | Pendência concreta; não afirmar conclusão |
