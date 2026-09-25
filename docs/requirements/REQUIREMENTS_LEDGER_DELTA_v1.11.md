# Requirements Ledger — Delta v1.11

**Data:** 2026-09-24  
**Status:** ATIVO — complementa `docs/requirements/REQUIREMENTS_LEDGER.md` sem apagar o histórico anterior.  
**Documento normativo:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.11.md`

## Regra de leitura

Este delta corrige/estende o ledger base para as fatias v1.83 e v1.84. Em caso de conflito de estado posterior a 2026-09-24, este delta e o Documento da Verdade v1.11 prevalecem sobre a linha antiga correspondente no ledger base.

| ID | Requisito | Estado atual | Decisão/ADR | Código/artefato | Teste/Evidência / gate |
|---|---|---|---|---|---|
| FIN-RISK | Modelo financeiro do piloto usa split por PSP contratado; guarantee/advance/credit, escrow como default, pagamento off-platform e PIX manual não são baseline | OPEN/BLOCKING / BASELINE INTERNO DEFINIDO | Documento da Verdade v1.9–v1.11; ADR-FIN-001 | payment events, ledger, signed webhook simulator, recipient integrity | PR #216/#218/#222/#231; Issues #215/#228; provider/contrato/pricing/sandbox/legal externos pendentes |
| FIN-REF-001 | PSP real não pode ser autoridade sobre `tenantId`, `assignmentId`, `professionalId` ou recipient interno | ARQUITETURA APROVADA INTERNAMENTE / IMPLEMENTAÇÃO PROVIDER-SPECIFIC PENDENTE | ADR-FIN-001; v1.83 | `PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md` | PR #231 merge `450b1cafd5927ed8515406fbb1b91dcbd4ca7280`; sandbox real obrigatório |
| FIN-REF-002 | Referência PSP deve resolver por binding server-controlled para exatamente uma instrução financeira antes de entrar em RLS tenant | REQUIRED / PROVIDER REAL PENDENTE | ADR-FIN-001 | futuro provider-reference registry ou opaque server-issued reference | testes obrigatórios: unknown/ambiguous/collision/replay/amount mismatch/recipient binding |
| FIN-PSP-001 | Provider do piloto deve suportar multi-recebedor ou fluxo equivalente rastreável para vários profissionais por obrigação | DUE DILIGENCE OPEN | Documento da Verdade v1.10 | `PSP_TECHNICAL_FIT_MATRIX_2026-09-24.md` | Asaas/Pagar.me têm evidência pública de multi-recipient; Mercado Pago 1:N depende de comercial; Issue #228 |
| FIN-PRICE-001 | Unit economics usa pricing contratual real, não taxas públicas genéricas | OPEN / EXTERNO | Documento da Verdade v1.10 | `PSP_PUBLIC_PRICING_SNAPSHOT_2026-09-24.md` | proposta comercial escrita + responsabilidade chargeback/refund/negative balance ainda pendentes |
| TRUST-ARCH | Enforcement definitivo KYC/KYB/no-show/reporting/suspension/dispute permanece separado de fatos do provider | OPEN/BLOCKING / BASELINE NEUTRO + APPEALS + MATRIZ INTERNA PRONTOS | Documento da Verdade v1.11; ADR-TRUST-001 | verification cases + Safety audit + causal events + appeals | PR #171/#213/#217/#225/#226/#232; provider real/LGPD/legal/pentest externos pendentes |
| TRUST-REF-001 | Provider KYC/KYB real não pode impor tenant, identity/business ID interno, role, score, assignment/payment action, suspensão, deactivation ou culpa | ARQUITETURA APROVADA INTERNAMENTE / CALLBACK REAL PENDENTE | ADR-TRUST-001; v1.84 | `TRUST_PROVIDER_REFERENCE_BOUNDARY_v1.84.md` | PR #232 merge `06aca1daed708495af16511198bee40ae80367db`; sandbox real obrigatório |
| TRUST-REF-002 | Callback KYC/KYB deve autenticar evento e resolver provider reference por binding server-controlled para exatamente um verification case/tenant antes do RLS | REQUIRED / PROVIDER REAL PENDENTE | ADR-TRUST-001 | futura camada de callback/provider adapter | testes: forged IDs sem efeito, unknown/collision/replay/stale/conflict, audit preservado |
| TRUST-ENFORCE-001 | Resultado de provider é evidência de verificação e não enforcement automático | INTERNAL BASELINE DEFINIDO / ENFORCEMENT MATERIAL NÃO ATIVO | ADR-TRUST-001; enforcement matrix | verification workflow separado de Safety/enforcement | nenhuma alteração automática de score, assignments, payments, suspensão ou culpa enquanto #219 OPEN |
| TRUST-DATA-001 | Minimizar dados: preferir provider/status/reference/evidence_ref; não persistir documentos/biometria brutos por default | PROPOSTA INTERNA / LGPD FINAL PENDENTE | Documento da Verdade v1.11 | verification_cases + evidence refs | `TRUST_DATA_MINIMIZATION_RETENTION_PROPOSED_2026-09-24.md`; revisão jurídica externa pendente |
| CI-001 | Pipeline completo precisa executar em runner real | PARADO EXTERNAMENTE | Issue #214 | `.github/workflows/ci.yml` | runs atuais terminam `foundation` com `steps=null`; não é PASS nem falha de código comprovada |
| PROD-TRUTH-001 | Production-DONE exige CI atual green + probe HTTP canônico atual | OPEN/BLOCKING | Issue #214 | `scripts/production-truth-gate.sh` | Railway API/Postgres SUCCESS; probe histórico existe, probe atual continua pendente |
| PILOT-DEVICE-001 | Piloto exige APK real instalado e jornadas em aparelho físico, update/rollback e signing apropriado | OPEN/BLOCKING EXTERNO | Issue #220 | Android pilot baseline PR #227 | aparelho físico, release signing e pentest ainda pendentes |
| LEGAL-001 | Modelo concreto requer parecer de profissional jurídico brasileiro identificado | OPEN/BLOCKING EXTERNO | Issue #221 | `LEGAL_REVIEW_PACKET_2026-09-24.md` | IA/benchmark/testes não fecham gate |
| WEB-ARCH-001 | Web complementar Next.js requer lockfile reproduzível gerado por ambiente funcional | OPEN/BLOCKING DE AMBIENTE | Issue #224 | futuro `apps/web` | não fabricar dependências/lockfile manualmente |

## Production / deploy truth atual

- último code-bearing deploy confirmado: v1.81 / PR #226;
- Railway API deployment `849dd047-c70f-4a16-8624-9a3a01bd8098`: `SUCCESS`;
- Railway Postgres: `SUCCESS`;
- pending work: zero na última rechecagem;
- documentação/ADRs v1.83/v1.84/v1.11 não ativam provider real nem dinheiro real;
- CI atual continua bloqueado antes dos steps;
- `DEPLOYED`, `MERGED` ou status Railway isoladamente não significam Production-DONE.

## Stop-the-line

Não habilitar dinheiro real, callback real de KYC/KYB, enforcement automático, garantia/adiantamento/crédito ou declarar Production/Pilot-DONE até os gates correspondentes possuírem evidência externa exigida.
