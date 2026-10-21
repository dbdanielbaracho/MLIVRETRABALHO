# Aceite técnico interno — Área 2: signup/login/auth — 20/10/2026

Fonte normativa: Documento da Verdade v1.104 e matriz das 13 áreas. Este arquivo é o recibo terminal e não substitui os apêndices integrais nos seis documentos originais.


---

## ACEITE TÉCNICO INTERNO — Área 2: signup/login/auth — 20/10/2026

### Decisão formal

**APROVADA tecnicamente em ambiente interno no SHA `b035000fed28dd47bbd95413abe09c67b7e53256`.**

Este aceite foi delegado expressamente pelo usuário e é emitido somente após a cadeia completa requisito → implementação → jornada integrada → CI do candidato → merge → CI literal da main → APK standalone próprio e pós-merge. A área 2 deixa de constar entre as pendentes. Permanecem aceitas as áreas 2 e 10; **11 áreas continuam pendentes**. Evidências de convites, empresa, suporte ou chat usadas nesta jornada não aceitam por arrasto as áreas 3, 4, 9 ou 11.

### Requisitos e implementação comprovados

- cadastro real de empresa e profissional; normalização e rejeição de e-mail duplicado; entrada inválida sem POST;
- senha incorreta rejeitada; identidade, owner e memberships reais; tenant forjado/cross-tenant rejeitado;
- convite vinculado ao e-mail, uso único, expiração, renovação, revogação e aceitação atômica; rollback e recuperação manual explícita de insert/update/promoção;
- duas empresas e troca de contexto pelo cliente sem inferir permissão; sessão expirada; logout antigo não apaga login novo; revogação remota retorna 401 e limpa o cliente somente após verificação;
- ACK mobile de convite aceita apenas calendário real: datas impossíveis não viram sucesso. Os helpers de cadastro, login, membros e transação de sessão usados pela jornada são os blobs reais do produto;
- React 19.1.4, React Native 0.81.6, lockfile, SQL, RLS, ACL, privacidade, CORS, Fetch guard, CDP, sandbox, LNA e deadlines permaneceram intactos.

### CI e jornada real no candidato

PR [#568](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/568), HEAD `148f3cded8dc679d54662cd0988e7f8087fae15c`. O checkout real do CI foi o merge sintético `c57ca5b09c6716bae9239c7f3c690a956ba74104`, pais ordenados [`8a8dd6d22f46b5762b306c2484ce58e0b9efe30f`, `148f3cded8dc679d54662cd0988e7f8087fae15c`] e árvore `aa056a276b7cb01342436b3c4753e710d299ae8c`, idêntica à candidata.

- [CI 39483543794](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39483543794), job 118838012035, attempt 1: **SUCCESS**.
- 1.873/1.873 testes: 217 Web, 1.141 mobile, 501 API, 3 CLI e 11 monitor; zero falhas, cancelamentos ou skips.
- `AUTHENTICATION_ACCEPTANCE_JOURNEY_PASS`: signup de empresa/profissional, normalização/duplicidade, senha incorreta, owner/memberships, isolamento entre tenants, convites bound/single-use/revogados/expirados/renovados, troca de empresa, sessão expirada, logout antigo versus login novo e revogação remota.
- `INVITATION_*_ATOMICITY_HTTP_PG_PASS`: três pontos reais de rollback PostgreSQL e recuperação explícita, sem duplicar membership nem consumir código na falha.
- contratos cliente↔HTTP↔PostgreSQL de membros/suporte, datas e ACKs passaram; 12/12 controles de navegador, jornada canônica, isolamento A/B e Production Truth passaram.
- Chrome real do gate: 155.0.8059.84; nenhum controle de segurança ou assertiva foi relaxado.

### APK do candidato

[Standalone APK 39483543757](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39483543757), job 118838012065, attempt 1: **SUCCESS**. Checkout `c57ca5b09c6716bae9239c7f3c690a956ba74104`; instalação e `DEVICE_SMOKE_OK` sem Metro. Artefato 12292947821:

- ZIP 28.913.659 bytes, SHA-256 `79c7c0810ec2587bef5fd908e3ee7b15c7d07ba5eed67f2b955bcfdd506f9d4d`;
- APK 66.162.596 bytes, SHA-256 `bf20263a5ee8be0be97b2d0e0e6ed1abdbdd310f383d291144931cf14374c09c`;
- BUILD_INFO: commit `c57ca5b09c6716bae9239c7f3c690a956ba74104`, release, pacote `com.predibeacon.mlivretrabalho.pilot`, `metro_required=false`.
- ZIP e APK foram baixados e os hashes recalculados; o SHA do APK coincide com `SHA256SUMS.txt`.

### Pós-merge literal

Merge [`b035000fed28dd47bbd95413abe09c67b7e53256`](https://github.com/dbdanielbaracho/MLIVRETRABALHO/commit/b035000fed28dd47bbd95413abe09c67b7e53256), pais [`8a8dd6d22f46b5762b306c2484ce58e0b9efe30f`, `148f3cded8dc679d54662cd0988e7f8087fae15c`] e árvore `aa056a276b7cb01342436b3c4753e710d299ae8c`.

- [CI 39516978383](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39516978383), job 118951378500: checkout literal `b035000fed28dd47bbd95413abe09c67b7e53256`, **SUCCESS**; os mesmos 1.873 testes, jornada de autenticação, três rollback/recovery PostgreSQL, 12/12 controles do navegador, jornada canônica e Production Truth passaram.
- [Standalone APK 39516978384](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39516978384), job 118951378660: checkout literal `b035000fed28dd47bbd95413abe09c67b7e53256`, **SUCCESS**; instalação e `DEVICE_SMOKE_OK` sem Metro. Artefato 12309750041:
  - ZIP 28.913.648 bytes, SHA-256 `677d311f813f6916308edeaa224a0fda98ed6090f65bb864d91cad175efdb6c4`;
  - APK 66.162.596 bytes, SHA-256 `05543fc3c9673a46dcebd960d40d2c60a9344dc8bf5150647a770f265b38ace6`;
  - BUILD_INFO: commit `b035000fed28dd47bbd95413abe09c67b7e53256`, release, pacote `com.predibeacon.mlivretrabalho.pilot`, `metro_required=false`;
  - bundle `assets/index.android.bundle` presente; AndroidManifest SHA-256 `ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480`, minSdk 24 e targetSdk 36.
- ZIP e APK pós-merge foram baixados e verificados independentemente; o hash do APK coincide com `SHA256SUMS.txt`.

### Limites explícitos

O aceite é técnico/funcional **interno** da área 2. Não declara aparelho físico, renderização completa de formulários RN, persistência SecureStore nativa, produção, Railway/Neon, pentest independente, credenciais reais, PSP, contrato ou dinheiro real. Esses itens continuam externos quando aplicáveis. A aprovação não implica causa raiz definitiva para toda intermitência histórica do Chrome; ela prova que todos os gates obrigatórios passaram no candidato e novamente no merge literal, sem mascaramento.

