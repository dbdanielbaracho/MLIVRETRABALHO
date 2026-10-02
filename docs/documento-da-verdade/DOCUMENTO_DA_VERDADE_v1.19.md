# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.19

**Status:** NORMATIVO — DELTA SOBRE v1.18  
**Data:** 2026-10-02

## 1. Regra de continuidade

A v1.19 preserva o escopo e os gates da v1.18, exceto onde este delta registra evidência nova ou corrige divergência encontrada entre implementação e baseline normativa.

O Documento da Verdade continua sendo a primeira fonte para decisões de produto, UX, arquitetura e escopo. Implementação não altera silenciosamente uma decisão aprovada.

## 2. Auditoria de fidelidade visual/UX

Foi encontrada uma divergência real no mobile profissional: `ProfessionalNav.tsx` expunha sete itens permanentes — Trabalhos, Agenda, Disponibilidade, Ganhos, Notificações, Segurança e Perfil — enquanto a baseline aprovada exige quatro áreas principais:

**Profissional:** Início | Trabalhos | Ganhos | Perfil.

A implementação foi corrigida para restaurar as quatro áreas. Agenda, disponibilidade e notificações continuam existentes, porém passam a ser acessadas contextualmente a partir da área Início ou do estado relevante da jornada, preservando funcionalidade sem proliferar navegação de primeiro nível.

Também foi explicitada no mobile a baseline de quatro áreas da empresa:

**Empresa:** Início | Trabalhos | Equipe | Conta.

Recursos administrativos e operacionais continuam disponíveis dentro dessas áreas/contextos; não se tornam novos itens permanentes de primeiro nível.

Esta correção aplica o gate de fidelidade visual/UX: possuir as mesmas funções não basta quando hierarquia, simplicidade e navegação divergem da baseline.

## 3. Android físico — evidência nova

O gate específico de execução do APK piloto no Samsung físico avançou com evidência real.

O crash reproduzido no aparelho foi atribuído a incompatibilidade de runtime entre React 19.3.0 e `react-native-renderer` 19.1.4. A correção alinhou React a 19.1.4 com React Native 0.81.6 e regenerou o lockfile.

Evidência:
- CI `36935508892`: SUCCESS;
- Standalone Pilot APK `36935508990`: SUCCESS;
- artifact `11206361088`, digest `sha256:dcf71acc85612f8f10d6ac2c9322845a9f6effafff305f2f4b9219c45620c7f5`;
- usuário instalou o novo APK no mesmo Samsung e confirmou funcionamento em 2026-10-02;
- PR #289 foi incorporado somente após essa confirmação;
- merge `ff6ef34870b61242e50cd0dd34d11936dd40833d`.

Evidência detalhada: `docs/evidencias/SAMSUNG_PHYSICAL_DEVICE_PASS_2026-10-02.md`.

### Limite da evidência

O teste físico fecha o defeito de startup e prova execução nesse Samsung para esse build. Não equivale a pentest independente, certificação de ampla matriz Android, Play Store readiness ou assinatura definitiva de produção.

## 4. Gates externos que permanecem

Continuam sem fabricação de evidência:
- Forecast/no-show ML: requer dados reais suficientes e validação;
- PSP/KYC/KYB e pagamentos reais: dependem de contrato, pricing, responsabilidades e sandbox autenticado;
- provider-specific trust propagation: depende do provider escolhido/evidência real;
- pentest independente: permanece externo;
- integrações enterprise específicas: dependem de sistema/contrato alvo;
- infraestrutura nova medida/paga continua sujeita ao guardrail de custo.

## 5. Regra operacional reforçada

Antes de implementar ou alterar produto, layout, fluxo ou requisito:
1. consultar o Documento da Verdade vigente;
2. confrontar a mudança com a baseline aprovada;
3. verificar o estado real do GitHub;
4. implementar com teste e evidência;
5. registrar mudança material em nova versão do Documento da Verdade.

Funcionalidade ainda em construção não é, por si, divergência. Deve ser sinalizada quando a implementação contradiz a baseline, quando algo é declarado concluído sem evidência ou quando evidência nova torna o documento desatualizado.
