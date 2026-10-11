# Talentos: entrada real e recibos de execução

## Talentos: validação de entradas e integração #438 — 2026-10-11 10:53 UTC

Estado real reconsultado: main 27e96142ecde5efa10adb05ef436bb5a3f123865, PR #438 integrado, pais [a4a4a730a77811da275b80e79103ebb0f2012580,534b140eb90ff6c654291a52eeb0c5f13d2e323c], tree 2c862ecc83e211ee6919abfe4ca34e79d44a1172 igual ao head aprovado. Próprio CI38118324001/job114407664065 PASS4web/713mobile/169API/3CLI e HTTP/PostgreSQL/Production Truth; APK38118324003/job114407663132 install Success06:47:48.6657802Z e DEVICE_SMOKE_OK06:48:42.1183401Z sem Metro. ZIP11694638840 sha256:ea7563b1a583c7c6ff689f49f58381842b57cb8cb4db21bb7d7175b2491cd64e, não expirado, HEAD exato534b140e. Pós-merge CI38133235768/job114451722736 PASS4/713/169/3, PostgreSQL10:50:16.1745522Z e Production Truth10:50:20.8310963Z; APK38133235730 ainda EM EXECUÇÃO, NÃO PASS. Não repetir merge438 nem voltar ao checkpoint419.

Reconsulta dos pós-merge425–434: APK425/426/428/429/430/431/432/433/434 agora PASS com todos passos aplicáveis, instalação/lançamento sem Metro e ZIP de SHA real não expirado. APK427run38117706908/job114405838646 attempt1 falhou após build PASS, antes de instalação aprovada: PackageManager do Android quebrou (Broken pipe32, serviço package ausente, freeStorage null); exit1 em06:41:54.8029345Z. Log integral lido, diagnóstico ZIP11694012855 sha256:f134f33c6bfb0219e5c98c33d048c10a0f50ef564600d1e300a02d06f7bd6582. Uma nova tentativa somente desse job solicitada, mesmo mergeSHA9678fb99a37b3f4bf699347ca439936ecc4dc25f; attempt2 EM EXECUÇÃO, não considerar aprovado nem repetir rerun enquanto executa. Gate nativo427 separado e aberto até prova; não alterado smoke/timeout/registry para contornar erro. Detalhes exatos no recibo desta evidência.

Falha concreta independente em TalentPoolsController.add/remove: Body apenas tipado permitia TypeError em null e professionalId malformado alcançava active_tenant_professional/cast uuid ou DELETE. Agora Body unknown deve ser objeto, professionalId string UUID canônica sem impor versão e pool texto do enum existente preferred/network/open; remoção valida UUID antes de db.tenant. Auth/membership/company role continuam anteriores à validação. Mantidos SQL/RLS/predicado active_tenant_professional, tenant autorizado, ON CONFLICT/ACK de mesma chave e DELETE original. Dados extras do payload não são autoridade. Erro DB continua falha incerta do servidor, não400 sintético. Nenhuma nova política comercial, schema, provider ou exposição global.

8 testes novos de handlers reais: ANTES3FAIL/5PASS, DEPOIS8PASS/0FAIL. Transformação TS com stubs Nest/auth/DB explícitos localmente, não equivale a typecheck/Nest/PostgreSQL. Cobrem corpo inválido, UUID/enum, prioridade401/403, zero tenant/query para erro, ACK idempotente válido dos três pools, DELETE exato e erro DB. HTTP novo somente localhost descartável: 23JSONs malformados400, GET baseline intacto e outrotenant vazio, rotaDELETE inválida400, 401/403 preservados, UUID real sem trabalho no outrotenant400, profissional real criado/assignment confirmado, três pools com repetição da mesma chave sem duplicidade e DELETEs válidos. bash-n PASS; guard localhost explicitamente aceita127.0.0.1/localhost com porta e rejeita domínio externo ou userinfo antes de rede.

Fatia API/test/script/CI/docs: APK próprio N/A por paths do workflow standalone EXISTENTE e mobile subtree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao #438 aprovado, a revalidar no head e pós-merge; isso NÃO atribui o ZIP438 ao novo SHA, nem fecha seu pós-merge nativo. CI próprio deve aprovar4/713/177/3, typecheck/build/export/frozenlock/migrações/retenção/HTTP/Production Truth e novo marcador de talentos. PENDENTE antes de publicar; só integrar depois de revisão/diff/bytes/head/main/gates exatos. DVT ORIGINALv1.104 atualizado em lugar, histórico preservado, memória/ledger/checkpoint/registry/evidência no mesmo commit.

Próxima ação concreta: publicar fix/talent-input-runtime-validation sobre main438; revisar CI do head exato e N/A condicional, integrar com lease/tree/pais/main e verificar pós-CI. Acompanhar pós-APK438 e retry427 até prova, documentar resultado. Equipes.changeMember abort-only permanece pendência, mas release que permita ADD/DELETE oposto após resultado incerto requer ordenação/reconciliação, não basta idempotência por verbo; não implementado bypass. Criação/aceite de convite, publicação/equipe durável, SecureStore pareado pendente/restart, Visual Truth/Android/E2E físico/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam OPEN. Sem dinheiro real, nova cobrança, contratação ou deploy pago. Rotina ativa; fim de rodada e bloqueio parcial não encerram projeto.


## Recibos imutáveis consultados

Digest dos artefatos refere-se ao ZIP; emulador não é aparelho físico.

```json
{
  "pre438": {
    "head": "534b140eb90ff6c654291a52eeb0c5f13d2e323c",
    "base": "a4a4a730a77811da275b80e79103ebb0f2012580",
    "tree": "2c862ecc83e211ee6919abfe4ca34e79d44a1172",
    "ci": {
      "run": 38118324001,
      "job": 114407664065,
      "counts": [
        4,
        713,
        169,
        3
      ]
    },
    "apk": {
      "run": 38118324003,
      "job": 114407663132,
      "artifact": {
        "id": 11694638840,
        "name": "MLivreTrabalho-standalone-apk",
        "size_in_bytes": 28910944,
        "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694638840",
        "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694638840/zip",
        "expired": false,
        "created_at": "2026-10-11T06:49:03Z",
        "expires_at": "2026-10-25T06:49:01Z",
        "updated_at": "2026-10-11T06:49:03Z",
        "digest": "sha256:ea7563b1a583c7c6ff689f49f58381842b57cb8cb4db21bb7d7175b2491cd64e",
        "workflow_run": {
          "id": 38118324003,
          "repository_id": 1378638985,
          "head_repository_id": 1378638985,
          "head_branch": "fix/member-revoke-screen-deadline",
          "head_sha": "534b140eb90ff6c654291a52eeb0c5f13d2e323c"
        }
      }
    },
    "verifiedAt": "2026-10-11T10:47:54.634Z"
  },
  "merge438": {
    "sha": "27e96142ecde5efa10adb05ef436bb5a3f123865",
    "parents": [
      "a4a4a730a77811da275b80e79103ebb0f2012580",
      "534b140eb90ff6c654291a52eeb0c5f13d2e323c"
    ],
    "tree": "2c862ecc83e211ee6919abfe4ca34e79d44a1172"
  },
  "post438CI": {
    "head": "27e96142ecde5efa10adb05ef436bb5a3f123865",
    "run": 38133235768,
    "job": 114451722736,
    "attempt": 1,
    "counts": [
      4,
      713,
      169,
      3
    ],
    "http": [
      "2026-10-11T10:50:16.1745522Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
      "2026-10-11T10:50:20.8310963Z PASS: Production Truth Gate health/readiness contract"
    ],
    "pending": false
  },
  "post438APK": {
    "run": 38133235730,
    "head": "27e96142ecde5efa10adb05ef436bb5a3f123865",
    "pending": true,
    "status": "in_progress"
  },
  "postNative425to434": [
    {
      "pr": 425,
      "head": "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
      "run": 38117688718,
      "proof": {
        "head": "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
        "run": 38117688718,
        "job": 114405782300,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:34:50.9723718Z Success",
          "2026-10-11T06:35:24.3652148Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11694263213,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28908985,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694263213",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694263213/zip",
          "expired": false,
          "created_at": "2026-10-11T06:35:39Z",
          "expires_at": "2026-10-25T06:35:37Z",
          "updated_at": "2026-10-11T06:35:39Z",
          "digest": "sha256:5ad6afe6dac842c2b546eb352f79faa2f456d2d6c71d6e61d8226ad581eb8681",
          "workflow_run": {
            "id": 38117688718,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "c6334b4ec643a17a9420f1981c77e10d1488d9e0"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 426,
      "head": "321aa035059347fb6cd734acce0045c0fd9fca0c",
      "run": 38117698241,
      "proof": {
        "head": "321aa035059347fb6cd734acce0045c0fd9fca0c",
        "run": 38117698241,
        "job": 114405811522,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:42:52.2444298Z Success",
          "2026-10-11T06:43:33.2561588Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11694603570,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28909230,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694603570",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694603570/zip",
          "expired": false,
          "created_at": "2026-10-11T06:43:46Z",
          "expires_at": "2026-10-25T06:43:44Z",
          "updated_at": "2026-10-11T06:43:46Z",
          "digest": "sha256:a6d9066c7bf3a43d2074da9709b06be187d69117c91a8113446be4fe0d659d91",
          "workflow_run": {
            "id": 38117698241,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "321aa035059347fb6cd734acce0045c0fd9fca0c"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 427,
      "head": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
      "run": 38117706908,
      "proof": {
        "pending": true,
        "failure": {
          "head": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
          "run": 38117706908,
          "job": 114405838646,
          "attempt": 1,
          "phase": "install, Android PackageManager unavailable/crashed",
          "build": "success",
          "install": "not approved",
          "launch": "not approved",
          "errors": [
            "Broken pipe (32)",
            "Can't find service: package",
            "PackageManagerInternal.freeStorage null"
          ],
          "failureUTC": "2026-10-11T06:41:54.8029345Z",
          "diagnostic": {
            "id": 11694012855,
            "name": "MLivreTrabalho-device-smoke-logs",
            "size_in_bytes": 200575,
            "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694012855",
            "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694012855/zip",
            "expired": false,
            "created_at": "2026-10-11T06:42:04Z",
            "expires_at": "2026-10-25T06:42:03Z",
            "updated_at": "2026-10-11T06:42:04Z",
            "digest": "sha256:f134f33c6bfb0219e5c98c33d048c10a0f50ef564600d1e300a02d06f7bd6582",
            "workflow_run": {
              "id": 38117706908,
              "repository_id": 1378638985,
              "head_repository_id": 1378638985,
              "head_branch": "main",
              "head_sha": "9678fb99a37b3f4bf699347ca439936ecc4dc25f"
            }
          }
        },
        "retry": 2
      }
    },
    {
      "pr": 428,
      "head": "b298d5291df5a657136c66d316055c7615c30a4d",
      "run": 38117716994,
      "proof": {
        "head": "b298d5291df5a657136c66d316055c7615c30a4d",
        "run": 38117716994,
        "job": 114405867649,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:43:33.3406045Z Success",
          "2026-10-11T06:44:44.4720762Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693593939,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28909406,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693593939",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693593939/zip",
          "expired": false,
          "created_at": "2026-10-11T06:44:59Z",
          "expires_at": "2026-10-25T06:44:56Z",
          "updated_at": "2026-10-11T06:44:59Z",
          "digest": "sha256:c558b51ebd95c74abc6e2120745792a9c4788b127dc53546b98f1c3284d24ab1",
          "workflow_run": {
            "id": 38117716994,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "b298d5291df5a657136c66d316055c7615c30a4d"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 429,
      "head": "c05a95fc29490a5dff25d71546c2a535d6f97d33",
      "run": 38117728773,
      "proof": {
        "head": "c05a95fc29490a5dff25d71546c2a535d6f97d33",
        "run": 38117728773,
        "job": 114405899847,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:43:21.5061305Z Success",
          "2026-10-11T06:44:11.7649117Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11694244131,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28909676,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694244131",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694244131/zip",
          "expired": false,
          "created_at": "2026-10-11T06:44:25Z",
          "expires_at": "2026-10-25T06:44:22Z",
          "updated_at": "2026-10-11T06:44:25Z",
          "digest": "sha256:671df1f285c96d136817cad0f47d6ad78868ac7d0342f0162c2c90f3b73162ec",
          "workflow_run": {
            "id": 38117728773,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "c05a95fc29490a5dff25d71546c2a535d6f97d33"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 430,
      "head": "5aa8a055ab715e91e39dac4989039375b3a75c1f",
      "run": 38117818330,
      "proof": {
        "head": "5aa8a055ab715e91e39dac4989039375b3a75c1f",
        "run": 38117818330,
        "job": 114406174454,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:39:37.6600483Z Success",
          "2026-10-11T06:40:15.8877824Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693889661,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28910209,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693889661",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693889661/zip",
          "expired": false,
          "created_at": "2026-10-11T06:40:31Z",
          "expires_at": "2026-10-25T06:40:29Z",
          "updated_at": "2026-10-11T06:40:31Z",
          "digest": "sha256:886c98738ddf44b103c5e665e1e627a0740c90497e355bb510c577079f48c8ae",
          "workflow_run": {
            "id": 38117818330,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "5aa8a055ab715e91e39dac4989039375b3a75c1f"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 431,
      "head": "abf5f84304d7198fb75b999c4db3f5add54c8127",
      "run": 38117828684,
      "proof": {
        "head": "abf5f84304d7198fb75b999c4db3f5add54c8127",
        "run": 38117828684,
        "job": 114406206380,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:44:49.6959838Z Success",
          "2026-10-11T06:45:48.7690700Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693988396,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28910194,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693988396",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693988396/zip",
          "expired": false,
          "created_at": "2026-10-11T06:46:04Z",
          "expires_at": "2026-10-25T06:46:02Z",
          "updated_at": "2026-10-11T06:46:04Z",
          "digest": "sha256:b0508704ecc6f198725c87fa3b5d844cdd9843f6667f2c6f1efcad9ddd09371b",
          "workflow_run": {
            "id": 38117828684,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "abf5f84304d7198fb75b999c4db3f5add54c8127"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 432,
      "head": "f580690d383eb6f8bc33d231849044b11f48c1ec",
      "run": 38117838770,
      "proof": {
        "head": "f580690d383eb6f8bc33d231849044b11f48c1ec",
        "run": 38117838770,
        "job": 114406235052,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:38:41.2302529Z Success",
          "2026-10-11T06:39:19.1485150Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693882964,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28910353,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693882964",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693882964/zip",
          "expired": false,
          "created_at": "2026-10-11T06:39:22Z",
          "expires_at": "2026-10-25T06:39:20Z",
          "updated_at": "2026-10-11T06:39:22Z",
          "digest": "sha256:65b16f22ad07004cbe09aad27c9f0360270cae336ba5be1b7f4ef3883ec86f28",
          "workflow_run": {
            "id": 38117838770,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "f580690d383eb6f8bc33d231849044b11f48c1ec"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 433,
      "head": "5aa264d3457f7146a2ab741890f7830c77f20a20",
      "run": 38117848154,
      "proof": {
        "head": "5aa264d3457f7146a2ab741890f7830c77f20a20",
        "run": 38117848154,
        "job": 114406262893,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:45:01.5393603Z Success",
          "2026-10-11T06:45:55.2983020Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11693599089,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28910372,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693599089",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693599089/zip",
          "expired": false,
          "created_at": "2026-10-11T06:46:10Z",
          "expires_at": "2026-10-25T06:46:07Z",
          "updated_at": "2026-10-11T06:46:10Z",
          "digest": "sha256:762d4e0c0fd3be040e5fffa38c550f2771d41f1d80a81ecfd1915954d7c67ba2",
          "workflow_run": {
            "id": 38117848154,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "5aa264d3457f7146a2ab741890f7830c77f20a20"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 434,
      "head": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
      "run": 38117857802,
      "proof": {
        "head": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
        "run": 38117857802,
        "job": 114406290888,
        "attempt": 1,
        "markers": [
          "2026-10-11T06:43:16.6414045Z Success",
          "2026-10-11T06:44:01.6375683Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11694324010,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28910595,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694324010",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694324010/zip",
          "expired": false,
          "created_at": "2026-10-11T06:44:22Z",
          "expires_at": "2026-10-25T06:44:20Z",
          "updated_at": "2026-10-11T06:44:22Z",
          "digest": "sha256:7ea88a41133d23c46b967a6003c998ed4889e8c1073e0ee1935b3e62baf1ad19",
          "workflow_run": {
            "id": 38117857802,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849"
          }
        },
        "pending": false
      }
    }
  ]
}
```
