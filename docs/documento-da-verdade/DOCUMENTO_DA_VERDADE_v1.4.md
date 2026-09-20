# Documento da Verdade — MLIVRETRABALHO

**Versão textual sincronizada:** v1.4  
**Status:** documento normativo do projeto.

> O arquivo editorial completo v1.4 também existe em DOCX. Esta versão Markdown mantém no GitHub as decisões centrais em formato versionável e pesquisável.

## Definição
MLIVRETRABALHO é um AI Workforce Network + Workforce OS + Marketplace mobile-first. A tese central é: **não apenas encontrar trabalhadores; orquestrar a força de trabalho.**

## Arquitetura oficial de desenvolvimento e operação
O aplicativo mobile é o produto operacional principal. O web complementa o produto e não substitui o aplicativo.

- Mobile: React Native + Expo + TypeScript.
- Web: Next.js + React + TypeScript.
- Backend: NestJS sobre Fastify + TypeScript, inicialmente modular monolith.
- Monorepo: pnpm + Turborepo.
- API: REST + OpenAPI; WebSocket/SSE quando necessário.
- Dados: PostgreSQL + PostGIS.
- Cache/filas: Redis + BullMQ; Temporal somente quando workflows duráveis justificarem.
- Allocation Engine: Python + OR-Tools.
- IA: gateway multi-provider; LLM não é decisor único de decisões críticas.
- Storage: S3-compatible.
- CI/CD: GitHub Actions.
- Deploy: Railway.
- Observabilidade: OpenTelemetry + Sentry.
- Testes: Vitest/Jest, Playwright, Maestro/Detox e k6.

## UX
Professional: **Início | Trabalhos | Ganhos | Perfil**  
Company: **Início | Trabalhos | Equipe | Conta**

Princípio: eliminar fricção. Poucas telas, mínimo de toques, informação contextual, não pedir dados já conhecidos, automatizar casos normais e deixar complexidade necessária no backend.

## Produto
Marketplace + Workforce OS + Work Network + AI Engines. Modos de IA: Manual / Assisted / Automatic.

## Matching e alocação
O Workforce Allocation Engine considera disponibilidade, skills, distância, scores, experiência, remuneração, preferências, histórico, recorrência, risco de no-show, compliance e restrições de agenda/equipe.

## Pagamentos
Baseline de produto suporta:
1. Split automático — preferencial/default.
2. Pagamento consolidado — alternativa/enterprise.

Ledger deve separar GMV, payable profissional, fee da plataforma, fee do processador, ajustes, refunds/disputes/chargebacks, payout e reconciliação. Provider permanece aberto até decisão fundamentada.

## Trust & Safety
KYC/KYB, identidade/documentos, fraude, abuso, discriminação, reporting, segurança no trabalho, integridade do marketplace, no-show, cancelamento, manipulação de ratings, leakage, default, chargeback, payout fraud e account takeover.

## Legal e compliance
Não desenhar rotação artificial para “evitar vínculo”. Compliance Radar sinaliza concentração/recorrência e sugere revisão; não declara inexistência de vínculo. Decisões materiais passam pelos gates LEGAL-ARCH, FIN-RISK, ADR-MT-001, TRUST-ARCH e COMP-EVIDENCE.

## Concorrentes
Análise obrigatória, com fontes primárias quando possível: Estaff, Instawork, Qwick, Indeed Flex e Job&Talent, além de especialistas pertinentes ao problema.

## Governança
GitHub é a fonte persistente oficial para documentos, ADRs, código, testes e evidências. Mudanças materiais devem ser rastreáveis. Produção/código/testes prevalecem como evidência de implementação; este documento define o que deve existir.

## Registro Integral
O projeto mantém separadamente um Registro Integral da Conversa. Ele preserva o histórico literal recuperável e não substitui este documento normativo.
