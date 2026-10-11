# Prazo do envio da conversa com ACK separado da atualização

## Prazo do envio da conversa com ACK separado da atualização (2026-10-11 05:43:41 UTC)

O send real de Conversa continuava Enviando quando auth/fetch/JSON/final-auth ou o GET posterior ao envio não resolviam. Quatorze testes novos usam handlers send/load pré-JSX, routeId/loadMessages/sendMessage/runForSession reais e fixtures explícitas: antes9falhas/5sucessos; depois14/14 e bateria47/47 com read-deadline/conversation/session-context no Node24. Não há renderRN, servidor/chat real ou prova Android físico.

Callback15s agora invalida snapshot + sequence de leitura associada, publica erro e libera busy/pending sem afirmar que um POST desconhecido foi enviado. A mensagem digitada fica preservada até ACK real sent. O resultado de escrita é separado da atualização: após sent validado no contexto original, o texto já foi limpo legitimamente; se o GET posterior excede o prazo, a UI informa "Mensagem enviada" com falha de atualização, sem reclassificar o ACK confirmado como desconhecido e sem reenviar. Rejeição confirmada também preserva seu resultado quando a atualização falha.

Uma ref própria impede respostas/timers/finally antigos de desbloquear ou limpar outra tentativa. Após o prazo, load pendente não pode repor snapshot antigo; o usuário precisa atualizar para inspecionar mensagens. GET/retry de leitura nunca despacham POST. Nova tentativa de envio é somente explícita, conservando o contrato existente de conferir mensagens antes de reenviar quando houver dúvida; isto não acrescenta idempotência/deduplicação durável do chat nem prova cancelamento remoto. Troca de identidade/assignment/tenant/foco mantém o isolamento e política original de limpar texto na saída/troca de proprietário.

Casos separados: quatro fases do envio pendentes; quatro fases da atualização pós-ACK pendentes; inspeção manual sem POST e envio explícito posterior com finally/timer antigo; novo proprietário/rota; unknown finito; rejeição, vazio e identidade diferente antes do despacho. Headers/payload/path da conversa explícita são conferidos. Callbacks load/foco, requestWith/operation, JSX/StyleSheets e rotas são byte-identical; helpers/backend/migrações/fila/lockfile não mudam.

Estado confirmado: mainb00be864d6ed6c7383f9f5267df054dad6907535, #420–424 integrados em ordem com própriosCI/APK/pais/tree/main comprovados. Pós420CI+APK integral aprovado no SHA real (ver PUBLICATION_UNCERTAIN_DEADLINE_2026-10-11.md); pós421–424CI aprovado e respectivosAPKs em execução na última consulta. OwnAPKs426–429 agora todos aprovados com install/launch/artefato ZIP exato/não expirado, mas integração aguarda425. #425APK run38113622026 tentativa2 ainda em execução após Brokenpipe do emulador antes da instalação na tentativa1; não repetir rerun pendente. #431 ownCI666mobile aprovado, #432 ownCI38115345625/job1143990289924/675/145/3 aprovado/HTTP05:38:58.0866354Z; #433CI685mobile e APK em acompanhamento, sem afirmar PASS antes de prova. APKs430–433 pendentes.

Próxima ação: publicar fix/conversation-send-ui-deadline sobre #433/head43a25e2dcb7832b41bca77721b6c02084ef66808 basefix/publication-uncertain-deadline; revisar bytes/diff e CI esperado4web/699mobile/145API/3CLI+APK próprio no SHA exato. Acompanhar rerun425 e pós421–424; integrar425→426→427→428→429→430→431→432→433→esta fatia em ordem somente após retarget/revisão/gates aplicáveis e verificar SHA/pais/tree/main/pós-gates. Não repetir419–424. Persistir novas provas efetivas e próximos passos em ORIGINALv1.104/memória/checkpoint/requisitos/evidências, preservando todo histórico.

Itens concretos remanescentes independentes: createInvite/acceptInvite/revoke de Membros, create/changeMember de Equipes, ações de Talentos/Agenda/painel/candidatos/substituições/casos/privacidade ainda precisam auditoria de prazo de escrita com resultado incerto/ACK específico e protocolos de isolamento. Não aplicar desbloqueio genérico de GET. Recuperação durável e idempotência de publicação desconhecida permanecem abertas: nenhum bypass/dedupe por conteúdo foi autorizado ou implementado nesta fatia. EquipesGET e demais leituras já corrigidas na main não devem gerar commits repetidos.

React19.1.4/RN0.81.6/tenant/RLS/canônico/lockfile preservados. Android físico/E2E/VisualTruth/SecureStore/OScrash/teclado/payload/restart/piloto, pentest, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago seguem separados/abertos. Emulador não físico; ZIPdigest não APK individual. Sem dinheiro real, novas cobranças/serviços/infraestrutura ou deploy pago. Bloqueio parcial ou fim de rodada não encerra projeto.

```json
{
  "post420": {
    "pr": 420,
    "sha": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
    "tree": "f7c9a8ae4947125d38ca87c892412a15fa271f84",
    "parents": [
      "83d5df28f11395522aa5e8e776a38bab491e0a91",
      "56e8229ada3bdb44042b9d208357f10ef91cdad8"
    ],
    "ci": {
      "head": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
      "run": 38114053725,
      "job": 114395297104,
      "attempt": 1,
      "counts": [
        4,
        497,
        145,
        3
      ],
      "allSteps": "success",
      "http": [
        "2026-10-11T05:14:55.8805366Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
      ]
    },
    "apk": {
      "head": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
      "run": 38114053744,
      "job": 114395297192,
      "attempt": 1,
      "steps": "success; diagnostics skipped",
      "markers": [
        "2026-10-11T05:35:10.7875902Z Success",
        "2026-10-11T05:36:04.3498698Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11692968057,
        "name": "MLivreTrabalho-standalone-apk",
        "size_in_bytes": 28908644,
        "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692968057",
        "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692968057/zip",
        "expired": false,
        "created_at": "2026-10-11T05:36:17Z",
        "expires_at": "2026-10-25T05:36:15Z",
        "updated_at": "2026-10-11T05:36:17Z",
        "digest": "sha256:4fba811cdbaed67401f613028daecddbe77c7989c2fca3f1809da343133af0dc",
        "workflow_run": {
          "id": 38114053744,
          "repository_id": 1378638985,
          "head_repository_id": 1378638985,
          "head_branch": "main",
          "head_sha": "64c5f2a09969e76d7077858af4a0623f2b43ce38"
        }
      }
    },
    "pending": false
  },
  "ci432": {
    "head": "b7555982898bd95bc3fd18688def28f12f0e6f61",
    "run": 38115345625,
    "job": 114399028992,
    "attempt": 1,
    "counts": [
      4,
      675,
      145,
      3
    ],
    "allSteps": "success",
    "http": [
      "2026-10-11T05:38:58.0866354Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  "apk426": {
    "head": "c9bb5c147b8181c4ee39eb490139625c08df5678",
    "run": 38113777319,
    "job": 114394499181,
    "attempt": 1,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T05:29:37.2303131Z Success",
      "2026-10-11T05:30:23.2289700Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11692843298,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28909231,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692843298",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692843298/zip",
      "expired": false,
      "created_at": "2026-10-11T05:30:46Z",
      "expires_at": "2026-10-25T05:30:43Z",
      "updated_at": "2026-10-11T05:30:46Z",
      "digest": "sha256:b0e668abec2725bab82c3b2c1dbfa27ad8eb598525d22550b3fbfa2d89343e6a",
      "workflow_run": {
        "id": 38113777319,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/availability-save-deadline",
        "head_sha": "c9bb5c147b8181c4ee39eb490139625c08df5678"
      }
    }
  },
  "apk427": {
    "head": "0832b9f5df98fba06a3c89918e5eb045bc7ba25d",
    "run": 38113969118,
    "job": 114395050465,
    "attempt": 1,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T05:28:42.7017576Z Success",
      "2026-10-11T05:29:20.8364527Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11693266927,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28909272,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693266927",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693266927/zip",
      "expired": false,
      "created_at": "2026-10-11T05:29:39Z",
      "expires_at": "2026-10-25T05:29:36Z",
      "updated_at": "2026-10-11T05:29:39Z",
      "digest": "sha256:f82ceb9e8f6f05d3df460268669f3f43789596abb73e81516c20a46a772803e1",
      "workflow_run": {
        "id": 38113969118,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/startup-session-read-deadline",
        "head_sha": "0832b9f5df98fba06a3c89918e5eb045bc7ba25d"
      }
    }
  },
  "apk428": {
    "head": "0deb62791921eaf326be91562a2adb4f602d89bf",
    "run": 38114121800,
    "job": 114395500254,
    "attempt": 1,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T05:33:50.7167998Z Success",
      "2026-10-11T05:34:32.0233944Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11693407076,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28909411,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693407076",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693407076/zip",
      "expired": false,
      "created_at": "2026-10-11T05:34:50Z",
      "expires_at": "2026-10-25T05:34:47Z",
      "updated_at": "2026-10-11T05:34:50Z",
      "digest": "sha256:20f3f01e5f085f6f56e571723e1b23af364712bd09af5f6adad870067d053e4c",
      "workflow_run": {
        "id": 38114121800,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/signup-uncertain-deadline",
        "head_sha": "0deb62791921eaf326be91562a2adb4f602d89bf"
      }
    }
  },
  "apk429": {
    "head": "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c",
    "run": 38114334761,
    "job": 114396112529,
    "attempt": 1,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T05:35:47.8898057Z Success",
      "2026-10-11T05:36:30.6409904Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11693472034,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28909656,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693472034",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693472034/zip",
      "expired": false,
      "created_at": "2026-10-11T05:36:48Z",
      "expires_at": "2026-10-25T05:36:45Z",
      "updated_at": "2026-10-11T05:36:48Z",
      "digest": "sha256:af26156c11cbf7acdfffb954eb84c4235a8bcf4671e9165fa9bf7fb44d73e36d",
      "workflow_run": {
        "id": 38114334761,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/signin-session-deadline",
        "head_sha": "b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c"
      }
    }
  },
  "failure425": {
    "head": "8989feeb8206a36a03a268021ba204fa04b2b2c7",
    "run": 38113622026,
    "attempt": 1,
    "job": 114394056827,
    "reason": "Emulator action input keyevent 82 Broken pipe exit224 before app installation/script; build passed; no DEVICE_SMOKE_OK or validated APK",
    "diagnostics": 11693525710,
    "time": "2026-10-11T05:24:03.5502534Z"
  }
}
```
