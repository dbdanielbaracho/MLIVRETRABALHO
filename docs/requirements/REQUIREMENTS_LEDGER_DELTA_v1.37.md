# Requirements Ledger — delta v1.37

**Data:** 09/10/2026

| ID | Requisito | Evidência | Estado |
|---|---|---|---|
| MOB-AGENDA-STATES-001 | Loading/erro/vazio/real e retry sem falso confirmado | agenda.tsx, lib/agenda.ts; 4 testes novos | Implementado na branch; gates próprios pendentes |
| MOB-AGENDA-CYCLE-001 | Ação/badge por status, rating só completed | helper e testes; backend intacto | Implementado na branch |
| MULTI-AGENDA-001 | Tenant do item nos POST/conversa/segurança, guard por tenant:id | Código e dados multiempresa; CI RLS obrigatório | Contrato/autorização preservados |
| MOB-HOME-REAL-001 / MOB-COMPANY-NAV-001 (continuidade #341) | Verificação pós-merge | CI 38012421142, APK 38012421105, artefato 11654492684 | Gates técnicos pós-merge aprovados |

31/31 locais; Visual Truth/Production-DONE global/piloto físico não declarados.
