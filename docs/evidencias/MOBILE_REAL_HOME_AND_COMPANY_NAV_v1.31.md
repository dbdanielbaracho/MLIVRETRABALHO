# Dados reais do Início Profissional e navegação Empresa — v1.31

**Data:** 2026-10-09  
**Fonte consultada:** main `169cd0c9f83930af7d16569f95fb3073e4ca4f9d`; Documento da Verdade v1.30, v1.26, checkpoint e memória.

## Divergências comprovadas
Início Profissional exibiu Ana, 2 trabalhos, R$120, oportunidade, horário, distância e disponibilidade fixos. CompanyNav aponta /empresa como Trabalhos, mas essa tela omitia a barra exigida na v1.26.

## Implementação
- Quatro GETs autenticados já existentes; sem filtro de tenant manual na visão profissional multiempresa.
- Nome real ou saudação neutra; Hoje por início na data local, sem cancelados; próximo turno ativo ordenado, incluindo em andamento.
- Ganhos na semana até agora (payable/paid), sem reversed, valores previstos/futuros ou conversão de erro em zero.
- Disponibilidade atual/futura/sem janela, derivada das janelas cadastradas; horário noturno inclui ambas as datas; local ausente explícito e distância removida.
- Loading/erro/vazio por seção, retry, cancelamento e timeout de 15s; recarga ao recuperar foco.
- Empresa: barra inferior fora da rolagem, sem alteração de formulário/publicação.
- Estilos canônicos preservados; sem alteração de React/RN/lockfile e sem novas dependências.

## Testes e alcance
`node --experimental-strip-types --test apps/mobile/tests/*.test.mjs`: **8/8 aprovados**, em UTC e America/Sao_Paulo. Casos: dias locais, cancelado/concluído, turno ativo/ordenado, semana, estorno/status desconhecido/futuro, disponibilidade nas bordas, turno noturno, quatro contratos/vazio, HTTP/rede/JSON inválido/payload malformado e nova tentativa. Testes passam a integrar pnpm test do mobile.

CI/APK/merge ainda pendentes no momento deste registro inicial. Atualizar checkpoint após verificação. A suíte de lógica não comprova aparência renderizada, fluxo completo autenticado em Android ou aceite em dispositivo físico. O smoke standalone comprova instalação/abertura sem Metro, não todas as telas. Visual Truth Gate permanece OPEN.
