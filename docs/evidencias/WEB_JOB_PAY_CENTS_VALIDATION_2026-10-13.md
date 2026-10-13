# Web — valor de vaga em centavos

`reaisToCents` convertia valor ausente (`null`) em zero e aceitava mais de duas casas decimais por arredondamento silencioso. Também permitia inteiros em centavos fora de `Number.MAX_SAFE_INTEGER`. A tela de publicação usa esse conversor para `payCents`; um valor impreciso não deve ser enviado.

Correção: aceitar apenas string decimal não negativa com no máximo duas casas, converter centavos de modo exato e exigir inteiro seguro. Regra de entrada monetária na Web, sem modificação de operações financeiras/PSP nem da autorização de API. Testes cobrem ausência, precisão, negativos, notação científica, overflow, zero e valores válidos. Gate: CI exato do PR e validação de integração. Documento da Verdade original inalterado.
