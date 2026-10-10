# Requisitos —delta v1.91

|Requisito|Implementação/evidência|Estado|
|---|---|---|
|Nome real do espaço autorizado|GET/me/support-contexts,tenantId/displayName|minimização/5testes locais; CI pendente|
|Identidade atual como única autoridade|Auth primeiro, predicate identity_id parametrizado|Local aprovado; HTTP real ampliado pendente|
|Header alheio não amplia vínculos|Contrato A/B/profissional com header cruzado|CI PostgreSQL pendente|
|Vazio/erro verdadeiros|Sem vínculo [], banco falho erro|Local aprovado|
|Suporte geral sem assignment para membros|Fundamento nomes; escolha humana UI ainda ausente|Parcial/aberto|
|Profissional sem membership|Signup real sem namespace tenant|Decisão arquitetural requerida; RLS preservado|
|CI/paths/tree APK próprio|API110/mobile352 esperados, mobile inalterado|Comprovar remoto; natives400/401 não dispensados|
|Visual/Native completo|Sem mudança mobile nesta fatia|Gate físico original/estados aberto|

Inspeção do AuthController confirmou que signup profissional cria identidade, mas não cria tenant ou membership. Suporte atual exige vínculo de tenant e isolamento RLS. Para profissional sem qualquer vínculo, suporte geral depende de decisão de arquitetura/produto sobre autoridade de suporte por identidade e seu isolamento/retensão, ou outra solução explícita aprovada; não ligar profissional a empresa arbitrária, inventar tenant global, retirar a exigência de membership ou enfraquecer RLS.
Esse impedimento limita essa tarefa, não o projeto. Avançar na ajuda geral para vínculos já autorizados com seleção humana de nome real e sem UUID manual/tenant padrão; depois auditar Preferências contra requisito canônico e contratos existentes. Visual Truth físico com referência original/todos dados/estados/cobertura completa, SecureStore/teclado/payload/restart físicos, pentest, providers/TRUST, PSP/FIN-RISK, piloto/distribuição e WEB-ARCH permanecem abertos e independentes. Nenhum dinheiro real, PSP, custo ou deploy pago habilitado.

Publicar fix/named-support-contexts sobre head401 c3c8fd6d8c9dff52b82490e2218a1ad5571a624f/tree58261f5ead32453c846fa92429d522adedcea1f0, basefix/agenda-support-context. Conferir bytes remotos, patch, head/tree, paths de APK e igualdade da árvore mobile; aguardar CI próprio110/352. Número do PR e SHA da própria publicação devem ser registrados depois de conhecidos, sem previsão falsa.
Acompanhar400/401 APKs e pós399; integrar400 depois dos gates exatos aplicáveis aprovados, revisão fresca/main/head/merge-base; conferir pais/árvore/main e pós-gates reais. Retarget401main após400 integrado, reconsultar eventual mergeable, integrar só com gates próprios. Retargetesta fatia depois401 integrado e aprovar CI próprio antes de integrar. Não repetir399 ou ancestrais. Persistir novas provas no próximo delta, preservando snapshots históricos. Rotina mantida ativa até conclusão integral comprovada ou ordem explícita.
