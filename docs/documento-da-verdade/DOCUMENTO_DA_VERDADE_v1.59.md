# MLIVRETRABALHO — Documento da Verdade v1.59

**Status:** NORMATIVO — DELTA SOBRE v1.58
**Data:** 2026-10-10

Preserva v1.58, React19.1.4/RN0.81.6/lockfile, tenant/RLS, referência original e APK standalone sem Metro. Visual Truth OPEN.

## Perfil: identidade, campos salvos e rascunho
GET Profile exige ID real do contrato existente; null válido continua ausência de perfil, distinto de erro. PUT confirma ID do perfil existente quando aplicável e nome/cidade/atuação exatamente como o backend normaliza. Perfil novo aceita ID real sem inventar vínculo empresarial. Somente ack válido na mesma Authorization e geração limpa o rascunho e anuncia Dados salvos.

Leitura e salvamento usam snapshot da sessão, foco/cancelamento/15s/geração; blur ou identidade alterada não reaplica resposta anterior. Rascunho permanece no mesmo contexto em falha, sem PUT automático. Mudança de sessão limpa campos da identidade anterior; Passaporte e estados independentes preservados. PUT continua upsert por identity_id e políticas backend não mudam.

## Saída local vinculada à sessão solicitada
Perfil e Conta Empresa mantêm saída offline, mas só removem o par local se o token atual é o capturado para a saída. Limpeza é serializada com o login e confirmada por releitura de token/tenant; resultado antigo não apaga sessão nova e não redireciona após blur. Erro real de SecureStore não é declarado saída concluída.

Desativação de Privacidade preserva alerta humano, ack/backend e bloqueios. Após ack, limpeza local também é condicional à sessão solicitada; falha local é distinta da desativação já confirmada. Nenhuma desativação/signout real realizada pelo agente. Fila não promete atomicidade no crash do OS nem restauração bem-sucedida se o armazenamento falhar.

## Prova e limites
10 testes novos (6 PUT Perfil+4 limpeza condicional),162/162 mobile locais UTC/São Paulo. Fixtures GET ajustadas ao ID real do contrato. Binding SecureStore/JSX/foco/headers revisados estaticamente; CI/APK head próprio/pós-merge/taps físicos obrigatórios. Código/evidência/ledger/memória/checkpoint juntos. Visual Truth/completo/físico/piloto/pentest/provider/FIN-RISK/WEB-ARCH seguem separados; não declarar projeto completo.
