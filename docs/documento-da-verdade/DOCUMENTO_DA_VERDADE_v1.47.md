# MLIVRETRABALHO — Documento da Verdade v1.47

**Status:** NORMATIVO — DELTA SOBRE v1.46
**Data:** 2026-10-09 (verificação UTC 2026-10-10)

Preserva v1.46, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Talentos reais: leitura e remoção
GET company/talent-pools usa loading/erro/vazio/403/schema, foco/retry/15s e cancelamento/generation. Os três pools e nomes vêm da API; falha não equivale a Nenhum profissional. IDs/status/pools inválidos são erro. Nenhuma nova seleção/ranking/regra de preferência é criada.

Remoção permanece manual, bodyless DELETE no endpoint existente. Exige contexto tenant+identidade que originou a lista, item ainda exibido, guard síncrono e controles disabled. Ack removed true conforme contrato; falha/timeout não remove otimisticamente, faz releitura com signal próprio e não repete automaticamente DELETE. Backend/roles/RLS preservados.

## Provas e limites
Seis testes novos; 79/79 UTC/São Paulo: dados/vazio/403/rede/schema/retry, contexto, DELETE/encoding/ack e perda de resposta. Styles/rotas/dependências mantidos. CI/APK no head exato, revisão, merge/pós-merge e taps obrigatórios. Unidade/build não encerram Visual Truth.

## Fila e próxima ação
#356 head 5ddcb0d59c2bd13a49b5d4654efbcc02331699cf publicação: CI 38016256770/APK 38016256788 em execução. #351 CI/APK sucesso no head 5e8fffdfee0944b1e518d9b38ec556b65d62a6b9; #352 CI/APK sucesso no head 953bdcf9426d66b0e25bc054dbfa56b83dbf2f8e. #343/#349/#350 APK tentativa2 em execução no mesmo head após erro transitório do emulador, gates não dispensados.

Inspeção também encontrou estados fictícios de vazio/falha e ações sem guards em Substituições, Conversa e Segurança profissional. Próxima ação: integrar fila com gates exatos e diagnosticar Android; tratar essas divergências após leitura dos respectivos contratos, sem mudar políticas/decisões humanas. Visual Truth continua aberto até cobertura do desenho original e estados/dados/jornadas reais.

## Preparação #357 — 2026-10-10

Head original 449d25095c91fc63611ece504300448dd7192d50; predecessor reconciliado #356 6dd68681ec2739fbc5589fcbb68bcb4a57447510. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.
