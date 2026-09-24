# MLIVRETRABALHO — Provider Due Diligence Questionnaire

**Data:** 2026-09-24  
**Uso:** enviar o mesmo conjunto de perguntas aos candidatos PSP/KYC/KYB  
**Issue:** #228

## Contexto resumido a fornecer ao fornecedor

MLIVRETRABALHO é um marketplace/workforce platform mobile-first que conecta empresas e profissionais. O piloto inicial:

- não oferece crédito, empréstimo ou adiantamento;
- não garante pagamento com capital próprio da plataforma;
- não usa PIX manual por conta operacional como fluxo padrão;
- pretende usar PSP para onboarding financeiro, cobrança, split/fee, payout e fatos autenticados;
- registra ledger/reconciliação próprios sem fabricar fatos externos;
- precisa suportar profissionais PF e, quando aplicável, PJ;
- exige webhooks autenticados/idempotentes e segregação clara de responsabilidades.

## Bloco A — elegibilidade comercial

1. O modelo descrito é aceito contratualmente pela sua solução no Brasil?
2. A plataforma pode operar como marketplace de serviços/workforce?
3. Existe exigência de volume mínimo, faturamento mínimo ou histórico operacional?
4. Existe período de homologação/aprovação regulatória?
5. É necessário CNPJ específico, CNAE específico ou alteração societária/contratual?
6. Há restrição para pagamentos relacionados a prestação de serviços temporários, freelancers ou profissionais autônomos?

## Bloco B — recebedores / onboarding

1. PF pode ser recebedor? Quais requisitos?
2. PJ/MEI pode ser recebedor? Quais requisitos?
3. O onboarding pode ser iniciado e acompanhado por API?
4. Quem coleta e armazena documentos KYC/KYB?
5. A plataforma precisa armazenar documento bruto ou pode operar apenas com status/reference?
6. Quais eventos/status indicam onboarding pendente, aprovado, rejeitado, suspenso ou atualização necessária?
7. Existe processo de re-KYC/recertificação periódica?
8. Quais obrigações PLD/FT ficam com o provider e quais ficam com a plataforma?

## Bloco C — split e payout

1. Quantos recebedores podem participar de uma cobrança?
2. Split pode ser por valor fixo e percentual?
3. A platform fee pode ser retida automaticamente?
4. Quem arca com taxa de processamento?
5. Quem arca com chargeback?
6. Quem arca com refund parcial/total?
7. O saldo de um recebedor pode ficar negativo? Quem absorve esse saldo?
8. Qual é o prazo de liquidação/payout por método de pagamento?
9. Payout pode ser bloqueado/revisado por compliance? Como isso é notificado?
10. Existe reserva/hold configurável? Em quais condições?
11. A plataforma pode receber apenas sua fee sem custodiar o valor do profissional?

## Bloco D — pagamentos

Para cada método suportado, informar:

- PIX;
- cartão de crédito;
- boleto, se aplicável;
- outros.

Perguntas:

1. taxa fixa;
2. taxa percentual;
3. prazo de liquidação;
4. taxa de antecipação, se houver;
5. taxa de refund;
6. taxa de chargeback;
7. custos de payout/transferência;
8. custos de subconta/recipient;
9. mensalidade ou mínimo contratual;
10. preço distinto entre sandbox/piloto/produção, se houver.

## Bloco E — API / sandbox

1. Existe sandbox completo?
2. Sandbox permite criar PF/PJ recipients/subaccounts?
3. É possível simular aprovação/rejeição de KYC/KYB?
4. É possível simular payment success/failure/refund/chargeback/payout?
5. Há test cards/test PIX/test accounts?
6. Quais rate limits existem?
7. Existe idempotency key nativa?
8. Qual política de versão/depreciação de API?
9. Existe OpenAPI/SDK oficial?
10. Há ambiente separado para homologação comercial?

## Bloco F — webhooks

1. Como é autenticada a origem do webhook?
2. Existe assinatura HMAC/assimétrica? Qual algoritmo?
3. A assinatura cobre raw body?
4. Existe timestamp/anti-replay?
5. Eventos têm ID único?
6. Qual política de retry/backoff?
7. Eventos podem chegar fora de ordem?
8. Existe replay manual pelo dashboard/API?
9. Como identificar subconta/recipient de origem?
10. Existe IP allowlist ou mTLS opcional?

## Bloco G — segurança e privacidade

1. Onde os dados são processados/armazenados?
2. Quais subprocessadores relevantes são utilizados?
3. Qual política de retenção por classe de dado?
4. Existe DPA/LGPD addendum?
5. Quais certificações/atestados de segurança estão disponíveis?
6. Como são tratados incidentes de segurança e qual SLA de notificação?
7. É possível exportar/auditar eventos financeiros e cadastrais?
8. Qual é o processo de exclusão/correção de dados quando permitido?

## Bloco H — suporte / operação

1. Existe suporte técnico para integração?
2. Existe suporte de produção 24x7 para incidentes críticos?
3. Quais SLAs contratuais?
4. Há gerente técnico/comercial dedicado?
5. Como funciona escalonamento de pagamento/payout bloqueado?
6. Existe status page público?
7. Existe mecanismo de rollback/failover/reprocessamento de evento?

## Bloco I — KYC/KYB independente, quando aplicável

1. Quais validações de identidade são suportadas?
2. Há prova de vida?
3. Há validação documental e/ou bases oficiais?
4. Há KYB de empresa e beneficiário final?
5. Quais consentimentos/avisos são obrigatórios?
6. Podemos armazenar somente provider reference/result status em vez de biometria/documento bruto?
7. Existe sandbox/demonstração?
8. Como funcionam falsos positivos, revisão manual e contestação?
9. Quais requisitos regulatórios/credenciamentos prévios existem?
10. Como é precificado cada tipo de validação?

## Evidência mínima para aprovar um provider

Uma decisão só pode avançar para ADR fechado após termos:

- resposta comercial escrita;
- tabela de preços/contrato aplicável;
- sandbox funcional;
- teste real de onboarding;
- teste real de webhook assinado;
- teste de duplicidade/idempotência;
- teste de refund/chargeback/payout quando suportado;
- responsabilidades regulatórias claramente atribuídas;
- revisão jurídica/contábil aplicável;
- decisão registrada no GitHub com evidence refs.
