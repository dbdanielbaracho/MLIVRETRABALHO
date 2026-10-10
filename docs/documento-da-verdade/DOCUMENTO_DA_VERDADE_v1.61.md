# MLIVRETRABALHO — Documento da Verdade v1.61

**Status:** NORMATIVO — DELTA SOBRE v1.60
**Data:** 2026-10-10

Preserva v1.60, React 19.1.4/RN 0.81.6/lockfile, tenant/RLS, referência visual original e standalone sem Metro. Visual Truth OPEN.

## Painel da Empresa: confirmação de avaliação e preferidos
Avaliação manual de trabalho concluído usa endpoint existente e score inteiro1–5. Só anuncia salva após resposta com ID real, score solicitado, comment null do pedido sem comentário e createdAt válido. Não exige assignmentId/tenantId que o controlador não devolve. Preferido só confirma professionalId e pool preferred iguais ao pedido real, inclusive inserção idempotente que retorna esse mesmo par.

HTTP 4xx é rejeição; rede/JSON/5xx/ack incompleto são resultado desconhecido. Guard por ação,15s/abort/foco e conta+tenant de origem são conferidos antes/depois. Sem POST automático. Atualizar painel é sempre explícito e disponível quando nenhuma ação está pendente; inclusão incerta orienta conferir em Talentos. Upserts e políticas atuais não mudam, nenhum pagamento/reputação automática nova.

## Identidade do painel e saída
GETs continuam independentes/parciais/loading/erro/vazio e só reaplicam dados na mesma identidade e empresa. Abrir conversa também confere contexto. Saída manual continua possível offline para a sessão solicitada, usando limpeza condicional serializada e confirmada de v1.59. Resposta antiga não apaga login novo; blur não redireciona. Falha local não anuncia saída concluída.

## Prova
8 testes novos;176/176 mobile locais UTC/São Paulo. Binding JSX/headers/foco/SecureStore revisado estaticamente. CI/APK próprios e pós-merge/taps físicos obrigatórios. Backend de avaliações/talent-pools, permissões, score e schema SQL intactos. Nenhuma avaliação/preferido/logout real executado. Visual Truth/piloto/pentest/providers/PSP/FIN-RISK/WEB-ARCH separados e abertos.
