# Registro Integral da Conversa — Continuação — 2026-09-27 — Parte 13

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-27_PARTE_12.md`. As Partes anteriores permanecem preservadas integralmente. Esta Parte 13 registra a instrução operacional mais recente e a continuação da execução do projeto MLIVRETRABALHO.

---

## Usuário
falei para nao usar o tinyfish porque voce está usando ele precisa de credito, já disse que é para usar o railway

## Assistente — correção operacional
- Reconhecido que TinyFish não deveria ter sido usado sob o guardrail de custo do projeto.
- Regra operacional reafirmada: não usar TinyFish novamente no MLIVRETRABALHO.
- Priorizar GitHub + Railway + ferramentas locais disponíveis.
- Não autorizar pagamento, upgrade, nova cobrança ou infraestrutura temporária metered sem instrução explícita do usuário.

---

## Usuário
continuar o projeto e so parar quando terminar não precisa mostrar na tela apenas grave no arquivo o que voce está fazendo do github

## Assistente — execução silenciosa registrada
- O usuário pediu continuidade sem atualizações narrativas na tela; o trabalho deve ser registrado no GitHub.
- Railway foi inspecionado como possível executor equivalente ao GitHub Actions.
- Estado Railway verificado:
  - projeto `MLIVRETRABALHO`;
  - somente o environment `production` existe;
  - serviços existentes: `@mlivretrabalho/api` e `Postgres`;
  - API de produção continua vinculada à branch `main`;
  - não existe atualmente PR/ephemeral environment para o PR #245.
- O Railway Agent foi usado apenas para inspeção/diagnóstico, sem mutação de infraestrutura.
- A primeira análise do agent sugeriu PR Environments como alternativa, mas depois a própria verificação com documentação/suporte do Railway corrigiu a afirmação: PR/preview environments consomem recursos metered normais enquanto existem e não devem ser tratados como custo zero.
- Como o projeto mantém a regra `não gerar novo custo`, nenhum preview environment, staging temporário, serviço adicional, banco adicional ou volume adicional foi criado.
- Produção não foi alterada, a branch de produção não foi trocada e migrations 0034–0052 não foram aplicadas em produção.
- Issue #224 WEB-ARCH foi atualizada com a conclusão: Railway permanece plataforma de produção/deploy, mas preview temporário não será usado como executor enquanto não houver prova de custo incremental zero ou autorização explícita de custo.
- Issue #214 foi atualizada com o mesmo guardrail e com o caminho de resolução permitido: resolver o billing lock do GitHub sem novo custo ou usar um executor já pago/zero-incremental-cost reproduzível.
- O head anterior `075fea37cd120a50b6298231cde1a367bdb97d37` disparou CI #814 (`36365179105`), foundation job `108750019047`, que novamente terminou `failure` com `steps=null`; nenhum código da aplicação executou.
- O bloqueio de CI permanece externo: GitHub Actions não inicia jobs por billing lock da conta.
- Não foi feito merge do PR #245 e não foi feito deploy do código integrado sem execução green real.

## Estado de continuidade
- Continuar usando GitHub e Railway, sem TinyFish.
- Continuar registrando todas as decisões e execuções no Registro Integral.
- Não usar produção como ambiente de teste da branch de integração.
- Não criar infraestrutura temporária metered sob o atual guardrail de custo.
- Assim que existir executor reproduzível sem novo custo, executar integralmente typecheck/build/migrations/E2Es do PR #245, corrigir qualquer falha real e prosseguir para merge/deploy/Production Truth.


---

## Usuário
Check the MLIVRETRABALHO GitHub Actions state for PR #245. If a hosted runner is finally allocated and workflow steps begin executing, continue the project from the current source of truth: inspect the real CI steps/logs, fix any actual code/test failure, rerun until green where safe, then proceed with final diff review, merge #245 only after real green evidence, deploy, run Production Truth, and update GitHub issues/checkpoint/Registro Integral. If the runner still fails before the first step with runner_id=0/steps=null, do not notify me unless there is a meaningful change in cause/status or a concrete action I need to take; continue no other unsafe/paid action automatically.

## Assistente
O runner hospedado voltou a executar steps reais. A primeira execução real expôs erros de TypeScript; esses guards foram corrigidos antes da continuação registrada abaixo.

## Usuário
CONTINUAR

## Assistente — execução até CI green, merge e produção
- PR #245 foi retomado a partir do source of truth real.
- CI #832 executou runner real; typecheck/build/mobile/tests/migrations/privacy passaram, e o HTTP journey revelou falta de privilégio direto em `identities` no talent-pool.
- A correção preservou least privilege: foi criada a migration `0055_active_tenant_professional_boundary.sql` com funções tenant-bound `SECURITY DEFINER`, em vez de devolver SELECT direto de `identities` ao runtime.
- Talent pools, replacement e team allocation passaram a usar a boundary tenant-safe para excluir identidades desativadas.
- O CI revelou em seguida `SELECT ... FOR UPDATE` em `safety_case_appeals` incompatível com a revogação intencional de UPDATE; a serialização foi alterada para advisory transaction lock, preservando a imutabilidade da tabela.
- O HTTP E2E do Copilot revelou uma lacuna determinística: “qual é meu próximo turno?” não casava com a intenção `show_schedule`; foi adicionada a expressão normalizada `proximo turno`.
- CI #841, run `36370113823`, foundation job `108764463747`, head `eb9d88a71d90cab22800e3cd922240e8a067fee8`: SUCCESS real.
- Evidência green: setup, PostgreSQL, checkout, Node, pnpm, dependencies, typecheck, build, Android export, DB tests, production migration runner, privacy/legal-hold contract e HTTP journey/readiness/Production Truth contract concluíram `success`.
- Diff final vs main revisado: branch estava 170 commits à frente, 0 atrás, 64 arquivos alterados; PR permanecia mergeable.
- PR #245 foi mesclado somente após o green real. Merge commit: `979ed248bc79eeb7b9f6129b347778396d84a2cd`.
- Railway detectou automaticamente o merge em `main` e executou deployment `ad77707b-0078-4281-86d0-693bf5df1972`.
- Deployment Railway terminou `SUCCESS`; build TypeScript passou, pre-deploy migrations foram executadas e o healthcheck `/v1/health/ready` passou na primeira tentativa.
- PRs empilhados #234–#243 foram comentados como integrated/superseded por #245 e fechados; #233 já havia sido fechado automaticamente.
- Nenhum TinyFish, plano pago, preview environment ou infraestrutura metered adicional foi usado.


---

## Usuário
CONTINUAR E SEGUIR NOSSAS REGRAS DE SO PARAR QUANDO TERMINAR NÃO ESQUECER DE REGISTRAR NOSSA CONVERSA NO GITHUB E ME AVISAR SE PARAR

## Assistente — regra de continuidade reafirmada
- Continuar o projeto MLIVRETRABALHO a partir do estado pós-merge/deploy do PR #245.
- Seguir execução contínua até o fechamento dos gates restantes que possam ser executados com segurança.
- Registrar no GitHub esta instrução e as decisões/execuções subsequentes.
- Se surgir bloqueio externo, ação humana obrigatória ou risco/custo que impeça continuação segura, avisar explicitamente o usuário antes de parar.
- Permanecem os guardrails: GitHub + Railway; não usar TinyFish; não acionar custo novo, plano pago ou infraestrutura metered adicional sem autorização explícita.


## Assistente — continuação pós-PR245
- Reavaliados os gates #214, #215, #219, #220, #224 e #228.
- Confirmado que o retorno do GitHub hosted runner removeu o antigo bloqueio interno de resolução de dependências do WEB-ARCH.
- Criada branch `feat/web-enterprise-baseline`.
- Implementado `apps/web` real com Next.js + React + TypeScript.
- Criado workflow temporário de bootstrap de lockfile; run `36370949307` executou `pnpm install --lockfile-only` e commitou o lockfile de forma reproduzível.
- Criado PR #249 `feat(web): enterprise console baseline`.
- A Web foi ampliada para usar autenticação real da API, sessão apenas na aba via sessionStorage, memberships empresariais, tenant switch com limpeza/reload tenant-scoped, dashboard, analytics e planner.
- Financeiro permanece explicitamente sem ação de dinheiro enquanto FIN-RISK está aberto; Trust/Safety permanece human-review.
- CI #847 / run `36371219468` / job `108767816628` passou integralmente: frozen install, typecheck, build, Android export, tests, migrations, privacy/legal hold e HTTP/Production Truth contract.
- PR #249 mesclado somente após green. Merge commit: `d3e780d3b350acee55db528bffff6031a09cf453`.
- O deploy Web separado no Railway não foi criado porque novo service é infraestrutura metered e o guardrail atual proíbe custo novo sem autorização.
- Para avançar #220 sem EAS pago, criada branch operacional `ops/pilot-apk-evidence` apenas para disparar o workflow de APK já existente via hosted runner.
- Pilot APK workflow run `36371402054`, job `108768367247`, head `a37f8742db0ce60177e25704cbfe59f55c582d4a`: SUCCESS.
- Artifact `mlivretrabalho-pilot-apk`: id `10949985331`, tamanho 44,714,642 bytes, digest `sha256:ab726632c942ffe9e9ff62e7cf5bc80f06e6c88f292a4ac088c42be77572d81c`, expira em 2026-10-12.
- #220 atualizado: geração do APK agora tem evidência real; instalação/E2E em aparelho físico e pentest independente continuam externos.
- #219 atualizado: runtime/privacy/network-shared já têm prova real; restam provider callback/propagation e pentest.
- #224 atualizado: implementação Web iniciou e está mergeada/green; expansão completa e deploy Web separado permanecem.
- #215/#228 continuam bloqueados por fatos externos de PSP/KYC: elegibilidade comercial, contrato/preço, sandbox exato e responsabilidades.
