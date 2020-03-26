import { MAP_HEIGHT, MAP_WIDTH } from "../utils/constants";
import { distanceMap } from "../map";
const tileSize = window.innerWidth / 80;

export function drawGame({ floor, actors }) {
  const canvas = document.getElementById("canvas");
  canvas.width = MAP_WIDTH * tileSize * 0.7;
  canvas.height = MAP_HEIGHT * tileSize;
  canvas.style.width = `${MAP_WIDTH * tileSize * 0.7}px`;
  const ctx = canvas.getContext("2d");
  // const rows = document.querySelectorAll(".row");

  const mapWithActors = [...drawActors(floor, actors)];

  // rows.forEach((row, i) => {
  //   row.innerHTML = mapWithActors[i]
  //     .map(element => drawToConsole(element.character.getData()))
  //     .join("");
  // });

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${tileSize}px Source Code Pro`;
  const distMap = distanceMap({ floor, actor: actors[0] });
  mapWithActors.forEach((row, y) =>
    row.forEach((tile, x) => {
      const { glyph, color } = tile.character.getData();
      ctx.fillStyle = color;
      // ctx.fillText(glyph, x * tileSize * 0.7, (y + 1) * tileSize);
      // ctx.fillStyle = "#0099ff";
      // ctx.font = `${tileSize / 2}px Source Code Pro`;

      ctx.fillText(
        distMap[y][x] || "#",
        x * tileSize * 0.7,
        (y + 1) * tileSize
      );
    })
  );
}

export function drawActors(floor, actors) {
  const newMap = floor.map(row => row.map(item => item));
  actors.forEach(actor => {
    const {
      pos: { x, y }
    } = actor;

    newMap[y][x] = actor;
  });

  return newMap;
}
