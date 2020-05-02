import Position from "./position.js";
import Statblock from "./statblock.js";
import { directions, directionsWithDiagonals } from "../utils/constants.js";
import { Inventory } from "../objects/items.js";
import {
  getRandomElement,
  distanceBetween,
  lineOfSight,
} from "../utils/lib.js";

function getMove(state) {
  const { distMap } = state;
  const possibleMoves = directionsWithDiagonals.filter((direction) => {
    const { x: dx, y: dy } = direction;
    const { x, y } = this.pos;
    const newPosDistance = distMap[y + dy][x + dx] || 9999;
    const oldPosDistance = distMap[y][x];
    return newPosDistance < oldPosDistance;
  });

  return getRandomElement(possibleMoves);
}

function wait(state) {
  const { player } = state;
  if (
    distanceBetween(player.pos, this.pos) < this.stats.range &&
    lineOfSight(this.pos, player.pos, state)
  ) {
    this.ai = getMove;
  }
  return { x: 0, y: 0 };
}

const Actor = ({
  name,
  type,
  x,
  y,
  range,
  hp,
  str = 1,
  def = 0,
  level = 1,
  xp = 0,
}) => ({
  pos: Position(x, y),
  name,
  type,
  alive: true,
  stats: Statblock({ range, hp, str, def, level, xp }),
  ai: type === "monster" ? wait : null,
  inventory: Inventory(),
});

export default Actor;
