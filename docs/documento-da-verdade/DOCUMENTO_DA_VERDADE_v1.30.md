# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.30

**Status:** NORMATIVO — DELTA CORRETIVO SOBRE v1.29  
**Data:** 2026-10-09

## Correção de conclusão prematura
A v1.30 preserva as alterações e provas de CI/APK dos PRs #333, #335, #337 e #338, mas revoga a declaração da v1.29 de fechamento integral da reconciliação estática das 11 telas. As provas disponíveis confirmam mudanças específicas e build/runtime; não demonstram cobertura visual e funcional completa.

A inspeção da main `7a5023e2634a66a84d1743629589829896885c8f` confirmou:
- `apps/mobile/app/profissional-inicio.tsx` exibe nome, contagem de trabalhos, ganhos, próximo trabalho, horário, local/distância e disponibilidade fixos, sem carregar dados reais;
- `apps/mobile/app/empresa.tsx` não importa nem renderiza `CompanyNav`. A rota canônica e a aplicação da navegação fixa devem ser confrontadas com o componente e a v1.26 antes da correção.

O Visual Truth Gate permanece **OPEN**. O desenho original aprovado, requisitos, código, dados/estados reais e evidência navegada devem sustentar qualquer fechamento futuro. CI e APK verdes não substituem essa comparação.

## Regra permanente de continuidade
O usuário reafirmou que não quer solicitar “continuar” repetidamente. A pausa anterior ocorreu por decisão inadequada do agente, ao tratar ausência de PRs/issues internos como ausência de trabalho.

1. Antes de cada execução, ler esta cadeia normativa, memória e checkpoint, consultar GitHub e conferir o código pertinente.
2. Bloqueio é por tarefa/dependência. Continuar nos trabalhos independentes seguros enquanto houver pendência concreta executável.
3. CI/APK em andamento significa acompanhar/aguardar, sem declarar conclusão ou bloqueio definitivo.
4. Ausência de PRs/issues não prova conclusão; revisar requisitos, referência, código e pendências persistidas.
5. Encerrar uma rodada não encerra o projeto. Registrar SHA, tarefa, PR/runs, resultado, impedimento e próxima ação concreta no checkpoint.
6. Não desativar a rotina por bloqueio parcial, falha transitória, fim de rodada ou avaliação superficial. Se todas as tarefas estiverem impedidas, registrar evidência e ação externa necessária; manter a rotina para reavaliar mudanças sem notificações repetidas.
7. Desativar somente após conclusão integral comprovada ou ordem explícita do usuário.
8. Não gerar tarefas especulativas/commits vazios nem contornar rejeições de segurança. Custos, credenciais, risco alto e aprovações limitam a operação correspondente.
9. Entregar código, documentos, memória e evidência no mesmo ciclo; não chamar resumo de transcrição literal.
10. Manter uma única rotina de continuidade e comunicação somente quando houver entrega material, bloqueio novo ou mudança importante.

A recorrência reabre execuções periodicamente; ela não garante trabalho ininterrupto nem execução exata no horário. Durante execução ativa, prosseguir sem esperar o próximo acionamento quando houver trabalho autorizado.

## Fila interna imediata
- Substituir dados fictícios de Início Profissional por dados de APIs existentes, com loading, erro e vazio honestos.
- Reconciliar a navegação da Empresa após comprovar a rota e referência aplicáveis.
- Reauditar a cobertura das 11 telas com o desenho original e dados/estados reais; registrar lacunas.

Checkpoint: `docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md`.

## Gates externos preservados
Dispositivo/piloto, pentest independente, PSP/KYC/KYB/PLD/sandbox/contratos, FIN-RISK/TRUST-ARCH específicos do provider e WEB-ARCH/custo/deploy continuam separados. Eles não impedem a fila interna acima e não são fechados por esta versão.
