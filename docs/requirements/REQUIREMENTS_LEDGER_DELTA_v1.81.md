# Delta de requisitos — v1.81

|ID|Requisito|Prova|Estado|
|---|---|---|---|
|API-PROFILE-INPUT-001|Entrada inválida400 antes de escrita; auth401antesdevalidar|helper4+controller4regressões reais; fixtureHTTP localhost|8localPASS;próprioCI/Nest/HTTP pendente|
|API-PROFILE-IDENTITY-001|Escrita exclusiva à identidade autenticada, trim/null e falhas reais preservados|controller e2identidades fixtureHTTP|8localPASS;HTTP/Nest/DB próprios pendentes|
|APK-STANDALONE-001|Aplicar gate APK só aos paths reais, preservar mobile e APK predecessor|pathfilter workflow lido|N/A próprio se mobiletree idêntica;391APKpendente|
|VISUAL-TRUTH-001|Cobertura física integral original/dados/estados|Referências existentes|OPEN|


## Correção de teste e gates — 2026-10-10 12:44UTC

PR392 foi publicada no head35abdc0e8919288b44da1302f720cdb3a0727558/tree4e03f90e1421cbce0842452e50ef380d40950b95. CI38052927578/job114215554076 FAIL no Typecheck por TS2532 em27:50/126: acesso direto h.calls[0] no teste novo sem noUncheckedIndexedAccess narrowing. Build/tests/HTTP ficaram skipped; não considerar81API aprovado. Corrigido teste com const call=h.calls[0];assert.ok(call) antes dos asserts de identidade/query, sem non-null assertion/coerção nem mudança de expectativa ou produto. Oito testes locais novamente PASS e bash-n PASS. Falha histórica preservada; novo commit exige próprioCI, não retry do SHA errado. Próximohead/tree são consultados após publicação. API-onlyAPK N/A e mobiletree01ebadd68b56c3239bde95db27a690a3cc0f6875 conferida igual à391.15conteúdos remotos do primeirohead byteidênticos; novohead/diff devem ser revalidados.

Own APK39038051941014/job114212662952 SUCCESS, smoke2026-10-10T12:41:29.7434409Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false. Upload ZIP11670101921/digest sha256:371e9ed0f8043b9edc6712cda08afa74c264a2779d40b3b483f04ba268633bfa/head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/não-expirado/jobsteps conferidos. CI390 SUCCESS próprio, ainda não integrada por388/389predecessoras. APK388retry2/389/391 seguem em execução na última consulta. Não fecha VisualTruth físico nem autoriza merge de antecessor pendente.
