# Requirements Ledger — delta v1.35

**Data:** 09/10/2026

| ID | Requisito | Evidência | Estado |
|---|---|---|---|
| MOB-EARNINGS-TRUTH-001 | Total/gráfico semanal coerente com Início; estado real no histórico | ganhos.tsx, lib/earnings.ts; período/status/gráfico e labels testados | Implementado na branch; gates/integração pendentes |
| MOB-EARNINGS-STATES-001 | Loading/erro/vazio e retry sem zero presumido | lib/earnings.ts; resposta inválida/HTTP/rede vs vazio | Implementado na branch; gates pendentes |
| MULTI-EARNINGS-001 | Identidade multiempresa preservada | API inalterada, tenant:id, teste com mesmo ID de dois tenants | Sem mudança de contrato/RLS |

23/23 testes locais UTC/São Paulo; não declaram UI física, Visual Truth ou Production-DONE globais.
