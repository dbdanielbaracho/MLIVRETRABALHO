# MLIVRETRABALHO — Documento da Verdade v1.51

**Status:** NORMATIVO — DELTA SOBRE v1.50
**Data:** 2026-10-10

Preserva v1.50, baseline original e continuidade v1.30. **Visual Truth Gate OPEN**.

## Indicadores: fatos operacionais e falhas explícitas
GET /company/analytics existente permanece somente leitura, com tenant ativo obrigatório e backend como autoridade de membership/roles/RLS. A tela distingue loading, erro HTTP/rede/JSON/schema/403 e leitura válida. Retry manual e recarga no foco; timeout15s e geração/cancelamento no blur impedem restauração por resposta antiga. Nenhuma métrica fictícia antes de resposta válida; falha não equivale a operação vazia.

Contagens são inteiros não negativos retornados pela API. Taxa ausente null mostra Sem base suficiente, distinta de 0% real. Taxa de interesse→confirmação mantém definição backend jobsWithConfirmation/jobsWithInterest; pode exceder100 porque universos são distintos. Não impor teto/recalcular/normalizar esse fato na UI. Conclusão de assignments mantém definição completed/(completed+cancelled), entre0–100 ou null. Sem previsões ou novas fórmulas/financeiro.

## Provas e limites
CompanyAnalyticsController relido no predecessor #360. 6 novos testes; **107/107 locais UTC/São Paulo**: zeros comprovados/null/0%, taxa real200%, payload inválido, rede/403/JSON/retry e endpoint GET. Estados/foco/timeout/geração revisados estaticamente, não equivalem a taps/capturas/aparelho físico. Styles/rotas/backends/dependências/React19.1.4/RN0.81.6/lockfile preservados. CI/APK no novo head e pós-merge obrigatórios, ainda pendentes nesta preparação. MOBILE_ANALYTICS_STATES_v1.51.md e ledger no mesmo ciclo.

## Continuidade verificável
#350 main658e335cec144ba151645719b2b3fc0bf571f9c5: pós-merge CI38018391376/APK38018391418 sucesso. #351–#360 reconciliados preservando código e registros#361; SHAs/gates em CHECKPOINT_EXECUCAO_AUTONOMA.md, novos gates exigidos. Integração por merge commit e na ordem, com pós-merge. APK pós-merge#345 falha transitória input Broken pipe224, retry controlado em acompanhamento. Visual Truth/PSP/FIN-RISK/pentest/provider/custo não fechados por CI/unidade.
