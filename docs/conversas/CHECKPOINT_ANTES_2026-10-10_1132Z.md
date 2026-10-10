# Checkpoint de execução autônoma — MLIVRETRABALHO

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

## Item atual

Privacidade recusa aplicar ACK/export/desativação depois do prazo de 15s, mesmo se o transporte completar; mantém resultado desconhecido quando a operação foi enviada e exige conferência explícita. Ler pedidos é GET sem criar DSAR; gerar export continua explícito e cria access DSAR no backend. Troca de identidade limpa detalhes/cópia da origem anterior; erros na mesma conta preservam rascunho. Desativação preserva confirmação humana, bloqueios backend e limpeza condicional da sessão.

Assistente usa runForSession para enviar com Authorization de origem imutável e verificar conta/foco/abort após interpretar, antes de mostrar sugestão. Mantém assisted, deterministic_baseline, executionAllowed=false, rotas por accountType e confirmação humana. Nenhuma chamada paga a LLM ou execução crítica introduzida.

Membros verifica abort/Authorization+empresa após GET/ACK e antes de selecionar a empresa. Aceite continua permitido à conta autenticada sem tenant selecionado; persistência condicional preserva a sessão e evita sobrescrever outra seleção. Rascunhos são limpos ao confirmar outra conta/empresa, inclusive após voltar à tela; refresh no mesmo contexto sem empresa não apaga o código. A geração marca incerteza antes do POST e a conserva após blur/timeout/resposta perdida; nova criação exige conferência manual, evitando substituir silenciosamente o segredo do convite anterior. Códigos secretos não são persistidos no checkpoint/log.

Schemas recusam IDs vazios/brancos de membros, convites, DSAR, identidade e vínculos da cópia. Código sem prefixo/segredo e criação/revogação sem ID de contexto não iniciam transporte. ACK real segue o contrato existente; não se inventa tenant echo ou UUID rígido no cliente. Convites mantêm roles owner/admin/manager, e-mail/expiração/vínculo, sem alteração de política, promoção ou tenant/RLS.

234/234 testes mobile locais passaram em UTC e America/Sao_Paulo, zero falha/cancelamento/skip. Sete regressões novas cobrem schemas/guards antes do transporte, aceite sem empresa selecionada, ACK incompleto e composição dos helpers reais com deadline/troca de conta. Três telas, dois helpers e três testes revisados; JSX e StyleSheet canônicos são idênticos aos da base. PrivacyController, CopilotController e CompanyMembersController atuais lidos integralmente. Nenhuma DSAR, exportação de pessoa real, desativação, convite ou interpretação real executada; apenas fixtures. React19.1.4/RN0.81.6, lockfile, backend, tenant/RLS e regras financeiras preservados. Checkout local parcial não prova type/build/HTTP/DB/native; próprios CI/APK e pós-merge continuam obrigatórios.

## Próxima ação concreta

Publicar fix/account-actions-timeout-origin, filho da main 516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca; consultar número/commit/árvore/runs próprios após publicação (snapshot anterior, sem SHA circular fictício). Revisar diff remoto e integrar apenas com CI/APK success no SHA exato e gates aplicáveis; verificar árvore/pais/main e pós-runs. Acompanhar todos os APKs pós #376–#382; falha nova exige diagnóstico, não retry automático sem causa.

Próximo item independente identificado no código: index.tsx lê getSession e getTenant em operações de fila separadas, podendo misturar a navegação durante troca de sessão. Usar snapshot pareado existente authenticatedTenantHeaders, foco e confirmação final antes do redirect, sem novo endpoint/política; provar interleaving real da fila e roteamento antes de publicar. EmpresaConta já usa limpeza condicional e foco, CompanyNav já renderiza corretamente; _layout é apenas Stack. Não fabricar commits de bootstrap.ts sem consumidor ou rotas/contratos de ajuda/preferências ausentes.

Visual Truth original/dados/estados/cobertura física integral OPEN; piloto, pentest, provider/TRUST, PSP/FIN-RISK e WEB-ARCH separados. A validação física exige aparelho e pessoas/contas de teste autorizadas; não fechar com emulador/fixtures. Não executar operações reais, dinheiro, novas cobranças, infraestrutura/deploy pagos. Bloqueio parcial/CI running/fim de rodada não encerra projeto nem exige continuar; manter rotina existente até conclusão integral comprovada ou ordem explícita.
