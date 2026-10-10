# MLIVRETRABALHO — Documento da Verdade v1.41

**Status:** NORMATIVO — DELTA SOBRE v1.40  
**Data:** 2026-10-09

Preserva v1.40, referência original e continuidade v1.30. Visual Truth Gate OPEN.

## Equipe: membros e recomendações no contexto correto
Equipes, trabalhos e fontes de profissionais conhecidos têm loading/erro/vazio próprios, schema, foco/retry e 15s. Fonte conhecida que falha não elimina profissionais de outra fonte comprovada, nem confirma inexistência. Seleção de equipe limpa membros/alocação anteriores imediatamente e invalida respostas antigas; seleção de vaga também cancela e versiona alocação. Estados não viram ranking vazio em erro. Somente HTTP400 team_empty documentado significa equipe sem membros para alocação.

Criar/adicionar/remover continuam ações manuais existentes, seriadas contra toques repetidos e seleção concorrente. Contexto tenant+identidade atual é comparado ao que originou equipes; IDs exibidos não são enviados em outra empresa. Membros só podem ser alterados depois de leitura válida da equipe atual; ranking permanece consultivo e fornecido pelo backend. Nenhuma mudança de score/alocação/backend/RLS.

Criação não idempotente requer ack id/name correto. Falha/5xx/timeout/payload desconhecido exige Atualizar equipes e conferir lista antes de criar novamente; nome é mantido e criação fica bloqueada até atualização bem-sucedida explícita. Não existe retry automático do POST. Adicionar/remover requer ack correspondente e recarrega lista/membros em leitura própria, sem confirmação otimista.

## Prova e limites
Seis testes novos; 51/51 locais UTC/São Paulo. Cobrem partial success, schema, team_empty versus outros erros, contexto, criação rejeitada/desconhecida e ack de membros. Revisão estática de versões/guards feita; não equivale a taps ou aceite visual. Styles/cards/CompanyNav/rotas/APIs/dependências preservados. CI/APK no head exato e pós-merge obrigatórios. Evidência MOBILE_TEAMS_STATES_v1.41.md; branch encadeada após #350.

## Continuidade
#348 corrigido CI 38014454751 aprovado; #349 CI 38014598006 aprovado; #350 CI 38014796796 aprovado. APKs ainda acompanhados. #345 corrigido CI 38013501602/APK 38013501605 e #346 CI 38013571739/APK 38013571804 aprovados em seus heads exatos; aguardam predecessores. Integrar em ordem com revisão/ancestrais/pós-merge. Visual Truth, piloto/pentest/provider/custo permanecem separados.

## Revalidação em 2026-10-10 03:18 UTC

- #350 integrado por squash na main **658e335cec144ba151645719b2b3fc0bf571f9c5**; CI **38018391376** e APK **38018391418** pós-merge sucesso no SHA exato. Job APK114113728065: smoke efetivo 2026-10-10T03:13:18.8509889Z, metro_required=false; upload validado sucesso. Artefato11657718589, zipSHA256 e389527bc80b2e0facb887f643055ed3cf160ca08ffdc44f2223cc46eb2e2307.
- #351 original **5e8fffdfee0944b1e518d9b38ec556b65d62a6b9** não era mergeável: ancestral comum edfdfb569aa232e82b34834548e4cc77b5408a39, main com squash do #350 e 12 commits adiante. Conflito README reproduzido em merge-file (v1.40 versus v1.41). Reconciliação usa árvore main e somente delta #351, preservando todos os cinco registros adicionais do #361. Merge commit incorpora main como segundo parent, sem force/rewrite e sem repetir #350.
- Código Equipe preservado byte a byte; 51/51 testes locais UTC e America/Sao_Paulo reexecutados no conteúdo exato da branch. CI38015021179/APK38015021164 aprovavam apenas o head original: **novo SHA precisa novos gates**, ainda pendentes neste registro. Merge somente após CI/APK do novo SHA sucesso, revisão do diff e nova verificação main; pós-merge próprio obrigatório.
- #355 APK38015874364 tentativa2 e APKs #356–#360 aprovados nos heads originais. Pós-merge APKs #343/#344/#346–#349 sucesso; CI documental #36138017570744 sucesso. APK pós-merge #34538017162774 falhou: diagnosticar logs e recuperação no mesmo SHA, sem presumir defeito do app nem fechar gate.
- Próxima ação: acompanhar gates #351 reconciliado e recuperar APK pós-merge #345; reconciliar/retarget #352–#355 na ordem, preservando ancestralidade e documentos atuais; depois #356–#360. Uma pendência não bloqueia itens independentes.
- Visual Truth Gate OPEN: capturas/jornadas/dados/estados reais e aparelho físico ainda necessários. Pentest, PSP/FIN-RISK, providers e WEB-ARCH separados. Sem dinheiro real, custos/infraestrutura paga, mudança React19.1.4/RN0.81.6/lockfile/RLS ou promessa de execução contínua.
