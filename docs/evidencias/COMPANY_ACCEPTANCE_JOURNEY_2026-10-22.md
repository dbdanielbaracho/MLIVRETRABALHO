# Jornada candidata — Área4 empresas/equipes — 22/10/2026



---

## Jornada candidata da Área4 — empresas, papéis, publicação e equipes — 22/10/2026

Base viva `322c049e09553f8d3b845f013ca3e3c0802c2bfc`, árvore `d9c8f74e19d469765f8caac7df4c1a12a0d79869`. #605/#607 já integrados; CI literal39827910512SUCCESS confirmou a formalização da Área6. **Áreas2,3,6,9,10 aceitas; oito pendentes. Nenhum novo aceite é antecipado por este candidato.**

A auditoria selecionada encontrou positivos HTTP/cliente para owner, convites admin/manager e negação de gestão a não-owner, mas não a mesma jornada de publicação/equipe por todos os papéis permitidos. A entrega é um teste funcional completo, não correção especulativa: novo `scripts/company-acceptance-e2e.cjs`, invocado antes do navegador no HTTP journey sem alterar qualquer chamada/assertiva anterior.

O teste exige API/PostgreSQL local descartável, duas empresas, signup/login reais, convites admin/manager pelo SDK+HTTP, papel legado company com UMA membership nova de fixture SQL em identidades/tenant recém-criados (não existe convite público company; não é prova de provisionamento público). Não altera políticas, grants, privilégios ou roles do banco. Depois todos os quatro papéis executam publicação pelo publishJob real, leitura, criar equipe, incluir/repetir sem duplicar/remover membro conhecido por assignment real, contagens e dashboard. Inclui estados vazios/erro, contexto velho, gestão owner-only403, foreign/outsider401, profissional400/403 e inputs400. Negativas devem manter snapshots integrais de oito tabelas/dois tenants e ACL/policies; outro tenant permanece intacto também após positivos. Papéis são conferidos via /me e persistência é testemunhada pelo banco.

Local nesta preparação: node--checkPASS; execução CI=0 recusa antes de carregar PG/acessar rede. **Não há PASS local HTTPPG nem execução RN/nativa.** Provas reais e critério→código→CI→SHA ficarão em `docs/evidencias/COMPANY_ACCEPTANCE_JOURNEY_2026-10-22.md` e no recibo terminal do PR. CI completo próprio e literal pós-merge são obrigatórios; nenhum rerun do mesmo SHA para obter verde. APK N/A por identidade integral dos arquivos mobile/dependências/lock/workflows/build/smoke: somente scripts de teste e documentação mudam.

Os seis originais são prefixo integral preservado. #574/#565 continuam drafts e não contêm esta jornada; nenhum código desses PRs foi importado. React mobile19.1.4/RN0.81.6/lockfile, tenant/RLS, ACL, LGPD e controles de navegador/CDP/Fetch/CORS/sandbox/LNA/deadlines/assertivas inalterados. Sem produção, PSP, dinheiro real, credencial/serviço/custo externo, root/grants/bypass, aparelho físico ou pentest. O aceite da Área4 continua responsabilidade do assistente e será formalizado somente se o pacote completo e suas provas satisfizerem a matriz.


## Critério → código → prova exigida

| Critério | Fonte real | Execução integrada exigida |
|---|---|---|
| Papéis owner/admin/manager/company | CompanyJobCreateController50acee, TeamsController40ffb, CompanyMembersControllerb63fed | /me confirma membership real; cada papel publica e lê vaga, cria equipe e faz add/replay/remove por SDK; gestão de membros/convites permanece owner-only |
| Convites e administração | company-members85c862, APIcompany-membersb63fed | Owner cria convites admin/manager, destinatários aceitam por SDK+HTTP; não-owner403 sem escrita; demais contratos de single-use/expiry/revocation/rollback permanecem gates existentes autenticados |
| Publicação e ACK | company-job-publication45fb20, API50acee | Exatamente um POST por papel, ACK created vinculado ao body, leitura e testemunha PG de cinco vagas exatas incluindo seed |
| Equipes e worker conhecido | teams eeeab168, dashboarda865a5, APIteams40ffb | Worker nasce de profile/availability/interest/confirm reais; quatro equipes vazias, add+replay único e remove confirmado; zero duplicatas/restantes; knownProfessionals/dashboard reais |
| Contexto/estados | sameTeamContext/sameManagementContext/loadCompanyDashboard | loading/empty/error já nos testes canônicos; aqui empty real, erro HTTP real, contexto token/tenant diferente rejeitado e dashboard stale sem leitura |
| Isolamento/negações | AuthService ab715c, DatabaseService e RLS atuais | Oito tabelas de duas empresas iguais após requests negadas/malformadas; tenantB igual após todos positivos; classes/policies/ACL idênticas |

### Origem do papel legado company

Signup público de empresa produz owner e convites aceitam owner/admin/manager. A fixture cria um único tenant_memberships(role=company) para identidade profissional recém-criada e tenant fresco, depois da validação do peer PG/CI e teste de ausência. Não muda roles do banco, políticas, grants, autenticação ou produto; não se alega caminho público para gerar esse papel. Todas as operações empresariais seguintes são HTTP reais com o token dessa identidade e membership obtida por /me. Os demais papéis vêm de signup/convite HTTP.

### Limites da prova

Nenhum runtime/app mobile foi alterado; não há bug fabricado. SDK é código real com JSON HTTP real, sem RNrender/SecureStore/formulário físico. Não é teste de PSP/produção. Guardas partem de professional-chronology-e2e.cjs(a32c84e...), exigem CItrue/1, APIhttp loopback com porta explícita e DBmlivretrabalho_http no socketloopback antes de carregar PG. HTTP redirecterror e timeout15000 permanecem. Qualquer falha termina CI1; não há businessautoretry ou fallback de assertiva. Apenas a fixture local é semeada por SQL delimitado.

## Validação anterior à publicação

Node24.19.0, node--checkPASS. CI=0: exit1, COMPANY_ACCEPTANCE_FAIL/local-configuration/assertion_failed, antes de PG/rede. Isso não é teste funcional HTTPPG PASS. Não há testes unitários novos artificiais; a entrega é a jornada integrada nova, e o CI completo executará também todos os testes existentes. Root HTTP reversível retirando apenas o comentário de duas linhas + chamada e linha vazia; todos os hooks anteriores, inclusive ledger/auth/notification e browser obrigatório, são preservados.

## Rastreabilidade e preservação

Base322c049, árvore d9c8f74. Só dois caminhos de script + seis originais append-only + este recibo. Todos os blobs não documentais fora do rootHTTP e script novo permanecem idênticos. Mobile173arquivos, React mobile19.1.4/RN0.81.6, lock/workflows/build/smoke inalterados: APK N/A integral, não um APK emprestado. #574/#565 revisados por lista completa de arquivos e não contêm a jornada; permanecem drafts. Evidência completa própria e literal pós-merge será registrada no PR; nada de ProductionTruth/SUCCESS futuro é alegado aqui.

Manifesto dos seis prefixos preservados:

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "originalBlob": "dc6b16f11ea99100326b89150e3b2b49ff36126e",
    "originalChars": 3886794
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "originalBlob": "c0a6fc59853580942286425f5e359f743d9d265f",
    "originalChars": 4220440
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "originalBlob": "fc2745c99cd248be5d6cf940f36a4315f5dd0204",
    "originalChars": 3876926
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "originalBlob": "cc4b9b1998cd2205023725cd48f647ff646a8b4d",
    "originalChars": 3871815
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "originalBlob": "168bf4d6d3e68e2c23e5985f709115d9ff3536ce",
    "originalChars": 3872737
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "originalBlob": "9e4e9079c744deee901197a72148c65bb02b9f9b",
    "originalChars": 3469642
  }
]
```

## Fecho precedente consolidado (#607)

Formaliza o aceite técnico/funcional interno da Área 6, restrito a ledger e Ganhos SIMULADOS, após verificar código, jornadas HTTP/PostgreSQL, CI e APK próprios e literais pós-merge do #573. Resultado normativo: áreas 2,3,6,9,10 aceitas; oito áreas pendentes. Não aprova PSP, dinheiro real, produção, teste físico ou pentest.

Sete caminhos: apêndice nos seis originais normativos (prefixo integral verificado por readback dos blobs) e recibo `docs/evidencias/AREA6_INTERNAL_ACCEPTANCE_2026-10-22.md` com requisito→código→teste→CI→SHA, hashes ZIP/APK e limites. #605 já integrado e CI literal39718451637 SUCCESS. #584 encerrado sem novo merge porque seus dois arquivos funcionais têm exatamente os blobs integrados pelo #573; branch/corpo/história preservados. #574/#565 permanecem drafts.

Base `c4bd0afb5993d347e4a3996bad03f16644886d4a`; HEAD `37da42ecf62fb0d6d1000d065c40e3de6c1d8a22`; árvore `d9c8f74e19d469765f8caac7df4c1a12a0d79869`. Nenhum delta runtime/teste/workflow/dependência/lock/build/smoke. APK N/A para este pacote documental por identidade integral dos insumos; APKs de produto estão identificados pelo checkout real no recibo.

Gates já verificados do produto: CI39638859504 + APK39638859659 SUCCESS (sintético7677ac3/árvore080e); pós-CI39708675039 + pós-APK39708675307 SUCCESS (literal1b854/mesmaárvore). Próprio e pós ZIP/APK baixados, CRC e SHA256/SUMS verificados.1936 testes e jornada financeira/browser/ProductionTruth SUCCESS; install/launch semMetro.

Este PR aguarda CI completo próprio, revisão fresh main/base/head/diff e integração única com expectedSHA; após isso CI literal pós-merge obrigatório. Nenhum resultado futuro é declarado.

## Gate próprio verificado — 22/10/2026
CI [39826659519](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39826659519), tentativa1/job119991615012, COMPLETED SUCCESS. Checkout primário2026-10-22T17:54:15.0111138Z sintético `ab44094f912abe6eb20b95137d2f48a8559cc743`, pais[basec4bd,HEAD37da], árvore `d9c8f74e19d469765f8caac7df4c1a12a0d79869` idêntica ao candidato.1936=[217/1186/519/3/11], zero fail/skip/cancel; tipos/build/export/migrations/privacy/HTTPPG/ledger PASS. Matriz12/12+canonical PASS17:59:11Z; split/saldo negativo PASS18:00:02Z; ProductionTruth PASS18:00:25.6994961Z.

Revisão fresh: main/basec4bd e HEAD37da inalterados; sete caminhos100644,219 adições/zero remoções, seis originais prefixo integral/readbackexato e recibo novo. Todos533blobs não documentais, inclusive173mobile, têm os mesmosSHAs/modos. APK N/A integral. #584 corpo terminal completo/readbackexato, closed semmerge/branch preservada. Issues215219220224228OPEN;574565DRAFT. Integração normal com expectedHEAD37da; pós-CI literal ainda pendente até o resultado real.


## Recibo TERMINAL — integração e aceite consolidados — 22/10/2026

**Área6 APROVADA TÉCNICA E FUNCIONALMENTE NO ESCOPO INTERNO SIMULADO. Áreas2,3,6,9,10 aceitas; oito pendentes:1,4,5,7,8,11,12,13.** O aceite foi emitido pelo assistente conforme delegação; não há espera por aprovação humana.

- Merge normal único, com expectedHEAD `37da42ecf62fb0d6d1000d065c40e3de6c1d8a22`: main literal `322c049e09553f8d3b845f013ca3e3c0802c2bfc`, árvore `d9c8f74e19d469765f8caac7df4c1a12a0d79869`, pais ordenados[ `c4bd0afb5993d347e4a3996bad03f16644886d4a`, `37da42ecf62fb0d6d1000d065c40e3de6c1d8a22` ]. Git e main fresh confirmados após o resultado final.
- CI próprio39826659519/job119991615012/attempt1 SUCCESS e CI literal pós-merge [39827910512](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39827910512)/job119996007542/attempt1 COMPLETED SUCCESS. Nenhum rerun/cancel.
- Checkout primário pós-merge2026-10-22T18:03:02.8885466Z **LITERAL322c049**.1936=[217Web1186mobile519API3CLI11monitor] testes PASS, zero fail/skip/cancel. Todos os passos de tipo/build/exportAndroid/migrações/privacidade/HTTPPG/ProductionTruth SUCCESS.
- Marcadores próprios no literal: LEDGER_COMPLETION_INSERT_ROLLBACK_PASS18:05:26.1251652Z; LEDGER_MOBILE_REAL_JSON_PASS18:05:26.1484525Z; LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS18:05:26.1487863Z; matriz12/12+canonical PASS/MATRIX0 em18:07:19Z; split/reembolso/saldo negativo exatos PASS18:07:57.4048817Z; ProductionTruth PASS18:08:16.0115055Z.
- Sete caminhos normativos/evidência100644 aprovados; prefixos integrais dos seis originais/readback remoto exato; todos533blobs não documentais e173mobile byte/modo idênticos à base. **APK N/A desta formalização documental**; APKs próprios/literais do produto573 com ZIP+APK/hashes/SUMS/BUILD_INFO/smoke semMetro estão no recibo Git. Nenhum APK literal322c é alegado.
- Conferência de dependências: mobile packagee1646b usa React19.1.4/RN0.81.6; lockc1a67de447f42375a02a05a03661037262f9cd8d intacto. Web já resolveReact19.3.0 na base e permanece igual; a preservação do pinReact19.1.4/RN0.81.6 refere-se ao mobile. Nenhuma atualização de dependência foi feita.
- #584 CLOSED SEM MERGE adicional, corpo anterior completo preservado e readback exato; os únicos dois arquivos funcionais coincidem com573. Branch/história preservadas. Únicos PRs abertos574/565 permanecem DRAFT nos respectivos HEAD4770c1d/aa0d375; não foram alterados.
- Issues externas215/219/220/224/228 OPEN na leitura direta; não há aprovação de PSP/KYC/contratos/dinheiro real/produção/pentest/aparelho físico/SecureStore ou formulário RN nativo. Browser/security/tenant/RLS/LGPD e deadlines inalterados. ProjectActivityWatch não substituiu CI.

Este terminal supersede somente as frases de gates pendentes na preparação acima e no capítulo Git anterior à execução; não apaga a história nem cria commit de status autorreferente. A entrega efetiva é a formalização de uma jornada interna concluída com evidências completas, além da eliminação segura da duplicação584. Não foi declarada nova área por número de testes.

### Próximo passo técnico registrado
Pré-auditoria limitada da próxima jornada (sem novo aceite/teste/código): CompanyJobCreateController50acee e TeamsController40ffb permitem owner/admin/manager/company; CompanyMembersControllerb63fed mantém administração de convites owner-only. Os HTTP fixtures de onboarding869b3b, membrosd6724a, entrada de membrosc87fff, equipe814b53/alocação90e1af e SDK0e48f8 foram relidos. Há prova real de owner/publicação/equipe, admin aceito + negação403 para gerar segredo, single-use/sole-owner e contexto/tenant. Nos casos de publicação/equipe selecionados e nos três unitfiles81f45b/1272ed/325ce0, o ator positivo é owner; não atribuir por arrasto um E2E completo aos papéis admin/manager/company. Próximo passo: inventariar os demais scripts por papel e fechar a jornada de empresas/equipes com uma matriz de autorização HTTPPG real ligada aos clientes/ACK/estados; não fabricar bug ou afirmar ausência global de cobertura pelo recorte. Nenhum aceite adicional à Área6 foi emitido.

