# Contrato UUID de vagas no cliente mobile — 2026-10-14

## Escopo

Auditoria do catálogo de vagas e do interesse profissional no repositório exclusivo `dbdanielbaracho/MLIVRETRABALHO`. Este registro não pertence ao Creator Commerce OS e não altera seus documentos.

Base factual: `main` `23ddd7a0c61cbdb5002eec9b85ca69ab8126ef97`, árvore `177bf5e8a9e09b2fdf63d8d553140ef5c6b59744`.

## Falha reproduzida no contrato

A API real `apps/api/src/jobs.controller.ts` valida `jobId` com UUID antes da consulta SQL em `POST /jobs/:jobId/interest`, e o esquema canônico usa UUID para `company_jobs.id`. O cliente `apps/mobile/lib/jobs.ts`, porém, aceitava qualquer `id` string no parser de `loadJobs` e qualquer string não vazia em `sendInterest`.

Assim, uma resposta de catálogo com `id: "job-real"` virava uma lista pronta e uma ação de interesse tentava transportar `/jobs/job-real/interest`, embora esse identificador nunca pudesse ser aceito pela API. Isso expunha uma linha de catálogo inválida e deslocava uma falha de contrato para a rede.

## Regressão e correção mínima

`apps/mobile/tests/jobs.test.mjs` agora reproduz o payload inválido, exige estado `error`, e confirma zero POST para o mesmo identificador. O helper UUID compartilhado pelo módulo exige UUID canônico no catálogo e antes do interesse; UUIDs válidos, ACKs `interested/confirmed`, retry humano e ordenação continuam preservados. Não houve alteração de payload válido, autorização, tenant/RLS, endpoint ou política de retry.

## Gates

Este registro acompanha a branch `fix/mobile-job-uuid-contract-20261014`. CI próprio no HEAD, revisão final, merge e pós-CI no SHA real ainda são pendentes neste momento. Não tratar `[]`, queued ou running como aprovação; APK só será exigido se a revisão do workflow mostrar mudança de insumo mobile aplicável, e nunca será emprestado de outro SHA.
