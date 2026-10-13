# MLIVRETRABALHO — Documento da Verdade v1.104

**Status:** NORMATIVO — DELTA SOBRE v1.103
**Data:** 2026-10-10

## Prazo da leitura de trabalhos e da sessão para abrir ajuda

Agenda load e openSupport usavam timer que apenas abortava o controller. Credencial, transporte, JSON ou autenticação final que não resolvessem deixavam a lista carregando; a verificação da sessão para ajuda também não apresentava falha até a credencial resolver. Nove regressões dos handlers reais pré-JSX reproduziram seis falhas e três sucessos no código anterior.

operation aceita callback opcional de prazo, mantendo o default usado nas escritas. load invalida displayedAuthorization e mostra error imediatamente após 15s somente no requestId/epoch atual. openSupport faz o mesmo para ajuda/contexto e mostra a mensagem de verificação expirada, somente no helpRequest/epoch atual. Respostas ou timers de foco, tentativa, owner e seleção anteriores não substituem o estado atual; nenhuma credencial tardia autoriza painel expirado. Retentativa de leitura permanece explícita. Nenhum dado de trabalho é inventado.

PASS local24/24 em 2026-10-10: nove testes novos, sete agenda-support-screen e oito contratos/parser de Agenda. Fixtures explícitas de hooks/auth/fetch/timers usam handlers reais e loadAgenda real; não provam render React Native, SecureStore nativo ou rede externa. Cobrem auth/fetch/JSON/auth final pendentes, prazo imediato e rejeição de dados tardios, blur/novo foco, retry, troca de owner, prazo de sessão para ajuda e seleção mais recente em tenant distinto com mesmo assignment ID. Não enviam suporte nem lifecycle POST.

Corpo de action (check-in/check-out/avaliação), optionalCoordinates, imports, JSX/StyleSheets e navegação comparados e preservados; operação de escrita continua com default anterior. SupportRequest e protocolo durável não alterados. CI próprio esperado467mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP e APK standalone no SHA exato são obrigatórios e ainda pendentes antes da publicação. React19.1.4/RN0.81.6, lockfile, tenant/RLS e desenho canônico preservados. Visual Truth físico permanece aberto.

## Estado verificado

Verificação em2026-10-10 23:42 UTC: main4b797cb19dc9a7f498a86bd5ba98f003d3239991/tree8be87c3522a1f0b1b65d0e5bf30a0026f77693bf, READMEv1.100. #401–411 integradas; CI pós-merge de todas e APKs pós-merge aplicáveis agora comprovados nos SHAs reais, com passos/logs/contagens, instalação Success, DEVICE_SMOKE_OK sem Metro e ZIP não expirado vinculado ao SHA exato. N/A de402/405/406/407/411 permanece condicionado a paths e árvore mobile idênticos. Provas dos pais/árvores/pré-gates em v1.100/101; não repetir merges históricos351–411.

| PR | Merge real | CI pós-merge (web/mobile/API/CLI) | Native pós-merge |
|---|---|---|---|
| #401 | 0ee519ee064087802ad67cef4c96be4d97165e14 | 38094002384/job114336027866: 4/352/105/3 | 38094002404/job114336028036 aprovado; ZIP11685268251 |
| #402 | 4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39 | 38094031044/job114336112406: 4/352/110/3 | N/A; mobile e528995c9c2f9d17d0f94ae89faaeb214742f267 |
| #403 | 694991dc62ed3292be501d90661ab16aecd2b3a8 | 38094055691/job114336187752: 4/369/110/3 | 38094055730/job114336187885 aprovado; ZIP11685253801 |
| #404 | 94053d598ad5f2a3c4402181577a5dd6eafeb509 | 38094078457/job114336251332: 4/377/110/3 | 38094078455/job114336251341 aprovado; ZIP11685667513 |
| #405 | f82251ad97e11bf2de2745fba7acee7d3aa5e6ac | 38094096342/job114336299768: 4/377/119/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #406 | 3edd8067280fe001f25cabae5c704de91abffc9b | 38094118894/job114336366057: 4/377/131/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #407 | 60a49f2322dad50d0c0d83de5117cfc7d74adbd5 | 38094135415/job114336415459: 4/377/140/3 | N/A; mobile 39e121e416614fa92ce16775d19e65648492d9f3 |
| #408 | 2ffaa52836a5c2a181353bddaee7f4547464de0a | 38094159144/job114336485319: 4/383/140/3 | 38094159162/job114336485119 aprovado; ZIP11685692686 |
| #409 | d5a1a799189fd4ca26b4ad785db4c12a1ab18b14 | 38094180653/job114336548733: 4/396/140/3 | 38094180701/job114336549165 aprovado; ZIP11685094005 |
| #410 | 104fdd9aef14eec9530d5df609da3d4f498c03d7 | 38094197753/job114336599695: 4/408/140/3 | 38094197754/job114336599660 aprovado; ZIP11685418696 |
| #411 | 4b797cb19dc9a7f498a86bd5ba98f003d3239991 | 38094465582/job114337396456: 4/408/145/3 | N/A; mobile 15f3227015d480516a847308f59eb95e8b408796 |

#412–414 continuam abertas, com CI próprios comprovados e APKs próprios em execução na consulta23:40UTC; nenhum merge antecipado:
- #412: head2318c8606a7770ebbf0cbd3e559aa8cbbdd13686/tree8e61d924a88647eb1e24494a84ac26042fc1fbc9; CI38094564390/job114337698890 aprovado4/424/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38094564411 pendente. Base main.
- #413: head890ce8507b7e8d2e4a2a72b1d87f8c695708a134/tree21f33ff05de5d657690f252ca241330b0a89d8b9; CI38094974272/job114338910703 aprovado4/452/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38094974311 pendente. Base fix/talents-safety-read-deadline.
- #414: head92bfffc9bac8972959f726fbbb5dc8d4dcf1bbb8/treeb584e15cfda45fe1f1fc2a624024924c6ef24628; CI38095282240/job114339798025 aprovado4/458/145/3, typecheck/build/export/migrations/HTTP conferidos; APK38095282246 pendente. Base fix/primary-read-deadline.

Deltas v1.101–103 pertencem às branches ainda abertas; v1.104 é a correção desta branch, não conclusão integral na main. ZIPdigest não é digest do APK individual; smoke do emulador não aceita Visual Truth físico.

## Dependências

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.

## Próxima ação concreta

Publicar fix/agenda-read-deadline sobre head41492bfffc9bac8972959f726fbbb5dc8d4dcf1bbb8/treeb584e15cfda45fe1f1fc2a624024924c6ef24628, basefix/company-publication-context-deadline. Conferir bytes remotos e diff, CI467mobile/145API e APK próprio antes de merge. Integrar412,413,414 e esta fatia em ordem, só com gates aplicáveis no SHA exato, retargetmain/reconsulta eventual, merge-base tree equivalente, pais/tree/main e pós-gates reais. Registrar número/SHA/runs reais após publicação, sem antecipar resultados. Não repetir401–411 nem rerun de job em execução.
Próxima correção independente a reproduzir: Equipes loadBase/selectTeam/selectAllocation usam timer abort-only; verificar auth/HTTP/JSON/auth final/foco/seleção/company e preservar mutations/resultado incerto. Rotas secundárias precisam auditoria factual própria. Preferências, autoridade para nova ajuda semmembership, ML/dados e integraçãoenterprise precisam contratos/provas externas; físico/pentest/providers/Web seguem separados. Encerrar rodada não encerra projeto; manter continuidade até conclusão integral comprovada ou ordem expressa.


---

## Atualização incremental — Equipes #416 / PR #417 (2026-10-10)

### Equipes: deadline das leituras de base, membros e alocação

Em `apps/mobile/app/equipes.tsx`, o timer de `operation()` só abortava o `AbortController`: autenticação, transporte ou leitura que não resolvessem podiam manter a tela carregando. Esta versão acrescenta callback opcional de prazo às três leituras (`loadBase`, `selectTeam`, `selectAllocation`), publicando erro exclusivamente na geração/seleção/sequência corrente. `loadBase` rejeita também resultados posteriores ao abort. Ações de escrita usam `operation()` sem callback e não são repetidas automaticamente; resultado incerto de criação/alteração continua exigindo conferência.

## Evidência e limites

Issue #416 e PR #417. Testes de regressão dos handlers pré-JSX foram incluídos em `apps/mobile/tests/teams-read-deadline.test.mjs`; eles usam fixtures de hooks/serviços, não render real, Android real nem validação física. O primeiro CI detectou erro na fixture de lazy `useState` e ele foi corrigido no commit `22045a14`. CI desse commit aprovado no run `38103335279`; APK standalone desse commit run `38103335320` estava em andamento ao redigir esta versão. Como esta atualização documental altera o head, **ambos os gates do commit final devem ser executados e comprovados novamente**, seguidos pelos gates pós-merge aplicáveis. Nenhum PASS não observado pode ser inferido.

## Pendente

Completar os testes de regressão de seleção de equipe/alocação, foco e tenant para a mesma classe de defeito, conferir resultado final de CI/APK e efetuar merge só com gates concluídos. Validar visualmente no Android físico e preservar os demais bloqueios externos (pentest, PSP/KYC, Web Railway) como separados. A continuidade automática não substitui provas físicas nem autorização de despesas.


### Cobertura adicional — timeout de Equipes e foco (2026-10-10)

Regressões adicionais propostas: deadline anterior depois do blur não publica estado nem aceita resultados tardios nos cenários de autenticação inicial, fetch e autenticação final. Teste de contrato preserva `operation()` sem callback nas ações de escrita de equipe, evitando converter resultado incerto em reenvio. Referência ao teste `apps/mobile/tests/teams-read-deadline.test.mjs`. Validação de CI/APK no SHA final e pós-merge ainda pendente; estes testes não provam E2E físico nem isolam todos os estados de equipe/vaga.


### Regressão adicional: JSON sem resposta na leitura de Equipes

A fixture dos handlers reais de Equipes passa agora por `response.json()` e verifica prazo imediato, recusa de dados tardios e isolamento após blur também quando a leitura do JSON permanece indefinida. Antes disso o estágio `json` não era exercitado, pois a fixture apenas aguardava `fetch` e ignorava o corpo. O teste é simulado e não comprova execução de rede real ou Android físico. CI e APK no SHA final, pós-merge e Visual Truth permanecem sujeitos a gates próprios.


---

## Atualização incremental — 2026-10-11 04:47 UTC (01:47 Brasília)

### Estado corrente e provas da #419

Main `83d5df28f11395522aa5e8e776a38bab491e0a91`, tree `075aad2062eecde202f9b7850c07858b79c9f85c`, PR #419 merged; head aprovado `65213705c01fbda7443fc1123e4e8f1b3ea143c6`. Pais reais `de974afb962b4e77a736b22dfa3e42456672277f`, `65213705c01fbda7443fc1123e4e8f1b3ea143c6`; tree do merge idêntica à do head. Não repetir merges #412–419 nem usar o checkpoint histórico de 23:42UTC como estado atual. Consulta atual: nenhuma PR aberta antes desta correção.

Pós-merge no SHA real agora comprovado: CI [38110152658](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38110152658), job114383862793, todos os passos aprovados, 4web/476mobile/145API/3CLI, typecheck/build/export/migrations/privacy/HTTP. Marker de cronologia real PostgreSQL04:02:07.1053887Z. APK [38110152707](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38110152707), job114383862785: instalação Success04:24:44.9591307Z; DEVICE_SMOKE_OK sem Metro04:25:39.3146153Z; ZIP11691234225 não expirado e vinculado ao SHA merge, digest sha256:ad45c1776fb81c0a0b47b81fc3ace2a1298f59afa217ec9e3c0f49b6fb980276. Digest é do ZIP, não do APK individual. Essas provas de emulador não fecham Visual Truth/Android/E2E físico.

### Falha real corrigida — prazo em Interessados

Em candidatos.tsx, os timers da lista de trabalhos e de selectJob apenas abortavam o controller. Se credencial inicial, validação da origem, fetch, response.json ou autenticação final não resolvessem, o estado continuava loading. Asserções dos handlers pré-JSX reais com parsers company-candidates e runForSession reais reproduziram 12falhas/9sucessos em21novos cenários antes da correção.

O prazo15s da lista agora invalida context e publica jobsState error somente na geração atual. A aplicação final da lista rejeita controller abortado. O prazo de selectJob publica error em candidatos/recomendações somente na geração e seleção atuais. Respostas e timers antigos após blur/novo foco/seleção não substituem fatos novos; troca de identidade ou empresa continua rejeitada. Retentativa permanece humana/ explícita. Não há nomes, vagas, pessoas ou recomendações inventadas.

PASS29/29 local:21novos e8company-candidates existentes, Node24 com fixtures explícitas de hooks/auth/fetch/timer e handlers/helpers reais. Sem renderReactNative/SecureStore, chamadas externas ou confirmação de profissional. Corpo completo de confirm e JSX/StyleSheets byteidênticos após trim final; handler de escrita, ACK/resultado incerto, ordem de recomendações, rotas, React19.1.4/RN0.81.6, lockfile e tenant/RLS preservados. CI próprio esperado4web/497mobile/145API/3CLI, typecheck/build/export/migrations/HTTP e APK standalone no head exato obrigatórios; ainda pendentes antes de publicar. Não confundir local PASS com gates GitHub ou com aceite físico.

### Continuidade e dependências

Publicar fix/candidates-read-deadline a partir da main acima, revisar diff e bytes remotos; integrar somente com CI/APK no SHA exato aprovados, main/head reconsultados e pós-merge comprovado. Não antecipar número da PR, SHA ou resultado. Próxima auditoria independente: Conversa load ainda tem timer abort-only e leitura de credencial após retorno stale/error; reproduzir auth/fetch/JSON/auth final/blur/rota/troca de sessão antes de qualquer correção, preservando send e rascunho/resultado incerto. Equipes já teve correção #417 e cobertura #418/#419; não repetir tarefa antiga. Físico/Visual Truth, pentest independente, PSP/KYC sandbox, FIN-RISK, providers/TRUST e Web/Railway eventualmente pago permanecem separados e abertos. Preferências e ajuda nova semmembership ainda requerem contratos/autoridade; não inventar defaults nem tenant global. Sem contratação, dinheiro real, nova cobrança ou deploy pago. Manter continuidade em tarefas independentes seguras; fim de rodada não significa conclusão.


---

## Atualização incremental — Conversa (2026-10-11 04:49 UTC)

No load de Conversa, o timer abort-only mantinha loading quando auth, fetch, JSON ou autenticação final não resolviam. A leitura adicional de auth após runForSession error também podia rejeitar sem catch. Treze regressões dos handlers pré-JSX e helpers reais reproduziram7falhas/6sucessos antes da correção. Após: PASS24/24 local (13novos +11conversation existentes), Node24, fixtures explícitas de hooks/auth/transport/timers; sem renderRN, SecureStore nativo ou rede externa.

operation ganha callback opcional; somente load usa callback de prazo15s que invalida snapshot e informa error/mensagem na geração e sequência atuais. Aplicação de resultados recusa abort; catch apresenta falha da credencial somente no request atual. Deadline não limpa texto de rascunho e não concede autoridade de envio; retry continua explícito. Rotas de assignment/tenant, sessão/foco, resposta e timer antigos têm regressões. Corpo de send e todo JSX/StyleSheets preservados por comparação integral; default operation() na escrita, ACK/sent/rejected/unknown e conferência humana permanecem. Nenhum POST de conversa foi enviado para testar.

Documento da Verdade v1.104 EXISTENTE recebe este apêndice, preservando todo histórico, sem nova versão/substituto resumido. React19.1.4/RN0.81.6, lockfile e tenant/RLS preservados. CI próprio esperado4web/510mobile/145API/3CLI eAPK standalone no SHA exato obrigatórios; pendentes antes de publicação. Gate físico/E2E/VisualTruth, pentest, PSP/KYC sandbox, FIN-RISK/providers e Web eventualmente pago continuam separados e abertos; sem custo/contratação/dinheiro real/deploy pago.

Estado: main83d5df28f11395522aa5e8e776a38bab491e0a91/tree075aad2062eecde202f9b7850c07858b79c9f85c. Pós419 comprovado CI38110152658/job114383862793 (4/476/145/3), APK38110152707/job114383862785, ZIP11691234225/digestad45c1776fb81c0a0b47b81fc3ace2a1298f59afa217ec9e3c0f49b6fb980276, instalação04:24:44.9591307Z/semMetro04:25:39.3146153Z; não equivalem a físico.
#420 aberta head56e8229ada3bdb44042b9d208357f10ef91cdad8/treef7c9a8ae4947125d38ca87c892412a15fa271f84, base main;8arquivos remotos byteidênticos e diff revisto. CI38112711675/job114391414713 em execução (typecheck/build aprovados, export em execução na consulta04:49); APK38112711679 em execução. Não integrada nem rerun solicitada.

Publicar esta fatia sobre head420 acima em fix/conversation-read-deadline, basefix/candidates-read-deadline. Conferir bytes/diff e próprios CI510/145/APK exatos. Integrar420 e depois esta fatia somente com gates aplicáveis aprovados, retarget main em ordem/reconsulta eventual, árvore/pais/main e pós-gates reais. Próxima leitura independente auditada: NotificationsScreen operation abort-only pode manter status loading e desabilitar o retry quando auth/fetch/JSON/auth final não resolvem; reproduzir nos contextos profissional e empresa, guardas de tenant/foco e preservar marcação POST. Não repetir Equipes/#419 ou inventar tarefas para atividade. Rotina permanece ativa até conclusão integral comprovada ou ordem expressa.


---

## Atualização incremental — Notificações (2026-10-11 04:52:18 UTC)

NotificationsScreen, usado por profissional e empresa, tinha prazo que apenas abortava o controller. Auth/fetch/JSON/auth final pendentes mantinham status loading e o botão de atualização desabilitado.18novas regressões dos handlers pré-JSX com helpers reais reproduziram10falhas/8sucessos antes; após a correção: PASS28/28 local (18novos +10notifications existentes).

Somente load usa callback opcional de prazo15s: no requestId/epoch atual invalida sourceHeaders, esvazia items e apresenta status error, permitindo o retry já existente. Aplicação final rejeita abort. Testes cobrem quatro estágios nos dois perfis, prazo/late facts, blur/novo foco, request mais recente no mesmo foco, retry e owner distinto. Empresa rejeita troca de tenant com mesmo owner; profissional continua lendo notificações multiempresa independentemente da empresa selecionada. Não inventa nomes, títulos, datas ou readAt.

Corpo de read (marcar como lida), JSX/StyleSheets/nav idênticos após trim final. Default operation() usado no POST, ACK/confirmed/rejected/unknown, fila pending e conferência humana preservados. Fixtures de hooks/auth/fetch/timers usam loadNotifications, notificationContextHeaders e runForSession reais; não render RN/SecureStore, Android físico ou HTTP externo. Nenhum POST foi executado. React19.1.4/RN0.81.6/lockfile/tenant/RLS preservados.

Estado: main83d5df28f11395522aa5e8e776a38bab491e0a91/tree075aad2062eecde202f9b7850c07858b79c9f85c; pós419 comprovado conforme apêndice anterior. #420 aberta head56e8229ada3bdb44042b9d208357f10ef91cdad8/treef7c9a8ae4947125d38ca87c892412a15fa271f84; CI38112711675/job114391414713 aprovado por todos os passos/log/counts4web/497mobile/145API/3CLI, HTTP cronologia04:50:08.2546088Z. APK38112711679/job114391414476 em build na consulta04:51:38UTC. #421 aberta head66223caf499c01042b40fba82f96da301f0a429b/treedcaec82502bd76f39d4fd4a347b049c048454253, basefix/candidates-read-deadline;8arquivos remotos byteidênticos/patch revisto; CI38112820567 eAPK38112820608 em execução. Não integrar nem rerun enquanto gates executam.

A nota anterior da Conversa foi publicada04:49:54UTC; os horários04:53/04:52 eram erros de redação, corrigidos para04:49 neste apêndice e nos campos correspondentes. Nenhum gate ou resultado é antecipado. O v1.104 original continua com todo conteúdo e apêndices, atualizado em lugar; README continua apontando esse mesmo documento.

Publicar fix/notifications-read-deadline a partir do head421 acima, basefix/conversation-read-deadline. CI próprio esperado4web/528mobile/145API/3CLI eAPK standalone no SHA exato obrigatórios, pendentes antes da publicação. Integrar420→421→esta fatia somente com próprios gates aprovados, retargetmain em ordem/reconsulta eventual, árvore/pais/main e pós-gates reais. Atualizar SHA/PR/runs reais na retomada; não repetir419 nem confundir status histórico com corrente.
Próximas alternativas internas a auditar: leituras de Membros, Substituições, Casos de segurança, Pagamentos, Copilot, Privacidade e disponibilidade; reproduzir falha concreta antes de alterar e preservar escrita/resultados incertos. Equipes, Interessados, Conversa e Notificações já têm correções/cobertura registradas. Físico Android/E2E/VisualTruth, pentest independente, PSP/KYC sandbox/FIN-RISK, providers/TRUST e Web/Railway eventualmente pago continuam separados e abertos. Preferências/autoridade para ajuda sem vínculo/ML/enterprise precisam contratos/evidências, sem inventar requisitos/tenant. Sem contratação, dinheiro real, novos custos ou deploy pago. Fim da rodada não encerra projeto; manter continuidade em tarefas independentes seguras.


---

## Atualização incremental — leituras secundárias (2026-10-11 04:55:46 UTC)

Foram reproduzidas falhas de prazo em Membros, Substituições, Relatos de segurança, Pagamentos (somente reconciliação GET) e Privacidade (somente lista GET). Primeira bateria40cenários:25falhas/15sucessos no código anterior, sempre loading em vez de error quando auth/fetch/JSON/auth final não resolviam. Após correção:43novos cenários aprovados, incluindo preservação de rascunhos e flags incertas; conjunto local94/94 (43novos +51contratos existentes), Node24 com fixtures explícitas e handlers/helpers reais.

Membros/Substituições/Segurança: operation aceita callback opcional somente nas leituras load; o prazo15s invalida context/snapshot e publica error das respectivas seções somente na geração/seq atual. Substituições/Segurança conferem também geração/seq/abort imediatamente depois da credencial antes de tocar transporte. Privacidade: timer do GET da lista invalida snapshot e mostra erro na sequência/foco atual, sem alterar timer de operate. Pagamentos: timer publica erro na geração atual e aplicação final descarta abort. Retentativa permanece explícita; resultados e timers antigos não substituem fatos novos depois de blur/novo foco/retry; mudança de empresa/identidade continua rejeitada.

Novos testes passam por response.json dos helpers de produção, usam registros de fixture válidos, verificam conteúdo completo restaurado (inclusive payableCents=null distinto de agregados0), somente GET e ausência de chamadas após expiração de auth. Preservam e testam rascunho/estado incerto de convite, motivos de substituição e rascunho/estado incerto de privacidade. Não provam renderRN, SecureStore, rede externa, E2E/Android físico ou resultados reais de produção.

Corpos completos de createInvite/acceptInvite/revoke, action de substituições, update de segurança e operate/ações de privacidade e JSX/StyleSheets comparados e preservados. Pagamentos mantém somente leitura; não cria eventos nem habilita PSP. Nenhuma mutation, nova cobrança/contratação/deploy pago ou decisão automática foi acrescentada. React19.1.4/RN0.81.6/lockfile/tenant/RLS/canônico preservados. V1.104 EXISTENTE atualizado em lugar com histórico e apêndices; memória/checkpoint/requisitos/evidência no mesmo commit.

Estado na consulta: main83d5df28f11395522aa5e8e776a38bab491e0a91/tree075aad2062eecde202f9b7850c07858b79c9f85c; pós419 comprovado conforme evidência anterior. #420/#421/#422 abertas, cada head/diff/bytes próprios conferidos. CI próprios completos aprovados:420 run38112711675/job114391414713 counts4/497/145/3;421 run38112820567/job114391741740 counts4/510/145/3;422 run38112956435/job114392135215 counts4/528/145/3. Passos/logs/typecheck/build/export/migrations/privacy/HTTP comprovados nos heads exatos. APKs38112711679/38112820608/38112956424 em execução, sem rerun ou merge antecipado.

Publicar fix/secondary-read-deadlines a partir de head4220e768ab142665d0f088d287b6db73002900a8b98/treeaebd7cd351dd71378f0f097e8efa5d5f84e911d2, basefix/notifications-read-deadline. Esperado CI4web/571mobile/145API/3CLI eAPK standalone próprios no SHA exato, pendentes antes de publicar. Integrar420→421→422→esta fatia em ordem somente com próprios gates aprovados; retargetmain/reconsulta eventual, pais/tree/main e pós-gates reais. Não repetir419 nem considerar ausência de PR como conclusão.
Copilot interpret e disponibilidade/save ainda usam timers abort-only em operações POST e podem manter busy pendente: auditar/reproduzir preservando operação incerta, nenhuma liberação de reenvio automático. Demais fluxos de escrita/draft/contexto e cobertura de tela inteira exigem análise própria; não alegar conclusão estática/visual integral. Físico Android/E2E/VisualTruth, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam separados e abertos; contratos de Preferências, ajuda sem vínculo, ML/dados e enterprise dependem definição/provas externas. Manter continuidade em itens seguros independentes; fim de rodada não encerra projeto.


## Auditoria e correção do prazo de leitura do Histórico de suporte (2026-10-11 05:01:15 UTC)

A auditoria do código atual encontrou operation abort-only em SupportHistory.loadWork e selectWork: uma promise de auth, fetch, response.json ou auth final que não resolve conserva loading depois dos15s. Bateria nova17cenários com handlers pré-JSX e loadAgenda/loadSupportCases reais: antes10falhas/7sucessos; depois17/17PASS. Execução local com contratos existentes:37tests/37pass/0fail (17novos+20existentes), Node24, fixtures explícitas. Não é render ReactNative, transporte real ou aparelho físico.

O timer agora aborta e publica error somente se id/generation continuam atuais, para a lista de trabalhos e os casos do trabalho escolhido. Retentativa é explícita. Testes exercitam quatro fases pendentes distintas por leitura, rejeição de fatos atrasados, retry antes de resolver resposta anterior, timers obsoletos, blur/refocus sem GET antigo, troca de identidade e mesmo assignment ID em tenants distintos. Registros recebidos são conservados na retentativa; nenhum POST enviado. JSX/StyleSheet/SupportRequest e protocolo durável de envio/retomada, navegação e todas as escritas permanecem byte-identical; o diff é exclusivamente dois callbacks de leitura e assinatura interna. GeneralSupport/SupportRecovery/DeclaredCapabilities já possuem callbacks de erro próprios na main e foram inspecionados: não repetir correção onde já existe.

Estado consultado: main 83d5df28f11395522aa5e8e776a38bab491e0a91; #420/#421/#422/#423 abertas, heads e bytes próprios revisados; CIs próprios aprovados e completos:
420 56e8229ada3bdb44042b9d208357f10ef91cdad8 CI38112711675/job114391414713 tests4/497/145/3;
421 66223caf499c01042b40fba82f96da301f0a429b CI38112820567/job114391741740 tests4/510/145/3;
422 0e768ab142665d0f088d287b6db73002900a8b98 CI38112956435/job114392135215 tests4/528/145/3;
423 68535d37567b898dfd1f6f2bac078d52fd7f9aa8 CI38113140672/job114392671499 tests4/571/145/3.
Todos incluem passos/logs de typecheck/build/export/migrations/privacy/HTTP; a cronologia real PostgreSQL passou inclusive em423 às04:58:09.0931902Z. APKs38112711679/38112820608/38112956424/38113140682 em execução:420/421 já em install/launch,422/423build; isso é acompanhamento e não bloqueio/sucesso. Pós419 comprovado anteriormente no SHA real83d5df28f11395522aa5e8e776a38bab491e0a91 e permanece documentado.

Próxima ação: publicar fix/support-history-read-deadline sobre head423 68535d37567b898dfd1f6f2bac078d52fd7f9aa8/tree2d8d47f20eb0af7ff93578d9793a8b9b2fb84521, basefix/secondary-read-deadlines; conferir bytes e diff e próprios CI esperado4web/588mobile/145API/3CLI e APK standalone no head exato. Integrar420→421→422→423→esta fatia em ordem somente com gates próprios aprovados, retargetmain/reconsulta eventual, revisão de diff, pais/tree/main e gates pós-merge no SHA real. Nenhuma integração antecipada; nenhum rerun de job em execução ou repetição419.
Auditoria seguinte: interpretar Copilot e salvar Disponibilidade ainda têm timers abort-only em POST; avaliar contratos/fase/resultado incerto antes de qualquer liberação de busy/reenvio. Não deduzir que POST de interpretação executa ação crítica; verificar backend sem chamar serviço externo. Preferências, ajuda sem vínculo, ML/dados e enterprise ainda precisam definições/provas externas. Físico Android/E2E/VisualTruth, SecureStore/teclado/payload/restart, pentest independente, PSP/KYC sandbox/FIN-RISK/provider/TRUST e Web/Railway eventualmente pago continuam separados e abertos. Um impedimento parcial não encerra o projeto. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho canônico e dinheiro/infraestrutura sem novas cobranças preservados. Documento ORIGINAL v1.104 atualizado em lugar com todo histórico, sem nova versão/resumo substituto.


## Prazo da interpretação assistida do Copilot (2026-10-11 05:03:56 UTC)

Backend original copilot.controller.ts interpret e copilot.ts/policy auditados no SHA main83d5df28f11395522aa5e8e776a38bab491e0a91: POST/copilot/interpret autentica, consulta memberships e devolve baseline determinístico; providerConfigured=false, executionAllowed=false, nenhuma mutation/execução crítica/provedor pago. A correção abaixo é específica dessa interpretação comprovada sem efeitos de escrita; não liberar indiscriminadamente operações POST como Disponibilidade.

Defeito real: timer abort-only de interpret mantém busy/pending infinitos em auth inicial, auth originadora do runForSession, fetch, response.json e auth final. Nova bateria11cenários:8falhas/3sucessos antes;11PASS após. Execução local28/28 (11novos+8copilot-response+9session-context), Node24 fixtures explícitas/handlers/helpers reais. Prazo15s aborta, invalida origem da sugestão, limpa resultado e libera botão com mensagem de erro. Só ação humana faz nova interpretação; timer não envia POST nem navega. Guarda foco+identidade do AbortController impede resposta/catch/finally/timer antigos de apagar resultado ou liberar lock de operação nova. Finalmente remove referência atual do controller, descartando timer obsoleto. Texto/rascunho é mantido.

Cinco fases pendentes realmente distintas e response.json de produção exercitados; auth1/2 expiradas não chegam ao POST. Testes verificam retry manual somente/copilot/interpret assisted, zero rota automática, finally antigo durante busy novo, timer antigo, blur/refocus, owner diferente e resultado executionAllowed=false/requiresHumanConfirmation=true. nextStep inteiro, JSX/StyleSheets/rotas/canônico comparados e preservados byte-identical; click humano continua revalidando auth. Não há teste em aparelho físico/renderRN ou chamada externa/modelo pago.

Estado: main83d5df28f11395522aa5e8e776a38bab491e0a91, pós419 comprovado; #420–424 abertas em ordem. CI420–423 completos aprovados heads exatos4web/497,510,528,571mobile/145API/3CLI com typecheck/build/export/migrations/privacy/HTTP. #424 head1f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da, treed95dd99ee320096ee1374b7ecf7117ee8cc8fd7d, CI38113453286 eAPK38113453352 em execução. PrópriosAPKs420–424 pendentes; não integrar antes da aprovação integral e não rerun de job em execução.

Próxima ação concreta: publicar fix/copilot-interpretation-deadline sobre head4241f2f441ad7d2fcb32f5bf77fbdf81ec1a94010da/treed95dd99ee320096ee1374b7ecf7117ee8cc8fd7d, basefix/support-history-read-deadline. Revisar diff/bytes remotos e CI esperado4web/599mobile/145API/3CLI+APK standalone próprios no head resultante. Integrar420→421→422→423→424→esta fatia, retarget main após predecessor, rever eventual mergeable, comparar merge-base/tree, pais/main e acompanhar CI/APK pós-merge no SHA real. Registrar números, SHAs, runs, artefatos e resultados reais; [] ou in_progress nunca é sucesso.

Auditoria segura seguinte: Disponibilidade/save ainda usa abort-only em POST que insere dados e resultado pode ser incerto; estudar contrato de idempotência/preservação antes de liberar reenvio. Outras escritas precisam análise de resultado incerto própria; não transpor interpretação determinística sem efeitos para mutations. GeneralSupport, SupportRecovery e DeclaredCapabilities já têm callback de prazo GET vigente; não duplicar correções. Preferências/ajuda semmembership/ML/enterprise dependem definições/provas específicas. Físico Android/E2E/VisualTruth/SecureStore/teclado/payload/restart, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam separados e abertos; emulador não fecha físico. Sem dinheiro real, nova cobrança/contratação/infraestrutura/deploy pago. React19.1.4/RN0.81.6/lockfile/tenant/RLS preservados. Documento ORIGINAL v1.104 existente atualizado em lugar com histórico integral, acompanhado de memória/checkpoint/requisitos/evidência. Fim de rodada ou bloqueio parcial não encerra projeto.


## Prazo de Disponibilidade com resultado incerto preservado (2026-10-11 05:06:31 UTC)

Save da tela Disponibilidade estava em saving/submitting indefinidos quando auth, fetch, response.json ou auth final não resolviam após abort15s.11novos cenários reaispré-JSX:8falhas/3sucessos antes,11/11PASS após. Conjunto local23/23 (11novos+9availability-submit+3availability-window), Node24 fixtures explícitas, helpers/window/parsers originais com fases pendentes distintas. Não é escrita em produção, renderRN, SecureStore ou E2E físico.

Contrato auditado na main83d5df28f11395522aa5e8e776a38bab491e0a91: AvailabilityController POST/mine deriva professional_id da identidade autenticada, e usa ON CONFLICT(professional_id,starts_at,ends_at). Migration0026professional_availability_network tem UNIQUE exato e scriptHTTP-availability-input-e2e testa retorno do mesmo id/uma única linha para repetição da mesma janela e isolamento de identidade. CI420–424 completo já executou esse contrato local/PostgreSQL com sucesso; não confundir fixtures com fatos externos. Nenhuma API/DB/schema/tenant/RLS alterada, nenhum novo serviço ou envio externo feito.

Timer agora aborta e publica resultado atual sob guarda de foco+identidade do controller, liberando edição/botão para ação humana. Antes de despachar: erro de sessão/prazo factual com zeroPOST e uncertain=false. Se fetch foi chamado: uncertain=true e mensagem para conferir disponibilidade no Início ou repetir manualmente; rascunho mantido, nunca afirma salvo/rejeitado a partir de resposta expirada. dispatched é marcado apenas no callback real do POST. Não há retry automático. Guards imediatamente após submission/auth final e em catch/finally impedem operações antigas de apagar rascunho, mensagem ou liberar saving de uma nova operação; finalmente zera controller atual. O ACK válido e oportuno ainda é a única condição que limpa campos. Rejeição profile_required confirmada segue distinta de resultado incerto.

Testes verificam auth/fetch/JSON/authfinal, zero POST após auth expirada, unknown imediato pós-transporte, rascunho mantido, retry humano da mesma janela exata, finally/timer obsoletos, blur/refocus, owner diferente, rejeição tardia incerta e profile_required oportuno. Payload/header/método/endpoint/window/helper existentes preservados; JSX/StyleSheet/ProfessionalNav e navegação comparados e preservados byte-identical. A possibilidade anterior de retry explícito de janela idempotente é mantida. Isto não autoriza desbloquear indiscriminadamente convites, publicação, confirmações, casos, pagamentos ou outras mutations sem seus contratos/resultado incerto.

Estado consultado: main83d5df28f11395522aa5e8e776a38bab491e0a91 e pós419 comprovado. #420–425 abertas em sequência; CIs420–424 completos aprovados heads exatos4web/497,510,528,571,588mobile/145API/3CLI, incluindo typecheck/build/export/migrations/privacy/HTTP. CI42438113453286/job114393570644 comprovado588mobile/145API e cronologia real às05:03:55.6834828Z. #425 head8989feeb8206a36a03a268021ba204fa04b2b2c7/treefacb693b97bae7ed5a0931a91ad76bdc6b4993c4, CI38113622093 eAPK38113622026 em execução. APKs420–425 pendentes; não merge antecipado/repetição419/rerun em execução.

Próxima ação concreta: publicar fix/availability-save-deadline sobre head4258989feeb8206a36a03a268021ba204fa04b2b2c7/treefacb693b97bae7ed5a0931a91ad76bdc6b4993c4, basefix/copilot-interpretation-deadline; revisar bytes remotos/diff, CI esperado4web/610mobile/145API/3CLI e APK standalone no head exato. Integrar420→421→422→423→424→425→esta fatia em ordem somente com gates próprios aprovados, retargetmain depois de predecessor, reconsulta eventual/conflicto real, merge-base/tree/pais/main e gates pós-merge no SHA real. Registrar números/runs/artefatos/provas reais; in_progress/[] não é aprovação.

Outras mutations abort-only requerem auditoria independente que preserve confirmação humana, rascunho e resultado incerto. Próximo exame seguro: autenticação/registro e Contexts de telas ainda não cobertos, buscando defeito concreto com base no código vigente; não criar tarefas/commits por ausência de PR. GeneralSupport/SupportRecovery/DeclaredCapabilities já têm callbacks GET e foram confrontados. Contratos Preferências/ajuda semmembership/ML/enterprise e físicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam separados/abertos. Emulador não fecha físico; bloqueio parcial não encerra projeto. Sem dinheiro real, novas cobranças/contratos/infraestrutura/deploy pago; React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho canônico preservados. Documento ORIGINALv1.104 atualizado em lugar, histórico completo, memória/checkpoint/requisitos/evidência no mesmo commit.


## Prazo da leitura de sessão na abertura (2026-10-11 05:10:58 UTC)

A tela inicial index/Home só liberava checking depois de resolveStartupRoute resolver. Nenhum timer existia: uma das leituras pareadas de authenticatedTenantHeaders sem resolução oculta indefinidamente Entrar/Criar conta. Startup-route/session.ts auditados: snapshots de token/tenant são exclusivamente leituras da fila existente; não alterar fila/storage nem deduzir autorização/membership pela rota.

7novos testespré-JSX com focus handler e resolver reais, fixtures explícitas: antes5falhas/2sucessos por ausência do callback de prazo nos cinco cenários; depois7PASS. Local11/11 (7novos+4contratos startup-route), Node24. Quatro casos pendentes por conta profissional/empresa e primeira/segunda leitura, oldfocus/timer/snapshot, rotas oportunas e signedout/tenantórfão. Não é renderRN/boot físico/SecureStore ou navegação real.

Prazo15s libera os botões de entrada já existentes e marca leitura expirada, sem limpar sessão, inventar login/logout ou enviar requisição. Leitura antiga não inicia segundo snapshot nem redireciona após expiração; novo foco exige novo par íntegro. Cleanup/resultado oportuno cancelam timer. Guards de auth/tenant do resolver e rotas profissionais/empresa mantidos. JSX/StyleSheet/desenho/textos/cadastro/login/storage/fila transacional byte-identical. Não modifica POST signin/signup/signout, que ainda possuem abort-only e precisam análise própria de escrita em SecureStore/resultados incertos.

Estado: main83d5df28f11395522aa5e8e776a38bab491e0a91/pós419 comprovado, #420–426 abertas em ordem, sem merges antecipados. CIs420–426 completos comprovados no head exato:4web/497,510,528,571,588,599,610mobile/145API/3CLI com typecheck/build/export/migrations/privacy/HTTP. CI42538113622093/job114394056918 cronologia real05:07:02.2552483Z; CI42638113777302/job114394498727 cronologia real05:09:53.3695228Z. #426 headc9bb5c147b8181c4ee39eb490139625c08df5678/treee22f9734039ba8eb86cf72d5a57385ce0787305f, APK38113777319 em execução; APKs420–426 pendentes. Não rerun de execução em andamento ou repetir merge419.

Próxima ação: publicar fix/startup-session-read-deadline sobre head426c9bb5c147b8181c4ee39eb490139625c08df5678/treee22f9734039ba8eb86cf72d5a57385ce0787305f, basefix/availability-save-deadline, verificar bytes/diff e CI próprio esperado4web/617mobile/145API/3CLI+APKstandalone no SHA exato. Integrar420→421→422→423→424→425→426→esta fatia só com próprios gates confirmados, retargetmain após predecessor, eventual mergeable/conflito real, merge-base/tree/pais/main e pósCI/APK no SHAreal. Registrar números/runs/resultados/artefatos reais; []/in_progress nunca aprovação.

Auditoria seguinte concreta: CriarConta.signup abort-only pode ocultar link Entrar com minha conta enquanto signup fica pendente; preservar sent/unknown e bloqueio de duplicação, sem resubmissão automática ou fakecreated. Entrar/signout dependem protocolo transacional de sessão/resultado em SecureStore: avaliar sem desbloqueio indiscriminado/bypassfila. Demais mutations precisam análise independente e confirmação humana/rascunhos/resultados incertos. GeneralSupport/SupportRecovery/DeclaredCapabilities já confrontados com callbacksGET; não repetiratividade. Preferências/ajuda sem vínculo/ML/enterprise aguardam definições/provas específicas; físicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart/piloto, pentest independente, PSP/KYCsandbox/FIN-RISK/providers/TRUST e Web/Railwayeventualmentepago continuam separados/abertos. Um impedimento parcial/fim de rodada não conclui projeto. Documento ORIGINALv1.104 existente atualizado em lugar com histórico completo, memória/checkpoint/requisitos/evidência; React19.1.4/RN0.81.6/lockfile/tenant/RLS/canônico e ausência de novas cobranças/dinheiroreal/serviços/deploypago preservados.


## Prazo do cadastro preservando bloqueio de duplicação (2026-10-11 05:13:52 UTC)

CriarConta.signup possuía abort-only que conservava busy quando fetch ou response.json não resolviam. Isso ocultava o link de recuperação enquanto o cadastro podia já existir. Nova bateria9cenários:6falhas/3sucessos antes,9PASS após; local20/20 (9novos+11signup existentes), Node24, handlers pré-JSX/signupAccount e JSON de produção com fixtures explícitas. Não cria conta/workspace real, não é renderRN/Android físico.

Prazo15s libera busy/pending visual, mas mantém sent/unknown=true e uncertain=true quando POST começou. Mensagem oferece Entrar com minha conta, já existente no JSX; botão/handler de novo cadastro seguem bloqueados. Nenhum retry automático ou segundo POST é permitido, mesmo depois de resposta created/rejected tardia ou blur/refocus. Rascunho/senha são mantidos no prazo para recuperação explícita; ACK oportuno válido continua limpando senha e navega para/entrar, rejeição email_in_use oportuna continua distinta de unknown. Guards foco+controller e abort impedem retorno/finally/timer obsoletos de alterar outcome. JSX/StyleSheets/textos/navegação/helper e protocolo de não duplicar conta/workspace preservados byte-identical; sem storage/serviço/modelo/custo novo.

Testes de profissional/empresa separadamente cobrem fetch/JSON pendentes e JSON de rejeição tardia, erro incerto imediato e bloqueio de segundo envio, zero rota automática, rascunho/senha, blur/refocus/unknown, ACK oportuno/obsoleto e email_in_use real na fixture. Não alterar backend/DB ou deduzir que cadastro non-idempotente pode ser repetido como Disponibilidade.

Entrega material nesta consulta: #420 MERGED em64c5f2a09969e76d7077858af4a0623f2b43ce38, treef7c9a8ae4947125d38ca87c892412a15fa271f84; pais[83d5df28f11395522aa5e8e776a38bab491e0a91,56e8229ada3bdb44042b9d208357f10ef91cdad8] e main verificados. PréCI38112711675/job114391414713 counts4/497/145/3 eAPK38112711679/job114391414476 aprovados no head56e8229ada3bdb44042b9d208357f10ef91cdad8. APK install05:10:30.0427996Z, launch05:11:24.7013021Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; ZIPartifact11693230353 digestsha256:320609211c0e5935c47dba449c47b02a8c6aaaee6571629f19e10e8016ef718b não expirado. Digest refere ZIP, smoke emulador não físico. Pós420 CI38114053725/APK38114053744 em execução no SHA real64c5...: NÃO PASS ainda.

#421 retargetmain, nova consulta mergeable=true e diff idêntico revisado. CI38112820567 exacthead66223caf499c01042b40fba82f96da301f0a429b completo aprovado; APK38112820608 em execução, sem merge. #422–427 ainda abertas em ordem; CIs420–426 completos comprovados counts4web/497,510,528,571,588,599,610mobile/145API/3CLI com typecheck/build/export/migrations/privacy/HTTP. #427 head0832b9f5df98fba06a3c89918e5eb045bc7ba25d/tree3d1d2c93b9cfaa1a10c24dbe8b38682bfca06a00, CI38113969108/APK38113969118 em execução; ownAPKs421–427 pendentes. Pós419 comprovado no SHAreal83d5df28f11395522aa5e8e776a38bab491e0a91. Não repetirmerges, não rerun em andamento, não considerar []/in_progress sucesso.

Próxima ação: publicar fix/signup-uncertain-deadline sobre head4270832b9f5df98fba06a3c89918e5eb045bc7ba25d/tree3d1d2c93b9cfaa1a10c24dbe8b38682bfca06a00, basefix/startup-session-read-deadline; conferir bytes/diff e CI próprio esperado4web/626mobile/145API/3CLI+APKstandalone no head exato. Acompanhar pós420 e próprios gates421 em paralelo. Integrar421→422→423→424→425→426→427→esta fatia só com seus gates próprios comprovados, retargetmain em ordem após predecessor, revisar diff/merge-base/tree/pais/main e gates pósCI/APK no SHAreal. Documentar SHAs/runs/artefatos/resultados reais de cada integração no ciclo. Nenhumaintegração420 repetida.

Auditoria seguinte: Entrar/signout ainda têm abort-only e podem ficar busy na leitura/persistência SecureStore. Precisam confronto com session-transaction e fila compartilhada: não liberar login/logout ignorando escrita persistida incerta, não descartar sessão nova ou esconder falha de limpeza local. Demais mutations exigem exame de contratos/ACK/incerteza próprio; não declarar projeto concluído só porque esta bateria passou. Preferências/ajuda sem vínculo/ML/enterprise precisam definições/provas específicas. FísicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart/piloto, pentest independente, PSP/KYCsandbox/FIN-RISK/providers/TRUST e Web/Railwayeventualmentepago separados/abertos. Emulador não fecha físico. Documento ORIGINALv1.104 atualizado em lugar com histórico integral, memória/checkpoint/requisitos/evidência no mesmo commit. React19.1.4/RN0.81.6/lockfile/tenant/RLS/canônico e ausência de dinheiroreal/novosserviços/cobranças/infraestrutura/deploypago preservados; impedimento parcial/fim de rodada não encerra projeto.


## Prazo do login com fila/rollback preservados (2026-10-11 05:17:47 UTC)

Entrar.signin conserva busy após abort15s quando getSession, fetch, JSON ou persistência/readback não resolvem.11novos cenáriospré-JSX:7falhas/4sucessos antes,11PASS após; local24/24 (11novos+6signin+7session-transaction), Node24. Executam signinAccount/createSessionQueue/persistVerifiedSession reais com adapter explícito; não prova SecureStore/OS crash/renderRN/aparelho físico.

Prazo15s publica erro factual sem declarar acesso/login/logout, libera busy/pending para tentativa humana e mantém credenciais. Guarda foco+identidade do controller+abort impede retorno de sessão/transporte/persistência vencida de gravar ou navegar; catch/finally/timer antigos não apagam mensagem nova nem desbloqueiam operação nova. Finalmente zera referência do controller atual. Nenhum retry automático, novo serviço ou bypass da fila.

Session.ts/session-transaction auditados: saveVerifiedSignin permanece integralmente na fila compartilhada; compara expectedToken e isCurrent, verifica par token/tenant e faz rollback do par anterior se a escrita se torna stale. O deadline da tela NÃO remove operação nativa/rollback da fila nem cria promessa de atomicidade física. Caso de gravação parcial pendente comprovado: nova tentativa fica atrás da gravação antiga; ao retornar ela, rollback conclui antes do novo getSession/POST/persist; finally antigo não libera busy novo; novo par confirmado e rota correta são preservados. Alteração concorrente de token rejeita expectedToken antigo, sem apagar nova sessão. Se SecureStore nunca resolver, a fila ainda espera: erro da tela não mente que storage foi reparado/limpo. Esse gate nativo permanece independente.

Seis fases distintas testadas: leitura inicial da sessão, fetch, response.json, leitura pré-gravação, gravação parcial e readback. Após expiração, rollback/guard deixam par anterior e sem rota; auth inicial expirada não envia POST. Testes também cobrem fila/rollback antes de login novo, token novo por outro login, blur/refocus, ACK oportuno profissional/empresa, limpeza de senha só após confirmação e rate-limit429 factual sem repetição. JSX/StyleSheet/navegação/helper/sessionqueue/transaction/payload e limites existentes preservados byte-identical. Não alterar signup incerto nem liberar criação duplicada.

Main atual64c5f2a09969e76d7077858af4a0623f2b43ce38 (#420 integrado após própriosCI/native completos, pais/tree verificados). Pós420 CI38114053725/job114395297104 counts4/497/145/3 aprovado, HTTP real05:14:55.8805366Z; pósAPK38114053744 em execução, ainda NÃO PASS. Pós419 comprovado no SHA83d5df28f11395522aa5e8e776a38bab491e0a91. #421 retargetmain/diff revisado, CIexato aprovado e ownAPK38112820608 em execução; #422–428 abertas em ordem. Todos CIs próprios420–428 completos aprovados heads exatos:4web/497,510,528,571,588,599,610,617,626mobile/145API/3CLI, typecheck/build/export/migrations/privacy/HTTP. #428 head0deb62791921eaf326be91562a2adb4f602d89bf/treed27f8e8c62d362f72fdc7a340498328de0be3429, CI38114121811/job114395500223 counts4/626/145/3 e HTTP05:16:09.0504632Z; APK38114121800 pendente. Não repetir419/420 ou rerun de jobs em execução.

Próxima ação concreta: publicar fix/signin-session-deadline sobre head4280deb62791921eaf326be91562a2adb4f602d89bf/treed27f8e8c62d362f72fdc7a340498328de0be3429, basefix/signup-uncertain-deadline; revisar bytes/diff, CI esperado4web/637mobile/145API/3CLI+APKstandalone próprio no SHA exato. Integrar421→422→423→424→425→426→427→428→esta fatia quando cada CI/APK próprio passar; retargetmain após predecessor, rever mergeability/diff, merge-base/tree/pais/main e pós-merge no SHA real. Provas definitivas pósAPK420+posteriores continuam obrigatórias; []/in_progress não é sucesso.

Auditoria seguinte: signout em EmpresaConta/Perfil possui abort-only, remoção da sessão original/resultado local incerto exige preservar clearSessionForAuthorization/fila/token nova/ACK de limpeza e erro em vez de alegar saída. Othermutations devem manter drafts/unknown/humano; sem desbloqueio indiscriminado. GeneralSupport/SupportRecovery/DeclaredCapabilities já inspecionados têm callbacksGET; não repetiratividade. Preferências/ajuda semmembership/ML/enterprise dependem contrato/dados; físicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart/piloto, pentest independente, PSP/KYCsandbox/FIN-RISK/providers/TRUST e Web/Railwayeventualmentepago separados/abertos. Emulador não físico. ORIGINALv1.104 atualizado em lugar com histórico integral, memória/checkpoint/requisitos/evidência; React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho e sem dinheiroreal/novacobrança/serviço/infraestrutura/deploypago preservados. Bloqueio parcial/fim de rodada não encerra projeto.


## Prazo da saída local preservando sessão posterior (2026-10-11 05:24:33 UTC)

EmpresaConta.signout/Perfil.signout auditados: abort-only mantém Saindo indefinidamente se auth/fetch não resolve; timer era cancelado antes de clearSessionForAuthorization, deixando leitura/gravação/readback local sem prazo de UI.18novos cenários (9por tela), handlerspré-JSX e createSessionQueue/clearExpectedSession reais, parsers de Perfil reais na carga inicial com adapter explícito: antes12falhas/6sucessos, incluindo ausência do timer na fase local; depois18PASS. Local29/29 (18novos+4session-clear+7session-transaction), Node24 fixtures explícitas. Não é SecureStore/OS crash/renderRN/revogação real no servidor/Android físico.

Timer15s agora permanece até a limpeza local terminar; publica erro de confirmação e libera UI/pending sem alegar logout. Antes de auth concluída, guardfoco+controller+abort impede POST/clear tardio. Depois do despacho da saída explicitamente pedida, Promise.race(fetch,deadline) permite executar a limpeza local da sessão original mesmo quando transporte ignora abort. Não há retry automático de POST nem remoção/bypass de operação nativa da fila. Signal/headers/endpoint/método permanecem os originais.

clearSessionForAuthorization/session-transaction permanecem integrais: expectedToken original é verificado dentro da fila; token+tenant precisam ter readback null para retorno cleared. Somente cleared comprovado e operação/foco atual permitem router.replace('/'); stale/failed não navegam ou dizem saída confirmada. Timer durante armazenamento pendente revela erro, mas não garante storage reparado. A limpeza local explicitamente autorizada pode concluir e navegar mais tarde somente quando de fato confirmada e ainda corrente. Revogação remota em timeout NÃO é comprovada; apagar acesso local não é prova de revogação do servidor. Oldfinally/timer não desbloqueiam/navegam por operação nova; token de login mais recente é conservado. Perfil adiciona ref de controller só para exit, sem interferir nas leituras ou saveProfile; payloads/escritas/rascunhos/layout/nav originais preservados.

Testes separados de profissional/empresa: auth semPOST/clear, clearread/writepartial/readback pendentes, rede ignorando abort com limpeza apenas uma vez e sem esperar resposta, sessão posterior na fila/foco, falha local não confirmada, sucesso oportuno e finally antigo durante nova tentativa pendente. Componentes usam parsers de produção na carga de Perfil; fixturesnão demonstram dispositivo físico. saveProfile inteiro, callbacks de load, JSX/StyleSheets/CompanyNav/ProfessionalNav comparados/preservados byte-identical; fila/token helpers/DB/schema/RLS não alterados.

Estado atual confirmado: main7993dd0c5f4646b2e9b48b79923041b9f3a842dc, #420–423 integradas em ordem com própriosCIs+APKsstandalone completos/steps/logs/install/launch/ZIPhead-digest não expirados; cada commit/pais/tree idêntica ao head aprovado e main verificados. Merges42064c5f2a09969e76d7077858af4a0623f2b43ce38,4219ff2ef5a3c30e42a1908949053e6849b07f50651,422cfb7d838697006d03c0ac1c9873d4ad1da08679a,4237993dd0c5f4646b2e9b48b79923041b9f3a842dc. Smoke de emulador não fecha físico; digests publicados sãoZIPs, não APK individual.
Pós420CI38114053725/job114395297104 counts4/497/145/3 e pós421CI38114405806/job114396322832 counts4/510/145/3 aprovados; APKs38114053744/38114405753 pendentes. Pós422CI38114552142/APK38114552077 em execução; pós423 ainda precisa reconsultar/discoverrun no SHAreal. OwnCIs420–429 aprovados heads exatos4web/497,510,528,571,588,599,610,617,626,637mobile/145API/3CLI com typecheck/build/export/migrations/privacy/HTTP. #429 headb99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c/tree843c3d34f52f8a56339b4ac88a3b3fef4651497f, CI38114334775/job114396112477 aprovado637mobile/145API, HTTP05:19:46.0138169Z; APK38114334761 em execução. #424–429ownAPKs pendentes. Não repetir419/420–423 ou rerun em execução; []/in_progress não sucesso.

Correção factual de timestamp: a cronologia real PostgreSQL do CI423/job114392671499 é04:58:09.0931902Z (não04:58:09.1185913Z digitado no texto do apêndice de suporte). Prova JSON/log já correta, retificar apenas o erro tipográfico nas referências preservando histórico e indicar esta errata.

Próxima ação concreta: publicar fix/signout-local-deadline sobre head429b99c2fd13d2c59b0c0d8ac900d70fe44cabb7c7c/tree843c3d34f52f8a56339b4ac88a3b3fef4651497f, basefix/signin-session-deadline; conferir bytes/diff e CI esperado4web/655mobile/145API/3CLI+APKstandalone no head exato. Integrar424→425→426→427→428→429→esta fatia somente com ownCI/APK aprovados, retargetmain após predecessor, revalidar diff/merge-base/tree/pais/main e pós-gates no SHAreal. Acompanhar pós420–423+posteriores; persistir provas/artefatos/runs atuais no ciclo.
Auditoria seguinte segura: saveProfile PUT ainda usa abort-only e pode ficar busy; confrontar backend/protocolo de ID/resultado incerto e preservação de draft antes de permitir retry. Demais mutations não idempotentes (convites/publicação/confirmações/casos/substituição/privacidade) exigem guards/unknown/ACK específicos e humano; não liberar indiscriminadamente nem alegar fechamento integral de cobertura.
Preferências/ajuda sem vínculo/ML/enterprise requerem definições/provas; físicoAndroid/E2E/VisualTruth/SecureStore/teclado/payload/restart/piloto, pentest independente, PSP/KYCsandbox/FIN-RISK/providers/TRUST e Web/Railwayeventualmentepago separados/abertos. ORIGINALv1.104 existente atualizado em lugar com histórico integral, memória/checkpoint/requisitos/evidência no mesmo commit. React19.1.4/RN0.81.6/lockfile/tenant/RLS/canônico e sem dinheiroreal/novosserviços/cobranças/infraestrutura/deploypago preservados. Um bloqueio parcial/fim de rodada não encerra projeto.


## Prazo do salvamento de perfil (2026-10-11 05:32:18 UTC)

O handler real Perfil.saveProfile deixava "Salvando…" ativo quando auth, transporte, JSON ou releitura da sessão não resolviam, apesar do abort de 15 segundos. Onze testes novos executam os handlers antes do JSX e os parsers/submitProfile de produção com hooks, auth, rede e timer explícitos: antes 5 falhas/6 sucessos; depois 11 sucessos. A bateria local com profile-submit, profile-analytics-read-deadline e signout-screen-deadline passou 50/50 no Node24. Não é render RN, SecureStore, dispositivo físico ou prova de cancelamento do servidor.

O prazo agora publica erro de confirmação, libera saving/submitting e mantém o rascunho. Uma ref própria identifica cada salvamento; respostas, auth, timers e finally antigos não podem reconhecer sucesso, apagar o rascunho ou desbloquear a tentativa seguinte. Antes do despacho, autorização precisa continuar a mesma; não há PUT atrasado após expiração. Depois do despacho, timeout é resultado incerto, nunca "Dados salvos". O ACK oportuno ainda exige ID real e todos os campos trim/null correspondentes à resposta da API. Nenhum retry automático foi criado.

Contrato conferido na main: ProfessionalProfileController autentica a identidade e faz ON CONFLICT(identity_id), com índice único parcial da migration0034. Repetir explicitamente o mesmo corpo atualiza o mesmo perfil, sem duplicar cadastro. O teste HTTP existente comprova autenticação, rejeição sem escrita, mesmo ID no update, trim/null e isolamento de outra identidade. A mudança não acrescenta versionamento de servidor nem garante que uma escrita despachada foi cancelada; edições diferentes continuam sujeitas ao contrato atual de última escrita. A prova local de retry cobre o mesmo corpo, sem declarar ordenação de commits concorrentes no banco.

Testes distintos: quatro fases pendentes, retry explícito de corpo trim idêntico com resposta/finally antigos, blur e novo proprietário, auth diferente antes do PUT, ACK com ID errado, criação com novo ID real/nulls, rejeição e nome vazio. O callback load/foco, signout, JSX, StyleSheets, ProfessionalNav e demais rotas são byte-identical ao predecessor #430; backend, migrações, helpers, fila de sessão, payload e lockfile não mudam.

Estado GitHub reconsultado: main b00be864d6ed6c7383f9f5267df054dad6907535; #420–424 integrados em ordem, com CI/APK próprios aprovados no head exato e pais/tree/main verificados. Pós-merge CI de todos420–424 aprovado; APKs pós-merge ainda em execução nesta consulta, sem afirmar aprovação. #430 head093d457f05cabc19e331510d29edee57819b6e22 tree0f9170f60544876d3163dc8fe93a151652f194e2 teve CI38114691222/job114397143587 aprovado4web/655mobile/145API/3CLI, HTTP05:27:16.1381558Z; APK38114691248 pendente. #426/#427 próprios APKs também passaram com install/launch e ZIPs não expirados/exatos, mas não podem integrar antes do predecessor.

Incidente confirmado: APK #425 run38113622026 attempt1/job114394056827 compilou (BUILD SUCCESSFUL05:15:30.5552022Z), mas o emulador falhou em input keyevent82 com Broken pipe32/exit224 às05:24:03.5502534Z, antes do script de instalação do aplicativo. Não houve DEVICE_SMOKE_OK nem APK validado. Diagnósticos publicados11693525710. Rerun somente do job falho autorizado e disparado no mesmo SHA8989feeb8206a36a03a268021ba204fa04b2b2c7; tentativa2 em execução, sem repetir enquanto pendente. Não é prova de crash do aplicativo nem aprovação nativa. O merge425 e dependentes aguarda esse gate; o trabalho independente deste perfil prosseguiu.

Próxima ação concreta: publicar fix/profile-save-screen-deadline sobre head430093d457f05cabc19e331510d29edee57819b6e22 e basefix/signout-local-deadline; verificar bytes/diff e gates próprios CI4web/666mobile/145API/3CLI+APK no SHA exato. Acompanhar rerun425, integrar425→426→427→428→429→430→esta fatia só com gates aplicáveis comprovados; revalidar retarget/main/merge-base/diff/pais/tree e pós-merge. Não repetir419–424. Registrar as novas provas efetivas no checkpoint; os blocos anteriores permanecem histórico, não estado atual.

Auditoria segura seguinte: conferir mutações reais ainda abort-only de publicação/convites/confirmações/casos/substituições/privacidade e seus protocolos de resultado incerto/ACK/idempotência. Não aplicar desbloqueio de GET a mutação sem contrato. Definições de preferências e ajuda sem vínculo, dados/validação ML e integração enterprise continuam dependências separadas. Android físico/E2E/Visual Truth, SecureStore/OS crash/teclado/payload/restart/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam abertos. React19.1.4/RN0.81.6, tenant/RLS, desenho canônico e lockfile preservados; sem dinheiro real, novas cobranças/serviços ou deploy pago. Documento ORIGINALv1.104 atualizado em lugar preservando histórico integral, memória/checkpoint/requisitos/evidências no mesmo commit. Bloqueio parcial não encerra o projeto.


## Prazo da saída pelo painel da empresa (2026-10-11 05:36:39 UTC)

A main foi confrontada novamente: EmpresaInicio.signout ainda esperava fetch sem limite efetivo e cancelava o timer antes da limpeza local. A mesma correção já proposta em Conta/Perfil não cobria este handler independente. Nove cenários do painel foram acrescentados à bateria existente usando o handler pré-JSX real, loadCompanyDashboard/sameCompanyContext de produção e a fila/clearExpectedSession reais com adapter explícito. Antes, 6 falhas/3 sucessos novos (incluindo timer ausente durante limpeza); depois 9/9 novos e 27/27 da bateria das três telas. Bateria com dashboard/actions/session-clear/session-transaction/profile-save:70/70 locais Node24.

O timer de saída agora permanece até a limpeza local terminar, publica erro de confirmação e encerra Saindo no prazo sem afirmar revogação remota. Promise.race(fetch,deadline) permite cumprir a saída local explicitamente solicitada mesmo se o transporte ignorar abort. Há uma ref própria para a operação: auth tardio não despacha, e timer/finally antigos não alteram a tentativa seguinte. A limpeza continua vinculada ao token original dentro da fila e somente cleared verificado permite navegar; stale/failed não confirmam saída. Não há retry automático, quebra da fila nem remoção de escrita nativa pendente.

A verificação adicional do contexto da empresa permanece integral: se a conta/contexto exibido já mudou, nenhum POST/clear novo é enviado. O teste de finally antigo com uma nova auth pendente preserva busy; depois de a primeira limpeza efetiva remover o token, a nova tentativa percebe o contexto alterado, não navega nem repete POST. As outras telas mantêm seus protocolos originais próprios. Blur/login posterior, falha parcial/readback, erro de storage e sucesso oportuno são casos separados. Não é SecureStore/OS crash, E2E físico ou revogação no servidor.

Load/foco, action(rating/preferred), openConversation, JSX/StyleSheets/CompanyNav do painel são byte-identical. session/helpers/backend/migrações/locks não mudam. A fixture do novo painel resolve dashboard/assignments/completed com parsers de produção e inicialização lazy de state; os casos anteriores Conta/Perfil continuam aprovados.

#431 headb0b001186dd9be8f54d20a82f94b9a6047c5a335 tree7f4b56e310d784d6bc04864bcb8c2459bf2daed2 teve CI38115110022/job114398342883 aprovado4web/666mobile/145API/3CLI e HTTP05:34:50.8163873Z; seu APK38115110028 está pendente. #430 CI655mobile aprovado, APK pendente. Main segueb00be864d6ed6c7383f9f5267df054dad6907535, merges420–424 e CIs pós-merge já comprovados; APKs pós-merge seguem em acompanhamento. APK425 tentativa1 falhou antes de instalar o aplicativo por input do emulador/Broken pipe32/exit224; tentativa2 do mesmo run38113622026 está em execução. Não integrar425 nem seus dependentes até prova completa no SHA exato, e não repetir rerun pendente.

Auditoria sem atividade artificial: Equipes.tsx REAL da main já tem callbacks de erro nos prazos de loadBase/selectTeam/selectAllocation; a cópia local mais antiga não autoriza repetir essa correção. GeneralSupport/SupportRecovery/DeclaredCapabilities também já cobertos conforme consulta anterior. Empresa.create, porém, contém uncertain.current marcado antes de POST não idempotente e não o consulta no guard de entrada; o timer ainda é abort-only. Próximo item concreto é reproduzir/revisar publicação sem confirmação e o contrato de recuperação antes de alterar esse fluxo. Publicação incerta não autoriza repetição automática; reconciliação/ACK precisa ser explícita e a referência visual respeitada.

Próxima ação: publicar fix/dashboard-signout-local-deadline sobre #431/headb0b001186dd9be8f54d20a82f94b9a6047c5a335 basefix/profile-save-screen-deadline, conferir bytes/diff e CI esperado4web/675mobile/145API/3CLI+APK próprio. Acompanhar425tentativa2 e gates pós420–424, integrar425→426→427→428→429→430→431→esta fatia em ordem com retarget/revisão/gates/commit/pais/tree/main e pós-merge. Blocos anteriores são histórico; não afirmam gates ainda pendentes.

ORIGINALv1.104 existente atualizado em lugar com histórico, memória/checkpoint/requisitos/evidências no mesmo commit. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Android físico/E2E/VisualTruth/SecureStore/OScrash/teclado/payload/restart/piloto, pentest, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam abertos. Sem dinheiro real, novas cobranças/serviços/infraestrutura ou deploy pago. Bloqueio parcial não bloqueia trabalho independente nem encerra o projeto.


## Publicação incerta sem reenvio não idempotente (2026-10-11 05:39:56 UTC)

Empresa.create real foi auditado contra CompanyJobCreateController: POST autentica/membership/tenant e insere um company_jobs novo; não há chave de idempotência no contrato existente. A tela marcava uncertain.current antes do despacho, mas não consultava essa ref na entrada seguinte. Dez cenários novos com handlers/date parser/publication/runForSession reais e fixtures explícitas reproduziram 7 falhas/3 sucessos, inclusive DOIS POSTs após resposta unknown + atualização manual da mesma empresa. Após a correção, 10/10 novos e bateria31/31 com publication-context/helper/session-context passaram localmente no Node24. Não é render RN nem prova física/banco de produção.

O guard agora recusa novo envio quando a publicação anterior permanece incerta. Atualizar a sessão/empresa de mesma autoridade e mudar foco não apagam a incerteza; nenhum retry automático ou POST adicional ocorre. O prazo de 15 segundos publica erro, encerra PUBLICANDO, invalida a autorização exibida e mantém todos os campos. Antes de despacho, não houve envio e é permitida uma nova tentativa após verificação explícita da empresa. Depois de despacho, resultado é incerto: o link existente para Planejamento volta a ficar disponível, mas conferir a lista NÃO prova que um POST pendente foi cancelado e NÃO libera automaticamente reenvio.

Uma ref própria conserva a identidade da tentativa: timer/ACK/finally antigos não limpam o novo formulário, confirmam publicação ou liberam tentativa posterior. O runForSession continua exigindo autorização + tenant exibidos antes/depois; ACK oportuno created ainda exige todos os dados reais do trabalho, e somente então limpa o formulário. Rejeição conhecida permite nova tentativa explícita; troca efetiva de contexto conserva a fronteira de isolamento já existente e apaga o rascunho anterior. Date/shiftWindow, loadContext/foco, JSX/CompanyNav/estilos, payload, endpoint, helpers, backend/migrações/RLS e lockfile são byte-identical/inalterados.

Limitação explícita: esta correção cumpre o bloqueio conservador da tela montada e seus focos; não cria armazenamento durável da tentativa, idempotência no servidor nem recuperação após reinício. Uma publicação despachada e desconhecida na mesma autoridade continua impedindo novo envio por essa tela até reconciliação segura; não há botão de bypass ou reset silencioso. A recuperação completa exige definir/implementar contrato durável que identifique a tentativa, payload/tenant/autoridade, resposta confirmada e conflito. A alteração não afirma conclusão do fluxo incerto nem bloqueia outras funcionalidades/PRs do projeto. O backend atual permite trabalhos de conteúdo idêntico legitimamente; não deduplicar por título/horário/cidade por suposição.

Casos distintos: auth/fetch/JSON/final-auth pendentes, unknown finito seguido de refresh, blur/refocus pós-despacho sem segundo POST, pre-dispatch expiração com retry autorizado/oldfinally protegido, novo proprietário/novo draft, rejeição oportuna e tenant diferente dentro da mesma conta. Dados de pagamento no teste são fixture de payload de vaga, nunca PSP ou dinheiro real.

mainb00be864d6ed6c7383f9f5267df054dad6907535, #420–424 integrados com ownCI/APK/pais/tree/main comprovados. Pós420 agora aprovado integralmente: CI38114053725/job1143952971044/497/145/3 + APK38114053744/job114395297192; install05:35:10.7875902Z/launch05:36:04.3498698Z Metrofalse; ZIP11692968057 digestsha256:4fba811cdbaed67401f613028daecddbe77c7989c2fca3f1809da343133af0dc, não expirado no SHA real64c5f2a09969e76d7077858af4a0623f2b43ce38. Isso é emulador standalone, não Android físico. Pós421–424 CI aprovado/APK pendentes na última consulta.
#431 ownCI666mobile aprovado, #432 CI675mobile e APK em acompanhamento; #425 tentativa2 do APK run38113622026 pendente após falha transitória do emulador antes da instalação, sem repetir rerun. Integração dos dependentes aguarda esse gate, nunca considerar pré-merge suficiente para gate pós-merge.

Próxima ação: publicar fix/publication-uncertain-deadline sobre #432/headb7555982898bd95bc3fd18688def28f12f0e6f61 basefix/dashboard-signout-local-deadline; conferir bytes/diff/gates CI4web/685mobile/145API/3CLI + APK próprio. Acompanhar425tentativa2 e pós420–424; integrar425→426→427→428→429→430→431→432→esta fatia em ordem, após retarget/diff/gates e verificação de SHA/pais/tree/main/pós-gates. Persistir novas provas efetivas no ciclo sem repetir merges.
Auditoria independente seguinte: mutações de convites/criação de equipes/chat/casos/substituição/privacidade podem manter busy em auth/rede/JSON pendentes e precisam prazo com unknown/ACK específico; inspecionar contrato antes de modificar. EquipesGET já cobertos; não corrigir cópia local obsoleta. Contrato de reconciliação durável da publicação permanece item separado real, sem adivinhar dedupe ou contornar segurança.

Documento ORIGINALv1.104 existente atualizado em lugar preservando histórico completo, com memória/checkpoint/requisitos/evidências no mesmo commit. React19.1.4/RN0.81.6/tenant/RLS/desenho/lockfile preservados. Android físico/E2E/VisualTruth/SecureStore/OScrash/teclado/payload/restart/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago abertos. Sem dinheiro real, novas cobranças/serviços/infraestrutura ou deploy pago. Bloqueio de uma dependência não encerra o projeto.


## Prazo do envio da conversa com ACK separado da atualização (2026-10-11 05:43:41 UTC)

O send real de Conversa continuava Enviando quando auth/fetch/JSON/final-auth ou o GET posterior ao envio não resolviam. Quatorze testes novos usam handlers send/load pré-JSX, routeId/loadMessages/sendMessage/runForSession reais e fixtures explícitas: antes9falhas/5sucessos; depois14/14 e bateria47/47 com read-deadline/conversation/session-context no Node24. Não há renderRN, servidor/chat real ou prova Android físico.

Callback15s agora invalida snapshot + sequence de leitura associada, publica erro e libera busy/pending sem afirmar que um POST desconhecido foi enviado. A mensagem digitada fica preservada até ACK real sent. O resultado de escrita é separado da atualização: após sent validado no contexto original, o texto já foi limpo legitimamente; se o GET posterior excede o prazo, a UI informa "Mensagem enviada" com falha de atualização, sem reclassificar o ACK confirmado como desconhecido e sem reenviar. Rejeição confirmada também preserva seu resultado quando a atualização falha.

Uma ref própria impede respostas/timers/finally antigos de desbloquear ou limpar outra tentativa. Após o prazo, load pendente não pode repor snapshot antigo; o usuário precisa atualizar para inspecionar mensagens. GET/retry de leitura nunca despacham POST. Nova tentativa de envio é somente explícita, conservando o contrato existente de conferir mensagens antes de reenviar quando houver dúvida; isto não acrescenta idempotência/deduplicação durável do chat nem prova cancelamento remoto. Troca de identidade/assignment/tenant/foco mantém o isolamento e política original de limpar texto na saída/troca de proprietário.

Casos separados: quatro fases do envio pendentes; quatro fases da atualização pós-ACK pendentes; inspeção manual sem POST e envio explícito posterior com finally/timer antigo; novo proprietário/rota; unknown finito; rejeição, vazio e identidade diferente antes do despacho. Headers/payload/path da conversa explícita são conferidos. Callbacks load/foco, requestWith/operation, JSX/StyleSheets e rotas são byte-identical; helpers/backend/migrações/fila/lockfile não mudam.

Estado confirmado: mainb00be864d6ed6c7383f9f5267df054dad6907535, #420–424 integrados em ordem com própriosCI/APK/pais/tree/main comprovados. Pós420CI+APK integral aprovado no SHA real (ver PUBLICATION_UNCERTAIN_DEADLINE_2026-10-11.md); pós421–424CI aprovado e respectivosAPKs em execução na última consulta. OwnAPKs426–429 agora todos aprovados com install/launch/artefato ZIP exato/não expirado, mas integração aguarda425. #425APK run38113622026 tentativa2 ainda em execução após Brokenpipe do emulador antes da instalação na tentativa1; não repetir rerun pendente. #431 ownCI666mobile aprovado, #432 ownCI38115345625/job1143990289924/675/145/3 aprovado/HTTP05:38:58.0866354Z; #433CI685mobile e APK em acompanhamento, sem afirmar PASS antes de prova. APKs430–433 pendentes.

Próxima ação: publicar fix/conversation-send-ui-deadline sobre #433/head43a25e2dcb7832b41bca77721b6c02084ef66808 basefix/publication-uncertain-deadline; revisar bytes/diff e CI esperado4web/699mobile/145API/3CLI+APK próprio no SHA exato. Acompanhar rerun425 e pós421–424; integrar425→426→427→428→429→430→431→432→433→esta fatia em ordem somente após retarget/revisão/gates aplicáveis e verificar SHA/pais/tree/main/pós-gates. Não repetir419–424. Persistir novas provas efetivas e próximos passos em ORIGINALv1.104/memória/checkpoint/requisitos/evidências, preservando todo histórico.

Itens concretos remanescentes independentes: createInvite/acceptInvite/revoke de Membros, create/changeMember de Equipes, ações de Talentos/Agenda/painel/candidatos/substituições/casos/privacidade ainda precisam auditoria de prazo de escrita com resultado incerto/ACK específico e protocolos de isolamento. Não aplicar desbloqueio genérico de GET. Recuperação durável e idempotência de publicação desconhecida permanecem abertas: nenhum bypass/dedupe por conteúdo foi autorizado ou implementado nesta fatia. EquipesGET e demais leituras já corrigidas na main não devem gerar commits repetidos.

React19.1.4/RN0.81.6/tenant/RLS/canônico/lockfile preservados. Android físico/E2E/VisualTruth/SecureStore/OScrash/teclado/payload/restart/piloto, pentest, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago seguem separados/abertos. Emulador não físico; ZIPdigest não APK individual. Sem dinheiro real, novas cobranças/serviços/infraestrutura ou deploy pago. Bloqueio parcial ou fim de rodada não encerra projeto.


## Validação real da entrada de publicação na API (2026-10-11 05:50:14 UTC)

CompanyJobCreateController foi confrontado com CompanyJobsController (candidatos/confirm), JobsController (marketplace/interest), a migration0005 e o fluxo HTTP existente. A criação real fica em company-job-create.controller.ts: body JSON não era validado em runtime. title/location/requiredRole/workCity de tipo errado causavam TypeError (500); datas numéricas podiam ser aceitas; modality falsy podia chegar à constraint; payCents fora de integer PostgreSQL chegava à escrita. Oito testes novos do controller real: antes5falhas/3sucessos, depois8/8 locais com dependências DB/auth/Nest explícitas; transformador Node24 remove apenas decorators/imports nativos para o fixture. Isso não é typecheck completo, Nest/Fastify real nem PostgreSQL real; estes são gates do CI.

Agora o handler aceita body unknown, autentica e verifica membership/papel antes de examinar a entrada. Body precisa ser objeto; título e campos opcionais de texto precisam de tipos corretos; datas precisam de strings parseáveis e fim posterior ao início. Modalidade não nula precisa de enum existente. payCents precisa caber na coluna integer não negativa da migration0005 (0..2147483647 centavos), sem criar política comercial nova. Erro de entrada resulta em 400 antes de iniciar this.db.tenant/INSERT. Falha de DB continua erro de servidor incerto, nunca reclassificada como entrada inválida.

Valores válidos preservam trim/null/defaults (requiredRole=título, pay=0, modalidadegig), timestamps canônicos, row real do banco e bind do tenant autorizado. Campos extras de autoridade/id do payload não são usados. SQL/retorno/GET/tenant/RLS/roles/esquema ficam integrais; nenhum dedupe, idempotência ou deploy foi criado. A recuperação durável de publicação incerta continua aberta conforme #433, sem reset/bypass pelo tipo de corpo.

scripts/http-company-job-input-e2e.sh adicionado ao passo HTTP do CI já existente: somente localhost descartável, duas empresas/owners de fixture, 34corpos malformados retornando400 e GETs comprovando lista anterior intacta/outrotenant vazio, auth401/membership403 antes de body{}, ACK válido/defaults e limite representacional integer. Bash syntax aprovado e URL externa recusada antes de rede. O script ainda depende de aprovação efetiva do CI neste head para provar Nest/Fastify/PostgreSQL; não antecipar PASS. Unit fixtures não comprovam isolamento do banco sozinhas.

APK para esta fatia API/test/script/CI/docs é NÃO APLICÁVEL por paths do workflow standalone EXISTENTE: nenhuma alteração em apps/mobile, scriptbuild/smoke, workflowstandalone, pacotes/lock/workspace. Árvore mobile de referência #434 éaf6a826aa9c1139a2e92a184703509c700a5fbfd, a verificar idêntica no novo head e na main após predecessor aprovado. Isso não dispensa APK próprio de434 nem seus gates pós-merge e não permite atribuir um APK de434 ao SHA API novo. CI próprio deverá aprovar4web/699mobile/153API/3CLI com typecheck/build/export/migrations/privacy/HTTP e marcador explícito do novo script.

Estado: mainb00be864d6ed6c7383f9f5267df054dad6907535; #420–424 integrados em ordem com própriosCI/APK e tree/pais/main comprovados. Pós420/421/423/424 agora completos CI+APK em SHAs reais, todos install Success/DEVICE_SMOKE_OK sem Metro/artifacts ZIPexatos não expirados. Pós422 CI aprovado e APK ainda pendente. #425 APK tentativa2run38113622026/job114397880306 está no smoke desde05:40:10Z, após build success; não repetir rerun em execução. PrópriosAPKs426–429aprovados. #434 headdac8aa1f1aecc1f92206a3d928e88b60e06968cf/tree4a24da3845f0235b610d1bfb301df0ccd7e6e5bd CI38115726584/job114400119592 aprovado4/699/145/3, HTTP05:45:26.8432072Z; APK38115726677 pendente. #433CI38115519749/job114399532651 aprovado4/685/145/3, HTTP05:42:26.2983523Z. Emulador não Android físico; digestZIP não APK individual.

Próxima ação: publicar fix/company-job-input-runtime-validation sobre #434/headdac8aa1f1aecc1f92206a3d928e88b60e06968cf basefix/conversation-send-ui-deadline; conferir bytes/diff/tree mobile e CI4web/699mobile/153API/3CLI+novoHTTP no head exato. N/A APK condicionado aos paths/árvore mobile e predecessor434APK aprovado. Acompanhar425tentativa2 e pós422; integrar425→426→427→428→429→430→431→432→433→434→esta fatia em ordem após retarget/revisão/gates aplicáveis e SHA/pais/tree/main, com pós-gates próprios. Persistir evidência atual/final em ORIGINALv1.104/memória/checkpoint/requisitos/registry sem criar substituto resumido.

Auditoria segura seguinte: outras entradas mutáveis da API que usam tipos TS sem validar JSON e mutações de Membros/Equipes/Talentos/Agenda/painel/candidatos/substituição/casos/privacidade com deadline/unknown/ACK específicos. Não inferir bugs de cópia local; reconsultar main. Preferências/ajuda semmembership/ML/enterprise requerem definições/dados/contrato; físicoAndroid/E2E/VisualTruth/SecureStore/OScrash/teclado/payload/restart/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago separados/abertos. React19.1.4/RN0.81.6/lockfile/desenho/tenant/RLS preservados; sem dinheiro real, novas cobranças/serviços/infraestrutura/deploy pago. Bloqueio parcial não encerra o projeto.


## Continuidade verificada 2026-10-11 05:56:27 UTC — correção de tipagem do PR #435 e gate #425

Main reconsultada: b00be864d6ed6c7383f9f5267df054dad6907535 (#424). #435 ainda não integrado. CI 38116087795, job 114401146934, falhou em Typecheck com TS2345: engagementModality unknown não estava estreitado para string antes de isEngagementModality. Correção inclui typeof string antes do predicado; 8 testes locais repetidos PASS (transformação/stubs, sem alegar typecheck Nest/PostgreSQL local). Novo SHA exige CI completo e HTTP novo; aprovação anterior não é reutilizada.

#425 attempt 2: build PASS e instalação Success em 2026-10-11T05:53:14.8458959Z; lançamento NÃO aprovado. Serviços Android com.android.providers.media.module/com.android.phone tiveram ANR de inicialização; monkey abortou com 0 eventos, sem DEVICE_SMOKE_OK. Job 114397880306 failure; diagnóstico ZIP 11693615584, sha256:d71754c172da54e0e145704470429ea1dd9ad290c208a636151c46542aaea555. Após leitura do log integral, rerun somente desse job solicitado, mesmo head 8989feeb8206a36a03a268021ba204fa04b2b2c7. Attempt 3 pendente; não contornar nem declarar gate aprovado. Próxima ação concreta: acompanhar tentativa 3, integrar #425 somente com gate real; depois #426–#435 em ordem, reconsultando heads, base, diff e main. Se nova falha, diagnosticar log antes de decisão, sem repetição automática ilimitada.

Pós-merge #422 agora comprovado no SHA cfb7d838697006d03c0ac1c9873d4ad1da08679a: CI 38114552142, job 114396746370, 4/528/145/3 testes PASS e HTTP PostgreSQL; APK 38114552077, job 114396746054, install/DEVICE_SMOKE_OK sem Metro; ZIP 11693243776 não expirado, sha256:91c3ec28d0067f6fbe926d263f2bd3da918280f05fa2864cf5b74ad67be3ca95. Portanto #419–#424 têm CI/APK pós-merge comprovados; não transferir essas provas para heads posteriores. Digest refere-se ao ZIP, não ao APK individual.

Documento original v1.104 preservado em lugar; nenhum gate físico/Visual Truth/E2E, pentest independente, PSP/KYC/FIN-RISK ou Web pago foi fechado. Sem dinheiro real/custo/deploy pago. APK de #435 permanece N/A condicional às paths e mobile tree idêntica ao predecessor #434 aprovado; não representa aprovação nativa própria.


### Retificação comprovada do contrato HTTP — 2026-10-11 06:00 UTC
CI #435 38116431968 no head c39bc3752f3434b69d1b0c30f2b9c053c0c8f8d1: Typecheck/Build/export/testes/migrações/retenção PASS, 4/699/153/3 testes sem falhas, mas HTTP NÃO aprovado. Job 114402119736 falhou porque o novo teste esperava 403 para falta de membership e a API vigente retorna 401. Fonte auth.service.ts::requireMembership lança UnauthorizedException('tenant_membership_required') quando identidade válida não pertence ao tenant solicitado; confirmado no código e GET autorizado da fixture. Corrigida somente a expectativa exata para 401; não se enfraquece auth/RLS nem muda a API. Nenhum gate completo #435 é declarado PASS até CI do novo SHA e todo HTTP aprovados. #430 APK 38114691248/job114397143546 attempt1 falhou em input keyevent82 Broken pipe32 antes de instalação em 05:43:22.5234357Z, build PASS; diagnóstico ZIP11693427721 sha256:38bc487638a2d67da8174c3bdf4476ac38e7f9dd732797477196c49f89b75dbc. Após log integral, rerun somente job falho solicitado; attempt2 pendente. #425 attempt3 pendente. Próxima ação: acompanhar e integrar em ordem com gates reais, sem bypass.


## Equipes: validação de JSON nas mutações — 2026-10-11 06:01:48 UTC

Falha concreta reproduzida na main b00be864d6ed6c7383f9f5267df054dad6907535: TeamsController.create/add recebem Body tipado mas null dispara TypeError em name/professionalId; números/objetos em name alcançam trim e professionalId inválido alcança SQL uuid. Alterados somente esses dois corpos para unknown, objeto record e validação antes de db.tenant. Nome continua texto não vazio trim, sem novo teto comercial; professionalId deve ser string UUID canônica, sem impor versão, refletindo o tipo uuid real de workforce_team_members e os IDs devolvidos pela API. Autenticação/membership/roles precedem validação; nenhuma authority do payload é usada. Queries de requireTeam/work_assignments, isolamento tenant, ON CONFLICT DO NOTHING e ACK existentes preservados. Falhas DB continuam erro servidor/incerteza, não 400 sintético.

6 testes locais novos: ANTES 2 FAIL/4 PASS (TypeError null), DEPOIS 6 PASS/0 FAIL; fonte real TS transformada com stubs explícitos, não prova de typecheck Nest/Fastify/PostgreSQL local. HTTP novo localhost/disposable somente: 12 corpos inválidos na criação e 13 na adição, 400 e GETs inalterados para ambos tenants; 401 identidade ausente ou membership ausente conforme auth.service.ts, nome válido trim, UUID válido sem assignment continua rejeitado. Jornada já existente http-team-allocation-e2e.sh mantém prova positiva de assignment/add/remove/conflito com dados reais. bash -n PASS e URL externa rejeitada antes de HTTP. CI do head precisa comprovar frozen lock/typecheck/build/export + 4/699/159/3 testes + marcador HTTP "PASS: team malformed input rejects 400 without writes" e demais jornadas/Production Truth. Ainda PENDENTE até execução real; nenhum merge autorizado por fixture local.

Mudança de API/CI/testes/docs: APK próprio N/A apenas se paths do diff continuarem fora do standalone workflow e subtree apps/mobile af6a826aa9c1139a2e92a184703509c700a5fbfd for idêntico à main predecessora #435. Integração depende de #435 CI/HTTP exato e de #434 próprio APK aprovado; citar o head nativo #434 explicitamente, nunca atribuir seu ZIP ao head API. Pós-merge nativo #434 permanece separado. Documento ORIGINAL v1.104 atualizado em lugar e todo histórico mantido. Sem alteração React19.1.4/RN0.81.6/lockfile/schema/RLS/JSX, sem celular físico, PSP ou custos. Visual Truth/E2E físico/pentest/PSP/KYC/FIN-RISK/Web pago continuam ABERTOS.

Main e fila reavaliados: #419–#424 pós-merge CI/APK comprovados. #425 attempt3 do APK em acompanhamento; #430 attempt2 também, falhas anteriores do emulador documentadas. #431 e #433 próprios APKs agora PASS, logs integrais instalação+DEVICE_SMOKE_OK sem Metro e ZIP de SHA exato, sem equivalência a teste físico. #432/#434 ainda em execução na última consulta. #435 novo head 5b9f91029a5401b6c54c64862076bcd7e7e981fc CI38116648295 em execução após corrigir TS2345 e expectativa membership401. Próximo: gates #425, integrar #425–#436 em ordem somente próprios gates aplicáveis aprovados, pós-merge exact SHA e atualizar recibo, sem repetir merges nem desativar rotina por pendência parcial. Parâmetros de rota UUID e protocolos duráveis de publicação/mutações pendentes continuam alternativas concretas; não se declara fechamento integral.

Evidência: [validação de equipes](../evidencias/TEAM_INPUT_RUNTIME_VALIDATION_2026-10-11.md).


## Validação das rotas de equipes — 2026-10-11 06:06:16 UTC

A pendência dos parâmetros de rota UUID no mesmo TeamsController foi reproduzida e corrigida nesta fatia: GET membros, POST membro e DELETE membro agora rejeitam IDs não canônicos antes de db.tenant/query/cast uuid, após autenticação/membership/role original. UUID_RE não impõe versão; IDs canônicos emitidos pela API e SQL/RLS existentes preservados. Nenhuma lista/snapshot ou ACK fictício.

Três testes adicionais dos handlers reais: matriz anterior 9 testes, 2 FAIL/7 PASS; matriz final 9 PASS/0 FAIL local (limitações de stubs já registradas). Confirmam rejeição sem abrir tenant/query, prioridade 401/403 e consultas válidas com tenant confiável/DELETE exato; continuam 6 regressões anteriores de Body. HTTP de equipes acrescenta GET/POST/DELETE de rota inválida com 400 e GETs inalterados, sem relaxar jornada válida de alocação existente. bash -n PASS. CI do NOVO head espera 4/699/162/3 e todos HTTP; não reutilizar a aprovação do head anterior f5133a4c061b1d0652654282fe907494e018d640 (CI38116726059 passou 4/699/159/3 e marcador equipe em 2026-10-11T06:04:18.0077457Z).

#435 head5b9f91029a5401b6c54c64862076bcd7e7e981fc CI38116648295/job114402739344 confirmado PASS em todos os passos, 4/699/153/3, marcador job inválido 2026-10-11T06:02:39.4641635Z e cronologia PostgreSQL 06:02:54.5430625Z; ainda não merged. #425 attempt3/#430 attempt2 em execução, sem gate nativo aprovado nessas tentativas. Main permanece #424 b00be864d6ed6c7383f9f5267df054dad6907535. Próxima ação: acompanhar #425/#430/#434; integrar em ordem #425–#436 com gates aplicáveis exatos e confirmar pós-merge. APK desta fatia API permanece N/A condicional a mobile tree idêntica e #434 nativo; gates físicos/Visual Truth/pentest/PSP/Web pago permanecem abertos. Histórico v1.104/memória/checkpoint preservados. Sem custos, provider, dinheiro real ou deploy.


## Convites: contrato de entrada e ausência de coerção — 2026-10-11 06:10:55 UTC

Falha real reproduzida no CompanyMembersController: String(body.email/role/inviteCode) aceitava arrays e podia revogar/gerar convites ou consumir código válido com JSON de tipo errado. revoke id não UUID podia alcançar cast PostgreSQL. Correção restrita: Body unknown precisa de objeto e campos string antes de trim/enum/hash/db.tenant; revoke rejeita ID não canônico após ownerContext. Autenticação/membership/papel owner precedem validação; enum MANAGEMENT_ROLES, advisory lock/revogação anterior, randomBytes32/base64url43, token hash, expiração7dias, matching de e-mail, membership/role atual, RLS e ACK preservados. Sem mudança no protocolo de consumo (não declarar replay aceito), segredo/authority não é inventado e erro DB continua incerto.

7 testes novos em fonte real TS com fixtures explícitos (crypto real): ANTES3FAIL/4PASS porque arrays foram aceitos e revoke abriu DB; DEPOIS7PASS/0FAIL. Cobrem zero abertura de tenant/escrita para entrada errada, 401/403 antes de entrada, normalização/tenant confiável, três consultas de convite/advisory, ACKs accept/revoke e propagação de erro DB. Limitação: transformação/stubs, sem alegar typecheck/Nest/PostgreSQL local. HTTP novo localhost/disposable: 11 JSONs inválidos para invite e 8 para accept incluindo array com código REAL válido; todos400, GET de convites inalterado e nenhuma revogação/consumo/alteração em outro tenant; UUID revoke400, ausência auth/membership401, accept string válida ACK de tenant real e admin nãoowner403. Não enviar e-mail/mensagem nem contratar provider; somente fixtures efêmeras CI. bash-n PASS e URL externa rejeitada antes de HTTP. CI próprio exigido no head exato:4/699/169/3, Typecheck/Build/export/frozenlock/migrações/retenção, novo marcador HTTP e jornadas existentes/Production Truth. Pendente antes da publicação.

Base #436 head3d35c9d2460de392e3859fdcdec4f3b2ce1c893a CI38116970206/job114403670485 agora PASS:4/699/162/3 e HTTP/PostgreSQL06:08:13.5270209Z. #435 ownCI também comprovado; nenhum desses PRs merged ainda. #434 próprio APK38115726677/job114400119723 PASS com install06:07:10.4558315Z e DEVICE_SMOKE_OK06:08:18.0123715Z, ZIP11694680015, sha256:1a1e8bbbf537e634e300fe8d1df29cb1ff69235d16d4d2e162f3cb831dd87b08, SHA próprio dac8aa1f1aecc1f92206a3d928e88b60e06968cf, não expirado. Main ainda #424 b00be864d6ed6c7383f9f5267df054dad6907535; #425attempt3 e#430attempt2 em acompanhamento.

API/CI/testes/docs somente, APK próprio N/A condicional às paths e subtree apps/mobile af6a826aa9c1139a2e92a184703509c700a5fbfd idêntica à main predecessora #436; exige CI/HTTP de #436 e native own #434 previamente provado, com native pós-merge #434 separado. Não reatribuir artefato434 ao head desta API. Atualizado ORIGINALv1.104 em lugar sem apagar história; memória/ledger/checkpoint/registro/evidência no mesmo commit. Visual Truth/Android/E2E físico, SecureStore nativo, pentest independente, PSP/KYC/FIN-RISK/providers/Web pago continuam abertos; sem dinheiro real ou nova cobrança/deploy. Próxima ação: gates425 e430, integrar425–437 em ordem com gates aplicáveis exatos, pós-merge e recibo concreto. Publicação durável incerta e prazos de mutações Membros/Equipes (com preservação da fila de SecureStore no aceite) continuam pendências reais; não fabricar idempotência/contornar unknown/autoridade para avançar.


## Revogação: prazo da interface e recibo de integração — 2026-10-11 06:31:01 UTC

Estado atual revalidado no GitHub: main a4a4a730a77811da275b80e79103ebb0f2012580 (#437), tree7c2eac5e155bdc2998989edf8aee18c8d378b8be; zero PRs abertos antes desta correção não prova conclusão. README aponta o Documento ORIGINAL v1.104, memória e checkpoint foram relidos na main acima. #420–#437 integrados em ordem após retarget main, diff/bytes revistos, CI e APK próprios quando aplicáveis PASS, lease/head/main reconsultados. Pais e árvore de cada merge real verificados; nenhuma squash/reescrita/perda de predecessores. #435–#437 mudaram somente API/CI/testes/docs; native N/A provado por paths e mobile tree idêntica ao nativo aprovado #434, nunca artefato atribuído ao head API. CI pós-merge de TODOS #420–#437 PASS no SHA real. Native pós-merge #419–#424 PASS; #425–#434 ainda em execução na consulta, NÃO PASS. #437 CI pós-merge38117884742 attempt1 falhou no pull ECR postgres17 toomanyrequests antes de Checkout (job114406370358,06:23:25.7824511Z); após log integral e espera, rerun só job falho: attempt2/job114406796501 PASS4/699/169/3, HTTP06:28:24.8423915Z. Não mudou código/registry/gate para contornar falha.

| PR | SHA merge real | CI / APK próprios | CI pós-merge | APK pós-merge |
|---|---|---|---|---|
| #420 | 64c5f2a09969e76d7077858af4a0623f2b43ce38 | 38112711675 / 38112711679 | 38114053725 | 38114053744 |
| #421 | 9ff2ef5a3c30e42a1908949053e6849b07f50651 | 38112820567 / 38112820608 | 38114405806 | 38114405753 |
| #422 | cfb7d838697006d03c0ac1c9873d4ad1da08679a | 38112956435 / 38112956424 | 38114552142 | 38114552077 |
| #423 | 7993dd0c5f4646b2e9b48b79923041b9f3a842dc | 38113140672 / 38113140682 | 38114600972 | 38114601054 |
| #424 | b00be864d6ed6c7383f9f5267df054dad6907535 | 38113453286 / 38113453352 | 38114903819 | 38114903781 |
| #425 | c6334b4ec643a17a9420f1981c77e10d1488d9e0 | 38113622093 / 38113622026 | 38117688717 | PENDENTE 38117688718 |
| #426 | 321aa035059347fb6cd734acce0045c0fd9fca0c | 38113777302 / 38113777319 | 38117698235 | PENDENTE 38117698241 |
| #427 | 9678fb99a37b3f4bf699347ca439936ecc4dc25f | 38113969108 / 38113969118 | 38117706895 | PENDENTE 38117706908 |
| #428 | b298d5291df5a657136c66d316055c7615c30a4d | 38114121811 / 38114121800 | 38117717030 | PENDENTE 38117716994 |
| #429 | c05a95fc29490a5dff25d71546c2a535d6f97d33 | 38114334775 / 38114334761 | 38117728724 | PENDENTE 38117728773 |
| #430 | 5aa8a055ab715e91e39dac4989039375b3a75c1f | 38114691222 / 38114691248 | 38117818305 | PENDENTE 38117818330 |
| #431 | abf5f84304d7198fb75b999c4db3f5add54c8127 | 38115110022 / 38115110028 | 38117828679 | PENDENTE 38117828684 |
| #432 | f580690d383eb6f8bc33d231849044b11f48c1ec | 38115345625 / 38115345646 | 38117838749 | PENDENTE 38117838770 |
| #433 | 5aa264d3457f7146a2ab741890f7830c77f20a20 | 38115519749 / 38115519750 | 38117848157 | PENDENTE 38117848154 |
| #434 | ed6d7efc9249b7dddf3b990f3fdc1b2caf728849 | 38115726584 / 38115726677 | 38117857810 | PENDENTE 38117857802 |
| #435 | 65001ddccdcc401ee8113d141bfa63341ea70b3d | 38116648295 / N/A paths/mobile iguais | 38117867644 | N/A paths/mobile iguais |
| #436 | 409dc05a90ca55520d28007464392442f324b65a | 38116970206 / N/A paths/mobile iguais | 38117877920 | N/A paths/mobile iguais |
| #437 | a4a4a730a77811da275b80e79103ebb0f2012580 | 38117227111 / N/A paths/mobile iguais | 38117884742 | N/A paths/mobile iguais |

Falha concreta: Membros.revoke tinha timer abort-only; auth/fetch/JSON/auth final e atualização GET pendentes deixavam busy/pending true indefinidamente e ocultavam atualização. 14 regressões novas reproduziram ANTES12FAIL/2PASS; DEPOIS14PASS. Matriz ampliada local67/67 (14novos+10company-members+43secondary-read), handlers pré-JSX e helpers reais, hooks/auth/fetch/timers explícitos; sem renderRN/SecureStore/Android físico ou rede externa. Revoke ganha ref controller acrescida após refs existentes e callback15s: somente na operação/generation atual invalida contexto e sequência de leitura, limpa lista para estado error e libera busy/pending. Antes de ACK exato não afirma revogação; após ACK válido bool/id e atualização pendente preserva confirmação, reporta falha da atualização. Guardas isCurrent com controller/epoch/abort impedem resposta, timer, catch ou finally antigo de modificar novo foco/tentativa. Troca de identity/tenant invalida autoridade e envia zero POST quando anterior ao transporte; id ausente/aceito/revogado não transporta. Rascunhos/email/código/unknown da criação preservados. Sem retry automático, navegação ou saveTenantForContext; fila nativa/sessão pareada não é removida nem ultrapassada.

Backend existente revoga por id+tenant e accepted_at IS NULL, COALESCE(revoked_at,now()), ACK invitationId real; repetição EXPLÍCITA do mesmo ID é idempotente conforme contrato atual. Não inventar idempotência para criação/aceite, não desbloquear unknown mediante suposição de cancelamento no servidor. Corpo createInvite/acceptInvite e JSX/StyleSheets comparados byteidênticos; GET load/defaultoperation e protocolo/DB/API sem mudança nesta fatia. React19.1.4/RN0.81.6/lockfile/standalone sem Metro/RLS preservados.

CI próprio novo exigido4/713/169/3 +typecheck/build/export/frozenlock/migrações/retention/HTTP/Production Truth e APK standalone no HEAD EXATO; ambos PENDENTES antes de publicar. Pós-merge desta fatia também será consultado no merge SHA real; nenhum sucesso antecipado. Atualizados originalDVT/memória/checkpoint/ledger/registro/evidência no mesmo commit. Gate Visual Truth/E2E/Android físico (todos estados/desenho original), SecureStore/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers e Web/Railway eventualmente pago continuam OPEN. Sem PSP/dinheiro real/novas cobranças/provider/deploy pago e sem alterar rotinas por bloqueio parcial.

Próxima ação concreta: publicar fix/member-revoke-screen-deadline em PR sobre main, revisar bytes/diff/gates713/169 e APK, integrar só após aprovação exata; acompanhar native pós-merge425–434 e novo head, registrar resultados. Auditar changeMember em Equipes (POST/DELETE idempotentes por par team/professional, timer ainda abort-only) com foco/seleção/authority/ACK+reload preservados. Criação de convite/equipe/publicação e aceite pós-SecureStore têm contratos de resultado incerto/fila/durabilidade separados; não lançar reenvio não idempotente para simular progresso. Preferências/help nova sem membership/forecast/providers dependem contratos/dados/autoridade externos já registrados; não inventar defaults ou tenant global. Fim de rodada não equivale a conclusão; rotina permanece ativa até prova integral ou ordem expressa.


## Talentos: validação de entradas e integração #438 — 2026-10-11 10:53 UTC

Estado real reconsultado: main 27e96142ecde5efa10adb05ef436bb5a3f123865, PR #438 integrado, pais [a4a4a730a77811da275b80e79103ebb0f2012580,534b140eb90ff6c654291a52eeb0c5f13d2e323c], tree 2c862ecc83e211ee6919abfe4ca34e79d44a1172 igual ao head aprovado. Próprio CI38118324001/job114407664065 PASS4web/713mobile/169API/3CLI e HTTP/PostgreSQL/Production Truth; APK38118324003/job114407663132 install Success06:47:48.6657802Z e DEVICE_SMOKE_OK06:48:42.1183401Z sem Metro. ZIP11694638840 sha256:ea7563b1a583c7c6ff689f49f58381842b57cb8cb4db21bb7d7175b2491cd64e, não expirado, HEAD exato534b140e. Pós-merge CI38133235768/job114451722736 PASS4/713/169/3, PostgreSQL10:50:16.1745522Z e Production Truth10:50:20.8310963Z; APK38133235730 ainda EM EXECUÇÃO, NÃO PASS. Não repetir merge438 nem voltar ao checkpoint419.

Reconsulta dos pós-merge425–434: APK425/426/428/429/430/431/432/433/434 agora PASS com todos passos aplicáveis, instalação/lançamento sem Metro e ZIP de SHA real não expirado. APK427run38117706908/job114405838646 attempt1 falhou após build PASS, antes de instalação aprovada: PackageManager do Android quebrou (Broken pipe32, serviço package ausente, freeStorage null); exit1 em06:41:54.8029345Z. Log integral lido, diagnóstico ZIP11694012855 sha256:f134f33c6bfb0219e5c98c33d048c10a0f50ef564600d1e300a02d06f7bd6582. Uma nova tentativa somente desse job solicitada, mesmo mergeSHA9678fb99a37b3f4bf699347ca439936ecc4dc25f; attempt2 EM EXECUÇÃO, não considerar aprovado nem repetir rerun enquanto executa. Gate nativo427 separado e aberto até prova; não alterado smoke/timeout/registry para contornar erro. Detalhes exatos no recibo desta evidência.

Falha concreta independente em TalentPoolsController.add/remove: Body apenas tipado permitia TypeError em null e professionalId malformado alcançava active_tenant_professional/cast uuid ou DELETE. Agora Body unknown deve ser objeto, professionalId string UUID canônica sem impor versão e pool texto do enum existente preferred/network/open; remoção valida UUID antes de db.tenant. Auth/membership/company role continuam anteriores à validação. Mantidos SQL/RLS/predicado active_tenant_professional, tenant autorizado, ON CONFLICT/ACK de mesma chave e DELETE original. Dados extras do payload não são autoridade. Erro DB continua falha incerta do servidor, não400 sintético. Nenhuma nova política comercial, schema, provider ou exposição global.

8 testes novos de handlers reais: ANTES3FAIL/5PASS, DEPOIS8PASS/0FAIL. Transformação TS com stubs Nest/auth/DB explícitos localmente, não equivale a typecheck/Nest/PostgreSQL. Cobrem corpo inválido, UUID/enum, prioridade401/403, zero tenant/query para erro, ACK idempotente válido dos três pools, DELETE exato e erro DB. HTTP novo somente localhost descartável: 23JSONs malformados400, GET baseline intacto e outrotenant vazio, rotaDELETE inválida400, 401/403 preservados, UUID real sem trabalho no outrotenant400, profissional real criado/assignment confirmado, três pools com repetição da mesma chave sem duplicidade e DELETEs válidos. bash-n PASS; guard localhost explicitamente aceita127.0.0.1/localhost com porta e rejeita domínio externo ou userinfo antes de rede.

Fatia API/test/script/CI/docs: APK próprio N/A por paths do workflow standalone EXISTENTE e mobile subtree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao #438 aprovado, a revalidar no head e pós-merge; isso NÃO atribui o ZIP438 ao novo SHA, nem fecha seu pós-merge nativo. CI próprio deve aprovar4/713/177/3, typecheck/build/export/frozenlock/migrações/retenção/HTTP/Production Truth e novo marcador de talentos. PENDENTE antes de publicar; só integrar depois de revisão/diff/bytes/head/main/gates exatos. DVT ORIGINALv1.104 atualizado em lugar, histórico preservado, memória/ledger/checkpoint/registry/evidência no mesmo commit.

Próxima ação concreta: publicar fix/talent-input-runtime-validation sobre main438; revisar CI do head exato e N/A condicional, integrar com lease/tree/pais/main e verificar pós-CI. Acompanhar pós-APK438 e retry427 até prova, documentar resultado. Equipes.changeMember abort-only permanece pendência, mas release que permita ADD/DELETE oposto após resultado incerto requer ordenação/reconciliação, não basta idempotência por verbo; não implementado bypass. Criação/aceite de convite, publicação/equipe durável, SecureStore pareado pendente/restart, Visual Truth/Android/E2E físico/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam OPEN. Sem dinheiro real, nova cobrança, contratação ou deploy pago. Rotina ativa; fim de rodada e bloqueio parcial não encerram projeto.


## Avaliações: validação de corpo e rota — 2026-10-11 10:59 UTC

Main real: 510b1e5efd192d23ffce7e4b0ec6b9438681ae79, PR #439 integrado depois de CI38133627064/job114452879922 PASS4web/713mobile/177API/3CLI com novo HTTP de talentos e todas jornadas, professional week10:56:48.3335271Z/Production Truth10:56:53.4433913Z. Head aprovado01a37be1de8554f18fb765f698aea390cff3b092; merge parents[27e96142ecde5efa10adb05ef436bb5a3f123865,01a37be1de8554f18fb765f698aea390cff3b092], tree6f21cd2aadff94ba0da0c11fed370cf9d514f7ef igual ao head; main confirmada. Native próprio439 N/A por paths API/CI/test/docs e mobile subtree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica a438 aprovado; não atribuir ZIP438 ao SHA439. Pós-CI43938133818442 EM EXECUÇÃO. Pós-APK43838133235730 e retry42738117706908 attempt2 também em execução na consulta10:58:13Z; NÃO PASS até log/artefato exatos. Documento ORIGINALv1.104/histórico continuam em lugar.

Falha reproduzida em RatingsController nas duas direções: null dispara TypeError em body.score; comment número/objeto/array dispara trim TypeError depois de abrir tenant; rota id inválida alcança cast UUID no SELECT. Body unknown com record e score inteiro1–5 existente agora rejeita entrada malformada400; após canRate existente valida comentário texto/null e UUID canônica sem impor versão antes de DB. Ordem identity/membership→score→role preservada (inclusive score inválido400 antes de role inválida); comentário/UUID não ultrapassam permissão válida. Strings válidas trim, ausência/null/branco→null, tenant/identity/professional reais e ACKs/upserts iguais. As QUATRO queries SQL comparadas byteidênticas; completed assignment e p.identity_id=$4 continuam obrigatórios, erro DB não é reclassificado como400. Sem mudança na política de reputação, RLS, esquema ou dinheiro.

9 regressões novas: ANTES3FAIL/6PASS; DEPOIS9PASS. Matriz ampliada local12PASS/0FAIL incluindo3rating-policy existentes. Transformação TypeScript com stubs explícitos Nest/auth/DB, não é prova de typecheck/PostgreSQL local. Testes cobrem entradas sem escrita, auth/roles/prioridade anterior, trim/null/campoextra nãoautoridade, assignment concluído real requerido, ambas tabelas e falha DB incerta. HTTP já existente http-ratings-reputation-e2e.sh ampliado sem substituir positivos: 19corpos inválidos por direção (38requests)400, rotas inválidas400, ausênciaauth e nomembership401; GET assignments real continua companyRatingScore3 e passaporte averageRating5/count1 depois de cada tentativa, sem sobrescrever avaliações. Jornada original de avaliação bidirecional/updateidempotente/reputação permanece; guard aceita só localhost explícito antes de rede, bash-n PASS e endereço externo recusado. CI próprio espera4/713/186/3 e marcador "PASS: rating malformed input rejects 400 without replacing bidirectional real scores"; PENDENTE antes de publicar.

Fatia somente controller/test/API HTTP/docs, mobile/subtree/pacotes/lock/scriptsbuild/smoke/workflowstandalone sem mudança. APK próprio N/A CONDICIONAL aos paths/árvore iguais à main439 e próprio nativo438 aprovado; seu gate pós-merge separado continua aberto. Atualizados Documento ORIGINALv1.104, memória/checkpoint/ledger/registro/evidência no mesmo commit, nenhum substituto resumido.

Próxima ação: publicar fix/rating-input-runtime-validation sobre main439; revisar bytes/diff/tree e CI186API do head exato, integrar só gates aplicáveis aprovados com lease/pais/tree/main e verificar pós-CI. Acompanhar gates pós438/retry427 e pós439, registrar recibo completo. Próxima auditoria segura a revalidar é entrada JSON em ConversationsController e auth signup/signin, sem alterar antiabuso/credenciais/roles/RLS nem enfraquecer contrato. Equipes.changeMember exige cuidado com resultado desconhecido/ordem ADD→DELETE; idempotência por verbo não prova cancelamento ou ordenação, nenhuma liberação insegura implementada. Criações/aceite durável, SecureStore/físico/Visual Truth/E2E/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers e Web/Railway eventualmente pago seguem OPEN. Sem contratação, PSP, dinheiro real, custo novo ou deploy pago; bloqueio parcial não encerra projeto.


## Conversas: entrada de mensagem e IDs — 2026-10-11 11:04 UTC

Main revalidada: 5389cb9d27e081892064b5b62740223373b67fd7, PR #440 integrado após CI38133917114/job114453747810 PASS4web/713mobile/186API/3CLI, marcador ratings inválidos e HTTP professional week11:02:00.7851298Z/Production Truth11:02:09.0017461Z. Head0ffd1b196c1faaf41367aa9370d2dd385f3cb77a, pais[510b1e5efd192d23ffce7e4b0ec6b9438681ae79,0ffd1b196c1faaf41367aa9370d2dd385f3cb77a], treeef0fb74e1a61ad7248d3b98b0a47772520b5e765 idêntica ao head, main confirmada. CI pós43938133818442/job114453443368 agora PASS4/713/177/3 com HTTP11:00:02.9200899Z/Production Truth11:00:08.1807470Z. CI pós440 consultado no merge SHA, pendente antes desta publicação. Native próprio440 N/A por paths e árvore mobile idêntica a439/#438. Pós-APK43838133235730 e retry42738117706908 attempt2 ainda em execução na última consulta; não converter pending em PASS.

Falhas reais em ConversationsController: body nulo ou campo body não texto causa TypeError em trim; UUID de assignment inválida alcança SQL de GET/POST. Body unknown agora exige objeto e string não vazia após trim, reutiliza message_required400; GET e POST verificam UUID canônica sem versão após ctx/auth/membership e antes de abrir tenant. Queries SQL (9 ocorrências) comparadas byteidênticas, acesso por assignment real/tenant/professionalidentity/roles, geração de conversa, mensagem e notificações de destinatários reais permanecem. Não adiciona ACK/idempotência/reenvio fictício nem cancela servidor. Mensagem segue não idempotente; deadline/unknown do mobile#434 não foi relaxado. Erro DB continua incerto; nenhuma operação em dados reais de usuário foi executada.

9 testes novos: ANTES3FAIL/6PASS, DEPOIS9PASS/0FAIL, TS transformado com stubs explícitos Nest/auth/DB localmente (sem equivalência a Nest/typecheck/PostgreSQL/Android). Cobre corpo/campo nulo/tipo errado, branco, UUIDs GET/POST, auth401 anterior, assignment404 e ACL403 sem INSERT, tenant/sender ignoram authority extra, criação válida e notification destinatário real exclui sender, erro DB não vira sucesso. HTTP journey existente ampliada com fixtures descartáveis localhost: 14JSONs inválidos por ator (28POSTs), ID inválidoGET/POST400 e auth/membership401; GET mensagens permanece[] e snapshots de notificações de profissional/empresa permanecem byte-equivalentes em JSON após cada tentativa. Positivos originais empresa/profissional/chat/notificação/cross-tenant/ratings/talentos e trabalho multiempresa preservados. bash-n PASS e domínio externo recusado antes de rede. CI próprio novo deve comprovar4/713/195/3 +novo marcador "PASS: conversation malformed input rejects 400 without messages or notifications", typecheck/build/export/frozenlock/migrações/retenção e todasjornadas/Production Truth. PENDENTE antes da publicação.

Diff só API/controller/test/scriptHTTP/docs; APK próprio N/A CONDICIONAL a paths/árvore mobile4cb705aeb39244f46649bc5c569459ef9b0c5b7d iguais à main440, nativo438 próprio aprovado. Pós438 e retry427 continuam separados até prova, ZIP não é digestAPK individual nem emulador físico. Originalv1.104 atualizado em lugar/histórico inteiro preservado, memória/checkpoint/ledger/evidence registry/evidência no mesmo commit. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho e standalone sem Metro mantidos.

Próxima ação concreta: publicar fix/conversation-input-runtime-validation sobre main440, revisar bytes/diff/gates CI195API exatos e mobile N/A, integrar com lease/pais/tree/main e verificar pós-CI. Acompanhar pós438/retry427/pós440 e registrar recibo final sem repetir merges. Próxima pendência real a revalidar: entradas null/tipos em AuthController.signup/signin (body apenas tipado chama normalização/trim sem record), mantendo códigos/auth/rate-limit/scrypt/sessões e prioridades de validação; também SupportController.status (nota tipada) sem inventar status ou autoridade. Equipes.changeMember resultado incerto/ordem dos verbos e criações/aceite duráveis/fila de SecureStore continuam contratos separados. FísicoAndroid/E2E/Visual Truth/SecureStore/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago OPEN. Sem dados fictícios de produto, provider, dinheiro real, novas cobranças ou deploy pago; rotina ativa, fim de rodada não encerra projeto.


## Recibo de retomada verificada — 2026-10-11 11:16:34 UTC

Base de código: main739908e026ac10bd254e9ea64aa940c404d2f5a0, tree56dea8f89da703f9dbeaf9cd0e321a191e25e04a (#441). Zero PR aberto na última consulta NÃO prova conclusão. README continua apontando ESTE Documento ORIGINALv1.104, todo histórico preservado em lugar. #438/#439/#440/#441 integrados com head próprio/diff/bytes/pais/tree/main/gates aplicáveis revistos. #438 corrige prazo da revogação; #439 entrada de talentos; #440 avaliações; #441 mensagens/UUID. 14+8+9+9 regressões novas, corpos inválidos não chegam a tenant/query nem modificam mensagens/avaliações/notificações reais de fixtures. Fixtures locais não equivalem a Android físico/Nest/PostgreSQL; CI completo/HTTP real comprova a camada servidor.

| PR | Head aprovado | Merge real | CI próprio | CI pós-merge |
|---|---|---|---|---|
|438|534b140eb90ff6c654291a52eeb0c5f13d2e323c|27e96142ecde5efa10adb05ef436bb5a3f123865|38118324001,4/713/169/3|38133235768 PASS|
|439|01a37be1de8554f18fb765f698aea390cff3b092|510b1e5efd192d23ffce7e4b0ec6b9438681ae79|38133627064,4/713/177/3|38133818442 PASS|
|440|0ffd1b196c1faaf41367aa9370d2dd385f3cb77a|5389cb9d27e081892064b5b62740223373b67fd7|38133917114,4/713/186/3|38134128908 PASS|
|441|e910330627554c423b73993a8cc4b81be7fb3a20|739908e026ac10bd254e9ea64aa940c404d2f5a0|38134216666,4/713/195/3|38134447546 PASS|

Todos os CI citados acima têm passos completos sucesso, frozenlock/typecheck/build/export/migrações/retention/todasjornadas/ProductionTruth e marcadores HTTP novos no SHA exato, logs integrais inspecionados. Pós441 usa4/713/195/3 e preserva as três novas jornadas negativas e positivos. APK próprio43838118324003 aprovado no head534b140e, ZIP11694638840/sha256:ea7563b1a583c7c6ff689f49f58381842b57cb8cb4db21bb7d7175b2491cd64e, instalação06:47:48.6657802Z/DEVICE_SMOKE_OK06:48:42.1183401Z sem Metro. Pós-APK43838133235730/job114451722593 ainda EM EXECUÇÃO no merge27e96142, build sucesso11:05:28Z, smoke desde11:05:28Z; NÃO aprovado ainda. Consulta inicial[] não é sucesso. Não repetir rerun enquanto em execução; em eventual failure ler log/diagnóstico integral antes de decidir nova tentativa bounded, nunca relaxar gate.

Pós-merge original419 revalidado nesta rodada: CI38110152658/job114383862793 PASS4/476/145/3 e APK38110152707/job114383862785 PASS no SHA83d5df28f11395522aa5e8e776a38bab491e0a91, ZIP11691234225 e install/launchsemMetro. Pós-APKs425–434 TODOS agora PASS em seus SHAs reais, logs/artifacts exatos não expirados; #427 attempt1 falhou no PackageManager Android após build, diagnóstico11694012855/digestf134f33c6bfb0219e5c98c33d048c10a0f50ef564600d1e300a02d06f7bd6582, uma única nova tentativa do job foi feita após diagnóstico. Attempt2job114451920029 instalou Success11:06:27.4822802Z/DEVICE_SMOKE_OK11:07:05.0871432Z, ZIP11701045213 não expirado. CI pós42738117706895/job114405838661 PASS4/617/145/3 revalidado. Os SHAs/jobs/digests exatos de todos constam no JSON do recibo; digestZIP não APK individual, emulador não físico.

Native próprios/pós-merge439–441 N/A por paths do workflowstandalone e mobile subtree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao código nativo438 aprovado. Este recibo altera SOMENTE docs; APK próprio/pós deste recibo N/A se diff continuar sódocs e subtree idêntica. Não atribuir APK438 ao headAPI/docs e não fechar pós438 pendente. React19.1.4/RN0.81.6 confirmados no package atual; lockfile/desenho/tenant/RLS preservados, nenhum deploy pago/contratação/PSP/dinheiro real.

Item atual: publicar branch docs/verified-receipts-2026-10-11, revisar bytes/diff sódocs/mobile e CI4/713/195/3 no seu head exato; integrar apenas aprovado com lease/pais/tree/main e verificar pós-CI. Este snapshot antecede a criação do commit e seus eventos; SHA/runs dessa PR e verificação final devem ser lidos no GitHub/recibo final da própria PR, sem inferir aprovação desta frase. Ao retomar, consultar main, PRs/runs atuais e final da PR da branch; não repetir qualquer merge438–441 comprovado. Próxima ação operacional paralela: acompanhar38133235730 até resultado real; registrar eventual nova prova no recibo da PR corrente. Gates em execução são acompanhamento, não bloqueio definitivo ou conclusão.

Próxima tarefa segura de código: revalidar AuthController.signup/signin em main atual e reproduzir body null/email/password de tipos errados (há dereference/trim/scrypt com Body apenas tipado), corrigir validação runtime mantendo invalid_signup401, códigos existentes, defaultaccountType, prioridade de validação, scrypt/timing-safe/lockout8failures/15min/max10sessions e TODAS queries/tenant; provar zero DB/credencial para input inválido e positivos pelo CI/HTTP atual. Em seguida SupportController.status nota/corpo tipado e UUID; admin/enum/resultados/retenção inalterados. Essas pendências continuam abertas; não interpretar lista vazia de PRs como ausência de trabalho. Equipes.changeMember exige reconciliação/ordenação de ADD/DELETE desconhecidos, não simplesmente liberar busy; criações/aceite durável/SecureStore pendente não podem ser ultrapassados.

VisualTruth/desenhooriginal/todosestados e dados reais em Android FÍSICO, E2E/piloto/SecureStore/OScrash/teclado/restart, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e WEB-ARCH/Railway eventualmente pago permanecem OPEN; estes recibos não fecham projeto. Bloqueio parcial não cancela alternativas, nem a rotina. Não pedir continuar; não alegar execução24h; fim de rodada não é fim do projeto.


## Pós-merge nativo #438 comprovado — 2026-10-11 11:18:07 UTC

Reconsulta final do run38133235730: PASS no mergeSHA27e96142ecde5efa10adb05ef436bb5a3f123865, attempt1job114451722593, todos passos aplicáveis sucesso; instalação Success2026-10-11T11:14:10.8159307Z e DEVICE_SMOKE_OK2026-10-11T11:14:53.7258824Z package=com.predibeacon.mlivretrabalho.pilot metro_required=false. ZIP11700537236, sha256:de19b169e19ab8c59d27d30b462095220c44e167342d2b3a35602267206be510, 28910958bytes, não expirado, workflowhead EXATAMENTE27e96142. Digest refere-se ao ZIP; teste executado em emulador, NÃO aparelho físico. Entradas "pendente" abaixo são snapshots históricos anteriores a esta reconsulta, não o estado atual.

Base de código main739908e026ac10bd254e9ea64aa940c404d2f5a0 (#441), todos próprios/pós-CI438–441 PASS e native próprio/pós438 PASS; API439–441 nativeN/A por árvore mobile4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao aprovado e pathsstandalone. Original419 e425–434 pós-APKs já comprovados, retry427attempt2 PASS. VisualTruth/físico/E2E/SecureStore/piloto/pentest/PSP/KYC/FIN-RISK/providers/Web pago permanecem OPEN; projeto NÃO concluído.

PR#442 de recibo somente docs tem head anterior22a0b4e066b6edb1a63890006b7557ac8bbe28e4 e CI38134968825 em execução na preparação desta atualização. Este novo registro material atualiza o head: aprovação anterior não pode ser reutilizada, exigir CI4/713/195/3 no NOVO SHA após publicação, revisar diff e main, N/A nativo confirmado por docs-only/mobiletree, integrar lease/head/pais/tree e verificar pós-CI. A própria PR deve conter o recibo final de SHA/runs gerados após este snapshot; evita hashes autorreferentes inventados. Não repetir merges438–441.

Próxima tarefa de código permanece AuthController.signup/signin entrada runtime (null/tipos), mantendo auth/códigos/defaults/scrypt/timing-safe/rate-limit/lockout/sessões e queries; depois SupportController.status. Gate nativo em execução deixou de ser pendência nesta reconsulta, sem rerun/bypass. Rotina permanece ativa para tarefas seguras e externas, sem exigir continuar.


## Validação runtime de signup/signin — 2026-10-11 11:28:10 UTC

Base verificada maine3f6d58221d92a461852c98db3accb0549186d38, tree8ddc306d6965f0ac5619f7dc5b438b0d803be5a5, README aponta ORIGINAL Documento da Verdadev1.104; zero PR aberto não implica conclusão. #442 integrado e pós-CI38135416532/job114458169133 PASS4web/713mobile/195API/3CLI no SHAexatoe3f6d58221d92a461852c98db3accb0549186d38. Recibo final de #442 está na própria PR com SHA/pais/tree/logs; snapshot anterior preservado.

Falhas reais reproduzidas: body null em signup/signin, email não textual em trim, password não textual em scrypt/limiter e workspaceName não textual em trim podem causar TypeError/500. Entrada @Body passa a unknown, exige objeto não array e credenciais textuais antes de normalizar/hash/SQL. Mantém401invalid_signup para signup e401 genérico para signin; conta default professional inclusive null; account_type_invalid400 e workspace_name_required400/too_long400. Workspace inválido continua na ordem anterior, após hash de senha textual. Não transforma objetos/números em credenciais, não altera a autoridade de tenant/role/identity.

Doze testes do AuthController real: antes8PASS/4FAIL; depois12PASS. Crypto usa scryptSync real, salts/hashes reais de fixture e SHA256 real do token, sem substituir o algoritmo. Cobrem null/não-objeto/tipos, limites e prioridade, workspace, professional/default/company/owner/slug/normalização, duplicate23505/email_in_use e DBerrors, sucesso/token/memberships/cap10, senha errada/falha8→429/15min, conta bloqueada inclusive senha certa, janela expirada/unknown sem limiter, senha curta legada no signin vs mínimo8 signup. Onze expressões SQL comparadas BYTE-IDÊNTICAS. Corpo transacional de signin, dummy hash, scrypt/timingSafeEqual, 8falhas/15min, sessões30dias/cap10, limpeza e signout preservados; não altera limite HTTP.

HTTP script EXISTENTE http-auth-rate-limit-e2e.sh estendido: 22JSONs×2endpoints=44rejeições401, 10workspaces inválidos400 e tipo de conta inválido400; contagens reais de identities/tenants/memberships/auth_signin_limits/sessions não mudam. Mais7senhas não textuais sobre identidade real401 sem consumir janela/criar sessões. Todas as verificações positivas anteriores de hash/login/8falhas429/unlock/reset/unknown/cap10/signout continuam. Guard exige localhost/127.0.0.1 e porta antes de DB/rede; bash-n e quatro URLs externas/host-confuso/rota indevida rejeitadas. Execução HTTP/PostgreSQL real ainda depende da CI própria — NÃO afirmar PASS antecipado.

Local usa Node24 transform TS do controller real com stubs explícitos Nest/DB/Auth e fixtures; prova ramo/crypto/params, não typecheck/Nest HTTP/PostgreSQL. CI própria necessária no SHA do futuro head:4web/713mobile/207API/3CLI, frozen-lockfile/typecheck/build/export/migrations/retention/todos HTTP/ProductionTruth. Diff restrito API controller/test/script e docs; mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao #438 aprovado; Standalone workflow por paths não cobre esta mudança de API, APK próprio/pós N/A condicionado à revalidação de paths/tree, não inventar run para auth.

Próxima ação: publicar branch/PR, revisar diff/bytes e lease main, aguardar CI207API e markers HTTP de auth no SHA EXATO, merge só com gates aplicáveis PASS e verificar pais/tree/main/pós-CI. PR deve guardar recibo final gerado após snapshot, sem hashes autorreferentes. Depois tarefa independente SupportController.status (note/body/UUID) mantendo admin/auth/enum/queries. Nenhuma aprovação adicional para esta correção runtime autorizada. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho mantidos, sem custo/deploy/PSP/dinheiro/mensagens externas. VisualTruth físico/E2E/SecureStore/piloto/pentest/provider/PSP/KYC/FIN-RISK/Web pago continuam OPEN; projeto em andamento.


## Correção da tipagem do teste de token — 2026-10-11 11:30:35 UTC

CI38135705986/job114459009267 no headab3da139ef6ea42dd9a20792089251ca6a362f1c falhou em Typecheck por TS2345 no teste novo: retorno accessToken inferido string|undefined. Log integral lido; build/export/testes/HTTP seguintes SKIPPED, NÃO PASS. Teste agora extrai token e assert.ok(typeof token==='string') antes de regex/SHA256, estreitando tipo sem non-null fictício. Controller/política/SQL sem nova mudança; fixtures locais12PASS novamente. Novo commit requer CI no novo SHA, sem rerun do SHA inválido nem reutilizar gates. Evidência histórica de falha preservada; merge proibido até CI4/713/207/3 completo e markersauth HTTP reais.


## Revisão de suporte: validação runtime — 2026-10-11 11:35:12 UTC

Base verificada mainc6e63c060e1f4edcffdf16cc7dc492a412f15c71/treea1a1e593a7fc2194bc81201d6ce3eda54e072c48; README/DVT ORIGINALv1.104/memória/checkpoint reconsultados e história preservada. Auth#443 integrado após CI38135838666/job114459394668 PASS no heada17451ad4cffafe09d6eedae6a2b425795e7a5cf:4web/713mobile/207API/3CLI e markers62inputs+antibruteforce/cap10 PostgreSQL. Mergec6e63c060e1f4edcffdf16cc7dc492a412f15c71, pais[e3f6d58221d92a461852c98db3accb0549186d38,a17451ad4cffafe09d6eedae6a2b425795e7a5cf], tree aprovadoa1a1e593a7fc2194bc81201d6ce3eda54e072c48 conferidos. Pós-CI38136044075 ainda em execução neste snapshot, NÃO PASS antecipado; finalizar recibo na PR443 quando realproof. APKauthN/A por pathsAPI/docs/mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d. Falha de tipagem no primeiro head443 permanece histórica, não bypass.

SupportController.status b.note?.trim gerava TypeError com null/note não textual; UUID inválido chegava a UPDATE uuid. Bodyunknown exige objeto não array, statusstring reviewing/resolved/dismissed e note textual não vazia; caseUuid canônico genérico sem restringir versão. Mantém support_status_invalid400 e support_case_not_found400 reais. Autenticação/membership/admin(owner/admin)/tenant continuam ANTES da validação, sem mudar autoridade. Dez expressões SQL BYTE-IDÊNTICAS; prepare/create duráveis byte-idênticos, sem alterar chaves/digest/replay/concurrency/reporter ou assignment. mine/exceptions/admin/retention/protocolo preservados. Não altera política/transições autorizadas.

Nove regressões do controller real, antes6PASS/3FAIL → depois9PASS. Cobrem null/não-objeto, nota textual sem coerção, enum, UUID antes de SQL, prioridade auth/tenant/membership/admin, estados válidos com owner/admin e parâmetros tenanttrusted, resultado real incluindo resolução, ausência/cross-tenant sem ACK e DBerrors incertos. Local Node24 transform TS, stubs explícitos Nest/DB/Auth/helpers reais; não prova Nest HTTP/PostgreSQL/native.

Script HTTP EXISTENTE http-support-assignment-boundary-e2e.sh estendido:22JSONs inválidos400, UUID400, auth401/membership401/admin403; GETs reais antes/depois das listas owner e reporter devem ficar IDÊNTICOS. Fluxos positivos de reviewing/resolved/dismissed verificam ACK/resolutionNote trim/resolvedAt timestamp real vs null, deixando estado final reviewing. Scripts originais de intent/key/8concurrentretries/payloadconflict/tenant+reporter isolation/guardDB/replay após linknull e todos demaisfixtures preservados. Guardlocalhost/porta antes de DB/rede endurecido; bash-n e4URLs externas/host-confuso/path PASS local. Nenhum chamado de produção ou mensagem externa. HTTP real depende da CI própria, NÃO aprovado neste snapshot.

Head ainda a gerar em branch/PR: esperar CI4web/713mobile/216API/3CLI (9API novos), frozen-lockfile/typecheck/build/export/migrations/retention/todosHTTP/ProductionTruth e2markerssupport. APK próprio/pós N/A condicionado a pathsAPI/docs e mesma mobiletree aprovada#438; não atribuir APK outroSHA. Próxima ação: conferir diff/bytes/lease/gateshead exato, integrar uma vez se PASS e confirmar pais/tree/main/pós-CI; recibo final de hashes/runs pós-snapshot na própria PR e consolidar docs em mesmo ciclo.

Próxima falha concreta auditada: SafetyAdminController.status body null/note não textual e UUID em events/status; preservar note opcional/null (diferente do suporte), enumopen/reviewing/resolved/dismissed, owner/admin, FOR UPDATE, eventactor/status/changedfalse e SQL/canonical. Em seguida SafetyAppealsController.create e adminstatus JSONtipos/UUID com política/advisory lock/reporterACL íntegros; CancellationController.cancel reason e ReplacementController.select/create runtime também tipados sem guard. Fontes consultadas no SHAe3f6d582; revalidar novasmain antes de qualquer próxima mudança, reproduzirRED e testarHTTPreal. Não decidir compensação ou política financeira nem alterar scheduling/race sem prova.

React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Gates físicos/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSP/KYC/FIN-RISK/Web pago permanecem OPEN; projeto em andamento e rotina mantida sem solicitar continuar/custo/deploy/PSP.


## Diff revisado: testes de criação preservados — 2026-10-11 11:36:36 UTC

Antes de integrar, review do patch identificou que o primeiro heada50e5a61798c17fcab622a57a0cf8ede915c8600 substituía o arquivo EXISTENTE support.controller.test.ts (4testes de criação/tenant) pelos9novos de status. Corrigido: original restaurado BYTE-IDÊNTICO à mainbase e9novos em arquivo separado support-status.controller.test.ts. Local13PASS (4anteriores+9novos), sem apagar cobertura de criação. Head anterior/CI38136142135 não autorizam merge; SHA novo precisa CI4/713/216/3 completo. Diff final contra main NÃO deve alterar support.controller.test.ts original. História preservada e falha corrigida antes de gate/merge; sem bypass/rerun.


## Recibo consolidado auth/support e retomada — 2026-10-11 11:44:26 UTC

Main reconsultadacc372ac4030f30459b5b01446ac634b816040f1a, tree5cfadceb45839c5d3c4423bf3537d7c8d54cfb23; PR#443/#444 merged comprovadas, nenhuma PR aberta na reconsulta não implica fim do projeto. README aponta DVT ORIGINALv1.104 atualizado EM LUGAR, histórico integral preservado. Entradas pendentes abaixo são snapshots históricos; estado atual:
- #442 docs: head1363ed6f381a92dd627aa456149596cd59d0513c, CI38135062135/job114457131722 PASS4/713/195/3; mergee3f6d58221d92a461852c98db3accb0549186d38/tree8ddc306d6965f0ac5619f7dc5b438b0d803be5a5/pais[739908e026ac10bd254e9ea64aa940c404d2f5a0,1363ed6f381a92dd627aa456149596cd59d0513c]; pós-CI38135416532/job114458169133 PASS no SHAexato, mesmos195API. APK N/A por docs-only/mobiletree igual.
- #443 auth: heada17451ad4cffafe09d6eedae6a2b425795e7a5cf/treea1a1e593a7fc2194bc81201d6ce3eda54e072c48, CI38135838666/job114459394668/attempt1 PASS4web/713mobile/207API/3CLI; mergec6e63c060e1f4edcffdf16cc7dc492a412f15c71/treea1a1e593a7fc2194bc81201d6ce3eda54e072c48/pais[e3f6d58221d92a461852c98db3accb0549186d38,a17451ad4cffafe09d6eedae6a2b425795e7a5cf]. Pós-CI38136044075/job114459998562/attempt1 PASS no SHA EXATOc6e63c060e1f4edcffdf16cc7dc492a412f15c71, mesmas contagens; 2026-10-11T11:36:47.4761781Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies; 2026-10-11T11:36:55.3475299Z PASS: Production Truth Gate health/readiness contract. Três markersauth de inputsem escrita/identityreal sem limiter/sessões/antibruteforce/reset/unknown/cap10 lidos nos logs próprio E pós.12novostestes, antes8PASS/4FAIL→depois12PASS,11SQLbyte-idênticos. Falha Typecheck do primeiro head e correção da asserção tipada preservadas como histórico; gates atuais não reutilizam esseSHA.
- #444 supportstatus: headb52824acbaa718a0c29ffa6dd64498124aa65993/tree5cfadceb45839c5d3c4423bf3537d7c8d54cfb23, CI38136212040/job114460487911/attempt1 PASS4web/713mobile/216API/3CLI; mergecc372ac4030f30459b5b01446ac634b816040f1a/tree5cfadceb45839c5d3c4423bf3537d7c8d54cfb23/pais[c6e63c060e1f4edcffdf16cc7dc492a412f15c71,b52824acbaa718a0c29ffa6dd64498124aa65993]. Pós-CI38136390122/job114461019018/attempt1 PASS no SHA EXATOcc372ac4030f30459b5b01446ac634b816040f1a, mesmas contagens; 2026-10-11T11:42:35.5645774Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies; 2026-10-11T11:42:43.4395649Z PASS: Production Truth Gate health/readiness contract. Dois markerssupport JSON/path/authsem alterações + reviewing/resolved/dismissed/resolvedAt e intent8concurrent/replay/DBguards lidos nos logs próprio E pós; auth real também continua PASS.9novosstatus separado dos4originais de criação byte-idênticos; local13PASS. Review corrigiu substituição do arquivo antes de integrar, sem perder testes.10SQLexpressões e prepare/create duráveis byte-idênticos.
- Todos passos CI aplicáveis completos: frozen-lockfile/typecheck/build/exportAndroid/testes/migrations/retention/todosHTTP/ProductionTruth. Pais/tree==headaprovado/main reconsultados após cada merge; todos próprios e pós-CI aprovados nos respectivos SHAs reais.
- APK próprio/pós#443/#444 N/A por paths EXCLUSIVAMENTE API/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d igual ao #438 aprovado; não inventar APK de outro SHA. #438 próprio e pós nativos já PASS: pós38133235730/job114451722593/merge27e96142ecde5efa10adb05ef436bb5a3f123865, Success11:14:10.8159307Z/DEVICE_SMOKE_OK11:14:53.7258824Z semMetro, ZIP11700537236/digestsha256:de19b169e19ab8c59d27d30b462095220c44e167342d2b3a35602267206be510 não expirado. Digest éZIP; teste EMULADOR, não aparelho físico. #419 e425–434 pós nativos também comprovados;#427attempt2 PASS com falhaPackageManagerattempt1/logdiagnóstico preservados.

Próximo item concreto seguro: SafetyAdminController.status/events JSONbody/note/UUID. Fonte reconsultada no SHAcc372ac4030f30459b5b01446ac634b816040f1a, idêntica à auditada. ReproduzirRED antes de mudar: status null e note não textual em trim, events/status UUID malformado chega ao SQL. Preservar AUTH/membership OWNER/ADMIN primeiro, nota OPCIONAL/null/vazio (não aplicar exigência do suporte), enumopen/reviewing/resolved/dismissed, limite2000, FOR UPDATE, changedfalse sem evento em repetição, atortrusted e todasqueries. Testes existentes devem ser inventariados e preservados; novos em arquivo próprio; executarHTTPreal/gateshead e pós. DepoisSafetyAppeals.create/adminstatus/typesUUID (preservar reporterACL/advisorylock/policy), Cancellation.reason e Replacement.select/create (preservar assignmentstatus/compensationPolicy/tenant/availability/authority); fontes confirmadas nessa main, não alteradas nesta entrega. Um impedimento isolado não encerra outros itens.

Este recibo é branch/PR SOMENTE DOCS ainda a publicar, requer CI4/713/216/3 no novo head e revalidação de paths/mobiletree antes de integrar; não usar gates de outra PR. SHA/PR/runs finais gerados após snapshot devem constar na própria PR do recibo; evita hashes autorreferentes inventados/commits infinitos. Evidência completa: docs/evidencias/AUTH_SUPPORT_MERGE_RECEIPTS_2026-10-11.md. Rotina permanece para reavaliar gates e continuar código seguro, sem exigir continuar nem afirmar24h.

React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho canônico preservados. Sem serviços/custos/dinheiro/deploypago/PSP/mensagens reais. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, PSP/KYC/provider/FIN-RISK e Web pago continuam OPEN; prova em emulador/CI não fecha essesgates. Projeto EM ANDAMENTO.


## Revisão de segurança: entradas runtime — 2026-10-11 11:57:32 UTC

Base mainb4b45e4482ea08e3e1706318b8757f238201fe0c/treee3881ffee028f8bb236a956a956089d29d779e0f reconsultada, README/DVT ORIGINALv1.104/memória/checkpoint lidos, zeroPR aberto não significa conclusão. #445 já merged e pós-CI38136903951/job114462526767 PASS4web/713mobile/216API/3CLI no SHAb4b45e4482ea08e3e1706318b8757f238201fe0c, recibo completo na PR445. #419 é histórico integrado, não repetir merge. Mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d coincide com #438 aprovado, APK pós43838133235730/job114451722593 no SHA27e96142ecde5efa10adb05ef436bb5a3f123865 revalidado PASS install/launch EMULADOR semMetro/ZIPnãoexpirado; NÃO prova físico.

Três falhas reais em SafetyAdminController: status JSONnull TypeError; note não textual trim TypeError; UUIDmalformado events/status chega aoSQL.12regressões controllerreal antes9PASS/3FAIL→depois12PASS. Bodyunknown exige objeto não array e status textual enumopen/reviewing/resolved/dismissed; note opcional (undefined/null/vazio/espaços continuam null), não textual rejeitada safety_note_invalid400, limite2000UTF16 após trim preservado. UUIDcanônico genérico rejeita safety_case_invalid400 após contextAUTH/tenant/membership/OWNERADMIN. Mantém safety_status_invalid400, safety_case_not_found404 e safety_admin_required403; não altera transições autorizadas.

Seis expressões SQL BYTE-IDÊNTICAS; list/context/retention e evento imutável não mudam. SELECT FOR UPDATE, changedfalse sem update/evento em repetição, resoluçãonow vsNULL, tenant/actor doauth e ACKreal preservados. Testesnovos em safety-admin-input.controller.test.ts path inventariado AUSENTE antes; nenhum teste existente sobrescrito/removido.12cobrem body/status/note/limite/prioridade/UUIDGETPOST/auth/tenant/membership/role/owneradmin/status4/notas5/params/FORUPDATE/changedfalse/eventsreal/404/RLS/DBerror. Local Node24 transformTS do controllerreal com stubs explícitos Nest/DB/Auth; não substitui CItypecheck/NestHTTP/PostgreSQL/native.

ScriptHTTP EXISTENTE http-safety-e2e.sh estendido, workflowCI já o executa:20JSONs400+UUIDGETPOST400/authGETPOST401/memberGETPOST403/ausênciamembership401 sem mudar listas owner/reporter/eventos reais. Fluxopositivo original open→reviewing e repetiçãoevento único preservado. Depois4transiçõesresolved/dismissed/open/reviewing com notas ausente/null/branco/texto, ACKs e resolvedAt reais, repetir cada estado changedfalse; verificar EXATAMENTE5eventos com atoridentityauth e notas previstas. Guardlocalhostporta antes defixture/rede, bash-n e4URLs externas/hostconfuso/path rejeitados localPASS. HTTPreal ainda depende da CI própria; NÃO afirmar sucesso antecipado.

Publicar branch/PR, revisar diff remoto/bytes/mobiletree/mainlease; exigir CI4web/713mobile/228API/3CLI (12novosAPI) completa no SHAexato, markersHTTPsafety próprios, frozenlock/typecheck/build/export/migrations/retention/ProductionTruth. APK próprio/pós N/A condicionado paths SOMENTEAPI/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d igual#438: workflowstandalonepathfilter não cobreAPI e dependências/mobile/scriptsnative intactos. Não inventar APK de outro SHA. Merge uma vez só com gates aplicáveisPASS, confirmar pais/tree/main/CIpós. Próprio corpoPR guarda SHA/runs gerados após snapshot; consolidar evidências/checkpoint no mesmo ciclo.

Próximoitemseguro após esta correção: SafetyAppealsController.create (body.reason?.trim/UUID) e SafetyAppealsAdminController.status/events (JSON/note/UUID), preservar reasonlimit4000, note opcional2000, auth/reporterACL/owneradmin/advisorylock/policy/same/conflict/SQL. Revalidar fonte e inventáriotestes, reproduzirRED antes de qualquer mudança. Cancellation.reason e Replacement.select/create independentes continuam auditados; não decidir política de compensação nem mudar scheduling/race sem prova.

React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Sem custo/serviços/deploypago/PSP/dinheiro/mensagens reais. FísicoAndroid/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSP/KYC/FIN-RISK/Webpago seguemOPEN; projeto em andamento e rotina mantida, não exigir continuar.


## Recursos de segurança: validação de entradas — 2026-10-11 12:06:45 UTC

Estado de partida confirmado: main 3de10488b64a90139386fc2b6f5617744b35100c, tree 16a7b201a1039e69c01c82472102cbf229471dbc, PR #446 integrado uma única vez. CI do head eebfcb74debcc6891c1345ffb688bb7f23e924ae: run 38137493375/job 114464260065 PASS; pós-merge no SHA 3de10488b64a90139386fc2b6f5617744b35100c: run 38137742579/job 114464986458 PASS. Ambos: 4 testes web, 713 mobile, 228 API, 3 CLI, todos os steps aplicáveis, fluxo HTTP original e os dois markers novos da revisão de segurança. Pais [b4b45e4482ea08e3e1706318b8757f238201fe0c,eebfcb74debcc6891c1345ffb688bb7f23e924ae] e tree aprovada 16a7b201a1039e69c01c82472102cbf229471dbc conferidos. Recibo final persistido no corpo de https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/446. README, Documento da Verdade ORIGINAL v1.104, memória, checkpoint, fonte, inventário e workflows relidos na main; histórico integral preservado.

Falhas reproduzidas no controller real de recursos: criação/revisão com JSON nulo provoca TypeError, nota não textual provoca TypeError, UUID malformado chega ao SQL. A criação agora recebe unknown e exige objeto não array, safetyCaseId UUID canônico genérico e reason textual não vazio, com trim e limite de 4000 unidades UTF16 preservados. Revisão recebe unknown e valida status textual no enum existente; note continua opcional, null/vazio/espaços continuam NULL, valores não textuais retornam 400, limite 2000 após trim preservado. Events/status rejeitam UUID inválido com safety_appeal_invalid 400 antes de SQL/advisory lock, sempre depois de auth, tenant, membership e owner/admin quando aplicável. Erros de status/nota, 404 real e 403 de acesso mantidos.

Onze expressões SQL preservadas byte a byte. Não muda RLS, ACL reporter/professional/owner/admin, ON CONFLICT e retorno do motivo original em repetição, pg_advisory_xact_lock, eventos imutáveis ou política de transição: mesmo estado changed:false sem evento; terminal não reabre, conflito 409. Teste existente safety-appeal-policy.test.ts e policy preservados integralmente. Treze testes novos em safety-appeals-input.controller.test.ts, path comprovadamente ausente na base, sem sobrescrever testes: criação, limites, parâmetros autenticados, duplicação, ACL/404, prioridade auth/tenant/membership/owner-admin, JSON/status/nota/UUID, notas opcionais, 25 pares de transição, eventos e propagação de falha de DB. Local Node24 com transformação do controller real e stubs explícitos Nest/Auth/DB: antes 13 PASS/4 FAIL de 17 (inclui quatro policy existentes), depois 17 PASS. Falha inicial do harness por import de tipo foi corrigida apenas no harness antes do RED válido; não é falha do projeto. Local não substitui typecheck/NestHTTP/PostgreSQL.

Script HTTP existente http-safety-appeals-e2e.sh estendido: 26 JSONs inválidos de criação e 20 de revisão, UUID inválido GET/POST, auth/membership/role negativos; compara listas e eventos reais antes/depois para provar nenhuma mutação. Fluxo original com profissional relacionado, duplicate original reason, tenant isolation, revisão humana, dois eventos e terminal 409 preservado. Segundo recurso do owner testa reason4000 após trim, nota omitida/null, actor autenticado e datas reais, repetição sem duplicação, terminal fechado sem novo evento; verifica que eventos do recurso profissional permanecem intactos. Guard local http://localhost ou127.0.0.1 com porta explícita antes de fixtures/rede, mktemp/trap em vez de arquivo /tmp compartilhado; bash -n e quatro URLs externas/ambíguas rejeitadas localmente PASS. HTTP real depende de CI própria e pós no SHA exato: não alegar aprovação antecipada.

Publicar branch/PR, revisar diff e nove paths/bytes, exigir CI própria completa com 4web/713mobile/241API/3CLI, frozen lockfile, typecheck, build/export Android, migrations, retention, HTTP e Production Truth. Confirmar markers específicos de criação inválida, revisão inválida, notas opcionais/idempotência e fluxo original. Só integrar com gates aplicáveis PASS, lease main/head atuais; confirmar pais/tree/main e pós-CI nas mesmas contagens/markers. Recibo final no corpo da PR após geração dos SHAs/runs; consolidar documentação/checkpoint no mesmo ciclo. APK próprio/pós N/A para estes paths apenas API/docs: mobiletree 4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica ao #438, nenhuma alteração de dependências, mobile ou workflow/script native; não atribuir APK de outro SHA. Referência #438 pós-APK run38133235730 no SHA27e96142ecde5efa10adb05ef436bb5a3f123865 prova emulador/noMetro, não físico.

Próxima ação segura após integração: reconsultar main/PRs/gates e auditar CancellationController.reason e ReplacementController.create/select, reproduzindo falhas runtime concretas e preservando suas políticas/SQL antes de mudar código. Não mudar compensação financeira, scheduling ou semântica de substituição sem requisito/prova. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Zero custo, contratação, deploy pago, dinheiro real, PSP ou mensagens reais. Android físico/Visual Truth/E2E/SecureStore/piloto, pentest independente e providers/PSP/KYC/FIN-RISK/Web pago permanecem OPEN. Projeto em andamento; bloqueio isolado não encerra os demais trabalhos.



### Correção do teste após CI própria

Head inicial 76a08b4e421ec5b8c91ec2c73b249a44f54d8e05, CI38138064763/job114465949006 FAILED no typecheck: TS2532 em safety-appeals-input.controller.test.ts linha87, query[0] possivelmente ausente. Log completo inspecionado; build/testes/HTTP posteriores SKIPPED não são aprovação. Corrigida somente asserção: obter lock, assert.ok(lock), então conferir SQL. Sem mudar controller/policy/SQL/expectativas nem remover testes. Testes locais repetidos e nova CI inteira obrigatória em novo SHA; não rerun cego, não reutilizar gate do head falho. Histórico de falha preservado.


## Cancelamento: validação runtime sem alterar política financeira — 2026-10-11 12:13:09 UTC

Base reconsultada main dc3b70d61153c6e8a1d14ca0f6678f4586667ffa, tree e42ed66bb9d8664f81076320c487cb67f1451b24. #447 já integrado uma vez, head aprovado 88da0e014bbbc74cef13b860aa6fa60595564f73, CI38138158446/job114466235501 PASS4web/713mobile/241API/3CLI e quatro markers HTTP de recursos; pais [3de10488b64a90139386fc2b6f5617744b35100c,88da0e014bbbc74cef13b860aa6fa60595564f73] e tree e42ed66bb9d8664f81076320c487cb67f1451b24 confirmados. Pós-CI38138345123 no SHA dc3b70d61153c6e8a1d14ca0f6678f4586667ffa estava em execução na consulta, não é PASS antecipado: acompanhar e persistir recibo. Histórico da falha de typecheck no primeiro head #447 preservado, corrigido sem remover expectativas; aprovação só do head resultante. #446 own/pós PASS e recibo já consolidados em docs/PR446. README, DVT ORIGINAL v1.104, memória, checkpoint, controllers, HTTP e inventário lidos na base atual.

CancellationController tinha TypeError em JSON null ou motivo não textual, e UUID malformado era enviado ao SQL. Corrigido com Body unknown: objeto não array, reason textual com trim, obrigatório não vazio, limite 1000 unidades UTF16 já existente, erro cancellation_reason_required400. UUID canônico genérico rejeita assignment_invalid400 antes do DB, depois de auth, tenant, membership e validação do motivo. Três consultas SQL byte-idênticas, sem alterações de política: só confirmed/checked_in, própria pessoa profissional ou owner/admin/manager/company, initiatorKind derivado de auth, ON CONFLICT conserva registro, update condicional e cancellation_conflict existentes, estado não cancelável continua400. compensationPolicy permanece EXATAMENTE none_until_fin_risk_policy_approved; não calcula, habilita nem promete compensação.

Nove regressões novas em cancellation-input.controller.test.ts (path ausente confirmado, nenhum teste existente substituído): JSON/reason/limite, UUID, auth/tenant/membership, parâmetros autenticados, ACL/papéis, escopo de status, conflito de update/durabilidade SQL, falta de assignment e DBerror. Controller real transformado Node24 com stubs explícitos Nest/Auth/DB: antes7PASS/2FAIL, depois9PASS. Local não substitui CI typecheck/HTTP/PostgreSQL.

Script HTTP EXISTENTE http-replacement-e2e.sh estendido com17JSONs inválidos de cancelamento, UUID inválido, ausência de auth e ator profissional não relacionado; compara as duas listas de assignments e replacement list antes/depois sem alteração real. Fluxo original de substituição preservado e verificado ANTES dos cancelamentos positivos. Depois usa somente as duas assignments CI confirmadas (seed e substituta): profissional cancela a própria com reason1000 após trim; owner cancela a substituta; ambos ACKs reais id/status/initiatorKind/compensationPolicy e GET assignments tenant/cancelled. Repetição em já cancelada continua400, replacementmatched não muda. Não executa mensagens externas nem dinheiro; fixtures em API local isolada. Guard localhost/127.0.0.1 porta antes de rede, mktemp/trap, bash-n e quatro URLs não locais/ambíguas rejeitadas PASS local. HTTP real ainda exige CI própria/pós no SHA exato; não alegar sucesso antecipado.

Publicar branch/PR, revisar nove paths e bytes remotos/lease; CI obrigatória4web/713mobile/250API/3CLI, typecheck/build/export/frozenlock/migrations/retention/HTTP/ProductionTruth completos e dois markers HTTP de cancelamento + originalreplacement. Integrar só após gates aplicáveis PASS e #447 pós confirmado; conferir pais/tree/main e pós-CI mesmoSHAcontagens. Recibo final no corpoPR após geração dos SHAs/runs, documentos/checkpoint consolidados no ciclo. APK próprio/pós N/A por pathsAPI/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438; workflows/deps/mobile/native não alterados. Não atribuir APK de outroSHA; referência#438 noMetro/emulador não prova aparelho físico.

Próxima pendência segura: ReplacementController.create/select ainda aceitam bodies tipados sem validação runtime, create.reason?.trim e select.professionalId com UUIDs não validados (inclui rotas candidates/auto-match). Fonte atual relida; reproduzir regressões e corrigir só entrada preservando reason OPCIONAL sem inventar limite, company-role ACL, ranking, active_tenant_professional, disponibilidade, SQL e política de substituição. Questões de lifecycle/scheduling/compensação precisam requisito/prova específica, sem mudança implícita. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho intactos; zero custo/deploypago/PSP/dinheiro real. Físico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSP/KYC/FIN-RISK/Webpago OPEN. Projeto em andamento; próximos itens independentes continuam autorizados.



## Substituição: validação runtime preservando ranking e disponibilidade — 2026-10-11 12:18:41 UTC

Base main 3ee73c73229d1034324a858b65bd73bfd73d314e, tree 03e5e2f71e6572514cd52efeb352bec4c3c5d6e4 reconsultada com README, DVT ORIGINALv1.104, memória, checkpoint, código, HTTP e inventário. PR #448 integrado uma vez, head2a128e6f450cb31508ac34a5f77bb7fdca28a4a7 aprovado em CI38138438300/job114467066599 PASS4web/713mobile/250API/3CLI, dois markers HTTPcancelamento e originalreplacement. Pais [dc3b70d61153c6e8a1d14ca0f6678f4586667ffa,2a128e6f450cb31508ac34a5f77bb7fdca28a4a7], tree03e5e2f71e6572514cd52efeb352bec4c3c5d6e4 confirmados. Pós-CI38138677504 no SHA3ee73c73229d1034324a858b65bd73bfd73d314e em execução na última consulta, acompanhar sem afirmar PASS. #447 pós-CI38138345123/job114466789634 confirmadoPASS4/713/241/3, todossteps/quatro markersrecursos no SHA dc3b70d61153c6e8a1d14ca0f6678f4586667ffa; recibo final persistido na PR447. #446 receipt/pass já registrados. Nenhum merge repetido.

ReplacementController create/select recebiam JSON tipado sem validar runtime: body null e reason não textual provocam TypeError, professionalId e IDs de rota malformados chegam ao SQL. Bodyunknown exige objeto não array; create reason continua OPCIONAL (ausente/null/vazio/espaços → NULL), texto trim e sem inventar limite inexistente, invalid400 replacement_reason_invalid. select exige professionalId textual UUIDcanônico genérico, mantendo erro professional_required400. IDs de candidates/auto-match/select rejeitam replacement_invalid400; create assignment inválido assignment_invalid400. Tudo depois de auth/tenant/membership/company role e antes de SQL.

Quatorze expressões SQL byte-idênticas e corpo do método ranked byte-idêntico. Sem alterar ranking/candidatos/score, active_tenant_professional, disponibilidade real, filtros tenant, company roles owner/admin/manager/company, status replaceable confirmed/checked_in/in_progress, requestopen, INSERTassign/UPDATEorig/UPDATErequest, recipientnotification resolvido DB, ou upsert de reason existente. Não resolve implicitamente lifecycle/concurrency, scheduling, custos ou política financeira.

Dez testes novos em replacement-input.controller.test.ts, path ausente comprovado, sem sobrescrever testes: criação/seleção JSON e tipos, motivos opcionais/no-limit, quatro pathsUUID, auth/tenant/membership/company roles, status/reqopen/activecandidate/disponibilidade antes de writes, parameters tenant/notificationrecipient e ACK real, assignment404-equivalenteerroexistente, DBerror. Local controller real transformado Node24 com stubs explícitos Nest/Auth/DB e ranking helpers NÃO executados (stubs lançam se chamados): antes7PASS/3FAIL, depois10PASS. Não comprova ranking local, HTTP/typecheck/PostgreSQL dependem da CI. FluxoHTTPoriginal comprova ranking e substituição real.

ScriptHTTPexistingreplacement (incluindo regressões de cancelamento #448) estendido sem remover fluxo anterior:12JSON inválidos create e16select, UUIDcreate/select/candidates/auto-match, auth401 e companyrole403; compara assignmentsdasduaspessoas e requestsreais sem mutações. Seis upserts válidos no requestoriginal provam reason omitido/null/vazio/espaços/texto e texto5000 apóstrim, mantendo id/assignment/status e motivoDBreal. Depois fluxo original auto-match/replacementconfirmed/cancelaorig e positivoscancelamento permanecem. Guardlocalhost/mktemp/trap preservados; bash-n PASSlocal. HTTPreal ainda exige CI completa no SHAexato antes de declarar aprovação.

Exigir CIprópria4web/713mobile/260API/3CLI e todossteps frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth; markers específicos criação inválida/seleção+motivos opcionais, os dois cancelamento e originalreplacement; antecessor #448 pósPASS. Revisar diff novepaths/bytes remotos/lease; merge só gatesaplicáveisPASS, confirmar pais/tree/main e CIpós exato. APKpróprio/pósN/A porAPI/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438; deps/workflow/native/mobile intactos, nenhumAPKdeoutroSHAatribuído. #438emulador/standalone/noMetro não prova físico. Recibo final no corpoPR após SHAs/runsgerados, consolidar evidências/checkpoint sem hashesautorreferentes e preservandohistória.

Próxima ação concreta: verificar CIpós/main atual, auditar WorkAssignmentsController e CareerConversionController usando requisitos vigentes, reproduzir falhas runtime/tenant/estado reais antes de qualquer mudança. Questões delifecycle e concorrência substituição ficam separadas, precisam prova/requisito sem mudança implícita. Preservar React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho. Sem custo/contratação/deploypago/PSP/dinheiro real. FísicoAndroid/VisualTruth/E2E/SecureStore/piloto, pentest independente, providers/PSP/KYC/FIN-RISK/Web pago OPEN; projeto não concluído, itens independentes continuam autorizados.



## Notificações: UUID runtime sem alterar autoridade ou idempotência — 2026-10-11 12:23:48 UTC

Base main 334900b6903cc3137d50e90bbfc2e7b98306645c, tree 7b000d4c9c71d55862ab9406c97c41cb85d6c9e1, README/DVT ORIGINALv1.104/memória/checkpoint/fonte/HTTP/inventário reconsultados. #449 integrado uma vez, head e4322dc8679a173e977bd28ba07e07789928939d e CI38138783719/job114468104555 PASS4web/713mobile/260API/3CLI, todossteps e markerscriação/seleção/optionalreason/cancelamento/originalreplacement. Pais [3ee73c73229d1034324a858b65bd73bfd73d314e,e4322dc8679a173e977bd28ba07e07789928939d], tree7b000d4c9c71d55862ab9406c97c41cb85d6c9e1 aprovada confirmada. Pós-CI38139014848 no SHA334900b6903cc3137d50e90bbfc2e7b98306645c em execução na consulta: aguardar, não afirmar PASS. #448 pós-CI38138677504/job114467779616 PASS4/713/250/3 no SHA3ee73c73229d1034324a858b65bd73bfd73d314e com todossteps/markers, recibo final na PR448. #446/#447 own/pós já aprovados e registrados; não repetir merges.

Falha concreta: NotificationsController.read enviava UUIDmalformado ao SQL, causando500 em vez de400. Uma guarda UUIDcanônico genérico (case-insensitive) adicionada APÓS identity/tenant_required/membership e ANTES db.tenant. Erro notification_invalid400, sem mudar três SQL, unread/mine/tenantIds/sort, UPDATE identity_id+tenant_id, COALESCE read_at idempotente, retorno da row real ou null para inexistente/estrangeiro. Nenhuma mensagem ou notificação externa é enviada por esta operação.

Seis regressões novas em notifications-input.controller.test.ts, path inventariado AUSENTE: UUIDmalformado/noDB, prioridadeauth, requiredtenant/membership, row/timestamp real e parâmetros trusted, UUIDcomletrasuppercase, nullmissing/foreign e DBerror. Controller real transformado Node24 com stubs explícitos Nest/Auth/DB: antes5PASS/1FAIL, depois6PASS; não substitui typecheck/NestHTTP/PostgreSQL. Nenhum teste existente removido/substituído.

HTTPexistente http-notifications-multi-company-e2e.sh preserva duas empresas/memberships e notificações reais geradas por confirmações de assignment. Acrescenta3UUIDs400, auth401, tenantmissing400, membership401, receiver errado e tenantválidoerrado (contrato existente201/null), compara lista completa e unreadcountreais antes/depois sem mudança. Marcar a row própria retornaACK id/readAtDBreal; repetir mantém readAt e decrementarunread EXATAMENTEuma vez. Fluxooriginal agregado preservado. Guardlocalhostporta antesdefixtures/rede, mktemp/trap, bash-n e quatroURLsexternas/ambíguas rejeitadas PASSlocal. HTTPreal exige CIprópria/pós noSHAexato; não afirmar antecipadamente.

Branch/PR deve ter novepaths/bytes/diff revisados; CIprópria4web/713mobile/266API/3CLI completa frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth e dois markersnovosnotification+original. Confirmarpredecessorpós449PASS; merge só gatesaplicáveisPASS/lease, verificarpais/tree/main/pós exato. APK próprio/pós N/A porpathsAPI/docs e mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438, deps/native/mobile/workflows sem mudanças; nenhumAPKdeoutroSHAatribuído. #438emuladornoMetro não prova físico. Recibo final no corpoPRapósSHAs/runsgerados, consolidarDVT/memória/ledger/evidência/checkpoint no mesmociclo preservando história.

Auditoria próxima já executada em fonte: CareerConversionController já usa conversionProposalInput/DecisionInput/conversionId, não reimplementar nem criar tarefa baseada em body tipado antigo. WorkAssignmentsController.transition ainda leva id de rota sem validar UUID ao SQL e converte coordenadas via Number, aceitando valores coercíveis; próxima ação concreta é reproduzir pathmalformado e confrontar optionalCoordinates/requisitos antes de mudar validação GPS. Não tornar GPS obrigatório nem mudar lifecycle/ledger/compensação por inferência. Lifecycle/concurrency de replacement é questão separada, não resolvida por guardas. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho preservados. Sem custo/deploypago/PSP/dinheiro real; físico/VisualTruth/E2E/SecureStore/piloto, pentest, providers/PSP/KYC/FIN-RISK/Webpago OPEN. Projeto não concluído; checkpoint permite retomada sem pedir continuar.



## Transições de trabalho: rejeitar UUID inválido antes do SQL — 2026-10-11 12:30:07 UTC

Base main 4bf72d0a960b3e1b154997db8181575a5c5ec3c3, tree b06728234e23f6a6b812efac33a4e3bfed09886c reconsultada; README aponta DVT ORIGINALv1.104, memória/checkpoint/fonte/helper/testes/HTTP lidos, história integral preservada. #450 integrado uma vez, headbdba5be156e7ceb95dcdb8e965641fb2f19ac263 e CI38139102667/job114469064477 PASS4web/713mobile/266API/3CLI, todossteps e os dois novos markersnotification+original. Pais [334900b6903cc3137d50e90bbfc2e7b98306645c,bdba5be156e7ceb95dcdb8e965641fb2f19ac263], treeb06728234e23f6a6b812efac33a4e3bfed09886c aprovada, main verificada. Pós-CI38139347035 no SHA4bf72d0a960b3e1b154997db8181575a5c5ec3c3 em execução na consulta, acompanhar sem anteciparPASS. #449 pós-CI38139014848/job114468799720 PASS4/713/260/3 no SHA334900b6903cc3137d50e90bbfc2e7b98306645c, todossteps/5markersreplacement/cancelamento, recibo finalPR449. Antecessores446–448 own/pósjáregistrados; não repetirmerges.

Falha reproduzida em WorkAssignmentsController.transition: IDs malformados de check-in/start/check-out/complete entram no SQL/UUID e causam500. Adicionada SOMENTE uma guarda UUIDcanônico genérico case-insensitive depois de auth/tenant/membership e antes db.tenant/profileSQL, erro assignment_invalid400. Remover textualmente a guarda reproduz o arquivo anterior BYTE A BYTE: GPS/coords/Number/conversão/limites/profile404, lifecycle, SQLdinâmico/stamps, tenant/identity/ownprofessional/statusfilters e ledger preservados. Sem alterar dinheiro ou compensação.

Nove regressões novas em work-assignments-input.controller.test.ts (pathausente comprovado); helper assignment-lifecycle.ts e seus dois testes existentes preservadosbyte-idênticos. Controller real transformado Node24 com helperreal e stubs explícitos Nest/Auth/DB: antes10PASS/1FAIL de11, depois11PASS. Cobrem quatro rotas inválidas/noDB, auth/tenant/membership, ACKreal e UUIDuppercase/params/profile/tenant/statusfilters, GPSopcional/pair/bounds atuais, profile404, updateinvalidsemledger, ledger interno existente payable/onconflict scoped e DBerror. Local não substitui typecheck/NestHTTP/PostgreSQL nem comprova localização física.

ScriptHTTPexistingjourney preserva signup/profile/jobs/confirm/chat/replacement/talent/ratings/earnings/passport. Nas quatro rotas,3IDs inválidos400+auth401+tenantmissing400+membership401+tenantválidoerrado400+ownernão-professional404, compara assignments e earnings reais antes/depois sem mutações. Fluxo original semGPS continua check-in/start/check-out/complete, agora valida ACKid e timestampsDBreais; cada replay mantém erro400, completion earnings comparadas imediatamente antes/depois replay sem duplicação. Guardslocale existentes preservados; bash-nPASSlocal. HTTPreal só apósCIprópria/pós no SHAexato.

Exigir CIprópria4web/713mobile/275API/3CLI completa frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth, dois markersnovosassignment+journeyoriginal; predecessor450pósPASS. Revisar novepaths/diff/bytes/lease; merge sógatesaplicáveisPASS, confirmarpais/tree/main e pósCIexato. APKpróprio/pósN/A pathsAPI/docs/mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438, deps/native/workflows/mobileintactos; nenhumAPKdeoutroSHAatribuído. #438install/launch/noMetroEMULADOR não prova físico. Recibo final no corpoPRapósgeraçãoSHAs/runs e consolidar documentos/checkpoint mesmo ciclo.

Próximaação concreta: consolidar recibos próprios/pós446–451 apósconclusão e revalidar main/PRs/gates. Coordenadas via Number continuam questão auditada separada: APIaceitaJSONcoercível; confrontar optionalCoordinates/contratoGPS e reproduzir antes de mudar tipos, mantendo GPSopcional e sem alegar prova de localização física. CareerConversion já tem validadores, não reimplementar. Auditar próximo controllercom pendência real antesdecriar tarefa; ausênciaPR não conclusão. Lifecycle/concurrencyreplacement separado, sempolíticaimplícita. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho intactos. Zerocusto/deploypago/contratação/PSP/dinheiro real. FísicoAndroid/VisualTruth/E2E/SecureStore/piloto, pentest/provider/PSP/KYC/FIN-RISK/WebpagoOPEN; projetoandamento e retomadaindependenteautorizada.



## GPS runtime: impedir coordenadas inventadas por coerção — 2026-10-11 12:41:55 UTC

Base main 6b7699b02c4f200356fcba5958de6eb937e983f9, tree 1fb88bf06a88d5acb6740575612b06ca4bf44fa8; README/DVT ORIGINALv1.104/memória/checkpoint já lidos na base; main/PRs/inventário/fonte/HTTP/helper/testes reconsultados. Todas as seis correções446–451 own/pós PASS no SHAexato, pais/tree iguais candidatos e mainconfirmada; nenhum merge repetido. #451 own38139500293/job114470246544, pós38139768716/job114471036384 PASS4web/713mobile/275API/3CLI no head2047bf849a3fbfa5a33f000669f53e48e0fa2923 e merge6b7699b02c4f200356fcba5958de6eb937e983f9, todossteps/2markersassignment+journey. Recibos completos nos corposPR. Tabela primária:

| PR | Head aprovado | Merge main | CI própria / pós (PASS) | Testes API / novos |
|---|---|---|---|---|
| [#446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/446) Revisão de segurança | eebfcb74debcc6891c1345ffb688bb7f23e924ae | 3de10488b64a90139386fc2b6f5617744b35100c | [38137493375](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137493375) / [38137742579](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137742579) | 228 / +12 |
| [#447](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/447) Recursos de segurança | 88da0e014bbbc74cef13b860aa6fa60595564f73 | dc3b70d61153c6e8a1d14ca0f6678f4586667ffa | [38138158446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138158446) / [38138345123](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138345123) | 241 / +13 |
| [#448](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/448) Cancelamento | 2a128e6f450cb31508ac34a5f77bb7fdca28a4a7 | 3ee73c73229d1034324a858b65bd73bfd73d314e | [38138438300](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138438300) / [38138677504](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138677504) | 250 / +9 |
| [#449](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/449) Substituição | e4322dc8679a173e977bd28ba07e07789928939d | 334900b6903cc3137d50e90bbfc2e7b98306645c | [38138783719](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138783719) / [38139014848](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139014848) | 260 / +10 |
| [#450](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/450) Leitura de notificações | bdba5be156e7ceb95dcdb8e965641fb2f19ac263 | 4bf72d0a960b3e1b154997db8181575a5c5ec3c3 | [38139102667](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139102667) / [38139347035](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139347035) | 266 / +6 |
| [#451](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/451) UUID nas transições de trabalho | 2047bf849a3fbfa5a33f000669f53e48e0fa2923 | 6b7699b02c4f200356fcba5958de6eb937e983f9 | [38139500293](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139500293) / [38139768716](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139768716) | 275 / +9 |

Auditoria do controller real (Node24 com fixtures/stubs explícitos) reproduziu false/false, strings vazias e arrays[0]/[0] convertidos por Number em parâmetros0,0 do UPDATE; strings numéricas também coagidas. Isso não é GPSreal. Fonte canônica mobile agenda.optionalCoordinates relida: retorna lat/lng NUMBER de expo-location ou null em denied/error/timeout, tipo Coordinates={lat:number;lng:number}. Migration0012 usa doubleprecision nullable + limites90/180. Sem mudar client/schema, a API deve preservar números e ausência, rejeitar tipos JSON incorretos.

Bodycheck-in/out e coords agora unknown; após auth/tenant/membership/UUID e profileexistente, não-null requer objeto não array (location_invalid400). Campos não-null devem aparecer em par (location_pair_required anterior), ser NUMBER finito e respeitar limites existentes (latitude_invalid/longitude_invalid400). Removida coerção Number: false/texto/arrays não viram0,0. Ausência/undefined/null/{}/doiscamposnull continuam semGPS; zero numérico, floats e extremos válidos continuam aceitos. Prioridade profile404 e authgates preservada, sem mover validação GPS para antes da autoridade. TodasSQL/stamps/geo assignments/params/tenant/lifecycle/ledger e helper/doistestespolicy/noveunit451 preservados; sem geofence ou GPS obrigatório. Tipagem não comprova origem/proveniência/localização física.

Oito regressões novas em assignment-coordinates.controller.test.ts, pathausente, nenhumtesteexistente alterado: lat/lngnão-números/bodyshape, númeroszero/floats/limites, ausência/pair/bounds/prioridades, auth/tenant/member/UUID/profile, start/completion/ledger intactos. Local controllerreal/helperreal com stubs Nest/Auth/DB: antes16PASS/3FAIL de19 (8novos+11existentes), depois19PASS. Não substitui typecheck/NestHTTP/PostgreSQL.

HTTPjourneyexisting preserva todasregressõesanteriores e fluxo originalsemGPS. Novos28JSONs (6bodyshape+7lat+7lng+4pair+4bounds) por check-in/check-out, total56respostas400 com mensagemespecífica, compara assignments e earnings antes/depois sem mudança. SegundoassignmentCI de empresaB testa GPSnumérico0,0 e90,180 em check-in/out, ACKid/status/timestamps reais, semcompletion/ganhosnovos; fluxoA continua semGPS e passportcompletedcount1 preservado. Coordenadas são valores EXPLÍCITOS de fixture, não leitura física. mktemp/trap/guardlocal/bash-n PASSlocal; HTTP/PG/typecheck só após CIcompleta no SHAexato.

Exigir CI própria4web/713mobile/283API/3CLI e todossteps frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth, novosmarkersGPSnegativo/positive+journeyoriginal+markers451. Revisar novepaths/diff/bytes/lease, merge sógatesaplicáveisPASS; conferirpais/tree/main e pósCIexato. APKpróprio/pósN/A porAPI/docs/mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica#438, deps/native/mobile/workflows intactos. Não atribuir APK de outroSHA, emulador≠físico. Consolidar evidências/memória/ledger/DVT/checkpoint no mesmociclo, recibofinalnocorpoPRapósSHAs/runsgerados, preservarhistória.

Próxima ação: verificar pós destePR e consolidar recibos446–452, revalidar main/PRs/code/ledger e auditar próximoendpoint com falha concreta (Privacy/Copilot inputs), sem mudanças de política de dados/decisõesIA/providers por inferência. CareerConversion já protegido; não reimplementar. Lifecycle/concurrencyreplacement separado, exige prova específica. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho intactos; zerocusto/deploypago/contratação/PSP/dinheiro. FísicoAndroid/VisualTruth/E2E/SecureStore/piloto, pentest/providers/PSP/KYC/FIN-RISK/WebpagoOPEN; projetoandamento, rotinaativa e próxima ação independente sem pedir continuar.


## Copilot runtime e consolidação de recibos #446–#452 — 2026-10-11 12:52 UTC

Base main `8d5fc2d8af3cd945b33ac9a8e04414c3e85ac75b`, tree `00c029a3a2e49337b78c0e0a9a7247f784d94d79`; README/DVT ORIGINAL v1.104/memória/checkpoint e main/PRs/código/CI relidos. #452 own38140257625/job114472501945 e pós38140584506/job114473459916 SUCCESS no head a6158e4c1bc2adf1b728cc4d97a49c2f99ee05bb e merge8d5fc2...; 4web/713mobile/283API/3CLI, zero falhas, todos steps completos e cinco markersGPS/assignment/journey. Sete correções446–452 próprias/pós PASS, +67 testesAPI216→283; nenhum merge repetido. Recibos finais em docs/evidencias/API_RUNTIME_RECEIPTS_446_452_2026-10-11.md, evidências individuais atualizadas por acréscimo. Tabela primária:

| PR | Head aprovado | Merge main | CI própria / pós (PASS) | Testes API / novos |
|---|---|---|---|---|
| [#446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/446) Revisão de segurança | eebfcb74debcc6891c1345ffb688bb7f23e924ae | 3de10488b64a90139386fc2b6f5617744b35100c | [38137493375](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137493375) / [38137742579](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38137742579) | 228 / +12 |
| [#447](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/447) Recursos de segurança | 88da0e014bbbc74cef13b860aa6fa60595564f73 | dc3b70d61153c6e8a1d14ca0f6678f4586667ffa | [38138158446](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138158446) / [38138345123](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138345123) | 241 / +13 |
| [#448](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/448) Cancelamento | 2a128e6f450cb31508ac34a5f77bb7fdca28a4a7 | 3ee73c73229d1034324a858b65bd73bfd73d314e | [38138438300](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138438300) / [38138677504](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138677504) | 250 / +9 |
| [#449](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/449) Substituição | e4322dc8679a173e977bd28ba07e07789928939d | 334900b6903cc3137d50e90bbfc2e7b98306645c | [38138783719](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38138783719) / [38139014848](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139014848) | 260 / +10 |
| [#450](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/450) Leitura de notificações | bdba5be156e7ceb95dcdb8e965641fb2f19ac263 | 4bf72d0a960b3e1b154997db8181575a5c5ec3c3 | [38139102667](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139102667) / [38139347035](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139347035) | 266 / +6 |
| [#451](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/451) UUID nas transições de trabalho | 2047bf849a3fbfa5a33f000669f53e48e0fa2923 | 6b7699b02c4f200356fcba5958de6eb937e983f9 | [38139500293](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139500293) / [38139768716](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38139768716) | 275 / +9 |
| [#452](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/452) GPS opcional sem coerção | a6158e4c1bc2adf1b728cc4d97a49c2f99ee05bb | 8d5fc2d8af3cd945b33ac9a8e04414c3e85ac75b | [38140257625](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38140257625) / [38140584506](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38140584506) | 283 / +8 |

Falha seguinte comprovada no controller real antes da correção: read(null/undefined) acessava body.tool; interpret(null/undefined) acessava body.text; textos JSON não string provocavam TypeError.trim; modos false/0/'' passavam pelo teste de truthiness e eram propagados como modos inválidos. Dez regressões NOVAS em copilot-input.controller.test.ts, inventário confirmou path ausente; seis testes originais de policy/tools permanecem byte idênticos. Harness local transpila controller/policy/tools reais e usa stubs explícitos Nest/Auth/DB: RED12PASS/4FAIL de16, GREEN16PASS. Não é evidência NestHTTP/PostgreSQL/typecheck.

read/interpret agora Body unknown e validam objeto não-array. read exige tool string do allowlist pelo accountType existente; mantém auth→memberships→toolACL→tenant/membership→SQL. interpret text string.trim não vazio≤2000, mode nullish mantém assisted; demais valores exigem enum manual/assisted/automatic, texto invalid precede modo invalid, auth antes de ambos. Policy/tools/provider/advisoryOnly/requireHumanConfirmation/executionAllowed=false/read_only_explicit e sete SQL literais/params/tenant/identity/profile intactos. Sem chamadas LLM/provedor/custos, decisão automática ou writes.

HTTPcopilot original preservado (intents/notifications/criticalaction/signout), adicionados guardlocalhost/mktemp/trap; profile fixture disposable real para leituras;76 JSON400/message específicos nos dois accountTypes, ausênciaAuth401, tenantmissing400, tenantalheio401, toolACL400. Compara seis leituras reais antes/depois (dashboard/planner/exceptions/career/week/support) sem mudança e verifica vazios reais das fixtures; cinco modos(enum3+omitted+null)×2accounts mantêm provider deterministic_baseline/providerConfiguredfalse/humanconfirmation/noexecution. bash-nPASS local. Typecheck/NestHTTP/PG e novosmarkers só comprovados após CI completa no SHAexato; exigir4web/713mobile/293API/3CLI própria e pós, revisar diff/bytes/lease/pais/tree antesde integrar.

APKpróprio/pós N/A por API/docs/mobiletree4cb705aeb39244f46649bc5c569459ef9b0c5b7d idêntica438; referência standalone438 verificada em emulador semMetro, não execução destaPR nem prova física. React19.1.4/RN0.81.6/frozenlock/tenant/RLS/desenho/rootnativeworkflows intactos. Não habilitar dinheiro/PSP/custos/deploy pago. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest/provedores/PSP/KYC/FIN-RISK/Webpago continuam OPEN; projeto em andamento.

Próxima ação concreta: acompanhar CI própria deste candidato, rever diff e integrar somentePASS, verificar pós SHAmerge e atualizar recibo final no corpoPR (SHAs gerados posteriormente). Revalidar main/README/memória/checkpoint e auditar Privacy requestType/details: String coage arrays/objetos para solicitações reais. Corrigir sóruntime, sem mudar políticas de direitos/retention/deactivation/exports ou ativarprovedor. Um gate externo isolado não bloqueia estas tarefas independentes; não exigir continuar nem encerrar rotina por roundend.



## Modelo operacional de execução autônoma — 11/10/2026

**Objetivo do proprietário:** avançar o MLIVRETRABALHO sem digitar «CONTINUAR», evitando longos períodos ociosos, até encerrar todas as pendências internas possíveis. O calendário do ChatGPT está ativo com execução horária, mas **não** é um processo de longa duração e não oferece garantia de execução ininterrupta.

**Estado verificado em 11/10/2026:** CI e APK standalone existem em GitHub Actions; não foi identificado serviço de agente de engenharia permanentemente executando neste repositório. O último commit observado antes deste adendo foi `ed64035184c8077df5e01eefab3e8d3fabc381cc` (#453). A ausência de PR aberto não demonstra conclusão do produto.

### Níveis de execução e verdade operacional
1. **Ativo já:** uma única tarefa ChatGPT a cada hora, realizando rodadas reais; cada rodada deve consultar `main`, Documento da Verdade, PRs, issues e gates, executar avanço concreto seguro, registrar evidência e próximo passo. Uma rodada pode falhar, terminar cedo ou ser atrasada pelo agendador. Não chamar isso de serviço 24×7.
2. **Pronto para implementação futura, NÃO ativado:** worker de desenvolvimento com ciclo `plan → implement → test → open PR → await gates → merge → verify → checkpoint → repeat`, processado por executor persistente com mecanismo de lease, idempotência, rate limit e recuperação após crash. Exige credenciais e orçamento explícitos do proprietário e hospedagem/equivalente apto; não criar serviço/custo por inferência. GitHub Actions apenas de CI/APK não substitui um worker IA.
3. **Gates que continuam humanos/externos:** instalação e E2E em Android físico, Visual Truth, pentest independente, PSP/KYC/sandbox real e decisões de infraestrutura/custo. Tais dependências não bloqueiam correções internas independentes.

### Contrato de segurança para um eventual executor persistente
- Credencial mínima, curta duração e rotativa (preferência GitHub App), armazenada somente em secret manager; nunca copiar token em documento ou log.
- Permitir escrita apenas no repositório deste produto e em branches de trabalho; bloquear force push e alterações destrutivas na `main`.
- **Sem merge automático** antes de gates aplicáveis (CI e standalone APK no SHA exato); validar depois na `main`. Em caso de gates pendentes, trabalhar em item independente, não simular PASS.
- **Sem gastos, provedores externos, pagamentos reais, deploy pago, exclusão de dados ou alterações de autorização** sem autorização específica.
- Preservar Documento da Verdade integralmente, compatibilidade React 19.1.4 / RN 0.81.6, isolamento tenant/RLS e comportamento de resultado financeiro incerto.
- **Checkpoint durável mínimo:** timestamp UTC, SHA observado, issue/PR selecionado, branch, commits feitos, resultados dos gates com links, bloqueios, próximo passo e idempotency key. Evitar loops de commits vazios, PRs duplicados e atualizações só de status.
- Monitorar: tempo desde último avanço material, rodadas falhas, custos/quotas, erros de credenciais e filas. Notificar o proprietário quando dois ciclos consecutivos não produzirem avanço e houver causa externa concreta.
- O executor nunca se declara instalado ou executando apenas porque este desenho foi escrito; ativação requer ambiente provisionado, secret seguro, smoke test de duas rodadas e evidência real de auto-recuperação.

### Critério de conclusão
Concluir apenas quando o inventário normativo estiver revisado requisito por requisito; gates internos aplicáveis comprovados; bloqueios externos listados com proprietário e evidência; nunca confundir conclusão do trabalho interno com produto pronto para produção.


### Inventário real da infraestrutura reutilizável (11/10/2026)
- Railway autenticado contém projeto `MLIVRETRABALHO` (`c576bee0-9708-4e85-b311-62f84e36bad6`), ambiente `production`, serviços `@mlivretrabalho/api` e `Postgres`. Não alterar serviços produtivos existentes para hospedar o agente.
- As variáveis visíveis da API no Railway não incluem nomes de segredo `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `COPILOT_GITHUB_TOKEN` ou outra chave de motor IA. Isso NÃO prova inexistência de licença Copilot na conta GitHub; a habilitação e o uso de modelos ainda requerem verificação.
- A API de repositório GitHub informa `private=false` para `dbdanielbaracho/MLIVRETRABALHO`. A modalidade **Copilot cloud agent automations** da documentação oficial exige repositório private/internal; nenhuma alteração de visibilidade foi feita. Uma alternativa é um GitHub Agentic Workflow em Actions, que requer um motor IA e autenticação, mais geração/commit do workflow compilado `.lock.yml`; escrever só o `.md` não ativa execução.
- Assinaturas GitHub/Railway pagas e serviços já existentes não demonstram disponibilidade de credencial IA ou orçamento ilimitado. Exige-se inventário de Copilot habilitado, autenticação segura e estimativa do consumo **antes de ativar** o worker.
- Próxima entrega de implementação segura: separar o executor em serviço exclusivo com idempotência e limites de gasto; nunca modificar a API operacional para manter loop de desenvolvimento. Validar fluxo de smoke, CI e permissions por um ciclo antes de ligar execução recorrente.


### Proteção das mensagens de timeout em Equipes (11/10/2026)

Leituras de membros e alocações com deadline abortam o transporte após 15 s. O tratamento tardio de `catch` poderia substituir a mensagem específica de prazo excedido por aviso genérico ao receber rejeição do fetch abortado. Guardas adicionais por `op.controller.signal.aborted` preservam a orientação específica do deadline, sem modificar operações de escrita e sem afirmar validação em aparelho físico. Regressão de contrato adicionada em `apps/mobile/tests/teams-read-deadline.test.mjs`; CI e APK ainda devem ser verificados no SHA final antes do merge.

## Privacidade manual e continuidade pós-#455 — 2026-10-11 15:54 UTC

README, Documento da Verdade ORIGINAL v1.104, memória, checkpoint e GitHub relidos. Base main `9f4668266129b65978a0003782693561d6404498`, tree `236bbdba89dda0408de6f31c2df6953b829b2b79`. #455 integrada uma única vez após revisão dos três arquivos, CI38148843064/job114497813804 SUCCESS (4web/714mobile/293API/3CLI, zero falhas, todos steps), e APK38148843065 attempt2/job114503199280 SUCCESS no mesmo head `c53c2aa5d2dac52f5b354f89374ba89a0b515cea`. Instalação15:42:03.8057917Z e DEVICE_SMOKE_OK15:42:56.2618191Z metro_required=false, emulador, não aparelho físico. ZIP artifact11707162092 size28910971 sha256:3480c1f17599dcb75fc5b9028a4b119513dd439807d560c41f17c493ba97ec96 expira25/10; digest do ZIP, não do APK individual. Primeira tentativa job114497813905 compilou BUILD SUCCESSFUL15:01:22Z mas o emulador falhou ColorBuffer/texture/com.android.phone ANR; logs examinados. Reexecução bounded já autorizada concluída, sem alteração ou novo rerun. Merge455 pais[ee8bade81d5241bac45f4878d2f5ceb595e5812f,c53c2aa5d2dac52f5b354f89374ba89a0b515cea], tree igualhead e mainconfirmadas. PósCI38153041572 e pósAPK38153041663 em acompanhamento, NÃO declarados PASS enquanto executam. Gate físico Android/E2E/VisualTruth segue OPEN.

Memória/checkpoint anteriores ainda apontavam #453; recuperados pela main e PRs reais. PósCI45338141228315/job114475342450 SUCCESS no merge ed64035184c8077df5e01eefab3e8d3fabc381cc, 4/713/293/3, todos steps/HTTP/ProductionTruth; nenhum merge repetido. Branch Privacy anterior só apontava ed640351... e não tinha PR/commit de implementação; retomar com lease e commit filho da main atual, sem perder alterações454/455. Rotina horária permanece ativa, sem criar executor/serviço/custo nem prometer execução contínua.

Pendência concreta independentemente da execução APK: POST privacy/requests usava String(requestType/details), aceitando arrays como tipos e convertendo JSON não-textual em textos fabricados, podendo criar solicitações reais. Código atual revalidado na main; regressões no controller real (stubs explícitos Nest/Auth/DB) antes7PASS/2FAIL de9, após9PASS. NOVO privacy-input.controller.test.ts inexistente no inventário; nenhum teste removido/substituído. Body unknown + objeto não-array; requestType string exatamente no allowlist oito tipos anterior; details nullish preservado, demais exigem string.trim, erro400 privacy_request_details_invalid. Autenticação primeiro; tipo inválido antes de detalhes; quatro tipos com detalhes obrigatórios, limite2000 após trim, optional blank/null/omitted→NULL mantidos. Helpers, todas SQL, list, export/redaction, deactivation/locks/owner/session/assignment/earnings e políticas legais/operador/retention byte idênticos fora do método manual. Sem alterar direitos ou decisões jurídicas.

HTTPprivacy original preservado, inclusive export scoped/redacted e ciclo operador/correction/portability/signout. Acréscimo guardlocalhost/mktemp/trap:88JSON400/message específicos +auth401, comparação GETrequests antes/depois sem novas solicitações;24 JSONválidos (8tipos texto2000+4opcionais×4missing/null/empty/blank) verificam ACK/GETid/status/details textouNULL/datareal e ausência de metadata operador. bash-nPASS local. Typecheck/HTTP Nest/PostgreSQL e markers novos só serão comprovados no CI completo, não inferidos do harness.

Exigir CI própria4web/714mobile/302API/3CLI no head final, todos steps frozen-lockfile/typecheck/build/mobileexport/migrations/retention/HTTP/ProductionTruth SUCCESS, diff9paths/bytes/tree/lease revisados; merge somente com gates aplicáveis, verificar main/pais/tree e pósCI SHAmerge. APK própria/pós desta alteração API/docs N/A pelo path-filter atual de standalone-pilot-apk.yml, sem modificar mobile/rootdeps/lockfile/workflows/scriptsnative. Não atribuir APK455 a este head nem dispensar acompanhamento pós455. Documento ORIGINAL e todo histórico preservados por append, memória/checkpoint/ledger/registro e nova evidência no mesmo commit.

Próxima ação concreta: acompanhar pós455CI/APK e CI desta PR; corrigir falha real se houver, integrar após aprovação aplicável e verificar pós. Persistir recibos finais de cadaSHA/run. Depois revalidar main e auditar inputs de safety-cases.create, trust-events.create/list e terms.accept (não considerar fechados sem prova); preparar regressões antes de corrigir, sem mudar ACL/SQL/categorias/causas/termos/políticas. Não encerrar projeto por faltaPR; gate isolado não bloqueia tarefas independentes. React19.1.4/RN0.81.6/frozenlock/tenant/RLS/desenho preservados. Zero produção Railway alterada diretamente, dinheiro real/PSP/novo serviço/custo/deploypago. Físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/provedores/Webeventualpago continuam separados e OPEN.


## Relato de segurança: JSON e UUID em runtime — 2026-10-11 16:00 UTC

Base main `aad6a27a9595d3f5c37404c52a0c9717c58ad22f`, tree `5e90144760d2092972b9a020cfb31248ba8f8131`; README/DVT ORIGINAL v1.104/memória/checkpoint/código/main/PRs reconsultados. #456 merged uma única vez após próprioCI38153269959/job114510935277 SUCCESS no head3f64b00e4d7379db30839f7e65e6d3b6aea1dd84, 4web/714mobile/302API/3CLI, zero falhas, todossteps e doismarkersprivacidade+export/operator original reais. Merge/pais[9f4668266129b65978a0003782693561d6404498,3f64b00e4d7379db30839f7e65e6d3b6aea1dd84]/treeigualcandidato/mainconfirmados; pós38153500329 em acompanhamento, não declararPASS antecipado. APK456 própria/pósN/A porpath-filterAPI/docs/mobiletreef50bb7c71f70ae65f59ed558debff6e02a91756e intacta, sem atribuir455 a456. #455 próprioCI38148843064/APK38148843065attempt2 PASS; pósCI38153041572/job114510260977 SUCCESS no merge9f466... com4/714/293/3 e todossteps; pósAPK38153041663 em acompanhamento. Não repetir merge ou rerun por suposição.

Falha concreta reproduzida no controller real: safety-cases.create acessava body.description e .trim em JSON null/nontext, gerando TypeError; assignmentId sem formato/tipo UUID entrava no caminho SQL. Somente create alterado: Bodyunknown, objetonãoarray, descrição string.trim não vazia≤4000 e categorySTRING no allowlistseis original; erros400 safety_case_invalid. assignmentId nullish continua opcional, demais exigem UUIDSTRING (assignment_invalid400) antes de SQL. Auth/tenant/membershipprimeiro; payloadinválido antesdeUUID. Não alterar conteúdo/categorias de denúncias, política de acesso, papel/companyroles ou conferência do trabalho: profissional do próprio assignment e companyroles continuam autorizados, unrelated403 e inexistente400assignment_not_found preservados. Quatro SQL literais/params/trustedtenant/reporter e GETmine/sort/cross-company policy/helper byte idênticos; sem enforcement automático ou penalidade.

Nove regressões novas em safety-create-input.controller.test.ts, pathausente/nenhum teste sobrescrito, três testes originais do helperACL preservados. Controller/helper reais com stubs Nest/Auth/DB: RED8PASS/4FAIL de12→GREEN12PASS. JSONshape/text/category/UUID/optionalassignment/trustedreporter/category6/text4000/authpriority/relatedACL/companyroles/dbfailure; não é typecheck/NestHTTP/PostgreSQL. HTTPsafety original íntegro inclusiveadminreviews/events/idempotência/cross-tenant e duas regressões446:62JSON inválidos(31porprofissional/owner)400/mensagem; sem autenticação ou sem membership:401; tenant ausente:400; assignment UUID válido inexistente:400; GETmine/companycases antes/depois idênticos. Seiscategoriastext4000/omitternullassignment reais ACKid/status/timestamp/GETdesc/tenant/reportedByMe e visibilidadecompany, maisownerrelatocomaassignmentreal visibleprofessionalreportedByMefalse e ausentecompanyB. bash-nPASSlocal; todosmarkersnovos/originais sócomprovadosapósCIreal.

Exigir CI própria4web/714mobile/311API/3CLI e todossteps frozenlock/typecheck/build/mobileexport/migrations/retention/HTTP/ProductionTruth PASS noSHAfinal; rever9paths/diff/bytes/lease; integrar sógatesaplicáveis, confirmarpais/tree/main e pósCI SHAmerge. APK destaAPI/docs N/A conformeworkflowpath-filter; não modificarapps/mobile/rootReact19.1.4/RN0.81.6/lockfile/workflows/buildnative. DVT ORIGINAL e histórico preservados porappend; memóriacheckpointledgerregistro+evidência no mesmo commit. Metadados finaisPR depoisdeSHAs gerados e próximo adendorecibo durável.

Próximas ações concretas: acompanhar próprioCI deste relato e pós456, manter acompanhamentoAPKpós455 sem confundircompilarcomsmokePASS ou emuladorcomfísico. Auditartrust-events.create/list body/notes/cause/UUID e terms.accept null/nontexttrim com provas específicas antes de corrigir; preservar políticas/causas/idempotência/SQL/ACL. Gates físicos Android/E2E/VisualTruth/SecureStore/piloto, pentestindependente/providers/PSP/KYCsandbox/FIN-RISK/Webeventualpago seguem OPEN. Zero custo/PSP/dinheiro/serviçonovo/deploypago/Railwayprodução direta. Rotinaativa e projetoandamento, sem encerrar por roundend ou ausênciaPR.



## Aceite de termos: validação JSON em runtime — 2026-10-11 16:10 UTC

README, Documento da Verdade ORIGINAL v1.104, memória, checkpoint e GitHub reconsultados na main `1ef32e4b2f2c862c795795df6e1ba942a9beed4b`, tree `a0a0bd033dcb30c9193e80c1b33f5ec91c763184`. #457 integrada uma única vez após CI38153692777/job114512174782 SUCCESS no head280a8bb4493a7a5177fca20d990538fbbffd3af2: 4web/714mobile/311API/3CLI, zero falhas, todos os steps e cinco markers safety create/admin/events originais e novos comprovados. Merge/pais[aad6a27a9595d3f5c37404c52a0c9717c58ad22f,280a8bb4493a7a5177fca20d990538fbbffd3af2]/tree igual ao candidato/main confirmados. PósCI38154072947 em acompanhamento, sem declarar PASS antecipado. #456 pósCI38153500329/job114511620064 SUCCESS no mergeaad6a27... com4/714/302/3, zero falhas, todossteps e três markers de privacidade/export/operator comprovados. APK própria/pós de456 e457 N/A pelos path-filters API/docs: tree mobile f50bb7c71f70ae65f59ed558debff6e02a91756e preservada. #455 pósCI38153041572 SUCCESS; pósAPK38153041663 continua em execução no smoke, não declarar aprovado nem emitir novo rerun por suposição. Sua própriaAPK38148843065 attempt2 já foi comprovada no headc53c2aa...; não atribuí-la às alterações API posteriores.

Falha reproduzida no controller real terms.accept: JSON null/undefined e termsKey/version não-string causavam TypeError. Apenas accept recebe Bodyunknown, restringe objeto não-array e faz trim somente em string; retorna400 terms_key_and_version_required antes de SQL para valores inválidos. Auth permanece primeiro, identidade obtida do token, não do body. SQL INSERT/ON CONFLICT preservado byte a byte, assim como list/status, policy/missingTerms, versões1.0 existentes, chaves e versões string já permitidas. Nenhuma nova política legal, limite arbitrário ou aceite presumido. accepted_at do replay continua preservado pelo banco.

Sete regressões novas em terms-input.controller.test.ts; teste original da política mantido. Controller e helper reais com stubs Nest/Auth/DB: RED5PASS/3FAIL de8 para GREEN8PASS, sem confundir com typecheck ou PostgreSQL. Cobrem shape/key/version, trim, identidade confiável/ACK, auth antes de payload, falhaDB e list/status para companyroles e professional. Script HTTP company-onboarding original preserva signup/workspace/owner/job/analytics e ganha guard localhost, mktemp/trap, 27 JSON inválidos400/mensagem + auth inválida401; GETacceptances/status antes/depois idênticos. Fixtures reais descartáveis company e professional verificam dois termos1.0 cada, replay com mesma acceptedAt, datas reais parseáveis, status compliant, nenhuma duplicação e isolamento entre identidades. bash-n PASS local. Dois markers novos e marker original do onboarding dependem de CI HTTP real, ainda não declarados PASS.

Rever todos os nove paths/diff/bytes, exigir próprioCI4web/714mobile/318API/3CLI, frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth no SHA final. Integrar só com gates aplicáveis, confirmar pais/tree/main e CI pós no SHA merge; APK N/A para API/docs conforme workflow existente, sem inventar run quando consulta vazia. DVT ORIGINAL/histórico preservados em lugar por append, memória/checkpoint/ledger/registro/evidência atualizados no mesmo commit. Próxima ação: completar os gates desta PR e os pós457/455; auditar trust-events create/list com regressão de JSON/notes/cause/UUID antes de corrigir, sem alterar causalidade/ACL/RLS ou enforcement. React19.1.4/RN0.81.6/lockfile/native/workflows preservados. Físico Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, PSP/KYC sandbox/FIN-RISK/provedores/Web eventualmente pago seguem OPEN. Sem custos, dinheiro real, PSP, serviços novos ou alterações diretas em Railway produção. Rotina ativa; projeto ainda em andamento.


### Correção do próprio teste antes da integração — 2026-10-11 16:13 UTC

PR #458 head4bf37ee6a2bcef7b6df13e4cbf5a2995f742eb09 NÃO integrado: CI38154327849/job114514053655 falhou no Typecheck com TS2532 em duas referências accepted[0] do teste novo, noUncheckedIndexedAccess. Dados de fixture agora definidos como tupla readonly as const, comprovando índice existente sem desabilitar verificação nem alterar controller/política. Regressores locais8PASS novamente; exigir CI completo do novo SHA, incluindo HTTP real; a falha anterior não é infraestrutura nem prova de aprovação. Revalidar head/main/diff antes de merge. Histórico original e snapshot anterior preservados.


## Registros de confiança: JSON, causa, observações e UUID — 2026-10-11 16:18 UTC

Base main `c5ef0cc895859a35e4cbde6691f1eb40b98fc733`, tree `ebe6a6236055ab12e416248f1686fbe7ed5ebc2a`; README/DVT ORIGINAL v1.104/memória/checkpoint/código/GitHub reconsultados. #458 integrada uma única vez no head7cd06a32800c7aa5a8a94c6b17da056ebbff2433 com CI38154542479/job114514691921 SUCCESS:4web/714mobile/318API/3CLI, zero falhas e todossteps. Dois markers novos de termos e o onboarding original foram comprovados com PostgreSQL/HTTP. Merge/pais[1ef32e4b2f2c862c795795df6e1ba942a9beed4b,7cd06a32800c7aa5a8a94c6b17da056ebbff2433]/tree/main confirmados; pósCI38154771886 em acompanhamento, não antecipar PASS. Tentativa anterior38154327849 falhou no Typecheck de dados de teste, corrigida em novo commit sem relaxar verificação; não infraestrutura. #457 pósCI38154072947/job114513299585 SUCCESS no merge1ef32e4... com4/714/311/3 e markers safety original/create/admin. #456 pósCI38153500329/job114511620064 SUCCESS com4/714/302/3 e markers privacy/export/operator. APK456–458 própria/pós N/A pelo path-filter API/docs, mobiletreef50bb7c71f70ae65f59ed558debff6e02a91756e preservada; não atribuir APK455 a códigoAPIposterior. #455 próprioCI38148843064/APK38148843065attempt2 e pósCI38153041572 aprovados; pósAPK38153041663 em acompanhamento no smoke, ainda NÃO PASS nem bloqueio definitivo, sem repetir rerun em andamento.

Falhas reais reproduzidas em trust-events.create/list: body null/undefined ou notes não-texto geravam TypeError; causas false/0/vazia escapavam da validação por truthiness; UUIDs de professional/assignment sem tipo/formato entravam em SQL. Mudança restrita a validação de runtime: Bodyunknown/objetonãoarray, professionalIdUUIDSTRING/eventTypeSTRING no allowlistquatro original (trust_event_invalid400), causa não-nullish STRING no allowlistcinco original (trust_cause_invalid400), notes não-nullish STRING (trust_notes_invalid400), assignmentId opcional nullish ou UUIDSTRING (trust_assignment_invalid400). no_show/late_arrival ainda exigem assignment e preservam assignment_required400 antes do UUID inválido vazio. List rejeita professionalId malformado400 depois de autenticação/tenant/membership/companyrole. Null/omit causa continuam undetermined; notes null/omit/empty/blank continuamNULL, string trim; nenhum limite de texto inventado.

SQL literais de list/create, tenant/RLS, owner/admin/manager/company, reporter obtido da identidade confiável, professionalvisibility404, assignmentexistência400 e relação profissional400 preservados. Tipos/causas/ordem de listagem e datas reais do ACK inalterados. Sem enforcement, multas, decisão laboral automática ou mudança em scores/causalidade/termos/provider; erro DB não fabrica sucesso.

Dez regressões novas em trust-input.controller.test.ts (path antes ausente): controller real com stubs Nest/Auth/DB RED4PASS/6FAIL→GREEN10PASS; shape/UUID/type/cause/notes/optionalNULL/defaults/ACK/roles/authpriority/visibility/relation/dbfailure. Não é prova de typecheck/NestHTTP/PG. HTTPtrust original preservado (causa company/reporter/cross-tenant404/automatic_guilt400); script guard localhost/mktemp/trap,52JSON inválidos400/mensagem, três UUID paths400, auth401/tenant400/membership401/professionalrole403/UUIDválidonãovisível404. GETevents/assignments/earnings antes/depois idênticos.36fixtures positivas(4types×7causeoptions +8assignment/notesoptional) verificam id/eventType/cause/trustedreporter/occurredAt reais, GETnotes/NULL/assignment/date, isolamento404 e assignments/earnings inalterados sem enforcement. bash-nPASSlocal; dois markers novos mais original dependem de CI real, não antecipados.

Rever novepaths/diff/bytes, exigir próprioCI4web/714mobile/328API/3CLI e todos steps no SHA final; integrar somente gates aplicáveis, confirmar pais/tree/main e CI pós no SHAmerge. APK destaAPI/docs N/A conforme workflow existente; React19.1.4/RN0.81.6/frozenlock/mobile/web/DB/workflows nativos preservados. ORIGINALv1.104 em lugar com histórico inteiro por append, memória/checkpoint/ledger/registro/evidência no mesmo commit. Próxima tarefa concreta auditada independente: integrity.controller create/review acessam b.evidence?.trim/b.note?.trim sem validação JSON e aceitam IDs malformados; reproduzir regressões antes de corrigir, preservar adminACL/SQL/status/reviewhuman e ausência de punição automática. professional-capabilities roleId PUT/DELETE também precisa auditoria factual de UUID antesSQL, não declarar falha resolvida sem prova. Verification/conversations/work-passport/career-conversion inspecionados, não alterar sem reproduzir problema e contrato. Scores/decisões de confiança devem manter política vigente; nenhum ajuste arbitrário em dados reais.

Gates físicos Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago permanecem separados e OPEN. Sem custo, dinheiro real, PSP, serviços novos, deploy pago ou alteração direta de produção. Um gate pendente não encerra o projeto; rotina ativa, não agente24/7.


## Casos de integridade: entradas em runtime — 2026-10-11 16:24 UTC

README, Documento da Verdade ORIGINAL v1.104, memória, checkpoint, PRs, main e código reconsultados. Base `de64d2c9bbf05eb6ab815c282c3f38e557438d5c`, tree `765627fcde029d7238611ed559dd3f257037083e`. Nenhum merge anterior deve ser repetido.

Recibos confirmados:
- #455: merge9f4668266129b65978a0003782693561d6404498; próprioCI38148843064 e APK38148843065attempt2 aprovados no headc53c2aa5d2dac52f5b354f89374ba89a0b515cea. PósCI38153041572/job114510260977 SUCCESS4web/714mobile/293API/3CLI. PósAPK38153041663/job114510261888 SUCCESS no merge exato: instalação2026-10-11T16:16:31.3465658Z, DEVICE_SMOKE_OK16:17:18.3135349Z metro_required=false. ZIP11708171528 size28910970 digestsha256:3b7bd65396603ec00b99b47dc662b694959c6a3bfb42dd1936a6dad9c393ce87, expires2026-10-25T16:17:20Z, não expirado na consulta. Digest é do ZIP; prova de emulador, não aparelho físico. A primeira falha de emulador/reexecução própria já foi resolvida, sem novo rerun.
- #456: mergeaad6a27a9595d3f5c37404c52a0c9717c58ad22f; próprioCI38153269959/job114510935277 e pósCI38153500329/job114511620064 SUCCESS4/714/302/3, todos steps, zero falhas, três markers privacy/export/operator.
- #457: merge1ef32e4b2f2c862c795795df6e1ba942a9beed4b; próprioCI38153692777/job114512174782 e pósCI38154072947/job114513299585 SUCCESS4/714/311/3, todos steps/zero falhas/cinco markers safety create/admin/events.
- #458: mergec5ef0cc895859a35e4cbde6691f1eb40b98fc733; próprioCI38154542479/job114514691921 e pósCI38154771886/job114515371572 SUCCESS4/714/318/3, todos steps/zero falhas/dois markers de termos e onboarding original. Falha TS2532 do teste no head anterior4bf37... foi corrigida em novo commit7cd06... sem relaxar strict.
- #459: head96d82ccaf194edf94ea5da9c56ead4e6175fbdf4, próprioCI38154886612/job114515707438 SUCCESS4/714/328/3, todos steps/zero falhas/três markers trust. Mergede64d2c9bbf05eb6ab815c282c3f38e557438d5c com pais[c5ef0cc895859a35e4cbde6691f1eb40b98fc733,96d82ccaf194edf94ea5da9c56ead4e6175fbdf4], tree igual ao candidato e main confirmadas. PósCI38155165066 em acompanhamento; só declarar PASS depois da conclusão e logs no SHA exato.
APK própria/pós456–459 N/A por path-filter API/docs, mobiletreef50bb7c71f70ae65f59ed558debff6e02a91756e preservada. Não atribuir APK455 a código API posterior.

Falha reproduzida no controller real IntegrityController: create/review acessavam evidence/note em JSON null e chamavam trim em valores não-string; UUIDs malformados escapavam para SQL. Alteração restrita: Bodyunknown/objeto não-array, assignmentId UUIDSTRING e kind STRING no allowlist original, evidence STRING trim não vazia; erros400 integrity_case_invalid. Review valida UUID de case, decision STRING no allowlist original e note STRING trim não vazia; erro400 review_invalid. Autenticação/tenant/membership/owner-admin continuam antes dos inputs. Não adicionar limite de texto, categoria, status, penalidade ou decisão automática.

Todos os SQLs, tenant/RLS, identidade auditada, list e ordenação preservados. Criação exige assignment visível no tenant; assignment_not_found400 permanece. Review continua somente nos estados open/needs_more_info; caso ausente, outro tenant ou encerrado mantém integrity_case_not_open400. Sem modificar decisão humana, review auditado ou ganhos.

Dez regressões novas, path antes ausente; controller real com stubs Nest/Auth/DB: RED6PASS/4FAIL→GREEN10PASS. Cobrem JSON/tipos/UUID, kinds, trim/ACK, auth/roles, assignment visível, três decisões humanas, erro de caso encerrado, list e falha DB. Prova local não é typecheck/NestHTTP/PostgreSQL.

Script HTTP trust-causality existente preserva todas as verificações trust e recebe cobertura de integridade usando os mesmos fixtures descartáveis em localhost e mktemp/trap. 33 JSON de criação inválidos400/mensagem sem inserir casos; três kinds reais com ACKid/status/createdAt/evidence/assignment. Cada um recebe24JSON de review inválidos, três IDs malformados, auth/professionalrole/cross-tenant rejeitados, GET anterior idêntico. Transição humana open→needs_more_info→substantiated/unsubstantiated tem note trim e reviewedAt reais; tentativa posterior de alterar caso fechado retorna400 sem mudar GET. CompanyB não vê casos deA. GETassignments/earnings continuam idênticos, inclusive após reviews, sem enforcement. bash-n PASS local; dois markers novos somente serão comprovados no CI HTTP real.

Publicar branch/PR; rever nove paths, diff e bytes; exigir CI próprio4web/714mobile/338API/3CLI com frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth no SHA final. Integrar só com gates aplicáveis e confirmar pais/tree/main/pósCI. APK desta mudança API/docs N/A pelo workflow existente; React19.1.4/RN0.81.6/lockfile/native/web/DB/workflows preservados. ORIGINALv1.104 e todo histórico permanecem em lugar por append; memória/checkpoint/ledger/registro/evidência atualizados no mesmo commit.

Próxima auditoria concreta: professional-capabilities PUT/DELETE roleId entra em SQL sem guard UUID; reproduzir com controller/helper e ampliar HTTP taxonomy existente sem mudar taxonomia/certificações/níveis. Verification/conversations/work-passport/career-conversion inspecionados, sem correção especulativa. Scores/causalidade exigem contrato vigente, nenhum ajuste arbitrário autorizado. Gates físicos Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago seguem OPEN. Sem dinheiro real, custos, PSP, novo serviço, deploy pago ou alteração direta em produção. Rotina ativa; projeto em andamento.


## Confirmação de trabalhos: validação e autoridade antes de SQL — 2026-10-11 16:32 UTC

Base main `f55cffba8947576d17964c39ba614eff4bab60dd`, tree `34b2c16e34efa658ae8ab02a270767367cb7f60d`. README/DVT ORIGINAL v1.104/memória/checkpoint/main/PRs/código relidos; não repetir455–460. #460 integrada uma única vez após CI38155305777/job114516945715 SUCCESS no head aa0baf324d7ec13cfa6b3a029697fff2a231645b:4web/714mobile/338API/3CLI, zero falhas/todossteps/dois markers integrity e três trust. Merge f55cffba8947576d17964c39ba614eff4bab60dd pais[de64d2c9bbf05eb6ab815c282c3f38e557438d5c,aa0baf324d7ec13cfa6b3a029697fff2a231645b], tree igual ao candidato e main confirmadas. PósCI38155630675 em acompanhamento, sem antecipar PASS.
#459 pósCI38155165066/job114516529907 SUCCESS4/714/328/3 no merge de64d2c9bbf05eb6ab815c282c3f38e557438d5c, todossteps/zero falhas/três markers trust. Recibos anteriores455–458 e pósAPK455 integral já persistidos no adendo de integridade; APK própria/pós456–460 N/A pelo path-filter API/docs, sem atribuir APK455 a código API posterior.

Resultado da auditoria de capacidades: NÃO impor UUID a roleId. Migração0058_taxonomy_capabilities.sql define taxonomy_roles.id TEXT e professional_capabilities.role_id TEXT, com chave canônica hospitality.bartender. Controller, helper, cinco testes de controller/quatro de helper e HTTPtaxonomy já trabalham com IDs governados textuais, CRUD real e isolamento. Proposta histórica de auditar UUID nesse campo foi confrontada e descartada; não é bug confirmado nem tarefa a implementar. Nenhum arquivo de capacidades/taxonomia/migração alterado. IDs de company_jobs e professional_profiles são UUID nas migrações0001/0002, reconsultadas antes desta mudança.

Falha reproduzida no CompanyJobsController.confirm real: body null/undefined gera TypeError antes de autenticação; professionalId não-string/malformado pode entrar nos SQLs. requireJob também encaminhava jobId malformado de candidates/recommendations/confirm ao banco. Correção restrita: confirm recebe Bodyunknown, autentica/verifica tenant/membership/companyrole PRIMEIRO, aceita objeto não-array e professionalId UUIDSTRING; payload inválido400 professional_required antes de SQL. requireJob valida jobId UUIDSTRING, retorna400 job_invalid; UUID válido ausente continua404 job_not_found. Para usuário autorizado, profissional inválido ainda tem precedência sobre job inválido. Entradas inválidas não inserem assignment, membership nem notificação.

Todos os SQLs, active_marketplace_professional/identity, tenant/RLS, confirmação de interesse, destinatário confiável e payloads de escrita válidos preservados. Nenhum ajuste de ranking/scoring/causalidade, pagamento ou regra de alocação. Helpers confirmationDecision/rankCandidates/reliability/roleFit/cityDistance/professionalScore permanecem byte idênticos. Assignment confirmado prévio retorna mesmo ACK e confirmedAt sem novos INSERTs; checked_in/in_progress/checked_out/completed/cancelled continuam assignment_state_conflict400. Job fechado, interesse ausente e destinatário ativo ausente preservam seus erros, sem fabricar sucesso.

Dez regressões novas (path antes ausente) e três testes originais de confirmationDecision mantidos: controller/helpers reais com stubs Nest/Auth/DB RED9PASS/4FAIL de13→GREEN13PASS. O harness local remove decorators/imports de tipo, inclusive MatchInput de allocation, para Node24; erro inicial de elisão no harness não foi contado como regressão do produto. Não é typecheck/NestHTTP/PG. Script HTTPjourney original, incluindo lifecycle, GPS, cross-tenant, ratings/earnings, preservado.16JSON de confirmação inválidos antes e depois de confirmação real, três IDs malformados em candidates/recommendations/confirm, auth401/tenant400/membership401, roleprofessional403 depois do vínculo real. GETme/assignments/earnings/notifications/candidates antes/depois idênticos. Replay confirmado tem id/jobId/professionalId/tenant/status e confirmedAt reais iguais ao ACK original; não duplica notifications/memberships/assignments. bash-nPASSlocal. Dois markers novos e jornada original dependem do CI real no SHA final.

Exigir próprioCI4web/714mobile/348API/3CLI, todossteps frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth. Rever novepaths/diff/bytes, integrar somente gates aplicáveis, confirmar pais/tree/main e CI pós no SHA merge. APK N/A para API/docs conforme workflow existente; React19.1.4/RN0.81.6/lockfile/mobile/web/DB/workflows preservados. ORIGINALv1.104 em lugar com todo histórico por append, memória/checkpoint/ledger/registro/evidência no mesmo commit.

Próxima pendência concreta: JobsController expressInterest/getInterest ainda recebem jobId sem validar UUID; reproduzir antes de corrigir, preservar perfil/autorização/idempotência de interesse confirmado e visibilidade de rede. Planner.teamPlan também precisa auditoria factual de jobId após requirements, sem modificar otimizador ou scores. Não mexer em roleId textual. Gates físicos Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago separados e OPEN. Zero custo, dinheiro real, PSP, serviço novo, deploy pago ou mudança direta em produção; manter rotina ativa e andamento.


### Correção do gate HTTP da confirmação — 2026-10-11

O CI 38155848323 do head ede2f1b62388adbea3ecb12d321ade1e0ba93853 passou typecheck, build e todos os testes unitários (4 web, 714 mobile, 348 API, 3 CLI), mas falhou no HTTP journey: a nova fixture consultou `/v1/notifications`, rota inexistente (404). A rota canônica auditada é `/v1/notifications/mine`, que sem tenant agrega somente os tenants da identidade autenticada e permite lista vazia antes da confirmação. Corrigida apenas a fixture, acrescentando prova de uma notificação factual de confirmação por tenant e preservação no replay. Não houve alteração de produção para contornar o teste. O gate do novo SHA permanece pendente até execução integral bem-sucedida; não repetir/rerodar o SHA antigo nem alegar merge aprovado.


## Interesse e planejamento: UUID de trabalho validado antes de SQL — 2026-10-11

Base main `fad846ab4f2d089e5f55c6e9770f4d8088c5c423`, tree `c7ae970f61ad0fd3dbcf635f5ce7389f1b76d427`. README aponta DVT ORIGINAL v1.104; Documento da Verdade, memória e checkpoint relidos nesta base imutável; código, PRs, caminhos novos e workflow consultados. #455–461 já integradas, não repetir merges. #461 head 248eb54d44b0689acd5c9ab68d842cb87a547397 próprio CI38156463552/job114520353069 SUCCESS4web/714mobile/348API/3CLI, todossteps/zero falhas/dois novos markers+journey original no log primário. Merge fad846ab4f2d089e5f55c6e9770f4d8088c5c423 pais[f55cffba8947576d17964c39ba614eff4bab60dd,248eb54d44b0689acd5c9ab68d842cb87a547397], tree c7ae970f61ad0fd3dbcf635f5ce7389f1b76d427 igual ao candidato e main confirmadas. Falha anterior38155848323 conservada no histórico, corrigida fixture404 com rota notifications/mine; sucesso do novo SHA não apaga falha anterior. PósCI46138156715053 em execução, NÃO declarado aprovado nesta captura.
#460 pósCI38155630675/job114517914877 SUCCESS no SHA f55cffba8947576d17964c39ba614eff4bab60dd:4/714/338/3, todossteps, zero falhas, cinco markers trust/integrity conferidos. #459 pósCI38155165066/job114516529907 SUCCESSde64d2c9bbf05eb6ab815c282c3f38e557438d5c4/714/328/3; #458 pósCI38154771886/job114515371572 SUCCESSc5ef0cc895859a35e4cbde6691f1eb40b98fc7334/714/318/3. Os respectivos PRs receberam recibos finais; anteriores455–458/Android455 já documentados, não atribuir APK455 a API posterior.

Pendência concreta reproduzida em controllers reais: Jobs.expressInterest/getInterest e Planner.teamPlan admitiam jobId malformado até SQL UUID. Novo guard string/UUID400job_invalid. InteressePOST mantém prioridade auth→perfil real (404professional_profile_required)→UUID→vaga aberta→upsert existente; GET mantém auth→UUID→consulta da identidade, NULL real para interesse ausente. ONCONFLICT que preserva confirmed permanece byte a byte; nenhuma alteração de status, SQL, rede/visibilidade ou dinheiro. Planner mantém auth/tenant/membership/companyrole→teamPlanRequirements400requirements_invalid→UUID→consulta no tenant/400job_not_found→otimizador real. Listas, score, availability, requisitos/funções e algoritmo preservados, sem candidatos inventados nem calibração arbitrária. JobUUID confirmado pelas migrações0001/0005; roleId capacidades é TEXT e segue intocado.

Cinco regressões NOVAS de Jobs (path antes ausente): controller real + stubs Nest/Auth/DB RED3PASS/2FAIL→GREEN5PASS. Quatro regressões NOVAS de Planner + três testes originais teamPlanRequirements mantidos: RED6PASS/1FAIL→GREEN7PASS, incluindo isolamento/autorização/prioridade, datas/args confiáveis, otimizador real, ausência e falha DB honesta. Ajuste local de imports type-only do harness Planner foi necessário antes de produzir RED legítimo; o ERR_MODULE_NOT_FOUND do harness não é prova de falha de produto. Esses testes locais não substituem typecheck, NestHTTP ou PostgreSQL reais.

HTTPjourney existente ampliado:3IDs inválidos×GET/POST de interesse400 sem writes, auth401, perfilempresa404, UUID ausente GETnull/POST404, GETscoped proprietário e empresaNULL, replayPOSTconfirmed preservado após confirmação factual, assignments/earnings/notifications imutáveis. Extensão de confirmações #461 inteira mantida, rota canônica notifications/mine correta. HTTPplanner existente preservado com lifecycle e counts reais; amplia trêsUUIDs inválidos400, auth401/tenant400/member401/companyrole403/requirements priority400 e UUIDausente/cross-tenant400job_not_found. Planos válidos selecionam perfilBartender factual com disponibilidade real do tenantA; função sem candidato e tenantB retornam posições unfilled/selected[]/score0 reais. Leituras não alteram planner, assignments, earnings nem notifications. Ambos bash-n PASS e ambos recusam BASE_URL remoto; novas fixtures só em API local descartável com mktemp/trap.

Próprios CI e markers HTTP ainda PENDENTES no novo head: exigir4web/714mobile/357API/3CLI, zero falhas, frozenlock/typecheck/build/export/migrations/retention/HTTP/ProductionTruth, conferir diff/12paths/bytes e integrar somente no SHA aprovado. APK própria/pós N/A pelo pathfilter existente para API/docs/HTTPscripts; mobile/web/DB/packages/workflows/React19.1.4/RN0.81.6/lockfile preservados. Confirmar pais/tree/main e pósCI do merge; []/running não são sucesso. Atualização no mesmo commit do DVT ORIGINALv1.104 com todo histórico, memória, checkpoint, ledger, registro e evidência específica.

Próxima auditoria concreta independente: TeamAllocationController.allocation recebe teamId/jobId sem UUIDguard, ambos vão a SQL UUID; reproduzir antes de implementar e preservar auth/companyrole/job/team_not_found, ranking/availability/reasons reais, tenant/RLS e nenhum write. WorkGraph só lê tenant autenticado; Taxonomy usa roleId TEXT; ProfessionalPlanner mantém timestamps PostgreSQL já provados — não inventar correções nem tratar essas consultas como encerramento integral. Gates externos físico Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUST/providers, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago continuam OPEN e separados. Nenhum serviço novo/custo/dinheiro real/PSP/deploy pago/produção direta; continuidade ativa, sem pedir continuar.


## Tenant e alocação: UUID antes de SQL com autoridade preservada — 2026-10-11

Base main `a9da2f7343fa25286000df191a6bc002d660e673`, tree `8722f68b278b19d84653a772f99e5abb72be779e`. README→DVT ORIGINAL v1.104/memória/checkpoint/código/PRs/esquema relidos nesta base; histórico integral preservado. #462 próprio CI38156941513/job114521753599 SUCCESS no head428df22fa7ab95c9732b7dba3a4632b525fcaaa3:4web/714mobile/357API/3CLI, zero falhas/todossteps/4novos markers+2originais HTTP verificados no log primário. Merge único a9da2f7343fa25286000df191a6bc002d660e673 pais[fad846ab4f2d089e5f55c6e9770f4d8088c5c423,428df22fa7ab95c9732b7dba3a4632b525fcaaa3], tree8722f68b278b19d84653a772f99e5abb72be779e igual ao candidato/main. PósCI46238157190079 em acompanhamento, NÃO aprovado nesta captura. #461 pósCI38156715053/job114521090276 SUCCESS no mergefad846ab4f2d089e5f55c6e9770f4d8088c5c4234/714/348/3, todossteps/zero falhas/dois markers confirmação+journey original. Recibo final no PR. #455–460 e APK455 já comprovados em adendos anteriores; não repetir merges nem atribuir APK455 a API posterior.

Falhas reproduzidas em código real: TeamAllocation.allocation encaminhava teamId/jobId malformados a SQL UUID; AuthService.requireMembership encaminhava tenantId não confiável do header a SQL UUID. IDs UUID confirmados nas migrações0001/0013; tenant/RLS mantidos. Guard jobId stringUUID após autoridade/companyrole e antes de db.tenant:400job_invalid. Guard teamId stringUUID somente após lookup factual do job:400team_not_found, coerente com Teams.members/add/remove. Preservada prioridade job_not_found antes de team inválido e os erros factuais team_not_found/team_empty. Todos SQLs/args/ranking/matching/reliability/city/availability/reasons idênticos, zero writes novos.

Guard central restringe somente tenantId de requireMembership: inválido→401tenant_membership_required antes de SQL, mesma negativa existente para vínculo ausente. UUID válido segue consulta/role factual original. Bearer/hash/sessões/roles/autoridade de controllers/revogação/SQL/RLS intocados. Header ausente continua400tenant_required, vínculo ausente401, profissional em rota de empresa403. Falha real DB não é transformada em sucesso nem em permissão/negação fabricada.

Seis testes NOVOS de controller allocation+helpers reais com stubs Nest/Auth/DB: RED4PASS/2FAIL→GREEN6PASS, incluindo prioridade/auth/tenant/role, ausências/empty, ranking/reasons factual, unavailable[], args confiáveis/read-only/falhaDB. Quatro testes NOVOS de AuthService real e crypto builtin com stubs Nest/DB: RED2PASS/2FAIL→GREEN4PASS, oito tipos/IDs inválidos semSQL, vínculo válido/ausente, falhaDB e hashing/sessão original antes da negativa. Harness type-stripped é prova local limitada, não substitui typecheck/NestHTTP/PG/pentest.

HTTPteam-allocation original/membrosCRUD/ranking/disponibilidade preservado e ampliado com fixtures locais descartáveis/mktemp/trap:3IDs×job/team400/messages, auth401/headerausente400/membership401/roleprofissional403; workspaceB/jobB/teamB reais provam isolamento job/team, UUIDausente, prioridade job e emptyteam400. GETteams/members/assignments/earnings/notifications de ambos profissionais imutáveis; ranking real replay idêntico e unavailable[] factual. HTTPjourney original completo mantido, amplia headers3IDs inválidos+UUIDválido ausente×5GETroutes+confirmPOST401tenant_membership_required; invalidtoken401/ausente400/crossmember401; me/memberships/assignments/earnings/notifications antes/depois iguais. Scripts bash-nPASS e guarda BASE_URL remoto comprovada.

Gates novos ainda PENDENTES: exigir CI4web/714mobile/367API/3CLI/todossteps/zero falhas/3novos markers+originais HTTP/ProductionTruth, revisar12paths/diff/bytes/escopo e integrar somente SHA aprovado. Confirmar pais/tree/main e pósCI; []/running não são PASS. APK própria/pós N/A pelo filtro existente API/docs/HTTPscripts; mobile/web/packages/.github/root/lock/migrações/React19.1.4/RN0.81.6 preservados. DVT ORIGINALv1.104 inteiro/memória/checkpoint/ledger/registro/evidência atualizados no mesmo commit.

Alternativas auditadas: WorkGraph lê somente tenant autenticado; Taxonomy/searchRoles já trata query não-string via typeof seguro, catálogo governado TEXT (hipótese de TypeError descartada por código/testes existentes); ProfessionalPlanner utiliza timestamps reais/otimizador existentes. Nenhuma alteração inventada nestes pontos. Próximo: conferir próprios/pós462–463, persistir recibos finais e seguir auditoria funcional de dados/estados/falhas reais nas telas. Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST/providers, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago continuam OPEN separados. Sem custo/serviço novo/dinheiro real/PSP/deploy pago/produção direta; continuidade ativa, sem pedir continuar nem assumir conclusão por ausênciaPR.


## Publicação no app: ACK com UUID real e recibos finais455–463 — 2026-10-11

Base main `524cba983a49a4ea6ba10055f4be7fe0b2a58af8`, tree `48fefd8cd086023fc3148398c790538e91010c5c`, README aponta DVT ORIGINALv1.104. DVT inteiro/memória/checkpoint relidos; #455–463 e main reconsultados no GitHub, todos merges únicos confirmados. Todo histórico anterior preservado: capturas pending continuam históricas e são resolvidas pelos recibos exatos abaixo; não repetir ready/rerun/merge455 nem merges456–463.

| PR | Entrega | Head validado | CI próprio / job | Merge main | CI pós-merge / job | Testes web/mobile/API/CLI |
|---|---|---|---|---|---|---|
| [#455](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/455) | Mobile: mensagem de timeout preservada após abort | `c53c2aa5d2dac52f5b354f89374ba89a0b515cea` | [38148843064](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38148843064) / 114497813804 | `9f4668266129b65978a0003782693561d6404498` | [38153041572](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153041572) / 114510260977 | 4/714/293/3 |
| [#456](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/456) | Privacidade: JSON manual sem coerção fictícia | `3f64b00e4d7379db30839f7e65e6d3b6aea1dd84` | [38153269959](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153269959) / 114510935277 | `aad6a27a9595d3f5c37404c52a0c9717c58ad22f` | [38153500329](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153500329) / 114511620064 | 4/714/302/3 |
| [#457](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/457) | Safety: categoria/texto/assignment UUID | `280a8bb4493a7a5177fca20d990538fbbffd3af2` | [38153692777](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153692777) / 114512174782 | `1ef32e4b2f2c862c795795df6e1ba942a9beed4b` | [38154072947](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38154072947) / 114513299585 | 4/714/311/3 |
| [#458](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/458) | Termos: aceite com versão e replay factual | `7cd06a32800c7aa5a8a94c6b17da056ebbff2433` | [38154542479](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38154542479) / 114514691921 | `c5ef0cc895859a35e4cbde6691f1eb40b98fc733` | [38154771886](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38154771886) / 114515371572 | 4/714/318/3 |
| [#459](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/459) | Trust: tipos/causas/notas/UUID com audit factual | `96d82ccaf194edf94ea5da9c56ead4e6175fbdf4` | [38154886612](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38154886612) / 114515707438 | `de64d2c9bbf05eb6ab815c282c3f38e557438d5c` | [38155165066](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38155165066) / 114516529907 | 4/714/328/3 |
| [#460](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/460) | Integrity: criação/revisão humana sem enforcement | `aa0baf324d7ec13cfa6b3a029697fff2a231645b` | [38155305777](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38155305777) / 114516945715 | `f55cffba8947576d17964c39ba614eff4bab60dd` | [38155630675](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38155630675) / 114517914877 | 4/714/338/3 |
| [#461](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/461) | Confirmação: autoridade/IDs/replay sem duplicação | `248eb54d44b0689acd5c9ab68d842cb87a547397` | [38156463552](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38156463552) / 114520353069 | `fad846ab4f2d089e5f55c6e9770f4d8088c5c423` | [38156715053](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38156715053) / 114521090276 | 4/714/348/3 |
| [#462](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/462) | Interesse e plano: UUID, NULL/replay e candidatos reais | `428df22fa7ab95c9732b7dba3a4632b525fcaaa3` | [38156941513](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38156941513) / 114521753599 | `a9da2f7343fa25286000df191a6bc002d660e673` | [38157190079](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38157190079) / 114522489256 | 4/714/357/3 |
| [#463](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/463) | Tenant e alocação: UUID antes de SQL/escopo e ranking preservados | `026c1b205a87d7353d61524291ac327f7d6cb139` | [38157487107](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38157487107) / 114523357679 | `524cba983a49a4ea6ba10055f4be7fe0b2a58af8` | [38157775895](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38157775895) / 114524197984 | 4/714/367/3 |

Todos CI próprios e pós da tabela SUCCESS no SHA correspondente, counts exatos, zero fail e todossteps, inclusive frozenlock/typecheck/build/export/migrations/retention/HTTP/Nest/PostgreSQL/ProductionTruth. Markers específicos de cada tarefa foram lidos nos logs primários, sem usar pré-merge como substituto de pós. Em463 pósCI38157775895/job114524197984 SUCCESS no524cba983a49a4ea6ba10055f4be7fe0b2a58af8:4/714/367/3 e3novosmarkers tenant/allocation+2originais. Total final nesta base1088testes,74regressões API novas após293→367 e uma mobile em455 após713→714. APK próprio/pós456–463 N/A pelo pathfilter API/docs/HTTPscripts, nunca atribuir APK455 a API posterior.

Android455: próprioAPK38148843065 attempt2/job114503199280 SUCCESS no headc53c2aa5d2dac52f5b354f89374ba89a0b515cea, após primeiro smoke falhar por emulatorColorBuffer/texture/com.android.phoneANR com build aprovado; retry previamente solicitado verificou mesmoSHA. PróprioZIP11707162092sha256:3480c1f17599dcb75fc5b9028a4b119513dd439807d560c41f17c493ba97ec96. PósAPK38153041663/job114510261888 attempt1SUCCESS no merge9f4668266129b65978a0003782693561d6404498, instalação2026-10-11T16:16:31.3465658Z e DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false às16:17:18.3135349Z. ZIP11708171528 size28910970, sha256:3b7bd65396603ec00b99b47dc662b694959c6a3bfb42dd1936a6dad9c393ce87, expira2026-10-25T16:17:20Z. Digest é do ZIP, NÃO sha256 individual do APK; smoke é emulador, NÃO Android físico. Link [pósAPK455](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38153041663).

Auditoria funcional da home na base463: dados via loadProfessionalHome/loadHomeCards/APIs, loading/erro/vazio e retry; nenhum dado fictício reintroduzido. Empresa renderiza CompanyNav e protege contexto/deadline/publicação incerta. Essas leituras de código não encerram desenho original/Visual Truth físico. RoleId capacidades é TEXT governado; searchRoles já typeof-safe; hipóteses de guardUUID emrole e TypeError da pesquisa descartadas, sem commits inventados.

Nova falha concreta reproduzida em publishJob REAL: HTTP201 com todos fatos correspondentes mas id='job-real' era classificado created, podendo apagar formulário e anunciar publicação sem identidade UUID real. company_jobs.id é UUID no esquema canônico. Correção restrita: exige id stringUUID completo case-insensitive, sem trim/coerção de ID; resposta incompatível permanece statusunknown, NÃO rejected, pois não prova que o servidor deixou de criar. Exatamente uma chamada/nenhum retry automático. Mantidos title/workCity/location/nullablelocation/pay/status/timestamps equivalentes, payload, mensagens existentes, sessão/tenant e tratamento4xx/5xx. Sem alteração de tela/desenho/API/SQL/negócio/PSP.

Fixture positiva antiga id='job-real' corrigida para UUID real mantendo os seis testes originais e todos fatos/timezone; um novo teste comportamental examina11IDs malformados/tipos e UUID maiúsculo válido, com uma chamada. RED6PASS/1FAIL→GREEN7PASS no helper real via Node --experimental-strip-types --test tests/company-job-publication.test.mjs, sem mock de implementação. Falha original explicitamente retornava created/idjob-real; correção retorna unknown. Não é prova de dispositivo físico.

Novo ciclo móvel exige próprio CI4web/715mobile/367API/3CLI e Standalone Pilot APK no SHA exato, revisão8paths/bytes/diff/escopo, merge só após ambos SUCCESS e artifact/install/DEVICE_SMOKE_OK semMetro; depois verificar pais/tree/main e próprios gates pós no mergeSHA. Gates deste NOVO head PENDENTES nesta captura, não reutilizar APK455. Preserve React19.1.4/RN0.81.6/lockfile, API/web/DB/packages/workflows/layout intactos, somente helper+teste mobile e seis docs. DVT ORIGINALv1.104 inteiro, memória, checkpoint, ledger, registro e evidência específica no mesmo commit.

Próxima ação concreta: acompanhar CI/APK deste PR móvel, diagnosticar logs reais se falhar sem contornar gate; integrar somente aprovado e verificar pós. Continuar auditoria funcional independente (incluindo publicação ambígua e troca de sessão/empresa entre focus e remount, comparar helpers/testes antes de afirmar bug). Físico Android/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUST/providers, PSP/KYC sandbox/FIN-RISK e Web/Railway eventualmente pago seguem OPEN separados. Sem serviços novos/custo/PSP/dinheiro real/deploy pago/produção direta. Rotina ativa, fim de rodada ou bloqueio isolado não prova conclusão; não exigir continuar nem afirmar24/7.


### Gate completou e encontrou fixtures antigas de publicação — 2026-10-11

CI38158313160/head a07a2614b307a8c7657fa1453b526c959ab2faad passou typecheck/build/export, mas715mobile tiveram2falhas nos cenários de publicação de tela: fixture positiva usava idfixture-job, incompatível com UUID real. Corrigida exclusivamente fixture positiva de publication-screen-uncertain-deadline.test.mjs para UUID; todos os dez testes originais e assertions de autorização/deadline/replay/draft/mensagens mantidos. Acrescentado cenário real do handler+publishJob+runForSession que recebe ACK com UUIDmalformado em resposta oportuna: conserva draft/unknown/uncertain, busyfalse/Planejamento e impede segundoPOST após refresh da mesmaempresa. Nada da lógica de tela foi relaxado. Com helper ORIGINAL e fixtures novas,24testes→RED22PASS/2FAIL (helper e efeito no formulário); helper corrigido→GREEN24PASS. Novo esperado CI4web/716mobile/367API/3CLI e próprioAPK novoSHA. Agora9paths (3mobile+6docs). Head anterior/CI falho/APK antigo não valem para o novohead. Preservar falha histórica/recibos anteriores; novo merge exige todos gates novos completos, seguido dos próprios pósCI/APK. Gates físicos permanecem separados e OPEN.


## Disponibilidade: confirmação exige UUID real — 2026-10-11

Main revalidada `524cba983a49a4ea6ba10055f4be7fe0b2a58af8`; PR#464 aberta head`7f4b96cbc55c97fb7922219f96b749c8cb91345e`, CI38158579009/job114526542150 SUCCESS4web/716mobile/367API/3CLI/todossteps/zero falhas/HTTP real/ambas novas regressões; APK38158579008 ainda em execução, NÃO PASS. Diff/9paths/bytes/tree revisados. APK anterior38158313208 não autoriza head novo; manter histórico CI38158313160 falho por fixtures positivas nãoUUID.

Pendência independente reproduzida: submitAvailability aceitava id`a` ou espaço como saved com horários corretos; handler REAL de Disponibilidade apagava date/start/end e anunciava salva. Migration0026 comprova professional_availability_network.id UUID DEFAULT gen_random_uuid; AvailabilityController.add retorna ID/instantes reais, ONCONFLICT por professional/starts/ends mantém retry explícito idempotente. Referências relidas na main imutável; não inventar UUID em dados reais.

Correção limitada ao helper apps/mobile/lib/availability-submit.ts: UUID completo no ACK, incompatível mantém unknown, rascunho/aviso/uma chamada sem retry automático. Sessão/deadline/4xx-profile-required/5xx/dataequivalente/idempotência existente/layout/API/RLS intactos. apps/mobile/tests/availability-submit.test.mjs mantém9testes anteriores/assertions comfixturesUUID e acrescenta1regressão11IDs incompatíveis+uppercaseválido. availability-screen-deadline.test.mjs mantém11testes/assertions/deadline/retry explícito/ownerswitch e acrescenta1regressão do handler REAL com helper/parser deprodução confirmando rascunho/incerteza/busyfalse/sem anúncio de salva/sem nova requisição automática. RED20PASS/2FAIL22→GREEN22PASS; falhas reproduzem duas confirmações falsas, não falha do harness.

Branch fix/mobile-availability-ack-job-uuid parte do head#464 para preservar sua alteração e histórico documental; predecessor obrigatório antes de integrar esta nova tarefa. Gate próprio esperado4web/718mobile/367API/3CLI (1092), APK MOBILE próprio obrigatório; não emprestar APK455/464. Nove paths: helper+2testes+evidência+5docs existentes. Revisar bytes/diff/tree, reconsultar predecessor/main/head; após integrar464, retarget main sem perder mudanças e só integrar com CI/APK SUCCESS no próprio SHA exato. Confirmar pais/tree/main e ambos pósCI/APK; []/running≠PASS. Nenhum sucesso remoto deste novo head presumido.

DVT ORIGINALv1.104/histórico preservados em lugar, memória/checkpoint/ledger/registry/evidência no mesmo ciclo. React19.1.4/RN0.81.6/lockfile/standalone semMetro/layout/tenantRLS preservados; sem dinheiroreal/custos/serviços/deploypago/PSP/produçãoRailsRailway. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUSTproviders, PSPKYCsandbox/FIN-RISK/Webpago OPEN separados; emulador≠físico/ZIPdigest≠APKindividual. Não concluir projeto nem bloquear tarefas independentes por APK em execução.


## Perfil: recusar confirmação incompatível com UUID real — 2026-10-11

Main `524cba983a49a4ea6ba10055f4be7fe0b2a58af8`; predecessores464head7f4b96cbc55c97fb7922219f96b749c8cb91345e (CI38158579009 SUCCESS4/716/367/3, APK38158579008 ainda em execução) e465headfb8a3261d8940c6376a949aef203de99ae824b65 (CI38159094661/APK38159094659, reconsultar estados). Nenhum APK pendente equivale aPASS.

Fato reproduzido em helper e handler REAL Perfil: criação sem perfil existente aceitava idnew-profile com campos iguais e anunciava Dados salvos, desmarcando dirty/normalizando rascunho e atualizando/recarregando perfil apesar de IDincompatível. Migration0002 professional_profiles.id UUID DEFAULT gen_random_uuid; ProfessionalProfileController.upsert retorna UUID/fatos reais e ONCONFLICT(identity_id) mantém retry explícito upsert. Fontes relidas na main imutável.

Correção limitada aapps/mobile/lib/profile-submit.ts UUID completo no ACK; dados incompatíveis unknown, rascunho/dirty/aviso preservados, sem atualizar/recarregar snapshotnemretryautomático. expectedId em edição continua igualdadeEXATA, campos/nulls/trim/4xx/5xx/session/deadline/layout/SQL/API/RLS intactos. profile-submit.test.mjs9originais e profile-save-screen-deadline.test.mjs11originais preservados/assertions; positivos UUID e casos de IDdiferente usam outro UUID válido para continuar testar identidade, não apenas formato. Mais2regressões malformedtypes/IDs/criação e expectedIdmalformadocoincidente/uppercaseválido; handlerREAL comperfilinicialnull/provasrascunho/dirty/busyfalse/aviso/semGETextra/semrota/umaPUT. RED20PASS/2FAIL22→GREEN22PASS, sem harnessfakeproduction.

Branch fix/mobile-profile-ack-uuid parte head465 preservando predecessores/dados/documentos. Integrar464→465primeiro, retargetmain/revisardiff/gates/head/pais/tree semsobrescrever. PróprioCI esperado4web/720mobile/367API/3CLI(1094)/todossteps/HTTPreal/zerofalhas e APKstandalone MOBILE obrigatório no SHAexato; ambos pósCI/APK obrigatórios apósmerge. Sem emprestar APK455/464/465. Novepaths helper+2testes+evidência+5docs EXISTENTES DVT ORIGINALv1.104/histórico/memória/checkpoint/ledger/registry preservados.

Sem React/RN/lockfile/layout/workflows/backend/produçãoRailsRailway/custos/serviços/PSP/dinheiroreal/deploypago. Externos Androidfísico/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTproviders/PSPKYCsandbox/FINRISK/Webpago continuamOPEN separados. Emulador≠físico/ZIPdigest≠APKindividual; []/running≠PASS. Não declarar projeto completo nem bloquear outras tarefas seguras por gate pendente.


## Cadastro: confirmação com identidade/workspace UUID reais — 2026-10-11

Base GitHub main `e8a4d0764a3527bb525e797a00b0ca1251529dff`, tree `e72ae0b784a5c4670bf60a38889b02d70436ef49`. README, DVT ORIGINAL v1.104 completo/histórico, memória e checkpoint relidos em referência imutável; nenhuma substituição resumida. #455–466 já integradas, não repetir merges.

Falha reproduzida: signupAccount aceitava qualquer string não vazia em identity.id e, na empresa, tenantId. ACK oportuno com idnot-an-identity-uuid/email/accountType correspondentes fazia o handler REAL CriarConta apagar senha, navegar para entrar e liberar a barreira de cadastro não idempotente. AuthController.signup retorna identities.id/tenants.id reais: migrations0003_identity e0001_tenancy_foundation usam UUID DEFAULT gen_random_uuid; empresa mantém owner/workspace e profissional independente mantém tenantId/role ausentes.

Correção limitada ao predicado id de apps/mobile/lib/signup.ts: UUID completo case-insensitive no ACK identity e workspace. Resposta incompatível permanece unknown, sem afirmar rejeição ou inexistência no servidor. Handler existente preserva rascunho/aviso/uncertain e impede novo POST automático ou manual duplicado; recuperação continua entrar com as credenciais antes de cadastrar novamente. Não inventar tenant, sessão, cadastro ou persistência/idempotência no servidor. Email/password/workspace/accountType limites, owner, profissional independente, status401 email_in_use/4xx/5xx, auth/fetch/JSON/prazos/blur/refocus e não reenvio intactos. Nenhuma mudança no JSX, navegação canônica, API/SQL/RLS/política.

25 testes originais em signup.test.mjs(11), signup-screen.test.mjs(5), signup-screen-deadline.test.mjs(9) preservados com todas assertions. Fixtures positivas de identidade/workspace/JSON tardio atualizadas para UUIDs reais; negativas unrelated/roles/deadlines continuam negativas por suas próprias condições. Acrescentadas2 regressões: helper com11 tipos/formatos inválidos em identity de profissional/empresa e workspace empresarial, positivos UUID uppercase e umPOST; handler REAL com ACKmalformado mantém email/senha/accountType, busyfalse/uncertain/aviso/semrota e bloqueia segundoPOST. Mesmo conjunto no helper ORIGINAL RED25PASS/2FAIL27 (created falso e rota entrar indevida); predicado corrigido GREEN27PASS/0FAIL em2026-10-11. Fixtures não criam conta/workspace, não renderizam RN/nem executam SecureStore/não são evidência física.

Gates do novo candidato ainda a gerar: próprio CI esperado4web/722mobile/367API/3CLI(1096), zero falhas/todossteps/typecheck/build/export/frozenlock/HTTP real/ProductionTruth; próprio APKstandalone obrigatório no SHAexato cominstall/DEVICE_SMOKE_OKmetrofalse/artefato não expirado. CI/APK pós obrigatórios no SHA REAL apósmerge. Não emprestar APK de466 ou SHA anterior. Rever10paths/bytes/diff/árvore/lease/head/main; merge só gatesaplicáveis aprovados, confirmar pais/tree/main; resultados próprios/pós persistidos nos recibos finais quando existirem, nunca tratar[]/runningcomoPASS.

Estado pós predecessores às17:59UTC: post464CI38160409539/job114531932443 SUCCESS4/716/367/3; post465CI38160794937/job114533094891 SUCCESS4/718/367/3; post466CI38161066141/job114533894900 SUCCESS4/720/367/3, todos SHAmerge exatos e novos testes/HTTP primários. Post464APK38160409565 attempt1/job114531932515 BUILD SUCCESSFUL17:47:53.6781285Z; emulador demorou460900ms e falhou antes de instalar, input keyevent82/serviços settings/input Broken pipe32, adbexit224; nenhum install/DEVICE_SMOKE_OK, uploadAPK skipped. Logs/steps primários examinados; pedido bounded apenasfailedjobs aceito, novoattempt em acompanhamento, NÃO PASS. Logartefato11711046807/1723bytes sha256:613d8b33952af9394664c727250612d88750b5d944e90579c60ba35cbce40b2e, não APK. Post465APK38160794999/job114533095010 e post466APK38161066155/job114533894811 emexecução, NÃO PASS. Falha isolada de infra não impede esta correção segura; não contornar/reexecutar jobs ativos. Após todospostPASS, consolidar recibos finais próprios/pós455–novoPR nos5docs/evidência em PRsomentedocs com CI próprio/pós e APK N/A sópor paths/árvoremobile/lock/workflows inalterados comprovados; sem loop de commits metadados.

Preservados React19.1.4/RN0.81.6/lockfrozen/standalone semMetro/tenantRLS/desenho/histórico. Sem custo/serviçonovo/PSP/dinheiroreal/deploypago/produçãoRailsRailwaydireta. AndroidFÍSICO/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUSTproviders, PSPKYCsandbox/FIN-RISK/Webeventualpago seguem OPEN separados; emulador não físico. Projeto em andamento; nenhuma obrigação de digitar continuar nem alegação24h contínua. Próximaação: acompanhar gates próprios/anteriores, diagnóstico primário se falhar, integrar sóPASS e confirmar pós; depois consolidar recibos e auditar próximo ponto factual com contrato, sem inventar atividade. Preferências dependecontrato; roleId taxonomyTEXT não UUID.


## Infraestrutura Android independente — KVM sem integrar código pendente — 2026-10-11

Main relida682f0849b5861af0dc2b571c9024b1062743d8b1/tree6b5ef1978c0a7557c6d351e97361ea5a55977cd4. #468–472 permanecem PRs não integrados nesta fotografia; não alegar novo merge/gates pós inexistentes. #470stack headf25b8d50e94f16e52fd0c6c09207be46813a37e3 tem próprioCI38178173114SUCCESS4/727/367/3 eAPK38178173119/job114584886736attempt1SUCCESS, mas herdava código468/469 e não pode adiantar gates pendentes dessesPRs. Para eliminar dependência circular de infraestrutura, esta branch isola SOMENTE workflowKVM e docs na main atual, sem importar app/helpers/tests/API de PR pendente. Não usar o APK de470 como gate desta novaSHA: própriosCI4/722/367/3 eAPK obrigatórios; preservar snapshots/árvores/refs de predecessores. Sem force, reset, downgradeoualteração de runnerpago.

Falha real469ownAPK38177958961attempt1/job114584255869 no head5e29cacde3742b28e8c36a179b535dfa4294d075: buildSUCCESS, boot505514ms, serviço settings/inputBrokenpipe32/adbexit22422:09:45Z antesAPKinstall e antes executar customscript do app. Logsprimários guardados; nãofalha comprovada do app, nãoPASS. Failedjobs-only rerun solicitado1vez, aguardar attempt2/novo job, não rerunrunning. #468ownAPK38177844411aindaexecução. KVM ajuda o runnersemaceleração, não declarar únicoresponsável por todo erro/ANR/GPU.

Workflow isolado é bytea byte aqueletestado no470: regraudevKVM recomendadoREADMEoficial/GitHub2024-04-02, test-c/read/write/devKVM, KVM_READY, disable-linux-hw-accel:false. Não relaxar timeout/install/crashgates/upload/Metrofalse; falha seKVMindisponível. No own470 houve KVM_READY22:03:42.6506216Z, comandoemulatorsem-acceloff, boot32693ms22:04:43.2524223Z, install22:04:55.9188086Z/DEVICE_SMOKE_OK22:05:08.3364025Zmetrofalse. Apenas comparaçãoobservacional com post467boot471902ms; não prova causalestatísticaouequivalência físicadispositivo.

Artefato470ZIP11717017692size28911048 SHA256f9e0ed5973872b3388edc09ed59b5310fc3d5545781b880e81c1e013761153ab/expires2026-10-25T22:05:10Z downloaded/CRCvalid/digestmatchesAPI. APK66160320bytes SHA256f14a0fda9afa09f336e02212c2fc3e4c092206b0b1e25418667b5e7af6d62922matchesSHA256SUMS, APKCRCvalid, assets/index.android.bundle. BUILDINFOcommitd6bae6494eebff05ae04fdeb52d95eb5b5a36447 ésyntheticrefsPRmerge pais[5e29cacde3742b28e8c36a179b535dfa4294d075,f25b8d50e94f16e52fd0c6c09207be46813a37e3], tree5722ee7dc56fb323d0c4875e69641d777a34e79e igualcandidato confirmadoREST. NãoalegarBUILDINFOheadliteralouAPKprovandooutroSHA.

Após próprioCI/APKverdeexactHEAD desta infra, review9paths/bytes/todosapp/lock/build/smoke blobsinalterados, mergeindependente e comprovar orderedparents/tree/main e ambospostCI/APK actualSHA. A seguir reconciliar468/469 COMNOVAMAINvia mergesdeancestral sem perda e sem force; novosheads exigem própriosgatesCI/APKnovos. Fechar470 apenascomoSUPERSEDED após provar workflowblob idêntico e infraindependenteintegrada/gates, semalegar470merged. Reconciliar471/472 com predecessorreal/retargetmain emordem, preservando códigotestado e novosdocs, nãoemprestarAPK/outdatedheads ou repetirmerges.

Auditoria de continuidade: docs/evidencias/INTERNAL_EXHAUSTION_PROOF_2026-09-28.md e INTERNAL_COMPLETION_CHECKPOINT_2026-09-24.md são snapshots históricos1.15, não documento normativo atual1.104 nem autorização de parar. A inspeção atual encontrou falhasreais internas e PRs468–472; aviso adicionadoa essesoriginais preservando TODOcorpo/história/datas. PRvazia/TODOausente/aparelhoindisponível não prova todasáreasinternas completas. Uma dependência élocal; continuar auditoria fachadas/dados reais/auth/API/tenant/finance/notificações/matching/navegação/segurança documentadafontecanônica. Não declarar cobertura integralVisualTruthestática ou interna por smoke único.

DVT ORIGINAL integral/histórico+memória/checkpoint/ledger/registry+evidência no ciclo. Source/workflow gatejátestadono470, YAML/bashtargetedPASS e nenhuma semânticaapp nova. CI/APK próprios/pós destaPR PENDENTES neste commit, nãoPASS. FísicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTprovider/PSPKYCsandbox/FIN-RISK/Webpagodeploy continuam OPEN. PreserveReact19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone/desenho, no PSP/money/custo/produção/deploypago. Próximo concretamente: própriosinfraCI/APKnewSHA, merge pós, incorporarKVMmain nosheads de candidatos e retestar sem relaxargates, depois pagamentos/UUIDACKtestados e consolidarrecibos, continuarfrentesinternas.


## Correção do preparo KVM após falha primária de473 — 2026-10-11

Own473APK38179654427/job114589320217 no head21d7567b9bfa8df660765ad2382fec6d836b141e FAIL no stepEnableandverifyKVM22:24:36Z; APK buildSUCCESS9m12s, customdevice-smokeSKIPPED evalidatedartifactSKIPPED, portanto nãoPASS/existência de APKpublicável. Log imprime regra do sudo tee após test-c/dev/kvm, mas nãoKVM_READY; falha aconteceu entre reload/trigger/test-r/test-w, semlogporcomandoparaatribuircausa exata. Não declarar indisponibilidadehardware ou certeza de qual comando falhou; não é erro do app nemlogoappinstalado. Diagnóstico failureartifact11717640022 retido, semvalidadoAPK.

Correção de implementação do setup, mantendo MESMApermissão pretendida0666/no runner efêmero: depois de exigircharacterdeviceKVM jápresente, aplica sudochmoda+rw/dev/kvm diretamente e registra stat KVM_PERMISSIONS; exige read/write pelo próprio runner com mensagens explícitas KVM_NOT_READABLE/KVM_NOT_WRITABLE e exit1. Evita dependênciaderecarga/eventosudevasíncronos, semfallbacksoftwaresilent/skip/continueonerror. Não cria dispositivo fictício, não atua nocomputadorusuario/produção/RLS/segredos, não mudaUbuntu/runnermetered. Mantém disable-linux-hw-accel:false, KVM_READY sóapóschecks, appinstall/launch/nativecrash/Metrofalse/ZIPuploadsomenteapósSUCCESS.

OwnCI473anterior38179654397/job114589320021SUCCESS4/722/367/3 pertenceapenas21d. Headcorretivo exige NEWCI4/722/367/3 eNEWAPK acelerado/install/DEVICE_SMOKE_OKmetrofalse/artifactSHAexato/nãoexpirado. YAMLparse/bash -n jábaseworkflowprovados, novo bloco seráchecadosintaxe; não executar rootdevKVM local nemalegarvirtualização daí. Validarprecisamente comandos/primáriosantesownmerge eposrealambos. Nenhum rerunsemcodefix do473failed; não apagarhistoricalFAILnememprestar470artefato. Depois incorporar novohead473nasbranches468/469/471/472/474por ancestry mergessemforce/missingdocs, própriosgates novos SHAexato; N/AAPI sódiffnãoAPK exato contraantecessornovo, retargetbranches para refletir dependencia real. Main ainda682... nesta fotografia, nãoalegarnovomerge.

DVT ORIGINAL/histórico/memória/checkpoint/ledger/registry/evidência preservados, no mesmo commit. Semcusto/PSP/dinheiroreal/serviços/produção/deploypago; físicos/pentest/provider/FINRISK/Webpaid separadosOPEN. Correção épermissionamento pretendido doCI, não relaxamento do smoke oubypassgate. Próximo: gate473novo eextrasgatesbranchesnovaancestria, integraçãogatesown/post, consolidaçãoevidências e auditoria independente segura.


## Notas historicas da branch #468 preservadas integralmente



### Candidatos — vínculo de sessão e empresa antes da confirmação (11/10/2026)

A confirmação de profissional na tela de interessados deve revalidar `authenticatedTenantHeaders` imediatamente antes de cada transporte de `confirmCandidate`; se geração, sinal de cancelamento ou contexto de empresa/sessão mudar, a requisição não será enviada. Preserva os headers de origem e não converte resultado incerto em sucesso. Foi adicionado teste de regressão em `apps/mobile/tests/candidate-confirm-session-guard.test.mjs`. CI e APK do SHA final permanecem obrigatórios antes de merge; não equivale a E2E em Android físico.


## PR #468 — confirmação de candidato: regressão comportamental e recibo vigente — 2026-10-11

Base main `682f0849b5861af0dc2b571c9024b1062743d8b1` (merge467), tree`6b5ef1978c0a7557c6d351e97361ea5a55977cd4`, pais[`e8a4d0764a3527bb525e797a00b0ca1251529dff`,`b6b66b7925855fac67dfdc65782c13a97209697a`]. README/DVT ORIGINALv1.104/memória/checkpoint/PRs/issues/GitHub/código reconsultados. Pós467CI38165293516/job114546488872 SUCCESS4/722/367/3/todossteps/HTTP real; pós467APK38165293489/job114546488627 SUCCESS install19:10:51.3358475Z/DEVICE_SMOKE_OK19:11:44.4987192Zmetrofalse, ZIP11712008074/28911009bytes digestsha256:383b50b43b5f862ab70b6e0e9d6a2fad92c7d776c34cef8860d5c3a900db7015/expires2026-10-25T19:11:54Z/expiredfalse. Não repetir merge467 nem confundir emuladorcomfísico/ZIPdigestcomAPKindividual.

A mudança existente468 relê authenticatedTenantHeaders no callback de transporte REAL confirmCandidate e recusa generation/signal/empresa/Authorization diferentes antes de fetch. Revisão encontrou que teste novo anterior apenas assert.match do texto não executava race; substituído integralmente por3 regressões comportamentais de handlers reais pré-JSX com parsers/runForSession/confirmCandidate deprodução. Fixtures sóhooks/auth/transporte/timer, sem RN render/SecureStore/writeexterno. Doiscenáriosfalham com código ORIGINAL da main: troca realtenant ou sessão entre snapshot retornado e dispatch; deadline ou cleanupREALblur durante authde transporte pendente. Antes ocorreumPOST indevido, depois0POST e nenhuma confirmação fictícia. Terceirocaso conserva sucesso autorizado: umPOST/bodyprofessional/headersorigem, ACK compatível, refresh com statusconfirmed e nenhumPOST ao clicarprofissionaljáconfirmed. 29testes originais (21readdeadline+8companycandidates) e assertions intactos. Mesmo conjunto RED30PASS/2FAIL32→GREEN32PASS/0FAIL com código468; não alterado JSX/estilos/API/SQL/RLS/ACK/deadline/retry ou política.

Head anterior468a1643edfeb2981e27ef50d53792a49a547308a8a passouCI38165495573/job1145470880064/723/367/3 e APK38165495577/job114547087977 install19:13:35.4814563Z/DEVICE_SMOKE_OK19:14:31.7519825Zmetrofalse/ZIP11712202993sha256:ac6123d19e535fcbb9821ea9850d5d2660039a6d1a7ad315ab0e16d4e563d883. Esses gates são históricos desseSHA, NÃO autorizam novohead. Novo próprioCI esperado4web/725mobile/367API/3CLI (1099), títulos dos3testes reais/todossteps/HTTP/frozenlock, APKstandalone próprio novoSHA obrigatório. Não presumirSUCCESS/emprestarAPK/usar[]ourunningcomoPASS. Após revisão diff/bytes/tree/lease e gates própriosgreen, ready/merge umaúnicavez, verificar pais/tree/main e CI/APK pós SHArealo. #469 precisa integrar novo468 como ancestral e preservar ambasmudanças/docshistóricos, retargetmain apósmerge468 e própriosgates noSHAresultante.

O DVT ORIGINAL inteiro preservado em lugar; adendo+memória/checkpoint/ledger/registry+evidência no mesmo ciclo. React19.1.4/RN0.81.6/lockfrozen/tenantRLS/standalone semMetro/desenho preservados. Sem custo/serviço/PSP/dinheiro/deploypago/produçãoRailsRailway. FísicoAndroid/E2E/VisualTruth/SecureStore/piloto, pentestindependente, TRUSTproviders, PSPKYCsandbox/FIN-RISK e WEB-ARCHprovisionamentoeventualpago permanecem OPEN separados. #224 interno existente não exige provisionar. Próximo: completar468/469 e consolidar recibos completos464–469; auditar áreas internas da referência canônica e corrigir sófalhascomprovadas com regressões, sem declarar conclusão pornenhumPR ou inventaratividade. Não encerrar rotina por bloqueioisolado/fimrodada, nem pedir continuar.


## Reconciliacao de #468 com candidato de infraestrutura independente #473 — 2026-10-11

Merge de ancestrais preserva pais[5888455ace44c6eb8b26201fe4a3a88ca54ab441,21d7567b9bfa8df660765ad2382fec6d836b141e], semforce/sobrescrita de app. Codigo468 e seus3testesreais/evidencia mantidos bytea byte; importa SOMENTE workflowKVM+notices/documentos473 da fonte main. DVT/memoria/ledger/registry começam com TODOoriginal473 e acrescentam notas anteriores468 integralmente. Checkpointconserva cabecalho/corpooriginalcomnotas historicasrealocadas/integrais.

Own468 anterior588 CI38177844414 SUCCESS4/725/367/3; APK38177844411/job114583912063SUCCESS install22:10:25.8247404Z/DEVICE_SMOKE_OK22:11:38.0601986Zmetrofalse/ZIP11716433370size28911013digestsha256:f4ba99b16054b7a2ea5df733b7951ac13682caac422007891df5b9351b3361c5expires2026-10-25T22:11:49Z. Historico valido SOMENTE588, nao autoriza novoSHA. PropriosCI4/725/367/3 eAPK novos obrigatorios no headresultante, KVM_READY/install/smoke/artifact exatos.

Infra473 deveintegrarprimeiro com propriosCI/APKgreen eposreal; entao main equivale a fonte473, diff468volta8paths e tree deveequivaler ao candidato. Nenhum merge468real nestecommit. #469readguard/#471finance/#472UUIDACK ficambranchesposteriores; progressosegueautonomo semloanAPK, semrerunrunning, semcusto/PSP/producaofisicofalso. ConfirmarHEAD/main/mergeable/bytes/diff/pais/tree/gates frescos antesmerge, verificarpostCI/APKactual e consolidarrecibos.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #468 — 2026-10-11

Pais ordenados[fd13d5b70faf4093a2824f904723b6fedc42ab82,c33b2823950c990ceda9815dffe9c42b74b8366a], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo473, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/725/367/3 novo eownAPK novo KVM_READY/install/DEVICE_SMOKE_OKmetrofalse/artifactexato obrigatório. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCIeAPK. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Notas historicas da branch #469 preservadas integralmente



### Candidatos: leitura expirada não sobrescreve estado posterior (11/10/2026)

Em `selectJob`, uma leitura cancelada pelo deadline, por troca de seleção ou por blur não deve publicar erro genérico depois do cancelamento; o handler de `catch` passa a verificar também `!controller.signal.aborted`, preservando o estado mais recente. Regressão em `apps/mobile/tests/candidates-expired-read.test.mjs`. Não altera confirmação financeira nem prova E2E físico; validar CI e APK no SHA final.


## PR #469 — leitura cancelada: isolamento comportamental com ancestral468 — 2026-10-11

Main observada682f0849b5861af0dc2b571c9024b1062743d8b1. #468 novohead5888455ace44c6eb8b26201fe4a3a88ca54ab441/tree d920442a816aa7679a482bccb45c999c6cafc49e é predecessor necessário e ainda exige CI/APK próprios novos. #469 foi reconciliada com MERGE DE ANCESTRAL468, parent85afb28bb4db8babcda45d5b42d5a125584f6141 e additionalparent5888455ace44c6eb8b26201fe4a3a88ca54ab441, sem force/reset/rebase destrutivo. Resolver manualmente source/DVT preservando literalmente as duas mudanças, notas históricas e todos arquivos de468; comparar delta469 somente contra árvore468, e integração apenasdepois468na main.

selectJob já mostrava erro no timer15s, mas o catch da autenticação rejeitada depois de abortar escrevia novo objeto de erro após deadline. Novo guard!controller.signal.aborted conserva último estado/deadline e evita commit tardio; erros atuais não cancelados continuam retryable. Teste anterior469 apenas assert.match código foi substituído por2 cenários de handlerREAL pré-JSX com hooks/auth/timers explícitos e parsers reais. Verifica contagem de commits no setData e identidade do snapshot após timeout/rejeiçãoauth, zeroPOST; outro caso verifica loading→erro real atual/umcommit e nenhuma confirmação/POST. Reaproveita estrutura dos testes readdeadline, não replica implementação nem afirma RN render/SecureStore/físico. Mantidos os29originais (21read+8helpers), os3novos testes reais468 e todas assertions. Com código468 e catchORIGINAL RED33PASS/1FAIL34 (commitsextras4emvez3); comduas mudanças GREEN34PASS/0FAIL. Deadline/geração/seleção/blur/retry/matching/ranking/headers/canonicalJSX/SQL/API/RLS íntegros.

Head anterior46985afb28bb4db8babcda45d5b42d5a125584f6141 passou ownCI38166077594/job1145488108674/723/367/3 e ownAPK38166077651/job114548810629 install19:21:29.5354420Z/DEVICE_SMOKE_OK19:22:18.1357217Zmetrofalse/ZIP11712399046sha256:4d46079f0b2618adb6742b5a049105bd35cd7bfa7a395ac938ff074a1c385198. Essesgates históricos NÃO autorizamnovoheadreconciliado. Novo esperadoCI4web/727mobile/367API/3CLI(1101)/zero failures/todossteps/HTTP real/ProductionTruth e todos5tituloscomportamentais. APKstandalone próprio novoSHAobrigatório, install/DEVICE_SMOKE_OKsemMetro/artefatoprório nãoexpirado; nuncaemprestar468/old469. Esperar gatesgreen/reverbytes/diff/lease/head/main/mergeable/tree, integrar sóapós468 e verificar pais/tree/main/CIAPKinclusivepós SHArealo. Se conflitoapós468merge, reconsultar GitHubestadoeventual e reconciliar preservandoambos; nunca sobrescreverpredecessor.

DVT ORIGINALv1.104/histórico/memória/checkpoint/ledger/registry/evidência no mesmo ciclo porappend e checkpointnovo topo, sem substitutos. React19.1.4/RN0.81.6/lockfrozen/tenantRLS/standalone semMetro/canônico intactos. Sem custos/serviços/dinheiroreal/PSP/deploypago/produçãoRailsRailwaydireta. GatesfísicosAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/providers/TRUST/PSPKYCsandbox/FIN-RISK/Webprovisionamentoeventualpago separados OPEN; #224 internojáexistente não contratar. Próximo completar gates468→469 +ambospós, consolidar recibos464–469docssomentedocs CIpróprio/pós+APKN/Asópathsárvorelockworkflows idênticos provados; enquantoexecutam auditar frentesinternas e implementarfalhascomprovadas. Rotinaativa atéconclusãoINTEGRALcomprovada/ordemexpressa; fimrodada ou gateisolado nãoencerra projeto, sem pedircontinuar/nem24hcontínuo.


## Reconciliacao de #469 com #468/KVM independentes — 2026-10-11

Pais ordenados[5e29cacde3742b28e8c36a179b535dfa4294d075,fd13d5b70faf4093a2824f904723b6fedc42ab82], semforce/reset. Arvore parte de #468novo com473workflow/devKVM e conserva bytea byte o app combinado de confirmaçao/catch469 e2regressoesreais, mais3regressoes468. DVT ORIGINAL/memoria/checkpoint/ledger/registry conservam TODOdocumento do ancestralnovo e notas469 integrais.

Head469anterior5e29: CI38177958982SUCCESS4/727/367/3; APK38177958961attempt1FAILservicesettings/inputBrokenpipe32 antesinstall, buildSUCCESS. 1failedjobs-only retry doheadantigo emexecuçaoattempt2, nao rerunrunning/não declararPASS/nãoemprestar470APK. Gate novohead469 obrigatórioCI4/727/367/3 epróprioAPK KVM_READY/install/DEVICE_SMOKE_OKmetrofalse/artifactmesmoSHA. Rerun antigo serve sóhistorico5e29, nao autoriza novohead.

Integraçãoinfra473primeiro, depois468, retarget469main jáapontada/reconsultar eventual/diff8paths/bytes/gates/mergebase/equivalencia semperder predecessors. PosCI eAPK devemser conferidos nos SHA reais após cada merge, naoinventarruns[]/running. APIfinance471 eUUIDACK472seguembranches posteriores, trabalhoindependente semcusto/PSP/produção/físicofalso, documentarrecibos e continuar todasfrentesinternas.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #469 — 2026-10-11

Pais ordenados[9f8af7e78ce748bded2bc1a3c0ab55ff41d48506,2242ee79e4102c2ed22eaed072bae805060dbd07], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo468, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/727/367/3 novo eownAPK novo KVM_READY/install/DEVICE_SMOKE_OKmetrofalse/artifactexato obrigatório. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCIeAPK. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Notas historicas de #470/#471 preservadas integralmente



## APK em emulador — KVM no runner existente, sem reduzir gates — 2026-10-11

Falha de infraestrutura investigada em logs primários: post467APK38165293489/job114546488627 no SHA682f0849b5861af0dc2b571c9024b1062743d8b1 usou emulator -accel off, ProbeKVM sem permissão /dev/kvm e boot471902ms (19:06:17.0743300Z), embora install19:10:51.3358475Z e DEVICE_SMOKE_OK19:11:44.4987192Z tenham passado. Post464attempt1 antes falhou serviçosinput/settings Brokenpipe32 antes de instalar; retrybounds resolveu. Não afirmar queKVM é única causa dos erros gráficos/ANR, nem apagar falhas históricas ou declarar softwarefalhou. O workflowUbuntu não tinha configuração das permissões KVM; fonte/código relidos na main e ancestral.

Correção independente em .github/workflows/standalone-pilot-apk.yml: antes do smoke, comprova /dev/kvm characterdevice, aplica regra udevdepermissão KVM recomendada aos runnersGitHub Ubuntu, reload/trigger, exige acesso de leitura/escrita pelo runner e registra KVM_READYdevice=/dev/kvm. Em actionexisting android-emulator-runner, disable-linux-hw-accel:false exige aceleração disponível, sem fallbacksilenciosoemsoftware. Se dispositivo/permissão nãoexistir ou inicialização falhar, o job/artefato continuam BLOQUEADOS, não mascaradosSUCCESS.

Fontes primárias verificadas em2026-10-11: [GitHub — hardware accelerated Android virtualization, publicado2024-04-02](https://github.blog/changelog/2024-04-02-github-actions-hardware-accelerated-android-virtualization-now-available/); [README oficial ReactiveCircus](https://github.com/ReactiveCircus/android-emulator-runner/blob/main/README.md); [main.ts oficial — accessSync R_OK|W_OK antes de escolher KVM](https://github.com/ReactiveCircus/android-emulator-runner/blob/main/src/main.ts). A alteração sóocorre no runner efêmeroCI existente, não computadorusuário/produção. Não muda para runnerpago nem cria serviços.

YAML parse e bash -n do bloco PASS local; não executado sudo/devKVM no ambiente local, não alegar prova de virtualização daí. Prova obrigatória em próprioAPK SHAfinal: novo stepSUCCESS/KVM_READY, configuração disableLinuxHardwareAccelerationfalse, emulator sem -acceloff, install/DEVICE_SMOKE_OKmetrofalse, artefatomesmoSHA/nãoexpirado, logs primários. Não antecipar melhoraquantitativa do boot ou estabilidade antes dessas medições. CI próprio4/727/367/3(1101) e APK obrigatório por pathworkflow; ambos pós SHArealo apósintegração. RegressõesCLI/smokescript/assertionsgatesnativos existentes preservadas bytea byte, sem novo teste textualespelho de YAML.

Preserva ubuntu-latest existente/AndroidAPI35/x86_64/pixel_6/GPU/animations/Java17/Node22/pnpm10.15.1/frozenlock/React19.1.4/RN0.81.6/standalone semMetro/crashgate/diagnosticsfailure/retention14/upload somenteapóssmoke. Aplicações/API/SQL/RLS/segredos/pagamentos/produção/layout inalterados. DVT ORIGINAL/histórico inteiro+memória/checkpoint/ledger/registry/evidência no mesmo ciclo.

Branch parte do head4695e29cacde3742b28e8c36a179b535dfa4294d075/tree1f2362a0c74224cf1d3ccc7471712ee188802ff5, para não perder3regressõesreais468 e2reais469/amboscódigo/docs. Integrar468→469primeiro com própriosgatesnovos; retarget destaPRmain depois e reverdiff7paths/bytes/tree/head/main/mergeable. PrópriosCI/APKnovoSHAobrigatórios; nãoemprestarAPKanterior nemrepetirmerges. Pós próprios de cadaSHAreal devemser confirmados e recibosfinais consolidados emdocsevidência porPRsomentedocs depois, semloopautorrefentemetadados. Capturasrunning/[]nãoPASS.

FísicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/Trustproviders/PSPKYCsandbox/FIN-RISK/Webprovisionamentoeventualpago continuam separados OPEN. Emulador não físico; ZIPdigest não APKindividual. Sem custo/contratação/PSP/dinheiroreal/deploypago/produçãoRailsRailway. Próximo: validar CI/emulador real novoSHA e medir boot, integrarnaordem e verificar pós; continuar auditando todasfrentesinternas da fontecanônica e corrigindo lacunascomprovadas, seminventaratividade/declararconclusão porPRvazia ougateisolado/encerrarrotina.


## Pagamentos simulados — recibo e conflito após INSERT concorrente — 2026-10-11

Auditoria factual da API em main682f0849b5861af0dc2b571c9024b1062743d8b1: PaymentWebhookController fazia SELECT prévio e INSERT ON CONFLICT(tenant_id,idempotency_key) DO NOTHING RETURNING; se outro callback ganhasse entre ambos, rows[0] podia ser undefined. O perdedor também não conferia samePaymentEvent contra o vencedor. Sem ACK factual e sem conflito explícito para payload divergente. Reproduzido em execução do controller/adapter HMAC reais, com respostas SQL controladas: 7 regressões, RED3PASS4FAIL→GREEN7PASS. Local usa transformação TypeScript de Node com decorators removidos e exceções de fixture; não é prova de Nest/HTTP/Postgres nem PSP.

Correção restrita à confirmação/idempotência: conserva SELECT/INSERT existentes e todos parâmetros escopados, retorna ACK do insert vencedor; caso rows vazio, reconsulta mesma chave dentro db.tenant atual e exige equivalência exata provider/assignment/eventtype/amount/reference/recipient. Retorna o recibo persistido ou 400idempotency_conflict; falta de replay e erros SQL continuam erros, sem ACK inventado, UPDATE financeiro, sobrescrita, retry automático, mudança de ledger/reconciliação ou dinheiro real. Nova leitura de statement no READ COMMITTED conserva isolamento RLS e assinatura/timestamp/destinatário. [PostgreSQL17 — Transaction Isolation](https://www.postgresql.org/docs/17/transaction-iso.html) fundamenta que DO NOTHING pode perder contra linha não visível ao snapshot inicial; próximaSELECT vê commit.

Testes originais de assinatura/segurança e HTTP de finance-reconciliation preservados. Novo TSunitário chama controller real com HMAC real: insert novo, replay pré-existente exato/mismatch, perdedor concorrente igual/mismatch nas6 dimensões, vencedor desaparecido, erro SQL e validação/assignment/recipient antes da escrita. Sem source-regex/cópia da decisão. Nova prova HTTP/Postgres real usa barreira SHARE TABLE na base efêmera mlivretrabalho_http e espera duas requests realmente bloqueadas no RowExclusiveLock de INSERT, liberando só depois; duas assinaturas iguais exigem 201 com mesmo UUID/recibo+1row, divergentes exigem 1×201 e1×400conflict+1row, replaysequencial/mismatch continuam testados. Apenas fixture CI=true/1, hostDBlocalhost/127.0.0.1, baseCI conhecida, hostHTTP local; não pode apontar serviço público ou outra base. Clients/timers limitados e rollback/finally; eventos authorized simulados não alteram payout/recebimento. Cenário executado pelo script financeiro EXISTENTE após afirmações originais e antes de checar tenantB. Sintaxe Node/bash PASS; HTTP real é gate CI pendente, não declarar aprovado antes dos marcadores.

Base da branch é head470f25b8d50e94f16e52fd0c6c09207be46813a37e3/tree5722ee7dc56fb323d0c4875e69641d777a34e79e. Ordem468→469→470→estaPR, retargetmain depois470 e revisar10paths/bytes/ancestralidade. CI próprio esperado4/727/374/3(1108), todos testes/HTTP/novos marcadores PASS no SHAexato antesmerge, pósCI real obrigatório. APK N/A somente após comprovar árvore mobile/lockfiles/rootworkspace/workflows/build/smoke bytea byte idênticos ao predecessor470 já aprovado, e paths10restritosAPI/scriptsfinance/docs; não emprestarAPK de SHA distinto como se fosse destaAPI. Se workflowAPK gerar run, verificar próprio em vezdeafirmar inexistência. Não relaxarRLS/tenant/auth/HMAC/PSP/externalbindings/moneyrisk, não tocarprodução nem custos.

DVT ORIGINAL integral/histórico+memória/checkpoint/ledger/registry+evidência no mesmo ciclo. FísicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTproviders/PSPKYCsandbox/FIN-RISK/Webpagodeploy continuam OPEN separados. Não declarar todasfrentesinternas completas por cobertura desta falha. Próximaação: próprioCI exactSHA com testeNest e duas barreirasHTTPPG, revisar/retarget/integrar após predecessores, verificarpós, consolidarrecibos reais e continuar auditoria independente de todasáreas canônicas.


## Reconciliacao de #471 com predecessores novos e KVM473 — 2026-10-11

Pais ordenados[44bb92dcaaaf9e15aa9f5804637bcf2a34ac06ef,9f8af7e78ce748bded2bc1a3c0ab55ff41d48506], semforce/reset/perda. Conserva bytea byte4pathsAPI/finance e7regressoescontrollerHMAC/duasbarreirasHTTPPostgres. CIanterior38178800341/job114586754292SUCCESS4/727/374/3 ePASSbarreiras22:05:21Z pertencemSOMENTE44bb, naoautoriza novoSHA. OwnCI novo obrigatório4/727/374/3 +7títulos/ambosHTTPbarreira, depoispostCIactualreal.

Fonte tree é469novo com473workflowKVM/apps dospredecessores, importsAPIfinance+dosevidências471 e470historica. 470nãointegradacomoapp, note/evidência preserved apenasfotografia de sourceKVMtestadooldf25/syntheticd6bae, seráSUPERSEDED por infra473 apósgates. Nãoalegar470merged ou emprestarbinary. DVToriginal5docs mantem integrodoc doantecessornovo+notasoriginais470/471; semresumoouapagardatas/falhas.

Ordem473→468→469→471; retarget471main sóapós469einfra473integrados, revisar11paths(API4+5docs+2evidencias), verificar todosmobile/rootlock/workspace/workflows/build/smoke blobSHAs/modes idênticos469. APK N/A por escopoapenasAPI/finance/docs somenteapósown+postAPKinfra epredecessorconfirmados; se run existirchecarpróprioSHA. Não usarEMPTY/runningcomoPASS. Preservar RLS/HMAC/auth/recipient/replay/moneyrisk/layout/ReactRN/frozenlock. Sem PSP/dinheiroreal/custos/deploypaid/produção; físicos/provider/pentestcontinuamOPEN. Atualizarrecibos reais apósmerges, continuartodasfrentesinternas.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #471 — 2026-10-11

Pais ordenados[7e4817f20ba6df547dc7dcd3490d44e463b621a4,5a418f3e938f416d71642a6a9b884ec8167ce809], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo469, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/727/374/3 novo eAPK N/A SÓcomparaçãoexata de mobile/rootlock/workflows/build/smoke contraantecessorjáown/postgatesprovados, senãoverificarprópriorun. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCI/APKscopeN/Aprovada. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Notas historicas de #472 preservadas integralmente



## Candidatos — ACK de alocação UUID antes de confirmar na tela — 2026-10-11

Auditoria factual depois do candidate transport/catch guards: confirmCandidate aceitava qualquer string id não vazia no ACK. Com mesmas jobId/professionalId/tenantId/status='confirmed', id='assignment-a' fazia handler REAL Candidatos exibir 'Profissional confirmado.' mesmo após GET de interessados ainda interessado. Migração canônica0006_work_assignments define idUUID PK DEFAULTgen_random_uuid; CompanyJobsController devolve esse id de work_assignments. Não aplicar UUID a roleIdTEXT/governança nem criar requisito novo para IDs de listas.

Duas novas regressões pré-JSX/confirmCandidate e parsers reais, fixtures explícitas hooks/auth/fetch/timers: RED35PASS1FAIL/36 sobre helper anterior→GREEN36 com correção. 34 testes anteriores preservados integralmente em assertions/resultados/falhas/rotas/headers; somente ACK positivo antigo id='a'/'assignment-a' atualizado para UUID realístico, sem enfraquecer testes. Fixture configureACK não se confunde com opçõesHTTP. Novo caso inválido inclui stringfictícia/malformed/whitespace/nonstring, mantém mensagem de resultado desconhecido e interessados reais, sem falseconfirm; controle UUIDlower/upper exibe confirmação factual e mantém validação exata job/profissional/tenant/status, refresh e únicoPOST. Testes não fazem write público nem renderReactNative/físico.

Correção mínima em lib/company-candidates.ts: uuid guard no d.id do ACK, sem trim/normalização do recibo, mantém correspondência exata demais campos e HTTPok/statusconfirmed. Candidatoscontinua consultando interessados para conferir resultado e não repete escrita automaticamente. Autenticação/sessão/seleção/deadline/blur/tenant/tentativaexplícita e ordenação/recomendações/fallbackoriginais preservados, API/SQL/ledger/RLS/matching/layout/mobileversions/lock sem mudança.

Base desta branch é head47144bb92dcaaaf9e15aa9f5804637bcf2a34ac06ef/tree30ecdf1bb7b70f595ec541b0830b080aea2df921; preserva predecessores468/469/470/471. #471CI38178800341/job114586754292SUCCESS4/727/374/3 e ambasbarreirasHTTPPostgres reais, mas não integrado. #470CI38178173114 e próprioAPK38178173119SUCCESS/KVM_READY/boot32693ms/install/DEVICE_SMOKE_OKmetrofalse/ZIP11717017692SHAf25...; não emprestar470APK a outroPR. #469ownAPK38177958961attempt1FAIL antesAPKinstall: boot505514ms, servicesettings/inputBrokenpipe32/adbexit224 em22:09:45Z; buildSUCCESS, não evidência de falha no app. Failedjobs-only rerun solicitado UMAvezmesmohead5e29...; aguardar attempt2/novo job, não rerunrunning. #468ownAPK38177844411 ainda execução; nenhum merge antecipado. Corrigirinfra independentese retryconfirmarfalhanova, sem emprestarAPK ou relaxarsmoke.

PrópriosCI eAPK obrigatórios por pathmobile destaPRnovoSHA, CI esperado4/729/374/3(1110) +testestítulosreais +HTTPpréexistente/novasbarreirasfinanceiras. Ordem468→469→470→471→estaPR; retargetmain sóapósantecessor, reconsultar mergeableeventual, diff9paths/helper+2testsfiles+5docsexistentes+evidência/bytes/tree/heads/main antesmerge. Confirmar próprios/pósCI eAPK no SHAreal. Não marcarSUCCESS running/[] nemconfundirapkCRC/ZIPdigest/físico. Nãoinventar testesespelhosource ou commits sóatividade.

Histórico completo DVT ORIGINAL1.104/memória/checkpoint/ledger/registry preservado emlugar+evidência no mesmociclo. Próximo: própriosgates headnovo, acompanharinfra469 limitado, mergeordem e pós, consolidarrecibosfinais464–atual; continuar todasáreas internas com lacunasprovadas. Gates físicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTprovider/PSPKYCsandbox/FIN-RISK/Webpago continuam separadosOPEN. Semcustos/PSPreal/contratação/produção/deploypago; não encerrarrotina por bloqueioparcial/fimrodada.


## Reconciliacao de #472 com pagamentos/candidatos/KVM atuais — 2026-10-11

Mergeancestral pais[5a717c8630b30ed371097b6cc477007def337d65,7e4817f20ba6df547dc7dcd3490d44e463b621a4], semforce/perdadepredecessor. HelperUUID/2regressoeshandler e8testesoriginaispositivosfixtureUUID preservados bytea byte; 36alvostestadosRED35PASS1FAIL→GREEN36, mesmosall34assertionsanteriores. App/finance/HMAC/API do ancestralnovo preservados. 5docsoriginaisinteiros recebem apenasnotashistoricas472 eesta reconciliação.

OwnCI/APK dohead5a717, se terminarem, pertencem apenasSHAantiga. NovoheadexigepróprioCI4/729/374/3 epróprioAPKhardwareKVM/install/DEVICE_SMOKE_OKmetrofalse/artifactnãoexpirado; verificar passos/logs/testesHTTP/UUID noSHAexato. Ordeminfra473→468→469→471→472, retargetmain depois471, diff9paths/códigomesmobytetree/headerlock, merge sóown gatesgreenfrescos; verificarposCI/APK SHAreal. NãoemprestarAPK/[]/running, nãoinventarworkflowouconclusãointernatotal. APKemulador≠físico; físico/E2E/VisualTruth/SecureStore/piloto/pentest/provider/PSPFINRISK/Webpago OPENseparados. Semcusto/dinheiroreal/PSP/produção/deploypaid. Prosseguir auditoria segura e consolidarreciboscanônicos apósmerges, semloopmetadadosautorrefente.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #472 — 2026-10-11

Pais ordenados[a3c9b3adc4efa5f2a65fcdc6a019aa1f9a315b8e,a031a835161dba89389552d9b4885704db996a09], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo471, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/729/374/3 novo eownAPK novo KVM_READY/install/DEVICE_SMOKE_OKmetrofalse/artifactexato obrigatório. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCIeAPK. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Pagamentos simulados — JSON null assinado não causa TypeError/HTTP500 — 2026-10-11

Falha factual no SignedJsonPaymentProviderAdapter: depois da assinaturaHMAC/timestamp válidos, JSON.parse('null') era castRecord e payload.tenantId lançava TypeError('Cannot read properties of null'). Controller propagava erro não classificado, em vez de BadRequestpayment_event_invalid. Nullassinado é entrada inválida, não pedido financeiro válido; verificaçãoassinatura não é validação deestruturaJSON. Reproduzido noadapter econtroller reais: 14regressões, RED12PASS2FAIL→GREEN14PASS, mantendo5adaptertests+7replaycontrolleroriginais/assertions. LocaltransformTS/fixtureexceção não provaNestHTTP; CI exato deve comprovar.

Correção mínima: após JSONparse e APÓS validação timestamp/assinatura, anteslercampos, exige payloadnãoNULL/object/nãoarray e lança PaymentWebhookVerificationErrorpayment_event_invalid. Controllerexistente traduz erro em400; inválidaassinatura/antiga continua403 precedência intacta. Nada consulta db.tenant ouescreve quandoJSONnull; nenhumACK/UPDATE/retry automático/novoPSP/ledger/moneyrule/RLSconfusão.

Doistestesnovos comportamentais: adapterHMACreal rejeitaNULL/primitive/array/objeto vazio com erro tipado e controllerassinadoNULL exigeeventinvalid antes de tenant/query. Todoscontrolespositivo/sandboxpayoutrecipient/tampering/stale/valornegativo/replayconcorrente exato/conflict sixfacts/dberrors ficam intactos. FixtureHTTPfinanceiro existente acrescenta signedcallbacknull, exige400messagepayment_event_invalid ePASSmarker antes ambasbarreirasPostgres reais; hostDBCI/local/mlivretrabalho_http eURLlocal guardados, noPSP/serviçopúblico/produtoexterno. Sintaxe local Node/bash preservada; HTTPnull égateCIpendente nestecommit, nãoalegarPASSantesprimários.

Branch parte do novohead472a3c9b3adc4efa5f2a65fcdc6a019aa1f9a315b8e/tree7262c1fdb30680ad773f3fe9ed80483e508d932b, preserva infra473/468transport/469catch/471replay/472UUIDACK e TODOhistórico5docsOriginais emlugar+evidência. Diff10paths: adapter+seuteste+controllerteste+HTTPhelper+5coreDocs+evidência, semmobile/rootlock/workspace/workflows/build/smoke changes. OwnCI expected4/729/376/3=1112+testtitles+signedNULLHTTP400+ambasbarreirasfinanceiras. APK N/A somenteprovaárvoremobile/rootlock/workflow/smoke idêntica472apóspróprio/posAPKexactpredecessor aprovado; []nãoéPASS. Retargetmain sódepois472; mergeownCIexactGREEN/reviewbytes/tree/heads/main, pósCIactual obrigatório. Ordem473→468→469→471→472→estaPR; snapshot473/468/469/471/472gates próprios novos aindaem acompanhamento, nãoemprestarAPKsoutdated.

PreserveReact19.1.4/RN0.81.6/frozenlock/tenantRLS/auth/HMAC/standalone/desenho; semdinheiroreal/PSP/custo/serviços/segredos/deploypago/produçãoRailsRailway. FísicoAndroid/E2E/VisualTruth/SecureStore/piloto/pentestindependente/TRUSTprovider/PSPKYCsandbox/FIN-RISK/WebpagocontinuamOPENseparados. Próximo: própriosCI comNest+HTTPPostgresrealSHAfinal, seguirmergesgatesordenados/verificarpós, consolidarrecibosreais completos464–atual porPRdocssemloopmeta, prosseguir auditoria segura de todasfrentesinternas seminventaratividadeoufechamento geral.


## Merge do KVM direto verificado como mecanismo, novos gates obrigatórios #474 — 2026-10-11

Pais ordenados[3c2add6b12e52035b3920553b720c3c396a596db,90a7498f4de4e0473216d4fe06be54fafe54e1a5], semforce/reset/perda depredecessores. Arvore parte do ancestralnovo472, conserva bytea byte source/testes/domínio destaPR; incorpora correção de setup473c33b2823950c990ceda9815dffe9c42b74b8366a: exige characternode, aplica mesma0666 viachmoda+rw diretamente, statpermissões e read/write failclosed/KVM_READY/açãohardwarefalse; deixa udevasynchronous/reload fora do caminho. 473head21d ownAPK38179654427 FAILantesemulador, buildSUCCESS, não usarcomoPASS. CI verde e APKque termine nosheads anteriores pertencem apenas a suasSHAs, nãoautorizamesteheadnovo.

TODOoriginal5docs doantecessornovo prefix-preservado maisnotas anterioresdestaPR integrais/fotografiasdatadas eesta reconciliação. OwnCI expected4/729/376/3 novo eAPK N/A SÓcomparaçãoexata de mobile/rootlock/workflows/build/smoke contraantecessorjáown/postgatesprovados, senãoverificarprópriorun. Verificarprioridade473independente→468→469→471→472→474, main/heads/mergeableeventual/diff/bytes/todossteps/pais/tree/SHAreal/postCI/APKscopeN/Aprovada. NãoemprestarAPK/nãoPASS[]/running/nãorepetirmerges/rerunsold. Semcusto/PSP/money/produção, físico/provider/pentestcontinuamOPEN; consolidarrecibosreais eprosseguir todasfrentesinternas seminventaratividade.


## Ciclo 2026-10-11 — merges verificados e limite inteiro do callback assinado
Base factual main `933e584c49c45aff80f9268e80f2b094296f67b4`, tree `487b9e7ef8dab59fdade639578f0c523a9ac5b7a`. Releitura README→DVT ORIGINAL v1.104/memória/checkpoint no SHA, PRs, código, CI, artefatos e logs primários. Os registros anteriores são snapshots históricos, preservados integralmente; estados atuais abaixo substituem suas pendências, não suas evidências.

### Entrega e proveniência
#473→#468→#469→#471→#472→#474 integrados uma única vez por merge. Ordered parents=[main anterior,head aprovado], árvore resultante igual à árvore candidata e avanço de main comprovados pela API em cada integração. #473 e #468 já estavam merged ao reconsultar, portanto não se repetiu a operação. #470 não foi integrado: implementação inicial udev foi substituída pelo #473 independente e corrigido; fechamento administrativo como superseded não equivale a merge.
Cada head tem CI próprio completo success. #473/#468/#469/#472 têm APK próprio success, instalação e DEVICE_SMOKE_OK metro_required=false, artefato do SHA não expirado. #471/#474: APK N/A por escopo comprovado, sem mudança em mobile, lock/workspace, workflows/build/smoke relativamente aos predecessores; ausência de run não se chama PASS. Os APKs pós-merge dos predecessores ainda em execução no momento deste registro devem ser acompanhados até prova, nunca substituídos por artefato de outro SHA.
KVM validado no runner efêmero: dispositivo existente /dev/kvm, modo0666, acesso leitura/escrita e KVM_READY, disable-linux-hw-accel=false, comando real sem -accel off. Não é teste físico. A primeira tentativa #473 com udev falhou antes de instalar; não se afirmou qual subcomando falhou. Novo código aplica diretamente o mesmo acesso pretendido ao dispositivo existente e todos os gates continuam obrigatórios. Cabe acompanhar pós-merge e registrar falha/log real se ocorrer.

Recibos consultados nesta rodada (IDs são links https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/ID; running≠PASS):
```json
[
  {
    "pr": 473,
    "merge": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
    "head": "c33b2823950c990ceda9815dffe9c42b74b8366a",
    "tree": "37de203b255238a1e5530614bb2841aaed501b91",
    "parents": [
      "682f0849b5861af0dc2b571c9024b1062743d8b1",
      "c33b2823950c990ceda9815dffe9c42b74b8366a"
    ],
    "ownCI": {
      "run": 38180539072,
      "sha": "c33b2823950c990ceda9815dffe9c42b74b8366a",
      "job": 114591960350,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        722,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180539085,
      "sha": "c33b2823950c990ceda9815dffe9c42b74b8366a",
      "job": 114591960282,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:40:24.4028169Z Success",
        "2026-10-11T22:40:36.7452696Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717966676,
        "size_in_bytes": 28911004,
        "digest": "sha256:6a06214ba25977ec50f19e3be1ef368aa1ad3cf5e830ff79126f4fe2e26bb69d",
        "expires_at": "2026-10-25T22:40:38Z",
        "expired": false,
        "head_sha": "c33b2823950c990ceda9815dffe9c42b74b8366a"
      }
    },
    "postCI": {
      "run": 38181442437,
      "sha": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "job": 114594673900,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        722,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181442348,
      "sha": "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 468,
    "merge": "567221ee2db677c21580fa72874688cee20564ca",
    "head": "2242ee79e4102c2ed22eaed072bae805060dbd07",
    "tree": "dffef23c56d53f5645c6f400e1cca09b5ea94cb0",
    "parents": [
      "cfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70",
      "2242ee79e4102c2ed22eaed072bae805060dbd07"
    ],
    "ownCI": {
      "run": 38180624911,
      "sha": "2242ee79e4102c2ed22eaed072bae805060dbd07",
      "job": 114592228754,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        725,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180624934,
      "sha": "2242ee79e4102c2ed22eaed072bae805060dbd07",
      "job": 114592229034,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:40:03.4057533Z Success",
        "2026-10-11T22:40:15.8355741Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11718450944,
        "size_in_bytes": 28911028,
        "digest": "sha256:01ad04507c3f3077186167d9cde1e646ce8a264301ea9e74c5e7f412767958a8",
        "expires_at": "2026-10-25T22:40:17Z",
        "expired": false,
        "head_sha": "2242ee79e4102c2ed22eaed072bae805060dbd07"
      }
    },
    "postCI": {
      "run": 38181629368,
      "sha": "567221ee2db677c21580fa72874688cee20564ca",
      "job": 114595240551,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        725,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181629374,
      "sha": "567221ee2db677c21580fa72874688cee20564ca",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 469,
    "merge": "38b253f603f19938c22001c502963ab08287a08f",
    "head": "5a418f3e938f416d71642a6a9b884ec8167ce809",
    "tree": "c2e1aa7d7452ae01087ddc45c3f59d640f14d624",
    "parents": [
      "567221ee2db677c21580fa72874688cee20564ca",
      "5a418f3e938f416d71642a6a9b884ec8167ce809"
    ],
    "ownCI": {
      "run": 38180627279,
      "sha": "5a418f3e938f416d71642a6a9b884ec8167ce809",
      "job": 114592236030,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180627318,
      "sha": "5a418f3e938f416d71642a6a9b884ec8167ce809",
      "job": 114592236477,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:39:38.6580712Z Success",
        "2026-10-11T22:39:51.2457223Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717647226,
        "size_in_bytes": 28911058,
        "digest": "sha256:45d21dc20f89435031fbbf508f109ab0221ac935bc8b7ff7c0cf0384f272eff3",
        "expires_at": "2026-10-25T22:39:52Z",
        "expired": false,
        "head_sha": "5a418f3e938f416d71642a6a9b884ec8167ce809"
      }
    },
    "postCI": {
      "run": 38181961285,
      "sha": "38b253f603f19938c22001c502963ab08287a08f",
      "job": 114596235120,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        367,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "postAPK": {
      "run": 38181961351,
      "sha": "38b253f603f19938c22001c502963ab08287a08f",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 471,
    "merge": "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
    "head": "a031a835161dba89389552d9b4885704db996a09",
    "tree": "4d7df3d2ab4a98d056f9597593b626b31a404200",
    "parents": [
      "38b253f603f19938c22001c502963ab08287a08f",
      "a031a835161dba89389552d9b4885704db996a09"
    ],
    "ownCI": {
      "run": 38180630973,
      "sha": "a031a835161dba89389552d9b4885704db996a09",
      "job": 114592248277,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        727,
        374,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": "N/A: mobile, dependency files, workflow and smoke unchanged relative to predecessor",
    "postCI": {
      "run": 38182001026,
      "sha": "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": "N/A: mobile, dependency files, workflow and smoke unchanged relative to predecessor"
  },
  {
    "pr": 472,
    "merge": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
    "head": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
    "tree": "8375bdb0fe165e5c43af49fc758b851f251818b1",
    "parents": [
      "3ca777dc492d1a6c829bb2cd3b223b8046db3b83",
      "90a7498f4de4e0473216d4fe06be54fafe54e1a5"
    ],
    "ownCI": {
      "run": 38180634772,
      "sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
      "job": 114592260912,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        729,
        374,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": {
      "run": 38180634538,
      "sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5",
      "job": 114592260054,
      "attempt": 1,
      "pending": false,
      "markers": [
        "2026-10-11T22:41:48.7539333Z Success",
        "2026-10-11T22:42:01.3051492Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
      ],
      "artifact": {
        "id": 11717826308,
        "size_in_bytes": 28910954,
        "digest": "sha256:8adde9570883e6b1e6fa122deab6fa1f19fb03c599e924657f9a1d28366cb2ee",
        "expires_at": "2026-10-25T22:42:02Z",
        "expired": false,
        "head_sha": "90a7498f4de4e0473216d4fe06be54fafe54e1a5"
      }
    },
    "postCI": {
      "run": 38182026864,
      "sha": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": {
      "run": 38182026860,
      "sha": "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "pending": true,
      "status": "in_progress"
    }
  },
  {
    "pr": 474,
    "merge": "933e584c49c45aff80f9268e80f2b094296f67b4",
    "head": "12e94426901461448f8c18b586011631c8048489",
    "tree": "487b9e7ef8dab59fdade639578f0c523a9ac5b7a",
    "parents": [
      "42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5",
      "12e94426901461448f8c18b586011631c8048489"
    ],
    "ownCI": {
      "run": 38180637940,
      "sha": "12e94426901461448f8c18b586011631c8048489",
      "job": 114592270958,
      "attempt": 1,
      "pending": false,
      "counts": [
        4,
        729,
        376,
        3
      ],
      "httpStep": "HTTP journey, readiness and Production Truth contract"
    },
    "ownAPK": "N/A: mobile, dependency files, workflow and smoke unchanged",
    "postCI": {
      "run": 38182059488,
      "sha": "933e584c49c45aff80f9268e80f2b094296f67b4",
      "pending": true,
      "status": "in_progress"
    },
    "postAPK": "N/A: mobile, dependency files, workflow and smoke unchanged"
  }
]
```

### Próxima falha concreta corrigida nesta branch: amount_cents INTEGER
Migração existente `packages/db/migrations/0017_payment_events.sql`: amount_cents integer NOT NULL CHECK(amount_cents>=0). Adapter assinado verificava Number.isInteger e>=0, aceitando 2147483648 e números inseguros como1e100 antes de SQL (overflow do integer). Ajuste mínimo: Number.isSafeInteger, intervalo inclusivo0..2147483647, sem arredondar/clamp, sem nova política comercial, sem alteração de schema.
Dois testes comportamentais adicionais executam adapter/controller reais: invalididades assinadas rejeitam payment_event_invalid e nenhum tenant/query; zero e máximo preservam o ACK factual e valor exato; assinatura inválida mantém precedência. HTTP/Postgres real da CI verifica400 sem eventos para entradas inválidas, 201+id/amount iguais à linha real em zero/máximo e replay idempotente, além dos testes prévios de JSONnull e das duas barreiras concorrentes.
Sem resultado local inventado: execução de comandos locais ficou indisponível nesta parte da rodada; CI primário/Nest/HTTP/Postgres no próprio SHA ainda precisa passar (esperado4/729/378/3=1114). Não há alegação RED/GREEN local desta tarefa. Branch/PR deve permanecer draft até aprovação dos gates aplicáveis, revisão diff/bytes/árvore e revalidação main/head. APK N/A somente após confirmar que os paths mobile/dependências/workflow/smoke são idênticos à base. ID UUID de entrada no controller foi identificado para auditoria seguinte, mas não alterado nem dado como testado neste patch.

### Continuidade e limites
Após integrar esta correção, confirmar ordered parents/tree/main e CI pós-merge real. Consolidar recibos finais dos APKs pós-merge #473/#468/#469/#472, sem loop de commits autorreferentes (últimos gates do commit documental podem ficar no recibo do PR/checkpoint de retomada). #464–#467 já têm provas pósCI/APK verificadas, preservadas nos históricos; não repetir merges/reruns. Examinar funcionalidades reais por área do plano mestre/requisitos/código/testes, não concluir pelo número de PRs/issues.
Todas as áreas internas seguem no escopo: telas/navegação, login/cadastro/sessão, vagas/profissionais/agenda, empresas/equipes/candidaturas/matching, simulados financeiros/notificações, backend/APIs, tenant/RLS/Postgres/segurança, emulador APK e documentação. Empresa já renderiza CompanyNav e início profissional já consulta APIs reais; não recriar tarefas antigas já corrigidas. Preferências/ajuda sem vínculo/previsões de no-show exigem contrato/dados e não autorizam política inventada; verificar alternativas independentes.
Android FÍSICO/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST providers e PSP/KYC sandbox/FIN-RISK permanecem OPEN e separados. #224 Web depende serviço Railway eventualmente pago, sem provisionar. React19.1.4/RN0.81.6, frozen lockfile, isolamento/RLS, desenho canônico e standalone semMetro preservados. Sem PSP real, dinheiro real, serviços novos, custos, segredos, produção/Railway/deploy pago. ZIP digest é ZIP, não APK individual; não atribuir BUILD_INFO sintético ao head literal. Rotina continua ativa, sem exigir CONTINUAR, sem afirmar execução24h ou conclusão integral.


## Ciclo 2026-10-11 — IDs internos do callback antes do SQL
Predecessor #475 `fix/payment-webhook-integer-bounds`, head `62efd612a4582e0b473189d35c0c016be73aacf1`, tree `a14ee4967df485e3488a4e7e692843d72abea2e6`, CI38182249396 em execução na consulta; ainda não integrado. Main verificada933e584c49c45aff80f9268e80f2b094296f67b4. PRs #473/#468/#469/#471/#472/#474 merged, sem repetir. Recibos completos e histórico original permanecem acima.

Falha independente auditada no controller financeiro: adapter genérico verifica campos string, mas o endpoint concreto usa tenant_id/assignment_id UUID(migração0017) e recipient_professional_id UUID(opcional,0032). Strings nãoUUID assinadas atravessavam a validação e podiam falhar na conversão PostgreSQL. Guard local no PaymentWebhookController após HMAC/timestamp/parse e antes de db.tenant rejeita formatos malformados com400/payment_event_invalid. Mantém contrato genérico do adapter/provenance/idempotencyKey(provider TEXT), roleId TEXT, comparação EXATA de destinatário/profissional, RLS/tenant, replay/concorrência e ausência de UPDATE/dinheiro real. Não normaliza IDs.
Dois testes adicionais com controller real: 3campos×8valores malformados (texto, vazio/espaços/compacto, number/object/array) exigem0tenant/0query; IDs válidos mantêm ACK real e igualdade exata do destinatário; assignment ausente e destinatário diferente UUID continuam erros específicos sem INSERT. A fixture antiga de destinatário diferente passa de 'other' para UUID diferente válido, mantendo a mesma assert payout_recipient_mismatch e única consulta; não se remove o controle.
HTTP/Postgres real exige400 para todas as entradas malformadas sem linha em qualquer tenant para a chave dedicada e preserva assignment_not_found para UUID válido inexistente. Testes prévios de assinatura/timestamp, JSONnull, extremos INTEGER e duas barreiras concorrentes continuam obrigatórios. Esperado4/729/380/3=1116. Nenhum resultado local alegado(runtime local indisponível); próprios gates do SHA resultante ainda precisam ser executados e aprovados.
APK N/A por escopo API/controller/test/HTTP/docs apenas, a comprovar pelas árvores/paths iguais para mobile/lock/workspace/workflows/build/smoke; []nãoPASS. Base empilhada #475 deve ser integrada primeiro, depois retarget main, reconsultar eventual mergeable/diff/bytes/árvores/gates e integrar uma única vez apenas green. Se conflito real, reconciliar ancestral sem force/perder alterações e reexecutar em novo SHA.

PósCI #473/#468/#469/#471/#472/#474 são consultados no merge real, não emprestados de heads. APK pós#47338181442348/job114594673494 attempt1 SUCCESS/install22:53:42.564Z/DEVICE_SMOKE_OK22:53:54.939Zmetrofalse/ZIP11717758640 28910998bytes/digestsha256:0f6023b8b1911f1193f231385541ced9c205c6a9731e62eb6869ccc183d28a08/exp2026-10-25T22:53:56Z. #470 fechado superseded, não merged. APK pós#46838181629374/#46938181961351/#47238182026860 ainda em execução no snapshot; acompanhar e registrar resultados reais. Pós#475 deve ser descoberto após merge; não criar workflow imaginário nem chamarrunning de aprovado.
Depois desta tarefa, consolidar recibos finais em PR documental com CI próprio/pós e APK N/A por equivalência; evitar loop autorreferente de commits. Continuar auditoria factual das áreas internas e requisitos/código/testes reais, sem transformar ausência de PR/issue em fechamento. Preferências/helpsemvínculo/previsões ainda exigem contrato/dados; mover alternativas seguras. Celular físico/E2E/VisualTruth/SecureStore/piloto, pentest independente/TRUST providers, PSP/KYC sandbox/FIN-RISK/Web Railway pago OPEN separados. Não habilitar PSP/dinheiro real/custos/serviços/deploy pago/produção/segredos. Preservar React19.1.4/RN0.81.6/lockfilefrozen/RLS/standalone semMetro/desenho canônico. Documento ORIGINAL v1.104 e memória/checkpoint/ledger/registry inteiros preservados; rodada não fecha projeto; rotina segue ativa sem CONTINUAR e sem promessa24h.


## Ciclo 2026-10-11 — confirmação simultânea de candidato
Base main `edaa4f923b1789809b9ed399964f621fa6b271c1`, tree `204408ac0d1e3ea42fd104c7966e4653c5fcbbe0`, #476 já merged à consulta; não repetir. #475 merged00df69af74f394907b4bff0ba32727a0ac73c4ea. Próprios CI47538182249396/job114597076328 SUCCESS4/729/378/3(1114) e47638182495135/job114597830776 SUCCESS4/729/380/3(1116), assinatura/JSONnull/limitesINTEGER/UUID/HTTPPostgres/barreirasconcorrentes PASS no SHA exato. APK475/476 N/A API+tests+docs, mobile/dependencies/workflow/build/smoke idênticos. PósCI real47538182555348 e476 a descobrir/acompanhar, running/[]nãoPASS.

Todos APKs pós-merge pendentes das integrações móveis desta rodada agora SUCCESS, logs primários confirmam instalar/lançar metro_required=false e artefatos dos próprios mergeSHAs não expirados:
- #473 mergecfda6d0eb166a68c0a2c4ae3a4e79557c9a8dd70, postAPK38181442348/job114594673494 attempt1, install22:53:42.564Z/smoke22:53:54.939Z, ZIP11717758640/28910998/digestsha256:0f6023b8b1911f1193f231385541ced9c205c6a9731e62eb6869ccc183d28a08/expires2026-10-25T22:53:56Z.
- #468 merge567221ee2db677c21580fa72874688cee20564ca, postAPK38181629374/job114595240503 attempt1, install22:56:55.562Z/smoke22:57:08.027Z, ZIP11717762633/28911013/digestsha256:7d160e3b9871e9c8f125da5444d20e8ba5429533090926d0b97fc5c91d611130/expires2026-10-25T22:57:09Z.
- #469 merge38b253f603f19938c22001c502963ab08287a08f, postAPK38181961351/job114596235517 attempt1, install23:01:44.822Z/smoke23:01:57.242Z, ZIP11717854452/28911063/digestsha256:8bb9649fec5250cc06d54df26a0cd3e04023afe77e3061ba2ef8199da7e44246/expires2026-10-25T23:01:58Z.
- #472 merge42e1b7c6d2c8d9a912de6a58a6da70a3c91f6ff5, postAPK38182026860/job114596422655 attempt1, install23:00:20.882Z/smoke23:00:33.370Z, ZIP11717839222/28910958/digestsha256:02fee094b7c610e020320f61f6a5c922be077b9fc9a5be1d20797d2676dcaa61/expires2026-10-25T23:00:35Z.
ZIP digest refere-se ao ZIP; não chamar APK individual. Emulador não é físico. Próprios APKs/head/trees e pais já constam integralmente nos recibos anteriores. #470 superseded fechado, nunca merged.

### Falha concreta auditada no caminho empresa→confirmação
CompanyJobsController.confirm lia vínculo inexistente, depois INSERT, dentro de db.tenant com BEGIN/READ COMMITTED, sem retry automático. UNIQUE(job_id,professional_id) na migração0006 evita duplicação, mas dois clientes simultâneos podem ambos ler ausência e o perdedor receber erro de constraint em vez de recibo idempotente. Não se alegou reprodução RED local/CI antiga: risco comprovado pela estrutura/transação e nova regressão pública será validada na CI.
Correção: requireJob aceita bloqueio opcional FOR UPDATE, usado exclusivamente pelo POST confirm, antes de consultar interesse/vínculo. Segundo POST do mesmo job aguarda primeiro commit e retorna vínculo real pelo caminho idempotente existente. GETcandidates/recommendations continuam sem lock opcional; regras/roles/status/tenant/capacidade/notify/ownership não mudam. Sem ON CONFLICT cego/ACK inventado, sem nova infraestrutura ou custos.

Novo cenário HTTP/Postgres em scripts/company-confirmation-concurrency-e2e.cjs, chamado no fim da jornada existente antes de signout, preservando TODAS suas asserts. Cria job isolado viaAPI + interesse via profissional legítimo, exige membership já criada pela jornada original(não seed/não enfraquece sua prova), usa SHARE lock em work_assignments para sobrepor duas requisições HTTP reais. Observa ambas bloqueadas no banco antes de liberar. Exige201/201, ACKs exatamente iguais(id/date/tenant/job/prof/status), uma linha real, incremento de exatamente uma notificação sobre o contador factual anterior, replay sequencial idêntico e outraempresa401 sem nova linha. Não faz escrita em produção: CI=true/1, DB e HTTP localhost e DB dedicada mlivretrabalho_http, credenciais efêmeras dos usuários da jornada. Nenhum token é registrado em evidência.
Contagem unitária permanece4/729/380/3=1116; a prova nova é HTTPconcorrente. Sem resultado local alegado(runtime local indisponível). CI próprio no head resultante deve SUCCESS e conter marker novo; gates anteriores não autorizam novoSHA. APK N/A só comprovada equivalência exata mobile/rootlocks/dependencies/workflows/build/smoke. Revisar diff/bytes/fullhistory/tree, revalidar head/main/mergeable e integrar uma vez; confirmar orderedparents/tree/main e CI pós-merge real. Caso teste/barreira falhe, ler logs primários e ajustar o problema real sem retirar assertions ou emprestar provas.

### Auditoria factual por áreas e próximas ações
No CI real de #475/#476, HTTP/Postgres aprovou auth/jornada multiempresa, estados/lifecycle/agenda/earnings, perfil/disponibilidade/taxonomia, empresa/equipes/planner/candidatos/matching explicável, notificações com leituras isoladas/idempotentes, pagamentos assinados simulados/reconciliação, suporte/safety/trust/privacy, migrações/RLS/readiness. São provas desses contratos, não fechamento integral do app/desenho ou pentest.
Releitura atual de empresa.tsx confirma CompanyNav; profissional-inicio.tsx carregaAPIs/fatos e loading/erro/vazio/deadlines sem retornar mocks. matching.ts/role-fit.ts/company-jobs/earnings/notifications lidos; roles continuamTEXT, earnings filtra identidade+tenant e recomendações usam sinais reais de função/cidade/disponibilidade/histórico. Preferências/helpsemvínculo/previsões dependem contrato/dados, não se inventou funcionalidade ou commit para atividade.
Após esta integração, consolidar TODOS os recibos finais próprios/pósCI/APK, inclusive464–467, nos5documentosoriginais/registry/evidência/checkpoint por único PR documental(CI próprio/pós; APK N/A com equivalência), sem loop de commits para incluir o próprio SHA. Depois auditar próximas lacunas reais por requisitos/código/testes, não usar0PRs/issues como prova deconclusão.
React19.1.4/RN0.81.6 confirmados no package.json atual; lockfile/root/workflow/mobile163blobs equivalentes na alteração API anterior. Celular físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, TRUSTproviders, PSP/KYC sandbox/FIN-RISK e serviço WebRailway pago(#224) seguem OPEN separados. SemPSP/dinheiroreal/custos/deploypago/prodRailway/segredos/serviços novos. Documento ORIGINALv1.104/histórico/memória/checkpoint/ledger/registry preservados integrais. Rotina ativa sem CONTINUAR, sem promessa24h; bloqueio parcial/transitório ou fimrodada não fecha projeto.


### Retificação da observação da barreira — 2026-10-11
CI38183022941/job114599408205 no head1abb11e151f1e564d77c0f9146db37a85e05de0d: typecheck/build/bundle/unit4/729/380/3 PASS; HTTP FAIL na assertion overlap, actual0/expected2. Logs primários mostram os dois POST reais recebidos e ambos201 após aproximadamente5segundos de liberação, sem erro financeiro/SQL alegado. A fixture consultava pg_stat_activity repetidamente dentro de BEGIN; essa informação retém snapshot até fim da transação ou pg_stat_clear_snapshot, conforme documentação PostgreSQL17 https://www.postgresql.org/docs/17/monitoring-stats.html seção27.2.2.
Novo patch renova snapshot antes de cada leitura da barreira, também na fixture concorrente financeira que associa pg_locks a pg_stat_activity. Nenhuma assert, limite, SQL de negócio ou controle foi removido/relaxado. Preserva overlap de duas requisições,2ACK/1vínculo/1notificação e testes financeiros. Exigir novo CI no SHA resultante; não rerun deinfra nem emprestaroldgates. Modo original100644 do script da jornada foi restaurado no commit anterior, sem mudança de conteúdo.


## Recibo consolidado 2026-10-11 — referência atual

Main funcional verificada ac7fa1b35aa0057578aba39f9f85c3a0d79c78eb / tree 29b1c510fc559554e7a12cf0b94cdba6e17d48b4. #473/#468/#469/#471/#472/#474/#475/#476/#477 MERGED com própriosCI e pósCI reais SUCCESS; native own/post473/468/469/472 SUCCESS no próprioSHA/install/smoke semMetro/artefatos não expirados; API-only471/474/475/476/477 APK N/A por equivalência comprovada. #470 superseded fechado, nunca merged. #464–467 pósCI/APK também confirmados, inclusive464attempt2. Todos recibos completos(pais/tree/heads/runs/jobs/counts/install/smoke/ZIPdigest/expiração) em [AUTONOMOUS_CYCLE_RECEIPTS_464_477_2026-10-11](../evidencias/AUTONOMOUS_CYCLE_RECEIPTS_464_477_2026-10-11.md). Path canônico: docs/evidencias/AUTONOMOUS_CYCLE_RECEIPTS_464_477_2026-10-11.md. Registros pendentes anteriores são snapshots históricos, preservados, substituídos por este estado.

Última correção: confirmação simultânea retorna dois recibos factuais iguais com umaassignment e uma notificação; CompanyNav/APIhome/rolesTEXT preservados. Financeiros simulados validam JSONnull/rangeINTEGER/UUID, HMAC/timestamp/replay/conflito/tenant. CI1116+HTTPPostgres real; não prova renderRN/físico/pentest. Matriz porárea na evidência marca limites; não declarar todas áreas concluídas. Documento ORIGINALv1.104 e todo histórico/memória/checkpoint/ledger/registry permanecem integrais.

Item atual: consolidar estes recibos em único PR docs(receipts/verified-cycle-464-477); CI próprio/pós obrigatório, APK N/A somente todo código/dependências/workflows/build/smoke igual à base. O resultado final do próprio commit documental será confirmado no PRbody/checkpoint de retomada, sem loop autorreferente. Reconsultar main/PRs/runs reais antes de ação; nunca repetir merges. Depois: auditar mapa requisitos/referência/rotas/APIs/dados/estados e concorrência restante de interesse/cancelamento/substituição, reproduzir falha concreta antes de alterar, avançar alternativas independentes.

Preferências/helpsemvínculo/ML/integrations requerem contratos/dados explicitados noDVT. Físico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSPKYCsandbox/FIN-RISK/WebRailwaypago OPEN separados; não habilitar custos/PSP/dinheiroreal/produção. React19.1.4/RN0.81.6/frozenlock/RLS/standalone/desenho preservados. Rotina segue ativa atéconclusão integralCOMPROVADA ouordemexpressa; fimrodada/transitório/parcial nãoencerra projeto; semCONTINUAR/semexecução24h alegada.


## 2026-10-11 — substituição não pode selecionar o profissional original
Base main verificada `a58d0596d1e298defde5e4f62640d02c83e24528`, tree `82c2348ff9d076a20663ab8540ad2e44b3dfaab4`. README→DVT ORIGINALv1.104 inteiro/histórico, memória/checkpoint/ledger/registry relidos no SHA imutável; basev1.103 e código de interesse/cancelamento/substituição inspecionados. #478 jámerged; pósCI38184167762 SUCCESS na nova consulta. 0PRs não provou conclusão; não repetir integrações históricas.

Falha reproduzida no controller real: ranked exclui profissional original(tpm.professional_id<>$2), mas POSTselect validava apenas pool/atividade/disponibilidade. Original elegível no pool era aceito, UNIQUE(job_id,professional_id) devolvia o próprio vínculo e o endpoint cancelava original/registrava matched, um falso sucesso de substituição. Regressão local do controller original:11PASS/1FAIL12(Missing expected rejection), mantém TODOS10tests/asserts originais. Correção GREEN12/12. Local executa source do controller TypeScript com decorators removidos e exceptions/ranking não usado substituídos por fixtures explícitas; NÃO prova NestDI, SQL/Postgres real, renderRN ou físico. Bash-n da jornada PASS.
Dois testes novos cobrem original active/preferred/available nas3etapas substituíveis e UUIDcase equivalente, zero INSERT/UPDATE/poollookups, candidata distinta com ACK/input exatos, autoridade company e prioridade dos erros de estados inválidos. Fixtures agora refletem a projeção booleana UUID e o ID da linha preexistente sem remover expectativas positivas anteriores.
SQL do próprio endpoint projeta professional_id=$3::uuid AS isOriginalProfessional no SELECT já scoped porassignment/tenant; bool evita selecionar o próprio original antes das escritas. Usa erro existente replacement_candidate_required. Não normaliza/mutaIDs de input/ACK, não muda roleIdTEXT/referências externas/política/matching/disponibilidade/roles/RLS/finanças.
HTTP/Postgres da CI adiciona original ao pool porAPI legítima(apenasfixturelocal), testa lower/upperUUID400 com erro específico e snapshots exatos de pedidos/vínculos/notifications/earnings inalterados. Mantém jornada completa existente e auto-match/seleção legítima posteriorPRO2. Esse HTTP ainda não foi executado neste registro: exigir CI próprioSHA4/729/382/3=1118 +marker novo e todosgates antigos antes de merge. Não chamar localfixture prova deSQL, nempre-gates pós-merge.
Código/2regressões/jornada/evidência e5documentosoriginais no mesmo ciclo, todo histórico preservado por prefixo literal. APK N/A somente após comprovarmobile/rootlock/workspace/dependencies/workflow/build/smoke/hashes/modes idênticos àbase; []nãoPASS. Branchfix/replacement-exclude-original-uuid: revisar bytes/diff/tree/modes, revalidarmain/head/mergeable, mergecomexpectedhead apenasgatesgreen; confirmarorderedparents/tree/main eCIpós realSHA.
Próxima auditoria segura: concorrência da seleção de substitutos e disputa com cancelamento/lifecycle; reproduzir efeito real antes de patch. Interesse usaUPSERT preservandoconfirmed; cancellation usaUPDATEcondicional, mas interações requerem prova. Um bloqueio não encerra projeto; continuar alternativas independentes enquantoCIexecuta.
React19.1.4/RN0.81.6/lockfilefrozen/tenantRLS/standalone semMetro/desenho preservados. DVT ORIGINAL/memória/checkpoint/ledger/registry seguem integrais, sem documento substituto. VisualTruth/AndroidFÍSICO/E2E/SecureStore/piloto, pentestindependente, TRUSTproviders, PSPKYCsandbox/FIN-RISK/WebRailwaypago(#224) OPEN separados. Preferências/helpsemvínculo/ML/integrations precisam contrato/dados; não inventar defaults/bypass/política. Sem PSP/dinheiroreal/custos/serviçosnovos/produçãoRailway/deploypago/segredos. Não desativarporfimrodada/parcial/transitório, não exigirCONTINUAR/alegar24h.


## 2026-10-11 — prova concorrente da seleção de substitutos
#479 já MERGED85fea5d911a6fab758669c9b950fb214ac0190ef/head1ce72d4de424183c875d68645ea452728007dabb/tree788442c695c3cb2dda91e89297c225ea117b4ea2, parents[a58d0596d1e298defde5e4f62640d02c83e24528,1ce72d4de424183c875d68645ea452728007dabb], treecandidata=main comprovada. OwnCI38185492065/job114606794588 SUCCESS4/729/382/3=1118 eHTTPPostgres: original elegível no pool lower/upperUUID400 sem alterarrequests/assignments/notificações/earnings, substituição legítima preservada. PósCI do merge real deve ser acompanhado; não emprestarpre-gates. APK479N/A234blobs mobile/sharedpackages/rootlocks/workflows/build/smoke e modesiguais comprovados. Documento ORIGINAL/histórico preservados.

Nova hipótese concreta: select lê replacement_request open eoriginalestado semlock, escreve novoassignment e marcaRRmatched sempredicate deestado. Duas seleções distintas simultâneas podem confirmar2substitutos para1pedido escalar. Antes de modificar código, esta branch adiciona APENASfixtureHTTPPostgres que força as2requisições reais a sobrepor com SHARE lock emwork_assignments, renova snapshotpg_stat_activity porpoll e exige1ACK201+1rejeição400replacement_not_open,1novoassignment/1notification e pedido comwinnerexato, retryterminal sem novaswrites.
Usa somente CI=true/1, HTTP ePGlocalhost/DBmlivretrabalho_http, usuário/profissional criados porAPIlocal, membership viajornada legítima; nenhum seeding/bypassRLS/credencialprod. Teste acrescentado ao fim da jornada antes designout mantendo TODASasserts anteriores, comjobfresh e terceiroprofissional ativo/disponível/napool. Node--check/Bash-n locaisPASS; execuçãoHTTP/SQL aindaPENDENTE. CI do próprioSHA deve reproduzir ou refutar hipótese: não declarar falha real semlogprimário, não merge testeRED nem ignorar asserts.
Próximo seRED demonstrar2matched: serializarRRna transação e proteger status deoriginal contra escritas concorrentes comlock compatívelFK, preservar política400jáexistente paraRRclosed. ReexecutarnovoSHA e registrar prova1winner/1closed/1substitute/1notice. Se outroerrofixture, corrigi-lo semremover controles; se hipótese refutada não inventarpatch. Scope APItests/HTTP/docs; mobile/lock/workflow/desenho/React19.1.4/RN0.81.6/RLS/standalone semMetro preservados; APKN/Aapenas equivalênciacomprovada. Atualizar código/teste/evidência e5originais no mesmo ciclo.

Físico/VisualTruth/E2E/SecureStore/piloto/pentestindependente/TRUSTproviders/PSPKYCsandbox/FIN-RISK/Webpago econtratos/dados seguemOPEN separados. SemPSP/dinheiroreal/custos/produção/serviços/deploypago/segredos. Rotina não desativada por parcial/transitório/fimrodada; semCONTINUAR/24h. Após esta prova seguir auditoria cancelamento/lifecycle e estados preexistentes do substituto; não fingir conclusão por0PR/issues.


### Reprodução primária e correção — seleção concorrente
CI38185857319/job114607904601 no headb0dd0ed8064d31a67daaa5ff0088ecb6adb17846 FAILHTTP após unidade4/729/382/3, build/typecheck/export/migrations/privacy aprovados: barreira atingiu2requisições reais; assert esperava[201,400], recebeu[201,201], DOISmatched parao mesmoRR. Não é falhadeemulador/infra nemhipótese nãoverificada. Fonteprimária log dojob. Nenhumassert retirado.
Correção noendpointselect: bloqueiaRRopen FOR UPDATE paraqueapenasumcliente leiaestado aberto e o segundo aguarde/reavalie WHEREdeestado; erroexisting replacement_not_open400 mantido parao perdedor/retryterminal. Originalassignment lido FOR NO KEY UPDATE protege status durantea transação sem bloquearKEY SHARE dasFKs de criação/cancelamento; não alteraPK/contrato/roles/RLS/finanças/policy. Compatibilidade documentadaPostgreSQL17 https://www.postgresql.org/docs/17/explicit-locking.html. Locks seguemRR→original; processo inteiro emdb.tenantBEGIN/COMMIT/ROLLBACKpreexistente. GET/candidates/auto-match semnovolock, disponibilidades/matching/selfguard479 preservados.
ReexecutarCI own noNOVOSHA esperado4/729/382/3 +mesmabarreira1ACK/1closed/1novoassignment/1notice/winner real e retrysemnovaescrita. Não declararGREENantesdelogprimário; oldREDnão autoriza merge nemgera reruninfra. Código/teste/evidência e5DVT/memória/checkpoint/ledger/registry existentesatualizados no mesmo ciclo íntegros. Pós47938185785746 agoraSUCCESS na consulta, registrar recibo primário completo depois; não repetir479.


## 2026-10-11 — ACK de substituição exige vínculo confirmado real
Predecessor#480 branchfix/replacement-selection-concurrency head87f4720e2dfdc018cfa094d926bdaafc940b0540/tree67d92527f7573c1e38654bdf39f57012b032f253, CI próprio novo a executar/acompanhar; sourceLOCKs herdado integralmente. Main#47985fea5d911a6fab758669c9b950fb214ac0190ef, pósCI38185785746 SUCCESS consulta, não repetirmerge. #480REDprimário38185857319/job114607904601 comprovou2ACK201 no mesmoRR e novoSHA exige1winner/1closed, nãoborrowoldgates.

Falha independente reproduzida enquantoCI#480 executa: INSERTassignment emselect usaONCONFLICTpreservandostatus da linha anterior e retornavaapenasid. Uma candidatacomanterior vínculo cancelado/concluído/emcurso no MESMOjob recebia ACKmatched sem terassignmentconfirmed, cancelandooriginal e resolvendoRRfalsamente. Regressão localcontroller real: RED12PASS1FAIL13(Missing expected rejection)→GREEN13, TODOS12originais/asserts preservados incluindo479; fixture explicita5estadosnão-confirmados econtrole confirmed factual. Local decorators/exceptionsfixtures, não NestDI/SQL/físico. Não afirmarHTTPRED desta tarefa.
Patch mínimo retornaid,status do próprioINSERT/UPSERT e exige a2.status==='confirmed' antes de alteraroriginal/RR/notificar. Reusa replacement_assignment_failed400. Não reativa cancelled/completed, não reseta checked_in/in_progress/checked_out, não altera políticas/roles/RLS/finance/capacidade/URLs/IDs. Exceção emdb.tenant causaROLLBACK doUPSERT; nenhum ACK/status inventado. Locks479/480, open-state/selfUUID/exigência pool/availability continuam.
JornadaHTTPPostgres adiciona2casos isoladosANTES da barreira: candidatojáconfirmadonojobcanceladoporAPIcompany ouconcluído pelolifecycleprofissional(checkin/start/checkout/complete), então selectesperado400 sem mudaroriginal/RR/notifications/earnings reais(snapshotantes/depois; incluindoledgerdo completed). Não escreve produção: somenteCIlocalhost/DBdedicada/actorsAPIfixture; pagamentos representacionais nãoPSP/dinheiroreal. Mantém TODAS asasserts existentes/barreira1winner/1closed e retry.
EsperadoCI own4/729/383/3=1119 +markers cancelado/concluído/concorrência e antigoHTTPfull. EstaexecuçãoHTTP aindaPENDENTE; node-check/bash-n eGREENlocalnão autorizammerge. APK N/A somenteescopo/API/test/HTTP/docs eblobsprotectediguais. Branchfix/replacement-confirmed-assignment-ack sobre480; integrarpredecessorapenasgreen depoisretargetmain/reconsultarfresco head/diff/bytes/pais/tree/CI own/post obrigatório. Não repetir479/480,sejámergedreconsultarprovas. Não removerassert pararesolverCI.

DVT ORIGINALv1.104/memória/checkpoint/ledger/registry INTEIROS atualizados nomesmo ciclo+evidência, prefixospredecessor preservados. React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone/desenho preservados. Físico/VisualTruth/E2E/SecureStore/piloto,pentestindependente,providersTRUST/PSPKYCsandbox/FIN-RISK/Webpago econtratos/dadospreferências/helpsemvínculo/ML/integrations OPENseparados. Sem custos/serviços/dinheiroreal/PSP/produçãoRailway/deploypago/segredos. Continuar auditoria cancelamento/lifecycle ecompatibilidade locks/criação,tarefas segurasindependentes; rotina nãofecha emfimrodada/parcial/transitório e não pedeCONTINUAR/alega24h.


## 2026-10-12 — substituição mobile: ACK exige UUID real e vínculo distinto
Base revalidada main510b2036b8229a21b1b7f5c836f39240fe6ba3ac/tree98d3dce68c680ed5777350e6fc9f0a0b17fa85f9. README aponta ORIGINALv1.104; DVT/memória/checkpoint/ledger/registry existentes lidos no SHA imutável e mantidos íntegros. PR482 painel jámerged, não repetir. PósCI48238190155860/job114620980999 SUCCESS4/729/383/3=1119, todos passos e HTTPPostgres primários. Pós48038186459872/job114609716511 SUCCESS4/729/382/3; pós48138186630833/job114610239999 SUCCESS4/729/383/3; não usar resultados próprios como pós-gates.
Falha reproduzida no helper real apps/mobile/lib/company-replacements.ts: requestReplacement aceitava id qualquer não vazio e selectReplacement aceitava assignmentId falso ou igual ao original, retornando true para operação que não provava nova substituição. Testes locais Node24 actualTS: RED10PASS2FAIL12→GREEN12/12. TODOS10tests/asserts antigos mantidos, somente fixtures positivas de ACK agora usam UUID conforme schema0011/0006. Novos2testes incluem espaços/nonstring/nãoUUID/sameoriginalUUIDcase, positivos lower/upper com letras, bindings exatos request/prof/original/status e apenas1POST, sem retry automático.
Patch mínimo valida somente IDs gerados no ACK: pedidoUUID e assignmentUUID distinto do original por comparação case-insensitive; não muta IDs de input/payload/ACK, nem rolesTEXT. Parsers de leitura/recomendações, APIs, layout/JSX, navegação, sessão/deadlines/estado incerto permanecem iguais. Localhelper/fixtures NÃO prova ReactNative render, transporte externo, SecureStore ou Android físico. CI próprio esperado4/731/383/3=1121 e APK standalone do NOVO head obrigatórios antes do merge; pósCI e pósAPK no merge real obrigatórios. Nenhum PASS antecipado, ZIPdigest não é APK individual.
Monitor Project Activity Watch: arquivo presente e permissões declaradas contents/actions/pull-requests read, issues write. Consulta REST actions/runs?event=schedule&per_page=100 retornou total_count0; lista geral recente não contém monitor. Isto não prova falha do cron nem execução/permissions runtime. Endpoint actions/workflows recusado pelo allowlist do conector; github_fetch aceita GET de runs, não dispatch e não existe ferramenta workflow_dispatch instalada. Consulta pública secundária Actions falhou DisabledError. Smoke da lógica será executado localmente com API/summary/clock fixtures; NÃO declarar execução agendada real a partir disso. Nenhum alerta Activity Watch aberto na consulta. Próxima ação: continuar consultando runs por event=schedule e workflow_dispatch/name, ler job/log/summary e issue reais quando aparecerem; não pedir ao usuário conferir nem disparar manualmente, não mudar serviço/custos.
Branchfix/mobile-replacement-ack-uuid: revisar bytes/diff/tree/modes/history, exigir CI+APK no próprioSHA, revalidar main/head/mergeable, merge sógreen, orderedparents/tree/main e pós-gates reais. Enquanto APK executa, auditar/testar monitor e interações cancelamento/lifecycle independentes; 0PRs não prova conclusão das13áreas.
React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone semMetro/desenho canônico preservados. Físico/VisualTruth/E2E/SecureStore/piloto, pentestindependente/providersTRUST/PSPKYCsandbox/FIN-RISK/Webpago e contratos/dados de preferências/helpsemvínculo/ML/integrations OPEN separados. Sem gastos/serviços/produção/Railway/PSP/dinheiroreal/segredos/deploypago. Rotina ativa; parcial/transitório/fimrodada não encerra projeto; semCONTINUAR nem promessa24h.


## 2026-10-12 — smoke do monitor e alerta além da primeira página
Project Activity Watch integrado #482/main510b2036b8229a21b1b7f5c836f39240fe6ba3ac; pósCI38190155860/job114620980999 SUCCESS1119/todossteps/HTTP. Lista REST de runs agendados event=schedule retornou0 (consulta02:44UTC), lista geral e issues abertas não mostraram execução/alerta do monitor. Endpoints workflows e ActionsHTML recusados pelo allowlist; conector GitHub oferece somenteGET runs e rerun de job existente, nenhuma ferramenta dispatch. gh CLI ausente; consulta pública secundária falhou DisabledError. Execução cron/runtime de issues: NÃO COMPROVADA, não conclusão nem diagnóstico de falha do workflow; não pedir usuário disparar/validar. Reconsultar event=schedule/workflow_dispatch/generalname e logs/jobs/summary/alerta reais nas próximas consultas.
Smoke executa JavaScript REAL extraído de .github/workflows/project-activity-watch.yml em node:vm com fixtures explícitas GithubAPI/summary/clock; nenhuma escrita ou notificação real, credencial/custo/prod/segredo. 5PASS1FAIL6 no código original: quando alerta único está no item101/página2, monitor sólêprimeiros100 e cria novo aviso. Corrigido usando github.paginate SOMENTEissues abertas e mantendo título/tempo15min/permissões/cron/concurrency/closecomment iguais. GREEN6/6 com abertura factual, alertaexistente semduplicação, closeemcommitrecente issueexata, exclusãoprópriorun/ACTIONSativo semafirmaragentetrabalhando, APIreadfailure semsummary/writes, paginação abertura/fechamento. Isto prova lógica localcomfixtures, NÃOcronreal/GITHUB_TOKENpermissions/notificação/renderSummary. Defeito reprodução determinística, não alegar queduplicação jáocorreu no repositório atual.
scripts/tests/project-activity-watch.test.mjs novo, execução adicionada ao Run tests daCI; demaissteps/gates/asserts/baseline íntegros. TotalCI esperadoapós483:4/731/383/3+6=1127. APKN/A paraesta correção de monitor somenteapóscompararTODOSmobile/packages/rootlock/build/smoke/pilotstandaloneworkflow blobs+modes idênticos àbase483 final; ci.yml sóacrescentaunitárioNode, projectwatch não compila/apk nemmudaReact/lock/Expo/Gradle. NovoCI próprio e pósCI noSHAreal necessários. Não emprestarAPK483 para alterar native depois.
Predecessor#483 drafthead61e34c6a599c5ad11eeca7fa69db737fbab1c2cf/tree80cbc8b016cd315285bea80909b56534de98a375, CI38197145030/APK38197144807 emexecução na consulta; NÃO PASS. Esta branch herda3arquivosmobilee5docsíntegros; PR basefix/mobile-replacement-ack-uuid para validar apenasmonitor, retargetmain SOMENTEapós483merged/gates, reconsultarhead/main/mergeable/diff/bytes/tree; nãointegrarantecessorpendente. Fimrodada/running nãofecha projeto; outrasáreas precisamaceitefactual.
DVT ORIGINALv1.104/memória/checkpoint/ledger/registry íntegrosnomesmociclo+evidência+paineloperacional atualizado, semsubstitutos. Runtimecron abertoindependente das13áreas. React19.1.4/RN0.81.6/frozenlock/RLS/standalone/desenho preservados; Androidfísico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSPKYCsandbox/FIN-RISK/Webpago/contratosdados OPEN separados. Sem novosgastos/provisão/PSP/produção/dinheiroreal/segredos. Continuarautônomo, semCONTINUAR/24h/fecharporparcial.


### Verificação efetiva do monitor sem dispatch manual
Esta correção também acrescenta preview read-only em pull_request restrito aos2paths monitor/teste, e execução normal em push da main restrita aos mesmospaths. É o MESMOworkflow Project Activity Watch, sem novaautomação/serviço/custo/provisionamento. Preview faz consultas reais de commit/main, PRs, Actions eissues e publica summary, mas retornaANTES de create/comment/updateIssue; cron/workflow_dispatch/push mantêm comportamento aprovado. Core.info registraACTIVITY_WATCH_OBSERVED comfatosidênticos ao summary eACTIVITY_WATCH_PREVIEW no_issue_writes=true; não tokens.
Acrescentados2testes: preview stale/recent comalertaexistente SEMescritas, pushcommitrecente semalerta inventado. GREEN8/8 local; CIesperado4/731/383/3+8=1129. Novohead exigepróprioCI + ProjectActivityWatch previewreal, lerlogsAPI/summaryfactseerro. Pushpósmergeexatoexecutaráworkflow completo apósalteração autorizada; NÃOequivaleprimeirocron, quecontinuaatéserobservadonomesmoevent=schedule. Permissõesread runtime serão comprovadas na execução real, writes permanecemsemprova se nenhumalertaconcreto demandado. Não abrir/fecharissueartificial sóparaexercerpermissão.


## 2026-10-12 — Web: leituras antigas não podem substituir contexto atual
Auditoria independente enquantoAPK483executa encontrou falha nos4useEffects de apps/web/app/page.tsx (dashboard, candidatos/recomendações, membros, candidatosdesubstituição). Promises antigas podiam sobrescrever dados após tenant/seleção/signout, catch antigo substituirerroatual e finallyantigo desligarloadingnovo; registros anteriores ficavam visíveis emfalha da nova leitura. RED4PASS5FAIL9 nos efeitos reais pré-JSX; GREEN9/9 após correção, mantendo integralmente4testes web-contract anteriores.
5regressões novas executam o source REAL antesdo JSX com stripTypeScriptTypes/node:vm, hooks/storage/fetch explicitamente simulados, helpers web-contract reais. Cobrem4áreas×late success/late HTTPfailure/signout/clear-currentfailure-explicitretry,3seleções no MESMOtenant e cabeçalhos reais tenant-b. Não érenderReactDOM/browser/sessionStorage real/produção/Android. Fixture usa IDs/nomes labels explícitos, nunca dados inventados no produto.
Correção mínima: cadaeffectmantémflaglocalcurrent, cleanupinvalidaresultado ao mudar dependência/desmontar. Limpa seus registros antesda nova leitura; then/catch efinallydo dashboard sópublicamquando current. Não abortarequisições antigas, não implementa deadline, não promete resolverfetchindefinido. TODOJSX da primeiraguarda if(!session)return atéfim ébyteigual; handlerssignin/signout/create/confirm/safety/teams/talents/replacement semmudança. Nenhuma açãoPOST/DELETE foi executada para teste nemse alteroupolíticadeescrita/ACK/roles/contratos/RLS. Recuperação de leitura explícita porrevisão/contexto permanece. Impacto internoWeb permitido; serviço/deployRailway eventualmente pago#224 continuaOPEN separado, semprovisão/custo.
Basebranch#484 headb78c749b24742126b73f2bc076db2694541e5da2/tree2154a2198615f2ba37a6f19d56806a04865c5601. EssaPRownCI38197598960/job114643661686 estáSUCCESS na consulta(metadata), logs/contagens exigidosantesmerge. MonitorPREVIEWREAL38197598983/job114643661949 SUCCESS noheadb78...todos3steps; log02:54:00.5808530Z ACTIVITY_WATCH_OBSERVED main510...estadoCI/ACTIONS emexecução/114min/2PR/3active, evento pull_request, eACTIVITY_WATCH_PREVIEW no_issue_writes=true. Publicousummary via core.summary.write na etapaaprovada, semconferênciaUIHTML alegada. Isto é execução efetiva read-only, NÃOcron e não comprova issueswrite. Runs event=schedule/workflow_dispatch0, nenhumalerta. Depoismerge484 verificarpushmonitornoSHA REALeCIconformeprópriosgates. Não exigir usuário dispararmanualmente; mesmoworkflow ganhoueventospreview/pushparaobservação autorizada.
Predecessor483 ownCI38197145030/job114642227976 SUCCESS4/731/383/3=1121, allsteps/2novosmarkers/fail0; ownAPK38197144807/job114642227163 passouBUILD e estásmokeAndroidna consulta, NÃO PASS. Nunca repetirmergequandoexecutado. EstaWebbranchbasewatchdependente sóretargetmainapós484integrada; diffpróprio8paths(page/test/evidência/5docscore); próprioCIesperado9/731/383/3+8=1134/todossteps/HTTP/monitorfixture, pósCI obrigatório. APK N/A SOMENTEhashes/modesmobile/packages/rootlock/nativebuild/smoke/standalonepilotworkflows idênticos àbase, nenhumsourceRNtocada; []nãoPASS.
DocumentosORIGINAISv1.104/memória/checkpoint/ledger/registry preservadosinteiros/prefixoliteral, evidênciamesmociclo. Apósgates/merges483–485 consolidarrecibosreais numPRdocsúnico, últimosrecibosnoPRbody/retomada semloopautorreferente. Próximaauditoria: mutations Webcontext/ACK/deadlines ecancelamentocriaçãoconcorrente, sóalterarbugreproduzido; semconclusãointegral13áreaspor0PR/issues. Manterrotinaativa atéaceitecomprovado, parcial/transitório/fimrodada nãofecha.
React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone/desenhocanônico preservados. Físico/VisualTruth/E2E/SecureStore/piloto,pentestindependente/providers/PSPKYCsandbox/FIN-RISK/Webpago econtratosdadospreferências/helpsemvínculo/ML/integrations OPENseparados. Semprodução/serviços/custos/PSP/dinheiroreal/segredos/deploypago. SemCONTINUAR/24h.


## 2026-10-12 — Web: formulário permanece disponível após resposta assíncrona
Falha reproduzida nos handlers REAIS createJob/createTeam/updateSafetyCase/updateSafetyAppeal de apps/web/app/page.tsx: após awaitmutate, usavam e.currentTarget.reset(). DispatcherReactDOM19.1.4 chama listener(event) e define event.currentTarget=null emseguida, fonteprimária lida viaGitHub https://github.com/react/react/blob/v19.1.4/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js functionexecuteDispatch. Isto é diferente de pooling; não afirmar queReact19 fazpooling. MesmoHTTPsucesso lançavaTypeError, exibiafalha eimpediareset/refresh.
4testes novos dehandlerspré-JSX/sourceREAL com hooks/transport/FormDataexplicitfixtures simulamclearing doevent.currentTarget depoisretorno dohandler eANTES de resolverpromise. RED9PASS4FAIL13→GREEN13/13, preservandoTODOS9anteriores/assertionsdecontrato/leiturastenant/select/signout. Cadaformcom201verifica1reset/1refresh/erroempty/loadingfalse/1POST/URL/tenant; com500verifica0reset/0refresh/erroHTTP500/1POST, semretryautomático. Nenhumaescritarealexterna/produção efetuada, nenhuma aparência oubrowserReactDOMreal alegado.
Correçãomínima captura constform=e.currentTarget ANTESdeawait, usaFormData(form) eresetformcapturado; alteraapenas4handlers, osoutrosigualbytes; TODOJSX/layoutigual, os4effects485inalterados. Nãoalterapayload/URLs/roles/autoridade/ID/ACK/FINRISK/regras/Retry/tenantRLS. Nãoendereça nestafatia osoutros possíveis resultadosincertos oudeadline dasmutationsWeb; próximositens exigemreprodução/dadossemcontrato inventado.
Base#485headfc2e308edba58932110bae25a2ba8ccacdc19c4e/tree7a03c695c2510a8049e84b1d50e540edbd99d305, próprioCI38198003282attempt1/job114644910774 FAILantesCheckout: Dockerpullpublic.ecr.aws/docker/library/postgres:17 toomanyrequests:Data limit exceeded. Logsprimários3pulls comprovamINFRA, nãoatribuircodetestcompile. Rerun somentejobsfalhos solicitado1vez; attempt2/job114645293186 iniciou/typecheck/build/export emexecução naúltimaconsulta. NãoPASSnemfalhatesteassumida, nãooutro rerunrunning. #485retargetmain após484merged.
#483MERGEDa05314e945f5e9edf3e82650d97e73e21275bd37 orderedparents[510b2036b8229a21b1b7f5c836f39240fe6ba3ac,61e34c6a599c5ad11eeca7fa69db737fbab1c2cf], tree80cbc8b016cd315285bea80909b56534de98a375=candidata/maincomprovada. OwnCI38197145030/job114642227976 SUCCESS4/731/383/3; ownAPK38197144807/job114642227163attempt1 SUCCESS/install02:59:15.1318407Z/smoke02:59:27.7529817Zmetrofalse/ZIP11724291281size28910995/digestsha256:9978ee19243d26f89b204ce84e5b676e9061d606954f1e5d2174620f7831ad52/expires2026-10-26T02:59:28Z,exacthead61e... . ZIPdigest nãoAPKindividual. PósCI38198075369/job114645120178 SUCCESS4/731/383/3 noSHAREALmergea053... . PósAPK38198075301 aindaemexecução, nãoPASS. Emulador≠físico.
#484MERGEDfea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30 orderedparents[a05314e945f5e9edf3e82650d97e73e21275bd37,b78c749b24742126b73f2bc076db2694541e5da2], tree2154a2198615f2ba37a6f19d56806a04865c5601=candidata/maincomprovada. OwnCI38197598960/job114643661686SUCCESS4/731/383/3+8=1129,todossteps; ownMONITORpreview38197598983/job114643661949SUCCESSreadAPI/summary/observedmain510.../2PR/3runs/pull_request/noissuewrites. JobGITHUB_TOKENpermissions primáriasActionsread/Contentsread/Issueswrite/PullRequestsread. Grantdepermissionnãoéwriteexercida. Próprio/pósnativeAPK484N/A231blobsmobile/packages/rootlock/nativebuild/smoke/pilotworkflowsiguais à483 comprovados; CI.yml alteraAPENASexecuçãotestesmonitornode, projectwatchalteraALERTA semcompilarnative. PósCI ePOSTmonitorpush484aindaadescobrir/acompanhar noSHAreal, cron0naúltimaconsulta nãoPASS.
EstaWebbranchbase485, próprioCIesperado13/731/383/3+8=1138, pósCI obrigatório; APK N/A SOMENTEprova nativehash/modesidênticos àmainprecedente; nãoemprestarAPKpara modificarinputnovo. Integrar485primeiro sógatesgreen/pósCI484, retargetestamain/revisarfreshdiff/bytes/modes/parents/tree/head/main; semrepetirmerges483484. Registrar todosrecibos nooriginal5docs/evidência porúnicaconsolidação apósgates, últimoPRdocbody/retomadasemloopautorreferente.
DVT ORIGINALv1.104/histórico/memória/checkpoint/ledger/registry preservadosinteirosnomesmociclo. React19.1.4/RN0.81.6/frozenlock/RLS/standalone/desenhocanônico preservados. Androidfísico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSPKYCsandbox/FIN-RISK/WebRailwaypago#224 econtratos/dados OPENseparados; nãohabilitarcustos/PSP/produção/serviços/dinheiroreal/segredos. Manterrotinaativa/alternativassegurassemCONTINUAR/24h;4entregastécnicasnãofecham13áreasintegralmente.

## Estado consolidado2026-10-12 —479–486 e correção do monitor

| PR | Merge real | Head aprovado | CI próprio | CI pós-merge real |
|---|---|---|---|---|
| #479 | 85fea5d911a6fab758669c9b950fb214ac0190ef | 1ce72d4de424183c875d68645ea452728007dabb | 38185492065/job114606794588/attempt1 SUCCESS 4/729/382/3 | 38185785746/job114607681110/attempt1 SUCCESS 4/729/382/3 |
| #480 | 4cf88daa9e9d4d9be1aeb23e99edc6a631037ec1 | 87f4720e2dfdc018cfa094d926bdaafc940b0540 | 38186117528/job114608677326/attempt1 SUCCESS 4/729/382/3 | 38186459872/job114609716511/attempt1 SUCCESS 4/729/382/3 |
| #481 | 99f4509241755f7e51b8771e59470e43eef98a2d | 52bed1cb0d0d115b537553dc7ae052c31eff41ee | 38186207904/job114608953220/attempt1 SUCCESS 4/729/383/3 | 38186630833/job114610239999/attempt1 SUCCESS 4/729/383/3 |
| #482 | 510b2036b8229a21b1b7f5c836f39240fe6ba3ac | 50c5ec4fe46fda204e359fe1d1dd58f7e1028fb0 | 38189224586/job114618165842/attempt1 SUCCESS 4/729/383/3 | 38190155860/job114620980999/attempt1 SUCCESS 4/729/383/3 |
| #483 | a05314e945f5e9edf3e82650d97e73e21275bd37 | 61e34c6a599c5ad11eeca7fa69db737fbab1c2cf | 38197145030/job114642227976/attempt1 SUCCESS 4/731/383/3 | 38198075369/job114645120178/attempt1 SUCCESS 4/731/383/3 |
| #484 | fea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30 | b78c749b24742126b73f2bc076db2694541e5da2 | 38197598960/job114643661686/attempt1 SUCCESS 4/731/383/3/8 | 38198337936/job114645925692/attempt1 SUCCESS 4/731/383/3/8 |
| #485 | 73f523be05d8042cff871ed776a52fd61c95995b | fc2e308edba58932110bae25a2ba8ccacdc19c4e | 38198003282/job114645293186/attempt2 SUCCESS 9/731/383/3/8 | 38198605205/job114646745687/attempt1 SUCCESS 9/731/383/3/8 |
| #486 | 41d5165194a70a4a5bfdb0d3d4b90431fc533c9b | 1f36dd1081be42899beccecf0a15bc7b8e1ee3ef | 38198471412/job114646330881/attempt1 SUCCESS 13/731/383/3/8 | 38198920578/job114647714446/attempt1 SUCCESS 13/731/383/3/8 |

Main funcional 41d5165194a70a4a5bfdb0d3d4b90431fc533c9b/tree910e637b49b90834ad3306c41d053f4d5b6b943e. Todos próprios/pósCI reais aprovados; APK483 próprios/pós aprovado no SHA exato, instalação e smoke semMetro e ZIP não expirado. Ordered parents/tree/candidata/main de cada integração conferidos. Recibos completos: docs/evidencias/AUTONOMOUS_CYCLE_RECEIPTS_479_486_2026-10-12.md. Histórico integral preservado; snapshots pending são substituídos por estas provas. Não repetir merges479–486.

## Provas e limites
Os PRs479–482 pertencem aos ciclos anteriores; foram revalidados para consolidar seus recibos, sem anunciar essas correções como novas entregas. 483 rejeita ACKs com ID não UUID ou assignment original. 484 pagina issues e acrescenta smoke, preview PR sem escritas e execução normal no push. 485 isola as quatro leituras Web em troca de empresa/seleção/logout. 486 captura o formulário antes de await para quatro handlers. Testes locais executam os helpers/handlers/scripts reais com fixtures explícitas, não render real ReactDOM/RN ou execução física. CI mantém os contratos HTTP/Postgres, migrações, RLS/privacy/readiness e todos os gates anteriores.
CI485 attempt1/job114644910774 falhou antes de Checkout: Docker pull public.ecr.aws/docker/library/postgres:17 retornou toomanyrequests: Data limit exceeded em três tentativas. Um rerun apenas de jobs falhos foi autorizado pela API; attempt2/job114645293186 PASS no mesmo head. Não foi falha de teste/app; nenhum assert ou gate foi removido. Não repetir rerun de run já aprovado.
APK483 próprios e pós-merge SUCCESS com instalação e DEVICE_SMOKE_OK metro_required=false, ZIP não expirado e head_sha exato (metadados integrais nos recibos JSON). ZIP digest não é hash do APK individual. Own checkout90f0068fd7c52ea009c7f14330dd90853835e3b9 é refs/pull/483/merge sintético: pais[510b2036b8229a21b1b7f5c836f39240fe6ba3ac,61e34c6a599c5ad11eeca7fa69db737fbab1c2cf], tree80cbc8b016cd315285bea80909b56534de98a375 igual à candidata e merge real. Não alegar BUILD_INFO head literal. Emulador não é físico.
484 APK N/A:231 blobs mobile/shared packages/root lock/native build/smoke/pilot workflows iguais à483; CI.yml só adiciona execução de teste Node e Project Activity Watch não compila native. 485 também231 inputs native iguais;486 todos447 blobs não-docs da base são iguais, exceto a página Web (e novo teste). Nenhum APK de outro head usado para autorizar alteração de código mobile. Diffs antigos479–482 não alteram mobile/shared dependencies/root locks/build/smoke/standalone workflow, conforme paths registrados.
Monitor preview REAL38197598983/job114643661949 no headb78c749b24742126b73f2bc076db2694541e5da2:02:54:00.5808530Z observou main510...,114min,2PRs,3Actions,event=pull_request e no_issue_writes=true. Monitor pós-merge REAL38198337977/job114645926135 no SHAfea3ce0ad1c9c1b9804ebd8d0a4a0144a896ab30:03:04:56.2672067Z observou essa main,age0,1PR,3Actions,event=push. Etapas/logs aprovados; core.summary.write executada, sem alegação de leitura da UI HTML. GITHUB_TOKEN grant Actionsread/Contentsread/Issueswrite/PullRequestsread consta dos logs. Grant de Issueswrite não comprova operação de escrita; não criar alerta artificial.
Cron e dispatch retornaram0 na consulta mais recente. Execução agendada ainda NÃO COMPROVADA; isso não prova falha do cron. Endpoint actions/workflows bloqueado pelo allowlist do conector; disponível GET actions/runs e rerun de job existente, nenhuma ferramenta dispatch. gh CLI ausente; ActionsHTML/consulta pública secundária falhou DisabledError. A solução autorizada acrescentou eventos preview read-only PR e push ao MESMO workflow, sem nova automação/serviço/despesa. Estes eventos provaram execução efetiva das APIs e summary, nunca agente programando ou cron preciso/24h.

## Correção adicional do monitor: distinguir issue de PR
A resposta real IssuesAPI desta rodada inclui485/486 com campo pull_request. O monitor procurava só título: um PR homônimo podia esconder o alerta ou receber comentário/fechamento. Duas regressões do script real com fixtures explícitas: RED8PASS2FAIL10 (stale não cria issue, recent produz duas escritas no PR) → GREEN10/10 com filtro !i.pull_request antes do título. Todos oito testes anteriores preservados. Não alegar que um PR real foi fechado; não criar issue/PR homônimo artificial.
Esta correção e a consolidação de recibos integram o mesmo PR, com código/teste/evidência e cinco documentos originais completos. CI esperado13web/731mobile/383API/3CLI +10monitor=1140 e preview real no novo head obrigatórios antes de merge; pósCI/push monitor no SHA real obrigatórios. APK N/A só após comparar native inputs/modes iguais. O último recibo do próprio PR ficará no PR body e checkpoint de retomada, sem loop autorreferente de commits.

## Continuidade por áreas
Estes contratos e correções não comprovam aceite integral das13áreas. Telas/navegação mantêm CompanyNav e início profissional com APIs/estados, mas Visual Truth completo continua aberto. Auth/agenda/jobs/company/teams/candidates/matching/payments/notifications/privacy/RLS têm contratos HTTP/Node/Postgres, não E2E físico ou prova completa de todos os estados. Web ganhou proteção de leituras e formulários; não recebeu deploy pago.
Próximas ações concretas: reproduzir ACK indevido em WebcreateJob (mutate genérico aceita qualquer JSON2xx), confrontar o contrato real CompanyJobs antes de corrigir; auditar contexto de writes após await e deadlines/recuperação das leituras Web. Backend criação de substituição versus cancelamento/lifecycle precisa prova concorrente antes de patch. Não refazer485/486, não inventar validação global/contrato/dados ou usar0PRs/issues como conclusão. Referência original→rotas/API/dados/estados/testes é a base dos aceites.
React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone semMetro/desenho canônico preservados. Android físico/E2E/VisualTruth/SecureStore/piloto, pentest independente, providers/TRUST, PSP/KYC sandbox/FIN-RISK e WebRailway pago#224 continuam OPEN separados; preferências/helpsemvínculo/ML/integrations dependem contrato/dados. Sem serviços/custos/produção/PSP/dinheiro real/segredos/deploy pago. Manter a rotina ativa; parcial/transitório/fim de rodada não encerra projeto. Não exigirCONTINUAR nem alegar24h.


## 2026-10-12 — publicação Web exige recibo compatível e preserva formulário incerto
Main revalidadab16fd677bd0b853b97f81e8a660ec0318366dcb4/tree2f14715d56751cea93a7cad035a8717606cec750, PR487 jámerged, não repetir. PróprioCI38199412553/job114649245800 SUCCESS13/731/383/3+10=1140 nohead549e2642b8b2985cb7e3132596f7bc2ae7216537. PróprioProjectWatchpreview38199412549/job114649245878 SUCCESS/03:21:16.7193522Z main41d...7min/1PR/1run, no_issue_writes=true. PósCI38199681077/job114650083177 SUCCESS13/731/383/3+10 noREALmergeSHAb16fd677bd0b853b97f81e8a660ec0318366dcb4. Pósmonitor38199681085/job114650083321 SUCCESS/03:25:29.7820591Z observouessaMAIN/age0/0PR/1run,eventpush, etapas/log/summary real. Orderedparents[41d5165194a70a4a5bfdb0d3d4b90431fc533c9b,549e2642b8b2985cb7e3132596f7bc2ae7216537], tree2f14715d56751cea93a7cad035a8717606cec750=candidata/main comprovada; revisão9paths/bytes e447blobsnonDocs fora2monitorpaths iguais; APKN/AinputsNativeiguais. Cron ainda0naúltimaconsulta, não dizercron passou; alertas reais ainda nenhum. Recibo completo487 no PRbody e abaixo, sem commit autorreferente.
Nova falha reproduzida em createJob real: mutate genérico aceitavaqualquerJSON2xx, limpavaformulário/refrescava como se criação fosse confirmada com{id:'fake'} ouUUID/title incompatível. Baseline handler+novosoráculos: RED16PASS1FAIL17; GREEN17/17 após. Todos13tests/asserts anteriores preservados; fixture positiva do createJob agora ACK conformeAPI (UUID,campos,open,gig), demaisforms iguais. 3tests novos validam helper,1test handler real; fixtures explicam hooks/fetch/FormData/eventcurrentTarget e usam web-contract real. NÃO renderbrowser/ReactDOM/produção.
Contrato verificado no código REAL apps/api/src/company-job-create.controller.ts: title.trim, requiredRole.trim||title, location/workCity.trim||null, payCents??0, engagementModality??gig, timestampsabsolutos/statusopen eUUIDgerado. Não imporcidadeobrigatória como noformmobile: Web/APIaceitamnullable. Helper novo apps/web/app/job-publication.ts validaACKcomUUID eTODOScamposcontratuais do pedido, não muda payload nem normaliza IDs enviados. Retorna created/rejected4xx/unknown5xx/network/JSON/malformed2xx; nãoautorreenviaPOST. ErrosHTTPexplicitose500preservamfeedbackanterior; ACKincerto mostra publicação não confirmada/dadosmantidos/conferirvagasantesdenovoenvio. Não declarar quePOSTnãofoienviado nemqueUUIDregex comprovaexistênciaporSQL; cadeiaAPI+camposéautoridade.
SomentecreateJob muda;3outrosformhandlers e4effects de485/486 preservados. Novo botãoWeb secundário Atualizar dados incrementa somente revision, efetuandoleituras jáexistentes; disabledloading, semPOST automático/retrydemutação/novospapéis. Permiteconferênciaexplícita apósrespostaincerta. Mobile/desenhocanônicoRN inteiroinalterado; Webalteração visual restrita aessecontrole, semclaimderender/aceitevisualintegral.
Source/types/tests/fixture/evidência e5docsORIGINAISv1.104/memória/checkpoint/ledger/registry íntegrosnomesmociclo. ExigirCIpróprioNOVOhead esperado17web/731mobile/383API/3CLI+10monitor=1144, typecheck/build/Next/export/migrations/privacy/HTTPPostgres/todossteps e pósCIrealSHA. APK N/A SÓhash/modesNativeigual eworkflowbuild/smoke/lock/RN iguais, não []comoPASS. Branchfix/web-job-publication-ack: revisar diff/bytes/tree/modes/fullhistory, main/head/mergeable eexpectedhead; mergeapenasgatesgreen, orderedparents/tree/main/postCI; não emprestar487para488.
Próximo apósgate: sessão/contexto de mutations Webapósawait e prazo/recuperaçãodasleituras, ACKs deequipes/safety/substituição conformecontratosreais, concorrência criação deRR vs cancel/lifecycle. Apenasfalhasreproduzidas; preferências/helpsemvínculo/ML/integrations precisamcontrato/dados. Nãofechar13áreasporunitcount/0PR/issues, não repetirACK/proteção/formleitura jácorrigidos. React19.1.4/RN0.81.6/frozenlock/tenantRLS/standalone semMetro preservados; físico/E2E/VisualTruth/SecureStore/piloto,pentest/providers/PSPKYCsandbox/FIN-RISK/WebRailwaypago OPEN separados. Semgastos/provisão/serviços/PSP/dinheiroreal/produção/segredos/deploypago; manterrotinaativa/nãoCONTINUAR/não24h/fimrodada/parcial/transitório nãofecha.

### Recibo primário487
```json
{
  "merge": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
  "parents": [
    "41d5165194a70a4a5bfdb0d3d4b90431fc533c9b",
    "549e2642b8b2985cb7e3132596f7bc2ae7216537"
  ],
  "tree": "2f14715d56751cea93a7cad035a8717606cec750",
  "head": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
  "ci": {
    "run": 38199412553,
    "sha": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "job": 114649245800,
    "attempt": 1,
    "counts": [
      13,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "preview": {
    "run": 38199412549,
    "job": 114649245878,
    "sha": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "event": "pull_request",
    "success": true,
    "markers": [
      "2026-10-12T03:21:16.7193522Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"41d5165194a70a4a5bfdb0d3d4b90431fc533c9b\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":7,\"openPrs\":1,\"activeRuns\":1,\"event\":\"pull_request\"}",
      "2026-10-12T03:21:16.7195998Z ACTIVITY_WATCH_PREVIEW no_issue_writes=true"
    ]
  },
  "review": {
    "base": "41d5165194a70a4a5bfdb0d3d4b90431fc533c9b",
    "head": "549e2642b8b2985cb7e3132596f7bc2ae7216537",
    "tree": "2f14715d56751cea93a7cad035a8717606cec750",
    "paths": [
      ".github/workflows/project-activity-watch.yml",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/AUTONOMOUS_CYCLE_RECEIPTS_479_486_2026-10-12.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/operacao/PAINEL_ATIVIDADE_GITHUB.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
      "scripts/tests/project-activity-watch.test.mjs"
    ],
    "bytesVerified": 9,
    "history": true,
    "unchangedNonDocs": 447,
    "apk": "N/A native inputs unchanged"
  },
  "postCI": {
    "run": 38199681077,
    "sha": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "job": 114650083177,
    "attempt": 1,
    "counts": [
      13,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "postMonitor": {
    "run": 38199681085,
    "job": 114650083321,
    "sha": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "event": "push",
    "markers": [
      "2026-10-12T03:25:29.7820591Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"b16fd677bd0b853b97f81e8a660ec0318366dcb4\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
    ],
    "success": true
  }
}
```

## Web: prazo e recuperação de leituras — 2026-10-12

Base verificada d43e3f31902c59a9e52a684aeca0e4794859d471 (PR #488 já integrado; não repetir merge). README e os cinco documentos originais íntegros foram reconsultados nesta base. A observação anterior mostrou dashboard com 12 requests pendentes/loading true e zero deadlines; candidatos 2, membros 1, substitutos 1, também sem prazo. Cinco regressões dos efeitos reais pré-JSX reproduziram RED 17 PASS / 5 FAIL (22 testes Web); após correção, GREEN 22 PASS / 0 FAIL, mantendo os 17 testes e seus asserts existentes. Relógio e transporte são fixtures determinísticas, sem alegar espera real de 15s, navegador renderizado ou aparelho físico.

apps/web/app/page.tsx agora limita cada uma das quatro leituras a 15000ms, incluindo fetch e leitura JSON. Expiração invalida a resposta para publicação de estado, mostra mensagem factual de tempo expirado/Atualizar dados e encerra loading do dashboard. Respostas/erros tardios não sobrescrevem dados, erros ou loading de uma nova leitura. Cleanup por empresa, seleção, sessão, revision ou unmount invalida e remove o timer; sucesso/falha também remove o timer. Não alegar aborto/cancelamento físico da rede: a requisição pendente pode continuar; o efeito expirado não publica. Não alterar POST/DELETE/login/payload/ACK/forms/tenant/roles; nenhuma repetição automática de escrita. Recuperação é uma nova leitura pelo controle Atualizar dados já existente, nunca confirmação fictícia de dados.

Regressões cobrem as quatro leituras: fetch pendente, JSON pendente, sucesso/erro tardios, retry explícito, cleanup com callback já capturado (empresa/seleção/signout), remoção de timers após sucesso e HTTP500. Fixture de timer adicionada ao harness existente sem retirar asserts/controles. JSX existente é preservado neste PR, assim como os demais handlers. Não representa aceite visual/E2E integral das 13 áreas.

Evidência: docs/evidencias/WEB_READ_DEADLINE_RECOVERY_2026-10-12.md. Código + regressões + evidência + DVT ORIGINAL v1.104/memória/checkpoint/ledger/registry no mesmo ciclo, apêndice sem substituir histórico. CI novo head esperado 22 Web + 731 mobile + 383 API + 3 CLI + 10 monitor = 1149, todos steps/typecheck/build/export/migrations/privacy/HTTP Postgres e pós-CI no merge SHA real. APK N/A apenas após identidade de todos blobs/modes nativos/dependências/lock/build/workflow/smoke comprovada; []/running não são PASS. Branch fix/web-read-deadline-recovery-20261012, PR/gates ainda pendentes neste snapshot; recibo final será no corpo do PR/checkpoint de continuidade, sem commit de metadados autorreferente.

Monitor: última execução real confirmada Project Activity Watch push 38199681085/job114650083321 em b16fd677bd0b853b97f81e8a660ec0318366dcb4 SUCCESS, ACTIVITY_WATCH_OBSERVED 2026-10-12T03:25:29.7820591Z, age0/openPrs0/activeRuns1. Consulta atual por event=schedule retornou zero runs, não prova falha nem execução do cron. Sem novo alerta aberto na consulta atual; permissions Issues write concedida não prova escrita quando não necessária. O workflow não muda nesta tarefa.

Próxima auditoria segura após gates: contexto de sessão/empresa das mutations Web após await, ACKs de equipes/safety/substituição conforme contratos atuais e concorrência de criação de replacement/cancelamento/lifecycle. Reproduzir falha antes de modificar; não inventar correção/atividade nem regras de negócio. Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST providers, PSP/KYC sandbox/FIN-RISK e Web Railway com eventual custo continuam OPEN separados (#215/#219/#220/#224/#228). React19.1.4/RN0.81.6/frozen lock/RLS/standalone sem Metro preservados; sem produção direta/serviços/custos/PSP/dinheiro real/segredos/deploy pago. Rotina ativa; fim de rodada/bloqueio parcial não fecha o projeto nem exige CONTINUAR; não alegar execução contínua 24h.

### Recibo final #488 (consulta factual, histórico integral)
```json
{
  "merge": "d43e3f31902c59a9e52a684aeca0e4794859d471",
  "parents": [
    "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "3e35ba395101ae6c24ae395905059284fb5bbf66"
  ],
  "tree": "f273f11ad44ffb1984673a60b2e09fd311d4722f",
  "head": "3e35ba395101ae6c24ae395905059284fb5bbf66",
  "ci": {
    "run": 38200188082,
    "sha": "3e35ba395101ae6c24ae395905059284fb5bbf66",
    "job": 114651648544,
    "attempt": 1,
    "counts": [
      17,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "review": {
    "base": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "head": "3e35ba395101ae6c24ae395905059284fb5bbf66",
    "tree": "f273f11ad44ffb1984673a60b2e09fd311d4722f",
    "paths": [
      "apps/web/app/job-publication.test.ts",
      "apps/web/app/job-publication.ts",
      "apps/web/app/page.tsx",
      "apps/web/app/web-form-target.test.ts",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/evidencias/WEB_JOB_PUBLICATION_ACK_2026-10-12.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md"
    ],
    "bytesVerified": 10,
    "history": true,
    "unchangedNonDocs": 447,
    "apk": "N/A all native inputs unchanged"
  },
  "apk": "N/A all native inputs unchanged",
  "postCI": {
    "run": 38200543524,
    "sha": "d43e3f31902c59a9e52a684aeca0e4794859d471",
    "job": 114652746016,
    "attempt": 1,
    "counts": [
      17,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "nextReadDeadlineObservations": [
    {
      "label": "dashboard",
      "pendingRequests": 12,
      "registeredDeadlines": 0,
      "error": "",
      "loading": true
    },
    {
      "label": "candidates",
      "pendingRequests": 2,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    },
    {
      "label": "teamMembers",
      "pendingRequests": 1,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    },
    {
      "label": "replacementCandidates",
      "pendingRequests": 1,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    }
  ]
}
```

## Web: confirmação contratual de criação de equipe — 2026-10-12

Predecessor funcional PR #489/head 5889221a5a415318add6e31acf8e3501cc4c88fa/tree85af7eaeae821efb6cc7df7b7f990b320bbc897c: prazo das quatro leituras Web, CI38201650457 ainda EM EXECUÇÃO neste snapshot, não PASS. Esta preparação é independente de regras novas de negócio; integração exige primeiro o predecessor e seus gates. Documento ORIGINAL integral, memória/checkpoint/ledger/registry preservados por apêndice.

Falha reproduzida no handler real createTeam: HTTP201 com {id:'fake'} limpa form e incrementa revision sem confirmar a equipe criada; regressão nova RED22PASS/1FAIL de23. Contrato existente apps/api/src/teams.controller.ts create autentica/membership antes de validação, exige name:string.trim não vazio e retorna SQL RETURNING id,name com name.trim. Nenhuma alteração no backend/mobile/roles/RLS/SQL.

Novo apps/web/app/team-publication.ts usa apenas esse contrato: confirmação exige UUID do ACK e nome igual ao name.trim enviado; payload é mantido, sem adicionar tenantId/ID/normalizações à escrita. ACK ausente/fabricado/divergente, perda de JSON ou transporte permanecem unknown; 4xx rejected, 5xx unknown com HTTP explícito preservado. Não declarar inexistência de escrita quando retorno perdido, não auto-repetir POST. Handler guarda o form em resultado incerto e orienta Atualizar dados/conferir equipes antes de qualquer novo envio. Resultado válido limpa o form uma vez e dispara leitura existente. Campos de vaga/safety e seus ACKs, quatro efeitos de leitura/JSX/login/DELETE/RN intactos.

Regressão do handler + três testes do helper: GREEN26PASS/0FAIL. Todos22 testes/asserts anteriores preservados; somente fixture positiva createTeam foi ajustada ao ACK real UUID+nome (antiga id fixture-ack incompleta). Cobertura de trim/payload por referência, nomes diferentes, UUID inválido/whitespace, JSON inválido/nulo/array, HTTP400/401/403/429/500 e perda de transporte/JSON com uma única chamada. Não é navegador renderizado, SQL real deste teste, nem E2E/aparelho físico. Testes HTTP Postgres existentes da API continuam no CI.

Código/helper/testes/evidência docs/evidencias/WEB_TEAM_PUBLICATION_ACK_2026-10-12.md e cinco documentos originais no mesmo ciclo. CI esperado26Web/731mobile/383API/3CLI/10monitor=1153, todos steps/typecheck/build/export/migrations/privacy/HTTPjourney e pós-CI real. APK N/A exige prova de identidade SHA/modes de todos inputs native/deps/workflows/build/smoke, jamais pela ausência de run. Branch fix/web-team-publication-ack-20261012; own/merge/post pendentes neste snapshot. Revalidar base main após489 e diff/bytes/modes/ancestral/tree; merge somente green no head exato; registrar recibo real no PR e continuidade sem loop de commits de metadados.

Próximas alternativas seguras: contexto de mutations após await/troca sessão/empresa; ACKs de membership/substituição/safety conforme contrato atual; concorrência RR/lifecycle/cancel. Reproduzir causa-raiz antes de novo código; não inventar tarefas. Monitor source inalterado: execução push487 comprovada, cron ainda não comprovado, [] não falha/PASS. Preservar gates OPEN separados físico/VisualTruth/E2E/SecureStore/piloto/pentest/providers/PSP-KYC/FIN-RISK/Web pago e proibições de custo/segredo/PSP real/produção/deploy pago. Projeto não concluído por0PR; rotina ativa sem CONTINUAR/sem alegar24h contínuo.

## Web: ACK de revisão de segurança — 2026-10-12

Base funcional PR #490/head9ead8ad37dba3f03362d4792d6154cc9c94f105e/tree29684e78d4535a1cdbc83bb0d9209078cbaf1cd6. Próprios/post gates490 ainda pendentes neste snapshot; integração exige predecessor validado. #489 já MERGED09b2d029c92aa1c783ce759c6f553f09b7685d5f/pais[d43e3f31902c59a9e52a684aeca0e4794859d471,5889221a5a415318add6e31acf8e3501cc4c88fa]/tree85af7eaeae821efb6cc7df7b7f990b320bbc897c igual candidato/main confirmada. OwnCI38201650457/job114656159008 SUCCESS22/731/383/3/10=1149, todos steps/HTTP Postgres; postCI38201962169 EM EXECUÇÃO, não PASS neste snapshot. Não repetir merge489.

Falha reproduzida nos handlers reais updateSafetyCase/updateSafetyAppeal pré-JSX: ambos limpam o formulário e incrementam revision após HTTP201 com ACK sem ID/status/changed correspondentes. Duas regressões reais RED26PASS/2FAIL(28). Após helper/integração + três testes contratuais: GREEN31PASS/0FAIL; 26 testes/asserts anteriores mantidos. Fixtures positivas de safety agora usam UUID realista em caseId/appealId/path e ACK canônico id/status/changed:true, sem retirar assert de POST, tenant, reset uma vez/revision/falha500.

Contratos consultados na main: SafetyAdminController.status retorna id,status,resolvedAt,changed:true ou changed:false no replay mesmo status; SafetyAppealsAdminController.status retorna id,status,changed:true/false após advisory lock/transição existing. Novo helper confirmSafetyStatus confirma somente ID UUID exato ao enviado, status exato e changed booleano; aceita changed:false como confirmação idempotente. Não criar política de transição/novos roles/estatísticas/SQL, não afirmar validação de todos campos como resolvedAt. Autenticação owner/admin e payload/status/note/paths/headers da UI permanecem iguais; backend/RLS/locks/policies intactos. ErroHTTP400/401/403/404/409/429/500 explícito preservado; ACK incerto/perdaJSON/network é unknown, form mantido e consulta explícita via Atualizar dados antes de novo envio. Sem retry automático ou afirmação de que não houve escrita.

Somente dois handlers de safety + import/helper/testes; JSX/quatro efeitos/handlers restantes inclusive vaga/equipe/login/DELETE inalterados. Testes helper usam transporte determinístico, não SQL real/browser renderizado/físico. As jornadas HTTP Postgres e demais testes API existentes seguem obrigatórios no CI.

Evidência docs/evidencias/WEB_SAFETY_STATUS_ACK_2026-10-12.md, código/regressões e cinco documentos ORIGINAIS íntegros no mesmo ciclo por apêndice, sem substituição de histórico. Branch fix/web-safety-status-ack-20261012; CI esperado31Web/731mobile/383API/3CLI/10monitor=1158, todos steps/build/typecheck/export/privacy/migrations/HTTP e pós-CI real. APK N/A somente identidade de SHA/modes de inputs nativos/deps/workflow/build/smoke. Own/predecessores/merge/post pendentes não são PASS; recibo primário completo será PRbody/checkpoint de continuidade sem loop de commits de metadados.

Próximas frentes internas: contexto de mutations após await/troca sessão/empresa; ACKs de membros/confirm/substituições com contrato real; concorrência RR/lifecycle/cancel. Reproduzir falha antes de modificar. Monitor última execução push487 comprovada; cron ainda sem run localizado, nunca confundir configuração com execução; sourceunchanged. Físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSP-KYC/FIN-RISK/Webpago permanecem OPEN separados; React19.1.4/RN0.81.6/frozenlock/RLS/standalone semMetro preservados. Sem serviços/custo/credenciais/dinheiroreal/PSP/produção/deploypago. SemCONTINUAR/não24hcontínuo/rotinaativa até aceiteintegral ou ordemexpressa.

### 2026-10-12 — isolamento de contexto nas mutações Web da empresa (PR #492)

- A reprodução comportamental no código integrado por `d65e3a86484df72319a8b0ed8db44a5856d775ba` confirmou que respostas tardias de quatro mutações (`createJob`, `createTeam`, `updateSafetyCase` e `updateSafetyAppeal`) ainda conseguiam publicar `HTTP 500` e encerrar o estado de carregamento depois da troca de `tenant-a` para `tenant-b`.
- A revisão da mesma família encontrou sete operações com o mesmo risco: adicionar/remover membro, confirmar candidato, solicitar/selecionar substituição e adicionar/remover profissional do talent pool.
- A correção instala uma chave de contexto baseada em token, identidade, tenant e papel por `useLayoutEffect`, invalida-a no cleanup e só publica sucesso, erro, refresh ou término de loading se a resposta ainda pertence ao contexto ativo. O ciclo cleanup/setup do Strict Mode preserva o contexto atual.
- A escrita que já chegou ao servidor não é cancelada nem repetida. Payloads, cabeçalhos, autoridade, ACKs canônicos, idempotência, rotas, RLS e política de tenant permanecem inalterados.
- Regressão local: 27 cenários novos cobrem falha/sucesso tardios, troca de tenant/token/papel, logout, desmontagem e replay de Strict Mode; a suíte Web completa passou com **58/58** testes.
- Escopo funcional: `apps/web/app/page.tsx`, `apps/web/app/web-form-target.test.ts` e ajuste de fixture em `apps/web/app/web-read-context.test.ts`. Entradas Android/native, dependências, lockfile, workflows, build e smoke permanecem byte a byte idênticas à base; APK é **N/A por identidade de árvore**, não por ausência de execução.
- Os recibos exatos de head, árvore, CI próprio, merge e pós-CI serão mantidos no corpo do PR #492; `queued`, `running` ou resposta vazia não serão tratados como aprovação.
- Próxima auditoria interna: reproduzir antes de alterar qualquer concorrência restante em login/logout, membership, confirmação/substituição e lifecycle/cancelamento. Preferências, help sem vínculo, previsão e integrações continuam sem política inventada.

### 2026-10-12 — propriedade da sessão no login e saída local imediata da Web

- Na `main` `28c17ad558803bee566fd4594ba4e1e193633a8f`, cinco regressões comportamentais executando os handlers reais pré-JSX reproduziram: resposta antiga de login substituindo uma sessão mais nova; falha antiga publicando erro e encerrando loading da sessão atual; resposta de login persistindo sessão após desmontagem; e logout mantendo token/sessão local enquanto a revogação remota estava pendente ou falhava.
- Resultado RED: **58 testes anteriores passaram e 5 novos falharam**. A correção mínima terminou com **63/63 PASS** localmente.
- `signin` agora atribui geração monotônica a cada tentativa e só persiste sessão, publica erro ou encerra loading quando a tentativa ainda é a mais recente e o componente permanece montado. A resposta anterior não ganha autoridade sobre a tentativa posterior.
- `signout` invalida tentativas de login, remove imediatamente a sessão da aba e limpa integralmente os dados/seleções/feedback locais antes de solicitar, em melhor esforço e sem retry automático, a revogação remota com o token capturado. Falha ou demora de rede não restaura a sessão nem bloqueia a saída local.
- O endpoint, método, header Bearer, payloads, filtro de papéis empresariais, tenant/RLS, armazenamento por aba, APIs e backend permanecem inalterados. A correção não afirma revogação remota quando o transporte falha e não representa browser E2E, dispositivo físico ou produção.
- Escopo funcional: `apps/web/app/page.tsx` e novo `apps/web/app/web-auth-context.test.ts`. Entradas Android/native, dependências, lockfile, workflows, build e smoke permanecem candidatas a APK **N/A por identidade de árvore**, a comprovar na revisão do PR.
- Project Activity Watch: a primeira execução agendada real `38217445193`/`114705385578` passou e abriu corretamente o alerta #493 ao observar 146 minutos sem commit. O alerta não prova agente parado e deve ser comentado/fechado pelo próprio monitor após detectar novo commit na main.
- Próxima auditoria segura após os gates: concorrência de criação de substituição versus cancelamento/lifecycle e contratos reais de ACK de membership/substituição. Corrigir somente falha reproduzida; não inventar políticas para preferências, ajuda, previsão ou integrações sem contrato/dados.

### 2026-10-12 — serialização de criação de substituição e cancelamento

- Base revalidada: `main` `10fc12c47f515dc38cf3bd0a8985b53754bfc364`, sem PR anterior pendente. README, DVT ORIGINAL, memória, checkpoint, ledger, registry, código e gates de #494 foram lidos sem repetir merge.
- A fixture HTTP/Postgres do PR #495 bloqueou apenas o INSERT de `replacement_requests`, deixou o cancelamento concluir e liberou a criação. CI RED `38238401435`/`114774652060`: todos os passos anteriores passaram, mas a jornada observou assignment `cancelled` com pedido ainda `open` e falhou no assert terminal `cancelled`.
- A correção usa ordem única `assignment → replacement request` para criação, seleção e cancelamento, com `FOR NO KEY UPDATE` no assignment e revalidação do pedido `open`. Cancelamento bem-sucedido encerra apenas pedidos `open` associados e preenche `resolved_at`.
- ACKs, autenticação, papéis, tenant/RLS, matching, disponibilidade, notificação e política `none_until_fin_risk_policy_approved` permanecem intactos. Não há retry, compensação, culpa, dinheiro real ou regra nova.
- Regressão HTTP/Postgres e dois testes de controller foram adicionados; nenhum assert anterior foi removido. Evidência: `docs/evidencias/REPLACEMENT_CREATE_CANCEL_CONCURRENCY_2026-10-12.md`.
- CI próprio e pós-CI no SHA real continuam obrigatórios. APK só pode ser N/A por identidade de árvore dos inputs Android/native/dependências/lock/workflow/build/smoke. Gates físicos, Visual Truth, pentest, providers, PSP/KYC/FIN-RISK e Web pago permanecem OPEN separados.

## 2026-10-12 — reset de seleções ao trocar a empresa Web (PR #496)

Base revalidada main345419b077571e0ebfa3337ff24edfa522aea03c. README aponta o DVT ORIGINAL v1.104; memória/checkpoint/ledger/registry preservados integralmente. PR #495 já integrado uma vez; não repetir. Seu head eff95a3fd8a6e323755290f3a480432f514d8bcc teve ownCI38238954175/job114776491510 SUCCESS; merge345419b077571e0ebfa3337ff24edfa522aea03c, orderedparents[10fc12c47f515dc38cf3bd0a8985b53754bfc364,eff95a3fd8a6e323755290f3a480432f514d8bcc], tree8c8eb20c8ccf8eb66ba6ecad2974df99370f3a28 igual candidata/main. PósCI38239314453/job114777705727 SUCCESS no merge REAL, counts63Web/731Mobile/385API/3CLI/10monitor=1192, zero falhas, todos steps/HTTPPostgres e duas barreiras concorrentes. Recibo final PRbody495, sem novo commit autorreferente.

Reprodução do handler real de seleção empresarial: old source mantém selectedJobId=job-a, selectedTeamId=team-a, selectedReplacementId=replacement-a e candidatos/recomendações/membros/substitutos da empresa A depois de setTenantId(company-b). Fonte corrigida zera os três IDs e quatro listas antes da mudança de tenant; reescolha do mesmo tenant preserva seleção. Esse teste executa o corpo real com setters determinísticos: não é browser/React render, SQL, físico ou prova de segurança RLS.

Mudança funcional restrita ao onChange da empresa em apps/web/app/page.tsx; teste comportamental apps/web/app/tenant-switch.test.ts passou 2/2 local. Nenhum endpoint/header/payload/ACK/autoridade/role/RLS mudou. O CI inicial38262686638/job114856945168 SUCCESS no head d8a4edec7378147ca05f7652092ea9d991697f38; após adicionar os cinco documentos e reprodução factual à evidência, exigir NOVO CI no novo head, não emprestar o run inicial. Próprio e pós-CI no merge real obrigatórios; APK N/A somente identidade dos blobs/modes Android/native/deps/lock/workflow/build/smoke comprovada.

Evidência docs/evidencias/WEB_TENANT_SELECTION_RESET_2026-10-12.md. Próxima ação: revalidar head/base/diff/bytes/modes/tree/ancestrais/gates, integrar #496 somente com CI green, confirmar orderedparents/tree/main/pósCI, registrar recibo real no corpo do PR. Após gates continuar auditoria ACKs Web de membership/replacement e cobertura interna por área, apenas falhas reproduzidas e contratos existentes. Zero PRs ou contagem de testes não provam aceite das13 áreas.

Monitor reconsultado: último schedule comprovado38217445193 SUCCESS, #493 ainda OPEN0comments, nenhum schedule posterior localizado; não fechar manualmente, acompanhar logs/alertas sem inferir agente parado. Físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSP-KYC/FIN-RISK/Webpago (#215/#219/#220/#224/#228) continuam OPEN separados. React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/standalone/desenho preservados. Sem produção/serviços/custos/credenciais/contratos/dinheiroreal/PSP/deploypago; rotina única ativa sem pedir CONTINUAR nem alegar24h contínuo.

## 2026-10-12 — confirmação de ACK de substituição na Web

Predecessor496 MERGED107cfb3a81487d37f78e3176cd1dd9d567719d6c, orderedparents[345419b077571e0ebfa3337ff24edfa522aea03c,2a54965f96bfd6af56e091424bbbe1b738c4015f], tree d15fe502bd292102027b60945683f28298723415 igual candidata/main. OwnCI38266180060/job114868804284 SUCCESS65/731/385/3/10=1194, todossteps/HTTPPostgres; postCI38266743335 EMEXECUÇÃO neste snapshot, não PASS. Não repetir merge496. Docs originais preservados; acompanhar pós e recibo final PR496.

Nova falha reproduzida no source real pré-JSX: requestReplacement aceita id:'fake' e seleciona pedido fictício; selectReplacement aceita assignmentId:'fake', limpa seleção e incrementa revision sem ACK canônico. Dois testes comportamentais RED1PASS/2FAIL com controle legítimo. Contratos API existentes reconsultados: create idUUID/assignmentIdexato/statusopen; select replacementRequestId/professionalId/replacedAssignmentIdexatos, assignmentIdUUIDdiferente/statusmatched.

Correção mínima em dois handlers com helper replacement-ack.ts. Captura assignmentId do pedido exibido antes do await, guarda contexto atual antes de validação/publicação e exige ACK canônico. Incerteza mantém seleção/revision e orienta leitura explícita; não auto-retry, não afirma que escrita não ocorreu. Payloads/métodos/headers/endpoints/auth/roles/tenantRLS/idempotência/matching/notificações/finanças preservados. Nenhuma política nova.

Seis testes novos (dois RED, positivo/payload/schemaUUID/binding/HTTP/perda transporteJSON): suite Web local71/71PASS, todos65 anteriores mantidos. Fixtures determinísticas não representam React render/browser/E2E/físico/SQL. Evidência docs/evidencias/WEB_REPLACEMENT_CONTRACT_ACK_2026-10-12.md. Branch fix/web-replacement-contract-ack-20261012; PR/head/CI próprio/pós ainda pendentes neste snapshot. Exigir CI no novohead esperado71/731/385/3/10=1200 + todossteps/HTTPPostgres. APK N/A somente identidade de todosinputs Android/native/deps/lock/build/workflow/smoke SHA/modes.

Próximopasso: revisar bytes/diff/modes/tree/ancestrais, comprovar pós496 e próprioCI destehead, integrar uma vez e confirmar pais/tree/main/pósreal. Recibo final no corpoPR/continuidade, consolidar no próximo ciclo funcional semloopmetadata. Depois auditar contratos de ACK membership/confirmação e cobertura porárea apenas lacunasreproduzidas. Monitor493 OPEN/0comments, nenhum scheduleposterior localizado naúltimaconsulta; acompanhar, não fechar manualmente. Gates físicos/E2E/VisualTruth/SecureStore/piloto/pentest/TRUSTproviders/PSPKYC/FINRISK/WebpagoOPENseparados215/219/220/224/228. Preserve React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/standalone/desenho; semserviços/custos/credenciais/contratos/PSP/dinheiroreal/produção/deploypago. Rotinaúnica ativa, semCONTINUAR/sem24h contínuo; 0PR/testcount não fecha13áreas.

## 2026-10-12 — ACK canônico de membros de equipe Web

Base main1b8a9deeec5d3211f1c946aba679c3cb48d59a7f: #497 jáMERGED, orderedparents[107cfb3a81487d37f78e3176cd1dd9d567719d6c,40b66a4045f6f33dac9623e927a369346809f17c], tree988e365586b49e77e9a606f37d4135b0e0b57c19 igualcandidata/mainconfirmada. OwnCI38267049611/job114871723175 SUCCESS71/731/385/3/10=1200, todossteps/HTTPPostgres; pós38267610320 EMEXECUÇÃO neste snapshot. #496pós38266743335/job114870718162 SUCCESS65/731/385/3/10=1194, todossteps/HTTPPostgres noSHAreal107cfb3a81487d37f78e3176cd1dd9d567719d6c. Recibos finais corposPR496/497; não repetir merges.

Dois handlers source-real addTeamMember/removeTeamMember aceitam HTTPok+{} comrevision1/erroblank. Nova bateriaRED1PASS/2FAIL de3 comcontroleslegítimos, hooks/transportedeterminísticos préJSX, nãoReactrender/SQL/browser/físico. Contrato TeamsController existente: add teamId/professionalIdexatos/replayidempotente; remove removed:true. Helperteam-membership-ack.ts valida somente essesACKs; addrequireUUID/binding, removebooleantrue seminventarIDsde retorno.

Correção: add validaresultado antesrefresh; remove lêJSON e validaACK mantendo mesmoDELETE/URL/headers; removegenérico/talentpool intactos. ACKincerto preservaseleção/revision e orienta leituraexplícita, semretry nemassertque nãohouveescrita. Guardascontexto sessão/token/tenant/role/unmount e catch/finallypreservadas. API/backend/RLS/autoridade/payloads/matching/finanças/policy inalterados.

Seisregressões novas negativos/positivopayloadheaders/UUID/replay/HTTPrejected/perdaredeJSON, suiteWeblocal77/77PASSmantendo71anteriores/asserts. Evidência docs/evidencias/WEB_TEAM_MEMBERSHIP_CONTRACT_ACK_2026-10-12.md. Branch fix/web-team-membership-contract-ack-20261012. Próximo: próprioCInovohead77/731/385/3/10=1206 +todosstepsHTTPPostgres,post497green,revisãobytes/modes/diff/árvore/ancestralidade,mergeumavez/pais/tree/main/pósreal. APKN/Aapenasidentidadeblobsmodesnative/deps/lock/workflow/build/smoke. Registrar recibofinalPRbody semloopcommitsmetadados.

Continuar auditoria funcional de ACK confirmação/cancelamento e cobertura 13áreas da referência, somentefalhaprovada, nãoinventarpolítica/aceiteportestcount/0PR. Monitor493OPENúltimaconsulta/croncomprovado38217445193semnovoagendamento localizado; nãofecharmanual/semalegaragenteparado. Físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSPKYC/FINRISK/WebpagoOPENseparados215/219/220/224/228. React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/standalone/desenho preservados. Semprodução/serviços/custo/credenciais/contratos/PSP/dinheiroreal/deploypago. Rotinaúnicaativa atéaceiteintegral, semCONTINUAR/sem24hcontínuo.

## 2026-10-12 — ACK de confirmação de candidato e talent pool Web

Base main50fd200b3a69fd80633612b167dbaf596d301984 (#498MERGED, não repetir), pais[1b8a9deeec5d3211f1c946aba679c3cb48d59a7f,d30d18d71628dca5165388c2dd2518c0814892c0], tree88f48e1cd0a205cbc90b02e6cfb65eeae64ff7d1 igualcandidata/main. ownCI38267978559/job114874891285 SUCCESS77/731/385/3/10=1206todossteps/HTTPPostgres; pós38268538595 EMEXECUÇÃO neste snapshot. #497pós38267610320/job114873626196 SUCCESS1200todossteps/HTTPPostgres noSHAreal1b8a9deeec5d3211f1c946aba679c3cb48d59a7f. RecibosfinaisnoscorposPR496/497/498; snapshots running não PASS.

Falha reproduzida no source-real confirmCandidate/addTalentPool/removeTalentPool: HTTPok+{} incrementa revision sem ACKcontratual. TrêsnegativosRED+controlepositivo RED1PASS/3FAIL. ControllersAPIreconsultados: confirm idUUID/jobId/professionalId/tenantIdexatos/statusconfirmed; addTalent professionalId/poolexatos/replaylegítimo; removeTalent removed:true. Nenhuma política/tipoempregatício/culpa/pagamento/provider foi inferida.

Correção mínima usa workforce-ack.ts antes de refresh; captura payloadFormData literal; removeTalent lêJSONcommesmoDELETE/URL/headers/statusHTTP. Guardas sessão/token/tenant/role/unmount preservadasantesdevalidarACK/publicar. Resultadoincerto mantémdados/seleção/revision e orientaleituraexplícitaantesdenovoenvio, semauto-retry/nãoafirmaqueescritanãoocorreu. API/RLS/roles/idempotência/matching/notificações/finanças/backend intocados.

Seteregressões novas: trêsnegativas, controlepositivo/payloadheaders/method, UUID/replay/shape, HTTPrejected e perdaredeJSON. SuiteWeblocal84/84PASS mantémtodos77anteriores. Fixturesdeterminísticas nãoReactrender/browser/físico/SQL. Evidência docs/evidencias/WEB_CANDIDATE_TALENT_CONTRACT_ACK_2026-10-12.md. Branch fix/web-candidate-talent-contract-ack-20261012; exigir novoheadCI84/731/385/3/10=1213+todossteps/HTTPPostgres,pós498green,revisãodiff/bytes/modes/tree/ancestrais,mergeumavez/pais/tree/main/pósreal. APKN/AapenasidentidadeblobsmodesAndroid/native/deps/lock/build/workflow/smoke.

Próximo apósgates: confrontar requisitos/referênciacanônica→rotas/APIs/dados/estados/testespor13áreas, inclusive renderinterno/emulador e prazos/mutações/contextosmesmo tenant. Sócorrigirfalhaprovada; nãoinventarpreferências/helpsemvínculo/previsões/integrationssefaltacontrato/dados. Monitor493OPENúltimaconsulta/nennhum scheduleposterior; verificarprimários/alertas semfecharmanual. Físico/E2E/VisualTruth/SecureStore/piloto/pentest/providers/PSPKYC/FINRISK/WebpagoOPENseparados215/219/220/224/228. Preserve React19.1.4/RN0.81.6/frozenlock/tenantRLS/Postgres/standalone/desenho. Semprodução/serviços/custos/credenciais/contratos/PSP/dinheiroreal/deploypago. Rotinaúnicaativa; semCONTINUAR/sem24hcontínuo;13áreasnãofechadasportestcount/0PR. RecibofinalPRbody, próximo ciclofuncionalconsolida semloopmetadata.


## Continuidade factual — Web signin HTTP feedback — 2026-10-13

Base revalidada: main `bf094d28377b0033d1ab5242c439447ef42cca27`, tree `abaee6e83cba4b059499c4c92d06c722980da252`; PR #503 já merged, pais ordenados `c5347d6965d093180e8c1270f1b0e62666093d18`, `408f34ed120bf6c31445ca6f31d9c101f4394032`. Não repetir essa integração. CI próprio #503 run [38335904205](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38335904205) SUCCESS no head `408f34ed120bf6c31445ca6f31d9c101f4394032`. Pós-CI [38337622522](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38337622522), job `115101186739`, SUCCESS no merge SHA real `bf094d28377b0033d1ab5242c439447ef42cca27`: 92 Web / 731 Mobile / 385 API / 3 CLI / 10 monitor, fail 0; todos os steps, HTTP/Postgres e Production Truth passaram. Consulta vazia anterior não foi utilizada como PASS.

Project Activity Watch schedule comprovado: [38343885280](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38343885280), job `115120748244`, SUCCESS no SHA `bf094d28377b0033d1ab5242c439447ef42cca27`. Log primário `2026-10-13T03:54:22.4300728Z ACTIVITY_WATCH_OBSERVED`: SEM NOVO COMMIT (>15 MIN), ageMinutes 78, openPrs 0, activeRuns 0, event schedule. Issue #493 OPEN na consulta; não fechada manualmente. Ausência de commit não prova ausência de trabalho.

Falha reproduzida no handler real de signin Web: uma resposta HTTP 400 era apresentada como “E-mail ou senha inválidos.”, embora a API reserve Unauthorized/401 para rejeição de credenciais. O código aplicava essa mensagem também a todos os demais códigos diferentes de 429. Regressão RED: 93 PASS / 1 FAIL, preservando os 92 testes anteriores; a primeira asserção negativa (400) falhou pela mensagem sem HTTP 400. Correção mínima: apenas 401 usa credenciais inválidas; 429 mantém a mensagem existente; outros status exibem “Não foi possível concluir o login (HTTP N). Tente novamente.” Sem diagnóstico inventado do servidor.

GREEN local: 94/94, fail 0, via `node --experimental-strip-types --test apps/web/app/*.test.ts`. Duas novas regressões comportamentais exercem o handler real pré-JSX com hooks/transporte determinísticos: 400/403/404/500/502/503 informam status; 401/429 conservam os textos canônicos; sessão/storage continuam vazios, loading encerra e há exatamente uma chamada por tentativa. Não representa renderização React, navegador E2E, SQL real ou aparelho físico.

Escopo: uma expressão de classificação de erro em `apps/web/app/page.tsx` e dois testes em `apps/web/app/web-auth-context.test.ts`. Endpoints/métodos/headers/payloads/validação de ACK/propriedade de sessão/tenant/RLS/backend e desenho intactos; sem retry automático, nova dependência ou custo. Evidência: [WEB_SIGNIN_HTTP_FEEDBACK_2026-10-13.md](../evidencias/WEB_SIGNIN_HTTP_FEEDBACK_2026-10-13.md). Os cinco documentos originais recebem este apêndice, sem remover o histórico.

Gates desta correção: CI próprio do novo SHA e pós-CI do merge real ainda PENDENTES nesta árvore de preparação; contagem esperada 94/731/385/3/10 = 1223 não equivale a aceite antes dos logs. APK N/A somente após revisão de identidade de blobs/modes de TODOS os inputs Android/native/deps/lock/workflows/build/smoke; não por ausência de run ou APK emprestado. Recibos finais serão registrados no corpo do PR e checkpoint de retomada, sem loop de commits autorreferentes.

Próxima ação concreta: revisar bytes/diff/árvores e gates do PR desta correção; integrar uma única vez se aprovados e conferir ordered parents/tree/main/pós-CI. Depois auditar falhas reproduzíveis nos requisitos internos (auth/estados/mutações/lifecycle), sem inventar política para preferências/help sem vínculo/previsão/integrações. Zero PRs e contagem de testes não comprovam aceite das 13 áreas. Gates externos #215/#219/#220/#224/#228 físico/Visual Truth/pentest/providers/PSP-KYC/Web pago continuam OPEN separados. React 19.1.4, RN 0.81.6, frozen lockfile e standalone sem Metro preservados; sem produção, gastos, PSP ou dinheiro real.


## Continuidade factual — prazo de signin Web — 2026-10-13

Correção anterior PR #504: head `da5d0bc8dee051dbe743e72fba63a5242e04c4f5`, tree `c1da51c9cee9a8d47024a9b831c1b2ac2f8d5548`, base `bf094d28377b0033d1ab5242c439447ef42cca27`. Diff/bytes dos 8 paths conferidos; cinco documentos preservados por prefixo integral; 463 blobs não-docs fora dos dois arquivos Web permanecem idênticos em SHA/mode. CI próprio [38353198161](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38353198161), job 115150043092, attempt 1, SUCCESS no head exato da5d0bc8dee051dbe743e72fba63a5242e04c4f5: 94/731/385/3/10, fail 0, todos steps+HTTP/Postgres/Production Truth. #504 MERGED em 95973f2a2292acad8c3d150915f387c2f0c48271, pais ordenados [bf094d28377b0033d1ab5242c439447ef42cca27,da5d0bc8dee051dbe743e72fba63a5242e04c4f5], tree c1da51c9cee9a8d47024a9b831c1b2ac2f8d5548 igual candidata/main confirmada. Pós-CI no merge real ainda PENDENTE; não repetir merge nem antecipar pós-PASS. Recibo final será consolidado no corpo do PR e retomada após logs reais.

Nova falha reproduzida: fetch do signin ou response.json pendentes mantinham loading true sem prazo/recuperação. Regressão real contra o source #504: 96 PASS / 2 FAIL, os 94 testes anteriores preservados; ambas falhas por loading true após prazo. Duas novas regressões de controle (retry explícito e unmount) também passaram antes da correção. Sem requests externos ou credenciais reais.

Correção: Promise.race limita a espera conjunta HTTP+JSON ao prazo de 15 s já usado pelas leituras Web; timeout libera loading e exibe “O tempo de login expirou. Tente novamente.”. Timer sempre removido ao encerrar. Resultado tardio do transporte não publica sessão/storage; tentativa mais recente e mounted continuam donos da publicação. Não cancela nem revoga a sessão possivelmente criada no servidor, não prova que a requisição HTTP foi cancelada, não repete a chamada. Nova tentativa depende de ação explícita; nenhum retry automático. Endpoint/POST/headers/payload/validação de sessão/isolamento de tenant/RLS/propriedade de signin/#504/JSX/desenho/backend intactos.

GREEN local: 98/98, fail 0, comando `node --experimental-strip-types --test apps/web/app/*.test.ts`. Quatro regressões novas: HTTP pendente; JSON pendente; sucesso tardio após prazo e após retry explícito; deadline após unmount. Incluem ausência de sessão/storage indevidos, mensagem de prazo, uma chamada sem retry automático e cleanup dos timers. Fixture usa handler real pré-JSX, hooks/transporte e timer explícito de 15000 ms. Não é render React, navegador E2E, SQL real ou físico.

Código+regressão+evidência+[cinco documentos originais por apêndice] no mesmo ciclo; evidência `docs/evidencias/WEB_SIGNIN_DEADLINE_2026-10-13.md`. Gates próprios CI e pós-CI no SHA real desta correção ainda PENDENTES na árvore de preparação. Contagens esperadas 98 Web / 731 Mobile / 385 API / 3 CLI / 10 monitor = 1227 não são aceite antes do run. APK N/A condicionado à identidade de todos os inputs native/deps/lock/workflows/build/smoke, não por ausência de runs. Revisar diff/bytes/modes/tree/ancestrais e atualizar a base main após #504 antes de integrar uma vez com gates reais.

Próxima ação: acompanhar CI de #504 enquanto esta correção recebe PR/gates; confirmar pais/tree/main e pós-CI de ambos sem emprestar resultados. Após integração, auditar lacunas reproduzíveis dos estados/mutações/lifecycle e requisitos por área, sem inventar política para preferências/help sem vínculo/previsão/integrações. Zero PRs não fecha as 13 áreas. Activity Watch tem schedule comprovado e issue #493 de ausência de commit; só o monitor deve administrar seu alerta. Histórico #503 e anteriores preservado; nenhuma integração repetida.

React 19.1.4/RN 0.81.6/frozen lockfile/tenant-RLS/Postgres/standalone sem Metro/desenho preservados. Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST/providers, PSP/KYC/FIN-RISK e Web pago permanecem OPEN (#215/#219/#220/#224/#228). Sem produção/PSP/transações/custos/novos serviços/credenciais/deploy pago. Sem aceite fictício das 13 áreas.
