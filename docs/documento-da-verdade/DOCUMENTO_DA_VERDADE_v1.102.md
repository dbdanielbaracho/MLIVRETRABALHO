# MLIVRETRABALHO — Documento da Verdade v1.102

**Status:** NORMATIVO — DELTA SOBRE v1.101
**Data:** 2026-10-10

## Deadline efetivo em quatro leituras principais

Início profissional, Trabalhos, Ganhos e Início da empresa apenas abortavam fetch após15s; auth, fetch, JSON ou auth final que ignorassem abort mantinham loading.28regressões dos handlers reais pré-JSX reproduziram20falhas/8pass antes da correção. O timer agora publica erro apenas no foco/request atual, invalida autorização/contexto de ação quando aplicável e impede aplicação de ready após expiração. Callback antigo após blur/retry não modifica o novo snapshot.

Home marca perfil/agenda/ganhos/disponibilidade/oportunidades/passaporte indisponíveis, sem nomes, contagens, dinheiro ou listas vazias inventados. Trabalhos invalida autorização exibida e mostra erro; Ganhos mostra indisponibilidade, sem transformar falha em zero. CompanyHome invalida displayedContext/tenant e marca dashboard/ativos/concluídos indisponíveis. O timer com callback é exclusivo da leitura; operações existentes sem callback continuam apenas abortando transporte.

JSX e objetos StyleSheet das quatro telas preservados. Corpos de interest/rating/prefer/signout e todas as mensagens/contratos/guardas de escrita foram comparados e preservados. Nenhum POST de interesse/avaliação/preferência/logout, pagamento ou escrita de ganhos é iniciado pela mudança. Não se reivindica solução do prazo de mutations pendentes, descarte de resultado incerto ou retry automático.

PASS37/37 local:28novos +9session-context. Fixtures explícitas de hooks/auth/fetch/timer e helpers reais; cada tela cobre auth/fetch/JSON/auth final pendentes, no HTTP após auth expirada, rejeição de ready tardio, blur/novo foco/deadline antigo/retry e mudança de owner/company. Sem renderReactNative ou APIs externas. CI próprio esperado452mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP e APK standalone próprio obrigatórios; pendentes antes de publicar. React19.1.4/RN0.81.6/lockfile/tenant/RLS/scopes existentes preservados. Desenho/dados/estados no aparelho continuam Visual Truth aberto.

## Estado verificado

Verificação em2026-10-10 23:24:23 UTC: main4b797cb19dc9a7f498a86bd5ba98f003d3239991/tree8be87c3522a1f0b1b65d0e5bf30a0026f77693bf, Documento vigentev1.100. #401–411 integradas; todos os CI pós-merge aplicáveis comprovados por passos/logs/contagens/typecheck/build/export/migrations/HTTP no SHA real. Pré-merges/pais/árvores/digests em v1.100/v1.101 e evidências, sem repetir integração ou substituir pós-gates por pré-gates.

| PR | Merge real | CI pós-merge comprovado (web/mobile/API/CLI) | APK pós-merge |
|---|---|---|---|
| #401 | 0ee519ee064087802ad67cef4c96be4d97165e14 | 38094002384/job114336027866: 4/352/105/3 | 38094002404 em execução |
| #402 | 4420c9b6b192ae9fc1cdd2a8d07198ba64b23b39 | 38094031044/job114336112406: 4/352/110/3 | N/A: paths/mobile equivalentes |
| #403 | 694991dc62ed3292be501d90661ab16aecd2b3a8 | 38094055691/job114336187752: 4/369/110/3 | 38094055730 em execução |
| #404 | 94053d598ad5f2a3c4402181577a5dd6eafeb509 | 38094078457/job114336251332: 4/377/110/3 | 38094078455 em execução |
| #405 | f82251ad97e11bf2de2745fba7acee7d3aa5e6ac | 38094096342/job114336299768: 4/377/119/3 | N/A: paths/mobile equivalentes |
| #406 | 3edd8067280fe001f25cabae5c704de91abffc9b | 38094118894/job114336366057: 4/377/131/3 | N/A: paths/mobile equivalentes |
| #407 | 60a49f2322dad50d0c0d83de5117cfc7d74adbd5 | 38094135415/job114336415459: 4/377/140/3 | N/A: paths/mobile equivalentes |
| #408 | 2ffaa52836a5c2a181353bddaee7f4547464de0a | 38094159144/job114336485319: 4/383/140/3 | 38094159162 em execução |
| #409 | d5a1a799189fd4ca26b4ad785db4c12a1ab18b14 | 38094180653/job114336548733: 4/396/140/3 | 38094180701 em execução |
| #410 | 104fdd9aef14eec9530d5df609da3d4f498c03d7 | 38094197753/job114336599695: 4/408/140/3 | 38094197754 em execução |
| #411 | 4b797cb19dc9a7f498a86bd5ba98f003d3239991 | 38094465582/job114337396456: 4/408/145/3 | N/A: paths/mobile equivalentes |

#411 pósCI38094465582/job114337396456 aprovado408mobile/145API/4web/3CLI; marker23:19:04.1028281Z comprova semana real PostgreSQL terça/quinta em ordem. OwnAPK N/A por paths e apps/mobile15f3227015d480516a847308f59eb95e8b408796 idêntico410. Não dispensa pósAPKs anteriores nem aceite físico.

#412 ABERTA, base main, head2318c8606a7770ebbf0cbd3e559aa8cbbdd13686/tree8e61d924a88647eb1e24494a84ac26042fc1fbc9.12arquivos remotos byteidênticos e diff revisto. CI38094564390/job114337698890 success no SHA exato, todos os passos/log completo:424mobile/145API/4web/3CLI, typecheck/build/export/migrations/HTTP. Marker23:20:49.8820572Z da cronologia real. APK próprio38094564411/job114337699062 em build na reconsulta23:23UTC; não integrada. Documento v1.101 é delta dessa branch, ainda não vigente na main.
PósAPKs40138094002404/job114336028036;40338094055730/job114336187885;40438094078455/job114336251341;40838094159162/job114336485119;40938094180701/job114336549165: build aprovado/device smoke em execução23:23UTC.41038094197754/job114336599660 ainda build. Acompanhar sem rerun enquanto executam. Emulador e ZIPdigest não são aceite físico nem digest individual APK.

## Dependências

Visual Truth físico (desenho original, dados e todos os estados, cobertura completa), Native/SecureStore/teclado/payload/restart e piloto/distribuição, pentest independente, providers/TRUST, PSP/FIN-RISK e WEB-ARCH permanecem separados e abertos. Não confundir CI/emulador/merge com deploy ou conclusão integral. Sem dinheiro real, PSP habilitado, nova cobrança, infraestrutura ou deploy pago.
Preferências: falta contrato de campos/semântica/escopo/persistência/efeito de matching; não inventar defaults nem renomear capacidades como preferências. Ajuda nova sem membership: falta autoridade por identidade/isolamento/retenção aprovada, sem tenant global arbitrário ou bypass RLS. Forecast/no-show ML depende de dados reais e validação; integrações enterprise precisam alvo/contrato. Sandbox/provider e aparelho/pentest dependem evidência externa. São impedimentos parciais, sem bloquear correções seguras independentes. Issue214closed confirmado19:00UTC;215/219/220/224/228open; ledger base já se declara snapshot histórico2026-09-24.

## Próxima ação concreta

Publicar fix/primary-read-deadline sobre head4122318c8606a7770ebbf0cbd3e559aa8cbbdd13686/tree8e61d924a88647eb1e24494a84ac26042fc1fbc9, basefix/talents-safety-read-deadline. Conferir bytes/diff/CI452mobile/145API eAPK próprios no SHA exato; não antecipar PR ou aprovação. Integrar412 somente com próprio CI/APK completos; verificar main/pais/tree e pós-gates. Depois retarget esta fatia para main, reconsultar estado eventual/merge-base tree equivalente e integrar somente com gates próprios; verificar pós-merge no SHA real. Não repetir401–411.
Continuar pósAPKs401/403/404/408/409/410 e412native próprio enquanto executam. Próxima auditoria concreta: leitura da Agenda e três leituras de Equipes (base, membros e alocação), cujos timers somente abortam; reproduzir prazo/foco/seleção/session/tenant com handlers reais antes de alterar. Empresa loadContext é leitura de credencial sem deadline/catch: reproduzir estado/retry antes de modificar. Mutations/availability/save/logout precisam conservar resultado incerto/guardas e não duplicar escritas; nenhuma mudança de mutation está autorizada por estas provas de GET. Preferências/ajuda nova semmembership e gates físicos/providers permanecem impedimentos parciais especificados, sem inventar atividade nem encerrar rotina.
