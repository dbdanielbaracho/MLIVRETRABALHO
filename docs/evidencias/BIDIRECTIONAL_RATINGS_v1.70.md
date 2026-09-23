# Bidirectional Ratings v1.70

## Objetivo
Fechar o ciclo de avaliação 1–5 sem misturar reputações de empresa e profissional.

## Implementação
- empresa continua avaliando o profissional por `POST /v1/assignments/:id/rating`;
- profissional pode avaliar a empresa por `POST /v1/assignments/:id/company-rating` somente após assignment concluído;
- somente o profissional dono do assignment pode avaliar a empresa daquele trabalho;
- `company_work_ratings` é tenant-owned, RLS-enforced e não concede DELETE ao runtime;
- a agenda retorna `companyRatingScore` e permite criar/atualizar a nota 1–5;
- Work Passport profissional continua baseado somente em `work_ratings`, sem mistura com reputação da empresa.

## Segurança
- score deve ser inteiro de 1 a 5;
- roles de empresa podem avaliar profissional;
- somente role `professional` pode avaliar empresa;
- assignment deve estar `completed`;
- consultas usam `tenant_id` explícito além de RLS;
- avaliação da empresa é idempotente por `(assignment_id, rater_identity_id)`.

## Validação
O CI deve passar:
- frozen lockfile;
- typecheck/build;
- Expo Android export;
- unit tests incluindo `rating-policy.test.ts`;
- migration runner duas vezes, incluindo `0028_company_work_ratings.sql`;
- jornadas HTTP e Production Truth contract já existentes.

Device E2E físico permanece um gate separado.
