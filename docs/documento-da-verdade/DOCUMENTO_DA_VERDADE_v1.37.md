# MLIVRETRABALHO — Documento da Verdade v1.37

**Status:** NORMATIVO — DELTA SOBRE v1.36  
**Data:** 2026-10-09

Preserva v1.36, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Agenda e ciclo real
Agenda antes exibia Trabalho confirmado para qualquer status; falha de GET virava mensagem de ausência/ficava sem catch/loading. Agora distingue loading/erro/vazio/sucesso e valida resposta, com retry/foco/timeout/guarda de resposta antiga; dados limpos no blur.

Badge corresponde a confirmed/checked_in/in_progress/checked_out/completed/cancelled; desconhecido não oferece ação. Próxima ação preserva endpoints e ciclo do backend. Avaliação da empresa aparece somente para completed; cancelado não vira confirmado ou rating elegível. Horários reais exibidos com assignmentSchedule já existente, sem inventar localização/distância/valor.

POST preserva x-tenant-id do item; guard por tenant/id evita ações simultâneas, mensagens tratam HTTP/rede/timeout e recarga confirma estado atual. Localização segue opcional/permissão do usuário, somente check-in/out; espera do GPS limitada em 15s após permissão, falha envia corpo vazio como antes. Não altera backend, autorização, ciclo, regras jurídicas/financeiras ou novos scores.

## Evidência
Quatro testes novos de resposta/tenant/status/ações/rating elegível; **31/31 locais UTC/São Paulo**. Unidade não prova toque/GPS/dispositivo/RLS real. CI/APK standalone no SHA exato e pós-merge exigidos. Evidência MOBILE_AGENDA_STATES_v1.37.md. Encadeada após #346.

#341 já passou pós-merge na main 1f40e9e0bcab3e302b3319652a8f030495d7ccde: CI 38012421142 e APK 38012421105 sucesso. Log DEVICE_SMOKE_OK metro_required=false, artefato 11654492684. Isso não fecha fidelidade visual global nem piloto/pentest físico.
