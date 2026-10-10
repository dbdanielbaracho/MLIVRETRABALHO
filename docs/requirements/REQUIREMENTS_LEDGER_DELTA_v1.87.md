# Requisitos — delta v1.87

| Requisito | Implementação / evidência | Estado |
|---|---|---|
| Gerar chave criptográfica sem mudar dependências móveis | POST /support-cases/intent; node:crypto.randomUUID; testes de controller e HTTP | Implementado; CI próprio pendente |
| Auth/membership/assignment reais antes de preparar | Mesma validação de suporte; consulta tenant/RLS; identidade do auth | Local aprovado; HTTP próprio pendente |
| Preparação não confirma nem cria chamado | Ausência de INSERT/UPDATE/DELETE; fixture conta zero chamados após várias chaves | Local aprovado; HTTP próprio pendente |
| Chave não autoriza nem substitui validação da criação | POST /support-cases preservado da v1.86 | CI #397 aprovado; integração pendente de #396 |
| Repetir criação sem duplicar | Mesma chave e payload, unique tenant/reporter/key, ACK atual | #397 CI 98 API e HTTP concorrente aprovados |
| Tentativa móvel durável e identidade correta | Persistência antes do transporte; barreira de resultado incerto e relogin | Aberto; próxima etapa |
| CI/APK antes e depois do merge | Gates no SHA exato; N/A próprio API somente após paths/mobiletree | Pendentes conforme checkpoint |
| Visual original e estados reais no aparelho físico | Cobertura integral e validação humana | Aberto |

## Próxima ação concreta

Publicar fix/support-intent-preparation sobre be12cb6905234a081472971a8e37e5cbdc98d9cf, com base fix/support-intent-idempotency. Reconsultar PR/SHA/runs, revisar patch e conferir todos os bytes publicados; não antecipar número ou aprovação. Esperar CI próprio com 105 API / 298 mobile / 4 web / 3 CLI e fixture HTTP/PostgreSQL.

Acompanhar APK da #396 e único retry pós-merge #388. Integrar #396 somente com CI/APK/smoke/artefato no SHA exato; conferir pais, árvore e main pós-merge. Depois retarget #397 e esta etapa para main, em ordem, com nova revisão/gates. Reconsultar mergeable eventual antes de diagnosticar conflito real; não sobrescrever predecessores. Verificar CI/APK pós-merge aplicáveis e persistir resultados reais.

Próximo produto independente: armazenamento durável da tentativa de suporte, vinculado à identidade autenticada (GET /me retorna id no nível superior), tenant e trabalho escolhidos nos dados reais, antes do transporte. Falha de storage impede POST. Timeout ou resposta inválida mantém conteúdo/chave sem confirmação falsa. Mudança de sessão/identidade não pode reenviar draft de outra pessoa nem apagar uma barreira de resultado incerto; relogin da mesma identidade deve permitir retomada segura. Testar races, persistência, ACK e falhas antes de habilitar UI.

Histórico de suporte permanece leitura parcial; suporte geral/contexto Dia do Trabalho e Preferências ainda têm pendências. Visual Truth físico (desenho original, dados e estados reais, cobertura completa), piloto/aparelho/distribuição, pentest e providers/TRUST/PSP/FIN-RISK/WEB-ARCH continuam abertos e independentes. Não declarar projeto concluído. Bloqueio parcial ou fim de rodada não encerra continuidade; manter a rotina, sem promessa de execução 24h ou nova automação.
