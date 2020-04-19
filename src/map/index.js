import {
  MAP_HEIGHT,
  MAP_WIDTH,
  SCREEN_HEIGHT,
  FOG_EXPLORED,
  FOG_UNEXPLORED,
  FOG_VISIBLE,
  directions,
} from "../utils/constants";
import { range } from "../utils/lib";
import { Tile } from "../objects/characters";

const floorTile = {
  type: "floor",
  glyph: ".",
  color: "#333",
  flags: { walkable: true, fog: FOG_UNEXPLORED },
};

const wallTile = {
  type: "wall",
  glyph: "#",
  color: "#ff6633",
  flags: { walkable: false, fog: FOG_UNEXPLORED },
};
export function generateBlankMap() {
  const floor = Array(MAP_HEIGHT).fill(Array(MAP_WIDTH).fill(0));

  return floor.map((row, y) =>
    row.map((tile, x) =>
      (y > 10 && y < 30 && x === 25) ||
      (x > 3 && x < 26 && y === 30) ||
      x === 0 ||
      x === MAP_WIDTH - 1 ||
      y === 0 ||
      y === MAP_HEIGHT - 1
        ? Tile(wallTile)
        : Tile(floorTile)
    )
  );
}

export function distanceMap({ floor, actor }) {
  const dMap = floor.map((row) => row.map(() => null));
  let currentDistance = 1;
  let coordsToCheck = [{ ...actor.pos }];

  do {
    const newCoordsToCheck = [];
    coordsToCheck.forEach((coordSet) => {
      const { x, y } = coordSet;
      dMap[y][x] = currentDistance;

      directions.forEach((moveDestination) => {
        const { x: dx, y: dy } = moveDestination;

        if (dMap[y + dy][x + dx] !== null) return;
        if (
          floor[y + dy] &&
          floor[y + dy][x + dx] &&
          floor[y + dy][x + dx].flags.walkable
        ) {
          const isCoord = newCoordsToCheck.find(
            (existingCoord) =>
              existingCoord.x === x + dx && existingCoord.y === y + dy
          );
          if (!isCoord) {
            newCoordsToCheck.push({ x: x + dx, y: y + dy });
          }
        }
      });
    });
    currentDistance++;
    coordsToCheck = [...newCoordsToCheck];
  } while (coordsToCheck.length > 0);
  return dMap;
}

export function generateBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  range(MAP_HEIGHT).forEach(() => {
    board.innerHTML += '<p class="row"></p>';
  });

  const rows = board.querySelectorAll(".row");

  rows.forEach((row) => {
    row.style.fontSize = `${(window.innerHeight * 0.9) / SCREEN_HEIGHT}px`;
    row.style.lineHeight = `${(window.innerHeight * 0.9) / SCREEN_HEIGHT}px`;
  });
}
