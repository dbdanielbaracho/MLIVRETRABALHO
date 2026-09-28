# MLIVRETRABALHO — Blocker Root-Cause Matrix — 2026-09-28

## Rule
Blockers históricos resolvidos são registrados como CLOSED; somente dependências atuais permanecem na fila externa.

| Gate | Estado | Root-cause boundary atual | Trabalho interno comprovado | Ação externa restante | Closure proof |
|---|---|---|---|---|---|
| #214 CI / Production Truth | CLOSED | hosted runner restaurado | CI #841 + deploy + public Production Truth run `36372097656` | nenhuma | issue closed + run green |
| PR #245 integration | CLOSED | — | CI green, merge `979ed248...`, production deploy | nenhuma | merge/deploy/Production Truth |
| #215 FIN-RISK | OPEN externo | fatos comerciais/provider-specific | provider-neutral design, adapter/reference boundaries, unit economics model | contrato/preço/responsabilidades + sandbox produto exato | resposta/contrato rastreável + sandbox/reconciliação + ADR closure |
| #228 Provider due diligence | OPEN externo | comunicação/conta do provider | research/questionnaire/outreach packet/response template | enviar/receber respostas e obter sandbox | evidência original armazenada |
| #219 Trust/KYC | OPEN parcial externo | callback/propagation dependem do provider; pentest independente | runtime privacy/DSAR/retention/Safety provado no #245 | provider sandbox quando aplicável + pentest/retest | sandbox callback/binding + independent report |
| #220 APK generation | CLOSED | hosted runner disponível | APK artifact `10949985331` + digest | nenhuma para geração | artifact + digest |
| #220 physical device | OPEN externo | exige Android físico | execution packet + APK real | executar matriz no aparelho | screenshots/logs/build/device sanitizados |
| #220 independent pentest | OPEN externo | independência exige terceiro | scope/abuse cases/internal hardening | assessment + remediation/retest | relatório independente + retest |
| #224 Web code/build | CLOSED interno | dependency environment restaurado | #249–#254 + CI/tests | nenhuma para código/build | green CI |
| #224 Web public deploy | OPEN custo | serviço público separado é metered | CORS/API/Web build prontos | autorizar/provisionar serviço e smoke | deploy + canonical public smoke |

## Prioridade externa atual
1. Provider outreach/sandbox (#228 → #215/#219).
2. Android physical-device matrix (#220).
3. Independent pentest/retest (#220/#219).
4. Separate Web public deploy (#224), somente com autorização de custo.

## Cost guardrail
Nenhum provider contract, paid pentest, novo Railway service ou outro recurso metered é autorizado automaticamente.
