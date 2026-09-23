# Mobile Auth Entry v1.68

## Objetivo
Remover fricção no primeiro uso do app mobile, impedir que uma pessoa sem sessão caia diretamente em telas operacionais e garantir saída segura da conta.

## Implementação
- `apps/mobile/app/index.tsx` consulta a sessão armazenada no `expo-secure-store`.
- Com sessão e tenant selecionado, o app direciona para `/empresa-inicio`.
- Com sessão sem tenant selecionado, o app direciona para `/trabalhos`.
- Sem sessão, a tela inicial mostra apenas ações claras para `Entrar` ou `Criar conta`.
- `criar-conta.tsx` valida os campos mínimos antes do request e direciona para `/entrar` após cadastro bem-sucedido.
- Perfil profissional e painel da empresa oferecem `Sair da conta`.
- O logout chama `/v1/auth/signout` para revogar a sessão no backend e, em seguida, limpa token e tenant do `expo-secure-store`. A limpeza local acontece mesmo se a chamada de rede falhar.
- Nenhum token, senha ou segredo foi incluído no código.

## Evidência
- PR #197.
- CI #520: SUCCESS.
- Merge: `67340a0bb845d448a5e9f5a96ff0a2d7510adea6`.
- O CI incluiu typecheck, build, Expo Android export real, testes, migration runner, jornadas HTTP e Production Truth contract.

## Limite
O Expo Android export comprova compatibilidade de bundle, mas não substitui device E2E em aparelho físico.
