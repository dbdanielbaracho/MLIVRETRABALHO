# Prazo do cadastro preservando bloqueio de duplicação

## Prazo do cadastro preservando bloqueio de duplicação (2026-10-11 05:13:52 UTC)

CriarConta.signup possuía abort-only que conservava busy quando fetch ou response.json não resolviam. Isso ocultava o link de recuperação enquanto o cadastro podia já existir. Nova bateria9cenários:6falhas/3sucessos antes,9PASS após; local20/20 (9novos+11signup existentes), Node24, handlers pré-JSX/signupAccount e JSON de produção com fixtures explícitas. Não cria conta/workspace real, não é renderRN/Android físico.

Prazo15s libera busy/pending visual, mas mantém sent/unknown=true e uncertain=true quando POST começou. Mensagem oferece Entrar com minha conta, já existente no JSX; botão/handler de novo cadastro seguem bloqueados. Nenhum retry automático ou segundo POST é permitido, mesmo depois de resposta created/rejected tardia ou blur/refocus. Rascunho/senha são mantidos no prazo para recuperação explícita; ACK oportuno válido continua limpando senha e navega para/entrar, rejeição email_in_use oportuna continua distinta de unknown. Guards foco+controller e abort impedem retorno/finally/timer obsoletos de alterar outcome. JSX/StyleSheets/textos/navegação/helper e protocolo de não duplicar conta/workspace preservados byte-identical; sem storage/serviço/modelo/custo novo.

Testes de profissional/empresa separadamente cobrem fetch/JSON pendentes e JSON de rejeição tardia, erro incerto imediato e bloqueio de segundo envio, zero rota automática, rascunho/senha, blur/refocus/unknown, ACK oportuno/obsoleto e email_in_use real na fixture. Não alterar backend/DB ou deduzir que cadastro non-idempotente pode ser repetido como Disponibilidade.

Entrega material nesta consulta: #420 MERGED em64c5f2a09969e76d7077858af4a0623f2b43ce38, treef7c9a8ae4947125d38ca87c892412a15fa271f84; pais[83d5df28f11395522aa5e8e776a38bab491e0a91,56e8229ada3bdb44042b9d208357f10ef91cdad8] e main verificados. PréCI38112711675/job114391414713 counts4/497/145/3 eAPK38112711679/job114391414476 aprovados no head56e8229ada3bdb44042b9d208357f10ef91cdad8. APK install05:10:30.0427996Z, launch05:11:24.7013021Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; ZIPartifact11693230353 digestsha256:320609211c0e5935c47dba449c47b02a8c6aaaee6571629f19e10e8016ef718b não expirado. Digest refere ZIP, smoke emulador não físico. Pós420 CI38114053725/APK38114053744 em execução no SHA real64c5...: NÃO PASS ainda.

#421 retargetmain, nova consulta mergeable=true e diff idêntico revisado. CI38112820567 exacthead66223caf499c01042b40fba82f96da301f0a429b completo aprovado; APK38112820608 em execução, sem merge. #422–427 ainda abertas em ordem; CIs420–426 completos comprovados counts4web/497,510,528,571,588,599,610mobile/145API/3CLI com typecheck/build/export/migrations/privacy/HTTP. #427 head0832b9f5df98fba06a3c89918e5eb045bc7ba25d/tree3d1d2c93b9cfaa1a10c24dbe8b38682bfca06a00, CI38113969108/APK38113969118 em execução; ownAPKs421–427 pendentes. Pós419 comprovado no SHAreal83d5df28f11395522aa5e8e776a38bab491e0a91. Não repetirmerges, não rerun em andamento, não considerar []/in_progress sucesso.

Próxima ação: publicar fix/signup-uncertain-deadline sobre head4270832b9f5df98fba06a3c89918e5eb045bc7ba25d/tree3d1d2c93b9cfaa1a10c24dbe8b38682bfca06a00, basefix/startup-session-read-deadline; conferir bytes/diff e CI próprio esperado4web/626mobile/145API/3CLI+APKstandalone no head exato. Acompanhar pós420 e próprios gates421 em paralelo. Integrar421→422→423→424→425→426→427→esta fatia só com seus gates próprios comprovados, retargetmain em ordem após predecessor, revisar diff/merge-base/tree/pais/main e gates pósCI/APK no SHAreal. Documentar SHAs/runs/artefatos/resultados reais de cada integração no ciclo. Nenhumaintegração420 repetida.

Auditoria seguinte: Entrar/signout ainda têm abort-only e podem ficar busy na leitura/persistência SecureStore. Precisam confronto com session-transaction e fila compartilhada: não liberar login/logout ignorando escrita persistida incerta, não descartar sessão nova ou esconder falha de limpeza local. Demais mutations exigem exame de contratos/ACK/incerteza próprio; não declarar projeto concluído só porque esta bateria passou. Preferências/ajuda sem vínculo/ML/enterprise precisam definições/provas específicas. FísicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart/piloto, pentest independente, PSP/KYCsandbox/FIN-RISK/providers/TRUST e Web/Railwayeventualmentepago separados/abertos. Emulador não fecha físico. Documento ORIGINALv1.104 atualizado em lugar com histórico integral, memória/checkpoint/requisitos/evidência no mesmo commit. React19.1.4/RN0.81.6/lockfile/tenant/RLS/canônico e ausência de dinheiroreal/novosserviços/cobranças/infraestrutura/deploypago preservados; impedimento parcial/fim de rodada não encerra projeto.

## Prova pré-merge e commit real #420

```json
{
  "pr": 420,
  "sha": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
  "tree": "f7c9a8ae4947125d38ca87c892412a15fa271f84",
  "parents": [
    "83d5df28f11395522aa5e8e776a38bab491e0a91",
    "56e8229ada3bdb44042b9d208357f10ef91cdad8"
  ],
  "pre": {
    "pr": 420,
    "head": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
    "tree": "f7c9a8ae4947125d38ca87c892412a15fa271f84",
    "parentMain": "83d5df28f11395522aa5e8e776a38bab491e0a91",
    "mergeBase": "83d5df28f11395522aa5e8e776a38bab491e0a91",
    "mergeBaseTree": "075aad2062eecde202f9b7850c07858b79c9f85c",
    "ci": {
      "head": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
      "run": 38112711675,
      "job": 114391414713,
      "attempt": 1,
      "counts": [
        4,
        497,
        145,
        3
      ],
      "allSteps": "success",
      "http": [
        "2026-10-11T04:50:08.2546088Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
      ]
    },
    "apk": {
      "head": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
      "run": 38112711679,
      "job": 114391414476,
      "attempt": 1,
      "steps": "success; diagnostics skipped",
      "markers": [
        "2026-10-11T05:10:30.0427996Z Success",
        "2026-10-11T05:11:24.7013021Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11693230353,
        "name": "MLivreTrabalho-standalone-apk",
        "size_in_bytes": 28908619,
        "url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693230353",
        "archive_download_url": "https://api.github.com/repos/dbdanielbaracho/MLIVRETRABALHO/actions/artifacts/11693230353/zip",
        "expired": false,
        "created_at": "2026-10-11T05:11:37Z",
        "expires_at": "2026-10-25T05:11:35Z",
        "updated_at": "2026-10-11T05:11:37Z",
        "digest": "sha256:320609211c0e5935c47dba449c47b02a8c6aaaee6571629f19e10e8016ef718b",
        "workflow_run": {
          "id": 38112711679,
          "repository_id": 1378638985,
          "head_repository_id": 1378638985,
          "head_branch": "fix/candidates-read-deadline",
          "head_sha": "56e8229ada3bdb44042b9d208357f10ef91cdad8"
        }
      }
    }
  },
  "postRuns": []
}
```

## Pós-merge #420 — acompanhamento, não aprovação

```json
{
  "pr": 420,
  "sha": "64c5f2a09969e76d7077858af4a0623f2b43ce38",
  "tree": "f7c9a8ae4947125d38ca87c892412a15fa271f84",
  "parents": [
    "83d5df28f11395522aa5e8e776a38bab491e0a91",
    "56e8229ada3bdb44042b9d208357f10ef91cdad8"
  ],
  "ci": {
    "pending": true,
    "run": 38114053725,
    "status": "in_progress"
  },
  "apk": {
    "pending": true,
    "run": 38114053744,
    "status": "in_progress"
  },
  "pending": true
}
```
