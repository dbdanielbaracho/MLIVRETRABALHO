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
