# Área4 — aceite técnico/funcional interno — 22/10/2026



---

## Aceite técnico interno da Área4 — empresas/equipes — 22/10/2026

**Decisão do assistente por delegação expressa: ÁREA4 APROVADA TÉCNICA E FUNCIONALMENTE NO ESCOPO INTERNO.** Substitui somente os estados anteriores de candidatura/pendência da Área4, preservando todo o histórico. Não exige aprovação humana nem CONTINUAR.

Base auditada main `b5c77478619765e2ea6b115f8674a64c7a7e156b`, árvore `30d1c954ccfba9d425671fb10934a3a314da2f73`, integração normal do #608 (HEAD eeb6f5b71d0fc818b84be26bbdb9ac5ae51a9aa2). CI próprio39834842796/job120020313103 SUCCESS, checkout sintético906d87f88034a0647cdc505831a14b3e98eeba83, mesma árvore/pais[322c049,eeb6]. CI literal pós-merge39835939458/job120024168013 SUCCESS; checkout primário18:58:18.0912890Z LITERALb5c7747.1936testes[217Web/1186mobile/519API/3CLI/11monitor], zero fail/skip/cancel; tipos/build/export/migrations/privacy/HTTPPG/matriz12/12+canonical/ProductionTruth PASS. Nenhum rerun/cancel.

Prova nova COMPANY_ACCEPTANCE_HTTP_PG_PASS própria18:53:18.1295138Z e literal19:00:09.2105918Z: quatro papéis owner/admin/manager/company por /me, helpers reais de publicação/equipes/membros/dashboard, cinco vagas persistidas/quatro equipes, ONEPOST de publicação por papel, add/replay sem duplicar/remove, owner-only403, estados vazios/erro/contexto e oito tabelas/dois tenants iguais após negações, tenantB intacto e ACL/policies inalteradas. Os testes canônicos de prazo/rascunho/unknown/ACK/contexto e os fixtures de convite/concor­rência/rollback e WebDOM existentes também passaram no mesmo SHA. O papel company é UMA membership nova de fixture SQL local/CI, sem convite público; não se alega provisionamento público desse papel. Sem alteração de produto, permissões, políticas ou grants.

Cadeia completa requisito→código→testes→CI→SHA e limites em `docs/evidencias/COMPANY_INTERNAL_ACCEPTANCE_2026-10-22.md`; recibo candidato COMPANY_ACCEPTANCE_JOURNEY_2026-10-22.md permanece histórico. Novo teste scripts/company-acceptance-e2e.cjs2f395c93b4a3ba20d4feef16745733cc158f7fb4 e rootHTTPaa33408359acb00b8932e4ff46d281849575fbf5 preservam todos os hooks/asserts anteriores. A matriz exige métodos/ACK, quatro papéis, convites, contexto, prazos e estados vazios/erro; a decisão considera esse conjunto e não contagem de testes isolada.

**Estado vigente: áreas2,3,4,6,9,10 CONCLUÍDAS INTERNAMENTE; sete pendentes:1,5,7,8,11,12,13.** Não é percentual de código nem aceite das áreas1/5/7/8/11 por arrasto. Não declara Production-DONE, RNformrender/SecureStore nativos, VisualTruth/aparelho físico, PSP/KYB/KYC, pentest ou fornecedor/produção reais. Issues215/219/220/224/228 permanecem externas e separadas;574/565 drafts.

APK N/A integral para a prova608 e esta formalização:184insumos protegidos (173mobile,workflows,build/smoke,rootmetadata/lock) idênticos ao produto medido literal1b85403c (APK39708675307SUCCESS); script novo é teste fora do grafo Expo→Gradle. Não se atribui APK literalb5c ou deste novo SHA. React mobile19.1.4/RN0.81.6, lockfile, RLS/tenant/LGPD/auth/ACL e controles Chrome/CDP/Fetch/CORS/sandbox/LNA/deadlines intactos. Sem serviço/custo/credencial externa/dinheiro real/root/bypass.

Seis originais são preservados integralmente por apêndice; só este recibo e os seis capítulos mudam. O PR de formalização requer CI completo próprio, revisão fresh e CI literal pós-merge; resultados terminais serão registrados no corpo do PR, sem commit artificial autorreferente. Próxima jornada interna prioritária: Área5 matching/alocação/substituição, ligando idempotência/concorrência/disponibilidade/escolha humana/vínculo empresa-profissional a HTTPPG e clientes reais. Todos os aceites internos são responsabilidade do assistente.


## Matriz requisito → implementação → prova

| Critério da matriz4 | Código e teste | Evidência efetiva |
|---|---|---|
| Métodos/ACK de vagas | publishJob45fb20 + CompanyJobCreateController50acee; company-acceptance-e2e.cjs | Um POST de publicação por cada papel; ACK real e GET/SQL das cinco vagas ligadas aos payloads/tenant |
| Papéis owner/admin/manager/company | AuthServiceab715c/Teams40ffb/CompanyMembersb63fed + nova jornada | /me confirma memberships reais; admin/manager aceitam convite HTTP; company é UMA membership de fixture legada, não API pública; todos executam operações permitidas; gestão owner-only403 |
| Equipes/membros | teamseeeab168 + nova jornada e http-team-allocation-e2e.sh90e1af | Perfil/disponibilidade/interesse/assignment reais; quatro equipes; vazio/add/replay único/remove; contagem de membros e worker conhecido; alocação factual já exercida no gate existente |
| Convites/revogação/expiração | company-members85c862, authentication-acceptance354807 e invitation-atomicity, HTTPmembersd6724a/inputc87fff | Owner mantém gestão; convites vinculados ao email/single-use, expiry/renew/revoke e três rollbacks+recuperações existentes permanecem executados; não se inventa permissão a admin/manager |
| Contexto e estados vazios/erro | sameTeamContext/sameManagementContext, loadTeamBase/loadCompanyDashboarda865a5 + jornada nova | Vazios e erros HTTP reais; token/tenant antigo é rejeitado por guardas reais; dashboard stale não aceita leitura; registro ativo ligado ao assignment real |
| Prazos/rascunhos/resultado incerto | publication context010543, publication uncertain9d1138, teams deadlinefa39a5, invitecreate52973e/inviteacceptb276e8 | Testes canônicos executados no mesmo CI, auth/fetch/JSON/authfinal, blur/refocus, old timers/finally, sem ACK tardio ou reenvio automático; mocks de hooks/clock são explícitos, não RNrender |
| Web empresarial | teampublicationc92f5a, membershipACKe77464, tenantswitchf6e56c + browser mandatory | Métodos/payload/headers/ACK/correctrefresh e contexto; DOM real com duas empresas, criação de equipe/vaga,503/recovery/reload/signout/revogação; matriz12controles e canonical obrigatórios |
| Isolamento/negações | nova jornada + fixtures HTTP de inputs | Oito tabelas de dois tenants iguais após denials/malformados; foreignTenant igual também após positivos; policies/ACL/RLS metadados idênticos. Não é auditoria global de todas as tabelas/endpoints das áreas7/8/11 |


## Proveniência dos gates

| Gate | Run/job | Checkout observado | Resultado |
|---|---|---|---|
| Próprio608 | [39834842796](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39834842796),job120020313103 | sintético906d87f88034a0647cdc505831a14b3e98eeba83, pais[322c049,eeb6f5b], árvore30d1c954 | SUCCESSattempt1 |
| Literal pós608 | [39835939458](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39835939458),job120024168013 | literalb5c77478619765e2ea6b115f8674a64c7a7e156b, mesma árvore30d1c954 | SUCCESSattempt1 |

Marker novo em ambos: COMPANY_ACCEPTANCE_HTTP_PG_PASS,141requests/60POSTs totais da fixture (inclui setup/auth/negativas, não são60 publicações),4papéis/5vagas/4equipes. Quatro SDKs reais identificados por GitSHA no marker. O papel legado company é setup de UMA membership para identidade e tenant recém-criados, após guardas CI/DB/socketloopback, seguido de HTTP real autenticado e /me; não modifica papel do banco, grants, policies ou fluxo público. Os outros papéis vêm de signup/convites HTTP.

Pós-merge primário: checkout18:58:18.0912890Z; jornada nova19:00:09.2105918Z; matriz12/12+canonical19:01:36.3224989Z; ProductionTruth19:02:20.1035834Z.1936casos PASS, zero fail/skip/cancel e todos os passosfoundationSUCCESS. ActivityWatch não foi usado como build. Nenhum sameSHA retry.

Testes canônicos observados no CI próprio, além da jornada nova: publicationdeadline auth/fetch/json/final-authok731..734; contexto de publicaçãook177; EquipesloadBasedeadline auth/fetch/json/final-authok1153..1156; criação de convite authdeadlineok423 e aceite authdeadlineok396; Webteamadd/removeACKok207 e troca de tenantok110. Os corpos exatos estão no manifesto abaixo; não são testes novos nem RNrender. Completam os estados incertos e guardas de UI que a prova HTTP não finge reproduzir fisicamente.

## Identidades auditadas

```json
[
  {
    "path": "scripts/company-acceptance-e2e.cjs",
    "sha": "2f395c93b4a3ba20d4feef16745733cc158f7fb4",
    "mode": "100644"
  },
  {
    "path": "scripts/http-journey-e2e.sh",
    "sha": "aa33408359acb00b8932e4ff46d281849575fbf5",
    "mode": "100755"
  },
  {
    "path": "apps/mobile/lib/company-job-publication.ts",
    "sha": "45fb20b6b1b55447fe83207d4ac3806db7e7dca5",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/teams.ts",
    "sha": "eeeab168bfb62c62f2552d28bd6600ae23adada1",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-members.ts",
    "sha": "85c86260e3cecc70df9e8ffe24dd246f5cab9d7a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-dashboard.ts",
    "sha": "a865a546c903520964a807f488a5ec4114e9bbe8",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-publication-context-deadline.test.mjs",
    "sha": "010543d05c7716ad3cb4cfc48567f220086c4ae3",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/publication-screen-uncertain-deadline.test.mjs",
    "sha": "9d11388afedbbe01e6ac15be0d9558e5d5328513",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/teams-read-deadline.test.mjs",
    "sha": "fa39a5639095d53b0e9f6491c4a926e47eeb9236",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/invitation-create-deadline.test.mjs",
    "sha": "52973e05433b4f4cdb602d0fbbbfd8d02b982265",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/invitation-accept-deadline.test.mjs",
    "sha": "b276e85f116dccca5fb6f800d9a4cb7e2e5a9ade",
    "mode": "100644"
  },
  {
    "path": "apps/web/app/team-publication.test.ts",
    "sha": "c92f5affe84c879c06fc3097dcb39b510192050a",
    "mode": "100644"
  },
  {
    "path": "apps/web/app/web-team-membership-ack.test.ts",
    "sha": "e774643a97be9ac03602e4ea962166f6844fbbbd",
    "mode": "100644"
  },
  {
    "path": "apps/web/app/tenant-switch.test.ts",
    "sha": "f6e56c018d2807009ccef591e64ea0d617ef4658",
    "mode": "100644"
  }
]
```

## APK N/A com prova positiva de escopo

Todos184insumos protegidos e173arquivos mobile byte/modo idênticos entre árvore atual608 e árvore080e142b16df0d629fabc29d8940b03cfa40e553 do produto1b85403c. Canonical scripts/build-android-pilot.sh5f4f95... faz Expo prebuild filtrado mobile→GradleassembleRelease; não executa HTTPjourney ou company-acceptance. Workflow standalonee0fc5f... não muda e filtra apps/mobile/build/smoke/rootdeps/lock. Portanto APK N/A para estas mudanças de teste/documentos; não é aprovação por ausência de runs.

Último APK standalone medido literal1b854: run39708675307SUCCESS, artifact12396378712 não expirado, ZIP28913839/digestSHA2562f1b75c2f67d4139c26c8f280cfa90e671505818ce704f863ef2752fd8c79537 revalidado na API nesta rodada. Bytes/SUMS/BUILDINFO e smoke foram verificados no recibo Área6 bcb4a0d...; não se afirma novo download físico nesta rodada, APK literal608 ou cobertura de formulário nativo. Não há APK novo para esta formalização documental.

## Limites e decisão

Área4 inclui a jornada interna de empresas/equipes definida na matriz, com isolamento de tenant e papéis. Matching/substituição completos são Área5 e não foram aceitos por esta prova. Auditoria global de RLS/endpoints/segurança continua nas áreas7/8/11; layouts e VisualTruth na1; demais docs/CI na12/13. Provider/KYB/KYC/PSP/pentest/produção/physical/SecureStore não são inferidos. Nenhum rate/deadline/Fetchguard/CDP/CORS/sandbox/LNA/assert foi relaxado; nenhuma despesa ou credencial/serviço externo foi usada.

Os seis prefixos originais608 serão preservados integralmente. A decisão de aceite apoia-se em gates reais já concluídos do produto integrado. A formalização documental ainda exige CI próprio e literal pós-merge; números futuros não são inventados e ficarão no terminal do PR, sem commit de status. Estado após decisão:2,3,4,6,9,10 aceitas; sete pendentes.

## Recibo terminal608 preservado

Fecha uma lacuna de prova da Área4: publica/lê vagas, cria equipe e inclui/reaplica/remove membro com os clientes reais para owner/admin/manager/company sobre HTTP/PostgreSQL local. Inclui membership /me, gestão owner-only, contexto, estados vazios/erro, negações sem escrita em oito tabelas/dois tenants e ACL/policies intactas. Produto/API/mobile não são alterados; não se fabrica bug.

Admin/manager vêm de convites HTTP reais; company é papel legado sem convite público e recebe UMA linha de membership da fixture SQL, delimitada a tenant/identidade frescos após guardas CI/DB/socketloopback. Isso não prova provisionamento público desse papel nem muda grants/policies/roles de banco.

Base `322c049e09553f8d3b845f013ca3e3c0802c2bfc`; HEAD `eeb6f5b71d0fc818b84be26bbdb9ac5ae51a9aa2`; árvore `30d1c954ccfba9d425671fb10934a3a314da2f73`. Nove caminhos: novo CJS, três linhas antes do navegador no shell HTTP, seis normativos append-only e recibo COMPANY_ACCEPTANCE_JOURNEY_2026-10-22.md. Todos os hooks/asserts/gates anteriores preservados, zero delta app/deps/lock/workflows/build/smoke. APK N/A por identidade integral, não por empréstimo.

Local: node--checkPASS e CI=0 recusa antes PG/rede. **HTTPPG real ainda depende do CI completo próprio deste SHA.** Não há teste unitário artificial, RNrender, SecureStore, aparelho físico, provider ou produção alegados. Cinco áreas continuam aceitas/oito pendentes; a Área4 só terá decisão formal após requisito→prova→CI próprio→integração→CI literal pós-merge completos. #574/#565 seguem drafts, sem duplicação/importação de seus produtos.

## Gate próprio — 22/10/2026
CI39834842796/job120020313103/attempt1 SUCCESS. Checkout primário18:50:30.8277098Z sintético906d87f88034a0647cdc505831a14b3e98eeba83, pais[322c049,eeb6f5b], árvore30d1c954ccfba9d425671fb10934a3a314da2f73 idêntica ao candidato.
COMPANY_ACCEPTANCE_HTTP_PG_PASS18:53:18.1295138Z: rolesowner/admin/manager/company,141requests/60POSTs totais da fixture (inclui auth/setup/negativas),5vagas/4equipes,ONEpublicationPOSTporpapel, add/replay/remove, oito tabelas/dois tenants iguais nas negações/tenantB intacto/ACLpolicies idênticas. Legacycompany é fixtureSQL declarada, não fluxo público. Quatro SDKs reais identificados no marker.
1936=[217/1186/519/3/11] PASS0fail-skip-cancel/tipos/build/export/migrations/privacy; matriz12/12+canonical PASS18:55:10Z; ProductionTruth PASS18:56:16.3142228Z. Todos os passosfoundation SUCCESS, zero retry/cancel.
Revisão freshmain/base322cHEAD eeb6 inalterados; ALL9paths/modes corretos e novos blobs FULLreadbackexato;1344blobs existentes fora6norms/rootHTTP iguais,173mobile/depslock/workflows/buildsmoke intactos. RootHTTP reversível retirando apenas três linhas novas. APK N/A integral. Nenhum outro draft importado; seis prefixos FULLpreservados. Integração com expectedSHA único e pós-CI literal obrigatórios; Área4 ainda não formalmente aceita.


## Recibo terminal de integração — 22/10/2026
Merge normal único `b5c77478619765e2ea6b115f8674a64c7a7e156b`, pais[322c049e09553f8d3b845f013ca3e3c0802c2bfc,eeb6f5b71d0fc818b84be26bbdb9ac5ae51a9aa2], árvore30d1c954ccfba9d425671fb10934a3a314da2f73 idêntica ao candidato. Main fresh confirmada.
CI literal pós-merge [39835939458](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39835939458)/job120024168013/attempt1 COMPLETED SUCCESS. Checkout primário18:58:18.0912890Z LITERALb5c77478619765e2ea6b115f8674a64c7a7e156b.1936testes+tipos/build/export/migrações/privacidade/HTTPPG/browser/ProductionTruth PASS. Novo COMPANY_ACCEPTANCE_HTTP_PG_PASS19:00:09.2105918Z, mesmos4roles/141requests/60POST/5vagas/4equipes/SHA SDKs/isolamento/ACL. Matriz e ProductionTruth constam no log primário. Zero rerun/cancel, APK N/A integral184inputs protegidos idênticos ao últimoAPK medido literal1b854 (39708675307SUCCESS, artifact12396378712unexpired/digest2f1b75...verificado por API nesta rodada), não APK literalb5c.

Esta entrega integrou o teste funcional completo faltante; a formalização da decisão de aceite da Área4 seguirá em atualização normativa baseada nestes gates reais, sem inventar aprovação externa. Os recibos de preparação pendentes permanecem história e não geram commit de status. Nenhum outro draft integrado ou fechado. Sem produção/custo/credencial externa/PSP/dinheiro real/root/grants/bypass/RLSdisable.

