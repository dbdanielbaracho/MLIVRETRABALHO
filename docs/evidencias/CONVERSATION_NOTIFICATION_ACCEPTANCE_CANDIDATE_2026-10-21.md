# Candidato ao aceite técnico interno — Área 9: conversa e notificações

Data: 21/10/2026
Repositório: `dbdanielbaracho/MLIVRETRABALHO`
Base: `80f3ac49f5f7177d6a8d193a27881b74ffff4763`

## Estado

**PENDENTE de CI/APK próprios, merge e pós-merge.** Este pacote reconcilia #581 e #560 no PR #581 e não aceita a área antecipadamente.

## Cadeia integral

| Requisito | Implementação/prova |
|---|---|
| Conversa autenticada | `conversations.controller.ts`, cliente `conversation.ts`, tela `conversa.tsx` |
| Ownership de prazo | 18 regressões reais de auth/fetch/JSON/final-auth, ACK/reload, timers antigos, novo foco e blur |
| ACK e replay | HTTP/PostgreSQL exige uma assignment/membership/notificação e replay sem novas escritas |
| Mensagem e leitura | POST e GET reais entre empresa/profissional com tenant explícito |
| Dois destinatários | owner + manager criado por convite real; duas caixas autorizadas |
| Falha simulada | hooks CI-only falham INSERT alvo e exigem rollback integral em cinco fluxos |
| Não-entrega | HTTP 500 sem ACK falso, mensagem, UPSERT ou alerta parcial |
| Isolamento | snapshots do tenant e empresa estrangeira + RLS/policies/grants invariantes |
| Substituição | seleção positiva e falha de alerta com original cancelado apenas no controle positivo |
| APK | obrigatório porque há alteração mobile; instalação/smoke não substituem prova de tela física |

## Alterações

- `apps/mobile/app/conversa.tsx`: limpeza do controller/timer próprio no deadline e no blur.
- `apps/mobile/tests/conversation-controller-cleanup.test.mjs`: 18 regressões canônicas.
- `apps/api/src/notification-atomicity-fixture.test.ts`: guardas do fixture.
- `scripts/notification-atomicity-e2e.cjs`: jornada HTTP/PostgreSQL com falhas deliberadas e controles positivos.
- `scripts/http-journey-e2e.sh`: executa o fixture no gate obrigatório.
- seis normativos: apêndice preservando integralmente os conteúdos anteriores.

## Critério de decisão

CI completo e APK próprios devem passar no mesmo candidato; após revisão e merge, CI e APK literais também devem passar. Só então registrar APROVADA internamente. Provedor/push externo, produção, aparelho físico, SecureStore nativo, pentest, PSP, contratos e dinheiro real ficam explicitamente separados.
