# Mobile production API default v1.61

## Problema
`apps/mobile/lib/api.ts` usava `http://localhost:3000/v1` quando `EXPO_PUBLIC_API_URL` não estava definida. Em aparelho físico, `localhost` aponta para o próprio telefone e bloqueia login, vagas, agenda e demais chamadas.

## Correção
- fallback padrão do mobile passa a ser `https://mlivretrabalho.predibeacon.com/v1`;
- `EXPO_PUBLIC_API_URL` continua tendo prioridade para desenvolvimento, CI ou ambientes alternativos;
- nenhuma credencial é embutida no aplicativo.

## Efeito
O app passa a funcionar contra a API pública oficial sem exigir configuração manual de URL em um build/device padrão, removendo um bloqueio para device E2E.
