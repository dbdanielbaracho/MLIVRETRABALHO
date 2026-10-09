# Auditoria visual mobile — entrada e autenticação — v1.29

**Data:** 2026-10-09  
**Escopo:** `apps/mobile/app/index.tsx`, `apps/mobile/app/entrar.tsx`, `apps/mobile/app/criar-conta.tsx` e gates de execução relacionados.

## Referência
A auditoria seguiu os Documentos da Verdade v1.20, v1.23, v1.26, v1.27 e v1.28: identidade roxa, hierarquia simples, cards/superfícies claras, jornadas contextuais, legibilidade, rolagem e acessibilidade.

## Divergências encontradas
As três telas de entrada ainda usavam apresentação genérica em preto e branco, sem a marca/hierarquia consolidada nas oito áreas operacionais. Os formulários também não garantiam rolagem em telas menores e a escolha Profissional/Empresa não expunha integralmente o estado selecionado à acessibilidade.

## Correção
O PR #337:
- adicionou a marca e a hierarquia visual canônicas;
- aplicou `#651FFF` a CTAs, links e estados selecionados;
- alinhou textos, superfícies e bordas à paleta do aplicativo;
- tornou explícita a seleção Profissional/Empresa visualmente e via `accessibilityState`;
- adicionou `ScrollView` com tratamento de teclado nos formulários;
- acrescentou rótulos e papéis de acessibilidade;
- preservou autenticação, endpoints, payloads, redirecionamentos e regras de negócio;
- substituiu somente o `any` local do payload de cadastro por um tipo equivalente.

## Matriz histórica do conjunto de 11 telas — conclusão supersedida pela v1.30

| Grupo | Telas/áreas | Resultado estático |
|---|---|---|
| Profissional | Início, Trabalhos, Ganhos, Perfil | Reconciliadas |
| Empresa | Início, Trabalhos, Equipe, Conta | Reconciliadas |
| Entrada/autenticação | Abertura, Entrar, Criar conta | Reconciliadas no PR #337 |

**Correção em 2026-10-09 / v1.30:** a conclusão integral anterior foi prematura. A tabela acima registra a avaliação histórica, não aprovação atual das 11 telas. A main ainda contém dados fictícios em Início Profissional e ausência de CompanyNav em empresa.tsx a reconciliar. O Visual Truth Gate permanece OPEN; as correções específicas do PR #337 e provas CI/APK abaixo continuam válidas. A cobertura integral exige desenho original, requisitos, código, dados/estados reais e inspeção navegada.

## Gate Android
O primeiro run do APK do PR revelou uma condição de inicialização do Android hospedado: `PackageManagerInternal.freeStorage` ainda indisponível durante `adb install`. O workflow passou a repetir a instalação, com limite de seis tentativas/um minuto e saída preservada. Falhas persistentes continuam bloqueando o job.

## Gate CI
Após o merge visual, o CI da `main` falhou duas vezes antes do checkout por `toomanyrequests` do Docker Hub ao baixar `postgres:17`. O PR #338 trocou somente a origem da mesma Docker Official Image para o espelho público do Amazon ECR.

## Provas
- PR #337: https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/337
- Merge #337: `2bb27ea09e7233f2b4c93a70c02d0e7fbf2c0962`
- CI PR #337: `37988712992` — sucesso
- APK PR #337: `37988712988` — sucesso
- APK pós-merge #337: `37991615638` — sucesso
- PR #338: https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/338
- CI PR #338: `37991825498` — sucesso
- Merge #338: `74cfa372b8f824adee3e99394556450eec24d9c3`
- CI pós-merge: `37992084863` — sucesso

## Limite da evidência
CI e APK em emulador provam tipagem, build, contratos automatizados, instalação e abertura standalone sem Metro. Não provam fidelidade pixel a pixel nem substituem inspeção navegada em aparelho físico.
