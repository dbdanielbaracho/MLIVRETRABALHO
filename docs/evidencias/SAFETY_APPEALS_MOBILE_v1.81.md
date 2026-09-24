# Safety Appeals mobile flow — v1.81

**Data:** 2026-09-24
**Gate:** TRUST-ARCH permanece OPEN/BLOCKING

## Objetivo

Fechar a lacuna de UX do contraditório: o profissional precisa conseguir ver um Safety case ligado ao próprio trabalho mesmo quando o relato foi criado pela empresa, e precisa conseguir solicitar revisão humana sem UUID/manual backend.

## Backend

`GET /v1/safety-cases/mine` passa a retornar:

- casos relatados pela própria identidade;
- casos associados a assignments em que a identidade é o profissional envolvido;
- `reportedByMe` para diferenciar as duas situações;
- sempre dentro de tenant autorizado e sob RLS.

Não há exposição de casos de outros profissionais.

## Mobile profissional

Tela `Segurança` agora:

- lista casos relacionados ao profissional;
- distingue relato criado pelo próprio usuário de caso relacionado ao seu trabalho;
- exibe recurso já enviado e status atual;
- permite `Solicitar revisão` com motivo humano;
- não exige UUID nem workspace técnico;
- informa explicitamente que recurso não altera score/acesso automaticamente.

## Mobile empresa

Tela `Relatos de segurança` agora:

- carrega recursos do tenant;
- permite iniciar revisão humana;
- permite registrar decisão `upheld`, `modified` ou `reversed`;
- cada transição segue a trilha append-only criada em v1.80;
- decisão terminal não habilita ação automática de score, suspensão, pagamento ou assignment.

## E2E reforçado

`scripts/http-safety-appeals-e2e.sh` agora prova adicionalmente que:

1. empresa cria Safety case ligado a assignment real;
2. profissional envolvido encontra esse caso via `/v1/safety-cases/mine`;
3. resposta marca `reportedByMe=false`;
4. profissional consegue abrir contraditório humano;
5. tenant isolation do fluxo de appeals continua preservado.

## Guardrail

Esta fatia melhora visibilidade e contraditório. Ela não define culpa, não ativa punição automática e não fecha TRUST-ARCH.
