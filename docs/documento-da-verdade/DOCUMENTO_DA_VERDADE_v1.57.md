# MLIVRETRABALHO — Documento da Verdade v1.57

**Status:** NORMATIVO — DELTA SOBRE v1.56
**Data:** 2026-10-10

Preserva v1.56/React19.1.4/RN0.81.6/lockfile/tenantRLS/standalone sem Metro/referência original. Visual Truth OPEN.

## Login: resposta real e persistência verificada
Signin valida token opaco não vazio, identidade/email normalizado iguais ao pedido e lista de memberships reais antes de salvar. Vínculo gerencial owner/admin/manager/company usa seu tenant real; ausência válida mantém profissional independente e limpa tenant antigo. Rotas atuais /empresa-inicio e /trabalhos mantidas. Sem inferir JWT/tenant/fato de cadastro pelo cliente.

Guard síncrono/inputs bloqueados/loading,15s da operação/cancelamento/foco, resposta antiga não navega.429 informa aguardar,4xx credenciais e5xx/JSON/rede/ack inválido não anunciam acesso. Nenhuma repetição automática ou token inventado/logado; senha limpa no blur/sucesso. Backend autenticação/rate limiting/sessioncap/revogação/RLS permanece intacto.

Todas leituras/escritas de sessão no módulo compartilham fila. Par token/tenant do login usa comparação da sessão esperada, geração ativa e releitura após escrita; falha/blur faz tentativa de restauração do par anterior antes de liberar a fila. Leitor não observa escrita intermediária, rollback não apaga login posterior enfileirado. Erros SecureStore na operação verificada propagam para resultado failed, sem sucesso presumido por helper que engole erro. Não é promessa de atomicidade do armazenamento em crash do sistema; falha de restauração nunca é declarada saved.

## Prova e limites
13 testes novos (6 signin+7 storage/queue);146/146 mobile locais UTC/São Paulo. Schema/payload/rejeições;par completo/profissional limpa tenant/sessão alterada/rollback/exceção/concurrencyfila/queue após erro. Revisão estática de tela e binding SecureStore; CI/APK/head/pós-merge e interação física obrigatórios. Nenhuma credencial real usada/signin real pelo agente. Evidência/ledger/memória/checkpoint juntos. Gate visual/piloto/pentest/provider/FIN-RISK/WEB-ARCH separados; não declarar onboarding/projeto completo.
