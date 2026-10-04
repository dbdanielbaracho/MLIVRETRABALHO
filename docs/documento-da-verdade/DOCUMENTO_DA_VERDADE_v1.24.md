# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.24

**Status:** NORMATIVO — DELTA SOBRE v1.23  
**Data:** 2026-10-03

## Continuidade
A v1.24 preserva integralmente a v1.23 e fecha a divergência registrada no Início da Empresa sem remover capacidades.

## Contexto certo na hora certa — Empresa
A tela **Início** deixa de expor doze atalhos administrativos simultaneamente e passa a priorizar três ações diretamente ligadas ao estado operacional: **Publicar trabalho**, **Ver interessados** e **Assistente**.

As capacidades existentes são preservadas e contextualizadas:
- **Equipe** concentra acesso a Talentos e Substituições;
- **Conta** concentra Membros e convites, Pagamentos e faturas, Planejamento, Indicadores, Segurança e Privacidade;
- **Trabalhos** permanece a área de publicação;
- o dashboard, trabalhos ativos, conversa, avaliação e preferidos permanecem no Início.

A mudança aplica a baseline “visão geral do que importa”, “menos telas, menos cliques” e “contexto certo na hora certa” sem alterar APIs, contratos ou regras de negócio.

## Gates
React permanece **19.1.4**, React Native **0.81.6** e o lockfile não é alterado. CI e **Standalone Pilot APK / Android standalone sem Metro** continuam obrigatórios antes do merge.

A fidelidade visual total do aplicativo ainda depende da auditoria dos fluxos de estado e da navegação física no dispositivo.
