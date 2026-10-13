# Evidência — concorrência em pedidos de verificação — 2026-10-13

## Falha

O fluxo fazia SELECT e depois INSERT. Os índices únicos de `verification_cases` protegiam a tabela, porém duas requisições iniciais simultâneas podiam ler ausência; a primeira inseria e a segunda terminava com conflito de unicidade em vez de receber o mesmo caso pendente.

## Reprodução

- Base: `d497517b3425b95305eac6f2bd6643bd161565b9`.
- Head RED válido: `b30c4c8e06bea4ba5e6db81e376e7785c9423369`.
- CI: `38392760549`, job `115280347562`.
- Typecheck, build e export Android: PASS.
- API: 387 testes; 386 PASS; uma falha nova em `concurrent verification requests return the same pending case for identity and business`.
- As execuções `38392363293` e `38392579195` pararam em sintaxe do fixture e foram descartadas.

## Correção

O pedido inicial agora faz UPSERT atômico contra o índice parcial correto:

- identidade: `(tenant_id, identity_id) WHERE subject_type='identity'`;
- empresa: `(tenant_id) WHERE subject_type='business'`.

Em conflito, o estado factual da linha existente é devolvido sem promover aprovação, preencher provider ou alterar regras de retry. Uma ausência impossível de ACK gera erro explícito.

## E2E preparado

O teste HTTP/PostgreSQL local e descartável:

1. usa atores já criados pela jornada;
2. segura `verification_cases` com lock SHARE;
3. sobrepõe duas requisições reais em cada INSERT;
4. exige dois HTTP 201, mesmo ID, status pending e uma linha por sujeito;
5. executa para identidade e empresa.

Isto não representa fornecedor KYC, sandbox externo, produção ou aceite regulatório.

## Escopo e gates

Arquivos funcionais: controller, regressão API, fixture E2E e chamada na jornada. Os cinco documentos originais recebem apêndice integral. Insumos mobile/Android/dependências/lock/build/standalone permanecem idênticos. CI próprio, revisão final, merge e pós-CI ainda são pendentes neste snapshot.
