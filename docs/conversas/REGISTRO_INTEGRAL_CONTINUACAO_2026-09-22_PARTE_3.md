# MLIVRETRABALHO — REGISTRO INTEGRAL DA CONVERSA — CONTINUAÇÃO 2026-09-22 — PARTE 3

**Finalidade:** continuação append-only do Registro Integral.

---

### USUÁRIO
Continuar

### ASSISTENTE
Vou continuar do ponto atual do **MLIVRETRABALHO**. Agora a prioridade é fechar a próxima lacuna real de “Definition of Done”: **teste integrado da jornada principal**, depois revisar o que ainda bloqueia produção — pagamentos reais, Trust & Safety e deploy.

### ASSISTENTE
O repositório avançou além do ponto anterior: já existem **PRs #156, #157 e #159 integrados**, incluindo teste SQL integrado da jornada principal, política de confirmação testada e correção de Safety Cases. O maior bloqueio agora está claro no próprio ledger: **ainda não há deploy comprovado do MLIVRETRABALHO nem Production Truth Gate**. Vou atacar esse bloco agora.

### ASSISTENTE
A conta Railway tem vários projetos com nomes automáticos, então o ledger estava certo em não assumir qual deles era o MLIVRETRABALHO. Vou identificar por **serviços e fonte GitHub**, não pelo nome, antes de criar qualquer projeto novo e duplicar infraestrutura.

### ASSISTENTE
Para evitar duplicar custo no Railway, vou separar infraestrutura: **Railway só para a API** e um **Postgres serverless gratuito/isolado** para o banco. Isso permite chegar ao Production Truth Gate sem criar um serviço PostgreSQL pago dentro do Railway.

### ASSISTENTE
O Neon rejeitou apenas a retenção solicitada: neste plano o máximo permitido é **21.600 segundos (6 horas)**. Vou criar o banco com esse limite, mantendo compute mínimo para reduzir custo.

### ASSISTENTE
O banco Neon de produção já foi criado e está pronto. Agora vou aplicar **as migrations reais do repositório**, não criar schema manual paralelo; assim produção continua reproduzível a partir do GitHub. Depois conecto a API Railway a esse banco.

### ASSISTENTE
A boa notícia: o repositório já tem um **migration runner de produção** com ledger/checksum/advisory lock (`apps/api/src/migrate.ts`) e script `migrate`. Isso é exatamente o que precisamos para um deploy seguro. Vou criar o projeto Railway identificado, ligar o repositório, configurar build/start/migrations e apontar `DATABASE_URL` para o Neon recém-criado.

### ASSISTENTE
A configuração do serviço Railway foi aplicada, mas a tentativa de transferir automaticamente o **segredo `DATABASE_URL`** do Neon para o Railway foi bloqueada pela camada de segurança da integração — não vou expor a senha no chat nem contornar isso de forma insegura. Vou continuar tudo que independe desse segredo e verificar exatamente o estado do deploy.

### ASSISTENTE
O deploy ainda está construindo a imagem; até aqui o Railpack detectou corretamente Node 22, pnpm workspace e o comando de build da API. Enquanto ele termina, vou revisar os dois bloqueios restantes do produto (**pagamento real** e **Trust & Safety**) para já deixar a próxima correção encaminhada.

### ASSISTENTE
A infraestrutura de deploy já estava mais preparada no código do que o ledger mostrava: existe migration runner, health test, smoke script e configuração Railway versionada. O serviço está construindo corretamente; enquanto isso, vou conferir os PRs mais recentes para não duplicar trabalho já integrado em paralelo.

### ASSISTENTE
Vou fechar primeiro o diagnóstico do deploy atual e, em paralelo, atualizar o GitHub com o estado real da infraestrutura. Não vou colocar nenhum segredo no repositório: só IDs de recursos, status e o único passo manual que restar.

### ASSISTENTE
O erro agora está confirmado com precisão: **o build passou**, a imagem foi criada, mas o pre-deploy parou em `DATABASE_URL_required`. Então o código/deploy config estão corretos; o único bloqueio operacional é ligar o segredo do Neon ao serviço Railway. Enquanto isso, vou registrar esse estado no GitHub e deixar o próximo deploy pronto para disparar assim que a variável existir.

### ASSISTENTE
A evidência do deploy real já foi gravada no GitHub **sem qualquer segredo**. Ela registra que o build passou e que o único erro foi `DATABASE_URL_required`; agora vou atualizar o ledger e verificar se consigo deixar o domínio público preparado mesmo antes do banco ser conectado.

### ASSISTENTE
O domínio público já foi reservado e o ledger agora mostra a situação real, sem dizer que produção está pronta. Como o segredo do banco é o único bloqueio externo, vou avançar o outro bloqueio interno que ainda podemos resolver sem credenciais: **Trust & Safety — suspensão/disputa**, mantendo KYC/KYB como integração externa separada.

### ASSISTENTE
O Documento da Verdade impõe um limite importante: **TRUST-ARCH ainda está OPEN e bloqueia enforcement definitivo de suspensão/disputa**. Portanto, não vou congelar comportamento arbitrário em código. O próximo passo correto é fechar esse gate com evidência primária de mercado e uma decisão arquitetural documentada; vou fazer essa pesquisa agora.

### ASSISTENTE
A pesquisa primária já mostra um padrão consistente: verificação de identidade antes de liberar trabalho, sanções graduais, bloqueio específico por empresa separado de suspensão global, motivo visível e mecanismo de recurso/revisão. Vou transformar isso em **evidência + ADR proposto**, sem ativar punições automáticas antes da revisão jurídica brasileira.

### ASSISTENTE
O TRUST-ARCH agora tem pesquisa primária e um ADR **PROPOSTO**, sem violar o hard gate. O desenho separa bloqueio por empresa, restrição global, causalidade e recurso. Vou checar agora se ainda há alguma exigência de segurança já aprovada no ADR de multi-tenancy que esteja sem teste — especialmente vazamento de contexto no connection pool.

### ASSISTENTE
O teste de RLS já cobre explicitamente **vazamento de contexto após COMMIT no mesmo connection/session**, além de SELECT/INSERT/UPDATE/DELETE cross-tenant e role sem BYPASSRLS. Portanto, não há lacuna ali. Vou registrar esta continuação no histórico e depois conferir se o repositório ficou sem PRs abertos antes de encerrar este ciclo.
