# Perfil e saída — contexto e confirmação reais — v1.59

Snapshot 2026-10-10 07:02:38 UTC; base #369 head72f8455f4fde9a1f917f7a69bc6ad2acf4ab27a0; main1c89d39cc4b25c66104eb7ffb06cf4cae5125e0e (#365/v1.54). Fontes ProfileController/AuthController/AuthService, profile/session screens e fila de v1.57. Sem operação real de Perfil/login/logout/deactivation pelo agente.

## Perfil
Read antes validava displayName mas não ID do endpoint; agora GET Profile com ID real/null/erro distintos. PUT usa trim do contrato, retorno ID esperado para perfil existente e campos nome/cidade/role correspondentes; optional vazio corresponde a null real do backend. ID novo só para criação real. Valores diferentes, ack inválido, timeout/JSON/5xx preservam formulário e não anunciam sucesso. PUT idempotente em identity_id preservado; nenhuma repetição automática.

Read e save retêm Authorization/foco/geração, cancelam controllers no blur e rejeitam resposta antiga. Mesmo usuário mantém rascunho dirty em falha; outra sessão limpa dados anteriores. Passaporte e menu original/rotas/styles permanecem; nenhuma cidade/rating/experiência inventada.

## Saída condicional
Novo clearSessionForAuthorization usa fila existente e comparação do token opaco capturado. Adapter SecureStore direto propaga falha; deleção de token+tenant é relida antes de cleared. Perfil e Empresa mantêm signout offline, suprimem navegação velha e não apagam outra sessão. Privacidade usa o mesmo controle depois do ack positivo existente; stale ou erro de deleção local não é declarado resultado da desativação backend. Alerta e3bloqueios humanos/backend intactos; sem perda de uma sessão posterior por logout antigo.

## Provas/limites
162/162 testes mobile UTC/SP:6 novos PUT com payload/ID/campos/null/rejeição/timeout/JSON e4 novos clearpair/changedtoken/storagefailure/olderlogoutafternewlogin. GETfixtures com ID conforme contrato; restantes testes mantidos. Revisão estática do binding/screens/abort/queue; não prova SecureStore nativo/taps físicos nem atomicidade em crashOS. CI/typecheck/build/HTTP/APK próprios e pós-merge pendentes. Backend/RLS/deps/workflows/desenho/retention/PSP intactos; Visual Truth OPEN.

Próxima auditoria observada: ações de confirmar/check-in/out/rating no Painel Empresa e Agenda, e aceitação de convite em Membros, comparar ack/contexto após resposta com contratos atuais. Não criar política nova nem alterar dinheiro real.
