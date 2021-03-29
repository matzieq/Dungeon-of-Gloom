import Position from "./position";

const Rectangle = ({ x, y, w, h }) => {
  return {
    x,
    y,
    w,
    h,
    center: Position(Math.round(x + w / 2), Math.round(y + h / 2)),
    left: x,
    right: x + w,
    top: y,
    bottom: y + h,
    overlap(other) {
      return (
        this.x < other.x + other.width &&
        this.x + this.width > other.x &&
        this.y < other.y + other.height &&
        this.y + this.height > other.y
      );
    },
  };
};

export default Rectangle;
