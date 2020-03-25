import { generateBlankMap, generateBoard } from "./map";
import { drawGame } from "./draw";
import { update } from "./update";

const floor = generateBlankMap();
const player = {
  glyph: "@",
  x: 20,
  y: 20
};

const actors = [player];

const state = { floor, actors, player };

generateBoard();

drawGame(state);

document.addEventListener("keydown", e => {
  update(e, state);

  drawGame(state);
});
