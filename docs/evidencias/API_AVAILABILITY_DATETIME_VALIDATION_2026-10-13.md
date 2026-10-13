# Evidência — datas explícitas na disponibilidade profissional — 2026-10-13

## Reprodução

Na base `273169f5150f4dcef77e30b028a0f7597c9f4755`, `availabilityInput` retornou como válido o intervalo iniciado por `2026-02-30T18:00:00-03:00`; o runtime o converteu para `2026-03-02T21:00:00.000Z`. Também foram aceitos `2026-10-10` e `2026-10-10T18:00:00`, apesar de não informarem uma zona explícita.

## Correção candidata

Um parser compartilhado valida estrutura ISO, calendário, relógio, fração e zona. A disponibilidade mantém literalmente offsets explícitos válidos para preservar o contrato existente. A criação de vaga reutiliza o mesmo núcleo e continua restrita a UTC `Z`, como aprovado no PR #514.

## Provas preparadas

- rejeição de 30/02, 29/02 em ano não bissexto, date-only, ausência de zona, hora/minuto inválidos e fração longa;
- aceitação de 29/02/2028 em UTC e em `-03:00`;
- preservação do offset original na disponibilidade;
- rejeição pelo controller antes da consulta de perfil ou INSERT.

## Limites

Não há mudança em autenticação, identidade/perfil, tenant/RLS, SQL idempotente, mobile, pagamentos, produção ou serviços externos. Gates permanecem pendentes neste snapshot.
