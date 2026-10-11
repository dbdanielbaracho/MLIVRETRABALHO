# Avaliações: entradas, autoridade e evidência

## Avaliações: validação de corpo e rota — 2026-10-11 10:59 UTC

Main real: 510b1e5efd192d23ffce7e4b0ec6b9438681ae79, PR #439 integrado depois de CI38133627064/job114452879922 PASS4web/713mobile/177API/3CLI com novo HTTP de talentos e todas jornadas, professional week10:56:48.3335271Z/Production Truth10:56:53.4433913Z. Head aprovado01a37be1de8554f18fb765f698aea390cff3b092; merge parents[27e96142ecde5efa10adb05ef436bb5a3f123865,01a37be1de8554f18fb765f698aea390cff3b092], tree6f21cd2aadff94ba0da0c11fed370cf9d514f7ef igual ao head; main confirmada. Native próprio439 N/A por paths API/CI/test/docs e mobile subtree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica a438 aprovado; não atribuir ZIP438 ao SHA439. Pós-CI43938133818442 EM EXECUÇÃO. Pós-APK43838133235730 e retry42738117706908 attempt2 também em execução na consulta10:58:13Z; NÃO PASS até log/artefato exatos. Documento ORIGINALv1.104/histórico continuam em lugar.

Falha reproduzida em RatingsController nas duas direções: null dispara TypeError em body.score; comment número/objeto/array dispara trim TypeError depois de abrir tenant; rota id inválida alcança cast UUID no SELECT. Body unknown com record e score inteiro1–5 existente agora rejeita entrada malformada400; após canRate existente valida comentário texto/null e UUID canônica sem impor versão antes de DB. Ordem identity/membership→score→role preservada (inclusive score inválido400 antes de role inválida); comentário/UUID não ultrapassam permissão válida. Strings válidas trim, ausência/null/branco→null, tenant/identity/professional reais e ACKs/upserts iguais. As QUATRO queries SQL comparadas byteidênticas; completed assignment e p.identity_id=$4 continuam obrigatórios, erro DB não é reclassificado como400. Sem mudança na política de reputação, RLS, esquema ou dinheiro.

9 regressões novas: ANTES3FAIL/6PASS; DEPOIS9PASS. Matriz ampliada local12PASS/0FAIL incluindo3rating-policy existentes. Transformação TypeScript com stubs explícitos Nest/auth/DB, não é prova de typecheck/PostgreSQL local. Testes cobrem entradas sem escrita, auth/roles/prioridade anterior, trim/null/campoextra nãoautoridade, assignment concluído real requerido, ambas tabelas e falha DB incerta. HTTP já existente http-ratings-reputation-e2e.sh ampliado sem substituir positivos: 19corpos inválidos por direção (38requests)400, rotas inválidas400, ausênciaauth e nomembership401; GET assignments real continua companyRatingScore3 e passaporte averageRating5/count1 depois de cada tentativa, sem sobrescrever avaliações. Jornada original de avaliação bidirecional/updateidempotente/reputação permanece; guard aceita só localhost explícito antes de rede, bash-n PASS e endereço externo recusado. CI próprio espera4/713/186/3 e marcador "PASS: rating malformed input rejects 400 without replacing bidirectional real scores"; PENDENTE antes de publicar.

Fatia somente controller/test/API HTTP/docs, mobile/subtree/pacotes/lock/scriptsbuild/smoke/workflowstandalone sem mudança. APK próprio N/A CONDICIONAL aos paths/árvore iguais à main439 e próprio nativo438 aprovado; seu gate pós-merge separado continua aberto. Atualizados Documento ORIGINALv1.104, memória/checkpoint/ledger/registro/evidência no mesmo commit, nenhum substituto resumido.

Próxima ação: publicar fix/rating-input-runtime-validation sobre main439; revisar bytes/diff/tree e CI186API do head exato, integrar só gates aplicáveis aprovados com lease/pais/tree/main e verificar pós-CI. Acompanhar gates pós438/retry427 e pós439, registrar recibo completo. Próxima auditoria segura a revalidar é entrada JSON em ConversationsController e auth signup/signin, sem alterar antiabuso/credenciais/roles/RLS nem enfraquecer contrato. Equipes.changeMember exige cuidado com resultado desconhecido/ordem ADD→DELETE; idempotência por verbo não prova cancelamento ou ordenação, nenhuma liberação insegura implementada. Criações/aceite durável, SecureStore/físico/Visual Truth/E2E/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers e Web/Railway eventualmente pago seguem OPEN. Sem contratação, PSP, dinheiro real, custo novo ou deploy pago; bloqueio parcial não encerra projeto.


```json
{
  "pre439": {
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
  "merge439": {
    "sha": "510b1e5efd192d23ffce7e4b0ec6b9438681ae79",
    "tree": "6f21cd2aadff94ba0da0c11fed370cf9d514f7ef",
    "parents": [
      "27e96142ecde5efa10adb05ef436bb5a3f123865",
      "01a37be1de8554f18fb765f698aea390cff3b092"
    ]
  },
  "post439Runs": [
    {
      "id": 38133818442,
      "head": "510b1e5efd192d23ffce7e4b0ec6b9438681ae79",
      "name": "CI",
      "status": "in_progress"
    }
  ],
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
  "post427": {
    "run": 38117706908,
    "head": "9678fb99a37b3f4bf699347ca439936ecc4dc25f",
    "pending": true,
    "status": "in_progress"
  },
  "local": {
    "before": {
      "tests": 9,
      "pass": 6,
      "fail": 3
    },
    "after": {
      "tests": 12,
      "pass": 12,
      "fail": 0
    },
    "sqlQueriesIdentical": 4
  }
}
```
