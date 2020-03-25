import { MAP_HEIGHT, MAP_WIDTH, SCREEN_HEIGHT } from "../utils/constants";

export function generateBlankMap() {
  return Array(MAP_HEIGHT)
    .fill(0)
    .map(() => Array(MAP_WIDTH).fill("."));
}

export function generateBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  Array(MAP_HEIGHT)
    .fill(0)
    .forEach(() => {
      board.innerHTML += '<p class="row"></p>';
    });

  const rows = board.querySelectorAll(".row");

  rows.forEach(row => {
    row.style.fontSize = `${(window.innerHeight * 0.9) / SCREEN_HEIGHT}px`;
    row.style.lineHeight = `${(window.innerHeight * 0.9) / SCREEN_HEIGHT}px`;
  });
}
