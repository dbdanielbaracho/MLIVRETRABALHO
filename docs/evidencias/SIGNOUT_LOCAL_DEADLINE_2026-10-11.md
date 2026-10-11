# Prazo da saída local preservando sessão posterior

## Prazo da saída local preservando sessão posterior (2026-10-11 05:24:33 UTC)

EmpresaConta.signout/Perfil.signout auditados: abort-only mantém Saindo indefinidamente se auth/fetch não resolve; timer era cancelado antes de clearSessionForAuthorization, deixando leitura/gravação/readback local sem prazo de UI.18novos cenários (9por tela), handlerspré-JSX e createSessionQueue/clearExpectedSession reais, parsers de Perfil reais na carga inicial com adapter explícito: antes12falhas/6sucessos, incluindo ausência do timer na fase local; depois18PASS. Local29/29 (18novos+4session-clear+7session-transaction), Node24 fixtures explícitas. Não é SecureStore/OS crash/renderRN/revogação real no servidor/Android físico.

Timer15s agora permanece até a limpeza local terminar; publica erro de confirmação e libera UI/pending sem alegar logout. Antes de auth concluída, guardfoco+controller+abort impede POST/clear tardio. Depois do despacho da saída explicitamente pedida, Promise.race(fetch,deadline) permite executar a limpeza local da sessão original mesmo quando transporte ignora abort. Não há retry automático de POST nem remoção/bypass de operação nativa da fila. Signal/headers/endpoint/método permanecem os originais.

clearSessionForAuthorization/session-transaction permanecem integrais: expectedToken original é verificado dentro da fila; token+tenant precisam ter readback null para retorno cleared. Somente cleared comprovado e operação/foco atual permitem router.replace('/'); stale/failed não navegam ou dizem saída confirmada. Timer durante armazenamento pendente revela erro, mas não garante storage reparado. A limpeza local explicitamente autorizada pode concluir e navegar mais tarde somente quando de fato confirmada e ainda corrente. Revogação remota em timeout NÃO é comprovada; apagar acesso local não é prova de revogação do servidor. Oldfinally/timer não desbloqueiam/navegam por operação nova; token de login mais recente é conservado. Perfil adiciona ref de controller só para exit, sem interferir nas leituras ou saveProfile; payloads/escritas/rascunhos/layout/nav originais preservados.

Testes separados de profissional/empresa: auth semPOST/clear, clearread/writepartial/readback pendentes, rede ignorando abort com limpeza apenas uma vez e sem esperar resposta, sessão posterior na fila/foco, falha local não confirmada, sucesso oportuno e finally antigo durante nova tentativa pendente. Componentes usam parsers de produção na carga de Perfil; fixturesnão demonstram dispositivo físico. saveProfile inteiro, callbacks de load, JSX/StyleSheets/CompanyNav/ProfessionalNav comparados/preservados byte-identical; fila/token helpers/DB/schema/RLS não alterados.

Estado atual confirmado: main7993dd0c5f4646b2e9b48b79923041b9f3a842dc, #420–423 integradas em ordem com própriosCIs+APKsstandalone completos/steps/logs/install/launch/ZIPhead-digest não expirados; cada commit/pais/tree idêntica ao head aprovado e main verificados. Merges42064c5f2a09969e76d7077858af4a0623f2b43ce38,4219ff2ef5a3c30e42a1908949053e6849b07f50651,422cfb7d838697006d03c0ac1c9873d4ad1da08679a,4237993dd0c5f4646b2e9b48b79923041b9f3a842dc. Smoke de emulador não fecha físico; digests publicados sãoZIPs, não APK individual.
Pós420CI38114053725/job114395297104 counts4/497/145/3 e pós421CI38114405806/job114396322832 counts4/510/145/3 aprovados; APKs38114053744/38114405753 pendentes. Pós422CI38114552142/APK38114552077 em execução; pós423 ainda precisa reconsultar/discoverrun no SHAreal. OwnCIs420–429 aprovados heads exatos4web/497,510,528,571,588,599,610,617,626,637mobile/145API/3CLI com typecheck/build/export/migrations/privacy/HTTP. #429 headb99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c/tree843c3d34f52f8a56339b4ac88a3b3fef4651497f, CI38114334775/job114396112477 aprovado637mobile/145API, HTTP05:19:46.0138169Z; APK38114334761 em execução. #424–429ownAPKs pendentes. Não repetir419/420–423 ou rerun em execução; []/in_progress não sucesso.

Correção factual de timestamp: a cronologia real PostgreSQL do CI423/job114392671499 é04:58:09.0931902Z (não04:58:09.1185913Z digitado no texto do apêndice de suporte). Prova JSON/log já correta, retificar apenas o erro tipográfico nas referências preservando histórico e indicar esta errata.

Próxima ação concreta: publicar fix/signout-local-deadline sobre head429b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c/tree843c3d34f52f8a56339b4ac88a3b3fef4651497f, basefix/signin-session-deadline; conferir bytes/diff e CI esperado4web/655mobile/145API/3CLI+APKstandalone no head exato. Integrar424→425→426→427→428→429→esta fatia somente com ownCI/APK aprovados, retargetmain após predecessor, revalidar diff/merge-base/tree/pais/main e pós-gates no SHAreal. Acompanhar pós420–423+posteriores; persistir provas/artefatos/runs atuais no ciclo.
Auditoria seguinte segura: saveProfile PUT ainda usa abort-only e pode ficar busy; confrontar backend/protocolo de ID/resultado incerto e preservação de draft antes de permitir retry. Demais mutations não idempotentes (convites/publicação/confirmações/casos/substituição/privacidade) exigem guards/unknown/ACK específicos e humano; não liberar indiscriminadamente nem alegar fechamento integral de cobertura.
Preferências/ajuda sem vínculo/ML/enterprise requerem definições/provas; físicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart/piloto, pentest independente, PSP/KYCsandbox/FIN-RISK/providers/TRUST e Web/Railwayeventualmentepago separados/abertos. ORIGINALv1.104 existente atualizado em lugar com histórico integral, memória/checkpoint/requisitos/evidência no mesmo commit. React19.1.4/RN0.81.6/lockfile/tenant/RLS/canônico e sem dinheiroreal/novosserviços/cobranças/infraestrutura/deploypago preservados. Um bloqueio parcial/fim de rodada não encerra projeto.

## Commits e provas próprias420–423

```json
[
  {
    "pr": 420,
    "sha": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
    "tree": "f7c9a8ae4947125d38ca87c892412a15fa271f84",
    "parents": [
      "83d5df28f11395522aa5e8e776a38bab491e0a91",
      "56e8229ada3bdb44042b9d208357f10ef91cdad8"
    ],
    "pre": {
      "pr": 420,
      "head": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
      "tree": "f7c9a8ae4947125d38ca87c892412a15fa271f84",
      "parentMain": "83d5df28f11395522aa5e8e776a38bab491e0a91",
      "mergeBase": "83d5df28f11395522aa5e8e776a38bab491e0a91",
      "mergeBaseTree": "075aad2062eecde202f9b7850c07858b79c9f85c",
      "ci": {
        "head": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
        "run": 38112711675,
        "job": 114391414713,
        "attempt": 1,
        "counts": [
          4,
          497,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T04:50:08.2546088Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "head": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
        "run": 38112711679,
        "job": 114391414476,
        "attempt": 1,
        "steps": "success; diagnostics skipped",
        "markers": [
          "2026-10-11T05:10:30.0427996Z Success",
          "2026-10-11T05:11:24.7013021Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693230353,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28908619,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693230353",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693230353/zip",
          "expired": false,
          "created_at": "2026-10-11T05:11:37Z",
          "expires_at": "2026-10-25T05:11:35Z",
          "updated_at": "2026-10-11T05:11:37Z",
          "digest": "sha256:320609211c0e5935c47dba449c47b02a8c6aaaee6571629f19e10e8016ef718b",
          "workflow_run": {
            "id": 38112711679,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "fix/candidates-read-deadline",
            "head_sha": "56e8229ada3bdb44042b9d208357f10ef91cdad8"
          }
        }
      }
    },
    "postRuns": []
  },
  {
    "pr": 421,
    "sha": "9ff2ef5a3c30e42a1908949053e6849b07f50651",
    "tree": "dcaec82502bd76f39d4fd4a347b049c048454253",
    "parents": [
      "64c5f2a09969e76d7077858af4a0623f2b43ce38",
      "66223caf499c01042b40fba82f96da301f0a429b"
    ],
    "pre": {
      "pr": 421,
      "head": "66223caf499c01042b40fba82f96da301f0a429b",
      "tree": "dcaec82502bd76f39d4fd4a347b049c048454253",
      "parentMain": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
      "mergeBase": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
      "mergeBaseTree": "f7c9a8ae4947125d38ca87c892412a15fa271f84",
      "ci": {
        "head": "66223caf499c01042b40fba82f96da301f0a429b",
        "run": 38112820567,
        "job": 114391741740,
        "attempt": 1,
        "counts": [
          4,
          510,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T04:52:23.5294427Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "head": "66223caf499c01042b40fba82f96da301f0a429b",
        "run": 38112820608,
        "job": 114391741805,
        "attempt": 1,
        "steps": "success; diagnostics skipped",
        "markers": [
          "2026-10-11T05:15:24.9271592Z Success",
          "2026-10-11T05:16:31.9169574Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11692837201,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28908875,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692837201",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692837201/zip",
          "expired": false,
          "created_at": "2026-10-11T05:16:53Z",
          "expires_at": "2026-10-25T05:16:51Z",
          "updated_at": "2026-10-11T05:16:53Z",
          "digest": "sha256:7e29f6f01225affcb1fc7d84054a5904c87b756c8575c093c1af35c64191a4ad",
          "workflow_run": {
            "id": 38112820608,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "fix/conversation-read-deadline",
            "head_sha": "66223caf499c01042b40fba82f96da301f0a429b"
          }
        }
      }
    },
    "postRuns": []
  },
  {
    "pr": 422,
    "sha": "cfb7d838697006d03c0ac1c9873d4ad1da08679a",
    "tree": "aebd7cd351dd71378f0f097e8efa5d5f84e911d2",
    "parents": [
      "9ff2ef5a3c30e42a1908949053e6849b07f50651",
      "0e768ab142665d0f088d287b6db73002900a8b98"
    ],
    "pre": {
      "pr": 422,
      "head": "0e768ab142665d0f088d287b6db73002900a8b98",
      "tree": "aebd7cd351dd71378f0f097e8efa5d5f84e911d2",
      "parentMain": "9ff2ef5a3c30e42a1908949053e6849b07f50651",
      "mergeBase": "66223caf499c01042b40fba82f96da301f0a429b",
      "mergeBaseTree": "dcaec82502bd76f39d4fd4a347b049c048454253",
      "ci": {
        "head": "0e768ab142665d0f088d287b6db73002900a8b98",
        "run": 38112956435,
        "job": 114392135215,
        "attempt": 1,
        "counts": [
          4,
          528,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T04:54:17.7280591Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "head": "0e768ab142665d0f088d287b6db73002900a8b98",
        "run": 38112956424,
        "job": 114392134649,
        "attempt": 1,
        "steps": "success; diagnostics skipped",
        "markers": [
          "2026-10-11T05:15:18.4338333Z Success",
          "2026-10-11T05:16:26.8166681Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693230797,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28908842,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693230797",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693230797/zip",
          "expired": false,
          "created_at": "2026-10-11T05:16:43Z",
          "expires_at": "2026-10-25T05:16:41Z",
          "updated_at": "2026-10-11T05:16:43Z",
          "digest": "sha256:912afd3b13e4f442612ca44ac0c12a6de30a670e6152c4dc7446c1b54abc1a01",
          "workflow_run": {
            "id": 38112956424,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "fix/notifications-read-deadline",
            "head_sha": "0e768ab142665d0f088d287b6db73002900a8b98"
          }
        }
      }
    },
    "postRuns": []
  },
  {
    "pr": 423,
    "sha": "7993dd0c5f4646b2e9b48b79923041b9f3a842dc",
    "tree": "2d8d47f20eb0af7ff93578d9793a8b9b2fb84521",
    "parents": [
      "cfb7d838697006d03c0ac1c9873d4ad1da08679a",
      "68535d37567b898dfd1f6f2bac078d52fd7f9aa8"
    ],
    "pre": {
      "pr": 423,
      "head": "68535d37567b898dfd1f6f2bac078d52fd7f9aa8",
      "tree": "2d8d47f20eb0af7ff93578d9793a8b9b2fb84521",
      "parentMain": "cfb7d838697006d03c0ac1c9873d4ad1da08679a",
      "mergeBase": "0e768ab142665d0f088d287b6db73002900a8b98",
      "mergeBaseTree": "aebd7cd351dd71378f0f097e8efa5d5f84e911d2",
      "ci": {
        "head": "68535d37567b898dfd1f6f2bac078d52fd7f9aa8",
        "run": 38113140672,
        "job": 114392671499,
        "attempt": 1,
        "counts": [
          4,
          571,
          145,
          3
        ],
        "allSteps": "success",
        "http": [
          "2026-10-11T04:58:09.0931902Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
        ]
      },
      "apk": {
        "head": "68535d37567b898dfd1f6f2bac078d52fd7f9aa8",
        "run": 38113140682,
        "job": 114392671433,
        "attempt": 1,
        "steps": "success; diagnostics skipped",
        "markers": [
          "2026-10-11T05:20:47.3968792Z Success",
          "2026-10-11T05:21:36.3320668Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693226284,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28908949,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693226284",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693226284/zip",
          "expired": false,
          "created_at": "2026-10-11T05:22:00Z",
          "expires_at": "2026-10-25T05:21:56Z",
          "updated_at": "2026-10-11T05:22:00Z",
          "digest": "sha256:f56f5042337441d4f96aa8e7a5aa5e0e1cafdca5d6fe31a9d02fcbecbe6bcfad",
          "workflow_run": {
            "id": 38113140682,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "fix/secondary-read-deadlines",
            "head_sha": "68535d37567b898dfd1f6f2bac078d52fd7f9aa8"
          }
        }
      }
    },
    "postRuns": []
  }
]
```

## Pós-merge em acompanhamento

```json
[
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
      "pending": true,
      "run": 38114053744,
      "status": "in_progress"
    },
    "pending": true
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
      "pending": true,
      "run": 38114405753,
      "status": "in_progress"
    },
    "pending": true
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
      "pending": true,
      "run": 38114552142,
      "status": "in_progress"
    },
    "apk": {
      "pending": true,
      "run": 38114552077,
      "status": "in_progress"
    },
    "pending": true
  }
]
```
