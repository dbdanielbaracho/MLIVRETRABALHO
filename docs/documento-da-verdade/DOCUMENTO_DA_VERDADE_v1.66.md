# MLIVRETRABALHO — Documento da Verdade v1.66

**Status:** NORMATIVO — DELTA SOBRE v1.65
**Data:** 2026-10-10

Preserva v1.65, desenho original, React19.1.4/RN0.81.6/lockfile, tenant/RLS, Android standalone semMetro. Visual Truth OPEN.

## Ganhos e Conversa vinculados à origem
Ganhos usa Authorization única sem tenant selecionado, conferindo a mesma sessão/foco antes/depois; todas requisições, inclusive retry manual, abortam/invalidam ao sair. Resposta antiga não mostra ledger de outra conta. Cálculo semanal, gráfico, valores/estados reais, multi-company e profissionalNav preservados, sem escrita no ledger/policy financeira.

Conversa mantém assignmentId/tenantId explícitos da rota e mesma identidade que carregou a conversa. GET e POST não iniciam após foco/timeout/identidade obsoletos e conferem identidade após resposta. Só ACK real/mesma sessão limpa draft/confirma envio. Perda de resposta na mesma conta preserva texto e pede conferência; troca de conta limpa draft antigo/invalidalista. Releitura após envio continua GET na identidade original, sem mensagem repetida automaticamente. Falhas403/404, mensagens vazias reais e acesso backend/membership/RLS permanecem diferenciados. ID/assignment em branco e texto em branco não chegam a transporte; IDs de mensagem/remetente em branco não são schema válido. ACK não exige senderIdentityId, pois POSTbackend retorna apenas id/body/createdAt.

## Provas e limites
6novos/204mobilelocaisUTCSP; controladores/contratos atuais lidos e UIrevisada estaticamente. Próprio CI/APK e pós-merge obrigatórios. #376CI confirma198mobile/typecheck/HTTP no SHA exato; APK ainda emexecução. Journal0801Z registra main/PRs/runs/retomada; não aprova run370histórico por outro SHA. Nenhuma operação/mensagem real/pagamento/provider/custo/deploypago. VisualTruth/piloto/pentest/PSP/FIN-RISK/WEB-ARCH separadosOPEN.
