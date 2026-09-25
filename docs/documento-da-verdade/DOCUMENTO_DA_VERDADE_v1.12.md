# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.12

**Status:** NORMATIVO — DELTA SOBRE v1.11  
**Data:** 2026-09-25  
**Fonte persistente oficial:** repositório GitHub `dbdanielbaracho/MLIVRETRABALHO`

## Regra de continuidade
A v1.12 incorpora integralmente por referência a v1.11 e versões anteriores. Em conflito explícito, v1.12 prevalece.

---

# 1. LEGAL-ARCH NÃO DEPENDE MAIS DE PARECER EXTERNO OBRIGATÓRIO

Decisão de governança: o projeto não condicionará sua continuidade ou conclusão à contratação de profissional jurídico brasileiro.

Em substituição, o LEGAL-ARCH passa a ser fechado por revisão jurídica interna documentada, baseada em fontes primárias oficiais, jurisprudência atual, legislação, regulação aplicável e melhores práticas de produto.

Referência principal:
`docs/evidencias/LEGAL_BEST_PRACTICES_REVIEW_v1.12.md`

Limitação permanente: essa revisão não é parecer jurídico profissional e não elimina risco residual.

---

# 2. BASELINE DE RISCO TRABALHISTA

O desenho do piloto deve preservar, salvo modalidade jurídica específica diversa:
- liberdade real de aceitar/recusar oportunidades;
- ausência de exclusividade obrigatória;
- disponibilidade definida pelo profissional;
- possibilidade de atuação multiempresa;
- ausência de metas gerais compulsórias;
- ausência de tracking contínuo/background como baseline;
- ranking/matching sem punição automática por recusa;
- score/reliability com fatos auditáveis e revisão humana para efeitos materiais;
- atenção contínua aos fatos concretos relevantes aos arts. 2º e 3º da CLT.

Tema 725/ADPF 324 não deve ser usado como blindagem automática para qualquer relação plataforma-profissional. Tema 1291 deve permanecer marcado como matéria em evolução até tese final aplicável.

---

# 3. LGPD / PRIVACIDADE

A revisão interna adota como baseline:
- finalidade específica;
- minimização de dados;
- least privilege;
- retenção proporcional;
- preferência por provider reference/status em vez de documentos/biometria brutos;
- segurança técnica/administrativa;
- due diligence de operadores/suboperadores;
- avaliação de RIPD em tratamentos de maior risco;
- geolocalização limitada ao necessário;
- revisão humana para efeitos materiais automatizados quando aplicável.

---

# 4. PAGAMENTOS E TRUST

Mantêm-se todas as decisões da v1.11:
- PSP real não é autoridade sobre IDs internos;
- KYC/KYB provider não é autoridade sobre enforcement interno;
- dinheiro real só após provider elegível/contratado e sandbox comprovado;
- guarantee/advance/credit/default coverage fora do piloto;
- enforcement material separado de provider facts e sujeito a revisão/auditoria.

A ausência de parecer jurídico externo não remove os gates técnicos/comerciais de provider, sandbox, pentest, CI, device e web.

---

# 5. LEGAL-ARCH — NOVO CRITÉRIO DE FECHAMENTO

O Issue #221 pode ser fechado internamente quando:
1. `LEGAL_BEST_PRACTICES_REVIEW_v1.12.md` estiver vigente;
2. guardrails jurídicos estiverem rastreados no Requirements Ledger;
3. não houver feature ativa contradizendo esses guardrails;
4. matérias controversas estiverem registradas como risco residual, não como certeza jurídica.

Parecer externo deixa de ser requisito obrigatório de Production/Pilot-DONE.

---

# 6. GATILHOS DE REVISÃO JURÍDICA INTERNA

Reabrir LEGAL-ARCH antes de ativar mudança material em:
- exclusividade, metas obrigatórias ou controle substancial de jornada/preço;
- background location;
- punição/suspensão/deactivation automática;
- garantia, crédito ou adiantamento;
- fluxo de pagamento/split;
- staffing, trabalho temporário ou contratação direta;
- nova jurisdição;
- nova classe de dado sensível;
- legislação/regulação/jurisprudência materialmente nova.

---

# 7. STATUS DOS GATES

- #214 Production Truth/CI: continua PARADO EXTERNAMENTE.
- #215 FIN-RISK: continua dependente de PSP/contrato/pricing/sandbox/compliance; parecer jurídico externo não é mais gate obrigatório.
- #219 TRUST-ARCH: continua dependente de provider/sandbox/LGPD operacional/pentest; parecer jurídico externo não é mais gate obrigatório.
- #220 Device/Pilot/Pentest: sem mudança.
- #221 LEGAL-ARCH: muda de gate externo para revisão interna executável.
- #224 WEB-ARCH: continua PARADO POR AMBIENTE.
- #228 Provider Due Diligence: continua PARADO EXTERNAMENTE.

---

# 8. CONTINUIDADE DOCUMENTAL

Requirements traceability passa a ser complementada por `docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.12.md`.

TinyFish permanece excluído salvo instrução explícita futura.
