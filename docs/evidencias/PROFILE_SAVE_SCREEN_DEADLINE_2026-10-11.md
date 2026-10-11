# Prazo do salvamento de perfil

## Prazo do salvamento de perfil (2026-10-11 05:32:18 UTC)

O handler real Perfil.saveProfile deixava "Salvando…" ativo quando auth, transporte, JSON ou releitura da sessão não resolviam, apesar do abort de 15 segundos. Onze testes novos executam os handlers antes do JSX e os parsers/submitProfile de produção com hooks, auth, rede e timer explícitos: antes 5 falhas/6 sucessos; depois 11 sucessos. A bateria local com profile-submit, profile-analytics-read-deadline e signout-screen-deadline passou 50/50 no Node24. Não é render RN, SecureStore, dispositivo físico ou prova de cancelamento do servidor.

O prazo agora publica erro de confirmação, libera saving/submitting e mantém o rascunho. Uma ref própria identifica cada salvamento; respostas, auth, timers e finally antigos não podem reconhecer sucesso, apagar o rascunho ou desbloquear a tentativa seguinte. Antes do despacho, autorização precisa continuar a mesma; não há PUT atrasado após expiração. Depois do despacho, timeout é resultado incerto, nunca "Dados salvos". O ACK oportuno ainda exige ID real e todos os campos trim/null correspondentes à resposta da API. Nenhum retry automático foi criado.

Contrato conferido na main: ProfessionalProfileController autentica a identidade e faz ON CONFLICT(identity_id), com índice único parcial da migration0034. Repetir explicitamente o mesmo corpo atualiza o mesmo perfil, sem duplicar cadastro. O teste HTTP existente comprova autenticação, rejeição sem escrita, mesmo ID no update, trim/null e isolamento de outra identidade. A mudança não acrescenta versionamento de servidor nem garante que uma escrita despachada foi cancelada; edições diferentes continuam sujeitas ao contrato atual de última escrita. A prova local de retry cobre o mesmo corpo, sem declarar ordenação de commits concorrentes no banco.

Testes distintos: quatro fases pendentes, retry explícito de corpo trim idêntico com resposta/finally antigos, blur e novo proprietário, auth diferente antes do PUT, ACK com ID errado, criação com novo ID real/nulls, rejeição e nome vazio. O callback load/foco, signout, JSX, StyleSheets, ProfessionalNav e demais rotas são byte-identical ao predecessor #430; backend, migrações, helpers, fila de sessão, payload e lockfile não mudam.

Estado GitHub reconsultado: main b00be864d6ed6c7383f9f5267df054dad6907535; #420–424 integrados em ordem, com CI/APK próprios aprovados no head exato e pais/tree/main verificados. Pós-merge CI de todos420–424 aprovado; APKs pós-merge ainda em execução nesta consulta, sem afirmar aprovação. #430 head093d457f05cabc19e331510d29edee57819b6e22 tree0f9170f60544876d3163dc8fe93a151652f194e2 teve CI38114691222/job114397143587 aprovado4web/655mobile/145API/3CLI, HTTP05:27:16.1381558Z; APK38114691248 pendente. #426/#427 próprios APKs também passaram com install/launch e ZIPs não expirados/exatos, mas não podem integrar antes do predecessor.

Incidente confirmado: APK #425 run38113622026 attempt1/job114394056827 compilou (BUILD SUCCESSFUL05:15:30.5552022Z), mas o emulador falhou em input keyevent82 com Broken pipe32/exit224 às05:24:03.5502534Z, antes do script de instalação do aplicativo. Não houve DEVICE_SMOKE_OK nem APK validado. Diagnósticos publicados11693525710. Rerun somente do job falho autorizado e disparado no mesmo SHA8989feeb8206a36a03a268021ba204fa04b2b2c7; tentativa2 em execução, sem repetir enquanto pendente. Não é prova de crash do aplicativo nem aprovação nativa. O merge425 e dependentes aguarda esse gate; o trabalho independente deste perfil prosseguiu.

Próxima ação concreta: publicar fix/profile-save-screen-deadline sobre head430093d457f05cabc19e331510d29edee57819b6e22 e basefix/signout-local-deadline; verificar bytes/diff e gates próprios CI4web/666mobile/145API/3CLI+APK no SHA exato. Acompanhar rerun425, integrar425→426→427→428→429→430→esta fatia só com gates aplicáveis comprovados; revalidar retarget/main/merge-base/diff/pais/tree e pós-merge. Não repetir419–424. Registrar as novas provas efetivas no checkpoint; os blocos anteriores permanecem histórico, não estado atual.

Auditoria segura seguinte: conferir mutações reais ainda abort-only de publicação/convites/confirmações/casos/substituições/privacidade e seus protocolos de resultado incerto/ACK/idempotência. Não aplicar desbloqueio de GET a mutação sem contrato. Definições de preferências e ajuda sem vínculo, dados/validação ML e integração enterprise continuam dependências separadas. Android físico/E2E/Visual Truth, SecureStore/OS crash/teclado/payload/restart/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam abertos. React19.1.4/RN0.81.6, tenant/RLS, desenho canônico e lockfile preservados; sem dinheiro real, novas cobranças/serviços ou deploy pago. Documento ORIGINALv1.104 atualizado em lugar preservando histórico integral, memória/checkpoint/requisitos/evidências no mesmo commit. Bloqueio parcial não encerra o projeto.

Provas GitHub preservadas na consulta:
```json
{
  "merges": [
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
    },
    {
      "pr": 424,
      "sha": "b00be864d6ed6c7383f9f5267df054dad6907535",
      "tree": "d95dd99ee320096ee1374b7ecf7117ee8cc8fd7d",
      "parents": [
        "7993dd0c5f4646b2e9b48b79923041b9f3a842dc",
        "1f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da"
      ],
      "pre": {
        "pr": 424,
        "head": "1f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da",
        "tree": "d95dd99ee320096ee1374b7ecf7117ee8cc8fd7d",
        "parentMain": "7993dd0c5f4646b2e9b48b79923041b9f3a842dc",
        "mergeBase": "68535d37567b898dfd1f6f2bac078d52fd7f9aa8",
        "mergeBaseTree": "2d8d47f20eb0af7ff93578d9793a8b9b2fb84521",
        "ci": {
          "head": "1f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da",
          "run": 38113453286,
          "job": 114393570644,
          "attempt": 1,
          "counts": [
            4,
            588,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T05:03:55.6834828Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "head": "1f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da",
          "run": 38113453352,
          "job": 114393570944,
          "attempt": 1,
          "steps": "success; diagnostics skipped",
          "markers": [
            "2026-10-11T05:25:39.0963816Z Success",
            "2026-10-11T05:26:29.8441903Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
          ],
          "artifact": {
            "id": 11693076751,
            "name": "MLivreTrabalho-standalone-apk",
            "size_in_bytes": 28909022,
            "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693076751",
            "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693076751/zip",
            "expired": false,
            "created_at": "2026-10-11T05:26:33Z",
            "expires_at": "2026-10-25T05:26:31Z",
            "updated_at": "2026-10-11T05:26:33Z",
            "digest": "sha256:e6f9b85501bcf21e6da73831ba2931ad55dcc41f68589dd3dfebd6ca344920fc",
            "workflow_run": {
              "id": 38113453352,
              "repository_id": 1378638985,
              "head_repository_id": 1378638985,
              "head_branch": "fix/support-history-read-deadline",
              "head_sha": "1f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da"
            }
          }
        }
      },
      "postRuns": []
    }
  ],
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
        "pending": true,
        "run": 38114601054,
        "status": "in_progress"
      },
      "pending": true
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
        "pending": true,
        "run": 38114903781,
        "status": "in_progress"
      },
      "pending": true
    }
  ],
  "ci430": {
    "head": "093d457f05cabc19e331510d29edee57819b6e22",
    "run": 38114691222,
    "job": 114397143587,
    "attempt": 1,
    "counts": [
      4,
      655,
      145,
      3
    ],
    "allSteps": "success",
    "http": [
      "2026-10-11T05:27:16.1381558Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  "apk426": {
    "head": "c9bb5c147b8181c4ee39eb490139625c08df5678",
    "run": 38113777319,
    "job": 114394499181,
    "attempt": 1,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T05:29:37.2303131Z Success",
      "2026-10-11T05:30:23.2289700Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11692843298,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28909231,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692843298",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692843298/zip",
      "expired": false,
      "created_at": "2026-10-11T05:30:46Z",
      "expires_at": "2026-10-25T05:30:43Z",
      "updated_at": "2026-10-11T05:30:46Z",
      "digest": "sha256:b0e668abec2725bab82c3b2c1dbfa27ad8eb598525d22550b3fbfa2d89343e6a",
      "workflow_run": {
        "id": 38113777319,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/availability-save-deadline",
        "head_sha": "c9bb5c147b8181c4ee39eb490139625c08df5678"
      }
    }
  },
  "apk427": {
    "head": "0832b9f5df98fba06a3c89918e5eb045bc7ba25d",
    "run": 38113969118,
    "job": 114395050465,
    "attempt": 1,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T05:28:42.7017576Z Success",
      "2026-10-11T05:29:20.8364527Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11693266927,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28909272,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693266927",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693266927/zip",
      "expired": false,
      "created_at": "2026-10-11T05:29:39Z",
      "expires_at": "2026-10-25T05:29:36Z",
      "updated_at": "2026-10-11T05:29:39Z",
      "digest": "sha256:f82ceb9e8f6f05d3df460268669f3f43789596abb73e81516c20a46a772803e1",
      "workflow_run": {
        "id": 38113969118,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/startup-session-read-deadline",
        "head_sha": "0832b9f5df98fba06a3c89918e5eb045bc7ba25d"
      }
    }
  },
  "apk425Failure": {
    "head": "8989feeb8206a36a03a268021ba204fa04b2b2c7",
    "run": 38113622026,
    "attempt": 1,
    "job": 114394056827,
    "reason": "Emulator action input keyevent 82 Broken pipe exit224 before app installation/script; build passed; no DEVICE_SMOKE_OK or validated APK",
    "diagnostics": 11693525710,
    "time": "2026-10-11T05:24:03.5502534Z"
  }
}
```
