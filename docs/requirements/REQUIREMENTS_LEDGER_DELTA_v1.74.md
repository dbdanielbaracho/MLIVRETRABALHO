# Delta de requisitos — v1.74

|ID|Requisito|Implementação|Prova|Estado|
|---|---|---|---|---|
|SEC-SUPPORT-ASSIGNMENT-001|Pedido de suporte não vincula trabalho de outro tenant|SELECT tenant_id+id dentro app_runtime/RLS antes INSERT|4 fixtures método real + HTTP E2E novo|Branch; próprio CI/HTTP/DB pendentes|
|SUPPORT-INPUT-001|Input inválido não vira erro SQL/vínculo inválido|Schemas UUID/categoria/prioridade/Unicode4000|4 fixtures input aprovados|Branch; CI próprio pendente|
|CI-376-POST-TRANSIENT-001|Infraestrutura não vira evidência falsa de aplicativo|Buildpass/input exit224 antes script; diagnosticsZIP|38047970768/job114201236096; único retry2|Falha1 histórica;retry2 running|
|CI-ACCOUNT-STARTUP-383-384-001|Antecessores têm gates próprios|CI38048556097/38048756243success|SHAs/diffs/pais conferidos|APKs próprios running; merge retido|
|VISUAL-TRUTH|Cobertura física integral|Referência original preservada|Sem prova física nova|OPEN|
