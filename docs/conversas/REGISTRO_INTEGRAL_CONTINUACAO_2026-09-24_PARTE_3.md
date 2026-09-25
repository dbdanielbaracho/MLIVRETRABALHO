# Registro Integral da Conversa — Continuação — 2026-09-24 — Parte 3

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-24_PARTE_2.md`. As Partes 1 e 2 permanecem preservadas integralmente. Esta Parte 3 continua o mesmo Registro Integral sem substituir nem resumir o histórico anterior.

## Contexto obrigatório

- Projeto: MLIVRETRABALHO / AI Workforce Network.
- Repositório oficial: `dbdanielbaracho/MLIVRETRABALHO`.
- Documento da Verdade vigente: v1.9.
- GitHub é fonte persistente da verdade.
- Não usar TinyFish neste projeto salvo instrução explícita futura do usuário.
- Toda conversa do chat referente ao projeto deve continuar sendo registrada em `docs/conversas/`.
- Quando um gate impedir avanço real, comunicar explicitamente que aquela etapa **parou** e registrar o bloqueio.

## Usuário
continuar e me avisar se tiver parado

## Assistente — continuidade e regra de aviso de bloqueio
- Regra confirmada: continuar o projeto e avisar explicitamente quando algum gate estiver parado, em vez de aparentar execução contínua.
- Railway rechecado: API e Postgres continuam SUCCESS, sem regressão observada.
- CI do `main` run `36036788185` rechecado: job `foundation` terminou `failure` com `steps=null`; gate #214 continua parado por runner externo, não por evidência de falha de código.
- Auditoria do contrato financeiro atual encontrou um risco de integração: o simulador `SignedJsonPaymentProviderAdapter` aceita `tenantId`, `assignmentId` e `recipientProfessionalId` no payload assinado. Isso é aceitável somente no simulador interno; um PSP real não deve ser tratado como autoridade para IDs internos.
- `DatabaseService.tenant(...)` exige tenant confiável antes de entrar no contexto `app_runtime`/RLS; portanto não foi criado atalho cross-tenant para resolver webhook real.
- Branch `finance/provider-reference-boundary-v1.83` criada.
- Evidência criada: `docs/evidencias/PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md`.
- ADR-FIN-001 atualizado para exigir a sequência segura: autenticar evento externo → extrair referência do PSP → resolver vínculo server-controlled → derivar tenant/assignment/profissional → entrar em RLS → normalizar/reconciliar.
- PR #231 aberto: `Finance v1.83: harden real-PSP reference boundary`.
- CI do PR #231, run `36082456146`, novamente parou antes dos steps (`foundation`, `steps=null`).
- Diff integral revisado; somente `docs/adr/ADR-FIN-001-PROPOSED.md` e `docs/evidencias/PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md` foram alterados.
- PR #231 mesclado via exceção documental já estabelecida para runner externo. Merge: `450b1cafd5927ed8515406fbb1b91dcbd4ca7280`.
- FIN-RISK permanece OPEN: nenhum PSP real, dinheiro real, sandbox ou contrato foi ativado.

## Continuação — compatibilidade técnica dos PSPs
- Documentação oficial atual reavaliada para o caso crítico do MLIVRETRABALHO: uma empresa pagando vários profissionais no mesmo turno/evento.
- Asaas: documentação pública suporta `splits[]` com múltiplos `walletId` e informa que não há limite de quantidade de `walletId`, respeitadas as regras de valor/percentual; há subcontas em sandbox.
- Pagar.me: documentação v5 suporta múltiplos recebedores/N regras de split; split permanece restrito a clientes PSP e depende de elegibilidade/contrato comercial.
- Mercado Pago: fluxo público padrão é Split 1:1; 1:N é restrito a vendedores de carteira assessorada que já estejam em contato com o time comercial.
- Evidência criada: `docs/evidencias/PSP_TECHNICAL_FIT_MATRIX_2026-09-24.md`.
- Issue #228 atualizado com a matriz e a ordem de due diligence: Asaas → Pagar.me → Mercado Pago. Essa ordem não é seleção final de provider.

## Continuação — pricing público indicativo
- Asaas: página pública de preços registra taxas padrão e avisa que condições do contrato/conta podem ser diferentes; valores públicos não foram tratados como proposta comercial de marketplace/split.
- Pagar.me/Stone: página pública mostra que a oferta com Split de pagamentos utiliza taxas customizadas e requer contato comercial; portanto não existe custo público confiável para o nosso split.
- Mercado Pago: há taxas públicas gerais de checkout, porém elas não provam custo do Split 1:N, que depende do time comercial.
- Evidência criada: `docs/evidencias/PSP_PUBLIC_PRICING_SNAPSHOT_2026-09-24.md`.
- Nenhuma taxa pública foi usada como compromisso de preço do MLIVRETRABALHO; unit economics final continua dependente de propostas comerciais escritas.

## Estado de parada neste ponto

- **CI / Production Truth (#214): PARADO externamente** — GitHub Actions continua sem executar steps.
- **FIN-RISK (#215): avanço interno continua**, mas fechamento depende de provider real, contrato, fees, sandbox e revisão jurídica/contábil.
- **Provider due diligence (#228): preparação técnica interna avançada; resposta comercial/sandbox ainda externa.**
- **TRUST-ARCH (#219): depende de provider KYC/KYB real, callback sandbox, LGPD final e pentest externo.**
- **Device/Pilot (#220): depende de aparelho físico, signing de release e pentest.**
- **LEGAL-ARCH (#221): depende de parecer jurídico brasileiro externo identificado.**
- **WEB-ARCH (#224): depende de ambiente capaz de resolver dependências Next.js e gerar lockfile reproduzível.**
