import { directions } from '../../utils/constants';
import { getRandomElement } from '../../utils/lib';

export class Character {
  constructor({ glyph, color }) {
    this.glyph = glyph;
    this.color = color;
  }

  getData() {
    const { glyph, color } = this;
    return { glyph, color };
  }
}

export class Position {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }
}

export class Actor {
  constructor({ glyph, color, type, x, y }) {
    this.pos = new Position({ x, y });
    this.character = new Character({ glyph, color });
    this.type = type;
    if (type === 'monster') {
      this.ai = getMove;
    }
  }
}

export class Tile {
  constructor({ type, glyph, color, flags }) {
    this.type = type;
    this.character = new Character({ glyph, color });
    this.flags = flags;
  }
}

const getMove = function(distMap) {
  const possibleMoves = directions.filter(direction => {
    const { x: dx, y: dy } = direction;
    const { x, y } = this.pos;
    const newPosDistance = distMap[y + dy][x + dx] || 9999;
    const oldPosDistance = distMap[y][x];
    return newPosDistance < oldPosDistance;
  });
  console.log(possibleMoves);
  return getRandomElement(possibleMoves);
};
