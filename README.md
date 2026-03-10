# 🎮 Minecraft Bot (Botviewer)

Bot de Minecraft com **visualização 3D em tempo real** no navegador. Conecta ao servidor via [Mineflayer](https://github.com/PrismarineJS/mineflayer) e exibe o mundo em um viewer web com [prismarine-viewer](https://github.com/PrismarineJS/prismarine-viewer).

![Node](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Minecraft](https://img.shields.io/badge/Minecraft-Java%20Edition-62b47a?logo=minecraft)

---

## ✨ Funcionalidades

- **Conexão** a servidores Minecraft Java (cracked ou premium)
- **Viewer 3D** — acompanhe o bot em tempo real em `http://localhost:3000/viewer`
- **Comandos no chat** — controle o bot por mensagens no servidor
- **Pathfinding** — navegação automática (base, mineração, seguir jogadores)
- **PvP** — ataque a jogadores sob comando
- **Comportamento “humano”** — movimento de câmera aleatório quando parado

---

## 📋 Pré-requisitos

- **Node.js** 18 ou superior  
- Servidor Minecraft Java acessível (local ou remoto)

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/SrRaposoOfc/Minecraft-Bot.git
cd Minecraft-Bot

# Instale as dependências
npm install
```

---

## ⚙️ Configuração

Edite o bloco `CONFIG` no início do arquivo `bot.js`:

```javascript
const CONFIG = {
  host: 'bawmc.net',    // IP ou domínio do servidor
  port: 25565,          // Porta (padrão 25565)
  username: 'botviewer', // Nick do bot
  // auth: 'microsoft'  // Descomente para login com conta Microsoft
};
```

---

## 🎯 Como usar

1. Inicie o bot:
   ```bash
   npm start
   ```

2. Aguarde a mensagem **"Botviewer conectado"** e **"Viewer ativo"**.

3. Abra no navegador:
   - **Página principal:** http://localhost:3000  
   - **Viewer 3D:** http://localhost:3000/viewer  

4. No **chat do servidor**, use os comandos abaixo (qualquer um que tiver permissão pode usar).

---

## 💬 Comandos (chat no servidor)

| Comando | Descrição |
|--------|-----------|
| `defina base` | Salva a posição atual como base |
| `vá para a base` | Faz o bot caminhar até a base salva |
| `procure diamante` | Procura minério de diamante próximo e vai até ele |
| `siga <nick>` | Faz o bot seguir o jogador com o nick informado |
| `mate <nick>` | Faz o bot atacar o jogador com o nick informado |

---

## 🔧 Dicas

- **Visão em primeira pessoa:** no `bot.js`, altere `firstPerson: false` para `firstPerson: true` na linha do `viewer()`.
- **Conta Microsoft:** descomente `auth: 'microsoft'` no `CONFIG` e use uma conta premium se o servidor exigir.

---

## 📁 Estrutura do projeto

```
Minecraft-Bot/
├── bot.js          # Código principal do bot e servidor web
├── package.json    # Dependências e scripts
└── README.md       # Este arquivo
```

---

## 📦 Dependências principais

- [mineflayer](https://github.com/PrismarineJS/mineflayer) — cliente Minecraft em Node.js  
- [mineflayer-pathfinder](https://github.com/PrismarineJS/mineflayer-pathfinder) — pathfinding  
- [mineflayer-pvp](https://github.com/PrismarineJS/mineflayer-pvp) — combate  
- [mineflayer-collectblock](https://github.com/PrismarineJS/mineflayer-collectblock) — coleta de blocos  
- [prismarine-viewer](https://github.com/PrismarineJS/prismarine-viewer) — viewer 3D no navegador  
- [express](https://expressjs.com/) — servidor HTTP do viewer  

---

## 📄 Licença

Projeto de uso livre. Use por sua conta e risco em servidores que permitam bots.

---

**Desenvolvido por [SrRaposoOfc](https://github.com/SrRaposoOfc)** 🏊‍♂️
