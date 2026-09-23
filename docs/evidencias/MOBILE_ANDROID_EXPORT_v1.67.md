# Mobile Android export v1.67

## Problema observado
O gate experimental do PR #192 executou `expo export --platform android` e falhou no Codegen dentro de `react-native-screens@4.28.0`, em `SearchBarNativeComponent.ts`, porque o parser do React Native 0.81 rejeitou a assinatura encontrada nessa versão.

## Causa
O projeto usa Expo SDK 54 / React Native 0.81 / React 19.1. Sem lockfile, a resolução transitiva instalou `react-native-screens@4.28.0`. A documentação do Expo SDK 54 recomenda `react-native-screens ~4.16.0` para esse SDK.

## Correção
- adicionar `react-native-screens: ~4.16.0` explicitamente ao package mobile;
- adicionar script `export:android`;
- CI passa a executar um export Android real e exige arquivos no diretório de saída;
- todo o restante da suíte continua obrigatório depois do export.

## Limite da prova
Export/bundle Android verde prova compatibilidade de bundling do aplicativo, mas não substitui instalação nem E2E em aparelho físico. Device E2E continua pendente até existir um runner/device adequado.
