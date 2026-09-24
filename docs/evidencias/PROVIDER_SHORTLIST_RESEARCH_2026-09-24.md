# Provider shortlist research — PSP / KYC / KYB

**Data:** 2026-09-24  
**Status:** pesquisa documental oficial / não equivale a seleção contratual  
**Issues relacionadas:** #215 FIN-RISK, #219 TRUST-ARCH, #228 PROVIDER-DUE-DILIGENCE

## Objetivo

Reduzir a incerteza antes do contato comercial e sandbox real, preservando o Stop-the-Line: nenhum provider é considerado aprovado apenas com documentação pública.

## PSP shortlist

### 1. Asaas

Documentação oficial consultada:

- https://docs.asaas.com/docs/split
- https://docs.asaas.com/docs/criacao-de-subcontas
- https://docs.asaas.com/reference/criar-subconta
- https://docs.asaas.com/docs/cria%C3%A7%C3%A3o-de-subcontas-baas

Fatos documentados:

- split divide automaticamente uma cobrança entre uma ou mais contas Asaas;
- `walletId` identifica cada conta participante do split;
- subcontas podem ser criadas via API e são descritas como aplicáveis a marketplaces/plataformas;
- endpoint sandbox de criação de subconta está documentado;
- onboarding/documentos e mudança de status podem ser acompanhados por webhook;
- produção de novas operações de subcontas está sujeita a período de avaliação regulatória, com limites documentados;
- criação de subcontas exige conta-pai PJ/CNPJ nas regras atuais;
- no modelo BaaS há obrigações adicionais de identificação do Asaas e homologação/regulação.

Fit preliminar:

- **tecnicamente forte para piloto marketplace**, porque reúne subconta, onboarding, split e webhook em uma única família de APIs;
- elegibilidade comercial/regulatória do MLIVRETRABALHO ainda precisa ser confirmada por escrito;
- taxas, PF/PJ permitidos como recebedores, chargeback/saldo negativo e modelo contratual continuam pendentes.

### 2. Pagar.me

Documentação oficial consultada:

- https://docs.pagar.me/docs/pedidos-com-split
- https://docs.pagar.me/reference/split-1
- https://docs.pagar.me/reference/criar-pedido-com-split-1

Fatos documentados:

- API v5 suporta pedido com múltiplos recebedores;
- split pode ser `flat` ou `percentage`;
- `recipient_id` identifica o recebedor;
- regras incluem flags de responsabilidade por chargeback e taxas de processamento;
- a documentação atual informa que Split está disponível apenas para clientes PSP.

Fit preliminar:

- **arquitetura de split é aderente ao ledger provider-neutral atual**;
- o maior gate é comercial: confirmar se o MLIVRETRABALHO pode ser aceito como cliente PSP e quais obrigações/fees se aplicam;
- recipient onboarding/KYC/KYB, settlement e sandbox precisam ser comprovados no modelo contratado.

### 3. Mercado Pago

Documentação oficial consultada:

- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/overview
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/prerequisites
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/integration-configuration/integrate-marketplace

Fatos documentados:

- Split Payments 1:1 está disponível no Brasil;
- vendedores/recebedores usam contas Mercado Pago e OAuth;
- a documentação exige nível de identificação/KYC do vendedor;
- marketplace fee/application fee são suportados;
- reembolsos podem exigir participação financeira do vendedor e do marketplace;
- modelo 1:N é restrito a vendedores de carteira assessorada em contato com o time comercial.

Fit preliminar:

- **possível para relações 1:1 por pagamento**, mas o modelo de marketplace/workforce precisa ser confirmado comercialmente;
- 1:N não deve ser assumido disponível;
- refund/negative-balance responsibility é um ponto crítico para FIN-RISK.

## Comparação preliminar

| Critério | Asaas | Pagar.me | Mercado Pago |
|---|---|---|---|
| Split documentado | sim | sim | sim |
| Múltiplos recebedores | sim | sim | 1:1 público; 1:N comercial restrito |
| Subconta/recipient API | sim | sim, recipient model | seller account + OAuth |
| Sandbox/test | documentado | precisa comprovação do fluxo contratado | test accounts documentadas |
| Onboarding cadastral | sim, com fluxo/documentos/webhooks | precisa confirmar pacote contratado | seller KYC/OAuth |
| Chargeback responsibility configurável | a confirmar comercialmente | flags explícitas no split | refund behavior documentado; responsabilidade precisa modelagem |
| Maior gate | avaliação regulatória/contrato | elegibilidade como cliente PSP | fit do workforce + 1:N/negative balance |

## KYC / identidade independente

### Datavalid / Serpro

Fontes oficiais consultadas:

- https://centraldeajuda.serpro.gov.br/duvidas/pt/avisos/datavalidsenatran/
- https://www7.serpro.gov.br/menu/noticias/noticias-2026/datavalid-v5
- https://www.serpro.gov.br/en/our-services/datavalid

Fatos documentados:

- validação biográfica e biométrica;
- biometria facial com opção de prova de vida;
- impressão digital e QR Code de CNH;
- Datavalid v5 unifica validações de pessoa física em endpoint atual;
- consumo atual está sujeito a requisitos de credenciamento/autorização SENATRAN, contratação Serpro e GCC conforme o modelo vigente;
- o produto mantém controles/certificações de segurança e privacidade publicados pelo Serpro.

Fit preliminar:

- **forte como validação independente de identidade**, mas possui gate regulatório/contratual relevante;
- não substitui KYC/KYB/PLD exigido pelo PSP para movimentação financeira;
- o MLIVRETRABALHO deve continuar preferindo provider reference/status/evidence_ref a armazenar documento bruto.

## Estratégia de minimização recomendada para o piloto

Sem selecionar provider ainda:

1. usar KYC/KYB financeiro nativo do PSP escolhido sempre que possível;
2. não duplicar documentos brutos no MLIVRETRABALHO;
3. guardar apenas IDs/referências/status/timestamps necessários à autorização e auditoria;
4. usar provider independente de identidade somente onde houver necessidade operacional clara não coberta pelo PSP;
5. manter qualquer provider adapter atrás do Capability Registry/provider-neutral baseline já existente.

## Due diligence necessária antes da decisão

Para cada PSP/KYC candidato, obter:

- confirmação escrita de elegibilidade do modelo workforce/marketplace;
- pricing e todas as taxas;
- PF/PJ suportados;
- responsabilidade KYC/KYB/PLD;
- sandbox funcional e credenciais de teste;
- webhook: assinatura, retries, ordenação, duplicidade e idempotência;
- settlement/payout timing;
- chargeback/refund/default/negative balance;
- limites de API;
- sub-processadores/privacidade/retenção;
- requisitos de homologação/produção;
- suporte/SLA e processo de incidentes.

## Estado de decisão

**Nenhum provider selecionado ainda.**

A shortlist serve para reduzir candidatos antes de contato comercial e sandbox. Issue #228 concentra a evidência externa que falta.
