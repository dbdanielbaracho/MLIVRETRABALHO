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
