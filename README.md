# MLIVRETRABALHO

**AI Workforce Network + Workforce OS + Marketplace**

Repositório oficial e fonte persistente do projeto MLIVRETRABALHO.

## Produto
Uma rede inteligente de trabalho que conecta profissionais, empresas e oportunidades e usa software/IA para matching, alocação, equipes, agenda, pagamentos, reputação, compliance e operação da força de trabalho.

## Fonte da verdade
A documentação é mantida em `docs/`.

- **Documento da Verdade vigente:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.13.md`.
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

## Financeiro do piloto
Baseline: split por PSP/provider contratado, provider-neutral no domínio. Escrow, pagamento off-platform, PIX manual por conta operacional e guarantee/advance/credit não são o padrão inicial. PSP real não é autoridade sobre IDs internos; referências externas devem ser resolvidas por binding controlado pelo backend antes de entrar no contexto tenant/RLS. FIN-RISK continua OPEN até provider/contrato/sandbox/compliance e unit economics reais.

## Trust/KYC + LGPD baseline
Provider externo de KYC/KYB é autoridade apenas sobre fatos/referências próprios. Callback não pode impor IDs internos ou enforcement. O baseline operacional de minimização/retenção está em `TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13.md`; o fluxo de direitos do titular está em `DSAR_RUNBOOK_v1.13.md`; transparência em `PRIVACY_NOTICE_BASELINE_v1.13.md`. TRUST-ARCH permanece OPEN até provider real/sandbox, implementação runtime dos controles aplicáveis e pentest.

## Legal baseline
O projeto segue revisão jurídica interna contínua baseada em fontes primárias, legislação, jurisprudência e melhores práticas. `LEGAL_BEST_PRACTICES_REVIEW_v1.12.md` é o baseline. Parecer jurídico externo não é gate obrigatório geral.

## Multi-tenancy
`ADR-MT-001` está **CLOSED/APROVADO**. Dados `TENANT` usam `tenant_id` + PostgreSQL RLS; runtime não pode ser owner/superuser/BYPASSRLS; testes cross-tenant são obrigatórios.

## Gates de produção
Production Truth/CI, FIN-RISK, TRUST-ARCH, device/pilot/pentest e WEB-ARCH permanecem separados. `DEPLOYED` isolado não significa Production-DONE.

## Regra documental
Chat → Registro Integral → decisão → Documento da Verdade → requisito → implementação → testes → deploy → evidência.

O aplicativo mobile é o produto operacional principal. O web complementa o produto e não substitui o aplicativo.
