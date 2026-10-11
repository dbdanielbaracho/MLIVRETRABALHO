# Requisitos — delta v1.103

- COMPANY-CONTEXT-READ: credencial pendente/rejeitada deve informar erro atual e manter publicação desabilitada; resposta antiga nunca confirma empresa após prazo/foco/retry.6regressões novas/PASS12 local; CI/APK próprios pendentes.
- PUBLISH-WRITE-CONTRACT: body/POST/ACK/guardas e rascunho/uncertain existentes preservados, sem mutation/retry automático.
- CONTINUITY:401–411integradas/pósCI comprovados; pósAPKs ainda em execução.412/413CI próprios424/452mobile e145API comprovados, natives pendentes.
- VISUAL-TRUTH físico e gates externos abertos/separados.

## Prazo e erro na leitura da empresa ativa para publicar trabalho

loadContext de Criar novo trabalho aguardava authenticatedTenantHeaders sem timer ou catch. Se SecureStore/auth não resolvia, contexto ficava indisponível sem mensagem de prazo; se rejeitava, loadContext rejeitava sem tratamento na chamada de foco. Seis regressões dos handlers reais pré-JSX reproduziram5falhas/1pass na versão anterior.

A leitura ganha controller registrado no conjunto já abortado em blur e prazo15s. Callback atual invalida context/contextReady e informa falha de verificação; resposta tardia após prazo/blur/retry não autoriza formulário. Erro de credencial é capturado e apresentado somente no request/foco atual. finally limpa timer/controller. Nenhuma requisição HTTP é feita por loadContext, nenhuma empresa/token é inventada e não se habilita publicação antes da verificação existente.

Deadline/falha não apagam draftContext, campos do rascunho ou flag de publicação incerta. Mudança verificada de company/owner mantém somente o comportamento preexistente de clearDraft; a correção não altera esse contrato. Handler create, validação/body/post/ACK/rejected/unknown, guardas de submissão, JSX e StyleSheets são preservados por comparação integral. Não publicar trabalho real ou repetir mutation para verificar a leitura.

PASS12/12 local:6novos +6company-job-publication. Fixtures explícitas de hooks/auth/timer, handler real e parser de publicação real; sem renderReactNative, SecureStore nativo, HTTP ou publicação externa. Cobre credencial pendente/late, rejeição, retry, foco/deadline antigo, preservação de rascunho/uncertain e ausência de tenant. CI próprio esperado458mobile/145API/4web/3CLI +typecheck/build/export/migrations/HTTP eAPK standalone no SHA exato obrigatórios; pendentes antes de publicar. React19.1.4/RN0.81.6/lockfile/scopes/tenant/RLS/standalone/desenho preservados. Visual Truth físico/gates externos abertos.

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.
