# Web — validação das datas locais de vagas

`new Date(valor)` pode normalizar datas de calendário impossíveis, como `2026-02-30T12:00`, deslocando silenciosamente o agendamento para outro dia. O conversor de `datetime-local` da publicação de vagas agora exige formato estrito `YYYY-MM-DDTHH:mm` e compara o horário local reconstruído com a entrada antes de gerar timestamp ISO. Rejeita datas impossíveis, rollover de hora/minuto e entrada com offset; permite 29/02 em ano bissexto. Não pretende resolver ambiguidades de horário de verão sem timezone de negócio; a API continua autoridade sobre agendamento.

Regressão em `apps/web/app/web-contract.test.ts`; CI no SHA exato e revisão obrigatórios. Não toca API, banco, PSP, mobile ou deploy de produção. Documento da Verdade original permanece preservado.
