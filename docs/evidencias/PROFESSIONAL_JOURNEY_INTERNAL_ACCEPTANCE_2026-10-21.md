# Área 3 — aceite técnico interno da jornada profissional

---

## ACEITE TÉCNICO INTERNO — Área 3: profissional, interesse, agenda, presença e avaliação — 21/10/2026

### Decisão formal

**APROVADA tecnicamente em ambiente interno no SHA `80f3ac49f5f7177d6a8d193a27881b74ffff4763`.**

O aceite foi delegado expressamente pelo usuário e é emitido após a cadeia completa requisito → implementação → jornada integrada → CI do candidato → APK próprio → merge → CI e APK literais da `main`. A área 3 deixa de constar entre as pendentes. Permanecem aceitas as áreas 2, 3 e 10; **10 áreas continuam pendentes**. Nenhuma outra área é aprovada por associação.

### Requisitos e implementação comprovados

- profissional autenticado lê catálogo de trabalho, manifesta interesse, mantém disponibilidade/agenda e percorre presença `check-in → start → check-out → complete`;
- perfil, disponibilidade, trabalho, presença, passaporte/cronologia, ganhos derivados e avaliação são vinculados à identidade, ao owner e ao tenant corretos; outsider e tenant forjado não recebem os dados;
- confirmações concorrentes atravessam barreira PostgreSQL e produzem exatamente uma alocação e uma notificação; essa evidência comprova a consistência consumida pela jornada profissional, sem aceitar por arrasto a área 5 de matching/substituição;
- avaliações bidirecionais, atualização idempotente e reputação compartilhada da empresa foram verificadas por HTTP/PostgreSQL;
- `apps/mobile/app/trabalhos.tsx` aposenta imediatamente somente o controller READ cujo prazo original de 15 segundos expirou, antes de qualquer atualização de UI. Não há retry automático, POST automático, relaxamento de deadline nem cancelamento inventado no servidor;
- nove regressões canônicas em `apps/mobile/tests/jobs-read-controller-cleanup.test.mjs` cobrem leitura vazia/catálogo, estágios assíncronos, timers antigos versus nova leitura/interesse e vinte leituras manuais, sem alterar os controles de autenticação;
- React 19.1.4, React Native 0.81.6, lockfile, tenant/RLS, ACL, privacidade, CORS, Fetch guard, CDP, sandbox, LNA e assertivas permaneceram intactos.

### CI e APK do candidato

PR [#595](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/595), HEAD `ae4609fb9dc990195e7d1af62a02654d192f17c8`, árvore `e551100db837e222e29c8bea679d3de970a2072f`. O CI usou o merge sintético `aec125c1185f5074c2f36b84b37ea4b73a60e593`, pais [`42ecc26cd36dce60cbee4fa419f139a2d0325414`, `ae4609fb9dc990195e7d1af62a02654d192f17c8`] e a mesma árvore candidata.

- [CI 39524136533](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39524136533), job 118974720066, attempt 1: **SUCCESS**. Foram 1.882/1.882 testes — 217 Web, 1.150 mobile, 501 API, 3 CLI e 11 monitor — além de typecheck, build, export Android, migrações, privacidade, HTTP/PostgreSQL, 12/12 controles do navegador, jornada canônica e Production Truth.
- Marcadores primários: `PROFESSIONAL_CHRONOLOGY_PASS`; concorrência com duas confirmações, uma alocação e uma notificação; avaliações bidirecionais; `WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=0`; `WEB_BROWSER_CURRENT_MAIN_CASE_RESULT PASS`; `Production Truth Gate ... PASS`.
- [Standalone APK 39524136442](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39524136442), job 118974719103: **SUCCESS**; instalação e `DEVICE_SMOKE_OK` sem Metro. Artefato 12312855653, válido até 04/11/2026:
  - ZIP 28.913.671 bytes, SHA-256 `e38471fe8773312014d81abb647b81968f86065e7ccee13aca5e0ae6fc5cb5e0`;
  - APK 66.162.612 bytes, SHA-256 `428d4b9cbdee8bbaefbccdc4353179070c45d51516b93be0fca1e2f115751e6a`;
  - `BUILD_INFO`: commit sintético `aec125c1185f5074c2f36b84b37ea4b73a60e593`, release, pacote `com.predibeacon.mlivretrabalho.pilot`, `metro_required=false`.
- ZIP e APK foram baixados; os hashes foram recalculados e o hash do APK coincide com `SHA256SUMS.txt`.

### Pós-merge literal

Merge [`80f3ac49f5f7177d6a8d193a27881b74ffff4763`](https://github.com/dbdanielbaracho/MLIVRETRABALHO/commit/80f3ac49f5f7177d6a8d193a27881b74ffff4763), pais [`42ecc26cd36dce60cbee4fa419f139a2d0325414`, `ae4609fb9dc990195e7d1af62a02654d192f17c8`] e árvore `e551100db837e222e29c8bea679d3de970a2072f`.

- [CI 39525571515](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39525571515), job 118979276410: checkout literal `80f3ac49f5f7177d6a8d193a27881b74ffff4763`, **SUCCESS**; os mesmos 1.882 testes e todos os gates de jornada profissional, navegador e Production Truth passaram.
- [Standalone APK 39525571483](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39525571483), job 118979276273: checkout literal `80f3ac49f5f7177d6a8d193a27881b74ffff4763`, **SUCCESS**; instalação e `DEVICE_SMOKE_OK` sem Metro. Artefato 12313937759, válido até 04/11/2026:
  - ZIP 28.913.661 bytes, SHA-256 `254d4ce6a53b72e7ff5b1a438336cedfb89b689995f5cfaad9b9750f6be09fc6`;
  - APK 66.162.616 bytes, SHA-256 `a17a4c4ae3561c0c3a849c5c774d0bef3ee0564f1a94e381593c889ec0b642f9`;
  - `BUILD_INFO`: commit literal `80f3ac49f5f7177d6a8d193a27881b74ffff4763`, release, pacote piloto, `metro_required=false`.
- ZIP e APK pós-merge foram baixados e verificados independentemente; o hash do APK coincide com `SHA256SUMS.txt`.

### Limites explícitos

O aceite é técnico/funcional **interno** da área 3. Não declara aparelho físico, renderização completa RN em dispositivo físico, persistência SecureStore nativa, produção, Railway/Neon, pentest independente, PSP, contrato ou dinheiro real. O uso de alocação/notificação/ganhos como consequência observada não aceita integralmente as áreas 5, 6 ou 9. A intermitência histórica do Chrome não é declarada resolvida globalmente; os gates obrigatórios passaram no candidato e novamente no merge literal, sem mascaramento.


## Mapeamento requisito → prova

| Requisito da área 3 | Implementação/contrato exercitado | Evidência integrada |
|---|---|---|
| Perfil e identidade profissional | perfil autenticado e contexto owner/tenant | jornada HTTP/PostgreSQL e `PROFESSIONAL_CHRONOLOGY_PASS` |
| Catálogo e interesse | leitura de vagas e manifestação de interesse sem POST automático | jornada HTTP/PG + testes mobile; inputs inválidos e outsider negados |
| Disponibilidade e agenda | disponibilidade persistida, agenda ordenada e loaders móveis reais | cronologia profissional em dois tenants |
| Presença | check-in, início, check-out e conclusão | jornada HTTP/PostgreSQL |
| Concorrência | confirmação sob barreira PG | dois ACKs exatos, uma alocação e uma notificação |
| Avaliação | avaliações bidirecionais e atualização idempotente | teste HTTP/PG de ratings/reputação |
| Ciclo de vida mobile | controller READ expirado é aposentado sem afetar nova operação | 9 regressões canônicas e 1.150 testes mobile no CI |
| Isolamento | owner/tenant correto; outsider e tenant forjado negados | jornadas HTTP/PG, cronologia e matriz de navegador |
| Gate final | candidato e merge literal | CI+APK próprios e pós-merge, hashes verificados |

## Estado da matriz após esta decisão

- Áreas aceitas internamente: **2, 3 e 10**.
- Áreas ainda pendentes: **10**.
- Não há aceite por arrasto de empresa/equipes, matching/substituição, ledger/pagamentos, notificações, suporte ou backend/security integral.

Os recibos acima são a fonte desta decisão. Histórias anteriores de CI vermelho permanecem preservadas como histórico e não substituem os dois resultados verdes no SHA candidato e no merge literal.
