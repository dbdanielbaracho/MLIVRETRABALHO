# Requirements Ledger — Delta v1.13

**Data:** 2026-09-25  
**Status:** ATIVO — complementa ledger base + deltas v1.11/v1.12  
**Documento normativo:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.13.md`

## Regra de leitura
Em conflito posterior, v1.13 prevalece sobre a linha equivalente anterior sem apagar histórico.

| ID | Requisito | Estado atual | Evidência / regra |
|---|---|---|---|
| TRUST-DATA-001 | Minimização, retenção, acesso, exclusão/anonymização e legal hold por classe | IMPLEMENTAÇÃO PREPARADA / PROVA PENDENTE | `TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13.md`; PR #245 |
| TRUST-DSAR-001 | Titular deve poder solicitar confirmação, acesso/export, correção e demais direitos aplicáveis em fluxo tenant-safe | IMPLEMENTAÇÃO PREPARADA / NÃO MESCLADA | `DSAR_RUNBOOK_v1.13.md`; PR #245 |
| TRUST-DSAR-002 | Acesso completo deve ser preparado para resposta em até 15 dias; confirmação simples imediata quando tecnicamente possível | REQUIRED / FLUXO PREPARADO | LGPD art. 19 + runbook v1.13 + PR #245 |
| TRUST-DSAR-003 | Export deve aplicar redaction de terceiros e nunca vazar cross-tenant data/secrets | STOP-THE-LINE / TESTE PREPARADO, EXECUÇÃO PENDENTE | PR #245; CI #214 bloqueado |
| TRUST-RET-001 | Retenção deve variar por classe/finalidade e terminar com purge/anonymization salvo conservação documentada | IMPLEMENTAÇÃO PREPARADA / NÃO PROVADA | PR #245 |
| TRUST-RET-002 | Legal hold deve ser explícito, escopado por classe, auditável e revisável | IMPLEMENTAÇÃO OPERACIONAL PREPARADA / NÃO PROVADA | migrations 0036/0042/0043; `LEGAL_HOLD_OPERATIONS_PR245_2026-09-26.md`; PR #245 |
| TRUST-GEO-001 | Localização precisa de check-in/out é foreground/episódica; background tracking não é baseline; precisão expira conforme baseline | IMPLEMENTAÇÃO PREPARADA / NÃO PROVADA | PR #245; 30 dias + legal hold |
| TRUST-CHAT-001 | Conversas ligadas a assignment usam baseline de 2 anos, com legal hold explícito | IMPLEMENTAÇÃO PREPARADA / NÃO PROVADA | PR #245 |
| TRUST-REQUEST-AUDIT-001 | Direitos do titular devem possuir `request_id` persistente e auditável, com lifecycle e operador quando houver intervenção | IMPLEMENTAÇÃO PREPARADA / NÃO PROVADA | migrations 0037/0040/0041 + `DSAR_RUNTIME_OPERATIONS_PR245_2026-09-25.md`; PR #245 |
| PRIVACY-MOBILE-001 | Direitos de privacidade devem ser acessíveis no produto mobile para identidades profissional/empresa | IMPLEMENTAÇÃO PREPARADA / NÃO PROVADA | PR #245 |
| PRIVACY-DEACT-001 | Desativação revoga sessões e é fail-closed para assignment ativo, earnings pendentes e tenant sole-owner | IMPLEMENTAÇÃO PREPARADA / NÃO PROVADA | PR #245 |
| TRUST-KYC-DATA-001 | Preferir provider/status/reference/evidence_ref; raw documento/biometria não é armazenamento default | REQUIRED | v1.11–v1.13 |
| PRIVACY-001 | Produto deve manter aviso de privacidade sincronizado com classes, providers, retenção, geolocalização, decisões automatizadas e compartilhamentos reais | BASELINE INTERNO DEFINIDO | `PRIVACY_NOTICE_BASELINE_v1.13.md` |
| TRUST-PROVIDER-PROP-001 | Correção/exclusão deve propagar a processor/provider quando aplicável | PROVIDER-SPECIFIC / PARADO EXTERNAMENTE | depende do provider/produto selecionado e sandbox real; não congelar schema genérico antes disso |
| TRUST-ARCH | LGPD baseline interna não depende de parecer externo; issue permanece OPEN por runtime proof, provider/sandbox e pentest | OPEN/BLOCKING PARCIALMENTE EXTERNO | Issue #219 |
| LEGAL-001 | Parecer jurídico profissional externo não é gate obrigatório | SUPERSEDIDO/FECHADO INTERNAMENTE | v1.12; Issue #221 CLOSED |
| CI-001 | Pipeline completo precisa executar em runner real | PARADO EXTERNAMENTE / CAUSA ISOLADA | Issue #214; hosted runner falha antes do primeiro step em múltiplas imagens/OS |
| WEB-ARCH-001 | Web complementar requer package resolution + lockfile reproduzível + CI | PARADO POR AMBIENTE | Issue #224 |

## Integração runtime privacy/ownership

A antiga série #233–#243 foi consolidada no PR final-state:

**#245 — `feat(integration): privacy runtime, owner handoff and EAS pilot route`**

O PR integra:
1. correção estrutural `professional_profiles.identity_id` + grants/teste DB;
2. DSAR/export tenant-safe e redaction;
3. account deactivation + session revocation + exclusão de identities desativadas dos fluxos ativos;
4. purge/anonymization, legal hold e expiração de geolocalização precisa;
5. registry/audit de privacy requests com `requestId`, detalhes acionáveis e lifecycle operacional;
6. retenção de chat >730 dias com legal hold;
7. controles mobile de privacidade para profissional/empresa;
8. sole-owner guard + owner handoff seguro;
9. legal hold operacional com criação, revisão e liberação auditáveis;
10. rota EAS Free para APK interno do piloto.

**Status real:** IMPLEMENTAÇÃO PREPARADA / NÃO PROVADA / NÃO MESCLADA. GitHub Actions continua encerrando `foundation` antes dos steps, portanto #245 não satisfaz Definition of Done nem runtime proof.

## Implementação ainda dependente de externo
- autenticação/callback e binding provider-specific em sandbox real;
- processor/provider correction-deletion propagation quando aplicável;
- pentest independente;
- device físico/pilot evidence;
- execução real de CI/equivalente e merge/deploy de #245;
- Web quando package environment reproduzível voltar.

## Guardrail
Documentar ou preparar código não equivale a provar runtime. TRUST-ARCH não fecha até que os controles sejam realmente executados/testados e os gates de provider/pentest aplicáveis tenham evidência. PR #245 não deve ser mesclado por exceção documental.
