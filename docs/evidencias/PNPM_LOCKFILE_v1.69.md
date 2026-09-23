# pnpm Lockfile v1.69

## Problema
O monorepo ainda instalava dependências com `pnpm install --no-frozen-lockfile`, permitindo que versões transitivas mudassem entre execuções. Isso já havia contribuído para resolver uma versão incompatível de `react-native-screens` no gate Android.

## Implementação
- `pnpm-lock.yaml` foi gerado pelo próprio GitHub Actions a partir dos manifests atuais da `main` usando pnpm 10.15.1.
- O arquivo usa `lockfileVersion: '9.0'`.
- O workflow temporário usado apenas para gerar/commitar o arquivo foi removido da branch antes do PR.
- O CI normal passa a instalar com `pnpm install --frozen-lockfile`.
- Nenhum lockfile foi reconstruído ou truncado manualmente.

## Gate de aceitação
O PR só pode ser integrado se o CI completo passar com `--frozen-lockfile`, incluindo:
- typecheck;
- build;
- Expo Android export real;
- testes;
- migration runner idempotente;
- jornadas HTTP;
- Production Truth contract.

## Efeito esperado
Instalações locais, CI e builds Railway passam a usar a mesma árvore de dependências versionada, reduzindo drift e regressões por resolução transitiva.
