# Estados reais de Disponibilidade e Notificações — v1.33

**Data:** 2026-10-09  
**Fonte:** main `1f40e9e0bcab3e302b3319652a8f030495d7ccde`, código dos destinos e Documentos v1.31/v1.32.

## Achados comprovados
Disponibilidade: save sem catch/busy, rejeição offline não tratada. Notificações: lista inicial vazia sem loading/erro; falha de HTTP/rede indistinguível de ausência; marcação não verifica sucesso. Ambas exibiam navegação no conteúdo sem rolagem.

## Correção
Disponibilidade preserva POST/payload/calendário local, bloqueia submissão simultânea e edição durante envio, mantém campos nos erros e limpa apenas no sucesso; timeout de 15s. Notificações distingue loading/erro/vazio com validação da resposta e retry, recarrega no foco e ignora resposta antiga. Read mantém x-tenant-id do item e só recarrega após HTTP sucesso; guard por tenant/id e tratamento de falha. Rolagem com barra inferior fora do conteúdo; estilos existentes preservados.

## Testes
- Três testes de disponibilidade: instante local/payload, noite/virada de ano/horários iguais, calendário impossível/horário inválido/leap year.
- Três testes de notificações: sucesso vazio vs HTTP/rede/JSON/schema inválido, preservação de itens multiempresa/readAt, retry com dados reais.
- Mais oito testes de Início: total **14/14**, UTC e America/Sao_Paulo.
- Nenhum teste novo é apresentado como prova de interação nativa, guard de toque, aparência ou navegação física. Estes continuam dependentes de validação específica.

## Integração
Branch `fix/professional-secondary-network-states` parte do head do #342, para preparar trabalho independente durante seus gates. PR deve ser integrado somente após #342, diff reconciliado contra main e gates aprovados no head exato. CI/APK desta fatia ainda não foram executados no registro inicial. #341 CI pós-merge 38012421142 sucesso; APK 38012421105 em andamento. Visual Truth Gate OPEN.
