# MLIVRETRABALHO — Documento da Verdade v1.56

**Status:** NORMATIVO — DELTA SOBRE v1.55
**Data:** 2026-10-10

Preserva v1.55, referência original, React19.1.4/RN0.81.6/lockfile, tenant/RLS, standalone sem Metro. Visual Truth OPEN.

## Cadastro: criação comprovada, resultado incerto e controles humanos
Signup mobile utiliza contrato AuthController existente: normalizar email/trim, limites email320/senha8–128/nome empresa120 e escolha professional/company. Apenas resposta com ID/email/tipo iguais ao pedido permite ir para Entrar. Empresa também exige tenantId/role owner reais; profissional permanece independente, sem membership empresarial artificial.

Guard síncrono e inputs/botão indisponíveis durante envio,15s/cancelamento/foco, respostas antigas não navegam. Falha de rede/JSON/5xx/ack inválido mantém resultado desconhecido e direciona usuário a tentar entrar antes de criar outra conta; sem reenvio automático. email_in_use distinto com link Entrar. Senha em memória limpa ao sair/sucesso, sem log/cache de credenciais. Backend e provisão atômica/limites de signin/sessions permanecem intactos.

## Prova e limites
7 testes novos,133/133 mobile locais UTC e America/Sao_Paulo. Foco/guard/inputs/navegação revisados estaticamente; CI/APK/HTTP próprio e pós-merge obrigatórios. Nenhum cadastro ou workspace real criado pelo agente. Entrar ainda é pendência concreta separada: auditar payload/ack/sessionpersist/guard/timeout/contexto antes de modificar. Nenhuma conclusão de onboarding completo/Visual Truth/pentest/PSP/FIN-RISK/provider ou execução física.
