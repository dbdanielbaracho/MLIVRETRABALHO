# Web — memberships duplicados no estado restaurado

O parser restaurado aceitava duas entradas para o mesmo `tenantId` com papéis diferentes. O seletor de empresa exibia duas opções com o mesmo valor e `memberships.find(...)` aplicava somente o primeiro papel, sem uma seleção inequívoca. O servidor permanece fonte única de autorização e não se alega bypass de RLS.

A validação agora rejeita sessões locais com `tenantId` repetido, exigindo novo login. Mantém múltiplos tenants **distintos**. Dois testes de regressão no módulo Web exercitam ambos os casos com os papéis canônicos owner/manager. Não afeta pagamentos, produção, React, lockfile, API ou mobile. Gates para merge: CI no SHA exato, revisão de diff e CI pós-merge. Documento da Verdade original permanece intacto; adicionar recibo de validação após gates, sem declarar aceite físico ou externo.
