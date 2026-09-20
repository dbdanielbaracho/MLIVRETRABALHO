# MLIVRETRABALHO

**AI Workforce Network + Workforce OS + Marketplace**

Repositório oficial e fonte persistente do projeto MLIVRETRABALHO.

## Produto
Uma rede inteligente de trabalho que conecta profissionais, empresas e oportunidades e usa software/IA para matching, alocação, equipes, agenda, pagamentos, reputação, compliance e operação da força de trabalho.

## Fonte da verdade
A documentação é mantida em `docs/`.

- `docs/documento-da-verdade/` — estado normativo vigente do projeto.
- `docs/conversas/` — registro integral recuperável das conversas do projeto.
- `docs/adr/` — decisões de arquitetura.
- `docs/evidencias/` — evidências e pesquisas.
- `apps/`, `packages/` e `services/` — implementação.

## Arquitetura baseline
- Mobile principal: React Native + Expo + TypeScript
- Web: Next.js + React + TypeScript
- Backend: NestJS + Fastify + TypeScript
- Banco: PostgreSQL + PostGIS
- Cache/filas: Redis + BullMQ
- Otimização: Python + OR-Tools
- CI/CD: GitHub Actions
- Deploy: Railway

## Regra documental
Chat → Registro Integral → decisão → Documento da Verdade → requisito → implementação → testes → deploy → evidência.

O aplicativo mobile é o produto operacional principal. O web complementa o produto e não substitui o aplicativo.
