# Notificações: contexto e confirmação real — v1.65

Snapshot 2026-10-10 07:55:16 UTC. Main 4ff59618d6813890c438be234c86cca3ced496cc/#373/v1.62, tree1334e87367562a0691376373819ff9178ccf2b88; README/verdade/memória/checkpoint atuais relidos. Merges356–360/362–373 já confirmados; não repetir. Pós356–360/362/363/364–367CIAPKsuccess comsmoke/jobs/artefatos nos históricos. Pós369 agoraCIAPKsuccess; job114163883844/smoke2026-10-10T07:53:56.8301765Z/artifact11663896319 ZIPsha256a7214ec9762f49dadcb4cfae97eefc2ad1120e1546ddb9d9a5c9a3c9101d920f headbe8c02d2c813533ae0a9b8a29446410ecac48d82. Digest é arquivo ZIP, não hash de APK isolado.

|PR|Merge SHA|Pós-CI|Pós-APK|
|---|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|38035076767 success|38035076771 in_progress|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|38035132058 success|38035131936 success|
|370|c381dec921be51b0aa76e98bac244277f85f7384|38035165889 failure|38035165785 in_progress|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|38035191248 success|38035191261 in_progress|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|38035692664 success|38035692677 in_progress|
|373|4ff59618d6813890c438be234c86cca3ced496cc|38035748570 success|38035748523 in_progress|

#370 CI tentativa1 FAILURE mantém-se registrado: Node interpretou tokenfixture iniciando por hífen como opção em FIRST_HASH. Correção#375 usa-- e 3regressões; #375CI38035883488success headf31422e45165dd8eeaa276d15142bab83a343176, job114166084838, RunTests e HTTP/ProductionTruth step14success. Isso comprova correção/jornada no novo SHA; não muda status do run antigo. Não houve rerun cego.

## Contratos auditados
apps/api/src/notifications.controller.ts lido integralmente: mine sem x-tenant-id agrega memberships com RLS e identity_id; com header filtra tenant autorizado. read exige membership e faz UPDATE apenas ID+identity+tenant, RETURNING id/readAt, podendo retornar null com HTTP200. Portanto qualquer HTTP200 isolado não prova marcação. Baselines CHAT_NOTIFICATIONS_TENANT_E2E_v1.57 e NOTIFICATIONS_MULTI_COMPANY_v1.59 relidos.

## Mudança
Notificações profissionais mantêm GET sem tenant selecionado para agregar memberships; notificações empresariais exigem o tenant real selecionado e validam todos itens contra ele. Authorization/foco são conferidos antes/depois via runForSession e o leitor de contexto captura/confere tenant em ambas leituras da empresa. Resposta antiga ou empresa trocada não reaplica lista/confirma leitura. Guards síncronos, 15s/abort/geração e atualizações manuais permanecem.

Marcar lida usa exatamente notificationId/tenantId reais da lista, bodyless no endpoint existente; valida ACKid/readAtreal. HTTP4xx/rejeição distinto de rede/5xx/JSON/ACKnulo desconhecidos, sem POST repetido automaticamente. Só recarrega automaticamente depois de ACK/contexto verificados. Botão de atualização permite conferir resultado incerto. ID/tenant vazio ou timestamps inválidos permanecem erro, sem lista vazia fictícia. Professional GET ignora empresa selecionada local, POST usa tenant do item; CompanyNav/ProfessionalNav e estilos originais preservados. Backend requireMembership/identity/RLS/COALESCE idempotente intactos.

## Prova/limite
7novos testes: schemaIDs/datas, companypayloadtenant, companycontextswitch/missing, professionalirrelevantselectedtenant, ACKid/date/endpointexato, invalidIDs/outcomesnoretry, selectedtenantchangedaftermutationstillSameAuth.198/198mobilelocais UTC/SP. Reutiliza6testes origem/foco/sessionloss da v1.64. UI/contrato revisados estaticamente, sem testes de taps/aparelho ou marcações reais. Próprio CI/APK e pós-merge pendentes; Visual Truth completo físico OPEN. Sem novo dinheiro/custo/policy/backend/deps.

## Retomada
# Checkpoint de execução autônoma — MLIVRETRABALHO

Snapshot 2026-10-10 07:55:16 UTC. Main 4ff59618d6813890c438be234c86cca3ced496cc/#373/v1.62, tree1334e87367562a0691376373819ff9178ccf2b88; README/verdade/memória/checkpoint atuais relidos. Merges356–360/362–373 já confirmados; não repetir. Pós356–360/362/363/364–367CIAPKsuccess comsmoke/jobs/artefatos nos históricos. Pós369 agoraCIAPKsuccess; job114163883844/smoke2026-10-10T07:53:56.8301765Z/artifact11663896319 ZIPsha256a7214ec9762f49dadcb4cfae97eefc2ad1120e1546ddb9d9a5c9a3c9101d920f headbe8c02d2c813533ae0a9b8a29446410ecac48d82. Digest é arquivo ZIP, não hash de APK isolado.

|PR|Merge SHA|Pós-CI|Pós-APK|
|---|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|38035076767 success|38035076771 in_progress|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|38035132058 success|38035131936 success|
|370|c381dec921be51b0aa76e98bac244277f85f7384|38035165889 failure|38035165785 in_progress|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|38035191248 success|38035191261 in_progress|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|38035692664 success|38035692677 in_progress|
|373|4ff59618d6813890c438be234c86cca3ced496cc|38035748570 success|38035748523 in_progress|

#370 CI tentativa1 FAILURE mantém-se registrado: Node interpretou tokenfixture iniciando por hífen como opção em FIRST_HASH. Correção#375 usa-- e 3regressões; #375CI38035883488success headf31422e45165dd8eeaa276d15142bab83a343176, job114166084838, RunTests e HTTP/ProductionTruth step14success. Isso comprova correção/jornada no novo SHA; não muda status do run antigo. Não houve rerun cego.

|PR|Head|Base|CI|APK|
|---|---|---|---|---|
|374|d986972cdd6ab9b96e393d85ccfa5a4e510e8d03|main|38034863081 success|38034863018 in_progress|
|375|f31422e45165dd8eeaa276d15142bab83a343176|fix/android-smoke-failure-diagnostics|38035883488 success|38035883538 in_progress|

Novo filho fix/notifications-verified-read-and-context após375 inclui3arquivos mobile+v1.65/evidências/ledger/memória/checkpoint,198locaisUTCSP. Próprios PR/head/runs consultar após publicação (snapshot antecede commit).

Próximo: acompanhar374/375APKs e pós368/370/371/372/373, sem tratar running como bloqueio/conclusão. Merge374 somente ownCIAPKsuccess SHAinalterado + freshmain/rawPR/mergebase tree/diff revisão; confirmar árvore/pais/main/pós-runs; retarget375 e estefilho main em ordem. mergeable=false apósretarget pode sereventual, reconsultar; conflito real reconciliarpreservandoancestrais+novosgates, semforce/gateemprestado. Falha conexão reconsultarantesrepetir. Falha370diagnosticada/corrigida375, nunca declarar antigoHTTPpass por novoSHA.

Próxima auditoria segura independente: Ganhos e Conversa contra endpoints/ACK/contexto/foco atuais e desenho canônico; só alterar se defeito concreto demonstrado, sem inventar feature ou mexer em policy financeira. Preferências/Ajuda/Experiência permanecem conforme auditoria registrada, sem contrato criado por suposição.

Visual Truth original/cobertura completa/aparelho OPEN; piloto/pentest#220,providers/PSP/FIN-RISK#215/#219/#228,WEB-ARCH#224 independentes. Sem operações reais de conta/DSAR/convite/interest/reading/pagamentos, nova cobrança ou paiddeploy. Bloqueio parcial/fim de rodada não encerra projeto. Manter rotina até conclusão integral provada ou ordem explícita; não exigir continuar. Históricos preservados; provas [journal0756Z](EXECUCAO_VERIFICADA_2026-10-10_0756Z.md).
