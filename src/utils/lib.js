export const range = length => [...Array(length).keys()];
export const getRandomElement = arr =>
  arr[Math.floor(Math.random() * arr.length)];

export const distanceBetween = (pos1, pos2) =>
  Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));

export function lineOfSight(pos1, pos2, state) {
  let first = true;
  let sx, sy, dx, dy;
  let { x: x1, y: y1 } = pos1;
  let { x: x2, y: y2 } = pos2;

  if (distanceBetween(pos1, pos2) === 1) return true;

  dx = Math.abs(x2 - x1);

  sx = x1 < x2 ? 1 : -1;

  dy = Math.abs(y2 - y1);

  sy = y1 < y2 ? 1 : -1;

  let err = dx - dy;
  let e2;
  console.log('***');
  console.log(x2, y2);
  while (!(x1 === x2 && y1 === y2)) {
    if (!first && !state.floor[y1][x1].flags.walkable) return false;
    console.log(x1, y1);
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
