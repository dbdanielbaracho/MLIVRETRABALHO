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

## Assistente — CI diagnóstico cross-OS concluído
- PR #244 foi reaberto temporariamente para testar também `windows-latest`.
- Run `36154183174` reproduziu falha antes do primeiro step em quatro classes de runner:
  - ubuntu-22.04 job `108134575426`;
  - ubuntu-slim job `108134575685`;
  - ubuntu-24.04 job `108134575775`;
  - windows-latest job `108134575893`.
- Todos retornaram failure com `steps=null`, sem execução de shell/PowerShell.
- Isso elimina hipótese Linux-only e reforça que a falha está antes da entrega do hosted runner ao workflow.
- Criado e depois atualizado `docs/evidencias/GITHUB_ACTIONS_RUNNER_SUPPORT_PACKET_2026-09-25.md` com reprodução cross-OS e texto pronto para GitHub Support.
- Issue #214 reconciliado com o support packet.
- PR #244 novamente fechado sem merge após conclusão do diagnóstico.

## Assistente — Provider/outreach #228
- Canais oficiais atuais foram pesquisados e incorporados ao `PROVIDER_OUTREACH_PACKET_2026-09-24.md`:
  - Asaas: `contato@asaas.com.br` e `0800 009 0037`;
  - Pagar.me: `comercial@pagar.me`;
  - Datavalid/Serpro: `comercial@serpro.gov.br`;
  - Mercado Pago: contato comercial/formulário e contrato específico para produtos marketplace/facilitator; 1:N continua condicional.
- Issue #228 recebeu comentário com os canais concretos.
- AgentMail foi sugerido como integração de caixa dedicada do projeto para envio/recebimento de outreach sem depender de Gmail pessoal.
- Nenhum e-mail foi marcado como enviado porque a integração ainda depende de autorização/conexão do usuário.

## Assistente — alternativa gratuita de APK / EAS
- Pesquisa em documentação oficial Expo confirmou plano EAS Free atual de $0/mês, com até 15 builds Android + 15 iOS por ciclo e fila low-priority.
- Expo documenta `distribution: internal` e/ou `android.buildType: apk` para gerar APK instalável.
- Em monorepo, `eas.json` deve ficar no root do app e os comandos EAS devem ser executados a partir daquele diretório.
- Criada branch `feat/eas-pilot-build-route` sobre #243.
- Criado `apps/mobile/eas.json` com profile `pilot`, internal distribution + APK e `EXPO_PUBLIC_API_URL=https://mlivretrabalho.predibeacon.com/v1`.
- Não foi criado token, senha, keystore nem Expo `projectId` fictício.
- Criado `docs/evidencias/EAS_FREE_PILOT_BUILD_ROUTE_2026-09-25.md` no main.
- Aberto PR #245 `build(mobile): add free EAS pilot APK route`, empilhado sobre #243.
- Issue #220 atualizado: APK generation pode ser destravado via EAS Free quando conta/projeto Expo real for autenticado/vinculado; não fazer upgrade pago automaticamente.

## Assistente — WEB-ARCH root cause verificada
- `pnpm-lock.yaml` auditado diretamente.
- Importers atuais: `.`, `apps/api`, `apps/mobile`, `packages/db`; não existe `apps/web`.
- Nenhuma entrada de pacote Next.js encontrada.
- `react-dom` aparece apenas transitivamente via Expo Router e não constitui dependency graph Next.js reproduzível.
- Portanto WEB-ARCH precisa de package resolution real para criar Next.js e atualizar lockfile; não fabricar lockfile manualmente.
- Issue #224 atualizado com essa causa técnica e as duas rotas legítimas de desbloqueio: restaurar #214 ou autorizar/conectar outro ambiente reproduzível com GitHub/npm.

## Assistente — matriz global de root cause
- Criado `docs/evidencias/BLOCKER_ROOT_CAUSE_MATRIX_2026-09-25.md`.
- A matriz registra sintoma, fronteira da causa raiz, correção já tentada, ação restante, dependência externa e prova de fechamento para #214, PR stack, #215/#228, #219, #220, #224 e probe de produção.
- Prioridade registrada: GitHub runner → outbound provider channel → Expo Free APK → device físico → pentest independente → Web assim que existir package environment.
- Cost guardrail permanente: não ativar serviço/plano pago automaticamente.

## Assistente — reconciliação de gates e checkpoint
- #215 atualizado para Documento da Verdade v1.13, canais provider e root-cause explícita: fatos contratuais/sandbox pertencem ao provider e não podem ser inventados.
- #219 atualizado para incluir toda a stack #233–#243 e o diagnóstico real do CI.
- `INTERNAL_COMPLETION_CHECKPOINT_2026-09-24.md` reconciliado com:
  - stack #233–#243;
  - PR #245 EAS;
  - support packet do GitHub;
  - provider channels;
  - blocker root-cause matrix;
  - Registro Integral Partes 1–6.
- Probe público canônico e Railway direct domain foram tentados novamente via ferramenta web e seguem inacessíveis a partir deste ambiente; isso não é interpretado como API failure. Railway continua reportando deployments SUCCESS.

## Usuário
continuar

## Assistente — consolidação e auditoria final-state
- A continuação foi executada sem voltar a perguntar autorização.
- PR #245 foi retargetado de `feat/company-member-invitations` para **`main`** e renomeado para `feat(integration): privacy runtime, owner handoff and EAS pilot route`.
- Nova estratégia: #245 é o PR único final-state contendo o trabalho #233–#245; depois de CI/equivalente green, mesclar #245 e fechar #233–#243 como superseded/integrated, sem merges redundantes.
- Run após retarget `36160617457`, job `108155974501`, continuou falhando antes do primeiro step (`steps=null`), confirmando que a consolidação não muda a causa externa #214.

## Assistente — auditoria estática do PR #245 enquanto CI não executa
- Comparação `main...feat/eas-pilot-build-route` foi revisada para identificar alterações desproporcionais e riscos silenciosos.
- `apps/mobile/app/empresa-inicio.tsx` aparecia com grande remoção de linhas por minificação acidental; comparação com `main` confirmou ausência de perda funcional.
- Formatação legível foi restaurada, preservando somente os deltas funcionais reais `Membros` e `Privacidade e dados`.
- Encontrado gap em chat retention: legal hold da identidade do profissional designado não preservava conversa se ele nunca tivesse enviado mensagem.
- `privacy-retention.ts` foi corrigido para proteger também `professional_profiles.identity_id` associado ao assignment.
- `privacy-retention-e2e.sh` foi ampliado com conversa onde o profissional held não é sender e deve ser preservada.

## Assistente — hardening de owner handoff
- Auditoria de `company-members.controller.ts` encontrou bypass: `ON CONFLICT ... DO UPDATE role` permitia ao owner convidar o próprio e-mail como `manager` e aceitar, potencialmente deixando tenant sem owner; também permitia sobrescrever silenciosamente papel de membro existente.
- Correção no PR #245:
  - membership inexistente → insere papel convidado;
  - mesmo papel → aceite idempotente;
  - `admin/manager → owner` → promoção explícita permitida;
  - qualquer outro role change por convite → `invitation_existing_membership_role_change_forbidden`.
- `http-company-members-e2e.sh` agora prova que sole owner não consegue se auto-rebaixar e continua owner, além de manter teste de owner handoff seguro.

## Assistente — hardening do retention job privilegiado
- `privacy_legal_holds` é deliberadamente inacessível ao `app_runtime`; retention é operação de manutenção privilegiada.
- Gap encontrado: `privacy-retention --apply` aceitava simplesmente `DATABASE_URL`, tornando fácil executar mutação destrutiva pela conexão errada.
- Correção fail-closed aplicada no PR #245:
  - `--apply` exige explicitamente `PRIVACY_MAINTENANCE_DATABASE_URL`;
  - sem essa variável, retorna `PRIVACY_MAINTENANCE_DATABASE_URL_required_for_apply` antes de abrir o pool destrutivo;
  - dry-run ainda pode usar maintenance URL quando fornecida ou DATABASE_URL para inspeção compatível.
- E2E reforçado:
  - primeiro tenta `--apply` apenas com DATABASE_URL e exige falha;
  - depois executa com `PRIVACY_MAINTENANCE_DATABASE_URL` explícita e valida retenção/legal holds.

## Assistente — governança reconciliada com PR único
- Issue #214 atualizado para substituir checklist de merges sequenciais por validação/merge do PR #245 final-state.
- Issue #219 atualizado para considerar #245 como integração de runtime Privacy/Trust/ownership.
- Checkpoint atualizado: #245 é agora a única porta de merge do conjunto #233–#245; #233–#243 serão fechados como superseded após #245 green/merged.
- Regra mantida: auditoria estática e correções internas aumentam confiança, mas **não contam como CI PASS**; não mesclar #245 até execução real de typecheck/build/migrations/E2Es.
