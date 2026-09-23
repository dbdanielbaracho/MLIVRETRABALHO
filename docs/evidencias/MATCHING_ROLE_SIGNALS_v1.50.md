# Evidência — Matching Role Signals v1.50

## Objetivo
Remover a dependência de placeholders para compatibilidade de função e garantir que os sinais já usados pela API tenham schema persistente e reproduzível.

## Estado de código já existente
- perfil profissional mobile captura `primaryRole` e `homeCity`;
- API de perfil lê/grava `primary_role`;
- criação de vaga usa `requiredRole` (fallback para `title`) e `workCity`;
- recomendações calculam `roleFit(requiredRole, primaryRole)`;
- proximidade por cidade usa `cityDistanceKm(workCity, homeCity)` e não inventa distância quando desconhecida;
- `scoreMatch` não concede pontos de proximidade quando `distanceKm` é desconhecida;
- testes unitários cobrem role fit, normalização e distância desconhecida.

## Correção desta fatia
- `0024_matching_profile_role.sql`: adiciona `professional_profiles.primary_role`.
- `0025_matching_job_signals.sql`: adiciona `company_jobs.required_role` e `company_jobs.work_city`, preenchendo `required_role` histórico com `title` quando ausente.

## Segurança de migration
A migration `0024` preserva exatamente o conteúdo que chegou transitoriamente à `main` antes de ser revertido para restauração do PR gate. Isso evita divergência de checksum caso um deploy automático tenha observado aquela versão transitória.

## Limite
Isto não implementa geodistância real. `cityDistanceKm` só retorna 0 para mesma cidade normalizada; cidades diferentes/desconhecidas permanecem sem distância numérica. Localização precisa continua opcional e separada.

## Definition of Done desta fatia
CI deve validar typecheck, build, unit tests, migration runner executado duas vezes, contagem de migrations e Production Truth contract antes do merge.
