import { directions } from "../../utils/constants.js";
import {
  getRandomElement,
  distanceBetween,
  lineOfSight,
} from "../../utils/lib.js";

export const Character = (color = "#fff", name = "") => ({
  color,
  name,
});

export const Position = (x = 0, y = 0) => ({
  x,
  y,
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  },
});

export const Actor = ({
  name,
  type,
  x,
  y,
  range,
  hp,
  attack = 1,
  defense = 0,
  level = 1,
  xp = 0,
}) => ({
  pos: Position(x, y),
  name,
  type,

  alive: true,
  stats: Statblock({ range, hp, attack, defense, level, xp }),
  ai: type === "monster" ? wait : null,
});

export const Statblock = ({ range, hp, attack, defense, level, xp }) => ({
  range,
  hp,
  maxHp: hp,
  attack,
  defense,
  level,
  xp,
  currentXp: 0,
});

export const Tile = ({ type, name, flags }) => ({
  type,
  name,
  flags: { ...flags },
});

function getMove(state) {
  const { distMap } = state;
  const possibleMoves = directions.filter((direction) => {
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
