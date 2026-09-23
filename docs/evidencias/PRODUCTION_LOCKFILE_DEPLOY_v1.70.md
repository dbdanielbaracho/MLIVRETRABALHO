# Production Lockfile Deploy v1.70

## Escopo
Comprovar que o lockfile versionado do PR #198 funciona não apenas no GitHub Actions, mas também no build e runtime de produção do Railway.

## Evidência
- PR #198 merge: `8056f584cf94b8cd861288342d4c13e9c6f460d9`.
- CI #522: SUCCESS com `pnpm install --frozen-lockfile`, Expo Android export, testes, migrations, jornadas HTTP e Production Truth contract.
- Railway deployment: `7dd2a9c8-c22e-40da-b234-058fdff872a0` — SUCCESS.
- Railpack detectou `pnpm-lock.yaml` e executou `pnpm install --frozen-lockfile --prefer-offline`.
- Log de build: `Lockfile is up to date, resolution step is skipped`.
- Build TypeScript da API concluído.
- Migration runner executou em produção e preservou todas as migrations existentes até `0027_runtime_rls_role.sql`.
- A API iniciou em porta 8080.
- Healthcheck Railway `GET /v1/health/ready` retornou HTTP 200.
- Pending work do ambiente ficou vazio após a conclusão.

## Conclusão
`INFRA-LOCK-001` pode ser considerado concluído para CI e produção. O lockfile é a árvore de dependências canônica do monorepo e instalações normais devem usar modo frozen.
