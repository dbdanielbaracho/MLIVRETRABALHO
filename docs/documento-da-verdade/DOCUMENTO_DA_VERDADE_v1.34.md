# MLIVRETRABALHO — Documento da Verdade v1.34

**Status:** NORMATIVO — DELTA SOBRE v1.33  
**Data:** 2026-10-09

Preserva v1.33 e a continuidade v1.30. Visual Truth Gate **OPEN**. Dois achados concretos tratados no mesmo ciclo: Perfil exibindo estatísticas antes da resposta/ignorando erro HTTP e referência visual original ainda fora do repositório.

## Perfil e Work Passport
GET /professional-profile e /work-passport/mine mantêm identidade autenticada e agregação do backend, sem filtro tenant manual. Carregamento, erro, ausência de perfil e sucesso sem avaliações/histórico são distintos. Nenhum erro ou carregamento vira 0 trabalhos/avaliações. Só o 404 com mensagem professional_profile_required é ausência conhecida de Passport; demais falhas continuam erros. Retry e recarga no foco, timeout de 15s e guarda contra resposta antiga.

Edição permanece inline. Recarregar não apaga um rascunho alterado. Save exige nome, impede envios simultâneos, mantém campos em falha e confirma somente resposta HTTP/payload válidos. Saída mantém limpeza de sessão/tenant mesmo offline, agora com requisição limitada em tempo. Não altera backend, scores, contrato ou layout canônico. Sem novas dependências/lockfile.

## Referência original recuperada
`docs/referencias/baseline-mobile-original.png` é a imagem original de 1024×1536 extraída sem transformação do Documento da Verdade v1.2 DOCX de 20/09/2026, Figura 1/página 26. Fonte, hashes e escopo: `docs/referencias/BASELINE_MOBILE_ORIGINAL.md`.

A imagem orienta hierarquia, navegação e interação. Nomes/valores/distâncias/percentuais e textos ilustrativos não autorizam inventar dados, prometer pagamento garantido/em 2h ou afirmar suporte 24/7 sem implementação/gates/evidência. Auditoria visual precisa confrontar app real com referência e estados reais; imagem recuperada não fecha o gate.

## Evidência
Cinco testes novos de respostas de Perfil/Passport: **19/19 totais locais em UTC e America/Sao_Paulo**. Não provam taps, rascunho em UI, renderização ou E2E nativo. CI/APK sem Metro no head exato, revisão de diff e pós-merge permanecem obrigatórios. Evidência: MOBILE_PROFILE_STATES_v1.34.md. Branch encadeada após #343; somente integrar após dependências e gates próprios.
