# MLIVRETRABALHO — Documento da Verdade v1.84

**Status:** NORMATIVO — DELTA SOBRE v1.83
**Data:**2026-10-10

## Disponibilidade — entrada/identidade/intervalo

Durante o confronto da home com contratos reais, AvailabilityController.add recebeu body tipado em TypeScript sem validação de tipo runtime. Execução do método real com auth/db simulados provou body null→TypeError zeroqueries, e startsAt42/endsAt43→parâmetros numéricos encaminhados ao INSERT após Date coerção epoch. Essa entrada não satisfaz o contrato timestamps string e pode resultar falha de banco, jamais disponibilidade factual.

availabilityInput recebe unknown, exige objeto não array e duas strings de datas interpretáveis com ends>starts. Preserva valores/offsets originais; sem formato/limite novo nem regra future-only/duração imposta. Controller autentica antes de validar e responde BadRequestException('availability_range_invalid')400 antes de consultar perfil ou escrever. Perfil inexistente conserva professional_profile_required400; fonte identity→profile exclusiva da sessão, INSERT ON CONFLICT(professional_id,starts_at,ends_at) idempotente e GET/network-shared existentes inalterados. Bodyextra professionalId/tenantId ignorado, não sobrescreve contexto.

7novas regressões (4helper+3controller) PASS7/7local via adaptador explícito TypeScript/decorators/exceptions Nest; controller verifica400semquery,401primeiro, binding/timestamps/ACK/ONCONFLICT e perfil ausente. Não é Nest/DB completo local. Novo fixture HTTP sólocalhost/DBefêmeroCI cria2identidades/perfis, verifica null/array/tipos/datas/range invalidos400semjanelas,401primeiro, criação com valoresreais, segunda criação mesmointervalo retorna mesmoid e outraidentidade não vê janela. bash-nPASS; HTTP/Nest/DB próprios pendentesCI. Próprio88API esperado (81anteriores+7), só confirmado após run/log sucesso no próprioSHA. Nenhum dado/perfil/disponibilidade real alterado.

Mudança API/helper/tests/scriptHTTP/CI/docs apenas. APK próprio N/A pelos paths do workflow e mobiletree deve permanecer idêntica à394; não isenta APK394 nem implica APK aprovado deste código mobile herdado. React19.1.4/RN0.81.6/lockfile/tenant/RLS preservados.

## Evidência e continuidade

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

Evidência AVAILABILITY_INPUT_VALIDATION_v1.84.md; requisitos REQUIREMENTS_LEDGER_DELTA_v1.84.md; journal EXECUCAO_VERIFICADA_2026-10-10_1257Z.md. Baselines anteriores seguem vigentes.
