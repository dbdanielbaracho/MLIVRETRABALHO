# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.26

**Status:** NORMATIVO — DELTA SOBRE v1.25  
**Data:** 2026-10-04

## Continuidade
A v1.26 preserva integralmente a v1.25 e fecha a divergência de posicionamento da navegação primária nas oito áreas canônicas do aplicativo.

## Navegação primária inferior
As quatro áreas do Profissional permanecem **Início | Trabalhos | Ganhos | Perfil** e as quatro áreas da Empresa permanecem **Início | Trabalhos | Equipe | Conta**.

Nas oito telas canônicas, a navegação primária passa a ficar fora da área rolável de conteúdo e no final da tela, preservando o estado ativo, a identidade roxa e a acessibilidade já existentes. O conteúdo continua rolável de forma independente.

A mudança não cria novas rotas, não altera endpoints, autenticação, regras de negócio ou transições de estado.

## Gates
React permanece **19.1.4**, React Native **0.81.6** e o lockfile não é alterado. CI e **Standalone Pilot APK / Android standalone sem Metro** continuam obrigatórios antes do merge.

A fidelidade visual total continua sujeita à auditoria dos fluxos restantes e à navegação física no dispositivo quando aplicável.
