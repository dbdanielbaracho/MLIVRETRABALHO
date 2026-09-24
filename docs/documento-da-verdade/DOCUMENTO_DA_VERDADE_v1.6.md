# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.6

**Status:** NORMATIVO — DELTA CONSOLIDADO SOBRE v1.5  
**Data:** 2026-09-24  
**Fonte persistente oficial:** este repositório GitHub  
**Produto:** AI Workforce Network + Workforce OS + Marketplace

## Regra de continuidade normativa

A versão v1.6 **incorpora integralmente por referência** `DOCUMENTO_DA_VERDADE_v1.5.md`. Nenhuma seção da v1.5 é eliminada por ausência neste arquivo. Este documento registra somente mudanças, correções factuais, novos controles e estado atualizado desde v1.5; em conflito explícito, v1.6 prevalece.

Essa forma foi escolhida deliberadamente para evitar reconstruir ou resumir o documento-base e correr risco de perda normativa. O bundle vigente é:

1. `DOCUMENTO_DA_VERDADE_v1.5.md` — corpo integral consolidado;
2. `DOCUMENTO_DA_VERDADE_v1.6.md` — delta normativo vigente;
3. `docs/requirements/REQUIREMENTS_LEDGER.md` — rastreabilidade operacional atual;
4. ADRs/evidências — decisões e provas especializadas.

---

# 1. ESTADO ATUAL DE PRODUÇÃO

## 1.1 Railway

Infraestrutura operacional canônica continua no Railway.

- projeto: `MLIVRETRABALHO`;
- ambiente: `production`;
- API: `@mlivretrabalho/api`;
- PostgreSQL: `Postgres` com volume persistente;
- branch de deploy: `main`.

O ciclo de 24/09/2026 encontrou e corrigiu uma regressão TypeScript real (`exactOptionalPropertyTypes`) que não havia sido capturada pelo GitHub Actions porque o runner não foi alocado. A restauração foi comprovada pelo deployment Railway `5b251a58-896d-44ef-87d9-7c0ad5ddc601`, que compilou a API, aplicou migrations `0031` e `0032`, iniciou o container e chegou a SUCCESS.

Evidência: `docs/evidencias/PRODUCTION_RESTORE_2026-09-24_v1.77.md`.

## 1.2 Production Truth não pode ser falsificado

Railway SUCCESS não equivale sozinho a Production-DONE.

O gate atual permanece aberto enquanto faltarem, para o commit corrente:

- execução real do pipeline completo GitHub Actions;
- probe HTTP público canônico contra a produção corrente;
- quando aplicável, jornada real com provider/cliente/dispositivo correspondente.

GitHub Actions está configurado corretamente, mas runs recentes falham antes de qualquer step com `runner_id=0` e `steps=[]`. Isso é tratado como indisponibilidade externa do runner, **não como CI green nem como falha comprovada do código**.

Rastreamento: Issue #214.

---

# 2. FIN-RISK — BASELINE ENDURECIDO, GATE CONTINUA OPEN/BLOCKING

A proibição normativa permanece: não ativar garantia financeira, adiantamento ao trabalhador, crédito, default assumido pela plataforma ou PIX manual por conta operacional como fluxo default enquanto FIN-RISK estiver aberto.

## 2.1 Controles internos adicionados

### Webhook financeiro assinado — PR #216

- HMAC-SHA256 sobre `timestamp.rawBody`;
- `timingSafeEqual`;
- janela anti-replay;
- provider provenance controlada pelo adapter/server;
- payload adulterado é rejeitado;
- adapter provider-neutral permanece independente do PSP definitivo;
- E2E financeiro cobre eventos assinados e reconciliação.

Evidência: `SIGNED_PAYMENT_WEBHOOK_v1.75.md`.

### Integridade de destinatário — PR #218

Eventos de payout passam a carregar `recipientProfessionalId` e são comparados com `work_assignments.professional_id`. Payout para profissional diferente é rejeitado antes de persistência.

Migration `0032_payment_payout_recipient.sql` adiciona proveniência de destinatário ao ledger de eventos.

Evidência: `PAYOUT_RECIPIENT_INTEGRITY_v1.77.md`.

### Payout duplicado — PR #222

O Stop-the-Line "payout duplicado" ganhou teste adversarial explícito: o mesmo `payout_paid` assinado é submetido duas vezes e deve produzir apenas um fato financeiro/reconciliação de um único payable.

## 2.2 Shortlist PSP atualizada

Pesquisa primária de 24/09/2026:

### Pagar.me / Stone

A documentação pública cobre:

- marketplace 1:N;
- múltiplos recebedores;
- split por valor/percentual;
- recebedores PF ou PJ;
- responsabilidades por chargeback/taxa/restante configuráveis por regra;
- estados de credenciamento;
- recebíveis incluindo refunds/chargebacks.

Por aderência técnica pública ao fluxo "empresa paga uma vez → múltiplos profissionais + fee", é o **primeiro candidato para diligência comercial**, sem aprovação final.

### Mercado Pago

Split 1:1 no Brasil, OAuth/KYC por vendedor, webhooks assinados e ambiente de testes estão documentados. O material público informa que Split 1:N depende de carteira assessorada/contato comercial. Risco de reembolso com saldo insuficiente do vendedor permanece relevante.

### Decisão

- consultar Pagar.me/Stone primeiro sobre elegibilidade/contrato/tarifas do modelo 1:N;
- consultar Mercado Pago em paralelo especificamente sobre acesso e condições do 1:N;
- não congelar provider até proposta/contrato/sandbox/revisões.

Evidência: `FIN_RISK_PSP_REFRESH_2026-09-24.md`.

## 2.3 O que ainda fecha FIN-RISK

Issue #215 permanece autoridade operacional para:

- elegibilidade comercial;
- fees/unit economics;
- PF/PJ/KYC/KYB/PLD;
- chargeback/refund/default/saldo negativo;
- sandbox do produto contratado;
- webhook real do provider;
- payout real de teste/reconciliação;
- revisão contábil/tributária/jurídica brasileira;
- decisão separada sobre guarantee/advance/credit.

---

# 3. TRUST-ARCH — CAUSALIDADE E AUDITORIA, SEM ENFORCEMENT AUTOMÁTICO

TRUST-ARCH permanece **OPEN/BLOCKING** para enforcement definitivo.

## 3.1 Safety multiempresa e auditoria

PRs #209 e #213 adicionaram operação multiempresa e histórico de status append-only para casos Safety, preservando tenant isolation e revisão humana.

## 3.2 Causalidade obrigatória aplicada aos Trust Events — PR #217

`trust_events` agora registra explicitamente:

- `professional`;
- `company`;
- `force_majeure`;
- `platform`;
- `undetermined`.

Também registra o ator que reportou o fato. Runtime não pode UPDATE/DELETE esses eventos.

Eventos históricos não recebem culpa retroativa inventada: baseline `undetermined`.

Nenhuma causa gera automaticamente suspensão, exclusão ou score punitivo.

Evidência: `TRUST_CAUSAL_EVENTS_v1.76.md`.

## 3.3 Fechamento externo

Issue #219 rastreia:

- provider KYC/KYB real;
- callback autenticado/idempotente;
- enforcement matrix;
- recurso/contestação/revisão humana;
- retenção/LGPD;
- SLA de incidente;
- revisão jurídica;
- pentest/adversarial externo.

---

# 4. LEGAL-ARCH — CONTINUA OPEN E NÃO PODE SER FECHADO POR IA

Permanece obrigatória revisão jurídica brasileira documentada do **sistema concreto**, incluindo autonomia, Matching/Allocation, scores, recorrência, pricing/control, cancelamento, geolocalização, Preferred Pool, replacement, Trust/Safety, pagamentos, staffing/direct hire, contratos e LGPD.

Rastreamento: Issue #221.

## 4.1 STF Tema 1291

Refresh de fonte oficial em 24/09/2026 manteve o andamento mais recente exibido como:

**21/08/2026 — Conclusos ao(à) Relator(a).**

Não tratar Tema 1291 como jurisprudência consolidada nem como safe harbor para relação plataforma-trabalhador.

## 4.2 OIT Convenção 193

NORMLEX consultado em 24/09/2026 mostrava **0 ratificações** da Convenção 193. A adoção internacional não equivale a ratificação/incorporação brasileira.

## 4.3 Indeed Flex — correção do benchmark

O item que na v1.5 estava PENDING passa a **VERIFICADO PARA INDEED FLEX US**:

- cancelamento pelo cliente com menos de 24h pode gerar até 4h de compensação ao Flexer, sujeito a regras aplicáveis;
- termos de cliente dos EUA preveem taxa equivalente a 4h para cancelamento em menos de 24h.

Isso é benchmark estrangeiro, **não regra MLIVRETRABALHO**. A política própria continua dependente de economia unitária, UX, LEGAL-ARCH, FIN-RISK e TRUST-ARCH.

Evidência: `LEGAL_PRIMARY_SOURCE_REFRESH_2026-09-24.md`.

---

# 5. AI WORKFORCE COPILOT — BASELINE PROVIDER-NEUTRAL

PR #223 introduz a primeira fatia segura do Copilot.

## 5.1 Princípios

- mobile-first;
- provider-neutral;
- nenhum LLM específico congelado;
- interpretação/orquestração separada do provider;
- deny-by-default para execução crítica;
- domain authorization continua fora do modelo;
- `Automatic` não significa permissão irrestrita.

## 5.2 Capacidades iniciais

Copilot pode interpretar pedidos de navegação/orientação para:

- trabalhos;
- agenda;
- ganhos;
- notificações;
- staffing/planejamento;
- candidatos;
- analytics.

A API retorna rota sugerida e razões. O mobile possui tela `Assistente` para profissional e empresa.

## 5.3 Proibições atuais

Copilot não executa:

- contratação/confirmação;
- pagamento/payout;
- suspensão/bloqueio;
- penalidade;
- alteração de score;
- decisão Trust/Safety;
- ação financeira.

Toda resposta atual possui `executionAllowed=false`. Linguagem crítica e modo automático exigem confirmação humana e continuam sem tool execution.

Evidência: `COPILOT_ORCHESTRATION_BASELINE_v1.79.md`.

## 5.4 Evolução futura

Multi-provider LLM Gateway continua arquitetura-alvo. Provider real só deve ser conectado depois de definir custo, privacidade, retenção, fallback, contrato e policy de tools.

---

# 6. ALLOCATION ENGINE — NÃO CONGELAR OTIMIZAÇÃO DEFINITIVA ANTES DE LEGAL-ARCH

O baseline atual permanece transparente e simples: ranking de candidatos usa sinais estruturados do Matching Engine.

Não introduzir lógica de otimização/penalidade/controle cuja configuração possa alterar materialmente a arquitetura jurídica antes do fechamento de LEGAL-ARCH.

Python/OR-Tools permanece opção técnica quando o problema de otimização real justificar e os gates aplicáveis estiverem fechados.

---

# 7. WEB EMPRESARIAL — GAP ESTRUTURAL EXPLÍCITO

O repositório atual possui `apps/api` e `apps/mobile`; `apps/web` ainda não existe.

O web continua obrigatório como produto complementar, não substituto do mobile.

Rastreamento: Issue #224.

## 7.1 Regra de implementação

Não adicionar Next.js de forma que quebre o frozen lockfile. A implementação deve ocorrer em ambiente capaz de resolver dependências e gerar `pnpm-lock.yaml` reproduzível, seguida de typecheck/build/CI e serviço Railway separado.

Superfícies previstas:

- dashboard empresa;
- jobs/candidatos/assignments;
- planner/equipes/replacement/talent pools;
- analytics;
- pagamentos/reconciliação read-only enquanto FIN-RISK estiver aberto;
- Safety/Trust admin respeitando autorização e revisão humana.

---

# 8. PILOT READINESS / MOBILE / SEGURANÇA EXTERNA

Issue #220 permanece aberto para provas que não podem ser substituídas por HTTP E2E:

- Android em aparelho físico;
- instalação/distribuição real;
- localização foreground aceita/negada/indisponível;
- notificações/deep links;
- jornada profissional e empresa completas;
- experiência multiempresa;
- pentest independente.

Export Android histórico em CI não equivale a device E2E.

---

# 9. AUDITORIA ADVERSARIAL INTERNA

A auditoria de 24/09/2026 identificou e tratou:

1. webhook financeiro sem vínculo criptográfico ao raw body → PR #216;
2. Trust sem causalidade explícita → PR #217;
3. payout sem prova de destinatário → PR #218;
4. payout duplicado sem assertion explícita Stop-the-Line → PR #222;
5. regressão TypeScript detectada pelo Railway enquanto CI externo estava indisponível → PR #218.

Evidência: `ADVERSARIAL_REVIEW_2026-09-24.md`.

Auditoria interna não substitui pentest/revisões externas.

---

# 10. MATRIZ DE GATES VIGENTE

| Gate | Estado | Bloqueia |
|---|---|---|
| Production Truth / CI | OPEN | declarar commit corrente Production-DONE |
| FIN-RISK | OPEN/BLOCKING | real-money provider, guarantee, advance, credit, default final |
| TRUST-ARCH | OPEN/BLOCKING | enforcement KYC/no-show/reporting/suspension/dispute definitivo |
| LEGAL-ARCH | OPEN/BLOCKING | congelar arquitetura jurídica de Allocation/Score/penalidades/controle |
| Device/Pilot/Pentest | OPEN | declarar piloto completo / mobile Production-DONE |
| WEB-ARCH | OPEN | arquitetura-alvo web empresarial completa |
| COMP-EVIDENCE | ATIVO PERMANENTE | decisão baseada em claim de concorrente não verificado |

Issues operacionais principais: #214, #215, #219, #220, #221 e #224.

---

# 11. REGRA DE VERDADE E ENCERRAMENTO

A partir de v1.6:

- nenhum `DEPLOYED` isolado vira Production-DONE;
- nenhum benchmark vira requisito sem fonte/decisão explícita;
- nenhum provider é considerado integrado por existir adapter fake/provider-neutral;
- nenhum LLM recebe autoridade direta sobre ação crítica;
- nenhum evento Trust implica culpa sem causalidade/política/revisão;
- nenhum payout é aceito como reconciliado sem idempotência e vínculo ao destinatário;
- nenhum gate externo pode ser fechado por texto gerado por IA.

**O projeto só pode ser declarado concluído no escopo Production/Pilot quando todos os gates aplicáveis tiverem evidência correspondente.**
