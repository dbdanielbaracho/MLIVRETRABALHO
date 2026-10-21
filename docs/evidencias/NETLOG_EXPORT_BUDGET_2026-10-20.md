# Orçamento de exportação do diagnóstico indispensável de autenticação

## Recibo de 15c0266 e correção do orçamento de exportação — 2026-10-20 19:02 UTC

PR571 continua DRAFT/NOT MERGED. HEAD anterior `15c026658bc3bc0b3ce8f9b5a98b89db0e429e40`, árvore `1ca59e38463e9801ad127ac369107aa6daf766fe`, pai f0ad. CI39478739740/job118821442691/a1COMPLETEDFAILURE, ZEROretry. Metadados reais dos steps: typecheck/build/exportAndroid/RunTests/migrationrunner/privacy SUCCESS; HTTPjourney/readiness/ProductionTruth step FAILURE; PostSetupNode SKIPPED. NÃO atribuir ainda esta falha a browser/NetLog/auth/ProductionTruth específico: leitura do log completo retornou Transport closed repetidamente. Nenhum checkout real/contagem de testes/marker de jornada/Chrome/netlog desse run foi atribuído sem log. 1800=[216Web1069mobile501API3CLI11monitor] é só esperado, NÃO contagem observada neste recibo.

Diagnóstico mínimo do acesso: o mesmo conector leu o log anterior f0ad de5630016chars; o log novo falhou. Endpoint genérico de logs não suportado foi respeitado, sem credencial/URLassinada/bypass. Volume maior é HIPÓTESE, não causa comprovada do erro do conector.

Defeito concreto da exportação reproduzido em V8 com coletor real+FakeURL e8192eventos NetLog EXPLÍCITOS: snapshot anterior2759887chars ASCII, sem descarte; orçamento de64KiB excedido. Candidato reduz default/máximo de8192/65536para128/128: snapshot43429chars ASCII,128retidos/8064descartados/8192recebidos. NÃO é Chrome/Node/CI local PASS. Um teste canônico adicional em Node exige orçamento e contadores; quatro corpos anteriores intactos. A retenção limitada pode perder inícios/vínculos, e droppedEvents informa isso; nunca inferir ausência/causa a partir de eventos descartados. Categoria/buffer do Chromium/TraceConfig/15s/comandosstart-end/Fetchguard/continuações/shell12+canônico/flags/segurança inalterados. Mudança funcional de volume necessária para tornar o diagnóstico consumível, não commit artificial de status nem retry de SHA idêntico.

### Correção explícita da análise preliminar (18:55 UTC)
O capítulo de preparação e a nota Git registraram de modo amplo demais “antes de pausas dos GETs alvos observadas”. A correlação completa dos24alvos mostra:23sem targetGET Fetch.pause observado; UM alvo nativo `15711.106` teve Fetch.pause. Portanto NÃO são24ausências de pausa. Todos24têm preflight associado+ACK observado; só4extra204no recorte(2por caso), não24status204. Durações exatas: host31–44ms; CDPmonotônico28.832–39.789ms. Exemplos selecionados da nota permanecem corretos, mas não autorizam generalização para todos. Esta errata supersede somente a frase ampla; história Git preservada e consolidação no próximo delta legítimo, sem SHA de status/retentativa para verde.


Originais6 inteiros preservados por novo apêndice. Nova evidência `docs/evidencias/NETLOG_EXPORT_BUDGET_2026-10-20.md` contém recibo/manifesto e metadata anterior integral. Main0fc revalidada antes da entrega. APK N/A integral;172inputs protegidos incluindo164mobile/build/deps/lock/workflows byte/mode idênticosMAIN. ArtefatoMAIN94a12266784370 revalidado pelaAPI não expirado/digest/tamanho iguais, sem novo download nesta rodada e sem alegarAPKliteral0fc/novoHEAD.

NovoSHA/fullCI PENDENTE nesta preparação, não ready/merge/POST/aceite. Estado medido por aceites:0novasáreas;12pendentes,10somente técnico standalone aceita. O bloqueio de transporte ainda não foi resolvido nem atribuído causalmente; nenhuma aprovação externa inventada.

## Delta exato

Helper anterior e2e1e47adb0a9bf16d2d020efc7d20f45e94990c: somente default maxEvents8192→128 e limite65536→128. Remover essas duas alterações reconstrói helper integral anterior. Nenhum outro caminho de browser alterado neste delta; probe4818722d4292acc9ddfcca2e821e309decf446f7 e shell/canônico MAIN preservados.

Teste anterior da2ab594f76a7b2d0fc90ede6620ac322647ff97 é prefixo byte-exato do novo teste. Acrescenta somente verificação de volume real do coletor sobre8192fixtures; não substitui fluxo funcional HTTP/PG/browser.

## Recibo de correlação integral (metadados selecionados de f0ad, não novo CI)
```json
[
  {
    "diagnostic": "baseline",
    "rows": [
      {
        "id": "15131.74",
        "hostElapsed": 41,
        "monoElapsedMs": 38.328000000035445,
        "targetFetchPause": 0,
        "preflightId": "1206E97804D1DBC92BF10FC7B28E097C",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.71",
        "hostElapsed": 41,
        "monoElapsedMs": 39.41200000002709,
        "targetFetchPause": 0,
        "preflightId": "CDC2B70195B7A70BD5C85B9784A1B04E",
        "preflightAck": true,
        "extra204": true
      },
      {
        "id": "15131.78",
        "hostElapsed": 41,
        "monoElapsedMs": 37.81600000002072,
        "targetFetchPause": 0,
        "preflightId": "7A35B2B1B04EDE0C639DC5D41306C49B",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.77",
        "hostElapsed": 41,
        "monoElapsedMs": 38.061000000027434,
        "targetFetchPause": 0,
        "preflightId": "1B1FCAD89324D7B907E2A4C894E652FE",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.72",
        "hostElapsed": 42,
        "monoElapsedMs": 39.14300000002413,
        "targetFetchPause": 0,
        "preflightId": "84797CBB2DBD74AEBF5B1AA58114BCE9",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.75",
        "hostElapsed": 41,
        "monoElapsedMs": 38.47200000001294,
        "targetFetchPause": 0,
        "preflightId": "D2AD52C169C88CB4A6650DCFF544D5AF",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.80",
        "hostElapsed": 40,
        "monoElapsedMs": 37.390000000016244,
        "targetFetchPause": 0,
        "preflightId": "56D310430984F4737B0F698F214AFCF9",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.70",
        "hostElapsed": 44,
        "monoElapsedMs": 39.78899999998475,
        "targetFetchPause": 0,
        "preflightId": "48EDC9F14E4CE99C303768B776057A75",
        "preflightAck": true,
        "extra204": true
      },
      {
        "id": "15131.81",
        "hostElapsed": 40,
        "monoElapsedMs": 37.193999999999505,
        "targetFetchPause": 0,
        "preflightId": "744C80E5E865B074C1A439556980953C",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.79",
        "hostElapsed": 41,
        "monoElapsedMs": 37.705999999957385,
        "targetFetchPause": 0,
        "preflightId": "24B0F566980D07AEEBE2F247492C34F7",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.73",
        "hostElapsed": 43,
        "monoElapsedMs": 39.055000000018936,
        "targetFetchPause": 0,
        "preflightId": "9A2CC083DC2EE83EFB47DDD45EAD7C83",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15131.76",
        "hostElapsed": 42,
        "monoElapsedMs": 38.45300000000407,
        "targetFetchPause": 0,
        "preflightId": "905D5C6419F25642CEB370F3837DBDE4",
        "preflightAck": true,
        "extra204": false
      }
    ]
  },
  {
    "diagnostic": "native-only",
    "rows": [
      {
        "id": "15711.112",
        "hostElapsed": 31,
        "monoElapsedMs": 29.536000000007334,
        "targetFetchPause": 0,
        "preflightId": "7049286DB1BD344D5237489CBC8A6F08",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.109",
        "hostElapsed": 33,
        "monoElapsedMs": 30.543000000022857,
        "targetFetchPause": 0,
        "preflightId": "BB90ADAA07CBDE1B5462AD9FD24BC58E",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.116",
        "hostElapsed": 32,
        "monoElapsedMs": 28.831999999965774,
        "targetFetchPause": 0,
        "preflightId": "5C723F7A2AAD779903718D3411A4A87B",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.113",
        "hostElapsed": 32,
        "monoElapsedMs": 29.65399999999363,
        "targetFetchPause": 0,
        "preflightId": "5749DCB86595C019D6720774DCB9A17F",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.106",
        "hostElapsed": 34,
        "monoElapsedMs": 31.43000000000029,
        "targetFetchPause": 1,
        "preflightId": "E2045E5765AE8AB0C06F742124733198",
        "preflightAck": true,
        "extra204": true
      },
      {
        "id": "15711.115",
        "hostElapsed": 32,
        "monoElapsedMs": 29.214000000024498,
        "targetFetchPause": 0,
        "preflightId": "E0D858B0F317FCEBBC56DB0892DE1230",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.114",
        "hostElapsed": 32,
        "monoElapsedMs": 29.54099999999471,
        "targetFetchPause": 0,
        "preflightId": "5C8D813E24F42077D467717E3B001ACC",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.107",
        "hostElapsed": 34,
        "monoElapsedMs": 31.266000000016447,
        "targetFetchPause": 0,
        "preflightId": "0408BD2E383C423D84CA4F5C9AF24ED0",
        "preflightAck": true,
        "extra204": true
      },
      {
        "id": "15711.110",
        "hostElapsed": 34,
        "monoElapsedMs": 30.61400000001413,
        "targetFetchPause": 0,
        "preflightId": "C5113E9C22ED08D4959AC0B016268173",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.117",
        "hostElapsed": 32,
        "monoElapsedMs": 28.84999999997717,
        "targetFetchPause": 0,
        "preflightId": "CBE109F5CA4C4E6F85E7E4CDC31A6690",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.111",
        "hostElapsed": 34,
        "monoElapsedMs": 30.427999999972144,
        "targetFetchPause": 0,
        "preflightId": "B415F01688F6A68538BC6AF66142F944",
        "preflightAck": true,
        "extra204": false
      },
      {
        "id": "15711.108",
        "hostElapsed": 34,
        "monoElapsedMs": 31.16699999998218,
        "targetFetchPause": 0,
        "preflightId": "C7D8ACB6BCF6C3AE10301844969D198C",
        "preflightAck": true,
        "extra204": false
      }
    ]
  }
]
```

## Metadata anterior integral, preservada como preparação/errata
## Jornada completa de autenticação — diagnóstico indispensável de transporte (20/10/2026)

HEAD `15c026658bc3bc0b3ce8f9b5a98b89db0e429e40`, árvore `1ca59e38463e9801ad127ac369107aa6daf766fe`, pai `f0ad85bc534626b44253da3fdc08e8f5008892fd`; mesmo PR, sem force/nova PR/rerun. Main revalidada `0fc45026d217db4ff9ac1c229fb4db52045424e5`.


## Jornada de autenticação — diagnóstico interno do bloqueio de transporte — 2026-10-20 18:52 UTC

Escopo exclusivo MLIVRETRABALHO. Prioridade atual: fechar jornadas/aceites internos, não contar microcorreções. A delegação de aceite pelo usuário permanece; nenhuma confirmação humana é aguardada. Estado: **ÁREA 2 AINDA PENDENTE**, não APROVADO; área10 mantém somente o aceite técnico standalone anteriormente comprovado e as outras12 não recebem aceite por este diagnóstico.

Base revalidada: main `0fc45026d217db4ff9ac1c229fb4db52045424e5`, árvore `7ef3d403383f51c1ba09a0a3cbee9ae4f6783c8d`; PR571 DRAFT HEAD anterior `f0ad85bc534626b44253da3fdc08e8f5008892fd`, árvore `e0e2092b8b949c19727e2823491b234edbb35eeb`. Main POST CI39468684723 e próprio571 CI39473842688 estão FAILURE de browser, não quota, sem nova retentativa. Jornada HTTP/PostgreSQL de autenticação e três rollbacks passaram no próprio571 anterior (18:22:56.3653454Z/56.7119459Z/56.7348488Z/56.8511510Z); isso NÃO empresta CI completo a um novo SHA nem fecha a área.

Nova análise das duas falhas do próprio571 anterior:24GETs cancelados aproximadamente30–40ms após início, depois de pausas/ACKs OPTIONS observados, antes de pausas dos GETs alvos observadas. Exemplos em docs/evidencias/AUTH_BROWSER_NETLOG_DIAGNOSIS_2026-10-20.md. Esta duração não justifica aumentar15s. Não comprova causa CORS/API/React/vendor/framework ou ausência global de navegação. A captura existente expõe ERR_ABORTED, mas não a sequência interna de erro do Chromium.

Entrega vinculada ao impedimento: coletor passivo de categoria Chromium `netlog` via CDP Tracing no probe existente. Sem categoria sensível, arquivo/raw trace, URL arbitrária, query, header, bearer, cookie, corpo ou stack persistidos/emitidos. Só eventos allowlisted/erro numérico, IDs numéricos/hex, relógio próprio e caminhos exatos da fixture loopback; buffer/browser e retenção limitados, perda explícita. Não infere vínculo com IDs CDP nem causa. Start/end browser-level não alteram continuação/guardas Fetch; conclusão/perda/erro não podem virar captura bem-sucedida silenciosa. Quatro verificações de contrato de privacidade/limite/lifecycle/integração acompanham a instrumentação indispensável; NÃO são aceite funcional.

Preservados shell12casos+canônico/MATRIX sticky, callbacks/fluxos de auth, control503/recovery, sandbox/CORS/LNA/Fetchguard/CDP, todos prazos/asserts/flags, API SQL/RLS/ACL/React19.1.4/RN0.81.6/deps/lock/workflows/mobile/build/smoke. Experimento CfT incompatível com sandbox continua retirado; nenhuma política/privilégio/bypass/instalador reativado. APK N/A por identidade integral dos insumos nativos e filtro standalone; não se alega APK novo/literal. Originais permanecem prefixos integrais, apêndice apenas.

Ambiente local de execução indisponível; somente preflight de sintaxe V8/adaptação explícita e exemplo puro com FakeURL, NÃO Node/tsc/Chrome/PG/local canonical PASS. CI completo no novo HEAD é PENDENTE nesta preparação; resultado terminal ficará no PR e será consolidado numa próxima entrega legítima, sem commit de status para verde. Só full ownCI SUCCESS + revisão fresh + gates aplicáveis permitem merge expectedSHA único, depois POST literal completo antes de aceite. Evidência/crosswalk e recibo final anterior preservados em docs/evidencias/AUTH_BROWSER_NETLOG_DIAGNOSIS_2026-10-20.md.


### Revisão exata

17 caminhos cumulativos; 1291/1298 blobs existentes do pai intactos fora dos sete modificados. Cumulativo inclui scripts de autenticação/rollbacks anteriores preservados; só nova instrumentação probe+helper+4contratos e apêndices nesta entrega. Todos164mobile/native/deps/lock/workflows/build/smoke idênticos à main. Shell12matrix+canônico e scriptcanônico byteexatos. APK N/A integral, sem APK emprestado. Todos10novosblobs UTF-8 readback integral exato; originais6prefixos integrais. Manifesto/reprodução/recibo final f0ad integral na nota Git.

CI próprio novo SHA PENDENTE nesta preparação. Sem ready/merge/POST/aceite até gates completos. A instrumentação é diagnóstico, não prova de reparo/RCA. Não declarar área2 aprovada apenas com script HTTP/PG nem 1/13 como porcentagem de código.

### Correção explícita da análise preliminar (18:55 UTC)
O capítulo de preparação e a nota Git registraram de modo amplo demais “antes de pausas dos GETs alvos observadas”. A correlação completa dos24alvos mostra:23sem targetGET Fetch.pause observado; UM alvo nativo `15711.106` teve Fetch.pause. Portanto NÃO são24ausências de pausa. Todos24têm preflight associado+ACK observado; só4extra204no recorte(2por caso), não24status204. Durações exatas: host31–44ms; CDPmonotônico28.832–39.789ms. Exemplos selecionados da nota permanecem corretos, mas não autorizam generalização para todos. Esta errata supersede somente a frase ampla; história Git preservada e consolidação no próximo delta legítimo, sem SHA de status/retentativa para verde.

