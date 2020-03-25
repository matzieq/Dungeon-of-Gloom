export function drawGame(dungeonMap, actors) {
  const rows = document.querySelectorAll(".row");

  const mapWithActors = [...drawActors(dungeonMap, actors)];

  rows.forEach((row, i) => {
    row.textContent = mapWithActors[i].join("");
  });
}

export function drawActors(dungeonMap, actors) {
  const newMap = dungeonMap.map(row => row.map(item => item));
  actors.forEach(actor => {
    const { x, y, glyph } = actor;

    newMap[y][x] = glyph;
  });

  return newMap;
}
