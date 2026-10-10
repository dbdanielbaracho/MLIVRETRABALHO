# Talentos — estados e remoção confirmada v1.47

**Data:** 09/10/2026; verificação UTC 10/10.
**Base:** #356 5ddcb0d59c2bd13a49b5d4654efbcc02331699cf.

## Contrato/divergência
TalentPoolsController lido no SHA exato: pools preferred/network/open, lista filtrada por profissional ativo e tenant, DELETE retorna removed true. Tela antiga inicializava vazio mesmo em erro, GET/DELETE sem catch/foco/timeout e sem serializar toques.

## Correção revisada
Estados reais/schema/403/foco/retry15s/epoch/sequence/cancelblur, lista desabilitada e snapshot tenant+identidade antes DELETE. Endpoint/payload bodyless e ack reais, sem inventar ID de retorno ausente no backend. Resultado não confirmado não é remoção otimista; releitura usa controller separado. Nenhuma política/ranking/adição automática ou mudança de preferências reais foi executada.

## Validação/limites
Seis testes novos; 79/79 UTC/São Paulo. Dados reais/vazio/403/falha/schema/retry/contexto/bodyless DELETE/encoded ID/ack/perda de resposta sem retry automático. Navegação/styling/APIs/roles/RLS/React19.1.4/RN0.81.6/lockfile preservados. CI/APK exatos/revisão/pós-merge/taps pendentes; Visual Truth OPEN.

## Fila
#356 CI 38016256770/APK 38016256788 em acompanhamento. #351 e #352 CI/APK sucesso; #343/#349/#350 retry2 Android em andamento. Próximas divergências por leitura: Substituições, Conversa (rota real conversa.tsx, não chat.tsx) e Segurança profissional (seguranca.tsx, não relatar-problema.tsx). Reconsultar contratos antes de alterar; não aplicar decisões humanas automaticamente.
