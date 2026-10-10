# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.33

**Status:** NORMATIVO — DELTA SOBRE v1.32  
**Data:** 2026-10-09

## Continuidade
Preserva a v1.32 e a regra permanente de continuidade da v1.30. Visual Truth Gate **OPEN**. Este delta corrige falhas concretas dos destinos acessíveis pelo Perfil, sem criar backend ou reinterpretar o desenho canônico.

## Disponibilidade
POST /availability/mine preserva autenticação, payload e conversão local de DD/MM/AAAA e HH:MM. A validação existente foi extraída para teste: datas impossíveis rejeitadas, turno noturno e horários iguais terminam no dia seguinte. O texto de ajuda passa a descrever também o caso de igualdade já existente.

O salvamento impede submissão simultânea, mostra busy e bloqueia edição durante envio. HTTP/rede/timeout exibem erro honesto e mantêm os campos; somente sucesso limpa os dados. Timeout de 15 segundos. Conteúdo rolável e barra inferior fora da rolagem.

## Notificações
GET /notifications/mine distingue loading, erro e sucesso vazio; HTTP/rede/JSON/payload inválido não viram “Nenhuma novidade”. Há nova tentativa, recarga ao recuperar foco, timeout e proteção contra resposta antiga.

Marcação como lida preserva POST /notifications/:id/read e x-tenant-id do próprio item, sem escolha manual de empresa. Impede repetição simultânea por tenant/id, trata falhas e só recarrega após sucesso HTTP. Não inventa readAt. Conteúdo rolável e barra inferior fora da rolagem.

## Evidência e gates
Seis testes novos de calendário e leitura de notificações, mais os oito existentes: **14/14 locais aprovados em UTC e America/Sao_Paulo**. Isso não prova por si só o guard de interação, renderização ou jornada autenticada; CI/APK e dispositivo continuam separados.

React 19.1.4/RN0.81.6/lockfile preservados, sem novas dependências. CI e Standalone Pilot APK sem Metro obrigatórios no SHA exato antes do merge; pós-merge obrigatório. Evidência: MOBILE_SECONDARY_NETWORK_STATES_v1.33.md. Checkpoint registra dependência de integração #342 e runs reais. #341 pós-merge CI 38012421142 aprovado; APK 38012421105 ainda em andamento no registro inicial.
