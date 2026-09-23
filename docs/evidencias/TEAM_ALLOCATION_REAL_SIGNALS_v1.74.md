# Team Allocation Real Signals — v1.74

## Problema encontrado

`TeamAllocationController` ainda usava dois valores artificiais no ranking:

- `roleFit: 0.5`;
- `distanceKm: 20`.

Além disso, a alocação consultava `professional_availability`, enquanto a jornada profissional atual grava disponibilidade em `professional_availability_network`.

Isso podia produzir ranking enganoso e marcar profissionais como indisponíveis mesmo quando a disponibilidade havia sido informada pelo fluxo atual.

## Correção

A alocação de equipe agora usa:

- disponibilidade real em `professional_availability_network`;
- `roleFit()` com `required_role`/título da vaga e `primary_role` do profissional;
- `cityDistanceKm()` com `work_city` e `home_city`;
- `reliabilityScore()` com histórico existente;
- predicados explícitos de `tenant_id` para vaga, equipe, membros e validação de profissional conhecido pela empresa.

Nenhuma distância é inventada quando a cidade não permite inferência. Nenhum profissional é automaticamente confirmado.

## E2E dedicado

`scripts/http-team-allocation-e2e.sh` cria por API:

1. uma empresa;
2. dois profissionais com funções/cidades diferentes;
3. disponibilidade de rede para ambos;
4. assignments prévios para torná-los profissionais conhecidos da empresa;
5. uma equipe com os dois membros;
6. uma vaga de Bartender em São Paulo;
7. uma segunda vaga fora da janela de disponibilidade.

Asserções:

- a equipe lista `memberCount = 2`;
- o Bartender de São Paulo obtém score maior que o profissional de Cozinha/Rio;
- as razões incluem compatibilidade de função e proximidade quando suportadas pelos dados;
- fora da disponibilidade, a alocação retorna lista vazia.

## Gate

O E2E é executado dentro do CI completo, junto com frozen lockfile, Android export, testes, migration runner, demais jornadas HTTP e Production Truth contract.
