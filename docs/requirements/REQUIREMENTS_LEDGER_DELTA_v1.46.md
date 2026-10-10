# Requirements Ledger — delta v1.46

| Requisito | Código | Prova | Estado |
|---|---|---|---|
| Publicação confirma fatos antes de limpar formulário | empresa.tsx; company-job-publication.ts | MOBILE_COMPANY_PUBLICATION_v1.46; quatro novos testes | Implementado em branch; gates pendentes |
| Timeout/resultados desconhecidos preservam dados e não repetem POST | publishJob/create/link Planejamento | Rejeição/5xx/JSON/timeout/uma chamada | CI/APK exatos/pós-merge/taps pendentes |
| Calendário/dinheiro/payload/nav/RLS preservados | Controller/validações não alterados | Contrato/diff; 73 testes locais | Visual Truth OPEN |
