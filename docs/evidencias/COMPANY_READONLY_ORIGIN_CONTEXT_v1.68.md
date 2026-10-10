# Planejamento e Indicadores: contexto de origem — v1.68

Snapshot 2026-10-10 08:09:43UTC. Main comprovada5938a40ee27be04f4ccb63242421eb293ba2ddb9 (#374/v1.63), tree6daef4f0245277dddf06839f273570ac9f5f47d8, parents4ff59618d6813890c438be234c86cca3ced496cc+d986972cdd6ab9b96e393d85ccfa5a4e510e8d03. README/Documento/memória/checkpoint atuais relidos. Merges356–360/362–374 verificados, não repetir. #374 headCI38034863081/APK38034863018success; smoke/jobs/artefatos/árvore/pais/main conferidos. Retarget375mainfeito; rawmergeabletrue/unstable aguardandoAPK, sem conflito real. Pós356–360/362/363/364–367 CIAPKsuccess com provas anteriores.

|PR|Merge SHA|Pós-CI|Pós-APK|
|---|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|38035076767 success|38035076771 success|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|38035132058 success|38035131936 success|
|370|c381dec921be51b0aa76e98bac244277f85f7384|38035165889 failure|38035165785 success|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|38035191248 success|38035191261 success|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|38035692664 success|38035692677 in_progress|
|373|4ff59618d6813890c438be234c86cca3ced496cc|38035748570 success|38035748523 in_progress|
|374|5938a40ee27be04f4ccb63242421eb293ba2ddb9|38036515564 success|38036515570 in_progress|

#370CI38035165889 FAILUREtentativa1 continua registrado: tokenfixturehífen tratado como opção Node, corrigido em375 (ownCI38035883488success headf31422e45165dd8eeaa276d15142bab83a343176/HTTPcompleto+3regressões). O novoSHA não muda status antigo. Pós370APKsuccess técnico; VisualTruth permaneceOPEN.


#378head6492ea1e523c8122bd9966d48b566a2abbda5d30/base377. CI38036810382tentativa1 FAILUREem Initializecontainers/job114168834894: Docker/ECR toomanyrequests Rate exceeded antesCheckout/código/tests. Retry controlado único samejob/SHA solicitado2026-10-10T08:09:43Z, runin_progress attempt2 confirmado; semdeclararpass. APK38036810418 in_progress. Falha é infra transitória, não aprovação de código; nenhuma mudança/redução de gate/image/credencial/custo para contornar rate.

## Defeito e contrato
Duas telas/autorização/geração atuais lidas integralmente; PlannerController(GETrole+tenantRLS) e CompanyAnalyticsController(contagens/fórmulas/roles/tenantRLS) e helpersmobile atuais lidos. Antes GET capturava headers, mas não verificava a identidade/empresa depois daresposta. Nenhum endpoint mutation usado por esta fatia.

## Correção
Planejamento e Indicadores capturam Authorization+tenant selecionado, validam o mesmo par antes de executar GET e após resposta, e só aplicam dados enquanto requisição/geração/foco/15s continuam atuais. Mudança de conta/empresa impede o fetch ainda não iniciado ou descarta resultado antigo. Atualização manual tem a mesma disciplina.

Estados reais de erro/403, vazio e payload/contagem/taxa/datas/valores continuam nos helpers existentes. Resposta descartada não vira totalzero nem lista vazia fictícia. Endpoints GETonly, permissões de role/membership e tenant/RLS, cálculo/definição factual de indicadores, UI/desenho e lockfile/deps intactos. Não implementa headcount/previsão nem planejamentoautomático ou operação financeira.

## Validação
209/209mobilelocalsUTCSP, zero fail/cancel/skip; reutilizafixtures identidade/foco/tenant/missing/stale/unchanged da v1.64/v1.67 e schemasstates doshelpers. Nenhum teste novo para espelhar o simples bindingTSX: diffrevisado e própriotype/build/CI/APK obrigatório. Não alega typechecklocal/deps/emulador/taps. VisualTruth completo físicoOPEN. Próprio commit não aprova retroativamente run378falhado; retrycontrolado é acompanhamento.
