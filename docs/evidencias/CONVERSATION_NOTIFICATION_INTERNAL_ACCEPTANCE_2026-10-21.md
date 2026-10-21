# Aceite técnico interno — Área9: conversa e notificações

Data da decisão: 21/10/2026. Repositório exclusivo: `dbdanielbaracho/MLIVRETRABALHO`.



---

## ACEITE TÉCNICO INTERNO — Área 9: conversa e notificações — 21/10/2026

**APROVADA tecnicamente em ambiente interno no SHA `a3368c840ab5202ebf9f2f3f6d69295769150622`.** O assistente emite a decisão sob a delegação expressa do usuário, reiterada nesta conversa: “todos os aceites é voce que tem que fazer”. Não há espera por aceite humano interno. O estado formal passa a ser: **áreas 2, 3, 9 e 10 aceitas; nove áreas pendentes**. As demais áreas conservam seus critérios e estado.

Este apêndice encerra o candidato do PR [#581](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/581), integrado em `a3368c840ab5202ebf9f2f3f6d69295769150622`, árvore `cb7ed386481870990a22c8fa4d17df76da2d15b0`. A decisão completa, o crosswalk e os recibos estão em [CONVERSATION_NOTIFICATION_INTERNAL_ACCEPTANCE_2026-10-21.md](../evidencias/CONVERSATION_NOTIFICATION_INTERNAL_ACCEPTANCE_2026-10-21.md) (caminho canônico: `docs/evidencias/CONVERSATION_NOTIFICATION_INTERNAL_ACCEPTANCE_2026-10-21.md`).

### Requisito → implementação → prova concluída

- Conversa autenticada: envio e leitura reais, vínculo à alocação e ao tenant, rejeição de entradas inválidas e limite Unicode, concorrência de primeira mensagem sem duplicar a conversa. Cada envio explícito é uma nova mensagem; não se declara deduplicação universal de POST nem exactly-once.
- Notificações internas: criação transacional de alerta junto à confirmação, mensagem ou substituição; leitura pelas caixas autorizadas de owner/manager/profissional; agregação de duas empresas e marcação como lida com timestamp idempotente e decremento único de unread-count.
- Não-entrega simulada: cinco falhas deliberadas de INSERT retornam HTTP 500 e revertem a operação inteira, inclusive quando o segundo destinatário falha após os dois alertas ficarem pendentes. Os snapshots do tenant alvo e de outra empresa permanecem iguais, os hooks são removidos e RLS, políticas e grants não mudam.
- ACK/duplicidade: confirmação repetida preserva uma alocação, membership e alerta; concorrência de confirmação e substituição mantém os invariantes; duas mensagens concorrentes correspondem a dois envios e dois alertas, em uma conversa. Replay da marcação de leitura conserva o timestamp.
- Auditoria de outbox/entrega: o contrato interno auditado usa INSERT de `notifications` na mesma transação PostgreSQL do negócio e posterior leitura autenticada da caixa; não usa um dispatcher/outbox de transporte externo. A auditoria registra essa arquitetura e sua fronteira: o ACK observado é de persistência/caixa interna, e não comprovante de push, e-mail ou entrega por provedor. Nenhum mecanismo externo recebe PASS por inferência.
- Cliente mobile: dezoito regressões dos handlers reais e helpers validam ownership do controller, prazo original de quinze segundos, ACK/reload, timers antigos, blur/foco e recuperação manual. Essas fixtures não equivalem a renderização RN física.

### Gates no candidato e no merge literal

HEAD candidato `d7d2eefac47192c344ca6818bc3fab5484842fb6`; merge sintético `fd4c8956b2eecfbe55dda17191b1504ada8fc69d`, mesma árvore candidata.

- [CI próprio 39602948825](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39602948825), job119231801108, attempt1: SUCCESS; 1.905 testes (217 Web, 1.168 mobile, 506 API, 3 CLI, 11 monitor), zero fail/skip/cancel; typecheck/build/export/migrações/privacidade/jornada HTTP/PostgreSQL, matriz browser12/12, canônico e Production Truth aprovados.
- [APK próprio 39602948797](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39602948797), job119231801149, attempt1: SUCCESS, instalação e DEVICE_SMOKE_OK sem Metro; ZIP e APK baixados e hashes conferidos no recibo.
- [CI pós-merge 39604852308](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39604852308), job119238306202, attempt1: SUCCESS com checkout literal `a3368c840ab5202ebf9f2f3f6d69295769150622`, mesmos 1.905 testes e gates completos. `NOTIFICATION_ATOMICITY_PASS` às13:08:04.0425210Z; read/replay/duas empresas às13:10:12.7163169Z..8271551Z; matriz0/canônicoPASS às13:10:11.2745506Z; Production TruthPASS às13:11:25.6511318Z.
- [APK pós-merge 39604852162](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39604852162), job119238304831, attempt1: SUCCESS, checkout literal do merge, DEVICE_SMOKE_OK às13:17:27.6238101Z sem Metro. Artefato12349315177: ZIP28.913.714 bytes/SHA256 `10d9d6488699b48299b01a4f99775f94b46b4b5f9ec23a95c7e7f7b5d4fa721c`; APK66.162.736 bytes/SHA256 `43c62622c671ae8f5030c8332d661fe934d04705e065fcde03c8860bbdf25799`. Bytes baixados e hashes recalculados; SUMS e BUILD_INFO literal conferem, release/pacote piloto/metro_required=false, bundle embarcado presente.

### Limites e próximo passo

O aceite é técnico/funcional interno da Área9. Push/provedor externo, transporte assíncrono/outbox externo, produção, aparelho físico, SecureStore nativo, renderização RN física, Visual Truth, pentest independente, PSP, contratos e dinheiro real não foram aprovados. A matriz original e todos os apêndices anteriores permanecem integralmente preservados. React19.1.4/RN0.81.6, lockfile, tenant/RLS, privacidade, autenticação e controles de navegador permanecem vigentes. A formalização é documental e exige CI próprio e pós-merge; APK N/A para a formalização por identidade dos insumos Android.

Próxima jornada interna prioritária: Área6, ledger/pagamentos simulados, reconciliando os PRs #573 e #584 com a main atual e exigindo seus gates próprios; manter split teórico, rollback, reembolso e saldo negativo separados de PSP real. O PR #560 pode ser encerrado como consolidado após confirmar os blobs transacionais idênticos aos integrados pelo #581; branch/história devem ser preservados.


## Manifesto das implementações e testes auditados

| Arquivo no merge a3368c84 | Git blob SHA |
|---|---|
| `apps/api/src/conversations.controller.ts` | `05f479c1ab3a2350c8bcd1fd32b1bdd574e62ec3` |
| `apps/api/src/notifications.controller.ts` | `dfe072e660b41060ff809eeefc489ae9aeb3981a` |
| `apps/api/src/database.service.ts` | `371c1615e95271f5484de3e8bca883481d4e845f` |
| `apps/api/src/company-jobs.controller.ts` | `e888c6a6db28bd3f48223f150a5895ffc6c26d9c` |
| `apps/api/src/replacement.controller.ts` | `809c27f1551c103adc9e6950f79555eb42d3b7db` |
| `packages/db/migrations/0014_notifications.sql` | `8bb8e6d981759e30c242bf59c1f6b9f02001bf8e` |
| `scripts/notification-atomicity-e2e.cjs` | `b4cea0d2e6c1a63f59affc16fe7618bca50a6691` |
| `scripts/http-notifications-multi-company-e2e.sh` | `10742df46fdf25448a802f979fdb25f75cdf7fdd` |
| `apps/mobile/lib/notifications.ts` | `3928db3607370a459eca506a1610671d6c655bee` |
| `apps/mobile/lib/conversation.ts` | `565a19b60e1c0a3aa244df92dbfb09dc9b27d718` |
| `apps/mobile/app/conversa.tsx` | `25e6191e1664ee0f98c96d026ff3aed96faa2798` |
| `apps/mobile/tests/conversation-controller-cleanup.test.mjs` | `9c3cdbf55372ec8387e5bfcadfb8d7dd2f175297` |

## APK próprio — recibo independente

Run39602948797/job119231801149: SUCCESS. Artefato12347671834 (expira04/11/2026), ZIP28.913.709 bytes/SHA256 `fafbf39a23e92fcfe3397b18fbbe5b3a5be815ff81308e0294683047df1b2f88`; APK66.162.736 bytes/SHA256 `b85d1c3efdf1236a8feacc99359a3f08a7da4e042c40b6ee9fe5a53c56bc58f6`. Download, hashes recalculados, SHA256SUMS e BUILD_INFO verificados antes do merge. BUILD_INFOcommit `fd4c8956b2eecfbe55dda17191b1504ada8fc69d`, build13:00:23Z, release, pacote `com.predibeacon.mlivretrabalho.pilot`, metro_required=false. Smoke13:01:59.1304242Z.

APK pós-merge: BUILD_INFOcommit `a3368c840ab5202ebf9f2f3f6d69295769150622`, build13:15:49Z, mesma variante/pacote/metrofalse. ZIP baixado nesta conferência coincide com tamanho e digest da API; hash do APK coincide com SHA256SUMS. ManifestSHA `ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480`; assets/index.android.bundle presente (1.896.992 bytes). Instalação e launch emulador não comprovam telas físicas.

## Primários do CI literal pós-merge

Os trechos abaixo vêm do job119238306202/run39604852308, checkout literal a3368c84. O log completo permanece na execução GitHub. As horas dos primários são UTC; as datas da decisão seguem Brasília.

```text
2026-10-21T13:07:54.2463030Z PASS: conversation malformed input rejects 400 without messages or notifications
2026-10-21T13:08:01.4878503Z PASS: concurrent company confirmations crossed PostgreSQL barrier, two exact ACKs, one assignment, one notification, tenant isolation
2026-10-21T13:08:01.7165914Z PASS: concurrent first messages crossed PostgreSQL barrier, two ACKs, one conversation, two messages and two notifications
2026-10-21T13:08:03.1922068Z PASS: chat accepts4000 database Unicode characters, rejects4001 with400, and preserves authority messages notifications and tenant isolation
2026-10-21T13:08:03.7284131Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"company-confirm","http":500,"targetedInsertAttempts":1,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-21T13:08:03.7502219Z NOTIFICATION_ATOMICITY_POSITIVE_PASS company-confirm real ACK, one assignment/membership/notification, exact replay
2026-10-21T13:08:03.7777444Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"chat-new-conversation","http":500,"targetedInsertAttempts":1,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-21T13:08:03.8154839Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"chat-existing-conversation","http":500,"targetedInsertAttempts":1,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-21T13:08:03.8197209Z NOTIFICATION_ATOMICITY_POSITIVE_PASS chat real message ACK/read, one conversation/message/notification, prior history retained
2026-10-21T13:08:03.9421591Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"chat-second-recipient","http":500,"targetedInsertAttempts":2,"bothPendingAlertsSeenBeforeFailure":true,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-21T13:08:03.9686860Z NOTIFICATION_ATOMICITY_POSITIVE_PASS chat-two-recipients one real message ACK, two persisted recipient alerts, both authorized inboxes
2026-10-21T13:08:04.0174855Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"replacement-select","http":500,"targetedInsertAttempts":1,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-21T13:08:04.0295673Z NOTIFICATION_ATOMICITY_POSITIVE_PASS replacement real matched ACK, original cancelled, new confirmed, request resolved, one notification
2026-10-21T13:08:04.0425210Z NOTIFICATION_ATOMICITY_PASS five injected HTTP500 rollbacks including second-recipient failure plus four positive phases; no delivery/provider/outbox claim
2026-10-21T13:10:11.2745113Z WEB_BROWSER_CURRENT_MAIN_CASE_RESULT PASS
2026-10-21T13:10:11.2745506Z WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=0
2026-10-21T13:10:12.7163169Z PASS: invalid notification IDs and cross-user or cross-tenant reads preserve real notifications and unread count
2026-10-21T13:10:12.7920969Z PASS: notification mark-read returns real idempotent timestamp and decrements unread exactly once
2026-10-21T13:10:12.8271551Z PASS: notifications aggregate across two company memberships and mark-read remains tenant scoped
2026-10-21T13:10:15.8516159Z PASS: concurrent replacement selection crossed PostgreSQL barrier, one matched ACK, one closed-request rejection, one substitute and notification
2026-10-21T13:11:25.6511318Z PASS: Production Truth Gate health/readiness contract
```

## Auditoria de fronteira: ACK, duplicidade e outbox

A migração0014 cria a caixa interna com tenant/identity/type/title/body/read_at/created_at e RLSforçado. NotificationsController oferece mine/unread-count e read, com identidade e membership verificadas, filtro simultâneo de tenant/identity e COALESCE(read_at,now()) no replay. ConversationsController insere mensagem e alertas na mesma chamada DatabaseService.tenant; o serviço só retorna depois de COMMIT, preserva a exceção original e executa ROLLBACK em falha. CompanyJobsController e ReplacementController seguem o mesmo limite transacional para os respectivos alertas. O AppModule auditado registra controllers e DatabaseService/AuthService; esses caminhos auditados não despacham push/e-mail por worker/outbox. Assim, a entrega comprovada é a disponibilidade autenticada na caixa interna após COMMIT; não existe evidência de transporte externo neste pacote.

A linha9 da matriz pede auditar outbox/ACK/duplicidade, entrega/não-entrega e isolamento com falhas simuladas, separando provedor externo quando aplicável. A presente decisão satisfaz essa auditoria para o contrato interno implementado, explicitando a ausência de dispatcher externo e sem converter sua ausência em garantia de entrega externa. Não se afirma exactly-once para uma repetição arbitrária de POST de mensagem; a UI conserva estado desconhecido e exige conferência manual, sem retry automático.

## Preservação e governança

Os seis normativos recebem apenas este novo capítulo, mantendo cada conteúdo corrente completo como prefixo. O presente recibo documenta um aceite comprovado, não um commit de atividade. Formalização: sete caminhos docs-only sobre a3368c84; nenhum insumo runtime, Android, dependência, lockfile, workflow ou smoke é alterado. CI próprio e pós-merge da formalização continuam obrigatórios; APK N/A por comparação integral dos blobs e modos fora dos sete caminhos. Nenhuma autorização externa foi presumida. Os demais nove aceites pendentes serão emitidos pelo assistente apenas mediante suas próprias evidências.
