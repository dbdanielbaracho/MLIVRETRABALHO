# Registro Integral da Conversa — Continuação — 2026-09-26 — Parte 10

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-26_PARTE_9.md`. As Partes 1–9 permanecem preservadas integralmente. Esta Parte 10 torna-se o arquivo ativo do Registro Integral a partir deste ponto.

## Usuário
continuar o que voce estava fazendo no projeto

## Assistente — continuação executada
- Retomada do PR #245 e do Registro Integral Parte 9 após o usuário informar que a mensagem musical anterior foi enviada por engano.
- PR #245 continua OPEN/NÃO MESCLADO.
- Migrations preparadas no final-state: `0034–0052`.

## NETWORK_SHARED / migration 0052
- Auditoria direta de `0052_network_shared_write_boundary.sql` confirmou:
  - função `confirm_marketplace_interest(uuid,uuid)` usa `SECURITY DEFINER`;
  - `search_path=public,pg_temp` fixo;
  - PUBLIC sem EXECUTE;
  - EXECUTE concedido somente a `app_runtime`;
  - `app.tenant_id` obrigatório;
  - UPDATE limitado a interesse cuja projeção `marketplace_jobs.tenant_id` coincide com tenant atual;
  - escrita direta INSERT/UPDATE/DELETE de `app_runtime` revogada em `marketplace_interests` e `professional_availability_network`.
- Novo E2E adversarial `network-shared-write-boundary-e2e.sh` está ligado ao CI e prepara prova de direct-write denied / same-tenant allowed / cross-tenant denied.

## CORS / Web readiness
- `CORS_ORIGINS` preparado no #245 como allowlist explícita.
- Wildcard e URL com path/query/hash rejeitados.
- Ausência da variável mantém CORS desligado.
- `credentials:true` removido porque autenticação Web é Bearer-token, não cookie; menor privilégio.
- #224 atualizado com esse readiness, mas `apps/web` continua corretamente bloqueado até existir ambiente reproduzível de npm/pnpm/Next.

## CI — estado atual e causa
- Head #245 revalidado: `24cf6238dfad987ab57bd492bb3724884d249cb4`.
- Run `36283645603`.
- Foundation job `108520157402`.
- `steps=null`; nenhum step executado.
- #214 atualizado com evidência cross-repo:
  - MLIVRETRABALHO falha pre-step em múltiplos runners/OS;
  - MARKETPULSE, mesma conta, reproduziu o mesmo sintoma em 2026-09-26;
  - GROWTH-OS, mesma conta, teve CI hosted-runner SUCCESS em 2026-09-21.
- Fronteira de causa: entitlement/billing/policy de hosted runners na conta ou incidente parcial/não reportado de provisioning; não há evidência de falha específica do código/workflow do MLIVRETRABALHO.
- Settings privados de Actions/billing não são expostos pelo conector.

## Mergeability / divergência
- Comparação merge-base→main mostrou que os commits exclusivos de `main` alteraram somente documentação/evidências/requirements:
  - Registros Integrais;
  - blocker matrix;
  - checkpoint;
  - DSAR/legal-hold/EAS/support evidence;
  - provider outreach packet;
  - requirements delta.
- Nenhum arquivo code/schema do PR #245 aparece no delta exclusivo de `main`.
- Portanto `mergeable=false` transitório não é atualmente evidência de conflito funcional de código. Não criar rebase/sync destrutivo sem conflito concreto.

## Governança reconciliada
- PR #245 body atualizado para migrations `0034–0052`, CORS sem credentials e boundary NETWORK_SHARED.
- Issue #214 atualizada para head/run atual e causa cross-repo.
- Issue #219 atualizada com todo runtime/hardening do #245 e migrations 0034–0052.
- Issue #224 atualizada com CORS readiness e causa de package environment.
- `INTERNAL_COMPLETION_CHECKPOINT_2026-09-24.md` atualizado para head/run e migrations 0034–0052.
- `BLOCKER_ROOT_CAUSE_MATRIX_2026-09-25.md` reconciliada com PR único #245, causa cross-repo e ações externas mínimas.

## Monitor de CI
- Automação condition-watch criada para verificar GitHub Actions uma vez por hora.
- Quando runner for alocado e steps realmente começarem, a continuação deve: inspecionar logs, corrigir falhas reais, rerodar até green quando seguro, revisar diff, mesclar #245 somente com evidência green, deployar, rodar Production Truth e atualizar governança.
- Enquanto o sintoma continuar idêntico (`runner_id=0`/`steps=null`), não notificar repetitivamente sem mudança significativa.

## Plugins externos
- Busca de plugin Expo/EAS: nenhum plugin disponível.
- AgentMail/Gmail continuam disponíveis porém não instalados; foram sugeridos recentemente e não devem ser repetidos agora.
- Nenhum outreach foi falsamente marcado como enviado.

## Open-gate audit
Issues abertas relevantes continuam apenas:
- #214 CI/Production Truth;
- #215 FIN-RISK;
- #219 TRUST-ARCH;
- #220 Pilot/device/pentest;
- #224 WEB-ARCH;
- #228 Provider due diligence.

Nenhum novo bloco interno de produto foi identificado fora do final-state #245. O trabalho restante depende de runner/package environment, provider/sandbox, autenticação Expo/aparelho físico ou pentest independente.

## Estado ativo
- PR #245: PREPARADO, NÃO PROVADO, NÃO MESCLADO.
- Production-DONE: aberto.
- Pilot-DONE: aberto.
- Registro Integral ativo passa a ser esta Parte 10.

---

## Usuário
continuar

## Assistente — auditoria adversarial adicional do PR #245
- O usuário pediu continuação; nenhuma etapa anterior foi repetida.
- PR #245 reaberto para auditoria focada em riscos que ainda possam ser resolvidos sem hosted runner.

### Company member invitations — input bounds
Gap encontrado e corrigido:
- `CompanyMembersController.invite` aceitava e-mail sem limite superior e sem bloqueio explícito de whitespace;
- `CompanyMembersController.accept` calculava SHA-256 de `inviteCode` sem limite superior de tamanho.

Correção aplicada na branch `feat/eas-pilot-build-route`:
- e-mail de convite exige 3–320 caracteres, `@` e ausência de whitespace;
- `inviteCode` é rejeitado se vazio ou maior que 256 caracteres antes de parsing/hash;
- commit de controller: `9c2aa41c8811b544959dfef2a5b68d2f4fccbe7e`.

E2E ampliado:
- `scripts/http-company-members-e2e.sh` agora prova rejeição de e-mail >320;
- prova rejeição de `inviteCode` >256;
- mantém as provas anteriores de email-binding, single-use, sole-owner self-demotion guard e race de desativação de dois owners;
- commit de teste: `a2dcbb026038940f0a449cfb0dd00240de7c1cc7`.

### CI do novo head
- Head atual após o hardening: `a2dcbb026038940f0a449cfb0dd00240de7c1cc7`.
- Run: `36286234431`.
- Foundation job: `108527432973`.
- Resultado continua `failure` antes do primeiro step, `steps=null`.
- Nenhum checkout/install/typecheck/build/migration/E2E executou.
- Portanto o hardening novo está PREPARADO, mas NÃO PROVADO pelo CI; o blocker externo permanece exatamente o mesmo.

### Próxima regra
- Continuar procurando somente gaps de alto impacto e bugs reais; evitar hardening infinito sem relação com Definition of Done.
- Não mesclar #245 até execução real green.
