# MLIVRETRABALHO — comparação de modelos de pagamento dos concorrentes

**Data:** 2026-09-24  
**Objetivo:** comparar como concorrentes próximos tratam cobrança, retenção e repasse, para orientar o baseline financeiro do piloto sem selecionar PSP antes da due diligence externa.

## Fontes públicas atuais consultadas

### Estaff
Fonte principal: Termos e Condições públicos da Estaff.

Fatos observados:
- o pagamento da prestação aparece na plataforma até a transferência ao prestador pela processadora contratada pela Estaff;
- os valores pagos pelo contratante são repassados aos prestadores mediante **split de pagamentos**;
- a contraprestação do serviço é repassada diretamente aos prestadores;
- para a Estaff ingressa apenas a taxa de intermediação como faturamento;
- o contratante não deve pagar diretamente ao prestador por jobs intermediados pela plataforma;
- a Estaff atua como mandatária dos prestadores para cobrança/recebimento dos valores dos jobs;
- os termos admitem, por decisão da própria Estaff, pagamento antecipado ao prestador antes do pagamento do contratante, hipótese em que a Estaff se sub-roga no crédito — esse componente **não será copiado pelo piloto do MLIVRETRABALHO**, pois garantia/advance/credit permanecem fora do escopo inicial.

### 99Freelas
Fonte principal: página pública “Como Funciona”.

Fatos observados:
- o cliente garante o pagamento após escolher o freelancer;
- o valor fica sob proteção da plataforma;
- o pagamento é liberado após aprovação do resultado;
- disputa pode ser aberta quando as partes não chegam a consenso;
- a página informa Transfeera para intermediação via Pix, além de cartão/PayPal;
- o repasse ao freelancer ocorre após aprovação/liberação.

Esse é um modelo de **pagamento garantido/escrow-like**, adequado a projetos com entrega/aprovação, mas adiciona retenção e lógica de disputa financeira que não são necessárias como baseline do nosso turno operacional.

### Workana
Fontes principais: Central de Ajuda atual e material explicativo de escrow.

Fatos observados:
- projetos de preço fixo exigem depósito de garantia antes do início;
- o pagamento fica em garantia até aprovação/liberação;
- projetos por hora exigem forma de pagamento válida e aprovação de horas;
- a plataforma possui processo de liberação/reembolso.

Esse é um modelo clássico de **garantia/escrow**, com maior controle financeiro da plataforma sobre o dinheiro durante a execução.

### GetNinjas
Fonte principal: Central de Ajuda pública.

Fatos observados:
- o pagamento do serviço é feito diretamente entre cliente e profissional;
- GetNinjas declara não participar da negociação/pagamento do serviço;
- profissionais definem suas formas de recebimento;
- monetização da plataforma ocorre pelo acesso do profissional aos contatos/pedidos mediante moedas/créditos pré-pagos.

Esse é um modelo de **lead marketplace / pagamento off-platform**.

## Três padrões observados

| Padrão | Exemplo | Dinheiro do serviço fica sob controle da plataforma? | Vantagem | Desvantagem para MLIVRETRABALHO |
|---|---|---:|---|---|
| Split via PSP | Estaff | Não necessariamente; PSP divide/repassa | UX integrada e comissão automática | exige PSP elegível, KYC/KYB, reconciliação e contrato |
| Escrow/garantia | 99Freelas, Workana | Sim/garantia até liberação | protege entrega/pagamento | mais retenção, disputa, complexidade financeira/regulatória |
| Off-platform | GetNinjas | Não | simplicidade | perde comissão integrada, reconciliação, histórico de ganhos e aumenta bypass |

## Decisão de baseline para o piloto MLIVRETRABALHO

### Adotar como alvo

**Split por PSP/provider contratado**, provider-neutral no domínio.

Fluxo-alvo:

`Empresa → PSP → split/repasses → profissional + fee da plataforma → webhook/eventos → ledger/reconciliação MLIVRETRABALHO`

O PSP será a fonte de verdade dos fatos externos de processamento/liquidação; o ledger interno continuará sendo a fonte canônica das obrigações e da reconciliação.

### Não adotar como padrão inicial

1. **Escrow/garantia financeira mantida pela plataforma** — não é baseline do piloto.
2. **Pagamento direto/off-platform como fluxo padrão** — não é baseline, porque prejudica monetização, reconciliação, earnings, anti-bypass e experiência integrada.
3. **Conta bancária operacional do MLIVRETRABALHO recebendo tudo e fazendo PIX manual** — rejeitado como padrão.
4. **Adiantamento/garantia/crédito com caixa da plataforma** — fora do piloto, conforme decisão já registrada.

## O que ainda NÃO está decidido

Esta evidência não seleciona Asaas, Pagar.me, Mercado Pago ou outro PSP.

Antes de ativar dinheiro real continuam obrigatórios:
- elegibilidade comercial do modelo;
- fees/unit economics;
- PF/PJ e KYC/KYB/PLD;
- comportamento de split, payout, refund, chargeback e saldo negativo;
- sandbox real;
- webhook autenticado/idempotente;
- reconciliação;
- revisão contábil/tributária/jurídica brasileira.

Autoridades de fechamento: FIN-RISK #215 e PROVIDER-DUE-DILIGENCE #228.
