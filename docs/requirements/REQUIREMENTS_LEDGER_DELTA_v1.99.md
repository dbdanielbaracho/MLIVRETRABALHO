# Requisitos — delta v1.99

| ID | Requisito | Evidência / estado |
|---|---|---|
| READ-DEADLINE-01 | Perfil/Passport/Indicadores mostram erro/retry após15s sem aguardar auth/transport/JSON |10falhas/2pass antes;12regressões novas;PASS58 local explícito;CI próprio pendente |
| READ-DEADLINE-02 | Dados tardios/request/foco expirados não geram ready nem HTTP após auth tardia | Handlers reais, blur/retry e dados reais no conjunto |
| PROFILE-PRIVATE-01 | Campos pessoais somente visíveis com perfil atual ready; draft recuperável na mesma sessão | Condição JSX revisada; Visual Truth/privacidade física aberto |
| READ-CANON-01 | Preserve scopes/mutations/indicadores/menu/nav/StyleSheet | Apenas leitura/visibilidade; CI/APK próprios obrigatórios |
| CONTINUITY-01 | Issue214closed e ledger histórico não bloqueiam projeto atual | Issues reconsultadas19:00 UTC, v1.14/v1.18; sem inferir deploy atual |

Preferências não tem contrato próprio nos schemas/APIs auditados: definir campos/semântica/escopo/persistência/efeito em matching antes de inventar modelo ou confundir fatos de perfil/availability/capabilities. Ajuda nova sem membership depende de autoridade por identidade/isolamento/retensão aprovada, sem tenant global arbitrário ou bypass RLS. Ambos são bloqueios parciais; não impedem correção de erros concretos das APIs existentes.
VisualTruth físico original/dados/estados/cobertura completa, Native/SecureStore/teclado/payload/restart, pentest, provider/TRUST, PSP/FIN-RISK, WEB-ARCH e piloto/distribuição seguem abertos e separados. Sem dinheiro real, custo, infraestrutura/deploy pagos. Não interpretar CI/emulador como aceite físico integral ou merge como deploy.
