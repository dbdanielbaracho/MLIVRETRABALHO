# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.23

**Status:** NORMATIVO — DELTA SOBRE v1.22  
**Data:** 2026-10-02

## Continuidade
A v1.23 preserva integralmente a v1.22 e registra a primeira reconciliação visual das quatro áreas principais da Empresa.

## Auditoria visual — Empresa
A baseline canônica exige **Início | Trabalhos | Equipe | Conta**, identidade roxa, cards, hierarquia simples e ações contextualizadas. O código já preservava as quatro áreas e as funções reais, mas as telas ainda apresentavam controles e superfícies genéricos.

Sem alterar APIs, regras de negócio ou contratos:
- **Início** recebe superfícies neutras, cards e destaques roxos;
- **Trabalhos** recebe campos coerentes e CTA primário roxo para publicação;
- **Equipe** passa a distinguir seleção, cards e ações pela identidade canônica;
- **Conta** organiza administração e proteção em cards coerentes.

## Divergência ainda aberta
O Início da Empresa ainda expõe muitas ações administrativas simultaneamente. A baseline pede “visão geral do que importa” e “contexto certo na hora certa”. A reorganização dessas ações deve preservar integralmente a funcionalidade e será tratada separadamente, com rastreabilidade, para evitar remoção acidental de capacidades.

## Gates
React permanece **19.1.4**, React Native **0.81.6** e o lockfile não é alterado. CI e **Standalone Pilot APK / Android standalone sem Metro** continuam obrigatórios antes do merge.

Esta versão não declara fidelidade visual total do aplicativo.
