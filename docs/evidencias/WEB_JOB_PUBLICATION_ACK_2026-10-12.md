# Web job publication ACK — evidência

## 2026-10-12 — publicação Web exige recibo compatível e preserva formulário incerto
Main revalidadab16fd677bd0b853b97f81e8a660ec0318366dcb4/tree2f14715d56751cea93a7cad035a8717606cec750, PR487 jámerged, não repetir. PróprioCI38199412553/job114649245800 SUCCESS13/731/383/3+10=1140 nohead549e2642b8b2985cb7e3132596f7bc2ae7216537. PróprioProjectWatchpreview38199412549/job114649245878 SUCCESS/03:21:16.7193522Z main41d...7min/1PR/1run, no_issue_writes=true. PósCI38199681077/job114650083177 SUCCESS13/731/383/3+10 noREALmergeSHAb16fd677bd0b853b97f81e8a660ec0318366dcb4. Pósmonitor38199681085/job114650083321 SUCCESS/03:25:29.7820591Z observouessaMAIN/age0/0PR/1run,eventpush, etapas/log/summary real. Orderedparents[41d5165194a70a4a5bfdb0d3d4b90431fc533c9b,549e2642b8b2985cb7e3132596f7bc2ae7216537], tree2f14715d56751cea93a7cad035a8717606cec750=candidata/main comprovada; revisão9paths/bytes e447blobsnonDocs fora2monitorpaths iguais; APKN/AinputsNativeiguais. Cron ainda0naúltimaconsulta, não dizercron passou; alertas reais ainda nenhum. Recibo completo487 no PRbody e abaixo, sem commit autorreferente.
Nova falha reproduzida em createJob real: mutate genérico aceitavaqualquerJSON2xx, limpavaformulário/refrescava como se criação fosse confirmada com{id:'fake'} ouUUID/title incompatível. Baseline handler+novosoráculos: RED16PASS1FAIL17; GREEN17/17 após. Todos13tests/asserts anteriores preservados; fixture positiva do createJob agora ACK conformeAPI (UUID,campos,open,gig), demaisforms iguais. 3tests novos validam helper,1test handler real; fixtures explicam hooks/fetch/FormData/eventcurrentTarget e usam web-contract real. NÃO renderbrowser/ReactDOM/produção.
Contrato verificado no código REAL apps/api/src/company-job-create.controller.ts: title.trim, requiredRole.trim||title, location/workCity.trim||null, payCents??0, engagementModality??gig, timestampsabsolutos/statusopen eUUIDgerado. Não imporcidadeobrigatória como noformmobile: Web/APIaceitamnullable. Helper novo apps/web/app/job-publication.ts validaACKcomUUID eTODOScamposcontratuais do pedido, não muda payload nem normaliza IDs enviados. Retorna created/rejected4xx/unknown5xx/network/JSON/malformed2xx; nãoautorreenviaPOST. ErrosHTTPexplicitose500preservamfeedbackanterior; ACKincerto mostra publicação não confirmada/dadosmantidos/conferirvagasantesdenovoenvio. Não declarar quePOSTnãofoienviado nemqueUUIDregex comprovaexistênciaporSQL; cadeiaAPI+camposéautoridade.
SomentecreateJob muda;3outrosformhandlers e4effects de485/486 preservados. Novo botãoWeb secundário Atualizar dados incrementa somente revision, efetuandoleituras jáexistentes; disabledloading, semPOST automático/retrydemutação/novospapéis. Permiteconferênciaexplícita apósrespostaincerta. Mobile/desenhocanônicoRN inteiroinalterado; Webalteração visual restrita aessecontrole, semclaimderender/aceitevisualintegral.
Source/types/tests/fixture/evidência e5docsORIGINAISv1.104/memória/checkpoint/ledger/registry íntegrosnomesmociclo. ExigirCIpróprioNOVOhead esperado17web/731mobile/383API/3CLI+10monitor=1144, typecheck/build/Next/export/migrations/privacy/HTTPPostgres/todossteps e pósCIrealSHA. APK N/A SÓhash/modesNativeigual eworkflowbuild/smoke/lock/RN iguais, não []comoPASS. Branchfix/web-job-publication-ack: revisar diff/bytes/tree/modes/fullhistory, main/head/mergeable eexpectedhead; mergeapenasgatesgreen, orderedparents/tree/main/postCI; não emprestar487para488.
Próximo apósgate: sessão/contexto de mutations Webapósawait e prazo/recuperaçãodasleituras, ACKs deequipes/safety/substituição conformecontratosreais, concorrência criação deRR vs cancel/lifecycle. Apenasfalhasreproduzidas; preferências/helpsemvínculo/ML/integrations precisamcontrato/dados. Nãofechar13áreasporunitcount/0PR/issues, não repetirACK/proteção/formleitura jácorrigidos. React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone semMetro preservados; físico/E2E/VisualTruth/SecureStore/piloto,pentest/providers/PSPKYCsandbox/FIN-RISK/WebRailwaypago OPEN separados. Semgastos/provisão/serviços/PSP/dinheiroreal/produção/segredos/deploypago; manterrotinaativa/nãoCONTINUAR/não24h/fimrodada/parcial/transitório nãofecha.

### Recibo primário487
```json
{
  "merge": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
  "parents": [
    "41d5165194a70a4a5bfdb0d3d4b90431fc533c9b",
    "549e2642b8b2985cb7e3132596f7bc2ae7216537"
  ],
  "tree": "2f14715d56751cea93a7cad035a8717606cec750",
  "head": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
  "ci": {
    "run": 38199412553,
    "sha": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "job": 114649245800,
    "attempt": 1,
    "counts": [
      13,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "preview": {
    "run": 38199412549,
    "job": 114649245878,
    "sha": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "event": "pull_request",
    "success": true,
    "markers": [
      "2026-10-12T03:21:16.7193522Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"41d5165194a70a4a5bfdb0d3d4b90431fc533c9b\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":7,\"openPrs\":1,\"activeRuns\":1,\"event\":\"pull_request\"}",
      "2026-10-12T03:21:16.7195998Z ACTIVITY_WATCH_PREVIEW no_issue_writes=true"
    ]
  },
  "review": {
    "base": "41d5165194a70a4a5bfdb0d3d4b90431fc533c9b",
    "head": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "tree": "2f14715d56751cea93a7cad035a8717606cec750",
    "paths": [
      ".github/workflows/project-activity-watch.yml",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/AUTONOMOUS_CYCLE_RECEIPTS_479_486_2026-10-12.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/operacao/PAINEL_ATIVIDADE_GITHUB.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
      "scripts/tests/project-activity-watch.test.mjs"
    ],
    "bytesVerified": 9,
    "history": true,
    "unchangedNonDocs": 447,
    "apk": "N/A native inputs unchanged"
  },
  "postCI": {
    "run": 38199681077,
    "sha": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "job": 114650083177,
    "attempt": 1,
    "counts": [
      13,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "postMonitor": {
    "run": 38199681085,
    "job": 114650083321,
    "sha": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "event": "push",
    "markers": [
      "2026-10-12T03:25:29.7820591Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"b16fd677bd0b853b97f81e8a660ec0318366dcb4\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
    ],
    "success": true
  }
}
```
