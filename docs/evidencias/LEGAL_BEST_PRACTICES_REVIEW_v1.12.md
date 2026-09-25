# MLIVRETRABALHO — Revisão Jurídica Interna por Melhores Práticas v1.12

**Data:** 2026-09-25  
**Status:** BASELINE INTERNO DE RISCO JURÍDICO — NÃO É PARECER JURÍDICO PROFISSIONAL  

## 1. Decisão de governança
O projeto não condicionará mais sua continuidade à contratação de profissional jurídico brasileiro. Em substituição, a equipe adotará uma revisão jurídica interna contínua baseada em fontes primárias oficiais, jurisprudência atual, legislação aplicável, guias regulatórios e melhores práticas de desenho de produto.

Essa decisão remove o parecer externo como gate obrigatório, mas não elimina risco residual. A documentação deve distinguir fato jurídico verificado, interpretação prudencial e decisão de produto.

## 2. Fontes primárias de referência
- CLT, especialmente arts. 2º e 3º, para avaliação de elementos concretos de relação de emprego.
- STF Tema 725 / ADPF 324 para terceirização e divisão do trabalho, sem tratar esses precedentes como salvo-conduto genérico para toda relação plataforma-profissional.
- STF Tema 1291 para vínculo em plataformas digitais; enquanto não houver tese final de mérito aplicável, tratar o tema como controvertido e em evolução.
- LGPD, Lei 13.709/2018, para dados pessoais, transparência, finalidade, minimização, segurança e direitos dos titulares.
- Guias e regulamentação da ANPD para agentes de tratamento, segurança e governança de dados.
- Normas financeiras, fiscais, consumeristas e trabalhistas específicas quando o modelo operacional exigir.

## 3. Guardrails trabalhistas de produto
Para reduzir risco de caracterização de subordinação ou controle incompatível com o modelo marketplace/autônomo, o piloto deve preservar, salvo modalidade jurídica específica diversa:
- liberdade real de aceitar ou recusar oportunidades;
- ausência de exclusividade obrigatória;
- disponibilidade definida pelo profissional;
- possibilidade de atuar para múltiplas empresas;
- ausência de metas compulsórias gerais impostas pela plataforma;
- ausência de controle contínuo de jornada fora do assignment aceito;
- localização apenas quando necessária ao check-in/out e sem tracking background como baseline;
- ranking/matching explicável e sem punição automática por recusa;
- score/reliability baseado em fatos auditáveis, com contestação e revisão humana para efeitos materiais;
- não mascarar relação de emprego quando os fatos concretos mostrarem direção, dependência, pessoalidade, não eventualidade e salário nos moldes legais.

## 4. Guardrails de Trust/Safety e decisões automatizadas
- provider externo fornece fatos/referências, não decisões internas de culpa ou enforcement;
- ações materiais devem ter reason code, audit trail e revisão humana;
- nenhuma suspensão, deactivation, bloqueio financeiro ou cancelamento material deve decorrer automaticamente de um único sinal de provider;
- appeals e contraditório permanecem obrigatórios para decisões materiais definidas pela arquitetura Trust.

## 5. LGPD / privacidade
Baseline:
- finalidade específica e documentada para cada classe de dados;
- minimização por default;
- preferir referências/status do provider a documentos ou biometria brutos;
- controle de acesso least privilege;
- retenção proporcional à finalidade/obrigação;
- trilha de auditoria para Safety, Trust e financeiro;
- contratos e due diligence de operadores/suboperadores;
- segurança técnica e administrativa compatível com risco;
- avaliar necessidade de RIPD para tratamentos de maior risco;
- geolocalização limitada ao necessário para presença/check-in/out;
- decisões automatizadas relevantes devem ter transparência e mecanismo de revisão humana quando aplicável.

## 6. Pagamentos e PSP
- manter provider-neutralidade no domínio;
- não operar dinheiro real sem PSP elegível/contratado e sandbox comprovado;
- não usar conta operacional + PIX manual como default;
- garantia, adiantamento, crédito e cobertura de default ficam fora do piloto;
- split, chargeback, refund, saldo negativo, KYC/KYB/PLD, settlement e responsabilidades devem ser definidos pelo contrato do PSP selecionado;
- fatos externos precisam de binding server-controlled e reconciliação interna.

## 7. Modalidades distintas
Não tratar como equivalentes:
- marketplace/autônomo;
- PJ;
- trabalho temporário;
- terceirização/staffing;
- contratação direta;
- recrutamento/encaminhamento.

Se o produto mudar de modalidade, a revisão jurídica interna deve ser reaberta antes da ativação.

## 8. Gatilhos obrigatórios de re-review interno
Reabrir a análise antes de ativar:
- exclusividade, metas obrigatórias ou controle substancial de jornada/preço;
- tracking background;
- punição automática ou deactivation automática;
- garantia, crédito ou adiantamento;
- nova estrutura de pagamento/split;
- staffing/trabalho temporário/contratação direta;
- nova jurisdição;
- nova classe de dado sensível;
- mudança material de legislação, regulamentação ou jurisprudência.

## 9. Critério de fechamento de LEGAL-ARCH
LEGAL-ARCH pode ser fechado internamente quando:
1. esta revisão estiver incorporada ao Documento da Verdade e Requirements Ledger;
2. os guardrails jurídicos estiverem rastreados para requisitos de produto/código;
3. não houver feature ativa contradizendo esses guardrails;
4. matérias ainda controvertidas estiverem explicitamente marcadas como risco residual e não como certeza jurídica.

## 10. Limitação
Este documento não é parecer jurídico, não garante ausência de passivo e não substitui representação profissional em disputa, fiscalização, negociação contratual específica ou situação que legalmente exija profissional habilitado. Ele é o padrão interno de melhores práticas escolhido pelo projeto para continuar sem gate obrigatório de parecer externo.
