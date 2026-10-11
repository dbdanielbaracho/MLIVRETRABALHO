# Evidência — prazos de leituras secundárias

## Atualização incremental — leituras secundárias (2026-10-11 04:55:46 UTC)

Foram reproduzidas falhas de prazo em Membros, Substituições, Relatos de segurança, Pagamentos (somente reconciliação GET) e Privacidade (somente lista GET). Primeira bateria40cenários:25falhas/15sucessos no código anterior, sempre loading em vez de error quando auth/fetch/JSON/auth final não resolviam. Após correção:43novos cenários aprovados, incluindo preservação de rascunhos e flags incertas; conjunto local94/94 (43novos +51contratos existentes), Node24 com fixtures explícitas e handlers/helpers reais.

Membros/Substituições/Segurança: operation aceita callback opcional somente nas leituras load; o prazo15s invalida context/snapshot e publica error das respectivas seções somente na geração/seq atual. Substituições/Segurança conferem também geração/seq/abort imediatamente depois da credencial antes de tocar transporte. Privacidade: timer do GET da lista invalida snapshot e mostra erro na sequência/foco atual, sem alterar timer de operate. Pagamentos: timer publica erro na geração atual e aplicação final descarta abort. Retentativa permanece explícita; resultados e timers antigos não substituem fatos novos depois de blur/novo foco/retry; mudança de empresa/identidade continua rejeitada.

Novos testes passam por response.json dos helpers de produção, usam registros de fixture válidos, verificam conteúdo completo restaurado (inclusive payableCents=null distinto de agregados0), somente GET e ausência de chamadas após expiração de auth. Preservam e testam rascunho/estado incerto de convite, motivos de substituição e rascunho/estado incerto de privacidade. Não provam renderRN, SecureStore, rede externa, E2E/Android físico ou resultados reais de produção.

Corpos completos de createInvite/acceptInvite/revoke, action de substituições, update de segurança e operate/ações de privacidade e JSX/StyleSheets comparados e preservados. Pagamentos mantém somente leitura; não cria eventos nem habilita PSP. Nenhuma mutation, nova cobrança/contratação/deploy pago ou decisão automática foi acrescentada. React19.1.4/RN0.81.6/lockfile/tenant/RLS/canônico preservados. V1.104 EXISTENTE atualizado em lugar com histórico e apêndices; memória/checkpoint/requisitos/evidência no mesmo commit.

Estado na consulta: main83d5df28f11395522aa5e8e776a38bab491e0a91/tree075aad2062eecde202f9b7850c07858b79c9f85c; pós419 comprovado conforme evidência anterior. #420/#421/#422 abertas, cada head/diff/bytes próprios conferidos. CI próprios completos aprovados:420 run38112711675/job114391414713 counts4/497/145/3;421 run38112820567/job114391741740 counts4/510/145/3;422 run38112956435/job114392135215 counts4/528/145/3. Passos/logs/typecheck/build/export/migrations/privacy/HTTP comprovados nos heads exatos. APKs38112711679/38112820608/38112956424 em execução, sem rerun ou merge antecipado.

Publicar fix/secondary-read-deadlines a partir de head4220e768ab142665d0f088d287b6db73002900a8b98/treeaebd7cd351dd71378f0f097e8efa5d5f84e911d2, basefix/notifications-read-deadline. Esperado CI4web/571mobile/145API/3CLI eAPK standalone próprios no SHA exato, pendentes antes de publicar. Integrar420→421→422→esta fatia em ordem somente com próprios gates aprovados; retargetmain/reconsulta eventual, pais/tree/main e pós-gates reais. Não repetir419 nem considerar ausência de PR como conclusão.
Copilot interpret e disponibilidade/save ainda usam timers abort-only em operações POST e podem manter busy pendente: auditar/reproduzir preservando operação incerta, nenhuma liberação de reenvio automático. Demais fluxos de escrita/draft/contexto e cobertura de tela inteira exigem análise própria; não alegar conclusão estática/visual integral. Físico Android/E2E/VisualTruth, pentest independente, PSP/KYC sandbox/FIN-RISK/providers/TRUST e Web/Railway eventualmente pago continuam separados e abertos; contratos de Preferências, ajuda sem vínculo, ML/dados e enterprise dependem definição/provas externas. Manter continuidade em itens seguros independentes; fim de rodada não encerra projeto.


## CIs próprios comprovados das predecessoras

```json
[
  {
    "head": "56e8229ada3bdb44042b9d208357f10ef91cdad8",
    "run": 38112711675,
    "job": 114391414713,
    "counts": [
      4,
      497,
      145,
      3
    ],
    "http": [
      "2026-10-11T04:50:08.2546088Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  {
    "run": 38112820567,
    "job": 114391741740,
    "counts": [
      4,
      510,
      145,
      3
    ],
    "http": [
      "2026-10-11T04:52:23.5294427Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  },
  {
    "head": "0e768ab142665d0f088d287b6db73002900a8b98",
    "run": 38112956435,
    "job": 114392135215,
    "counts": [
      4,
      528,
      145,
      3
    ],
    "http": [
      "2026-10-11T04:54:17.7280591Z PASS: professional week returns real PostgreSQL opportunity timestamps in chronological Tuesday/Thursday order across companies"
    ]
  }
]
```

Validação local: node --test secondary-read-deadline e contratos company-members/company-replacements/company-safety/company-readonly/privacy-requests/privacy-actions:94tests/94pass/0fail. Não é renderRN ou E2E físico; mutations de contratos existentes são mocks, nunca produção.
