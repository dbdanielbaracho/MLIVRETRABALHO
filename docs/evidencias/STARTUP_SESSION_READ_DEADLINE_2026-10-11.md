# Prazo da leitura pareada na abertura

## Prazo da leitura de sessão na abertura (2026-10-11 05:10:58 UTC)

A tela inicial index/Home só liberava checking depois de resolveStartupRoute resolver. Nenhum timer existia: uma das leituras pareadas de authenticatedTenantHeaders sem resolução oculta indefinidamente Entrar/Criar conta. Startup-route/session.ts auditados: snapshots de token/tenant são exclusivamente leituras da fila existente; não alterar fila/storage nem deduzir autorização/membership pela rota.

7novos testespré-JSX com focus handler e resolver reais, fixtures explícitas: antes5falhas/2sucessos por ausência do callback de prazo nos cinco cenários; depois7PASS. Local11/11 (7novos+4contratos startup-route), Node24. Quatro casos pendentes por conta profissional/empresa e primeira/segunda leitura, oldfocus/timer/snapshot, rotas oportunas e signedout/tenantórfão. Não é renderRN/boot físico/SecureStore ou navegação real.

Prazo15s libera os botões de entrada já existentes e marca leitura expirada, sem limpar sessão, inventar login/logout ou enviar requisição. Leitura antiga não inicia segundo snapshot nem redireciona após expiração; novo foco exige novo par íntegro. Cleanup/resultado oportuno cancelam timer. Guards de auth/tenant do resolver e rotas profissionais/empresa mantidos. JSX/StyleSheet/desenho/textos/cadastro/login/storage/fila transacional byte-identical. Não modifica POST signin/signup/signout, que ainda possuem abort-only e precisam análise própria de escrita em SecureStore/resultados incertos.

Estado: main83d5df28f11395522aa5e8e776a38bab491e0a91/pós419 comprovado, #420–426 abertas em ordem, sem merges antecipados. CIs420–426 completos comprovados no head exato:4web/497,510,528,571,588,599,610mobile/145API/3CLI com typecheck/build/export/migrations/privacy/HTTP. CI42538113622093/job114394056918 cronologia real05:07:02.2552483Z; CI42638113777302/job114394498727 cronologia real05:09:53.3695228Z. #426 headc9bb5c147b8181c4ee39eb490139625c08df5678/treee22f9734039ba8eb86cf72d5a57385ce0787305f, APK38113777319 em execução; APKs420–426 pendentes. Não rerun de execução em andamento ou repetir merge419.

Próxima ação: publicar fix/startup-session-read-deadline sobre head426c9bb5c147b8181c4ee39eb490139625c08df5678/treee22f9734039ba8eb86cf72d5a57385ce0787305f, basefix/availability-save-deadline, verificar bytes/diff e CI próprio esperado4web/617mobile/145API/3CLI+APKstandalone no SHA exato. Integrar420→421→422→423→424→425→426→esta fatia só com próprios gates confirmados, retargetmain após predecessor, eventual mergeable/conflito real, merge-base/tree/pais/main e pósCI/APK no SHAreal. Registrar números/runs/resultados/artefatos reais; []/in_progress nunca aprovação.

Auditoria seguinte concreta: CriarConta.signup abort-only pode ocultar link Entrar com minha conta enquanto signup fica pendente; preservar sent/unknown e bloqueio de duplicação, sem resubmissão automática ou fakecreated. Entrar/signout dependem protocolo transacional de sessão/resultado em SecureStore: avaliar sem desbloqueio indiscriminado/bypassfila. Demais mutations precisam análise independente e confirmação humana/rascunhos/resultados incertos. GeneralSupport/SupportRecovery/DeclaredCapabilities já confrontados com callbacksGET; não repetiratividade. Preferências/ajuda sem vínculo/ML/enterprise aguardam definições/provas específicas; físicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart/piloto, pentest independente, PSP/KYCsandbox/FIN-RISK/providers/TRUST e Web/Railwayeventualmentepago continuam separados/abertos. Um impedimento parcial/fim de rodada não conclui projeto. Documento ORIGINALv1.104 existente atualizado em lugar com histórico completo, memória/checkpoint/requisitos/evidência; React19.1.4/RN0.81.6/lockfile/tenant/RLS/canônico e ausência de novas cobranças/dinheiroreal/serviços/deploypago preservados.

## CI426 comprovado

```json
{
  "head": "c9bb5c147b8181c4ee39eb490139625c08df5678",
  "run": 38113777302,
  "job": 114394498727,
  "attempt": 1,
  "counts": [
    4,
    610,
    145,
    3
  ],
  "allSteps": "success",
  "http": [
    "2026-10-11T05:09:53.3695228Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
  ]
}
```
