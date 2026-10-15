# Web browser reload — primary post-merge failure and safe network diagnostics

2026-10-15. Scope: local fixture Next/API/PostgreSQL inside existing CI, no production or personal browser.

## Primary observation

PR556 own 38751951403/job116480374661 SUCCESS1308 and actual Chrome8checks; merge dd715c6573bcc6d6e5e3c749cc634e276db83ef0. Real post run38753142047/job116484484990 attempt1 FAILURE14:42:00.0491910Z after reload. `loaded dashboard` timed out; UI alert twelve sections unavailable. Before reload: actual dashboard GET200, teams/job POST201 and subsequent reads200. After reload: twelve OPTIONS204, missing completed GETs. This does not yet prove product CORS failure or a browser-harness cause. No rerun of failing post, no security weakening, no repeated merge.

## Diagnostic regression

Preserve exact failing reload and all original journey assertions, add Network.requestWillBeSent method/header names, response CORS headers, and loadingFailed blockedReason/corsErrorStatus. No authorization values, tokens, passwords, raw stored session or credentials are logged. Make remote signout explicitly require POST201 rather than accepting an OPTIONS204. No API/CORS/application layout/dependency/lock/Android changes. New CI on this diagnostic head is PENDING; no unitcount increase claimed. If failure repeats, inspect primary CORS errors before changing code or test behavior.

Only area10 technical internal accepted, twelve others remain unaccepted. Desktop Chrome is not Android/physical/VisualTruth acceptance. Original documents remain complete append-only. PR556 post failure is not overruled by its own green.


### 2026-10-15 — diagnóstico558: primeiro resultado medido e regressão intermitente

Head386e800747f378d98fa363a03d131afa7a33bf64/CI38754463700/job116489109517 attempt1SUCCESS1308+Chrome14:50:32.7732259Z, sem alterar aplicação/API/CORS. Isso NÃO determina causa nem reclassifica a falha pós556 como PASS. Teste agora exige5recargas consecutivas com mesmos assertions/cache/CORS/interceptação/sessão, não retry de falha; qualquer falha interrompe o gate. Preservados PNGs556 próprios/pós-falhos+manifesto no repositório comorigem/SHA/bytes/dimensões verificados, não atribuídos a558. Novocandidato/exactheadCI/pós aindaPENDENTES. Nenhum fix especulativo deproduto foi feito; causa eminvestigação. Somenteárea10aceita tecnicamente;12pendentes.

## Capture provenance preserved with this functional regression extension

Directory `web-browser-2026-10-15/`: six actual PNGs from PR556 own SUCCESS and actual post FAILURE, plus PR556_CAPTURE_PROVENANCE.json. Independently decoded PNG signature89504e470d0a1a0a, byte counts, SHA256 and1365x900dimensions for all six, failure capture visually inspected. Own and post fixture IDs/hash differ; never attributed to PR558. Original CI logs remain primary sources. Five consecutive hard reloads retain `ignoreCache:true`, all twelve completed reads, exact persisted job DOM, no extra signin, and POST201 logout+revoked browser token401+other sameidentity session200; no skip or application changes.
