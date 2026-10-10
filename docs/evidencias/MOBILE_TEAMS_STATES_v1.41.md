# Equipe: estados, seleção e salvamentos — v1.41

**Data:** 09/10/2026. **Base:** #350 f1bda2d848eda85652ddb9b85f591d898d5689a8.

## Fontes e divergências
TeamsController, TeamAllocationController, CompanyJobCreateController e CompanyDashboard já lidos. Contratos tenant/RLS: list/members/create/add/delete/allocation existentes. Criação INSERT sem idempotência; add ON CONFLICT e delete existentes. team_empty é HTTP400 conhecido. Código anterior confundia falha/loading com vazio, não tratava rejeição e podia exibir membros/alocação de seleção antiga.

## Correção e revisão
Leituras independentes/schema/foco/retry/15s e fonte conhecida parcial honesta. Snapshot tenant/identidade, versões de foco/base/equipe/alocação, abort e seleção limpa. Alterações manuais guardadas, ack próprio e releitura com novo signal. Criação desconhecida mantém nome e bloqueia novo POST até atualização explícita bem-sucedida/lista conferida; não há retry automático. UI impede alteração de seleção durante salvamento. Nenhum score/PSP/contrato/backend/RLS/dependência/estilo alterado; CompanyNav fora da rolagem mantido.

## Provas e limitações
Seis novos testes; **51/51 UTC e São Paulo**. Partial success/zero comprovado, payload/rede, alocação team_empty versus falha, contexto tenant+identidade, ack criação versus rejected/unknown, ack add/delete. Revisão dos guards/versões; interação/renderização física não comprovada por unidade. CI/APK/gates próprios e pós-merge pendentes; Visual Truth OPEN.

## Fila
#343 head 4f39c2c92750c3a5c70bae21986d823a1eeff637 CI aprovado, APK 38014252773 pendente. #344/#345 corrigido/#346 gates próprios aprovados, dependem sequência anterior. #347/#348 corrigido/#349/#350 CI aprovados e APKs acompanhados. Retarget e merge em ordem apenas com head exato verde e diff/árvore revistos; conferir main e atualizar checkpoint ao integrar.
