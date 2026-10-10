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
