# Requirements Ledger — delta v1.36

**Data:** 09/10/2026

| ID | Requisito | Evidência | Estado |
|---|---|---|---|
| MOB-COMPANY-STATES-001 | Dashboard/listas distinguem loading/erro/vazio com sucesso parcial | lib/company-dashboard.ts, 4 testes novos | Implementado na branch; gates pendentes |
| MOB-COMPANY-ACTIONS-001 | Rating/preferred com catch/guard/timeout e contexto tenant consistente | empresa-inicio.tsx; revisão do diff; unit não prova UI/RLS | Implementado na branch; gates pendentes |
| MOB-COMPANY-SCOPE-001 | Resumo sem alegar recorte diário inexistente | Controller query sem dia; subtitle corrigido | Implementado na branch |
| MULTI-COMPANY-001 (continuidade) | Headers autorizados e tenant da leitura/ação/conversa coerentes | Backend intacto; ID dos headers e check antes de POST | CI negativo tenant mantido obrigatório |

27/27 testes locais UTC/São Paulo. Sem Production-DONE/Visual Truth global.
