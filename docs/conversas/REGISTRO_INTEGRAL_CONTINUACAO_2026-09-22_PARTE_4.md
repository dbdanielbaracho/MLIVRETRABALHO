# MLIVRETRABALHO — REGISTRO INTEGRAL DA CONVERSA — CONTINUAÇÃO 2026-09-22 — PARTE 4

**Finalidade:** continuação append-only do Registro Integral.

---

### USUÁRIO
Continuar

### ASSISTENTE
Vou corrigir o **#167** antes de qualquer merge: a arquitetura está boa, mas a migration está numerada como `0020` e a `main` já usa `0020` e `0021`. Vou reaplicar o mesmo baseline KYC/KYB sobre a `main` atual como **`0022_verification_cases.sql`**, rodar CI e só então integrar.

### ASSISTENTE
A nova branch já parte da `main` depois do Production Truth Gate. Vou portar apenas o baseline neutro de verificação, acrescentando a correção de migration **0022** e deixando explícito no evidence que **TRUST-ARCH continua OPEN** — nenhuma verificação poderá ser autoaprovada pelo usuário.

### ASSISTENTE
O conector bloqueou a tentativa de materializar o baseline KYC/KYB diretamente. Como esse tema interfere em acesso a trabalho e o próprio **TRUST-ARCH ainda está OPEN**, não vou forçar uma implementação de elegibilidade antes da revisão jurídica/provider. Vou deixar o #167 fora da `main` e continuar pelos gates técnicos que não dependem dessa decisão.

### ASSISTENTE
O repositório voltou a **zero PRs abertos**. Vou agora alinhar o ledger com duas mudanças: Production Truth Gate já está versionado na `main`, e o KYC/KYB ficou deliberadamente **não integrado** até o fechamento do TRUST-ARCH. Depois sigo para o bloco financeiro, onde ainda existe diferença entre ledger interno e PSP real.

### ASSISTENTE
O bloco financeiro já tem uma boa fundação: adapter interface, webhook autenticado, idempotência e ledger de eventos. A lacuna é que isso ainda não é um **PSP real** e não devemos escolher garantia/adiantamento/crédito enquanto `FIN-RISK` estiver OPEN. Vou primeiro registrar corretamente #168 e o status do TRUST-ARCH no ledger; depois pesquiso provedores reais com fontes primárias para fechar a próxima decisão sem improviso.

### ASSISTENTE
O ledger já está reconciliado. Agora vou tratar `FIN-RISK` do mesmo jeito que fizemos com Trust: pesquisar **PSPs reais no Brasil com documentação primária**, comparar split/payout/webhooks/KYC e separar o que pode ser infraestrutura neutra do que depende de decisão financeira/jurídica.

### ASSISTENTE
A pesquisa financeira já trouxe duas opções brasileiras documentadas para marketplace: **Mercado Pago Split 1:1** e **Pagar.me Split/recebedores**. Há uma diferença material: Mercado Pago 1:1 usa OAuth por vendedor e explicita limitação de reembolso quando o vendedor não tem saldo; Pagar.me permite definir responsabilidades por chargeback/taxas no split, mas o recurso é restrito a clientes PSP. Isso é exatamente o tipo de decisão que `FIN-RISK` precisa antes de congelarmos pagamentos.

### ASSISTENTE
A pesquisa de `FIN-RISK` já está persistida no GitHub com fontes primárias e sem escolher provider artificialmente. Vou avançar mais um nível: documentar a arquitetura financeira **proposta** e, em paralelo, auditar o webhook/ledger atual procurando bugs que podemos corrigir sem depender da decisão de garantia/crédito.

### ASSISTENTE
A auditoria confirmou que `payment_events` já é append-only para o runtime — `UPDATE/DELETE` foram revogados — o que é correto para trilha financeira. Encontrei uma lacuna neutra e importante para multi-provider: os eventos guardam `provider_reference`, mas **não guardam qual provider originou o evento**. Vou corrigir essa proveniência sem escolher Mercado Pago/Pagar.me ainda.

### ASSISTENTE
A arquitetura financeira proposta já está documentada sem fechar o gate. Agora vou transformar a lacuna de proveniência em código: cada `payment_event` passará a registrar explicitamente o **provider**, e a idempotência também verificará esse campo. Isso melhora auditoria/reconciliação sem amarrar o produto a um PSP específico.

### ASSISTENTE
Achei um problema mais importante que a própria coluna `provider`: hoje `company/payment-events` permite que um **owner/admin da empresa crie manualmente fatos financeiros** (`captured`, `payout_paid`, `refunded` etc.). Isso viola a separação entre operador da empresa e fonte externa de pagamento e pode falsificar reconciliação. Vou remover essa escrita manual; empresas poderão consultar/reconciliar, mas eventos externos só entram pelo caminho autenticado de webhook/provider.

### ASSISTENTE
A parte sensível já foi removida: empresa/admin não consegue mais fabricar eventos financeiros. Agora falta completar a mudança com a migration `0022`, evidência e CI. Depois disso, se o pipeline estiver verde, integro o PR imediatamente.

### ASSISTENTE
O **PR #169** foi aberto e o CI #424 já entrou na fila. Enquanto ele roda, vou revisar o diff inteiro para detectar antes do pipeline qualquer inconsistência de migration, tipagem ou reconciliação.

### ASSISTENTE
O diff do #169 está coerente: migration `0022`, eventos financeiros read-only para company/admin, provider controlado pelo backend e idempotência provider-aware. O CI já está executando também o **migration runner real** e o **contrato do Production Truth Gate**, então este PR terá uma validação mais forte do que apenas typecheck.

### ASSISTENTE
A auditoria também apontou uma preparação necessária para PSP real: o bootstrap Fastify atual não habilita captura de **raw body**, embora a interface do adapter já preveja `rawBody`. Assinaturas de alguns providers dependem do payload original; vou tratar isso em uma fatia separada depois do #169 para não misturar mudanças financeiras num único PR.

### ASSISTENTE
O #169 passou nas etapas críticas: **typecheck, build, testes, migration runner e Production Truth Gate contract**. Falta apenas o fechamento técnico do runner; vou confirmar o `success` final e fazer o merge com SHA travado.

### ASSISTENTE
O **#169 foi integrado** (`3b18954b…`). Agora a empresa não consegue mais fabricar `captured/refunded/payout_paid`, e cada evento financeiro carrega proveniência explícita do provider. Vou seguir com a preparação técnica para webhook real: **raw body preservado no Fastify/Nest**, necessário para assinatura de PSPs que validam o payload original.

### ASSISTENTE
A documentação oficial do Nest confirma exatamente o nosso diagnóstico: com Fastify, `rawBody: true` deve ser habilitado no `NestFactory.create` para verificação de assinatura de webhook baseada no payload original. Vou adicionar essa capacidade agora, sem alterar o webhook atual nem escolher provider.

### ASSISTENTE
O **#170** está no CI #426. Enquanto ele roda, o mapa de bloqueios ficou mais limpo: código/migrations/gate de produção estão prontos; o deploy real depende somente do `DATABASE_URL` seguro no Railway. Não vou contornar isso aplicando migrations manualmente no Neon, porque quebraria a garantia de **migration runner + checksum + deployed SHA** que já construímos.

### ASSISTENTE
Enquanto o CI trabalha, vou completar a pesquisa de integração real com um ponto essencial: **como os PSPs autenticam webhooks**. Isso vai permitir que o próximo adapter seja desenhado com assinatura oficial em vez de continuar dependendo do segredo compartilhado genérico.

### ASSISTENTE
O **#170 também passou integralmente no CI** — incluindo migration runner e Production Truth contract. Vou integrar agora e depois atualizar o ledger/histórico com os avanços de pagamentos e o único bloqueio operacional que ainda exige a variável secreta no Railway.

### ASSISTENTE
O #170 já está na `main` (`625482c8…`). Vou atualizar o ledger para refletir que o bloco financeiro agora tem **pesquisa primária + ADR proposto + proveniência provider + eventos externos read-only + raw body**, mas ainda sem marcar PSP real ou FIN-RISK como concluídos.

### ASSISTENTE
O ledger agora está atualizado com os merges #169/#170 e mantém `FIN-RISK` explicitamente OPEN. Vou registrar esta parte da conversa no histórico integral e fazer uma última checagem de Railway/GitHub para deixar o estado exato: o que está pronto, o que está bloqueado externamente e o próximo passo automático depois da variável do banco.
