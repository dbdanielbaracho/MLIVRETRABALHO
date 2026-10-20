# Jornada de autenticação: reconciliação funcional de convites e contratos SDK

## Fechamento da jornada de autenticação — integração do ACK de convites e contratos mobile existentes (#568) — 2026-10-20 19:24 UTC

Prioridade: aceites internos completos, não microtestes/contadores. Main revalidada `8a8dd6d22f46b5762b306c2484ce58e0b9efe30f`, árvore `d5ce4089765625a96c9fc46f211dea0e9d8a4bca`; #571 jámerged, sem repetir merge ou CI. Seu ownCI39480166567 SUCCESS completo; POST39481392026 FAILURE de browser/captura,1801unit+wholeauthHTTPPG+3rollbackPASS. Matriz8PASS4FAIL/canônicoPASS/MATRIX1; startup15s semendpoint,24GETabort em2casos distintos e2capturas dataLosstrue (um caso de transportePASS virouFAIL pela perda diagnóstica). Sem RCA presumida/retentativa/relaxamento ou overrideCFT incompatível. FULLFINAL571 preservado na evidência desta integração.

Frente independente é o PR568 EXISTENTE, branch `fix/mobile-chat-support-calendar-20261016`, HEAD anterior `a5634eba2de8b2b56ba4b3bfea1d3d303f3d3c6d`. Integração normal com MAIN (pais ordenados[old568,main8a]), sem force/novaPR/duplicar a correção já existente. Foram auditados os8drafts restantes e seus caminhos. Lacuna concreta que impede aceite da área2: generateInvitation atual55d431... promove ACKexpiresAt impossível acreated; código existente56885c862... conservaunknown após ONEPOST. Reprodução V8 do corpo real+data predicate com TS removido só no adaptador/JSON explícito:3datas impossíveis created→unknown;3positivos(leap/offset/epoch/pre1970)preservados. NÃO Node/localcanonical/HTTPPG/Nest/RN/nativeproof e NÃO APIemitindo calendários impossíveis. Regressões canônicas já existem no568, não testes novos fabricados.

Reconciliação funcional: seis helpers568 de calendário reaproveitados BYTEEXATOS; seis arquivos/72casos de testes existentes BYTEEXATOS. company-replacements já foi corrigido na MAIN7f52f95b...: manter arquivoMAIN integral, NÃO sobrepor variante redundante615b9fd5. Helpers disponibilité/publicação/membros/conversa/suporte/intent são diffs de calendário; reversePATCH de6reconstróiFULLMAINBYTEEXATO. RootHTTP recebe só3hooksJSON previamente existentes568 sobre a versão MAIN, com reverse reconstróiFULLMAIN (inclui hookswholeauth571 e controles570); boundary e safety-chronology reaproveitados BYTEEXATOS568/oldassertsMAIN preservados.3scripts de contrato cliente/HTTP reaproveitados568, sem novos providers/schema/SQL/grants/flags/deadlines/payload/headers/retry. Sessão, contexto, storage queue e controladoresAPI atuais permanecem intactos.

Pacote por jornada: signup/login real→invites bound/expiry/revoke→contexto2empresas→oldlogout/newlogin/remoterevoke401 (script354807 real atual) será reexecutado junto com validadores negativos, normalACK/PGDates, clientmanagement16GET2POST+owner403/cross401, lostACK/restart/manualretry de suporte com testemunhoPG de linha antes da retentativa, disponibilidade/publicação/chat comJSONAPI. Adaptação de storage éINMEMORY explícita, NÃO SecureStore/RNrender/aparelho físico/PSP/pentest. Não declarar área2/4/9/11 aceita por números ou por APKlaunch. Outras jornadas dependem de seus critérios integrais.

CI completo novoSHA e APK próprios são PENDENTES nesta preparação.1873=[217Web1141mobile501API3CLI11monitor] SÓESPERADO, não executado;1141=1069MAIN+72reutilizados568, não importar9mobile595/18Ganhos584unmerged. APK APLICÁVEL por seis helpersmobile alterados, exigirá build/install/smoke/artefato/checkoutexatos+POST aplicável; nenhumAPK anterior emprestado. React19.1.4/RN0.81.6/depslock/workflows/buildsmoke/API SQLRLSACL intactos. BrowserNetlog128/categoria/config/dataLossfailclosed/12matrix+canônico/15s/FetchguardCDPCORSsandboxLNAflagsasserts MAIN intactos.

Seis originais568 preservados como prefixos integrais; missingtailMAIN anexado a partir do último prefixo comum em fronteira de linha. Manifesto de offsetsUTF16 reconstróiFULLMAINBYTEEXATO; MAIN não é prefixo contíguo quando as histórias divergem. Nenhuma conversa/arquivoMAIN fora do delta é perdido; antigos PNGs/notas568 mantidos porSHA, sem nova inspeção visual/aceite físico. Delegação do aceite e prioridade20/10 preservadas do MAINtail, não espera humana/CONTINUAR.

Estado de aceite nesta preparação:0novasáreas,12pendentes,apenas10técnica standalone previamente aceita. Só ownfullCI+APK SUCCESS/freshMAINbasehead/diffSHAmodo permitemready/mergeexpectedSHAumaúnicavez; POSTreais obrigatórios antes da decisão formal. Sem produção/RailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/rootgrantsRLSbypass. Recibo terminal emPR e consolidável em próxima entrega legítima, nunca commitstatus/Activitypara verde.

## Requisito → implementação → prova → gates

| Critério | Código e evidência aplicáveis | Gate ainda exigido |
|---|---|---|
| ACKconvite com calendário impossível não vira criado | company-members.ts85c862 e testes antigos6dd1...; baseline55d431 reproduzido com corpo real | Nodecanônico/fullCI do novoSHA |
| Signup/login/tenant/expiry/revoke completos | authentication-acceptance-e2e.cjs354807 com SDK atual + convite/rollback3f710 | novoHTTP/PG e12matrix+canônico+ProductionTruth |
| Leituras de membros+revogação/ACL/paridadePGDates | mobile-member-read-http-e2e.cjs0e48 e safety-chronology e3ead;16GET2POST/owner403/cross401 | reexecução real noSHA |
| ACKs e intenções de suporte/client restart/retry explícito | support-intent190926 + mobile-support-client07ecc + boundary16ebe + SDKdataJSON61adf | HTTPPG testemunhos/ACL inalterados |
| Validação disponibilidade/publicação/chat | becc/45fb/565a + seis arquivos72casosBYTEEXATOS +hooksJSON | novoCI/Android aplicável/POST |
| Não duplicar fixjáMAIN | company-replacements7f52 mantido, tests29cobrem contrato optionalDate | testes com versãoMAIN atual |
| Preservar história, controles e usuário | seis FULL568prefixes+FULLMAINtail reconstruível, dados/docs fora escopo iguaisMAIN | revisão SHA/modefresh e gates completos |

## Prova V8 explícita, NÃO Node/HTTP/PG/native
```json
{
  "scope": "V8 actual generateInvitation function body + explicit JSON/transport fixtures; TS signature and d:unknown removed ONLY; helper record/nonempty explicit equivalents; NOT Node/CI/NestHTTP/PG/native",
  "rows": [
    {
      "expiresAt": "2026-02-30T12:00:00Z",
      "main": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      },
      "existing568": {
        "result": {
          "status": "unknown"
        },
        "calls": 1
      }
    },
    {
      "expiresAt": "2025-02-29T12:00:00-03:00",
      "main": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      },
      "existing568": {
        "result": {
          "status": "unknown"
        },
        "calls": 1
      }
    },
    {
      "expiresAt": "2026-04-31T12:00:00+02:00",
      "main": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      },
      "existing568": {
        "result": {
          "status": "unknown"
        },
        "calls": 1
      }
    },
    {
      "expiresAt": "2024-02-29T23:30:00-03:00",
      "main": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      },
      "existing568": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      }
    },
    {
      "expiresAt": "1970-01-01T00:00:00Z",
      "main": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      },
      "existing568": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      }
    },
    {
      "expiresAt": "1969-12-31T23:59:59Z",
      "main": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      },
      "existing568": {
        "result": {
          "status": "created",
          "inviteCode": "00000000-0000-4000-8000-000000000001.fixture",
          "email": "fixture@example.test"
        },
        "calls": 1
      }
    }
  ]
}
```

## Reconciliação exata dos caminhos modificados
```json
[
  {
    "path": "apps/mobile/lib/availability-submit.ts",
    "oldBaseExactCurrentMain": true,
    "reuseOldBlob": true,
    "reversePreservesAllMain": true
  },
  {
    "path": "apps/mobile/lib/company-job-publication.ts",
    "oldBaseExactCurrentMain": true,
    "reuseOldBlob": true,
    "reversePreservesAllMain": true
  },
  {
    "path": "apps/mobile/lib/company-members.ts",
    "oldBaseExactCurrentMain": true,
    "reuseOldBlob": true,
    "reversePreservesAllMain": true
  },
  {
    "path": "apps/mobile/lib/company-replacements.ts",
    "blocked": "nonunique exact hunk"
  },
  {
    "path": "apps/mobile/lib/conversation.ts",
    "oldBaseExactCurrentMain": true,
    "reuseOldBlob": true,
    "reversePreservesAllMain": true
  },
  {
    "path": "apps/mobile/lib/professional-support.ts",
    "oldBaseExactCurrentMain": true,
    "reuseOldBlob": true,
    "reversePreservesAllMain": true
  },
  {
    "path": "apps/mobile/lib/support-intent.ts",
    "oldBaseExactCurrentMain": true,
    "reuseOldBlob": true,
    "reversePreservesAllMain": true
  },
  {
    "path": "scripts/http-journey-e2e.sh",
    "oldBaseExactCurrentMain": false,
    "reuseOldBlob": false,
    "reversePreservesAllMain": true
  },
  {
    "path": "scripts/http-support-assignment-boundary-e2e.sh",
    "oldBaseExactCurrentMain": true,
    "reuseOldBlob": true,
    "reversePreservesAllMain": true
  },
  {
    "path": "scripts/safety-support-chronology-e2e.cjs",
    "oldBaseExactCurrentMain": true,
    "reuseOldBlob": true,
    "reversePreservesAllMain": true
  }
]
```
A linha company-replacements originalmente marcou conflito de hunk na análise automatizada: revisão FULL provou que MAIN já contém a correção, portanto mantém7f52 integral. Não foi usado fuzz/patchforçado.

## Manifesto dos originais preservados
Offsets são unidades UTF16 das strings UTF8 decodificadas, não bytes. Cada fonte integral é recuperável pelo blobSHA e sua reconstrução foi comparada à fonte inteira.
```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "old568": "0fc1f017c6921e07c1a80703e99f3daf93e395d8",
    "main": "8a3a43a1cac9dc7720ee5ec10c761cb19ef5a6a1",
    "oldUtf16Length": 883985,
    "commonPrefixUtf16Chars": 606903,
    "mainTailStartInCandidateUtf16": 884111,
    "mainTailUtf16Chars": 2960965,
    "oldFullPrefixExact": true,
    "fullMainReconstructionExact": true
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "old568": "6b0f191af1e13a4aefa00fd325004909a02bc9ea",
    "main": "062643c9d312a4c53ee2868716c307bd3488362a",
    "oldUtf16Length": 1216556,
    "commonPrefixUtf16Chars": 939473,
    "mainTailStartInCandidateUtf16": 1216682,
    "mainTailUtf16Chars": 2962040,
    "oldFullPrefixExact": true,
    "fullMainReconstructionExact": true
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "old568": "d6d68fef68d53c1aa4b9b2138c420ae0ec9bb4ea",
    "main": "c088cae12abb8aaacb8c7d8ec2fc2dc6bc276a6b",
    "oldUtf16Length": 874227,
    "commonPrefixUtf16Chars": 597155,
    "mainTailStartInCandidateUtf16": 874353,
    "mainTailUtf16Chars": 2960855,
    "oldFullPrefixExact": true,
    "fullMainReconstructionExact": true
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "old568": "945fd0fb17099ad764efce59c46c01d9944fe704",
    "main": "65d3d3d4260d0ef766d51e86a4e0f022043f40e9",
    "oldUtf16Length": 869039,
    "commonPrefixUtf16Chars": 591960,
    "mainTailStartInCandidateUtf16": 869165,
    "mainTailUtf16Chars": 2960932,
    "oldFullPrefixExact": true,
    "fullMainReconstructionExact": true
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "old568": "85352c38c855c52bdc8dd5bea521a66862c5a27c",
    "main": "f36b3864e3e0f0e1040e2a47fa5ebc8d0cd0f164",
    "oldUtf16Length": 870148,
    "commonPrefixUtf16Chars": 593086,
    "mainTailStartInCandidateUtf16": 870274,
    "mainTailUtf16Chars": 2960745,
    "oldFullPrefixExact": true,
    "fullMainReconstructionExact": true
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "old568": "efcc9a0c42ca4758a2017ffa2150c265899488e1",
    "main": "7a92329b59f7bd3898566b469902fa842384d8b9",
    "oldUtf16Length": 466833,
    "commonPrefixUtf16Chars": 189751,
    "mainTailStartInCandidateUtf16": 466959,
    "mainTailUtf16Chars": 2960965,
    "oldFullPrefixExact": true,
    "fullMainReconstructionExact": true
  }
]
```

## FINAL571 integral (histórico, não PASS deste novo candidato)
## Jornada de autenticação — diagnóstico Chromium com exportação limitada

HEAD `ce8219936748c77e81edde0df6701cab3bcada31` / árvore `d5ce4089765625a96c9fc46f211dea0e9d8a4bca` / pai `15c026658bc3bc0b3ce8f9b5a98b89db0e429e40`. Mesmo PR571 DRAFT, sem novaPR/force/ready/merge/rerun.

## Recibo de 15c0266 e correção do orçamento de exportação — 2026-10-20 19:02 UTC

PR571 continua DRAFT/NOT MERGED. HEAD anterior `15c026658bc3bc0b3ce8f9b5a98b89db0e429e40`, árvore `1ca59e38463e9801ad127ac369107aa6daf766fe`, pai f0ad. CI39478739740/job118821442691/a1COMPLETEDFAILURE, ZEROretry. Metadados reais dos steps: typecheck/build/exportAndroid/RunTests/migrationrunner/privacy SUCCESS; HTTPjourney/readiness/ProductionTruth step FAILURE; PostSetupNode SKIPPED. NÃO atribuir ainda esta falha a browser/NetLog/auth/ProductionTruth específico: leitura do log completo retornou Transport closed repetidamente. Nenhum checkout real/contagem de testes/marker de jornada/Chrome/netlog desse run foi atribuído sem log. 1800=[216Web1069mobile501API3CLI11monitor] é só esperado, NÃO contagem observada neste recibo.

Diagnóstico mínimo do acesso: o mesmo conector leu o log anterior f0ad de5630016chars; o log novo falhou. Endpoint genérico de logs não suportado foi respeitado, sem credencial/URLassinada/bypass. Volume maior é HIPÓTESE, não causa comprovada do erro do conector.

Defeito concreto da exportação reproduzido em V8 com coletor real+FakeURL e8192eventos NetLog EXPLÍCITOS: snapshot anterior2759887chars ASCII, sem descarte; orçamento de64KiB excedido. Candidato reduz default/máximo de8192/65536para128/128: snapshot43429chars ASCII,128retidos/8064descartados/8192recebidos. NÃO é Chrome/Node/CI local PASS. Um teste canônico adicional em Node exige orçamento e contadores; quatro corpos anteriores intactos. A retenção limitada pode perder inícios/vínculos, e droppedEvents informa isso; nunca inferir ausência/causa a partir de eventos descartados. Categoria/buffer do Chromium/TraceConfig/15s/comandosstart-end/Fetchguard/continuações/shell12+canônico/flags/segurança inalterados. Mudança funcional de volume necessária para tornar o diagnóstico consumível, não commit artificial de status nem retry de SHA idêntico.

### Correção explícita da análise preliminar (18:55 UTC)
O capítulo de preparação e a nota Git registraram de modo amplo demais “antes de pausas dos GETs alvos observadas”. A correlação completa dos24alvos mostra:23sem targetGET Fetch.pause observado; UM alvo nativo `15711.106` teve Fetch.pause. Portanto NÃO são24ausências de pausa. Todos24têm preflight associado+ACK observado; só4extra204no recorte(2por caso), não24status204. Durações exatas: host31–44ms; CDPmonotônico28.832–39.789ms. Exemplos selecionados da nota permanecem corretos, mas não autorizam generalização para todos. Esta errata supersede somente a frase ampla; história Git preservada e consolidação no próximo delta legítimo, sem SHA de status/retentativa para verde.


Originais6 inteiros preservados por novo apêndice. Nova evidência `docs/evidencias/NETLOG_EXPORT_BUDGET_2026-10-20.md` contém recibo/manifesto e metadata anterior integral. Main0fc revalidada antes da entrega. APK N/A integral;172inputs protegidos incluindo164mobile/build/deps/lock/workflows byte/mode idênticosMAIN. ArtefatoMAIN94a12266784370 revalidado pelaAPI não expirado/digest/tamanho iguais, sem novo download nesta rodada e sem alegarAPKliteral0fc/novoHEAD.

NovoSHA/fullCI PENDENTE nesta preparação, não ready/merge/POST/aceite. Estado medido por aceites:0novasáreas;12pendentes,10somente técnico standalone aceita. O bloqueio de transporte ainda não foi resolvido nem atribuído causalmente; nenhuma aprovação externa inventada.


### Revisão
18paths cumulativos;1293/1301blobs existentes do pai intactos fora8modificados. ALL9novosblobs UTF8/fullreadback EXATO;6prefixos integrais;canônico/shell/probe481872 eauthscript354807 permanecem inalterados neste delta. APK N/A integral por172inputs protegidos incluindo164mobile idênticosMAIN. Teste Node novo de orçamento ainda PENDENTE em CI; fixtureV8 não é Node/Chrome/PG. CI próprio completo obrigatório no novoSHA. Formalização de aceite área2 depende da jornada completa e POST real, não de contadores de testes.


## CI próprio aprovado — 2026-10-20 19:12 UTC

HEAD `ce8219936748c77e81edde0df6701cab3bcada31`, árvore `d5ce4089765625a96c9fc46f211dea0e9d8a4bca`. CI39480166567/job118826336832/a1 SUCCESS completo, ZEROretry. Checkout real `da17b163f3b59418bc2f912239444c5a28779589`19:03:55.2785335Z é sintético, pais[MAIN0fc,HEADce821], árvore idêntica, verificação Git integral; NÃO HEADliteral.1801unitPASS[217Web1069mobile501API3CLI11monitor],0fail/cancel/skip; typecheck/build/exportAndroid/migration2x/privacy/HTTPPG/full12matrix+canônico/ProductionTruth19:09:59.9546784Z SUCCESS. JornadaAuthreal19:06:31.7809317Z e3rollbackstages19:06:32.2239426Z/32.2475605Z/32.2814870Z+explicitrecovery/ACLunchanged.

12matrixPASS,canônico8PASS19:08:44.4043725Z/MATRIX0 44.4083452Z. Chrome155.0.8059.84/protocol1.3/JS15.5.35.25/rev5869fe313571d75152b77813cf0a4ee26a4e6df0 SISTEMA, sem override. Não RCA/.84fix/zeroerroglobal.12NetLogsstarted+completedtrue/dataLossfalse/128retidoscada; received6827..33922/dropped1708..12588 explícitos. Nenhuma inferência de ausência: erros genéricos -109/-3 em alguns trechos process-wide não têm vínculo CDP/path e NÃO são causa comprovada dos abortos. Logs5265932chars acessíveis após correção de orçamento, mas não prova causal do erro anterior Transport closed. NenhumaPNG foi inspecionada visualmente/salvaGit nesta rodada; metadados/screenshots doCI não são VisualTruth.

Revisão final freshMAIN0fc/base/head/ALL18pathsSHA+modes100755rootHTTP/outros100644;172insumosAPKprotegidos inalterados. APK N/A integral sem build/borrowedAPK. Somente após este fullSUCCESS pode integrar expectedSHAumaúnicavez. **Aceite área2 continua condicionado ao POST literal completo e registro formal**, não é antecipado por este recibo.


## Pós-merge real — 20/10/2026 19:21 UTC

PR571 JÁMERGED19:11:59Z uma vez. MAIN `8a8dd6d22f46b5762b306c2484ce58e0b9efe30f`, árvore `d5ce4089765625a96c9fc46f211dea0e9d8a4bca`, pais[0fc45026d217db4ff9ac1c229fb4db52045424e5,ce8219936748c77e81edde0df6701cab3bcada31]. Own fullCI39480166567 SUCCESS não é POSTPASS.

POSTCI39481392026/job118830576539/a1 FAILURE, ZEROretry. CheckoutLITERAL8a8dd19:12:23.0507897Z.1801unitPASS[217Web1069mobile501API3CLI11monitor]/0fail-skip-cancel/types/build/exportAndroid/migration2x/privacyPASS. WholeAuthrealHTTPPGPASS19:14:53.5866751Z;3rollbackstages53.9888834Z/54.0153304Z/54.0500461Z eexplicitrecoveries/ACLunchangedPASS. HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted; não emprestar ownProductionTruth19:09:59.9546784Z à mainPOST.

Matriz8PASS4FAIL/canônico8PASS19:17:54.0500235Z/MATRIX1 54.0500593Z. Separar falhas:
1. minimal/baseline/concurrent: startupFAIL19:15:44.0343238Z/15000ms elapsed15001/spawntrue/exitObservedfalse/stderr0/stdout0/endpointnone/portfileabsente/flagsfatalerrorsandboxfalse; ANTESCDP/Page/Tracing, sem atribuir versão/GET à tentativa que não abriuChrome.
2. minimal/baseline/serial: transporte PASS efailedStageNULL19:16:22.6020223Z, MAS capturaNetLogdataLossOccurredtrue/14615recebidos/1712descartadoslocalmente/128retidos, CAPTURE_FAILED19:16:23.0908446Z reteveFAIL. NÃO chamar esta falha de12GETabort.
3. minimal/log-only/serial: umGET200→12GETERR_ABORTED/canceledtrue/semcorsError emparallel-before ANTESteamPOST/semReactNext;19:16:30.6758240Z. NetLogcompletetrue/dataLossfalse/4104recebidos/230descartados/128retidos; erros -109 deeventos[other-error] sempath/vínculoCDP não sãoRCA.
4. journey/baseline/concurrent:72GET200/3POST201+1expected401→12GETERR_ABORTED/canceledtrue;timeoutcurrentGET200wave19:17:17.4105139Z; capturaNetLogdataLosstrue/8664recebidos/100retidos, CAPTURE_FAILED19:17:22.7554385Z. Não inventar causa pelos eventos perdidos.

Outros8controles e canônico passaram. Nas tentativas que conectaram:Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev3ff7ac...; ownGREENChrome.84. Diferença de build/imagem é variável, NÃO prova causal/.84fix/.39semprefail. CFTincompatível continua retirado/sem permissões/bypass/root/flags/deadlines/guardschange. RaizintermitenteUNRESOLVED. Logs POST5896526chars acessíveis; orçamento corrigido sem relaxar dataLoss/matrixfailclosed.

APK N/A integral, não construído/emprestado/literal8a. Último medidoMAIN94aPOST58539427472933 artefato12266784370 revalidadoAPI nãoexpirado/ZIP28913550/digestbc5081d6...igual; sem novo download/individualAPKverificado nesta rodada. Não éSecureStore/RNrender/physical/VisualTruth/produção.

**Aceite interno:0novasáreas,12pendentes; não APROVADO área2.** Além do POSTfullCIred, reconciliação do568 encontrou ACK de convite com calendário impossível promovido acreated no SDK atual55d431...: três fixturesV8actualgenerateInvitation retornamcreated/ONEPOST; helperexistente56885c862...retornaunknown/ONEPOST;3positivoscontinuamcreated. NÃO falhaPGemitindodatainválida/NÃO NodecanonicalPASS. Lacuna já tem código e testes no PR568, sem abrir PR ou duplicar correção. Maincompany-replacements7f52jávalidadorcalendárioreal: preservar versãoMAIN, não sobrepor variante redundante568. Ação independente: integrar MAINnormal no568 existente, preservar72tests/contratos e todosguards/fullCI+APKpróprios+POST; não aumentar microtestes auth indefinidamente.

Recibos GitPENDING são história. Corrigir análise “24semGETpause” para23sem+1com(15711.106), host31–44ms/CDP28.832–39.789ms; errata jápreservada emNETLOG_EXPORT_BUDGET. NenhumSAMESHAretry/novoPR/novoaceite/assinaturaexterna. Sem produção/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal. Originais6preservados porapêndices; consolidar esteFINAL em próxima entrega funcional legítima, não commitstatus/image/Activity.


## FINAL568 anterior integral (histórico a563, não PASS deste novo candidato)
## APK próprio a563 FINAL — 2026-10-18 15:50 UTC
PR568 DRAFT/NOT MERGED; CI39138035113attempt1FAIL1551unitPASS/browserPOSTabort, ZEROretry, não novo merge/rerun.
OWNAPK39138035121/job117706473372attempt1COMPLETEDSUCCESS/ZEROretry. ACTUALcheckout6450352581a2ed851f386a12a10e69de781c7652primary14:53:54.2309796ZSINTÉTICOorderedparents[A68392c3bf8d82238f442ec6b68c023aefd751f6,a5634eba2de8b2b56ba4b3bfea1d3d303f3d3c6d]/tree6cbea51c446a10a272a5aba596715ece22a6d56eigualcandidateGitconfirmed,NÃOliteral.
Build15:03:58.0643608Z/installSuccess15:05:12.4351792Z/DEVICE_SMOKE_OK15:05:24.8376117ZwithoutMetro.
Artifact12140916922expires2026-11-01T15:05:25ZREALdownloadZIP28912804bytes/SHA25675a1dd6de734c5c7605af4cdebe5bdcef20f834711cc04fe77e9ecf00217045e=API. IndividualAPK66161804bytes/SHA256f88dd805384b840e3ebb0dbfd25938e90cf390dc1e572e1c8d464bcecf74725a=SHA256SUMS. BUILD_INFO645035/release/packagecom.predibeacon.mlivretrabalho.pilot/metro_required=false/build15:03:58Z. Staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36≠transport/UIproof.
Duas transferências locais interrompidas ficaram incompletas e foram REJEITADAS pelo ZIP/hashcheck; re-download normal aguardado atéexit0 produziu tamanho/hash API exatos acima. Nenhum workflow rerun.
ZIP≠APK;emulatorinstalllaunch≠calendarform/RNtap/SecureStore/nativequeue/physical/VisualTruth565offlineentry/prod. CIprodutoREDproíbemergeapesarAPKgreen. MAINstandalone técnico continua579POSTA683, não568candidate.
Próxima funcional independente: confirmação de candidatos (prazo/ownership/ACKvschildrefresh), sem copiar parser568 ou duplicarPR. Este FINAL é consolidável em Git somente junto de nova entrega funcional, não commit status/selfref.

### Corpo anterior INTEGRAL (41664 chars)
## FECHO próprio a563 — 2026-10-18 15:00 UTC — DRAFT / NOT MERGED

HEAD a5634eba2de8b2b56ba4b3bfea1d3d303f3d3c6d, tree6cbea51c446a10a272a5aba596715ece22a6d56e, pais ordenados [b7ef867464a3a529ec6e4f5518987143078f9d7e,MAINa68392c3bf8d82238f442ec6b68c023aefd751f6]. Integração NORMAL sem force, MAIN ancestral, ahead4behind0/mergebaseA683. Fresh MAIN permanece A683, 576/578/579 já merged; não repetir. Nenhum ready/merge/pós568/rerun/cancel/nova PR duplicada.

Entrega REAL nova: apps/mobile/tests/availability-calendar-screen.test.mjs SHA b0c5cb20f354400db0c4dc934779ec800d321dbd, 12 actual pré-JSX Disponibilidade+helpers REAIS / fixtures explícitas. MAIN baseline5PASS7FAIL -> exacthelper56812GREEN; 84focal e84TZSaoPauloPASS; FULLmobile961LOCALPASS889MAIN+60old568+12new/fail-skip-cancel0. Antigos cinco arquivos/60tests e sete helpers568 BYTEEXATOS, telaDisponibilidade/deadlines15s/current/owner/payload/manualretry/JSXstyles/API SQLRLS inalterados. Não novo parser/patch tela/durablebarrier/autoPOST/bugAPI com PGimpossível; não RNrender/native/SecureStore/HTTPPG na prova negativa.

### OWN CI39138035113/job117706473278 attempt1 COMPLETED FAILURE — ZERO retry
1551=[145Web,961mobile,431API,3CLI,11monitor] PASS/fail-skip-cancel0;12novos compiledok35..46 em14:55:54.4156401Z..4185904Z. Typecheck/build/mobileexport/migrationrunner2x/privacyretentionlegalhold PASS. HTTP/browser FAIL; PostSetupNodeSKIP; ProductionTruth posterior NÃOexecutado. Initializecontainers SUCCESS sem mudança registro/workflow; não prova quota global resolvida.
ACTUALcheckout6450352581a2ed851f386a12a10e69de781c7652 primário14:54:09.1712682Z SINTÉTICO orderedparents[A683,a563]/tree6cbe igual candidata, confirmadoGit, NÃO literalHEAD.

Provas ACTUAL deste CI: MOBILE_WINDOW_AVAILABILITY_REAL_JSON_PASS14:56:24.2976906Z; PUBLICATION_REAL_JSON_PASS14:56:24.4114306Z; CHAT_REAL_JSON_PASS14:56:30.4189444Z; PROFESSIONAL_CHRONOLOGY_PASS14:56:38.3642813Z; SAFETY_CHRONOLOGY_PASS14:56:39.0145315Z; MOBILE_SUPPORT_CLIENT_HTTP_PG_PASS14:56:39.0804891Z com lostACK/restart/retryEXPLÍCITO/storageINMEMORY/2rows/old5tables+ACLpoliciesiguais; MOBILE_MEMBER_SUPPORT_READ_HTTP_PG_PASS14:56:39.1420277Z com convitecreated/revoked/PGdates/owner403crossTenant401/16GET2POST/membershipassignmentold5tablesACLpoliciesiguais. São gates existentes568 executados neste NOVOHEAD, NÃO aceite nativo/área integral/provider.

### NOVO observado no navegador, NÃO repetir falsa descrição de12GET neste run
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev@3ff7ac5a9224be9156d7f8703a06e22890aafd34 primário14:57:22.2041223Z.
Falha14:57:44.1060466Z "created job rendered": signin201, teamPOST201 e DUASwaves12GET200 (24GET200 ao todo) bem-sucedidas. OPTIONSjobs204, mas UM POST /v1/company/jobs net::ERR_ABORTED/canceledTRUE/corsnull, sem ACKjob201. ZEROGETfailed na failurestate. UI corretamente conserva dados e avisa "A publicação não foi confirmada..." / equipe1 / métricas0 derivadas de GETs200 anteriores, NÃO12unavailable nem — desta vez.
Isto mostra cancelamento observado TAMBÉMnuma escrita, não apenas12GET; NÃO prova ausência de commit no servidor/cancelamentoSQL/causaAPI-CORS-vendor/framework. Sem trace558 neste run, não emprestar0Nav/context. 503/recovery/reload/logout/B/full8/ProductionTruth NÃOcompleted/PASS. Root intermitenteUNRESOLVED; CDP/Fetchguard/CORS/sandbox/LNA/flags/deadlines/asserts/images/exitstatus inalterados. NÃO rerun a563 para verde.

### OWN APK39138035121/job117706473372 attempt1 IN_PROGRESS build às15:00:20UTC
APK N/A FALSEmobile mudou. Nenhuma falha observada; running/SKIPnãoPASS. NENHUMfinalbuild/install/DEVICE_SMOKE/artifact/bytes/checkoutprimárioAPK atribuído ainda. Não cancel/rerunrunning/emprestarold568/574/579APK. CIprodutoRED já proíbe merge, mesmo se APK passar depois. Próximo ciclo verificar FINALAPK/logactualcheckoutGitparents/tree/REALdownloadZIP≠APK/SHA256SUMS/BUILD_INFO/expiry primeiro. MAINstandalone técnico medido continua579POSTA683, não568candidata.

### Revisão e preservação
49PRpaths SHA/modes exatos:8UTF8novos FULLfetch_blobreadbackEXACT +41samecontentaddressedreuses.1241of1257existingMAINblobs/modesiguais;488of498existingMAINnon-docsiguais, fora7helpers+3scriptsold568.250protectedexistinginputs243iguais, fora7helpers; novoAPKobrigatório; canonicalexpo-mobileprebuild→Gradle/workflowsbuildsmoke/depslock unchanged. Reversecomparison setehelpers confirma tudo fora datevalidation original568 e2trailingnewlinebytespreexistentes exato. 162LOCALexisting/reusedmobileblobs exatos; tsconfiglocaladaptadoNÃOPUBLICADO.
Seis FULL568prefixNO LUGAR+FULLMAINmissingtail apósúltimoendlinecomum anexado, reconstruibilidade BYTEEXATAmanifest path/blob/chars/offsets; NÃOclaimFULLMAINprefixcontíguo ondehistorydivergiu. Memória1216556chars>1MiBviaTREEpathSHA→fetch_blobFULL, APIcontentsEMPTYnãoemptyfile. Nova nota AVAILABILITY_CALENDAR_SCREEN_EFFECTS_2026-10-18.md50062chars preserva FULLold568body27886 + FULL574FINAL13804(receiptAPK4770SUCCESS+CIquotaRED), sem copiar574produto. Oldassets são históricos/mesmosblobs/nãoframesatuais.
2OWNdesktopPNG primaryjob117706473278 em scratch568-a563-own-captures.json, signature/SHA/bytes/dims1365x900/PillowverifyPASS. Login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686 NÃOvisualmenteinspecionado; failuredf8967ea0c1916b0ce9676dc8e4157c988284d5731bd168afe3083309c08599c/141249 VISUALMENTEinspecionado (unknownpublication/metrics0/team1). Fontea563/6450/tree6cbe/run39138035113attempt1FAIL,nãonative/notGitcurrentassets,nãoemprestarframes. GitprepPENDING é história; consolidar FINAL somente próximo ciclo FUNCIONAL, sem selfref/status/image/activitycommit.

### Após bloqueio: frente independente área5/matching LOCAL, sem patch/PR novo
MAINactualCandidatos8d55eec +company-candidatesd042f822 +runForSession reais, explicitfixtures:8novosLOCALmodels1PASS7FAIL. Cinco waits auth/transportauth/fetch/JSON/finalauth deixam pending=true/labelConfirmando após15s atédependênciaretornar;0POSTprimeiros2/1POSToutros,zeroautoretry. Dois pósACKconfirmed comGETchildfetch/finalauth travados mantêmbusy mas fato "Profissional confirmado." precisa ser preservado. UmpositiveONEPOST→refreshPASS;36oldcandidatecontrolsPASSBYTEINTACTOS. NÃOpart12/961/1551/nãoHTTPPG/SecureStore/Reactrender/produção. Scriptscratchnext-audit/candidate-confirm-deadline.test.mjs+auditMD, semprodutocandidateimplementado.
Fresh API CompanyJobsController e888c6a/confirmationDecisiondf1a6b7 lidos: joblock/activeinterest/confirmedreplay original/otherstatesconflict; NÃOnovaidempotênciainventada/autoPOST. Próximofuncional: freshnorms/main/PRs, ownoperationownership+retireREFANTESunlock, oldtimer/finallyvsNEWconfirm/read/selectionMESMOfoco, invalidar stale interestedsnapshot antespermitirnova ação, childcleanupSÓown/ACKconfirmedfactual/owner-tenantguardsapósawait. Nenhum fix preparado comoPASS nem copiar568parserparaoutraPR indevida.

Só10AndroidstandaloneTÉCNICAINTERNOaceita12pending,não%code. Externos215219220224228OPENfresh;Watch569CLOSED/completed05:01:41Z, nãoissuewrite manual. Rotinaúnicaenabled/scheduleinalterados/nenhumaoutra/semparcialtransientdisable. SemproduçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/Activitymanualwrites. Rodada entregou12regressões+integração+1551CIunit+provaHTTPPGnova noHEAD e8auditmodels; nãoestagnação. Nenhumaceiteintegral568 nembloqueioexternoqueexigeaçãoagora.

### Preparação anterior INTEGRAL preservada
## Nova entrega funcional — availability actual screen / integração normal MAIN (2026-10-18)

## 2026-10-18 — PR568: efeito de calendário no ACK da tela real de disponibilidade (PREPARAÇÃO FUNCIONAL)

Fontes revalidadas: MAIN a68392c3bf8d82238f442ec6b68c023aefd751f6/tree0b7eb07dbd6353eed75be80b6acd248de1dc247c; PR568 DRAFT HEAD b7ef867464a3a529ec6e4f5518987143078f9d7e/tree178be320b8e42e2ae9d0aa8d045b7b53802ba9f9. Integração normal de MAIN no PR568 EXISTENTE, pais ordenados [b7ef,A683], sem force/PR duplicada/rerun do SHA antigo. PR576/578/579 já MERGED, não repetir. MAIN579POSTCI39118128290 e APK39118128289 SUCCESS; standalone técnico atual A683, nenhum aceite integral adicional.

Requisito área3: disponibilidade só confirma salvo e apaga formulário depois de ACK verificável, preserva rascunho perante resposta incompatível/incerta. Novo apps/mobile/tests/availability-calendar-screen.test.mjs executa o save pré-JSX REAL de apps/mobile/app/disponibilidade.tsx SHA b4eb4736896148baec684b1b4ea6a5009919696e, com submitAvailability REAL e availabilityWindow REAL. Hooks/auth/network/JSON/timers explícitos, NÃO renderRN/SecureStore/HTTPPG/aparelho físico/produção.
12 novos casos: baseline MAIN 5PASS7FAIL -> helper568 já publicado 12GREEN, 12GREEN também TZ America/Sao_Paulo. Seis negativos individualizam startsAt/endsAt em 2027-02-30,2027-04-31,2026-11-31, que Date normalizava para janelas válidas FUTURAS 02/03/2027,01/05/2027,01/12/2026 e indevidamente apagava o rascunho/afirmava salvo. Três positivos aceitam as janelas canônicas legítimas. Um conserva retry MANUAL EXPLÍCITO do mesmo payload após unknown, sem POST automático; dois conservam owner/deadline perante ACK tardio incompatível. API retorna timestamps PG e possui ON CONFLICT(professional_id,starts_at,ends_at) já existente; não alegamos timestamp impossível real PG, exploit, nova idempotência/barreira durável/cancelamento servidor.

Produto NÃO ganha novo parser nem alteração de tela. Reutiliza BYTEEXATOS os sete helpers JÁ PUBLICADOS568 (availability-submit/company-job-publication/company-members/company-replacements/conversation/professional-support/support-intent), cinco arquivos/60testes568 e seis scripts/gates existentes568. Apps Disponibilidade/Membros579/Privacy578/Notifications576/Conversa MAIN e 12 controles antigos availability-screen-deadline BYTEINTACTOS. Preserva auth/tenant/UUID/payload/ACK/rejected/unknown/15s/manualretry/current/foco/JSX/styles/fila/session/API/SQL/RLS/ACL/migrações/React19.1.4/RN0.81.6/deps/lock/workflows/build/smoke. Não copia 574privacy,581Conversa,575DB,573ledger,571fixture,558instrumentação ou572registry.
LOCAL 84focal=[12new+12oldavailabilitydeadline+60old568] PASS, também TZ SaoPaulo; 96focalmaisoutrocalendar preexistente PASS; FULLmobile961PASS=[889main+60old568+12new], fail/skip/cancel0/Node24.19.0. Comparação local 162 existing/reused mobileblobs BYTEEXATOS; tsconfig local adaptado é EXCLUÍDO da publicação. Primeira instalação local removeu whitespace final em três helpers; corrigido antes publicação, hashes de todos12sources/testsold568 exatos. Sem assert antiga alterada. Todos scripts/gates568 são os blobs antigos, MAIN nesses paths era igual ao mergebase3e; preserva integralmente browser/503humanrecovery/Fetchguard/CDP/CORS/sandbox/LNA/deadlines/flags/asserts/imagens. Segurança não relaxada.

Normativos: seis FULL568PREFIX preservados NO LUGAR; FULLMAINmissingtail após último prefixo comum de LINHA acrescentado, manifest offsets/chars/blobs em docs/evidencias/AVAILABILITY_CALENDAR_SCREEN_EFFECTS_2026-10-18.md. Prefixo comum + segmento anexado reconstrói FULLMAIN BYTEEXATO; NÃO afirmar FULLMAINprefixcontíguo onde ramos divergiram. Memória>1MiB via treepathSHA→fetch_blob FULL, não APIcontentsEMPTY. Old568notes/assets continuam mesmos blobs/história/proveniência, não frames/PASS atuais. Nota nova preserva FULLold568PRbody27886chars e FULL574FINAL13804chars.

Consolidação5744770: CI39133014687attempt2FAILquotaECR ANTEScheckout em ambas tentativas, uma retry já consumida; nenhum produto/teste/Chrome novo executado. OWNAPK39133014704/job117691848889attempt1SUCCESS, checkoutb4f034ba23fb0e2fb0d4a8c4ead0c38a830a1576 SINTÉTICO orderedparents[A683,4770]/treec497 igual candidata confirmado Git, NÃO literal. Build13:56:56.3097811Z/installSuccess13:58:16.0210897Z/DEVICE_SMOKE_OK13:58:28.4949348Z withoutMetro. Artifact12139200939 expires2026-11-01T13:58:29Z download REAL ZIP28912892bytes/SHA25624093e019faec31588022fb6c99192c479c14c8c64ee22b7e7561bc81e98a791 APIexact; APKindividual66161708bytes/SHA256c3ba2c3db2e35fd4636918ca85e7ec276ab0e87ef30422198f4018d435538220 SHA256SUMSexact/BUILD_INFOb4f034/release/fixedpackage/metrofalse/build13:56:56Z. Staticmanifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36 ≠ transport/UIproof. ZIP≠APK; nãoPrivacyform/Alert/SecureStore/nativequeue/physical/VisualTruth/565offlineentry/produção. 574 segueDRAFT CIRED/nãoMERGED. FULLfinal574body gravado/readbackEXATO e preservado na nota funcional; não commit só status.

Novo CI/APK OWN no NOVO HEAD568 ainda PENDENTES neste apêndice de preparação. Esperado1551=[145Web,961mobile,431API,3CLI,11monitor] NÃO observado. APK N/A FALSE mobile alterado; todos gates próprios SUCCESS + freshdiff/main/base/head/expectedSHA obrigatórios antes merge e CI/APK reais pósmerge. Sem emprestar old568/574/581/579PASS/frames. Root12GET ERR_ABORTED segue UNRESOLVED; neste momento nenhum Chrome novo deste candidato. Se infra/browser bloquear, referência primária + avanço independente, não rerun mesmoSHA para verde.
Só10AndroidstandaloneTÉCNICAINTERNO aceita,12pendentes; não percentual código. Externos215219220224228OPEN fresh. Watch569 agora CLOSED/completed 2026-10-18T05:01:41Z; não agentstopped inferido nem issuewrite manual. Única rotina enabled/scheduleinalterados, sem outra/disableparcial/transitório. Sem produçãoRailwayNeon/serviços/custos/credenciais/providersPSP/contratos/dinheiroreal/root/grants/RLSdisable/Activitymanualwrites. Próximo passo: próprios CI/APK + inspeção literal/sintética/bytes; FINAL no PRbody e próximo ciclo FUNCIONAL, nunca selfref/status/image/activitycommit.

Novo HEAD: a5634eba2de8b2b56ba4b3bfea1d3d303f3d3c6d / tree 6cbea51c446a10a272a5aba596715ece22a6d56e.

### Corpo anterior INTEGRAL preservado
## CURRENT functional candidate — gates pending — 2026-10-16 UTC
HEAD b7ef867464a3a529ec6e4f5518987143078f9d7e / tree 178be320b8e42e2ae9d0aa8d045b7b53802ba9f9 / parent e2b3b3999dc40c380e60e567d34d612193aa7610. SamePR568 DRAFT/NOTMERGED; main3e098cd51cd2fd84f21e144a600a814a2cb1a150 unchanged. OwnNEW CI+APK PENDING, not green. No ready/merge/post/retry/cancel.

NEWreproducedcalendarfault: professional-support/company-members/company-replacements accepted impossible datesREADY and inviteACKCREATED.29newregressionsbaseline2PASS27FAIL→29GREEN;26oldfocalunchanged+29=55PASSinclSaoPaulo/fullmobile825localPASS. PredicatesONLY, existingAgenda functionbyteidentical; optionalnull/missing/offsets/epoch0/pre1970/order/payload/roles/context/noautoretry unchanged. APIusesPGdatesandownerchecks, noimaginaryAPIbug/impossiblePGrow/productionincident. ExpectedCI1415=[145Web,825mobile,431API,3CLI,11monitor], NOTyetobserved; mobilechangedAPKmandatory.

NEWindependentactualclientHTTPcase inexistingSafetyfixture AFTERalloldchronology+lostACKasserts: ownerreadmembers/invites→ONEgenerateInvitationPOST→PGboundexpiry/tokenhash→explicitrevokePOST→PGboundrevokedAt; noaccept/noaddedmembership. ProfessionalactualGETsupportassigned+generalEXISTINGauthorizedtenant, ownerreplacementassignmentreads+PGtimestamps; owner-onlyprofessional2x403 andforeignowner/outsider4x401. Required16GET+2POST, noproductionnetwork/autoretry/provider. Alloldsafety/support/membership/assignmentrows+ACL/policiesmuststayunchangedexceptoneOWNnewrevokedinvitation. NewscriptstrictCI/localAPIguard, calleractualPGsocket/nameguardalreadyrequired. This NEWgate PENDING, not nativeUI/SecureStore. Browser/laterSupportJSON/alloldgates untouched.

19cyclepaths, five originals+matrixFULLparent/mainprefixappend-only, wholeE2bFINALreceipt and5OWN E2bFAILdesktopPNGs+source manifest preserved, NOTnewhead/nativeframes. PredecessorCIred/APKgreen remains own history below. Onlyarea10technicalaccepted12pending. No production/services/costs/credentials/PSP/realmoney.

---

## HISTORICAL FINAL E2b — superseded only current candidate, not its actual evidence
## FINAL OWN CI FAILURE / OWN APK SUCCESS — DRAFT / NOTMERGED — 2026-10-16 UTC

Current HEAD `e2b3b3999dc40c380e60e567d34d612193aa7610`, tree `e444dd019eabc29fa6198642b5b6d120d63a3b77`, ordered parent `368aa313a2aa55ad269060bdde12b19cb7bd1465`. Main remains `3e098cd51cd2fd84f21e144a600a814a2cb1a150` / tree66f89c3ef2902dad6d1d59e0210be7229c3a857c / orderedparents[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. No ready/merge/post568/retry/cancel. General CI is FAILURE, never label it green or borrow prior567/368 results.

### Own CI: FAILURE, all1386unitsPASS
[38927529956/job117062786588](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38927529956/job/117062786588), attempt1 COMPLETE FAILURE, ZEROretry.1386=[145Web,796mobile,431API,3CLI,11monitor]PASS/fail-skip-cancel0. Types/build/mobileexport/migrationrunner2x/privacyPASS; HTTP/browserFAIL, PostSetupNodeSKIPPED/laterProductionTruthNOTexecuted.

### New actual independent client/API/Postgres results
- MOBILE_WINDOW_AVAILABILITY_REAL_JSON_PASS15:55:38.5979929Z and MOBILE_WINDOW_PUBLICATION_REAL_JSON_PASS15:55:38.7165788Z consume actual earlier HTTP ACK JSON with independently existing request payloads; CURRENTrealhelpers acceptvalidresponses, ZEROadditionalHTTPPOSTs by these consumers. NativeTSstrip/fixturecallback, not nativeUI or actualhelper-network proof.
- MOBILE_CHAT_REAL_JSON_PASS15:55:44.6768358Z from actual oldHTTPmessagePOSTACK+GETlist through currentloadMessages/sendMessage, also ZEROadditionalHTTPPOSTs.
- **MOBILE_SUPPORT_CLIENT_HTTP_PG_PASS15:55:53.2922134Z** is different: actualCURRENT SupportSubmission/SupportIntent modules execute REALfetch against guarded disposablelocalhostAPI and actualPG. NormalcaseCONFIRMED, restored in newstoreobject, confirmedbarrier preventsnewcasePOST, explicitlocalrelease. A SECONDnewintent gets actualPOST201 and validACK, fixture locally drops that response ONCE; appreturnsUNKNOWN and retainsPENDING. ReadonlyPGwitness proves rowCOMMITTED BEFORE separate explicitretry. Restart/inspect/sendNew/release makeNOimplicitcasePOST. ONEexplicitpendingretry uses samekey/body and returns samecaseACK, then explicitlocalrelease. Actual totals2preparationPOSTs/3casePOSTs/2rows, not productionbusinessautoretry.
- Cases d02e9776-9a14-4a2b-a358-9400c9d30a2c and9a75046f-3d0a-4ccd-b32d-113e4887bf5b. PGDateobjects/currentdatabaseexactmlivretrabalho_http/actualclientsocket::1; identity/tenant/assignment/key/payload/statusbinding. Fiveexistingfixturetableoldrows unchanged, ACL/policiesunchanged, outsider401. No newSQLDML/DDL/grants/RLSdisable/events/historydeletion. Serializationadapter **INMEMORY**, objectrestart only, NOTdisk/SecureStore/nativeAndroidprocess/UI/keyboard/physical/providerproof.
- All original SAFETY_CHRONOLOGY assertions pass15:55:53.2207436Z before newcases; original3actualHTTPorders +currentSafetyrealJSONloader preserved. PROFESSIONAL_CHRONOLOGY_PASS15:55:52.5515482Z.
- OLD later **MOBILE_SUPPORT_REAL_JSON_PASS NOTEXECUTED**: its separate existing HTTPfixture is after the failedbrowser. Newactualclientcase is not backfilled or borrowedPASS for that older gate.

### Browser: real partial success followed by B failure
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 actual15:56:29.5720964Z.
WEB_SECTION_AVAILABILITY_BROWSER_PASS15:56:31.6218087Z: actualONEteamsGET503 consumed +11otherDISTINCTrealGET200, unknownloading/—, humanrefresh12NEWGET200/team1, ZEROextraPOSTfromSEND. ActualAteam/jobACK201/persist/pay12345cents/dates/render passed. Anewcompletedocumentreload and actualsignoutPOST201 occurred beforeB by primaryresponses and unchanged sequentialdrivercontrolflow.
FAIL15:56:51.7439035Z loaded-dashboard after Bsignin201: **B12GETnetERR_ABORTED/canceledTRUE/corsErrorNULL**, UI B12unavailable/counts/rates—, NOTfalsezero. FinalB isolation assertions and actualrevoked-browserGETme401/otherSAMEidentitysession200 are AFTERthisfailedgate and NOTEXECUTED. No full8journeyPASS. Notstartup/ECR/newpermissiondenial, rootoldintermittentabortsUNRESOLVED, noAPI/CORS/Chrome/vendorcauseproved. No browserflags/image/security/Fetchguard/CORS/sandbox/LNA/deadlinechange.

FiveOWNdesktopPNGs in primarylog117062786588 / window-ack-calendar-local/568-e2b-own-web-captures.json independentlydecodedPNGsignature/SHA256/bytes1365x900/PillowverifyPASS; recovered+failurevisuallyinspected. NOTnativeframes, NOTyetGitcurrentframes; preserveownsourcehead/checkout/tree/run/attempt/job/result in NEXTFUNCTIONALcycle only, noimage-onlycommit:
- login SHA25675fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc / 33686bytes
- company-a-created SHA256b2a1809d42ac13150d6db2029578494ca3f4466df85d34ab6e12fbe5a2abe14c / 133056bytes
- company-a-team-read-unavailable SHA25678f5b3465d386266a94de437d8e584592742b2f443bd13dfb059a38e01293290 / 142042bytes
- company-a-team-read-recovered SHA256be322e4f7610e6803fa0c47462d7fd386f8f85e14f5405084fb7a1f5f285bbda / 133314bytes
- failure SHA25689ab057dfd60cb28f86a33d2deb2e38d886e733c1515e0815712bf9302ee3f3d / 133827bytes

### Checkout truth / review
CIprimary15:53:27.2299841Z checkout `618d119f12c07c7a16a475ba1ecb6ac8fe31ce42` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`e2b3b3999dc40c380e60e567d34d612193aa7610`] / treee444dd019eabc29fa6198642b5b6d120d63a3b77 equivalentcandidate, NOTliteralHEAD; Gitcommit/tree/parents re-read.

WholePR35paths / ALL35remoteUTF8orbase64-whitespace-normalizedbyteexact:17newcyclepaths checkedagainstpreparedbytes,18priorpaths readbackunchanged. Modes100755twoHTTPshells100644rest.1176otherpredecessorblobsSHA/modeunchanged.486of493existingmainnon-docblobs outside4validators+3HTTP/fixture scriptsidentical. APIcontrollers/SQL/RLS/auth/roles/membership/events/allJSX/React19.1.4/RN0.81.6/deps/lock/native/workflows/build/smoke unchanged;89selectedprotectedinputs verifiedsame. Appmobilechanged soAPK N/A is FALSE. Nativecanonicalworkflowandoldsmoke retained,565draftgate neitheradoptednorremoved. Ahead2behind0/mergebase3e. FullmainAND368prefix5originaldocs+matrixpreservedINPLACE, whole368FINALreceipt consolidated. Prior368twoFAILdesktopPNGs+manifest nowGitwithownexactprovenance; allolder567assets sameblobs/modes, nonecurrente2b/native.

14NEWACKwindowregressions actualbaseline2PASS12FAIL;17old+14new RED19PASS12FAIL→GREEN31/31, TZAmerica/Sao_Paulo31PASS; full796local+CI. OnlyACKcalendarpredicateschange in availability-submit/company-job-publication, existingAgenda predicate copied; allsourceoutsideACKguards reversibleexactto368. Inputprevalidation/payload/headers/path/identity/tenant/current/UUID/retrypolicy unchanged. Prior17chat/supportregressions+predicates unchanged. NoimpossiblePGstoredrow/productionincident/exploitclaim.

### Acceptance and next safe work
Onlyarea10Androidstandalone TECHNICALINTERNAL accepted, other12pending; unitcounts/desktop/APIJSON/DEVICE_SMOKE_OK do not acceptnativeUIor13areas. Externals215/219/220/224/228OPENseparate. No production/newservices/costs/providers/PSP/credentials/contracts/realmoney. Other558/560/565remainDRAFTFAILseparate. No productrerunmerelyforgreen/no blindrerune2b/no metadata-onlyselfreference/activitycommit.

LOCALnextaudit only, NOTpublished/notpart796: currentprofessional-support,company-members,company-replacements realhelpers accept3impossiblecalendarstrings asREADY/invitationACKCREATED. window-ack-calendar-local/next-audit/remaining-calendar.test.mjs14tests baseline2PASS12FAIL (validleapday+epochcontrolsPASS), noappfix/CI/HTTP/Android/PGinvaliddataproof. Needs freshcontracts+optionaldate/role/tenantcontrols+actualAPIfixturebeforeminimalfix, notallparsersfixed. CurrentcompanymembersAPIowner-only and PGgeneratedexpiry remain authoritative; noauthorityexpansion/imaginaryAPIbug. Native565Ethernet strictguard remains unresolved; no unsupportednetworkcmd/root/grant/firewall/deadline/securitychange.

### Own standalone APK: SUCCESS, scoped install/launch proof
[38927530012/job117062788313](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38927530012/job/117062788313), attempt1 COMPLETE SUCCESS, ZEROretry. CanonicalbuildSUCCESS16:04:17.7448487Z / installationSuccess16:05:45.4238736Z / DEVICE_SMOKE_OK16:05:57.8290012Z metro_required=false, API35/x86_64/pixel6. Mainworkflow/build/oldsmoke unchanged; failure-onlydiagnosticsteps normalSKIPPED. NOT565offlineguard/forms/taps/keyboard/nativeauthsuccess/SecureStore/physical/VisualTruth evidence.
APKprimarycheckout15:53:14.5157558Z sameSYNTHETIC618d119f12c07c7a16a475ba1ecb6ac8fe31ce42 parents[3e,e2b]treee444, NOTliteralHEAD.

Artifact12058331243/notexpired/expiry2026-10-30T16:05:59Z actuallydownloadedthroughGitHubartifacttool and inspected:
- ZIP28912196bytes SHA25616803b5265c6bd42f66694bd4ef94fc7d87434c8f9bdf55986b0290b565fc4b5 matchesGitHubAPIdigest.
- IndividualAPK66161688bytes SHA25662996c3d76af8a2f91a3662e3c09b57be83bca9d9a15d922f7d5737ffcb69333 matchesSHA256SUMS.
- BUILD_INFO exactcheckout618d119f12c07c7a16a475ba1ecb6ac8fe31ce42/release/packagecom.predibeacon.mlivretrabalho.pilot/metrofalse.
- StaticgeneratedmanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480, same567/368/minSDK24target36/INTERNET/noexplicitusesCleartextTrafficorNetworkSecurityConfig; STATIC metadata only, NOT actualHTTPtransport/securitypermission/nativeUIproof. ZIPdigest is NOTindividualAPKindigest.
LatestvalidatedMAINAPK remains567POST3e; this is candidatee2b ownAPK, no568merge/post exists.

### Fresh monitoring / records
ActivityWatch38913325312/job117014361308SUCCESS schedulemarker14:08:20.1879949Z main3e/age182/openPR4/active0. #569OPEN botcreated14:08:20Z, monitor of commits not proof agentstopped. No manualissuewrites/activitycommit. Main3e and568DRAFT exacthead reconfirmed; otherdrafts558879/560e47/565aa0+external215219220224228remainopen. Keep existingroutineonlyenabled/scheduleunchanged,13taskNOTcomplete. Gitdocs preparationPENDING is historical, thisFINALreceipt is authoritativefornewownresults; consolidateFINALe2b in5docs/matrixONLYnextFUNCTIONALcycle, noautorefmetadata/image-onlycommit.

---

## HISTORICAL preparation and predecessor368 receipt — not results of currente2b
## CURRENT functional candidate — 2026-10-16 UTC
HEAD e2b3b3999dc40c380e60e567d34d612193aa7610 / tree e444dd019eabc29fa6198642b5b6d120d63a3b77 / ordered parent 368aa313a2aa55ad269060bdde12b19cb7bd1465. Same PR568, DRAFT/NOTMERGED. Main 3e098cd51cd2fd84f21e144a600a814a2cb1a150 unchanged. Own NEW CI and APK PENDING, not PASS. No ready/merge/post/retry/cancel.

14 new regressions reproduce normalized impossible startsAt/endsAt ACKs of a valid request (new2PASS12FAIL; old17+new14 RED19PASS12FAIL -> GREEN31/31). Full mobile796PASS locally, no fail/skip/cancel; expected aggregate1386, not yet CI. Minimal ACK date guards only in availability-submit and company-job-publication; request/input policy unchanged.

NEW independent real SupportSubmission/SupportIntent client HTTP cases after all original safety-chronology assertions: normal confirmation and defined local loss after actual HTTP201, PostgreSQL witness BEFORE explicit retry, pending recovery with no implicit POST, explicit same-key replay, local release. Adapter in memory, not SecureStore/disk/Android UI. Two prepPOSTs/three casePOSTs/two rows required; no business autoretry. New window ACK consumer gates use actual prior HTTP JSON with independent requestpayloads, no new POSTs. Existing browser and later support JSON gate remain required, unchanged; no deadline/security/Fetchguard/CORS/sandbox/LNA/workflow/build/smoke change.

17 functional-cycle paths:2ACK modules+14testfile+4scripts+5originaldocs+matrix+new evidence+2prior368desktopPNGs+manifest. Full predecessor/main document prefixes preserved in place. Prior368CI FAILURE/APK SUCCESS consolidated whole, no PASS borrowed. NativeAPK required (mobile changed); own/post exactcheckout to be verified. Only area10 technical internal accepted, other12pending. Externals open/separate. Final receipts below are historical predecessor368, not results of this new HEAD.

---

## FINAL OWN VERIFIED — DRAFT / NOT MERGED — 2026-10-16 12:03 UTC

HEAD `368aa313a2aa55ad269060bdde12b19cb7bd1465`, tree `09bd6335ed6da6f0cf593b5523ac52b59cb076c0`, parent/base MAIN `3e098cd51cd2fd84f21e144a600a814a2cb1a150`. No ready, merge, post-568 run, rerun or cancellation. General CI is FAILURE; own standalone APK is SUCCESS. Do not borrow previous567 green or retry this product failure merely for green.

### Own general CI: FAILURE, not green
[38896338100/job116957597212](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38896338100/job/116957597212), attempt1 completeFAILURE, ZEROretry.
1372tests=[145Web,782mobile,431API,3CLI,11monitor] allPASS/fail-skip-cancel0. Typecheck/build/mobileexport/migrationrunner2x/privacyPASS. HTTP/browserFAIL; PostSetupNodeSKIPPED; later ProductionTruth and later support HTTP fixture NOT executed.

**Actual new positive consumer gate:** MOBILE_CHAT_REAL_JSON_PASS11:52:07.8816248Z consumed actual PostgreSQL/API-created POST message ACK and GET message list with CURRENT real mobile loadMessages/sendMessage helpers. Transport callback returns already-obtained actual JSON; it sends ZERO additional HTTP POSTs. This is positive API JSON-to-helper compatibility, NOT real Android UI or client network/SecureStore proof.

**New support JSON consumer gate: NOT EXECUTED.** Its invocation is in the later existing HTTP support fixture, after http-journey/browser; failure stopped the workflow before reaching it. The9 new support calendar tests and all old local/CI support tests passed, but MUST NOT label the new real support JSON gate PASS. No support delivery/outbox/provider/native proof.

### Primary browser failure
Actual Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 observed11:53:02.2076616Z.
Browsercreatedjob-render timeout11:53:24.4937681Z. Actual teamPOST201 and jobPOST201 observed, followed by12 GET net::ERR_ABORTED/canceled=true/corsError=null. Failure DOM shows12 unavailable sections/counts and rates—, not invented zero. This run did NOT complete created-job rendering/partial503/recovery/reload/logout/B journey. No availability or journey PASS marker. Not ECR/startup failure here; actual root of old aborts remainsUNRESOLVED, not proved API/CORS/vendor defect. No browser/security/Fetchguard/CORS/sandbox/LNApermission/deadline change.

Two OWN568 desktop PNGs from this job independently signature/SHA256/bytes/1365x900/PillowverifyPASS; failure visually inspected. Not native frames, not yet Git assets:
- login75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686
- failureca8b160097084f7a3214c125780515cd7e66d05ded89dcf057d1b8d43538bdbc/133660
Scratch chat-support-calendar-local/568-own-web-captures.json. Preserve own exact source only in NEXT FUNCTIONAL cycle, not image-only commit.

### Own standalone APK: SUCCESS, scoped install/launch proof
[38896338029/job116957597028](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38896338029/job/116957597028), attempt1 completeSUCCESS, ZEROretry.
CanonicalbuildSUCCESS12:00:14.0015569Z; emulatorAPI35/x86_64/pixel6; installationSuccess12:01:47.8590566Z; DEVICE_SMOKE_OK12:02:00.3559792Z metro_required=false. Original main build/workflow/smoke unchanged. Failure-only diagnostics normally skipped on success. NOT565offlineentry/newforms/taps/keyboard/SecureStore/authsuccess/physical/VisualTruth proof.

Artifact12044258736/notexpired/expiry2026-10-30T12:02:02Z, actually downloaded and independently inspected:
- ZIP28912071bytes SHA2561a82df5ffa9b5fab2cdf8fd4830576042eb741662bca4ed8d962b61ce6b463a1 matches API digest.
- IndividualAPK66161572bytes SHA256f2453f30b13d83936d5e87af64e8212e4765420c97aa0f7f45ea27a8d54ce0be matches SHA256SUMS.
- BUILD_INFO commit6dc07b039535169a5e07399b5566ffb840a8230a/release/packagecom.predibeacon.mlivretrabalho.pilot/metrofalse.
- Static generatedmanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480 equals567. minSDK24/target36/INTERNETdeclared; static metadata not actual transport/security/UI proof. ZIP digest is NOT individual APK digest.

### Checkout truth / full review
Both runs actualcheckout `6dc07b039535169a5e07399b5566ffb840a8230a` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`368aa313a2aa55ad269060bdde12b19cb7bd1465`], tree09bd6335ed6da6f0cf593b5523ac52b59cb076c0 exactly candidate, NOT literal HEAD. CIprimary11:49:54.2445938Z/native11:49:41.7569364Z; Git commit/tree/parents re-read.

26paths ALLremoteUTF8/base64-whitespace-normalized bytes EXACT; modes100755 twoexistingHTTPshells,100644rest.1161otherpriorblobs sameSHA/mode;489of493 existing main non-docs outside2mobilevalidators+2HTTPscripts unchanged. All old assertions/HTTPcalls preserved, scripts each addONE nonblank consumer invocation.3newtest files + newconsumer script. All source outside2datepredicates/ACKcondition exactly reversible to main, all oldmobiletests intact. Full5originaldocs+matrixmainprefix preserved INPLACE,567 FINALreceipt consolidated integral and10historical567WebPNGs+manifest persisted with exact own/post provenance. None are568/nativeframes. Ahead1/behind0/mergebase3e. APKN/A FALSE, mobilechanged; ownAPK measured. No main/integrated gate was removed;565draft gate not incorporated.

Editorial scope clarification: prepared appendix says corrupt confirmed record “em disco”; observed regression uses serialized raw JSON in an IN-MEMORY adapter, not actual disk or native SecureStore. Implementation fails closed on invalid stored JSON without deletion/replacement; no retention policy invented.

### Functional result / limits / continuation
17newregressions baseline4PASS13FAIL→17PASS; old51+17=68PASS includingAmerica/Sao_Paulo; full782mobilelocal+CI. Reads reject impossible calendar, chatACKunknown afterONEunchangedcall, supportACKunknown/pending barrier retained with sameidentity/tenant/key/payload, no implicit repeat or release. Existing valid calendars/offsets/epochzero/explicit confirmed release unaffected. No impossible timestamp stored inPG/productionincident/exploit claimed.

MAIN remains3e/tree66f89c/orderedparents[f98,3a66]. Onlyarea10AndroidstandaloneTECHNICALINTERNAL accepted; other12pending. Otherdrafts558/560/565 unchanged;externals215/219/220/224/228OPEN. No production/services/costs/providers/PSP/realmoney. Do not ready/merge/rerun368 blind; consolidate FINAL568 only next FUNCTIONALcycle, no self-reference metadata/image/activity Gitcommit. The support actualJSON gate remains a concrete pending proof.

Independent NEXT LOCAL audit only, not published/not part782: current availability-submit and company-job-publication accept impossible2026-02-30 ACK when it normalizes to valid requested2026-03-02 instant. Actualhelpers fixture3tests baseline1PASS2FAIL;17oldcontrols+3 baseline18PASS2FAIL, copiedcandidate addscalendarcheck onlyACK fields→20PASS. Inputs/requests/response-offset equivalence unchanged in copy. APIavailability and companyjobcreate already validate input calendar/interval, no API bug. Screen requires nonblankworkCity, so speculative blank-city helper mismatch was NOT patched. No source/commit after368 or actualHTTP/Android/exploit proof for nextaudit. Needs fresh normative/source/contracts + coherent new regression/gates, NOT a blind retry of existing failure.

---
## Historical preparation — superseded ONLY by actual results above
## Functional correction / gates pending
Base 3e098cd51cd2fd84f21e144a600a814a2cb1a150; HEAD 368aa313a2aa55ad269060bdde12b19cb7bd1465; tree 09bd6335ed6da6f0cf593b5523ac52b59cb076c0. Only chat/support date predicates change; no app UI/authority/transport/retry policy change. 17 new regressions baseline4PASS13FAIL→17PASS; 51 unchanged focal tests +17=68PASS; fullmobile782PASS / zero fail, skip or cancel. TZ America/Sao_Paulo68PASS. Real HTTP fixture JSON-to-current-helper parity is added, still PENDING primary CI.

Own CI expected1372=[145Web,782mobile,431API,3CLI,11monitor] and own standalone APK REQUIRED, NOT yet PASS. Post gates required on actual real merge. No ready/merge until justified fresh exactHEAD green; no blind retry product failure. Onlyarea10technical accepted; other12pending. No production/costs/providers/PSP/realmoney. Otherdrafts558/560/565 preserved.


## Conversa e suporte — integridade do calendário e ACK — ciclo funcional 2026-10-16 UTC

Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, após567 jáMERGED. README e originais completos recebidos de GitHub; todos os bytes anteriores dos5originais/matriz permanecem PREFIXO integral NO LUGAR, sem substituir documentos ou estados históricos por resumo. Recibo final567 integral abaixo consolida próprio+pós reais no ciclo funcional, não é resultado deste novo HEAD.

### Falha reproduzida e correção mínima
Conversa loadMessages aceitava createdAt impossível e apresentava READY; sendMessage aceitava mesmo ACK como SENT. SupportAcknowledgement aceitava createdAt impossível, createSupportSubmission real retornava CONFIRMED e store confirm/releaseConfirmed podia liberar a barreira pendente. Fixtures usam2026-02-30,2025-02-29-03:00,2026-04-31+02:00, que Date normaliza. Reproduzido nos módulos TypeScript REAIS com transportes/adapter in-memory explícitos, não alegação de data impossível armazenada noPostgres, incidente/exploit de produção ou SecureStore nativo.

Correção SOMENTE predicado date em apps/mobile/lib/conversation.ts e inclusão do mesmo predicado calendário já usado BYTE-IDÊNTICO pela Agenda em support-intent.ts, substituindo a condição createdAt doACK. Ler calendário inválido retornaERROR; ACK de conversa permaneceUNKNOWN depois de UMA chamada; suporte retornaUNKNOWN, mantém registro pending exatamente com mesma identidade/tenant/chave/payload; novo sendNew recuperaPENDING sem outra preparação/POST; releaseConfirmed recusa sem remover. Registro confirmado corrompido em disco falha fechado, não é apagado/substituído por política inventada. Calendários válidos/leapday2024/offset cruzandoUTC/epochzero strings exatas preservados; liberação explícita de confirmado válido permanece. Não alterar contrato de suporte geral nullassignment autorizado, autoridade por tenant/membership ou recuperação explícita.

17regressões novas em conversation-calendar.test.mjs(8),support-calendar.test.mjs(5),support-submission-calendar.test.mjs(4): baseline main4PASS/13FAIL→GREEN17/17.51testes existentes BYTE-IDÊNTICOS nesses3módulos +17=68/68PASS, inclusive TZ America/Sao_Paulo. Fullmobile782/782PASS local,0fail/skip/cancel (765anteriores+17); modelos/helpers reais≠renderReactNative/Android/SecureStore. Todo source fora2predicados/condição compare-substituível BYTE-IDÊNTICO. Requests/UUID/path/headers/body/tenant/sessão/foco/prazo15s/chaveidempotente/current/ordem/stat/ACK/no-autoretry/JSX/API/controllers/SQL/RLS/grants/eventos/mobiledesign/deps/lock/build/workflows/smoke preservados.

### Paridade com JSON HTTP/Postgres real — gate novo, ainda PENDENTE nesta preparação
scripts/mobile-chat-support-contract.cjs lê somente JSON já obtido pelas fixtures locais existentes: real POST+GET de conversa e replayACK de suporte apósreview. NativeTSstrip carrega helpers atuais; conversa valida lista/ACK e suporte stage/confirm/restart/read/release em adapter in-memory. Duas invocações adicionadas aosHTTPscripts, TODOS asserts/chamadas HTTP anteriores intactos; nenhuma nova chamadaHTTP/SQL, nenhumPOST adicional, alteração de grant/policy/status/body/tenant/auth. Gate exige CI e configAPIPG exatoslocalhost via helper localConfiguration existente; script não acessa banco/rede/credencial, não recebe bearer. Marcadores MOBILE_CHAT_REAL_JSON_PASS eMOBILE_SUPPORT_REAL_JSON_PASS só podem ser aceitos após logs primários novos, não resultados locais simulados/antecipados. Não conta marcadores como novos testes unitários nem prova de tela ou SecureStore.

### Evidência histórica567 persistida com origem própria
DezPNGs Web de567(5OWN+5POST) +PR567_OWN_POST_CHAT_SUPPORT_CYCLE_PROVENANCE.json persistidos neste ciclo sobdocs/evidencias/web-browser-2026-10-16/, comsignature/SHA256/bytes/1365x900 conferidos independentemente, fonteprimáriajobs116937140753/116942544994. OWNsourcehead3a66/checkout42ffcSINTÉTICO[f98,3a66]/tree66f89c/run38890073248attempt1SUCCESS; POSTcheckoutLITERAL3e/run38891514441attempt2SUCCESS. Não são frames deste novoHEAD nem Android. Recibo567 separaAPKindividual≠ZIP; nenhuma prova567 é emprestada para aceitar candidato/565/558/560.

### Gates e limites atuais
OWNCI esperado1372=[145Web,782mobile,431API,3CLI,11monitor], APKstandaloneOWN obrigatório por mobilealterado, ambos AINDA PENDENTES neste apêndice preparação; pósCI/APK no mergeREAL também obrigatórios. Não ready/merge sem ambos própriosGREEN e revisão/expectedSHAfresh, não rerun falhaproduto para verde. Preservar f98/3e/567históricos, não repetir merges. Navegador/CORS/Fetchguard/sandbox/LNA/permissões/deadlines inalterados; causa antigaERR_ABORTED e startup permaneceUNRESOLVED apesar567GREEN.
Somente área10Androidstandalone TÉCNICOINTERNO aceita; outras12pendentes. Esta correção e paridadeJSON não aceitam integralmenteárea9/11 ounativeUI/taps/teclado/loginválido/SecureStore/físico/piloto/VisualTruth. Externos215/219/220/224/228OPEN;565aa0/558879/560e47DRAFTFAIL separados. Semprodução/serviços/custos/credenciais/contratos/provider/PSP/dinheiroreal. #566fechada porgithub-actions[bot]comSHA3e/evento11:05:53Z/comment6214133831, semissuewritesmanuais/commitatividade. Manterrotinaúnicaenabled/scheduleinalterados; parcialnãoencerra13áreas. Datas deoutrosleitores ainda precisam auditoriafactual, não declarar todoscorrigidos.


