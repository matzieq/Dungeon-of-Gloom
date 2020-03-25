function moveActor(actor, { x, y }) {
  actor.x += x;
  actor.y += y;
}

export function update(e, player) {
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

  moveActor(player, dir);
}
