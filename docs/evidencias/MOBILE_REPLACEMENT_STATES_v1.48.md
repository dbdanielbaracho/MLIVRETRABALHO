# Substituições — estados, score e confirmação v1.48

**Data:** 09/10/2026; UTC 10/10. **Base:** #357 449d25095c91fc63611ece504300448dd7192d50.

## Fontes/divergências
ReplacementController, CompanyDashboardController, allocation.ts, matching.ts e migration0011 lidos. Dashboard inclui checked_out, mas replaceable backend só confirmed/checked_in/in_progress. Auto-match é POST sem body que apenas calcula recomendação, score inteiro 0–100. Tela antiga multiplicava score por100 e dizia Nenhum substituto em qualquer erro HTTP; reads iniciavam falso vazio e ações não tinham catch/timeout/guard/contexto.

## Correção/diff
Reads independentes/partialsuccess/schema/foco/retry15s/blur/cancel; ações só após ambas prontas, status/backend e snapshot tenant+identity. Guards/disabled/ack e refresh com signal próprio. Auto-match bodyless real; empty somente400 no_replacement_available, todos outros erros distintos. UI score82→82%, sem mudar ranking. Select continua decisão humana explícita, backend/payload/policies/transações/RLS intactos. Erro não confirma nem repete POST automaticamente; reasons mantidos até blur.

## Validação/limites
87/87 UTC/São Paulo, oito novos testes: estados/schema/retry/contexto/checked_out/no_replacement_available/payload/ack/score82/perda de resposta sem retry. CI/APK exatos/revisão/pós-merge/taps pendentes. Desenho/styles/rotas/React/RN/lockfile preservados. Visual Truth OPEN. Nenhuma substituição real criada/selecionada; sem políticas novas/dinheiro/custos.

## Próxima ação
Acompanhar retries Android343/349/350 e integração exata; #356 CI sucesso, #357 gates em execução. Conversa e Segurança profissional têm divergências de rede/estado verificadas; reconsultar contratos antes de corrigir.
