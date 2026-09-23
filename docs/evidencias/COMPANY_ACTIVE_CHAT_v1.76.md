# Company Active Chat — v1.76

## Objetivo

Eliminar a assimetria de navegação do chat: o profissional já abria a conversa diretamente pela Agenda, enquanto a empresa não tinha um caminho equivalente para assignments ativos.

## Mudança mobile

`apps/mobile/app/empresa-inicio.tsx` agora:

- carrega `GET /v1/company/dashboard/assignments` junto com o dashboard e concluídos;
- mostra seção `Trabalhos ativos` com profissional, trabalho, local, status e início;
- obtém o tenant ativo do SecureStore;
- abre `/conversa` passando `assignmentId` e `tenantId` ao tocar `Abrir conversa`.

## Segurança e contrato

Nenhum endpoint novo de conversa foi criado. A tela reutiliza o contrato já protegido por assignment + tenant em `ConversationsController`.

A jornada HTTP existente já comprova:

- empresa envia mensagem ao profissional no assignment correto;
- profissional recebe e responde;
- notificações de nova mensagem são geradas;
- empresa de outro tenant recebe 404 ao tentar abrir a conversa.

## Limites

A mudança é somente de navegação/UX mobile. Não altera política de confirmação, Trust, pagamentos ou tenant isolation.

## Gate

Merge somente após frozen lockfile, typecheck, build, Expo Android export, testes, migration runner, jornadas HTTP (incluindo chat tenant-isolated) e Production Truth contract permanecerem verdes.
