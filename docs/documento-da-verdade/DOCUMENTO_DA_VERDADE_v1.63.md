# MLIVRETRABALHO — Documento da Verdade v1.63

**Status:** NORMATIVO — DELTA SOBRE v1.62
**Data:** 2026-10-10

Preserva v1.62, produto/desenho, React19.1.4/RN0.81.6/lockfile, tenant/RLS e standalone sem Metro. Visual Truth OPEN.

## Diagnóstico Android sem relaxar gate
Falhas observadas antes do logcat final terminaram sem artefato útil, inclusive ANR de sistema antes de Monkey injetar evento. O smoke existente passa para um script Bash único, mantendo boot/package readiness, instalação do APK exato, lançamento, PID, Activity e ausência de erros fatais. Nenhum passo vira opcional, nenhum retry adicional ou sucesso é fabricado.

Trap EXIT captura logcat, dispositivos ADB, boot, PID, activities e último ANR antes de o runner encerrar emulador, com comandos limitados a5s e manifest de exit codes/SHA/run/attempt. Falha anterior ao script tem coleta posterior de diagnóstico. Essa coleta não emite DEVICE_SMOKE_OK, não muda o status original e não substitui evidência capturada enquanto o emulador estava vivo. Falha de ADB aparece no manifest como erro/timeout, nunca como teste de aplicação aprovado.

Artefato de diagnóstico passa a exigir arquivos; APK validado permanece somente em sucesso real do job. Falhas nativas/React/bundle/PID continuam falhando. Helper/fixtures locais não constituem emulador ou evidência física.

## Prova e limites
8 testes shell com ADB simulado (pass/fatal/React/bundle/launch/PID/ADB ausente/fallback/timeout), bash -n e parse YAML aprovados. Smoke real do novo head e pós-merge ainda obrigatório; não reclassifica automaticamente runs históricos.183 testes mobile da fatia anterior preservados; apps/backend/infra/deps inalterados nesta fatia. Visual Truth/piloto/pentest/providers/FIN-RISK/PSP/WEB-ARCH permanecem separados.
