import { generateBlankMap } from "./map/index.js";
import { drawGame } from "./draw/index.js";
import { update, unfog } from "./update/index.js";
import Actor from "./objects/actor.js";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./utils/constants.js";

import gameData from "./data/gameData.js";
import { Item } from "./objects/items.js";
import { tileSize } from "./utils/lib.js";

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
  str: 2,
});
const monster = Actor({
  color: "#f80",
  type: "monster",
  name: "goblin",
  x: 60,
  y: 30,
  range: 20,
  hp: 1,
  str: 1,
});

const monster2 = Actor({
  color: "#08f",
  type: "monster",
  name: "kobold",
  x: 40,
  y: 15,
  range: 15,
  hp: 3,
  str: 2,
});

const dagger = Item(gameData.itemData.find((item) => item.name === "sword"));
const armor = Item(
  gameData.itemData.find((item) => item.name === "leather armor")
);
console.log(dagger);

player.inventory.take(dagger);
player.inventory.take(armor);
player.inventory.equip(0, player);
player.inventory.equip(0, player);
player.inventory.take(dagger);
// player.inventory.equip(0);

const actors = [monster, monster2, player];

const state = {
  floor,
  actors,
  player,
  surface: { canvas, ctx },
  debugMap: [],
  playState: "gameState",
  menu: {
    cursorPos: 0,
  },
};

const { glyphAtlas } = gameData;

const resizeGame = () => {
  ctx.font = `${tileSize()}px Source Code Pro`;

  canvas.width = SCREEN_WIDTH * tileSize();
  canvas.height = SCREEN_HEIGHT * tileSize();
  canvas.style.width = `${SCREEN_WIDTH * tileSize()}px`;
  drawGame[state.playState](state, glyphAtlas);
};

unfog(state);

resizeGame();
setInterval(() => {
  drawGame[state.playState](state, glyphAtlas);
}, 100);

document.addEventListener("keydown", (e) => {
  update[state.playState](e, state);
  drawGame[state.playState](state, glyphAtlas);
});

window.addEventListener("resize", resizeGame);
