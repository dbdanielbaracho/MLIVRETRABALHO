# Evidência — v1.104

## Prazo da leitura de trabalhos e da sessão para abrir ajuda

Agenda load e openSupport usavam timer que apenas abortava o controller. Credencial, transporte, JSON ou autenticação final que não resolvessem deixavam a lista carregando; a verificação da sessão para ajuda também não apresentava falha até a credencial resolver. Nove regressões dos handlers reais pré-JSX reproduziram seis falhas e três sucessos no código anterior.

operation aceita callback opcional de prazo, mantendo o default usado nas escritas. load invalida displayedAuthorization e mostra error imediatamente após 15s somente no requestId/epoch atual. openSupport faz o mesmo para ajuda/contexto e mostra a mensagem de verificação expirada, somente no helpRequest/epoch atual. Respostas ou timers de foco, tentativa, owner e seleção anteriores não substituem o estado atual; nenhuma credencial tardia autoriza painel expirado. Retentativa de leitura permanece explícita. Nenhum dado de trabalho é inventado.

PASS local24/24 em 2026-10-10: nove testes novos, sete agenda-support-screen e oito contratos/parser de Agenda. Fixtures explícitas de hooks/auth/fetch/timers usam handlers reais e loadAgenda real; não provam render React Native, SecureStore nativo ou rede externa. Cobrem auth/fetch/JSON/auth final pendentes, prazo imediato e rejeição de dados tardios, blur/novo foco, retry, troca de owner, prazo de sessão para ajuda e seleção mais recente em tenant distinto com mesmo assignment ID. Não enviam suporte nem lifecycle POST.

Corpo de action (check-in/check-out/avaliação), optionalCoordinates, imports, JSX/StyleSheets e navegação comparados e preservados; operação de escrita continua com default anterior. SupportRequest e protocolo durável não alterados. CI próprio esperado467mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP e APK standalone no SHA exato são obrigatórios e ainda pendentes antes da publicação. React19.1.4/RN0.81.6, lockfile, tenant/RLS e desenho canônico preservados. Visual Truth físico permanece aberto.

## Estado verificado

Verificação em2026-10-10 23:42 UTC: main4b797cb19dc9a7f498a86bd5ba98f003d3239991/tree8be87c3522a1f0b1b65d0e5bf30a0026f77693bf, READMEv1.100. #401–411 integradas; CI pós-merge de todas e APKs pós-merge aplicáveis agora comprovados nos SHAs reais, com passos/logs/contagens, instalação Success, DEVICE_SMOKE_OK sem Metro e ZIP não expirado vinculado ao SHA exato. N/A de402/405/406/407/411 permanece condicionado a paths e árvore mobile idênticos. Provas dos pais/árvores/pré-gates em v1.100/101; não repetir merges históricos351–411.

| PR | Merge real | CI pós-merge (web/mobile/API/CLI) | Native pós-merge |
|---|---|---|---|
| #401 | 0ee519ee064087802ad67cef4c96be4d97165e14 | 38094002384/job114336027866: 4/352/105/3 | 38094002404/job114336028036 aprovado; ZIP11685268251 |
| #402 | 4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39 | 38094031044/job114336112406: 4/352/110/3 | N/A; mobile e528995c9c2f9d17d0f94ae89faaeb214742f267 |
| #403 | 694991dc62ed3292be501d90661ab16aecd2b3a8 | 38094055691/job114336187752: 4/369/110/3 | 38094055730/job114336187885 aprovado; ZIP11685253801 |
| #404 | 94053d598ad5f2a3c4402181577a5dd6eafeb509 | 38094078457/job114336251332: 4/377/110/3 | 38094078455/job114336251341 aprovado; ZIP11685667513 |
| #405 | f82251ad97e11bf2de2745fba7acee7d3aa5e6ac | 38094096342/job114336299768: 4/377/119/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #406 | 3edd8067280fe001f25cabae5c704de91abffc9b | 38094118894/job114336366057: 4/377/131/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #407 | 60a49f2322dad50d0c0d83de5117cfc7d74adbd5 | 38094135415/job114336415459: 4/377/140/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #408 | 2ffaa52836a5c2a181353bddaee7f4547464de0a | 38094159144/job114336485319: 4/383/140/3 | 38094159162/job114336485119 aprovado; ZIP11685692686 |
| #409 | d5a1a799189fd4ca26b4ad785db4c12a1ab18b14 | 38094180653/job114336548733: 4/396/140/3 | 38094180701/job114336549165 aprovado; ZIP11685094005 |
| #410 | 104fdd9aef14eec9530d5df609da3d4f498c03d7 | 38094197753/job114336599695: 4/408/140/3 | 38094197754/job114336599660 aprovado; ZIP11685418696 |
| #411 | 4b797cb19dc9a7f498a86bd5ba98f003d3239991 | 38094465582/job114337396456: 4/408/145/3 | N/A; mobile 15f3227015d480516a847308f59eb95e8b408796 |

#412–414 continuam abertas, com CI próprios comprovados e APKs próprios em execução na consulta23:40UTC; nenhum merge antecipado:
- #412: head2318c8606a7770ebbf0cbd3e559aa8cbbdd13686/tree8e61d924a88647eb1e24494a84ac26042fc1fbc9; CI38094564390/job114337698890 aprovado4/424/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38094564411 pendente. Base main.
- #413: head890ce8507b7e8d2e4a2a72b1d87f8c695708a134/tree21f33ff05de5d657690f252ca241330b0a89d8b9; CI38094974272/job114338910703 aprovado4/452/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38094974311 pendente. Base fix/talents-safety-read-deadline.
- #414: head92bfffc9bac8972959f726fbbb5dc8d4dcf1bbb8/treeb584e15cfda45fe1f1fc2a624024924c6ef24628; CI38095282240/job114339798025 aprovado4/458/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38095282246 pendente. Base fix/primary-read-deadline.

Deltas v1.101–103 pertencem às branches ainda abertas; v1.104 é a correção desta branch, não conclusão integral na main. ZIPdigest não é digest do APK individual; smoke do emulador não aceita Visual Truth físico.

## Pós-gates comprovados no SHA real

```json
[
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
      "success": true,
      "run": 38094002404,
      "attempt": 1,
      "job": 114336028036,
      "artifact": 11685268251,
      "digest": "sha256:4417b8f96b591a3ac6ead87411f99f65185ae148609f4422facf0595a0fd6f22",
      "markers": [
        "2026-10-10T23:31:34.2126345Z Success",
        "2026-10-10T23:32:39.4871524Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ]
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
      "success": true,
      "run": 38094055730,
      "attempt": 1,
      "job": 114336187885,
      "artifact": 11685253801,
      "digest": "sha256:8b021ee8a4a8a046680c7e2180a5b22609133cc3e5262ce91d3821ef25d70bcf",
      "markers": [
        "2026-10-10T23:37:18.3455332Z Success",
        "2026-10-10T23:38:06.0054447Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ]
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
      "success": true,
      "run": 38094078455,
      "attempt": 1,
      "job": 114336251341,
      "artifact": 11685667513,
      "digest": "sha256:d491a845e26c8f66483f1feceb48a1378394d2f6dfcaecde375e4ecccc022958",
      "markers": [
        "2026-10-10T23:28:37.6213860Z Success",
        "2026-10-10T23:29:18.7130880Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ]
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
      "success": true,
      "run": 38094159162,
      "attempt": 1,
      "job": 114336485119,
      "artifact": 11685692686,
      "digest": "sha256:879348fff4219a7d5dd48a20970de57536f6d2657fedf547423ec05c68bec468",
      "markers": [
        "2026-10-10T23:30:42.4819231Z Success",
        "2026-10-10T23:31:24.1878054Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ]
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
      "success": true,
      "run": 38094180701,
      "attempt": 1,
      "job": 114336549165,
      "artifact": 11685094005,
      "digest": "sha256:c1f08dac9cfd6322e5296bb7b2f0456459fc23a42caf1fcefd3ade8d7c9b4acc",
      "markers": [
        "2026-10-10T23:36:22.3585496Z Success",
        "2026-10-10T23:37:13.9667637Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ]
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
      "success": true,
      "run": 38094197754,
      "attempt": 1,
      "job": 114336599660,
      "artifact": 11685418696,
      "digest": "sha256:07d721887d8242c91953ad42dc9f8496745f49008e5b88368ecadf9043715adc",
      "markers": [
        "2026-10-10T23:36:05.5316425Z Success",
        "2026-10-10T23:36:58.8865144Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ]
    }
  },
  {
    "pr": 411,
    "sha": "4b797cb19dc9a7f498a86bd5ba98f003d3239991",
    "ci": {
      "success": true,
      "run": 38094465582,
      "job": 114337396456,
      "counts": [
        4,
        408,
        145,
        3
      ],
      "http": [
        "2026-10-10T23:19:03.8533770Z PASS: team-plan malformed inputs/auth/role/cross-tenant rejected; valid real-job plan preserves unfilled and work state",
        "2026-10-10T23:19:04.1028281Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
      ]
    },
    "native": {
      "na": true,
      "mobile": "15f3227015d480516a847308f59eb95e8b408796"
    }
  }
]
```

## CI próprios das PRs abertas

```json
[
  {
    "run": 38094564390,
    "job": 114337698890,
    "counts": [
      4,
      424,
      145,
      3
    ],
    "head": "2318c8606a7770ebbf0cbd3e559aa8cbbdd13686",
    "http": [
      "2026-10-10T23:20:49.8820572Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  {
    "run": 38094974272,
    "job": 114338910703,
    "head": "890ce8507b7e8d2e4a2a72b1d87f8c695708a134",
    "counts": [
      4,
      452,
      145,
      3
    ],
    "http": [
      "2026-10-10T23:27:13.1988519Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  {
    "run": 38095282240,
    "job": 114339798025,
    "head": "92bfffc9bac8972959f726fbbb5dc8d4dcf1bbb8",
    "counts": [
      4,
      458,
      145,
      3
    ],
    "http": [
      "2026-10-10T23:33:00.2923615Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  }
]
```

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.

Publicar fix/agenda-read-deadline sobre head41492bfffc9bac8972959f726fbbb5dc8d4dcf1bbb8/treeb584e15cfda45fe1f1fc2a624024924c6ef24628, basefix/company-publication-context-deadline. Conferir bytes remotos e diff, CI467mobile/145API e APK próprio antes de merge. Integrar412,413,414 e esta fatia em ordem, só com gates aplicáveis no SHA exato, retargetmain/reconsulta eventual, merge-base tree equivalente, pais/tree/main e pós-gates reais. Registrar número/SHA/runs reais após publicação, sem antecipar resultados. Não repetir401–411 nem rerun de job em execução.
Próxima correção independente a reproduzir: Equipes loadBase/selectTeam/selectAllocation usam timer abort-only; verificar auth/HTTP/JSON/auth final/foco/seleção/company e preservar mutations/resultado incerto. Rotas secundárias precisam auditoria factual própria. Preferências, autoridade para nova ajuda semmembership, ML/dados e integraçãoenterprise precisam contratos/provas externas; físico/pentest/providers/Web seguem separados. Encerrar rodada não encerra projeto; manter continuidade até conclusão integral comprovada ou ordem expressa.
