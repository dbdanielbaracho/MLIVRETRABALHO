# Contrato UUID de conversas no mobile — 2026-10-14

## Escopo

Auditoria exclusiva de `dbdanielbaracho/MLIVRETRABALHO`; não pertence ao Creator Commerce OS.

## Falha reproduzida

O controller de conversas da API valida `assignmentId` com UUID antes de consultar o banco. O cliente mobile aceitava qualquer string não vazia em `routeId`, e testes com IDs textuais não representavam o contrato real. Assim, uma tela poderia tentar GET/POST de uma rota que a API rejeita deterministicamente.

## Correção e regressão

`routeId` agora aceita somente UUID canônico. Os testes de conversa e deadlines usam IDs UUID para fluxos válidos e verificam que texto, vazio e tipos inválidos são bloqueados antes de qualquer transporte. Payload, sessão, tenant/RLS, autorização, ACK, retry humano e notificações permanecem inalterados.

## Gates

Branch prevista: `fix/mobile-conversation-uuid-contract-20261014`. CI próprio, APK standalone aplicável, revisão, merge e pós-gates ainda pendentes. Não tratar `[]`, queued ou running como PASS e não emprestar artefato de outro SHA.


- **Correção de gate 2026-10-14:** o CI próprio `38507724368` passou typecheck, build e export, mas o teste mobile terminou com 24 falhas porque `routeId` também valida o `tenantId` selecionado na rota; as fixtures ainda usavam `tenant-a`, `tenant-b` e `fixture-tenant`. Esses valores foram alinhados a UUIDs canônicos no novo HEAD. A validação não foi relaxada e o APK anterior não autoriza merge.
