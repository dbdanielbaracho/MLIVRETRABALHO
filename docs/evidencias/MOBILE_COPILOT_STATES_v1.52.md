# Assistente: sugestão validada e rede limitada — v1.52

**Data:** 2026-10-10. **Base:** #362 cb5b39a19d89593cafc9ca6bbd44c1528a9253f0.

CopilotController/copilotPolicy/copilot-tools.ts reconsultados. Interpret usa POST deterministic_baseline, mode assisted, providerConfigured false no backend atual. Não foi feita chamada real ao Assistente pelo agente nem habilitado fornecedor pago. UI anterior rejeitava promessa de rede sem catch, não validava result.reasons/rota e permitia envio simultâneo.

Correção mantém pedido manual em mode assisted, texto até2000, guard síncrono/campos disabled/15s/cancelamento de blur/geração e estado de erro. Texto preservado em falha; só resposta validada cria sugestão. Rotas correspondem aos intents existentes do backend, sem navegação arbitrária. executionAllowed deve ser false, modo assisted e facts/reasons/disclaimer devem ser válidos; sinal requiresHumanConfirmation retornado permanece. Editar texto invalida sugestão anterior; abrir próximo passo verifica mesma sessão e versão da sugestão. Nenhuma tool é executada automaticamente; rota abre jornada já existente, sem confirmar/pagar/bloquear/punir.

6 novos testes;113/113 locais UTC e America/Sao_Paulo, incluindo suíte anterior107. Cobrem limite sem request, payload assisted/chamada única, rota desconhecida/incompatível, ação automática/modo inválido, confirmação humana, facts/schema/HTTP/JSON/rede sem retry. Revisão estática de guard/draft/epoch/session, sem alegar taps/aparelho/Visual Truth. Styles/APIs/backend/policies/RLS/React19.1.4/RN0.81.6/lockfile preservados. CI/APK head exato/merge/pós-merge ainda pendentes; cadeia após#362. Visual Truth OPEN.

Próxima ação: acompanhar gates #351–#360/#362 e deste item, integrar em ordem com revisão e pós-merge. Revalidar Privacidade/onboarding e comportamento company/professional das sugestões contra requisitos; não inferir cobertura total por essas correções.
