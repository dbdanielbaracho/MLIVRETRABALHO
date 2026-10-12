# WEB — prazo de leituras e recuperação

## Web: prazo e recuperação de leituras — 2026-10-12

Base verificada d43e3f31902c59a9e52a684aeca0e4794859d471 (PR #488 já integrado; não repetir merge). README e os cinco documentos originais íntegros foram reconsultados nesta base. A observação anterior mostrou dashboard com 12 requests pendentes/loading true e zero deadlines; candidatos 2, membros 1, substitutos 1, também sem prazo. Cinco regressões dos efeitos reais pré-JSX reproduziram RED 17 PASS / 5 FAIL (22 testes Web); após correção, GREEN 22 PASS / 0 FAIL, mantendo os 17 testes e seus asserts existentes. Relógio e transporte são fixtures determinísticas, sem alegar espera real de 15s, navegador renderizado ou aparelho físico.

apps/web/app/page.tsx agora limita cada uma das quatro leituras a 15000ms, incluindo fetch e leitura JSON. Expiração invalida a resposta para publicação de estado, mostra mensagem factual de tempo expirado/Atualizar dados e encerra loading do dashboard. Respostas/erros tardios não sobrescrevem dados, erros ou loading de uma nova leitura. Cleanup por empresa, seleção, sessão, revision ou unmount invalida e remove o timer; sucesso/falha também remove o timer. Não alegar aborto/cancelamento físico da rede: a requisição pendente pode continuar; o efeito expirado não publica. Não alterar POST/DELETE/login/payload/ACK/forms/tenant/roles; nenhuma repetição automática de escrita. Recuperação é uma nova leitura pelo controle Atualizar dados já existente, nunca confirmação fictícia de dados.

Regressões cobrem as quatro leituras: fetch pendente, JSON pendente, sucesso/erro tardios, retry explícito, cleanup com callback já capturado (empresa/seleção/signout), remoção de timers após sucesso e HTTP500. Fixture de timer adicionada ao harness existente sem retirar asserts/controles. JSX existente é preservado neste PR, assim como os demais handlers. Não representa aceite visual/E2E integral das 13 áreas.

Evidência: docs/evidencias/WEB_READ_DEADLINE_RECOVERY_2026-10-12.md. Código + regressões + evidência + DVT ORIGINAL v1.104/memória/checkpoint/ledger/registry no mesmo ciclo, apêndice sem substituir histórico. CI novo head esperado 22 Web + 731 mobile + 383 API + 3 CLI + 10 monitor = 1149, todos steps/typecheck/build/export/migrations/privacy/HTTP Postgres e pós-CI no merge SHA real. APK N/A apenas após identidade de todos blobs/modes nativos/dependências/lock/build/workflow/smoke comprovada; []/running não são PASS. Branch fix/web-read-deadline-recovery-20261012, PR/gates ainda pendentes neste snapshot; recibo final será no corpo do PR/checkpoint de continuidade, sem commit de metadados autorreferente.

Monitor: última execução real confirmada Project Activity Watch push 38199681085/job114650083321 em b16fd677bd0b853b97f81e8a660ec0318366dcb4 SUCCESS, ACTIVITY_WATCH_OBSERVED 2026-10-12T03:25:29.7820591Z, age0/openPrs0/activeRuns1. Consulta atual por event=schedule retornou zero runs, não prova falha nem execução do cron. Sem novo alerta aberto na consulta atual; permissions Issues write concedida não prova escrita quando não necessária. O workflow não muda nesta tarefa.

Próxima auditoria segura após gates: contexto de sessão/empresa das mutations Web após await, ACKs de equipes/safety/substituição conforme contratos atuais e concorrência de criação de replacement/cancelamento/lifecycle. Reproduzir falha antes de modificar; não inventar correção/atividade nem regras de negócio. Android físico/E2E/Visual Truth/SecureStore/piloto, pentest independente, TRUST providers, PSP/KYC sandbox/FIN-RISK e Web Railway com eventual custo continuam OPEN separados (#215/#219/#220/#224/#228). React19.1.4/RN0.81.6/frozen lock/RLS/standalone sem Metro preservados; sem produção direta/serviços/custos/PSP/dinheiro real/segredos/deploy pago. Rotina ativa; fim de rodada/bloqueio parcial não fecha o projeto nem exige CONTINUAR; não alegar execução contínua 24h.

### Recibo final #488 (consulta factual, histórico integral)
```json
{
  "merge": "d43e3f31902c59a9e52a684aeca0e4794859d471",
  "parents": [
    "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "3e35ba395101ae6c24ae395905059284fb5bbf66"
  ],
  "tree": "f273f11ad44ffb1984673a60b2e09fd311d4722f",
  "head": "3e35ba395101ae6c24ae395905059284fb5bbf66",
  "ci": {
    "run": 38200188082,
    "sha": "3e35ba395101ae6c24ae395905059284fb5bbf66",
    "job": 114651648544,
    "attempt": 1,
    "counts": [
      17,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "review": {
    "base": "b16fd677bd0b853b97f81e8a660ec0318366dcb4",
    "head": "3e35ba395101ae6c24ae395905059284fb5bbf66",
    "tree": "f273f11ad44ffb1984673a60b2e09fd311d4722f",
    "paths": [
      "apps/web/app/job-publication.test.ts",
      "apps/web/app/job-publication.ts",
      "apps/web/app/page.tsx",
      "apps/web/app/web-form-target.test.ts",
      "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
      "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
      "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
      "docs/evidencias/EVIDENCE_REGISTRY.md",
      "docs/evidencias/WEB_JOB_PUBLICATION_ACK_2026-10-12.md",
      "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md"
    ],
    "bytesVerified": 10,
    "history": true,
    "unchangedNonDocs": 447,
    "apk": "N/A all native inputs unchanged"
  },
  "apk": "N/A all native inputs unchanged",
  "postCI": {
    "run": 38200543524,
    "sha": "d43e3f31902c59a9e52a684aeca0e4794859d471",
    "job": 114652746016,
    "attempt": 1,
    "counts": [
      17,
      731,
      383,
      3,
      10
    ],
    "success": true,
    "pending": false
  },
  "nextReadDeadlineObservations": [
    {
      "label": "dashboard",
      "pendingRequests": 12,
      "registeredDeadlines": 0,
      "error": "",
      "loading": true
    },
    {
      "label": "candidates",
      "pendingRequests": 2,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    },
    {
      "label": "teamMembers",
      "pendingRequests": 1,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    },
    {
      "label": "replacementCandidates",
      "pendingRequests": 1,
      "registeredDeadlines": 0,
      "error": "",
      "loading": false
    }
  ]
}
```
