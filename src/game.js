import { generateBlankMap, generateBoard } from "./map";
import { drawGame } from "./draw";
import { update } from "./update";

const dungeonMap = generateBlankMap();
const player = {
  glyph: "@",
  x: 20,
  y: 20
};

const actors = [player];

generateBoard();

drawGame(dungeonMap, actors);

document.addEventListener("keydown", e => {
  update(e, player);

  drawGame(dungeonMap, actors);
});
