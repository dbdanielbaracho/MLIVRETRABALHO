# Web — ACK contratual de membros de equipe — 2026-10-12

A fonte real dos handlers addTeamMember/removeTeamMember no predecessor497 e TeamsController.add/remove foi reconsultada. HTTP201/200 com {} produzia revision+1 e nenhum erro em ambos handlers. Três testes source-real pré-JSX reproduziram RED1PASS/2FAIL: dois cenários negativos falham e controle positivo legítimo passa.

TeamsController.add retorna teamId/professionalId exatos, inclusive replay idempotente; remove retorna removed:true, sem IDs ecoados. Novo helper team-membership-ack.ts exige exatamente esse contrato. Addition exige UUIDs/string e bindingexato; removal exige objeto nãoarray e removed booleantrue. Não inventar IDs no retorno remove nem rejeitar replaylegítimo.

addTeamMember agora valida ACK antes de refresh. removeTeamMember mantém URL/DELETE/headeroriginais mas lêJSON/valida removed:true antes de refresh. A função remove genérica/talentpool permanece intacta. ACK incerto mantém seleção/revision, mostra orientaçãoAtualizardados/conferirequipe e não repete escrita. Não afirmar que operação não foi aplicada. Catch/finally continuam protegidospor contexto vigente de sessão/token/tenant/role/unmount. Nenhuma mudança API/RLS/roles/payload/policy/backend.

Seisregressões novas: dois negativos reais, controlepositivo payload/headers/method/refresh, UUID/replay/removalcontrato, HTTP400/401/403/404/409/429/500, perda rede/JSON uma chamada. SuiteWeblocal77/77PASS mantendo71anteriores, helpers/tenantreset/signin/mutaçõesstales/leituras preservados. Fixturesdeterminísticas nãoReactrender/browser/SQL/físico.

Predecessor497 MERGED1b8a9deeec5d3211f1c946aba679c3cb48d59a7f, pais[107cfb3a81487d37f78e3176cd1dd9d567719d6c,40b66a4045f6f33dac9623e927a369346809f17c], tree988e365586b49e77e9a606f37d4135b0e0b57c19 igualcandidata/main; ownCI38267049611/job114871723175 SUCCESS71/731/385/3/10=1200 e todossteps/HTTPPostgres. Pós38267610320 EMEXECUÇÃO neste snapshot, não PASS.496post38266743335/job114870718162 SUCCESS1194/todossteps/HTTPPostgres no107cfb... real.

Branch fix/web-team-membership-contract-ack-20261012. ExigirCIpróprioNOVOhead77/731/385/3/10=1206 todossteps+HTTPPostgres; integrar sódepoispost497green. APK N/A somenteinputsprotegidosSHA/modesidênticos. DVToriginal/memória/checkpoint/ledger/registry preservadosporapêndice e evidência no mesmociclo. FinalreciboPRbody/continuidade, semloopmetadata. Gatesexternosfisico/VisualTruth/pentest/providers/PSP-KYC/FINRISK/WebpagoOPEN. Semserviço/custo/PSP/dinheiroreal/produção/deploypago.
