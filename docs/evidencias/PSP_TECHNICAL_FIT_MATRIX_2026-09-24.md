# PSP Technical Fit Matrix — MLIVRETRABALHO

**Data:** 2026-09-24  
**Escopo:** compatibilidade técnica pública para o baseline `Empresa → PSP → split → profissionais + fee da plataforma`.  
**Status:** pesquisa técnica; não seleciona nem aprova provider comercialmente.

## Caso de uso prioritário

Uma empresa pode contratar vários profissionais no mesmo turno/evento. O PSP deve permitir que uma obrigação de pagamento resulte em repasses rastreáveis para múltiplos recebedores e taxa da plataforma, com referências externas suficientes para webhook, reconciliação, refund/chargeback e payout.

## Matriz

| Critério | Asaas | Pagar.me | Mercado Pago |
|---|---|---|---|
| Split multi-recebedor documentado publicamente | Sim — `splits[]` com um `walletId` por conta; documentação informa não haver limite de quantidade de `walletId`, limitado pelas regras de valor/percentual | Sim — pedido pode ter mais de um recebedor e a referência documenta N recebedores/regras | Fluxo público documentado é 1:1; 1:N somente para carteira assessorada em contato com time comercial |
| Identificador de recebedor | `walletId` | `recipient_id` | vendedor autorizado/OAuth; modelo 1:N depende do arranjo comercial |
| Onboarding de recebedores | contas/subcontas Asaas; endpoint de subconta em sandbox | criação de recebedor + conta bancária; elegibilidade PSP deve ser confirmada | conta vendedor com KYC exigido + OAuth; 1:N requer comercial |
| Sandbox/teste público | Sim; criação de subcontas em sandbox documentada, com limite diário | API/reference e ambiente dependem do contrato/elegibilidade a confirmar | contas de teste documentadas para 1:1 |
| Regra de fee/responsabilidade | precisa confirmação contratual completa | objeto split expõe opções de responsabilidade/processing fee/remaining fee | comissão MP é descontada do vendedor antes da comissão do marketplace no 1:1; condições de 1:N precisam comercial |
| Adequação técnica pública para um pagamento com vários profissionais | Forte evidência técnica pública | Forte evidência técnica pública, condicionada a ser cliente PSP | Condicionada a aprovação/comercial para 1:N |

## Leitura para o MLIVRETRABALHO

### Asaas
A documentação pública descreve um array de `splits`, cada entrada apontando para um `walletId`, e afirma que não há limite de quantidade de `walletId` no split, respeitadas as regras de valor líquido/100%. Também há criação de subcontas em sandbox. Isso se alinha diretamente ao cenário de vários profissionais em uma mesma obrigação.

### Pagar.me
A documentação v5 descreve pedidos com múltiplos recebedores e N regras de split. Também permite configurar responsabilidade de chargeback/taxa por recebedor. Porém o split é explicitamente restrito a clientes PSP, então o encaixe real depende de elegibilidade e contrato comercial.

### Mercado Pago
O produto público 1:1 é bem documentado e exige OAuth/KYC do vendedor. Para o cenário 1:N — mais aderente a uma empresa pagando vários profissionais numa mesma operação — a própria documentação informa que o produto está disponível apenas para vendedores de carteira assessorada em contato com a equipe comercial. Portanto não deve ser tratado como disponível para o projeto até confirmação escrita.

## Consequência para a due diligence

A ordem de investigação técnica/comercial deve priorizar a confirmação de:

1. Asaas — elegibilidade do modelo workforce/marketplace, estrutura de subcontas, fees, chargeback/refund e settlement;
2. Pagar.me — elegibilidade para contrato PSP, recebedores PF/PJ, fees, liabilities e sandbox;
3. Mercado Pago — acesso efetivo ao 1:N para o MLIVRETRABALHO e condições comerciais.

Esta ordem é de **due diligence**, não uma escolha final de provider.

## Fronteira de segurança

Independentemente do PSP, `walletId`, `recipient_id`, payment/order IDs e demais referências externas devem ser vinculados pelo backend a uma instrução financeira interna. O provider não é autoridade sobre `tenantId`, `assignmentId` ou IDs internos de profissional. Ver `PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md`.

## Gate

Nenhum provider deve ser marcado como selecionado até existir:

- confirmação comercial escrita do modelo;
- tabela real de fees;
- PF/PJ/KYC/KYB/PLD definidos;
- sandbox real com webhook autenticado;
- testes de idempotência/reconciliação e recipient binding;
- política de refund/chargeback/negative balance;
- revisão jurídica/contábil brasileira.
