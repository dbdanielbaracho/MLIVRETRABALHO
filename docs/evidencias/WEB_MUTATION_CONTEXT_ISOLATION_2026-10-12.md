# Isolamento de contexto das mutações Web — 2026-10-12
### 2026-10-12 — isolamento de contexto nas mutações Web da empresa (PR #492)

- A reprodução comportamental no código integrado por `d65e3a86484df72319a8b0ed8db44a5856d775ba` confirmou que respostas tardias de quatro mutações (`createJob`, `createTeam`, `updateSafetyCase` e `updateSafetyAppeal`) ainda conseguiam publicar `HTTP 500` e encerrar o estado de carregamento depois da troca de `tenant-a` para `tenant-b`.
- A revisão da mesma família encontrou sete operações com o mesmo risco: adicionar/remover membro, confirmar candidato, solicitar/selecionar substituição e adicionar/remover profissional do talent pool.
- A correção instala uma chave de contexto baseada em token, identidade, tenant e papel por `useLayoutEffect`, invalida-a no cleanup e só publica sucesso, erro, refresh ou término de loading se a resposta ainda pertence ao contexto ativo. O ciclo cleanup/setup do Strict Mode preserva o contexto atual.
- A escrita que já chegou ao servidor não é cancelada nem repetida. Payloads, cabeçalhos, autoridade, ACKs canônicos, idempotência, rotas, RLS e política de tenant permanecem inalterados.
- Regressão local: 27 cenários novos cobrem falha/sucesso tardios, troca de tenant/token/papel, logout, desmontagem e replay de Strict Mode; a suíte Web completa passou com **58/58** testes.
- Escopo funcional: `apps/web/app/page.tsx`, `apps/web/app/web-form-target.test.ts` e ajuste de fixture em `apps/web/app/web-read-context.test.ts`. Entradas Android/native, dependências, lockfile, workflows, build e smoke permanecem byte a byte idênticas à base; APK é **N/A por identidade de árvore**, não por ausência de execução.
- Os recibos exatos de head, árvore, CI próprio, merge e pós-CI serão mantidos no corpo do PR #492; `queued`, `running` ou resposta vazia não serão tratados como aprovação.
- Próxima auditoria interna: reproduzir antes de alterar qualquer concorrência restante em login/logout, membership, confirmação/substituição e lifecycle/cancelamento. Preferências, help sem vínculo, previsão e integrações continuam sem política inventada.
