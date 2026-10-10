# Delta de requisitos — v1.69

|ID|Requisito|Implementação|Prova|Estado|
|---|---|---|---|---|
|UI-MOBILE-TEAMS-TALENTS-FINAL-CONTEXT-001|Resposta antiga não confirma dados/ação em outra conta/empresa|Checks antes do transporte e finais, abort/foco/geração|5 novas regressões; 214 testes UTC/SP; diff|Branch; próprios CI/APK e físico pendentes|
|UI-MOBILE-TEAM-CREATE-UNCERTAIN-001|Perda de ACK não permite repetição automática da criação|Marca antes do POST, preservada no blur, conferência manual|Contrato não idempotente inspecionado; diff|Branch; físico pendente|
|CI-378-TRANSIENT-CONTAINER-001|Recuperação mantém SHA e gates completos|Retry único após log de rate pré-checkout|38036810382 tentativa2/job114169158970|SUCCESS técnico; tentativa1 preservada|
|CI-376-TRANSIENT-EMULATOR-001|Falha pré-script não autoriza merge|Diagnóstico/upload e retry único|38036176113/job114166946326|Retry pendente|
|VISUAL-TRUTH|Cobertura canônica integral no aparelho|Referência preservada|Sem evidência física nova|OPEN|
