import { generateBlankMap, generateBoard } from './map';
import { drawGame } from './draw';
import { update } from './update';
import { Actor } from './objects/characters';

import { MAP_WIDTH, MAP_HEIGHT } from './utils/constants';

const tileSize = window.innerWidth / 80;

const canvas = document.getElementById('canvas');
canvas.width = MAP_WIDTH * tileSize * 0.7;
canvas.height = MAP_HEIGHT * tileSize;
canvas.style.width = `${MAP_WIDTH * tileSize * 0.7}px`;
const ctx = canvas.getContext('2d');

const floor = generateBlankMap();

const player = new Actor({
  glyph: '@',
  color: '#fff',
  type: 'player',
  x: 10,
  y: 10
});
const monster = new Actor({
  glyph: 'g',
  color: '#f80',
  type: 'monster',
  x: 60,
  y: 30
});

const actors = [player, monster];

const state = { floor, actors, player, surface: { canvas, ctx } };

// generateBoard();

drawGame(state);

document.addEventListener('keydown', e => {
  update(e, state);

  drawGame(state);
});
