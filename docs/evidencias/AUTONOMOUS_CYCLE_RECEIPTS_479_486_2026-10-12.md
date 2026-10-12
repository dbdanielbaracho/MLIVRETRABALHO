# MLIVRETRABALHO — recibos finais479–486 / 2026-10-12

Main funcional verificada 41d5165194a70a4a5bfdb0d3d4b90431fc533c9b, tree910e637b49b90834ad3306c41d053f4d5b6b943e. Próprios e pósCI SUCCESS nos SHAs reais; APK483 próprios/pós comprovados. Os estados pending dos históricos foram preservados e são retificados por estes recibos.

| PR | Merge real | Head aprovado | CI próprio | CI pós-merge real |
|---|---|---|---|---|
| #479 | 85fea5d911a6fab758669c9b950fb214ac0190ef | 1ce72d4de424183c875d68645ea452728007dabb | 38185492065/job114606794588/attempt1 SUCCESS 4/729/382/3 | 38185785746/job114607681110/attempt1 SUCCESS 4/729/382/3 |
| #480 | 4cf88daa9e9d4d9be1aeb23e99edc6a631037ec1 | 87f4720e2dfdc018cfa094d926bdaafc940b0540 | 38186117528/job114608677326/attempt1 SUCCESS 4/729/382/3 | 38186459872/job114609716511/attempt1 SUCCESS 4/729/382/3 |
| #481 | 99f4509241755f7e51b8771e59470e43eef98a2d | 52bed1cb0d0d115b537553dc7ae052c31eff41ee | 38186207904/job114608953220/attempt1 SUCCESS 4/729/383/3 | 38186630833/job114610239999/attempt1 SUCCESS 4/729/383/3 |
| #482 | 510b2036b8229a21b1b7f5c836f39240fe6ba3ac | 50c5ec4fe46fda204e359fe1d1dd58f7e1028fb0 | 38189224586/job114618165842/attempt1 SUCCESS 4/729/383/3 | 38190155860/job114620980999/attempt1 SUCCESS 4/729/383/3 |
| #483 | a05314e945f5e9edf3e82650d97e73e21275bd37 | 61e34c6a599c5ad11eeca7fa69db737fbab1c2cf | 38197145030/job114642227976/attempt1 SUCCESS 4/731/383/3 | 38198075369/job114645120178/attempt1 SUCCESS 4/731/383/3 |
| #484 | fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30 | b78c749b24742126b73f2bc076db2694541e5da2 | 38197598960/job114643661686/attempt1 SUCCESS 4/731/383/3/8 | 38198337936/job114645925692/attempt1 SUCCESS 4/731/383/3/8 |
| #485 | 73f523be05d8042cff871ed776a52fd61c95995b | fc2e308edba58932110bae25a2ba8ccacdc19c4e | 38198003282/job114645293186/attempt2 SUCCESS 9/731/383/3/8 | 38198605205/job114646745687/attempt1 SUCCESS 9/731/383/3/8 |
| #486 | 41d5165194a70a4a5bfdb0d3d4b90431fc533c9b | 1f36dd1081be42899beccecf0a15bc7b8e1ee3ef | 38198471412/job114646330881/attempt1 SUCCESS 13/731/383/3/8 | 38198920578/job114647714446/attempt1 SUCCESS 13/731/383/3/8 |

## Recibos integrais: pais, árvore, gates e paths

### PR #479

```json
{
  "pr": 479,
  "merge": "85fea5d911a6fab758669c9b950fb214ac0190ef",
  "head": "1ce72d4de424183c875d68645ea452728007dabb",
  "parents": [
    "a58d0596d1e298defde5e4f62640d02c83e24528",
    "1ce72d4de424183c875d68645ea452728007dabb"
  ],
  "tree": "788442c695c3cb2dda91e89297c225ea117b4ea2",
  "ci": {
    "run": 38185492065,
    "sha": "1ce72d4de424183c875d68645ea452728007dabb",
    "job": 114606794588,
    "attempt": 1,
    "counts": [
      4,
      729,
      382,
      3
    ],
    "success": true,
    "pending": false
  },
  "postci": {
    "run": 38185785746,
    "sha": "85fea5d911a6fab758669c9b950fb214ac0190ef",
    "job": 114607681110,
    "attempt": 1,
    "counts": [
      4,
      729,
      382,
      3
    ],
    "success": true,
    "pending": false
  },
  "apk": "N/A: no changed mobile/shared dependencies/lock/native build or smoke/standalone workflow inputs in exact diff",
  "changedPaths": [
    "apps/api/src/replacement-input.controller.test.ts",
    "apps/api/src/replacement.controller.ts",
    "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "docs/evidencias/EVIDENCE_REGISTRY.md",
    "docs/evidencias/REPLACEMENT_EXCLUDE_ORIGINAL_UUID_2026-10-11.md",
    "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "scripts/http-replacement-e2e.sh"
  ],
  "postCI": {
    "run": 38185785746,
    "sha": "85fea5d911a6fab758669c9b950fb214ac0190ef",
    "job": 114607681110,
    "attempt": 1,
    "counts": [
      4,
      729,
      382,
      3
    ],
    "success": true,
    "pending": false
  }
}
```

### PR #480

```json
{
  "pr": 480,
  "merge": "4cf88daa9e9d4d9be1aeb23e99edc6a631037ec1",
  "head": "87f4720e2dfdc018cfa094d926bdaafc940b0540",
  "parents": [
    "85fea5d911a6fab758669c9b950fb214ac0190ef",
    "87f4720e2dfdc018cfa094d926bdaafc940b0540"
  ],
  "tree": "67d92527f7573c1e38654bdf39f57012b032f253",
  "ci": {
    "run": 38186117528,
    "sha": "87f4720e2dfdc018cfa094d926bdaafc940b0540",
    "job": 114608677326,
    "attempt": 1,
    "counts": [
      4,
      729,
      382,
      3
    ],
    "success": true,
    "pending": false
  },
  "postci": {
    "run": 38186459872,
    "sha": "4cf88daa9e9d4d9be1aeb23e99edc6a631037ec1",
    "job": 114609716511,
    "attempt": 1,
    "counts": [
      4,
      729,
      382,
      3
    ],
    "success": true,
    "pending": false
  },
  "apk": "N/A: no changed mobile/shared dependencies/lock/native build or smoke/standalone workflow inputs in exact diff",
  "changedPaths": [
    "apps/api/src/replacement.controller.ts",
    "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "docs/evidencias/EVIDENCE_REGISTRY.md",
    "docs/evidencias/REPLACEMENT_SELECTION_CONCURRENCY_2026-10-11.md",
    "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "scripts/http-replacement-e2e.sh",
    "scripts/replacement-selection-concurrency-e2e.cjs"
  ],
  "postCI": {
    "run": 38186459872,
    "sha": "4cf88daa9e9d4d9be1aeb23e99edc6a631037ec1",
    "job": 114609716511,
    "attempt": 1,
    "counts": [
      4,
      729,
      382,
      3
    ],
    "success": true,
    "pending": false
  }
}
```

### PR #481

```json
{
  "pr": 481,
  "merge": "99f4509241755f7e51b8771e59470e43eef98a2d",
  "head": "52bed1cb0d0d115b537553dc7ae052c31eff41ee",
  "parents": [
    "4cf88daa9e9d4d9be1aeb23e99edc6a631037ec1",
    "52bed1cb0d0d115b537553dc7ae052c31eff41ee"
  ],
  "tree": "790e0cd530eb43943ec3f22a6da04c0d32b6a7f5",
  "ci": {
    "run": 38186207904,
    "sha": "52bed1cb0d0d115b537553dc7ae052c31eff41ee",
    "job": 114608953220,
    "attempt": 1,
    "counts": [
      4,
      729,
      383,
      3
    ],
    "success": true,
    "pending": false
  },
  "postci": {
    "run": 38186630833,
    "sha": "99f4509241755f7e51b8771e59470e43eef98a2d",
    "job": 114610239999,
    "attempt": 1,
    "counts": [
      4,
      729,
      383,
      3
    ],
    "success": true,
    "pending": false
  },
  "apk": "N/A: no changed mobile/shared dependencies/lock/native build or smoke/standalone workflow inputs in exact diff",
  "changedPaths": [
    "apps/api/src/replacement-input.controller.test.ts",
    "apps/api/src/replacement.controller.ts",
    "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "docs/evidencias/EVIDENCE_REGISTRY.md",
    "docs/evidencias/REPLACEMENT_CONFIRMED_ASSIGNMENT_ACK_2026-10-11.md",
    "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "scripts/replacement-selection-concurrency-e2e.cjs"
  ],
  "postCI": {
    "run": 38186630833,
    "sha": "99f4509241755f7e51b8771e59470e43eef98a2d",
    "job": 114610239999,
    "attempt": 1,
    "counts": [
      4,
      729,
      383,
      3
    ],
    "success": true,
    "pending": false
  }
}
```

### PR #482

```json
{
  "pr": 482,
  "merge": "510b2036b8229a21b1b7f5c836f39240fe6ba3ac",
  "head": "50c5ec4fe46fda204e359fe1d1dd58f7e1028fb0",
  "parents": [
    "99f4509241755f7e51b8771e59470e43eef98a2d",
    "50c5ec4fe46fda204e359fe1d1dd58f7e1028fb0"
  ],
  "tree": "98d3dce68c680ed5777350e6fc9f0a0b17fa85f9",
  "ci": {
    "run": 38189224586,
    "sha": "50c5ec4fe46fda204e359fe1d1dd58f7e1028fb0",
    "job": 114618165842,
    "attempt": 1,
    "counts": [
      4,
      729,
      383,
      3
    ],
    "success": true,
    "pending": false
  },
  "postci": {
    "run": 38190155860,
    "sha": "510b2036b8229a21b1b7f5c836f39240fe6ba3ac",
    "job": 114620980999,
    "attempt": 1,
    "counts": [
      4,
      729,
      383,
      3
    ],
    "success": true,
    "pending": false
  },
  "apk": "N/A: no changed mobile/shared dependencies/lock/native build or smoke/standalone workflow inputs in exact diff",
  "changedPaths": [
    ".github/workflows/project-activity-watch.yml",
    "docs/operacao/PAINEL_ATIVIDADE_GITHUB.md"
  ],
  "postCI": {
    "run": 38190155860,
    "sha": "510b2036b8229a21b1b7f5c836f39240fe6ba3ac",
    "job": 114620980999,
    "attempt": 1,
    "counts": [
      4,
      729,
      383,
      3
    ],
    "success": true,
    "pending": false
  }
}
```

### PR #483

```json
{
  "merge": "a05314e945f5e9edf3e82650d97e73e21275bd37",
  "parents": [
    "510b2036b8229a21b1b7f5c836f39240fe6ba3ac",
    "61e34c6a599c5ad11eeca7fa69db737fbab1c2cf"
  ],
  "tree": "80cbc8b016cd315285bea80909b56534de98a375",
  "head": "61e34c6a599c5ad11eeca7fa69db737fbab1c2cf",
  "ci": {
    "run": 38197145030,
    "job": 114642227976,
    "sha": "61e34c6a599c5ad11eeca7fa69db737fbab1c2cf",
    "counts": [
      4,
      731,
      383,
      3
    ],
    "success": true,
    "attempt": 1
  },
  "apk": {
    "run": 38197144807,
    "sha": "61e34c6a599c5ad11eeca7fa69db737fbab1c2cf",
    "job": 114642227163,
    "attempt": 1,
    "install": [
      "2026-10-12T02:59:15.1318407Z Success"
    ],
    "smoke": [
      "2026-10-12T02:59:27.7529817Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11724291281,
      "node_id": "MDg6QXJ0aWZhY3QxMTcyNDI5MTI4MQ==",
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28910995,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11724291281",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11724291281/zip",
      "expired": false,
      "digest": "sha256:9978ee19243d26f89b204ce84e5b676e9061d606954f1e5d2174620f7831ad52",
      "created_at": "2026-10-12T02:59:31Z",
      "updated_at": "2026-10-12T02:59:31Z",
      "expires_at": "2026-10-26T02:59:28Z",
      "workflow_run": {
        "id": 38197144807,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/mobile-replacement-ack-uuid",
        "head_sha": "61e34c6a599c5ad11eeca7fa69db737fbab1c2cf"
      }
    },
    "success": true,
    "pending": false
  },
  "pr": 483,
  "postCI": {
    "run": 38198075369,
    "sha": "a05314e945f5e9edf3e82650d97e73e21275bd37",
    "job": 114645120178,
    "attempt": 1,
    "counts": [
      4,
      731,
      383,
      3
    ],
    "success": true,
    "pending": false
  },
  "review": {
    "base": "510b2036b8229a21b1b7f5c836f39240fe6ba3ac",
    "head": "61e34c6a599c5ad11eeca7fa69db737fbab1c2cf",
    "tree": "80cbc8b016cd315285bea80909b56534de98a375",
    "paths": [
      "apps/mobile/lib/company-replacements.ts",
      "apps/mobile/tests/company-replacement-ack-uuid.test.mjs",
      "apps/mobile/tests/company-replacements.test.mjs",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/evidencias/MOBILE_REPLACEMENT_ACK_UUID_2026-10-12.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md"
    ],
    "bytesVerified": 9,
    "history": true
  },
  "postAPK": {
    "run": 38198075301,
    "sha": "a05314e945f5e9edf3e82650d97e73e21275bd37",
    "job": 114645119748,
    "attempt": 1,
    "install": [
      "2026-10-12T03:12:47.0050291Z Success"
    ],
    "smoke": [
      "2026-10-12T03:12:59.3698215Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11724667443,
      "size_in_bytes": 28911003,
      "digest": "sha256:4562c1e57d3a99669b5f78082bfbac4cdf546f7e3a683a0766b89c132e4cfae1",
      "expires_at": "2026-10-26T03:13:00Z",
      "expired": false,
      "workflow_run": {
        "head_sha": "a05314e945f5e9edf3e82650d97e73e21275bd37"
      }
    },
    "success": true,
    "pending": false
  },
  "checkout": {
    "sha": "90f0068fd7c52ea009c7f14330dd90853835e3b9",
    "parents": [
      "510b2036b8229a21b1b7f5c836f39240fe6ba3ac",
      "61e34c6a599c5ad11eeca7fa69db737fbab1c2cf"
    ],
    "tree": "80cbc8b016cd315285bea80909b56534de98a375"
  }
}
```

### PR #484

```json
{
  "merge": "fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30",
  "parents": [
    "a05314e945f5e9edf3e82650d97e73e21275bd37",
    "b78c749b24742126b73f2bc076db2694541e5da2"
  ],
  "tree": "2154a2198615f2ba37a6f19d56806a04865c5601",
  "head": "b78c749b24742126b73f2bc076db2694541e5da2",
  "ci": {
    "run": 38197598960,
    "sha": "b78c749b24742126b73f2bc076db2694541e5da2",
    "job": 114643661686,
    "attempt": 1,
    "counts": [
      4,
      731,
      383,
      3,
      8
    ],
    "success": true,
    "pending": false
  },
  "preview": {
    "run": 38197598983,
    "job": 114643661949,
    "sha": "b78c749b24742126b73f2bc076db2694541e5da2",
    "event": "pull_request",
    "success": true,
    "markers": [
      "2026-10-12T02:54:00.5808530Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"510b2036b8229a21b1b7f5c836f39240fe6ba3ac\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":114,\"openPrs\":2,\"activeRuns\":3,\"event\":\"pull_request\"}",
      "2026-10-12T02:54:00.5811209Z ACTIVITY_WATCH_PREVIEW no_issue_writes=true"
    ]
  },
  "apk": "N/A by exact native inputs",
  "protectedBlobs": 231,
  "pr": 484,
  "postCI": {
    "run": 38198337936,
    "sha": "fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30",
    "job": 114645925692,
    "attempt": 1,
    "counts": [
      4,
      731,
      383,
      3,
      8
    ],
    "success": true,
    "pending": false
  },
  "review": {
    "base": "a05314e945f5e9edf3e82650d97e73e21275bd37",
    "head": "b78c749b24742126b73f2bc076db2694541e5da2",
    "tree": "2154a2198615f2ba37a6f19d56806a04865c5601",
    "paths": [
      ".github/workflows/ci.yml",
      ".github/workflows/project-activity-watch.yml",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/evidencias/PROJECT_ACTIVITY_WATCH_SMOKE_2026-10-12.md",
      "docs/operacao/PAINEL_ATIVIDADE_GITHUB.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
      "scripts/tests/project-activity-watch.test.mjs"
    ],
    "protectedBlobs": 231,
    "bytesVerified": 10,
    "history": true,
    "apk": "N/A by exact native inputs"
  },
  "postMonitor": {
    "run": 38198337977,
    "job": 114645926135,
    "sha": "fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30",
    "event": "push",
    "markers": [
      "2026-10-12T03:04:56.2672067Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":1,\"activeRuns\":3,\"event\":\"push\"}"
    ],
    "success": true
  }
}
```

### PR #485

```json
{
  "merge": "73f523be05d8042cff871ed776a52fd61c95995b",
  "parents": [
    "fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30",
    "fc2e308edba58932110bae25a2ba8ccacdc19c4e"
  ],
  "tree": "7a03c695c2510a8049e84b1d50e540edbd99d305",
  "head": "fc2e308edba58932110bae25a2ba8ccacdc19c4e",
  "ci": {
    "run": 38198003282,
    "sha": "fc2e308edba58932110bae25a2ba8ccacdc19c4e",
    "job": 114645293186,
    "attempt": 2,
    "counts": [
      9,
      731,
      383,
      3,
      8
    ],
    "success": true,
    "pending": false
  },
  "apk": "N/A",
  "protectedBlobs": 231,
  "pr": 485,
  "postCI": {
    "run": 38198605205,
    "sha": "73f523be05d8042cff871ed776a52fd61c95995b",
    "job": 114646745687,
    "attempt": 1,
    "counts": [
      9,
      731,
      383,
      3,
      8
    ],
    "success": true,
    "pending": false
  },
  "review": {
    "base": "fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30",
    "head": "fc2e308edba58932110bae25a2ba8ccacdc19c4e",
    "tree": "7a03c695c2510a8049e84b1d50e540edbd99d305",
    "paths": [
      "apps/web/app/page.tsx",
      "apps/web/app/web-read-context.test.ts",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/evidencias/WEB_READ_CONTEXT_ISOLATION_2026-10-12.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md"
    ],
    "protectedBlobs": 231,
    "bytesVerified": 8,
    "history": true,
    "apk": "N/A by exact native inputs"
  }
}
```

### PR #486

```json
{
  "merge": "41d5165194a70a4a5bfdb0d3d4b90431fc533c9b",
  "parents": [
    "73f523be05d8042cff871ed776a52fd61c95995b",
    "1f36dd1081be42899beccecf0a15bc7b8e1ee3ef"
  ],
  "tree": "910e637b49b90834ad3306c41d053f4d5b6b943e",
  "head": "1f36dd1081be42899beccecf0a15bc7b8e1ee3ef",
  "ci": {
    "run": 38198471412,
    "sha": "1f36dd1081be42899beccecf0a15bc7b8e1ee3ef",
    "job": 114646330881,
    "attempt": 1,
    "counts": [
      13,
      731,
      383,
      3,
      8
    ],
    "success": true,
    "pending": false
  },
  "apk": "N/A",
  "unchangedNonDocs": 447,
  "pr": 486,
  "postCI": {
    "run": 38198920578,
    "sha": "41d5165194a70a4a5bfdb0d3d4b90431fc533c9b",
    "job": 114647714446,
    "attempt": 1,
    "counts": [
      13,
      731,
      383,
      3,
      8
    ],
    "success": true,
    "pending": false
  },
  "review": {
    "base": "73f523be05d8042cff871ed776a52fd61c95995b",
    "head": "1f36dd1081be42899beccecf0a15bc7b8e1ee3ef",
    "tree": "910e637b49b90834ad3306c41d053f4d5b6b943e",
    "paths": [
      "apps/web/app/page.tsx",
      "apps/web/app/web-form-target.test.ts",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/evidencias/WEB_FORM_TARGET_AFTER_AWAIT_2026-10-12.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md"
    ],
    "bytesVerified": 8,
    "unchangedNonDocs": 447,
    "history": true,
    "apk": "N/A all native inputs unchanged"
  }
}
```

## Provas e limites
Os PRs479–482 pertencem aos ciclos anteriores; foram revalidados para consolidar seus recibos, sem anunciar essas correções como novas entregas. 483 rejeita ACKs com ID não UUID ou assignment original. 484 pagina issues e acrescenta smoke, preview PR sem escritas e execução normal no push. 485 isola as quatro leituras Web em troca de empresa/seleção/logout. 486 captura o formulário antes de await para quatro handlers. Testes locais executam os helpers/handlers/scripts reais com fixtures explícitas, não render real ReactDOM/RN ou execução física. CI mantém os contratos HTTP/Postgres, migrações, RLS/privacy/readiness e todos os gates anteriores.
CI485 attempt1/job114644910774 falhou antes de Checkout: Docker pull public.ecr.aws/docker/library/postgres:17 retornou toomanyrequests: Data limit exceeded em três tentativas. Um rerun apenas de jobs falhos foi autorizado pela API; attempt2/job114645293186 PASS no mesmo head. Não foi falha de teste/app; nenhum assert ou gate foi removido. Não repetir rerun de run já aprovado.
APK483 próprios e pós-merge SUCCESS com instalação e DEVICE_SMOKE_OK metro_required=false, ZIP não expirado e head_sha exato (metadados integrais nos recibos JSON). ZIP digest não é hash do APK individual. Own checkout90f0068fd7c52ea009c7f14330dd90853835e3b9 é refs/pull/483/merge sintético: pais[510b2036b8229a21b1b7f5c836f39240fe6ba3ac,61e34c6a599c5ad11eeca7fa69db737fbab1c2cf], tree80cbc8b016cd315285bea80909b56534de98a375 igual à candidata e merge real. Não alegar BUILD_INFO head literal. Emulador não é físico.
484 APK N/A:231 blobs mobile/shared packages/root lock/native build/smoke/pilot workflows iguais à483; CI.yml só adiciona execução de teste Node e Project Activity Watch não compila native. 485 também231 inputs native iguais;486 todos447 blobs não-docs da base são iguais, exceto a página Web (e novo teste). Nenhum APK de outro head usado para autorizar alteração de código mobile. Diffs antigos479–482 não alteram mobile/shared dependencies/root locks/build/smoke/standalone workflow, conforme paths registrados.
Monitor preview REAL38197598983/job114643661949 no headb78c749b24742126b73f2bc076db2694541e5da2:02:54:00.5808530Z observou main510...,114min,2PRs,3Actions,event=pull_request e no_issue_writes=true. Monitor pós-merge REAL38198337977/job114645926135 no SHAfea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30:03:04:56.2672067Z observou essa main,age0,1PR,3Actions,event=push. Etapas/logs aprovados; core.summary.write executada, sem alegação de leitura da UI HTML. GITHUB_TOKEN grant Actionsread/Contentsread/Issueswrite/PullRequestsread consta dos logs. Grant de Issueswrite não comprova operação de escrita; não criar alerta artificial.
Cron e dispatch retornaram0 na consulta mais recente. Execução agendada ainda NÃO COMPROVADA; isso não prova falha do cron. Endpoint actions/workflows bloqueado pelo allowlist do conector; disponível GET actions/runs e rerun de job existente, nenhuma ferramenta dispatch. gh CLI ausente; ActionsHTML/consulta pública secundária falhou DisabledError. A solução autorizada acrescentou eventos preview read-only PR e push ao MESMO workflow, sem nova automação/serviço/despesa. Estes eventos provaram execução efetiva das APIs e summary, nunca agente programando ou cron preciso/24h.

## Correção adicional do monitor: distinguir issue de PR
A resposta real IssuesAPI desta rodada inclui485/486 com campo pull_request. O monitor procurava só título: um PR homônimo podia esconder o alerta ou receber comentário/fechamento. Duas regressões do script real com fixtures explícitas: RED8PASS2FAIL10 (stale não cria issue, recent produz duas escritas no PR) → GREEN10/10 com filtro !i.pull_request antes do título. Todos oito testes anteriores preservados. Não alegar que um PR real foi fechado; não criar issue/PR homônimo artificial.
Esta correção e a consolidação de recibos integram o mesmo PR, com código/teste/evidência e cinco documentos originais completos. CI esperado13web/731mobile/383API/3CLI +10monitor=1140 e preview real no novo head obrigatórios antes de merge; pósCI/push monitor no SHA real obrigatórios. APK N/A só após comparar native inputs/modes iguais. O último recibo do próprio PR ficará no PR body e checkpoint de retomada, sem loop autorreferente de commits.

## Continuidade por áreas
Estes contratos e correções não comprovam aceite integral das13áreas. Telas/navegação mantêm CompanyNav e início profissional com APIs/estados, mas Visual Truth completo continua aberto. Auth/agenda/jobs/company/teams/candidates/matching/payments/notifications/privacy/RLS têm contratos HTTP/Node/Postgres, não E2E físico ou prova completa de todos os estados. Web ganhou proteção de leituras e formulários; não recebeu deploy pago.
Próximas ações concretas: reproduzir ACK indevido em WebcreateJob (mutate genérico aceita qualquer JSON2xx), confrontar o contrato real CompanyJobs antes de corrigir; auditar contexto de writes após await e deadlines/recuperação das leituras Web. Backend criação de substituição versus cancelamento/lifecycle precisa prova concorrente antes de patch. Não refazer485/486, não inventar validação global/contrato/dados ou usar0PRs/issues como conclusão. Referência original→rotas/API/dados/estados/testes é a base dos aceites.
React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone semMetro/desenho canônico preservados. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e WebRailway pago#224 continuam OPEN separados; preferências/helpsemvínculo/ML/integrations dependem contrato/dados. Sem serviços/custos/produção/PSP/dinheiro real/segredos/deploy pago. Manter a rotina ativa; parcial/transitório/fim de rodada não encerra projeto. Não exigirCONTINUAR nem alegar24h.
