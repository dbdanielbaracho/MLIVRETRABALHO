# Requirements Ledger — Delta v1.12

**Data:** 2026-09-25  
**Status:** ATIVO — complementa ledger base e delta v1.11  
**Documento normativo:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.12.md`

## Regra de leitura
Em conflito posterior, v1.12 prevalece sobre a linha equivalente da v1.11 sem apagar histórico.

| ID | Requisito | Estado atual | Evidência / regra |
|---|---|---|---|
| LEGAL-001 | Parecer jurídico profissional externo deixa de ser gate obrigatório | SUPERSEDIDO pela v1.12 | decisão de governança 2026-09-25 |
| LEGAL-002 | Projeto deve manter revisão jurídica interna documentada por fontes primárias, legislação/jurisprudência atuais e melhores práticas | REQUIRED / IMPLEMENTADO BASELINE | `LEGAL_BEST_PRACTICES_REVIEW_v1.12.md` |
| LEGAL-003 | Tema 725/ADPF 324 não pode ser tratado como blindagem automática de relação plataforma-profissional | REQUIRED | revisão v1.12 |
| LEGAL-004 | Tema 1291 deve ser rechecado periodicamente e tratado como matéria em evolução até tese final aplicável | REQUIRED / WATCH | revisão v1.12 |
| LEGAL-005 | Guardrails trabalhistas: aceite/recusa real, sem exclusividade obrigatória, multiempresa, sem punição por recusa, sem controle contínuo fora do assignment, sem background location baseline | REQUIRED | Documento da Verdade v1.12 |
| LEGAL-006 | LGPD: finalidade, minimização, least privilege, retenção proporcional, segurança, provider refs em vez de raw docs quando possível, revisão humana para efeitos materiais aplicáveis | REQUIRED | Documento da Verdade v1.12 + ANPD baseline |
| LEGAL-007 | Reabrir análise antes de exclusividade/metas/controle substancial, background tracking, enforcement automático, crédito/garantia/adiantamento, mudança de split, staffing/temp/direct hire, nova jurisdição/dado sensível | REQUIRED | Documento da Verdade v1.12 |
| FIN-RISK | Continua OPEN por provider/contrato/pricing/sandbox/compliance; parecer jurídico externo removido como requisito obrigatório | OPEN/BLOCKING EXTERNO | Issues #215/#228 |
| TRUST-ARCH | Continua OPEN por provider/sandbox/LGPD operacional/pentest; parecer jurídico externo removido como requisito obrigatório | OPEN/BLOCKING EXTERNO | Issues #219/#228/#220 |

## Limitação
A estratégia interna de melhores práticas não é parecer jurídico profissional e não garante ausência de passivo. Profissional habilitado continua necessário quando exigido por lei, disputa, fiscalização, representação ou decisão contratual específica que demande aconselhamento jurídico formal.
