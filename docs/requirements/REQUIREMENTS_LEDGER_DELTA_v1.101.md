# Requisitos — delta v1.101

- READ-DEADLINE-TALENTS/SAFETY: erro efetivo no prazo em cada fase pendente, sem publicar snapshot antigo nem iniciar HTTP após prazo/foco expirado.16regressões novas, PASS34 local; CI/APK próprios pendentes.
- MUTATION-SAFETY: preservar contratos/guardas/ACKs/mensagens/resultados incertos existentes; nenhuma mutation automática por correção de GET.
- POST-MERGE-GATES: CI401–410 comprovados; pósCI411 e pósAPKs aplicáveis permanecem em acompanhamento. Pré-gate nunca substitui pós-gate.
- VISUAL-TRUTH e PSP/TRUST/pentest/provider/device/Web: separados e abertos.

## Prazo real nas leituras de Talentos e Segurança

Os handlers existentes só abortavam o transporte após 15s; auth/fetch/JSON/auth final sem resolução mantinham loading. Novas 16 regressões dos handlers reais pré-JSX reproduziram 10 falhas/6pass no código anterior. Agora o timer publica erro e invalida o snapshot somente para request/foco atual. Talentos marca a lista indisponível; Segurança marca trabalhos/relatos/recursos indisponíveis. Auth que chega após deadline/blur/reload não inicia transporte; resposta final ainda exige sessão/tenant atual e sinal não abortado.

Callbacks de deadline são exclusivos das leituras. Os corpos de remove e submit, contratos DELETE/POST, canRequestReview, tratamento de ACK criado/existing/rejected/unknown, bloqueios de mutation e limpeza de foco existentes permanecem byteidênticos. A operação sem callback continua apenas abortando após15s; nenhum reenviar/descartar resultado incerto foi introduzido. Nenhuma remoção, relato ou recurso real foi enviado.

PASS34/34 local:16novos handlers +7company-talents +11professional-safety. Fixtures explícitas de hooks/auth/transport/timer; incluem todas as fases pendentes, resposta/deadline antigos após blur, retry GET com fatos reais, troca de owner/company e refresh manual bloqueado durante mutation. Não renderizam React Native nem exercitam APIs externas. JSX completo e StyleSheets de ambas as telas foram comparados byte a byte e preservados, incluindo navegação/textos existentes.

CI próprio esperado424mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP e APK standalone próprios no SHA exato obrigatórios; ainda pendentes antes da publicação. React19.1.4/RN0.81.6, lockfile, tenant/RLS, scopes das queries, helpers e escrita existentes preservados. Não alegar aceite visual/físico integral ou que mutations pendentes têm um novo timeout resolvido.

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.
