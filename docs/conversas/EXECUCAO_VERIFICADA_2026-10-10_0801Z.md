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

## Retomada
# Checkpoint de execução autônoma — MLIVRETRABALHO

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

|PR|Head exato|Base|CI|APK|
|---|---|---|---|---|
|374|d986972cdd6ab9b96e393d85ccfa5a4e510e8d03|main|38034863081 success|38034863018 in_progress|
|375|f31422e45165dd8eeaa276d15142bab83a343176|fix/android-smoke-failure-diagnostics|38035883488 success|38035883538 in_progress|
|376|931a9b3c333a0771c5a2237cdd84a249eba14589|fix/professional-originating-session-context|38036176120 success|38036176113 in_progress|

Novo filho fix/earnings-conversation-origin-context após376: Ganhos/Conversa/helper/tests +v1.66/evidência/ledger/memória/checkpoint,204mobile locais UTC/SP; PR/head/runs próprios consultar após publicação (snapshot anterior ao commit).

Próximo: acompanhar APK374 e pós368/370/371/372/373. Integrar374 apenas gates próprios success SHAinalterado + freshmain/rawPR/merge-base tree/diff/revisão; confirmar árvore/pais/main e pós-runs. Retarget375,376,este filho main em ordem com a mesma disciplina. Eventual mergeablefalse reconsultar; conflito real reconciliar ancestral semsobrescrever+novosgates. Erro deconexão reconsultar antes repetir operação. Não ignorar CI370tentativa1failure nem usar novoSHAcomo aprovação do histórico; novoHTTP375 está comprovado.

Próxima auditoria segura: empresa.tsx e rotas de busca/equipe/company contra contratos atuais/estados/contexto e referência; mapear pendência concreta, sem alterarproduto ou criarcommit paraatividade. Reavaliar gates externos mesmo sem PR aberto, jamais concluir integralmente pela ausência deissues. APKemexecução é acompanhamento, não bloqueio permanente; alternativas seguras continuam.

Visual TruthOPEN até desenho original/cobertura física completa/dados/estados; piloto/pentest#220, providers/PSP/FIN-RISK#215/#219/#228, WEB-ARCH#224 independentes. Sem mensagem real/conta/DSAR/dinheiro/PSP/cobrança/deploypago pelo agente. Manter rotina até conclusão integral comprovada ou ordem explícita; fim de rodada/bloqueio parcial não encerram projeto e não exigem continuar. Histórico preservado; [journal0801Z](EXECUCAO_VERIFICADA_2026-10-10_0801Z.md).
