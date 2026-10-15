# Conciliação simulada — totais inteiros exatos acima de int32

## Conciliação simulada — totais acima de int32 — 2026-10-15

Escopo exclusivo: MLIVRETRABALHO. Base auditada `4fad0b6e801b693b7346762a533e28cbebc03b41`, árvore `a5b4c3246a86de664da10f4965f8af181791e594`. #538/#539/#540 já integrados; #540 pós-CI38675578570/job116228294880 SUCCESS no merge real4fad...,127Web/750mobile/392API/3CLI/11monitor, todos passos/HTTPPostgres/ProductionTruth; ActivityWatch38675578567/job116228295404 SUCCESS com marker03:18:37.6982779Z. Não repetir esses merges.

PR #541 investiga/corrige a soma na leitura `GET /v1/company/payment-events/reconciliation`. Cada evento assinado já admite0..2147483647centavos, mas as três somas eram estreitadas por SQL `::int`. Reprodução primária no HEAD de teste1986f2fdb3efd0d8c7b5d9dd90ccd4d53279578b: CI38678006539/job116235903387 passou todos1283testes anteriores, typecheck/build/export/migrations/privacy e falhou no novo cenário HTTP. Logs03:50:10.5523177Z mostram curlHTTP500; Nest03:50:11.0790323Z e PostgreSQL03:50:10.550UTC registram `integer out of range`. Eventos assinados válidos e replays foram aceitos antes da leitura; a falha é o cast da soma, não validação de evento individual nem indisponibilidade de infraestrutura.

Correção: somente as três projeções SQL de soma passam para texto decimal exato e são convertidas explicitamente em inteiros JSON seguros. Valores inválidos ou acima de Number.MAX_SAFE_INTEGER geram erro, nunca arredondamento ou zero fabricado. Sem alterar valor individual permitido, eventos imutáveis, assinatura/idempotência, destinatário, filtros tenant/RLS, owner/admin, classificação SQL ou endpoint de listagem. Não mudar política de fees/split/refund/chargeback/saldo negativo: depende de FIN-RISK/provider real.

O E2E HTTP/PostgreSQL existente recebe seis eventos assinados válidos (dois por captured/refunded/payout_paid), replay factual de cada ACK e leitura das somas4294992294/4294967294/4294992294 como números exatos, payable25000/statusoverpaid e ausência em outro tenant. Nenhum gate anterior foi retirado. O novo trecho só admite URL HTTP local; executado apenas na base efêmera de CI. Oito testes unitários exercem handler real com mocks explícitos, limites0/MAX_SAFE_INTEGER/overflow/malformed, permissões e falha DB; local8/8 após transformação TypeScript/decorators para fixtures, sem alegar PostgreSQL local ou Nest/render real.

Evidência: `docs/evidencias/FINANCE_RECONCILIATION_WIDE_TOTALS_2026-10-15.md`. Próprios gates no novo HEAD e pós-merge ainda PENDENTES neste snapshot de preparação. APK N/A somente após revisão por identidade completa de mobile/native/deps/lock/workflow/build/smoke, não por ausência de run. Recibo final será registrado no corpoPR sem commit autorreferente extra.

Área6 recebe correção aritmética; áreas7/11 recebem regressões de isolamento/contrato. Não é aceite integral dessas áreas ou das13. Área10 mantém aceite técnico standalone; outras12 sem aceite integral. Externos215/219/220/224/228 permanecem OPEN separados, sem produção/custos/PSP/dinheiroreal/contratos/serviços novos. Próximo: validar CI/HTTP real, revisar bytes/modes/árvores e integrar sógreen, depois continuar matriz com lacuna factual independente.

### Fronteira e teste

- Contrato existente: evento individual inteiro0..2147483647; SUM PostgreSQL usa int8. A leitura antiga estreitava int8 para int4 e falhava com dois eventos máximos válidos.
- Correção restrita: três projeções passam para texto decimal, depois número JS somente se inteiro seguro; sem parser pg global. CASE de pending/reconciled/overpaid/no_earning e todos joins/filtros são preservados.
- Teste HTTP adiciona seis eventos simulados via callback HMAC local, repete cada um e exige totais exatos de captura/reembolso/payout e isolamento tenantB. Os cenários anteriores continuam antes da regressão.
- Teste unitário novo testa0, somas4,29bilhões, limite9007199254740991, overflow9007199254740992/993, texto inválido, lista vazia, duas linhas independentes, owner/admin, role negado, ausência de auth/tenant e erro DB. Resultado local8/8 usando handler transformado com dependências explícitas; isso não é Nest/SQL real local.
- Não alegar split/PSP sandbox/payout/reembolso real nem aceite integral da área6. Nenhum endpoint de empresa passa a criar fatos financeiros; somente o callback interno de fixture cria eventos de teste.
- Gate da base540: pós-CI38675578570 SUCCESS e Watch38675578567 SUCCESS; registro final no corpoPR540. Nenhum merge anterior repetido.
