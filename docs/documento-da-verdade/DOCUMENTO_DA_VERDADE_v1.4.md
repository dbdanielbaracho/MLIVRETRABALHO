# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.4

**Status:** NORMATIVO  
**Fonte persistente oficial:** este repositório GitHub  
**Produto:** AI Workforce Network + Workforce OS + Marketplace  
**Regra:** a Parte A define o estado vigente. Histórico, evidências e ADRs preservam rastreabilidade. Código/testes/produção provam implementação.

> Este arquivo substitui a versão Markdown resumida anteriormente publicada. Ele registra integralmente as decisões e requisitos recuperáveis do Documento da Verdade e do histórico validado do projeto. Nenhuma decisão material deve existir somente fora do GitHub.

# PARTE A — ESTADO ATUAL NORMATIVO

## 1. Definição do produto

MLIVRETRABALHO é uma plataforma **mobile-first de Workforce Network + Marketplace + Workforce OS, com IA**, que conecta profissionais, empresas e oportunidades de trabalho de forma simples, contínua e personalizada.

Tese central:

> **Não apenas encontrar trabalhadores. Orquestrar a força de trabalho.**

O produto combina:

1. **Marketplace** — encontrar e oferecer turnos, trabalhos e vagas.
2. **Workforce OS** — gerir força de trabalho, agenda, equipes, unidades e pools.
3. **Work Network** — distribuir oportunidades entre profissionais e empresas.
4. **AI Engines** — matching, alocação, scores, planejamento, forecast, no-show e compliance.

Linhas de negócio previstas: marketplace/intermediação e Workforce SaaS/enterprise.

## 2. Princípio permanente de produto

Não sacrificar qualidade, segurança, arquitetura, UX, profundidade vertical ou diferenciação por prazo artificial.

As fases existem para sequenciar execução e risco; **não reduzem o escopo estrutural**.

Regra permanente de simplicidade: entre alternativas que atendam adequadamente segurança, confiabilidade, compliance, pagamentos e requisitos legais, escolher a solução menos burocrática para o usuário. Complexidade necessária permanece no backend.

## 3. UX — Friction First

Antes de adicionar tela, campo, clique, confirmação ou decisão, perguntar se é realmente necessário.

### 3.1 Navegação canônica

**Profissional:** Início | Trabalhos | Ganhos | Perfil  
**Empresa:** Início | Trabalhos | Equipe | Conta

Mudanças de estado devem ocorrer contextualmente, evitando uma tela separada para cada estado.

Fluxo contextual de oportunidade:
Opportunity → Quero/Tenho interesse → Confirmado → Hoje/Check-in → Em andamento/Finalizar → Concluído/Ganhos.

### 3.2 Metas de interação

- entender oportunidade: aproximadamente 3 segundos;
- demonstrar interesse: 1 ação;
- aceite instantâneo: 1 ação + confirmação curta somente quando existir compromisso real;
- próximo trabalho: 0–1 ação;
- ganhos: 1 ação;
- check-in: 1 ação;
- check-out: 1 ação;
- recontratar: 1–2 ações;
- completar equipe: idealmente 1 confirmação após recomendação da IA.

Fluxo com 3 ou mais ações exige justificativa de UX, segurança, legal ou técnica.

Casos normais devem ser automatizados; exceções pedem intervenção. Notificações devem usar deep-link. Não exigir treinamento para funções básicas. Linguagem natural/voz pode substituir filtros. Swipe é opcional; botões permanecem disponíveis.

Usar **“Tenho interesse”** quando existir candidatura/seleção e **“Aceitar”** apenas quando a ação confirmar diretamente o trabalho, com confirmação explícita se houver compromisso real.

### 3.3 Referências de experiência

- Tinder: decisão simples/card e baixa carga cognitiva.
- Uber: clareza operacional, status e mapas.
- Nubank: clareza financeira e hierarquia simples.
- Qwick/Instawork: fluxos específicos de workforce.

Não copiar literalmente.

### 3.4 Layout canônico

A direção visual aprovada é **AI WORKFORCE NETWORK — Simples para usar. Seguro para todos.**  
O layout aprovado deve ser tratado como especificação de implementação. Especificações escritas prevalecem sobre eventual erro textual de imagem gerada.

## 4. Taxonomia e profissões

O produto não é limitado a garçom, bartender, limpeza ou cozinha.

Modelo genérico:
Professional, Skill, Role, Certification, Vertical, Opportunity, Company, Location, Schedule, Compensation, Requirement.

Hierarquia:
Vertical → Professional Family → Role → Specialization → Skills → Certifications → Proven Level.

A IA pode sugerir classificação, mas **LLM não pode criar autonomamente Role/Skill/Vertical canônicos em produção**. Nova categoria exige normalização, deduplicação e governança/aprovação.

A arquitetura deve suportar centenas ou milhares de funções. A ativação comercial pode ser progressiva.

Verticais potenciais: Hospitality, Hotels, Events, Cleaning/Facilities, Logistics/Warehouse, Retail, Manufacturing, Construction, Admin/Support e, após estudo apropriado, Health/Care, Agriculture, Tech, Beauty, Automotive, Security e Education.

## 5. Modalidades de trabalho

O perfil é **Profissional**, não genericamente “freelancer”.

Suportar:
- trabalho avulso/gig;
- freelance;
- temporário;
- recorrente/flexível;
- temp-to-hire;
- permanente/CLT quando aplicável;
- agency/staffing;
- funcionários internos.

## 6. Módulos centrais

Marketplace, AI matching, auto-selection, schedules, check-in/out, geolocation, timekeeping, backup/replacement, payments, ratings, demand forecast, internal talent pool, permanent hiring, compliance, APIs e integrations.

Modos de IA: **Manual / Assisted / Automatic**.

## 7. Workforce Allocation Engine

É um núcleo de diferenciação.

Entradas possíveis:
availability, skills, distance, Professional Score, Reliability, Company Score, experience, pay, preferences, history, recurrence, no-show risk, company needs, compliance, adjacent schedule constraints e team compatibility.

Saídas:
Match Score, profissional/equipe recomendados, agenda/rota otimizada e backups.

### 7.1 Arquitetura de IA

- AI Workforce Copilot: linguagem/voz, intenção estruturada, explicação e tool calling.
- Matching Engine: código próprio.
- Allocation Engine: código próprio; Python/OR-Tools quando apropriado.
- Score Engine: código próprio.
- Workforce Planner.
- Work Graph/Team Graph.
- forecast/no-show models somente quando dados sustentarem.

**LLM não decide sozinho decisões críticas.** Recomendações precisam de razões estruturadas e auditáveis. Usar regras/pesos transparentes primeiro e ML posteriormente quando houver dados/evidência.

## 8. Pools e planejamento

Ordem geral:
Preferred Pool → Network Pool → Open Pool.

Enterprise/interno:
same-unit employees → other-unit employees → private talent bench → external marketplace.

Planner:
- Profissional: “Monte minha semana”.
- Empresa: “Monte minha equipe”.

## 9. Scores e Reliability

Scores previstos:
Professional Score, Reliability Score, Company Score e Match Score.

Devem ser contextuais à função, considerar confiança e recência.

### 9.1 Causalidade obrigatória

Eventos não podem ser tratados como culpa automática do profissional.

O Reliability Score deve distinguir, no mínimo:

1. **causa atribuível ao profissional**;
2. **causa atribuível à empresa**;
3. **força maior/fator externo ou indeterminado**.

Alteração/cancelamento causado pela empresa **não penaliza o profissional**. Força maior exige política própria e possibilidade de revisão. Reputação é bilateral.

## 10. Work Passport

Identidade/histórico profissional verificável: skills, avaliações, attendance, pontualidade, certificações, rehire, experiência e scores específicos por função.

Progressão de skill:
declared → trained → certified → proven.

## 11. Work Graph / Team Graph

Relacionamentos:
Professional ↔ skills ↔ company ↔ unit ↔ role ↔ team ↔ shift/job ↔ outcome.

## 12. Pagamentos

### 12.1 Modalidade A — Split automático

Preferencial/default.

Empresa paga uma vez → PSP/processadora → split → remuneração do profissional + fee de intermediação da plataforma.

Objetivo: receita da plataforma ser o fee, e não automaticamente todo o GMV, sujeito a validação jurídica, tributária e contábil.

### 12.2 Modalidade B — Pagamento consolidado

Alternativa/enterprise.

Empresa paga total uma vez → infraestrutura financeira segregada/PSP/BaaS/equivalente validado → distribuição 1:N para profissionais + fee da plataforma.

**Conta bancária operacional comum + PIX manual é rejeitado como default.**

### 12.3 Ledger

Registrar separadamente:
GMV; professional payable; platform fee; processor fee; adjustments; refunds/disputes/chargebacks; payout status; reconciliation.

UX: empresa paga uma vez; profissional recebe uma vez; complexidade invisível.

Provider financeiro não está congelado.

## 13. Financial Risk

Domínio separado deve responder:

- e se a empresa não pagar?
- prepayment vs authorization/reserve vs postpay vs enterprise credit vs platform guarantee;
- quem assume default/chargeback;
- working capital/financing;
- garantia de pagamento ao profissional;
- custo de antecipação.

Nenhum fluxo definitivo de garantia/adiantamento/crédito/default fecha enquanto **FIN-RISK** estiver OPEN/BLOCKING.

### 13.1 Benchmark Job&Talent

Em outubro de 2024, Job&Talent anunciou facility de €250m de Barclays + Fasanara estruturada como **trade receivables securitization**, financiando o intervalo entre pagar trabalhadores e receber clientes. Não caracterizar formalmente apenas como “linha genérica de capital de giro”. A operação de dívida de US$250m de 2022 é distinta.

### 13.2 Benchmark Estaff

Os termos analisados indicam pagamento exibido na plataforma e posterior transferência pelo processador; no split, remuneração do serviço vai ao trabalhador e Estaff recebe fee de intermediação como faturamento. Os termos também preveem possibilidade de antecipação ao trabalhador antes do pagamento do cliente com sub-rogação do crédito. Isso é benchmark, **não decisão automática para MLIVRETRABALHO**, por causa do risco de crédito.

Pagamento direto de trabalho originado na plataforma é tratado contratualmente e não substitui automaticamente a obrigação da plataforma. O trabalhador é responsável pelos próprios tributos salvo retenção legal aplicável. Revalidar redação atual antes de transformar detalhe contratual em requisito.

## 14. Leakage e contratação direta

Antes do aceite: mostrar informação suficiente para decisão, mas não telefone/WhatsApp/e-mail/banco/dados privados desnecessários.

Após confirmação: endereço/contato operacional conforme necessidade, preferencialmente in-app.

Mensagens in-app; relay/masking quando apropriado.

Preferred Pool + “Chamar novamente”.

Trabalho on-platform atualiza Passport/scores; off-platform não é automaticamente verificado.

Direct Hire é caminho legítimo. Circumvention do mesmo trabalho originado pela plataforma pode ser protegido contratualmente.

Detecção de leakage deve respeitar privacidade: sinais agregados → revisão humana, sem punição automática.

Princípio: não impedir a contratação de um ótimo profissional; transformar direct hire bem-sucedido em outro produto.

## 15. Trust & Safety

Subsystem completo e bilateral.

### Identity
KYC/KYB, identidade/documentos, verificação de conta e pagamento.

### Marketplace Safety
fraude, contas falsas, abuso/assédio, discriminação e reporting.

### Work Safety
estabelecimento verificado, chegada, incident/emergency e suporte.

### Marketplace Integrity
no-show, cancellation, rating manipulation, collusion, multiple accounts e leakage.

### Financial Risk
default, chargeback, payout fraud e account takeover.

## 16. Cancelamento e backup — benchmarks

### Instawork
Fonte primária oficial analisada: cancelamento pela empresa em janela curta pode gerar compensação de até 4 horas à taxa normal, com exceções e possíveis regras locais/empresariais diferentes. Cancelamento tardio/urgente pelo profissional pode afetar reliability/acesso e gerar suspensão. Instawork também possui Paid Backup Shifts sob condições — referência para Backup/Replacement Engine.

### Qwick
Fonte oficial de suporte analisada: cancelamento de confirmed shift pela empresa dentro de 24h pode acionar mínimo de até 4 horas; cancelamentos tardios do profissional têm consequências escalonadas. Revalidar política corrente antes de congelar números.

### Estaff
Termos incluem janelas e consequências para profissional/empresa. Revalidar texto corrente antes de formalizar números.

### Indeed Flex
Política numérica permanece **PENDING** até verificação independente em fonte primária atual.

**Decisão:** não copiar automaticamente “24h/4h”. Definir política própria após comparação, economia unitária, legislação e UX.

## 17. Arquitetura jurídica Brasil — LEGAL-ARCH

Não desenhar rotação, caps ou artifícios com a finalidade de “evitar vínculo”. Tais mecanismos não garantem inexistência de relação de emprego.

Compliance Radar pode sinalizar concentração/recorrência e sugerir revisão; não declara inexistência de vínculo.

Trabalho temporário sob Lei 6.019/1974 pode envolver empresa de trabalho temporário registrada; arquitetura pode integrar agencies/staffing.

### 17.1 Gate jurídico

Analisar o sistema concreto:
autonomia para aceitar/recusar, Allocation Engine, Score Engine, penalidades, recorrência, pricing, cancelamento, geolocalização, Preferred Pool, check-in/out, exclusões e decisões automatizadas.

Separar:
1. legislação vigente;
2. jurisprudência consolidada;
3. matérias pendentes/em evolução;
4. regulação internacional/emergente.

### 17.2 STF — Tema 725, ADPF 324 e ADC 48

Tema 725 possui mérito julgado e trata, em síntese, da licitude da terceirização ou outra forma de divisão do trabalho entre pessoas jurídicas distintas. **Não deve ser descrito como safe harbor para relação plataforma-trabalhador.**

ADPF 324 e ADC 48 são referências relevantes, mas devem ser caracterizadas com precisão e sem extrapolação automática para o modelo do produto.

### 17.3 STF — Tema 1291 / RE 1.446.336

Tema 1291 é especificamente relevante para vínculo entre trabalhador e plataforma/aplicativo e **não deve ser apresentado como jurisprudência consolidada**.

Estado primário verificado no histórico do projeto:
- **24/06/2026:** despacho retirou o Tema 1291 da pauta em razão da Convenção 193 e necessidade de manifestação das partes.
- **21/08/2026:** andamento oficial registrava **“Conclusos ao Relator”**.

Como o status processual pode mudar, deve ser reconsultado em fonte oficial STF antes de decisão jurídica de produção.

### 17.4 OIT — Convenção 193

A Convenção 193 foi adotada em **12/06/2026** como convenção internacional especificamente voltada a trabalho decente na economia de plataformas.

**Não inferir vigência automática no Brasil.** Adoção internacional não equivale, por si só, a ratificação/incorporação/implementação doméstica.

### 17.5 Critério objetivo de fechamento do LEGAL-ARCH

ChatGPT ou Claude **não fecham LEGAL-ARCH para produção**.

Fechamento exige revisão jurídica brasileira apropriada do modelo concreto, documentada com:
- data;
- escopo analisado;
- versão/commit do sistema ou especificação;
- responsável profissional;
- riscos identificados;
- condições/restrições;
- conclusão formal aplicável ao escopo.

Mudança material em Allocation, Score, penalties, recurrence, pricing/control, geolocation, exclusões, contratos ou modelo operacional **reabre/requer reavaliação do gate**.

## 18. Algorithmic Governance

Obrigatório:
- explainability;
- reason logging;
- contest/review pathway;
- audit trail;
- proteção contra decisão automatizada inadequada;
- UX de contestação com baixa fricção.

Governança algorítmica é requisito estratégico/compliance, não apenas UX.

## 19. Launch Wedge e liquidez

Arquitetura continua multi-vertical/multi-role/multi-payment-ready.

Primeira ativação comercial pode focar uma vertical/região/poucas funções para obter densidade. Isso é **Launch Wedge, não corte de escopo**.

Métricas:
fill rate; time-to-fill; workers/opportunity; active companies/workers; acceptance; cancellation/no-show; repeat; density por região/horário/função.

Analisar abordagem de liquidez de concorrentes apenas com evidência; não inventar GTM histórico.

## 20. Regra permanente de análise de concorrentes

Para todo problema estrutural/material — especialmente cold start/liquidity, Trust & Safety, payment guarantee/default, labor/legal, multi-tenancy, taxonomy e governance — realizar:

**Problema → pesquisa de concorrentes → fontes primárias atuais → comparação → fricção/burocracia → benefícios/riscos → aplicabilidade ao Brasil → solução mais simples e segura → revisão adversarial → decisão → Documento da Verdade → requisito.**

Conjunto mínimo:
- Estaff
- Instawork
- Qwick
- Indeed Flex
- Job&Talent

Adicionar especialistas quando o tema exigir.

Não inventar arquitetura privada de concorrente.

## 21. Evidence Registry

Campos obrigatórios:
Evidence ID; competitor/source; topic; source; verified date; fact; confidence/status; transferability to Brazil; our decision.

IDs já reservados/validados no histórico:
- **COMP-JT-FIN-001** — Job&Talent / trade receivables securitization.
- **COMP-EST-LEGAL-001** — Estaff / termos e estrutura operacional relevante.
- **COMP-INSTA-CANCEL-001** — Instawork / cancelamento/compensação e reliability.
- **COMP-QWICK-CANCEL-001** — Qwick / cancelamento/compensação.
- **Indeed Flex cancellation** — PENDING até fonte primária atual independente.

O registro detalhado deve permanecer em `docs/evidencias/`; uma decisão material baseada em concorrente não fecha sem evidência verificável.

## 22. Arquitetura oficial de desenvolvimento e operação

### 22.1 Mobile — produto operacional principal

**React Native + Expo + TypeScript** para iOS e Android.

O app profissional é prioridade. Web não substitui o aplicativo.

Recursos essenciais — oportunidades, interesse/aceite, agenda, check-in/out, ganhos, perfil, notificações e suporte — são concebidos primeiro para celular.

### 22.2 Web

**Next.js + React + TypeScript** para empresa/admin/backoffice e fluxos que se beneficiem de desktop.

### 22.3 Backend

**NestJS sobre Fastify + TypeScript**, inicialmente modular monolith.

Domínios:
Identity, Marketplace, Workforce, Matching, Allocation, Scores, Payments, Compliance, Notifications e Verticals.

Python optimization/ML service é exceção natural quando bibliotecas científicas justificarem.

### 22.4 APIs

REST + OpenAPI. WebSocket/SSE quando realtime for necessário.

### 22.5 Dados

- PostgreSQL — transacional.
- PostGIS — geo.
- pgvector — quando necessário.
- Redis — cache/locks/rate limiting/filas rápidas.
- BullMQ — jobs baseline.
- Temporal — somente quando workflows duráveis justificarem.
- S3-compatible — storage.
- Postgres FTS primeiro; OpenSearch somente quando escala justificar.

### 22.6 IA

- gateway próprio multi-provider para OpenAI/Anthropic/outros;
- AI Copilot com LLM + orchestration;
- Matching Engine TypeScript rules + Python se modelos/optimization exigirem;
- Allocation Engine Python + OR-Tools;
- predictive models Python + scikit-learn/XGBoost/LightGBM quando dados sustentarem;
- embeddings/RAG: pgvector + dados curados;
- voice: STT/TTS provider adapter.

### 22.7 Monorepo

TypeScript + pnpm + Turborepo.

Estrutura alvo:
`apps/`, `packages/`, `services/`.

### 22.8 GitHub

Repositório oficial:
**dbdanielbaracho/MLIVRETRABALHO**

GitHub é fonte persistente para:
Documento da Verdade, Registro Integral, ADRs, Evidence Registry, código, testes, workflows e evidências.

### 22.9 CI/CD

**GitHub Actions** para lint, typecheck, tests, build, security scans, migrations, deploy e gates.

### 22.10 Deploy

**Railway** como baseline operacional para web/API/workers/serviços compatíveis.

Separar dev/staging/prod conforme implementação.

Fluxo:
Developer/PR → GitHub → CI gates → merge → Railway deploy → smoke/E2E → Production Truth Gate.

**SHA testado = SHA implantado** no gate de produção.

Secrets somente em secret manager/env seguro; nunca no GitHub.

### 22.11 Observabilidade e testes

OpenTelemetry + Sentry + logs/metrics estruturados.

Testes:
Vitest/Jest; Playwright; Maestro/Detox; k6.

## 23. Multi-tenancy

ADR obrigatório antes de congelar persistence/tenancy.

**ADR-MT-001** deve comparar:
- tenant_id + RLS;
- isolamento lógico na aplicação;
- schema-per-tenant;
- tenant dedicado.

Comparar threat model, custo, migrations, analytics, backup, pooling, performance e risco de missing-filter.

Não escolher RLS apenas porque revisor sugeriu.

**ADR-MT-001 bloqueia schema definitivo de tenancy em produção.**

## 24. Governança de decisões

Documento da Verdade central, versionado e rastreável. Mudança material cria nova versão; versões anteriores permanecem.

Statuses:
- APROVADO
- PROPOSTO
- PROIBIDO-NÃO FAZER
- OPEN QUESTION

Hierarquia de verdade:
1. Production
2. Reproducible tests/evidence
3. Code
4. Official docs/primary sources
5. Documento da Verdade
6. Recorded decisions
7. Conversation
8. AI assumption

O documento define o que deve existir; produção/código/testes provam o que existe.

## 25. Requirements Ledger

Rastreabilidade:
Requirement → Issue → Code → Test → PR → SHA → Deploy → Evidence.

Exemplos:
- PAY-001 — split.
- PAY-002 — consolidated.
- UX-001 — check-in 1 ação.
- UX-002 — 4 áreas profissionais.
- AI-001 — matching.
- AI-002 — LLM não é único decisor crítico.
- SEC-001 — tenant isolation.

## 26. Definition of Done

Feature não está concluída apenas porque existe código.

DoD:
- código;
- unit/integration/E2E/security conforme risco;
- correspondência com UX aprovada;
- deployed SHA = tested SHA;
- funcionamento real em produção;
- evidência.

## 27. Friction Gate

Metas:
interest 1; check-in 1; check-out 1; earnings 1; next work 0–1; rehire 1–2; complete team mínimo; payment mínimo fluxo seguro.

3+ ações exige justificativa.

## 28. Especialistas humanos externos

Obrigatórios nos pontos apropriados:
- especialista tributário/contábil;
- advogado trabalhista/contratos/LGPD;
- pentest antes de produção.

Builder não autocertifica correção legal/tributária.

## 29. Builder vs revisão adversarial

Builder implementa.

Reviewer procura:
missing requirement, vulnerability, edge case, overengineering, UX regression, race, tenant isolation, fraud e financial issue.

Claude é revisor adversarial, **não autoridade**. Sugestões são confrontadas com evidência/tradeoffs; nenhuma muda silenciosamente o Documento da Verdade.

## 30. Production Truth Gate

Registrar/verificar:
production URL; version; commit SHA; frontend SHA; backend SHA; API real; DB real; provider real; jornada real; resultado esperado.

Tested SHA deve ser deployed SHA.

## 31. Stop-the-Line

Bloqueiam avanço:
- dinheiro incorreto;
- vazamento cross-company;
- auth quebrada;
- pagamento ao destinatário errado;
- payout duplicado;
- data loss;
- fraude/security crítica.

## 32. Modelo de agentes

0 Orchestrator/Tech Lead  
1 Product/Requirements  
2 UX/UI & Friction  
3 Research & Evidence  
4 Software Architect  
5 Builder/Engineer  
6 AI/Data Engineer  
7 Payments Specialist  
8 Adversarial Reviewer  
9 QA/Security/Production Auditor

Não são dez validadores independentes. Independência vem de testes automatizados, CI, scanners, dados reais, fontes primárias, Claude/modelo externo, especialistas humanos e Production Truth Gate.

Achado crítico de security/payment bloqueia.

## 33. Hard Dependency Gates

Se decisão estrutural estiver BLOCKING/OPEN, agente não implementa/congela comportamento de produção dependente dela.

OPEN não impede pesquisa, protótipo de UX, infraestrutura neutra, fixtures, interfaces ou simulações reversíveis.

- **LEGAL-ARCH** bloqueia regras definitivas de Allocation/Score/penalty/recurrence/control.
- **FIN-RISK** bloqueia garantia/advance/credit/default e fluxos financeiros definitivos.
- **ADR-MT-001** bloqueia tenancy schema/persistence definitivo.
- **TRUST-ARCH** bloqueia enforcement definitivo de KYC/KYB/no-show/reporting/suspension/dispute.
- **COMP-EVIDENCE** bloqueia decisão material baseada em claim de concorrente não verificado.

Fluxo:
OPEN → research → competitors → sources → decision → ADR/requirement → code → tests.

## 34. Gate de fechamento e reabertura

Cada gate material precisa registrar:
- owner;
- data;
- escopo;
- evidências;
- decisão;
- condições;
- versão/commit afetado;
- critério de reabertura.

Mudança material de premissa, legislação, provider, arquitetura, risco ou comportamento reabre o gate correspondente.

## 35. Regra documental permanente

Existem dois documentos/conjuntos permanentes e separados:

### Documento da Verdade
Estado normativo vigente: arquitetura, funcionalidades, UX, pagamentos, segurança, concorrentes, decisões, requisitos e gates.

### Registro Integral da Conversa
Histórico cronológico **literal recuperável** de mensagens do usuário e respostas do assistente.

Regra:
**Chat → Registro Integral literal → análise/decisão → Documento da Verdade → requisito → implementação → testes → deploy → evidência.**

O Registro Integral não pode substituir mensagens por resumo e ainda se chamar integral.

Quando conteúdo histórico não estiver disponível literalmente, registrar explicitamente:
**TRECHO HISTÓRICO NÃO DISPONÍVEL LITERALMENTE**

Nunca inventar reconstrução literal.

## 36. Política de atualização do GitHub

Nenhuma decisão material deve existir apenas no DOCX ou na memória do ChatGPT.

GitHub deve conter versão textual integral suficiente para que um novo colaborador ou uma nova conversa reconstrua o estado normativo sem depender de memória externa.

DOCX pode ser representação editorial/distribuível, mas não é a única fonte de decisões.

# PARTE B — HISTÓRICO DE DECISÕES

## v1.3
Reestruturação do documento em Parte A (estado normativo) e Parte B (histórico), preservando evolução e auditabilidade.

## v1.4
- arquitetura tecnológica explicitada;
- mobile React Native + Expo + TypeScript confirmado como produto operacional principal;
- Next.js web;
- NestJS/Fastify backend;
- PostgreSQL/PostGIS;
- Python/OR-Tools Allocation;
- GitHub formalizado como fonte persistente oficial;
- GitHub Actions CI/CD;
- Railway deploy baseline;
- Registro Integral formalizado como documento permanente;
- Markdown resumido inicial do GitHub declarado insuficiente e substituído por esta versão integral recuperável;
- Reliability Score passa a exigir causalidade explícita;
- fechamento/reabertura de gates explicitado.

# PARTE C — EVIDENCE REGISTRY — ÍNDICE

| Evidence ID | Fonte/Concorrente | Tema | Estado |
|---|---|---|---|
| COMP-JT-FIN-001 | Job&Talent | trade receivables securitization / risco financeiro | Verificado no histórico; preservar fonte primária no registry |
| COMP-EST-LEGAL-001 | Estaff | termos, pagamentos, intermediação | Verificado no histórico; revalidar detalhes temporais antes de congelar |
| COMP-INSTA-CANCEL-001 | Instawork | cancellation / compensation / reliability | Verificado no histórico; revalidar política corrente antes de congelar números |
| COMP-QWICK-CANCEL-001 | Qwick | cancellation / compensation | Verificado no histórico; revalidar política corrente antes de congelar números |
| COMP-INDEED-CANCEL-PENDING | Indeed Flex | cancellation | PENDING — fonte primária atual independente necessária |

O Evidence Registry detalhado deve ser mantido em `docs/evidencias/`, com URL/fonte, data verificada, fato, confidence/status, transferibilidade ao Brasil e decisão do MLIVRETRABALHO.
