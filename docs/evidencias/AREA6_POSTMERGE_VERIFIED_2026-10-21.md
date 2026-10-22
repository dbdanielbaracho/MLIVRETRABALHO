# MLIVRETRABALHO — Área 6, recibo de verificação pós-merge (2026-10-21 / UTC 2026-10-22)

## Fonte de verdade e escopo
Esta evidência acrescenta fatos observados ao Documento da Verdade v1.104, sem sobrescrevê-lo e sem declarar Production-DONE. Registra a jornada **financeira simulada**, não credenciamento ou liquidação com PSP real. Branch `main`, commit literal `1b85403cafd9e17bceeb3ea47ce27fdf03c1496e` (merge do PR #573). A revisão foi feita por consultas diretas à API GitHub e aos logs de jobs.

## Gates pós-merge, observados no mesmo SHA
- CI `39708675039`, job `119594571633`: `completed/success`. Typecheck, build, bundle Android, testes, migrations, contrato de privacidade, HTTP journey e Production Truth concluídos com `success`. Fonte: https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39708675039
- APK standalone `39708675307`, job `119594572956`: `completed/success`. Build, instalação/abertura no emulador e upload do APK aprovados. Log: `DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false`. Fonte: https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39708675307

## Testemunhas verificadas no log CI literal
- `LEDGER_COMPLETION_INSERT_ROLLBACK_PASS`: HTTP 500 provocado, reversão integral em cinco tabelas/dois tenants, assignment mantido em checked-out e ausência de ganho payable.
- `LEDGER_MOBILE_REAL_JSON_PASS`: JSON HTTP real do rollback e da recuperação consumido pelo loader, payable exato de `23456` centavos, zero HTTP requests adicionais; `androidUIOrProviderOrRealMoney=false`.
- `LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS`: recuperação explícita HTTP 201, um ledger único, conclusão repetida HTTP 400, segregação de tenant e remoção do hook de teste.
- Teste de split teórico e saldo simulado negativo: linha explícita `PASS: theoretical split and negative simulated balance are exact, replay-safe and do not create a provider transfer`.
- `PASS: Production Truth Gate health/readiness contract`.

## Limites incontornáveis
Os resultados demonstram integração técnica interna em CI e smoke de emulador, **não** aplicativo testado E2E em aparelho físico, PSP/KYC contratados, sandbox comercial, transferência de dinheiro, push externo, pentest independente, deploy web pago ou operação em produção. O aceite da Área 6 é restrito à fatia técnica simulada; a decisão normativa global exige reconciliar a matriz de 13 áreas em uma atualização controlada do Documento da Verdade. Não extrapolar `Production-DONE`.

## Próxima ação com valor
1. Reconciliar código e histórico do PR #584 com o merge #573; não duplicar o fix de Ganhos que o candidato #573 já declarou incorporar.
2. Prosseguir nas demais áreas internas pendentes e seus testes funcionais, preservando requisitos e controles multi-tenant/RLS.
3. Manter como bloqueios externos separados as issues #215, #219, #220, #224 e #228, sem desligar o fluxo apenas porque uma dessas exige fornecedor ou dispositivo físico.

**Proveniência:** GitHub `main`, PR #573, metadados e logs completos dos jobs acima; coleta em 2026-10-21, horário America/Sao_Paulo.
