import { FOG_EXPLORED, FOG_VISIBLE, MAP_HEIGHT } from "../utils/constants.js";

import { tileSize } from "../utils/lib.js";

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
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setupFont(ctx) {
  ctx.font = `${tileSize()}px Source Code Pro`;
}

function setupScreen(canvas, ctx) {
  clearScreen(canvas, ctx);
  setupFont(ctx);
}

function drawGameAscii(
  { floor, actors, player, surface: { canvas, ctx }, debugMap },
  glyphAtlas
) {
  setupScreen(canvas, ctx);
  mapWithActors(floor, actors).forEach((row, y) =>
    row.forEach((tile, x) => {
      const { glyph, color } = glyphAtlas.find((el) => el.name === tile.name);
      const {
        flags: { fog },
        name,
      } = floor[y][x];

      const { glyph: floorGlyph } = glyphAtlas.find((el) => el.name === name);

      if (fog === FOG_VISIBLE) {
        ctx.fillStyle = color;

        ctx.fillText(glyph, x * tileSize() * 0.7, (y + 1) * tileSize());
      } else if (fog === FOG_EXPLORED) {
        ctx.fillStyle = "#393939";

        ctx.fillText(floorGlyph, x * tileSize() * 0.7, (y + 1) * tileSize());
      }
      if (debugMap[y] && debugMap[y][x]) {
        ctx.fillText(
          debugMap[y][x],
          x * tileSize() * 0.7,
          (y + 1) * tileSize()
        );
      }
    })
  );
  ctx.fillStyle = "#2378cc";
  ctx.fillText(
    `HP: ${player.stats.hp} / ${player.stats.maxHp}`,
    0,
    (MAP_HEIGHT - 1) * tileSize()
  );
  ctx.fillText(
    `Backpack: ${player.inventory.backpack
      .map((item) => (item ? item.name : ""))
      .toString()
      .split(",")
      .join(", ")}`,
    200,
    (MAP_HEIGHT - 1) * tileSize()
  );
  const { weapon, armor, ring } = player.inventory.equipment;
  ctx.fillText(
    `Weapon: ${weapon ? weapon.name : "none"}, Armor: ${
      armor ? armor.name : "none"
    }, Ring: ${ring ? ring.name : "none"}`,
    500,
    (MAP_HEIGHT - 1) * tileSize()
  );
}

export const drawGame = drawGameAscii;
