# Requirements Ledger — delta v1.41

| Requisito | Código | Prova | Estado |
|---|---|---|---|
| Equipes/membros/conhecidos/alocação reais, loading/falha/vazio | equipes.tsx; teams.ts | MOBILE_TEAMS_STATES_v1.41; 6 testes novos | Branch; gates pendentes |
| Seleção equipe/vaga não recebe resposta anterior | versions/abort/generation e contexto | Revisão estática; taps ainda pendentes | Visual Truth OPEN |
| Criação desconhecida não provoca novo POST automático | createUncertain/ack/refresh explícito | rejected/unknown/created testados | Implementado; CI/APK/pós-merge pendentes |
| Add/remove sob contexto correto com ack e recarga | sameTeamContext/changeTeamMember | Contexto/ack/testes | Implementado; integração pendente |
