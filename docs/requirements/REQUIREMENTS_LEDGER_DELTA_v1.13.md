# Requirements Ledger — Delta v1.13

**Data:** 2026-09-25  
**Status:** ATIVO — complementa ledger base + deltas v1.11/v1.12  
**Documento normativo:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.13.md`

## Regra de leitura
Em conflito posterior, v1.13 prevalece sobre a linha equivalente anterior sem apagar histórico.

| ID | Requisito | Estado atual | Evidência / regra |
|---|---|---|---|
| TRUST-DATA-001 | Minimização, retenção, acesso, exclusão/anonymização e legal hold por classe | BASELINE INTERNO DEFINIDO | `TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13.md` |
| TRUST-DSAR-001 | Titular deve poder solicitar confirmação, acesso/export, correção e demais direitos aplicáveis em fluxo tenant-safe | RUNBOOK INTERNO DEFINIDO / RUNTIME PENDENTE | `DSAR_RUNBOOK_v1.13.md` |
| TRUST-DSAR-002 | Acesso completo deve ser preparado para resposta em até 15 dias; confirmação simples imediata quando tecnicamente possível | REQUIRED | LGPD art. 19 + runbook v1.13 |
| TRUST-DSAR-003 | Export deve aplicar redaction de terceiros e nunca vazar cross-tenant data/secrets | STOP-THE-LINE | runbook v1.13 |
| TRUST-RET-001 | Retenção deve variar por classe/finalidade e terminar com purge/anonymization salvo conservação documentada | REQUIRED | baseline v1.13 |
| TRUST-RET-002 | Legal hold deve ser explícito, escopado por classe, auditável e revisável | REQUIRED | baseline v1.13 |
| TRUST-GEO-001 | Localização precisa de check-in/out é foreground/episódica; background tracking não é baseline | REQUIRED | v1.12/v1.13 |
| TRUST-KYC-DATA-001 | Preferir provider/status/reference/evidence_ref; raw documento/biometria não é armazenamento default | REQUIRED | v1.11–v1.13 |
| PRIVACY-001 | Produto deve manter aviso de privacidade sincronizado com classes, providers, retenção, geolocalização, decisões automatizadas e compartilhamentos reais | BASELINE INTERNO DEFINIDO | `PRIVACY_NOTICE_BASELINE_v1.13.md` |
| TRUST-ARCH | LGPD baseline interna não depende mais de parecer externo; issue permanece OPEN por provider/sandbox/pentest/runtime proof | OPEN/BLOCKING PARCIALMENTE EXTERNO | Issue #219 |
| LEGAL-001 | Parecer jurídico profissional externo não é gate obrigatório | SUPERSEDIDO/FECHADO INTERNAMENTE | v1.12; Issue #221 CLOSED |
| CI-001 | Pipeline completo precisa executar em runner real | PARADO EXTERNAMENTE | Issue #214 |
| WEB-ARCH-001 | Web complementar requer package resolution + lockfile reproduzível + CI | PARADO POR AMBIENTE | Issue #224 |

## Implementação runtime ainda necessária quando CI voltar
- endpoint/serviço DSAR/export tenant-safe;
- account closure com revogação de sessões;
- purge/anonymization jobs idempotentes;
- legal hold enforcement;
- geolocation precise-data expiry;
- processor/provider propagation quando aplicável;
- testes cross-tenant/redaction/retention.

## Guardrail
Documentar uma política não equivale a provar seu runtime. TRUST-ARCH não fecha até que os controles necessários estejam implementados/testados e os gates de provider/pentest aplicáveis tenham evidência.
