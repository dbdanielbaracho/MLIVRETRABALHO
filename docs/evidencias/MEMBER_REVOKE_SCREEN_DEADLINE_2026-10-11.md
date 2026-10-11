# Revogação: deadline/authority/ACK e recibos reais


## Revogação: prazo da interface e recibo de integração — 2026-10-11 06:31:01 UTC

Estado atual revalidado no GitHub: main a4a4a730a77811da275b80e79103ebb0f2012580 (#437), tree7c2eac5e155bdc2998989edf8aee18c8d378b8be; zero PRs abertos antes desta correção não prova conclusão. README aponta o Documento ORIGINAL v1.104, memória e checkpoint foram relidos na main acima. #420–#437 integrados em ordem após retarget main, diff/bytes revistos, CI e APK próprios quando aplicáveis PASS, lease/head/main reconsultados. Pais e árvore de cada merge real verificados; nenhuma squash/reescrita/perda de predecessores. #435–#437 mudaram somente API/CI/testes/docs; native N/A provado por paths e mobile tree idêntica ao nativo aprovado #434, nunca artefato atribuído ao head API. CI pós-merge de TODOS #420–#437 PASS no SHA real. Native pós-merge #419–#424 PASS; #425–#434 ainda em execução na consulta, NÃO PASS. #437 CI pós-merge38117884742 attempt1 falhou no pull ECR postgres17 toomanyrequests antes de Checkout (job114406370358,06:23:25.7824511Z); após log integral e espera, rerun só job falho: attempt2/job114406796501 PASS4/699/169/3, HTTP06:28:24.8423915Z. Não mudou código/registry/gate para contornar falha.

| PR | SHA merge real | CI / APK próprios | CI pós-merge | APK pós-merge |
|---|---|---|---|---|
| #420 | 64c5f2a09969e76d7077858af4a0623f2b43ce38 | 38112711675 / 38112711679 | 38114053725 | 38114053744 |
| #421 | 9ff2ef5a3c30e42a1908949053e6849b07f50651 | 38112820567 / 38112820608 | 38114405806 | 38114405753 |
| #422 | cfb7d838697006d03c0ac1c9873d4ad1da08679a | 38112956435 / 38112956424 | 38114552142 | 38114552077 |
| #423 | 7993dd0c5f4646b2e9b48b79923041b9f3a842dc | 38113140672 / 38113140682 | 38114600972 | 38114601054 |
| #424 | b00be864d6ed6c7383f9f5267df054dad6907535 | 38113453286 / 38113453352 | 38114903819 | 38114903781 |
| #425 | c6334b4ec643a17a9420f1981c77e10d1488d9e0 | 38113622093 / 38113622026 | 38117688717 | PENDENTE 38117688718 |
| #426 | 321aa035059347fb6cd734acce0045c0fd9fca0c | 38113777302 / 38113777319 | 38117698235 | PENDENTE 38117698241 |
| #427 | 9678fb99a37b3f4bf699347ca439936ecc4dc25f | 38113969108 / 38113969118 | 38117706895 | PENDENTE 38117706908 |
| #428 | b298d5291df5a657136c66d316055c7615c30a4d | 38114121811 / 38114121800 | 38117717030 | PENDENTE 38117716994 |
| #429 | c05a95fc29490a5dff25d71546c2a535d6f97d33 | 38114334775 / 38114334761 | 38117728724 | PENDENTE 38117728773 |
| #430 | 5aa8a055ab715e91e39dac4989039375b3a75c1f | 38114691222 / 38114691248 | 38117818305 | PENDENTE 38117818330 |
| #431 | abf5f84304d7198fb75b999c4db3f5add54c8127 | 38115110022 / 38115110028 | 38117828679 | PENDENTE 38117828684 |
| #432 | f580690d383eb6f8bc33d231849044b11f48c1ec | 38115345625 / 38115345646 | 38117838749 | PENDENTE 38117838770 |
| #433 | 5aa264d3457f7146a2ab741890f7830c77f20a20 | 38115519749 / 38115519750 | 38117848157 | PENDENTE 38117848154 |
| #434 | ed6d7efc9249b7dddf3b990f3fdc1b2caf728849 | 38115726584 / 38115726677 | 38117857810 | PENDENTE 38117857802 |
| #435 | 65001ddccdcc401ee8113d141bfa63341ea70b3d | 38116648295 / N/A paths/mobile iguais | 38117867644 | N/A paths/mobile iguais |
| #436 | 409dc05a90ca55520d28007464392442f324b65a | 38116970206 / N/A paths/mobile iguais | 38117877920 | N/A paths/mobile iguais |
| #437 | a4a4a730a77811da275b80e79103ebb0f2012580 | 38117227111 / N/A paths/mobile iguais | 38117884742 | N/A paths/mobile iguais |

Falha concreta: Membros.revoke tinha timer abort-only; auth/fetch/JSON/auth final e atualização GET pendentes deixavam busy/pending true indefinidamente e ocultavam atualização. 14 regressões novas reproduziram ANTES12FAIL/2PASS; DEPOIS14PASS. Matriz ampliada local67/67 (14novos+10company-members+43secondary-read), handlers pré-JSX e helpers reais, hooks/auth/fetch/timers explícitos; sem renderRN/SecureStore/Android físico ou rede externa. Revoke ganha ref controller acrescida após refs existentes e callback15s: somente na operação/generation atual invalida contexto e sequência de leitura, limpa lista para estado error e libera busy/pending. Antes de ACK exato não afirma revogação; após ACK válido bool/id e atualização pendente preserva confirmação, reporta falha da atualização. Guardas isCurrent com controller/epoch/abort impedem resposta, timer, catch ou finally antigo de modificar novo foco/tentativa. Troca de identity/tenant invalida autoridade e envia zero POST quando anterior ao transporte; id ausente/aceito/revogado não transporta. Rascunhos/email/código/unknown da criação preservados. Sem retry automático, navegação ou saveTenantForContext; fila nativa/sessão pareada não é removida nem ultrapassada.

Backend existente revoga por id+tenant e accepted_at IS NULL, COALESCE(revoked_at,now()), ACK invitationId real; repetição EXPLÍCITA do mesmo ID é idempotente conforme contrato atual. Não inventar idempotência para criação/aceite, não desbloquear unknown mediante suposição de cancelamento no servidor. Corpo createInvite/acceptInvite e JSX/StyleSheets comparados byteidênticos; GET load/defaultoperation e protocolo/DB/API sem mudança nesta fatia. React19.1.4/RN0.81.6/lockfile/standalone sem Metro/RLS preservados.

CI próprio novo exigido4/713/169/3 +typecheck/build/export/frozenlock/migrações/retention/HTTP/Production Truth e APK standalone no HEAD EXATO; ambos PENDENTES antes de publicar. Pós-merge desta fatia também será consultado no merge SHA real; nenhum sucesso antecipado. Atualizados originalDVT/memória/checkpoint/ledger/registro/evidência no mesmo commit. Gate Visual Truth/E2E/Android físico (todos estados/desenho original), SecureStore/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers e Web/Railway eventualmente pago continuam OPEN. Sem PSP/dinheiro real/novas cobranças/provider/deploy pago e sem alterar rotinas por bloqueio parcial.

Próxima ação concreta: publicar fix/member-revoke-screen-deadline em PR sobre main, revisar bytes/diff/gates713/169 e APK, integrar só após aprovação exata; acompanhar native pós-merge425–434 e novo head, registrar resultados. Auditar changeMember em Equipes (POST/DELETE idempotentes por par team/professional, timer ainda abort-only) com foco/seleção/authority/ACK+reload preservados. Criação de convite/equipe/publicação e aceite pós-SecureStore têm contratos de resultado incerto/fila/durabilidade separados; não lançar reenvio não idempotente para simular progresso. Preferências/help nova sem membership/forecast/providers dependem contratos/dados/autoridade externos já registrados; não inventar defaults ou tenant global. Fim de rodada não equivale a conclusão; rotina permanece ativa até prova integral ou ordem expressa.


```json
{
  "stateMain": "a4a4a730a77811da275b80e79103ebb0f2012580",
  "prePost": [
    {
      "n": 420,
      "merge": {
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
      "post": {
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
      }
    },
    {
      "n": 421,
      "merge": {
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
      "post": {
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
      }
    },
    {
      "n": 422,
      "merge": {
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
      "post": {
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
          "head": "cfb7d838697006d03c0ac1c9873d4ad1da08679a",
          "run": 38114552077,
          "job": 114396746054,
          "attempt": 1,
          "steps": "success; diagnostics skipped",
          "markers": [
            "2026-10-11T05:48:07.6821392Z Success",
            "2026-10-11T05:49:04.7785043Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
          ],
          "artifact": {
            "id": 11693243776,
            "name": "MLivreTrabalho-standalone-apk",
            "size_in_bytes": 28908849,
            "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693243776",
            "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693243776/zip",
            "expired": false,
            "created_at": "2026-10-11T05:49:08Z",
            "expires_at": "2026-10-25T05:49:06Z",
            "updated_at": "2026-10-11T05:49:08Z",
            "digest": "sha256:91c3ec28d0067f6fbe926d263f2bd3da918280f05fa2864cf5b74ad67be3ca95",
            "workflow_run": {
              "id": 38114552077,
              "repository_id": 1378638985,
              "head_repository_id": 1378638985,
              "head_branch": "main",
              "head_sha": "cfb7d838697006d03c0ac1c9873d4ad1da08679a"
            }
          }
        },
        "pending": false
      }
    },
    {
      "n": 423,
      "merge": {
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
      "post": {
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
      }
    },
    {
      "n": 424,
      "merge": {
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
      },
      "post": {
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
    },
    {
      "n": 425,
      "merge": {
        "pr": 425,
        "sha": "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
        "tree": "facb693b97bae7ed5a0931a91ad76bdc6b4993c4",
        "parents": [
          "b00be864d6ed6c7383f9f5267df054dad6907535",
          "8989feeb8206a36a03a268021ba204fa04b2b2c7"
        ],
        "pre": {
          "pr": 425,
          "head": "8989feeb8206a36a03a268021ba204fa04b2b2c7",
          "tree": "facb693b97bae7ed5a0931a91ad76bdc6b4993c4",
          "parentMain": "b00be864d6ed6c7383f9f5267df054dad6907535",
          "mergeBase": "1f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da",
          "mergeBaseTree": "d95dd99ee320096ee1374b7ecf7117ee8cc8fd7d",
          "ci": {
            "head": "8989feeb8206a36a03a268021ba204fa04b2b2c7",
            "run": 38113622093,
            "job": 114394056918,
            "attempt": 1,
            "counts": [
              4,
              599,
              145,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T05:07:02.2552483Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
            "head": "8989feeb8206a36a03a268021ba204fa04b2b2c7",
            "run": 38113622026,
            "job": 114401974587,
            "attempt": 3,
            "steps": "success; diagnostics skipped",
            "markers": [
              "2026-10-11T06:17:41.5144793Z Success",
              "2026-10-11T06:18:33.0826259Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
            ],
            "artifact": {
              "id": 11694391492,
              "name": "MLivreTrabalho-standalone-apk",
              "size_in_bytes": 28908984,
              "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694391492",
              "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694391492/zip",
              "expired": false,
              "created_at": "2026-10-11T06:18:47Z",
              "expires_at": "2026-10-25T06:18:44Z",
              "updated_at": "2026-10-11T06:18:47Z",
              "digest": "sha256:6ee9ff23705d07d06cdfd10ceb4ac6626ad125cb87f369cce27350ed52ddcf4c",
              "workflow_run": {
                "id": 38113622026,
                "repository_id": 1378638985,
                "head_repository_id": 1378638985,
                "head_branch": "fix/copilot-interpretation-deadline",
                "head_sha": "8989feeb8206a36a03a268021ba204fa04b2b2c7"
              }
            }
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 425,
        "sha": "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
        "tree": "facb693b97bae7ed5a0931a91ad76bdc6b4993c4",
        "parents": [
          "b00be864d6ed6c7383f9f5267df054dad6907535",
          "8989feeb8206a36a03a268021ba204fa04b2b2c7"
        ],
        "ci": {
          "head": "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
          "run": 38117688717,
          "job": 114405782362,
          "attempt": 1,
          "counts": [
            4,
            599,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:21:48.5875965Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117688718,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 426,
      "merge": {
        "pr": 426,
        "sha": "321aa035059347fb6cd734acce0045c0fd9fca0c",
        "tree": "e22f9734039ba8eb86cf72d5a57385ce0787305f",
        "parents": [
          "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
          "c9bb5c147b8181c4ee39eb490139625c08df5678"
        ],
        "pre": {
          "pr": 426,
          "head": "c9bb5c147b8181c4ee39eb490139625c08df5678",
          "tree": "e22f9734039ba8eb86cf72d5a57385ce0787305f",
          "parentMain": "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
          "mergeBase": "8989feeb8206a36a03a268021ba204fa04b2b2c7",
          "mergeBaseTree": "facb693b97bae7ed5a0931a91ad76bdc6b4993c4",
          "ci": {
            "head": "c9bb5c147b8181c4ee39eb490139625c08df5678",
            "run": 38113777302,
            "job": 114394498727,
            "attempt": 1,
            "counts": [
              4,
              610,
              145,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T05:09:53.3695228Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
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
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 426,
        "sha": "321aa035059347fb6cd734acce0045c0fd9fca0c",
        "tree": "e22f9734039ba8eb86cf72d5a57385ce0787305f",
        "parents": [
          "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
          "c9bb5c147b8181c4ee39eb490139625c08df5678"
        ],
        "ci": {
          "head": "321aa035059347fb6cd734acce0045c0fd9fca0c",
          "run": 38117698235,
          "job": 114405811772,
          "attempt": 1,
          "counts": [
            4,
            610,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:22:05.6446594Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117698241,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 427,
      "merge": {
        "pr": 427,
        "sha": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
        "tree": "3d1d2c93b9cfaa1a10c24dbe8b38682bfca06a00",
        "parents": [
          "321aa035059347fb6cd734acce0045c0fd9fca0c",
          "0832b9f5df98fba06a3c89918e5eb045bc7ba25d"
        ],
        "pre": {
          "pr": 427,
          "head": "0832b9f5df98fba06a3c89918e5eb045bc7ba25d",
          "tree": "3d1d2c93b9cfaa1a10c24dbe8b38682bfca06a00",
          "parentMain": "321aa035059347fb6cd734acce0045c0fd9fca0c",
          "mergeBase": "c9bb5c147b8181c4ee39eb490139625c08df5678",
          "mergeBaseTree": "e22f9734039ba8eb86cf72d5a57385ce0787305f",
          "ci": {
            "head": "0832b9f5df98fba06a3c89918e5eb045bc7ba25d",
            "run": 38113969108,
            "job": 114395050485,
            "attempt": 1,
            "counts": [
              4,
              617,
              145,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T05:13:26.5579046Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
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
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 427,
        "sha": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
        "tree": "3d1d2c93b9cfaa1a10c24dbe8b38682bfca06a00",
        "parents": [
          "321aa035059347fb6cd734acce0045c0fd9fca0c",
          "0832b9f5df98fba06a3c89918e5eb045bc7ba25d"
        ],
        "ci": {
          "head": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
          "run": 38117706895,
          "job": 114405838661,
          "attempt": 1,
          "counts": [
            4,
            617,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:22:07.0480295Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117706908,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 428,
      "merge": {
        "pr": 428,
        "sha": "b298d5291df5a657136c66d316055c7615c30a4d",
        "tree": "d27f8e8c62d362f72fdc7a340498328de0be3429",
        "parents": [
          "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
          "0deb62791921eaf326be91562a2adb4f602d89bf"
        ],
        "pre": {
          "pr": 428,
          "head": "0deb62791921eaf326be91562a2adb4f602d89bf",
          "tree": "d27f8e8c62d362f72fdc7a340498328de0be3429",
          "parentMain": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
          "mergeBase": "0832b9f5df98fba06a3c89918e5eb045bc7ba25d",
          "mergeBaseTree": "3d1d2c93b9cfaa1a10c24dbe8b38682bfca06a00",
          "ci": {
            "head": "0deb62791921eaf326be91562a2adb4f602d89bf",
            "run": 38114121811,
            "job": 114395500223,
            "attempt": 1,
            "counts": [
              4,
              626,
              145,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T05:16:09.0504632Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
            "head": "0deb62791921eaf326be91562a2adb4f602d89bf",
            "run": 38114121800,
            "job": 114395500254,
            "attempt": 1,
            "steps": "success; diagnostics skipped",
            "markers": [
              "2026-10-11T05:33:50.7167998Z Success",
              "2026-10-11T05:34:32.0233944Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
            ],
            "artifact": {
              "id": 11693407076,
              "name": "MLivreTrabalho-standalone-apk",
              "size_in_bytes": 28909411,
              "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693407076",
              "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693407076/zip",
              "expired": false,
              "created_at": "2026-10-11T05:34:50Z",
              "expires_at": "2026-10-25T05:34:47Z",
              "updated_at": "2026-10-11T05:34:50Z",
              "digest": "sha256:20f3f01e5f085f6f56e571723e1b23af364712bd09af5f6adad870067d053e4c",
              "workflow_run": {
                "id": 38114121800,
                "repository_id": 1378638985,
                "head_repository_id": 1378638985,
                "head_branch": "fix/signup-uncertain-deadline",
                "head_sha": "0deb62791921eaf326be91562a2adb4f602d89bf"
              }
            }
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 428,
        "sha": "b298d5291df5a657136c66d316055c7615c30a4d",
        "tree": "d27f8e8c62d362f72fdc7a340498328de0be3429",
        "parents": [
          "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
          "0deb62791921eaf326be91562a2adb4f602d89bf"
        ],
        "ci": {
          "head": "b298d5291df5a657136c66d316055c7615c30a4d",
          "run": 38117717030,
          "job": 114405867826,
          "attempt": 1,
          "counts": [
            4,
            626,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:22:34.3909179Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117716994,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 429,
      "merge": {
        "pr": 429,
        "sha": "c05a95fc29490a5dff25d71546c2a535d6f97d33",
        "tree": "843c3d34f52f8a56339b4ac88a3b3fef4651497f",
        "parents": [
          "b298d5291df5a657136c66d316055c7615c30a4d",
          "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c"
        ],
        "pre": {
          "pr": 429,
          "head": "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c",
          "tree": "843c3d34f52f8a56339b4ac88a3b3fef4651497f",
          "parentMain": "b298d5291df5a657136c66d316055c7615c30a4d",
          "mergeBase": "0deb62791921eaf326be91562a2adb4f602d89bf",
          "mergeBaseTree": "d27f8e8c62d362f72fdc7a340498328de0be3429",
          "ci": {
            "head": "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c",
            "run": 38114334775,
            "job": 114396112477,
            "attempt": 1,
            "counts": [
              4,
              637,
              145,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T05:19:46.0138169Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
            "head": "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c",
            "run": 38114334761,
            "job": 114396112529,
            "attempt": 1,
            "steps": "success; diagnostics skipped",
            "markers": [
              "2026-10-11T05:35:47.8898057Z Success",
              "2026-10-11T05:36:30.6409904Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
            ],
            "artifact": {
              "id": 11693472034,
              "name": "MLivreTrabalho-standalone-apk",
              "size_in_bytes": 28909656,
              "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693472034",
              "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693472034/zip",
              "expired": false,
              "created_at": "2026-10-11T05:36:48Z",
              "expires_at": "2026-10-25T05:36:45Z",
              "updated_at": "2026-10-11T05:36:48Z",
              "digest": "sha256:af26156c11cbf7acdfffb954eb84c4235a8bcf4671e9165fa9bf7fb44d73e36d",
              "workflow_run": {
                "id": 38114334761,
                "repository_id": 1378638985,
                "head_repository_id": 1378638985,
                "head_branch": "fix/signin-session-deadline",
                "head_sha": "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c"
              }
            }
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 429,
        "sha": "c05a95fc29490a5dff25d71546c2a535d6f97d33",
        "tree": "843c3d34f52f8a56339b4ac88a3b3fef4651497f",
        "parents": [
          "b298d5291df5a657136c66d316055c7615c30a4d",
          "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c"
        ],
        "ci": {
          "head": "c05a95fc29490a5dff25d71546c2a535d6f97d33",
          "run": 38117728724,
          "job": 114405899599,
          "attempt": 1,
          "counts": [
            4,
            637,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:22:02.0953655Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117728773,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 430,
      "merge": {
        "pr": 430,
        "sha": "5aa8a055ab715e91e39dac4989039375b3a75c1f",
        "tree": "0f9170f60544876d3163dc8fe93a151652f194e2",
        "parents": [
          "c05a95fc29490a5dff25d71546c2a535d6f97d33",
          "093d457f05cabc19e331510d29edee57819b6e22"
        ],
        "pre": {
          "pr": 430,
          "head": "093d457f05cabc19e331510d29edee57819b6e22",
          "tree": "0f9170f60544876d3163dc8fe93a151652f194e2",
          "parentMain": "c05a95fc29490a5dff25d71546c2a535d6f97d33",
          "mergeBase": "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c",
          "mergeBaseTree": "843c3d34f52f8a56339b4ac88a3b3fef4651497f",
          "ci": {
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
          "apk": {
            "head": "093d457f05cabc19e331510d29edee57819b6e22",
            "run": 38114691248,
            "job": 114402228828,
            "attempt": 2,
            "steps": "success; diagnostics skipped",
            "markers": [
              "2026-10-11T06:20:10.6472468Z Success",
              "2026-10-11T06:20:54.2756659Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
            ],
            "artifact": {
              "id": 11693592365,
              "name": "MLivreTrabalho-standalone-apk",
              "size_in_bytes": 28910223,
              "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693592365",
              "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693592365/zip",
              "expired": false,
              "created_at": "2026-10-11T06:21:08Z",
              "expires_at": "2026-10-25T06:21:05Z",
              "updated_at": "2026-10-11T06:21:08Z",
              "digest": "sha256:eb43df62c3ed3e2ea0c87185151b4cad3f1f90765bc9b9b6d78e36ffc2b4764f",
              "workflow_run": {
                "id": 38114691248,
                "repository_id": 1378638985,
                "head_repository_id": 1378638985,
                "head_branch": "fix/signout-local-deadline",
                "head_sha": "093d457f05cabc19e331510d29edee57819b6e22"
              }
            }
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 430,
        "sha": "5aa8a055ab715e91e39dac4989039375b3a75c1f",
        "tree": "0f9170f60544876d3163dc8fe93a151652f194e2",
        "parents": [
          "c05a95fc29490a5dff25d71546c2a535d6f97d33",
          "093d457f05cabc19e331510d29edee57819b6e22"
        ],
        "ci": {
          "head": "5aa8a055ab715e91e39dac4989039375b3a75c1f",
          "run": 38117818305,
          "job": 114406174484,
          "attempt": 1,
          "counts": [
            4,
            655,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:24:28.3433292Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117818330,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 431,
      "merge": {
        "pr": 431,
        "sha": "abf5f84304d7198fb75b999c4db3f5add54c8127",
        "tree": "7f4b56e310d784d6bc04864bcb8c2459bf2daed2",
        "parents": [
          "5aa8a055ab715e91e39dac4989039375b3a75c1f",
          "b0b001186dd9be8f54d20a82f94b9a6047c5a335"
        ],
        "pre": {
          "pr": 431,
          "head": "b0b001186dd9be8f54d20a82f94b9a6047c5a335",
          "tree": "7f4b56e310d784d6bc04864bcb8c2459bf2daed2",
          "parentMain": "5aa8a055ab715e91e39dac4989039375b3a75c1f",
          "mergeBase": "093d457f05cabc19e331510d29edee57819b6e22",
          "mergeBaseTree": "0f9170f60544876d3163dc8fe93a151652f194e2",
          "ci": {
            "head": "b0b001186dd9be8f54d20a82f94b9a6047c5a335",
            "run": 38115110022,
            "job": 114398342883,
            "attempt": 1,
            "counts": [
              4,
              666,
              145,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T05:34:50.8163873Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
            "head": "b0b001186dd9be8f54d20a82f94b9a6047c5a335",
            "run": 38115110028,
            "job": 114398342945,
            "attempt": 1,
            "steps": "success; diagnostics skipped",
            "markers": [
              "2026-10-11T05:54:30.9850114Z Success",
              "2026-10-11T05:55:16.6059867Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
            ],
            "artifact": {
              "id": 11692949775,
              "name": "MLivreTrabalho-standalone-apk",
              "size_in_bytes": 28910203,
              "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692949775",
              "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692949775/zip",
              "expired": false,
              "created_at": "2026-10-11T05:55:30Z",
              "expires_at": "2026-10-25T05:55:27Z",
              "updated_at": "2026-10-11T05:55:30Z",
              "digest": "sha256:243347e16cb079b04bcd62909a76c89cd9568d6b477c65dca39799cc379dc88c",
              "workflow_run": {
                "id": 38115110028,
                "repository_id": 1378638985,
                "head_repository_id": 1378638985,
                "head_branch": "fix/profile-save-screen-deadline",
                "head_sha": "b0b001186dd9be8f54d20a82f94b9a6047c5a335"
              }
            }
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 431,
        "sha": "abf5f84304d7198fb75b999c4db3f5add54c8127",
        "tree": "7f4b56e310d784d6bc04864bcb8c2459bf2daed2",
        "parents": [
          "5aa8a055ab715e91e39dac4989039375b3a75c1f",
          "b0b001186dd9be8f54d20a82f94b9a6047c5a335"
        ],
        "ci": {
          "head": "abf5f84304d7198fb75b999c4db3f5add54c8127",
          "run": 38117828679,
          "job": 114406206152,
          "attempt": 1,
          "counts": [
            4,
            666,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:24:51.7231628Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117828684,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 432,
      "merge": {
        "pr": 432,
        "sha": "f580690d383eb6f8bc33d231849044b11f48c1ec",
        "tree": "473c264a62ffe33c8ff53c5744140610db3e40fb",
        "parents": [
          "abf5f84304d7198fb75b999c4db3f5add54c8127",
          "b7555982898bd95bc3fd18688def28f12f0e6f61"
        ],
        "pre": {
          "pr": 432,
          "head": "b7555982898bd95bc3fd18688def28f12f0e6f61",
          "tree": "473c264a62ffe33c8ff53c5744140610db3e40fb",
          "parentMain": "abf5f84304d7198fb75b999c4db3f5add54c8127",
          "mergeBase": "b0b001186dd9be8f54d20a82f94b9a6047c5a335",
          "mergeBaseTree": "7f4b56e310d784d6bc04864bcb8c2459bf2daed2",
          "ci": {
            "head": "b7555982898bd95bc3fd18688def28f12f0e6f61",
            "run": 38115345625,
            "job": 114399028992,
            "attempt": 1,
            "counts": [
              4,
              675,
              145,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T05:38:58.0866354Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
            "head": "b7555982898bd95bc3fd18688def28f12f0e6f61",
            "run": 38115345646,
            "job": 114399029121,
            "attempt": 1,
            "steps": "success; diagnostics skipped",
            "markers": [
              "2026-10-11T05:59:02.4826474Z Success",
              "2026-10-11T06:00:00.0972252Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
            ],
            "artifact": {
              "id": 11693249649,
              "name": "MLivreTrabalho-standalone-apk",
              "size_in_bytes": 28910347,
              "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693249649",
              "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693249649/zip",
              "expired": false,
              "created_at": "2026-10-11T06:00:15Z",
              "expires_at": "2026-10-25T06:00:12Z",
              "updated_at": "2026-10-11T06:00:15Z",
              "digest": "sha256:4903176d434b44261b68a72185c9a36b8fe25bcd5b85799aad99f09e167b398a",
              "workflow_run": {
                "id": 38115345646,
                "repository_id": 1378638985,
                "head_repository_id": 1378638985,
                "head_branch": "fix/dashboard-signout-local-deadline",
                "head_sha": "b7555982898bd95bc3fd18688def28f12f0e6f61"
              }
            }
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 432,
        "sha": "f580690d383eb6f8bc33d231849044b11f48c1ec",
        "tree": "473c264a62ffe33c8ff53c5744140610db3e40fb",
        "parents": [
          "abf5f84304d7198fb75b999c4db3f5add54c8127",
          "b7555982898bd95bc3fd18688def28f12f0e6f61"
        ],
        "ci": {
          "head": "f580690d383eb6f8bc33d231849044b11f48c1ec",
          "run": 38117838749,
          "job": 114406234906,
          "attempt": 1,
          "counts": [
            4,
            675,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:24:27.4371246Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117838770,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 433,
      "merge": {
        "pr": 433,
        "sha": "5aa264d3457f7146a2ab741890f7830c77f20a20",
        "tree": "309e6aaf21bf11424afa6c93c4613447b7f42cf2",
        "parents": [
          "f580690d383eb6f8bc33d231849044b11f48c1ec",
          "43a25e2dcb7832b41bca77721b6c02084ef66808"
        ],
        "pre": {
          "pr": 433,
          "head": "43a25e2dcb7832b41bca77721b6c02084ef66808",
          "tree": "309e6aaf21bf11424afa6c93c4613447b7f42cf2",
          "parentMain": "f580690d383eb6f8bc33d231849044b11f48c1ec",
          "mergeBase": "b7555982898bd95bc3fd18688def28f12f0e6f61",
          "mergeBaseTree": "473c264a62ffe33c8ff53c5744140610db3e40fb",
          "ci": {
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
          "apk": {
            "head": "43a25e2dcb7832b41bca77721b6c02084ef66808",
            "run": 38115519750,
            "job": 114399532593,
            "attempt": 1,
            "steps": "success; diagnostics skipped",
            "markers": [
              "2026-10-11T05:55:10.5927503Z Success",
              "2026-10-11T05:55:47.2734640Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
            ],
            "artifact": {
              "id": 11694045097,
              "name": "MLivreTrabalho-standalone-apk",
              "size_in_bytes": 28910376,
              "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694045097",
              "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694045097/zip",
              "expired": false,
              "created_at": "2026-10-11T05:56:04Z",
              "expires_at": "2026-10-25T05:56:02Z",
              "updated_at": "2026-10-11T05:56:04Z",
              "digest": "sha256:b1332fad480aa586147bf8efe83485662e8c6ced066b93319c257efd608bb4fc",
              "workflow_run": {
                "id": 38115519750,
                "repository_id": 1378638985,
                "head_repository_id": 1378638985,
                "head_branch": "fix/publication-uncertain-deadline",
                "head_sha": "43a25e2dcb7832b41bca77721b6c02084ef66808"
              }
            }
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 433,
        "sha": "5aa264d3457f7146a2ab741890f7830c77f20a20",
        "tree": "309e6aaf21bf11424afa6c93c4613447b7f42cf2",
        "parents": [
          "f580690d383eb6f8bc33d231849044b11f48c1ec",
          "43a25e2dcb7832b41bca77721b6c02084ef66808"
        ],
        "ci": {
          "head": "5aa264d3457f7146a2ab741890f7830c77f20a20",
          "run": 38117848157,
          "job": 114406262841,
          "attempt": 1,
          "counts": [
            4,
            685,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:24:56.5751323Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117848154,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 434,
      "merge": {
        "pr": 434,
        "sha": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
        "tree": "4a24da3845f0235b610d1bfb301df0ccd7e6e5bd",
        "parents": [
          "5aa264d3457f7146a2ab741890f7830c77f20a20",
          "dac8aa1f1aecc1f92206a3d928e88b60e06968cf"
        ],
        "pre": {
          "pr": 434,
          "head": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
          "tree": "4a24da3845f0235b610d1bfb301df0ccd7e6e5bd",
          "parentMain": "5aa264d3457f7146a2ab741890f7830c77f20a20",
          "mergeBase": "43a25e2dcb7832b41bca77721b6c02084ef66808",
          "mergeBaseTree": "309e6aaf21bf11424afa6c93c4613447b7f42cf2",
          "ci": {
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
          "apk": {
            "head": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
            "run": 38115726677,
            "job": 114400119723,
            "attempt": 1,
            "steps": "success; diagnostics skipped",
            "markers": [
              "2026-10-11T06:07:10.4558315Z Success",
              "2026-10-11T06:08:18.0123715Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
            ],
            "artifact": {
              "id": 11694680015,
              "name": "MLivreTrabalho-standalone-apk",
              "size_in_bytes": 28910594,
              "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694680015",
              "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694680015/zip",
              "expired": false,
              "created_at": "2026-10-11T06:08:32Z",
              "expires_at": "2026-10-25T06:08:29Z",
              "updated_at": "2026-10-11T06:08:32Z",
              "digest": "sha256:1a1e8bbbf537e634e300fe8d1df29cb1ff69235d16d4d2e162f3cb831dd87b08",
              "workflow_run": {
                "id": 38115726677,
                "repository_id": 1378638985,
                "head_repository_id": 1378638985,
                "head_branch": "fix/conversation-send-ui-deadline",
                "head_sha": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf"
              }
            }
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 434,
        "sha": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
        "tree": "4a24da3845f0235b610d1bfb301df0ccd7e6e5bd",
        "parents": [
          "5aa264d3457f7146a2ab741890f7830c77f20a20",
          "dac8aa1f1aecc1f92206a3d928e88b60e06968cf"
        ],
        "ci": {
          "head": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
          "run": 38117857810,
          "job": 114406291105,
          "attempt": 1,
          "counts": [
            4,
            699,
            145,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:24:43.0544327Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "pending": true,
          "run": 38117857802,
          "status": "in_progress"
        },
        "pending": true
      }
    },
    {
      "n": 435,
      "merge": {
        "pr": 435,
        "sha": "65001ddccdcc401ee8113d141bfa63341ea70b3d",
        "tree": "485c028d9447664673a5263dc4abba843d23b037",
        "parents": [
          "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
          "5b9f91029a5401b6c54c64862076bcd7e7e981fc"
        ],
        "pre": {
          "pr": 435,
          "head": "5b9f91029a5401b6c54c64862076bcd7e7e981fc",
          "tree": "485c028d9447664673a5263dc4abba843d23b037",
          "parentMain": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
          "mergeBase": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
          "mergeBaseTree": "4a24da3845f0235b610d1bfb301df0ccd7e6e5bd",
          "ci": {
            "head": "5b9f91029a5401b6c54c64862076bcd7e7e981fc",
            "run": 38116648295,
            "job": 114402739344,
            "attempt": 1,
            "counts": [
              4,
              699,
              153,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T06:02:54.5430625Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
            "applicability": "not_applicable",
            "reason": "workflow paths; API/CI/test/docs only, no native/shared files changed",
            "head": "5b9f91029a5401b6c54c64862076bcd7e7e981fc",
            "mobileTree": "af6a826aa9c1139a2e92a184703509c700a5fbfd",
            "approvedCodeHead": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
            "predecessorMain": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
            "predecessorAPKRun": 38115726677,
            "predecessorPostNativeGateSeparate": true
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 435,
        "sha": "65001ddccdcc401ee8113d141bfa63341ea70b3d",
        "tree": "485c028d9447664673a5263dc4abba843d23b037",
        "parents": [
          "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
          "5b9f91029a5401b6c54c64862076bcd7e7e981fc"
        ],
        "ci": {
          "head": "65001ddccdcc401ee8113d141bfa63341ea70b3d",
          "run": 38117867644,
          "job": 114406320584,
          "attempt": 1,
          "counts": [
            4,
            699,
            153,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:25:20.1965736Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "workflow paths; API/CI/test/docs only, no native/shared files changed",
          "head": "65001ddccdcc401ee8113d141bfa63341ea70b3d",
          "mobileTree": "af6a826aa9c1139a2e92a184703509c700a5fbfd",
          "approvedCodeHead": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
          "predecessorMain": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
          "predecessorAPKRun": 38115726677,
          "predecessorPostNativeGateSeparate": true
        },
        "pending": false
      }
    },
    {
      "n": 436,
      "merge": {
        "pr": 436,
        "sha": "409dc05a90ca55520d28007464392442f324b65a",
        "tree": "afd1ff22c1e62ba6dd989a59c04e526abc4afd0f",
        "parents": [
          "65001ddccdcc401ee8113d141bfa63341ea70b3d",
          "3d35c9d2460de392e3859fdcdec4f3b2ce1c893a"
        ],
        "pre": {
          "pr": 436,
          "head": "3d35c9d2460de392e3859fdcdec4f3b2ce1c893a",
          "tree": "afd1ff22c1e62ba6dd989a59c04e526abc4afd0f",
          "parentMain": "65001ddccdcc401ee8113d141bfa63341ea70b3d",
          "mergeBase": "5b9f91029a5401b6c54c64862076bcd7e7e981fc",
          "mergeBaseTree": "485c028d9447664673a5263dc4abba843d23b037",
          "ci": {
            "head": "3d35c9d2460de392e3859fdcdec4f3b2ce1c893a",
            "run": 38116970206,
            "job": 114403670485,
            "attempt": 1,
            "counts": [
              4,
              699,
              162,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T06:08:13.5270209Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
            "applicability": "not_applicable",
            "reason": "workflow paths; API/CI/test/docs only, no native/shared files changed",
            "head": "3d35c9d2460de392e3859fdcdec4f3b2ce1c893a",
            "mobileTree": "af6a826aa9c1139a2e92a184703509c700a5fbfd",
            "approvedCodeHead": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
            "predecessorMain": "65001ddccdcc401ee8113d141bfa63341ea70b3d",
            "predecessorAPKRun": 38115726677,
            "predecessorPostNativeGateSeparate": true
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 436,
        "sha": "409dc05a90ca55520d28007464392442f324b65a",
        "tree": "afd1ff22c1e62ba6dd989a59c04e526abc4afd0f",
        "parents": [
          "65001ddccdcc401ee8113d141bfa63341ea70b3d",
          "3d35c9d2460de392e3859fdcdec4f3b2ce1c893a"
        ],
        "ci": {
          "head": "409dc05a90ca55520d28007464392442f324b65a",
          "run": 38117877920,
          "job": 114406350503,
          "attempt": 1,
          "counts": [
            4,
            699,
            162,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:25:17.4715112Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "workflow paths; API/CI/test/docs only, no native/shared files changed",
          "head": "409dc05a90ca55520d28007464392442f324b65a",
          "mobileTree": "af6a826aa9c1139a2e92a184703509c700a5fbfd",
          "approvedCodeHead": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
          "predecessorMain": "65001ddccdcc401ee8113d141bfa63341ea70b3d",
          "predecessorAPKRun": 38115726677,
          "predecessorPostNativeGateSeparate": true
        },
        "pending": false
      }
    },
    {
      "n": 437,
      "merge": {
        "pr": 437,
        "sha": "a4a4a730a77811da275b80e79103ebb0f2012580",
        "tree": "7c2eac5e155bdc2998989edf8aee18c8d378b8be",
        "parents": [
          "409dc05a90ca55520d28007464392442f324b65a",
          "52ee03149bd85d7a43f3fc3f59e5851ff0ac84e4"
        ],
        "pre": {
          "pr": 437,
          "head": "52ee03149bd85d7a43f3fc3f59e5851ff0ac84e4",
          "tree": "7c2eac5e155bdc2998989edf8aee18c8d378b8be",
          "parentMain": "409dc05a90ca55520d28007464392442f324b65a",
          "mergeBase": "3d35c9d2460de392e3859fdcdec4f3b2ce1c893a",
          "mergeBaseTree": "afd1ff22c1e62ba6dd989a59c04e526abc4afd0f",
          "ci": {
            "head": "52ee03149bd85d7a43f3fc3f59e5851ff0ac84e4",
            "run": 38117227111,
            "job": 114404428470,
            "attempt": 1,
            "counts": [
              4,
              699,
              169,
              3
            ],
            "allSteps": "success",
            "http": [
              "2026-10-11T06:13:36.2389789Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
            ]
          },
          "apk": {
            "applicability": "not_applicable",
            "reason": "workflow paths; API/CI/test/docs only, no native/shared files changed",
            "head": "52ee03149bd85d7a43f3fc3f59e5851ff0ac84e4",
            "mobileTree": "af6a826aa9c1139a2e92a184703509c700a5fbfd",
            "approvedCodeHead": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
            "predecessorMain": "409dc05a90ca55520d28007464392442f324b65a",
            "predecessorAPKRun": 38115726677,
            "predecessorPostNativeGateSeparate": true
          }
        },
        "postRuns": []
      },
      "post": {
        "pr": 437,
        "sha": "a4a4a730a77811da275b80e79103ebb0f2012580",
        "tree": "7c2eac5e155bdc2998989edf8aee18c8d378b8be",
        "parents": [
          "409dc05a90ca55520d28007464392442f324b65a",
          "52ee03149bd85d7a43f3fc3f59e5851ff0ac84e4"
        ],
        "ci": {
          "head": "a4a4a730a77811da275b80e79103ebb0f2012580",
          "run": 38117884742,
          "job": 114406796501,
          "attempt": 2,
          "counts": [
            4,
            699,
            169,
            3
          ],
          "allSteps": "success",
          "http": [
            "2026-10-11T06:28:24.8423915Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
          ]
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "workflow paths; API/CI/test/docs only, no native/shared files changed",
          "head": "a4a4a730a77811da275b80e79103ebb0f2012580",
          "mobileTree": "af6a826aa9c1139a2e92a184703509c700a5fbfd",
          "approvedCodeHead": "dac8aa1f1aecc1f92206a3d928e88b60e06968cf",
          "predecessorMain": "409dc05a90ca55520d28007464392442f324b65a",
          "predecessorAPKRun": 38115726677,
          "predecessorPostNativeGateSeparate": true
        },
        "pending": false
      }
    }
  ],
  "post437Failure": {
    "head": "a4a4a730a77811da275b80e79103ebb0f2012580",
    "run": 38117884742,
    "attempt": 1,
    "job": 114406370358,
    "phase": "Initialize containers, before Checkout",
    "error": "public.ecr.aws/docker/library/postgres:17 toomanyrequests: Rate exceeded",
    "time": "2026-10-11T06:23:25.7824511Z"
  },
  "local": {
    "before": {
      "tests": 14,
      "pass": 2,
      "fail": 12
    },
    "after": {
      "tests": 67,
      "pass": 67,
      "fail": 0
    },
    "scope": "handlers/helpers reais com dependências e hooks explicitamente fixtures; não renderRN/Android/SecureStore"
  }
}
```
