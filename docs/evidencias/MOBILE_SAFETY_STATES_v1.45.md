# Relatos de segurança: leitura e ações guardadas — v1.45

**Data:** 09/10/2026. **Base:** #354 da169b62efdc52a4e72ccdb3d2d4b77ef491ae3f.

## Fontes/divergências
SafetyAdminController, SafetyAppealsAdminController, safetyAppealTransition e tela lidos. GET/POST owner/admin, RLS e audit trail existentes. Tela antiga confundia falha com ausência, não tinha catch/retry/foco/15s/guard. Nenhuma nova regra de transição humana é necessária para corrigir rede; transições existentes preservadas.

## Correção/revisão
Estados por seção/schema/foco/retry/timeout e epoch/cancelamento. Snapshot tenant+identidade antes de ações manuais, guard síncrono e controles disabled. Ack registro/status corretos, erro/unknown sem decisão local otimista; releitura independente. Payload de caso status e recurso status/note existentes preservados. Backend/policies/roles/RLS/penalidades/score/dinheiro/styles intactos.

## Provas/limites
6 testes novos; **69/69 UTC/São Paulo**: vazio/403/falha/schema/partial success/retry, contexto e ack/payload de caso/recurso. Não usa relatos reais nem aplica decisão a usuário real. CI/APK head exato/pós-merge/taps obrigatórios; Visual Truth/pentest separados.

## Entrega anterior comprovada
#342 main aee58e7776eee0dc211713edcbe29075f841ecb1 CI 38014015303/APK 38014015274 sucesso. Job 114100204846: DEVICE_SMOKE_OK efetivo 2026-10-10T01:58:45.898Z, pacote com.predibeacon.mlivretrabalho.pilot, metro_required=false. Artefato 11655825530, 28.815.323 bytes; SHA256 zip 2b1de7f5186e03e7c9293caa3558bcb5ae50634f37137a9f5f3e9034c361a5fd. Não confundir hash do zip com APK individual nem emulador com aparelho físico.

## Fila
#343 retry2 38014252773 mesmo SHA 4f39c2c92750c3a5c70bae21986d823a1eeff637 em execução; falha1 settings Broken pipe exit224 antes smoke. #354 CI 38015650955 aprovado/APK 38015650952 em andamento. Retarget/merge em sequência e pós-merge; próximos criação de trabalho e auditoria das demais jornadas/estados reais.
