# MLIVRETRABALHO — Documento da Verdade v1.87

**Status:** NORMATIVO — DELTA SOBRE v1.86
**Data:** 2026-10-10

## Preparação segura da tentativa de suporte

O envio móvel precisa de uma chave UUID criptográfica estável. As dependências atuais do aplicativo não incluem um gerador nativo adequado; usar Math.random ou uma chave digitada pelo usuário não atende ao contrato. Esta etapa acrescenta POST /support-cases/intent na API, com randomUUID de node:crypto.

A rota autentica, exige tenant e membership, valida o mesmo supportCaseInput da criação e, quando há assignmentId, consulta o trabalho real no tenant/RLS. Só então retorna requestKey (UUID v4) e reporterIdentityId da identidade autenticada. Campos de identidade enviados pelo cliente são ignorados. A resposta não contém token, descrição, dados de outro reporter, hash ou chamado.

Preparar a chave não insere, altera ou exclui registros; uma solicitação geral válida não precisa acessar o banco. Não reserva atendimento, não promete prazo e não confirma criação de chamado. Perder uma resposta de preparação permite preparar outra chave enquanto nenhum envio de chamado foi tentado. A chave não é credencial nem autorização: POST /support-cases continua autenticando, exigindo membership e validando seu próprio payload. Não há storage novo, alteração de RLS/grants, migration ou chamada externa.

Depois que houver tentativa de criação, o cliente deverá preservar a mesma chave e o mesmo conteúdo até resultado confirmado, inclusive diante de timeout/reinício. Não pode trocar chave e repetir automaticamente um resultado incerto. Essa persistência e a interface de envio ainda não foram habilitadas por esta etapa.

## Validação

Sete testes novos de controller cobrem UUIDs criptográficos distintos, identidade autenticada, consulta limitada ao tenant e ausência de escrita; suporte geral sem banco; auth antes da validação; tenant/membership ausentes; payload inválido sem banco; assignment ausente/cross-tenant; falha real de banco sem ACK fabricado. PASS local 25/25 testes de suporte, usando adaptador explícito de TypeScript e exceções Nest; isso não equivale a teste real de Nest/PostgreSQL. O total API esperado passa de 98 para 105, a confirmar no CI do commit publicado.

Fixture HTTP existente, restrita a localhost e banco efêmero, cobre auth/membership/assignment, formato e unicidade das chaves, identidade comparada com GET /me e contagem de chamados zero após preparar várias chaves. A chave preparada é usada nos testes reais de criação/replay/conflito e oito primeiros envios concorrentes. Todas as regressões anteriores permanecem. bash -n aprovado; CI próprio ainda não iniciado antes da publicação.

Somente controller, testes API, fixture HTTP e documentos mudam. APK próprio não aplicável pelo filtro efetivo do workflow; verificar árvore mobile idêntica à #397 após publicar. CI completo, diff, bytes remotos, branch/base e SHA exato são obrigatórios antes de integrar. React 19.1.4, RN 0.81.6, lockfile, desenho e navegação permanecem preservados. Nenhuma operação em produção, chamado real, PSP, dinheiro real, nova cobrança ou infraestrutura paga foi habilitada.

## Estado verificado

Verificação de 2026-10-10, 17:33 UTC: main permanece em 9ed1859ee28b1ba50e84bda0d4357d22760a59f3 (v1.84).
PR #396: head 26b3fb2365200415366e12da76710a0ad629725b, tree 87ac6719b538d92a2b1843e9954cee80de0aece4, base main. CI 38071421868 / job 114269432957 aprovado (298 mobile, 88 API, 4 web, 3 CLI). APK próprio 38071421849 / job 114269432897 ainda executa o teste de instalação e abertura sem Metro; não integrado.
PR #397: head be12cb6905234a081472971a8e37e5cbdc98d9cf, tree d57bfbb2cfb11ace871e0c3ef4c9a41ac6088763, base fix/professional-support-history. CI 38071852247 / job 114270695562 aprovado em todos os passos: 298 mobile, 98 API, 4 web, 3 CLI, migrations e HTTP/PostgreSQL, inclusive oito primeiros envios concorrentes, conflito de payload e guards SQL. APK próprio não aplicável: paths e árvore mobile 163de7d27fe6b49fb11d87ed9a9da2bf8b9e47e7 idênticos à #396; isso não dispensa o APK do predecessor.
388–395 já integradas; não repetir merges. Retry controlado único do APK pós-merge #388, run 38054154641, tentativa 2 / job 114268524350, ainda em teste de dispositivo. Retry pedido em 17:17:11 UTC após falha de infraestrutura anterior à instalação; não solicitar nova repetição automática. Evidências dos outros pós-merges e dos gates históricos estão no registro 1717Z/v1.85.

## Próxima ação concreta

Publicar fix/support-intent-preparation sobre be12cb6905234a081472971a8e37e5cbdc98d9cf, com base fix/support-intent-idempotency. Reconsultar PR/SHA/runs, revisar patch e conferir todos os bytes publicados; não antecipar número ou aprovação. Esperar CI próprio com 105 API / 298 mobile / 4 web / 3 CLI e fixture HTTP/PostgreSQL.

Acompanhar APK da #396 e único retry pós-merge #388. Integrar #396 somente com CI/APK/smoke/artefato no SHA exato; conferir pais, árvore e main pós-merge. Depois retarget #397 e esta etapa para main, em ordem, com nova revisão/gates. Reconsultar mergeable eventual antes de diagnosticar conflito real; não sobrescrever predecessores. Verificar CI/APK pós-merge aplicáveis e persistir resultados reais.

Próximo produto independente: armazenamento durável da tentativa de suporte, vinculado à identidade autenticada (GET /me retorna id no nível superior), tenant e trabalho escolhidos nos dados reais, antes do transporte. Falha de storage impede POST. Timeout ou resposta inválida mantém conteúdo/chave sem confirmação falsa. Mudança de sessão/identidade não pode reenviar draft de outra pessoa nem apagar uma barreira de resultado incerto; relogin da mesma identidade deve permitir retomada segura. Testar races, persistência, ACK e falhas antes de habilitar UI.

Histórico de suporte permanece leitura parcial; suporte geral/contexto Dia do Trabalho e Preferências ainda têm pendências. Visual Truth físico (desenho original, dados e estados reais, cobertura completa), piloto/aparelho/distribuição, pentest e providers/TRUST/PSP/FIN-RISK/WEB-ARCH continuam abertos e independentes. Não declarar projeto concluído. Bloqueio parcial ou fim de rodada não encerra continuidade; manter a rotina, sem promessa de execução 24h ou nova automação.

Evidência: SUPPORT_INTENT_PREPARATION_v1.87.md. Requisitos: REQUIREMENTS_LEDGER_DELTA_v1.87.md. Registro de execução: 1733Z. Baselines anteriores continuam vigentes.
