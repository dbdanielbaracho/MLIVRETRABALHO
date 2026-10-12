# Web — troca de empresa e seleções dependentes

A rota empresarial retinha selectedJobId, selectedTeamId e selectedReplacementId após alterar tenantId. Assim, os efeitos de leitura podiam enviar os IDs da empresa anterior para a API com o novo tenant, causando leituras inválidas e estados visuais incoerentes. A API continua responsável por negar acesso entre tenants.

A troca agora limpa seleções e seus resultados vinculados ANTES de aplicar tenantId. O caso de seleção idêntica permanece inalterado. Testes de regressão em apps/web/app/tenant-switch.test.ts executam o próprio corpo do handler extraído da tela e verificam resets/ordem; **não substituem** React render, navegador, CI ou segurança RLS. A implementação não altera endpoints nem controles de autorização. Aceitar apenas com CI no head exato e validação posterior ao merge. Testes visuais físicos e gates externos continuam separados.
