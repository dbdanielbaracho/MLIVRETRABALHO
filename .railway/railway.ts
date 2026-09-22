import { defineRailway, github, project, service } from 'railway/iac';

export default defineRailway(() => {
  const api = service('api', {
    source: github('dbdanielbaracho/MLIVRETRABALHO'),
    build: 'pnpm --filter @mlivretrabalho/api build',
    preDeploy: 'pnpm --filter @mlivretrabalho/api migrate',
    start: 'pnpm --filter @mlivretrabalho/api start',
    healthcheck: '/v1/health/ready',
  });

  return project('MLIVRETRABALHO', {
    resources: [api],
  });
});
