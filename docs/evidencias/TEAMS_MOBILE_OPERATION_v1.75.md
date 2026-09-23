# Teams Mobile Operation — v1.75

## Objetivo

Tornar Workforce Teams uma capacidade realmente operável pela empresa no mobile, sem digitação de UUIDs ou acesso manual ao banco.

## Backend

`TeamsController` agora oferece, sempre sob autenticação, papel empresarial e tenant explícito:

- `GET /v1/company/teams` — lista equipes e quantidade de membros;
- `POST /v1/company/teams` — cria equipe;
- `GET /v1/company/teams/:id/members` — lista membros com nome, função e cidade;
- `POST /v1/company/teams/:id/members` — adiciona profissional já conhecido pela empresa;
- `DELETE /v1/company/teams/:id/members/:professionalId` — remove membro.

`GET /v1/company/dashboard/assignments` passa a retornar também `professionalId`, permitindo que o cliente escolha profissionais já confirmados/em andamento pelo nome, sem pedir identificadores técnicos ao usuário.

## Mobile

Nova tela `apps/mobile/app/equipes.tsx`:

- cria equipe informando apenas o nome;
- lista equipes e número de membros;
- lista membros por nome, função e cidade;
- reúne profissionais conhecidos a partir de assignments ativos e concluídos;
- adiciona/remover membro com um toque;
- lista vagas abertas;
- consulta `Team Allocation` para a vaga escolhida;
- mostra score 0–100 e razões já calculadas pelo Matching Engine;
- não realiza confirmação automática de profissional.

A tela Operação ganhou atalho direto `Equipes`.

## E2E

`scripts/http-team-allocation-e2e.sh` agora comprova também o contrato necessário ao mobile:

- dashboard ativo expõe `professionalId` para os dois profissionais conhecidos;
- `GET members` retorna os dois IDs com nomes humanos corretos;
- alocação real continua ordenando Bartender/São Paulo acima de Cozinha/Rio;
- vaga fora da disponibilidade retorna lista vazia;
- `DELETE member` remove o profissional;
- nova leitura de membros contém apenas o membro restante;
- `memberCount` cai de 2 para 1.

## Limites

Esta fatia não transforma o ranking em contratação automática. A seleção/contratação continua sendo uma decisão explícita da empresa. Não há alteração de PSP, Trust enforcement ou política jurídica.

## Gate

Merge somente após frozen lockfile, typecheck, build, Expo Android export, testes, migration runner, jornadas HTTP (incluindo Team Allocation) e Production Truth contract permanecerem verdes.
