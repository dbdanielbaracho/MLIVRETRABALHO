# Reconciliação da matriz de aceite das 13 áreas — 2026-10-14

## Objetivo

Corrigir uma inconsistência documental encontrada na auditoria: a matriz `13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md` ainda apontava a base `afe80cb29ed7d6dd754e790ac6ac7cbea33c89dc`, enquanto a main verificada nesta rodada era `bf65dc52d0ab8f493b7265cb50e1722d53df4c4e`. O texto histórico foi preservado; uma seção de estado corrente foi anexada e a base temporal foi explicitamente supersedida.

## Evidência verificada

- Main: `bf65dc52d0ab8f493b7265cb50e1722d53df4c4e`.
- PRs abertos: zero na consulta desta rodada.
- #522 merged: `a52b3e7374ddbae3cd3c0556a4f53a18dd136239`.
- #523 merged: `400b56861c41a656bbdbd6e6d79d56944c73519d`; contrato UUID mobile de conversa; CI/APK próprios e pós-merge documentados como SUCCESS nos SHAs exatos.
- #524 merged: `bf65dc52d0ab8f493b7265cb50e1722d53df4c4e`; recibo documental dos cinco documentos originais e evidência #523; CI próprio `38524643905`, pós-CI `38525021106`, Activity Watch `38525020959`, todos SUCCESS; APK N/A por identidade dos insumos protegidos.
- Auditoria funcional: `bootstrapTenant` existe em `apps/mobile/lib/bootstrap.ts`, mas não foi encontrada referência no conjunto de telas/componentes/libs auditado; por isso não foi aberta correção especulativa.

## Limites

Esta reconciliação não marca nenhuma das 13 áreas como aceita. Não converte emulador em teste físico, não resolve #215/#219/#220/#224/#228, não executa produção/Railway/PSP e não cria custo. Próxima rodada deve revalidar a main e escolher somente uma lacuna interna reproduzível.
