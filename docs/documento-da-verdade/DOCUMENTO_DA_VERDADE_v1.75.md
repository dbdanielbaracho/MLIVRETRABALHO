# MLIVRETRABALHO — Documento da Verdade v1.75

**Status:** NORMATIVO — DELTA SOBRE v1.74
**Data:** 2026-10-10

## Descoberta de testes reais

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

## Provas e continuidade

Snapshot 2026-10-10 11:50 UTC. Main 516c7fc873dedaf5ac0294e3e1a4c1f4e12d8aca (#382/v1.71), árvore 27f168902ad888017df379526437690202204473. Pós-main CI38048073330/APK38048073303 SUCCESS, job114201529542/smoke2026-10-10T11:39:26.5431555Z semMetro/ZIP11668462821 sha256:145261eb8336c7981d9e6ff40c0a9609fa7a5b4f17f59ca52cdd85e52cf8d87a conferidos. Pós #375/#377/#378/#379/#382 CI/APKsuccess com provas no journal1129Z/1145Z e abaixo; não repetir merges.

PR #383 heada8c2c106068f311a64e6a303bae03d6d323df8e2 ownCI38048556097 SUCCESS/APK38048556192 in_progress, base main.
PR #384 headd2146ef4a84a025567d52af7cb2b506462e29836 ownCI38048756243 SUCCESS/APK38048756318 in_progress, base #383.
PR #385 headdcda3bf76996f82b8c85c2bb2767581ef6d1d18b, árvore78aea740b5e241e480b6d381945d60346b7b4101, pai b8674912ea8e553fe3e311b551a31a597ef633b3: CI38049578933 SUCCESS, job114205819194, type/build/export/tests/migrations/privacy/HTTP todos aprovados. Log11:48:12.6053438Z PASS: support assignment binding rejects cross-tenant and malformed requests without insert; legitimate reporter/admin flows preserved. 47 testes API,238 mobile e4Web no CI;8regressões suporte reais(controller inteiro+input) presentes. Primeiro CI38049311501 FAILURE preservado; fixture401 corrigida por novo commit sem retry/alterar auth. Base #384; diff remoto18arquivos revisado, mergeabletrue reconsultado. Mobile subtree ba685042c10bf42051738241601f7a2041498a7b igual ao pai; workflowAPKnãoemitiurun para este diff API/CI/scripts/docs (N/A por paths, não PASS inventado).

Pós #377 CI38048000622/APK38048000637 SUCCESS, job114201321884, 2026-10-10T11:43:32.9805768Z DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false; ZIP11668767598 sha256:c7dbba28bb8b81565a592660296753b852208fe3b3d2d2d9929ab5f79e81aa8a; upload/artefato/head conferidos.
Pós #376 APK38047970768 tentativa2 e #381 APK38048068335 tentativa2 em execução após únicos retries diagnosticados nos respectivos runs, históricos1failuremantidos. Pós #380 APK38048063298 tentativa1 FAILURE job114201499870: buildpass; script iniciou, Androidserviceactivity indisponível e shell224 antes de confirmação de install/launch/smoke; sem DEVICE_SMOKE_OK. ZIP diagnóstico11668792675 sha256:3c96a18f741d5a97f19f0802c291c35ac1e3533eca7e0f8bfa2ab082db894ac3 baixado e hashbytes comprovado; manifest SHAe6c6554f9208d4243bc8f724fba4b8971d958a1d/run38048063298/attempt1, boot1, logcat_exit124, app-pid_exit1, nenhum install ACK. Falha de readiness Android não prova crash nem sucesso do aplicativo. Único retry sameSHA/job solicitado11:49:19UTC, acompanhar tentativa2, sem repetir semnova causa. Nenhuma queda de gate.

Publicar fix/api-test-discovery sobre #385 dcda3bf76996f82b8c85c2bb2767581ef6d1d18b, base fix/support-assignment-tenant-boundary, consultar próprio PR/head/tree/run após publicar (sem SHA circular fictício). Integrar #383/#384/#385 e filho em ordem com freshPR/main/base/merge-base/diff e own gates aplicáveis no SHA exato. #383/#384 exigem APK próprio; #385/esta fatia API apenas só possuem CI por path filter, confirmar mobile subtree idêntica/base e gates emitidos após retarget antes de integrar. Verificar árvore/pais/main e pós-CI/APK quando aplicável; merge não implica deploy ou fechamento físico.

Acompanhar APKs próprios #383/#384 e retries pós376/380/381; não repetir merges ou retries já iniciados. Para o próximo item, conferir eventual falha de teste agora descoberto como defeito real, sem modificar expectativa para esconder política incorreta. Depois completar confronto de taxonomy/capabilities/modalidades/planner/graph/score/terms/support/career/integrity/vertical/Copilot com testes/controllers/jornada canônica, pois ausência de issue ou presença de código backend não prova escopo inteiro. Integrity/cancellation/careerconversion/workgraph lidos apresentam vínculos tenant na operação; não gerar alteração sem defeito demonstrado.

Visual Truth original/dados/estados/cobertura física integral OPEN; piloto/aparelho, pentest independente, providers/TRUST/PSP/FIN-RISK e WEB-ARCH separados. Ajuda/Preferências no perfil ainda indisponíveis; suporte backend é tenant-scoped vs profissionalmulti-company e exige contrato/jornada/design canônicos antes de expor; não inventar tenants, dados, telas/política ou pseudo-ML. Bloqueio parcial/running/fim de rodada não encerra projeto; manter rotina existente para retomar checkpoint até conclusão integral comprovada ou ordem explícita. Sem dinheiro real, nova cobrança/infraestrutura/deploy pago.
