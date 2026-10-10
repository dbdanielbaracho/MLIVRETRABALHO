# Checkpoint de execução autônoma — MLIVRETRABALHO

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

## Item atual

Equipes verifica Authorization e empresa antes de cada transporte e novamente após as leituras da base, membros, alocação e os ACKs de criação/alteração de membros. Talentos verifica novamente o par de origem após GET/DELETE. Abort, timeout de 15s, foco e gerações impedem aplicação tardia. Dados inválidos ou descartados são erro; não viram listas ou contagens vazias fictícias.

A criação de equipe é não idempotente: marca resultado incerto ao iniciar o transporte e conserva essa marca após blur/timeout/troca de contexto sem ACK aplicável. Apenas ACK válido no contexto atual ou conferência manual da lista libera nova tentativa; nenhum POST é repetido automaticamente. Rascunho é preservado na mesma conta/empresa e limpo ao confirmar outro contexto. IDs vazios/brancos não confirmam registros/ACKs nem autorizam POST/DELETE; nome vazio não inicia criação. Helpers mantêm contratos existentes e resultados parciais reais.

Backend, membership, tenant/RLS e papéis continuam autoridade; não se inventa tenant echo em ACKs. Ranking, disponibilidade, proximidade, pools, rotas, navegação e estilos canônicos preservados. React 19.1.4, RN 0.81.6 e lockfile intactos. Nenhuma operação real de criação, membro ou talento executada.

214/214 testes mobile locais passaram em UTC e America/Sao_Paulo, sem falha/cancelamento/skip: cinco regressões novas exercitam schemas/IDs, contexto sem Auth, criação inválida e ausência de transporte POST/DELETE. As fixtures não comprovam taps/foco em aparelho. Diff de quatro fontes e dois testes revisado; typecheck/build/HTTP/CI e APK próprios ainda obrigatórios no SHA publicado. Visual Truth físico integral permanece OPEN.

## Retomada

Filho fix/teams-talents-final-company-context baseado no head #379, com código, v1.69, evidência, requisitos, memória e checkpoint no mesmo commit. Este snapshot precede seu próprio commit: consultar PR/head/runs após publicação, sem inventar autorreferência.

Próximo: acompanhar o único retry #376 e APKs #378/#379, além dos pós #374/#375. Integrar #376 somente com próprios CI/APK success no SHA exato e PR/main/base/diff/merge-base novamente verificados; conferir árvore/pais/main/pós-runs e retarget #377, #378, #379 e este filho em ordem. Mergeable=false após retarget exige reconsulta eventual; conflito real exige reconciliação preservando ancestrais e novos gates, sem force. Falha de conexão exige verificar remoto antes de repetir merge.

Auditoria independente seguinte: ler fontes atuais de Substituições, Pagamentos, Candidatos e casos/Segurança com seus controllers e canônico, procurando lacunas demonstráveis de contexto/ACK/dados/estados; não inventar recurso, política ou tarefa. APK em execução é acompanhamento; gate físico/provider não bloqueia tarefas independentes.

Visual Truth original/cobertura física completa, piloto/pentest #220, providers/PSP/FIN-RISK #215/#219/#228 e WEB-ARCH #224 continuam separados e OPEN. Nenhuma conta, mensagem, DSAR, convite, publicação, dinheiro/PSP real ou infraestrutura paga. Manter continuidade até conclusão integral comprovada ou ordem explícita; fim de rodada e bloqueio parcial não encerram projeto. Não exigir continuar.
