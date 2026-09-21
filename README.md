# MLIVRETRABALHO

**AI Workforce Network + Workforce OS + Marketplace**

Repositório oficial e fonte persistente do projeto MLIVRETRABALHO.

## Produto
Uma rede inteligente de trabalho que conecta profissionais, empresas e oportunidades e usa software/IA para matching, alocação, equipes, agenda, pagamentos, reputação, compliance e operação da força de trabalho.

## Fonte da verdade
A documentação é mantida em `docs/`.

- **Documento da Verdade vigente:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.5.md`
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

## Multi-tenancy
`ADR-MT-001` está **CLOSED/APROVADO**. O baseline é pool híbrido controlado: dados `TENANT` usam `tenant_id` + PostgreSQL RLS; runtime não pode ser owner/superuser/BYPASSRLS; testes cross-tenant são obrigatórios. Ver `docs/adr/ADR-MT-001.md`.

## Regra documental
Chat → Registro Integral → decisão → Documento da Verdade → requisito → implementação → testes → deploy → evidência.

O aplicativo mobile é o produto operacional principal. O web complementa o produto e não substitui o aplicativo.
