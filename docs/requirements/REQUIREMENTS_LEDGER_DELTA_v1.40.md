# Requirements Ledger — delta v1.40

| Requisito | Implementação | Prova | Estado |
|---|---|---|---|
| Interessados/recomendações reais com falha independente | candidatos.tsx; company-candidates.ts | 5 testes novos; MOBILE_CANDIDATES_STATES_v1.40 | Branch; gates pendentes |
| Resposta atrasada não troca dados da vaga atual | selection/version/generation/cancelamento | Revisão estática; taps ainda a validar | Implementado; Visual Truth OPEN |
| Confirmar manualmente sob contexto tenant/identidade válido | sameCompanyContext/confirmCandidate/guard | Ack exato/falhas/contexto testados | Implementado; CI/APK/pós-merge pendentes |
