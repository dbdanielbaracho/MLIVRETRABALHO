# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.11

**Status:** NORMATIVO — DELTA CONSOLIDADO SOBRE v1.10  
**Data:** 2026-09-24  
**Fonte persistente oficial:** repositório GitHub `dbdanielbaracho/MLIVRETRABALHO`

## Regra de continuidade

A v1.11 incorpora integralmente por referência as versões v1.5, v1.6, v1.7, v1.8, v1.9 e v1.10. Em conflito explícito, v1.11 prevalece.

---

# 1. FRONTEIRA DE CONFIANÇA COM PROVIDER KYC/KYB REAL

Antes de qualquer integração real com Datavalid/Serpro, PSP-native KYC/KYB ou outro fornecedor de identidade, fica definido que o provider externo é autoridade apenas sobre fatos e referências pertencentes ao próprio provider.

O provider externo **não é autoridade** para definir:

- `tenantId` interno;
- `identityId` ou business ID internos;
- membership/role;
- score/reliability;
- assignment/payment action;
- suspensão/deactivation;
- culpa ou conclusão de Safety case.

Fluxo obrigatório para callback real:

`autenticar callback → extrair provider reference → resolver binding server-controlled → derivar verification case/tenant/sujeito → entrar em RLS → normalizar evidência/estado → manter enforcement material separado/human-review`

Referência desconhecida, ambígua, duplicada ou conflitante deve parar em rejeição/revisão. Não deve existir busca cross-tenant por tentativa.

Evidência: PR #232, merge `06aca1daed708495af16511198bee40ae80367db`, `docs/evidencias/TRUST_PROVIDER_REFERENCE_BOUNDARY_v1.84.md` e `docs/adr/ADR-TRUST-001-PROPOSED.md`.

---

# 2. PROVIDER RESULT NÃO É ENFORCEMENT AUTOMÁTICO

Resultado de KYC/KYB/identidade é evidência para o fluxo de verificação.

Enquanto TRUST-ARCH permanecer OPEN, callback de provider não pode automaticamente:

- alterar Reliability Score;
- bloquear ou cancelar assignment confirmado;
- alterar pagamento;
- suspender globalmente;
- desativar conta;
- declarar culpa em Safety case.

Ações materiais continuam sujeitas à arquitetura case-first, reason codes, human review e appeal/contraditório já definidos.

---

# 3. DATA MINIMIZATION DE IDENTIDADE

Baseline de armazenamento:

- provider;
- provider reference;
- estado normalizado de verificação;
- reason/evidence reference;
- timestamps;
- fatos mínimos de auditoria.

Documentos brutos, imagens de documentos e payloads biométricos não devem ser persistidos por padrão quando o provider puder retê-los e fornecer somente a evidência/status necessários.

Retenção final continua dependente de LGPD/legal review.

---

# 4. SANDBOX OBRIGATÓRIO ANTES DE FECHAR TRUST-ARCH

Antes de aprovar um provider real, deve existir evidência de sandbox cobrindo no mínimo:

- autenticação de callback;
- idempotência/replay;
- binding de provider reference para exatamente um verification case/tenant;
- rejeição de referência desconhecida;
- proteção contra colisão cross-tenant;
- status conflitante/stale sem overwrite silencioso;
- impossibilidade de callback alterar score, assignment, payment ou enforcement diretamente;
- minimização de dados;
- trilha de auditoria preservada.

---

# 5. STATUS DOS GATES

## Production Truth / CI — #214

**PARADO EXTERNAMENTE.** O `main` v1.10 foi rechecado e o run `36083007417`, job `107908804460`, terminou antes dos steps (`steps=null`). Railway continua com API/Postgres `SUCCESS`. Novo probe público foi tentado sem TinyFish, mas a ferramenta atual não conseguiu acessar o domínio; isso não é interpretado como falha da API.

## FIN-RISK — #215

Permanece OPEN pelos mesmos gates externos da v1.10.

## TRUST-ARCH — #219

Fronteira interna v1.84 agora consolidada. Ainda faltam:

- provider KYC/KYB elegível/selecionado;
- sandbox/callback real autenticado e idempotente;
- LGPD/retention final;
- revisão jurídica brasileira;
- pentest/adversarial externo.

## PROVIDER-DUE-DILIGENCE — #228

Continua aguardando confirmação comercial, pricing, elegibilidade, sandbox e termos reais dos providers.

## Device/Pilot/Pentest — #220

Sem mudança: depende de aparelho físico, release signing/update real e pentest.

## LEGAL-ARCH — #221

Sem mudança: pacote interno pronto; falta parecer profissional externo identificado.

## WEB-ARCH — #224

Sem mudança: ambiente de dependências/lockfile reproduzível continua bloqueado.

---

# 6. CONTINUIDADE DOCUMENTAL

Toda conversa do chat referente ao MLIVRETRABALHO continua sendo registrada em `docs/conversas/`.

TinyFish permanece excluído deste projeto salvo nova instrução explícita futura do usuário.

Quando um gate estiver realmente parado, isso deve ser informado claramente e registrado; nenhum gate externo deve ser marcado como concluído sem evidência correspondente.
