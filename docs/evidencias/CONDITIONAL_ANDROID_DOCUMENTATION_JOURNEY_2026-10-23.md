# Jornada integrada de governança: mudança documental com Android N/A

Esta evidência consolida a entrega aplicável do PR625 e define o controle integrado complementar. É um caso funcional do workflow real, não nova implementação do classificador nem repetição de CI de um SHA falhado.

## Contrato observável da jornada

|Requisito|Implementação imutável na base174|Prova que este pacote deve produzir|
|---|---|---|
|Diff completo e SHA próprio|scripts/ci-android-policy.cjs changedPaths/classify, blob82d614b04f8df24a0f422e211fb40eb4e9e9d9a9|Log ANDROID_APPLICABILITY_PASS com base, checkout, lista integral de sete paths somente docs, required=false e reasons=[]|
|Exclusão Android explícita|ci.yml f05e734241be320aade188f19c3a7fa54f483e55; Android528002354bcd760dd5998144608d0b2c6aaa2772|Job Android skipped por condição; nenhum APK novo atribuído a esse SHA|
|CI completo mesmo em N/A|foundation original intacto|Tipos/build/export Android/1973 unidades/migrações/privacidade/jornadas HTTPPG/12matrix/canônico/Production Truth completos SUCCESS|
|Publicação correta|publication, check merge-policy GitHub Actions App15368|MERGE_POLICY_PASS foundation=success/android=skipped/androidRequired=false no mesmo checkout|
|Integração revisada|Git base/head/tree/diff+mergeexpected uma vez|Own fullSUCCESS antes de ready/merge; POST fullSUCCESS no SHA literal novo; provas de PR não substituem POST|
|Preservação normativa|Seis originais FULLprefix INPLACE; ledger JSON byte-exato|Checker real confirma13áreas/58requirements/9cadeias históricas/185pins; não reatribuir evidência histórica ao novo SHA|

APK N/A integral porque todos os sete paths são documentação e todos os inputs Android/build/Expo/mobile/native/deps/lock/workflows/scripts são byte-exatos174. O APK literal174 do PR625 continua sendo o último produto medido, não um APK deste pacote. Modelos negativos passados não são bloqueio de merge administrativo. mainprotectedfalse/rulesets[] e issue622 continuam impedindo aceite integral13. Não tentar mergevermelho em main desprotegida.

## Procedimento de revisão e evidência

1. Revalidar main174, HEAD próprio, tree completa e sete paths/modes100644; nenhum segundo draft concorrente de governança. PR565 continua separado e bloqueado por PermissionDenied.
2. Abrir uma única PR documental; não alterar workflows/código/testes para fabricar um N/A. A classificação deve sair do diffGit real com a implementação já integrada625.
3. Ler execução attempt1 e todos os jobs; guardar o checkout real do scope/foundation/policy, pais e tree. Se PR usa checkout sintético, confirmar pais[MAIN,HEAD] e tree igual ao candidato. Não chamar esse SHA de literalHEAD.
4. Só integrar se foundation, scope e merge-policy SUCCESS e Android skipped com required=false explícito. Se falhar, diagnosticar causa primária, sem rerun do mesmo SHA, sem relaxar browser/15s/CDPFetchCORSsandboxLNANetLog/asserts.
5. Após mergeexpected, verificar nova execução push literal e as mesmas testemunhas. Não confundir Activity Watch com build. Decisão final ficará no recibo terminal da PR; esta preparação não inventa resultados futuros e não cria commit de status para registrar o próprio SHA.
6. Atualizar a issue622 com o resultado real N/A somente após ambas as execuções completas; proteção administrativa e seus controles reais permanecem pendentes. Não aceitar13 por arrasto.

## Estado da matriz preservado

Aceitas internas:2,3,4,5,6,7,8,9,10,12. Pendentes:1,11,13. Zero novo aceite integral neste preparo. Área1 exige percursos RN/estados/layouts;11 depende contratos de Preferências/Ajuda sem vínculo;13 requer configuração administrativa real e prova de bloqueio. Sem PSP/dinheiro real/produção/pentest independente/aparelho físico. Nenhuma automação criada, alterada ou desativada.

## Recibo final integral PR625 — GitHub consultado nesta preparação

## Entrega validada — CI exige Android aplicável antes de concluir

O CI e o APK eram executados separadamente; um CI verde não demonstrava que o Android obrigatório tinha terminado. O PR625 integra o build canônico no mesmo workflow e publica o check **merge-policy**, que exige foundation e classificação aprovadas, além de Android SUCCESS quando aplicável. N/A exige classificação explícita e job Android skipped; entrada desconhecida é conservadora e exige APK. Nenhum gatilho push/PR duplicado de APK permanece.

**APROVADO TÉCNICO INTERNO: subcritério de orquestração CI + Android APLICÁVEL no mesmo SHA**, após own e pós-merge completos. **Área13 integral continua PENDENTE**: main ainda sem proteção administrativa, sem controle negativo real de bloqueio de merge e sem execução integrada de PR documental N/A deste novo gate. Os testes negativos e N/A do código passaram, mas não substituem essas provas. Permanecem10áreasaceitas[2,3,4,5,6,7,8,9,10,12]/3pendentes[1,11,13].

### Proveniência de Git e execução

- HEADed6430de1e53f33b60369911edfd17a4b4f5aa1e, parentMAIN048a90733f51b14a78db631e3cbf4b87920b84da, tree00988eaaa72f4d86bd88259c6e0d79713e086df1.
- READYuma vez e mergeexpectedHEADuma vez em2026-10-23T17:29:52Z: MAINliteral1741ef82840765365dbcf1c824adda50c9635bea/pais[048a90733f51b14a78db631e3cbf4b87920b84da,ed6430de1e53f33b60369911edfd17a4b4f5aa1e]/mesmatree00988, Gitconfirmado.
- OwnCI39993552657attempt1SUCCESS: checkoutREAL48b017edecc269d32dc722eea376b05ce055b174SINTÉTICO[pais048,ed64]/tree00988. Não literalHEAD.
- POSTCI39995544138attempt1SUCCESS: checkoutREALliteral1741ef82840765365dbcf1c824adda50c9635bea emtodososjobs. Não ActivityWatch39995544144; nenhum rerun/cancel/force/novoSHAartificial.

|Gate real|Own PR625|Pós-merge literal174|
|---|---|---|
|foundation|job120551138778 SUCCESS|job120558007155 SUCCESS|
|android_scope|job120551139322 SUCCESS; requiredtrue17:15:34.9776025Z|job120558006795 SUCCESS; requiredtrue17:30:14.8410711Z|
|Android canônico chamado|job120551298814 SUCCESS|job120558188683 SUCCESS|
|merge-policy|job120557191050 SUCCESS17:28:19.7270271Z|job120564227860 SUCCESS17:43:09.6755844Z|
|Browser12matrix+canônico|MATRIX0 17:19:56.8987955Z|MATRIX0 17:35:01.9885779Z|
|Production Truth|PASS17:21:01.9710508Z|PASS17:36:09.9941922Z|
|Instalação / DEVICE_SMOKE_OK semMetro|Success17:27:52.9792122Z /17:28:05.9021345Z|Success17:42:42.8823146Z /17:42:55.2472869Z|

Foundation emambos1973=[217Web1221mobile521API3CLI11watch]0fail/skip/cancel;3ledgerHTTP separados;3policytests no scopejob separados;8smokemodels no Android separados. Typebuildexport/migration2x/privacy/jornadasHTTPPG/OpenAPI106ops145requests383responsesPASS. PósDOCUMENT_TRUTH_RECONCILIATION_PASS17:32:45.7930717Z eOPENAPI17:33:11.9797115Z; póswholeAuth17:33:04.5478660Z/ledgeratomicity17:33:05.6918604Z. Browser controlesoriginais e todososguards15s/CDPFetchCORSsandboxLNANetLog preservados; nenhum RCA global de falhas históricas atribuído a este gate.

### APKs realmente baixados e conferidos

Os dois builds pertencem ao workflow CI e ao job Android chamado, no mesmo checkout; não há runStandalone separado a inventar ou emprestar. Os IDs de execução são CI39993552657 ePOSTCI39995544138, com Androidjobs próprios na tabela acima.

|Recibo|Own (sintético48b)|POST (literal174)|
|---|---|---|
|ArtifactID|12518559037|12520107030|
|Expiração (unexpired)|2026-11-06T17:28:07Z|2026-11-06T17:42:56Z|
|ZIPbytes|28913841|28913838|
|ZIP SHA256|55414743efc627ab5c023b2da8f0bacf4c1b043c487c8d31476d1fcb18da593f|3b5c3e266b3a09ab7be68212ee9efe459d571ceb3d5823483dd67ec58ff69fe7|
|APKbytes|66162612|66162612|
|APK SHA256|63aba77b361196b19093ecbc0cb86bbaea905ba69dbb914f12f51e4a42099062|0d8a2f6f50765fc439dec665480c09635d82ad58dfb7c4b517972ec79e3af4a3|
|BUILD_INFO commit|48b017edecc269d32dc722eea376b05ce055b174|1741ef82840765365dbcf1c824adda50c9635bea|
|BuildUTC|2026-10-23T17:26:29Z|2026-10-23T17:41:21Z|

Cada download aguardou curl exit0 antes da verificação; ZIP CRC íntegro, tamanho/digest iguais à API, APK SHA recalculado igual à linha MLivreTrabalho.apk do SHA256SUMS. BUILD_INFOrelease/fixedpackagecom.predibeacon.mlivretrabalho.pilot/metrofalse/internalpilot. APKCRC/embeddedassets/index.android.bundle verificados; manifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480emambos=baselineBYTEidentity/min24target36. ZIP≠APK; instalação/abertura não prova formulários/SecureStore/RNintegral/físico/VisualTruth/produção.

### Requisito → implementação → teste → CI/SHA → evidência

|Subcritério13|Código|Prova e limite|
|---|---|---|
|Detectar insumos Android no diff real|ci-android-policy.cjs classify/changedPaths|Git diffNULsemrename/baseancestral/checkoutimóvel; rename mobile→docs em Gitreal; scopejob own+POST requiredtrue e árvoreGit exata|
|CI aguardar Android aplicável|ci.yml android_scope/android/merge_policy; publication|foundation terminou17:21:01Z own e17:36:09Z POST, mas run sóconcluiuapósAndroid epolicy17:28:19Z/17:43:09Z;4jobsSUCCESS nasduasexecuções|
|Preservar build canônico e evitar duplicação|standalone-pilot-apk.yml workflow_call/dispatch|jobs/permissões/build/smokeFULLBYTEEXATOSmain048; umAPK por execução CI, semworkflowStandaloneseparado porpush/PR|
|Recusar falhas/cancelamentos/skips obrigatórios e N/A implícito|publication e3policytests|LocalNode24.19.0 + scopejobs própriosPASS; negativos são testes do código, NÃO tentativa de merge com proteção administrativa ativa|
|Rastreabilidade e segurança|ledger protectedInputs+TEST-ANDROID-EXPORT-001;6normasFULL|12paths/modosrevistos,1374de1383existingmainblobsinalterados/3added; ALLmobile/API/SQL/RLS/auth/LGPDReact19.1.4RN0.81.6lock/buildsmoke/browser intactos;12UTF8FULLcreate/readbackEXACT|

SourceSHAs: policy82d614b04f8df24a0f422e211fb40eb4e9e9d9a9;tests5c5b3652240903a275faff28fc93a175a19b2aaa;CIf05e734241be320aade188f19c3a7fa54f483e55;Android528002354bcd760dd5998144608d0b2c6aaa2772;ledgeraacd150abe81fd90568932bc65eb060cce867eb8. ParentmainFULL6normprefixospreservados INPLACE; notaCONDITIONAL_ANDROID_MERGE_POLICY_2026-10-23.mdb3f162e799ae81a5963fe740e83ad04e3eefa7ac preservaFULLterminal565. PrepPENDINGabaixo é história, superseded por este terminalprimário. Consolidar emoriginaisapenaspróximaentregafuncional, semcommitstatus/selfref.

### Pendências reais preservadas

- mainprotectedfalse/rulesets[]; issue622OPEN. Novo check real **merge-policy**, fontegithub-actions/AppID15368, observado own ePOST; precisa configuração administrativa com readback e controles reais. Conector atual sóexpõeGET dessasfamílias e não administraçãowrite. Nenhuma credencial/grant/root/bypass solicitado ouexecutado. Proteção administrativa não foi aceita por arrasto.
- PR565 permaneceDRAFT/HEAD69544d56673dd5ee6b8220d52b77bb4373e681ed, ownCI39990904028FAILsourcepin eAndroid39990903710FAILPermissionDeniedMAC52bytesSHA730e5e2350d8b4e456e864e8a59bd057651dae39ce2e4e3b173cb4372eb23615. STOP antesQMP/zeroendereços/UI; sem lerporoutrafonte/elevar/fallback para contornar. Nenhum código QMP/21modelos importado em625. Não integrarbranchmerged/ready/merge/rerun565vermelho.
- Área1 exige jornadas/layoutsRNintegrais;11 continua comcontratospreferências/ajudageralsemmembership ausentes. Não inventar defaults/tenantglobal. Externos215/219/220/224/228OPENseparados;nenhuma produção/PSP/dinheiro/pentest/físico/SecureStore/VisualTruth novo.
- Só estePR625foiintegrado nesta frente,uma vez. 605/573/584/574/621etcjáresolvidosnão repetir. Rotina/projeto não encerrados por impedimento parcial. Sem nova automação ou mudança de agendamento. Nenhuma execução entre rodadas prometida.

---
## Own e preparo completos preservados como história

## Own full CI + Android verificados; pós-merge ainda PENDENTE

HEAD ed6430de1e53f33b60369911edfd17a4b4f5aa1e / tree 00988eaaa72f4d86bd88259c6e0d79713e086df1 / parentMAIN048a90733f51b14a78db631e3cbf4b87920b84da. RunCI39993552657attempt1SUCCESS, com4jobsreais: foundation120551138778SUCCESS; android_scope120551139322SUCCESS/requiredtrue; android/build-standalone-pilot-apk120551298814SUCCESS; merge-policy120557191050SUCCESS17:28:19.7270271Z. Não é ActivityWatch e não são dois APKbuilds duplicados: workflowAndroidcanônico é chamado dentro do runCI, nomes/IDs próprios preservados.

Actualcheckout comum48b017edecc269d32dc722eea376b05ce055b174 SINTÉTICO[MAIN048,HEADed64]/tree00988idênticaGitconfirmada, não literalHEAD. Scopecheckout17:15:34.1012356Z;foundation17:15:36.3238193Z;Android17:15:44.0042970Z. Foundation1973=[217Web1221mobile521API3CLI11watch]0fail/skip/cancel;3ledgerHTTP separados e3policytests no jobscope separados,8smokemodels noAndroid separados. Typebuildexport/migration2x/privacy/58requirements/185pins/jornadasHTTPPG/OpenAPI106ops145requests383responsesPASS;12matrixcanonical/MATRIX0 17:19:56.8987955Z;ProductionTruth17:21:01.9710508Z. N/A negativo comprovado sótestlocal/CIpolicyunit, não execução dePRdocumental real nem branchprotectionnegativa; não aceitar13porarrasto.

Androidbuild17:26:29.1114086Z/installSuccess17:27:52.9792122Z/DEVICE_SMOKE_OK17:28:05.9021345ZsemMetro. Artifact12518559037/unexpired/expiry2026-11-06T17:28:07Z: REALZIP28913841SHA25655414743efc627ab5c023b2da8f0bacf4c1b043c487c8d31476d1fcb18da593f=APIhashsize/curlawaitexit0/CRC; APKindividual66162612SHA25663aba77b361196b19093ecbc0cb86bbaea905ba69dbb914f12f51e4a42099062=SHA256SUMSfilenameMLivreTrabalho.apk. BUILDINFOliteralcheckout48b/build2026-10-23T17:26:29Z/release/fixedpilotpackage/metrofalse/internalpilot; embeddedbundleCRC emanifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480=baselinebyteidentity/min24target36. ZIP≠APK; smoke≠7nativeforms565/SecureStore/RNwholelayouts/physical/VisualTruth/prod.

12paths/modosFULLrevistos,1374de1383existingmainblobsiguais/3adicionados;ALLmobile/API/SQL/RLS/auth/LGPDReact19.1.4RN0.81.6lock/buildsmoke/browserguards intactos. Doisworkflows:foundationFULLprefixoriginal+3jobs;Androidjobs/permissõesFULLsuffixbyteexato,apenasworkflow_call/dispatchsemtriggerspushPRduplicados. Sourcepinsprotected+TEST-ANDROID-EXPORT-001 conciliados.12blobsFULLremotecreatereadbackEXACT;6FULLmainnormprefixos+capítulo; ledgerlocalcanonicalFULLPASS antespublicação. NOVAPRlegítimaárea13apósfreshopenPR565bloqueadoporpermissão,semcopiarQMP/runtimeouabrirduplicata565. Branch565preservadadraft,zeroSAMESHArerun/cancel/force.

GatesownautorizamreadyONCE/mergeexpectedHEADONCEapósrevisãofresh; POSTliteralCI+Android+policy ebytes próprios aindaPENDENTES. 10áreasaceitas/3pendentes[1,11,13], zeroaceiteglobalantecipado. Mainprotectedfalse/622OPEN,4checksdeappGitHubActions observados, mas não regraadministrativa. Externos215219220224228 separados. Semprod/custos/PSP/dinheiro/pentest/físico/root/grants/bypass.

---
## Preparação FULL preservada

## CI completo com Android obrigatório quando aplicável

HEAD ed6430de1e53f33b60369911edfd17a4b4f5aa1e / tree 00988eaaa72f4d86bd88259c6e0d79713e086df1 / parentMAIN048a90733f51b14a78db631e3cbf4b87920b84da. DRAFT até ownCI completo+job Android canônico SUCCESS e revisão fresca. O job Android passa a ser chamado dentro da execução CI no mesmo commit; não há duplicação push/PR em workflow paralelo. Sem alteração em jobs/build/smoke/permissões Android, sem importação565.


## CONDITIONAL_ANDROID_MERGE_POLICY_2026_10_23

Pacote funcional da Área13 sobre main048a90733f51b14a78db631e3cbf4b87920b84da. A auditoria identificou dois workflows independentes: CI podia terminar verde enquanto Android obrigatório faltava/falhava; em mudanças documentais o check Android não existia, dificultando proteção administrativa correta. Novo job merge-policy exige foundation SUCCESS, classificação explícita SUCCESS e Android SUCCESS quando aplicável, ou SKIPPED exclusivamente com classificação N/A explícita. Ausência, cancelamento, falha, skip obrigatório ou valor desconhecido reprovam. O gate não configura branch protection nem prova bloqueio administrativo; issue622 continua aberta/mainprotectedfalse.

Classificação usa git diff completo NUL/sem detecção de rename, base imutável ancestral e checkout real igual GITHUB_SHA; PR também exige head ancestral. Exclusão/rename de mobile continua exigindo APK. Somente documentação e fontes API/Web/migrações comprovadamente fora dos insumos Android podem ser N/A; manifests package.json e entradas desconhecidas exigem APK conservadoramente. Sem limite de300arquivos da API, sem branchname como prova, sem substituirSHA por verde antigo. Erro de Git/identidade/diff é falha fechada.

CI original foundation é prefixo FULLBYTEEXATO, com tipos/build/export/migrações/privacidade/HTTPPG/12matrix/canônico/ProductionTruth/browser15sCDPFetchCORSsandboxLNANetLog/asserts inalterados. Android original mantém FULLBYTEEXATOS jobs/permissões/build/8smoketests/emulador/install/DEVICE_SMOKE/metadados/artifact; somente gatilhos passam a workflow_call e dispatch, sem disparo independente duplicado por push/PR. CI chama o workflow local do MESMO commit quando aplicável; o resultado agregado inclui ambos os jobs e fica no SHA próprio. Nenhuma permissão nova, secrets herdados ou API write. Não usa Project Activity Watch como build e não muda monitor.

Três testes locais executam o código real: classificação de fronteiras/mobile/locks/workflows/packages/entrada desconhecida e N/A; matriz de rejeição de resultados obrigatórios falhos/cancelados/skipped/ausentes e N/A não explícito; repositório Git temporário REAL com rename mobile→docs, diff NUL/base/HEAD/PR/push inválidos.3PASS0fail/skip/cancelNode24.19.0. Não é teste de proteção administrativa/Android/RN/HTTPPG. CI próprio e APK interno chamado, incluindo bytes do artefato, AINDA PENDENTES. Exigir ownfullSUCCESS+AndroidSUCCESS, revisão main/head/tree fresca, mergeexpected uma vez e POST literal completo antes de integrar. Não emprestar sucesso574 nem565.

185pins protegidos preservados fora2workflows; referência TEST-ANDROID-EXPORT-001 também conciliada para o CI atual. O erro real565CI39990904028/job120542082413 de16:59:01.5392103Z ensinou que só atualizarprotectedInputs não basta: sourcepin por requisito também deve seguir implementação atual. Recibos históricos9cadeias/18CI/12APK continuam medidos em seus SHAs, não reatribuídos. Checker real local com6normasFULL/9recibos/ledgerlegado/hookHTTP e árvoreGit confirmou conciliação anterior, não nova prova remota. Atualpacote mantém58requirements/13áreas/6prefixos; ledgerespelha fonte nova sem alterar contagens de aceites.

PR565 permanece DRAFT/head69544d56673dd5ee6b8220d52b77bb4373e681ed/tree56a3a1a38f3a8a9a360fb70796e1eec48452e0db. CI39990904028FAILsourcepin; Android39990903710/job120542080679FAIL real PermissionDenied na leitura de/sys/class/net/eth0/address17:06:17.4979320Z/status1/stderr52bytesSHA730e5e2350d8b4e456e864e8a59bd057651dae39ce2e4e3b173cb4372eb23615. STOP antesQMP/hardware/UI, semfallback/root/grants/bypass/permissãoalternativa. Build/smoke original passou, mas APKvalidado não publicado; nenhum aceite nativo. Artifact12518102207 REALZIP601bytesSHAb0f83f1bd371c6e5266fca4ef1b6552344b5d91184b06b8793d645825dca5812/API/curlawaitexit0/CRC/failure.json verificados; expira06/11/2026T17:06:25Z. QMP e seus21modelos NÃO importados nesta frente. FULLterminal565 preservado na nova nota; sem rerun/cancel/estender outra branchmerged.

6normasmainFULLprefixos preservados+capítulo/referência; memória original atualizada INPLACE.10aceitas[2,3,4,5,6,7,8,9,10,12]/3pendentes[1,11,13]. Ainda faltam percurso completo de telas1, contratospreferências/autoridadeajudageralsemmembership11 e proteção/gov integral13. Não inventar defaults/tenantglobal, produção/PSP/dinheiro real/pentest/físico/VisualTruth/SecureStoreRNintegral.215/219/220/224/228 separadas. Não encerrar projeto/rotina por impedimento parcial. Recibo e FULLhistória: docs/evidencias/CONDITIONAL_ANDROID_MERGE_POLICY_2026-10-23.md.

