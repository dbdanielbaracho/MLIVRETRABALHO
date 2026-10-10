# Atalhos reais do Perfil — v1.32

**Data:** 2026-10-09  
**Fonte:** main `1f40e9e0bcab3e302b3319652a8f030495d7ccde`, Documento v1.31, checkpoint, memória e código das três telas.

## Achado e correção
Em perfil.tsx, Disponibilidade e Notificações acionavam o painel genérico, embora disponibilidade.tsx já salve em /availability/mine e notificacoes.tsx já use /notifications/mine e marcação tenant-scoped. Corrigido somente o roteamento dos dois itens e acrescentado accessibilityRole=button ao menu. Layout, edição, Passport, termos, APIs e tenant permanecem iguais.

## Validação proporcional
Leitura das rotas de destino e revisão do diff; CI/typecheck/build/export e Standalone Pilot APK serão acompanhados no SHA exato antes do merge. Não há teste unitário novo que apenas copie o condicional de roteamento. A suíte de lógica da entrega anterior continua integrada ao CI. Smoke Android não prova navegação autenticada de todas as telas; device/Visual Truth continuam separados.

## Evidência anterior
#341 head `1a58d538b89269a89662cbf48ce12f3102293149`: CI `38006447169` e APK `38006447148` sucesso, incluindo smoke sem Metro. Merge `1f40e9e0bcab3e302b3319652a8f030495d7ccde`. Pós-merge `38012421142` (CI) e `38012421105` (APK) em andamento no registro inicial.

## Próximas lacunas comprovadas
Destino Disponibilidade: save sem catch/busy; destino Notificações: load sem loading/catch e lista vazia exibida antes da resposta. Não constituem dependência para corrigir links, mas permanecem trabalho interno seguro. Visual Truth Gate OPEN.
