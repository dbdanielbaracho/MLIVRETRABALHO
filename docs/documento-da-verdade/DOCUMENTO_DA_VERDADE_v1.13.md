# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.13

**Status:** NORMATIVO — DELTA SOBRE v1.12  
**Data:** 2026-09-25  
**Fonte persistente oficial:** `dbdanielbaracho/MLIVRETRABALHO`

## Regra de continuidade
A v1.13 incorpora integralmente a v1.12 e versões anteriores por referência. Em conflito explícito, v1.13 prevalece.

---

# 1. LGPD / RETENÇÃO PASSA A TER BASELINE OPERACIONAL INTERNO

A política antes proposta para revisão externa passa a ter baseline operacional interno documentado em:

`docs/evidencias/TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13.md`

Princípios obrigatórios:
- finalidade e minimização por classe;
- eliminação/anonymização no término da finalidade, salvo conservação documentada;
- provider status/reference/evidence_ref preferidos a documentos/biometria brutos;
- tenant/RLS/least privilege;
- legal hold explícito e restrito;
- nenhuma reutilização de Trust/Safety/KYC/financeiro para marketing/treinamento de IA por default;
- geolocalização foreground, episódica e proporcional; background tracking não é baseline.

As janelas de retenção internas são decisões conservadoras de produto e **não são alegadas como prazos legais universais**.

---

# 2. DIREITOS DO TITULAR / DSAR

Passa a existir runbook operacional em:

`docs/evidencias/DSAR_RUNBOOK_v1.13.md`

Baseline:
- confirmação simples imediata quando tecnicamente possível;
- acesso completo em até 15 dias;
- correção simples com meta interna de 5 dias úteis;
- export tenant-safe e com redaction de terceiros;
- exclusão/anonymização condicionada à classificação de retenção/legal hold;
- nenhuma exportação inclui tokens, password hashes, provider secrets ou dados indevidos de terceiros;
- cross-tenant disclosure é stop-the-line.

---

# 3. AVISO DE PRIVACIDADE

Baseline de transparência do produto:

`docs/evidencias/PRIVACY_NOTICE_BASELINE_v1.13.md`

Deve permanecer sincronizado com:
- classes de dados realmente tratadas;
- providers reais contratados;
- retenção vigente;
- geolocalização real;
- decisões automatizadas efetivamente ativas;
- compartilhamentos reais.

Mudança material exige re-review antes de ativação.

---

# 4. TRUST-DATA-001

A parte interna de minimização, retenção, acesso, exclusão/anonymização e DSAR é considerada **BASELINE INTERNO DEFINIDO**.

TRUST-ARCH continua OPEN somente por gates ainda não provados externamente/materialmente, especialmente:
- provider KYC/KYB real elegível quando necessário;
- callback real autenticado/idempotente em sandbox;
- provider-reference binding real;
- pentest/adversarial externo;
- implementação/teste runtime de automações de purge/DSAR quando o CI voltar a executar.

Nenhum provider real ou raw KYC storage foi ativado por esta versão.

---

# 5. LEGAL-ARCH

Mantém-se v1.12: parecer jurídico profissional externo não é gate obrigatório do projeto. A revisão interna contínua por fontes primárias e melhores práticas permanece obrigatória e deve ser reaberta nos gatilhos definidos na v1.12.

---

# 6. STATUS DOS GATES

- **#214 Production Truth/CI:** PARADO EXTERNAMENTE; runner segue falhando antes dos steps.
- **#215 FIN-RISK:** OPEN/BLOCKING externo por provider/contrato/pricing/sandbox/compliance/accounting operacional.
- **#219 TRUST-ARCH:** parte LGPD interna avançou; permanece OPEN por provider real/sandbox/pentest e runtime verification.
- **#220 Device/Pilot/Pentest:** OPEN/BLOCKING externo.
- **#221 LEGAL-ARCH:** CLOSED internamente sob v1.12.
- **#224 WEB-ARCH:** PARADO POR AMBIENTE/package resolution.
- **#228 Provider Due Diligence:** PARADO EXTERNAMENTE por outreach/respostas/sandbox.

---

# 7. CONTINUIDADE DOCUMENTAL

Requirements traceability é complementada por `docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.13.md`.

Registro Integral ativo: `docs/conversas/REGISTRO_INTEGRAL_CONTINUACAO_2026-09-25_PARTE_5.md`.

TinyFish permanece excluído salvo instrução explícita futura.
