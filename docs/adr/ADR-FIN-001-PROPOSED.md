# ADR-FIN-001 — Arquitetura financeira provider-neutral

**Status:** PROPOSTO / FIN-RISK permanece OPEN  
**Data:** 2026-09-22

## Contexto

O MLIVRETRABALHO já possui `earnings_ledger`, `payment_events`, webhook com idempotência e interface `PaymentProviderAdapter`, mas o provider financeiro não está congelado. O Documento da Verdade proíbe fechar garantia/advance/credit/default enquanto `FIN-RISK` estiver OPEN.

Pesquisa primária: `docs/evidencias/FIN_RISK_PSP_RESEARCH_2026-09-22.md`.

## Decisão proposta de arquitetura neutra

### 1. Separar domínios

- **Commercial obligation:** quanto a empresa deve pelo trabalho.
- **Professional payable:** quanto é devido ao profissional.
- **Platform fee:** receita da plataforma.
- **Processor fee:** custo do PSP.
- **Payment event:** fato externo imutável vindo do PSP.
- **Payout:** movimento de saída ao recebedor.
- **Reconciliation:** comparação entre ledger interno e provider.

Split, payout, garantia e crédito são conceitos distintos.

### 2. Provider Adapter obrigatório

Domínio não conhece payload específico de PSP. Cada integração implementa adapter responsável por:
- autenticar/verificar webhook;
- normalizar evento;
- fornecer `provider` e `provider_reference`;
- manter idempotência;
- rejeitar evento sem autenticidade comprovada.

### 3. Proveniência financeira

Todo fato financeiro externo deve registrar:
- `provider`;
- `provider_reference` quando existir;
- idempotency key;
- assignment/obrigação interna relacionada;
- tipo de evento;
- valor;
- timestamp recebido.

Eventos são append-only para o runtime.

### 4. Fonte de verdade

- PSP é fonte de verdade para o fato externo de processamento/liquidação.
- ledger interno é fonte canônica de obrigação, decomposição e reconciliação do produto.
- divergência entre PSP e ledger cria estado de reconciliação/alerta; não deve ser silenciosamente sobrescrita.

### 5. Default/chargeback/refund

Não assumir que split elimina risco. O comportamento de saldo insuficiente, refund e chargeback deve ser explicitamente definido por provider/contrato antes de produção financeira.

### 6. Garantia/adiantamento/crédito

Continuam **PROIBIDOS como comportamento definitivo** até FIN-RISK ser CLOSED/APROVADO. Protótipos/simulações sem dinheiro real são permitidos.

## Critérios para fechar FIN-RISK

1. provider comercial elegível confirmado;
2. fees reais e unit economics;
3. PF/PJ/onboarding e compliance confirmados;
4. política de chargeback/refund/default aprovada;
5. decisão separada sobre qualquer guarantee/advance/credit;
6. revisão contábil/tributária/jurídica brasileira;
7. sandbox E2E + webhook assinado + idempotência + reconciliação;
8. teste de payout duplicado/destinatário errado;
9. adversarial review;
10. Documento da Verdade e Requirements Ledger atualizados.

## Reabertura

Mudança material de provider, contrato, fees, responsabilidade por saldo negativo/chargeback, modelo de recebedor, antecipação ou regulação reabre FIN-RISK.
