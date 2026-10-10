# Requisitos — delta v1.89

| Requisito | Prova / implementação | Estado |
|---|---|---|
| Seleção humana de trabalho real e envio de suporte | Perfil > Ajuda e suporte; SupportRequest + protocolo | Implementado; CI/APK próprios pendentes |
| Nenhum POST ao abrir, refocar ou recuperar draft | GET/me + slot, action explícita | Local aprovado |
| Identidade/contexto e storage antes do transporte | Reporter API, auth/foco/deadline, tenant escolhido, barreira verificada | Local aprovado; físico aberto |
| Repetir sem duplicar ou alterar conteúdo | Mesmo key/payload/tenant; APIv1.86 unique/replay | Local aprovado; APIHTTP/migrationjáaprovados nos predecessores |
| Erro/timeout não vira sucesso ou ausência | unknown/pending; ACKschema+storageconfirmed | Local aprovado |
| UI para pendência e retomada após relogin | Mensagem anterior preservada; retry humano sem nova chave | Local aprovado; aparelho físico aberto |
| Limpar slot somente após ACK confirmado | Ação Escrever outra solicitação e exclusão verificada | Local aprovado |
| Navegação/canônico, React/RN, standalone | Sem rota/nav/deps novas; CI/APK exatos | Gate próprio pendente; VisualTruth físico aberto |
| Suporte geral / Dia do Trabalho / Preferências | Requisitos e dados reais necessários | Aberto; próximas fatias |

## Próxima ação concreta

Publicar fix/professional-support-submission sobre ownhead3997bd91e24c1c0428d0ea8caa762fe995ba0271374/tree18edb4798cccb9094653010a55f17aad898a4abc, basefix/support-intent-durability. Conferir bytes remotos, diff, PR/head/tree e runs; não antecipar número ou aprovação. CI completo esperado345mobile/105API/4web/3CLI e APK standalone próprios obrigatórios.

Acompanhar APK399 e APKpós396; integrar399 sóapós revisão eCI/APK próprios exatos. Retarget desta etapa para main depois do predecessor integrado, reconsultar mergeable eventual e revisar patch/árvore do merge-base contra main. Integrar apenas com gates aplicáveis aprovados; conferir pais/tree/main, CI/APK pós e persistir evidência real.388pósretryjárecuperado; não repetir.

Próximas pendências seguras: suporte geral sem trabalho e ação de ajuda no contexto Dia do Trabalho, usando referências reais/explicitamente escolhidas e mesmo protocolo; revisar requisitos/API atuais antes de ampliar. Preferências ainda é placeholder: confrontar Documento canônico e APIs reais antes de definir campos/políticas, sem defaults inventados. Resultados incertos bloqueados por auth/storage exigem recuperação do contexto/credencial ou confirmação externa específica; só a operação afetada fica pausada.

VisualTruth físico original/dados/estados/cobertura completa, aparelho/piloto/distribuição, pentest, providers/TRUST/PSP/FIN-RISK/WEB-ARCH permanecem separados e abertos. Rotina segue até conclusão integral comprovada ou ordem expressa; não desativar por pendência parcial, gate em execução ou fim de rodada.
