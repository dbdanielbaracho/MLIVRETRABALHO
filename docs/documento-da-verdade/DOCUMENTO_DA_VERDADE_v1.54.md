# MLIVRETRABALHO — Documento da Verdade v1.54

**Status:** NORMATIVO — DELTA SOBRE v1.53
**Data:** 2026-10-10

Preserva v1.53, referência original, isolamento/RLS, React19.1.4/RN0.81.6/lockfile e standalone sem Metro. Visual Truth OPEN.

## Privacidade: operações manuais e confirmação real
Registro de pedido exige resposta requestId/tipo solicitado/status submitted antes de limpar o rascunho. Detalhes obrigatórios e limite2.000 usam o contrato existente. Guard síncrono,15s/cancelamento/foco e autenticação igual à leitura e à resposta impedem confirmação fora do contexto. Resultado desconhecido não significa sucesso; preservar texto e exigir atualização manual/conferência dos pedidos, sem reenvio automático.

Exportar é uma ação explícita: GET export cria um pedido access, portanto nunca no foco/retry/polling. Somente cópia estruturada válida é exibida; seções tenant devem corresponder às memberships retornadas. Essa consistência não substitui autenticação/isolamento/redação backend. Sem arquivo/cache/log de cópia; limpar na saída/mudança de sessão.

Desativação mantém alerta humano e POST sem body. Encerrar sessão/tenant somente após ack requestId/deactivated true/data válida na mesma sessão. Bloqueios de trabalho ativo/ganhos pendentes/único proprietário permanecem backend; retenção/legal hold/ledger/audit não mudam. Nenhuma operação real DSAR/exportação/desativação executada pelo agente.

## Prova e limites
8 novos testes;125/125 locais UTC e America/Sao_Paulo. Guard/foco/Alert revisados estaticamente; unidade não comprova taps físicos, retenção/provider/pentest nem toda cobertura visual. CI/APK no SHA próprio e pós-merge ainda obrigatórios. Evidência MOBILE_PRIVACY_ACTIONS_v1.54.md, ledger/memória/checkpoint no mesmo ciclo. Continuidade: acompanhar gates/retries e auditar onboarding/Copilot por contratos reais, sem declarar projeto completo.
