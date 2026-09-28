# Requirements Ledger — Delta v1.15

**Data:** 2026-09-28  
**Status:** ATIVO — complementa ledger base + deltas até v1.14  
**Documento normativo:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.15.md`

| ID | Estado v1.15 | Evidência / pendência |
|---|---|---|
| WEB-ARCH-001 | INTERNAMENTE COMPLETO / CI-PROVADO | #249–#254, #257–#262; serviço Web público separado permanece cost-gated |
| WEB-TENANT-001 | IMPLEMENTADO + TESTADO | #253/#254 |
| WEB-JOBS-001 | IMPLEMENTADO + CI | #257/#258/#262 |
| WEB-TEAMS-001 | IMPLEMENTADO + CI | #258/#259 |
| WEB-REPLACEMENT-001 | IMPLEMENTADO + CI | #260 |
| WEB-TALENT-001 | IMPLEMENTADO + CI | #259 |
| WEB-SAFETY-001 | IMPLEMENTADO + CI / HUMAN-REVIEW | #251/#261 |
| WEB-FINANCE-001 | IMPLEMENTADO READ-ONLY | #251; mutação financeira bloqueada por FIN-RISK |
| PILOT-APK-001 | PROVADO | artifact `10949985331` |
| PILOT-DEVICE-001 | EXTERNO | Android físico |
| FIN-RISK | EXTERNO/BLOCKING | #215/#228 |
| TRUST-ARCH | OPEN PARCIAL EXTERNO | provider-specific + pentest |
| WEB-PUBLIC-DEPLOY-001 | COST-GATED | novo Railway Web service + public smoke |

## Guardrail
Baseline interno completo não equivale a Pilot-DONE/Production-DONE dos gates externos.
