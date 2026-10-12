# Web — ACK contratual de substituições — 2026-10-12

## Reprodução
Fonte real do PR496 (page.tsx) e contratos ReplacementController.create/select foram reconsultados. Dois testes de handler pré-JSX reproduziram RED: criação com {id:'fake'} substitui seleção atual por 'fake'; seleção com assignmentId:'fake' limpa seleção e incrementa refresh. Controle positivo legítimo passou: RED1PASS/2FAIL. Hooks/setters/transporte são fixtures determinísticas, sem browser/React render/SQL/prod/físico.

## Contrato e correção
Criação da API retorna id UUID, assignmentId igual ao enviado, status open. Seleção retorna replacementRequestId exato, professionalId exato, replacedAssignmentId do pedido exibido, assignmentId UUID diferente do original e status matched. A UI agora valida apenas esses campos do contrato antes de publicar seleção/clear/refresh. O ID original é capturado do pedido mostrado antes do await. Não inventar status ou aceitar um assignment próprio como substituto.

Falha de ACK mantém seleção atual e revision; mensagem orienta Atualizar dados e conferir pedidos antes de novo envio. Não declara ausência de escrita e não repete POST automaticamente. Guardas de sessão/token/tenant/role/unmount são aplicadas antes de validar/publicar ACK; erros HTTP explícitos e payloads/métodos/headers permanecem intactos. Backend/tenant/RLS/idempotência/matching/notifications/finanças não mudam.

## Testes
Seis testes novos: dois RED comportamentais; sucesso legítimo e payloads; schema UUID/binding; HTTP400/401/403/409/429/500; perda de transporte/JSON uma chamada. Suite local completa71/71PASS, incluindo os65 testes anteriores/tenant reset. Nenhum assert anterior retirado. CI novohead obrigatório, esperado71Web/731Mobile/385API/3CLI/10monitor=1200 + todossteps/HTTPPostgres. APK N/A somente por identidade de árvore dos inputs protegidos.

## Predecessor496
Merge107cfb3a81487d37f78e3176cd1dd9d567719d6c, pais[345419b077571e0ebfa3337ff24edfa522aea03c,2a54965f96bfd6af56e091424bbbe1b738c4015f], tree d15fe502bd292102027b60945683f28298723415 igualcandidata/main. OwnCI38266180060/job114868804284 SUCCESS1194testes/todossteps/HTTPPostgres. PostCI38266743335 ainda emexecução neste snapshot, não PASS; acompanhar antes de integrar estePR. Recibosfinais no corpoPR após prova primária.

Documento ORIGINAL/memória/checkpoint/ledger/registry preservados por apêndice no mesmo ciclo. Físico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSPKYC/FINRISK/WebpagoOPENseparados. Semcusto/produção/serviços/credenciais/PSP/dinheiroreal/contrato inventado. Projeto não concluído por teste/zeroPR.
