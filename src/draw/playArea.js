import { FOG_EXPLORED, FOG_VISIBLE } from "../utils/constants.js";
import { tileSize, deepCopy } from "../utils/lib.js";

function drawActorsAscii(floor, actors) {
  const newMap = deepCopy(floor);
  actors.forEach((actor) => {
    const {
      pos: { x, y },
    } = actor;

    newMap[y][x] = actor;
  });

  return newMap;
}

const mapWithActors = (floor, actors) => [...drawActorsAscii(floor, actors)];

export function drawMapAscii({ floor, actors, debugMap, ctx, glyphAtlas }) {
  mapWithActors(floor, actors).forEach((row, y) =>
    row.forEach((tile, x) => {
      const { glyph, color } = glyphAtlas.find((el) => el.name === tile.name);
      const {
        flags: { fog },
        name,
      } = floor[y][x];

      const { glyph: floorGlyph } = glyphAtlas.find((el) => el.name === name);

      if (fog === FOG_VISIBLE) {
        ctx.fillStyle = color;

        ctx.fillText(glyph, x * tileSize() * 0.7, (y + 1) * tileSize());
      } else if (fog === FOG_EXPLORED) {
        ctx.fillStyle = "#393939";

        ctx.fillText(floorGlyph, x * tileSize() * 0.7, (y + 1) * tileSize());
      }
      if (debugMap[y] && debugMap[y][x]) {
        ctx.fillText(
          debugMap[y][x],
          x * tileSize() * 0.7,
          (y + 1) * tileSize()
        );
      }
    })
  );
}
