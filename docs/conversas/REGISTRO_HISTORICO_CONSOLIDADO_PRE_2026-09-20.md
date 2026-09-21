# AI WORKFORCE NETWORK

## Registro consolidado da conversa, decisões do produto, Documento da Verdade, UX, arquitetura, pagamentos, governança e estrutura de agentes

> **Nota de conversão (obrigatória para auditoria):**
> Este arquivo é a conversão integral, em Markdown UTF-8, do arquivo original
> `AI_Workforce_Network_Registro_Consolidado_da_Conversa.pdf` (10 páginas, sem
> metadados de autor/data embutidos no PDF, sem formulários, sem anexos —
> verificado via `pdfinfo`/`pdfdetach`).
>
> **O que foi preservado:** todo o texto, todos os títulos e subtítulos, todas
> as tabelas, todas as listas, a ordem original das seções (1 a 14) e o
> conteúdo integral da Seção 13 (diálogos). Marcadores `[Página N]` foram
> inseridos nos pontos onde o PDF original quebra de página, para
> rastreabilidade.
>
> **O que NÃO foi alterado, resumido ou inferido:** nenhuma frase foi
> reescrita, encurtada ou reordenada. Nenhuma lacuna foi preenchida por
> suposição.
>
> **Limitação herdada do próprio PDF (não desta conversão):** o PDF de origem
> já era, ele mesmo, um *registro consolidado* — ou seja, as Seções 1 a 12 são
> uma síntese das decisões do produto, não uma transcrição literal, palavra
> por palavra, da conversa original. Na Seção 13 ("Registro dos últimos
> diálogos deste chat"), as falas do **USUÁRIO** aparecem entre aspas como
> citação direta; as respostas do **ASSISTENTE**, no entanto, já estavam
> registradas no PDF original em terceira pessoa e de forma paraduzida
> (ex.: "Foi confirmado que..."), não como o texto literal que foi escrito
> naquele momento. Esta conversão reproduz exatamente esse mesmo grau de
> literalidade — nem mais, nem menos — porque não existe, além deste PDF,
> nenhuma fonte mais literal recuperável para este período. Qualquer
> reconstrução da fala literal do assistente além do que está aqui seria
> fabricação, e por isso não foi feita.
>
> **Data de referência do conteúdo:** o próprio documento afirma consolidar
> "o conteúdo discutido neste projeto/chat até 20/09/2026". Não há outras
> datas explícitas no corpo do PDF.

---

## [Página 1]

**Documento relacionado mais recente:** Documento da Verdade v0.9.

Este PDF consolida o conteúdo discutido neste projeto/chat até 20/09/2026. Ele preserva as decisões, regras, conceitos, mudanças de versão e os últimos diálogos sobre governança anti-alucinação e divisão de agentes. Quando uma ideia ainda não foi congelada, ela é identificada como proposta, alvo ou item sujeito a gate.

## [Página 2]

### 1. Visão consolidada do produto

O projeto evoluiu para uma plataforma mobile-first de Workforce Network + Marketplace + Workforce OS, com inteligência artificial, conectando profissionais, empresas e oportunidades de trabalho de forma simples, contínua e personalizada.

**Tese central**

Não apenas encontrar trabalhadores. Orquestrar a força de trabalho.

- Marketplace: encontrar e oferecer turnos, trabalhos e oportunidades.
- Workforce OS: gerenciar força de trabalho, escalas, equipes, unidades, pools e execução.
- Work Network: distribuir oportunidades entre profissionais, empresas e pools.
- AI Engines: matching, allocation, scores, planejamento, previsão, no-show, compliance e inteligência operacional.
- Linhas de negócio: marketplace/intermediação e Workforce SaaS/Enterprise.

**Fluxo central**

Empresa informa a necessidade → profissional informa capacidade/preferências → plataforma encontra a melhor combinação → trabalho é confirmado → execução é acompanhada → pagamento e reputação são atualizados → dados retornam para aprendizado contínuo.

### 2. UX mobile-first e layout aprovado

A experiência mobile é a prioridade máxima. A regra permanente é que quanto mais sofisticado for o sistema por trás, mais simples ele deve parecer para quem está trabalhando.

| Perfil | Navegação principal | Princípio |
| --- | --- | --- |
| Profissional | Início \| Trabalhos \| Ganhos \| Perfil | Poucas áreas permanentes; estados e ações aparecem contextualmente. |
| Empresa | Início \| Trabalhos \| Equipe \| Conta | Operação e equipe em primeiro plano; complexidade administrativa escondida quando não necessária. |

**Referências de design**

| Referência | O que foi aproveitado |
| --- | --- |
| Tinder | Decisão rápida, baixa carga cognitiva, foco e ação principal evidente. |
| Uber | Interface contextual e próxima ação certa no momento certo. |
| Nubank | Clareza financeira, linguagem humana e hierarquia simples. |
| Instawork | Oportunidades, agenda, ganhos, histórico e reputação de workforce. |
| Qwick | Operação de shifts, check-in/out, confirmação e automação de casos normais. |

**Regras Friction-First**

- Não adicionar tela, campo, clique, confirmação ou decisão sem demonstrar necessidade.
- Nova tela é a última alternativa; primeiro tentar card, atualização contextual, expansão inline, bottom sheet ou ação direta.
- Uma ação é a meta para tarefas frequentes; duas são aceitáveis quando segurança ou contexto exigirem; três ou mais exigem justificativa.
- Uma decisão por contexto, e não obrigatoriamente uma nova tela por decisão.
- Não pedir novamente dados já conhecidos.
- Notificações devem abrir diretamente no contexto relevante.
- A IA remove complexidade; não vira um menu complicado.

## [Página 3]

- Security-by-backend: controles robustos ficam invisíveis quando não exigem interação.

**Estados contextuais**

Oportunidade → Quero trabalhar → Confirmado → Check-in → Em andamento → Finalizar → Pagamento/Ganhos.

*[O PDF original contém, neste ponto, uma imagem/mockup do baseline visual mobile — telas do fluxo do profissional e da empresa. A imagem em si não é texto e não é reproduzida nesta conversão textual; a legenda da imagem, que é texto, está preservada abaixo.]*

Baseline visual aprovada incorporada ao Documento da Verdade v0.9. O desenho orienta a implementação, mas textos/dados ilustrativos não substituem a especificação funcional.

## [Página 4]

### 3. Profissões, verticais e taxonomia dinâmica

O produto não é limitado a garçom, bartender, limpeza ou cozinha. Esses papéis são exemplos iniciais. A arquitetura deve suportar centenas ou milhares de funções, com ativação comercial profunda por Vertical Packs.

Modelo: Vertical → Família profissional → Função → Especialização → Skills → Certificações → Nível comprovado.

- Um profissional pode exercer múltiplas funções e possuir scores específicos por função.
- O usuário pode digitar ou falar a profissão; a IA sugere classificação e valida antes de criar categoria permanente.
- Verticais candidatas: Hospitality, Events, Cleaning/Facilities, Retail, Logistics/Warehouse, Manufacturing, Construction, Admin/Support e outras após estudo.
- Tipos de vínculo/engajamento suportados: shift/gig, freelance, temporário, recorrente/flexível, temp-to-hire, permanente/CLT quando aplicável, agência/staffing e empregados internos.

### 4. Inteligência e motores centrais

A IA não é simplesmente um chatbot dentro do aplicativo. A arquitetura separa linguagem natural dos motores que tomam decisões estruturadas.

| Componente | Papel |
| --- | --- |
| AI Workforce Copilot | Entende linguagem/voz, estrutura intenção, explica resultados e chama ferramentas. |
| Matching Engine | Calcula adequação entre profissional e oportunidade. |
| Allocation Engine | Otimiza quem deve trabalhar onde, inclusive equipes e restrições de agenda. |
| Score Engine | Professional Score, Reliability Score, Company Score e Match Score. |
| Workforce Planner | Monta semana do profissional e equipe da empresa. |
| Work Graph / Team Graph | Relaciona profissionais, skills, empresas, unidades, equipes, trabalhos e resultados. |
| Forecast / No-show | Regras primeiro; modelos estatísticos/ML apenas quando houver dados suficientes. |

Regra crítica: o LLM não decide sozinho contratação, pagamento, score ou alocação crítica. Razões devem ser estruturadas, explicáveis e auditáveis.

### 5. Pools, reputação, Work Passport e carreira

- Pools: Preferred Pool → Network Pool → Open Pool.
- Enterprise/internal: mesma unidade → outras unidades → talent bench privado → marketplace externo.
- Work Passport: identidade profissional portátil baseada em trabalhos verificados, skills, ratings, presença, pontualidade, certificações, recontratações e scores por função.
- Company Score: reputação bilateral da empresa, incluindo pagamento, organização, respeito, precisão da vaga, cancelamento e intenção de retorno.
- Career Engine: histórico verificado deve ajudar o profissional a avançar para funções melhores e oportunidades permanentes, não prendê-lo a gigs.
- Team Graph / High Performance Crew: identificar equipes que funcionam bem juntas.

### 6. Pagamentos e segregação financeira

Foram aprovadas duas modalidades de arquitetura, mantendo como objetivo separar valores de terceiros da receita da plataforma. O resultado fiscal/jurídico não é presumido: depende de validação contábil, tributária, regulatória e jurídica no Brasil.

## [Página 5]

| Modelo | Fluxo | Direção |
| --- | --- | --- |
| A - Split automático | Empresa paga uma vez → PSP/processadora → remuneração do profissional + taxa da plataforma. | Preferencial/default quando viável. |
| B - Pagamento consolidado | Empresa paga o total → infraestrutura financeira segregada → distribuição 1:N + retenção da taxa. | Alternativa enterprise/operacional, sujeita a validação. |

- Ledger separa GMV/valores de terceiros, payable do profissional, taxa da plataforma, taxas do processador, ajustes, refunds, disputas, chargebacks, payout e reconciliação.
- Conta bancária operacional comum + PIX manual não é arquitetura padrão aceita.
- PSP/BaaS deve ser comparado por PIX, split 1:N, KYC/KYB, payout, webhook, reconciliação, custos e responsabilidade.
- UX: empresa percebe um pagamento; profissional percebe um recebimento; split, ledger e PSP ficam no backend.

### 7. Leakage, contato direto e recontratação

O projeto reconhece que o profissional precisa saber onde vai trabalhar. A defesa contra desintermediação não deve depender de esconder permanentemente o estabelecimento ou punir relações legítimas.

- Antes da aceitação: mostrar informação suficiente para decidir, sem expor dados pessoais desnecessários.
- Após confirmação: liberar endereço operacional, instruções e contato necessário, preferindo comunicação in-app.
- Preferred Pool e 'Chamar novamente' devem tornar a recorrência dentro da plataforma mais conveniente que sair dela.
- Trabalho dentro da plataforma atualiza Work Passport e reputação verificada.
- Direct Hire/Conversion deve ser produto legítimo; circumvention do mesmo job para evitar taxa é questão distinta.
- Detecção de leakage deve usar sinais proporcionais, privacidade e revisão humana; não vigilância invasiva.

### 8. Arquitetura tecnológica proposta

| Camada | Baseline proposta |
| --- | --- |
| Monorepo | TypeScript + pnpm + Turborepo |
| Mobile | React Native + Expo + TypeScript |
| Web | Next.js + React + TypeScript |
| Backend | NestJS + Fastify; modular monolith inicialmente |
| API | REST/OpenAPI; WebSocket/SSE quando necessário |
| Dados | PostgreSQL + PostGIS; pgvector quando houver caso real |
| Cache/Jobs | Redis + BullMQ; Temporal apenas quando justificado |
| Otimização/ML | Python + OR-Tools; ML posterior baseado em evidência |
| Infra | Railway baseline + Postgres gerenciado + Cloudflare + GitHub Actions |
| Observabilidade | OpenTelemetry + Sentry |
| Testes | Vitest/Jest, Playwright, Maestro/Detox quando necessário, k6 |

Princípio: evitar microserviços, Kubernetes, OpenSearch, Temporal e outros componentes complexos antes de evidência de necessidade.

### 9. Evolução do Documento da Verdade

## [Página 6]

| Versão | Mudança principal |
| --- | --- |
| v0.1 | Base inicial do AI Workforce Network. |
| v0.2 | Profissional gratuito + Marketplace Leakage & Conversion Strategy. |
| v0.3 | Introduziu timebox de 40 horas; posteriormente revogado. |
| v0.4 | Removeu a restrição de 40 horas e formalizou desenvolvimento completo. |
| v0.5 | Taxonomia dinâmica, múltiplas profissões, UX friendly e arquitetura de AI Workforce Intelligence. |
| v0.6 | Baseline tecnológica proposta. |
| v0.7 | Duas modalidades de pagamento e objetivo de segregação financeira. |
| v0.8 | Leakage, Preferred Pool, Direct Hire, progressive information e UX Friction Budget. |
| v0.9 | Baseline visual mobile oficial, quatro áreas principais, interface contextual, Friction-First, Security-by-backend e gate de fidelidade visual/UX. |

### 10. Como desenvolver sozinho sem autoaprovação ou alucinação

A proposta foi separar visão, decisão, implementação e verificação. Nem uma ordem do usuário nem uma decisão do agente entra diretamente no código sem controles objetivos quando houver conflito material, risco ou mudança de requisito.

**Fluxo de governança**

Conversa → decisão → Documento da Verdade/ADR → requisito → implementação → testes → auditoria crítica → gates → produção.

**Hierarquia de verdade operacional**

- Produção real.
- Testes e evidências reproduzíveis.
- Código.
- Documentação oficial e fontes primárias.
- Documento da Verdade para o que deve ser construído.

## [Página 7]

- Decisões registradas.
- Conversa.
- Suposição da IA.

O Documento da Verdade define intenção e requisito; produção/código/testes demonstram o que realmente existe. Uma função planejada nunca deve ser declarada implementada sem evidência.

**Requirements Ledger**

| ID exemplo | Requisito | Evidência esperada |
| --- | --- | --- |
| PAY-001 | Split automático | Spec + código + testes + provider + produção |
| UX-001 | Check-in em 1 ação | Layout + E2E + friction test |
| UX-002 | 4 áreas principais do profissional | Baseline visual + navegação implementada |
| AI-001 | Matching Engine | Algoritmo + dataset/test fixtures + testes |
| SEC-001 | Isolamento entre tenants | Autorização + testes negativos + auditoria |

**Stop-the-Line**

- Dinheiro enviado incorretamente, vazamento entre empresas, autenticação quebrada, payout duplicado, perda de dados ou vulnerabilidade crítica bloqueiam deploy.
- Correção exige diagnóstico, regression test, revisão adversarial e verificação em produção.
- Velocidade não passa por cima de gate crítico.

**Gate externo**

Mesmo com desenvolvimento autônomo, tributário/contábil, jurídico/trabalhista/LGPD e pentest especializado não devem ser autoaprovados pelo mesmo agente que implementou. Esses pontos exigem validação externa adequada antes da produção quando aplicável.

### 11. Estrutura proposta de agentes

A divisão proposta foi 9 agentes funcionais + 1 Orquestrador, totalizando 10 papéis. O objetivo não é criar dez opiniões independentes, mas separar construção, especialização e aprovação para reduzir conflito de interesse e groupthink.

## [Página 8]

| # | Agente | Responsabilidade | Limite |
| --- | --- | --- | --- |
| 0 | Orquestrador / Tech Lead | Documento da Verdade, Requirements Ledger, prioridades, conflitos e gates. | Não aprova o próprio trabalho sem evidência. |
| 1 | Product / Requirements | Transforma decisões em requisitos, critérios de aceite e exceções. | Não inventa funcionalidade. |
| 2 | UX/UI & Friction | Protege layout, mobile-first, acessibilidade e mínimo de telas/cliques. | Pode reprovar regressão de fricção. |
| 3 | Research & Evidence | Fontes primárias, concorrentes, APIs, legislação e tecnologia. | Não preenche lacunas com suposição. |
| 4 | Software Architect | Arquitetura, banco, APIs, tenancy, segurança estrutural e ADRs. | Não muda materialmente sem spec. |
| 5 | Builder / Software Engineer | Mobile, web, backend, integrações e migrations. | Não declara o próprio código aprovado. |
| 6 | AI / Data Engineer | Matching, Allocation, Scores, Graph, Planner, LLM Gateway e ML. | LLM não decide criticamente sozinho. |
| 7 | Payments Specialist | PSP/BaaS, split, ledger, payout, conciliação e idempotência. | Não decide sozinho questão fiscal/jurídica. |
| 8 | Adversarial Reviewer | Tenta provar que arquitetura, código ou decisão estão errados. | Não corrige silenciosamente. |
| 9 | QA / Security / Production Auditor | E2E, segurança, performance, visual regression, CI/CD e Production Truth Gate. | Não aprova sem evidência reproduzível. |

Regra: agentes não votam. Um único achado crítico pode bloquear a entrega, mesmo que todos os demais tenham aprovado.

**Especialistas temporários**

Hospitality, Cleaning/Facilities, Logistics, Brazil Labor/Compliance Research, Accessibility, Database Performance e outros podem ser convocados quando o domínio exigir profundidade. Eles não precisam ser agentes permanentes.

### 12. Production Truth Gate e definição de pronto

- Código existe e corresponde ao requisito.
- Testes unitários, integração e E2E relevantes passam.
- Segurança e isolamento passam em testes positivos e negativos.
- UX corresponde à baseline e ao Friction Budget.
- O commit/SHA testado é o mesmo implantado.
- Produção real executa a jornada esperada.
- Logs/observabilidade permitem verificar o resultado.
- Somente então o requisito recebe status CONCLUÍDO.

## [Página 9]

### 13. Registro dos últimos diálogos deste chat

**USUÁRIO**

"importante seguir este layout, este foi o melhor que voce fez, usando todas as tecnicas e exemplos usando o modelo do tinder e outros, como voce se espelhou no design. apenas escrever"

**ASSISTENTE**

Foi confirmado que o layout seria a referência visual principal e explicada a composição de princípios de Tinder, Uber, Nubank, Instawork, Qwick e apps modernos de mobilidade/delivery. Também foram fixadas as quatro áreas principais de profissional e empresa, a interface contextual, IA invisível e a regra de não adicionar tela/campo/clique/confirmação sem necessidade.

**USUÁRIO**

"está tudo isto no documento"

**ASSISTENTE**

Foi informado que o v0.8 continha a maior parte dos princípios, mas ainda faltavam formalização do layout específico, quatro áreas principais, interface contextual, referências explícitas de design, regra de nova tela como última alternativa, IA invisível e incorporação do desenho. Foi definida a criação da v0.9.

**USUÁRIO**

"então colocar no documento inclusive como vai ficar o layout"

**ASSISTENTE**

Foi criada a versão v0.9 do Documento da Verdade com o layout aprovado incorporado, navegação principal, interface contextual, referências de design, Friction-First, Security-by-backend, metas de interação e gate de fidelidade visual/UX.

**USUÁRIO**

"para que não aja conflito de interesse se voce tivesse que desenvolver este projeto sozinho sem alucinações o qualquer tipo de aceitação de ordem errada. como voce faria"

**ASSISTENTE**

Foi proposta uma governança baseada em Documento da Verdade, Requirements Ledger, plano técnico, implementação, testes automáticos, auditoria crítica e Production Gates. Ordens conflitantes não seriam executadas silenciosamente. Foram definidos hierarquia de verdade, evidência para declarar features prontas, visual/friction gates, pesquisa em fontes primárias, gates externos para jurídico/fiscal/pentest, revisão adversarial, mudanças pequenas e Stop-the-Line.

**USUÁRIO**

"em quantos agentes voce iria se dividir ou seja qual seria o papel de cada agente"

**ASSISTENTE**

Foi proposta a divisão em 10 papéis: Orquestrador, Product/Requirements, UX/UI & Friction, Research & Evidence, Software Architect, Builder, AI/Data Engineer, Payments Specialist, Adversarial Reviewer e QA/Security/Production Auditor, além de especialistas temporários por vertical. Agentes não votam; um achado crítico bloqueia a entrega.

### 14. Regra de governança consolidada

Nenhuma pessoa ou IA é fonte absoluta de verdade - nem o usuário, nem ChatGPT, nem Claude. Decisões materiais devem ser confrontadas com requisitos, evidências, testes, fontes primárias e gates aplicáveis. Uma instrução conflitante não é executada silenciosamente; o conflito é registrado e resolvido antes da alteração.

## [Página 10]

Este registro deve ser lido junto do Documento da Verdade v0.9. Em caso de evolução futura, decisões materiais devem gerar nova versão, mantendo histórico e rastreabilidade.

---

*Fim da conversão integral. Rodapé original repetido em todas as páginas do PDF: "AI Workforce Network - Registro consolidado da conversa" + numeração de página — preservado acima como marcadores `[Página N]`.*