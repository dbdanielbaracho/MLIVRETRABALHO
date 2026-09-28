# MLIVRETRABALHO — DOCUMENTO DA VERDADE v1.14

**Status:** NORMATIVO — DELTA SOBRE v1.13  
**Data:** 2026-09-28  
**Fonte persistente oficial:** `dbdanielbaracho/MLIVRETRABALHO`

## Regra de continuidade
A v1.14 incorpora integralmente v1.13 e anteriores por referência. Em conflito explícito de estado/evidência, v1.14 prevalece.

# 1. RECONCILIAÇÃO DO ESTADO RUNTIME
Os bloqueios históricos de GitHub hosted runner/package resolution registrados em v1.13 foram superados.

- PR #245 foi executado em CI real, corrigido até green e mesclado.
- CI #841 / run `36370113823` concluiu com sucesso.
- merge #245: `979ed248bc79eeb7b9f6129b347778396d84a2cd`.
- Railway production deploy `ad77707b-0078-4281-86d0-693bf5df1972` concluiu com sucesso.
- Production Truth público no domínio canônico passou no run `36372097656`.
- Issue #214 foi encerrada.

Portanto requisitos de privacy/DSAR/retention/ownership que v1.13 marcava como “preparados/não provados” passam a ter prova automatizada interna de CI/runtime conforme escopo de #245. Isso não substitui pentest independente, provider sandbox ou device físico.

# 2. WEB-ARCH
O bloqueio de package resolution foi superado.

- PR #249 criou `apps/web` Next.js + React + TypeScript e lockfile reproduzível; CI #847 green; merge `d3e780d3b350acee55db528bffff6031a09cf453`.
- PR #250 ampliou superfícies enterprise; CI #851 green; merge `365667775d31de5933a181c2be0b657789a31a49`.
- PR #251 alinhou autorização role-aware de Finance/Safety e contratos reais de API; CI #855 green; merge `252135e2d2fd3c42d9660b02b13ff6541be4305d`.

Web permanece complementar ao mobile. Serviço Web público separado no Railway não foi provisionado porque seria novo recurso metered sem autorização explícita.

# 3. PILOTO ANDROID
APK interno foi gerado por hosted runner sem EAS pago:
- run `36371402054`;
- artifact id `10949985331`;
- tamanho `44,714,642` bytes;
- digest `sha256:ab726632c942ffe9e9ff62e7cf5bc80f06e6c88f292a4ac088c42be77572d81c`.

Isso prova geração/distribuição de artifact, não instalação/E2E em aparelho físico.

# 4. STATUS DOS GATES
- **#214 Production Truth/CI:** CLOSED — evidência real concluída.
- **#215 FIN-RISK:** OPEN/BLOCKING externo — provider/contrato/pricing/sandbox/compliance/accounting operacional.
- **#219 TRUST-ARCH:** runtime privacy interno provado; OPEN por provider-specific callback/propagation e pentest independente.
- **#220 Device/Pilot/Pentest:** APK gerado; OPEN por device físico/E2E e pentest independente.
- **#224 WEB-ARCH:** implementação/CI internos avançados; OPEN por breadth/UX residual e serviço Railway Web/public smoke, este último sujeito ao guardrail de custo.
- **#228 Provider Due Diligence:** OPEN/BLOCKING externo por outreach/respostas/sandbox.

# 5. GOVERNANÇA DE EXECUÇÃO
Regra operacional vigente: continuar autonomamente em cada rodada pelo máximo possível; não pedir confirmação para decisões técnicas reversíveis e sem custo; testar/corrigir/CI/merge/deploy conforme gates; registrar tudo no GitHub. Interromper apenas por ação humana obrigatória, custo, risco irreversível ou bloqueio externo.

TinyFish permanece excluído salvo instrução explícita futura. Nenhum recurso pago/metered novo é criado automaticamente.
