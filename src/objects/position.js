const Position = (x = 0, y = 0) => ({
  x,
  y,
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  },
});

export default Position;
