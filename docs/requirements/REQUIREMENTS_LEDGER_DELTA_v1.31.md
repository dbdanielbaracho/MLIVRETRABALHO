# Requirements Ledger — delta v1.31

**Data:** 2026-10-09  
**Fonte:** Documento da Verdade v1.31; main fonte `169cd0c9f83930af7d16569f95fb3073e4ca4f9d`; PR #341.

| ID | Requisito | Código | Teste/evidência | Estado |
|---|---|---|---|---|
| MOB-HOME-REAL-001 | Início usa perfil, agenda, ganhos e janelas reais; sem placeholders factuais | profissional-inicio.tsx, lib/professional-home.ts | tests/professional-home.test.mjs, MOBILE_REAL_HOME_AND_COMPANY_NAV_v1.31.md | Implementado na PR; gates CI/APK e merge pendentes |
| MOB-HOME-STATE-001 | Loading/erro/vazio honestos, nova tentativa e atualização no foco; falha não vira zero | mesmos arquivos | oito testes locais UTC/São Paulo; HTTP/rede/JSON/payload e retry | Lógica testada; UI autenticada/dispositivo não comprovados |
| COMPANY-NAV-BOTTOM-001 | /empresa, rota Trabalhos de CompanyNav, mantém barra fora da rolagem | empresa.tsx, CompanyNav.tsx | confronto v1.26 e código; CI/APK pendentes | Implementado na PR; auditoria visual OPEN |

React 19.1.4/RN0.81.6/lockfile preservados. Nenhum item é Production-DONE por teste local ou código apenas. Runs/SHA após integração devem ser registrados no checkpoint/evidência. Próxima pendência interna comprovada: atalhos Disponibilidade e Notificações do Perfil ainda abrem mensagem genérica apesar das rotas reais existentes.
