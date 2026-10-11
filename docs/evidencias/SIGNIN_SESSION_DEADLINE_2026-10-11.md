# Prazo do login com fila e rollback preservados

## Prazo do login com fila/rollback preservados (2026-10-11 05:17:47 UTC)

Entrar.signin conserva busy após abort15s quando getSession, fetch, JSON ou persistência/readback não resolvem.11novos cenáriospré-JSX:7falhas/4sucessos antes,11PASS após; local24/24 (11novos+6signin+7session-transaction), Node24. Executam signinAccount/createSessionQueue/persistVerifiedSession reais com adapter explícito; não prova SecureStore/OS crash/renderRN/aparelho físico.

Prazo15s publica erro factual sem declarar acesso/login/logout, libera busy/pending para tentativa humana e mantém credenciais. Guarda foco+identidade do controller+abort impede retorno de sessão/transporte/persistência vencida de gravar ou navegar; catch/finally/timer antigos não apagam mensagem nova nem desbloqueiam operação nova. Finalmente zera referência do controller atual. Nenhum retry automático, novo serviço ou bypass da fila.

Session.ts/session-transaction auditados: saveVerifiedSignin permanece integralmente na fila compartilhada; compara expectedToken e isCurrent, verifica par token/tenant e faz rollback do par anterior se a escrita se torna stale. O deadline da tela NÃO remove operação nativa/rollback da fila nem cria promessa de atomicidade física. Caso de gravação parcial pendente comprovado: nova tentativa fica atrás da gravação antiga; ao retornar ela, rollback conclui antes do novo getSession/POST/persist; finally antigo não libera busy novo; novo par confirmado e rota correta são preservados. Alteração concorrente de token rejeita expectedToken antigo, sem apagar nova sessão. Se SecureStore nunca resolver, a fila ainda espera: erro da tela não mente que storage foi reparado/limpo. Esse gate nativo permanece independente.

Seis fases distintas testadas: leitura inicial da sessão, fetch, response.json, leitura pré-gravação, gravação parcial e readback. Após expiração, rollback/guard deixam par anterior e sem rota; auth inicial expirada não envia POST. Testes também cobrem fila/rollback antes de login novo, token novo por outro login, blur/refocus, ACK oportuno profissional/empresa, limpeza de senha só após confirmação e rate-limit429 factual sem repetição. JSX/StyleSheet/navegação/helper/sessionqueue/transaction/payload e limites existentes preservados byte-identical. Não alterar signup incerto nem liberar criação duplicada.

Main atual64c5f2a09969e76d7077858af4a0623f2b43ce38 (#420 integrado após própriosCI/native completos, pais/tree verificados). Pós420 CI38114053725/job114395297104 counts4/497/145/3 aprovado, HTTP real05:14:55.8805366Z; pósAPK38114053744 em execução, ainda NÃO PASS. Pós419 comprovado no SHA83d5df28f11395522aa5e8e776a38bab491e0a91. #421 retargetmain/diff revisado, CIexato aprovado e ownAPK38112820608 em execução; #422–428 abertas em ordem. Todos CIs próprios420–428 completos aprovados heads exatos:4web/497,510,528,571,588,599,610,617,626mobile/145API/3CLI, typecheck/build/export/migrations/privacy/HTTP. #428 head0deb62791921eaf326be91562a2adb4f602d89bf/treed27f8e8c62d362f72fdc7a340498328de0be3429, CI38114121811/job114395500223 counts4/626/145/3 e HTTP05:16:09.0504632Z; APK38114121800 pendente. Não repetir419/420 ou rerun de jobs em execução.

Próxima ação concreta: publicar fix/signin-session-deadline sobre head4280deb62791921eaf326be91562a2adb4f602d89bf/treed27f8e8c62d362f72fdc7a340498328de0be3429, basefix/signup-uncertain-deadline; revisar bytes/diff, CI esperado4web/637mobile/145API/3CLI+APKstandalone próprio no SHA exato. Integrar421→422→423→424→425→426→427→428→esta fatia quando cada CI/APK próprio passar; retargetmain após predecessor, rever mergeability/diff, merge-base/tree/pais/main e pós-merge no SHA real. Provas definitivas pósAPK420+posteriores continuam obrigatórias; []/in_progress não é sucesso.

Auditoria seguinte: signout em EmpresaConta/Perfil possui abort-only, remoção da sessão original/resultado local incerto exige preservar clearSessionForAuthorization/fila/token nova/ACK de limpeza e erro em vez de alegar saída. Othermutations devem manter drafts/unknown/humano; sem desbloqueio indiscriminado. GeneralSupport/SupportRecovery/DeclaredCapabilities já inspecionados têm callbacksGET; não repetiratividade. Preferências/ajuda semmembership/ML/enterprise dependem contrato/dados; físicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart/piloto, pentest independente, PSP/KYCsandbox/FIN-RISK/providers/TRUST e Web/Railwayeventualmentepago separados/abertos. Emulador não físico. ORIGINALv1.104 atualizado em lugar com histórico integral, memória/checkpoint/requisitos/evidência; React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho e sem dinheiroreal/novacobrança/serviço/infraestrutura/deploypago preservados. Bloqueio parcial/fim de rodada não encerra projeto.

## Pós420: CI aprovado, APK em acompanhamento

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
    "pending": true,
    "run": 38114053744,
    "status": "in_progress"
  },
  "pending": true
}
```

## CI428 próprio comprovado

```json
{
  "head": "0deb62791921eaf326be91562a2adb4f602d89bf",
  "run": 38114121811,
  "job": 114395500223,
  "attempt": 1,
  "counts": [
    4,
    626,
    145,
    3
  ],
  "allSteps": "success",
  "http": [
    "2026-10-11T05:16:09.0504632Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
  ]
}
```
