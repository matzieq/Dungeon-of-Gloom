import { generateBlankMap } from "./map/index.js";
import { drawGame } from "./draw/index.js";
import { update, unfog } from "./update/index.js";
import { Actor } from "./objects/characters/index.js";

import { MAP_WIDTH, MAP_HEIGHT } from "./utils/constants.js";

import gameData from "./data/gameData.js";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const floor = generateBlankMap();

const player = Actor({
  color: "#fff",
  type: "player",
  name: "player",
  x: 5,
  y: 5,
  range: 20,
  hp: 5,
  attack: 2,
});
const monster = Actor({
  color: "#f80",
  type: "monster",
  name: "goblin",
  x: 60,
  y: 30,
  range: 20,
  hp: 1,
  attack: 1,
});

const monster2 = Actor({
  color: "#08f",
  type: "monster",
  name: "kobold",
  x: 40,
  y: 15,
  range: 15,
  hp: 3,
  attack: 2,
});

const actors = [monster, monster2, player];

const state = { floor, actors, player, surface: { canvas, ctx }, debugMap: [] };

const { glyphAtlas } = gameData;

const resizeGame = () => {
  const tileSize = window.innerWidth / 80;
  ctx.font = `${tileSize}px Source Code Pro`;

  canvas.width = MAP_WIDTH * tileSize * 0.7;
  canvas.height = MAP_HEIGHT * tileSize;
  canvas.style.width = `${MAP_WIDTH * tileSize * 0.7}px`;
  drawGame(state, glyphAtlas);
};

unfog(state);

resizeGame();
setInterval(() => {
  drawGame(state, glyphAtlas);
}, 100);

document.addEventListener("keydown", (e) => {
  update(e, state);
  drawGame(state, glyphAtlas);
});

window.addEventListener("resize", resizeGame);
