# Requisitos — delta v1.90

| Requisito | Implementação / evidência | Estado |
|---|---|---|
| Ajuda disponível no trabalho real | Agenda secondary action + SupportRequest reutilizado | Implementado; CI/APK próprios pendentes |
| Preservar hierarquia de lifecycle/conversa/segurança | Ação primária/estilos/nav inalterados, v1.25/v1.26 | Estático verificado; físico aberto |
| Nenhum POST por abrir/fechar | Handler auth/lista real somente; envio humano separado | Local aprovado |
| Contexto não mistura tenant ou sessão | Row lookup; epoch/request/auth/deadline;7testes | Local aprovado |
| Mensagem/chave preservadas em resultado incerto | Mesmo storage/protocolo v1.88/v1.89 | CI399/400aprovados; APKs pendentes |
| Acompanhar resposta real | Histórico do Perfil vinculado a trabalho | Implementado; aceite físico aberto |
| CI/APK próprios e pós no SHA real |352mobile/105API esperados; artefato/smoke sem Metro | Próprios pendentes |
| Ajuda geral/Preferências | Nomes reais de espaços e requisitos próprios | Aberto; próximas fatias |

## Próxima ação concreta

Publicar fix/agenda-support-context sobre ownhead4009eeaf89ca2e327bc756610ebd4aebb414840c21b/treec92641013a9228efe3ae44932e7ec3302438a680, basefix/professional-support-submission. Conferir head/tree/PR/runs, bytes remotos e patch; não antecipar número/gate. CI352mobile/105API e APK standalone próprios devem passar no SHA exato.

Integrar399,400 e esta etapa em ordem, sócom CI/APK/diff/gates próprios aplicáveis; retargetmain depois de predecessor integrado e reconsultar estado eventual. Não confundir mergeablefalse inicial com conflito real. Após cada merge confirmar pais/tree/main e acompanhar CI/APK pós-merge no SHA real. APKpós396 emexecução não é encerramento nem bloqueio definitivo; 388pósretryrecuperado, não repetir.

Próximo produto independente: suporte geral para profissional ainda sem trabalho. GET/me atual fornece memberships só com tenant_id/role, sem nome de espaço/empresa; inspecionar schema/endpoints atuais e fornecer contexto com nome real antes de interface de escolha, sem UUID manual ou tenant padrão. Atualizar requisitos/evidência e testar isolamento se ampliar API. Preferências ainda requer confronto com referência canônica e APIs efetivas, sem inventar políticas.

VisualTruth físico original/dados/estados/cobertura completa, aparelho/piloto/distribuição, pentest e providers/TRUST/PSP/FIN-RISK/WEB-ARCH continuam abertos e separados. Manter continuidade e checkpoint; não desativar por pendência parcial, erro transiente, ausência dePR ou fim de rodada.
