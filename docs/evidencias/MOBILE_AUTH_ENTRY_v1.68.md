# Mobile Auth Entry v1.68

## Objetivo
Remover fricção no primeiro uso do app mobile e impedir que uma pessoa sem sessão caia diretamente em telas operacionais.

## Implementação
- `apps/mobile/app/index.tsx` consulta a sessão armazenada no `expo-secure-store`.
- Com sessão e tenant selecionado, o app direciona para `/empresa-inicio`.
- Com sessão sem tenant selecionado, o app direciona para `/trabalhos`.
- Sem sessão, a tela inicial mostra apenas ações claras para `Entrar` ou `Criar conta`.
- `criar-conta.tsx` valida os campos mínimos antes do request e direciona para `/entrar` após cadastro bem-sucedido.
- Nenhum token, senha ou segredo foi incluído no código.

## Gate
A mudança só pode ser integrada após o CI completo, incluindo typecheck, build, Expo Android export real, testes, migration runner, jornadas HTTP e Production Truth contract.

## Limite
O Expo Android export comprova compatibilidade de bundle, mas não substitui device E2E em aparelho físico.
