# Web — pré-validação antes de enviar vaga

Após as correções de dinheiro e calendário, `createJob` ainda podia enviar `{payCents:NaN}` (serializado como null), `startsAt:''` ou horário final anterior/igual ao inicial. Isso podia produzir solicitações inválidas desnecessárias. Novo `validateCompanyJobPreflight` bloqueia envio sem valor seguro em centavos e intervalo válido crescente. `createJob` mostra erro e mantém dados do formulário, sem chamada de publicação.

Regressões em `web-contract.test.ts` para valores e horários inválidos e válidos. Documento da Verdade original preservado. CI do HEAD exato obrigatório antes de integrar. Somente Web/testes/docs; API e pagamentos reais não alterados.
