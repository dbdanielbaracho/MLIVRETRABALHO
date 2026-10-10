# MLIVRETRABALHO — Documento da Verdade v1.42

**Status:** NORMATIVO — DELTA SOBRE v1.41  
**Data:** 2026-10-09

Preserva v1.41, baseline e continuidade v1.30. Visual Truth Gate OPEN.

## Conta: atalhos correspondem às capacidades reais
Notificações não pode abrir Planejamento. Conta agora abre /empresa-notificacoes com componente de notificações compartilhado e CompanyNav; Profissional continua /notificacoes com ProfessionalNav. NotificationsController aceita identidade/membership em ambos os perfis: empresa lê somente tenant ativo via header existente e profissional conserva leitura por identidade em seus tenants. Sem tenant na área Empresa é erro, sem fallback global.

Marcar leitura preserva tenant de cada item e identidade que originou os dados; mudança de contexto recarrega e não aplica ação antiga. Cancelamento/geração no blur evita retorno de operação anterior na tela atual. Loading/erro/vazio/retry/15s, estilos e navegações fora da rolagem preservados. Não são gerados novos eventos nem notificações fictícias.

Link Dados da empresa que abria Membros é nomeado Membros da empresa, refletindo capacidade existente. Não afirmar cadastro empresarial completo: essa jornada permanece a confrontar com requisitos/dados aprovados. Suporte que abria relatos é nomeado Relatos de segurança, sem promessa de atendimento inexistente. Pagamentos e privacidade mantidos.

Sair tem guard de toques repetidos e timeout de 15s. Headers ficam dentro de try; falha de rede não impede limpar sessão/tenant locais e retornar à entrada. Sem revogação remota falsamente afirmada quando offline.

## Verificação e limites
Revisão dos destinos/capacidades, NotificationsController e session.ts; extração compartilha comportamento/estilos e evita duplicar tela com regras divergentes. 51 testes locais UTC/São Paulo existentes preservados; não criar testes que apenas espelhem labels/rotas. CI/tipagem/Android e smoke standalone no SHA exato obrigatórios, pós-merge e taps visuais ainda pendentes. Evidência MOBILE_COMPANY_ACCOUNT_ROUTES_v1.42.md. Encadeada após #351.
