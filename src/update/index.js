import { distanceMap } from "../map";

function moveActor(actor, floor, { x, y }) {
  if (floor[actor.pos.y + y][actor.pos.x + x].flags.walkable) {
    actor.pos.x += x;
    actor.pos.y += y;
  }
}

function handleKeys(e) {
  const dir = { x: 0, y: 0 };

  switch (e.which) {
    case 37:
      dir.x = -1;
      break;
    case 38:
      dir.y = -1;
      break;
    case 39:
      dir.x = 1;
      break;
    case 40:
      dir.y = 1;
      break;
  }

  return { dir };
}

export function update(e, { player, floor }) {
  const { dir } = handleKeys(e);

  moveActor(player, floor, dir);
}
