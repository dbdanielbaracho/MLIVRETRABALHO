# Delta de requisitos — v1.60

| ID | Requisito | Implementação | Validação | Estado |
|---|---|---|---|---|
| UI-MOBILE-MEMBERS-TENANT-001 | Selecionar empresa de convite somente para token+empresa de origem ainda atuais e foco válido | persistExpectedTenant/saveTenantForContext/membros.tsx | 6 testes novos de concorrência/persistência;168 mobile UTC/SP | Branch; CI/APK próprios e taps pendentes |
| UI-MOBILE-MEMBERS-CONTEXT-002 | Não reaplicar listagem/revogação/código em sessão ou empresa alterada | headers antes/depois + geração/abort | Revisão estática; suíte anterior de membros preservada | Branch; validação nativa pendente |
| VISUAL-TRUTH | Cobertura completa de desenho original/dados/estados em dispositivo físico | Referência canônica preservada | Nenhuma prova física nova nesta fatia | OPEN |

Backend é autoridade sobre membership, papel e e-mail. Ack do aceite é distinto de persistência local. Não repetir aceite automaticamente; não alterar dinheiro/provider/RLS/dependências.
