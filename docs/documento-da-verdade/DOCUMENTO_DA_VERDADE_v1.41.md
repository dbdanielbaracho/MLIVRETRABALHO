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
