# Início confrontado com referência original — v1.38

**Data:** 09/10/2026. **Base de implementação:** #347 a6a78dd3623fa75800d72e67e271f727e534a5c8. **Referência:** DOCX v1.2 página 26/PNG intacto em docs/referencias; JobsController/WorkPassportController/Assignments já lidos.

## Comparação concreta
Desenho aprovado: próximo trabalho, oportunidades para você, passaporte/reputação e card roxo de ganhos. Código em main omitira oportunidades/passaporte e deslocara ganhos para duas estatísticas superiores brancas. Correção recompõe sequência/cards com capacidades existentes e mantém disponibilidade/navegação/marca. Próximo trabalho agora mostra payCents validado ou ausência explícita, sem valor inventado.

GET /jobs fornece oportunidades abertas, sem claim de personalização algorítmica. GET /work-passport/mine fornece contagem/média/avaliações; nenhum nível Prata/96% de recontratação é fabricado. Loading/falha/vazio/ausência de perfil distintos, retry/foco/timeout preservados. Data atual local e notificações clicáveis. Sem foto genérica fingindo estabelecimento real ou promessa de pagamento.

## Verificação e limites
Cinco testes novos: APIs/dados reais, vazio/404 conhecido, payload/falhas, partial success/retry, pay real/ausente/inválido. Total **36/36 UTC/São Paulo**. Não provaram renderização/ordem de pixels/taps; CI/APK/gates próprios e pós-merge pendentes. Visual Truth global OPEN; imagens/estados reais precisam ser confrontados depois da integração. Referência aprovada tem dados ilustrativos; não habilita PSP/garantia/custos.

## Integração em andamento
#342 integrado main aee58e7776eee0dc211713edcbe29075f841ecb1, CI 38012515909/APK 38012515803 sucesso no head exato. Pós-merge runs 38014015303/38014015274 em acompanhamento. #343 retarget main; merge previsto árvore igual ao head testado b4583e2d9aa1e6bb784c3345157f589a85ce99a8. Esta fatia encadeada após #347; retarget/revisão/gates próprios/pós-merge antes de entrega.

## Correção do gate de tipagem
CI 38014176712 no head dce89f851b341a529c95c495b36d27effa00c5d5 falhou TS18048: a união Section agrupa loading/error, e excluir ambos separadamente não garantiu narrowing. Render de oportunidades agora exige status ready explicitamente antes de acessar data. Sem tornar falha uma lista vazia; validação obrigatória no novo SHA, nenhum merge autorizado pelo run anterior.
