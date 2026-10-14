# Contrato UUID de substituições no cliente mobile — 2026-10-14

## Escopo

Auditoria exclusiva de `dbdanielbaracho/MLIVRETRABALHO`; não pertence ao Creator Commerce OS.

Base factual: main `23ddd7a0c61cbdb5002eec9b85ca69ab8126ef97`, árvore `177bf5e8a9e09b2fdf63d8d553140ef5c6b59744`.

## Falha reproduzida

`apps/api/src/replacement.controller.ts` rejeita assignment, replacement e professional IDs não UUID antes das consultas SQL. `apps/mobile/lib/company-replacements.ts` aceitava IDs não vazios, e seus testes usavam fixtures textuais (`a`, `r`, `p`) que não representavam o contrato real.

Isso permitia que uma leitura de substituições parecesse válida e que ações de request/match/select tentassem rotas que a API rejeita deterministicamente.

## Correção e regressão

O cliente agora exige UUID canônico para os IDs de assignments, replacement requests e profissionais em leituras, request, auto-match e select. A regressão verifica erro honesto e zero chamadas para IDs textuais; fixtures válidas usam UUIDs. Payload válido, autorização, tenant/RLS, ACK e retry humano permanecem inalterados.

## Gates

Branch `fix/mobile-replacement-uuid-contract-20261014`. CI próprio, APK standalone aplicável, revisão, merge e pós-gates ainda pendentes. Não tratar `[]`, queued ou running como PASS; não emprestar artefato de outro SHA.


## Correção de gate — 2026-10-14

O CI `38503240745` passou por typecheck, build e export mobile, mas falhou em quatro assertions do teste existente `company-replacement-ack-uuid.test.mjs`, que usava `fixture-professional` textual. Isso confirmou a necessidade de alinhar a fixture ao contrato UUID da API, não de remover a validação. O novo candidato usa UUID e aguarda novos CI/APK; nenhum resultado anterior autoriza merge.
