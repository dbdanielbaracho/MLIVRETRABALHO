# MLIVRETRABALHO — Documento da Verdade v1.48

**Status:** NORMATIVO — DELTA SOBRE v1.47
**Data:** 2026-10-09 (verificação UTC 2026-10-10)
Preserva v1.47, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Substituições reais e confirmação manual
GET assignments/replacements independentes com loading/erro/vazio/403/schema/foco/retry/15s/generation/cancelamento. Partial success mantém dados válidos; ações requerem as duas leituras prontas para não supor ausência de pedido existente. Confirmed/checked_in/in_progress permitem substituição conforme backend; checked_out não recebe ação válida.

Recomendação é solicitação explícita ao endpoint existente; somente HTTP400 com message no_replacement_available significa vazio. Falha HTTP, rede, payload inválido ou pedido incompatível são erro. ScoreMatch retorna score 0–100: UI agora exibe 82% para score 82, corrigindo multiplicação indevida que mostrava 8200%. Ranking/política não mudam.

Solicitar/confirmar continuam ações manuais guardadas, contexto tenant+identity da lista, controles disabled e ack do pedido/assignment/profissional/status solicitado. Não há seleção automática ou atualização otimista em erro; releitura usa signal próprio e POST não é repetido automaticamente. Reasons/payload/bodyless auto-match e backend/RLS/transações existentes preservados.

## Provas/limites
Oito testes novos; 87/87 UTC/São Paulo. Vazio/falha/partial/schema/403/retry/estados/contexto, payload/ack create/select, match real e no_replacement_available documentado, perda de resposta sem retry. CI/APK no head exato, revisão, merge/pós-merge e taps pendentes. React19.1.4/RN0.81.6/lockfile/styles mantidos.

## Fila
#357 head 449d25095c91fc63611ece504300448dd7192d50 Talentos: CI38016412800/APK38016412662 em execução; #356 CI38016256770 sucesso/APK38016256788 em andamento. #343/#349/#350 APK tentativa2 em acompanhamento, sem bypass. Próxima integração/gates/diagnóstico e correções de Conversa/Segurança profissional após contratos. Visual Truth/piloto/pentest/provider continuam separados.
