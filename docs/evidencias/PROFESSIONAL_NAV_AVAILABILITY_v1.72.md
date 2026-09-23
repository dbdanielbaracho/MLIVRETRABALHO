# Professional Navigation & Availability v1.72

## Problemas fechados
1. A jornada profissional tinha telas operacionais, mas não havia navegação clara entre elas após o login.
2. A disponibilidade exigia timestamps ISO técnicos como `2026-09-22T09:00:00-03:00`.

## Implementação
- componente reutilizável `ProfessionalNav` com acesso direto a Trabalhos, Agenda, Disponibilidade, Ganhos, Notificações e Perfil;
- navegação adicionada às principais telas profissionais;
- disponibilidade agora usa Data `DD/MM/AAAA`, Início `HH:MM` e Fim `HH:MM`;
- a conversão para ISO acontece internamente no app;
- turno que cruza meia-noite é tratado automaticamente quando o horário final é menor ou igual ao inicial;
- datas/horários inválidos são rejeitados antes do request;
- backend e modelo de dados não foram alterados.

## Gate
Merge somente após `--frozen-lockfile`, typecheck, build, Expo Android export, testes, migration runner, jornadas HTTP e Production Truth contract verdes.

## Limite
A interação visual em aparelho físico continua pertencendo ao device E2E.
