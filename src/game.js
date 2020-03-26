import { generateBlankMap } from './map';
import { drawGame } from './draw';
import { update } from './update';
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
  range: null
});
const monster = new Actor({
  glyph: 'g',
  color: '#f80',
  type: 'monster',
  x: 60,
  y: 30,
  range: 20
});

const monster2 = new Actor({
  glyph: 'k',
  color: '#08f',
  type: 'monster',
  x: 40,
  y: 15,
  range: 15
});

const actors = [player, monster, monster2];

const state = { floor, actors, player, surface: { canvas, ctx } };

const resizeGame = () => {
  const tileSize = window.innerWidth / 80;

  canvas.width = MAP_WIDTH * tileSize * 0.7;
  canvas.height = MAP_HEIGHT * tileSize;
  canvas.style.width = `${MAP_WIDTH * tileSize * 0.7}px`;
  drawGame(state);
};

resizeGame();

drawGame(state);

document.addEventListener('keydown', e => {
  update(e, state);

  drawGame(state);
});

window.addEventListener('resize', resizeGame);
