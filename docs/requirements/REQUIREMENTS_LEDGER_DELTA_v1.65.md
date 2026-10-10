# Delta de requisitos — v1.65

|ID|Requisito|Implementação|Validação|Estado|
|---|---|---|---|---|
|UI-MOBILE-NOTIFICATION-ORIGIN-001|Lista e leitura não aplicam resposta de outra sessão/empresa|Contextheaders/runForSession/UIepochs|3fixtures contexto+6reusadas origem|Branch;CIAPKfísico pendentes|
|UI-MOBILE-NOTIFICATION-ACK-002|HTTP200/null não confirma read; ID/data reais|markNotificationRead|ACK/path/tenant/4xx/5xx/JSON/noretry|Branch;CIAPK pendentes|
|UI-MOBILE-NOTIFICATION-SCHEMA-003|IDs/datas/tenantreal validados;pro multi-companypreservado|loadNotifications|Schema/payloadCompany/multiCompany|Branch;198locaisUTCSP|
|CI-HTTP-TOKEN-ARGUMENT-001|Tokenopaco como dado|v1.64/PR375|CI38035883488 success no headf31422e45165dd8eeaa276d15142bab83a343176|NovoSHApass;antigo370FAILUREpreservado|
|VISUAL-TRUTH|Original/dados/estados/aparelho completo|Preservado|Sem prova física nova|OPEN|
