# Membros: persistência vinculada à conta e empresa — v1.60

Verificado em 2026-10-10 07:13:49 UTC. Base de código: #370 1939f0240fdf7d79152a9a548da8523b3ef4d70a. Main observada: #367 61341937bdf54ce15d6cf211061051b1c074baed.

Fonte primária: apps/api/src/company-members.controller.ts, apps/mobile/lib/company-members.ts, membros.tsx e fila session-transaction.ts/session.ts. O fluxo anterior comparava authHeaders, depois chamava saveTenant em outra operação; um login/seleção intercalado podia receber o tenant do convite antigo.

Correção: snapshot token+tenant da origem, operação condicional e confirmada dentro da fila existente, predicate de foco/cancelamento e conferência final antes de navegar. Falha de armazenamento mantém o código e distingue aceite backend confirmado da seleção local não confirmada. GET/create/revoke não exibem dados/código de contexto anterior. Owner-only e integridade de papel/e-mail/backend não mudam.

168/168 mobile locais UTC e São Paulo, incluindo 6 testes novos de persistência de empresa. Sem dependências novas; unidade não demonstra taps nativos, SecureStore em aparelho ou desenho físico. CI/APK próprios ainda a consultar após publicação desta branch. Diff deste ciclo contém código, requisito, verdade, evidência, memória e checkpoint.

Integrações e pós-gates atuais: [journal0712Z](../conversas/EXECUCAO_VERIFICADA_2026-10-10_0712Z.md). Visual Truth OPEN; nenhuma operação real/custo/PSP.
