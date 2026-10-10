# MLIVRETRABALHO — Documento da Verdade v1.55

**Status:** NORMATIVO — DELTA SOBRE v1.54
**Data:** 2026-10-10

Preserva v1.54/isolamento/RLS/React19.1.4/RN0.81.6/lockfile/referência original/standalone sem Metro. Visual Truth OPEN.

## Assistente: Notificações na navegação da conta autenticada
CopilotController já determina company/professional pelos memberships autenticados; a política deve encaminhar show_notifications company para /empresa-notificacoes (CompanyNav) e professional para /notificacoes (ProfessionalNav). Não inferir por texto, tenant salvo ou role enviada pelo cliente. Intenção/score/modo/execução proibida/controle humano e ferramentas permitidas preservados. Aceitar também plural normalizado notificacoes; a auditoria encontrou que notificações não era reconhecido pela substring singular notificacao.

Mobile valida accountType explícito e rota coerente; respostas sem contexto/rota oposta e company intent em professional são rejeitadas, sem ampliar navegação arbitrária. API unit de Copilot é incluída no runner existente, onde o arquivo anterior não era compilado/executado. HTTP E2E existente recebe asserções nas duas contas reais isoladas do teste.

## Prova e limites
1 teste mobile novo (126/126 locais UTC/São Paulo) +1 teste de política novo (5/5 local com adaptação apenas do import do teste para .ts no Node; compilação real em CI). Shell HTTP syntax verificado; E2E de API depende de CI/database, não executado localmente nem em produção. Evidência/ledger/memória/checkpoint neste ciclo. CI/APK head próprio e pós-merge obrigatórios; não usar gates dos pais #364/#365. Nenhuma ferramenta/ação crítica/PSP/custo habilitado. Visual Truth/aparelho/piloto/pentest/FIN-RISK/provider/WEB-ARCH separados.
