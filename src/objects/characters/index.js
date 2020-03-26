const drawToConsole = (glyph, color) =>
  `<span style="color: ${color}">${glyph}</span>`;

export class Character {
  constructor({ glyph, color }) {
    this.glyph = glyph;
    this.color = color;
  }

  getData() {
    const { glyph, color } = this;
    return { glyph, color };
  }

  draw() {
    return drawToConsole(this.glyph, this.color);
  }
}

export class Position {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }
}

export class Actor {
  constructor({ glyph, color }) {
    this.pos = new Position({ x: 5, y: 5 });
    this.character = new Character({ glyph, color });
  }
}

export class Tile {
  constructor({ type, glyph, color, flags }) {
    this.type = type;
    this.character = new Character({ glyph, color });
    this.flags = flags;
  }
}
