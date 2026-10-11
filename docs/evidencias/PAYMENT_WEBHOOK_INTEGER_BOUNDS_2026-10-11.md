# Evidência de contrato inteiro do callback assinado

## Ciclo 2026-10-11 — merges verificados e limite inteiro do callback assinado
Base factual main `933e584c49c45aff80f9268e80f2b094296f67b4`, tree `487b9e7ef8dab59fdade639578f0c523a9ac5b7a`. Releitura README→DVT ORIGINAL v1.104/memória/checkpoint no SHA, PRs, código, CI, artefatos e logs primários. Os registros anteriores são snapshots históricos, preservados integralmente; estados atuais abaixo substituem suas pendências, não suas evidências.

### Entrega e proveniência
#473→#468→#469→#471→#472→#474 integrados uma única vez por merge. Ordered parents=[main anterior,head aprovado], árvore resultante igual à árvore candidata e avanço de main comprovados pela API em cada integração. #473 e #468 já estavam merged ao reconsultar, portanto não se repetiu a operação. #470 não foi integrado: implementação inicial udev foi substituída pelo #473 independente e corrigido; fechamento administrativo como superseded não equivale a merge.
Cada head tem CI próprio completo success. #473/#468/#469/#472 têm APK próprio success, instalação e DEVICE_SMOKE_OK metro_required=false, artefato do SHA não expirado. #471/#474: APK N/A por escopo comprovado, sem mudança em mobile, lock/workspace, workflows/build/smoke relativamente aos predecessores; ausência de run não se chama PASS. Os APKs pós-merge dos predecessores ainda em execução no momento deste registro devem ser acompanhados até prova, nunca substituídos por artefato de outro SHA.
KVM validado no runner efêmero: dispositivo existente /dev/kvm, modo0666, acesso leitura/escrita e KVM_READY, disable-linux-hw-accel=false, comando real sem -accel off. Não é teste físico. A primeira tentativa #473 com udev falhou antes de instalar; não se afirmou qual subcomando falhou. Novo código aplica diretamente o mesmo acesso pretendido ao dispositivo existente e todos os gates continuam obrigatórios. Cabe acompanhar pós-merge e registrar falha/log real se ocorrer.

Recibos consultados nesta rodada (IDs são links https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/ID; running≠PASS):
```json
[
  {
    "pr": 473,
    "merge": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
    "head": "c33b2823950c990ceda9815dffe9c42b74b8366a",
    "tree": "37de203b255238a1e5530614bb2841aaed501b91",
    "parents": [
      "682f0849b5861af0dc2b571c9024b1062743d8b1",
      "c33b2823950c990ceda9815dffe9c42b74b8366a"
    ],
    "ownCI": {
      "run": 38180539072,
      "sha": "c33b2823950c990ceda9815dffe9c42b74b8366a",
      "job": 114591960350,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        722,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180539085,
      "sha": "c33b2823950c990ceda9815dffe9c42b74b8366a",
      "job": 114591960282,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:40:24.4028169Z Success",
        "2026-10-11T22:40:36.7452696Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717966676,
        "size_in_bytes": 28911004,
        "digest": "sha256:6a06214ba25977ec50f19e3be1ef368aa1ad3cf5e830ff79126f4fe2e26bb69d",
        "expires_at": "2026-10-25T22:40:38Z",
        "expired": false,
        "head_sha": "c33b2823950c990ceda9815dffe9c42b74b8366a"
      }
    },
    "postCI": {
      "run": 38181442437,
      "sha": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "job": 114594673900,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        722,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181442348,
      "sha": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 468,
    "merge": "567221ee2db677c21580fa72874688cee20564ca",
    "head": "2242ee79e4102c2ed22eaed072bae805060dbd07",
    "tree": "dffef23c56d53f5645c6f400e1cca09b5ea94cb0",
    "parents": [
      "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "2242ee79e4102c2ed22eaed072bae805060dbd07"
    ],
    "ownCI": {
      "run": 38180624911,
      "sha": "2242ee79e4102c2ed22eaed072bae805060dbd07",
      "job": 114592228754,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        725,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180624934,
      "sha": "2242ee79e4102c2ed22eaed072bae805060dbd07",
      "job": 114592229034,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:40:03.4057533Z Success",
        "2026-10-11T22:40:15.8355741Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11718450944,
        "size_in_bytes": 28911028,
        "digest": "sha256:01ad04507c3f3077186167d9cde1e646ce8a264301ea9e74c5e7f412767958a8",
        "expires_at": "2026-10-25T22:40:17Z",
        "expired": false,
        "head_sha": "2242ee79e4102c2ed22eaed072bae805060dbd07"
      }
    },
    "postCI": {
      "run": 38181629368,
      "sha": "567221ee2db677c21580fa72874688cee20564ca",
      "job": 114595240551,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        725,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181629374,
      "sha": "567221ee2db677c21580fa72874688cee20564ca",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 469,
    "merge": "38b253f603f19938c22001c502963ab08287a08f",
    "head": "5a418f3e938f416d71642a6a9b884ec8167ce809",
    "tree": "c2e1aa7d7452ae01087ddc45c3f59d640f14d624",
    "parents": [
      "567221ee2db677c21580fa72874688cee20564ca",
      "5a418f3e938f416d71642a6a9b884ec8167ce809"
    ],
    "ownCI": {
      "run": 38180627279,
      "sha": "5a418f3e938f416d71642a6a9b884ec8167ce809",
      "job": 114592236030,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180627318,
      "sha": "5a418f3e938f416d71642a6a9b884ec8167ce809",
      "job": 114592236477,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:39:38.6580712Z Success",
        "2026-10-11T22:39:51.2457223Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717647226,
        "size_in_bytes": 28911058,
        "digest": "sha256:45d21dc20f89435031fbbf508f109ab0221ac935bc8b7ff7c0cf0384f272eff3",
        "expires_at": "2026-10-25T22:39:52Z",
        "expired": false,
        "head_sha": "5a418f3e938f416d71642a6a9b884ec8167ce809"
      }
    },
    "postCI": {
      "run": 38181961285,
      "sha": "38b253f603f19938c22001c502963ab08287a08f",
      "job": 114596235120,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181961351,
      "sha": "38b253f603f19938c22001c502963ab08287a08f",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 471,
    "merge": "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
    "head": "a031a835161dba89389552d9b4885704db996a09",
    "tree": "4d7df3d2ab4a98d056f9597593b626b31a404200",
    "parents": [
      "38b253f603f19938c22001c502963ab08287a08f",
      "a031a835161dba89389552d9b4885704db996a09"
    ],
    "ownCI": {
      "run": 38180630973,
      "sha": "a031a835161dba89389552d9b4885704db996a09",
      "job": 114592248277,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        374,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": "N/A: mobile, dependency files, workflow and smoke unchanged relative to predecessor",
    "postCI": {
      "run": 38182001026,
      "sha": "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": "N/A: mobile, dependency files, workflow and smoke unchanged relative to predecessor"
  },
  {
    "pr": 472,
    "merge": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
    "head": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
    "tree": "8375bdb0fe165e5c43af49fc758b851f251818b1",
    "parents": [
      "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
      "90a7498f4de4e0473216d4fe06be54fafe54e1a5"
    ],
    "ownCI": {
      "run": 38180634772,
      "sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
      "job": 114592260912,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        729,
        374,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180634538,
      "sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
      "job": 114592260054,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:41:48.7539333Z Success",
        "2026-10-11T22:42:01.3051492Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717826308,
        "size_in_bytes": 28910954,
        "digest": "sha256:8adde9570883e6b1e6fa122deab6fa1f19fb03c599e924657f9a1d28366cb2ee",
        "expires_at": "2026-10-25T22:42:02Z",
        "expired": false,
        "head_sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5"
      }
    },
    "postCI": {
      "run": 38182026864,
      "sha": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": {
      "run": 38182026860,
      "sha": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 474,
    "merge": "933e584c49c45aff80f9268e80f2b094296f67b4",
    "head": "12e94426901461448f8c18b586011631c8048489",
    "tree": "487b9e7ef8dab59fdade639578f0c523a9ac5b7a",
    "parents": [
      "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "12e94426901461448f8c18b586011631c8048489"
    ],
    "ownCI": {
      "run": 38180637940,
      "sha": "12e94426901461448f8c18b586011631c8048489",
      "job": 114592270958,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        729,
        376,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": "N/A: mobile, dependency files, workflow and smoke unchanged",
    "postCI": {
      "run": 38182059488,
      "sha": "933e584c49c45aff80f9268e80f2b094296f67b4",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": "N/A: mobile, dependency files, workflow and smoke unchanged"
  }
]
```

### Próxima falha concreta corrigida nesta branch: amount_cents INTEGER
Migração existente `packages/db/migrations/0017_payment_events.sql`: amount_cents integer NOT NULL CHECK(amount_cents>=0). Adapter assinado verificava Number.isInteger e>=0, aceitando 2147483648 e números inseguros como1e100 antes de SQL (overflow do integer). Ajuste mínimo: Number.isSafeInteger, intervalo inclusivo0..2147483647, sem arredondar/clamp, sem nova política comercial, sem alteração de schema.
Dois testes comportamentais adicionais executam adapter/controller reais: invalididades assinadas rejeitam payment_event_invalid e nenhum tenant/query; zero e máximo preservam o ACK factual e valor exato; assinatura inválida mantém precedência. HTTP/Postgres real da CI verifica400 sem eventos para entradas inválidas, 201+id/amount iguais à linha real em zero/máximo e replay idempotente, além dos testes prévios de JSONnull e das duas barreiras concorrentes.
Sem resultado local inventado: execução de comandos locais ficou indisponível nesta parte da rodada; CI primário/Nest/HTTP/Postgres no próprio SHA ainda precisa passar (esperado4/729/378/3=1114). Não há alegação RED/GREEN local desta tarefa. Branch/PR deve permanecer draft até aprovação dos gates aplicáveis, revisão diff/bytes/árvore e revalidação main/head. APK N/A somente após confirmar que os paths mobile/dependências/workflow/smoke são idênticos à base. ID UUID de entrada no controller foi identificado para auditoria seguinte, mas não alterado nem dado como testado neste patch.

### Continuidade e limites
Após integrar esta correção, confirmar ordered parents/tree/main e CI pós-merge real. Consolidar recibos finais dos APKs pós-merge #473/#468/#469/#472, sem loop de commits autorreferentes (últimos gates do commit documental podem ficar no recibo do PR/checkpoint de retomada). #464–#467 já têm provas pósCI/APK verificadas, preservadas nos históricos; não repetir merges/reruns. Examinar funcionalidades reais por área do plano mestre/requisitos/código/testes, não concluir pelo número de PRs/issues.
Todas as áreas internas seguem no escopo: telas/navegação, login/cadastro/sessão, vagas/profissionais/agenda, empresas/equipes/candidaturas/matching, simulados financeiros/notificações, backend/APIs, tenant/RLS/Postgres/segurança, emulador APK e documentação. Empresa já renderiza CompanyNav e início profissional já consulta APIs reais; não recriar tarefas antigas já corrigidas. Preferências/ajuda sem vínculo/previsões de no-show exigem contrato/dados e não autorizam política inventada; verificar alternativas independentes.
Android FÍSICO/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST providers e PSP/KYC sandbox/FIN-RISK permanecem OPEN e separados. #224 Web depende serviço Railway eventualmente pago, sem provisionar. React19.1.4/RN0.81.6, frozen lockfile, isolamento/RLS, desenho canônico e standalone semMetro preservados. Sem PSP real, dinheiro real, serviços novos, custos, segredos, produção/Railway/deploy pago. ZIP digest é ZIP, não APK individual; não atribuir BUILD_INFO sintético ao head literal. Rotina continua ativa, sem exigir CONTINUAR, sem afirmar execução24h ou conclusão integral.
