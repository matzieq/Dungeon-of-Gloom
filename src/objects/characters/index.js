import { directions } from "../../utils/constants";
import {
  getRandomElement,
  distanceBetween,
  lineOfSight,
} from "../../utils/lib";

export const Character = (glyph = "x", color = "#fff") => ({
  glyph,
  color,
});

export const Position = (x = 0, y = 0) => ({
  x,
  y,
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  },
});

export const Actor = ({ glyph, color, type, x, y, range, hp, attack }) => ({
  pos: Position(x, y),
  character: Character(glyph, color),
  type,
  range,
  hp,
  maxHp: hp,
  attack,
  alive: true,
  ai: type === "monster" ? wait : null,
});

export const Tile = ({ type, glyph, color, flags }) => ({
  type,
  character: Character(glyph, color),
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
    distanceBetween(player.pos, this.pos) < this.range &&
    lineOfSight(this.pos, player.pos, state)
  ) {
    this.ai = getMove;
  }
  return { x: 0, y: 0 };
}
