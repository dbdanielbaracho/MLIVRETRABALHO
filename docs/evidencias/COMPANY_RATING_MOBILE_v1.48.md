# Evidência — Company Rating Mobile v1.48

Data: 2026-09-23

## Escopo

Fechar a etapa de avaliação da jornada empresa após um trabalho concluído, sem alterar o modelo de dados de ratings.

## Implementado

- `GET /v1/company/dashboard/completed` lista até 25 assignments concluídos do tenant;
- retorno inclui trabalho, local, profissional, data de conclusão e avaliação já feita pelo usuário da empresa;
- tela `empresa-inicio` carrega trabalhos concluídos e permite nota de 1 a 5 estrelas;
- `POST /v1/assignments/:id/rating` continua aceitando apenas assignments concluídos;
- papel sem permissão agora recebe `403 company_role_required`, em vez de `400`;
- nova avaliação do mesmo usuário/assignment atualiza a anterior por `ON CONFLICT`, sem duplicar linha;
- teste integrado `professional-journey.sh` valida persistência da nota e atualização idempotente no PostgreSQL.

## Limites

- este slice implementa avaliação empresa → profissional, que alimenta o Work Passport existente;
- avaliação profissional → empresa não faz parte do schema atual e não foi inventada neste slice;
- E2E em dispositivo físico continua pendente no Definition of Done.
