# WEB — isolamento de contexto das mutações


## Web: isolamento do contexto de mutações — 2026-10-12

GitHub revalidado na main d65e3a86484df72319a8b0ed8db44a5856d775ba, árvore ccd8f75136a77582195fbd4be7bcaec321ce0eb8, sem PR aberto. README, Documento da Verdade ORIGINAL v1.104 integral, memória, checkpoint, ledger e registry foram relidos desta referência. Issues externas abertas continuam #215, #219, #220, #224 e #228; zero PR não representa conclusão das 13 áreas.

Falha reproduzida antes da correção nos quatro handlers reais createJob, createTeam, updateSafetyCase e updateSafetyAppeal: a escrita saía com x-tenant-id tenant-a; após renderização em tenant-b, uma resposta HTTP500 da operação anterior substituía o feedback atual por HTTP 500 e mudava loading true para false nos quatro casos. A reprodução usou o prefixo real pré-JSX, hooks e transporte determinísticos, sem rede, SQL, produção, navegador renderizado ou aparelho físico.

Causa-raiz: sucesso, catch e finally publicavam estado sem verificar se token, identidade, tenant, papel e montagem ainda correspondiam ao contexto que iniciou a escrita. A correção cria chave de contexto apenas com essas autoridades existentes e a instala no commit React por useLayoutEffect. Cleanup invalida o contexto no unmount ou antes da instalação de outro contexto; o setup seguinte restaura o mesmo contexto durante a repetição de efeitos do Strict Mode. Não há escrita em ref durante renderização concorrente. Cada um dos quatro handlers captura a chave antes do await e só pode resetar formulário, incrementar revision, publicar erro ou encerrar loading quando o contexto ainda é o mesmo e está montado.

A requisição que já foi enviada não é cancelada nem declarada inexistente: ela pode ter sido aplicada pela API. Resposta tardia apenas deixa de alterar a interface de outra empresa/sessão; não há retry automático, mudança de payload, headers, autoridade, ACK, idempotência, status safety, papel ou política de negócio. Usuário consulta o estado real pelo controle Atualizar dados já existente.

Treze regressões novas exercitam os quatro handlers com falha tardia após troca de empresa; sucesso tardio após troca de empresa, token ou papel; conclusão após signout ou unmount; e repetição cleanup/setup de useLayoutEffect no Strict Mode. GREEN local 44/44 testes Web, preservando os 31 anteriores e seus asserts. O harness de leituras recebeu somente o useRef/useLayoutEffect necessários para executar a fonte real; seus dez cenários anteriores continuam verdes. Não alegar render React/DOM, E2E, aceite visual ou físico por esse gate.

Arquivos funcionais previstos: apps/web/app/page.tsx, apps/web/app/web-form-target.test.ts e apps/web/app/web-read-context.test.ts; JSX, rotas, backend, mobile, dependências, lockfile e workflows não são alterados. Evidência: docs/evidencias/WEB_MUTATION_CONTEXT_ISOLATION_2026-10-12.md. Código, testes, evidência e estes cinco documentos originais seguem no mesmo ciclo por apêndice, sem substituir histórico.

Recibos predecessores fechados e não repetíveis:
- #489 merge 09b2d029c92aa1c783ce759c6f553f09b7685d5f; own CI 38201650457 e post CI 38201962169 SUCCESS, 22/731/383/3/10.
- #490 merge 076791ded5963e78d0a5fdae322a1b8c0f6a044c; own CI 38201831498 e post CI 38202325216 SUCCESS, 26/731/383/3/10.
- #491 merge d65e3a86484df72319a8b0ed8db44a5856d775ba; own CI 38202168809 e post CI 38202643562 SUCCESS, 31/731/383/3/10.

Branch fix/web-mutation-context-isolation-20261012. Próprio CI esperado 44 Web + 731 mobile + 383 API + 3 CLI + 10 monitor = 1171 testes, com typecheck/build/export/migrations/privacy/HTTP Postgres e todos os steps aprovados no head exato; pós-CI obrigatório no merge real. APK é N/A somente após comparação de SHA e mode provar identidade de todos os inputs nativos, dependências, lockfile, workflow, build e smoke; ausência de run não é PASS. Este snapshot é pré-gate e não autoriza merge.

Monitor Project Activity Watch: última execução real comprovada permanece push 38199681085/job 114650083321 no SHA b16fd677bd0b853b97f81e8a660ec0318366dcb4, SUCCESS, marker ACTIVITY_WATCH_OBSERVED em 2026-10-12T03:25:29.7820591Z. Consulta atual por event=schedule continua sem run localizado e não prova execução nem falha do cron; nenhum alerta Activity Watch aberto. Workflow inalterado neste ciclo.

Próxima auditoria interna após os gates: aplicar a mesma reprodução, sem generalização automática, às mutações add/remove team member, confirmação de candidato, request/select replacement e add/remove talent pool; depois concorrência replacement/lifecycle/cancel. Preferências, ajuda sem vínculo, ML e integrações dependem de contrato/dados e não receberão política inventada.

React 19.1.4, React Native 0.81.6, frozen lock, tenant/RLS/Postgres, standalone sem Metro e desenho canônico permanecem. Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST providers, PSP/KYC sandbox/FIN-RISK e Web Railway eventualmente pago seguem OPEN separados. Sem produção direta, serviço/custo/credencial/contrato novo, PSP/dinheiro real ou deploy pago. O projeto não está integralmente concluído; a continuidade permanece ativa sem exigir CONTINUAR e sem alegar execução contínua 24h.
