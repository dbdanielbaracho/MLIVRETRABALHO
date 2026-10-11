# Prazo da saída pelo painel da empresa

## Prazo da saída pelo painel da empresa (2026-10-11 05:36:39 UTC)

A main foi confrontada novamente: EmpresaInicio.signout ainda esperava fetch sem limite efetivo e cancelava o timer antes da limpeza local. A mesma correção já proposta em Conta/Perfil não cobria este handler independente. Nove cenários do painel foram acrescentados à bateria existente usando o handler pré-JSX real, loadCompanyDashboard/sameCompanyContext de produção e a fila/clearExpectedSession reais com adapter explícito. Antes, 6 falhas/3 sucessos novos (incluindo timer ausente durante limpeza); depois 9/9 novos e 27/27 da bateria das três telas. Bateria com dashboard/actions/session-clear/session-transaction/profile-save:70/70 locais Node24.

O timer de saída agora permanece até a limpeza local terminar, publica erro de confirmação e encerra Saindo no prazo sem afirmar revogação remota. Promise.race(fetch,deadline) permite cumprir a saída local explicitamente solicitada mesmo se o transporte ignorar abort. Há uma ref própria para a operação: auth tardio não despacha, e timer/finally antigos não alteram a tentativa seguinte. A limpeza continua vinculada ao token original dentro da fila e somente cleared verificado permite navegar; stale/failed não confirmam saída. Não há retry automático, quebra da fila nem remoção de escrita nativa pendente.

A verificação adicional do contexto da empresa permanece integral: se a conta/contexto exibido já mudou, nenhum POST/clear novo é enviado. O teste de finally antigo com uma nova auth pendente preserva busy; depois de a primeira limpeza efetiva remover o token, a nova tentativa percebe o contexto alterado, não navega nem repete POST. As outras telas mantêm seus protocolos originais próprios. Blur/login posterior, falha parcial/readback, erro de storage e sucesso oportuno são casos separados. Não é SecureStore/OS crash, E2E físico ou revogação no servidor.

Load/foco, action(rating/preferred), openConversation, JSX/StyleSheets/CompanyNav do painel são byte-identical. session/helpers/backend/migrações/locks não mudam. A fixture do novo painel resolve dashboard/assignments/completed com parsers de produção e inicialização lazy de state; os casos anteriores Conta/Perfil continuam aprovados.

#431 headb0b001186dd9be8f54d20a82f94b9a6047c5a335 tree7f4b56e310d784d6bc04864bcb8c2459bf2daed2 teve CI38115110022/job114398342883 aprovado4web/666mobile/145API/3CLI e HTTP05:34:50.8163873Z; seu APK38115110028 está pendente. #430 CI655mobile aprovado, APK pendente. Main segueb00be864d6ed6c7383f9f5267df054dad6907535, merges420–424 e CIs pós-merge já comprovados; APKs pós-merge seguem em acompanhamento. APK425 tentativa1 falhou antes de instalar o aplicativo por input do emulador/Broken pipe32/exit224; tentativa2 do mesmo run38113622026 está em execução. Não integrar425 nem seus dependentes até prova completa no SHA exato, e não repetir rerun pendente.

Auditoria sem atividade artificial: Equipes.tsx REAL da main já tem callbacks de erro nos prazos de loadBase/selectTeam/selectAllocation; a cópia local mais antiga não autoriza repetir essa correção. GeneralSupport/SupportRecovery/DeclaredCapabilities também já cobertos conforme consulta anterior. Empresa.create, porém, contém uncertain.current marcado antes de POST não idempotente e não o consulta no guard de entrada; o timer ainda é abort-only. Próximo item concreto é reproduzir/revisar publicação sem confirmação e o contrato de recuperação antes de alterar esse fluxo. Publicação incerta não autoriza repetição automática; reconciliação/ACK precisa ser explícita e a referência visual respeitada.

Próxima ação: publicar fix/dashboard-signout-local-deadline sobre #431/headb0b001186dd9be8f54d20a82f94b9a6047c5a335 basefix/profile-save-screen-deadline, conferir bytes/diff e CI esperado4web/675mobile/145API/3CLI+APK próprio. Acompanhar425tentativa2 e gates pós420–424, integrar425→426→427→428→429→430→431→esta fatia em ordem com retarget/revisão/gates/commit/pais/tree/main e pós-merge. Blocos anteriores são histórico; não afirmam gates ainda pendentes.

ORIGINALv1.104 existente atualizado em lugar com histórico, memória/checkpoint/requisitos/evidências no mesmo commit. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Android físico/E2E/VisualTruth/SecureStore/OScrash/teclado/payload/restart/piloto, pentest, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam abertos. Sem dinheiro real, novas cobranças/serviços/infraestrutura ou deploy pago. Bloqueio parcial não bloqueia trabalho independente nem encerra o projeto.

```json
{
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
