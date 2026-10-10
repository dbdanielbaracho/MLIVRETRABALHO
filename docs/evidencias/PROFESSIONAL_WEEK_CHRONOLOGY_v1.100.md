# Ordem cronológica da semana profissional

A API GET /v1/planner/my-week ordenava o resultado final por String(startsAt).localeCompare. Datas do driver PostgreSQL podem ser objetos Date: os nomes dos dias na string ordenavam quinta antes de terça. Strings ISO com offsets diferentes também não ordenam instantes corretamente. A comparação final passa a usar new Date(startsAt).getTime(), preservando os valores originais enviados, seleção/buildWeek, limite de sete, roleFit/score, disponibilidade, lookup da identidade e consulta NETWORK_SHARED existente.

Cinco regressões novas: Date terça/quinta; strings ISO com offsets; binding do perfil real/disponibilidade/filtro de função sem escrita; auth negada/perfil ausente; erro de banco sem semana vazia fabricada. No código anterior, as duas regressões cronológicas falharam e as outras três passaram. Conjunto local 67/67 aprovado em 2026-10-10; adaptador explícito Node 24 com stubs Nest/decorators, sem alegar Nest/HTTP/PostgreSQL real.

A fixture HTTP existente e restrita a localhost/banco efêmero agora cria duas oportunidades públicas de empresas distintas em próxima terça/quinta UTC, adiciona disponibilidade real pelo endpoint POST /availability/mine, usa uma função exclusiva da fixture no perfil e verifica IDs e instantes no GET autenticado sem header tenant. Não altera catálogo canônico, assignment/contratação/pagamento ou infraestrutura; todas as asserções anteriores de suporte/conversões/team-plan permanecem. bash -n aprovado. Prova HTTP PostgreSQL própria e CI completo ainda pendentes antes da publicação; esperado 408 mobile / 145 API / 4 web / 3 CLI, typecheck/build/export/migrations/HTTP.

Escopo: comparator do controller, cinco testes API, bloco de fixture HTTP e documentação. React 19.1.4, React Native 0.81.6, lockfile, mobile, navegação, tenant/RLS e autorização existentes preservados. APK próprio N/A somente após confirmar paths efetivos e árvore apps/mobile idêntica à main aprovada; APKs pós-merge dos predecessores não dispensados. Nenhuma chamada de produção, PSP, dinheiro real, custo novo ou deploy pago. Visual Truth físico e demais gates externos permanecem abertos.

## Integração e gates verificados

Consulta em 2026-10-10 23:13:23 UTC. Main 104fdd9aef14eec9530d5df609da3d4f498c03d7, árvore 5eb3869df0179f5b724e9f08253143f29ef4ecf5, Documento da Verdade v1.99. #401–410 integradas em ordem nesta execução. Antes de cada merge: main/head/base frescos; retarget main; merge-base tree equivalente à main; diff fresco igual ao revisado; CI no SHA exato com todos os passos/logs/testes e native aplicável aprovado. mergeable=null imediato foi reconsultado, sem conflito real ou overwrite. Após cada merge: PR/main/pais [main anterior, head aprovado] e árvore idêntica ao head aprovado confirmados.

| PR | Head aprovado | Merge real | Árvore | CI próprio | APK próprio |
|---|---|---|---|---|---|
| #401 | c3c8fd6d8c9dff52b82490e2218a1ad5571a624f | 0ee519ee064087802ad67cef4c96be4d97165e14 | 58261f5ead32453c846fa92429d522adedcea1f0 | 38074120019, 4/352/105/3 (web/mobile/API/CLI) | 38074120056 aprovado; ZIP 11680330073 |
| #402 | 89ae3de32f57c90852eef42f2f3f290364591fb2 | 4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39 | 0fa0a24f2e36004a281743eeca9499b5921e8153 | 38074817938, 4/352/110/3 (web/mobile/API/CLI) | N/A: paths e mobile idêntico |
| #403 | c762e5f1607aac3a06ac7f9c51be10a55c5b69cc | 694991dc62ed3292be501d90661ab16aecd2b3a8 | db552b101ccaa54ef5e1e5562bec5bcf482c2360 | 38075196323, 4/369/110/3 (web/mobile/API/CLI) | 38075196283 aprovado; ZIP 11678610994 |
| #404 | f39891c5f9742739933dbd5f47659013d7e6adf8 | 94053d598ad5f2a3c4402181577a5dd6eafeb509 | e569e1f7d074d5d255f0caccd6bc504f1671ba0f | 38075494028, 4/377/110/3 (web/mobile/API/CLI) | 38075494042 aprovado; ZIP 11679641315 |
| #405 | 7cc6f149b79b2facabaf72db9ab53e70e2b46d2b | f82251ad97e11bf2de2745fba7acee7d3aa5e6ac | fa1842da48675baded1fd93a694ace9598f1d080 | 38076148645, 4/377/119/3 (web/mobile/API/CLI) | N/A: paths e mobile idêntico |
| #406 | 7d33fe51056ff0de3959f3cfc57c69ff3d1bdb48 | 3edd8067280fe001f25cabae5c704de91abffc9b | 5edb2a42020b17b7f14a1d7637437f62913facf0 | 38076567880, 4/377/131/3 (web/mobile/API/CLI) | N/A: paths e mobile idêntico |
| #407 | cfd49fa3f7d290f7847a3d1621ab0b5c73727924 | 60a49f2322dad50d0c0d83de5117cfc7d74adbd5 | 16013272d2eb396ee2c87801dfd48773197e5c8f | 38077221055, 4/377/140/3 (web/mobile/API/CLI) | N/A: paths e mobile idêntico |
| #408 | 41a8ce990560cbfed040311511b11c873d656196 | 2ffaa52836a5c2a181353bddaee7f4547464de0a | b8292b2022d49c5a8a62c35b28acbe34e9f6b35a | 38077510496, 4/383/140/3 (web/mobile/API/CLI) | 38077510463 aprovado; ZIP 11679690983 |
| #409 | 6d57c62f864ee660c6573f101db1e515dd0be183 | d5a1a799189fd4ca26b4ad785db4c12a1ab18b14 | 10c1670c39e2583e4f14e94c157b4cd616a172e0 | 38077842127, 4/396/140/3 (web/mobile/API/CLI) | 38077842117 aprovado; ZIP 11679639522 |
| #410 | 77cba466e6f25371a9c8e985ebe6c84adb2b7733 | 104fdd9aef14eec9530d5df609da3d4f498c03d7 | 5eb3869df0179f5b724e9f08253143f29ef4ecf5 | 38078289964, 4/408/140/3 (web/mobile/API/CLI) | 38078289694 aprovado; ZIP 11679956387 |

## Pós-merge no SHA real

- #401: CI 38094002384 comprovado por passos/log/counts; Standalone Pilot APK 38094002404: in_progress/pendente; CI 38094002384: completed/success. APK pós-merge obrigatório; não substituir pelo pré-merge.
- #402: CI 38094031044 comprovado por passos/log/counts; CI 38094031044: completed/success. APK próprio N/A por paths e árvore mobile equivalentes; não dispensa gates nativos dos predecessores.
- #403: Standalone Pilot APK 38094055730: in_progress/pendente; CI 38094055691: in_progress/pendente. APK pós-merge obrigatório; não substituir pelo pré-merge.
- #404: Standalone Pilot APK 38094078455: in_progress/pendente; CI 38094078457: in_progress/pendente. APK pós-merge obrigatório; não substituir pelo pré-merge.
- #405: CI 38094096342: in_progress/pendente. APK próprio N/A por paths e árvore mobile equivalentes; não dispensa gates nativos dos predecessores.
- #406: CI 38094118894: in_progress/pendente. APK próprio N/A por paths e árvore mobile equivalentes; não dispensa gates nativos dos predecessores.
- #407: CI 38094135415: in_progress/pendente. APK próprio N/A por paths e árvore mobile equivalentes; não dispensa gates nativos dos predecessores.
- #408: Standalone Pilot APK 38094159162: in_progress/pendente; CI 38094159144: in_progress/pendente. APK pós-merge obrigatório; não substituir pelo pré-merge.
- #409: Standalone Pilot APK 38094180701: in_progress/pendente; CI 38094180653: in_progress/pendente. APK pós-merge obrigatório; não substituir pelo pré-merge.
- #410: workflows pós-merge ainda não listados. APK pós-merge obrigatório; não substituir pelo pré-merge.

#401 APK próprio tentativa2 aprovado: instalação19:15:37.2682342Z e DEVICE_SMOKE_OK sem Metro19:16:35.2337196Z; ZIP11680330073, sha256:183062d44397ec581e66a97bcbf0a4d1df045d707bbf259b3e2122f5779daeaf. Tentativa1 cancelada no boot antes de instalar; diagnóstico preservado em v1.97–99. Retry único recuperado; não repetir. Digests são de ZIPs de artefato, não do APK individual. Sucesso em emulador não aceita desenho/estados no aparelho.

#396–400 e demais predecessores já integradas; históricos/evidências em v1.99 e journals anteriores. Pós400CI38075689047 e APK38075689034 aprovados no SHA5675327972869b16b0641a738d88f99cfb1a53b0, prova anterior conferida às18:50UTC; não repetir merges/retroceder à checkpoint antiga351–355.

## Provas estruturadas (pré e pós)

```json
[
  {
    "pr": 401,
    "sha": "0ee519ee064087802ad67cef4c96be4d97165e14",
    "tree": "58261f5ead32453c846fa92429d522adedcea1f0",
    "parents": [
      "5675327972869b16b0641a738d88f99cfb1a53b0",
      "c3c8fd6d8c9dff52b82490e2218a1ad5571a624f"
    ],
    "proof": {
      "pr": 401,
      "ownHead": "c3c8fd6d8c9dff52b82490e2218a1ad5571a624f",
      "ownTree": "58261f5ead32453c846fa92429d522adedcea1f0",
      "parentMain": "5675327972869b16b0641a738d88f99cfb1a53b0",
      "mergeBase": "9eeaf89ca2e327bc756610ebd4aebb414840c21b",
      "mergeBaseTree": "c92641013a9228efe3ae44932e7ec3302438a680",
      "ci": {
        "run": 38074120019,
        "job": 114277398094,
        "counts": [
          4,
          352,
          105,
          3
        ],
        "http": [
          "2026-10-10T18:04:15.2563193Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:04:16.5380993Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:04:17.7150551Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:04:17.7365813Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "run": 38074120056,
        "job": 114286755368,
        "attempt": 2,
        "markers": [
          "2026-10-10T19:15:37.2682342Z Success",
          "2026-10-10T19:16:35.2337196Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": 11680330073,
        "digest": "sha256:183062d44397ec581e66a97bcbf0a4d1df045d707bbf259b3e2122f5779daeaf",
        "expires": "2026-10-24T19:16:50Z"
      }
    },
    "runs": [],
    "post": {
      "pr": 401,
      "sha": "0ee519ee064087802ad67cef4c96be4d97165e14",
      "ci": {
        "success": true,
        "run": 38094002384,
        "job": 114336027866,
        "counts": [
          4,
          352,
          105,
          3
        ],
        "http": []
      },
      "native": {
        "run": 38094002404,
        "status": "in_progress",
        "conclusion": null,
        "pending": true
      }
    }
  },
  {
    "pr": 402,
    "sha": "4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39",
    "tree": "0fa0a24f2e36004a281743eeca9499b5921e8153",
    "parents": [
      "0ee519ee064087802ad67cef4c96be4d97165e14",
      "89ae3de32f57c90852eef42f2f3f290364591fb2"
    ],
    "proof": {
      "pr": 402,
      "ownHead": "89ae3de32f57c90852eef42f2f3f290364591fb2",
      "ownTree": "0fa0a24f2e36004a281743eeca9499b5921e8153",
      "parentMain": "0ee519ee064087802ad67cef4c96be4d97165e14",
      "mergeBase": "c3c8fd6d8c9dff52b82490e2218a1ad5571a624f",
      "mergeBaseTree": "58261f5ead32453c846fa92429d522adedcea1f0",
      "ci": {
        "run": 38074817938,
        "job": 114279486213,
        "counts": [
          4,
          352,
          110,
          3
        ],
        "http": [
          "2026-10-10T18:14:16.9699678Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:14:17.6911804Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T18:14:18.2664639Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:14:19.2355852Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:14:19.2577646Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "na": true,
        "mobile": "e528995c9c2f9d17d0f94ae89faaeb214742f267",
        "reason": "API/script/docs only; identical apps/mobile tree to integrated predecessor"
      }
    },
    "runs": [],
    "post": {
      "pr": 402,
      "sha": "4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39",
      "ci": {
        "success": true,
        "run": 38094031044,
        "job": 114336112406,
        "counts": [
          4,
          352,
          110,
          3
        ],
        "http": []
      },
      "native": {
        "na": true,
        "mobile": "e528995c9c2f9d17d0f94ae89faaeb214742f267"
      }
    }
  },
  {
    "pr": 403,
    "sha": "694991dc62ed3292be501d90661ab16aecd2b3a8",
    "tree": "db552b101ccaa54ef5e1e5562bec5bcf482c2360",
    "parents": [
      "4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39",
      "c762e5f1607aac3a06ac7f9c51be10a55c5b69cc"
    ],
    "proof": {
      "pr": 403,
      "ownHead": "c762e5f1607aac3a06ac7f9c51be10a55c5b69cc",
      "ownTree": "db552b101ccaa54ef5e1e5562bec5bcf482c2360",
      "parentMain": "4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39",
      "mergeBase": "89ae3de32f57c90852eef42f2f3f290364591fb2",
      "mergeBaseTree": "0fa0a24f2e36004a281743eeca9499b5921e8153",
      "ci": {
        "run": 38075196323,
        "job": 114280600176,
        "counts": [
          4,
          369,
          110,
          3
        ],
        "http": [
          "2026-10-10T18:20:03.7074582Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:20:04.4274648Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T18:20:05.0802132Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:20:06.2275631Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:20:06.2554577Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "run": 38075196283,
        "job": 114280600283,
        "attempt": 1,
        "markers": [
          "2026-10-10T18:36:16.1963247Z Success",
          "2026-10-10T18:36:58.0455584Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": 11678610994,
        "digest": "sha256:d28d573db48b1010a7df2dbcbaed41ea7ce92e7c8b3a0cc3880be7410e58da6f",
        "expires": "2026-10-24T18:37:14Z"
      }
    },
    "runs": [],
    "post": {
      "pending": true,
      "runs": [
        {
          "id": 38094055730,
          "name": "Standalone Pilot APK",
          "head": "694991dc62ed3292be501d90661ab16aecd2b3a8",
          "status": "in_progress",
          "conclusion": null
        },
        {
          "id": 38094055691,
          "name": "CI",
          "head": "694991dc62ed3292be501d90661ab16aecd2b3a8",
          "status": "in_progress",
          "conclusion": null
        }
      ]
    }
  },
  {
    "pr": 404,
    "sha": "94053d598ad5f2a3c4402181577a5dd6eafeb509",
    "tree": "e569e1f7d074d5d255f0caccd6bc504f1671ba0f",
    "parents": [
      "694991dc62ed3292be501d90661ab16aecd2b3a8",
      "f39891c5f9742739933dbd5f47659013d7e6adf8"
    ],
    "proof": {
      "pr": 404,
      "ownHead": "f39891c5f9742739933dbd5f47659013d7e6adf8",
      "ownTree": "e569e1f7d074d5d255f0caccd6bc504f1671ba0f",
      "parentMain": "694991dc62ed3292be501d90661ab16aecd2b3a8",
      "mergeBase": "c762e5f1607aac3a06ac7f9c51be10a55c5b69cc",
      "mergeBaseTree": "db552b101ccaa54ef5e1e5562bec5bcf482c2360",
      "ci": {
        "run": 38075494028,
        "job": 114281481865,
        "counts": [
          4,
          377,
          110,
          3
        ],
        "http": [
          "2026-10-10T18:24:35.4598760Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:24:36.1684336Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T18:24:36.7912079Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:24:37.9254599Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:24:37.9544494Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "run": 38075494042,
        "job": 114281481988,
        "attempt": 1,
        "markers": [
          "2026-10-10T18:43:45.0858542Z Success",
          "2026-10-10T18:44:35.9077518Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": 11679641315,
        "digest": "sha256:4fa36a04f52f6d1d226b4981dd955fe7e7405b38310c870a274319bb4fc6a2f9",
        "expires": "2026-10-24T18:44:51Z"
      }
    },
    "runs": [],
    "post": {
      "pending": true,
      "runs": [
        {
          "id": 38094078455,
          "name": "Standalone Pilot APK",
          "head": "94053d598ad5f2a3c4402181577a5dd6eafeb509",
          "status": "in_progress",
          "conclusion": null
        },
        {
          "id": 38094078457,
          "name": "CI",
          "head": "94053d598ad5f2a3c4402181577a5dd6eafeb509",
          "status": "in_progress",
          "conclusion": null
        }
      ]
    }
  },
  {
    "pr": 405,
    "sha": "f82251ad97e11bf2de2745fba7acee7d3aa5e6ac",
    "tree": "fa1842da48675baded1fd93a694ace9598f1d080",
    "parents": [
      "94053d598ad5f2a3c4402181577a5dd6eafeb509",
      "7cc6f149b79b2facabaf72db9ab53e70e2b46d2b"
    ],
    "proof": {
      "pr": 405,
      "ownHead": "7cc6f149b79b2facabaf72db9ab53e70e2b46d2b",
      "ownTree": "fa1842da48675baded1fd93a694ace9598f1d080",
      "parentMain": "94053d598ad5f2a3c4402181577a5dd6eafeb509",
      "mergeBase": "f39891c5f9742739933dbd5f47659013d7e6adf8",
      "mergeBaseTree": "e569e1f7d074d5d255f0caccd6bc504f1671ba0f",
      "ci": {
        "run": 38076148645,
        "job": 114283385677,
        "counts": [
          4,
          377,
          119,
          3
        ],
        "http": [
          "2026-10-10T18:34:22.3925995Z PASS: malformed capability bodies are HTTP400 after authentication, without overwriting canonical registration",
          "2026-10-10T18:34:22.4771242Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:34:23.1449418Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T18:34:23.7568022Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:34:24.8527194Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:34:24.8814286Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "na": true,
        "mobile": "39e121e416614fa92ce16775d19e65648492d9f3",
        "reason": "API/script/docs only; identical apps/mobile tree to integrated predecessor"
      }
    },
    "runs": [],
    "post": {
      "pending": true,
      "runs": [
        {
          "id": 38094096342,
          "name": "CI",
          "head": "f82251ad97e11bf2de2745fba7acee7d3aa5e6ac",
          "status": "in_progress",
          "conclusion": null
        }
      ]
    }
  },
  {
    "pr": 406,
    "sha": "3edd8067280fe001f25cabae5c704de91abffc9b",
    "tree": "5edb2a42020b17b7f14a1d7637437f62913facf0",
    "parents": [
      "f82251ad97e11bf2de2745fba7acee7d3aa5e6ac",
      "7d33fe51056ff0de3959f3cfc57c69ff3d1bdb48"
    ],
    "proof": {
      "pr": 406,
      "ownHead": "7d33fe51056ff0de3959f3cfc57c69ff3d1bdb48",
      "ownTree": "5edb2a42020b17b7f14a1d7637437f62913facf0",
      "parentMain": "f82251ad97e11bf2de2745fba7acee7d3aa5e6ac",
      "mergeBase": "7cc6f149b79b2facabaf72db9ab53e70e2b46d2b",
      "mergeBaseTree": "fa1842da48675baded1fd93a694ace9598f1d080",
      "ci": {
        "run": 38076567880,
        "job": 114284679931,
        "counts": [
          4,
          377,
          131,
          3
        ],
        "http": [
          "2026-10-10T18:40:21.2282621Z PASS: malformed capability bodies are HTTP400 after authentication, without overwriting canonical registration",
          "2026-10-10T18:40:21.3110912Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:40:22.0477939Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T18:40:22.7006120Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:40:23.8633766Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:40:24.1149470Z PASS: malformed direct-hire proposal/response, noncompleted and cross-tenant references cannot create a conversion",
          "2026-10-10T18:40:24.1420713Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "na": true,
        "mobile": "39e121e416614fa92ce16775d19e65648492d9f3",
        "reason": "API/script/docs only; identical apps/mobile tree to integrated predecessor"
      }
    },
    "runs": [],
    "post": {
      "pending": true,
      "runs": [
        {
          "id": 38094118894,
          "name": "CI",
          "head": "3edd8067280fe001f25cabae5c704de91abffc9b",
          "status": "in_progress",
          "conclusion": null
        }
      ]
    }
  },
  {
    "pr": 407,
    "sha": "60a49f2322dad50d0c0d83de5117cfc7d74adbd5",
    "tree": "16013272d2eb396ee2c87801dfd48773197e5c8f",
    "parents": [
      "3edd8067280fe001f25cabae5c704de91abffc9b",
      "cfd49fa3f7d290f7847a3d1621ab0b5c73727924"
    ],
    "proof": {
      "pr": 407,
      "ownHead": "cfd49fa3f7d290f7847a3d1621ab0b5c73727924",
      "ownTree": "16013272d2eb396ee2c87801dfd48773197e5c8f",
      "parentMain": "3edd8067280fe001f25cabae5c704de91abffc9b",
      "mergeBase": "7d33fe51056ff0de3959f3cfc57c69ff3d1bdb48",
      "mergeBaseTree": "5edb2a42020b17b7f14a1d7637437f62913facf0",
      "ci": {
        "run": 38077221055,
        "job": 114286615558,
        "counts": [
          4,
          377,
          140,
          3
        ],
        "http": [
          "2026-10-10T18:49:41.2516491Z PASS: malformed capability bodies are HTTP400 after authentication, without overwriting canonical registration",
          "2026-10-10T18:49:41.3437149Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:49:41.8604474Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T18:49:42.3474921Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:49:43.1767667Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:49:43.3530680Z PASS: malformed direct-hire proposal/response, noncompleted and cross-tenant references cannot create a conversion",
          "2026-10-10T18:49:43.4457274Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state",
          "2026-10-10T18:49:43.4672464Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "na": true,
        "mobile": "39e121e416614fa92ce16775d19e65648492d9f3",
        "reason": "API/script/docs only; identical apps/mobile tree to integrated predecessor"
      }
    },
    "runs": [],
    "post": {
      "pending": true,
      "runs": [
        {
          "id": 38094135415,
          "name": "CI",
          "head": "60a49f2322dad50d0c0d83de5117cfc7d74adbd5",
          "status": "in_progress",
          "conclusion": null
        }
      ]
    }
  },
  {
    "pr": 408,
    "sha": "2ffaa52836a5c2a181353bddaee7f4547464de0a",
    "tree": "b8292b2022d49c5a8a62c35b28acbe34e9f6b35a",
    "parents": [
      "60a49f2322dad50d0c0d83de5117cfc7d74adbd5",
      "41a8ce990560cbfed040311511b11c873d656196"
    ],
    "proof": {
      "pr": 408,
      "ownHead": "41a8ce990560cbfed040311511b11c873d656196",
      "ownTree": "b8292b2022d49c5a8a62c35b28acbe34e9f6b35a",
      "parentMain": "60a49f2322dad50d0c0d83de5117cfc7d74adbd5",
      "mergeBase": "cfd49fa3f7d290f7847a3d1621ab0b5c73727924",
      "mergeBaseTree": "16013272d2eb396ee2c87801dfd48773197e5c8f",
      "ci": {
        "run": 38077510496,
        "job": 114287470090,
        "counts": [
          4,
          383,
          140,
          3
        ],
        "http": [
          "2026-10-10T18:54:25.6860383Z PASS: malformed capability bodies are HTTP400 after authentication, without overwriting canonical registration",
          "2026-10-10T18:54:25.7672384Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:54:26.4898812Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T18:54:27.1340535Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:54:28.2838779Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:54:28.5181366Z PASS: malformed direct-hire proposal/response, noncompleted and cross-tenant references cannot create a conversion",
          "2026-10-10T18:54:28.6445265Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state",
          "2026-10-10T18:54:28.6747780Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "run": 38077510463,
        "job": 114287470081,
        "attempt": 1,
        "markers": [
          "2026-10-10T19:10:24.4672153Z Success",
          "2026-10-10T19:11:05.9989871Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": 11679690983,
        "digest": "sha256:0b7e8515ede388b66e1658c6bfdd0c5fbf27dd20bda960912f90f4b450de3bd0",
        "expires": "2026-10-24T19:11:26Z"
      }
    },
    "runs": [],
    "post": {
      "pending": true,
      "runs": [
        {
          "id": 38094159162,
          "name": "Standalone Pilot APK",
          "head": "2ffaa52836a5c2a181353bddaee7f4547464de0a",
          "status": "in_progress",
          "conclusion": null
        },
        {
          "id": 38094159144,
          "name": "CI",
          "head": "2ffaa52836a5c2a181353bddaee7f4547464de0a",
          "status": "in_progress",
          "conclusion": null
        }
      ]
    }
  },
  {
    "pr": 409,
    "sha": "d5a1a799189fd4ca26b4ad785db4c12a1ab18b14",
    "tree": "10c1670c39e2583e4f14e94c157b4cd616a172e0",
    "parents": [
      "2ffaa52836a5c2a181353bddaee7f4547464de0a",
      "6d57c62f864ee660c6573f101db1e515dd0be183"
    ],
    "proof": {
      "pr": 409,
      "ownHead": "6d57c62f864ee660c6573f101db1e515dd0be183",
      "ownTree": "10c1670c39e2583e4f14e94c157b4cd616a172e0",
      "parentMain": "2ffaa52836a5c2a181353bddaee7f4547464de0a",
      "mergeBase": "41a8ce990560cbfed040311511b11c873d656196",
      "mergeBaseTree": "b8292b2022d49c5a8a62c35b28acbe34e9f6b35a",
      "ci": {
        "run": 38077842127,
        "job": 114288445864,
        "counts": [
          4,
          396,
          140,
          3
        ],
        "http": [
          "2026-10-10T18:59:26.9505940Z PASS: malformed capability bodies are HTTP400 after authentication, without overwriting canonical registration",
          "2026-10-10T18:59:27.0610031Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T18:59:27.7870865Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T18:59:28.4328077Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T18:59:29.5935637Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T18:59:29.8295073Z PASS: malformed direct-hire proposal/response, noncompleted and cross-tenant references cannot create a conversion",
          "2026-10-10T18:59:29.9634240Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state",
          "2026-10-10T18:59:29.9947043Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "run": 38077842117,
        "job": 114288445492,
        "attempt": 1,
        "markers": [
          "2026-10-10T19:12:40.0589385Z Success",
          "2026-10-10T19:13:13.5935649Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": 11679639522,
        "digest": "sha256:a764922f8f8aedee8ef0514cd0f9ef71079fac94fa99d45d82237b6991d80300",
        "expires": "2026-10-24T19:13:27Z"
      }
    },
    "runs": [],
    "post": {
      "pending": true,
      "runs": [
        {
          "id": 38094180701,
          "name": "Standalone Pilot APK",
          "head": "d5a1a799189fd4ca26b4ad785db4c12a1ab18b14",
          "status": "in_progress",
          "conclusion": null
        },
        {
          "id": 38094180653,
          "name": "CI",
          "head": "d5a1a799189fd4ca26b4ad785db4c12a1ab18b14",
          "status": "in_progress",
          "conclusion": null
        }
      ]
    }
  },
  {
    "pr": 410,
    "sha": "104fdd9aef14eec9530d5df609da3d4f498c03d7",
    "tree": "5eb3869df0179f5b724e9f08253143f29ef4ecf5",
    "parents": [
      "d5a1a799189fd4ca26b4ad785db4c12a1ab18b14",
      "77cba466e6f25371a9c8e985ebe6c84adb2b7733"
    ],
    "proof": {
      "pr": 410,
      "ownHead": "77cba466e6f25371a9c8e985ebe6c84adb2b7733",
      "ownTree": "5eb3869df0179f5b724e9f08253143f29ef4ecf5",
      "parentMain": "d5a1a799189fd4ca26b4ad785db4c12a1ab18b14",
      "mergeBase": "6d57c62f864ee660c6573f101db1e515dd0be183",
      "mergeBaseTree": "10c1670c39e2583e4f14e94c157b4cd616a172e0",
      "ci": {
        "run": 38078289964,
        "job": 114289760185,
        "counts": [
          4,
          408,
          140,
          3
        ],
        "http": [
          "2026-10-10T19:05:44.3183070Z PASS: malformed capability bodies are HTTP400 after authentication, without overwriting canonical registration",
          "2026-10-10T19:05:44.3801287Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T19:05:44.9410854Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T19:05:45.4538950Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T19:05:46.3210288Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T19:05:46.4949995Z PASS: malformed direct-hire proposal/response, noncompleted and cross-tenant references cannot create a conversion",
          "2026-10-10T19:05:46.5935279Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state",
          "2026-10-10T19:05:46.6136810Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "run": 38078289694,
        "job": 114289759379,
        "attempt": 1,
        "markers": [
          "2026-10-10T19:22:18.3424287Z Success",
          "2026-10-10T19:23:00.9139814Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
        ],
        "artifact": 11679956387,
        "digest": "sha256:4d42616f8d844e9c809512675b9d0767a224399836b298e2ce88a1f1b1245be3",
        "expires": "2026-10-24T19:23:17Z"
      }
    },
    "runs": [],
    "post": {
      "pending": true,
      "runs": []
    }
  }
]
```

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.
