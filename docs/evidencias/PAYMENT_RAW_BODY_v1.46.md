# Evidência — Payment Raw Body v1.46

Data: 2026-09-22

## Objetivo

Preparar a API NestJS/Fastify para validação correta de assinaturas de webhook de PSPs que exigem o payload HTTP original.

## Mudança

`apps/api/src/main.ts` passa a criar a aplicação Nest Fastify com `{ rawBody: true }`.

## Base técnica

A documentação oficial do NestJS informa que um dos usos comuns de raw body é a verificação de assinatura de webhook e, para Fastify, recomenda habilitar `rawBody: true` no `NestFactory.create`.

Fonte: https://docs.nestjs.com/faq/raw-body

## Limites

- esta mudança apenas preserva o payload original na request;
- o webhook baseline atual continua usando segredo compartilhado e timestamp;
- nenhum PSP específico foi selecionado;
- a futura implementação do adapter real deverá usar o raw body e o mecanismo oficial de assinatura do provider;
- FIN-RISK permanece OPEN.

## Gate

Integrar somente após typecheck/build/test/migration/Production Truth contract verdes na CI.
