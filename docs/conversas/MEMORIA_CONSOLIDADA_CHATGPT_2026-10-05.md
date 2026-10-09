# MLIVRETRABALHO — MEMÓRIA CONSOLIDADA DAS CONVERSAS CHATGPT

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
