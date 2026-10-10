# MLIVRETRABALHO — Documento da Verdade v1.36

**Status:** NORMATIVO — DELTA SOBRE v1.35  
**Data:** 2026-10-09

Preserva v1.35, referência original e continuidade v1.30. Visual Truth Gate OPEN.

## Painel Empresa: fatos e estados
CompanyDashboardController lido: contagens são por estado em toda a operação, sem filtro de dia. Subtitle “Resumo da sua operação hoje” passa a “Resumo da sua operação”, sem mudar API/regra.

Dashboard/ativos/concluídos têm loading/erro/vazio/sucesso independentes. Falha de uma seção não apaga sucesso das demais; resposta inválida não vira zero/lista vazia. Retry, recarga no foco, timeout 15s e proteção contra resposta antiga; dados de contexto antigo limpos ao sair do foco.

Headers autenticados continuam fornecendo x-tenant-id; ID usado na conversa vem dos mesmos headers da leitura, evitando segunda consulta divergente. Ações existentes (rating/preferred) impedem repetição simultânea, verificam empresa ativa antes de POST, tratam HTTP/rede/timeout e só mostram sucesso depois HTTP ok. Signout mantém limpeza local offline com timeout. Sem alterar scores/policies/backend, contratos, CompanyNav, estilos, dependências ou lockfile.

## Evidência e integração
Quatro testes novos de resposta/vazio, sucesso parcial, HTTP/rede/JSON/schema e registros reais; **27/27 locais UTC/São Paulo**. Unidade não prova tenant authorization real nem taps, guard, foco ou UI; CI mantém testes backend/RLS e APK standalone sem Metro, gates exatos/pós-merge. Evidência MOBILE_COMPANY_STATES_v1.36.md. Integração encadeada após #345 corrigido; não merge com gate falho/pendente.

## Continuidade
Próxima revisão concreta: Trabalhos carrega apenas na montagem e requests sem timeout, apesar de erros/retry já implementados. Conferir atualização ao recuperar foco e estados de oportunidades/agenda contra APIs/desenho original, sem inventar dados ou task. Device/piloto/provider/WEB-ARCH permanecem por item, não encerram projeto.
