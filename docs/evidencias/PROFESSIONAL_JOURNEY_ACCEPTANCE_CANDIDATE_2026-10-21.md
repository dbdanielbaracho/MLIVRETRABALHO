# Candidato ao aceite técnico interno — Área 3: profissionais, agenda e presença

Data: 2026-10-21  
Repositório: `dbdanielbaracho/MLIVRETRABALHO`

## Estado

**PENDENTE de gates próprios, merge e pós-merge.** Este documento reúne o crosswalk integral e não declara aceite antecipado.

## Requisito da matriz

Cobrir API e cliente da agenda, trabalho, presença e avaliação no mesmo owner/tenant, incluindo concorrência. Aparelho físico é evidência externa e não bloqueia o aceite técnico interno quando explicitamente separado.

## Crosswalk

| Requisito | Implementação principal | Prova integrada |
|---|---|---|
| Perfil profissional | `professional-profile.controller.ts`, cliente `professional-profile.ts` | HTTP input E2E + suíte API/mobile |
| Disponibilidade | `availability.controller.ts`, `availability-submit.ts`, `availability-window.ts` | HTTP input E2E + jornada principal + calendário/ACK mobile |
| Catálogo e interesse | `jobs.controller.ts`, `jobs.ts`, `trabalhos.tsx` | jornada HTTP multiempresa + testes mobile de interesse/prazos |
| Agenda e presença | `work-assignments.controller.ts`, `agenda.ts`, `agenda.tsx` | check-in/start/check-out/complete, GPS e replay no HTTP/PostgreSQL |
| Avaliação | `ratings.controller.ts`, ações de agenda | ratings E2E bidirecional, reputação e passaporte |
| Concorrência | confirmação de vaga/alocação | barreira PostgreSQL: dois ACKs, uma assignment e uma notificação |
| Owner/tenant | auth, memberships e tenant transaction | duas empresas, outsider, tenant errado e leituras escopadas |
| Ordem factual | planner/passport/earnings | chronology E2E com Date PostgreSQL e loaders mobile |
| Recurso expirado | Set de controllers em `trabalhos.tsx` | regressão canônica de cleanup READ no PR #595 |

## Base comprovada

- Main `42ecc26cd36dce60cbee4fa419f139a2d0325414`, árvore `3cd7c0cab597d54441f650153323062cc0a5901a`.
- CI [39519471233](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39519471233), job 118959495499: SUCCESS, 1.873 testes, HTTP/PostgreSQL, navegador e Production Truth.
- Produto móvel/nativo da base é byte-idêntico ao merge `b035000fed28dd47bbd95413abe09c67b7e53256`, cujo APK pós-merge [39516978384](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39516978384) instalou e executou `DEVICE_SMOKE_OK` sem Metro. Essa referência não substitui o APK obrigatório do novo HEAD mobile.

## Delta final conhecido

PR #595 preserva toda a jornada e muda somente o descarte imediato do controller READ expirado, com sua regressão canônica. O PR #581 não entra: conversa pertence a outro pacote de aceite.

## Condição para aprovação

1. CI completo próprio do novo HEAD SUCCESS.
2. APK standalone próprio do novo HEAD SUCCESS.
3. Revisão fresh e merge único.
4. CI literal pós-merge SUCCESS.
5. APK literal pós-merge SUCCESS.
6. Só então registrar **APROVADA tecnicamente internamente** nos seis normativos.

## Limites

Não comprova aparelho físico, SecureStore nativo, renderização integral RN, Visual Truth, produção, pentest, Railway/Neon, PSP, contratos ou dinheiro real. Não altera ou reduz controles de tenant/RLS, privacidade ou navegador.
