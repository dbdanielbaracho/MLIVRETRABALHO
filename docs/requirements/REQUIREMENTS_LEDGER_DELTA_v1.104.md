# Requirements Ledger — delta v1.104

## Prazo da leitura de trabalhos e da sessão para abrir ajuda

Agenda load e openSupport usavam timer que apenas abortava o controller. Credencial, transporte, JSON ou autenticação final que não resolvessem deixavam a lista carregando; a verificação da sessão para ajuda também não apresentava falha até a credencial resolver. Nove regressões dos handlers reais pré-JSX reproduziram seis falhas e três sucessos no código anterior.

operation aceita callback opcional de prazo, mantendo o default usado nas escritas. load invalida displayedAuthorization e mostra error imediatamente após 15s somente no requestId/epoch atual. openSupport faz o mesmo para ajuda/contexto e mostra a mensagem de verificação expirada, somente no helpRequest/epoch atual. Respostas ou timers de foco, tentativa, owner e seleção anteriores não substituem o estado atual; nenhuma credencial tardia autoriza painel expirado. Retentativa de leitura permanece explícita. Nenhum dado de trabalho é inventado.

PASS local24/24 em 2026-10-10: nove testes novos, sete agenda-support-screen e oito contratos/parser de Agenda. Fixtures explícitas de hooks/auth/fetch/timers usam handlers reais e loadAgenda real; não provam render React Native, SecureStore nativo ou rede externa. Cobrem auth/fetch/JSON/auth final pendentes, prazo imediato e rejeição de dados tardios, blur/novo foco, retry, troca de owner, prazo de sessão para ajuda e seleção mais recente em tenant distinto com mesmo assignment ID. Não enviam suporte nem lifecycle POST.

Corpo de action (check-in/check-out/avaliação), optionalCoordinates, imports, JSX/StyleSheets e navegação comparados e preservados; operação de escrita continua com default anterior. SupportRequest e protocolo durável não alterados. CI próprio esperado467mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP e APK standalone no SHA exato são obrigatórios e ainda pendentes antes da publicação. React19.1.4/RN0.81.6, lockfile, tenant/RLS e desenho canônico preservados. Visual Truth físico permanece aberto.

## Gates

Local24/24 comprovado; CI e APK próprios obrigatórios e pendentes antes de publicação. Pós-gates401–411 comprovados, evidência AGENDA_READ_DEADLINE_v1.104.md. Não alterar ledger histórico nem declarar cobertura visual integral.

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.


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


## Atualização incremental — Conversa (2026-10-11 04:53 UTC)

No load de Conversa, o timer abort-only mantinha loading quando auth, fetch, JSON ou autenticação final não resolviam. A leitura adicional de auth após runForSession error também podia rejeitar sem catch. Treze regressões dos handlers pré-JSX e helpers reais reproduziram7falhas/6sucessos antes da correção. Após: PASS24/24 local (13novos +11conversation existentes), Node24, fixtures explícitas de hooks/auth/transport/timers; sem renderRN, SecureStore nativo ou rede externa.

operation ganha callback opcional; somente load usa callback de prazo15s que invalida snapshot e informa error/mensagem na geração e sequência atuais. Aplicação de resultados recusa abort; catch apresenta falha da credencial somente no request atual. Deadline não limpa texto de rascunho e não concede autoridade de envio; retry continua explícito. Rotas de assignment/tenant, sessão/foco, resposta e timer antigos têm regressões. Corpo de send e todo JSX/StyleSheets preservados por comparação integral; default operation() na escrita, ACK/sent/rejected/unknown e conferência humana permanecem. Nenhum POST de conversa foi enviado para testar.

Documento da Verdade v1.104 EXISTENTE recebe este apêndice, preservando todo histórico, sem nova versão/substituto resumido. React19.1.4/RN0.81.6, lockfile e tenant/RLS preservados. CI próprio esperado4web/510mobile/145API/3CLI eAPK standalone no SHA exato obrigatórios; pendentes antes de publicação. Gate físico/E2E/VisualTruth, pentest, PSP/KYC sandbox, FIN-RISK/providers e Web eventualmente pago continuam separados e abertos; sem custo/contratação/dinheiro real/deploy pago.

Estado: main83d5df28f11395522aa5e8e776a38bab491e0a91/tree075aad2062eecde202f9b7850c07858b79c9f85c. Pós419 comprovado CI38110152658/job114383862793 (4/476/145/3), APK38110152707/job114383862785, ZIP11691234225/digestad45c1776fb81c0a0b47b81fc3ace2a1298f59afa217ec9e3c0f49b6fb980276, instalação04:24:44.9591307Z/semMetro04:25:39.3146153Z; não equivalem a físico.
#420 aberta head56e8229ada3bdb44042b9d208357f10ef91cdad8/treef7c9a8ae4947125d38ca87c892412a15fa271f84, base main;8arquivos remotos byteidênticos e diff revisto. CI38112711675/job114391414713 em execução (typecheck/build aprovados, export em execução na consulta04:52); APK38112711679 em execução. Não integrada nem rerun solicitada.

Publicar esta fatia sobre head420 acima em fix/conversation-read-deadline, basefix/candidates-read-deadline. Conferir bytes/diff e próprios CI510/145/APK exatos. Integrar420 e depois esta fatia somente com gates aplicáveis aprovados, retarget main em ordem/reconsulta eventual, árvore/pais/main e pós-gates reais. Próxima leitura independente auditada: NotificationsScreen operation abort-only pode manter status loading e desabilitar o retry quando auth/fetch/JSON/auth final não resolvem; reproduzir nos contextos profissional e empresa, guardas de tenant/foco e preservar marcação POST. Não repetir Equipes/#419 ou inventar tarefas para atividade. Rotina permanece ativa até conclusão integral comprovada ou ordem expressa.
