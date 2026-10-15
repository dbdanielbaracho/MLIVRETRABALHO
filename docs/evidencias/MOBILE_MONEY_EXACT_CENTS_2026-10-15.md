# Centavos exatos na exibição monetária mobile

## Formatação monetária mobile — preservar centavos inteiros — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Candidato baseado no HEAD541 `37220bcebe56266e39d9f05cabaf8f06c71aeda7`/tree`cdaec278156ac72f34b2857db6c8b60a55b2a67d`; #541 ainda depende de CI/merge/pós-gates, sem aprovação antecipada. Nenhum merge anterior repetido.

Falha reproduzida em `apps/mobile/lib/company-readonly.ts`, fluxo real loadReconciliation→moneyOrMissing:9007199254740990centavos (Number.isSafeInteger=true) eram exibidos como `R$ 90071992547409,91` em vez de `R$ 90071992547409,90`. A divisão por100 arredondava antes do toFixed. Não é alegação de débito/pagamento real ou bug render observado no aparelho.

Três regressões novas, oito testes antigos intactos: RED8PASS/3FAIL→GREEN11/11 local. Cobrem limites positivos/negativos, zero/centavos comuns, valor acima de int32 e caminho leitor→rótulo sem escrita. Formatter agora separa os dígitos decimais do inteiro seguro, sem divisão, BigInt ou dependência nova; ausência e fallback anterior para valores fora desse contrato preservados. Suíte mobile completa local753/753PASS, zero falhas. Testes de sinais não autorizam evento financeiro negativo: política individual/DB permanece sem alteração.

Helpers de GET/parsers/dados/status/tenant/contexto, JSX e rotas preservados. API541 herdada não é reimplementada nesta fatia. Evidência `docs/evidencias/MOBILE_MONEY_EXACT_CENTS_2026-10-15.md`. CI e APK próprios do novo HEAD são OBRIGATÓRIOS e PENDENTES, depois revisão/retarget main após541 e pós-CI/APK no merge real. Emulador não é físico; ownPRcheckout pode ser sintético e deve ter pais/árvore comprovados.

Área6 recebe correção de apresentação, sem aceite integral. Área10 conserva aceite técnico no SHA válido anterior e exige novos gates por mudança mobile; demais12áreas seguem pendentes. Documento ORIGINALv1.104/memória/checkpoint/ledger/registry/matriz preservados por apêndice; sem custos/produção/serviços/credenciais/PSP/dinheiroreal/contratos. Externos215/219/220/224/228 permanecem OPEN. Próxima tarefa independente só após confronto de código/requisitos e nova reprodução; não repetir541 ou esta correção sem nova falha.
