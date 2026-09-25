# MLIVRETRABALHO

**AI Workforce Network + Workforce OS + Marketplace**

Repositório oficial e fonte persistente do projeto MLIVRETRABALHO.

## Produto
Uma rede inteligente de trabalho que conecta profissionais, empresas e oportunidades e usa software/IA para matching, alocação, equipes, agenda, pagamentos, reputação, compliance e operação da força de trabalho.

## Fonte da verdade
A documentação é mantida em `docs/`.

- **Documento da Verdade vigente:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.11.md`, que incorpora as versões anteriores por referência e registra o delta normativo vigente.
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
Baseline: split por PSP/provider contratado, provider-neutral no domínio. Escrow, pagamento off-platform, PIX manual por conta operacional e guarantee/advance/credit não são o padrão inicial. PSP real não é autoridade sobre IDs internos; referências externas devem ser resolvidas por binding controlado pelo backend antes de entrar no contexto tenant/RLS. FIN-RISK continua OPEN até provider/contrato/sandbox/revisões externas.

## Trust/KYC baseline
Provider externo de KYC/KYB é autoridade apenas sobre fatos/referências próprios. Callback não pode impor tenant/identity IDs internos, score, assignment/payment action, suspensão, deactivation ou culpa. Referência externa precisa ser resolvida por binding server-controlled antes do contexto tenant/RLS; enforcement material continua separado e sujeito a human review/appeal. TRUST-ARCH continua OPEN até provider real, sandbox, LGPD final, jurídico e pentest.

## Multi-tenancy
`ADR-MT-001` está **CLOSED/APROVADO**. O baseline é pool híbrido controlado: dados `TENANT` usam `tenant_id` + PostgreSQL RLS; runtime não pode ser owner/superuser/BYPASSRLS; testes cross-tenant são obrigatórios. Ver `docs/adr/ADR-MT-001.md`.

## Gates de produção
Production Truth/CI, FIN-RISK, TRUST-ARCH, LEGAL-ARCH, device/pilot/pentest e WEB-ARCH permanecem separados. `DEPLOYED` isolado não significa Production-DONE.

## Regra documental
Chat → Registro Integral → decisão → Documento da Verdade → requisito → implementação → testes → deploy → evidência.

O aplicativo mobile é o produto operacional principal. O web complementa o produto e não substitui o aplicativo.
