# Auditoria adversarial interna — MLIVRETRABALHO — 2026-09-24

**Escopo:** arquitetura e superfícies críticas disponíveis no repositório.  
**Regra:** esta auditoria interna não substitui pentest externo, revisão jurídica/tributária/contábil brasileira, sandbox PSP real nem validação em aparelho físico.

## Achados confirmados e tratados

### A-01 — Webhook financeiro autenticava header compartilhado, não o corpo bruto
**Risco:** payload financeiro poderia não estar criptograficamente vinculado à credencial apresentada.  
**Correção:** PR #216 — HMAC-SHA256 sobre `timestamp.rawBody`, comparação constante, janela anti-replay, provider provenance controlada pelo adapter.  
**Estado:** corrigido no código; FIN-RISK permanece OPEN até sandbox/provider real.

### A-02 — Eventos Trust não preservavam causalidade explícita
**Risco:** `no_show`, atraso ou incidente poderiam existir sem distinguir causa profissional, empresa, força maior, plataforma ou indeterminada.  
**Correção:** PR #217 — causalidade, ator registrador, append-only runtime e E2E cross-tenant.  
**Estado:** corrigido no baseline; nenhuma penalidade automática ativada.

### A-03 — Eventos de payout não provavam destinatário interno
**Risco:** um evento de payout poderia reconciliar o assignment sem demonstrar que o recebedor correspondia ao profissional correto.  
**Correção:** PR #218 — `recipientProfessionalId`, FK, vínculo com assignment, idempotência incluindo destinatário e teste adversarial de destinatário errado.  
**Estado:** corrigido no baseline; nenhum dinheiro real habilitado.

### A-04 — CI indisponível antes da execução
**Risco:** regressões deixam de ser detectadas pelo gate padrão.  
**Evidência:** múltiplos jobs com `runner_id=0` e `steps=[]`.  
**Mitigação temporária:** exceção externa explicitamente registrada; Railway build usado como compile/deploy gate adicional, nunca chamado de CI green.  
**Estado:** OPEN — Issue #214.

### A-05 — Railway detectou erro TypeScript que o CI indisponível não detectou
**Erro:** `exactOptionalPropertyTypes` rejeitou optional property explicitamente `undefined` no adapter de pagamento.  
**Correção:** PR #218 omite propriedades opcionais ausentes em vez de retorná-las como `undefined`.  
**Estado:** correção em deploy/validação Railway.

## Gates externos deliberadamente não falsificados

1. **Production Truth:** probe HTTP canônico contra domínio público ainda precisa evidência executável; Issue #214.
2. **FIN-RISK:** PSP comercial, fees, KYC/KYB financeiro, política refund/chargeback/default, sandbox real e revisão brasileira permanecem obrigatórios; Issue #215.
3. **TRUST-ARCH:** provider KYC/KYB, enforcement matrix, recurso/apelação, retenção/SLA e revisão jurídica permanecem externos.
4. **Mobile:** Android export não substitui E2E em aparelho físico nem distribuição real.
5. **Security:** RLS/testes automatizados não substituem pentest independente.

## Resultado
O baseline técnico foi endurecido onde havia evidência concreta. O projeto não deve ser declarado Production-DONE enquanto os gates externos acima permanecerem sem prova. Nenhum achado desta auditoria autoriza garantia financeira, crédito, adiantamento, punição automática ou score de culpa.
