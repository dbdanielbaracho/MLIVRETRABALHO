# Ledger simulado → cliente Ganhos: provas de consumo de JSON


## Ganhos: JSON real após rollback e recuperação explícita — ciclo funcional — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Extensão coerente do PR573 existente, branch test/ledger-completion-insert-rollback-20261017, parent5852d5527e347312d473a6fac8cc3a604ff2eb52/treeff1d0ec816605367a1a0c0d809391f6c3e98b2d2; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README e seis originais recuperados integralmente em refs imutáveis do GitHub vivo. Prefixos FULLmain+571+573+574 preservados NO LUGAR por apêndice, não substituídos por resumo. A nota de privacidade574 é preservada pelo mesmo blob, sem copiar seus dois patches mobile/teste nem gates de outros drafts.

Lacuna definida: o fixture573 já exige HTTPearnings vazio depois de rollback e um ledger payable23456 depois da recuperação, mas não passa ESSES dois JSONs ao consumidor real apps/mobile/lib/earnings.ts usado em Ganhos. Acrescenta consumeEarningsJSON ao próprio CJS, importando o source REAL por caminho fixo, NativeTSstrip+VM, sem modificar o helper. Callback retorna SOMENTE o objeto já recebido pela chamada HTTP existente; exige uma execução/uma leituraJSON, READY e a mesma referência de dados. Rollback exige [] autorizado; positivo exige UMA linha com id do ledger obtido independentemente do PG, tenantId/assignmentId do escopo HTTP↔PG, amountCents23456/statuspayable. Expectativas malformadas/incompatibilidade/schema inválido falham sticky, nunca viram zero ou PASS. Não há fetch/SQL/POST/retry nessa função.

Todos os20 comandos awaitcall anteriores foram confrontados e mantidos nas mesmas posições; o GET pós-rollback apenas ganha variável para compartilhar a resposta com o helper. Nenhuma requisição adicional, SQL do hook/snapshots/cleanup/ACL/RLS, operação de produto ou reordenação de gates. Marker novo LEDGER_MOBILE_REAL_JSON_PASS só poderá ser aceito se o CI próprio executar os DOIS consumos reais e TODOS os controles anteriores até cleanup/400 replay. Os antigos LEDGER_COMPLETION_* permanecem exigidos. NESTA PREPARAÇÃO nenhum marker HTTPPGnovo foi executado; não emprestar dados/CI574/571 ou modelo local.

Quatro testes NOVOS das funções REAIS em apps/api/src/ledger-completion-atomicity.test.ts: vazioREADY sem transporte; positivo preservado; bindings tenant/assignment/ledger/amount/status e expectativas forjadas recusados; schema/data impossível não aceitos como vazio/positivo. Seis testes antigos preservados byte a byte exceto destructuring para importar nova função: total10PASS/zeroFAILSKIPCANCEL local viaNativeTSstrip+Function. Oito testes earnings.test.mjs da main executados SEM alterar asserts:8PASS. node--checkPASS; CLI CI=0 recusa antes de pg/HTTP. Local18PASS não é rollbackSQL/AndroidUI/rede/SecureStore/provider/produção.

CI novo esperado1365=[145Web,765mobile,441API,3CLI,11monitor], AINDA PENDENTE, não resultado. Não rerun5852 nem esconder falha anterior: run39076638325attempt1job117525041067 eattempt2job117525180707 falharam por quotaECRpostgres17 ANTEScheckout; retryespecíficoúnico consumido e sem resolução. Nova execução é justificada por novo caso funcional/novoHEAD, não tentativa de verde. Workflow/registro/imagem/CDP/Fetchguard/CORS/sandbox/LNA/deadlines/securityflags/asserts intactos.

### Recibo574 final consolidado (história, NÃO resultado do novo573)

PR574DRAFT97aa91d545df32cbcb6076b3669c3fc233dafdc3/tree333ddc4deb51fd1758cb8f00593a31afe8fb8471/parentmain3e. Dois predicados calendário/23novas regressões, baseline5PASS18FAIL→23GREEN;14old→37focalGREENinclSaoPauloTZ;288boundarychecksPASS fora da contagemCI. OwnCI39080576526/job117536501485attempt1FAIL/ZEROretry:1378=[145,788,431,3,11]unitPASS/typesbuildexportmigrationrunner2xprivacyPASS; HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual23:54:19.5174338Z; fail23:54:40.3638911Zcreatedteamrendered apósPOST201→12GETERR_ABORTED/canceledtrue/corsnull/UI12unavailable—correta. Semjob/503/recovery/reload/logout/B/fulljourneyPASS; rootUNRESOLVED/nãoAPI-CORS-vendorprovado.

OwnAPK39080576491/job117536501043attempt1SUCCESS/ZEROretry:build2026-10-17T23:59:50.6491950Z/install2026-10-18T00:01:17.7474676Z/DEVICE_SMOKE_OK00:01:30.0505171Z withoutMetro. Ambosactualcheckoutdb80b5523a8d7889c6c9c318c0b17de8b1940ba2SINTÉTICO orderedparents[main3e,97aa]/tree333digual, NÃOHEADliteral. Artifact12119106701notexpired/expires2026-11-01T00:01:31Z ZIP28912115bytes/SHA256030c9be65cd67e12addd756fead5aca9dac3b2b282acf0e1a2c1bf5f6a80a8f0; individualAPK66161616bytes/SHA2563d561dee39968483d0d54fb3a74a3d38a6c1265876ca4cb91bea16c535caef9d/SHA256SUMS/BUILDINFOcommitdb80/release/packagefixed/metrofalse conferidos. ZIP≠APK. ManifeststaticSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480/min24target36/INTERNET/noexplicitcleartextnetworkconfig NÃOprova transporte/UI. 574NÃOmerged;mainAPKvalidado ainda567POST3e. Recibo integral PR574 preservado na nova evidência deste ciclo; nenhuma prova nativa de formulários/privacidade/SecureStore/físico.

### Fecho desta preparação / rastreabilidade

Arquivos funcionais alterados: scripts/ledger-completion-atomicity-e2e.cjs e apps/api/src/ledger-completion-atomicity.test.ts. HTTPshell573 já existente permanece byteidêntico; mainmobile/APIproduto/migrações/deps/lock/workflows/build/smoke intocados. Evidência LEDGER_MOBILE_REAL_JSON_2026-10-18.md +5originais/matrizappend. Requisito área6ledgerSIMULADO→complete/earningsAPI→rollbackvazio/recuperaçãopayable→loadEarningsreal→4tests+oldcontrols→CIpróprio/markers PENDENTES→evidência. Área7RLS/11API/12rastreabilidade também beneficiadas, NENHUMAaceita integralmente. Apenas10TÉCNICAINTERNOaceita12pendentes.

APK N/A SOMENTE mediante comparação integral de blobs/modes e grafo canônico expo-mobileprebuild→Gradle; não []/ausência de run/APK574emprestado. Rever todos paths/ancestrais/HEAD/base; mergeumaúnicavezexpectedSHA SÓCIcompletoSUCCESS e pósCIreal. Se falhar, manterDRAFT/semretryproduto, registrar log e avançar frente independente. Nova prova não garante resolver quota nem causaERR_ABORTED. Sem produção/PSP/dinheiroreal/providers/novosserviços/custos/credenciais/contratos/root/grants/RLSdisable/automaçãoextra/Activitymanualwrites. Próximo passo técnico: observar markers próprios no novoHEAD e fullCI; recibo final noPR antes de futura consolidação funcional append-only, sem commitautorreferente de status.


## Recibo primário integral574 — fonte https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/574 — histórico

## FINAL factual — privacidade mobile — OWN CI FAILURE / APK SUCCESS — 2026-10-18 UTC

PR574 DRAFT/NOTMERGED. HEAD `97aa91d545df32cbcb6076b3669c3fc233dafdc3`, tree `333ddc4deb51fd1758cb8f00593a31afe8fb8471`, parent/baseMAIN `3e098cd51cd2fd84f21e144a600a814a2cb1a150`, branchfix/mobile-privacy-calendar-20261017. SemREADY/merge/pós574/rerun/cancel. CIred não permiteintegração, mesmoAPKgreen; nãoemprestar567/571/573PASS.

### Correção e regressão comprovadas

SOMENTE2predicadosdate em privacy-requests.ts/privacy-actions.ts, BYTEIDÊNTICOSàAgenda(main): valida calendário ISO local antes deDatefinito. JSONimpossívelantes→READY/GENERATED/DEACTIVATED; agora leituraERROR/exportACKUNKNOWN/desativaçãoACKUNKNOWN apósUMPOSTbodylessinalterado, semautoGET/POSTrepeat. Seiscampos(createdAt/completedAtleitura, generatedAt/identity.createdAt/privacyRequests.createdAtexport, deactivatedAtACK)×3datasimpossíveis. NenhumAPIbug/PGinvalidrow/incidenteprodução/exploit é alegado.

23novasregressõesbaseline5PASS18FAIL;14oldcontrolssemassertalterado→RED19PASS18FAIL, GREEN37/37 emUTC eAmerica/Sao_Paulo, zeroFAILSKIPCANCEL. Controlesleapday2024/epochzero/offsetcruzaUTC/optionalcompletedAtnullmissing/vazioconfirmado/requirednullrejected/lateidentitydeadlinepreservados.288boundarychecks locais adicionaisnoshelpersreais(years1900/2000/2024/2025/2026/2100×Feb/Apr×days28..31×6fields)PASS, NÃOunitcountCI.
Reverse-substitution integralcomprovaTODOsourcefora2predicadosBYTEEXATO. Requests/paths/methods/JSON/headers/bodylessPOST/session/auth/current/deadline/ACKIDs/rejections/unknown/DSAR/retention/retry/ACL/API/SQL/RLS/React19.1.4/RN0.81.6/deps/lock/layoutinalterados. TelaPrivacidadeTOTALMENTEbyteidêntica; UNKNOWNjá impedeaceitação/clearSessionporseubranchexistente, NÃOprovaUIoulimpezarealSecureStore/Android. ApenashelpersREAIS+fixturesJSON/controlessessão, semprod/credenciaisreais/redeexterna.

### Own CI: FAILURE, não verde

[Run39080576526/job117536501485](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39080576526/job/117536501485), attempt1COMPLETEFAILURE,ZEROretry.
1378=[145Web,788mobile,431API,3CLI,11monitor]PASS/fail-skip-cancel0; typecheck/build/mobileexport/migrationrunner2x/privacyPASS. HTTPbrowserFAIL;PostSetupNodeSKIPPED/laterProductionTruthNOTexecuted. UnitPASS≠CIGREEN.
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual2026-10-17T23:54:19.5174338Z. FAIL23:54:40.3638911Zcreatedteamrendered/teamPOST201actual→12GETERR_ABORTED/canceledTRUE/corsnull/UI12unavailable/countsrates—correta. Vaga/job/503/recovery/reload/logout/B/fulljourneyNOTcompleted. NÃOECR/startup/novapermissiondenial/causaAPI-CORS-vendorprovada. BrowserrootantigoUNRESOLVED; nadaflags/imagens/security/CDP/Fetchguard/CORS/sandbox/LNA/deadline/assertalterado, não rerun97aa para verde.


### Own APK: COMPLETE SUCCESS, não prova de formulário nativo

[Run39080576491/job117536501043](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39080576491/job/117536501043), attempt1SUCCESS/ZEROretry. CanonicalBUILD SUCCESSFUL2026-10-17T23:59:50.6491950Z, actualinstallSuccess2026-10-18T00:01:17.7474676Z, DEVICE_SMOKE_OK00:01:30.0505171Z packagecom.predibeacon.mlivretrabalho.pilot/metro_required=false. API35/x86_64/pixel6/workflowcanonicaloldsmokeinalterados; failure-onlydiagnosticstepsnormalSKIPPED. Nenhumteste565offline/form/tap/keyboard/authsuccess/SecureStore/físico/VisualTruth,jornadaPrivacidadenativa,cleanSessionobservada ou produção é afirmado.

Nativeprimarycheckout2026-10-17T23:51:07.6453679Z `db80b5523a8d7889c6c9c318c0b17de8b1940ba2` SINTÉTICO orderedparents[main3e,HEAD97aa], tree333ddc4deb51fd1758cb8f00593a31afe8fb8471equivalente.NÃOHEADliteral. VerificadoindependentementedologCI. BuildInfoactualcommit_shadb80/release/packagefixo/metrofalse, não97aa literal.

Artifact12119106701/notexpired/expires2026-11-01T00:01:31Z, REALdownloadviaGitHubtool eapprovedblobnormalfiledownload. ZIP28912115bytes/SHA256030c9be65cd67e12addd756fead5aca9dac3b2b282acf0e1a2c1bf5f6a80a8f0 APIexact. INDIVIDUALAPK66161616bytes/SHA2563d561dee39968483d0d54fb3a74a3d38a6c1265876ca4cb91bea16c535caef9d, SHA256SUMS.txtconfere; ZIP≠APKindividual. BuildInfoUTC2026-10-17T23:59:51Z/checkoutdb80,version0.1.0. GeradoAndroidManifestSHAea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480, min24target36/INTERNET/semexplicitusesCleartextTraffic/networkSecurityConfig, igualhistóricobaseline. InspeçãoAXMLboundedstdlibread-only, NÃO redeobservada/UI/permissiondenial/SecureStore/piloto. ArtifactcandidatoNÃOmainAPK; latestvalidatedmaincontinua567POST3e. Scratchprivacy-calendar-local/574-own.zip.

### Checkout e revisão

CIprimarycheckout2026-10-17T23:51:27.4600757Z `db80b5523a8d7889c6c9c318c0b17de8b1940ba2` SINTÉTICO orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`97aa91d545df32cbcb6076b3669c3fc233dafdc3`], tree `333ddc4deb51fd1758cb8f00593a31afe8fb8471`igualcandidata, NÃOHEADliteral. Gitcommit/parents/treeconfirmados. Nativecheckout foi medido separadamente conforme reciboAPK abaixo, nãoPASSemprestado.
ALL13PRpathsremotosUTF8byteexact/modos100644; fullmain3e+571007+5735852prefix5originais+matrizpreservadosNO LUGARappend, notas3históricasoriginaismesmosblobs/modes SEMcópiacódigogatesnãointegrados. Recibo573finalECRantescheckoutconsolidado(ambasattempts,nãoSQLproof).1163outrosmainblobs/modesiguais;491of493existingmainnon-docsfora2validatorsiguais.247of249protectedinputsexistentesforados2validadoresiguais eNOVOtestmobile. APK N/A FALSO,mobilechanged; canonicalworkflow/build/oldsmokeinalterados eownAPKexigido. Ahead1behind0/mergebasemain3e/parentmain3e. Semdelete/originalresumido/metadatacommit/artificialactivity.

DuasPNGdesktopownCI (NÃOAPK), assinaturaPNG/SHA/bytes/dims1365x900independentementeconferidos, NÃOvisualinspected/nãoGitassets:
- login: 75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686bytes
- failure: 5f70bbc24744b927b9852454b3c4d0c3cafce393a0c19bd52a46ba7d580f6c28/132701bytes
Fonte39080576526attempt1/job117536501485FAIL/HEAD97aa/checkoutdb80/tree333d; scratchprivacy-calendar-local/574-own-web-captures.json. Nãoatribuirframes aAndroid/jornadaaprovada.

### Avanço independente durante bloqueio do browser

ApósCIfalhar, auditou-seárea6/clienteGanhos semalterarbranch/publicaroutrocommit. mainloadEarnings e testesatuaislidos;4modelosLOCALPASS no scratchprivacy-calendar-local/next-audit/ledger-consumer-model.test.mjs consomemJSONexplícitovazio/positivo/preservamobjetoexato e rejeitambindingtenant/assignment/ledgerid/amountincorretos/schemaerro. Isso NÃOéHTTP/PG/rollback/nativeproof,nempartede788mobileCI. Próximociclofuncionalpodeestender573 comnovocaso legítimo queconsumaosJSONHTTPjáobtidosdeearningsapósrollbackeapósrecuperaçãoatravésdoloadEarningsREALinalterado,semnovasPOST/SQL/policy/oldassertchanges. Fixture573ainda nãoexecutouSQL porquotaECRattempt1+únicoretryattempt2; não rerun5852sóparaverde,nãomudarregistro/workflow/credentialsparacontornarquota.

ConsultaAOSPREADONLYnãoachouprovasuficientedecomandoEthernetSHELLexatoSDK35; acessoaoarquivoandroid15EthernetShellCommandinacessívelviawebtool/nãoéprovaausência. APIsetEthernetEnabledexigepermissõesdocumentadas (fonteprimária https://android.googlesource.com/platform/packages/modules/Connectivity/+/refs/heads/main/framework-t/src/android/net/EthernetManager.java ), nãoautorizabypass/reflection/Javahelper/grant/root. Nenhumcomandoderede/flag/permissionmudado/novadenialexecutado; #565strictnoGLOBAL/defaultRoutesmantido. Nãoalegarisolamentonativoresolvido.

Somenteárea10standaloneTÉCNICAINTERNOaceita,12áreassemaceiteintegral; estaentregamelhoraáreas8/11/12semfechamento. Externos215219220224228OPEN;558560565568570571572573separados/semreadymergereruncego. Semprodução/Railway/Neon/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal/Activitymanualwrites. GitpreparaçãoPENDINGagorahistória; consolidarFINALsóPRÓXIMOCICLOFUNCIONALsemmetadata/image/statusautorefcommit.


---
## Preparação anterior à execução própria (HISTÓRIA)

## Preparação funcional — privacidade mobile

HEAD 97aa91d545df32cbcb6076b3669c3fc233dafdc3/tree333ddc4deb51fd1758cb8f00593a31afe8fb8471/parentmain3e098cd51cd2fd84f21e144a600a814a2cb1a150. DRAFT até OWNCI+OWNAPK HEADexato/reviewfresh; apósmerge medirpósreal. Apenas2predicadosdate com regraBYTEIDÊNTICAAgenda; nenhuma mudança endpoints/bodylessPOST/JSON/auth/session/deadline/DSAR/retry/retention/API/SQL/RLS/JSX/deps/lock/workflow/nativebuild.

23newtestsbaseline5PASS18FAIL→23GREEN;14oldcontrolssemassertalterado→37GREENinclSaoPauloTZ. Protege6campos(leitura2/export3/ACKdeactivation1)contra3calendáriosimpossíveis; valoresleap/offset/epoch0/nulloptional preservados. Éteste dehelpersREAIS+JSONfixtures, nãoAndroid/SecureStore/produção/PGinvalidrow. CI esperado1378=[145Web,788mobile,431API,3CLI,11monitor]PENDENTE/APKobrigatórioNÃO N/A. Mobilechanged, nãoemprestarAPKantigo.

Fulloriginais5+matriz/main3e+571+573históriapreservadosappend+evidênciaMOBILE_PRIVACY_CALENDAR_2026-10-17.md. 3oldnotasblobsiguaiscopiadoscomoHISTÓRIAsemcopiarcódigogatesnãointegrados571/573. 573nãoexecutouprodutoECRquotaapósúnicoretry,nãorerun5852. SemPASSemprestado/securityweakening/serviços/custos/produção/provider/PSP/dinheiroreal. Apenas10aceitetécnicointerno;12pendentes.
