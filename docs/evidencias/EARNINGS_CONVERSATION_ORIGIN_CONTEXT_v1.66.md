# Ganhos/Conversa: identidade de origem — v1.66

Snapshot 2026-10-10 08:00 UTC. Main 4ff59618d6813890c438be234c86cca3ced496cc/#373/v1.62, tree1334e87367562a0691376373819ff9178ccf2b88; README/verdade/memória/checkpoint atuais relidos. Merges356–360/362–373 já confirmados; não repetir. Pós356–360/362/363/364–367CIAPKsuccess comsmoke/jobs/artefatos nos históricos. Pós369 agoraCIAPKsuccess; job114163883844/smoke2026-10-10T07:53:56.8301765Z/artifact11663896319 ZIPsha256a7214ec9762f49dadcb4cfae97eefc2ad1120e1546ddb9d9a5c9a3c9101d920f headbe8c02d2c813533ae0a9b8a29446410ecac48d82. Digest é arquivo ZIP, não hash de APK isolado.

|PR|Merge SHA|Pós-CI|Pós-APK|
|---|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|38035076767 success|38035076771 in_progress|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|38035132058 success|38035131936 success|
|370|c381dec921be51b0aa76e98bac244277f85f7384|38035165889 failure|38035165785 in_progress|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|38035191248 success|38035191261 in_progress|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|38035692664 success|38035692677 in_progress|
|373|4ff59618d6813890c438be234c86cca3ced496cc|38035748570 success|38035748523 in_progress|

#370 CI tentativa1 FAILURE mantém-se registrado: Node interpretou tokenfixture iniciando por hífen como opção em FIRST_HASH. Correção#375 usa-- e 3regressões; #375CI38035883488success headf31422e45165dd8eeaa276d15142bab83a343176, job114166084838, RunTests e HTTP/ProductionTruth step14success. Isso comprova correção/jornada no novo SHA; não muda status do run antigo. Não houve rerun cego.


#376CI38036176120 success no head931a9b3c333a0771c5a2237cdd84a249eba14589, job114166946494, typecheck/HTTP success;APK38036176113 em execução.

## Contratos/defeito
EarningsController e ConversationsController lidos integralmente. Ganhos GET filtra identityId nos tenants profissionais e RLS; sem autoridadefinanceiranova. ConversaGET exigeassignmenttenant/acesso ePOST retorna id/body/createdAt (sem senderIdentityId), gera notificações transacionais existentes. Antes UI validava sessão antes dePOST, mas não revalidavaGET/ACKfinal. Resposta antiga podia reaplicar ledger/chat ou limpar draft após troca de conta. Foco era parcial no retry manualGanhos.

## Correção
Ganhos usa Authorization única sem tenant selecionado, conferindo a mesma sessão/foco antes/depois; todas requisições, inclusive retry manual, abortam/invalidam ao sair. Resposta antiga não mostra ledger de outra conta. Cálculo semanal, gráfico, valores/estados reais, multi-company e profissionalNav preservados, sem escrita no ledger/policy financeira.

Conversa mantém assignmentId/tenantId explícitos da rota e mesma identidade que carregou a conversa. GET e POST não iniciam após foco/timeout/identidade obsoletos e conferem identidade após resposta. Só ACK real/mesma sessão limpa draft/confirma envio. Perda de resposta na mesma conta preserva texto e pede conferência; troca de conta limpa draft antigo/invalidalista. Releitura após envio continua GET na identidade original, sem mensagem repetida automaticamente. Falhas403/404, mensagens vazias reais e acesso backend/membership/RLS permanecem diferenciados. ID/assignment em branco e texto em branco não chegam a transporte; IDs de mensagem/remetente em branco não são schema válido. ACK não exige senderIdentityId, pois POSTbackend retorna apenas id/body/createdAt.

## Validação
6novos testes com helpers reais: GET/POST invalidID/textocalls0, mensagemID/remetentevazioerro, GETcontatrocadastale, novacontaantesenvionocalls, ACKapósconta/focostale e unknownsameAuthnorepeat, Ganhosorigemstale/emptyreal.204/204mobileUTCSP, zero fail/cancel/skip.6fixtures runForSession anteriores reutilizadas; binding UI/draft/focus revisado estaticamente sem taps. Type/build/API/DB/emulador próprios em CI/APK pendentes. Não envia mensagens reais nem inicia pagamentos. Desenho/policies/deps/lockfile preservados; Visual Truth físico OPEN.
