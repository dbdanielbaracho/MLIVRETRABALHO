# Conta da empresa: navegação verdadeira e saída offline — v1.42

**Data:** 09/10/2026. **Base:** #351 5e8fffdfee0944b1e518d9b38ec556b65d62a6b9.

## Fontes/erro concreto
empresa-conta.tsx, membros.tsx, planejamento.tsx, casos-seguranca.tsx, notificacoes.tsx, NotificationsController e session.ts lidos. Notificações abria Planejamento; Dados da empresa abria Membros e Suporte abria Relatos. Sair podia rejeitar promessa sem catch/timeout, com headers antes do try.

## Correção/revisão
Componente compartilhado NotificationsScreen e wrappers profissional/empresa. GET empresarial usa tenant ativo; sem tenant é erro. GET profissional por identidade permanece abrangendo memberships existentes. POST leitura usa item tenant, guard e verificação de identidade/contexto; focus/blur cancela operações e invalida estados anteriores. Nenhum evento/dado inventado. CompanyNav/ProfessionalNav corretos fora da rolagem, estilos preservados.

Conta agora liga Notificações à capacidade real; labels Membros da empresa e Relatos de segurança descrevem telas disponíveis. Cadastro completo de dados da empresa não é declarado entregue. Saída manual guardada/limitada, limpeza local inclusive offline. Destinos Pagamentos/Privacidade mantidos; nenhum backend/policy/dependência/lockfile alterado.

## Provas e limites
51 testes existentes preservados em UTC/São Paulo, sem teste artificial de label condicional. Tipagem/bundle/CI/APK no head exato e pós-merge obrigatórios; taps/estados/renderização em aparelho não comprovados por unidade. Visual Truth OPEN. Próximos itens lidos: Planejamento e Pagamentos sem catch/foco/retry/timeout e com pay ausente virando zero; Membros/Relatos também têm rede/ações sem guards adequados, tratar separadamente preservando políticas.
