# Requirements Ledger — delta v1.48

| Requisito | Código | Prova | Estado |
|---|---|---|---|
| Substituições/assignments reais; falha independente | substituicoes.tsx; company-replacements.ts | MOBILE_REPLACEMENT_STATES_v1.48; oito testes novos | Branch; gates pendentes |
| Score correto, vazio só no contrato específico | matchReplacement/render | matching.ts score0–100; teste82; erroHTTP400/500 | CI/APK/pós-merge/taps pendentes |
| Ações manuais no tenant correto e estados permitidos | action/replaceable/create/select | Contexto/estado/payload/ack/falhas | Backend/RLS/policy intactos; Visual Truth OPEN |
