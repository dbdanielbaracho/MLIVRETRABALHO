# Delta de requisitos — v1.63

| ID | Requisito | Implementação | Validação | Estado |
|---|---|---|---|---|
| CI-ANDROID-SMOKE-DIAGNOSTIC-001 | Falha antes de logcat final produz diagnóstico bounded sem converter failure em success | script/trap/fallback/upload |8 shell fixture tests+bash-n/YAML|Branch;novo APK real/pós-merge pendentes|
| CI-ANDROID-SMOKE-GATE-002 | PID/Activity/install/fatal checks e APK só em success permanecem obrigatórios | Mesmo smoke extraído para Bash único |Fixtures fatal/React/Metro/PID/launch falham;healthyfixturepass |Branch;APK real obrigatório|
| VISUAL-TRUTH | Cobertura física completa original/dados/estados | Referência preservada |Sem prova física nova |OPEN|

Fixture não é validação de aparelho; diagnóstico nunca é certificado de startup. Sem retry novo/custos/infra/dinheiro.
