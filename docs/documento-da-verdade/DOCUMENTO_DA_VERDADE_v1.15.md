# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.15

**Status:** NORMATIVO — DELTA SOBRE v1.14  
**Data:** 2026-09-28  
**Fonte persistente oficial:** `dbdanielbaracho/MLIVRETRABALHO`

## Regra de continuidade
A v1.15 incorpora v1.14 e anteriores por referência. Em conflito explícito de estado/evidência, v1.15 prevalece.

# 1. WEB-ARCH — fechamento interno
Após v1.14, a Web complementar avançou até cobrir o breadth interno previsto sem criar segunda fonte de regras:
- #253: testes críticos role/tenant; CI #864.
- #254: limpeza completa de estado Safety no signout/tenant; CI #867.
- #257: Jobs + assignments ativos/concluídos; CI #876.
- #258: criação de vaga/equipe com timestamps ISO/cents testados; CI #878.
- #259: gestão de membros de equipe e talent pools sem UUID digitado; CI #881 após correção do CI #880.
- #260: replacement request/candidates/seleção humana explícita; CI #883.
- #261: revisão humana owner/admin de Safety cases/appeals; CI #885.
- #262: candidatos/recomendações e confirmação humana; CI #887.

Finance continua read-only enquanto FIN-RISK estiver OPEN. Matching/replacement eligibility e autorização continuam backend-owned. Safety não ganha punição automática.

O único gate de WEB-ARCH ainda aberto é infraestrutura pública: serviço Web Railway separado + smoke público. Isso é recurso metered e exige autorização explícita de custo.

# 2. PRODUÇÃO API
Os merges Web/documentais posteriores ao último deploy API aparecem como `SKIPPED` no Railway para o serviço API, coerente com watch/build scope sem alteração do backend. Não há necessidade técnica de forçar redeploy API por mudanças exclusivas de Web/docs.

# 3. GATES EXTERNOS RESTANTES
- **#215/#228 FIN/provider:** contrato/preço/responsabilidades/sandbox provider-specific.
- **#219 TRUST:** provider-specific callback/propagation quando aplicável + pentest independente.
- **#220 device/pilot:** instalação e matriz E2E em Android físico + pentest/retest; APK generation já provada.
- **#224 Web public:** novo serviço Railway Web e public smoke, cost-gated.

# 4. ESTADO INTERNO
Não há blocker interno conhecido pendente que possa ser legitimamente fechado apenas com código/documentação/CI disponível nesta sessão. Novas alterações sem evidência de defeito ou requisito seriam expansão de escopo, não fechamento do baseline atual.

# 5. GOVERNANÇA
Execução autônoma continua sendo a regra. Não criar custo, não falsificar terceiro/hardware/pentest e não marcar gate externo como concluído sem sua evidência real.
