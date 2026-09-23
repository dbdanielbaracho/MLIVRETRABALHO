# Company Operations Planner — v1.77

## Objetivo

Implementar a primeira fatia do Planner prevista no Plano Mestre sem inventar dados que ainda não existem no domínio.

O modelo atual de `company_jobs` não possui headcount/quantidade requerida por vaga. Portanto, esta versão **não afirma cobertura completa**. Ela apresenta fatos operacionais reais por turno e alerta apenas quando existe zero profissional confirmado/ativo/concluído.

## API

Novo endpoint tenant-scoped:

`GET /v1/company/planner`

Para cada trabalho da empresa retorna:

- identificação/título/função/local/cidade;
- janela de início/fim e valor;
- status da vaga;
- quantidade de interesses (`interested` + `confirmed`);
- quantidade de assignments em `confirmed`;
- quantidade de assignments em `checked_in`, `in_progress` ou `checked_out`;
- quantidade concluída;
- quantidade cancelada.

Todos os subselects de assignments incluem `tenant_id`; a consulta principal restringe `company_jobs` ao tenant autenticado.

## Mobile

Nova tela `apps/mobile/app/planejamento.tsx`, acessível pela tela Operação:

- linha do tempo cronológica dos trabalhos;
- função/cidade/local;
- início/fim e valor;
- situação derivada apenas dos contadores reais;
- interessados, confirmados, em andamento, concluídos e cancelados;
- alerta `nenhum profissional confirmado` somente quando os contadores confirmados/ativos/concluídos são zero.

A tela informa explicitamente que não estima headcount e não confirma profissionais automaticamente.

## E2E dedicado

`scripts/http-planner-e2e.sh` cria duas empresas independentes e um profissional e comprova:

1. trabalho A sem interesse/assignment retorna todos os contadores operacionais zerados;
2. trabalho A confirmado retorna `interestCount=1` e `confirmedCount=1`;
3. trabalho da empresa B não aparece no Planner da empresa A;
4. após check-in + start, o mesmo turno passa para `activeCount=1` e `confirmedCount=0`;
5. após check-out + complete, passa para `completedCount=1` e `activeCount=0`.

O teste passa a fazer parte permanente do CI completo.

## Limites

- sem headcount/cobertura percentual nesta versão;
- sem previsão automática de falta;
- sem confirmação/contratação automática;
- sem mudança em FIN-RISK, PSP ou Trust enforcement.

## Gate

Merge somente após frozen lockfile, typecheck, build, Expo Android export, testes, migration runner, todas as jornadas HTTP (incluindo Planner) e Production Truth contract permanecerem verdes.
