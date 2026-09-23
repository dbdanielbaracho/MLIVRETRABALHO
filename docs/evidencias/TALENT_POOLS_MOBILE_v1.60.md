# Talent Pools mobile v1.60

## Problema
A tela `Talentos` exigia que a empresa digitasse manualmente o UUID do profissional para adicioná-lo, apesar de o painel operacional já permitir adicionar um profissional conhecido aos preferidos a partir de um trabalho concluído.

## Correção
- removido campo técnico `ID do profissional` do mobile;
- tela `Talentos` passa a ser uma visão de gerenciamento dos pools existentes (`preferred`, `network`, `open`);
- nomes humanos são exibidos em vez de identificadores técnicos;
- remoção usa o endpoint tenant-scoped existente `DELETE /v1/company/talent-pools/:pool/:professionalId`;
- painel da empresa recebe atalho `Talentos`;
- inclusão em `preferred` continua disponível diretamente no contexto de um trabalho concluído, onde o profissional já é conhecido pela empresa.

## Segurança
Nenhuma autorização foi relaxada. O backend continua exigindo membership company/manager/admin/owner, `app_runtime`, RLS e `tenant_id` explícito.

## Teste
O backend de Talent Pools e sua isolação tenant já estão cobertos pela suíte/HTTP journey existente. Esta fatia deve passar typecheck, build e todos os E2E existentes antes do merge.
