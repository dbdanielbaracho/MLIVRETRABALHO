# FIN-RISK — decisão de escopo financeiro do piloto

**Data:** 2026-09-24  
**Status:** DECISÃO DE PRODUTO PARA O PILOTO  
**FIN-RISK:** permanece OPEN/BLOCKING

## Decisão

O piloto inicial do MLIVRETRABALHO **não terá**:

- garantia financeira assumida pela plataforma;
- adiantamento de pagamento ao profissional;
- crédito/empréstimo;
- cobertura de default pela plataforma;
- PIX manual por conta operacional como fluxo financeiro padrão.

Essas capacidades ficam **fora do escopo do piloto e desabilitadas**.

## Fluxo financeiro-alvo do piloto

Quando FIN-RISK fechar externamente, o fluxo pretendido é limitado a:

1. empresa realiza pagamento por PSP elegível/contratado;
2. provider gera fatos autenticados;
3. plataforma registra/reconcilia os fatos em ledger append-only;
4. payout é vinculado ao profissional correto do assignment;
5. fee da plataforma e regras de split dependem do contrato real do provider e da revisão contábil/tributária/jurídica.

O software atual já possui baseline provider-neutral para webhook assinado, anti-replay, idempotência, recipient integrity e reconciliação, mas isso **não habilita dinheiro real**.

## Motivo

Remover garantia/advance/credit do piloto:

- reduz complexidade regulatória e financeira;
- evita transformar a plataforma em financiadora antes de revisão especializada;
- preserva o princípio de solução simples com complexidade crítica no backend;
- permite validar o marketplace/workforce workflow sem assumir risco de crédito/default.

## Reabertura

Garantia, adiantamento ou crédito só podem voltar ao roadmap mediante decisão explícita futura com:

- caso econômico demonstrado;
- provider/estrutura elegível;
- unit economics;
- política de default/chargeback;
- revisão contábil/tributária/jurídica brasileira;
- ADR e Documento da Verdade atualizados.

## Efeito no gate

Esta decisão fecha apenas a pergunta interna sobre se guarantee/advance/credit fará parte do piloto: **não fará**.

FIN-RISK continua aberto para provider comercial, fees, onboarding/compliance PF/PJ, chargeback/refund/saldo negativo, sandbox real e revisões externas.
