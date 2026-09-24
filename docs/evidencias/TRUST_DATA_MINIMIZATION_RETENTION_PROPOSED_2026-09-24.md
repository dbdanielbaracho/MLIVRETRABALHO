# TRUST-ARCH — minimização, acesso e retenção proposta para revisão externa

**Data:** 2026-09-24  
**Status:** PROPOSTA INTERNA / NÃO DECLARA CONFORMIDADE LGPD  
**Gate:** TRUST-ARCH permanece OPEN/BLOCKING

## Objetivo

Preparar uma política conservadora de minimização e governança de dados para revisão jurídica/LGPD, sem inventar prazos legais definitivos e sem armazenar documentos sensíveis quando um provider pode fornecer apenas status/referência.

## Princípios

1. coletar apenas o necessário para a finalidade operacional explícita;
2. preferir `provider_reference`, status, timestamps e `evidence_ref` a cópia de documento bruto;
3. separar dados de operação, auditoria, Trust/Safety e financeiro;
4. limitar acesso por função e tenant;
5. manter fatos de auditoria append-only quando integridade exigir, sem convertê-los em exposição irrestrita;
6. não reutilizar evidência Trust/Safety para marketing, recomendação comercial ou treinamento de IA por padrão;
7. pedidos de acesso/correção/eliminação devem respeitar obrigações de retenção e preservação aplicáveis, a serem validadas juridicamente.

## Matriz proposta

| Classe | Exemplos | Acesso operacional | Retenção proposta antes da revisão jurídica | Regra de minimização |
|---|---|---|---|---|
| Identidade básica | e-mail, tipo de conta, sessão | usuário + serviços auth autorizados | enquanto conta ativa + janela de segurança a definir | não expor entre tenants |
| Perfil profissional | nome exibido, função, cidade | próprio usuário + superfícies necessárias do marketplace | enquanto conta/perfil ativo; pós-conta a definir | somente campos necessários ao matching/operação |
| Assignment/agenda | vaga, turno, status, check-in/out | partes autorizadas do assignment | ciclo operacional + janela de disputa/obrigação a definir | geolocalização apenas foreground e opcional conforme produto atual |
| Conversa | mensagens do assignment | participantes autorizados | janela operacional/disputa a definir | sem indexação pública; sem compartilhamento cross-tenant |
| Safety case | categoria, descrição, status | reporter/involved professional conforme regra + owner/admin autorizado | período de caso + janela de recurso/obrigação a definir | evitar anexos/documentos excessivos; evidência por referência quando possível |
| Appeal | motivo, status, ator, transições | appellant + owner/admin autorizado | alinhada ao caso e obrigação de auditoria, prazo final a definir | append-only para trilha de decisão; sem efeito automático de score |
| Trust event | tipo, causalidade, ator | administração autorizada conforme escopo | prazo legal/operacional a definir | causalidade explícita; histórico não recebe culpa retroativa inventada |
| KYC/KYB | status/provider/reference | capability gate + admins mínimos | provider/obrigação legal a definir | **não armazenar documento bruto por padrão** |
| Financeiro | payment/payout events, provider refs | payment admins autorizados + reconciliação | obrigações fiscais/contábeis/provider a definir externamente | fatos provider-provenanced; ledger append-only |
| Logs técnicos | erros, segurança, request metadata minimizada | operação/segurança | janela curta proporcional a diagnóstico/segurança, a definir | nunca registrar tokens/segredos; redaction obrigatória |

## Exclusão/correção — baseline funcional proposto

Enquanto a revisão jurídica não define obrigações finais:

- dados de perfil mutáveis devem admitir correção pelo usuário quando tecnicamente aplicável;
- logout/revogação de sessão deve permanecer separado de exclusão de histórico obrigatório;
- fatos financeiros/auditoria/Trust não devem ser apagados silenciosamente por endpoint de produto enquanto houver possível obrigação de retenção/integridade;
- eventual exclusão de conta deve distinguir dados que podem ser removidos/anônimos dos que precisam ser preservados por obrigação comprovada;
- qualquer retenção pós-conta precisa ter finalidade, base e prazo documentados na revisão jurídica final.

## Acesso interno

- tenant-owned: sempre sob tenant + RLS + autorização de papel;
- Safety/appeals: owner/admin apenas para administração do tenant, além da visão do usuário legitimamente envolvido;
- financeiro: somente papéis/capabilities necessários;
- provider KYC/KYB: preferir status/referência; acesso a documento bruto, se inevitável, deve ser excepcional e auditado.

## IA/Copilot

O Copilot permanece provider-neutral e sem autoridade crítica. Para dados Trust/Safety/KYC/financeiros:

- não enviar por padrão conteúdo sensível a LLM externo;
- qualquer futura inclusão exige policy explícita de finalidade, minimização, provider, retenção e contrato;
- tools críticas continuam deny-by-default.

## O que falta para aprovação

Esta proposta **não fecha** a checklist de retenção/LGPD. Antes de ativação formal é obrigatório:

1. revisão jurídica brasileira/LGPD do sistema concreto;
2. confirmação de obrigações contábeis/fiscais/financeiras por classe;
3. termos e retenção dos providers escolhidos;
4. definição de prazos finais, processo de DSAR/titular e legal hold;
5. atualização de contratos/termos/privacy notice conforme revisão;
6. testes de autorização, export/correção/exclusão quando definidos.
