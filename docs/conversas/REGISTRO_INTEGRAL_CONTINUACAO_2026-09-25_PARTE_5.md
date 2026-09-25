# Registro Integral da Conversa — Continuação — 2026-09-25 — Parte 5

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-24_PARTE_4.md`. As Partes 1–4 permanecem preservadas integralmente. Esta Parte 5 continua o mesmo Registro Integral sem substituir nem resumir o histórico anterior.

## Contexto obrigatório
- Projeto: MLIVRETRABALHO / AI Workforce Network.
- Repositório oficial: `dbdanielbaracho/MLIVRETRABALHO`.
- Documento da Verdade vigente: `DOCUMENTO_DA_VERDADE_v1.13.md`.
- Requirements traceability: ledger base + deltas v1.11/v1.12/v1.13.
- GitHub é a fonte persistente da verdade.
- Não usar TinyFish salvo instrução explícita.

## Usuário
continuar

## Assistente — revalidação externa
- Railway API/Postgres revalidados em SUCCESS, pending work zero.
- main revalidado e CI continuou falhando antes dos steps.
- WEB-ARCH continuou bloqueado por package resolution.
- nenhum novo bloco interno seguro foi identificado.

## Usuário
quais são os passos que ainda faltam para terminar o projeto todo

## Assistente
- listados gates finais: CI/Production Truth, FIN-RISK/provider, Trust/KYC, device, signing, pentest, LEGAL-ARCH, Web, provider outreach e fechamento documental.

## Usuário
no item 7 nao haverá profissional juridico brasileiro revisando dever processeguir sem o profissional procurando as melhores praticas

## Assistente — decisão normativa LEGAL-ARCH v1.12
- Usuário decidiu remover parecer jurídico profissional brasileiro como gate obrigatório do projeto.
- Pesquisa atual por fontes primárias foi realizada: CLT/Planalto, STF Tema 725/ADPF 324, STF Tema 1291, LGPD/Planalto e guias ANPD.
- Tema 1291 permanece em evolução e deve ser monitorado; Tema 725/ADPF 324 não será tratado como blindagem automática para toda relação plataforma-profissional.
- Criado `docs/evidencias/LEGAL_BEST_PRACTICES_REVIEW_v1.12.md`.
- Criado `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.12.md`.
- Criado `docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.12.md`.
- README atualizado para v1.12.
- Checkpoint interno reconciliado: LEGAL-ARCH deixa de ser blocker externo geral e passa a revisão interna contínua por melhores práticas e fontes primárias.
- Limitação permanente: revisão interna não é parecer jurídico profissional, não elimina risco residual e não substitui profissional quando lei, disputa, fiscalização ou representação formal o exigir.

## Novo baseline LEGAL-ARCH
- aceitar/recusar oportunidades deve permanecer liberdade real;
- sem exclusividade obrigatória como baseline;
- multiempresa preservada;
- sem punição automática por recusa;
- sem controle contínuo fora do assignment aceito;
- sem background location baseline;
- score/reliability com fatos auditáveis e revisão humana para efeitos materiais;
- LGPD: finalidade, minimização, least privilege, retenção proporcional, segurança e preferência por provider refs/status em vez de raw docs quando possível;
- re-review interno obrigatório para exclusividade, metas, controle substancial, tracking background, enforcement automático, garantia/crédito/adiantamento, mudança de split, staffing/temp/direct hire, nova jurisdição/dado sensível ou mudança jurídica relevante.

## Estado atual pós-v1.12
- #214 CI/Production Truth: PARADO EXTERNAMENTE.
- #215 FIN-RISK: PARADO EXTERNAMENTE por provider/contrato/pricing/sandbox/compliance; parecer jurídico externo removido como gate.
- #219 TRUST-ARCH: PARADO EXTERNAMENTE por provider/sandbox/LGPD operacional/pentest; parecer jurídico externo removido como gate.
- #220 Device/Pilot: PARADO EXTERNAMENTE.
- #221 LEGAL-ARCH: CLOSED internamente sob v1.12.
- #224 WEB-ARCH: PARADO POR AMBIENTE.
- #228 PROVIDER-DUE-DILIGENCE: PARADO EXTERNAMENTE.

## Usuário
não esqueça que tudo que estamos digitando aqui tem que estar gravado em arquivo que já falamos qual o arquivo

## Assistente — regra permanente de registro integral reafirmada
- Confirmado que o arquivo ativo é `docs/conversas/REGISTRO_INTEGRAL_CONTINUACAO_2026-09-25_PARTE_5.md`.
- Regra permanente: toda mensagem do usuário e toda ação/materialização relevante do assistente sobre o projeto MLIVRETRABALHO devem ser registradas sequencialmente neste Registro Integral enquanto a Parte 5 estiver ativa.
- As Partes 1–4 permanecem preservadas e não devem ser resumidas, substituídas ou apagadas.
- Antes de cada nova escrita sequencial, buscar o SHA atual do arquivo para evitar sobrescrita/conflito.

## Usuário
continuar e so parar quando terminar

## Assistente — execução autônoma até o limite real
- Regra reafirmada: continuar sem pedir novas confirmações e só encerrar quando todo trabalho interno seguro tiver sido executado; se restarem apenas dependências externas, comunicar explicitamente a parada nesses gates.
- CI workflow auditado diretamente em `.github/workflows/ci.yml`: `runs-on: ubuntu-latest`, sintaxe operacional normal e pipeline completo definido; nada óbvio no workflow explica `runner_id=0/steps=null`, reforçando bloqueio externo de runner.
- Railway revalidado: API e Postgres continuam `SUCCESS`, pending work zero.

## Assistente — LGPD/Trust v1.13
- Transformada a antiga proposta de retenção em baseline operacional interno, sem alegar prazos internos como prazos legais universais.
- Criado `docs/evidencias/TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13.md`.
- Criado `docs/evidencias/DSAR_RUNBOOK_v1.13.md`.
- Criado `docs/evidencias/PRIVACY_NOTICE_BASELINE_v1.13.md`.
- Criado `docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.13.md`.
- Criado `docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.13.md`.
- README atualizado para v1.13.
- Checkpoint interno reconciliado para v1.13.
- Issue #219 renomeado/reconciliado: LGPD baseline interna, DSAR e privacy notice estão definidos; restam provider/sandbox, runtime privacy proof e pentest.

## Assistente — bug estrutural profissional/profile encontrado
- Auditoria encontrou `ProfessionalProfileController` usando `professional_profiles.identity_id`, mas migrations 0001–0033 inspecionadas/busca do repositório não criavam a coluna.
- Migration base 0002 também concedia apenas `SELECT` de `professional_profiles` ao `app_runtime`, embora o endpoint execute `INSERT/UPDATE`.
- Isso ameaça onboarding profissional em banco criado do zero e reprodutibilidade do HTTP journey.
- Criada branch `fix/professional-profile-identity-runtime`.
- Criada migration `0034_professional_profile_identity.sql` com FK para `identities`, backfill seguro via `subject_id`, unique index parcial e grants `SELECT, INSERT, UPDATE`.
- Criado teste `packages/db/tests/professional-profile-identity.sh` e integrado ao package DB test.
- Aberto PR #233 `fix(db): restore professional profile identity binding`.
- CI do PR #233: run `36092358150`, job `107937255128`, `steps=null`; PR permanece aberto e **não mesclado**.

## Assistente — runtime DSAR/export preparado
- Criada branch empilhada `feat/privacy-dsar-export` sobre a correção de profile identity.
- Adicionado `GET /v1/privacy/export` autenticado.
- Export atual inclui identity básica, memberships, professional profile, availability, assignments, earnings e verification status/references diretamente ligados ao titular.
- Tenant data usa `db.tenant(...)`; não exporta password hash, session tokens, provider secrets ou terceiros desnecessários.
- Criado `scripts/http-privacy-export-e2e.sh` e conectado ao workflow CI.
- Aberto PR #234, baseando em #233.
- CI do PR #234: run `36092596016`, job `107937974288`, `steps=null`; PR permanece aberto e **não mesclado**.

## Assistente — account deactivation segura preparada
- Criada branch empilhada `feat/privacy-account-deactivation` sobre #234.
- Criada migration `0035_identity_deactivation.sql` com `identities.deactivated_at`.
- `AuthService` passa a rejeitar identities desativadas e suporta revogação de todas as sessões.
- Signin passa a rejeitar conta desativada.
- `POST /v1/privacy/deactivate` preparado como transação fail-closed:
  - bloqueia se houver assignment `confirmed/checked_in/in_progress`;
  - bloqueia se houver earning `pending/payable`;
  - marca identity desativada;
  - revoga todas as sessions;
  - remove availability futura;
  - converte interests ainda abertos para `withdrawn`;
  - preserva ledger/histórico.
- Company candidates/recommendations/confirmation, talent pools, team allocation e replacement foram ajustados para excluir identities desativadas dos fluxos novos/ativos.
- Criado `scripts/http-account-deactivation-e2e.sh`, conectado ao CI.
- Aberto PR #235 sobre #234.
- CI do PR #235: run `36093027949`, job `107939266660`, `steps=null`; PR permanece aberto e **não mesclado**.

## Regra de segurança dos PRs #233–#235
- São code/schema-bearing; não usar exceção documental.
- Não mesclar até existir CI realmente executado/green ou ambiente reproduzível equivalente.
- `steps=null` é bloqueio externo, não PASS e não falha funcional comprovada.

## Continuação ativa
- Próximos itens internos ainda auditáveis: purge/anonymization + legal hold runtime e expiração de geolocalização precisa.
- Continuar sem pedir confirmação; registrar todo avanço aqui.

## Assistente — retention runtime / legal hold / geo — PR #236
- Encontrado caminho seguro para materializar retenção sem criar um apagador cross-tenant privilegiado.
- Criada branch `feat/privacy-retention-runtime`, empilhada sobre #235.
- Criada migration `0036_privacy_legal_holds.sql` com scopes `identity`, `assignment`, `safety_case`, `financial_record`, reason, evidence_ref, review_at e released_at.
- `app_runtime` não recebe acesso à tabela de legal hold (`REVOKE ALL`).
- Criado `apps/api/src/privacy-retention.ts`, dry-run por default e aplicação somente com `--apply`.
- Runtime preparado para:
  - apagar sessions expiradas;
  - remover precisão de check-in/out após 30 dias em assignments encerrados;
  - preservar precisão sob legal hold de assignment ou identity;
  - anonimizar display_name/home_city/primary_role após 30 dias de conta desativada, salvo legal hold.
- Criado `scripts/privacy-retention-e2e.sh` provando limpeza e preservação sob hold.
- Aberto PR #236 `feat(privacy): retention runtime, precise-geo expiry and legal hold`.
- CI #236: run `36093302856`, job `107940100967`, `steps=null`; PR permanece aberto e não mesclado.

## Assistente — DSAR audit trail — PR #237
- O runbook v1.13 exigia `request_id` auditável, mas export/deactivation ainda não persistiam pedidos.
- Criada branch `feat/privacy-request-audit` sobre #236.
- Criada migration `0037_privacy_requests.sql`.
- Tipos persistidos: access, correction, erasure, restriction, objection, consent_withdrawal, automated_decision_review, sharing_information, deactivation.
- Estados: submitted, reviewing, completed, partially_completed, rejected.
- Runtime possui SELECT/INSERT/UPDATE e não possui DELETE do audit trail.
- `GET /v1/privacy/export` agora cria request `access`, retorna `requestId` e marca conclusão.
- `POST /v1/privacy/deactivate` cria request `deactivation` e registra completed/rejected.
- Adicionados `POST /v1/privacy/requests` e `GET /v1/privacy/requests` identity-scoped.
- `http-privacy-export-e2e.sh` reforçado para provar requestId, request correction, status/listagem e invalid type 400.
- Aberto PR #237.
- CI #237: run `36094439820`, job `107943589197`, `steps=null`; permanece aberto/não mesclado.

## Assistente — decisão provider-reference
- Considerada implementação genérica de binding server-controlled para PSP/KYC.
- Decisão: não congelar tabela/uniqueness genérica antes de selecionar o provider/produto real, porque escopo e unicidade das referências externas podem variar por conta, produto e provider.
- O requisito arquitetural permanece obrigatório, mas a forma concreta do binding é bloqueada corretamente até sandbox/provider real.

## Assistente — chat retention — PR #238
- Baseline v1.13 fixa 2 anos para conversation ligada ao assignment; runtime ainda não materializava isso.
- Criada branch `feat/privacy-chat-retention` sobre #237.
- `privacy-retention.ts` passou a usar `CHAT_DAYS=730`.
- Apenas mensagens ligadas a assignments `completed/cancelled` há >730 dias são candidatas.
- Legal hold do assignment bloqueia exclusão.
- Legal hold de qualquer identity participante da conversation também bloqueia exclusão.
- Conversation vazia antiga é removida após expiração de mensagens; held conversation permanece.
- `privacy-retention-e2e.sh` ampliado para provar chat deleted vs held e preservar os testes de geo/profile.
- Aberto PR #238.

## Assistente — mobile privacy controls — PR #239
- Auditoria de UX mostrou que direitos LGPD estavam materializados na API, mas sem acesso no produto mobile.
- Criada branch `feat/privacy-mobile-controls` sobre #238.
- Criada tela `apps/mobile/app/privacidade.tsx`.
- Usuário pode gerar cópia dos dados, ver `requestId`, registrar correção/eliminação/restrição/oposição/revogação/revisão automatizada/informação de compartilhamento, acompanhar status e solicitar desativação com confirmação.
- Tela ligada ao Perfil profissional e à Operação da empresa; direitos pertencem à identidade, independentemente do tenant/role.
- Aberto PR #239.
- CI #239: run `36094927150`, job `107945062991`, `steps=null`; permanece aberto/não mesclado.

## Assistente — proteção sole-owner — PR #240
- Auditoria da desativação encontrou risco de uma identity `owner` ser desativada e deixar tenant sem proprietário ativo.
- Criada branch `fix/privacy-sole-owner-guard` sobre #239.
- `POST /v1/privacy/deactivate` agora bloqueia com `account_deactivation_sole_tenant_owner` se qualquer tenant onde o usuário é owner não possuir outro owner com identity ativa.
- Blockers anteriores de assignment ativo e earnings pendentes permanecem.
- E2E agora cria empresa sole-owner, exige HTTP 400 na desativação e comprova que a sessão continua ativa.
- Mobile explica o blocker específico.
- Aberto PR #240.
- Busca no repositório não encontrou fluxo de gestão/transferência de owners já existente.
- Decisão de segurança: não criar endpoint global de elevação de privilégio sem desenho de membership/invite; manter fail-closed e tratar outro owner/transferência como pré-condição operacional até subsistema próprio ser desenhado.

## Regra de segurança dos PRs #233–#240
- Todos os PRs code/schema-bearing permanecem abertos e não devem ser mesclados enquanto o GitHub Actions terminar antes dos steps.
- A preparação de código não é considerada runtime proof nem Production-DONE.
- Próximo passo: checar CI de #238/#240, reconciliar Requirements/Trust/checkpoint e continuar auditoria de gaps internos antes de declarar parada externa.
