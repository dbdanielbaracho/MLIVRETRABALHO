# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.10

**Status:** NORMATIVO — DELTA CONSOLIDADO SOBRE v1.9  
**Data:** 2026-09-24  
**Fonte persistente oficial:** repositório GitHub `dbdanielbaracho/MLIVRETRABALHO`

## Regra de continuidade

A v1.10 incorpora integralmente por referência as versões v1.5, v1.6, v1.7, v1.8 e v1.9. Em conflito explícito, v1.10 prevalece.

---

# 1. FRONTEIRA DE CONFIANÇA COM PSP REAL

O `SignedJsonPaymentProviderAdapter` atual permanece um **simulador interno**. Seu payload com IDs internos não deve ser copiado para integrações reais.

Um PSP real é autoridade apenas sobre fatos e referências pertencentes ao próprio PSP, como:

- event/payment/order/charge/payout IDs;
- recipient/subaccount/wallet IDs;
- status/event type;
- valor/moeda;
- timestamp e metadados autenticados do webhook.

O PSP **não é autoridade** sobre `tenantId`, `assignmentId`, `professionalId`, `recipientProfessionalId`, workspace/company authorization ou qualquer outro identificador interno do MLIVRETRABALHO.

Fluxo obrigatório para webhook/provider real:

`autenticar evento → extrair provider reference → resolver binding server-controlled → derivar tenant/assignment/profissional → entrar no contexto RLS → normalizar/persistir/reconciliar`

Referência externa desconhecida, ambígua ou conflitante deve gerar rejeição/reconciliação. Não deve existir busca cross-tenant por tentativa.

Evidência: `docs/evidencias/PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md` e PR #231, merge `450b1cafd5927ed8515406fbb1b91dcbd4ca7280`.

---

# 2. COMPATIBILIDADE TÉCNICA DOS PSPs

O caso prioritário é uma empresa contratar/pagar vários profissionais em um mesmo turno/evento.

Leitura técnica atual, baseada em documentação pública e ainda sujeita a due diligence comercial:

- **Asaas:** evidência pública forte para split multi-recebedor via múltiplos `walletId`, além de subcontas/sandbox documentados.
- **Pagar.me:** evidência pública forte para N recebedores/regras de split, condicionada a elegibilidade/contrato PSP.
- **Mercado Pago:** fluxo público padrão 1:1; 1:N depende de carteira assessorada/time comercial e não pode ser tratado como disponível sem confirmação escrita.

A ordem atual de due diligence é:

1. Asaas;
2. Pagar.me;
3. Mercado Pago.

Essa ordem é apenas operacional para investigação, **não é seleção final nem ranking de qualidade**.

Evidência: `docs/evidencias/PSP_TECHNICAL_FIT_MATRIX_2026-09-24.md`.

---

# 3. PRICING PÚBLICO NÃO É UNIT ECONOMICS FINAL

Taxas públicas podem ser usadas somente como referência preliminar.

Regras:

- pricing público não substitui proposta comercial escrita;
- taxas específicas de marketplace/split podem diferir das páginas públicas;
- Pagar.me split depende de oferta/comercial;
- Mercado Pago 1:N não tem preço final inferível a partir do checkout 1:1;
- Asaas pode ter condições contratuais diferentes das taxas padrão públicas.

Portanto FIN-RISK permanece OPEN até recebermos pricing real/contratual e calcularmos unit economics com o modelo efetivamente elegível.

Evidência: `docs/evidencias/PSP_PUBLIC_PRICING_SNAPSHOT_2026-09-24.md`.

---

# 4. STATUS DOS GATES

## Production Truth / CI — #214

**PARADO EXTERNAMENTE.** O workflow atual continua terminando antes de qualquer step (`steps=null`). Railway não apresenta regressão: API e Postgres permanecem `SUCCESS`.

## FIN-RISK — #215

Baseline interno definido e endurecido, mas fechamento ainda depende de:

- provider comercialmente elegível/contratado;
- pricing/fees reais;
- PF/PJ/KYC/KYB/PLD;
- refund/chargeback/negative balance;
- sandbox real;
- callback/webhook provider-specific autenticado;
- binding seguro de referências externas;
- revisão contábil/tributária/jurídica brasileira.

## PROVIDER-DUE-DILIGENCE — #228

Preparação interna inclui shortlist, questionário, outreach packet, matriz técnica, pricing indicativo e trust boundary. Restam respostas comerciais e sandbox reais.

## TRUST-ARCH — #219

Continua dependente de provider KYC/KYB real, callback sandbox, política LGPD final, revisão jurídica e pentest externo.

## Device/Pilot/Pentest — #220

Continua dependente de APK/aparelho físico, update/rollback real, release signing/keystore e pentest independente.

## LEGAL-ARCH — #221

Pacote interno pronto; falta parecer profissional jurídico brasileiro identificado.

## WEB-ARCH — #224

Continua bloqueado por ambiente de dependências/lockfile reproduzível.

---

# 5. CONTINUIDADE DOCUMENTAL

Toda conversa do chat referente ao MLIVRETRABALHO continua sendo registrada em `docs/conversas/`.

TinyFish permanece excluído deste projeto salvo instrução explícita futura do usuário.

Quando um gate estiver realmente parado, isso deve ser informado claramente ao usuário e registrado no histórico, sem simular progresso naquele gate.
