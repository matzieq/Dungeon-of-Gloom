import { distanceMap } from '../map';
import { distanceBetween, lineOfSight } from '../utils/lib';

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

export function update(e, state) {
  const { player, floor, actors } = state;
  const { dir } = handleKeys(e);
  state.distMap = distanceMap({ floor, actor: player });

  moveActor(player, floor, dir);
  actors.forEach(actor => {
    if (actor.ai) {
      moveActor(actor, floor, actor.ai(state));
    }
  });
}
