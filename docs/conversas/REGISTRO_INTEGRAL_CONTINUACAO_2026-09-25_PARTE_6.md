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
