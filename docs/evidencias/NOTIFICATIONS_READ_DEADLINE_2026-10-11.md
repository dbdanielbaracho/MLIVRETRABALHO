# Evidência — leitura de Notificações

## Atualização incremental — Notificações (2026-10-11 04:52:18 UTC)

NotificationsScreen, usado por profissional e empresa, tinha prazo que apenas abortava o controller. Auth/fetch/JSON/auth final pendentes mantinham status loading e o botão de atualização desabilitado.18novas regressões dos handlers pré-JSX com helpers reais reproduziram10falhas/8sucessos antes; após a correção: PASS28/28 local (18novos +10notifications existentes).

Somente load usa callback opcional de prazo15s: no requestId/epoch atual invalida sourceHeaders, esvazia items e apresenta status error, permitindo o retry já existente. Aplicação final rejeita abort. Testes cobrem quatro estágios nos dois perfis, prazo/late facts, blur/novo foco, request mais recente no mesmo foco, retry e owner distinto. Empresa rejeita troca de tenant com mesmo owner; profissional continua lendo notificações multiempresa independentemente da empresa selecionada. Não inventa nomes, títulos, datas ou readAt.

Corpo de read (marcar como lida), JSX/StyleSheets/nav idênticos após trim final. Default operation() usado no POST, ACK/confirmed/rejected/unknown, fila pending e conferência humana preservados. Fixtures de hooks/auth/fetch/timers usam loadNotifications, notificationContextHeaders e runForSession reais; não render RN/SecureStore, Android físico ou HTTP externo. Nenhum POST foi executado. React19.1.4/RN0.81.6/lockfile/tenant/RLS preservados.

Estado: main83d5df28f11395522aa5e8e776a38bab491e0a91/tree075aad2062eecde202f9b7850c07858b79c9f85c; pós419 comprovado conforme apêndice anterior. #420 aberta head56e8229ada3bdb44042b9d208357f10ef91cdad8/treef7c9a8ae4947125d38ca87c892412a15fa271f84; CI38112711675/job114391414713 aprovado por todos os passos/log/counts4web/497mobile/145API/3CLI, HTTP cronologia04:50:08.2546088Z. APK38112711679/job114391414476 em build na consulta04:51:38UTC. #421 aberta head66223caf499c01042b40fba82f96da301f0a429b/treedcaec82502bd76f39d4fd4a347b049c048454253, basefix/candidates-read-deadline;8arquivos remotos byteidênticos/patch revisto; CI38112820567 eAPK38112820608 em execução. Não integrar nem rerun enquanto gates executam.

A nota anterior da Conversa foi publicada04:49:54UTC; os horários04:53/04:52 eram erros de redação, corrigidos para04:49 neste apêndice e nos campos correspondentes. Nenhum gate ou resultado é antecipado. O v1.104 original continua com todo conteúdo e apêndices, atualizado em lugar; README continua apontando esse mesmo documento.

Publicar fix/notifications-read-deadline a partir do head421 acima, basefix/conversation-read-deadline. CI próprio esperado4web/528mobile/145API/3CLI eAPK standalone no SHA exato obrigatórios, pendentes antes da publicação. Integrar420→421→esta fatia somente com próprios gates aprovados, retargetmain em ordem/reconsulta eventual, árvore/pais/main e pós-gates reais. Atualizar SHA/PR/runs reais na retomada; não repetir419 nem confundir status histórico com corrente.
Próximas alternativas internas a auditar: leituras de Membros, Substituições, Casos de segurança, Pagamentos, Copilot, Privacidade e disponibilidade; reproduzir falha concreta antes de alterar e preservar escrita/resultados incertos. Equipes, Interessados, Conversa e Notificações já têm correções/cobertura registradas. Físico Android/E2E/VisualTruth, pentest independente, PSP/KYC sandbox/FIN-RISK, providers/TRUST e Web/Railway eventualmente pago continuam separados e abertos. Preferências/autoridade para ajuda sem vínculo/ML/enterprise precisam contratos/evidências, sem inventar requisitos/tenant. Sem contratação, dinheiro real, novos custos ou deploy pago. Fim da rodada não encerra projeto; manter continuidade em tarefas independentes seguras.


## CI próprio #420 comprovado

```json
{
  "head": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
  "run": 38112711675,
  "job": 114391414713,
  "counts": [
    4,
    497,
    145,
    3
  ],
  "http": [
    "2026-10-11T04:50:08.2546088Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
  ]
}
```

Comando local: node --test apps/mobile/tests/notifications-read-deadline.test.mjs apps/mobile/tests/notifications.test.mjs.28tests/28pass/0fail; deadline nos estágios reais auth/fetch/json/auth final via helpers de produção e fixtures explícitas. Sem marcação externa/native/físico.
