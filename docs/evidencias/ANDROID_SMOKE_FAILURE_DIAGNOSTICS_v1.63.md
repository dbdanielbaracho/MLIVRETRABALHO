# Android smoke: diagnóstico de falha — v1.63

Verificado 2026-10-10 07:33:35 UTC. Base#373 5d5d028280de7e5beb920ce53af6efde15420ad7; main61341937bdf54ce15d6cf211061051b1c074baed.

Defeito demonstrado: #353/#368 primeiros smokes instalaram APK, mas ANR com.android.phone/Monkey Events0 e pidof vazio falharam antes do adb logcat final; upload de logs terminou sem artefatos. #357/#358 Broken pipe em setup também não produziu log de aplicação. Logs/runs originais nos journals0712Z/anteriores; isso não prova crash de app nem sucesso de smoke.

Workflow usa scripts/android-standalone-smoke.sh único com set-e/pipefail, todos checks atuais e falha fatal explícita. Trap coleta ainda com emulador vivo; fallback pós-ação captura metadata/ADB após falha precoce, mantendo status do smoke. Primeiro log não é sobrescrito depois do shutdown. ADB indisponível/timeout fica registrado. Paths passam a disparar APK para script/teste;8 testes shell rodam antes do build nesse workflow. Upload APK continua condicionado ao sucesso do job.

8 testes locais com ADB fixture (inclui timeout real de5s), bash-n/parseYAML pass. Não é teste de emulador/aparelho, não substitui CI/APK do novo SHA. Mobile183locais anteriores preservados sem código mobile alterado. Sem novos recursos/custos/retry/relaxamento de gate.

Pós-merges #366/#367 agoraCIAPKsuccess, com jobs/smoke/artifacts verificados no [journal0732Z](../conversas/EXECUCAO_VERIFICADA_2026-10-10_0732Z.md). Visual Truth OPEN.
