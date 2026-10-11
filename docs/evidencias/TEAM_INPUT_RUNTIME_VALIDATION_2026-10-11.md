# Equipes: entradas JSON reais e ausência de escrita inválida


## Equipes: validação de JSON nas mutações — 2026-10-11 06:01:48 UTC

Falha concreta reproduzida na main b00be864d6ed6c7383f9f5267df054dad6907535: TeamsController.create/add recebem Body tipado mas null dispara TypeError em name/professionalId; números/objetos em name alcançam trim e professionalId inválido alcança SQL uuid. Alterados somente esses dois corpos para unknown, objeto record e validação antes de db.tenant. Nome continua texto não vazio trim, sem novo teto comercial; professionalId deve ser string UUID canônica, sem impor versão, refletindo o tipo uuid real de workforce_team_members e os IDs devolvidos pela API. Autenticação/membership/roles precedem validação; nenhuma authority do payload é usada. Queries de requireTeam/work_assignments, isolamento tenant, ON CONFLICT DO NOTHING e ACK existentes preservados. Falhas DB continuam erro servidor/incerteza, não 400 sintético.

6 testes locais novos: ANTES 2 FAIL/4 PASS (TypeError null), DEPOIS 6 PASS/0 FAIL; fonte real TS transformada com stubs explícitos, não prova de typecheck Nest/Fastify/PostgreSQL local. HTTP novo localhost/disposable somente: 12 corpos inválidos na criação e 13 na adição, 400 e GETs inalterados para ambos tenants; 401 identidade ausente ou membership ausente conforme auth.service.ts, nome válido trim, UUID válido sem assignment continua rejeitado. Jornada já existente http-team-allocation-e2e.sh mantém prova positiva de assignment/add/remove/conflito com dados reais. bash -n PASS e URL externa rejeitada antes de HTTP. CI do head precisa comprovar frozen lock/typecheck/build/export + 4/699/159/3 testes + marcador HTTP "PASS: team malformed input rejects 400 without writes" e demais jornadas/Production Truth. Ainda PENDENTE até execução real; nenhum merge autorizado por fixture local.

Mudança de API/CI/testes/docs: APK próprio N/A apenas se paths do diff continuarem fora do standalone workflow e subtree apps/mobile af6a826aa9c1139a2e92a184703509c700a5fbfd for idêntico à main predecessora #435. Integração depende de #435 CI/HTTP exato e de #434 próprio APK aprovado; citar o head nativo #434 explicitamente, nunca atribuir seu ZIP ao head API. Pós-merge nativo #434 permanece separado. Documento ORIGINAL v1.104 atualizado em lugar e todo histórico mantido. Sem alteração React19.1.4/RN0.81.6/lockfile/schema/RLS/JSX, sem celular físico, PSP ou custos. Visual Truth/E2E físico/pentest/PSP/KYC/FIN-RISK/Web pago continuam ABERTOS.

Main e fila reavaliados: #419–#424 pós-merge CI/APK comprovados. #425 attempt3 do APK em acompanhamento; #430 attempt2 também, falhas anteriores do emulador documentadas. #431 e #433 próprios APKs agora PASS, logs integrais instalação+DEVICE_SMOKE_OK sem Metro e ZIP de SHA exato, sem equivalência a teste físico. #432/#434 ainda em execução na última consulta. #435 novo head 5b9f91029a5401b6c54c64862076bcd7e7e981fc CI38116648295 em execução após corrigir TS2345 e expectativa membership401. Próximo: gates #425, integrar #425–#436 em ordem somente próprios gates aplicáveis aprovados, pós-merge exact SHA e atualizar recibo, sem repetir merges nem desativar rotina por pendência parcial. Parâmetros de rota UUID e protocolos duráveis de publicação/mutações pendentes continuam alternativas concretas; não se declara fechamento integral.

Evidência: [validação de equipes](../evidencias/TEAM_INPUT_RUNTIME_VALIDATION_2026-10-11.md).


```json
{
  "red": {
    "tests": 6,
    "pass": 4,
    "fail": 2
  },
  "green": {
    "tests": 6,
    "pass": 6,
    "fail": 0
  },
  "approvedNative431": {
    "head": "b0b001186dd9be8f54d20a82f94b9a6047c5a335",
    "run": 38115110028,
    "job": 114398342945,
    "attempt": 1,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T05:54:30.9850114Z Success",
      "2026-10-11T05:55:16.6059867Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11692949775,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28910203,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692949775",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11692949775/zip",
      "expired": false,
      "created_at": "2026-10-11T05:55:30Z",
      "expires_at": "2026-10-25T05:55:27Z",
      "updated_at": "2026-10-11T05:55:30Z",
      "digest": "sha256:243347e16cb079b04bcd62909a76c89cd9568d6b477c65dca39799cc379dc88c",
      "workflow_run": {
        "id": 38115110028,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/profile-save-screen-deadline",
        "head_sha": "b0b001186dd9be8f54d20a82f94b9a6047c5a335"
      }
    }
  },
  "approvedNative433": {
    "head": "43a25e2dcb7832b41bca77721b6c02084ef66808",
    "run": 38115519750,
    "job": 114399532593,
    "attempt": 1,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T05:55:10.5927503Z Success",
      "2026-10-11T05:55:47.2734640Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11694045097,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28910376,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694045097",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11694045097/zip",
      "expired": false,
      "created_at": "2026-10-11T05:56:04Z",
      "expires_at": "2026-10-25T05:56:02Z",
      "updated_at": "2026-10-11T05:56:04Z",
      "digest": "sha256:b1332fad480aa586147bf8efe83485662e8c6ced066b93319c257efd608bb4fc",
      "workflow_run": {
        "id": 38115519750,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "fix/publication-uncertain-deadline",
        "head_sha": "43a25e2dcb7832b41bca77721b6c02084ef66808"
      }
    }
  },
  "failed425Attempt2": {
    "run": 38113622026,
    "attempt": 2,
    "head": "8989feeb8206a36a03a268021ba204fa04b2b2c7",
    "job": 114397880306,
    "installed": "2026-10-11T05:53:14.8458959Z",
    "failure": "Android system provider media/phone startup ANRs; monkey injected 0 events; no DEVICE_SMOKE_OK",
    "diagnosticArtifact": 11693615584,
    "zipDigest": "sha256:d71754c172da54e0e145704470429ea1dd9ad290c208a636151c46542aaea555"
  },
  "failed430Attempt1": {
    "run": 38114691248,
    "attempt": 1,
    "job": 114397143546,
    "head": "093d457f05cabc19e331510d29edee57819b6e22",
    "failure": "emulator input keyevent 82 Broken pipe (32), exit224 at2026-10-11T05:43:22.5234357Z before installation",
    "artifact": 11693427721,
    "digest": "sha256:38bc487638a2d67da8174c3bdf4476ac38e7f9dd732797477196c49f89b75dbc"
  }
}
```


## Validação das rotas de equipes — 2026-10-11 06:06:16 UTC

A pendência dos parâmetros de rota UUID no mesmo TeamsController foi reproduzida e corrigida nesta fatia: GET membros, POST membro e DELETE membro agora rejeitam IDs não canônicos antes de db.tenant/query/cast uuid, após autenticação/membership/role original. UUID_RE não impõe versão; IDs canônicos emitidos pela API e SQL/RLS existentes preservados. Nenhuma lista/snapshot ou ACK fictício.

Três testes adicionais dos handlers reais: matriz anterior 9 testes, 2 FAIL/7 PASS; matriz final 9 PASS/0 FAIL local (limitações de stubs já registradas). Confirmam rejeição sem abrir tenant/query, prioridade 401/403 e consultas válidas com tenant confiável/DELETE exato; continuam 6 regressões anteriores de Body. HTTP de equipes acrescenta GET/POST/DELETE de rota inválida com 400 e GETs inalterados, sem relaxar jornada válida de alocação existente. bash -n PASS. CI do NOVO head espera 4/699/162/3 e todos HTTP; não reutilizar a aprovação do head anterior f5133a4c061b1d0652654282fe907494e018d640 (CI38116726059 passou 4/699/159/3 e marcador equipe em 2026-10-11T06:04:18.0077457Z).

#435 head5b9f91029a5401b6c54c64862076bcd7e7e981fc CI38116648295/job114402739344 confirmado PASS em todos os passos, 4/699/153/3, marcador job inválido 2026-10-11T06:02:39.4641635Z e cronologia PostgreSQL 06:02:54.5430625Z; ainda não merged. #425 attempt3/#430 attempt2 em execução, sem gate nativo aprovado nessas tentativas. Main permanece #424 b00be864d6ed6c7383f9f5267df054dad6907535. Próxima ação: acompanhar #425/#430/#434; integrar em ordem #425–#436 com gates aplicáveis exatos e confirmar pós-merge. APK desta fatia API permanece N/A condicional a mobile tree idêntica e #434 nativo; gates físicos/Visual Truth/pentest/PSP/Web pago permanecem abertos. Histórico v1.104/memória/checkpoint preservados. Sem custos, provider, dinheiro real ou deploy.
