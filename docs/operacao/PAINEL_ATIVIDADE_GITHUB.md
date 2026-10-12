# Painel de atividade do MLivreTrabalho

O workflow [Project Activity Watch](../../.github/workflows/project-activity-watch.yml) faz uma amostragem do GitHub a cada 15 minutos (o agendamento pode atrasar). O resumo de cada execução aparece em **Actions → Project Activity Watch → execução → Summary**.

O monitor consulta commit mais recente da `main`, PRs abertos e GitHub Actions em andamento. Se não houver commit por mais de 15 minutos, abre um único issue de alerta; ao detectar um commit recente, encerra esse issue. Issues são avisos de ausência de commits, **não prova de que a programação parou**. O workflow em execução, por si só, também não prova que um desenvolvedor ou agente está programando. Alertas do GitHub dependem das configurações de notificações do repositório e permissões de Issues/Actions.

Este monitor **não cria nem executa um agente contínuo 24/7**, não invoca ChatGPT e não conclui automaticamente as 13 áreas. Não declarar o projeto entregue a partir do painel. Workflows agendados não asseguram disparos pontuais, podem atrasar ou ser desabilitados pelo GitHub. Não há serviço externo, deploy ou contratação adicional.


## Validação e limite atual (2026-10-12)

O smoke automatizado `scripts/tests/project-activity-watch.test.mjs` executa a lógica real com fixtures de API e relógio, incluindo paginação de issues para impedir alertas duplicados. Passar esse teste não comprova execução do cron ou permissões reais de Issues. Até a consulta desta rodada, a API de runs agendados retornou zero; o primeiro run real continua sem evidência. Consultar runs gerais/event=schedule, job/logs/summary e o alerta antes de declarar o monitor executado.
