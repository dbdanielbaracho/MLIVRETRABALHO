# Registro Integral da Conversa — Continuação 2026-09-23 — Parte 1

Regra: preservar literalmente o que estiver disponível no contexto visível. Não reconstruir texto ausente.

## Trecho disponível

**Usuário:** nao vou usar o tinyfish

**Assistente:** Certo. **Não vou mais usar o TinyFish neste projeto.**

Continuarei o **MLIVRETRABALHO** usando GitHub, Railway e os testes/CI do próprio projeto. Para verificações públicas, usarei alternativas que não envolvam TinyFish.

**Usuário:** continuar

**Assistente:** Vou continuar exatamente da branch do **chat/notificações v1.57**, sem usar TinyFish. Primeiro vou fechar o E2E multiempresa do chat, rodar CI e só integrar se a autorização cruzada entre empresas estiver realmente bloqueada.

[TRECHO OPERACIONAL INTERMEDIÁRIO NÃO REPRODUZIDO AQUI LITERALMENTE POR INDISPONIBILIDADE INTEGRAL NO CONTEXTO DE REGISTRO. Não reconstruir.]

## Marcos comprovados nesta continuação

Este bloco não substitui o registro literal acima; serve apenas como índice técnico para localizar os commits/evidências produzidos durante a conversa.

- PR #183 — chat/notificações tenant-isolated — CI #478 SUCCESS — merge `786feea8aeb0769e1a743c28ea443e85136f7242` — deploy Railway `5e0af5e4-46f1-4948-9b6e-a7e67f974345` SUCCESS.
- PR #184 — empresa seleciona vaga sem digitar UUID — CI #481 SUCCESS — merge `a5836e4c4112b8735bca1f8ceb3800e2b1aa9b0a` — deploy Railway `d1881c1f-0a8a-46ef-9531-c2efa94748a7` SUCCESS.
- PR #185 — janela real de data/hora do turno — CI #484 SUCCESS — merge `36a1e2a6ac75947ab8752b05ef3bb34fa7e91bf5` — deploy Railway `f40cf192-6a88-4075-8c01-a9245f389d65` SUCCESS, readiness 200.
- PR #186 — atalhos de Operação para Publicar trabalho/Interessados — CI #486 SUCCESS — merge `eb3af123068fe742e08d641f89dcd18a888b65f2`; mudança mobile-only, sem novo deploy da API.
- Requirements Ledger reconciliado no commit `751448506d99ba13dfee21fcf9a0cfd398604d68`.

## Preferência explícita vigente

Não usar TinyFish no projeto MLIVRETRABALHO.
