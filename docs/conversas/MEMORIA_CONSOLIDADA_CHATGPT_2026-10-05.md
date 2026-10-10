# MLIVRETRABALHO — MEMÓRIA CONSOLIDADA DAS CONVERSAS CHATGPT

> Integração/gates consolidados em 2026-10-10 02:32 UTC: [execução verificada](EXECUCAO_VERIFICADA_2026-10-10_0232Z.md). Reconsultar GitHub; estados abaixo são históricos da versão.

**Data de consolidação:** 2026-10-05  
**Escopo exclusivo:** MLIVRETRABALHO  
**Repositório:** dbdanielbaracho/MLIVRETRABALHO  
**Natureza:** memória histórica recuperável; não substitui o Documento da Verdade.

## Regra de integridade

Este registro consolida todo o conteúdo do projeto MLIVRETRABALHO recuperável nesta execução a partir do histórico/memória do ChatGPT, dos registros já persistidos em `docs/conversas/` e do documento de memória existente.

**Não misturar:** TikTok, Creator Commerce OS/Euka, FastMoss, Kalodata, Growth OS ou qualquer outro projeto.

Quando uma conversa histórica não está disponível literalmente, ela **não é reconstruída como transcrição**. Nesses casos registra-se somente a informação recuperável e aplica-se a marca:

> **TRECHO HISTÓRICO NÃO DISPONÍVEL LITERALMENTE**

Fluxo obrigatório: **Chat → Registro Integral literal quando disponível → análise/decisão → Documento da Verdade → requisito → implementação → testes → deploy → evidência.**

## Registros históricos já preservados no GitHub

O repositório já contém o histórico anterior e continuações em `docs/conversas/`, incluindo:
- `HISTORICO_PRE_2026-09-20.md`;
- `REGISTRO_HISTORICO_CONSOLIDADO_PRE_2026-09-20.md`;
- `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-20.md`;
- continuações de 2026-09-22;
- 2026-09-23;
- 2026-09-24;
- 2026-09-25;
- 2026-09-26;
- 2026-09-27.

Esses arquivos permanecem parte integrante da memória do projeto e não devem ser apagados ou substituídos por resumo.

## Conteúdo recuperado de conversas anteriores

### Produto e arquitetura
MLIVRETRABALHO foi definido como **AI Workforce Network + Workforce OS + Marketplace**, mobile-first, com o aplicativo como produto operacional principal. A arquitetura registrada inclui React Native + Expo + TypeScript no mobile, Next.js no web, NestJS/Fastify no backend, PostgreSQL/PostGIS, Redis/BullMQ, Python/OR-Tools quando apropriado, GitHub Actions e Railway.

O GitHub é a fonte persistente oficial para Documento da Verdade, Registro Integral, ADRs, evidências, código, testes e workflows.

### UX e layout aprovado
A baseline própria do MLIVRETRABALHO foi aprovada anteriormente e está vinculada ao Documento da Verdade e ao mockup original. A direção é **“AI WORKFORCE NETWORK — Simples para usar. Seguro para todos.”**

Navegação canônica:
- Profissional: **Início | Trabalhos | Ganhos | Perfil**.
- Empresa: **Início | Trabalhos | Equipe | Conta**.

Identidade visual: roxo, cards, hierarquia simples, navegação inferior compacta e jornadas contextuais. Mudanças de estado devem ocorrer no contexto, evitando uma tela nova para cada estado. O desenho canônico aprovado é especificação; não deve ser substituído por novo layout inventado.

### Regra reforçada em 2026-10-05 — erro de fidelidade visual
Foi identificado que as correções visuais dos PRs #292–#298 aproximaram o aplicativo da baseline, mas foram feitas de modo incremental e não provaram fidelidade integral ao desenho original. CI verde e APK standalone verde provam build/runtime, **não fidelidade visual**.

Regra permanente acrescentada à memória:
1. consultar Documento da Verdade antes de UX/UI;
2. recuperar também o desenho canônico original;
3. não reinterpretar layout já aprovado;
4. rastrear requisito → referência → implementação atual → divergência → correção;
5. aplicar **Visual Truth Gate** antes de declarar design concluído;
6. comparar estrutura, cores, tipografia, cards, botões/CTAs, ícones, espaçamentos, navegação, estados e rolagem;
7. CI/APK verde não substitui o Visual Truth Gate;
8. reconsultar a referência depois da implementação e antes do merge;
9. não declarar conclusão parcial como conclusão total;
10. em dúvida, recuperar evidência; não inventar.

### Execução autônoma
O usuário determinou repetidamente que o projeto deve continuar autonomamente até o final, sem depender de mensagens “continuar”. Interromper apenas por custo, risco, credencial, decisão do usuário ou bloqueio externo real sem outro trabalho interno seguro disponível.

Status acordados:
- 🟢 TRABALHANDO — execução real em andamento;
- 🟡 AGUARDANDO — CI/workflow/processo externo em andamento;
- 🔴 PARADO — PRECISO DE VOCÊ — ação do usuário realmente necessária;
- ⚪ PARADO — AUTOMAÇÃO ATIVA — sem execução interativa naquele instante, mas automação seguirá;
- ✅ CONCLUÍDO — etapa realmente concluída e gates aplicáveis validados.

Não dizer que está trabalhando quando nenhuma ação está sendo executada. Reconsultar GitHub ao responder status.

### Automação
Automação **Continuar MLIVRETRABALHO**, ID `6abfcee970f48191b37199dd8d34687c`, foi configurada como condition watch horária. Ela deve consultar o estado real do GitHub em cada execução, nunca fixar um PR antigo, acompanhar PR atual, CI e Standalone Pilot APK, corrigir falhas evidenciadas, fazer merge quando verde e continuar para o próximo trabalho interno documentado.

A automação horária é fallback; durante conversa ativa, a execução pode prosseguir interativamente sem esperar a próxima hora.

### Android standalone / Samsung
Regra: APK não deve ser considerado validado apenas porque compilou. O Android standalone sem Metro é gate permanente.

Problema real diagnosticado anteriormente: incompatibilidade **React 19.3.0 vs react-native-renderer 19.1.4**. Baseline preservada: **React 19.1.4** e **React Native 0.81.6**, lockfile reproduzível.

PR #289 corrigiu a compatibilidade. CI e Standalone Pilot APK passaram e houve validação no Samsung físico em 2026-10-02, registrada em evidência no repositório.

### Sequência visual consolidada
- PR #290: alinhamento à baseline do Documento da Verdade; navegações Profissional/Empresa; Documento v1.19.
- PR #291: README para v1.19.
- PR #292: baseline visual da navegação; estado ativo, acessibilidade, identidade roxa; Documento v1.20.
- PR #293: baseline visual de Início/Trabalhos profissional; v1.21.
- PR #294: Ganhos/Perfil; v1.22.
- PR #295: áreas da Empresa; v1.23.
- PR #296: contextualização das ações no Início da Empresa; v1.24.
- PR #297: fluxo profissional contextual Confirmado → Check-in → Em andamento → Check-out → Concluído; v1.25.
- PR #298: navegação primária canônica colocada fora da área rolável e no final das oito telas; v1.26; CI e Standalone verdes; merge `250f837145c180c27d337f6a7061fdc0a4c17a03`.

A v1.26 **não declara fidelidade visual completa**; ela registra explicitamente que a auditoria visual dos fluxos restantes continua necessária.

### APK e download em 2026-10-05
O artefato validado do PR #298 foi identificado como `MLivreTrabalho-standalone-apk`, artifact id `11310385772`, aproximadamente 28,8 MB. Houve problemas de entrega ao usuário:
- URL da API GitHub retornou 401 por autenticação;
- link sandbox do ChatGPT retornou “Não foi possível baixar”;
- links temporários assinados retornaram erro de expiração/autenticação.

Conclusão: os erros observados eram do mecanismo de entrega/link, não evidência de defeito do APK. Não continuar apresentando links temporários como solução estável sem validação.

### Railway / produção
Histórico recuperado registra Railway como baseline. Em 2026-09-22 houve bloqueio de pre-deploy por `DATABASE_URL_required` no serviço API. O projeto usa Production Truth Gate: SHA testado deve corresponder ao SHA implantado, com smoke/E2E/evidência real quando aplicável.

### Segurança, pagamentos e blockers externos
Gates externos/pendências historicamente registrados incluem PSP/KYC/KYB/PLD, split, estorno, saldo negativo, custos, sandbox do produto financeiro exato, pentest independente, validação física quando aplicável e serviço Railway sujeito a custo.

Issues externas conhecidas: #228 PROVIDER-DUE-DILIGENCE, #224 WEB-ARCH, #220 Pilot readiness, #219 TRUST-ARCH, #215 FIN-RISK. Não inventar fechamento desses gates. Enquanto houver trabalho interno documentado, continuar nele.

### Concorrentes e pesquisa
Referências permanentes do projeto incluem Estaff, Instawork, Qwick, Indeed Flex e Job&Talent. Decisões materiais baseadas em concorrentes exigem fonte primária/evidência, comparação, aplicabilidade ao Brasil e registro no Evidence Registry.

### Governança documental
Existem dois conjuntos distintos:
- **Documento da Verdade:** estado normativo vigente.
- **Registro Integral / Memória das Conversas:** histórico do que foi discutido e decidido.

O Documento da Verdade deve ser consultado antes de execução. O Registro Integral não pode chamar resumo de “transcrição literal”. Lacunas devem permanecer explicitamente identificadas.

## Solicitação do usuário em 2026-10-05

O usuário determinou: **“pegar todas as conversas no ChatGPT deste projeto e colocar no nosso documento de memória”.**

Esta consolidação incorpora todo o material do MLIVRETRABALHO recuperável nesta execução e referencia os registros históricos já existentes no GitHub. Conteúdo de outros projetos foi deliberadamente excluído.

> **TRECHO HISTÓRICO NÃO DISPONÍVEL LITERALMENTE:** a interface/ferramenta disponível nesta execução não fornece exportação literal irrestrita de todas as conversas históricas da conta ChatGPT. Portanto, conversas antigas não disponíveis palavra por palavra não foram inventadas. Foram preservadas como fatos/decisões recuperáveis, enquanto os registros literais já existentes em `docs/conversas/` continuam sendo a fonte para os trechos efetivamente capturados.

## Regra para próximas conversas

Ao final de nova decisão material do MLIVRETRABALHO:
1. registrar a conversa literal quando disponível;
2. atualizar esta memória/registro histórico;
3. atualizar o Documento da Verdade apenas se houver mudança normativa;
4. manter rastreabilidade no GitHub;
5. nunca misturar outros projetos;
6. nunca substituir o layout canônico aprovado por interpretação nova;
7. nunca considerar fidelidade visual concluída sem Visual Truth Gate.


---

## 2026-10-09 — Continuação autônoma, PRs #330/#331 e regra de gates pós-merge

**Contexto:** o usuário solicitou continuar o MLIVRETRABALHO sem precisar digitar “continuar”. A automação horária permanece restrita a este projeto. O repositório oficial continua sendo `dbdanielbaracho/MLIVRETRABALHO`, branch `main`.

**Estado verificado antes da integração:**
- `main` estava em `a4c1676e689cf591f2e59746219c2afd8c2ec441`, após o PR #329;
- PR #330 — `fix(mobile): handle earnings loading and network errors`: CI foundation e Standalone Pilot APK concluídos com sucesso;
- PR #331 — `fix(mobile): clear local session when signout is offline`: CI foundation e Standalone Pilot APK concluídos com sucesso;
- ambos estavam abertos, mergeáveis e com `mergeable_state=clean`.

**Ação executada:**
- PR #330 integrado por squash, resultado `6c26d7440f705c8b00f779443c944ac252e91064`;
- PR #331 integrado por squash, resultado atual da `main` `fb920d043a7e6d8c6c7837ef01ea0bcd4a27f8eb`.

**Regra de pós-merge:** o merge não é considerado concluído até que os workflows da nova `main` terminem com sucesso. Em seguida, a próxima tarefa interna segura é executar o Visual Truth Gate das 11 telas, comparando Documento da Verdade, referência canônica, implementação, estados, rolagem, navegação e evidências. CI/APK verdes não substituem a auditoria visual.

**Atualização da automação:** a automação horária deve sempre consultar o estado atual da `main`, PRs, CI e Standalone Pilot APK; não deve fixar PR antigo; deve atualizar código e documentos/memória no mesmo ciclo; deve continuar enquanto houver trabalho interno seguro; e deve parar somente por bloqueio externo real, custo, risco ou aprovação necessária.


---

## 2026-10-09 — Pós-merge: CI da main aprovado

Após os merges dos PRs #330 e #331, a nova `main` `fb920d043a7e6d8c6c7837ef01ea0bcd4a27f8eb` foi verificada.

- Workflow **CI/foundation**: concluído com sucesso.
- Workflow **Standalone Pilot APK**: ainda em execução nesta verificação.
- A integração só será considerada totalmente validada quando o APK Standalone também terminar com sucesso.
- O Visual Truth Gate das 11 telas permanece como próxima tarefa interna após a confirmação do APK.

---

## 2026-10-09 — Visual Truth Gate de Ganhos, gate Android e PR #333

**Estado inicial verificado:** a `main` estava em `f14b905065999a9f9e4316fbaa839c00bc65d8a2`, o Documento da Verdade vigente era a v1.26 e não havia outro PR aberto concorrente.

**Divergência visual corrigida:** na tela `apps/mobile/app/ganhos.tsx`, as etiquetas dos dias do gráfico semanal usavam `#EDE8FF` sobre fundo branco e ficavam praticamente ilegíveis. O PR #333 alterou somente essa cor para `#65708A`, sem mudar rotas, API, autenticação, regra de negócio, estado, React, React Native ou lockfile.

**Endurecimento do gate Android:** a validação revelou condições de corrida do emulador hospedado:
- PackageManager ainda indisponível após `sys.boot_completed`;
- script multilinha incompatível com a execução linha a linha do action;
- sondagens ADB sem limite de tempo;
- provedor `settings` ainda não instalado;
- falha transitória interna do executor com `Broken pipe` antes do script do projeto.

O workflow passou a reconectar o ADB, confirmar boot, aguardar serviço e consulta real do PackageManager, aguardar o provedor de configurações e limitar as sondagens com `timeout`. A falha interna transitória foi repetida de forma controlada.

**Gates do PR:**
- CI/foundation, run `37972636600`: sucesso;
- Standalone Pilot APK, run `37972636568`, tentativa 2: sucesso;
- APK instalado e aberto sem Metro; processo e atividade detectados; artefato validado publicado.

**Integração:** PR #333 integrado por squash. Nova `main`: `cb7b689983976255798af661ca2e59a2d4c738c0`.

**Governança:** Documento da Verdade v1.27 e evidência `MOBILE_VISUAL_AUDIT_GANHOS_v1.27.md` registram o resultado. O Visual Truth Gate global permanece aberto para as demais telas e estados. Continuam externos e separados: navegação/inspeção física quando aplicável, pentest independente, PSP/KYC/sandbox, WEB-ARCH e decisões com custo.

---

## 2026-10-09 — Identidade roxa das áreas da Empresa, PR #335

**Referência consultada:** os Documentos da Verdade v1.20 e v1.23 exigem identidade roxa para a navegação e para as quatro áreas canônicas da Empresa. A v1.27 preservava essas decisões.

**Divergência encontrada:** `empresa-inicio.tsx`, `empresa.tsx`, `equipes.tsx`, `empresa-conta.tsx` e `CompanyNav.tsx` ainda usavam azul `#064A9B` e superfícies azuladas em navegação ativa, CTAs, métricas, seleção e ícones.

**Correção:** PR #335 reconciliou somente a paleta com o roxo canônico (`#651FFF` nas telas e `#5B21F3` na navegação ativa), preservando funções, rotas, API, autenticação, contratos, regras de negócio, estados e dependências.

**Gates:**
- CI/foundation, run `37978237083`: sucesso;
- Standalone Pilot APK, run `37978237199`: sucesso;
- APK instalado e aberto sem Metro; artefato validado publicado.

**Integração:** PR #335 integrado por squash em `460bd1fbaa1bc284848caf5c609fb916ebab5ee7`.

**Governança:** Documento da Verdade v1.28 e evidência `MOBILE_VISUAL_AUDIT_EMPRESA_IDENTIDADE_v1.28.md` registram o fechamento desta divergência. O Visual Truth Gate global continua aberto para telas, estados e fluxos restantes; os gates externos permanecem separados.

---

## 2026-10-09 — Fechamento estático das 11 telas, PR #337, e resiliência do CI, PR #338

**Referência consultada:** Documento da Verdade v1.28, decisões visuais preservadas desde v1.20/v1.23 e regra do Visual Truth Gate registrada nesta memória.

**Último grupo visual:** abertura, entrada e criação de conta ainda apresentavam layout genérico preto/branco. O PR #337 aplicou marca, hierarquia, roxo canônico `#651FFF`, superfícies/bordas coerentes, seleção acessível de tipo de conta, rolagem para dispositivos menores e rótulos/papéis de acessibilidade. Endpoints, autenticação, payloads, redirecionamentos e regras de negócio foram preservados; o `any` local do cadastro foi apenas substituído por tipagem explícita equivalente.

**Escopo estático reconciliado:** quatro áreas do Profissional, quatro áreas da Empresa e três telas de entrada/autenticação, totalizando as 11 telas-alvo. Esse fechamento é de código/estrutura/identidade/estados/rolagem. Ele não substitui inspeção visual navegada em aparelho físico nem aceite do piloto.

**Android hospedado:** o primeiro APK da PR #337 encontrou `PackageManagerInternal.freeStorage` indisponível durante a instalação, apesar de PackageManager e Settings já responderem. O workflow passou a repetir a instalação do mesmo APK por até seis tentativas durante no máximo um minuto, registrando a saída e falhando se o erro persistir.

**Gates e integração do PR #337:**
- CI/foundation `37988712992`: sucesso;
- Standalone Pilot APK `37988712988`: sucesso;
- merge squash `2bb27ea09e7233f2b4c93a70c02d0e7fbf2c0962`;
- APK pós-merge `37991615638`: sucesso, com instalação e abertura standalone sem Metro.

**Falha externa pós-merge e correção:** o CI `37991615787` falhou em duas tentativas antes do checkout porque o Docker Hub retornou `toomanyrequests` ao runner anônimo para `postgres:17`. Não houve execução nem falha de código do projeto. O PR #338 passou a usar o espelho público da mesma Docker Official Image em `public.ecr.aws/docker/library/postgres:17`, sem alterar versão, banco, healthcheck ou testes.

**Gates e integração do PR #338:**
- CI `37991825498`: sucesso;
- merge squash `74cfa372b8f824adee3e99394556450eec24d9c3`;
- CI pós-merge `37992084863`: sucesso.

**Governança:** Documento da Verdade v1.29, evidência `MOBILE_VISUAL_AUDIT_ENTRADA_v1.29.md` e Evidence Registry registram o resultado. Permanecem externos e separados: inspeção física/piloto, pentest independente, PSP/KYC/KYB/PLD/sandbox/contratos, FIN-RISK, TRUST-ARCH provider-specific, WEB-ARCH e decisões de custo/deploy.

---

## 2026-10-09 — Correção de pausa prematura e regra de continuidade

**Fatos:** após integrar #339, o agente concluiu indevidamente que somente gates externos restavam e desativou as duas rotinas. A consulta dos PRs/issues não excluía pendências no código/checkpoints. A inspeção posterior confirmou dados fictícios em `profissional-inicio.tsx` e ausência de `CompanyNav` em `empresa.tsx`, cuja aplicação deve ser reconciliada com a rota/refêrencia canônicas.

**Correção de autoridade:** o fechamento estático integral registrado na v1.29 e no trecho histórico anterior desta memória foi prematuro. v1.30 o revoga; Visual Truth Gate permanece OPEN. As alterações específicas e resultados CI/APK continuam válidos. Esta correção não entrega ainda as mudanças funcionais pendentes.

**Ação:** uma única rotina foi reativada e recebeu regra de continuidade por tarefa, checkpoint persistente, fila de dados reais/navegação/auditoria, proibição de parar apenas por ausência de PR e reavaliação quando houver dependências externas. A rotina duplicada permanece desativada.

**Regra de prevenção:** bloqueios parciais não encerram desenvolvimento; CI em andamento deve ser acompanhado. Antes de afirmar que não há trabalho interno, revisar requisitos, desenho, código, dados/estados reais e checkpoint. Fim de rodada não é fim de projeto. A rotina permanece ativa até conclusão integral comprovada ou ordem explícita de parada, sem promessa de execução ininterrupta. Custos, risco, credenciais e rejeições limitam as operações correspondentes; não autorizam contornar controles.

**Registro literal disponível — usuário:**
> O QUE VOCE ESTÁ FAZENDO AGORA

> PORQUE PAROU ME EXPLICA

> O QUE DEVE SER FEITO PARA VOCE NÃO PARAR MAIS , PORQUE TODA HORA VOCE ME DA UM MOTIVO QUE PAROU, EU QUERO SABER COMO FAZER PARA VOCE NÃO PARAR MAIS

**Persistência:** `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.30.md` e `docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md`. Atualizar checkpoint em cada nova rodada com resultados reais, próximas ações e blockers específicos.


---

## 2026-10-09 — Retomada: dados reais no Início Profissional e navegação Empresa

**Registro literal disponível — usuário:**
> continuar

**Base:** main `169cd0c9f83930af7d16569f95fb3073e4ca4f9d`, após #340; CI PR `38005345097` e CI main `38005572486` aprovados. Leitura do Documento v1.30, checkpoint, memória, código e contratos das APIs.

**Execução:** branch `fix/real-professional-home-and-company-nav` substitui todos os dados fictícios do Início Profissional por quatro GETs autenticados existentes, erros independentes, vazio, retry, cancelamento/timeout e recarga ao retornar. Contagens por calendário local, ganhos explicitamente semanais, agenda/horários/locais reais e disponibilidade por janela; sem distância inventada. Confronto de CompanyNav com v1.26 confirmou /empresa como rota canônica Trabalhos e justificou barra inferior fora da rolagem.

**Validação local:** oito testes aprovados em UTC e America/Sao_Paulo. Script mobile test incorpora testes, sem dependências novas, React/RN/lockfile preservados. CI/APK/merge ainda pendentes nesta atualização inicial; devem ser acompanhados e registrados, sem afirmar aprovação antecipada.

**Documentação:** Documento v1.31, evidência MOBILE_REAL_HOME_AND_COMPANY_NAV_v1.31, Evidence Registry e checkpoint no mesmo ciclo. Visual Truth Gate OPEN; próxima ação é concluir gates e seguir comparação das telas/estados com referência original. Uma rotina permanece ativa; não encerrar projeto por fim de rodada ou ausência de PRs.


---

## 2026-10-09 — Integração #341 e atalhos reais do Perfil

**Registro literal — usuário:**
> CONTINUAR

**Verificação e ação:** Documento v1.30 vigente na main, memória/checkpoint e diff reconsultados. #341 head `1a58d538b89269a89662cbf48ce12f3102293149`, CI `38006447169` e APK `38006447148` sucesso. Merge `1f40e9e0bcab3e302b3319652a8f030495d7ccde`; CI/APK pós-merge `38012421142`/`38012421105` em andamento no registro inicial.

**Próxima fatia:** branch `fix/profile-existing-shortcuts` liga Disponibilidade e Notificações do Perfil às rotas existentes em uma ação, preservando layout, edição e contratos. Destinos lidos antes da alteração. Acessibilidade de botão explicitada. CI/APK/merge desta fatia ainda pendentes; não são afirmados verdes antecipadamente.

**Pendências verificadas:** Disponibilidade save sem catch/busy; Notificações load sem loading/catch/erro distinto de vazio. São tarefas internas independentes para continuidade. v1.32, evidência, requisitos, registry e checkpoint atualizados no mesmo ciclo. Visual Truth Gate OPEN; nenhuma pausa por ausência de PR e nenhuma declaração de execução 24h.


---

## 2026-10-09 — Continuidade durante gates: destinos do Perfil

**Implementação preparada:** branch `fix/professional-secondary-network-states` sobre head do #342. Disponibilidade trata HTTP/rede/timeout e impede envio simultâneo preservando campos no erro. Notificações distingue loading/erro/vazio, tem retry/recarga no foco, guarda respostas antigas e preserva tenant na marcação como lida. Rolagem e navegação inferior fora do conteúdo, sem novo design/contrato/dependência.

**Teste:** seis novos testes de calendário/notificações mais oito do Início: 14/14 locais UTC/São Paulo. Não apresentados como E2E nativo nem prova do guard/UI. CI/APK da nova fatia pendentes no registro inicial; integração só após #342 e diff/gates próprios.

**Gates reconsultados:** #341 pós-merge CI `38012421142` sucesso, APK `38012421105` em andamento. #342 CI/APK `38012515909`/`38012515803` em andamento. Documentos v1.33, requisitos, evidência, registry/checkpoint no mesmo ciclo. Próxima lacuna concreta: Perfil ignora HTTP não-ok de Passport e exibe 0 avaliações antes de carregar. Visual Truth Gate OPEN e continuidade ativa.

---
## 2026-10-09 — Perfil e desenho original recuperado

Branch fix/profile-honest-network-states preparada sobre #343 (31f546868356775b993dc69bff2f08ef42998001). Perfil distingue HTTP/rede/schema inválido de ausência real e loading; sem estatísticas 0 antes da resposta; retry/foco e 15s; rascunho preservado/save com guard; signout mantém limpeza offline. Cinco testes novos, **19/19 UTC/São Paulo**. CI/APK desta fatia pendentes; integrar após #343, diff próprio e gates.

Desenho original recuperado no DOCX v1.2 de 20/09/2026, página 26, word/media/image1.png. PNG intacto/proveniência/hashes em docs/referencias. Inspeção da imagem confirma dez situações de profissional/empresa e quatro áreas; valores/nomes/promessas são ilustrativos, não dados/capacidades reais. Visual Truth Gate permanece OPEN até comparação da aplicação real e estados completos.

Reconsulta: #341 pós-merge CI 38012421142 sucesso, APK 38012421105 em andamento. #342 CI 38012515909 sucesso/APK 38012515803 em andamento. #343 head exato CI 38012742580 sucesso/APK 38012742579 em andamento. README/v1.34, requisitos/evidência/registry/checkpoint atualizados no mesmo ciclo. Não considerar espera dos runs como bloqueio ou conclusão.

---
## 2026-10-09 — Ganhos: ledger e semana coerentes com Início

Branch fix/earnings-real-ledger-states encadeada após #344 b2f81a5e5c8e7151e16edcaf4345739c1aba4a67. Ganhos corrigido: total/gráfico somente payable/paid entre segunda local e agora; sem pending/reversed/desconhecido/futuro. Total não mostra zero durante loading/falha; histórico mostra estado real, tenant:id, retry/foco/timeout e payload validado. EarningsController lido; API/autenticação/RLS/backend preservados. Quatro testes novos, **23/23 UTC/São Paulo**, sem claim UI nativa.

Documentos v1.35/evidência/requisitos/registry/checkpoint no mesmo ciclo; gates próprios pendentes antes de integrar após #344. APK #341 pós-merge e #342 chegaram ao smoke sem Metro, ainda sem PASS no registro inicial. CI #343 sucesso, APK em andamento; #344 CI/APK em andamento. Visual Truth OPEN. Próxima pendência real lida: EmpresaInicio vazios prematuros/falhas e ações rate/addPreferred sem catch/guard; validar controladores.

---
## 2026-10-09 — Painel Empresa durante gates

Branch fix/company-dashboard-network-states parte do head corrigido #345 58b3b9455b1406923a2676d9cc8b0ec0916a7d4c. Dashboard/listas com estados independentes, partial success, payload validado, foco/timeout/geração e limpeza no blur. Contagens do controlador não são só de hoje; subtitle corrigido. Rating/preferred catch/guard/timeout/HTTP; ID de conversa dos mesmos headers da leitura e check tenant antes do POST. Signout limpa offline. Contratos/backend/policies/RLS/desenho preservados.

Quatro testes novos, **27/27 UTC/São Paulo**; CI/APK próprios pendentes. v1.36, evidências, requisitos, registry/checkpoint no ciclo. #344 CI aprovado. #345 CI antigo 38013341406 falhou TS5097 no import; corrigido sem relaxar tsconfig, novo head acima deve passar próprios gates. Não usar run antigo para merge. APKs anteriores ainda em acompanhamento, sem PASS antecipado. Visual Truth OPEN. Próximo item verificável: Trabalhos só carrega na montagem/sem timeout; revalidar APIs e estados/agenda.

---
## 2026-10-09 — Agenda e pós-merge #341 comprovado

Branch fix/agenda-real-assignment-states sobre #346 ea36faf73c22a533cb5461cb561c248412d9a0b0. Agenda com loading/erro/vazio/retry/foco/timeout/geração, badge real, ações existentes e rating apenas completed; cancelled/desconhecido sem ação/rating indevidos. Horários reais; POST x-tenant-id do item, guard por tenant:id e catch/refresh; GPS segue opcional, timeout após permissão. Backend/ciclo/policies/RLS preservados. Quatro testes novos, **31/31 UTC/São Paulo**; gates próprios pendentes. Documentos v1.37/evidência/requisitos/registry/checkpoint no ciclo.

#341 main 1f40e9e0bcab3e302b3319652a8f030495d7ccde: CI pós-merge 38012421142 e APK 38012421105 sucesso, smoke DEVICE_SMOKE_OK sem Metro e artefato 11654492684. #345 CI corrigido 38013501602 e #346 CI 38013571739 sucesso; respectivos APKs em andamento. Visual Truth OPEN. Nenhum encerramento global/automação por espera. Próximas pendências lidas: Trabalhos foco/timeout, Equipe/Interessados loading/falhas/seleção concorrente; priorizar correção segura e capturas conforme referência.

---
## 2026-10-09 — Início confrontado com desenho original; #342 integrado

Branch fix/home-original-data-cards sobre #347 a6a78dd3623fa75800d72e67e271f727e534a5c8. Referência original revelou oportunidades/passaporte ausentes e ganhos fora da hierarquia do card roxo. Recomposta sequência com GET /jobs e /work-passport/mine, stats reais/ausência/loading/falha/retry/foco, pay real validado no próximo trabalho, data atual local e atalho de notificações. Sem nível Prata, percentual fictício, matching não implementado, fotos ilustrativas ou garantia financeira. Disponibilidade e barra preservadas. Cinco testes novos, **36/36 UTC/São Paulo**; CI/APK desta fatia pendentes e Visual Truth OPEN.

#342 integrado depois CI 38012515909/APK 38012515803 aprovados no head 516643aa07d5c80acd965c63788d5358a3eee703; main aee58e7776eee0dc211713edcbe29075f841ecb1. Pós-merge CI 38014015303/APK 38014015274 em andamento. #343 retarget main; árvore de merge prevista idêntica à testada b4583e2d9aa1e6bb784c3345157f589a85ce99a8; APK em andamento. #347 CI 38013852204 sucesso/APK 38013852251 em andamento. v1.38/requisitos/evidência/registry/checkpoint no ciclo, sem desligar continuidade.

### Gate v1.38 corrigido
CI 38014176712 falhou TS18048 no render oportunidades. Condição ready explícita corrige narrowing mantendo loading/error/vazio reais; gates novos obrigatórios. #343 reconciliado com main, head 4f39c2c92750c3a5c70bae21986d823a1eeff637, CI 38014252721/APK 38014252773 em validação.

## 2026-10-09 — Continuidade Trabalhos, v1.39

Registro literal disponível — usuário:
> -ok

GET catálogo agora foco/retry/timeout/schema; POST interesse guard/idempotência existente/ack correto e falhas honestas. Estrutura/categorias/estilos/API mantidos. 40 testes locais UTC/São Paulo. #348 falha TS18048 corrigida head 4b1cb40d093acc578da1629388c260889bedb0f7, novos gates CI 38014454751/APK 38014454871. #343 conflito pós-squash resolvido por parent main sem mudar árvore, head 4f39c2c92750c3a5c70bae21986d823a1eeff637, novos gates obrigatórios. #344 gates próprios aprovados, dependente #343. Nenhum merge sem gates exatos; Visual Truth OPEN. Próximos independentes: Equipe/Interessados.

## 2026-10-09 — Interessados reais e proteção de seleção, v1.40

Continuidade autorizada mantida. Contratos company/jobs/candidates/recommendations/confirm reconsultados antes da correção. Loading/erro/vazio, partial success, ranking API, seleção cancelável com versão e snapshot tenant/identidade. Confirmação continua manual/guard/ack correto, sem sucesso otimista em timeout. Botão Atualizar trabalhos recompõe contexto. 45 testes UTC/São Paulo, sem afirmar prova de taps/Visual Truth. Branch encadeada após #349; acompanhar gates/retarget/revisão/merge/pós-merge. Equipe ainda pendente; projeto não encerrado por espera de APK.

## 2026-10-09 — Equipe com seleção e rede tratadas, v1.41

Contratos reais reconsultados antes da correção. Equipes/membros/conhecidos/vagas/alocação loading/erro/vazio/schema/foco/retry/15s, versões/cancelamento, contexto tenant+identidade. Ações manuais guardadas/ack/releitura; criação não idempotente desconhecida exige refresh/lista antes de novo POST, sem retry automático. 51 testes UTC/São Paulo; styles/rotas/CompanyNav/backend/policies preservados. Gates próprios pendentes, branch após #350. #345 corrigido/#346 CI/APK sucesso em heads exatos, aguardam sequência. Visual Truth OPEN; não declarar conclusão integral por unidade/build.


## Revalidação em 2026-10-10 03:18 UTC

- #350 integrado por squash na main **658e335cec144ba151645719b2b3fc0bf571f9c5**; CI **38018391376** e APK **38018391418** pós-merge sucesso no SHA exato. Job APK114113728065: smoke efetivo 2026-10-10T03:13:18.8509889Z, metro_required=false; upload validado sucesso. Artefato11657718589, zipSHA256 e389527bc80b2e0facb887f643055ed3cf160ca08ffdc44f2223cc46eb2e2307.
- #351 original **5e8fffdfee0944b1e518d9b38ec556b65d62a6b9** não era mergeável: ancestral comum edfdfb569aa232e82b34834548e4cc77b5408a39, main com squash do #350 e 12 commits adiante. Conflito README reproduzido em merge-file (v1.40 versus v1.41). Reconciliação usa árvore main e somente delta #351, preservando todos os cinco registros adicionais do #361. Merge commit incorpora main como segundo parent, sem force/rewrite e sem repetir #350.
- Código Equipe preservado byte a byte; 51/51 testes locais UTC e America/Sao_Paulo reexecutados no conteúdo exato da branch. CI38015021179/APK38015021164 aprovavam apenas o head original: **novo SHA precisa novos gates**, ainda pendentes neste registro. Merge somente após CI/APK do novo SHA sucesso, revisão do diff e nova verificação main; pós-merge próprio obrigatório.
- #355 APK38015874364 tentativa2 e APKs #356–#360 aprovados nos heads originais. Pós-merge APKs #343/#344/#346–#349 sucesso; CI documental #36138017570744 sucesso. APK pós-merge #34538017162774 falhou: diagnosticar logs e recuperação no mesmo SHA, sem presumir defeito do app nem fechar gate.
- Próxima ação: acompanhar gates #351 reconciliado e recuperar APK pós-merge #345; reconciliar/retarget #352–#355 na ordem, preservando ancestralidade e documentos atuais; depois #356–#360. Uma pendência não bloqueia itens independentes.
- Visual Truth Gate OPEN: capturas/jornadas/dados/estados reais e aparelho físico ainda necessários. Pentest, PSP/FIN-RISK, providers e WEB-ARCH separados. Sem dinheiro real, custos/infraestrutura paga, mudança React19.1.4/RN0.81.6/lockfile/RLS ou promessa de execução contínua.

## 2026-10-09 — Conta → notificações empresariais reais, v1.42

Conta abria Planejamento sob label Notificações. NotificationsController verificado aceita tenant/membership e identidade; componente compartilhado agora atende Empresa com tenant ativo/CompanyNav e Profissional por identidade/ProfessionalNav. Contexto/leitura e blur guardados, sem eventos inventados. Labels Membros da empresa/Relatos de segurança correspondem aos destinos; cadastro empresarial completo não foi inventado nem declarado pronto. Signout guardado/15s/catch/finally limpa estado local offline. 51 testes locais preservados, gates próprios obrigatórios. Leitura revelou próximas falhas concretas em Planejamento/Pagamentos/Membros/Relatos; não misturar novas políticas. Visual Truth OPEN.

## Preparação #352 — 2026-10-10

Head original 953bdcf9426d66b0e25bc054dbfa56b83dbf2f8e; predecessor reconciliado #351 7ac5a6dace04ae120b6f8114ea87a499b0e222eb. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-09 — Leituras Planejamento/Pagamentos, v1.43

Contratos GET/roles/RLS reconsultados. Foco/retry/schema/15s/loading/erro/vazio e limpeza/geração no blur. NULL monetário não é zero; no_earning não é ausência de obrigação, label Sem lançamento de ganho. Nenhuma operação financeira/provider/custo. 57 testes UTC/São Paulo, styles/backend/policies mantidos. #342 pós-merge CI 38014015303/APK 38014015274 sucesso no SHA aee58e7776eee0dc211713edcbe29075f841ecb1. #343 smoke novo head em acompanhamento; #351 CI aprovado. Branch após #352, gates próprios obrigatórios. Visual Truth/FIN-RISK OPEN; Membros/Relatos pendências concretas.

## Preparação #353 — 2026-10-10

Head original 5560abdf3a11bbdf63800ed2767d6db7e656ff17; predecessor reconciliado #352 667f7ef92d4596a773379add4c7a022242160b63. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-09 — Membros/convites tratados e retry Android controlado, v1.44

Contratos owner-only/rotação/aceite/email/membership lidos, preservados. Estados/read schema/foco/retry/15s, guards síncronos e contexto tenant/identity. Geração unknown requer refresh explícito antes de novo POST, sem distribuir código; ack validado/limpeza blur. Aceite valida accepted/tenant/role/sessão antes do estado local; revoke preserva bodyless POST e ack. 63 testes UTC/São Paulo; gates próprios pendentes, após #353. #343 APK 38014252773 tentativa1 falhou settings Broken pipe exit224 dentro emulador antes do script; job 114100922318 repetido no mesmo SHA 4f39c2c92750c3a5c70bae21986d823a1eeff637. Não é aprovação nem crash app comprovado. Relatos ainda pendente; Visual Truth OPEN.

## Preparação #354 — 2026-10-10

Head original da169b62efdc52a4e72ccdb3d2d4b77ef491ae3f; predecessor reconciliado #353 f54f14f5ed6d375861b086469496ecddf14718f2. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-09 — Relatos de segurança, v1.45

Estados independentes/schema/foco/retry/15s/epoch/cancelamento, snapshot tenant+identity/guard/ack e releitura. Decisão continua humana manual com payloads/notas/backend/transições existentes, sem penalidade/score/acesso/pagamento automático. 69 testes UTC/São Paulo, sem relatos reais. #354 CI 38015650955 aprovado/APK 38015650952 em execução. #343 retry2 no mesmo SHA, sem bypass. Main #342 pós-merge aprovado e artefato 11655825530/zip SHA256 2b1de7f5186e03e7c9293caa3558bcb5ae50634f37137a9f5f3e9034c361a5fd provados; smoke emulador não é aceite físico. Visual Truth OPEN; próxima integração e revisão de criação/jornadas.

## Preparação #355 — 2026-10-10

Head original 05e2c7e6cf4ea8ef1c7553e2f9928af3b6a25d71; predecessor reconciliado #354 92651205a78181e7440375c552b933033ba7d54b. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-09 — Publicação guardada, v1.46 (verificação UTC 10/10)
POST existente reconsultado: não idempotente. Timeout15s/guard/inputs disabled/tenant; sucesso exige ack real compatível, ISO equivalente. 4xx e unknown distintos; formulário mantido em falha, link manual Planejamento antes de nova tentativa, nenhum retry automático. Quatro testes novos, 73 UTC/São Paulo; políticas/backend/styles/nav/dependências preservados. #355 CI 38015874275 sucesso/APK 38015874364 em andamento. #348 CI/APK exatos sucesso. #349 e #350 falharam action emulador input/settings Broken pipe exit224 antes script; retry2 controlado solicitado no mesmo SHA como #343. Manter gates e rotina, sem bypass/pausa global. Próxima integração/diagnóstico Android e auditoria restante; Visual Truth OPEN.

## Preparação #356 — 2026-10-10

Head original 5ddcb0d59c2bd13a49b5d4654efbcc02331699cf; predecessor reconciliado #355 cc4c3474afa997923c5211a5768ad745a9c77869. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-09 — Talentos, v1.47 (verificação UTC 10/10)
TalentPoolsController reconsultado. Estados/schema/foco/retry15s/cancelamento/403: falha não é lista vazia. Remoção manual exige item/snapshot tenant+identity/guard; bodyless DELETE/removed true reais, sem mudança otimista/retry automático/política. Seis testes novos, 79 UTC/São Paulo. #356 publicação head5ddcb0d59c2bd13a49b5d4654efbcc02331699cf, CI38016256770/APK38016256788 em andamento; #351/#352 CI/APK sucesso. #343/#349/#350 retry2 Android mesmohead, manter gate. Inspeção encontrou próximas divergências concretas em Substituições/Conversa/Segurança profissional, com contratos a reconsultar. Priorizar integração/diagnóstico, sem declarar Visual Truth fechado.

## Preparação #357 — 2026-10-10

Head original 449d25095c91fc63611ece504300448dd7192d50; predecessor reconciliado #356 6dd68681ec2739fbc5589fcbb68bcb4a57447510. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-09 — Substituições, v1.48 (UTC 10/10)
Controllers/matching/migration reconsultados. Loading/erro/vazio/schema/foco/retry15s/partial/cancel e snapshot tenant+identity/guard/ack/refresh. checked_out não permite substituição conforme backend. Auto-match400 no_replacement_available é único vazio documentado; falhas não são ausência. Matching score0–100 e UI agora82→82% em vez8200%, ranking intacto. Select manual, payload/transações/RLS/policy preservados, nenhum retry automático. Oito testes novos,87 UTC/São Paulo. #356CI38016256770sucesso/APK38016256788pendente, #357head449d25095c91fc63611ece504300448dd7192d50/CI38016412800/APK38016412662 em andamento. Próxima integração/Android e Conversa/Segurança profissional; Visual TruthOPEN.

## Preparação #358 — 2026-10-10

Head original 8e580893cf18ef31ef2f6aaa1ac168497fab46aa; predecessor reconciliado #357 4ee8172b3ed97cff66709ac58b0f903aba8572ab. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-09 — Conversa, v1.49 (UTC10/10)
ConversationsController relido. assignment/tenant explícitos string simples, nunca tenant genérico/array. GETloading/erro/vazio/schema/403/404/foco/retry15s/cancel/geração, mensagens roláveis. POSTmanual guard/sessão/rota/ackbody/id/data e draft em erro/unknown, sem duplicar mensagens/notificações por retry automático. Nenhuma mensagem real enviada. Seis testes novos,93 UTC/São Paulo; backend/RLS/policy/dependências mantidos. #358head8e580893cf18ef31ef2f6aaa1ac168497fab46aa CI38016571399/APK38016571422emexecução; #357CIaprovado/APKpendente. #343retry2compilou/no smoke, não autoriza merge até aprovado. Próxima integração/Android e Segurança profissional, VisualTruthOPEN.

## Preparação #359 — 2026-10-10

Head original d4567c39e4c113870382fbfcc9d2bc1bff71dcb7; predecessor reconciliado #358 8523aed8d98a596a22ee2d5d762f8d05afcfa2a5. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-09 — Segurança profissional, v1.50 (UTC10/10)
Controllers reconsultados. Reads independentes/schema/loading/erro/vazio/foco/retry15s/cancel/parcial; boolean reportedByMe real, appeals por tenant+case e falha não significa inexistência. Seleção validada em assignmentlist e sessão/tenant origem; create/report/recurso manuais guardados/disabled/ack real/limite4000. Case ack não exige campos ausentes no backend; appeal created false distinto de motivo novo salvo. Texto mantido em falha/unknown e sem retryPOST automático. Policies/contraditório humano/backend/RLS/score/dinheiro/nav/styles/dependências preservados; nenhum envio real. Oito testes novos,101 UTC/São Paulo. #359head d4567c39e4c113870382fbfcc9d2bc1bff71dcb7 CI38016694893 sucesso/APK38016694857 pendente; #358CI38016571399 sucesso. #343retry2smokeemexecução. Próxima integração/Android/inspeção restantes/capturas, sem atividades artificiais; VisualTruthOPEN.

## Preparação #360 — 2026-10-10

Head original 1c1756fd20ae369a6df6855f79b873ce07ca0967; predecessor reconciliado #359 99a10a406c00db62eaec784e22ec4e53cf0585d2. Reconciliação preserva código original desta fatia e todos os registros main/#361 e #351; predecessor novo é segundo parent. CI/APK do **novo SHA** obrigatórios, ainda pendentes neste snapshot. Integração na ordem #351–#360, apenas com gates exatos/revisão e pós-merge. Main verificada 658e335cec144ba151645719b2b3fc0bf571f9c5, #350 pós-merge CI38018391376/APK38018391418 sucesso. Código/RLS/React/RN/lockfile/backend/PSP inalterados pela reconciliação. Visual Truth OPEN. Próxima ação concreta: acompanhar gates novos e retarget main somente após predecessor integrado.

## 2026-10-10 — Indicadores reais, v1.51

# Indicadores: dados reais e estados de rede — v1.51

**Verificação:** 2026-10-10. **Base:** #360 reconciliado d11bbeec3ec33bf6e20145f910ad0d31f57d31cb.

Fonte primária: apps/api/src/company-analytics.controller.ts e apps/mobile/app/analytics.tsx. UI anterior só carregava na montagem, fetch/JSON podiam rejeitar sem catch, sem limite/retry/foco/schema. Correção somente GET/schema e estados de UI, sem consultas/definições/backend/RLS/policy novas.

6 testes novos, 107/107 em UTC/São Paulo. Zero somente após resposta válida; null distinto de0%, taxa de confirmação200% preservada conforme universos do controlador; contagens/rates inválidas e HTTP403/rede/JSON não viram vazio; explicit retry pode recuperar. Foco/generation/abort15s revisados, unidade não comprova UI nativa. Novo CI/APK exato/merge/pós-merge pendentes, Visual Truth OPEN.

Fila e prova #350 atualizadas no checkpoint nesta alteração. #351–#360 código byte-idêntico às respectivas branches originais, documentos main/#361 preservados e ancestrais reconciliados; gates obrigatórios em novos SHAs. Nenhum custo, fornecedor de IA, dinheiro, mensagem real, política financeira ou enforcement habilitado.

## 2026-10-10 — Assistente limitado a sugestão factual, v1.52

# Assistente: sugestão validada e rede limitada — v1.52

**Data:** 2026-10-10. **Base:** #362 cb5b39a19d89593cafc9ca6bbd44c1528a9253f0.

CopilotController/copilotPolicy/copilot-tools.ts reconsultados. Interpret usa POST deterministic_baseline, mode assisted, providerConfigured false no backend atual. Não foi feita chamada real ao Assistente pelo agente nem habilitado fornecedor pago. UI anterior rejeitava promessa de rede sem catch, não validava result.reasons/rota e permitia envio simultâneo.

Correção mantém pedido manual em mode assisted, texto até2000, guard síncrono/campos disabled/15s/cancelamento de blur/geração e estado de erro. Texto preservado em falha; só resposta validada cria sugestão. Rotas correspondem aos intents existentes do backend, sem navegação arbitrária. executionAllowed deve ser false, modo assisted e facts/reasons/disclaimer devem ser válidos; sinal requiresHumanConfirmation retornado permanece. Editar texto invalida sugestão anterior; abrir próximo passo verifica mesma sessão e versão da sugestão. Nenhuma tool é executada automaticamente; rota abre jornada já existente, sem confirmar/pagar/bloquear/punir.

6 novos testes;113/113 locais UTC e America/Sao_Paulo, incluindo suíte anterior107. Cobrem limite sem request, payload assisted/chamada única, rota desconhecida/incompatível, ação automática/modo inválido, confirmação humana, facts/schema/HTTP/JSON/rede sem retry. Revisão estática de guard/draft/epoch/session, sem alegar taps/aparelho/Visual Truth. Styles/APIs/backend/policies/RLS/React19.1.4/RN0.81.6/lockfile preservados. CI/APK head exato/merge/pós-merge ainda pendentes; cadeia após#362. Visual Truth OPEN.

Próxima ação: acompanhar gates #351–#360/#362 e deste item, integrar em ordem com revisão e pós-merge. Revalidar Privacidade/onboarding e comportamento company/professional das sugestões contra requisitos; não inferir cobertura total por essas correções.

## 2026-10-10 — Integrações reais e leitura Privacidade v1.53

# Privacidade: leitura real dos pedidos — v1.53

**Data:** 2026-10-10. **Base:** main177f15c92323b9bf807a6cbee1c802f5953ac907. Fontes: PrivacyController GET requests, privacy-requests-ops.ts, DSAR_RUNBOOK_v1.13, PRIVACY_NOTICE_BASELINE_v1.13, TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13 e app atual.

Correção apenas GET /privacy/requests: loading/erro/vazio comprovado, payload/types/status/dates validados, identidade via authHeaders existente, foco/retry/15s/geração/cancelamento. Não apresenta Nenhum pedido em falha/loading. Nenhuma exportação automática: GET /privacy/export registra pedido access e está fora desta leitura. Create/export/deactivate byte-idênticos; backend/alerta/desativação/hold/retention/RLS/styles intactos. Nenhum pedido/cópia/desativação real executado pelo agente.

4 novos testes;117/117 UTC/São Paulo. Fatos/status/tipo/datas reais, vazio somente confirmado, HTTP/JSON/rede como falha e somente endpoint requests, sem GET export/POST. Guarda UI/foco/timeout revisada estaticamente, não comprova taps/aceite físico. CI/APK no head próprio e pós-merge pendentes. Visual Truth OPEN. Operações de Privacidade continuam como lacuna concreta separada para próximo ciclo com os mesmos contratos e controles humanos.

Resultados de integração/pós-merges/retries em [execução verificada06:21](EXECUCAO_VERIFICADA_2026-10-10_0621Z.md). Sem transcrição inventada; fatos da execução registrados, Visual Truth OPEN.


## Privacidade manual v1.54 — 2026-10-10 06:30:59 UTC

Operações com guard/ack/sessão/15s/sem duplicar, export explícito e cópia somente em memória, desativação humana/bloqueios preservados.8 novos testes,125/125 locais UTC/São Paulo. Branch fix/privacy-manual-action-acknowledgements dependente #364; gates próprios/pós-merge ainda pendentes neste snapshot. Journal0630Z registra sete CIs pós-merge success/APKs pendentes e retries353/355. Nenhuma operação real/PSP/paid. Visual Truth OPEN; continuar auditando itens independentes.


## Assistente/Notificações v1.55 — 2026-10-10 06:36:03 UTC

Company agora sugere /empresa-notificacoes e professional /notificacoes conforme accountType autenticado. Plural notificações reconhecido; mobile rejeita contexto/rota inconsistentes.126 testes mobile em dois fusos+5 política API locais; runner API inclui Copilot e HTTP asserções duas contas adicionadas. Branch fix/copilot-account-notification-route sobre#365; gates próprios/integração/taps pendentes. #362 APK pós-merge success; #355 retry2 APK success com smoke/artefato comprovados no journal0635Z. Próximo: onboarding/criar-conta/entrar; Visual Truth OPEN.


## Cadastro v1.56 — 2026-10-10 06:39:40 UTC

Signupmobile guard/15s/ackidentidade-email-tipo/ownerworkspace,7testesnovos/133locaisdoisfusos. Unknown orientaEntrar antesduplicar; passwordsomentememória/limpanoblur. Backendatômico/políticasintactos;cadastrorealnãoexecutado. Branch fix/signup-verified-account-and-network-states depende#366;gatespróprios/pós-mergependentes. #357APKpost inputBrokenpipe224diagnosticado/retrycontroladosameSHA, journal0639Z. PróximaauditoriaEntrar/sessionpersist/contexto. Visual Truth OPEN.


## Login v1.57 — 2026-10-10 06:46:33 UTC

Signinackidentity/email/token/membership verificado e guard15s/foco; saveSessionpairfila/releitura/rollbackantesfuturosleitores, sem atomicidadeOSprometida.13 novos testes/146 mobile locaisUTC/SP. Branch fix/signin-verified-session-persistence sobre#367;gatespróprios/pós-merge pendentes. PostAPK356/359/362/363success e353/355retry2success; smoke/artifacts journal0645Z. Próximo bootstrap.ts/consumidores e estados/jornadas físicos. Visual Truth OPEN.


## Availability v1.58 e integração #364 — 2026-10-10 06:51:59 UTC

#364merged8844a118caa19ea454dc713565db47827e58f853 árvore/parentsheadCIAPKpass;postCI38032152612pass/postAPK38032152603pendente.360postAPKpass,journal0650Z. AvailabilityackjanelaID/session/foco/draft/razãoperfilreal,6novostestes/152locaisUTCSP. Branch fix/availability-verified-window-and-session após368;gatesprópriospendentes. Bootstrap56fontes semconsumidor nãoalterado;próximoPerfilack/contexto/draft. VisualTruthOPEN;nenhumPOSTreal/PSP/custo.


## Perfil/saída v1.59 e #365 integrado — 2026-10-10 07:02:38 UTC

#365merge1c89d39cc4b25c66104eb7ffb06cf4cae5125e0e v1.54; headCIAPKpass/tree/parents/smokeartifact comprovadosjournal0700Z; pós-runs a consultar. PerfilGETIDreal/PUTcampos exatos/auth/foco/draft e saída local condicional em Perfil/Empresa/Privacidade,10 testesnovos/162locaisUTC/SP. Branch fix/profile-verified-fields-and-session-exit sobre369/gates própriospendentes.367headCIAPKpassaguardando366;próximoPainel/Agenda/Membros ack/contexto porcontratos. Nenhumaoperação real;VisualTruthOPEN.


## Membros v1.60 e integrações verificadas — 2026-10-10 07:13:49 UTC

#366 merge4a8f652806bf995b6ef751d5ab7e20542a41545f e #367 merge61341937bdf54ce15d6cf211061051b1c074baed confirmados com headCIAPK/árvore/pais; pós-CIs364–367success/APKsemexecução. Todos356–360/362/363pósCIAPKsuccess, inclusive357/358retry2. #368 APK ANR com.android.phone startup/Events0/pidvazio após installSuccess; único retrycontrolado sameSHA solicitado, merge retido; alternativas independentes continuam.
Membroscorrige seleção local do tenant de convite antigo após login/troca empresa/foco, fila/releitura/rollback/ackdistinto,6novostestes/168locaisUTCSP; branchfix/members-verified-tenant-selection após370, gatesprópriospendentes. Backendpapéis/e-mail/owner/RLS intactos. Provasjournal0712Z. PróximoEmpresaInicioACK/signout eAgendaACK/contexto porcontratos. VisualTruthOPEN, sem operaçõesreais/custos/PSP.


## Painel Empresa v1.61 — 2026-10-10 07:18:22 UTC

Rating e preferred apenas ack real + Authorization/tenant antes/depois; GET/conversa contextual e signout condicional, refresh manual.8 novos testes/176 locais UTC/SP; branchfix/company-dashboard-verified-actions após371, gates próprios pendentes. #371head1e3b9f0d6bbce76d7f693be91fa4faba1c8d529d CI38033728516success/APK38033728471running. #364 pósCIAPKsuccess/artefato/smokejournal0717Z. #368retry2running, alternativas continuam; próximaAgenda contrato/ACK. Backend/policy/RLS/deps preservados;nenhumaoperaçãoreal. VisualTruthOPEN.


## Agenda v1.62 — 2026-10-10 07:23:59 UTC

ACKid/status/stamp/ratingreal,Authda lista antes/depois/foco/15s,coordforegroundopcional e rotas contexto.7novostestes/183locaisUTCSP, branchfix/agenda-verified-lifecycle-and-session após372;gatesprópriospendentes. #372headbd6d67180392558f9a97f5821bd71ca788e3d3b3 CI38033993074success/APK38033993076running. #365pósCIAPKsuccesscomsmoke/artefatojournal0723Z. #368retry2running,semmergeantecipado/alternativascontinuam. PróximoauditarPerfilEmpresa/menus/APIs/canônico. RLS/ledger/policies/depsintactos,nenhumaopreal. VisualTruthOPEN.


## Diagnóstico Android v1.63 — 2026-10-10 07:33:35 UTC

Todos356–360/362/363/364–367 pósCIAPKsuccess comsmoke/artifacts/journals. #369/#370/#371gatesheadsuccess aguardam368retry2emsmoke. #373head5d5d028280de7e5beb920ce53af6efde15420ad7 CI38034313964success/APK38034313949running. DiagnósticofalhasAndroidagoracoletaantesrunnerdesligar/fallbackboundedmanifest/exitpreservado/primeiroLognão sobrescrito;8shellfixturetests+bash-n/YAMLpass. Branchfix/android-smoke-failure-diagnostics após373, novosgatesreaispendentes. Nãoappcódigo/mobiledeps/infra/policies alterados. Menusindisponíveisnão autorizamcontrato inventado; próximodefeitoHomeGETsmistos/Trabalhosinterestcontexto real. VisualTruthOPEN;semcusto/opreais.


## Sessão Profissional / gate HTTP v1.64 — 2026-10-10 07:52 UTC

Snapshot 2026-10-10 07:52 UTC. Main comprovada 4ff59618d6813890c438be234c86cca3ced496cc (#373/v1.62). Merges #356–360/362–373 já verificados; não repetir. Todos #356–360/362/363/364–367 pós-CI/APK success com jobs/smoke/artefatos em journals anteriores. #368–373 pre-CI/APK próprios success, diffs e merge-base revisados, árvores idênticas aos heads aprovados e ambos pais/main confirmados.

|PR|Merge confirmado|Árvore verificada|
|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|73b688019e6634150610baa18d9c67b51769b8a3|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|3ee56d772199260cbf9734b96070bd0541cb38cb|
|370|c381dec921be51b0aa76e98bac244277f85f7384|5ecd75bd3431cb26ec87fbd99268da50fa789f77|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|a265ba893da6c12178752ac354d1de793a7c7f5e|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|fb661b0232d5d61707781c61ee36a15ad5a0e9d7|
|373|4ff59618d6813890c438be234c86cca3ced496cc|1334e87367562a0691376373819ff9178ccf2b88|

|PR|Pós-CI|Pós-APK|SHA|
|---|---|---|---|
|368|38035076767 success|38035076771 em execução|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|
|369|38035132058 success|38035131936 em execução|be8c02d2c813533ae0a9b8a29446410ecac48d82|
|370|38035165889 FAILURE: argumento token interpretado como opção Node; correção neste filho|38035165785 em execução|c381dec921be51b0aa76e98bac244277f85f7384|
|371|38035191248 success|38035191261 em execução|a6267c8947711d6cfa6b76de9bfa0c6c783815da|
|372|38035692664 success|38035692677 em execução|f3305abaef4c144ce2fe0a89a6531e098e43d923|
|373|38035748570 em execução|38035748523 em execução|4ff59618d6813890c438be234c86cca3ced496cc|

Home/Trabalhos agora origem imutável e validação final da identidade/foco; interesse vinculado à conta da lista e IDs reais.191mobilelocais UTC/SP+3CLIpass. Falha370 foi tokenfixturecomhífen interpretado como opção; separador-- e regressão mantêm rate-limit/cap/DB, sem retry cego. Próprio filho após374 requer gates; checkpoint0752Z registra próxima ação. Visual Truth/externos OPEN, sem operações reais/custos.


## Notificações v1.65 — 2026-10-10 07:55:16UTC

Snapshot 2026-10-10 07:55:16 UTC. Main 4ff59618d6813890c438be234c86cca3ced496cc/#373/v1.62, tree1334e87367562a0691376373819ff9178ccf2b88; README/verdade/memória/checkpoint atuais relidos. Merges356–360/362–373 já confirmados; não repetir. Pós356–360/362/363/364–367CIAPKsuccess comsmoke/jobs/artefatos nos históricos. Pós369 agoraCIAPKsuccess; job114163883844/smoke2026-10-10T07:53:56.8301765Z/artifact11663896319 ZIPsha256a7214ec9762f49dadcb4cfae97eefc2ad1120e1546ddb9d9a5c9a3c9101d920f headbe8c02d2c813533ae0a9b8a29446410ecac48d82. Digest é arquivo ZIP, não hash de APK isolado.

|PR|Merge SHA|Pós-CI|Pós-APK|
|---|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|38035076767 success|38035076771 in_progress|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|38035132058 success|38035131936 success|
|370|c381dec921be51b0aa76e98bac244277f85f7384|38035165889 failure|38035165785 in_progress|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|38035191248 success|38035191261 in_progress|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|38035692664 success|38035692677 in_progress|
|373|4ff59618d6813890c438be234c86cca3ced496cc|38035748570 success|38035748523 in_progress|

#370 CI tentativa1 FAILURE mantém-se registrado: Node interpretou tokenfixture iniciando por hífen como opção em FIRST_HASH. Correção#375 usa-- e 3regressões; #375CI38035883488success headf31422e45165dd8eeaa276d15142bab83a343176, job114166084838, RunTests e HTTP/ProductionTruth step14success. Isso comprova correção/jornada no novo SHA; não muda status do run antigo. Não houve rerun cego.

Notificações profissionais mantêm GET sem tenant selecionado para agregar memberships; notificações empresariais exigem o tenant real selecionado e validam todos itens contra ele. Authorization/foco são conferidos antes/depois via runForSession e o leitor de contexto captura/confere tenant em ambas leituras da empresa. Resposta antiga ou empresa trocada não reaplica lista/confirma leitura. Guards síncronos, 15s/abort/geração e atualizações manuais permanecem.

Marcar lida usa exatamente notificationId/tenantId reais da lista, bodyless no endpoint existente; valida ACKid/readAtreal. HTTP4xx/rejeição distinto de rede/5xx/JSON/ACKnulo desconhecidos, sem POST repetido automaticamente. Só recarrega automaticamente depois de ACK/contexto verificados. Botão de atualização permite conferir resultado incerto. ID/tenant vazio ou timestamps inválidos permanecem erro, sem lista vazia fictícia. Professional GET ignora empresa selecionada local, POST usa tenant do item; CompanyNav/ProfessionalNav e estilos originais preservados. Backend requireMembership/identity/RLS/COALESCE idempotente intactos.

7novos/198UTCSP locais. Filhoapós375 requer ownCIAPK/pós-merge; próximaGanhos/Conversa auditável independente. VisualTruth/externosOPEN,semopreais/custos.


## Ganhos/Conversa v1.66 — 2026-10-10 08:00UTC

Snapshot 2026-10-10 08:00 UTC. Main 4ff59618d6813890c438be234c86cca3ced496cc/#373/v1.62, tree1334e87367562a0691376373819ff9178ccf2b88; README/verdade/memória/checkpoint atuais relidos. Merges356–360/362–373 já confirmados; não repetir. Pós356–360/362/363/364–367CIAPKsuccess comsmoke/jobs/artefatos nos históricos. Pós369 agoraCIAPKsuccess; job114163883844/smoke2026-10-10T07:53:56.8301765Z/artifact11663896319 ZIPsha256a7214ec9762f49dadcb4cfae97eefc2ad1120e1546ddb9d9a5c9a3c9101d920f headbe8c02d2c813533ae0a9b8a29446410ecac48d82. Digest é arquivo ZIP, não hash de APK isolado.

|PR|Merge SHA|Pós-CI|Pós-APK|
|---|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|38035076767 success|38035076771 in_progress|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|38035132058 success|38035131936 success|
|370|c381dec921be51b0aa76e98bac244277f85f7384|38035165889 failure|38035165785 in_progress|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|38035191248 success|38035191261 in_progress|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|38035692664 success|38035692677 in_progress|
|373|4ff59618d6813890c438be234c86cca3ced496cc|38035748570 success|38035748523 in_progress|

#370 CI tentativa1 FAILURE mantém-se registrado: Node interpretou tokenfixture iniciando por hífen como opção em FIRST_HASH. Correção#375 usa-- e 3regressões; #375CI38035883488success headf31422e45165dd8eeaa276d15142bab83a343176, job114166084838, RunTests e HTTP/ProductionTruth step14success. Isso comprova correção/jornada no novo SHA; não muda status do run antigo. Não houve rerun cego.


#376CI38036176120 success no head931a9b3c333a0771c5a2237cdd84a249eba14589, job114166946494, typecheck/HTTP success;APK38036176113 em execução.

Ganhos usa Authorization única sem tenant selecionado, conferindo a mesma sessão/foco antes/depois; todas requisições, inclusive retry manual, abortam/invalidam ao sair. Resposta antiga não mostra ledger de outra conta. Cálculo semanal, gráfico, valores/estados reais, multi-company e profissionalNav preservados, sem escrita no ledger/policy financeira.

Conversa mantém assignmentId/tenantId explícitos da rota e mesma identidade que carregou a conversa. GET e POST não iniciam após foco/timeout/identidade obsoletos e conferem identidade após resposta. Só ACK real/mesma sessão limpa draft/confirma envio. Perda de resposta na mesma conta preserva texto e pede conferência; troca de conta limpa draft antigo/invalidalista. Releitura após envio continua GET na identidade original, sem mensagem repetida automaticamente. Falhas403/404, mensagens vazias reais e acesso backend/membership/RLS permanecem diferenciados. ID/assignment em branco e texto em branco não chegam a transporte; IDs de mensagem/remetente em branco não são schema válido. ACK não exige senderIdentityId, pois POSTbackend retorna apenas id/body/createdAt.

6novos/204mobileUTCSP; filhoapós376 requer owngates. Próximocompanyrotas/contexto/estados. VisualTruth/externosOPEN, sem mensagens/opreais/custos.


## Publicação v1.67 — 2026-10-10 08:06UTC

Snapshot 2026-10-10 08:06UTC. Main comprovada5938a40ee27be04f4ccb63242421eb293ba2ddb9 (#374/v1.63), tree6daef4f0245277dddf06839f273570ac9f5f47d8, parents4ff59618d6813890c438be234c86cca3ced496cc+d986972cdd6ab9b96e393d85ccfa5a4e510e8d03. README/Documento/memória/checkpoint atuais relidos. Merges356–360/362–374 verificados, não repetir. #374 headCI38034863081/APK38034863018success; smoke/jobs/artefatos/árvore/pais/main conferidos. Retarget375mainfeito; rawmergeabletrue/unstable aguardandoAPK, sem conflito real. Pós356–360/362/363/364–367 CIAPKsuccess com provas anteriores.

|PR|Merge SHA|Pós-CI|Pós-APK|
|---|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|38035076767 success|38035076771 success|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|38035132058 success|38035131936 success|
|370|c381dec921be51b0aa76e98bac244277f85f7384|38035165889 failure|38035165785 success|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|38035191248 success|38035191261 success|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|38035692664 success|38035692677 in_progress|
|373|4ff59618d6813890c438be234c86cca3ced496cc|38035748570 success|38035748523 in_progress|
|374|5938a40ee27be04f4ccb63242421eb293ba2ddb9|38036515564 success|38036515570 in_progress|

#370CI38035165889 FAILUREtentativa1 continua registrado: tokenfixturehífen tratado como opção Node, corrigido em375 (ownCI38035883488success headf31422e45165dd8eeaa276d15142bab83a343176/HTTPcompleto+3regressões). O novoSHA não muda status antigo. Pós370APKsuccess técnico; VisualTruth permaneceOPEN.

Empresa.tsx vincula formulário a Authorization+tenant reais carregados ao foco, bloqueando edição/publicação sem contexto verificado. Envio confere o par do formulário antes e depois; blur/timeout/conta ou empresa trocada não aplica ACK nem limpa draft da operação antiga. Troca de contexto ao recarregar descarta draft de outra conta/empresa; mesma origem preserva draft. Resultado incerto/saída durante POST mantém aviso para conferir Planejamento ao voltar; nenhum POST automático ou nova idempotência presumida.

runForSession passa a aceitar tenant esperado opcional, mantendo todas chamadas profissionais sem escopo extra e sem conceder autorização no frontend. ACKpublicação valida local normalizado/null e IDreal não vazio além dos fatos já conferidos (título/cidade/status/valor/janela). Backend sempre retorna location; não exige eco de tenant ausente do contrato. Guarda síncrona/15s/abort/epoch/controllers, CompanyNav, datas/turno noturno, dinheirocentavos e estilos preservados. Não alteraAPI/policy financeira/engagement modalities nem cria trabalho real.

5novos/209mobilelocaisUTCSP; filhoapós377 requer owngates. Próximocompanyrotas atuais/leituraseACKs; VisualTruth/externosOPEN. Semopreais/custos.


## Leituras company v1.68 — 2026-10-10 08:09:43UTC

Snapshot 2026-10-10 08:09:43UTC. Main comprovada5938a40ee27be04f4ccb63242421eb293ba2ddb9 (#374/v1.63), tree6daef4f0245277dddf06839f273570ac9f5f47d8, parents4ff59618d6813890c438be234c86cca3ced496cc+d986972cdd6ab9b96e393d85ccfa5a4e510e8d03. README/Documento/memória/checkpoint atuais relidos. Merges356–360/362–374 verificados, não repetir. #374 headCI38034863081/APK38034863018success; smoke/jobs/artefatos/árvore/pais/main conferidos. Retarget375mainfeito; rawmergeabletrue/unstable aguardandoAPK, sem conflito real. Pós356–360/362/363/364–367 CIAPKsuccess com provas anteriores.

|PR|Merge SHA|Pós-CI|Pós-APK|
|---|---|---|---|
|368|c221a0b4ca00b70368c3287ecaf55b0f190e31ab|38035076767 success|38035076771 success|
|369|be8c02d2c813533ae0a9b8a29446410ecac48d82|38035132058 success|38035131936 success|
|370|c381dec921be51b0aa76e98bac244277f85f7384|38035165889 failure|38035165785 success|
|371|a6267c8947711d6cfa6b76de9bfa0c6c783815da|38035191248 success|38035191261 success|
|372|f3305abaef4c144ce2fe0a89a6531e098e43d923|38035692664 success|38035692677 in_progress|
|373|4ff59618d6813890c438be234c86cca3ced496cc|38035748570 success|38035748523 in_progress|
|374|5938a40ee27be04f4ccb63242421eb293ba2ddb9|38036515564 success|38036515570 in_progress|

#370CI38035165889 FAILUREtentativa1 continua registrado: tokenfixturehífen tratado como opção Node, corrigido em375 (ownCI38035883488success headf31422e45165dd8eeaa276d15142bab83a343176/HTTPcompleto+3regressões). O novoSHA não muda status antigo. Pós370APKsuccess técnico; VisualTruth permaneceOPEN.


#378head6492ea1e523c8122bd9966d48b566a2abbda5d30/base377. CI38036810382tentativa1 FAILUREem Initializecontainers/job114168834894: Docker/ECR toomanyrequests Rate exceeded antesCheckout/código/tests. Retry controlado único samejob/SHA solicitado2026-10-10T08:09:43Z, runin_progress attempt2 confirmado; semdeclararpass. APK38036810418 in_progress. Falha é infra transitória, não aprovação de código; nenhuma mudança/redução de gate/image/credencial/custo para contornar rate.

Planejamento e Indicadores capturam Authorization+tenant selecionado, validam o mesmo par antes de executar GET e após resposta, e só aplicam dados enquanto requisição/geração/foco/15s continuam atuais. Mudança de conta/empresa impede o fetch ainda não iniciado ou descarta resultado antigo. Atualização manual tem a mesma disciplina.

Estados reais de erro/403, vazio e payload/contagem/taxa/datas/valores continuam nos helpers existentes. Resposta descartada não vira totalzero nem lista vazia fictícia. Endpoints GETonly, permissões de role/membership e tenant/RLS, cálculo/definição factual de indicadores, UI/desenho e lockfile/deps intactos. Não implementa headcount/previsão nem planejamentoautomático ou operação financeira.

209mobileUTCSPlocais;filhoapós378requer owngates. PróximoEquipes/Talentos finalcontext/ACK. VisualTruth/externosOPEN,semopreais/custos.


## Equipes/Talentos v1.69 — 2026-10-10 08:22 UTC

Snapshot verificado em 2026-10-10 08:22 UTC. Main 765cb2e834065f6eeaf0262ed9eedca9cbb2d52a (#375, Documento da Verdade v1.64), árvore c0ce45ba92c04ae69de8271f110d1a6c6c9cc301, pais 5938a40ee27be04f4ccb63242421eb293ba2ddb9 + f31422e45165dd8eeaa276d15142bab83a343176. README, Documento vigente, memória e checkpoint da main relidos. #356–360 e #362–375 já integrados; não repetir.

#375 aprovado no head f31422e45165dd8eeaa276d15142bab83a343176: CI 38035883488 e APK 38035883538 success, job 114166084958, DEVICE_SMOKE_OK em 2026-10-10T08:15:31.7746097Z, metro_required=false. Artefato ZIP 11664483911, digest sha256:9cf4f71d483d8421a3aeb1dd625003812cc03085975fd2e13e7e471b766df9c9. Diff, merge-base, árvore e ambos pais confirmados. Pós-merge CI 38037544495 e APK 38037544424 em execução; não antecipar PASS.

Pós-merge #372: SHA f3305abaef4c144ce2fe0a89a6531e098e43d923, CI 38035692664 e APK 38035692677 success; job 114165522218, smoke 2026-10-10T08:12:17.8147729Z sem Metro; ZIP 11663429264 sha256:0c10fe2bb1b23ecea19e17f7c30b4ef73c4801329e6c96235613d309273b5946.
Pós-merge #373: SHA 4ff59618d6813890c438be234c86cca3ced496cc, CI 38035748570 e APK 38035748523 success; job 114165688379, smoke 2026-10-10T08:12:08.0557757Z sem Metro; ZIP 11664522396 sha256:1124d01ef5bc058902e40a8fdc3c8420ea243d5bec9f9b9100ca5beb0974e778. Jobs, uploads e vínculo dos artefatos aos SHAs conferidos; hashes são dos ZIPs, não do APK isolado. Pós #374 CI 38036515564 success e APK 38036515570 em execução.

#378 CI 38036810382 tentativa 1 falhou antes de Checkout, em Initialize containers, ECR toomanyrequests/Rate exceeded. Retry único solicitado 08:09:43Z no mesmo SHA 6492ea1e523c8122bd9966d48b566a2abbda5d30: tentativa 2 SUCCESS, job 114169158970 com typecheck/build/export/tests/migrations/privacy/HTTP completo aprovados. Não repetir retry nem alterar gates.
#376 APK 38036176113 tentativa 1: build e oito fixtures de diagnóstico passaram; emulador falhou antes do script de smoke com input/settings Broken pipe, exit224 às 08:16:05Z, job 114166946326. Fallback e upload de diagnóstico passaram; ZIP 11663454829 sha256:311487986568cf78c82e0e69c801f9de780f3926dcdeaaec54080988f0d90ea1. APK validado NÃO foi publicado. Retry único do mesmo job/head solicitado às 08:21:30Z (aproximado, após diagnóstico), resultado pendente. Não declarar defeito do aplicativo nem sucesso do gate sem nova prova.
#370 CI 38035165889 tentativa 1 permanece FAILURE histórico. Separador --/três regressões/jornada HTTP completa aprovados no novo head #375; isso não muda o run antigo.

|PR|Head exato|Base no snapshot|CI|APK|
|---|---|---|---|---|
|376|931a9b3c333a0771c5a2237cdd84a249eba14589|main|38036176120 success|38036176113 retry solicitado|
|377|5e3ebf7f1df814d1a6461fb5937c13a01c02d02d|fix/notifications-verified-read-and-context|38036459967 success|38036459975 success|
|378|6492ea1e523c8122bd9966d48b566a2abbda5d30|fix/earnings-conversation-origin-context|38036810382 success tentativa2|38036810418 em execução|
|379|31ed3bfed81b0bb43b49a7b4a7810d2026a9c44d|fix/company-publication-origin-context|38037026997 success|38037027052 em execução|

Equipes verifica Authorization e empresa antes de cada transporte e novamente após as leituras da base, membros, alocação e os ACKs de criação/alteração de membros. Talentos verifica novamente o par de origem após GET/DELETE. Abort, timeout de 15s, foco e gerações impedem aplicação tardia. Dados inválidos ou descartados são erro; não viram listas ou contagens vazias fictícias.

A criação de equipe é não idempotente: marca resultado incerto ao iniciar o transporte e conserva essa marca após blur/timeout/troca de contexto sem ACK aplicável. Apenas ACK válido no contexto atual ou conferência manual da lista libera nova tentativa; nenhum POST é repetido automaticamente. Rascunho é preservado na mesma conta/empresa e limpo ao confirmar outro contexto. IDs vazios/brancos não confirmam registros/ACKs nem autorizam POST/DELETE; nome vazio não inicia criação. Helpers mantêm contratos existentes e resultados parciais reais.

Backend, membership, tenant/RLS e papéis continuam autoridade; não se inventa tenant echo em ACKs. Ranking, disponibilidade, proximidade, pools, rotas, navegação e estilos canônicos preservados. React 19.1.4, RN 0.81.6 e lockfile intactos. Nenhuma operação real de criação, membro ou talento executada.

214/214 testes mobile locais passaram em UTC e America/Sao_Paulo, sem falha/cancelamento/skip: cinco regressões novas exercitam schemas/IDs, contexto sem Auth, criação inválida e ausência de transporte POST/DELETE. As fixtures não comprovam taps/foco em aparelho. Diff de quatro fontes e dois testes revisado; typecheck/build/HTTP/CI e APK próprios ainda obrigatórios no SHA publicado. Visual Truth físico integral permanece OPEN.

Filho fix/teams-talents-final-company-context baseado no head #379, com código, v1.69, evidência, requisitos, memória e checkpoint no mesmo commit. Este snapshot precede seu próprio commit: consultar PR/head/runs após publicação, sem inventar autorreferência.

Próximo: acompanhar o único retry #376 e APKs #378/#379, além dos pós #374/#375. Integrar #376 somente com próprios CI/APK success no SHA exato e PR/main/base/diff/merge-base novamente verificados; conferir árvore/pais/main/pós-runs e retarget #377, #378, #379 e este filho em ordem. Mergeable=false após retarget exige reconsulta eventual; conflito real exige reconciliação preservando ancestrais e novos gates, sem force. Falha de conexão exige verificar remoto antes de repetir merge.

Auditoria independente seguinte: ler fontes atuais de Substituições, Pagamentos, Candidatos e casos/Segurança com seus controllers e canônico, procurando lacunas demonstráveis de contexto/ACK/dados/estados; não inventar recurso, política ou tarefa. APK em execução é acompanhamento; gate físico/provider não bloqueia tarefas independentes.

Visual Truth original/cobertura física completa, piloto/pentest #220, providers/PSP/FIN-RISK #215/#219/#228 e WEB-ARCH #224 continuam separados e OPEN. Nenhuma conta, mensagem, DSAR, convite, publicação, dinheiro/PSP real ou infraestrutura paga. Manter continuidade até conclusão integral comprovada ou ordem explícita; fim de rodada e bloqueio parcial não encerram projeto. Não exigir continuar.


## Fluxos da empresa v1.70 — 2026-10-10 08:26 UTC

Estado verificado em 2026-10-10 08:25:56 UTC: main 765cb2e834065f6eeaf0262ed9eedca9cbb2d52a (#375/v1.64), árvore c0ce45ba92c04ae69de8271f110d1a6c6c9cc301. #375 já integrado com head CI/APK e árvore/pais comprovados; pós-CI 38037544495 success, pós-APK 38037544424 ainda não concluído no último snapshot. #372/#373 pós-CI/APK e provas efetivas registrados no journal0822Z. #374 pós-CI 38036515564 success / APK 38036515570 em execução.

|PR|Head|Base|CI|APK|
|---|---|---|---|---|
|376|931a9b3c333a0771c5a2237cdd84a249eba14589|main|38036176120 success|38036176113 tentativa2 em execução|
|377|5e3ebf7f1df814d1a6461fb5937c13a01c02d02d|fix/notifications-verified-read-and-context|38036459967 success|38036459975 success|
|378|6492ea1e523c8122bd9966d48b566a2abbda5d30|fix/earnings-conversation-origin-context|38036810382 success tentativa2|38036810418 em smoke|
|379|31ed3bfed81b0bb43b49a7b4a7810d2026a9c44d|fix/company-publication-origin-context|38037026997 success|38037027052 em execução|
|380|cf0812a45e5e594a6839d061ec27e809e41c177b|fix/company-readonly-origin-context|38037706772 success|38037706735 em execução|

#380 publicado e conferido: árvore 2ce77b59d09dc03f2602e29f9f4e1259bd3b6a59, pai 31ed3bfed81b0bb43b49a7b4a7810d2026a9c44d, 15 arquivos no diff. Próprio CI success não aprova APK/físico nem o filho seguinte. #376 retry único continua em execução; não repetir. #378 CI retry único recuperado e falha histórica #370 permanecem registrados sem reclassificação do passado.

Interessados captura e verifica Authorization/empresa na carga de trabalhos, nas leituras paralelas de candidatos/recomendações e após o ACK da confirmação. Substituições revalida o par após GET, recomendação, pedido e seleção, antes de aplicar dados/mensagens; motivos antigos são limpos quando uma nova origem é confirmada. Pagamentos usa a mesma verificação antes/depois da consulta somente leitura. Abort, foco e gerações continuam obrigatórios.

IDs vazios/brancos não geram registros acionáveis, rotas mutantes ou ACKs positivos; confirmação exige assignment/job/profissional/tenant reais. Erro de contexto não é sucesso, lista vazia ou valor zero. Preserva falhas parciais no mesmo contexto e dados financeiros nulos distintos de agregados zero comprovados. Não há repetição automática de POST.

Controllers atuais lidos: CompanyJobsController, ReplacementController e PaymentEventsController. Matching/recomendação continua apoio à decisão humana; confirm/selection/pedidos preservam contratos, elegibilidade e idempotência existentes. Roles, tenant/RLS, ledger/PSP, ranking/fórmulas, UI/desenho/rotas, React19.1.4/RN0.81.6 e lockfile intactos. Nenhuma confirmação, substituição ou pagamento real executado.

221/221 testes mobile locais passaram em UTC e America/Sao_Paulo, sem falha/cancelamento/skip. Sete regressões novas: IDs de dados/ACKs/rotas, contexto sem Auth e composições reais dos helpers com runForSession simulando troca de conta/empresa durante GET/recomendação. Diff de três telas, três helpers e três testes revisado. Não alega typecheck/build/taps/aparelho local; próprios CI/API/HTTP/APK e pós-merge ainda obrigatórios.

Novo filho fix/company-workflow-final-context após #380, v1.70 e nove arquivos de código/testes; próprio SHA/PR/runs consultar após publicação. Snapshot precede o commit. Próximo integrar #376 e sucessores somente com próprios CI/APK success no SHA exato, nova revisão de PR/main/base/merge-base/diff, árvore/pais/main pós-merge e runs reais. Retarget main em ordem; não repetir merges já comprovados nem gates pendentes/retries únicos.

Auditoria independente seguinte: Casos de Segurança e Segurança Profissional ainda carecem de verificações finais após leituras/mutações. Ler controllers/helpers/políticas/rascunhos atuais, corrigir apenas contexto/ACK e não alterar decisão humana ou enforcement. Demais rotas/canônico continuam sujeitas à reconciliação; ausência de PR aberta não significa conclusão.

Visual Truth físico integral OPEN; piloto/pentest, providers/PSP/FIN-RISK e WEB-ARCH separados. Sem conta/DSAR/convite/mensagem/publicação/ação empresarial real, dinheiro/custos/deploy pago. Continuidade permanece ativa até conclusão integral comprovada ou ordem explícita; bloqueio parcial/fim de rodada não encerram o projeto.


## Segurança v1.71 — 2026-10-10 08:29 UTC

Snapshot 2026-10-10 08:29 UTC. Main 765cb2e834065f6eeaf0262ed9eedca9cbb2d52a (#375/v1.64), árvore c0ce45ba92c04ae69de8271f110d1a6c6c9cc301, pais 5938a40ee27be04f4ccb63242421eb293ba2ddb9 + f31422e45165dd8eeaa276d15142bab83a343176. #356–360 e #362–375 integrados e verificados; não repetir. Journal0822Z e0826Z preservam head gates/merges e pós-provas anteriores.

Pós #374 CI 38036515564/APK 38036515570 SUCCESS no SHA5938a40ee27be04f4ccb63242421eb293ba2ddb9. Job114167953338, smoke2026-10-10T08:26:17.5055593Z metro_required=false; artefatoZIP11665065252 sha256:715356d2ecb81339772b42f77dc0d800b033d497d69f7206faa008a2ebc20f87. Jobs/upload/vínculoSHA conferidos. Pós #375 CI38037544495success; APK38037544424 em execução.

#378 ownCI38036810382tentativa2 eAPK38036810418 SUCCESS head6492ea1e523c8122bd9966d48b566a2abbda5d30. APKjob114168835088, smoke2026-10-10T08:26:18.4246494Z semMetro, ZIP11663928631 sha256:227201c6fd84af2758088a8cf0067a4aabdd72e5ea1ffd5aa3c697671e3433c2. Não integrar antes de seus predecessores: #376retry2 APK38036176113 ainda em execução; #377 headCI38036459967/APK38036459975success.
#379 head31ed3bfed81b0bb43b49a7b4a7810d2026a9c44d: CI38037026997success/APK38037027052 em execução.
#380 headcf0812a45e5e594a6839d061ec27e809e41c177b: CI38037706772success/APK38037706735 em execução.
#381 publicado após380, headb26f9bf4aa3b62d2c832fa612a25389ead21cb80/tree809120203e16c074db7352ab25304db7c23b6dce; próprio CI38037927257 success, APK38037927282 em execução. Conferir resultados antes de qualquer merge.
Falha histórica CI370tentativa1 e falhas infra378/376 permanecem registradas; retries únicos controlados, sem martelar/gate reduzido.

Segurança Profissional verifica a identidade que originou trabalhos/relatos/pedidos após leituras e submissões, antes de aplicar sucesso ou limpar texto. GET profissional permanece multi-company; POST usa tenant real do trabalho/caso escolhido. Ao confirmar outra conta na atualização, limpa rascunho/seleções antigos; erro na mesma conta preserva texto. Casos da empresa verifica Authorization+tenant após GET e ACKs, mantendo foco/abort/geração/15s.

Schemas recusam IDs vazios/brancos, inclusive vínculo de caso/apelante; rotas de relato/pedido/status com IDs ausentes não iniciam POST. ACKs continuam apenas os campos efetivamente retornados pelo backend, sem tenant echo inventado. Erro/stale não vira lista vazia ou decisão confirmada. Nenhum POST repetido automaticamente.

Lidos integralmente SafetyCasesController, SafetyAdminController e SafetyAppealsController/Admin e helpers/testes atuais. Roles owner/admin, tenant/RLS, acesso do profissional/relator, idempotência da revisão, transições, notas/trilha, revisão humana e ausência de enforcement automático preservados. Relato continua não idempotente; resultado desconhecido exige conferência antes de nova ação humana. Sem alteração de política, penalidade, score/acesso/pagamento, desenho canônico, React19.1.4/RN0.81.6 ou lockfile. Nenhum relato, recurso ou decisão real executado.

227/227 testes mobile locais aprovados em UTC e America/Sao_Paulo, zero falha/cancelamento/skip; seis regressões novas exercitam schemas/guard pré-transporte e composição dos helpers com troca de identidade/empresa após ACK válido. Duas telas, dois helpers e dois testes revisados. Fixtures e revisão estática não provam taps físicos; próprios type/build/HTTP/CI/APK e pós-merge continuam obrigatórios.

Filho fix/safety-final-origin-context após #381 com v1.71 e seis arquivos de código/testes; consultar seu próprio PR/head/runs após publicar. O snapshot antecede o commit, sem SHA circular fictício.

Próximo: acompanhar retry único #376 e APKs #379–381 e pós #375, integrar em ordem apenas com head exato CI/APK success + freshPR/main/base/merge-base/diff; conferir árvore/pais/main e pós-runs. Retarget successors main; reconsultar mergeable eventual, reconciliar conflitos reais preservando antecessores e novos gates, sem force.
Auditoria independente seguinte: fontes atuais de Privacidade, Assistente e Membros/Convites, verificando contexto final e rascunhos/ACKs por contratos existentes. Não inventar funcionalidade/política para produzir atividade nem inferir conclusão pela ausência de PRs.

Visual Truth original/dados/estados/cobertura física integral OPEN, piloto/pentest/provider/PSP/FIN-RISK/WEB-ARCH separados. Não executar operações reais ou habilitar dinheiro/custos/deploy pago. Continuidade mantida até conclusão integral comprovada ou ordem explícita; bloqueio parcial/execução de CI/fim de rodada não encerra projeto e não exige continuar.


## Atualização verificada 2026-10-10 11:29 UTC — v1.72

Snapshot verificado 2026-10-10 11:29 UTC: main 516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca, árvore 27f168902ad888017df379526437690202204473, pais ac18ca03de7a5f09ff3a626a763fadb55e699074 + de1288ddb02c2623652a2be340b32df9ff7c5004. Nenhuma PR aberta na consulta anterior à publicação desta correção. Ausência de PR não implica conclusão.

#376–#382 integradas em ordem por merge com head esperado, após retarget main, diff completo revisto, CI/APK success nos próprios SHAs e conferência fresh de main/base/merge-base. GitHub mergeable eventual foi reconsultado; não havia conflito real. Árvores de cada merge iguais às árvores revisadas do head, ambos os pais e main imediatamente após merge conferidos. Não repetir merges.

|PR|Head próprio aprovado|SHA merge real|CI próprio|APK próprio|
|---|---|---|---|---|
|#376|931a9b3c333a0771c5a2237cdd84a249eba14589|847992ad32b078d0bdffe734510ba9113f7e6304|[38036176120](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38036176120) success|[38036176113](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38036176113) success tentativa 2|
|#377|5e3ebf7f1df814d1a6461fb5937c13a01c02d02d|b1b2cbde7a2ded31780d0b1e0d79dde3a0f32974|[38036459967](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38036459967) success|[38036459975](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38036459975) success|
|#378|6492ea1e523c8122bd9966d48b566a2abbda5d30|0e8321c4aa0adeb389d11d776a8cd66567680798|[38036810382](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38036810382) success tentativa 2|[38036810418](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38036810418) success|
|#379|31ed3bfed81b0bb43b49a7b4a7810d2026a9c44d|18869fe910a89a55f897e74d6e81015404ca3998|[38037026997](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38037026997) success|[38037027052](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38037027052) success|
|#380|cf0812a45e5e594a6839d061ec27e809e41c177b|e6c6554f9208d4243bc8f724fba4b8971d958a1d|[38037706772](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38037706772) success|[38037706735](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38037706735) success|
|#381|b26f9bf4aa3b62d2c832fa612a25389ead21cb80|ac18ca03de7a5f09ff3a626a763fadb55e699074|[38037927257](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38037927257) success|[38037927282](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38037927282) success|
|#382|de1288ddb02c2623652a2be340b32df9ff7c5004|516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca|[38038125057](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38038125057) success|[38038125088](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38038125088) success|

|PR|Job próprio APK|Smoke real sem Metro|Artefato ZIP|Digest ZIP (não hash do APK individual)|
|---|---|---|---|---|
|#376|114171193296|2026-10-10T08:45:07.8305111Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|11664827413|sha256:8175c85ede6b26f96439fcc50093a07b49613aa5cae9143075adccfda91abb11|
|#377|114167787560|2026-10-10T08:20:28.6653648Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|11664044788|sha256:e69752411f426b1e73e23a6f9dc241c50ce527c85569d7378c36eb7cfe46cd9e|
|#378|114168835088|2026-10-10T08:26:18.4246494Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|11663928631|sha256:227201c6fd84af2758088a8cf0067a4aabdd72e5ea1ffd5aa3c697671e3433c2|
|#379|114169484424|2026-10-10T08:35:02.3071088Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|11664616829|sha256:db6a6899c7969330ac0bdfb415eb1fbb5ba9c69f2151b27d13501c79445c71d9|
|#380|114171511662|2026-10-10T08:52:45.0283065Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|11665390735|sha256:deb0927ce6438141435a84086781051f840f8d4c755ccbb1697e986c07cd91ae|
|#381|114172153337|2026-10-10T08:45:56.6344498Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|11665002476|sha256:6febb19e8cfde7f0c8e98739304995e59d945cc2ac497283f8237cce8ac9eaac|
|#382|114172750927|2026-10-10T08:55:15.6205914Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|11664883374|sha256:fafc9b6616c5bac68feca9421a01ec0978d46a6390c39b12053c6a04ae8891ef|

#376 APK tentativa1 falhou em input/settings do emulador (Broken pipe/exit224), após build e antes do script smoke; diagnóstico/upload foram preservados. Única repetição controlada no mesmo SHA passou na tentativa2. #378 CI tentativa1 falhou por ECR toomanyrequests antes do checkout/testes; único retry sameSHA passou na tentativa2. Não repetir retries já recuperados. CI histórico #370 permanece failure; correção FIRST_HASH/argumento CLI foi comprovada em #375 e não reclassifica run antigo.

Pós #375 no SHA765cb2e834065f6eeaf0262ed9eedca9cbb2d52a: [38037544495](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38037544495) CI success e [38037544424](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38037544424) APK success. Job114171028139; 2026-10-10T08:36:44.6369896Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; artefatoZIP11663694510 sha256:c0b3932f142cd626a19ddbcf1d49b38e24df0d1b31c55a03500b917ac0abd552. Jobs/smoke/upload/artefato/head conferidos.

|PR|SHA exato pós-merge|Runs observados|
|---|---|---|
|#376|847992ad32b078d0bdffe734510ba9113f7e6304|Standalone Pilot APK: [38047970768](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38047970768) in_progress; CI: [38047970793](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38047970793) success|
|#377|b1b2cbde7a2ded31780d0b1e0d79dde3a0f32974|Standalone Pilot APK: [38048000637](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048000637) in_progress; CI: [38048000622](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048000622) success|
|#378|0e8321c4aa0adeb389d11d776a8cd66567680798|Standalone Pilot APK: [38048052704](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048052704) in_progress; CI: [38048052533](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048052533) success|
|#379|18869fe910a89a55f897e74d6e81015404ca3998|Standalone Pilot APK: [38048058091](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048058091) in_progress; CI: [38048058105](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048058105) success|
|#380|e6c6554f9208d4243bc8f724fba4b8971d958a1d|Standalone Pilot APK: [38048063298](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048063298) in_progress; CI: [38048063306](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048063306) success|
|#381|ac18ca03de7a5f09ff3a626a763fadb55e699074|Standalone Pilot APK: [38048068335](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048068335) in_progress; CI: [38048068370](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048068370) success|
|#382|516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca|Standalone Pilot APK: [38048073303](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048073303) in_progress; CI: [38048073330](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048073330) success|

CI pós #376–#382 success; respectivos APKs ainda in_progress na consulta. Não usar APK pré-merge para declarar pós-merge verde ou cobertura física.

Privacidade recusa aplicar ACK/export/desativação depois do prazo de 15s, mesmo se o transporte completar; mantém resultado desconhecido quando a operação foi enviada e exige conferência explícita. Ler pedidos é GET sem criar DSAR; gerar export continua explícito e cria access DSAR no backend. Troca de identidade limpa detalhes/cópia da origem anterior; erros na mesma conta preservam rascunho. Desativação preserva confirmação humana, bloqueios backend e limpeza condicional da sessão.

Assistente usa runForSession para enviar com Authorization de origem imutável e verificar conta/foco/abort após interpretar, antes de mostrar sugestão. Mantém assisted, deterministic_baseline, executionAllowed=false, rotas por accountType e confirmação humana. Nenhuma chamada paga a LLM ou execução crítica introduzida.

Membros verifica abort/Authorization+empresa após GET/ACK e antes de selecionar a empresa. Aceite continua permitido à conta autenticada sem tenant selecionado; persistência condicional preserva a sessão e evita sobrescrever outra seleção. Rascunhos são limpos ao confirmar outra conta/empresa, inclusive após voltar à tela; refresh no mesmo contexto sem empresa não apaga o código. A geração marca incerteza antes do POST e a conserva após blur/timeout/resposta perdida; nova criação exige conferência manual, evitando substituir silenciosamente o segredo do convite anterior. Códigos secretos não são persistidos no checkpoint/log.

Schemas recusam IDs vazios/brancos de membros, convites, DSAR, identidade e vínculos da cópia. Código sem prefixo/segredo e criação/revogação sem ID de contexto não iniciam transporte. ACK real segue o contrato existente; não se inventa tenant echo ou UUID rígido no cliente. Convites mantêm roles owner/admin/manager, e-mail/expiração/vínculo, sem alteração de política, promoção ou tenant/RLS.

234/234 testes mobile locais passaram em UTC e America/Sao_Paulo, zero falha/cancelamento/skip. Sete regressões novas cobrem schemas/guards antes do transporte, aceite sem empresa selecionada, ACK incompleto e composição dos helpers reais com deadline/troca de conta. Três telas, dois helpers e três testes revisados; JSX e StyleSheet canônicos são idênticos aos da base. PrivacyController, CopilotController e CompanyMembersController atuais lidos integralmente. Nenhuma DSAR, exportação de pessoa real, desativação, convite ou interpretação real executada; apenas fixtures. React19.1.4/RN0.81.6, lockfile, backend, tenant/RLS e regras financeiras preservados. Checkout local parcial não prova type/build/HTTP/DB/native; próprios CI/APK e pós-merge continuam obrigatórios.

Publicar fix/account-actions-timeout-origin, filho da main 516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca; consultar número/commit/árvore/runs próprios após publicação (snapshot anterior, sem SHA circular fictício). Revisar diff remoto e integrar apenas com CI/APK success no SHA exato e gates aplicáveis; verificar árvore/pais/main e pós-runs. Acompanhar todos os APKs pós #376–#382; falha nova exige diagnóstico, não retry automático sem causa.

Próximo item independente identificado no código: index.tsx lê getSession e getTenant em operações de fila separadas, podendo misturar a navegação durante troca de sessão. Usar snapshot pareado existente authenticatedTenantHeaders, foco e confirmação final antes do redirect, sem novo endpoint/política; provar interleaving real da fila e roteamento antes de publicar. EmpresaConta já usa limpeza condicional e foco, CompanyNav já renderiza corretamente; _layout é apenas Stack. Não fabricar commits de bootstrap.ts sem consumidor ou rotas/contratos de ajuda/preferências ausentes.

Visual Truth original/dados/estados/cobertura física integral OPEN; piloto, pentest, provider/TRUST, PSP/FIN-RISK e WEB-ARCH separados. A validação física exige aparelho e pessoas/contas de teste autorizadas; não fechar com emulador/fixtures. Não executar operações reais, dinheiro, novas cobranças, infraestrutura/deploy pagos. Bloqueio parcial/CI running/fim de rodada não encerra projeto nem exige continuar; manter rotina existente até conclusão integral comprovada ou ordem explícita.


## Atualização verificada 2026-10-10 11:32 UTC — v1.73

Snapshot 2026-10-10 11:32 UTC. Main 516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca, árvore 27f168902ad888017df379526437690202204473. PR #383 aberta, base main, head a8c2c106068f311a64e6a303bae03d6d323df8e2, árvore 6159c19dd189fd46691df56a39fffa58a7ec993c, pai main conferidos. Reconsulta raw PR confirmou mergeable=true (snapshot inicial eventual false, sem conflito). Diff remoto #383 revisto, 17 arquivos esperados. Próprios runs: [38048556192](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048556192) Standalone Pilot APK in_progress; [38048556097](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048556097) CI success. Job114202904182 já aprovou typecheck/build/export Android; isto não substitui conclusão do run ou APK.

#376–#382 já integradas; head CI/APK exatos, retarget/review/merge-base, árvores/pais/main e pós #375 success documentados no journal1129Z/v1.72. CIs pós #376–#382 success; APKs pós 376: 38047970768 in_progress; 377: 38048000637 in_progress; 378: 38048052704 in_progress; 379: 38048058091 in_progress; 380: 38048063298 in_progress; 381: 38048068335 in_progress; 382: 38048073303 in_progress. Jobs pós376/382 aprovam build e executam device smoke, portanto acompanhar e não concluir/fabricar gate. Não repetir merges/retries anteriores.

A abertura do app passa a usar authenticatedTenantHeaders: token e tenant são lidos no mesmo trabalho da fila de sessão. resolveStartupRoute confirma os dois campos após a leitura antes do redirect; mudança de conta ou de empresa (incluindo tenant antes ausente), blur e erro não produzem rota antiga. A tela reconsulta no foco; uma conclusão antiga não atualiza UI nem navega depois de sair. Mantém a escolha existente empresa/profissional por empresa selecionada, sem inferir papel/membership ou autorização no cliente. Sem token, um tenant órfão não abre conta. Erro/stale retorna às opções existentes de entrar/cadastrar, sem ficar em loading eterno ou inventar conta.

Quatro regressões novas exercitam snapshots estáveis, interleaving real de createSessionQueue/persistVerifiedSession entre as leituras, troca só de tenant e blur/erro/recuperação. 238/238 testes mobile passaram em UTC e America/Sao_Paulo, zero falha/cancelamento/skip. JSX/StyleSheet de index.tsx idênticos à base; apenas binding de sessão/foco e novo helper/teste. SecureStore, fila, auth, backend, RLS, React19.1.4/RN0.81.6 e lockfile inalterados. Apenas fixtures, sem operações reais. CI próprio type/build/export/HTTP/APK e pós-merge pendentes.

Publicar fix/startup-session-pair sobre o head próprio #383 a8c2c106068f311a64e6a303bae03d6d323df8e2, base fix/account-actions-timeout-origin; consultar PR/head/árvore/runs próprios após publicação, sem SHA circular. Integrar #383 somente com CI/APK próprios success no SHA exato, diff/base/main/merge-base fresh; verificar árvore/pais/main e pós. Depois retarget filho para main, reconsultar estado eventual, preservar antecessor e revalidar gates, integrar em ordem. APK running significa acompanhar, não bloqueio definitivo nem motivo para desativar a continuidade.

Próxima auditoria independente: confrontar FULL_SCOPE_RECONCILIATION_2026-09-28 e deltas v1.16–v1.18 com controllers/migrations/tests atuais de taxonomy/capabilities/modalidades/planner/graph/score/terms/support/career/integrity/vertical/Copilot. A lista v1.16 é histórica: v1.18 registra evolução de implementação, cuja existência por si só não prova exposição/jornada/cobertura canônica atual. Validar lacuna concreta antes de adicionar código, sem pseudo-ML, política arbitrária ou commits sem consumidor. REQUIREMENTS_LEDGER base possui fatos de 2026-09-24 (runner bloqueado etc.); marcar histórico, consultar deltas/evidências atuais em vez de repetir como impedimento atual.

Visual Truth original/dados/estados/cobertura física integral permanece OPEN, junto de piloto físico/pentest independente/providers/PSP/FIN-RISK/WEB-ARCH separados. Packet físico e escopo pentest reconsultados: exigem aparelho/OS/build/SHA/jornadas/capturas sanitizadas e avaliador independente; CI/emulador/AI não fecham esses gates. Execução exige aparelho e identidades/fixtures de teste autorizadas, sem dados reais; não contratar/custear/ativar PSP ou deploy pago. Manter a rotina existente ativa até conclusão integral comprovada ou ordem explícita.


## Atualização verificada 2026-10-10 11:40 UTC — v1.74

Snapshot 2026-10-10 11:40 UTC. Main 516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca (#382/v1.71), árvore 27f168902ad888017df379526437690202204473. #376–#382 merges conferidos; não repetir. Provas próprias e pós #375 no journal1129Z; CIs pós #376–#382 success.

#383 aberta base main, head a8c2c106068f311a64e6a303bae03d6d323df8e2, tree6159c19dd189fd46691df56a39fffa58a7ec993c: CI38048556097 SUCCESS, APK38048556192 in_progress.
#384 aberta base fix/account-actions-timeout-origin, head d2146ef4a84a025567d52af7cb2b506462e29836, treeb0f4e30e05428882397ee6bcee6cec43a94a533e, pai #383: CI38048756243 SUCCESS (job114203460616 type/build/export/tests/migration/privacy/HTTP todos aprovados), APK38048756318 in_progress. Commit/árvore/pai/base/diff conferidos; layout original idêntico. Integrar em ordem, sem emprestar gate entre SHAs.

Pós #376 APK38047970768 tentativa1 FAILURE: job114201236096 aprovou build; Android anunciou boot após472175ms, mas input keyevent82 do runner falhou Broken pipe/exit224 em2026-10-10T11:37:33Z, antes de iniciar o script que instala/abre o aplicativo. Nenhum DEVICE_SMOKE_OK no job. Diagnóstico/upload preservado: artefato ZIP11668597419 sha256:e80f2911d73490f73ddcf7d0d7fdb28a6592922a38ccfc5b11b1f1bebc6b196a, vinculado ao SHA847992ad32b078d0bdffe734510ba9113f7e6304, não expirado. Um único retry controlado deste job pós-merge no mesmo SHA solicitado11:38:51UTC; tentativa2 agora in_progress. É outro run em relação ao retry próprio376 anterior; não repetir qualquer tentativa recuperada ou esta tentativa2 sem novo diagnóstico/decisão. Histórico preservado, sem transformar falha de infraestrutura em PASS do app.

Pós APKs #37738048000637/#37838048052704/#37938048058091/#38038048063298/#38138048068335/#38238048073303 permanecem em execução na última consulta. Acompanhar conclusão e conferir job/smoke/artefato/head; pré-merge não prova pós-merge. Nenhum novo gate físico/externo fechado.

A auditoria do escopo v1.16–v1.18 encontrou defeito concreto no SupportController atual: create verificava membership no tenant do pedido, mas inseria assignmentId sem consultar o trabalho naquele contexto. Migração0060 tem FK simples para work_assignments(id); RLS de support_cases restringe seu próprio tenant_id, sem provar tenant do objeto referenciado. Portanto a validação de membership/RLS do caso isoladamente não impede um vínculo cruzado informado no corpo.

Correção: validar o contrato existente e consultar work_assignments por tenant_id+id dentro da mesma DatabaseService.tenant (app_runtime/RLS) antes do INSERT. Assignment ausente naquele contexto retorna support_assignment_not_found (400) sem INSERT; UUID malformado/branco retorna support_case_invalid antes da transação. Caso sem assignment continua permitido. Descrição mantém limite real do schema de4000 caracteres Unicode (não só unidades UTF-16), campos/categorias/prioridades existentes e defaultnormal; dados malformados retornam400. Membership, reporter filtering, owner/admin review, status/SLA e política intratenant inalterados.

Não há migração, correção/varredura de dados reais ou mudança de permissões/RLS; isto corrige a entrada HTTP, sem alegar que a FK simples virou uma constraint tenant-composta. Pentest independente e auditoria de vínculos persistidos permanecem distintos; nenhuma exposição/ausência de exploração real foi presumida. Nenhuma abertura/revisão de suporte ou operação real foi executada.

Quatro testes novos do helper de input passaram localmente, incluindo limite Unicode; quatro testes novos da criação passaram exercitando o corpo real de create extraído do controller, com auth/DB simulados (sem decorators/Nest runtime). Estes quatro fixtures também estão em support.controller.test.ts para instanciar o controller inteiro no CI com dependências reais; mock não prova PostgreSQL/RLS. API test script registra explicitamente ambos os arquivos TS. Bash -n do novo HTTP E2E passou.

HTTP E2E adicionado ao CI usa API local+PostgreSQL efêmero com duas empresas e profissional, cria assignment por onboarding legítimo, rejeita associação B→assignmentA/IDs inexistentes e malformados/descrição longa sem alterar contagens, valida casos vinculados e sem vínculo, filtro reporter e revisão admin/cross-tenant. Sucesso HTTP/DB ainda PENDENTE até run próprio, não simulado como PASS local. Nenhum endpoint público de produção usado.

238 testes mobile UTC/SP já comprovados em #384; nenhum arquivo mobile alterado nesta correção. React19.1.4/RN0.81.6, lockfile/deps e JSX preservados; package API muda apenas script de testes, workflow CI ganha uma chamada de regressão. Próprio CI exato obrigatório para type/build/testes/migrações/HTTP/DB. Workflow standalone possui path filter e esta fatia só altera API/CI/script/docs; APK próprio pode não ser disparado (aplicabilidade N/A documentada, sem inventar run). Os APKs próprios de #383/#384 e seus pós-gates permanecem obrigatórios antes de integrar antecessores; verificar subtree mobile idêntica ao pai e gates realmente emitidos após publicar/retarget. Não usar ausência de APK como sucesso ou para fechar Visual Truth.

Publicar fix/support-assignment-tenant-boundary sobre #384 d2146ef4a84a025567d52af7cb2b506462e29836, base fix/startup-session-pair. Consultar próprio PR/head/árvore/diff/run após publicação; registro antecede commit, sem SHA circular fictício. Integrar #383 e #384 em ordem somente com próprios CI/APK success, fresh main/base/merge-base e diff; conferir árvore/pais/main e pós. Retarget filho para main só depois, reconsultar eventual mergeable e reconciliar conflito real preservando antecessores e novos gates. Para esta correção de API, exigir próprio CI success incluindo HTTP suporte e verificar aplicabilidade do standalone pelos paths/subtree intactos. Pós-merge exige CI no SHA real e deploy/Production Truth quando aplicável; não inferir deploy só de merge.

Próxima auditoria segura independente: integrity.controller.ts, cancellation.controller.ts, career-conversion.controller.ts e work-graph.controller.ts atuais, procurando referências de assignment/job fora do contexto real e conferindo contratos/tests/tenant antes de qualquer ajuste. A presença de backend v1.18 não prova todas as jornadas/cobertura mobile; perfil ainda expõe Ajuda/Preferências indisponíveis. O backend suporte é tenant-scoped e a jornada profissional é multi-company; não escolher arbitrariamente um tenant nem criar rota/UX sem confrontar referência canônica/contrato. Preferências não ganham modelo inventado. Taxonomy/planner/graph/score/terms/vertical/Copilot devem ser confrontados com requisitos atuais e testes, sem criar atividade sem defeito/requisito real.

Visual Truth original/dados/estados/cobertura física integral OPEN; piloto físico, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH separados. Sem dinheiro real, novos custos/infraestrutura/deploy pago. Não desativar rotina por gate parcial/running/fim de rodada; manter retomada pelo checkpoint até conclusão integral comprovada ou ordem explícita.


## Atualização verificada 2026-10-10 11:45 UTC — correção da fixture e pós-provas

PR #385 primeiro head b8674912ea8e553fe3e311b551a31a597ef633b3/tree f1ea148e29fa6aa87ee0ea60108f0109d89191d6/pai d2146ef4a84a025567d52af7cb2b506462e29836 conferidos, diff remoto16arquivos revisado. CI38049311501/job114205058747 FAILURE no passo HTTP, após type/build/export, testes unitários incluindo controller inteiro, migration runner e privacy pass. Não reclassificar run nem repetir como transiente: havia expectativa403 incorreta para absent-membership no novo script; AuthService.requireMembership atual lança UnauthorizedException401. Fixture corrigida para401, com etiquetas/HTTPesperado+real em todos os negativos (sem tokens/payloads em diagnóstico), sem mudar autorização/backend. Bash -n passou. Novo commit próprio é obrigatório e será revalidado integralmente; consultar seu SHA após publicação, pois este registro o antecede. HTTP suporte ainda pendente até novo run success.

Subtree mobile exata #384/#385 é ba685042c10bf42051738241601f7a2041498a7b. Próprio #385 só emitiu CI (path filter APK N/A para API/CI/script/docs); isto não fecha APKs próprios #383/#384 nem Visual Truth.

|PR|SHA pós-merge exato|Gates|Job APK|Smoke real sem Metro|Artefato/digest ZIP (não APK individual)|
|---|---|---|---|---|---|
|#378|0e8321c4aa0adeb389d11d776a8cd66567680798|CI38048052533/APK38048052704 SUCCESS|114201468568|2026-10-10T11:40:07.1735973Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|ZIP11668990409 sha256:323b858d10f7dda7dc93143c2b5ec9283a1ebd02af0299521c8ee1587b5b3eb3|
|#379|18869fe910a89a55f897e74d6e81015404ca3998|CI38048058105/APK38048058091 SUCCESS|114201484903|2026-10-10T11:38:58.5421271Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|ZIP11668797338 sha256:0c37566a8d48dbecc2488428cb7e0d7577aae23296fca9e42f7f21b608cf9892|
|#382|516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca|CI38048073330/APK38048073303 SUCCESS|114201529542|2026-10-10T11:39:26.5431555Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false|ZIP11668462821 sha256:145261eb8336c7981d9e6ff40c0a9609fa7a5b4f17f59ca52cdd85e52cf8d87a|

Jobs completos, smoke/uploadsuccess, vínculo artifactSHA e não-expiração conferidos. Main516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca possui pós-CI/APKsuccess; não implica fechamento físico. Pós #381 tentativa1APK38048068335/job114201515065 falhou input Broken pipe224 em11:39:53Z antes do script app, apósbuild. DiagnósticoZIP11668319473 sha256:2da1618bdea13d360df0481e9df4bfbd289b3a1fb1b672e8bcf94392db6ea229 vinculado ao SHAac18ca03de7a5f09ff3a626a763fadb55e699074. Único retry controlado no mesmoSHA solicitado, a acompanhar tentativa2; não repetir sem nova causa. Pós376retry2 e377/380 ainda a acompanhar; próprios APK383/384 pendentes. Nenhum novo merge realizado.

Auditoria integrity/cancellation/career-conversion/work-graph encontrou lookup/relação tenant explícitos no fluxo lido; não alterar política sem defeito provado. Lacuna independente concreta encontrada: API package test enumera fontes manualmente e omite12arquivos .test.ts existentes (Copilottools/modalidades/SLA/integration/appeals/schedule/score/adapter HMAC/taxonomy/team/terms/vertical). Typecheck não executa testes. Próxima tarefa segura após publicar esta fixture: configurar descoberta dos29arquivos de teste API atuais (27da main+2suporte), provar execução efetiva dos omitidos e manter todos os gates. Sem ativar provider/financeiro real.


## Atualização verificada 2026-10-10 11:50 UTC — v1.75

Snapshot 2026-10-10 11:50 UTC. Main 516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca (#382/v1.71), árvore 27f168902ad888017df379526437690202204473. Pós-main CI38048073330/APK38048073303 SUCCESS, job114201529542/smoke2026-10-10T11:39:26.5431555Z semMetro/ZIP11668462821 sha256:145261eb8336c7981d9e6ff40c0a9609fa7a5b4f17f59ca52cdd85e52cf8d87a conferidos. Pós #375/#377/#378/#379/#382 CI/APKsuccess com provas no journal1129Z/1145Z e abaixo; não repetir merges.

PR #383 heada8c2c106068f311a64e6a303bae03d6d323df8e2 ownCI38048556097 SUCCESS/APK38048556192 in_progress, base main.
PR #384 headd2146ef4a84a025567d52af7cb2b506462e29836 ownCI38048756243 SUCCESS/APK38048756318 in_progress, base #383.
PR #385 headdcda3bf76996f82b8c85c2bb2767581ef6d1d18b, árvore78aea740b5e241e480b6d381945d60346b7b4101, pai b8674912ea8e553fe3e311b551a31a597ef633b3: CI38049578933 SUCCESS, job114205819194, type/build/export/tests/migrations/privacy/HTTP todos aprovados. Log11:48:12.6053438Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved. 47 testes API,238 mobile e4Web no CI;8regressões suporte reais(controller inteiro+input) presentes. Primeiro CI38049311501 FAILURE preservado; fixture401 corrigida por novo commit sem retry/alterar auth. Base #384; diff remoto18arquivos revisado, mergeabletrue reconsultado. Mobile subtree ba685042c10bf42051738241601f7a2041498a7b igual ao pai; workflowAPKnãoemitiurun para este diff API/CI/scripts/docs (N/A por paths, não PASS inventado).

Pós #377 CI38048000622/APK38048000637 SUCCESS, job114201321884, 2026-10-10T11:43:32.9805768Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; ZIP11668767598 sha256:c7dbba28bb8b81565a592660296753b852208fe3b3d2d2d9929ab5f79e81aa8a; upload/artefato/head conferidos.
Pós #376 APK38047970768 tentativa2 e #381 APK38048068335 tentativa2 em execução após únicos retries diagnosticados nos respectivos runs, históricos1failuremantidos. Pós #380 APK38048063298 tentativa1 FAILURE job114201499870: buildpass; script iniciou, Androidserviceactivity indisponível e shell224 antes de confirmação de install/launch/smoke; sem DEVICE_SMOKE_OK. ZIP diagnóstico11668792675 sha256:3c96a18f741d5a97f19f0802c291c35ac1e3533eca7e0f8bfa2ab082db894ac3 baixado e hashbytes comprovado; manifest SHAe6c6554f9208d4243bc8f724fba4b8971d958a1d/run38048063298/attempt1, boot1, logcat_exit124, app-pid_exit1, nenhum install ACK. Falha de readiness Android não prova crash nem sucesso do aplicativo. Único retry sameSHA/job solicitado11:49:19UTC, acompanhar tentativa2, sem repetir semnova causa. Nenhuma queda de gate.

O package API test registrava manualmente fontes e deixava12arquivos de testes existentes sem execução, apesar de typecheck global passar. Corrigir a descoberta para src/*.test.ts (todos os29arquivos atuais no diretório src,27da main+2suporte), por tsconfig.test.json estendendo a configuração API real. Mantém CommonJS/target/decorators/metadata/node e strict/base; outDir .test-dist, sem declaration/sourceMap. O comando apaga somente saída gerada .test-dist antes de compilar, evitando resíduos de testes removidos, depois executa todos os .test.js emitidos. Não criar testes espelho para configuração: provar execução dos testes reais no CI.

Arquivos antes omitidos:
- apps/api/src/copilot-tools.test.ts
- apps/api/src/engagement-modality.test.ts
- apps/api/src/exception-sla.test.ts
- apps/api/src/integration-contract.test.ts
- apps/api/src/safety-appeal-policy.test.ts
- apps/api/src/schedule-optimizer.test.ts
- apps/api/src/score-engine.test.ts
- apps/api/src/signed-json-payment-provider.test.ts
- apps/api/src/taxonomy.test.ts
- apps/api/src/team-optimizer.test.ts
- apps/api/src/terms-policy.test.ts
- apps/api/src/vertical-packs.test.ts

26 testes locais de13arquivos passaram com transformação TS nativa sem tsc/Nest/DB:21testes dos12omitidos e5Copilot já existentes. Fontes/helpers efetivos lidos e executados, inclusive HMAC/tampering/recipient, appeals/idempotência, planning/taxonomy/terms/SLA, sem chamadas externas nem dinheiro real. Essa prova não é o novo comando de build completo; próprio CI deve comprovar descoberta, compile e testes. Baseline47 API deve crescer pelas21regressões antesomitidas sem perder as anteriores; confirmar quantidade real no log, não assumir PASS. 238 mobile UTC/SP preservados, nenhum código de produto/política/dependência/lockfile mudou. Dois arquivos de config/script revisados; gates HTTP suporte e demais existentes permanecem obrigatórios.

Publicar fix/api-test-discovery sobre #385 dcda3bf76996f82b8c85c2bb2767581ef6d1d18b, base fix/support-assignment-tenant-boundary, consultar próprio PR/head/tree/run após publicar (sem SHA circular fictício). Integrar #383/#384/#385 e filho em ordem com freshPR/main/base/merge-base/diff e own gates aplicáveis no SHA exato. #383/#384 exigem APK próprio; #385/esta fatia API apenas só possuem CI por path filter, confirmar mobile subtree idêntica/base e gates emitidos após retarget antes de integrar. Verificar árvore/pais/main e pós-CI/APK quando aplicável; merge não implica deploy ou fechamento físico.

Acompanhar APKs próprios #383/#384 e retries pós376/380/381; não repetir merges ou retries já iniciados. Para o próximo item, conferir eventual falha de teste agora descoberto como defeito real, sem modificar expectativa para esconder política incorreta. Depois completar confronto de taxonomy/capabilities/modalidades/planner/graph/score/terms/support/career/integrity/vertical/Copilot com testes/controllers/jornada canônica, pois ausência de issue ou presença de código backend não prova escopo inteiro. Integrity/cancellation/careerconversion/workgraph lidos apresentam vínculos tenant na operação; não gerar alteração sem defeito demonstrado.

Visual Truth original/dados/estados/cobertura física integral OPEN; piloto/aparelho, pentest independente, providers/TRUST/PSP/FIN-RISK e WEB-ARCH separados. Ajuda/Preferências no perfil ainda indisponíveis; suporte backend é tenant-scoped vs profissionalmulti-company e exige contrato/jornada/design canônicos antes de expor; não inventar tenants, dados, telas/política ou pseudo-ML. Bloqueio parcial/running/fim de rodada não encerra projeto; manter rotina existente para retomar checkpoint até conclusão integral comprovada ou ordem explícita. Sem dinheiro real, nova cobrança/infraestrutura/deploy pago.


## Retomada 2026-10-10 12:06 UTC — v1.76

# Checkpoint de execução autônoma — MLIVRETRABALHO

## Merges confirmados e pós-verificação — 2026-10-10 12:06 UTC

Main caa275aadbb118d37696f5609c3ebe17cd4e5856, árvore87b6c25b186660025eb5e408240ce9d66fbae160, Documento vigente v1.75 antes desta fatia. README/memória/checkpoint/main/PRs/diffs/gates reconsultados. Nenhuma PR aberta no snapshot antes da nova publicação. #383–#386 integradas em ordem, com retarget main só após predecessor, fresh merge-base.tree igual à main.tree, diff integral revisado e gates próprios no SHA exato; expected_head_sha em cada merge. Git object pós-merge conferiu árvore idêntica ao own head e dois pais corretos (main anterior e head), depois main igual ao resultado. Não repetir esses merges.

|PR|Own head|Merge real|Árvore|Pais ordenados|Own gates|Pós-merge|
|---|---|---|---|---|---|---|
|#383|a8c2c106068f311a64e6a303bae03d6d323df8e2|0d492408860ef0575e59974bf33eee19912a03e0|6159c19dd189fd46691df56a39fffa58a7ec993c|516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca / a8c2c106068f311a64e6a303bae03d6d323df8e2|[CI38048556097](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048556097) SUCCESS; [APK38048556192](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048556192) SUCCESS|[Standalone Pilot APK38050190228](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050190228) IN_PROGRESS; [CI38050190209](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050190209) SUCCESS|
|#384|d2146ef4a84a025567d52af7cb2b506462e29836|c033a300eb7e51b383a07240cc5ec4eb07900b40|b0f4e30e05428882397ee6bcee6cec43a94a533e|0d492408860ef0575e59974bf33eee19912a03e0 / d2146ef4a84a025567d52af7cb2b506462e29836|[CI38048756243](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048756243) SUCCESS; [APK38048756318](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38048756318) SUCCESS|[Standalone Pilot APK38050194765](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050194765) IN_PROGRESS; [CI38050194820](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050194820) SUCCESS|
|#385|dcda3bf76996f82b8c85c2bb2767581ef6d1d18b|a494e500346738e0469897ecc99ae67be71c38c7|78aea740b5e241e480b6d381945d60346b7b4101|c033a300eb7e51b383a07240cc5ec4eb07900b40 / dcda3bf76996f82b8c85c2bb2767581ef6d1d18b|[CI38049578933](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38049578933) SUCCESS; APK N/A por paths e mobile inalterado|[CI38050198899](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050198899) SUCCESS|
|#386|0ee492ee69e0e97ab501116181df4726495e62bf|caa275aadbb118d37696f5609c3ebe17cd4e5856|87b6c25b186660025eb5e408240ce9d66fbae160|a494e500346738e0469897ecc99ae67be71c38c7 / 0ee492ee69e0e97ab501116181df4726495e62bf|[CI38049903423](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38049903423) SUCCESS; APK N/A por paths e mobile inalterado|[CI38050204302](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38050204302) SUCCESS|

Own APK #383: job114202904683, 2026-10-10T11:54:43.4161082Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; artefato ZIP11669076498 sha256:b7f47b2e97ea626a42fa37053f5fa84b8331474a7cfecd04c15347b39da6fac8, head exato e não-expiração conferidos; smoke/upload success. Digest é do ZIP, não hash do APK individual.

Own APK #384: job114203460850, 2026-10-10T11:50:10.5514199Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; artefato ZIP11669330803 sha256:6aa3df4dff966893ba0d521e1a39a839e5a31fe5ff7e35b8408d56862274fcdf, head exato e não-expiração conferidos; smoke/upload success. Digest é do ZIP, não hash do APK individual.

Pós-CI #383 job114207589116:234mobile/39API/4Web/3CLI; #384 job114207602709:238mobile/39API/4Web/3CLI; #385 job114207614804:238mobile/47API/4Web/3CLI + suporte HTTP PASS2026-10-10T11:58:38.6370356Z. #386 job114207631004:238mobile/68API/4Web/3CLI + suporte HTTP PASS2026-10-10T11:58:45.3278831Z. Typecheck/build/export/tests/migration/privacy/HTTP todos success no SHA do merge, logs conferidos. Os21testes antesomitidos executaram no próprio CI386 e no pós-CI386, sem apagar falhas históricas. #385 CI inicial38049311501failure por fixture403 incorreta, corrigida401 no novo head, sem alterar política ou retryfake.

Mobile subtree ba685042c10bf42051738241601f7a2041498a7b preservada de #384 até #386; API/package e CI/scripts/docs não acionam standalone path filter. N/A não é PASS; pós-APK #38338050190228/job114207589083 e #38438050194765/job114207602549 ainda build/smoke pendentes no snapshot. Own smoke pré-merge não substitui conclusão pós-merge.

Pós #376 SHA847992ad32b078d0bdffe734510ba9113f7e6304: CI38047970793 SUCCESS, APK38047970768 tentativa2 SUCCESS, job114204577340, smoke2026-10-10T12:02:34.3682518Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; ZIP11669042479 sha256:a1d7b1f742157b649b52e9bc3c4761c4ec3b96239be964a8248245adbbed6ec6, head/não-expiração/upload conferidos. Falha tentativa1 e diagnóstico11668597419 mantidos; retry único recuperou infraestrutura, não prova visual física.

Pós #380 CI38048063306 SUCCESS, APK38048063298 tentativa2/job114206339606 smoke em execução; #381 CI38048068370 SUCCESS, APK38048068335 tentativa2/job114205251830 smoke em execução. Únicos retries já iniciados; não solicitar outro sem nova causa. Históricos/diagnóstico do primeiro fracasso no journal1150Z preservados. Pós #375/#377/#378/#379/#382 CI/APK SUCCESS com provas nos journals1129Z/1145Z/1150Z; não repetir merge/run. Execução/bloqueio parcial não fecha projeto.

## Limites e próxima ação

Esta fatia API/CI/scripts/docs exige próprio CI completo no novo head, diff remoto integral e árvore/base/main/merge-base frescas antes de merge. Confirmar mobile subtree inalterada e paths APK aplicáveis; nenhum PASS inventado nem SHA circular. Consultar PR/head/tree/run após publicar fix/governed-taxonomy-catalog baseada nesta main. Após gates integrar com lease, verificar pais/árvore/main e pós-CI. Merge não prova deploy público; não foram realizadas operações reais de conta, trabalho, suporte, dados pessoais, provider ou dinheiro.

Acompanhar pós-APKs pendentes e retries já em execução. Próximo item seguro comprovado a revalidar: perfil e disponibilidade confirmam identidade/foco ao receber resposta mas não conferem abort por prazo no resultado final; investigar ACK/JSON tardios e preservar rascunho/estado incerto de operação. Signup merece auditoria equivalente, sem reenvio automático de POST não idempotente. Canonical support journey/tenant choice exige confronto antes de nova UI; não inventar default tenant/política. Presença de backend/ausência de PR não comprova escopo integral.

Visual Truth completo do desenho original/dados/estados/cobertura em aparelho físico permanece OPEN. Piloto/device, pentest independente, providers/TRUST/PSP/FIN-RISK e WEB-ARCH separados. Nenhum dinheiro real, nova cobrança/infraestrutura/deploy pago autorizado. Rotina existente mantida até conclusão integral comprovada ou ordem explícita; não criar outra rotina, não alegar execução contínua em tempo real.

## Item atual — catálogo governado/competências

GET /taxonomy/roles devolvia somente CANONICAL_ROLES estáticas, sem id; PUT/DELETE /professional-capabilities/:roleId exige taxonomy_roles.id. A tabela governada já existe na migration0058: IDs são TEXT opacos (por exemplo cleaning.cleaner, vertical cleaning_facilities), não UUID nem vertical.role derivado. O catálogo passa a ler apenas registros ativos do banco, retornar o id real e os campos existentes, com ordenação determinística e busca textual existente reaplicada sobre os dados atuais. Lista vazia permanece vazia; falha do banco propaga erro, sem fallback fictício. Continua consulta pública de catálogo não pessoal. Não altera regras de competências, provenLevel, auth, RLS, migrations, UI ou avaliação profissional.

Uma regressão de busca e quatro do controller cobrem ID/registro dinâmico não-seed, leitura ativa, vazio e erro. Seis testes locais (um anterior mais cinco novos) passaram com transformação TS nativa e controller sem decorators/adaptador DB mockado; não equivalem a tsc/Nest/Postgres real. Bash -n passou. O novo script HTTP aceita somente API local descartável e usa dois profissionais fixture; descobre id/skill no catálogo, cadastra competência, verifica leitura própria, bloqueia skill/role inválidos, prova que outro profissional não vê nem remove a competência e remove a própria ao final. CI precisa provar esse script, controller Nest compilado, banco real efêmero e todos os gates existentes; antes do novo run não declarar esse E2E PASS. Descoberta API v1.75 inclui o novo .test.ts sem enumeração manual. Nenhuma mudança de React19.1.4/RN0.81.6 ou lockfile.


## Retomada 2026-10-10 12:08 UTC — v1.77

# Checkpoint de execução autônoma — MLIVRETRABALHO

## Último estado verificado

Snapshot 2026-10-10 12:08 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), árvore29ee4cadb0a41ef7c89b8c08452d17691a66eeb3. PR387 ownhead0e45557096c025ef431c37d1f6983666b95f7962, CI38050684891/job114209015503 SUCCESS: todos os passos typecheck/build/export/tests/migration/privacy/HTTP aprovados;73API/238mobile/4Web/3CLI. HTTP catálogo/CRUD/isolation PASS2026-10-10T12:07:33.6125647Z, suporte PASS12:07:35.0650656Z. 15 conteúdos remotos byte a byte iguais ao revisado, diff integral inalterado e main/base/merge-base frescos, cleantrue, expectedhead e merge_method merge. Git merge tem árvore exata do head e pais caa275aadbb118d37696f5609c3ebe17cd4e5856 /0e45557096c025ef431c37d1f6983666b95f7962; main conferida. Pós-CI38050884981 em execução, APK N/A por path filter/mesma subtree mobileba685042c10bf42051738241601f7a2041498a7b. Não repetir merge; não alegar deploy público. v1.76/journal1206Z contém prova completa383–386 own/merge/postCI e correções históricas.

Pós #381 SHAac18ca03de7a5f09ff3a626a763fadb55e699074: CI38048068370 SUCCESS; APK38048068335 tentativa2 SUCCESS, job114205251830 smoke/uploadsuccess, DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false2026-10-10T12:06:04.6261351Z; ZIP11669042821 sha256:ca3cc88f76a14d18b70f959dd2f7ab691ee738e8150c0e61458280bae71bb537, head/não-expiração conferidos. Tentativa1failure/diagnóstico11668319473 mantidos, nenhum novo retry. Pós376retry2 já SUCCESS com prova no journal1206Z;375/377/378/379/382 pósCI/APK SUCCESS. Pós380CI38048063306 success/APK38048063298 tentativa2 ainda smoke em execução; pós383CI38050190209 success/APK38050190228 running e384CI38050194820 success/APK38050194765 running. Gates próprios383384 e CIs pós383–386 aprovados, mas esses APKs pós383384 não estão concluídos no snapshot.

Esta fatia mobile exige próprio CI E APK standalone/smoke/artefato no SHA exato. Publicar fix/profile-availability-response-deadline sobre main738073540f7ff6f9156b704a95c7a5616643307e e consultar PR/head/tree/runs reais após publicação; nenhum SHA futuro fictício. Revisar diff remoto integral/base/main/merge-base antes de integração, expectedhead, árvore/pais/main, depois pósCI/APK; não confundir build com smoke/aparelho físico. Gates ainda pendentes para esta alteração, nenhum merge autorizado sem aprovação dos gates aplicáveis.

Próxima ação segura em paralelo à validação: auditar criar-conta/signupAccount. Tela final verifica foco mas não prazo; POST criação é não idempotente, logo não aplicar ACK tardio nem retransmitir automaticamente. Revalidar fonte/testes e distinguir validação local sem POST de resultado incerto depois de envio; signin/signout têm semântica própria e não devem ser alterados por analogia. Suporte UI/tenant choice depende de confronto canônico; APIs existentes e ausência de issues não provam fechamento integral.

Visual Truth do desenho original/dados/estados/cobertura integral em aparelho físico OPEN. Pentest independente, piloto/device, providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Só mocks/localCI descartável; sem operações em contas reais, dados pessoais, dinheiro, novas cobranças ou infraestrutura/deploy pago. Bloqueio parcial/transiente/CIAPKrunning não encerra projeto; rotina existente permanece, sem outra automação/alegação24h.

## Item atual — prazo em Perfil e Disponibilidade

Perfil/Disponibilidade checavam identidade/foco depois da resposta, mas ignoravam o AbortSignal do prazo nessa confirmação final. Um HTTP/JSON que resolvesse após 15s podia ser tratado como saved e limpar/substituir o rascunho. Os helpers submitProfile, submitAvailability, loadProfessionalProfile e loadWorkPassport recebem guarda opcional isCurrent (padrão compatível), conferem antes de iniciar transporte e depois de resposta/JSON; operação expirada resulta unknown nos writes/error nos reads. Disponibilidade verifica também JSON de rejeição profile-required para não confirmar motivo tardio.

As duas telas fornecem geração/foco+prazo ao helper e rechecagem final após authHeaders, pois a própria releitura da sessão pode atravessar o prazo. Perfil não transforma carga expirada em ready/sourceHeaders e mantém o rascunho; salvar mantém a mensagem existente de confirmação impossível. Disponibilidade preserva data/horários, marca uncertain e mantém a ação existente de consulta no Início. Não há reenvio automático, novo endpoint, mudança de idempotência, política/contrato ou layout. Signout continua o fluxo autorizado de limpeza condicional da sessão solicitada. JSX e StyleSheet das duas telas comparados byte a byte com a base e iguais.

Oito regressões novas exercitam helpers reais: cancelamento antes de transporte (zero calls), sucesso HTTP tardio sem consumir corpo, JSON tardio após aborto (inclui disponibilidade rejeitada/profile-required e leituras de perfil/passaporte nulo/404). 246 testes mobile passaram em UTC e America/Sao_Paulo; 238 anteriores preservados. A primeira rodada local detectou isCurrent ausente na assinatura do segundo loader (Passport), foi corrigida antes de publicar e ambas as suítes completas passaram sem relaxar expectativas. Prova local TS nativa não substitui typecheck/build/CI/APK próprio no novo SHA. React19.1.4/RN0.81.6/lockfile, API, tenant e desenho preservados.


## Retomada 2026-10-10 12:16 UTC — v1.78

# Checkpoint de execução autônoma — MLIVRETRABALHO

## Estado verificado e retomada

Snapshot 2026-10-10 12:16 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), árvore29ee4cadb0a41ef7c89b8c08452d17691a66eeb3. README/Documento vigente/memória/checkpoint/main/PRs/gates atuais reconsultados. #351–#387 já integradas conforme histórico persistente; checkpoint remoto não deve fazer repetir operações antigas. #387 ownhead0e45557096c025ef431c37d1f6983666b95f7962 e merge738073540f7ff6f9156b704a95c7a5616643307e conferidos no journal1208Z. Pós-CI38050884981/job114209605292 SUCCESS todos os passos typecheck/build/export/tests/migration/privacy/HTTP,73API/238mobile/4Web/3CLI, catálogo CRUD/isolation PASS2026-10-10T12:11:05.1450848Z e suporte PASS12:11:06.5108388Z. APK N/A por pathfilter e mobile idêntica; merge não implica deploy público.

PR #388 base main, ownhead af42616736b1850d7549073d89cd5500dbe13880, árvore2e68d37bf946c6ce0e4127312f56e42f444611e3, pai738073540f7ff6f9156b704a95c7a5616643307e. CI38050976291/job114209868104 SUCCESS, todos passos;246mobile/73API/4Web/3CLI, catálogo HTTP PASS12:12:21.8176515Z e suporte12:12:23.0219396Z. 17arquivos remotos byte a byte iguais ao revisado, diff íntegro revisado. Own APK38050976276/job114209868114 build em execução; **não integrado** até próprio APK/smoke/upload/artefato e CI aprovados no headexato. GitHub mergeabletrue/unstable enquanto gate roda, não conflito demonstrado. Não retarget/merge criança antes do predecessor.

Pós #380 SHAe6c6554f9208d4243bc8f724fba4b8971d958a1d CI38048063306 SUCCESS/APK38048063298 tentativa2 SUCCESS, job114206339606, smoke2026-10-10T12:11:18.9692797Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false, ZIP11669487655 sha256:6547a7c85033dff12aa820e03aa6bfb835d61e76a3753649873bef126700df80. Build/smoke/upload/head/não-expiração conferidos; failure1diagnóstico11668792675 preservado, único retry recuperou infra.
Pós #383 SHA0d492408860ef0575e59974bf33eee19912a03e0 CI38050190209 SUCCESS/APK38050190228 SUCCESS, job114207589083, smoke2026-10-10T12:13:17.6674126Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false, ZIP11669617653 sha256:fd853d7b937c59c98d44c329503edf61f1d444d99b94c391bec4d920b3f9d1ad. Jobs/smoke/upload/head/não-expiração conferidos.
Pós #384 CI38050194820 SUCCESS/APK38050194765 running. Pós375/376/377/378/379/380/381/382/383 técnicosCI/APKsuccess, com provas nos journals anteriores1206Z/1208Z/este;376/380/381 históricosfailure1mantidos, retries2já concluídos **não repetir**. Pós385CI38050198899 e386CI38050204302 SUCCESS, APK N/A por paths. Digests citados são ZIPs de artefato, não APK individual; nenhum deles fecha Visual Truth físico.

Correção editorial verificada 2026-10-10 12:16 UTC: a coluna Own head da tabela383–386 em v1.76 serializava um objeto como [object Object]. Agora contém o SHA textual comprovado no segundo pai do objeto Git de cada merge. Árvores/pais/gates/fatos históricos não mudaram; snapshots de arquivo CHECKPOINT_ANTES permanecem originais. Heads corretos: #383 a8c2c106068f311a64e6a303bae03d6d323df8e2; #384 d2146ef4a84a025567d52af7cb2b506462e29836; #385 dcda3bf76996f82b8c85c2bb2767581ef6d1d18b; #386 0ee492ee69e0e97ab501116181df4726495e62bf. Não foi repetido qualquer merge.

## Próxima ação concreta

Publicar fix/signup-response-deadline sobre head próprio388af42616736b1850d7549073d89cd5500dbe13880, árvore-base2e68d37bf946c6ce0e4127312f56e42f444611e3, PRbasefix/profile-availability-response-deadline. Consultar head/tree/CI/APK reais após publicação. Integrar388 quando own CI/APK/gates aplicáveis aprovados no SHAexato e diff/main/base/merge-base frescos; verificar pais/árvore/main/pós. Só então retarget este filho main; se mergeable eventualfalse, reconsultar antes de declarar conflito; se real, reconciliar ancestral sem sobrescrever mudanças e revalidar novos gates. Não repetir merges antigos/retries concluídos.

A próxima falha independente foi demonstrada em fontes reais auditadas: Agenda e EmpresaInicio fazem final auth/foco após HTTP/JSON, mas não conferem prazo abortado antes de publicar dados prontos/ACK de check-in/check-out/avaliação/preferido. Revalidar helpers e contratos atuais e corrigir somente confirmação/carga de resposta expirada com testes efetivos, preservando tenant por trabalho, transições/enforcement/backend, geolocalização opcional, sem reenvio ou operações reais. Signout permanece semântica própria de limpeza local condicional. Presença de backend/ausência de issues não prova escopo completo.

Visual Truth desenho original/dados/estados/cobertura integral físico OPEN. Piloto/device, pentest independente, providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Sem contas reais/mensagens/suporte/assignments/PSP/dinheiro, nova cobrança ou infraestrutura/deploy pago. Somente fixtures mocks/API local descartável. Bloqueio parcial/falha transitória/CIAPKrunning não encerra projeto; rotina existente permanece, sem criar outra ou alegar execução24h.

## Item atual — prazo e tentativa de cadastro

CriarConta verificava foco, mas não prazo ao confirmar resultado; signup é POST não idempotente. signupAccount passa a receber isCurrent opcional/padrão compatível, conferir antes do transporte e depois de HTTP/JSON, inclusive corpo de rejeição. HTTP/JSON tardio continua unknown, sem confirmação de criação, motivo de rejeição tardio ou reenvio automático.

A tela fornece guarda de geração/foco/prazo, revalida AbortSignal ao receber resultado e mantém a barreira contra outro POST depois da tentativa de envio. O marcador sent é ativado apenas quando o callback de transporte é chamado; blur durante validação local inválida (zero POST) não marca cadastro incerto. Após ACK válido ou rejeição válida recebidos em tempo, pending/unknown são liberados antes de navegação/cleanup. Resultado incerto depois de tentativa preserva orientação para conferir via login e impede novo cadastro automático/manual nessa instância. Blur continua limpar senha local; mudança não persiste senha/sessão nem ativa conta real.

Quatro regressões novas exercitam helper real (canceled antesPOST, HTTP tardio sem ler corpo, JSON tardio profissional/empresa, rejeição tardia). Cinco exercitam o código pré-JSX real da tela extraído do arquivo com hooks/roteador/timer/fetch simulados: deadline/JSON/blur pós-envio bloqueiam navegação e segundo POST; entrada inválida sem POST permite corrigir senha/refocus e cadastrar; ACK válido não se torna incerto no cleanup da navegação. É execução dos handlers reais, não React Native/renderização/aparelho físico. 255 testes mobile completos passaram UTC e America/Sao_Paulo (246da fatia anterior+9novos), além dos16 testes dedicados signup/helper+screen. JSX e StyleSheet iguais à base, sem mudança do desenho; React19.1.4/RN0.81.6/lockfile/API/tenant/RLS preservados. CI completo e APK próprio do novo SHA ainda obrigatórios.


## Retomada 2026-10-10 12:24 UTC — v1.79

# Checkpoint de execução autônoma — MLIVRETRABALHO

## Estado verificado

Snapshot 2026-10-10 12:24 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), árvore29ee4cadb0a41ef7c89b8c08452d17691a66eeb3. README/Documento vigente/memória/checkpoint/PRs/main/head/gates revalidados antes de agir. #387 pós-CI38050884981 SUCCESS/73API/238mobile/HTTP realfixture provado no journal1216Z; nenhum novo merge antes dos APKs próprios pendentes.

PR388 ownhead af42616736b1850d7549073d89cd5500dbe13880/tree2e68d37bf946c6ce0e4127312f56e42f444611e3/base main. OwnCI38050976291/job114209868104 SUCCESS/todos gates/246mobile73API4Web3CLI; ownAPK38050976276/job114209868114 buildpass, smoke **em execução**, não integrado.
PR389 ownhead71987cb7beebfba1f64a15a3dcbb6e00471fc6ea/tree66a2c6d64c39a10a0530fc927e582b743cfbf8e6/pai af42616736b1850d7549073d89cd5500dbe13880/basefix/profile-availability-response-deadline. OwnCI38051472605/job114211305932 SUCCESS todos passos,255mobile/73API/4Web/3CLI. HTTP catálogo/CRUD/isolation PASS2026-10-10T12:20:39.5007928Z e suporte PASS12:20:40.7203721Z. 16conteúdos remotos byte a byte iguais ao revisado e diff inteiro inalterado; ownAPK38051472614/job114211305922 build em execução, **não integrado**. Base só retarget main após388integrada.

Pós #384 SHA c033a300eb7e51b383a07240cc5ec4eb07900b40: CI38050194820 SUCCESS/APK38050194765 SUCCESS, job114207602549, smoke2026-10-10T12:16:06.1339324Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; ZIP11669785343 sha256:2e088c25edba0b624ac8dda10534e0b011140abf4864222b593d14f9deef0f17, head/não-expiração/job/smoke/upload conferidos. Pós375–384 CI/APK técnicos SUCCESS com provas nos journals anteriores1129Z/1145Z/1150Z/1206Z/1208Z/1216Z/este; históricos376/380/381failure1mantidos e retries2já recuperados, não repetir. Pós385/386/387 CI SUCCESS, APK N/A paths com mobile inalterado para essas fatias API/CI/docs. Digests são ZIPs, não hash individual do APK; nenhum fecha VisualTruth físico.

A correção editorial de own head v1.76 publicada em389 usa os SHAs reais dos segundos pais383–386; snapshots CHECKPOINT_ANTES originais preservados. Nenhum fato/gate/merge foi reescrito. Próprio SHA desta alteração é consultado depois de publicar, sem circularidade fictícia.

## Próxima ação concreta e retomada

Publicar fix/agenda-company-response-deadline sobre ownhead38971987cb7beebfba1f64a15a3dcbb6e00471fc6ea/tree-base66a2c6d64c39a10a0530fc927e582b743cfbf8e6, PRbasefix/signup-response-deadline. Consultar PR/head/tree/gates reais. Integrar388/389/este filho em ordem com próprio CI/APK/smoke/artefato aprovados no SHAexato, diff remoto integral revisto, fresh main/base/merge-base, expectedhead. Retarget só após predecessor; mergeable eventualfalse exige reconsulta e eventual conflito real exige reconciliação ancestral+novosgates, sem sobrescrever predecessores. Pós-merge verificar árvore/pais/main e novosCI/APK; não repetir operações já confirmadas nem considerar running conclusão/bloqueio definitivo.

Próximo confronto seguro de dados/estados, após preservar esta fatia: loadAgenda/company-dashboard aceitam strings vazias de IDs e datas não interpretáveis como ready no schema atual. Ler contratos/controllers efetivos antes de decidir validação de referência e campos, provar caso malformed/nulo/real em testes e manter nomes/valores reais, optionalnulls e unknown-status sem inventar política/IDs UUID para catálogo TEXT. Auditoria deadline também conferiu conversa/pagamentos/candidatos/equipes/substituições/planejamento/casos-seguranca/trabalhos: guardas de origem e aborto já existem nos pontos finais lidos; não criar alterações por analogia ou repetir tarefas.

Visual Truth desenho original/dados/estados/cobertura integral em aparelho físico OPEN. Pentest independente, piloto/device, providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Sem operações de contas/dados/assignments/mensagens/PSP/dinheiro reais, nova cobrança ou infraestrutura/deploy pago; somente fixtures locais. Manter rotina existente até conclusão integral comprovada/ordem explícita. Bloqueio parcial/transiente/CIAPKrunning/fim de rodada não encerra projeto; não criar outra rotina nem alegar24h contínuo.

## Item atual — prazo em Agenda e Painel da empresa

Agenda/EmpresaInicio verificavam identidade/foco no retorno, mas podiam aplicar carga pronta ou confirmar check-in/check-out/start/complete/avaliação/preferido depois do prazo de15s. loadAgenda, submitAgendaAction, loadCompanyDashboard, rateCompletedAssignment e preferProfessional recebem guarda isCurrent opcional, padrão compatível. Conferem antes de transporte e após HTTP/JSON; writes expirados resultam unknown, reads error. Painel empresarial invalida o snapshot inteiro se expira enquanto a última seção resolve, mesmo se outras ficaram prontas antes; falha parcial em prazo continua preservar seções válidas como antes.

Telas passam geração/foco/prazo ao helper e rechecagem após a releitura final de auth/tenant, porque essa própria await pode ultrapassar prazo depois de ACK/schema legítimos. Sem confirmação tardia, refresh automático pós-ACK inválido ou contexto acionável pronto de snapshot vencido. Mensagens de incerteza/reconsulta existentes mantidas. Não altera backend/lifecycle, avaliação humana, rating score, idempotência, tenant por assignment, geolocalização opcional ou signout condicional. Nenhum check-in/avaliação real; só mocks.

Nove regressões novas de helpers reais cobrem zero requests expirados, HTTP tardio sem consumo de corpo, JSON tardio de lifecycle/rating/preferido e última seção de dashboard. Quatro executam handlers pré-JSX reais de Agenda/EmpresaInicio com hooks/fetch/auth/timer simulados: helper retorna resposta válida, releitura auth fica pendente, prazo aborta, auth resolve; não confirma write nem expõe read ready. Verificam tenant/cabeçalhos do transporte fixture e nenhum refresh/POST extra. A suíte mobile completa passou268/268 UTC e America/Sao_Paulo (255anteriores+13novos). JSX/StyleSheet das duas telas byte a byte iguais à base. Execução de handlers não equivale a React Native/renderização física. Typecheck/build e próprio CI/APK standalone ainda obrigatórios no novoSHA. React19.1.4/RN0.81.6/lockfile/API/RLS preservados.


## Continuação verificável — v1.80 / 2026-10-10 12:35UTC

Antes da correção, execução dos helpers reais da base390 aceitava como ready assignment com id vazio, tenantId válido e startsAt bad-date, e painel ativo com id/professionalId vazios. Contratos efetivos work-assignments.controller.ts e company-dashboard.controller.ts foram lidos: IDs/referências e título/nome reais são obrigatórios, timestamps são datas PostgreSQL ou null; não há autorização para inventar valores. loadAgenda e loadCompanyDashboard agora exigem strings não vazias nos campos obrigatórios e datas opcionais interpretáveis. Registros/arrays incompatíveis resultam error, nunca contexto acionável ready. Painel conserva falha por seção e seções válidas independentes enquanto vigente.

Não normaliza valores/IDs, impõe UUID/enum novo, ordem/duração temporal, política financeira ou limites arbitrários. IDs opacos não vazios e status futuro não vazio permanecem literais; assignmentState mantém ausência de ação para status desconhecido. Optionalnulls/ausência, contagens0, listas vazias, offsets de data e rating/pagamento existentes preservados. Guardas de prazo da390 permanecem. Sem alteração JSX/StyleSheet/backend/lifecycle/RLS/React19.1.4/RN0.81.6/lockfile.

Sete regressões novas (3Agenda+4Painel) exercitam referência/campo vazio, resposta estrutural inválida, datas inválidas e controles positivos opacos/futuros/null/offset. Suíte completa275/275 PASS em UTC e America/Sao_Paulo, incluindo handlers reais pré-JSX das fatias anteriores;268anteriores+7novas. Execução local de helpers/handlers não equivale a renderização RN/aparelho físico. Próprios CI/typecheck/build/export e APK/smoke/upload/artefato no novoSHA ainda obrigatórios antes de integrar. Apenas mocks, nenhum assignment/perfil/rating/operação real.

Snapshot 2026-10-10 12:35 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), árvore29ee4cadb0a41ef7c89b8c08452d17691a66eeb3. README→Documento vigente, memória e checkpoint foram relidos na main em12:13UTC; main/PRs/gates reconsultados em12:35UTC. Não repetir #351–#387 já integradas.

PR388 base main/head af42616736b1850d7549073d89cd5500dbe13880/tree2e68d37bf946c6ce0e4127312f56e42f444611e3: CI38050976291 SUCCESS/246mobile73API4Web3CLI. APK38050976276 tentativa1/job114209868114 buildPASS, smokeFAIL antes do script instalar/abrir app: boot confirmou1, ação do emulador executou shell input keyevent82, service input Broken pipe32/exit224 em2026-10-10T12:28:31.1764888Z. Sem DEVICE_SMOKE_OK, upload APK validado skipped. DiagnósticoZIP11669444402/digest sha256:4863fd6450d5217c52b9fcb7dc9c70e1a6a87efbb782984c48ddd3e532360fa4/headexato/não-expirado consultados; não equivale a prova do app. Um único retry do job solicitado e aceito em12:35UTC após ler o log inteiro; acompanhar tentativa2, não repetir automaticamente. Não integrar sem gates aprovados.

PR389 basefix/profile-availability-response-deadline/head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea/tree66a2c6d64c39a10a0530fc927e582b743cfbf8e6: CI38051472605 SUCCESS/255mobile73API4Web3CLI; APK38051472614 em execução. PR390 basefix/signup-response-deadline/head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/tree0bb6dd39f035d4b62d674841166485fcf027c4c0: CI38051941067/job114212662753 SUCCESS, todos passos typecheck/build/export/tests/migration/privacy/HTTP;268mobile73API4Web3CLI, catálogoHTTP PASS12:28:19.7488628Z e suportePASS12:28:20.9895905Z. APK38051941014 em execução. Nenhuma destas PRs integrada neste snapshot. Retarget só depois do predecessor.

Reconsulta histórica pós-merge em12:26UTC confirma workflow CI/APK completed/success nos SHAs exatos:351 e80e8948f5d1ad58eac4f9d59224e914a4b8d057 →38023431415/38023431441(tentativa1);352 507b046b3e337d535d1374da26600361838837b6 →38023533303/38023533358(tentativa1);353 9a06da504b8b4fbf1c51f39ab6870aa5f23c1a47 →38023554710/38023554678(tentativa2);354 3b7328473ac0108cd1a2af1e517163b42e932c00 →38023574425/38023574399(tentativa1);355 6f8bea84a8fbb61f91a3ef057b9b9c75b75caa85 →38023598557/38023598566(tentativa2). Esta reconsulta prova status/head dos workflows, não nova inspeção de aparelhos, logs/artefatos históricos. Não refazer merges/retries antigos. Pós375–384 CI/APK técnicos SUCCESS com logs/smoke/artefatos preservados nos journals; pós385/386/387CI SUCCESS e APK N/A por paths/mobiletree inalterada. #387 pósCI38050884981/73API238mobile provado no journal1216Z. Merge não significa deploy público.

Publicar fix/assignment-response-schema sobre ownhead39097bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/treebase0bb6dd39f035d4b62d674841166485fcf027c4c0, PRbasefix/agenda-company-response-deadline. SHA da própria alteração só existe após publicar; consultar commit/tree/PR/runs reais sem antecipar número ou gate. Rever diff completo e arquivos remotos byte a byte.

Acompanhar retry388 e APK389/390; integrar388→389→390→esta fatia em ordem somente com CI/APK/smoke/upload/artefato aprovados no SHAexato, freshmain/base/merge-base, expectedhead e diff sem perda dos predecessores. Retarget filho só após integrar pai. Em mergeablefalse eventual reconsultar; conflito real exige merge ancestral e novos testes/gates, sem sobrescrever. Pós-merge verificar main/pais/árvore e CI/APK reais; running não é conclusão nem bloqueio definitivo.

Próximo item independente a provar: PUT professional/profile lança Error genérico para displayName vazio e TypeError para tipos inválidos antes da query, podendo devolver500 em vez de400 e classificar rejeição conhecida como operação incerta. Ler contratos/controllers/Auth e fixture HTTP, preservar autenticação antes da validação, campos opcionais null/ausentes/string.trim sem limite novo; validar entrada e provar que rejeições não escrevem nem atravessam identidade em fixtures locais, sem perfis reais. Não tratar a hipótese como entregue até implementar/testar/gates.

Visual Truth desenho original/dados/estados/cobertura completa em aparelho físico OPEN. Pentest independente, piloto/device, providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Não dinheiro/PSP real/custos novos/deploy pago. Bloqueio parcial/transiente/fim de rodada não encerra projeto; rotina existente permanece até conclusão integral comprovada ou ordem explícita, sem outra rotina nem promessa24h.


## Continuação verificável — v1.81 / 2026-10-10 12:40UTC

PUT /professional-profile chamava trim em campos não validados e lançava Error genérico para displayName vazio. Execução do método real da base391 com auth/db simulados confirmou Error display_name_required para vazio e TypeError para displayName/homeCity numéricos, zero queries; isso não é BadRequestException e o tratamento padrão Nest classifica como falha de servidor. professionalProfileInput agora recebe unknown, exige objeto não array e nome string não vazio; opcionais homeCity/primaryRole são string/null/ausentes. Preserva trim, branco→null nos opcionais, identidade exclusivamente autenticada e query/retorno reais. Controller autentica primeiro e rejeita entrada inválida com BadRequestException('professional_profile_invalid')400 antes de qualquer escrita. Falha real do banco propaga, nunca é mascarada como validação.

Não acrescenta tamanho máximo arbitrário, enum de função, campo/propriedade de tenant, decisão de KYC ou mudança de schema/RLS. Campos extras não impõem id/identityId; mesma chave ON CONFLICT(identity_id), mesma fonte auth e GET. Validação rejeita tipos inválidos em vez de coerção.

8regressões novas:4helper e4controller (400/zeroquery,401antesdevalidar, identidade/trim/null/ACK, falhaDBpropagada). PASS8/8 local com transformação TypeScript e adaptador explícito de decorators/exceptions Nest; não é execução Nest completa nem HTTP/DB. Primeiras execuções do adaptador local falharam por escape de regex/export de stub e foram corrigidas, sem mudar expectativas/testes/produto; só a execução posterior8/8 é prova local. CI compila e executa os próprios testes com Nest real:81API esperado (73anteriores+8), confirmação só após run sucesso/log no próprioSHA. Novo fixture HTTP restrito a localhost e DB efêmero de CI cria2identidades, verifica400malformed/semcriaçãooualteração,401sem auth antes de validar, trim/null, atualização mesmoID e isolamento identidade; registrado no step HTTP do CI. bash -n PASS; HTTP local ainda não executado neste ambiente sem Nest/PostgreSQL instalados. Nenhum perfil/conta/dado real alterado.

Fatias apps/api/src + scriptHTTP + CI/docs apenas. APK próprio N/A pelo pathfilter efetivo standalone-pilot-apk.yml: nada em apps/mobile/**, build/smoke/workflowAPK/rootpackage/lockfile/workspace. Árvore mobile deve continuar byteidêntica à base391 e APK do predecessor391 continua obrigatório/pendente; N/A não é APK aprovado. React19.1.4/RN0.81.6/lockfile/backendtenant/RLS preservados.

Snapshot 2026-10-10 12:40 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76) permanece. Autoridade README→Documento/memória/checkpoint relida e main/PR391/gates/head/tree reconsultados. Sem repetir #351–#387, pós-merge e artefatos históricos preservados emjournalsanteriores.

PR388 head af42616736b1850d7549073d89cd5500dbe13880, base main, CI38050976291 SUCCESS; APK38050976276 tentativa2 em execução após único retry autorizado do job114209868114 por falha input Broken pipe/exit224 anterior à instalação/app; tentativa1diagnóstico11669444402/digest sha256:4863fd6450d5217c52b9fcb7dc9c70e1a6a87efbb782984c48ddd3e532360fa4 preservado no journal1235Z. Não repetir retry automaticamente nem aceitar build isolado.

PR389 head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea, basefix/profile-availability-response-deadline, CI38051472605 SUCCESS/255mobile73API; APK38051472614/job114211305922 smoke em execução. PR390 head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65, basefix/signup-response-deadline, CI38051941067 SUCCESS/268mobile73API; APK38051941014/job114212662952 smoke em execução. PR391 head d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/treeef8bc3221d354d4cd544453df5b59fec4132df38/pai97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/basefix/agenda-company-response-deadline. CI38052634310/job114214702463 SUCCESS todos passos/typecheck/build/export/tests/migration/privacy/HTTP,275mobile73API4Web3CLI; catálogoHTTP PASS2026-10-10T12:39:41.8817755Z, suportePASS12:39:43.1976088Z, ProductionTruth12:39:48.9216490Z. APK38052634388 em execução. Os13arquivos remotos391 conferidos byte a byte e diff produto íntegro revisto. Nenhuma dessas PRs integrada neste snapshot.

Esta alteração tem próprioSHA/PR/runs somente após publicar; não registrar número antecipado nem CI futuro aprovado. Main238mobile é distinta dos275do head391; próprio API81 da nova fatia só será confirmado no seu run.

Publicar fix/profile-input-validation sobre ownhead391d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/treeef8bc3221d354d4cd544453df5b59fec4132df38, basefix/assignment-response-schema. Verificar conteúdo/tree/diff/head e próprioCI/typecheck/build/testesAPI/Nest/HTTP local81esperado; APK N/A por paths/mobileidêntico. Atualizar evidência de gate real quando existir.

Integrar388→389→390→391→esta fatia em ordem após próprios gates aplicáveis aprovados no SHAexato; freshmain/base/mergebase, revisão íntegra, expectedhead. Retarget filho main só após predecessor. Eventualmergeablefalse reconsultar; conflito real reconcileancestral+novosgates sem perda. Verificar pósmerge main/pais/tree eCI/APK aplicáveis; nenhumrunning/bloqueioparcial/fimderodada encerra projeto.

Confrontar próximos requisitos/rotas/estados reais com desenho canônico e checkpoint, sem inventaratividade nem concluir por ausênciaPR/issue. VisualTruth físico original/dados/estados/cobertura completa OPEN; piloto/device/pentest/providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Não dinheiro/PSP real/cobranças/deployinfra paga. Rotina existente permanece até conclusão integral comprovada/ordemexpressa; sem nova rotina ou promessa24h.


## Correção de teste e gates — 2026-10-10 12:44UTC

PR392 foi publicada no head35abdc0e8919288b44da1302f720cdb3a0727558/tree4e03f90e1421cbce0842452e50ef380d40950b95. CI38052927578/job114215554076 FAIL no Typecheck por TS2532 em27:50/126: acesso direto h.calls[0] no teste novo sem noUncheckedIndexedAccess narrowing. Build/tests/HTTP ficaram skipped; não considerar81API aprovado. Corrigido teste com const call=h.calls[0];assert.ok(call) antes dos asserts de identidade/query, sem non-null assertion/coerção nem mudança de expectativa ou produto. Oito testes locais novamente PASS e bash-n PASS. Falha histórica preservada; novo commit exige próprioCI, não retry do SHA errado. Próximohead/tree são consultados após publicação. API-onlyAPK N/A e mobiletree01ebadd68b56c3239bde95db27a690a3cc0f6875 conferida igual à391.15conteúdos remotos do primeirohead byteidênticos; novohead/diff devem ser revalidados.

Own APK39038051941014/job114212662952 SUCCESS, smoke2026-10-10T12:41:29.7434409Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false. Upload ZIP11670101921/digest sha256:371e9ed0f8043b9edc6712cda08afa74c264a2779d40b3b483f04ba268633bfa/head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/não-expirado/jobsteps conferidos. CI390 SUCCESS próprio, ainda não integrada por388/389predecessoras. APK388retry2/389/391 seguem em execução na última consulta. Não fecha VisualTruth físico nem autoriza merge de antecessor pendente.


## Continuação verificável — v1.82 / 2026-10-10 12:46UTC

Documento normativo v1.5§10 exige experiência/histórico verificável no Work Passport. Endpoint /work-passport/mine já devolve verifiedHistory global das memberships profissionais, ordenado no servidor e limitado aos50registros mais recentes. A área Experiência profissional de perfil.tsx mostrava somente completedWorkCount. Agora exibe os registros reais fornecidos: título, local quando existente e data de conclusão em pt-BR/no fuso do aparelho. Fonte única da API, sem fabricar empresa/função/horas/pagamento ou gerar entradas a partir da contagem. MesmosIDs de assignment em tenants distintos possuem keycomposta tenantId+id; IDs internos não aparecem na UI. Não há novas ações/mutações/rotas.

Tipo Passport passa a incluir verifiedHistory opcional para compatibilidade de respostas resumidas; quando presente exige array de registros com id/tenantId/título não vazios, localização string/null e data interpretável/null. Nome mostrado no passaporte também exige string não vazia. Dados inválidos resultam erro, não histórico pronto/vazio. Ausência do detalhe é estado unavailable explícito; lista vazia comprovada é empty, perfil inexistente missing, loading/erro existentes mantidos. Contagem global pode exceder o detalhe recente e continua literal; não reduzir nem inferir contagem0 a partir da lista. Datas/locais ausentes têm mensagens explícitas, sem valores inventados. Guardas foco/sessão/prazo das versões anteriores preservadas.

5novas regressões:2loadWorkPassport (malformed/dados multiempresa/opaque/null/offset preservados),3passportHistory/completionDate (todos estados, ordem/contagemsemexpansão, data local/ausência). Suite mobile completa280/280 PASSUTC e America/Sao_Paulo,275anteriores+5. StyleSheet/perfil byteidêntico; hierarquia do painel existente e barra canônica permanecem. Alteração de conteúdo precisa próprioCI/typecheck/build/export/APK/smoke no SHAexato e validação física. Referência original PNG foi relida visualmente nesta rodada: não cobre detalhamento dessa área extra; não inferir fechamento físico/fidelidade total. Nenhuma captura RN/aparelho foi obtida. Sem alterações backend/tenant/RLS/deps/React19.1.4/RN0.81.6/lockfile e sem perfil/assignment/rating reais.

Snapshot 2026-10-10 12:46UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76) revalidada; README/Documento vigente/memória/checkpoint do mesmoSHA já lidos. OpenPRs388–392 enumeradas, base/head/runs confrontados. Não repetir351–387merges nem retries históricos recuperados.

PR388 head af42616736b1850d7549073d89cd5500dbe13880/base main: CI38050976291 SUCCESS; APK38050976276 tentativa2/job114214397242 smoke em execução, buildPASS. Falha1input Broken pipe anterior aoapp/job114209868114/diagnóstico11669444402 e único retry permanecem no journal1235Z. PR389 head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea/basefix/profile-availability-response-deadline: CI38051472605 SUCCESS, ownAPK38051472614/job114211305922 SUCCESS todos passos, smoke2026-10-10T12:43:49.3543960Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false. Upload ZIP11670726043/digest sha256:e900ee4c656428fca988278e291782482a2e00b5e50dedcfae8308f8d05ddcc3/headexato/não-expiração/jobsteps conferidos. PR390 head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/basefix/signup-response-deadline: ownCI38051941067 eAPK38051941014 SUCCESS, smoke/upload/artefato11670101921 provados no journal1240Z. PR391 head d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/basefix/agenda-company-response-deadline: CI38052634310 SUCCESS275mobile73API, APK38052634388 em execução. Nenhuma dessas PRs integrada até este snapshot;388precede a cadeia, não aceitar gate de outroSHA.

PR392 basefix/assignment-response-schema: primeiro head35abdc0e8919288b44da1302f720cdb3a0727558 CI38052927578 FAILTS2532 histórico. Correção estrita guardando call no teste publicada no head35119ff2da17f3b71876ebd48f3f93cf9a5a1ed8/treebaf1d92ab9185e6b34eae0dffb9540f97e8791c0/pai35abdc0e8919288b44da1302f720cdb3a0727558. OwnCI38053028411/job114215844372 SUCCESS todos passos,81API275mobile4Web3CLI; novoHTTP perfil/Nest/DB local PASS2026-10-10T12:45:27.3421765Z (400semwrites/authprimeiro/trim/null/isolamento), catálogo12:45:27.8413178Z, suporte12:45:28.6822392Z, ProductionTruth12:45:32.5587659Z. APK próprio N/A por paths e árvore mobile01ebadd68b56c3239bde95db27a690a3cc0f6875 idêntica à391; não equivale aoAPKpendente391. Novohead392 exige nova conferência remota de arquivos/diff antes do merge. Nenhummerge/deploy público presumido.

Publicar fix/passport-verified-history sobre ownhead39235119ff2da17f3b71876ebd48f3f93cf9a5a1ed8/treebaf1d92ab9185e6b34eae0dffb9540f97e8791c0, PRbasefix/profile-input-validation. Consultar próprioSHA/tree/PR/runs após publicar,280mobile81API esperado só confirmado quando próprioCI/gates reais. Revisar diff/bytes remotos.

Acompanhar retry388/APK391 e deste filho; integrar388→389→390→391→392→esta fatia em ordem com CI/APK aplicáveis no SHAexato e artefato/smoke válidos. Retargetmain só após predecessor; freshmain/base/mergebase/diff/expectedhead. Eventualmergeablefalse reconsultar; conflito real reconcileancestral+novosgates sem perda. Verificar pósmerge main/pais/tree eCI/APK aplicáveis; running não conclusão/bloqueiodefinitivo.

Próximo confronto seguro: carregar dados reais da home com schema robusto/estados corretos. Fonteprofessional-home.ts aceita IDs/títulos/status vazios e datas malformed como ready; home-cards.ts usa a mesma permissividade nas oportunidades. Revalidar contracts/actualprofessional-inicio guards antes de corrigir, mantendo optionalnulls/statusfuturos/contagens0/falhaindependente e sem inventar horários/distâncias/disponibilidade. Não criar atividade por analogia onde guarda efetiva já existe.

VisualTruth físico original/dados/estados/cobertura completa OPEN; piloto/device/pentest/providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Sem dinheiro/PSP real/custos/deployinfra paga. Rotina existente permanece até conclusão integral provada ou ordem explícita, sem nova rotina/promessa24h; bloqueio parcial/transiente/fim de rodada não interrompe projeto.


## Continuação verificável — v1.83 / 2026-10-10 12:49UTC

profissional-inicio.tsx já consome APIs reais, usa runForSession com foco/deadline/identidade e oferece loading/erro/retry/vazio. Auditoria do código confirmou estas guardas finais; não refazê-las por analogia. Porém professional-home.ts aceitava IDs/títulos/status vazios, timestamps ilegíveis em assignments/earnings e disponibilidade invertida/igual como ready. Cálculos filtravam essas entradas e podiam mostrar0trabalhos/ganhos ou pedir cadastro de disponibilidade em vez de erro factual. home-cards.ts também aceitava oportunidades com referência vazia/datas inválidas.

Helpers agora validam strings obrigatórias não vazias e datas interpretáveis antes de ready; earnings createdAt é obrigatório, optionalstartsAt/endsAt de assignment/oportunidade permanecem null/ausentes. Disponibilidade exige duas datas interpretáveis e ends>starts, a mesma regra efetiva já usada por availability.controller.ts; não cria regra nova. Nome fornecido não pode ser branco/tipo inválido; ausência/null legados continuam compatíveis e nome válido é preservado literal. Falha permanece por seção, resultados válidos independentes preservados. Zero/listas vazias legítimas, IDs opacos, status futuros não vazios, centavos assinados existentes e optionalnulls/offsets permanecem sem normalização. Não há enum, regra financeira, horário/local/distância/contagem inventada ou alteração da UI/StyleSheet/backend/tenant/RLS/deps/React19.1.4/RN0.81.6/lockfile.

6regressões novas no fluxo real dos loaders (5home+1cards) comprovam malformedassignment não pronta/zero, earningsdate/status não zero, availability inválida não vazio, nome branco, controlepositivo real/opaque/future/null/offset/cents e sucesso parcial Passport/opportunity. Suíte mobile completa286/286 PASSUTC e America/Sao_Paulo;280anteriores+6novas. Campos/calculadores válidos existentes sem mudança. CI/typecheck/build/export e APK standalone/smoke/artefato próprios ainda obrigatórios no novoSHA; prova local não é renderização física.

Snapshot 2026-10-10 12:49UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76), código/contratos atuais auditados no head393; README/Documento vigente/memória/checkpoint já lidos no mesmoSHA main. #351–#387 integradas/histórico pós-merge preservado; não repetir operações antigas.

PR388 ownhead af42616736b1850d7549073d89cd5500dbe13880/base main/CI38050976291 SUCCESS; APK38050976276 tentativa2/job114214397242 smoke em execução/buildPASS. Falha1infra e único retry mantidos no journal1235Z. PR389 ownhead71987cb7beebfba1f64a15a3dcbb6e00471fc6ea/basefix/profile-availability-response-deadline: CI38051472605/APK38051472614 SUCCESS, smoke/artefato11670726043/head/digest conferidos no journal1246Z. PR390 ownhead97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/basefix/signup-response-deadline: CI38051941067/APK38051941014 SUCCESS, smoke/artefato11670101921 no journal1240Z. PR391 ownhead d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/basefix/agenda-company-response-deadline: CI38052634310 SUCCESS275mobile73API, APK38052634388 em execução. PR392 ownhead35119ff2da17f3b71876ebd48f3f93cf9a5a1ed8/basefix/assignment-response-schema: CI38053028411 SUCCESS81API275mobile/HTTPperfil PASS12:45:27.3421765Z; APK N/A mobiletreeidêntica39101ebadd68b56c3239bde95db27a690a3cc0f6875. Correção8conteúdos remotos conferidos byte a byte/diffintegral revisado; falhaTS2532nohead35ab... CI38052927578 histórica preservada, não retry.

PR393 ownhead27144fbfa6fb9e7ce114b831d0f668e110b8af2d/tree6225d322e06bd10eaa3cef80a5b5e942c3388bfc/pai35119ff2da17f3b71876ebd48f3f93cf9a5a1ed8/basefix/profile-input-validation: CI38053297959 eAPK38053298010 em execução.14arquivos remotos byte a byte iguais e diff produto integral revisado.280local é dohead393, main ainda238mobile/73API. Nenhuma dessas PRs integrada neste snapshot; não usar gate de descendente para predecessor pendente. Próprio head/PR/gates desta nova fatia serão consultados depois de publicar, sem gate/número/SHA futuro inventado.

Publicar fix/home-response-schema sobre ownhead39327144fbfa6fb9e7ce114b831d0f668e110b8af2d/tree6225d322e06bd10eaa3cef80a5b5e942c3388bfc, basefix/passport-verified-history. Consultar head/tree/PR/runs reais e diff/bytes remotos.286mobile/81API esperado só comprovado no próprioCI; APK/smoke/upload/artefato obrigatório.

Integrar388→389→390→391→392→393→esta fatia em ordem só com gates aplicáveis aprovados no SHAexato. Acompanhar APKs388retry2/391/393/novo. Retargetmain após paiintegrado, freshmain/base/merge-base/árvore/diff/expectedhead. Eventualmergeablefalse reconsultar; conflito real exige mergeancestral+novosgates sem perda. Verificar pós-merge main/pais/tree eCI/APK aplicáveis e registrar provas. Running não significa conclusão/bloqueiodefinitivo.

Próximo item de produto independente a inspecionar contra v1.5§22.1 e referência original: Ajuda e suporte permanece placeholder em Perfil, e a árvore mobile atual não possui tela suporte, embora SupportController ofereça criação/lista tenant-scoped e já tenha CIHTTP real. Ler contratos/Agenda e contexto de cadaassignment antes de desenhar entrada; preservar tenant/RLS, reporter, resposta incerta/sem retry duplicado e não prometer24/7. Sem usar IDs digitados, escolhas tenantdefault ou alterações/mensagens/dados reais. Preferências também permanece placeholder; confrontar requisitos/role/capabilities/career existentes antes de implementar ou declarar ausência de tarefa.

VisualTruth original/dados/estados/cobertura completa no aparelho físico OPEN. Pentest/piloto/device/providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Sem dinheiro/PSP/custos/deploypago. Rotina existente permanece até conclusão integral provada ou ordem explícita; sem outra rotina/promessa24h. Bloqueioparcial/transiente/fimderodada não encerra projeto.


## Continuação verificável — v1.84 / 2026-10-10 12:57UTC

Durante o confronto da home com contratos reais, AvailabilityController.add recebeu body tipado em TypeScript sem validação de tipo runtime. Execução do método real com auth/db simulados provou body null→TypeError zeroqueries, e startsAt42/endsAt43→parâmetros numéricos encaminhados ao INSERT após Date coerção epoch. Essa entrada não satisfaz o contrato timestamps string e pode resultar falha de banco, jamais disponibilidade factual.

availabilityInput recebe unknown, exige objeto não array e duas strings de datas interpretáveis com ends>starts. Preserva valores/offsets originais; sem formato/limite novo nem regra future-only/duração imposta. Controller autentica antes de validar e responde BadRequestException('availability_range_invalid')400 antes de consultar perfil ou escrever. Perfil inexistente conserva professional_profile_required400; fonte identity→profile exclusiva da sessão, INSERT ON CONFLICT(professional_id,starts_at,ends_at) idempotente e GET/network-shared existentes inalterados. Bodyextra professionalId/tenantId ignorado, não sobrescreve contexto.

7novas regressões (4helper+3controller) PASS7/7local via adaptador explícito TypeScript/decorators/exceptions Nest; controller verifica400semquery,401primeiro, binding/timestamps/ACK/ONCONFLICT e perfil ausente. Não é Nest/DB completo local. Novo fixture HTTP sólocalhost/DBefêmeroCI cria2identidades/perfis, verifica null/array/tipos/datas/range invalidos400semjanelas,401primeiro, criação com valoresreais, segunda criação mesmointervalo retorna mesmoid e outraidentidade não vê janela. bash-nPASS; HTTP/Nest/DB próprios pendentesCI. Próprio88API esperado (81anteriores+7), só confirmado após run/log sucesso no próprioSHA. Nenhum dado/perfil/disponibilidade real alterado.

Mudança API/helper/tests/scriptHTTP/CI/docs apenas. APK próprio N/A pelos paths do workflow e mobiletree deve permanecer idêntica à394; não isenta APK394 nem implica APK aprovado deste código mobile herdado. React19.1.4/RN0.81.6/lockfile/tenant/RLS preservados.

Snapshot 2026-10-10 12:57UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76) na última leitura, openPRs388–394 e próprioshead/gates atuais consultados. README/Documento vigente/memória/checkpoint do mesmoSHA main já lidos. Nenhum merge dessas fatias presumido;351–387 integradas, não repetir.

PR388 head af42616736b1850d7549073d89cd5500dbe13880/base main: CI38050976291 SUCCESS; APK38050976276 tentativa2/job114214397242 smoke em execução/buildPASS. Único retry/failure1infra/diagnóstico11669444402 preservados. PR389 head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea: CI38051472605/APK38051472614 SUCCESS comprovados journal1246Z. PR390 head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65: CI38051941067/APK38051941014 SUCCESS comprovados journal1240Z. PR391 head d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/basefix/agenda-company-response-deadline: CI38052634310 SUCCESS275mobile73API; APK38052634388/job114214702747 SUCCESStodossteps, smoke2026-10-10T12:56:48.0086495Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false. Upload ZIP11670128045/digest sha256:4b74abf0e0d38a83bb0bb97c1d19ec67250cd500f7746ba658df99792e64327e/headexato/não-expirado/job/smoke conferidos.

PR392 head35119ff2da17f3b71876ebd48f3f93cf9a5a1ed8: CI38053028411 SUCCESS81API275mobile/HTTPperfil PASS; APK N/Apaths/mobileigual391; failureTS2532primeirohead35ab... preservada. PR393 head27144fbfa6fb9e7ce114b831d0f668e110b8af2d/basefix/profile-input-validation: CI38053297959/job114216620344 SUCCESS todos passos/280mobile81API4Web3CLI, HTTPperfil12:50:13.1965235Z/ProductionTruth12:50:20.0086110Z; APK38053298010 em execução. PR394 head6ea665db2c88e878a6fa967d6b2188a3f0b246da/treefe5dd9dd1cd2a108809348d9645f2486efafd375/pai27144fbfa6fb9e7ce114b831d0f668e110b8af2d/basefix/passport-verified-history: CI38053532122/job114217293216 SUCCESS todos passos/286mobile81API4Web3CLI, HTTPperfil12:54:08.2313050Z/ProductionTruth12:54:15.6382306Z; APK38053532125 em execução.13conteúdos394 byte a byte iguais ao revisto, diff produto integral revisado. Main continua238mobile/73API neste snapshot.

Issues215/219/220/224/228 continuam abertas com gates específicos: provider comercial/sandbox, pentest/aparelho físico/distribuição, aceitaçãoWeb. Ausência dePR não prova conclusão e esses gates externos não impedem as correções independentes atuais. Dados próprios desta novafatiasódepoispublicar.

Reconsulta histórica pós-merge351–355 em12:54UTC: CI/jobsteps SUCCESS nos SHAs exatos e APK/jobsteps/artifactheads/digests/não-expiração conferidos. Logs mostram instalação Success, PID/script e markerobservado, não apenas echo do comando; workflows antigos usam gate legado anterior ao endurecimento375, e estes logs não equivalem a novo teste com script atual nem cobertura física.
|PR|SHAmerge|CI/job|APK/job|Smoke observadoUTC|ZIP/digestsha256|
|---|---|---|---|---|---|
|351|e80e8948f5d1ad58eac4f9d59224e914a4b8d057|38023431415/114129121666|38023431441/114129121945|04:30:51.3146792|11659572193/0d611e53be073b097d417d5d70a98f021223d75d3ce2a64a4312edc4e8413619|
|352|507b046b3e337d535d1374da26600361838837b6|38023533303/114129433215|38023533358/114129433663|04:32:10.0793530|11659386713/e31a2799cb5313f80a1feaf7be66bbe1ac9581f26629a1503d0fb01211244251|
|353|9a06da504b8b4fbf1c51f39ab6870aa5f23c1a47|38023554710/114129497907|38023554678attempt2/114150020296|06:41:54.0917019|11662710348/ac906249b4c3b4ca034699420500bd98202019d4b0b14a938eb5d13308834c5b|
|354|3b7328473ac0108cd1a2af1e517163b42e932c00|38023574425/114129559271|38023574399/114129559267|04:40:36.0348540|11659057552/a812eeba3844095d96ba607d015d51bf418a06df6a4977ffef9b5645b63d7c64|
|355|6f8bea84a8fbb61f91a3ef057b9b9c75b75caa85|38023598557/114129633716|38023598566attempt2/114149969814|06:31:17.8143751|11661758941/8230509f7451e9308e47b0546d92c101756e67366ebf2bf5539fcf8b84f2187b|

Digests ZIP, não APK individual. Não refazer antigosmerges/retries históricos; revalidar o produto integrado com gates atuais e manter VisualTruth aberto.

Publicar fix/availability-input-validation sobre ownhead3946ea665db2c88e878a6fa967d6b2188a3f0b246da/treefe5dd9dd1cd2a108809348d9645f2486efafd375, PRbasefix/home-response-schema. Consultar próprioSHA/tree/PR/runs depois de publicar; revisar diff e arquivos remotos, mobiletreeidêntica394 e próprioCI88API/286mobileesperado/HTTPfixture real aprovado. N/A APK específico por paths, semdispensar APK predecessor.

Integrar388→389→390→391→392→393→394→esta fatia em ordem após própriosgatesaplicáveis no SHAexato; freshmain/base/mergebase/árvore/diff/expectedhead. Acompanhar retry388/APK393/394. Retargetmain só após pai; mergeableeventualfalse reconsultar; conflito real reconcileancestral+novosgates sem perda. Verificar pósmerge tree/pais/main eCI/APK aplicáveis, registrar provas contemporâneas emcheckpoint; running não conclusão/bloqueiodefinitivo.

Próxima capacidade de produto a tratar continua Ajuda e suporte: placeholder Perfil/ausênciatela mobile, endpoints supportcases tenant/reporter existentes. Reconsultar requisitosv1.5§22.1/referência original/Agenda/SupportController, desenhar seleção humana de assignment real sem tenantdefault/UUIDdigitado, loading/erro/vazio e resultado incerto sem criação duplicada; não prometer24/7. Não executar chamados reais nem mensagens a terceiros. Preferências também pendente de confronto com role/capabilities/career existentes. Não declarar integralidade estática ou ausência de alternativas.

VisualTruth desenho original/dados/estados/cobertura completa emaparelho físico OPEN; piloto/device/pentest/providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Sem dinheiro/PSP/custos/deployinfra paga; rotina existente mantida até conclusão integral comprovada/ordem explícita, sem nova rotina nem promessa24h. Bloqueio parcial/transiente/fimderodada não encerra projeto.


## Continuação verificável —v1.85 /2026-10-10 17:17UTC

Snapshot2026-10-10 17:17UTC: main9ed1859... v1.84 revalidada, README/Documento/memória/checkpoint lidos. PRs388–395 integradas e CI pós-merge de todas SUCCESS; APK pós389–391/393/394 SUCCESS comsmoke/artefato, pós388falhainfra/únicoretry solicitado. Prova detalhada docs/evidencias/INTEGRACAO_388_395_2026-10-10_1717Z.md. Não repetir integrações.

O suporte exigido na v1.5§22.1 ainda era placeholder em Perfil > Ajuda e suporte. Esta fatia implementa consulta de solicitações existentes vinculadas a um trabalho real, no painel existente, sem nova rota ou alterar navegação canônica.

Seleção humana da lista /assignments/mine autenticada. GET /support-cases/mine recebe Authorization da mesma identidade e x-tenant-id do assignment escolhido; sem tenant default, UUID digitado ou mudar sessão persistida. Backend existente exige membership/RLS e reporter_identity_id. Valida toda resposta e filtra assignmentId exato; IDs iguais em empresas distintas permanecem separados.

Loading, erro auth/rede/HTTP/JSON/schema, trabalhos vazios, ausência de chamados só após resposta válida, status/descrição/data/resolução reais em ordem. Datas pt-BR no fuso do aparelho. Status futuro não vazio literal. Sem criar dados, canais, telefone ou promessa24/7. Retry somente GET; nenhuma mutação/chamado real/mensagem a terceiro.

Guardas de foco/geração/seqrequest/prazo15s/AbortController e auth antes/depois de HTTP/JSON/finalauth. Mudança identidade limpa escolhas/casos, blur/unmount descarta contexto; resposta atrasada de outra seleção não sobrescreve a atual. Nenhum endpoint administrativo acessado.

12 regressões novas:5helper(schema completo/filtro/ordem/notas/vazio/falhaHTTP-offline-JSON/deadline/futurosvalores) e7handlers reais pré-JSX(seleção humana/tenant/GET/injetada rejeitada, mesmoidduasempresas/resposta atrasada, sessãotrocada, deadlineauthfinal, blur/refocus, deadlineauthinicial, lista invalidada porauthfinal). Completa298/298 PASSUTC e America/Sao_Paulo; harness comhooks/auth/fetch/timers explícitos não é render RN. 286anteriores+12. NovoCI deve provar TS/TSX/typecheck/build/export/298mobile/88API; próprioAPKstandalone/smoke/upload/artefato obrigatório, ainda pendente antes da publicação.

Limite de escopo: apenas consulta vinculada; envio de novo chamado ainda indisponível e UI informa isso. Casos semassignment ou fora da lista e entrada contextual no dia do trabalho pendentes. API de criação semidempotência não autoriza duplicar envio após resultado incerto. Suporte integral e Preferências não concluídos.

StyleSheet do Perfil byteidêntico; painel/fourareas/bottomnav foraScrollView mantidos. PNG original relido antes e depois nesta sessão; não detalha esse painel nem prova24/7. Sem render/captura física RN. React19.1.4/RN0.81.6/lockfile/backend/schema/tenant/RLS inalterados. VisualTruth original/dados/estados/cobertura física OPEN.

Publicar fix/professional-support-history a partir da main9ed1859ee28b1ba50e84bda0d4357d22760a59f3/tree0b145254562a386f00b0aa7cefb75b4fb1a6012a. Consultar própriohead/tree/PR/runs após publicar, rever15arquivos remotos/diff íntegro. CI/typecheck/build/export/298mobile/88API e APK/smoke/artefato do próprioSHA exigidos; merge só comfreshmain/base/mergebase/expectedhead, depois conferir pais/árvore/main/pósCI/APK. Nada de número/head/gate futuro inventado.

Acompanhar único retry pós388 run38054154641 pedido17:17UTC; CI e demaisAPKs pós388–395 registrados na evidência de integração. Running não conclusão/bloqueio definitivo. Registrar novo resultado sem alterar snapshots históricos e sem repetir merges.

Próxima tarefa segura independente: idempotência de criação de suporte por tenant/reporter/intent, confrontando migrations/SupportController/contracts. Provar retries/concorrência/payloadconflitante em fixtures locais/CI; depois UI de enviohumano comdraft preservado e resultado incerto, sem chamados reais. Preferências é alternativa após confrontar requisitos/roles/capabilities/career reais. Não inventar tarefas nem declarar completo pelaausênciaPR.

VisualTruth físico, piloto/device/distribuição/pentest, providers/TRUST/PSP/FIN-RISK/WEB-ARCH permanecem separados OPEN. Sem dinheiro/PSP/custos/cobranças/deploy pago. Manter rotina até integralidade comprovada/ordem explícita; bloqueio parcial/transiente/fimderodada não encerra projeto, sem outra rotina/promessa24h.


## Correção de typecheck — 2026-10-10 17:24UTC

PR396 publicada no headbe08d499f4ac4c199e8f57bdf6afc151b4d935ed/treea28afa107f7d64e6e439f86bdb0275aa1d5d2c8a. CI38071227829/job114268875794 FAIL no Typecheck: TS18048 work.data possivelmente undefined no JSX, devido Section unir loading|error no mesmo membro. Build/export/tests/HTTP ficaram skipped; não tratar CI aprovado. Corrigida projeção const items=work.status==='ready'?work.data:[] para render da lista, mantendo mensagens loading/erro e ausência apenas na ramificação legítima. Sem non-null assertion, coerção, relaxamento TS, alteração de testes/expectativas/estados, dependências ou API. Própriohead/CI/APK novos exigidos após publicar; APK38071227890 do primeirohead não autoriza merge do corrigido. Testes locais298mobile continuam válidos após nova execução; compilação completa requer CI real.


## Continuação verificável —v1.86 /2026-10-10 17:26UTC

Snapshot2026-10-10 17:26UTC: main9ed1859ee28b1ba50e84bda0d4357d22760a59f3/v1.84 permanece;README→Documento/memória/checkpoint consultados. PR396base main/head26b3fb2365200415366e12da76710a0ad629725b/tree87ac6719b538d92a2b1843e9954cee80de0aece4, próprioCI38071421868/job114269432957SUCCESStodossteps/298mobile88API4Web3CLI. PróprioAPK38071421849 em execução; primeiroheadbe08.../CI38071227829TS18048FAILpreservado, corrigido readyprojection semafrouxartestes/TS.15conteúdos remotos corrigidos396byteidênticos e patch íntegro revisado.396nãointegrada até snapshot.

388–395jáintegradas, CI pós de todas e APKpós389–391/393/394SUCCESScomjobs/smoke/artefatos/digests no journal1717Z/v1.85. Pós388run38054154641tentativa1infraBrokenpipe32/exit224antesapp, diagnósticoZIP11671065789/digest78996502e4e43543f065ec334594068669c0dc7a7acc523b33aa780681f250bd. Único retry do job114219065904pedido17:17:11UTC, tentativa2emexecução; não repetir. Pré-merge388retryhistórico recuperado é distinto, não refazer. Não repetirmerges351–395.

## Suporte — idempotência opcional de criação

A próxima etapa é enviar suporte sem criar chamados duplicados quando a resposta é perdida. POST /support-cases criava uma nova linha a cada tentativa; API agora aceita cabeçalho opcional idempotency-key UUID. Sem cabeçalho preserva contrato legado; não alegar idempotência de clientes legados. UUID normaliza apenas caixa; chave explícita inválida é400 support_request_key_invalid. Auth e membership continuam antes de validação/transação.

Escopo de intent: tenant_id + reporter_identity_id autenticado + request_key; mesma UUID em outro tenant/reporter é independente. Hash SHA-256 de tupla JSON do input normalizado (assignmentUUID lowercase/null,category,descriptiontrim,prioritydefaultnormal) guarda conteúdo original sem duplicar descrição em outra tabela. Campos extras de identidade/tenant não contribuem nem sobrescrevem auth. Hash/key não aparecem no ACK/GET, permanecem na mesma linha/RLS e lifecycle/retention do caso; não são credenciais, não há endpoint externo ou dados a terceiros.

Replays da mesma chave/payload retornam ACK do caso atual(id/category/priority/status/createdAt), preservando revisão humana/resolução, sem novoINSERT/UPDATE. Chave com payload diferente retorna409 support_request_key_conflict e não altera linha. Procura caso existente no tenant/reporter antes de verificar assignment para preservar intent mesmo se FK depois vira null; novo caso continua verificando assignment real no tenant. INSERT ON CONFLICT da chave composta DO NOTHING e segundoSELECT tratam primeiro uso concorrente; não sobrescrever payload e não compensar erro com nova chave/caso. FalhaDB ou conflito sem linha recuperável continua erro/resultado não confirmado.

Migration0062 aditiva: request_key UUIDnullable, request_payload_hash nullabletext com check de par/64hex, índice único parcial tenant/reporter/key, trigger impede mudar key/hash emUPDATE. Linhas legadas null/null permanecem. Não altera0060nempolíticas/grants/roles/forceRLS, não habilita bypass. Mudanças legítimas status/nota e assignmentFKnull continuam permitidas; dados/key/hash seguem mesma linha e retenção. Nenhuma migration executada em produção.

10regressões novas(3helper+7controller): chave opcional/inválida/caixa, digestinputnormalizado/campos/tup semalias, authprimeiro/400semtransação, bindingtenant/reporter/hash, replaysemwrite/revisãoatual, conflito409, perdedor concorrente/semUPDATE, missingreplaysemACK/falhaDBpropaga, unlinkedlegítimo. PASS18/18local:8anteriores suporte+10novas via adaptador explícito TypeScript/Neststub; não é Nest/PostgreSQL completo. Novo98API esperado (88+10) só confirmado comCI real.

FixtureHTTPjáexistente expandido somente localhost+databaseefêmeraCI, bash-nPASS: replaysequencial/8primeirousosconcorrentes→mesmoid/uma linha, conflito409semwrite, mesmaUUIDemoutraidentidade/tenantindependente, auth/membership401anteskey, revisão preservada, key/hashimutáveis e parincompleto recusado emSQL, FKassignmentnull não perde intent. Mantém todos controles cross-tenant/assignment/reporter anteriores sem enfraquecer. CI passa DATABASE_URL local HTTPfixture; migrationsrunnerduasexecuções jágateia schema. Nest/SQL/HTTP próprios ainda pendentes apóspublicar.

API/helper/tests/migration/fixtureCI/docs apenas. APK próprioN/Aporpathfilterstandalone-pilot-apk.yml efetivo; árvoremobile deve ser byteidêntica ao corrected396. APK396continua obrigatório, N/Anãoaprova predecessor. React19.1.4/RN0.81.6/lockfile/UI/canônico/RLS preservados. Não envia chamado real nem habilita envio móvel, PSP/dinheiro/custos/deploy pago.

## Próxima ação concreta

Publicar fix/support-intent-idempotency sobre ownhead39626b3fb2365200415366e12da76710a0ad629725b/tree87ac6719b538d92a2b1843e9954cee80de0aece4, PRbasefix/professional-support-history. Conferir SHA/tree/PR/runs/diff/bytes remotos e mobiletreeidêntica após publicar; não antecipar número ou gate. PróprioCI/typecheck/build/Nest98API/298mobile/migrationdupla/SQLguards/HTTPconcorrência obrigatório. N/AAPK específico sóapósconferirpaths/árvore, semdispensarAPK396.

Acompanhar único retrypós388 e ownAPK396; integrar396primeiro sóapósCI/APK/smoke/artefato noSHAexato. Retarget deste filho para main sóapós396integrada; eventualmergeableunknownfalse reconsultar, conflitorealreconciliarancestral e revalidargatessemoverwrite. Revisãofresca/expectedhead; verificar pósmergepais/tree/main eCI/APK aplicáveis. Persistir gate real semalterarsnapshotsantigos.

Próximo produto: envio humano de suporte no contexto do trabalho com intent estável, draftpreservado e resultadoincerto seguro. Mobile não possui geradorUUIDcriptográfico disponível nas dependências atuais: confrontar API/emissão deintent ou dependência correta antes de implementar, sem Math.random, mudar React/RN/lockfile sem reprodução, tenantdefault ou chave manual. Intent de criação não é credencial; não executar chamados reais. Casos gerais/contextodiadotrabalho e Preferências permanecem pendentes de requisitos/APIs reais.

VisualTruth físico original/dados/estados/cobertura completa, piloto/device/pentest/distribuição, providers/TRUST/PSP/FIN-RISK/WEB-ARCH separadosOPEN. Não declarar suporte/projeto completo por fatia/CI/PRausente. Bloqueioparcial/transiente/fimderodada não encerra projeto; manterrotinaatéconclusãointegralcomprovada/ordemexpressa, semnova rotina/promessa24h.


## Continuidade — 2026-10-10 17:33 UTC

Verificação de 2026-10-10, 17:33 UTC: main permanece em 9ed1859ee28b1ba50e84bda0d4357d22760a59f3 (v1.84).
PR #396: head 26b3fb2365200415366e12da76710a0ad629725b, tree 87ac6719b538d92a2b1843e9954cee80de0aece4, base main. CI 38071421868 / job 114269432957 aprovado (298 mobile, 88 API, 4 web, 3 CLI). APK próprio 38071421849 / job 114269432897 ainda executa o teste de instalação e abertura sem Metro; não integrado.
PR #397: head be12cb6905234a081472971a8e37e5cbdc98d9cf, tree d57bfbb2cfb11ace871e0c3ef4c9a41ac6088763, base fix/professional-support-history. CI 38071852247 / job 114270695562 aprovado em todos os passos: 298 mobile, 98 API, 4 web, 3 CLI, migrations e HTTP/PostgreSQL, inclusive oito primeiros envios concorrentes, conflito de payload e guards SQL. APK próprio não aplicável: paths e árvore mobile 163de7d27fe6b49fb11d87ed9a9da2bf8b9e47e7 idênticos à #396; isso não dispensa o APK do predecessor.
388–395 já integradas; não repetir merges. Retry controlado único do APK pós-merge #388, run 38054154641, tentativa 2 / job 114268524350, ainda em teste de dispositivo. Retry pedido em 17:17:11 UTC após falha de infraestrutura anterior à instalação; não solicitar nova repetição automática. Evidências dos outros pós-merges e dos gates históricos estão no registro 1717Z/v1.85.

## Preparação segura da tentativa de suporte

O envio móvel precisa de uma chave UUID criptográfica estável. As dependências atuais do aplicativo não incluem um gerador nativo adequado; usar Math.random ou uma chave digitada pelo usuário não atende ao contrato. Esta etapa acrescenta POST /support-cases/intent na API, com randomUUID de node:crypto.

A rota autentica, exige tenant e membership, valida o mesmo supportCaseInput da criação e, quando há assignmentId, consulta o trabalho real no tenant/RLS. Só então retorna requestKey (UUID v4) e reporterIdentityId da identidade autenticada. Campos de identidade enviados pelo cliente são ignorados. A resposta não contém token, descrição, dados de outro reporter, hash ou chamado.

Preparar a chave não insere, altera ou exclui registros; uma solicitação geral válida não precisa acessar o banco. Não reserva atendimento, não promete prazo e não confirma criação de chamado. Perder uma resposta de preparação permite preparar outra chave enquanto nenhum envio de chamado foi tentado. A chave não é credencial nem autorização: POST /support-cases continua autenticando, exigindo membership e validando seu próprio payload. Não há storage novo, alteração de RLS/grants, migration ou chamada externa.

Depois que houver tentativa de criação, o cliente deverá preservar a mesma chave e o mesmo conteúdo até resultado confirmado, inclusive diante de timeout/reinício. Não pode trocar chave e repetir automaticamente um resultado incerto. Essa persistência e a interface de envio ainda não foram habilitadas por esta etapa.

## Validação

Sete testes novos de controller cobrem UUIDs criptográficos distintos, identidade autenticada, consulta limitada ao tenant e ausência de escrita; suporte geral sem banco; auth antes da validação; tenant/membership ausentes; payload inválido sem banco; assignment ausente/cross-tenant; falha real de banco sem ACK fabricado. PASS local 25/25 testes de suporte, usando adaptador explícito de TypeScript e exceções Nest; isso não equivale a teste real de Nest/PostgreSQL. O total API esperado passa de 98 para 105, a confirmar no CI do commit publicado.

Fixture HTTP existente, restrita a localhost e banco efêmero, cobre auth/membership/assignment, formato e unicidade das chaves, identidade comparada com GET /me e contagem de chamados zero após preparar várias chaves. A chave preparada é usada nos testes reais de criação/replay/conflito e oito primeiros envios concorrentes. Todas as regressões anteriores permanecem. bash -n aprovado; CI próprio ainda não iniciado antes da publicação.

Somente controller, testes API, fixture HTTP e documentos mudam. APK próprio não aplicável pelo filtro efetivo do workflow; verificar árvore mobile idêntica à #397 após publicar. CI completo, diff, bytes remotos, branch/base e SHA exato são obrigatórios antes de integrar. React 19.1.4, RN 0.81.6, lockfile, desenho e navegação permanecem preservados. Nenhuma operação em produção, chamado real, PSP, dinheiro real, nova cobrança ou infraestrutura paga foi habilitada.

## Próxima ação concreta

Publicar fix/support-intent-preparation sobre be12cb6905234a081472971a8e37e5cbdc98d9cf, com base fix/support-intent-idempotency. Reconsultar PR/SHA/runs, revisar patch e conferir todos os bytes publicados; não antecipar número ou aprovação. Esperar CI próprio com 105 API / 298 mobile / 4 web / 3 CLI e fixture HTTP/PostgreSQL.

Acompanhar APK da #396 e único retry pós-merge #388. Integrar #396 somente com CI/APK/smoke/artefato no SHA exato; conferir pais, árvore e main pós-merge. Depois retarget #397 e esta etapa para main, em ordem, com nova revisão/gates. Reconsultar mergeable eventual antes de diagnosticar conflito real; não sobrescrever predecessores. Verificar CI/APK pós-merge aplicáveis e persistir resultados reais.

Próximo produto independente: armazenamento durável da tentativa de suporte, vinculado à identidade autenticada (GET /me retorna id no nível superior), tenant e trabalho escolhidos nos dados reais, antes do transporte. Falha de storage impede POST. Timeout ou resposta inválida mantém conteúdo/chave sem confirmação falsa. Mudança de sessão/identidade não pode reenviar draft de outra pessoa nem apagar uma barreira de resultado incerto; relogin da mesma identidade deve permitir retomada segura. Testar races, persistência, ACK e falhas antes de habilitar UI.

Histórico de suporte permanece leitura parcial; suporte geral/contexto Dia do Trabalho e Preferências ainda têm pendências. Visual Truth físico (desenho original, dados e estados reais, cobertura completa), piloto/aparelho/distribuição, pentest e providers/TRUST/PSP/FIN-RISK/WEB-ARCH continuam abertos e independentes. Não declarar projeto concluído. Bloqueio parcial ou fim de rodada não encerra continuidade; manter a rotina, sem promessa de execução 24h ou nova automação.
