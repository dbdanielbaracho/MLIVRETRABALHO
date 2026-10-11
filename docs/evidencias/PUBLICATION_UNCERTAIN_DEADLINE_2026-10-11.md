# Publicação incerta sem reenvio não idempotente

## Publicação incerta sem reenvio não idempotente (2026-10-11 05:39:56 UTC)

Empresa.create real foi auditado contra CompanyJobCreateController: POST autentica/membership/tenant e insere um company_jobs novo; não há chave de idempotência no contrato existente. A tela marcava uncertain.current antes do despacho, mas não consultava essa ref na entrada seguinte. Dez cenários novos com handlers/date parser/publication/runForSession reais e fixtures explícitas reproduziram 7 falhas/3 sucessos, inclusive DOIS POSTs após resposta unknown + atualização manual da mesma empresa. Após a correção, 10/10 novos e bateria31/31 com publication-context/helper/session-context passaram localmente no Node24. Não é render RN nem prova física/banco de produção.

O guard agora recusa novo envio quando a publicação anterior permanece incerta. Atualizar a sessão/empresa de mesma autoridade e mudar foco não apagam a incerteza; nenhum retry automático ou POST adicional ocorre. O prazo de 15 segundos publica erro, encerra PUBLICANDO, invalida a autorização exibida e mantém todos os campos. Antes de despacho, não houve envio e é permitida uma nova tentativa após verificação explícita da empresa. Depois de despacho, resultado é incerto: o link existente para Planejamento volta a ficar disponível, mas conferir a lista NÃO prova que um POST pendente foi cancelado e NÃO libera automaticamente reenvio.

Uma ref própria conserva a identidade da tentativa: timer/ACK/finally antigos não limpam o novo formulário, confirmam publicação ou liberam tentativa posterior. O runForSession continua exigindo autorização + tenant exibidos antes/depois; ACK oportuno created ainda exige todos os dados reais do trabalho, e somente então limpa o formulário. Rejeição conhecida permite nova tentativa explícita; troca efetiva de contexto conserva a fronteira de isolamento já existente e apaga o rascunho anterior. Date/shiftWindow, loadContext/foco, JSX/CompanyNav/estilos, payload, endpoint, helpers, backend/migrações/RLS e lockfile são byte-identical/inalterados.

Limitação explícita: esta correção cumpre o bloqueio conservador da tela montada e seus focos; não cria armazenamento durável da tentativa, idempotência no servidor nem recuperação após reinício. Uma publicação despachada e desconhecida na mesma autoridade continua impedindo novo envio por essa tela até reconciliação segura; não há botão de bypass ou reset silencioso. A recuperação completa exige definir/implementar contrato durável que identifique a tentativa, payload/tenant/autoridade, resposta confirmada e conflito. A alteração não afirma conclusão do fluxo incerto nem bloqueia outras funcionalidades/PRs do projeto. O backend atual permite trabalhos de conteúdo idêntico legitimamente; não deduplicar por título/horário/cidade por suposição.

Casos distintos: auth/fetch/JSON/final-auth pendentes, unknown finito seguido de refresh, blur/refocus pós-despacho sem segundo POST, pre-dispatch expiração com retry autorizado/oldfinally protegido, novo proprietário/novo draft, rejeição oportuna e tenant diferente dentro da mesma conta. Dados de pagamento no teste são fixture de payload de vaga, nunca PSP ou dinheiro real.

mainb00be864d6ed6c7383f9f5267df054dad6907535, #420–424 integrados com ownCI/APK/pais/tree/main comprovados. Pós420 agora aprovado integralmente: CI38114053725/job1143952971044/497/145/3 + APK38114053744/job114395297192; install05:35:10.7875902Z/launch05:36:04.3498698Z Metrofalse; ZIP11692968057 digestsha256:4fba811cdbaed67401f613028daecddbe77c7989c2fca3f1809da343133af0dc, não expirado no SHA real64c5f2a09969e76d7077858af4a0623f2b43ce38. Isso é emulador standalone, não Android físico. Pós421–424 CI aprovado/APK pendentes na última consulta.
#431 ownCI666mobile aprovado, #432 CI675mobile e APK em acompanhamento; #425 tentativa2 do APK run38113622026 pendente após falha transitória do emulador antes da instalação, sem repetir rerun. Integração dos dependentes aguarda esse gate, nunca considerar pré-merge suficiente para gate pós-merge.

Próxima ação: publicar fix/publication-uncertain-deadline sobre #432/headb7555982898bd95bc3fd18688def28f12f0e6f61 basefix/dashboard-signout-local-deadline; conferir bytes/diff/gates CI4web/685mobile/145API/3CLI + APK próprio. Acompanhar425tentativa2 e pós420–424; integrar425→426→427→428→429→430→431→432→esta fatia em ordem, após retarget/diff/gates e verificação de SHA/pais/tree/main/pós-gates. Persistir novas provas efetivas no ciclo sem repetir merges.
Auditoria independente seguinte: mutações de convites/criação de equipes/chat/casos/substituição/privacidade podem manter busy em auth/rede/JSON pendentes e precisam prazo com unknown/ACK específico; inspecionar contrato antes de modificar. EquipesGET já cobertos; não corrigir cópia local obsoleta. Contrato de reconciliação durável da publicação permanece item separado real, sem adivinhar dedupe ou contornar segurança.

Documento ORIGINALv1.104 existente atualizado em lugar preservando histórico completo, com memória/checkpoint/requisitos/evidências no mesmo commit. React19.1.4/RN0.81.6/tenant/RLS/desenho/lockfile preservados. Android físico/E2E/VisualTruth/SecureStore/OScrash/teclado/payload/restart/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago abertos. Sem dinheiro real, novas cobranças/serviços/infraestrutura ou deploy pago. Bloqueio de uma dependência não encerra o projeto.

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
  "ci431": {
    "head": "b0b001186dd9be8f54d20a82f94b9a6047c5a335",
    "run": 38115110022,
    "job": 114398342883,
    "attempt": 1,
    "counts": [
      4,
      666,
      145,
      3
    ],
    "allSteps": "success",
    "http": [
      "2026-10-11T05:34:50.8163873Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  "apk425Failure": {
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
