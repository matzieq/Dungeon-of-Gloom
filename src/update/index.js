import { distanceMap } from "../map/index.js";
import { distanceBetween, lineOfSight } from "../utils/lib.js";
import {
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
  defender.stats.hp -= attacker.stats.str;
  if (defender.stats.hp <= 0) {
    defender.alive = false;
    defender.name = "dead";
  }
}

function handleKeys(e) {
  const dir = { x: 0, y: 0 };

  switch (e.key) {
    case "ArrowLeft":
    case "h":
      dir.x = -1;
      break;
    case "ArrowUp":
    case "k":
      dir.y = -1;
      break;
    case "ArrowRight":
    case "l":
      dir.x = 1;
      break;
    case "ArrowDown":
    case "j":
      dir.y = 1;
      break;
    case "u":
      dir.x = -1;
      dir.y = -1;
      break;
    case "i":
      dir.x = 1;
      dir.y = -1;
      break;
    case "b":
      dir.x = -1;
      dir.y = 1;
      break;
    case "n":
      dir.x = 1;
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
  const { floor, player, debugMap } = state;
  floor.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile.flags.fog === FOG_VISIBLE) {
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
      const { floor } = state;
      const neighbouringTile = floor[ty] ? floor[ty][tx] : null;

      if (neighbouringTile && !neighbouringTile.flags.walkable) {
        neighbouringTile.flags.fog = fogValue;
      }
    });
  }
}
