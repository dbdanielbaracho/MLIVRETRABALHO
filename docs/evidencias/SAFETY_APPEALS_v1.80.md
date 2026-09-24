# Safety Appeals baseline — v1.80

**Data:** 2026-09-24
**Gate:** TRUST-ARCH permanece OPEN/BLOCKING

## Objetivo

Implementar o contraditório/recurso como fatia vertical provider-neutral e sem enforcement automático, reduzindo risco de decisão unilateral sem inventar política punitiva definitiva.

## Implementação

- migration `0033_safety_case_appeals.sql`;
- `safety_case_appeals` com um recurso idempotente por pessoa/caso;
- `safety_case_appeal_events` como trilha append-only;
- RLS + `FORCE ROW LEVEL SECURITY`;
- runtime limitado a `SELECT, INSERT`, sem `UPDATE/DELETE` nos fatos de recurso;
- profissional envolvido, reporter ou owner/admin pode registrar recurso dentro do tenant autorizado;
- owner/admin faz revisão humana;
- lifecycle explícito: `submitted → reviewing → upheld|modified|reversed`;
- decisões terminais não são reabertas silenciosamente;
- status repetido é idempotente;
- histórico registra ator, transição, nota opcional e timestamp;
- cross-tenant retorna 404 nas superfícies administrativas;
- nenhum status do recurso altera automaticamente score, Reliability, acesso, assignment, pagamento, suspensão ou deactivation.

## Testes

- unit tests de lifecycle em `safety-appeal-policy.test.ts`;
- HTTP E2E dedicado `scripts/http-safety-appeals-e2e.sh`;
- pipeline CI passa a exigir o E2E de appeals junto das demais jornadas quando runner estiver disponível.

O E2E prova:

1. empresa registra Safety case real associado a assignment;
2. profissional envolvido, mesmo não sendo reporter, consegue registrar contraditório;
3. duplicação não cria segundo recurso;
4. empresa correta vê o recurso e outra empresa não;
5. outra empresa não pode mudar status nem ler eventos;
6. revisão humana `submitted → reviewing → modified` cria exatamente dois fatos imutáveis;
7. repetição de `reviewing` não duplica evento;
8. tentativa de reabrir decisão terminal retorna conflito;
9. usuário vê a decisão atualizada no próprio histórico.

## O que esta fatia NÃO fecha

TRUST-ARCH continua OPEN para:

- provider real KYC/KYB e callback de sandbox;
- matriz definitiva de enforcement/reason codes;
- decisão final sobre assignments existentes durante restrições;
- retenção/deleção/evidence handling sob LGPD e obrigações legais;
- SLA operacional/jurídico definitivo;
- revisão jurídica brasileira;
- pentest/adversarial externo.

## Guardrail

A existência de relato ou recurso não constitui culpa. Nenhuma punição automática é habilitada por esta implementação.
