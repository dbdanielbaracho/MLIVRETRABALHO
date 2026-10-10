# MLIVRETRABALHO — Documento da Verdade v1.38

**Status:** NORMATIVO — DELTA SOBRE v1.37  
**Data:** 2026-10-09

Preserva v1.37, continuidade v1.30 e referência original recuperada. Visual Truth Gate OPEN.

## Início: comparação com o desenho original
Figura 1 (docs/referencias/baseline-mobile-original.png) mostra próximo trabalho, oportunidades, Work Passport/reputação e ganhos semanais em card roxo. Main tinha próximo trabalho, contagens/ganhos brancos e disponibilidade; faltavam oportunidades/passaporte. A estrutura passa a próximo trabalho → oportunidades → passaporte → destaque de ganhos, mantendo disponibilidade contextual e barra fora da rolagem.

Oportunidades usam GET /jobs (primeiras duas na ordem real do backend, link Ver todas/Trabalhos); não são apresentadas como ranking de matching inexistente. Work Passport usa GET /work-passport/mine: trabalhos concluídos, média/count reais, zero/ausência só após resposta, sem nível Prata ou percentual de recontratação fictício. Erro/loading/vazio/ausência conhecidos distintos, retry e recarga no foco. Card de ganhos usa regra semanal já verificada, sem garantia/prazo financeiro.

Próximo trabalho exibe remuneração real payCents ou Valor a confirmar; campo validado, nunca presume zero. Data vem do calendário local atual; atalho de notificações abre rota existente. Marca, identidade roxa, navegação e APIs/contratos/backend mantidos. Sem fotos fictícias, novo matching/score, nível, percentual, dinheiro real ou custo.

## Prova e limites
Cinco testes novos dos cards/ausência/sucesso parcial/valores reais; **36/36 locais UTC/São Paulo**. Unidade não prova layout/renderização/navegação física. CI/APK próprios no head exato/pós-merge obrigatórios; encadeada após #347. Evidência MOBILE_HOME_CANONICAL_CARDS_v1.38.md. Fidelidade parcial implementada não fecha Visual Truth; capturas/jornadas/estados reais de ambas as partes continuam necessárias.

## Estado da continuidade
#342 integrado em main aee58e7776eee0dc211713edcbe29075f841ecb1 depois CI 38012515909/APK 38012515803 aprovados no head 516643aa07d5c80acd965c63788d5358a3eee703. Pós-merge CI 38014015303/APK 38014015274 em acompanhamento. #343 retargetado a main: árvore de merge prevista idêntica à árvore testada b4583e2d9aa1e6bb784c3345157f589a85ce99a8; APK ainda em execução. Não desativar continuidade por espera.
