# MLIVRETRABALHO — Documento da Verdade v1.49

**Status:** NORMATIVO — DELTA SOBRE v1.48
**Data:** 2026-10-09 (UTC 2026-10-10)
Preserva v1.48, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Conversa: dados/estados/envio reais
Conversa usa assignmentId e tenantId explícitos da rota do trabalho. Valores ausentes/arrays ambíguos não são convertidos em IDs nem enviados. Tenant do trabalho é preservado, sem trocar pelo tenant ativo genérico; backend continua autoridade de acesso ao assignment e membership/RLS.

GET messages tem loading/erro/vazio/403/404/schema/foco/retry15s/geração/cancelblur. Falha não significa conversa vazia; mensagens reais são roláveis. Leitura pronta fornece contexto e identidade para envio. POST manual guardado/15s e inputs disabled enquanto envia; não há polling/mensagens automáticas nem envio real feito pelo agente.

Formulário só é limpo após ack real ID/body/data. Backend send não retorna senderIdentityId, portanto esse campo não é inventado como gate de ack; GET continua validando-o. 4xx preserva texto, unknown orienta conferir mensagens antes de reenviar. Sem retry automático do POST não idempotente que gera mensagem e notificações. Mudança de rota/sessão impede reutilizar leitura/IDs antigos; refresh usa novo signal.

## Provas/limites
Seis testes novos; 93/93 UTC/São Paulo. Rota/encoding, mensagens/vazio/403/404/schema/retry/sessão/payload/ack/rede sem duplicar. ConversasController relido no SHA #358. Backend/policies/roles/RLS/styles/dependências preservados, conteúdo rolável adicionado. CI/APK head exato/revisão/pós-merge/taps pendentes. Visual Truth/piloto/pentest não substituídos por unidade.

## Fila
#358 head 8e580893cf18ef31ef2f6aaa1ac168497fab46aa: CI38016571399/APK38016571422 em execução; #357CI38016412800 sucesso/APK38016412662 em execução. #356CI38016256770 sucesso/APK38016256788 em execução. #343 retry2 compilou e está no device smoke sem Metro, gate em execução não autoriza merge. Próxima integração/diagnóstico Android e Segurança profissional após reconsultar contratos.

## Preparação #359 — 2026-10-10

Head original d4567c39e4c113870382fbfcc9d2bc1bff71dcb7; predecessor reconciliado #358 8523aed8d98a596a22ee2d5d762f8d05afcfa2a5. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.
