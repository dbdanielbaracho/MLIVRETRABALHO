# Evidência — v1.101

## Prazo real nas leituras de Talentos e Segurança

Os handlers existentes só abortavam o transporte após 15s; auth/fetch/JSON/auth final sem resolução mantinham loading. Novas 16 regressões dos handlers reais pré-JSX reproduziram 10 falhas/6pass no código anterior. Agora o timer publica erro e invalida o snapshot somente para request/foco atual. Talentos marca a lista indisponível; Segurança marca trabalhos/relatos/recursos indisponíveis. Auth que chega após deadline/blur/reload não inicia transporte; resposta final ainda exige sessão/tenant atual e sinal não abortado.

Callbacks de deadline são exclusivos das leituras. Os corpos de remove e submit, contratos DELETE/POST, canRequestReview, tratamento de ACK criado/existing/rejected/unknown, bloqueios de mutation e limpeza de foco existentes permanecem byteidênticos. A operação sem callback continua apenas abortando após15s; nenhum reenviar/descartar resultado incerto foi introduzido. Nenhuma remoção, relato ou recurso real foi enviado.

PASS34/34 local:16novos handlers +7company-talents +11professional-safety. Fixtures explícitas de hooks/auth/transport/timer; incluem todas as fases pendentes, resposta/deadline antigos após blur, retry GET com fatos reais, troca de owner/company e refresh manual bloqueado durante mutation. Não renderizam React Native nem exercitam APIs externas. JSX completo e StyleSheets de ambas as telas foram comparados byte a byte e preservados, incluindo navegação/textos existentes.

CI próprio esperado424mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP e APK standalone próprios no SHA exato obrigatórios; ainda pendentes antes da publicação. React19.1.4/RN0.81.6, lockfile, tenant/RLS, scopes das queries, helpers e escrita existentes preservados. Não alegar aceite visual/físico integral ou que mutations pendentes têm um novo timeout resolvido.

## Integração e pós-gates

Verificado em 2026-10-10 23:17:54 UTC: main4b797cb19dc9a7f498a86bd5ba98f003d3239991, tree8be87c3522a1f0b1b65d0e5bf30a0026f77693bf, Documento vigentev1.100. #401–411 já integradas; não repetir. Pais/árvore/main/PR de cada merge confirmados; pré-gates e digests401–410 em [PROFESSIONAL_WEEK_CHRONOLOGY_v1.100.md](../evidencias/PROFESSIONAL_WEEK_CHRONOLOGY_v1.100.md). As reconsultas pós401–410 confirmam todos os CI, com passos completos/logs/typecheck/build/export/migrations/HTTP e contagens próprias. APKs pós no SHA real ainda em execução; não declarar conclusão nativa pós-merge.

| PR | SHA de merge real | CI pós-merge comprovado | APK pós-merge |
|---|---|---|---|
| #401 | 0ee519ee064087802ad67cef4c96be4d97165e14 | 38094002384 / job114336027866 / 4/352/105/3 | 38094002404 em execução |
| #402 | 4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39 | 38094031044 / job114336112406 / 4/352/110/3 | N/A: paths/mobile equivalentes |
| #403 | 694991dc62ed3292be501d90661ab16aecd2b3a8 | 38094055691 / job114336187752 / 4/369/110/3 | 38094055730 em execução |
| #404 | 94053d598ad5f2a3c4402181577a5dd6eafeb509 | 38094078457 / job114336251332 / 4/377/110/3 | 38094078455 em execução |
| #405 | f82251ad97e11bf2de2745fba7acee7d3aa5e6ac | 38094096342 / job114336299768 / 4/377/119/3 | N/A: paths/mobile equivalentes |
| #406 | 3edd8067280fe001f25cabae5c704de91abffc9b | 38094118894 / job114336366057 / 4/377/131/3 | N/A: paths/mobile equivalentes |
| #407 | 60a49f2322dad50d0c0d83de5117cfc7d74adbd5 | 38094135415 / job114336415459 / 4/377/140/3 | N/A: paths/mobile equivalentes |
| #408 | 2ffaa52836a5c2a181353bddaee7f4547464de0a | 38094159144 / job114336485319 / 4/383/140/3 | 38094159162 em execução |
| #409 | d5a1a799189fd4ca26b4ad785db4c12a1ab18b14 | 38094180653 / job114336548733 / 4/396/140/3 | 38094180701 em execução |
| #410 | 104fdd9aef14eec9530d5df609da3d4f498c03d7 | 38094197753 / job114336599695 / 4/408/140/3 | 38094197754 em execução |
| #411 | 4b797cb19dc9a7f498a86bd5ba98f003d3239991 | 38094465582 in_progress; aguardando resultado | N/A: paths/mobile equivalentes |

#411 próprioCI38094283960/job114336856143 aprovado408mobile/145API/4web/3CLI; marker HTTP23:16:12.9083058Z comprova datas PostgreSQL terça/quinta em ordem entre duas empresas. Head6cb1f15092914d8fe83cf332771ccc78dce1f6f6/tree8be87c3522a1f0b1b65d0e5bf30a0026f77693bf;12arquivos remotos byteidênticos/diff revisto. Merge4b797cb19dc9a7f498a86bd5ba98f003d3239991 pais[104fdd9aef14eec9530d5df609da3d4f498c03d7,6cb1f15092914d8fe83cf332771ccc78dce1f6f6], árvore idêntica e main/PRmerged confirmados. OwnAPK N/A: só API/script/docs, apps/mobile15f3227015d480516a847308f59eb95e8b408796 igual410; não dispensa pósAPKs predecessores. Pós411CI38094465582 in_progress no SHA real; acompanhar sem repetir merge. Digests ZIP≠APK individual; emulador≠aceite físico.

401 retry próprio recuperado e400/ancestrais pós-gates comprovados nos registros anteriores; nenhum novo retry solicitado.

## Prova estruturada411 e pós-CI401–410

```json
{
  "integration411": {
    "sha": "4b797cb19dc9a7f498a86bd5ba98f003d3239991",
    "tree": "8be87c3522a1f0b1b65d0e5bf30a0026f77693bf",
    "parents": [
      "104fdd9aef14eec9530d5df609da3d4f498c03d7",
      "6cb1f15092914d8fe83cf332771ccc78dce1f6f6"
    ],
    "proof": {
      "pr": 411,
      "ownHead": "6cb1f15092914d8fe83cf332771ccc78dce1f6f6",
      "ownTree": "8be87c3522a1f0b1b65d0e5bf30a0026f77693bf",
      "parentMain": "104fdd9aef14eec9530d5df609da3d4f498c03d7",
      "mergeBase": "104fdd9aef14eec9530d5df609da3d4f498c03d7",
      "mergeBaseTree": "5eb3869df0179f5b724e9f08253143f29ef4ecf5",
      "ci": {
        "run": 38094283960,
        "job": 114336856143,
        "counts": [
          4,
          408,
          145,
          3
        ],
        "http": [
          "2026-10-10T23:16:09.4986468Z PASS: malformed capability bodies are HTTP400 after authentication, without overwriting canonical registration",
          "2026-10-10T23:16:09.5875293Z PASS: governed taxonomy IDs support real capability CRUD with identity isolation and canonical validation",
          "2026-10-10T23:16:10.3298729Z PASS: named support contexts list only authenticated memberships, without inventing a tenant for a new professional",
          "2026-10-10T23:16:11.0246829Z PASS: support key preparation checks auth/membership/assignment, issues cryptographic UUIDs and creates no case",
          "2026-10-10T23:16:12.2407299Z PASS: support intent sequential/concurrent retry, payload conflict, reporter/tenant isolation and immutable database guards",
          "2026-10-10T23:16:12.4882666Z PASS: malformed direct-hire proposal/response, noncompleted and cross-tenant references cannot create a conversion",
          "2026-10-10T23:16:12.6254015Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state",
          "2026-10-10T23:16:12.9083058Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies",
          "2026-10-10T23:16:12.9381283Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved"
        ]
      },
      "native": {
        "na": true,
        "mobile": "15f3227015d480516a847308f59eb95e8b408796",
        "reason": "API/script/docs only; identical apps/mobile tree to integrated predecessor"
      }
    },
    "runs": []
  },
  "postProofs": [
    {
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
    },
    {
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
    },
    {
      "pr": 403,
      "sha": "694991dc62ed3292be501d90661ab16aecd2b3a8",
      "ci": {
        "success": true,
        "run": 38094055691,
        "job": 114336187752,
        "counts": [
          4,
          369,
          110,
          3
        ],
        "http": []
      },
      "native": {
        "run": 38094055730,
        "status": "in_progress",
        "conclusion": null,
        "pending": true
      }
    },
    {
      "pr": 404,
      "sha": "94053d598ad5f2a3c4402181577a5dd6eafeb509",
      "ci": {
        "success": true,
        "run": 38094078457,
        "job": 114336251332,
        "counts": [
          4,
          377,
          110,
          3
        ],
        "http": []
      },
      "native": {
        "run": 38094078455,
        "status": "in_progress",
        "conclusion": null,
        "pending": true
      }
    },
    {
      "pr": 405,
      "sha": "f82251ad97e11bf2de2745fba7acee7d3aa5e6ac",
      "ci": {
        "success": true,
        "run": 38094096342,
        "job": 114336299768,
        "counts": [
          4,
          377,
          119,
          3
        ],
        "http": []
      },
      "native": {
        "na": true,
        "mobile": "39e121e416614fa92ce16775d19e65648492d9f3"
      }
    },
    {
      "pr": 406,
      "sha": "3edd8067280fe001f25cabae5c704de91abffc9b",
      "ci": {
        "success": true,
        "run": 38094118894,
        "job": 114336366057,
        "counts": [
          4,
          377,
          131,
          3
        ],
        "http": []
      },
      "native": {
        "na": true,
        "mobile": "39e121e416614fa92ce16775d19e65648492d9f3"
      }
    },
    {
      "pr": 407,
      "sha": "60a49f2322dad50d0c0d83de5117cfc7d74adbd5",
      "ci": {
        "success": true,
        "run": 38094135415,
        "job": 114336415459,
        "counts": [
          4,
          377,
          140,
          3
        ],
        "http": [
          "2026-10-10T23:13:09.5330459Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state"
        ]
      },
      "native": {
        "na": true,
        "mobile": "39e121e416614fa92ce16775d19e65648492d9f3"
      }
    },
    {
      "pr": 408,
      "sha": "2ffaa52836a5c2a181353bddaee7f4547464de0a",
      "ci": {
        "success": true,
        "run": 38094159144,
        "job": 114336485319,
        "counts": [
          4,
          383,
          140,
          3
        ],
        "http": [
          "2026-10-10T23:13:37.6355515Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state"
        ]
      },
      "native": {
        "run": 38094159162,
        "status": "in_progress",
        "conclusion": null,
        "pending": true
      }
    },
    {
      "pr": 409,
      "sha": "d5a1a799189fd4ca26b4ad785db4c12a1ab18b14",
      "ci": {
        "success": true,
        "run": 38094180653,
        "job": 114336548733,
        "counts": [
          4,
          396,
          140,
          3
        ],
        "http": [
          "2026-10-10T23:13:49.0962985Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state"
        ]
      },
      "native": {
        "run": 38094180701,
        "status": "in_progress",
        "conclusion": null,
        "pending": true
      }
    },
    {
      "pr": 410,
      "sha": "104fdd9aef14eec9530d5df609da3d4f498c03d7",
      "ci": {
        "success": true,
        "run": 38094197753,
        "job": 114336599695,
        "counts": [
          4,
          408,
          140,
          3
        ],
        "http": [
          "2026-10-10T23:14:32.0013881Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state"
        ]
      },
      "native": {
        "run": 38094197754,
        "status": "in_progress",
        "conclusion": null,
        "pending": true
      }
    },
    {
      "pr": 411,
      "sha": "4b797cb19dc9a7f498a86bd5ba98f003d3239991",
      "ci": {
        "pending": true,
        "reason": "workflow not yet listed"
      },
      "native": {
        "na": true,
        "mobile": "15f3227015d480516a847308f59eb95e8b408796"
      }
    }
  ]
}
```

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.
