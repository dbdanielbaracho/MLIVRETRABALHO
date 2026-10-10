# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.32

**Status:** NORMATIVO — DELTA SOBRE v1.31  
**Data:** 2026-10-09

## Continuidade
Preserva integralmente a v1.31 e a regra permanente de continuidade da v1.30. O Visual Truth Gate continua **OPEN**.

## Atalhos reais do Perfil
Os itens Disponibilidade e Notificações passam a abrir, em uma ação, as rotas existentes `/disponibilidade` e `/notificacoes`. O painel genérico de “área ainda não disponível” não deve interceptar capacidades que já existem.

A edição de Meus dados, o Work Passport/Experiência, os itens ainda não implementados e o acesso a Termos e privacidade mantêm seu comportamento. Linhas do menu são identificadas como botões para acessibilidade. Estrutura, estilos, navegação inferior, APIs, payloads e isolamento tenant são preservados.

## Entrega anterior verificada
PR #341: head `1a58d538b89269a89662cbf48ce12f3102293149`, CI `38006447169` e Standalone Pilot APK `38006447148` aprovados; integrado na main `1f40e9e0bcab3e302b3319652a8f030495d7ccde`. CI/APK pós-merge `38012421142`/`38012421105` em andamento no registro inicial. Não afirmar sucesso pós-merge antecipadamente.

## Gates e fila
CI e Standalone Pilot APK sem Metro permanecem obrigatórios antes do merge e devem ser conferidos na main após integração. React 19.1.4, React Native 0.81.6 e lockfile preservados. Evidência: `MOBILE_PROFILE_SHORTCUTS_v1.32.md`.

Inspeção do código de destino mostrou pendências independentes: Disponibilidade não trata rejeição de rede no salvamento nem impede submissão simultânea; Notificações não distingue carregamento/erro de vazio. Tratar em próxima fatia, sem fechar falsamente o projeto ou Visual Truth Gate. Gates externos continuam separados.
