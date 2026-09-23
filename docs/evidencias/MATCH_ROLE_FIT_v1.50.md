# Evidência — Matching Role Fit v1.50

## Objetivo
Remover o placeholder `roleFit=.5` das recomendações sem inventar dados.

## Implementação
- migration `0024_matching_roles.sql` adiciona `professional_profiles.primary_role` e `company_jobs.required_role`;
- vagas existentes recebem `required_role=title` como baseline compatível;
- novas vagas persistem `required_role`, usando o título como fallback de baixa fricção;
- perfil mobile permite informar a função principal;
- `roleFit()` normaliza caixa, acentos e pontuação e calcula sobreposição determinística dos termos da função requerida;
- recomendações usam `roleFit(job.requiredRole, professional.primaryRole)` junto dos sinais reais já existentes de disponibilidade e confiabilidade.

## Testes
`role-fit.test.ts` cobre match exato, normalização, match parcial e ausência/incompatibilidade.

## Limites
- esta fatia remove apenas o placeholder de compatibilidade de função;
- `distanceKm=20` continua temporariamente fixo até existir localização adequada/consentida para cálculo de distância;
- skills múltiplas e taxonomia semântica ficam para evolução posterior; o baseline atual é propositalmente simples e explicável.
