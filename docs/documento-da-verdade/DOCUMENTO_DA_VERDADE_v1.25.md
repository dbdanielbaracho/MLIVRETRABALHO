# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.25

**Status:** NORMATIVO — DELTA SOBRE v1.24  
**Data:** 2026-10-04

## Continuidade
A v1.25 preserva integralmente a v1.24 e registra a reconciliação visual do fluxo contextual do trabalho profissional.

## Fluxo profissional contextual
A jornada existente permanece: **Confirmado → Check-in → Em andamento → Check-out → Concluído**.

Na tela de agenda/próximo trabalho, a ação correspondente ao estado atual passa a ser a ação primária visual. Conversa e Segurança permanecem disponíveis como ações secundárias, sem competir com o próximo passo operacional. O estado concluído mantém a avaliação da empresa.

A mudança não altera endpoints, transições de estado, localização opcional, contratos de API ou regras de negócio. Também adiciona rolagem para suportar dispositivos físicos menores.

## Gates
React permanece **19.1.4**, React Native **0.81.6** e o lockfile não é alterado. CI e **Standalone Pilot APK / Android standalone sem Metro** continuam obrigatórios antes do merge.

A fidelidade visual total continua sujeita à auditoria dos demais fluxos e à navegação física no dispositivo quando aplicável.
