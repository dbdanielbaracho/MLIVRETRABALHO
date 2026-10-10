# Requisitos — delta v1.88

| Requisito | Evidência | Estado |
|---|---|---|
| Preservar chave/conteúdo em resultado incerto e reinício | Storage por identidade + fila + readback; 18 testes | Local aprovado; CI/APK próprios pendentes |
| Não converter falha de storage em slot vazio | failed para corrupção/read/write/readback | Local aprovado |
| Não substituir nem descartar tentativa pending | stage recupera registro existente; release exige confirmed | Local aprovado |
| Identidade correta após logout/relogin | Slot separado por UUID real; não guarda token | Contrato implementado; integração de sessão/UI aberta |
| ACK real antes de liberar intent | Schema, campos do payload e persistência verified | Local aprovado; transporte/UI aberto |
| Testar SecureStore e estados reais no aparelho | Payloads grandes/falhas/restart/sessão | Aberto; sem aceite físico |
| CI e standalone no SHA exato | 316 mobile / 105 API esperados e smoke sem Metro | Próprios pendentes |
| Envio humano completo | Fluxo, contexto real e interface canônica | Aberto; próxima etapa |

## Próxima ação concreta

Publicar fix/support-intent-durability sobre main60759a41bfb6a90aed80d85045b9ec837c50a3ad/treef222de6ba92646e70d3aa99b5bcd513097768d5f, base main. Conferir bytes remotos, patch, head/tree e runs; não antecipar número ou gates. Aprovar CI completo com 316 mobile / 105 API / 4 web / 3 CLI e APK standalone com instalação/abertura real sem Metro e artefato no SHA próprio.

#396–398 já integradas: acompanhar CI/APK pós-merge aplicáveis sem repetir os merges. Integrar esta etapa somente com revisão e CI/APK próprios aprovados no SHA exato; depois confirmar pais, árvore, main e pós-merge. Acompanhar o único retry pós-merge #388; não repetir merges já feitos ou retries indiscriminadamente.

Próximo produto: fluxo humano de envio com identityId real de GET /me, tenant e trabalho escolhidos nos dados da API; ler eventual intent da mesma identidade, persistir e verificar a barreira antes de POST, manter mesma chave/conteúdo em erro/timeout/reinício e confirmar storage somente com ACK válido da sessão atual. Testar foco/sessão/deadline, dupla ação e resposta tardia antes de conectar a interface. Nenhuma troca silenciosa de tenant, compensação com outra chave ou descarte de pending.

Histórico de suporte é leitura parcial; suporte geral/contexto Dia do Trabalho e Preferências ainda têm pendências. Visual Truth físico (desenho original, dados/estados reais e cobertura completa), aparelho/piloto/distribuição, pentest e providers/TRUST/PSP/FIN-RISK/WEB-ARCH continuam abertos e independentes. Rotina permanece ativa até conclusão integral comprovada ou ordem expressa; bloqueio parcial, run pendente ou fim de rodada não encerram o projeto.
