# MLIVRETRABALHO — Documento da Verdade v1.64

**Status:** NORMATIVO — DELTA SOBRE v1.63
**Data:** 2026-10-10

Preserva v1.63, desenho original, React19.1.4/RN0.81.6/lockfile, tenant/RLS e standalone sem Metro. Visual Truth OPEN.

## Respostas vinculadas à sessão de origem
Início Profissional usa um único snapshot imutável de Authorization para suas seis leituras e confere a sessão/foco antes e depois. Resultado antigo após troca de conta, timeout ou perda de foco não é apresentado como dado atual. Falha parcial na mesma conta continua erro da seção, sem zero/vazio fictício.

Trabalhos vincula a lista e o interesse à mesma Authorization. Troca de conta antes do envio impede POST; mudança durante operação impede mensagem de sucesso e exige atualizar. ACK mantém jobId real, professionalId não vazio e status interessado/confirmado reais. Endpoint/bodyless/idempotência/necessidade de perfil e autoridade backend intactos; nenhuma ação real executada.

## Correção demonstrada do gate HTTP
CI pós-merge #370 run38035165889 falhou ao calcular hash do primeiro token porque Node interpretou token começando por hífen como opção. Typecheck/build/export/tests/migrations/privacy passaram; o contrato HTTP completo dessa tentativa NÃO passou. Separador -- entrega token como dado sem alterar hash/policy/cap de sessões/rate limit. Três regressões executam o comando real extraído do script, inclusive token com hífen e --help; antes:2 falhas, depois:3/3pass. CI executa essas fixtures e mantém a jornada HTTP/DB completa. Não houve retry cego nem reclassificação do run antigo.

## Provas e limites
191/191 testes mobile locais em UTC e America/Sao_Paulo (8 novos contexto/ID),3 regressões CLI e bash-n aprovados. Fixtures locais não substituem CI/API/Android/aparelho. Próprios CI/APK do SHA publicado e pós-merge ainda necessários. Histórico/reconciliação/main/merges no journal0752Z; requisitos/evidência/memória/checkpoint no mesmo commit. Visual Truth físico/piloto/pentest/provider/FIN-RISK/PSP/WEB-ARCH separados e OPEN; sem dinheiro real/deploy pago/custo novo.
