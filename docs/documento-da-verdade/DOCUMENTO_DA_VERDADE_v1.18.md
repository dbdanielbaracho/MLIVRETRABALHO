# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.18

**Status:** NORMATIVO — DELTA SOBRE v1.17  
**Data:** 2026-09-28

## Resultado da execução autônoma
O escopo interno que pode ser implementado e provado sem inventar evidência externa foi levado até a fronteira atual.

Além de #268–#273, o baseline atual contém:
- Company planner com team-plan multi-role e constraints explícitos;
- Score Engine contextual integrado em recomendações de vaga e substituição;
- policy/status de termos;
- Support/Dispute cases e fila integrada de exceções;
- SLA/overdue/escalation determinísticos para fila de exceções;
- Marketplace Integrity cases com evidência e revisão humana, sem punição automática;
- Cancellation bilateral com trilha de evidência e compensação deliberadamente bloqueada até FIN-RISK;
- Career progress advisory + Direct Hire/Conversion;
- Vertical Packs aprofundados com skills, checklist e team templates;
- Copilot com safe read-only tool orchestration determinística.

## Itens deliberadamente não fabricáveis internamente
- Forecast/no-show ML: depende de volume/qualidade de dados reais e validação antes de uso. Não criar pseudo-ML.
- PSP/KYC/KYB e pagamentos reais: #215/#228 dependem de contrato, preço e sandbox autenticado.
- Provider-specific trust propagation e pentest independente: #219.
- Android físico/device E2E e pentest: #220.
- Web pública em serviço Railway separado: #224, bloqueado pelo guardrail de novo recurso medido/custo.
- Integrações enterprise específicas: só passam de expansão para compromisso quando um sistema/contrato alvo for definido.

## Production truth
Nenhum gate externo é marcado concluído por inferência. Nenhum teste físico, pentest, sandbox financeiro ou deploy Web pago é simulado.

## Regra de conclusão
Neste ponto, novas alterações internas só são justificadas por defeito encontrado, requisito novo ou evidência externa que desbloqueie um gate. Criar funcionalidades arbitrárias para aparentar progresso viola a governança do projeto.
