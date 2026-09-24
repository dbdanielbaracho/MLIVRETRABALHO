# MLIVRETRABALHO — Provider Outreach Packet

**Data:** 2026-09-24  
**Issue:** #228  
**Objetivo:** padronizar o primeiro contato comercial/técnico com PSP/KYC candidatos.

## Contexto curto do projeto

MLIVRETRABALHO é um marketplace/workforce platform mobile-first que conecta empresas a profissionais para oportunidades de trabalho, matching, agenda, presença, reputação, substituição, pagamentos e operação.

Para o piloto inicial:

- sem crédito;
- sem adiantamento ao profissional;
- sem garantia de pagamento com capital próprio da plataforma;
- sem PIX manual por conta operacional como fluxo padrão;
- pagamento somente por PSP contratado quando FIN-RISK fechar;
- plataforma mantém ledger/reconciliação internos, mas fatos financeiros externos precisam vir do provider;
- preferência por onboarding/KYC/KYB nativo do provider e armazenamento apenas de status/reference/evidence_ref quando possível.

## Assunto padrão — PSP

`MLIVRETRABALHO — avaliação de API marketplace, split, subcontas e onboarding no Brasil`

## Mensagem padrão — PSP

Olá,

Estamos avaliando provedores para o piloto do MLIVRETRABALHO, uma plataforma brasileira de workforce/marketplace que conecta empresas e profissionais.

Nosso objetivo é usar um PSP para onboarding de recebedores, cobrança, split/platform fee, payout, webhooks autenticados e reconciliação, sem custódia manual de recursos pela plataforma.

O piloto não terá crédito, adiantamento, garantia financeira própria nem PIX manual como fluxo padrão.

Precisamos confirmar se o nosso modelo é comercialmente elegível e solicitar informações sobre:

1. suporte a recebedores PF e PJ/MEI;
2. onboarding KYC/KYB e responsabilidades PLD/FT;
3. split e platform fee;
4. prazos de settlement/payout;
5. chargeback, refund e saldo negativo;
6. sandbox e simulações de onboarding/pagamento/refund/chargeback/payout;
7. autenticação e idempotência de webhooks;
8. fees/tabela comercial;
9. requisitos de homologação/produção;
10. privacidade, retenção e subprocessadores relevantes.

Temos um questionário técnico/comercial completo e podemos encaminhá-lo ao responsável adequado.

Obrigado.

MLIVRETRABALHO

---

# Asaas

## Motivo do contato

A documentação pública atual indica:

- subcontas via API;
- uso para marketplace/plataformas;
- `walletId` para split;
- sandbox;
- onboarding/documentos;
- webhooks de situação cadastral;
- avaliação regulatória em produção.

## Perguntas prioritárias adicionais

1. O modelo MLIVRETRABALHO pode criar/operar subcontas para profissionais PF e PJ/MEI?
2. A exigência atual de conta-pai PJ/CNPJ é suficiente ou existe CNAE/contrato específico?
3. O modelo deve ser não-BaaS ou BaaS?
4. Quais obrigações de marca/identificação do Asaas são aplicáveis ao nosso fluxo?
5. Quais limites de avaliação regulatória valeriam no piloto?
6. Há sandbox completo para onboarding + split + payout + webhook de aprovação?
7. Quais taxas específicas existem para subcontas, split e transferências/payout?

Referências oficiais internas da pesquisa:

- `PROVIDER_SHORTLIST_RESEARCH_2026-09-24.md`
- https://docs.asaas.com/docs/criacao-de-subcontas
- https://docs.asaas.com/reference/criar-subconta

---

# Pagar.me

## Motivo do contato

A documentação v5 mostra split com múltiplos recebedores e flags explícitas de responsabilidade/taxas, porém informa que a funcionalidade está disponível apenas para clientes PSP.

## Perguntas prioritárias adicionais

1. O MLIVRETRABALHO é elegível para contratação como cliente PSP no modelo marketplace/workforce?
2. Como funciona o onboarding de recebedores PF e PJ/MEI?
3. É possível delegar KYC/KYB ao Pagar.me sem armazenarmos documentos brutos?
4. Como `liable`, processing fee e remainder fee devem ser configurados em marketplace de serviços?
5. Qual é a política real de chargeback/refund/negative balance?
6. Sandbox permite simular recipient approval, split, chargeback e payout?
7. Quais fees/mínimos comerciais se aplicam ao piloto?

Referências:

- https://docs.pagar.me/docs/pedidos-com-split
- https://docs.pagar.me/reference/split-1

---

# Mercado Pago

## Motivo do contato

A documentação pública indica Split Payments 1:1 no Brasil, seller OAuth/KYC e marketplace fee. O modelo 1:N depende de carteira assessorada/time comercial.

## Perguntas prioritárias adicionais

1. O modelo workforce do MLIVRETRABALHO é elegível ao Split 1:1?
2. Para cada assignment/pagamento, um profissional pode atuar como seller/recebedor individual via OAuth?
3. Existe alternativa gerenciada para 1:N adequada ao nosso modelo?
4. É obrigatório KYC 6 para todos os profissionais recebedores?
5. Como tratar refund quando o seller não possui saldo suficiente?
6. Qual responsabilidade financeira fica com o marketplace?
7. Há contrato específico de marketplace/facilitador aplicável?
8. Qual sandbox/test account reproduz melhor o fluxo real?

Referências:

- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/overview
- https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/prerequisites
- https://www.mercadopago.com.br/developers/pt/docs/payment-facilitators/prerequisites

---

# Datavalid / Serpro

## Assunto padrão

`MLIVRETRABALHO — avaliação Datavalid v5 para validação de identidade no Brasil`

## Mensagem padrão

Olá,

Estamos avaliando o Datavalid para uma camada independente de validação de identidade no MLIVRETRABALHO, uma plataforma brasileira de workforce/marketplace.

A necessidade inicial é validar identidade de profissionais e, quando necessário, representantes de empresas, preservando minimização de dados e evitando armazenar documentos/biometria brutos na plataforma sempre que possível.

Gostaríamos de confirmar:

1. elegibilidade do nosso caso de uso no Datavalid v5;
2. processo atual de credenciamento SENATRAN/Credencia;
3. necessidade de contrato com Serpro e GCC;
4. opções de sandbox/demonstração;
5. validações biográficas, biometria facial e prova de vida disponíveis;
6. modelo de consentimento/ciência aplicável;
7. pricing;
8. dados retornados e retenção mínima recomendada;
9. SLA/suporte;
10. requisitos de produção.

Obrigado.

MLIVRETRABALHO

Referências:

- https://centraldeajuda.serpro.gov.br/duvidas/pt/avisos/datavalidsenatran/
- https://www7.serpro.gov.br/menu/noticias/noticias-2026/datavalid-v5

---

## Regra de registro das respostas

Cada resposta recebida deve ser registrada em `docs/evidencias/provider-responses/` com:

- provider;
- data;
- contato/cargo;
- canal;
- resposta original preservada;
- resumo factual separado;
- pricing/contrato anexado quando permitido;
- pontos ainda não respondidos;
- `evidence_ref` no Issue #228.

Nenhuma resposta comercial isolada fecha FIN-RISK/TRUST-ARCH sem sandbox e revisão externa aplicável.
