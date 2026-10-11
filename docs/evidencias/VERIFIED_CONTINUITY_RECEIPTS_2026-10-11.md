# Recibos verificáveis e retomada de MLIVRETRABALHO

## Recibo de retomada verificada — 2026-10-11 11:16:34 UTC

Base de código: main739908e026ac10bd254e9ea64aa940c404d2f5a0, tree56dea8f89da703f9dbeaf9cd0e321a191e25e04a (#441). Zero PR aberto na última consulta NÃO prova conclusão. README continua apontando ESTE Documento ORIGINALv1.104, todo histórico preservado em lugar. #438/#439/#440/#441 integrados com head próprio/diff/bytes/pais/tree/main/gates aplicáveis revistos. #438 corrige prazo da revogação; #439 entrada de talentos; #440 avaliações; #441 mensagens/UUID. 14+8+9+9 regressões novas, corpos inválidos não chegam a tenant/query nem modificam mensagens/avaliações/notificações reais de fixtures. Fixtures locais não equivalem a Android físico/Nest/PostgreSQL; CI completo/HTTP real comprova a camada servidor.

| PR | Head aprovado | Merge real | CI próprio | CI pós-merge |
|---|---|---|---|---|
|438|534b140eb90ff6c654291a52eeb0c5f13d2e323c|27e96142ecde5efa10adb05ef436bb5a3f123865|38118324001,4/713/169/3|38133235768 PASS|
|439|01a37be1de8554f18fb765f698aea390cff3b092|510b1e5efd192d23ffce7e4b0ec6b9438681ae79|38133627064,4/713/177/3|38133818442 PASS|
|440|0ffd1b196c1faaf41367aa9370d2dd385f3cb77a|5389cb9d27e081892064b5b62740223373b67fd7|38133917114,4/713/186/3|38134128908 PASS|
|441|e910330627554c423b73993a8cc4b81be7fb3a20|739908e026ac10bd254e9ea64aa940c404d2f5a0|38134216666,4/713/195/3|38134447546 PASS|

Todos os CI citados acima têm passos completos sucesso, frozenlock/typecheck/build/export/migrações/retention/todasjornadas/ProductionTruth e marcadores HTTP novos no SHA exato, logs integrais inspecionados. Pós441 usa4/713/195/3 e preserva as três novas jornadas negativas e positivos. APK próprio43838118324003 aprovado no head534b140e, ZIP11694638840/sha256:ea7563b1a583c7c6ff689f49f58381842b57cb8cb4db21bb7d7175b2491cd64e, instalação06:47:48.6657802Z/DEVICE_SMOKE_OK06:48:42.1183401Z sem Metro. Pós-APK43838133235730/job114451722593 ainda EM EXECUÇÃO no merge27e96142, build sucesso11:05:28Z, smoke desde11:05:28Z; NÃO aprovado ainda. Consulta inicial[] não é sucesso. Não repetir rerun enquanto em execução; em eventual failure ler log/diagnóstico integral antes de decidir nova tentativa bounded, nunca relaxar gate.

Pós-merge original419 revalidado nesta rodada: CI38110152658/job114383862793 PASS4/476/145/3 e APK38110152707/job114383862785 PASS no SHA83d5df28f11395522aa5e8e776a38bab491e0a91, ZIP11691234225 e install/launchsemMetro. Pós-APKs425–434 TODOS agora PASS em seus SHAs reais, logs/artifacts exatos não expirados; #427 attempt1 falhou no PackageManager Android após build, diagnóstico11694012855/digestf134f33c6bfb0219e5c98c33d048c10a0f50ef564600d1e300a02d06f7bd6582, uma única nova tentativa do job foi feita após diagnóstico. Attempt2job114451920029 instalou Success11:06:27.4822802Z/DEVICE_SMOKE_OK11:07:05.0871432Z, ZIP11701045213 não expirado. CI pós42738117706895/job114405838661 PASS4/617/145/3 revalidado. Os SHAs/jobs/digests exatos de todos constam no JSON do recibo; digestZIP não APK individual, emulador não físico.

Native próprios/pós-merge439–441 N/A por paths do workflowstandalone e mobile subtree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao código nativo438 aprovado. Este recibo altera SOMENTE docs; APK próprio/pós deste recibo N/A se diff continuar sódocs e subtree idêntica. Não atribuir APK438 ao headAPI/docs e não fechar pós438 pendente. React19.1.4/RN0.81.6 confirmados no package atual; lockfile/desenho/tenant/RLS preservados, nenhum deploy pago/contratação/PSP/dinheiro real.

Item atual: publicar branch docs/verified-receipts-2026-10-11, revisar bytes/diff sódocs/mobile e CI4/713/195/3 no seu head exato; integrar apenas aprovado com lease/pais/tree/main e verificar pós-CI. Este snapshot antecede a criação do commit e seus eventos; SHA/runs dessa PR e verificação final devem ser lidos no GitHub/recibo final da própria PR, sem inferir aprovação desta frase. Ao retomar, consultar main, PRs/runs atuais e final da PR da branch; não repetir qualquer merge438–441 comprovado. Próxima ação operacional paralela: acompanhar38133235730 até resultado real; registrar eventual nova prova no recibo da PR corrente. Gates em execução são acompanhamento, não bloqueio definitivo ou conclusão.

Próxima tarefa segura de código: revalidar AuthController.signup/signin em main atual e reproduzir body null/email/password de tipos errados (há dereference/trim/scrypt com Body apenas tipado), corrigir validação runtime mantendo invalid_signup401, códigos existentes, defaultaccountType, prioridade de validação, scrypt/timing-safe/lockout8failures/15min/max10sessions e TODAS queries/tenant; provar zero DB/credencial para input inválido e positivos pelo CI/HTTP atual. Em seguida SupportController.status nota/corpo tipado e UUID; admin/enum/resultados/retenção inalterados. Essas pendências continuam abertas; não interpretar lista vazia de PRs como ausência de trabalho. Equipes.changeMember exige reconciliação/ordenação de ADD/DELETE desconhecidos, não simplesmente liberar busy; criações/aceite durável/SecureStore pendente não podem ser ultrapassados.

VisualTruth/desenhooriginal/todosestados e dados reais em Android FÍSICO, E2E/piloto/SecureStore/OScrash/teclado/restart, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e WEB-ARCH/Railway eventualmente pago permanecem OPEN; estes recibos não fecham projeto. Bloqueio parcial não cancela alternativas, nem a rotina. Não pedir continuar; não alegar execução24h; fim de rodada não é fim do projeto.


## Evidência do snapshot

```json
{
  "main": {
    "sha": "739908e026ac10bd254e9ea64aa940c404d2f5a0",
    "tree": "56dea8f89da703f9dbeaf9cd0e321a191e25e04a",
    "parents": [
      "5389cb9d27e081892064b5b62740223373b67fd7",
      "e910330627554c423b73993a8cc4b81be7fb3a20"
    ]
  },
  "original419": {
    "ci": {
      "head": "83d5df28f11395522aa5e8e776a38bab491e0a91",
      "run": 38110152658,
      "job": 114383862793,
      "attempt": 1,
      "counts": [
        4,
        476,
        145,
        3
      ],
      "http": [
        "2026-10-11T04:02:07.1053887Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
        "2026-10-11T04:02:12.6035005Z PASS: Production Truth Gate health/readiness contract"
      ],
      "pending": false
    },
    "apk": {
      "head": "83d5df28f11395522aa5e8e776a38bab491e0a91",
      "run": 38110152707,
      "job": 114383862785,
      "attempt": 1,
      "markers": [
        "2026-10-11T04:24:44.9591307Z Success",
        "2026-10-11T04:25:39.3146153Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11691234225,
        "name": "MLivreTrabalho-standalone-apk",
        "size_in_bytes": 28908609,
        "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11691234225",
        "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11691234225/zip",
        "expired": false,
        "created_at": "2026-10-11T04:25:53Z",
        "expires_at": "2026-10-25T04:25:50Z",
        "updated_at": "2026-10-11T04:25:53Z",
        "digest": "sha256:ad45c1776fb81c0a0b47b81fc3ace2a1298f59afa217ec9e3c0f49b6fb980276",
        "workflow_run": {
          "id": 38110152707,
          "repository_id": 1378638985,
          "head_repository_id": 1378638985,
          "head_branch": "main",
          "head_sha": "83d5df28f11395522aa5e8e776a38bab491e0a91"
        }
      },
      "pending": false
    }
  },
  "post425to434": [
    {
      "pr": 425,
      "sha": "c6334b4ec643a17a9420f1981c77e10d1488d9e0",
      "apk": {
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
      "sha": "321aa035059347fb6cd734acce0045c0fd9fca0c",
      "apk": {
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
      "sha": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
      "apk": {
        "head": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
        "run": 38117706908,
        "job": 114451920029,
        "attempt": 2,
        "markers": [
          "2026-10-11T11:06:27.4822802Z Success",
          "2026-10-11T11:07:05.0871432Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": {
          "id": 11701045213,
          "name": "MLivreTrabalho-standalone-apk",
          "size_in_bytes": 28909275,
          "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11701045213",
          "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11701045213/zip",
          "expired": false,
          "created_at": "2026-10-11T11:07:27Z",
          "expires_at": "2026-10-25T11:07:24Z",
          "updated_at": "2026-10-11T11:07:27Z",
          "digest": "sha256:43294dff3f52f8ec2248efd128df6aec1e1b8822d740dfd98beb110c2bf49b49",
          "workflow_run": {
            "id": 38117706908,
            "repository_id": 1378638985,
            "head_repository_id": 1378638985,
            "head_branch": "main",
            "head_sha": "9678fb99a37b3f4bf699347ca439936ecc4dc25f"
          }
        },
        "pending": false
      }
    },
    {
      "pr": 428,
      "sha": "b298d5291df5a657136c66d316055c7615c30a4d",
      "apk": {
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
      "sha": "c05a95fc29490a5dff25d71546c2a535d6f97d33",
      "apk": {
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
      "sha": "5aa8a055ab715e91e39dac4989039375b3a75c1f",
      "apk": {
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
      "sha": "abf5f84304d7198fb75b999c4db3f5add54c8127",
      "apk": {
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
      "sha": "f580690d383eb6f8bc33d231849044b11f48c1ec",
      "apk": {
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
      "sha": "5aa264d3457f7146a2ab741890f7830c77f20a20",
      "apk": {
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
      "sha": "ed6d7efc9249b7dddf3b990f3fdc1b2caf728849",
      "apk": {
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
  ],
  "retry427": {
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
      "http": [
        "2026-10-11T06:22:07.0480295Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
        "2026-10-11T06:22:12.2410596Z PASS: Production Truth Gate health/readiness contract"
      ],
      "pending": false
    },
    "final": {
      "head": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
      "run": 38117706908,
      "job": 114451920029,
      "attempt": 2,
      "markers": [
        "2026-10-11T11:06:27.4822802Z Success",
        "2026-10-11T11:07:05.0871432Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11701045213,
        "name": "MLivreTrabalho-standalone-apk",
        "size_in_bytes": 28909275,
        "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11701045213",
        "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11701045213/zip",
        "expired": false,
        "created_at": "2026-10-11T11:07:27Z",
        "expires_at": "2026-10-25T11:07:24Z",
        "updated_at": "2026-10-11T11:07:27Z",
        "digest": "sha256:43294dff3f52f8ec2248efd128df6aec1e1b8822d740dfd98beb110c2bf49b49",
        "workflow_run": {
          "id": 38117706908,
          "repository_id": 1378638985,
          "head_repository_id": 1378638985,
          "head_branch": "main",
          "head_sha": "9678fb99a37b3f4bf699347ca439936ecc4dc25f"
        }
      },
      "pending": false
    }
  },
  "recent": [
    {
      "pr": 438,
      "pre": {
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
      "merge": {
        "sha": "27e96142ecde5efa10adb05ef436bb5a3f123865",
        "parents": [
          "a4a4a730a77811da275b80e79103ebb0f2012580",
          "534b140eb90ff6c654291a52eeb0c5f13d2e323c"
        ],
        "tree": "2c862ecc83e211ee6919abfe4ca34e79d44a1172"
      },
      "post": {
        "ci": {
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
        "apk": {
          "run": 38133235730,
          "head": "27e96142ecde5efa10adb05ef436bb5a3f123865",
          "pending": true,
          "status": "in_progress"
        }
      }
    },
    {
      "pr": 439,
      "pre": {
        "head": "01a37be1de8554f18fb765f698aea390cff3b092",
        "base": "27e96142ecde5efa10adb05ef436bb5a3f123865",
        "tree": "6f21cd2aadff94ba0da0c11fed370cf9d514f7ef",
        "ci": {
          "head": "01a37be1de8554f18fb765f698aea390cff3b092",
          "run": 38133627064,
          "job": 114452879922,
          "attempt": 1,
          "counts": [
            4,
            713,
            177,
            3
          ],
          "http": [
            "2026-10-11T10:56:48.3335271Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
            "2026-10-11T10:56:53.4433913Z PASS: Production Truth Gate health/readiness contract"
          ],
          "pending": false
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "standalone workflow path filter; mobile unchanged",
          "mobileTree": "4cb705aeb39244f46649bc5c569459ef9b0c5b7d",
          "approvedNativeHead": "534b140eb90ff6c654291a52eeb0c5f13d2e323c",
          "approvedNativeRun": 38118324003,
          "post438NativeSeparate": true
        }
      },
      "merge": {
        "sha": "510b1e5efd192d23ffce7e4b0ec6b9438681ae79",
        "tree": "6f21cd2aadff94ba0da0c11fed370cf9d514f7ef",
        "parents": [
          "27e96142ecde5efa10adb05ef436bb5a3f123865",
          "01a37be1de8554f18fb765f698aea390cff3b092"
        ]
      },
      "post": {
        "ci": {
          "head": "510b1e5efd192d23ffce7e4b0ec6b9438681ae79",
          "run": 38133818442,
          "job": 114453443368,
          "attempt": 1,
          "counts": [
            4,
            713,
            177,
            3
          ],
          "http": [
            "2026-10-11T11:00:02.9200899Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
            "2026-10-11T11:00:08.1807470Z PASS: Production Truth Gate health/readiness contract"
          ],
          "pending": false
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "API-only diff/mobile subtree unchanged",
          "mobileTree": "4cb705aeb39244f46649bc5c569459ef9b0c5b7d",
          "nativeHead": "534b140eb90ff6c654291a52eeb0c5f13d2e323c",
          "nativeRun": 38118324003
        }
      }
    },
    {
      "pr": 440,
      "pre": {
        "head": "0ffd1b196c1faaf41367aa9370d2dd385f3cb77a",
        "base": "510b1e5efd192d23ffce7e4b0ec6b9438681ae79",
        "tree": "ef0fb74e1a61ad7248d3b98b0a47772520b5e765",
        "ci": {
          "head": "0ffd1b196c1faaf41367aa9370d2dd385f3cb77a",
          "run": 38133917114,
          "job": 114453747810,
          "attempt": 1,
          "counts": [
            4,
            713,
            186,
            3
          ],
          "http": [
            "2026-10-11T11:02:00.7851298Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
            "2026-10-11T11:02:09.0017461Z PASS: Production Truth Gate health/readiness contract"
          ],
          "pending": false
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "API/test/script/docs, mobile unchanged by standalone path filter",
          "mobileTree": "4cb705aeb39244f46649bc5c569459ef9b0c5b7d",
          "nativeHead": "534b140eb90ff6c654291a52eeb0c5f13d2e323c",
          "nativeRun": 38118324003,
          "post438NativeSeparate": true
        }
      },
      "merge": {
        "sha": "5389cb9d27e081892064b5b62740223373b67fd7",
        "tree": "ef0fb74e1a61ad7248d3b98b0a47772520b5e765",
        "parents": [
          "510b1e5efd192d23ffce7e4b0ec6b9438681ae79",
          "0ffd1b196c1faaf41367aa9370d2dd385f3cb77a"
        ]
      },
      "post": {
        "ci": {
          "head": "5389cb9d27e081892064b5b62740223373b67fd7",
          "run": 38134128908,
          "job": 114454397145,
          "attempt": 1,
          "counts": [
            4,
            713,
            186,
            3
          ],
          "http": [
            "2026-10-11T11:05:20.4040231Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
            "2026-10-11T11:05:28.1866264Z PASS: Production Truth Gate health/readiness contract"
          ],
          "pending": false
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "API-only diff/mobile subtree unchanged",
          "mobileTree": "4cb705aeb39244f46649bc5c569459ef9b0c5b7d",
          "nativeHead": "534b140eb90ff6c654291a52eeb0c5f13d2e323c",
          "nativeRun": 38118324003
        }
      }
    },
    {
      "pr": 441,
      "pre": {
        "head": "e910330627554c423b73993a8cc4b81be7fb3a20",
        "base": "5389cb9d27e081892064b5b62740223373b67fd7",
        "tree": "56dea8f89da703f9dbeaf9cd0e321a191e25e04a",
        "ci": {
          "head": "e910330627554c423b73993a8cc4b81be7fb3a20",
          "run": 38134216666,
          "job": 114454653580,
          "attempt": 1,
          "counts": [
            4,
            713,
            195,
            3
          ],
          "http": [
            "2026-10-11T11:06:57.5889847Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
            "2026-10-11T11:07:05.7273971Z PASS: Production Truth Gate health/readiness contract"
          ],
          "pending": false
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "API/test/script/docs; unchanged native/shared paths and mobile subtree",
          "mobileTree": "4cb705aeb39244f46649bc5c569459ef9b0c5b7d",
          "nativeHead": "534b140eb90ff6c654291a52eeb0c5f13d2e323c",
          "nativeRun": 38118324003,
          "post438NativeSeparate": true
        }
      },
      "merge": {
        "sha": "739908e026ac10bd254e9ea64aa940c404d2f5a0",
        "tree": "56dea8f89da703f9dbeaf9cd0e321a191e25e04a",
        "parents": [
          "5389cb9d27e081892064b5b62740223373b67fd7",
          "e910330627554c423b73993a8cc4b81be7fb3a20"
        ]
      },
      "post": {
        "ci": {
          "head": "739908e026ac10bd254e9ea64aa940c404d2f5a0",
          "run": 38134447546,
          "job": 114455333533,
          "attempt": 1,
          "counts": [
            4,
            713,
            195,
            3
          ],
          "http": [
            "2026-10-11T11:10:14.6037764Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
            "2026-10-11T11:10:21.6788661Z PASS: Production Truth Gate health/readiness contract"
          ],
          "pending": false
        },
        "apk": {
          "applicability": "not_applicable",
          "reason": "API-only diff/mobile subtree unchanged",
          "mobileTree": "4cb705aeb39244f46649bc5c569459ef9b0c5b7d",
          "nativeHead": "534b140eb90ff6c654291a52eeb0c5f13d2e323c",
          "nativeRun": 38118324003
        }
      }
    }
  ]
}
```
