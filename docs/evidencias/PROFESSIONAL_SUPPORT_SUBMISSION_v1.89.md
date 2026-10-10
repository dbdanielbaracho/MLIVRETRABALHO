# Evidência — envio humano de suporte v1.89

## Envio humano de suporte no Perfil

O histórico real do Perfil ganha a ação Solicitar ajuda para o trabalho selecionado na lista da API. Não há seleção automática de tenant ou UUID digitado. Usuário escolhe assunto e prioridade dos enums reais e escreve mensagem com limite de4000 codepoints Unicode; input não é truncado para fabricar aceitação. Navegação de quatro áreas, perfil/estilos existentes e referência canônica permanecem.

SupportRequest usa support-submission e storage v1.88. Abrir/refocar somente consulta GET /me e slot da identidade; nenhuma criação é automática. GET /me fornece id autenticado no nível superior. Antes de uma nova tentativa, o fluxo exige a sessão que carregou a lista de trabalhos e verifica slot anterior; registro pending ou confirmed impede preparar outra chave. Suporte geral sem trabalho e entrada contextual no Dia do Trabalho ainda não foram habilitados.

A ação humana de envio valida contexto e payload, prepara UUID v4 via API, verifica reporterIdentityId, persiste e relê a barreira, revalida sessão/foco e então POST /support-cases com tenant original e idempotency-key. Não reutiliza x-tenant-id padrão da sessão. Auth é reconsultado antes/depois de HTTP e JSON, antes/depois do storage e na aplicação final; payload/tenant/chave permanecem os mesmos em repetição.

Um único fluxo bloqueia dupla ação. Deadline de15s aborta transporte e resolve mesmo se um transport ignorar abort; continuação tardia não grava confirmed, não envia POST após preparação expirada e não aplica dados em outra sessão/foco. POST iniciado com erro/non-2xx/JSON ou ACK inválido retorna unknown, sem declarar sucesso ou inexistência; barreira continua pending. ACK real exige UUID e categoria/priority do payload, status literal/data válidos e confirmação persistida verificada antes de mostrar Solicitação registrada.

A interface mostra mensagem, assunto, prioridade e nome do trabalho real quando presente na lista; se o trabalho antigo já não está disponível, mostra Solicitação anterior, sem título ou dados inventados. Retry é ação humana explícita no contexto original preservado, inclusive após relogin/reinício; não prepara outra chave, troca mensagem ou tenant padrão. Backend continua exigindo membership/RLS e suporta replay mesmo quando o vínculo do assignment foi removido. Autorização revogada ou contexto sem confirmação continua pendência, sem descartar pending ou prometer resultado.

Só uma tentativa confirmed pode ser liberada pela ação Escrever outra solicitação. Falha de storage não libera slot nem habilita POST novo. Histórico é recarregado com GET após confirmação válida; consulta que falha continua erro separado do ACK já confirmado. Foco perdido/sessão alterada cancela fluxo, limpa mensagem visível e exige nova lista autenticada; o intent incerto da identidade anterior permanece privado no SecureStore. Nenhum token é persistido em draft.

## Validação e limites

29 testes novos:19do fluxo real (dependências injetadas/transport e storage em memória) e10dos handlers reais pré-JSX com fixtures explícitos React/router/submission. Cobrem validação/identidade/chave criptográfica/storage antes doPOST, ausência de POST implícito, falhas/ACK, retry após relogin, keys erradas/outro usuário, JSON tardio, sessão mudando durante persistência, deadline com abort ignorado, dupla ação/cancelamento, confirmed com resultado perdido, bloqueio de pending e liberação explícita. Testes não renderizam React Native nem fazem chamada externa.

PASS local59/59 testes de suporte no conjunto (12histórico+18storage+29novos) em UTC e America/Sao_Paulo. Total mobile esperado345 (316+29), API105/4web/3CLI, a confirmar no CI próprio. Typecheck/export Android/Nest/PostgreSQL e APK standalone no SHA exato ainda pendentes antes de publicar. UI/layout/keyboard/SecureStore/payload grande/restart físico não foram aceitos em aparelho. Não afirmar Visual Truth completo ou suporte24/7/prazo real.

Somente mobile e docs; sem mudar React19.1.4/RN0.81.6, dependências, lockfile, RLS/tenant ou APIs/infra. Agente executou apenas fixtures locais; nenhum chamado real/PSP/dinheiro/cobrança/deploy pago. Merge não é prova de deploy nem de produção; implantação/aceite aplicáveis precisam de evidência própria.

## Provas e estado anterior

Verificação de 2026-10-10, 17:53 UTC: main60759a41bfb6a90aed80d85045b9ec837c50a3ad/treef222de6ba92646e70d3aa99b5bcd513097768d5f, Documento da Verdade v1.87. #396–398 já integradas e pais/árvores iguais aos heads aprovados conferidos em1742Z/v1.88; não repetir.

Pós-merges no SHA real: #396CI38072758220/job114273405415 aprovado (298mobile/88API/4web/3CLI); #397CI38072798277/job114273523384 aprovado (298/98/4/3); #398CI38072830711/job114273616278 aprovado (298/105/4/3). Todos os passos e logs foram conferidos, inclusive migrations e contratos HTTP/PostgreSQL. APK pós-merge #39638072758154 ainda em execução; não substituí-lo por APK pré-merge. #397/#398 API-only: APK próprio N/A por paths efetivos e árvore mobile idêntica à396.

Retry único pós-merge #388run38054154641, tentativa2/job114268524350, recuperado com todos os passos aprovados. Instalação Success17:42:32.8794730Z, DEVICE_SMOKE_OK sem Metro17:43:22.9345817Z. ZIP validado11676949709, sha256:813823c871d6abb8ebebfd85e28fae00941db92a4160acab5f041e8eb90d9085, não expirado, head de merge4cfa80fbe784d087b3aad49738a5df7c30c76666 correto. ZIP é artefato, não digest individual do APK. Diagnóstico da tentativa1infra preservado11671065789/digest78996502e4e43543f065ec334594068669c0dc7a7acc523b33aa780681f250bd. Não solicitar outro retry; esse pós-merge está comprovado no emulador, sem fechar gate físico.

#399head7bd91e24c1c0428d0ea8caa762fe995ba0271374/tree18edb4798cccb9094653010a55f17aad898a4abc, base main, mergeabletrue. CI38072920913/job114273878473 aprovado:316mobile/105API/4web/3CLI e todos os passos/HTTP/migrations. 12arquivos remotos conferidos byte a byte. APK próprio38072921018 em execução; não integrada. Diff próprio deve ser revisado fresco antes de merge. Próxima etapa depende desse storage e dos predecessores já integrados.

## Próxima ação concreta

Publicar fix/professional-support-submission sobre ownhead3997bd91e24c1c0428d0ea8caa762fe995ba0271374/tree18edb4798cccb9094653010a55f17aad898a4abc, basefix/support-intent-durability. Conferir bytes remotos, diff, PR/head/tree e runs; não antecipar número ou aprovação. CI completo esperado345mobile/105API/4web/3CLI e APK standalone próprios obrigatórios.

Acompanhar APK399 e APKpós396; integrar399 sóapós revisão eCI/APK próprios exatos. Retarget desta etapa para main depois do predecessor integrado, reconsultar mergeable eventual e revisar patch/árvore do merge-base contra main. Integrar apenas com gates aplicáveis aprovados; conferir pais/tree/main, CI/APK pós e persistir evidência real.388pósretryjárecuperado; não repetir.

Próximas pendências seguras: suporte geral sem trabalho e ação de ajuda no contexto Dia do Trabalho, usando referências reais/explicitamente escolhidas e mesmo protocolo; revisar requisitos/API atuais antes de ampliar. Preferências ainda é placeholder: confrontar Documento canônico e APIs reais antes de definir campos/políticas, sem defaults inventados. Resultados incertos bloqueados por auth/storage exigem recuperação do contexto/credencial ou confirmação externa específica; só a operação afetada fica pausada.

VisualTruth físico original/dados/estados/cobertura completa, aparelho/piloto/distribuição, pentest, providers/TRUST/PSP/FIN-RISK/WEB-ARCH permanecem separados e abertos. Rotina segue até conclusão integral comprovada ou ordem expressa; não desativar por pendência parcial, gate em execução ou fim de rodada.
