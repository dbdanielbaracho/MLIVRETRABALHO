# MLIVRETRABALHO — Privacy Notice Baseline v1.13

**Status:** BASELINE INTERNO PARA PRODUTO/PILOTO  
**Data:** 2026-09-25  
**Observação:** texto operacional de transparência; não é parecer jurídico profissional.

## Quem trata os dados
MLIVRETRABALHO atua como plataforma de intermediação/Workforce OS e poderá atuar como controlador em determinadas operações e como parte de cadeias com operadores/providers em outras, conforme a finalidade concreta.

## Dados tratados
Conforme a funcionalidade utilizada, podem ser tratados:
- dados de conta e autenticação;
- perfil profissional/empresa;
- disponibilidade;
- oportunidades, candidaturas, assignments e agenda;
- check-in/out e geolocalização foreground quando usada;
- mensagens ligadas à operação;
- ratings/reputation;
- Safety cases, appeals e Trust events;
- status/referências KYC/KYB;
- eventos financeiros/earnings/provider references;
- logs técnicos e de segurança minimizados.

## Finalidades principais
- criar e proteger contas;
- operar matching, agenda, assignments, equipes e substituições;
- permitir comunicação operacional;
- registrar presença/check-in/out;
- calcular earnings e reconciliar pagamentos;
- manter segurança, prevenção a abuso e auditoria;
- atender obrigações operacionais, fiscais/regulatórias aplicáveis;
- permitir exercício de direitos do titular.

## Geolocalização
O baseline do produto não usa tracking contínuo/background. Quando localização for usada no check-in/out ou proximidade, deve ser foreground, proporcional à finalidade e submetida às permissões do dispositivo.

## KYC/KYB
O MLIVRETRABALHO prefere armazenar status, provider reference e evidence_ref em vez de cópias de documentos/biometria. Providers selecionados podem tratar dados adicionais sob seus próprios contratos/obrigações.

## Compartilhamentos
Dados podem ser compartilhados apenas quando necessários com:
- empresas/profissionais envolvidos na operação autorizada;
- infraestrutura/cloud;
- PSP/payment provider;
- KYC/KYB provider;
- segurança/observabilidade;
- autoridades quando houver obrigação aplicável.

Compartilhamento cross-tenant não autorizado é proibido.

## Retenção
A política operacional vigente está em `TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13.md`. A retenção varia por classe e finalidade; dados devem ser eliminados/anonymizados quando a finalidade terminar, salvo conservação documentada.

## Direitos do titular
O titular pode solicitar, conforme aplicável:
- confirmação e acesso;
- correção;
- anonimização, bloqueio ou eliminação;
- informações sobre compartilhamentos;
- portabilidade conforme regulamentação;
- revogação de consentimento quando aplicável;
- oposição;
- revisão de decisões automatizadas aplicáveis.

O processo operacional está definido em `DSAR_RUNBOOK_v1.13.md`.

## Decisões automatizadas
Matching/ranking pode usar sinais automatizados, mas decisões materiais críticas permanecem separadas de punição automática. Score/reliability deve ser auditável e efeitos materiais relevantes devem permitir revisão humana conforme baseline Trust.

## Segurança
São adotados princípios de least privilege, tenant isolation, RLS para dados TENANT, minimização de logs, proteção de segredos, trilhas de auditoria e separação de responsabilidades.

## Mudanças
Mudanças materiais de finalidade, provider, dados sensíveis, background tracking, enforcement automático ou fluxo financeiro exigem re-review interno e atualização deste aviso antes da ativação.
