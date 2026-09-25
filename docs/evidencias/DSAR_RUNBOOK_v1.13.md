# MLIVRETRABALHO — DSAR Operational Runbook v1.13

**Status:** OPERACIONAL INTERNO  
**Data:** 2026-09-25

## Objetivo
Padronizar solicitações de titulares de dados sem expor dados de terceiros ou cruzar tenants indevidamente.

## Tipos suportados
- confirmação de tratamento;
- acesso/exportação;
- correção;
- anonimização/bloqueio/eliminação quando aplicável;
- informação de compartilhamentos;
- revogação de consentimento quando aplicável;
- oposição;
- revisão de decisão automatizada quando aplicável.

## SLA
- confirmação simples: imediata quando tecnicamente possível;
- acesso completo: até 15 dias;
- correção simples: meta interna de 5 dias úteis;
- exclusão/anonymização: após classificação de retenção e validação de identidade;
- pedidos complexos: manter o titular informado e registrar motivo/estado.

## Fluxo
1. receber pedido em canal oficial;
2. verificar identidade de forma proporcional;
3. gerar `request_id`;
4. classificar escopo e tenant(s) relacionados;
5. consultar somente dados autorizados do titular;
6. redigir dados de terceiros;
7. checar legal hold / retenção financeira / Safety / provider;
8. executar ação permitida;
9. propagar correção/exclusão a processors quando aplicável;
10. registrar evidência mínima e resposta final.

## Exportação
O pacote de exportação deve evitar segredos técnicos e conter, quando aplicável:
- identidade/perfil;
- memberships;
- disponibilidade;
- assignments/agenda;
- ratings/reputation referentes ao titular;
- mensagens do titular e contexto necessário, com redaction de terceiros;
- Safety/appeals relacionados ao titular conforme autorização;
- status/reference de verificação KYC/KYB, sem documento/biometria brutos;
- earnings/payment facts pertencentes ao titular;
- compartilhamentos/providers relevantes.

## Exclusão/anonymização
Não apagar silenciosamente fatos cuja integridade precisa ser preservada. Separar:
- dados de descoberta/matching: removíveis/anonymizáveis;
- perfil: removível/anonymizável salvo obrigação correlata;
- ledger financeiro: preservar fato mínimo e reduzir PII;
- Safety/appeal/trust audit: preservar trilha mínima quando necessário;
- provider references: expirar quando a finalidade/obrigação terminar.

## Segurança
- nunca enviar export por URL pública permanente;
- export deve expirar rapidamente após entrega;
- registrar quem gerou/entregou;
- nunca incluir access tokens, password hashes, provider secrets ou dados de outros titulares não necessários;
- cross-tenant disclosure é stop-the-line.

## Evidência do pedido
Registrar apenas:
- request_id;
- tipo;
- identity_id;
- timestamps;
- resultado;
- classes afetadas;
- retenções aplicadas + reason/evidence_ref;
- operador/capability responsável quando houver intervenção humana.

Não guardar uma segunda cópia integral do pacote exportado depois que a entrega expirar.
