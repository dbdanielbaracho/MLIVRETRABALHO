# Registro Integral da Conversa — Continuação — 2026-09-26 — Parte 9

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-26_PARTE_8.md`. As Partes 1–8 permanecem preservadas integralmente. Esta Parte 9 torna-se o arquivo ativo do Registro Integral a partir deste ponto.

## Usuário
Continuar e resolver qualquer tipo de bloqueio

## Assistente — regra aplicada
- Continuação autônoma executada, seguindo a regra permanente: todo bloqueio deve ser diagnosticado, ter causa raiz investigada, correção interna tentada e revalidação registrada antes de ser classificado como externo.
- PR #245 permanece a única integração code/schema final-state e NÃO deve ser mesclado sem execução real green.

## GitHub Actions — nova tentativa de causa raiz
- Tentativa de ler `actions/permissions` via conector GitHub foi rejeitada porque endpoints administrativos/sensíveis não são expostos pela conexão disponível.
- Portanto settings privados de Actions/runner/billing continuam fora do alcance do conector.
- Pesquisa pública atual encontrou relatos da mesma semana com padrão `runner_id=0`/`steps=null`, reforçando que o sintoma acontece na camada de provisionamento antes do workflow.
- Não foi adotado novo serviço Railway como runner/CI porque isso poderia criar custo/estado permanente e a conexão atual não expõe lifecycle completo de serviço descartável.

## Provider outreach
- Plugin directory revalidado.
- AgentMail e Gmail permanecem disponíveis porém `installed=false`.
- Ambos já foram sugeridos recentemente; não houve nova sugestão repetitiva.
- Nenhum e-mail foi marcado como enviado.

## Company invitations — concorrência/integridade
- Gap identificado: duas criações concorrentes para o mesmo `tenant+email` poderiam produzir mais de um convite ativo.
- Migration `0047_company_invitation_integrity.sql` criada:
  - token hash obrigatório em SHA-256 hex de 64 chars;
  - `accepted_at` e `accepted_by_identity_id` devem existir juntos;
  - convite não pode ficar aceito e revogado simultaneamente;
  - índice único parcial garante no máximo um convite ativo por `(tenant_id, lower(email))`.
- `CompanyMembersController.invite` agora adquire `pg_advisory_xact_lock` por `tenant+email` antes de revogar e criar convite, serializando requests concorrentes.
- Novo E2E `http-company-invitation-concurrency-e2e.sh`:
  - dispara duas criações concorrentes;
  - exige apenas um convite ativo;
  - exige que exatamente um dos dois códigos possa ser aceito;
  - confirma membership final `owner` do destinatário.
- E2E conectado ao workflow CI.
- Validação complementar local: `bash -n` do script e transpile/syntax do controller passaram; isso NÃO substitui CI.

## Legal hold — histórico imutável de revisões
- Gap identificado: os campos `reviewed_at/reviewed_by/review_note` na linha do hold preservavam somente a última revisão.
- Migration `0048_privacy_legal_hold_review_history.sql` criada:
  - tabela `privacy_legal_hold_reviews` append-only;
  - registra operador, nota, review_at anterior, próxima review_at e timestamp;
  - trigger bloqueia UPDATE/DELETE;
  - sem acesso `app_runtime`.
- CLI `privacy-legal-holds-ops.ts` agora possui comando `history` e revisão transacional com `PoolClient`: lock do hold, INSERT histórico, UPDATE da projeção atual e COMMIT.
- E2E `privacy-legal-holds-e2e.sh` foi alterado para:
  - consultar `history`;
  - provar uma entrada completa;
  - tentar adulterar histórico via UPDATE e exigir falha `privacy_legal_hold_reviews_append_only`;
  - preservar evidência após release em vez de apagá-la.

## Produção Railway — domínio customizado
- Hipótese de porta incorreta foi investigada e descartada.
- Config Railway mostra domínio padrão e custom domain com portas distintas, porém logs HTTP/deploy provam que requisições ao host `mlivretrabalho.predibeacon.com` chegam ao Fastify e recebem respostas normais 404 para rotas inexistentes, sem upstream error.
- Portanto custom-domain routing está funcional; não é blocker atual.
- A ferramenta web ainda não consegue abrir `/v1/health/ready`, mas isso não é reinterpretado como falha da API.

## Auth — proteção contra brute force
- Auditoria encontrou login sem rate limit/throttle.
- Migration `0049_auth_signin_rate_limit.sql` criada com estado por identity, contador, janela e `locked_until`; revogada para `app_runtime`.
- `AuthController.signin` agora:
  - usa dummy scrypt para e-mail inexistente/desativado, reduzindo diferença de timing;
  - limita a 8 falhas em 15 minutos;
  - aplica lock de 15 minutos na 8ª falha;
  - serializa por row lock em transação;
  - senha correta durante lock também retorna 429;
  - sucesso remove o limiter.
- Novo E2E `http-auth-rate-limit-e2e.sh` prova 7x401, 8ª=429, correct-password ainda bloqueada, expiração simulada, sucesso e limpeza do limiter, além de ausência de state para e-mail inexistente.
- E2E conectado ao CI.

## Auth — integridade e limite de sessões
- Gap identificado: sessões de 30 dias podiam crescer sem limite por identidade.
- Migration `0050_session_integrity_and_cap.sql` criada:
  - token hash deve ser SHA-256 hex com 64 chars;
  - índice `(identity_id,created_at DESC,id DESC)`.
- Signin agora, dentro da mesma transação:
  - limpa sessões expiradas da identidade;
  - cria a nova sessão;
  - mantém no máximo 10 sessões ativas, removendo as mais antigas.
- `http-auth-rate-limit-e2e.sh` ampliado:
  - gera sessões adicionais;
  - exige exatamente 10 sessões ativas;
  - prova que o primeiro token foi removido pelo cap.

## Auth — limites de entrada
- Nova auditoria encontrou ausência de limites superiores em e-mail, senha e nome do workspace.
- `AuthController` agora aplica:
  - e-mail normalizado entre 3 e 320 caracteres, contendo `@` e sem whitespace;
  - senha de signup entre 8 e 128 caracteres;
  - senha de signin com máximo de 128 caracteres antes de qualquer scrypt;
  - nome do workspace com máximo de 120 caracteres.
- Objetivo: bloquear abuso de payload/custo criptográfico sem introduzir rate limiting por IP/proxy não confiável.
- `http-auth-rate-limit-e2e.sh` ampliado para provar rejeição de password 129 chars, e-mail >320, workspace >120 e signin com password oversized.

## Validação complementar local
- Ambiente local possui Node v22.16.0 e TypeScript 5.8.3 globais, mas não possui pnpm/dependency graph do repo.
- Bash/TypeScript syntax checks complementares foram executados para novos arquivos onde possível.
- Não tratar validação de sintaxe como build/typecheck/CI PASS.

## CI head atual
- Head #245 atual: `084121cde6aae490111e2ab458ef64131918a1b6`.
- Run: `36280437123`.
- Foundation job: `108511097230`.
- Resultado: `failure` antes do primeiro step, `steps=null`.
- Nenhum checkout/install/typecheck/build/migration/E2E executou.
- Portanto o hosted-runner provisioning continua o blocker de execução; não surgiu evidência de falha funcional dos novos commits.

## Governança atualizada
- PR #245 body reconciliado para migrations 0034–0050 e novos hardenings.
- Issue #214 atualizado com CI head/run e evidência de custom-domain routing funcional no Railway.
- Issue #219 atualizado com invitation integrity, legal-hold immutable review history, auth limiter e session cap.

## Estado ativo
- PR #245 permanece OPEN e NÃO MESCLADO; `mergeable` pode oscilar transitoriamente quando `main` recebe documentação, sem evidência de conflito code/schema.
- Migrations preparadas no PR alcançam `0050`.
- Production-DONE/Pilot-DONE continuam abertos.
- Esta Parte 9 permanece o Registro Integral ativo para a próxima continuação.
