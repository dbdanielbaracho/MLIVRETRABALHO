# Validação real da entrada de publicação na API

## Validação real da entrada de publicação na API (2026-10-11 05:50:14 UTC)

CompanyJobCreateController foi confrontado com CompanyJobsController (candidatos/confirm), JobsController (marketplace/interest), a migration0005 e o fluxo HTTP existente. A criação real fica em company-job-create.controller.ts: body JSON não era validado em runtime. title/location/requiredRole/workCity de tipo errado causavam TypeError (500); datas numéricas podiam ser aceitas; modality falsy podia chegar à constraint; payCents fora de integer PostgreSQL chegava à escrita. Oito testes novos do controller real: antes5falhas/3sucessos, depois8/8 locais com dependências DB/auth/Nest explícitas; transformador Node24 remove apenas decorators/imports nativos para o fixture. Isso não é typecheck completo, Nest/Fastify real nem PostgreSQL real; estes são gates do CI.

Agora o handler aceita body unknown, autentica e verifica membership/papel antes de examinar a entrada. Body precisa ser objeto; título e campos opcionais de texto precisam de tipos corretos; datas precisam de strings parseáveis e fim posterior ao início. Modalidade não nula precisa de enum existente. payCents precisa caber na coluna integer não negativa da migration0005 (0..2147483647 centavos), sem criar política comercial nova. Erro de entrada resulta em 400 antes de iniciar this.db.tenant/INSERT. Falha de DB continua erro de servidor incerto, nunca reclassificada como entrada inválida.

Valores válidos preservam trim/null/defaults (requiredRole=título, pay=0, modalidadegig), timestamps canônicos, row real do banco e bind do tenant autorizado. Campos extras de autoridade/id do payload não são usados. SQL/retorno/GET/tenant/RLS/roles/esquema ficam integrais; nenhum dedupe, idempotência ou deploy foi criado. A recuperação durável de publicação incerta continua aberta conforme #433, sem reset/bypass pelo tipo de corpo.

scripts/http-company-job-input-e2e.sh adicionado ao passo HTTP do CI já existente: somente localhost descartável, duas empresas/owners de fixture, 34corpos malformados retornando400 e GETs comprovando lista anterior intacta/outrotenant vazio, auth401/membership403 antes de body{}, ACK válido/defaults e limite representacional integer. Bash syntax aprovado e URL externa recusada antes de rede. O script ainda depende de aprovação efetiva do CI neste head para provar Nest/Fastify/PostgreSQL; não antecipar PASS. Unit fixtures não comprovam isolamento do banco sozinhas.

APK para esta fatia API/test/script/CI/docs é NÃO APLICÁVEL por paths do workflow standalone EXISTENTE: nenhuma alteração em apps/mobile, scriptbuild/smoke, workflowstandalone, pacotes/lock/workspace. Árvore mobile de referência #434 éaf6a826aa9c1139a2e92a184703509c700a5fbfd, a verificar idêntica no novo head e na main após predecessor aprovado. Isso não dispensa APK próprio de434 nem seus gates pós-merge e não permite atribuir um APK de434 ao SHA API novo. CI próprio deverá aprovar4web/699mobile/153API/3CLI com typecheck/build/export/migrations/privacy/HTTP e marcador explícito do novo script.

Estado: mainb00be864d6ed6c7383f9f5267df054dad6907535; #420–424 integrados em ordem com própriosCI/APK e tree/pais/main comprovados. Pós420/421/423/424 agora completos CI+APK em SHAs reais, todos install Success/DEVICE_SMOKE_OK sem Metro/artifacts ZIPexatos não expirados. Pós422 CI aprovado e APK ainda pendente. #425 APK tentativa2run38113622026/job114397880306 está no smoke desde05:40:10Z, após build success; não repetir rerun em execução. PrópriosAPKs426–429aprovados. #434 headdac8aa1f1aecc1f92206a3d928e88b60e06968cf/tree4a24da3845f0235b610d1bfb301df0ccd7e6e5bd CI38115726584/job114400119592 aprovado4/699/145/3, HTTP05:45:26.8432072Z; APK38115726677 pendente. #433CI38115519749/job114399532651 aprovado4/685/145/3, HTTP05:42:26.2983523Z. Emulador não Android físico; digestZIP não APK individual.

Próxima ação: publicar fix/company-job-input-runtime-validation sobre #434/headdac8aa1f1aecc1f92206a3d928e88b60e06968cf basefix/conversation-send-ui-deadline; conferir bytes/diff/tree mobile e CI4web/699mobile/153API/3CLI+novoHTTP no head exato. N/A APK condicionado aos paths/árvore mobile e predecessor434APK aprovado. Acompanhar425tentativa2 e pós422; integrar425→426→427→428→429→430→431→432→433→434→esta fatia em ordem após retarget/revisão/gates aplicáveis e SHA/pais/tree/main, com pós-gates próprios. Persistir evidência atual/final em ORIGINALv1.104/memória/checkpoint/requisitos/registry sem criar substituto resumido.

Auditoria segura seguinte: outras entradas mutáveis da API que usam tipos TS sem validar JSON e mutações de Membros/Equipes/Talentos/Agenda/painel/candidatos/substituição/casos/privacidade com deadline/unknown/ACK específicos. Não inferir bugs de cópia local; reconsultar main. Preferências/ajuda semmembership/ML/enterprise requerem definições/dados/contrato; físicoAndroid/E2E/VisualTruth/SecureStore/OScrash/teclado/payload/restart/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago separados/abertos. React19.1.4/RN0.81.6/lockfile/desenho/tenant/RLS preservados; sem dinheiro real, novas cobranças/serviços/infraestrutura/deploy pago. Bloqueio parcial não encerra o projeto.

```json
{
  "posts": [
    {
      "pr": 420,
      "sha": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
      "tree": "f7c9a8ae4947125d38ca87c892412a15fa271f84",
      "parents": [
        "83d5df28f11395522aa5e8e776a38bab491e0a91",
        "56e8229ada3bdb44042b9d208357f10ef91cdad8"
      ],
      "ci": {
        "head": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
        "run": 38114053725,
        "job": 114395297104,
        "attempt": 1,
        "counts": [
          4,
          497,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T05:14:55.8805366Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "head": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
        "run": 38114053744,
        "job": 114395297192,
        "attempt": 1,
        "steps": "success; diagnostics skipped",
        "markers": [
          "2026-10-11T05:35:10.7875902Z Success",
          "2026-10-11T05:36:04.3498698Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11692968057,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28908644,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692968057",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692968057/zip",
          "expired": false,
          "created_at": "2026-10-11T05:36:17Z",
          "expires_at": "2026-10-25T05:36:15Z",
          "updated_at": "2026-10-11T05:36:17Z",
          "digest": "sha256:4fba811cdbaed67401f613028daecddbe77c7989c2fca3f1809da343133af0dc",
          "workflow_run": {
            "id": 38114053744,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "64c5f2a09969e76d7077858af4a0623f2b43ce38"
          }
        }
      },
      "pending": false
    },
    {
      "pr": 421,
      "sha": "9ff2ef5a3c30e42a1908949053e6849b07f50651",
      "tree": "dcaec82502bd76f39d4fd4a347b049c048454253",
      "parents": [
        "64c5f2a09969e76d7077858af4a0623f2b43ce38",
        "66223caf499c01042b40fba82f96da301f0a429b"
      ],
      "ci": {
        "head": "9ff2ef5a3c30e42a1908949053e6849b07f50651",
        "run": 38114405806,
        "job": 114396322832,
        "attempt": 1,
        "counts": [
          4,
          510,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T05:21:37.8794127Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "head": "9ff2ef5a3c30e42a1908949053e6849b07f50651",
        "run": 38114405753,
        "job": 114396322589,
        "attempt": 1,
        "steps": "success; diagnostics skipped",
        "markers": [
          "2026-10-11T05:43:00.2627704Z Success",
          "2026-10-11T05:44:03.0732896Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693273191,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28908865,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693273191",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693273191/zip",
          "expired": false,
          "created_at": "2026-10-11T05:44:17Z",
          "expires_at": "2026-10-25T05:44:15Z",
          "updated_at": "2026-10-11T05:44:17Z",
          "digest": "sha256:b4fb827365a907f38d02d1d9cb46659260e75c8722e3b665c27efd252ec72f4c",
          "workflow_run": {
            "id": 38114405753,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "9ff2ef5a3c30e42a1908949053e6849b07f50651"
          }
        }
      },
      "pending": false
    },
    {
      "pr": 422,
      "sha": "cfb7d838697006d03c0ac1c9873d4ad1da08679a",
      "tree": "aebd7cd351dd71378f0f097e8efa5d5f84e911d2",
      "parents": [
        "9ff2ef5a3c30e42a1908949053e6849b07f50651",
        "0e768ab142665d0f088d287b6db73002900a8b98"
      ],
      "ci": {
        "head": "cfb7d838697006d03c0ac1c9873d4ad1da08679a",
        "run": 38114552142,
        "job": 114396746370,
        "attempt": 1,
        "counts": [
          4,
          528,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T05:24:16.5108841Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "pending": true,
        "run": 38114552077,
        "status": "in_progress"
      },
      "pending": true
    },
    {
      "pr": 423,
      "sha": "7993dd0c5f4646b2e9b48b79923041b9f3a842dc",
      "tree": "2d8d47f20eb0af7ff93578d9793a8b9b2fb84521",
      "parents": [
        "cfb7d838697006d03c0ac1c9873d4ad1da08679a",
        "68535d37567b898dfd1f6f2bac078d52fd7f9aa8"
      ],
      "ci": {
        "head": "7993dd0c5f4646b2e9b48b79923041b9f3a842dc",
        "run": 38114600972,
        "job": 114396889499,
        "attempt": 1,
        "counts": [
          4,
          571,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T05:25:23.3733535Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "head": "7993dd0c5f4646b2e9b48b79923041b9f3a842dc",
        "run": 38114601054,
        "job": 114396889937,
        "attempt": 1,
        "steps": "success; diagnostics skipped",
        "markers": [
          "2026-10-11T05:44:46.8049714Z Success",
          "2026-10-11T05:45:37.0337105Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11692968952,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28908930,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692968952",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692968952/zip",
          "expired": false,
          "created_at": "2026-10-11T05:45:51Z",
          "expires_at": "2026-10-25T05:45:48Z",
          "updated_at": "2026-10-11T05:45:51Z",
          "digest": "sha256:d1803f5a053dd6077e3f10fb25f35050ff4059dd35111f6f1e2202b3eedc6124",
          "workflow_run": {
            "id": 38114601054,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "7993dd0c5f4646b2e9b48b79923041b9f3a842dc"
          }
        }
      },
      "pending": false
    },
    {
      "pr": 424,
      "sha": "b00be864d6ed6c7383f9f5267df054dad6907535",
      "tree": "d95dd99ee320096ee1374b7ecf7117ee8cc8fd7d",
      "parents": [
        "7993dd0c5f4646b2e9b48b79923041b9f3a842dc",
        "1f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da"
      ],
      "ci": {
        "head": "b00be864d6ed6c7383f9f5267df054dad6907535",
        "run": 38114903819,
        "job": 114397757741,
        "attempt": 1,
        "counts": [
          4,
          588,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T05:31:05.9549554Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "head": "b00be864d6ed6c7383f9f5267df054dad6907535",
        "run": 38114903781,
        "job": 114397757527,
        "attempt": 1,
        "steps": "success; diagnostics skipped",
        "markers": [
          "2026-10-11T05:47:00.8404938Z Success",
          "2026-10-11T05:47:41.8306404Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693003998,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28909044,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693003998",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693003998/zip",
          "expired": false,
          "created_at": "2026-10-11T05:48:01Z",
          "expires_at": "2026-10-25T05:47:59Z",
          "updated_at": "2026-10-11T05:48:01Z",
          "digest": "sha256:3b37760f1e38888180e3fc0507ca5d7f65995693017216c73b997831c4d4d5c3",
          "workflow_run": {
            "id": 38114903781,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "b00be864d6ed6c7383f9f5267df054dad6907535"
          }
        }
      },
      "pending": false
    }
  ],
  "ci433": {
    "head": "43a25e2dcb7832b41bca77721b6c02084ef66808",
    "run": 38115519749,
    "job": 114399532651,
    "attempt": 1,
    "counts": [
      4,
      685,
      145,
      3
    ],
    "allSteps": "success",
    "http": [
      "2026-10-11T05:42:26.2983523Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  "ci434": {
    "head": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
    "run": 38115726584,
    "job": 114400119592,
    "attempt": 1,
    "counts": [
      4,
      699,
      145,
      3
    ],
    "allSteps": "success",
    "http": [
      "2026-10-11T05:45:26.8432072Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  "failed425": {
    "head": "8989feeb8206a36a03a268021ba204fa04b2b2c7",
    "run": 38113622026,
    "attempt": 1,
    "job": 114394056827,
    "reason": "Emulator action input keyevent 82 Broken pipe exit224 before app installation/script; build passed; no DEVICE_SMOKE_OK or validated APK",
    "diagnostics": 11693525710,
    "time": "2026-10-11T05:24:03.5502534Z"
  },
  "mobile434": "af6a826aa9c1139a2e92a184703509c700a5fbfd"
}
```


## Continuidade verificada 2026-10-11 05:56:27 UTC — correção de tipagem do PR #435 e gate #425

Main reconsultada: b00be864d6ed6c7383f9f5267df054dad6907535 (#424). #435 ainda não integrado. CI 38116087795, job 114401146934, falhou em Typecheck com TS2345: engagementModality unknown não estava estreitado para string antes de isEngagementModality. Correção inclui typeof string antes do predicado; 8 testes locais repetidos PASS (transformação/stubs, sem alegar typecheck Nest/PostgreSQL local). Novo SHA exige CI completo e HTTP novo; aprovação anterior não é reutilizada.

#425 attempt 2: build PASS e instalação Success em 2026-10-11T05:53:14.8458959Z; lançamento NÃO aprovado. Serviços Android com.android.providers.media.module/com.android.phone tiveram ANR de inicialização; monkey abortou com 0 eventos, sem DEVICE_SMOKE_OK. Job 114397880306 failure; diagnóstico ZIP 11693615584, sha256:d71754c172da54e0e145704470429ea1dd9ad290c208a636151c46542aaea555. Após leitura do log integral, rerun somente desse job solicitado, mesmo head 8989feeb8206a36a03a268021ba204fa04b2b2c7. Attempt 3 pendente; não contornar nem declarar gate aprovado. Próxima ação concreta: acompanhar tentativa 3, integrar #425 somente com gate real; depois #426–#435 em ordem, reconsultando heads, base, diff e main. Se nova falha, diagnosticar log antes de decisão, sem repetição automática ilimitada.

Pós-merge #422 agora comprovado no SHA cfb7d838697006d03c0ac1c9873d4ad1da08679a: CI 38114552142, job 114396746370, 4/528/145/3 testes PASS e HTTP PostgreSQL; APK 38114552077, job 114396746054, install/DEVICE_SMOKE_OK sem Metro; ZIP 11693243776 não expirado, sha256:91c3ec28d0067f6fbe926d263f2bd3da918280f05fa2864cf5b74ad67be3ca95. Portanto #419–#424 têm CI/APK pós-merge comprovados; não transferir essas provas para heads posteriores. Digest refere-se ao ZIP, não ao APK individual.

Documento original v1.104 preservado em lugar; nenhum gate físico/Visual Truth/E2E, pentest independente, PSP/KYC/FIN-RISK ou Web pago foi fechado. Sem dinheiro real/custo/deploy pago. APK de #435 permanece N/A condicional às paths e mobile tree idêntica ao predecessor #434 aprovado; não representa aprovação nativa própria.
