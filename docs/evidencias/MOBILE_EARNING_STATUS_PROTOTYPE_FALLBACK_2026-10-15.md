# Ganhos: status desconhecido sempre retorna texto

## Ganhos — fallback textual de status desconhecido — 2026-10-15

Correção independente sobre candidato #538 (`b2b25a5e21dae06cf322ec726bc0fe444e625100`); predecessor ainda depende dos próprios gates CI/APK e não está antecipadamente aprovado. Escopo exclusivo MLIVRETRABALHO.

Falha reproduzida no fluxo real `loadEarnings` → `earningStatus`: o leitor aceita status futuro string, mas a consulta de propriedades herdadas do mapa devolvia Object.prototype para "__proto__" e funções para "constructor"/"toString", contrariando o fallback textual já existente "Status não identificado". Não é alegação de poluição do protótipo, invasão ou crash observado no Android.

Três regressões comportamentais em `apps/mobile/tests/earnings.test.mjs`: RED5PASS/3FAIL na suíte de ganhos antes; GREEN8/8 após guarda `Object.prototype.hasOwnProperty.call`. Suíte mobile completa local750/750 (inclui747 do predecessor); os5 testes antigos de ganhos e asserções permanecem. Rótulos conhecidos, estados financeiros, cálculo semanal, dados, transporte, tenant/RLS, sessão e JSX não mudam.

Evidência `docs/evidencias/MOBILE_EARNING_STATUS_PROTOTYPE_FALLBACK_2026-10-15.md`. CI/APK próprios do novo SHA e pós-gates reais são PENDENTES neste snapshot de preparação. Integrar apenas após predecessor #538, reconsulta main/base/head/mergeable e equivalência de árvore/revisão se retarget. Não declarar aceite integral da área6 nem das13 áreas; físico/pentest/provider/PSP/Web pago permanecem externos.

Prova local: Node24.19.0, funções de produção reais com transporte simulado. O payload e o valor de status desconhecido são preservados; apenas o rótulo de exibição usa o fallback existente. Nenhuma transação ou acesso à produção foi feito.
