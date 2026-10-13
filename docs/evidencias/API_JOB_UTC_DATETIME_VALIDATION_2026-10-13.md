# Evidência — validação UTC de turnos na API — 2026-10-13

## Falha reproduzida

Na base `b8073e48632a8f33baef20e3026ab948a83f6d5b`, `CompanyJobCreateController` aceitava qualquer string que `new Date(value)` conseguisse interpretar. A reprodução direta no mesmo runtime mostrou:

- `2026-02-30T18:00:00Z` → `2026-03-02T18:00:00.000Z`;
- `2026-10-12T18:00:00` → instante dependente do fuso do processo;
- `2026-10-12` → meia-noite UTC;
- `2026-10-12T18:00:00-03:00` → outro instante UTC.

Assim, a API poderia persistir um turno diferente do texto enviado, apesar de a interface Web já rejeitar datas locais impossíveis no PR #513.

## Correção

A API passa a aceitar somente instantes UTC canônicos `YYYY-MM-DDTHH:mm:ssZ` ou com fração de um a três dígitos. O valor é convertido e comparado por round-trip com `toISOString()`; normalizações de calendário e formatos ambíguos são rejeitados antes de abrir o contexto de escrita tenant.

## Regressões

O teste do controller rejeita data impossível, date-only, ausência de fuso, offset e fração longa. Também comprova que 29/02/2028 é aceito e que frações válidas são persistidas em ISO canônico.

## Limites

A mudança não altera autenticação, autorização, RLS, SQL, regras de remuneração/modalidade, retry ou desenho. Não executa produção, serviço pago, PSP nem teste físico. CI, revisão e integração permanecem pendentes neste snapshot e só serão declarados após os gates no SHA exato.
