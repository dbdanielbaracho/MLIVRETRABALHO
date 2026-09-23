# Evidência — Matching City Proximity v1.51

## Objetivo
Remover o placeholder `distanceKm=20` sem exigir GPS nem inventar localização precisa.

## Implementação
- migration `0025_job_work_city.sql` adiciona `company_jobs.work_city`;
- publicação mobile da vaga aceita cidade do trabalho separada de endereço/local;
- `cityDistanceKm()` normaliza texto e retorna `0` somente quando a cidade da vaga e a cidade do perfil coincidem;
- cidade ausente ou diferente retorna `undefined`, não uma distância estimada;
- `scoreMatch()` só concede os 20 pontos de proximidade quando existe um sinal de distância explícito;
- recomendações passam a usar `cityDistanceKm(job.workCity, professional.homeCity)`.

## Privacidade
Esta fatia usa apenas cidade informada pelo usuário/empresa. Não exige GPS, coordenadas exatas ou localização em segundo plano.

## Testes
- mesma cidade, inclusive com acentos normalizados, produz sinal de proximidade;
- cidade diferente/ausente não inventa distância;
- `scoreMatch()` sem distância conhecida não adiciona pontos de proximidade.

## Limites
- mesma cidade não equivale a distância real em quilômetros; o valor `0` é um sinal categórico de 'mesma cidade' para o score atual;
- cálculo geográfico real poderá ser adicionado depois, somente com fonte de localização adequada e consentimento explícito quando necessário.
