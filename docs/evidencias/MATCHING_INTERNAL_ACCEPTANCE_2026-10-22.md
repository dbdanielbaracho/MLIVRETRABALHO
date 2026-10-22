# Aceite técnico interno — Área5 — 22/10/2026


---

## Aceite técnico interno da Área5 — matching/alocação/substituição — 22/10/2026

**Decisão do assistente por delegação expressa: ÁREA5 APROVADA TÉCNICA E FUNCIONALMENTE NO ESCOPO INTERNO.** Supersede somente pendência/candidatura temporal da Área5; todo o histórico é preservado. Não depende de aprovação humana/CONTINUAR.

Base auditada main `4b8f2c817cfd6df73ff56fc859efcfcc54502a27`, árvore `eb1779a73185fd7f6264e1eb8f0dc1eb08d7b639`, merge normal610/HEADa71ff7f2d2f41c5595cba046ff81bb524cb8bd55. CI próprio39842989991/job120048743242SUCCESS, checkout sintético8b5d3ec7763dcca0f1ab366a424ede080cfbb28c/mesma árvore/pais[dd696,a71]. CI literal pós-merge39843862544/job120051823121SUCCESS/checkout19:52:42.9020125Z LITERAL4b8.1936cases[217Web1186mobile519API3CLI11monitor]PASS0fail-skip-cancel, tipos/build/exportAndroid/migrações/privacy/HTTPPG/browser12+canonical/MATRIX0/ProductionTruthPASS. Nenhum rerun/cancel.

A matriz5 exige idempotência, concorrência, disponibilidade, escolha humana e vínculo empresa-profissional. Nova jornada MATCHING_ACCEPTANCE_HTTP_PG_PASS própria19:48:57.0542074Z e literal19:55:17.7693115Z usa quatro SDKs reais (company-candidates/company-replacements/teams/jobs) contraHTTP/PostgreSQL local: ranking por função/cidade/disponibilidade sem writes, confirmação humana de candidato de ranking inferior, replay factual sem duplicar assignment/membership/alerta, membership por confirmação real, equipe/pool e allocation real/vazio fora da janela; pedido aberto com replay sem duplicar, auto-match apenas recomendação sem cancelar/alocar, seleção explícita de outro candidato disponível, ACK/agenda/notificação vinculados, replay fechado rejeitado sem retarget/duplicação, negativas mantêm7tabelas2tenants/tenantB/ACLpolicies.76requests60POST são totais de auth/setup/negativas/ações, não60confirmações.

Concorrência no MESMO SHA literal: confirmações por barreiraPG19:55:11.1020838Z retornam dois recibos iguais/uma alocação/um alerta; seleção por barreira19:57:07.0929166Z gera um matched/outro400closed/um substituto/um alerta; criação/cancelamento19:57:07.2322890Z mantém assignment/request terminalmente cancelados. Rejeição de candidato já cancelled/completed preserva original/request/earnings/alertas. Fixture de notificação causa falha real no INSERT de replacement-select e prova HTTP500/rollback íntegro/limpeza; testes separados de controller+DB com clientes simulados preservam erro primário em INSERT/COMMIT+rollbackfalho, sem alegar SQL real nessa parte. Testes de handlers pré-JSX/clock/contexto/ACK/deadline/unknown passam na mesma CI; não são renderRN.

Limites de contrato preservados: confirm não impõe disponibilidade; ranking/allocation/select a verificam. A tela Substituições oferece o recomendado e exige confirmação humana; seleção de outro candidato é provada no SDK/API, não anunciada como nova opção de UI. Auto-match nunca seleciona. Replay de confirm é ACK existente; replay de SELECT fechado é erro factual, não ACK idempotente. Não é nova política/algoritmo de matching, previsão ML, preferências sem contrato, enforcement financeiro, produção ou precisão de mercado real.

Cadeia completa e manifestos em `docs/evidencias/MATCHING_INTERNAL_ACCEPTANCE_2026-10-22.md`; candidato MATCHING_ACCEPTANCE_JOURNEY_2026-10-22.md preserva fonte integral do novo teste e recibo609. Script8e984d6b465c1821f119c028577b0a7856d45695/rootHTTP737fd85d0d7095ae2e98738cd5a879caeba6e44f; nenhum runtime/API/mobile alterado. Seis originais são prefixo integral+apêndice, sem resumos substitutivos. Este PR documental exige CI completo próprio e literal pós-merge; recibos terminais no corpo do PR, sem commit de status autorreferente.

**Matriz vigente: áreas2,3,4,5,6,9,10 CONCLUÍDAS INTERNAMENTE; seis pendentes:1,7,8,11,12,13.** Não é percentual de código nem aceite globalRLS7/security8/backend11/layout1 por arrasto. Sem Production-DONE, RNformrender/SecureStore nativo, VisualTruth/aparelho físico, PSP/KYB/KYC/contrato/dinheiro real, provider/pentest/produção. Externos215/219/220/224/228 separados e574/565 drafts.

APK N/A para610teste/scripts e este delta documental:184insumosprotegidos/173mobile BYTE-IDÊNTICOS ao produto literal1b85403cafd9e17bceeb3ea47ce27fdf03c1496e, APK39708675307SUCCESS/artifact12396378712unexpired revalidado nesta entrega. Não há APK literal4b8 ou deste novo SHA. React mobile19.1.4/RN0.81.6/lockfile, LGPD/tenant/RLS/auth/ACL, browserCDPFetchCORSsandboxLNA15s/asserts intactos. Sem custo/serviço/credencial externa/root/grants/bypass.

Próxima frente: critérios7/11 exigem inventário completo de tabelas/endpoints e contratos/autorização/negativas; os sete snapshots desta jornada não são esse inventário. Revalidar fontes atuais e escolher prova integrada necessária, sem contar microtestes como aceite. Projeto continua; nenhuma promessa de execução ininterrupta.


| Critério | Código original versionado | Teste e evidência reais |
|---|---|---|
| Idempotência | company-jobs.confirm/confirmationDecision; replacement.create/select | ACK repetido confirmado e snapshot igual; create aberto único; SELECT fechado rejeitado sem writes |
| Concorrência | locks/transação tenant dos controllers | fixtures company-confirmation/replacement-selection cruzam barreiraPG real no próprio e pós610 |
| Disponibilidade e recomendação | rankCandidates/scoreMatch, replacement.ranked, TeamAllocationController | SDKs leem ranking real, indisponível excluído, allocation vazio fora da janela, seleção indisponível400 preserva fatos |
| Escolha humana | confirm/select POST explícito; auto-match readonly | cliente real confirma opção inferior; auto-match não altera; outro disponível selecionado explicitamente viaSDK/API |
| Vínculo/isolamento | auth/context/membership/active functions + ACK | agenda autenticada do substituto comjob/tenant/assignment; foreign/profissional negados,7tabelas2tenants intactos |
| Prazos/unknown | candidatos/Substituicoes + session/ACK helpers | testes canônicos existentes reexecutados mesmos1936, fixtures explícitas de hooks/clock/JSON; não nativeUI |

## Manifesto das fontes auditadas
```json
[
  {
    "path": "apps/mobile/lib/company-candidates.ts",
    "sha": "d042f8221b70cca7c984138d941f185d94c89ba5"
  },
  {
    "path": "apps/mobile/lib/company-replacements.ts",
    "sha": "7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6"
  },
  {
    "path": "apps/mobile/lib/teams.ts",
    "sha": "eeeab168bfb62c62f2552d28bd6600ae23adada1"
  },
  {
    "path": "apps/mobile/lib/jobs.ts",
    "sha": "54d0814ace6e91565e0fa9c8722ea734594b015f"
  },
  {
    "path": "apps/api/src/company-jobs.controller.ts",
    "sha": "e888c6a6db28bd3f48223f150a5895ffc6c26d9c"
  },
  {
    "path": "apps/api/src/team-allocation.controller.ts",
    "sha": "a316e0362c7d4de75bcf8cf0c347b6d21bfcac7f"
  },
  {
    "path": "apps/api/src/replacement.controller.ts",
    "sha": "809c27f1551c103adc9e6950f79555eb42d3b7db"
  },
  {
    "path": "scripts/http-replacement-e2e.sh",
    "sha": "f1025db62e0e534d874fa7252123f29e749f07a0"
  },
  {
    "path": "scripts/replacement-selection-concurrency-e2e.cjs",
    "sha": "e96d0d8b6755d75829095da0435805f9b5dbe7a6"
  },
  {
    "path": "scripts/company-confirmation-concurrency-e2e.cjs",
    "sha": "ec5e6e8e08390d5cbd67f845f9fda0da3a607ff0"
  },
  {
    "path": "apps/mobile/tests/candidate-confirm-deadline.test.mjs",
    "sha": "1da09eeb72786d7553c2caf8828f6ef4d56bd108"
  },
  {
    "path": "apps/mobile/tests/replacement-create-screen-deadline.test.mjs",
    "sha": "d0423c9b93767886251470009fede3a8ad0e34c3"
  },
  {
    "path": "apps/mobile/tests/replacement-match-screen-deadline.test.mjs",
    "sha": "a297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76"
  },
  {
    "path": "apps/mobile/tests/replacement-select-screen-deadline.test.mjs",
    "sha": "747753e9f044c02377a149a815211e5117ea58bc"
  }
]
```
## Manifesto dos normativos antes deste aceite
```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "sha": "ea5504d97544bec23ebcc1bdcf89054291ee1554",
    "utf16Length": 3896483
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "sha": "d46543f6f19de8e950a1d883f1fd60bde4d3b3dd",
    "utf16Length": 4230129
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "sha": "1fbdb8d3fe1549481facfb06266a95ec3c159395",
    "utf16Length": 3886615
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "sha": "53a257bcb6b0b317a8fbac1020fd1964d57425a4",
    "utf16Length": 3881504
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "sha": "20d2bf9ca3561cc7f0f00f5de926e5a17db5da9a",
    "utf16Length": 3882426
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "sha": "5ccd57982afee19aec1850a486b0e62131b88bff",
    "utf16Length": 3479331
  }
]
```
## Recibo terminal610 integral, preservado como fonte histórica
Liga quatro SDKs reais à jornada de matching/alocação/substituição em API/PostgreSQL local descartável. Cobre ranking/disponibilidade, escolha humana de candidato inferior, confirmação/replay sem duplicar, allocation/auto-match somente leitura, pedido/replay aberto, seleção explícita/ACK/agenda/notificação, replay fechado rejeitado e isolamento de sete tabelas/dois tenants. Não altera runtime/políticas/ranking; não alega UI para escolha alternativa que só existe no SDK/API.

Base dd696b16c56c8d623e572ce080be3d7823e5438a; HEAD a71ff7f2d2f41c5595cba046ff81bb524cb8bd55; árvore eb1779a73185fd7f6264e1eb8f0dc1eb08d7b639. Nove caminhos: teste funcional novo, uma chamada adicional no rootHTTP e seis capítulos append-only + recibo MATCHING_ACCEPTANCE_JOURNEY_2026-10-22.md. Todos os hooks/asserts/browser12+canonical anteriores e fixtures PG de concorrência preservados. Seis originais completos prefix/readbackexato. APK N/A por identidade integral mobile/workflows/build/smoke/deps/lock e grafo ExpoGradle; não APK literal novo.

Local: node--checkPASS; CI=0 recusa antes de PG/rede. CI completo próprio e literal pós-merge obrigatórios e ainda pendentes; nenhum aceite5 antecipado. Áreas2/3/4/6/9/10 aceitas, sete pendentes. Sem PSP/produção/dinheiro real/serviço/custo/credencialexterna/root/grants/bypass/physical/nativeclaim. #574/#565 continuam drafts; externos separados. Métodos/erros documentados sem mudar contrato: confirm não impõe disponibilidade; ranking/allocation/select impõem; SELECTreplay é rejeitado e não ACK idempotente.

## Gate próprio concluído — 22/10/2026
CI39842989991/job120048743242/attempt1 COMPLETED SUCCESS. Checkout19:46:45.0177723Z sintético8b5d3ec7763dcca0f1ab366a424ede080cfbb28c, pais[dd696b16c56c8d623e572ce080be3d7823e5438a,a71ff7f2d2f41c5595cba046ff81bb524cb8bd55], árvoreeb1779a73185fd7f6264e1eb8f0dc1eb08d7b639 idêntica ao candidato Git.1936=[217Web1186mobile519API3CLI11monitor]PASS/0fail-skip-cancel; todosfoundationstepsSUCCESS. MATCHING_ACCEPTANCE_HTTP_PG_PASS19:48:57.0542074Z/76requests60POSTtotais/4SDKs, não60confirmações. Concorrência confirmação19:48:51.9589829Z, seleção19:50:25.1643389Z e criação/cancelamento19:50:25.2994103Z atravessaram barreirasPG reais. Matriz12PASS+canonical/MATRIX0 19:50:22.2061598Z; ProductionTruth19:51:08.8767529Z.

Freshmain/base/head/diff9pathsmodosrevistos;173mobile e184insumosprotegidos idênticos ao produto APK medido1b854. APK N/A; não APK literal novo. Seis originais FULLprefix/readbackexato. A primeira tentativa de publicar ref via update_ref foi recusada422 por ref inexistente; create_branch criou ramo correto e uma única PR610; nenhum force/PR duplicado/rerun de CI. Ainda exige mergeexpectedHEAD e pós-CI literal; nenhum resultado futuro é presumido.


## Recibo terminal610 — pós-merge comprovado
Merge normal4b8f2c817cfd6df73ff56fc859efcfcc54502a27, pais[dd696b16c56c8d623e572ce080be3d7823e5438a,a71ff7f2d2f41c5595cba046ff81bb524cb8bd55], árvoreeb1779a73185fd7f6264e1eb8f0dc1eb08d7b639 idêntica ao candidato. [CI literal39843862544](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39843862544)/job120051823121/attempt1 COMPLETED SUCCESS/zero retry. Checkout literal19:52:42.9020125Z.1936=[217/1186/519/3/11]PASS0fail-skip-cancel; todosfoundationstepsSUCCESS.

MATCHING_ACCEPTANCE_HTTP_PG_PASS19:55:17.7693115Z com mesmos quatro SDKs e76requests60POSTtotais da fixture, não60confirmações. Confirmações concorrentes19:55:11.1020838Z, seleção concorrente19:57:07.0929166Z e corrida criação/cancelamento19:57:07.2322890Z com barreirasPG reais. Matriz12PASS e canônico19:57:03.4801095Z/MATRIX0 19:57:03.4801387Z; ProductionTruth19:58:01.3531704Z. O teste não altera contratos nem implementa nova política de disponibilidade, UI ou ranking.

Atualmain4b8/treeeb1779 confirmada. Runtime/APIs/mobile/deps/lock/workflows/build/smoke intactos; APK N/A positivo por184insumosprotegidos/173mobile idênticos ao produto medido1b854. Não há APK literal4b8, nem prova RNformrender/SecureStore/aparelho físico/produção/provider/pentest/dinheiro real. Zero cancel/rerun/force/merge duplicado. #574/#565 permanecem drafts; externos215/219/220/224/228 separados.

Próximo pacote: formalizar aceite5 com requisito→implementação→testes→CIpróprio→pósliteral→evidência, por7paths documentais append-only. Antes dessa formalização, a última matriz integrada ainda registra6aceitas/7pendentes. Resultados desta formalização futura não são antecipados.

