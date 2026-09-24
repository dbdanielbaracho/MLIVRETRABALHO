# FIN-RISK — refresh de PSPs candidatos — 2026-09-24

**Status:** pesquisa primária atualizada. FIN-RISK permanece OPEN/BLOCKING. Este documento não aprova provider definitivo nem autoriza dinheiro real.

## 1. Pagar.me / Stone — aderência pública atual

Fontes primárias verificadas em 24/09/2026:
- https://docs.pagar.me/docs/overview-marketplace
- https://docs.pagar.me/reference/split-1
- https://docs.pagar.me/docs/recebedores-2
- https://docs.pagar.me/reference/criar-recebedor-1
- https://docs.pagar.me/reference/receb%C3%ADveis
- https://www.pagar.me/ofertas

### Fatos confirmados
- marketplace pode receber um pagamento único e dividir entre múltiplos recebedores;
- o Split suporta N recebedores e N regras, em valor fixo ou percentual;
- o recurso de Split é documentado como disponível somente para clientes no modelo PSP;
- cada regra pode definir responsabilidade por chargeback (`liable`), taxa de processamento (`charge_processing_fee`) e restante da divisão (`charge_remainder_fee`);
- ao menos um recebedor precisa assumir essas responsabilidades;
- recebedores aceitam `individual` (PF/CPF) ou `company` (PJ/CNPJ);
- criação/edição de recebedores exige dados cadastrais alinhados aos controles de prevenção à lavagem de dinheiro, com referência explícita à Circular 3.978/20;
- recebedores passam por estados de credenciamento e somente `active` está plenamente apto a transacionar e sacar;
- recebíveis representam créditos e débitos, inclusive `refund` e `chargeback` reduzindo saldo;
- a oferta pública atual exibe taxas de varejo/pronto para usar, enquanto a oferta Flex — que menciona Split — usa **taxas customizadas**, logo não existe tarifa pública suficiente para modelar o custo real do nosso marketplace sem proposta comercial.

### Implicação
A documentação pública tem boa aderência ao desenho do MLIVRETRABALHO porque suporta múltiplos profissionais/recebedores, PF e PJ e permite explicitar responsabilidades financeiras por regra. Porém, a elegibilidade do nosso modelo de serviços, contratação PSP, pricing de Split, políticas contratuais de saldo negativo/chargeback e condições de payout precisam ser confirmadas comercialmente.

## 2. Mercado Pago — Split 1:1 e limites públicos

Fontes primárias verificadas em 24/09/2026:
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/overview
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/prerequisites
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/integration-configuration/integrate-marketplace
- https://www.mercadopago.com.br/developers/pt/docs/links-and-debts/additional-content/your-integrations/notifications/webhooks
- https://www.mercadopago.com.br/developers/pt/docs/checkout-pro-preferences/test-accounts

### Fatos confirmados
- Split 1:1 está disponível no Brasil;
- cada vendedor precisa de conta Mercado Pago com KYC aplicável e OAuth individual;
- o split desconta primeiro a comissão Mercado Pago e depois a comissão do marketplace;
- em reembolso 1:1, valores são retirados proporcionalmente; se o vendedor não tiver saldo, o marketplace não consegue executar sozinho o reembolso total por esse fluxo e precisa decidir como tratar a parcela faltante;
- documentação geral de reembolso exige saldo disponível;
- contestações/chargebacks retiram fundos do vendedor quando procedentes;
- notificações Webhook possuem `x-signature`, chave secreta e verificação HMAC; existe simulação/test mode e contas/credenciais de teste;
- a própria documentação informa que o modelo **1:N está disponível apenas para vendedores de carteira assessorada em contato com a equipe comercial**.

### Implicação
Mercado Pago é tecnicamente forte para marketplace 1:1 e possui fluxo de testes/webhooks autenticáveis, mas o desenho MLIVRETRABALHO de uma empresa pagando uma vez para potencialmente vários profissionais exige confirmar comercialmente acesso e termos do 1:N. O déficit de reembolso/saldo continua sendo risco explícito.

## 3. Shortlist técnica — sem aprovação comercial

### Candidato A — Pagar.me / Stone
**Motivo técnico:** documentação pública já cobre 1:N, PF/PJ, recebedores, split e responsabilidade de chargeback/taxas por recebedor.

### Candidato B — Mercado Pago
**Motivo técnico:** infraestrutura madura de marketplace, OAuth/KYC, teste e webhook assinado; porém 1:N depende de carteira assessorada/comercial.

### Stripe Connect
Permanece candidato exploratório, mas não foi confirmado nesta pesquisa um desenho brasileiro comercial equivalente ao fluxo 1:N pretendido. Não promover acima dos dois candidatos anteriores sem evidência local específica.

## 4. O que ainda impede escolher provider definitivo

Para Pagar.me/Stone e Mercado Pago, obter confirmação escrita/comercial de:
1. aceitação do marketplace de serviços/trabalho do MLIVRETRABALHO;
2. PF e PJ como recebedores no modelo contratado;
3. split 1:N para múltiplos profissionais em um pagamento empresarial;
4. tarifas reais de cartão, Pix, split, saque/payout e antecipação;
5. prazos de liquidação/payout;
6. responsabilidade contratual por chargeback, refund e saldo negativo;
7. reserve/hold e critérios de bloqueio;
8. onboarding/KYC/KYB/PLD e dados/documentos necessários;
9. sandbox do produto exato contratado;
10. formato/assinatura real dos webhooks e idempotency semantics;
11. relatórios/reconciliação;
12. SLA, suporte e encerramento.

## 5. Decisão intermediária

Para a próxima etapa comercial, **Pagar.me/Stone deve ser consultado primeiro** por aderência técnica pública ao 1:N. Mercado Pago deve ser consultado em paralelo especificamente sobre acesso comercial ao Split 1:N e suas condições.

Isso é uma priorização de diligência, não seleção final. Nenhum adapter real de produção será congelado e nenhum dinheiro real será movimentado até FIN-RISK ser CLOSED/APROVADO.
