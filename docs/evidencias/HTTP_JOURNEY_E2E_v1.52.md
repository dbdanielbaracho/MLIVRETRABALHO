# Evidência — HTTP Journey E2E v1.52

## Objetivo
Elevar a jornada principal de teste SQL para integração HTTP real, exercitando autenticação, autorização, controllers e banco juntos.

## Isolamento do teste
O CI cria um banco PostgreSQL separado (`mlivretrabalho_http`) e aplica nele o migration runner oficial antes de iniciar a API. Produção não é acessada.

A única fixture direta no banco é:
- criação de um tenant de teste;
- memberships do usuário empresa e do usuário profissional.

Todo o fluxo de negócio restante passa pela API HTTP real.

## Jornada exercitada
1. signup de profissional e empresa;
2. criação do tenant/memberships de teste;
3. signin dos dois usuários;
4. criação/persistência do perfil profissional;
5. publicação de vaga pela empresa;
6. listagem de vaga pelo profissional;
7. interesse;
8. recomendações da empresa;
9. confirmação do profissional;
10. leitura da agenda/assignment;
11. check-in;
12. início;
13. check-out;
14. conclusão;
15. criação/leitura de earnings payable;
16. avaliação 1–5 pela empresa;
17. leitura do Work Passport com trabalho e avaliação;
18. signout.

## CI
O mesmo banco migrado também é usado pelo readiness smoke e pelo contrato automatizado do Production Truth Gate.

## Limites
- isto é E2E HTTP de backend em CI, não teste em dispositivo físico/emulador;
- PSP real e KYC/KYB provider real continuam fora deste teste;
- tenant bootstrap público ainda não existe, por isso tenant/memberships permanecem como fixture mínima controlada.
