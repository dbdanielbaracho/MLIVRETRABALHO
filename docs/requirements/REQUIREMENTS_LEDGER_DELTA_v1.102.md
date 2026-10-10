# Requisitos — delta v1.102

- PRIMARY-READ-DEADLINE: Início profissional/Trabalhos/Ganhos/Início da empresa deixam loading no prazo, sem fatos fabricados ou contexto antigo.28novos testes, PASS37 local explícito; CI/APK próprios pendentes.
- WRITE-CONTRACTS: escritas/ACKs/guardas/interesses/avaliações/preferências/logout preservados, sem retry/descarte automáticos.
- POST-GATES: CI401–411 comprovados no SHA real; pósAPKs aplicáveis ainda em execução.412CI próprio aprovado, APK próprio pendente.
- VISUAL-TRUTH físico e gates externos:OPEN/separados.

## Deadline efetivo em quatro leituras principais

Início profissional, Trabalhos, Ganhos e Início da empresa apenas abortavam fetch após15s; auth, fetch, JSON ou auth final que ignorassem abort mantinham loading.28regressões dos handlers reais pré-JSX reproduziram20falhas/8pass antes da correção. O timer agora publica erro apenas no foco/request atual, invalida autorização/contexto de ação quando aplicável e impede aplicação de ready após expiração. Callback antigo após blur/retry não modifica o novo snapshot.

Home marca perfil/agenda/ganhos/disponibilidade/oportunidades/passaporte indisponíveis, sem nomes, contagens, dinheiro ou listas vazias inventados. Trabalhos invalida autorização exibida e mostra erro; Ganhos mostra indisponibilidade, sem transformar falha em zero. CompanyHome invalida displayedContext/tenant e marca dashboard/ativos/concluídos indisponíveis. O timer com callback é exclusivo da leitura; operações existentes sem callback continuam apenas abortando transporte.

JSX e objetos StyleSheet das quatro telas preservados. Corpos de interest/rating/prefer/signout e todas as mensagens/contratos/guardas de escrita foram comparados e preservados. Nenhum POST de interesse/avaliação/preferência/logout, pagamento ou escrita de ganhos é iniciado pela mudança. Não se reivindica solução do prazo de mutations pendentes, descarte de resultado incerto ou retry automático.

PASS37/37 local:28novos +9session-context. Fixtures explícitas de hooks/auth/fetch/timer e helpers reais; cada tela cobre auth/fetch/JSON/auth final pendentes, no HTTP após auth expirada, rejeição de ready tardio, blur/novo foco/deadline antigo/retry e mudança de owner/company. Sem renderReactNative ou APIs externas. CI próprio esperado452mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP e APK standalone próprio obrigatórios; pendentes antes de publicar. React19.1.4/RN0.81.6/lockfile/tenant/RLS/scopes existentes preservados. Desenho/dados/estados no aparelho continuam Visual Truth aberto.

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.
