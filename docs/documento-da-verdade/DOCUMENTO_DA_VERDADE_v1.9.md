# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.9

**Status:** NORMATIVO — DELTA CONSOLIDADO SOBRE v1.8  
**Data:** 2026-09-24  
**Fonte persistente oficial:** repositório GitHub `dbdanielbaracho/MLIVRETRABALHO`

## Regra de continuidade

A v1.9 incorpora integralmente por referência as versões v1.5, v1.6, v1.7 e v1.8. Este arquivo registra o delta posterior à v1.8. Em conflito explícito, v1.9 prevalece.

---

# 1. BASELINE FINANCEIRO DO PILOTO

O modelo financeiro-alvo do piloto inicial fica definido como:

`Empresa → PSP/provider contratado → split/repasses → profissional + fee da plataforma → webhook/eventos → ledger/reconciliação MLIVRETRABALHO`

Princípios:

- domínio permanece provider-neutral;
- PSP é fonte dos fatos externos de processamento/liquidação;
- ledger interno é fonte canônica das obrigações e da reconciliação;
- payout deve permanecer vinculado ao profissional correto do assignment;
- divergências PSP × ledger geram reconciliação/alerta, nunca sobrescrita silenciosa.

FIN-RISK permanece **OPEN/BLOCKING** até contratação, sandbox, fees, compliance e revisão externa.

---

# 2. MODELOS QUE NÃO SERÃO O PADRÃO INICIAL

## 2.1 Escrow/garantia financeira

Não será o baseline do piloto.

99Freelas e Workana usam modelos de pagamento garantido/escrow adequados a projetos com entrega/aprovação. Para o caso principal do MLIVRETRABALHO — turnos e serviços operacionais — esse modelo adiciona retenção, disputa e complexidade financeira que não serão introduzidas sem necessidade comprovada e nova decisão de FIN-RISK/legal.

## 2.2 Pagamento direto/off-platform

Não será o baseline.

O modelo do GetNinjas, em que cliente e profissional acertam o pagamento diretamente, reduz a complexidade financeira da plataforma, mas enfraquece:

- monetização integrada;
- earnings/history;
- reconciliação;
- anti-bypass;
- experiência ponta a ponta;
- capacidade de provar pagamento e repasse.

## 2.3 Conta operacional + PIX manual

Permanece rejeitado como fluxo padrão.

## 2.4 Adiantamento/garantia/crédito

Continuam fora do piloto inicial.

---

# 3. BENCHMARK MAIS PRÓXIMO

A Estaff é o comparável operacional mais próximo no tema financeiro.

Seus termos públicos atuais descrevem:

- processadora de pagamentos contratada;
- repasse ao prestador;
- split de pagamentos;
- entrada para a Estaff apenas da taxa de intermediação;
- proibição de pagamento direto dos jobs intermediados pela plataforma.

O MLIVRETRABALHO adota conceito semelhante de split, porém **não copia** eventual antecipação com caixa próprio da plataforma no piloto.

Evidência: `docs/evidencias/COMPETITOR_PAYMENT_MODELS_2026-09-24.md`.

---

# 4. PROVIDER AINDA NÃO ESCOLHIDO

A arquitetura de split não significa escolha de fornecedor.

Shortlist atual para due diligence:

- Asaas;
- Pagar.me;
- Mercado Pago;
- outros providers podem entrar se atenderem os mesmos critérios.

Seleção só pode ocorrer após:

1. elegibilidade comercial escrita;
2. fees/unit economics;
3. PF/PJ e KYC/KYB/PLD;
4. refund/chargeback/saldo negativo;
5. sandbox real;
6. webhook autenticado/idempotente;
7. reconciliação;
8. revisão contábil/tributária/jurídica brasileira.

Autoridades: Issue #215 FIN-RISK e Issue #228 PROVIDER-DUE-DILIGENCE.

---

# 5. REGRA DE CONTINUIDADE DOCUMENTAL

Toda conversa de chat referente ao MLIVRETRABALHO continua sendo registrada em `docs/conversas/`, separadamente deste Documento da Verdade.

TinyFish permanece excluído deste projeto salvo nova instrução explícita do usuário.
