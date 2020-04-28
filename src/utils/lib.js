import { MAP_WIDTH, MAP_HEIGHT } from "./constants.js";

export const range = (length) => [...Array(length).keys()];
export const getRandomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

export const distanceBetween = (pos1, pos2) =>
  Math.floor(
    Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))
  );

export function lineOfSight(pos1, pos2, state) {
  let first = true;

  let { x: x1, y: y1 } = pos1;
  let { x: x2, y: y2 } = pos2;

  if (distanceBetween(pos1, pos2) === 1) return true;

  const dx = Math.abs(x2 - x1);

  const sx = x1 < x2 ? 1 : -1;

  const dy = Math.abs(y2 - y1);

  const sy = y1 < y2 ? 1 : -1;

  let err = dx - dy;
  let e2;

  let prev = true;
  while (!(x1 === x2 && y1 === y2)) {
    if (!first && !state.floor[y1][x1].flags.walkable) return false;

    // if (!prev) return false;

    // if (!state.floor[y1][x1].flags.walkable) prev = false;

    first = false;
    e2 = 2 * err;

    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }

    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
  return true;
}

export const tileSize = () =>
  Math.min(window.innerWidth / MAP_WIDTH, window.innerHeight / MAP_HEIGHT);

export const copyCollection = (collection) =>
  collection.map((item) => ({ ...item }));
