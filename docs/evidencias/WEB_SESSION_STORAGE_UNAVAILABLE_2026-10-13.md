# Web — sessionStorage indisponível

`getItem`, `setItem` e `removeItem` podem lançar exceção em contextos com armazenamento desabilitado. Antes, um erro no `getItem` interrompia o efeito inicial; `setItem` abortava o login mesmo com sessão aprovada pela API; `removeItem` podia impedir a limpeza de estado em `signout`. A interface não deve depender de armazenamento do navegador para concluir login e saída em memória.

A correção mantém sessão exclusivamente em memória se persistência for bloqueada; a próxima abertura exigirá novo login. A API permanece autoridade de autenticação, e nenhuma sessão inválida é criada. Testes adicionados ao harness existente `web-auth-context.test.ts` simulam falha nas operações de armazenamento e verificam login e saída. Teste de browser nativo e CI do SHA exato ainda são gates, não presumidos. Não altera API, banco, PSP, mobile, lockfile ou Railway.
