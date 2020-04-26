import { FOG_EXPLORED, FOG_VISIBLE } from "../utils/constants.js";

import { tileSize } from "../utils/lib.js";

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

const mapWithActors = (floor, actors) => [...drawActorsAscii(floor, actors)];

function clearScreen(canvas, ctx) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setupFont(ctx) {
  ctx.font = `${tileSize()}px Source Code Pro`;
}

function setupScreen(canvas, ctx) {
  clearScreen(canvas, ctx);
  setupFont(ctx);
}

function drawGameAscii({ floor, actors, player, surface: { canvas, ctx } }) {
  setupScreen(canvas, ctx);
  mapWithActors(floor, actors).forEach((row, y) =>
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

        ctx.fillText(glyph, x * tileSize() * 0.7, (y + 1) * tileSize());
      } else if (fog === FOG_EXPLORED) {
        ctx.fillStyle = "#595959";

        ctx.fillText(floorGlyph, x * tileSize() * 0.7, (y + 1) * tileSize());
      }
    })
  );
}

export const drawGame = (state) => {
  if (!glyphAtlas) {
    return;
  }
  drawGameAscii(state);
};
