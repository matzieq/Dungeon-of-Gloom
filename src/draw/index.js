import { tileSize } from "../utils/lib.js";
import { drawCursorAscii, drawStatsAscii, drawSubmenuAscii } from "./ui.js";
import { drawMapAscii } from "./playArea.js";

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
  if (state.menu.subMenu.open) {
    drawSubmenuAscii(state);
  } else {
    drawCursorAscii(state);
  }
}

export const drawGame = { gameState: drawGameAscii, menuState: drawMenuAscii };
