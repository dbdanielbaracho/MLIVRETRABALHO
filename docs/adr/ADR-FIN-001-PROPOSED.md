# ADR-FIN-001 — Arquitetura financeira provider-neutral

**Status:** PROPOSTO / FIN-RISK permanece OPEN  
**Data:** 2026-09-22  
**Atualização:** 2026-09-24 — baseline do piloto alinhado a split por PSP, com evidência comparativa de concorrentes e fronteira de referência externa endurecida.

## Contexto

O MLIVRETRABALHO já possui `earnings_ledger`, `payment_events`, webhook com idempotência e interface `PaymentProviderAdapter`, mas o provider financeiro não está congelado. O Documento da Verdade proíbe fechar garantia/advance/credit/default enquanto `FIN-RISK` estiver OPEN.

Pesquisas/evidências:
- `docs/evidencias/FIN_RISK_PSP_RESEARCH_2026-09-22.md`;
- `docs/evidencias/PROVIDER_SHORTLIST_RESEARCH_2026-09-24.md`;
- `docs/evidencias/COMPETITOR_PAYMENT_MODELS_2026-09-24.md`;
- `docs/evidencias/PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md`.

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

### 2. Baseline financeiro do piloto

O fluxo-alvo inicial é **split por PSP/provider contratado**, sem a conta operacional do MLIVRETRABALHO receber integralmente os valores para depois realizar PIX manual.

Fluxo-alvo:

`Empresa → PSP → split/repasses → profissional + fee da plataforma → webhook/eventos → ledger/reconciliação MLIVRETRABALHO`

Razões:
- mantém experiência integrada;
- preserva fee/comissão da plataforma;
- reduz bypass;
- permite earnings e reconciliação;
- aproxima-se do modelo público da Estaff, concorrente mais próximo em workforce/gigs;
- evita assumir, como baseline, retenção financeira tipo escrow quando o caso de uso principal é turno/serviço operacional concluído.

### 3. Modelos não adotados como padrão inicial

- **Escrow/garantia sob controle da plataforma:** não será o baseline do piloto. Pode ser reavaliado futuramente para modalidades específicas, mas exige decisão própria de FIN-RISK/legal.
- **Pagamento direto/off-platform:** não será o fluxo padrão porque enfraquece monetização, histórico de ganhos, reconciliação, experiência integrada e anti-bypass.
- **Conta operacional + PIX manual:** rejeitado como default.
- **Adiantamento, garantia ou crédito com caixa da plataforma:** fora do piloto.

### 4. Provider Adapter obrigatório

Domínio não conhece payload específico de PSP. Cada integração implementa adapter responsável por:
- autenticar/verificar webhook;
- normalizar evento;
- fornecer `provider` e `provider_reference`;
- manter idempotência;
- rejeitar evento sem autenticidade comprovada.

O `SignedJsonPaymentProviderAdapter` atual continua sendo **simulador interno**. Seu payload com IDs internos não deve ser copiado para uma integração real de PSP.

### 5. Fronteira de referências externas

Um PSP real é fonte de verdade apenas para fatos/referências que pertencem ao próprio PSP. Ele não pode ser tratado como autoridade para `tenantId`, `assignmentId`, `professionalId` ou `recipientProfessionalId` internos.

A integração real deve seguir esta ordem:

1. autenticar o webhook/provider event;
2. extrair referência externa do PSP;
3. resolver essa referência por vínculo criado e controlado pelo backend para uma única instrução financeira interna;
4. somente então derivar tenant/assignment/profissional e entrar no contexto RLS correspondente;
5. normalizar/persistir o fato externo e reconciliar contra o ledger.

IDs internos enviados livremente no body externo devem ser ignorados/rejeitados como autoridade. Referência desconhecida, ambígua ou conflitante deve parar em rejeição/reconciliação, nunca em busca cross-tenant por tentativa.

Como `DatabaseService.tenant(...)` exige um tenant confiável antes de entrar no papel `app_runtime`, a resolução pré-RLS deverá usar um mecanismo mínimo e explicitamente revisado de provider-reference routing, com menor privilégio e testes adversariais. Detalhes: `PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md`.

### 6. Proveniência financeira

Todo fato financeiro externo deve registrar:
- `provider`;
- `provider_reference` quando existir;
- idempotency key;
- assignment/obrigação interna relacionada após resolução confiável;
- tipo de evento;
- valor;
- timestamp recebido.

Eventos são append-only para o runtime.

### 7. Fonte de verdade

- PSP é fonte de verdade para o fato externo de processamento/liquidação.
- ledger interno é fonte canônica de obrigação, decomposição e reconciliação do produto.
- divergência entre PSP e ledger cria estado de reconciliação/alerta; não deve ser silenciosamente sobrescrita.

### 8. Default/chargeback/refund

Não assumir que split elimina risco. O comportamento de saldo insuficiente, refund e chargeback deve ser explicitamente definido por provider/contrato antes de produção financeira.

### 9. Garantia/adiantamento/crédito

Continuam **PROIBIDOS como comportamento definitivo** até FIN-RISK ser CLOSED/APROVADO. Para o piloto inicial, estão explicitamente fora do escopo. Protótipos/simulações sem dinheiro real são permitidos.

## Critérios para fechar FIN-RISK

1. provider comercial elegível confirmado;
2. fees reais e unit economics;
3. PF/PJ/onboarding e compliance confirmados;
4. política de chargeback/refund/default aprovada;
5. decisão separada sobre qualquer guarantee/advance/credit — para o piloto inicial: **não existe**;
6. revisão contábil/tributária/jurídica brasileira;
7. sandbox E2E + webhook assinado + idempotência + reconciliação;
8. provider-reference resolution provada sem confiar em IDs internos vindos do webhook;
9. teste de payout duplicado/destinatário errado;
10. adversarial review;
11. Documento da Verdade e Requirements Ledger atualizados.

## Reabertura

Mudança material de provider, contrato, fees, responsabilidade por saldo negativo/chargeback, modelo de recebedor, antecipação, escrow, retenção financeira, modelo de referência externa ou regulação reabre FIN-RISK.
