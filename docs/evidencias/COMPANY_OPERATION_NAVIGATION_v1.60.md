# Company Operation Navigation v1.60

## Problema
As telas de publicação de trabalho e interessados existiam, mas a tela principal da empresa (`empresa-inicio.tsx`) não oferecia caminhos diretos para acessá-las. Isso deixava funções operacionais importantes desconectadas da jornada normal.

## Solução
A tela **Operação** agora expõe dois atalhos visíveis no topo:
- `+ Publicar trabalho` → `/empresa`;
- `Ver interessados` → `/candidatos`.

Os atalhos reutilizam Expo Router já presente no projeto; nenhuma dependência nova foi adicionada.

## Resultado esperado
Empresa autenticada entra em Operação e chega em uma ação principal com um toque, preservando o Friction Gate e eliminando necessidade de conhecer rotas ou IDs internos.

## Gate
Integrar apenas após CI completo verde (typecheck mobile/API, build, testes, migration runner, HTTP journey e Production Truth contract).
