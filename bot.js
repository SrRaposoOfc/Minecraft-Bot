// bot.js — BOTVIEWER com visualização web em tempo real

import mineflayer from 'mineflayer';
import mineflayerPathfinder from 'mineflayer-pathfinder';
import mineflayerPvp from 'mineflayer-pvp';
import mineflayerCollectBlock from 'mineflayer-collectblock';
import mcDataLoader from 'minecraft-data';
import { mineflayer as viewer } from 'prismarine-viewer';
import express from 'express';
import http from 'http';

const { pathfinder, Movements, goals } = mineflayerPathfinder;
const { plugin: pvp } = mineflayerPvp;
const { plugin: collectBlock } = mineflayerCollectBlock;
// ---------------- CONFIG ----------------
const CONFIG = {
  host: 'bawmc.net', // ou 'bawmc.net'
  port: 25565,
  username: 'botviewer',
  // auth: 'microsoft' // se precisar logar com conta real
};
// ---------------------------------------

const bot = mineflayer.createBot({
  host: CONFIG.host,
  port: CONFIG.port,
  username: CONFIG.username,
  // auth: CONFIG.auth
});

bot.loadPlugin(pathfinder);
bot.loadPlugin(pvp);
bot.loadPlugin(collectBlock);

let mcData;
let memory = { base: null };

// servidor web p/ visualização
const app = express();
const server = http.createServer(app);
app.get('/', (_, res) => res.send('🌍 Abra <a href="/viewer">/viewer</a> para ver o bot.'));

// registra o viewer imediatamente para evitar 404 mesmo antes do spawn
viewer(bot, { httpServer: server, path: '/viewer', firstPerson: false, port: 3000 }); // muda pra true pra visão FPS

server.on('listening', () => console.log('✅ Viewer ativo em  '));

bot.once('spawn', () => {
  mcData = mcDataLoader(bot.version);
  const defaultMove = new Movements(bot, mcData);
  bot.pathfinder.setMovements(defaultMove);
  console.log('🤖 Botviewer conectado.');
  bot.chat('Botviewer online 🟢');

  setInterval(async () => {
    if (!bot.entity || Math.random() >= 0.1) return;
    const basePos = bot.entity.position;
    if (!basePos) return;
    const pos = basePos.offset(Math.random() * 4 - 2, 1, Math.random() * 4 - 2);
    try { await bot.lookAt(pos, true); } catch {}
  }, 2000);
});

// utilidades
function parseCmd(msg) {
  const m = msg.toLowerCase();
  if (m.includes('defina base')) return { a: 'setbase' };
  if (m.includes('vá para a base') || m.includes('va para a base')) return { a: 'gotobase' };
  if (m.includes('procure diamante')) return { a: 'finddia' };
  if (m.startsWith('siga ')) return { a: 'follow', t: msg.split(' ')[1] };
  if (m.startsWith('mate ')) return { a: 'atk', t: msg.split(' ')[1] };
  return null;
}

bot.on('chat', async (user, msg) => {
  if (user === bot.username) return;
  const cmd = parseCmd(msg);
  if (!cmd) return;

  switch (cmd.a) {
    case 'setbase':
      memory.base = bot.entity.position.floored();
      bot.chat('Base salva ✅');
      break;
    case 'gotobase':
      if (!memory.base) return bot.chat('Sem base ainda 😢');
      bot.chat('Indo pra base 🏠');
      bot.pathfinder.setGoal(new goals.GoalBlock(memory.base.x, memory.base.y, memory.base.z));
      break;
    case 'finddia':
      bot.chat('Procurando diamante 💎...');
      const dia = bot.findBlock({
        matching: b => b.name === 'diamond_ore',
        maxDistance: 64,
      });
      if (!dia) return bot.chat('Nada de diamante perto 😢');
      bot.chat(`Achei em ${dia.position}! Indo lá...`);
      bot.pathfinder.setGoal(new goals.GoalBlock(dia.position.x, dia.position.y, dia.position.z));
      break;
    case 'follow':
      const alvo = cmd.t;
      if (!alvo || !bot.players[alvo]?.entity) return bot.chat('Jogador não encontrado 😕');
      bot.chat(`Seguindo ${alvo} 👀`);
      const ent = bot.players[alvo].entity;
      bot.pathfinder.setGoal(new goals.GoalFollow(ent, 1), true);
      break;
    case 'atk':
      const target = cmd.t;
      if (!target || !bot.players[target]?.entity) return bot.chat('Alvo inválido 😕');
      bot.chat(`⚠️ Tentando atacar ${target}`);
      try { bot.pvp.attack(bot.players[target].entity); } catch (e) {}
      break;
  }
});

// human look-around idle (após spawn)

// erros
bot.on('error', e => {
  console.log('Erro:', e);
});
bot.on('kicked', r => console.log('KICKED:', r));

