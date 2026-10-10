# Requirements Ledger — delta v1.51

| Requisito | Código | Prova | Estado |
|---|---|---|---|
| Indicadores reais, loading/erro/403/retry/foco/15s | analytics.tsx; company-analytics.ts | MOBILE_ANALYTICS_STATES_v1.51; 6 novos testes | Implementado branch; CI/APK/taps pendentes |
| null distinto de zero; taxas backend sem teto indevido | validAnalytics/percentOrMissing | null/0%/200% e contagens inválidas | 107 locais aprovados; pós-merge pendente |
| GET tenant-bound sem mutações/predições | controller existente; headers tenant obrigatório | Contrato lido/endpoint testado | Backend/RLS/financeiro preservados |
