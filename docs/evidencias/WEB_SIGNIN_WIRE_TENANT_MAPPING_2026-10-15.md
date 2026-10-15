# Web signin — tenant wire contract proven by real API


---

## Correção funcional — resposta REAL de login tenant_id→tenantId — 2026-10-15

Este apêndice supersede somente a preparação anterior que não alegava defeito de produto. A nova reprodução é integração REAL API→Web; não repete antigos testes de mock/canonical-session como se fossem jornada de cliente.

### Falha comprovada
AuthController.signin devolve AuthService.memberships com colunas SQL tenant_id/role, sem alterar o formato. validateSigninCompanySession exigia tenantId via parser de sessão armazenada. A primeira execução Chrome renderizou login e feedback401, mas não chegou ao dashboard após credenciais válidas; a execução diagnóstica subsequente capturou shape tenant_id/owner mas teve timeout de startupChrome, separado de falha do produto. A regressão seguinte passa resposta HTTP REAL, com PostgreSQL real, pelo módulo Web REAL carregado por nativeTSstrip+VM, sem stubs Auth/DB/transporte: normalized=false. Assim confirma incompatibilidade antes de alterar produto; não é prova de exploit, vazamento, Android/físico ou jornada completa.

```json
{
  "head": "97bb04b4e3619f721b6cbd48a93876f0693cb9d7",
  "run": 38751252527,
  "job": 116477925459,
  "attempt": 1,
  "previousTestsPass": 1304,
  "summary": {
    "tests": [
      127,
      753,
      410,
      3,
      11
    ],
    "pass": [
      127,
      753,
      410,
      3,
      11
    ],
    "fail": [
      0,
      0,
      0,
      0,
      0
    ],
    "skipped": [
      0,
      0,
      0,
      0,
      0
    ],
    "cancelled": [
      0,
      0,
      0,
      0,
      0
    ]
  },
  "scope": "REAL local HTTP/Postgres signin envelope fed unchanged into ACTUAL Web validator via nativeTSstrip+VM; no auth/transport mock",
  "observed": [
    "2026-10-15T14:27:41.1939343Z WEB_BROWSER_FIXTURE_AUTH {\"label\":\"A\",\"tenantId\":\"4815332a-ab7c-462d-9b4a-588bcf39eaa5\",\"memberships\":[{\"tenant_id\":\"4815332a-ab7c-462d-9b4a-588bcf39eaa5\",\"role\":\"owner\"}]}",
    "2026-10-15T14:27:41.1940306Z WEB_BROWSER_WIRE_OBSERVED {\"label\":\"A\",\"normalized\":false,\"membershipKeys\":[[\"tenant_id\",\"role\"]]}",
    "2026-10-15T14:27:41.1944235Z WEB_BROWSER_JOURNEY_FAIL Actual API signin response rejected by current Web validator"
  ],
  "browserAttempt": {
    "head": "d31253d2987e644d1d8641b445999c8c931a3fa0",
    "run": 38749130483,
    "attempt": 2,
    "job": 116471435561,
    "actualLoginRendered": true,
    "actual401Feedback": true,
    "validLoginDashboardTimeout": true,
    "scope": "No valid dashboard completion claimed"
  },
  "infra": {
    "firstAttemptEcr": {
      "attempt1Job": 116470558210,
      "run": 38749130483,
      "cause": "ECR quota before checkout, browser/product gates not executed",
      "failedJobRetries": 1
    },
    "diagnosticChromeStartup": {
      "head": "1219d965829ab153478a87ec6c5d26b58394eee7",
      "run": 38750284144,
      "job": 116474585407,
      "observedApiRaw": true,
      "startupTimeout": true,
      "scope": "NOT product RED/root proof by startup"
    }
  },
  "localRegression": {
    "previous6Pass": 6,
    "new4Fail": 4,
    "candidate10Pass": 10,
    "typecheck": false,
    "browser": false
  }
}
```

### Mudança mínima de fronteira, sem mudar API ou autoridade
Somente validateSigninCompanySession adapta tenant_id da resposta de rede para o tenantId canônico já usado pela aba. tenantId canônico anterior continua suportado; se as duas chaves existem e divergem, rejeita em vez de escolher autoridade ambígua. O parser readStoredCompanySession permanece BYTE-IDÊNTICO/estrito e continua rejeitando storage em formato wire. Allowlist de papéis, filtro profissional, identidade/token, tipos/campos estáveis, Set que rejeita empresas duplicadas e dados opcionais validados não mudam. IDs não são inventados, normalizados por trim ou inferidos de headers. A API e mobile continuam recebendo tenant_id como antes; SQL/migrations/RLS/auth/header/payload/contratos/JSX/CSS/layout/deps/lock/standalone preservados.

Quatro testes novos da função real, mantendo os6 originais como prefixo integral: rawAPI válido→canonical; combinação wire/canonical+filtro de papéis+duplicados; aliases conflitantes/malformados; roundtrip canonical sem alargar storagewire. RED6PASS/4FAIL→GREEN10/10 local com nativeTSstrip+web-contract reais (sem reescrever fórmula), NÃO typecheck ou render. Web131/total1308 são somente previsão até fullCI.

### Prova Web real ainda exigida
O MESMO navegador/teste mantém todas as condições DOM/UI/API originais, sem relaxar a espera de dashboard (controle DOM conhecido local PASS). Driver também exige token real do navegador revogado401 após signout explícito e outro token da MESMA identidade ainda200; esse token de fixture fica privado e não é impresso. Não há retryPOST, alteração na política de revogação, cancelamento de signin ou limpeza fictícia de sessão tardia. Chrome startup segue15s com stderr seguro para diagnosticar ambiente; não desabilitar sandbox/security/CORS para passar.

OwnCI no novo HEAD/capturas completas/revisão13paths/merge/pósREAL AINDA PENDENTES nesta preparação. Falhas de startup/driver não são declaradas falhas de produto. Precisam haver WEB_BROWSER_WIRE_OBSERVED true para A/B, WEB_BROWSER_JOURNEY_PASS com persistência e isolamento, três capturasPNGhash+bytes e todos gates antigos. AssertUI não soma unitcount. BrowserWebdesktop não é Android/nativo/tecladofísico/VisualTruth nem aceite integral de áreas1/2/4. Sóárea10 tem aceite TÉCNICO INTERNO; outras12 pendentes. Recibo555final jáconsolidado no apêndice anterior deste ciclo; não criar commit só de metadados para si. Externos215/219/220/224/228OPEN, semgastos/serviços/produção/credenciais/contratos/PSP/dinheiroreal.
