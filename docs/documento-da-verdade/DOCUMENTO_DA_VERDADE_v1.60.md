# MLIVRETRABALHO — Documento da Verdade v1.60

**Status:** NORMATIVO — DELTA SOBRE v1.59
**Data:** 2026-10-10

Preserva v1.59, React 19.1.4, React Native 0.81.6, lockfile, isolamento tenant/RLS, desenho original e APK standalone sem Metro. Visual Truth permanece OPEN.

## Convite aceito e empresa selecionada são confirmações distintas
O backend existente confirma accepted/tenantId/role e continua sendo autoridade sobre identidade, e-mail, convite, papel e membership. Após esse ack, o mobile só seleciona a empresa enquanto o token e a empresa de origem continuam iguais ao snapshot do pedido e o foco continua válido.

A gravação usa a mesma fila de sessão de v1.57/v1.59, com comparação antes de escrever, releitura do par e rollback da gravação incompleta ou do foco expirado antes de operações futuras. Mudança de conta ou seleção manual de outra empresa torna o pedido antigo stale, sem sobrescrever a nova seleção. Falha local não desfaz nem oculta o aceite confirmado pelo backend: mantém o código e orienta conferir a participação. Só persistência confirmada e contexto ainda atual limpam o código e navegam para o painel.

Não promete atomicidade em crash do sistema nem restauração quando o armazenamento também falha. Não repete aceite automaticamente, não altera permissões/backend/RLS e não cria tenant fictício.

## Gestão de membros
Leitura e revogação revalidam sessão/empresa após a resposta; dados e códigos anteriores não são reaplicados em contexto novo. POSTs não começam depois do cancelamento/foco expirado enquanto aguardavam headers. Estados loading/erro/vazio e limite de 15s preservados.

## Evidência e limites
6 novos testes; 168/168 mobile locais em UTC e America/Sao_Paulo. Testes cobrem troca de conta, troca de empresa na mesma conta, ausência de seleção, blur durante gravação, fila com login seguinte, falhas de leitura/gravação e rollback. Binding SecureStore e JSX revisados estaticamente; CI/APK no head próprio e pós-merge continuam obrigatórios. Nenhum convite, login ou membership real foi operado pelo agente. Aparelho físico/piloto/pentest, PSP/FIN-RISK/providers e WEB-ARCH continuam separados e abertos.
