export function drawGame({ floor, actors }) {
  const rows = document.querySelectorAll(".row");

  const mapWithActors = [...drawActors(floor, actors)];

  rows.forEach((row, i) => {
    row.textContent = mapWithActors[i].join("");
  });
}

export function drawActors(floor, actors) {
  const newMap = floor.map(row => row.map(item => item));
  actors.forEach(actor => {
    const { x, y, glyph } = actor;

    newMap[y][x] = glyph;
  });

  return newMap;
}
