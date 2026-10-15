# Notificações — atomicidade transacional por falha SQL real — 2026-10-15

## Escopo e fontes

Base dd715c6573bcc6d6e5e3c749cc634e276db83ef0. Fontes: apps/api/src/database.service.ts, company-jobs.controller.ts, conversations.controller.ts, replacement.controller.ts, notifications.controller.ts;73migrações completas; scripts/http-notifications-multi-company-e2e.sh e HTTP journey. Não se altera aplicação para corrigir falha não demonstrada. Esta é uma lacuna de cobertura da área9, não prova de falha em produção.

## Desenho verificável

| Fluxo | Falha deliberada e testemunho | Fatos que precisam ficar iguais | Controle positivo separado |
|---|---|---|---|
| Confirmação | AFTER INSERT assignment_confirmed; sequence=1 | assignment, membership ausente, interesse interested, notificações |201 ACK real, confirmed, membership criada, um alerta, replay exato sem nova escrita |
| Chat novo | AFTER INSERT new_message; sequence=1 | nenhuma conversa/mensagem/alerta adicional |201 mensagem, conversa única, leitura pelo destinatário, um alerta |
| Chat existente | AFTER INSERT new_message; sequence=1 | conversa/mensagem/histórico/alertas anteriores integrais | leitura do histórico positivo anterior preservada |
| Substituição | AFTER INSERT replacement_confirmed; sequence=1 | original confirmed, request open, nenhuma nova assignment/alerta |201 matched, original cancelled, nova confirmed, request resolvido, um alerta visível |

O hook é específico de UUID tenant+recipient+tipo, com runtime app_runtime/contexto verificados. O contador não transacional distingue o erro de fixture de500 genérico anterior. Só quatro chamadas são injetadas; não há retry automático. Cleanup remove apenas trigger/function/sequence próprios e verifica ausência. Não é migração, trigger permanente, permissão relaxada, provider/outbox/push ou entrega.

Referências primárias consultadas em2026-10-15: https://www.postgresql.org/docs/17/functions-sequence.html (nextval não é desfeito por rollback), https://www.postgresql.org/docs/17/sql-createtrigger.html (AFTER INSERT/trigger), https://www.postgresql.org/docs/17/sql-createfunction.html (SECURITY DEFINER/search_path/privileges). A função só toca sua sequência e levanta erro; nenhum grant existente muda.

## Resultado local e gates

4/4 testes de guardas/DDL reais PASS em Node24.19.0; node--check PASS. Sem pg/psql/adb/Chrome local nesta execução. PostgreSQL real/HTTP/CI/typecheck/merge/pós AINDA PENDENTES antes da publicação. Nenhum novo defeito de app alegado; confirmar comportamento existente é resultado válido de cobertura. Evidência posterior pertence ao run/job/SHA medidos, não à previsão de contagens. Android APK não exigido se identidade integral dos insumos/grafo for comprovada; não reutilizar APK antigo.


---

## Prova de atomicidade das notificações — preparação funcional — 2026-10-15

Escopo exclusivo MLIVRETRABALHO, área9 (e controles transacionais das áreas5/7/11). Base viva `dd715c6573bcc6d6e5e3c749cc634e276db83ef0`, árvore `90aec6eeb7e3e0cd8ee853e156c5fd5f9831d1b1`; pais ordenados `d0754b848e5bb780d3f3707001b8c49b802fd0f5`, `078ebbc8977c61055100184ff91a0261f36a0d3e`. README, DVT v1.104 original e histórico, memória, checkpoint, ledger, registry e matriz recuperados em referências imutáveis. Todas73 migrações consultadas; notificações definidas em0014, sem outra migração que mude essa tabela. A documentação completa anterior permanece prefixo literal, não é substituída por resumo.

### Lacuna concreta e teste novo, sem correção especulativa

Os testes HTTP existentes cobrem isolamento, agregação, UUID, leitura/ACK idempotente e contador; não injetavam falha SQL no INSERT de notificação para provar rollback de todos os efeitos de confirmação/chat/substituição. Os três controllers usam `DatabaseService.tenant` com BEGIN/SET LOCAL ROLE app_runtime/contexto/COMMIT/catchROLLBACK. Isso é leitura de código, não prova comportamental nem entrega externa.

Novo `scripts/notification-atomicity-e2e.cjs`, chamado antes do gate de navegador no HTTP journey existente (nenhuma assertion antiga removida): quatro chamadas HTTP de falha deliberada, com hook AFTER INSERT restrito ao tenant/identidade/tipo de fixtures reais. Sequência exclusiva testemunha uma tentativa de INSERT mesmo após rollback; função de fixture SECURITY DEFINER só avança essa sequência e lança erro, com search_path fixo/EXECUTE público revogado. Não concede privilégios nem altera políticas/grants existentes. Criação/remoção transacional de nomes próprios aleatórios, sem OR REPLACE/CASCADE, sem migração de produto ou DDL em produção. Não existe instalação em Neon/Railway.

Guarda CI + origem HTTP localhost com porta explícita + DSN PostgreSQL localhost com porta explícita e banco exato mlivretrabalho_http; recusa overrides/query/fragment/host externo. Conferência do nome real do banco e de IDs criados via HTTP no mesmo PostgreSQL antes do hook. IP interno do contêiner pode diferir do endpoint loopback; não se falsifica esse fato. Controle real app_runtime/tenant lê próprio job e não lê job do segundo tenant.

Casos: (1) confirmar profissional ainda sem membership: assignment/membership/interesse/notificação devem ficar integralmente iguais após500; depois controle positivo com ACK e replay contratual sem duplicação; (2) primeira mensagem: criação de conversa/mensagem/notificação deve ser revertida; controle positivo de mensagem/ACK/leitura reais; (3) mensagem em conversa existente: preserva histórico anterior por rollback de UPSERT/mensagem/notificação; (4) selecionar substituto elegível com identidade/membership/talent pool/disponibilidade reais: status original/request/newassignment/notificação inalterados após500, depois seleção positiva única com matched/cancelled/confirmed/notification reais. Snapshots integrais apenas dos dois tenants de fixture, incluindo marketplace_interests; metadados RLS/policies/grants/role devem ficar iguais após limpeza. Sequência prova chegada ao hook em app_runtime/contexto, não basta observar um500 genérico. Positivos são fases deliberadas de teste após remoção da injeção, não política de retry de negócio.

Estado desta preparação: quatro testes locais das funções REAIS de guardas/DDL PASS, node --check PASS; não é PostgreSQL, HTTP, typecheck, navegador ou aceite. CI próprio do novo HEAD, revisão final, merge e pós-gates AINDA PENDENTES. Não declarar falha nova da aplicação: se os testes passarem no código existente, o resultado é prova de cobertura, não patch de defeito imaginado. Evidência detalhada: `docs/evidencias/NOTIFICATION_TRANSACTION_ATOMICITY_2026-10-15.md`.

### Consolidação factual independente — PR558 continua DRAFT/FAIL

Reconsulta viva: #555/#556 já integrados; main pós556 CI38753142047/job116484484990 continua FAILURE no navegador, não PASS. Não repetir merge/rerun. #558 segue DRAFT/NÃO MERGED no HEAD48a123aa5abac436c9ed26d148b725e30db79f74/tree d577b8c55e24239253f034768018a85b1ce7444f. OwnCI38792613152/job116620750043 attempt1 FAILURE, sem retry.1328unit=[151Web,753mobile,410API,3CLI,11monitor] PASS/fail-skip-cancel0, typecheck/build/export/migrations/privacy PASS; etapa HTTP/browser FAIL, ProductionTruth posterior não executado/PostSetupNode skipped. Checkout9e6fb40254ebb076adbe2c7faefa5761e399a81c SINTÉTICO pais[dd715...,48a...] árvore equivalente, não HEAD literal. Recibo final completo reconsultado no corpoPR558 e logs primários; não emprestar verdes de heads anteriores.

Mínimo válido48a: documento HTTP200 real de127.0.0.1, sem cache/SW/scripts, secureContexttrue. Controles minimal/log-only e native-only PASS27 respostas JSON (26GET200+1teamPOST201) com persistência API/PG; minimal/instrumented primeiro GET200 e depois12GET paralelos ERR_ABORTED/canceledtrue/TypeErrorFailedtofetch, nenhum GET dessa onda chegou àAPI após OPTIONS204. React/NextAPPscripts NÃO são necessários para essa reprodução DIAGNÓSTICA; CDPguard/observer/Log ainda presentes, raiz EXATA NÃO comprovada. Não é prova de falha comum sem instrumentação/bug de fornecedor/CORS/API/produção. Política LNA PermissionBlock é campo de política, não erro de permissão; controles48a não exibem LocalNetworkAccessPermissionDenied. Fixture sintética anterior bc3 com LNAdenied/canceledfalse era redução inválida; nenhum grant/bypass foi feito. Baseline mínimo48a falhou startup15s, não transporte. Jornadas baseline/instrumented PASS9checks+5refreshwaves(12GET200novos/click/semPOSTextra)+5hardreloads(timeOriginnovo/readycomplete); log-only falhou após teamPOST201, native-only após segunda recarga. Agregado8casos=4PASS/4FAIL, exit1 sticky. Todos7 browsers que iniciaram Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34, um startup sem versão. Sem causa inferida por upgrade de imagem:20261012.334.1 também em falhas/sucessos anteriores. Sem patch de API/CORS/React/security/assert/deadline.

12PNGs próprios48a foram verificados naquele ciclo (assinatura/bytes/SHA/dimensões1365x900); logs38792613152/job116620750043 preservam WEB_BROWSER_CAPTURE. BaselineA e5c2374826d9944cf8a86df5a0e94af8d7ba3746a36606ea76c7abf9b2644fd0/132205bytes; B e6287ca5441c85c466014cdf7e1b2807e7b1b889276680284307606ae4c88c5c/132545; mínimo falho050b6043a08877784addeaf706f0304c956e63007ba673516b4119d3e8bcfdc2/9116. Não atribuir a outro SHA nem a esta prova API. Assets antigos556/aab/690/bc3 são distintos. Nenhum merge/post558 existe. Bloqueio parcial do navegador não impede esta frente transacional independente.

### Limites de aceite e continuidade

Só área10 tem aceite TÉCNICO INTERNO Android standalone; outras12 SEM aceite integral. Esta prova SQL/HTTP não prova entrega, outbox, provider, push nativo, render, SecureStore, Android físico, VisualTruth ou piloto e não inventa políticas. React19.1.4/RN0.81.6/frozenlock/mobile/native/build/smoke/RLS/contratos/API/UI intactos; APK N/A depende revisão INTEGRAL dos insumos e grafo canônico, não[]/APK emprestado. Último APK efetivamente validado542 pertence63340145d7688ac08f161be8db418d789e81ec89, não a este teste.

Monitor cron38786296228/job116599024825 SUCCESS, marker18:31:20.3326834Z main dd715... age233/openPR1/active0 criou559; ausência de commit não prova agente parado, nenhum alerta foi alterado manualmente e nenhum commit é feito só por atividade. Externos215/219/220/224/228 continuam OPEN separados, sem produção/serviços novos/credenciais/custos/contratos/PSP/dinheiro real. Rotina existente horária preservada, não agente24x7. Recibos finais novos só após observados nos SHAs exatos; snapshots PENDENTES são histórico da preparação.
