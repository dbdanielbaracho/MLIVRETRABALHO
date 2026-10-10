# Requisitos — delta v1.96

| ID | Requisito | Evidência / estado |
|---|---|---|
| PLANNER-INPUT-01 | Rejeitar corpo/lista/linha/role/count malformados após autorização real e antes de query | 9 regressões novas; PASS62 local explícito; CI/HTTP próprio pendentes |
| PLANNER-BIND-01 | Consultar disponibilidade pelo intervalo real com binds contíguos dentro da transação tenant | Query/controller regression e contrato HTTP válido; PostgreSQL próprio pendente |
| PLANNER-CANON-01 | Preservar optimizer, score, roleFit, disponibilidade, ordem e duplicatas; sem trabalho/candidatos inventados | Caminho válido e unfilled; nenhuma regra nova |
| PLANNER-TENANT-01 | Manter membership/role/RLS e candidatos active_tenant_professional | Fixtures auth e script HTTP cross-tenant; prova CI própria pendente |
| CONTINUITY-01 | Integrar somente gates exatos e verificar SHA real pós-merge | Estado/journal1847Z; 401/native e pós400 ainda em execução |

Preferências não tem contrato próprio nos schemas/APIs auditados: definir campos/semântica/escopo/persistência/efeito em matching antes de inventar modelo ou confundir fatos de perfil/availability/capabilities. Ajuda nova sem membership depende de autoridade por identidade/isolamento/retensão aprovada, sem tenant global arbitrário ou bypass RLS. Ambos são bloqueios parciais; não impedem correção de erros concretos das APIs existentes.
VisualTruth físico original/dados/estados/cobertura completa, Native/SecureStore/teclado/payload/restart, pentest, provider/TRUST, PSP/FIN-RISK, WEB-ARCH e piloto/distribuição seguem abertos e separados. Sem dinheiro real, custo, infraestrutura/deploy pagos. Não interpretar CI/emulador como aceite físico integral ou merge como deploy.
