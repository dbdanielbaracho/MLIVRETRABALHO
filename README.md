# MLIVRETRABALHO

**AI Workforce Network + Workforce OS + Marketplace**

Repositório oficial e fonte persistente do projeto MLIVRETRABALHO.

## Produto
Uma rede inteligente de trabalho que conecta profissionais, empresas e oportunidades e usa software/IA para matching, alocação, equipes, agenda, pagamentos, reputação, compliance e operação da força de trabalho.

## Fonte da verdade
A documentação é mantida em `docs/`.

- **Documento da Verdade vigente:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.8.md`, que incorpora as versões anteriores por referência e registra o delta normativo vigente.
- `docs/conversas/` — registro integral recuperável das conversas do projeto.
- `docs/adr/` — decisões de arquitetura.
- `docs/evidencias/` — evidências e pesquisas.
- `apps/`, `packages/` e `services/` — implementação.

## Arquitetura baseline
- Mobile principal: React Native + Expo + TypeScript
- Web complementar: Next.js + React + TypeScript (**WEB-ARCH ainda OPEN; Issue #224**)
- Backend: NestJS + Fastify + TypeScript
- Banco: PostgreSQL + PostGIS
- Cache/filas: Redis + BullMQ
- Otimização: Python + OR-Tools quando o problema real e os gates aplicáveis justificarem
- CI/CD: GitHub Actions (pipeline definido; indisponibilidade atual de runner rastreada no Issue #214)
- Deploy: Railway

## Multi-tenancy
`ADR-MT-001` está **CLOSED/APROVADO**. O baseline é pool híbrido controlado: dados `TENANT` usam `tenant_id` + PostgreSQL RLS; runtime não pode ser owner/superuser/BYPASSRLS; testes cross-tenant são obrigatórios. Ver `docs/adr/ADR-MT-001.md`.

## Gates de produção
Production Truth/CI, FIN-RISK, TRUST-ARCH, LEGAL-ARCH, device/pilot/pentest e WEB-ARCH permanecem separados. `DEPLOYED` isolado não significa Production-DONE.

## Regra documental
Chat → Registro Integral → decisão → Documento da Verdade → requisito → implementação → testes → deploy → evidência.

O aplicativo mobile é o produto operacional principal. O web complementa o produto e não substitui o aplicativo.
