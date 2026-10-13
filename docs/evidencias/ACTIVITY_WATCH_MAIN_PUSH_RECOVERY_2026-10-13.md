# Evidência — Project Activity Watch em todo push da main (2026-10-13)

## Sintoma observado

A issue #493 (`[Activity Watch] Sem commit por mais de 15 minutos`) foi criada por uma execução agendada e permaneceu aberta, sem comentário, mesmo após novos commits e os merges #506/#507. A consulta de runs não localizou execução do Project Activity Watch nos SHAs desses merges.

## Causa reproduzida

O workflow declarava:

- `push.branches: [main]`;
- `push.paths` restrito a `.github/workflows/project-activity-watch.yml` e `scripts/tests/project-activity-watch.test.mjs`.

Assim, um commit normal de produto/documentação não disparava o monitor. A rotina interna sabia encerrar um alerta após commit recente, mas não era executada no evento necessário.

Foi adicionada regressão que exige:

1. push em `main`;
2. ausência de `push.paths`, para observar toda entrega;
3. manutenção de `pull_request.paths`, preservando preview restrito e sem escrita em issues.

Resultado RED: 10 testes aprovados e 1 falha, mostrando exatamente o filtro indevido.

## Correção e resultado local

Foi removido somente o filtro de paths do evento push. Permissões, concorrência, cron, resumo factual e lógica de criação/fechamento permanecem inalterados.

`node --test scripts/tests/project-activity-watch.test.mjs`

Resultado GREEN local: 11 testes, 11 aprovados, zero falhas.

## Estado real antes do PR

- main: `c8e201868bcab5f872cb4e21a112fed56e2db94b`;
- issue #493: OPEN, zero comentários;
- último schedule localizado: `38343885280`, SUCCESS;
- merges recentes sem run do monitor em seus SHAs não provavam falha do cron, mas comprovavam que o filtro de push excluía essas entregas.

## Gates pendentes

No snapshot de preparação ainda faltam PR, CI próprio, preview read-only, merge, run push no SHA real e confirmação factual de comentário/fechamento de #493. Esses recibos devem ser registrados no corpo do PR após os eventos reais, sem commit autorreferente.
