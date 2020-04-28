import { distanceMap } from "../map/index.js";
import { distanceBetween, lineOfSight } from "../utils/lib.js";
import {
  directions,
  directionsWithDiagonals,
  FOG_EXPLORED,
  FOG_UNEXPLORED,
  FOG_VISIBLE,
} from "../utils/constants.js";

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
  defender.stats.hp -= attacker.stats.attack;
  if (defender.stats.hp <= 0) {
    defender.alive = false;
    defender.name = "dead";
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

  moveActor(player, state, dir);
  unfog(state);
  state.distMap = distanceMap({ floor, actor: player });
  actors.forEach((actor) => {
    if (actor.ai) {
      moveActor(actor, state, actor.ai(state));
    }
  });
}

export function unfog(state) {
  console.log("Fired");
  const { floor, player, debugMap } = state;
  // console.log(player.pos);
  // floor[player.pos.y][player.pos.x].flags.fog = 1;
  floor.forEach((row, y) => {
    // debugMap[y] = [];
    row.forEach((tile, x) => {
      if (tile.flags.fog === FOG_VISIBLE) {
        // debugMap[y][x] = "O";
        unfogTileSimple(tile, FOG_EXPLORED);
      }
    });
  });
  floor.forEach((row, y) => {
    row.forEach((tile, x) => {
      const dist = distanceBetween(player.pos, { x, y });
      const hasLineOfSight = lineOfSight(player.pos, { x, y }, state);

      if (dist <= player.stats.range && hasLineOfSight) {
        unfogTile(x, y, FOG_VISIBLE, tile, state);
      }
    });
  });
}

function unfogTileSimple(tile, fogValue) {
  tile.flags.fog = fogValue;
}

export function unfogTile(x, y, fogValue, tile, state) {
  tile.flags.fog = fogValue;
  if (tile.flags.walkable) {
    directionsWithDiagonals.forEach((dir) => {
      const tx = x + dir.x;
      const ty = y + dir.y;
      const { floor, player } = state;
      const neighbouringTile = floor[ty] ? floor[ty][tx] : null;

      if (neighbouringTile && !neighbouringTile.flags.walkable) {
        neighbouringTile.flags.fog = fogValue;
      }
    });
  }
}
