# Publicação: empresa/conta de origem e local real — v1.67

Snapshot 2026-10-10 08:06UTC. Main comprovada5938a40ee27be04f4ccb63242421eb293ba2ddb9 (#374/v1.63), tree6daef4f0245277dddf06839f273570ac9f5f47d8, parents4ff59618d6813890c438be234c86cca3ced496cc+d986972cdd6ab9b96e393d85ccfa5a4e510e8d03. README/Documento/memória/checkpoint atuais relidos. Merges356–360/362–374 verificados, não repetir. #374 headCI38034863081/APK38034863018success; smoke/jobs/artefatos/árvore/pais/main conferidos. Retarget375mainfeito; rawmergeabletrue/unstable aguardandoAPK, sem conflito real. Pós356–360/362/363/364–367 CIAPKsuccess com provas anteriores.

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

## Contrato e defeito
Empresa.tsx/main lido integralmente. Antes POST capturava contexto no momento deenvio e aplicava resultado sem foco/contexto final; tinha risco de limpar draft/mensagem de outro contexto. CompanyJobCreateController real lido: roleowner/admin/manager/company, tenant+RLS, backendnormaliza locationtrim||null, retornoid/title/location/workCity/window/pay/status semtenant. Publicação não é idempotente, portanto falha de resposta não autoriza reenviar automaticamente.

## Mudança
Empresa.tsx vincula formulário a Authorization+tenant reais carregados ao foco, bloqueando edição/publicação sem contexto verificado. Envio confere o par do formulário antes e depois; blur/timeout/conta ou empresa trocada não aplica ACK nem limpa draft da operação antiga. Troca de contexto ao recarregar descarta draft de outra conta/empresa; mesma origem preserva draft. Resultado incerto/saída durante POST mantém aviso para conferir Planejamento ao voltar; nenhum POST automático ou nova idempotência presumida.

runForSession passa a aceitar tenant esperado opcional, mantendo todas chamadas profissionais sem escopo extra e sem conceder autorização no frontend. ACKpublicação valida local normalizado/null e IDreal não vazio além dos fatos já conferidos (título/cidade/status/valor/janela). Backend sempre retorna location; não exige eco de tenant ausente do contrato. Guarda síncrona/15s/abort/epoch/controllers, CompanyNav, datas/turno noturno, dinheirocentavos e estilos preservados. Não alteraAPI/policy financeira/engagement modalities nem cria trabalho real.

## Validação
5novos testes: contexto esperado missing/diferentenocalls, sameAuthtenantchangedaftermutationstale, paresiguaisconfirmam/profissionalsemtenantpreservado; locationtrim/null corretos, locationausente/diferente/IDem branco não confirmam.209/209mobileUTCSP, zero fail/cancel/skip. Datas/valores e UIbinding/blur/reload/avisoincerteza revisados estaticamente, não taps/aparelho. CI/APKpróprioe pós-merge aindaobrigatórios; VisualTruth físico OPEN.

## APKs comprovados
DEVICE_SMOKE_OK real(noMetro), upload/job success eartifacthead verificados. Digest é ZIP, não APKisolado.

|Run|SHA|Job|SmokeUTC|Artifact|ZIPdigest|
|---|---|---|---|---|---|
|38035076771|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|114163722275|2026-10-10T08:04:42.9479884Z|11663998197|sha256:2a0adccad8bd9083c9ab585c02cddf3add8cea03005592c9cf9766e6cb4757a6|
|38035131936|be8c02d2c813533ae0a9b8a29446410ecac48d82|114163883844|2026-10-10T07:53:56.8301765Z|11663896319|sha256:a7214ec9762f49dadcb4cfae97eefc2ad1120e1546ddb9d9a5c9a3c9101d920f|
|38035165785|c381dec921be51b0aa76e98bac244277f85f7384|114163981045|2026-10-10T08:02:17.9889078Z|11663781996|sha256:7d30cd8d37ed82b6f99ef0afd8d60c84759f04498a066b2710d459ac29c9cbf0|
|38035191261|a6267c8947711d6cfa6b76de9bfa0c6c783815da|114164059635|2026-10-10T08:04:03.4486846Z|11664536722|sha256:6c858360b3e5c5a920ff87d4cd67215370de52975842fee2c93bc5a8abf38de8|
|38034863018|d986972cdd6ab9b96e393d85ccfa5a4e510e8d03|114163082970|2026-10-10T08:00:50.3704449Z|11663702875|sha256:627cf144f6040c8bce882802cf6943c9f4b5d0900f2fc02fe04a303ebf917056|
