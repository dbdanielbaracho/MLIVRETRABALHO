# Requirements Ledger — Delta v1.14

**Data:** 2026-09-28  
**Status:** ATIVO — complementa ledger base + deltas v1.11–v1.13  
**Documento normativo:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.14.md`

## Regra
Este delta reconcilia estados que ficaram historicamente congelados em v1.13. Não apaga a evidência anterior.

| ID | Estado v1.14 | Evidência / pendência |
|---|---|---|
| CI-001 | PROVADO / CLOSED | CI #841 green; #214 closed; public Production Truth run `36372097656` |
| TRUST-DATA-001 | IMPLEMENTADO + PROVA AUTOMATIZADA INTERNA | PR #245 + CI #841; pentest externo continua fora deste requisito interno |
| TRUST-DSAR-001 | IMPLEMENTADO + PROVA AUTOMATIZADA INTERNA | PR #245 + CI #841 |
| TRUST-DSAR-003 | STOP-THE-LINE IMPLEMENTADO/TESTADO INTERNAMENTE | PR #245 + privacy/legal-hold contract green |
| TRUST-RET-001 | IMPLEMENTADO + TESTADO INTERNAMENTE | PR #245 + CI #841 |
| TRUST-RET-002 | IMPLEMENTADO + TESTADO INTERNAMENTE | PR #245 + CI #841 |
| TRUST-GEO-001 | IMPLEMENTADO + TESTADO INTERNAMENTE | PR #245; device físico ainda em #220 |
| TRUST-CHAT-001 | IMPLEMENTADO + TESTADO INTERNAMENTE | PR #245 |
| TRUST-REQUEST-AUDIT-001 | IMPLEMENTADO + TESTADO INTERNAMENTE | PR #245 |
| PRIVACY-MOBILE-001 | IMPLEMENTADO + BUILD/CI | PR #245; physical-device UX remains #220 |
| PRIVACY-DEACT-001 | IMPLEMENTADO + TESTADO INTERNAMENTE | PR #245 |
| TRUST-PROVIDER-PROP-001 | EXTERNO / PROVIDER-SPECIFIC | #228/#219 |
| TRUST-ARCH | OPEN PARCIALMENTE EXTERNO | runtime interno provado; provider sandbox/propagation + pentest pendentes |
| WEB-ARCH-001 | IMPLEMENTADO/CI; DEPLOY WEB PÚBLICO PENDENTE | PRs #249/#250/#251; novo Railway service requer autorização de custo |
| PILOT-APK-001 | ARTIFACT PROVADO | run `36371402054`, artifact `10949985331`, digest registrado |
| PILOT-DEVICE-001 | EXTERNO | instalação/E2E em Android físico pendente |
| FIN-RISK | EXTERNO/BLOCKING | contrato/pricing/sandbox/responsabilidades provider-specific |

## Guardrail
CI/build automatizado não substitui device físico, pentest independente ou sandbox/contrato de provider. Nenhum desses gates pode ser fechado por inferência.
