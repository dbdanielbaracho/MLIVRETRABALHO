# Requirements Ledger — delta v1.59

| Requisito | Código/prova | Estado |
|---|---|---|
| Perfil real/PUT confirma ID e campos antes de limpar rascunho | professional-profile.ts/profile-submit.ts/perfil.tsx;6 testes novos | Branch; CI/APK/taps pendentes |
| Leitura/save de perfil na mesma sessão/foco; dados antigos limpos após troca | Header snapshot/epoch/abort/dirty owner; revisão estática | Não fecha Visual Truth físico |
| Saída antiga não remove sessão nova | session-transaction.ts/session.ts/Perfil/Empresa/Privacidade;4 testes novos |162 locais; SecureStore nativo/gates próprios pendentes |
| Desativação mantém humano/ack/3bloqueios e distingue erro local | Backend inalterado; clear condicional após ack | Nenhuma operação real; retenção/provider separados |
| Próxima auditoria: Painel/Agenda/Membros ações | Código já observado; revalidar controller/ack/sessão | Pendência concreta separada |
