# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.27

**Status:** NORMATIVO — DELTA SOBRE v1.26  
**Data:** 2026-10-09

## Continuidade
A v1.27 preserva integralmente a v1.26 e registra a correção objetiva identificada no Visual Truth Gate da tela **Ganhos**, além do endurecimento do gate Android standalone necessário para validar a mudança com confiabilidade.

## Ganhos — legibilidade do gráfico semanal
As etiquetas dos dias no gráfico semanal da tela **Ganhos** passam de `#EDE8FF` para `#65708A` sobre fundo branco. A alteração restaura contraste e leitura sem mudar hierarquia, conteúdo, interação ou regra de negócio.

A mudança não cria novas rotas, não altera endpoints, autenticação, regras de negócio ou transições de estado.

## Gate Android standalone
O workflow **Standalone Pilot APK / Android standalone sem Metro** passa a aguardar explicitamente a disponibilidade do PackageManager e do provedor de configurações do Android após a inicialização do emulador. As sondagens têm tempo máximo definido para impedir espera indefinida.

Falhas internas transitórias do emulador hospedado devem ser distinguidas de falhas do aplicativo. A aprovação continua exigindo instalação do APK, abertura sem Metro, processo ativo e ausência dos padrões fatais verificados no logcat.

## Evidência
- PR: [#333](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/333).
- Merge validado: `cb7b689983976255798af661ca2e59a2d4c738c0`.
- CI do PR: run `37972636600`, concluído com sucesso.
- Standalone Pilot APK do PR: run `37972636568`, tentativa 2, concluída com sucesso.
- Registro detalhado: `docs/evidencias/MOBILE_VISUAL_AUDIT_GANHOS_v1.27.md`.

## Gates remanescentes
React permanece **19.1.4**, React Native **0.81.6** e o lockfile não foi alterado.

Esta versão fecha somente a divergência de contraste das etiquetas do gráfico de Ganhos. A fidelidade visual total continua sujeita à auditoria das telas e estados restantes e à navegação física no dispositivo quando aplicável. Permanecem separados os gates externos de dispositivo/piloto, pentest, PSP/KYC/sandbox, WEB-ARCH e custos/deploy.
