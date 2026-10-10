# Painel Empresa: estados e falhas de ações — v1.36

**Data:** 09/10/2026. **Fonte:** empresa-inicio.tsx e CompanyDashboardController lidos em main 1f40e9e0bcab3e302b3319652a8f030495d7ccde; branch parte do head corrigido #345 58b3b9455b1406923a2676d9cc8b0ec0916a7d4c.

## Achados comprovados
Listas iniciais vazias eram exibidas como ausência antes da resposta; falha de fetch apagava outras seções; resumo indefinidamente “Carregando” em erro. Subtitle “hoje” incompatível com query sem cutoff. Rate/preferred sem catch/guard e signout podia não limpar local em erro de obter headers. getTenant separado podia divergir do header da leitura.

## Implementação
Recursos independentes validados com loading/erro/vazio/ready, retry/foco/timeout/geração, limpeza de dados no blur. Tenant da conversa igual ao header efetivo da leitura; antes do POST, empresa atual deve coincidir com a renderizada. Rating/preferred mantêm endpoint/payload e guard por alvo, com mensagem apenas após resposta. Falhas não deixam promise rejeitada. Signout limpa sessão/tenant mesmo offline. Estilos/CompanyNav/autorização/RLS/backend/policies preservados.

## Testes
Quatro novos casos de loading/vazio real, sucesso parcial, falhas/schema e dados/rotas reais. **27/27 UTC/São Paulo**, incluindo fatias anteriores. Nenhum claim de teste unitário provar guard, interação nativa ou isolamento backend; CI/HTTP/RLS/APK e dispositivo separados.

## Integração
Encadeado após #345. CI/APK desta fatia pendentes na abertura; exigir gates no head exato, retarget main após dependência, revisão reconciliada e pós-merge. Gate visual global OPEN; referência original recuperada, comparação navegada ainda necessária.
