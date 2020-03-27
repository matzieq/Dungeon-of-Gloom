import { distanceMap } from '../map';
import { distanceBetween, lineOfSight } from '../utils/lib';

function moveActor(actor, state, dir) {
  if (!dir) return;
  const { x: dx, y: dy } = dir;
  if (!actor.alive) return;
  const { floor, actors } = state;
  if (floor[actor.pos.y + dy][actor.pos.x + dx].flags.walkable) {
    const actorIndex = actors.indexOf(actor);
    const occupied = actors.find(
      (other, index) =>
        other.pos.x === actor.pos.x + dx &&
        other.pos.y === actor.pos.y + dy &&
        index !== actorIndex
    );

    if (occupied && occupied.alive) {
      attack(actor, occupied, state);
    } else {
      actor.pos.x += dx;
      actor.pos.y += dy;
    }
  }
}

function attack(attacker, defender, state) {
  console.log(attacker);
  console.log(defender);
  defender.hp -= attacker.attack;
  if (defender.hp <= 0) {
    defender.alive = false;
    defender.character.glyph = '%';
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

  const { dir } = e ? handleKeys(e) : { x: 0, y: 0 };

  unfog(state);
  moveActor(player, state, dir);
  state.distMap = distanceMap({ floor, actor: player });
  actors.forEach(actor => {
    if (actor.ai) {
      moveActor(actor, state, actor.ai(state));
    }
  });
}

export function unfog(state) {
  const { floor, player } = state;
  // console.log(player.pos);
  // floor[player.pos.y][player.pos.x].flags.fog = 1;
  floor.forEach((row, y) => {
    row.forEach((tile, x) => {
      const dist = distanceBetween(player.pos, { x, y });
      if (dist <= player.range) {
        console.log('lower');
      }
      if (dist <= player.range && lineOfSight(player.pos, { x, y }, state)) {
        if (tile.flags.fog === 0 || tile.flags.fog === 2) {
          tile.flags.fog = 1;
        }
      } else if (tile.flags.fog === 1) {
        tile.flags.fog = 2;
      }
    });
  });
  console.log(floor);
}
