# Evidência — prazo em Interessados e pós-merge #419

## Atualização incremental — 2026-10-11 04:47 UTC (01:47 Brasília)

### Estado corrente e provas da #419

Main `83d5df28f11395522aa5e8e776a38bab491e0a91`, tree `075aad2062eecde202f9b7850c07858b79c9f85c`, PR #419 merged; head aprovado `65213705c01fbda7443fc1123e4e8f1b3ea143c6`. Pais reais `de974afb962b4e77a736b22dfa3e42456672277f`, `65213705c01fbda7443fc1123e4e8f1b3ea143c6`; tree do merge idêntica à do head. Não repetir merges #412–419 nem usar o checkpoint histórico de 23:42UTC como estado atual. Consulta atual: nenhuma PR aberta antes desta correção.

Pós-merge no SHA real agora comprovado: CI [38110152658](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38110152658), job114383862793, todos os passos aprovados, 4web/476mobile/145API/3CLI, typecheck/build/export/migrations/privacy/HTTP. Marker de cronologia real PostgreSQL04:02:07.1053887Z. APK [38110152707](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38110152707), job114383862785: instalação Success04:24:44.9591307Z; DEVICE_SMOKE_OK sem Metro04:25:39.3146153Z; ZIP11691234225 não expirado e vinculado ao SHA merge, digest sha256:ad45c1776fb81c0a0b47b81fc3ace2a1298f59afa217ec9e3c0f49b6fb980276. Digest é do ZIP, não do APK individual. Essas provas de emulador não fecham Visual Truth/Android/E2E físico.

### Falha real corrigida — prazo em Interessados

Em candidatos.tsx, os timers da lista de trabalhos e de selectJob apenas abortavam o controller. Se credencial inicial, validação da origem, fetch, response.json ou autenticação final não resolvessem, o estado continuava loading. Asserções dos handlers pré-JSX reais com parsers company-candidates e runForSession reais reproduziram 12falhas/9sucessos em21novos cenários antes da correção.

O prazo15s da lista agora invalida context e publica jobsState error somente na geração atual. A aplicação final da lista rejeita controller abortado. O prazo de selectJob publica error em candidatos/recomendações somente na geração e seleção atuais. Respostas e timers antigos após blur/novo foco/seleção não substituem fatos novos; troca de identidade ou empresa continua rejeitada. Retentativa permanece humana/ explícita. Não há nomes, vagas, pessoas ou recomendações inventadas.

PASS29/29 local:21novos e8company-candidates existentes, Node24 com fixtures explícitas de hooks/auth/fetch/timer e handlers/helpers reais. Sem renderReactNative/SecureStore, chamadas externas ou confirmação de profissional. Corpo completo de confirm e JSX/StyleSheets byteidênticos após trim final; handler de escrita, ACK/resultado incerto, ordem de recomendações, rotas, React19.1.4/RN0.81.6, lockfile e tenant/RLS preservados. CI próprio esperado4web/497mobile/145API/3CLI, typecheck/build/export/migrations/HTTP e APK standalone no head exato obrigatórios; ainda pendentes antes de publicar. Não confundir local PASS com gates GitHub ou com aceite físico.

### Continuidade e dependências

Publicar fix/candidates-read-deadline a partir da main acima, revisar diff e bytes remotos; integrar somente com CI/APK no SHA exato aprovados, main/head reconsultados e pós-merge comprovado. Não antecipar número da PR, SHA ou resultado. Próxima auditoria independente: Conversa load ainda tem timer abort-only e leitura de credencial após retorno stale/error; reproduzir auth/fetch/JSON/auth final/blur/rota/troca de sessão antes de qualquer correção, preservando send e rascunho/resultado incerto. Equipes já teve correção #417 e cobertura #418/#419; não repetir tarefa antiga. Físico/Visual Truth, pentest independente, PSP/KYC sandbox, FIN-RISK, providers/TRUST e Web/Railway eventualmente pago permanecem separados e abertos. Preferências e ajuda nova semmembership ainda requerem contratos/autoridade; não inventar defaults nem tenant global. Sem contratação, dinheiro real, nova cobrança ou deploy pago. Manter continuidade em tarefas independentes seguras; fim de rodada não significa conclusão.


## Prova pós-merge exata

```json
{
  "sha": "83d5df28f11395522aa5e8e776a38bab491e0a91",
  "tree": "075aad2062eecde202f9b7850c07858b79c9f85c",
  "parents": [
    "de974afb962b4e77a736b22dfa3e42456672277f",
    "65213705c01fbda7443fc1123e4e8f1b3ea143c6"
  ],
  "ci": {
    "run": 38110152658,
    "job": 114383862793,
    "counts": [
      4,
      476,
      145,
      3
    ],
    "allSteps": "success",
    "http": [
      "2026-10-11T04:02:07.1053887Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  "apk": {
    "run": 38110152707,
    "job": 114383862785,
    "steps": "success; diagnostics skipped",
    "markers": [
      "2026-10-11T04:24:44.9591307Z Success",
      "2026-10-11T04:25:39.3146153Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
    ],
    "artifact": {
      "id": 11691234225,
      "name": "MLivreTrabalho-standalone-apk",
      "size_in_bytes": 28908609,
      "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11691234225",
      "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11691234225/zip",
      "expired": false,
      "created_at": "2026-10-11T04:25:53Z",
      "expires_at": "2026-10-25T04:25:50Z",
      "updated_at": "2026-10-11T04:25:53Z",
      "digest": "sha256:ad45c1776fb81c0a0b47b81fc3ace2a1298f59afa217ec9e3c0f49b6fb980276",
      "workflow_run": {
        "id": 38110152707,
        "repository_id": 1378638985,
        "head_repository_id": 1378638985,
        "head_branch": "main",
        "head_sha": "83d5df28f11395522aa5e8e776a38bab491e0a91"
      }
    }
  }
}
```

## Validação local

Comando: node --test apps/mobile/tests/candidates-read-deadline.test.mjs apps/mobile/tests/company-candidates.test.mjs. Resultado29tests/29pass/0fail. Antes da mudança, somente a nova bateria:21tests/9pass/12fail por loading em lugar de error; fixtures usam response.json real dos helpers. Nenhuma publicação/confirmação/mensagem externa executada.
