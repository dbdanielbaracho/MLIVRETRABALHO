# Concorrência entre criação de substituição e cancelamento

Data: 2026-10-12

## Falha reproduzida

Na `main` `10fc12c47f515dc38cf3bd0a8985b53754bfc364`, a criação de um pedido de substituição lia o status do assignment sem lock. A fixture HTTP/Postgres local do CI bloqueou somente o `INSERT INTO replacement_requests`, permitiu que o cancelamento real concluísse e depois liberou a criação.

O run RED `38238401435`, job `114774652060`, passou typecheck, build, export, 63 testes Web, 731 Mobile, 383 API, 3 CLI, 10 do monitor, migrações e privacidade. A jornada HTTP falhou exatamente com:

- assignment final: `cancelled`;
- replacement request final observado: `open`;
- esperado pelo contrato terminal existente: `cancelled`;
- `AssertionError: a cancelled assignment cannot retain an open replacement request`.

Isso é prova primária de concorrência em API/PostgreSQL local do CI. Não é falha de emulador, infraestrutura, aparelho físico ou hipótese estática.

## Causa-raiz

- `ReplacementController.create` validava `confirmed|checked_in|in_progress` sem lock e gravava o pedido em uma instrução posterior.
- `CancellationController.cancel` também lia o assignment sem lock e não encerrava pedidos `open` associados.
- `ReplacementController.select` usava ordem `replacement request → assignment`; adicionar locks sem alinhar essa ordem criaria risco de deadlock.

## Correção

As três operações usam ordem única de serialização `assignment → replacement request`:

1. criação bloqueia o assignment com `FOR NO KEY UPDATE` antes de revalidar status e gravar/upsert do pedido;
2. seleção resolve o vínculo, bloqueia o assignment e somente então bloqueia/revalida o pedido `open`;
3. cancelamento bloqueia o assignment antes das escritas e, após cancelar com sucesso, muda qualquer pedido `open` daquele assignment para `cancelled`, preenchendo `resolved_at`.

O cancelamento não cria retry, pagamento, compensação ou culpa. Seu ACK permanece `id/status/initiatorKind/compensationPolicy`. Os contratos de autenticação, papéis, tenant/RLS, candidato, disponibilidade, matching, notificação e finanças permanecem iguais.

## Regressões

- A barreira HTTP/Postgres exige que criação e cancelamento sobrepostos terminem com um registro de cancelamento, assignment `cancelled` e pedido `cancelled` com `resolved_at`.
- O teste concorrente de duas seleções foi preservado e ampliado para reconhecer a nova espera no lock do assignment.
- Dois testes de controller verificam a ordem dos locks e o encerramento restrito a `status='open'`.
- Nenhum assert anterior foi removido.

## Gates

O commit de correção deve passar CI próprio completo no SHA exato e pós-CI no merge SHA real. APK é N/A somente após prova por árvore de que Android/native/dependências/lock/workflows/build/smoke não mudaram. Esta evidência não representa aparelho físico, Visual Truth, pentest, PSP/KYC ou produção.
