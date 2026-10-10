# Requisitos —delta v1.93

|Requisito|Implementação/evidência|Estado|
|---|---|---|
|Retomar registro antigo com lista vazia/falha|SupportRecovery independente de memberships/works|Implementado; CI/APK próprios pendentes|
|Só dono atual lê slot|Token é fonte; inspect autentica /me e dono|Regressões locais aprovadas|
|Sem criar chamada sem contexto autorizado|recoveryOnly proíbe send/preparação/formulário|Local aprovado|
|Retry humano mantém contexto/chave originais|Protocolo antigo, autorização servidor atual|Local aprovado; sem bypass RLS|
|Sessão/deadline/blur/resposta tardia|5testes de fonte/3 formulário novos|Local aprovado73UTC/20SP|
|Release somente confirmed|Concluir visualização, sem liberar novo envio nesse modo|Local aprovado|
|Ajuda nova sem membership|Nenhum tenant/namespace artificial|Decisão arquitetural requerida|
|CI/APK exatos e pós-main|377mobile/110API esperados|Pendentes|
|Original/Native completo|Sem alteração de área primária|Gate físico permanece aberto|

Ajuda nova de profissional sem membership ainda depende de decisão arquitetural/produto sobre autoridade legítima por identidade e isolamento/retensão, ou alternativa explícita aprovada. Retomar registro privado antigo não cria namespace e não contorna autorização do servidor. Preservar RLS; não inventar tenant global/empresa ou canal/SLA.
A leitura/retomada sem lista ativa fica implementada nesta fatia, mas validação Native/SecureStore/keyboard/restart/limite máximo e cobertura visual original em aparelho físico seguem abertas. Pentest, provider/TRUST, PSP/FIN-RISK, WEB-ARCH e piloto/distribuição permanecem independentes. Preferências é pendência concreta a auditar contra baseline e contratos efetivos; não inventar políticas ou dados para preencher UI.

Publicar fix/support-recovery-without-context sobre ownhead403c762e5f1607aac3a06ac7f9c51be10a55c5b69cc/treedb552b101ccaa54ef5e1e5562bec5bcf482c2360, basefix/general-professional-support. Verificar número/commit/tree/bytes/patch e CI377mobile/110API +APK próprios; registrar provas depois de existirem.
Acompanhar400/401/403 APKs e pós399; integrar400,401,402,403 e esta fatia em ordem, com retargetmain/reconsulta eventual/merge-base tree igual main, diff fresco e gates próprios exatos aprovados. Pós-merge exige pais/tree/main e CI/APK no SHA real. #402API-onlyN/A não dispensa natives anteriores. Não repetir399/ancestrais ou retry388 já recuperado.
Em paralelo, auditar Preferências: referência original/requisito canônico, schema e APIs reais de profile/availability/matching/notifications, identificando a próxima implementação segura ou decisão requerida com limites explícitos. Bloqueio parcial/transiente/fim de rodada não encerra projeto nem desativa rotina.
