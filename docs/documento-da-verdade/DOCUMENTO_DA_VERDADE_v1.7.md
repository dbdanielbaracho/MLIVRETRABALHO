# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.7

**Status:** NORMATIVO — DELTA CONSOLIDADO SOBRE v1.6  
**Data:** 2026-09-24  
**Fonte persistente oficial:** repositório GitHub `dbdanielbaracho/MLIVRETRABALHO`  
**Produto:** AI Workforce Network + Workforce OS + Marketplace

## Regra de continuidade normativa

A v1.7 incorpora integralmente por referência:

1. `DOCUMENTO_DA_VERDADE_v1.5.md` — corpo consolidado;
2. `DOCUMENTO_DA_VERDADE_v1.6.md` — delta anterior;
3. este arquivo v1.7 — delta vigente;
4. `docs/requirements/REQUIREMENTS_LEDGER.md` — rastreabilidade operacional;
5. ADRs/evidências — decisões e provas especializadas.

Em conflito explícito, v1.7 prevalece.

---

# 1. GOVERNANÇA DE CONTINUIDADE E MEMÓRIA

A execução do projeto mantém as regras já acordadas:

- GitHub é a fonte persistente da verdade;
- Documento da Verdade e Registro Integral da Conversa são documentos distintos;
- toda continuação relevante deve ser registrada em `docs/conversas/`;
- o registro vigente desta sessão é `docs/conversas/REGISTRO_INTEGRAL_CONTINUACAO_2026-09-24_PARTE_1.md`;
- não misturar MLIVRETRABALHO com Growth OS ou outros projetos;
- continuar a execução até o limite técnico real, sem interromper por bloqueio externo quando existir trabalho interno seguro a fazer;
- bloqueio externo deve ser documentado, não transformado em falso `DONE`;
- **TinyFish fica excluído do fluxo deste projeto**, salvo nova instrução explícita do usuário.

Fluxo documental obrigatório continua:

`Chat → Registro Integral → decisão → Documento da Verdade → requisito → implementação → testes → deploy → evidência`.

---

# 2. PRODUCTION TRUTH — PROBE PÚBLICO CORRENTE COMPROVADO

Em 24/09/2026 foi executado probe público canônico contra:

`GET https://mlivretrabalho.predibeacon.com/v1/health/ready`

Resultado validado externamente:

- endpoint alcançável;
- `status=ok`;
- `service=api`;
- `version=0.1.0`;
- `database=ok`.

Evidência: `docs/evidencias/PRODUCTION_PUBLIC_PROBE_2026-09-24_v1.79.md`.

O Issue #214 continua aberto porque o GitHub Actions permanece falhando antes de qualquer step (`steps=[]`). Railway SUCCESS + probe público PASS não substituem o full CI corrente.

---

# 3. TRUST-ARCH — RECURSO/CONTRADITÓRIO HUMANO IMPLEMENTADO

TRUST-ARCH continua **OPEN/BLOCKING**, mas o baseline interno foi ampliado.

## 3.1 v1.80 — recurso humano imutável

PR #225 adicionou:

- migration `0033_safety_case_appeals.sql`;
- `safety_case_appeals`;
- `safety_case_appeal_events` append-only;
- RLS + FORCE RLS;
- runtime sem UPDATE/DELETE dos fatos de recurso;
- recurso idempotente por identidade/caso;
- lifecycle `submitted → reviewing → upheld|modified|reversed`;
- decisão e ator auditáveis;
- terminal não reabre silenciosamente;
- cross-tenant protegido;
- nenhum efeito automático sobre score, Reliability, assignment, pagamento, suspensão ou deactivation.

Evidência: `docs/evidencias/SAFETY_APPEALS_v1.80.md`.

## 3.2 v1.81 — recurso mobile-first

PR #226 fecha a principal lacuna de UX do contraditório:

- profissional vê casos que ele próprio relatou;
- profissional também vê Safety cases associados ao seu próprio assignment, mesmo quando a empresa foi reporter;
- resposta diferencia `reportedByMe`;
- profissional solicita revisão humana sem UUID/manual backend;
- tela da empresa lista recursos e registra decisão humana;
- E2E prova visibilidade do caso relacionado antes da submissão do recurso;
- nenhum recurso ou decisão gera enforcement automático.

Evidência: `docs/evidencias/SAFETY_APPEALS_MOBILE_v1.81.md`.

---

# 4. TRUST ENFORCEMENT MATRIX — DEFINIDA, MAS NÃO ATIVA

A matriz operacional foi definida em:

`docs/evidencias/TRUST_ENFORCEMENT_MATRIX_PROPOSED_2026-09-24.md`.

Princípios normativos:

- case-first;
- human-review;
- causalidade explícita;
- menor escopo possível;
- tenant block não vira suspensão global;
- novas oportunidades e assignments já confirmados são fluxos separados;
- appeal obrigatório para ação material contestável;
- deny-by-default para execução crítica por IA/LLM/score.

A matriz permanece **não ativa** até fechamento das dependências externas de TRUST-ARCH.

---

# 5. TRUST INCIDENT SLA — BASELINE OPERACIONAL PROPOSTO

Foi definido baseline operacional em:

`docs/evidencias/TRUST_INCIDENT_SLA_PROPOSED_2026-09-24.md`.

Prioridades propostas:

- P0: risco imediato/account takeover/fraude financeira ativa — alvo de triagem humana até 15 min durante cobertura operacional;
- P1: ameaça relevante/fraude suspeita/assédio/violência/discriminação — até 4h;
- P2: disputa operacional/no-show/trabalho inseguro sem risco imediato — até 1 dia útil;
- P3: verificação/administração sem risco imediato — até 2 dias úteis.

Esses tempos são metas internas propostas, não SLA jurídico/contratual enquanto TRUST-ARCH e LEGAL-ARCH estiverem abertos.

---

# 6. ESTADO ATUAL DOS GATES

| Gate | Estado v1.7 | Interno concluído | Externo ainda necessário |
|---|---|---|---|
| Production Truth / CI | OPEN | Railway deploy + probe público corrente | runner GitHub Actions + full pipeline corrente |
| FIN-RISK | OPEN/BLOCKING | signed webhook, anti-replay, idempotência, recipient integrity, reconciliação baseline | provider contratado/sandbox, fees, compliance, legal/contábil |
| TRUST-ARCH | OPEN/BLOCKING | reporting, audit, causalidade, appeals, mobile appeal flow, matrix proposta, SLA proposto | provider KYC/KYB, retenção/LGPD final, legal, pentest |
| LEGAL-ARCH | OPEN/BLOCKING | escopo e questões documentados | revisão jurídica brasileira do sistema concreto |
| Device/Pilot/Pentest | OPEN | Android export histórico + HTTP E2E | aparelho físico, distribuição e pentest independente |
| WEB-ARCH | OPEN | requisito e arquitetura-alvo definidos | ambiente capaz de resolver Next.js e gerar frozen lockfile reproduzível |

Issues autoridades: #214, #215, #219, #220, #221 e #224.

---

# 7. REGRA DE ENCERRAMENTO

O projeto não será declarado Production/Pilot-DONE enquanto os gates externos aplicáveis permanecerem sem evidência real.

Enquanto isso, todo trabalho interno reversível, seguro e comprovável deve continuar sendo executado e documentado.
