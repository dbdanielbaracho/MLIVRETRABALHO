# MLIVRETRABALHO — Trust/Data Retention Operational Baseline v1.13

**Data:** 2026-09-25  
**Status:** BASELINE OPERACIONAL INTERNO  
**Escopo:** LGPD, minimização, retenção, direitos do titular e legal hold  
**Limitação:** estes prazos são decisões operacionais conservadoras do produto; não são apresentados como prazos legais universais nem como parecer jurídico profissional.

## 1. Princípios obrigatórios

1. finalidade explícita e minimização por classe de dado;
2. eliminar ou anonimizar quando a finalidade terminar, salvo conservação documentada;
3. provider reference/status/evidence_ref preferidos a documentos brutos;
4. tenant + RLS + least privilege para dados tenant-owned;
5. retenção diferente por classe, não uma retenção única para tudo;
6. legal hold/obrigação fiscal/regulatória/provider prevalece quando documentado;
7. nenhuma evidência Trust/Safety/KYC/financeira é reutilizada para marketing ou treinamento de IA por default;
8. geolocalização permanece foreground/episódica; nenhum tracking background como baseline.

## 2. Classes e janelas operacionais

| Classe | Baseline operacional | Ação no fim da janela | Observação |
|---|---:|---|---|
| Sessões/tokens | TTL técnico; revogação imediata quando aplicável | token deixa de valer | segredos/tokens nunca em logs |
| Metadados de sessão/auditoria auth | 90 dias | excluir/anonymizar | ampliar somente por incidente/legal hold |
| Logs técnicos gerais | 30 dias | excluir/compactar anonimamente | segurança pode justificar classe separada |
| Logs de segurança/abuso | 180 dias | excluir/anonymizar | ampliar por incidente aberto/legal hold |
| Perfil profissional/empresa | enquanto conta ativa | após encerramento, remover/anonymizar em até 30 dias quando não houver obrigação correlata | identificadores mínimos podem persistir se ligados a obrigação retida |
| Disponibilidade/localização de preferência | enquanto necessária ao matching | sobrescrever/remover quando atualizada ou conta encerrada | não usar para tracking contínuo |
| Geolocalização precisa de check-in/out | 30 dias após assignment | eliminar precisão bruta; preservar apenas prova derivada mínima quando necessária | nenhum background tracking |
| Assignment/agenda/check-in/out/conclusão | 5 anos após conclusão/cancelamento como baseline de evidência operacional | excluir/anonymizar ao fim, salvo hold | janela interna de risco; não alegada como prazo legal universal |
| Conversas ligadas ao assignment | 2 anos após encerramento do assignment | excluir/anonymizar, salvo disputa/hold | anexos excessivos devem ser evitados |
| Safety case / appeal / trust event | 5 anos após encerramento definitivo | anonymizar/excluir PII não necessária; preservar trilha mínima se obrigação justificar | human review e causalidade explícita |
| KYC/KYB | status/provider/reference enquanto relação ativa + até 5 anos quando necessário à evidência/compliance | excluir/anonymizar referência quando finalidade expirar | documento/biometria brutos não são armazenados por default |
| Financeiro/ledger/provider refs | 5 anos como baseline mínimo de risco fiscal/contábil, podendo ser maior se obrigação/contrato exigir | aplicar política fiscal/provider documentada | ledger mantém integridade; PII deve ser minimizada |
| Evidência de incidentes de segurança | duração do incidente + 5 anos quando material | revisar/expirar sob legal hold policy | separar de logs rotineiros |

## 3. Conta encerrada

Quando a conta for encerrada:

1. revogar sessões/credenciais ativas;
2. bloquear novo uso operacional da identidade;
3. separar dados apagáveis de dados sujeitos a retenção legítima;
4. remover/anonymizar perfil e campos de descoberta/matching em até 30 dias;
5. manter apenas o mínimo necessário em assignments, financeiro, Safety/Trust ou legal hold;
6. registrar reason/evidence_ref para qualquer retenção pós-conta.

Não existe “apagar tudo” silencioso se isso destruir ledger, auditoria, Safety appeal ou obrigação documentada.

## 4. Direitos do titular / DSAR

O MLIVRETRABALHO deve manter um fluxo único para:

- confirmação de tratamento;
- acesso/exportação;
- correção;
- anonimização/bloqueio/eliminação quando aplicável;
- informação sobre compartilhamentos;
- revogação de consentimento quando a base for consentimento;
- oposição/revisão de decisão automatizada quando aplicável.

### SLA interno

- confirmação simples: responder imediatamente quando tecnicamente possível;
- declaração completa/acesso: **até 15 dias**;
- correção operacional simples: meta interna de 5 dias úteis;
- exclusão/anonymização: executar após validação de identidade e classificação de retenção; informar o que foi eliminado e o que foi preservado, com motivo;
- pedidos não atendidos integralmente: retornar justificativa factual/legítima e classe de retenção aplicável.

## 5. Processo mínimo de DSAR

1. autenticar o titular ou aplicar verificação proporcional;
2. criar `request_id` auditável;
3. classificar pedido e escopo;
4. localizar dados por identity + memberships/assignments autorizados, sem cross-tenant disclosure;
5. aplicar redaction de dados de terceiros;
6. executar export/correção/eliminação/anonymização quando aplicável;
7. registrar resultado, timestamps e motivo de qualquer retenção;
8. notificar processors/providers quando correção/eliminação compartilhada exigir propagação;
9. fechar pedido com evidência mínima, sem armazenar cópia desnecessária dos dados exportados.

## 6. Legal hold

Legal hold é exceção explícita, nunca implícita. Deve registrar:

- motivo;
- classe de dados;
- início;
- responsável/capability;
- evidence_ref;
- gatilho/data de revisão;
- término.

Legal hold não autoriza ampliar acesso nem reutilizar dados para finalidades diferentes.

## 7. Providers

Antes de produção, cada provider deve informar/documentar:

- retenção própria;
- suboperadores;
- região/transferência internacional quando aplicável;
- exclusão/correção propagável;
- exportação/evidence reference;
- incident response;
- prazo/condição de deleção após encerramento contratual.

Se o provider exigir retenção maior, isso deve ser documentado na matriz de processing e não vira automaticamente regra para todas as outras classes.

## 8. IA/Copilot

Dados Trust/Safety/KYC/financeiros não são enviados por default a LLM externo. Qualquer uso futuro exige finalidade explícita, minimização, provider/contrato, retenção e registro de decisão.

## 9. Testes/implementação necessários

- autorização tenant-safe em export/DSAR;
- redaction de dados de terceiros;
- account closure revogando sessões;
- purge/anonymization jobs idempotentes;
- legal hold bloqueando purge somente nas classes registradas;
- retenção de ledger sem exposição excessiva de PII;
- ausência de raw KYC/biometria no armazenamento default;
- geolocalização precisa expirada conforme janela;
- propagação de correção/eliminação a processors quando aplicável.

## 10. Fontes oficiais usadas para o baseline

- Lei 13.709/2018 (LGPD), especialmente arts. 15, 16, 18, 19, 20, 46 e 48;
- ANPD — direitos dos titulares;
- ANPD — guias de agentes de tratamento/encarregado e materiais de segurança;
- CTN arts. 173/174 como referência de horizonte tributário de cinco anos, sem transformar isso em regra única de retenção para todo dado pessoal.

## 11. Re-review obrigatório

Revisar esta política quando ocorrer:

- provider novo ou mudança material de contrato/provider retention;
- operação regulada adicional;
- mudança no fluxo financeiro;
- nova categoria de dado sensível;
- background tracking;
- decisão automatizada material;
- incidente significativo;
- nova jurisdição;
- mudança material na LGPD/regulação ANPD/legislação fiscal aplicável.
