# Cadastro — ack/estados reais — v1.56

Snapshot 2026-10-10 06:39:40 UTC; base #366 head1c4b713e02d0bba8e3ef0b7d7f970f500e834391. Fonte: AuthController/AuthService, criar-conta.tsx, COMPANY_ONBOARDING_v1.53 e script HTTP onboarding existentes.

Signup antes não tinha guard/timeout/catch nem validava JSON de criação antes de navegar. Novo helper valida limites iguais ao backend, body/normalização e ack ID/email/accountType; para empresa tenantId+owner, profissional sem vínculo artificial. Unknown em timeout/JSON/5xx/malformed resposta; não reenviar. Guard ref antes de await,15s, foco/abort/generation, loading/inputs disabled; password clear blur/success. Link Entrar após email_in_use/resultado incerto para conferir cadastro existente; nenhuma tentativa automática de login/cadastro.

7 testes novos;133/133 mobile locais UTC/São Paulo: payload profissional, owner empresarial, required/limites antes de rede, ack errado, rejeição/email_in_use vs5xx,timeoutuma chamada,JSONinválido. Fixtures somente unidade. Revisão estática de JSX/foco/guard não prova interação física. CI/typecheck/build/HTTP/APK/pós-merge pendentes no SHA próprio. API/atomicSQL/RLS/signinrate/sessioncap/retention/styles/deps/workflows preservados. Nenhuma criação real de identity/tenant pelo agente. Entrar permanece pendência separada a revisar, não fechar onboarding completo. Visual Truth OPEN.
