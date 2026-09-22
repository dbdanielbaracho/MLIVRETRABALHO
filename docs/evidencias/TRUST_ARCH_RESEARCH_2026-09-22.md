# TRUST-ARCH — Pesquisa de fontes primárias — 2026-09-22

**Status:** pesquisa/evidência. Não fecha o gate sozinho e não autoriza enforcement definitivo.

## Objetivo

Levantar padrões verificáveis de KYC/identidade, sanções, no-show, bloqueio, suspensão e recurso em plataformas comparáveis antes de definir a arquitetura normativa do MLIVRETRABALHO.

## Fontes primárias verificadas

### Estaff — Brasil
Fonte: https://estaff.com.br/termos-e-condicoes

Fatos relevantes:
- cadastro do prestador exige dados pessoais, CPF, dados bancários, selfie, comprovante de residência e documentos pessoais;
- a Estaff pode checar/revalidar dados e documentos e solicitar complementação;
- inconsistências podem levar a rejeição ou suspensão do cadastro por segurança;
- termos permitem suspensão/inativação por suspeita de irregularidade, uso indevido ou violação dos termos;
- para comportamento inadequado reportado por estabelecimentos, os termos declaram assegurar contraditório.

Transferibilidade: **alta como referência brasileira**, mas aplicação concreta no MLIVRETRABALHO depende de revisão jurídica/LGPD e do modelo contratual final.

### Qwick
Fontes:
- https://support.qwick.com/en/articles/5566657
- https://support.qwick.com/en/articles/13520001
- https://support.qwick.com/en/articles/13042113
- https://support.qwick.com/en/articles/5567297

Fatos relevantes:
- identidade é verificada por terceiro (Stripe IDV) antes de o profissional poder aplicar para shifts;
- há sanções graduais para late cancellation/no-show, incluindo suspensões temporárias e eventual suspensão permanente;
- suspensões temporárias bloqueiam novos shifts, enquanto compromissos previamente confirmados podem permanecer;
- existe revisão de emergências mediante documentação;
- empresa pode bloquear um profissional especificamente para seus próprios shifts, sem que isso seja automaticamente uma suspensão global;
- motivos de dismissal distinguem causa empresarial, conduta do profissional e fatores externos; fatores externos não geram penalidade de presença;
- background check pode ser requisito específico de uma vaga, com o resultado detalhado não exposto à empresa; a empresa recebe apenas a elegibilidade.

Transferibilidade: **alta para desenho de estados, separação de escopos e minimização de dados**, não para copiar prazos/penalidades numéricas.

### Instawork
Fontes:
- https://help.instawork.com/en/articles/4723674-why-was-i-suspended
- https://help.instawork.com/en/articles/6122005-appealing-a-suspension
- https://help.instawork.com/en/articles/5048510-how-reliability-affects-your-shift-access
- https://help.instawork.com/en/articles/2062195-how-are-instawork-pros-vetted

Fatos relevantes:
- suspensão impede novas reservas e informa motivo/duração ao profissional;
- no-show, late cancellation, atrasos, problemas de confirmação e violações repetidas podem gerar restrições;
- há fluxo de recurso de suspensão e consideração de situações excepcionais;
- bloqueio por parceiro é separado de suspensão global da plataforma;
- vetting pode incluir verificação de identidade/background check e outros mecanismos.

Transferibilidade: **alta para transparência, recurso e separação partner-block/platform-suspension**. Regras temporais específicas não devem ser copiadas automaticamente.

### Indeed Flex
Fontes:
- https://indeedflex.com/legal/flexer-terms-and-conditions/
- https://indeedflex.com/legal/flex-levels-policy/

Fatos relevantes:
- faltas, cancelamentos tardios e atrasos podem gerar ações disciplinares;
- o programa de performance possui estados de warning e review antes de ban em determinados cenários;
- ações negativas podem ser contestadas pelo profissional dentro do fluxo da plataforma;
- existe disputa específica para timesheet, com investigação e comunicação de resultado;
- status de revisão pode remover o profissional de futuras oportunidades enquanto o caso é analisado.

Transferibilidade: **alta para warning/review/appeal e trilha de decisão**, mas o vínculo de emprego usado pela operação dos EUA não é automaticamente transferível ao Brasil.

### Job&Talent
Fonte: https://www.jobandtalent.com/legal/terms-of-use-candidates

Fatos relevantes:
- os termos preveem warning, retirada de conteúdo/serviço, suspensão e encerramento de conta em caso de violação;
- a plataforma explicita canal de contato/reclamação;
- medidas podem escalar conforme o caso.

Transferibilidade: **média para taxonomia de ações e escalonamento**; detalhes dependem da relação jurídica/localidade.

## Padrões convergentes

1. **Verificação antes de capacidade sensível:** identidade/documentação antecede acesso pleno ao marketplace ou a determinados shifts.
2. **Menor privilégio:** empresa não precisa receber documento bruto ou relatório de background; recebe estado de elegibilidade quando possível.
3. **Escopos separados:** block por empresa/tenant não é a mesma coisa que suspensão global da plataforma.
4. **Causalidade explícita:** eventos devem distinguir profissional, empresa e força maior; fatores externos não devem virar penalidade automática do profissional.
5. **Estados graduais:** active → warning/review/restricted → suspended/deactivated, conforme risco e decisão humana/política.
6. **Due process:** motivo, evidência, histórico, possibilidade de contestação/recurso e resultado auditável.
7. **Compromissos existentes:** suspensão de novas oportunidades e tratamento de shifts já confirmados precisam ser decisões distintas.
8. **Default-deny em segurança crítica:** KYC/KYB obrigatório, fraude ou risco de identidade podem bloquear capacidade sensível enquanto verificação está pendente.

## Direção proposta para MLIVRETRABALHO

A pesquisa sustenta um modelo em camadas, ainda **PROPOSTO**:

- `identity_verification_status`: pending / verified / rejected / needs_review;
- `business_verification_status`: pending / verified / rejected / needs_review;
- restrição por tenant/empresa separada de ação global de plataforma;
- casos de Trust & Safety como fonte de evidência, nunca uma denúncia isolada como sentença automática;
- ações administrativas com reason code, ator, timestamp, evidência/referência e expiração opcional;
- appeal/dispute como entidade própria e auditável;
- causalidade obrigatória para no-show/cancelamento/ocorrências;
- dados de verificação minimizados: armazenar preferencialmente provider reference/status em vez de documento sensível bruto quando o provider permitir;
- sanção automática definitiva **proibida** enquanto TRUST-ARCH não for fechado e revisado juridicamente.

## Pendências para fechar TRUST-ARCH

- revisão jurídica brasileira/LGPD do modelo de verificação, suspensão, contraditório e retenção;
- definição de provider(s) de KYC/KYB e data-processing terms;
- definição objetiva de reason codes e matriz de ações;
- política de recurso/SLA e tratamento de situações de urgência;
- decisão sobre compromissos já confirmados durante suspensão;
- testes de abuso/fraude e revisão adversarial final.
