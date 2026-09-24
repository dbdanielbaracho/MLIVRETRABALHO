# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.8

**Status:** NORMATIVO — DELTA CONSOLIDADO SOBRE v1.7  
**Data:** 2026-09-24  
**Fonte persistente oficial:** repositório GitHub `dbdanielbaracho/MLIVRETRABALHO`

## Regra de continuidade

A v1.8 incorpora integralmente por referência as versões v1.5, v1.6 e v1.7. Este arquivo registra apenas o delta posterior à v1.7. Em conflito explícito, v1.8 prevalece.

---

# 1. PILOTO ANDROID — DISTRIBUIÇÃO INTERNA DEFINIDA

PR #227 adiciona o baseline de distribuição do piloto Android sem Play Store e sem custo recorrente obrigatório.

## 1.1 Canal

O piloto fechado inicial usa APK Android por sideload.

- application ID de piloto: `com.predibeacon.mlivretrabalho.pilot`;
- nome: `MLivreTrabalho Pilot`;
- identidade separada para não congelar antecipadamente o package definitivo de produção/store.

## 1.2 Build

`scripts/build-android-pilot.sh`:

- executa Expo prebuild Android;
- gera `assembleDebug`;
- produz APK do piloto;
- gera `SHA256SUMS.txt`;
- gera `BUILD_INFO.txt` com versão, commit SHA, horário UTC, package e modo de assinatura.

Workflow manual: `.github/workflows/pilot-android.yml`.

## 1.3 Limite de verdade

O baseline usa assinatura Android de debug e serve somente ao piloto interno fechado.

Não equivale a:

- assinatura release/produção;
- Play Store readiness;
- instalação real em aparelho;
- update path comprovado;
- device E2E;
- pentest.

Issue #220 continua OPEN.

Evidência: `docs/evidencias/PILOT_ANDROID_DISTRIBUTION_v1.82.md`.

---

# 2. FIN-RISK — GARANTIA/ADIANTAMENTO/CRÉDITO FORA DO PILOTO

Decisão de produto para o piloto inicial:

- sem garantia financeira assumida pela plataforma;
- sem adiantamento ao profissional;
- sem crédito/empréstimo;
- sem cobertura de default pela plataforma;
- sem PIX manual por conta operacional como fluxo padrão.

Essas capacidades ficam fora do escopo e desabilitadas.

O fluxo financeiro-alvo, quando FIN-RISK fechar, permanece PSP contratado → fatos autenticados → ledger/reconciliação → payout vinculado ao profissional correto → split/fee conforme contrato real e revisão externa.

Evidência: `docs/evidencias/FIN_PILOT_SCOPE_DECISION_2026-09-24.md`.

FIN-RISK continua OPEN/BLOCKING para provider comercial, fees/unit economics, onboarding/compliance PF/PJ, chargeback/refund/saldo negativo, sandbox real e revisão contábil/tributária/jurídica.

---

# 3. TRUST-ARCH — MINIMIZAÇÃO/RETENÇÃO PREPARADA PARA REVISÃO

Foi criada proposta interna:

`docs/evidencias/TRUST_DATA_MINIMIZATION_RETENTION_PROPOSED_2026-09-24.md`.

Princípios:

- coletar somente o necessário;
- preferir status/provider reference/evidence reference a documento bruto;
- RLS + autorização por papel para tenant-owned;
- não reutilizar Trust/Safety/KYC/financeiro para marketing ou treino de IA por padrão;
- KYC/KYB não deve armazenar documento bruto por padrão;
- logs não devem conter tokens/segredos;
- exclusão/correção deve distinguir dados mutáveis de fatos que possam exigir retenção/auditoria.

A proposta não fixa prazos legais finais nem declara conformidade LGPD. A revisão jurídica brasileira continua obrigatória para fechamento.

---

# 4. ESTADO DOS GATES APÓS v1.82

| Gate | Estado | O que está concluído internamente | O que ainda depende de evidência externa |
|---|---|---|---|
| Production Truth / CI | OPEN | Railway builds/deploys, pipeline definido, probe v1.79 histórico | runner GitHub Actions + probe corrente |
| FIN-RISK | OPEN/BLOCKING | webhook/ledger/recipient/idempotência + decisão sem guarantee/advance/credit no piloto | PSP/fees/compliance/sandbox/legal-contábil |
| TRUST-ARCH | OPEN/BLOCKING | Safety, causalidade, appeals, mobile appeals, matrix, SLA, proposta de minimização | provider KYC/KYB, prazos/política LGPD final, legal, pentest |
| LEGAL-ARCH | OPEN/BLOCKING | escopo e decisões preservadas para revisão | advogado/revisão brasileira documentada |
| Device/Pilot/Pentest | OPEN | canal APK, build script, hash/build info, rollback/support | APK executado, aparelho físico, update real, release signing, pentest |
| WEB-ARCH | OPEN | arquitetura/requisito definidos | resolução de dependências Next.js + frozen lockfile + build/deploy |

---

# 5. REGRA DE CONCLUSÃO

O trabalho interno seguro e reversível foi avançado até o limite atual. Nenhum gate externo será declarado concluído por documentação, IA, deploy isolado ou teste substituto.
