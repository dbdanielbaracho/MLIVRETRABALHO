# FIN-RISK — Pesquisa de PSP/marketplace — 2026-09-22

**Status:** pesquisa/evidência. `FIN-RISK` permanece OPEN/BLOCKING. Este documento não aprova garantia, adiantamento, crédito, default coverage ou provider definitivo.

## Objetivo

Comparar capacidades reais de PSPs com operação no Brasil para split, recebedores, payout, webhooks, chargeback/refund e onboarding, preservando o princípio do MLIVRETRABALHO: empresa paga uma vez, profissional recebe uma vez, complexidade fica no backend.

## Mercado Pago — Split de Pagamentos 1:1

Fontes primárias:
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/overview
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/prerequisites
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/integration-configuration/integrate-marketplace
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/integration-configuration/create-configuration
- https://www.mercadopago.com.br/developers/pt/docs/payment-facilitators/integration-update

Fatos verificados:
- Split 1:1 é explicitamente disponível no Brasil para modelo marketplace;
- usa OAuth por vendedor para obter credenciais da conta vinculada;
- Checkout Pro/Transparente/Bricks podem realizar split e comissão do marketplace;
- requisito documentado de conta do vendedor com nível de identificação/KYC aplicável;
- credenciais OAuth precisam de renovação periódica;
- em reembolso, valores são descontados proporcionalmente; se o vendedor não tiver saldo, o marketplace não consegue simplesmente executar sozinho o reembolso integral pelo fluxo 1:1 e precisa decidir como tratar a parcela faltante;
- documentação de facilitador exige identificação de submerchant conforme regras regulatórias aplicáveis.

Implicação para FIN-RISK:
- boa aderência a split 1:1 e onboarding por conta vinculada;
- risco de refund/default não desaparece: precisa de política explícita para insuficiência de saldo e responsabilidade da plataforma;
- onboarding OAuth/KYC adiciona fricção que deve ser medida no Friction Gate.

## Pagar.me — Marketplace/Split

Fontes primárias:
- https://docs.pagar.me/docs/overview-marketplace
- https://docs.pagar.me/docs/recebedores-2
- https://docs.pagar.me/docs/pedidos-com-split
- https://docs.pagar.me/reference/split-1
- https://docs.pagar.me/reference/recebedores-1
- https://docs.pagar.me/docs/pix-1

Fatos verificados:
- modelo marketplace usa `recipient`/recebedor e regras de split;
- split pode direcionar valor/percentual a múltiplos recebedores;
- regras possuem campos de responsabilidade por chargeback, taxa de processamento e restante da divisão;
- split está documentado como recurso disponível para clientes PSP;
- recebedores passam por estágios de credenciamento/status antes de estarem plenamente aptos a transacionar/sacar;
- documentação explicita necessidade de dados cadastrais de sellers para requisitos regulatórios/PLD;
- Pix suporta split e webhook de confirmação.

Implicação para FIN-RISK:
- maior expressividade documentada para atribuir responsabilidades de fee/chargeback por recebedor;
- acesso ao produto de split depende de enquadramento/contratação como cliente PSP;
- onboarding de recebedores e status regulatórios precisam ser incorporados ao desenho operacional.

## Stripe Connect — observações verificáveis

Fontes primárias:
- https://docs.stripe.com/connect/payouts-bank-accounts?locale=pt-BR
- https://docs.stripe.com/connect/supported-embedded-components/payouts

Fatos verificados:
- Connect possui contas conectadas, gestão de contas de payout, cronograma de payout e componentes para saldo/repasse;
- certas configurações colocam responsabilidade por saldos negativos na plataforma;
- disponibilidade e configuração dependem do país/modelo de conta, portanto **não foi verificada nesta pesquisa uma configuração brasileira equivalente que deva ser assumida como disponível para o nosso caso**.

Implicação:
- manter Stripe como candidato técnico, mas não promover a provider brasileira preferida sem confirmar disponibilidade comercial/regulatória específica para o modelo MLIVRETRABALHO.

## Decisões que a pesquisa permite tomar agora

1. **Manter provider adapter** no código. Não acoplar domínio a um PSP antes da seleção final.
2. **Webhooks devem ser provider-verified e idempotentes**; corpo enviado pelo cliente nunca deve ser a fonte final de verdade financeira.
3. **Ledger interno permanece canônico para reconciliação**, mas status financeiros externos precisam guardar `provider`, `provider_reference`, evento e timestamps.
4. **Split/payout e risco são conceitos diferentes:** ter split não resolve default, refund deficit, chargeback, antecipação ou garantia de pagamento.
5. **Garantia/advance/credit/default continuam proibidos como comportamento definitivo** enquanto FIN-RISK estiver OPEN.
6. Provider escolhido deve suportar ambiente de teste/sandbox, webhooks assinados e reconciliação antes de qualquer dinheiro real.

## Matriz de decisão antes de CLOSED/APROVADO

Para cada provider candidato, obter por escrito/documentação atual:
- elegibilidade comercial do MLIVRETRABALHO e modelo marketplace de serviços;
- PF/PJ como recebedor e onboarding requerido;
- Pix/cartão e split;
- payout e tempo de liquidação;
- chargeback/refund e quem assume saldo negativo;
- tratamento de insuficiência de saldo;
- fees reais negociadas;
- reservas/hold/escrow quando aplicável e legalmente disponível;
- antecipação: disponibilidade, custo, responsável pelo crédito;
- KYC/KYB/PLD e dados mínimos;
- webhook/signature/idempotency;
- conciliação/reporting;
- sandbox/contas de teste;
- suporte/SLA;
- contrato, responsabilidade e encerramento.

## Critério para fechar FIN-RISK

Não basta escolher API. O gate exige:
1. provider/comercial confirmado para nosso modelo;
2. arquitetura de cobrança/split/payout aprovada;
3. política explícita para default/refund/chargeback;
4. decisão separada sobre qualquer garantia ou antecipação;
5. modelagem unit economics com fees reais;
6. revisão contábil/tributária/jurídica brasileira;
7. sandbox E2E e reconciliação testados;
8. revisão adversarial de dinheiro duplicado/destinatário errado/idempotência;
9. Documento da Verdade/Requirements Ledger atualizados.
