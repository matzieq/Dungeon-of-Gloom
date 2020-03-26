import { generateBlankMap, generateBoard } from "./map";
import { drawGame } from "./draw";
import { update } from "./update";
import { Tile, Actor } from "./objects/characters";
import { distanceMap } from "./map";

const floor = generateBlankMap();

const player = new Actor({ glyph: "@", color: "#fff" });

const actors = [player];

const state = { floor, actors, player };

// generateBoard();

drawGame(state);

console.log(distanceMap({ floor, actor: { pos: { x: 78, y: 38 } } }));

document.addEventListener("keydown", e => {
  update(e, state);

  drawGame(state);
});
