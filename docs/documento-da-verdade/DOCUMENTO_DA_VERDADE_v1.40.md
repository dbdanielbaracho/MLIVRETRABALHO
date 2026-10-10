# MLIVRETRABALHO — Documento da Verdade v1.40

**Status:** NORMATIVO — DELTA SOBRE v1.39  
**Data:** 2026-10-09

Preserva v1.39, baseline original e continuidade v1.30. Visual Truth Gate OPEN.

## Interessados: seleção coerente com a vaga e empresa
Catálogo empresarial, candidatos e recomendações têm loading/erro/vazio próprios, validação de payload, foco/retry e timeout de 15s. Troca de vaga limpa imediatamente os dados anteriores, cancela leitura e rejeita respostas de seleção/geração antiga. Falha de recomendação preserva interessados e ordem original; não é apresentada como ausência de recomendação. Só ranking validado da API ordena os candidatos, sem criar score.

Cabeçalhos tenant/identidade do catálogo são preservados para leituras da vaga e confirmação. Antes da operação, contexto atual deve corresponder ao que originou os dados exibidos; mudança de empresa/sessão exige Atualizar trabalhos, sem enviar IDs antigos no novo tenant. Backend/RLS/policy mantidos.

Confirmação continua manual, protegida contra toques repetidos e mudança de seleção durante envio. Interesse confirmed aparece confirmado; estados não interessados não oferecem re-confirmação. Só ack com job/profissional/tenant corretos e status confirmed informa sucesso; erro/timeout exige recarregar para conferir resultado, nunca confirma localmente. Releitura após operação não reaproveita signal que expirou. Contrato existente devolve confirmação existente apenas em confirmed, rejeitando outros estados. Sem nova alocação financeira ou ação automática.

## Prova e limites
Cinco novos testes; 45/45 locais UTC/São Paulo. Cobrem catálogo, sucesso parcial, ranking real sem mutação, contexto tenant+identidade, ack/falhas. Revisão do controle de seleção/cancelamento realizada; testes de unidade não provam taps/race visual no aparelho. Documento/evidência/requisitos/memória/checkpoint mesmo ciclo. CI/APK exatos e pós-merge obrigatórios. Encadeada após #349.

## Próxima ação
Integrar fila na ordem após gates exatos, confrontar capturas/jornadas/estados reais com PNG original. Equipe continua com pendência comprovada de seleção/rede/salvamento. Gates externos separados; não há declaração de conclusão integral.
