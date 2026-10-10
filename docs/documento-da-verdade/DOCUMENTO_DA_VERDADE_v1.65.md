# MLIVRETRABALHO — Documento da Verdade v1.65

**Status:** NORMATIVO — DELTA SOBRE v1.64
**Data:** 2026-10-10

Preserva v1.64, referência original, React19.1.4/RN0.81.6/lockfile, tenant/RLS e Android standalone semMetro. VisualTruth OPEN.

## Notificações: origem e leitura confirmadas
Notificações profissionais mantêm GET sem tenant selecionado para agregar memberships; notificações empresariais exigem o tenant real selecionado e validam todos itens contra ele. Authorization/foco são conferidos antes/depois via runForSession e o leitor de contexto captura/confere tenant em ambas leituras da empresa. Resposta antiga ou empresa trocada não reaplica lista/confirma leitura. Guards síncronos, 15s/abort/geração e atualizações manuais permanecem.

Marcar lida usa exatamente notificationId/tenantId reais da lista, bodyless no endpoint existente; valida ACKid/readAtreal. HTTP4xx/rejeição distinto de rede/5xx/JSON/ACKnulo desconhecidos, sem POST repetido automaticamente. Só recarrega automaticamente depois de ACK/contexto verificados. Botão de atualização permite conferir resultado incerto. ID/tenant vazio ou timestamps inválidos permanecem erro, sem lista vazia fictícia. Professional GET ignora empresa selecionada local, POST usa tenant do item; CompanyNav/ProfessionalNav e estilos originais preservados. Backend requireMembership/identity/RLS/COALESCE idempotente intactos.

## Evidência e limites
7novos/198mobilelocaisUTCSP; APIs/baselinesreconsultados. CI/APKpróprioe pós-merge obrigatórios, fixture não é aparelho. #375CI confirma191mobile+3regressões+jornadaHTTP/ProductionTruth novoSHA; run370antigo continuaFAILUREdiagnosticado, semretrycego. Journal0756Z registra main/gates/pós-runs/checkpoint. VisualTruth/piloto/pentest/providers/PSP/FIN-RISK/WEB-ARCH separadosOPEN. Nenhuma açãoreal/deploypago/custonovo.
