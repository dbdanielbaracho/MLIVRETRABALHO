# Checkpoint de execução autônoma — MLIVRETRABALHO

## Estado verificado

Snapshot 2026-10-10 12:40 UTC: main738073540f7ff6f9156b704a95c7a5616643307e (#387/v1.76) permanece. Autoridade README→Documento/memória/checkpoint relida e main/PR391/gates/head/tree reconsultados. Sem repetir #351–#387, pós-merge e artefatos históricos preservados emjournalsanteriores.

PR388 head af42616736b1850d7549073d89cd5500dbe13880, base main, CI38050976291 SUCCESS; APK38050976276 tentativa2 em execução após único retry autorizado do job114209868114 por falha input Broken pipe/exit224 anterior à instalação/app; tentativa1diagnóstico11669444402/digest sha256:4863fd6450d5217c52b9fcb7dc9c70e1a6a87efbb782984c48ddd3e532360fa4 preservado no journal1235Z. Não repetir retry automaticamente nem aceitar build isolado.

PR389 head71987cb7beebfba1f64a15a3dcbb6e00471fc6ea, basefix/profile-availability-response-deadline, CI38051472605 SUCCESS/255mobile73API; APK38051472614/job114211305922 smoke em execução. PR390 head97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65, basefix/signup-response-deadline, CI38051941067 SUCCESS/268mobile73API; APK38051941014/job114212662952 smoke em execução. PR391 head d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/treeef8bc3221d354d4cd544453df5b59fec4132df38/pai97bfd3f8344cc5447b6b0eae1e83a2e098ad9a65/basefix/agenda-company-response-deadline. CI38052634310/job114214702463 SUCCESS todos passos/typecheck/build/export/tests/migration/privacy/HTTP,275mobile73API4Web3CLI; catálogoHTTP PASS2026-10-10T12:39:41.8817755Z, suportePASS12:39:43.1976088Z, ProductionTruth12:39:48.9216490Z. APK38052634388 em execução. Os13arquivos remotos391 conferidos byte a byte e diff produto íntegro revisto. Nenhuma dessas PRs integrada neste snapshot.

Esta alteração tem próprioSHA/PR/runs somente após publicar; não registrar número antecipado nem CI futuro aprovado. Main238mobile é distinta dos275do head391; próprio API81 da nova fatia só será confirmado no seu run.

## Item atual — validação de perfil antes da escrita

PUT /professional-profile chamava trim em campos não validados e lançava Error genérico para displayName vazio. Execução do método real da base391 com auth/db simulados confirmou Error display_name_required para vazio e TypeError para displayName/homeCity numéricos, zero queries; isso não é BadRequestException e o tratamento padrão Nest classifica como falha de servidor. professionalProfileInput agora recebe unknown, exige objeto não array e nome string não vazio; opcionais homeCity/primaryRole são string/null/ausentes. Preserva trim, branco→null nos opcionais, identidade exclusivamente autenticada e query/retorno reais. Controller autentica primeiro e rejeita entrada inválida com BadRequestException('professional_profile_invalid')400 antes de qualquer escrita. Falha real do banco propaga, nunca é mascarada como validação.

Não acrescenta tamanho máximo arbitrário, enum de função, campo/propriedade de tenant, decisão de KYC ou mudança de schema/RLS. Campos extras não impõem id/identityId; mesma chave ON CONFLICT(identity_id), mesma fonte auth e GET. Validação rejeita tipos inválidos em vez de coerção.

8regressões novas:4helper e4controller (400/zeroquery,401antesdevalidar, identidade/trim/null/ACK, falhaDBpropagada). PASS8/8 local com transformação TypeScript e adaptador explícito de decorators/exceptions Nest; não é execução Nest completa nem HTTP/DB. Primeiras execuções do adaptador local falharam por escape de regex/export de stub e foram corrigidas, sem mudar expectativas/testes/produto; só a execução posterior8/8 é prova local. CI compila e executa os próprios testes com Nest real:81API esperado (73anteriores+8), confirmação só após run sucesso/log no próprioSHA. Novo fixture HTTP restrito a localhost e DB efêmero de CI cria2identidades, verifica400malformed/semcriaçãooualteração,401sem auth antes de validar, trim/null, atualização mesmoID e isolamento identidade; registrado no step HTTP do CI. bash -n PASS; HTTP local ainda não executado neste ambiente sem Nest/PostgreSQL instalados. Nenhum perfil/conta/dado real alterado.

Fatias apps/api/src + scriptHTTP + CI/docs apenas. APK próprio N/A pelo pathfilter efetivo standalone-pilot-apk.yml: nada em apps/mobile/**, build/smoke/workflowAPK/rootpackage/lockfile/workspace. Árvore mobile deve continuar byteidêntica à base391 e APK do predecessor391 continua obrigatório/pendente; N/A não é APK aprovado. React19.1.4/RN0.81.6/lockfile/backendtenant/RLS preservados.

## Próxima ação concreta e retomada

Publicar fix/profile-input-validation sobre ownhead391d3811eb5bbcb119b59fb2e9d769f1c242a0e5c6e/treeef8bc3221d354d4cd544453df5b59fec4132df38, basefix/assignment-response-schema. Verificar conteúdo/tree/diff/head e próprioCI/typecheck/build/testesAPI/Nest/HTTP local81esperado; APK N/A por paths/mobileidêntico. Atualizar evidência de gate real quando existir.

Integrar388→389→390→391→esta fatia em ordem após próprios gates aplicáveis aprovados no SHAexato; freshmain/base/mergebase, revisão íntegra, expectedhead. Retarget filho main só após predecessor. Eventualmergeablefalse reconsultar; conflito real reconcileancestral+novosgates sem perda. Verificar pósmerge main/pais/tree eCI/APK aplicáveis; nenhumrunning/bloqueioparcial/fimderodada encerra projeto.

Confrontar próximos requisitos/rotas/estados reais com desenho canônico e checkpoint, sem inventaratividade nem concluir por ausênciaPR/issue. VisualTruth físico original/dados/estados/cobertura completa OPEN; piloto/device/pentest/providers/TRUST/PSP/FIN-RISK/WEB-ARCH separados. Não dinheiro/PSP real/cobranças/deployinfra paga. Rotina existente permanece até conclusão integral comprovada/ordemexpressa; sem nova rotina ou promessa24h.
