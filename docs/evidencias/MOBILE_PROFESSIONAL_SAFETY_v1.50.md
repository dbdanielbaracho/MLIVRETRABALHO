# Segurança profissional — estados/contexto/ack v1.50

**Data:**09/10/2026;UTC10/10. **Base:**#359 d4567c39e4c113870382fbfcc9d2bc1bff71dcb7.

## Contratos/divergências
SafetyCasesController/SafetyAppealsController reconsultados. Mine usa identidade/memberships e retorna tenant de origem; create exige membership/assignmentaccess; description/reason limite4000. Case ack não inclui assignmentId/description/tenant; appeal retorna created true/false e status real (existente pode estar em revisão/terminal). Tela antiga confundia reads falhos com vazio, inferia reportedByMe ausente como falso, vinculava appeal apenas ao ID e não tinha catch/timeout/guard/ack.

## Revisão
Estados por fonte e partial success/schema/foco/retry15s/cancel/sequence; seleção apenas em lista de assignment real, IDs/tenants/sessão guardados. Recurso por tenant+case, botão exige appeals ready e condição UI já existente. Submissão manual guardada, inputsdisabled, limitebackendvalidado, payloads/ack reais, created false explícito. Texto mantido em erro/unknown, nenhum POST duplicado automaticamente, refresh com outro signal. Preserva emergência/local, contraditório humano, backend/policies/roles/RLS/penalidades/dinheiro/styles/nav/dependências.

## Provas/limites
101/101 UTC/São Paulo; oito novos: parcial/vazio/schema/retry/session/tenant+case/condição de revisão/payload/ack real/created false/rejeição/timeout sem duplicar. Sem relatos reais nem decisões sobre usuários. CI/APK exatos/revisão/pós-merge/taps pendentes; Visual Truth OPEN.

## Fila/retomada
#359 CI38016694893 sucesso/APK38016694857 em execução; #358 CI38016571399 sucesso; #343 tentativa2 no smoke, gates não dispensados. Próxima integração/Android e inspeção das telas restantes/capturas contra desenho antes de definir novos itens.
