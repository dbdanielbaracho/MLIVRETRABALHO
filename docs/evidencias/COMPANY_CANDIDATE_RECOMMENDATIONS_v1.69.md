# Company Candidate Recommendations — v1.69

## Objetivo

Fechar a diferença entre o Matching Engine já existente no backend e a experiência mobile da empresa ao escolher profissionais interessados.

## Mudança

A tela `apps/mobile/app/candidatos.tsx` agora:

- carrega candidatos interessados e recomendações em paralelo;
- usa exclusivamente o score calculado por `GET /v1/company/jobs/:jobId/recommendations`;
- ordena os interessados com maior score primeiro;
- mostra score de compatibilidade em escala 0–100;
- mostra razões já produzidas pelo backend, como compatibilidade de função, confiabilidade e proximidade;
- mantém interessados sem recomendação visíveis ao final da lista;
- não confirma ninguém automaticamente;
- preserva a confirmação explícita da empresa e a política server-side `job_interest_required`.

## Limites

Esta mudança não cria novos critérios de matching, não altera pesos e não substitui decisão humana. Ela apenas expõe no mobile os sinais reais que o backend já calcula.

## Gate

Merge somente após CI completo verde, incluindo typecheck, build, Expo Android export, testes, migration runner, jornadas HTTP e Production Truth contract.
