# Requirements Ledger — delta v1.44

| Requisito | Implementação | Prova | Estado |
|---|---|---|---|
| Gestão owner-only com estados reais/foco/schema/timeout | membros.tsx; company-members.ts | 6 novos testes; MOBILE_MEMBERS_STATES_v1.44 | Branch; gates pendentes |
| Convite desconhecido não revoga novamente por retry automático | inviteUncertain/refresh manual/ack | unknown/rejected/contexto testados | Implementado; taps pendentes |
| Aceite/revogação sem estado local otimista | ack tenant/role/identity e convite id | Testes contratos/payload | CI/APK/pós-merge pendentes |
| Segurança/RBAC/RLS existentes intactos | Controller não alterado | Diff/contratos | Visual Truth/pentest separados |
