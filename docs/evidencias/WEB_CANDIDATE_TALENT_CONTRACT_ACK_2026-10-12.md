# Web — ACK de confirmação de candidato e talent pool — 2026-10-12

## Reprodução e contrato
Source real de confirmCandidate/addTalentPool/removeTalentPool e controllers CompanyJobs/TalentPools foram reconsultados. Os três handlers aceitavam HTTPok+{} e incrementavam revision sem ACK correspondente. Bateria comportamental source-real pré-JSX: RED1PASS/3FAIL (controlelegítimoPASS, trêsnegativosFAIL), fixtureshook/transporte sem rede/prod/Reactrender/físico/SQL.

Contrato confirm retorna id UUID, jobId/professionalId/tenantId exatos, statusconfirmed e confirmedAt. O helper valida UUID e os bindings/status, sem inventar regra de confirmedAt ou dinheiro. Replay legítimo confirmado permanece aceito.
Contrato talent add retorna professionalId/pool exatos, inclusive replay idempotente; remove retorna removed:true. Validação desses contratos não adiciona IDs ausentes no ACKremove nem muda pools/políticasbackend.

## Correção
Três handlers validam ACK antes de publicar refresh. addTalent captura os mesmos valores FormData enviados, preservando payloadliteral. O helper remove usado apenas porremoveTalent passa a lerJSON; DELETE/URL/header/erroHTTP permanecem. Todas guardas contexto sessão/token/tenant/papel/unmount, errors/loading e leituraexplícita intactas. ACK incerto mantémdados/seleções/revision e orienta Atualizar dados antes denovoenvio; semauto-retry ou afirmação de que escrita não ocorreu.

## Testes/gates
Sete testes novos: trêsnegativos, controlelegítimo/payloadheaders/method, UUID/replay/shape, HTTP400/401/403/404/409/429/500, perda transporteJSON umachamada. SuiteWeblocal84/84PASS mantém77anteriores. CI próprio novohead84/731/385/3/10=1213 e todossteps/HTTPPostgres obrigatório; pósCIreal apósmerge. APK N/Aapenasblobsmodesprotegidosidênticos.

Predecessor498 merge50fd200b3a69fd80633612b167dbaf596d301984; pais[1b8a9deeec5d3211f1c946aba679c3cb48d59a7f,d30d18d71628dca5165388c2dd2518c0814892c0]; tree88f48e1cd0a205cbc90b02e6cfb65eeae64ff7d1 igualcandidata/main. own38267978559/job114874891285 SUCCESS77/731/385/3/10=1206/todossteps/HTTPPostgres. Post38268538595 EMEXECUÇÃO neste snapshot, não PASS; acompanharantesintegração. Post49738267610320/job114873626196 SUCCESS1200 no1b8a9...real, todossteps/HTTPPostgres.

Cinco docsoriginais/evidência no mesmociclo íntegros porapêndice. API/RLS/autoridade/payloads/idempotência/notifications/matching/finanças/backend inalterados. Gatesexternosfisico/VisualTruth/pentest/TRUSTproviders/PSPKYC/FINRISK/WebpagoOPEN. Semcusto/serviços/PSP/dinheiroreal/produção/deploypago. FinalreciboPRbody/continuidade semloopsdecommitsmetadados.
