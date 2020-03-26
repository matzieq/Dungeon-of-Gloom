import { directions } from '../../utils/constants';
import { getRandomElement, distanceBetween } from '../../utils/lib';

export function Character({ glyph, color }) {
  this.glyph = glyph;
  this.color = color;
}

export function Position({ x, y }) {
  this.x = x;
  this.y = y;
}

export function Actor({ glyph, color, type, x, y }) {
  this.pos = new Position({ x, y });
  this.character = new Character({ glyph, color });
  this.type = type;
  if (type === 'monster') {
    this.ai = wait;
  }
}

export function Tile({ type, glyph, color, flags }) {
  this.type = type;
  this.character = new Character({ glyph, color });
  this.flags = flags;
}

function getMove({ distMap }) {
  const possibleMoves = directions.filter(direction => {
    const { x: dx, y: dy } = direction;
    const { x, y } = this.pos;
    const newPosDistance = distMap[y + dy][x + dx] || 9999;
    const oldPosDistance = distMap[y][x];
    return newPosDistance < oldPosDistance;
  });

  return getRandomElement(possibleMoves);
}

function wait({ player }) {
  if (distanceBetween(player.pos, this.pos) < 10) {
    this.ai = getMove;
  }
  return { x: 0, y: 0 };
}
