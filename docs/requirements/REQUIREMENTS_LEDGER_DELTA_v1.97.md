# Requisitos — delta v1.97

| ID | Requisito | Evidência / estado |
|---|---|---|
| PLANNER-DEADLINE-01 | Após15s publicar erro/retry mesmo sem resolução de auth/HTTP/JSON | 6 regressões novas; PASS15 local; CI/APK próprios pendentes |
| PLANNER-DEADLINE-02 | Sessão/origem expirada não inicia HTTP; resultado tardio não se torna ready | Handler real/fixtures; contrato existente preservado |
| PLANNER-FOCUS-01 | Blur/novo foco invalidam deadline e dados antigos; retry recupera dados reais | Regressões blur/recovery; StyleSheet byteidêntico |
| PLANNER-INPUT-01 | Validação runtime e bind do intervalo real no planejamento API | #407 CI38077221055/job114286615558 aprovado377mobile/140API +HTTP válido |
| CONTINUITY-01 | Preservar diagnóstico/retry único e exigir gate exato antes de merge | #401 tentativa2 em build; #400 CI/APK pós-merge comprovados |

Preferências não tem contrato próprio nos schemas/APIs auditados: definir campos/semântica/escopo/persistência/efeito em matching antes de inventar modelo ou confundir fatos de perfil/availability/capabilities. Ajuda nova sem membership depende de autoridade por identidade/isolamento/retensão aprovada, sem tenant global arbitrário ou bypass RLS. Ambos são bloqueios parciais; não impedem correção de erros concretos das APIs existentes.
VisualTruth físico original/dados/estados/cobertura completa, Native/SecureStore/teclado/payload/restart, pentest, provider/TRUST, PSP/FIN-RISK, WEB-ARCH e piloto/distribuição seguem abertos e separados. Sem dinheiro real, custo, infraestrutura/deploy pagos. Não interpretar CI/emulador como aceite físico integral ou merge como deploy.
