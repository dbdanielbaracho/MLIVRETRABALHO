# Privacidade — confirmação das ações manuais — v1.54

Snapshot 2026-10-10 06:30:59 UTC; base #364 head8031ab71459bc76ae7452adc43a7a10d65fffcfd, main177f15c92323b9bf807a6cbee1c802f5953ac907. Fontes: PrivacyController, sessão atual, DSAR_RUNBOOK_v1.13, PRIVACY_NOTICE_BASELINE_v1.13 e TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13.

## Implementação
- POST requests trim/details required/<=2000; ack ID+tipo+submitted; nenhum detalhe ecoado inventado; preservar texto em rejeição/timeout.
- Export GET só botão explícito. Validação de estrutura/ID/data/identity/memberships/seções/notice antes de exibir; rejeita seção em tenant ausente das memberships. Dados originais preservados; backend continua autoridade sobre identidade/escopo/redação. Cópia em memória somente, limpa no blur/contexto.
- POST deactivate sem body; ack ID+true+data; Alert destrutivo/manual mantido; rejeições três razões reais preservadas. clearSession/clearTenant só depois do ack e comparação de Authorization atual. Alert antigo não opera após outra geração.
- Guard ref antes de awaits, timeout15s/AbortController, limpeza no blur, geração e contexto autenticado antes/depois. Atualização de lista tem controlador novo separado do timeout da operação. Resultado desconhecido bloqueia outras ações até leitura manual/conferência, sem retry de mutação/export automático.

## Testes e limites
8 testes novos,125/125 UTC/São Paulo: payload/required/limite antes de rede; ack incorreto;401/400 vs timeout; token diferente/ausente; um GET export com dados reais; cópia inválida/cross-membership; deactivation bodyless/ack/rejeições; lost-response/JSON sem repetição. Fixtures são testes, não dados exibidos em produção. Revisão estática de JSX/guard/foco/Alert, não prova interações nativas. Nenhuma operação real executada; API/RLS/retention/políticas/estilos/deps/workflows intactos. CI/APK próprios e pós-merge pendentes; Visual Truth OPEN.

Estado dos merges atuais/gates: EXECUCAO_VERIFICADA_2026-10-10_0630Z.md.
