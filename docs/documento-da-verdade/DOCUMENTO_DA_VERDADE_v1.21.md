# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.21

**Status:** NORMATIVO — DELTA SOBRE v1.20  
**Data:** 2026-10-02

## Continuidade
A v1.21 preserva integralmente a v1.20, acrescentando evidência da auditoria das telas principais do profissional.

## Auditoria visual — Profissional
A comparação do código em `main` com o layout canônico recuperado na v1.4 confirmou que a hierarquia funcional estava correta, mas as telas ainda usavam superfícies brancas e bordas genéricas sem reproduzir a identidade visual aprovada.

Nesta etapa, sem alterar regras de negócio:
- Início profissional recebe fundo neutro, hierarquia de texto, cards e destaque roxo para a ação primária;
- Trabalhos recebe cards em superfície própria, destaque roxo para ação e assistente, preservando a decisão simples em uma ação;
- a navegação canônica da v1.20 permanece inalterada;
- nenhuma API, fluxo de autenticação ou contrato de dados é alterado.

## Gates preservados
React permanece em **19.1.4** com React Native **0.81.6**. O lockfile não é alterado. CI e **Standalone Pilot APK / Android standalone sem Metro** continuam obrigatórios antes do merge.

## Limite
Esta etapa não declara o design completo. Ganhos, Perfil e as telas da Empresa permanecem na fila de auditoria visual contra a mesma baseline.
