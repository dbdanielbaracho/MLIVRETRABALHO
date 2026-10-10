# MLIVRETRABALHO — Documento da Verdade v1.46

**Status:** NORMATIVO — DELTA SOBRE v1.45
**Data:** 2026-10-09 (verificação UTC 2026-10-10)

Preserva v1.45, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Publicação de trabalho: confirmação real e resultado desconhecido
Empresa preserva validação de data/horários locais, turno noturno/horários iguais, valor em centavos e campos obrigatórios. POST company/jobs tem timeout de 15s e guard síncrono; inputs ficam bloqueados durante envio. Tenant ativo é obrigatório. Sucesso só é mostrado e formulário só é limpo após ack de ID não vazio, título/cidade, status open, valor e instantes solicitados. Formatos ISO equivalentes são aceitos.

HTTP 4xx preserva dados e mostra rejeição. Timeout, rede, 5xx, JSON incompleto ou ack incompatível são resultado desconhecido: não inventam sucesso e não repetem automaticamente POST não idempotente. Link manual para Planejamento permite conferir os trabalhos existentes antes de tentar novamente; não é criada nova API/política ou aprovação.

## Provas e limites
Quatro testes novos; 73/73 em UTC e America/Sao_Paulo. Verificam payload/instantes reais, ack incorreto, rejeição distinta de falha e exatamente uma chamada em perda de resposta. Contrato CompanyJobCreateController relido no head #355. Styles/nav, backend/RLS, React 19.1.4/RN 0.81.6 e lockfile preservados. CI/APK no head exato e pós-merge ainda obrigatórios; teste de unidade não fecha Visual Truth.

## Fila verificada
Main aee58e7776eee0dc211713edcbe29075f841ecb1 pós-merge CI/APK sucesso. #348 head 4b1cb40d093acc578da1629388c260889bedb0f7 CI 38014454751/APK 38014454871 sucesso. #355 head 05e2c7e6cf4ea8ef1c7553e2f9928af3b6a25d71 CI 38015874275 sucesso/APK 38015874364 em execução.

#343 run APK 38014252773 tentativa2, #349 run 38014598041 tentativa2 e #350 run 38014796852 tentativa2 em acompanhamento. Nos três, tentativa1 compilou APK mas emulador falhou input/settings Broken pipe exit224 antes do script do projeto: não é app crash comprovado nem autorização para ignorar smoke. Retry controlado no mesmo SHA, sem bypass.

Próxima ação: acompanhar e diagnosticar retries, integrar em sequência com revisão/gates exatos e pós-merge. Inspecionar jornadas restantes contra desenho original, sem abrir tarefas artificiais ou declarar conclusão por ausência de issues.
