# Web — validação da resposta de login

A tela empresarial fazia `await r.json() as Session` e chamava `.memberships.filter` sem validação. Respostas HTTP OK malformadas (JSON null, objeto sem memberships, membros nulos) podiam causar erro de execução ou guardar sessão inconsistente. Correção: `validateSigninCompanySession` valida a resposta, seleciona exclusivamente empresas e reusa `readStoredCompanySession` para identidade/token/tenants distintos. Sessão inválida não é guardada. Nenhuma autoridade extra é concedida: a API continua determinando acesso.

Testes em `stored-session.test.ts` exercitam malformações e memberships mistos. Exige CI no HEAD exato e CI pós-merge. Não representa teste em navegador real, RLS, nem liberação externa.
