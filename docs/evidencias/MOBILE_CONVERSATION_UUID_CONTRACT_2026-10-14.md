# Contrato UUID de conversas no mobile — 2026-10-14

## Escopo

Auditoria exclusiva de `dbdanielbaracho/MLIVRETRABALHO`; não pertence ao Creator Commerce OS.

## Falha reproduzida

O controller de conversas da API valida `assignmentId` com UUID antes de consultar o banco. O cliente mobile aceitava qualquer string não vazia em `routeId`, e testes com IDs textuais não representavam o contrato real. Assim, uma tela poderia tentar GET/POST de uma rota que a API rejeita deterministicamente.

## Correção e regressão

`routeId` agora aceita somente UUID canônico. Os testes de conversa e deadlines usam IDs UUID para fluxos válidos e verificam que texto, vazio e tipos inválidos são bloqueados antes de qualquer transporte. Payload, sessão, tenant/RLS, autorização, ACK, retry humano e notificações permanecem inalterados.

## Gates

Branch prevista: `fix/mobile-conversation-uuid-contract-20261014`. CI próprio, APK standalone aplicável, revisão, merge e pós-gates ainda pendentes. Não tratar `[]`, queued ou running como PASS e não emprestar artefato de outro SHA.
