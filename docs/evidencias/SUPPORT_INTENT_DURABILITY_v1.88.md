# Evidência — persistência da tentativa de suporte v1.88

## Persistência da tentativa móvel de suporte

O contrato de envio exige preservar a mesma chave, identidade, tenant e mensagem quando uma criação fica sem confirmação. support-intent.ts implementa uma barreira local persistida: um único registro por identidade autenticada, com payload normalizado, requestKey e fase pending ou confirmed. O adapter usa o Expo SecureStore já instalado, sem token no registro nem dependência nova.

stage lê o slot antes de escrever e verifica a leitura depois da escrita. Qualquer registro anterior, mesmo de outro trabalho/tenant da mesma identidade, bloqueia sua substituição. Falha de leitura, JSON/schema inválido, escrita ou readback divergente retorna failed, nunca um slot vazio ou persistência confirmada. A fila compartilhada serializa leituras, escritas, confirmações e exclusões concorrentes; uma escrita que salvou mas perdeu seu ACK é recuperada na próxima leitura, sem trocar a chave.

A identidade é normalizada como UUID e separa os slots. Troca de usuário não expõe nem sobrescreve o registro anterior. Logout não apaga uma tentativa de resultado incerto; relogin da mesma identidade recupera a mesma chave/conteúdo. O módulo de storage não autentica: o futuro fluxo precisa verificar GET /me e sessão/foco antes de preparar, ler/aplicar e enviar. Não inferir identidade a partir de campos do formulário ou do token armazenado.

Payload segue enums reais do backend e limite de 4000 codepoints Unicode, sem truncamento. Campos extras e Authorization não são persistidos. confirm exige UUID de chamado, categoria/priority iguais ao payload, status não vazio e data válida; preserva a chave/conteúdo e verifica a gravação confirmed. ACK malformado, chave/identidade errada ou falha de storage mantém a barreira. confirmed também não libera sozinho um novo intent: releaseConfirmed exige chave exata, fase confirmada e verifica exclusão. Não há operação para descartar pending ou substituir uma tentativa incerta.

Dados locais ficam no SecureStore da identidade até confirmação e liberação explícita. Não há sincronização externa, token em draft, novo banco ou alteração de retenção do chamado no servidor. Limites/falhas do storage nativo, inclusive payload grande, precisam de validação no aparelho; a falha deve impedir o futuro POST. Não afirmar atomicidade contra crash do SO nem aprovação de erasure/DSAR local por estes testes.

18 testes novos exercitam schema/enums/Unicode, persistência antes de saved, prevenção de replacement, restart/relogin, troca de identidade, corrupção, falhas reais, escrita com ACK perdido, readback divergente, corrida de stage, ACK factual, confirmação que falha, proibição de descartar pending e liberação confirmada que verifica exclusão. PASS local 18/18 em UTC e America/Sao_Paulo com o módulo real, sem storage/HTTP externo. O adapter SecureStore em aparelho não foi executado. Total mobile esperado 316 (298+18); API continua 105, a confirmar no CI próprio.

A etapa fornece armazenamento e contrato, sem habilitar interface ou POST de criação. Nenhum chamado real foi enviado. Como há novos arquivos mobile, CI e APK standalone próprios são obrigatórios no SHA exato. React 19.1.4, RN 0.81.6, lockfile, tenant/RLS, navegação e desenho original permanecem preservados. Nenhum PSP, dinheiro real, cobrança ou deploy pago.

## Estado e provas anteriores

Verificação de 2026-10-10, 17:42 UTC: main 60759a41bfb6a90aed80d85045b9ec837c50a3ad, tree f222de6ba92646e70d3aa99b5bcd513097768d5f, Documento da Verdade v1.87. #396, #397 e #398 integradas nesta etapa, em ordem, após retarget main, diff idêntico ao revisado e gates próprios no SHA exato. mergeable false imediato no retarget foi reconsultado e tornou-se true; não houve conflito real nem overwrite.

| PR | Head aprovado | Merge real | Gates próprios |
|---|---|---|---|
| #396 | 26b3fb2365200415366e12da76710a0ad629725b | 56922ded75cb1cb4d8b7fb101cb0659832379db9 | CI38071421868/job114269432957:298 mobile/88API/4web/3CLI; APK38071421849/job114269432897 aprovado |
| #397 | be12cb6905234a081472971a8e37e5cbdc98d9cf | 377a5e0e708a6d93d2c84c3323f16121a14e43d5 | CI38071852247/job114270695562:298mobile/98API/4web/3CLI, migrations/HTTP concorrente/SQL; APK próprio N/A |
| #398 | f1f7b2119c3522086a36096007c8f21e2e74bd78 | 60759a41bfb6a90aed80d85045b9ec837c50a3ad | CI38072354467/job114272206876:298mobile/105API/4web/3CLI, migrations/HTTPpreparação+concorrência; APK próprio N/A |

APK próprio #396: instalação Success em 17:39:44.4146891Z e DEVICE_SMOKE_OK metro_required=false em 17:40:23.7681833Z. ZIP validado11677198964, sha256:47b21ee4d0943b465700e97c1b543be2f10fcc811acbf2e5c9ffe8ca8495ef32, não expirado e workflow head26b3... exato. Digest é do ZIP do artefato, não do APK individual; smoke de emulador não é aceite visual físico. Primeiro CI396be08.../38071227829 falhou TS18048 e foi corrigido sem enfraquecer testes; não usar gate do primeiro head para o corrigido.

Pais de cada merge foram confirmados como [main anterior, head próprio]; árvores de merges byteidênticas às árvores aprovadas (39687ac6719b538d92a2b1843e9954cee80de0aece4;397d57bfbb2cfb11ace871e0c3ef4c9a41ac6088763;398f222de6ba92646e70d3aa99b5bcd513097768d5f). Bytes remotos/patches de todas foram conferidos, e main confirmada após cada merge. APK próprios397/398 N/A por paths efetivos e árvore mobile163de7d27fe6b49fb11d87ed9a9da2bf8b9e47e7 idêntica à396.

Pós-merge #396 no SHA56922...: CI38072758220 e APK38072758154 em execução. Pós #397 no SHA377a5...: CI38072798277 em execução, APK próprio N/A. Pós #398 no SHA60759...: CI38072830711 em execução, APK próprio N/A. Não considerar gates pré-merge suficientes para declarar estes pós-merges completos.

388–395 já integradas. Único retry pós-merge #388run38054154641, tentativa2/job114268524350, continua em execução após pedido17:17:11UTC; falha anterior foi infraestrutura Brokenpipe32/exit224 antes de instalação. Não solicitar novo retry automático. Evidências dos demais pós-merges/históricos estão em1717Z/v1.85. Não repetir merges351–398.

## Próxima ação concreta

Publicar fix/support-intent-durability sobre main60759a41bfb6a90aed80d85045b9ec837c50a3ad/treef222de6ba92646e70d3aa99b5bcd513097768d5f, base main. Conferir bytes remotos, patch, head/tree e runs; não antecipar número ou gates. Aprovar CI completo com 316 mobile / 105 API / 4 web / 3 CLI e APK standalone com instalação/abertura real sem Metro e artefato no SHA próprio.

#396–398 já integradas: acompanhar CI/APK pós-merge aplicáveis sem repetir os merges. Integrar esta etapa somente com revisão e CI/APK próprios aprovados no SHA exato; depois confirmar pais, árvore, main e pós-merge. Acompanhar o único retry pós-merge #388; não repetir merges já feitos ou retries indiscriminadamente.

Próximo produto: fluxo humano de envio com identityId real de GET /me, tenant e trabalho escolhidos nos dados da API; ler eventual intent da mesma identidade, persistir e verificar a barreira antes de POST, manter mesma chave/conteúdo em erro/timeout/reinício e confirmar storage somente com ACK válido da sessão atual. Testar foco/sessão/deadline, dupla ação e resposta tardia antes de conectar a interface. Nenhuma troca silenciosa de tenant, compensação com outra chave ou descarte de pending.

Histórico de suporte é leitura parcial; suporte geral/contexto Dia do Trabalho e Preferências ainda têm pendências. Visual Truth físico (desenho original, dados/estados reais e cobertura completa), aparelho/piloto/distribuição, pentest e providers/TRUST/PSP/FIN-RISK/WEB-ARCH continuam abertos e independentes. Rotina permanece ativa até conclusão integral comprovada ou ordem expressa; bloqueio parcial, run pendente ou fim de rodada não encerram o projeto.
