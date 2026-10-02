# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.20

**Status:** NORMATIVO — DELTA SOBRE v1.19  
**Data:** 2026-10-02

## 1. Regra de continuidade

A v1.20 preserva integralmente a v1.19, exceto pelo registro abaixo da auditoria visual baseada na baseline canônica já definida na v1.4.

## 2. Baseline visual recuperada e confirmada

A auditoria voltou à fonte correta do próprio MLIVRETRABALHO. A direção aprovada continua sendo:

**AI WORKFORCE NETWORK — Simples para usar. Seguro para todos.**

A baseline visual da v1.4 é especificação de implementação, com as quatro áreas principais:

- Profissional: **Início | Trabalhos | Ganhos | Perfil**.
- Empresa: **Início | Trabalhos | Equipe | Conta**.

O desenho canônico usa identidade visual roxa, hierarquia simples, cards e navegação principal compacta. Especificações escritas prevalecem sobre eventual erro textual de imagem gerada.

## 3. Divergência objetiva encontrada

Embora a hierarquia funcional de quatro áreas já estivesse corrigida na v1.19, os componentes de navegação ainda eram renderizados como quatro caixas genéricas, sem estado visual ativo e sem a identidade roxa da baseline.

Isso é uma divergência de fidelidade visual, não um novo requisito.

## 4. Correção desta etapa

Os componentes `ProfessionalNav` e `CompanyNav` passam a:

- preservar exatamente as quatro áreas canônicas;
- indicar visualmente a área ativa;
- aplicar a identidade roxa aprovada;
- reduzir ruído visual com uma superfície única e compacta;
- expor estado selecionado para acessibilidade.

Esta correção não altera APIs, regras de negócio, autenticação, React, React Native ou lockfile.

## 5. Limite da evidência

Esta etapa corrige a navegação visual comum, mas **não declara fidelidade visual completa do aplicativo**. Telas e estados da jornada continuam sujeitos a auditoria contra o layout canônico antes de o design ser declarado concluído.

O gate Android standalone sem Metro permanece obrigatório. React deve permanecer em 19.1.4, compatível com o runtime atual de React Native 0.81.6, e o lockfile deve permanecer reproduzível.
