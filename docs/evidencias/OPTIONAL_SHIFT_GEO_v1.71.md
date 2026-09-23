# Optional Shift Geolocation v1.71

## Objetivo
Usar a capacidade de geolocalização já existente no backend durante check-in e check-out sem transformar localização em requisito para trabalhar.

## Implementação
- `expo-location ~19.0.8` foi adicionado ao mobile e ao lockfile versionado.
- O app solicita somente permissão de localização em primeiro plano no momento do check-in/check-out.
- Quando autorizada, a posição atual é enviada como `lat`/`lng` ao endpoint já existente.
- O backend já valida pares de coordenadas, latitude/longitude e persiste `check_in_lat/lng` e `check_out_lat/lng`.
- Se a permissão for negada, indisponível ou a leitura falhar, o check-in/check-out continua sem coordenadas.
- Não há rastreamento em segundo plano, geofence ou coleta contínua.
- A interface informa se a localização foi ou não compartilhada.

## Privacidade e fricção
A localização é contextual e opcional. A implementação evita bloquear o profissional por falta de permissão e não amplia o escopo de coleta além da ação operacional solicitada.

## Gate
Antes do merge, o CI deve passar com `--frozen-lockfile`, typecheck, build, Expo Android export real, testes, migrations, jornadas HTTP e Production Truth contract.

## Limite
O bundle/CI não substitui teste de permissão e GPS em aparelho físico. Esse comportamento continua no gate de device E2E.
