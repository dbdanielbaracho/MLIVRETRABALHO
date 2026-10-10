# MLIVRETRABALHO — Documento da Verdade v1.85

**Status:** NORMATIVO — DELTA SOBRE v1.84
**Data:**2026-10-10

## Suporte — consulta de solicitações reais

O suporte exigido na v1.5§22.1 ainda era placeholder em Perfil > Ajuda e suporte. Esta fatia implementa consulta de solicitações existentes vinculadas a um trabalho real, no painel existente, sem nova rota ou alterar navegação canônica.

Seleção humana da lista /assignments/mine autenticada. GET /support-cases/mine recebe Authorization da mesma identidade e x-tenant-id do assignment escolhido; sem tenant default, UUID digitado ou mudar sessão persistida. Backend existente exige membership/RLS e reporter_identity_id. Valida toda resposta e filtra assignmentId exato; IDs iguais em empresas distintas permanecem separados.

Loading, erro auth/rede/HTTP/JSON/schema, trabalhos vazios, ausência de chamados só após resposta válida, status/descrição/data/resolução reais em ordem. Datas pt-BR no fuso do aparelho. Status futuro não vazio literal. Sem criar dados, canais, telefone ou promessa24/7. Retry somente GET; nenhuma mutação/chamado real/mensagem a terceiro.

Guardas de foco/geração/seqrequest/prazo15s/AbortController e auth antes/depois de HTTP/JSON/finalauth. Mudança identidade limpa escolhas/casos, blur/unmount descarta contexto; resposta atrasada de outra seleção não sobrescreve a atual. Nenhum endpoint administrativo acessado.

12 regressões novas:5helper(schema completo/filtro/ordem/notas/vazio/falhaHTTP-offline-JSON/deadline/futurosvalores) e7handlers reais pré-JSX(seleção humana/tenant/GET/injetada rejeitada, mesmoidduasempresas/resposta atrasada, sessãotrocada, deadlineauthfinal, blur/refocus, deadlineauthinicial, lista invalidada porauthfinal). Completa298/298 PASSUTC e America/Sao_Paulo; harness comhooks/auth/fetch/timers explícitos não é render RN. 286anteriores+12. NovoCI deve provar TS/TSX/typecheck/build/export/298mobile/88API; próprioAPKstandalone/smoke/upload/artefato obrigatório, ainda pendente antes da publicação.

Limite de escopo: apenas consulta vinculada; envio de novo chamado ainda indisponível e UI informa isso. Casos semassignment ou fora da lista e entrada contextual no dia do trabalho pendentes. API de criação semidempotência não autoriza duplicar envio após resultado incerto. Suporte integral e Preferências não concluídos.

StyleSheet do Perfil byteidêntico; painel/fourareas/bottomnav foraScrollView mantidos. PNG original relido antes e depois nesta sessão; não detalha esse painel nem prova24/7. Sem render/captura física RN. React19.1.4/RN0.81.6/lockfile/backend/schema/tenant/RLS inalterados. VisualTruth original/dados/estados/cobertura física OPEN.

## Estado verificado

Snapshot2026-10-10 17:17UTC: main9ed1859... v1.84 revalidada, README/Documento/memória/checkpoint lidos. PRs388–395 integradas e CI pós-merge de todas SUCCESS; APK pós389–391/393/394 SUCCESS comsmoke/artefato, pós388falhainfra/únicoretry solicitado. Prova detalhada docs/evidencias/INTEGRACAO_388_395_2026-10-10_1717Z.md. Não repetir integrações.

## Continuidade

Publicar fix/professional-support-history a partir da main9ed1859ee28b1ba50e84bda0d4357d22760a59f3/tree0b145254562a386f00b0aa7cefb75b4fb1a6012a. Consultar própriohead/tree/PR/runs após publicar, rever15arquivos remotos/diff íntegro. CI/typecheck/build/export/298mobile/88API e APK/smoke/artefato do próprioSHA exigidos; merge só comfreshmain/base/mergebase/expectedhead, depois conferir pais/árvore/main/pósCI/APK. Nada de número/head/gate futuro inventado.

Acompanhar único retry pós388 run38054154641 pedido17:17UTC; CI e demaisAPKs pós388–395 registrados na evidência de integração. Running não conclusão/bloqueio definitivo. Registrar novo resultado sem alterar snapshots históricos e sem repetir merges.

Próxima tarefa segura independente: idempotência de criação de suporte por tenant/reporter/intent, confrontando migrations/SupportController/contracts. Provar retries/concorrência/payloadconflitante em fixtures locais/CI; depois UI de enviohumano comdraft preservado e resultado incerto, sem chamados reais. Preferências é alternativa após confrontar requisitos/roles/capabilities/career reais. Não inventar tarefas nem declarar completo pelaausênciaPR.

VisualTruth físico, piloto/device/distribuição/pentest, providers/TRUST/PSP/FIN-RISK/WEB-ARCH permanecem separados OPEN. Sem dinheiro/PSP/custos/cobranças/deploy pago. Manter rotina até integralidade comprovada/ordem explícita; bloqueio parcial/transiente/fimderodada não encerra projeto, sem outra rotina/promessa24h.

Evidência PROFESSIONAL_SUPPORT_HISTORY_v1.85.md; requisitos REQUIREMENTS_LEDGER_DELTA_v1.85.md; journal1717Z. Baselines anteriores vigentes.


## Correção de typecheck — 2026-10-10 17:24UTC

PR396 publicada no headbe08d499f4ac4c199e8f57bdf6afc151b4d935ed/treea28afa107f7d64e6e439f86bdb0275aa1d5d2c8a. CI38071227829/job114268875794 FAIL no Typecheck: TS18048 work.data possivelmente undefined no JSX, devido Section unir loading|error no mesmo membro. Build/export/tests/HTTP ficaram skipped; não tratar CI aprovado. Corrigida projeção const items=work.status==='ready'?work.data:[] para render da lista, mantendo mensagens loading/erro e ausência apenas na ramificação legítima. Sem non-null assertion, coerção, relaxamento TS, alteração de testes/expectativas/estados, dependências ou API. Própriohead/CI/APK novos exigidos após publicar; APK38071227890 do primeirohead não autoriza merge do corrigido. Testes locais298mobile continuam válidos após nova execução; compilação completa requer CI real.
