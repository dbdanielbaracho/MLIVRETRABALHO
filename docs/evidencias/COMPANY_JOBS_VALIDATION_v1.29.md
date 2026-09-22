# Evidência — Company Jobs Validation v1.29

Data: 2026-09-22

## Escopo
- padroniza negação de papel autenticado como HTTP 403 (`ForbiddenException`);
- valida existência da vaga antes de candidatos/recomendações;
- impede confirmação de profissional em vaga que não esteja `open`;
- mantém exigência de interesse prévio antes da criação do assignment.

## Código
`apps/api/src/company-jobs.controller.ts`

## Gate
A mudança só deve ser integrada após CI verde no PR correspondente.
