import { MAP_HEIGHT, MAP_WIDTH } from '../utils/constants';
import { distanceMap } from '../map';

export function drawGame({ floor, actors, player, surface: { canvas, ctx } }) {
  const tileSize = window.innerWidth / 80;
  const mapWithActors = [...drawActors(floor, actors)];

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${tileSize}px Source Code Pro`;
  mapWithActors.forEach((row, y) =>
    row.forEach((tile, x) => {
      const { glyph, color } = tile.character;
      ctx.fillStyle = color;
      ctx.fillText(glyph, x * tileSize * 0.7, (y + 1) * tileSize);

      // ctx.fillText(
      //   distMap[y][x] || "#",
      //   x * tileSize * 0.7,
      //   (y + 1) * tileSize
      // );
    })
  );
}

export function drawActors(floor, actors) {
  const newMap = floor.map(row => row.map(item => item));
  actors.forEach(actor => {
    const {
      pos: { x, y }
    } = actor;

    newMap[y][x] = actor;
  });

  return newMap;
}
