# Delta de requisitos — v1.61

| ID | Requisito | Implementação | Validação | Estado |
|---|---|---|---|---|
| UI-MOBILE-COMPANY-DASHBOARD-ACK-001 | Anunciar avaliação/preferido apenas com ack contratual real e mesma conta+empresa | company-dashboard-actions.ts/empresa-inicio.tsx |8 novos testes/176 locais UTC/SP|Branch;gates/taps pendentes|
| UI-MOBILE-COMPANY-DASHBOARD-EXIT-002 | Saída antiga não limpa login novo; verificar armazenamento e foco antes navegar | clearSessionForAuthorization compartilhado|Suítes de fila/limpeza e revisão binding|Branch;gates/taps pendentes|
| VISUAL-TRUTH | Cobertura integral em físico contra original | Referência preservada | Sem nova prova física | OPEN |

Não altera score/policies/upsert/backend/RLS, não realiza pagamento nem saída real.
