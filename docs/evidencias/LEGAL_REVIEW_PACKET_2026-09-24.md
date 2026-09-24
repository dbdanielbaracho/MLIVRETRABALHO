# MLIVRETRABALHO — Pacote para revisão jurídica brasileira

**Data:** 2026-09-24  
**Status:** PACOTE INTERNO PREPARADO / LEGAL-ARCH CONTINUA OPEN  
**Documento normativo vigente:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.8.md`

## 1. Objetivo da revisão externa

Obter parecer/revisão jurídica brasileira documentada sobre o modelo operacional concreto do MLIVRETRABALHO, sem tratar pesquisa de IA, benchmark de concorrentes ou testes de software como substitutos de análise jurídica profissional.

## 2. Escopo técnico e de produto que deve ser entregue ao revisor

O revisor deve considerar em conjunto:

- `DOCUMENTO_DA_VERDADE_v1.8.md` e versões incorporadas por referência;
- `docs/requirements/REQUIREMENTS_LEDGER.md`;
- `docs/roadmap/PLANO_MESTRE_EXECUCAO.md`;
- ADRs vigentes e propostos, especialmente `ADR-MT-001`, `ADR-FIN-001-PROPOSED.md` e `ADR-TRUST-001-PROPOSED.md`;
- `docs/evidencias/INTERNAL_COMPLETION_CHECKPOINT_2026-09-24.md`;
- `docs/evidencias/FIN_PILOT_SCOPE_DECISION_2026-09-24.md`;
- `docs/evidencias/TRUST_ENFORCEMENT_MATRIX_PROPOSED_2026-09-24.md`;
- `docs/evidencias/TRUST_INCIDENT_SLA_PROPOSED_2026-09-24.md`;
- `docs/evidencias/TRUST_DATA_MINIMIZATION_RETENTION_PROPOSED_2026-09-24.md`;
- código/commit exato a ser congelado para a revisão.

## 3. Modelo operacional a revisar

### 3.1 Autonomia profissional

Confirmar riscos e condições jurídicas para um modelo em que o profissional:

- cria conta própria;
- define perfil/disponibilidade;
- pode aceitar ou não oportunidades;
- pode atuar com múltiplas empresas;
- não precisa trocar manualmente de workspace para operar multiempresa;
- recebe recomendações/ranking, mas a confirmação operacional permanece explícita.

Pergunta ao revisor: quais sinais operacionais podem aumentar risco de subordinação, pessoalidade, habitualidade, onerosidade, controle econômico ou vínculo empregatício no modelo concreto?

### 3.2 Matching / Allocation / Planner

Revisar:

- matching por sinais reais (disponibilidade, role fit, reliability e proximidade quando disponível);
- ranking explicável;
- decisões finais humanas;
- alocação/equipe/planner;
- pools preferidos;
- recorrência/concentração com uma empresa;
- substituição de profissional.

Pergunta: quais limites de automação, recorrência, priorização e controle reduzem risco jurídico sem destruir o produto?

### 3.3 Scores / Reliability / reputação

Revisar:

- reputação baseada em fatos reais;
- causalidade explícita de incidentes;
- ausência atual de punição automática;
- recursos/contraditório humanos;
- matriz de enforcement proposta, ainda não ativa.

Pergunta: quais usos de score/reliability podem gerar risco trabalhista, consumerista, discriminatório, reputacional ou de decisão automatizada?

### 3.4 Jornadas, presença e geolocalização

Revisar:

- agenda;
- check-in/start/check-out/conclusão;
- localização foreground opcional no check-in/out;
- ausência de tracking contínuo/background como baseline.

Pergunta: quais bases, avisos, consentimentos/legítimos interesses e limites são necessários para geolocalização e prova de presença?

### 3.5 Cancelamento e substituição

Revisar:

- cancelamento operacional;
- replacement request;
- auto-match de substituto;
- seleção humana;
- causalidade de no-show/falha;
- ausência de strike/suspensão automática.

Pergunta: quais regras contratuais, notificações e direitos de contestação são necessários para reduzir risco de dano injusto e vínculo?

### 3.6 Trust & Safety

Revisar:

- Safety cases tenant-scoped;
- trilha imutável;
- profissional envolvido consegue ver caso relacionado ao próprio assignment;
- recurso `submitted → reviewing → upheld|modified|reversed`;
- revisão humana;
- nenhuma decisão gera score/suspensão/pagamento automaticamente;
- incident SLA proposto;
- enforcement matrix proposta, ainda não ativa.

Pergunta: quais ações preventivas/temporárias são juridicamente aceitáveis antes de conclusão definitiva e quais garantias procedimentais devem existir?

### 3.7 KYC/KYB

Baseline atual é provider-neutral e não deve armazenar documento bruto por padrão.

Perguntas:

- quais verificações são necessárias para PF/PJ conforme o modelo final?
- quais responsabilidades ficam com provider versus plataforma?
- quais dados podem/devem ser armazenados localmente?
- quais retenções e direitos do titular se aplicam?

### 3.8 Pagamentos

Escopo atual do piloto:

- sem garantia financeira da plataforma;
- sem adiantamento ao profissional;
- sem crédito/empréstimo;
- sem cobertura de default;
- sem PIX manual por conta operacional como fluxo padrão;
- fluxo alvo por PSP contratado, com fatos autenticados, ledger/reconciliação e payout vinculado ao profissional correto.

Perguntas:

- qual estrutura contratual de intermediação/split é adequada?
- plataforma pode cobrar fee e em que formato?
- responsabilidades sobre chargeback/refund/saldo negativo?
- requisitos fiscais/contábeis e documentos?
- diferenças PF/PJ?
- quando a plataforma poderia ser enquadrada em atividade regulada financeira?

### 3.9 Modalidades de contratação

O parecer deve separar explicitamente, quando aplicável:

- marketplace/autônomo;
- prestação PJ;
- trabalho temporário;
- terceirização/staffing;
- contratação direta;
- recrutamento/encaminhamento.

A conclusão não deve tratar modalidades juridicamente distintas como se fossem uma só.

### 3.10 LGPD / privacidade

Revisar por classe:

- identidade básica;
- perfil profissional;
- assignments;
- conversas;
- Safety cases;
- appeals;
- Trust events;
- KYC/KYB;
- financeiro;
- logs técnicos;
- geolocalização foreground.

Para cada classe, o parecer deve recomendar:

- finalidade;
- base legal;
- minimização;
- acesso;
- prazo de retenção;
- exclusão/anônimização;
- legal hold;
- compartilhamento com providers;
- transferência internacional se existir;
- necessidade de RIPD/DPIA ou avaliação equivalente;
- regras de decisão automatizada, quando aplicáveis.

## 4. Questões jurisprudenciais que precisam de verificação oficial atual

O revisor deve checar fontes oficiais e situação vigente na data do parecer, evitando atalhos.

- Tema 725 / ADPF 324 / ADC 48: não tratar como salvo-conduto genérico para toda relação plataforma-profissional.
- Tema 1291: verificar situação e alcance em fonte oficial do STF na data do parecer.
- Convenções/recomendações OIT relevantes: distinguir adoção internacional de ratificação/efeito interno brasileiro.

Este pacote não oferece conclusão jurídica sobre esses temas.

## 5. Evidência mínima que o parecer deve conter

O documento externo deve registrar:

1. data da revisão;
2. nome/identificação do profissional responsável;
3. escopo exato de documentos e commit/release revisados;
4. legislação e jurisprudência consideradas;
5. matérias pendentes/controversas separadas de normas consolidadas;
6. riscos por área;
7. condições/restrições operacionais recomendadas;
8. cláusulas/termos/políticas que precisam existir;
9. conclusão formal sobre o escopo revisado;
10. gatilhos de nova revisão quando o modelo mudar materialmente.

## 6. Gatilhos obrigatórios de re-review

Nova revisão deve ser acionada, no mínimo, se houver:

- ativação de garantia, crédito ou adiantamento;
- mudança relevante no modelo de pagamento/split;
- aplicação automática de score/suspensão/deactivation;
- tracking/background location;
- mudança de marketplace para staffing/temporário/direto;
- exclusividade, metas obrigatórias ou controle substancial de jornada/preço;
- expansão para nova jurisdição;
- nova categoria de dado sensível;
- mudança material em jurisprudência/legislação aplicável.

## 7. Resultado esperado

A entrega externa deve permitir decidir de forma objetiva:

- o que pode entrar no piloto;
- o que precisa de restrição;
- o que exige contrato/política adicional;
- o que precisa permanecer desabilitado;
- quais mudanças de software/UX são obrigatórias antes de Production/Pilot-DONE.

## 8. Estado do gate

Com este pacote, a **preparação interna para revisão jurídica está concluída**. `LEGAL-ARCH` continua OPEN/BLOCKING até existir parecer/revisão externa profissional identificada que cumpra a evidência acima.
