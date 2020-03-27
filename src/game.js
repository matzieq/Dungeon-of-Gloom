import { generateBlankMap } from './map';
import { drawGame } from './draw';
import { update, unfog } from './update';
import { Actor } from './objects/characters';

import { MAP_WIDTH, MAP_HEIGHT } from './utils/constants';

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const floor = generateBlankMap();

const player = new Actor({
  glyph: '@',
  color: '#fff',
  type: 'player',
  x: 10,
  y: 20,
  range: 10,
  hp: 5,
  attack: 2
});
const monster = new Actor({
  glyph: 'g',
  color: '#f80',
  type: 'monster',
  x: 60,
  y: 30,
  range: 20,
  hp: 1,
  attack: 1
});

const monster2 = new Actor({
  glyph: 'k',
  color: '#08f',
  type: 'monster',
  x: 40,
  y: 15,
  range: 15,
  hp: 3,
  attack: 2
});

const actors = [monster, monster2, player];

const state = { floor, actors, player, surface: { canvas, ctx } };

const resizeGame = () => {
  const tileSize = window.innerWidth / 80;
  ctx.font = `${tileSize}px Source Code Pro`;

  canvas.width = MAP_WIDTH * tileSize * 0.7;
  canvas.height = MAP_HEIGHT * tileSize;
  canvas.style.width = `${MAP_WIDTH * tileSize * 0.7}px`;
  drawGame(state);
};

resizeGame();

unfog(state);
drawGame(state);
document.addEventListener('keydown', e => {
  update(e, state);

  drawGame(state);
});

window.addEventListener('resize', resizeGame);
