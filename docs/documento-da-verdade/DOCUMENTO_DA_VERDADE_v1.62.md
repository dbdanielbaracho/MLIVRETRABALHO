# MLIVRETRABALHO — Documento da Verdade v1.62

**Status:** NORMATIVO — DELTA SOBRE v1.61
**Data:** 2026-10-10

Preserva v1.61, React 19.1.4/RN 0.81.6/lockfile, tenant/RLS, referência original, APK standalone sem Metro. Visual Truth OPEN.

## Agenda: transição comprovada e sessão de origem
As ações manuais existentes continuam sendo check-in, início, check-out, conclusão e avaliação da empresa. Só confirmam sucesso após resposta real com ID do assignment e status resultante esperado; check-in/out/conclusão também exigem seu timestamp retornado válido. Início não exige timestamp que o backend não fornece. Avaliação exige ID real da avaliação, score solicitado1–5, comment null e createdAt válido. Backend, sequência de estados, role/membership, geração de ledger e política financeira não mudam.

GET e POST conservam snapshot Authorization da lista. A mesma sessão é conferida antes de pedir localização, depois da permissão/localização e após resposta, com foco/geração/abort/15s. A rota tenant vem do assignment real retornado, mantendo trabalhos de múltiplas empresas. Resposta antiga não reaplica dados/navega após mudança de conta ou blur. Guard síncrono por assignment evita envio simultâneo.

HTTP4xx/rejeição é distinto de resultado desconhecido em rede/JSON/5xx/ack inválido. Atualizar trabalhos é ação de leitura explícita; nenhum POST automático ou conclusão presumida em resultado incerto.

## Localização e navegação
Permissão continua opcional, somente foreground e precisão Balanced. Recusa/falha usa corpo vazio para check-in/out, sem coordenada inventada; zero é coordenada válida. Pares/faixas inválidos não são enviados. Mensagem distingue Localização enviada de ausência; não promete coordenadas ecoadas/presença física verificada, pois o contrato não as devolve. Start/complete continuam bodyless.

Conversar e Segurança conferem sessão de origem antes de abrir a rota do assignment. Sem novo enforcement, rastreamento em background ou autorização financeira.

## Evidência e limites
7 novos testes;183/183 mobile locais UTC/São Paulo. Contratos/controller e binding UI/foco/permissão revisados estaticamente, sem taps/aparelho reais. CI/APK próprio e pós-merge obrigatórios. Nenhum check-in/out, conclusão, avaliação ou localização real executado pelo agente. Visual Truth, piloto/pentest, providers/PSP/FIN-RISK e WEB-ARCH separados e abertos.
