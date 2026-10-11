# Conversas: entrada, tenant, autoridade e recibos

## Conversas: entrada de mensagem e IDs — 2026-10-11 11:04 UTC

Main revalidada: 5389cb9d27e081892064b5b62740223373b67fd7, PR #440 integrado após CI38133917114/job114453747810 PASS4web/713mobile/186API/3CLI, marcador ratings inválidos e HTTP professional week11:02:00.7851298Z/Production Truth11:02:09.0017461Z. Head0ffd1b196c1faaf41367aa9370d2dd385f3cb77a, pais[510b1e5efd192d23ffce7e4b0ec6b9438681ae79,0ffd1b196c1faaf41367aa9370d2dd385f3cb77a], treeef0fb74e1a61ad7248d3b98b0a47772520b5e765 idêntica ao head, main confirmada. CI pós43938133818442/job114453443368 agora PASS4/713/177/3 com HTTP11:00:02.9200899Z/Production Truth11:00:08.1807470Z. CI pós440 consultado no merge SHA, pendente antes desta publicação. Native próprio440 N/A por paths e árvore mobile idêntica a439/#438. Pós-APK43838133235730 e retry42738117706908 attempt2 ainda em execução na última consulta; não converter pending em PASS.

Falhas reais em ConversationsController: body nulo ou campo body não texto causa TypeError em trim; UUID de assignment inválida alcança SQL de GET/POST. Body unknown agora exige objeto e string não vazia após trim, reutiliza message_required400; GET e POST verificam UUID canônica sem versão após ctx/auth/membership e antes de abrir tenant. Queries SQL (9 ocorrências) comparadas byteidênticas, acesso por assignment real/tenant/professionalidentity/roles, geração de conversa, mensagem e notificações de destinatários reais permanecem. Não adiciona ACK/idempotência/reenvio fictício nem cancela servidor. Mensagem segue não idempotente; deadline/unknown do mobile#434 não foi relaxado. Erro DB continua incerto; nenhuma operação em dados reais de usuário foi executada.

9 testes novos: ANTES3FAIL/6PASS, DEPOIS9PASS/0FAIL, TS transformado com stubs explícitos Nest/auth/DB localmente (sem equivalência a Nest/typecheck/PostgreSQL/Android). Cobre corpo/campo nulo/tipo errado, branco, UUIDs GET/POST, auth401 anterior, assignment404 e ACL403 sem INSERT, tenant/sender ignoram authority extra, criação válida e notification destinatário real exclui sender, erro DB não vira sucesso. HTTP journey existente ampliada com fixtures descartáveis localhost: 14JSONs inválidos por ator (28POSTs), ID inválidoGET/POST400 e auth/membership401; GET mensagens permanece[] e snapshots de notificações de profissional/empresa permanecem byte-equivalentes em JSON após cada tentativa. Positivos originais empresa/profissional/chat/notificação/cross-tenant/ratings/talentos e trabalho multiempresa preservados. bash-n PASS e domínio externo recusado antes de rede. CI próprio novo deve comprovar4/713/195/3 +novo marcador "PASS: conversation malformed input rejects 400 without messages or notifications", typecheck/build/export/frozenlock/migrações/retenção e todasjornadas/Production Truth. PENDENTE antes da publicação.

Diff só API/controller/test/scriptHTTP/docs; APK próprio N/A CONDICIONAL a paths/árvore mobile4cb705aeb39244f46649bc5c569459ef9b0c5b7d iguais à main440, nativo438 próprio aprovado. Pós438 e retry427 continuam separados até prova, ZIP não é digestAPK individual nem emulador físico. Originalv1.104 atualizado em lugar/histórico inteiro preservado, memória/checkpoint/ledger/evidence registry/evidência no mesmo commit. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho e standalone sem Metro mantidos.

Próxima ação concreta: publicar fix/conversation-input-runtime-validation sobre main440, revisar bytes/diff/gates CI195API exatos e mobile N/A, integrar com lease/pais/tree/main e verificar pós-CI. Acompanhar pós438/retry427/pós440 e registrar recibo final sem repetir merges. Próxima pendência real a revalidar: entradas null/tipos em AuthController.signup/signin (body apenas tipado chama normalização/trim sem record), mantendo códigos/auth/rate-limit/scrypt/sessões e prioridades de validação; também SupportController.status (nota tipada) sem inventar status ou autoridade. Equipes.changeMember resultado incerto/ordem dos verbos e criações/aceite duráveis/fila de SecureStore continuam contratos separados. FísicoAndroid/E2E/Visual Truth/SecureStore/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago OPEN. Sem dados fictícios de produto, provider, dinheiro real, novas cobranças ou deploy pago; rotina ativa, fim de rodada não encerra projeto.


```json
{
  "pre440": {
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
  "merge440": {
    "sha": "5389cb9d27e081892064b5b62740223373b67fd7",
    "tree": "ef0fb74e1a61ad7248d3b98b0a47772520b5e765",
    "parents": [
      "510b1e5efd192d23ffce7e4b0ec6b9438681ae79",
      "0ffd1b196c1faaf41367aa9370d2dd385f3cb77a"
    ]
  },
  "post439CI": {
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
  "post440Runs": [
    {
      "id": 38134128908,
      "head": "5389cb9d27e081892064b5b62740223373b67fd7",
      "status": "in_progress"
    }
  ],
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
      "tests": 9,
      "pass": 9,
      "fail": 0
    },
    "sqlIdentical": 9
  }
}
```
