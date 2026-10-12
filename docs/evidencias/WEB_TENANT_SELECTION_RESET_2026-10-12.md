# Web — troca de empresa e seleções dependentes

A rota empresarial retinha selectedJobId, selectedTeamId e selectedReplacementId após alterar tenantId. Assim, os efeitos de leitura podiam enviar os IDs da empresa anterior para a API com o novo tenant, causando leituras inválidas e estados visuais incoerentes. A API continua responsável por negar acesso entre tenants.

A troca agora limpa seleções e seus resultados vinculados ANTES de aplicar tenantId. O caso de seleção idêntica permanece inalterado. Testes de regressão em apps/web/app/tenant-switch.test.ts executam o próprio corpo do handler extraído da tela e verificam resets/ordem; **não substituem** React render, navegador, CI ou segurança RLS. A implementação não altera endpoints nem controles de autorização. Aceitar apenas com CI no head exato e validação posterior ao merge. Testes visuais físicos e gates externos continuam separados.

## Reprodução e validação factual — 2026-10-12

Handler original da base345419b077571e0ebfa3337ff24edfa522aea03c executado com sete estados de empresa A: após selecionar B, tenant mudou para B, mas IDs job-a/team-a/replacement-a e quatro listas continuaram A. No handler corrigido, os três IDs ficam vazios e as quatro listas vazias antes de publicar B. Setters determinísticos, sem browser/React render/DB/físico. Dois testes locais2/2 PASS.

CI inicial38262686638/job114856945168 SUCCESS no head d8a4edec7378147ca05f7652092ea9d991697f38. Documentos canônicos agora completados no mesmo PR: exigir novo CI no novo SHA. Nenhum resultado futuro é presumido. APK N/A requer identidade de árvore dos inputs protegidos. Histórico integral de cinco documentos preservado por apêndice. Recibo predecessor495: merge345419b..., own38238954175 e post38239314453 SUCCESS,1192testes e HTTPPostgres.
