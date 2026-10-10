# Privacidade: leitura real dos pedidos — v1.53

**Data:** 2026-10-10. **Base:** main177f15c92323b9bf807a6cbee1c802f5953ac907. Fontes: PrivacyController GET requests, privacy-requests-ops.ts, DSAR_RUNBOOK_v1.13, PRIVACY_NOTICE_BASELINE_v1.13, TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13 e app atual.

Correção apenas GET /privacy/requests: loading/erro/vazio comprovado, payload/types/status/dates validados, identidade via authHeaders existente, foco/retry/15s/geração/cancelamento. Não apresenta Nenhum pedido em falha/loading. Nenhuma exportação automática: GET /privacy/export registra pedido access e está fora desta leitura. Create/export/deactivate byte-idênticos; backend/alerta/desativação/hold/retention/RLS/styles intactos. Nenhum pedido/cópia/desativação real executado pelo agente.

4 novos testes;117/117 UTC/São Paulo. Fatos/status/tipo/datas reais, vazio somente confirmado, HTTP/JSON/rede como falha e somente endpoint requests, sem GET export/POST. Guarda UI/foco/timeout revisada estaticamente, não comprova taps/aceite físico. CI/APK no head próprio e pós-merge pendentes. Visual Truth OPEN. Operações de Privacidade continuam como lacuna concreta separada para próximo ciclo com os mesmos contratos e controles humanos.
