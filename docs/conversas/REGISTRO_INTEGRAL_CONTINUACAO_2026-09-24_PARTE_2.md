# Registro Integral da Conversa — Continuação — 2026-09-24 — Parte 2

> Continuação sequencial do arquivo `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-24_PARTE_1.md`. A Parte 1 permanece preservada integralmente; esta Parte 2 continua o mesmo Registro Integral sem substituir nem resumir o histórico anterior.

## Contexto de continuidade obrigatório

- Projeto: MLIVRETRABALHO / AI Workforce Network.
- Repositório oficial: `dbdanielbaracho/MLIVRETRABALHO`.
- Documento da Verdade vigente: v1.8.
- GitHub é fonte persistente da verdade.
- Documento da Verdade e Registro Integral da Conversa permanecem separados.
- Não usar TinyFish neste projeto salvo nova instrução explícita do usuário.
- Toda conversa do chat referente ao projeto deve continuar sendo registrada em `docs/conversas/`.

## Usuário
continuar

## Assistente — continuação a partir do checkpoint v1.8
- Issues de fechamento rechecados: #214 Production Truth/CI, #215 FIN-RISK, #219 TRUST-ARCH, #220 Device/Pilot/Pentest, #221 LEGAL-ARCH e #224 WEB-ARCH continuavam abertos.
- Pesquisa atualizada usando documentação oficial atual para reduzir FIN-RISK e TRUST-ARCH antes do contato comercial.
- PSP shortlist documentada: Asaas, Pagar.me e Mercado Pago. Nenhum foi selecionado como provider aprovado.
- Asaas: documentação oficial atual mostra subcontas via API, sandbox, split por `walletId`, onboarding/documentos e webhooks; operação de subcontas em produção está sujeita a avaliação regulatória e requisitos contratuais.
- Pagar.me: API v5 suporta split entre múltiplos recebedores; documentação informa que Split está disponível apenas para clientes PSP, portanto elegibilidade comercial precisa ser confirmada.
- Mercado Pago: Split Payments 1:1 está disponível no Brasil; seller OAuth/KYC é requerido; 1:N depende de carteira assessorada/time comercial; responsabilidade de refund/saldo precisa ser avaliada no modelo concreto.
- Datavalid/Serpro registrado como candidato técnico de validação independente de identidade; versão/regime atual exige credenciamento/autorização SENATRAN, contrato Serpro e GCC conforme aplicável; não substitui KYC/KYB financeiro do PSP.
- Estratégia de minimização preservada: preferir onboarding/KYC/KYB nativo do PSP e armazenar no MLIVRETRABALHO apenas status/provider reference/evidence_ref quando possível.
- Evidência criada: `docs/evidencias/PROVIDER_SHORTLIST_RESEARCH_2026-09-24.md`.
- Issue #228 `PROVIDER-DUE-DILIGENCE` criado como autoridade para respostas comerciais, pricing, PF/PJ, KYC/KYB/PLD, sandbox, webhooks, settlement, chargeback/refund/negative balance, privacidade e homologação.
- Questionário único criado: `docs/evidencias/PROVIDER_DUE_DILIGENCE_QUESTIONNAIRE_2026-09-24.md`.
- Pacote de primeiro contato comercial criado: `docs/evidencias/PROVIDER_OUTREACH_PACKET_2026-09-24.md`, com mensagens e perguntas específicas para Asaas, Pagar.me, Mercado Pago e Datavalid/Serpro.
- Issues #215 e #219 atualizados com a shortlist, o questionário e referência ao #228, permanecendo OPEN até contrato/sandbox/revisão externa.
- `INTERNAL_COMPLETION_CHECKPOINT_2026-09-24.md` atualizado com a nova trilha de provider due diligence.
- Issues #229 e #230 foram criados acidentalmente durante troca de ações da ferramenta e imediatamente fechados como `not_planned`; não representam trabalho do produto. O issue canônico de provider é #228.
- Branch `main` confirmado no commit `01f8fbec19b1e26827161310ce18a7a68c050619` antes das atualizações seguintes.
- Issue #214 atualizado para remover contexto obsoleto da v1.74 e refletir o estado corrente: último code-bearing deploy v1.81 / PR #226 (`3c086b7d3a11f2bdbd0783b13f853f52c9352a4a`), Railway deployment `849dd047-c70f-4a16-8624-9a3a01bd8098` SUCCESS, Postgres SUCCESS, pending work zero, probe público histórico v1.79 PASS e current probe/full CI ainda pendentes.
- Nova tentativa de acesso direto ao endpoint público `https://mlivretrabalho.predibeacon.com/v1/health/ready` por ferramenta web não conseguiu acessar o domínio. Esse resultado não é interpretado como falha da API; apenas mantém o probe corrente pendente.
- Issue #228 atualizado para registrar que shortlist, questionário e outreach packet estão concluídos internamente; o que resta é resposta comercial/sandbox real.

## Estado de verdade neste ponto

O desenvolvimento interno seguro continua no limite atual. Nenhum dos gates externos foi falsamente fechado. Production Truth continua aguardando runner real + probe corrente; FIN-RISK/TRUST-ARCH aguardam provider/contrato/sandbox e revisões externas; Device/Pilot aguarda aparelho físico/release signing/pentest; LEGAL-ARCH aguarda parecer jurídico brasileiro identificado; WEB-ARCH aguarda ambiente com resolução de pacotes e lockfile reproduzível.
