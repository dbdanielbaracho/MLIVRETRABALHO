# Conversa real — rede, rota e envio guardado v1.49

**Data:**09/10/2026;UTC10/10. **Base:**#358 8e580893cf18ef31ef2f6aaa1ac168497fab46aa.

## Contrato/divergência
ConversationsController reconsultado: acesso exige membership/assignment no tenant e participante ou company role; GET id/body/senderIdentityId/createdAt; POST ack id/body/createdAt e gera notificações, sem idempotência. Tela antiga sem catch/loading/erro/retry/15s/guard, valores arrays poderiam virar strings; mensagens não rolavam.

## Revisão
Rota explícita string simples assignment+tenant, sem tenant ativo alternativo. Foco/schema/403/404/retry/15s/cancel/epoch/sequence e sessão/rota guardadas. Mensagens roláveis, guard/disabled e ack real antes de limpar rascunho. Texto preservado em falha/unknown, orientação conferir antes de reenvio, nenhum POST automático/repetido. Refresh independente do signal de envio. Nenhuma mensagem/notificação real foi enviada, nem dados reais acessados para testes.

## Validação/limites
Seis novos testes,93/93 UTC/São Paulo: rota/encoding/estados/schema/vazio/403/404/retry/sessão/payload/ack/timeout sem duplicar. Backend/policies/RLS/dependências/identidade visual mantidos; ScrollView interno substitui View de mensagens. GatesCI/APK/revisão/pós-merge/taps pendentes. VisualTruthOPEN.

## Próxima ação
#358 CI38016571399/APK38016571422 em execução; #357 CI sucesso/APK em andamento; #343 retry2 no smoke. Acompanhar e integrar somente gates exatos; tratar Segurança profissional após contratos, sem decisões automáticas.
