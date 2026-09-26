# Registro Integral da Conversa — Continuação — 2026-09-25 — Parte 7

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-25_PARTE_6.md`. As Partes 1–6 permanecem preservadas integralmente. Esta Parte 7 torna-se o arquivo ativo do Registro Integral a partir deste ponto.

## Usuário
continuar

## Assistente — continuação autônoma do PR final-state #245
- Continuação executada sem pedir nova autorização, seguindo a regra permanente: diagnosticar e tentar resolver blockers antes de classificá-los como externos.
- PR #245 permanece a única porta de integração final-state para o trabalho anteriormente distribuído em #233–#243, com base `main`.

## Hardening — least privilege de privacy requests
- Auditoria da migration `0037_privacy_requests.sql` mostrou que `privacy_requests` é uma tabela global identity-scoped, sem identity RLS, mas recebia grants `SELECT,INSERT,UPDATE` para `app_runtime` tenant-scoped.
- Auditoria de `PrivacyController` confirmou que os endpoints de privacy requests usam a conexão global autenticada da API e não precisam de acesso por `app_runtime`.
- Migration 0037 foi endurecida com `REVOKE ALL ON privacy_requests FROM app_runtime`.
- Objetivo: remover superfície cross-identity desnecessária e manter least privilege.

## Hardening — corrida de desativação de owners
- Auditoria do sole-owner guard encontrou race condition: com dois owners ativos, duas desativações concorrentes poderiam cada uma observar o outro owner ainda ativo e ambas avançarem.
- `PrivacyController.deactivate` foi corrigido para adquirir `pg_advisory_xact_lock(hashtextextended(tenant_id::text,0))` por tenant owned, em ordem determinística, antes da checagem de sole owner.
- Após lock, a condição de último owner é reavaliada dentro da mesma transação.
- Resultado esperado: duas desativações concorrentes no mesmo tenant não podem deixar zero owners ativos.
- A conclusão do `privacy_request` de deactivation também foi movida para dentro da mesma transação da desativação, evitando conta desativada com pedido ainda `submitted` por falha posterior.

## E2E — concorrência de owner
- `scripts/http-company-members-e2e.sh` foi ampliado.
- Depois do handoff para dois owners, o teste dispara `/v1/privacy/deactivate` simultaneamente para ambos.
- Critério: exatamente 1 HTTP 200 e 1 HTTP 400 `account_deactivation_sole_tenant_owner`.
- O teste também exige que a identidade que permaneceu ativa continue com membership `owner` no tenant.
- Mantidos os testes anteriores de wrong-email, single-use invite e bloqueio de auto-demotion.

## CI do head atual
- Head atual observado do PR #245 após as melhorias mobile: `52377ffbd22f26b7abf201ec79379632df4e7190`.
- Run CI `36162652527`.
- Job foundation `108162731780`.
- Resultado continua `failure` com `steps=null`, sem runner/step executado.
- Portanto o blocker #214 permanece na mesma fronteira de hosted-runner provisioning; não surgiu nova falha de código observável.

## Auditoria de migrations/constraints
- `tenant_memberships` usa índice único parcial `(tenant_id,identity_id) WHERE identity_id IS NOT NULL`.
- Novo fluxo de invitations não depende de `ON CONFLICT` sobre esse índice; faz `SELECT ... FOR UPDATE` e depois insert/promotion, portanto não há incompatibilidade desse ponto.
- Migration 0034 cria índice único parcial `professional_profiles(identity_id) WHERE identity_id IS NOT NULL`.
- `ProfessionalProfileController` foi verificado e usa `ON CONFLICT(identity_id) WHERE identity_id IS NOT NULL`, compatível com o índice parcial.

## Mobile members UX hardening
- `apps/mobile/app/membros.tsx` atualizado no PR #245.
- Após aceite bem-sucedido, o invite code digitado é limpo da memória de UI.
- Código gerado pode ser ocultado explicitamente e é limpo após revogação.
- Erro `invitation_existing_membership_role_change_forbidden` agora recebe mensagem específica; não é mais apresentado genericamente como convite expirado/inválido.
- Nenhum passo extra obrigatório foi adicionado ao fluxo normal.

## Mobile privacy export UX hardening
- `apps/mobile/app/privacidade.tsx` atualizado no PR #245.
- A cópia JSON dos dados continua apenas em state da tela; não é persistida pelo app.
- Usuário agora possui ação `Limpar cópia exibida`.
- Export exibido é limpo no unmount da tela e antes da saída após desativação.
- A tela informa explicitamente que a cópia mostrada não é salva pelo aplicativo.

## Issue #214 reconciliado
- Issue #214 atualizado com head/run atuais e a lista completa dos hardenings estáticos:
  - legal hold do profissional designado no chat;
  - self-demotion/role overwrite;
  - concorrência de owners;
  - atomicidade do privacy request;
  - REVOKE de `privacy_requests` para `app_runtime`;
  - maintenance DB obrigatória para retention apply;
  - limpeza de invite codes e privacy export na UI.
- Regra permanece: auditoria estática não substitui CI real.

## Estado ativo
- PR #245: OPEN, `mergeable=true`, ainda NÃO MESCLADO.
- CI: blocker externo de runner continua reproduzido.
- Próxima continuação deve partir desta Parte 7, Documento da Verdade v1.13 e checkpoint, sem retornar à estratégia antiga de merges sequenciais #233–#243.

## Usuário
ConTinuar

## Assistente — revalidação de mergeability e sincronização
- PR #245 apareceu temporariamente como `mergeable=false` após o avanço de `main` com documentação.
- Comparação mostrou branch #245 com 73 commits à frente e 17 atrás de `main`; os arquivos divergentes do sentido `main → branch` eram documentais.
- Foi aberto PR temporário #246 apenas para avaliar sincronização de `main` para `feat/eas-pilot-build-route`.
- Antes de qualquer merge, GitHub terminou o recálculo de mergeability e #245 voltou para `mergeable=true`.
- Portanto #246 foi fechado **sem merge**, evitando histórico redundante e preservando #245 como único PR de integração.

## Assistente — auditoria DSAR operacional
- Migration `0040_privacy_request_details.sql` revisada: adiciona `request_details`, `evidence_ref`, `operator_note`, limites de tamanho e reforça `REVOKE ALL` de `privacy_requests` para `app_runtime`.
- `privacy-requests-ops.ts` revisado: usa somente `PRIVACY_MAINTENANCE_DATABASE_URL`, valida UUID e limites, permite `list`, `start`, `complete`, `partial`, `reject`, e não cria endpoint HTTP administrativo global.
- A ferramenta é fail-closed sem a conexão privilegiada explícita.

## Assistente — bug real encontrado no E2E DSAR
- `http-privacy-export-e2e.sh` criava o privacy request via API conectada ao banco `HTTP_TEST_URL`.
- Porém a ferramenta `privacy-requests-ops.ts` era invocada com `PRIVACY_MAINTENANCE_DATABASE_URL="$DATABASE_URL"`, que no job apontava para o banco global `mlivretrabalho`, não para `mlivretrabalho_http`.
- Se o runner voltasse, o lifecycle poderia falhar procurando o request no banco errado.
- Correção aplicada:
  - script captura `PRIVACY_MAINTENANCE_DATABASE_URL` como `MAINTENANCE_DB` e exige valor explícito para a prova operacional;
  - teste fail-closed usa `env -u PRIVACY_MAINTENANCE_DATABASE_URL` para provar ausência de variável;
  - comandos `start/complete` usam o `MAINTENANCE_DB` recebido, nunca `DATABASE_URL` implícito;
  - workflow CI agora chama `http-privacy-export-e2e.sh` com `PRIVACY_MAINTENANCE_DATABASE_URL="$HTTP_TEST_URL"`.
- Commits da correção no head #245: `f02447014026b7953a88026330e6f3f6fa7e1dcb` e `32c5d657cbb3e95fee5b205a7de7639b09a1ac3b`.

## Assistente — revalidação do head atual
- PR #245 permanece OPEN e `mergeable=true`.
- Head atual: `32c5d657cbb3e95fee5b205a7de7639b09a1ac3b`.
- CI atual: run `36247003597`.
- Job foundation: `108417948008`.
- Resultado: `failure` com `steps=null`, sem checkout ou qualquer step executado.
- Portanto a correção do E2E não introduziu novo sintoma observável; o único bloqueio de execução continua sendo o hosted-runner provisioning de #214.

## Estado após esta continuação
- #245 é a única integração code/schema ativa e continua não mesclada até execução real green.
- #246 está CLOSED, não mesclado e não deve ser usado.
- DSAR lifecycle está mais coerente e o E2E agora usa o banco correto.
- Production Truth permanece OPEN; não reinterpretar `steps=null` como PASS.

## Assistente — accountability estruturada do operador DSAR
- O runbook v1.13 exige registrar o `operador/capability responsável` quando houver intervenção humana.
- Gap encontrado: `evidence_ref` e `operator_note` existiam, mas não havia um campo estruturado que identificasse quem executou a triagem/mutação.
- Criada migration `0041_privacy_request_operator.sql` no PR #245:
  - adiciona `handled_by`;
  - limita a 1–200 caracteres;
  - mantém `privacy_requests` revogada para `app_runtime`.
- `privacy-requests-ops.ts` agora exige `PRIVACY_OPERATOR_ID` para `start`, `complete`, `partial` e `reject`.
- `handled_by` é atualizado junto da transição operacional e permanece metadado interno, não retornado ao titular.
- `list` continua possível com a conexão de manutenção sem exigir operador, pois é inspeção/triagem não mutante.

## Assistente — E2E de accountability
- `http-privacy-export-e2e.sh` foi reforçado novamente:
  - prova falha sem `PRIVACY_MAINTENANCE_DATABASE_URL`;
  - prova falha de mutação com maintenance DB mas sem `PRIVACY_OPERATOR_ID`;
  - executa `start → complete` com operador explícito;
  - valida `handledBy` na saída interna da ferramenta;
  - valida que `handledBy`, `evidenceRef` e `operatorNote` não aparecem na API/export do titular.
- Head final deste ciclo: `422a81330acb78f0cf4cedc67d69b67d5a52f873`.
- CI run `36247166132`, foundation job `108418386089`, novamente `steps=null`.
- Issue #214 recebeu comentário com o head/run e o novo hardening; o blocker de runner permanece externo e não é confundido com falha funcional.

## Estado ativo ao fim deste ciclo
- PR #245: OPEN, `mergeable=true`, NÃO MESCLADO.
- Migrations preparadas no PR: 0034–0041.
- DSAR runtime agora possui contexto acionável, lifecycle operacional, evidência e operador auditável, todos protegidos por conexão privilegiada explícita.
- CI real ainda não executou nenhum step devido ao #214; não declarar PASS/Production-DONE.

## Usuário
Continuar

## Assistente — legal hold operacional controlado
- Auditoria identificou que o purge respeitava `privacy_legal_holds`, mas o E2E criava holds por SQL direto e não existia ferramenta operacional controlada para criar/revisar/liberar holds.
- Criada migration `0042_privacy_legal_hold_operations.sql`:
  - `created_by`;
  - `released_by`;
  - `release_reason`;
  - limites de tamanho;
  - `REVOKE ALL` para `app_runtime`.
- Criada CLI `apps/api/src/privacy-legal-holds-ops.ts`, sem endpoint HTTP administrativo público.
- Operações: `list`, `create`, `review`, `release`.
- Mutações exigem simultaneamente `PRIVACY_MAINTENANCE_DATABASE_URL` e `PRIVACY_OPERATOR_ID`.
- Scopes válidos: `identity`, `assignment`, `safety_case`, `financial_record`.
- Para assignment/Safety/financial, tenant é derivado server-side do objeto; não é aceito tenant arbitrário informado pelo operador.
- Scope inexistente é rejeitado.

## Assistente — revisão periódica de legal hold
- O baseline v1.13 exige legal hold explícito, com responsável/capability, evidence_ref, gatilho/data de revisão e término.
- Criada migration `0043_privacy_legal_hold_review.sql`:
  - `reviewed_at`;
  - `reviewed_by`;
  - `review_note`.
- `create` agora exige uma `review_at` futura.
- `review` registra timestamp, operador, nota de revisão e próxima data futura de revisão.
- `release` registra timestamp, operador e motivo.
- Criado `scripts/privacy-legal-holds-e2e.sh` dedicado:
  - falha sem maintenance DB;
  - falha sem operador;
  - falha sem data de revisão;
  - prova criação auditada;
  - prova revisão auditada;
  - prova listagem do hold ativo;
  - prova liberação auditada e fim do hold ativo.
- CI preparado para executar o legal-hold E2E no banco isolado de retenção.
- Evidência documental criada em `docs/evidencias/LEGAL_HOLD_OPERATIONS_PR245_2026-09-26.md`.

## Assistente — requirements v1.13 reconciliados
- `REQUIREMENTS_LEDGER_DELTA_v1.13.md` atualizado para parar de apontar para a antiga série #233–#240 como porta de integração.
- #245 passa a ser a referência final-state única para runtime privacy/ownership.
- `TRUST-RET-002` agora aponta para migrations 0036/0042/0043 + evidence doc de legal hold operacional.
- `TRUST-REQUEST-AUDIT-001` aponta para 0037/0040/0041 + DSAR operations evidence.
- Estado continua `IMPLEMENTAÇÃO PREPARADA / NÃO PROVADA / NÃO MESCLADA`.

## Assistente — hardening de integridade financeira
- Auditoria da migration 0007 encontrou `DELETE` concedido ao `app_runtime` em `earnings_ledger`.
- Isso conflita com o baseline financeiro, no qual o ledger é a fonte canônica de obrigações/reconciliação.
- Busca não encontrou fluxo legítimo que dependesse de deletar earnings ledger.
- Confirmado que outras trilhas já estavam endurecidas:
  - trust_events: migration 0031 revoga UPDATE/DELETE;
  - payment_events: migration 0020 revoga UPDATE/DELETE;
  - safety_cases: migration 0021 revoga DELETE.
- Criada migration `0044_earnings_ledger_no_delete.sql` com `REVOKE DELETE ON earnings_ledger FROM app_runtime`.
- Criado `packages/db/tests/finance-ledger-no-delete.sh`:
  - cria fato de earning;
  - entra em `SET LOCAL ROLE app_runtime` com tenant context;
  - tenta DELETE e exige falha;
  - confirma que o registro permanece.
- Teste conectado ao package DB test chain.

## Assistente — KYC/KYB storage audit
- `verification_cases` revisada.
- Schema guarda `provider`, `provider_reference`, `status`, `reason_code` e timestamps.
- Não existem campos default para documento bruto ou biometria.
- `app_runtime` possui SELECT/INSERT/UPDATE e DELETE já é revogado.
- Isso permanece coerente com TRUST-KYC-DATA-001; provider-specific callback/binding continua dependente de provider/sandbox real.

## Assistente — auditoria da execução destrutiva de retenção
- Gap encontrado: `privacy-retention --apply` já exigia maintenance DB, mas ainda não registrava quem executou o purge nem uma evidência persistente da execução.
- Criada migration `0045_privacy_retention_runs.sql` com tabela de auditoria contendo:
  - `operator_id`;
  - status `running/completed/failed`;
  - contagens de sessions/geo/profile/chat candidatas;
  - `error_code` limitado;
  - started_at/completed_at;
  - sem acesso para `app_runtime`.
- `privacy-retention.ts` endurecido:
  - `--apply` exige `PRIVACY_MAINTENANCE_DATABASE_URL`;
  - `--apply` exige também `PRIVACY_OPERATOR_ID`;
  - cria run `running` antes da mutação;
  - após COMMIT marca `completed`;
  - após ROLLBACK tenta registrar `failed` + error_code;
  - output retorna `runId` e operator quando apply.
- Dry-run continua não destrutivo e não exige operador.

## Assistente — E2E de auditoria do purge
- Criado `scripts/privacy-retention-audit-e2e.sh` para validar a última execução:
  - operador esperado;
  - status `completed`;
  - completed_at presente;
  - candidate counts válidos;
  - cleanup do registro E2E.
- CI alterado para executar o retention E2E com `PRIVACY_OPERATOR_ID="ci:privacy-retention"` e imediatamente validar o audit run antes do legal-hold E2E.
- Isso também corrigiu a incompatibilidade criada quando `privacy-retention --apply` passou a exigir operador.

## Assistente — revalidação do PR final-state
- PR #245 permanece OPEN, `mergeable=true` e NÃO MESCLADO.
- Head atual: `57061590add1a267db0022c7c6f5807f5b06c26c`.
- Migrations preparadas no conjunto: 0034–0045.
- CI run atual `36249069223`.
- Foundation job `108423573951`.
- Resultado permanece `failure` antes do primeiro step, `steps=null`.
- Portanto nenhuma das novas mudanças foi executada pelo runner; auditoria estática/testes preparados não são tratados como PASS.
- Body do PR #245 foi reconciliado com DSAR, legal hold, finance ledger no-delete e retention-run audit.

## Estado ativo após esta continuação
- Trabalho interno de privacy/retention/legal-hold/finance integrity foi aprofundado e materializado no PR #245.
- O único gate de execução do conjunto continua #214: hosted runner não é provisionado.
- #245 continua sendo a única porta code/schema; não mesclar até CI/equivalente green.
- Dependências provider/device/pentest/Web continuam nas causas já documentadas e não devem ser substituídas por evidência inventada.
