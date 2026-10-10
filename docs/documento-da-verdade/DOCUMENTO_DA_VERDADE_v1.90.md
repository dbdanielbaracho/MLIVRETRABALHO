# MLIVRETRABALHO — Documento da Verdade v1.90

**Status:** NORMATIVO — DELTA SOBRE v1.89
**Data:**2026-10-10

## Ajuda no contexto do trabalho profissional

A Agenda, que representa o fluxo contextual Dia do Trabalho da baseline v1.25, acrescenta Solicitar ajuda como ação secundária ao lado de Conversar e Segurança. Abre o mesmo SupportRequest da v1.89 dentro do card do trabalho real. Check-in/check-out/estado/avaliação continuam como ação primária; não há nova rota ou mudança de localização, lifecycle, APIs ou regras de pagamento.

openSupport exige lista pronta e a sessão que a carregou; busca a linha real por tenant+assignment na lista e usa essa linha, sem aceitar título/status/tenant inventados do chamador. Antes de abrir reconsulta auth com deadline15s e guards de epoch/request. Troca de usuário invalida lista e painel; trocar trabalho/tenant com mesmo id, fechar, recarregar dados ou perder foco invalidam uma abertura anterior. Abrir/fechar o painel não envia chamado nem navega; criação e retry continuam ações humanas do protocolo v1.89.

SupportRequest recebe trabalho e lista reais e autorização da fonte. Usa o slot durável por identidade, tenant/chave/conteúdo originais, ACK verificado, estados de erro/unknown e retomada explícita. Confirmação válida mostra aviso de chamado registrado e indica Perfil > Ajuda e suporte para acompanhar respostas. Não promete atendimento imediato, prazo ou24/7. Não duplica o protocolo nem implementa POST direto na Agenda. Fechar/atualizar não apaga uma tentativa incerta.

Sete regressões novas de handlers reais pré-JSX com fixtures explícitos: row real vs injeção; mudança de sessão; deadline auth; resposta tardia ao trocar tenant com mesmo assignment; fechar invalida abertura concorrente; blur; recarregar fecha contexto e mantém load/lifecycle. PASS29/29 local no conjunto de agenda (22anteriores+7novos) em UTC e America/Sao_Paulo. Nenhum HTTP real/Native render; typecheck/export/CI próprios esperados352mobile (345+7)/105API/4web/3CLI e APK standalone exato obrigatórios.

Fontes consultadas antes de alterar: Agenda atual, Início profissional, Documento v1.25 (fluxo contextual e hierarquia) e v1.26 (4áreas inferiores fora da rolagem), auth.service.ts real e contratos de envio/persistência. StyleSheet da Agenda byteidêntico à main; ProfessionalNav permanece fora do ScrollView. React19.1.4/RN0.81.6/dependências/lockfile/RLS/tenant/canônico preservados. Não usar teste de handler para alegar fidelidade física completa.

Escopo é ajuda vinculada ao trabalho no Perfil/Agenda; suporte geral sem trabalho, estados físicos de SecureStore/keyboard/restart, confirmação visual original integral e Preferências continuam pendentes. Nenhum chamado real foi criado pelo agente, nem dinheiro/PSP/custos/deploy pago habilitados.

## Estado verificado

Verificação de 2026-10-10, 18:00 UTC: main60759a41bfb6a90aed80d85045b9ec837c50a3ad/treef222de6ba92646e70d3aa99b5bcd513097768d5f, Documento da Verdade v1.87. #396–398 já integradas e pais/árvores iguais aos heads aprovados conferidos em1742Z/v1.88; não repetir.

Pós-merges no SHA real: #396CI38072758220/job114273405415 aprovado (298mobile/88API/4web/3CLI); #397CI38072798277/job114273523384 aprovado (298/98/4/3); #398CI38072830711/job114273616278 aprovado (298/105/4/3). Todos os passos e logs foram conferidos, inclusive migrations e contratos HTTP/PostgreSQL. APK pós-merge #39638072758154 ainda em execução; não substituí-lo por APK pré-merge. #397/#398 API-only: APK próprio N/A por paths efetivos e árvore mobile idêntica à396.

Retry único pós-merge #388run38054154641, tentativa2/job114268524350, recuperado com todos os passos aprovados. Instalação Success17:42:32.8794730Z, DEVICE_SMOKE_OK sem Metro17:43:22.9345817Z. ZIP validado11676949709, sha256:813823c871d6abb8ebebfd85e28fae00941db92a4160acab5f041e8eb90d9085, não expirado, head de merge4cfa80fbe784d087b3aad49738a5df7c30c76666 correto. ZIP é artefato, não digest individual do APK. Diagnóstico da tentativa1infra preservado11671065789/digest78996502e4e43543f065ec334594068669c0dc7a7acc523b33aa780681f250bd. Não solicitar outro retry; esse pós-merge está comprovado no emulador, sem fechar gate físico.

#399head7bd91e24c1c0428d0ea8caa762fe995ba0271374/tree18edb4798cccb9094653010a55f17aad898a4abc, base main, mergeabletrue. CI38072920913/job114273878473 aprovado:316mobile/105API/4web/3CLI e todos os passos/HTTP/migrations. 12arquivos remotos conferidos byte a byte. APK próprio38072921018 em execução; não integrada. Diff próprio deve ser revisado fresco antes de merge. Próxima etapa depende desse storage e dos predecessores já integrados.
#400head9eeaf89ca2e327bc756610ebd4aebb414840c21b/treec92641013a9228efe3ae44932e7ec3302438a680, basefix/support-intent-durability, mergeabletrue. CI38073733288/job114276258891 aprovado:345mobile/105API/4web/3CLI, typecheck/build/export/migrations/HTTPPostgreSQL, todos os passos/logs. 14arquivos remotos byteidênticos; patch revisto inclusive ligação SupportRequest/SupportHistory. APKpróprio38073733274/job114276258739 em build; #400nãointegrada. APK39938072921018/job114273878889 e APKpós39638072758154/job114273404967 ainda em smoke; CI399 já316/105/4/3aprovado.

## Próxima ação concreta

Publicar fix/agenda-support-context sobre ownhead4009eeaf89ca2e327bc756610ebd4aebb414840c21b/treec92641013a9228efe3ae44932e7ec3302438a680, basefix/professional-support-submission. Conferir head/tree/PR/runs, bytes remotos e patch; não antecipar número/gate. CI352mobile/105API e APK standalone próprios devem passar no SHA exato.

Integrar399,400 e esta etapa em ordem, sócom CI/APK/diff/gates próprios aplicáveis; retargetmain depois de predecessor integrado e reconsultar estado eventual. Não confundir mergeablefalse inicial com conflito real. Após cada merge confirmar pais/tree/main e acompanhar CI/APK pós-merge no SHA real. APKpós396 emexecução não é encerramento nem bloqueio definitivo; 388pósretryrecuperado, não repetir.

Próximo produto independente: suporte geral para profissional ainda sem trabalho. GET/me atual fornece memberships só com tenant_id/role, sem nome de espaço/empresa; inspecionar schema/endpoints atuais e fornecer contexto com nome real antes de interface de escolha, sem UUID manual ou tenant padrão. Atualizar requisitos/evidência e testar isolamento se ampliar API. Preferências ainda requer confronto com referência canônica e APIs efetivas, sem inventar políticas.

VisualTruth físico original/dados/estados/cobertura completa, aparelho/piloto/distribuição, pentest e providers/TRUST/PSP/FIN-RISK/WEB-ARCH continuam abertos e separados. Manter continuidade e checkpoint; não desativar por pendência parcial, erro transiente, ausência dePR ou fim de rodada.

Evidência AGENDA_SUPPORT_CONTEXT_v1.90.md; requisitos REQUIREMENTS_LEDGER_DELTA_v1.90.md; registro1800Z. Baselines anteriores vigentes.
