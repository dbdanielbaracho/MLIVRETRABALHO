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


## Apêndice — Recibo final PR #523 — 2026-10-14

- **Escopo exclusivo:** `dbdanielbaracho/MLIVRETRABALHO`; não pertence ao Creator Commerce OS.
- **Correção:** contrato UUID de `assignmentId` e `tenantId` nas conversas mobile, com fixtures canônicas nos testes de leitura/envio/deadline; payload, sessão, tenant/RLS, autorização, ACK, retry humano e notificações preservados.
- **Merge real:** PR #523 → `400b56861c41a656bbdbd6e6d79d56944c73519d`; pai ordenado `a52b3e7374ddbae3cd3c0556a4f53a18dd136239`; árvore `382ed386693865c3e5d32e60e0925f96cc288bbe); `main` confirmada nesse SHA.
- **CI próprio:** run `38513161396`, job `115686011380`, HEAD `8546f9dd418060486f41add0697e3604f3362dd1`, SUCCESS em todos os passos.
- **APK próprio:** run `38513161246`, job `115686010569`, mesmo HEAD, SUCCESS; instalação e `DEVICE_SMOKE_OK` sem Metro; artefato ZIP `11871155950`, 28.910.983 bytes, não expirado, digest `sha256:00afb8f4a140155de174dcc11faddf453118d848cb3ceb8dedcfe85eb79e22f2`.
- **Pós-merge CI:** run `38518567344`, job `115702805508`, SHA real `400b56861c41a656bbdbd6e6d79d56944c73519d`, SUCCESS em todos os passos.
- **Pós-merge APK:** run `38518567348`, job `115702805484`, SHA real, SUCCESS; instalação e `DEVICE_SMOKE_OK` sem Metro; artefato ZIP `11872998610`, 28.910.975 bytes, não expirado, digest `sha256:cbf616843698320de5d6295305694bf584ac20a454bcb904579c5a73ee9c391b`.
- **Activity Watch pós-merge:** run `38518567323`, job `115702805592`, SUCCESS.
- **Limites:** emulador/standalone não é aceite de dispositivo físico; este recibo não declara aceite integral das 13 áreas nem encerra os gates externos.

