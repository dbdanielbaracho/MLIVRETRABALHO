# Registro Integral da Conversa — Continuação — 2026-09-25 — Parte 6

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-25_PARTE_5.md`. As Partes anteriores permanecem preservadas integralmente. Esta Parte 6 torna-se o arquivo ativo do Registro Integral a partir deste ponto.

## Usuário
Sempre quando houver bloqueio identificar o problema e resolver

## Assistente — nova regra permanente de execução
- Regra adicionada à governança operacional do MLIVRETRABALHO: bloqueio não deve ser apenas declarado.
- Para todo bloqueio, a sequência obrigatória passa a ser:
  1. identificar o sintoma com evidência;
  2. investigar a causa raiz;
  3. tentar correção interna segura;
  4. reexecutar/revalidar após a correção;
  5. documentar o resultado e as evidências;
  6. somente classificar como externo quando todas as ações internas razoáveis estiverem esgotadas;
  7. se externo, registrar exatamente o que depende de terceiro/infraestrutura e continuar outros blocos independentes.
- Não mascarar erro como "bloqueio externo" antes de investigar.
- Não inventar correção nem evidência de sucesso.
- Esta regra complementa a estratégia já vigente de continuar autonomamente e avisar quando um gate realmente parar.

## Aplicação imediata ao bloqueio atual de CI
- Workflow `.github/workflows/ci.yml` revisado na branch `feat/company-member-invitations`; estrutura normal, `runs-on: ubuntu-latest`, steps completos definidos.
- Repositório é público e a conexão atual tem permissões admin/maintain/push/pull/triage.
- PR #243 gerou run `36096510698`.
- Job `foundation` id `107949791300` terminou em ~2 segundos com `steps=[]`, `runner_id=0`, `runner_name=""`, `runner_group_id=0`.
- Portanto o runner não foi provisionado; nenhum checkout, install, typecheck, build, migration ou E2E executou.
- Próxima obrigação de diagnóstico: verificar configurações/limites de GitHub Actions/billing quando acessíveis; se não forem acessíveis por API/conector, fornecer ao usuário o caminho exato de UI e registrar o resultado antes de manter classificação externa.

## Usuário
Continuar e resolver todos os bloqueios

## Assistente — isolamento definitivo do bloqueio de runner
- GitHub Status consultado em 2026-09-25: Actions reportado como operacional e sem incidente público corrente.
- Documentação oficial atual confirma que standard GitHub-hosted runners em repositórios públicos são gratuitos/ilimitados; quota normal de minutos de Actions não explica por si só este repositório público.
- Criado PR diagnóstico temporário #244 a partir de `main`, sem alteração de produto.
- Workflow diagnóstico continha apenas um `echo/uname`, sem checkout, Node, pnpm, PostgreSQL ou código do produto.
- Primeiro run demonstrou `ubuntu-22.04` falhando antes dos steps e `ubuntu-24.04` também terminando da mesma forma.
- Segundo run `36153551313` adicionou `ubuntu-slim` para testar infraestrutura de container distinta.
- Resultado do run `36153551313`:
  - `ubuntu-slim` job `108132494182`: failure, `steps=null`;
  - `ubuntu-22` job `108132494444`: failure, `steps=null`;
  - `ubuntu-24` job `108132494497`: failure, `steps=null`.
- Conclusão suportada pela evidência: falha ocorre na camada GitHub Actions entitlement/provisioning/configuração antes do runner/step, e não em aplicação, pnpm, PostgreSQL, migrations, E2E ou imagem Ubuntu específica.
- Issue #214 atualizado com o diagnóstico completo e IDs de run/jobs.
- PR #244 fechado sem merge após cumprir a função diagnóstica.
- Configurações privadas remanescentes (`Settings → Actions → General/Runners` e account Billing/Budgets) não são expostas pelo conector GitHub disponível; precisam ser verificadas na conta GitHub. Se estiverem normais, o caso deve ser escalado ao GitHub Support usando os IDs já coletados.

## Revalidação de ambiente e produção
- Container de execução continua sem resolver DNS para `github.com` e `registry.npmjs.org`; isso explica por que ele não pode substituir o CI nem gerar lockfile Next.js reproduzível.
- Railway production revalidado: `@mlivretrabalho/api` deployment `849dd047-c70f-4a16-8624-9a3a01bd8098` = SUCCESS; Postgres deployment `b7718c66-745f-4027-889c-42b52f1c6a63` = SUCCESS; pending work zero.

## Auditoria da pilha de PRs
- PR #233 apareceu `mergeable=false`; investigação mostrou branch 3 commits à frente e 5 atrás de main.
- Comparação main → #233 mostrou apenas 3 arquivos alterados pela feature.
- `packages/db/package.json` de `main` é idêntico ao merge-base; #233 somente acrescenta migration/test `0034` à sequência.
- Portanto não foi identificado conflito semântico de conteúdo a corrigir neste momento; não usar isso como justificativa para merge sem CI.

## Estado causal dos blockers
- #214 / PRs #233–#243: causa comum principal = GitHub Actions não provisiona hosted runner; diagnóstico interno esgotado até settings privados/suporte.
- #224 Web: adicionalmente bloqueado porque o ambiente atual não resolve GitHub/npm; não fabricar lockfile.
- #215/#228 Finance/provider: contrato, pricing, sandbox e credenciais reais dependem de provider/outreach externo; preparação interna já concluída.
- #219 Trust/KYC: callback/provider binding concreto depende do provider/sandbox real; runtime privacy code está na pilha #233–#243 e portanto herda #214.
- #220 Device/pentest: aparelho físico, signing/credentials e pentest independente são dependências externas por definição; pacotes internos de execução/evidência já existem.
