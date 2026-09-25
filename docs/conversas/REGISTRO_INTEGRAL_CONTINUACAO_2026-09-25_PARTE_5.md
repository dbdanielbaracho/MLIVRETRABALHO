# Registro Integral da Conversa — Continuação — 2026-09-25 — Parte 5

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-24_PARTE_4.md`. As Partes 1–4 permanecem preservadas integralmente. Esta Parte 5 continua o mesmo Registro Integral sem substituir nem resumir o histórico anterior.

## Contexto obrigatório
- Projeto: MLIVRETRABALHO / AI Workforce Network.
- Repositório oficial: `dbdanielbaracho/MLIVRETRABALHO`.
- Documento da Verdade vigente: `DOCUMENTO_DA_VERDADE_v1.12.md`.
- Requirements traceability: ledger base + deltas v1.11/v1.12.
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

## Estado atual
- #214 CI/Production Truth: PARADO EXTERNAMENTE.
- #215 FIN-RISK: PARADO EXTERNAMENTE por provider/contrato/pricing/sandbox/compliance; parecer jurídico externo removido como gate.
- #219 TRUST-ARCH: PARADO EXTERNAMENTE por provider/sandbox/LGPD operacional/pentest; parecer jurídico externo removido como gate.
- #220 Device/Pilot: PARADO EXTERNAMENTE.
- #221 LEGAL-ARCH: não depende mais de profissional externo; revisão interna v1.12 é o baseline.
- #224 WEB-ARCH: PARADO POR AMBIENTE.
- #228 PROVIDER-DUE-DILIGENCE: PARADO EXTERNAMENTE.
