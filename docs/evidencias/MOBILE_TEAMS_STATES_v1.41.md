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

## Revalidação em 2026-10-10 03:18 UTC

- #350 integrado por squash na main **658e335cec144ba151645719b2b3fc0bf571f9c5**; CI **38018391376** e APK **38018391418** pós-merge sucesso no SHA exato. Job APK114113728065: smoke efetivo 2026-10-10T03:13:18.8509889Z, metro_required=false; upload validado sucesso. Artefato11657718589, zipSHA256 e389527bc80b2e0facb887f643055ed3cf160ca08ffdc44f2223cc46eb2e2307.
- #351 original **5e8fffdfee0944b1e518d9b38ec556b65d62a6b9** não era mergeável: ancestral comum edfdfb569aa232e82b34834548e4cc77b5408a39, main com squash do #350 e 12 commits adiante. Conflito README reproduzido em merge-file (v1.40 versus v1.41). Reconciliação usa árvore main e somente delta #351, preservando todos os cinco registros adicionais do #361. Merge commit incorpora main como segundo parent, sem force/rewrite e sem repetir #350.
- Código Equipe preservado byte a byte; 51/51 testes locais UTC e America/Sao_Paulo reexecutados no conteúdo exato da branch. CI38015021179/APK38015021164 aprovavam apenas o head original: **novo SHA precisa novos gates**, ainda pendentes neste registro. Merge somente após CI/APK do novo SHA sucesso, revisão do diff e nova verificação main; pós-merge próprio obrigatório.
- #355 APK38015874364 tentativa2 e APKs #356–#360 aprovados nos heads originais. Pós-merge APKs #343/#344/#346–#349 sucesso; CI documental #36138017570744 sucesso. APK pós-merge #34538017162774 falhou: diagnosticar logs e recuperação no mesmo SHA, sem presumir defeito do app nem fechar gate.
- Próxima ação: acompanhar gates #351 reconciliado e recuperar APK pós-merge #345; reconciliar/retarget #352–#355 na ordem, preservando ancestralidade e documentos atuais; depois #356–#360. Uma pendência não bloqueia itens independentes.
- Visual Truth Gate OPEN: capturas/jornadas/dados/estados reais e aparelho físico ainda necessários. Pentest, PSP/FIN-RISK, providers e WEB-ARCH separados. Sem dinheiro real, custos/infraestrutura paga, mudança React19.1.4/RN0.81.6/lockfile/RLS ou promessa de execução contínua.
