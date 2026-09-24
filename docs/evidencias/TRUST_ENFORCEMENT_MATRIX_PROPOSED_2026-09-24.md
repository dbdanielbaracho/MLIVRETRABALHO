# TRUST-ARCH — Matriz de enforcement proposta e reversível

**Data:** 2026-09-24  
**Status:** PROPOSTA INTERNA / NÃO ATIVA  
**Autoridade externa pendente:** revisão jurídica brasileira + provider + pentest  

## Objetivo

Definir o comportamento seguro entre um sinal Trust/Safety e uma possível ação, sem transformar relato, score ou evento operacional em punição automática.

## Princípios obrigatórios

1. **Case-first:** sinal cria ou alimenta caso; sinal isolado não constitui culpa.
2. **Human-review:** qualquer ação material exige revisão humana identificada e auditável.
3. **Causalidade explícita:** `professional | company | force_majeure | platform | undetermined`.
4. **Escopo mínimo:** uma ação deve afetar somente a capability/tenant necessários.
5. **Tenant block ≠ platform suspension:** preferência de uma empresa não vira sanção global.
6. **Assignments confirmados são separados de novas oportunidades:** restringir novas oportunidades não cancela automaticamente compromissos existentes.
7. **Appeal disponível:** ação material contestável deve ter recurso humano e trilha append-only.
8. **Deny-by-default para automação:** nenhum agente/LLM/score pode executar suspensão, deactivation ou punição.

## Reason codes propostos

Os reason codes abaixo são taxonomia operacional, não declaração jurídica de culpa:

- `identity_verification_unresolved`
- `business_verification_unresolved`
- `account_takeover_suspected`
- `payment_fraud_signal`
- `harassment_report`
- `violence_or_threat_report`
- `unsafe_work_report`
- `discrimination_report`
- `repeated_assignment_failure`
- `confirmed_no_show`
- `company_caused_incident`
- `platform_caused_incident`
- `force_majeure_incident`
- `evidence_conflict`
- `other_review_required`

## Matriz proposta

| Sinal | Causa mínima | Revisão humana | Ação permitida antes do fechamento TRUST-ARCH | Ação proibida enquanto gate OPEN |
|---|---|---|---|---|
| verificação pendente/rejeitada | undetermined/provider fact | sim para exceção | manter capability sensível desabilitada quando já exigir verificação | declarar fraude/culpa; suspensão global automática |
| account takeover suspeito | platform/undetermined | sim | invalidar sessão específica após controle de segurança comprovado; exigir reautenticação | penalizar reputação; cancelar assignments por padrão |
| fraude financeira sinalizada | undetermined | sim | congelar somente operação financeira afetada quando provider/controle aplicável existir | bloquear trabalho global; declarar crime; debit automático |
| assédio/violência/discriminação | undetermined até revisão | sim | abrir Safety case; priorizar revisão; separar partes no canal operacional quando necessário | score punitivo automático; culpa automática; deactivation automática |
| trabalho inseguro | company/platform/undetermined | sim | registrar caso; orientar interrupção operacional quando houver risco imediato | punir profissional automaticamente |
| no-show/falha de assignment | professional/company/force_majeure/platform/undetermined | sim antes de consequência material | registrar Trust event causal; usar somente fatos confirmados em análise | strike/suspensão automática; penalizar causa não-profissional |
| tenant não quer repetir parceria | não exige culpa global | decisão da empresa | `tenant_block` local quando política final existir | converter em suspensão global |
| incidente causado pela empresa | company | sim | registrar causalidade; usar em revisão operacional da empresa | penalizar profissional |
| force majeure | force_majeure | quando necessário | registrar sem penalidade automática | reduzir Reliability do profissional automaticamente |
| conflito de evidências | undetermined | sim | manter caso em revisão; permitir contraditório | decisão automática por score/LLM |

## Escopos de ação reservados

- `tenant_block`: local a uma empresa;
- `platform_restriction`: limita capability específica;
- `platform_suspension`: impede novas oportunidades por prazo definido;
- `platform_deactivation`: permanente/excepcional.

**Nenhum desses escopos é ativado automaticamente por este documento.**

## Regra para assignments já confirmados

Até revisão jurídica e política definitiva:

- uma futura restrição de **novas oportunidades** não deve cancelar automaticamente assignments já confirmados;
- cancelamento de assignment existente exige decisão operacional separada, reason code, ator humano e evidência;
- risco imediato à integridade pode justificar medida preventiva temporária, com revisão humana e trilha de auditoria, sem constituir decisão final de culpa.

## Appeal / contraditório

Implementado em v1.80/v1.81:

- recurso idempotente por identidade/caso;
- estados `submitted → reviewing → upheld|modified|reversed`;
- ator e transições append-only;
- profissional envolvido consegue ver caso associado ao próprio assignment e solicitar revisão;
- owner/admin decide humanamente;
- decisão de recurso não altera score, acesso, pagamento ou assignment automaticamente.

## Critério para tornar a matriz ativa

Esta matriz permanece **não ativa** até que sejam concluídos:

1. revisão jurídica brasileira do modelo concreto;
2. política final de retenção/LGPD;
3. provider KYC/KYB e responsabilidades contratuais;
4. testes adversariais externos/pentest;
5. atualização do ADR-TRUST-001 para CLOSED/APROVADO.
