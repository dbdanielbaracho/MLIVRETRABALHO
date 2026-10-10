# Indicadores: dados reais e estados de rede — v1.51

**Verificação:** 2026-10-10. **Base:** #360 reconciliado d11bbeec3ec33bf6e20145f910ad0d31f57d31cb.

Fonte primária: apps/api/src/company-analytics.controller.ts e apps/mobile/app/analytics.tsx. UI anterior só carregava na montagem, fetch/JSON podiam rejeitar sem catch, sem limite/retry/foco/schema. Correção somente GET/schema e estados de UI, sem consultas/definições/backend/RLS/policy novas.

6 testes novos, 107/107 em UTC/São Paulo. Zero somente após resposta válida; null distinto de0%, taxa de confirmação200% preservada conforme universos do controlador; contagens/rates inválidas e HTTP403/rede/JSON não viram vazio; explicit retry pode recuperar. Foco/generation/abort15s revisados, unidade não comprova UI nativa. Novo CI/APK exato/merge/pós-merge pendentes, Visual Truth OPEN.

Fila e prova #350 atualizadas no checkpoint nesta alteração. #351–#360 código byte-idêntico às respectivas branches originais, documentos main/#361 preservados e ancestrais reconciliados; gates obrigatórios em novos SHAs. Nenhum custo, fornecedor de IA, dinheiro, mensagem real, política financeira ou enforcement habilitado.
