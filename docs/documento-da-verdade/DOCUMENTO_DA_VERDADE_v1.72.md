# MLIVRETRABALHO — Documento da Verdade v1.72

**Status:** NORMATIVO — DELTA SOBRE v1.71
**Data:** 2026-10-10

## Respostas tardias e origem de conta

Privacidade recusa aplicar ACK/export/desativação depois do prazo de 15s, mesmo se o transporte completar; mantém resultado desconhecido quando a operação foi enviada e exige conferência explícita. Ler pedidos é GET sem criar DSAR; gerar export continua explícito e cria access DSAR no backend. Troca de identidade limpa detalhes/cópia da origem anterior; erros na mesma conta preservam rascunho. Desativação preserva confirmação humana, bloqueios backend e limpeza condicional da sessão.

Assistente usa runForSession para enviar com Authorization de origem imutável e verificar conta/foco/abort após interpretar, antes de mostrar sugestão. Mantém assisted, deterministic_baseline, executionAllowed=false, rotas por accountType e confirmação humana. Nenhuma chamada paga a LLM ou execução crítica introduzida.

Membros verifica abort/Authorization+empresa após GET/ACK e antes de selecionar a empresa. Aceite continua permitido à conta autenticada sem tenant selecionado; persistência condicional preserva a sessão e evita sobrescrever outra seleção. Rascunhos são limpos ao confirmar outra conta/empresa, inclusive após voltar à tela; refresh no mesmo contexto sem empresa não apaga o código. A geração marca incerteza antes do POST e a conserva após blur/timeout/resposta perdida; nova criação exige conferência manual, evitando substituir silenciosamente o segredo do convite anterior. Códigos secretos não são persistidos no checkpoint/log.

Schemas recusam IDs vazios/brancos de membros, convites, DSAR, identidade e vínculos da cópia. Código sem prefixo/segredo e criação/revogação sem ID de contexto não iniciam transporte. ACK real segue o contrato existente; não se inventa tenant echo ou UUID rígido no cliente. Convites mantêm roles owner/admin/manager, e-mail/expiração/vínculo, sem alteração de política, promoção ou tenant/RLS.

## Provas e continuidade

234/234 testes mobile locais passaram em UTC e America/Sao_Paulo, zero falha/cancelamento/skip. Sete regressões novas cobrem schemas/guards antes do transporte, aceite sem empresa selecionada, ACK incompleto e composição dos helpers reais com deadline/troca de conta. Três telas, dois helpers e três testes revisados; JSX e StyleSheet canônicos são idênticos aos da base. PrivacyController, CopilotController e CompanyMembersController atuais lidos integralmente. Nenhuma DSAR, exportação de pessoa real, desativação, convite ou interpretação real executada; apenas fixtures. React19.1.4/RN0.81.6, lockfile, backend, tenant/RLS e regras financeiras preservados. Checkout local parcial não prova type/build/HTTP/DB/native; próprios CI/APK e pós-merge continuam obrigatórios.

#376–#382 integradas com CI/APK próprios e árvores/pais/main conferidos. Pós #375 CI/APK success; pós #376–#382 CI success e APK em execução no snapshot, conforme EXECUCAO_VERIFICADA_2026-10-10_1129Z.md. Histórico de falhas preservado. Visual Truth físico e demais gates externos OPEN; journal/evidência/requisitos/memória/checkpoint atualizados no mesmo commit. Próxima pendência: snapshot pareado no redirect de index.tsx.
