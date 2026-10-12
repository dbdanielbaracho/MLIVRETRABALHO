# Painel de atividade do MLivreTrabalho

O workflow [Project Activity Watch](../../.github/workflows/project-activity-watch.yml) faz uma amostragem do GitHub a cada 15 minutos (o agendamento pode atrasar). O resumo de cada execução aparece em **Actions → Project Activity Watch → execução → Summary**.

O monitor consulta commit mais recente da `main`, PRs abertos e GitHub Actions em andamento. Se não houver commit por mais de 15 minutos, abre um único issue de alerta; ao detectar um commit recente, encerra esse issue. Issues são avisos de ausência de commits, **não prova de que a programação parou**. O workflow em execução, por si só, também não prova que um desenvolvedor ou agente está programando. Alertas do GitHub dependem das configurações de notificações do repositório e permissões de Issues/Actions.

Este monitor **não cria nem executa um agente contínuo 24/7**, não invoca ChatGPT e não conclui automaticamente as 13 áreas. Não declarar o projeto entregue a partir do painel. Workflows agendados não asseguram disparos pontuais, podem atrasar ou ser desabilitados pelo GitHub. Não há serviço externo, deploy ou contratação adicional.


## Validação e limite atual (2026-10-12)

O smoke automatizado `scripts/tests/project-activity-watch.test.mjs` executa a lógica real com fixtures de API e relógio, incluindo paginação de issues para impedir alertas duplicados. Passar esse teste não comprova execução do cron ou permissões reais de Issues. Até a consulta desta rodada, a API de runs agendados retornou zero; o primeiro run real continua sem evidência. Consultar runs gerais/event=schedule, job/logs/summary e o alerta antes de declarar o monitor executado.

O workflow também executa uma prévia de leitura quando seus arquivos mudam em PR: consulta APIs reais e publica o resumo, sem criar/comentar/fechar issues. No merge de alterações do monitor, roda novamente na main com o comportamento normal. Esses eventos permitem comprovar execução sem disparo manual; continuam separados da prova do cron agendado. Os logs ACTIVITY_WATCH_OBSERVED registram os mesmos fatos do resumo. Nenhum destes eventos executa um agente de desenvolvimento.

## Execução comprovada — 2026-10-12
A prévia de leitura [38197598983](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38197598983) e a execução normal na main [38198337977](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38198337977) passaram, com consultas reais, summary e logs ACTIVITY_WATCH_OBSERVED. A segunda observou mainfea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30 às03:04:56UTC, commit recente,1PR e3Actions. Não havia alerta aberto; nenhuma escrita de teste foi inventada.
Essas provas são de eventos pull_request/push, não do cron. A consulta event=schedule continua com0; a primeira execução agendada ainda precisa de evidência. Não confundir monitor executando com desenvolvedor programando. O conector lista runs por GET, porém não oferece dispatch e bloqueia o endpoint workflow; a prévia/push permitem validação efetiva sem exigir ação manual.
Os10smokes exercitam o script real com fixtures, incluindo página2, falha de API sem escrita, preview e PR homônimo que não pode ser fechado como se fosse uma issue. A filtragem usa pull_request para distinguir os tipos. Recibos completos: ../evidencias/AUTONOMOUS_CYCLE_RECEIPTS_479_486_2026-10-12.md.
