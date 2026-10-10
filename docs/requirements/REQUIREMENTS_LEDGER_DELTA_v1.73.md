# Delta de requisitos — v1.73

|ID|Requisito|Implementação|Prova|Estado|
|---|---|---|---|---|
|UI-MOBILE-STARTUP-PAIR-001|Redirect não mistura sessão e empresa e respeita foco|Snapshot pareado queued + confirmação final + useFocusEffect|4 regressões;238 UTC/SP;interleaving real da fila|Branch; próprios CI/APK/físico pendentes|
|DOC-STATE-HISTORY-001|Snapshot antigo não representa bloqueio atual|Ledger base marcado histórico; deltas/checkpoint vigentes|CIs reais376–383;APK383 em execução|Documentado; sem fechamento integral|
|FULL-SCOPE|Escopo original é confrontado com implementação e jornadas atuais|v1.16–18 e controllers atuais|Próxima auditoria; não inventar tarefas|Não concluído por inferência|
|VISUAL-TRUTH|Cobertura física integral de desenho/dados/estados|Packet físico reconsultado|Sem prova física nova|OPEN|
