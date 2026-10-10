# MLIVRETRABALHO — Documento da Verdade v1.71

**Status:** NORMATIVO — DELTA SOBRE v1.70
**Data:** 2026-10-10

## Contexto final de Segurança e revisão humana

Segurança Profissional verifica a identidade que originou trabalhos/relatos/pedidos após leituras e submissões, antes de aplicar sucesso ou limpar texto. GET profissional permanece multi-company; POST usa tenant real do trabalho/caso escolhido. Ao confirmar outra conta na atualização, limpa rascunho/seleções antigos; erro na mesma conta preserva texto. Casos da empresa verifica Authorization+tenant após GET e ACKs, mantendo foco/abort/geração/15s.

Schemas recusam IDs vazios/brancos, inclusive vínculo de caso/apelante; rotas de relato/pedido/status com IDs ausentes não iniciam POST. ACKs continuam apenas os campos efetivamente retornados pelo backend, sem tenant echo inventado. Erro/stale não vira lista vazia ou decisão confirmada. Nenhum POST repetido automaticamente.

Lidos integralmente SafetyCasesController, SafetyAdminController e SafetyAppealsController/Admin e helpers/testes atuais. Roles owner/admin, tenant/RLS, acesso do profissional/relator, idempotência da revisão, transições, notas/trilha, revisão humana e ausência de enforcement automático preservados. Relato continua não idempotente; resultado desconhecido exige conferência antes de nova ação humana. Sem alteração de política, penalidade, score/acesso/pagamento, desenho canônico, React19.1.4/RN0.81.6 ou lockfile. Nenhum relato, recurso ou decisão real executado.

## Evidência e limites

227/227 testes mobile locais aprovados em UTC e America/Sao_Paulo, zero falha/cancelamento/skip; seis regressões novas exercitam schemas/guard pré-transporte e composição dos helpers com troca de identidade/empresa após ACK válido. Duas telas, dois helpers e dois testes revisados. Fixtures e revisão estática não provam taps físicos; próprios type/build/HTTP/CI/APK e pós-merge continuam obrigatórios.

Visual Truth e gates externos seguem OPEN. Journal0829Z, memória, requisitos e checkpoint atualizados no mesmo commit; nenhuma conclusão integral antecipada.
