# Prazo real nas leituras do Histórico de suporte

## Auditoria e correção do prazo de leitura do Histórico de suporte (2026-10-11 05:01:15 UTC)

A auditoria do código atual encontrou operation abort-only em SupportHistory.loadWork e selectWork: uma promise de auth, fetch, response.json ou auth final que não resolve conserva loading depois dos15s. Bateria nova17cenários com handlers pré-JSX e loadAgenda/loadSupportCases reais: antes10falhas/7sucessos; depois17/17PASS. Execução local com contratos existentes:37tests/37pass/0fail (17novos+20existentes), Node24, fixtures explícitas. Não é render ReactNative, transporte real ou aparelho físico.

O timer agora aborta e publica error somente se id/generation continuam atuais, para a lista de trabalhos e os casos do trabalho escolhido. Retentativa é explícita. Testes exercitam quatro fases pendentes distintas por leitura, rejeição de fatos atrasados, retry antes de resolver resposta anterior, timers obsoletos, blur/refocus sem GET antigo, troca de identidade e mesmo assignment ID em tenants distintos. Registros recebidos são conservados na retentativa; nenhum POST enviado. JSX/StyleSheet/SupportRequest e protocolo durável de envio/retomada, navegação e todas as escritas permanecem byte-identical; o diff é exclusivamente dois callbacks de leitura e assinatura interna. GeneralSupport/SupportRecovery/DeclaredCapabilities já possuem callbacks de erro próprios na main e foram inspecionados: não repetir correção onde já existe.

Estado consultado: main 83d5df28f11395522aa5e8e776a38bab491e0a91; #420/#421/#422/#423 abertas, heads e bytes próprios revisados; CIs próprios aprovados e completos:
420 56e8229ada3bdb44042b9d208357f10ef91cdad8 CI38112711675/job114391414713 tests4/497/145/3;
421 66223caf499c01042b40fba82f96da301f0a429b CI38112820567/job114391741740 tests4/510/145/3;
422 0e768ab142665d0f088d287b6db73002900a8b98 CI38112956435/job114392135215 tests4/528/145/3;
423 68535d37567b898dfd1f6f2bac078d52fd7f9aa8 CI38113140672/job114392671499 tests4/571/145/3.
Todos incluem passos/logs de typecheck/build/export/migrations/privacy/HTTP; a cronologia real PostgreSQL passou inclusive em423 às04:58:09.1185913Z. APKs38112711679/38112820608/38112956424/38113140682 em execução:420/421 já em install/launch,422/423build; isso é acompanhamento e não bloqueio/sucesso. Pós419 comprovado anteriormente no SHA real83d5df28f11395522aa5e8e776a38bab491e0a91 e permanece documentado.

Próxima ação: publicar fix/support-history-read-deadline sobre head423 68535d37567b898dfd1f6f2bac078d52fd7f9aa8/tree2d8d47f20eb0af7ff93578d9793a8b9b2fb84521, basefix/secondary-read-deadlines; conferir bytes e diff e próprios CI esperado4web/588mobile/145API/3CLI e APK standalone no head exato. Integrar420→421→422→423→esta fatia em ordem somente com gates próprios aprovados, retargetmain/reconsulta eventual, revisão de diff, pais/tree/main e gates pós-merge no SHA real. Nenhuma integração antecipada; nenhum rerun de job em execução ou repetição419.
Auditoria seguinte: interpretar Copilot e salvar Disponibilidade ainda têm timers abort-only em POST; avaliar contratos/fase/resultado incerto antes de qualquer liberação de busy/reenvio. Não deduzir que POST de interpretação executa ação crítica; verificar backend sem chamar serviço externo. Preferências, ajuda sem vínculo, ML/dados e enterprise ainda precisam definições/provas externas. Físico Android/E2E/VisualTruth, SecureStore/teclado/payload/restart, pentest independente, PSP/KYC sandbox/FIN-RISK/provider/TRUST e Web/Railway eventualmente pago continuam separados e abertos. Um impedimento parcial não encerra o projeto. React19.1.4/RN0.81.6/lockfile/tenant/RLS/desenho canônico e dinheiro/infraestrutura sem novas cobranças preservados. Documento ORIGINAL v1.104 atualizado em lugar com todo histórico, sem nova versão/resumo substituto.

## CI423 comprovado

```json
{
  "head": "68535d37567b898dfd1f6f2bac078d52fd7f9aa8",
  "run": 38113140672,
  "job": 114392671499,
  "counts": [
    4,
    571,
    145,
    3
  ],
  "http": "2026-10-11T04:58:09.0931902Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
}
```
