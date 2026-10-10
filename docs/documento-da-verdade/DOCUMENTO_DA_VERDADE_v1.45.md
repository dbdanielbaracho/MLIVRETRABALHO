# MLIVRETRABALHO — Documento da Verdade v1.45

**Status:** NORMATIVO — DELTA SOBRE v1.44  
**Data:** 2026-10-09

Preserva v1.44, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Relatos/pedidos: estados e decisões humanas reais
GET company/safety-cases e company/safety-appeals são independentes, com loading/erro/vazio/403, schema, foco/retry/15s, cancelamento/generation. Falha de pedidos não aparece como Nenhum pedido nem apaga relatos válidos. Contexto tenant+identidade é preservado e verificado antes de ação; mudança exige refresh e não encaminha IDs antigos em outra empresa.

Alterações de status continuam manuais e owner/admin no backend. Guard síncrono impede toques repetidos e ações simultâneas desta tela; ack deve corresponder ao registro e status solicitado. Falha/timeout não produz decisão otimista, exige releitura com signal próprio. Campos/status/categorias/datas válidos preservam fatos existentes; enum inválido é erro, evitando labels falsas.

Case-status e notas de revisão dos recursos mantêm payloads existentes. Terminal/CTAs e safetyAppealTransition não são alterados; backend permite decisão humana nas transições registradas, sem inventar novo gate ou passo. Nenhuma suspensão/penalidade/score/acesso/pagamento automático é aplicado. Não há nova decisão feita pelo agente em dados reais.

## Provas e limites
Seis testes novos; 69/69 UTC/São Paulo. Dados reais/partial success/empty/403/schema/contexto e ack/payload/falhas. Styles, APIs, policies, roles, backend/RLS e dependências mantidos. CI/APK head exato/pós-merge/taps obrigatórios; Visual Truth e pentest não substituídos por unidade. Evidência MOBILE_SAFETY_STATES_v1.45.md; após #354.

## Fila e comprovação
#354 CI 38015650955 sucesso/APK 38015650952 em andamento. #343 APK 38014252773 tentativa2 em execução no head 4f39c2c92750c3a5c70bae21986d823a1eeff637 após falha transitória do action, não entregar merge por tentativa1. Main aee58e7776eee0dc211713edcbe29075f841ecb1 está pós-merge CI/APK aprovado. Artefato #342 11655825530, zip SHA256 2b1de7f5186e03e7c9293caa3558bcb5ae50634f37137a9f5f3e9034c361a5fd; DEVICE_SMOKE_OK efetivo 2026-10-10T01:58:45.898Z, sem Metro.

Próxima ação: integrar sequência com gates exatos e pós-merge; revalidar criação de trabalho e demais jornadas/contextos/estados contra referência aprovada. Não declarar conclusão por ausência de issue nem inventar tarefas.

## Preparação #355 — 2026-10-10

Head original 05e2c7e6cf4ea8ef1c7553e2f9928af3b6a25d71; predecessor reconciliado #354 92651205a78181e7440375c552b933033ba7d54b. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.
