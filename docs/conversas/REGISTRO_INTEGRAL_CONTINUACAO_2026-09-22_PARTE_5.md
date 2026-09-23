# MLIVRETRABALHO — REGISTRO INTEGRAL DA CONVERSA — CONTINUAÇÃO 2026-09-22 — PARTE 5

**Finalidade:** continuação append-only do Registro Integral.

---

### USUÁRIO
o endereço externo será [https://mlivretrabalho.predibeacon.com](https://mlivretrabalho.predibeacon.com)

### ASSISTENTE
Perfeito. Vou definir **`https://mlivretrabalho.predibeacon.com`** como o endereço externo oficial do MLIVRETRABALHO no Railway e verificar qual registro DNS precisa apontar para o serviço.

### ASSISTENTE
O domínio externo oficial foi adicionado ao Railway:

**https://mlivretrabalho.predibeacon.com**

Agora falta apenas o DNS apontar para o Railway. Crie este registro onde o DNS de `predibeacon.com` é administrado:

- **Tipo:** CNAME
- **Nome/Host:** `mlivretrabalho`
- **Destino/Target:** `hxm2d3d3.up.railway.app`

No momento o Railway está aguardando essa atualização para validar a propriedade e emitir o certificado HTTPS. Depois que o DNS propagar, eu valido o domínio e uso **`mlivretrabalho.predibeacon.com`** no Production Truth Gate.

### USUÁRIO
ok continuar

### ASSISTENTE
Vou continuar pelo domínio oficial. Primeiro verifico se o DNS já propagou e se o certificado foi emitido; depois rodo o Production Truth Gate contra `mlivretrabalho.predibeacon.com` e atualizo o GitHub com a evidência real.

### ASSISTENTE
O domínio já aparece anexado ao serviço no Railway e está apontando para a porta correta **8080**. A verificação externa ainda não conseguiu abrir o endpoint, então vou checar se o DNS efetivamente resolveu e se houve tráfego no proxy do Railway antes de considerar o gate concluído.

### ASSISTENTE
O domínio oficial ainda não está respondendo externamente nesta sessão, então o **Production Truth Gate público continua pendente por DNS/certificado**, não por API ou banco. Enquanto a propagação não fecha, vou continuar no próximo bloqueio real do produto: revisar o estado atual de **Trust & Safety / KYC-KYB** e avançar só o que não depende de decisão jurídica externa.

### ASSISTENTE
A busca confirma que **não há KYC/KYB implementado na `main`** hoje; o gate continua só documentado. Como o modelo provider-neutral já foi revisado antes e o problema do PR antigo era principalmente a migration conflitante, vou recuperar aquele diff, renumerar corretamente depois da `0022` e integrar apenas a infraestrutura neutra — sem autoaprovação e sem bloquear trabalhador por decisão automática.

### ASSISTENTE
Recuperei o PR antigo. O desenho é aproveitável, mas vou melhorar antes de integrar: migration será **0023**, `verification_cases` não terá `DELETE` para o runtime, e a API continuará sem qualquer rota que permita ao próprio usuário marcar `verified`. Isso mantém o baseline seguro e auditável sem ligar ainda punições ou bloqueios automáticos.

### ASSISTENTE
A branch de Trust v1.47 já está criada sobre a `main` atual. Vou aplicar agora o baseline corrigido, abrir PR e deixar o CI decidir a integração — sem marcar TRUST-ARCH como concluído.

### ASSISTENTE
O **PR #171** foi aberto com o baseline KYC/KYB corrigido. Vou conferir o CI; se typecheck, testes, migration runner e Production Truth contract passarem, integro e deixo o deploy automático aplicar a migration `0023` no Postgres do Railway.

### ASSISTENTE
O CI #433 já iniciou normalmente e está subindo o PostgreSQL de teste. Enquanto ele executa, não vou mexer na branch. Assim que o job fechar, eu integro se estiver verde e confirmo a migration `0023` no Railway.

### ASSISTENTE
O **CI #433 fechou verde**: typecheck, build, testes, migration runner e Production Truth contract passaram. Vou integrar o #171 agora e depois confirmar que o Railway aplicou a `0023` no Postgres de produção.

### ASSISTENTE
O merge #171 já disparou o deploy automático da `main` no Railway, commit `418a1dcc…`. Ele está construindo agora. Vou acompanhar até confirmar **migration 0023 + healthcheck**; depois atualizo o ledger e o registro integral.

### ASSISTENTE
O deploy está demorando no empacotamento do Railpack, mas não há erro de código nem de migration até aqui. Enquanto ele termina, vou atualizar a documentação normativa com o novo baseline KYC/KYB e deixar explícito que **TRUST-ARCH continua aberto**, para não confundir “infraestrutura de verificação” com “verificação real aprovada”.

### ASSISTENTE
O deploy já aplicou a migration `0023`, iniciou a nova API e o healthcheck respondeu **200**. Vou só confirmar o status terminal `SUCCESS`, fechar o ledger/evidência e verificar se o domínio oficial já começou a responder externamente.

### ASSISTENTE
Confirmado: o novo deploy está **SUCCESS**, sem trabalho pendente, e o Postgres também está **SUCCESS**. O domínio oficial continua anexado à porta 8080; a ferramenta externa desta sessão ainda não consegue acessá-lo, então não vou marcar o Production Truth público como concluído sem prova. Agora vou fechar a documentação e o histórico desta etapa.

### ASSISTENTE
A documentação agora reflete o estado real: **KYC/KYB baseline está em produção**, mas sem enforcement automático, e o domínio público ainda não foi promovido a PASS. Vou aproveitar a propagação do DNS para resolver outra lacuna concreta que o próprio Railway continua alertando: **falta `pnpm-lock.yaml`**, o que impede installs totalmente determinísticos.

### ASSISTENTE
O GitHub está novamente com **zero PRs abertos**. Tentei gerar o lockfile em um ambiente isolado, mas esse ambiente não tem DNS externo para clonar o repositório; não vou fabricar um `pnpm-lock.yaml` manualmente. Vou usar o próprio ambiente Railway/GitHub conectado para gerar isso de forma reproduzível.

### ASSISTENTE
O arquivo `PARTE_3` já existe no repositório, então não vou criar uma duplicata. Vou carregar o conteúdo atual e acrescentar esta continuação nele, preservando o histórico existente.

### ASSISTENTE
Também já existe uma `PARTE_4`, então vou continuar em um novo arquivo append-only para não sobrescrever histórico. Depois disso encerro esta rodada com o estado exato do projeto e o próximo bloqueio técnico.
