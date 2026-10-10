# Disponibilidade — ack da janela real — v1.58

Snapshot 2026-10-10 06:51:59 UTC; base #368 head3d98b392d39b60028025d7fe58f270447b62938c; main8844a118caa19ea454dc713565db47827e58f853 (#364/v1.53). Contratos AvailabilityController/availabilityWindow/current screen/home APIs lidos.

Antes POSTHTTPok anunciava salva e limpava campos sem consumir JSON. Agora id+startsAt+endsAt exatos como instantes autorizam sucesso; timestampoffset equivalentes aceitos; outcome unknown em rede/JSON/5xx/malformed/ack de outra janela.400professional_profile_required apresenta razão real/link Perfil; demais rejeições preservam texto. Foco/cancel15s/epoch e Authorization antes/depois impedem resultado de outra sessão/blur. UnknownlinkInício confere GET já existente. Backend ONCONFLICT(professional_id,starts_at,ends_at) idempotente; tentativa manual permitida/sem repeat automático, nenhuma política nova/idempotência inventada. App mantém localdate/overnight validados pela lib anterior.

6 testes novos,152/152 locais UTC/SP: payload real,timezone equivalente, wrongID/horários,400profile/401/5xx,timeoutuma chamada/JSON e ranges antes de rede. Fixtures sóteste. Revisão estática UI não prova taps; CI/typecheck/build/HTTP/APK/pós-merge próprios pendentes. NenhumPOSTrealavailability pelo agente. Controller/RLS/profilepurpose/styles/nav/deps/workflows preservados; Visual Truth OPEN.

Auditoria bootstrap:56 TS/TSX mobile lidos no SHA#3648844a118caa19ea454dc713565db47827e58f853, nenhum consumidor atual além de definição; nenhum commit de dead code para produzir atividade. Próximo item funcional Perfil saveProfile: código exige schema Profile genérico mas não igualdade dos campos pedidos nem foco/Authretido; fonte PUTcontroller lida. Corrigir sem criar endpoint/alteraridentitypolicy.
