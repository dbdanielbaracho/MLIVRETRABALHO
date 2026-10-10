# Login — identidade e persistência verificadas — v1.57

Snapshot 2026-10-10 06:46:33 UTC; base #367 head93a120a78fcdbb6e7190f70d9aa94673788e56d4. Fontes AuthController/AuthService/session.ts/entrar.tsx e fluxo atual. Nenhuma autenticação real realizada pelo agente.

Antes: signin sem guard/catch/timeout/schema salvava accessToken sem verificar identidade/memberships e navegava mesmo quando saveSession/saveTenant engoliam erro. Agora signin.ts valida credenciais conforme limites backend e ack token/identity/email/memberships. Company escolhe primeiro vínculo gerencial real; profissional sem vínculo deixa tenant null; rotas atuais mantidas. Unknown/rejected/limited distintos; nenhuma sessão fictícia/poll/retry automático.

Fila única cobre get/save/clear de token/tenant e leitura conjunta de authenticatedTenantHeaders. saveVerifiedSignin usa adapter SecureStore direto (erros não engolidos), sessão anterior esperada e foco ativo, escreve/rele par e só retorna saved se ambos coincidem. Abort/blur/erro faz tentativa de rollback anterior sob a mesma fila; futuros leitores/logins/logout não observam ou são apagados pelo rollback. Primitive global serialize mantém APIs atuais das outras telas. Sem promessa de atomicidade em crash do OS ou sucesso de rollback se armazenamento indisponível. API/SQL/RLS/rate limiting/cap de sessions/políticas intactos; senhas/tokens não vão a logs novos.

Prova local:146/146 mobile UTC/São Paulo,13 novos testes.6 schema/payload/campoausente/rate-limit/rejeição/timeout;7 sessionpair/professionalcleartenant/sessionchanged/partialwrite/throwingwrite/stale rollback concurrency/queue recovery. Fixtures opacas somente unidade; sem armazenamento nativo local. Binding/cancel/inputs/routing revisados estaticamente, não taps físicos. CI/typecheck/build/HTTP/APK e pós-merge próprios pendentes. Documento/ledger/memória/checkpoint atualizados no ciclo; Visual Truth OPEN.

Próxima auditoria lida: bootstrap.ts salva tenant da resposta /me sem revalidar a sessão e escolhe primeiro membership. Verificar consumidores/contratos reais antes de corrigir contexto; não alterar escolha de papel por suposição.
