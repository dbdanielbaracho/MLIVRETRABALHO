# Painel Empresa: respostas reais e sessão — v1.61

Verificado 2026-10-10 07:18:22 UTC; base #371 1e3b9f0d6bbce76d7f693be91fa4faba1c8d529d, main observada61341937bdf54ce15d6cf211061051b1c074baed.

Fontes: ratings.controller.ts, talent-pools.controller.ts, company-dashboard.ts e empresa-inicio.tsx. Antes: actions aceitavam apenas response.ok e comparavam apenas tenant; saída limpava incondicionalmente token/tenant. Agora: ID/score/comment/date de rating e professionalId/pool de preferred conferidos conforme respostas reais, snapshot Authorization+tenant antes/depois, guarda/foco/15s, GET parcial conserva estados e refresh manual sempre disponível. Logout usa clearSessionForAuthorization já testado; nova sessão fica protegida.

8 novos testes,176/176 mobile UTC/SP: endpoint/body único, validação input antes POST, ack falso/incompleto,4xx/5xx/rede/JSON sem retry, contrato idempotente de preferred e troca de conta na mesma empresa. Suítes anteriores de leitura/fila/limpeza mantidas. Não é prova de taps/desenho em aparelho; CI/APK novos e pós-merge pendentes. Zero operações reais.

#364 pós-CI/APK success comprovados no [journal0717Z](../conversas/EXECUCAO_VERIFICADA_2026-10-10_0717Z.md). Visual Truth OPEN.
