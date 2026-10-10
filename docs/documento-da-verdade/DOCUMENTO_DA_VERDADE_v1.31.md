# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.31

**Status:** NORMATIVO — DELTA SOBRE v1.30  
**Data:** 2026-10-09

## Continuidade
Preserva integralmente a v1.30, sua regra permanente de continuidade e os gates externos separados. Visual Truth Gate permanece **OPEN**. Este delta implementa duas pendências comprovadas no código; não declara auditoria integral nem aceite físico.

## Início Profissional com dados reais
A estrutura, identidade roxa, atalhos e navegação inferior são preservados. Dados são carregados com autenticação existente, sem filtro manual de empresa:
- perfil: `GET /professional-profile`; saudação usa o nome cadastrado ou “Olá!”;
- agenda: `GET /assignments/mine`; contagem de Hoje usa a data local de início, exclui cancelados e inclui concluídos; próximo trabalho inclui turno ainda em andamento e futuros ativos, ordenados por início;
- ganhos: `GET /earnings/mine`; métrica explicitamente “Ganhos na semana”, desde segunda-feira local até agora, estados payable/paid, excluindo reversões e timestamps futuros;
- disponibilidade: `GET /availability/mine`; distingue período atual, futuro e ausência de período vigente. Não infere disponibilidade permanente.

Horário e local vêm da agenda. Ausência de local é explícita; distância não é inventada. Cada seção distingue carregamento, sucesso vazio e erro HTTP/rede/payload. Erro não vira zero. Há nova tentativa e atualização ao retornar à tela; requisições são canceladas ao sair e limitadas a 15 segundos.

## Navegação da Empresa
`CompanyNav` aponta Trabalhos para `/empresa`. Essa rota é canônica mesmo contendo o formulário de criação. A barra passa a ser renderizada no final do SafeAreaView, fora do ScrollView, conforme v1.26. Rotas, formulário, payload e regras de publicação são preservados.

## Validação e limites
Oito testes da lógica executados localmente em UTC e America/Sao_Paulo: calendário, ordenação/turnos em andamento, semana/estornos, limites de disponibilidade, horários noturnos, vazio, falhas independentes e nova tentativa. Executados pelo script test do mobile, sem novas dependências ou mudança de lockfile.

CI/foundation e Standalone Pilot APK sem Metro continuam obrigatórios antes do merge e devem ser verificados na main após integração. Evidência desta implementação: `docs/evidencias/MOBILE_REAL_HOME_AND_COMPANY_NAV_v1.31.md`. Checkpoint registra andamento e resultados reais. Comparação navegada com referência original e dispositivo/piloto continuam pendentes.
