# MLIVRETRABALHO — Documento da Verdade v1.69

**Status:** NORMATIVO — DELTA SOBRE v1.68
**Data:** 2026-10-10

## Equipes e Talentos: contexto final e resultado incerto

Equipes verifica Authorization e empresa antes de cada transporte e novamente após as leituras da base, membros, alocação e os ACKs de criação/alteração de membros. Talentos verifica novamente o par de origem após GET/DELETE. Abort, timeout de 15s, foco e gerações impedem aplicação tardia. Dados inválidos ou descartados são erro; não viram listas ou contagens vazias fictícias.

A criação de equipe é não idempotente: marca resultado incerto ao iniciar o transporte e conserva essa marca após blur/timeout/troca de contexto sem ACK aplicável. Apenas ACK válido no contexto atual ou conferência manual da lista libera nova tentativa; nenhum POST é repetido automaticamente. Rascunho é preservado na mesma conta/empresa e limpo ao confirmar outro contexto. IDs vazios/brancos não confirmam registros/ACKs nem autorizam POST/DELETE; nome vazio não inicia criação. Helpers mantêm contratos existentes e resultados parciais reais.

Backend, membership, tenant/RLS e papéis continuam autoridade; não se inventa tenant echo em ACKs. Ranking, disponibilidade, proximidade, pools, rotas, navegação e estilos canônicos preservados. React 19.1.4, RN 0.81.6 e lockfile intactos. Nenhuma operação real de criação, membro ou talento executada.

## Evidência e limites

214/214 testes mobile locais passaram em UTC e America/Sao_Paulo, sem falha/cancelamento/skip: cinco regressões novas exercitam schemas/IDs, contexto sem Auth, criação inválida e ausência de transporte POST/DELETE. As fixtures não comprovam taps/foco em aparelho. Diff de quatro fontes e dois testes revisado; typecheck/build/HTTP/CI e APK próprios ainda obrigatórios no SHA publicado. Visual Truth físico integral permanece OPEN.

A recuperação do CI #378 no mesmo SHA e o retry diagnosticado #376 estão registrados no journal 0822Z, com merges e pós-gates. Todos os gates externos continuam separados; não há declaração de conclusão integral.
