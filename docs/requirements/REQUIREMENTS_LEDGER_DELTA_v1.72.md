# Delta de requisitos — v1.72

|ID|Requisito|Implementação|Prova|Estado|
|---|---|---|---|---|
|UI-MOBILE-ACCOUNT-TIMEOUT-ORIGIN-001|Resposta tardia não publica sucesso/cópia/sugestão em outra conta|Abort final + origin binding e incerteza após transporte|7 regressões;234 UTC/SP;diff|Branch; próprios CI/APK/físico pendentes|
|UI-MOBILE-INVITATION-UNCERTAIN-001|Convite incerto não é recriado antes de conferência|Incerteza antes POST, persiste blur, aceite com tenant opcional|Helpers, fila de sessão, revisão estática|Branch; gates pendentes|
|CI-ANDROID-MERGES-376-382-001|Integração preserva antecessores e gates exatos|Journal1129Z, árvore/pais/main, própriosCI/APK|Todos próprios success; retries únicos376/378|Integrado;pós CI success/APK running|
|CI-ANDROID-POST-375-001|Standalone funciona na main integrada|38037544424/job114171028139|Smoke/upload/ZIP/head conferidos|Success técnico;VisualTruth OPEN|
|UI-MOBILE-STARTUP-PAIR-001|Redirect não mistura sessão e empresa|index ainda lê dois snapshots separados|Código atual identificado|Pendente; próxima tarefa segura|
|VISUAL-TRUTH|Cobertura física integral original/dados/estados|Referência preservada|Sem prova física nova|OPEN|
