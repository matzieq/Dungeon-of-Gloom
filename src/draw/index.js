import {
  FOG_EXPLORED,
  FOG_VISIBLE,
  MAP_HEIGHT,
  MAP_WIDTH,
  BACKPACK_LIMIT,
} from "../utils/constants.js";

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

function drawStatsAscii(player, ctx) {
  ctx.fillStyle = "#2378cc";
  ctx.fillText(
    `HP: ${player.stats.hp} / ${player.stats.maxHp}`,
    (MAP_WIDTH - 10) * tileSize(),
    (11 + BACKPACK_LIMIT) * tileSize()
  );

  ctx.fillText(
    `STR: ${player.stats.str} / ${player.stats.modified.str}`,
    (MAP_WIDTH - 10) * tileSize(),
    (12 + BACKPACK_LIMIT) * tileSize()
  );
  ctx.fillText(
    `DEF: ${player.stats.def} / ${player.stats.modified.def}`,
    (MAP_WIDTH - 10) * tileSize(),
    (13 + BACKPACK_LIMIT) * tileSize()
  );
  const { equipment } = player.inventory;
  Object.keys(equipment).forEach((eqType, index) => {
    drawEquipmentPieceAscii(
      eqType.toUpperCase(),
      equipment[eqType] ? equipment[eqType].name : "none",
      index,
      ctx
    );
  });
  ctx.fillStyle = "#ee7744";

  ctx.fillText(`Backpack:`, (MAP_WIDTH - 10) * tileSize(), 9 * tileSize());
  const inventory = player.inventory.backpack
    .map((item) => (item ? item.name : ""))
    .filter((item) => item !== "");

  inventory.forEach((item, index) => {
    drawInventoryPieceAscii(item, index, ctx);
  });
}

function drawEquipmentPieceAscii(type, name, posY, ctx) {
  ctx.fillStyle = "#2378cc";

  ctx.fillText(
    `${type}:`,
    (MAP_WIDTH - 10) * tileSize(),
    (5 + posY) * tileSize()
  );

  ctx.fillStyle = "#feef23";
  ctx.fillText(
    `${name}`,
    (MAP_WIDTH - 5) * tileSize(),
    (5 + posY) * tileSize()
  );
}

function drawInventoryPieceAscii(name, posY, ctx) {
  ctx.fillStyle = "#feef23";

  ctx.fillText(
    `${name}`,
    (MAP_WIDTH - 10) * tileSize(),
    (10 + posY) * tileSize()
  );
}

function drawCursorAscii({ player, surface: { ctx } }) {
  ctx.fillText(`MENUSTATE`, 0, (MAP_HEIGHT + 4) * tileSize());
}

function drawMapAscii({ floor, actors, debugMap, ctx, glyphAtlas }) {
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
}

function drawMapAndStatsAscii(
  { floor, actors, player, surface: { canvas, ctx }, debugMap },
  glyphAtlas
) {
  setupScreen(canvas, ctx);
  drawMapAscii({ floor, actors, ctx, debugMap, glyphAtlas });
  drawStatsAscii(player, ctx);
}

const drawGameAscii = drawMapAndStatsAscii;

function drawMenuAscii(state, glyphAtlas) {
  drawMapAndStatsAscii(state, glyphAtlas);
  drawCursorAscii(state);
}

export const drawGame = { gameState: drawGameAscii, menuState: drawMenuAscii };
