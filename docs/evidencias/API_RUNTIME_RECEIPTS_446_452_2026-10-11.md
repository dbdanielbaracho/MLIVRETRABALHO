# Recibos finais de correções API #446–#452 — 2026-10-11

Fonte primária: PRs, commits, jobs e logs completos do próprio GitHub, reconsultados nesta rodada; base inicial #445 `b4b45e4482ea08e3e1706318b8757f238201fe0c`, CI pós38136903951 PASS4/713/216/3. Todas as sete correções foram integradas uma única vez, com CI própria e pós-merge SUCCESS em cada SHA exato, todos os steps SUCCESS. Total +67 testes API, 216→283, sem substituir testes existentes. Os snapshots anteriores de “aguardar” permanecem como histórico e são resolvidos por estes recibos posteriores, não por inferência.

| PR | Head aprovado | Merge main | CI própria / pós (PASS) | Testes API / novos |
|---|---|---|---|---|
| [#446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/446) Revisão de segurança | eebfcb74debcc6891c1345ffb688bb7f23e924ae | 3de10488b64a90139386fc2b6f5617744b35100c | [38137493375](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137493375) / [38137742579](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137742579) | 228 / +12 |
| [#447](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/447) Recursos de segurança | 88da0e014bbbc74cef13b860aa6fa60595564f73 | dc3b70d61153c6e8a1d14ca0f6678f4586667ffa | [38138158446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138158446) / [38138345123](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138345123) | 241 / +13 |
| [#448](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/448) Cancelamento | 2a128e6f450cb31508ac34a5f77bb7fdca28a4a7 | 3ee73c73229d1034324a858b65bd73bfd73d314e | [38138438300](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138438300) / [38138677504](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138677504) | 250 / +9 |
| [#449](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/449) Substituição | e4322dc8679a173e977bd28ba07e07789928939d | 334900b6903cc3137d50e90bbfc2e7b98306645c | [38138783719](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138783719) / [38139014848](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139014848) | 260 / +10 |
| [#450](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/450) Leitura de notificações | bdba5be156e7ceb95dcdb8e965641fb2f19ac263 | 4bf72d0a960b3e1b154997db8181575a5c5ec3c3 | [38139102667](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139102667) / [38139347035](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139347035) | 266 / +6 |
| [#451](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/451) UUID nas transições de trabalho | 2047bf849a3fbfa5a33f000669f53e48e0fa2923 | 6b7699b02c4f200356fcba5958de6eb937e983f9 | [38139500293](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139500293) / [38139768716](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139768716) | 275 / +9 |
| [#452](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/452) GPS opcional sem coerção | a6158e4c1bc2adf1b728cc4d97a49c2f99ee05bb | 8d5fc2d8af3cd945b33ac9a8e04414c3e85ac75b | [38140257625](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38140257625) / [38140584506](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38140584506) | 283 / +8 |

## #446 — Revisão de segurança

Head `eebfcb74debcc6891c1345ffb688bb7f23e924ae`; merge `3de10488b64a90139386fc2b6f5617744b35100c`; tree `16a7b201a1039e69c01c82472102cbf229471dbc` idêntica à candidata revisada; pais `b4b45e4482ea08e3e1706318b8757f238201fe0c`, `eebfcb74debcc6891c1345ffb688bb7f23e924ae`. Main conferida imediatamente depois de cada merge. CI própria run38137493375/job114464260065/attempt1 e pós run38137742579/job114464986458/attempt1 PASS. Ambos4web/713mobile/228API/3CLI, zero falhas, steps de lockfile frozen/typecheck/build/export/migrations/retention/HTTP/ProductionTruth completos. Regressões específicas verificadas nos dois logs.

Markers pós-merge (UTC, log primário):

- 2026-10-11T12:04:28.2210420Z PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool
- 2026-10-11T12:04:36.0796909Z PASS: safety admin malformed JSON and UUID reject before changing real cases or events
- 2026-10-11T12:04:36.6513560Z PASS: safety admin optional notes and four statuses retain real dates trusted actors and idempotent audit events
- 2026-10-11T12:04:42.7383500Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies
- 2026-10-11T12:04:50.2888233Z PASS: Production Truth Gate health/readiness contract

## #447 — Recursos de segurança

Head `88da0e014bbbc74cef13b860aa6fa60595564f73`; merge `dc3b70d61153c6e8a1d14ca0f6678f4586667ffa`; tree `e42ed66bb9d8664f81076320c487cb67f1451b24` idêntica à candidata revisada; pais `3de10488b64a90139386fc2b6f5617744b35100c`, `88da0e014bbbc74cef13b860aa6fa60595564f73`. Main conferida imediatamente depois de cada merge. CI própria run38138158446/job114466235501/attempt1 e pós run38138345123/job114466789634/attempt1 PASS. Ambos4web/713mobile/241API/3CLI, zero falhas, steps de lockfile frozen/typecheck/build/export/migrations/retention/HTTP/ProductionTruth completos. Regressões específicas verificadas nos dois logs.

Markers pós-merge (UTC, log primário):

- 2026-10-11T12:14:07.7271874Z PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool
- 2026-10-11T12:14:15.7590761Z PASS: safety admin malformed JSON and UUID reject before changing real cases or events
- 2026-10-11T12:14:16.3534065Z PASS: safety admin optional notes and four statuses retain real dates trusted actors and idempotent audit events
- 2026-10-11T12:14:22.5458140Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies
- 2026-10-11T12:14:23.4336301Z PASS: safety appeal malformed creation rejects before changing real tenant appeals
- 2026-10-11T12:14:23.9205096Z PASS: safety appeal malformed review and UUID reject before changing real appeals or audit events
- 2026-10-11T12:14:24.4494529Z PASS: safety appeal optional notes trusted actors original reasons and terminal idempotence retain real audit events
- 2026-10-11T12:14:31.1771887Z PASS: Production Truth Gate health/readiness contract

## #448 — Cancelamento

Head `2a128e6f450cb31508ac34a5f77bb7fdca28a4a7`; merge `3ee73c73229d1034324a858b65bd73bfd73d314e`; tree `03e5e2f71e6572514cd52efeb352bec4c3c5d6e4` idêntica à candidata revisada; pais `dc3b70d61153c6e8a1d14ca0f6678f4586667ffa`, `2a128e6f450cb31508ac34a5f77bb7fdca28a4a7`. Main conferida imediatamente depois de cada merge. CI própria run38138438300/job114467066599/attempt1 e pós run38138677504/job114467779616/attempt1 PASS. Ambos4web/713mobile/250API/3CLI, zero falhas, steps de lockfile frozen/typecheck/build/export/migrations/retention/HTTP/ProductionTruth completos. Regressões específicas verificadas nos dois logs.

Markers pós-merge (UTC, log primário):

- 2026-10-11T12:19:28.0750624Z PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool
- 2026-10-11T12:19:30.6832219Z PASS: cancellation malformed JSON reason UUID and unauthorized actor leave real assignments unchanged
- 2026-10-11T12:19:31.1328082Z PASS: professional and company cancellation retain real ACKs tenant scope and no financial compensation
- 2026-10-11T12:19:37.3052263Z PASS: safety admin malformed JSON and UUID reject before changing real cases or events
- 2026-10-11T12:19:37.9524159Z PASS: safety admin optional notes and four statuses retain real dates trusted actors and idempotent audit events
- 2026-10-11T12:19:44.7731761Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies
- 2026-10-11T12:19:45.7554183Z PASS: safety appeal malformed creation rejects before changing real tenant appeals
- 2026-10-11T12:19:46.2931627Z PASS: safety appeal malformed review and UUID reject before changing real appeals or audit events
- 2026-10-11T12:19:46.8638822Z PASS: safety appeal optional notes trusted actors original reasons and terminal idempotence retain real audit events
- 2026-10-11T12:19:54.3109717Z PASS: Production Truth Gate health/readiness contract

## #449 — Substituição

Head `e4322dc8679a173e977bd28ba07e07789928939d`; merge `334900b6903cc3137d50e90bbfc2e7b98306645c`; tree `7b000d4c9c71d55862ab9406c97c41cb85d6c9e1` idêntica à candidata revisada; pais `3ee73c73229d1034324a858b65bd73bfd73d314e`, `e4322dc8679a173e977bd28ba07e07789928939d`. Main conferida imediatamente depois de cada merge. CI própria run38138783719/job114468104555/attempt1 e pós run38139014848/job114468799720/attempt1 PASS. Ambos4web/713mobile/260API/3CLI, zero falhas, steps de lockfile frozen/typecheck/build/export/migrations/retention/HTTP/ProductionTruth completos. Regressões específicas verificadas nos dois logs.

Markers pós-merge (UTC, log primário):

- 2026-10-11T12:24:49.2279677Z PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool
- 2026-10-11T12:24:51.5974331Z PASS: cancellation malformed JSON reason UUID and unauthorized actor leave real assignments unchanged
- 2026-10-11T12:24:51.7925067Z PASS: replacement malformed creation rejects before changing real requests or assignments
- 2026-10-11T12:24:52.3878698Z PASS: replacement optional reasons and malformed selection UUIDs preserve real requests and assignments
- 2026-10-11T12:24:52.7343387Z PASS: professional and company cancellation retain real ACKs tenant scope and no financial compensation
- 2026-10-11T12:24:58.0395981Z PASS: safety admin malformed JSON and UUID reject before changing real cases or events
- 2026-10-11T12:24:58.6320349Z PASS: safety admin optional notes and four statuses retain real dates trusted actors and idempotent audit events
- 2026-10-11T12:25:04.6603735Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies
- 2026-10-11T12:25:05.4880370Z PASS: safety appeal malformed creation rejects before changing real tenant appeals
- 2026-10-11T12:25:06.2673483Z PASS: safety appeal malformed review and UUID reject before changing real appeals or audit events
- 2026-10-11T12:25:06.7467049Z PASS: safety appeal optional notes trusted actors original reasons and terminal idempotence retain real audit events
- 2026-10-11T12:25:13.4660115Z PASS: Production Truth Gate health/readiness contract

## #450 — Leitura de notificações

Head `bdba5be156e7ceb95dcdb8e965641fb2f19ac263`; merge `4bf72d0a960b3e1b154997db8181575a5c5ec3c3`; tree `b06728234e23f6a6b812efac33a4e3bfed09886c` idêntica à candidata revisada; pais `334900b6903cc3137d50e90bbfc2e7b98306645c`, `bdba5be156e7ceb95dcdb8e965641fb2f19ac263`. Main conferida imediatamente depois de cada merge. CI própria run38139102667/job114469064477/attempt1 e pós run38139347035/job114469793746/attempt1 PASS. Ambos4web/713mobile/266API/3CLI, zero falhas, steps de lockfile frozen/typecheck/build/export/migrations/retention/HTTP/ProductionTruth completos. Regressões específicas verificadas nos dois logs.

Markers pós-merge (UTC, log primário):

- 2026-10-11T12:29:55.6377966Z PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool
- 2026-10-11T12:29:56.8613187Z PASS: invalid notification IDs and cross-user or cross-tenant reads preserve real notifications and unread count
- 2026-10-11T12:29:56.9216695Z PASS: notification mark-read returns real idempotent timestamp and decrements unread exactly once
- 2026-10-11T12:29:57.8288660Z PASS: cancellation malformed JSON reason UUID and unauthorized actor leave real assignments unchanged
- 2026-10-11T12:29:57.9912031Z PASS: replacement malformed creation rejects before changing real requests or assignments
- 2026-10-11T12:29:58.4450768Z PASS: replacement optional reasons and malformed selection UUIDs preserve real requests and assignments
- 2026-10-11T12:29:58.7755378Z PASS: professional and company cancellation retain real ACKs tenant scope and no financial compensation
- 2026-10-11T12:30:03.7033963Z PASS: safety admin malformed JSON and UUID reject before changing real cases or events
- 2026-10-11T12:30:04.2117079Z PASS: safety admin optional notes and four statuses retain real dates trusted actors and idempotent audit events
- 2026-10-11T12:30:09.6139759Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies
- 2026-10-11T12:30:10.3905097Z PASS: safety appeal malformed creation rejects before changing real tenant appeals
- 2026-10-11T12:30:10.8375591Z PASS: safety appeal malformed review and UUID reject before changing real appeals or audit events
- 2026-10-11T12:30:11.3025841Z PASS: safety appeal optional notes trusted actors original reasons and terminal idempotence retain real audit events
- 2026-10-11T12:30:17.2603945Z PASS: Production Truth Gate health/readiness contract

## #451 — UUID nas transições de trabalho

Head `2047bf849a3fbfa5a33f000669f53e48e0fa2923`; merge `6b7699b02c4f200356fcba5958de6eb937e983f9`; tree `1fb88bf06a88d5acb6740575612b06ca4bf44fa8` idêntica à candidata revisada; pais `4bf72d0a960b3e1b154997db8181575a5c5ec3c3`, `2047bf849a3fbfa5a33f000669f53e48e0fa2923`. Main conferida imediatamente depois de cada merge. CI própria run38139500293/job114470246544/attempt1 e pós run38139768716/job114471036384/attempt1 PASS. Ambos4web/713mobile/275API/3CLI, zero falhas, steps de lockfile frozen/typecheck/build/export/migrations/retention/HTTP/ProductionTruth completos. Regressões específicas verificadas nos dois logs.

Markers pós-merge (UTC, log primário):

- 2026-10-11T12:36:41.1206692Z PASS: assignment malformed UUID and tenant or actor failures preserve real assignments and earnings
- 2026-10-11T12:36:41.4594844Z PASS: assignment lifecycle returns real timestamps without GPS and rejects replay without duplicate earnings
- 2026-10-11T12:36:41.6299322Z PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool
- 2026-10-11T12:36:43.0459371Z PASS: invalid notification IDs and cross-user or cross-tenant reads preserve real notifications and unread count
- 2026-10-11T12:36:43.1216318Z PASS: notification mark-read returns real idempotent timestamp and decrements unread exactly once
- 2026-10-11T12:36:44.1804302Z PASS: cancellation malformed JSON reason UUID and unauthorized actor leave real assignments unchanged
- 2026-10-11T12:36:44.3804289Z PASS: replacement malformed creation rejects before changing real requests or assignments
- 2026-10-11T12:36:44.9298603Z PASS: replacement optional reasons and malformed selection UUIDs preserve real requests and assignments
- 2026-10-11T12:36:45.3038555Z PASS: professional and company cancellation retain real ACKs tenant scope and no financial compensation
- 2026-10-11T12:36:51.0971002Z PASS: safety admin malformed JSON and UUID reject before changing real cases or events
- 2026-10-11T12:36:51.7171880Z PASS: safety admin optional notes and four statuses retain real dates trusted actors and idempotent audit events
- 2026-10-11T12:36:58.0392406Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies
- 2026-10-11T12:36:58.9231901Z PASS: safety appeal malformed creation rejects before changing real tenant appeals
- 2026-10-11T12:36:59.4204759Z PASS: safety appeal malformed review and UUID reject before changing real appeals or audit events
- 2026-10-11T12:36:59.9457373Z PASS: safety appeal optional notes trusted actors original reasons and terminal idempotence retain real audit events
- 2026-10-11T12:37:06.7032663Z PASS: Production Truth Gate health/readiness contract

## #452 — GPS opcional sem coerção

Head `a6158e4c1bc2adf1b728cc4d97a49c2f99ee05bb`; merge `8d5fc2d8af3cd945b33ac9a8e04414c3e85ac75b`; tree `00c029a3a2e49337b78c0e0a9a7247f784d94d79` idêntica à candidata revisada; pais `6b7699b02c4f200356fcba5958de6eb937e983f9`, `a6158e4c1bc2adf1b728cc4d97a49c2f99ee05bb`. Main conferida imediatamente depois de cada merge. CI própria run38140257625/job114472501945/attempt1 e pós run38140584506/job114473459916/attempt1 PASS. Ambos4web/713mobile/283API/3CLI, zero falhas, steps de lockfile frozen/typecheck/build/export/migrations/retention/HTTP/ProductionTruth completos. Regressões específicas verificadas nos dois logs.

Markers pós-merge (UTC, log primário):

- 2026-10-11T12:49:26.0936476Z PASS: assignment malformed UUID and tenant or actor failures preserve real assignments and earnings
- 2026-10-11T12:49:30.9713768Z PASS: malformed GPS JSON and non-numeric coordinates reject without invented coordinates or real assignment mutations
- 2026-10-11T12:49:31.2983356Z PASS: assignment lifecycle returns real timestamps without GPS and rejects replay without duplicate earnings
- 2026-10-11T12:49:31.3500602Z PASS: GPS remains optional while numerical zero and bounds retain real lifecycle ACKs without new earnings
- 2026-10-11T12:49:31.5205454Z PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool
- 2026-10-11T12:49:32.9246056Z PASS: invalid notification IDs and cross-user or cross-tenant reads preserve real notifications and unread count
- 2026-10-11T12:49:32.9921612Z PASS: notification mark-read returns real idempotent timestamp and decrements unread exactly once
- 2026-10-11T12:49:34.0234946Z PASS: cancellation malformed JSON reason UUID and unauthorized actor leave real assignments unchanged
- 2026-10-11T12:49:34.2202558Z PASS: replacement malformed creation rejects before changing real requests or assignments
- 2026-10-11T12:49:34.7306722Z PASS: replacement optional reasons and malformed selection UUIDs preserve real requests and assignments
- 2026-10-11T12:49:35.1012488Z PASS: professional and company cancellation retain real ACKs tenant scope and no financial compensation
- 2026-10-11T12:49:40.6659365Z PASS: safety admin malformed JSON and UUID reject before changing real cases or events
- 2026-10-11T12:49:41.2496701Z PASS: safety admin optional notes and four statuses retain real dates trusted actors and idempotent audit events
- 2026-10-11T12:49:47.3931119Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies
- 2026-10-11T12:49:48.2700159Z PASS: safety appeal malformed creation rejects before changing real tenant appeals
- 2026-10-11T12:49:48.7603777Z PASS: safety appeal malformed review and UUID reject before changing real appeals or audit events
- 2026-10-11T12:49:49.2830930Z PASS: safety appeal optional notes trusted actors original reasons and terminal idempotence retain real audit events
- 2026-10-11T12:49:56.0046965Z PASS: Production Truth Gate health/readiness contract

## Limites e incidente resolvido

#447 primeira CI38138064763/job114465949006 no head76a08b4e421ec5b8c91ec2c73b249a44f54d8e05 falhou TS2532 em teste novo: queries[0] possivelmente undefined. O log completo foi examinado, assert.ok(lock) adicionada antes de .sql; nenhum merge do head falho nem rerun cego. Novo head88da0e... CI38138158446 SUCCESS antes do único merge; histórico preservado.

APK próprio/pós destas sete PRs N/A por API/docs-only: mobile tree `4cb705aeb39244f46649bc5c569459ef9b0c5b7d` inalterada em todos os candidatos/merges, rootdeps/React19.1.4/RN0.81.6/lockfile/workflows/native/buildscripts intactos. Referência nativa #438 head27e96142ecde5efa10adb05ef436bb5a3f123865 (merge main): CI pós38133235768 e APK pós38133235730/job114451722593 SUCCESS com instalação/launch e DEVICE_SMOKE_OK metro_required=false no emulador. ZIP artifact11700537236, size28910958, digest sha256:de19b169e19ab8c59d27d30b462095220c44e167342d2b3a35602267206be510, expiração2026-10-25, revalidado11:53 UTC. Não atribuir APK de438 a446–452; digestZIP não digestAPK individual; emulador não aparelho físico. Gates externos Android físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSP/KYC/FIN-RISK/Webeventualpago OPEN. Sem PSP ativo, dinheiro, contratação, custo ou deploy pago. Não fechar projeto por ausência de PRs.

Main mais recente comprovada neste recibo: `8d5fc2d8af3cd945b33ac9a8e04414c3e85ac75b`, pós CI38140584506 PASS4/713/283/3. Próxima falha concreta independente: Copilot read/interpret JSON/text/mode; outro candidato independente posterior: Privacy manual requestType/details coercion. Revalidar fonte e cumprir gates; política legal/IA não alterada por inferência. DVT ORIGINAL v1.104 continua canônica e todo histórico preservado.
