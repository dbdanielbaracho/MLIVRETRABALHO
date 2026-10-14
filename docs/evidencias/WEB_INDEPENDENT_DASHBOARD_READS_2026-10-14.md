# Web — recuperação parcial de leituras empresariais

**Falha verificada no código:** `apps/web/app/page.tsx` carregava doze endpoints da operação com `Promise.all`. Se uma única leitura (por exemplo analytics ou reconciliação) rejeitasse, o catch deixava todos os estados inicialmente limpos, mesmo com respostas válidas das outras seções. Não se deve apresentar um painel vazio como ausência comprovada de dados.

**Correção:** `Promise.allSettled` usa resultados de cada seção independentemente. Sucesso é renderizado no contexto atual, erro recebe fallback vazio/indisponível e aviso explícito com número de falhas; o `current` e o deadline existentes continuam protegendo contexto expirado. Roles e acesso aos endpoints continuam autorizados pela API; seções administrativas não são requisitadas por não-admin. Testes em `independent-reads.test.ts` cobrem falha parcial e total. Gates de CI exato, pós-merge e revisão ainda necessários.

**Limite:** esta mudança não substitui autorização/RLS nem transforma um serviço indisponível em dado real. Documento da Verdade original preservado; API, mobile, PostgreSQL, PSP e Railway não são alterados.
