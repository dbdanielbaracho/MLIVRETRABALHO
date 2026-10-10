# Contexto Profissional e token do teste HTTP — v1.64

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

## Defeitos e correções
Antes, Início/Trabalhos não conferiam Authorization depois das respostas. Lista antiga podia iniciar interesse após troca de conta. Helper runForSession captura/copía/congela origem, confere foco/Authorization/identidade exibida antes da operação e reconsulta depois. Dados parciais continuam por seção quando a sessão coincide. Não concede autorização de tenant: backend/RLS continuam autoridade. ACK vazio de professionalId ou jobId inválido não confirma envio. Nenhum POST automático/retry novo.

Falha real CI #370: [run38035165889](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38035165889), job114163981409, 2026-10-10T07:40:57Z. Log mostrou Node bad option no comando FIRST_HASH após 12 logins de fixture e cap10. Token do teste começa com hífen; não reproduzir/logar seu valor. node -e código -- token resolve classificação CLI. 3 fixtures executam a linha FIRST_HASH real via Bash puro (sem perfil/rc/BASH_ENV); input normal/hífen/--help comparados com SHA256 conhecido, sem API/DB/conta reais. Regressão red2/3 antes, green3/3 depois; bash-n pass. Não alterar geração do token, limite, expiração, sessões, AuthService ou asserts DB. Auditoria completa dos28scripts .sh: identificou este primeiro argumento opaco aleatório; há outros helpers com JSON, campos e parâmetros explícitos, sem alegar saneamento universal nem modificar contratos de outros domínios.

191 mobile locais UTC/SP pass,8novos;3CLIpass;8shelldiagnosticfixtures já aprovadas na v1.63. Type/build/export/API/DB/emulador serão provados em CI próprio; nenhum PASS futuro declarado. Visual Truth físico OPEN.
