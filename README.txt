Botviewer
=========

Pré-requisitos
--------------
- Node.js 18+ instalado.
- Servidor Minecraft disponível (local ou remoto).

Instalação
----------
1. `npm install`
2. Ajuste o host/porta no arquivo `bot.js` se necessário.

Uso
---
1. `npm start`
2. Aguarde o bot conectar e o viewer iniciar em `http://localhost:3000`.
3. Abra `http://localhost:3000/viewer` no navegador para ver o mapa 3D.
4. No chat do servidor, envie comandos como:
   - `defina base`
   - `vá para a base`
   - `procure diamante`
   - `siga <nick>`
   - `mate <nick>`

Dicas
-----
- Altere `firstPerson` para `true` em `bot.js` para visão em primeira pessoa.
- Descomente `auth` em `bot.js` para logar com conta Microsoft.

