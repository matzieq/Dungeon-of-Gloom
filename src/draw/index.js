import {
  FOG_EXPLORED,
  FOG_UNEXPLORED,
  FOG_VISIBLE,
} from "../utils/constants.js";

let glyphAtlas = null;

fetch("./src/draw/glyphAtlas.json")
  .then((res) => res.json())
  .then((data) => {
    glyphAtlas = data;
  });

function drawActorsAscii(floor, actors) {
  const newMap = floor.map((row) => row.map((item) => item));
  actors.forEach((actor) => {
    const {
      pos: { x, y },
    } = actor;

    newMap[y][x] = actor;
  });

  return newMap;
}

function drawGameAscii({ floor, actors, player, surface: { canvas, ctx } }) {
  if (!glyphAtlas) return;
  const tileSize = window.innerWidth / 80;
  const mapWithActors = [...drawActorsAscii(floor, actors)];

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${tileSize}px Source Code Pro`;
  mapWithActors.forEach((row, y) =>
    row.forEach((tile, x) => {
      const { color, name } = tile.character;

      const glyph = glyphAtlas.find((el) => el.name === name).glyph;
      const {
        flags: { fog },
        character: { name: floorCharName },
      } = floor[y][x];

      const floorGlyph = glyphAtlas.find((el) => el.name === floorCharName)
        .glyph;

      if (fog === FOG_VISIBLE) {
        ctx.fillStyle = color;

        ctx.fillText(glyph, x * tileSize * 0.7, (y + 1) * tileSize);
      } else if (fog === FOG_EXPLORED) {
        ctx.fillStyle = "#595959";

        ctx.fillText(floorGlyph, x * tileSize * 0.7, (y + 1) * tileSize);
      }
    })
  );
}

export const drawGame = drawGameAscii;
